"use client"
import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, formatUnits, parseUnits } from 'viem'
import { ArrowDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from 'use-debounce'
import { config } from '@/config/reown'
import { useSwapTokenSelection } from '@/components/cmswap/swap/useSwapTokenSelection'
import { useSwapQuote } from '@/components/cmswap/swap/useSwapQuote'
import { encodePath } from '@/components/cmswap/swap/path'
import { ensureTokenAllowance, executeRouterSwap, wrapNativeToken, unwrapWrappedToken } from '@/components/cmswap/swap/swapActions'
import { computePriceImpact, getDecimals } from '@/components/cmswap/swap/utils'
import { selectBestRoute } from '@/components/cmswap/swap/quoteComparison'
import type { CmswapFee } from '@/components/cmswap/swap/quoteComparison'
import { SwapTokenPanel } from '@/components/cmswap/swap/SwapTokenPanel'
import { useSwapChain } from '@/components/cmswap/useSwapChain'
import { LiquidityVariant } from '@/components/cmswap/liquidityVariant'
import { selectSwapPoolDataHook } from '@/components/cmswap/swap/hooks/selectSwapPoolData'

type UIToken = { name: string; value: '0xstring'; logo: string; decimal: number }

type RouteOption = {
  id: string
  pool: string
  label: string
  tvl: number
  tvlUnit: string
  fee?: number
  feeLabel?: string
  description?: string
  amountOut?: number
  priceQuote?: number
}

type RouteQuoteMetrics = {
  amountOut?: number
  priceQuote?: number
}

type CmswapFeeTier = { fee: 100 | 500 | 3000 | 10000; label: string; tvlKey: 'tvl100' | 'tvl500' | 'tvl3000' | 'tvl10000' }

const CMSWAP_FEE_TIERS: readonly CmswapFeeTier[] = [
  { fee: 100, label: '0.01%', tvlKey: 'tvl100' },
  { fee: 500, label: '0.05%', tvlKey: 'tvl500' },
  { fee: 3000, label: '0.3%', tvlKey: 'tvl3000' },
  { fee: 10000, label: '1%', tvlKey: 'tvl10000' },
] as const

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  CMswap: 'Concentrated liquidity pools',
  DiamonSwap: 'Legacy standard pool',
  UdonSwap: 'Legacy standard pool',
  ponder: 'Legacy standard pool',
  GameSwap: 'Simple xy = k pool',
  JibSwap: 'Legacy standard pool',
}

