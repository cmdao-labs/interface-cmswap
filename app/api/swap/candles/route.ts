import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

const DEFAULT_LIMIT = 500
const MAX_LIMIT = 2000
const TIMEFRAMES: Record<string, number> = {
    '15s': 15,
    '1m': 60,
    '5m': 5 * 60,
    '15m': 15 * 60,
    '1h': 60 * 60,
    '4h': 4 * 60 * 60,
    '1d': 24 * 60 * 60,
}

function toLowerAddr(value: string): string {
    return value.trim().toLowerCase()
}

function canonicalMarket(a: string, b: string) {
    const [aLower, bLower] = [toLowerAddr(a), toLowerAddr(b)]
    if (aLower === bLower) {
        throw new Error('baseToken and quoteToken must be different')
    }
    return aLower < bLower
        ? { marketId: `${aLower}-${bLower}`, token0: aLower, token1: bLower }
        : { marketId: `${bLower}-${aLower}`, token0: bLower, token1: aLower }
}

function pickTimeframe(value: string | null): { label: string; seconds: number } {
    if (!value) return { label: '5m', seconds: TIMEFRAMES['5m'] }
    const key = value in TIMEFRAMES ? value : value.toLowerCase()
    const seconds = TIMEFRAMES[key]
    if (!seconds) {
        throw new Error(`Unsupported timeframe ${value}`)
    }
    return { label: key, seconds }
}

function parseLimit(value: string | null): number {
    if (!value) return DEFAULT_LIMIT
    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_LIMIT
    return Math.min(parsed, MAX_LIMIT)
}

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined) return null
    const num = Number(value)
    return Number.isFinite(num) ? num : null
}

function invertValue(value: number | null): number | null {
    if (value === null) return null
    if (value === 0) return null
    const inverted = 1 / value
    return Number.isFinite(inverted) ? inverted : null
}

function parseChainId(value: string | null): number | null {
    if (!value) return null
    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed)) return null
    if (parsed < 0) return null
    return parsed
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

function transformCandle(row: CandleRow, invert: boolean) {
    const bucketStart = Number(row.bucket_start ?? 0)
    const baseOpen = toNumber(row.open)
    const baseHigh = toNumber(row.high)
    const baseLow = toNumber(row.low)
    const baseClose = toNumber(row.close)
    const baseVolume0 = toNumber(row.volume0)
    const baseVolume1 = toNumber(row.volume1)
    const trades = Number.isFinite(row.trades as number) ? Number(row.trades) : 0
    if (!invert) {
        return {
            time: bucketStart,
            open: baseOpen,
            high: baseHigh,
            low: baseLow,
            close: baseClose,
            volumeBase: baseVolume0,
            volumeQuote: baseVolume1,
            trades,
        }
    }
    const invertedOpen = invertValue(baseOpen)
    const invertedClose = invertValue(baseClose)
    // When inverting OHLC, high/low swap reciprocals
    const invertedHigh = invertValue(baseLow)
    const invertedLow = invertValue(baseHigh)
    return {
        time: bucketStart,
        open: invertedOpen,
        high: invertedHigh,
        low: invertedLow,
        close: invertedClose,
        volumeBase: baseVolume1,
        volumeQuote: baseVolume0,
        trades,
    }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const baseToken = searchParams.get('baseToken')
    const quoteToken = searchParams.get('quoteToken')
    const chainId = parseChainId(searchParams.get('chainId'))
    if (!baseToken || !quoteToken) {
        return NextResponse.json({ error: 'baseToken and quoteToken are required' }, { status: 400 })
    }
    if (chainId == null) {
        return NextResponse.json({ error: 'chainId required' }, { status: 400 })
    }
    let timeframe
    try {
        timeframe = pickTimeframe(searchParams.get('timeframe'))
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'invalid timeframe' }, { status: 400 })
    }
    let canonical
    try {
        canonical = canonicalMarket(baseToken, quoteToken)
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'invalid market' }, { status: 400 })
    }
    const limit = parseLimit(searchParams.get('limit'))
    const supabase = getServiceSupabase()
    const { data: marketRow, error: marketError } = await supabase
        .from('swap_markets')
        .select('market_id, token0, token1, decimals0, decimals1, pair_address, dex')
        .eq('chain_id', chainId)
        .eq('market_id', canonical.marketId)
        .maybeSingle()
    if (marketError) {
        return NextResponse.json({ error: marketError.message }, { status: 500 })
    }
    if (!marketRow) {
        return NextResponse.json({ error: 'market not found' }, { status: 404 })
    }
    const baseIsToken0 = toLowerAddr(baseToken) === toLowerAddr(marketRow.token0 as string)
    const { data: candleRows, error: candleError } = await supabase
        .from('swap_candles')
        .select('bucket_start, open, high, low, close, volume0, volume1, trades')
        .eq('chain_id', chainId)
        .eq('market_id', canonical.marketId)
        .eq('timeframe_seconds', timeframe.seconds)
        .order('bucket_start', { ascending: false })
        .limit(limit)
    if (candleError) {
        return NextResponse.json({ error: candleError.message }, { status: 500 })
    }
    const ordered = (candleRows ?? []).slice().reverse()
    const candles = ordered.map(row => transformCandle(row as CandleRow, !baseIsToken0))
    let latestPrice: number | null = null
    let latestTimestamp: number | null = null
    if (candles.length > 0) {
        const last = candles[candles.length - 1]
        latestPrice = toNumber(last.close)
        latestTimestamp = Number(last.time)
    } else {
        const { data: snapshotRow, error: snapshotError } = await supabase
            .from('swap_pair_snapshots')
            .select('timestamp, price')
            .eq('chain_id', chainId)
            .eq('market_id', canonical.marketId)
            .order('timestamp', { ascending: false })
            .limit(1)
        if (!snapshotError && snapshotRow && snapshotRow.length > 0) {
            const row = snapshotRow[0] as { timestamp: number | string | null; price: number | string | null }
            const rawPrice = toNumber(row.price)
            const orientedPrice = baseIsToken0 ? rawPrice : invertValue(rawPrice)
            latestPrice = orientedPrice
            latestTimestamp = Number(row.timestamp ?? 0)
        }
    }
    return NextResponse.json({
        market: {
            marketId: canonical.marketId,
            token0: marketRow.token0,
            token1: marketRow.token1,
            decimals0: marketRow.decimals0,
            decimals1: marketRow.decimals1,
            pairAddress: marketRow.pair_address,
            dex: marketRow.dex,
        },
        timeframe,
        candles,
        latest: {
            price: latestPrice,
            timestamp: latestTimestamp,
        },
        chainId,
    })
}
