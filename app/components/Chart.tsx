'use client';
import React, {useCallback, useEffect, useMemo, useRef, useState,} from 'react';
import {CandlestickData, BarData, CrosshairMode, HistogramData, IChartApi, ISeriesApi, LineData, LineStyle, MouseEventParams, Time, createChart, LineSeries, HistogramSeries, CandlestickSeries,} from 'lightweight-charts';
import {Maximize2, Minimize2,} from 'lucide-react';

type RawPoint = {
    time: number; // milliseconds (epoch)
    price: number;
    volume: number;
};

type Candle = {
    time: number; // seconds (epoch)
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

const TIMEFRAMES = [
    { label: '1m', value: 1 * 60 * 1000 },
    { label: '5m', value: 5 * 60 * 1000 },
    { label: '15m', value: 15 * 60 * 1000 },
    { label: '1h', value: 60 * 60 * 1000 },
    { label: '4h', value: 4 * 60 * 60 * 1000 },
    { label: '1D', value: 24 * 60 * 60 * 1000 },
    { label: '1W', value: 7 * 24 * 60 * 60 * 1000 },
    { label: '1M', value: 30 * 24 * 60 * 60 * 1000 },
] as const;

type ChartProps = {data: RawPoint[];};

function aggregateCandlesWithFill(points: RawPoint[], intervalMs: number): Candle[] {
    if (points.length === 0) return [];
    const sorted = [...points].sort((a, b) => a.time - b.time);
    const buckets = new Map<number, RawPoint[]>();
    const start = Math.floor(sorted[0].time / intervalMs) * intervalMs;
    const end = Math.floor(sorted[sorted.length - 1].time / intervalMs) * intervalMs;
    for (const point of sorted) {
        const bucketTime = Math.floor(point.time / intervalMs) * intervalMs;
        if (!buckets.has(bucketTime)) buckets.set(bucketTime, []);
        buckets.get(bucketTime)!.push(point);
    }
    const candles: Candle[] = [];
    let previousClose = sorted[0].price;
    for (let t = start; t <= end; t += intervalMs) {
        const bucket = buckets.get(t) ?? [];
        if (bucket.length === 0) {
            candles.push({
                time: Math.floor(t / 1000),
                open: previousClose,
                high: previousClose,
                low: previousClose,
                close: previousClose,
                volume: 0,
            });
            continue;
        }
        const open = bucket[0].price;
        const close = bucket[bucket.length - 1].price;
        let high = Number.NEGATIVE_INFINITY;
        let low = Number.POSITIVE_INFINITY;
        let volume = 0;
        for (const entry of bucket) {
            if (entry.price > high) high = entry.price;
            if (entry.price < low) low = entry.price;
            volume += entry.volume;
        }
        candles.push({time: Math.floor(t / 1000), open, high, low, close, volume,});
        previousClose = close;
    }
    return candles;
}

function toUTCString(timestampSec: number): string {
    const date = new Date(timestampSec * 1000);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} UTC`;
}

function tidyNumber(value: number): string {
    if (!Number.isFinite(value)) return '-';
    if (value === 0) return '0';
    const abs = Math.abs(value);
    if (abs >= 1) return value.toFixed(4).replace(/\.0+$/, '').replace(/0+$/, '').replace(/\.$/, '');
    return value.toPrecision(6).replace(/0+$/, '').replace(/\.$/, '');
}

function getTimestampFromTime(time: Time): number | null {
    if (typeof time === 'number') return time;
    if (typeof time === 'object' && 'timestamp' in time) return (time as { timestamp: number }).timestamp;
    return null;
}

type Metric = 'price' | 'mcap';

const MARKET_CAP_SUPPLY = 1_000_000_000; // default assumed supply for mcap calc

const Chart: React.FC<ChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const [timeframe, setTimeframe] = useState<number>(60 * 60 * 1000);
    const [metric, setMetric] = useState<Metric>('mcap');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const transformedData = useMemo(() => {
        if (metric === 'price') return data;
        return data.map((p) => ({ ...p, price: p.price * MARKET_CAP_SUPPLY }));
    }, [data, metric]);
    const candles = useMemo(() => aggregateCandlesWithFill(transformedData, timeframe), [transformedData, timeframe]);
    const candlestickSeriesData: CandlestickData[] = useMemo(() => candles.map((candle) => ({
        time: candle.time as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
    })), [candles]);
    const volumeSeriesData: HistogramData[] = useMemo(() => candles.map((candle) => ({
        time: candle.time as Time,
        value: candle.volume,
        color:
        candle.close >= candle.open ? 'rgba(0, 255, 170, 0.6)' : 'rgba(255, 82, 120, 0.6)',
    })), [candles]);
    const timeIndexMap = useMemo(() => {
        const map = new Map<number, number>();
        candles.forEach((candle, index) => {map.set(candle.time, index)});
        return map;
    }, [candles]);

    const candlesRef = useRef<Candle[]>(candles);
    const timeIndexMapRef = useRef(timeIndexMap);

    useEffect(() => {candlesRef.current = candles}, [candles]);
    useEffect(() => {timeIndexMapRef.current = timeIndexMap}, [timeIndexMap]);

    const formatCompact = (value: number): string => {
        if (!Number.isFinite(value)) return '-';
        try {
            return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value);
        } catch {
            return tidyNumber(value);
        }
    };

    const formatByMetric = useCallback((value: number) => (metric === 'mcap' ? formatCompact(value) : tidyNumber(value)), [metric]);

    const updateInfoBar = useCallback((index: number | null) => {
        const infoEl = infoRef.current;
        const list = candlesRef.current;
        if (!infoEl || list.length === 0) {
            if (infoEl) infoEl.textContent = 'No data';
            return;
        }
        const idx = index == null ? list.length - 1 : Math.max(0, Math.min(index, list.length - 1));
        const candle = list[idx];
        if (!candle) return;
        const change = candle.close - candle.open;
        const changePct = candle.open !== 0 ? (change / candle.open) * 100 : 0;
        const maParts: string[] = [];

        const directionColor = change >= 0 ? '#31fca5' : '#ff5f7a';

        infoEl.innerHTML = `
            <span class="text-xs text-emerald-200">CMSWAP-PUMP · ${metric === 'mcap' ? 'MCap' : 'Price'}</span>
            <div>
                <span class="text-xs text-white/70">O <span style="color:${directionColor}">${formatByMetric(candle.open)}</span></span>
                <span class="text-xs text-white/70">H <span style="color:${directionColor}">${formatByMetric(candle.high)}</span></span>
                <span class="text-xs text-white/70">L <span style="color:${directionColor}">${formatByMetric(candle.low)}</span></span>
                <span class="text-xs text-white/70">C <span style="color:${directionColor}">${formatByMetric(candle.close)}</span></span>
            </div>
            <span class="text-xs" style="color:${directionColor}">${change >= 0 ? '+' : ''}${formatByMetric(change)} (${changePct >= 0 ? '+' : ''}${tidyNumber(changePct)}%)</span>
            ${maParts.length ? `<span class="text-xs text-white/60">${maParts.join(' · ')}</span>` : ''}
        `.replace(/\s+/g, ' ').trim();
    }, [formatByMetric, metric]);

    useEffect(() => {updateInfoBar(null);}, [candles.length, updateInfoBar]);

    useEffect(() => {
        const container = chartContainerRef.current;
        if (!container) return;
        const chart = createChart(container, {
            width: container.clientWidth,
            height: container.clientHeight,
            layout: {
                background: { color: '#0b0b0d' },
                textColor: '#bdfbe2',
                attributionLogo: true,
            },
            grid: {
                vertLines: { color: 'rgba(180, 255, 231, 0.12)' },
                horzLines: { color: 'rgba(180, 255, 231, 0.12)' },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
                vertLine: {
                    color: 'rgba(0, 255, 194, 0.4)',
                    width: 1,
                    style: LineStyle.Solid,
                    labelBackgroundColor: 'rgba(0, 255, 194, 0.1)',
                },
                horzLine: {
                    color: 'rgba(0, 255, 194, 0.4)',
                    width: 1,
                    style: LineStyle.Solid,
                    labelBackgroundColor: 'rgba(0, 255, 194, 0.1)',
                },
            },
            rightPriceScale: {
                borderVisible: false,
                autoScale: true,
                scaleMargins: {top: 0.1, bottom: 0.25},
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: timeframe <= 15 * 60 * 1000,
                borderVisible: false,
            },
            localization: {
                timeFormatter: (time: Time) => {
                const timestamp = getTimestampFromTime(time);
                if (timestamp == null) return '';
                    const date = new Date(timestamp * 1000);
                    const hh = String(date.getUTCHours()).padStart(2, '0');
                    const mm = String(date.getUTCMinutes()).padStart(2, '0');
                    const dd = String(date.getUTCDate()).padStart(2, '0');
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    return `${month}/${dd} ${hh}:${mm} UTC`;
                },
            },
            handleScale: {
                axisPressedMouseMove: true,
                mouseWheel: true,
                pinch: true,
            },
            handleScroll: {
                vertTouchDrag: true,
                horzTouchDrag: true,
                mouseWheel: true,
                pressedMouseMove: true,
            },
        });

        chartRef.current = chart;

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#00ffb4',
            downColor: '#ff5f7a',
            borderUpColor: '#00ffd0',
            borderDownColor: '#ff7a95',
            wickUpColor: '#00ffd0',
            wickDownColor: '#ff7a95',
            priceFormat: {
                type: 'price',
                precision: metric === 'mcap' ? 2 : 8,
                minMove: metric === 'mcap' ? 0.01 : 0.00000001,
            },
            lastValueVisible: true,
            priceLineVisible: true,
        });
        candleSeriesRef.current = candleSeries;
        const volumeSeries = chart.addSeries(HistogramSeries, {priceScaleId: 'volume', base: 0, priceFormat: { type: 'volume' }});
        volumeSeriesRef.current = volumeSeries;
        volumeSeries.priceScale().applyOptions({scaleMargins: {top: 0.75, bottom: 0}});

        const tooltipEl = tooltipRef.current;

        const handleCrosshairMove = (param: MouseEventParams<Time>) => {
            const point = param.point;
            const time = param.time;
            const seriesMap = param.seriesData;
            const tooltip = tooltipEl;
            const candleSeriesInstance = candleSeriesRef.current;

            if (!point || time == null || !tooltip || !candleSeriesInstance) {
                if (tooltip) tooltip.style.display = 'none';
                updateInfoBar(null);
                return;
            }

            const timestamp = getTimestampFromTime(time as Time);
            if (timestamp == null) {
                tooltip.style.display = 'none';
                updateInfoBar(null);
                return;
            }

            const index = timeIndexMapRef.current.get(timestamp);
            if (index == null) {
                tooltip.style.display = 'none';
                updateInfoBar(null);
                return;
            }

            const candleData = seriesMap.get(candleSeriesInstance) as BarData<Time> | undefined;
            if (!candleData) {
                tooltip.style.display = 'none';
                updateInfoBar(null);
                return;
            }

            const volume = candlesRef.current[index]?.volume ?? 0;

            tooltip.style.display = 'flex';
            const containerWidth = chartContainerRef.current?.clientWidth ?? 0;
            const clampedLeft = Math.max(16, Math.min(point.x + 16, containerWidth - 220));
            tooltip.style.left = `${clampedLeft}px`;
            const containerHeight = chartContainerRef.current?.clientHeight ?? 0;
            const clampedTop = Math.max(16, Math.min(point.y - 120, containerHeight - 160));
            tooltip.style.top = `${clampedTop}px`;
            tooltip.innerHTML = `
                <div class="flex flex-col gap-1">
                    <span class="text-xs text-emerald-200">${toUTCString(timestamp)}</span>
                    <span class="text-xs text-white/90">Open: ${formatByMetric(candleData.open as number)}</span>
                    <span class="text-xs text-white/90">High: ${formatByMetric(candleData.high as number)}</span>
                    <span class="text-xs text-white/90">Low: ${formatByMetric(candleData.low as number)}</span>
                    <span class="text-xs text-white/90">Close: ${formatByMetric(candleData.close as number)}</span>
                    <span class="text-xs text-white/90">Volume: ${tidyNumber(volume)}</span>
                </div>
            `;

            updateInfoBar(index);
        };

        chart.subscribeCrosshairMove(handleCrosshairMove);

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            chart.resize(entry.contentRect.width, entry.contentRect.height);
        });
        observer.observe(container);
        resizeObserverRef.current = observer;

        return () => {
            chart.unsubscribeCrosshairMove(handleCrosshairMove);
            observer.disconnect();
            resizeObserverRef.current = null;
            chart.remove();
            chartRef.current = null;
            candleSeriesRef.current = null;
            volumeSeriesRef.current = null;
        };
    }, [updateInfoBar, metric]);

    useEffect(() => {
        if (!chartRef.current) return;
        chartRef.current.timeScale().applyOptions({secondsVisible: timeframe <= 15 * 60 * 1000});
    }, [timeframe]);

    useEffect(() => {
        const candleSeries = candleSeriesRef.current;
        if (!candleSeries) return;
        candleSeries.setData(candlestickSeriesData);
    }, [candlestickSeriesData]);

    useEffect(() => {
        const candleSeries = candleSeriesRef.current;
        if (!candleSeries) return;
        candleSeries.applyOptions({
            priceFormat: {
                type: 'price',
                precision: metric === 'mcap' ? 2 : 8,
                minMove: metric === 'mcap' ? 0.01 : 0.00000001,
            },
        });
    }, [metric]);

    // useEffect(() => {
    //     const volumeSeries = volumeSeriesRef.current;
    //     if (!volumeSeries) return;
    //     volumeSeries.setData(volumeSeriesData);
    // }, [volumeSeriesData]);

    useEffect(() => {
        if (!chartRef.current) return;

        const resize = () => {
            const container = chartContainerRef.current;
            if (!container || !chartRef.current) return;
            chartRef.current.resize(container.clientWidth, container.clientHeight);
        };

        resize();

        if (isFullscreen) {
            window.addEventListener('resize', resize);
            return () => window.removeEventListener('resize', resize);
        }
    }, [isFullscreen]);

    const handleTimeframeChange = (value: number) => {setTimeframe(value)};

    const fullscreenClass = isFullscreen ? 'fixed inset-6 z-[70] rounded-3xl' : 'relative h-full w-full rounded-3xl';
    const containerStyle = isFullscreen ? { height: 'calc(100vh - 3rem)' } : undefined;

    return (
        <div
            className={`${fullscreenClass} flex flex-col overflow-hidden border border-emerald-400/20 bg-[#0b0b0d] shadow-[0_0_35px_rgba(0,255,170,0.18)]`}
            style={containerStyle}
        >
            <div className="relative flex-1">
                <div ref={chartContainerRef} className="absolute inset-0" />

                {candles.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0b0b0d]/80 text-sm text-white/60">
                        <span>No price action yet.</span>
                        <span className="text-xs text-white/40">Trades will populate the chart automatically.</span>
                    </div>
                )}

                <div className="absolute top-4 left-4 right-24 z-3 overflow-hidden">
                    <div ref={infoRef} className="flex flex-wrap items-center gap-3 font-mono text-[4px] sm:text-[10px] text-emerald-200 truncate" />
                </div>

                {/* <button
                    type="button"
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    className="absolute right-4 top-4 rounded-md border border-emerald-400/40 bg-[#08080c]/80 p-2 text-white/70 transition hover:border-emerald-200 hover:text-white"
                >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button> */}

                <div
                    ref={tooltipRef}
                    className="pointer-events-none absolute hidden max-w-[220px] rounded-md border border-emerald-400/40 bg-[#050509]/95 p-3 text-xs text-white shadow-[0_0_20px_rgba(0,255,170,0.25)]"
                />
            </div>

            <div className="flex h-16 flex-wrap items-center justify-between gap-2 border-t border-white/5 bg-[#050509]/80 px-1 sm:px-3 py-2 mb-5 sm:mb-0">
                <div className="flex items-center sm:gap-2">
                    {TIMEFRAMES.map((option) => {
                        const isActive = timeframe === option.value;
                        return (
                            <button
                                key={option.label}
                                type="button"
                                onClick={() => handleTimeframeChange(option.value)}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                                    isActive ? 'bg-emerald-400/20 text-emerald-200 shadow-[0_0_12px_rgba(0,255,170,0.35)]' : 'text-white/60 hover:text-emerald-200'
                                }`}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-1">
                    {(['price', 'mcap'] as Metric[]).map((m) => {
                        const active = metric === m;
                        const label = m === 'mcap' ? 'MCap' : 'Price';
                        return (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMetric(m)}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                                    active ? 'bg-emerald-400/20 text-emerald-200 shadow-[0_0_12px_rgba(0,255,170,0.35)]' : 'text-white/60 hover:text-emerald-200'
                                }`}
                                aria-pressed={active}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default Chart;
