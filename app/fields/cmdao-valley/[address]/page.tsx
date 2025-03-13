'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts } from '@wagmi/core'
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from '@/components/ui/button'
import { v2routerAddr, v2routerCreatedAt, v2routerContract, FieldsHook001Contract, nftIndex2Addr, nftIndex2CreatedAt, nftIndex3Addr, nftIndex3CreatedAt, nftIndex4Addr, nftIndex4CreatedAt, nftIndex5Addr, nftIndex5CreatedAt, publicClient, erc721ABI } from '@/app/lib/8899'
import { config } from '@/app/config'
import Mining from '@/app/components/Mining'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<String | null>(null)
    const [txupdate, setTxupdate] = React.useState("")
    const router = useRouter()
    const pathname = usePathname()
    let { address, chain } = useAccount()
    const [addr, setAddr] = React.useState(address)
    const [hookSelect, setHookSelect] = React.useState(0)
    const [nftIndexSelect, setNftIndexSelect] = React.useState(2)
    const [globNftAddr, setGlobNftAddr] = React.useState<'0xstring'>()
    const [nftIndexHashRate, setNftIndexHashRate] = React.useState(BigInt(0))
    const [nft, setNft] = React.useState<{ 
        Id: bigint | undefined;
        Name: any; 
        Description: any; 
        Image: any; 
        Attribute: any; 
        isStaked: boolean; 
        isPeripheryAllow: string; 
        PointPerSec: number; 
        Point: string; 
    }[]>()
    const [totalPoint, setTotalPoint] = React.useState(0)

    React.useEffect(() => {
        setNft(undefined)
        if (pathname === undefined) {
            router.push('/fields/cmdao-valley/' + address)
        } else if (pathname.length === 42) {
            setAddr(pathname as '0xstring')
        } else if (address === undefined) {
            router.push('/fields/cmdao-valley/undefined')
        } else {
            router.push('/fields/cmdao-valley/' + address)
        }

        let nftAddr = '0x0' as '0xstring'
        let nftCreatedAt: bigint
        if (nftIndexSelect === 2) {
            nftAddr = nftIndex2Addr as '0xstring'
            nftCreatedAt = nftIndex2CreatedAt
        } else if (nftIndexSelect === 3) {
            nftAddr = nftIndex3Addr as '0xstring'
            nftCreatedAt = nftIndex3CreatedAt
        } else if (nftIndexSelect === 4) {
            nftAddr = nftIndex4Addr as '0xstring'
            nftCreatedAt = nftIndex4CreatedAt
        } else if (nftIndexSelect === 5) {
            nftAddr = nftIndex5Addr as '0xstring'
            nftCreatedAt = nftIndex5CreatedAt
        }
        // add condition here when listing more NFT
        setGlobNftAddr(nftAddr)
        
        const thefetch = async () => {
            const checkNftIndexHashRate = await readContract(config, { ...FieldsHook001Contract, functionName: 'hashRateForNftIndex', args: [BigInt(nftIndexSelect)] })
            setNftIndexHashRate(BigInt(formatEther(checkNftIndexHashRate, 'gwei')))

            const _eventMyNftStaking = (await publicClient.getContractEvents({
                ...v2routerContract,
                eventName: 'NftStaked',
                args: { 
                    staker: addr as '0xstring',
                    nftIndex: BigInt(nftIndexSelect),
                },
                fromBlock: v2routerCreatedAt,
                toBlock: 'latest'
            })).map(obj => {
                return obj.args.nftId
            })
            const eventMyNftStaking = [...new Set(_eventMyNftStaking)]
            const checkIsNftStaked = await readContracts(config, {
                contracts: eventMyNftStaking.map(obj => ({ ...v2routerContract, functionName: 'stakedData', args: [BigInt(nftIndexSelect), obj] }))
            })
            const checkedMyNftStaking = eventMyNftStaking.filter((obj, index) => {
                const res = checkIsNftStaked[index].result as unknown as [string, bigint][]
                return Number(res[1]) !== 0
            })
            let myNftStaked = []
            const checkPeripheryAllowNftStaked = await readContracts(config, {
                contracts: checkedMyNftStaking.map(obj => ({ ...v2routerContract, functionName: 'stakedUseByPeriphery', args: [BigInt(2), BigInt(nftIndexSelect), obj] }))
            })
            const tokenUriNftStaked = await readContracts(config, {
                contracts: checkedMyNftStaking.map(obj => ({ ...erc721ABI, address: nftAddr, functionName: 'tokenURI', args: [obj] }))
            })
            const pointNftStaked = await readContracts(config, {
                contracts: checkedMyNftStaking.map(obj => ({ ...FieldsHook001Contract, functionName: 'calculatePoint', args: [BigInt(nftIndexSelect), obj] }))
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
                ...erc721ABI,
                address: nftAddr,
                eventName: 'Transfer',
                args: { to: addr as '0xstring' },
                fromBlock: nftCreatedAt,
                toBlock: 'latest'
            })).map((obj) => {
                return obj.args.tokenId
            })
            const eventMyNftHolding = [...new Set(_eventMyNftHolding)]
            const checkOwnerNftHolding = (await readContracts(config, {
                contracts: eventMyNftHolding.map(obj => ({ ...erc721ABI, address: nftAddr, functionName: 'ownerOf', args: [obj] }))
            }))
            const filterNftHolding = eventMyNftHolding.filter((obj, index) => {
                const ownerOf = checkOwnerNftHolding[index].result as string
                return ownerOf.toUpperCase() === addr?.toUpperCase()
            })
            let myNftHolding = []
            const checkPeripheryAllowNftHolding = await readContracts(config, {
                contracts: filterNftHolding.map(obj => ({ ...v2routerContract, functionName: 'stakedUseByPeriphery', args: [BigInt(2), BigInt(nftIndexSelect), obj] }))
            })
            const tokenUriNftHolding = await readContracts(config, {
                contracts: filterNftHolding.map(obj => ({ ...erc721ABI, address: nftAddr, functionName: 'tokenURI', args: [obj] }))
            })
            const pointNftHolding = await readContracts(config, {
                contracts: filterNftHolding.map(obj => ({ ...FieldsHook001Contract, functionName: 'calculatePoint', args: [BigInt(nftIndexSelect), obj] }))
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
    }, [config, address, addr, pathname, chain, txupdate, nftIndexSelect])

    const stakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const nftAllow = await readContract(config, { ...erc721ABI, address: globNftAddr as '0xstring', functionName: 'getApproved', args: [_nftId] })
            if (nftAllow.toUpperCase() !== v2routerAddr.toUpperCase()) {
                const { request } = await simulateContract(config, { ...erc721ABI, address: globNftAddr as '0xstring', functionName: 'approve', args: [v2routerAddr, _nftId] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            const { request } = await simulateContract(config, { ...v2routerContract, functionName: 'nftStake', args: [BigInt(nftIndexSelect), _nftId] })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }
    const stakeNftAll = async () => {
        setIsLoading(true)
        try {
            const nftManipulation = nft?.filter(obj => { return obj.isStaked === false })
            for (let i = 0; nftManipulation !== undefined && i <= nftManipulation.length - 1; i++) {
                const nftAllow = await readContract(config, { ...erc721ABI, address: globNftAddr as '0xstring', functionName: 'getApproved', args: [nftManipulation[i].Id as bigint] })
                if (nftAllow.toUpperCase() !== v2routerAddr.toUpperCase()) {
                    await writeContract(config, { ...erc721ABI, address: globNftAddr as '0xstring', functionName: 'approve', args: [v2routerAddr, nftManipulation[i].Id as bigint] })
                }
                const h = await writeContract(config, { ...v2routerContract, functionName: 'nftStake', args: [BigInt(nftIndexSelect), nftManipulation[i].Id as bigint] })
                if (i === nftManipulation.length - 1) {
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }
            }
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    const unstakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, { ...v2routerContract, functionName: 'nftUnstake', args: [BigInt(nftIndexSelect), _nftId] })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }
    const unstakeNftAll = async () => {
        setIsLoading(true)
        try {
            const nftManipulation = nft?.filter(obj => { return obj.isStaked === true })
            for (let i = 0; nftManipulation !== undefined && i <= nftManipulation.length - 1; i++) {
                const h =  await writeContract(config, { ...v2routerContract, functionName: 'nftUnstake', args: [BigInt(nftIndexSelect), nftManipulation[i].Id as bigint] })
                if (i === nftManipulation.length - 1) {
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }
            }
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    const allowPeriphery = async (_nftId: bigint, _periIndex: number) => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, { ...v2routerContract, functionName: 'allowStakedUseByPeriphery', args: [BigInt(_periIndex), BigInt(nftIndexSelect), _nftId] })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }
    const allowPeripheryAll = async () => {
        setIsLoading(true)
        try {
            const nftManipulation = nft?.filter(obj => { return obj.isPeripheryAllow === '0' })
            for (let i = 0; nftManipulation !== undefined && i <= nftManipulation.length - 1; i++) {
                const h = await writeContract(config, { ...v2routerContract, functionName: 'allowStakedUseByPeriphery', args: [BigInt(2), BigInt(nftIndexSelect), nftManipulation[i].Id as bigint] })
                if (i === nftManipulation.length - 1) {
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }
            }
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    const revokePeriphery = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, { ...v2routerContract, functionName: 'revokeStakedUseByPeriphery', args: [BigInt(2), BigInt(nftIndexSelect), _nftId] })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }
    const revokePeripheryAll = async () => {
        setIsLoading(true)
        try {
            const nftManipulation = nft?.filter(obj => { return obj.isPeripheryAllow !== '0' })
            for (let i = 0; nftManipulation !== undefined && i <= nftManipulation.length - 1; i++) {
                const h = await writeContract(config, { ...v2routerContract, functionName: 'revokeStakedUseByPeriphery', args: [BigInt(2), BigInt(nftIndexSelect), nftManipulation[i].Id as bigint] })
                if (i === nftManipulation.length - 1) {
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }
            }
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }
    
    const [nftIdMiner, setNftIdMiner] = React.useState<bigint>()
    const [nftImgMiner, setNftImgMiner] = React.useState<string>()
    const checkPeripheryAllowNftStaked_hook = async(_nftIdMiner: bigint) => {
        const res = await readContracts(config, {
            contracts: [{ ...v2routerContract, functionName: 'stakedUseByPeriphery', args: [BigInt(9), BigInt(nftIndexSelect), _nftIdMiner] }]
        })
        return Number(res[0].result) === 0
    }

    return (
        <>
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
                <Dialog open={errMsg !== null} onClose={() => setErrMsg(null)} className="relative z-999">
                    <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-[12px]" />
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-xl space-y-2 rounded-lg border border-black bg-neutral-900 text-white">
                            <DialogTitle className="font-bold p-6 bg-red-600">ERROR! [beta 0.0.4]</DialogTitle>
                            <Description className="p-6 text-gray-500 overflow-hidden">{errMsg}</Description>
                            <div className='p-6'>
                                <button className='w-2/3 p-3 text-xs rounded-full border border-gray-500 hover:bg-neutral-800 cursor-pointer' onClick={() => setErrMsg(null)}>CLOSE</button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            <div className="w-full h-[320px] flex flex-col items-center justify-center bg-[url('https://gateway.commudao.xyz/ipfs/bafybeicyixoicb7ai6zads6t5k6qpyocoyelfbyoi73nmtobfjlv7fseiq')] bg-cover bg-center">
                <span className='text-7xl p-3 rounded-xl inset-0 bg-black/50'>CMDAO Valley</span>
            </div>
            <div className='w-full mt-14 gap-10 flex flex-col items-center justify-center text-xs xl:text-sm'>          
                <ToggleGroup type="single" defaultValue='2' className='w-3/4 bg-white/5'>
                    <ToggleGroupItem className='cursor-pointer' value='2' onClick={() => setNftIndexSelect(2)}>CommuDAO Dungeon</ToggleGroupItem>
                    <ToggleGroupItem className='cursor-pointer' value='4' onClick={() => setNftIndexSelect(4)}>CM Hexa Cat Meaw</ToggleGroupItem>
                    <ToggleGroupItem className='cursor-pointer' value='5' onClick={() => setNftIndexSelect(5)}>CM Ory Cat Meaw</ToggleGroupItem>
                    <ToggleGroupItem className='cursor-pointer' value='3' onClick={() => setNftIndexSelect(3)}>The Mythical Guardians</ToggleGroupItem>
                    {/* add nftIndexSelect switch button here */}
                </ToggleGroup>
                <div className='w-full my-2 px-10 border-[0.5px] border-solid border-gray-800' />
                <Tabs className='w-6/7 space-y-10' defaultValue='0' onValueChange={index => setHookSelect(Number(index))}>
                    <TabsList className='w-full bg-gray-200'>
                        <TabsTrigger className='cursor-pointer' value='0'>Non-committed point hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='1'>Mining hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='2'>Fishing hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='3'>Rat hunting hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='4'>Cooking hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='5'>PVE hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='6'>PVP hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='7'>Guild hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='8'>Land hook</TabsTrigger>
                        <TabsTrigger className='cursor-pointer' value='9'>Marketplace hook</TabsTrigger>
                    </TabsList>
                    <TabsContent value='0' className='p-7'>
                        <div className='w-full xl:w-1/2 flex flex-row justify-around rounded-xl border'>
                            <div className="my-4 space-y-4">
                                <div className='text-xs'>COLLECTION HASHRATE</div>
                                <div className='text-[24px]'>{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(nftIndexHashRate)}</div>
                            </div>
                            <div className="my-4 space-y-4">
                                <div className='text-xs'>ELIGIBLE NFT</div>
                                <div className='text-[24px]'>{nft !== undefined && nft.length > 0 && addr !== undefined ? nft.length : 0}</div>
                            </div>
                            <div className="my-4 space-y-4">
                            <div className='text-xs'>TOTAL POINT</div>
                                <div className='text-[24px]'>
                                    {nft !== undefined && nft.length > 0 && addr !== undefined ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(totalPoint) : 0}                                
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value='1'>
                        {nftIndexSelect === 2 ?
                            <Mining setTxupdate={setTxupdate} setErrMsg={setErrMsg} nftIdMiner={nftIdMiner} nftImgMiner={nftImgMiner} addr={addr} /> :
                            <span>The hook does not support this NFT collection</span>
                        }
                    </TabsContent>
                    <TabsContent value='2'>Coming Soon...</TabsContent>
                    <TabsContent value='3'>Coming Soon...</TabsContent>
                    <TabsContent value='4'>Coming Soon...</TabsContent>
                    <TabsContent value='5'>Coming Soon...</TabsContent>
                    <TabsContent value='6'>Coming Soon...</TabsContent>
                    <TabsContent value='7'>Coming Soon...</TabsContent>
                    <TabsContent value='8'>Coming Soon...</TabsContent>
                    <TabsContent value='9'>Coming Soon...</TabsContent>
                </Tabs>
                                
                <div className='w-full px-14 gap-4 flex flex-row flex-wrap items-start justify-start'>
                    <Button 
                        variant="secondary"
                        disabled={(nft?.filter((obj) => {return obj.isStaked === false}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === false})).length !== 0) ? false : true}
                        className='cursor-pointer'
                        onClick={() => {
                            if (nft?.filter((obj) => {return obj.isStaked === false}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === false})).length !== 0) {
                                stakeNftAll()
                            }
                        }}
                    >
                        STAKE ALL
                    </Button>
                    {hookSelect === 0 &&
                        <Button
                            variant="secondary"
                            disabled={(nft?.filter((obj) => {return obj.isPeripheryAllow === '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow === '0'})).length !== 0) ? false : true}
                            className='cursor-pointer'
                            onClick={() => {
                                if (nft?.filter((obj) => {return obj.isPeripheryAllow === '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow === '0'})).length !== 0) {
                                    allowPeripheryAll()
                                }
                            }}
                        >
                            ACTIVATE ALL
                        </Button>
                    }
                    <Button 
                        variant="destructive"
                        disabled={(nft?.filter((obj) => {return obj.isStaked === true}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === true})).length !== 0) ? false : true}
                        className='cursor-pointer'
                        onClick={() => {
                            if (nft?.filter((obj) => {return obj.isStaked === true}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === true})).length !== 0) {
                                unstakeNftAll()
                            }
                        }}
                    >
                        UNSTAKE ALL
                    </Button>
                    {hookSelect === 0 &&
                        <Button 
                            variant="destructive"
                            disabled={(nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'})).length !== 0) ? false : true}
                            className='cursor-pointer'
                            onClick={() => {
                                if (nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'})).length !== 0) {
                                    revokePeripheryAll()
                                }
                            }}
                        >
                            REVOKE ALL
                        </Button>
                    }
                </div>
                <div className='w-full px-10 gap-5 flex flex-row flex-wrap items-center justify-start'>
                    {nft !== undefined ?
                        <>
                            {(nft.length > 0 && addr !== undefined) ?
                                <>
                                    {nft.map((obj, index) => (
                                        <div className="h-[560px] w-full xl:w-[390px] rounded-xl gap-3 flex flex-col items-start justify-start p-10 bg-white/5 border text-xs text-left" key={index}>
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
                                            {hookSelect === 0 &&
                                                <div className={'w-full p-[20px] border-solid border-2 rounded-xl flex flex-row items-center justify-between ' + (obj.isPeripheryAllow !== '0' ? 'border-emerald-300' : 'border-neutral-700 text-gray-600')}>
                                                    <div className='flex flex-col'>
                                                        <span>Point</span>
                                                        <span className='text-lg'>{String(obj.Point)}</span>
                                                    </div>
                                                </div>
                                            }
                                            {address !== undefined && 
                                                <>
                                                    {address.toUpperCase() === pathname.slice(-42).toUpperCase() &&
                                                        <>
                                                            <div className='w-full flex flex-row gap-2 text-xs'>
                                                                {obj.isStaked ?
                                                                    <Button variant="destructive" className="cursor-pointer" onClick={() => {unstakeNft(obj.Id as bigint)}}>UNSTAKE</Button> :
                                                                    <Button variant="secondary" className="cursor-pointer" onClick={() => {stakeNft(obj.Id as bigint)}}>STAKE</Button>
                                                                }
                                                                {hookSelect === 0 && obj.isPeripheryAllow === '0' && obj.isStaked && <Button variant="secondary" className="cursor-pointer" onClick={() => {allowPeriphery(obj.Id as bigint, 2)}}>ACTIVATE POINT</Button>}
                                                                {hookSelect === 0 && obj.isPeripheryAllow !== '0' && obj.isStaked && <Button variant="destructive" className="cursor-pointer" onClick={() => {revokePeriphery(obj.Id as bigint)}}>DEACTIVATE POINT</Button>}
                                                                {hookSelect === 1 && nftIndexSelect === 2 && obj.isStaked && 
                                                                    <Button variant="outline" className={"cursor-pointer " + (Number(nftIdMiner) === Number(obj.Id) ? "bg-emerald-300 text-black" : "")} onClick={async () => {if (await checkPeripheryAllowNftStaked_hook(obj.Id as bigint)) {allowPeriphery(obj.Id as bigint, 9);} setNftIdMiner(obj.Id as bigint); setNftImgMiner(obj.Image);}}>CHOOSE MINER</Button>
                                                                }
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            }
                                        </div>
                                    ))}
                                </> :
                                <div className="h-[560px] w-full xl:w-[390px] rounded-xl gap-3 flex flex-col items-center justify-center p-10 bg-white/5 border text-left">Emptiness</div>
                            }
                        </> :
                        <div className="h-[560px] w-full xl:w-[390px] rounded-xl flex items-center justify-center p-10 bg-white/5 border" />
                    }
                </div>
                <div className='w-full my-2 px-10 border-[0.5px] border-solid border-gray-800' />
            </div>
        </>
    )
}
    