import React from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { ThreeDots } from 'react-loading-icons'
import { useAccount, type Config } from 'wagmi'
import { createPublicClient, http, erc721Abi, formatEther } from 'viem'
import { jbc } from 'viem/chains'
import { FieldsV2RouterAbi, FieldsHook001 } from './abi'
import { readContracts, readContract, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'

const v2routerAddr = '0x4b958647b3D5240587843C16d4dfC13B19de2671'
const v2routerCreatedAt = BigInt(4938709)
const hook001Addr = '0xE8757f3e371410B5dbeE83dcAE0876e61B1A2042'
const nftIndex2Addr = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const nftIndex2CreatedAt = BigInt(335027)
const nftIndex3Addr = '0xA6f8cE1425E0fC4b74f3b1c2f9804e9968f90e17'
const nftIndex3CreatedAt = BigInt(2260250)

const publicClient = createPublicClient({ chain: jbc, transport: http() })

export default function Test001({ 
    config, intrasubModetext, callMode, navigate, setIsLoading, txupdate, setTxupdate, setErrMsg,
}: {
    config: Config,
    intrasubModetext: string | undefined,
    callMode: (_mode: number) => void,
    navigate: NavigateFunction,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    txupdate: String | null,
    setTxupdate: React.Dispatch<React.SetStateAction<String | null>>,
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>,

}) {
    React.useEffect(() => { window.scrollTo(0, 0) }, [])
    let { address, chain } = useAccount()
    const [addr, setAddr] = React.useState(address)
    const [nftIndexSelect, setNftIndexSelect] = React.useState(2)
    const [nftIndexHashRate, setNftIndexHashRate] = React.useState('0')
    const [nft, setNft] = React.useState<{ Id: bigint | undefined; Name: any; Description: any; Image: any; Attribute: any; isStaked: boolean; isPeripheryAllow: string; PointPerSec: number; Point: string; }[]>()
    const [totalPoint, setTotalPoint] = React.useState(0)

    React.useEffect(() => {
        setNft(undefined)
        setNftIndexHashRate('0')
        if (intrasubModetext === undefined) {
            navigate('/fields/test001/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext as '0xstring')
        } else if (address === undefined) {
            navigate('/fields/test001/undefined')
        } else {
            navigate('/fields/test001/' + address)
        }
        console.log("Connected to " + address)
        console.log("View profile of " + addr)

        let nftIndex: bigint;
        let nftAddr: '0xstring'
        let nftCreatedAt: bigint
        if (nftIndexSelect === 2) {
            nftIndex = BigInt(2)
            nftAddr = nftIndex2Addr as '0xstring'
            nftCreatedAt = nftIndex2CreatedAt
        } else if (nftIndexSelect === 3) {
            nftIndex = BigInt(3)
            nftAddr = nftIndex3Addr as '0xstring'
            nftCreatedAt = nftIndex3CreatedAt
        }
        
        const thefetch = async () => {
            const checkNftIndexHashRate = await readContract(config, {
                chainId: 8899,
                abi: FieldsHook001,
                address: hook001Addr as '0xstring',
                functionName: 'hashRateForNftIndex',
                args: [nftIndex],
            })
            setNftIndexHashRate(formatEther(checkNftIndexHashRate, 'gwei'))

            const _eventMyNftStaking = (await publicClient.getContractEvents({
                abi: FieldsV2RouterAbi,
                address: v2routerAddr as '0xstring',
                eventName: 'NftStaked',
                args: { 
                    staker: addr as '0xstring',
                    nftIndex: nftIndex,
                },
                fromBlock: v2routerCreatedAt,
                toBlock: 'latest',
            })).map((obj) => {
                return obj.args.nftId
            })
            const eventMyNftStaking = [...new Set(_eventMyNftStaking)]
            const checkIsNftStaked = await readContracts(config, {
                contracts: eventMyNftStaking.map((obj) => (
                    {
                        chainId: 8899,
                        abi: FieldsV2RouterAbi,
                        address: v2routerAddr as '0xstring',
                        functionName: 'stakedData',
                        args: [nftIndex, obj],
                    }
                ))
            })
            const checkedMyNftStaking = eventMyNftStaking.filter((obj, index) => {
                const res = checkIsNftStaked[index].result as unknown as [string, bigint][]
                return Number(res[1]) !== 0
            })
            let myNftStaked = []
            const checkPeripheryAllowNftStaked = await readContracts(config, {
                contracts: checkedMyNftStaking.map((obj) => (
                    {
                        chainId: 8899,
                        abi: FieldsV2RouterAbi,
                        address: v2routerAddr as '0xstring',
                        functionName: 'stakedUseByPeriphery',
                        args: [BigInt(2), nftIndex, obj],
                    }
                ))
            })
            const tokenUriNftStaked = await readContracts(config, {
                contracts: checkedMyNftStaking.map((obj) => (
                    {
                        chainId: 8899,
                        abi: erc721Abi,
                        address: nftAddr,
                        functionName: 'tokenURI',
                        args: [obj],
                    }
                ))
            })
            const pointNftStaked = await readContracts(config, {
                contracts: checkedMyNftStaking.map((obj) => (
                    {
                        chainId: 8899,
                        abi: FieldsHook001,
                        address: hook001Addr as '0xstring',
                        functionName: 'calculatePoint',
                        args: [nftIndex, obj],
                    }
                ))
            })
            let _totalPoint = 0
            myNftStaked = await Promise.all(checkedMyNftStaking.map(async (obj, index) => {
                let metadata = null
                if (tokenUriNftStaked[index].status === 'success') {
                    const tokenURIStr = tokenUriNftStaked[index].result as string
                    const metadataFetch = await fetch(tokenURIStr.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    metadata = await metadataFetch.json()
                }
                const _point = pointNftStaked[index].status === 'success' ? formatEther(pointNftStaked[index].result as bigint) : '0'
                _totalPoint += Number(_point)
                return {
                    Id: obj,
                    Name: metadata.name,
                    Description: metadata.description,
                    Image: metadata.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Attribute: metadata.attributes,
                    isStaked: true,
                    isPeripheryAllow: String(checkPeripheryAllowNftStaked[index].result),
                    PointPerSec: 0, // better dynamic fetch
                    Point: _point
                }
            }))

            const _eventMyNftHolding = (await publicClient.getContractEvents({
                abi: erc721Abi,
                address: nftAddr,
                eventName: 'Transfer',
                args: { 
                    to: addr as '0xstring',
                },
                fromBlock: nftCreatedAt,
                toBlock: 'latest',
            })).map((obj) => {
                return obj.args.tokenId
            })
            const eventMyNftHolding = [...new Set(_eventMyNftHolding)]
            const checkOwnerNftHolding = (await readContracts(config, {
                contracts: eventMyNftHolding.map((obj) => (
                    {
                        chainId: 8899,
                        abi: erc721Abi,
                        address: nftAddr,
                        functionName: 'ownerOf',
                        args: [obj],
                    }
                ))
            }))
            const filterNftHolding = eventMyNftHolding.filter((obj, index) => {
                const ownerOf = checkOwnerNftHolding[index].result as string
                return ownerOf.toUpperCase() === addr?.toUpperCase()
            })
            let myNftHolding = []
            const checkPeripheryAllowNftHolding = await readContracts(config, {
                contracts: filterNftHolding.map((obj) => (
                    {
                        chainId: 8899,
                        abi: FieldsV2RouterAbi,
                        address: v2routerAddr as '0xstring',
                        functionName: 'stakedUseByPeriphery',
                        args: [BigInt(2), nftIndex, obj],
                    }
                ))
            })
            const tokenUriNftHolding = await readContracts(config, {
                contracts: filterNftHolding.map((obj) => (
                    {
                        chainId: 8899,
                        abi: erc721Abi,
                        address: nftAddr,
                        functionName: 'tokenURI',
                        args: [obj],
                    }
                ))
            })
            const pointNftHolding = await readContracts(config, {
                contracts: filterNftHolding.map((obj) => (
                    {
                        chainId: 8899,
                        abi: FieldsHook001,
                        address: hook001Addr as '0xstring',
                        functionName: 'calculatePoint',
                        args: [nftIndex, obj],
                    }
                ))
            })
            myNftHolding = await Promise.all(filterNftHolding.map(async (obj, index) => {
                let metadata = null
                if (tokenUriNftHolding[index].status === 'success') {
                    const tokenURIStr = tokenUriNftHolding[index].result as string
                    const metadataFetch = await fetch(tokenURIStr.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    metadata = await metadataFetch.json()
                }
                let _point = pointNftHolding[index].status === 'success' ? formatEther(pointNftHolding[index].result as bigint) : '0'
                _totalPoint += Number(_point)
                return {
                    Id: obj,
                    Name: metadata.name,
                    Description: metadata.description,
                    Image: metadata.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Attribute: metadata.attributes,
                    isStaked: false,
                    isPeripheryAllow: String(checkPeripheryAllowNftHolding[index].result),
                    PointPerSec: 0, // better dynamic fetch
                    Point: _point
                }
            }))

            setTotalPoint(_totalPoint)
            setNft(myNftStaked.concat(myNftHolding))
        }
        if (addr !== undefined) {
            thefetch()
        } else {
            setNft([])
        }
    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, nftIndexSelect])

    const stakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            let nftIndex: bigint = BigInt(0);
            let nftAddr = '0x0' as '0xstring'
            if (nftIndexSelect === 2) {
                nftIndex = BigInt(2)
                nftAddr = nftIndex2Addr as '0xstring'
            } else if (nftIndexSelect === 3) {
                nftIndex = BigInt(3)
                nftAddr = nftIndex3Addr as '0xstring'
            }
            const nftAllow = await readContract(config, {
                chainId: 8899,
                abi: erc721Abi,
                address: nftAddr,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== v2routerAddr.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    chainId: 8899,
                    abi: erc721Abi,
                    address: nftAddr,
                    functionName: 'approve',
                    args: [v2routerAddr, _nftId],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                chainId: 8899,
                abi: FieldsV2RouterAbi,
                address: v2routerAddr,
                functionName: 'nftStake',
                args: [nftIndex, _nftId],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    const unstakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            let nftIndex: bigint = BigInt(0);
            if (nftIndexSelect === 2) {
                nftIndex = BigInt(2)
            } else if (nftIndexSelect === 3) {
                nftIndex = BigInt(3)
            }
            let { request } = await simulateContract(config, {
                chainId: 8899,
                abi: FieldsV2RouterAbi,
                address: v2routerAddr,
                functionName: 'nftUnstake',
                args: [nftIndex, _nftId],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    const allowPeriphery = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            let nftIndex: bigint = BigInt(0);
            if (nftIndexSelect === 2) {
                nftIndex = BigInt(2)
            } else if (nftIndexSelect === 3) {
                nftIndex = BigInt(3)
            }
            let { request } = await simulateContract(config, {
                chainId: 8899,
                abi: FieldsV2RouterAbi,
                address: v2routerAddr,
                functionName: 'allowStakedUseByPeriphery',
                args: [BigInt(2), nftIndex, _nftId],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    const revokePeriphery = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            let nftIndex: bigint = BigInt(0);
            if (nftIndexSelect === 2) {
                nftIndex = BigInt(2)
            } else if (nftIndexSelect === 3) {
                nftIndex = BigInt(3)
            }
            let { request } = await simulateContract(config, {
                chainId: 8899,
                abi: FieldsV2RouterAbi,
                address: v2routerAddr,
                functionName: 'revokeStakedUseByPeriphery',
                args: [BigInt(2), nftIndex, _nftId],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className="pixel w-full h-[300px] flex flex-col items-center justify-center bg-[url('https://gateway.commudao.xyz/ipfs/bafybeicyixoicb7ai6zads6t5k6qpyocoyelfbyoi73nmtobfjlv7fseiq')] text-black">
                <span className='text-7xl'>Test001</span>
                <span>[Non-committed point-to-token hook]</span>
            </div>
            <div className='pixel w-full mt-14 gap-10 flex flex-col items-center justify-center text-sm'>
                <div className='w-full h-[100px] gap-6 flex flex-row items-center justify-center'>
                    <button className={'hover:underline ' + (nftIndexSelect === 2 ? 'font-bold' : 'text-gray-500')} onClick={() => setNftIndexSelect(2)}>CommuDAO Dungeon</button>
                    <button className={'hover:underline ' + (nftIndexSelect === 3 ? 'font-bold' : 'text-gray-500')} onClick={() => setNftIndexSelect(3)}>The Mythical Guardians</button>
                </div>
                <div className='w-3/4 h-[120px] mb-4 p-[20px] flex flex-row justify-around rounded-full bg-slate-800'>
                    <div className="flex flex-col justify-around">
                        <div style={{marginBottom: "20px"}}>NFT COLLECTION HASHRATE</div>
                        <div style={{fontSize: "24px", marginBottom: "20px"}}>{nftIndexHashRate}</div>
                    </div>
                    <div className="flex flex-col justify-around">
                        <div style={{marginBottom: "20px"}}>MY ELIGIBLE NFT</div>
                        <div style={{fontSize: "24px", marginBottom: "20px"}}>{nft !== undefined && nft.length > 0 && addr !== undefined ? nft.length : 0}</div>
                    </div>
                    <div className="flex flex-col justify-around">
                        <div style={{marginBottom: "20px"}}>TOTAL POINT</div>
                        <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
                            {nft !== undefined && nft.length > 0 && addr !== undefined ? totalPoint : 0}                                
                        </div>
                    </div>
                </div>
                <div className='w-full px-10 gap-5 flex flex-row flex-wrap items-center justify-start'>
                    {nft !== undefined ?
                        <>
                            {(nft.length > 0 && addr !== undefined) ?
                                <>
                                    {nft.map((obj, index) => (
                                        <div className="pixel h-[560px] w-full xl:w-[390px] rounded-xl gap-3 flex flex-col items-start justify-start p-10 bg-neutral-800 text-left" key={index}>
                                            <img src={obj.Image} width="150" alt="Can not load metadata." />
                                            <div className='flex flex-row gap-3 items-center'>
                                                <div style={{background: obj.isStaked ? "rgb(29, 176, 35)" : "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%"}} />
                                                <span>{obj.isStaked ? 'On Staking' : 'Idle'}</span>
                                                <div style={{background: obj.isPeripheryAllow !== '0' ? "rgb(29, 176, 35)" : "rgb(253, 0, 0)", width: 16, height: 16, borderRadius: "50%"}} />
                                                <span>{obj.isPeripheryAllow !== '0' ? 'Point On' : 'Point Off'}</span>
                                            </div>
                                            <span className='text-lg font-bold'>{obj.Name}</span>
                                            <span className='text-gray-600'>Token ID: {String(obj.Id)}</span>
                                            <span className='w-full h-1/3 overflow-hidden text-ellipsis'>{obj.Description}</span>
                                            <div className={'w-full p-[20px] border-solid border-2 rounded-xl flex flex-row items-center justify-between ' + (obj.isPeripheryAllow !== '0' ? 'border-emerald-300' : 'border-neutral-700 text-gray-600')}>
                                                <div className='flex flex-col'>
                                                    <span>Point</span>
                                                    <span className='text-lg'>{String(obj.Point)}</span>
                                                </div>
                                            </div>
                                            {address !== undefined && intrasubModetext !== undefined && 
                                                <>
                                                    {address.toUpperCase() === intrasubModetext.toUpperCase() &&
                                                        <div className='w-full flex flex-row gap-2 text-xs'>
                                                            {obj.isStaked ?
                                                                <button className="w-[150px] p-3 rounded-xl bg-neutral-700 hover:font-bold hover:bg-neutral-400" onClick={() => {unstakeNft(obj.Id as bigint)}}>UNSTAKE</button> :
                                                                <button className="w-[150px] p-3 rounded-xl bg-emerald-600 hover:font-bold hover:bg-emerald-400" onClick={() => {stakeNft(obj.Id as bigint)}}>STAKE</button>
                                                            }
                                                            {obj.isPeripheryAllow === '0' && obj.isStaked && <button className="w-[150px] p-3 rounded-xl bg-emerald-600 hover:font-bold hover:bg-emerald-400" onClick={() => {allowPeriphery(obj.Id as bigint)}}>ACTIVATE POINT</button>}
                                                            {obj.isPeripheryAllow !== '0' && obj.isStaked && <button className="w-[150px] p-3 rounded-xl bg-red-600 hover:font-bold hover:bg-red-400" onClick={() => {revokePeriphery(obj.Id as bigint)}}>DEACTIVATE POINT</button>}
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </div>
                                    ))}
                                </> :
                                <div className="pixel h-[560px] w-full xl:w-[390px] rounded-xl gap-3 flex flex-col items-center justify-center p-10 bg-neutral-800 text-left">Emptiness</div>
                            }
                        </> :
                        <div className="h-[560px] w-full xl:w-[390px] rounded-xl flex items-center justify-center p-10 bg-neutral-800">
                            <ThreeDots fill="#5f6476" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
