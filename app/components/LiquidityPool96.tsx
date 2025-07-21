'use client'
import React, { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown, CodeSquare } from 'lucide-react';
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { v3FactoryContract,erc20ABI,v3PoolABI as v3PoolABI_96 } from '@/app/lib/96'
import { config } from '@/app/config'
import { useAccount } from 'wagmi'
import { bitkub, monadTestnet, bitkubTestnet } from "viem/chains";
import {
  formatEther,
  parseEther,
  erc20Abi,
  createPublicClient,
  http,
} from "viem";
import { tokens } from '@/app/lib/96';
import { usePrice } from '@/app/context/getPrice'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ThemeId = 96 | 8899 | 56 | 3501 | 10143;
type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
  bg: string;
};

const themes: Record<ThemeId, Theme> = {
  96: {
    primary: "from-green-400 to-emerald-400",
    secondary: "from-green-600 to-emerald-600",
    accent: "green-400",
    glow: "",
    border: "border-green-400/30",
    text: "text-green-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900"
  },
  8899: {
    primary: "from-blue-400 to-cyan-400",
    secondary: "from-blue-600 to-cyan-600",
    accent: "blue-400",
    glow: "",
    border: "border-blue-400/30",
    text: "text-blue-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900"
  },
  56: {
    primary: "from-yellow-400 to-amber-400",
    secondary: "from-yellow-600 to-amber-600",
    accent: "yellow-400",
    glow: "",
    border: "border-yellow-400/30",
    text: "text-yellow-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900"
  },
  3501: {
    primary: "from-red-400 to-rose-400",
    secondary: "from-red-600 to-rose-600",
    accent: "red-400",
    glow: "",
    border: "border-red-400/30",
    text: "text-red-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900"
  },
  10143: {
    primary: "from-purple-400 to-violet-400",
    secondary: "from-purple-600 to-violet-600",
    accent: "purple-400",
    glow: "",
    border: "border-purple-400/30",
    text: "text-purple-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900"
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
  if (num >= 1e9) return `$${(num / 1e9).toFixed(3)} B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(3)} M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(3)} K`;
  return `$${num.toFixed(3)}`;
};

const formatPercentage = (num: number) => `${num.toFixed(2)}%`;

const getTokenNameFromAddress = (address: string): string => {
  const found = tokens.find(t => t.value.toLowerCase() === address.toLowerCase());
  return found?.name || 'Unknown';
};

const chainConfigs = {
  96: {
    chain: bitkub,
    chainId: 96,
    explorer: 'https://www.kubscan.com/',
    rpc: '', 
    blocktime: 5
  },
  10143: {
    chain: monadTestnet,
    chainId: 10143,
    explorer: 'https://monad-testnet.socialscan.io/',
    rpc: process.env.NEXT_PUBLIC_MONAD_RPC as string,
    blocktime: 1
  },
  25925: {
    chain: bitkubTestnet,
    chainId: 25925,
    explorer: 'https://testnet.kubscan.com/',
    rpc: 'https://rpc-testnet.bitkubchain.io',
    blocktime: 5
  },
  // Add more chains here
};


export default function LiquidityPool96() {
  type SortField = 'liquidity' | 'volume24h' | 'fee24h' | 'apr' | 'name';
  const [sortBy, setSortBy] = useState<SortField>('liquidity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [validPools, setValidPools] = useState<
    {
      tokenA: string;
      tokenALogo: string;
      tokenAaddr: string ;
      tokenB: string;
      tokenBLogo: string;
      tokenBaddr: string ;
      fee: number;
      poolAddress: string;
      liquidity: number;
      volume24h: number;
      apr: number;
      fee24h: number;
      themeId: ThemeId;
    }[]
  >([]);
  const feeOptions = [100, 500, 3000, 10000];
  const { chainId } = useAccount()
  const selectedChain = chainId || '96'; 
  const chainConfig = chainConfigs[selectedChain as keyof typeof chainConfigs];
  const _chain = chainConfig.chain; 
  const { priceList } = usePrice();

  const publicClient = createPublicClient({
    chain: _chain,
    transport: http(chainConfig.rpc),
  });
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
    console.log("Price List:", priceList);
  }, [priceList]);

  React.useEffect(() => {
      if (!priceList || priceList.length < 2) return;

    const fetchPools = async () => {
      const pairsToCheck = generatePairs(tokens);
      const results: typeof validPools = [];

      for (const [tokenAName, tokenBName] of pairsToCheck) {
        const tokenA = tokens.find((t) => t.name === tokenAName);
        const tokenB = tokens.find((t) => t.name === tokenBName);
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

            let BuyData;
            let SellData;
            if (
              poolResult &&
              poolResult.status === "success" &&
              poolResult.result !== "0x0000000000000000000000000000000000000000"
            ) {
              //** GET TVL SIZE */
              const poolStatus = await readContracts(config, {
                contracts : [
                  { abi: erc20Abi, address: tokenA.value as "0xstring", functionName: 'balanceOf', args: [poolResult.result as "0xstring"] },
                  { abi: erc20Abi, address: tokenB.value as "0xstring", functionName: 'balanceOf', args: [poolResult.result as "0xstring"] },

                ]
              })

              const tokenAamount = poolStatus[0].result !== undefined ? poolStatus[0].result : BigInt(0)
              const tokenBamount = poolStatus[1].result !== undefined ? poolStatus[1].result : BigInt(0)
              const priceA = priceList.find(p => p.token === tokenAName)?.priceUSDT ?? 0;
              const priceB = priceList.find(p => p.token === tokenBName)?.priceUSDT ?? 0;
              const balanceA = Number(tokenAamount) / 1e18;
              const balanceB = Number(tokenBamount) / 1e18;

              const liquidityUSD = (balanceA * priceA) + (balanceB * priceB);





              //** FETCH LAST 24H TRADED */
              const blockAmountDaily = 86400 / chainConfig.blocktime; 
              const currentBlock = await publicClient.getBlockNumber();

              const logBuyData = await publicClient.getContractEvents({
                abi: erc20Abi,
                address: tokenA.value as "0xstring",
                eventName: 'Transfer',
                args: {
                  from: poolResult.result as "0xstring"
                },
                fromBlock: currentBlock - BigInt(blockAmountDaily),
                toBlock: 'latest',
              });

              BuyData = logBuyData.map((res: any) => {
                return {
                  action: 'buy',
                  value: Number(formatEther(res.args.value)),
                }
              })
              const logSellData = await publicClient.getContractEvents({
                abi: erc20Abi,
                address: tokenA.value as "0xstring",
                eventName: 'Transfer',
                args: {
                  to: poolResult.result as "0xstring"
                },
                fromBlock: currentBlock - BigInt(blockAmountDaily),
                toBlock: 'latest',
              });

              SellData = logSellData.map((res: any) => {
                return {
                  action: 'sell',
                  value: Number(formatEther(res.args.value)),
                } 
              });

              console.log("Buy Data:", logBuyData);
              console.log("Sell Data:", logSellData);
              const volumeToken = [...BuyData, ...SellData].reduce((sum, tx) => sum + tx.value, 0);
              const feeRate = feeSelect / 1_000_000;
              const fee24h = volumeToken * feeRate * priceA;

              let apr = ((fee24h * 365) / liquidityUSD) * 100 || 0;

              results.push({
                tokenA: tokenA.name,
                tokenALogo: tokenA.logo || '/default2.png',
                tokenAaddr: tokenA.value as '0xstring',
                tokenB: tokenB.name,
                tokenBLogo: tokenB.logo || '/default2.png',
                tokenBaddr: tokenB.value as '0xstring',
                fee: feeSelect,
                poolAddress: poolResult.result,
                liquidity: liquidityUSD,
                volume24h: volumeToken * priceA,
                fee24h: fee24h,
                apr: apr,
                themeId: 96,
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

  }, [priceList]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedPools = [...validPools].sort((a, b) => {
    let aVal: number | string;
    let bVal: number | string;

    if (sortBy === 'name') {
      aVal = `${a.tokenA}/${a.tokenB}`;
      bVal = `${b.tokenA}/${b.tokenB}`;
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
    <div className={`min-h-screen bg-gradient-to-br from-slate-700 via-black to-emerald-900 `}>
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

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className=" backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Table Header */}
<div className="grid [grid-template-columns:1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 p-6 border-b border-slate-700/50">
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
                <div className="font-medium text-slate-300">Action</div>

            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-700/30">
              {sortedPools.map((pool) => {
                const theme = themes[pool.themeId as ThemeId];
                return (
                  <div 
                    key={`${pool.tokenA}-${pool.tokenB}-${pool.fee}-${pool.poolAddress}`} 
  className="grid [grid-template-columns:1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 p-6 hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  >
                    {/* Pool */}
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
                    {/* Action Btn */}
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Link href={`/swap?input=${pool.tokenAaddr}&output=${pool.tokenBaddr}&tab=liquidity`}>
                        <Button variant="ghost" className="cursor-pointer px-2 py-1 text-xs">Supply</Button>
                      </Link>
                      <Link href={`/swap?input=${pool.tokenAaddr}&output=${pool.tokenBaddr}&tab=swap`}>
                        <Button variant="ghost" className="cursor-pointer px-2 py-1 text-xs">Swap</Button>
                      </Link>
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
                    key={`${pool.tokenA}-${pool.tokenB}-${pool.fee}-${pool.poolAddress}`} 
                className={`bg-slate-800/50 backdrop-blur-xl rounded-xl border ${theme.border} p-4 hover:bg-slate-800/70 transition-all cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  {/* Pool Info */}
                  <div className="flex items-center gap-3">
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
                    <div>
                      <div className="font-semibold text-white">
                        {pool.tokenA} / {pool.tokenB}
                      </div>
                      <div className={`text-sm ${theme.text}`}>
                        {(pool.fee/10000)}% Fee
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