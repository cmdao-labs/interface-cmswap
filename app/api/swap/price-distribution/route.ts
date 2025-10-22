import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

const DEFAULT_LIMIT = 500
const MAX_LIMIT = 2000
const DEFAULT_BUCKETS = 41
const MAX_BUCKETS = 201
const DEFAULT_SPAN = 100
const MIN_SPAN = 10
const MAX_SPAN = 800

const TIMEFRAMES: Record<string, number> = {
  '15s': 15,
  '1m': 60,
  '5m': 5 * 60,
  '15m': 15 * 60,
  '1h': 60 * 60,
  '4h': 4 * 60 * 60,
  '1d': 24 * 60 * 60,
}

function toLowerAddr(value: string): string { return value.trim().toLowerCase() }
function canonicalMarket(a: string, b: string) {
  const [aLower, bLower] = [toLowerAddr(a), toLowerAddr(b)]
  if (aLower === bLower) throw new Error('baseToken and quoteToken must be different')
  return aLower < bLower ? { token0: aLower, token1: bLower } : { token0: bLower, token1: aLower }
}
function pickTimeframe(value: string | null): { label: string; seconds: number } {
  if (!value) return { label: '5m', seconds: TIMEFRAMES['5m'] }
  const key = value in TIMEFRAMES ? value : value.toLowerCase()
  const seconds = TIMEFRAMES[key]
  if (!seconds) throw new Error(`Unsupported timeframe ${value}`)
  return { label: key, seconds }
}
function parseLimit(value: string | null): number {
  if (!value) return DEFAULT_LIMIT
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_LIMIT
  return Math.min(parsed, MAX_LIMIT)
}
function parseChainId(value: string | null): number | null {
  if (!value) return null
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}
function parseBuckets(value: string | null): number {
  if (!value) return DEFAULT_BUCKETS
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed < 5) return DEFAULT_BUCKETS
  return Math.min(parsed, MAX_BUCKETS)
}
function parseSpan(value: string | null): number {
  if (!value) return DEFAULT_SPAN
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return DEFAULT_SPAN
  return Math.min(Math.max(parsed, MIN_SPAN), MAX_SPAN)
}
function toNumber(value: unknown): number | null { const n = Number(value); return Number.isFinite(n) ? n : null }
function invertValue(value: number | null): number | null {
  if (value == null || value === 0) return null
  const inv = 1 / value
  return Number.isFinite(inv) ? inv : null
}

type CandleRow = {
  bucket_start: number | string | null
  open: number | string | null
  high: number | string | null
  low: number | string | null
  close: number | string | null
  volume0: number | string | null
  volume1: number | string | null
  trades: number | null
}

