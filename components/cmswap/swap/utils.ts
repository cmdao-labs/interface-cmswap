'use client';
import { parseUnits, formatUnits } from 'viem'

export function getDecimals(token: any, fallback = 18): number {
    const d = token?.decimal
    return typeof d === 'number' && Number.isFinite(d) ? d : fallback
}
export function parseAmount(value: string, token: any): bigint {
    return parseUnits(value || '0', getDecimals(token))
}
export function formatAmount(amount: bigint, token: any): string {
    return formatUnits(amount ?? BigInt(0), getDecimals(token))
}
export function computePriceImpact(executionPrice: number, midPrice: number, cap = 100): string {
    if (!isFinite(executionPrice) || !isFinite(midPrice) || midPrice <= 0) return '0'
    const pi = ((executionPrice - midPrice) / midPrice) * 100
    if (!isFinite(pi)) return '0'
    if (Math.abs(pi) > cap) return '>100'
    return pi.toFixed(4)
}
