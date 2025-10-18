'use client';
import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
type SwapTokenOption = {
    name: string
    value: '0xstring'
    logo: string
}
interface SwapTokenPanelProps<TToken extends SwapTokenOption> {
    label: string
    tokenAddress: string
    onTokenAddressChange?: (value: string) => void
    amount: string
    onAmountChange?: (value: string) => void
    amountPlaceholder?: string
    amountReadOnly?: boolean
    amountAutoFocus?: boolean
    selectedToken: TToken
    tokens: readonly TToken[]
    onSelectToken: (token: TToken) => void
    popoverOpen: boolean
    onPopoverOpenChange: (open: boolean) => void
    balanceLabel?: string
    footerContent?: React.ReactNode
}

export function SwapTokenPanel<TToken extends SwapTokenOption>({ label, tokenAddress, onTokenAddressChange, amount, onAmountChange, amountPlaceholder = '0.0', amountReadOnly = false, amountAutoFocus = false, selectedToken, tokens, onSelectToken, popoverOpen, onPopoverOpenChange, balanceLabel, footerContent }: SwapTokenPanelProps<TToken>) {
    const handleSelectToken = React.useCallback(
        (token: TToken) => {
            onSelectToken(token)
            onPopoverOpenChange(false)
        },
        [onSelectToken, onPopoverOpenChange]
    )
    return (
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 backdrop-blur-sm transition-colors">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-400">
                <span>{label}</span>
                <input className="w-[260px] truncate rounded-md bg-transparent p-1 text-right text-[11px] text-slate-500 outline-none focus:text-slate-300 focus:ring-0" value={tokenAddress} onChange={event => onTokenAddressChange?.(event.target.value)} />
            </div>
            <div className="flex items-end justify-between gap-4">
                <input
                    placeholder={amountPlaceholder}
                    autoFocus={amountAutoFocus}
                    className="w-full bg-transparent text-3xl font-semibold text-white outline-none placeholder:text-slate-500 focus-visible:outline-none"
                    value={amount}
                    onChange={event => onAmountChange?.(event.target.value)}
                    readOnly={amountReadOnly || !onAmountChange}
                />
                <Popover open={popoverOpen} onOpenChange={onPopoverOpenChange}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={popoverOpen} className="flex h-12 min-w-[170px] items-center justify-between gap-3 rounded-full border-white/10 bg-slate-900/60 px-4 text-base font-medium text-white transition-colors hover:bg-slate-900/80">
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-slate-800/80">
                                    {selectedToken.logo && selectedToken.logo !== '../favicon.ico' ? <img alt="" src={selectedToken.logo} className="size-8 rounded-full" /> : <span className="text-sm text-slate-300">?</span>}
                                </div>
                                <span className="max-w-[110px] truncate text-left">{selectedToken.name}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-slate-300" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="z-[100] w-[240px] rounded-2xl border border-white/10 bg-slate-950/90 p-0 backdrop-blur-xl">
                        <Command className="bg-transparent">
                            <CommandInput placeholder="Search tokens" className="border-b border-white/5 bg-transparent text-slate-200" />
                            <CommandList>
                                <CommandEmpty>No tokens found.</CommandEmpty>
                                <CommandGroup className="max-h-[260px] overflow-y-auto">
                                    {tokens.map(token => (
                                        <CommandItem key={token.value} value={token.name} onSelect={() => handleSelectToken(token)} className="cursor-pointer text-slate-200 hover:bg-slate-900/70">
                                            <div className="flex items-center">
                                                <img alt="" src={token.logo} className="size-6 shrink-0 rounded-full" />
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
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span />
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    {balanceLabel && <span>{balanceLabel}</span>}
                    {footerContent}
                </div>
            </div>
        </div>
    )
}
