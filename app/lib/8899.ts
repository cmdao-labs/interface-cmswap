import { erc20Abi, erc721Abi, createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, FieldsV2RouterAbi, FieldsHook001, v3staker, FieldsHook003, WrappedNative,CMswapPoolDualRouterABI } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'JBC', value: '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747' as '0xstring', logo: './jbc.png' },
    { name: 'JUSDT', value: '0x24599b658b57f91E7643f4F154B16bcd2884f9ac' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi' },
    { name: 'CMJ', value: '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u' },
    { name: 'WOOD-V2', value: '0x8339E417ED03cf4733f6FcFB9D295bE588fe2156' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4' },
    { name: 'USDT (JBC Bridge)', value: '0xFD8Ef75c1cB00A594D02df48ADdc27414Bd07F8a' as '0xstring', logo: 'https://jibswap.com/images/tokens/USDT.png' },
    { name: 'BB', value: '0x8fcC6e3a23a0255057bfD9A97799b3a995Bf3D24' as '0xstring', logo: 'https://daobuddy.xyz/img/commuDao/token/BB.png' },
    { name: 'DoiJIB', value: '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi' },
    { name: 'KOI', value: '0x7dB96BAdD11596E69db7a6ab1e674Ac711fD83a0' as '0xstring', logo: 'https://ipfs.io/ipfs/QmWQzTaEULPdVkYAkhgRmhjEiJxurtRTx6DkpxghPZar4L' },
    // can PR listing here
]
export const V3_FACTORY = '0x5835f123bDF137864263bf204Cf4450aAD1Ba3a7' as '0xstring'
export const POSITION_MANAGER = '0xfC445018B20522F9cEd1350201e179555a7573A1' as '0xstring'
export const positionManagerCreatedAt = BigInt(4990192)
export const QOUTER_V2 = '0x5ad32c64A2aEd381299061F32465A22B1f7A2EE2' as '0xstring'
export const ROUTER02 = '0x2174b3346CCEdBB4Faaff5d8088ff60B74909A9d' as '0xstring'
export const CMswapPoolDualRouter = '0xdCC3b8b6B166Cd0026CEdF68871f0cE92DB880ec' as '0xstring'
export const v3FactoryContract = { chainId: 8899, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 8899, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 8899, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 8899, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 8899, abi: erc20Abi } as const
export const v3PoolABI = { chainId: 8899, abi: v3Pool } as const
export const V3_STAKER = '0xC7Aa8C815937B61F70E04d814914683bB9Bd7579' as '0xstring'
export const v3StakerContract = { chainId: 8899, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 8899, abi: WrappedNative, address: tokens[0].value } as const
export const CMswapPoolDualRouterContract = { chainId: 8899, abi: CMswapPoolDualRouterABI , address: CMswapPoolDualRouter} as const
// fields
export const v2routerAddr = '0x8E83E1Bb0E1aF049Ab4748F328Ce6760bd7ae431' as '0xstring'
export const v2routerCreatedAt = BigInt(5085287)
export const v2routerContract = { chainId: 8899, abi: FieldsV2RouterAbi, address: v2routerAddr } as const
export const hook001Addr = '0xbDD70Fd36f9395Ef929178C026967021152C885B' as '0xstring'
export const FieldsHook001Contract = { chainId: 8899, abi: FieldsHook001, address: hook001Addr } as const
export const nftIndex1Addr = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A' as '0xstring'
export const nftIndex1CreatedAt = BigInt(335027)
export const nftIndex2Addr = '0xA6f8cE1425E0fC4b74f3b1c2f9804e9968f90e17' as '0xstring'
export const nftIndex2CreatedAt = BigInt(2260250)
export const nftIndex3Addr = '0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251' as '0xstring'
export const nftIndex3CreatedAt = BigInt(119318)
export const nftIndex4Addr = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02' as '0xstring'
export const nftIndex4CreatedAt = BigInt(515400)
// add nft addr, created at here

export const erc721ABI = { chainId: 8899, abi: erc721Abi } as const
export const esTokenHook003Addr = '0x8ec1ca06d5a6a01ef34543728a584b8dcbd18f79' as '0xstring'
export const hook003Addr = '0xFC80A1D63044353fdf96f68fCCd16d9944473e5d' as '0xstring'
export const FieldsHook003Contract = { chainId: 8899, abi: FieldsHook003, address: hook003Addr } as const

export const publicClient = createPublicClient({ chain: jbc, transport: http() })
