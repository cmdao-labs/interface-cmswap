'use client'
import * as React from 'react'
import { createChart, type IChartApi, type ISeriesApi, type Time, CandlestickSeries } from 'lightweight-charts'
import type { SwapChartCandle, SwapChartTimeframe, SwapFeeTier } from '@/components/cmswap/swap/hooks/useSwapChartData'
import { SWAP_CHART_TIMEFRAMES } from '@/components/cmswap/swap/hooks/useSwapChartData'

function getTimestampFromTime(time: Time): number | null {
    if (typeof time === 'number') return time;
    if (typeof time === 'object' && 'timestamp' in time) return (time as { timestamp: number }).timestamp;
    return null;
}
type SwapChartProps = { candles: SwapChartCandle[]; timeframe: SwapChartTimeframe; onTimeframeChange: (value: SwapChartTimeframe) => void; latestPrice: number | null | undefined; latestTimestamp: number | null | undefined; baseLabel: string; quoteLabel: string; pairLabel: string; isLoading: boolean; error: string | null; notFound: boolean; ready: boolean; currentFeeTier: SwapFeeTier | null; }
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
const SwapChart: React.FC<SwapChartProps> = ({candles, timeframe, onTimeframeChange, latestPrice, latestTimestamp, baseLabel, quoteLabel, pairLabel, isLoading, error, notFound, ready, currentFeeTier}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const chartRef = React.useRef<IChartApi | null>(null)
    const candleSeriesRef = React.useRef<ISeriesApi<'Candlestick'> | null>(null)
    const resizeObserverRef = React.useRef<ResizeObserver | null>(null)
    React.useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const chart = createChart(container, {
            width: container.clientWidth,
            height: 320,
            layout: {background: { color: '#0b0b0f' }, textColor: '#d3f7ef'},
            crosshair: { mode: 1 },
            grid: {vertLines: { color: 'rgba(180, 255, 244, 0.05)' }, horzLines: { color: 'rgba(180, 255, 244, 0.05)' }},
            rightPriceScale: {borderVisible: false, scaleMargins: { top: 0.2, bottom: 0.1 }},
            timeScale: {
                borderVisible: false,
                timeVisible: true,
                tickMarkFormatter: (time: Time, tickMarkType: string, locale: string) => {
                    const timestamp = getTimestampFromTime(time);
                    if (timestamp == null) return '';
                    const date = new Date(timestamp * 1000);
                    switch (tickMarkType) {
                        case 'year':
                            return date.getFullYear().toString();
                        case 'month':
                            return `${date.getMonth() + 1}/${date.getFullYear()}`;
                        case 'dayOfMonth':
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                        case 'time':
                            const hh = String(date.getHours()).padStart(2, '0');
                            const mm = String(date.getMinutes()).padStart(2, '0');
                            return `${hh}:${mm}`;
                        case 'timeWithSeconds':
                            const hh2 = String(date.getHours()).padStart(2, '0');
                            const mm2 = String(date.getMinutes()).padStart(2, '0');
                            const ss = String(date.getSeconds()).padStart(2, '0');
                            return `${hh2}:${mm2}:${ss}`;
                        default:
                            return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                    }
                }
            },
            localization: {
                timeFormatter: (time: Time) => {
                    const timestamp = getTimestampFromTime(time);
                    if (timestamp == null) return '';
                    const date = new Date(timestamp * 1000);
                    const hh = String(date.getHours()).padStart(2, '0');
                    const mm = String(date.getMinutes()).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    return `${month}/${dd} ${hh}:${mm}`;
                },
            },
        })
        const candleSeries = chart.addSeries(CandlestickSeries, {upColor: '#31fca5', downColor: '#ff5f7a', borderUpColor: '#31fca5', borderDownColor: '#ff5f7a', wickUpColor: '#31fca5', wickDownColor: '#ff5f7a'})
        chartRef.current = chart
        candleSeriesRef.current = candleSeries
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            chart.applyOptions({width: entry.contentRect.width, height: entry.contentRect.height})
        })
        observer.observe(container)
        resizeObserverRef.current = observer
        return () => {
            observer.disconnect()
            resizeObserverRef.current = null
            chart.remove()
            chartRef.current = null
            candleSeriesRef.current = null
        }
    }, [])
    React.useEffect(() => {
        if (!candleSeriesRef.current) return
        const candleData = candles.map((entry) => ({time: Math.floor(entry.time / 1000) as Time, open: entry.open, high: entry.high, low: entry.low, close: entry.close}))
        candleSeriesRef.current.setData(candleData)
        if (chartRef.current && candleData.length > 0) chartRef.current.timeScale().setVisibleRange({from: candleData[0].time, to: candleData[candleData.length - 1].time});
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
                        <span className="text-2xl font-semibold text-white">{formatValue(latestPrice)}</span>
                        <span className="text-xs text-emerald-300">{baseLabel} / {quoteLabel}</span>
                        <span className="text-xs text-white/40">{formatRelative(latestTimestamp)}</span>
                        {currentFeeTier && <span className="text-xs font-semibold text-cyan-400">{(currentFeeTier.fee / 10000).toFixed(2)}% fee</span>}
                    </div>
                    <p className="text-xs text-white/40">{pairLabel}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {SWAP_CHART_TIMEFRAMES.map((option) => {
                        const active = timeframe === option.value
                        return (<button key={option.value} type="button" onClick={() => onTimeframeChange(option.value)} className={`rounded-full px-3 py-1 text-xs font-semibold transition ${active ? 'border border-emerald-400/80 bg-emerald-500/15 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border border-white/10 bg-slate-900/50 text-white/70 hover:border-white/20 hover:text-white'}`}>{option.label}</button>)
                    })}
                </div>
            </div>
            <div className="relative h-[520px] rounded-xl border border-white/5 bg-slate-950/60">
                <div ref={containerRef} className="absolute inset-0" />
                {candles.length > 0 && (
                    <div className="pointer-events-none absolute left-2 top-2 z-10 rounded bg-black/30 px-2 py-1 text-[11px] text-white/80">
                        <div>
                            <span className="mr-2 opacity-70">OHLC</span>
                            <span className="mr-2">O {formatValue(candles[candles.length - 1]?.open)}</span>
                            <span className="mr-2">H {formatValue(candles[candles.length - 1]?.high)}</span>
                            <span className="mr-2">L {formatValue(candles[candles.length - 1]?.low)}</span>
                            <span>C {formatValue(candles[candles.length - 1]?.close)}</span>
                        </div>
                    </div>
                )}
                {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-sm text-white/60">Loading chart…</div>}
                {!isLoading && statusMessage && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 px-6 text-center text-sm text-white/60">{statusMessage}</div>}
            </div>
        </div>
    )
}

export default SwapChart
