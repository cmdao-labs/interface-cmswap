"use client"
import React from "react"
import { useAccount } from "wagmi"
import { useDebouncedCallback } from 'use-debounce'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Minus, Plus } from 'lucide-react'
import { Token as UniToken, BigintIsh } from "@uniswap/sdk-core"
import { TickMath, encodeSqrtRatioX96, Pool, Position } from "@uniswap/v3-sdk"
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, formatUnits, parseUnits } from "viem"
import { config } from '@/config/reown'
import { useLiquidityChain } from './useLiquidityChain'

const SLIDER_ZOOM_SPANS = [25, 50, 100, 200, 400] as const
const SLIDER_MIN_GAP = 0.1
const SLIDER_MIN_PERCENT = -99.9

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

type SliderHandle = 'lower' | 'upper'
type DistributionBar = { key: number; ratio: number; height: number; inRange: boolean; isCurrent: boolean }

type LiquidityRangeSliderProps = {
    currentPrice: number | null
    lowerPercent: number | null
    upperPercent: number | null
    lowerPrice: number | null
    upperPrice: number | null
    zoomSpan: number
    canZoomIn: boolean
    canZoomOut: boolean
    onZoomIn: () => void
    onZoomOut: () => void
    onLowerChange: (percent: number) => void
    onUpperChange: (percent: number) => void
    onLowerCommit: (percent: number) => void
    onUpperCommit: (percent: number) => void
    disabled?: boolean
    upperIsInfinite?: boolean
    distributionBuckets?: { ratio: number; height: number }[]
}

