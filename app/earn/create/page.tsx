"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
  readContract,
  readContracts,
  type WriteContractErrorType,
} from "@wagmi/core";
import { config } from "@/config/reown";
import ErrorModal from "@/components/cmswap/error-modal";
import { chains as chainData } from "@/lib/chains";
import {
  formatEther,
  parseEther,
  createPublicClient,
  http,
  erc20Abi,
} from "viem";
import { usePrice } from "@/context/getPrice";
import { bitkub, jbc, bitkubTestnet } from "viem/chains";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { UniswapV2PairABI } from "@/app/earn/abi/UniswapV2Pair";
import { intervalToDuration } from "date-fns";
import DateTimePicker from "@/components/cmswap/DateSelector";
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
  tokens: readonly { name: string; value: string; logo: string }[];
  lib: any;
};

const themes: Record<ThemeId, Theme> = {
  25925: {
    primary: "from-green-400 to-emerald-400",
    secondary: "from-green-600 to-emerald-600",
    accent: "green-400",
    glow: "",
    border: "border-green-400/30",
    text: "text-green-300",
    bg: "bg-gradient-to-br from-slate-700 via-black to-emerald-900",
  },
};

const chains = {
  kubtestnet: {
    name: "KUB Testnet",
    color: "rgb(20, 184, 166)",
    accent: "border-green-500",
    bg: "bg-teal-900/20",
    text: "text-green-400",
    border: "border-green-400/30 ",
    hover: "hover:border-green-400/40",
  },
};

const chainConfigs: Record<number, ChainConfig> = {
  96: {
    chain: chainData[96].chain,
    chainId: 96,
    explorer: "https://www.kubscan.com/",
    rpc: "",
    blocktime: 5,
    tokens: [...chainData[96].tokens],
    lib: {
      v3FactoryContract: chainData[96].v3FactoryContract,
      erc20ABI: chainData[96].erc20ABI,
      v3PoolABI: chainData[96].v3PoolABI,
      V3_FACTORY: chainData[96].V3_FACTORY,
      V3_FACTORYCreatedAt: chainData[96].V3_FACTORYCreatedAt,
      positionManagerContract: chainData[96].positionManagerContract,
    },
  },
  8899: {
    chain: chainData[8899].chain,
    chainId: 8899,
    explorer: "https://exp.jibchain.net/",
    rpc: "https://rpc-l1.jbc.xpool.pw",
    blocktime: 12,
    tokens: [...chainData[8899].tokens],
    lib: {
      v3FactoryContract: chainData[8899].v3FactoryContract,
      erc20ABI: chainData[8899].erc20ABI,
      v3PoolABI: chainData[8899].v3PoolABI,
      V3_FACTORY: chainData[8899].V3_FACTORY,
      V3_FACTORYCreatedAt: chainData[8899].V3_FACTORYCreatedAt,
      positionManagerContract: chainData[8899].positionManagerContract,
    },
  },
  25925: {
    chain: chainData[25925].chain,
    chainId: 25925,
    explorer: "https://testnet.kubscan.com/",
    rpc: "https://rpc-testnet.bitkubchain.io",
    blocktime: 5,
    tokens: [...chainData[25925].tokens],
    lib: {
      erc20ABI: chainData[25925].erc20ABI,
      v3PoolABI: chainData[25925].v3PoolABI,
      V3_FACTORY: chainData[25925].V3_FACTORY,
      V3_FACTORYCreatedAt: chainData[25925].V3_FACTORYCreatedAt,
      positionManagerContract: chainData[25925].positionManagerContract,
      positionManagerAddr: chainData[25925].POSITION_MANAGER,
      v3FactoryContract: chainData[25925].v3FactoryContract,
      StakingFactoryV2Contract: chainData[25925].StakingFactoryV2Contract,
      StakingFactoryV2_Addr: chainData[25925].StakingFactoryV2,
      StakingFactoryV3Contract: chainData[25925].StakingFactoryV3Contract,
      StakingFactoryV3_Addr: chainData[25925].StakingFactoryV3,
    },
  },
};

