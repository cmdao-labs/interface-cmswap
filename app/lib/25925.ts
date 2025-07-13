import { createPublicClient, http, erc20Abi } from 'viem'
import { bitkub } from 'viem/chains'
import { kap20abi,CMswapP2PMarketplaceABI,cmSwapRefProgramABI,testnetTokenFaucetTradeABI } from '@/app/lib/abi'

// swap
export const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'KUB', value: '0xnative' as '0xstring', logo: '/96.png' },
    { name: 'KKUB', value: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring', logo: '/96.png' },
    { name: 'testKUB', value: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring', logo: '/96.png' },
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
