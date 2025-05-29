'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CrosshairMode,
} from 'lightweight-charts';

const rawSecondData = [
  { time: 1748264582000, price: 0, volume: 0 },
  { time: 1748264583000, price: 0.000106060606060606, volume: 942857142.8571428 },
  { time: 1748264678000, price: 0.001873560606060606, volume: 533743.0754922971 },
  { time: 1748264748000, price: 0.001891243271060606, volume: 528.7527074394833 },
  { time: 1748264768000, price: 0.001891296266555606, volume: 1057.4757828091963 },
  { time: 1748273618000, price: 0.001853439644854943, volume: 7850 },
  { time: 1748273723000, price: 0.001842072332153917, volume: 345000 },
  { time: 1748274823000, price: 0.001772602109921966, volume: 1896228 },
  { time: 1748301708000, price: 0.001701023109447111, volume: 524724 },
  { time: 1748417477000, price: 0.001722055545887237, volume: 58070.13614562474 },
  { time: 1748425287000, price: 0.001674217852269819, volume: 544550 },
  // เพิ่มเติมตามต้องการ
];
// ฟังก์ชัน aggregateCandles เดิม (ไม่ต้องเปลี่ยน)

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
  { label: '1 min', value: 60 * 1000 },
  { label: '5 min', value: 5 * 60 * 1000 },
  { label: '15 min', value: 15 * 60 * 1000 },
  { label: '30 min', value: 30 * 60 * 1000 },
  { label: '1 hour', value: 60 * 60 * 1000 },
  { label: '4 hours', value: 4 * 60 * 60 * 1000 },
  { label: '24 hours', value: 24 * 60 * 60 * 1000 },
];

const Chart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  const [intervalMs, setIntervalMs] = useState(60 * 1000); // default 1 min
  const [candleData, setCandleData] = useState<any[]>([]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // ถ้ามี chart อยู่แล้วให้ลบก่อน
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      seriesRef.current = null;
    }

    // รวมข้อมูลใหม่ตาม interval ที่เลือก
    const aggregated = aggregateCandles(rawSecondData, intervalMs);
    setCandleData(aggregated);

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
        minMove: 0.000000001,
      },
    });

    seriesRef.current = series;

    series.setData(aggregated);
    requestAnimationFrame(() => {
      chart.timeScale().scrollToPosition(5, false); // เลื่อนกราฟไปทางขวา 10 แท่ง (แท่งแรกจะไม่ชิดขวา)
    });




    const toolTip = tooltipRef.current!;
    toolTip.style.display = 'none';

    chart.subscribeCrosshairMove(param => {
      if (
        !param ||
        !param.point ||
        !param.time ||
        !param.seriesData.has(series)
      ) {
        toolTip.style.display = 'none';
        return;
      }

      const data = param.seriesData.get(series) as any;
      const timeStr = toDateStr(param.time as number);
      const volume = aggregated.find(d => d.time === param.time)?.volume ?? '-';

      toolTip.style.display = 'block';
      toolTip.style.left = `${param.point.x + 20}px`;
      toolTip.style.top = `${param.point.y + 20}px`;
      toolTip.innerHTML = `
        <div style="color: #26a69a">
          <div><strong>Time:</strong> ${timeStr}</div>
          <div><strong>Open:</strong> ${data.open}</div>
          <div><strong>High:</strong> ${data.high}</div>
          <div><strong>Low:</strong> ${data.low}</div>
          <div><strong>Close:</strong> ${data.close}</div>
          <div><strong>Volume:</strong> ${volume}</div>
        </div>
      `;
    });

    const resizeObserver = new ResizeObserver(entries => {
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
  }, [intervalMs]);

  return (
      <div>
        <div style={{ marginBottom: 8 }}>
  <label style={{ color: '#b0f1c1', marginRight: 8 }}>Select Interval:</label>
  {INTERVAL_OPTIONS.map(opt => (
    <button
      key={opt.value}
      onClick={() => setIntervalMs(opt.value)}
      style={{
        marginRight: 6,
        padding: '4px 8px',
        fontSize: 12,
        borderRadius: 4,
        border: '1px solid #26a69a',
        backgroundColor: intervalMs === opt.value ? '#26a69a' : 'transparent',
        color: intervalMs === opt.value ? '#fff' : '#b0f1c1',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      type="button"
    >
      {opt.label}
    </button>
  ))}
</div>

      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'none',
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            border: '1px solid #666',
            padding: '8px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            borderRadius: '4px',
            whiteSpace: 'pre-line',
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
