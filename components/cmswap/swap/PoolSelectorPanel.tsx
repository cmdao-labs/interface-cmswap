import React from 'react'
import { Button } from '@/components/ui/button'

export type PoolItem = { id: string; label: string; tvl: number | string; tvlUnit: string; active?: boolean; best?: boolean; visible?: boolean; onClick: () => void; }
export function PoolSelectorPanel({ items }: { items: PoolItem[] }) {
    const fmt = (v: string | number) => Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(Number(v || 0))
    const visibleItems = items.filter(i => i.visible !== false)
    if (!visibleItems.length) return null
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-auto">
            {visibleItems.map((item) => {
                const isActive = !!item.active
                const highlight = Number(item.tvl) > 0
                return (
                    <Button key={item.id} variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (isActive ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={item.onClick}>
                        <span className="flex items-center gap-1">{item.label} {item.best && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}</span>
                        <span className={'truncate' + (highlight ? ' text-emerald-300' : '')}>TVL: {fmt(item.tvl)} {item.tvlUnit}</span>
                    </Button>
                )
            })}
        </div>
    )
}
