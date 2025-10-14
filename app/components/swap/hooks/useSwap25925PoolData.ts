'use client';
import * as React from 'react'
import { formatUnits } from 'viem'
import { getBalance, readContracts } from '@wagmi/core'
import { tokens as defaultTokens, v3FactoryContract, v3PoolABI, erc20ABI, CMswapUniSmartRouteContractV2, UniswapPairv2PoolABI } from '@/app/lib/25925'
import { normalizeTokenPair } from './shared'
import { getDecimals } from '@/app/components/swap/utils'
type Token = typeof defaultTokens[number]
interface UseSwap25925PoolDataParams {
    config: Parameters<typeof getBalance>[0]
    address?: string
    tokens: Token[]
    tokenA: Token
    tokenB: Token
    feeSelect: number
    txupdate: string
    hasInitializedFromParams: boolean
    setTokenA: React.Dispatch<React.SetStateAction<Token>>
    setTokenB: React.Dispatch<React.SetStateAction<Token>>
    setTokenABalance: React.Dispatch<React.SetStateAction<string>>
    setTokenBBalance: React.Dispatch<React.SetStateAction<string>>
    setWrappedRoute: React.Dispatch<React.SetStateAction<boolean>>
    setExchangeRate: React.Dispatch<React.SetStateAction<string>>
    setAltRoute: React.Dispatch<React.SetStateAction<{ a: '0xstring', b: '0xstring', c: '0xstring' } | undefined>>
    setCMswapTVL: React.Dispatch<React.SetStateAction<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; isReverted: boolean; FixedExchangeRate: string; }>>
    setAmountA: React.Dispatch<React.SetStateAction<string>>
    setAmountB: React.Dispatch<React.SetStateAction<string>>
    setNewPrice: React.Dispatch<React.SetStateAction<string>>
}

