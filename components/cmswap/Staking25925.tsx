import React, { useState } from "react";
import { Copy, Plus, CopyCheck, ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/button'
import { stakingV2ABI } from "@/lib/abi";
import { config } from '@/config/reown'
import { readContracts, type WriteContractErrorType } from '@wagmi/core'
import { ADDRESS_ZERO } from "@uniswap/v3-sdk";
import { useAccount } from 'wagmi'
import { formatEther } from 'viem'
import Link from "next/link"
import { redirect } from 'next/navigation';
import { chains } from '@/lib/chains'

type ChainConfig = {
    chain: any;
    chainId: number;
    explorer: string;
    rpc: string;
    blocktime: number;
    tokens: any;
    lib: any;
};

const chain25925 = chains[25925]

const chainConfigs: Record<number, ChainConfig> = {
    25925: {
        chain: chain25925.chain,
        chainId: 25925,
        explorer: 'https://testnet.kubscan.com/',
        rpc: 'https://rpc-testnet.bitkubchain.io',
        blocktime: 5,
        tokens: chain25925.tokens,
        lib: {
            erc20ABI: chain25925.erc20ABI,
            positionManagerContract: chain25925.positionManagerContract,
            positionManagerAddr: chain25925.POSITION_MANAGER,
            v3FactoryContract: chain25925.v3FactoryContract,
            StakingFactoryV2Contract: chain25925.StakingFactoryV2Contract,
            StakingFactoryV3Contract: chain25925.StakingFactoryV3Contract,
            StakingV2: chain25925.StakingV2ABI,
            StakingV3: chain25925.StakingV3ABI,
        },
    },
};

const StakingList = ({ setIsLoading, setErrMsg }: {
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
    const [stakeAmount, setStakeAmount] = useState<string>("");

    const [programList, setProgramList] = useState<{
        name: string;
        rewardToken: string;
        programContract: string;
        stakedToken: string;
        tokenA: string;
        tokenB: string;
        fees: bigint;
        rewardPerBlock: string;
        totalPower: string;
        lockDurations: any[];
        powerMultipliers: any[];
        currentBlock: bigint;
        startBlock: bigint;
        endBlock: bigint;
        userStaked: string;
        userPending: string;
        userPower: string;
        userStakedTimeStamp: bigint;
        userLockOption: bigint;
        userStakeTokenBalance: string;
        block: number;
        isNFT: boolean;
    }[] | null>(null);
    const [lockOption, setLockOption] = useState<number>(0);
    const { chainId, address } = useAccount();
    const [filter, setFilter] = useState('all');

    const filteredPrograms = programList ? 
        filter === 'all' ? programList : programList.filter((item) => Number(item.userStaked) > 0) : 
        [];
    const selectedChainConfig = chainConfigs[chainId || 25925];
    const { chain, rpc, blocktime, tokens, lib } = selectedChainConfig;

    const renderPrograms = async () => {
        const renderV2 = async () => {
            try {
                let result0 = await readContracts(config, { contracts: [{ ...lib.StakingFactoryV2Contract, functionName: 'getProjectsCount' }] })
                let totalProjects = Number(result0[0].result)
                let round = totalProjects / 50;
                let projectLists = []
                for (let i = 0; i < round; i++) {
                    let resultProject = await readContracts(config, {contracts: [{...lib.StakingFactoryV2Contract, functionName: 'getProjects', args: [BigInt(i), 50]}]});
                    if (resultProject && Array.isArray(resultProject[0]?.result)) projectLists.push(...(resultProject[0].result as string[]));
                }
                let poolInfoList = [];
                for (let i = 0; i < projectLists.length; i++) {
                    const poolStatus = await readContracts(config, {
                        contracts: [
                            { abi: stakingV2ABI, address: projectLists[i] as '0xstring', functionName: 'getPoolInfo' },
                            { abi: stakingV2ABI, address: projectLists[i] as '0xstring', functionName: 'getUserAllStakes', args: [address as `0x${string}`] },
                            { abi: stakingV2ABI, address: projectLists[i] as '0xstring', functionName: 'getUserPendingReward', args: [address as `0x${string}`] },
                            { abi: stakingV2ABI, address: projectLists[i] as '0xstring', functionName: 'totalPower' },
                        ]
                    })
                    if (poolStatus !== undefined) {
                        console.log("V2poolStatus", poolStatus);
                        poolInfoList.push({
                        name: poolStatus?.[0]?.result?.name ?? "Unknown Pool",
                        rewardToken: poolStatus?.[0]?.result?.rewardToken ?? ADDRESS_ZERO,
                        stakedToken: poolStatus?.[0]?.result?.positionManagerOrStaking ?? ADDRESS_ZERO,
                        programContract: projectLists[i],
                        tokenA: ADDRESS_ZERO,
                        tokenB: ADDRESS_ZERO,
                        fees: BigInt(0),
                        rewardPerBlock: formatEther(BigInt(poolStatus?.[0]?.result?.rewardPerBlock ?? 0)),
                        totalPower: formatEther(BigInt(poolStatus?.[0]?.result?.totalPower ?? 0)),
                        lockDurations: /* (poolStatus?.[0]?.result?.[5] as any[]) ?? */[],
                        powerMultipliers: /* (poolStatus?.[0]?.result?.[6] as any[]) ?? */[],
                        currentBlock: poolStatus?.[0]?.result?.currentBlock ?? BigInt(0),
                        startBlock: poolStatus?.[0]?.result?.startBlock ?? BigInt(0),
                        endBlock: poolStatus?.[0]?.result?.endBlock ?? BigInt(0),
                        userStaked: formatEther(BigInt(/* poolStatus?.[1]?.result?.[0]  ?? */ 0)),
                        userPending: formatEther(BigInt(poolStatus?.[2]?.result ?? 0)),
                        userPower: formatEther(BigInt(/* poolStatus?.[1]?.result?.[2] ?? */ 0)),
                        userStakedTimeStamp: poolStatus?.[1]?.result?.[3] ?? BigInt(0),
                        userLockOption: poolStatus?.[1]?.result?.[4] ?? BigInt(0),
                        userStakeTokenBalance: formatEther(BigInt(poolStatus?.[3]?.result ?? 0)),
                        block: blocktime ?? 0,
                        isNft: false
                        });
                    }
                }
                setProgramList((prev: any) => [...(prev || []), ...poolInfoList]);
            } catch (error) {
                console.error("Error on rendering token staking service", error)
            }
        }
        renderV2();
    }

    React.useEffect(() => {renderPrograms();}, []);

    type ChainName = 96 | 10143 | 56 | 3501 | 25925;
    const chainThemes: Record<ChainName, {
        primary: string;
        secondary: string;
        accent: string;
        border: string;
        bg: string;
        text: string;
    }> = {
        96: {
            primary: "rgb(34, 197, 94)", // green-500
            secondary: "rgb(22, 163, 74)", // green-600
            accent: "rgb(187, 247, 208)", // green-200
            border: "border-green-500",
            bg: "bg-green-500/10",
            text: "text-green-400",
        },
        25925: {
            primary: "rgb(34, 197, 94)", // green-500
            secondary: "rgb(22, 163, 74)", // green-600
            accent: "rgb(187, 247, 208)", // green-200
            border: "border-green-500",
            bg: "bg-green-500/10",
            text: "text-green-400",
        },
        10143: {
            primary: "rgb(147, 51, 234)", // purple-600
            secondary: "rgb(126, 34, 206)", // purple-700
            accent: "rgb(221, 214, 254)", // purple-200
            border: "border-purple-500",
            bg: "bg-purple-500/10",
            text: "text-purple-400",
        },
        56: {
            primary: "rgb(234, 179, 8)", // yellow-500
            secondary: "rgb(202, 138, 4)", // yellow-600
            accent: "rgb(254, 240, 138)", // yellow-200
            border: "border-yellow-500",
            bg: "bg-yellow-500/10",
            text: "text-yellow-400",
        },
        3501: {
            primary: "rgb(239, 68, 68)", // red-500
            secondary: "rgb(220, 38, 38)", // red-600
            accent: "rgb(254, 202, 202)", // red-200
            border: "border-red-500",
            bg: "bg-red-500/10",
            text: "text-red-400",
        },
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedAddress(type);
        setTimeout(() => setCopiedAddress(""), 800);
    };

    const getTheme = (chain: number) => chainThemes[(chain as ChainName)] ?? chainThemes[96];

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

    const StakingLPPopup = ({ program, theme }: { program: any; theme: typeof chainThemes[96] }) => (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
            <div className=" rounded-xl p-6 max-w-md w-full border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Add Staking Power</h3>
                    <button onClick={closePopups} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="relative w-10 h-10">
                            <img src={program.coinImage} alt="token1" className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0" />
                            {program.coin2Image && <img src={program.coin2Image} alt="token2" className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0" />}
                        </div>
                    <div>
                        <h4 className="font-semibold text-white">{program.coinName}</h4>
                        <p className="text-sm text-gray-400">{program.programName}</p>
                    </div>
                </div>
                <div className="text-sm text-gray-400">APR: <span className={`font-semibold ${theme.text}`}>{program.apr}</span></div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select NFT Position</label>
                        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
                            <option>Position #1234 - {program.coinName}</option>
                            <option>Position #5678 - {program.coinName}</option>
                        </select>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={closePopups} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border}`}>Cancel</button>
                        <button className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors" style={{ backgroundColor: theme.primary }}>Add Position</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const StakingTokenPopup = ({ program, theme }: { program: any; theme: typeof chainThemes[96] }) => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Stake Token</h3>
                    <button onClick={closePopups} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="relative w-10 h-10">
                            <img src={program.coinImage} alt="token" className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">{program.coinName}</h4>
                            <p className="text-sm text-gray-400">{program.programName}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">APR: <span className={`font-semibold ${theme.text}`}>{program.apr}</span></div>
                </div>
                <div className="space-y-4">
                    {programInfo.lockDurations && programInfo.lockDurations.length === 1 && (
                        <div>
                            <div className="text-sm text-gray-300">Lock Period: <span className="font-semibold">{programInfo.lockDurations / 86400} Days</span></div>
                            <div className="text-sm text-gray-300">Unlock at: <span className="text-gray-400">{getUnlockDate(programInfo.lockDurations / 86400).toLocaleString()}</span></div>
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
                                        <button key={index} onClick={() => setLockOption(index)} className={`px-3 py-1 rounded-lg text-sm font-medium ${lockOption === index ? theme.primary : theme.bg} ${theme.text} border ${theme.border}`}>
                                            {durationNum / 86400} Days ({multiplier.toFixed(2)}x)
                                        </button>
                                    );
                                })}
                            </div>
                            Unlock at:{" "}
                            <span className="text-gray-400">{getUnlockDate(Number(programInfo.lockDurations[lockOption]) / 86400).toLocaleString()}</span>
                        </>
                    )}
                    <div className="space-y-2">
                        <div className="text-sm">Available: <span className="text-green-400">{programInfo.userStakeTokenBalance} {program.coinName}</span></div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Stake:</span>
                            <input type="text" autoFocus value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} className="w-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm" placeholder="0.0" />
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={closePopups} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border}`}>Cancel</button>
                        <button className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors" style={{ backgroundColor: theme.primary }} onClick={() => {const parsedAmount = BigInt(Math.floor(Number(stakeAmount) * 1e18));}}>Stake</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen  min-w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 mt-[60px] md:mt-[120px]">
                    <h2 className="text-2xl font-bold">Staking Programs</h2>
                    <Button variant="outline" className="font-mono h-auto rounded text-xs flex flex-col bg-[#162638] text-[#00ff9d] border border-[#00ff9d]/20" onClick={() => setShowPopup(true)}>
                        <Link href="/earn/create" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono"><span >Create Staking Program</span></Link>
                    </Button>
                </div>
                <div className="flex items-center gap-4 mb-6">
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`} onClick={() => setFilter('all')}>All</button>
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${filter === 'myPrograms' ? 'bg-green-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`} onClick={() => setFilter('myPrograms')}>My Programs</button>
                </div>
                <div className="space-y-4">
                    {filteredPrograms !== null && filteredPrograms.length > 0 ?
                        (filteredPrograms.map((item, index) => {
                            const theme = getTheme(Number(chainId));
                            const programInfo = stakingInfos[index];
                            const stakeInfo = tokens.find((t: any) => t.value.toLowerCase() === item.stakedToken.toLowerCase()) ;
                            const tokenAInfo = tokens.find((t: any) => t.value.toLowerCase() === item.tokenA.toLowerCase());
                            const tokenBInfo = item.tokenB ? tokens.find((t: any) => t.value.toLowerCase() === item.tokenB.toLowerCase()) : null;
                            const rewardInfo = item.rewardToken ? tokens.find((t: any) => t.value.toLowerCase() === item.rewardToken.toLowerCase()) : null;
                            const isExpanded = false

                            return (
                                <div key={index} className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative w-10 h-10">
                                                    <img src={tokenAInfo?.logo || stakeInfo?.logo} alt="token1" className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0" />
                                                    {tokenBInfo?.logo && <img src={tokenBInfo?.logo} alt="token2" className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">{stakeInfo?.name}</h3>
                                                    <button onClick={(e) => {e.stopPropagation(); copyToClipboard(item.stakedToken, `token-${index}`);}} className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white">
                                                        <span>{item.stakedToken.slice(0, 6)}...{item.stakedToken.slice(-4)}</span>
                                                        {copiedAddress === `token-${index}` ? <CopyCheck size={12} /> : <Copy size={12} />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-400">Total Stake</div>
                                                <div className="font-semibold">{programInfo?.totalPower}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-400">APR</div>
                                                <div className={`font-semibold ${theme.text}`}>{Number(item.rewardPerBlock) * (86400 / blocktime) * 365}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-400">Reward</div>
                                                <div className="font-semibold">{item.userPending}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-gray-400">Staked</div>
                                                <div className="font-semibold">{item.userStaked}</div>
                                            </div>
                                            <div className="flex justify-center">
                                                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors" onClick={() => {redirect(`earn/program?chainId=${chainId}&program=${item.programContract}&type=${item.isNFT ? "nft" : "erc20"}`);}}>
                                                    <ExternalLink size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {isExpanded && (
                                        <div className="border-t border-gray-700 p-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-lg text-white mb-4">Details</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">APR:</span>
                                                            <span className={`font-semibold ${theme.text}`}>{item.rewardPerBlock}</span>
                                                        </div>
                                                        {item.lockDurations && <div className="flex justify-between"><span className="text-gray-400">Commission:</span><span /></div>}
                                                        {programInfo?.rewardPerBlock && <div className="flex justify-between">
                                                            <span className="text-gray-400">Reward Per Token:</span>
                                                            <span className="font-semibold">{programInfo?.rewardPerBlock} {rewardInfo?.name}</span>
                                                        </div>}
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Total Staked:</span>
                                                            <span className="font-semibold">{item?.userStaked} {tokenAInfo?.name}</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-400 mb-1">Token Contract:</div>
                                                            <button onClick={() => copyToClipboard(item.tokenA, `contract-${index}`)} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white">
                                                                <span>{item.tokenA.slice(0, 6)}...{item.tokenA.slice(-4)}</span>
                                                                {copiedAddress === `contract-${index}` ? <CopyCheck size={12} /> : <Copy size={12} />}
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-400 mb-1">Program Contract:</div>
                                                            <button onClick={() => copyToClipboard(item.tokenA, `program-${index}`)} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white">
                                                                <span>{item.tokenA.slice(0, 6)}...{item.tokenA.slice(-4)}</span>
                                                                {copiedAddress === `program-${index}` ? <CopyCheck size={12} /> : <Copy size={12} />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-lg text-white mb-4">Staking Reward</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-gray-400">Pending Reward:</span>
                                                            <span className="font-semibold">{programInfo?.userPending}</span>
                                                            <span className="text-xl">
                                                                <div className="relative w-7 h-7">
                                                                    <img src={rewardInfo?.logo} alt="reward token" className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0" />
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Staked:</span>
                                                            <span className="font-semibold">{programInfo?.userStaked} {rewardInfo?.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 />
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-400">Current:</span>
                                                            <span className="font-semibold">{programInfo?.userStaked}</span>
                                                        </div>
                                                        {!item.fees && (
                                                            <div className="flex space-x-2">
                                                                <button className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-80`} onClick={() => openTokenPopup(item, programInfo)}>
                                                                    <Plus size={16} />
                                                                    <span>Stake</span>
                                                                </button>
                                                                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600">
                                                                    <span>−</span>
                                                                    <span>Unstake</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                        {item.fees && (
                                                            <button onClick={() => openLPPopup(item)} className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-80`}>
                                                                <Plus size={16} />
                                                                <span>Add Position</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {item?.name && (
                                                <div className="mt-8 pt-6 border-t border-gray-700">
                                                    <h4 className="font-semibold text-lg text-white mb-3">Strategy</h4>
                                                    <p className="text-gray-300">{item?.name}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })) :
                        <p>No programs found.</p>
                    }
                </div>
            </div>
            {showPopup && selectedProgram && <StakingLPPopup program={selectedProgram} theme={getTheme(selectedProgram.chain)} />}
            {showTokenPopup && selectedProgram && <StakingTokenPopup program={selectedProgram} theme={getTheme(selectedProgram.chain)} />}
        </div>
    );
};

export default StakingList;
