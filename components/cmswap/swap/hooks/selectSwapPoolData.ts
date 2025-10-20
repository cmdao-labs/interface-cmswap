import { LiquidityVariant, getLiquidityVariant } from '@/components/cmswap/liquidityVariant'
import { useSwap96PoolData } from './useSwap96PoolData'
import { useSwap8899PoolData } from './useSwap8899PoolData'
import { useSwap25925PoolData } from './useSwap25925PoolData'

export type UseSwapPoolDataFn = (params: any) => void
export function selectSwapPoolDataHook(variant: LiquidityVariant): UseSwapPoolDataFn {
    switch (variant) {
        case LiquidityVariant.JBC:  return useSwap8899PoolData as unknown as UseSwapPoolDataFn
        case LiquidityVariant.BKC_TESTNET: return useSwap25925PoolData as unknown as UseSwapPoolDataFn
        case LiquidityVariant.BKC: default: return useSwap96PoolData as unknown as UseSwapPoolDataFn
    }
}
export function getSwapPoolDataHookByChainId(chainId?: number): UseSwapPoolDataFn {
    const variant = getLiquidityVariant(chainId)
    return selectSwapPoolDataHook(variant)
}
