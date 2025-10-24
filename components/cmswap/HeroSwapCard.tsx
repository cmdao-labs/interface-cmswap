'use client'
import React from 'react'
import { ArrowDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from 'use-debounce'
import { useSwapTokenSelection } from '@/components/cmswap/swap/useSwapTokenSelection'
import { useSwapQuote } from '@/components/cmswap/swap/useSwapQuote'
import { SwapTokenPanel } from '@/components/cmswap/swap/SwapTokenPanel'
import { useSwapChain } from '@/components/cmswap/useSwapChain'
import { getDecimals } from '@/components/cmswap/swap/utils'
import { formatUnits, parseUnits } from 'viem'
import { config } from '@/config/reown'

type UIToken = { name: string; value: '0xstring'; logo: string; decimal: number }

export default function HeroSwapCard() {
    const DEFAULT_SAMPLE_AMOUNT = "100"
    const { tokens: chainTokens, qouterV2Contract } = useSwapChain()
    const tokens = chainTokens as readonly UIToken[]
    const { tokenA, tokenB, setTokenA, setTokenB } = useSwapTokenSelection(tokens, {defaultTokenAIndex: 0, defaultTokenBIndex: 2})
    const { resolveTokenAddress, quoteExactInputSingle } = useSwapQuote({config, contract: qouterV2Contract, tokens})
    const [amountA, setAmountA] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [tokenABalance, setTokenABalance] = React.useState("0.0000")
    const [tokenBBalance, setTokenBBalance] = React.useState("0.0000")
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [isQuoteLoading, setIsQuoteLoading] = React.useState(false)
    const tokenABalanceLabel = tokenA.name !== 'Choose Token' ? `${Number(tokenABalance).toFixed(4)} ${tokenA.name}` : '0.0000'
    const tokenBBalanceLabel = tokenB.name !== 'Choose Token' ? `${Number(tokenBBalance).toFixed(4)} ${tokenB.name}` : '0.0000'
    const getQuote = useDebouncedCallback(async (_amount: string) => {
        if (!_amount || Number(_amount) === 0) {
            setAmountB("")
            return
        }
        if (!config || !qouterV2Contract) {
            const mockRate = 0.95
            const mockAmountOut = Number(_amount) * mockRate
            setAmountB(mockAmountOut.toFixed(6))
            return
        }
        setIsQuoteLoading(true)
        try {
            const amountForQuote = Number(_amount) > 0 ? _amount : DEFAULT_SAMPLE_AMOUNT
            try {
                const quoteOutput = await quoteExactInputSingle({
                    tokenIn: tokenA,
                    tokenOut: tokenB,
                    amount: amountForQuote,
                    fee: 3000,
                    parseAmount: (value: string) => parseUnits(value, getDecimals(tokenA)),
                    suppressErrors: true
                })
                if (quoteOutput) {
                    const out = Number(formatUnits(quoteOutput.amountOut, getDecimals(tokenB)))
                    setAmountB(out.toFixed(6))
                } else {
                    const mockRate = 0.95
                    const mockAmountOut = Number(amountForQuote) * mockRate
                    setAmountB(mockAmountOut.toFixed(6))
                }
            } catch (quoteError) {
                console.warn('Quote failed, using fallback:', quoteError)
                const mockRate = 0.95
                const mockAmountOut = Number(amountForQuote) * mockRate
                setAmountB(mockAmountOut.toFixed(6))
            }
        } catch (error) {
            console.error('Quote error:', error)
            setAmountB("")
        } finally {
            setIsQuoteLoading(false)
        }
    }, 800)
    const handleAmountChange = (value: string) => {
        setAmountA(value)
        getQuote(value)
    }
    const handleSwapClick = () => {
        const params = new URLSearchParams()
        if (tokenA.value !== '0x' as '0xstring') params.set('from', tokenA.value)
        if (tokenB.value !== '0x' as '0xstring') params.set('to', tokenB.value)
        if (amountA) params.set('amount', amountA)
        window.location.href = `/swap${params.toString() ? '?' + params.toString() : ''}`
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="rounded-2xl border border-[#00FF41]/20 bg-black/40 backdrop-blur-md p-4 space-y-3">
                <SwapTokenPanel
                    label="From"
                    tokenAddress={tokenA.value}
                    onTokenAddressChange={value => {if (value !== '0x') setTokenA({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico', decimal: 18 }); else setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })}}
                    amount={amountA}
                    onAmountChange={handleAmountChange}
                    amountAutoFocus
                    selectedToken={tokenA}
                    tokens={tokens}
                    onSelectToken={token => setTokenA(token)}
                    popoverOpen={open}
                    onPopoverOpenChange={setOpen}
                    balanceLabel={tokenABalanceLabel}
                    footerContent={<Button variant="ghost" size="sm" className="h-7 rounded-full bg-slate-800/80 px-3 text-[11px] font-semibold text-slate-200 hover:bg-slate-800 cursor-pointer" onClick={() => setAmountA(tokenABalance)}>MAX</Button>}
                />
                <div className="flex justify-center">
                    <Button type="button" variant="outline" size="icon" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00FF41]/30 bg-black/50 text-[#00FF41] hover:bg-[#00FF41]/10 hover:border-[#00FF41]/50 transition-all">
                        <ArrowDown className="h-4 w-4" />
                    </Button>
                </div>
                <SwapTokenPanel
                    label="To"
                    tokenAddress={tokenB.value}
                    onTokenAddressChange={value => {if (value !== '0x') setTokenB({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico', decimal: 18 }); else setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })}}
                    amount={amountB}
                    amountReadOnly
                    selectedToken={tokenB}
                    tokens={tokens}
                    onSelectToken={token => setTokenB(token)}
                    popoverOpen={open2}
                    onPopoverOpenChange={setOpen2}
                    balanceLabel={tokenBBalanceLabel}
                />
                <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-[#00FF41] to-emerald-500 text-black font-semibold hover:from-[#00FF41]/90 hover:to-emerald-400/90 transition-all shadow-lg shadow-[#00FF41]/20" onClick={handleSwapClick} disabled={!amountA || !amountB || isQuoteLoading}>
                    {isQuoteLoading ? 'Quoting...' : 'Swap'}
                </Button>
            </div>
        </div>
    )
}
