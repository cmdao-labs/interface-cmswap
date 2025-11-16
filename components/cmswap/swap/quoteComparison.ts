'use client'
import { LiquidityVariant } from '@/components/cmswap/liquidityVariant'

export type RouteOption = { id: string; pool: string; label: string; tvl: number; tvlUnit: string; fee?: number; feeLabel?: string; description?: string; amountOut?: number; priceQuote?: number; }
export type RouteQuoteMetrics = { amountOut?: number; priceQuote?: number; }

type CmswapFeeTier = { fee: 100 | 500 | 3000 | 10000; label: string; tvlKey: 'tvl100' | 'tvl500' | 'tvl3000' | 'tvl10000' }
export const CMSWAP_FEE_TIERS: readonly CmswapFeeTier[] = [{ fee: 100, label: '0.01%', tvlKey: 'tvl100' }, { fee: 500, label: '0.05%', tvlKey: 'tvl500' }, { fee: 3000, label: '0.3%', tvlKey: 'tvl3000' }, { fee: 10000, label: '1%', tvlKey: 'tvl10000' } ] as const
type PancakeSwapFeeTier = { fee: 100 | 500 | 2500 | 10000; label: string; tvlKey: 'tvl100' | 'tvl500' | 'tvl2500' | 'tvl10000' }
export const PANCAKESWAP_FEE_TIERS: readonly PancakeSwapFeeTier[] = [{ fee: 100, label: '0.01%', tvlKey: 'tvl100' }, { fee: 500, label: '0.05%', tvlKey: 'tvl500' }, { fee: 2500, label: '0.25%', tvlKey: 'tvl2500' }, { fee: 10000, label: '1%', tvlKey: 'tvl10000' } ] as const
export const ROUTE_DESCRIPTIONS: Record<string, string> = {
    CMswap: 'v3',
    PancakeSwap: 'v3',
    UniswapV3: 'v3',
    DiamonSwap: 'v2',
    UdonSwap: 'v2',
    ponder: 'v2',
    GameSwap: 'simple xy = k',
    JibSwap: 'v2',
}
export type RouteId = 'CMswap' | 'DiamonSwap' | 'UdonSwap' | 'ponder' | 'GameSwap' | 'JibSwap' | 'PancakeSwap' | 'UniswapV3'
export type QuoteComparisonInput = {
    variant: LiquidityVariant
    quotes: Partial<Record<RouteId, number | undefined>>
    currentPool?: RouteId | ''
    cmSwapBestFee?: 100 | 500 | 3000 | 10000
    pancakeSwapBestFee?: 100 | 500 | 2500 | 10000
    uniSwapV3BestFee?: 100 | 500 | 3000 | 10000
}
export type QuoteComparisonResult = {
    bestPool?: RouteId
    cmSwapFee?: 100 | 500 | 3000 | 10000
    pancakeSwapFee?: 100 | 500 | 2500 | 10000
    uniSwapV3Fee?: 100 | 500 | 3000 | 10000
}
const VARIANT_POOLS: Record<LiquidityVariant, readonly RouteId[]> = {
    [LiquidityVariant.BKC]: ['CMswap', 'DiamonSwap', 'UdonSwap', 'ponder'],
    [LiquidityVariant.JBC]: ['CMswap', 'GameSwap', 'JibSwap'],
    [LiquidityVariant.BSC]: ['PancakeSwap'],
    [LiquidityVariant.BKC_TESTNET]: ['CMswap'],
    [LiquidityVariant.BASE]: ['UniswapV3'],
}
function isValidQuote(v: unknown): v is number {const n = Number(v); return Number.isFinite(n) && n > 0;}
export function selectBestRoute({ variant, quotes, currentPool, cmSwapBestFee, pancakeSwapBestFee, uniSwapV3BestFee }: QuoteComparisonInput): QuoteComparisonResult {
    const candidates = VARIANT_POOLS[variant]
    const valid = candidates
        .map((id) => ({ id, value: isValidQuote(quotes[id]) ? Number(quotes[id]) : undefined }))
        .filter((q): q is { id: RouteId; value: number } => isValidQuote(q.value))
    if (!valid.length) return {}
    const maxValue = Math.max(...valid.map((v) => v.value))
    const top = valid.filter((v) => v.value === maxValue)
    let chosen: RouteId
    const current = top.find((t) => t.id === currentPool)
    if (current) chosen = current.id
    else if (top.find((t) => t.id === 'CMswap')) chosen = 'CMswap'
    else chosen = top.sort((a, b) => a.id.localeCompare(b.id))[0].id
    return {
        bestPool: chosen,
        cmSwapFee: chosen === 'CMswap' ? cmSwapBestFee : undefined,
        pancakeSwapFee: chosen === 'PancakeSwap' ? pancakeSwapBestFee : undefined,
        uniSwapV3Fee: chosen === 'UniswapV3' ? uniSwapV3BestFee : undefined,
    }
}
