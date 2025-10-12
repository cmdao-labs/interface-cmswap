'use client'

import * as React from 'react'
import { simulateContract } from '@wagmi/core'
import type { Abi } from 'viem'

type WagmiConfig = Parameters<typeof simulateContract>[0]

type QuoteContract = {
    address: string
    abi: Abi | readonly unknown[]
    chainId: number
}

type SwapTokenWithValue = {
    value: '0xstring'
}

interface UseSwapQuoteOptions<TToken extends SwapTokenWithValue> {
    config: WagmiConfig
    contract: QuoteContract
    tokens: readonly TToken[]
    nativeTokenIndex?: number
    wrappedTokenIndex?: number
}

interface QuoteResult {
    amountOut: bigint
    sqrtPriceX96?: bigint
    raw?: readonly unknown[]
}

interface QuoteExactInputSingleParams<TToken> {
    tokenIn: TToken
    tokenOut: TToken
    fee: number
    amount: string
    parseAmount: (amount: string, token: TToken) => bigint
    sqrtPriceLimitX96?: bigint
    suppressErrors?: boolean
}

interface QuoteExactInputParams<TToken> {
    path: `0x${string}`
    tokenIn: TToken
    amount: string
    parseAmount: (amount: string, token: TToken) => bigint
    suppressErrors?: boolean
}

export function useSwapQuote<TToken extends SwapTokenWithValue>(
    options: UseSwapQuoteOptions<TToken>
) {
    const {
        config,
        contract,
        tokens,
        nativeTokenIndex = 0,
        wrappedTokenIndex = 1,
    } = options

    const nativeTokenValue = tokens[nativeTokenIndex]?.value ?? null
    const wrappedTokenValue = tokens[wrappedTokenIndex]?.value ?? null

    const resolveTokenAddress = React.useCallback(
        (token: TToken) => {
            const rawValue = (token as unknown as { value?: string })?.value
            if (!rawValue) {
                throw new Error('Token value is undefined. Ensure tokens include a value property.')
            }
            if (
                nativeTokenValue &&
                wrappedTokenValue &&
                rawValue.toLowerCase() === nativeTokenValue.toLowerCase()
            ) {
                return wrappedTokenValue
            }
            return rawValue as `0x${string}`
        },
        [nativeTokenValue, wrappedTokenValue]
    )

    const quoteExactInputSingle = React.useCallback(
        async (params: QuoteExactInputSingleParams<TToken>): Promise<QuoteResult | null> => {
            const {
                tokenIn,
                tokenOut,
                fee,
                amount,
                parseAmount,
                sqrtPriceLimitX96 = BigInt(0),
                suppressErrors = false,
            } = params

            if (!amount || Number(amount) === 0) return null

            try {
                const normalizedIn = resolveTokenAddress(tokenIn) as `0x${string}`
                const normalizedOut = resolveTokenAddress(tokenOut) as `0x${string}`
                const amountIn = parseAmount(amount, tokenIn)

                if (amountIn <= BigInt(0)) return null

                const response = await simulateContract(config, {
                    abi: contract.abi,
                    address: contract.address as `0x${string}`,
                    chainId: contract.chainId,
                    functionName: 'quoteExactInputSingle',
                    args: [{
                        tokenIn: normalizedIn,
                        tokenOut: normalizedOut,
                        amountIn,
                        fee,
                        sqrtPriceLimitX96,
                    }] as const,
                } as const)

                const result = response.result as readonly [bigint, bigint?] | undefined
                const amountOut = result?.[0] ?? BigInt(0)
                const sqrtPriceX96 = result?.[1]

                return { amountOut, sqrtPriceX96, raw: result }
            } catch (error) {
                if (!suppressErrors) throw error
                return null
            }
        },
        [config, contract, resolveTokenAddress]
    )

    const quoteExactInput = React.useCallback(
        async (params: QuoteExactInputParams<TToken>): Promise<QuoteResult | null> => {
            const {
                path,
                tokenIn,
                amount,
                parseAmount,
                suppressErrors = false,
            } = params

            if (!amount || Number(amount) === 0) return null

            try {
                const amountIn = parseAmount(amount, tokenIn)
                if (amountIn <= BigInt(0)) return null

                const response = await simulateContract(config, {
                    abi: contract.abi,
                    address: contract.address as `0x${string}`,
                    chainId: contract.chainId,
                    functionName: 'quoteExactInput',
                    args: [path, amountIn] as const,
                } as const)

                const result = response.result as readonly [bigint, bigint?] | undefined
                const amountOut = result?.[0] ?? BigInt(0)
                const sqrtPriceX96 = result?.[1]

                return { amountOut, sqrtPriceX96, raw: result }
            } catch (error) {
                if (!suppressErrors) throw error
                return null
            }
        },
        [config, contract]
    )

    return {
        resolveTokenAddress,
        quoteExactInputSingle,
        quoteExactInput,
    }
}
