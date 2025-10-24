'use client';
import * as React from 'react'
import { formatEther, formatUnits } from 'viem'
import { getBalance, readContracts } from '@wagmi/core'
import { chains } from '@/lib/chains'
import { normalizeTokenPair } from './shared'
import { getDecimals } from '@/components/cmswap/swap/utils'

const { tokens: defaultTokens, v3FactoryContract, v3PoolABI, erc20ABI } = chains[56]
type UIToken = { name: string; value: '0xstring'; logo: string; decimal: number }
type PancakeSwapTvlState = { tvl10000: string; tvl2500: string; tvl500: string; tvl100: string; exchangeRate: string; t0: string }
interface UseSwap56PoolDataParams<TToken extends UIToken> { config: Parameters<typeof getBalance>[0]; address?: string; tokens: readonly TToken[]; tokenA: TToken; tokenB: TToken; feeSelect: number; txupdate: string; hasInitializedFromParams: boolean; setTokenA: React.Dispatch<React.SetStateAction<TToken>>; setTokenB: React.Dispatch<React.SetStateAction<TToken>>; setTokenABalance: React.Dispatch<React.SetStateAction<string>>; setTokenBBalance: React.Dispatch<React.SetStateAction<string>>; setWrappedRoute: React.Dispatch<React.SetStateAction<boolean>>; setExchangeRate: React.Dispatch<React.SetStateAction<string>>; setAltRoute: React.Dispatch<React.SetStateAction<{ a: '0xstring', b: '0xstring', c: '0xstring' } | undefined>>; setPancakeSwapTVL: React.Dispatch<React.SetStateAction<PancakeSwapTvlState>>; setBestPathArray: React.Dispatch<React.SetStateAction<string[] | null>>; setFixedExchangeRate: React.Dispatch<React.SetStateAction<string>>; setOnLoading: React.Dispatch<React.SetStateAction<boolean>>; setAmountA: React.Dispatch<React.SetStateAction<string>>; setAmountB: React.Dispatch<React.SetStateAction<string>>; }

