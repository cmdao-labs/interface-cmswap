'use client'
import React from 'react'
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { v2routerAddr, v2routerCreatedAt, v2routerContract, FieldsHook001Contract, nftIndex1Addr, nftIndex1CreatedAt, nftIndex2Addr, nftIndex2CreatedAt, nftIndex3Addr, nftIndex3CreatedAt, nftIndex4Addr, nftIndex4CreatedAt, publicClient, erc721ABI } from '@/app/lib/8899'
import { config } from '@/app/config'
import ErrorModal from '@/app/components/error-modal'
import Mining from '@/app/components/Mining'
import Fishing from '@/app/components/Fishing'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const [txupdate, setTxupdate] = React.useState("")
    const router = useRouter()
    const pathname = usePathname()
    let { address, chain } = useAccount()
    const [addr, setAddr] = React.useState(address)
    const [hookSelect, setHookSelect] = React.useState(0)
    const [nftIndexSelect, setNftIndexSelect] = React.useState(1)
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
        if (nftIndexSelect === 1) {
            nftAddr = nftIndex1Addr as '0xstring'
            nftCreatedAt = nftIndex1CreatedAt
        } else if (nftIndexSelect === 2) {
            nftAddr = nftIndex2Addr as '0xstring'
            nftCreatedAt = nftIndex2CreatedAt
        } else if (nftIndexSelect === 3) {
            nftAddr = nftIndex3Addr as '0xstring'
            nftCreatedAt = nftIndex3CreatedAt
        } else if (nftIndexSelect === 4) {
            nftAddr = nftIndex4Addr as '0xstring'
            nftCreatedAt = nftIndex4CreatedAt
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
                contracts: checkedMyNftStaking.map(obj => ({ ...v2routerContract, functionName: 'stakedUseByPeriphery', args: [BigInt(1), BigInt(nftIndexSelect), obj] }))
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
                contracts: filterNftHolding.map(obj => ({ ...v2routerContract, functionName: 'stakedUseByPeriphery', args: [BigInt(1), BigInt(nftIndexSelect), obj] }))
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
            setErrMsg(e as WriteContractErrorType)
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
            setErrMsg(e as WriteContractErrorType)
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
            setErrMsg(e as WriteContractErrorType)
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
            setErrMsg(e as WriteContractErrorType)
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
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }
    const allowPeripheryAll = async () => {
        setIsLoading(true)
        try {
            const nftManipulation = nft?.filter(obj => { return obj.isPeripheryAllow === '0' })
            for (let i = 0; nftManipulation !== undefined && i <= nftManipulation.length - 1; i++) {
                const h = await writeContract(config, { ...v2routerContract, functionName: 'allowStakedUseByPeriphery', args: [BigInt(1), BigInt(nftIndexSelect), nftManipulation[i].Id as bigint] })
                if (i === nftManipulation.length - 1) {
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const revokePeriphery = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, { ...v2routerContract, functionName: 'revokeStakedUseByPeriphery', args: [BigInt(1), BigInt(nftIndexSelect), _nftId] })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }
    const revokePeripheryAll = async () => {
        setIsLoading(true)
        try {
            const nftManipulation = nft?.filter(obj => { return obj.isPeripheryAllow !== '0' })
            for (let i = 0; nftManipulation !== undefined && i <= nftManipulation.length - 1; i++) {
                const h = await writeContract(config, { ...v2routerContract, functionName: 'revokeStakedUseByPeriphery', args: [BigInt(1), BigInt(nftIndexSelect), nftManipulation[i].Id as bigint] })
                if (i === nftManipulation.length - 1) {
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }
    
    const [nftIdMiner, setNftIdMiner] = React.useState<bigint>()
    const [nftImgMiner, setNftImgMiner] = React.useState<string>()
    const checkPeripheryAllowNftStaked_hook = async(_nftIdMiner: bigint) => {
        const res = await readContracts(config, {
            contracts: [{ ...v2routerContract, functionName: 'stakedUseByPeriphery', args: [BigInt(2), BigInt(nftIndexSelect), _nftIdMiner] }]
        })
        return Number(res[0].result) === 0
    }

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <header className="relative">
                <div className="relative h-84 w-full overflow-hidden">
                    <Image alt="" src="https://gateway.commudao.xyz/ipfs/bafybeicyixoicb7ai6zads6t5k6qpyocoyelfbyoi73nmtobfjlv7fseiq" fill className="object-cover animate-subtle-zoom" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
                    <div className="container mx-auto px-4">
                        <div className="inline-flex items-center">
                            <div className="h-12 w-1 bg-green-500 mr-4" />
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-white">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">CMDAO Valley</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 mt-16 relative z-10">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 mb-8 overflow-x-auto scrollbar-hide">
                    <ToggleGroup type="single" defaultValue='1'className='flex space-x-4'>
                        <ToggleGroupItem className="cursor-pointer px-4 py-2 text-sm whitespace-nowrap transition-colors rounded-md data-[state=on]:!bg-green-900/50 data-[state=on]:!text-green-400 data-[state=off]:text-gray-400 data-[state=off]:hover:text-gray-300 data-[state=off]:hover:bg-gray-800/50" value='1' onClick={() => setNftIndexSelect(1)}>CommuDAO Dungeon</ToggleGroupItem>
                        <ToggleGroupItem className="cursor-pointer px-4 py-2 text-sm whitespace-nowrap transition-colors rounded-md data-[state=on]:!bg-green-900/50 data-[state=on]:!text-green-400 data-[state=off]:text-gray-400 data-[state=off]:hover:text-gray-300 data-[state=off]:hover:bg-gray-800/50" value='3' onClick={() => setNftIndexSelect(3)}>CM Hexa Cat Meaw</ToggleGroupItem>
                        <ToggleGroupItem className="cursor-pointer px-4 py-2 text-sm whitespace-nowrap transition-colors rounded-md data-[state=on]:!bg-green-900/50 data-[state=on]:!text-green-400 data-[state=off]:text-gray-400 data-[state=off]:hover:text-gray-300 data-[state=off]:hover:bg-gray-800/50" value='4' onClick={() => setNftIndexSelect(4)}>CM Ory Cat Meaw</ToggleGroupItem>
                        <ToggleGroupItem className="cursor-pointer px-4 py-2 text-sm whitespace-nowrap transition-colors rounded-md data-[state=on]:!bg-green-900/50 data-[state=on]:!text-green-400 data-[state=off]:text-gray-400 data-[state=off]:hover:text-gray-300 data-[state=off]:hover:bg-gray-800/50" value='2' onClick={() => setNftIndexSelect(2)}>Mythical Guardians</ToggleGroupItem>
                        {/* add nftIndexSelect switch button here */}
                    </ToggleGroup>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl mb-4 font-light flex items-center gap-2"><span className="w-1 h-6 bg-green-500 rounded-full" />Hooks</h2>
                    <Tabs defaultValue='0' onValueChange={index => setHookSelect(Number(index))}>
                        <TabsList className='bg-transparent flex flex-wrap gap-2'>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='0'>Non-committed point hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='1'>Mining hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='2'>Fishing hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='3'>Rat hunting hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='4'>Cooking hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='5'>PVE hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='6'>PVP hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='7'>Guild hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='8'>Land hook</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='9'>Marketplace hook</TabsTrigger>
                        </TabsList>
                        <TabsContent value='0'>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transition-transform hover:scale-[1.02]">
                                    <div className='text-xs text-gray-400 uppercase tracking-wider mb-2'>COLLECTION HASHRATE</div>
                                    <div className='text-3xl font-light'>{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(nftIndexHashRate)}</div>
                                </div>
                                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transition-transform hover:scale-[1.02]">
                                    <div className='text-xs text-gray-400 uppercase tracking-wider mb-2'>ELIGIBLE NFT</div>
                                    <div className='text-3xl font-light'>{nft !== undefined && nft.length > 0 && addr !== undefined ? nft.length : 0}</div>
                                </div>
                                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transition-transform hover:scale-[1.02]">
                                    <div className='text-xs text-gray-400 uppercase tracking-wider mb-2'>TOTAL POINT</div>
                                    <div className='text-3xl font-light'>
                                        {nft !== undefined && nft.length > 0 && addr !== undefined ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(totalPoint) : 0}                                
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value='1'>
                            {nftIndexSelect === 1 ?
                                <Mining setTxupdate={setTxupdate} setErrMsg={setErrMsg} setIsLoading={setIsLoading} nftIdMiner={nftIdMiner} nftImgMiner={nftImgMiner} addr={addr} /> :
                                <div className='my-8'>The hook does not support this NFT collection</div>
                            }
                        </TabsContent>
                        <TabsContent value='2'>
                            {nftIndexSelect === 1 ?
                                <Fishing setTxupdate={setTxupdate} txupdate={txupdate} setErrMsg={setErrMsg} setIsLoading={setIsLoading} /> :
                                <div className='my-8'>The hook does not support this NFT collection</div>
                            }
                        </TabsContent>
                        <TabsContent value='3'><div className='my-8'>Coming Soon...</div></TabsContent>
                        <TabsContent value='4'><div className='my-8'>Coming Soon...</div></TabsContent>
                        <TabsContent value='5'><div className='my-8'>Coming Soon...</div></TabsContent>
                        <TabsContent value='6'><div className='my-8'>Coming Soon...</div></TabsContent>
                        <TabsContent value='7'><div className='my-8'>Coming Soon...</div></TabsContent>
                        <TabsContent value='8'><div className='my-8'>Coming Soon...</div></TabsContent>
                        <TabsContent value='9'><div className='my-8'>Coming Soon...</div></TabsContent>
                    </Tabs>
                </div>
                <div className="flex flex-wrap gap-3 mb-8">
                    <button 
                        className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                        disabled={(nft?.filter((obj) => {return obj.isStaked === false}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === false})).length !== 0) ? false : true}
                        onClick={() => {
                            if (nft?.filter((obj) => {return obj.isStaked === false}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === false})).length !== 0) {
                                stakeNftAll()
                            }
                        }}
                    >
                        Stake All
                    </button>
                    {hookSelect === 0 &&
                        <button 
                            className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                            disabled={(nft?.filter((obj) => {return obj.isPeripheryAllow === '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow === '0'})).length !== 0) ? false : true}
                            onClick={() => {
                                if (nft?.filter((obj) => {return obj.isPeripheryAllow === '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow === '0'})).length !== 0) {
                                    allowPeripheryAll()
                                }
                            }}
                        >
                            Activate All
                        </button>
                    }
                    <button 
                        className="px-4 py-2 bg-red-900/30 border border-red-900/50 rounded-md text-sm text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                        disabled={(nft?.filter((obj) => {return obj.isStaked === true}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === true})).length !== 0) ? false : true}
                        onClick={() => {
                            if (nft?.filter((obj) => {return obj.isStaked === true}) !== undefined && (nft?.filter((obj) => {return obj.isStaked === true})).length !== 0) {
                                unstakeNftAll()
                            }
                        }}
                    >
                        Unstake All
                    </button>
                    {hookSelect === 0 &&
                        <button 
                            className="px-4 py-2 bg-red-900/30 border border-red-900/50 rounded-md text-sm text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                            disabled={(nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'})).length !== 0) ? false : true}
                            onClick={() => {
                                if (nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'}) !== undefined && (nft?.filter((obj) => {return obj.isPeripheryAllow !== '0'})).length !== 0) {
                                    revokePeripheryAll()
                                }
                            }}
                        >
                            Revoke All
                        </button>
                    }
                </div>
                <div>
                    <h2 className="text-xl mb-4 font-light flex items-center gap-2"><span className="w-1 h-6 bg-green-500 rounded-full" />NFT Portfolio</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {nft !== undefined &&
                            <>
                                {nft.map((nft) => (
                                    <div key={nft.Id} className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
                                        <div className="p-4">
                                            <div className="aspect-square mb-4 bg-black/50 rounded-md overflow-hidden flex items-center justify-center">
                                                <Image alt="" src={nft.Image} width={180} height={180} className="object-contain" />
                                            </div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className={cn("w-2 h-2 rounded-full", nft.isStaked ? "bg-green-500" : "bg-yellow-500",)} />
                                                <span className="text-xs text-gray-400">{nft.isStaked ? "On Staking" : "Idle"}</span>
                                                <div className="ml-2 flex items-center space-x-2">
                                                    <div className={cn("w-2 h-2 rounded-full", nft.isPeripheryAllow !== '0' ? "bg-green-500" : "bg-gray-500")} />
                                                    <span className="text-xs text-gray-400">Point {nft.isPeripheryAllow !== '0' ? "On" : "Off"}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-medium mb-2 truncate">{nft.Name}</h3>
                                            <h4 className='text-xs text-gray-600 mb-2'>Token ID: {String(nft.Id)}</h4>
                                            <h4 className='text-xs text-gray-400 h-[50px] overflow-hidden text-ellipsis mb-2'>{nft.Description}</h4>
                                            {hookSelect === 0 &&
                                                <div className="border border-gray-800 rounded-md p-2 mb-4">
                                                    <div className="text-xs text-gray-500 mb-1">Point</div>
                                                    <div className="text-lg font-light">{nft.Point}</div>
                                                </div>
                                            }
                                            {address !== undefined && 
                                                <>
                                                    {address.toUpperCase() === pathname.slice(-42).toUpperCase() &&
                                                        <div className="flex space-x-2">
                                                            {nft.isStaked ?
                                                                <button className="flex-1 px-3 py-2 bg-red-900/30 border border-red-900/50 rounded-md text-xs text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer" onClick={() => {unstakeNft(nft.Id as bigint)}}>Unstake</button> :
                                                                <button className="flex-1 px-3 py-2 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40 transition-colors cursor-pointer"  onClick={() => {stakeNft(nft.Id as bigint)}}>Stake</button>
                                                            } 
                                                            {hookSelect === 0 && nft.isPeripheryAllow === '0' && nft.isStaked &&
                                                                <button className="flex-1 px-3 py-2 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40 transition-colors cursor-pointer" onClick={() => {allowPeriphery(nft.Id as bigint, 1)}}>Activate</button>
                                                            }
                                                            {hookSelect === 0 && nft.isPeripheryAllow !== '0' && nft.isStaked &&
                                                                <button className="flex-1 px-3 py-2 bg-red-900/30 border border-red-900/50 rounded-md text-xs text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer" onClick={() => {revokePeriphery(nft.Id as bigint)}}>Deactivate</button>
                                                            }
                                                            {hookSelect === 1 && nftIndexSelect === 1 && nft.isStaked && 
                                                                <Button variant="outline" className={"cursor-pointer " + (Number(nftIdMiner) === Number(nft.Id) ? "bg-emerald-300 text-black" : "")} onClick={async () => {if (await checkPeripheryAllowNftStaked_hook(nft.Id as bigint)) {allowPeriphery(nft.Id as bigint, 2);} setNftIdMiner(nft.Id as bigint); setNftImgMiner(nft.Image);}}>CHOOSE MINER</Button>
                                                            }
                                                        </div>
                                                    }
                                                </>
                                            } 
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </div>
            </main>
            <footer className="container mx-auto p-4 mt-8 border-t border-gray-900">
                <div className="text-sm text-green-500 flex items-center gap-2">
                    <span className="text-gray-600">$</span> cmdao_valley_field{" "}
                    <span className="inline-block w-2 h-4 bg-green-500 animate-pulse"></span>
                </div>
            </footer>
        </div>
    )
}
    