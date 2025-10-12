import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther, formatUnits, parseUnits } from 'viem'
import { ArrowDown, ChevronDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebouncedCallback } from 'use-debounce'
import { tokens, ROUTER02, v3FactoryContract, qouterV2Contract, router02Contract, erc20ABI, v3PoolABI, wrappedNative } from '@/app/lib/10143'
import { config } from '@/app/config'
import { useSwapTokenSelection } from '@/app/components/swap/useSwapTokenSelection'
import { useSwapQuote } from '@/app/components/swap/useSwapQuote'
import { encodePath } from '@/app/components/swap/path'
import { ensureTokenAllowance, executeRouterSwap, wrapNativeToken, unwrapWrappedToken } from '@/app/components/swap/swapActions'

export default function Swap10143({
    setIsLoading, setErrMsg,
}: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>,
}) {
    const { address } = useAccount()
    const [txupdate, setTxupdate] = React.useState("")
    const [exchangeRate, setExchangeRate] = React.useState("")
    const [fixedExchangeRate, setFixedExchangeRate] = React.useState("")
    const [altRoute, setAltRoute] = React.useState<{ a: '0xstring', b: '0xstring', c: '0xstring' }>()
    const [CMswapTVL, setCMswapTVL] = React.useState<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; }>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "" });
    const [bestPool, setBestPool] = React.useState("")
    const [poolSelect, setPoolSelect] = React.useState("")
    const [wrappedRoute, setWrappedRoute] = React.useState(false)
    const [newPrice, setNewPrice] = React.useState("")
    const {
        tokenA,
        tokenB,
        setTokenA,
        setTokenB,
        hasInitializedFromParams,
        updateURLWithTokens,
        switchTokens,
    } = useSwapTokenSelection(tokens, {
        defaultTokenAIndex: 0,
        defaultTokenBIndex: 2,
        referralAddress: address,
    })
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [swapDirection, setSwapDirection] = React.useState(true) // false = A->B, true = B->A
    const [CMswapToken0, setCMswapToken0] = React.useState("");
    React.useEffect(() => {
        console.log("hasInitializedFromParams : ", hasInitializedFromParams)
    }, [hasInitializedFromParams])

    const { quoteExactInputSingle, quoteExactInput } = useSwapQuote({
        config,
        contract: qouterV2Contract,
        tokens,
    })

    const getQoute = useDebouncedCallback(async (_amount: string) => {
        let CMswapRate = 0
        const amountIn = Number(_amount)

        if (wrappedRoute) {
            setAmountB(amountIn.toString())
            return { CMswapRate }
        }

        try {
            if (Number(_amount) !== 0) {
                if (altRoute === undefined) {
                    const quoteOutput = await quoteExactInputSingle({
                        tokenIn: tokenA,
                        tokenOut: tokenB,
                        amount: _amount,
                        fee: feeSelect,
                        parseAmount: (value: string) => parseUnits(value, tokenA.decimal),
                        suppressErrors: true,
                    })

                    if (quoteOutput) {
                        if (poolSelect === "CMswap") {
                            setAmountB(formatUnits(quoteOutput.amountOut, tokenB.decimal))
                        }
                        CMswapRate = Number(formatEther(quoteOutput.amountOut))
                        if (quoteOutput.sqrtPriceX96 !== undefined) {
                            const newPrice = 1 / ((Number(quoteOutput.sqrtPriceX96) / (2 ** 96)) ** 2)
                            setNewPrice(newPrice.toString())
                        }
                    }
                } else {
                    const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                    const quoteOutput = await quoteExactInput({
                        path: route as `0x${string}`,
                        tokenIn: tokenA,
                        amount: _amount,
                        parseAmount: (value: string) => parseUnits(value, tokenA.decimal),
                        suppressErrors: true,
                    })

                    if (quoteOutput) {
                        if (poolSelect === "CMswap") {
                            setAmountB(formatUnits(quoteOutput.amountOut, tokenB.decimal))
                        }
                        CMswapRate = Number(formatEther(quoteOutput.amountOut))
                        if (quoteOutput.sqrtPriceX96 !== undefined) {
                            const newPrice = 1 / ((Number(quoteOutput.sqrtPriceX96) / (2 ** 96)) ** 2)
                            setNewPrice(newPrice.toString())
                        }
                    }
                }
            } else {
                setAmountB("")
            }
        } catch { }

        return { CMswapRate }
    }, 700)

    const switchToken = () => {
        setExchangeRate("")
        switchTokens()
    }

    const handleSwap = async () => {
        if (wrappedRoute) {
            wrap()
        } else if (poolSelect === "CMswap") {
            CMswap()
        }
    }

    const wrap = async () => {
        setIsLoading(true)
        try {
            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const hash = await wrapNativeToken({
                    config,
                    wrappedTokenAddress: tokens[1].value,
                    amount: parseEther(amountA),
                })
                setTxupdate(hash)
            } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const hash = await unwrapWrappedToken({
                    config,
                    contract: wrappedNative,
                    amount: parseEther(amountA),
                })
                setTxupdate(hash)
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const CMswap = async () => {
        setIsLoading(true)
        try {
            let tokenAvalue
            let tokenBvalue
            if (tokenA.value === tokens[0].value) {
                tokenAvalue = tokens[1].value
            } else {
                tokenAvalue = tokenA.value
            }
            if (tokenB.value === tokens[0].value) {
                tokenBvalue = tokens[1].value
            } else {
                tokenBvalue = tokenB.value
            }
            if (tokenA.value.toUpperCase() !== tokens[0].value.toUpperCase()) {
                await ensureTokenAllowance({
                    config,
                    token: { ...erc20ABI, address: tokenA.value },
                    owner: address as `0x${string}`,
                    spender: ROUTER02,
                    requiredAmount: parseUnits(amountA, tokenA.decimal),
                })
            }
            const parsedAmountIn = parseUnits(amountA, tokenA.decimal)
            const amountOutMinimum = parseUnits(amountB, tokenB.decimal) * BigInt(95) / BigInt(100)
            const path = altRoute ? encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect]) : undefined

            const { hash: h, amountOut: r } = await executeRouterSwap({
                config,
                router: router02Contract,
                tokenIn: tokenAvalue as `0x${string}`,
                tokenOut: tokenBvalue as `0x${string}`,
                recipient: address as `0x${string}`,
                amountIn: parsedAmountIn,
                amountOutMinimum,
                fee: feeSelect,
                path,
                value: tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ? parseEther(amountA) : BigInt(0),
            })

            setTxupdate(h)
            if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    ...wrappedNative,
                    functionName: 'withdraw',
                    args: [r as bigint]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    React.useEffect(() => {
        const fetch0 = async () => {
            (tokenA.value.toUpperCase() === tokenB.value.toUpperCase()) && setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })

            let tokenAvalue
            let tokenBvalue
            if (tokenA.value === tokens[0].value) {
                tokenAvalue = tokens[1].value
            } else {
                tokenAvalue = tokenA.value
            }
            if (tokenB.value === tokens[0].value) {
                tokenBvalue = tokens[1].value
            } else {
                tokenBvalue = tokenB.value
            }
            const nativeBal = address !== undefined ? await getBalance(config, { address: address as '0xstring' }) : { value: BigInt(0) }
            const stateA = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenAvalue, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [address as '0xstring'] }
                ]
            })
            const stateB = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenBvalue, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 10000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 3000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 500] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 100] },
                ]
            })
            stateA[0].result !== undefined && tokenA.name === "Choose Token" && setTokenA({
                name: stateA[0].result,
                value: tokenA.value,
                logo: tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ?
                    tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].logo :
                    "../favicon.ico",
                decimal: tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ?
                    tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].decimal :
                    18
            })
            stateB[0].result !== undefined && tokenB.name === "Choose Token" && setTokenB({
                name: stateB[0].result,
                value: tokenB.value,
                logo: tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ?
                    tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].logo :
                    "../favicon.ico",
                decimal: tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ?
                    tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].decimal :
                    18
            })
            tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ?
                setTokenABalance(formatEther(nativeBal.value)) :
                stateA[1].result !== undefined && setTokenABalance(formatUnits(stateA[1].result, tokenA.decimal))
            tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() ?
                setTokenBBalance(formatEther(nativeBal.value)) :
                stateB[1].result !== undefined && setTokenBBalance(formatUnits(stateB[1].result, tokenB.decimal))
            const pair10000 = stateB[2].result !== undefined ? stateB[2].result as '0xstring' : '' as '0xstring'
            const pair3000 = stateB[3].result !== undefined ? stateB[3].result as '0xstring' : '' as '0xstring'
            const pair500 = stateB[4].result !== undefined ? stateB[4].result as '0xstring' : '' as '0xstring'
            const pair100 = stateB[5].result !== undefined ? stateB[5].result as '0xstring' : '' as '0xstring'

            const updateCMswapTvlKey = (key: keyof typeof CMswapTVL, value: number) => { setCMswapTVL(prevTvl => ({ ...prevTvl, [key]: value >= 1e-9 ? value.toString() : '0', })); };
            const updateExchangeRateCMswapTVL = (feeAmount: number, exchangeRate: number) => {
                setCMswapTVL(prevTvl => ({ ...prevTvl, exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prevTvl.exchangeRate }));
            };

            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                if ((tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[1].value.toUpperCase()) || (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[1].value.toUpperCase())) {
                    setExchangeRate("1")
                    setWrappedRoute(true)
                } else {
                    setWrappedRoute(false)
                    try {
                        setAltRoute(undefined)
                        const poolState = await readContracts(config, {
                            contracts: [
                                { ...v3PoolABI, address: pair10000, functionName: 'token0' },
                                { ...v3PoolABI, address: pair10000, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair10000] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair10000] },
                                { ...v3PoolABI, address: pair3000, functionName: 'token0' },
                                { ...v3PoolABI, address: pair3000, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair3000] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair3000] },
                                { ...v3PoolABI, address: pair500, functionName: 'token0' },
                                { ...v3PoolABI, address: pair500, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair500] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair500] },
                                { ...v3PoolABI, address: pair100, functionName: 'token0' },
                                { ...v3PoolABI, address: pair100, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair100] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair100] },
                            ]
                        })
                        const token0_10000 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
                        const decimal0_10000 = token0_10000.toUpperCase() === tokenAvalue.toUpperCase() ? tokenA.decimal : tokenB.decimal
                        const decimal1_10000 = token0_10000.toUpperCase() === tokenAvalue.toUpperCase() ? tokenB.decimal : tokenA.decimal
                        const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                        const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                        const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)
                        const currPrice_10000 = token0_10000.toUpperCase() === tokenBvalue.toUpperCase() ? 
                            ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2) * (10 ** (decimal0_10000 - decimal1_10000)) : 
                            (1 / (((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2) * (10 ** (decimal0_10000 - decimal1_10000))));
                        console.warn(`Token0 \n${token0_10000}\nTokenB \n${tokenBvalue}\n${token0_10000.toUpperCase() !== tokenBvalue.toUpperCase()}\nPrice : ${currPrice_10000}`)
                        const tvl_10000 = currPrice_10000 !== 0 && currPrice_10000 !== Infinity ? (Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000)) + Number(formatEther(tokenBamount_10000)) : 0
                        feeSelect === 10000 && currPrice_10000 !== Infinity && updateExchangeRateCMswapTVL(10000, Number(currPrice_10000.toString()))
                        feeSelect === 10000 && currPrice_10000 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2).toString())
                        feeSelect === 10000 && currPrice_10000 !== Infinity && tvl_10000 < 1e-9 && updateExchangeRateCMswapTVL(10000, 0)
                        updateCMswapTvlKey('tvl10000', tvl_10000)
                        if (feeSelect === 10000) {
                            setCMswapToken0(token0_10000 as '0xstring')
                        }
                        if (feeSelect === 10000 && tvl_10000 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 10000] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 10000] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[i / 2]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            console.log({ altIntermediate, altPair0, altPair1 }) // for quick debugging
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                updateExchangeRateCMswapTVL(10000, Number((altPrice1 / altPrice0).toString()))
                            }
                        }

                        const token0_3000 = poolState[4].result !== undefined ? poolState[4].result : "" as '0xstring'
                        const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                        const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                        const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                        const currPrice_3000 = token0_3000.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2))
                        const tvl_3000 = currPrice_3000 !== 0 && currPrice_3000 !== Infinity ? (Number(formatEther(tokenAamount_3000)) * (1 / currPrice_3000)) + Number(formatEther(tokenBamount_3000)) : 0
                        feeSelect === 3000 && currPrice_3000 !== Infinity && updateExchangeRateCMswapTVL(3000, Number(currPrice_3000.toString()))
                        feeSelect === 3000 && currPrice_3000 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2).toString())
                        feeSelect === 3000 && currPrice_3000 !== Infinity && tvl_3000 < 1e-9 && updateExchangeRateCMswapTVL(3000, 0)
                        updateCMswapTvlKey('tvl3000', tvl_3000);
                        if (feeSelect === 3000) {
                            setCMswapToken0(token0_3000 as '0xstring')
                        }

                        if (feeSelect === 3000 && tvl_3000 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 3000] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 3000] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                feeSelect === 3000 && updateExchangeRateCMswapTVL(3000, Number((altPrice1 / altPrice0).toString()))
                            }
                        }

                        const token0_500 = poolState[8].result !== undefined ? poolState[8].result : "" as '0xstring'
                        const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                        const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                        const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                        const currPrice_500 = token0_500.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_500) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2))
                        const tvl_500 = currPrice_500 !== 0 && currPrice_500 !== Infinity ? (Number(formatEther(tokenAamount_500)) * (1 / currPrice_500)) + Number(formatEther(tokenBamount_500)) : 0
                        feeSelect === 500 && currPrice_500 !== Infinity && updateExchangeRateCMswapTVL(500, Number(currPrice_500.toString()))
                        feeSelect === 500 && currPrice_500 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2).toString())
                        feeSelect === 500 && currPrice_500 !== Infinity && tvl_500 < 1e-9 && updateExchangeRateCMswapTVL(500, 0)
                        updateCMswapTvlKey('tvl500', tvl_500);
                        if (feeSelect === 500) {
                            setCMswapToken0(token0_500 as '0xstring')
                        }

                        if (feeSelect === 500 && tvl_500 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 500] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 500] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                feeSelect === 500 && updateExchangeRateCMswapTVL(500, Number((altPrice1 / altPrice0).toString()))
                            }
                        }

                        const token0_100 = poolState[12].result !== undefined ? poolState[12].result : "" as '0xstring'
                        const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                        const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                        const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                        const currPrice_100 = token0_100.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_100) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_100) / (2 ** 96)) ** 2))
                        const tvl_100 = currPrice_100 !== 0 && currPrice_100 !== Infinity ? (Number(formatEther(tokenAamount_100)) * (1 / currPrice_100)) + Number(formatEther(tokenBamount_100)) : 0
                        feeSelect === 100 && currPrice_100 !== Infinity && updateExchangeRateCMswapTVL(100, Number(currPrice_100.toString()))
                        feeSelect === 100 && currPrice_100 !== Infinity && setFixedExchangeRate(((Number(currPrice_100) / (2 ** 96)) ** 2).toString())
                        feeSelect === 100 && currPrice_100 !== Infinity && tvl_100 < 1e-9 && updateExchangeRateCMswapTVL(100, 0)
                        updateCMswapTvlKey('tvl100', tvl_100);
                        if (feeSelect === 100) {
                            setCMswapToken0(token0_100 as '0xstring')
                        }

                        if (feeSelect === 100 && tvl_100 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 100] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 100] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                feeSelect === 100 && updateExchangeRateCMswapTVL(100, Number((altPrice1 / altPrice0).toString()))
                            }
                        }
                    } catch {
                        updateExchangeRateCMswapTVL(feeSelect, 0)
                    }
                    setExchangeRate("0")
                }
            }
        }

        setAmountA("")
        setAmountB("")
        if (hasInitializedFromParams) {
            fetch0()
        }
    }, [config, address, tokenA, tokenB, feeSelect, txupdate,hasInitializedFromParams])


    React.useEffect(() => {
        const updateRate = async () => {
            if (poolSelect === "CMswap") {
                setExchangeRate(CMswapTVL.exchangeRate);
                console.log('Fallback Quote Price CMswap', CMswapTVL.exchangeRate);
            }
        };

        !wrappedRoute && updateRate();
    }, [amountA, poolSelect, CMswapTVL]);

    React.useEffect(() => {
        const fetchQuoteAndSetPool = async () => {
            if (CMswapTVL) {
                try {
                    const quote = await getQoute(amountA);
                    console.log("Fetched quote:", quote);

                    const CMRate = Number(quote?.CMswapRate) > 0
                        ? Number(quote?.CMswapRate)
                        : Number(CMswapTVL?.exchangeRate || 0);

                    const rates = {
                        CMswap: CMRate,
                    };

                    console.log("Computed rates:", rates);

                    const validRates = Object.entries(rates).filter(([, rate]) => rate > 0);
                    if (validRates.length === 0) {
                        console.log("No valid rates available from any pool.");
                        return;
                    }

                    const sortedEntries = validRates.sort((a, b) => b[1] - a[1]);
                    const [bestPool, bestRate] = sortedEntries[0];

                    console.log("Best pool selected:", bestPool, "with rate:", bestRate);
                    setBestPool(bestPool);

                    if (poolSelect === "") {
                        setPoolSelect(bestPool);
                        console.log("Pool selected automatically:", bestPool);
                    }

                } catch (error) {
                    console.error("Error fetching quote or processing rates:", error);
                }
            }
        };

        fetchQuoteAndSetPool();
    }, [CMswapTVL, amountB, amountA]);

    React.useEffect(() => {
        setPoolSelect("")
        setFeeSelect(10000)
    }, [tokenA, tokenB])

    return (
        <div className='space-y-2'>
            <div className="rounded-lg bg-[#0a0b1e]/80 border border-[#00ff9d]/10 p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">From</span>
                    <input
                        className="py-2 w-[340px] focus:outline-none text-gray-400 text-xs text-right"
                        value={tokenA.value}
                        onChange={e => {
                            if (e.target.value !== '0x') {
                                setTokenA({ name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico', decimal: 18 })
                            } else {
                                setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
                            }
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" autoFocus className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountA} onChange={e => { setAmountA(e.target.value); getQoute(e.target.value); }} />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenA.logo !== '../favicon.ico' ? <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
                                        </span>
                                    </div>
                                    <span className='truncate'>{tokenA.name}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 z-100">
                            <Command>
                                <CommandInput placeholder="Search tokens..." />
                                <CommandList>
                                    <CommandEmpty>No tokens found.</CommandEmpty>
                                    <CommandGroup>
                                        {tokens.map(token => (
                                            <CommandItem
                                                key={token.name}
                                                value={token.name}
                                                onSelect={() => {
                                                    setTokenA(token)
                                                    setOpen(false)
                                                    updateURLWithTokens(token.value, tokenB?.value)
                                                }}
                                                className='cursor-pointer'
                                            >
                                                <div className="flex items-center">
                                                    <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                    <span className="ml-3 truncate">{token.name}</span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span />
                    <div>
                        <span className="text-gray-400 text-xs">{tokenA.name !== 'Choose Token' ? Number(tokenABalance).toFixed(6) + ' ' + tokenA.name : '0.000000'}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-[#00ff9d] text-xs px-2 cursor-pointer" onClick={() => { setAmountA(tokenABalance); getQoute(tokenABalance); }}>MAX</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button variant="outline" size="icon" className="bg-[#0a0b1e] border border-[#00ff9d]/30 rounded-md h-10 w-10 shadow-md cursor-pointer" onClick={switchToken}>
                    <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
                </Button>
            </div>
            <div className="rounded-lg border border-[#00ff9d]/10 p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">To</span>
                    <input
                        className="py-2 w-[340px] focus:outline-none text-gray-400 text-xs text-right"
                        value={tokenB.value}
                        onChange={e => {
                            if (e.target.value !== '0x') {
                                setTokenB({ name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico', decimal: 18 })
                            } else {
                                setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
                            }
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountB} readOnly />
                    <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open2} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenB.logo !== '../favicon.ico' ? <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
                                        </span>
                                    </div>
                                    <span className='truncate'>{tokenB.name}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 z-100">
                            <Command>
                                <CommandInput placeholder="Search tokens..." />
                                <CommandList>
                                    <CommandEmpty>No tokens found.</CommandEmpty>
                                    <CommandGroup>
                                        {tokens.map(token => (
                                            <CommandItem
                                                key={token.name}
                                                value={token.name}
                                                onSelect={() => {
                                                    setTokenB(token)
                                                    setOpen2(false)
                                                    updateURLWithTokens(tokenA?.value, token.value)
                                                }}
                                                className='cursor-pointer'
                                            >
                                                <div className="flex items-center">
                                                    <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                    <span className="ml-3 truncate">{token.name}</span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span />
                    <span className="text-gray-400 text-xs">{tokenB.name !== 'Choose Token' ? Number(tokenBBalance).toFixed(6) + ' ' + tokenB.name : '0.000000'}</span>
                </div>
            </div>
            {!wrappedRoute &&
                <div className="mt-6">
                    <div className="flex justify-between items-center my-2">
                        <span className="text-gray-400 text-xs">Liquidity Available</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-auto">
                        {(() => {
                            const tvlKeys = ['tvl10000', 'tvl3000', 'tvl500', 'tvl100'] as const;
                            const shouldShowTVL = tvlKeys.some(key => Number(CMswapTVL[key]) > 0);
                            const tvlValue = Number(CMswapTVL[`tvl${feeSelect}` as keyof typeof CMswapTVL]);

                            if (!shouldShowTVL) {
                                return ""
                            }

                            return (
                                <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (poolSelect === "CMswap" ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => {setPoolSelect("CMswap"); getQoute(amountA);}}>
                                    <span className="flex items-center gap-1">
                                        CMswap {bestPool === "CMswap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                    </span>
                                    {tokenB.value !== "0x" as "0xstring" && shouldShowTVL && (<span className={"truncate" + (tvlValue > 0 ? " text-emerald-300" : "")}>TVL: {Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(tvlValue)} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? "$" : tokenB.name}</span>)}
                                </Button>
                            );
                        })()}
                    </div>

                    {poolSelect === "CMswap" && (
                        <>
                            <div className="flex justify-between items-center my-2">
                                <span className="text-gray-400 text-xs">Swap fee tier</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 h-[70px]">
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 100 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(100)}>
                                    <span>0.01%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl100']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl100']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 500 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(500)}>
                                    <span>0.05%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl500']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl500']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 3000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(3000)}>
                                    <span>0.3%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl3000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl3000']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 10000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(10000)}>
                                    <span>1%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl10000']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            }
            {(tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountB) !== 0 ? (
                <Button 
                    className="w-full py-6 px-8 mt-4 font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300
                    bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800
                    hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect
                    shadow-lg shadow-emerald-500/40
                    active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" 
                    onClick={handleSwap}
                >
                    Swap
                </Button>
            ) : (
                <Button
                    disabled
                    className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 mt-4"
                >
                    Swap
                </Button>
            ))}

            <div className="mt-4 border-t border-[#00ff9d]/10 pt-4">
                {altRoute !== undefined &&
                    <div className="flex items-center text-gray-500 text-xs my-2">
                        <span className="mr-1">route</span>
                        <span className="text-white text-xs px-2 gap-1">{tokens.map(obj => obj.value).indexOf(altRoute.a) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.a)].name}  → {tokens.map(obj => obj.value).indexOf(altRoute.b) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.b)].name} → {tokens.map(obj => obj.value).indexOf(altRoute.c) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.c)].name}</span>
                    </div>
                }
                {tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token' && tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' &&
                    <>
                        <div className="flex items-center text-gray-500 text-xs my-2">
                            <span className="mr-1">price qoute</span>
                            {exchangeRate !== '0' && !isNaN(Number(exchangeRate))
                                ? (<span
                                    className="text-[#00ff9d] text-xs px-2 gap-1 hover:cursor-pointer" onClick={() => setSwapDirection(!swapDirection)}>
                                    {swapDirection ? `1 ${tokenB.name} = ${Number(exchangeRate).toFixed(6)} ${tokenA.name}` : `1 ${tokenA.name} = ${isFinite(1 / Number(exchangeRate)) ? (1 / Number(exchangeRate)).toFixed(4) : (0).toFixed(4)} ${tokenB.name}`}
                                </span>
                                )
                                : <span className="text-red-500 px-2">insufficient liquidity</span>
                            }
                            {!wrappedRoute && Number(amountB) > 0 &&
                                <span>[PI: {
                                    ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate))) - 100 <= 100 ?
                                        ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate))) - 100 > 0 ?
                                            ((100 - ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate)))) * -1).toFixed(4) :
                                            (100 - ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate)))).toFixed(4)
                                        :
                                        ">100"
                                }%]</span>
                            }
                        </div>
                        {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') &&
                            <div className="flex items-center text-gray-500 text-xs my-2">
                                <span className="mr-1">token price</span>
                                {exchangeRate !== '0' && exchangeRate !== '' && <span className="text-white text-xs px-2 gap-1">
                                    {tokenA.name === 'KUSDT' && <span>{Number(exchangeRate).toFixed(4)} </span>}
                                    {tokenB.name === 'KUSDT' && <span>{Number(1 / Number(exchangeRate)).toFixed(4)} </span>}
                                    $
                                </span>}
                            </div>
                        }
                    </>
                }
                <div className="flex items-center text-gray-500 text-xs my-2">
                    <span className="mr-1">slippage tolerance</span>
                    <span className="text-xs px-2 flex items-center gap-1">5%</span>
                </div>
            </div>
        </div>
    )
}
