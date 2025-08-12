'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction } from '@wagmi/core';
import { config } from '@/app/config';
import { erc20ABI, StakingFactoryV2, tokens } from '@/app/lib/25925';
import { formatEther, parseEther, createPublicClient, http, erc20Abi } from 'viem';
import { usePrice } from '@/app/context/getPrice';
import { bitkub, jbc, bitkubTestnet } from 'viem/chains';
import { tokens as tokens96, v3FactoryContract as v3FactoryContract96, erc20ABI as erc20ABI96, v3PoolABI as v3PoolABI96, V3_FACTORY as V3_FACTORY96, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt96, positionManagerContract as positionManagerContract96 } from '@/app/lib/96';
import { tokens as tokens8899, v3FactoryContract as v3FactoryContract8899, erc20ABI as erc20ABI8899, v3PoolABI as v3PoolABI8899, V3_FACTORY as V3_FACTORY8899, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt8899, positionManagerContract as positionManagerContract8899 } from '@/app/lib/8899';
import { tokens as tokens25925, 
  StakingFactoryV2 as StakingFactoryV2_25925,
  StakingFactoryV2Contract as StakingFactoryV2Contract_25925, 
  erc20ABI as erc20ABI25925, v3PoolABI as v3PoolABI25925, V3_FACTORY as V3_FACTORY25925, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt25925, positionManagerContract as positionManagerContract25925 } from '@/app/lib/25925';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { intervalToDuration } from 'date-fns';
import DateTimePicker from '@/app/components/DateSelector';
import { Copy, CopyCheck, Plus, Minus } from "lucide-react";

type ThemeId = 25925;
type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
  bg: string;
};

type Pool = {
  id: string;
  name: string;
  apr: string;
  tvl: string;
  volume: string;
  tokenA: string;
  tokenB: string;
  fee: number;
  poolAddress: string;
  listed: boolean;
};

type ChainKey = keyof typeof chains;

type ChainConfig = {
  chain: typeof bitkub | typeof jbc | typeof bitkubTestnet;
  chainId: number;
  explorer: string;
  rpc: string;
  blocktime: number;
  tokens: { name: string; value: string; logo: string }[];
  lib: any;
};

const themes: Record<ThemeId, Theme> = {
  25925: {
    primary: 'from-green-400 to-emerald-400',
    secondary: 'from-green-600 to-emerald-600',
    accent: 'green-400',
    glow: '',
    border: 'border-green-400/30',
    text: 'text-green-300',
    bg: 'bg-gradient-to-br from-slate-700 via-black to-emerald-900',
  },
};

const chains = {
  kubtestnet: {
    name: 'KUB Testnet',
    color: 'rgb(20, 184, 166)',
    accent: 'border-green-500',
    bg: 'bg-teal-900/20',
    text: 'text-green-400',
    border: 'border-green-400/30 ',
    hover: 'hover:border-green-400/40',
  },
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
      erc20ABI: erc20ABI25925,
      v3PoolABI: v3PoolABI25925,
      V3_FACTORY: V3_FACTORY25925,
      V3_FACTORYCreatedAt: V3_FACTORYCreatedAt25925,
      positionManagerContract: positionManagerContract25925,
      StakingFactoryV2Contract: StakingFactoryV2Contract_25925,
      StakingFactoryV2_Addr: StakingFactoryV2_25925 as '0xstring'
    },
  },
};

