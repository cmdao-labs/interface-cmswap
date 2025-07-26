'use client'
import React, { useState, useRef } from 'react';
import { ChevronDown, Search, Plus, Calendar, Clock, ArrowRight, Check, Settings, Wallet } from 'lucide-react';
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { config } from '@/app/config'
import { tokens } from '@/app/lib/25925'
import { formatEther, parseEther, createPublicClient, http, erc20Abi } from 'viem'
import Input from '../ui/input';
import { usePrice } from '@/app/context/getPrice';
import { bitkub, jbc, bitkubTestnet } from 'viem/chains';
import { tokens as tokens96, v3FactoryContract as v3FactoryContract96, erc20ABI as erc20ABI96, v3PoolABI as v3PoolABI96, V3_FACTORY as V3_FACTORY96, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt96, positionManagerContract as positionManagerContract96 } from '@/app/lib/96';
import { tokens as tokens8899, v3FactoryContract as v3FactoryContract8899, erc20ABI as erc20ABI8899, v3PoolABI as v3PoolABI8899, V3_FACTORY as V3_FACTORY8899, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt8899, positionManagerContract as positionManagerContract8899 } from '@/app/lib/8899';
import { tokens as tokens25925, v3FactoryContract as v3FactoryContract25925, erc20ABI as erc20ABI25925, v3PoolABI as v3PoolABI25925, V3_FACTORY as V3_FACTORY25925, V3_FACTORYCreatedAt as V3_FACTORYCreatedAt25925, positionManagerContract as positionManagerContract25925 } from '@/app/lib/25925';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from '@/components/ui/button'

import { useAccount } from 'wagmi'

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

const themes: Record<ThemeId, Theme> = {
  25925: {
    primary: "from-green-400 to-emerald-400",
    secondary: "from-green-600 to-emerald-600",
    accent: "green-400",
    glow: "",
    border: "border-green-400/30",
    text: "text-green-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900"
  },
};

