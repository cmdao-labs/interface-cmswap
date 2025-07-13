import { createPublicClient, http, erc20Abi } from 'viem'
import { bitkub } from 'viem/chains'
import { kap20abi,CMswapP2PMarketplaceABI,cmSwapRefProgramABI,testnetTokenFaucetTradeABI } from '@/app/lib/abi'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative,CMswapUniSmartRouteABIV2,CMswapUniSmartRouteV3,UniswapPair,BitkubEvmKYCABI,bkcUnwappedKKUB } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'KUB', value: '0xnative' as '0xstring', logo: '/96.png' },
    { name: 'KKUB', value: '0x37f57ae5c5662191a5d87d94c8a8445ee2e2aba7' as '0xstring', logo: '/96.png' },
    { name: 'testKUB', value: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring', logo: '' },
    { name: 'testToken', value: '0x23352915164527e0AB53Ca5519aec5188aa224A2' as '0xstring', logo: '' },
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
export const V3_FACTORY = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142' as '0xstring'
export const POSITION_MANAGER = '0x5f364Ef9241EAe92A1ea361Fe4976759d7656455' as '0xstring'
export const positionManagerCreatedAt = BigInt(23850227)
export const QOUTER_V2 = '0x555756bd5B347853af6F713a2aF6231414BEdEFC' as '0xstring'
export const ROUTER02 = '0x5a16536BB85a2fA821ec774008d6068ecED79c96' as '0xstring'

export const CMswapUniSmartRoute = '0x01837156518e60362048e78d025a419C51346f55' as '0xstring'
export const BitkubEvmKYC = '0x409CF41ee862Df7024f289E9F2Ea2F5d0D7f3eb4' as '0xstring' // kyc for unwrap kkub
export const CMswapUniSmartRouteBestRate = '0xCF192D5b5B3a124bC75b43089F50CF13E52941AD' as '0xstring'

export const v3FactoryContract = { chainId: 25925, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 25925, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 25925, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 25925, abi: router02, address: ROUTER02 } as const
export const v3PoolABI = { chainId: 25925, abi: v3Pool } as const
export const V3_STAKER = '0xC216ad61623617Aa01b757A06836AA8D6fb547fF' as '0xstring'
export const v3StakerContract = { chainId: 25925, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 25925, abi: WrappedNative, address: tokens[1].value } as const
export const unwarppedNative = {chainId:25925, abi: WrappedNative, address: tokens[1].value } as const
//export const CMswapUniSmartRouteContractV2 =  { chainId: 25925, abi: CMswapUniSmartRouteABIV2 , address: CMswapUniSmartRouteV3} as const
//export const UniswapPairv2PoolABI = { chainId: 25925, abi: UniswapPair} as const
export const BitkubEvmKYCContract = {chainId: 25925, abi: BitkubEvmKYCABI, address: BitkubEvmKYC} as const
//export const CMswapUniSmartRouteBestRateContract = {chainId: 25925, abi: CMswapUniSmartRouteV3, address: CMswapUniSmartRouteBestRate} as const


//** TestNet Contract */

export const cmSwapRefProgram = '0x01837156518e60362048e78d025a419c51346f55' as '0xstring'
export const CMswapP2PMarketplace = '0x249755CDB225405C4505CeDC3639b445C6346392' as '0xstring'
export const testNetFaucetAddr = '0x13763ccf9B4Aa6FdC8eC02bf274B19c0bF3376C1' as '0xstring'

export const faucetTestTokenContract = {chainId: 25925,abi : testnetTokenFaucetTradeABI, address: testNetFaucetAddr} as const

export const erc20ABI = { chainId: 25925, abi: erc20Abi } as const
export const kap20ABI = { chainId: 25925, abi: kap20abi } as const

export const CMswapP2PMarketplaceContract = {chainId: 25925, abi: CMswapP2PMarketplaceABI, address: CMswapP2PMarketplace} as const
export const cmSwapRefProgramContract = {chainId: 25925, abi: cmSwapRefProgramABI, address: cmSwapRefProgram} as const

export const publicClient = createPublicClient({ chain: bitkub, transport: http() })
