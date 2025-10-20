'use client';
import * as React from 'react'
type SwapTokenBase = {
    name: string
    value: '0xstring'
    logo: string
} & Record<string, unknown>
interface UseSwapTokenSelectionOptions {
    defaultTokenAIndex?: number
    defaultTokenBIndex?: number
    referralAddress?: string | null | undefined
    persistSearchParams?: boolean
}
interface UseSwapTokenSelectionResult<T extends SwapTokenBase> {
    tokenA: T
    tokenB: T
    setTokenA: React.Dispatch<React.SetStateAction<T>>
    setTokenB: React.Dispatch<React.SetStateAction<T>>
    hasInitializedFromParams: boolean
    updateURLWithTokens: (tokenAValue?: string, tokenBValue?: string, referralCode?: string | null | undefined) => void
    switchTokens: () => void
}

export function useSwapTokenSelection<T extends SwapTokenBase>( tokens: readonly T[], options?: UseSwapTokenSelectionOptions ): UseSwapTokenSelectionResult<T> {
    if (!tokens.length) throw new Error('useSwapTokenSelection requires a non-empty tokens array.');
    const {defaultTokenAIndex = 0, defaultTokenBIndex = tokens.length > 1 ? 1 : 0, referralAddress, persistSearchParams = true} = options ?? {}
    const initialTokenA = React.useMemo(() => tokens[defaultTokenAIndex], [tokens, defaultTokenAIndex])
    const initialTokenB = React.useMemo(() => tokens[defaultTokenBIndex], [tokens, defaultTokenBIndex])
    const [tokenA, setTokenA] = React.useState<T>(initialTokenA)
    const [tokenB, setTokenB] = React.useState<T>(initialTokenB)
    const [hasInitializedFromParams, setHasInitializedFromParams] = React.useState(false)
    const updateURLWithTokens = React.useCallback(
        (tokenAValue?: string, tokenBValue?: string, referralCode?: string | null | undefined) => {
            if (typeof window === 'undefined') return
            const url = new URL(window.location.href)
            if (tokenAValue) url.searchParams.set('input', tokenAValue)
            else url.searchParams.delete('input')
            url.searchParams.delete('tokenA')
            if (tokenBValue) url.searchParams.set('output', tokenBValue)
            else url.searchParams.delete('output')
            url.searchParams.delete('tokenB')
            if (referralCode && referralCode.startsWith('0x')) {
                url.searchParams.set('ref', referralCode)
            } else {
                url.searchParams.delete('ref')
            }
            window.history.replaceState({}, '', url.toString())
            // Broadcast a lightweight event so other hook instances (e.g., chart panel)
            // can react to token pair changes without tightly coupling component state.
            try {
                const detail = {
                    input: tokenAValue ? tokenAValue.toLowerCase() : null,
                    output: tokenBValue ? tokenBValue.toLowerCase() : null,
                }
                window.dispatchEvent(new CustomEvent('cmswap:tokenPairChanged', { detail }))
            } catch {}
        }, []
    )

    React.useEffect(() => {
        if (typeof window === 'undefined') {
            setHasInitializedFromParams(true)
            return
        }
        const searchParams = new URLSearchParams(window.location.search)
        const tokenAAddress = searchParams.get('input')?.toLowerCase()
        const tokenBAddress = searchParams.get('output')?.toLowerCase()
        const foundTokenA = tokenAAddress ? tokens.find((t) => t.value.toLowerCase() === tokenAAddress) : undefined
        const foundTokenB = tokenBAddress ? tokens.find((t) => t.value.toLowerCase() === tokenBAddress) : undefined
        if (foundTokenA) setTokenA(foundTokenA)
        if (foundTokenB) setTokenB(foundTokenB)
        if (persistSearchParams) {
            if (!tokenAAddress || !tokenBAddress) {
                const fallbackTokenA = foundTokenA ?? initialTokenA
                const fallbackTokenB = foundTokenB ?? initialTokenB
                if (fallbackTokenA?.value && fallbackTokenB?.value) updateURLWithTokens(fallbackTokenA.value, fallbackTokenB.value, referralAddress);
            } else {
                updateURLWithTokens(tokenAAddress, tokenBAddress, referralAddress)
            }
        }

        setHasInitializedFromParams(true)
        // We intentionally run this effect only once on mount to match existing behaviour in the swap variants.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const switchTokens = React.useCallback(() => {
        const nextTokenA = tokenB
        const nextTokenB = tokenA
        setTokenA(nextTokenA)
        setTokenB(nextTokenB)
        if (persistSearchParams) updateURLWithTokens(nextTokenA?.value, nextTokenB?.value, referralAddress);
    }, [tokenA, tokenB, updateURLWithTokens, referralAddress, persistSearchParams])

    React.useEffect(() => {
        setTokenA(initialTokenA)
        setTokenB(initialTokenB)
        // We want to realign default tokens if the token list or default indices change.
    }, [initialTokenA, initialTokenB])

    // Listen for global token pair updates (emitted by updateURLWithTokens).
    React.useEffect(() => {
        if (typeof window === 'undefined') return
        function onPairChanged(evt: any) {
            try {
                const input = evt?.detail?.input as string | null | undefined
                const output = evt?.detail?.output as string | null | undefined
                if (!input && !output) return
                const nextA = input ? tokens.find(t => t.value.toLowerCase() === input) : undefined
                const nextB = output ? tokens.find(t => t.value.toLowerCase() === output) : undefined
                if (nextA && nextA.value !== tokenA.value) setTokenA(nextA as T)
                if (nextB && nextB.value !== tokenB.value) setTokenB(nextB as T)
            } catch {}
        }
        window.addEventListener('cmswap:tokenPairChanged', onPairChanged as EventListener)
        return () => {
            window.removeEventListener('cmswap:tokenPairChanged', onPairChanged as EventListener)
        }
        // tokenA/tokenB included to keep updates minimal; tokens array provides identity
    }, [tokens, tokenA.value, tokenB.value])

    return {tokenA, tokenB, setTokenA, setTokenB, hasInitializedFromParams, updateURLWithTokens, switchTokens}
}
