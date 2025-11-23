import { createPublicClient, http, erc20Abi, erc721Abi } from 'viem'
import { bitkubTestnet } from 'viem/chains'
import { kap20abi,CMswapP2PMarketplaceABI,cmSwapRefProgramABI,testnetTokenFaucetTradeABI, stakingV2FactoryABI,stakingV3FactoryABI, stakingV2ABI,stakingV3ABI } from '@/app/lib/abi'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative,CMswapUniSmartRouteABIV2,UniswapPair,BitkubEvmKYCABI } from '@/app/lib/abi'

export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'KUB', value: '0xnative' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u' },
    { name: 'tKKUB', value: '0x700D3ba307E1256e509eD3E45D6f9dff441d6907' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u' },
    { name: 'testKUB', value: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring', logo: '' },
    { name: 'testToken', value: '0x23352915164527e0AB53Ca5519aec5188aa224A2' as '0xstring', logo: '' },
    // can PR listing here
]

export const AddrZero = '0x0000000000000000000000000000000000000000' as '0xstring'
export const V3_FACTORY = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b' as '0xstring'
export const V3_FACTORYCreatedAt = BigInt(23935400)
export const POSITION_MANAGER = '0x690f45C21744eCC4ac0D897ACAC920889c3cFa4b' as '0xstring'
export const positionManagerCreatedAt = BigInt(23935419)
export const QOUTER_V2 = '0x3F64C4Dfd224a102A4d705193a7c40899Cf21fFe' as '0xstring'
export const ROUTER02 = '0x3C5514335dc4E2B0D9e1cc98ddE219c50173c5Be' as '0xstring'

export const CMswapUniSmartRoute = '0x01837156518e60362048e78d025a419C51346f55' as '0xstring'
export const BitkubEvmKYC = '0x409CF41ee862Df7024f289E9F2Ea2F5d0D7f3eb4' as '0xstring' // kyc for unwrap kkub
export const CMswapUniSmartRouteBestRate = '0xCF192D5b5B3a124bC75b43089F50CF13E52941AD' as '0xstring'

export const v3FactoryContract = { chainId: 25925, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 25925, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 25925, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 25925, abi: router02, address: ROUTER02 } as const
export const v3PoolABI = { chainId: 25925, abi: v3Pool } as const
export const V3_STAKER = '0x778709C09Df2FCa521c7465C0B8Eb0bFC13ed2F1' as '0xstring'
export const v3StakerContract = { chainId: 25925, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 25925, abi: WrappedNative, address: tokens[1].value } as const
export const unwarppedNative = {chainId:25925, abi: WrappedNative, address: tokens[1].value } as const
export const CMswapUniSmartRouteContractV2 =  { chainId: 25925, abi: CMswapUniSmartRouteABIV2 , address: CMswapUniSmartRoute} as const
export const UniswapPairv2PoolABI = { chainId: 25925, abi: UniswapPair} as const
export const BitkubEvmKYCContract = {chainId: 25925, abi: BitkubEvmKYCABI, address: BitkubEvmKYC} as const
//export const CMswapUniSmartRouteBestRateContract = {chainId: 25925, abi: CMswapUniSmartRouteV3, address: CMswapUniSmartRouteBestRate} as const

export const StakingFactoryV2 = '0xB2335f770497Caaa9DE22f1296f172939AB786Ca' as '0xstring'
export const StakingFactoryV2Contract = {chainId: 25925, abi: stakingV2FactoryABI, address: StakingFactoryV2} as const 

export const StakingFactoryV3 = '0xe445e132E9D4d0863E0BE079faf716A97250f37E' as '0xstring' // Uniswap V3 Staking Factory Address
export const StakingFactoryV3Contract = {chainId: 25925, abi: stakingV3ABI, address: StakingFactoryV3} as const 
export const StakingFactoryV3CreatedAt = BigInt(26183742)

export const StakingV2ABI = {chainId: 25925, abi: stakingV2ABI}
export const StakingV3ABI = {chainId: 25925, abi: stakingV3ABI}

//** TestNet Contract */

export const cmSwapRefProgram = '0x01837156518e60362048e78d025a419c51346f55' as '0xstring'
export const CMswapP2PMarketplace = '0x249755CDB225405C4505CeDC3639b445C6346392' as '0xstring'
export const testNetFaucetAddr = '0x13763ccf9B4Aa6FdC8eC02bf274B19c0bF3376C1' as '0xstring'

export const faucetTestTokenContract = {chainId: 25925,abi : testnetTokenFaucetTradeABI, address: testNetFaucetAddr} as const

export const erc20ABI = { chainId: 25925, abi: erc20Abi } as const
export const kap20ABI = { chainId: 25925, abi: kap20abi } as const
export const erc721ABI = { chainId: 25925, abi: erc721Abi } as const

export const CMswapP2PMarketplaceContract = {chainId: 25925, abi: CMswapP2PMarketplaceABI, address: CMswapP2PMarketplace} as const
export const cmSwapRefProgramContract = {chainId: 25925, abi: cmSwapRefProgramABI, address: cmSwapRefProgram} as const

export const publicClient = createPublicClient({ chain: bitkubTestnet, transport: http() })
