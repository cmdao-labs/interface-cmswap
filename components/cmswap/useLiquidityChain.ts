import { useAccount } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { chains, type SupportedChainId, type SupportedChainConfig } from '@/lib/chains'
import { getLiquidityVariant, liquidityVariantConfig } from './liquidityVariant'

export function useLiquidityChain() {
    const { chainId } = useAccount()
    const variant = getLiquidityVariant(chainId)
    const cfg = liquidityVariantConfig[variant]
    const effectiveChainId = (chainId as SupportedChainId) ?? cfg.chainId
    const chainCfg = chains[effectiveChainId] as SupportedChainConfig
    const isNative = (addr: string) => addr?.toUpperCase() === chainCfg.tokens[0].value.toUpperCase()
    const toWrapped = (addr: string) => (isNative(addr) ? chainCfg.tokens[1].value : addr)
    const decimalsOf = (addr: string) => cfg.decimalsOf(addr)
    const displayPrecision = cfg.displayPrecision
    const isKap20Token = (addr: string) => cfg.isKap20Token(addr)
    const parseAmount = (amount: string, decimals: number) => {
        try { return parseUnits(amount || '0', decimals) } catch { return BigInt(0) }
    }
    const formatAmount = (value: bigint, decimals: number) => {
        try { return formatUnits(value, decimals) } catch { return '0' }
    }
    return {variant, chainCfg, chainId: effectiveChainId, tokens: chainCfg.tokens, POSITION_MANAGER: chainCfg.POSITION_MANAGER as '0xstring', v3FactoryContract: chainCfg.v3FactoryContract, positionManagerContract: chainCfg.positionManagerContract, erc20ABI: chainCfg.erc20ABI, kap20ABI: (chainCfg as any).kap20ABI as (typeof chainCfg)['erc20ABI'] | undefined, v3PoolABI: chainCfg.v3PoolABI, isNative, toWrapped, decimalsOf, displayPrecision, isKap20Token, parseAmount, formatAmount,}
}
