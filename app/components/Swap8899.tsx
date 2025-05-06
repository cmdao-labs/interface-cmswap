import React from 'react'
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { formatEther, parseEther, parseGwei } from 'viem'
import { ArrowDown, ChevronDown } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebouncedCallback } from 'use-debounce'
import { tokens, ROUTER02, v3FactoryContract, qouterV2Contract, router02Contract, erc20ABI, v3PoolABI, wrappedNative,CMswapPoolDualRouterContract,CMswapPoolDualRouter,CMswapUniSmartRoute,CMswapUniSmartRouteContract } from '@/app/lib/8899'
import { config } from '@/app/config'

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
    const [altRoute, setAltRoute] = React.useState<{a: '0xstring', b: '0xstring', c: '0xstring'}>()
    const [bestPathArray, setBestPathArray] = React.useState<string[] | null>(null);
    const [CMswapTVL, setCMswapTVL] = React.useState<{tvl10000: string; tvl3000: string; tvl500: string; tvl100: string; exchangeRate: string;}>({tvl10000: "", tvl3000: "", tvl500: "", tvl100: "",exchangeRate: ""});
    const [GameSwapTvl, setGameSwapTvl] = React.useState<{tvl10000: string; tvl3000: string; tvl500: string; tvl100: string;exchangeRate: string;}>({tvl10000: "", tvl3000: "", tvl500: "", tvl100: "", exchangeRate: ""});
    const [JibSwapTvl, setJibSwapTvl] = React.useState<{tvl10000: string; exchangeRate: string;}>({tvl10000: "", exchangeRate: ""});

    const [newPrice, setNewPrice] = React.useState("")
    const [tokenA, setTokenA] = React.useState<{name: string, value: '0xstring', logo: string}>(tokens[0])
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{name: string, value: '0xstring', logo: string}>(tokens[1])
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [poolSelect, setPoolSelect] = React.useState("")
    const [bestPool, setBestPool] = React.useState("")
    const [swapDirection, setSwapDirection] = React.useState(true) // false = A->B, true = B->A
    const [onLoading,setOnLoading] = React.useState(false)


    function encodePath(tokens: string[], fees: number[]): string {
        let path = "0x"
        for (let i = 0; i < fees.length; i++) {
            path += tokens[i].slice(2)
            path += fees[i].toString(16).padStart(6, "0")
        }
        path += tokens[tokens.length - 1].slice(2)
        return path
    }
    function encodeJibPath(tokens: string[]): string {
        let path = "0x"
        path += tokens[tokens.length - 1].slice(2)
        return path
    }

    const getQoute = useDebouncedCallback(async (_amount: string) => {
        if(poolSelect === "CMswap") {
            console.log("get Quote Price with CMswap")
            try {
                if (Number(_amount) !== 0) {
                    if (altRoute === undefined) {
                        const qouteOutput = await simulateContract(config, {
                            ...qouterV2Contract,
                            functionName: 'quoteExactInputSingle',
                            args: [{
                                tokenIn: tokenA.value as '0xstring',
                                tokenOut: tokenB.value as '0xstring',
                                amountIn: parseEther(_amount),
                                fee: feeSelect,
                                sqrtPriceLimitX96: BigInt(0),
                            }]
                        })
                        setAmountB(formatEther(qouteOutput.result[0]))
                        let newPrice = 1 / ((Number(qouteOutput.result[1]) / (2 ** 96)) ** 2)
                        setNewPrice(newPrice.toString())
                    } else {
                        const route = encodePath([altRoute.a, altRoute.b, altRoute.c], [feeSelect, feeSelect])
                        const qouteOutput = await simulateContract(config, {
                            ...qouterV2Contract,
                            functionName: 'quoteExactInput',
                            args: [route as '0xstring', parseEther(_amount)]
                        })
                        setAmountB(formatEther(qouteOutput.result[0]))
                        let newPrice = 1 / ((Number(qouteOutput.result[1]) / (2 ** 96)) ** 2)
                        setNewPrice(newPrice.toString())
                    }
                } else {
                    setAmountB("")
                }
            } catch {}
        }
        if(poolSelect === "GameSwap" ) {
            try {
                if (Number(_amount) !== 0) {
                    if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[2].value.toUpperCase() || tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()) {   
                        console.log("get Quote Price with Gameswap")
                        let useFunction: "getExpectedJBCFromToken" | "getExpectedTokenFromJBC" | undefined;
                        let poolAddr = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring';
                        
                        if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                            useFunction = 'getExpectedTokenFromJBC'; // token A is JBC
                        } else if (tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()) {
                            useFunction = 'getExpectedJBCFromToken'; // token A is CMJ
                        }
            
                        // Check that useFunction is assigned a valid function name
                        if (useFunction) {
                            const quoteOutput = await readContracts(config, {
                                contracts: [
                                    {
                                        ...CMswapPoolDualRouterContract,
                                        functionName: useFunction,
                                        args: [poolAddr , parseEther(_amount)], 
                                    },
                                ]
                            });

                            const result = quoteOutput[0].result !== undefined ? quoteOutput[0].result : BigInt(0)
                            setAmountB(formatEther(result));
                            const amountA = parseFloat(_amount);
                            const amountB = parseFloat(formatEther(result));

                            if (amountA > 0 && amountB > 0) {
                                const price = tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()
                                    ? amountB / amountA // JBC → CMJ
                                    : amountA / amountB; // CMJ → JBC

                                setNewPrice(price.toFixed(6)); // หรือใช้ Decimal Places ตามที่ต้องการ
                            }
            
         
                        }}
                    if ((tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[1].value.toUpperCase()) ||(tokenA.value.toUpperCase() === tokens[1].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[0].value.toUpperCase())) {
                        console.log("get Quote Price with Gameswap")
                        let useFunction: "getExpectedJBCFromToken" | "getExpectedTokenFromJBC" | undefined;
                                    let poolAddr = '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring';
                                    
                                    if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                                        useFunction = 'getExpectedTokenFromJBC'; // token A is JBC
                                    } else if (tokenA.value.toUpperCase() === tokens[1].value.toUpperCase()) {
                                        useFunction = 'getExpectedJBCFromToken'; // token A is JUSDT
                                    }
                                    
                        
                                    if (useFunction) {
                                        const quoteOutput = await readContracts(config, {
                                            contracts: [
                                                {
                                                    ...CMswapPoolDualRouterContract,
                                                    functionName: useFunction,
                                                    args: [poolAddr , parseEther(_amount)], 
                                                },
                                            ]
                                        });
            
                                        const result = quoteOutput[0].result !== undefined ? quoteOutput[0].result : BigInt(0)
                                        setAmountB(formatEther(result));
                                        const amountA = parseFloat(_amount);
                                        const amountB = parseFloat(formatEther(result));
            
                                        if (amountA > 0 && amountB > 0) {
                                            const price = tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()
                                                ? amountB / amountA // JBC → JUSDT
                                                : amountA / amountB; // JUSDT → JBC
            
                                        setNewPrice(price.toFixed(6)); // หรือใช้ Decimal Places ตามที่ต้องการ
                                        }
            
                        }}
                }
            } catch (error) {
                console.error("Error in getting GameSwap quote:", error);
            }
            
        }
        if(poolSelect === "JibSwap"){
            try {
                if (Number(_amount) !== 0) {
                    let TokenA = tokenA.value === "0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring' ? "0x99999999990FC47611b74827486218f3398A4abD" as '0xstring' : tokenA.value; // convert WJBC Meow to WJBC Jib
                    let TokenB = tokenB.value === "0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring' ? "0x99999999990FC47611b74827486218f3398A4abD" as '0xstring' : tokenB.value; // convert WJBC Meow to WJBC Jib
                    
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
                 
                    if(bestPathArray.length > 2){
                        setAltRoute({a: bestPathArray[0] as '0xstring', b:bestPathArray[1]  as '0xstring' , c:bestPathArray[2]  as '0xstring'})
                    }else{
                        setAltRoute(undefined)
                    }
                    setBestPathArray(bestPathArray)

                    if (Number(_amount) > 0 && bestAmountOut > 0) {
                        const price = tokenA.value.toUpperCase() !== tokens[0].value.toUpperCase()
                            ? Number(_amount) / Number(formatEther(bestAmountOut))  
                            : Number(formatEther(bestAmountOut)) / Number(_amount);
                
                        setNewPrice(price.toFixed(6)); // ปรับแต่ง Decimal Places ตามที่ต้องการ
                        setAmountB(formatEther(bestAmountOut))
                }
            
                }
            } catch (error) {
                console.error("Error in getting JibSwap quote:", error);
            }
            
        }

    }, 700)

    const switchToken = () => {
        setExchangeRate("")
        const _tokenA = tokenB
        const _tokenB = tokenA
        setTokenA(_tokenA)
        setTokenB(_tokenB)
    }

    const handleSwap = async () => {
        if(poolSelect === "CMswap") {
            console.log("Swap with CMswap")
            cmsswap();
        }else if(poolSelect === "GameSwap") {
            console.log("Swap with GameSwap")
            gameswap();
        }else if(poolSelect === "JibSwap"){
            console.log("Swap with JibSwap")
            jibswap();
        }
    }

    const cmsswap = async () => {
        setIsLoading(true)
        try {
            if (tokenA.value.toUpperCase() === tokens[0].value.toUpperCase()) {
                const h = await sendTransaction(config, {to: tokens[0].value, value: parseEther(amountA)})
                await waitForTransactionReceipt(config, { hash: h })
            }
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'allowance', args: [address as '0xstring', ROUTER02] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value as '0xstring', functionName: 'approve', args: [ROUTER02, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let h
            let r
            if (altRoute === undefined) {
                const { result, request } = await simulateContract(config, {
                    ...router02Contract,
                    functionName: 'exactInputSingle',
                    args: [{
                        tokenIn: tokenA.value as '0xstring',
                        tokenOut: tokenB.value as '0xstring',
                        fee: feeSelect,
                        recipient: address as '0xstring',
                        amountIn: parseEther(amountA),
                        amountOutMinimum: parseEther(String(Number(amountB) * 0.95)),
                        sqrtPriceLimitX96: BigInt(0)
                    }]
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
                        amountOutMinimum: parseEther(String(Number(amountB) * 0.95))
                    }]
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

    const gameswap = async () => {
        setIsLoading(true);
        try {
            const tokenAAddr = tokenA.value.toUpperCase();
            const tokenBAddr = tokenB.value.toUpperCase();
            const parsedAmountA = parseEther(amountA);
            const slippagePercent = 5;
    
            // Approve if tokenA is not JBC
            if (tokenAAddr !== tokens[0].value.toUpperCase()) {
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
                (tokenAAddr === tokens[0].value.toUpperCase() && tokenBAddr === tokens[2].value.toUpperCase()) ||
                (tokenBAddr === tokens[0].value.toUpperCase() && tokenAAddr === tokens[2].value.toUpperCase())
            ) {
                poolAddr = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring';
            } else if (
                (tokenAAddr === tokens[0].value.toUpperCase() && tokenBAddr === tokens[1].value.toUpperCase()) ||
                (tokenBAddr === tokens[0].value.toUpperCase() && tokenAAddr === tokens[1].value.toUpperCase())
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
                if (tokenAAddr === tokens[0].value.toUpperCase()) useFunction = 'swapJC';
                else if (tokenAAddr === tokens[2].value.toUpperCase()) useFunction = 'swapCMJtoJBC';
            } else if (poolAddr === '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring') {
                if (tokenAAddr === tokens[0].value.toUpperCase()) useFunction = 'swapJU';
                else if (tokenAAddr === tokens[1].value.toUpperCase()) useFunction = 'swapJUSDTtoJBC';
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
    
                if (tokenA.value.toUpperCase() === tokens[0].value.toLocaleUpperCase()) {
                    const { result, request } = await simulateContract(config, {
                        ...CMswapUniSmartRouteContract,
                        functionName: 'swapExactETHForTokensWithFee',
                        value: parseEther(amountA),
                        args: [parseEther(String(Number(amountB) * 0.95)), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
                    })
                    r = result
                    h = await writeContract(config, request)
    
                } else{
                    const route = bestPathArray as readonly `0x${string}`[];
                    const { result, request } = await simulateContract(config, {
                      ...CMswapUniSmartRouteContract,
                      functionName: 'swapExactTokensForTokensWithFee',
                      args: [
                        parseEther(amountA),
                        parseEther(String(Number(amountB) * 0.95)),
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
    
            
            }else if(tokenA.value.toUpperCase() !== tokens[0].value.toLocaleUpperCase()){  
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
                            args: [parseEther(amountA),parseEther(String(Number(amountB) * 0.95)), bestPathArray as readonly `0x${string}`[], address ?? (() => { throw new Error("Address is required") })(), BigInt(deadline)]
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
        setOnLoading(true)
            tokenA.value.toUpperCase() === tokenB.value.toUpperCase() && setTokenB({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})

            const nativeBal = await getBalance(config, {address: address as '0xstring'})
            const stateA = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenA.value, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [address as '0xstring'] }
                ]
            })
            const stateB = await readContracts(config, {
                contracts: [
                    { ...erc20ABI, address: tokenB.value, functionName: 'symbol' },
                    { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [address as '0xstring'] },
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 10000] }, //  
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 3000] }, //  
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 500] }, //  
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, 100] }, //  
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

            const pair10000 = stateB[2].result !== undefined ? stateB[2].result  as '0xstring' : '' as '0xstring'
            const pair3000 = stateB[3].result !== undefined ? stateB[3].result  as '0xstring' : '' as '0xstring'
            const pair500 = stateB[4].result !== undefined ? stateB[4].result  as '0xstring' : '' as '0xstring'
            const pair100 = stateB[5].result !== undefined ? stateB[5].result  as '0xstring' : '' as '0xstring'

            const JCLP  = '0x472d0e2E9839c140786D38110b3251d5ED08DF41' as '0xstring'
            const JULP = '0x280608DD7712a5675041b95d0000B9089903B569' as '0xstring'

            if (tokenA.name !== 'Choose Token' && tokenB.name !== 'Choose Token') {
                try {
                    setAltRoute(undefined)
                    const poolState = await readContracts(config, {
                        contracts: [
                            { ...v3PoolABI, address: pair10000, functionName: 'token0' },
                            { ...v3PoolABI, address: pair10000, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair10000] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair10000] },
                            { ...v3PoolABI, address: pair3000, functionName: 'token0' },
                            { ...v3PoolABI, address: pair3000, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair3000] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair3000] },
                            { ...v3PoolABI, address: pair500, functionName: 'token0' },
                            { ...v3PoolABI, address: pair500, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair500] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair500] },
                            { ...v3PoolABI, address: pair100, functionName: 'token0' },
                            { ...v3PoolABI, address: pair100, functionName: 'slot0' },
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [pair100] },
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [pair100] },

                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [JULP] }, // I16 JULP => Check JUSDT Balance
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [JULP] }, // I17 JULP => Check JUSDT Balance
                            { ...erc20ABI, address: tokenA.value, functionName: 'balanceOf', args: [JCLP] }, // I18 JCLP => Check CMJ Balance
                            { ...erc20ABI, address: tokenB.value, functionName: 'balanceOf', args: [JCLP] }, // I19 JCLP => Check CMJ Balance

                        ]
                    })
                    const token0_10000 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
                    const sqrtPriceX96_10000 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                    const tokenAamount_10000 = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
                    const tokenBamount_10000 = poolState[3].result !== undefined ? poolState[3].result : BigInt(0)
                    const currPrice_10000 = token0_10000.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2))
                    const tvl_10000 = currPrice_10000 !== 0 ?  (Number(formatEther(tokenAamount_10000)) * (1 / currPrice_10000)) + Number(formatEther(tokenBamount_10000)) : 0
                    const exchangeRatetvl_10000 = tvl_10000 < 1e-9 ? 0 : currPrice_10000;
                    feeSelect === 10000 && currPrice_10000 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_10000) / (2 ** 96)) ** 2).toString())

                    // extract code for use
                    const updateTvlKey = (key: keyof typeof CMswapTVL, value: number) => {
                        setCMswapTVL(prevTvl => ({
                            ...prevTvl,
                            [key]: value >= 1e-9 ? value.toString() : '0',
                        }));
                    };
                    
                    
                    const updateExchangeRateCmswapTVL = (feeAmount: number,exchangeRate: number) => {
                        setCMswapTVL(prevTvl => ({
                            ...prevTvl,
                            exchangeRate: feeSelect === feeAmount ? exchangeRate.toString() : prevTvl.exchangeRate
                        }));
                    };

                    updateTvlKey('tvl10000',tvl_10000);
                    updateExchangeRateCmswapTVL(10000,exchangeRatetvl_10000);
                    

                    if (feeSelect === 10000 && tvl_10000 < 1e-9  && poolSelect === "CMswap" ) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 10000] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 10000] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[i / 2]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        console.log({altIntermediate, altPair0, altPair1}) // for quick debugging
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenB.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            updateExchangeRateCmswapTVL(10000,Number((altPrice1 / altPrice0).toString()));
                        }
                    }

                    const token0_3000 = poolState[4].result !== undefined ? poolState[4].result : "" as '0xstring'
                    const sqrtPriceX96_3000 = poolState[5].result !== undefined ? poolState[5].result[0] : BigInt(0)
                    const tokenAamount_3000 = poolState[6].result !== undefined ? poolState[6].result : BigInt(0)
                    const tokenBamount_3000 = poolState[7].result !== undefined ? poolState[7].result : BigInt(0)
                    const currPrice_3000 = token0_3000.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2))
                    const tvl_3000 = (Number(formatEther(tokenAamount_3000)) * (1 / currPrice_3000)) + Number(formatEther(tokenBamount_3000));
                    const exchangeRatetvl_3000 = tvl_3000 < 1e-9 ? 0 : currPrice_3000
                    feeSelect === 3000 && currPrice_3000 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_3000) / (2 ** 96)) ** 2).toString())
                    updateTvlKey('tvl3000',tvl_3000);
                    updateExchangeRateCmswapTVL(3000,exchangeRatetvl_3000);

                    if (feeSelect === 3000 && tvl_3000 < 1e-9  && poolSelect === "CMswap" ) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 3000] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 3000] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[0]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenB.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            updateExchangeRateCmswapTVL(3000,Number((altPrice1 / altPrice0).toString()));
                }
                    }
                    
                    const token0_500 = poolState[8].result !== undefined ? poolState[8].result : "" as '0xstring'
                    const sqrtPriceX96_500 = poolState[9].result !== undefined ? poolState[9].result[0] : BigInt(0)
                    const tokenAamount_500 = poolState[10].result !== undefined ? poolState[10].result : BigInt(0)
                    const tokenBamount_500 = poolState[11].result !== undefined ? poolState[11].result : BigInt(0)
                    const currPrice_500 = token0_500.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_500) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2))
                    const tvl_500 = (Number(formatEther(tokenAamount_500)) * (1 / currPrice_500)) + Number(formatEther(tokenBamount_500));
                    const exchangeRatetvl_500 = tvl_500 < 1e-9 ? 0 : currPrice_500
                    feeSelect === 500 && currPrice_500 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_500) / (2 ** 96)) ** 2).toString())
                    updateTvlKey('tvl500',tvl_500);
                    updateExchangeRateCmswapTVL(500,exchangeRatetvl_500);

                    if (feeSelect === 500 && tvl_500 < 1e-9  && poolSelect === "CMswap" ) {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 500] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 500] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[0]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenB.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            updateExchangeRateCmswapTVL(500,Number((altPrice1 / altPrice0).toString()));
                        }
                    }

                    const token0_100 = poolState[12].result !== undefined ? poolState[12].result : "" as '0xstring'
                    const sqrtPriceX96_100 = poolState[13].result !== undefined ? poolState[13].result[0] : BigInt(0)
                    const tokenAamount_100 = poolState[14].result !== undefined ? poolState[14].result : BigInt(0)
                    const tokenBamount_100 = poolState[15].result !== undefined ? poolState[15].result : BigInt(0)
                    const currPrice_100 = token0_100.toUpperCase() === tokenB.value.toUpperCase() ? (Number(sqrtPriceX96_100) / (2 ** 96)) ** 2 : (1 / ((Number(sqrtPriceX96_100) / (2 ** 96)) ** 2))
                    const tvl_100 = (Number(formatEther(tokenAamount_100)) * (1 / currPrice_100)) + Number(formatEther(tokenBamount_100));
                    const exchangeRatetvl_100 = tvl_100 < 1e-9 ? 0 : currPrice_100;
                    feeSelect === 100 && currPrice_100 !== Infinity && setFixedExchangeRate(((Number(sqrtPriceX96_100) / (2 ** 96)) ** 2).toString())
                    updateTvlKey('tvl100',tvl_100);
                    updateExchangeRateCmswapTVL(100,exchangeRatetvl_100);

                    if (feeSelect === 100 && tvl_100 < 1e-9  && poolSelect === "CMswap" )  {
                        const init: any = {contracts: []}
                        for (let i = 0; i <= tokens.length - 1; i++) {
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokens[i].value, 100] })
                            init.contracts.push({ ...v3FactoryContract, functionName: 'getPool', args: [tokens[i].value, tokenB.value, 100] })
                        }
                        const findAltRoute = await readContracts(config, init)
                        let altIntermediate
                        let altPair0
                        let altPair1
                        for (let i = 0; i <= findAltRoute.length - 1; i+=2) {
                            if (findAltRoute[i].result !== '0x0000000000000000000000000000000000000000' && findAltRoute[i+1].result !== '0x0000000000000000000000000000000000000000') {
                                altIntermediate = tokens[0]
                                altPair0 = findAltRoute[i].result 
                                altPair1 = findAltRoute[i+1].result
                                break
                            }
                        }
                        if (altIntermediate !== undefined) {
                            setAltRoute({a: tokenA.value, b: altIntermediate.value, c: tokenB.value})
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
                            const altPrice0 = altToken0.toUpperCase() === tokenA.value.toUpperCase() ? (Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt0sqrtPriceX96) / (2 ** 96)) ** 2))
                            const altToken1 = altPoolState[2].result !== undefined ? altPoolState[2].result : "" as '0xstring'
                            const alt1sqrtPriceX96 = altPoolState[3].result !== undefined ? altPoolState[3].result[0] : BigInt(0)
                            const altPrice1 = altToken1.toUpperCase() === tokenB.value.toUpperCase() ? (Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2 : (1 / ((Number(alt1sqrtPriceX96) / (2 ** 96)) ** 2))
                            updateExchangeRateCmswapTVL(100,Number((altPrice1 / altPrice0).toString()));
                        }
                    }

                    //** Start Quote Price from Jibswap */

                    if(
                        tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[2].value.toUpperCase() 
                        ||
                        tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()
                    ) { 
                        console.log('JCLP GameSwap view active')
                        let tokenAamount_JCLP = BigInt(0); 
                        let tokenBamount_JCLP = BigInt(0); 

                        if(tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[2].value.toUpperCase()){
                            tokenAamount_JCLP = (await getBalance(config, {address: JCLP as '0xstring'})).value
                            tokenBamount_JCLP = poolState[19].result !== undefined ? poolState[19].result : BigInt(0)
                        }else if(tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[2].value.toUpperCase()){
                            tokenAamount_JCLP = poolState[18].result !== undefined ? poolState[18].result : BigInt(0)
                            tokenBamount_JCLP = (await getBalance(config, {address: JCLP as '0xstring'})  ).value
                        }   

                        let currPrice_jclp =  Number(tokenBamount_JCLP) / Number(tokenAamount_JCLP);
                        const tvlJCLP = (Number(formatEther(tokenAamount_JCLP)) * (1 / currPrice_jclp)) + Number(formatEther(tokenBamount_JCLP));
                        const exchangeRateJCLP = tvlJCLP < 1e-9 ? 0 : currPrice_jclp
                        console.log(`tokenA Amn ${tokenAamount_JCLP}\nTokenB Amn ${tokenBamount_JCLP}\nCurrPrice ${currPrice_jclp}\nTVL : ${tvlJCLP}`)
                        currPrice_jclp !== Infinity && poolSelect === "GameSwap" && setFixedExchangeRate(Number(currPrice_jclp).toString())

                        const setJulpTVL = (tvl10000: number, exchangeRate: number) => {
                            setGameSwapTvl(prevTvl => ({
                                ...prevTvl,
                                tvl10000: tvl10000 >= 1e-9 ? tvlJCLP.toString() : '0',
                                exchangeRate: exchangeRate.toString()
                            }));
                        };
                        setJulpTVL(tvlJCLP,exchangeRateJCLP)


                    }else if(
                        tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[1].value.toUpperCase() 
                        ||
                        tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[1].value.toUpperCase()
                    ) {
                        console.log('JULP GameSwap view active')
                        let tokenAamount_JULP = BigInt(0); 
                        let tokenBamount_JULP = BigInt(0); 

                        if(tokenA.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenB.value.toUpperCase() === tokens[1].value.toUpperCase()){
                            tokenAamount_JULP = (await getBalance(config, {address: JULP as '0xstring'})).value
                            tokenBamount_JULP = poolState[17].result !== undefined ? poolState[17].result : BigInt(0)
                        }else if(tokenB.value.toUpperCase() === tokens[0].value.toUpperCase() && tokenA.value.toUpperCase() === tokens[1].value.toUpperCase()){
                            tokenAamount_JULP = poolState[16].result !== undefined ? poolState[16].result : BigInt(0)
                            tokenBamount_JULP = (await getBalance(config, {address: JULP as '0xstring'})  ).value
                        }
                        
    
                        const currPrice_julp = Number(tokenAamount_JULP) / Number(tokenBamount_JULP);
                        const tvlJULP = (Number(formatEther(tokenAamount_JULP)) * (1 / currPrice_julp)) + Number(formatEther(tokenBamount_JULP));
                        const exchangeRateJULP = tvlJULP < 1e-9 ? 0 : currPrice_julp
                
                        const setJulpTVL = (tvl10000: number, exchangeRate: number) => {
                            setGameSwapTvl(prevTvl => ({
                                ...prevTvl,
                                tvl10000: tvlJULP >= 1e-9 ? tvlJULP.toString() : '0',
                                exchangeRate: exchangeRate.toString()
                            }));
                        };
                        setJulpTVL(tvlJULP,exchangeRateJULP)

                    }else{
                        const resetDefault = () => {
                            setGameSwapTvl(prevTvl => ({
                                ...prevTvl,
                                tvl10000: '0',
                                exchangeRate: (0).toString()
                            }));
                        };
                        resetDefault()

                    }

                    //** Start Quote Price from JibSwap via CMswapUniSmartRoute  */
                        console.log("Pool selected at JibSwap");
                        let TokenA = tokenA.value === "0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring' ? "0x99999999990FC47611b74827486218f3398A4abD" as '0xstring' : tokenA.value ; // convert WJBC Meow to WJBC Jib
                        let TokenB = tokenB.value === "0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747" as '0xstring' ? "0x99999999990FC47611b74827486218f3398A4abD" as '0xstring' : tokenB.value ; // convert WJBC Meow to WJBC Jib
                        // Handle WJBC contract
                        
                        const getPairAddr = await readContracts(config, {contracts: [{...CMswapUniSmartRouteContract,functionName: 'getPairAddress',args: [TokenA, TokenB],}]})
                        const jibPair = getPairAddr[0].result !== undefined ? getPairAddr[0].result  as '0xstring' : '' as '0xstring'
                        const getPoolState = await readContracts(config, {
                            contracts: [
                                {...erc20ABI, address: TokenA, functionName: 'balanceOf' , args: [jibPair]},
                                {...erc20ABI, address: TokenB, functionName: 'balanceOf' , args: [jibPair]}
                            ]
                        })
                        const tokenAamount = getPoolState[0].result !== undefined ? getPoolState[0].result : BigInt(0)
                        const tokenBamount = getPoolState[1].result !== undefined ? getPoolState[1].result : BigInt(0)
                        const currPriceJib = Number(tokenAamount) / Number(tokenBamount);
                        const tvlJib = (Number(formatEther(tokenAamount)) * (1 / currPriceJib)) + Number(formatEther(tokenBamount));
                        const exchangeRateJib = tvlJib < 1e-9 ? 0 : currPriceJib
                        currPriceJib !== Infinity && poolSelect === "JibSwap" && setFixedExchangeRate(Number(currPriceJib).toString())

                        console.log("Token A ",tokenAamount)
                        console.log("Token B ",tokenBamount)
                        console.log("Price ",currPriceJib)
                        console.log("TVL ",tvlJib)
                        console.log("exRate ",exchangeRateJib)

                        const setJibTVL = (tvl10000: number, exchangeRate: number) => {
                            setJibSwapTvl(prevTvl => ({
                                ...prevTvl,
                                tvl10000: tvl10000 >= 1e-9 ? tvl10000.toString() : '0',
                                exchangeRate: exchangeRate !== undefined ? exchangeRate.toString() : (0).toString()
                            }));
                        };
                        setJibTVL(tvlJib,exchangeRateJib)
                        //** set alt at quote price section */


                } catch {
                    setExchangeRate("0")
                }
            }
        }

        setAmountA("")
        setAmountB("")
        fetch0().then(res => {setOnLoading(false); }).catch(error => {console.error('Error:', error);setOnLoading(false)});

        
    }, [config, address, tokenA, tokenB, feeSelect, txupdate])

    React.useEffect(() => {
        // define exchagerate
        if(poolSelect === "CMswap") {
            setExchangeRate(CMswapTVL.exchangeRate)
            console.log('Quote Price CMswap',CMswapTVL.exchangeRate)
        }else if(poolSelect === "GameSwap") {
            setExchangeRate(GameSwapTvl.exchangeRate)
            console.log('Quote Price GameSwap',GameSwapTvl.exchangeRate)
        }else if(poolSelect === "JibSwap"){
            setExchangeRate(JibSwapTvl.exchangeRate)
            console.log('Quote Price JibSwap',JibSwapTvl.exchangeRate)

        }

    },[poolSelect, CMswapTVL, GameSwapTvl,JibSwapTvl])


    React.useEffect(() => {
        if (!onLoading && tokens[0] && tokenA && CMswapTVL && GameSwapTvl && JibSwapTvl) {
          const rates = {
            CMswap: Number(CMswapTVL.exchangeRate || 0),
            GameSwap: Number(GameSwapTvl.exchangeRate || 0),
            JibSwap: Number(JibSwapTvl.exchangeRate || 0),
          };
      
          console.log("Token match:", tokens[0].value === tokenA.value);
          console.log("Rates:", rates);
      
          const isTokenReversed = tokens[0].value !== tokenA.value;
      
          const sortedEntries = Object.entries(rates).sort((a, b) => {
            return isTokenReversed
              ? a[1] - b[1] // ยิ่งน้อยยิ่งดี (reverse pair)
              : b[1] - a[1]; // ยิ่งมากยิ่งดี (forward pair)
          });
      
          const [bestPool] = sortedEntries[0]; 
      
          setBestPool(bestPool);
      
          if (poolSelect === "" && Object.values(rates).every((r) => r !== 0)) {
            setPoolSelect(bestPool);
          }
        }
      }, [onLoading, CMswapTVL, GameSwapTvl, JibSwapTvl, tokens, tokenA]);
      
    React.useEffect(() => {
        if(amountA !== "" && !onLoading){
            getQoute(amountA)
            console.log("pool select change new quote")
        }
    },[poolSelect])


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
                                setTokenA({name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico'})
                            } else {
                                setTokenA({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})
                            }
                        }} 
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input placeholder="0.0" autoFocus className="w-[140px] sm:w-[200px] bg-transparent border-none text-white font-mono text-xl text-white focus:border-0 focus:outline focus:outline-0 p-0 h-auto" value={amountA} onChange={e => {setAmountA(e.target.value); getQoute(e.target.value);}} />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 font-mono flex items-center justify-between h-10 cursor-pointer">
                                <div className='gap-2 flex flex-row items-center justify-center overflow-hidden'>
                                    <div className="w-5 h-5 rounded-full bg-[#00ff9d]/20">
                                        <span className="text-[#00ff9d] text-xs">
                                            {tokenA.logo !== '../favicon.ico' ?<img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
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
                        <Button variant="ghost" size="sm" className="h-6 text-[#00ff9d] font-mono text-xs px-2 cursor-pointer" onClick={() => {setAmountA(tokenABalance); getQoute(tokenABalance);}}>MAX</Button>
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
                                setTokenB({name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico'})
                            } else {
                                setTokenB({name: 'Choose Token', value: '0x' as '0xstring', logo: '../favicon.ico'})
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
                                            {tokenB.logo !== '../favicon.ico' ?<img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" /> : '?'}
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

        if(!shouldShowTVL){
            return ""
        }

        return (
            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "CMswap" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setPoolSelect("CMswap")}>
            <span className="flex items-center gap-1">
                CMswap {bestPool === "CMswap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
            </span>
            {tokenB.value !== "0x" as "0xstring" && shouldShowTVL && (<span className={"truncate" + (tvlValue > 0 ? " text-emerald-300" : "")}>TVL: {Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(tvlValue)} {tokenB.name === "JUSDT" ? "$" : tokenB.name}</span>)}
            </Button>
        );
        })()}

        {Number(GameSwapTvl['tvl10000']) > 0 && (
        <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "GameSwap" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setPoolSelect("GameSwap")}>
            <span className='flex items-center gap-1'>
                GameSwap {bestPool === "GameSwap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
            </span>
            {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(GameSwapTvl['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(GameSwapTvl['tvl10000']))}  {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
        </Button>
        )}
        {Number(JibSwapTvl['tvl10000']) > 0 && (
                    <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (poolSelect === "JibSwap" ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setPoolSelect("JibSwap")}>
            <span className='flex items-center gap-1'>
                JibSwap {bestPool === "JibSwap" && (<span className="bg-yellow-500/10 text-yellow-300 border border-yellow-300/20 rounded px-1.5 py-0.5 text-[10px] font-semibold">Best Price</span>)}
            </span>
            {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(JibSwapTvl['tvl10000']) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(JibSwapTvl['tvl10000']))}  {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
        </Button>
        )}

  
            </div>

        {/** FEE SELECTION  */}
        {poolSelect === "CMswap" && (
            <><div className="flex justify-between items-center my-2">
            <span className="text-gray-400 font-mono text-xs">Swap fee tier</span>
        </div>
        <div className="grid grid-cols-4 gap-2 h-[70px]">
            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 100 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(100)}>
                <span>0.01%</span>
                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl100"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(CMswapTVL["tvl100"]))} {( tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
            </Button>
            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 500 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(500)}>
                <span>0.05%</span>
                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl500"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(CMswapTVL["tvl500"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                </Button>
            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 3000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(3000)}>
                <span>0.3%</span>
                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl3000"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(CMswapTVL["tvl3000"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                </Button>
            <Button variant="outline" className={"font-mono h-full px-3 py-2 rounded-md gap-1 flex flex-col items-start text-xs overflow-hidden " + (feeSelect === 10000 ? "bg-[#162638] text-[#00ff9d] border-[#00ff9d]/30" : "bg-[#0a0b1e]/80 text-gray-400 border-[#00ff9d]/10 hover:bg-[#162638] hover:text-[#00ff9d]/80 cursor-pointer")} onClick={() => setFeeSelect(10000)}>
                <span>1%</span>
                {tokenB.value !== '0x' as '0xstring' && <span className={'truncate' + (Number(CMswapTVL["tvl10000"]) > 0 ? ' text-emerald-300' : '')}>TVL: {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(CMswapTVL["tvl10000"]))} {(tokenB.name === 'JUSDT') ? '$' : tokenB.name}</span>}
                </Button>
        </div>
            </>
        )}


        </div>
            {tokenA.value !== '0x' as '0xstring' && tokenB.value !== '0x' as '0xstring' && Number(amountA) !== 0 && Number(amountA) <= Number(tokenABalance) && Number(amountB) !== 0 ?
                <Button className="w-full bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 font-mono mt-4 cursor-pointer" onClick={handleSwap}>Swap</Button> :
                <Button disabled className="w-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded-md py-6 font-mono mt-4">Swap</Button>
            }
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
                            <span className="mr-1">price quote</span>
                            {exchangeRate !== '0' && !isNaN(Number(exchangeRate)) 
                                ? (<span
                                        className="text-[#00ff9d] font-mono text-xs px-2 gap-1 hover:cursor-pointer" onClick={() => setSwapDirection(!swapDirection)}>
                                        {swapDirection ? `1 ${tokenB.name} = ${Number(exchangeRate).toFixed(4)} ${tokenA.name}` : `1 ${tokenA.name} = ${ isFinite(1 / Number(exchangeRate)) ? (1 / Number(exchangeRate)).toFixed(4) : (0).toFixed(4) } ${tokenB.name}`}
                                    </span>
                                )
                                : <span className="text-red-500 px-2">insufficient liquidity</span>
                            }

                            {Number(amountB) > 0 && 
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
                            <div className="flex items-center text-gray-500 font-mono text-xs my-2">
                                <span className="mr-1">token price</span>
                                {exchangeRate !== '0' && exchangeRate !== '' && <span className="text-white font-mono text-xs px-2 gap-1">
                                    {tokenA.name === 'JUSDT' && <span>{Number(exchangeRate).toFixed(2)} </span>}
                                    {tokenB.name === 'JUSDT' && <span>{Number(1 / Number(exchangeRate)).toFixed(2)} </span>}
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
