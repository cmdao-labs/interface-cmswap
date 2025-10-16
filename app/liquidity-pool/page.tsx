'use client'
import LiquidityPool from '@/components/cmswap/LiquidityPool_Combined';
import { bitkub, jbc, bitkubTestnet } from 'viem/chains';
import { chains } from '@/lib/chains'
import { useAccount } from 'wagmi'
type ThemeId = 96 | 8899 | 56 | 3501 | 10143 | 25925;
type ChainConfig = {
  chain: typeof bitkub | typeof jbc  | typeof bitkubTestnet;
  chainId: ThemeId;
  explorer: string;
  rpc: string;
  blocktime: number;
  tokens: any;
  lib: {
    v3FactoryContract: any;
    erc20ABI: any;
    v3PoolABI: any;
    V3_FACTORY: string;
    V3_FACTORYCreatedAt: bigint;
    positionManagerContract: any;
  };
};
const chain96 = chains[96]
const chain8899 = chains[8899]
const chain25925 = chains[25925]

const chainConfigs: Record<number, ChainConfig> = {
  96: {
    chain: chain96.chain,
    chainId: 96,
    explorer: 'https://www.kubscan.com/',
    rpc: '',
    blocktime: 5,
    tokens: chain96.tokens,
    lib: {
      v3FactoryContract: chain96.v3FactoryContract,
      erc20ABI: chain96.erc20ABI,
      v3PoolABI: chain96.v3PoolABI,
      V3_FACTORY: chain96.V3_FACTORY,
      V3_FACTORYCreatedAt: chain96.V3_FACTORYCreatedAt,
      positionManagerContract: chain96.positionManagerContract,
    },
  },
  8899: {
    chain: chain8899.chain,
    chainId: 8899,
    explorer: 'https://exp.jibchain.net/',
    rpc: 'https://rpc-l1.jbc.xpool.pw',
    blocktime: 12,
    tokens: chain8899.tokens,
    lib: {
      v3FactoryContract: chain8899.v3FactoryContract,
      erc20ABI: chain8899.erc20ABI,
      v3PoolABI: chain8899.v3PoolABI,
      V3_FACTORY: chain8899.V3_FACTORY,
      V3_FACTORYCreatedAt: chain8899.V3_FACTORYCreatedAt,
      positionManagerContract: chain8899.positionManagerContract,
    },
  },
  25925: {
    chain: chain25925.chain,
    chainId: 25925,
    explorer: 'https://testnet.kubscan.com/',
    rpc: 'https://rpc-testnet.bitkubchain.io',
    blocktime: 5,
    tokens: chain25925.tokens,
    lib: {
      v3FactoryContract: chain25925.v3FactoryContract,
      erc20ABI: chain25925.erc20ABI,
      v3PoolABI: chain25925.v3PoolABI,
      V3_FACTORY: chain25925.V3_FACTORY,
      V3_FACTORYCreatedAt: chain25925.V3_FACTORYCreatedAt,
      positionManagerContract: chain25925.positionManagerContract,
    },
  },
};

export default function App() {
  const { chainId } = useAccount();
  const selectedChainConfig = chainConfigs[chainId || 96]; // Default to chainId 96 if not connected

  return <LiquidityPool chainConfig={selectedChainConfig} />;
}
