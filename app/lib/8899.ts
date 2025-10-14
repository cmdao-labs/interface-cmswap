import { erc20Abi, erc721Abi, createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative, CMswapPoolDualRouterABI, CMswapUniSmartRouteABI } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string, decimal: number}[] = [
    { name: 'JBC', value: '0xnative' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreihej2whwsw4p57ayfqxhwijnpmgxtnwhngh5f5pxpvxw73s636hzy', decimal: 18 },
    { name: 'WJBC', value: '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreihej2whwsw4p57ayfqxhwijnpmgxtnwhngh5f5pxpvxw73s636hzy', decimal: 18 },
    { name: 'JUSDT', value: '0x24599b658b57f91E7643f4F154B16bcd2884f9ac' as '0xstring', logo: 'https://gateway.pinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi', decimal: 6 },
    { name: 'CMJ', value: '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b' as '0xstring', logo: 'https://gateway.pinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u', decimal: 18 },
    { name: 'USDT', value: '0xFD8Ef75c1cB00A594D02df48ADdc27414Bd07F8a' as '0xstring', logo: 'https://jibswap.com/images/tokens/USDT.png', decimal: 6 },
    { name: 'BB', value: '0x8fcC6e3a23a0255057bfD9A97799b3a995Bf3D24' as '0xstring', logo: 'https://daobuddy.xyz/img/commuDao/token/BB.png', decimal: 18 },
    { name: 'DoiJIB', value: '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB' as '0xstring', logo: 'https://gateway.pinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi', decimal: 18 },
    // can PR listing here
]

export const V3_FACTORY = '0x5835f123bDF137864263bf204Cf4450aAD1Ba3a7' as '0xstring'
export const V3_FACTORYCreatedAt = BigInt(4990175)
export const POSITION_MANAGER = '0xfC445018B20522F9cEd1350201e179555a7573A1' as '0xstring'
export const positionManagerCreatedAt = BigInt(4990192)
export const QOUTER_V2 = '0x5ad32c64A2aEd381299061F32465A22B1f7A2EE2' as '0xstring'
export const ROUTER02 = '0x2174b3346CCEdBB4Faaff5d8088ff60B74909A9d' as '0xstring'
export const CMswapPoolDualRouter = '0xdCC3b8b6B166Cd0026CEdF68871f0cE92DB880ec' as '0xstring'
export const CMswapUniSmartRoute = '0xb4fE95eFFD4B1E1d3727700984a99d5687343519' as '0xstring'
export const v3FactoryContract = { chainId: 8899, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 8899, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 8899, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 8899, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 8899, abi: erc20Abi } as const
export const v3PoolABI = { chainId: 8899, abi: v3Pool } as const
export const V3_STAKER = '0xC7Aa8C815937B61F70E04d814914683bB9Bd7579' as '0xstring'
export const v3StakerContract = { chainId: 8899, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 8899, abi: WrappedNative, address: tokens[1].value } as const
export const CMswapPoolDualRouterContract = { chainId: 8899, abi: CMswapPoolDualRouterABI , address: CMswapPoolDualRouter} as const
export const CMswapUniSmartRouteContract =  { chainId: 8899, abi: CMswapUniSmartRouteABI , address: CMswapUniSmartRoute} as const

export const erc721ABI = { chainId: 8899, abi: erc721Abi } as const

export const publicClient = createPublicClient({ chain: jbc, transport: http() })
