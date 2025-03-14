import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts } from '@wagmi/core'
import { formatEther, parseEther } from 'viem'
import { ArrowDown, ChevronDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebouncedCallback } from 'use-debounce'
import { tokens, ROUTER02, v3FactoryContract, qouterV2Contract, router02Contract, erc20ABI, v3PoolABI } from '@/app/lib/8899'
import { config } from '@/app/config'

export default function Swap({ 
    setIsLoading, setErrMsg, 
}: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>,
}) {
    const { address } = useAccount()
    const [txupdate, setTxupdate] = React.useState("")
    const [exchangeRate, setExchangeRate] = React.useState("")
    const [altRoute, setAltRoute] = React.useState<{a: '0xstring', b: '0xstring', c: '0xstring'}>()
    const [tvl10000, setTvl10000] = React.useState("")
    const [tvl3000, setTvl3000] = React.useState("")
    const [tvl500, setTvl500] = React.useState("")
    const [tvl100, setTvl100] = React.useState("")
    const [newPrice, setNewPrice] = React.useState("")
    const [tokenA, setTokenA] = React.useState<{name: string, value: '0xstring', logo: string}>(tokens[0])
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{name: string, value: '0xstring', logo: string}>({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)

    function encodePath(tokens: string[], fees: number[]): string {
        let path = "0x"
        for (let i = 0; i < fees.length; i++) {
            path += tokens[i].slice(2)
            path += fees[i].toString(16).padStart(6, "0")
        }
        path += tokens[tokens.length - 1].slice(2)
        return path
    }

    const getQoute = useDebouncedCallback(async (_amount: string) => {
        try {
            if (Number(_amount) !== 0) {
                if (altRoute === undefined) {
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
                    let newPrice = 1 / ((Number(qouteOutput.result[1]) / (2 ** 96)) ** 2)
                    setNewPrice(newPrice.toString())
                } else {
                    const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                    const qouteOutput = await simulateContract(config, {
                        ...qouterV2Contract,
                        functionName: 'quoteExactInput',
                        args: [route as '0xstring', parseEther(_amount)]
                    })
                    setAmountB(formatEther(qouteOutput.result[0]))
                    let newPrice = 1 / ((Number(qouteOutput.result[1]) / (2 ** 96)) ** 2)
                    setNewPrice(newPrice.toString())
                }
            } else {
                setAmountB("")
            }
        } catch {}
    }, 700)

    const switchToken = () => {
        const _tokenA = tokenB
        const _tokenB = tokenA
        setTokenA(_tokenA)
        setTokenB(_tokenB)
    }

    const swap = async () => {
        setIsLoading(true)
        try {
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', ROUTER02] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [ROUTER02, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let h
            if (altRoute === undefined) {
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
                h = await writeContract(config, request)
            } else {
                const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                const { request } = await simulateContract(config, {
                    ...router02Contract,
                    functionName: 'exactInput',
                    args: [{
                        path: route as '0xstring',
                        recipient: address as '0xstring',
                        amountIn: parseEther(amountA),
                        amountOutMinimum: parseEther(String(Number(amountB) * 0.95))
                    }]
                })
                h = await writeContract(config, request)
            }
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    React.useEffect(() => {
        const fetch0 = async () => {
            tokenA.value.toUpperCase() === tokenB.value.toUpperCase() && setTokenB({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})

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
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 10000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 3000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 500] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 100] },
                ]
            })
            stateA[0].result !== undefined && tokenA.name === "Choose Token" && setTokenA({
                name: stateA[0].result,
                value: tokenA.value,
                logo: tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ? 
                    tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].logo : 
                    "../favicon.ico"
            })
            stateB[0].result !== undefined && tokenB.name === "Choose Token" && setTokenB({
                name: stateB[0].result, 
                value: tokenB.value, 
                logo: tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ? 
                    tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].logo : 
                    "../favicon.ico"
            })
            stateA[1].result !== undefined && setTokenABalance(formatEther(stateA[1].result))
            stateB[1].result !== undefined && setTokenBBalance(formatEther(stateB[1].result))
            const pair10000 = stateB[2].result !== undefined ? stateB[2].result  as '0xstring' : '' as '0xstring'
            const pair3000 = stateB[3].result !== undefined ? stateB[3].result  as '0xstring' : '' as '0xstring'
            const pair500 = stateB[4].result !== undefined ? stateB[4].result  as '0xstring' : '' as '0xstring'
            const pair100 = stateB[5].result !== undefined ? stateB[5].result  as '0xstring' : '' as '0xstring'

            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                try {
                    setAltRoute(undefined)
                    const poolState = await readContracts(config, {
                        contracts: [
                            { ...v3PoolABI, address: pair10000, functionName: 'token0' },
                            { ...v3PoolABI, address: pair10000, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair10000] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair10000] },
                            { ...v3PoolABI, address: pair3000, functionName: 'token0' },
                            { ...v3PoolABI, address: pair3000, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair3000] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair3000] },
                            { ...v3PoolABI, address: pair500, functionName: 'token0' },
                            { ...v3PoolABI, address: pair500, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair500] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair500] },
                            { ...v3PoolABI, address: pair100, functionName: 'token0' },
                            { ...v3PoolABI, address: pair100, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair100] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair100] },
                        ]
                    })
                    const token0_10000 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
                    const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                    const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                    const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)
                    const currPrice_10000 = token0_10000.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2))
                    const tvl_10000 = currPrice_10000 !== 0 ?  (Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000)) + Number(formatEther(tokenBamount_10000)) : 0
                    feeSelect === 10000 && currPrice_10000 !== Infinity && setExchangeRate(currPrice_10000.toString())
                    feeSelect === 10000 && tvl_10000 < 1e-9 && setExchangeRate('0')
                    tvl_10000 >= 1e-9 ? setTvl10000(tvl_10000.toString()) : setTvl10000('0')
                    if (feeSelect === 10000 && tvl_10000 < 1e-9) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 10000] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 10000] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[i / 2]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        console.log({altIntermediate, altPair0, altPair1}) // for quick debugging
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            setExchangeRate((altPrice1 / altPrice0).toString())
                        }
                    }

                    const token0_3000 = poolState[4].result !== undefined ? poolState[4].result : "" as '0xstring'
                    const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                    const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                    const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                    const currPrice_3000 = token0_3000.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2))
                    const tvl_3000 = (Number(formatEther(tokenAamount_3000)) * (1 / currPrice_3000)) + Number(formatEther(tokenBamount_3000));
                    feeSelect === 3000 && setExchangeRate(currPrice_3000.toString())
                    feeSelect === 3000 && tvl_3000 < 1e-9 && setExchangeRate('0')
                    tvl_3000 >= 1e-9 ? setTvl3000(tvl_3000.toString()) : setTvl3000('0')
                    if (feeSelect === 3000 && tvl_3000 < 1e-9) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 3000] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 3000] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[0]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            feeSelect === 3000 && setExchangeRate((altPrice1 / altPrice0).toString())
                        }
                    }
                    
                    const token0_500 = poolState[8].result !== undefined ? poolState[8].result : "" as '0xstring'
                    const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                    const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                    const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                    const currPrice_500 = token0_500.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_500) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2))
                    const tvl_500 = (Number(formatEther(tokenAamount_500)) * (1 / currPrice_500)) + Number(formatEther(tokenBamount_500));
                    feeSelect === 500 && setExchangeRate(currPrice_500.toString())
                    feeSelect === 500 && tvl_500 < 1e-9 && setExchangeRate('0')
                    tvl_500 >= 1e-9 ? setTvl500(tvl_500.toString()) : setTvl500('0')
                    if (feeSelect === 500 && tvl_500 < 1e-9) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 500] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 500] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[0]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            feeSelect === 500 && setExchangeRate((altPrice1 / altPrice0).toString())
                        }
                    }

                    const token0_100 = poolState[12].result !== undefined ? poolState[12].result : "" as '0xstring'
                    const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                    const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                    const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                    const currPrice_100 = token0_100.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_100) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_100) / (2 ** 96)) ** 2))
                    const tvl_100 = (Number(formatEther(tokenAamount_100)) * (1 / currPrice_100)) + Number(formatEther(tokenBamount_100));
                    feeSelect === 100 && setExchangeRate(currPrice_100.toString())
                    feeSelect === 100 && tvl_100 < 1e-9 && setExchangeRate('0')
                    tvl_100 >= 1e-9 ? setTvl100(tvl_100.toString()) : setTvl100('0')
                    if (feeSelect === 100 && tvl_100 < 1e-9) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 100] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 100] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[0]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            feeSelect === 100 && setExchangeRate((altPrice1 / altPrice0).toString())
                        }
                    }
                } catch {
                    setExchangeRate("0")
                }
            }
        }

        setAmountA("")
        setAmountB("")
        address !== undefined && fetch0()
    }, [config, address, tokenA, tokenB, feeSelect, txupdate])

    return (
        <div className='space-y-2'>
            <div className="rounded-lg bg-[#0a0b1e]/80 border border-[#00ff9d]/10 p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 font-mono text-sm">From</span>
                    <input 
                        className="py-2 w-[340px] focus:outline-none text-gray-400 font-mono text-xs text-right" 
                        value={tokenA.value} 
                        onChange={e => {
                            if (e.target.value !== '0x') {
                                setTokenA({name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico'})
                            } else {
                                setTokenA({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})
                            }
                        }} 
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" autoFocus className="bg-transparent border-none text-white font-mono text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountA} onChange={e => {setAmountA(e.target.value); getQoute(e.target.value);}} />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 font-mono flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center overflow-hidden'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenA.logo !== '../favicon.ico' ?<img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
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
                    <span className="text-gray-500 font-mono text-xs">≈ ฿0.00</span>
                    <div>
                        <span className="text-gray-400 font-mono text-xs">{tokenA.name !== 'Choose Token' ? Number(tokenABalance).toFixed(4) + ' ' + tokenA.name : '0.0000'}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-[#00ff9d] font-mono text-xs px-2 cursor-pointer" onClick={() => {setAmountA(tokenABalance); getQoute(tokenABalance);}}>MAX</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center z-10">
                <Button variant="outline" size="icon" className="bg-[#0a0b1e] border border-[#00ff9d]/30 rounded-md h-10 w-10 shadow-md cursor-pointer" onClick={switchToken}>
                    <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
                </Button>
            </div>
            <div className="rounded-lg bg-[#0a0b1e]/80 border border-[#00ff9d]/10 p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 font-mono text-sm">To</span>
                    <input 
                        className="py-2 w-[340px] focus:outline-none text-gray-400 font-mono text-xs text-right" 
                        value={tokenB.value} 
                        onChange={e => {
                            if (e.target.value !== '0x') {
                                setTokenB({name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico'})
                            } else {
                                setTokenB({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})
                            }
                        }} 
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" className="bg-transparent border-none text-white font-mono text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountB} readOnly />
                    <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open2} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 font-mono flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center overflow-hidden'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenB.logo !== '../favicon.ico' ?<img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
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
                    <span className="text-gray-500 font-mono text-xs">≈ ฿0.00</span>
                    <span className="text-gray-400 font-mono text-xs">{tokenB.name !== 'Choose Token' ? Number(tokenBBalance).toFixed(4) + ' ' + tokenB.name : '0.0000'}</span>
                </div>
            </div>
            <div className="mt-6">
                <div className="flex justify-between items-center my-2">
                    <span className="text-gray-400 font-mono text-xs">Swap fee tier</span>
                </div>
                <div className="grid grid-cols-4 gap-2 h-[70px]">
                    <Button variant="outline" className={"font-mono h-full p-2 rounded-md gap-1 flex flex-col items-center justify-center text-xs " + (feeSelect === 100 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(100)}>
                        <span>0.01%</span>
                        {tokenB.value !== '0x' as '0xstring' && <span className={(Number(tvl100) > 0 ? 'text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(tvl100))} {tokenB.name}</span>}
                    </Button>
                    <Button variant="outline" className={"font-mono h-full p-2 rounded-md gap-1 flex flex-col items-center justify-center text-xs " + (feeSelect === 500 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(500)}>
                        <span>0.05%</span>
                        {tokenB.value !== '0x' as '0xstring' && <span className={(Number(tvl500) > 0 ? 'text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(tvl500))} {tokenB.name}</span>}
                    </Button>
                    <Button variant="outline" className={"font-mono h-full p-2 rounded-md gap-1 flex flex-col items-center justify-center text-xs " + (feeSelect === 3000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(3000)}>
                        <span>0.3%</span>
                        {tokenB.value !== '0x' as '0xstring' && <span className={(Number(tvl3000) > 0 ? 'text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(tvl3000))} {tokenB.name}</span>}
                    </Button>
                    <Button variant="outline" className={"font-mono h-full p-2 rounded-md gap-1 flex flex-col items-center justify-center text-xs " + (feeSelect === 10000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(10000)}>
                        <span>0.1%</span>
                        {tokenB.value !== '0x' as '0xstring' && <span className={(Number(tvl10000) > 0 ? 'text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(tvl10000))} {tokenB.name}</span>}
                    </Button>
                </div>
            </div>
            {tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountA) <= Number(tokenABalance) && Number(amountB) !== 0 ?
                <Button className="w-full bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 font-mono mt-4 cursor-pointer z-100" onClick={swap}>Swap</Button> :
                <Button disabled className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 font-mono mt-4">Swap</Button>
            }
            <div className="mt-4 border-t border-[#00ff9d]/10 pt-4">
                {altRoute !== undefined &&
                    <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                        <span className="mr-1">$alt_route</span>
                        <span className="mr-1">_</span>
                        <span className="animate-pulse">|</span>
                        <span className="text-[#00ff9d] font-mono text-xs px-2 gap-1">{tokens.map(obj => obj.value).indexOf(altRoute.a) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.a)].name}  → {tokens.map(obj => obj.value).indexOf(altRoute.b) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.b)].name} → {tokens.map(obj => obj.value).indexOf(altRoute.c) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.c)].name}</span>
                    </div>
                }
                {tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token' && tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' &&
                    <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                        <span className="mr-1">$price_qoute</span>
                        <span className="mr-1">_</span>
                        <span className="animate-pulse">|</span>
                        {exchangeRate !== '0' ? <span className="text-[#00ff9d] font-mono text-xs px-2 gap-1">1 {tokenB.name} = {Number(exchangeRate).toFixed(4)} {tokenA.name}</span> : <span className="font-bold text-red-500">insufficient liquidity</span>}
                        {Number(amountB) > 0 && 
                            <span>[PI: {((Number(newPrice) * 100) / Number(exchangeRate)) - 100 <= 100 ? (((Number(newPrice) * 100) / Number(exchangeRate)) - 100).toFixed(4) : ">100"}%]</span>
                        } 
                    </div>
                }
                <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                    <span className="mr-1">$slippage_tolerance</span>
                    <span className="mr-1">_</span>
                    <span className="animate-pulse">|</span>
                    <span className="text-[#00ff9d] font-mono text-xs px-2 flex items-center gap-1">5%</span>
                </div>
            </div>
        </div>
    )
}
