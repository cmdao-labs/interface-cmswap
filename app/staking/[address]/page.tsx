'use client'
import React from 'react'
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { v2routerAddr, v2routerCreatedAt, v2routerContract, FieldsHook001Contract, nftIndex1Addr, nftIndex1CreatedAt, nftIndex2Addr, nftIndex2CreatedAt, nftIndex3Addr, nftIndex3CreatedAt, nftIndex4Addr, nftIndex4CreatedAt, publicClient, erc721ABI } from '@/app/lib/8899'
import { config } from '@/app/config'
import ErrorModal from '@/app/components/error-modal'
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
            router.push('/staking/' + address)
        } else if (pathname.length === 42) {
            setAddr(pathname as '0xstring')
        } else if (address === undefined) {
            router.push('/staking/undefined')
        } else {
            router.push('/staking/' + address)
        }

        let nftAddr = '0x0' as '0xstring'
        let nftCreatedAt: bigint
        if (nftIndexSelect === 1) {
            nftAddr = nftIndex1Addr as '0xstring'
            nftCreatedAt = nftIndex1CreatedAt
        }
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

    const [nftIdVester, setNftIdVester] = React.useState<bigint>()

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <header className="relative">
                <div className="relative h-50 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
                    <div className="container mx-auto px-4">
                        <div className="inline-flex items-center">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-white">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">Staking</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 mt-16 relative z-10">
                <div className="mb-8">
                    <Tabs defaultValue='0' onValueChange={index => setHookSelect(Number(index))}>
                        <TabsList className='bg-transparent flex flex-wrap gap-2'>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='0'>KUB validator: liquidity mining</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='1'>Point</TabsTrigger>
                        </TabsList>
                        <TabsContent value='0'>
                            {nftIndexSelect === 1 ?
                                <Fishing setTxupdate={setTxupdate} txupdate={txupdate} setErrMsg={setErrMsg} setIsLoading={setIsLoading} nftIdVester={nftIdVester} addr={addr} /> :
                                <div className='my-8'>The hook does not support this NFT collection</div>
                            }
                        </TabsContent>
                        <TabsContent value='1'>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                                    <div className='text-xs text-gray-400 uppercase tracking-wider mb-2'>TOTAL POINT</div>
                                    <div className='text-3xl font-light'>
                                        {nft !== undefined && nft.length > 0 && addr !== undefined ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(totalPoint) : 0}                                
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
    