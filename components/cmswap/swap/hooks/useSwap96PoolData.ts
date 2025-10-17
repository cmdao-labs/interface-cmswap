'use client';
import * as React from 'react'
import { formatEther, formatUnits } from 'viem'
import { getBalance, readContracts } from '@wagmi/core'
import { normalizeTokenPair } from './shared'
import { chains } from '@/lib/chains'
import { getDecimals } from '@/components/cmswap/swap/utils'
const { tokens: defaultTokens, v3FactoryContract, v3PoolABI, erc20ABI, CMswapUniSmartRouteContractV2, UniswapPairv2PoolABI, } = chains[96]
type UIToken = { name: string; value: '0xstring'; logo: string; decimal: number }
type CMTvlState = {
    tvl10000: string
    tvl3000: string
    tvl500: string
    tvl100: string
    exchangeRate: string
    isReverted: boolean
    FixedExchangeRate: string
}
type DMswapState = {
    tvl10000: string
    tvl3000: string
    tvl500: string
    tvl100: string
    exchangeRate: string
    isReverted: boolean
    FixedExchangeRate: string
}
type PonderState = {
    tvl10000: string
    exchangeRate: string
    isReverted: boolean
    FixedExchangeRate: string
}
type UdonState = {
    tvl10000: string
    exchangeRate: string
    isReverted: boolean
    FixedExchangeRate: string
}
interface UseSwap96PoolDataParams<TToken extends UIToken> {
    config: Parameters<typeof getBalance>[0]
    address?: string
    tokens: readonly TToken[]
    tokenA: TToken
    tokenB: TToken
    feeSelect: number
    txupdate: string
    hasInitializedFromParams: boolean
    setTokenA: React.Dispatch<React.SetStateAction<TToken>>
    setTokenB: React.Dispatch<React.SetStateAction<TToken>>
    setTokenABalance: React.Dispatch<React.SetStateAction<string>>
    setTokenBBalance: React.Dispatch<React.SetStateAction<string>>
    setWrappedRoute: React.Dispatch<React.SetStateAction<boolean>>
    setExchangeRate: React.Dispatch<React.SetStateAction<string>>
    setAltRoute: React.Dispatch<React.SetStateAction<{ a: '0xstring', b: '0xstring', c: '0xstring' } | undefined>>
    setCMswapTVL: React.Dispatch<React.SetStateAction<CMTvlState>>
    setDMswapTVL: React.Dispatch<React.SetStateAction<DMswapState>>
    setUdonTVL: React.Dispatch<React.SetStateAction<UdonState>>
    setPonderTVL: React.Dispatch<React.SetStateAction<PonderState>>
    setReserveUdonA: React.Dispatch<React.SetStateAction<bigint>>
    setReserveUdonB: React.Dispatch<React.SetStateAction<bigint>>
    setAmountA: React.Dispatch<React.SetStateAction<string>>
    setAmountB: React.Dispatch<React.SetStateAction<string>>
}

