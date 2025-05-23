import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther } from 'viem'
import { ArrowDown, ChevronDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebouncedCallback } from 'use-debounce'
import { tokens, ROUTER02, v3FactoryContract, qouterV2Contract, router02Contract, erc20ABI, kap20ABI, v3PoolABI, wrappedNative, CMswapUniSmartRouteContractV2, UniswapPairv2PoolABI, CMswapUniSmartRoute, BitkubEvmKYCContract } from '@/app/lib/96'
import { config } from '@/app/config'
import { useSearchParams } from 'next/navigation'

export default function Swap96({
    setIsLoading, setErrMsg,
}: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>,
}) {
    const { address } = useAccount()
    const [txupdate, setTxupdate] = React.useState("")
    const [exchangeRate, setExchangeRate] = React.useState("")
    const [fixedExchangeRate, setFixedExchangeRate] = React.useState("")
    const [altRoute, setAltRoute] = React.useState<{ a: '0xstring', b: '0xstring', c: '0xstring' }>()
    
    const [CMswapTVL, setCMswapTVL] = React.useState<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; isReverted: boolean; FixedExchangeRate: string; }>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" });
    const [DMswapTVL, setDMswapTVL] = React.useState<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; isReverted: boolean; FixedExchangeRate: string;  }>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" });
    const [ponderTVL, setPonderTVL] = React.useState<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; isReverted: boolean; FixedExchangeRate: string;  }>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" });
    const [UdonTVL, setUdonTVL] = React.useState<{ tvl10000: string; exchangeRate: string; isReverted: boolean; FixedExchangeRate: string;  }>({ tvl10000: "", exchangeRate: "", isReverted: false, FixedExchangeRate: "" });
    
    const [reserveUdonA, setReserveUdonA] = React.useState(BigInt(0))
    const [reserveUdonB, setReserveUdonB] = React.useState(BigInt(0))
    const [bestPool, setBestPool] = React.useState("")
    const [poolSelect, setPoolSelect] = React.useState("")
    const [bestPathArray, setBestPathArray] = React.useState<string[] | null>(null)
    const [wrappedRoute, setWrappedRoute] = React.useState(false)
    const [newPrice, setNewPrice] = React.useState("")
    const [tokenA, setTokenA] = React.useState<{ name: string, value: '0xstring', logo: string }>(tokens[0])
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{ name: string, value: '0xstring', logo: string }>(tokens[2])
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [swapDirection, setSwapDirection] = React.useState(true) // false = A->B, true = B->A
    const [CMswapToken0, setCMswapToken0] = React.useState("");
    const [isAccountKYC, setAccountKYC] = React.useState(false); //  NEED KYC LEVEL 1 FOR UNWRAPPED KKUB to KUB
    const [hasInitializedFromParams, setHasInitializedFromParams] = React.useState(false)

    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const tokenAAddress = searchParams.get('tokenA')?.toLowerCase()
        const tokenBAddress = searchParams.get('tokenB')?.toLowerCase()

        if (tokenAAddress && tokenBAddress) {
            const foundTokenA = tokens.find(t => t.value.toLowerCase() === tokenAAddress)
            const foundTokenB = tokens.find(t => t.value.toLowerCase() === tokenBAddress)

            if (foundTokenA) setTokenA(foundTokenA)
            if (foundTokenB) setTokenB(foundTokenB)
        } else {
            if (tokenA?.value && tokenB?.value) {
                updateURLWithTokens(tokenA.value, tokenB.value)
            }
        }
        setHasInitializedFromParams(true)
    }, [])

    React.useEffect(() => {
        console.log("hasInitializedFromParams : ",hasInitializedFromParams)
    },[hasInitializedFromParams])

    const updateURLWithTokens = (tokenAValue?: string, tokenBValue?: string) => {
        const url = new URL(window.location.href)

        if (tokenAValue) { url.searchParams.set('tokenA', tokenAValue) }
        if (tokenBValue) { url.searchParams.set('tokenB', tokenBValue) }
        if (!tokenAValue) { url.searchParams.delete('tokenA') }
        if (!tokenBValue) { url.searchParams.delete('tokenB') }
        window.history.replaceState({}, '', url.toString())
    }

    const checkBitkubEVMKycLevel = async () => {
        if (!address) return;

        try {
            const [{ result }] = await readContracts(config, {
                contracts: [{ ...BitkubEvmKYCContract, functionName: 'kycsLevel', args: [address] }]
            });

            console.log(`Account : ${address}\nKYC Level: ${result}`);
            setAccountKYC(!!result && result > 1);

        } catch (error) {
            setErrMsg(error as WriteContractErrorType);
        }
    };

    function encodePath(tokens: string[], fees: number[]): string {
        let path = "0x"
        for (let i = 0; i < fees.length; i++) {
            path += tokens[i].slice(2)
            path += fees[i].toString(16).padStart(6, "0")
        }
        path += tokens[tokens.length - 1].slice(2)
        return path
    }


    const getQoute = useDebouncedCallback(async (_amount: string) => {
        setAltRoute(undefined)
        let CMswapRate = 0; let DiamonSwapRate = 0; let UdonswapRate = 0; let ponderRate = 0;
        const amountIn = Number(_amount)
        let tokenAvalue
        let tokenBvalue
        if (tokenA.value === tokens[0].value) {
            tokenAvalue = tokens[1].value
        } else {
            tokenAvalue = tokenA.value
        }
        if (tokenB.value === tokens[0].value) {
            tokenBvalue = tokens[1].value
        } else {
            tokenBvalue = tokenB.value
        }
        if (wrappedRoute) {
            setAmountB(amountIn.toString())
        } else {
            //**--------- CMswap */
            try {
                if (Number(_amount) !== 0) {
                    if (altRoute === undefined) {
                        const qouteOutput = await simulateContract(config, {
                            ...qouterV2Contract, functionName: 'quoteExactInputSingle', args: [{ tokenIn: tokenAvalue as '0xstring', tokenOut: tokenBvalue as '0xstring', amountIn: parseEther(_amount), fee: feeSelect, sqrtPriceLimitX96: BigInt(0), }]
                        })
                        if (poolSelect === "CMswap") {
                            setAmountB(formatEther(qouteOutput.result[0]))
                            let newPrice = CMswapTVL.isReverted ? 1 / ((Number(qouteOutput.result[1]) / (2 ** 96)) ** 2) : Number(qouteOutput.result[1]) / (2 ** 96)
                            setNewPrice(newPrice.toString())
                        }
                        CMswapRate = qouteOutput.result[0] !== undefined ? Number(formatEther(qouteOutput.result[0])) : 0  
                    } else {
                        const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                        const qouteOutput = await simulateContract(config, {
                            ...qouterV2Contract,
                            functionName: 'quoteExactInput',
                            args: [route as '0xstring', parseEther(_amount)]
                        })
                        if (poolSelect === "CMswap") {
                            setAmountB(formatEther(qouteOutput.result[0]))
                            let newPrice =  CMswapTVL.isReverted ? 1 / ((Number(qouteOutput.result[1]) / (2 ** 96)) ** 2) : Number(qouteOutput.result[1]) / (2 ** 96)
                            setNewPrice(newPrice.toString())
                            setExchangeRate(CMswapTVL.exchangeRate);
                        }
                        CMswapRate = qouteOutput.result[0] !== undefined ? Number(formatEther(qouteOutput.result[0])) : 0

                    }
                } else {
                    setAmountB("")
                }
            } catch { }
            //**--------- DiamonSwap */
            try {
                if (Number(_amount) !== 0) {
                    const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(0), tokenAvalue, tokenBvalue], }] })
                    const DiamondPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'

                    const getBestPrice = await readContracts(config, {
                        contracts: [
                            { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(0), tokenAvalue, tokenBvalue, parseEther(_amount)] },
                            { ...UniswapPairv2PoolABI, address: DiamondPair, functionName: 'token0' }
                        ]
                    });

                    const result = getBestPrice[0].result;
                    const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0);
                    const bestPath = result !== undefined ? result[1] : [];
                    const bestPathArray: string[] = bestPath.map((addr: `0x${string}`) => addr); // แปลง readonly `0x${string}`[] เป็น string[]

                    if (bestPathArray.length > 2 && poolSelect === "DiamonSwap") {
                        console.log("DM ROUTED : ", bestPathArray)
                        setAltRoute({ a: bestPathArray[0] as '0xstring', b: bestPathArray[1] as '0xstring', c: bestPathArray[2] as '0xstring' })
                    }

                    if (poolSelect === "DiamonSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
                        setBestPathArray(bestPathArray)
                        const price = DMswapTVL.isReverted ? amountIn / Number(formatEther(bestAmountOut)) : Number(formatEther(bestAmountOut)) / amountIn

                        setExchangeRate(price.toString());
                        setNewPrice((price).toFixed(6));
                        setAmountB(formatEther(bestAmountOut))
                    }
                    DiamonSwapRate = Number(formatEther(bestAmountOut))

                }
            } catch (error) {
                console.error("Error in getting DiamondSwap quote:", error);
            }
            //**--------- UdonSwap */
            try {
                if (Number(_amount) !== 0) {
                    const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(1), tokenAvalue, tokenBvalue], }] })
                    const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'

                    const getBestPrice = await readContracts(config, {
                        contracts: [
                            { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(1), tokenAvalue, tokenBvalue, parseEther(_amount)] },
                            { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' }
                        ]
                    });
                    const result = getBestPrice[0].result;
                    const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0);
                    const bestPath = result !== undefined ? result[1] : [];
                    const bestPathArray: string[] = bestPath.map((addr: `0x${string}`) => addr); // แปลง readonly `0x${string}`[] เป็น string[]
                    if (bestPathArray.length > 2 && poolSelect === "UdonSwap") {
                        console.log("UDON ROUTED : ", bestPathArray)
                        setAltRoute({ a: bestPathArray[0] as '0xstring', b: bestPathArray[1] as '0xstring', c: bestPathArray[2] as '0xstring' })
                    }
                    if (poolSelect === "UdonSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
                        setBestPathArray(bestPathArray)
                        const newReserveA = Number(formatEther(reserveUdonA)) + Number(_amount)
                        const newReserveB = Number(formatEther(reserveUdonB)) - Number(formatEther(bestAmountOut))
                        const newprice = newReserveA/newReserveB
                        setNewPrice((newprice).toFixed(6));
                        setAmountB(formatEther(bestAmountOut))
                    }
                        UdonswapRate = Number(formatEther(bestAmountOut))
                }
            } catch (error) {
                console.error("Error in getting UdonSwap quote:", error);
            }

             //**--------- ponderFinance */
            try {
                if (Number(_amount) !== 0) {
                    const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(2), tokenAvalue, tokenBvalue], }] })
                    const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'

                    const getBestPrice = await readContracts(config, {
                        contracts: [
                            { ...CMswapUniSmartRouteContractV2, functionName: 'findBestPathAndAmountOut', args: [BigInt(2), tokenAvalue, tokenBvalue, parseEther(_amount)] },
                            { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' }
                        ]
                    });

                    const result = getBestPrice[0].result;
                    const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0);
                    const bestPath = result !== undefined ? result[1] : [];
                    const bestPathArray: string[] = bestPath.map((addr: `0x${string}`) => addr); // แปลง readonly `0x${string}`[] เป็น string[]

                    if (bestPathArray.length > 2 && poolSelect === "ponder") {
                        console.log("Ponder ROUTED : ", bestPathArray)
                        setAltRoute({ a: bestPathArray[0] as '0xstring', b: bestPathArray[1] as '0xstring', c: bestPathArray[2] as '0xstring' })
                    }

                    if (poolSelect === "ponder" && Number(_amount) > 0 && bestAmountOut > 0) {
                        setBestPathArray(bestPathArray)
                        const price = ponderTVL.isReverted ? amountIn / Number(formatEther(bestAmountOut)) : Number(formatEther(bestAmountOut)) / amountIn
                        setNewPrice((price).toFixed(6));
                        setExchangeRate(price.toString());
                        setAmountB(formatEther(bestAmountOut))
                    }
                    ponderRate = Number(formatEther(bestAmountOut))
                }
            } catch (error) {
                console.error("Error in getting PonderSwap quote:", error);
            }

            console.log(`New RATE UPDATED\nCMswap : ${CMswapRate}\nDiamonSwap : ${DiamonSwapRate}\nUdonSwap  :${UdonswapRate}\nPonderFinance : ${ponderRate} `);
            return { CMswapRate, DiamonSwapRate, UdonswapRate,ponderRate }
        }
    }, 700)

    const switchToken = () => {
        setExchangeRate("")
        const _tokenA = tokenB
        const _tokenB = tokenA
        setTokenA(_tokenA)
        setTokenB(_tokenB)
        updateURLWithTokens(_tokenA.value,_tokenB.value)
    }

    const handleSwap = async () => {
        if (wrappedRoute) {
            wrap()
        } else if (poolSelect === "CMswap") {
            console.log("Swap with CMswap")
            CMswap()
        } else if (poolSelect === "DiamonSwap") {
            console.log("Swap with DiamonSwap")
            DMswap()
        } else if (poolSelect === "UdonSwap") {
            console.log("Swap with UdonSwap")
            Udonswap()
        } else if (poolSelect === "ponder"){
            console.log("Swap with ponder")
            ponderSwap()
        }
    }

    const wrap = async () => {
        setIsLoading(true)
        try {
            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const h = await sendTransaction(config, { to: tokens[1].value, value: parseEther(amountA) })
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    ...wrappedNative,
                    functionName: 'withdraw',
                    args: [parseEther(amountA)]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const CMswap = async () => {
        setIsLoading(true)
        try {
            let tokenAvalue
            let tokenBvalue
            if (tokenA.value === tokens[0].value) {
                tokenAvalue = tokens[1].value
            } else {
                tokenAvalue = tokenA.value
            }
            if (tokenB.value === tokens[0].value) {
                tokenBvalue = tokens[1].value
            } else {
                tokenBvalue = tokenB.value
            }
            if (tokenA.value.toUpperCase() !== tokens[0].value.toUpperCase()) {
                let allowanceA
                if (tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()) {
                    allowanceA = await readContract(config, { ...kap20ABI, address: tokenA.value as '0xstring', functionName: 'allowances', args: [address as '0xstring', ROUTER02] })
                } else {
                    allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', ROUTER02] })
                }
                if (allowanceA < parseEther(amountA)) {
                    const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [ROUTER02, parseEther(amountA)] })
                    const h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
            }
            let h
            let r
            if (altRoute === undefined) {
                const { result, request } = await simulateContract(config, {
                    ...router02Contract,
                    functionName: 'exactInputSingle',
                    args: [{
                        tokenIn: tokenAvalue as '0xstring',
                        tokenOut: tokenBvalue as '0xstring',
                        fee: feeSelect,
                        recipient: address as '0xstring',
                        amountIn: parseEther(amountA),
                        amountOutMinimum: parseEther(amountB) * BigInt(95) / BigInt(100),
                        sqrtPriceLimitX96: BigInt(0)
                    }],
                    value: tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ? parseEther(amountA) : BigInt(0)
                })
                r = result
                h = await writeContract(config, request)
            } else {
                const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                const { result, request } = await simulateContract(config, {
                    ...router02Contract,
                    functionName: 'exactInput',
                    args: [{
                        path: route as '0xstring',
                        recipient: address as '0xstring',
                        amountIn: parseEther(amountA),
                        amountOutMinimum: parseEther(amountB) * BigInt(95) / BigInt(100)
                    }],
                    value: tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ? parseEther(amountA) : BigInt(0)
                })
                r = result
                h = await writeContract(config, request)
            }
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
            if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    ...wrappedNative,
                    functionName: 'withdraw',
                    args: [r as bigint]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const DMswap = async () => {
        setIsLoading(true)
        try {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10

            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                // token a 
                let h, r

                if (tokenA.value.toUpperCase() === tokens[0].value.toLocaleUpperCase()) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactETHForTokensWithFee',
                        value: parseEther(amountA),
                        args: [BigInt(0), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)

                } else {
                    const route = bestPathArray as readonly `0x${string}`[];
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [
                            BigInt(0),
                            parseEther(amountA),
                            parseEther(amountB) * BigInt(95) / BigInt(100),
                            route,
                            address as `0x${string}`,
                            BigInt(deadline)
                        ]
                    });

                    r = result;
                    h = await writeContract(config, request);
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }


            } else if (tokenA.value.toUpperCase() !== tokens[0].value.toLocaleUpperCase()) {
                // token A = Normal ERC20
                let allowanceA;
                if (tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()) {
                    allowanceA = await readContract(config, { ...kap20ABI, address: tokenA.value as '0xstring', functionName: 'allowances', args: [address as '0xstring', CMswapUniSmartRoute] })
                } else {
                    allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapUniSmartRoute] })
                }
                if (allowanceA < parseEther(amountA)) {
                    const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapUniSmartRoute, parseEther(amountA)] })
                    const h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10

                let h, r

                if (altRoute === undefined || bestPathArray !== undefined) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [BigInt(0), parseEther(amountA), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }

            }

        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const Udonswap = async () => {
        setIsLoading(true)
        try {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10

            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                // token a 
                let h, r

                if (tokenA.value.toUpperCase() === tokens[0].value.toLocaleUpperCase()) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactETHForTokensWithFee',
                        value: parseEther(amountA),
                        args: [BigInt(1), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)

                } else {
                    const route = bestPathArray as readonly `0x${string}`[];
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [
                            BigInt(1),
                            parseEther(amountA),
                            parseEther(amountB) * BigInt(95) / BigInt(100),
                            route,
                            address as `0x${string}`,
                            BigInt(deadline)
                        ]
                    });

                    r = result;
                    h = await writeContract(config, request);
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }


            } else if (tokenA.value.toUpperCase() !== tokens[0].value.toLocaleUpperCase()) {
                // token A = Normal ERC20
                let allowanceA;
                if (tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()) {
                    allowanceA = await readContract(config, { ...kap20ABI, address: tokenA.value as '0xstring', functionName: 'allowances', args: [address as '0xstring', CMswapUniSmartRoute] })
                } else {
                    allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapUniSmartRoute] })
                }
                if (allowanceA < parseEther(amountA)) {
                    const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapUniSmartRoute, parseEther(amountA)] })
                    const h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10

                let h, r

                if (altRoute === undefined || bestPathArray !== undefined) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [BigInt(1), parseEther(amountA), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }

            }

        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const ponderSwap = async () => {
        setIsLoading(true)
        try {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10

            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                // token a 
                let h, r

                if (tokenA.value.toUpperCase() === tokens[0].value.toLocaleUpperCase()) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactETHForTokensWithFee',
                        value: parseEther(amountA),
                        args: [BigInt(2), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)

                } else {
                    const route = bestPathArray as readonly `0x${string}`[];
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [
                            BigInt(2),
                            parseEther(amountA),
                            parseEther(amountB) * BigInt(95) / BigInt(100),
                            route,
                            address as `0x${string}`,
                            BigInt(deadline)
                        ]
                    });

                    r = result;
                    h = await writeContract(config, request);
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }


            } else if (tokenA.value.toUpperCase() !== tokens[0].value.toLocaleUpperCase()) {
                // token A = Normal ERC20
                let allowanceA;
                if (tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()) {
                    allowanceA = await readContract(config, { ...kap20ABI, address: tokenA.value as '0xstring', functionName: 'allowances', args: [address as '0xstring', CMswapUniSmartRoute] })
                } else {
                    allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapUniSmartRoute] })
                }
                if (allowanceA < parseEther(amountA)) {
                    const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapUniSmartRoute, parseEther(amountA)] })
                    const h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10

                let h, r

                if (altRoute === undefined || bestPathArray !== undefined) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContractV2,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [BigInt(2), parseEther(amountA), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                }

            }

        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    React.useEffect(() => {

        const fetch0 = async () => {
            (tokenA.value.toUpperCase() === tokenB.value.toUpperCase()) && setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico' })

            let tokenAvalue
            let tokenBvalue
            if (tokenA.value === tokens[0].value) {
                tokenAvalue = tokens[1].value
            } else {
                tokenAvalue = tokenA.value
            }
            if (tokenB.value === tokens[0].value) {
                tokenBvalue = tokens[1].value
            } else {
                tokenBvalue = tokenB.value
            }
            const nativeBal = address !== undefined ? await getBalance(config, { address: address as '0xstring' }) : { value: BigInt(0) }
            const stateA = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenAvalue, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [address as '0xstring'] }
                ]
            })
            const stateB = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenBvalue, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [address as '0xstring'] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 10000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 3000] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 500] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokenBvalue, 100] },
                ]
            })
            stateA[0].result !== undefined && tokenA.name === "Choose Token" && setTokenA({
                name: stateA[0].result,
                value: tokenA.value,
                logo: tokens.map(obj => obj.value).indexOf(tokenA.value) !== -1 ?
                    tokens[tokens.map(obj => obj.value).indexOf(tokenA.value)].logo :
                    "../favicon.ico"
            })
            stateB[0].result !== undefined && tokenB.name === "Choose Token" && setTokenB({
                name: stateB[0].result,
                value: tokenB.value,
                logo: tokens.map(obj => obj.value).indexOf(tokenB.value) !== -1 ?
                    tokens[tokens.map(obj => obj.value).indexOf(tokenB.value)].logo :
                    "../favicon.ico"
            });
            tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ?
                setTokenABalance(formatEther(nativeBal.value)) :
                stateA[1].result !== undefined && setTokenABalance(formatEther(stateA[1].result))
            tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() ?
                setTokenBBalance(formatEther(nativeBal.value)) :
                stateB[1].result !== undefined && setTokenBBalance(formatEther(stateB[1].result))
            const pair10000 = stateB[2].result !== undefined ? stateB[2].result as '0xstring' : '' as '0xstring'
            const pair3000 = stateB[3].result !== undefined ? stateB[3].result as '0xstring' : '' as '0xstring'
            const pair500 = stateB[4].result !== undefined ? stateB[4].result as '0xstring' : '' as '0xstring'
            const pair100 = stateB[5].result !== undefined ? stateB[5].result as '0xstring' : '' as '0xstring'

            const updateCMswapTvlKey = (key: keyof typeof CMswapTVL, value: number,isReverted: boolean) => { setCMswapTVL(prevTvl => ({ ...prevTvl, [key]: value >= 1e-9 ? value.toString() : '0', isReverted })); };

            const updateDMswapTvlKey = (value: number,isReverted: boolean) => { setDMswapTVL(prevTvl => ({ ...prevTvl, tvl10000: value >= 1e-9 ? value.toString() : '0', isReverted })); };
            const updateUdonswapTvlKey = (value: number,isReverted: boolean) => { setUdonTVL(prevTvl => ({ ...prevTvl, tvl10000: value >= 1e-9 ? value.toString() : '0', isReverted })); };
            const updateExchangeRateCMswapTVL = (feeAmount: number, exchangeRate: number) => {
                setCMswapTVL(prevTvl => ({ ...prevTvl, exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prevTvl.exchangeRate }));
            };
            const updateExchangeRateDMswapTVL = (exchangeRate: number) => {
                setDMswapTVL(prevTvl => ({ ...prevTvl, exchangeRate: exchangeRate.toString() }));
            };
            const updateExchangeRateUdonswapTVL = (exchangeRate: number) => {
                setUdonTVL(prevTvl => ({ ...prevTvl, exchangeRate: exchangeRate.toString() }));
            };

            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                if ((tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[1].value.toUpperCase()) || (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[1].value.toUpperCase())) {
                    setExchangeRate("1")
                    setWrappedRoute(true)
                } else {
                    setWrappedRoute(false)
                    //** CMswap */
                    try {
                        setAltRoute(undefined)
                        const poolState = await readContracts(config, {
                            contracts: [
                                { ...v3PoolABI, address: pair10000, functionName: 'token0' },
                                { ...v3PoolABI, address: pair10000, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair10000] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair10000] },
                                { ...v3PoolABI, address: pair3000, functionName: 'token0' },
                                { ...v3PoolABI, address: pair3000, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair3000] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair3000] },
                                { ...v3PoolABI, address: pair500, functionName: 'token0' },
                                { ...v3PoolABI, address: pair500, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair500] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair500] },
                                { ...v3PoolABI, address: pair100, functionName: 'token0' },
                                { ...v3PoolABI, address: pair100, functionName: 'slot0' },
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [pair100] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [pair100] },
                            ]
                        })
                        const token0_10000 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
                        const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                        const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                        const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)

                        let currPrice_10000; // temp handle issue for kkub/kusdt wrong quote price
                        let isReverted = false
                        if(
                            tokenAvalue === '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring' && tokenBvalue === '0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring'
                            ||
                            tokenAvalue === '0x7d984C24d2499D840eB3b7016077164e15E5faA6' as '0xstring' && tokenBvalue === '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5' as '0xstring'
                        ){
                            currPrice_10000 = token0_10000.toUpperCase() !== tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2))
                            if(feeSelect === 10000){
                                isReverted = token0_10000.toUpperCase() !== tokenBvalue.toUpperCase() ? false : true
                            setExchangeRate(currPrice_10000.toString());
                            }
                        }else{
                            currPrice_10000 = token0_10000.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2))
                             if(feeSelect === 10000){
                                isReverted = token0_10000.toUpperCase() === tokenBvalue.toUpperCase() ?  false : true
                            setExchangeRate(currPrice_10000.toString());
                            }   
                        }

                        console.warn(`Token0 \n${token0_10000}\nTokenB \n${tokenBvalue}\n${token0_10000.toUpperCase() !== tokenBvalue.toUpperCase()}\nPrice : ${currPrice_10000}`)
                        const tvl_10000 = currPrice_10000 !== 0 && currPrice_10000 !== Infinity ? (Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000)) + Number(formatEther(tokenBamount_10000)) : 0
                        feeSelect === 10000 && currPrice_10000 !== Infinity && updateExchangeRateCMswapTVL(10000, Number(currPrice_10000.toString()))
                        feeSelect === 10000 && currPrice_10000 !== Infinity && setCMswapTVL({ ...CMswapTVL, FixedExchangeRate: ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2).toString() })
                        feeSelect === 10000 && currPrice_10000 !== Infinity && tvl_10000 < 1e-9 && updateExchangeRateCMswapTVL(10000, 0)
                        updateCMswapTvlKey('tvl10000', tvl_10000,isReverted)
                   
                        //tvl_10000 >= 1e-9 ? setTvl10000(tvl_10000.toString()) : setTvl10000('0')
                        if (feeSelect === 10000 && tvl_10000 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 10000] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 10000] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[i / 2]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            console.log({ altIntermediate, altPair0, altPair1 }) // for quick debugging
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                updateExchangeRateCMswapTVL(10000, Number((altPrice1 / altPrice0).toString()))
                            }
                        }

                        const token0_3000 = poolState[4].result !== undefined ? poolState[4].result : "" as '0xstring'
                        const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                        const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                        const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                        const currPrice_3000 = token0_3000.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2))
                        if(feeSelect === 3000){
                            isReverted = token0_3000.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                        }
                        
                        const tvl_3000 = currPrice_3000 !== 0 && currPrice_3000 !== Infinity ? (Number(formatEther(tokenAamount_3000)) * (1 / currPrice_3000)) + Number(formatEther(tokenBamount_3000)) : 0
                        feeSelect === 3000 && currPrice_3000 !== Infinity && updateExchangeRateCMswapTVL(3000, Number(currPrice_3000.toString()))
                        feeSelect === 3000 && currPrice_3000 !== Infinity  && setCMswapTVL({ ...CMswapTVL, FixedExchangeRate: ((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2).toString() })
                        feeSelect === 3000 && currPrice_3000 !== Infinity && tvl_3000 < 1e-9 && updateExchangeRateCMswapTVL(3000, 0)
                        //tvl_3000 >= 1e-9 ? setTvl3000(tvl_3000.toString()) : setTvl3000('0')
                        updateCMswapTvlKey('tvl3000', tvl_3000,isReverted);
               

                        if (feeSelect === 3000 && tvl_3000 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 3000] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 3000] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                feeSelect === 3000 && updateExchangeRateCMswapTVL(3000, Number((altPrice1 / altPrice0).toString()))
                            }
                        }

                        const token0_500 = poolState[8].result !== undefined ? poolState[8].result : "" as '0xstring'
                        const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                        const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                        const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                        const currPrice_500 = token0_500.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_500) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2))
                        const tvl_500 = currPrice_500 !== 0 && currPrice_500 !== Infinity ? (Number(formatEther(tokenAamount_500)) * (1 / currPrice_500)) + Number(formatEther(tokenBamount_500)) : 0
                        feeSelect === 500 && currPrice_500 !== Infinity && updateExchangeRateCMswapTVL(500, Number(currPrice_500.toString()))
                        feeSelect === 500 && currPrice_500 !== Infinity  && setCMswapTVL({ ...CMswapTVL, FixedExchangeRate: ((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2).toString() })
                        feeSelect === 500 && currPrice_500 !== Infinity && tvl_500 < 1e-9 && updateExchangeRateCMswapTVL(500, 0)
                        if(feeSelect === 500){
                            isReverted = token0_500.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                        }
                        updateCMswapTvlKey('tvl500', tvl_500,isReverted);
                        

                        if (feeSelect === 500 && tvl_500 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 500] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 500] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                feeSelect === 500 && updateExchangeRateCMswapTVL(500, Number((altPrice1 / altPrice0).toString()))
                            }
                        }

                        const token0_100 = poolState[12].result !== undefined ? poolState[12].result : "" as '0xstring'
                        const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                        const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                        const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                        const currPrice_100 = token0_100.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(sqrtPriceX96_100) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_100) / (2 ** 96)) ** 2))
                        const tvl_100 = currPrice_100 !== 0 && currPrice_100 !== Infinity ? (Number(formatEther(tokenAamount_100)) * (1 / currPrice_100)) + Number(formatEther(tokenBamount_100)) : 0
                        feeSelect === 100 && currPrice_100 !== Infinity && updateExchangeRateCMswapTVL(100, Number(currPrice_100.toString()))
                        feeSelect === 100 && currPrice_100 !== Infinity && setCMswapTVL({ ...CMswapTVL, FixedExchangeRate: ((Number(sqrtPriceX96_100) / (2 ** 96)) ** 2).toString() })
                        feeSelect === 100 && currPrice_100 !== Infinity && tvl_100 < 1e-9 && updateExchangeRateCMswapTVL(100, 0)
                        if(feeSelect === 100){
                            isReverted = token0_100.toUpperCase() === tokenBvalue.toUpperCase() ? false : true
                        }
                        updateCMswapTvlKey('tvl100', tvl_100,isReverted);

                        if (feeSelect === 100 && tvl_100 < 1e-9) {
                            const init: any = { contracts: [] }
                            for (let i = 0; i <= tokens.length - 1; i++) {
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenAvalue, tokens[i].value, 100] })
                                init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenBvalue, 100] })
                            }
                            const findAltRoute = await readContracts(config, init)
                            let altIntermediate
                            let altPair0
                            let altPair1
                            for (let i = 0; i <= findAltRoute.length - 1; i += 2) {
                                if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i + 1].result !== '0x0000000000000000000000000000000000000000') {
                                    altIntermediate = tokens[1]
                                    altPair0 = findAltRoute[i].result
                                    altPair1 = findAltRoute[i + 1].result
                                    break
                                }
                            }
                            if (altIntermediate !== undefined) {
                                setAltRoute({ a: tokenAvalue, b: altIntermediate.value, c: tokenBvalue })
                                const altPoolState = await readContracts(config, {
                                    contracts: [
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair0 as '0xstring', functionName: 'slot0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'token0' },
                                        { ...v3PoolABI, address: altPair1 as '0xstring', functionName: 'slot0' },
                                    ]
                                })
                                const altToken0 = altPoolState[0].result !== undefined ? altPoolState[0].result : "" as '0xstring'
                                const alt0sqrtPriceX96 = altPoolState[1].result !== undefined ? altPoolState[1].result[0] : BigInt(0)
                                const altPrice0 = altToken0.toUpperCase() === tokenAvalue.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                                const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                                const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                                const altPrice1 = altToken1.toUpperCase() === tokenBvalue.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                                feeSelect === 100 && updateExchangeRateCMswapTVL(100, Number((altPrice1 / altPrice0).toString()))
                            }
                        }
                    } catch {
                        updateExchangeRateCMswapTVL(feeSelect, 0)
                    }
                    //** DiamonFinance */

                    try {
                        setAltRoute(undefined)

                        const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(0), tokenAvalue, tokenBvalue], }] })
                        const DiamonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...UniswapPairv2PoolABI, address: DiamonPair, functionName: 'token0' }
                            ]
                        })

                        let tvlDM = 0;
                        let exchangeRateDM = 0;
                        if (DiamonPair !== "0x0000000000000000000000000000000000000000" as '0xstring') {
                            const tokenAamount = BigInt(getPoolState[0].result || 0);
                            const tokenBamount = BigInt(getPoolState[1].result || 0);
                            const currPriceDM = getPoolState[2].result !== undefined   ? Number(tokenAamount) / Number(tokenBamount) : 0

                            tvlDM = currPriceDM !== 0 && currPriceDM !== Infinity ? (Number(formatEther(tokenAamount)) * (1 / currPriceDM)) + Number(formatEther(tokenBamount)) : 0
                            exchangeRateDM = tvlDM < 1e-9 ? 0 : currPriceDM
                            currPriceDM !== Infinity && setDMswapTVL({ ...DMswapTVL, FixedExchangeRate: (exchangeRateDM).toString() })
                        }else{
                            tvlDM = 0
                            exchangeRateDM = 0
                            setDMswapTVL({ ...DMswapTVL, FixedExchangeRate: (0).toString() })
                        }

                        updateDMswapTvlKey(tvlDM,true)
                        updateExchangeRateDMswapTVL(exchangeRateDM)
                    } catch (error) {
                        updateExchangeRateDMswapTVL(0)
                    }

                    //** UdonSwap */
                    try {
                        setAltRoute(undefined)
                        const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(1), tokenAvalue, tokenBvalue], }] })
                        const UdonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [UdonPair] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [UdonPair] },
                                { ...UniswapPairv2PoolABI, address: UdonPair, functionName: 'token0' }
                            ]
                        })
                        let tvlUdon = 0;
                        let exchangeRateUdon = 0;
                        if (UdonPair !== "0x0000000000000000000000000000000000000000" as '0xstring') {
                            const tokenAamount = getPoolState[0].result !== undefined ? getPoolState[0].result : BigInt(0)
                            const tokenBamount = getPoolState[1].result !== undefined ? getPoolState[1].result : BigInt(0)
                            const currPriceUdon =  getPoolState[2].result !== undefined ? Number(tokenAamount) / Number(tokenBamount) : 0
                            setReserveUdonA(tokenAamount)
                            setReserveUdonB(tokenBamount)
                            tvlUdon = (Number(formatEther(tokenAamount)) * (1 / currPriceUdon)) + Number(formatEther(tokenBamount));
                            exchangeRateUdon = tvlUdon < 1e-9 ? 0 : currPriceUdon
                            currPriceUdon !== Infinity && setUdonTVL({ ...UdonTVL, FixedExchangeRate: Number(exchangeRateUdon).toString() })

                        }
                        updateUdonswapTvlKey(tvlUdon,true)
                        updateExchangeRateUdonswapTVL(exchangeRateUdon)
                    } catch (error) {
                        updateExchangeRateUdonswapTVL(0)
                    }

                     //** ponder.finance */
                        const updatePonderTvlKey = (value: number,isReverted: boolean) => { setPonderTVL(prevTvl => ({ ...prevTvl, tvl10000: value >= 1e-9 ? value.toString() : '0', isReverted })); };
                        const updateExchangeRatePonderTVL = (exchangeRate: number) => {setPonderTVL(prevTvl => ({ ...prevTvl, exchangeRate: exchangeRate.toString() }));};

                    try {
                        setAltRoute(undefined)

                        const getPairAddr = await readContracts(config, { contracts: [{ ...CMswapUniSmartRouteContractV2, functionName: 'getPairAddress', args: [BigInt(2), tokenAvalue, tokenBvalue], }] })
                        const DiamonPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result as '0xstring' : '' as '0xstring'
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                { ...erc20ABI, address: tokenAvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...erc20ABI, address: tokenBvalue, functionName: 'balanceOf', args: [DiamonPair] },
                                { ...UniswapPairv2PoolABI, address: DiamonPair, functionName: 'token0' }
                            ]
                        })

                        let tvlPD = 0;
                        let exchangeRatePD = 0;
                        if (DiamonPair !== "0x0000000000000000000000000000000000000000" as '0xstring') {
                            const tokenAamount = BigInt(getPoolState[0].result || 0);
                            const tokenBamount = BigInt(getPoolState[1].result || 0);
                            const currPriceDM = getPoolState[2].result !== undefined   ? Number(tokenAamount) / Number(tokenBamount) : 0

                            tvlPD = currPriceDM !== 0 && currPriceDM !== Infinity ? (Number(formatEther(tokenAamount)) * (1 / currPriceDM)) + Number(formatEther(tokenBamount)) : 0
                            exchangeRatePD = tvlPD < 1e-9 ? 0 : currPriceDM
                            currPriceDM !== Infinity && setPonderTVL({ ...ponderTVL, FixedExchangeRate: Number(exchangeRatePD).toString() })

                        }

                        updatePonderTvlKey(tvlPD,true)
                        updateExchangeRatePonderTVL(exchangeRatePD)
                    } catch (error) {
                        updateExchangeRatePonderTVL(0)
                    }

                    setExchangeRate("0")
                }
            }
        }

        setAmountA("")
        setAmountB("")
        if (hasInitializedFromParams) {
            checkBitkubEVMKycLevel().then(() => {
                fetch0()
            })
        }
    }, [config, address, tokenA, tokenB, feeSelect, txupdate, hasInitializedFromParams, poolSelect])

    console.log({udonOldPrice: fixedExchangeRate})
    console.log({udonNewPrice: newPrice})
    React.useEffect(() => {
        console.log("New price set:", newPrice);
    },[newPrice])

    React.useEffect(() => {
    const updateRate = async () => {
        setAltRoute(undefined);

        const poolMap = {
        CMswap: CMswapTVL,
        DiamonSwap: DMswapTVL,
        UdonSwap: UdonTVL,
        ponder: ponderTVL,
        } as const;

        type PoolKey = keyof typeof poolMap;

        if (poolSelect in poolMap) {
        const selectedPool = poolMap[poolSelect as PoolKey];

        if (amountA === "") {
            setExchangeRate(selectedPool.exchangeRate);
            console.log(`Quote Price ${poolSelect}`, selectedPool.exchangeRate);
        }

        setFixedExchangeRate(selectedPool.FixedExchangeRate);
        console.log(`Fix price set for ${poolSelect} :`, selectedPool.FixedExchangeRate);
        } else {
        setExchangeRate("0");
        console.log("No valid pool selected");
        }
    };

    if (!wrappedRoute) updateRate();
    }, [amountA, poolSelect, CMswapTVL, DMswapTVL, UdonTVL, ponderTVL, txupdate]);


    React.useEffect(() => {
        const fetchQuoteAndSetPool = async () => {
            if (CMswapTVL || DMswapTVL || UdonTVL) {
                try {
                    const quote = await getQoute(amountA);
                   /*  console.log("Fetched quote:", quote); */

                    const CMRate = Number(quote?.CMswapRate) > 0
                        ? Number(quote?.CMswapRate)
                        : Number(CMswapTVL?.exchangeRate || 0);

                    const DMRate = Number(quote?.DiamonSwapRate) > 0
                        ? Number(quote?.DiamonSwapRate)
                        : Number(DMswapTVL?.exchangeRate || 0);

                    const UdonRate = Number(quote?.UdonswapRate) > 0
                        ? Number(quote?.UdonswapRate)
                        : Number(UdonTVL?.exchangeRate || 0);

                    const PonderRate = Number(quote?.ponderRate) > 0
                        ? Number(quote?.ponderRate)
                        : Number(ponderTVL?.exchangeRate || 0);

                    const rates = {
                        CMswap: CMRate,
                        DiamonSwap: DMRate,
                        UdonSwap: UdonRate,
                        ponder: PonderRate,
                    };

                    console.log("Computed rates:", rates);

                    const validRates = Object.entries(rates).filter(([, rate]) => rate > 0);
                    if (validRates.length === 0) {
                        console.log("No valid rates available from any pool.");
                        return;
                    }

                    const sortedEntries = validRates.sort((a, b) => b[1] - a[1]);
                    const [bestPool, bestRate] = sortedEntries[0];

/*                     console.log("Best pool selected:", bestPool, "with rate:", bestRate); */
                    setBestPool(bestPool);

                    if (poolSelect === "") {
                        setPoolSelect(bestPool);
                        console.log("Pool selected automatically:", bestPool);
                    }

                } catch (error) {
                    console.error("Error fetching quote or processing rates:", error);
                }
            }
        };

        fetchQuoteAndSetPool();
    }, [CMswapTVL, DMswapTVL, UdonTVL, amountB, amountA]);

    React.useEffect(() => {
        setPoolSelect("")
        setFeeSelect(10000)
    }, [tokenA, tokenB])

    return (
        <div className='space-y-2'>
            <div className="rounded-lg bg-[#0a0b1e]/80 border border-[#00ff9d]/10 p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 font-mono text-sm">From</span>
                    <input
                        className="py-2 w-[340px] focus:outline-none text-gray-400 font-mono text-xs text-right"
                        value={tokenA.value}
                        onChange={e => {
                            if (e.target.value !== '0x') {
                                setTokenA({ name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico' })
                            } else {
                                setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico' })
                            }
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" autoFocus className="w-[140px] sm:w-[200px] bg-transparent border-none text-white font-mono text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountA} onChange={e => { setAmountA(e.target.value); getQoute(e.target.value); }} />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 font-mono flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center overflow-hidden'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenA.logo !== '../favicon.ico' ? <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
                                        </span>
                                    </div>
                                    <span className='truncate'>{tokenA.name}</span>
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
                                            <CommandItem
                                                key={token.name}
                                                value={token.name}
                                                onSelect={() => {
                                                    setTokenA(token)
                                                    setOpen(false)
                                                    updateURLWithTokens(token.value, tokenB?.value)
                                                }}
                                                className='cursor-pointer'
                                            >
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
                    <div>
                        <span className="text-gray-400 font-mono text-xs">{tokenA.name !== 'Choose Token' ? Number(tokenABalance).toFixed(4) + ' ' + tokenA.name : '0.0000'}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-[#00ff9d] font-mono text-xs px-2 cursor-pointer" onClick={() => { setAmountA(tokenABalance); getQoute(tokenABalance); }}>MAX</Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button variant="outline" size="icon" className="bg-[#0a0b1e] border border-[#00ff9d]/30 rounded-md h-10 w-10 shadow-md cursor-pointer" onClick={switchToken}>
                    <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
                </Button>
            </div>
            <div className="rounded-lg border border-[#00ff9d]/10 p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 font-mono text-sm">To</span>
                    <input
                        className="py-2 w-[340px] focus:outline-none text-gray-400 font-mono text-xs text-right"
                        value={tokenB.value}
                        onChange={e => {
                            if (e.target.value !== '0x') {
                                setTokenB({ name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico' })
                            } else {
                                setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico' })
                            }
                        }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" className="w-[140px] sm:w-[200px] bg-transparent border-none text-white font-mono text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountB} readOnly />
                    <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open2} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 font-mono flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center overflow-hidden'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenB.logo !== '../favicon.ico' ? <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
                                        </span>
                                    </div>
                                    <span className='truncate'>{tokenB.name}</span>
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
                                            <CommandItem
                                                key={token.name}
                                                value={token.name}
                                                onSelect={() => {
                                                    setTokenB(token)
                                                    setOpen2(false)
                                                    updateURLWithTokens(tokenA?.value, token.value)
                                                }}
                                                className='cursor-pointer'
                                            >
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
                    <span className="text-gray-400 font-mono text-xs">{tokenB.name !== 'Choose Token' ? Number(tokenBBalance).toFixed(4) + ' ' + tokenB.name : '0.0000'}</span>
                </div>
            </div>
            {!wrappedRoute &&
                <div className="mt-6">
                    {/** LIQUIDITY SELECTION  */}
                    <div className="flex justify-between items-center my-2">
                        <span className="text-gray-400 font-mono text-xs">Liquidity Available</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-auto">
                        {(() => {
                            const tvlKeys = ['tvl10000', 'tvl3000', 'tvl500', 'tvl100'] as const;
                            const shouldShowTVL = tvlKeys.some(key => Number(CMswapTVL[key]) > 0);
                            const tvlValue = Number(CMswapTVL[`tvl${feeSelect}` as keyof typeof CMswapTVL]);

                            if (!shouldShowTVL) {
                                return ""
                            }

                            return (
                                <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "CMswap" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => {setPoolSelect("CMswap"); getQoute(amountA);}}>
                                    <span className="flex items-center gap-1">
                                        CMswap {bestPool === "CMswap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                    </span>
                                    {tokenB.value !== "0x" as "0xstring" && shouldShowTVL && (<span className={"truncate" + (tvlValue > 0 ? " text-emerald-300" : "")}>TVL: {Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(tvlValue)} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? "$" : tokenB.name}</span>)}
                                </Button>
                            );
                        })()}
                        {Number(DMswapTVL['tvl10000']) > 0 && (
                            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "DiamonSwap" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => {setPoolSelect("DiamonSwap"); getQoute(amountA);}}>
                                <span className='flex items-center gap-1'>
                                    DiamonFinance {bestPool === "DiamonSwap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                </span>
                                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(DMswapTVL['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(DMswapTVL['tvl10000']))}  {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                            </Button>
                        )}
                        {Number(UdonTVL['tvl10000']) > 0 && (
                            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "UdonSwap" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => {setPoolSelect("UdonSwap");; getQoute(amountA);}}>
                                <span className='flex items-center gap-1'>
                                    UdonSwap {bestPool === "UdonSwap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                </span>
                                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(UdonTVL['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(UdonTVL['tvl10000']))}  {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                            </Button>
                        )}
                        {Number(ponderTVL['tvl10000']) > 0 && (
                            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "ponder" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => {setPoolSelect("ponder"); getQoute(amountA);}}>
                                <span className='flex items-center gap-1'>
                                    PonderFinance {bestPool === "ponder" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                </span>
                                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(ponderTVL['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(ponderTVL['tvl10000']))}  {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                            </Button>
                        )}
                    </div>

                    {/** CMswap FEE SELECTION  */}
                    {poolSelect === "CMswap" && (
                        <>
                            <div className="flex justify-between items-center my-2">
                                <span className="text-gray-400 font-mono text-xs">Swap fee tier</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 h-[70px]">
                                <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 100 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(100)}>
                                    <span>0.01%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl100']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl100']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 500 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(500)}>
                                    <span>0.05%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl500']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl500']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 3000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(3000)}>
                                    <span>0.3%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl3000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl3000']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 10000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(10000)}>
                                    <span>1%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL['tvl10000']))} {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            }
            {((tokenB.value === '0xnative' as '0xstring' && tokenA.value.toLowerCase() === '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5')) && !isAccountKYC ? (
                <div className="text-red-500 mt-4 text-sm font-mono">
                    <span>Please </span><a href="https://kkub-otp.bitkubchain.com/" target="_blank" className="underline text-blue-400">
                        KYC your address</a><span> before UNWRAP</span>
                </div>
            ) : (tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountB) !== 0 ? (
                <Button
                    className="w-full bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 font-mono mt-4 cursor-pointer"
                    onClick={handleSwap}
                >
                    Swap
                </Button>
            ) : (
                <Button
                    disabled
                    className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 font-mono mt-4"
                >
                    Swap
                </Button>
            ))}

            <div className="mt-4 border-t border-[#00ff9d]/10 pt-4">
                {altRoute !== undefined &&
                    <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                        <span className="mr-1">route</span>
                        <span className="text-white font-mono text-xs px-2 gap-1">{tokens.map(obj => obj.value).indexOf(altRoute.a) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.a)].name}  → {tokens.map(obj => obj.value).indexOf(altRoute.b) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.b)].name} → {tokens.map(obj => obj.value).indexOf(altRoute.c) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.c)].name}</span>
                    </div>
                }
                {tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token' && tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' &&
                    <>
                        <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                            <span className="mr-1">price qoute</span>
                            {exchangeRate !== '0' && !isNaN(Number(exchangeRate))
                                ? (<span
                                    className="text-[#00ff9d] font-mono text-xs px-2 gap-1 hover:cursor-pointer" onClick={() => setSwapDirection(!swapDirection)}>
                                    {swapDirection ? `1 ${tokenB.name} = ${Number(exchangeRate).toFixed(4)} ${tokenA.name}` : `1 ${tokenA.name} = ${isFinite(1 / Number(exchangeRate)) ? (1 / Number(exchangeRate)).toFixed(4) : (0).toFixed(4)} ${tokenB.name}`}
                                </span>
                                )
                                : <span className="text-red-500 px-2">insufficient liquidity</span>
                            }
                            {!wrappedRoute && Number(amountB) > 0 &&
                                <span>[PI: {
                                    poolSelect === 'CMswap' ?
                                        ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate))) - 100 <= 100 ?
                                            ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate))) - 100 > 0 ?
                                                ((100 - ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate)))) * -1).toFixed(4) :
                                                (100 - ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate)))).toFixed(4)
                                            :
                                            ">100"
                                        :
                                        ((Number(newPrice) * 100) / Number(fixedExchangeRate)) - 100 <= 100 ?
                                            ((Number(newPrice) * 100) / Number(fixedExchangeRate)) - 100 > 0 ?
                                                ((((Number(fixedExchangeRate) - Number(newPrice)) * 100) / Number(fixedExchangeRate)) * -1).toFixed(4) :
                                                (((Number(fixedExchangeRate) - Number(newPrice)) * 100) / Number(fixedExchangeRate)).toFixed(4)
                                            :
                                            ">100"
                                }%]</span>
                            }
                        </div>
                        {(tokenA.name === 'KUSDT' || tokenB.name === 'KUSDT') &&
                            <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                                <span className="mr-1">token price</span>
                                {exchangeRate !== '0' && exchangeRate !== '' && <span className="text-white font-mono text-xs px-2 gap-1">
                                    {tokenA.name === 'KUSDT' && <span>{Number(exchangeRate).toFixed(2)} </span>}
                                    {tokenB.name === 'KUSDT' && <span>{Number(1 / Number(exchangeRate)).toFixed(2)} </span>}
                                    $
                                </span>}
                            </div>
                        }
                    </>
                }
                <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                    <span className="mr-1">slippage tolerance</span>
                    <span className="font-mono text-xs px-2 flex items-center gap-1">5%</span>
                </div>
            </div>
        </div>
    )
}
