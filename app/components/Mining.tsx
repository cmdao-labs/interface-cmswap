'use client'
import React from 'react'
import { encodeAbiParameters, erc20Abi, formatEther, sha256 } from 'viem'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { FieldsHook002 } from '../lib/abi'
import { publicClient } from '@/app/lib/8899'
import { config } from '@/app/config'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import WoodChoppingGame from './wood-chopping-game'

export default function MiningWithGame({ setTxupdate, setErrMsg, setIsLoading, nftIdMiner, nftImgMiner, addr }: {
    setTxupdate: React.Dispatch<React.SetStateAction<string>>
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    nftIdMiner: bigint | undefined
    nftImgMiner: string | undefined
    addr: `0x${string}` | undefined
}) {
    const [isMining, setIsMining] = React.useState(false)
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
                setConsoleMsg(`Mining in progress... ⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(currentHashRate)}H/s`)
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
                `Mining in progress... ⚡ Hash rate: ${Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(currentHashRate)}H/s`)
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
            <div className="w-full h-[95vh] rounded-lg overflow-hidden gap-4 flex flex-col items-center justify-start bg-neutral-900 text:xs xl:text-sm">
                <div className="w-full h-[400px] p-8 gap-6 flex flex-row flex-wrap justify-center bg-[url('https://gateway.commudao.xyz/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')] bg-cover overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                    <ScrollArea className="w-full xl:w-1/3 h-full p-4 bg-black/90">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Block</TableHead>
                                <TableHead>Miner owner</TableHead>
                                <TableHead className="text-right">Base difficulty</TableHead>
                            </TableRow>
                            </TableHeader>
                            {blockchain !== undefined && (
                                <TableBody>
                                    {blockchain.map((obj, index) => {return (
                                        <TableRow key={index}>
                                        <TableCell>{String(obj.solvedBlockNumber)}</TableCell>
                                        <TableCell>{obj.minerOwner?.slice(0, 6) + "..." + obj.minerOwner?.slice(-4)}</TableCell>
                                        <TableCell className="text-right">{String(obj.solvedBaseDifficulty)}</TableCell>
                                        </TableRow>
                                    )})}
                                </TableBody>
                            )}
                        </Table>
                    </ScrollArea>
                    <ScrollArea className="w-full xl:w-1/3 h-full p-4 bg-black/90">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Rank</TableHead>
                                <TableHead>Miner owner</TableHead>
                                <TableHead className="text-right">Block creation</TableHead>
                            </TableRow>
                            </TableHeader>
                            {leaderboard !== undefined && (
                                <TableBody>
                                    {leaderboard.map((obj, index) => {return (
                                        <TableRow key={index}>
                                        <TableCell>{String(index + 1)}</TableCell>
                                        <TableCell>{obj.minerSort?.slice(0, 6) + "..." + obj.minerSort?.slice(-4)}</TableCell>
                                        <TableCell className="text-right">{obj.value}</TableCell>
                                        </TableRow>
                                    )})}
                                </TableBody>
                            )}
                        </Table>
                    </ScrollArea>
                </div>
                <div className="w-2/3 gap-4 xl:gap-10 flex flex-row flex-wrap items-center justify-center text-gray-500">
                    <div className='gap-2 flex flex-row'>
                        <span>
                            Reward Balance:{" "}
                            <span className="text-white">{Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(Number(woodBalance))}</span>
                        </span>
                        <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={20} width={20} />
                    </div>
                    <div>Current Block: <span className="text-white">{currBlock}</span></div>
                    <div>Base Difficulty: <span className="text-white">{difficulty}</span></div>
                </div>
                {nftIdMiner !== undefined && (
                    <>
                        <div className="my-3 w-2/3 gap-4 xl:gap-10 flex flex-row flex-wrap items-center justify-center text-gray-500">
                            <div className="gap-3 flex flex-row items-center justify-center">
                                <span>MINER ID:</span>
                                <span>{String(nftIdMiner)}</span>
                            </div>
                            <div>
                                Miner Difficulty:{" "}
                                <span className="text-white">{Number(difficulty) > (Number(nftIdMiner) % 100000) / 1000 ? Number(difficulty) - (Number(nftIdMiner) % 100000) / 1000 : 1}</span>
                            </div>
                        </div>
                        <div className="w-full gap-2 flex flex-row items-center justify-center">
                            {!isMining ? 
                                <>
                                    <Button className="cursor-pointer hover:bg-emerald-300" onClick={mining}>MINE FOR</Button>
                                    <input
                                        className="w-[100px] px-6 py-2 bg-neutral-800 text-white text-sm leading-tight focus:outline-none"
                                        value={mineForLoop}
                                        onChange={(e) => setMineForLoop(e.target.value)}
                                    />
                                    <span className="text-gray-500">M NONCE</span>
                                    <Button variant="outline" size="sm" className="ml-4" onClick={() => setUseMultiThreaded(!useMultiThreaded)}>
                                        {useMultiThreaded ? "Using Multi-Threaded" : "Using Single-Threaded"}
                                    </Button>
                                </> : 
                                <Button className="cursor-pointer hover:bg-red-300 bg-red-500" onClick={stopMining}>STOP MINING</Button>
                            }
                        </div>
                        <div className="w-full max-w-md p-4 bg-black/50 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">Advanced Settings</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Thread Count</label>
                                    <select
                                        className="w-full bg-neutral-800 text-white text-sm p-1 rounded"
                                        value={threadCount}
                                        onChange={e => setThreadCount(Number(e.target.value))}
                                        disabled={isMining}
                                    >
                                        {[2, 4, 6, 8, 12, 16].map((count) => (<option key={count} value={count}>{count}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Chunk Size</label>
                                    <select
                                        className="w-full bg-neutral-800 text-white text-sm p-1 rounded"
                                        value={chunkSize}
                                        onChange={(e) => setChunkSize(Number(e.target.value))}
                                        disabled={isMining}
                                    >
                                        {[10000, 25000, 50000, 100000].map((size) => (<option key={size} value={size}>{size}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {isMining && (
                            <div className="w-2/3 space-y-2">
                                <Progress value={miningProgress} className="h-2 w-full" />
                                <p className="text-center text-xs text-gray-400">{miningProgress.toFixed(1)}% complete</p>
                            </div>
                        )}
                    </>
                )}
                <div className="w-full max-w-md py-2 px-4 bg-black/70 rounded-lg">
                    <p className='my-2'>{consoleMsg}</p>
                    {isMining &&
                        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                            <div className="text-gray-400">Est. iteration time:</div>
                            <div className="text-white">{timeEstimates.iterationTime}</div>
                            <div className="text-gray-400">Est. time to solve:</div>
                            <div className="text-white">{timeEstimates.solutionTime}</div>
                        </div>
                    }
                </div>
            </div>
            {isMining && <WoodChoppingGame nftIdMiner={nftIdMiner} nftImgMiner={nftImgMiner} woodBalance={woodBalance} />}
        </>
    )
}
