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
import { SwapTokenPanel } from '@/components/cmswap/swap/SwapTokenPanel'
import { SwapFeeTierPanel } from '@/components/cmswap/swap/SwapFeeTierPanel'
import { PoolSelectorPanel } from '@/components/cmswap/swap/PoolSelectorPanel'
import { useSwapChain } from '@/components/cmswap/useSwapChain'
import { LiquidityVariant } from '@/components/cmswap/liquidityVariant'
import { selectSwapPoolDataHook } from '@/components/cmswap/swap/hooks/selectSwapPoolData'

type UIToken = { name: string; value: '0xstring'; logo: string; decimal: number }

export default function Swap({ setIsLoading, setErrMsg }: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>
}) {
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
    const amountIn = Number(_amount)
    setAltRoute(undefined)
    let CMswapRate: number | undefined = undefined
    let DiamonSwapRate: number | undefined = undefined
    let UdonswapRate: number | undefined = undefined
    let ponderRate: number | undefined = undefined
    let GameswapRate: number | undefined = undefined
    let JibswapRate: number | undefined = undefined
    const tokenAvalue = resolveTokenAddress(tokenA)
    const tokenBvalue = resolveTokenAddress(tokenB)
    if (wrappedRoute) {
      setAmountB(amountIn.toString())
    } else {
      // CMswap quote (common)
      try {
        if (Number(_amount) !== 0) {
          if (altRoute === undefined) {
            const quoteOutput = await quoteExactInputSingle({ tokenIn: tokenA, tokenOut: tokenB, amount: _amount, fee: feeSelect, parseAmount: (value: string) => parseUnits(value, getDecimals(tokenA)), suppressErrors: true })
            if (quoteOutput) {
              const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
              if (poolSelect === "CMswap") setAmountB(out.toString())
              CMswapRate = out
              const execPriceAB = out > 0 ? amountIn / out : 0
              setNewPrice(execPriceAB.toFixed(6))
            }
          } else {
            const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
            const quoteOutput = await quoteExactInput({ path: route as `0x${string}`, tokenIn: tokenA, amount: _amount, parseAmount: (value: string) => parseUnits(value, getDecimals(tokenA)), suppressErrors: true })
            if (quoteOutput) {
              const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
              if (poolSelect === "CMswap") setAmountB(out.toString())
              CMswapRate = out
              const execPriceAB = out > 0 ? amountIn / out : 0
              setNewPrice(execPriceAB.toFixed(6))
            }
          }
        } else { setAmountB("") }
      } catch {}

      // Variant-specific quotes
      if (variant === LiquidityVariant.BKC) {
        // DiamonSwap
        try {
          if (Number(_amount) !== 0) {
            const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(0), tokenAvalue, tokenBvalue], }] })
            const DiamondPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
            const getBestPrice = await readContracts(config, { contracts: [ { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(0), tokenAvalue, tokenBvalue, parseUnits(_amount, getDecimals(tokenA))] }, { ...UniswapPairv2PoolABI, address: DiamondPair, functionName: 'token0' } ] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            bestPathArrayLocal.length > 2 ? setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' }) : setAltRoute(undefined)
            if (poolSelect === "DiamonSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
              const out = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
              const price = tokenAvalue.toUpperCase() === tokens[0].value.toUpperCase() ? Number(_amount) / out : out / Number(_amount)
              setNewPrice((1 / price).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            DiamonSwapRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
          }
        } catch {}
        // UdonSwap
        try {
          if (Number(_amount) !== 0) {
            const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(1), tokenAvalue, tokenBvalue], }] })
            const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
            const getBestPrice = await readContracts(config, { contracts: [ { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(1), tokenAvalue, tokenBvalue, parseUnits(_amount, getDecimals(tokenA))] }, { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' } ] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            if (bestPathArrayLocal.length > 2 && poolSelect === "UdonSwap") setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' })
            if (poolSelect === "UdonSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
              setBestPathArray(bestPathArrayLocal)
              const newReserveA = Number(formatEther(reserveUdonA)) + Number(_amount)
              const newReserveB = Number(formatEther(reserveUdonB)) - Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
              const newprice = newReserveA / newReserveB
              setNewPrice((newprice).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            UdonswapRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
          }
        } catch {}
        // Ponder
        try {
          if (Number(_amount) !== 0) {
            const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(2), tokenAvalue, tokenBvalue], }] })
            const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
            const getBestPrice = await readContracts(config, { contracts: [ { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(2), tokenAvalue, tokenBvalue, parseUnits(_amount, getDecimals(tokenA))] }, { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' } ] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            if (bestPathArrayLocal.length > 2 && poolSelect === "ponder") setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' })
            if (poolSelect === "ponder" && Number(_amount) > 0 && bestAmountOut > 0) {
              setBestPathArray(bestPathArrayLocal)
              const price = ponderTVL.isReverted ? amountIn / Number(formatUnits(bestAmountOut, getDecimals(tokenB))) : Number(formatUnits(bestAmountOut, getDecimals(tokenB))) / amountIn
              setNewPrice((price).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            ponderRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
          }
        } catch {}
      } else if (variant === LiquidityVariant.JBC) {
        // GameSwap
        try {
          if (Number(_amount) !== 0) {
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
              const quoteOutput = await readContracts(config, { contracts: [{ ...CMswapPoolDualRouterContract, functionName: useFunction, args: [poolAddr, parseUnits(_amount, getDecimals(tokenA))] }] })
              const result: any = quoteOutput[0].result !== undefined ? quoteOutput[0].result : BigInt(0)
              const amountBout = Number(formatUnits(result, getDecimals(tokenB)))
              GameswapRate = amountBout
              if (poolSelect === "GameSwap" && amountIn > 0 && amountBout > 0) {
                setAmountB(formatUnits(result, getDecimals(tokenB)))
                const price = tokenAAddr === tokens[1].value.toUpperCase() ? amountBout / amountIn : amountIn / amountBout
                setNewPrice(price.toFixed(6))
              }
            }
          }
        } catch {}
        // JibSwap via SmartRoute
        try {
          if (Number(_amount) !== 0) {
            let TokenA = tokenAvalue === ("0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring') ? ("0x99999999990FC47611b74827486218f3398A4abD" as '0xstring') : tokenAvalue
            let TokenB = tokenBvalue === ("0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring') ? ("0x99999999990FC47611b74827486218f3398A4abD" as '0xstring') : tokenBvalue
            const getBestPrice = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContract, functionName: 'findBestPathAndAmountOut', args: [TokenA, TokenB, parseUnits(_amount, getDecimals(tokenA))] }] })
            const result: any = getBestPrice[0].result
            const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0)
            const bestPath = result !== undefined ? result[1] : []
            const bestPathArrayLocal: string[] = bestPath.map((addr: `0x${string}`) => addr)
            bestPathArrayLocal.length > 2 ? setAltRoute({ a: bestPathArrayLocal[0] as '0xstring', b: bestPathArrayLocal[1] as '0xstring', c: bestPathArrayLocal[2] as '0xstring' }) : setAltRoute(undefined)
            setBestPathArray(bestPathArrayLocal)
            if (poolSelect === "JibSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
              const outNum = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
              const price = tokenAvalue.toUpperCase() === tokens[0].value.toUpperCase() ? Number(_amount) / outNum : outNum / Number(_amount)
              setNewPrice((1 / price).toFixed(6))
              setAmountB(formatUnits(bestAmountOut, getDecimals(tokenB)))
            }
            JibswapRate = Number(formatUnits(bestAmountOut, getDecimals(tokenB)))
          }
        } catch {}
      }
    }
    return { CMswapRate, DiamonSwapRate, UdonswapRate, ponderRate, GameswapRate, JibswapRate }
  }, 700)

  const switchToken = () => { setExchangeRate(""); switchTokens(); }

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
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
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
        const quote = await getQuote(amountA)
        if (variant === LiquidityVariant.BKC) {
          const rates: Record<string, number> = { CMswap: Number(quote?.CMswapRate || CMswapTVL.exchangeRate || 0), DiamonSwap: Number(quote?.DiamonSwapRate || DMswapTVL.exchangeRate || 0), UdonSwap: Number(quote?.UdonswapRate || UdonTVL.exchangeRate || 0), ponder: Number(quote?.ponderRate || ponderTVL.exchangeRate || 0) }
          const valid = Object.entries(rates).filter(([, r]) => r > 0)
          if (!valid.length) return
          const [bp] = valid.sort((a, b) => b[1] - a[1])[0]
          setBestPool(bp)
          if (poolSelect === "") setPoolSelect(bp)
        } else if (variant === LiquidityVariant.JBC) {
          if (onLoading) return
          const rates: Record<string, number> = { CMswap: Number(quote?.CMswapRate || CMswapTVL.exchangeRate || 0), GameSwap: Number(quote?.GameswapRate || GameSwapTvl.exchangeRate || 0), JibSwap: Number(quote?.JibswapRate || JibSwapTvl.exchangeRate || 0) }
          const [bp] = Object.entries(rates).sort((a, b) => b[1] - a[1])[0]
          setBestPool(bp); if (poolSelect === "") setPoolSelect(bp)
        } else {
          const cm = Number(quote?.CMswapRate) > 0 ? Number(quote?.CMswapRate) : Number(CMswapTVL?.exchangeRate || 0)
          const [bp] = [["CMswap", cm]].sort((a: any, b: any) => b[1] - a[1])[0]
          setBestPool(bp as string); if (poolSelect === "") setPoolSelect(bp as string)
        }
      } catch (e) { console.error('Error fetching quote', e) }
    }
    fetchQuoteAndSetPool()
  }, [CMswapTVL, DMswapTVL, UdonTVL, ponderTVL, GameSwapTvl, JibSwapTvl, amountA, onLoading, variant])

  React.useEffect(() => { setPoolSelect(""); setFeeSelect(10000) }, [tokenA, tokenB])

  const piValue = !wrappedRoute && Number(amountB) > 0 ? computePriceImpact(Number(newPrice || '0'), Number((fixedExchangeRate || exchangeRate || '0'))) : undefined

  return (
    <div className='space-y-2'>
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
        footerContent={<Button variant="ghost" size="sm" className="h-6 text-[#00ff9d] text-xs px-2 cursor-pointer" onClick={() => { setAmountA(tokenABalance); getQuote(tokenABalance) }}>MAX</Button>}
      />
      <div className="flex justify-center">
        <Button variant="outline" size="icon" className="bg-[#0a0b1e] border border-[#00ff9d]/30 rounded-md h-10 w-10 shadow-md cursor-pointer" onClick={() => { setExchangeRate(""); switchTokens() }}>
          <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
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

      {!wrappedRoute && (
        <div className="mt-6">
          <div className="flex justify-between items-center my-2">
            <span className="text-gray-400 text-xs">Liquidity Available</span>
          </div>
          <PoolSelectorPanel
            items={(() => {
              const common = [{ id: 'CMswap', label: 'CMswap', tvl: Number(CMswapTVL[`tvl${feeSelect as 100 | 500 | 3000 | 10000}` as keyof typeof CMswapTVL] || 0), tvlUnit: (tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT' || tokenB.name === 'JUSDT') ? '$' : tokenB.name, active: poolSelect === 'CMswap', best: bestPool === 'CMswap', visible: (['tvl10000','tvl3000','tvl500','tvl100'] as const).some(k => Number(CMswapTVL[k]) > 0), onClick: () => { setPoolSelect('CMswap'); getQuote(amountA) } }]
              if (variant === LiquidityVariant.BKC) {
                return [
                  ...common,
                  { id: 'DiamonSwap', label: 'Diamon', tvl: Number(DMswapTVL['tvl10000'] || 0), tvlUnit: (tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name, active: poolSelect === 'DiamonSwap', best: bestPool === 'DiamonSwap', visible: Number(DMswapTVL['tvl10000'] || 0) > 0, onClick: () => { setPoolSelect('DiamonSwap'); getQuote(amountA) } },
                  { id: 'UdonSwap', label: 'UdonSwap', tvl: Number(UdonTVL['tvl10000'] || 0), tvlUnit: (tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name, active: poolSelect === 'UdonSwap', best: bestPool === 'UdonSwap', visible: Number(UdonTVL['tvl10000'] || 0) > 0, onClick: () => { setPoolSelect('UdonSwap'); getQuote(amountA) } },
                  { id: 'ponder', label: 'Ponder', tvl: Number(ponderTVL['tvl10000'] || 0), tvlUnit: (tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name, active: poolSelect === 'ponder', best: bestPool === 'ponder', visible: Number(ponderTVL['tvl10000'] || 0) > 0, onClick: () => { setPoolSelect('ponder'); getQuote(amountA) } },
                ]
              } else if (variant === LiquidityVariant.JBC) {
                return [
                  ...common,
                  { id: 'GameSwap', label: 'GameSwap', tvl: Number(GameSwapTvl['tvl10000'] || 0), tvlUnit: (tokenB.name === 'JUSDT') ? '$' : tokenB.name, active: poolSelect === 'GameSwap', best: bestPool === 'GameSwap', visible: Number(GameSwapTvl['tvl10000'] || 0) > 0, onClick: () => setPoolSelect('GameSwap') },
                  { id: 'JibSwap', label: 'JibSwap', tvl: Number(JibSwapTvl['tvl10000'] || 0), tvlUnit: (tokenB.name === 'JUSDT') ? '$' : tokenB.name, active: poolSelect === 'JibSwap', best: bestPool === 'JibSwap', visible: Number(JibSwapTvl['tvl10000'] || 0) > 0, onClick: () => setPoolSelect('JibSwap') },
                ]
              }
              return common
            })()}
          />
          {poolSelect === "CMswap" && (
            <SwapFeeTierPanel
              feeSelect={feeSelect}
              onChange={setFeeSelect as (v: any) => void}
              tvl={{ tvl10000: CMswapTVL.tvl10000, tvl3000: CMswapTVL.tvl3000, tvl500: CMswapTVL.tvl500, tvl100: CMswapTVL.tvl100 }}
              tvlUnitLabel={(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT' || tokenB.name === 'JUSDT') ? '$' : tokenB.name}
            />
          )}
        </div>
      )}

      {(tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountB) !== 0 ?
        <Button className="w-full py-6 px-8 mt-4 font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" onClick={handleSwap}>Swap</Button> :
        <Button disabled className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 mt-4 uppercase">Swap</Button>
      )}

      <div className="mt-4 border-t border-[#00ff9d]/10 pt-4">
        {altRoute !== undefined && (
          <div className="flex items-center text-gray-500 text-xs my-2">
            <span className="mr-1">route</span>
            <span className="text-white text-xs px-2 gap-1">{tokens.map(obj => obj.value).indexOf(altRoute.a) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.a)].name} → {tokens.map(obj => obj.value).indexOf(altRoute.b) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.b)].name} → {tokens.map(obj => obj.value).indexOf(altRoute.c) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.c)].name}</span>
          </div>
        )}
        {tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token' && tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && (
          <>
            <div className="flex items-center text-gray-500 text-xs my-2">
              <span className="mr-1">price quote</span>
              {exchangeRate !== '0' && !isNaN(Number(exchangeRate)) ? (
                <span className="text-[#00ff9d] text-xs px-2 gap-1 hover:cursor-pointer" onClick={() => setSwapDirection(!swapDirection)}>
                  {swapDirection ? `1 ${tokenB.name} = ${Number(exchangeRate).toFixed(4)} ${tokenA.name}` : `1 ${tokenA.name} = ${isFinite(1 / Number(exchangeRate)) ? (1 / Number(exchangeRate)).toFixed(4) : (0).toFixed(4)} ${tokenB.name}`}
                </span>
              ) : (
                <span className="text-red-500 px-2">insufficient liquidity</span>
              )}
              {!wrappedRoute && Number(amountB) > 0 && (<span>[PI: {piValue ?? 0}%]</span>)}
            </div>
            {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT' || tokenA.name === 'JUSDT' || tokenB.name === 'JUSDT') && (
              <div className="flex items-center text-gray-500 text-xs my-2">
                <span className="mr-1">token price</span>
                {exchangeRate !== '0' && exchangeRate !== '' && (
                  <span className="text-white text-xs px-2 gap-1">
                    {(tokenA.name === 'KUSDT' || tokenA.name === 'JUSDT') && <span>{Number(exchangeRate).toFixed(4)} </span>}
                    {(tokenB.name === 'KUSDT' || tokenB.name === 'JUSDT') && <span>{Number(1 / Number(exchangeRate)).toFixed(4)} </span>}$
                  </span>
                )}
              </div>
            )}
          </>
        )}
        <div className="flex items-center text-gray-500 text-xs my-2">
          <span className="mr-1">slippage tolerance</span>
          <span className="text-xs px-2 flex items-center gap-1">5%</span>
        </div>
      </div>
    </div>
  )
}