export function useSwap56PoolData<TToken extends UIToken>({config, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute, setPancakeSwapTVL, setBestPathArray, setFixedExchangeRate, setOnLoading, setAmountA, setAmountB}: UseSwap56PoolDataParams<TToken>) {
    const prevTokensRef = React.useRef<{ a: string; b: string }>({ a: tokenA.value, b: tokenB.value })
    React.useEffect(() => {
        if (!hasInitializedFromParams) return
        const updatePancakeSwapTvlKey = (key: keyof PancakeSwapTvlState, value: number) => {setPancakeSwapTVL((prev: any) => ({ ...prev, [key]: value >= 1e-9 ? value.toString() : '0' }))}
        const updatePancakeSwapExchangeRate = (feeAmount: number, exchangeRate: number) => {setPancakeSwapTVL((prev: any) => ({ ...prev, exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prev.exchangeRate }))}
        const updatePancakeSwapToken0 = (value: string) => {setPancakeSwapTVL((prev: any) => ({ ...prev, t0: value as '0xstring' }))}
        const fetchData = async () => {
            setOnLoading(true)
            try {
                const {tokenAValue: tokenAvalue, tokenBValue: tokenBvalue, isSameToken, isTokenANative, isTokenBNative} = normalizeTokenPair(tokens, tokenA, tokenB)
                if (isSameToken) {
                    setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 } as TToken)
                    setOnLoading(false)
                    return
                }
                setAltRoute(undefined)
                const nativeBal = address ? await getBalance(config, { address: address as '0xstring' }) : { value: BigInt(0) }
                const stateA = await readContracts(config, {
                    contracts: [
                        { ...erc20ABI, address: tokenAvalue, functionName: 'symbol' },
                        { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                    ],
                })
                const stateB = await readContracts(config, {
                    contracts: [
                        { ...erc20ABI, address: tokenBvalue, functionName: 'symbol' },
                        { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                        { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 10000] },
                        { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 2500] },
                        { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 500] },
                        { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 100] },
                    ],
                })
                if (stateA[0].result && tokenA.name === 'Choose Token') {
                    const existing = tokens.find((t: any) => t.value === tokenA.value)
                    setTokenA({name: stateA[0].result, value: tokenA.value, logo: existing?.logo ?? '../favicon.ico', decimal: existing?.decimal ?? 18} as TToken)
                }
                if (stateB[0].result && tokenB.name === 'Choose Token') {
                    const existing = tokens.find((t: any) => t.value === tokenB.value)
                    setTokenB({name: stateB[0].result, value: tokenB.value, logo: existing?.logo ?? '../favicon.ico', decimal: existing?.decimal ?? 18} as TToken)
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
                const pair10000 = stateB[2].result !== undefined ? stateB[2].result as '0xstring' : '' as '0xstring'
                const pair2500 = stateB[3].result !== undefined ? stateB[3].result as '0xstring' : '' as '0xstring'
                const pair500 = stateB[4].result !== undefined ? stateB[4].result as '0xstring' : '' as '0xstring'
                const pair100 = stateB[5].result !== undefined ? stateB[5].result as '0xstring' : '' as '0xstring'
                const loadPoolState = await readContracts(config, {
                    contracts: [
                        { ...v3PoolABI, address: pair10000, functionName: 'token0' },
                        { ...v3PoolABI, address: pair10000, functionName: 'slot0' },
                        { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair10000] },
                        { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair10000] },
                        { ...v3PoolABI, address: pair2500, functionName: 'token0' },
                        { ...v3PoolABI, address: pair2500, functionName: 'slot0' },
                        { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair2500] },
                        { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair2500] },
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
                const computePrice = (token0: string, sqrtPriceX96: bigint) => token0.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(sqrtPriceX96) / (2 ** 96)) ** 2)
                const sqrtPriceX96_10000 = loadPoolState[1].result !== undefined ? (loadPoolState[1].result as any)[0] : BigInt(0)
                const tokenAamount_10000 = loadPoolState[2].result !== undefined ? loadPoolState[2].result as bigint : BigInt(0)
                const tokenBamount_10000 = loadPoolState[3].result !== undefined ? loadPoolState[3].result as bigint : BigInt(0)
                const currPrice_10000 = computePrice((loadPoolState[0].result as string) ?? '', sqrtPriceX96_10000)
                const tvl_10000 = currPrice_10000 !== 0 && currPrice_10000 !== Infinity ? Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000) + Number(formatEther(tokenBamount_10000)) : 0
                updatePancakeSwapTvlKey('tvl10000', tvl_10000)
                if (feeSelect === 10000) {
                    const mid = currPrice_10000 !== Infinity ? Number(currPrice_10000.toString()) : 0
                    updatePancakeSwapExchangeRate(10000, mid)
                    setFixedExchangeRate(mid.toString())
                    updatePancakeSwapToken0(loadPoolState[0].result as string ?? '')
                    setExchangeRate(currPrice_10000.toString())
                }
                const sqrtPriceX96_2500 = loadPoolState[5].result !== undefined ? (loadPoolState[5].result as any)[0] : BigInt(0)
                const tokenAamount_2500 = loadPoolState[6].result !== undefined ? loadPoolState[6].result as bigint : BigInt(0)
                const tokenBamount_2500 = loadPoolState[7].result !== undefined ? loadPoolState[7].result as bigint : BigInt(0)
                const currPrice_2500 = computePrice((loadPoolState[4].result as string) ?? '', sqrtPriceX96_2500)
                const tvl_2500 = currPrice_2500 !== 0 && currPrice_2500 !== Infinity ? Number(formatEther(tokenAamount_2500)) * (1 / currPrice_2500) + Number(formatEther(tokenBamount_2500)) : 0
                updatePancakeSwapTvlKey('tvl2500', tvl_2500)
                if (feeSelect === 2500) {
                    const mid = currPrice_2500 !== Infinity ? Number(currPrice_2500.toString()) : 0
                    updatePancakeSwapExchangeRate(2500, mid)
                    setFixedExchangeRate(mid.toString())
                    updatePancakeSwapToken0((loadPoolState[4].result as string) ?? '')
                    setExchangeRate(currPrice_2500.toString())
                }
                const sqrtPriceX96_500 = loadPoolState[9].result !== undefined ? (loadPoolState[9].result as any)[0] : BigInt(0)
                const tokenAamount_500 = loadPoolState[10].result !== undefined ? loadPoolState[10].result as bigint : BigInt(0)
                const tokenBamount_500 = loadPoolState[11].result !== undefined ? loadPoolState[11].result as bigint : BigInt(0)
                const currPrice_500 = computePrice((loadPoolState[8].result as string) ?? '', sqrtPriceX96_500)
                const tvl_500 = currPrice_500 !== 0 && currPrice_500 !== Infinity ? Number(formatEther(tokenAamount_500)) * (1 / currPrice_500) + Number(formatEther(tokenBamount_500)) : 0
                updatePancakeSwapTvlKey('tvl500', tvl_500)
                if (feeSelect === 500) {
                    const mid = currPrice_500 !== Infinity ? Number(currPrice_500.toString()) : 0
                    updatePancakeSwapExchangeRate(500, mid)
                    setFixedExchangeRate(mid.toString())
                    updatePancakeSwapToken0((loadPoolState[4].result as string) ?? '')
                }
                const sqrtPriceX96_100 = loadPoolState[9].result !== undefined ? (loadPoolState[9].result as any)[0] : BigInt(0)
                const tokenAamount_100 = loadPoolState[10].result !== undefined ? loadPoolState[10].result as bigint : BigInt(0)
                const tokenBamount_100 = loadPoolState[11].result !== undefined ? loadPoolState[11].result as bigint : BigInt(0)
                const currPrice_100 = computePrice((loadPoolState[8].result as string) ?? '', sqrtPriceX96_100)
                const tvl_100 = currPrice_100 !== 0 && currPrice_100 !== Infinity ? Number(formatEther(tokenAamount_100)) * (1 / currPrice_100) + Number(formatEther(tokenBamount_100)) : 0
                updatePancakeSwapTvlKey('tvl100', tvl_100)
                if (feeSelect === 100) {
                    const mid = currPrice_100 !== Infinity ? Number(currPrice_100.toString()) : 0
                    updatePancakeSwapExchangeRate(100, mid)
                    setFixedExchangeRate(mid.toString())
                    updatePancakeSwapToken0((loadPoolState[8].result as string) ?? '')
                }
                const ensureAltRoute = async (factoryFee: number) => {
                    const init: { contracts: any[] } = { contracts: [] }
                    tokens.forEach(t => {
                        init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, t.value, factoryFee] })
                        init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [t.value, tokenBvalue, factoryFee] })
                    })
                    const results = await readContracts(config, init)
                    for (let i = 0; i < results.length; i += 2) {
                        const first = results[i].result
                        const second = results[i + 1].result
                        if (first !== '0x0000000000000000000000000000000000000000' && second !== '0x0000000000000000000000000000000000000000') {
                            setAltRoute({ a: tokenAvalue as '0xstring', b: tokens[0].value, c: tokenBvalue as '0xstring' })
                            const altPoolState = await readContracts(config, {
                                contracts: [
                                    { ...v3PoolABI, address: first as '0xstring', functionName: 'token0' },
                                    { ...v3PoolABI, address: first as '0xstring', functionName: 'slot0' },
                                    { ...v3PoolABI, address: second as '0xstring', functionName: 'token0' },
                                    { ...v3PoolABI, address: second as '0xstring', functionName: 'slot0' },
                                ],
                            })
                            const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result as string : '' as '0xstring'
                            const alt0Price = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? 
                                (Number((altPoolState[1].result as any)?.[0] ?? BigInt(0)) / (2 ** 96)) ** 2 : 
                                1 / ((Number((altPoolState[1].result as any)?.[0] ?? BigInt(0)) / (2 ** 96)) ** 2)
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result as string : '' as '0xstring'
                            const alt1Price = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? 
                                (Number((altPoolState[3].result as any)?.[0] ?? BigInt(0)) / (2 ** 96)) ** 2 : 
                                1 / ((Number((altPoolState[3].result as any)?.[0] ?? BigInt(0)) / (2 ** 96)) ** 2)
                            updatePancakeSwapExchangeRate(factoryFee, Number((alt1Price / alt0Price).toString()))
                            break
                        }
                    }
                }
                if (feeSelect === 500 && tvl_500 < 1e-9) await ensureAltRoute(500)
                if (feeSelect === 100 && tvl_100 < 1e-9) await ensureAltRoute(100)
                const prev = prevTokensRef.current
                const currA = tokenA.value
                const currB = tokenB.value
                const tokensChanged = prev.a.toUpperCase() !== currA.toUpperCase() || prev.b.toUpperCase() !== currB.toUpperCase()
                prevTokensRef.current = { a: currA, b: currB }
                if (tokensChanged) {
                    setAmountA('')
                    setAmountB('')
                }
                setBestPathArray(null)
            } finally {
                setOnLoading(false)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, address, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams])
}