const CreateEarnProgram = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [selectToken, setSelectToken] = useState('');
  const [selectTokenInfo, setSelectTokenInfo] = useState<{ name: string; symbol: string; totalSupply: string } | null>(null);
  const [rewardTokenInfo, setRewardTokenInfo] = useState<{ name: string; symbol: string; totalSupply: string } | null>(null);
  const [selectedChain, setSelectedChain] = useState<ChainKey>('kubtestnet');
  const [rewardToken, setRewardToken] = useState('');
  const [rewardTokenSymbol, setRewardTokenSymbol] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [duration, setDuration] = useState('120960');
  const [startDate, setStartDate] = useState<{
    timestamp: number;
    formatted: string;
  } | null>(null);
  const [stakingType, setStakingType] = useState<string | null>(null);
  const [poolFees, setPoolFees] = useState<string[]>([]);
  const [selectLockOption, setSelectLockOption] = useState('');
  const [singleUnlockTime, setSingleUnlockTime] = useState('17280');
  const [multiLocks, setMultiLocks] = useState([{ time: '17280', multiplier: '100' }]);
  const [customDuration, setCustomDuration] = useState('');
  const [validPools, setValidPools] = useState<Pool[]>([]);
  const [openReward, setOpenReward] = useState(false);
  const [blocks, setBlocks] = useState<{ blockNumber: number; blockTimestamp: number }[]>([]);

  const [firstRewardBlock, setFirstRewardBlock] = useState(0);
  const [endRewardBlock, setEndBlockNumber] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [maxPoolToken, setMaxPoolToken] = useState('');
  const [maxUserToken, setMaxUserToken] = useState('');
  const [avgBlockTime, setAverageTime] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState("");

  const { priceList } = usePrice();
  const { chainId,address } = useAccount();
  const rewardAmountRef = useRef<HTMLInputElement>(null);
  const unlockRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const customDurationRef = useRef<HTMLInputElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const fees = ['100', '500', '3000', '10000'];
  const effectiveDuration = duration === '-' ? customDuration : duration;

  const selectedChainConfig = chainConfigs[chainId || 96];
  const { chain, rpc, blocktime, tokens, lib } = selectedChainConfig;
  const publicClient = createPublicClient({
    chain: selectedChainConfig.chain,
    transport: http(selectedChainConfig.rpc),
  });

  const currentTheme = chains[selectedChain];
  const stakingTypes = [
    {
      name: 'Token Staking',
      description: 'Stake Tokens or LP Tokens to earn rewards. Suitable for users seeking flexibility in staking options. Supports multiple staking modes: No Lock (withdraw anytime), Fixed Lock (lock tokens for a set period), and Multiple Lock (choose custom lock periods with reward multipliers based on lock duration). Ideal for users who want to maximize returns with tailored lock-in strategies.',
    },
    {
      name: 'Concentrate Liquidity Staking',
      description: 'Stake NFT-based Concentrated Liquidity V3 positions to earn rewards. Supports only No Lock staking, allowing withdrawal at any time. Users can specify token pairs and fee tiers for farming. Perfect for advanced users leveraging concentrated liquidity pools to optimize capital efficiency.',
    },
  ];

  const toggleFee = (fee: string) => {
    setPoolFees((prev) => (prev.includes(fee) ? prev.filter((f) => f !== fee) : [...prev, fee]));
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(3)} B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(3)} M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(3)} K`;
    return `$${num.toFixed(3)}`;
  };

  const fetchTokenData = async (
    tokenAddress: string,
    setInfo: (info: { name: string; symbol: string; totalSupply: string } | null) => void
  ) => {
    if (!tokenAddress) return;

    try {
      // เรียกข้อมูล name, symbol, totalSupply ก่อน
      const basicResult = await readContracts(config, {
        contracts: [
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'name' },
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'symbol' },
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'totalSupply' },
        ],
      });

      const nameResult = basicResult[0].result;
      const symbolResult = basicResult[1].result;
      const totalSupplyResult = basicResult[2].result;

      if (
        nameResult === undefined ||
        symbolResult === undefined ||
        totalSupplyResult === undefined
      ) {
        console.error(`Unexpected undefined value in basicResult for ${tokenAddress}`);
        setInfo(null);
        return;
      }

      const name = String(nameResult);
      const symbol = String(symbolResult);
      const totalSupply = formatEther(totalSupplyResult as bigint);
      // ทดสอบว่าเป็น LP token หรือไม่ โดยพยายามเรียก token0 และ token1
      try {
        const lpResult = await readContracts(config, {
          contracts: [
            { abi: UniswapV2PairABI, address: tokenAddress as `0x${string}`, functionName: 'token0' },
            { abi: UniswapV2PairABI, address: tokenAddress as `0x${string}`, functionName: 'token1' },
          ],
        });

        if (
          lpResult[0].status === 'success' &&
          lpResult[1].status === 'success' &&
          lpResult[0].result &&
          lpResult[1].result
        ) {
          const [token0Addr, token1Addr] = [lpResult[0].result as string, lpResult[1].result as string];

          // เรียก symbol ของ token0 และ token1
          const tokenSymbols = await readContracts(config, {
            contracts: [
              { abi: erc20Abi, address: token0Addr as `0x${string}`, functionName: 'symbol' },
              { abi: erc20Abi, address: token1Addr as `0x${string}`, functionName: 'symbol' },
            ],
          });

          if (
            tokenSymbols[0].status === 'success' &&
            tokenSymbols[1].status === 'success' &&
            tokenSymbols[0].result &&
            tokenSymbols[1].result
          ) {
            const symbol0 = String(tokenSymbols[0].result);
            const symbol1 = String(tokenSymbols[1].result);

            // ประกอบชื่อใหม่สำหรับ LP Token
            const combinedSymbol = `${symbol0}-${symbol1} ${symbol}`;
            const combinedName = `${symbol0}-${symbol1} ${name}`;

            setInfo({
              name: combinedName,
              symbol: combinedSymbol,
              totalSupply,
            });
            return;
          }
        }
      } catch (lpError) {
        // ถ้าเรียก token0/token1 ไม่ได้ แสดงว่าไม่ใช่ LP Token
      }

      // ถ้าไม่ใช่ LP Token ก็แสดงข้อมูลปกติ
      setInfo({
        name,
        symbol,
        totalSupply,
      });

    } catch (error) {
      console.error(`Error fetching token data for ${tokenAddress}:`, error);
      setInfo(null);
    }
  };


  useEffect(() => {
    if (!priceList || priceList.length < 2) return;

    const fetchPools = async () => {
      try {
        const logCreateData = await publicClient.getContractEvents({
          ...selectedChainConfig.lib.v3FactoryContract,
          eventName: 'PoolCreated',
          fromBlock: selectedChainConfig.lib.V3_FACTORYCreatedAt,
          toBlock: 'latest',
        });

        const createData = logCreateData.map((res: any) => ({
          action: 'create',
          token0: res.args.token0 as `0x${string}`,
          token1: res.args.token1 as `0x${string}`,
          fee: res.args.fee as `0x${string}`,
          pool: res.args.pool as `0x${string}`,
          tx: res.transactionHash as `0x${string}`,
        }));

        const results: Pool[] = [];
        const currencyTokens = [tokens[2].value, tokens[1].value, tokens[3].value];

        for (const item of createData) {
          let isListed = true;
          let tokenA = tokens.find((t) => t.value.toLowerCase() === item.token0.toLowerCase());
          let tokenB = tokens.find((t) => t.value.toLowerCase() === item.token1.toLowerCase());

          if (!tokenA) {
            isListed = false;
            const [symbolA] = await readContracts(config, {
              contracts: [{ abi: erc20Abi, address: item.token0, functionName: 'symbol' }],
            });
            tokenA = { name: symbolA.result ?? 'UNKNOWN', value: item.token0 as '0xstring', logo: '/default2.png' };
          }

          if (!tokenB) {
            isListed = false;
            const [symbolB] = await readContracts(config, {
              contracts: [{ abi: erc20Abi, address: item.token1, functionName: 'symbol' }],
            });
            tokenB = { name: symbolB.result ?? 'UNKNOWN', value: item.token1 as '0xstring', logo: '/default2.png' };
          }

          try {
            const poolStatus = await readContracts(config, {
              contracts: [
                { abi: erc20Abi, address: tokenA.value as `0x${string}`, functionName: 'balanceOf', args: [item.pool] },
                { abi: erc20Abi, address: tokenB.value as `0x${string}`, functionName: 'balanceOf', args: [item.pool] },
              ],
            });

            let tokenAamount = poolStatus[0].result ?? BigInt(0);
            let tokenBamount = poolStatus[1].result ?? BigInt(0);
            let priceA = priceList.find((p) => p.token === tokenA!.name)?.priceUSDT ?? 0;
            let priceB = priceList.find((p) => p.token === tokenB!.name)?.priceUSDT ?? 0;
            let balanceA = Number(tokenAamount) / 1e18;
            let balanceB = Number(tokenBamount) / 1e18;
            const liquidityUSD = balanceA * priceA + balanceB * priceB;

            const blockAmountDaily = 86400 / selectedChainConfig.blocktime;
            const currentBlock = await publicClient.getBlockNumber();

            const logBuyData = await publicClient.getContractEvents({
              abi: erc20Abi,
              address: tokenA.value as `0x${string}`,
              eventName: 'Transfer',
              args: { from: item.pool },
              fromBlock: currentBlock - BigInt(blockAmountDaily),
              toBlock: 'latest',
            });

            const buyData = logBuyData.map((res: any) => ({
              action: 'buy',
              value: Number(formatEther(res.args.value)),
              tx: res.transactionHash,
            }));

            const logSellData = await publicClient.getContractEvents({
              abi: erc20Abi,
              address: tokenA.value as `0x${string}`,
              eventName: 'Transfer',
              args: { to: item.pool },
              fromBlock: currentBlock - BigInt(blockAmountDaily),
              toBlock: 'latest',
            });

            const sellData = logSellData.map((res: any) => ({
              action: 'sell',
              value: Number(formatEther(res.args.value)),
              tx: res.transactionHash,
            }));

            const logAddLiquidity = await publicClient.getContractEvents({
              ...selectedChainConfig.lib.positionManagerContract,
              eventName: 'IncreaseLiquidity',
              address: item.pool,
              fromBlock: currentBlock - BigInt(blockAmountDaily),
              toBlock: 'latest',
            });

            const addLiquidityData = logAddLiquidity.map((res: any) => ({
              action: 'add',
              value: Number(formatEther(res.args.value)),
              tx: res.transactionHash,
            }));

            const logRemoveLiquidity = await publicClient.getContractEvents({
              ...selectedChainConfig.lib.positionManagerContract,
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

            const liquidityTxs = new Set([...addLiquidityData.map((item: any) => item.tx), ...removeLiquidityData.map((item: any) => item.tx)]);
            const filteredBuyData = buyData.filter((item: any) => !liquidityTxs.has(item.tx));
            const filteredSellData = sellData.filter((item: any) => !liquidityTxs.has(item.tx));
            const volumeToken = [...filteredBuyData, ...filteredSellData].reduce((sum, tx) => sum + tx.value, 0);
            const feeRate = Number(item.fee) / 1_000_000;
            const fee24h = volumeToken * feeRate * priceA;
            const apr = ((fee24h * 365) / liquidityUSD) * 100 || 0;

            const a = currencyTokens.indexOf(tokenA.value as '0xstring');
            const b = currencyTokens.indexOf(tokenB.value as '0xstring');
            if ((a !== -1 && b === -1) || (a !== -1 && b !== -1 && b < a)) {
              [tokenA, tokenB] = [tokenB, tokenA];
              [tokenAamount, tokenBamount] = [tokenBamount, tokenAamount];
              [priceA, priceB] = [priceB, priceA];
              [balanceA, balanceB] = [balanceB, balanceA];
            }

            results.push({
              id: `${tokenA.name}-${tokenB.name}-${item.fee}`,
              name: `${tokenA.name}/${tokenB.name}`,
              apr: `${apr.toFixed(2)}%`,
              tvl: `$${liquidityUSD.toFixed(3)}`,
              volume: `$${volumeToken * priceA}`,
              tokenA: tokenA.value,
              tokenB: tokenB.value,
              fee: Number(item.fee),
              poolAddress: item.pool,
              listed: isListed,
            });
          } catch (error) {
            console.error(`Error fetching pool for ${tokenA.name}-${tokenB.name}:`, error);
          }
        }

        setValidPools(results);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };




    fetchPools();
  }, [priceList, selectedChainConfig]);

  useEffect(() => {
    const getAverageBlockTime = async () => {
      try {
        const latestBlockNumber = await publicClient.getBlockNumber();
        const oldBlockNumber = latestBlockNumber - BigInt(100);

        const [latestBlock, oldBlock] = await Promise.all([
          publicClient.getBlock({ blockNumber: latestBlockNumber }),
          publicClient.getBlock({ blockNumber: oldBlockNumber }),
        ]);

        const latestTime = Number(latestBlock.timestamp);
        const oldTime = Number(oldBlock.timestamp);
        const averageTime = (latestTime - oldTime) / 100;
        setAverageTime(averageTime)
        console.log(`Last 100 Blocks Time avg is ${averageTime}`)
        return averageTime;
      } catch (err) {
        console.error("Error in getAverageBlockTime:", err);
        return null;
      }
    };
    getAverageBlockTime();
  }, [chainId])

  const convertBlocksToTimeString = (blocks: number, avgBlockTime: number): string => {
    if (blocks <= 0 || avgBlockTime <= 0) return '0 seconds';

    const totalSeconds = blocks * avgBlockTime;

    const duration = intervalToDuration({
      start: 0,
      end: totalSeconds * 1000,
    });

    const { years, months, days, hours, minutes, seconds } = duration;

    const parts: string[] = [];

    if (years) parts.push(years === 1 ? '1 year' : `${years} years`);
    if (months) parts.push(months === 1 ? '1 month' : `${months} months`);
    if (days) parts.push(days === 1 ? '1 day' : `${days} days`);
    if (hours) parts.push(hours === 1 ? '1 hour' : `${hours} hours`);
    if (minutes) parts.push(minutes === 1 ? '1 minute' : `${minutes} minutes`);
    if (seconds) parts.push(seconds === 1 ? '1 second' : `${seconds} seconds`);

    if (parts.length === 0) return '0 seconds';
    if (parts.length === 1) return parts[0];

    const last = parts.pop();
    return parts.join(', ') + ' and ' + last;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(""), 800);
  };

  const getRewardRatePerDay = (
    rewardAmount: string | number,
    effectiveDuration: string | number,
    avgBlockTime: number
  ): string => {
    if (!rewardAmount || !effectiveDuration || avgBlockTime <= 0) return '0.00';

    const totalDays = (Number(effectiveDuration) * avgBlockTime) / 86400;
    const rate = Number(rewardAmount) / totalDays;

    return rate.toFixed(2);
  };

  useEffect(() => {
    async function fetchCurrentBlock() {
      try {
        const block = await publicClient.getBlock();
        if (!block) return;
        setBlocks(prev => [{
          blockNumber: Number(block.number),
          blockTimestamp: Number(block.timestamp),
        }, ...prev]);
      } catch (e) {
        console.error('Error fetching current block:', e);
      }
    }

    fetchCurrentBlock();
  }, [publicClient]);

  useEffect(() => {
    if (rewardToken) {
      fetchTokenData(rewardToken, setRewardTokenInfo);
      readContracts(config, {
        contracts: [{ abi: erc20Abi, address: rewardToken as `0x${string}`, functionName: 'symbol' }],
      }).then(([result]) => {
        if (result?.status === 'success' && result.result !== undefined) {
          setRewardTokenSymbol(result.result);
        }
      }).catch((error) => console.error('Error fetching reward token symbol:', error));
    }
  }, [rewardToken]);

  useEffect(() => {
    if (!startDate || !effectiveDuration || !selectedChainConfig?.blocktime) {
      setEndBlockNumber(0);
      return;
    }
    const startTimestamp = new Date(startDate.timestamp).getTime() / 1000;
    const durationSeconds = Number(effectiveDuration) * 24 * 60 * 60;
    const endTimestamp = startTimestamp + durationSeconds;
    if (!firstRewardBlock) {
      setEndBlockNumber(0);
      return;
    }
    const blocksElapsed = Math.floor(durationSeconds / selectedChainConfig.blocktime);
    setEndBlockNumber(firstRewardBlock + blocksElapsed);
  }, [startDate, effectiveDuration, selectedChainConfig.blocktime, firstRewardBlock]);

  useEffect(() => {
    if (openReward && commandInputRef.current) {
      commandInputRef.current.focus();
    }
  }, [searchInput, openReward]);

  function estimateBlockNumberByTimestamp(
    startTimestamp: number,
    currentBlockNumber: number,
    currentBlockTimestamp: number,
    avgBlockTime: number
  ) {

    let diff = (startTimestamp / 1000) - currentBlockTimestamp
/*     console.log("Diff : ", diff)
    console.log("Blocks : ", diff / avgBlockTime) */

    let estimatedBlock = Math.round(currentBlockNumber + (diff / avgBlockTime));

    return estimatedBlock > 0 ? estimatedBlock : 0;
  }


  const estimatedStartBlock = estimateBlockNumberByTimestamp(
    startDate?.timestamp || 0,
    blocks.length > 0 ? blocks[0].blockNumber : 0,
    blocks.length > 0 ? blocks[0].blockTimestamp : 0,
    avgBlockTime
  );

  const createPool = async () => {
    try {
        if(stakingType === 'Token Staking'){
        // allowanace
        const allowance = await readContract(config, {
              abi: erc20Abi,
              address: rewardToken as `0x${string}`,
              functionName: 'allowance',
              args: [address as `0x${string}`, lib.StakingFactoryV2_Addr],
            });

            if (allowance < parseEther(rewardAmount)) {
              const { request } = await simulateContract(config, {
                abi: erc20Abi,
                address: rewardToken as `0x${string}`,
                functionName: 'approve',
                args: [lib.StakingFactoryV2_Addr, parseEther(rewardAmount)],
              });
              const h = await writeContract(config, request);
              await waitForTransactionReceipt(config, { hash: h });
            }

        const programName =
          selectLockOption === '1'
            ? `Fixable Lock ${selectTokenInfo?.name} earn ${rewardTokenInfo?.name}`
            : selectLockOption === '2'
            ? `Multiple Lock ${selectTokenInfo?.name} earn ${rewardTokenInfo?.name}`
            : `Staking ${selectTokenInfo?.name} earn ${rewardTokenInfo?.name}`;

        // create
        const multiLocksTime = multiLocks.map(lock => BigInt(lock.time));
        const multiLocksPower = multiLocks.map(lock => BigInt(lock.multiplier));

        const { request } = await simulateContract(config, {
          ...selectedChainConfig.lib.StakingFactoryV2Contract,
          functionName: 'createProject',
          args: [
            {
              name: programName,
              stakingOrPMToken: selectToken as `0x${string}`,
              rewardToken: rewardToken as `0x${string}`,
              tokenA: "0x0000000000000000000000000000000000000000",
              tokenB: "0x0000000000000000000000000000000000000000",
              poolFees: [] as number[], // uint24[]
              totalRewards: parseEther(rewardAmount),
              mode: BigInt(selectLockOption),
              lockDurations:
                selectLockOption === '1'
                  ? [BigInt(singleUnlockTime)]
                  : selectLockOption === '2'
                  ? multiLocksTime
                  : [],
              powerMultipliers: selectLockOption === '2' ? multiLocksPower : [],
              projectOwner: address as `0x${string}`,
              startBlockReward: BigInt(estimatedStartBlock),
              endBlockReward: BigInt(Number(estimatedStartBlock) + Number(effectiveDuration)),
              userLockMaximum: parseEther(maxUserToken),
              poolLockMaximum: parseEther(maxPoolToken)
            }
          ]
        });

          const h = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h })


      }else if(stakingType === 'Concentrate Liquidity Staking' ){
      }
    } catch (error) {
      console.error(error)
    }

  }



  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[
        { number: 1, title: 'Select Staking Type', description: 'Choose staking program type' },
        { number: 2, title: 'Select Pool', description: 'Choose a liquidity pool' },
        { number: 3, title: 'Add Reward', description: 'Set rewards and period' },
        { number: 4, title: 'Review', description: 'Confirm farm details' },
      ].map((step, index, arr) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number ? `${currentTheme.accent} ${currentTheme.bg}` : ` ${currentTheme.border} ${currentTheme.hover}`
              }`}
          >
            {currentStep > step.number ? (
              <Check className={`w-5 h-5 ${currentTheme.text}`} />
            ) : (
              <span className={`text-sm font-medium ${currentStep >= step.number ? currentTheme.text : 'text-gray-400'}`}>
                {step.number}
              </span>
            )}
          </div>
          {index < arr.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? currentTheme.accent : 'bg-gray-600'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderChainSelector = () => (
    <div className="flex gap-2 mb-6">
      {Object.entries(chains).map(([key, chain]) => (
        <button
          key={key}
          onClick={() => setSelectedChain(key as ChainKey)}
          className={`px-4 py-2 rounded-lg border transition-all ${selectedChain === key
            ? `${chain.accent} ${chain.bg} ${chain.text}`
            : ` ${currentTheme.border} ${currentTheme.hover}`
            }`}
        >
          {chain.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto w-full mt-[120px]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Earn Program</h1>
            <p className="text-gray-400">Set up farming rewards for liquidity providers</p>
          </div>

          {renderChainSelector()}
          {renderStepIndicator()}

          <div className={` border ${currentTheme.border} rounded-xl p-6`}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Select Staking Type</h2>
                  <p className="text-gray-400">Choose the type of staking program you want to create</p>
                </div>
                <div className="space-y-3">
                  {stakingTypes.map((type) => (
                    <div
                      key={type.name}
                      onClick={() => setStakingType(type.name)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${stakingType === type.name ? `${currentTheme.accent} ${currentTheme.bg}` : `border ${currentTheme.border} ${currentTheme.border} `
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{type.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">{type.description}</p>
                        </div>
                        {stakingType === type.name && <Check className={`w-5 h-5 ${currentTheme.text}`} />}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => stakingType && setCurrentStep(2)}
                  disabled={!stakingType}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${stakingType
                    ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                    : ' text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === 2 && stakingType === 'Token Staking' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Select Staked Token</h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchRef}
                    value={selectToken}
                    onChange={(e) => {
                      setSelectToken(e.target.value);
                      if (e.target.value.length === 42) fetchTokenData(e.target.value, setSelectTokenInfo);
                    }}
                    placeholder="Stake Token Address"
                    className={`w-full pl-10 pr-4 py-3  border  ${currentTheme.border} ${currentTheme.hover} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500`}
                  />
                </div>
                <div className="space-y-3">
                  {tokens
                    .filter((token) => token.value.length === 42)
                    .map((token) => (
                      <div
                        key={token.value}
                        onClick={() => {
                          setSelectToken(token.value);
                          fetchTokenData(token.value, setSelectTokenInfo);
                        }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectToken === token.value ? `${currentTheme.accent} ${currentTheme.bg}` : `${currentTheme.border} ${currentTheme.hover}`
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={token.logo || '/default2.png'} alt={token.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <h3 className="font-medium text-white">{token.name}</h3>
                            <p className="text-sm text-gray-400">Token Address: {token.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
                  <h3 className={`font-medium ${currentTheme.text} mb-3`}>Your Staked Token Information</h3>
                  <div className="grid gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Token Name:</span>
                      <span className="text-white ml-2">{selectTokenInfo?.name ?? 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Token Supply:</span>
                      <span className="text-white ml-2">
                        {selectTokenInfo?.totalSupply ? parseFloat(selectTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Token Symbol:</span>
                      <span className="text-white ml-2">{selectTokenInfo?.symbol ?? 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCurrentStep(1)
                      setSelectedPool(null)
                      setSelectToken('')
                    }
                    }
                    className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => selectToken && setCurrentStep(3)}
                    disabled={!selectToken}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectToken ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80` : 'border border-gray-500 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && stakingType === 'Concentrate Liquidity Staking' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Select Eligible Pool</h2>
                  <p className="text-gray-400">Choose a liquidity pool to create farming rewards</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search pools..."
                    className={`w-full pl-10 pr-4 py-3  border ${currentTheme.border} ${currentTheme.hover} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:${currentTheme.border}`}
                  />
                </div>
                <div className="space-y-3">
                  {validPools.map((pool) => (
                    <div
                      key={pool.id}
                      onClick={() => setSelectedPool(pool)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedPool?.id === pool.id ? `${currentTheme.accent} ${currentTheme.bg}` : `${currentTheme.border} ${currentTheme.hover}`
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10">
                            <img src="/default2.png" alt="token1" className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0" />
                            <img src="/default2.png" alt="token2" className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{pool.name}</h3>
                            {/*                             <p className="text-sm text-gray-400">Fee: {(pool.fee / 10000)}%</p>
 */}                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-4 text-sm">
                            <span className="text-gray-400">
                              APR: <span className={currentTheme.text}>{pool.apr}</span>
                            </span>
                            <span className="text-gray-400">
                              TVL: <span className="text-white">{pool.tvl}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">24h Vol: {pool.volume}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">Eligible Liquidity Fees</h2>
                    <p className="text-sm text-gray-400">Please select one or more acceptable fee tiers for this program.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fees.map((fee) => (
                      <button
                        key={fee}
                        onClick={() => toggleFee(fee)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${poolFees.includes(fee)
                          ? `${currentTheme.bg} ${currentTheme.text} ring-2 ring-offset-1 ring-primary`
                          : ' text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                          }`}
                      >
                        {Number(fee) / 10000}%
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">Selected {poolFees.length} fee tier{poolFees.length !== 1 && 's'}.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCurrentStep(1)
                      setSelectedPool(null)
                      setSelectToken('')
                    }
                    }
                    className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => selectedPool && setCurrentStep(3)}
                    disabled={!selectedPool}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectedPool ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80` : 'border border-gray-500 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Add Reward</h2>
                  <p className="text-gray-400">Configure reward token and farming period</p>
                </div>
                {stakingType === 'Token Staking' ? (
                  <>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Reward Token</label>
                      <Popover open={openReward} onOpenChange={setOpenReward}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openReward}
                            className={`w-full  text-white border ${currentTheme.border} ${currentTheme.hover} h-10 justify-between`}
                          >
                            <div className="gap-2 flex items-center">
                              {rewardToken ? (
                                <img
                                  alt=""
                                  src={tokens.find((t) => t.value === rewardToken)?.logo || '/default2.png'}
                                  className="w-5 h-5 rounded-full"
                                />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">?</div>
                              )}
                              <span className="truncate">{tokens.find((t) => t.value === rewardToken)?.name || 'Select reward token'}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 z-50">
                          <Command>
                            <CommandInput
                              ref={commandInputRef}
                              placeholder="Search tokens..."
                              value={searchInput}
                              onValueChange={setSearchInput}
                            />
                            <CommandList>
                              <CommandEmpty>
                                <div className="flex flex-col items-center justify-center py-4 gap-2 text-sm">
                                  <span>No tokens found.</span>
                                  <button
                                    onClick={() => {
                                      if (searchInput?.length === 42) {
                                        setRewardToken(searchInput);
                                        fetchTokenData(searchInput, setRewardTokenInfo);
                                        setOpenReward(false);
                                      } else {
                                        alert('Invalid token address.');
                                      }
                                    }}
                                    className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                                  >
                                    {searchInput?.length === 42 ? '+ Add Token' : 'Invalid Token Contract Address'}
                                  </button>
                                </div>
                              </CommandEmpty>
                              <CommandGroup>
                                {tokens
                                  .filter((token) => token.value?.length === 42)
                                  .map((token) => (
                                    <CommandItem
                                      key={token.value}
                                      value={token.name}
                                      onSelect={() => {
                                        setRewardToken(token.value);
                                        fetchTokenData(token.value, setRewardTokenInfo);
                                        setOpenReward(false);
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <div className="flex items-center">
                                        <img alt="" src={token.logo} className="w-5 h-5 rounded-full" />
                                        <span className="ml-3 truncate">{token.name}</span>
                                      </div>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div className={`p-4 mt-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
                        <h3 className={`font-medium ${currentTheme.text} mb-3`}>Reward Token Information</h3>
                        <div className="grid gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Token Name:</span>
                            <span className="text-white ml-2">{rewardTokenInfo?.name ?? 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Token Supply:</span>
                            <span className="text-white ml-2">
                              {rewardTokenInfo?.totalSupply ? parseFloat(rewardTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Token Symbol:</span>
                            <span className="text-white ml-2">{rewardTokenInfo?.symbol ?? 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Total Reward Amount (Ether)</label>
                      <input
                        ref={rewardAmountRef}
                        type="number"
                        placeholder="0.00"
                        value={rewardAmount}
                        onChange={(e) => setRewardAmount(e.target.value)}
                        className="w-full px-4 py-3  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Lock Options</label>
                      <div className="space-y-3">
                        <div
                          className={`p-4 rounded-lg border cursor-pointer ${selectLockOption === '0' ? currentTheme.bg : ''}`}
                          onClick={() => setSelectLockOption('0')}
                        >
                          <div className="font-medium text-white">No Lock</div>
                          <p className="text-sm text-gray-400">Users can withdraw staked tokens at any time.</p>
                        </div>
                        <div
                          className={`p-4 rounded-lg border cursor-pointer ${selectLockOption === '1' ? currentTheme.bg : ''}`}
                          onClick={() => setSelectLockOption('1')}
                        >
                          <div className="font-medium text-white">Single Lock Time</div>
                          <p className="text-sm text-gray-400">Users can withdraw their staked tokens only after the unlock time set by the creator.</p>
                        </div>
                        <div
                          className={`p-4 rounded-lg border cursor-pointer ${selectLockOption === '2' ? currentTheme.bg : ''}`}
                          onClick={() => setSelectLockOption('2')}
                        >
                          <div className="font-medium text-white">Multiple Lock Time</div>
                          <p className="text-sm text-gray-400">
                            Users can choose from multiple lock durations predefined by the creator. The creator can assign different reward multipliers based on the selected duration.
                          </p>
                        </div>
                      </div>
                      {selectLockOption === '1' && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-white">Unlock Time (blocks)</label>
                          <input
                            type="number"
                            ref={unlockRef}
                            placeholder="Enter unlock time (in blocks)"
                            className="w-full p-2 rounded-md border  text-white"
                            value={singleUnlockTime}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/,/g, '');
                              if (isNaN(Number(value)) || value === '') {
                                value = '1';
                              } else if (Number(value) < 1) {
                                value = '1';
                              }
                              setSingleUnlockTime(value);
                            }}
                          />
                          <div className="text-gray-400 text-sm">Lock for {singleUnlockTime} blocks (~ {convertBlocksToTimeString(Number(singleUnlockTime), avgBlockTime)})</div>

                        </div>
                      )}
                      {selectLockOption === '2' && (
                        <div className="space-y-4">
                          <label className="block text-sm font-semibold text-white">Multiple Lock Options</label>

                          {multiLocks.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center /30 p-4 rounded-lg border">
                              <div className="w-full md:w-1/3">
                                <label className="block text-sm font-medium text-white mb-1">Unlock Time (Blocks)</label>
                                <input
                                  type="number"
                                  placeholder="e.g., 3600"
                                  min={1}
                                  className="w-full p-2 rounded-md border  text-white"
                                  value={item.time}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/,/g, '');
                                    if (isNaN(Number(value)) || value === '') {
                                      value = '1';
                                    } else if (Number(value) < 1) {
                                      value = '1';
                                    }
                                    const updated = [...multiLocks];
                                    updated[index].time = value;
                                    setMultiLocks(updated);
                                  }}

                                />
                              </div>
                              <div className="w-full md:w-1/3">
                                <label className="block text-sm font-medium text-white mb-1">Estimated Time</label>
                                <div className='w-full p-2 rounded-md border  text-white'>
                                  {convertBlocksToTimeString(Number(multiLocks[index].time), avgBlockTime)}
                                </div>
                              </div>
                              <div className="w-full md:w-1/3">
                                <label className="block text-sm font-medium text-white mb-1">Power Multiplier (%)</label>
                                <input
                                  type="number"
                                  placeholder="e.g., 80 or 120"
                                  className="w-full p-2 rounded-md border  text-white"
                                  min={1}
                                  value={item.multiplier}
                                  onChange={(e) => {
                                    const updated = [...multiLocks];
                                    updated[index].multiplier = e.target.value;
                                    setMultiLocks(updated);
                                  }}
                                />
                              </div>
                              <button
                                type="button"
                                className="mt-2 md:mt-6 text-sm text-red-500 hover:text-red-700"
                                onClick={() => setMultiLocks(multiLocks.filter((_, i) => i !== index))}
                              >
                                🗑 Remove
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-700 hover:text-white"
                            onClick={() => setMultiLocks([...multiLocks, { time: '17280', multiplier: '120' }])}
                          >
                            + Add
                          </button>
                        </div>
                      )}
                    </div>


                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Block Reward</label>
                      <DateTimePicker
                        onSelect={(timestamp) => {
                          const date = new Date(timestamp);
                          setStartDate({
                            timestamp,
                            formatted: date.toLocaleString('en-US')
                          });
                        }}
                      />
                      {/*                       <div className="text-gray-400 text-sm">Curr : {blocks[0].blockNumber} </div>
 */}                      <div className="text-gray-400 text-sm">First Reward will start at block number : {estimatedStartBlock} </div>

                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Reward Duration (Blocks)</label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-gray-500"
                      >
                        {[7, 14, 30, 90, 365].map((day) => {
                          const blocks = Math.ceil((day * 86400) / avgBlockTime);
                          return (
                            <option key={day} value={blocks}>
                              {`${blocks.toLocaleString()} Blocks ( ~${day} Days )`}
                            </option>
                          );
                        })}

                        <option value="-">Custom Blocks</option>
                      </select>

                      {duration === '-' && (
                        <span>

                          <input
                            type="number"
                            min={1}
                            placeholder="Enter custom reward duration (Blocks)"
                            value={customDuration}
                            ref={customDurationRef}
                            onChange={(e) => setCustomDuration(e.target.value)}
                            className="mt-2 w-full px-4 py-3  border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
                          />
                          <div className="text-gray-400 text-sm">Selected Reward Duration: {effectiveDuration} Blocks (~ {convertBlocksToTimeString(Number(effectiveDuration), avgBlockTime)})</div>

                        </span>
                      )}

                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Pool Staked Token (Ether)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={maxPoolToken}
                        onChange={(e) => setMaxPoolToken(e.target.value)}
                        className="w-full px-4 py-3  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                      />
                      <label className="block text-sm font-medium text-gray-300 mb-2 mt-4">Maximum Staked Token Per User (Ether)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={maxUserToken}
                        onChange={(e) => setMaxUserToken(e.target.value)}
                        className="w-full px-4 py-3  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                      />
                    </div>

                    {/* <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
                      <h3 className={`font-medium ${currentTheme.text} mb-2`}>Reward Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Emission rate:</span>
                          <span className="text-white">
                            {getRewardRatePerDay(rewardAmount, effectiveDuration, avgBlockTime)} {rewardTokenSymbol || 'tokens'}/day
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Duration:</span>
                          <span className="text-white">{convertBlocksToTimeString(Number(effectiveDuration), avgBlockTime)}</span>
                        </div>
                      </div>
                    </div> */}

                  </>
                ) : (
                  <>
                    <div className="grid gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Reward Token</label>
                          <Popover open={openReward} onOpenChange={setOpenReward}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openReward}
                                className="w-full  text-white border border-gray-600 h-10 justify-between"
                              >
                                <div className="gap-2 flex flex-row items-center justify-start">
                                  {rewardToken ? (
                                    <img
                                      alt=""
                                      src={tokens.find((t) => t.value === rewardToken)?.logo || '/default2.png'}
                                      className="w-5 h-5 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">?</div>
                                  )}
                                  <span className="truncate">{tokens.find((t) => t.value === rewardToken)?.name || 'Select reward token'}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 z-50">
                              <Command>
                                <CommandInput
                                  ref={commandInputRef}
                                  placeholder="Search tokens..."
                                  value={searchInput}
                                  onValueChange={setSearchInput}
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    <div className="flex flex-col items-center justify-center py-4 gap-2 text-sm">
                                      <span>No tokens found.</span>
                                      <button
                                        onClick={() => {
                                          if (searchInput?.length === 42) {
                                            setRewardToken(searchInput);
                                            fetchTokenData(searchInput, setRewardTokenInfo);
                                            setOpenReward(false);
                                          } else {
                                            alert('Invalid token address.');
                                          }
                                        }}
                                        className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                                      >
                                        {searchInput?.length === 42 ? '+ Add Token' : 'Invalid Token Contract Address'}
                                      </button>
                                    </div>
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {tokens
                                      .filter((token) => token.value?.length === 42)
                                      .map((token) => (
                                        <CommandItem
                                          key={token.value}
                                          value={token.name}
                                          onSelect={() => {
                                            setRewardToken(token.value);
                                            fetchTokenData(token.value, setRewardTokenInfo);
                                            setOpenReward(false);
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <div className="flex items-center">
                                            <img alt="" src={token.logo} className="w-5 h-5 rounded-full" />
                                            <span className="ml-3 truncate">{token.name}</span>
                                          </div>
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className={`p-4 mt-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
                          <h3 className={`font-medium ${currentTheme.text} mb-3`}>Reward Token Information</h3>
                          <div className="grid gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Token Name:</span>
                              <span className="text-white ml-2">{rewardTokenInfo?.name ?? 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Token Supply:</span>
                              <span className="text-white ml-2">
                                {rewardTokenInfo?.totalSupply ? parseFloat(rewardTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Token Symbol:</span>
                              <span className="text-white ml-2">{rewardTokenInfo?.symbol ?? 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Total Reward Amount (Ether)</label>
                          <input
                            ref={rewardAmountRef}
                            type="number"
                            placeholder="0.00"
                            value={rewardAmount}
                            onChange={(e) => setRewardAmount(e.target.value)}
                            className="w-full px-4 py-3  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">

                        <label className="block text-sm font-medium text-gray-300 mb-2">First Block Reward</label>
                        <DateTimePicker
                          onSelect={(timestamp) => {
                            const date = new Date(timestamp);
                            setStartDate({
                              timestamp,
                              formatted: date.toLocaleString('en-US')
                            });
                          }}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Reward Duration (Blocks)</label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-gray-500"
                        >
                          {[7, 14, 30, 90, 365].map((day) => {
                            const blocks = Math.ceil((day * 86400) / avgBlockTime);
                            return (
                              <option key={day} value={blocks}>
                                {`${blocks.toLocaleString()} Blocks ( ~${day} Days )`}
                              </option>
                            );
                          })}

                          <option value="-">Custom Blocks</option>
                        </select>

                        {duration === '-' && (
                          <span>

                            <input
                              type="number"
                              min={1}
                              placeholder="Enter custom reward duration (Blocks)"
                              value={customDuration}
                              ref={customDurationRef}
                              onChange={(e) => setCustomDuration(e.target.value)}
                              className="mt-2 w-full px-4 py-3  border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
                            />
                            <div className="text-gray-400 text-sm">Selected Reward Duration: {effectiveDuration} Blocks (~ {convertBlocksToTimeString(Number(effectiveDuration), avgBlockTime)})</div>

                          </span>
                        )}

                      </div>

                    </div>

                    {/* <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
                      <h3 className={`font-medium ${currentTheme.text} mb-2`}>Reward Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Emission rate:</span>
                          <span className="text-white">
                            {getRewardRatePerDay(rewardAmount, effectiveDuration, avgBlockTime)} {rewardTokenSymbol || 'tokens'}/day
                          </span>

                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Duration:</span>
                          <span className="text-white">{convertBlocksToTimeString(Number(effectiveDuration), avgBlockTime)}</span>
                        </div>
                      </div>
                    </div> */}


                  </>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium  transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    disabled={!rewardToken || !rewardAmount || !startDate}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${rewardToken && rewardAmount && startDate
                      ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                      : 'border border-gray-500 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-wide" style={{ letterSpacing: '0.04em' }}>
                    Review Farm Details
                  </h2>
                  <p className="text-gray-400 text-base tracking-normal" style={{ letterSpacing: '0.015em' }}>
                    Confirm your farming program configuration
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-600 rounded-lg">
                    <h3 className="font-semibold text-white mb-3 text-xl tracking-wide" style={{ letterSpacing: '0.03em' }}>
                      Program Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 ml-2 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                          {selectLockOption === '1'
                            ? "Lock : "
                            : selectLockOption === '2'
                              ? "Multiple Lock : "
                              : "Staking : "}
                          <span className={`${currentTheme.text} tracking-wide`} style={{ letterSpacing: '0.025em', fontSize: '0.9rem' }}>
                            {selectTokenInfo?.name}
                          </span>{" "}
                          → Earn{" "}
                          <span className={`${currentTheme.text} tracking-wide`} style={{ letterSpacing: '0.025em', fontSize: '0.9rem' }}>
                            {rewardTokenInfo?.name}
                          </span>
                        </div>
                        <div className="text-gray-400 ml-2 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                          Staked Duration :{" "}
                          <span className={`${currentTheme.text} tracking-wide`} style={{ letterSpacing: '0.025em', fontSize: '0.9rem' }}>
                            {parseInt(effectiveDuration).toLocaleString()}
                          </span>{" "}
                          Blocks (~ {convertBlocksToTimeString(Number(effectiveDuration), avgBlockTime)})
                        </div>
                        <div className="text-gray-400 ml-2 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                          Chain :{" "}
                          <span className={`${currentTheme.text} tracking-wide`} style={{ letterSpacing: '0.025em', fontSize: '0.9rem' }}>
                            {currentTheme.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-600 rounded-lg">
                    <h3 className="font-semibold text-white mb-3 text-xl tracking-wide" style={{ letterSpacing: '0.03em' }}>
                      Pool Information
                    </h3>
                    <div>
                      <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                        {stakingType === "Token Staking" ? "Token Staked:" : "Pool:"}
                      </span>
                      <span className="text-white ml-2 tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                        {stakingType === "Token Staking" ? selectTokenInfo?.name : selectedPool?.name}
                      </span>
                    </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 tracking-normal" style={{ letterSpacing: '0.015em' }}>
                    <span>Contract Address:</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          (stakingType === "Token Staking" ? selectToken : selectedPool?.poolAddress) || '',
                          "stakingCa"
                        )
                      }
                      className="flex items-center gap-1 text-white transition-colors"
                    >
                      <span>
                        {stakingType === "Token Staking"
                          ? selectToken
                          : selectedPool?.poolAddress || "N/A"}
                      </span>
                      {copiedAddress === "stakingCa" ? <CopyCheck size={16} /> : <Copy size={16} />}
                    </button>
                  </div>


                    {stakingType !== "Token Staking" && (
                      <div>
                        <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                          Fee:
                        </span>
                        <span className={`${currentTheme.text} ml-2 tracking-wide`} style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                          {poolFees
                            .map((fee) => Number(fee))
                            .sort((a, b) => a - b)
                            .map((fee) => `${(fee / 10000).toFixed(2)}%`)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                        Lock Durations :{" "}
                      </span>
                      {selectLockOption !== "1" && selectLockOption !== "2" && (
                        <span className="text-white tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                          No Lock
                        </span>
                      )}

                      {selectLockOption === "1" && (
                        <span className="text-white tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                          {singleUnlockTime} Blocks
                        </span>
                      )}

                      {selectLockOption === "2" && (
                        <div className="space-y-4 mt-2">
                          {multiLocks.map((item, index) => (
                            <div key={index} className="space-y-1 ml-2 my-2 rounded-lg ">
                              <div className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                                Unlock Time (Blocks) :{" "}
                                <span className="text-white tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                                  {item.time || "-"}
                                </span>{" "}
                                ({convertBlocksToTimeString(Number(multiLocks[index].time), avgBlockTime)})
                              </div>
                              <div className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                                Power Multiplier (%) :{" "}
                                <span className="text-white tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                                  {item.multiplier || "-"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
<div>
  <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
    Block reward range:
  </span>
  <span
    className="ml-2 text-white tracking-wide"
    style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}
  >
    {estimatedStartBlock}{" - "}{Number(estimatedStartBlock) + Number(effectiveDuration)}
  </span>
</div>

           

                    <div>
                      <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                        Maximum Lock per User :{" "}
                      </span>
                      <span className={`ml-2 text-white tracking-wide`} style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                        {Number(maxUserToken) === 0 ? "Unlimited" : Number(maxUserToken)} {rewardTokenInfo?.name}{" "}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                        Maximum Pool Lock Token :{" "}
                      </span>
                      <span className={`ml-2 text-white tracking-wide`} style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                        {Number(maxPoolToken) === 0 ? "Unlimited" : Number(maxPoolToken)} {rewardTokenInfo?.name}{" "}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-600 rounded-lg">
                  <h3 className="font-semibold text-white mb-3 text-xl tracking-wide" style={{ letterSpacing: '0.03em' }}>
                    Reward Information
                  </h3>
                  <div>
                    <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                      Reward Token :{" "}
                    </span>
                    <span className="text-white ml-2 tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                      {rewardTokenInfo?.name} ({rewardTokenInfo?.symbol})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 tracking-normal" style={{ letterSpacing: '0.015em' }}>
                    <span>Contract Address :</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          rewardToken,
                          "reward"
                        )
                      }
                      className="flex items-center gap-1 text-white transition-colors"
                    >
                      <span>
                        {rewardToken}
                      </span>
                      {copiedAddress === "reward" ? <CopyCheck size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                      Total Reward {" :"}
                    </span>
                    <span className={`ml-2 text-white tracking-wide`} style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                      {Number(rewardAmount).toLocaleString()} {rewardTokenInfo?.symbol}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                      Reward Durations {" : "}
                      <span className='text-white'> {Number(effectiveDuration).toLocaleString()} Blocks ({convertBlocksToTimeString(Number(effectiveDuration), avgBlockTime)})
                      </span>
                    </span>
                    <span className={`ml-2 text-white tracking-wide`} style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                      {" "}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-sm tracking-normal" style={{ letterSpacing: '0.015em' }}>
                      Emission rate :{" "}
                    </span>
                    <span className="text-white tracking-wide" style={{ letterSpacing: '0.02em', fontSize: '0.9rem' }}>
                      {getRewardRatePerDay(rewardAmount, effectiveDuration, avgBlockTime)} {rewardTokenSymbol || "tokens"}/day
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium tracking-wide transition-colors"
                  >
                    Back
                  </button>
                  <button
                    className={`flex-1 py-3 rounded-lg font-medium tracking-wide transition-all ${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`}
                    onClick={()=> createPool()}
                  >
                    Create Farm
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEarnProgram;