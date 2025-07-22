// LiquidityPoolCombined.tsx (สมบูรณ์)
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { readContracts } from '@wagmi/core';
import { useAccount } from 'wagmi';
import { config } from '@/app/config';
import { usePrice } from '@/app/context/getPrice';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  formatEther,
  createPublicClient,
  http,
  erc20Abi
} from 'viem';
import {
  bitkub,
  monadTestnet,
  bitkubTestnet,
  jbc
} from 'viem/chains';

const chainConfigs = {
  96: { chain: bitkub, chainId: 96, explorer: 'https://www.kubscan.com/', rpc: '', blocktime: 5 },
  10143: { chain: monadTestnet, chainId: 10143, explorer: 'https://monad-testnet.socialscan.io/', rpc: process.env.NEXT_PUBLIC_MONAD_RPC as string, blocktime: 1 },
  25925: { chain: bitkubTestnet, chainId: 25925, explorer: 'https://testnet.kubscan.com/', rpc: 'https://rpc-testnet.bitkubchain.io', blocktime: 5 },
  8899: { chain: jbc, chainId: 8899, explorer: 'https://exp.jibchain.net/', rpc: 'https://rpc-l1.jbc.xpool.pw', blocktime: 12 },
};

const themes = {
  96: { text: 'text-green-300', border: 'border-green-400/30', secondary: 'from-green-600 to-emerald-600' },
  8899: { text: 'text-blue-300', border: 'border-blue-400/30', secondary: 'from-blue-600 to-cyan-600' },
  10143: { text: 'text-purple-300', border: 'border-purple-400/30', secondary: 'from-purple-600 to-violet-600' },
  25925: { text: 'text-yellow-300', border: 'border-yellow-400/30', secondary: 'from-yellow-600 to-amber-600' }
};

const feeOptions = [100, 500, 3000, 10000];

