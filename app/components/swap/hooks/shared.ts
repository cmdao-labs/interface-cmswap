'use client'

type SwapTokenBase = {
    value: '0xstring'
    name: string
}

type NormalizedTokenPair = {
    tokenAValue: '0xstring'
    tokenBValue: '0xstring'
    isSameToken: boolean
    isNativeWrappedPair: boolean
    isTokenANative: boolean
    isTokenBNative: boolean
}

const normalizeValue = (value: '0xstring') => value.toUpperCase()

export function normalizeTokenPair<T extends SwapTokenBase>(
    tokens: readonly T[],
    tokenA: T,
    tokenB: T
): NormalizedTokenPair {
    if (!tokens.length) {
        throw new Error('normalizeTokenPair requires at least one token in the list.')
    }

    const nativeToken = tokens[0]
    const wrappedToken = tokens[1] ?? nativeToken

    const nativeUpper = normalizeValue(nativeToken.value)
    const wrappedUpper = normalizeValue(wrappedToken.value)
    const tokenAUpper = normalizeValue(tokenA.value)
    const tokenBUpper = normalizeValue(tokenB.value)

    const isTokenANative = tokenAUpper === nativeUpper
    const isTokenBNative = tokenBUpper === nativeUpper

    const tokenAValue = (isTokenANative ? wrappedToken.value : tokenA.value) as '0xstring'
    const tokenBValue = (isTokenBNative ? wrappedToken.value : tokenB.value) as '0xstring'

    const isSameToken = tokenAUpper === tokenBUpper
    const isNativeWrappedPair =
        (isTokenANative && tokenBUpper === wrappedUpper) ||
        (isTokenBNative && tokenAUpper === wrappedUpper)

    return {
        tokenAValue,
        tokenBValue,
        isSameToken,
        isNativeWrappedPair,
        isTokenANative,
        isTokenBNative,
    }
}
