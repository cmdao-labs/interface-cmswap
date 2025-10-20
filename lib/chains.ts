import { createPublicClient, http, erc20Abi, erc721Abi } from 'viem'
import { bitkub, bitkubTestnet, jbc, } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative, kap20abi, CMswapPoolDualRouterABI, CMswapUniSmartRouteABI, CMswapUniSmartRouteABIV2, UniswapPair, bkcUnwappedKKUB, cmSwapRefProgramABI, stakingV2FactoryABI, stakingV2ABI, stakingV3FactoryABI, stakingV3ABI, } from '@/lib/abi'

type Token = {
    name: string
    value: '0xstring'
    logo: string
    decimal: number
}
type ChainData = {
    chainId: number
    chain: typeof bitkub | typeof bitkubTestnet | typeof jbc
    tokens: ReadonlyArray<Token>
    publicClient: ReturnType<typeof createPublicClient>
    [key: string]: unknown
}
const chain25925 = {
    chainId: 25925,
    chain: bitkubTestnet,
    tokens: [
        { name: 'KUB', value: '0xnative' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u', decimal: 18 },
        { name: 'tKKUB', value: '0x700D3ba307E1256e509eD3E45D6f9dff441d6907' as '0xstring', logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u', decimal: 18 },
    {
      name: 'testKUB',
      value: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring',
      logo: '',
      decimal: 18,
    },
    {
      name: 'testToken',
      value: '0x23352915164527e0AB53Ca5519aec5188aa224A2' as '0xstring',
      logo: '',
      decimal: 18,
    },
  ],
  AddrZero: '0x0000000000000000000000000000000000000000' as '0xstring',
  V3_FACTORY: '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b' as '0xstring',
  V3_FACTORYCreatedAt: BigInt(23935400),
  POSITION_MANAGER: '0x690f45C21744eCC4ac0D897ACAC920889c3cFa4b' as '0xstring',
  positionManagerCreatedAt: BigInt(23935419),
  QOUTER_V2: '0x3F64C4Dfd224a102A4d705193a7c40899Cf21fFe' as '0xstring',
  ROUTER02: '0x3C5514335dc4E2B0D9e1cc98ddE219c50173c5Be' as '0xstring',
  CMswapUniSmartRoute: '0x01837156518e60362048e78d025a419C51346f55' as '0xstring',
  BitkubEvmKYC: '0x409CF41ee862Df7024f289E9F2Ea2F5d0D7f3eb4' as '0xstring',
  CMswapUniSmartRouteBestRate: '0xCF192D5b5B3a124bC75b43089F50CF13E52941AD' as '0xstring',
  v3FactoryContract: { chainId: 25925, abi: v3Factory, address: '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b' as '0xstring' } as const,
  positionManagerContract: {
    chainId: 25925,
    address: '0x690f45C21744eCC4ac0D897ACAC920889c3cFa4b' as '0xstring',
    abi: NonfungiblePositionManager,
  } as const,
  qouterV2Contract: {
    chainId: 25925,
    abi: qouterV2,
    address: '0x3F64C4Dfd224a102A4d705193a7c40899Cf21fFe' as '0xstring',
  } as const,
  router02Contract: {
    chainId: 25925,
    abi: router02,
    address: '0x3C5514335dc4E2B0D9e1cc98ddE219c50173c5Be' as '0xstring',
  } as const,
  v3PoolABI: { chainId: 25925, abi: v3Pool } as const,
  V3_STAKER: '0x778709C09Df2FCa521c7465C0B8Eb0bFC13ed2F1' as '0xstring',
  v3StakerContract: {
    chainId: 25925,
    address: '0x778709C09Df2FCa521c7465C0B8Eb0bFC13ed2F1' as '0xstring',
    abi: v3staker,
  } as const,
  wrappedNative: {
    chainId: 25925,
    abi: WrappedNative,
    address: '0x700D3ba307E1256e509eD3E45D6f9dff441d6907' as '0xstring',
  } as const,
  unwarppedNative: {
    chainId: 25925,
    abi: WrappedNative,
    address: '0x700D3ba307E1256e509eD3E45D6f9dff441d6907' as '0xstring',
  } as const,
  CMswapUniSmartRouteContractV2: {
    chainId: 25925,
    abi: CMswapUniSmartRouteABIV2,
    address: '0x01837156518e60362048e78d025a419C51346f55' as '0xstring',
  } as const,
  UniswapPairv2PoolABI: { chainId: 25925, abi: UniswapPair } as const,
  StakingFactoryV2: '0xB2335f770497Caaa9DE22f1296f172939AB786Ca' as '0xstring',
  StakingFactoryV2Contract: {
    chainId: 25925,
    abi: stakingV2FactoryABI,
    address: '0xB2335f770497Caaa9DE22f1296f172939AB786Ca' as '0xstring',
  } as const,
  StakingFactoryV3: '0xa894aAa564F66e59783384995C9ddaaEC9E97291' as '0xstring',
  StakingFactoryV3Contract: {
    chainId: 25925,
    abi: stakingV3FactoryABI,
    address: '0xa894aAa564F66e59783384995C9ddaaEC9E97291' as '0xstring',
  } as const,
  StakingV2ABI: { chainId: 25925, abi: stakingV2ABI } as const,
  StakingV3ABI: { chainId: 25925, abi: stakingV3ABI } as const,
  cmSwapRefProgram: '0x01837156518e60362048e78d025a419c51346f55' as '0xstring',
  CMswapP2PMarketplace: '0x249755CDB225405C4505CeDC3639b445C6346392' as '0xstring',
  testNetFaucetAddr: '0x13763ccf9B4Aa6FdC8eC02bf274B19c0bF3376C1' as '0xstring',
  erc20ABI: { chainId: 25925, abi: erc20Abi } as const,
  kap20ABI: { chainId: 25925, abi: kap20abi } as const,
  erc721ABI: { chainId: 25925, abi: erc721Abi } as const,
  cmSwapRefProgramContract: {
    chainId: 25925,
    abi: cmSwapRefProgramABI,
    address: '0x01837156518e60362048e78d025a419c51346f55' as '0xstring',
  } as const,
  publicClient: createPublicClient({ chain: bitkubTestnet, transport: http() }),
} as const

const chain8899 = {
  chainId: 8899,
  chain: jbc,
  tokens: [
    {
      name: 'JBC',
      value: '0xnative' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreihej2whwsw4p57ayfqxhwijnpmgxtnwhngh5f5pxpvxw73s636hzy',
      decimal: 18,
    },
    {
      name: 'WJBC',
      value: '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreihej2whwsw4p57ayfqxhwijnpmgxtnwhngh5f5pxpvxw73s636hzy',
      decimal: 18,
    },
    {
      name: 'JUSDT',
      value: '0x24599b658b57f91E7643f4F154B16bcd2884f9ac' as '0xstring',
      logo: 'https://gateway.pinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi',
      decimal: 18,
    },
    {
      name: 'CMJ',
      value: '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b' as '0xstring',
      logo: 'https://gateway.pinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u',
      decimal: 18,
    },
    {
      name: 'USDT',
      value: '0xFD8Ef75c1cB00A594D02df48ADdc27414Bd07F8a' as '0xstring',
      logo: 'https://jibswap.com/images/tokens/USDT.png',
      decimal: 18,
    },
    {
      name: 'BB',
      value: '0x8fcC6e3a23a0255057bfD9A97799b3a995Bf3D24' as '0xstring',
      logo: 'https://daobuddy.xyz/img/commuDao/token/BB.png',
      decimal: 18,
    },
    {
      name: 'DoiJIB',
      value: '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB' as '0xstring',
      logo: 'https://gateway.pinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi',
      decimal: 18,
    },
  ],
  V3_FACTORY: '0x5835f123bDF137864263bf204Cf4450aAD1Ba3a7' as '0xstring',
  V3_FACTORYCreatedAt: BigInt(4990175),
  POSITION_MANAGER: '0xfC445018B20522F9cEd1350201e179555a7573A1' as '0xstring',
  positionManagerCreatedAt: BigInt(4990192),
  QOUTER_V2: '0x5ad32c64A2aEd381299061F32465A22B1f7A2EE2' as '0xstring',
  ROUTER02: '0x2174b3346CCEdBB4Faaff5d8088ff60B74909A9d' as '0xstring',
  CMswapPoolDualRouter: '0xdCC3b8b6B166Cd0026CEdF68871f0cE92DB880ec' as '0xstring',
  CMswapUniSmartRoute: '0xb4fE95eFFD4B1E1d3727700984a99d5687343519' as '0xstring',
  v3FactoryContract: { chainId: 8899, abi: v3Factory, address: '0x5835f123bDF137864263bf204Cf4450aAD1Ba3a7' as '0xstring' } as const,
  positionManagerContract: {
    chainId: 8899,
    address: '0xfC445018B20522F9cEd1350201e179555a7573A1' as '0xstring',
    abi: NonfungiblePositionManager,
  } as const,
  qouterV2Contract: {
    chainId: 8899,
    abi: qouterV2,
    address: '0x5ad32c64A2aEd381299061F32465A22B1f7A2EE2' as '0xstring',
  } as const,
  router02Contract: {
    chainId: 8899,
    abi: router02,
    address: '0x2174b3346CCEdBB4Faaff5d8088ff60B74909A9d' as '0xstring',
  } as const,
  erc20ABI: { chainId: 8899, abi: erc20Abi } as const,
  v3PoolABI: { chainId: 8899, abi: v3Pool } as const,
  V3_STAKER: '0xC7Aa8C815937B61F70E04d814914683bB9Bd7579' as '0xstring',
  v3StakerContract: {
    chainId: 8899,
    address: '0xC7Aa8C815937B61F70E04d814914683bB9Bd7579' as '0xstring',
    abi: v3staker,
  } as const,
  wrappedNative: {
    chainId: 8899,
    abi: WrappedNative,
    address: '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747' as '0xstring',
  } as const,
  CMswapPoolDualRouterContract: {
    chainId: 8899,
    abi: CMswapPoolDualRouterABI,
    address: '0xdCC3b8b6B166Cd0026CEdF68871f0cE92DB880ec' as '0xstring',
  } as const,
  CMswapUniSmartRouteContract: {
    chainId: 8899,
    abi: CMswapUniSmartRouteABI,
    address: '0xb4fE95eFFD4B1E1d3727700984a99d5687343519' as '0xstring',
  } as const,
  erc721ABI: { chainId: 8899, abi: erc721Abi } as const,
  publicClient: createPublicClient({ chain: jbc, transport: http() }),
} as const

const chain96 = {
  chainId: 96,
  chain: bitkub,
  tokens: [
    {
      name: 'KUB',
      value: '0xnative' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u',
      decimal: 18,
    },
    {
      name: 'KKUB',
      value: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u',
      decimal: 18,
    },
    {
      name: 'KUSDT',
      value: '0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreieg7yf6iwx7obygg62hz252bwnaddedanvlizonaawagk7eze4qcu',
      decimal: 18,
    },
    {
      name: 'CMM',
      value: '0x9B005000A10Ac871947D99001345b01C1cEf2790' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreiavqn4meapmjfpe756wrg4fsdnd33brbrsi55mb27tmttoctbyzme',
      decimal: 18,
    },
    {
      name: 'LUMI',
      value: '0x95013Dcb6A561e6C003AED9C43Fb8B64008aA361' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreif336hux427usw7cdeyxgfuls7xkstal6yphat2fdxwvvb4icnkcq',
      decimal: 18,
    },
    {
      name: 'ISOLA',
      value: '0xC8925E89bE4Ce76218a3e52B995C5Ae02662A94F' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreiggs47xpvrutabszgn73mwchzambqbv4dspreoglqqioazof4k2sa',
      decimal: 18,
    },
    {
      name: 'KSOLA',
      value: '0x9cf6dF95b918307Ff81feF70E616a094e9977a28' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreie7n4loanq3vbji47ijr6xhsf47xsbf4fybrjwzkerwd2aonnr6xq',
      decimal: 18,
    },
    {
      name: 'KJFIN',
      value: '0x9BEc198c43B0714aEEd3c1bF21498ecBeFEB19F8' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafkreicsaxloa43u6xq2pscenskkmqwyb2w5gwauik735opgoc2qzpmob4',
      decimal: 18,
    },
    {
      name: 'SHK',
      value: '0xF27DF35ead39E2aed24cc05C52db303Ef4C4aA83' as '0xstring',
      logo: 'https://cmswap.mypinata.cloud/ipfs/bafybeictpc76cigf42dly6c3qtnbu5cbtons4qvsqr4juxcs7g7k4nbche',
      decimal: 18,
    },
  ],
  AddrZero: '0x0000000000000000000000000000000000000000' as '0xstring',
  V3_FACTORY: '0x090C6E5fF29251B1eF9EC31605Bdd13351eA316C' as '0xstring',
  V3_FACTORYCreatedAt: BigInt(25033350),
  POSITION_MANAGER: '0xb6b76870549893c6b59E7e979F254d0F9Cca4Cc9' as '0xstring',
  positionManagerCreatedAt: BigInt(25033368),
  QOUTER_V2: '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f' as '0xstring',
  ROUTER02: '0x3F7582E36843FF79F173c7DC19f517832496f2D8' as '0xstring',
  CMswapUniSmartRoute: '0x01837156518e60362048e78d025a419C51346f55' as '0xstring',
  BitkubEvmKYC: '0x409CF41ee862Df7024f289E9F2Ea2F5d0D7f3eb4' as '0xstring',
  bkcUnwapped: '0xff76DD8086428EBC4Ed1b14B0e56E95eDc46a315' as '0xstring',
  cmSwapRefProgram: '0xf74C099613eF374Aa3cCE75fA8c0B8eF1928f759' as '0xstring',
  CMswapP2PMarketplace: '0xaa2eA24C5Fa6E8Ea267143A81FbDFb365c36c8D8' as '0xstring',
  v3FactoryContract: { chainId: 96, abi: v3Factory, address: '0x090C6E5fF29251B1eF9EC31605Bdd13351eA316C' as '0xstring' } as const,
  positionManagerContract: {
    chainId: 96,
    address: '0xb6b76870549893c6b59E7e979F254d0F9Cca4Cc9' as '0xstring',
    abi: NonfungiblePositionManager,
  } as const,
  qouterV2Contract: {
    chainId: 96,
    abi: qouterV2,
    address: '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f' as '0xstring',
  } as const,
  router02Contract: {
    chainId: 96,
    abi: router02,
    address: '0x3F7582E36843FF79F173c7DC19f517832496f2D8' as '0xstring',
  } as const,
  erc20ABI: { chainId: 96, abi: erc20Abi } as const,
  kap20ABI: { chainId: 96, abi: kap20abi } as const,
  v3PoolABI: { chainId: 96, abi: v3Pool } as const,
  V3_STAKER: '0xC216ad61623617Aa01b757A06836AA8D6fb547fF' as '0xstring',
  v3StakerContract: {
    chainId: 96,
    address: '0xC216ad61623617Aa01b757A06836AA8D6fb547fF' as '0xstring',
    abi: v3staker,
  } as const,
  wrappedNative: {
    chainId: 96,
    abi: WrappedNative,
    address: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring',
  } as const,
  unwarppedNative: {
    chainId: 96,
    abi: bkcUnwappedKKUB,
    address: '0xff76DD8086428EBC4Ed1b14B0e56E95eDc46a315' as '0xstring',
  } as const,
  CMswapUniSmartRouteContractV2: {
    chainId: 96,
    abi: CMswapUniSmartRouteABIV2,
    address: '0x01837156518e60362048e78d025a419C51346f55' as '0xstring',
  } as const,
  UniswapPairv2PoolABI: { chainId: 96, abi: UniswapPair } as const,
  cmSwapRefProgramContract: {
    chainId: 96,
    abi: cmSwapRefProgramABI,
    address: '0xf74C099613eF374Aa3cCE75fA8c0B8eF1928f759' as '0xstring',
  } as const,
  publicClient: createPublicClient({ chain: bitkub, transport: http() }),
} as const

export const chains = {
    25925: chain25925,
    8899: chain8899,
    96: chain96,
} as const satisfies Record<number, ChainData>
export type SupportedChainId = keyof typeof chains extends `${infer Id extends number}` ? Id : never
export type SupportedChainConfig = (typeof chains)[keyof typeof chains]
export const getChainConfig = (chainId: number): SupportedChainConfig | undefined => chains[chainId as keyof typeof chains] as SupportedChainConfig | undefined
