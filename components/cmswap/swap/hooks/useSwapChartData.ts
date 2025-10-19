'use client'

import * as React from 'react'

export type SwapChartTimeframe = '15s' | '1m' | '5m' | '15m' | '1h' | '4h' | '1d'

export const SWAP_CHART_TIMEFRAMES: readonly { label: string; value: SwapChartTimeframe }[] = [
    { label: '15s', value: '15s' },
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' },
    { label: '1d', value: '1d' },
] as const

const DEFAULT_LIMIT = 500
const POLL_FAST_MS = 10000
const POLL_SLOW_MS = 30000

export type SwapChartCandle = {
    time: number
    open: number
    high: number
    low: number
    close: number
    volumeBase: number
    volumeQuote: number
    trades: number
}

type SwapChartDataState = {
    candles: SwapChartCandle[]
    latest: { price: number | null; timestamp: number | null } | null
    isLoading: boolean
    error: string | null
    notFound: boolean
}

type UseSwapChartDataArgs = {
    baseToken?: string | null
    quoteToken?: string | null
    timeframe: SwapChartTimeframe
    enabled?: boolean
    limit?: number
    chainId?: number
}

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined) return null
    const num = Number(value)
    return Number.isFinite(num) ? num : null
}

export function useSwapChartData(options: UseSwapChartDataArgs) {
    const { baseToken, quoteToken, timeframe, enabled = true, limit = DEFAULT_LIMIT, chainId } = options
    const [state, setState] = React.useState<SwapChartDataState>({
        candles: [],
        latest: null,
        isLoading: false,
        error: null,
        notFound: false,
    })
    const [refreshTick, setRefreshTick] = React.useState(0)

    const refresh = React.useCallback(() => {
        setRefreshTick((tick) => tick + 1)
    }, [])

    React.useEffect(() => {
        if (!enabled || !baseToken || !quoteToken || typeof chainId !== 'number' || !Number.isFinite(chainId) || chainId <= 0) {
            setState((prev) => ({
                ...prev,
                candles: [],
                latest: null,
                isLoading: false,
                error: null,
                notFound: false,
            }))
            return
        }
        let active = true
        const controller = new AbortController()
        const searchParams = new URLSearchParams({
            baseToken,
            quoteToken,
            timeframe,
            limit: String(limit),
        })
        searchParams.set('chainId', String(chainId))
        const load = async () => {
            try {
                if (!active) return
                setState((prev) => ({
                    ...prev,
                    isLoading: true,
                    error: null,
                    notFound: false,
                }))
                const res = await fetch(`/api/swap/candles?${searchParams.toString()}`, {
                    cache: 'no-store',
                    signal: controller.signal,
                })
                if (!res.ok) {
                    if (res.status === 404) {
                        if (!active) return
                        setState({
                            candles: [],
                            latest: null,
                            isLoading: false,
                            error: null,
                            notFound: true,
                        })
                        return
                    }
                    const message = await res.text()
                    throw new Error(message || `Failed to load chart data (${res.status})`)
                }
                const payload = await res.json()
                if (!active) return
                const raw = Array.isArray(payload?.candles) ? payload.candles : []
                const candles: SwapChartCandle[] = raw
                    .map((item: any) => {
                        const time = toNumber(item?.time ?? item?.bucket_start)
                        const open = toNumber(item?.open)
                        const high = toNumber(item?.high)
                        const low = toNumber(item?.low)
                        const close = toNumber(item?.close)
                        if (
                            time === null ||
                            open === null ||
                            high === null ||
                            low === null ||
                            close === null
                        ) {
                            return null
                        }
                        return {
                            time,
                            open,
                            high,
                            low,
                            close,
                            volumeBase: toNumber(item?.volumeBase ?? item?.volume0) ?? 0,
                            volumeQuote: toNumber(item?.volumeQuote ?? item?.volume1) ?? 0,
                            trades: Number.isFinite(Number(item?.trades)) ? Number(item.trades) : 0,
                        }
                    })
                    .filter((entry: any): entry is SwapChartCandle => Boolean(entry))
                const latestPayload = payload?.latest
                const latest = latestPayload
                    ? {
                        price: toNumber(latestPayload.price),
                        timestamp: toNumber(latestPayload.timestamp),
                    }
                    : null
                setState({
                    candles,
                    latest,
                    isLoading: false,
                    error: null,
                    notFound: false,
                })
            } catch (err: any) {
                if (!active || controller.signal.aborted) return
                setState({
                    candles: [],
                    latest: null,
                    isLoading: false,
                    error: err?.message || 'Failed to load chart data',
                    notFound: false,
                })
            }
        }
        load()
        const interval = setInterval(
            load,
            timeframe === '15s' ? POLL_FAST_MS : POLL_SLOW_MS
        )
        return () => {
            active = false
            controller.abort()
            clearInterval(interval)
        }
    }, [baseToken, quoteToken, timeframe, enabled, limit, refreshTick, chainId])

    return {
        ...state,
        refresh,
    }
}
