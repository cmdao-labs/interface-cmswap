import { createPublicClient, http, erc20Abi } from 'viem'
import { bitkub } from 'viem/chains'
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02, v3staker, WrappedNative, kap20abi,CMswapUniSmartRouteABIV2,UniswapPair,BitkubEvmKYCABI,CMswapP2PMarketplaceABI,bkcUnwappedKKUB,cmSwapRefProgramABI } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'KUB', value: '0xnative' as '0xstring', logo: '/96.png' },
    { name: 'KKUB', value: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring', logo: '/96.png' },
    { name: 'KUSDT', value: '0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring', logo: '/usdt.png' },
    { name: 'CMM', value: '0x9B005000A10Ac871947D99001345b01C1cEf2790' as '0xstring', logo: '/cmm.png' },
    { name: 'LUMI', value: '0x95013Dcb6A561e6C003AED9C43Fb8B64008aA361' as '0xstring', logo: '/lumi.webp' },
    { name: 'ISOLA', value: '0xC8925E89bE4Ce76218a3e52B995C5Ae02662A94F' as '0xstring', logo: '/isola.webp' }, 
    { name: 'KSOLA', value: '0x9cf6dF95b918307Ff81feF70E616a094e9977a28' as '0xstring', logo: '/ksola.webp' },
    { name: 'KJFIN', value: '0x9BEc198c43B0714aEEd3c1bF21498ecBeFEB19F8' as '0xstring', logo: '/kjfin.webp' }, 
    // can PR listing here
]

// market
type Token = {
  name: string;
  value: '0xstring'; 
  logo: string;
};

export const game_tokens: Record<string, Token[]> = {
    'Metal Valley': [
        {name: 'Sola Booster',value: '0x619bdEB706ee9407D6f5320Dfeac576ac0eD4197' as '0xstring',logo: './market/Metal Valley/sola-booster.webp'},
        {name: 'Hyper Cube',value: '0x8d35C6719e34ea938bf60Ad60D59557C8376298F' as '0xstring',logo: './market/Metal Valley/hyper-cube.webp'},
        {name: 'Giga Cube',value: '0x5Ff0CE0b02Ac5A1CafB9F1dA16a3f8BbeD1629A8' as '0xstring',logo: './market/Metal Valley/giga-cube.png'},
        {name: 'Super Cube',value: '0x1B6eE9C3ff312C5E4E09BC4BEe2FFd4C67eaF40F' as '0xstring',logo: './market/Metal Valley/super-cube.png'},
        {name: 'Meta Cube',value: '0x5325563918e9Af18E1f007C4033D8C0f4FAD8478' as '0xstring',logo: './market/Metal Valley/meta-cube.webp'},
        {name: 'Miner K',value: '0xd15884036461b16ea682119f59125dfFd9A32fed' as '0xstring',logo: './market/Metal Valley/miner-k.webp'},

        {name: 'Titanite Crystal',value: '0x5ef97c05078e053b15Ef81737CE9F900cb616D7a' as '0xstring',logo: './market/Metal Valley/titanite-crystal.webp'},
        {name: 'Emberite Crystal',value: '0x3726f02F858147d1CD2798Eb31583eDfD549f36e' as '0xstring',logo: './market/Metal Valley/emberite-crystal.webp'},
        {name: 'Thunderite Crystal',value: '0x89fD23f8c8084C6e5550cE26D1d453E40bf1ed8d' as '0xstring',logo: './market/Metal Valley/thunderite-crystal.webp'},
        {name: 'Venomite Crystal',value: '0xe3E89870DE151d53ADBb56CA029eEb4854939AE6' as '0xstring',logo: './market/Metal Valley/venomite-crystal.webp'},
        {name: 'Starite Crystal',value: '0xe60285406dD7Ed46568C64E64c0D4Ac73C42E809' as '0xstring',logo: './market/Metal Valley/starite-crystal.webp'},
        {name: 'Purity Crystal',value: '0x8Ea582cAd1edD4f5D3BA9f7194A7954539e4fc86' as '0xstring',logo: './market/Metal Valley/purity-crystal.webp'},

        {name: 'Violet Mineral',value: '0x16516b5bc9ab5A2E2Fc20659b73F205111fd6623' as '0xstring',logo: './market/Metal Valley/violet-mineral.png'},
        {name: 'Yellow Mineral',value: '0x27C88Ee775B3F5EDCcEa3932455Ba52CBBc378C9' as '0xstring',logo: './market/Metal Valley/yellow-mineral.png'},
        {name: 'Verdant Mineral',value: '0xAEc47aE92Cd1D7693d227318df580761F514B8f1' as '0xstring',logo: './market/Metal Valley/verdant-mineral.webp'},
        {name: 'Azure Mineral',value: '0x3183d0c8e0aF99f85CeaFA785Ba56f43e24781a6' as '0xstring',logo: './market/Metal Valley/azure-mineral.webp'},
        {name: 'Crimson Mineral',value: '0x779BeA18C340De164C13DcE445bE0Fe54B02B72A' as '0xstring',logo: './market/Metal Valley/crimson-mineral.webp'},
    ],
    'Morning Moon Village': [
        { name: 'Adult Grass Hopper', value: '0xee1d9456e5131e3401041C7C568E0957b937cCb5' as '0xstring', logo: './market/Morning Moon Village/AGH.webp' },
        { name: 'Arcane Powder', value: '0x136609236fadE78113d1690D6546428b1DEd8293' as '0xstring', logo: './market/Morning Moon Village/arcane-powder.webp' },
        { name: 'Hard Scale', value: '0x8E464188Ab0F6459a231ce32Ed3ab4E4F7ef57FD' as '0xstring', logo: './market/Morning Moon Village/hard_scale.webp' },
        { name: 'Terra Core', value: '0xcd774ebd98ff1C9A648F152f8fc855E7360a6E92' as '0xstring', logo: './market/Morning Moon Village/terra_core.webp' },
        { name: 'Lucent Tear', value: '0x8fB2788EDc797cDF52A84e4A4291B82619200073' as '0xstring', logo: './market/Morning Moon Village/Lucent Tear.webp' },
        { name: 'Illuminated Soul Fragment', value: '0xbb546B399b1767883b083Fef9E69a16dd0185cDD' as '0xstring', logo: './market/Morning Moon Village/illuminated_soul_fragment.webp' },
        { name: 'Mangosteen', value: '0x1786a5391EaA5cfd5c8bc4376991B993380Db102' as '0xstring', logo: './market/Morning Moon Village/mangosteen.webp' },
        { name: 'Cabbage', value: '0xE3bee928D481b40BB6D0F0EDbfD888a7845CF622' as '0xstring', logo: './market/Morning Moon Village/crop-cabbage.png' },
        { name: 'Carrot', value: '0x3937dDAd2Ad8A9Ac7EFbf7C1Cb2B2D9b68B7d048' as '0xstring', logo: './market/Morning Moon Village/crop-carrot.webp' },
        { name: 'Coffee', value: '0xb9431CD242692a2557c85CFf9638d45B8E8F9D25' as '0xstring', logo: './market/Morning Moon Village/COFFEEBEAN.webp' },
        { name: 'Corn', value: '0x4fA393FC50BcDF367145163b920bB37C21e596ec' as '0xstring', logo: './market/Morning Moon Village/crop-corn.webp' },
        { name: 'Tomato', value: '0x9Ea7E0435B5E50e1DCBB8Eacd63F0dbD3003BdAA' as '0xstring', logo: './market/Morning Moon Village/crop-tomato.webp' },
        ]

    // Can PR P2P Pair KKUB Listing Here
    }

