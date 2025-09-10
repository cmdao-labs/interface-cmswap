import React from "react"
import { useAccount } from "wagmi"
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther } from "viem"
import { Token, BigintIsh } from "@uniswap/sdk-core"
import { Pool, Position } from "@uniswap/v3-sdk"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useDebouncedCallback } from 'use-debounce'
import { tokens, POSITION_MANAGER, v3FactoryContract, positionManagerContract, erc20ABI, v3PoolABI, wrappedNative } from '@/app/lib/8899'
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
}

export default function Positions8899({ 
    setIsLoading, setErrMsg, 
}: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>,
}) {
    const { address } = useAccount()
    const [txupdate, setTxupdate] = React.useState("")
    const [tokenA, setTokenA] = React.useState<{name: string, value: '0xstring', logo: string}>(tokens[0])
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{name: string, value: '0xstring', logo: string}>({name: 'Choose Token', value: '' as '0xstring', logo: '../favicon.ico'})
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [pairDetect, setPairDetect] = React.useState("")
    const [currPrice, setCurrPrice] = React.useState("")
    const [lowerPrice, setLowerPrice] = React.useState("")
    const [upperPrice, setUpperPrice] = React.useState("")
    const [lowerTick, setLowerTick] = React.useState("")
    const [upperTick, setUpperTick] = React.useState("")
    const [position, setPosition] = React.useState<MyPosition[]>([])
    const [positionSelected, setPositionSelected] = React.useState<MyPosition>()
    const [isAddPositionModal, setIsAddPositionModal] = React.useState(false)
    const [isRemPositionModal, setIsRemPositionModal] = React.useState(false)
    const [amountRemove, setAmountRemove] = React.useState("")

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

    const setAlignedAmountB = useDebouncedCallback(async (_amountA: string) => {
        const poolState = await readContracts(config, {
            contracts: [
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' },
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'slot0' },
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'liquidity' }
            ]
        })
        const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
        const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
        const tick = poolState[1].result !== undefined ? poolState[1].result[1] : 0
        const liquidity = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
        const Token0 = new Token(8899, token0, 18)
        const Token1 = String(token0).toUpperCase() === tokenA.value.toUpperCase() ? new Token(8899, tokenB.value, 18) : new Token(8899, tokenA.value, 18)
        const pool = new Pool(
            Token0,
            Token1,
            Number(feeSelect),
            sqrtPriceX96.toString(),
            liquidity.toString(),
            tick
        )
        if (String(token0).toUpperCase() === tokenA.value.toUpperCase()) {
            const singleSidePositionToken1 = Position.fromAmount1({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount1: String(parseEther(_amountA)) as BigintIsh,
            })
            setAmountB(formatEther(singleSidePositionToken1.mintAmounts.amount0 as unknown as bigint))
        } else {
            const singleSidePositionToken0 = Position.fromAmount0({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount0: String(parseEther(_amountA)) as BigintIsh,
                useFullPrecision: true
            })
            setAmountB(formatEther(singleSidePositionToken0.mintAmounts.amount1 as unknown as bigint))
        }
    }, 700)

    const setAlignedAmountA = useDebouncedCallback(async (_amountB: string) => {
        const poolState = await readContracts(config, {
            contracts: [
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' },
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'slot0' },
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'liquidity' },
            ]
        })
        const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
        const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
        const tick = poolState[1].result !== undefined ? poolState[1].result[1] : 0
        const liquidity = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
        const Token0 = new Token(8899, token0, 18)
        const Token1 = String(token0).toUpperCase() === tokenA.value.toUpperCase() ? new Token(8899, tokenB.value, 18) : new Token(8899, tokenA.value, 18)
        const pool = new Pool(
            Token0,
            Token1,
            Number(feeSelect),
            sqrtPriceX96.toString(),
            liquidity.toString(),
            tick
        )
        if (String(token0).toUpperCase() === tokenA.value.toUpperCase()) {
            const singleSidePositionToken0 = Position.fromAmount0({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount0: String(parseEther(_amountB)) as BigintIsh,
                useFullPrecision: true
            })
            setAmountA(formatEther(singleSidePositionToken0.mintAmounts.amount1 as unknown as bigint))
        } else {
            const singleSidePositionToken1 = Position.fromAmount1({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount1: String(parseEther(_amountB)) as BigintIsh,
            })
            setAmountA(formatEther(singleSidePositionToken1.mintAmounts.amount0 as unknown as bigint))
        }
    }, 700)

    const getBalanceOfAB = async (_tokenAvalue: '0xstring', _tokenBvalue: '0xstring') => {
        const nativeBal = await getBalance(config, {address: address as '0xstring'})
        const bal = await readContracts(config, {
            contracts: [
                { ...erc20ABI, address: _tokenAvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                { ...erc20ABI, address: _tokenBvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
            ]
        })
        _tokenAvalue.toUpperCase() === tokens[0].value.toUpperCase() ? 
            setTokenABalance(formatEther(nativeBal.value)) :
            bal[0].result !== undefined && setTokenABalance(formatEther(bal[0].result))
        _tokenBvalue.toUpperCase() === tokens[0].value.toUpperCase() ? 
            setTokenBBalance(formatEther(nativeBal.value)) :
            bal[1].result !== undefined && setTokenBBalance(formatEther(bal[1].result))
    }

    const increaseLiquidity = async (_tokenId: bigint) => {
        setIsLoading(true)
        try {
            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const h = await sendTransaction(config, {to: tokens[0].value, value: parseEther(amountB)})
                await waitForTransactionReceipt(config, { hash: h })
            } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const h = await sendTransaction(config, {to: tokens[0].value, value: parseEther(amountA)})
                await waitForTransactionReceipt(config, { hash: h })
            }
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const allowanceB = await readContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceB < parseEther(amountB)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountB)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const { request } = await simulateContract(config, {
                ...positionManagerContract,
                functionName: 'increaseLiquidity',
                args: [{
                    tokenId: _tokenId, 
                    amount0Desired: parseEther(amountA),
                    amount1Desired: parseEther(amountB),
                    amount0Min: BigInt(0),
                    amount1Min: BigInt(0),
                    deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
                }]
            })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        clearState()
        setIsAddPositionModal(false)
        setIsLoading(false)
    }

    const decreaseLiquidity = async (_tokenId: bigint, _liquidity: bigint) => {
        setIsLoading(true)
        try {
            const { request: request1 } = await simulateContract(config, {
                ...positionManagerContract,
                functionName: 'decreaseLiquidity',
                args: [{
                    tokenId: _tokenId, 
                    liquidity: _liquidity,
                    amount0Min: BigInt(0),
                    amount1Min: BigInt(0),
                    deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
                }]
            })
            let h = await writeContract(config, request1)
            await waitForTransactionReceipt(config, { hash: h })
            const { result, request: request2 } = await simulateContract(config, {
                ...positionManagerContract,
                functionName: 'collect',
                args: [{
                    tokenId: _tokenId, 
                    recipient: address as '0xstring',
                    amount0Max: BigInt("340282366920938463463374607431768211455"),
                    amount1Max: BigInt("340282366920938463463374607431768211455"),
                }]
            })
            h = await writeContract(config, request2)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    ...wrappedNative,
                    functionName: 'withdraw',
                    args: [result[1] as bigint]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    ...wrappedNative,
                    functionName: 'withdraw',
                    args: [result[0] as bigint]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setAmountRemove('')
        setIsRemPositionModal(false)
        setIsLoading(false)
    }

    const collectFee = async (_tokenId: bigint) => {
        setIsLoading(true)
        try {
            const { request } = await simulateContract(config, {
                ...positionManagerContract,
                functionName: 'collect',
                args: [{
                    tokenId: _tokenId, 
                    recipient: address as '0xstring',
                    amount0Max: BigInt("340282366920938463463374607431768211455"),
                    amount1Max: BigInt("340282366920938463463374607431768211455"),
                }]
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setAmountRemove('')
        setIsRemPositionModal(false)
        setIsLoading(false)
    }

    React.useEffect(() => {
        const fetch2 = async () => {
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
                    Fee1: Number(fee1) / 1e18
                }
            }))).filter((obj) => {
                return Number(obj.Liquidity) !== 0
            }).reverse()

            setPosition(myPosition)
        }

        setAmountA("")
        setAmountB("")
        address !== undefined && fetch2()
    }, [config, address, tokenA, tokenB, feeSelect, txupdate])
    const clearState = () => {
        setTokenA(tokens[0])
        setTokenB({name: 'Choose Token', value: '' as '0xstring', logo: '../favicon.ico'})
        setFeeSelect(10000)
        setLowerTick("") 
        setUpperTick("")
        setLowerPrice("") 
        setUpperPrice("")
    }
    console.log({lowerTick, upperTick}) // for fetch monitoring

    return (
        <>
            <ScrollArea className="h-[650px] px-4">
                {position[0] !== undefined &&
                    <>
                        {position.map(obj => 
                            <div key={Number(obj.Id)} className="mb-4 w-full bg-[#0a0b1e]/80 border border-[#00ff9d]/10 rounded-xl gap-2 flex flex-col items-start">
                                <div className="w-full grid py-4 h-[242px] bg-white/5 rounded-t-xl relative inset-0 h-full w-full bg-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                                    <img alt="" src={obj.Image} height={100} width={100} className="place-self-center" style={{alignSelf: 'center', justifySelf: 'center'}} />
                                    <span className="absolute bottom-5 left-5">{obj.CurrPrice > obj.MinPrice && obj.CurrPrice < obj.MaxPrice ? 'In range' : 'Out of range'}</span>
                                    <span className="absolute bottom-5 right-5">{obj.FeeTier / 10000}%</span>
                                </div>
                                <div className="w-full py-1 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500 text-left">Position #{obj.Id}</span>
                                    <span className="text-right">{obj.Amount0.toFixed(4)} <span className="text-gray-500">{obj.Token0} /</span> {obj.Amount1.toFixed(4)} <span className="text-gray-500">{obj.Token1}</span></span>
                                </div>
                                <div className="w-full py-1 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500 text-left">Fee</span>
                                    <span className="text-right">{obj.Fee0.toFixed(4)} <span className="text-gray-500">{obj.Token0} /</span> {obj.Fee1.toFixed(4)} <span className="text-gray-500">{obj.Token1}</span></span>
                                </div>
                                <div className="w-full py-1 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500 text-left">Current : Min : Max</span>
                                    <span className="text-right">{obj.CurrPrice.toFixed(4)} : {obj.MinPrice.toFixed(4)} : {obj.MaxPrice > 1e18 ? '♾️' : obj.MaxPrice.toFixed(4)} <span className="text-gray-500">{obj.Token0}/{obj.Token1}</span></span>
                                </div>
                                <div className="w-full mb-4 py-1 px-6 gap-2 flex flex-row items-start justify-start flex-wrap">
                                    <Drawer open={isAddPositionModal} onOpenChange={setIsAddPositionModal}>
                                        <Button 
                                            variant="outline"
                                            className="bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md cursor-pointer" 
                                            onClick={() => {
                                                setPositionSelected(obj)
                                                setTokenA({name: "", logo: "", value: obj.Token0Addr as '0xstring'})
                                                setTokenB({name: "", logo: "", value: obj.Token1Addr as '0xstring'})
                                                getBalanceOfAB(obj.Token1Addr as '0xstring', obj.Token0Addr as '0xstring')
                                                setPairDetect(obj.Pair); setFeeSelect(obj.FeeTier)
                                                setLowerTick(obj.LowerTick.toString())
                                                setUpperTick(obj.UpperTick.toString())
                                                setCurrPrice(obj.CurrPrice.toString())
                                                setLowerPrice(obj.MinPrice.toString())
                                                setUpperPrice(obj.MaxPrice.toString())
                                                setIsAddPositionModal(true)
                                            }}
                                        >
                                            Add
                                        </Button>
                                        <DrawerContent className="z-100 border">
                                            <div className="mx-auto w-3/4 xl:w-full max-w-sm space-y-4 my-7">
                                                <DrawerHeader>
                                                    <DrawerTitle className="text-2xl text-white">Add Liquidity</DrawerTitle>
                                                    <DrawerDescription>Position #{positionSelected !== undefined ? positionSelected.Id : '...'}</DrawerDescription>
                                                </DrawerHeader>
                                                {Number(lowerPrice) < Number(currPrice) &&
                                                    <div className="w-full gap-1 flex flex-row items-center">
                                                        <input className="w-1/2 p-4 bg-neutral-800 rounded-lg focus:outline-none" placeholder="0" value={amountA} onChange={e => {setAmountA(e.target.value); setAlignedAmountB(e.target.value);}} />
                                                        <span className="w-1/2 font-semibold text-right text-gray-400 text-xs">{Number(tokenABalance).toFixed(4)} {positionSelected !== undefined ? positionSelected.Token0 : '...'}</span>
                                                    </div>
                                                }
                                                {Number(upperPrice) > Number(currPrice) &&
                                                    <div className="w-full gap-1 flex flex-row items-center">
                                                        <input className="w-1/2 p-4 bg-neutral-800 rounded-lg focus:outline-none" placeholder="0" value={amountB} onChange={e => {setAmountB(e.target.value); setAlignedAmountA(e.target.value);}} />
                                                        <span className="w-1/2 font-semibold text-right text-gray-400 text-xs">{Number(tokenBBalance).toFixed(4)} {positionSelected !== undefined ? positionSelected.Token1 : '...'}</span>
                                                    </div>
                                                }
                                                <DrawerFooter>
                                                    <Button className="w-full bg-blue-500 text-white cursor-pointer hover-effect" onClick={() => positionSelected !== undefined && increaseLiquidity(BigInt(positionSelected.Id))}>Increase Liquidity</Button>
                                                </DrawerFooter>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                    <Drawer open={isRemPositionModal} onOpenChange={setIsRemPositionModal}>
                                        <Button variant="outline" className="bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md cursor-pointer" onClick={() => {setPositionSelected(obj); setIsRemPositionModal(true);}}>Remove</Button>
                                        <DrawerContent className="z-100 border">
                                            <div className="mx-auto w-full max-w-sm space-y-4 my-7">
                                                <DrawerHeader>
                                                    <DrawerTitle className="text-2xl text-white">Decrease Liquidity</DrawerTitle>
                                                    <DrawerDescription>Position #{positionSelected !== undefined ? positionSelected.Id : '...'}</DrawerDescription>
                                                </DrawerHeader>
                                                <div className="w-full gap-1 flex flex-row items-center">
                                                    <input className="p-4 bg-neutral-800 rounded-lg w-full focus:outline-none" type="text" placeholder="0" value={amountRemove} onChange={e => {setAmountRemove(e.target.value);}} />
                                                    <span className="w-2/6 font-semibold text-right text-gray-400">%</span>
                                                </div>
                                                <div className="w-full h-[70px] gap-2 flex flex-row">
                                                    <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '25' ? "bg-neutral-800" : "cursor-pointer")} onClick={() => setAmountRemove('25')}>25%</button>
                                                    <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '50' ? "bg-neutral-800" : "cursor-pointer")} onClick={() => setAmountRemove('50')}>50%</button>
                                                    <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '75' ? "bg-neutral-800" : "cursor-pointer")} onClick={() => setAmountRemove('75')}>75%</button>
                                                    <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '100' ? "bg-neutral-800" : "cursor-pointer")} onClick={() => setAmountRemove('100')}>100%</button>
                                                </div>
                                                <DrawerFooter>
                                                    <Button 
                                                        variant="destructive"
                                                        className="cursor-pointer"
                                                        onClick={() => 
                                                            positionSelected !== undefined && 
                                                                decreaseLiquidity(
                                                                    BigInt(positionSelected.Id), 
                                                                    amountRemove === '100' ? 
                                                                        BigInt(positionSelected.Liquidity) :
                                                                        BigInt(Number(positionSelected.Liquidity) * (Number(amountRemove)) / 100)
                                                                )
                                                        }
                                                    >
                                                        Remove Liquidity
                                                    </Button>
                                                </DrawerFooter>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                    {Number(obj.Fee0) > 0 && Number(obj.Fee1) > 0 && 
                                        <Button variant="outline" className="bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md cursor-pointer" onClick={() => collectFee(BigInt(obj.Id))}>Collect fee</Button>
                                    }
                                </div>
                            </div>
                        )}
                    </>
                }
            </ScrollArea>
        </>
    )
}
