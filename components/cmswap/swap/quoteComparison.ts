'use client'
import { LiquidityVariant } from '@/components/cmswap/liquidityVariant'

export type RouteId = 'CMswap' | 'DiamonSwap' | 'UdonSwap' | 'ponder' | 'GameSwap' | 'JibSwap'
export type CmswapFee = 100 | 500 | 3000 | 10000

export type QuoteComparisonInput = {
  variant: LiquidityVariant
  quotes: Partial<Record<RouteId, number | undefined>>
  currentPool?: RouteId | ''
  cmSwapBestFee?: CmswapFee
}

export type QuoteComparisonResult = {
  bestPool?: RouteId
  cmSwapFee?: CmswapFee
}

const VARIANT_POOLS: Record<LiquidityVariant, readonly RouteId[]> = {
  [LiquidityVariant.BKC]: ['CMswap', 'DiamonSwap', 'UdonSwap', 'ponder'],
  [LiquidityVariant.JBC]: ['CMswap', 'GameSwap', 'JibSwap'],
  [LiquidityVariant.MONAD_TESTNET]: ['CMswap'],
  [LiquidityVariant.BKC_TESTNET]: ['CMswap'],
}

function isValidQuote(v: unknown): v is number {
  const n = Number(v)
  return Number.isFinite(n) && n > 0
}

/**
 * Pure, deterministic best-route selector based solely on quoted output amounts.
 * - Considers only routes valid for the given variant
 * - Ignores undefined/zero/NaN quotes
 * - Breaks ties by preferring the currentPool if present, else CMswap, else first by name
 */
export function selectBestRoute({ variant, quotes, currentPool, cmSwapBestFee }: QuoteComparisonInput): QuoteComparisonResult {
  const candidates = VARIANT_POOLS[variant]

  // Gather valid quotes for the current variant
  const valid = candidates
    .map((id) => ({ id, value: isValidQuote(quotes[id]) ? Number(quotes[id]) : undefined }))
    .filter((q): q is { id: RouteId; value: number } => isValidQuote(q.value))

  if (!valid.length) return {}

  // Find the highest quoted output
  const maxValue = Math.max(...valid.map((v) => v.value))
  const top = valid.filter((v) => v.value === maxValue)

  // Tie-breakers: prefer current pool → CMswap → alphabetical
  let chosen: RouteId
  const current = top.find((t) => t.id === currentPool)
  if (current) chosen = current.id
  else if (top.find((t) => t.id === 'CMswap')) chosen = 'CMswap'
  else chosen = top.sort((a, b) => a.id.localeCompare(b.id))[0].id

  return { bestPool: chosen, cmSwapFee: chosen === 'CMswap' ? cmSwapBestFee : undefined }
}

