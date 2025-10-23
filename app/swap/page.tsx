'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from "@/components/ui/card"
import ErrorModal from '@/components/cmswap/error-modal'
import Swap from '@/components/cmswap/Swap'

export type SwapPoolInfo = {
    pool: string
    feeTier?: number
    isAutoFee?: boolean
}
import Liquidity from '@/components/cmswap/Liquidity'
import Positions from '@/components/cmswap/Positions'
import { useSearchParams } from 'next/navigation'
import SendTokenComponent from '@/components/cmswap/SendToken'
import SwapChart from '@/components/cmswap/swap/SwapChart'
import { useSwapChain } from '@/components/cmswap/useSwapChain'
import { useSwapTokenSelection } from '@/components/cmswap/swap/useSwapTokenSelection'
import { useSwapChartData, type SwapChartTimeframe } from '@/components/cmswap/swap/hooks/useSwapChartData'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()
    const searchParams = useSearchParams();
    const tabValue = searchParams.get("tab") ?? "swap"; 
    const [isChartOpen, setIsChartOpen] = React.useState(false)
    const [chartTimeframe, setChartTimeframe] = React.useState<SwapChartTimeframe>('5m')
    const [currentPoolInfo, setCurrentPoolInfo] = React.useState<SwapPoolInfo | null>(null)
    const { tokens: chainTokens, toWrapped, chainId: swapChainId } = useSwapChain()
    const { tokenA, tokenB } = useSwapTokenSelection(chainTokens as any, { defaultTokenAIndex: 0, defaultTokenBIndex: 2})
    const resolveChartAddress = React.useCallback((token: any) => {
        if (!token || !token.value || token.value === '0x') return null
        try { return String(toWrapped(token.value)).toLowerCase() } catch { return String(token.value).toLowerCase() }
    }, [toWrapped])
    const chartTokenAAddress = React.useMemo(() => resolveChartAddress(tokenA), [resolveChartAddress, tokenA])
    const chartTokenBAddress = React.useMemo(() => resolveChartAddress(tokenB), [resolveChartAddress, tokenB])
    const formatTokenLabel = (t: any) => (t?.name && t.name !== 'Choose Token') ? t.name : (t?.value ? `${String(t.value).slice(0,6)}...${String(t.value).slice(-4)}` : '--')
    const chartBaseLabel = formatTokenLabel(tokenB)
    const chartQuoteLabel = formatTokenLabel(tokenA)
    const chartPairLabel = `${chartBaseLabel} / ${chartQuoteLabel}`
    const { candles, latest, isLoading: chartLoading, error: chartError, notFound: chartNotFound, refresh: refreshChart, currentFeeTier } = useSwapChartData({
        baseToken: chartTokenBAddress ?? undefined,
        quoteToken: chartTokenAAddress ?? undefined,
        timeframe: chartTimeframe,
        chainId: swapChainId,
        enabled: isChartOpen && !!chartTokenAAddress && !!chartTokenBAddress,
        selectedFeeTier: currentPoolInfo?.pool === 'CMswap' ? currentPoolInfo.feeTier : undefined,
    })
    const chartLatestPrice = React.useMemo(() => {
        console.log('🔍 SwapChart - Debugging price calculation:')
        console.log('  latest.price:', latest?.price)
        console.log('  candles.length:', candles.length)
        console.log('  last candle close:', candles.length > 0 ? candles[candles.length - 1].close : 'N/A')

        let result = null
        if (latest?.price != null) {
            result = latest.price
            console.log('  ✅ Using latest.price:', result)
        } else if (candles.length > 0) {
            result = candles[candles.length - 1].close
            console.log('  ✅ Using last candle close:', result)
        } else {
            console.log('  ❌ No price data available')
        }

        console.log('  Final chartLatestPrice:', result)
        return result
    }, [latest, candles])
    const chartLatestTimestamp = React.useMemo(() => {
        console.log('🕐 SwapChart - Debugging timestamp calculation:')
        console.log('  latest.timestamp:', latest?.timestamp)
        console.log('  last candle time:', candles.length > 0 ? candles[candles.length - 1].time : 'N/A')

        let result = null
        if (latest?.timestamp != null) {
            result = latest.timestamp
            console.log('  ✅ Using latest.timestamp:', result)
        } else if (candles.length > 0) {
            result = candles[candles.length - 1].time
            console.log('  ✅ Using last candle time:', result)
        } else {
            console.log('  ❌ No timestamp data available')
        }

        console.log('  Final chartLatestTimestamp:', result)
        return result
    }, [latest, candles])
    const gridActive = isChartOpen && tabValue === 'swap'
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-gradient-to-br from-slate-700 via-black to-emerald-900">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <div className={gridActive ? 'grid w-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:grid-cols-[2fr_1fr] gap-4 mt-[100px] mb-8 px-4' : 'w-full max-w-xl mx-auto mt-[100px] mb-8 px-4'}>
                {gridActive && (
                    <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-2">
                        <SwapChart
                        candles={candles}
                        timeframe={chartTimeframe}
                        onTimeframeChange={setChartTimeframe}
                        latestPrice={chartLatestPrice}
                        latestTimestamp={chartLatestTimestamp}
                        baseLabel={chartBaseLabel}
                        quoteLabel={chartQuoteLabel}
                        pairLabel={chartPairLabel}
                        isLoading={chartLoading}
                        error={chartError}
                        notFound={chartNotFound}
                        ready={Boolean(chartTokenAAddress && chartTokenBAddress)}
                        onRefresh={refreshChart}
                        currentFeeTier={currentFeeTier}
                    />
                    </div>
                )}
                <Card className={gridActive ? 'w-full bg-water-950 border border-[#00ff9d]/20 rounded-lg overflow-hidden p-2' : 'w-full bg-water-950 border border-[#00ff9d]/20 rounded-lg overflow-hidden p-2'}>
                <div className="px-4">
                    <Tabs defaultValue={tabValue} className="w-full sticky">
                        <TabsList className="w-full grid grid-cols-4 bg-[#0a0b1e] rounded-md p-1 mb-4">
                            <TabsTrigger value="swap" className=" text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Swap</TabsTrigger>
                            <TabsTrigger value="liquidity" className=" text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Liquidity</TabsTrigger>
                            <TabsTrigger value="position" className=" text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Positions</TabsTrigger>
                            <TabsTrigger value="send" className=" text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Send</TabsTrigger>
                        </TabsList>
                        <TabsContent value="swap">
                            <Swap
                            setIsLoading={setIsLoading}
                            setErrMsg={setErrMsg}
                            isChartOpen={isChartOpen}
                            onToggleChart={() => setIsChartOpen(v => !v)}
                            onPoolInfoChange={setCurrentPoolInfo}
                        />
                        </TabsContent>
                        <TabsContent value="send">
                            <SendTokenComponent chainConfig={Number(chainId)} setIsLoading={setIsLoading} setErrMsg={setErrMsg} />
                        </TabsContent>
                        <TabsContent value="liquidity">
                            <Liquidity setIsLoading={setIsLoading} setErrMsg={setErrMsg} />
                        </TabsContent>
                        <TabsContent value="position">
                            <Positions setIsLoading={setIsLoading} setErrMsg={setErrMsg} />
                        </TabsContent>
                    </Tabs>
                </div>
                </Card>
            </div>
        </div>
    )
}
