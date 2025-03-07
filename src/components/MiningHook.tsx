import React from 'react'
import { sha256, encodeAbiParameters, createPublicClient, http, erc20Abi, formatEther } from 'viem'
import { jbc } from 'viem/chains'
import { type Config } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { FieldsHook002 } from './abi'

const publicClient = createPublicClient({ 
    chain: jbc,
    transport: http()
})

export default function MiningHook({ 
    config, setTxupdate, setErrMsg, nftIdMiner, addr,
}: {
    config: Config,
    setTxupdate: React.Dispatch<React.SetStateAction<String | null>>,
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>,
    nftIdMiner: bigint | undefined,
    addr: `0x${string}` | undefined,
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
                const hashRate = (Number(mineForLoop) * 1000000) / (elapsedTime / 1000)
                setConsoleMsg(`✅ Block Mined! Nonce: ${nonce} | ⏳ Time Taken: ${(elapsedTime / 1000).toFixed(2)} seconds | ⚡ Hash Rate: ${Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(hashRate)}MH/s`)
                return { nonce, hash }
            }
        }
        const endTime = Date.now()
        const elapsedTime = endTime - startTime
        const hashRate = (Number(mineForLoop) * 1000000) / (elapsedTime / 1000)
        setConsoleMsg(`❌ Block not found | ⚡ Hash Rate: ${Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(hashRate)}MH/s`)
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
    const [consoleMsg, setConsoleMsg] = React.useState('Choose NFT Miner Before Start Mining')
    const [currBlock, setCurrBlock] = React.useState('0')
    const [difficulty, setDifficulty] = React.useState('0')
    const [mineForLoop, setMineForLoop] = React.useState('1')
    const [woodBalance, setWoodBalance] = React.useState('0')

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
            setDifficulty(String(difficulty))

            const woodBal = formatEther(await publicClient.readContract({
                address: '0x8652549D215E3c4e30fe33faa717a566E4f6f00C',
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [addr as '0xstring']
            }))
            setWoodBalance(woodBal)
        }
        thefetch()
        setInterval(thefetch, 20000)
    }, [addr])
    
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
        <div className="w-full h-[100vh] rounded-lg gap-5 flex flex-col items-center justify-start pixel bg-neutral-900 text:xs xl:text-lg">
            <div className="w-full h-[500px] p-8 gap-6 flex flex-row flex-wrap justify-center bg-[url('https://gateway.commudao.xyz/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')] bg-cover overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                <div className="w-full xl:w-1/3 h-full bg-slate-900 p-8 gap-1 flex flex-col items-start justify-start text-left overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500" style={{boxShadow: "6px 6px 0 #00000040"}}>
                    <span>Block solver</span>
                    <div className='w-full p-1 xl:p-2 gap-3 flex flex-row text-xs xl:text-sm'>
                        <span className='w-1/5 text-gray-500'>Block</span>
                        <span className='w-1/3 text-gray-500'>Miner Owner</span>
                        <span className='w-1/4 text-gray-500 text-right'>Difficulty</span>
                    </div>
                    {blockchain !== undefined && 
                        <>  
                            {blockchain.map((obj) => {
                                return <div className='w-full p-1 xl:p-2 gap-3 flex flex-row text-xs xl:text-sm'>
                                    <span className='w-1/5 text-gray-500'>{String(obj.solvedBlockNumber)}</span>
                                    <span className='w-1/3'>{obj.minerOwner?.slice(0, 6) + '...' + obj.minerOwner?.slice(-4)}</span>
                                    <span className='w-1/4 text-right'>{String(obj.solvedBaseDifficulty)}</span>
                                </div>
                            })}
                        </>
                    }
                </div>
                <div className="w-full xl:w-1/3 h-full bg-slate-900 p-8 gap-1 flex flex-col items-start justify-start text-xs xl:text-lg text-left overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500" style={{boxShadow: "6px 6px 0 #00000040"}}>
                    <span>Leaderboard</span>
                    <div className='w-full p-1 xl:p-2 gap-3 flex flex-row text-xs xl:text-sm'>
                        <span className='w-1/5 text-gray-500'>Rank</span>
                        <span className='w-1/3 text-gray-500'>Miner Owner</span>
                        <span className='w-1/4 text-gray-500 text-right'>Block Creation</span>
                    </div>
                    {leaderboard !== undefined && 
                        <>  
                            {leaderboard.map((obj, index) => {
                                return <div className='w-full p-1 xl:p-2 gap-3 flex flex-row text-xs xl:text-sm'>
                                    <span className='w-1/5 text-gray-500'>{String(index + 1)}</span>
                                    <span className='w-1/3'>{obj.minerSort?.slice(0, 6) + '...' + obj.minerSort?.slice(-4)}</span>
                                    <span className='w-1/4 text-right'>{obj.value}</span>
                                </div>
                            })}
                        </>
                    }
                </div>
            </div>
            <div className="gap-2 flex flex-row items-center">
                <span>Reward Balance: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(woodBalance))}</span>
                <img src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={20} width={20} alt="$WOOD"/>
            </div>
            <div className="w-2/3 gap-4 xl:gap-10 flex flex-row flex-wrap items-center justify-center text-gray-500">
                <span>Current Block: {currBlock}</span>
                <span>Base Difficulty: {difficulty}</span>
            </div>
            {nftIdMiner !== undefined &&
                <>
                    <div className="my-3 w-2/3 gap-4 xl:gap-10 flex flex-row flex-wrap items-center justify-center text-gray-500">
                        <div className='gap-3 flex flex-row items-center justify-center'>
                            <span>MINER ID:</span>
                            <span>{String(nftIdMiner)}</span>
                        </div>
                        <span>Miner Difficulty: {Number(difficulty) > ((Number(nftIdMiner) % 100000) / 100) ? Number(difficulty) - ((Number(nftIdMiner) % 100000) / 100) : 1}</span>
                    </div>
                    <div className='w-full gap-3 flex flex-row items-center justify-center'>
                        <button className="w-[150px] px-2 py-2 bg-slate-800 text-sm hover:font-bold hover:bg-emerald-300" onClick={mining}>MINE FOR</button>
                        <input className="w-[100px] px-6 py-2 bg-neutral-800 text-white text-sm leading-tight focus:outline-none" value={mineForLoop} onChange={(e) => setMineForLoop(e.target.value)} />
                        <span className='text-gray-500'>M NONCE</span>
                    </div>
                </>
            }
            <div className="w-3/4 xl:w-1/3 h-[100px] p-8 flex items-center justify-center text-left bg-black" style={{boxShadow: "6px 6px 0 #00000040"}}>
                <div className='p-6 overflow-hidden ellipsis'>{consoleMsg}</div>
            </div>
        </div>
    )
}
