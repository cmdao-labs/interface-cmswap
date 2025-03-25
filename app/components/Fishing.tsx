import React from "react"
import { useAccount } from "wagmi"
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther } from "viem"
import { v3FactoryContract, positionManagerContract, erc20ABI, v3PoolABI, publicClient, erc721ABI, POSITION_MANAGER, positionManagerCreatedAt, V3_STAKER, v3StakerContract, esTokenHook003Addr } from '@/app/lib/8899'
import { config } from '@/app/config'

type MyPosition = {
    Id: number;
    Name: string;
    Image: string;
    FeeTier: number;
    Pair: string;
    Token0Addr: string;
    Token1Addr: string;
    Token0: string;
    Token1: string;
    Amount0: number;
    Amount1: number;
    MinPrice: number;
    MaxPrice: number;
    CurrPrice: number;
    LowerTick: number;
    UpperTick: number;
    Liquidity: string;
    Fee0: number;
    Fee1: number;
    IsStaking: boolean;
    Reward: number;
}

export default function Fishing({ 
    setTxupdate, txupdate, setErrMsg, setIsLoading,
}: {
    setTxupdate: React.Dispatch<React.SetStateAction<string>>
    txupdate: string
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const { address } = useAccount()
    const [position, setPosition] = React.useState<MyPosition[]>([])
    const [allPending, setAllPending] = React.useState('')
    const [esTunaBalance, setEsTunaBalance] = React.useState('')

    const calcAmount0 = (
        liquidity: number,
        currentPrice: number,
        priceLower: number,
        priceUpper: number,
        token0Decimals: number,
        token1Decimals: number
    ) => {
        const decimalAdjustment = 10 ** (token0Decimals - token1Decimals)
        const mathCurrentPrice = Math.sqrt(currentPrice / decimalAdjustment)
        const mathPriceUpper = Math.sqrt(priceUpper / decimalAdjustment)
        const mathPriceLower = Math.sqrt(priceLower / decimalAdjustment)
        
        let math
        if (mathCurrentPrice <= mathPriceLower) {
            math = liquidity * ((mathPriceUpper - mathPriceLower) / (mathPriceLower * mathPriceUpper))
        } else {
            math = liquidity * ((mathPriceUpper - mathCurrentPrice) / (mathCurrentPrice * mathPriceUpper))
        }
        const adjustedMath = math > 0 ? math : 0
        return adjustedMath
    }
      
    const calcAmount1 = (
        liquidity: number,
        currentPrice: number,
        priceLower: number,
        priceUpper: number,
        token0Decimals: number,
        token1Decimals: number
    ) => {
        const decimalAdjustment = 10 ** (token0Decimals - token1Decimals)
        const mathCurrentPrice = Math.sqrt(currentPrice / decimalAdjustment)
        const mathPriceUpper = Math.sqrt(priceUpper / decimalAdjustment)
        const mathPriceLower = Math.sqrt(priceLower / decimalAdjustment)
        
        let math
        if (mathCurrentPrice >= mathPriceUpper) {
            math = liquidity * (mathPriceUpper - mathPriceLower)
        } else {
            math = liquidity * (mathCurrentPrice - mathPriceLower)
        }
        const adjustedMath = math > 0 ? math : 0
        return adjustedMath
    }

    const claimReward = async (_amount: string) => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, { 
                ...v3StakerContract, 
                functionName: 'claimReward',
                args: [esTokenHook003Addr, address as '0xstring', parseEther(_amount)] 
            })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const stakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request: request1 } = await simulateContract(config, { ...erc721ABI, address: POSITION_MANAGER, functionName: 'safeTransferFrom', args: [address as '0xstring', V3_STAKER, _nftId] })
            const h = await writeContract(config, request1)
            await waitForTransactionReceipt(config, { hash: h })
            const { request: request2 } = await simulateContract(config, { 
                ...v3StakerContract, 
                functionName: 'stakeToken',
                args: [{
                    rewardToken: esTokenHook003Addr,
                    pool: '0x709921132f2d5e9360ecc518c700c896f89fd938' as '0xstring',
                    startTime: BigInt(1742650200),
                    endTime: BigInt(1798736400),
                    refundee: '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea' as '0xstring'
                }, _nftId] 
            })
            const h2 = await writeContract(config, request2)
            await waitForTransactionReceipt(config, { hash: h2 })
            setTxupdate(h2)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const unstakeNft = async (_nftId: bigint) => {
        setIsLoading(true)
        try {
            const { request: request1 } = await simulateContract(config, { 
                ...v3StakerContract, 
                functionName: 'unstakeToken',
                args: [{
                    rewardToken: esTokenHook003Addr,
                    pool: '0x709921132f2d5e9360ecc518c700c896f89fd938' as '0xstring',
                    startTime: BigInt(1742650200),
                    endTime: BigInt(1798736400),
                    refundee: '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea' as '0xstring'
                }, _nftId] 
            })
            const h1 = await writeContract(config, request1)
            await waitForTransactionReceipt(config, { hash: h1 })
            const { request: request2 } = await simulateContract(config, { 
                ...v3StakerContract, 
                functionName: 'withdrawToken',
                args: [_nftId, address as '0xstring', '0x'] 
            })
            const h2 = await writeContract(config, request2)
            await waitForTransactionReceipt(config, { hash: h2 })
            setTxupdate(h2)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    React.useEffect(() => {
        const fetch2 = async () => {
            const _eventMyNftStaking = (await publicClient.getContractEvents({
                ...erc721ABI,
                address: POSITION_MANAGER,
                eventName: 'Transfer',
                args: { 
                    to: V3_STAKER,
                },
                fromBlock: positionManagerCreatedAt,
                toBlock: 'latest'
            })).map(obj => {
                return obj.args.tokenId
            })
            const eventMyNftStaking = [...new Set(_eventMyNftStaking)]
            const checkMyNftOwner = await readContracts(config, {
                contracts: eventMyNftStaking.map(obj => ({ ...v3StakerContract, functionName: 'deposits', args: [obj] }))
            })
            const checkedMyNftStaking = eventMyNftStaking.filter((obj, index) => {
                const res = checkMyNftOwner[index].result as unknown as [string, bigint, bigint, bigint][]
                return res[0].toString().toUpperCase() === address?.toUpperCase()
            })
            const tokenUriMyStaking = await readContracts(config, {
                contracts: checkedMyNftStaking.map((obj) => (
                    { ...positionManagerContract, functionName: 'tokenURI', args: [obj] }
                ))
            })
            const posMyStaking = await readContracts(config, {
                contracts: checkedMyNftStaking.map((obj) => (
                    { ...positionManagerContract, functionName: 'positions', args: [obj] }
                ))
            })
            const myReward = await readContracts(config, { 
                contracts: checkedMyNftStaking.map((obj) => ({ 
                    ...v3StakerContract, 
                    functionName: 'getRewardInfo', 
                    args: [{
                        rewardToken: esTokenHook003Addr,
                        pool: '0x709921132f2d5e9360ecc518c700c896f89fd938' as '0xstring',
                        startTime: BigInt(1742650200),
                        endTime: BigInt(1798736400),
                        refundee: '0x1fe5621152a33a877f2b40a4bb7bc824eebea1ea' as '0xstring'
                    }, obj] 
                }))
            })

            const _allPending = await readContract(config, { ...v3StakerContract, functionName: 'rewards', args: [esTokenHook003Addr, address as '0xstring'] })
            setAllPending(formatEther(_allPending))
            const _esTunaBalance = await readContract(config, { ...erc20ABI, address: esTokenHook003Addr, functionName: 'balanceOf', args: [address as '0xstring'] })
            setEsTunaBalance(formatEther(_esTunaBalance))


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
                        recipient: address as '0xstring',
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
                let token0addr
                let token1addr
                let token0name
                let token1name
                let amount0
                let amount1
                let lowerPrice
                let upperPrice
                let currPrice
                let fee0
                let fee1

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
            }))).filter((obj) => {
                return Number(obj.Liquidity) !== 0
            }).reverse()

            const balanceOfMyPosition = await readContract(config, { ...positionManagerContract, functionName: 'balanceOf', args: [address as '0xstring'] })
            const init: any = {contracts: []}
            for (let i = 0; i <= Number(balanceOfMyPosition) - 1; i++) {
                init.contracts.push(
                    { ...positionManagerContract, functionName: 'tokenOfOwnerByIndex', args: [address as '0xstring', i] }
                )
            }
            const tokenIdMyPosition = await readContracts(config, init)
            const tokenUriMyPosition = await readContracts(config, {
                contracts: tokenIdMyPosition.map((obj) => (
                    { ...positionManagerContract, functionName: 'tokenURI', args: [obj.result] }
                ))
            })
            const posMyPosition = await readContracts(config, {
                contracts: tokenIdMyPosition.map((obj) => (
                    { ...positionManagerContract, functionName: 'positions', args: [obj.result] }
                ))
            })

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
                        recipient: address as '0xstring',
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
                let token0addr
                let token1addr
                let token0name
                let token1name
                let amount0
                let amount1
                let lowerPrice
                let upperPrice
                let currPrice
                let fee0
                let fee1

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
            }))).filter((obj) => {
                return (Number(obj.Liquidity) !== 0 && (obj.Token0 === 'JUSDT' && obj.Token1 === 'WJBC'))
            }).reverse()

            setPosition(myStaking.concat(myPosition))
        }

        address !== undefined && fetch2()
    }, [config, address, txupdate])

    return (
        <main className="container mx-auto py-4 md:py-6 mt-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-400 mb-1">esTuna Pending</div>
                    <div className="flex items-center">
                        <span className="text-xl font-light">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(allPending))}</span>
                        <span className="text-yellow-500 mx-2">⦿</span>
                        <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" height={20} width={20} />
                    </div>
                    <button className="flex-1 px-3 py-2 mt-3 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40 transition-colors cursor-pointer" onClick={() => {claimReward(allPending.toString())}}>Claim reward</button>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-400 mb-1">esTuna Balance</div>
                    <div className="flex items-center">
                        <span className="text-xl font-light">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(esTunaBalance))}</span>
                        <span className="text-yellow-500 mx-2">⦿</span>
                        <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" height={20} width={20} />
                    </div>
                    <span className="text-xs">Vester NFT ID: {}</span>
                    <button className="flex-1 px-3 py-2 mt-3 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40 transition-colors cursor-pointer">Vest</button>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-400 mb-1">esTuna Vesting</div>
                    <div className="flex items-center">
                        <span className="text-xl font-light"></span>
                        <span className="text-yellow-500 mx-2">⦿</span>
                        <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height={20} width={20} />
                    </div>
                    <button className="flex-1 px-3 py-2 mt-3 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40 transition-colors cursor-pointer">Claim</button>
                </div>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-400 mb-1">cTuna Balance</div>
                    <div className="flex items-center">
                        <span className="text-xl font-light"></span>
                        <span className="text-yellow-500 mx-2">⦿</span>
                        <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height={20} width={20} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {position[0] !== undefined &&
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
                                    <span>{obj.CurrPrice.toFixed(4)} : {obj.MinPrice.toFixed(4)} : {obj.MaxPrice > 1e18 ? '♾️' : obj.MaxPrice.toFixed(4)} <span className="text-gray-500">{obj.Token0}/{obj.Token1}</span></span>
                                </div>
                                <div className="w-full py-1 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500">Pending reward</span>
                                    <span>{obj.Reward.toFixed(4)}</span>
                                </div>
                                <div className="w-full my-4 px-6 flex space-x-2">
                                    {obj.IsStaking ?                                            
                                        <button className="flex-1 px-3 py-2 bg-red-900/30 border border-red-900/50 rounded-md text-xs text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer" onClick={() => {unstakeNft(obj.Id as unknown as bigint)}}>Unstake</button> :
                                        <button className="flex-1 px-3 py-2 bg-green-900/30 border border-green-900/50 rounded-md text-xs text-green-400 hover:bg-green-900/40 transition-colors cursor-pointer" onClick={() => {stakeNft(obj.Id as unknown as bigint)}}>Stake</button>
                                    }
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </main>
    )
}
