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
];

function aggregateCandles_fillMissingTime(
  data: { time: number; price: number; volume: number }[],
  intervalMs: number
) {
  if (data.length === 0) return [];

  const result: any[] = [];
  let bucketStart = Math.floor(data[0].time / intervalMs) * intervalMs;
  let bucketData: typeof data = [];

  function aggregateBucket(bucket: typeof data, bucketStart: number) {
    if (bucket.length === 0) return null;
    return {
      time: bucketStart / 1000,
      open: bucket[0].price,
      high: Math.max(...bucket.map((d) => d.price)),
      low: Math.min(...bucket.map((d) => d.price)),
      close: bucket[bucket.length - 1].price,
      volume: bucket.reduce((sum, d) => sum + d.volume, 0),
    };
  }

  for (const point of data) {
    const timeBucket = Math.floor(point.time / intervalMs) * intervalMs;

    // เติมแท่งที่เว้นช่วง
    while (timeBucket > bucketStart) {
      const candle = aggregateBucket(bucketData, bucketStart);
      const lastClose = candle ? candle.close : result[result.length - 1]?.close ?? point.price;

      if (candle) result.push(candle);
      else {
        result.push({
          time: bucketStart / 1000,
          open: lastClose,
          high: lastClose,
          low: lastClose,
          close: lastClose,
          volume: 0,
        });
      }

      bucketStart += intervalMs;
      bucketData = [];
    }

    bucketData.push(point);
  }

  const candle = aggregateBucket(bucketData, bucketStart);
  if (candle) result.push(candle);
  else if (result.length > 0) {
    const lastClose = result[result.length - 1].close;
    result.push({
      time: bucketStart / 1000,
      open: lastClose,
      high: lastClose,
      low: lastClose,
      close: lastClose,
      volume: 0,
    });
  }

  // ปรับ open ให้เท่ากับ close แท่งก่อนหน้า (ยกเว้นแท่งแรก)
  for (let i = 1; i < result.length; i++) {
    result[i].open = result[i - 1].close;
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
  { label: '1m', value: 60 * 1000 },
  { label: '5m', value: 5 * 60 * 1000 },
  { label: '1m', value: 15 * 60 * 1000 },
  { label: '1h', value: 60 * 60 * 1000 },
  { label: '4h', value: 4 * 60 * 60 * 1000 },
  { label: 'D', value: 24 * 60 * 60 * 1000 },
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

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      seriesRef.current = null;
    }

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

    function formatNumber(value : number) {
      if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' M';
      if (value >= 10_000) return (value / 1_000).toFixed(1).replace(/\.0$/, '') + ' K';
      return value.toLocaleString();
    }


const priceScale = chart.priceScale('right');
priceScale.applyOptions({
  autoScale: true,
  scaleMargins: { top: 0.1, bottom: 0.1 }
});

chart.applyOptions({
  timeScale: {
    timeVisible: true,
    secondsVisible: true, 
  },
  localization: {
    timeFormatter: (time: number) => {
      return new Intl.DateTimeFormat('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Bangkok', 
        hour12: false
      }).format(new Date(time * 1000));
    }
  }
});



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
      toolTip.style.left = `${param.point.x + 10}px`;
      toolTip.style.top = `${param.point.y + 10}px`;
      toolTip.innerHTML = `
        <div style="color: #26a69a">
          <div><strong>Time:</strong> ${timeStr}</div>
          <div><strong>Open:</strong> ${formatDecimal(Number(data.open))}</div>
          <div><strong>High:</strong> ${formatDecimal(Number(data.high))}</div>
          <div><strong>Low:</strong> ${formatDecimal(Number(data.low))}</div>
          <div><strong>Close:</strong> ${formatDecimal(Number(data.close))}</div>
          <div><strong>Volume:</strong> ${formatNumber(volume)}</div>
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
    <div className="relative overflow-visible w-full h-full">
      {/* Container chart */}
      <div ref={chartContainerRef} className="w-full h-full" />

      {/* Time Selector Inside Chart */}
      <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-80 p-1.5 rounded z-10 flex items-center">
        <label className="text-white mr-2 text-xs">Time:</label>
        {INTERVAL_OPTIONS.map(opt => (
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
