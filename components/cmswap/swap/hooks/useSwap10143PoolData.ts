'use client';
import * as React from 'react'
import { formatEther, formatUnits } from 'viem'
import { getBalance, readContracts } from '@wagmi/core'
import { chains } from '@/lib/chains'
import { normalizeTokenPair } from './shared'
const { tokens: defaultTokens, v3FactoryContract, v3PoolABI, erc20ABI } = chains[10143]
type UIToken = { name: string; value: '0xstring'; logo: string; decimal: number }
type CMswapTVL = {
    tvl10000: string
    tvl3000: string
    tvl500: string
    tvl100: string
    exchangeRate: string
}
interface UseSwap10143PoolDataParams<TToken extends UIToken> {
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
    setCMswapTVL: React.Dispatch<React.SetStateAction<CMswapTVL>>
    setFixedExchangeRate: React.Dispatch<React.SetStateAction<string>>
    setAmountA: React.Dispatch<React.SetStateAction<string>>
    setAmountB: React.Dispatch<React.SetStateAction<string>>
}

export function useSwap10143PoolData<TToken extends UIToken>({config, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute, setCMswapTVL, setFixedExchangeRate, setAmountA, setAmountB}: UseSwap10143PoolDataParams<TToken>) {
    const prevTokensRef = React.useRef<{ a: string; b: string }>({ a: tokenA.value, b: tokenB.value })
    React.useEffect(() => {
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
            if (stateA[0].result && tokenA.name === 'Choose Token') {
                const existing = tokens.find(t => t.value === tokenA.value)
                setTokenA({name: stateA[0].result, value: tokenA.value, logo: existing?.logo ?? '../favicon.ico', decimal: existing?.decimal ?? 18} as TToken)
            }
            if (stateB[0].result && tokenB.name === 'Choose Token') {
                const existing = tokens.find(t => t.value === tokenB.value)
                setTokenB({name: stateB[0].result, value: tokenB.value, logo: existing?.logo ?? '../favicon.ico', decimal: existing?.decimal ?? 18} as TToken)
            }
            if (isTokenANative) {
                setTokenABalance(formatEther(nativeBal.value))
            } else if (stateA[1].result !== undefined) {
                setTokenABalance(formatUnits(stateA[1].result, tokenA.decimal))
            }
            if (isTokenBNative) {
                setTokenBBalance(formatEther(nativeBal.value))
            } else if (stateB[1].result !== undefined) {
                setTokenBBalance(formatUnits(stateB[1].result, tokenB.decimal))
            }
            const pair10000 = stateB[2].result !== undefined ? stateB[2].result as '0xstring' : '' as '0xstring'
            const pair3000 = stateB[3].result !== undefined ? stateB[3].result as '0xstring' : '' as '0xstring'
            const pair500 = stateB[4].result !== undefined ? stateB[4].result as '0xstring' : '' as '0xstring'
            const pair100 = stateB[5].result !== undefined ? stateB[5].result as '0xstring' : '' as '0xstring'
            const updateCMswapTvlKey = (key: keyof CMswapTVL, value: number) => {
                setCMswapTVL(prev => ({ ...prev, [key]: value >= 1e-9 ? value.toString() : '0' }))
            }
            const updateExchangeRateCMswapTVL = (feeAmount: number, exchangeRate: number) => {
                setCMswapTVL(prev => ({
                    ...prev,
                    exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prev.exchangeRate,
                }))
            }
            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                if (isNativeWrappedPair) {
                    setExchangeRate('1')
                    setWrappedRoute(true)
                } else {
                    setWrappedRoute(false)
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
                    const computePrice = (token0: string, sqrtPriceX96: bigint) => token0.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(sqrtPriceX96) / (2 ** 96)) ** 2)
                    const token0_10000 = poolState[0].result ?? ''
                    const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                    const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                    const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)
                    const currPrice_10000 = computePrice(token0_10000, sqrtPriceX96_10000)
                    const tvl_10000 = currPrice_10000 !== 0 && currPrice_10000 !== Infinity ? Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000) + Number(formatEther(tokenBamount_10000)) : 0
                    updateCMswapTvlKey('tvl10000', tvl_10000)
                    if (feeSelect === 10000) {
                        const mid = currPrice_10000 !== Infinity ? Number(currPrice_10000.toString()) : 0
                        updateExchangeRateCMswapTVL(10000, mid)
                        setFixedExchangeRate(mid.toString())
                        setExchangeRate(currPrice_10000.toString())
                    }
                    const token0_3000 = poolState[4].result ?? ''
                    const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                    const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                    const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                    const currPrice_3000 = computePrice(token0_3000, sqrtPriceX96_3000)
                    const tvl_3000 = currPrice_3000 !== 0 && currPrice_3000 !== Infinity ? Number(formatEther(tokenAamount_3000)) * (1 / currPrice_3000) + Number(formatEther(tokenBamount_3000)) : 0
                    updateCMswapTvlKey('tvl3000', tvl_3000)
                    if (feeSelect === 3000) {
                        const mid = currPrice_3000 !== Infinity ? Number(currPrice_3000.toString()) : 0
                        updateExchangeRateCMswapTVL(3000, mid)
                        setFixedExchangeRate(mid.toString())
                    }
                    const token0_500 = poolState[8].result ?? ''
                    const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                    const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                    const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                    const currPrice_500 = computePrice(token0_500, sqrtPriceX96_500)
                    const tvl_500 = currPrice_500 !== 0 && currPrice_500 !== Infinity ? Number(formatEther(tokenAamount_500)) * (1 / currPrice_500) + Number(formatEther(tokenBamount_500)) : 0
                    updateCMswapTvlKey('tvl500', tvl_500)
                    if (feeSelect === 500) {
                        const mid = currPrice_500 !== Infinity ? Number(currPrice_500.toString()) : 0
                        updateExchangeRateCMswapTVL(500, mid)
                        setFixedExchangeRate(mid.toString())
                    }
                    const token0_100 = poolState[12].result ?? ''
                    const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                    const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                    const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                    const currPrice_100 = computePrice(token0_100, sqrtPriceX96_100)
                    const tvl_100 = currPrice_100 !== 0 && currPrice_100 !== Infinity ? Number(formatEther(tokenAamount_100)) * (1 / currPrice_100) + Number(formatEther(tokenBamount_100)) : 0
                    updateCMswapTvlKey('tvl100', tvl_100)
                    if (feeSelect === 100) {
                        const mid = currPrice_100 !== Infinity ? Number(currPrice_100.toString()) : 0
                        updateExchangeRateCMswapTVL(100, mid)
                        setFixedExchangeRate(mid.toString())
                    }
                    if (feeSelect === 3000 && tvl_3000 < 1e-9) {
                        const init: { contracts: any[] } = { contracts: [] }
                        tokens.forEach(t => {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, t.value, 3000] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [t.value, tokenBvalue, 3000] })
                        })
                        const findAltRoute = await readContracts(config, init)
                        for (let i = 0; i < findAltRoute.length; i += 2) {
                            const first = findAltRoute[i].result
                            const second = findAltRoute[i + 1].result
                            if (first !== '0x0000000000000000000000000000000000000000' && second !== '0x0000000000000000000000000000000000000000') {
                                setAltRoute({ a: tokenAvalue as '0xstring', b: tokens[1].value, c: tokenBvalue as '0xstring' })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: first as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: first as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: second as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: second as '0xstring', functionName: 'slot0' },
                                    ],
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : '' as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2)
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : '' as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : 1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2)
                                updateExchangeRateCMswapTVL(3000, Number((altPrice1 / altPrice0).toString()))
                                break
                            }
                        }
                    }
                }
            }
            const prev = prevTokensRef.current
            const currA = tokenA.value
            const currB = tokenB.value
            const tokensChanged = prev.a.toUpperCase() !== currA.toUpperCase() || prev.b.toUpperCase() !== currB.toUpperCase()
            prevTokensRef.current = { a: currA, b: currB }
            if (tokensChanged) {
                setAmountA('')
                setAmountB('')
            }
        }
        if (!hasInitializedFromParams) return
        fetchPoolData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, address, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams])
}
