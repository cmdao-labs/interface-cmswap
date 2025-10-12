'use client'

/**
 * Encodes a Uniswap-style multi-hop path.
 *
 * @param tokens Ordered list of token addresses.
 * @param fees Fee tiers applied between each hop.
 * @returns Hex encoded path string.
 */
export function encodePath(tokens: readonly string[], fees: readonly number[]): `0x${string}` {
    if (tokens.length === 0) {
        throw new Error('encodePath requires at least one token address')
    }

    if (tokens.length !== fees.length + 1) {
        throw new Error('encodePath expects fees length to be tokens length minus one')
    }

    let path = '0x'
    for (let i = 0; i < fees.length; i++) {
        path += tokens[i].slice(2)
        path += fees[i].toString(16).padStart(6, '0')
    }
    path += tokens[tokens.length - 1].slice(2)
    return path as `0x${string}`
}

/**
 * Encodes a minimal path that only contains the final token.
 * Used by JibSwap which expects a single address encoded as bytes.
 *
 * @param tokens Ordered list of token addresses.
 * @returns Hex encoded path string.
 */
export function encodeTerminalToken(tokens: readonly string[]): `0x${string}` {
    if (tokens.length === 0) {
        throw new Error('encodeTerminalToken requires at least one token address')
    }

    return `0x${tokens[tokens.length - 1].slice(2)}` as `0x${string}`
}

