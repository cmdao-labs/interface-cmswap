'use client'

import * as React from 'react'
import {
    createChart,
    type IChartApi,
    type ISeriesApi,
    type Time,
    CandlestickSeries,
    HistogramSeries,
} from 'lightweight-charts'
import type { SwapChartCandle, SwapChartTimeframe } from '@/components/cmswap/swap/hooks/useSwapChartData'
import { SWAP_CHART_TIMEFRAMES } from '@/components/cmswap/swap/hooks/useSwapChartData'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

type SwapChartProps = {
    candles: SwapChartCandle[]
    timeframe: SwapChartTimeframe
    onTimeframeChange: (value: SwapChartTimeframe) => void
    latestPrice: number | null | undefined
    latestTimestamp: number | null | undefined
    baseLabel: string
    quoteLabel: string
    pairLabel: string
    isLoading: boolean
    error: string | null
    notFound: boolean
    ready: boolean
    onRefresh?: () => void
}

function formatValue(value: number | null | undefined): string {
    if (value === null || value === undefined) return '--'
    const abs = Math.abs(value)
    if (abs >= 1) return value.toFixed(4).replace(/\.0+$/, '').replace(/0+$/, '').replace(/\.$/, '')
    return value.toPrecision(6).replace(/0+$/, '').replace(/\.$/, '')
}

function formatRelative(timestamp: number | null | undefined): string {
    if (!timestamp || !Number.isFinite(timestamp)) return ''
    const now = Date.now()
    const deltaMs = now - (timestamp > 1e12 ? timestamp : timestamp * 1000)
    if (!Number.isFinite(deltaMs)) return ''
    const deltaSec = Math.max(0, Math.floor(deltaMs / 1000))
    if (deltaSec < 60) return `${deltaSec}s ago`
    const deltaMin = Math.floor(deltaSec / 60)
    if (deltaMin < 60) return `${deltaMin}m ago`
    const deltaHours = Math.floor(deltaMin / 60)
    if (deltaHours < 24) return `${deltaHours}h ago`
    const deltaDays = Math.floor(deltaHours / 24)
    return `${deltaDays}d ago`
}

const CHART_HEIGHT = 320

const SwapChart: React.FC<SwapChartProps> = ({
    candles,
    timeframe,
    onTimeframeChange,
    latestPrice,
    latestTimestamp,
    baseLabel,
    quoteLabel,
    pairLabel,
    isLoading,
    error,
    notFound,
    ready,
    onRefresh,
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const chartRef = React.useRef<IChartApi | null>(null)
    const candleSeriesRef = React.useRef<ISeriesApi<'Candlestick'> | null>(null)
    const volumeSeriesRef = React.useRef<ISeriesApi<'Histogram'> | null>(null)
    const resizeObserverRef = React.useRef<ResizeObserver | null>(null)

    React.useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const chart = createChart(container, {
            width: container.clientWidth,
            height: CHART_HEIGHT,
            layout: {
                background: { color: '#0b0b0f' },
                textColor: '#d3f7ef',
            },
            crosshair: { mode: 1 },
            grid: {
                vertLines: { color: 'rgba(180, 255, 244, 0.05)' },
                horzLines: { color: 'rgba(180, 255, 244, 0.05)' },
            },
            rightPriceScale: {
                borderVisible: false,
                scaleMargins: { top: 0.2, bottom: 0.25 },
            },
            timeScale: {
                borderVisible: false,
                timeVisible: true,
            },
        })
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#31fca5',
            downColor: '#ff5f7a',
            borderUpColor: '#31fca5',
            borderDownColor: '#ff5f7a',
            wickUpColor: '#31fca5',
            wickDownColor: '#ff5f7a',
        })
        const volumeSeries = chart.addSeries(HistogramSeries, {
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
            color: 'rgba(49, 252, 165, 0.4)',
        })
        volumeSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.75, bottom: 0 },
        })
        chartRef.current = chart
        candleSeriesRef.current = candleSeries
        volumeSeriesRef.current = volumeSeries

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            chart.applyOptions({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            })
        })
        observer.observe(container)
        resizeObserverRef.current = observer

        return () => {
            observer.disconnect()
            resizeObserverRef.current = null
            chart.remove()
            chartRef.current = null
            candleSeriesRef.current = null
            volumeSeriesRef.current = null
        }
    }, [])

    React.useEffect(() => {
        if (!candleSeriesRef.current || !volumeSeriesRef.current) return
        const candleData = candles.map((entry) => ({
            time: Math.floor(entry.time / 1000) as Time,
            open: entry.open,
            high: entry.high,
            low: entry.low,
            close: entry.close,
        }))
        const volumeData = candles.map((entry) => ({
            time: Math.floor(entry.time / 1000) as Time,
            value: entry.volumeBase ?? 0,
            color: entry.close >= entry.open ? 'rgba(49, 252, 165, 0.45)' : 'rgba(255, 95, 122, 0.45)',
        }))
        candleSeriesRef.current.setData(candleData)
        volumeSeriesRef.current.setData(volumeData)
        if (chartRef.current && candleData.length > 0) {
            chartRef.current.timeScale().setVisibleRange({
                from: candleData[0].time,
                to: candleData[candleData.length - 1].time,
            })
        }
    }, [candles])

    const statusMessage = React.useMemo(() => {
        if (!ready) return 'Select tokens to load the price chart.'
        if (error) return error
        if (!isLoading && candles.length === 0) {
            return notFound ? 'Chart data is not yet available for this pair.' : 'No trades yet for this timeframe.'
        }
        return null
    }, [ready, error, isLoading, candles.length, notFound])

    return (
        <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-950/50 p-4 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-white/40">Price</span>
                    <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-2xl font-semibold text-white">
                            {formatValue(latestPrice)}
                        </span>
                        <span className="text-xs text-emerald-300">
                            {baseLabel} / {quoteLabel}
                        </span>
                        <span className="text-xs text-white/40">
                            {formatRelative(latestTimestamp)}
                        </span>
                    </div>
                    <p className="text-xs text-white/40">{pairLabel}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {SWAP_CHART_TIMEFRAMES.map((option) => {
                        const active = timeframe === option.value
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => onTimeframeChange(option.value)}
                                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                    active
                                        ? 'border border-emerald-400/80 bg-emerald-500/15 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                        : 'border border-white/10 bg-slate-900/50 text-white/70 hover:border-white/20 hover:text-white'
                                }`}
                            >
                                {option.label}
                            </button>
                        )
                    })}
                    {onRefresh && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full border border-white/10 bg-slate-900/50 text-white/70 hover:border-white/30 hover:text-white"
                            onClick={onRefresh}
                            title="Refresh chart"
                        >
                            <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        </Button>
                    )}
                </div>
            </div>
            <div className="relative h-[520px] rounded-xl border border-white/5 bg-slate-950/60">
                <div ref={containerRef} className="absolute inset-0" />
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-sm text-white/60">
                        Loading chart…
                    </div>
                )}
                {!isLoading && statusMessage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 px-6 text-center text-sm text-white/60">
                        {statusMessage}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SwapChart
