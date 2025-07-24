'use client'
import LiquidityPool from '../components/LiquidityPool_Combined';
import { bitkub, jbc, bitkubTestnet } from 'viem/chains';
import { tokens as tokens96, v3FactoryContract as v3FactoryContract96, erc20ABI as erc20ABI96, v3PoolABI as v3PoolABI96, V3_FACTORY as V3_FACTORY96, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt96, positionManagerContract as positionManagerContract96 } from '@/app/lib/96';
import { tokens as tokens8899, v3FactoryContract as v3FactoryContract8899, erc20ABI as erc20ABI8899, v3PoolABI as v3PoolABI8899, V3_FACTORY as V3_FACTORY8899, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt8899, positionManagerContract as positionManagerContract8899 } from '@/app/lib/8899';
import { tokens as tokens25925, v3FactoryContract as v3FactoryContract25925, erc20ABI as erc20ABI25925, v3PoolABI as v3PoolABI25925, V3_FACTORY as V3_FACTORY25925, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt25925, positionManagerContract as positionManagerContract25925 } from '@/app/lib/25925';
import { useAccount } from 'wagmi'

type ThemeId = 96 | 8899 | 56 | 3501 | 10143 | 25925;
type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
  bg: string;
};

type ChainConfig = {
  chain: typeof bitkub | typeof jbc  | typeof bitkubTestnet;
  chainId: ThemeId;
  explorer: string;
  rpc: string;
  blocktime: number;
  tokens: { name: string; value: string; logo: string }[];
  lib: {
    v3FactoryContract: any;
    erc20ABI: any;
    v3PoolABI: any;
    V3_FACTORY: string;
    V3_FACTORYCreatedAt: bigint;
    positionManagerContract: any;
  };
};

const chainConfigs: Record<number, ChainConfig> = {
  96: {
    chain: bitkub,
    chainId: 96,
    explorer: 'https://www.kubscan.com/',
    rpc: '',
    blocktime: 5,
    tokens: tokens96,
    lib: {
      v3FactoryContract: v3FactoryContract96,
      erc20ABI: erc20ABI96,
      v3PoolABI: v3PoolABI96,
      V3_FACTORY: V3_FACTORY96,
      V3_FACTORYCreatedAt: V3_FACTORYCreatedAt96,
      positionManagerContract: positionManagerContract96,
    },
  },
  8899: {
    chain: jbc,
    chainId: 8899,
    explorer: 'https://exp.jibchain.net/',
    rpc: 'https://rpc-l1.jbc.xpool.pw',
    blocktime: 12,
    tokens: tokens8899,
    lib: {
      v3FactoryContract: v3FactoryContract8899,
      erc20ABI: erc20ABI8899,
      v3PoolABI: v3PoolABI8899,
      V3_FACTORY: V3_FACTORY8899,
      V3_FACTORYCreatedAt: V3_FACTORYCreatedAt8899,
      positionManagerContract: positionManagerContract8899,
    },
  },
  25925: {
    chain: bitkubTestnet,
    chainId: 25925,
    explorer: 'https://testnet.kubscan.com/',
    rpc: 'https://rpc-testnet.bitkubchain.io',
    blocktime: 5,
    tokens: tokens25925,
    lib: {
      v3FactoryContract: v3FactoryContract25925,
      erc20ABI: erc20ABI25925,
      v3PoolABI: v3PoolABI25925,
      V3_FACTORY: V3_FACTORY25925,
      V3_FACTORYCreatedAt: V3_FACTORYCreatedAt25925,
      positionManagerContract: positionManagerContract25925,
    },
  },
};

export default function App() {
  const { chainId } = useAccount();
  const selectedChainConfig = chainConfigs[chainId || 96]; // Default to chainId 96 if not connected

  return <LiquidityPool chainConfig={selectedChainConfig} />;
}