export const V3_FACTORY = '0x090C6E5fF29251B1eF9EC31605Bdd13351eA316C' as '0xstring'
export const POSITION_MANAGER = '0xb6b76870549893c6b59E7e979F254d0F9Cca4Cc9' as '0xstring'
export const positionManagerCreatedAt = BigInt(25033368)
export const QOUTER_V2 = '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f' as '0xstring'
export const ROUTER02 = '0x3F7582E36843FF79F173c7DC19f517832496f2D8' as '0xstring'
export const CMswapUniSmartRoute = '0x01837156518e60362048e78d025a419C51346f55' as '0xstring'
export const BitkubEvmKYC = '0x409CF41ee862Df7024f289E9F2Ea2F5d0D7f3eb4' as '0xstring' // kyc for unwrap kkub
export const bkcUnwapped = '0xff76DD8086428EBC4Ed1b14B0e56E95eDc46a315' as '0xstring'
export const cmSwapRefProgram = '0xf74C099613eF374Aa3cCE75fA8c0B8eF1928f759' as '0xstring'
export const CMswapP2PMarketplace = '0x9068401504b317495356d3fed502C1D3344d346D' as '0xstring'

export const v3FactoryContract = { chainId: 96, abi: v3Factory, address: V3_FACTORY } as const
export const positionManagerContract = { chainId: 96, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
export const qouterV2Contract = { chainId: 96, abi: qouterV2, address: QOUTER_V2 } as const
export const router02Contract = { chainId: 96, abi: router02, address: ROUTER02 } as const
export const erc20ABI = { chainId: 96, abi: erc20Abi } as const
export const kap20ABI = { chainId: 96, abi: kap20abi } as const
export const v3PoolABI = { chainId: 96, abi: v3Pool } as const
export const V3_STAKER = '0xC216ad61623617Aa01b757A06836AA8D6fb547fF' as '0xstring'
export const v3StakerContract = { chainId: 96, address: V3_STAKER, abi: v3staker } as const
export const wrappedNative = { chainId: 96, abi: WrappedNative, address: tokens[1].value } as const
export const unwarppedNative = {chainId:96, abi: bkcUnwappedKKUB, address: bkcUnwapped } as const
export const CMswapUniSmartRouteContractV2 =  { chainId: 96, abi: CMswapUniSmartRouteABIV2 , address: CMswapUniSmartRoute} as const
export const UniswapPairv2PoolABI = { chainId: 96, abi: UniswapPair} as const
export const BitkubEvmKYCContract = {chainId: 96, abi: BitkubEvmKYCABI, address: BitkubEvmKYC} as const
export const CMswapP2PMarketplaceContract = {chainId: 96, abi: CMswapP2PMarketplaceABI, address: CMswapP2PMarketplace} as const

export const cmSwapRefProgramContract = {chainId: 96, abi: cmSwapRefProgramABI, address: cmSwapRefProgram} as const
export const publicClient = createPublicClient({ chain: bitkub, transport: http() })
