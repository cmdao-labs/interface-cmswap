'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { config } from '@/config/reown'
import ErrorModal from '@/components/cmswap/error-modal'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { formatEther } from "viem"
import { chains } from '@/lib/chains'

const { v3FactoryContract, positionManagerContract, erc20ABI, v3PoolABI, publicClient, erc721ABI, POSITION_MANAGER, positionManagerCreatedAt, V3_STAKER, v3StakerContract } = chains[25925]
type MyPosition = { Id: number; Name: string; Image: string; FeeTier: number; Pair: string; Token0Addr: string; Token1Addr: string; Token0: string; Token1: string; Amount0: number; Amount1: number; MinPrice: number; MaxPrice: number; CurrPrice: number; LowerTick: number; UpperTick: number; Liquidity: string; Fee0: number; Fee1: number; IsStaking: boolean; Reward: number; }

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const [txupdate, setTxupdate] = React.useState("")
    const router = useRouter()
    const pathname = usePathname()
    let { address, chain } = useAccount()
    const [addr, setAddr] = React.useState(address)
    const [totalPoint, setTotalPoint] = React.useState(0)
    const [position, setPosition] = React.useState<MyPosition[]>([])
    const [allPending, setAllPending] = React.useState('')
    const [allStaker, setAllStaker] = React.useState('')
    const calcAmount0 = (liquidity: number, currentPrice: number, priceLower: number, priceUpper: number, token0Decimals: number, token1Decimals: number) => {
        const decimalAdjustment = 10 ** (token0Decimals - token1Decimals)
        const mathCurrentPrice = Math.sqrt(currentPrice / decimalAdjustment)
        const mathPriceUpper = Math.sqrt(priceUpper / decimalAdjustment)
        const mathPriceLower = Math.sqrt(priceLower / decimalAdjustment)
        const math = mathCurrentPrice <= mathPriceLower ? liquidity * ((mathPriceUpper - mathPriceLower) / (mathPriceLower * mathPriceUpper)) : liquidity * ((mathPriceUpper - mathCurrentPrice) / (mathCurrentPrice * mathPriceUpper))
        const adjustedMath = math > 0 ? math : 0
        return adjustedMath
    }
    const calcAmount1 = (liquidity: number, currentPrice: number, priceLower: number, priceUpper: number, token0Decimals: number, token1Decimals: number) => {
        const decimalAdjustment = 10 ** (token0Decimals - token1Decimals)
        const mathCurrentPrice = Math.sqrt(currentPrice / decimalAdjustment)
        const mathPriceUpper = Math.sqrt(priceUpper / decimalAdjustment)
        const mathPriceLower = Math.sqrt(priceLower / decimalAdjustment)
        const math = mathCurrentPrice >= mathPriceUpper ? liquidity * (mathPriceUpper - mathPriceLower) : liquidity * (mathCurrentPrice - mathPriceLower)
        const adjustedMath = math > 0 ? math : 0
        return adjustedMath
    }
    const stakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request: request1 } = await simulateContract(config, { ...erc721ABI, address: POSITION_MANAGER, functionName: 'safeTransferFrom', args: [addr as '0xstring', V3_STAKER, _nftId] })
            const h = await writeContract(config, request1)
            await waitForTransactionReceipt(config, { hash: h })
            const { request: request2 } = await simulateContract(config, { 
                ...v3StakerContract, 
                functionName: 'stakeToken',
                args: [{
                    rewardToken: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring',
                    pool: '0x77069e705dce52ed903fd577f46dcdb54d4db0ac' as '0xstring',
                    startTime: BigInt(1755589200),
                    endTime: BigInt(3270351988),
                    refundee: '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea' as '0xstring'
                }, _nftId] 
            })
            const h2 = await writeContract(config, request2)
            await waitForTransactionReceipt(config, { hash: h2 })
            setTxupdate(h2)
        } catch (e) {setErrMsg(e as WriteContractErrorType)}
        setIsLoading(false)
    }
    const unstakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request: request1 } = await simulateContract(config, { 
                ...v3StakerContract, 
                functionName: 'unstakeToken',
                args: [{
                    rewardToken: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring',
                    pool: '0x77069e705dce52ed903fd577f46dcdb54d4db0ac' as '0xstring',
                    startTime: BigInt(1755589200),
                    endTime: BigInt(3270351988),
                    refundee: '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea' as '0xstring'
                }, _nftId]
            })
            const h1 = await writeContract(config, request1)
            await waitForTransactionReceipt(config, { hash: h1 })
            const { request: request2 } = await simulateContract(config, {...v3StakerContract, functionName: 'withdrawToken', args: [_nftId, addr as '0xstring', '0x']})
            const h2 = await writeContract(config, request2)
            await waitForTransactionReceipt(config, { hash: h2 })
            setTxupdate(h2)
        } catch (e) {setErrMsg(e as WriteContractErrorType)}
        setIsLoading(false)
    }

    React.useEffect(() => {
        if (pathname === undefined) {
            router.push('/staking/' + address)
        } else if (pathname.length === 42) {
            setAddr(pathname as '0xstring')
        } else if (address === undefined) {
            router.push('/staking/undefined')
        } else {
            router.push('/staking/' + address)
        }
        const fetch2 = async () => {
            const _eventMyNftStaking = (await publicClient.getContractEvents({...erc721ABI, address: POSITION_MANAGER, eventName: 'Transfer', args: {to: V3_STAKER,}, fromBlock: positionManagerCreatedAt, toBlock: 'latest'}))
                .map(obj => {return obj.args.tokenId})
            const eventMyNftStaking = [...new Set(_eventMyNftStaking)]
            const checkMyNftOwner = await readContracts(config, {contracts: eventMyNftStaking.map(obj => ({ ...v3StakerContract, functionName: 'deposits', args: [obj] }))})
            const checkedMyNftStaking = eventMyNftStaking.filter((obj, index) => {
                const res = checkMyNftOwner[index].result as unknown as [string, bigint, bigint, bigint][]
                return res[0].toString().toUpperCase() === address?.toUpperCase()
            })
            const tokenUriMyStaking = await readContracts(config, {contracts: checkedMyNftStaking.map((obj) => ({ ...positionManagerContract, functionName: 'tokenURI', args: [obj] }))})
            const posMyStaking = await readContracts(config, {contracts: checkedMyNftStaking.map((obj) => ({ ...positionManagerContract, functionName: 'positions', args: [obj] }))})
            const myReward = await readContracts(config, { 
                contracts: checkedMyNftStaking.map((obj) => ({ 
                    ...v3StakerContract, 
                    functionName: 'getRewardInfo', 
                    args: [{
                        rewardToken: '0xE7f64C5fEFC61F85A8b851d8B16C4E21F91e60c0' as '0xstring',
                        pool: '0x77069e705dce52ed903fd577f46dcdb54d4db0ac' as '0xstring',
                        startTime: BigInt(1755589200),
                        endTime: BigInt(3270351988),
                        refundee: '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea' as '0xstring'
                    }, obj] 
                }))
            })
            const incentiveStat = await readContract(config, { ...v3StakerContract, functionName: 'incentives', args: ['0x54f969cc76b69f12f67a135d9a7f088edafa2e8ebb3e247859acd17d8e849993'] })
            setAllStaker(String(incentiveStat[2]))
            let _allPending = 0
            for (let i = 0; i <= myReward.length - 1; i++) {
                const result: any = myReward[i].result
                _allPending += Number(formatEther(result[0]))
            }
            setAllPending(String(_allPending))
            const myStaking : MyPosition[] = (await Promise.all(checkedMyNftStaking.map(async (obj, index) => {
                const metadataFetch = await fetch(tokenUriMyStaking[index].result as string)
                const metadata = await metadataFetch.json()
                const pos = posMyStaking[index].result !== undefined ? posMyStaking[index].result as unknown as (bigint | string)[] : []
                const reward = myReward[index].result !== undefined ? myReward[index].result as unknown as (bigint | bigint)[] : []
                const pairAddr = await readContract(config, { ...v3FactoryContract, functionName: 'getPool', args: [pos[2] as '0xstring', pos[3] as '0xstring', Number(pos[4])] })
                const slot0 = await readContract(config, { ...v3PoolABI, address: pairAddr, functionName: 'slot0' })
                const tokenName = await readContracts(config, {
                    contracts: [
                        { ...erc20ABI, address: pos[2] as '0xstring', functionName: 'symbol' },
                        { ...erc20ABI, address: pos[3] as '0xstring', functionName: 'symbol' }
                    ]
                })
                const qouteFee = await simulateContract(config, {
                    ...positionManagerContract,
                    functionName: 'collect',
                    args: [{
                        tokenId: obj as bigint,
                        recipient: addr as '0xstring',
                        amount0Max: BigInt("340282366920938463463374607431768211455"),
                        amount1Max: BigInt("340282366920938463463374607431768211455"),
                    }],
                    account: V3_STAKER,
                })
                const liquidity = pos[7] as string
                const _currPrice = (Number(slot0[0]) / (2 ** 96)) ** 2
                const lowerTick = Number(pos[5])
                const upperTick = Number(pos[6])
                const _lowerPrice = Math.pow(1.0001, lowerTick)
                const _upperPrice = Math.pow(1.0001, upperTick)
                const _amount0 = calcAmount0(Number(liquidity), _currPrice, _lowerPrice, _upperPrice, 18, 18)
                const _amount1 = calcAmount1(Number(liquidity), _currPrice, _lowerPrice, _upperPrice, 18, 18)
                const _token0name = tokenName[0].status === 'success' ? String(tokenName[0].result) : ''
                const _token1name = tokenName[1].status === 'success' ? String(tokenName[1].result) : ''
                const _fee0 = qouteFee.result[0]
                const _fee1 = qouteFee.result[1]
                let token0addr; let token1addr; let token0name; let token1name; let amount0; let amount1; let lowerPrice; let upperPrice; let currPrice; let fee0; let fee1;
                if (_token1name === 'WJBC') {
                    token0addr = pos[3]
                    token1addr = pos[2]
                    token0name = _token0name
                    token1name = _token1name
                    amount0 = _amount0 / 1e18
                    amount1 = _amount1 / 1e18
                    lowerPrice = 1 / _upperPrice
                    upperPrice = 1 / _lowerPrice
                    currPrice = 1 / _currPrice
                    fee0 = _fee0
                    fee1 = _fee1
                } else if (_token1name === 'CMJ' && _token0name !== 'WJBC') {
                    token0addr = pos[3]
                    token1addr = pos[2]
                    token0name = _token0name
                    token1name = _token1name
                    amount0 = _amount0 / 1e18
                    amount1 = _amount1 / 1e18
                    lowerPrice = 1 / _upperPrice
                    upperPrice = 1 / _lowerPrice
                    currPrice = 1 / _currPrice
                    fee0 = _fee0
                    fee1 = _fee1
                } else {
                    token0addr = pos[2]
                    token1addr = pos[3]
                    token0name = _token1name
                    token1name = _token0name
                    amount0 = _amount1 / 1e18
                    amount1 = _amount0 / 1e18
                    lowerPrice = _lowerPrice
                    upperPrice = _upperPrice
                    currPrice = _currPrice
                    fee0 = _fee1
                    fee1 = _fee0
                }
                return {
                    Id: Number(obj),
                    Name: String(metadata.name),
                    Image: String(metadata.image),
                    FeeTier: Number(pos[4]),
                    Pair: pairAddr as string,
                    Token0Addr: token0addr as string,
                    Token1Addr: token1addr as string,
                    Token0: token0name,
                    Token1: token1name,
                    Amount0: amount0,
                    Amount1: amount1,
                    MinPrice: lowerPrice,
                    MaxPrice: upperPrice,
                    CurrPrice: currPrice,
                    LowerTick: lowerTick,
                    UpperTick: upperTick,
                    Liquidity: liquidity,
                    Fee0: Number(fee0) / 1e18,
                    Fee1: Number(fee1) / 1e18,
                    IsStaking: true,
                    Reward: Number(formatEther(reward[0]))
                }
            }))).filter((obj) => {return Number(obj.Liquidity) !== 0
            }).reverse()
            const balanceOfMyPosition = await readContract(config, { ...positionManagerContract, functionName: 'balanceOf', args: [addr as '0xstring'] })
            const init: any = {contracts: []}
            for (let i = 0; i <= Number(balanceOfMyPosition) - 1; i++) {
                init.contracts.push({ ...positionManagerContract, functionName: 'tokenOfOwnerByIndex', args: [addr, i] })
            }
            const tokenIdMyPosition = await readContracts(config, init)
            const tokenUriMyPosition = await readContracts(config, {contracts: tokenIdMyPosition.map((obj) => ({ ...positionManagerContract, functionName: 'tokenURI', args: [obj.result] }))})
            const posMyPosition = await readContracts(config, {contracts: tokenIdMyPosition.map((obj) => ({ ...positionManagerContract, functionName: 'positions', args: [obj.result] }))})
            const myPosition : MyPosition[] = (await Promise.all(tokenIdMyPosition.map(async (obj, index) => {
                const metadataFetch = await fetch(tokenUriMyPosition[index].result as string)
                const metadata = await metadataFetch.json()
                const pos = posMyPosition[index].result !== undefined ? posMyPosition[index].result as unknown as (bigint | string)[] : []
                const pairAddr = await readContract(config, { ...v3FactoryContract, functionName: 'getPool', args: [pos[2] as '0xstring', pos[3] as '0xstring', Number(pos[4])] })
                const slot0 = await readContract(config, { ...v3PoolABI, address: pairAddr, functionName: 'slot0' })
                const tokenName = await readContracts(config, {
                    contracts: [
                        { ...erc20ABI, address: pos[2] as '0xstring', functionName: 'symbol' },
                        { ...erc20ABI, address: pos[3] as '0xstring', functionName: 'symbol' }
                    ]
                })
                const qouteFee = await simulateContract(config, {
                    ...positionManagerContract,
                    functionName: 'collect',
                    args: [{
                        tokenId: obj.result as bigint,
                        recipient: addr as '0xstring',
                        amount0Max: BigInt("340282366920938463463374607431768211455"),
                        amount1Max: BigInt("340282366920938463463374607431768211455"),
                    }]
                })
                const liquidity = pos[7] as string
                const _currPrice = (Number(slot0[0]) / (2 ** 96)) ** 2
                const lowerTick = Number(pos[5])
                const upperTick = Number(pos[6])
                const _lowerPrice = Math.pow(1.0001, lowerTick)
                const _upperPrice = Math.pow(1.0001, upperTick)
                const _amount0 = calcAmount0(Number(liquidity), _currPrice, _lowerPrice, _upperPrice, 18, 18)
                const _amount1 = calcAmount1(Number(liquidity), _currPrice, _lowerPrice, _upperPrice, 18, 18)
                const _token0name = tokenName[0].status === 'success' ? String(tokenName[0].result) : ''
                const _token1name = tokenName[1].status === 'success' ? String(tokenName[1].result) : ''
                const _fee0 = qouteFee.result[0]
                const _fee1 = qouteFee.result[1]
                let token0addr; let token1addr; let token0name; let token1name; let amount0; let amount1; let lowerPrice; let upperPrice; let currPrice; let fee0; let fee1;
                if (_token1name === 'WJBC') {
                    token0addr = pos[3]
                    token1addr = pos[2]
                    token0name = _token0name
                    token1name = _token1name
                    amount0 = _amount0 / 1e18
                    amount1 = _amount1 / 1e18
                    lowerPrice = 1 / _upperPrice
                    upperPrice = 1 / _lowerPrice
                    currPrice = 1 / _currPrice
                    fee0 = _fee0
                    fee1 = _fee1
                } else if (_token1name === 'CMJ' && _token0name !== 'WJBC') {
                    token0addr = pos[3]
                    token1addr = pos[2]
                    token0name = _token0name
                    token1name = _token1name
                    amount0 = _amount0 / 1e18
                    amount1 = _amount1 / 1e18
                    lowerPrice = 1 / _upperPrice
                    upperPrice = 1 / _lowerPrice
                    currPrice = 1 / _currPrice
                    fee0 = _fee0
                    fee1 = _fee1
                } else {
                    token0addr = pos[2]
                    token1addr = pos[3]
                    token0name = _token1name
                    token1name = _token0name
                    amount0 = _amount1 / 1e18
                    amount1 = _amount0 / 1e18
                    lowerPrice = _lowerPrice
                    upperPrice = _upperPrice
                    currPrice = _currPrice
                    fee0 = _fee1
                    fee1 = _fee0
                }
                return {
                    Id: Number(obj.result),
                    Name: String(metadata.name),
                    Image: String(metadata.image),
                    FeeTier: Number(pos[4]),
                    Pair: pairAddr as string,
                    Token0Addr: token0addr as string,
                    Token1Addr: token1addr as string,
                    Token0: token0name,
                    Token1: token1name,
                    Amount0: amount0,
                    Amount1: amount1,
                    MinPrice: lowerPrice,
                    MaxPrice: upperPrice,
                    CurrPrice: currPrice,
                    LowerTick: lowerTick,
                    UpperTick: upperTick,
                    Liquidity: liquidity,
                    Fee0: Number(fee0) / 1e18,
                    Fee1: Number(fee1) / 1e18,
                    IsStaking: false,
                    Reward: 0
                }
            })))
            .reverse()
            setPosition(myStaking.concat(myPosition))
        }
        address !== undefined && fetch2()
    }, [config, address, addr, pathname, chain, txupdate])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-emerald-950 text-white">
            {isLoading && <div className="fixed inset-0 z-[999] backdrop-blur-md bg-black/20 flex items-center justify-center"><div className="h-10 w-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" /></div>}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <header className="relative">
                <div className="relative h-50 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wider text-white drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">Staking (tK-tKKUB) earn Points</span>
                            </h1>
                            <p className="mt-3 text-sm md:text-lg text-gray-300 leading-relaxed max-w-2xl">Stake your tokens to earn <span className="text-green-400 font-semibold">reward points</span>and participate in <span className="text-green-300 font-semibold">Node Revenue Distribution</span>. <br className="hidden sm:block" />If you <span className="text-red-400 font-semibold">withdraw</span> before distribution, you <span className="text-red-400 font-semibold">forfeit your eligibility</span>.</p>
                            <p><span className="text-red-400 font-semibold">kubtestnet no real distribution</span></p>
                            <div className="mt-5 h-[2px] w-32 bg-gradient-to-r from-green-400/70 to-green-100/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 mt-16 relative z-10">
                <div className="mb-8">
                    <Tabs defaultValue='0'>
                        <TabsList className='bg-transparent flex flex-wrap gap-2'>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='0'>KUB validator: liquidity mining</TabsTrigger>
                            <TabsTrigger className='cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-md border transition-colors data-[state=active]:!bg-green-900/20 data-[state=active]:!border-green-500 data-[state=active]:!text-green-400 data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-800 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:border-gray-700 data-[state=inactive]:hover:bg-gray-900/50' value='1'>Point</TabsTrigger>
                        </TabsList>
                        <TabsContent value='0'>
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                                    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">my reward point pending</div>
                                        <div className="flex items-center text-3xl font-light">
                                            <span>{Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 8 }).format(Number(allPending))}</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">total stakers</div>
                                        <div className="flex items-center text-3xl font-light">
                                            <span>{Intl.NumberFormat('en-US').format(Number(allStaker))}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {position[0] !== undefined ? (
                                        <>
                                            {position.map(obj => 
                                                <div key={Number(obj.Id)} className="mb-4 bg-[#0a0b1e]/80 border border-[#00ff9d]/10 rounded-xl gap-2 flex flex-col items-start text-xs">
                                                    <div className="w-full py-4 h-[242px] bg-white/5 rounded-t-xl relative inset-0 h-full w-full bg-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                                                        <img alt="" src={obj.Image} height={100} width={100} className="place-self-center" />
                                                        <span className="absolute bottom-5 left-5">{obj.CurrPrice > obj.MinPrice && obj.CurrPrice < obj.MaxPrice ? 'In range' : 'Out of range'}</span>
                                                        <span className="absolute bottom-5 right-5">{obj.FeeTier / 10000}%</span>
                                                    </div>
                                                    <div className="w-full py-1 px-6 flex flex-row justify-between">
                                                        <span className="text-gray-500">Position #{obj.Id}</span>
                                                        <span>{obj.Amount0.toFixed(4)} <span className="text-gray-500">{obj.Token0} /</span> {obj.Amount1.toFixed(4)} <span className="text-gray-500">{obj.Token1}</span></span>
                                                    </div>
                                                    <div className="w-full py-1 px-6 flex flex-row justify-between">
                                                        <span className="text-gray-500">Fee</span>
                                                        <span>{obj.Fee0.toFixed(4)} <span className="text-gray-500">{obj.Token0} /</span> {obj.Fee1.toFixed(4)} <span className="text-gray-500">{obj.Token1}</span></span>
                                                    </div>
                                                    <div className="w-full py-1 px-6 flex flex-row justify-between">
                                                        <span className="text-gray-500">Current : Min : Max</span>
                                                        <span>{obj.CurrPrice.toFixed(4)} : {obj.MinPrice.toFixed(4)} : {obj.MaxPrice > 1e18 ? 'Infinity' : obj.MaxPrice.toFixed(4)} <span className="text-gray-500">{obj.Token0}/{obj.Token1}</span></span>
                                                    </div>
                                                    <div className="w-full py-1 px-6 flex flex-row justify-between">
                                                        <span className="text-gray-500">Percentage pending reward</span>
                                                        <span>{obj.Reward.toFixed(8)}</span>
                                                    </div>
                                                    <div className="w-full my-4 px-6 flex space-x-2">
                                                        {obj.IsStaking ?                                            
                                                            <Button variant="ghost" className="flex-1 px-3 py-2 bg-red-900/30 border border-red-900/50 rounded-md text-xs text-red-400 hover:bg-red-900/40" onClick={() => {unstakeNft(obj.Id as unknown as bigint)}}>Unstake</Button> :
                                                            <Button variant="ghost" className="flex-1 px-3 py-2 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40" onClick={() => {stakeNft(obj.Id as unknown as bigint)}}>Stake</Button>
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : <div className="col-span-full bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8 text-center text-slate-400">No positions found.</div>}
                                </div>
                            </>
                        </TabsContent>
                        <TabsContent value='1'>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                                    <div className='text-xs text-gray-400 uppercase tracking-wider mb-2'>TOTAL POINT</div>
                                    <div className='text-3xl font-light'>
                                        {addr !== undefined ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(totalPoint) : 0}                                
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