const CreateEarnProgram = () => {
  const ENABLED_STAKING_TYPES = new Set<string>([
    "Concentrate Liquidity Staking",
    // "Token Staking",
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [selectedFee, setSelectedFee] = useState<string | null>(null);
  const [selectToken, setSelectToken] = useState("");
  const [selectTokenInfo, setSelectTokenInfo] = useState<{
    name: string;
    symbol: string;
    totalSupply: string;
  } | null>(null);
  const [rewardTokenInfo, setRewardTokenInfo] = useState<{
    name: string;
    symbol: string;
    totalSupply: string;
  } | null>(null);
  const [selectedChain, setSelectedChain] = useState<ChainKey>("kubtestnet");
  const [rewardToken, setRewardToken] = useState("");
  const [rewardTokenSymbol, setRewardTokenSymbol] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [duration, setDuration] = useState("120960");
  const [startDate, setStartDate] = useState<{
    timestamp: number;
    formatted: string;
  } | null>(null);
  const [stakingType, setStakingType] = useState<string | null>(null);
  const [poolFees, setPoolFees] = useState<string[]>([]);
  const [selectLockOption, setSelectLockOption] = useState("");
  const [singleUnlockTime, setSingleUnlockTime] = useState("17280");
  const [multiLocks, setMultiLocks] = useState([
    { time: "17280", multiplier: "100" },
  ]);
  const [customDuration, setCustomDuration] = useState("");
  const [validPools, setValidPools] = useState<Pool[]>([]);
  const [openReward, setOpenReward] = useState(false);
  const [blocks, setBlocks] = useState<
    { blockNumber: number; blockTimestamp: number }[]
  >([]);

  const [firstRewardBlock, setFirstRewardBlock] = useState(0);
  const [endRewardBlock, setEndBlockNumber] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [maxPoolToken, setMaxPoolToken] = useState("");
  const [maxUserToken, setMaxUserToken] = useState("");
  const [avgBlockTime, setAverageTime] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState("");
  const [errMsg, setErrMsg] = useState<WriteContractErrorType | null>(null);
  const [showTxModal, setShowTxModal] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'approving' | 'creating' | 'completed' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');

  const { priceList } = usePrice();
  const { chainId, address } = useAccount();
  const rewardAmountRef = useRef<HTMLInputElement>(null);
  const unlockRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const customDurationRef = useRef<HTMLInputElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const fees = ["100", "500", "3000", "10000"];
  const effectiveDuration = duration === "-" ? customDuration : duration;

  const selectedChainConfig = chainConfigs[chainId || 96];
  const { chain, rpc, blocktime, tokens, lib } = selectedChainConfig;
  const publicClient = createPublicClient({
    chain: selectedChainConfig.chain,
    transport: http(selectedChainConfig.rpc),
  });

  const currentTheme = chains[selectedChain];
  const stakingTypes = [
    {
      name: "Token Staking",
      description:
        "Stake Tokens or LP Tokens to earn rewards. Suitable for users seeking flexibility in staking options. Supports multiple staking modes: No Lock (withdraw anytime), Fixed Lock (lock tokens for a set period), and Multiple Lock (choose custom lock periods with reward multipliers based on lock duration). Ideal for users who want to maximize returns with tailored lock-in strategies.",
    },
    {
      name: "Concentrate Liquidity Staking",
      description:
        "Stake NFT-based Concentrated Liquidity V3 positions to earn rewards. Supports only No Lock staking, allowing withdrawal at any time. Users can specify token pairs and fee tiers for farming. Perfect for advanced users leveraging concentrated liquidity pools to optimize capital efficiency.",
    },
  ];

  useEffect(() => {
    if (stakingType && !ENABLED_STAKING_TYPES.has(stakingType)) {
      setStakingType(null);
      setCurrentStep(1);
    }
  }, [stakingType]);

  const toggleFee = (fee: string) => {
    setPoolFees((prev) =>
      prev.includes(fee) ? prev.filter((f) => f !== fee) : [...prev, fee]
    );
  };

  useEffect(() => {
    console.log("select : ", selectedPool);
    console.log("fees: ", poolFees);
  }, [selectedPool, poolFees]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(3)} B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(3)} M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(3)} K`;
    return `$${num.toFixed(3)}`;
  };

  const fetchTokenData = async (
    tokenAddress: string,
    setInfo: (
      info: { name: string; symbol: string; totalSupply: string } | null
    ) => void
  ) => {
    if (!tokenAddress) return;

    try {
      // เรียกข้อมูล name, symbol, totalSupply ก่อน
      const basicResult = await readContracts(config, {
        contracts: [
          {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "name",
          },
          {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "symbol",
          },
          {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "totalSupply",
          },
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
        console.error(
          `Unexpected undefined value in basicResult for ${tokenAddress}`
        );
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
            {
              abi: UniswapV2PairABI,
              address: tokenAddress as `0x${string}`,
              functionName: "token0",
            },
            {
              abi: UniswapV2PairABI,
              address: tokenAddress as `0x${string}`,
              functionName: "token1",
            },
          ],
        });

        if (
          lpResult[0].status === "success" &&
          lpResult[1].status === "success" &&
          lpResult[0].result &&
          lpResult[1].result
        ) {
          const [token0Addr, token1Addr] = [
            lpResult[0].result as string,
            lpResult[1].result as string,
          ];

          // เรียก symbol ของ token0 และ token1
          const tokenSymbols = await readContracts(config, {
            contracts: [
              {
                abi: erc20Abi,
                address: token0Addr as `0x${string}`,
                functionName: "symbol",
              },
              {
                abi: erc20Abi,
                address: token1Addr as `0x${string}`,
                functionName: "symbol",
              },
            ],
          });

          if (
            tokenSymbols[0].status === "success" &&
            tokenSymbols[1].status === "success" &&
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
      } catch (e) {
        setErrMsg(e as WriteContractErrorType);

        // ถ้าเรียก token0/token1 ไม่ได้ แสดงว่าไม่ใช่ LP Token
      }

      // ถ้าไม่ใช่ LP Token ก็แสดงข้อมูลปกติ
      setInfo({
        name,
        symbol,
        totalSupply,
      });
      } catch (e) {
      setErrMsg(e as WriteContractErrorType);
      setInfo(null);
    }
  };

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const logCreateData = await publicClient.getContractEvents({
          ...lib.v3FactoryContract,
          eventName: "PoolCreated",
          fromBlock: lib.V3_FACTORYCreatedAt,
          toBlock: "latest",
        });

        const createData = logCreateData.map((res: any) => ({
          action: "create",
          token0: res.args.token0 as `0x${string}`,
          token1: res.args.token1 as `0x${string}`,
          fee: res.args.fee as `0x${string}`,
          pool: res.args.pool as `0x${string}`,
          tx: res.transactionHash as `0x${string}`,
        }));

        const results: Pool[] = [];
        for (const item of createData) {
          let isListed = true;
          let tokenA = tokens.find(
            (t) => t.value.toLowerCase() === item.token0.toLowerCase()
          );
          let tokenB = tokens.find(
            (t) => t.value.toLowerCase() === item.token1.toLowerCase()
          );

          if (!tokenA) {
            isListed = false;
            const [symbolA] = await readContracts(config, {
              contracts: [
                { abi: erc20Abi, address: item.token0, functionName: "symbol" },
              ],
            });
            tokenA = {
              name: symbolA.result ?? "UNKNOWN",
              value: item.token0 as "0xstring",
              logo: "/default2.png",
            };
          }

          if (!tokenB) {
            isListed = false;
            const [symbolB] = await readContracts(config, {
              contracts: [
                { abi: erc20Abi, address: item.token1, functionName: "symbol" },
              ],
            });
            tokenB = {
              name: symbolB.result ?? "UNKNOWN",
              value: item.token1 as "0xstring",
              logo: "/default2.png",
            };
          }
          // Normalize pair name for grouping; keep all fee tiers
          const [n0, n1] = [tokenA.name, tokenB.name].sort();
          results.push({
            id: `${n0}-${n1}-${item.fee}`,
            name: `${n0}/${n1}`,
            apr: "-",
            tvl: "-",
            volume: "-",
            tokenA: tokenA.value,
            tokenB: tokenB.value,
            fee: Number(item.fee),
            poolAddress: item.pool,
            listed: isListed,
          });
        }

        setValidPools(results);
      } catch (e) {
        setErrMsg(e as WriteContractErrorType);
      }
    };

    fetchPools();
  }, [selectedChainConfig]);

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
        setAverageTime(averageTime);
        console.log(`Last 100 Blocks Time avg is ${averageTime}`);
        return averageTime;
      } catch (e) {
        setErrMsg(e as WriteContractErrorType);
        return null;
      }
    };
    getAverageBlockTime();
  }, [chainId]);

  const convertBlocksToTimeString = (
    blocks: number,
    avgBlockTime: number
  ): string => {
    if (blocks <= 0 || avgBlockTime <= 0) return "0 seconds";

    const totalSeconds = blocks * avgBlockTime;

    const duration = intervalToDuration({
      start: 0,
      end: totalSeconds * 1000,
    });

    const { years, months, days, hours, minutes, seconds } = duration;

    const parts: string[] = [];

    if (years) parts.push(years === 1 ? "1 year" : `${years} years`);
    if (months) parts.push(months === 1 ? "1 month" : `${months} months`);
    if (days) parts.push(days === 1 ? "1 day" : `${days} days`);
    if (hours) parts.push(hours === 1 ? "1 hour" : `${hours} hours`);
    if (minutes) parts.push(minutes === 1 ? "1 minute" : `${minutes} minutes`);
    if (seconds) parts.push(seconds === 1 ? "1 second" : `${seconds} seconds`);

    if (parts.length === 0) return "0 seconds";
    if (parts.length === 1) return parts[0];

    const last = parts.pop();
    return parts.join(", ") + " and " + last;
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
    if (!rewardAmount || !effectiveDuration || avgBlockTime <= 0) return "0.00";

    const totalDays = (Number(effectiveDuration) * avgBlockTime) / 86400;
    const rate = Number(rewardAmount) / totalDays;

    return rate.toFixed(2);
  };

  useEffect(() => {
    async function fetchCurrentBlock() {
      try {
        const block = await publicClient.getBlock();
        if (!block) return;
        setBlocks((prev) => [
          {
            blockNumber: Number(block.number),
            blockTimestamp: Number(block.timestamp),
          },
          ...prev,
        ]);
      } catch (e) {
        setErrMsg(e as WriteContractErrorType);
      }
    }

    fetchCurrentBlock();
  }, [publicClient]);

  useEffect(() => {
    if (rewardToken) {
      fetchTokenData(rewardToken, setRewardTokenInfo);
      readContracts(config, {
        contracts: [
          {
            abi: erc20Abi,
            address: rewardToken as `0x${string}`,
            functionName: "symbol",
          },
        ],
      })
        .then(([result]) => {
          if (result?.status === "success" && result.result !== undefined) {
            setRewardTokenSymbol(result.result);
          }
        })
        .catch((e) => setErrMsg(e as WriteContractErrorType));
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
    const blocksElapsed = Math.floor(
      durationSeconds / selectedChainConfig.blocktime
    );
    setEndBlockNumber(firstRewardBlock + blocksElapsed);
  }, [
    startDate,
    effectiveDuration,
    selectedChainConfig.blocktime,
    firstRewardBlock,
  ]);

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
    let diff = startTimestamp / 1000 - currentBlockTimestamp;
    /*     console.log("Diff : ", diff)
    console.log("Blocks : ", diff / avgBlockTime) */

    let estimatedBlock = Math.round(currentBlockNumber + diff / avgBlockTime);

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
      setShowTxModal(true);
      setTxStatus('idle');
      setTxHash('');

      if (stakingType === "Token Staking") {
        // allowanace
        const allowance = await readContract(config, {
          abi: erc20Abi,
          address: rewardToken as `0x${string}`,
          functionName: "allowance",
          args: [address as `0x${string}`, lib.StakingFactoryV2_Addr],
        });

        if (allowance < parseEther(rewardAmount)) {
          setTxStatus('approving');
          const { request } = await simulateContract(config, {
            abi: erc20Abi,
            address: rewardToken as `0x${string}`,
            functionName: "approve",
            args: [lib.StakingFactoryV2_Addr, parseEther(rewardAmount)],
          });
          const h = await writeContract(config, request);
          setTxHash(h);
          await waitForTransactionReceipt(config, { hash: h });
        }

        const programName =
          selectLockOption === "1"
            ? `Fixable Lock ${selectTokenInfo?.name} earn ${rewardTokenInfo?.name}`
            : selectLockOption === "2"
            ? `Multiple Lock ${selectTokenInfo?.name} earn ${rewardTokenInfo?.name}`
            : `Staking ${selectTokenInfo?.name} earn ${rewardTokenInfo?.name}`;

        // create
        setTxStatus('creating');
        const multiLocksTime = multiLocks.map((lock) => BigInt(lock.time));
        const multiLocksPower = multiLocks.map((lock) =>
          BigInt(lock.multiplier)
        );

        const { request } = await simulateContract(config, {
          ...lib.StakingFactoryV2Contract,
          functionName: "createProject",
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
                selectLockOption === "1"
                  ? [BigInt(singleUnlockTime)]
                  : selectLockOption === "2"
                  ? multiLocksTime
                  : [],
              powerMultipliers: selectLockOption === "2" ? multiLocksPower : [],
              projectOwner: address as `0x${string}`,
              startBlockReward: BigInt(estimatedStartBlock),
              endBlockReward: BigInt(
                Number(estimatedStartBlock) + Number(effectiveDuration)
              ),
              userLockMaximum: parseEther(maxUserToken),
              poolLockMaximum: parseEther(maxPoolToken),
            },
          ],
        });

        const h = await writeContract(config, request);
        setTxHash(h);
        await waitForTransactionReceipt(config, { hash: h });
        setTxStatus('completed');
      } else if (stakingType === "Concentrate Liquidity Staking") {
        // allowanace
        const allowance = await readContract(config, {
          abi: erc20Abi,
          address: rewardToken as `0x${string}`,
          functionName: "allowance",
          args: [address as `0x${string}`, lib.StakingFactoryV3_Addr],
        });

        if (allowance < parseEther(rewardAmount)) {
          setTxStatus('approving');
          const { request } = await simulateContract(config, {
            abi: erc20Abi,
            address: rewardToken as `0x${string}`,
            functionName: "approve",
            args: [lib.StakingFactoryV3_Addr, parseEther(rewardAmount)],
          });
          const h = await writeContract(config, request);
          setTxHash(h);
          await waitForTransactionReceipt(config, { hash: h });
        }

        // Compute Unix timestamps (seconds) for start/end
        setTxStatus('creating');
        const latestBlock = await publicClient.getBlock();
        const currentTs = latestBlock?.timestamp
          ? Number(latestBlock.timestamp)
          : Math.floor(Date.now() / 1000);
        const preferredStartTs = Math.floor(
          (startDate?.timestamp ?? Date.now()) / 1000
        );
        const startTs = Math.max(preferredStartTs, currentTs + 1); // ensure now or in future
        // Convert block duration UI to seconds using avg block time (fallback 5s)
        const perBlockSec = avgBlockTime && avgBlockTime > 0 ? avgBlockTime : 5;
        let durationSecs = Math.floor(Number(effectiveDuration || 0) * perBlockSec);
        if (!Number.isFinite(durationSecs) || durationSecs <= 0) durationSecs = 60;
        const endTs = startTs + durationSecs;

        const { request } = await simulateContract(config, {
          ...lib.StakingFactoryV3Contract,
          functionName: "createIncentive",
          args: [
            {
              rewardToken: rewardToken as `0x${string}`,
              pool: selectedPool?.poolAddress as `0x${string}`,
              startTime: BigInt(startTs),
              endTime: BigInt(endTs),
              refundee: address as `0x${string}`,
            },
            parseEther(rewardAmount),
          ],
        });

        const h = await writeContract(config, request);
        setTxHash(h);
        await waitForTransactionReceipt(config, { hash: h });
        setTxStatus('completed');
      }
    } catch (e) {
      setTxStatus('error');
      setErrMsg(e as WriteContractErrorType);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-6 sm:mb-8">
      {/* Mobile: Simple dots with current step info */}
      <div className="sm:hidden">
        <div className="text-center mb-3">
          <p className="text-xs text-gray-400">
            Step {currentStep} of 4
          </p>
          <p className="text-sm font-medium text-white mt-1">
            {[
              "Select Staking Type",
              "Select Pool",
              "Add Reward",
              "Review"
            ][currentStep - 1]}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                currentStep >= step
                  ? `bg-gradient-to-r from-emerald-400 to-green-500 w-8 shadow-lg shadow-emerald-500/50`
                  : "bg-gray-700 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden sm:flex items-center justify-center">
        {[
          {
            number: 1,
            title: "Select Staking Type",
            description: "Choose staking program type",
          },
          {
            number: 2,
            title: "Select Pool",
            description: "Choose a liquidity pool",
          },
          {
            number: 3,
            title: "Add Reward",
            description: "Set rewards and period",
          },
          { number: 4, title: "Review", description: "Confirm farm details" },
        ].map((step, index, arr) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? `${currentTheme.accent} ${currentTheme.bg}`
                  : ` ${currentTheme.border} ${currentTheme.hover}`
              }`}
            >
              {currentStep > step.number ? (
                <Check className={`w-5 h-5 ${currentTheme.text}`} />
              ) : (
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? currentTheme.text
                      : "text-gray-400"
                  }`}
                >
                  {step.number}
                </span>
              )}
            </div>
            {index < arr.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.number ? currentTheme.accent : "bg-gray-600"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderChainSelector = () => (
    <div className="flex gap-2 mb-6">
      {Object.entries(chains).map(([key, chain]) => (
        <button
          key={key}
          onClick={() => setSelectedChain(key as ChainKey)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            selectedChain === key
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
    <div className="h-full max-h-[100vh] w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 mt-[120px] ">
      <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
      
      {/* Transaction Status Modal */}
      {showTxModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-green-500/30 p-8 max-w-md w-full shadow-2xl">
            <div className="text-center space-y-6">
              {/* Status Icon */}
              <div className="flex justify-center">
                {txStatus === 'approving' && (
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                )}
                {txStatus === 'creating' && (
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                )}
                {txStatus === 'completed' && (
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {txStatus === 'error' && (
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Status Text */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {txStatus === 'approving' && 'Approving Reward Token'}
                  {txStatus === 'creating' && 'Creating Incentive'}
                  {txStatus === 'completed' && 'Incentive Created!'}
                  {txStatus === 'error' && 'Transaction Failed'}
                </h3>
                <p className="text-gray-400">
                  {txStatus === 'approving' && 'Please confirm the approval transaction in your wallet...'}
                  {txStatus === 'creating' && 'Please confirm the creation transaction in your wallet...'}
                  {txStatus === 'completed' && 'Your incentive has been created successfully!'}
                  {txStatus === 'error' && 'Something went wrong. Please try again.'}
                </p>
              </div>

              {/* Transaction Hash */}
              {txHash && txStatus !== 'error' && (
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-1">Transaction Hash</p>
                  <a
                    href={`${selectedChainConfig.explorer}tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-400 hover:text-green-300 break-all font-mono"
                  >
                    {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              {txStatus === 'completed' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowTxModal(false);
                      setTxStatus('idle');
                      setTxHash('');
                    }}
                    className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Stay Here
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = '/liquidity-pool';
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Go to Liquidity Pool
                  </button>
                </div>
              )}

              {txStatus === 'error' && (
                <button
                  onClick={() => {
                    setShowTxModal(false);
                    setTxStatus('idle');
                    setTxHash('');
                  }}
                  className="w-full py-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
        <div className="max-w-4xl mx-auto w-full mt-4 md:mt-8 pb-6 md:pb-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Create Earn Program</h1>
            <p className="text-gray-400">
              Set up farming rewards for liquidity providers
            </p>
          </div>

          {renderChainSelector()}
          {renderStepIndicator()}

          <div className={` border ${currentTheme.border} rounded-xl p-6`}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Select Staking Type
                  </h2>
                  <p className="text-gray-400">
                    Choose the type of staking program you want to create
                  </p>
                </div>
                <div className="space-y-3">
                  {stakingTypes
                    .filter((t) => ENABLED_STAKING_TYPES.has(t.name))
                    .map((type) => (
                    <div
                      key={type.name}
                      onClick={() => setStakingType(type.name)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        stakingType === type.name
                          ? `${currentTheme.accent} ${currentTheme.bg}`
                          : `border ${currentTheme.border} ${currentTheme.border} `
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">
                            {type.name}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {type.description}
                          </p>
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
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    stakingType
                      ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                      : " text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === 2 && stakingType === "Token Staking" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Select Staked Token
                  </h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchRef}
                    value={selectToken}
                    onChange={(e) => {
                      setSelectToken(e.target.value);
                      if (e.target.value.length === 42)
                        fetchTokenData(e.target.value, setSelectTokenInfo);
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
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectToken === token.value
                            ? `${currentTheme.accent} ${currentTheme.bg}`
                            : `${currentTheme.border} ${currentTheme.hover}`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={token.logo || "/default2.png"}
                            alt={token.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium text-white">
                              {token.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Token Address: {token.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  className={`p-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}
                >
                  <h3 className={`font-medium ${currentTheme.text} mb-3`}>
                    Your Staked Token Information
                  </h3>
                  <div className="grid gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Token Name:</span>
                      <span className="text-white ml-2">
                        {selectTokenInfo?.name ?? "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Token Supply:</span>
                      <span className="text-white ml-2">
                        {selectTokenInfo?.totalSupply
                          ? parseFloat(
                              selectTokenInfo.totalSupply
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Token Symbol:</span>
                      <span className="text-white ml-2">
                        {selectTokenInfo?.symbol ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedPool(null);
                      setSelectToken("");
                    }}
                    className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => selectToken && setCurrentStep(3)}
                    disabled={!selectToken}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      selectToken
                        ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                        : "border border-gray-500 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 &&
              stakingType === "Concentrate Liquidity Staking" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Select Eligible Pool
                    </h2>
                    <p className="text-gray-400">
                      Choose a liquidity pool to create farming rewards
                    </p>
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
                  {(() => {
                    const uniquePairsMap = new Map<string, Pool>();
                    for (const p of validPools) {
                      if (!uniquePairsMap.has(p.name)) uniquePairsMap.set(p.name, p);
                    }
                    const uniquePairs = Array.from(uniquePairsMap.values());
                    return (
                      <div className="space-y-3">
                        {uniquePairs.map((pool) => (
                          <div
                            key={pool.name}
                            onClick={() => {
                              setSelectedPair(pool.name);
                              setSelectedFee(null);
                              setSelectedPool(null);
                            }}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedPair === pool.name
                                ? `${currentTheme.accent} ${currentTheme.bg}`
                                : `${currentTheme.border} ${currentTheme.hover}`
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={
                                  tokens.find((t) => t.value === pool.tokenA)
                                    ?.logo || "/default2.png"
                                }
                                alt={pool.tokenA}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-white">
                                {tokens.find((t) => t.value === pool.tokenA)
                                  ?.name || pool.tokenA}
                              </span>
                              <span className="mx-1">/</span>
                              <img
                                src={
                                  tokens.find((t) => t.value === pool.tokenB)
                                    ?.logo || "/default2.png"
                                }
                                alt={pool.tokenB}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-white">
                                {tokens.find((t) => t.value === pool.tokenB)
                                  ?.name || pool.tokenB}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {selectedPair && (
                    <div className="w-full space-y-4">
                      <div>
                        <h2 className="text-lg font-semibold">Select Fee Tier</h2>
                        <p className="text-sm text-gray-400">
                          Choose the fee tier for the selected pair.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(
                          new Set(
                            validPools
                              .filter((p) => p.name === selectedPair)
                              .map((p) => String(p.fee))
                          )
                        )
                          .sort((a, b) => Number(a) - Number(b))
                          .map((fee) => (
                            <button
                              key={`${selectedPair}-${fee}`}
                              onClick={() => setSelectedFee(fee)}
                              className={`px-4 py-2 rounded-full border text-sm transition ${
                                selectedFee === fee
                                  ? `${currentTheme.bg} ${currentTheme.text} ring-2 ring-offset-1 ring-primary`
                                  : " text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                              }`}
                            >
                              {Number(fee) / 10000}%
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                  {/* <div className="w-full space-y-4">
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
                </div> */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setSelectedPool(null);
                        setSelectedPair(null);
                        setSelectedFee(null);
                        setSelectToken("");
                      }}
                      className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        const pool = validPools.find(
                          (p) => p.name === selectedPair && String(p.fee) === String(selectedFee)
                        );
                        if (pool) {
                          setSelectedPool(pool);
                          setCurrentStep(3);
                        }
                      }}
                      disabled={
                        !selectedPair || !selectedFee ||
                        !validPools.some(
                          (p) => p.name === selectedPair && String(p.fee) === String(selectedFee)
                        )
                      }
                      className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                        selectedPair && selectedFee
                          ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                          : "border border-gray-500 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

            {currentStep === 3 && (
              <div className="space-y-6  pb-[60px]">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Add Reward
                  </h2>
                  <p className="text-gray-400">
                    Configure reward token and farming period
                  </p>
                </div>
                {stakingType === "Token Staking" ? (
                  <>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Reward Token
                      </label>
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
                                  src={
                                    tokens.find((t) => t.value === rewardToken)
                                      ?.logo || "/default2.png"
                                  }
                                  className="w-5 h-5 rounded-full"
                                />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                                  ?
                                </div>
                              )}
                              <span className="truncate">
                                {tokens.find((t) => t.value === rewardToken)
                                  ?.name || "Select reward token"}
                              </span>
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
                                        fetchTokenData(
                                          searchInput,
                                          setRewardTokenInfo
                                        );
                                        setOpenReward(false);
                                      } else {
                                        alert("Invalid token address.");
                                      }
                                    }}
                                    className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                                  >
                                    {searchInput?.length === 42
                                      ? "+ Add Token"
                                      : "Invalid Token Contract Address"}
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
                                        fetchTokenData(
                                          token.value,
                                          setRewardTokenInfo
                                        );
                                        setOpenReward(false);
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <div className="flex items-center">
                                        <img
                                          alt=""
                                          src={token.logo}
                                          className="w-5 h-5 rounded-full"
                                        />
                                        <span className="ml-3 truncate">
                                          {token.name}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div
                        className={`p-4 mt-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}
                      >
                        <h3 className={`font-medium ${currentTheme.text} mb-3`}>
                          Reward Token Information
                        </h3>
                        <div className="grid gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Token Name:</span>
                            <span className="text-white ml-2">
                              {rewardTokenInfo?.name ?? "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Token Supply:</span>
                            <span className="text-white ml-2">
                              {rewardTokenInfo?.totalSupply
                                ? parseFloat(
                                    rewardTokenInfo.totalSupply
                                  ).toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })
                                : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Token Symbol:</span>
                            <span className="text-white ml-2">
                              {rewardTokenInfo?.symbol ?? "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Total Reward Amount (Ether)
                      </label>
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
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Lock Options
                      </label>
                      <div className="space-y-3">
                        <div
                          className={`p-4 rounded-lg border cursor-pointer ${
                            selectLockOption === "0" ? currentTheme.bg : ""
                          }`}
                          onClick={() => setSelectLockOption("0")}
                        >
                          <div className="font-medium text-white">No Lock</div>
                          <p className="text-sm text-gray-400">
                            Users can withdraw staked tokens at any time.
                          </p>
                        </div>
                        <div
                          className={`p-4 rounded-lg border cursor-pointer ${
                            selectLockOption === "1" ? currentTheme.bg : ""
                          }`}
                          onClick={() => setSelectLockOption("1")}
                        >
                          <div className="font-medium text-white">
                            Single Lock Time
                          </div>
                          <p className="text-sm text-gray-400">
                            Users can withdraw their staked tokens only after
                            the unlock time set by the creator.
                          </p>
                        </div>
                        <div
                          className={`p-4 rounded-lg border cursor-pointer ${
                            selectLockOption === "2" ? currentTheme.bg : ""
                          }`}
                          onClick={() => setSelectLockOption("2")}
                        >
                          <div className="font-medium text-white">
                            Multiple Lock Time
                          </div>
                          <p className="text-sm text-gray-400">
                            Users can choose from multiple lock durations
                            predefined by the creator. The creator can assign
                            different reward multipliers based on the selected
                            duration.
                          </p>
                        </div>
                      </div>
                      {selectLockOption === "1" && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-white">
                            Unlock Time (blocks)
                          </label>
                          <input
                            type="number"
                            ref={unlockRef}
                            placeholder="Enter unlock time (in blocks)"
                            className="w-full p-2 rounded-md border  text-white"
                            value={singleUnlockTime}
                            onChange={(e) => {
                              let value = e.target.value;
                              value = value.replace(/,/g, "");
                              if (isNaN(Number(value)) || value === "") {
                                value = "1";
                              } else if (Number(value) < 1) {
                                value = "1";
                              }
                              setSingleUnlockTime(value);
                            }}
                          />
                          <div className="text-gray-400 text-sm">
                            Lock for {singleUnlockTime} blocks (~{" "}
                            {convertBlocksToTimeString(
                              Number(singleUnlockTime),
                              avgBlockTime
                            )}
                            )
                          </div>
                        </div>
                      )}
                      {selectLockOption === "2" && (
                        <div className="space-y-4">
                          <label className="block text-sm font-semibold text-white">
                            Multiple Lock Options
                          </label>

                          {multiLocks.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-col md:flex-row gap-4 items-start md:items-center /30 p-4 rounded-lg border"
                            >
                              <div className="w-full md:w-1/3">
                                <label className="block text-sm font-medium text-white mb-1">
                                  Unlock Time (Blocks)
                                </label>
                                <input
                                  type="number"
                                  placeholder="e.g., 3600"
                                  min={1}
                                  className="w-full p-2 rounded-md border  text-white"
                                  value={item.time}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace(/,/g, "");
                                    if (isNaN(Number(value)) || value === "") {
                                      value = "1";
                                    } else if (Number(value) < 1) {
                                      value = "1";
                                    }
                                    const updated = [...multiLocks];
                                    updated[index].time = value;
                                    setMultiLocks(updated);
                                  }}
                                />
                              </div>
                              <div className="w-full md:w-1/3">
                                <label className="block text-sm font-medium text-white mb-1">
                                  Estimated Time
                                </label>
                                <div className="w-full p-2 rounded-md border  text-white">
                                  {convertBlocksToTimeString(
                                    Number(multiLocks[index].time),
                                    avgBlockTime
                                  )}
                                </div>
                              </div>
                              <div className="w-full md:w-1/3">
                                <label className="block text-sm font-medium text-white mb-1">
                                  Power Multiplier (%)
                                </label>
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
                                onClick={() =>
                                  setMultiLocks(
                                    multiLocks.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                🗑 Remove
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-700 hover:text-white"
                            onClick={() =>
                              setMultiLocks([
                                ...multiLocks,
                                { time: "17280", multiplier: "120" },
                              ])
                            }
                          >
                            + Add
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Block Reward
                      </label>
                      <DateTimePicker
                 
                        onSelect={(timestamp) => {
                          const date = new Date(timestamp);
                          setStartDate({
                            timestamp,
                            formatted: date.toLocaleString("en-US"),
                          });
                        }}
                      />
                      {/*                       <div className="text-gray-400 text-sm">Curr : {blocks[0].blockNumber} </div>
                       */}{" "}
                      <div className="text-gray-400 text-sm">
                        First Reward will start at block number :{" "}
                        {estimatedStartBlock}{" "}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Reward Duration (Blocks)
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-gray-500"
                      >
                        {[7, 14, 30, 90, 365].map((day) => {
                          const blocks = Math.ceil(
                            (day * 86400) / avgBlockTime
                          );
                          return (
                            <option key={day} value={blocks}>
                              {`${blocks.toLocaleString()} Blocks ( ~${day} Days )`}
                            </option>
                          );
                        })}

                        <option value="-">Custom Blocks</option>
                      </select>

                      {duration === "-" && (
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
                          <div className="text-gray-400 text-sm">
                            Selected Reward Duration: {effectiveDuration} Blocks
                            (~{" "}
                            {convertBlocksToTimeString(
                              Number(effectiveDuration),
                              avgBlockTime
                            )}
                            )
                          </div>
                        </span>
                      )}
                    </div>
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Maximum Pool Staked Token (Ether)
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={maxPoolToken}
                        onChange={(e) => setMaxPoolToken(e.target.value)}
                        className="w-full px-4 py-3  border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                      />
                      <label className="block text-sm font-medium text-gray-300 mb-2 mt-4">
                        Maximum Staked Token Per User (Ether)
                      </label>
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
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Reward Token
                          </label>
                          <Popover
                            open={openReward}
                            onOpenChange={setOpenReward}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openReward}
                                className="w-full  text-white border border-gray-600 h-10 justify-between"
                              >
                                <div className="gap-2 flex flex-row items-center justify-start">
                                  {tokens.find((t) => t.value === rewardToken)
                                    ?.name || "Select reward token"}
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
                                            fetchTokenData(
                                              searchInput,
                                              setRewardTokenInfo
                                            );
                                            setOpenReward(false);
                                          } else {
                                            alert("Invalid token address.");
                                          }
                                        }}
                                        className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                                      >
                                        {searchInput?.length === 42
                                          ? "+ Add Token"
                                          : "Invalid Token Contract Address"}
                                      </button>
                                    </div>
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {tokens
                                      .filter(
                                        (token) => token.value?.length === 42
                                      )
                                      .map((token) => (
                                        <CommandItem
                                          key={token.value}
                                          value={token.name}
                                          onSelect={() => {
                                            setRewardToken(token.value);
                                            fetchTokenData(
                                              token.value,
                                              setRewardTokenInfo
                                            );
                                            setOpenReward(false);
                                          }}
                                          className="cursor-pointer"
                                        >
                                          <div className="flex items-center">
                                            <img
                                              alt=""
                                              src={token.logo}
                                              className="w-5 h-5 rounded-full"
                                            />
                                            <span className="ml-3 truncate">
                                              {token.name}
                                            </span>
                                          </div>
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div
                          className={`p-4 mt-4 rounded-lg ${currentTheme.bg} border ${currentTheme.accent}`}
                        >
                          <h3
                            className={`font-medium ${currentTheme.text} mb-3`}
                          >
                            Reward Token Information
                          </h3>
                          <div className="grid gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Token Name:</span>
                              <span className="text-white ml-2">
                                {rewardTokenInfo?.name ?? "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">
                                Token Supply:
                              </span>
                              <span className="text-white ml-2">
                                {rewardTokenInfo?.totalSupply
                                  ? parseFloat(
                                      rewardTokenInfo.totalSupply
                                    ).toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                    })
                                  : "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">
                                Token Symbol:
                              </span>
                              <span className="text-white ml-2">
                                {rewardTokenInfo?.symbol ?? "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Total Reward Amount (Ether)
                          </label>
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
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Block Reward
                        </label>
                        <DateTimePicker
                          onSelect={(timestamp) => {
                            const date = new Date(timestamp);
                            setStartDate({
                              timestamp,
                              formatted: date.toLocaleString("en-US"),
                            });
                          }}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Reward Duration (Blocks)
                        </label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-gray-500"
                        >
                          {[7, 14, 30, 90, 365].map((day) => {
                            const blocks = Math.ceil(
                              (day * 86400) / avgBlockTime
                            );
                            return (
                              <option key={day} value={blocks}>
                                {`${blocks.toLocaleString()} Blocks ( ~${day} Days )`}
                              </option>
                            );
                          })}

                          <option value="-">Custom Blocks</option>
                        </select>

                        {duration === "-" && (
                          <span>
                            <input
                              type="number"
                              min={1}
                              placeholder="Enter custom reward duration (Blocks)"
                              value={customDuration}
                              ref={customDurationRef}
                              onChange={(e) =>
                                setCustomDuration(e.target.value)
                              }
                              className="mt-2 w-full px-4 py-3  border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-500"
                            />
                            <div className="text-gray-400 text-sm">
                              Selected Reward Duration: {effectiveDuration}{" "}
                              Blocks (~{" "}
                              {convertBlocksToTimeString(
                                Number(effectiveDuration),
                                avgBlockTime
                              )}
                              )
                            </div>
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
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      rewardToken && rewardAmount && startDate
                        ? `${currentTheme.text} ${currentTheme.bg} border ${currentTheme.accent} hover:opacity-80`
                        : "border border-gray-500 text-gray-400 cursor-not-allowed"
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
                  <h2
                    className="text-xl sm:text-3xl font-bold text-white mb-2 tracking-wide"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    Review Farm Details
                  </h2>
                  <p
                    className="text-gray-400 text-sm sm:text-base tracking-normal"
                    style={{ letterSpacing: "0.015em" }}
                  >
                    Confirm your farming program configuration
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-600 rounded-lg">
                    <h3
                      className="font-semibold text-white mb-3 text-xl tracking-wide"
                      style={{ letterSpacing: "0.03em" }}
                    >
                      Program Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <div
                          className="text-gray-400 text-xs sm:text-sm tracking-normal break-words"
                          style={{ letterSpacing: "0.015em" }}
                        >
                          {selectLockOption === "1"
                            ? "Lock : "
                            : selectLockOption === "2"
                            ? "Multiple Lock : "
                            : "Staking : "}
                          <span
                            className={`${currentTheme.text} tracking-wide block sm:inline mt-1 sm:mt-0`}
                            style={{
                              letterSpacing: "0.025em",
                              fontSize: "0.85rem",
                            }}
                          >
                            {selectTokenInfo?.name || selectedPool?.name}
                          </span>{" "}
                          <span className="block sm:inline">→ Earn{" "}</span>
                          <span
                            className={`${currentTheme.text} tracking-wide block sm:inline mt-1 sm:mt-0`}
                            style={{
                              letterSpacing: "0.025em",
                              fontSize: "0.85rem",
                            }}
                          >
                            {rewardTokenInfo?.name}
                          </span>
                        </div>
                        <div
                          className="text-gray-400 text-xs sm:text-sm tracking-normal break-words"
                          style={{ letterSpacing: "0.015em" }}
                        >
                          <span className="block sm:inline">Duration: </span>
                          <span
                            className={`${currentTheme.text} tracking-wide block sm:inline font-semibold`}
                            style={{
                              letterSpacing: "0.025em",
                              fontSize: "0.85rem",
                            }}
                          >
                            {parseInt(effectiveDuration).toLocaleString()}
                          </span>{" "}
                          <span className="block sm:inline text-[10px] sm:text-xs">
                            Blocks (~{" "}
                            {convertBlocksToTimeString(
                              Number(effectiveDuration),
                              avgBlockTime
                            )}
                            )
                          </span>
                        </div>
                        <div
                          className="text-gray-400 ml-2 text-sm tracking-normal"
                          style={{ letterSpacing: "0.015em" }}
                        >
                          Chain :{" "}
                          <span
                            className={`${currentTheme.text} tracking-wide`}
                            style={{
                              letterSpacing: "0.025em",
                              fontSize: "0.9rem",
                            }}
                          >
                            {currentTheme.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-600 rounded-lg">
                    <h3
                      className="font-semibold text-white mb-3 text-xl tracking-wide"
                      style={{ letterSpacing: "0.03em" }}
                    >
                      Pool Information
                    </h3>
                    <div>
                      <span
                        className="text-gray-400 text-sm tracking-normal"
                        style={{ letterSpacing: "0.015em" }}
                      >
                        {stakingType === "Token Staking"
                          ? "Token Staked:"
                          : "Pool:"}
                      </span>
                      <span
                        className="text-white ml-2 tracking-wide"
                        style={{ letterSpacing: "0.02em", fontSize: "0.9rem" }}
                      >
                        {stakingType === "Token Staking"
                          ? selectTokenInfo?.name
                          : selectedPool?.name}
                      </span>
                    </div>

                    <div
                      className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-400 tracking-normal"
                      style={{ letterSpacing: "0.015em" }}
                    >
                      <span>Contract Address:</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            (stakingType === "Token Staking"
                              ? selectToken
                              : selectedPool?.poolAddress) || "",
                            "stakingCa"
                          )
                        }
                        className="flex items-center gap-1 text-white transition-colors break-all"
                      >
                        <span className="font-mono text-[10px] sm:text-xs">
                          {stakingType === "Token Staking"
                            ? selectToken
                            : selectedPool?.poolAddress || "N/A"}
                        </span>
                        {copiedAddress === "stakingCa" ? (
                          <CopyCheck size={14} className="shrink-0" />
                        ) : (
                          <Copy size={14} className="shrink-0" />
                        )}
                      </button>
                    </div>

                    {stakingType !== "Token Staking" && selectedPool && (
                      <div>
                        <span
                          className="text-gray-400 text-sm tracking-normal"
                          style={{ letterSpacing: "0.015em" }}
                        >
                          Fee:
                        </span>
                        <span
                          className={`${currentTheme.text} ml-2 tracking-wide`}
                          style={{ letterSpacing: "0.02em", fontSize: "0.9rem" }}
                        >
                          {(selectedPool.fee / 10000).toFixed(2)}%
                        </span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <span
                        className="text-gray-400 text-sm tracking-normal"
                        style={{ letterSpacing: "0.015em" }}
                      >
                        Lock Durations :{" "}
                      </span>
                      {selectLockOption !== "1" && selectLockOption !== "2" && (
                        <span
                          className="text-white tracking-wide"
                          style={{
                            letterSpacing: "0.02em",
                            fontSize: "0.9rem",
                          }}
                        >
                          No Lock
                        </span>
                      )}

                      {selectLockOption === "1" && (
                        <span
                          className="text-white tracking-wide"
                          style={{
                            letterSpacing: "0.02em",
                            fontSize: "0.9rem",
                          }}
                        >
                          {singleUnlockTime} Blocks
                        </span>
                      )}

                      {selectLockOption === "2" && (
                        <div className="space-y-4 mt-2">
                          {multiLocks.map((item, index) => (
                            <div
                              key={index}
                              className="space-y-1 ml-2 my-2 rounded-lg "
                            >
                              <div
                                className="text-gray-400 text-sm tracking-normal"
                                style={{ letterSpacing: "0.015em" }}
                              >
                                Unlock Time (Blocks) :{" "}
                                <span
                                  className="text-white tracking-wide"
                                  style={{
                                    letterSpacing: "0.02em",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {item.time || "-"}
                                </span>{" "}
                                (
                                {convertBlocksToTimeString(
                                  Number(multiLocks[index].time),
                                  avgBlockTime
                                )}
                                )
                              </div>
                              <div
                                className="text-gray-400 text-sm tracking-normal"
                                style={{ letterSpacing: "0.015em" }}
                              >
                                Power Multiplier (%) :{" "}
                                <span
                                  className="text-white tracking-wide"
                                  style={{
                                    letterSpacing: "0.02em",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {item.multiplier || "-"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <span
                        className="text-gray-400 text-xs sm:text-sm tracking-normal block"
                        style={{ letterSpacing: "0.015em" }}
                      >
                        Block reward range:
                      </span>
                      <span
                        className="text-white tracking-wide text-xs sm:text-sm block break-all"
                        style={{ letterSpacing: "0.02em" }}
                      >
                        {estimatedStartBlock}
                        {" - "}
                        {Number(estimatedStartBlock) +
                          Number(effectiveDuration)}
                      </span>
                    </div>

                    {stakingType === "Token Staking" && (
                      <>
                        <div>
                          <span
                            className="text-gray-400 text-sm tracking-normal"
                            style={{ letterSpacing: "0.015em" }}
                          >
                            Maximum Lock per User :{" "}
                          </span>
                          <span
                            className={`ml-2 text-white tracking-wide`}
                            style={{
                              letterSpacing: "0.02em",
                              fontSize: "0.9rem",
                            }}
                          >
                            {Number(maxUserToken) === 0
                              ? "Unlimited"
                              : Number(maxUserToken)}{" "}
                            {rewardTokenInfo?.name}{" "}
                          </span>
                        </div>

                        <div>
                          <span
                            className="text-gray-400 text-sm tracking-normal"
                            style={{ letterSpacing: "0.015em" }}
                          >
                            Maximum Pool Lock Token :{" "}
                          </span>
                          <span
                            className={`ml-2 text-white tracking-wide`}
                            style={{
                              letterSpacing: "0.02em",
                              fontSize: "0.9rem",
                            }}
                          >
                            {Number(maxPoolToken) === 0
                              ? "Unlimited"
                              : Number(maxPoolToken)}{" "}
                            {rewardTokenInfo?.name}{" "}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 border border-gray-600 rounded-lg">
                  <h3
                    className="font-semibold text-white mb-3 text-xl tracking-wide"
                    style={{ letterSpacing: "0.03em" }}
                  >
                    Reward Information
                  </h3>
                  <div>
                    <span
                      className="text-gray-400 text-sm tracking-normal"
                      style={{ letterSpacing: "0.015em" }}
                    >
                      Reward Token :{" "}
                    </span>
                    <span
                      className="text-white ml-2 tracking-wide"
                      style={{ letterSpacing: "0.02em", fontSize: "0.9rem" }}
                    >
                      {rewardTokenInfo?.name} ({rewardTokenInfo?.symbol})
                    </span>
                  </div>

                  <div
                    className="flex flex-col gap-2 text-xs sm:text-sm text-gray-400 tracking-normal"
                    style={{ letterSpacing: "0.015em" }}
                  >
                    <span>Contract Address:</span>
                    <button
                      onClick={() => copyToClipboard(rewardToken, "reward")}
                      className="flex items-center gap-1 text-white transition-colors break-all text-left"
                    >
                      <span className="font-mono text-[10px] sm:text-xs">{rewardToken}</span>
                      {copiedAddress === "reward" ? (
                        <CopyCheck size={14} className="shrink-0" />
                      ) : (
                        <Copy size={14} className="shrink-0" />
                      )}
                    </button>
                  </div>

                  <div>
                    <span
                      className="text-gray-400 text-sm tracking-normal"
                      style={{ letterSpacing: "0.015em" }}
                    >
                      Total Reward {" :"}
                    </span>
                    <span
                      className={`ml-2 text-white tracking-wide`}
                      style={{ letterSpacing: "0.02em", fontSize: "0.9rem" }}
                    >
                      {Number(rewardAmount).toLocaleString()}{" "}
                      {rewardTokenInfo?.symbol}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span
                      className="text-gray-400 text-xs sm:text-sm tracking-normal block"
                      style={{ letterSpacing: "0.015em" }}
                    >
                      Reward Durations:
                    </span>
                    <span className="text-white text-xs sm:text-sm block break-words">
                      {Number(effectiveDuration).toLocaleString()} Blocks (
                      {convertBlocksToTimeString(
                        Number(effectiveDuration),
                        avgBlockTime
                      )}
                      )
                    </span>
                  </div>

                  <div>
                    <span
                      className="text-gray-400 text-sm tracking-normal"
                      style={{ letterSpacing: "0.015em" }}
                    >
                      Emission rate :{" "}
                    </span>
                    <span
                      className="text-white tracking-wide"
                      style={{ letterSpacing: "0.02em", fontSize: "0.9rem" }}
                    >
                      {getRewardRatePerDay(
                        rewardAmount,
                        effectiveDuration,
                        avgBlockTime
                      )}{" "}
                      {rewardTokenSymbol || "tokens"}/day
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
                    onClick={() => createPool()}
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