export function useSwap96PoolData<TToken extends UIToken>({ config, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute, setCMswapTVL, setDMswapTVL, setUdonTVL, setPonderTVL, setReserveUdonA, setReserveUdonB, setAmountA, setAmountB, }: UseSwap96PoolDataParams<TToken>) {
    React.useEffect(() => {
        let cancelled = false
        const fetchPoolData = async () => {
            const {tokenAValue: tokenAvalue, tokenBValue: tokenBvalue, isSameToken, isNativeWrappedPair, isTokenANative, isTokenBNative} = normalizeTokenPair(tokens, tokenA, tokenB)
            if (isSameToken) {
                setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 } as TToken)
                return
            }
            const nativeBal = address ? await getBalance(config, { address: address as '0xstring' }) : { value: BigInt(0) }
            const stateA = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenAvalue, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                ],
            })
            if (cancelled) return
            const stateB = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenBvalue, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 10000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 3000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 500] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 100] },
                ],
            })
            if (cancelled) return
            if (stateA[0].result && tokenA.name === 'Choose Token') {
                const existing = tokens.find(t => t.value === tokenA.value)
                setTokenA({name: stateA[0].result as unknown as string, value: tokenA.value, logo: (existing as any)?.logo ?? '../favicon.ico', decimal: (existing as any)?.decimal ?? 18} as TToken)
            }
            if (stateB[0].result && tokenB.name === 'Choose Token') {
                const existing = tokens.find(t => t.value === tokenB.value)
                setTokenB({name: stateB[0].result as unknown as string, value: tokenB.value, logo: (existing as any)?.logo ?? '../favicon.ico', decimal: (existing as any)?.decimal ?? 18} as TToken)
            }
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
            const pair10000 = stateB[2].result !== undefined ? (stateB[2].result as '0xstring') : ('' as '0xstring')
            const pair3000 = stateB[3].result !== undefined ? (stateB[3].result as '0xstring') : ('' as '0xstring')
            const pair500 = stateB[4].result !== undefined ? (stateB[4].result as '0xstring') : ('' as '0xstring')
            const pair100 = stateB[5].result !== undefined ? (stateB[5].result as '0xstring') : ('' as '0xstring')
            const updateCMswapTvlKey = (key: keyof CMTvlState, value: number, isReverted: boolean) => {
                setCMswapTVL(prev => ({...prev, [key]: value >= 1e-9 ? value.toString() : '0', isReverted}))
            }
            const updateDMswapTvlKey = (value: number, isReverted: boolean) => {
                setDMswapTVL(prev => ({...prev, tvl10000: value >= 1e-9 ? value.toString() : '0', isReverted}))
            }
            const updateUdonswapTvlKey = (value: number, isReverted: boolean) => {
                setUdonTVL(prev => ({...prev, tvl10000: value >= 1e-9 ? value.toString() : '0', isReverted}))
            }
            const updatePonderTvlKey = (value: number, isReverted: boolean) => {
                setPonderTVL(prev => ({...prev, tvl10000: value >= 1e-9 ? value.toString() : '0', isReverted}))
            }
            const updateExchangeRateCMswapTVL = (feeAmount: number, exchangeRate: number) => {
                setCMswapTVL(prev => ({...prev, exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prev.exchangeRate, FixedExchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prev.FixedExchangeRate}))
            }
            const updateExchangeRateDMswapTVL = (exchangeRate: number) => {
                setDMswapTVL(prev => ({...prev, exchangeRate: exchangeRate.toString()}))
            }
            const updateExchangeRateUdonswapTVL = (exchangeRate: number) => {
                setUdonTVL(prev => ({...prev, exchangeRate: exchangeRate.toString()}))
            }
            const updateExchangeRatePonderTVL = (exchangeRate: number) => {
                setPonderTVL(prev => ({...prev, exchangeRate: exchangeRate.toString()}))
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
                            ],
                        })
                        if (cancelled) return
                        let isReverted = false
                        const computePrice = (token0: string, sqrtPriceX96: bigint) => token0.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(sqrtPriceX96) / (2 ** 96)) ** 2)
                        const token0_10000 = (poolState[0].result ?? '') as string
                        const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                        const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                        const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)
                        let currPrice_10000 = token0_10000.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2 : 1 / ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2)
                        if ((tokenAvalue === ('0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring') && tokenBvalue === ('0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring')) || (tokenAvalue === ('0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring') && tokenBvalue === ('0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring'))) {
                            if (feeSelect === 10000) {
                                isReverted = token0_10000.toUpperCase() !== tokenBvalue.toUpperCase() ? false : true
                                setExchangeRate(currPrice_10000.toString())
                            }
                        } else if (feeSelect === 10000) {
                            isReverted = token0_10000.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                            setExchangeRate(currPrice_10000.toString())
                        }
                        const tvl_10000 = currPrice_10000 !== 0 && currPrice_10000 !== Infinity ? Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000) + Number(formatEther(tokenBamount_10000)) : 0
                        if (feeSelect === 10000) {
                            if (currPrice_10000 === Infinity) {
                                updateExchangeRateCMswapTVL(10000, 0)
                            } else {
                                updateExchangeRateCMswapTVL(10000, Number(currPrice_10000.toString()))
                                if (tvl_10000 < 1e-9) updateExchangeRateCMswapTVL(10000, 0);
                            }
                        }
                        updateCMswapTvlKey('tvl10000', tvl_10000, isReverted)
                        if (feeSelect === 10000 && tvl_10000 < 1e-9) {
                            const init: { contracts: any[] } = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 10000]})
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 10000]})
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate: TToken | undefined
                            let altPair0: unknown
                            let altPair1: unknown
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[i / 2]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue})
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ],
                                })
                                const altToken0 = (altPoolState[0].result ?? '') as string
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2)
                                const altToken1 = (altPoolState[2].result ?? '') as string
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2)
                                if (feeSelect === 10000) updateExchangeRateCMswapTVL(10000, Number((altPrice1 / altPrice0).toString()));
                            }
                        }
                        const token0_3000 = (poolState[4].result ?? '') as string
                        const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                        const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                        const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                        const currPrice_3000 = computePrice(token0_3000, sqrtPriceX96_3000)
                        const tvl_3000 = currPrice_3000 !== 0 && currPrice_3000 !== Infinity ? Number(formatEther(tokenAamount_3000)) * (1 / currPrice_3000) + Number(formatEther(tokenBamount_3000)) : 0
                        if (feeSelect === 3000) {
                            if (currPrice_3000 !== Infinity) {
                                updateExchangeRateCMswapTVL(3000, Number(currPrice_3000.toString()))
                                if (tvl_3000 < 1e-9) updateExchangeRateCMswapTVL(3000, 0);
                            } else {
                                updateExchangeRateCMswapTVL(3000, 0)
                            }
                        }
                        updateCMswapTvlKey('tvl3000', tvl_3000, token0_3000.toUpperCase() === tokenBvalue.toUpperCase())
                        if (feeSelect === 3000 && tvl_3000 < 1e-9) {
                            const init: { contracts: any[] } = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 3000]})
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 3000]})
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate: TToken | undefined
                            let altPair0: unknown
                            let altPair1: unknown
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue})
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ],
                                })
                                const altToken0 = (altPoolState[0].result ?? '') as string
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2)
                                const altToken1 = (altPoolState[2].result ?? '') as string
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2)
                                if (feeSelect === 3000) updateExchangeRateCMswapTVL(3000, Number((altPrice1 / altPrice0).toString()));
                            }
                        }
                        const token0_500 = (poolState[8].result ?? '') as string
                        const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                        const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                        const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                        const currPrice_500 = computePrice(token0_500, sqrtPriceX96_500)
                        const tvl_500 = currPrice_500 !== 0 && currPrice_500 !== Infinity ? Number(formatEther(tokenAamount_500)) * (1 / currPrice_500) + Number(formatEther(tokenBamount_500)) : 0
                        if (feeSelect === 500) {
                            if (currPrice_500 !== Infinity) {
                                updateExchangeRateCMswapTVL(500, Number(currPrice_500.toString()))
                                if (tvl_500 < 1e-9) updateExchangeRateCMswapTVL(500, 0);
                            } else {
                                updateExchangeRateCMswapTVL(500, 0)
                            }
                            isReverted = token0_500.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                        }
                        updateCMswapTvlKey('tvl500', tvl_500, isReverted)
                        if (feeSelect === 500 && tvl_500 < 1e-9) {
                            const init: { contracts: any[] } = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 500]})
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 500]})
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate: TToken | undefined
                            let altPair0: unknown
                            let altPair1: unknown
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue})
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ],
                                })
                                const altToken0 = (altPoolState[0].result ?? '') as string
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2)
                                const altToken1 = (altPoolState[2].result ?? '') as string
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2)
                                if (feeSelect === 500) updateExchangeRateCMswapTVL(500, Number((altPrice1 / altPrice0).toString()));
                            }
                        }
                        const token0_100 = (poolState[12].result ?? '') as string
                        const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                        const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                        const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                        const currPrice_100 = computePrice(token0_100, sqrtPriceX96_100)
                        const tvl_100 = currPrice_100 !== 0 && currPrice_100 !== Infinity ? Number(formatEther(tokenAamount_100)) * (1 / currPrice_100) + Number(formatEther(tokenBamount_100)) : 0
                        if (feeSelect === 100) {
                            if (currPrice_100 !== Infinity) {
                                updateExchangeRateCMswapTVL(100, Number(currPrice_100.toString()))
                                if (tvl_100 < 1e-9) updateExchangeRateCMswapTVL(100, 0);
                            } else {
                                updateExchangeRateCMswapTVL(100, 0)
                            }
                            isReverted = token0_100.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                        }
                        updateCMswapTvlKey('tvl100', tvl_100, isReverted)
                        if (feeSelect === 100 && tvl_100 < 1e-9) {
                            const init: { contracts: any[] } = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 100]})
                                init.contracts.push({...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 100]})
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate: TToken | undefined
                            let altPair0: unknown
                            let altPair1: unknown
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue})
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ],
                                })
                                const altToken0 = (altPoolState[0].result ?? '') as string
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2)
                                const altToken1 = (altPoolState[2].result ?? '') as string
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2)
                                if (feeSelect === 100) updateExchangeRateCMswapTVL(100, Number((altPrice1 / altPrice0).toString()));
                            }
                        }
                    } catch (error) {
                        updateExchangeRateCMswapTVL(feeSelect, 0)
                    }
                    try {
                        setAltRoute(undefined)
                        const getPairAddr = await readContracts(config, {contracts: [{...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(0), tokenAvalue, tokenBvalue]}]})
                        const DiamonPair = getPairAddr[0].result !== undefined ? (getPairAddr[0].result as '0xstring') : ('' as '0xstring')
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...UniswapPairv2PoolABI, address: DiamonPair, functionName: 'token0' },
                            ],
                        })
                        let tvlDM = 0
                        let exchangeRateDM = 0
                        if (DiamonPair !== ('0x0000000000000000000000000000000000000000' as '0xstring')) {
                            const tokenAamount = BigInt(getPoolState[0].result || 0)
                            const tokenBamount = BigInt(getPoolState[1].result || 0)
                            const currPriceDM = getPoolState[2].result !== undefined ? Number(tokenAamount) / Number(tokenBamount) : 0
                            tvlDM = currPriceDM !== 0 && currPriceDM !== Infinity ? Number(formatEther(tokenAamount)) * (1 / currPriceDM) + Number(formatEther(tokenBamount)) : 0
                            exchangeRateDM = tvlDM < 1e-9 ? 0 : currPriceDM
                            if (currPriceDM !== Infinity) setDMswapTVL(prev => ({...prev, FixedExchangeRate: exchangeRateDM.toString()}));
                        } else {
                            tvlDM = 0
                            exchangeRateDM = 0
                            setDMswapTVL(prev => ({...prev, FixedExchangeRate: '0'}))
                        }
                        updateDMswapTvlKey(tvlDM, true)
                        updateExchangeRateDMswapTVL(exchangeRateDM)
                    } catch (error) {
                        updateExchangeRateDMswapTVL(0)
                    }
                    try {
                        setAltRoute(undefined)
                        const getPairAddr = await readContracts(config, {contracts: [{...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(1), tokenAvalue, tokenBvalue]}]})
                        const UdonPair = getPairAddr[0].result !== undefined ? (getPairAddr[0].result as '0xstring') : ('' as '0xstring')
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [UdonPair] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [UdonPair] },
                                { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' },
                            ],
                        })
                        let tvlUdon = 0
                        let exchangeRateUdon = 0
                        if (UdonPair !== ('0x0000000000000000000000000000000000000000' as '0xstring')) {
                            const tokenAamount = getPoolState[0].result !== undefined ? getPoolState[0].result : BigInt(0)
                            const tokenBamount = getPoolState[1].result !== undefined ? getPoolState[1].result : BigInt(0)
                            const currPriceUdon = getPoolState[2].result !== undefined ? Number(tokenAamount) / Number(tokenBamount) : 0
                            setReserveUdonA(tokenAamount)
                            setReserveUdonB(tokenBamount)
                            tvlUdon = (Number(formatEther(tokenAamount)) * (1 / currPriceUdon)) + Number(formatEther(tokenBamount))
                            exchangeRateUdon = tvlUdon < 1e-9 ? 0 : currPriceUdon
                            if (currPriceUdon !== Infinity) setUdonTVL(prev => ({...prev, FixedExchangeRate: Number(exchangeRateUdon).toString()}))
                        }
                        updateUdonswapTvlKey(tvlUdon, true)
                        updateExchangeRateUdonswapTVL(exchangeRateUdon)
                    } catch (error) {
                        updateExchangeRateUdonswapTVL(0)
                    }
                    try {
                        setAltRoute(undefined)
                        const getPairAddr = await readContracts(config, {contracts: [{...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(2), tokenAvalue, tokenBvalue]}]})
                        const DiamonPair = getPairAddr[0].result !== undefined ? (getPairAddr[0].result as '0xstring') : ('' as '0xstring')
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...UniswapPairv2PoolABI, address: DiamonPair, functionName: 'token0' },
                            ],
                        })
                        let tvlPD = 0
                        let exchangeRatePD = 0
                        if (DiamonPair !== ('0x0000000000000000000000000000000000000000' as '0xstring')) {
                            const tokenAamount = BigInt(getPoolState[0].result || 0)
                            const tokenBamount = BigInt(getPoolState[1].result || 0)
                            const currPriceDM = getPoolState[2].result !== undefined ? Number(tokenAamount) / Number(tokenBamount) : 0
                            tvlPD = currPriceDM !== 0 && currPriceDM !== Infinity ? Number(formatEther(tokenAamount)) * (1 / currPriceDM) + Number(formatEther(tokenBamount)) : 0
                            exchangeRatePD = tvlPD < 1e-9 ? 0 : currPriceDM
                            if (currPriceDM !== Infinity) setPonderTVL(prev => ({...prev, FixedExchangeRate: Number(exchangeRatePD).toString()}));
                        }
                        updatePonderTvlKey(tvlPD, true)
                        updateExchangeRatePonderTVL(exchangeRatePD)
                    } catch (error) {
                        updateExchangeRatePonderTVL(0)
                    }
                }
            }
        }
        setAmountA('')
        setAmountB('')
        if (!hasInitializedFromParams) return;
        (async () => {
            try {
                if (!cancelled) await fetchPoolData()
            } catch (error) {
                console.error('Failed to load Swap96 pool data', error)
            }
        })()
        return () => {cancelled = true;}
    }, [config, address, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute, setCMswapTVL, setDMswapTVL, setUdonTVL, setPonderTVL, setReserveUdonA, setReserveUdonB, setAmountA, setAmountB])
}
