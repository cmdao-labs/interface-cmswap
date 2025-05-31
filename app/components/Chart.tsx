'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CrosshairMode,
} from 'lightweight-charts';

type RawData = { time: number; price: number; volume: number };
type Candle = { time: number; open: number; high: number; low: number; close: number; volume: number };

function aggregateCandles_fillMissingTime(data: RawData[], intervalMs: number): Candle[] {
  if (data.length === 0) return [];

  // จัดกลุ่มข้อมูลตาม bucket เวลา interval (หน่วย ms)
  const grouped: { [key: number]: Candle } = {};

  data.forEach((d) => {
    const bucket = Math.floor(d.time / intervalMs) * intervalMs;
    const timeInSeconds = bucket / 1000;

    if (!grouped[bucket]) {
      grouped[bucket] = {
        time: timeInSeconds,
        open: d.price,
        high: d.price,
        low: d.price,
        close: d.price,
        volume: d.volume,
      };
    } else {
      const candle = grouped[bucket];
      candle.high = Math.max(candle.high, d.price);
      candle.low = Math.min(candle.low, d.price);
      candle.close = d.price;
      candle.volume += d.volume;
    }
  });

  // แปลง grouped เป็น array เรียงตามเวลา
  const candles = Object.values(grouped).sort((a, b) => a.time - b.time);

  // เติมแท่งแทนช่วงเวลาที่ขาดหายไป
  const result: Candle[] = [];
  let lastClose = candles[0].open; // เริ่มต้นจากแท่งแรก open เป็น close ก่อนหน้า

  // เวลาปัจจุบัน rounded ลง bucket ล่าสุด
  const now = Date.now();
  const nowBucket = Math.floor(now / intervalMs) * intervalMs;

  // index สำหรับวนแท่งจริง
  let candleIndex = 0;

  // เริ่มจากเวลาของแท่งแรก
  let currentBucket = Math.floor(candles[0].time * 1000 / intervalMs) * intervalMs;

  while (currentBucket <= nowBucket) {
    if (
      candleIndex < candles.length &&
      candles[candleIndex].time * 1000 === currentBucket
    ) {
      // มีแท่งจริงอยู่
      const candle = candles[candleIndex];
      // แก้ open ให้เท่ากับ close แท่งก่อนหน้า เพื่อความเนียน
      candle.open = lastClose;
      result.push(candle);
      lastClose = candle.close;
      candleIndex++;
    } else {
      // เติมแท่งช่องว่าง (volume = 0, ราคาใช้ lastClose ทั้งหมด)
      const timeInSeconds = currentBucket / 1000;
      result.push({
        time: timeInSeconds,
        open: lastClose,
        high: lastClose,
        low: lastClose,
        close: lastClose,
        volume: 0,
      });
    }
    currentBucket += intervalMs;
  }

  return result;
}

function aggregateCandles(data: { time: number; price: number; volume: number }[], intervalMs: number) {
  if (data.length === 0) return [];

  const result: any[] = [];
  let bucketStart = Math.floor(data[0].time / intervalMs) * intervalMs;
  let bucketData: typeof data = [];

  function aggregateBucket(bucket: typeof data, bucketStart: number) {
    if (bucket.length === 0) return null;
    return {
      time: bucketStart / 1000,
      open: bucket[0].price,
      high: Math.max(...bucket.map(d => d.price)),
      low: Math.min(...bucket.map(d => d.price)),
      close: bucket[bucket.length - 1].price,
      volume: bucket.reduce((sum, d) => sum + d.volume, 0),
    };
  }

  for (const point of data) {
    const timeBucket = Math.floor(point.time / intervalMs) * intervalMs;
    if (timeBucket !== bucketStart) {
      const candle = aggregateBucket(bucketData, bucketStart);
      if (candle) result.push(candle);
      bucketStart = timeBucket;
      bucketData = [];
    }
    bucketData.push(point);
  }
  const candle = aggregateBucket(bucketData, bucketStart);
  if (candle) result.push(candle);

  for (let i = 1; i < result.length; i++) {
    result[i].open = result[i - 1].close;
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
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d
    .getHours()
    .toString()
    .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d
    .getSeconds()
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

  const [intervalMs, setIntervalMs] = useState(60 * 1000); // default 1 min

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
    const aggregated = aggregateCandles_fillMissingTime(data, intervalMs);

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
    series.setData(aggregated);

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
      const format = (v: number) => formatDecimal(v).padEnd(4);

      if (infoBarRef.current) {
        infoBarRef.current.innerHTML = `
          O${format(candle.open)} H${format(candle.high)} L${format(candle.low)} C${format(candle.close)} Δ
          <span style="color:${change >= 0 ? 'green' : 'red'};">${change >= 0 ? '+' : ''}${format(change)}</span>
          (<span style="color:${changePercent >= 0 ? 'green' : 'red'};">${changePercent >= 0 ? '+' : ''}${Number(
          formatDecimal(changePercent)
        ).toLocaleString()}%</span>)
        `.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
      }

      toolTip.style.display = 'block';
      toolTip.style.left = `${param.point.x + 10}px`;
      toolTip.style.top = `${param.point.y + 10}px`;
      toolTip.innerHTML = `
        <div style="color: #26a69a">
          <div><strong>Time:</strong> ${timeStr}</div>
          <div><strong>Open:</strong> ${formatDecimal(Number(data.open))}</div>
          <div><strong>High:</strong> ${formatDecimal(Number(data.high))}</div>
          <div><strong>Low:</strong> ${formatDecimal(Number(data.low))}</div>
          <div><strong>Close:</strong> ${formatDecimal(Number(data.close))}</div>
          <div><strong>Volume:</strong> ${volume.toLocaleString()}</div>
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
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col space-y-1 bg-[rgba(30,30,30,0.7)] p-2 rounded">
          <div className="flex items-center">
<p>No transactions found. Please perform a transaction and wait for 5 minutes.</p>
          </div>
          <div
            ref={infoBarRef}
            className="text-white text-[12px] font-mono whitespace-pre text-left"
          ></div>
        </div>

        {/* Time Selector + InfoBar */}
        <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1 bg-opacity-80 p-2 rounded">
          <div className="flex items-center">
            <label className="text-white mr-2 text-xs">Time:</label>
            {INTERVAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setIntervalMs(opt.value)}
                className={`mr-1.5 px-1.5 py-0.5 text-xs cursor-pointer ${
                  intervalMs === opt.value ? 'text-teal-400' : 'text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div
            ref={infoBarRef}
            className="text-white text-[12px] font-mono whitespace-pre text-left"
          ></div>
        </div>

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute top-0 left-0 hidden bg-black bg-opacity-90 text-white border border-gray-600 p-2 text-xs pointer-events-none z-50 rounded whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export default Chart;