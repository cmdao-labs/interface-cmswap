import { createPublicClient, http, erc20Abi } from 'viem'
import { bitkub } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative, kap20abi,CMswapUniSmartRouteABIV2,UniswapPair,BitkubEvmKYCABI,CMswapP2PMarketplaceABI,bkcUnwappedKKUB,cmSwapRefProgramABI,testnetTokenFaucetTradeABI } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'KUB', value: '0xnative' as '0xstring', logo: '/96.png' },
    { name: 'KKUB', value: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring', logo: '/96.png' },
    { name: 'testKUB', value: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring', logo: '/cmm.png' },
    { name: 'testToken', value: '0x23352915164527e0AB53Ca5519aec5188aa224A2' as '0xstring', logo: '/cmm.png' },
]

// market
type Token = {
  name: string;
  value: '0xstring'; 
  logo: string;
};

export const game_tokens: Record<string, Token[]> = {
    'CMswap': [
        {name: 'testToken',value: '0x23352915164527e0AB53Ca5519aec5188aa224A2' as '0xstring',logo: './cmm.png'},
        ]
    }

export const AddrZero = '0x0000000000000000000000000000000000000000' as '0xstring'
export const V3_FACTORY = '0x090C6E5fF29251B1eF9EC31605Bdd13351eA316C' as '0xstring'
export const POSITION_MANAGER = '0xb6b76870549893c6b59E7e979F254d0F9Cca4Cc9' as '0xstring'
export const positionManagerCreatedAt = BigInt(25033368)
export const QOUTER_V2 = '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f' as '0xstring'
export const ROUTER02 = '0x3F7582E36843FF79F173c7DC19f517832496f2D8' as '0xstring'
export const CMswapUniSmartRoute = '0x01837156518e60362048e78d025a419C51346f55' as '0xstring'
export const BitkubEvmKYC = '0x409CF41ee862Df7024f289E9F2Ea2F5d0D7f3eb4' as '0xstring' // kyc for unwrap kkub
export const bkcUnwapped = '0xff76DD8086428EBC4Ed1b14B0e56E95eDc46a315' as '0xstring'

//** TestNet Contract */
export const cmSwapRefProgram = '0x01837156518e60362048e78d025a419c51346f55' as '0xstring'
export const CMswapP2PMarketplace = '0x88Aed8690fCf9Cb5e826e59fd1a42c7F73AB3c80' as '0xstring'
export const testNetFaucetAddr = '0x13763ccf9B4Aa6FdC8eC02bf274B19c0bF3376C1' as '0xstring'

export const faucetTestTokenContract = {chainId: 25925,abi : testnetTokenFaucetTradeABI, address: testNetFaucetAddr} as const
export const v3FactoryContract = { chainId: 25925, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 25925, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 25925, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 25925, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 25925, abi: erc20Abi } as const
export const kap20ABI = { chainId: 25925, abi: kap20abi } as const
export const v3PoolABI = { chainId: 25925, abi: v3Pool } as const
export const V3_STAKER = '0xC216ad61623617Aa01b757A06836AA8D6fb547fF' as '0xstring'
export const v3StakerContract = { chainId: 25925, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 25925, abi: WrappedNative, address: tokens[1].value } as const
export const unwarppedNative = {chainId:25925, abi: bkcUnwappedKKUB, address: bkcUnwapped } as const
export const CMswapUniSmartRouteContractV2 =  { chainId: 25925, abi: CMswapUniSmartRouteABIV2 , address: CMswapUniSmartRoute} as const
export const UniswapPairv2PoolABI = { chainId: 25925, abi: UniswapPair} as const
export const BitkubEvmKYCContract = {chainId: 25925, abi: BitkubEvmKYCABI, address: BitkubEvmKYC} as const
export const CMswapP2PMarketplaceContract = {chainId: 25925, abi: CMswapP2PMarketplaceABI, address: CMswapP2PMarketplace} as const
export const cmSwapRefProgramContract = {chainId: 25925, abi: cmSwapRefProgramABI, address: cmSwapRefProgram} as const
export const publicClient = createPublicClient({ chain: bitkub, transport: http() })
