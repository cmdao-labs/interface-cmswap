'use client'
import React, { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown, CodeSquare } from 'lucide-react';
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { 
  v3FactoryContract,
  erc20ABI,
  v3PoolABI as v3PoolABI_96,
  V3_FACTORY as V3_FACTORY_96,
  V3_FACTORYCreatedAt as V3_FACTORYCreatedAt_96,
  positionManagerContract as positionManagerContract_96,
} from '@/app/lib/96'

import { config } from '@/app/config'
import { useAccount } from 'wagmi'
import { jbc,bitkub, monadTestnet, bitkubTestnet } from "viem/chains";
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
    8899: {
    chain: jbc,
    chainId: 8899,
    explorer: 'https://exp.jibchain.net/',
    rpc: 'https://rpc-l1.jbc.xpool.pw',
    blocktime: 12
  }
  // Add more chains here
};


export default function LiquidityPool96() {
  type SortField = 'liquidity' | 'volume24h' | 'fee24h' | 'apr' | 'name';
  const [sortBy, setSortBy] = useState<SortField>('liquidity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [listFilter, setListFilter] = useState<'all' | 'listed' | 'unlisted'>('all');

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
      listed: boolean;
    }[]
  >([]);
  const feeOptions = [100, 500, 3000, 10000];
  const { chainId } = useAccount()
  const selectedChain = chainId || '96'; 
  const chainConfig = chainConfigs[selectedChain as keyof typeof chainConfigs];
  const _chain = chainConfig.chain; 
  const { priceList } = usePrice();
  const theme = /* themes[chainId as ThemeId] ||  */themes[96];

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
    //* FETCH ALL Pool Created V3_FACTORYCreatedAt
    const logCreateData = await publicClient.getContractEvents({
      ...v3FactoryContract,
      eventName: 'PoolCreated',
      fromBlock: V3_FACTORYCreatedAt_96,
      toBlock: 'latest',
    });

    let CreateData = logCreateData.map((res: any) => ({
      action: 'create',
      token0: res.args.token0 as "0xstring",
      token1: res.args.token1 as "0xstring",
      fee: res.args.fee as "0xstring",
      pool: res.args.pool as "0xstring",
      tx: res.transactionHash as "0xstring",
    }));

    const results: typeof validPools = [];
    // note : for priority 
    const currencyTokens = [tokens[2].value, tokens[1].value, tokens[3].value]; 
    let isListed = true;

    for (const item of CreateData) {
      isListed = true
      let tokenA = tokens.find(t => t.value.toLowerCase() === item.token0.toLowerCase());
      let tokenB = tokens.find(t => t.value.toLowerCase() === item.token1.toLowerCase());

      // Get token symbol if not found
      if (!tokenA) {
        isListed = false;
/*         console.error(`Token A not found for address: ${item.token0}`); */
        const [symbolA] = await readContracts(config, {
          contracts: [{
            abi: erc20Abi,
            address: item.token0,
            functionName: "symbol"
          }]
        });
        tokenA = {
          name: symbolA.result ?? 'UNKNOWN',
          value: item.token0,
          logo: '/default2.png'
        };
      }

      if (!tokenB) {
        isListed = false;
/*         console.error(`Token B not found for address: ${item.token1}`); */
        const [symbolB] = await readContracts(config, {
          contracts: [{
            abi: erc20Abi,
            address: item.token1,
            functionName: "symbol"
          }]
        });
        tokenB = {
          name: symbolB.result ?? 'UNKNOWN',
          value: item.token1,
          logo: '/default2.png'
        };
      }
      try {
        const poolStatus = await readContracts(config, {
          contracts : [
            { abi: erc20Abi, address: tokenA.value, functionName: 'balanceOf', args: [item.pool] },
            { abi: erc20Abi, address: tokenB.value, functionName: 'balanceOf', args: [item.pool] },
          ]
        });

        let tokenAamount = poolStatus[0].result ?? BigInt(0);
        let tokenBamount = poolStatus[1].result ?? BigInt(0);

        let priceA = priceList.find(p => p.token === tokenA!.name)?.priceUSDT ?? 0;
        let priceB = priceList.find(p => p.token === tokenB!.name)?.priceUSDT ?? 0;
        let balanceA = Number(tokenAamount) / 1e18;
        let balanceB = Number(tokenBamount) / 1e18;

        const liquidityUSD = (balanceA * priceA) + (balanceB * priceB);

        //** FETCH LAST 24H TRADED */
        const blockAmountDaily = 86400 / chainConfig.blocktime; 
        const currentBlock = await publicClient.getBlockNumber();

        const logBuyData = await publicClient.getContractEvents({
          abi: erc20Abi,
          address: tokenA.value,
          eventName: 'Transfer',
          args: { from: item.pool },
          fromBlock: currentBlock - BigInt(blockAmountDaily),
          toBlock: 'latest',
        });

        const BuyData = logBuyData.map((res: any) => ({
          action: 'buy',
          value: Number(formatEther(res.args.value)),
          tx: res.transactionHash,
        }));

        const logSellData = await publicClient.getContractEvents({
          abi: erc20Abi,
          address: tokenA.value,
          eventName: 'Transfer',
          args: { to: item.pool },
          fromBlock: currentBlock - BigInt(blockAmountDaily),
          toBlock: 'latest',
        });

        const SellData = logSellData.map((res: any) => ({
          action: 'sell',
          value: Number(formatEther(res.args.value)),
          tx: res.transactionHash,
        }));

        const logAddLiquidity = await publicClient.getContractEvents({
          ...positionManagerContract_96,
          eventName: 'IncreaseLiquidity',
          address: item.pool,
          fromBlock: currentBlock - BigInt(blockAmountDaily),
          toBlock: 'latest',
        })
        const addLiquidityData = logAddLiquidity.map((res: any) => ({
          action: 'add',
          value: Number(formatEther(res.args.value)),
          tx: res.transactionHash,
        }));

        const logRemoveLiquidity = await publicClient.getContractEvents({
          ...positionManagerContract_96,
          eventName: 'DecreaseLiquidity',
          address: item.pool,
          fromBlock: currentBlock - BigInt(blockAmountDaily),
          toBlock: 'latest',
        });
        const removeLiquidityData = logRemoveLiquidity.map((res: any) => ({
          action: 'remove',
          value: Number(formatEther(res.args.value)),
          tx: res.transactionHash,
        }));

        const liquidityTxs = new Set([
          ...addLiquidityData.map((item: any) => item.tx),
          ...removeLiquidityData.map((item: any) => item.tx),
        ]);
        // Filter out liquidity transactions from buy/sell data
        const filteredBuyData = BuyData.filter((item: any) => !liquidityTxs.has(item.tx));
        const filteredSellData = SellData.filter((item: any) => !liquidityTxs.has(item.tx));

/* 
        console.log(`Buy Data for ${tokenA.name}-${tokenB.name}:`, filteredBuyData);
        console.log(`Sell Data for ${tokenA.name}-${tokenB.name}:`, filteredSellData);
 */
        const volumeToken = [...filteredBuyData, ...filteredSellData].reduce((sum, tx) => sum + tx.value, 0);
        const feeRate = Number(item.fee) / 1_000_000;
        const fee24h = volumeToken * feeRate * priceA;
        const apr = ((fee24h * 365) / liquidityUSD) * 100 || 0;

        // Ensure tokenA is always the first token in the pair
        // This is to maintain consistency in sorting and display
        const a = currencyTokens.indexOf(tokenA.value);
        const b = currencyTokens.indexOf(tokenB.value);

        if ((a !== -1 && b === -1) || (a !== -1 && b !== -1 && b < a)) {
          [tokenA, tokenB] = [tokenB, tokenA];
          [tokenAamount, tokenBamount] = [tokenBamount, tokenAamount];
          [priceA, priceB] = [priceB, priceA];
          [balanceA, balanceB] = [balanceB, balanceA];
        }


        results.push({
          tokenA: tokenA.name,
          tokenALogo: tokenA.logo,
          tokenAaddr: tokenA.value,
          tokenB: tokenB.name,
          tokenBLogo: tokenB.logo,
          tokenBaddr: tokenB.value,
          fee: Number(item.fee),
          poolAddress: item.pool,
          liquidity: liquidityUSD,
          volume24h: volumeToken * priceA,
          fee24h,
          apr,
          themeId: 96,
          listed: isListed,
        });

      } catch (error) {
        console.error(`Error fetching pool for ${tokenA.name}-${tokenB.name}:`, error);
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

const sortedPools = [...validPools]
  .filter(pool => {
    if (listFilter === 'listed') return pool.listed === true;
    if (listFilter === 'unlisted') return pool.listed === false;
    return true; // 'all'
  })
  .sort((a, b) => {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
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
        
        <div
          className={`flex items-center gap-1.5 my-4 p-1 rounded-full w-fit 
                      border ${theme.border} 
                      shadow-inner shadow-${theme.accent}/10 
                      backdrop-blur-md bg-[#061f1c]`}
        >
          {[
            { label: 'All', value: 'all' },
            { label: 'Listed', value: 'listed' },
            { label: 'Not Listed', value: 'unlisted' }
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setListFilter(value as 'all' | 'listed' | 'unlisted')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                ${
                  listFilter === value
                    ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg shadow-${theme.accent}/30`
                    : `${theme.text} hover:text-white hover:bg-${theme.accent}/10`
                }`}
            >
              {label}
            </button>
          ))}
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
                className="flex mx-[-16px] items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Liquidity
                <SortIcon field="liquidity" />
              </button>
              <button 
                onClick={() => handleSort('volume24h')}
                className="flex  mx-[-32px] items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Vol 24H
                <SortIcon field="volume24h" />
              </button>
              <button 
                onClick={() => handleSort('fee24h')}
                className="flex  mx-[-48px] items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
              >
                Fee 24H
                <SortIcon field="fee24h" />
              </button>
              <button 
                onClick={() => handleSort('apr')}
                className="flex  mx-[-60px] items-center gap-2 text-left font-medium text-slate-300 hover:text-white transition-colors"
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