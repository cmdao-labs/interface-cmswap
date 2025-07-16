import React, { useState,useEffect } from "react";
import { Copy, Plus, ChevronDown, ChevronUp, CopyCheck } from "lucide-react";
import { Button } from '@/components/ui/button'
import { bitkub, monadTestnet,bitkubTestnet } from "viem/chains";
import { stakingV2ABI,stakingV3ABI } from "@/app/lib/abi";
import { config } from '@/app/config'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { ADDRESS_ZERO } from "@uniswap/v3-sdk";
import { useAccount } from 'wagmi'
import { createPublicClient, http, erc20Abi } from 'viem'
import { formatEther, parseEther } from 'viem'
import { parse } from "next/dist/build/swc/generated-native";

const StakingList = ({
    setIsLoading,
    setErrMsg,
  } : {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>,
  }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showTokenPopup, setShowTokenPopup] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [programInfo, setProgramInfo] = useState<any>(null);
  const [copiedAddress, setCopiedAddress] = useState("");
  const [stakingInfos, setStakingInfos] = useState<Record<number, any>>({});
  const { address } = useAccount()
  const [stakeAmount, setStakeAmount] = useState<string>(""); 
  const [lockOption, setLockOption] = useState<number>(0);  



  const renderPrograms = async (projectInfo : any) => {
    let _chain: any = null;
    let _chainId = 0;
    let _explorer = "";
    let _rpc = "";
    let _estBlockTime = 0; // sec
    if (projectInfo.chain === "kub" || projectInfo.chain === "") {
        _chain = bitkub;
        _chainId = 96;
        _explorer = "https://www.kubscan.com/";
        _estBlockTime = 5;
      } else if (projectInfo.chain === "monad") {
        _chain = monadTestnet;
        _chainId = 10143;
        _explorer = "https://monad-testnet.socialscan.io/";
        _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
        _estBlockTime = 1;
      } else if (projectInfo.chain === 'kubtestnet'){
          _chain = bitkubTestnet;
          _chainId = 25925;
          _explorer = 'https://testnet.kubscan.com/';
          _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
        _estBlockTime = 5;
      }
      let poolStatus: any = null;

      if ( projectInfo.isNFT ) {
        // For NFT staking, use the stakingV3ABI
        poolStatus = await readContracts(config,{
        contracts: [
          { abi: stakingV3ABI, address: projectInfo.programContract, functionName: 'getPoolInfo' },
          { abi: stakingV3ABI, address: projectInfo.programContract, functionName: 'getUserInfo', args: [address as `0x${string}`] },
          { abi: erc20Abi, address: projectInfo.tokenAddress, functionName: 'balanceOf', args: [address as `0x${string}`] },
        ]
      })

      console.log(poolStatus, "poolStatus");
      return {
            name: poolStatus?.[0]?.[0].result[0] || "Unknown Pool",
            rewardToken: poolStatus?.[0]?.[1],
            positionManager: poolStatus?.[0]?.[2],
            tokenA: poolStatus?.[0]?.[3],
            tokenB: poolStatus?.[0]?.[4],
            fees: poolStatus?.[0]?.[5],
            rewardPerBlock: poolStatus?.[0]?.[6] || BigInt(0),
            totalPower: poolStatus?.[0]?.[7] || BigInt(0),
            lockDurations: poolStatus?.[0]?.[8] || [],
            powerMultipliers: poolStatus?.[0]?.[9] || [],
            currentBlock: poolStatus?.[0]?.[10] || BigInt(0),
            startBlock: poolStatus?.[0]?.[11] || BigInt(0),
            endBlock: poolStatus?.[0]?.[12] || BigInt(0),
            userStaked: poolStatus?.[1]?.[0] || BigInt(0),
            userPending: poolStatus?.[1]?.[2] || BigInt(0),
            userPower: poolStatus?.[1]?.[3] || BigInt(0),
            userStakedTimeStamp: poolStatus?.[1]?.[4] || BigInt(0),
            userLockOption: poolStatus?.[1]?.[5] || BigInt(0),
            userStakeTokenBalance: poolStatus?.[2].result || BigInt(0),
            block: _estBlockTime,
        }

      }else {
        // For regular token staking, use the stakingV2ABI
        poolStatus = await readContracts(config,{
        contracts: [
          { abi: stakingV2ABI, address: projectInfo.programContract, functionName: 'getPoolInfo' },
          { abi: stakingV2ABI, address: projectInfo.programContract, functionName: 'getUserInfo', args: [address as `0x${string}`] },
          { abi: erc20Abi, address: projectInfo.tokenAddress, functionName: 'balanceOf', args: [address as `0x${string}`] },
        ]})

      console.log(poolStatus?.[0].result[0], "poolStatus");
        return {
            name: poolStatus?.[0]?.result[0] || "Unknown Pool",
            rewardToken: poolStatus?.[0]?.result[1],
            positionManager: poolStatus?.[0]?.result[2],
            tokenA: ADDRESS_ZERO,
            tokenB: ADDRESS_ZERO,
            fees: BigInt(0),
            rewardPerBlock: formatEther(BigInt(poolStatus?.[0]?.result[3])) || BigInt(0),
            totalPower: formatEther(BigInt(poolStatus?.[0]?.result[4])) || BigInt(0),
            lockDurations: poolStatus?.[0]?.result[5] || [],
            powerMultipliers: poolStatus?.[0]?.result[6] || [],
            currentBlock: poolStatus?.[0]?.result[7] || BigInt(0),
            startBlock: poolStatus?.[0]?.result[8] || BigInt(0),
            endBlock: poolStatus?.[0]?.result[9] || BigInt(0),
            userStaked: formatEther(poolStatus?.[1]?.result[0]) || BigInt(0),
            userPending: formatEther(poolStatus?.[1]?.result[1]) || BigInt(0),
            userPower: formatEther(poolStatus?.[1]?.result[2]) || BigInt(0),
            userStakedTimeStamp: poolStatus?.[1]?.result[3] || BigInt(0),
            userLockOption: poolStatus?.[1]?.result[4] || BigInt(0),
            userStakeTokenBalance: formatEther(poolStatus?.[2]?.result) || BigInt(0),
            block: _estBlockTime,
        }
      }


      
      



    
  }

  React.useEffect(() => {
  const fetchAllStakingPrograms = async () => {
    const results: Record<number, any> = {};
    for (const item of stakingData) {
      const data = await renderPrograms(item);
      results[item.id] = data;
    }
    setStakingInfos(results);
  };
  fetchAllStakingPrograms();
}, []);


  // Chain themes
  type ChainName = "KUB" | "MONAD" | "BINANCE" | "JFIN" | "KUBTESTNET";
  const chainThemes: Record<ChainName, {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    bg: string;
    text: string;
  }> = {
    KUB: {
      primary: "rgb(34, 197, 94)", // green-500
      secondary: "rgb(22, 163, 74)", // green-600
      accent: "rgb(187, 247, 208)", // green-200
      border: "border-green-500",
      bg: "bg-green-500/10",
      text: "text-green-400",
    },
    KUBTESTNET: {
      primary: "rgb(34, 197, 94)", // green-500
      secondary: "rgb(22, 163, 74)", // green-600
      accent: "rgb(187, 247, 208)", // green-200
      border: "border-green-500",
      bg: "bg-green-500/10",
      text: "text-green-400",
    },
    MONAD: {
      primary: "rgb(147, 51, 234)", // purple-600
      secondary: "rgb(126, 34, 206)", // purple-700
      accent: "rgb(221, 214, 254)", // purple-200
      border: "border-purple-500",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
    },
    BINANCE: {
      primary: "rgb(234, 179, 8)", // yellow-500
      secondary: "rgb(202, 138, 4)", // yellow-600
      accent: "rgb(254, 240, 138)", // yellow-200
      border: "border-yellow-500",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
    },
    JFIN: {
      primary: "rgb(239, 68, 68)", // red-500
      secondary: "rgb(220, 38, 38)", // red-600
      accent: "rgb(254, 202, 202)", // red-200
      border: "border-red-500",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
  };

  const stakingData = [
    {
      id: 1,
      chain: "kubtestnet",
      coinImage: "/96.png",
      coin2Image: "",
      rewardLogo: "/96.png",
      rewardName: "tT",
      coinName: "tKKUB",
      programName: "Stake tKKUB EARN tT",
      tokenAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907",
      apr: "25.4%",
      commission: "",
      programContract: "0x15572Cc3653a08Da1929B0da163eCcC9d1779394",
      isNFT: false,
      strategy: "",
    },
    {
      id: 2,
      chain: "kubtestnet",
      coinImage: "/96.png",
      coin2Image: "",
      rewardLogo: "/96.png",
      rewardName: "tT",
      coinName: "tKKUB",
      programName: "LOCK 7 DAYS tKKUB EARN tT",
      tokenAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907",
      apr: "25.4%",
      commission: "",
      programContract: "0x5b83F3B1DFF4A8EEb7E0f301f0Cc455D82446d94",
      isNFT: false,
      strategy: "",
    },
    {
      id: 3,
      chain: "kubtestnet",
      coinImage: "/96.png",
      coin2Image: "",
      rewardLogo: "/96.png",
      rewardName: "tT",
      coinName: "tKKUB",
      programName: "LOCK tKKUB EARN tT",
      tokenAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907",
      apr: "25.4%",
      commission: "",
      programContract: "0x78251fde68c9b176a9a56133e11d42b16cafd748",
      isNFT: false,
      strategy: "",
    },
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(""), 800);
  };

  const toggleExpanded = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getTheme = (chain: string) => chainThemes[(chain as ChainName)] ?? chainThemes.KUB;

  const openLPPopup = (program: any) => {
    setSelectedProgram(program);
    setShowPopup(true);
  };

  const openTokenPopup = (program: any, programInfo: any) => {
    setSelectedProgram(program);
    setProgramInfo(programInfo);
    setShowTokenPopup(true);
  };

  const closePopups = () => {
    setShowPopup(false);
    setShowTokenPopup(false);
    setSelectedProgram(null);
  };

  const getUnlockDate = (daysToAdd: number): Date => {
  const now = new Date(); // เวลาปัจจุบัน
  const unlockDate = new Date(now); // สร้างสำเนา
  unlockDate.setDate(unlockDate.getDate() + daysToAdd); // เพิ่มจำนวนวัน
  return unlockDate;
};

  const handleStaked = async (
  program: any,
  amount: bigint,
  lockOption: number
) => {
  try {
    const allowance = await readContract(config, {
      abi: erc20Abi,
      address: program.tokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [address as `0x${string}`, program.programContract],
    });

    if (allowance < amount) {
      const { request } = await simulateContract(config, {
        abi: erc20Abi,
        address: program.tokenAddress as `0x${string}`,
        functionName: 'approve',
        args: [program.programContract, amount],
      });
      const h = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash: h });
    }

    const { request } = await simulateContract(config, {
      abi: stakingV2ABI,
      address: program.programContract as `0x${string}`,
      functionName: 'stake',
      args: [amount, BigInt(lockOption)],
    });
    const h = await writeContract(config, request);
    await waitForTransactionReceipt(config, { hash: h }).then(() => {
      setStakeAmount("");
      setLockOption(0);
      closePopups();
    });

  } catch (e) {
    setErrMsg(e as WriteContractErrorType);
  }
};