function transformCloseAndVolume(row: CandleRow, invert: boolean) {
  const baseClose = toNumber(row.close)
  const baseVolume0 = toNumber(row.volume0)
  const baseVolume1 = toNumber(row.volume1)
  if (!invert) return { close: baseClose, volumeBase: baseVolume0, volumeQuote: baseVolume1 }
  return { close: invertValue(baseClose), volumeBase: baseVolume1, volumeQuote: baseVolume0 }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const baseToken = searchParams.get('baseToken')
    const quoteToken = searchParams.get('quoteToken')
    const chainId = parseChainId(searchParams.get('chainId'))
    if (!baseToken || !quoteToken) return NextResponse.json({ error: 'baseToken and quoteToken are required' }, { status: 400 })
    if (chainId == null) return NextResponse.json({ error: 'chainId required' }, { status: 400 })
    const timeframe = pickTimeframe(searchParams.get('timeframe'))
    const limit = parseLimit(searchParams.get('limit'))
    const bucketCount = parseBuckets(searchParams.get('buckets'))
    const span = parseSpan(searchParams.get('span'))
    const half = span / 2
    const windowMin = -half
    const windowMax = half
    const step = (windowMax - windowMin) / Math.max(1, bucketCount - 1)

    const supabase = getServiceSupabase()
    let canonical
    try { canonical = canonicalMarket(baseToken, quoteToken) } catch (e: any) { return NextResponse.json({ error: e?.message || 'invalid market' }, { status: 400 }) }
    const { data: v3Markets, error: v3Err } = await supabase
      .from('swap_markets')
      .select('market_id, token0, token1, pair_address, dex')
      .eq('chain_id', chainId)
      .eq('token0', canonical.token0)
      .eq('token1', canonical.token1)
      .eq('dex', 'uniswap-v3')
    if (v3Err) return NextResponse.json({ error: v3Err.message }, { status: 500 })
    let marketRow = (v3Markets && v3Markets[0]) || null
    if (v3Markets && v3Markets.length > 1) {
      const ids = v3Markets.map(m => m.market_id as string)
      const { data: latestSnap } = await supabase
        .from('swap_pair_snapshots')
        .select('market_id, timestamp')
        .eq('chain_id', chainId)
        .in('market_id', ids)
        .order('timestamp', { ascending: false })
        .limit(1)
      if (latestSnap && latestSnap.length > 0) {
        const bestId = (latestSnap[0] as any).market_id as string
        marketRow = v3Markets.find(m => m.market_id === bestId) || marketRow
      }
    }
    if (!marketRow) {
      const { data: anyMarkets, error: anyErr } = await supabase
        .from('swap_markets')
        .select('market_id, token0, token1, pair_address, dex')
        .eq('chain_id', chainId)
        .eq('token0', canonical.token0)
        .eq('token1', canonical.token1)
      if (anyErr) return NextResponse.json({ error: anyErr.message }, { status: 500 })
      if (!anyMarkets || anyMarkets.length === 0) return NextResponse.json({ error: 'market not found' }, { status: 404 })
      marketRow = anyMarkets[0]
    }
    const baseIsToken0 = toLowerAddr(baseToken) === toLowerAddr(marketRow.token0 as string)
    const marketId = marketRow.market_id as string
    const { data: candleRows, error: candleError } = await supabase
      .from('swap_candles')
      .select('bucket_start, close, volume0, volume1')
      .eq('chain_id', chainId)
      .eq('market_id', marketId)
      .eq('timeframe_seconds', timeframe.seconds)
      .order('bucket_start', { ascending: false })
      .limit(limit)
    if (candleError) return NextResponse.json({ error: candleError.message }, { status: 500 })
    const ordered = (candleRows ?? []).slice().reverse()
    let latestPrice: number | null = null
    if (ordered.length > 0) {
      const last = ordered[ordered.length - 1] as CandleRow
      latestPrice = toNumber(transformCloseAndVolume(last, !baseIsToken0).close)
    } else {
      const { data: snapshotRow } = await supabase
        .from('swap_pair_snapshots')
        .select('timestamp, price')
        .eq('chain_id', chainId)
        .eq('market_id', marketId)
        .order('timestamp', { ascending: false })
        .limit(1)
      if (snapshotRow && snapshotRow.length > 0) {
        const raw = toNumber((snapshotRow[0] as any).price)
        latestPrice = baseIsToken0 ? raw : invertValue(raw)
      }
    }
    if (!Number.isFinite(latestPrice) || !latestPrice || latestPrice <= 0) {
      return NextResponse.json({ buckets: [], latest: { price: null }, window: { span, min: windowMin, max: windowMax }, chainId, marketId })
    }
    const sums = new Array<number>(bucketCount).fill(0)
    let maxVal = 0
    for (const row of ordered as CandleRow[]) {
      const { close, volumeQuote } = transformCloseAndVolume(row, !baseIsToken0)
      if (!Number.isFinite(close as number) || !close || close <= 0) continue
      const offset = ((close as number) / latestPrice - 1) * 100
      if (offset < windowMin || offset > windowMax) continue
      const idxFloat = (offset - windowMin) / step
      const idx = Math.max(0, Math.min(bucketCount - 1, Math.round(idxFloat)))
      const weight = Number.isFinite(volumeQuote as number) && (volumeQuote as number)! > 0 ? (volumeQuote as number) : 1
      sums[idx] += weight
      if (sums[idx] > maxVal) maxVal = sums[idx]
    }
    const buckets = (maxVal > 0)
      ? sums.map((v, i) => ({ ratio: i / Math.max(1, bucketCount - 1), height: Math.min(100, Math.max(10, (v / maxVal) * 100)), value: v }))
      : sums.map((_, i) => ({ ratio: i / Math.max(1, bucketCount - 1), height: 0, value: 0 }))
    return NextResponse.json({
      buckets,
      latest: { price: latestPrice },
      window: { span, min: windowMin, max: windowMax },
      bucketCount,
      chainId,
      marketId,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'failed to build distribution' }, { status: 500 })
  }
}

