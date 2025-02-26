import React from 'react'
import { sha256, encodeAbiParameters, createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains'
import { type Config } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { FieldsHook002 } from './abi'

const publicClient = createPublicClient({ 
    chain: jbc,
    transport: http()
})

export default function MiningHook({ 
    config, setTxupdate, setErrMsg, nftIdMiner,
}: {
    config: Config,
    setTxupdate: React.Dispatch<React.SetStateAction<String | null>>,
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>,
    nftIdMiner: bigint | undefined,
}) {
    const mineBlock = (difficulty: number) => {
        const _nonce = (Math.random() * (100 - 1) + 100).toFixed(0)
        let hash = ""
        const target = BigInt(2 ** (256 - difficulty))
        const startTime = Date.now()
        for (let i = 0; i <= Number(mineForLoop) * 1000000; i++) {
            const nonce = _nonce + i
            hash = sha256(encodeAbiParameters(
                [
                  { name: 'x', type: 'uint256' },
                  { name: 'y', type: 'uint256' },
                ],
                [BigInt(currBlock), BigInt(nonce)]
            ));
            if (BigInt(hash) < target) {
                const endTime = Date.now()
                const elapsedTime = endTime - startTime
                setConsoleMsg(`✅ Block Mined! Nonce: ${nonce} \n Hash: ${hash} \n ⏳ Time Taken: ${(elapsedTime / 1000).toFixed(2)} seconds`)
                return { nonce, hash }
            }
        }
        const endTime = Date.now()
        const elapsedTime = endTime - startTime
        const hashRate = (Number(mineForLoop) * 1000000) / (elapsedTime / 1000);
        setConsoleMsg(`❌ Block not found | ⚡ Hash Rate: ${Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(hashRate)}H/s`)
    }

    const [blockchain, setBlockchain] = React.useState<{
        minerOwner?: `0x${string}` | undefined;
        nftIndex?: bigint | undefined;
        nftId?: bigint | undefined;
        solvedBlockNumber?: bigint | undefined;
        solvedBaseDifficulty?: bigint | undefined;
        solvedMinerDifficulty?: bigint | undefined;
        solvedHash?: `0x${string}` | undefined;
        elapsedTime?: bigint | undefined;
        blockReward?: bigint | undefined;
    }[]>()
    const [leaderboard, setLeaderboard] = React.useState<{ minerSort: string; value: number; }[]>()
    const [consoleMsg, setConsoleMsg] = React.useState('Chosse NFT Miner Before Start Mining')
    const [currBlock, setCurrBlock] = React.useState('0')
    const [difficulty, setDifficulty] = React.useState('0')
    const [mineForLoop, setMineForLoop] = React.useState('1')

    React.useEffect(() => {
        const thefetch = async () => {
            const blockNumber = Number(await publicClient.readContract({
                address: '0x8652549D215E3c4e30fe33faa717a566E4f6f00C',
                abi: FieldsHook002,
                functionName: 'currentBlock',
            }))
            setCurrBlock(String(blockNumber))
            const difficulty = Number(await publicClient.readContract({
                address: '0x8652549D215E3c4e30fe33faa717a566E4f6f00C',
                abi: FieldsHook002,
                functionName: 'currentDifficulty',
            }))
            setDifficulty(String(difficulty))

            const eventBlockchain = (await publicClient.getContractEvents({
                abi: FieldsHook002,
                address: '0x8652549D215E3c4e30fe33faa717a566E4f6f00C',
                eventName: 'BlockMined',
                fromBlock: BigInt(4968595),
                toBlock: 'latest',
            })).map((obj) => {
                return obj.args
            }).reverse()
            setBlockchain(eventBlockchain)

            const _leaderboard = Object.values(eventBlockchain.map((obj) => {
                return {minerSort: obj.minerOwner?.toUpperCase() as unknown as string, value: 1} 
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
        const minerDiff =  Number(difficulty) > ((Number(nftIdMiner) % 100000) / 100) ? Number(difficulty) - ((Number(nftIdMiner) % 100000) / 100) : 1
        const res = mineBlock(minerDiff)
        if (res !== undefined) {
            try {
                let { request } = await simulateContract(config, {
                    chainId: 8899,
                    address: '0x8652549D215E3c4e30fe33faa717a566E4f6f00C',
                    abi: FieldsHook002,
                    functionName: 'submitPoW',
                    args: [BigInt(2), nftIdMiner as bigint, BigInt(res.nonce), res.hash as '0xstring']
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            } catch (e) {
                setErrMsg(String(e))
            }
        }
    }
        
    return (
        <div className="w-full h-[80vh] gap-4 flex flex-col items-center justify-center pixel">
            <div className='w-full my-2 px-10 border-[0.5px] border-solid border-gray-800' />
            <div className='w-full h-[400px] gap-2 flex flex-row justify-center'>
                <div className="w-full xl:w-1/4 bg-neutral-900 p-8 gap-1 flex flex-col items-start justify-start text-lg text-left overflow-scroll" style={{boxShadow: "6px 6px 0 #00000040"}}>
                    <span>Block solver</span>
                    <div className='p-2 gap-2 flex flex-row text-sm'>
                        <span className='w-[100px] text-gray-500'>Block</span>
                        <span className='w-[150px] text-gray-500'>Miner Owner</span>
                        <span className='w-[100px] text-gray-500'>Difficulty</span>
                    </div>
                    {blockchain !== undefined && 
                        <>  
                            {blockchain.map((obj) => {
                                return <div className='p-2 gap-2 flex flex-row text-sm'>
                                    <span className='w-[100px] text-gray-500'>Block-{String(obj.solvedBlockNumber)}</span>
                                    <span className='w-[150px]'>{obj.minerOwner?.slice(0, 6) + '...' + obj.minerOwner?.slice(-4)}</span>
                                    <span className='w-[100px]'>{String(obj.solvedBaseDifficulty)}</span>
                                </div>
                            })}
                        </>
                    }
                </div>
                <div className="w-full xl:w-1/4 bg-neutral-900 p-8 gap-1 flex flex-col items-start justify-start text-lg text-left overflow-scroll" style={{boxShadow: "6px 6px 0 #00000040"}}>
                    <span>Leaderboard</span>
                    <div className='p-2 gap-2 flex flex-row text-sm'>
                        <span className='w-[100px] text-gray-500'>Rank</span>
                        <span className='w-[150px] text-gray-500'>Miner Owner</span>
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
            {nftIdMiner !== undefined &&
                <>
                    <div className='mt-5 w-full gap-3 flex flex-row items-center justify-center text-lg'>
                        <span>MINER ID:</span>
                        <span>{String(nftIdMiner)}</span>
                    </div>
                    <div className='w-full gap-3 flex flex-row items-center justify-center'>
                        <button className="w-[150px] px-2 py-2 bg-slate-900 text-sm hover:font-bold hover:bg-emerald-300" onClick={mining}>MINE FOR</button>
                        <input className="w-[100px] px-6 py-2 bg-neutral-800 text-white text-sm leading-tight focus:outline-none" value={mineForLoop} onChange={(e) => setMineForLoop(e.target.value)} />
                        <span>M NONCE</span>
                    </div>
                </>
            }
            <div className="w-full xl:w-1/3 h-[100px] p-8 flex items-center justify-center text-lg text-left" style={{boxShadow: "6px 6px 0 #00000040"}}>
                <div className='p-6 overflow-hidden ellipsis'>{consoleMsg}</div>
            </div>
            <div className='w-full my-2 px-10 border-[0.5px] border-solid border-gray-800' />
        </div>
    )
}
