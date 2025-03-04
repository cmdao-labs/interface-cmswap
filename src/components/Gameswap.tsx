import React from "react"
import { useAccount, type Config } from "wagmi"
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts } from '@wagmi/core'
import { erc20Abi, formatEther, parseEther } from "viem"
import { Token, BigintIsh } from "@uniswap/sdk-core"
import { TickMath, encodeSqrtRatioX96, Pool, Position } from "@uniswap/v3-sdk"
import { NonfungiblePositionManager, v3Factory, v3Pool, qouterV2, router02 } from "./abi"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useDebouncedCallback } from "use-debounce"

const tokens: {name: string, value: '0xstring', logo: string}[] = [
    { name: 'WJBC', value: '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq' },
    { name: 'CMJ', value: '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b' as '0xstring', logo: 'https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u' },
    // can PR listing here
]
const V3_FACTORY = '0x5835f123bDF137864263bf204Cf4450aAD1Ba3a7' as '0xstring'
const POSITION_MANAGER = '0xfC445018B20522F9cEd1350201e179555a7573A1' as '0xstring'
const QOUTER_V2 = '0x5ad32c64A2aEd381299061F32465A22B1f7A2EE2' as '0xstring'
const ROUTER02 = '0x2174b3346CCEdBB4Faaff5d8088ff60B74909A9d' as '0xstring'
const v3FactoryContract = { chainId: 8899, abi: v3Factory, address: V3_FACTORY } as const
const positionManagerContract = { chainId: 8899, address: POSITION_MANAGER, abi: NonfungiblePositionManager } as const
const qouterV2Contract = { chainId: 8899, abi: qouterV2, address: QOUTER_V2 } as const
const router02Contract = { chainId: 8899, abi: router02, address: ROUTER02 } as const
const erc20ABI = { chainId: 8899, abi: erc20Abi } as const
const v3PoolABI = { chainId: 8899, abi: v3Pool } as const

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