export default function Swap({ setIsLoading, setErrMsg }: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>
}) {
  const DEFAULT_SAMPLE_AMOUNT = "500"
  const { address } = useAccount()
  const { variant, tokens: chainTokens, ROUTER02, qouterV2Contract, router02Contract, erc20ABI, kap20ABI, wrappedNative, unwarppedNative, CMswapUniSmartRouteContractV2, UniswapPairv2PoolABI, CMswapUniSmartRoute, bkcUnwapped, CMswapPoolDualRouterContract, CMswapUniSmartRouteContract } = useSwapChain()
  const tokens = chainTokens as readonly UIToken[]

  const [txupdate, setTxupdate] = React.useState("")
  const [exchangeRate, setExchangeRate] = React.useState("")
  const [fixedExchangeRate, setFixedExchangeRate] = React.useState("")
  const [altRoute, setAltRoute] = React.useState<{ a: '0xstring', b: '0xstring', c: '0xstring' }>()
  const [bestPathArray, setBestPathArray] = React.useState<string[] | null>(null)
  const [wrappedRoute, setWrappedRoute] = React.useState(false)
  const [newPrice, setNewPrice] = React.useState("")
  const [bestPool, setBestPool] = React.useState("")
  const [poolSelect, setPoolSelect] = React.useState("")
  const [onLoading, setOnLoading] = React.useState(false) // used by 8899
  // Controls whether we auto-select the best CMswap fee tier
  const [autoCmswapFee, setAutoCmswapFee] = React.useState(true)
  const [routeQuoteMap, setRouteQuoteMap] = React.useState<Record<string, RouteQuoteMetrics>>({})

  // TVL buckets per variant
  const [CMswapTVL, setCMswapTVL] = React.useState<any>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "", t0: '' as '0xstring' })
  const [DMswapTVL, setDMswapTVL] = React.useState<any>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" }) // 96
  const [UdonTVL, setUdonTVL] = React.useState<any>({ tvl10000: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" }) // 96
  const [ponderTVL, setPonderTVL] = React.useState<any>({ tvl10000: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" }) // 96
  const [GameSwapTvl, setGameSwapTvl] = React.useState<any>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", t0: '' as '0xstring' }) // 8899
  const [JibSwapTvl, setJibSwapTvl] = React.useState<any>({ tvl10000: "", exchangeRate: "", t0: '' as '0xstring' }) // 8899
  const [reserveUdonA, setReserveUdonA] = React.useState(BigInt(0)) // 96
  const [reserveUdonB, setReserveUdonB] = React.useState(BigInt(0)) // 96

  const { tokenA, tokenB, setTokenA, setTokenB, hasInitializedFromParams, updateURLWithTokens, switchTokens } = useSwapTokenSelection(tokens, { defaultTokenAIndex: 0, defaultTokenBIndex: 2, referralAddress: address })
  const { resolveTokenAddress, quoteExactInputSingle, quoteExactInput } = useSwapQuote({ config, contract: qouterV2Contract, tokens })

  const [tokenABalance, setTokenABalance] = React.useState("")
  const [amountA, setAmountA] = React.useState("")
  const [tokenBBalance, setTokenBBalance] = React.useState("")
  const [amountB, setAmountB] = React.useState("")
  const [feeSelect, setFeeSelect] = React.useState(10000)
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [swapDirection, setSwapDirection] = React.useState(true)

  const tokenABalanceLabel = tokenA.name !== 'Choose Token' ? `${Number(tokenABalance).toFixed(4)} ${tokenA.name}` : '0.0000'
  const tokenBBalanceLabel = tokenB.name !== 'Choose Token' ? `${Number(tokenBBalance).toFixed(4)} ${tokenB.name}` : '0.0000'

  const tokenNameByAddress = React.useCallback((value: '0xstring') => {
    const token = tokens.find(t => t.value === value)
    return token?.name ?? ''
  }, [tokens])

  const usePoolData = React.useMemo(() => selectSwapPoolDataHook(variant), [variant])
  const poolParams: any = React.useMemo(() => {
    const base: any = { config, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute }
    if (variant === LiquidityVariant.BKC) return { ...base, setCMswapTVL, setDMswapTVL, setUdonTVL, setPonderTVL, setReserveUdonA, setReserveUdonB, setAmountA, setAmountB }
    if (variant === LiquidityVariant.JBC) return { ...base, setCMswapTVL, setGameSwapTvl, setJibSwapTvl, setBestPathArray, setFixedExchangeRate, setOnLoading, setAmountA, setAmountB }
    if (variant === LiquidityVariant.BKC_TESTNET) return { ...base, setCMswapTVL, setAmountA, setAmountB, setNewPrice }
    if (variant === LiquidityVariant.MONAD_TESTNET) return { ...base, setCMswapTVL, setFixedExchangeRate, setAmountA, setAmountB }
    return base
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute])
  usePoolData(poolParams)

  const getQuote = useDebouncedCallback(async (_amount: string) => {
    // Determine whether this call is for the user's current input or a background sample
    const isSampleCall = _amount !== amountA
    const hasUserAmount = Number(amountA) > 0
    const shouldUpdateUI = !isSampleCall && hasUserAmount
    // Use 100k sample amount when user input is empty or zero
    const amountForQuote = Number(_amount) > 0 ? _amount : DEFAULT_SAMPLE_AMOUNT
    const userAmountIn = Number(_amount)
    const quoteAmountIn = Number(amountForQuote)
    const nextRouteQuoteMap: Record<string, RouteQuoteMetrics> = {}
    const recordQuote = (key: string, amountOut?: number) => {
      if (!nextRouteQuoteMap[key]) nextRouteQuoteMap[key] = {}
      if (amountOut !== undefined && Number.isFinite(amountOut)) {
        nextRouteQuoteMap[key].amountOut = amountOut
        if (quoteAmountIn > 0) nextRouteQuoteMap[key].priceQuote = amountOut / quoteAmountIn
      } else if (!(key in nextRouteQuoteMap)) {
        nextRouteQuoteMap[key] = {}
      }
    }
    if (shouldUpdateUI) setAltRoute(undefined)
    let CMswapRate: number | undefined = undefined
    let bestCmswapFee: 100 | 500 | 3000 | 10000 | undefined = undefined
    let DiamonSwapRate: number | undefined = undefined
    let UdonswapRate: number | undefined = undefined
    let ponderRate: number | undefined = undefined
    let GameswapRate: number | undefined = undefined
    let JibswapRate: number | undefined = undefined
    const tokenAvalue = resolveTokenAddress(tokenA)
    const tokenBvalue = resolveTokenAddress(tokenB)
    if (wrappedRoute) {
      if (shouldUpdateUI) setAmountB(userAmountIn.toString())
    } else {
      // CMswap quote (common)
      try {
        if (Number(amountForQuote) !== 0) {
          // Explore all CMswap fee tiers and pick the best output
          let bestOut = 0
          if (altRoute === undefined) {
            for (const meta of CMSWAP_FEE_TIERS) {
              const quoteOutput = await quoteExactInputSingle({ tokenIn: tokenA, tokenOut: tokenB, amount: amountForQuote, fee: meta.fee, parseAmount: (value: string) => parseUnits(value, getDecimals(tokenA)), suppressErrors: true })
              if (quoteOutput) {
                const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
                recordQuote(`CMswap-${meta.fee}`, out)
                if (out > bestOut) { bestOut = out; bestCmswapFee = meta.fee }
              } else {
                recordQuote(`CMswap-${meta.fee}`)
              }
            }
          } else {
            for (const meta of CMSWAP_FEE_TIERS) {
              const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [meta.fee, meta.fee])
              const quoteOutput = await quoteExactInput({ path: route as `0x${string}`, tokenIn: tokenA, amount: amountForQuote, parseAmount: (value: string) => parseUnits(value, getDecimals(tokenA)), suppressErrors: true })
              if (quoteOutput) {
                const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
                recordQuote(`CMswap-${meta.fee}`, out)
                if (out > bestOut) { bestOut = out; bestCmswapFee = meta.fee }
              } else {
                recordQuote(`CMswap-${meta.fee}`)
              }
            }
          }
          if (bestOut > 0) {
            CMswapRate = bestOut
            // If user has entered an amount and CMswap is the active pool, update UI to reflect best fee
            if (shouldUpdateUI && poolSelect === "CMswap" && autoCmswapFee) {
              setAmountB(bestOut.toString())
              const execPriceAB = bestOut > 0 ? userAmountIn / bestOut : 0
              setNewPrice(execPriceAB.toFixed(6))
              if (bestCmswapFee !== undefined) setFeeSelect(bestCmswapFee)
            }
          }
        } else { if (shouldUpdateUI) setAmountB("") }
      } catch {}

      // Variant-specific quotes
      if (variant === LiquidityVariant.BKC) {
        // DiamonSwap
        try {
          if (Number(amountForQuote) !== 0) {
            const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(0), tokenAvalue, tokenBvalue], }] })
            const DiamondPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
            const getBestPrice = await readContracts(config, { contracts: [ { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(0), tokenAvalue, tokenBvalue, parseUnits(amountForQuote, getDecimals(tokenA))] }, { ...UniswapPairv2PoolABI, address: DiamondPair, functionName: 'token0' } ] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            if (shouldUpdateUI && poolSelect === "DiamonSwap") {
              bestPathArrayLocal.length > 2
                ? setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' })
                : setAltRoute(undefined)
            }
            if (shouldUpdateUI && poolSelect === "DiamonSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
              const out = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
              const price = tokenAvalue.toUpperCase() === tokens[0].value.toUpperCase() ? Number(_amount) / out : out / Number(_amount)
              setNewPrice((1 / price).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            DiamonSwapRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
            recordQuote('DiamonSwap', DiamonSwapRate)
          }
        } catch {}
        // UdonSwap
        try {
          if (Number(amountForQuote) !== 0) {
            const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(1), tokenAvalue, tokenBvalue], }] })
            const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
            const getBestPrice = await readContracts(config, { contracts: [ { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(1), tokenAvalue, tokenBvalue, parseUnits(amountForQuote, getDecimals(tokenA))] }, { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' } ] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            if (shouldUpdateUI && bestPathArrayLocal.length > 2 && poolSelect === "UdonSwap") setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' })
            if (shouldUpdateUI && poolSelect === "UdonSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
              setBestPathArray(bestPathArrayLocal)
              const newReserveA = Number(formatEther(reserveUdonA)) + Number(_amount)
              const newReserveB = Number(formatEther(reserveUdonB)) - Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
              const newprice = newReserveA / newReserveB
              setNewPrice((newprice).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            UdonswapRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
            recordQuote('UdonSwap', UdonswapRate)
          }
        } catch {}
        // Ponder
        try {
          if (Number(amountForQuote) !== 0) {
            const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(2), tokenAvalue, tokenBvalue], }] })
            const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
            const getBestPrice = await readContracts(config, { contracts: [ { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(2), tokenAvalue, tokenBvalue, parseUnits(amountForQuote, getDecimals(tokenA))] }, { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' } ] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            if (shouldUpdateUI && bestPathArrayLocal.length > 2 && poolSelect === "ponder") setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' })
            if (shouldUpdateUI && poolSelect === "ponder" && Number(_amount) > 0 && bestAmountOut > 0) {
              setBestPathArray(bestPathArrayLocal)
              const price = ponderTVL.isReverted ? userAmountIn / Number(formatUnits(bestAmountOut, getDecimals(tokenB))) : Number(formatUnits(bestAmountOut, getDecimals(tokenB))) / userAmountIn
              setNewPrice((price).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            ponderRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
            recordQuote('ponder', ponderRate)
          }
        } catch {}
      } else if (variant === LiquidityVariant.JBC) {
        // GameSwap
        try {
          if (Number(amountForQuote) !== 0) {
            let poolAddr: '0xstring' | undefined
            const tokenAAddr = tokenAvalue.toUpperCase()
            const tokenBAddr = tokenBvalue.toUpperCase()
            if ((tokenAAddr === tokens[1].value.toUpperCase() && tokenBAddr === tokens[3].value.toUpperCase()) || (tokenBAddr === tokens[1].value.toUpperCase() && tokenAAddr === tokens[3].value.toUpperCase())) {
              poolAddr = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring'
            } else if ((tokenAAddr === tokens[1].value.toUpperCase() && tokenBAddr === tokens[2].value.toUpperCase()) || (tokenBAddr === tokens[1].value.toUpperCase() && tokenAAddr === tokens[2].value.toUpperCase())) {
              poolAddr = '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring'
            }
            let useFunction: | 'getExpectedTokenFromJBC' | 'getExpectedJBCFromToken' | undefined
            if (tokenAAddr === tokens[1].value.toUpperCase()) useFunction = 'getExpectedTokenFromJBC'; else if (tokenAAddr === tokens[2].value.toUpperCase() || tokenAAddr === tokens[3].value.toUpperCase()) useFunction = 'getExpectedJBCFromToken'
            if (useFunction && poolAddr) {
              const quoteOutput = await readContracts(config, { contracts: [{ ...CMswapPoolDualRouterContract, functionName: useFunction, args: [poolAddr, parseUnits(amountForQuote, getDecimals(tokenA))] }] })
              const result: any = quoteOutput[0].result !== undefined ? quoteOutput[0].result : BigInt(0)
              const amountBout = Number(formatUnits(result, getDecimals(tokenB)))
              GameswapRate = amountBout
              if (shouldUpdateUI && poolSelect === "GameSwap" && userAmountIn > 0 && amountBout > 0) {
                setAmountB(formatUnits(result, getDecimals(tokenB)))
                const price = tokenAAddr === tokens[1].value.toUpperCase() ? amountBout / userAmountIn : userAmountIn / amountBout
                setNewPrice(price.toFixed(6))
              }
              recordQuote('GameSwap', amountBout)
            }
          }
        } catch {}
        // JibSwap via SmartRoute
        try {
          if (Number(amountForQuote) !== 0) {
            let TokenA = tokenAvalue === ("0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring') ? ("0x99999999990FC47611b74827486218f3398A4abD" as '0xstring') : tokenAvalue
            let TokenB = tokenBvalue === ("0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring') ? ("0x99999999990FC47611b74827486218f3398A4abD" as '0xstring') : tokenBvalue
            const getBestPrice = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContract, functionName: 'findBestPathAndAmountOut', args: [TokenA, TokenB, parseUnits(amountForQuote, getDecimals(tokenA))] }] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            if (shouldUpdateUI && poolSelect === "JibSwap") {
              bestPathArrayLocal.length > 2
                ? setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' })
                : setAltRoute(undefined)
              setBestPathArray(bestPathArrayLocal)
            }
            if (shouldUpdateUI && poolSelect === "JibSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
              const outNum = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
              const price = tokenAvalue.toUpperCase() === tokens[0].value.toUpperCase() ? Number(_amount) / outNum : outNum / Number(_amount)
              setNewPrice((1 / price).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            JibswapRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
            recordQuote('JibSwap', JibswapRate)
          }
        } catch {}
      }
    }
    setRouteQuoteMap(nextRouteQuoteMap)
    return { CMswapRate, DiamonSwapRate, UdonswapRate, ponderRate, GameswapRate, JibswapRate, CMswapBestFee: bestCmswapFee }
  }, 700)

  // Swap actions
  const wrap = async () => {
    setIsLoading(true)
    try {
      if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
        const hash = await wrapNativeToken({ config, wrappedTokenAddress: tokens[1].value, amount: parseUnits(amountA || '0', getDecimals(tokenA)) })
        setTxupdate(hash)
      } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
        if (variant === LiquidityVariant.BKC) {
          await ensureTokenAllowance({ config, token: { ...erc20ABI, address: tokenA.value }, owner: address as `0x${string}`, spender: bkcUnwapped as `0x${string}`, requiredAmount: parseUnits(amountA || '0', getDecimals(tokenA)), approveArgs: [bkcUnwapped as `0x${string}`, parseUnits(amountA || '0', getDecimals(tokenA))] })
        }
        const hash = await unwrapWrappedToken({ config, contract: (unwarppedNative || wrappedNative) as any, amount: parseUnits(amountA || '0', getDecimals(tokenA)) })
        setTxupdate(hash)
      }
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  const CMswap = async () => {
    setIsLoading(true)
    try {
      let tokenAvalue = tokenA.value === tokens[0].value ? tokens[1].value : tokenA.value
      let tokenBvalue = tokenB.value === tokens[0].value ? tokens[1].value : tokenB.value
      if (tokenA.value.toUpperCase() !== tokens[0].value.toUpperCase()) {
        const isKap20 = !!kap20ABI && (tokenA.value.toUpperCase() === (tokens[2]?.value?.toUpperCase?.() || ''))
        await ensureTokenAllowance({ config, token: { ...(isKap20 ? (kap20ABI as any) : erc20ABI), address: tokenA.value }, owner: address as `0x${string}`, spender: ROUTER02 as `0x${string}`, requiredAmount: parseUnits(amountA || '0', getDecimals(tokenA)), allowanceFunctionName: isKap20 ? 'allowances' : 'allowance' })
      }
      const parsedAmountIn = parseUnits(amountA || '0', getDecimals(tokenA))
      const amountOutMinimum = parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100)
      const path = altRoute ? encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect]) : undefined
      const { hash: h, amountOut: r } = await executeRouterSwap({ config, router: router02Contract, tokenIn: tokenAvalue as `0x${string}`, tokenOut: tokenBvalue as `0x${string}`, recipient: address as `0x${string}`, amountIn: parsedAmountIn, amountOutMinimum, fee: feeSelect, path, value: tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ? parsedAmountIn : BigInt(0) })
      setTxupdate(h)
      if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
        if (variant === LiquidityVariant.BKC) {
          await ensureTokenAllowance({ config, token: { ...erc20ABI, address: tokens[1].value }, owner: address as `0x${string}`, spender: bkcUnwapped as `0x${string}`, requiredAmount: r, approveArgs: [bkcUnwapped as `0x${string}`, r] })
        }
        let { request } = await simulateContract(config, { ...(wrappedNative || unwarppedNative) as any, functionName: 'withdraw', args: [r as bigint] })
        let h2 = await writeContract(config, request)
        await waitForTransactionReceipt(config, { hash: h2 })
      }
    } catch (e) { setErrMsg(e as WriteContractErrorType); console.error(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  const DMswap = async () => {
    if (variant !== LiquidityVariant.BKC) return
    setIsLoading(true)
    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10
      let h: `0x${string}` | undefined
      if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
        const { request } = await simulateContract(config, { ...CMswapUniSmartRouteContractV2, functionName: 'swapExactETHForTokensWithFee', value: parseUnits(amountA || '0', getDecimals(tokenA)), args: [BigInt(0), parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error('Address required') })(), BigInt(deadline)] })
        h = await writeContract(config, request)
      } else {
        const route = bestPathArray as readonly `0x${string}`[]
        const { request } = await simulateContract(config, { ...CMswapUniSmartRouteContractV2, functionName: 'swapExactTokensForTokensWithFee', args: [BigInt(0), parseUnits(amountA || '0', getDecimals(tokenA)), parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100), route, address as `0x${string}`, BigInt(deadline)] })
        h = await writeContract(config, request)
        await waitForTransactionReceipt(config, { hash: h })
      }
      h && setTxupdate(h)
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  const Udonswap = async () => {
    if (variant !== LiquidityVariant.BKC) return
    setIsLoading(true)
    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10
      let h: `0x${string}` | undefined
      if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
        const { request } = await simulateContract(config, { ...CMswapUniSmartRouteContractV2, functionName: 'swapExactETHForTokensWithFee', value: parseUnits(amountA || '0', getDecimals(tokenA)), args: [BigInt(1), parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error('Address required') })(), BigInt(deadline)] })
        h = await writeContract(config, request)
      } else {
        const allowanceA = tokenA.value.toUpperCase() === tokens[2].value.toUpperCase() ? await readContract(config, { ...kap20ABI as any, address: tokenA.value as '0xstring', functionName: 'allowances', args: [address as '0xstring', CMswapUniSmartRoute] }) : await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapUniSmartRoute] })
        if ((allowanceA as bigint) < parseUnits(amountA || '0', getDecimals(tokenA))) {
          const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapUniSmartRoute, parseUnits(amountA || '0', getDecimals(tokenA))] })
          const h0 = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h0 })
        }
        if (altRoute === undefined || bestPathArray !== undefined) {
          const { request } = await simulateContract(config, { ...CMswapUniSmartRouteContractV2, functionName: 'swapExactTokensForTokensWithFee', args: [BigInt(1), parseUnits(amountA || '0', getDecimals(tokenA)), parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error('Address required') })(), BigInt(deadline)] })
          h = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h })
        }
      }
      h && setTxupdate(h)
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  const ponderSwap = async () => {
    if (variant !== LiquidityVariant.BKC) return
    setIsLoading(true)
    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10
      let h: `0x${string}` | undefined
      if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
        const { request } = await simulateContract(config, { ...CMswapUniSmartRouteContractV2, functionName: 'swapExactETHForTokensWithFee', value: parseUnits(amountA || '0', getDecimals(tokenA)), args: [BigInt(2), parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error('Address required') })(), BigInt(deadline)] })
        h = await writeContract(config, request)
      } else {
        const allowanceA = tokenA.value.toUpperCase() === tokens[2].value.toUpperCase() ? await readContract(config, { ...kap20ABI as any, address: tokenA.value as '0xstring', functionName: 'allowances', args: [address as '0xstring', CMswapUniSmartRoute] }) : await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapUniSmartRoute] })
        if ((allowanceA as bigint) < parseUnits(amountA || '0', getDecimals(tokenA))) {
          const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapUniSmartRoute, parseUnits(amountA || '0', getDecimals(tokenA))] })
          const h0 = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h0 })
        }
        if (altRoute === undefined || bestPathArray !== undefined) {
          const { request } = await simulateContract(config, { ...CMswapUniSmartRouteContractV2, functionName: 'swapExactTokensForTokensWithFee', args: [BigInt(2), parseUnits(amountA || '0', getDecimals(tokenA)), parseUnits(amountB || '0', getDecimals(tokenB)) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error('Address required') })(), BigInt(deadline)] })
          h = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h })
        }
      }
      h && setTxupdate(h)
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  const gameswap = async () => {
    if (variant !== LiquidityVariant.JBC) return
    setIsLoading(true)
    try {
      const tokenAAddr = tokenA.value.toUpperCase()
      const tokenBAddr = tokenB.value.toUpperCase()
      const parsedAmountA = parseUnits(amountA || '0', getDecimals(tokenA))
      const slippagePercent = 5
      if (tokenAAddr !== tokens[1].value.toUpperCase()) {
        const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapPoolDualRouterContract.address as '0xstring'] })
        if ((allowanceA as bigint) < parsedAmountA) {
          const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapPoolDualRouterContract.address as '0xstring', parsedAmountA] })
          const tx = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: tx })
        }
      }
      let poolAddr: '0xstring' | undefined
      if ((tokenAAddr === tokens[1].value.toUpperCase() && tokenBAddr === tokens[3].value.toUpperCase()) || (tokenBAddr === tokens[1].value.toUpperCase() && tokenAAddr === tokens[3].value.toUpperCase())) {
        poolAddr = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring'
      } else if ((tokenAAddr === tokens[1].value.toUpperCase() && tokenBAddr === tokens[2].value.toUpperCase()) || (tokenBAddr === tokens[1].value.toUpperCase() && tokenAAddr === tokens[2].value.toUpperCase())) {
        poolAddr = '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring'
      }
      let useFunction: | 'swapJC' | 'swapJU' | 'swapCMJtoJBC' | 'swapJUSDTtoJBC' | undefined
      if (poolAddr === '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring') {
        if (tokenAAddr === tokens[1].value.toUpperCase()) useFunction = 'swapJC'; else if (tokenAAddr === tokens[3].value.toUpperCase()) useFunction = 'swapCMJtoJBC'
      } else if (poolAddr === '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring') {
        if (tokenAAddr === tokens[1].value.toUpperCase()) useFunction = 'swapJU'; else if (tokenAAddr === tokens[2].value.toUpperCase()) useFunction = 'swapJUSDTtoJBC'
      }
      if (!useFunction || !poolAddr) throw new Error('Unsupported token combination')
      const expectedOut = (useFunction === 'swapCMJtoJBC' || useFunction === 'swapJUSDTtoJBC') ? await readContract(config, { ...CMswapPoolDualRouterContract, functionName: 'getExpectedJBCFromToken', args: [poolAddr, parsedAmountA] }) as bigint : await readContract(config, { ...CMswapPoolDualRouterContract, functionName: 'getExpectedTokenFromJBC', args: [poolAddr, parsedAmountA] }) as bigint
      const minOut = expectedOut * BigInt(100 - slippagePercent) / BigInt(100)
      if (useFunction === 'swapJC' || useFunction === 'swapJU') {
        const { request } = await simulateContract(config, { ...CMswapPoolDualRouterContract, functionName: useFunction, args: [poolAddr, parsedAmountA, minOut] })
        const tx = await writeContract(config, request)
        await waitForTransactionReceipt(config, { hash: tx })
      } else {
        const { request } = await simulateContract(config, { ...CMswapPoolDualRouterContract, functionName: useFunction, args: [poolAddr, parsedAmountA, minOut] })
        const tx = await writeContract(config, request)
        await waitForTransactionReceipt(config, { hash: tx })
      }
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  const jibswap = async () => {
    if (variant !== LiquidityVariant.JBC) return
    // Execution via CMswap router already covered in CMswap; JibSwap route is through findBestPath and normal CMswap router call, so CMswap handles it using path
    await CMswap()
  }

  const handleSwap = async () => {
    if (wrappedRoute) return wrap()
    if (poolSelect === "CMswap") return CMswap()
    if (variant === LiquidityVariant.BKC) {
      if (poolSelect === "DiamonSwap") return DMswap()
      if (poolSelect === "UdonSwap") return Udonswap()
      if (poolSelect === "ponder") return ponderSwap()
    } else if (variant === LiquidityVariant.JBC) {
      if (poolSelect === "GameSwap") return gameswap()
      if (poolSelect === "JibSwap") return jibswap()
    }
  }

  // Effects to update displayed rates and pick best pool
  React.useEffect(() => {
    const updateRate = async () => {
      if (variant === LiquidityVariant.BKC) {
        const map: any = { CMswap: CMswapTVL, DiamonSwap: DMswapTVL, UdonSwap: UdonTVL, ponder: ponderTVL }
        if (poolSelect in map) { setExchangeRate(map[poolSelect].exchangeRate); setFixedExchangeRate(map[poolSelect].FixedExchangeRate) } else { setExchangeRate('0') }
      } else if (variant === LiquidityVariant.JBC) {
        const map: any = { CMswap: CMswapTVL, GameSwap: GameSwapTvl, JibSwap: JibSwapTvl }
        if (poolSelect in map) { setExchangeRate(map[poolSelect].exchangeRate); setFixedExchangeRate(map[poolSelect].FixedExchangeRate || '') } else { setExchangeRate('0') }
      } else {
        if (poolSelect === 'CMswap') setExchangeRate(CMswapTVL.exchangeRate)
      }
    }
    if (!wrappedRoute) updateRate()
  }, [amountA, poolSelect, CMswapTVL, DMswapTVL, UdonTVL, ponderTVL, GameSwapTvl, JibSwapTvl, txupdate, variant, wrappedRoute])

  React.useEffect(() => {
    const fetchQuoteAndSetPool = async () => {
      try {
        // When the input is empty, use a 100k token sample to decide the default best route
        const quote = await getQuote(amountA || DEFAULT_SAMPLE_AMOUNT)
        if (variant === LiquidityVariant.BKC) {
          const quotes = {
            CMswap: Number(quote?.CMswapRate),
            DiamonSwap: Number(quote?.DiamonSwapRate),
            UdonSwap: Number(quote?.UdonswapRate),
            ponder: Number(quote?.ponderRate),
          }
          const res = selectBestRoute({ variant, quotes, currentPool: (poolSelect || undefined) as any, cmSwapBestFee: quote?.CMswapBestFee })
          if (!res.bestPool) return
          setBestPool(res.bestPool)
          if (poolSelect === "") {
            setPoolSelect(res.bestPool)
            if (res.bestPool === 'CMswap' && res.cmSwapFee && autoCmswapFee) setFeeSelect(res.cmSwapFee)
          }
        } else if (variant === LiquidityVariant.JBC) {
          if (onLoading) return
          const quotes = {
            CMswap: Number(quote?.CMswapRate),
            GameSwap: Number(quote?.GameswapRate),
            JibSwap: Number(quote?.JibswapRate),
          }
          const res = selectBestRoute({ variant, quotes, currentPool: (poolSelect || undefined) as any, cmSwapBestFee: quote?.CMswapBestFee })
          if (!res.bestPool) return
          setBestPool(res.bestPool)
          if (poolSelect === "") {
            setPoolSelect(res.bestPool)
            if (res.bestPool === 'CMswap' && res.cmSwapFee && autoCmswapFee) setFeeSelect(res.cmSwapFee)
          }
        } else {
          const quotes = { CMswap: Number(quote?.CMswapRate) }
          const res = selectBestRoute({ variant, quotes, currentPool: (poolSelect || undefined) as any, cmSwapBestFee: quote?.CMswapBestFee })
          if (!res.bestPool) return
          setBestPool(res.bestPool)
          if (poolSelect === "") {
            setPoolSelect(res.bestPool)
            if (res.bestPool === 'CMswap' && res.cmSwapFee && autoCmswapFee) setFeeSelect(res.cmSwapFee)
          }
        }
      } catch (e) { console.error('Error fetching quote', e) }
    }
    fetchQuoteAndSetPool()
  }, [CMswapTVL, DMswapTVL, UdonTVL, ponderTVL, GameSwapTvl, JibSwapTvl, amountA, onLoading, variant])

  React.useEffect(() => { setPoolSelect(""); setFeeSelect(10000); setAutoCmswapFee(true) }, [tokenA, tokenB])
  React.useEffect(() => { setRouteQuoteMap({}) }, [tokenA.value, tokenB.value, variant])

  const [routesExpanded, setRoutesExpanded] = React.useState(false)
  const baseTvlUnit = React.useMemo(() => {
    const stableSymbols = ['KUSDT', 'JUSDT']
    if (stableSymbols.includes(tokenA.name) || stableSymbols.includes(tokenB.name)) return '$'
    if (tokenB.name && tokenB.name !== 'Choose Token') return tokenB.name
    if (tokenA.name && tokenA.name !== 'Choose Token') return tokenA.name
    return 'Token'
  }, [tokenA.name, tokenB.name])

  const hasUserInputAmount = Number(amountA) > 0
  const routeOptions = React.useMemo<RouteOption[]>(() => {
    const toNumber = (value: unknown) => {
      const parsed = Number(value ?? 0)
      return Number.isFinite(parsed) ? parsed : 0
    }
    const options: RouteOption[] = []
    const shouldShowCmswap = CMSWAP_FEE_TIERS.some(meta => toNumber((CMswapTVL as any)?.[meta.tvlKey]) > 0) || poolSelect === 'CMswap' || bestPool === 'CMswap'

    if (shouldShowCmswap) {
      CMSWAP_FEE_TIERS.forEach(meta => {
        const tvlValue = toNumber((CMswapTVL as any)?.[meta.tvlKey])
        const metrics = routeQuoteMap[`CMswap-${meta.fee}`]
        options.push({
          id: `CMswap-${meta.fee}`,
          pool: 'CMswap',
          label: 'CMswap',
          fee: meta.fee,
          feeLabel: meta.label,
          tvl: tvlValue,
          tvlUnit: baseTvlUnit,
          description: ROUTE_DESCRIPTIONS.CMswap,
          amountOut: metrics?.amountOut,
          priceQuote: metrics?.priceQuote,
        })
      })
    }

    const ensureRoute = (poolId: string, label: string, tvlValue: number, descriptionKey: string) => {
      const shouldInclude = tvlValue > 0 || poolSelect === poolId || bestPool === poolId
      if (!shouldInclude) return
      const metrics = routeQuoteMap[poolId]
      options.push({
        id: poolId,
        pool: poolId,
        label,
        tvl: tvlValue,
        tvlUnit: baseTvlUnit,
        description: ROUTE_DESCRIPTIONS[descriptionKey] ?? '',
        amountOut: metrics?.amountOut,
        priceQuote: metrics?.priceQuote,
      })
    }

    if (variant === LiquidityVariant.BKC) {
      ensureRoute('DiamonSwap', 'DiamonSwap', toNumber(DMswapTVL?.tvl10000), 'DiamonSwap')
      ensureRoute('UdonSwap', 'UdonSwap', toNumber(UdonTVL?.tvl10000), 'UdonSwap')
      ensureRoute('ponder', 'Ponder', toNumber(ponderTVL?.tvl10000), 'ponder')
    } else if (variant === LiquidityVariant.JBC) {
      ensureRoute('GameSwap', 'GameSwap', toNumber(GameSwapTvl?.tvl10000), 'GameSwap')
      ensureRoute('JibSwap', 'JibSwap', toNumber(JibSwapTvl?.tvl10000), 'JibSwap')
    }

    const metricValue = (route: RouteOption) => {
      const candidate = hasUserInputAmount ? route.amountOut : route.priceQuote
      return candidate !== undefined && Number.isFinite(candidate) ? candidate : undefined
    }

    return options.sort((a, b) => {
      const metricA = metricValue(a)
      const metricB = metricValue(b)
      if (metricA !== undefined || metricB !== undefined) {
        if (metricA === undefined) return 1
        if (metricB === undefined) return -1
        if (metricB !== metricA) return metricB - metricA
      }
      return b.tvl - a.tvl
    })
  }, [CMswapTVL, DMswapTVL, UdonTVL, ponderTVL, GameSwapTvl, JibSwapTvl, baseTvlUnit, variant, poolSelect, bestPool, routeQuoteMap, hasUserInputAmount])

  const tvlFormatter = React.useMemo(() => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }), [])
  const formatTvl = React.useCallback((value: number) => tvlFormatter.format(Math.max(value, 0)), [tvlFormatter])
  const amountFormatter = React.useMemo(() => new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }), [])
  const formatAmountOut = React.useCallback((value?: number) => {
    if (value === undefined || !Number.isFinite(value)) return undefined
    return amountFormatter.format(value)
  }, [amountFormatter])
  const priceFormatter = React.useMemo(() => new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }), [])
  const formatPriceQuoteValue = React.useCallback((value?: number) => {
    if (value === undefined || !Number.isFinite(value) || value <= 0) return undefined
    return priceFormatter.format(value)
  }, [priceFormatter])

  const suggestedRouteId = React.useMemo(() => {
    if (!bestPool) return undefined
    const matches = routeOptions.filter(route => route.pool === bestPool)
    if (!matches.length) return undefined
    const metricValue = (route: RouteOption) => {
      const candidate = hasUserInputAmount ? route.amountOut : route.priceQuote
      return candidate !== undefined && Number.isFinite(candidate) ? candidate : undefined
    }
    return matches.reduce((acc, route) => {
      const accMetric = metricValue(acc)
      const routeMetric = metricValue(route)
      if (accMetric === undefined && routeMetric === undefined) return route.tvl > acc.tvl ? route : acc
      if (accMetric === undefined) return route
      if (routeMetric === undefined) return acc
      if (routeMetric === accMetric) return route.tvl > acc.tvl ? route : acc
      return routeMetric > accMetric ? route : acc
    }, matches[0]).id
  }, [routeOptions, bestPool, hasUserInputAmount])

  const activeRouteId = React.useMemo(() => {
    const active = routeOptions.find(route => {
      if (route.pool !== poolSelect) return false
      if (route.pool === 'CMswap' && route.fee !== undefined) return feeSelect === route.fee
      return true
    })
    return active?.id
  }, [routeOptions, poolSelect, feeSelect])

  const activeRoute = React.useMemo(() => routeOptions.find(route => route.id === activeRouteId), [routeOptions, activeRouteId])
  const suggestedRoute = React.useMemo(() => routeOptions.find(route => route.id === suggestedRouteId), [routeOptions, suggestedRouteId])
  const previewRoute = React.useMemo(() => suggestedRoute || activeRoute || routeOptions[0], [suggestedRoute, activeRoute, routeOptions])

  const handleRouteSelect = React.useCallback(async (route: RouteOption, cmswapFeeOverride?: CmswapFee) => {
    setPoolSelect(route.pool)
    if (route.pool === 'CMswap') {
      const feeToUse = (cmswapFeeOverride ?? route.fee)
      if (feeToUse !== undefined) {
        setFeeSelect(feeToUse)
        setAutoCmswapFee(false)
      } else {
        const quote: any = await getQuote(amountA)
        if (quote?.CMswapBestFee) {
          setFeeSelect(quote.CMswapBestFee)
          // Still allow auto if user didn't pick a specific fee
          setAutoCmswapFee(true)
        }
      }
    } else {
      // Non-CMswap route selection: re-enable auto for when user returns to CMswap
      setAutoCmswapFee(true)
    }
    await getQuote(amountA)
  }, [setPoolSelect, setFeeSelect, getQuote, amountA])

  const piValue = !wrappedRoute && Number(amountB) > 0 ? computePriceImpact(Number(newPrice || '0'), Number((fixedExchangeRate || exchangeRate || '0'))) : undefined
  const tokenPairSelected = tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring'
  const amountsEntered = tokenPairSelected && Number(amountA) > 0 && Number(amountB) > 0
  const exchangeRateValue = Number(exchangeRate || '0')
  const isExchangeRateValid = Number.isFinite(exchangeRateValue) && exchangeRateValue > 0
  const routeLabel = altRoute ? [tokenNameByAddress(altRoute.a), tokenNameByAddress(altRoute.b), tokenNameByAddress(altRoute.c)].filter(Boolean).join(' -> ') : ''
  const priceImpactValue = piValue !== undefined ? Number(piValue) : undefined
  const priceImpactLabel = priceImpactValue !== undefined && Number.isFinite(priceImpactValue) ? `${priceImpactValue.toFixed(2)}%` : undefined
  const showTokenPrice = tokenPairSelected && (tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT' || tokenA.name === 'JUSDT' || tokenB.name === 'JUSDT') && isExchangeRateValid
  const tokenPriceLabel = (() => {
    if (!showTokenPrice || exchangeRateValue <= 0) return ''
    if (tokenA.name === 'KUSDT' || tokenA.name === 'JUSDT') return `1 ${tokenA.name} ~ ${exchangeRateValue.toFixed(4)} $`
    if (tokenB.name === 'KUSDT' || tokenB.name === 'JUSDT') return `1 ${tokenB.name} ~ ${(1 / exchangeRateValue).toFixed(4)} $`
    return ''
  })()
  const tokenNamesReady = tokenPairSelected && tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token'
  const buildRouteStats = React.useCallback((route: RouteOption) => {
    if (!tokenNamesReady) return { priceText: undefined, returnText: undefined }
    const priceValue = formatPriceQuoteValue(route.priceQuote)
    const priceText = priceValue ? `1 ${tokenA.name} ≈ ${priceValue} ${tokenB.name}` : undefined
    const returnValue = hasUserInputAmount ? formatAmountOut(route.amountOut) : undefined
    const returnText = returnValue ? `≈ ${returnValue} ${tokenB.name}` : undefined
    return { priceText, returnText }
  }, [tokenNamesReady, tokenA.name, tokenB.name, hasUserInputAmount, formatPriceQuoteValue, formatAmountOut])
  const previewRouteStats = previewRoute ? buildRouteStats(previewRoute) : undefined
  const previewPriceClass = `text-sm font-semibold ${previewRouteStats?.priceText ? 'text-white' : 'text-slate-500'}`
  const previewReturnClass = `text-sm font-semibold ${previewRouteStats?.returnText ? 'text-emerald-300' : 'text-slate-500'}`
  const isBestPreview = previewRoute?.id === suggestedRouteId

  return (
    <div className="flex justify-center">
      <div className="w-full space-y-6">
        <div className="space-y-3">
          <SwapTokenPanel
            label="From"
            tokenAddress={tokenA.value}
            onTokenAddressChange={value => {
              if (value !== '0x') setTokenA({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico', decimal: 18 }); else setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
            }}
            amount={amountA}
            onAmountChange={value => { setAmountA(value); getQuote(value) }}
            amountAutoFocus
            selectedToken={tokenA}
            tokens={tokens}
            onSelectToken={token => { setTokenA(token); updateURLWithTokens(token.value, tokenB?.value, address) }}
            popoverOpen={open}
            onPopoverOpenChange={setOpen}
            balanceLabel={tokenABalanceLabel}
            footerContent={
              <Button
                variant="ghost"
                size="sm"
                className="h-7 rounded-full bg-slate-800/80 px-3 text-[11px] font-semibold text-slate-200 hover:bg-slate-800 cursor-pointer"
                onClick={() => { setAmountA(tokenABalance); getQuote(tokenABalance) }}
              >
                MAX
              </Button>
            }
          />

          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white shadow-sm transition hover:bg-slate-900 cursor-pointer"
              onClick={() => { setExchangeRate(""); switchTokens() }}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          <SwapTokenPanel
            label="To"
            tokenAddress={tokenB.value}
            onTokenAddressChange={value => {
              if (value !== '0x') setTokenB({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico', decimal: 18 }); else setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
            }}
            amount={amountB}
            amountReadOnly
            selectedToken={tokenB}
            tokens={tokens}
            onSelectToken={token => { setTokenB(token); updateURLWithTokens(tokenA?.value, token.value, address) }}
            popoverOpen={open2}
            onPopoverOpenChange={setOpen2}
            balanceLabel={tokenBBalanceLabel}
          />
        </div>

        <div>
          {amountsEntered ? (
            <Button className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-base font-semibold text-white shadow-[0_18px_40px_-16px_rgba(99,102,241,0.7)] transition hover:shadow-[0_22px_46px_-14px_rgba(99,102,241,0.8)]" onClick={handleSwap}>
              Swap
            </Button>
          ) : (
            <Button disabled className="h-14 w-full rounded-2xl border border-white/5 bg-slate-900/60 text-base font-semibold text-slate-500">
              Swap
            </Button>
          )}
        </div>

        {!wrappedRoute && routeOptions.length > 0 && (
          <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
            <div className="flex flex-col gap-2 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-slate-400">Pool routes</span>
              <div className="flex flex-wrap items-center gap-2">
                {activeRoute && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white">
                    <span className="uppercase text-[9px] tracking-wide text-slate-300">Selected</span>
                    <span>{activeRoute.label}{activeRoute.feeLabel ? ` • ${activeRoute.feeLabel}` : ''}</span>
                  </span>
                )}
                {suggestedRoute && suggestedRoute.id !== activeRouteId && (
                  <button type="button" onClick={() => setRoutesExpanded(true)} className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-200">
                    <span className="uppercase text-[9px] tracking-wide text-amber-300">Best</span>
                    <span>{suggestedRoute.label}{suggestedRoute.feeLabel ? ` • ${suggestedRoute.feeLabel}` : ''}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setRoutesExpanded(v => !v)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white hover:bg-white/10"
                >
                  {routesExpanded ? 'Hide routes' : `Show routes (${routeOptions.length})`}
                </button>
              </div>
            </div>
            {routesExpanded ? (
              <div className="space-y-3">
                {routeOptions.map(route => {
                  const isActive = route.id === activeRouteId
                  const isBest = route.id === suggestedRouteId
                  const { priceText, returnText } = buildRouteStats(route)
                  const priceClass = `text-sm font-semibold ${priceText ? 'text-white' : 'text-slate-500'}`
                  const returnClass = `text-sm font-semibold ${returnText ? 'text-emerald-300' : 'text-slate-500'}`
                  return (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => handleRouteSelect(route)}
                      className={`w-full rounded-2xl border border-white/5 p-4 text-left text-sm text-slate-300 transition hover:border-white/10 hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${isActive ? 'border-indigo-400/70 bg-indigo-500/10 text-white bg-indigo-500/20' : ''}`}
                      aria-pressed={isActive}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                            <span>{route.label}</span>
                            {route.feeLabel && (
                              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-200">
                                {route.feeLabel}
                              </span>
                            )}
                          </div>
                          {route.description && (
                            <p className="text-xs text-slate-400">{route.description}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right">
                          {isBest && (
                            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                              Best
                            </span>
                          )}
                          <div className="flex flex-col items-start text-xs text-slate-400 sm:items-end">
                            <span className={priceClass}>{priceText ?? '--'}</span>
                          </div>
                          {hasUserInputAmount && (
                            <div className="flex flex-col items-start text-xs text-slate-400 sm:items-end">
                              <span className="uppercase tracking-wide">Return</span>
                              <span className={returnClass}>{returnText ?? '--'}</span>
                            </div>
                          )}
                          <div className="flex flex-col items-start text-xs text-slate-400 sm:items-end">
                            <span className="uppercase tracking-wide">TVL</span>
                            <span className={`text-sm font-semibold ${route.tvl > 0 ? 'text-emerald-300' : 'text-slate-400'}`}>
                              {formatTvl(route.tvl)} {route.tvlUnit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              previewRoute && (
                <button
                  type="button"
                  onClick={() => handleRouteSelect(previewRoute)}
                  className={`w-full rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-left text-sm text-slate-300 transition hover:border-white/10 hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${previewRoute.id === activeRouteId ? 'border-indigo-400/70 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/20' : ''}`}
                  aria-pressed={previewRoute.id === activeRouteId}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                        <span>{previewRoute.label}</span>
                        {previewRoute.feeLabel && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-200">
                            {previewRoute.feeLabel}
                          </span>
                        )}
                      </div>
                      {previewRoute.description && (
                        <p className="text-xs text-slate-400">{previewRoute.description}</p>
                      )}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setRoutesExpanded(true) }}
                        className="text-[11px] font-medium text-indigo-300 hover:text-indigo-200"
                      >
                        Show all routes
                      </button>
                    </div>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right">
                      {isBestPreview && (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                          Best
                        </span>
                      )}
                      <div className="flex flex-col items-start text-xs text-slate-400 sm:items-end">
                        <span className={previewPriceClass}>{previewRouteStats?.priceText ?? '--'}</span>
                      </div>
                      {hasUserInputAmount && (
                        <div className="flex flex-col items-start text-xs text-slate-400 sm:items-end">
                          <span className="uppercase tracking-wide">Return</span>
                          <span className={previewReturnClass}>{previewRouteStats?.returnText ?? '--'}</span>
                        </div>
                      )}
                      <div className="flex flex-col items-start text-xs text-slate-400 sm:items-end">
                        <span className="uppercase tracking-wide">TVL</span>
                        <span className={`text-sm font-semibold ${previewRoute.tvl > 0 ? 'text-emerald-300' : 'text-slate-400'}`}>
                          {formatTvl(previewRoute.tvl)} {previewRoute.tvlUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        )}

        <div className="rounded-3xl border border-white/5 bg-slate-950/40 p-5 text-sm text-slate-300">
          {tokenPairSelected ? (
            <div className="space-y-3">
              {routeLabel && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Route</span>
                  <span className="font-medium text-white">{routeLabel}</span>
                </div>
              )}
              {priceImpactLabel && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Price impact</span>
                  <span className="font-medium text-white">{priceImpactLabel}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Slippage tolerance</span>
                <span className="font-medium text-white">5%</span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400">Select tokens and enter an amount to see route, quotes, and price impact.</p>
          )}
        </div>
      </div>
    </div>
  )
}
