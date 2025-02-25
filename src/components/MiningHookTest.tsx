import React from 'react'
import { ByteArray, sha256, keccak256, createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains'
import { TestDaAbi } from './abi'

const publicClient = createPublicClient({ 
    chain: jbc,
    transport: http()
})

export default function MiningHookTest() {
    const mineBlock = (blockData: string, difficulty: string) => {
        const _nonce = Math.random() * (100 - 1) + 100
        let hash = ""
        const target = "0".repeat(Number(difficulty))
        const startTime = Date.now()
        for (let i = 0; i <= Number(mineForLoop) * 1000000; i++) {
            const nonce = _nonce + i
            hash = sha256((blockData + (nonce)) as unknown as ByteArray).slice(2)
            if (hash.startsWith(target)) {
                const endTime = Date.now()
                const elapsedTime = endTime - startTime
                setConsoleMsg(`✅ Block Mined! Nonce: ${nonce} \n Hash: ${hash} \n ⏳ Time Taken: ${(elapsedTime / 1000).toFixed(2)} seconds`)
                return { nonce, hash }
            }
        }
        const endTime = Date.now()
        const elapsedTime = endTime - startTime
        const hashRate = (Number(mineForLoop) * 1000000) / elapsedTime;
        setConsoleMsg(`❌ Block not found | ⚡ Hash Rate: ${Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(hashRate)}H/s`)
    }

    const [blockchain, setBlockchain] = React.useState<{
        miner?: string | undefined;
        blockNumber?: bigint | undefined;
        difficulty?: bigint | undefined;
        hashBlock?: string | undefined;
    }[]>()
    const [leaderboard, setLeaderboard] = React.useState<{ minerSort: string; value: number; }[]>()
    const [myName, setMyName] = React.useState('anon')
    const [consoleMsg, setConsoleMsg] = React.useState('Click Mine Button to Start')
    const [currBlock, setCurrBlock] = React.useState('0')
    const [difficulty, setDifficulty] = React.useState('0')
    const [mineForLoop, setMineForLoop] = React.useState('1')

    React.useEffect(() => {
        const thefetch = async () => {
            const blockNumber = Number(await publicClient.readContract({
                address: '0x5087e30Ce9307D1e087400B367C2eb1c6804f090',
                abi: TestDaAbi,
                functionName: 'currentBlock',
            }))
            setCurrBlock(String(blockNumber))
            const difficulty = Number(await publicClient.readContract({
                address: '0x5087e30Ce9307D1e087400B367C2eb1c6804f090',
                abi: TestDaAbi,
                functionName: 'currentDifficulty',
            }))
            setDifficulty(String(difficulty))

            const eventBlockchain = (await publicClient.getContractEvents({
                abi: TestDaAbi,
                address: '0x5087e30Ce9307D1e087400B367C2eb1c6804f090',
                eventName: 'Blockchain',
                fromBlock: BigInt(4961193),
                toBlock: 'latest',
            })).map((obj) => {
                return obj.args
            }).reverse()
            setBlockchain(eventBlockchain)

            const _leaderboard = Object.values(eventBlockchain.map((obj) => {
                return {minerSort: obj.miner?.toUpperCase() as unknown as string, value: 1} 
            }).reduce(
                (a: Record<string, { minerSort: string; value: number }>, b) => {
                    if (a[b.minerSort]) {
                        a[b.minerSort].value += b.value;
                    } else {
                        a[b.minerSort] = { minerSort: b.minerSort, value: b.value };
                    }
                    return a;
                },
                {}
            )).sort((a, b) => {return b.value - a.value})
            setLeaderboard(_leaderboard)
        }
        thefetch()
        setInterval(thefetch, 12000)
    }, [])
    
    const mining = async () => {
        const blockData = `Block-${currBlock}`
        const res = mineBlock(blockData, difficulty)
        if (res !== undefined) {
            try {
                console.log(Number(currBlock), res?.nonce, res?.hash)
                const response = await fetch("https://mining-hook-test.vercel.app/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        miner: myName,
                        blockNumber: Number(currBlock),
                        nonce: res?.nonce,
                        hash: res?.hash,
                    }),
                })
                const data = await response.json()
                console.log("Server Response:", data)
            } catch (error) {
                console.error("Error Submitting Block:", error)
            }
        }
    }
        
    return (
        <div className="w-full h-[100vh] gap-4 flex flex-col items-center justify-center pixel">
            <div className='w-full h-[400px] gap-2 flex flex-row justify-center'>
                <div className="w-1/4 bg-neutral-900 p-8 gap-1 flex flex-col items-start justify-start text-lg text-left overflow-scroll" style={{boxShadow: "6px 6px 0 #00000040"}}>
                    <span>Block solver</span>
                    <div className='p-2 gap-2 flex flex-row text-sm'>
                        <span className='w-[100px] text-gray-500'>Block</span>
                        <span className='w-[150px] text-gray-500'>Miner Signature</span>
                        <span className='w-[100px] text-gray-500'>Difficulty</span>
                    </div>
                    {blockchain !== undefined && 
                        <>  
                            {blockchain.map((obj) => {
                                return <div className='p-2 gap-2 flex flex-row text-sm'>
                                    <span className='w-[100px] text-gray-500'>Block-{String(obj.blockNumber)}</span>
                                    <span className='w-[150px]'>{obj.miner?.slice(0, 6) + '...' + obj.miner?.slice(-4)}</span>
                                    <span className='w-[100px]'>{String(obj.difficulty)}</span>
                                </div>
                            })}
                        </>
                    }
                </div>
                <div className="w-1/4 bg-neutral-900 p-8 gap-1 flex flex-col items-start justify-start text-lg text-left overflow-scroll" style={{boxShadow: "6px 6px 0 #00000040"}}>
                    <span>Leaderboard</span>
                    <div className='p-2 gap-2 flex flex-row text-sm'>
                        <span className='w-[100px] text-gray-500'>Rank</span>
                        <span className='w-[150px] text-gray-500'>Miner Signature</span>
                        <span className='w-[100px] text-gray-500'>Block Creation</span>
                    </div>
                    {leaderboard !== undefined && 
                        <>  
                            {leaderboard.map((obj, index) => {
                                return <div className='p-2 gap-2 flex flex-row text-sm'>
                                    <span className='w-[100px] text-gray-500'>{String(index + 1)}</span>
                                    <span className='w-[150px]'>{obj.minerSort?.slice(0, 6) + '...' + obj.minerSort?.slice(-4)}</span>
                                    <span className='w-[100px]'>{obj.value}</span>
                                </div>
                            })}
                        </>
                    }
                </div>
            </div>
            <div className="mt-5 text-2xl">Current Block: {currBlock}</div>
            <div className="text-2xl">Difficulty: {difficulty}</div>
            <div className='mt-5 w-full gap-3 flex flex-row items-center justify-center'>
                <span>MINER</span>
                <input className="px-6 py-2 bg-neutral-800 text-white text-sm leading-tight focus:outline-none" value={myName} onChange={(e) => setMyName(e.target.value)} />
                <span className='text-sm'>HASH SIGNATURE: {keccak256(myName as '0xstring').slice(0, 6).toUpperCase() + '...' + keccak256(myName as '0xstring').slice(-4).toUpperCase()}</span>
            </div>
            <div className='w-full gap-3 flex flex-row items-center justify-center'>
                <button className="w-[150px] px-2 py-2 bg-slate-900 text-sm hover:font-bold hover:bg-emerald-300" onClick={mining}>MINE FOR</button>
                <input className="w-[100px] px-6 py-2 bg-neutral-800 text-white text-sm leading-tight focus:outline-none" value={mineForLoop} onChange={(e) => setMineForLoop(e.target.value)} />
                <span>M NONCE</span>
            </div>
            <div className="w-1/3 h-[100px] p-8 flex items-center justify-center text-lg text-left" style={{boxShadow: "6px 6px 0 #00000040"}}>
                <div className='p-6 overflow-hidden ellipsis'>{consoleMsg}</div>
            </div>
        </div>
    )
}
