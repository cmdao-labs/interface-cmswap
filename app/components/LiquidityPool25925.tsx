'use client'
import React, { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { v3FactoryContract,erc20ABI} from '@/app/lib/25925'
import { config } from '@/app/config'

import { tokens as tokens25925 } from '@/app/lib/25925';

type ThemeId = 96 | 8899 | 56 | 3501 | 10143;
type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
};

const themes: Record<ThemeId, Theme> = {
  96: {
    primary: "from-green-400 to-emerald-400",
    secondary: "from-green-600 to-emerald-600",
    accent: "green-400",
    glow: "",
    border: "border-green-400/30",
    text: "text-green-300",
  },
  8899: {
    primary: "from-blue-400 to-cyan-400",
    secondary: "from-blue-600 to-cyan-600",
    accent: "blue-400",
    glow: "",
    border: "border-blue-400/30",
    text: "text-blue-300",
  },
  56: {
    primary: "from-yellow-400 to-amber-400",
    secondary: "from-yellow-600 to-amber-600",
    accent: "yellow-400",
    glow: "",
    border: "border-yellow-400/30",
    text: "text-yellow-300",
  },
  3501: {
    primary: "from-red-400 to-rose-400",
    secondary: "from-red-600 to-rose-600",
    accent: "red-400",
    glow: "",
    border: "border-red-400/30",
    text: "text-red-300",
  },
  10143: {
    primary: "from-purple-400 to-violet-400",
    secondary: "from-purple-600 to-violet-600",
    accent: "purple-400",
    glow: "",
    border: "border-purple-400/30",
    text: "text-purple-300",
  },
};

const mockPools = [
  {
    id: 1,
    token1: { name: 'SOL', symbol: 'SOL', logo: '🔵' },
    token2: { name: 'USDC', symbol: 'USDC', logo: '💙' },
    fee: 0.25,
    liquidity: 15420000,
    volume24h: 8520000,
    fee24h: 21300,
    apr: 125.4,
    themeId: 8899
  },
  {
    id: 2,
    token1: { name: 'RAY', symbol: 'RAY', logo: '⚡' },
    token2: { name: 'USDC', symbol: 'USDC', logo: '💙' },
    fee: 0.25,
    liquidity: 8750000,
    volume24h: 3200000,
    fee24h: 8000,
    apr: 89.2,
    themeId: 96
  },
  {
    id: 3,
    token1: { name: 'BONK', symbol: 'BONK', logo: '🐕' },
    token2: { name: 'SOL', symbol: 'SOL', logo: '🔵' },
    fee: 0.25,
    liquidity: 12300000,
    volume24h: 5600000,
    fee24h: 14000,
    apr: 156.8,
    themeId: 56
  },
  {
    id: 4,
    token1: { name: 'ORCA', symbol: 'ORCA', logo: '🐋' },
    token2: { name: 'SOL', symbol: 'SOL', logo: '🔵' },
    fee: 0.25,
    liquidity: 4200000,
    volume24h: 1800000,
    fee24h: 4500,
    apr: 67.3,
    themeId: 3501
  },
  {
    id: 5,
    token1: { name: 'STEP', symbol: 'STEP', logo: '🟣' },
    token2: { name: 'USDC', symbol: 'USDC', logo: '💙' },
    fee: 0.25,
    liquidity: 2100000,
    volume24h: 890000,
    fee24h: 2225,
    apr: 43.7,
    themeId: 10143
  }
];

