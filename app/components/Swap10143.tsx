import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, type WriteContractErrorType } from '@wagmi/core'
import { formatUnits, parseUnits } from 'viem'
import { ArrowDown } from "lucide-react"
import { useDebouncedCallback } from 'use-debounce'
import { tokens, ROUTER02, qouterV2Contract, router02Contract, erc20ABI, wrappedNative } from '@/app/lib/10143'
import { config } from '@/app/config'
import { useSwapTokenSelection } from '@/app/components/swap/useSwapTokenSelection'
import { useSwapQuote } from '@/app/components/swap/useSwapQuote'
import { encodePath } from '@/app/components/swap/path'
import { ensureTokenAllowance, executeRouterSwap, wrapNativeToken, unwrapWrappedToken } from '@/app/components/swap/swapActions'
import { useSwap10143PoolData } from '@/app/components/swap/hooks/useSwap10143PoolData'
import { SwapTokenPanel } from '@/app/components/swap/SwapTokenPanel'
import { Button } from '@/components/ui/button'
import { computePriceImpact, getDecimals } from '@/app/components/swap/utils'

export default function Swap10143({ setIsLoading, setErrMsg, }: {
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
    const {tokenA, tokenB, setTokenA, setTokenB, hasInitializedFromParams, updateURLWithTokens, switchTokens} = useSwapTokenSelection(tokens, {defaultTokenAIndex: 0, defaultTokenBIndex: 2, referralAddress: address})
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [swapDirection, setSwapDirection] = React.useState(true) // false = A->B, true = B->A
    React.useEffect(() => {console.log("hasInitializedFromParams : ", hasInitializedFromParams);}, [hasInitializedFromParams])
    const tokenABalanceLabel = tokenA.name !== 'Choose Token' ? `${Number(tokenABalance).toFixed(6)} ${tokenA.name}` : '0.000000'
    const tokenBBalanceLabel = tokenB.name !== 'Choose Token' ? `${Number(tokenBBalance).toFixed(6)} ${tokenB.name}` : '0.000000'

    useSwap10143PoolData({config, address, tokens, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, setTokenA, setTokenB, setTokenABalance, setTokenBBalance, setWrappedRoute, setExchangeRate, setAltRoute, setCMswapTVL, setFixedExchangeRate, setAmountA, setAmountB})

    const { quoteExactInputSingle, quoteExactInput } = useSwapQuote({config, contract: qouterV2Contract, tokens})

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
                        const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
                        if (poolSelect === "CMswap") setAmountB(out.toString());
                        CMswapRate = out
                        const execPriceAB = out > 0 ? amountIn / out : 0
                        setNewPrice(execPriceAB.toFixed(6))
                    }
                } else {
                    const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                    const quoteOutput = await quoteExactInput({
                        path: route as `0x${string}`,
                        tokenIn: tokenA,
                        amount: _amount,
                        parseAmount: (value: string) => parseUnits(value, getDecimals(tokenA)),
                        suppressErrors: true,
                    })

                    if (quoteOutput) {
                        const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
                        if (poolSelect === "CMswap") setAmountB(out.toString());
                        CMswapRate = out
                        const execPriceAB = out > 0 ? amountIn / out : 0
                        setNewPrice(execPriceAB.toFixed(6))
                    }
                }
            } else {
                setAmountB("")
            }
        } catch {}
        return { CMswapRate }
    }, 700)

    const switchToken = () => {setExchangeRate(""); switchTokens();}

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
                const hash = await wrapNativeToken({config, wrappedTokenAddress: tokens[1].value, amount: parseUnits(amountA, tokenA.decimal)})
                setTxupdate(hash)
            } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const hash = await unwrapWrappedToken({config, contract: wrappedNative, amount: parseUnits(amountA, tokenA.decimal)})
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
            let tokenAvalue = tokenA.value === tokens[0].value ? tokens[1].value : tokenA.value;
            let tokenBvalue = tokenB.value === tokens[0].value ? tokens[1].value : tokenB.value;
            if (tokenA.value.toUpperCase() !== tokens[0].value.toUpperCase()) {
                await ensureTokenAllowance({
                    config,
                    token: { ...erc20ABI, address: tokenA.value },
                    owner: address as `0x${string}`,
                    spender: ROUTER02,
                    requiredAmount: parseUnits(amountA, tokenA.decimal),
                })
            }
            const parsedAmountIn = parseUnits(amountA, getDecimals(tokenA))
            const amountOutMinimum = parseUnits(amountB, getDecimals(tokenB)) * BigInt(95) / BigInt(100)
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
                value: tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ? parseUnits(amountA, getDecimals(tokenA)) : BigInt(0),
            })
            setTxupdate(h)
            if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                let { request } = await simulateContract(config, {...wrappedNative, functionName: 'withdraw', args: [r as bigint]})
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    // Pool data loading handled by useSwap10143PoolData hook
    React.useEffect(() => {
        const updateRate = async () => {
            if (poolSelect === "CMswap") setExchangeRate(CMswapTVL.exchangeRate);
        };
        !wrappedRoute && updateRate();
    }, [amountA, poolSelect, CMswapTVL]);

    React.useEffect(() => {
        const fetchQuoteAndSetPool = async () => {
            if (CMswapTVL) {
                try {
                    const quote = await getQoute(amountA);
                    const CMRate = Number(quote?.CMswapRate) > 0 ? Number(quote?.CMswapRate) : Number(CMswapTVL?.exchangeRate || 0);
                    const rates = { CMswap: CMRate, };
                    const validRates = Object.entries(rates).filter(([, rate]) => rate > 0);
                    if (validRates.length === 0) return;
                    const sortedEntries = validRates.sort((a, b) => b[1] - a[1]);
                    const [bestPool, bestRate] = sortedEntries[0];
                    setBestPool(bestPool);
                    if (poolSelect === "") setPoolSelect(bestPool);
                } catch (error) {
                    console.error("Error fetching quote or processing rates:", error);
                }
            }
        };
        fetchQuoteAndSetPool();
    }, [CMswapTVL, amountA]);

    React.useEffect(() => {setPoolSelect(""); setFeeSelect(10000);}, [tokenA, tokenB])

    return (
        <div className='space-y-2'>
            <SwapTokenPanel
                label="From"
                tokenAddress={tokenA.value}
                onTokenAddressChange={value => {
                    if (value !== '0x') {
                        setTokenA({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico', decimal: 18 })
                    } else {
                        setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
                    }
                }}
                amount={amountA}
                onAmountChange={value => {
                    setAmountA(value)
                    getQoute(value)
                }}
                amountAutoFocus
                selectedToken={tokenA}
                tokens={tokens}
                onSelectToken={token => {
                    setTokenA(token)
                    updateURLWithTokens(token.value, tokenB?.value)
                }}
                popoverOpen={open}
                onPopoverOpenChange={setOpen}
                balanceLabel={tokenABalanceLabel}
                footerContent={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[#00ff9d] text-xs px-2 cursor-pointer"
                        onClick={() => {
                            setAmountA(tokenABalance)
                            getQoute(tokenABalance)
                        }}
                    >
                        MAX
                    </Button>
                }
            />
            <div className="flex justify-center">
                <Button variant="outline" size="icon" className="bg-[#0a0b1e] border border-[#00ff9d]/30 rounded-md h-10 w-10 shadow-md cursor-pointer" onClick={switchToken}>
                    <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
                </Button>
            </div>
            <SwapTokenPanel
                label="To"
                tokenAddress={tokenB.value}
                onTokenAddressChange={value => {
                    if (value !== '0x') {
                        setTokenB({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico', decimal: 18 })
                    } else {
                        setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
                    }
                }}
                amount={amountB}
                amountReadOnly
                selectedToken={tokenB}
                tokens={tokens}
                onSelectToken={token => {
                    setTokenB(token)
                    updateURLWithTokens(tokenA?.value, token.value)
                }}
                popoverOpen={open2}
                onPopoverOpenChange={setOpen2}
                balanceLabel={tokenBBalanceLabel}
            />
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
                            if (!shouldShowTVL) return "";
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
            {(tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountB) !== 0 ?
                <Button className="w-full py-6 px-8 mt-4 font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" onClick={handleSwap}>Swap</Button> :
                <Button disabled className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 mt-4">Swap</Button>
            )}
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
                            {exchangeRate !== '0' && !isNaN(Number(exchangeRate)) ? 
                                <span className="text-[#00ff9d] text-xs px-2 gap-1 hover:cursor-pointer" onClick={() => setSwapDirection(!swapDirection)}>
                                    {swapDirection ? `1 ${tokenB.name} = ${Number(exchangeRate).toFixed(6)} ${tokenA.name}` : `1 ${tokenA.name} = ${isFinite(1 / Number(exchangeRate)) ? (1 / Number(exchangeRate)).toFixed(4) : (0).toFixed(4)} ${tokenB.name}`}
                                </span> : 
                                <span className="text-red-500 px-2">insufficient liquidity</span>
                            }
                            {!wrappedRoute && Number(amountB) > 0 && (
                                <span>[PI: {computePriceImpact(Number(newPrice || '0'), Number(fixedExchangeRate || '0'))}%]</span>
                            )}
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
