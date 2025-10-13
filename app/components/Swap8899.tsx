import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther } from 'viem'
import { ArrowDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from 'use-debounce'
import { tokens, ROUTER02, qouterV2Contract, router02Contract, erc20ABI, wrappedNative, CMswapPoolDualRouterContract, CMswapPoolDualRouter, CMswapUniSmartRoute, CMswapUniSmartRouteContract } from '@/app/lib/8899'
import { config } from '@/app/config'
import { useSwapTokenSelection } from '@/app/components/swap/useSwapTokenSelection'
import { useSwapQuote } from '@/app/components/swap/useSwapQuote'
import { encodePath } from '@/app/components/swap/path'
import { ensureTokenAllowance, executeRouterSwap, wrapNativeToken, unwrapWrappedToken } from '@/app/components/swap/swapActions'
import { useSwap8899PoolData } from '@/app/components/swap/hooks/useSwap8899PoolData'
import { SwapTokenPanel } from '@/app/components/swap/SwapTokenPanel'

export default function Swap8899({
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
    const [bestPathArray, setBestPathArray] = React.useState<string[] | null>(null);
    const [CMswapTVL, setCMswapTVL] = React.useState<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string; t0: string; }>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", t0: "" as '0xstring' });
    const [GameSwapTvl, setGameSwapTvl] = React.useState<{ tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string;  t0: string;}>({ tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: "", t0: "" as '0xstring'  });
    const [JibSwapTvl, setJibSwapTvl] = React.useState<{ tvl10000: string; exchangeRate: string; t0: string; }>({ tvl10000: "", exchangeRate: "",t0: "" as '0xstring'  });

    const [newPrice, setNewPrice] = React.useState("")
    const {
        tokenA,
        tokenB,
        setTokenA,
        setTokenB,
        hasInitializedFromParams,
        updateURLWithTokens,
        switchTokens,
    } = useSwapTokenSelection(tokens, {
        defaultTokenAIndex: 0,
        defaultTokenBIndex: 2,
        referralAddress: address,
    })
    const { resolveTokenAddress, quoteExactInputSingle, quoteExactInput } = useSwapQuote({
        config,
        contract: qouterV2Contract,
        tokens,
    })
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [poolSelect, setPoolSelect] = React.useState("")
    const [bestPool, setBestPool] = React.useState("")
    const [swapDirection, setSwapDirection] = React.useState(true) // false = A->B, true = B->A
    const [onLoading, setOnLoading] = React.useState(false)
    const [wrappedRoute, setWrappedRoute] = React.useState(false)

    useSwap8899PoolData({
        config,
        address,
        tokens,
        tokenA,
        tokenB,
        feeSelect,
        txupdate,
        hasInitializedFromParams,
        setTokenA,
        setTokenB,
        setTokenABalance,
        setTokenBBalance,
        setWrappedRoute,
        setExchangeRate,
        setAltRoute,
        setCMswapTVL,
        setGameSwapTvl,
        setJibSwapTvl,
        setBestPathArray,
        setFixedExchangeRate,
        setOnLoading,
        setAmountA,
        setAmountB,
    })

    React.useEffect(() => {
        console.log("hasInitializedFromParams : ", hasInitializedFromParams)
    }, [hasInitializedFromParams])

    const tokenABalanceLabel = tokenA.name !== 'Choose Token'
        ? `${Number(tokenABalance).toFixed(4)} ${tokenA.name}`
        : '0.0000'
    const tokenBBalanceLabel = tokenB.name !== 'Choose Token'
        ? `${Number(tokenBBalance).toFixed(4)} ${tokenB.name}`
        : '0.0000'

    const getQoute = useDebouncedCallback(async (_amount: string) => {
        let CMswapRate = undefined; let GameswapRate = undefined; let JibswapRate = undefined;
        const amountIn = Number(_amount)
        const tokenAvalue = resolveTokenAddress(tokenA)
        const tokenBvalue = resolveTokenAddress(tokenB)
        if (wrappedRoute) {
            setAmountB(amountIn.toString())
        } else {
            console.log("get Quote Price with CMswap")
            //**---------- CMswap */
            try {
                if (Number(_amount) !== 0) {
                    if (altRoute === undefined) {
                        const quoteOutput = await quoteExactInputSingle({
                            tokenIn: tokenA,
                            tokenOut: tokenB,
                            amount: _amount,
                            fee: feeSelect,
                            parseAmount: (value: string) => parseEther(value),
                            suppressErrors: true,
                        })
                        if (quoteOutput) {
                            if (poolSelect === "CMswap") {
                                setAmountB(formatEther(quoteOutput.amountOut))
                            }
                            CMswapRate = formatEther(quoteOutput.amountOut)
                            if (quoteOutput.sqrtPriceX96 !== undefined) {
                                const newPrice = 1 / ((Number(quoteOutput.sqrtPriceX96) / (2 ** 96)) ** 2)
                                setNewPrice(newPrice.toString())
                            }
                        }
                    } else {
                        const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                        const quoteOutput = await quoteExactInput({
                            path: route as `0x${string}`,
                            tokenIn: tokenA,
                            amount: _amount,
                            parseAmount: (value: string) => parseEther(value),
                            suppressErrors: true,
                        })
                        if (quoteOutput) {
                            setAmountB(formatEther(quoteOutput.amountOut))
                            if (poolSelect === "CMswap") {
                                setAmountB(formatEther(quoteOutput.amountOut))
                            }
                            CMswapRate = formatEther(quoteOutput.amountOut)
                            if (quoteOutput.sqrtPriceX96 !== undefined) {
                                const newPrice = 1 / ((Number(quoteOutput.sqrtPriceX96) / (2 ** 96)) ** 2)
                                setNewPrice(newPrice.toString())
                            }
                        }
                    }
                } else {
                    setAmountB("")
                }
            } catch { }
            //**---------- Gameswap */
            try {
                if (Number(_amount) !== 0) {
                    if (tokenAvalue.toUpperCase() === tokens[1].value.toUpperCase() && tokenBvalue.toUpperCase() === tokens[3].value.toUpperCase() || tokenBvalue.toUpperCase() === tokens[1].value.toUpperCase() && tokenAvalue.toUpperCase() === tokens[3].value.toUpperCase()) {
                        console.log("get Quote Price with Gameswap")
                        let useFunction: "getExpectedJBCFromToken" | "getExpectedTokenFromJBC" | undefined;
                        let poolAddr = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring';

                        if (tokenAvalue.toUpperCase() === tokens[1].value.toUpperCase()) {
                            useFunction = 'getExpectedTokenFromJBC'; // token A is JBC
                        } else if (tokenAvalue.toUpperCase() === tokens[3].value.toUpperCase()) {
                            useFunction = 'getExpectedJBCFromToken'; // token A is CMJ
                        }

                        // Check that useFunction is assigned a valid function name
                        if (useFunction) {
                            const quoteOutput = await readContracts(config, {
                                contracts: [
                                    {
                                        ...CMswapPoolDualRouterContract,
                                        functionName: useFunction,
                                        args: [poolAddr, parseEther(_amount)],
                                    },
                                ]
                            });

                            const result = quoteOutput[0].result !== undefined ? quoteOutput[0].result : BigInt(0)
                            GameswapRate = formatEther(result)

                            if (poolSelect === "GameSwap") {
                                setAmountB(formatEther(result));
                                const amountA = parseFloat(_amount);
                                const amountB = parseFloat(formatEther(result));
                                if (amountA > 0 && amountB > 0) {
                                    const price = tokenAvalue.toUpperCase() === tokens[1].value.toUpperCase()
                                        ? amountB / amountA // JBC → CMJ
                                        : amountA / amountB; // CMJ → JBC

                                    setNewPrice(price.toFixed(6)); // หรือใช้ Decimal Places ตามที่ต้องการ
                                }
                            }
                        }
                    }
                    if ((tokenAvalue.toUpperCase() === tokens[1].value.toUpperCase() && tokenBvalue.toUpperCase() === tokens[2].value.toUpperCase()) || (tokenAvalue.toUpperCase() === tokens[2].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[1].value.toUpperCase())) {
                        console.log("get Quote Price with Gameswap")
                        let useFunction: "getExpectedJBCFromToken" | "getExpectedTokenFromJBC" | undefined;
                        let poolAddr = '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring';

                        if (tokenAvalue.toUpperCase() === tokens[1].value.toUpperCase()) {
                            useFunction = 'getExpectedTokenFromJBC'; // token A is JBC
                        } else if (tokenAvalue.toUpperCase() === tokens[2].value.toUpperCase()) {
                            useFunction = 'getExpectedJBCFromToken'; // token A is JUSDT
                        }

                        if (useFunction) {
                            const quoteOutput = await readContracts(config, {
                                contracts: [
                                    {
                                        ...CMswapPoolDualRouterContract,
                                        functionName: useFunction,
                                        args: [poolAddr, parseEther(_amount)],
                                    },
                                ]
                            });

                            const result = quoteOutput[0].result !== undefined ? quoteOutput[0].result : BigInt(0)
                            const amountA = parseFloat(_amount);
                            const amountB = parseFloat(formatEther(result));

                            GameswapRate = (formatEther(result))
                            if (poolSelect === "GameSwap" && amountA > 0 && amountB > 0) {
                                setAmountB(formatEther(result));

                                const price = tokenAvalue.toUpperCase() === tokens[1].value.toUpperCase()
                                    ? amountB / amountA // JBC → JUSDT
                                    : amountA / amountB; // JUSDT → JBC
                                setNewPrice(price.toFixed(6)); // หรือใช้ Decimal Places ตามที่ต้องการ
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error in getting GameSwap quote:", error);
            }
            //**---------- Jibswap */
            try {
                if (Number(_amount) !== 0) {
                    let TokenA = tokenAvalue === "0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring' ? "0x99999999990FC47611b74827486218f3398A4abD" as '0xstring' : tokenAvalue; // convert WJBC Meow to WJBC Jib
                    let TokenB = tokenBvalue === "0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring' ? "0x99999999990FC47611b74827486218f3398A4abD" as '0xstring' : tokenBvalue; // convert WJBC Meow to WJBC Jib

                    // Handle WJBC contract
                    const getBestPrice = await readContracts(config, {
                        contracts: [
                            {
                                ...CMswapUniSmartRouteContract,
                                functionName: 'findBestPathAndAmountOut',
                                args: [TokenA, TokenB, parseEther(_amount)]
                            },
                        ]
                    });

                    const result = getBestPrice[0].result;
                    const bestAmountOut = result !== undefined ? result[0] as bigint : BigInt(0);
                    const bestPath = result !== undefined ? result[1] : [];
                    const bestPathArray: string[] = bestPath.map((addr: `0x${string}`) => addr); // แปลง readonly `0x${string}`[] เป็น string[]

                    if (bestPathArray.length > 2) {
                        setAltRoute({ a: bestPathArray[0] as '0xstring', b: bestPathArray[1] as '0xstring', c: bestPathArray[2] as '0xstring' })
                    } else {
                        setAltRoute(undefined)
                    }
                    setBestPathArray(bestPathArray)
                    if (poolSelect === "JibSwap" && Number(_amount) > 0 && bestAmountOut > 0) {
                        const price = tokenAvalue.toUpperCase() === tokens[0].value.toUpperCase()
                            ? Number(_amount) / Number(formatEther(bestAmountOut))
                            : Number(formatEther(bestAmountOut)) / Number(_amount);

                        setNewPrice((1 / price).toFixed(6));
                        setAmountB(formatEther(bestAmountOut))
                    }
                    JibswapRate = formatEther(bestAmountOut)
                }
            } catch (error) {
                console.error("Error in getting JibSwap quote:", error);
            }
        }

        console.log(`New RATE UPDATED\nCMswap : ${CMswapRate}\nGameswap : ${GameswapRate}\nJibSwap  :${JibswapRate} `);
        return { CMswapRate, GameswapRate, JibswapRate }
    }, 700)

    const switchToken = () => {
        setExchangeRate("")
        switchTokens()
    }

    const handleSwap = async () => {
        if (wrappedRoute) {
            wrap()
        } else if (poolSelect === "CMswap") {
            console.log("Swap with CMswap")
            cmsswap();
        } else if (poolSelect === "GameSwap") {
            console.log("Swap with GameSwap")
            gameswap();
        } else if (poolSelect === "JibSwap") {
            console.log("Swap with JibSwap")
            jibswap();
        }
    }

    const wrap = async () => {
        setIsLoading(true)
        try {
            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const hash = await wrapNativeToken({
                    config,
                    wrappedTokenAddress: tokens[1].value,
                    amount: parseEther(amountA),
                })
                setTxupdate(hash)
            } else if (tokenB.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const hash = await unwrapWrappedToken({
                    config,
                    contract: wrappedNative,
                    amount: parseEther(amountA),
                })
                setTxupdate(hash)
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType)
        }
        setIsLoading(false)
    }

    const cmsswap = async () => {
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
                await ensureTokenAllowance({
                    config,
                    token: { ...erc20ABI, address: tokenA.value },
                    owner: address as `0x${string}`,
                    spender: ROUTER02,
                    requiredAmount: parseEther(amountA),
                })
            }
            const parsedAmountIn = parseEther(amountA)
            const amountOutMinimum = parseEther(amountB) * BigInt(95) / BigInt(100)
            const path = altRoute ? encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect]) : undefined

            const { hash: h, amountOut: r } = await executeRouterSwap({
                config,
                router: router02Contract,
                tokenIn: tokenAvalue as `0x${string}`,
                tokenOut: tokenBvalue as `0x${string}`,
                recipient: address as `0x${string}`,
                amountIn: parsedAmountIn,
                amountOutMinimum,
                fee: feeSelect,
                path,
                value: tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() ? parsedAmountIn : BigInt(0),
            })

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

    const gameswap = async () => {
        setIsLoading(true);
        try {
            const tokenAAddr = tokenA.value.toUpperCase();
            const tokenBAddr = tokenB.value.toUpperCase();
            const parsedAmountA = parseEther(amountA);
            const slippagePercent = 5;

            // Approve if tokenA is not JBC
            if (tokenAAddr !== tokens[1].value.toUpperCase()) {
                const allowanceA = await readContract(config, {
                    ...erc20ABI,
                    address: tokenA.value as '0xstring',
                    functionName: 'allowance',
                    args: [address as '0xstring', CMswapPoolDualRouter]
                });

                if (allowanceA < parsedAmountA) {
                    const { request } = await simulateContract(config, {
                        ...erc20ABI,
                        address: tokenA.value as '0xstring',
                        functionName: 'approve',
                        args: [CMswapPoolDualRouter, parsedAmountA]
                    });
                    const tx = await writeContract(config, request);
                    await waitForTransactionReceipt(config, { hash: tx });
                }
            }

            // Determine pool address
            let poolAddr: '0xstring' | undefined;
            if (
                (tokenAAddr === tokens[1].value.toUpperCase() && tokenBAddr === tokens[3].value.toUpperCase()) ||
                (tokenBAddr === tokens[1].value.toUpperCase() && tokenAAddr === tokens[3].value.toUpperCase())
            ) {
                poolAddr = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring';
            } else if (
                (tokenAAddr === tokens[1].value.toUpperCase() && tokenBAddr === tokens[2].value.toUpperCase()) ||
                (tokenBAddr === tokens[1].value.toUpperCase() && tokenAAddr === tokens[2].value.toUpperCase())
            ) {
                poolAddr = '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring';
            }

            // Determine swap function name
            let useFunction:
                | 'swapJC'
                | 'swapJU'
                | 'swapCMJtoJBC'
                | 'swapJUSDTtoJBC'
                | undefined;

            if (poolAddr === '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring') {
                if (tokenAAddr === tokens[1].value.toUpperCase()) useFunction = 'swapJC';
                else if (tokenAAddr === tokens[3].value.toUpperCase()) useFunction = 'swapCMJtoJBC';
            } else if (poolAddr === '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring') {
                if (tokenAAddr === tokens[1].value.toUpperCase()) useFunction = 'swapJU';
                else if (tokenAAddr === tokens[2].value.toUpperCase()) useFunction = 'swapJUSDTtoJBC';
            }

            if (!useFunction || !poolAddr) throw new Error('Unsupported token combination');

            // Estimate expected output
            let expectedOut: bigint;

            if (useFunction === 'swapCMJtoJBC' || useFunction === 'swapJUSDTtoJBC') {
                expectedOut = await readContract(config, {
                    ...CMswapPoolDualRouterContract,
                    functionName: 'getExpectedJBCFromToken',
                    args: [poolAddr, parsedAmountA]
                });
            } else if (useFunction === 'swapJC' || useFunction === 'swapJU') {
                expectedOut = await readContract(config, {
                    ...CMswapPoolDualRouterContract,
                    functionName: 'getExpectedTokenFromJBC',
                    args: [poolAddr, parsedAmountA]
                });
            } else {
                throw new Error('No matching estimation function');
            }

            // Calculate minimum output based on slippage
            const minOut = expectedOut * BigInt(100 - slippagePercent) / BigInt(100);

            // Simulate and write tx (payable vs non-payable)
            if (useFunction === 'swapJC' || useFunction === 'swapJU') {
                const { request } = await simulateContract(config, {
                    ...CMswapPoolDualRouterContract,
                    functionName: useFunction,
                    args: [minOut],
                    value: parsedAmountA
                })
                const tx = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: tx });
                setTxupdate(tx)
            } else {
                const { request } = await simulateContract(config, {
                    ...CMswapPoolDualRouterContract,
                    functionName: useFunction,
                    args: [parsedAmountA, minOut]
                })
                const tx = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: tx });
                setTxupdate(tx)
            }
        } catch (e) {
            setErrMsg(e as WriteContractErrorType);
        }
        setIsLoading(false);
    };

    const jibswap = async () => {
        setIsLoading(true)
        try {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10

            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                // token a 
                let h, r

                if (tokenA.value.toUpperCase() === tokens[1].value.toLocaleUpperCase()) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContract,
                        functionName: 'swapExactETHForTokensWithFee',
                        value: parseEther(amountA),
                        args: [parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)

                } else {
                    const route = bestPathArray as readonly `0x${string}`[];
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContract,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [
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
            } else if (tokenA.value.toUpperCase() !== tokens[1].value.toLocaleUpperCase()) {
                // token A = Normal ERC20
                const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapUniSmartRoute] })
                if (allowanceA < parseEther(amountA)) {
                    const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [CMswapUniSmartRoute, parseEther(amountA)] })
                    const h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10

                let h, r

                if (altRoute === undefined && bestPathArray !== undefined) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContract,
                        functionName: 'swapExactTokensForTokensWithFee',
                        args: [parseEther(amountA), parseEther(amountB) * BigInt(95) / BigInt(100), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
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


    // Pool data loading handled by useSwap8899PoolData hook

    React.useEffect(() => {
        const updateRate = async () => {
            const quote = await getQoute(amountA);  
            if (poolSelect === "CMswap") {
                setExchangeRate(CMswapTVL.exchangeRate);
                setAmountB(quote?.CMswapRate || "0")
                console.log('Fallback Quote Price CMswap', CMswapTVL.exchangeRate);
            } else if (poolSelect === "GameSwap") {
                setExchangeRate(GameSwapTvl.exchangeRate);
                setAmountB(quote?.GameswapRate || "0")
                console.log('Fallback Quote Price GameSwap', GameSwapTvl.exchangeRate);
            } else if (poolSelect === "JibSwap") {
                setExchangeRate(JibSwapTvl.exchangeRate);
                setAmountB(quote?.JibswapRate || "0")
                console.log('Fallback Quote Price JibSwap', JibSwapTvl.exchangeRate);
            }
        };

        !wrappedRoute && updateRate();
    }, [amountA, poolSelect, CMswapTVL, GameSwapTvl, JibSwapTvl]);


    React.useEffect(() => {
        const fetchQuoteAndSetPool = async () => {
            if (!onLoading && CMswapTVL && GameSwapTvl && JibSwapTvl) {
                const quote = await getQoute(amountA);  
                console.log("quote Result",quote)

                const rates = {
                    CMswap: Number(quote?.CMswapRate || CMswapTVL.exchangeRate || 0),
                    GameSwap: Number(quote?.GameswapRate || GameSwapTvl.exchangeRate || 0),
                    JibSwap: Number(quote?.JibswapRate || JibSwapTvl.exchangeRate || 0),
                };
                

                const sortedEntries = Object.entries(rates).sort((a, b) => b[1] - a[1]);
                const [bestPool] = sortedEntries[0];
                setBestPool(bestPool);
            }
        };

        fetchQuoteAndSetPool();
    }, [onLoading, CMswapTVL, GameSwapTvl, JibSwapTvl, amountA ]);

    React.useEffect(() => {
        if (poolSelect === "" && bestPool) setPoolSelect(bestPool);
    }, [bestPool]);

    return (
        <div className='space-y-2'>
            <SwapTokenPanel
                label="From"
                tokenAddress={tokenA.value}
                onTokenAddressChange={value => {
                    if (value !== '0x') {
                        setTokenA({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico' })
                    } else {
                        setTokenA({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico' })
                    }
                }}
                amount={amountA}
                onAmountChange={value => {
                    setAmountA(value)
                    getQoute(value)
                }}
                amountAutoFocus
                selectedToken={tokenA}
                tokens={tokens}
                onSelectToken={token => {
                    setTokenA(token)
                    updateURLWithTokens(token.value, tokenB?.value, address)
                }}
                popoverOpen={open}
                onPopoverOpenChange={setOpen}
                balanceLabel={tokenABalanceLabel}
                footerContent={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[#00ff9d] text-xs px-2 cursor-pointer"
                        onClick={() => {
                            setAmountA(tokenABalance)
                            getQoute(tokenABalance)
                        }}
                    >
                        MAX
                    </Button>
                }
            />
            <div className="flex justify-center">
                <Button variant="outline" size="icon" className="bg-[#0a0b1e] border border-[#00ff9d]/30 rounded-md h-10 w-10 shadow-md cursor-pointer" onClick={switchToken}>
                    <ArrowDown className="h-4 w-4 text-[#00ff9d]" />
                </Button>
            </div>
            <SwapTokenPanel
                label="To"
                tokenAddress={tokenB.value}
                onTokenAddressChange={value => {
                    if (value !== '0x') {
                        setTokenB({ name: 'Choose Token', value: value as '0xstring', logo: '../favicon.ico' })
                    } else {
                        setTokenB({ name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico' })
                    }
                }}
                amount={amountB}
                amountReadOnly
                selectedToken={tokenB}
                tokens={tokens}
                onSelectToken={token => {
                    setTokenB(token)
                    updateURLWithTokens(tokenA?.value, token.value, address)
                }}
                popoverOpen={open2}
                onPopoverOpenChange={setOpen2}
                balanceLabel={tokenBBalanceLabel}
            />
            {!wrappedRoute &&
                <div className="mt-6">
                    {/** LIQUIDITY SELECTION  */}
                    <div className="flex justify-between items-center my-2">
                        <span className="text-gray-400 text-xs">Liquidity Available</span>
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
                                <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (poolSelect === "CMswap" ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setPoolSelect("CMswap")}>
                                    <span className="flex items-center gap-1">
                                        CMswap {bestPool === "CMswap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                    </span>
                                    {tokenB.value !== "0x" as "0xstring" && shouldShowTVL && (<span className={"truncate" + (tvlValue > 0 ? " text-emerald-300" : "")}>TVL: {Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(tvlValue)} {tokenB.name === "JUSDT" ? "$" : tokenB.name}</span>)}
                                </Button>
                            );
                        })()}

                        {Number(GameSwapTvl['tvl10000']) > 0 && (
                            <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (poolSelect === "GameSwap" ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setPoolSelect("GameSwap")}>
                                <span className='flex items-center gap-1'>
                                    GameSwap {bestPool === "GameSwap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                </span>
                                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(GameSwapTvl['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(GameSwapTvl['tvl10000']))}  {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                            </Button>
                        )}
                        {Number(JibSwapTvl['tvl10000']) > 0 && (
                            <Button variant="outline" className={"h-full p-4 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700/50 " + (poolSelect === "JibSwap" ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setPoolSelect("JibSwap")}>
                                <span className='flex items-center gap-1'>
                                    JibSwap {bestPool === "JibSwap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
                                </span>
                                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(JibSwapTvl['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(JibSwapTvl['tvl10000']))}  {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                            </Button>
                        )}
                    </div>

                    {/** FEE SELECTION  */}
                    {poolSelect === "CMswap" && (
                        <><div className="flex justify-between items-center my-2">
                            <span className="text-gray-400 text-xs">Swap fee tier</span>
                        </div>
                            <div className="grid grid-cols-4 gap-2 h-[70px]">
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 100 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(100)}>
                                    <span>0.01%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl100"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL["tvl100"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 500 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(500)}>
                                    <span>0.05%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl500"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL["tvl500"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 3000 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(3000)}>
                                    <span>0.3%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl3000"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL["tvl3000"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                                <Button variant="outline" className={"h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 10000 ? "bg-emerald-700/50 text-[#00ff9d]" : "text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(10000)}>
                                    <span>1%</span>
                                    {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl10000"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(Number(CMswapTVL["tvl10000"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            }
            {tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountA) <= Number(tokenABalance) && Number(amountB) !== 0 ?
                <Button 
                    className="w-full py-6 px-8 mt-4 font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300
                    bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800
                    hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect
                    shadow-lg shadow-emerald-500/40
                    active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" 
                    onClick={handleSwap}
                >
                    Swap
                </Button> :
                <Button disabled className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 mt-4">Swap</Button>
            }
            <div className="mt-4 border-t border-[#00ff9d]/10 pt-4">
                {altRoute !== undefined &&
                    <div className="flex items-center text-gray-500 text-xs my-2">
                        <span className="mr-1">route</span>
                        <span className="text-white text-xs px-2 gap-1">{tokens.map(obj => obj.value).indexOf(altRoute.a) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.a)].name}  → {tokens.map(obj => obj.value).indexOf(altRoute.b) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.b)].name} → {tokens.map(obj => obj.value).indexOf(altRoute.c) !== -1 && tokens[tokens.map(obj => obj.value).indexOf(altRoute.c)].name}</span>
                    </div>
                }
                {tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token' && tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' &&
                    <>
                        <div className="flex items-center text-gray-500 text-xs my-2">
                            <span className="mr-1">price quote</span>
                            {exchangeRate !== '0' && !isNaN(Number(exchangeRate))
                                ? (<span
                                    className="text-[#00ff9d] text-xs px-2 gap-1 hover:cursor-pointer" onClick={() => setSwapDirection(!swapDirection)}>
                                    {swapDirection ? `1 ${tokenB.name} = ${Number(exchangeRate).toFixed(4)} ${tokenA.name}` : `1 ${tokenA.name} = ${isFinite(1 / Number(exchangeRate)) ? (1 / Number(exchangeRate)).toFixed(4) : (0).toFixed(4)} ${tokenB.name}`}
                                </span>
                                )
                                : <span className="text-red-500 px-2">insufficient liquidity</span>
                            }
                            {!wrappedRoute && Number(amountB) > 0 &&
                                <span>[PI: {
                                    ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate))) - 100 <= 100 ?
                                        ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate))) - 100 > 0 ?
                                            ((100 - ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate)))) * -1).toFixed(4) :
                                            (100 - ((Number(newPrice) * 100) / Number(1 / Number(fixedExchangeRate)))).toFixed(4)
                                        :
                                        ">100"
                                }%]</span>
                            }
                        </div>
                        {(tokenA.name === 'JUSDT' || tokenB.name === 'JUSDT') &&
                            <div className="flex items-center text-gray-500 text-xs my-2">
                                <span className="mr-1">token price</span>
                                {exchangeRate !== '0' && exchangeRate !== '' && <span className="text-white text-xs px-2 gap-1">
                                    {tokenA.name === 'JUSDT' && <span>{Number(exchangeRate).toFixed(4)} </span>}
                                    {tokenB.name === 'JUSDT' && <span>{Number(1 / Number(exchangeRate)).toFixed(4)} </span>}
                                    $
                                </span>}
                            </div>
                        }
                    </>
                }
                <div className="flex items-center text-gray-500 text-xs my-2">
                    <span className="mr-1">slippage tolerance</span>
                    <span className="text-xs px-2 flex items-center gap-1">5%</span>
                </div>
            </div>
        </div>
    )
}
