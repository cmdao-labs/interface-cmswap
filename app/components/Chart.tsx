'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  CrosshairMode,
} from 'lightweight-charts';

const sampleData = [
  { time: 1748264583000, open: 0, high: 0.000106060606060606, low: 0.000106060606060606, close: 0.000106060606060606, volume: 942857142.8571428 },
  { time: 1748264678000, open: 0.000106060606060606, high: 0.001873560606060606, low: 0.001873560606060606, close: 0.001873560606060606, volume: 533743.0754922971 },
  { time: 1748264748000, open: 0.001873560606060606, high: 0.001891243271060606, low: 0.001891243271060606, close: 0.001891243271060606, volume: 528.7527074394833 },
  { time: 1748264768000, open: 0.001891243271060606, high: 0.001891296266555606, low: 0.001891296266555606, close: 0.001891296266555606, volume: 1057.4757828091963 },
  { time: 1748273618000, open: 0.001891296266555606, high: 0.001853439644854943, low: 0.001853439644854943, close: 0.001853439644854943, volume:  7850 },
  { time: 1748273723000, open: 0.001853439644854943, high: 0.001842072332153917, low: 0.001842072332153917, close: 0.001842072332153917, volume:  345000 },
  { time: 1748274823000, open: 0.001842072332153917, high: 0.001772602109921966, low: 0.001772602109921966, close: 0.001772602109921966, volume: 1896228 },
  { time: 1748301708000, open: 0.001772602109921966, high: 0.001701023109447111, low: 0.001701023109447111, close: 0.001701023109447111, volume: 524724 },
  { time: 1748417477000, open: 0.001701023109447111, high: 0.001722055545887237, low: 0.001722055545887237, close: 0.001722055545887237, volume:  58070.13614562474 },
  { time: 1748425287000, open: 0.001722055545887237, high: 0.001674217852269819, low: 0.001674217852269819, close: 0.001674217852269819, volume:  544550 },
];

function toDateStr(timestamp: number): string {
  const d = new Date(timestamp );
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
    .getDate()
    .toString()
    .padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
}

type Theme = 'dark-green' | 'dark-purple';

const themeConfigs: Record<Theme, any> = {
  'dark-green': {
    bgColor: '#1e1e1e',
    textColor: '#b0f1c1',
    upColor: '#26a69a',
    downColor: '#ef5350',
    gridColor: '#333',
  },
  'dark-purple': {
    bgColor: '#1e1e2f',
    textColor: '#d0b0ff',
    upColor: '#9c27b0',
    downColor: '#e91e63',
    gridColor: '#2c2c4d',
  },
};

interface ChartProps {
  theme?: Theme;
  type?: 'candlestick' | 'line';
}

const Chart: React.FC<ChartProps> = ({ theme = 'dark-green', type = 'candlestick' }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const colors = themeConfigs[theme];

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: colors.bgColor },
        textColor: colors.textColor,
      },
      crosshair: { mode: CrosshairMode.Normal },
      grid: {
        vertLines: { color: colors.gridColor },
        horzLines: { color: colors.gridColor },
      },
    });

    const series =
      type === 'candlestick'
        ? (chart as any).addCandlestickSeries({
            upColor: colors.upColor,
            downColor: colors.downColor,
            borderVisible: false,
            wickUpColor: colors.upColor,
            wickDownColor: colors.downColor,
          })
        : (chart as any).addLineSeries({
            color: colors.upColor,
            lineWidth: 2,
          });

    series.setData(sampleData as any);

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
      const volume =
        sampleData.find(d => d.time === param.time)?.volume ?? '-';

      toolTip.style.display = 'block';
      toolTip.style.left = `${param.point.x + 20}px`;
      toolTip.style.top = `${param.point.y + 20}px`;
      toolTip.innerHTML = `
        <div style="color: ${colors.upColor}">
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
    };
  }, [theme, type]);

  return (
    <div>
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
