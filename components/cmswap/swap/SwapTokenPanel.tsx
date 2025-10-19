'use client';
import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
    const popularTokens = React.useMemo(() => tokens.slice(0, 4), [tokens])
    const shortenAddress = React.useCallback((value: string) => {
        if (!value || value === '0x') return value
        return `${value.slice(0, 6)}...${value.slice(-4)}`
    }, [])
    return (
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 backdrop-blur-sm transition-colors">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-400">
                <span>{label}</span>
                <span />
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
                <Dialog open={popoverOpen} onOpenChange={onPopoverOpenChange}>
                    <DialogTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={popoverOpen} className="flex h-12 min-w-[170px] items-center justify-between gap-3 rounded-full border-white/10 bg-slate-900/60 px-4 text-base font-medium text-white transition-colors hover:bg-slate-900/80">
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-slate-800/80">
                                    {selectedToken.logo && selectedToken.logo !== '../favicon.ico' ? <img alt="" src={selectedToken.logo} className="size-8 rounded-full" /> : <span className="text-sm text-slate-300">?</span>}
                                </div>
                                <span className="max-w-[110px] truncate text-left">{selectedToken.name}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-slate-300" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent overlayClassName="bg-slate-950/70 backdrop-blur-lg" className="z-[110] w-full max-w-[420px] rounded-3xl border border-white/10 bg-slate-950/95 p-0 shadow-2xl sm:max-w-[440px]">
                        <div className="flex flex-col gap-4 p-5 sm:p-6">
                            <div className="space-y-1"><h2 className="text-sm font-semibold text-white">Select a token</h2></div>
                            <Command className="bg-transparent">
                                <CommandInput placeholder="Search tokens" className="h-9 rounded-2xl border border-white/5 bg-slate-900/70 px-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400/50 focus:ring-0" />
                                <div className="mt-4 space-y-3">
                                    {popularTokens.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                {popularTokens.map(token => (
                                                    <button
                                                        key={`popular-${token.value}`}
                                                        type="button"
                                                        onClick={() => handleSelectToken(token)}
                                                        className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-900/60 px-3 py-2 text-left text-sm text-slate-200 transition hover:border-emerald-400/40 hover:bg-slate-900"
                                                    >
                                                        <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-slate-800/80">
                                                            {token.logo && token.logo !== '../favicon.ico' ? <img alt="" src={token.logo} className="size-9 rounded-full" /> : <span className="text-sm text-slate-300">?</span>}
                                                        </div>
                                                        <div className="flex flex-1 flex-col">
                                                            <span className="truncate font-medium text-white">{token.name}</span>
                                                            <span className="text-[11px] text-slate-400">{shortenAddress(token.value)}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <CommandList className="max-h-[45vh] overflow-y-auto rounded-2xl border border-white/5 bg-slate-950/80 p-2">
                                        <CommandEmpty className="py-6 text-center text-sm text-slate-400">No tokens found.</CommandEmpty>
                                        <CommandGroup className="space-y-1">
                                            {tokens.map(token => (
                                                <CommandItem
                                                    key={token.value}
                                                    value={`${token.name} ${token.value}`}
                                                    onSelect={() => handleSelectToken(token)}
                                                    className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 transition aria-selected:bg-emerald-500/10 hover:bg-slate-900/80"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-slate-800/80">
                                                            {token.logo && token.logo !== '../favicon.ico' ? <img alt="" src={token.logo} className="size-9 rounded-full" /> : <span className="text-sm text-slate-300">?</span>}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="truncate font-medium text-white">{token.name}</span>
                                                            <span className="text-[11px] text-slate-400">{shortenAddress(token.value)}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 group-aria-selected:text-emerald-300">Select</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </div>
                            </Command>
                        </div>
                    </DialogContent>
                </Dialog>
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