const formatNumber = (num: number) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toFixed(0)}`;
};

const formatPercentage = (num: number) => `${num.toFixed(1)}%`;



export default function LiquidityPool25925() {
  type SortField = 'liquidity' | 'volume24h' | 'fee24h' | 'apr' | 'name';
  const [sortBy, setSortBy] = useState<SortField>('liquidity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [validPools, setValidPools] = useState<
    {
      tokenA: string;
      tokenALogo: string;
      tokenB: string;
      tokenBLogo: string;
      fee: number;
      poolAddress: string;
    }[]
  >([]);
  const feeOptions = [100, 500, 3000, 10000];

  const generatePairs = (tokens: { name: string; value: string; logo: string }[]) => {
    const pairs: [string, string][] = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let j = i + 1; j < tokens.length; j++) {
        pairs.push([tokens[i].name, tokens[j].name]);
      }
    }
    return pairs;
  };

  React.useEffect(() => {
    const fetchPools = async () => {
      const pairsToCheck = generatePairs(tokens25925);
      const results: typeof validPools = [];

      for (const [tokenAName, tokenBName] of pairsToCheck) {
        const tokenA = tokens25925.find((t) => t.name === tokenAName);
        const tokenB = tokens25925.find((t) => t.name === tokenBName);
        if (!tokenA || !tokenB) continue;

        for (const feeSelect of feeOptions) {
          try {
            const [poolResult] = await readContracts(config,{
              contracts: [
                {
                  ...v3FactoryContract,
                  functionName: "getPool",
                  args: [tokenA.value, tokenB.value, feeSelect],
                },
              ],
            });

            if (
              poolResult &&
              poolResult.status === "success" &&
              poolResult.result !== "0x0000000000000000000000000000000000000000"
            ) {
              results.push({
                tokenA: tokenA.name,
                tokenALogo: tokenA.logo || '/default2 .png',
                tokenB: tokenB.name,
                tokenBLogo: tokenB.logo || '/default2.png',
                fee: feeSelect,
                poolAddress: poolResult.result,
              });
            }
          } catch (error) {
            console.error(`Error fetching pool for ${tokenAName}-${tokenBName} fee ${feeSelect}:`, error);
          }
        }
      }

      setValidPools(results);
      console.log("Valid pools:", results);
    };

    fetchPools();

  }, []);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedPools = [...mockPools].sort((a, b) => {
    let aVal: number | string;
    let bVal: number | string;

    if (sortBy === 'name') {
      aVal = `${a.token1.symbol}/${a.token2.symbol}`;
      bVal = `${b.token1.symbol}/${b.token2.symbol}`;
      if (sortOrder === 'desc') {
        return (bVal as string).localeCompare(aVal as string);
      }
      return (aVal as string).localeCompare(bVal as string);
    } else {
      aVal = a[sortBy as Exclude<SortField, 'name'>];
      bVal = b[sortBy as Exclude<SortField, 'name'>];
      if (sortOrder === 'desc') {
        return (bVal as number) - (aVal as number);
      }
      return (aVal as number) - (bVal as number);
    }
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) return <ChevronDown className="w-4 h-4 opacity-50" />;
    return sortOrder === 'desc' ? 
      <TrendingDown className="w-4 h-4 text-cyan-400" /> : 
      <TrendingUp className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
        <div className="mb-8  mt-[120px]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Liquidity Pools
          </h1>
          <p className="text-slate-400">Provide liquidity and earn fees</p>
        </div>
        {/* Stats Footer */}
        <div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Total Value Locked</h3>
            <p className="text-2xl font-bold text-white">
              {formatNumber(mockPools.reduce((sum, pool) => sum + pool.liquidity, 0))}
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">24H Volume</h3>
            <p className="text-2xl font-bold text-cyan-400">
              {formatNumber(mockPools.reduce((sum, pool) => sum + pool.volume24h, 0))}
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">24H Fees</h3>
            <p className="text-2xl font-bold text-green-400">
              {formatNumber(mockPools.reduce((sum, pool) => sum + pool.fee24h, 0))}
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-6 bg-slate-800/70 border-b border-slate-700/50">
              <button 
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Pool
                <SortIcon field="name" />
              </button>
              <button 
                onClick={() => handleSort('liquidity')}
                className="flex items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Liquidity
                <SortIcon field="liquidity" />
              </button>
              <button 
                onClick={() => handleSort('volume24h')}
                className="flex items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Vol 24H
                <SortIcon field="volume24h" />
              </button>
              <button 
                onClick={() => handleSort('fee24h')}
                className="flex items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Fee 24H
                <SortIcon field="fee24h" />
              </button>
              <button 
                onClick={() => handleSort('apr')}
                className="flex items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                APR 24H
                <SortIcon field="apr" />
              </button>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-700/30">
              {sortedPools.map((pool) => {
                const theme = themes[pool.themeId as ThemeId];
                return (
                  <div 
                    key={pool.id} 
                    className="grid grid-cols-5 gap-4 p-6 hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  >
                    {/* Pool */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center -space-x-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-sm border-2 border-slate-800 relative z-10`}>
                          {pool.token1.logo}
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.secondary} flex items-center justify-center text-sm border-2 border-slate-800`}>
                          {pool.token2.logo}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {pool.token1.symbol} / {pool.token2.symbol}
                        </div>
                        <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${theme.secondary} bg-opacity-30 ${theme.text} shadow-sm`}>
                          <span>{pool.fee}% Fee</span>
                        </div>
                        
                      </div>
                    </div>

                    {/* Liquidity */}
                    <div className="flex flex-col justify-center">
                      <span className="text-white font-medium">{formatNumber(pool.liquidity)}</span>
                    </div>

                    {/* Volume 24H */}
                    <div className="flex flex-col justify-center">
                      <span className="text-white font-medium">{formatNumber(pool.volume24h)}</span>
                    </div>

                    {/* Fee 24H */}
                    <div className="flex flex-col justify-center">
                      <span className="text-white font-medium">{formatNumber(pool.fee24h)}</span>
                    </div>

                    {/* APR 24H */}
                    <div className="flex flex-col justify-center">
                      <span className={`font-bold text-lg ${theme.text}`}>
                        {formatPercentage(pool.apr)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Pool</h2>
            <h2 className="text-lg font-semibold text-white">Vol/APR 24H</h2>
          </div>
          
          {sortedPools.map((pool) => {
            const theme = themes[pool.themeId as ThemeId];
            return (
              <div 
                key={pool.id}
                className={`bg-slate-800/50 backdrop-blur-xl rounded-xl border ${theme.border} p-4 hover:bg-slate-800/70 transition-all cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  {/* Pool Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center -space-x-2">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center border-2 border-slate-800 relative z-10`}>
                        {pool.token1.logo}
                      </div>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.secondary} flex items-center justify-center border-2 border-slate-800`}>
                        {pool.token2.logo}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {pool.token1.symbol} / {pool.token2.symbol}
                      </div>
                      <div className={`text-sm ${theme.text}`}>
                        {pool.fee}% Fee
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        TVL: {formatNumber(pool.liquidity)}
                      </div>
                    </div>
                  </div>

                  {/* Vol/APR */}
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {formatNumber(pool.volume24h)}
                    </div>
                    <div className={`font-bold text-lg ${theme.text}`}>
                      {formatPercentage(pool.apr)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Fee: {formatNumber(pool.fee24h)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
}