export default function LiquidityPoolCombined() {
  const { chainId } = useAccount();
  const activeChainId = (chainId || 96);
  const { priceList } = usePrice();
  const [validPools, setValidPools] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<'liquidity' | 'volume24h' | 'fee24h' | 'apr' | 'name'>('liquidity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  type ThemeId = 96 | 8899 | 10143 | 25925;

  useEffect(() => {
    if (!priceList) return;
    const fetchAll = async () => {
      const chainIds = [96, 8899];
      const allPools = await Promise.all(
        chainIds.map(cid => fetchPoolsForChain(cid, priceList))
      );
      setValidPools(allPools.flat());
    };
    fetchAll();
  }, [priceList]);

  React.useEffect(() => {
    console.log(`Valid pools for chain ${activeChainId}:`, validPools);
  }, [validPools]);

  
  const handleSort = (field: typeof sortBy) => {
    setSortOrder(sortBy === field ? (sortOrder === 'desc' ? 'asc' : 'desc') : 'desc');
    setSortBy(field);
  };

  const sortedPools = [...validPools].sort((a, b) => {
    let aVal = sortBy === 'name' ? `${a.tokenA}/${a.tokenB}` : a[sortBy];
    let bVal = sortBy === 'name' ? `${b.tokenA}/${b.tokenB}` : b[sortBy];
    return sortOrder === 'desc' ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1);
  });

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (num: number) => `${num.toFixed(2)}%`;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-700 via-black to-emerald-900 `}>
      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
        <div className="mb-8  ">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 mt-[120px]">
            Liquidity Pools
          </h1>
          <p className="text-slate-400">Provide liquidity and earn fees</p>
        </div>
        {/* Stats Footer */}
        <div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Total Value Locked</h3>
            <p className="text-2xl font-bold text-white">
              {formatNumber(validPools.reduce((sum, pool) => sum + pool.liquidity, 0))}
            </p>
          </div>
          
          <div className=" backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">24H Volume</h3>
            <p className="text-2xl font-bold text-cyan-400">
              {formatNumber(validPools.reduce((sum, pool) => sum + pool.volume24h, 0))}
            </p>
          </div>
          
          <div className=" backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">24H Fees</h3>
            <p className="text-2xl font-bold text-green-400">
              {formatNumber(validPools.reduce((sum, pool) => sum + pool.fee24h, 0))}
            </p>
          </div>
        </div>

      <div className="hidden lg:block">
        <div className="grid [grid-template-columns:1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 p-6 border-b border-slate-700/50">
          {['name', 'liquidity', 'volume24h', 'fee24h', 'apr'].map(field => (
            <button key={field} onClick={() => handleSort(field as any)} className="text-left">{field.toUpperCase()}</button>
          ))}
          <div>ACTION</div>
        </div>
        {sortedPools.map(pool => {
          const theme = themes[pool.themeId as ThemeId || 96];
          return (
            <div key={pool.poolAddress} className={`grid [grid-template-columns:1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 p-6 hover:bg-slate-800/30 transition-colors cursor-pointer group ${theme.border} rounded-lg mb-2`}>
                      <div className="flex items-center gap-3">
                      <div className="flex items-center -space-x-2">
                      <div className="relative w-10 h-10">
                        <img
                          src={pool.tokenALogo || '/default2.png'}
                          alt="token1"
                          className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                        />
                          <img
                            src={pool.tokenBLogo || '/default2.png'}
                            alt="token2"
                            className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                          />
                      </div>
                  
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {pool.tokenA} / {pool.tokenB}
                        </div>
                        <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${theme.secondary} bg-opacity-30 ${theme.text} shadow-sm`}>
                          <span>{(pool.fee)/10000}% Fee</span>
                        </div>
                        
                      </div>
                    </div>
              <div>{formatNumber(pool.liquidity)}</div>
              <div>{formatNumber(pool.volume24h)}</div>
              <div>{formatNumber(pool.fee24h)}</div>
              <div className={`${theme.text}`}>{formatPercentage(pool.apr)}</div>
              <div className="flex gap-2">
                <Link href={`/swap?input=${pool.tokenAaddr}&output=${pool.tokenBaddr}&tab=liquidity`}><Button variant="ghost" size="sm">Supply</Button></Link>
                <Link href={`/swap?input=${pool.tokenAaddr}&output=${pool.tokenBaddr}&tab=swap`}><Button variant="ghost" size="sm">Swap</Button></Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export async function fetchPoolsForChain(chainId: number, priceList: any[]) {
  const chainConfig = chainConfigs[chainId as keyof typeof chainConfigs];
  const lib = require(`@/app/lib/${chainId}`);
  const tokens = lib.tokens;
  const { v3FactoryContract } = lib;
  const publicClient = createPublicClient({ chain: chainConfig.chain, transport: http(chainConfig.rpc) });

  const pairs: [any, any][] = [];
  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      pairs.push([tokens[i], tokens[j]]);
    }
  }

  const blockAmountDaily = Math.floor(86400 / chainConfig.blocktime);
  const currentBlock = await publicClient.getBlockNumber();
  const results = [];

  for (const [tokenA, tokenB] of pairs) {
    for (const fee of feeOptions) {
      try {
        const [poolResult] = await readContracts(config, {
          contracts: [
            { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, fee] }
          ]
        });

        const poolAddress = poolResult?.result;
        if (!poolAddress || poolAddress === '0x0000000000000000000000000000000000000000') continue;

        const [balA, balB] = await readContracts(config, {
          contracts: [
            { abi: erc20Abi, address: tokenA.value, functionName: 'balanceOf', args: [poolAddress as '0xstring'] },
            { abi: erc20Abi, address: tokenB.value, functionName: 'balanceOf', args: [poolAddress as '0xstring'] }
          ]
        });

        const priceA = priceList.find(p => p.token === tokenA.name)?.priceUSDT ?? 0;
        const priceB = priceList.find(p => p.token === tokenB.name)?.priceUSDT ?? 0;
        const amountA = Number(balA.result || BigInt(0)) / 1e18;
        const amountB = Number(balB.result || BigInt(0)) / 1e18;
        const liquidity = (amountA * priceA) + (amountB * priceB);

        const logBuy = await publicClient.getContractEvents({
          abi: erc20Abi,
          address: tokenA.value,
          eventName: 'Transfer',
          args: { from: poolAddress as '0xstring' },
          fromBlock: currentBlock - BigInt(blockAmountDaily),
          toBlock: 'latest'
        });

        const logSell = await publicClient.getContractEvents({
          abi: erc20Abi,
          address: tokenA.value,
          eventName: 'Transfer',
          args: { to: poolAddress as '0xstring' },
          fromBlock: currentBlock - BigInt(blockAmountDaily),
          toBlock: 'latest'
        });

        const volumeToken = [...logBuy, ...logSell].reduce((sum, e: any) => sum + Number(formatEther(e.args.value)), 0);
        const fee24h = volumeToken * (fee / 1_000_000) * priceA;
        const apr = ((fee24h * 365) / liquidity) * 100 || 0;

        results.push({
          tokenA: tokenA.name,
          tokenALogo: tokenA.logo,
          tokenAaddr: tokenA.value,
          tokenB: tokenB.name,
          tokenBLogo: tokenB.logo,
          tokenBaddr: tokenB.value,
          fee,
          poolAddress,
          liquidity,
          volume24h: volumeToken * priceA,
          fee24h,
          apr,
          themeId: chainId
        });
      } catch (err) {
        console.error(`[${chainId}] Error fetching pool for ${tokenA.name}-${tokenB.name}:`, err);
      }
    }
  }
  return results;
}