const LiquidityRangeSlider: React.FC<LiquidityRangeSliderProps> = ({
    currentPrice,
    lowerPercent,
    upperPercent,
    lowerPrice,
    upperPrice,
    zoomSpan,
    canZoomIn,
    canZoomOut,
    onZoomIn,
    onZoomOut,
    onLowerChange,
    onUpperChange,
    onLowerCommit,
    onUpperCommit,
    disabled = false,
    upperIsInfinite = false,
    distributionBuckets,
}) => {
    const trackRef = React.useRef<HTMLDivElement>(null)
    const dragHandleRef = React.useRef<SliderHandle | null>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const span = React.useMemo(() => Math.max(zoomSpan, SLIDER_MIN_GAP * 20), [zoomSpan])
    const halfSpan = span / 2
    const windowMin = -halfSpan
    const windowMax = halfSpan

    const fallbackLower = Math.max(windowMin, -Math.min(halfSpan * 0.5, 25))
    const fallbackUpper = Math.min(windowMax, Math.min(halfSpan * 0.5, 25))

    let baseLower = Number.isFinite(lowerPercent ?? NaN) ? (lowerPercent as number) : fallbackLower
    let baseUpper = Number.isFinite(upperPercent ?? NaN) ? (upperPercent as number) : fallbackUpper

    if (upperIsInfinite) baseUpper = windowMax

    baseLower = clamp(baseLower, Math.max(windowMin, SLIDER_MIN_PERCENT), windowMax)
    baseUpper = clamp(baseUpper, Math.max(windowMin, SLIDER_MIN_PERCENT + SLIDER_MIN_GAP), windowMax)

    if (baseLower > baseUpper - SLIDER_MIN_GAP) {
        const mid = (baseLower + baseUpper) / 2
        baseLower = clamp(mid - SLIDER_MIN_GAP / 2, Math.max(windowMin, SLIDER_MIN_PERCENT), windowMax - SLIDER_MIN_GAP)
        baseUpper = clamp(mid + SLIDER_MIN_GAP / 2, Math.max(windowMin + SLIDER_MIN_GAP, SLIDER_MIN_PERCENT + SLIDER_MIN_GAP), windowMax)
    }

    const [draftLower, setDraftLower] = React.useState(baseLower)
    const [draftUpper, setDraftUpper] = React.useState(baseUpper)

    React.useEffect(() => {
        if (!isDragging) setDraftLower(baseLower)
    }, [baseLower, isDragging])
    React.useEffect(() => {
        if (!isDragging) setDraftUpper(baseUpper)
    }, [baseUpper, isDragging])

    const draftLowerRef = React.useRef(draftLower)
    const draftUpperRef = React.useRef(draftUpper)
    React.useEffect(() => {
        draftLowerRef.current = draftLower
    }, [draftLower])
    React.useEffect(() => {
        draftUpperRef.current = draftUpper
    }, [draftUpper])

    const percentToRatio = React.useCallback((value: number) => {
        if (!Number.isFinite(value)) return value >= 0 ? 1 : 0
        return (value - windowMin) / (windowMax - windowMin)
    }, [windowMin, windowMax])
    const toRatio = React.useCallback((value: number) => clamp(percentToRatio(value), 0, 1), [percentToRatio])

    const clientXToPercent = React.useCallback((clientX: number) => {
        const track = trackRef.current
        if (!track) return null
        const rect = track.getBoundingClientRect()
        if (rect.width === 0) return null
        const ratio = (clientX - rect.left) / rect.width
        const value = windowMin + ratio * (windowMax - windowMin)
        return clamp(value, Math.max(windowMin, SLIDER_MIN_PERCENT), windowMax)
    }, [windowMin, windowMax])

    const updateActiveHandle = React.useCallback((clientX: number, commit: boolean) => {
        const handle = dragHandleRef.current
        if (!handle) return
        const percent = clientXToPercent(clientX)
        if (percent === null) return
        if (handle === 'lower') {
            const upper = draftUpperRef.current
            const limit = clamp(upper - SLIDER_MIN_GAP, Math.max(windowMin, SLIDER_MIN_PERCENT), windowMax - SLIDER_MIN_GAP)
            const next = clamp(Math.min(percent, limit), Math.max(windowMin, SLIDER_MIN_PERCENT), limit)
            setDraftLower(next)
            onLowerChange(next)
            if (commit) onLowerCommit(next)
        } else {
            const lower = draftLowerRef.current
            const limit = clamp(lower + SLIDER_MIN_GAP, Math.max(windowMin + SLIDER_MIN_GAP, SLIDER_MIN_PERCENT + SLIDER_MIN_GAP), windowMax)
            const next = clamp(Math.max(percent, limit), limit, windowMax)
            setDraftUpper(next)
            onUpperChange(next)
            if (commit) onUpperCommit(next)
        }
    }, [clientXToPercent, onLowerChange, onLowerCommit, onUpperChange, onUpperCommit, windowMin, windowMax])

    React.useEffect(() => {
        if (!isDragging) return
        const handleMove = (event: PointerEvent) => updateActiveHandle(event.clientX, false)
        const handleUp = (event: PointerEvent) => {
            updateActiveHandle(event.clientX, true)
            dragHandleRef.current = null
            setIsDragging(false)
        }
        window.addEventListener('pointermove', handleMove)
        window.addEventListener('pointerup', handleUp)
        window.addEventListener('pointercancel', handleUp)
        return () => {
            window.removeEventListener('pointermove', handleMove)
            window.removeEventListener('pointerup', handleUp)
            window.removeEventListener('pointercancel', handleUp)
        }
    }, [isDragging, updateActiveHandle])

    const step = React.useMemo(() => Math.max(span / 200, 0.1), [span])

    const adjustHandle = React.useCallback((handle: SliderHandle, delta: number) => {
        if (disabled) return
        if (handle === 'lower') {
            const upper = draftUpperRef.current
            const limit = clamp(upper - SLIDER_MIN_GAP, Math.max(windowMin, SLIDER_MIN_PERCENT), windowMax - SLIDER_MIN_GAP)
            const candidate = clamp(draftLowerRef.current + delta, Math.max(windowMin, SLIDER_MIN_PERCENT), limit)
            setDraftLower(candidate)
            onLowerChange(candidate)
            onLowerCommit(candidate)
        } else {
            const lower = draftLowerRef.current
            const limit = clamp(lower + SLIDER_MIN_GAP, Math.max(windowMin + SLIDER_MIN_GAP, SLIDER_MIN_PERCENT + SLIDER_MIN_GAP), windowMax)
            const candidate = clamp(draftUpperRef.current + delta, limit, windowMax)
            setDraftUpper(candidate)
            onUpperChange(candidate)
            onUpperCommit(candidate)
        }
    }, [disabled, onLowerChange, onLowerCommit, onUpperChange, onUpperCommit, windowMin, windowMax])

    const handleKeyDown = React.useCallback((handle: SliderHandle) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return
        if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault()
            adjustHandle(handle, -step)
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault()
            adjustHandle(handle, step)
        }
    }, [adjustHandle, disabled, step])

    const beginDrag = React.useCallback((handle: SliderHandle) => (event: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) return
        event.preventDefault()
        dragHandleRef.current = handle
        setIsDragging(true)
        updateActiveHandle(event.clientX, false)
    }, [disabled, updateActiveHandle])

    const selectionStart = Math.min(toRatio(draftLower), toRatio(draftUpper))
    const selectionEnd = Math.max(toRatio(draftLower), toRatio(draftUpper))
    const selectionWidth = Math.max((selectionEnd - selectionStart) * 100, 0.5)
    const currentRatio = toRatio(0)
    const distribution = React.useMemo<DistributionBar[]>(() => {
        const bucketCount = (Array.isArray(distributionBuckets) && distributionBuckets.length > 0)
            ? distributionBuckets.length
            : 41
        const stepRatio = 1 / Math.max(1, bucketCount - 1)
        if (Array.isArray(distributionBuckets) && distributionBuckets.length > 0) {
            return distributionBuckets.map((b: { ratio: number; height: number }, idx: number) => {
                const ratio = clamp(b.ratio, 0, 1)
                const height = clamp(b.height, 0, 100)
                const inRange = ratio >= selectionStart && ratio <= selectionEnd
                const isCurrent = Math.abs(ratio - currentRatio) <= stepRatio / 2
                return { key: idx, ratio, height, inRange, isCurrent }
            })
        }
        const spanWidth = Math.max(windowMax - windowMin, 0.0001)
        const sigma = Math.max(span / 3, 1)
        return Array.from({ length: bucketCount }, (_, idx) => {
            const ratio = idx * stepRatio
            const percentValue = windowMin + ratio * spanWidth
            const scaled = Math.exp(-Math.pow(percentValue / sigma, 2))
            const height = Math.min(100, Math.max(8, scaled * 100))
            const inRange = ratio >= selectionStart && ratio <= selectionEnd
            const isCurrent = Math.abs(ratio - currentRatio) <= stepRatio / 2
            return { key: idx, ratio, height, inRange, isCurrent }
        })
    }, [currentRatio, distributionBuckets, selectionEnd, selectionStart, span, windowMax, windowMin])

    const formatPercentLabel = React.useCallback((value: number | null, opts?: { infinite?: boolean }) => {
        if (opts?.infinite) return '+∞'
        if (value === null || !Number.isFinite(value)) return '--'
        const sign = value > 0 ? '+' : ''
        return `${sign}${value.toFixed(2)}%`
    }, [])
    const formatPriceLabel = React.useCallback((value: number | null) => {
        if (value === null) return '--'
        if (!Number.isFinite(value)) return '∞'
        if (Math.abs(value) >= 1) {
            return value.toLocaleString(undefined, { maximumFractionDigits: 4 })
        }
        return Number(value.toPrecision(4)).toString()
    }, [])

    const lowerPercentLabel = formatPercentLabel(draftLower)
    const upperPercentLabel = formatPercentLabel(upperIsInfinite ? null : draftUpper, { infinite: upperIsInfinite })
    const lowerPriceLabel = formatPriceLabel(lowerPrice)
    const upperPriceLabel = formatPriceLabel(upperPrice)
    const currentPriceLabel = formatPriceLabel(currentPrice)
    const viewLabel = `±${(span / 2).toFixed(0)}% window`

    return (
        <div className="space-y-4 rounded-xl border border-[#00ff9d]/15 bg-[#07111f]/80 p-4">
            <div className="relative h-16">
                <div ref={trackRef} className="absolute inset-x-4 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#0f1d2d] shadow-inner">
                    <div
                        className="absolute inset-y-[-8px] w-[2px] rounded-full bg-emerald-400/70 shadow-[0_0_12px_rgba(16,185,129,0.45)]"
                        style={{ left: `${currentRatio * 100}%`, transform: 'translateX(-50%)' }}
                    />
                    <div
                        className="absolute inset-y-[-4px] rounded-full border border-emerald-400/40 bg-emerald-500/20 backdrop-blur-sm"
                        style={{ left: `${selectionStart * 100}%`, width: `${selectionWidth}%` }}
                    />
                </div>
                <button
                    type="button"
                    role="slider"
                    aria-valuemin={Math.max(windowMin, SLIDER_MIN_PERCENT)}
                    aria-valuemax={draftUpper - SLIDER_MIN_GAP}
                    aria-valuenow={draftLower}
                    aria-label={`Lower range ${lowerPercentLabel}`}
                    aria-disabled={disabled}
                    disabled={disabled}
                    onPointerDown={beginDrag('lower')}
                    onKeyDown={handleKeyDown('lower')}
                    className="absolute top-1/2 flex h-6 w-6 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-400/70 bg-[#0a1a29] text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                    style={{ left: `${toRatio(draftLower) * 100}%` }}
                >
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500/20 px-2 py-[2px] text-[11px] font-medium text-emerald-100 shadow">
                        {lowerPercentLabel}
                    </span>
                    <span className="pointer-events-none absolute top-[110%] left-1/2 -translate-x-1/2 text-[10px] text-white/50">
                        {lowerPriceLabel}
                    </span>
                </button>
                <button
                    type="button"
                    role="slider"
                    aria-valuemin={draftLower + SLIDER_MIN_GAP}
                    aria-valuemax={windowMax}
                    aria-valuenow={upperIsInfinite ? windowMax : draftUpper}
                    aria-label={`Upper range ${upperPercentLabel}`}
                    aria-disabled={disabled}
                    disabled={disabled}
                    onPointerDown={beginDrag('upper')}
                    onKeyDown={handleKeyDown('upper')}
                    className="absolute top-1/2 flex h-6 w-6 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border border-emerald-400/70 bg-[#0a1a29] text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                    style={{ left: `${toRatio(draftUpper) * 100}%` }}
                >
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500/20 px-2 py-[2px] text-[11px] font-medium text-emerald-100 shadow">
                        {upperPercentLabel}
                    </span>
                    <span className="pointer-events-none absolute top-[110%] left-1/2 -translate-x-1/2 text-[10px] text-white/50">
                        {upperPriceLabel}
                    </span>
                </button>
                {disabled && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 text-xs font-medium text-white/60">
                        Select a token pair to unlock the range slider
                    </div>
                )}
            </div>
                <div className="space-y-2">
                    <div className="relative h-28 rounded-xl border border-white/10 bg-[#0d1b2b]/70">
                        <div className="absolute inset-0 flex items-end gap-[2px] px-3 pb-3 pt-6">
                        {distribution.map((bucket: DistributionBar) => (
                            <div
                                key={bucket.key}
                                className={`flex-1 rounded-t transition-all ${bucket.inRange ? 'bg-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.25)]' : 'bg-white/15'} ${bucket.isCurrent ? 'ring-1 ring-emerald-300/60' : ''}`}
                                style={{ height: `${bucket.height}%` }}
                            />
                        ))}
                    </div>
                    <div
                        className="pointer-events-none absolute inset-y-2 w-[2px] rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        style={{ left: `${currentRatio * 100}%`, transform: 'translateX(-50%)' }}
                    />
                    <div
                        className="pointer-events-none absolute inset-y-0 rounded-xl bg-emerald-500/10"
                        style={{ left: `${selectionStart * 100}%`, width: `${selectionWidth}%` }}
                    />
                    {disabled && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 text-[10px] font-medium text-white/60">
                            Select tokens to view liquidity distribution
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px] text-white/60">
                <div className="space-y-1 rounded-lg border border-white/10 bg-[#0d1b2b]/70 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-white/40">Min Price</p>
                    <p className="text-sm font-semibold text-emerald-200">{lowerPriceLabel}</p>
                    <p>{lowerPercentLabel}</p>
                </div>
                <div className="space-y-1 rounded-lg border border-white/10 bg-[#0d1b2b]/70 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-white/40">Max Price</p>
                    <p className="text-sm font-semibold text-emerald-200">{upperPriceLabel}</p>
                    <p>{upperPercentLabel}</p>
                </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0d1b2b]/70 p-3 text-[11px] text-white/60">
                <span className="text-white/40">Current price:</span>{' '}
                <span className="font-medium text-emerald-200">{currentPriceLabel}</span>
            </div>
        </div>
    )
}

