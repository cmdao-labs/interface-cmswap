import { chains, type SupportedChainId } from '@/lib/chains'

export enum LiquidityVariant { BKC = 96, JBC = 8899, BKC_TESTNET = 25925, }
export const getLiquidityVariant = (chainId?: number): LiquidityVariant => {
    switch (chainId) {
        case 8899: return LiquidityVariant.JBC
        case 25925: return LiquidityVariant.BKC_TESTNET
        case 96: default: return LiquidityVariant.BKC
    }
}
export const liquidityVariantConfig = {
    [LiquidityVariant.BKC]: {
        chainId: 96 as SupportedChainId,
        isKap20Token: (addr: string) => {
            const t = chains[96].tokens[2]?.value?.toUpperCase()
            return !!t && addr?.toUpperCase() === t
        },
        decimalsOf: (addr: string) => chains[96].tokens.find(t => t.value.toUpperCase() === addr.toUpperCase())?.decimal ?? 18,
        displayPrecision: 4,
    },
    [LiquidityVariant.JBC]: {
        chainId: 8899 as SupportedChainId,
        isKap20Token: (_addr: string) => false,
        decimalsOf: (addr: string) => chains[8899].tokens.find(t => t.value.toUpperCase() === addr.toUpperCase())?.decimal ?? 18,
        displayPrecision: 4,
    },
    [LiquidityVariant.BKC_TESTNET]: {
        chainId: 25925 as SupportedChainId,
        isKap20Token: (addr: string) => {
            const t = chains[25925].tokens[2]?.value?.toUpperCase()
            return !!t && addr?.toUpperCase() === t
        },
        decimalsOf: (addr: string) => chains[25925].tokens.find(t => t.value.toUpperCase() === addr.toUpperCase())?.decimal ?? 18,
        displayPrecision: 4,
    },
} as const
export type LiquidityVariantConfig = typeof liquidityVariantConfig[LiquidityVariant]
