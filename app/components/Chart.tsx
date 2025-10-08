'use client';
import React, {useCallback, useEffect, useMemo, useRef, useState,} from 'react';
import {CandlestickData, BarData, CrosshairMode, HistogramData, IChartApi, ISeriesApi, LineData, LineStyle, MouseEventParams, Time, createChart, LineSeries, HistogramSeries, CandlestickSeries,} from 'lightweight-charts';
import {Brush, Maximize2, Minimize2, SlidersHorizontal, TrendingUp, Type,} from 'lucide-react';

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

type MAKey = 'ma20' | 'ma50' | 'ma200';

type IndicatorState = {
    ma20: boolean;
    ma50: boolean;
    ma200: boolean;
    bb: boolean;
};

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

function sma(values: number[], length: number): (number | null)[] {
    if (values.length === 0) return [];
    const result: (number | null)[] = new Array(values.length).fill(null);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
        if (i >= length) sum -= values[i - length];
        if (i >= length - 1) result[i] = sum / length;
    }
    return result;
}

function bollingerBands(
    values: number[],
    length: number,
    multiplier: number
): { upper: (number | null)[]; lower: (number | null)[]; basis: (number | null)[] } {
    if (values.length === 0) return {upper: [], lower: [], basis: [],};
    const upper: (number | null)[] = new Array(values.length).fill(null);
    const lower: (number | null)[] = new Array(values.length).fill(null);
    const basis: (number | null)[] = new Array(values.length).fill(null);
    let sum = 0;
    let sumSquares = 0;
    for (let i = 0; i < values.length; i++) {
        const price = values[i];
        sum += price;
        sumSquares += price * price;
        if (i >= length) {
            const toRemove = values[i - length];
            sum -= toRemove;
            sumSquares -= toRemove * toRemove;
        }
        if (i < length - 1) continue;
        const mean = sum / length;
        const variance = sumSquares / length - mean * mean;
        const stdDev = Math.sqrt(Math.max(variance, 0));
        basis[i] = mean;
        upper[i] = mean + multiplier * stdDev;
        lower[i] = mean - multiplier * stdDev;
    }
    return { upper, lower, basis };
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

function buildLineData(
    candles: Candle[],
    values: (number | null)[]
): LineData[] {
    const out: LineData[] = [];
    for (let i = 0; i < candles.length; i++) {
        const val = values[i];
        if (val == null || Number.isNaN(val)) continue;
        out.push({time: candles[i].time as Time, value: val,});
    }
    return out;
}

function getTimestampFromTime(time: Time): number | null {
    if (typeof time === 'number') return time;
    if (typeof time === 'object' && 'timestamp' in time) return (time as { timestamp: number }).timestamp;
    return null;
}

const toolbarButtons = [
    { icon: TrendingUp, label: 'Trendline' },
    { icon: Brush, label: 'Brush' },
    { icon: Type, label: 'Text' },
    { icon: SlidersHorizontal, label: 'Indicators' },
] as const;

const Chart: React.FC<ChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
    const maSeriesRef = useRef<Record<MAKey, ISeriesApi<'Line'> | undefined>>({ma20: undefined, ma50: undefined, ma200: undefined});
    const bbSeriesRef = useRef<{upper?: ISeriesApi<'Line'>; lower?: ISeriesApi<'Line'>; basis?: ISeriesApi<'Line'>;}>({});
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const [timeframe, setTimeframe] = useState<number>(60 * 60 * 1000);
    const [indicatorState, setIndicatorState] = useState<IndicatorState>({ma20: false, ma50: false, ma200: false, bb: false});
    const [isFullscreen, setIsFullscreen] = useState(false);
    const candles = useMemo(() => aggregateCandlesWithFill(data, timeframe), [data, timeframe]);
    const closes = useMemo(() => candles.map((c) => c.close), [candles]);
    const ma20Values = useMemo(() => sma(closes, 20), [closes]);
    const ma50Values = useMemo(() => sma(closes, 50), [closes]);
    const ma200Values = useMemo(() => sma(closes, 200), [closes]);
    const bbValues = useMemo(() => bollingerBands(closes, 20, 2), [closes]);
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
    const maLineData = useMemo(() => ({
        ma20: buildLineData(candles, ma20Values),
        ma50: buildLineData(candles, ma50Values),
        ma200: buildLineData(candles, ma200Values),
    }), [candles, ma20Values, ma50Values, ma200Values]);
    const bbLineData = useMemo(() => ({
        upper: buildLineData(candles, bbValues.upper),
        lower: buildLineData(candles, bbValues.lower),
        basis: buildLineData(candles, bbValues.basis),
    }), [candles, bbValues]);
    const timeIndexMap = useMemo(() => {
        const map = new Map<number, number>();
        candles.forEach((candle, index) => {map.set(candle.time, index)});
        return map;
    }, [candles]);

    const candlesRef = useRef<Candle[]>(candles);
    const maValuesRef = useRef({ ma20: ma20Values, ma50: ma50Values, ma200: ma200Values });
    const bbValuesRef = useRef(bbValues);
    const indicatorStateRef = useRef(indicatorState);
    const timeIndexMapRef = useRef(timeIndexMap);

    useEffect(() => {candlesRef.current = candles}, [candles]);
    useEffect(() => {maValuesRef.current = {ma20: ma20Values, ma50: ma50Values, ma200: ma200Values}}, [ma20Values, ma50Values, ma200Values]);
    useEffect(() => {bbValuesRef.current = bbValues}, [bbValues]);
    useEffect(() => {indicatorStateRef.current = indicatorState}, [indicatorState]);
    useEffect(() => {timeIndexMapRef.current = timeIndexMap}, [timeIndexMap]);

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
        const { ma20, ma50, ma200 } = maValuesRef.current;
        const { upper, lower, basis } = bbValuesRef.current;
        const toggles = indicatorStateRef.current;
        const maParts: string[] = [];
        if (toggles.ma20) {
            const value = ma20[idx];
            maParts.push(`<span class="text-[#f6f169]">MA20 ${value != null ? tidyNumber(value) : '-'}</span>`);
        }
        if (toggles.ma50) {
            const value = ma50[idx];
            maParts.push(`<span class="text-[#5fffd0]">MA50 ${value != null ? tidyNumber(value) : '-'}</span>`);
        }
        if (toggles.ma200) {
            const value = ma200[idx];
            maParts.push(`<span class="text-[#4ca7ff]">MA200 ${value != null ? tidyNumber(value) : '-'}</span>`);
        }
        if (toggles.bb) {
            const upperVal = upper[idx];
            const lowerVal = lower[idx];
            maParts.push(`<span class="text-[#8ee8ff]">BB ${upperVal != null ? tidyNumber(upperVal) : '-'} / ${lowerVal != null ? tidyNumber(lowerVal) : '-'}</span>`);
        }

        const directionColor = change >= 0 ? '#31fca5' : '#ff5f7a';

        infoEl.innerHTML = `
            <span class="text-xs text-emerald-200">${toUTCString(candle.time)}</span>
            <span class="text-xs text-white/70">O <span style="color:${directionColor}">${tidyNumber(candle.open)}</span></span>
            <span class="text-xs text-white/70">H <span style="color:${directionColor}">${tidyNumber(candle.high)}</span></span>
            <span class="text-xs text-white/70">L <span style="color:${directionColor}">${tidyNumber(candle.low)}</span></span>
            <span class="text-xs text-white/70">C <span style="color:${directionColor}">${tidyNumber(candle.close)}</span></span>
            <span class="text-xs" style="color:${directionColor}">${change >= 0 ? '+' : ''}${tidyNumber(change)} (${changePct >= 0 ? '+' : ''}${tidyNumber(changePct)}%)</span>
            ${maParts.length ? `<span class="text-xs text-white/60">${maParts.join(' · ')}</span>` : ''}
        `.replace(/\s+/g, ' ').trim();
    }, []);

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
                precision: 8,
                minMove: 0.00000001,
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
            const { ma20, ma50, ma200 } = maValuesRef.current;
            const { upper, lower, basis } = bbValuesRef.current;
            const toggles = indicatorStateRef.current;

            const maRows: string[] = [];
            if (toggles.ma20) {
                const value = ma20[index];
                maRows.push(`<span class="text-[#f6f169]">MA20: ${value != null ? tidyNumber(value) : '-'}</span>`);
            }
            if (toggles.ma50) {
                const value = ma50[index];
                maRows.push(`<span class="text-[#5fffd0]">MA50: ${value != null ? tidyNumber(value) : '-'}</span>`);
            }
            if (toggles.ma200) {
                const value = ma200[index];
                maRows.push(`<span class="text-[#4ca7ff]">MA200: ${value != null ? tidyNumber(value) : '-'}</span>`);
            }
            if (toggles.bb) {
                maRows.push(`<span class="text-[#8ee8ff]">BB±2σ: ${basis[index] != null ? tidyNumber(basis[index]!) : '-'} / ${upper[index] != null ? tidyNumber(upper[index]!) : '-'} / ${lower[index] != null ? tidyNumber(lower[index]!) : '-'}</span>`);
            }

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
                <span class="text-xs text-white/90">Open: ${tidyNumber(candleData.open)}</span>
                <span class="text-xs text-white/90">High: ${tidyNumber(candleData.high)}</span>
                <span class="text-xs text-white/90">Low: ${tidyNumber(candleData.low)}</span>
                <span class="text-xs text-white/90">Close: ${tidyNumber(candleData.close)}</span>
                <span class="text-xs text-white/90">Volume: ${tidyNumber(volume)}</span>
                ${maRows.length ? `<div class="mt-1 flex flex-col gap-0.5">${maRows.join('')}</div>` : ''}
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
            maSeriesRef.current = { ma20: undefined, ma50: undefined, ma200: undefined };
            bbSeriesRef.current = {};
        };
    }, [updateInfoBar]);

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
        const volumeSeries = volumeSeriesRef.current;
        if (!volumeSeries) return;
        volumeSeries.setData(volumeSeriesData);
    }, [volumeSeriesData]);

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        const seriesConfig: Record<MAKey, { enabled: boolean; color: string; data: LineData[] }> = {
            ma20: { enabled: indicatorState.ma20, color: '#f6f169', data: maLineData.ma20 },
            ma50: { enabled: indicatorState.ma50, color: '#5fffd0', data: maLineData.ma50 },
            ma200: { enabled: indicatorState.ma200, color: '#4ca7ff', data: maLineData.ma200 },
        };

        (Object.keys(seriesConfig) as MAKey[]).forEach((key) => {
            const config = seriesConfig[key];
            const existing = maSeriesRef.current[key];

            if (!config.enabled) {
                if (existing) {
                    chart.removeSeries(existing);
                    maSeriesRef.current[key] = undefined;
                }
                return;
            }

            if (!existing) {
                maSeriesRef.current[key] = chart.addSeries(LineSeries, {
                    color: config.color,
                    lineWidth: 2,
                    lastValueVisible: false,
                    priceLineVisible: false,
                });
            }

            maSeriesRef.current[key]?.setData(config.data);
        });
    }, [indicatorState.ma20, indicatorState.ma50, indicatorState.ma200, maLineData]);

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        if (!indicatorState.bb) {
            if (bbSeriesRef.current.upper) {
                chart.removeSeries(bbSeriesRef.current.upper);
                bbSeriesRef.current.upper = undefined;
            }
            if (bbSeriesRef.current.lower) {
                chart.removeSeries(bbSeriesRef.current.lower);
                bbSeriesRef.current.lower = undefined;
            }
            if (bbSeriesRef.current.basis) {
                chart.removeSeries(bbSeriesRef.current.basis);
                bbSeriesRef.current.basis = undefined;
            }
            return;
        }

        if (!bbSeriesRef.current.upper) {
            bbSeriesRef.current.upper = chart.addSeries(LineSeries, {
                color: 'rgba(142, 232, 255, 0.9)',
                lineWidth: 1,
                priceLineVisible: false,
                lastValueVisible: false,
            });
        }
        if (!bbSeriesRef.current.lower) {
            bbSeriesRef.current.lower = chart.addSeries(LineSeries, {
                color: 'rgba(142, 232, 255, 0.9)',
                lineWidth: 1,
                priceLineVisible: false,
                lastValueVisible: false,
            });
        }
        if (!bbSeriesRef.current.basis) {
            bbSeriesRef.current.basis = chart.addSeries(LineSeries, {
                color: 'rgba(142, 232, 255, 0.6)',
                lineWidth: 1,
                lineStyle: LineStyle.Dotted,
                priceLineVisible: false,
                lastValueVisible: false,
            });
        }

        bbSeriesRef.current.upper?.setData(bbLineData.upper);
        bbSeriesRef.current.lower?.setData(bbLineData.lower);
        bbSeriesRef.current.basis?.setData(bbLineData.basis);
    }, [indicatorState.bb, bbLineData]);

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

    const handleCheckboxToggle = (key: keyof IndicatorState) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = event.target;
        setIndicatorState((prev) => ({ ...prev, [key]: checked }));
    };

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

                <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-3 z-3">
                {toolbarButtons.map(({ icon: Icon, label }) => (
                    <button
                        key={label}
                        type="button"
                        title={label}
                        className="rounded-md border border-emerald-400/30 bg-[#08080c]/80 p-2 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100"
                    >
                        <Icon size={16} strokeWidth={1.5} />
                    </button>
                ))}
                </div>

                <div className="absolute top-4 left-20 right-20 flex flex-wrap items-center justify-between gap-3 z-3">
                    <div
                        ref={infoRef}
                        className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-emerald-200"
                    />

                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/70">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={indicatorState.ma20}
                                onChange={handleCheckboxToggle('ma20')}
                                className="h-4 w-4 cursor-pointer rounded border border-emerald-300/40 bg-transparent accent-emerald-300"
                            />
                            <span className="text-[#f6f169]">MA20</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={indicatorState.ma50}
                                onChange={handleCheckboxToggle('ma50')}
                                className="h-4 w-4 cursor-pointer rounded border border-emerald-300/40 bg-transparent accent-[#5fffd0]"
                            />
                            <span className="text-[#5fffd0]">MA50</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={indicatorState.ma200}
                                onChange={handleCheckboxToggle('ma200')}
                                className="h-4 w-4 cursor-pointer rounded border border-emerald-300/40 bg-transparent accent-[#4ca7ff]"
                            />
                            <span className="text-[#4ca7ff]">MA200</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={indicatorState.bb}
                                onChange={handleCheckboxToggle('bb')}
                                className="h-4 w-4 cursor-pointer rounded border border-emerald-300/40 bg-transparent accent-[#8ee8ff]"
                            />
                            <span className="text-[#8ee8ff]">Bollinger</span>
                        </label>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsFullscreen((prev) => !prev)}
                    className="absolute right-4 top-4 rounded-md border border-emerald-400/40 bg-[#08080c]/80 p-2 text-white/70 transition hover:border-emerald-200 hover:text-white"
                >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                <div
                    ref={tooltipRef}
                    className="pointer-events-none absolute hidden max-w-[220px] rounded-md border border-emerald-400/40 bg-[#050509]/95 p-3 text-xs text-white shadow-[0_0_20px_rgba(0,255,170,0.25)]"
                />
            </div>

            <div className="flex h-16 items-center justify-center sm:gap-2 border-t border-white/5 bg-[#050509]/80 sm:px-4">
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
        </div>
    );
};
export default Chart;