export default function Gameswap({ 
    config, setIsLoading, txupdate, setTxupdate, setErrMsg, 
}: {
    config: Config,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    txupdate: String | null,
    setTxupdate: React.Dispatch<React.SetStateAction<String | null>>,
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>,
}) {
    const [mode, setMode] = React.useState(0)
    const { address } = useAccount()
    const [exchangeRate, setExchangeRate] = React.useState("")
    const [tokenA, setTokenA] = React.useState<{name: string, value: '0xstring', logo: string}>(tokens[0])
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{name: string, value: '0xstring', logo: string}>({name: 'Choose Token', value: '' as '0xstring', logo: '/../favicon.png'})
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [pairDetect, setPairDetect] = React.useState("")
    const [currPrice, setCurrPrice] = React.useState("")
    const [lowerPrice, setLowerPrice] = React.useState("")
    const [upperPrice, setUpperPrice] = React.useState("")
    const [lowerPercentage, setLowerPercentage] = React.useState("0")
    const [upperPercentage, setUpperPercentage] = React.useState("0")
    const [currTickSpacing, setCurrTickSpacing] = React.useState("")
    const [lowerTick, setLowerTick] = React.useState("")
    const [upperTick, setUpperTick] = React.useState("")
    const [rangePercentage, setRangePercentage] = React.useState(0.15)
    const [position, setPosition] = React.useState<MyPosition[]>([])
    const [positionSelected, setPositionSelected] = React.useState<MyPosition>()
    const [isAddPositionModal, setIsAddPositionModal] = React.useState(false)
    const [isRemPositionModal, setIsRemPositionModal] = React.useState(false)
    const [amountRemove, setAmountRemove] = React.useState("")

    const getQoute = useDebouncedCallback(async (_amount: string) => {
        try {
            if (Number(_amount) !== 0) {
                const qouteOutput = await simulateContract(config, {
                    ...qouterV2Contract,
                    functionName: 'quoteExactInputSingle',
                    args: [{
                        tokenIn: tokenA.value as '0xstring',
                        tokenOut: tokenB.value as '0xstring',
                        amountIn: parseEther(_amount),
                        fee: feeSelect,
                        sqrtPriceLimitX96: BigInt(0),
                    }]
                })
                setAmountB(formatEther(qouteOutput.result[0]))
            } else {
                setAmountB("")
            }
        } catch {}
    }, 700)

    const swap = async () => {
        setIsLoading(true)
        try {
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', ROUTER02] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [ROUTER02, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const { request } = await simulateContract(config, {
                ...router02Contract,
                functionName: 'exactInputSingle',
                args: [{
                    tokenIn: tokenA.value as '0xstring',
                    tokenOut: tokenB.value as '0xstring',
                    fee: feeSelect,
                    recipient: address as '0xstring',
                    amountIn: parseEther(amountA),
                    amountOutMinimum: parseEther(String(Number(amountB) * 0.95)),
                    sqrtPriceLimitX96: BigInt(0)
                }]
            })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

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

    const setAlignedLowerTick = useDebouncedCallback((_lowerPrice: string) => {
        setAmountA("")
        setAmountB("")
        if (Number(_lowerPrice) > Number(upperPrice)) {
            setLowerPrice("")
            setLowerPercentage("")
        } else {
            const _lowerTick = Math.floor(Math.log(Number(_lowerPrice)) / Math.log(1.0001))
            let alignedLowerTick
            if (Number(_lowerPrice) === 0) {
                alignedLowerTick = Math.ceil(TickMath.MIN_TICK / Number(currTickSpacing)) * Number(currTickSpacing)
            } else {
                alignedLowerTick = Math.floor(_lowerTick / Number(currTickSpacing)) * Number(currTickSpacing)
                setLowerPrice(Math.pow(1.0001, alignedLowerTick).toString())
            }
            setLowerPercentage((((Math.pow(1.0001, alignedLowerTick) / Number(currPrice)) - 1) * 100).toString())
            setLowerTick(alignedLowerTick.toString())
        }
    }, 700)

    const setAlignedUpperTick = useDebouncedCallback((_upperPrice: string) => {
        setAmountA("")
        setAmountB("")
        if (Number(_upperPrice) < Number(lowerPrice)) {
            setUpperPrice("")
            setUpperPercentage("")
        } else {
            const _upperTick = Math.ceil(Math.log(Number(_upperPrice)) / Math.log(1.0001))
            let alignedUpperTick
            if (Number(_upperPrice) === Infinity) {
                alignedUpperTick = Math.floor(TickMath.MAX_TICK / Number(currTickSpacing)) * Number(currTickSpacing)
                setUpperPercentage('+Infinity')
            } else {
                alignedUpperTick = Math.ceil(_upperTick / Number(currTickSpacing)) * Number(currTickSpacing)
                setUpperPercentage((((Math.pow(1.0001, alignedUpperTick) / Number(currPrice)) - 1) * 100).toString())
                setUpperPrice(Math.pow(1.0001, alignedUpperTick).toString())
            }
            setUpperTick(alignedUpperTick.toString())
        }
    }, 700)

    const setAlignedAmountA = useDebouncedCallback(async (_amountB: string) => {
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
                amount1: String(parseEther(_amountB)) as BigintIsh,
            })
            setAmountA(formatEther(singleSidePositionToken1.mintAmounts.amount0 as unknown as bigint))
        } else {
            const singleSidePositionToken0 = Position.fromAmount0({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount0: String(parseEther(_amountB)) as BigintIsh,
                useFullPrecision: true
            })
            setAmountA(formatEther(singleSidePositionToken0.mintAmounts.amount1 as unknown as bigint))
        }
    }, 700)

    const setAlignedAmountB = useDebouncedCallback(async (_amountA: string) => {
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
                amount0: String(parseEther(_amountA)) as BigintIsh,
                useFullPrecision: true
            })
            setAmountB(formatEther(singleSidePositionToken0.mintAmounts.amount1 as unknown as bigint))
        } else {
            const singleSidePositionToken1 = Position.fromAmount1({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount1: String(parseEther(_amountA)) as BigintIsh,
            })
            setAmountB(formatEther(singleSidePositionToken1.mintAmounts.amount0 as unknown as bigint))
        }
    }, 700)

    const getBalanceOfAB = async (_tokenAvalue: '0xstring', _tokenBvalue: '0xstring') => {
        const bal = await readContracts(config, {
            contracts: [
                { ...erc20ABI, address: _tokenAvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                { ...erc20ABI, address: _tokenBvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
            ]
        })
        bal[0].result !== undefined && setTokenABalance(formatEther(bal[0].result as bigint))
        bal[1].result !== undefined && setTokenBBalance(formatEther(bal[1].result as bigint))
    }

    const increaseLiquidity = async (_tokenId: bigint) => {
        setIsLoading(true)
        try {
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const allowanceB = await readContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceB < parseEther(amountB)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountB)] })
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
            setErrMsg(String(e))
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
            const { request: request2 } = await simulateContract(config, {
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
        } catch (e) {
            setErrMsg(String(e))
        }
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
            setErrMsg(String(e))
        }
        setAmountRemove('')
        setIsRemPositionModal(false)
        setIsLoading(false)
    }

    const placeLiquidity = async () => {
        setIsLoading(true)
        try {
            let getToken0 = pairDetect !== '0x0000000000000000000000000000000000000000' ? 
                await readContract(config, { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' }) :
                ''
            if (pairDetect === '0x0000000000000000000000000000000000000000') {
                const { request: request0 } = await simulateContract(config, {
                    ...v3FactoryContract,
                    functionName: 'createPool',
                    args: [tokenA.value, tokenB.value, feeSelect]
                })
                let h = await writeContract(config, request0)
                await waitForTransactionReceipt(config, { hash: h })

                const newPair = await readContract(config, {...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, feeSelect] })
                getToken0 = await readContract(config, { ...v3PoolABI, address: newPair as '0xstring', functionName: 'token0'})
                const amount0 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountA : amountB
                const amount1 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountB : amountA
                const { request: request1 } = await simulateContract(config, {
                    ...v3PoolABI,
                    address: newPair as '0xstring',
                    functionName: 'initialize',
                    args: [BigInt(encodeSqrtRatioX96(parseEther(amount1).toString(), parseEther(amount0).toString()).toString())]
                })
                h = await writeContract(config, request1)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            }
            
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const allowanceB = await readContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceB < parseEther(amountB)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountB)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            
            const token0 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? tokenA : tokenB
            const token1 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? tokenB : tokenA
            const amount0 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountA : amountB
            const amount1 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountB : amountA
            const { request } = await simulateContract(config, {
                ...positionManagerContract,
                functionName: 'mint',
                args: [{
                    token0: token0.value as '0xstring',
                    token1: token1.value as '0xstring',
                    fee: feeSelect,
                    tickLower: Number(lowerTick),
                    tickUpper: Number(upperTick),
                    amount0Desired: parseEther(amount0),
                    amount1Desired: parseEther(amount1),
                    amount0Min: BigInt(0),
                    amount1Min: BigInt(0),
                    recipient: address as '0xstring',
                    deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
                }]
            })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    React.useEffect(() => {
        const fetchStateMode0 = async () => {
            tokenA.value.toUpperCase() === tokenB.value.toUpperCase() && setTokenB({name: 'Choose Token', value: '' as '0xstring', logo: '/../favicon.png'})

            const stateA = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenA.value, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [address as '0xstring'] }
                ]
            })
            const stateB = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenB.value, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [address as '0xstring'] }
                ]
            })
            stateA[0].result !== undefined && tokenA.name === "Choose Token" && setTokenA({
                name: stateA[0].result,
                value: tokenA.value,
                logo: tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ? 
                    tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].logo : 
                    "/../favicon.png"
            })
            stateB[0].result !== undefined && tokenB.name === "Choose Token" && setTokenB({
                name: stateB[0].result, 
                value: tokenB.value, 
                logo: tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ? 
                    tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].logo : 
                    "/../favicon.png"
            })
            stateA[1].result !== undefined && setTokenABalance(formatEther(stateA[1].result))
            stateB[1].result !== undefined && setTokenBBalance(formatEther(stateB[1].result))

            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                try {
                    const qoutePrice = await simulateContract(config, {
                        ...qouterV2Contract,
                        functionName: 'quoteExactOutputSingle',
                        args: [{
                            tokenIn: tokenA.value as '0xstring',
                            tokenOut: tokenB.value as '0xstring',
                            amount: parseEther('0.01'),
                            fee: feeSelect,
                            sqrtPriceLimitX96: BigInt(0),
                        }]
                    })
                    setExchangeRate((Number(formatEther(qoutePrice.result[0])) * 100).toString())
                } catch {
                    setExchangeRate("0")
                }
            }
        }

        const fetchStateMode1 = async () => {
            tokenA.value.toUpperCase() === tokenB.value.toUpperCase() && setTokenB({name: 'Choose Token', value: '' as '0xstring', logo: '/../favicon.png'})

            const stateA = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenA.value, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [address as '0xstring'] }
                ]
            })
            const stateB = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenB.value, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [address as '0xstring'] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, feeSelect] },
                ]
            })
            stateA[0].result !== undefined && tokenA.name === "Choose Token" && setTokenA({
                name: stateA[0].result,
                value: tokenA.value, 
                logo: tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ? 
                    tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].logo : 
                    "/../favicon.png"
            })
            stateB[0].result !== undefined && tokenB.name === "Choose Token" && setTokenB({
                name: stateB[0].result, 
                value: tokenB.value, 
                logo: tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ? 
                    tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].logo : 
                    "/../favicon.png"
            })
            stateA[1].result !== undefined && setTokenABalance(formatEther(stateA[1].result))
            stateB[1].result !== undefined && setTokenBBalance(formatEther(stateB[1].result))
            stateB[2].result !== undefined && setPairDetect(stateB[2].result)
            
            if (stateB[2].result !== undefined && stateB[2].result !== '0x0000000000000000000000000000000000000000') {
                const poolState = await readContracts(config, {
                    contracts: [
                        { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'token0' },
                        { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'slot0' },
                        { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'tickSpacing' }
                    ]
                })
                const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
                const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                const _currPrice = token0.toUpperCase() === tokenA.value.toUpperCase() ? 
                    (Number(sqrtPriceX96) / (2 ** 96)) ** 2 : 
                    (1 / ((Number(sqrtPriceX96) / (2 ** 96)) ** 2));
                poolState[1].result !== undefined && setCurrPrice(_currPrice.toString())
                poolState[2].result !== undefined && setCurrTickSpacing(poolState[2].result.toString())
                
                let _lowerPrice = 0
                let _upperPrice = Infinity
                let alignedLowerTick = 0
                let alignedUpperTick = 0
                if (rangePercentage !== 1) {
                    _lowerPrice = ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * (1 - rangePercentage)
                    _upperPrice = ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * (1 + rangePercentage)
                    const _lowerTick = Math.floor(Math.log(_lowerPrice) / Math.log(1.0001))
                    const _upperTick = Math.ceil(Math.log(_upperPrice) / Math.log(1.0001))
                    alignedLowerTick = poolState[2].result !== undefined ? Math.floor(_lowerTick / poolState[2].result) * poolState[2].result : 0
                    alignedUpperTick = poolState[2].result !== undefined ? Math.ceil(_upperTick / poolState[2].result) * poolState[2].result : 0
                } else {
                    alignedLowerTick = poolState[2].result !== undefined ? Math.ceil(TickMath.MIN_TICK / poolState[2].result) * poolState[2].result : 0
                    alignedUpperTick = poolState[2].result !== undefined ? Math.floor(TickMath.MAX_TICK / poolState[2].result) * poolState[2].result : 0
                }
                const _lowerPriceShow = token0.toUpperCase() === tokenA.value.toUpperCase() ? 
                    Math.pow(1.0001, alignedLowerTick) : 
                    1 / Math.pow(1.0001, alignedUpperTick);
                const _upperPriceShow = token0.toUpperCase() === tokenA.value.toUpperCase() ? 
                    Math.pow(1.0001, alignedUpperTick) : 
                    1 / Math.pow(1.0001, alignedLowerTick);
                setLowerTick(alignedLowerTick.toString())
                setUpperTick(alignedUpperTick.toString())
                rangePercentage !== 1 ? setLowerPrice(_lowerPriceShow.toString()) : setLowerPrice(_lowerPrice.toString())
                rangePercentage !== 1 ? setUpperPrice(_upperPriceShow.toString()) : setUpperPrice(_upperPrice.toString())
                rangePercentage !== 1 ? setLowerPercentage((((_lowerPriceShow / _currPrice) - 1) * 100).toString()) : setLowerPercentage('-100')
                rangePercentage !== 1 ? setUpperPercentage((((_upperPriceShow / _currPrice) - 1) * 100).toString()) : setUpperPercentage('+Infinity')
            } else {
                setCurrPrice("")
            }
        }

        const fetchStateMode2 = async () => {
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
                const _lowerTick = Number(pos[5])
                const _upperTick = Number(pos[6])
                const _lowerPrice = Math.pow(1.0001, _lowerTick)
                const _upperPrice = Math.pow(1.0001, _upperTick)
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
                let minPrice
                let maxPrice
                let currPrice
                let fee0
                let fee1
                if (_token0name === 'WJBC') {
                    token0addr = pos[3]
                    token1addr = pos[2]
                    token0name = _token1name
                    token1name = _token0name
                    amount0 = _amount1 / 1e18
                    amount1 = _amount0 / 1e18
                    minPrice = 1 / _lowerPrice
                    maxPrice = 1 / _upperPrice
                    currPrice = 1 / _currPrice
                    fee0 = _fee1
                    fee1 = _fee0
                } else if (_token0name === 'CMJ') {
                    token0addr = pos[3]
                    token1addr = pos[2]
                    token0name = _token1name
                    token1name = _token0name
                    amount0 = _amount1 / 1e18
                    amount1 = _amount0 / 1e18
                    minPrice = 1 / _lowerPrice
                    maxPrice = 1 / _upperPrice
                    currPrice = 1 / _currPrice
                    fee0 = _fee1
                    fee1 = _fee0
                } else {
                    token0addr = pos[2]
                    token1addr = pos[3]
                    token0name = _token0name
                    token1name = _token1name
                    amount0 = _amount0 / 1e18
                    amount1 = _amount1 / 1e18
                    minPrice = _lowerPrice
                    maxPrice = _upperPrice
                    currPrice = _currPrice
                    fee0 = _fee0
                    fee1 = _fee1
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
                    MinPrice: minPrice,
                    MaxPrice: maxPrice,
                    CurrPrice: currPrice,
                    LowerTick: _lowerTick,
                    UpperTick: _upperTick,
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
        setLowerTick("") 
        setUpperTick("")
        setLowerPrice("") 
        setUpperPrice("")
        address !== undefined && mode === 0 && fetchStateMode0()
        address !== undefined && mode === 1 && rangePercentage !== 999 && fetchStateMode1()
        address !== undefined &&  mode === 2 && fetchStateMode2()
    }, [config, address, mode, tokenA, tokenB, feeSelect, rangePercentage, txupdate])
    const clearState = () => {
        setTokenA(tokens[0])
        setTokenB({name: 'Choose Token', value: '' as '0xstring', logo: '/../favicon.png'})
        setFeeSelect(10000)
    }
    console.log({lowerTick, upperTick}) // for fetch monitoring

    return (
        <div className="h-[80vh] mt-[40px] w-full flex flex-col items-center justify-start text-xs">
            {isAddPositionModal &&
                <div style={{zIndex: "998"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel w-2/3 xl:w-1/3 h-3/4 xl:h-1/2 bg-neutral-900 p-10 gap-5 flex flex-col items-center justify-center text-sm text-left" style={{boxShadow: "6px 6px 0 #00000040"}}>
                            <span className='text-2xl'>Position #{positionSelected !== undefined ? positionSelected.Id : '...'} - Add Liquidity</span>
                            <div className="w-full gap-1 flex flex-row items-center">
                                <input className="p-4 bg-neutral-800 rounded-lg w-4/6 focus:outline-none" placeholder="0" value={amountA} onChange={e => {setAmountA(e.target.value); setAlignedAmountB(e.target.value)}} />
                                <span className="w-2/6 font-semibold text-right text-gray-400">{Number(tokenABalance).toFixed(4)} {positionSelected !== undefined ? positionSelected.Token0 : '...'}</span>
                            </div>
                            <div className="w-full gap-1 flex flex-row items-center">
                                <input className="p-4 bg-neutral-800 rounded-lg w-4/6 focus:outline-none" placeholder="0" value={amountB} onChange={e => {setAmountB(e.target.value); setAlignedAmountA(e.target.value)}} />
                                <span className="w-2/6 font-semibold text-right text-gray-400">{Number(tokenBBalance).toFixed(4)} {positionSelected !== undefined ? positionSelected.Token1 : '...'}</span>
                            </div>
                            <button className="mt-2 p-4 bg-blue-500 rounded-full w-full bg-blue-500 text-lg font-bold" onClick={() => positionSelected !== undefined && increaseLiquidity(BigInt(positionSelected.Id))}>Increase Liquidity</button>
                            <button className="p-4 bg-blue-500 rounded-full w-full bg-slate-700 text-lg font-bold" onClick={() => {clearState(); setIsAddPositionModal(false);}}>Close</button>
                        </div>
                    </div>
                </div>
            }
            {isRemPositionModal &&
                <div style={{zIndex: "998"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel w-2/3 xl:w-1/3 h-3/4 xl:h-1/2 bg-neutral-900 p-10 gap-5 flex flex-col items-center justify-center text-lg text-left" style={{boxShadow: "6px 6px 0 #00000040"}}>
                            <span className='text-2xl'>Position #{positionSelected !== undefined ? positionSelected.Id : '...'} - Remove Liquidity</span>
                            <div className="w-full gap-1 flex flex-row items-center">
                                <input className="p-4 bg-neutral-800 rounded-lg w-full focus:outline-none" type="text" placeholder="0" value={amountRemove} onChange={e => {setAmountRemove(e.target.value);}} />
                                <span className="w-2/6 font-semibold text-right text-gray-400">%</span>
                            </div>
                            <div className="w-full h-[100px] gap-2 flex flex-row">
                                <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '25' ? "bg-neutral-800" : "")} onClick={() => setAmountRemove('25')}>25%</button>
                                <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '50' ? "bg-neutral-800" : "")} onClick={() => setAmountRemove('50')}>50%</button>
                                <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '75' ? "bg-neutral-800" : "")} onClick={() => setAmountRemove('75')}>75%</button>
                                <button className={"w-1/4 h-full p-3 rounded-lg border-2 border-gray-800 " + (amountRemove === '100' ? "bg-neutral-800" : "")} onClick={() => setAmountRemove('100')}>100%</button>
                            </div>
                            <button 
                                className="mt-2 p-4 bg-blue-500 rounded-full w-full bg-blue-500 text-lg font-bold" 
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
                                Decrease Liquidity
                            </button>
                            <button className="p-4 bg-blue-500 rounded-full w-full bg-skate-700 text-lg font-bold" onClick={() => {setAmountRemove(''); setIsRemPositionModal(false);}}>Close</button>
                        </div>
                    </div>
                </div>
            }
            
            <div className="p-6 w-3/4 xl:w-1/3 gap-2 flex flex-col items-start justify-center">
                <div className="w-full gap-2 flex flex-row items-start justify-start">
                    <button className={"p-2 w-1/5 rounded-full " + (mode === 0 ? "bg-slate-700 font-bold" : "text-gray-500")} onClick={() => setMode(0)}>Instant Swap</button>
                    <button className={"p-2 w-1/4 rounded-full " + (mode === 1 ? "bg-slate-700 font-bold" : "text-gray-500")} onClick={() => setMode(1)}>Add Liquidity</button>
                    <button className={"p-2 w-1/5 rounded-full " + (mode === 2 ? "bg-slate-700 font-bold" : "text-gray-500")} onClick={() => setMode(2)}>My Position</button>
                </div>
                {mode === 0 &&
                    <>
                        <div className="p-6 w-full h-[180px] rounded-xl border-2 border-solid border-gray-500 gap-2 flex flex-col">
                            <span className="w-full text-left">From</span>
                            <div className="w-full gap-1 flex flex-row">
                                <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" placeholder="Token A" value={tokenA.value} onChange={e => setTokenA({name: 'Choose Token', value: e.target.value as '0xstring', logo: '/../favicon.png'})} />
                                <div className="w-2/6">
                                    <Listbox value={tokenA} onChange={setTokenA}>
                                        <ListboxButton className="relative w-full h-full p-3 rounded-lg bg-white/5 text-left font-semibold gap-2 flex flex-row items-center focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                            <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" />
                                            <span>{tokenA.name}</span>
                                            <ChevronDownIcon className="pointer-events-none absolute top-4 right-4 size-4 fill-white/60" aria-hidden="true"/>
                                        </ListboxButton>
                                        <ListboxOptions anchor="bottom" transition className="w-[var(--button-width)] rounded-lg bg-neutral-800 p-1 text-gray-500 text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0">
                                            {tokens.map((token) => (
                                                <ListboxOption key={token.name} value={token} className="cursor-pointer py-2 pr-9 pl-3 text-gray-500 data-[focus]:bg-white data-[focus]:font-semibold">
                                                    <div className="flex items-center">
                                                        <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                        <span className="ml-3 truncate">{token.name}</span>
                                                    </div>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Listbox>
                                </div>
                            </div>
                            <div className="w-full gap-1 flex flex-row items-center">
                                <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" placeholder="0" value={amountA} onChange={e => {setAmountA(e.target.value); getQoute(e.target.value);}} />
                                {tokenA.name !== 'Choose Token' && 
                                    <button className="w-2/6 font-semibold text-right text-gray-400" onClick={() => {setAmountA(tokenABalance); getQoute(tokenABalance);}}>{Number(tokenABalance).toFixed(4)} {tokenA.name}</button>
                                }
                            </div>
                        </div>
                        <div className="p-6 w-full h-[180px] bg-neutral-900 gap-2 flex flex-col">
                            <span className="w-full text-left">To</span>
                            <div className="w-full gap-1 flex flex-row">
                                <input className="p-4 bg-neutral-950 rounded-lg w-4/6 focus:outline-none" placeholder="Token B" value={tokenB.value} onChange={e => setTokenB({name: 'Choose Token', value: e.target.value as '0xstring', logo: '/../favicon.png'})} />
                                <div className="w-2/6">
                                    <Listbox value={tokenB} onChange={setTokenB}>
                                        <ListboxButton className="relative w-full h-full p-3 rounded-lg bg-white/5 text-left font-semibold gap-2 flex flex-row items-center focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                            <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" />
                                            <span>{tokenB.name}</span>
                                            <ChevronDownIcon className="pointer-events-none absolute top-4 right-4 size-4 fill-white/60" aria-hidden="true"/>
                                        </ListboxButton>
                                        <ListboxOptions anchor="bottom" transition className="w-[var(--button-width)] rounded-lg bg-neutral-800 p-1 text-gray-500 text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0">
                                            {tokens.map((token) => (
                                                <ListboxOption key={token.name} value={token} className="cursor-pointer py-2 pr-9 pl-3 text-gray-500 data-[focus]:bg-white data-[focus]:font-semibold">
                                                    <div className="flex items-center">
                                                        <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                        <span className="ml-3 truncate">{token.name}</span>
                                                    </div>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Listbox>
                                </div>
                            </div>
                            <div className="w-full gap-1 flex flex-row items-center">
                                <input className="p-4 bg-neutral-950 rounded-lg w-4/6 focus:outline-none" placeholder="0" value={amountB} readOnly />
                                {tokenB.value !== '' as '0xstring' && <span className="w-2/6 font-semibold text-right text-gray-400">{Number(tokenBBalance).toFixed(4)} {tokenB.name}</span>}
                            </div>
                        </div>
                        {tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' &&
                            <>
                                {exchangeRate !== '0' ? <span className="font-bold my-4 text-gray-500">1 {tokenB.name} = {Number(exchangeRate).toFixed(4)} {tokenA.name}</span> : <span className="font-bold my-4 text-red-500">Insufficient Liquidity!</span>}
                            </>
                        }
                        <span className="w-full text-left">Swap fee tier</span>
                        <div className="w-full mb-2 h-[100px] gap-2 flex flex-row text-gray-400">
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 border-2 border-gray-800 " + (feeSelect === 100 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(100)}>0.01%</button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 border-2 border-gray-800 " + (feeSelect === 500 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(500)}>0.05%</button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 border-2 border-gray-800 " + (feeSelect === 3000 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(3000)}>0.3%</button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 border-2 border-gray-800 " + (feeSelect === 10000 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(10000)}>1%</button>
                        </div>
                        {tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && Number(amountA) !== 0 && Number(amountA) <= Number(tokenABalance) && Number(amountB) !== 0 ?
                            <button className="p-2 w-full h-[50px] rounded-full bg-blue-500 text-lg font-bold" onClick={swap}>Swap</button> :
                            <button className="p-2 w-full h-[50px] rounded-full bg-gray-500 text-lg font-bold inactive">Swap</button>
                        }
                    </>
                }
                {mode === 1 &&
                    <>
                        <div className="w-full gap-1 flex flex-row">
                            <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" type="text" placeholder="Token A" value={tokenA.value} onChange={e => setTokenA({name: 'Choose Token', value: e.target.value as '0xstring', logo: '/../favicon.png'})} />
                            <div className="w-2/6">
                                <Listbox value={tokenA} onChange={setTokenA}>
                                    <ListboxButton className="relative w-full h-full p-3 rounded-lg bg-white/5 text-left font-semibold gap-2 flex flex-row items-center focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                        <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" />
                                        <span>{tokenA.name}</span>
                                        <ChevronDownIcon className="pointer-events-none absolute top-4 right-4 size-4 fill-white/60" aria-hidden="true"/>
                                    </ListboxButton>
                                    <ListboxOptions anchor="bottom" transition className="w-[var(--button-width)] rounded-lg bg-neutral-800 p-1 text-gray-500 text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0">
                                        {tokens.map((token) => (
                                            <ListboxOption key={token.name} value={token} className="cursor-pointer py-2 pr-9 pl-3 text-gray-500 data-[focus]:bg-white data-[focus]:font-semibold">
                                                <div className="flex items-center">
                                                    <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                    <span className="ml-3 truncate">{token.name}</span>
                                                </div>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            </div>
                        </div>
                        <div className="w-full gap-1 flex flex-row items-center">
                            <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" type="text" placeholder="0" value={amountA} onChange={(e) => {setAmountA(e.target.value); setAlignedAmountB(e.target.value)}} />
                            {tokenA.value !== '' as '0xstring' && <button className="w-2/6 font-semibold text-right text-gray-400" onClick={() => setAmountA(tokenABalance)}>{Number(tokenABalance).toFixed(4)} {tokenA.name}</button>}
                        </div>
                        <div className="w-full gap-1 flex flex-row">
                            <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" type="text" placeholder="Token B" value={tokenB.value} onChange={e => setTokenB({name: 'Choose Token', value: e.target.value as '0xstring', logo: '/../favicon.png'})} />
                            <div className="w-2/6">
                                <Listbox value={tokenB} onChange={setTokenB}>
                                    <ListboxButton className="relative w-full h-full p-3 rounded-lg bg-white/5 text-left font-semibold gap-2 flex flex-row items-center focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                        <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" />
                                        <span>{tokenB.name}</span>
                                        <ChevronDownIcon className="pointer-events-none absolute top-4 right-4 size-4 fill-white/60" aria-hidden="true"/>
                                    </ListboxButton>
                                    <ListboxOptions anchor="bottom" transition className="w-[var(--button-width)] rounded-lg bg-neutral-800 p-1 text-gray-500 text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0">
                                        {tokens.map((token) => (
                                            <ListboxOption key={token.name} value={token} className="cursor-pointer py-2 pr-9 pl-3 text-gray-500 data-[focus]:bg-white data-[focus]:font-semibold">
                                                <div className="flex items-center">
                                                    <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                    <span className="ml-3 truncate">{token.name}</span>
                                                </div>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            </div>
                        </div>
                        <div className="w-full gap-1 flex flex-row items-center">
                            <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" type="text" placeholder="0" value={amountB} onChange={(e) => {setAmountB(e.target.value); setAlignedAmountA(e.target.value)}} />
                            {tokenB.value !== '' as '0xstring' && <button className="w-2/6 font-semibold text-right text-gray-400" onClick={() => setAmountB(tokenBBalance)}>{Number(tokenBBalance).toFixed(4)} {tokenB.name}</button>}
                        </div>
                        <div className="w-full h-[100px] gap-2 flex flex-row">
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (feeSelect === 100 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(100)}>
                                <span>0.01%</span>
                                <span className="text-gray-500">Best for very stable pairs</span>
                            </button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (feeSelect === 500 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(500)}>
                                <span>0.05%</span>
                                <span className="text-gray-500">Best for stable pairs</span>
                            </button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (feeSelect === 3000 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(3000)}>
                                <span>0.3%</span>
                                <span className="text-gray-500">Best for most pairs</span>
                            </button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (feeSelect === 10000 ? "bg-neutral-800" : "")} onClick={() => setFeeSelect(10000)}>
                                <span>1%</span>
                                <span className="text-gray-500">Best for exotic pairs</span>
                            </button>
                        </div>
                        <span className="m-2 font-semibold">Current price: {Number(currPrice).toFixed(4)} {tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenB.name + '/' + tokenA.name}</span>
                        <div className="w-full h-[100px] gap-2 flex flex-row">
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (rangePercentage === 1 ? "bg-neutral-800" : "")} onClick={() => setRangePercentage(1)}>
                                <span>Full Range</span>
                                <span className="text-gray-500">[-100%, Infinity]</span>
                            </button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (rangePercentage === 0.15 ? "bg-neutral-800" : "")} onClick={() => setRangePercentage(0.15)}>
                                <span>Wide</span>
                                <span className="text-gray-500">[-15%, +15%]</span>
                            </button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (rangePercentage === 0.075 ? "bg-neutral-800" : "")} onClick={() => setRangePercentage(0.075)}>
                                <span>Narrow</span>
                                <span className="text-gray-500">[-7.5%, +7.5%]</span>
                            </button>
                            <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border-2 border-gray-800 " + (rangePercentage === 0.02 ? "bg-neutral-800" : "")} onClick={() => setRangePercentage(0.02)}>
                                <span>Degen</span>
                                <span className="text-gray-500">[-2%, +2%]</span>
                            </button>
                        </div>
                        <div className="w-full gap-1 flex flex-row items-center">
                            <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" type="text" placeholder="Lower Price" value={lowerPrice} onChange={e => {setLowerPrice(e.target.value); setAlignedLowerTick(e.target.value); setRangePercentage(999);}} />
                            <span className="w-2/6 text-right text-gray-500">{tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenB.name + '/' + tokenA.name + ' (' + Number(lowerPercentage).toFixed(2) + '%)'}</span>
                        </div>
                        <div className="w-full gap-1 flex flex-row items-center">
                            <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" type="text" placeholder="Upper Price" value={upperPrice} onChange={e => {setUpperPrice(e.target.value); setAlignedUpperTick(e.target.value); setRangePercentage(999);}} />
                            <span className="w-2/6 text-right text-gray-500">{tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenB.name + '/' + tokenA.name + ' (+' + Number(upperPercentage).toFixed(2) + '%)'}</span>
                        </div>
                        {tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && Number(amountA) !== 0 && Number(amountA) <= Number(tokenABalance) && Number(amountB) !== 0 && Number(amountB) <= Number(tokenBBalance) ?
                            <button className="mt-2 p-4 rounded-full w-full bg-blue-500 text-lg font-bold" onClick={placeLiquidity}>Add Liquidity</button> :
                            <button className="mt-2 p-4 rounded-full w-full bg-gray-600 text-lg font-bold inactive">Add Liquidity</button>
                        }
                    </>
                }
                {mode === 2 && position[0] !== undefined &&
                    <div className="w-full h-[80vh] gap-5 flex flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-neutral-950 [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-700">
                        {position.map(obj => 
                            <div key={Number(obj.Id)} className="w-full h-[400px] bg-neutral-900 gap-2 flex flex-col items-start">
                                <div className="w-full py-4 h-[200px] bg-neutral-950 flex items-center justify-center relative">
                                    <img alt="" src={obj.Image} height={100} width={100}/>
                                    <span className="absolute bottom-5 left-5">{obj.CurrPrice > obj.MinPrice && obj.CurrPrice < obj.MaxPrice ? 'In range' : 'Out of range'}</span>
                                    <span className="absolute bottom-5 right-5">{obj.FeeTier / 10000}%</span>
                                </div>
                                <div className="w-full h-[20px] py-2 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500">Position #{obj.Id}</span>
                                    <span>{obj.Amount0.toFixed(4)} {obj.Token0} / {obj.Amount1.toFixed(4)} {obj.Token1}</span>
                                </div>
                                <div className="w-full h-[20px] py-2 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500">Fee</span>
                                    <span>{obj.Fee0.toFixed(4)} {obj.Token0} / {obj.Fee1.toFixed(4)} {obj.Token1}</span>
                                </div>
                                <div className="w-full h-[20px] py-2 px-6 flex flex-row justify-between">
                                    <span className="text-gray-500">Current : Min : Max</span>
                                    <span>{obj.CurrPrice.toFixed(4)} : {obj.MinPrice.toFixed(4)} : {obj.MaxPrice.toFixed(4)} {obj.Token0}/{obj.Token1}</span>
                                </div>
                                <div className="w-full h-[50px] py-2 px-6 gap-2 flex flex-row items-start justify-start font-semibold">
                                    <button className="p-1 w-1/5 rounded-full bg-gray-500" onClick={() => {setPositionSelected(obj); setTokenA({name: "", logo: "", value: obj.Token0Addr as '0xstring'}); setTokenB({name: "", logo: "", value: obj.Token1Addr as '0xstring'}); getBalanceOfAB(obj.Token0Addr as '0xstring', obj.Token1Addr as '0xstring'); setPairDetect(obj.Pair); setFeeSelect(obj.FeeTier); setLowerTick(obj.LowerTick.toString()); setUpperTick(obj.UpperTick.toString()); setIsAddPositionModal(true);}}>Add Liquidity</button>
                                    <button className="p-1 w-1/4 rounded-full bg-gray-500" onClick={() => {setPositionSelected(obj); setIsRemPositionModal(true);}}>Remove Liquidity</button>
                                    <button className="p-1 w-1/5 rounded-full bg-gray-500" onClick={() => collectFee(BigInt(obj.Id))}>Collect fee</button>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}
