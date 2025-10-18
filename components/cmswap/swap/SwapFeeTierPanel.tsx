import React from 'react'
import { Button } from '@/components/ui/button'

type TVL = { tvl10000: string | number; tvl3000: string | number; tvl500: string | number; tvl100: string | number; }

export function SwapFeeTierPanel({feeSelect, onChange, tvl, tvlUnitLabel,}: {
    feeSelect: number
    onChange: (fee: 100 | 500 | 3000 | 10000) => void
    tvl: TVL
    tvlUnitLabel: string
}) {
    const fmt = (v: string | number) => Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(Number(v || 0))
    return (
        <>
            <div className="flex justify-between items-center my-2"><span className="text-gray-400 text-xs">Swap fee tier</span></div>
            <div className="grid grid-cols-4 gap-2 h-[70px]">
                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 100 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => onChange(100)}>
                    <span>0.01%</span>
                    <span className={'truncate' + (Number(tvl.tvl100) > 0 ? ' text-emerald-300' : '')}>TVL: {fmt(tvl.tvl100)} {tvlUnitLabel}</span>
                </Button>
                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 500 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => onChange(500)}>
                    <span>0.05%</span>
                    <span className={'truncate' + (Number(tvl.tvl500) > 0 ? ' text-emerald-300' : '')}>TVL: {fmt(tvl.tvl500)} {tvlUnitLabel}</span>
                </Button>
                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 3000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => onChange(3000)}>
                    <span>0.3%</span>
                    <span className={'truncate' + (Number(tvl.tvl3000) > 0 ? ' text-emerald-300' : '')}>TVL: {fmt(tvl.tvl3000)} {tvlUnitLabel}</span>
                </Button>
                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 10000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => onChange(10000)}>
                    <span>1%</span>
                    <span className={'truncate' + (Number(tvl.tvl10000) > 0 ? ' text-emerald-300' : '')}>TVL: {fmt(tvl.tvl10000)} {tvlUnitLabel}</span>
                </Button>
            </div>
        </>
    )
}
