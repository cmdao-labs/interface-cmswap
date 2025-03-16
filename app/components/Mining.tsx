'use client'
import React from 'react'
import { encodeAbiParameters, erc20Abi, formatEther, sha256 } from 'viem'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { FieldsHook002 } from '../lib/abi'
import { publicClient } from '@/app/lib/8899'
import { config } from '@/app/config'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Settings, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import WoodChoppingGame from './wood-chopping-game'

function Pickaxe({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M14 10l5.5-5.5a1.5 1.5 0 0 0-4-4L10 6" />
            <path d="M16 2l-6 6" />
            <path d="M9 10l-7 7a1 1 0 0 0 0 1.4l.6.6a1 1 0 0 0 1.4 0l7-7" />
            <path d="M17 14l-1 1" />
        </svg>
    )
}

export default function MiningWithGame({ setTxupdate, setErrMsg, setIsLoading, nftIdMiner, nftImgMiner, addr }: {
    setTxupdate: React.Dispatch<React.SetStateAction<string>>
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    nftIdMiner: bigint | undefined
    nftImgMiner: string | undefined
    addr: `0x${string}` | undefined
}) {
    const [isMining, setIsMining] = React.useState(false)
    const [showAdvanced, setShowAdvanced] = React.useState(false)
    const [miningProgress, setMiningProgress] = React.useState(0)
    const [shouldStopMining, setShouldStopMining] = React.useState(false)
    const [threadCount, setThreadCount] = React.useState(4)
    const [chunkSize, setChunkSize] = React.useState(25000)
    const [timeEstimates, setTimeEstimates] = React.useState({ iterationTime: "Calculating...", solutionTime: "Calculating..." })

    const formatEstimatedTime = (seconds: number) => {
        if (seconds < 60) {
            return `${Math.round(seconds)} seconds`
        } else if (seconds < 3600) {
            return `${Math.round(seconds / 60)} minutes`
        } else if (seconds < 86400) {
            return `${Math.round(seconds / 3600)} hours`
        } else {
            return `${Math.round(seconds / 86400)} days`
        }
    }

    const mineBlockChunked = async (difficulty: number) => {
        if (isMining) {
            setConsoleMsg("Mining already in progress...")
            return
        }
        setIsMining(true)
        setShouldStopMining(false)
        setMiningProgress(0)
        const estimatedHashRate = chunkSize * 20
        const targetDifficulty = 2 ** difficulty
        const estimatedTimeSeconds = targetDifficulty / estimatedHashRate
        const estimatedTimeFormatted = formatEstimatedTime(estimatedTimeSeconds)
        const estimatedIterationTime = formatEstimatedTime((Number(mineForLoop) * 1000000) / estimatedHashRate)
        setTimeEstimates({ iterationTime: estimatedIterationTime, solutionTime: estimatedTimeFormatted })
        setConsoleMsg(`Starting mining operation... at ~${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(estimatedHashRate)}H/s`)
        const _nonce = Number.parseInt((Math.random() * (100 - 1) + 100).toFixed(0))
        const target = difficulty <= 256 ? BigInt(2 ** (256 - difficulty)) : BigInt(1)
        const startTime = Date.now()
        const totalIterations = Number(mineForLoop) * 1000000
        const processChunk = async (currentIteration: number) => {
            const endIteration = Math.min(currentIteration + chunkSize, totalIterations)
            for (let i = currentIteration; i < endIteration; i++) {
                if (shouldStopMining) {
                    setConsoleMsg("Mining operation stopped by user")
                    setIsMining(false)
                    return
                }
                const nonce = _nonce + i
                const hash = sha256(
                    encodeAbiParameters(
                        [
                            { name: "x", type: "uint256" },
                            { name: "y", type: "uint256" }
                        ],
                        [BigInt(currBlock), BigInt(nonce)]
                    )
                )
                if (BigInt(hash) < target) {
                    setIsLoading(true)
                    const endTime = Date.now()
                    const elapsedTime = endTime - startTime
                    const hashRate = i / (elapsedTime / 1000)
                    setConsoleMsg(`✅ Block Mined! Nonce: ${nonce} | ⏳ Time Taken: ${(elapsedTime / 1000).toFixed(2)} seconds | ⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(hashRate)}H/s`)
                    try {
                        const { request } = await simulateContract(config, {
                            chainId: 8899,
                            address: "0x8339E417ED03cf4733f6FcFB9D295bE588fe2156",
                            abi: FieldsHook002,
                            functionName: "submitPoW",
                            args: [BigInt(1), nftIdMiner as bigint, BigInt(nonce), hash as `0x${string}`]
                        })
                        const h = await writeContract(config, request)
                        await waitForTransactionReceipt(config, { hash: h })
                        setTxupdate(h)
                    } catch (e) {
                        setErrMsg(String(e))
                    }
                    setIsMining(false)
                    setIsLoading(false)
                    return
                }
            }
            currentIteration = endIteration
            const progress = (currentIteration / totalIterations) * 100
            setMiningProgress(progress)
            if (currentIteration > 0) {
                const elapsedTime = (Date.now() - startTime) / 1000
                const currentHashRate = currentIteration / elapsedTime
                const remainingIterations = totalIterations - currentIteration
                const estimatedRemainingSeconds = remainingIterations / currentHashRate
                const estimatedTotalSeconds = 2 ** difficulty / currentHashRate
                const updatedIterationTime = formatEstimatedTime(estimatedRemainingSeconds)
                const updatedSolutionTime = formatEstimatedTime(estimatedTotalSeconds)
                setTimeEstimates({ iterationTime: updatedIterationTime, solutionTime: updatedSolutionTime })
                setConsoleMsg(`⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(currentHashRate)}H/s`)
            }
            if (currentIteration < totalIterations && !shouldStopMining) {
                // Allow UI to update before continuing
                setTimeout(() => processChunk(currentIteration), 0)
            } else {
                // We've processed all iterations without finding a solution
                if (!shouldStopMining) {
                    const endTime = Date.now()
                    const elapsedTime = endTime - startTime
                    const hashRate = totalIterations / (elapsedTime / 1000)
                    setConsoleMsg(`❌ Block not found | ⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(hashRate)}H/s`)
                }
                setIsMining(false)
            }
        }
        // Start processing from iteration 0
        processChunk(0)
    }

    // Multi-threaded approach using multiple setTimeout calls
    const mineBlockMultiThreaded = (difficulty: number) => {
        if (isMining) {
            setConsoleMsg("Mining already in progress...")
            return
        }
        setIsMining(true)
        setShouldStopMining(false)
        setMiningProgress(0)
        const estimatedHashRate = 5000 * 20 * threadCount
        const targetDifficulty = 2 ** difficulty
        const estimatedTimeSeconds = targetDifficulty / estimatedHashRate
        const estimatedTimeFormatted = formatEstimatedTime(estimatedTimeSeconds)
        const estimatedIterationTime = formatEstimatedTime((Number(mineForLoop) * 1000000) / estimatedHashRate)
        setTimeEstimates({ iterationTime: estimatedIterationTime, solutionTime: estimatedTimeFormatted})
        setConsoleMsg(`Starting mining operation (multi-threaded)... at ~${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(estimatedHashRate)}H/s`)
        const _nonce = Number.parseInt((Math.random() * (100 - 1) + 100).toFixed(0))
        const target = difficulty <= 256 ? BigInt(2 ** (256 - difficulty)) : BigInt(1)
        const startTime = Date.now()
        const totalIterations = Number(mineForLoop) * 1000000
        // Number of virtual "threads" to use
        const NUM_THREADS = threadCount
        const ITERATIONS_PER_THREAD = Math.ceil(totalIterations / NUM_THREADS)
        // Track progress across all threads
        let completedIterations = 0
        let foundSolution = false
        // Function to update progress
        const updateProgress = (iterations: number) => {
            completedIterations += iterations
            const progress = Math.min((completedIterations / totalIterations) * 100, 100)
            setMiningProgress(progress)
            // Update time estimates based on actual hash rate
            const elapsedTime = (Date.now() - startTime) / 1000
            if (elapsedTime > 0) {
                const currentHashRate = completedIterations / elapsedTime
                const remainingIterations = totalIterations - completedIterations
                const estimatedRemainingSeconds = remainingIterations / currentHashRate
                const estimatedTotalSeconds = 2 ** difficulty / currentHashRate
                const updatedIterationTime = formatEstimatedTime(estimatedRemainingSeconds)
                const updatedSolutionTime = formatEstimatedTime(estimatedTotalSeconds)
                setTimeEstimates({ iterationTime: updatedIterationTime, solutionTime: updatedSolutionTime })
                setConsoleMsg(
                `⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(currentHashRate)}H/s`)
            }
        }
        // Function to handle a successful mining result
        const handleSuccess = async (nonce: number, hash: string) => {
            if (foundSolution) return // Prevent multiple submissions
            foundSolution = true
            setIsLoading(true)
            const endTime = Date.now()
            const elapsedTime = endTime - startTime
            const hashRate = completedIterations / (elapsedTime / 1000)
            setConsoleMsg(`✅ Block Mined! Nonce: ${nonce} | ⏳ Time Taken: ${(elapsedTime / 1000).toFixed(2)} seconds | ⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(hashRate)}H/s`)
            try {
                const { request } = await simulateContract(config, {
                    chainId: 8899,
                    address: "0x8339E417ED03cf4733f6FcFB9D295bE588fe2156",
                    abi: FieldsHook002,
                    functionName: "submitPoW",
                    args: [BigInt(1), nftIdMiner as bigint, BigInt(nonce), hash as `0x${string}`]
                })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            } catch (e) {
                setErrMsg(String(e))
            }
            setShouldStopMining(true)
            setIsMining(false)
            setIsLoading(false)
        }
        // Function to handle completion of all threads
        const handleAllComplete = () => {
            if (foundSolution || shouldStopMining) return
            const endTime = Date.now()
            const elapsedTime = endTime - startTime
            const hashRate = completedIterations / (elapsedTime / 1000)
            setConsoleMsg(`❌ Block not found... ⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(hashRate)}H/s`)
            setIsMining(false)
        }
        // Track how many threads have completed
        let threadsCompleted = 0
        // Function to process a chunk of work in a "thread"
        const processThread = (threadId: number) => {
            const startIteration = threadId * ITERATIONS_PER_THREAD
            const endIteration = Math.min(startIteration + ITERATIONS_PER_THREAD, totalIterations)
            let currentIteration = startIteration
            const processChunk = () => {
                if (shouldStopMining || foundSolution) {
                    threadsCompleted++
                    if (threadsCompleted === NUM_THREADS) {
                        handleAllComplete()
                    }
                    return
                }
                const CHUNK_SIZE = 5000 // Process 5,000 hashes at a time
                const chunkEnd = Math.min(currentIteration + CHUNK_SIZE, endIteration)
                let iterationsProcessed = 0
                for (let i = currentIteration; i < chunkEnd; i++) {
                    iterationsProcessed++
                    // Check for stop condition more frequently (every 1000 iterations)
                    if (i % 1000 === 0 && shouldStopMining) {
                        threadsCompleted++
                        if (threadsCompleted === NUM_THREADS) {
                        handleAllComplete()
                        }
                        return
                    }
                    const nonce = _nonce + i
                    const hash = sha256(
                        encodeAbiParameters(
                            [
                                { name: "x", type: "uint256" },
                                { name: "y", type: "uint256" }
                            ],
                            [BigInt(currBlock), BigInt(nonce)]
                        ),
                    )
                    if (BigInt(hash) < target) {
                        handleSuccess(nonce, hash)
                        return
                    }
                }
                currentIteration = chunkEnd
                updateProgress(iterationsProcessed)
                if (currentIteration < endIteration && !shouldStopMining && !foundSolution) {
                    // Continue processing in the next tick
                    setTimeout(processChunk, 0)
                } else {
                    // This thread is done
                    threadsCompleted++
                    if (threadsCompleted === NUM_THREADS) {
                        handleAllComplete()
                    }
                }
            }
            // Start processing this thread
            setTimeout(processChunk, 0)
        }
        // Start all threads
        for (let i = 0; i < NUM_THREADS; i++) {
            processThread(i)
        }
    }

    const [blockchain, setBlockchain] = React.useState<{
        minerOwner?: `0x${string}` | undefined
        nftIndex?: bigint | undefined
        nftId?: bigint | undefined
        solvedBlockNumber?: bigint | undefined
        solvedBaseDifficulty?: bigint | undefined
        solvedMinerDifficulty?: bigint | undefined
        solvedHash?: `0x${string}` | undefined
        elapsedTime?: bigint | undefined
        blockReward?: bigint | undefined
    }[]>()
    const [leaderboard, setLeaderboard] = React.useState<{ minerSort: string; value: number }[]>()
    const [consoleMsg, setConsoleMsg] = React.useState("Choose NFT Miner Before Start Mining")
    const [currBlock, setCurrBlock] = React.useState("0")
    const [difficulty, setDifficulty] = React.useState("0")
    const [mineForLoop, setMineForLoop] = React.useState("1")
    const [woodBalance, setWoodBalance] = React.useState("0")
    const [useMultiThreaded, setUseMultiThreaded] = React.useState(true)

    React.useEffect(() => {
        const thefetch = async () => {
            const blockNumber = Number(await publicClient.readContract({
                address: "0x8339E417ED03cf4733f6FcFB9D295bE588fe2156",
                abi: FieldsHook002,
                functionName: "currentBlock"
            }))
            setCurrBlock(String(blockNumber))
            const difficulty = Number(await publicClient.readContract({
                address: "0x8339E417ED03cf4733f6FcFB9D295bE588fe2156",
                abi: FieldsHook002,
                functionName: "currentDifficulty"
            }))
            setDifficulty(String(difficulty))
            const eventBlockchain = (await publicClient.getContractEvents({
                abi: FieldsHook002,
                address: "0x8339E417ED03cf4733f6FcFB9D295bE588fe2156",
                eventName: "BlockMined",
                fromBlock: BigInt(5085341),
                toBlock: "latest"
            })).map(obj => {
                return obj.args
            }).reverse()
            setBlockchain(eventBlockchain)
            const _leaderboard = Object.values(eventBlockchain.map(obj => {
                return { minerSort: obj.minerOwner?.toUpperCase() as unknown as string, value: 1 }
            }).reduce((a: Record<string, { minerSort: string; value: number }>, b) => {
                if (a[b.minerSort]) {
                    a[b.minerSort].value += b.value
                } else {
                    a[b.minerSort] = { minerSort: b.minerSort, value: b.value }
                }
                return a
            }, {})).sort((a, b) => {
                return b.value - a.value
            })
            setLeaderboard(_leaderboard)
            setDifficulty(String(difficulty))
            const woodBal = formatEther(await publicClient.readContract({
                address: "0x8339E417ED03cf4733f6FcFB9D295bE588fe2156",
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [addr as `0x${string}`]
            }))
            setWoodBalance(woodBal)
        }
        thefetch()
        const interval = setInterval(thefetch, 20000)
        return () => clearInterval(interval)
    }, [addr])

    const mining = async () => {
        if (nftIdMiner === undefined) {
            setConsoleMsg("Please select a miner first")
            return
        }
        const minerDiff = Number(difficulty) > (Number(nftIdMiner) % 100000) / 1000 ? Number(difficulty) - (Number(nftIdMiner) % 100000) / 1000 : 1
        if (useMultiThreaded) {
            mineBlockMultiThreaded(minerDiff)
        } else {
            mineBlockChunked(minerDiff)
        }
    }

    const stopMining = () => {
        setShouldStopMining(true)
        setConsoleMsg("Stopping mining operation...")
        // Force mining to stop after a short delay if it doesn't stop naturally
        setTimeout(() => {
            if (isMining) {
              setIsMining(false)
              setShouldStopMining(false)
              setConsoleMsg("Mining operation forcefully stopped")
            }
        }, 1000)
    }

    return (
        <>
            <main className="container mx-auto p-4 md:p-6 mt-16 relative z-10">
                <div className="bg-black text-white font-mono">
                    <div className="relative">
                    <div className="mb-8">
                        <div className="block bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transition-transform hover:scale-[1.01] hover:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-900/30 border border-green-900/50 rounded-md flex items-center justify-center"><Pickaxe className="h-5 w-5 text-green-400" /></div>
                                    <div>
                                        <h3 className="text-lg font-medium">Solo Mining</h3>
                                        <p className="text-sm text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="h-[400px] bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                                <div className="p-3 border-b border-gray-800 flex items-center">
                                    <span className="w-1 h-4 bg-green-500 rounded-full mr-2" />
                                    <h3 className="text-sm font-medium">Recent Blocks</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-900">
                                                <th className="px-4 py-2 text-left text-xs text-gray-400">Block</th>
                                                <th className="px-4 py-2 text-left text-xs text-gray-400">Miner owner</th>
                                                <th className="px-4 py-2 text-left text-xs text-gray-400">Base difficulty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blockchain !== undefined &&
                                                <>
                                                    {blockchain.map((block, index) => (
                                                        <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/30">
                                                            <td className="px-4 py-2 text-sm">{block.solvedBlockNumber}</td>
                                                            <td className="px-4 py-2 text-sm font-mono text-green-400">{block.minerOwner?.slice(0, 6) + "..." + block.minerOwner?.slice(-4)}</td>
                                                            <td className="px-4 py-2 text-sm">{block.solvedBaseDifficulty}</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="h-[400px] bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                                <div className="p-3 border-b border-gray-800 flex items-center">
                                <span className="w-1 h-4 bg-yellow-500 rounded-full mr-2"></span>
                                <h3 className="text-sm font-medium">Miner Rankings</h3>
                                </div>
                                <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="bg-gray-900">
                                        <th className="px-4 py-2 text-left text-xs text-gray-400">Rank</th>
                                        <th className="px-4 py-2 text-left text-xs text-gray-400">Miner owner</th>
                                        <th className="px-4 py-2 text-left text-xs text-gray-400">Block creation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {leaderboard !== undefined &&
                                        <>
                                            {leaderboard.map((rank, index) => (
                                                <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/30">
                                                <td className="px-4 py-2 text-sm">
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs",
                                                            index === 0
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : index === 1
                                                                ? "bg-gray-500/20 text-gray-300"
                                                                : index === 2
                                                                ? "bg-amber-700/20 text-amber-600"
                                                                : "bg-gray-800",
                                                        )}
                                                    >
                                                        {String(index + 1)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-sm font-mono text-green-400">{rank.minerSort?.slice(0, 6) + "..." + rank.minerSort?.slice(-4)}</td>
                                                <td className="px-4 py-2 text-sm">{rank.value}</td>
                                                </tr>
                                            ))}
                                        </>
                                    }
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                                <div className="text-xs text-gray-400 mb-1">Reward Balance</div>
                                    <div className="flex items-center">
                                    <span className="text-xl font-light">{Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(Number(woodBalance))}</span>
                                    <span className="text-yellow-500 mx-2">⦿</span>
                                    <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={20} width={20} />
                                </div>
                            </div>
                            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                                <div className="text-xs text-gray-400 mb-1">Current Block</div>
                                <div className="text-xl font-light">{currBlock}</div>
                            </div>
                            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                                <div className="text-xs text-gray-400 mb-1">Base Difficulty</div>
                                <div className="text-xl font-light">{difficulty}</div>
                            </div>
                            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                                <div className="text-xs text-gray-400 mb-1">Miner Difficulty</div>
                                <div className="text-xl font-light">{nftIdMiner !== undefined ? (Number(difficulty) > (Number(nftIdMiner) % 100000) / 1000 ? Number(difficulty) - (Number(nftIdMiner) % 100000) / 1000 : 1) : '--'}</div>
                            </div>
                        </div>                      
                        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6">
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">Miner ID</div>
                                    <div className="text-sm font-mono">{nftIdMiner !== undefined ? String(nftIdMiner) : '--'}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        <div className="px-4 py-2 bg-green-700 rounded-l-md text-sm font-medium">MINE FOR</div>
                                        <input
                                            type="number"
                                            value={mineForLoop}
                                            onChange={(e) => setMineForLoop(e.target.value)}
                                            className="w-16 px-3 py-2 bg-gray-800 border-y border-r border-gray-700 rounded-r-md text-sm focus:outline-none"
                                        />
                                    </div>
                                    <div className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm">M NONCE</div>
                                    <div className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm flex items-center gap-2 cursor-pointer" onClick={() => setUseMultiThreaded(!useMultiThreaded)}><span className="w-2 h-2 rounded-full bg-green-500" />{useMultiThreaded ? "Using Multi-Threaded" : "Using Single-Threaded"}</div>
                                </div>
                                <div className="ml-auto">
                                    <button
                                        onClick={isMining ? stopMining : mining}
                                        className={cn(
                                            "px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer",
                                            isMining
                                                ? "bg-red-900/30 border border-red-900/50 text-red-400 hover:bg-red-900/40"
                                                : "bg-green-900/30 border border-green-900/50 text-green-400 hover:bg-green-900/40",
                                            )}
                                    >
                                        {isMining ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                        {isMining ? "Stop Mining" : "Start Mining"}
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer">
                                    <Settings className="h-4 w-4" />
                                    Advanced Settings
                                    {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {showAdvanced && 
                                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-400 mb-1 block">Thread Count</label>
                                            <select
                                                value={threadCount}
                                                onChange={(e) => setThreadCount(Number.parseInt(e.target.value))}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none"
                                            >
                                                <option value={2}>2</option>
                                                <option value={4}>4</option>
                                                <option value={8}>8</option>
                                                <option value={16}>16</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400 mb-1 block">Chunk Size</label>
                                            <select
                                                value={chunkSize}
                                                onChange={(e) => setChunkSize(Number.parseInt(e.target.value))}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none"
                                            >
                                                <option value={10000}>10000</option>
                                                <option value={25000}>25000</option>
                                                <option value={50000}>50000</option>
                                                <option value={100000}>100000</option>
                                            </select>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {isMining && 
                            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg">
                                <div className="p-4 gap-4 flex flex-col items-center justify-between">
                                    <Progress value={miningProgress} className="h-2 w-full" />
                                    <p className="text-center text-xs text-gray-400">{miningProgress.toFixed(1)}% complete</p>
                                </div>
                                <div className='px-4 pb-4 flex items-center justify-between'>
                                    <div className="flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4 animate-spin text-green-500" />
                                        <span className="text-sm">Mining in progress...</span>
                                    </div>
                                    <p className='my-2 text-sm text-green-400'>{consoleMsg}</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                        <div className="text-gray-400">Est. iteration time:</div>
                                        <div className="text-white">{timeEstimates.iterationTime}</div>
                                        <div className="text-gray-400">Est. time to solve:</div>
                                        <div className="text-white">{timeEstimates.solutionTime}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </main>
            {isMining && <WoodChoppingGame nftIdMiner={nftIdMiner} nftImgMiner={nftImgMiner} woodBalance={woodBalance} />}
        </>
    )
}
