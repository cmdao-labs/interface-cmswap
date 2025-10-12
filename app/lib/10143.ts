import { createPublicClient, http, erc20Abi } from 'viem'
import { monadTestnet } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative, kap20abi,CMswapUniSmartRouteABIV2,UniswapPair,BitkubEvmKYCABI } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string, decimal: number}[] = [
    { name: 'MON', value: '0xnative' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreihsrmtri6lexqqudhckcttijekrerjmckq22v4p5d6tyolpa7qsx4', decimal: 18 },
    { name: 'WMON', value: '0x760afe86e5de5fa0ee542fc7b7b713e1c5425701' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreihsrmtri6lexqqudhckcttijekrerjmckq22v4p5d6tyolpa7qsx4', decimal: 18 },
    { name: 'USDC', value: '0xf817257fed379853cde0fa4f97ab987181b1e5ea' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreia32wzv3mr47pvo5dwdv2lu4rrjd6n4n7yizvyxuvyt5ewdxgvqfm', decimal: 6 },
    { name: 'WETH', value: '0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreigtqspnr2k6nt265g7fllkmsljasygjcqvqbb5igjxbnxakuwho2q', decimal: 18 },
    { name: 'WBTC', value: '0xcf5a6076cfa32686c0df13abada2b40dec133f1d' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreibdegct4vlxyb7k2vsyt6dn3ulo2xslegjkttvge73244rvshxiju', decimal: 8 },
    // can PR listing here
]
export const V3_FACTORY = '0x399fe73bb0ee60670430fd92fe25a0fdd308e142' as '0xstring'
export const POSITION_MANAGER = '0x5f364ef9241eae92a1ea361fe4976759d7656455' as '0xstring'
export const positionManagerCreatedAt = BigInt(16912189)
export const QOUTER_V2 = '0x555756bd5b347853af6f713a2af6231414bedefc' as '0xstring'
export const ROUTER02 = '0x5a16536bb85a2fa821ec774008d6068eced79c96' as '0xstring'
export const v3FactoryContract = { chainId: 10143, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 10143, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 10143, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 10143, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 10143, abi: erc20Abi } as const
export const kap20ABI = { chainId: 10143, abi: kap20abi } as const
export const v3PoolABI = { chainId: 10143, abi: v3Pool } as const
export const V3_STAKER = '0x2769078273c29afc6a21bf8b64368cc5d1972c6a' as '0xstring'
export const v3StakerContract = { chainId: 10143, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 10143, abi: WrappedNative, address: tokens[1].value } as const
export const UniswapPairv2PoolABI = { chainId: 10143, abi: UniswapPair} as const

export const publicClient = createPublicClient({ chain: monadTestnet, transport: http() })
