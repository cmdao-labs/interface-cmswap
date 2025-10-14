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
        <div className="rounded-lg border border-[#00ff9d]/10 p-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">{label}</span>
                <input className="py-2 w-[340px] focus:outline-none text-gray-400 text-xs text-right" value={tokenAddress} onChange={event => onTokenAddressChange?.(event.target.value)} />
            </div>
            <div className="flex items-center justify-between">
                <input
                    placeholder={amountPlaceholder}
                    autoFocus={amountAutoFocus}
                    className="w-[140px] sm:w-[200px] bg-transparent border-none text-white text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto"
                    value={amount}
                    onChange={event => onAmountChange?.(event.target.value)}
                    readOnly={amountReadOnly || !onAmountChange}
                />
                <Popover open={popoverOpen} onOpenChange={onPopoverOpenChange}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={popoverOpen} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 flex items-center justify-between h-10 cursor-pointer">
                            <div className="gap-2 flex flex-row items-center justify-center">
                                <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                    <span className="text-[#00ff9d] text-xs">{selectedToken.logo && selectedToken.logo !== '../favicon.ico' ? <img alt="" src={selectedToken.logo} className="size-5 shrink-0 rounded-full" /> : '?'}</span>
                                </div>
                                <span className="truncate">{selectedToken.name}</span>
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
                                        <CommandItem key={token.value} value={token.name} onSelect={() => handleSelectToken(token)} className="cursor-pointer">
                                            <div className="flex items-center">
                                                <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
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
                <div className="flex items-center gap-2">
                    {balanceLabel && <span className="text-gray-400 text-xs">{balanceLabel}</span>}
                    {footerContent}
                </div>
            </div>
        </div>
    )
}