const CreateEarnProgram = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
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
  const [selectedPool, setSelectedPool] = React.useState<Pool | null>(null);
  const [selectToken, setSelectToken] = React.useState<string>('');
  const [selectTokenInfo, setSelectTokenInfo] = React.useState<{ name: string, symbol: string, totalSupply: string } | null>(null);
  const [rewardTokenInfo, setRewardTokenInfo] = React.useState<{ name: string, symbol: string, totalSupply: string } | null>(null);
  type ChainKey = keyof typeof chains;
  const [selectedChain, setSelectedChain] = React.useState<ChainKey>('kubtestnet');
  const [rewardToken, setRewardToken] = React.useState('');
  const [rewardTokenSymbol, setRewardTokenSymbol] = React.useState('');
  const [rewardAmount, setRewardAmount] = React.useState('');
  const [duration, setDuration] = React.useState('7');
  const [startDate, setStartDate] = React.useState('');
  const [stakingType, setStakingType] = React.useState<string | null>(null);
  const [poolFees, setPoolFees] = React.useState<string[]>([]);
  const [selectLockOption, setSelectLockOption] = React.useState('');
  const [singleUnlockTime, setSingleUnlockTime] = React.useState("");
  const [multiLocks, setMultiLocks] = React.useState([{ time: "", multiplier: "" }]);
  const [customDuration, setCustomDuration] = React.useState("");
  const [validPools, setValidPools] = React.useState<Pool[]>([]);
  const { priceList } = usePrice();
  const { chainId } = useAccount();
  const [openReward, setOpenReward] = useState(false);
  const [blockNumber, setBlockNumber] = useState(0);
  const [firstRewardBlock, setFirstRewardBlock] = React.useState(0);
  const [endRewardBlock, setEndBlockNumber] = React.useState(0);
  const now = new Date();
  const minDateTimeLocal = now.toISOString().slice(0, 16);
  const [selectedRewardToken, setSelectedRewardToken] = useState<{
    name: string;
    value: `0x${string}`;
    logo: string;
  } | null>(null);

  const rewardTokenRef = React.useRef<HTMLInputElement>(null);
  const rewardAmountRef = React.useRef<HTMLInputElement>(null);
  const unlockRef = React.useRef<HTMLInputElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const customDurationRef = React.useRef<HTMLInputElement>(null);
  const fees = ['100', '500', '3000', '10000'];
  const effectiveDuration = duration === "-" ? customDuration : duration;
  const [searchInput, setSearchInput] = useState("");
  const [maxPoolToken, setMaxPoolToken] = React.useState("");
  const [maxUserToken, setMaxUserToken] = React.useState("");
  type ChainConfig = {
    chain: typeof bitkub | typeof jbc | typeof bitkubTestnet;
    chainId: any;
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
  const selectedChainConfig = chainConfigs[chainId || 96];
  const publicClient = createPublicClient({
    chain: selectedChainConfig.chainId,
    transport: http(selectedChainConfig.rpc),
  });

  const toggleFee = (fee: string) => {
    setPoolFees(prev =>
      prev.includes(fee)
        ? prev.filter(f => f !== fee)
        : [...prev, fee]
    );
  };


  React.useEffect(() => {
    if (!priceList || priceList.length < 2) return;

    const fetchPools = async () => {
      try {
        const logCreateData = await publicClient.getContractEvents({
          ...selectedChainConfig.lib.v3FactoryContract,
          eventName: 'PoolCreated',
          fromBlock: selectedChainConfig.lib.V3_FACTORYCreatedAt,
          toBlock: 'latest',
        });

        const CreateData = logCreateData.map((res: any) => ({
          action: 'create',
          token0: res.args.token0 as '0xstring',
          token1: res.args.token1 as '0xstring',
          fee: res.args.fee as '0xstring',
          pool: res.args.pool as '0xstring',
          tx: res.transactionHash as '0xstring',
        }));

        const results: Pool[] = [];
        const currencyTokens = [tokens[2].value, tokens[1].value, tokens[3].value];
        let isListed = true;

        for (const item of CreateData) {
          isListed = true;
          let tokenA = tokens.find(t => t.value.toLowerCase() === item.token0.toLowerCase());
          let tokenB = tokens.find(t => t.value.toLowerCase() === item.token1.toLowerCase());

          if (!tokenA) {
            isListed = false;
            const [symbolA] = await readContracts(config, {
              contracts: [{
                abi: erc20Abi,
                address: item.token0,
                functionName: 'symbol',
              }],
            });
            tokenA = {
              name: symbolA.result ?? 'UNKNOWN',
              value: item.token0,
              logo: '/default2.png',
            };
          }

          if (!tokenB) {
            isListed = false;
            const [symbolB] = await readContracts(config, {
              contracts: [{
                abi: erc20Abi,
                address: item.token1,
                functionName: 'symbol',
              }],
            });
            tokenB = {
              name: symbolB.result ?? 'UNKNOWN',
              value: item.token1,
              logo: '/default2.png',
            };
          }

          try {
            const poolStatus = await readContracts(config, {
              contracts: [
                { abi: erc20Abi, address: tokenA.value as '0xstring', functionName: 'balanceOf', args: [item.pool] },
                { abi: erc20Abi, address: tokenB.value as '0xstring', functionName: 'balanceOf', args: [item.pool] },
              ],
            });

            let tokenAamount = poolStatus[0].result ?? BigInt(0);
            let tokenBamount = poolStatus[1].result ?? BigInt(0);

            let priceA = priceList.find(p => p.token === tokenA!.name)?.priceUSDT ?? 0;
            let priceB = priceList.find(p => p.token === tokenB!.name)?.priceUSDT ?? 0;
            let balanceA = Number(tokenAamount) / 1e18;
            let balanceB = Number(tokenBamount) / 1e18;

            const liquidityUSD = (balanceA * priceA) + (balanceB * priceB);

            const blockAmountDaily = 86400 / selectedChainConfig.blocktime;
            const currentBlock = await publicClient.getBlockNumber();

            const logBuyData = await publicClient.getContractEvents({
              abi: erc20Abi,
              address: tokenA.value as '0xstring',
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
              address: tokenA.value as '0xstring',
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

            const liquidityTxs = new Set([
              ...addLiquidityData.map((item: any) => item.tx),
              ...removeLiquidityData.map((item: any) => item.tx),
            ]);

            const filteredBuyData = BuyData.filter((item: any) => !liquidityTxs.has(item.tx));
            const filteredSellData = SellData.filter((item: any) => !liquidityTxs.has(item.tx));

            const volumeToken = [...filteredBuyData, ...filteredSellData].reduce((sum, tx) => sum + tx.value, 0);
            const feeRate = Number(item.fee) / 1_000_000;
            const fee24h = volumeToken * feeRate * priceA;
            const apr = ((fee24h * 365) / liquidityUSD) * 100 || 0;

            const a = currencyTokens.indexOf(tokenA.value);
            const b = currencyTokens.indexOf(tokenB.value);

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
  }, [priceList]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(3)} B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(3)} M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(3)} K`;
    return `$${num.toFixed(3)}`;
  };

  // Chain configurations
  const chains = {
    kubtestnet: {
      name: 'kub testnet',
      color: 'rgb(20, 184, 166)', // teal
      accent: 'border-teal-400',
      bg: 'bg-teal-900/20',
      text: 'text-teal-400'
    }
  };
  const currentTheme = chains[selectedChain as ChainKey];

  const stakingTypes = [
    {
      name: 'Token Staking',
      description: 'Stake Tokens or LP Tokens to earn rewards. Suitable for users seeking flexibility in staking options. Supports multiple staking modes: No Lock (withdraw anytime), Fixed Lock (lock tokens for a set period), and Multiple Lock (choose custom lock periods with reward multipliers based on lock duration). Ideal for users who want to maximize returns with tailored lock-in strategies.'
    },
    {
      name: 'Concentrate Liquidity Staking',
      description: 'Stake NFT-based Concentrated Liquidity V3 positions to earn rewards. Supports only No Lock staking, allowing withdrawal at any time. Users can specify token pairs and fee tiers for farming. Perfect for advanced users leveraging concentrated liquidity pools to optimize capital efficiency.'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectToken(value);
    if (value.length === 42) {
      fetchStakedTokenData(value);
    }
  }

  const fetchStakedTokenData = async (tokenAddress: string) => {
    if (!tokenAddress) return;

    try {
      const result = await readContracts(config, {
        contracts: [
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'name' },
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'symbol' },
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'totalSupply' }
        ]
      });

      if (
        result[0]?.status === 'success' &&
        result[1]?.status === 'success' &&
        result[2]?.status === 'success' &&
        result[0].result !== undefined &&
        result[1].result !== undefined &&
        result[2].result !== undefined
      ) {
        setSelectTokenInfo({
          name: String(result[0].result),
          symbol: String(result[1].result),
          totalSupply: formatEther(result[2].result),
        });
      }
    } catch (error) {
      console.error('Error fetching staked token data:', error);
    }
  }

  const fetchRewardTokenData = async (tokenAddress: string) => {
    if (!tokenAddress) return;

    try {
      const result = await readContracts(config, {
        contracts: [
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'name' },
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'symbol' },
          { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'totalSupply' }
        ]
      });

      if (
        result[0]?.status === 'success' &&
        result[1]?.status === 'success' &&
        result[2]?.status === 'success' &&
        result[0].result !== undefined &&
        result[1].result !== undefined &&
        result[2].result !== undefined
      ) {
        setRewardTokenInfo({
          name: String(result[0].result),
          symbol: String(result[1].result),
          totalSupply: formatEther(result[2].result),
        });
      }
    } catch (error) {
      console.error('Error fetching reward token data:', error);
    }
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number
              ? `${currentTheme.accent} ${currentTheme.bg}`
              : 'border-gray-600 bg-gray-800'
            }`}>
            {currentStep > step.number ? (
              <Check className={`w-5 h-5 ${currentTheme.text}`} />
            ) : (
              <span className={`text-sm font-medium ${currentStep >= step.number ? currentTheme.text : 'text-gray-400'
                }`}>
                {step.number}
              </span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? currentTheme.accent : 'bg-gray-600'
              }`} />
          )}
        </div>
      ))}
    </div>
  );

  const ChainSelector = () => (
    <div className="flex gap-2 mb-6">
      {Object.entries(chains).map(([key, chain]) => (
        <button
          key={key}
          onClick={() => setSelectedChain(key as ChainKey)}
          className={`px-4 py-2 rounded-lg border transition-all ${selectedChain === key
              ? `${chain.accent} ${chain.bg} ${chain.text}`
              : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
            }`}
        >
          {chain.name}
        </button>
      ))}
    </div>
  );

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const result = await readContracts(config, {
          contracts: [
            { abi: erc20Abi, address: rewardToken as '0xstring', functionName: 'symbol' }
          ]
        });
        if (result[0]?.status === 'success' && result[0].result !== undefined) {
          setRewardTokenSymbol(result[0].result);
        }
      } catch (error) {
        console.error('Error fetching reward token symbol:', error);
      }
    }
    fetch();
  }, [rewardToken]);

  React.useEffect(() => {
    const fetchCurrentBlock = async () => {
      try {
        const currentBlock = await publicClient.getBlockNumber();
        setBlockNumber(Number(currentBlock));
      } catch (e) {
        console.error(e);
      }
    };

    fetchCurrentBlock();
  }, []);

  const handleStartDateChange = (value: string) => {
    setStartDate(value);

    if (!value) return;

    // แปลง string (YYYY-MM-DDTHH:mm) เป็น timestamp วินาที
    const startTimestamp = Math.floor(new Date(value).getTime() / 1000);

    // ดึงเวลาบล็อกล่าสุดพร้อมเลขบล็อก
    publicClient.getBlockNumber().then(currentBlock => {
      publicClient.getBlock({ blockNumber: currentBlock }).then(block => {
        const currentTimestamp = Number(block.timestamp);

        // คำนวณเวลาที่เหลือเป็นวินาที
        const secondsUntilStart = startTimestamp - currentTimestamp;

        // ถ้าวันที่เริ่มก่อนเวลาปัจจุบัน ให้ถือว่าเริ่มที่บล็อกปัจจุบันเลย
        if (secondsUntilStart <= 0) {
          setFirstRewardBlock(Number(currentBlock));
          return;
        }

        // คำนวณจำนวนบล็อกที่เหลือ
        const blocksUntilStart = Math.ceil(secondsUntilStart / selectedChainConfig.blocktime);

        // บล็อกเริ่ม = บล็อกปัจจุบัน + บล็อกที่เหลือ
        const estimatedStartBlock = Number(currentBlock) + blocksUntilStart;

        setFirstRewardBlock(estimatedStartBlock);
      });
    });
  };

  React.useEffect(() => {
    if (!startDate || !effectiveDuration || !selectedChainConfig?.blocktime) {
      setEndBlockNumber(0); // หรือ "" แล้วแต่ type state
      return;
    }

    const startTimestamp = new Date(startDate).getTime() / 1000;

    const durationSeconds = Number(effectiveDuration) * 24 * 60 * 60;

    const endTimestamp = startTimestamp + durationSeconds;

    if (!firstRewardBlock) {
      setEndBlockNumber(0);
      return;
    }

    // หาค่า block ที่คาดว่าจะถึง ณ endTimestamp
    // จำนวนวินาทีจาก startDate ถึง endTimestamp หารด้วย blocktime = จำนวนบล็อกที่เพิ่มขึ้น
    const blocksElapsed = Math.floor(durationSeconds / selectedChainConfig.blocktime);

    const estimatedEndBlock = Number(firstRewardBlock) + blocksElapsed;

    setEndBlockNumber(estimatedEndBlock);
  }, [startDate, effectiveDuration, selectedChainConfig.blocktime, firstRewardBlock]);

  const steps = [
    { number: 1, title: 'Select Staking Type', description: 'Choose staking program type' },
    { number: 2, title: 'Select Pool', description: 'Choose a liquidity pool' },
    { number: 3, title: 'Add Reward', description: 'Set rewards and period' },
    { number: 4, title: 'Review', description: 'Confirm farm details' }
  ];

  const SelectStakingTypeStep = () => (
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
            className={`p-4 border rounded-lg cursor-pointer transition-all ${stakingType === type.name
                ? `${currentTheme.accent} ${currentTheme.bg}`
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">{type.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{type.description}</p>
              </div>
              {stakingType === type.name && (
                <Check className={`w-5 h-5 ${currentTheme.text}`} />
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => stakingType && setCurrentStep(2)}
        disabled={!stakingType}
        className={`w-full py-3 rounded-lg font-medium transition-all ${stakingType
            ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
      >
        Continue
      </button>
    </div>
  );

  const SelectPoolStep = () => (
    stakingType === 'Token Staking' ? (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Select Staked Token</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={selectToken}
            onChange={handleSearchChange}
            placeholder="Stake Token Address"
            icon={Search}
            label="Stake Token"
          />
        </div>

        <div className="space-y-3">
          {tokens.map((token) => (
            token.value.length === 42 && (
              <div
                key={token.value}
                onClick={() => {
                  setSelectToken(token.value);
                  fetchStakedTokenData(token.value);
                }}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectToken === token.value
                    ? `${currentTheme.accent} ${currentTheme.bg}`
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
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
            )
          ))}
        </div>
        <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
          <h3 className={`font-medium ${currentTheme.text} mb-3`}>Your Staked Token Information</h3>
          <div className="grid grid-span gap-4 text-sm">
            <div>
              <span className="text-gray-400">Token Name:</span>
              <span className="text-white ml-2">{selectTokenInfo?.name ? selectTokenInfo.name : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Supply:</span>
              <span className="text-white ml-2">{selectTokenInfo?.totalSupply ? parseFloat(selectTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Symbol:</span>
              <span className="text-white ml-2">{selectTokenInfo?.symbol ? selectTokenInfo.symbol : 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => selectToken && setCurrentStep(3)}
            disabled={!selectToken}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectToken
                ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    ) : (
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
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="space-y-3">
          {validPools.map((pool) => (
            <div
              key={pool.id}
              onClick={() => setSelectedPool(pool)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedPool?.id === pool.id
                  ? `${currentTheme.accent} ${currentTheme.bg}`
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
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
                    <p className="text-sm text-gray-400">Fee: {(pool.fee / 10000)}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-400">APR: <span className={currentTheme.text}>{pool.apr}</span></span>
                    <span className="text-gray-400">TVL: <span className="text-white">{pool.tvl}</span></span>
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
            <p className="text-sm text-gray-400">
              Please select one or more acceptable fee tiers for this program.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {fees.map((fee) => {
              const selected = poolFees.includes(fee);
              return (
                <button
                  key={fee}
                  onClick={() => toggleFee(fee)}
                  className={`
                    px-4 py-2 rounded-full border text-sm transition
                    ${selected
                      ? `${currentTheme.bg} ${currentTheme.text} ring-2 ring-offset-1 ring-primary`
                      : `bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300`}
                  `}
                >
                  {Number(fee) / 10000}%
                </button>
              );
            })}
          </div>

          <p className="text-sm text-gray-400">
            Selected {poolFees.length} fee tier{poolFees.length !== 1 && 's'}.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => selectedPool && setCurrentStep(3)}
            disabled={!selectedPool}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectedPool
                ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    )
  );

  const AddRewardStep = () => {
    const commandInputRef = React.useRef<HTMLInputElement>(null); // Add ref for CommandInput

    // Effect to restore focus after searchInput updates
    React.useEffect(() => {
      if (openReward && commandInputRef.current) {
        commandInputRef.current.focus();
      }
    }, [searchInput, openReward]);

    return (
      stakingType === 'Token Staking' ? (
      <div className="space-y-6">
  {/* Section: Title and Description */}
  <div>
    <h2 className="text-2xl font-bold text-white mb-2">Add Reward</h2>
    <p className="text-gray-400">Configure reward token and farming period</p>
  </div>

  {/* Section: Reward Token Selection */}
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">Reward Token</label>
    <Popover open={openReward} onOpenChange={setOpenReward}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openReward}
          className="w-full bg-gray-800 text-white border border-gray-600 h-10 justify-between"
        >
          <div className="gap-2 flex items-center">
            {selectedRewardToken?.logo ? (
              <img alt="" src={selectedRewardToken.logo} className="w-5 h-5 rounded-full" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">?</div>
            )}
            <span className="truncate">{selectedRewardToken?.name || "Select reward token"}</span>
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
                      setSelectedRewardToken({
                        name: searchInput,
                        value: searchInput as '0xstring',
                        logo: "/default2.png"
                      });
                      fetchRewardTokenData(searchInput);
                      setOpenReward(false);
                    } else {
                      alert("Invalid token address.");
                    }
                  }}
                  className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                >
                  + Add Token
                </button>
              </div>
            </CommandEmpty>

            <CommandGroup>
              {tokens
                .filter(token => token.value?.length === 42)
                .map((token) => (
                  <CommandItem
                    key={token.value}
                    value={token.name}
                    onSelect={() => {
                      setRewardToken(token.value);
                      setSelectedRewardToken(token);
                      setOpenReward(false);
                      fetchRewardTokenData(token.value);
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
          <span className="text-white ml-2">{rewardTokenInfo?.totalSupply ? parseFloat(rewardTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}</span>
        </div>
        <div>
          <span className="text-gray-400">Token Symbol:</span>
          <span className="text-white ml-2">{rewardTokenInfo?.symbol ?? 'N/A'}</span>
        </div>
      </div>
    </div>
  </div>

  {/* Section: Total Reward Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">Total Reward Amount (Ether)</label>
    <input
      ref={rewardAmountRef}
      type="number"
      placeholder="0.00"
      value={rewardAmount}
      onChange={(e) => setRewardAmount(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
    />
  </div>

  {/* Section: Lock Options */}
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">Lock Options</label>
    <div className="space-y-3">
      {/* No Lock */}
      <div
        className={`p-4 rounded-lg border cursor-pointer ${selectLockOption === '0' ? currentTheme.bg : 'bg-gray-800'}`}
        onClick={() => setSelectLockOption('0')}
      >
        <div className="font-medium text-white">No Lock</div>
        <p className="text-sm text-gray-400">Users can withdraw staked tokens at any time.</p>
      </div>

      {/* Single Lock Time */}
      <div
        className={`p-4 rounded-lg border cursor-pointer ${selectLockOption === '1' ? currentTheme.bg : 'bg-gray-800'}`}
        onClick={() => setSelectLockOption('1')}
      >
        <div className="font-medium text-white">Single Lock Time</div>
        <p className="text-sm text-gray-400">Users can withdraw their staked tokens only after the unlock time set by the creator.</p>
      </div>

      {/* Multiple Lock Time */}
      <div
        className={`p-4 rounded-lg border cursor-pointer ${selectLockOption === '2' ? currentTheme.bg : 'bg-gray-800'}`}
        onClick={() => setSelectLockOption('2')}
      >
        <div className="font-medium text-white">Multiple Lock Time</div>
        <p className="text-sm text-gray-400">
          Users can choose from multiple lock durations predefined by the creator. The creator can assign different reward multipliers based on the selected duration.
        </p>
      </div>
    </div>

    {/* Single Unlock Time Input */}
    {selectLockOption === "1" && (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Unlock Time (seconds)</label>
        <input
          type="number"
          ref={unlockRef}
          placeholder="Enter unlock time (in seconds)"
          className="w-full p-2 rounded-md border bg-gray-800 text-white"
          value={singleUnlockTime}
          onChange={(e) => setSingleUnlockTime(e.target.value)}
        />
      </div>
    )}

    {/* Multiple Lock Options */}
    {selectLockOption === "2" && (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-white">Multiple Lock Options</label>
        {multiLocks.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-800/30 p-4 rounded-lg border"
          >
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-white mb-1">Unlock Time (seconds)</label>
              <input
                type="number"
                placeholder="e.g., 3600"
                className="w-full p-2 rounded-md border bg-gray-800 text-white"
                value={item.time}
                onChange={(e) => {
                  const updated = [...multiLocks];
                  updated[index].time = e.target.value;
                  setMultiLocks(updated);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-white mb-1">Power Multiplier (%)</label>
              <input
                type="number"
                placeholder="e.g., 80 or 120"
                className="w-full p-2 rounded-md border bg-gray-800 text-white"
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
              onClick={() => {
                const updated = multiLocks.filter((_, i) => i !== index);
                setMultiLocks(updated);
              }}
            >
              🗑 Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-700 hover:text-white"
          onClick={() => setMultiLocks([...multiLocks, { time: "", multiplier: "" }])}
        >
          + Add
        </button>
      </div>
    )}
  </div>

  {/* Section: Reward Duration and Dates */}
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">Reward Duration (Days)</label>
    <select
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
    >
      <option value="7">7 Days</option>
      <option value="14">14 Days</option>
      <option value="30">30 Days</option>
      <option value="90">90 Days</option>
      <option value="365">365 Days</option>
      <option value="-">Custom Days</option>
    </select>

    {duration === "-" && (
      <input
        type="number"
        min={1}
        placeholder="Enter custom days"
        value={customDuration}
        ref={customDurationRef}
        onChange={(e) => setCustomDuration(e.target.value)}
        className="mt-2 w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
      />
    )}

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
      <input
        type="datetime-local"
        value={startDate}
        min={minDateTimeLocal}
        onChange={(e) => handleStartDateChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
      />
    </div>

    <div className="text-gray-400 text-sm">Selected duration: {effectiveDuration} days</div>

    <p className="mt-2">Current Block Number : {blockNumber}</p>
    <p className="mt-2">Estimated First Block Number: {firstRewardBlock}</p>
    <p className="mt-2">Estimated End Block Number: {endRewardBlock}</p>
  </div>

  {/* Section: Maximum Staked Tokens */}
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Pool Staked Token (Ether)</label>
    <input
      type="number"
      placeholder="0.00"
      value={maxPoolToken}
      onChange={(e) => setMaxPoolToken(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
    />

    <label className="block text-sm font-medium text-gray-300 mb-2 mt-4">Maximum Staked Token Per User (Ether)</label>
    <input
      type="number"
      placeholder="0.00"
      value={maxUserToken}
      onChange={(e) => setMaxUserToken(e.target.value)}  // แก้ไขให้ถูก state
      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
    />
  </div>

  {/* Section: Reward Summary */}
  <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
    <h3 className={`font-medium ${currentTheme.text} mb-2`}>Reward Summary</h3>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Daily Reward Rate:</span>
        <span className="text-white">
          {rewardAmount &&
           effectiveDuration &&
           !isNaN(parseFloat(rewardAmount)) &&
           !isNaN(parseInt(effectiveDuration))
            ? (parseFloat(rewardAmount) / parseInt(effectiveDuration)).toFixed(2)
            : '0.00'}{' '}
          {rewardTokenSymbol || 'tokens'}/day
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Total Duration:</span>
        <span className="text-white">{duration !== '-' ? duration : customDuration || 0} days</span>
      </div>
    </div>
  </div>

  {/* Section: Navigation Buttons */}
  <div className="flex gap-3">
    <button
      onClick={() => setCurrentStep(2)}
      className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
    >
      Back
    </button>
    <button
      onClick={() => setCurrentStep(4)}
      disabled={!rewardToken || !rewardAmount || !startDate}
      className={`flex-1 py-3 rounded-lg font-medium transition-all ${
        rewardToken && rewardAmount && startDate
          ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
      }`}
    >
      Continue
    </button>
  </div>
</div>

      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Add Reward</h2>
            <p className="text-gray-400">Configure reward token and farming period</p>
          </div>

          <div className="grid grid-span gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reward Token</label>
                <Popover open={openReward} onOpenChange={setOpenReward}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openReward}
                      className="w-full bg-gray-800 text-white border border-gray-600 h-10 justify-between"
                    >
                      <div className="gap-2 flex flex-row items-center justify-start">
                        {selectedRewardToken?.logo ? (
                          <img alt="" src={selectedRewardToken.logo} className="w-5 h-5 rounded-full" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                            ?
                          </div>
                        )}
                        <span className="truncate">{selectedRewardToken?.name || "Select reward token"}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0 z-50">
                    <Command>
                      <CommandInput
                        ref={commandInputRef} // Attach ref to CommandInput
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
                                  setSelectedRewardToken({
                                    name: searchInput,
                                    value: searchInput as '0xstring',
                                    logo: "/default2.png"
                                  });
                                  fetchRewardTokenData(searchInput);
                                  setOpenReward(false);
                                } else {
                                  alert("Invalid token address.");
                                }
                              }}
                              className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                            >
                              + Add Token
                            </button>
                          </div>
                        </CommandEmpty>

                        <CommandGroup>
                          {tokens
                            .filter(token => token.value?.length === 42)
                            .map((token) => (
                              <CommandItem
                                key={token.value}
                                value={token.name}
                                onSelect={() => {
                                  setRewardToken(token.value);
                                  setSelectedRewardToken(token);
                                  setOpenReward(false);
                                  fetchRewardTokenData(token.value);
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
                <div className="grid grid-span gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Token Name:</span>
                    <span className="text-white ml-2">{rewardTokenInfo?.name ? rewardTokenInfo.name : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Token Supply:</span>
                    <span className="text-white ml-2">{rewardTokenInfo?.totalSupply ? parseFloat(rewardTokenInfo.totalSupply).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Token Symbol:</span>
                    <span className="text-white ml-2">{rewardTokenInfo?.symbol ? rewardTokenInfo.symbol : 'N/A'}</span>
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
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Program Duration (Days)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
                >
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                  <option value="365">365 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  min={minDateTimeLocal}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="text-gray-400 text-sm">
                Selected duration: {effectiveDuration} days
              </div>


              <p className='mt-2'>Current Block Number : {blockNumber}</p>
              <p className='mt-2'>Estimated First Block Number: {firstRewardBlock}</p>
              <p className='mt-2'>Estimated End Block Number: {endRewardBlock}</p>

            </div>
          </div>

          <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
            <h3 className={`font-medium ${currentTheme.text} mb-2`}>Reward Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Reward Rate:</span>
                <span className="text-white">{rewardAmount && duration ? (parseFloat(rewardAmount) / parseInt(duration)).toFixed(2) : '0.00'} {rewardTokenSymbol ? rewardTokenSymbol : 'tokens'}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Duration:</span>
                <span className="text-white">{duration} days</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              disabled={!rewardToken || !rewardAmount || !startDate}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${rewardToken && rewardAmount && startDate
                  ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
              Continue
            </button>
          </div>
        </div>
      )
    );
  };

  const ReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Review Farm Details</h2>
        <p className="text-gray-400">Confirm your farming program configuration</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="font-medium text-white mb-3">Program Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Staking Type:</span>
              <span className="text-white ml-2">{stakingType}</span>
            </div>
            <div>
              <span className="text-gray-400">Chain:</span>
              <span className="text-white ml-2">{currentTheme.name}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="font-medium text-white mb-3">Pool Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Pool:</span>
              <span className="text-white ml-2">{selectedPool?.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Current APR:</span>
              <span className={`ml-2 ${currentTheme.text}`}>{selectedPool?.apr}</span>
            </div>
            <div>
              <span className="text-gray-400">TVL:</span>
              <span className="text-white ml-2">{selectedPool?.tvl}</span>
            </div>
            <div>
              <span className="text-gray-400">Fee:</span>
              <span className="text-white ml-2">{poolFees}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="font-medium text-white mb-3">Reward Configuration</h3>
          <div className="grid grid-span-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Reward Token:</span>
              <span className="text-white ml-2">{rewardToken}</span>
            </div>
            <div>
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-white ml-2">{rewardAmount}</span>
            </div>
            <div>
              <span className="text-gray-400">Duration:</span>
              <span className="text-white ml-2">{duration} days</span>
            </div>
            <div>
              <span className="text-gray-400">Start Date:</span>
              <span className="text-white ml-2">{startDate}</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}>
          <h3 className={`font-medium ${currentTheme.text} mb-3`}>Estimated Metrics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Daily Reward Rate:</span>
              <span className="text-white ml-2">{(parseFloat(rewardAmount) / parseInt(duration)).toFixed(2)} {rewardTokenSymbol ? rewardTokenSymbol : 'tokens'}/day</span>
            </div>
            <div>
              <span className="text-gray-400">Estimated APR Boost:</span>
              <span className={`ml-2 ${currentTheme.text}`}>+{((parseFloat(rewardAmount) / parseInt(duration)) * 365 / 100000 * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(3)}
          className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`}
        >
          Create Farm
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectStakingTypeStep />;
      case 2:
        return <SelectPoolStep />;
      case 3:
        return <AddRewardStep />;
      case 4:
        return <ReviewStep />;
      default:
        return <SelectStakingTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto w-full mt-[120px]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Earn Program</h1>
            <p className="text-gray-400">Set up farming rewards for liquidity providers</p>
          </div>

          <ChainSelector />
          <StepIndicator />

          <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEarnProgram;