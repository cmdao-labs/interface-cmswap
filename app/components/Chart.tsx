'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CrosshairMode,
  CandlestickData,
  Time,
} from 'lightweight-charts';

type RawData = { time: number; price: number; volume: number };
type Candle = { time: number; open: number; high: number; low: number; close: number; volume: number };

function aggregateCandlesWithFill(data: RawData[], intervalMs: number): Candle[] {
  if (data.length === 0) return [];

  // 1. เรียงข้อมูลตามเวลา
  const sorted = [...data].sort((a, b) => a.time - b.time);

  // 2. คำนวณช่วงเวลาเริ่ม-จบ
  const start = Math.floor(sorted[0].time / intervalMs) * intervalMs;
  const end = Math.floor(sorted[sorted.length - 1].time / intervalMs) * intervalMs;

  const bucketMap = new Map<number, RawData[]>();

  // 3. จัดกลุ่มข้อมูลลง bucket ตาม interval
  for (const point of sorted) {
    const bucketTime = Math.floor(point.time / intervalMs) * intervalMs;
    if (!bucketMap.has(bucketTime)) bucketMap.set(bucketTime, []);
    bucketMap.get(bucketTime)!.push(point);
  }

  const result: Candle[] = [];
  let previousClose = sorted[0].price;

  // 4. วนลูปทุกช่วงเวลาตาม interval และเติมช่องว่าง
  for (let time = start; time <= end; time += intervalMs) {
    const bucket = bucketMap.get(time);

    let candle: Candle;
    if (bucket && bucket.length > 0) {
      candle = {
        time: time / 1000,
        open: bucket[0].price,
        high: Math.max(...bucket.map(d => d.price)),
        low: Math.min(...bucket.map(d => d.price)),
        close: bucket[bucket.length - 1].price,
        volume: bucket.reduce((sum, d) => sum + d.volume, 0),
      };
      previousClose = candle.close;
    } else {
      // กรณีไม่มี transaction: สร้างแท่งว่าง
      candle = {
        time: time / 1000,
        open: previousClose,
        high: previousClose,
        low: previousClose,
        close: previousClose,
        volume: 0,
      };
    }

    result.push(candle);
  }

  return result;
}

function aggregateCandles(data: RawData[], intervalMs: number): Candle[] {
  if (data.length === 0) return [];

  const sorted = [...data].sort((a, b) => a.time - b.time);
  const start = Math.floor(sorted[0].time / intervalMs) * intervalMs;
  const end = Math.floor(sorted[sorted.length - 1].time / intervalMs) * intervalMs;

  const bucketMap = new Map<number, RawData[]>();
  for (const point of sorted) {
    const bucketTime = Math.floor(point.time / intervalMs) * intervalMs;
    if (!bucketMap.has(bucketTime)) bucketMap.set(bucketTime, []);
    bucketMap.get(bucketTime)!.push(point);
  }

  const result: Candle[] = [];
  let previousClose = sorted[0].price;

  for (let time = start; time <= end; time += intervalMs) {
    const bucket = bucketMap.get(time);
    let open = previousClose;
    let close = previousClose;
    let high = previousClose;
    let low = previousClose;
    let volume = 0;

    if (bucket && bucket.length > 0) {
      const prices = bucket.map(d => d.price);
      close = bucket[bucket.length - 1].price;
      high = Math.max(previousClose, ...prices);
      low = Math.min(previousClose, ...prices);
      volume = bucket.reduce((sum, d) => sum + d.volume, 0);
    }

    result.push({
      time: time / 1000,
      open,
      high,
      low,
      close,
      volume,
    });

    previousClose = close;
  }

  return result;
}

function formatDecimal(value: number): string {
  if (value === 0) return '0';
  const str = value.toString();
  if (!str.includes('.')) {
    return str;
  }

  const [intPart, decPart] = str.split('.');
  const decTruncated = decPart.slice(0, 9);
  if (decTruncated === '' || /^0+$/.test(decTruncated)) {
    return intPart;
  }
  let decimalsToShow = Math.min(6, decTruncated.length);
  let decShown = decTruncated.slice(0, decimalsToShow);
  decShown = decShown.replace(/0+$/, '');
  if (decShown.length === 0) decShown = '0';

  return `${intPart}.${decShown}`;
}

function toDateStr(timestamp: number): string {
  const d = new Date(timestamp * 1000);
  return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}-${d.getUTCDate().toString().padStart(2, '0')} ${d
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}:${d
        .getUTCSeconds()
        .toString()
        .padStart(2, '0')}`;
}


const INTERVAL_OPTIONS = [
  /*   { label: '1m', value: 60 * 1000 }, */
  { label: '5m', value: 5 * 60 * 1000 },
  { label: '15m', value: 15 * 60 * 1000 },
  { label: '1h', value: 60 * 60 * 1000 },
  { label: '4h', value: 4 * 60 * 60 * 1000 },
  { label: 'D', value: 24 * 60 * 60 * 1000 },
];

type CandleDataPoint = {
  time: number;
  price: number;
  volume: number;
};

type ChartProps = {
  data: CandleDataPoint[];
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);

  const [intervalMs, setIntervalMs] = useState(24 * 60 * 60 * 1000); // default 1 D

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      seriesRef.current = null;
    }

    if (!data.length) {
      // สร้าง chart เปล่า ๆ
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: '#1e1e1e' },
          textColor: '#b0f1c1',
        },
        crosshair: { mode: CrosshairMode.Normal },
        grid: {
          vertLines: { color: '#333' },
          horzLines: { color: '#333' },
        },
      });
      chartRef.current = chart;

      const series = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        priceFormat: {
          type: 'price',
          precision: 8,
          minMove: 0.00000001,
        },
      });
      seriesRef.current = series;
      series.setData([]); // กราฟว่างเปล่า

      return () => {
        chart.remove();
        chartRef.current = null;
        seriesRef.current = null;
      };
    }

    // ถ้ามีข้อมูล
    const aggregated = aggregateCandles(data, intervalMs);

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: '#1e1e1e' },
        textColor: '#b0f1c1',
      },
      crosshair: { mode: CrosshairMode.Normal },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      rightPriceScale: {
      autoScale: false, // 
      alignLabels: true,
      borderVisible: true,
      scaleMargins: {
        top: 0.2,
        bottom: 0.2,
        },
      },
    timeScale: {
      timeVisible: true,      
      secondsVisible: false,   
      minBarSpacing: 5,    
    },
    });
    chartRef.current = chart;

    const series = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      priceFormat: {
        type: 'price',
        precision: 8,
        minMove: 0.00000001,
      },
    });
    seriesRef.current = series;

    const formatted: CandlestickData[] = aggregated.map(c => ({
      time: Math.floor(c.time) as Time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    series.setData(formatted);

    const toolTip = tooltipRef.current!;
    toolTip.style.display = 'none';

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.point || !param.time || !param.seriesData.has(series)) {
        toolTip.style.display = 'none';
        return;
      }

      const data = param.seriesData.get(series) as any;
      const timeStr = toDateStr(param.time as number);
      const volume = aggregated.find((d) => d.time === param.time)?.volume ?? '-';
      const candle = data as { open: number; high: number; low: number; close: number };
      const change = candle.close - candle.open;
      const changePercent = candle.open !== 0 ? (change / candle.open) * 100 : 0;

      if (infoBarRef.current) {
        const color = change >= 0 ? 'green' : 'red';

        infoBarRef.current.innerHTML = `
          O<span style="color:${color};">${Number(candle.open).toFixed(10).replace(/\.?0+$/, "")}</span>
          H<span style="color:${color};">${Number(candle.high).toFixed(10).replace(/\.?0+$/, "")}</span>
          L<span style="color:${color};">${Number(candle.low).toFixed(10).replace(/\.?0+$/, "")}</span>
          C<span style="color:${color};">${Number(candle.close).toFixed(10).replace(/\.?0+$/, "")}</span>
          <span style="color:${color};">
            ${change >= 0 ? '+' : ''}${Number(change).toFixed(10).replace(/\.?0+$/, "")}
          </span>
          (<span style="color:${color};">
            ${changePercent >= 0 ? '+' : ''}${Number(changePercent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
          </span>)

        `.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      }


        toolTip.style.display = 'block';
        toolTip.style.left = `${param.point.x + 10}px`;
        toolTip.style.top = `${param.point.y + 10}px`;
        toolTip.innerHTML = `
        <div style="
          display: grid;
          grid-template-columns: max-content auto;
          gap: 4px 12px;
          background-color: rgba(0, 0, 0, 0.4);
          color: white;
          padding: 8px;
          font-size: 12px;
          border: 1px solid #666;
          border-radius: 6px;
          white-space: pre;
        ">
          <div><strong>Time:</strong></div><div style="color:#26a69a">${timeStr}</div>
          <div><strong>Open:</strong></div><div style="color:#26a69a">${Number(data.open).toFixed(10).replace(/\.?0+$/, "")}</div>
          <div><strong>High:</strong></div><div style="color:#26a69a">${Number(data.high).toFixed(10).replace(/\.?0+$/, "")}</div>
          <div><strong>Low:</strong></div><div style="color:#26a69a">${Number(data.low).toFixed(10).replace(/\.?0+$/, "")}</div>
          <div><strong>Close:</strong></div><div style="color:#26a69a">${Number(data.close).toFixed(10).replace(/\.?0+$/, "")}</div>
          <div><strong>Volume:</strong></div><div style="color:#26a69a">${volume.toLocaleString()}</div>
        </div>
      `;


    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        chart.resize(entry.contentRect.width, 400);
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [intervalMs, data]);

  return (
    <div>
      <div className="relative overflow-visible w-full h-full">
        <div ref={chartContainerRef} className="w-full h-full" />

        {/* No infomation */}
        {data.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col space-y-1 bg-[rgba(30,30,30,0.7)] p-2 rounded">
            <div className="flex items-center">
              <p>No transactions found. Please perform a transaction and wait for 5 minutes.</p>
            </div>
          
          </div>
        ) : null}
        {/* Time Selector + InfoBar */}
        <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1 bg-opacity-80 p-2 rounded">
          <div className="flex items-center">
            <label className="text-white mr-2 text-xs">Time:</label>
            {INTERVAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setIntervalMs(opt.value)}
                className={`mr-1.5 px-1.5 py-0.5 text-xs cursor-pointer ${intervalMs === opt.value ? 'text-teal-400' : 'text-white'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          <span
          ref={infoBarRef}
            className="text-white text-[12px] font-mono whitespace-pre text-left"
            >
            
          </span>
          </div>

          <div
            
          ></div>
        </div>

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute top-0 left-0 hidden  text-white  p-2 text-xs pointer-events-none z-50 rounded whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export default Chart;