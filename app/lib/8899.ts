import { erc20Abi, erc721Abi, createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, FieldsV2RouterAbi, FieldsHook001 } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'WJBC', value: '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq' },
    { name: 'JUSDT', value: '0x24599b658b57f91E7643f4F154B16bcd2884f9ac' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi' },
    { name: 'USDT (JBC Bridge)', value: '0xFD8Ef75c1cB00A594D02df48ADdc27414Bd07F8a' as '0xstring', logo: 'https://jibswap.com/images/tokens/USDT.png' },
    { name: 'BB', value: '0x8fcC6e3a23a0255057bfD9A97799b3a995Bf3D24' as '0xstring', logo: 'https://daobuddy.xyz/img/commuDao/token/BB.png' },
    { name: 'CMJ', value: '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u' },
    { name: 'CMD-WOOD', value: '0x8652549D215E3c4e30fe33faa717a566E4f6f00C' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4' },
    // can PR listing here
]
export const V3_FACTORY = '0x5835f123bDF137864263bf204Cf4450aAD1Ba3a7' as '0xstring'
export const POSITION_MANAGER = '0xfC445018B20522F9cEd1350201e179555a7573A1' as '0xstring'
export const QOUTER_V2 = '0x5ad32c64A2aEd381299061F32465A22B1f7A2EE2' as '0xstring'
export const ROUTER02 = '0x2174b3346CCEdBB4Faaff5d8088ff60B74909A9d' as '0xstring'
export const v3FactoryContract = { chainId: 8899, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 8899, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 8899, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 8899, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 8899, abi: erc20Abi } as const
export const v3PoolABI = { chainId: 8899, abi: v3Pool } as const

// fields
export const v2routerAddr = '0x4b958647b3D5240587843C16d4dfC13B19de2671' as '0xstring'
export const v2routerCreatedAt = BigInt(4938709)
export const v2routerContract = { chainId: 8899, abi: FieldsV2RouterAbi, address: v2routerAddr } as const
export const hook001Addr = '0xE8757f3e371410B5dbeE83dcAE0876e61B1A2042' as '0xstring'
export const FieldsHook001Contract = { chainId: 8899, abi: FieldsHook001, address: hook001Addr } as const
export const nftIndex2Addr = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A' as '0xstring'
export const nftIndex2CreatedAt = BigInt(335027)
export const nftIndex3Addr = '0xA6f8cE1425E0fC4b74f3b1c2f9804e9968f90e17' as '0xstring'
export const nftIndex3CreatedAt = BigInt(2260250)
export const nftIndex4Addr = '0xb6aaD2B2f9fD5eA0356F49c60Ee599De56206251' as '0xstring'
export const nftIndex4CreatedAt = BigInt(119318)
export const nftIndex5Addr = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02' as '0xstring'
export const nftIndex5CreatedAt = BigInt(515400)
export const erc721ABI = { chainId: 8899, abi: erc721Abi } as const
// add nft addr, created at here

export const publicClient = createPublicClient({ chain: jbc, transport: http() })
