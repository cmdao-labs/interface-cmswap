'use client';
import { readContract, sendTransaction, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import type { Abi } from 'viem'
type WagmiConfig = Parameters<typeof simulateContract>[0]
type RouterContract = {
    abi: Abi | readonly unknown[]
    address: string
    chainId: number
}
type ContractConfig = {
    abi: Abi | readonly unknown[]
    address: string
    chainId: number
}
export interface WrapNativeOptions {
    config: WagmiConfig
    wrappedTokenAddress: '0xstring'
    amount: bigint
}
export interface UnwrapNativeOptions {
    config: WagmiConfig
    contract: ContractConfig
    amount: bigint
    functionName?: string
    args?: readonly unknown[]
}
export interface ExecuteRouterSwapOptions {
    config: WagmiConfig
    router: RouterContract
    tokenIn: `0x${string}`
    tokenOut: `0x${string}`
    recipient: `0x${string}`
    amountIn: bigint
    amountOutMinimum: bigint
    fee?: number
    path?: `0x${string}`
    value?: bigint
    sqrtPriceLimitX96?: bigint
}
export interface ExecuteRouterSwapResult {
    hash: `0x${string}`
    amountOut: bigint
}
export interface EnsureTokenAllowanceOptions {
    config: WagmiConfig
    token: ContractConfig & { address: string }
    owner: `0x${string}`
    spender: `0x${string}`
    requiredAmount: bigint
    allowanceFunctionName?: string
    approveFunctionName?: string
    approveArgs?: readonly unknown[]
}

export async function wrapNativeToken({ config, wrappedTokenAddress, amount }: WrapNativeOptions): Promise<`0x${string}`> {
    const hash = await sendTransaction(config, { to: wrappedTokenAddress as `0x${string}`, value: amount })
    await waitForTransactionReceipt(config, { hash })
    return hash
}

export async function unwrapWrappedToken({ config, contract, amount, functionName = 'withdraw', args }: UnwrapNativeOptions): Promise<`0x${string}`> {
    const contractArgs = (args ?? [amount]) as readonly unknown[]
    const simulation = await simulateContract(config, {chainId: contract.chainId, abi: contract.abi as Abi, address: contract.address as `0x${string}`, functionName, args: contractArgs as never} as any)
    const hash = await writeContract(config, simulation.request)
    await waitForTransactionReceipt(config, { hash })
    return hash
}

export async function ensureTokenAllowance({ config, token, owner, spender, requiredAmount, allowanceFunctionName = 'allowance', approveFunctionName = 'approve', approveArgs }: EnsureTokenAllowanceOptions): Promise<void> {
    if (requiredAmount <= BigInt(0)) return
    const allowance = await readContract(config, {chainId: token.chainId, abi: token.abi as Abi, address: token.address as `0x${string}`, functionName: allowanceFunctionName, args: [owner, spender] as never} as any) as bigint
    if (allowance >= requiredAmount) return
    const approvalArguments = (approveArgs ?? [spender, requiredAmount]) as readonly unknown[]
    const simulation = await simulateContract(config, {chainId: token.chainId, abi: token.abi as Abi, address: token.address as `0x${string}`, functionName: approveFunctionName, args: approvalArguments as never} as any)
    const hash = await writeContract(config, simulation.request)
    await waitForTransactionReceipt(config, { hash })
}

export async function executeRouterSwap({config, router, tokenIn, tokenOut, recipient, amountIn, amountOutMinimum, fee, path, value, sqrtPriceLimitX96 = BigInt(0)}: ExecuteRouterSwapOptions): Promise<ExecuteRouterSwapResult> {
    if (!path && fee === undefined) throw new Error('executeRouterSwap requires a fee when no path is provided.');
    if (amountIn <= BigInt(0)) throw new Error('executeRouterSwap requires amountIn greater than zero.');
    if (amountOutMinimum < BigInt(0)) throw new Error('executeRouterSwap requires amountOutMinimum to be non-negative.');
    if (!recipient) throw new Error('executeRouterSwap requires a valid recipient address.');
    const routerAddress = router.address as `0x${string}`
    const routerAbi = router.abi as Abi
    if (path) {
        const args = [{path, recipient, amountIn, amountOutMinimum}] as const
        const simulation = value !== undefined ? 
            await simulateContract(config, {chainId: router.chainId, abi: routerAbi, address: routerAddress, functionName: 'exactInput', args, value} as any) :
            await simulateContract(config, {chainId: router.chainId, abi: routerAbi, address: routerAddress, functionName: 'exactInput', args} as any)
        const { result, request } = simulation
        const hash = await writeContract(config, request)
        await waitForTransactionReceipt(config, { hash })
        return {hash, amountOut: result as bigint}
    }
    const args = [{tokenIn, tokenOut, fee: fee as number, recipient, amountIn, amountOutMinimum, sqrtPriceLimitX96}] as const
    const simulation = value !== undefined ?
        await simulateContract(config, {chainId: router.chainId, abi: routerAbi, address: routerAddress, functionName: 'exactInputSingle', args, value} as any) :
        await simulateContract(config, {chainId: router.chainId, abi: routerAbi, address: routerAddress, functionName: 'exactInputSingle', args} as any)
    const { result, request } = simulation
    const hash = await writeContract(config, request)
    await waitForTransactionReceipt(config, { hash })
    return {hash, amountOut: result as bigint}
}