const handleUnstaked = async (
  program: any,
) => {
  try {


    const { request } = await simulateContract(config, {
      abi: stakingV2ABI,
      address: program.programContract as `0x${string}`,
      functionName: 'withdraw',
    });
    const h = await writeContract(config, request);
    await waitForTransactionReceipt(config, { hash: h });
  } catch (e) {
    setErrMsg(e as WriteContractErrorType);
  }
};


  const StakingLPPopup = ({ program, theme }: { program: any; theme: typeof chainThemes.KUB }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add Staking Power</h3>
          <button
            onClick={closePopups}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative w-10 h-10">
              <img
                src={program.coinImage}
                alt="token1"
                className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
              />
              {program.coin2Image && (
                <img
                  src={program.coin2Image}
                  alt="token2"
                  className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-white">{program.coinName}</h4>
              <p className="text-sm text-gray-400">{program.programName}</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            APR: <span className={`font-semibold ${theme.text}`}>{program.apr}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select NFT Position
            </label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
              <option>Position #1234 - {program.coinName}</option>
              <option>Position #5678 - {program.coinName}</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={closePopups}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border}`}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: theme.primary }}
            >
              Add Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StakingTokenPopup = ({ program, theme }: { program: any; theme: typeof chainThemes.KUB }) => (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Stake Token</h3>
          <button
            onClick={closePopups}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative w-10 h-10">
              <img
                src={program.coinImage}
                alt="token"
                className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white"
              />
            </div>
            <div>
              <h4 className="font-semibold text-white">{program.coinName}</h4>
              <p className="text-sm text-gray-400">{program.programName}</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            APR: <span className={`font-semibold ${theme.text}`}>{program.apr}</span>
          </div>
        </div>

        <div className="space-y-4">
          {programInfo.lockDurations && programInfo.lockDurations.length === 1 &&(
            <div>
              <div className="text-sm text-gray-300">
              Lock Period: <span className="font-semibold">{programInfo.lockDurations/86400} Days</span>
            </div>
            <div className="text-sm text-gray-300">
            Unlock at: <span className="text-gray-400">{getUnlockDate(programInfo.lockDurations/86400).toLocaleString()}</span>
          </div>
          
              </div>
          )}
          {programInfo.lockDurations.length > 1 && (
  <>
    <div>Multiple Lock Options</div>
    <div className="flex space-x-2">
      {programInfo.lockDurations.map((duration: bigint | number, index: number) => {
        const durationNum = typeof duration === "bigint" ? Number(duration) : duration;
        const multiplier = Number(programInfo.powerMultipliers[index]) / 100;

        return (
          <button
            key={index}
            onClick={() => setLockOption(durationNum)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${lockOption === durationNum ? theme.primary : theme.bg} ${theme.text} border ${theme.border}`}
          >
            {durationNum / 86400} Days ({multiplier.toFixed(2)}x)
          </button>
        );
      })}
    </div>
    Unlock at:{" "}
    <span className="text-gray-400">
      {getUnlockDate(lockOption / 86400).toLocaleString()}
    </span>
  </>
)}

          
          
          <div className="space-y-2">
            <div className="text-sm">
              Available: <span className="text-green-400">{programInfo.userStakeTokenBalance} {program.coinName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Stake:</span>
              <input 
  type="text" 
  autoFocus
  value={stakeAmount}
  onChange={(e) => setStakeAmount(e.target.value)}
  className="w-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm" 
  placeholder="0.0"
/>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={closePopups}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border}`}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: theme.primary }}
              onClick={() => {
                const parsedAmount = BigInt(Math.floor(Number(stakeAmount) * 1e18)); // แปลงเป็น wei
                handleStaked(program, parsedAmount, lockOption);
              }}
            >
              Stake
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Staking Programs</h2>
          <Button
            variant="outline"
            className="font-mono h-auto rounded text-xs flex flex-col bg-[#162638] text-[#00ff9d] border border-[#00ff9d]/20"
            onClick={() => setShowPopup(true)}
          >
            <span>Create Staking Program</span>
          </Button>
        </div>
        <div className="space-y-4">
          {stakingData.map((item) => {
            const theme = getTheme(item.chain);
            const isExpanded = expandedItem === item.id;
            const programInfo = stakingInfos[item.id];
            console.log(programInfo, "programInfo");

            return (
              <div
                key={item.id}
                className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
              >
                {/* Name */}
                <div className="p-4">
                  <h3 className="font-semibold text-white">
                    {item.programName}
                  </h3>
                </div>

                {/* Collapsed View */}
                <div className="px-4 pb-4">
                  {/* Desktop Column View */}
                  <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10">
                        <img
                          src={item.coinImage}
                          alt="token1"
                          className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                        />
                        {item.coin2Image && (
                          <img
                            src={item.coin2Image}
                            alt="token2"
                            className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {item.coinName}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(
                              item.tokenAddress,
                              `token-${item.id}`
                            );
                          }}
                          className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
                        >
                          <span>{item.tokenAddress.slice(0, 6)}...{item.tokenAddress.slice(-4)}</span>
                          {copiedAddress === `token-${item.id}` ? (
                            <CopyCheck size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Total Stake</div>
                      <div className="font-semibold">{programInfo?.totalPower}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">APR</div>
                      <div className={`font-semibold ${theme.text}`}>
                        {item.apr}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Reward</div>
                      <div className="font-semibold">{programInfo?.userPending}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Staked</div>
                      <div className="font-semibold">{programInfo?.userStaked}</div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Row View */}
                  <div className="md:hidden">
                    <div
                      className="cursor-pointer hover:bg-gray-800 transition-colors p-2 rounded-lg"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10">
                            <img
                              src={item.coinImage}
                              alt="token1"
                              className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                            />
                            {item.coin2Image && (
                              <img
                                src={item.coin2Image}
                                alt="token2"
                                className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                              />
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-white">
                              {item.coinName}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(
                                  item.tokenAddress,
                                  `token-${item.id}`
                                );
                              }}
                              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
                            >
                              <span>{item.tokenAddress}</span>
                              {copiedAddress === `token-${item.id}` ? (
                                <CopyCheck size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-400">
                            Total Stake
                          </div>
                          <div className="font-semibold">{programInfo?.totalPower}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">APR</div>
                          <div className={`font-semibold ${theme.text}`}>
                            {item.apr}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Reward</div>
                          <div className="font-semibold">{programInfo?.userPending}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Staked</div>
                          <div className="font-semibold">{programInfo?.userStaked}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {isExpanded && (
                  <div className="border-t border-gray-700 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Section 1: Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-white mb-4">
                          Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">APR:</span>
                            <span className={`font-semibold ${theme.text}`}>
                              {item.apr}
                            </span>
                          </div>
                          {item.commission && <div className="flex justify-between">
                            <span className="text-gray-400">Commission:</span>
                            <span className="font-semibold">
                              {item.commission}
                            </span>
                          </div>}
                          {programInfo?.rewardPerBlock && <div className="flex justify-between">
                            <span className="text-gray-400">Reward Per Token:</span>
                            <span className="font-semibold">
                              {programInfo?.rewardPerBlock} {item.rewardName}
                            </span>
                          </div>}

                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Staked:</span>
                            <span className="font-semibold">
                              {programInfo?.totalStaked} {item.coinName}
                            </span>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">
                              Token Contract:
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  item.tokenAddress,
                                  `contract-${item.id}`
                                )
                              }
                              className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                            >
                              <span>{item.tokenAddress.slice(0, 6)}...{item.tokenAddress.slice(-4)}</span>
                              {copiedAddress === `contract-${item.id}` ? (
                                <CopyCheck size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">
                              Program Contract:
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  item.programContract,
                                  `program-${item.id}`
                                )
                              }
                              className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                            >
                              <span>{item.programContract.slice(0, 6)}...{item.programContract.slice(-4)}</span>
                              {copiedAddress === `program-${item.id}` ? (
                                <CopyCheck size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Staking Reward */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-white mb-4">
                          Staking Reward
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Pending Reward:</span>
                            <span className="font-semibold">{programInfo?.userPending}</span>
                            <span className="text-xl">
                              <div className="relative w-7 h-7">
                                <img
                                  src={item.rewardLogo}
                                  alt="reward token"
                                  className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                                />
                              </div>
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Staked:</span>
                            <span className="font-semibold">{programInfo?.userStaked} {item.coinName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Staked/Staked Power */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-white mb-4">
                          {item.isNFT ? "Staked Power" : "Staked"}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Current:</span>
                            <span className="font-semibold">{programInfo?.userStaked}</span>
                          </div>

                          {/* Regular Token Actions */}
                          {!item.isNFT && (
                            <div className="flex space-x-2">
                              <button
                                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-80`}
                                onClick={() => openTokenPopup(item,programInfo)}
                              >
                                <Plus size={16} />
                                <span>Stake</span>
                              </button>
                              <button 
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                              onClick={() => handleUnstaked(item)}
                              >
                                <span>−</span>
                                <span>Unstake</span>
                              </button>
                            </div>
                          )}

                          {/* NFT Actions */}
                          {item.isNFT && (
                            <button
                              onClick={() => openLPPopup(item)}
                              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-80`}
                            >
                              <Plus size={16} />
                              <span>Add Position</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Strategy Section */}
                    {item.strategy && (
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <h4 className="font-semibold text-lg text-white mb-3">
                          Strategy
                        </h4>
                        <p className="text-gray-300">{item.strategy}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Popups */}
      {showPopup && selectedProgram && (
        <StakingLPPopup program={selectedProgram} theme={getTheme(selectedProgram.chain)} />
      )}
      {showTokenPopup && selectedProgram && (
        <StakingTokenPopup program={selectedProgram} theme={getTheme(selectedProgram.chain)} />
      )}
    </div>
  );
};

export default StakingList;