const parsePercentageValue = (value?: string | null): number | null => {
    if (value === undefined || value === null || value === '') return null
    if (value.includes('♾')) return Infinity
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
}

const parsePriceValue = (value?: string | null): number | null => {
    if (value === undefined || value === null || value === '') return null
    if (value === 'Infinity') return Infinity
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
}

export default function LiquidityUnified({ setIsLoading, setErrMsg, }: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>,
}) {
    const { address } = useAccount()
    const {chainId, tokens, POSITION_MANAGER, v3FactoryContract, positionManagerContract, erc20ABI, kap20ABI, v3PoolABI, toWrapped, isNative, isKap20Token, decimalsOf, displayPrecision} = useLiquidityChain()
    const [txupdate, setTxupdate] = React.useState("")
    const [tokenA, setTokenA] = React.useState<{name: string, value: '0xstring', logo: string, decimal: number}>(tokens[0] as any)
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{name: string, value: '0xstring', logo: string, decimal: number}>({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18})
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [pairDetect, setPairDetect] = React.useState("")
    const [currPrice, setCurrPrice] = React.useState("")
    const [lowerPrice, setLowerPrice] = React.useState("")
    const [upperPrice, setUpperPrice] = React.useState("")
    const [lowerPercentage, setLowerPercentage] = React.useState("0")
    const [upperPercentage, setUpperPercentage] = React.useState("0")
    const [currTickSpacing, setCurrTickSpacing] = React.useState("")
    const [lowerTick, setLowerTick] = React.useState("")
    const [upperTick, setUpperTick] = React.useState("")
    const [rangePercentage, setRangePercentage] = React.useState(1)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [sliderZoomIndex, setSliderZoomIndex] = React.useState(2)
    const tickSpacingNumber = React.useMemo(() => {
        const parsed = Number(currTickSpacing)
        return Number.isFinite(parsed) && parsed > 0 ? parsed : null
    }, [currTickSpacing])
    const currentPriceNumber = React.useMemo(() => {
        const parsed = Number(currPrice)
        return Number.isFinite(parsed) && parsed > 0 ? parsed : null
    }, [currPrice])
    const lowerPercentValue = React.useMemo(() => parsePercentageValue(lowerPercentage), [lowerPercentage])
    const rawUpperPercentValue = React.useMemo(() => parsePercentageValue(upperPercentage), [upperPercentage])
    const upperIsInfinite = rawUpperPercentValue === Infinity || upperPercentage === '+♾️'
    const upperPercentValue = upperIsInfinite ? null : rawUpperPercentValue
    const lowerPriceNumber = React.useMemo(() => parsePriceValue(lowerPrice), [lowerPrice])
    const upperPriceNumber = React.useMemo(() => parsePriceValue(upperPrice), [upperPrice])
    const sliderSpan = React.useMemo(
        () => SLIDER_ZOOM_SPANS[Math.min(sliderZoomIndex, SLIDER_ZOOM_SPANS.length - 1)],
        [sliderZoomIndex],
    )
    const selectionMaxAbs = React.useMemo(() => {
        if (upperIsInfinite) return Infinity
        const lowerAbs = lowerPercentValue !== null && Number.isFinite(lowerPercentValue) ? Math.abs(lowerPercentValue) : 0
        const upperAbs = upperPercentValue !== null && Number.isFinite(upperPercentValue) ? Math.abs(upperPercentValue) : 0
        return Math.max(lowerAbs, upperAbs)
    }, [lowerPercentValue, upperPercentValue, upperIsInfinite])
    const canZoomOut = sliderZoomIndex < SLIDER_ZOOM_SPANS.length - 1
    const canZoomIn = sliderZoomIndex > 0 && selectionMaxAbs <= SLIDER_ZOOM_SPANS[sliderZoomIndex - 1] / 2
    const sliderEnabled = Boolean(
        currentPriceNumber &&
        tickSpacingNumber &&
        tokenA.value !== ('0x' as '0xstring') &&
        tokenB.value !== ('0x' as '0xstring')
    )

    // Build price distribution buckets from API candles (if available)
    const [distributionBuckets, setDistributionBuckets] = React.useState<{ ratio: number; height: number }[] | null>(null)
    const fetchDistribution = React.useCallback(async () => {
        try {
            setDistributionBuckets(null)
            const a = tokenA?.value
            const b = tokenB?.value
            if (!a || !b || a === ('0x' as '0xstring') || b === ('0x' as '0xstring')) return
            const baseTokenAddr = String(toWrapped(tokenB.value)).toLowerCase()
            const quoteTokenAddr = String(toWrapped(tokenA.value)).toLowerCase()
            const timeframe = '5m'
            const limit = 300
            const buckets = 41
            const span = sliderSpan // percent width of window
            const searchParams = new URLSearchParams({ baseToken: baseTokenAddr, quoteToken: quoteTokenAddr, timeframe, limit: String(limit), buckets: String(buckets), span: String(span) })
            searchParams.set('chainId', String(chainId))
            const res = await fetch(`/api/swap/price-distribution?${searchParams.toString()}`, { cache: 'no-store' })
            if (!res.ok) return
            const payload = await res.json()
            const serverBuckets = Array.isArray(payload?.buckets) ? payload.buckets : []
            if (serverBuckets.length > 0) {
                const mapped = serverBuckets.map((b: any) => ({ ratio: Number(b?.ratio) || 0, height: Number(b?.height) || 0 }))
                setDistributionBuckets(mapped)
            }
        } catch {
            // ignore; fallback bars will render
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenA?.value, tokenB?.value, chainId, sliderSpan])
    React.useEffect(() => {
        fetchDistribution()
    }, [fetchDistribution])
    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const tokenAAddress = searchParams.get('input')?.toLowerCase()
        const tokenBAddress = searchParams.get('output')?.toLowerCase()
        const foundTokenA = tokenAAddress ? tokens.find(t => t.value.toLowerCase() === tokenAAddress) : null
        const foundTokenB = tokenBAddress ? tokens.find(t => t.value.toLowerCase() === tokenBAddress) : null
        if (foundTokenA) setTokenA(foundTokenA as any);
        if (foundTokenB) setTokenB(foundTokenB as any);
        if (!tokenAAddress || !tokenBAddress) {
            if (tokenA?.value && tokenB?.value) updateURLWithTokens(tokenA.value, tokenB.value, address);
        } else {
            updateURLWithTokens(tokenAAddress, tokenBAddress, address)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    React.useEffect(() => {
        if (upperIsInfinite) {
            if (sliderZoomIndex !== SLIDER_ZOOM_SPANS.length - 1) {
                setSliderZoomIndex(SLIDER_ZOOM_SPANS.length - 1)
            }
            return
        }
        const currentHalfSpan = SLIDER_ZOOM_SPANS[sliderZoomIndex] / 2
        if (selectionMaxAbs > currentHalfSpan && sliderZoomIndex < SLIDER_ZOOM_SPANS.length - 1) {
            let nextIndex = sliderZoomIndex
            while (nextIndex < SLIDER_ZOOM_SPANS.length - 1 && selectionMaxAbs > SLIDER_ZOOM_SPANS[nextIndex] / 2) {
                nextIndex += 1
            }
            if (nextIndex !== sliderZoomIndex) setSliderZoomIndex(nextIndex)
        }
    }, [selectionMaxAbs, sliderZoomIndex, upperIsInfinite])
    React.useEffect(() => {
        setSliderZoomIndex(2)
    }, [tokenA.value, tokenB.value])
    const updateURLWithTokens = (tokenAValue?: string, tokenBValue?: string, referralCode?: string) => {
        const url = new URL(window.location.href)
        if (tokenAValue) {
            url.searchParams.set('input', tokenAValue)
        } else {
            url.searchParams.delete('tokenA')
        }
        if (tokenBValue) {
            url.searchParams.set('output', tokenBValue)
        } else {
            url.searchParams.delete('tokenB')
        }
        if (referralCode && referralCode.startsWith('0x')) {
            url.searchParams.set('ref', referralCode)
        } else {
            url.searchParams.delete('ref')
        }
        window.history.replaceState({}, '', url.toString())
    }
    const setAlignedLowerTick = useDebouncedCallback((_lowerPrice: string) => {
        setAmountA("")
        setAmountB("")
        const _lowerTick = Math.floor(Math.log(Number(_lowerPrice)) / Math.log(1.0001))
        let alignedLowerTick
        if (Number(_lowerPrice) === 0) {
            alignedLowerTick = Math.ceil(TickMath.MIN_TICK / Number(currTickSpacing)) * Number(currTickSpacing)
        } else {
            alignedLowerTick = Math.floor(_lowerTick / Number(currTickSpacing)) * Number(currTickSpacing)
            setLowerPrice(Math.pow(1.0001, alignedLowerTick).toString())
        }
        setLowerPercentage((((Math.pow(1.0001, alignedLowerTick) / Number(currPrice)) - 1) * 100).toString())
        setLowerTick(alignedLowerTick.toString())
    }, 700)
    const setAlignedUpperTick = useDebouncedCallback((_upperPrice: string) => {
        setAmountA("")
        setAmountB("")
        if (Number(_upperPrice) < Number(lowerPrice)) {
            setUpperPrice("")
            setUpperPercentage("")
        } else {
            const _upperTick = Math.ceil(Math.log(Number(_upperPrice)) / Math.log(1.0001))
            let alignedUpperTick
            if (Number(_upperPrice) === Infinity) {
                alignedUpperTick = Math.floor(TickMath.MAX_TICK / Number(currTickSpacing)) * Number(currTickSpacing)
                setUpperPercentage('+♾️')
            } else {
                alignedUpperTick = Math.ceil(_upperTick / Number(currTickSpacing)) * Number(currTickSpacing)
                setUpperPercentage((((Math.pow(1.0001, alignedUpperTick) / Number(currPrice)) - 1) * 100).toString())
                setUpperPrice(Math.pow(1.0001, alignedUpperTick).toString())
            }
            setUpperTick(alignedUpperTick.toString())
        }
    }, 700)
    const percentToPrice = React.useCallback((percent: number) => {
        if (currentPriceNumber === null) return null
        const ratio = 1 + percent / 100
        if (!Number.isFinite(ratio) || ratio <= 0) {
            if (percent <= -100) return 0
            return null
        }
        const value = currentPriceNumber * ratio
        return Number.isFinite(value) ? value : null
    }, [currentPriceNumber])
    const handleZoomIn = React.useCallback(() => {
        setSliderZoomIndex((index) => {
            if (index === 0) return index
            const nextHalf = SLIDER_ZOOM_SPANS[index - 1] / 2
            if (selectionMaxAbs > nextHalf) return index
            return index - 1
        })
    }, [selectionMaxAbs])
    const handleZoomOut = React.useCallback(() => {
        setSliderZoomIndex((index) => Math.min(index + 1, SLIDER_ZOOM_SPANS.length - 1))
    }, [])
    const handleSliderLowerChange = React.useCallback((percent: number) => {
        if (currentPriceNumber === null) return
        const normalized = Number(percent.toFixed(4))
        setRangePercentage(999)
        setAmountA("")
        setAmountB("")
        setLowerPercentage(normalized.toString())
        const nextPrice = percentToPrice(normalized)
        if (nextPrice !== null) {
            setLowerPrice(nextPrice.toString())
        } else {
            setLowerPrice("0")
        }
        setAlignedLowerTick.cancel()
    }, [currentPriceNumber, percentToPrice, setAmountA, setAmountB, setAlignedLowerTick, setLowerPercentage, setLowerPrice, setRangePercentage])
    const handleSliderLowerCommit = React.useCallback((percent: number) => {
        if (currentPriceNumber === null) return
        const normalized = Number(percent.toFixed(4))
        const price = percentToPrice(normalized)
        if (price === null) return
        setAlignedLowerTick.cancel()
        setAlignedLowerTick(price.toString())
        setAlignedLowerTick.flush()
    }, [currentPriceNumber, percentToPrice, setAlignedLowerTick])
    const handleSliderUpperChange = React.useCallback((percent: number) => {
        if (currentPriceNumber === null) return
        const normalized = Number(percent.toFixed(4))
        setRangePercentage(999)
        setAmountA("")
        setAmountB("")
        setUpperPercentage(normalized.toString())
        const nextPrice = percentToPrice(normalized)
        if (nextPrice !== null) setUpperPrice(nextPrice.toString())
        setAlignedUpperTick.cancel()
    }, [currentPriceNumber, percentToPrice, setAmountA, setAmountB, setAlignedUpperTick, setRangePercentage, setUpperPercentage, setUpperPrice])
    const handleSliderUpperCommit = React.useCallback((percent: number) => {
        if (currentPriceNumber === null) return
        const normalized = Number(percent.toFixed(4))
        const price = percentToPrice(normalized)
        if (price === null) return
        setAlignedUpperTick.cancel()
        setAlignedUpperTick(price.toString())
        setAlignedUpperTick.flush()
    }, [currentPriceNumber, percentToPrice, setAlignedUpperTick])
    const setAlignedAmountB = useDebouncedCallback(async (_amountA: string) => {
        if (!pairDetect) return
        const tokenAvalue = toWrapped(tokenA.value)
        const tokenBvalue = toWrapped(tokenB.value)
        const poolState = await readContracts(config, {
        contracts: [
            { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' },
            { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'slot0' },
            { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'liquidity' },
        ]
        })
        const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
        let tokendecimal: any = decimalsOf(token0)
        if (!tokendecimal || isNaN(tokendecimal)) {
            const d = await readContracts(config, {contracts: [{ ...erc20ABI, address: token0, functionName: 'decimals' }]})
            tokendecimal = d[0].result !== undefined ? Number(d[0].result) : 18
        }
        const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
        const tick = poolState[1].result !== undefined ? poolState[1].result[1] : 0
        const liquidity = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
        const Token0 = new UniToken(chainId, token0, tokendecimal)
        const Token1 = String(token0).toUpperCase() === tokenAvalue.toUpperCase() ? new UniToken(chainId, tokenBvalue, tokenB.decimal) : new UniToken(chainId, tokenAvalue, tokenA.decimal)
        const pool = new Pool(Token0, Token1, Number(feeSelect), sqrtPriceX96.toString(), liquidity.toString(), tick)
        if (String(token0).toUpperCase() === tokenAvalue.toUpperCase()) {
            const singleSidePositionToken0 = Position.fromAmount0({pool, tickLower: Number(lowerTick), tickUpper: Number(upperTick), amount0: String(parseUnits(_amountA || '0', tokenA.decimal)) as BigintIsh, useFullPrecision: true})
            setAmountB(formatUnits(singleSidePositionToken0.mintAmounts.amount1 as unknown as bigint, tokenB.decimal))
        } else {
            const singleSidePositionToken1 = Position.fromAmount1({
                pool,
                tickLower: Number(lowerTick),
                tickUpper: Number(upperTick),
                amount1: String(parseUnits(_amountA || '0', tokenA.decimal)) as BigintIsh,
            })
            setAmountB(formatUnits(singleSidePositionToken1.mintAmounts.amount0 as unknown as bigint, tokenB.decimal))
        }
    }, 700)

  const placeLiquidity = async () => {
    setIsLoading(true)
    try {
      const tokenAvalue = toWrapped(tokenA.value)
      const tokenBvalue = toWrapped(tokenB.value)
      let getToken0 = pairDetect !== '0x0000000000000000000000000000000000000000'
        ? await readContract(config, { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' })
        : ''
      if (pairDetect === '0x0000000000000000000000000000000000000000') {
        const { request: request0 } = await simulateContract(config, {
          ...v3FactoryContract,
          functionName: 'createPool',
          args: [tokenAvalue as '0xstring', tokenBvalue as '0xstring', feeSelect]
        })
        let h = await writeContract(config, request0)
        await waitForTransactionReceipt(config, { hash: h })
        const newPair = await readContract(config, { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue as '0xstring', tokenBvalue as '0xstring', feeSelect] })
        getToken0 = await readContract(config, { ...v3PoolABI, address: newPair as '0xstring', functionName: 'token0' })
        const amount0 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? amountA : amountB
        const amount1 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? amountB : amountA
        const decimal0 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenA.decimal : tokenB.decimal
        const decimal1 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenB.decimal : tokenA.decimal
        const { request: request1 } = await simulateContract(config, {
          ...v3PoolABI,
          address: newPair as '0xstring',
          functionName: 'initialize',
          args: [BigInt(encodeSqrtRatioX96(parseUnits(amount1 || '0', decimal1).toString(), parseUnits(amount0 || '0', decimal0).toString()).toString())]
        })
        h = await writeContract(config, request1)
        await waitForTransactionReceipt(config, { hash: h })
        setTxupdate(h)
      }

      if (tokenA.value.toUpperCase() !== tokens[0].value.toUpperCase()) {
        const allowanceA: any = isKap20Token(tokenA.value)
          ? await readContract(config, { ...(kap20ABI as any), address: tokenA.value, functionName: 'allowances', args: [address as '0xstring', POSITION_MANAGER] })
          : await readContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
        if (allowanceA < parseUnits(amountA || '0', tokenA.decimal)) {
          const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'approve', args: [POSITION_MANAGER, parseUnits(amountA || '0', tokenA.decimal)] })
          const h = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h })
        }
      }
      if (tokenB.value.toUpperCase() !== tokens[0].value.toUpperCase()) {
        const allowanceB: any = isKap20Token(tokenB.value)
          ? await readContract(config, { ...(kap20ABI as any), address: tokenB.value, functionName: 'allowances', args: [address as '0xstring', POSITION_MANAGER] })
          : await readContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
        if (allowanceB < parseUnits(amountB || '0', tokenB.decimal)) {
          const { request } = await simulateContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'approve', args: [POSITION_MANAGER, parseUnits(amountB || '0', tokenB.decimal)] })
          const h = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h })
        }
      }

      const token0check = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenA.value : tokenB.value
      const token1check = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenB.value : tokenA.value
      const token0 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenAvalue : tokenBvalue
      const token1 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenBvalue : tokenAvalue
      const amount0 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? amountA : amountB
      const amount1 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? amountB : amountA
      const decimal0 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenA.decimal : tokenB.decimal
      const decimal1 = getToken0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenB.decimal : tokenA.decimal
      const { request } = await simulateContract(config, {
        ...positionManagerContract,
        functionName: 'mint',
        args: [{
          token0: token0 as '0xstring',
          token1: token1 as '0xstring',
          fee: feeSelect,
          tickLower: Number(lowerTick),
          tickUpper: Number(upperTick),
          amount0Desired: parseUnits(amount0 || '0', decimal0),
          amount1Desired: parseUnits(amount1 || '0', decimal1),
          amount0Min: BigInt(0),
          amount1Min: BigInt(0),
          recipient: address as '0xstring',
          deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
        }],
        value: token0check.toUpperCase() === tokens[0].value.toUpperCase()
          ? parseUnits(amount0 || '0', decimal0)
          : (token1check.toUpperCase() === tokens[0].value.toUpperCase() ? parseUnits(amount1 || '0', decimal1) : BigInt(0))
      })
      const h = await writeContract(config, request)
      await waitForTransactionReceipt(config, { hash: h })
      setTxupdate(h)
    } catch (e) { setErrMsg(e as WriteContractErrorType) }
    setIsLoading(false)
  }

  React.useEffect(() => {
    const fetch1 = async () => {
      if (tokenA.value.toUpperCase() === tokenB.value.toUpperCase()) {
        setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
      }
      const tokenAvalue = toWrapped(tokenA.value)
      const tokenBvalue = toWrapped(tokenB.value)
      const nativeBal = address ? await getBalance(config, { address: address as '0xstring' }) : undefined

      const stateA = await readContracts(config, {
        contracts: [
          { ...erc20ABI, address: tokenAvalue as '0xstring', functionName: 'symbol' },
          { ...erc20ABI, address: tokenAvalue as '0xstring', functionName: 'balanceOf', args: [address as '0xstring'] }
        ]
      })
      const stateB = await readContracts(config, {
        contracts: [
          { ...erc20ABI, address: tokenBvalue as '0xstring', functionName: 'symbol' },
          { ...erc20ABI, address: tokenBvalue as '0xstring', functionName: 'balanceOf', args: [address as '0xstring'] },
          { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue as '0xstring', tokenBvalue as '0xstring', feeSelect] }
        ]
      })

      // Populate token names for custom addresses if not in list
      if (stateA[0].result !== undefined && tokenA.name === "Choose Token") {
        const dec = decimalsOf(tokenA.value) ?? 18
        setTokenA({
          name: stateA[0].result as any,
          value: tokenA.value,
          logo: (tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ? tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].logo : "../favicon.ico") as string,
          decimal: dec,
        })
      }
      if (stateB[0].result !== undefined && tokenB.name === "Choose Token") {
        const dec = decimalsOf(tokenB.value) ?? 18
        setTokenB({
          name: stateB[0].result as any,
          value: tokenB.value,
          logo: (tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ? tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].logo : "../favicon.ico") as string,
          decimal: dec,
        })
      }

      if (isNative(tokenA.value)) {
        nativeBal && setTokenABalance(formatEther(nativeBal.value))
      } else {
        stateA[1].result !== undefined && setTokenABalance(formatUnits(stateA[1].result as bigint, tokenA.decimal))
      }
      if (isNative(tokenB.value)) {
        nativeBal && setTokenBBalance(formatEther(nativeBal.value))
      } else {
        stateB[1].result !== undefined && setTokenBBalance(formatUnits(stateB[1].result as bigint, tokenB.decimal))
      }

      stateB[2].result !== undefined && setPairDetect(stateB[2].result as string)
      if (stateB[2].result !== undefined && stateB[2].result !== '0x0000000000000000000000000000000000000000') {
        const poolState = await readContracts(config, {
          contracts: [
            { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'token0' },
            { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'slot0' },
            { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'tickSpacing' }
          ]
        })
        const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
        const decimal0 = token0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenA.decimal : tokenB.decimal
        const decimal1 = token0.toUpperCase() === tokenAvalue.toUpperCase() ? tokenB.decimal : tokenA.decimal
        const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
        const priceFactor = 10 ** (decimal0 - decimal1)
        const _currPrice = token0.toUpperCase() === tokenBvalue.toUpperCase()
          ? ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * priceFactor
          : (1 / (((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * priceFactor))
        poolState[1].result !== undefined && setCurrPrice(_currPrice.toString())
        poolState[2].result !== undefined && setCurrTickSpacing(poolState[2].result.toString())
        let _lowerPrice = 0
        let _upperPrice = Infinity
        let alignedLowerTick = 0
        let alignedUpperTick = 0
        if (rangePercentage !== 1) {
          _lowerPrice = ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * (1 - rangePercentage)
          _upperPrice = ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * (1 + rangePercentage)
          const _lowerTick = Math.floor(Math.log(_lowerPrice) / Math.log(1.0001))
          const _upperTick = Math.ceil(Math.log(_upperPrice) / Math.log(1.0001))
          alignedLowerTick = poolState[2].result !== undefined ? Math.floor(_lowerTick / (poolState[2].result as number)) * (poolState[2].result as number) : 0
          alignedUpperTick = poolState[2].result !== undefined ? Math.ceil(_upperTick / (poolState[2].result as number)) * (poolState[2].result as number) : 0
        } else {
          alignedLowerTick = poolState[2].result !== undefined ? Math.ceil(TickMath.MIN_TICK / (poolState[2].result as number)) * (poolState[2].result as number) : 0
          alignedUpperTick = poolState[2].result !== undefined ? Math.floor(TickMath.MAX_TICK / (poolState[2].result as number)) * (poolState[2].result as number) : 0
        }
        // Determine display orientation: when token0 !== tokenB, displayed price is inverse of base price
        const isDisplayInverted = token0.toUpperCase() !== tokenBvalue.toUpperCase()
        const lowerTickForDisplay = isDisplayInverted ? alignedUpperTick : alignedLowerTick
        const upperTickForDisplay = isDisplayInverted ? alignedLowerTick : alignedUpperTick

        const priceAtTickBase = (t: number) => Math.pow(1.0001, t)
        const displayPriceFromTick = (t: number) => (
          token0.toUpperCase() === tokenBvalue.toUpperCase()
            ? priceAtTickBase(t) * priceFactor
            : (1 / priceAtTickBase(t)) * priceFactor
        )

        const _lowerPriceShow = displayPriceFromTick(lowerTickForDisplay)
        const _upperPriceShow = displayPriceFromTick(upperTickForDisplay)

        setLowerPrice(rangePercentage !== 1 ? _lowerPriceShow.toString() : '0')
        setUpperPrice(rangePercentage !== 1 ? _upperPriceShow.toString() : 'Infinity')
        rangePercentage !== 1 ? setLowerPercentage((((_lowerPriceShow / _currPrice) - 1) * 100).toString()) : setLowerPercentage('-100')
        rangePercentage !== 1 ? setUpperPercentage((((_upperPriceShow / _currPrice) - 1) * 100).toString()) : setUpperPercentage('+♾️')
        // Keep tickLower < tickUpper in base price space for minting
        setLowerTick(alignedLowerTick.toString())
        setUpperTick(alignedUpperTick.toString())
      } else {
        setCurrPrice("")
        const getTickSpacing = await readContracts(config, {
          contracts: [
            { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [10000] },
            { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [3000] },
            { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [500] },
            { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [100] },
          ]
        })
        let _spacing = ''
        if (getTickSpacing[0].status === 'success' && feeSelect === 10000) {
          _spacing = (getTickSpacing[0].result as any).toString()
        } else if (getTickSpacing[1].status === 'success' && feeSelect === 3000) {
          _spacing = (getTickSpacing[1].result as any).toString()
        } else if (getTickSpacing[2].status === 'success' && feeSelect === 500) {
          _spacing = (getTickSpacing[2].result as any).toString()
        } else if (getTickSpacing[3].status === 'success' && feeSelect === 100) {
          _spacing = (getTickSpacing[3].result as any).toString()
        }
        setCurrTickSpacing(_spacing)
        if (rangePercentage === 1) {
          const alignedUpperTick = Math.floor(TickMath.MAX_TICK / Number(_spacing)) * Number(_spacing)
          setUpperTick(alignedUpperTick.toString())
          setUpperPrice("Infinity")
          setUpperPercentage('+♾️')
          const alignedLowerTick = Math.ceil(TickMath.MIN_TICK / Number(_spacing)) * Number(_spacing)
          setLowerTick(alignedLowerTick.toString())
          setLowerPrice("0")
          setLowerPercentage('-100')
        } else {
          setUpperTick("")
          setUpperPrice("")
          setUpperPercentage('0')
          setLowerTick("")
          setLowerPrice("")
          setLowerPercentage('0')
        }
      }
    }
    setAmountA("")
    setAmountB("")
    address !== undefined && rangePercentage !== 999 && fetch1()
  }, [address, tokenA, tokenB, feeSelect, rangePercentage, txupdate, // deps
      POSITION_MANAGER, v3FactoryContract, v3PoolABI, erc20ABI])

  return (
    <div className='space-y-2'>
      <div className="p-3 rounded-lg border border-[#00ff9d]/10 p-4">
        <div className="flex justify-between items-center text-xs mb-1">
          <div />
          <input
            className="py-2 w-[340px] focus:outline-none text-gray-400 text-xs text-right"
            value={tokenA.value}
            onChange={e => {
              if (e.target.value !== '0x') {
                setTokenA({ name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico', decimal: 18 })
              } else {
                setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          {currPrice === "" || (lowerPrice !== '' && Number(lowerPrice) < Number(currPrice)) ?
            <input placeholder="0.0" className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountA} onChange={e => { setAmountA(e.target.value); Number(upperPrice) > Number(currPrice) && setAlignedAmountB(e.target.value); }} /> :
            <div />
          }
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" role="combobox" aria-expanded={open} className="w-[180px] h-8 text-white hover:bg-[#162638] hover:text-[#00ff9d] flex items-center justify-between h-10 cursor-pointer">
                <div className='gap-2 flex flex-row items-center justify-center'>
                  <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                    <span className="text-[#00ff9d] text-xs">
                      {(tokenA.logo && tokenA.logo.trim() !== '' && tokenA.logo !== '../favicon.ico')
                        ? <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" />
                        : '?'}
                    </span>
                  </div>
                  <span className="truncate">{tokenA.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 z-100">
              <Command>
                <CommandInput placeholder="Search tokens..." />
                <CommandList>
                  <CommandEmpty>No tokens found.</CommandEmpty>
                  <CommandGroup>
                    {tokens.map(token => (
                      <CommandItem
                        key={token.name}
                        value={token.name}
                        onSelect={() => {
                          setTokenA(token as any)
                          setOpen(false)
                          updateURLWithTokens((token as any).value, tokenB?.value)
                        }}
                        className='cursor-pointer'
                      >
                        <div className="flex items-center">
                          {((token as any).logo && String((token as any).logo).trim() !== '')
                            ? <img alt="" src={(token as any).logo} className="size-5 shrink-0 rounded-full" />
                            : <div className="size-5 shrink-0 rounded-full bg-[#00ff9d]/10 text-center leading-5">?</div>}
                          <span className="ml-3 truncate">{token.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span />
          <div>
            <span className="text-gray-400 text-xs">{tokenA.name !== 'Choose Token' ? Number(tokenABalance || '0').toFixed(displayPrecision) + ' ' + tokenA.name : '0.0000'}</span>
            {(lowerPrice !== '' && Number(lowerPrice) < Number(currPrice)) && <Button variant="ghost" size="sm" className="h-6 text-[#00ff9d] text-xs px-2 cursor-pointer" onClick={() => { setAmountA(tokenABalance); Number(upperPrice) > Number(currPrice) && setAlignedAmountB(tokenABalance); }}>MAX</Button>}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg border border-[#00ff9d]/10 p-4">
        <div className="flex justify-between items-center text-xs mb-1">
          <div />
          <input
            className="py-2 w-[340px] focus:outline-none text-gray-400 text-xs text-right"
            value={tokenB.value}
            onChange={e => {
              if (e.target.value !== '0x') {
                setTokenB({ name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico', decimal: 18 })
              } else {
                setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico', decimal: 18 })
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          {currPrice === "" || (upperPrice !== '' && Number(upperPrice) > Number(currPrice)) ?
            <input placeholder="0.0" className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountB} onChange={(e) => setAmountB(e.target.value)} /> :
            <div />
          }
          <Popover open={open2} onOpenChange={setOpen2}>
            <PopoverTrigger asChild>
              <Button variant="ghost" role="combobox" aria-expanded={open} className="w-[180px] h-8 text-white hover:bg-[#162638] hover:text-[#00ff9d] flex items-center justify-between h-10 cursor-pointer">
                <div className='gap-2 flex flex-row items-center justify-center'>
                  <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                    <span className="text-[#00ff9d] text-xs">
                      {(tokenB.logo && tokenB.logo.trim() !== '' && tokenB.logo !== '../favicon.ico')
                        ? <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" />
                        : '?'}
                    </span>
                  </div>
                  <span className="truncate">{tokenB.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 z-100">
              <Command>
                <CommandInput placeholder="Search tokens..." />
                <CommandList>
                  <CommandEmpty>No tokens found.</CommandEmpty>
                  <CommandGroup>
                    {tokens.map(token => (
                      <CommandItem
                        key={token.name}
                        value={token.name}
                        onSelect={() => {
                          setTokenB(token as any)
                          setOpen2(false)
                          updateURLWithTokens(tokenA?.value, (token as any).value)
                        }}
                        className='cursor-pointer'
                      >
                        <div className="flex items-center">
                          {((token as any).logo && String((token as any).logo).trim() !== '')
                            ? <img alt="" src={(token as any).logo} className="size-5 shrink-0 rounded-full" />
                            : <div className="size-5 shrink-0 rounded-full bg-[#00ff9d]/10 text-center leading-5">?</div>}
                          <span className="ml-3 truncate">{token.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span />
          {(upperPrice !== '' || Number(upperPrice) > Number(currPrice)) && <span className="text-gray-400 text-xs" onClick={() => setAmountB(tokenBBalance)}>{tokenB.name !== 'Choose Token' ? Number(tokenBBalance || '0').toFixed(displayPrecision) + ' ' + tokenB.name : '0.0000'}</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (feeSelect === 100 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(100)}>
          <span>0.01% fee</span>
          <span className="text-xs mt-1 opacity-60">best for stable war pairs</span>
        </Button>
        <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (feeSelect === 500 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(500)}>
          <span>0.05% fee</span>
          <span className="text-xs mt-1 opacity-60">best for stable pairs</span>
        </Button>
        <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (feeSelect === 3000 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(3000)}>
          <span>0.3% fee</span>
          <span className="text-xs mt-1 opacity-60">best for basic pairs</span>
        </Button>
        <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (feeSelect === 10000 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(10000)}>
          <span>1% fee</span>
          <span className="text-xs mt-1 opacity-60">best for exotic pairs</span>
        </Button>
      </div>
      <div className="mt-4">
        <LiquidityRangeSlider
          currentPrice={currentPriceNumber}
          lowerPercent={lowerPercentValue}
          upperPercent={upperPercentValue}
          lowerPrice={lowerPriceNumber}
          upperPrice={upperPriceNumber}
          zoomSpan={sliderSpan}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onLowerChange={handleSliderLowerChange}
          onUpperChange={handleSliderUpperChange}
          onLowerCommit={handleSliderLowerCommit}
          onUpperCommit={handleSliderUpperCommit}
          disabled={!sliderEnabled}
          upperIsInfinite={upperIsInfinite}
          distributionBuckets={distributionBuckets ?? undefined}
        />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 mt-2">
        <Button variant="outline" className={"h-auto rounded text-xs flex flex-col " + (rangePercentage === 1 ? "text-[#00ff9d] border border-[#00ff9d]/20" : "text-gray-400 border border-[#00ff9d]/10 cursor-pointer")} onClick={() => setRangePercentage(1)}>
          <span>Full Range</span>
          <span className="text-[10px] mt-1 opacity-60">[-100%, ♾️]</span>
        </Button>
        <Button variant="outline" className={"h-auto rounded text-xs flex flex-col " + (rangePercentage === 0.15 ? "text-[#00ff9d] border border-[#00ff9d]/20" : "text-gray-400 border border-[#00ff9d]/10 cursor-pointer")} onClick={() => setRangePercentage(0.15)}>
          <span>Wide</span>
          <span className="text-[10px] mt-1 opacity-60">[-15%, +15%]</span>
        </Button>
        <Button variant="outline" className={"h-auto rounded text-xs flex flex-col " + (rangePercentage === 0.075 ? "text-[#00ff9d] border border-[#00ff9d]/20" : "text-gray-400 border border-[#00ff9d]/10 cursor-pointer")} onClick={() => setRangePercentage(0.075)}>
          <span>Narrow</span>
          <span className="text-[10px] mt-1 opacity-60">[-7.5%, +7.5%]</span>
        </Button>
        <Button variant="outline" className={"h-auto rounded text-xs flex flex-col " + (rangePercentage === 0.02 ? "text-[#00ff9d] border border-[#00ff9d]/20" : "text-gray-400 border border-[#00ff9d]/10 cursor-pointer")} onClick={() => setRangePercentage(0.02)}>
          <span>Degen</span>
          <span className="ttext-[10px] mt-1 opacity-60">[-2%, +2%]</span>
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        {tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && pairDetect === '0x0000000000000000000000000000000000000000' &&
          <div className="rounded-lg border border-[#00ff9d]/10 p-3 flex flex-row items-center justify-between">
            <input className="bg-[#0a0b1e]/50 border-[#00ff9d]/10 text-white placeholder:text-gray-600 focus:border-0 focus:outline focus:outline-0" placeholder="Initial Price" value={currPrice} onChange={e => setCurrPrice(e.target.value)} />
            <span className="text-gray-500 text-xs">{tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && tokenA.name + '/' + tokenB.name}</span>
          </div>
        }
        <div className="rounded-lg border border-[#00ff9d]/10 p-3 flex flex-row items-center justify-between">
          <input className="bg-[#0a0b1e]/50 border-[#00ff9d]/10 text-white placeholder:text-gray-600 focus:border-0 focus:outline focus:outline-0" placeholder="Lower Price" value={lowerPrice} onChange={e => { setLowerPrice(e.target.value); setAlignedLowerTick(e.target.value); setRangePercentage(999); }} />
          <span className="text-gray-500 text-xs">{tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && tokenA.name + '/' + tokenB.name + (Number(currPrice) > 0 ? ' (' + Number(lowerPercentage).toFixed(2) + '%)' : '')}</span>
        </div>
        <div className="rounded-lg border border-[#00ff9d]/10 p-3 flex flex-row items-center justify-between">
          <input className="bg-[#0a0b1e]/50 border-[#00ff9d]/10 text-white placeholder:text-gray-600 focus:border-0 focus:outline focus:outline-0" placeholder="Upper Price" value={upperPrice} onChange={e => { setUpperPrice(e.target.value); setAlignedUpperTick(e.target.value); setRangePercentage(999); }} />
          <span className="text-gray-500 text-xs">{tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && tokenA.name + '/' + tokenB.name + (Number(currPrice) > 0 ? ' (+' + (upperPercentage === '+♾️' ? '♾️' : Number(upperPercentage).toFixed(2)) + '%)' : '')}</span>
        </div>
      </div>

      {tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) > 0 && Number(amountB) > 0 && Number(amountA) <= Number(tokenABalance) && Number(amountB) <= Number(tokenBBalance) ?
        <Button className="w-full py-6 px-8 mt-4 font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" onClick={placeLiquidity}>Add Liquidity</Button> :
        <Button disabled className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 mt-4 uppercase">Add Liquidity</Button>
      }
      <div className="mt-4 border-t border-[#00ff9d]/10 pt-4">
        <div className="flex items-center text-gray-500 text-xs my-2">
          <span className="mr-1">current price</span>
          <span className="text-[#00ff9d] text-xs px-2 gap-1">{Number(currPrice || '0').toFixed(4)} {tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && tokenA.name + '/' + tokenB.name}</span>
        </div>
      </div>
    </div>
  )
}