export function useSwap25925PoolData({config, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute, setCMswapTVL, setAmountA, setAmountB, setNewPrice}: UseSwap25925PoolDataParams) {
    React.useEffect(() => {
        const fetch0 = async () => {
            const {tokenAValue: tokenAvalue, tokenBValue: tokenBvalue, isSameToken, isNativeWrappedPair, isTokenANative, isTokenBNative} = normalizeTokenPair(tokens, tokenA, tokenB)
            if (isSameToken) {
                setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico' })
                return
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
            if (stateA[0].result && tokenA.name === 'Choose Token') setTokenA({name: stateA[0].result, value: tokenA.value, logo: tokens.find(t => t.value === tokenA.value)?.logo ?? '../favicon.ico', decimal: tokens.find(t => t.value === tokenA.value)?.decimal ?? 18});
            if (stateB[0].result && tokenB.name === 'Choose Token') setTokenB({name: stateB[0].result, value: tokenB.value, logo: tokens.find(t => t.value === tokenB.value)?.logo ?? '../favicon.ico', decimal: tokens.find(t => t.value === tokenB.value)?.decimal ?? 18});
            if (isTokenANative) {
                setTokenABalance(formatUnits(nativeBal.value, getDecimals(tokenA)))
            } else if (stateA[1].result !== undefined) {
                setTokenABalance(formatUnits(stateA[1].result as bigint, getDecimals(tokenA)))
            }
            if (isTokenBNative) {
                setTokenBBalance(formatUnits(nativeBal.value, getDecimals(tokenB)))
            } else if (stateB[1].result !== undefined) {
                setTokenBBalance(formatUnits(stateB[1].result as bigint, getDecimals(tokenB)))
            }
            const pair10000 = stateB[2].result !== undefined ? stateB[2].result as '0xstring' : '' as '0xstring'
            const pair3000 = stateB[3].result !== undefined ? stateB[3].result as '0xstring' : '' as '0xstring'
            const pair500 = stateB[4].result !== undefined ? stateB[4].result as '0xstring' : '' as '0xstring'
            const pair100 = stateB[5].result !== undefined ? stateB[5].result as '0xstring' : '' as '0xstring'
            const updateCMswapTvlKey = (key: keyof { tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; isReverted: boolean; FixedExchangeRate: string; }, value: number, isReverted: boolean) => {
                setCMswapTVL(prev => ({ ...prev, [key]: value >= 1e-9 ? value.toString() : '0', isReverted }))
            }
            const updateExchangeRateCMswapTVL = (feeAmount: number, exchangeRate: number) => {
                setCMswapTVL(prev => ({ ...prev, exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prev.exchangeRate }))
            }
            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                if (isNativeWrappedPair) {
                    setExchangeRate('1')
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
                        const calculateTvl = (token0: string, sqrtPriceX96: bigint, amountA: bigint, amountB: bigint) => {
                            const price = token0.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(sqrtPriceX96) / (2 ** 96)) ** 2)
                            return {price, tvl: price !== 0 && price !== Infinity ? Number(formatEther(amountA)) * (1 / price) + Number(formatEther(amountB)) : 0}
                        }
                        const token0_10000 = poolState[0].result !== undefined ? poolState[0].result : '' as '0xstring'
                        const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                        const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                        const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)
                        let { price: currPrice_10000, tvl: tvl_10000 } = calculateTvl(token0_10000, sqrtPriceX96_10000, tokenAamount_10000, tokenBamount_10000)
                        let isReverted = token0_10000.toUpperCase() !== tokenBvalue.toUpperCase()
                        if ((tokenAvalue.toUpperCase() === ('0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5').toUpperCase() && tokenBvalue.toUpperCase() === ('0x7d984C24d2499D840eB3b7016077164e15E5faA6').toUpperCase()) || (tokenAvalue.toUpperCase() === ('0x7d984C24d2499D840eB3b7016077164e15E5faA6').toUpperCase() && tokenBvalue.toUpperCase() === ('0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5').toUpperCase())) {
                            isReverted = token0_10000.toUpperCase() !== tokenBvalue.toUpperCase()
                            if (feeSelect === 10000) setExchangeRate(currPrice_10000.toString())
                        } else if (feeSelect === 10000) {
                            isReverted = token0_10000.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                            setExchangeRate(currPrice_10000.toString())
                        }
                        updateCMswapTvlKey('tvl10000', tvl_10000, isReverted)
                        if (feeSelect === 10000) {
                            updateExchangeRateCMswapTVL(10000, currPrice_10000 !== Infinity ? Number(currPrice_10000.toString()) : 0)
                            setNewPrice(currPrice_10000.toString())
                        }
                        const token0_3000 = poolState[4].result !== undefined ? poolState[4].result : '' as '0xstring'
                        const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                        const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                        const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                        const { price: currPrice_3000, tvl: tvl_3000 } = calculateTvl(token0_3000, sqrtPriceX96_3000, tokenAamount_3000, tokenBamount_3000)
                        updateCMswapTvlKey('tvl3000', tvl_3000, token0_3000.toUpperCase() !== tokenBvalue.toUpperCase())
                        if (feeSelect === 3000) updateExchangeRateCMswapTVL(3000, currPrice_3000 !== Infinity ? Number(currPrice_3000.toString()) : 0)
                        const token0_500 = poolState[8].result !== undefined ? poolState[8].result : '' as '0xstring'
                        const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                        const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                        const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                        const { price: currPrice_500, tvl: tvl_500 } = calculateTvl(token0_500, sqrtPriceX96_500, tokenAamount_500, tokenBamount_500)
                        updateCMswapTvlKey('tvl500', tvl_500, token0_500.toUpperCase() !== tokenBvalue.toUpperCase())
                        if (feeSelect === 500) updateExchangeRateCMswapTVL(500, currPrice_500 !== Infinity ? Number(currPrice_500.toString()) : 0)
                        const token0_100 = poolState[12].result !== undefined ? poolState[12].result : '' as '0xstring'
                        const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                        const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                        const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                        const { price: currPrice_100, tvl: tvl_100 } = calculateTvl(token0_100, sqrtPriceX96_100, tokenAamount_100, tokenBamount_100)
                        updateCMswapTvlKey('tvl100', tvl_100, token0_100.toUpperCase() !== tokenBvalue.toUpperCase())
                        if (feeSelect === 100) updateExchangeRateCMswapTVL(100, currPrice_100 !== Infinity ? Number(currPrice_100.toString()) : 0)
                        if (feeSelect === 3000 && tvl_3000 < 1e-9) {
                            const init: { contracts: any[] } = { contracts: [] }
                            tokens.forEach(t => {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, t.value, 3000] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [t.value, tokenBvalue, 3000] })
                            })
                            const findAltRoute = await readContracts(config, init)
                            let altPair0: string | undefined
                            let altPair1: string | undefined
                            for (let i = 0; i < findAltRoute.length; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' &&
                                    findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altPair0 = findAltRoute[i].result as string
                                    altPair1 = findAltRoute[i + 1].result as string
                                    break
                                }
                            }
                            if (altPair0 && altPair1) {
                                setAltRoute({a: tokenAvalue as '0xstring', b: tokens[1].value, c: tokenBvalue as '0xstring'})
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : '' as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2)
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : '' as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2)
                                updateExchangeRateCMswapTVL(3000, Number((altPrice1 / altPrice0).toString()))
                            }
                        }
                    } catch {
                        updateExchangeRateCMswapTVL(feeSelect, 0)
                    }
                }
            }
            setAmountA('')
            setAmountB('')
        }
        const execute = async () => {
            if (!hasInitializedFromParams) return
            await fetch0()
        }
        execute()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, address, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams])
}
