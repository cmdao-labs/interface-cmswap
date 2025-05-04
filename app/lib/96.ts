import { createPublicClient, http, erc20Abi } from 'viem'
import { bitkub } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative, kap20abi } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'KUB', value: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring', logo: './96.png' },
    { name: 'KUSDT', value: '0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring', logo: './usdt.png' },
    // can PR listing here
]
export const V3_FACTORY = '0x090C6E5fF29251B1eF9EC31605Bdd13351eA316C' as '0xstring'
export const POSITION_MANAGER = '0xb6b76870549893c6b59E7e979F254d0F9Cca4Cc9' as '0xstring'
export const positionManagerCreatedAt = BigInt(25033368)
export const QOUTER_V2 = '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f' as '0xstring'
export const ROUTER02 = '0x3F7582E36843FF79F173c7DC19f517832496f2D8' as '0xstring'
export const v3FactoryContract = { chainId: 96, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 96, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 96, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 96, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 96, abi: erc20Abi } as const
export const kap20ABI = { chainId: 96, abi: kap20abi } as const
export const v3PoolABI = { chainId: 96, abi: v3Pool } as const
export const V3_STAKER = '0xC216ad61623617Aa01b757A06836AA8D6fb547fF' as '0xstring'
export const v3StakerContract = { chainId: 96, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 96, abi: WrappedNative, address: tokens[0].value } as const

export const publicClient = createPublicClient({ chain: bitkub, transport: http() })
