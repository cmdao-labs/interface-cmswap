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
        ? { token0: aLower, token1: bLower }
        : { token0: bLower, token1: aLower }
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
    const invertedHigh = invertValue(baseLow)  // Note: when inverted, low becomes high
    const invertedLow = invertValue(baseHigh)  // Note: when inverted, high becomes low
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
    const feeTier = parseChainId(searchParams.get('feeTier'))

    console.log('🔥 API Route - Request parameters:')
    console.log('  baseToken:', baseToken)
    console.log('  quoteToken:', quoteToken)
    console.log('  chainId:', chainId)
    console.log('  feeTier:', feeTier)

    if (!baseToken || !quoteToken) {
        return NextResponse.json({ error: 'baseToken and quoteToken are required' }, { status: 400 })
    }
    if (chainId == null) {
        return NextResponse.json({ error: 'chainId required' }, { status: 400 })
    }
    let timeframe
    try {
        timeframe = pickTimeframe(searchParams.get('timeframe'))
        console.log('  timeframe:', timeframe)
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'invalid timeframe' }, { status: 400 })
    }
    let canonical
    try {
        canonical = canonicalMarket(baseToken, quoteToken)
        console.log('  canonical market:', canonical)
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'invalid market' }, { status: 400 })
    }
    const limit = parseLimit(searchParams.get('limit'))
    console.log('  limit:', limit)
    const supabase = getServiceSupabase()

    // Get all markets for this token pair to find available fee tiers
    const { data: allMarkets, error: allErr } = await supabase
        .from('swap_markets')
        .select('market_id, token0, token1, decimals0, decimals1, pair_address, dex')
        .eq('chain_id', chainId)
        .eq('token0', canonical.token0)
        .eq('token1', canonical.token1)

    console.log('📊 API Route - Market query results:')
    console.log('  allMarkets:', allMarkets)
    console.log('  allErr:', allErr)

    if (allErr) {
        return NextResponse.json({ error: allErr.message }, { status: 500 })
    }
    if (!allMarkets || allMarkets.length === 0) {
        console.log('❌ API Route - No markets found')
        return NextResponse.json({ error: 'market not found' }, { status: 404 })
    }

    // Extract fee tier from market_id (format: univ3:token0-token1:feeXXXX)
    const availableFeeTiers: Array<{
        fee: number
        feeBps: number
        marketId: string
        isActive: boolean
        latestTimestamp?: number | null
    }> = allMarkets.map(market => {
        const match = (market.market_id as string).match(/:fee(\d+)$/)
        const fee = match ? parseInt(match[1], 10) : 0
        return {
            fee,
            feeBps: fee / 10000,
            marketId: market.market_id,
            isActive: false, // Will be determined below
        }
    }).sort((a, b) => a.fee - b.fee)

    console.log('💰 API Route - Processed fee tiers:', availableFeeTiers)

    // Check recent activity for each fee tier to determine which are active
    const marketIds = allMarkets.map(m => m.market_id as string)
    const { data: recentActivity } = await supabase
        .from('swap_pair_snapshots')
        .select('market_id, timestamp')
        .eq('chain_id', chainId)
        .in('market_id', marketIds)
        .order('timestamp', { ascending: false })

    // Mark fee tiers as active based on recent activity (last 24 hours)
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
    availableFeeTiers.forEach(tier => {
        const activity = recentActivity?.find(a => a.market_id === tier.marketId)
        if (activity && Number(activity.timestamp) > oneDayAgo) {
            tier.isActive = true
            tier.latestTimestamp = Number(activity.timestamp)
        }
    })

    // Determine which market to use for candle data
    let marketRow = null

    // If a specific fee tier is requested, try to use it
    if (feeTier) {
        marketRow = allMarkets.find(m => {
            const match = (m.market_id as string).match(/:fee(\d+)$/)
            const marketFee = match ? parseInt(match[1], 10) : 0
            return marketFee === feeTier
        })
    }

    // If no specific fee tier or not found, use the most recently active V3 market
    if (!marketRow) {
        const v3Markets = allMarkets.filter(m => m.dex === 'uniswap-v3')
        if (v3Markets.length > 0) {
            marketRow = v3Markets[0] // Default to first V3 market
            if (v3Markets.length > 1 && recentActivity && recentActivity.length > 0) {
                // Find the most recently active V3 market
                const latestSnap = recentActivity[0] as any
                marketRow = v3Markets.find(m => m.market_id === latestSnap.market_id) || marketRow
            }
        } else {
            // Fall back to any available market
            marketRow = allMarkets[0]
        }
    }
    const baseIsToken0 = toLowerAddr(baseToken) === toLowerAddr(marketRow.token0 as string)
    const marketId = marketRow.market_id as string
    console.log('🎯 API Route - Selected market:')
    console.log('  marketId:', marketId)
    console.log('  marketRow:', marketRow)
    console.log('  baseIsToken0:', baseIsToken0)

    const { data: candleRows, error: candleError } = await supabase
        .from('swap_candles')
        .select('bucket_start, open, high, low, close, volume0, volume1, trades')
        .eq('chain_id', chainId)
        .eq('market_id', marketId)
        .eq('timeframe_seconds', timeframe.seconds)
        .order('bucket_start', { ascending: false })
        .limit(limit)

    console.log('📈 API Route - Candle query results:')
    console.log('  candleRows count:', candleRows?.length || 0)
    console.log('  candleError:', candleError)
    console.log('  First few rows:', candleRows?.slice(0, 3))

    if (candleError) {
        return NextResponse.json({ error: candleError.message }, { status: 500 })
    }
    const ordered = (candleRows ?? []).slice().reverse()
    const candles = ordered.map(row => transformCandle(row as CandleRow, false)) // Don't invert

    console.log('✨ API Route - Transformed candles:')
    console.log('  candles count:', candles.length)
    if (candles.length > 0) {
        console.log('  first candle:', candles[0])
        console.log('  last candle:', candles[candles.length - 1])
    }
    let latestPrice: number | null = null
    let latestTimestamp: number | null = null
    if (candles.length > 0) {
        const last = candles[candles.length - 1]
        latestPrice = toNumber(last.close)
        latestTimestamp = Number(last.time)
        console.log('💡 API Route - Latest price from candles:', latestPrice)
    } else {
        console.log('🔍 API Route - No candles, checking snapshots...')
        const { data: snapshotRow, error: snapshotError } = await supabase
            .from('swap_pair_snapshots')
            .select('timestamp, price')
            .eq('chain_id', chainId)
            .eq('market_id', marketId)
            .order('timestamp', { ascending: false })
            .limit(1)

        console.log('📸 API Route - Snapshot query results:')
        console.log('  snapshotRow:', snapshotRow)
        console.log('  snapshotError:', snapshotError)

        if (!snapshotError && snapshotRow && snapshotRow.length > 0) {
            const row = snapshotRow[0] as { timestamp: number | string | null; price: number | string | null }
            const rawPrice = toNumber(row.price)
            latestPrice = rawPrice // Don't invert
            latestTimestamp = Number(row.timestamp ?? 0)
            console.log('💡 API Route - Latest price from snapshots:', latestPrice)
            console.log('  rawPrice:', rawPrice)
            console.log('  (no inversion applied)')
        }
    }
    // Determine current fee tier from selected market
    const currentMarketMatch = marketRow.market_id.match(/:fee(\d+)$/)
    const currentFee = currentMarketMatch ? parseInt(currentMarketMatch[1], 10) : 0
    const currentFeeTier = availableFeeTiers.find(tier => tier.fee === currentFee) || null

    const response = {
        market: {
            marketId,
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
        availableFeeTiers,
        currentFeeTier,
    }

    console.log('📤 API Route - Final response:', response)
    console.log('🎯 API Route - Latest price in response:', latestPrice)

    return NextResponse.json(response)
}
