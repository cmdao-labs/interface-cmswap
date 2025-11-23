import { useAccount } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { chains, type SupportedChainId, type SupportedChainConfig } from '@/lib/chains'
import { getLiquidityVariant, liquidityVariantConfig } from './liquidityVariant'

export function useSwapChain() {
    const { chainId } = useAccount()
    const variant = getLiquidityVariant(chainId)
    const cfg = liquidityVariantConfig[variant]
    const effectiveChainId = (chainId as SupportedChainId) ?? cfg.chainId
    const chainCfg = chains[effectiveChainId] as SupportedChainConfig
    const isNative = (addr: string) => addr?.toUpperCase() === chainCfg.tokens[0].value.toUpperCase()
    const toWrapped = (addr: string) => (isNative(addr) ? (chainCfg.tokens[1]?.value ?? chainCfg.tokens[0].value) : addr)
    const decimalsOf = (addr: string) => cfg.decimalsOf(addr)
    const displayPrecision = cfg.displayPrecision
    const isKap20Token = (addr: string) => cfg.isKap20Token(addr)
    const parseAmount = (amount: string, decimals: number) => {
        try { return parseUnits(amount || '0', decimals) } catch { return BigInt(0) }
    }
    const formatAmount = (value: bigint, decimals: number) => {
        try { return formatUnits(value, decimals) } catch { return '0' }
    }
    const common = {
        qouterV2Contract: (chainCfg as any).qouterV2Contract,
        router02Contract: (chainCfg as any).router02Contract,
        ROUTER02: (chainCfg as any).ROUTER02 as '0xstring' | undefined,
        erc20ABI: (chainCfg as any).erc20ABI,
        kap20ABI: (chainCfg as any).kap20ABI,
        wrappedNative: (chainCfg as any).wrappedNative,
        unwarppedNative: (chainCfg as any).unwarppedNative,
    }
    const extras = {
        CMswapUniSmartRouteContractV2: (chainCfg as any).CMswapUniSmartRouteContractV2,
        CMswapUniSmartRoute: (chainCfg as any).CMswapUniSmartRoute as '0xstring' | undefined,
        UniswapPairv2PoolABI: (chainCfg as any).UniswapPairv2PoolABI,
        bkcUnwapped: (chainCfg as any).bkcUnwapped as '0xstring' | undefined,
        CMswapPoolDualRouterContract: (chainCfg as any).CMswapPoolDualRouterContract,
        CMswapUniSmartRouteContract: (chainCfg as any).CMswapUniSmartRouteContract,
    }
    return {variant, chainId: effectiveChainId, chainCfg, tokens: chainCfg.tokens, isNative, toWrapped, decimalsOf, displayPrecision, isKap20Token, parseAmount, formatAmount, ...common, ...extras,}
}
