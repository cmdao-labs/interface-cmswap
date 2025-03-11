import React from "react"
import { useAccount } from "wagmi"
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts } from '@wagmi/core'
import { formatEther, parseEther } from "viem"
import { Token, BigintIsh } from "@uniswap/sdk-core"
import { TickMath, encodeSqrtRatioX96, Pool, Position } from "@uniswap/v3-sdk"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from 'use-debounce'
import { tokens, POSITION_MANAGER, v3FactoryContract, positionManagerContract, erc20ABI, v3PoolABI } from '@/app/lib/8899'
import { config } from '@/app/config'

export default function Liquidity({ 
    setIsLoading, setErrMsg, 
}: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>,
}) {
    const { address } = useAccount()
    const [txupdate, setTxupdate] = React.useState("")
    const [query, setQuery] = React.useState('')
    const filteredTokens =
        query === ''
            ? tokens
            : tokens.filter((token) => {
                return token.name.toLowerCase().includes(query.toLowerCase())
            })
    const [tokenA, setTokenA] = React.useState<{name: string, value: '0xstring', logo: string}>(tokens[0])
    const [tokenABalance, setTokenABalance] = React.useState("")
    const [amountA, setAmountA] = React.useState("")
    const [tokenB, setTokenB] = React.useState<{name: string, value: '0xstring', logo: string}>({name: 'Choose Token', value: '' as '0xstring', logo: '../favicon.ico'})
    const [tokenBBalance, setTokenBBalance] = React.useState("")
    const [amountB, setAmountB] = React.useState("")
    const [feeSelect, setFeeSelect] = React.useState(10000)
    const [pairDetect, setPairDetect] = React.useState("")
    const [currPrice, setCurrPrice] = React.useState("")
    const [lowerPrice, setLowerPrice] = React.useState("")
    const [upperPrice, setUpperPrice] = React.useState("")
    const [lowerPercentage, setLowerPercentage] = React.useState("0")
    const [upperPercentage, setUpperPercentage] = React.useState("0")
    const [currTickSpacing, setCurrTickSpacing] = React.useState("")
    const [lowerTick, setLowerTick] = React.useState("")
    const [upperTick, setUpperTick] = React.useState("")
    const [rangePercentage, setRangePercentage] = React.useState(0.15)

    const setAlignedLowerTick = useDebouncedCallback((_lowerPrice: string) => {
        setAmountA("")
        setAmountB("")
        const _lowerTick = Math.floor(Math.log(Number(_lowerPrice)) / Math.log(1.0001))
        let alignedLowerTick
        if (Number(_lowerPrice) === 0) {
            alignedLowerTick = Math.ceil(TickMath.MIN_TICK / Number(currTickSpacing)) * Number(currTickSpacing)
        } else {
            alignedLowerTick = Math.floor(_lowerTick / Number(currTickSpacing)) * Number(currTickSpacing)
            setLowerPrice(Math.pow(1.0001, alignedLowerTick).toString())
        }
        setLowerPercentage((((Math.pow(1.0001, alignedLowerTick) / Number(currPrice)) - 1) * 100).toString())
        setLowerTick(alignedLowerTick.toString())
    }, 700)

    const setAlignedUpperTick = useDebouncedCallback((_upperPrice: string) => {
        setAmountA("")
        setAmountB("")
        if (Number(_upperPrice) < Number(lowerPrice)) {
            setUpperPrice("")
            setUpperPercentage("")
        } else {
            const _upperTick = Math.ceil(Math.log(Number(_upperPrice)) / Math.log(1.0001))
            let alignedUpperTick
            if (Number(_upperPrice) === Infinity) {
                alignedUpperTick = Math.floor(TickMath.MAX_TICK / Number(currTickSpacing)) * Number(currTickSpacing)
                setUpperPercentage('+♾️')
            } else {
                alignedUpperTick = Math.ceil(_upperTick / Number(currTickSpacing)) * Number(currTickSpacing)
                setUpperPercentage((((Math.pow(1.0001, alignedUpperTick) / Number(currPrice)) - 1) * 100).toString())
                setUpperPrice(Math.pow(1.0001, alignedUpperTick).toString())
            }
            setUpperTick(alignedUpperTick.toString())
        }
    }, 700)

    const setAlignedAmountB = useDebouncedCallback(async (_amountA: string) => {
        const poolState = await readContracts(config, {
            contracts: [
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' },
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'slot0' },
                { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'liquidity' },
            ]
        })
        const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
        const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
        const tick = poolState[1].result !== undefined ? poolState[1].result[1] : 0
        const liquidity = poolState[2].result !== undefined ? poolState[2].result : BigInt(0)
        const Token0 = new Token(8899, token0, 18)
        const Token1 = String(token0).toUpperCase() === tokenA.value.toUpperCase() ? new Token(8899, tokenB.value, 18) : new Token(8899, tokenA.value, 18)
        const pool = new Pool(
            Token0,
            Token1,
            Number(feeSelect),
            sqrtPriceX96.toString(),
            liquidity.toString(),
            tick
        )
        if (String(token0).toUpperCase() === tokenA.value.toUpperCase()) {
            const singleSidePositionToken0 = Position.fromAmount0({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount0: String(parseEther(_amountA)) as BigintIsh,
                useFullPrecision: true
            })
            setAmountB(formatEther(singleSidePositionToken0.mintAmounts.amount1 as unknown as bigint))
        } else {
            const singleSidePositionToken1 = Position.fromAmount1({
                pool, 
                tickLower: Number(lowerTick), 
                tickUpper: Number(upperTick), 
                amount1: String(parseEther(_amountA)) as BigintIsh,
            })
            setAmountB(formatEther(singleSidePositionToken1.mintAmounts.amount0 as unknown as bigint))
        }
    }, 700)

    const placeLiquidity = async () => {
        setIsLoading(true)
        try {
            let getToken0 = pairDetect !== '0x0000000000000000000000000000000000000000' ? 
                await readContract(config, { ...v3PoolABI, address: pairDetect as '0xstring', functionName: 'token0' }) :
                ''
            if (pairDetect === '0x0000000000000000000000000000000000000000') {
                const { request: request0 } = await simulateContract(config, {
                    ...v3FactoryContract,
                    functionName: 'createPool',
                    args: [tokenA.value, tokenB.value, feeSelect]
                })
                let h = await writeContract(config, request0)
                await waitForTransactionReceipt(config, { hash: h })

                const newPair = await readContract(config, {...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, feeSelect] })
                getToken0 = await readContract(config, { ...v3PoolABI, address: newPair as '0xstring', functionName: 'token0'})
                const amount0 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountA : amountB
                const amount1 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountB : amountA
                const { request: request1 } = await simulateContract(config, {
                    ...v3PoolABI,
                    address: newPair as '0xstring',
                    functionName: 'initialize',
                    args: [BigInt(encodeSqrtRatioX96(parseEther(amount1).toString(), parseEther(amount0).toString()).toString())]
                })
                h = await writeContract(config, request1)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            }
            
            const allowanceA = await readContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceA < parseEther(amountA)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenA.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountA)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const allowanceB = await readContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'allowance', args: [address as '0xstring', POSITION_MANAGER] })
            if (allowanceB < parseEther(amountB)) {
                const { request } = await simulateContract(config, { ...erc20ABI, address: tokenB.value, functionName: 'approve', args: [POSITION_MANAGER, parseEther(amountB)] })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            
            const token0 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? tokenA : tokenB
            const token1 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? tokenB : tokenA
            const amount0 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountA : amountB
            const amount1 = getToken0.toUpperCase() === tokenA.value.toUpperCase() ? amountB : amountA
            const { request } = await simulateContract(config, {
                ...positionManagerContract,
                functionName: 'mint',
                args: [{
                    token0: token0.value as '0xstring',
                    token1: token1.value as '0xstring',
                    fee: feeSelect,
                    tickLower: Number(lowerTick),
                    tickUpper: Number(upperTick),
                    amount0Desired: parseEther(amount0),
                    amount1Desired: parseEther(amount1),
                    amount0Min: BigInt(0),
                    amount1Min: BigInt(0),
                    recipient: address as '0xstring',
                    deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
                }]
            })
            const h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setErrMsg(String(e))
        }
        setIsLoading(false)
    }

    React.useEffect(() => {
        const fetch1 = async () => {
            tokenA.value.toUpperCase() === tokenB.value.toUpperCase() && setTokenB({name: 'Choose Token', value: '' as '0xstring', logo: '../favicon.ico'})

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
                    { ...v3FactoryContract, functionName: 'getPool', args: [tokenA.value, tokenB.value, feeSelect] }
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
            })
            stateA[1].result !== undefined && setTokenABalance(formatEther(stateA[1].result))
            stateB[1].result !== undefined && setTokenBBalance(formatEther(stateB[1].result))
            stateB[2].result !== undefined && setPairDetect(stateB[2].result)
            
            if (stateB[2].result !== undefined && stateB[2].result !== '0x0000000000000000000000000000000000000000') {
                const poolState = await readContracts(config, {
                    contracts: [
                        { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'token0' },
                        { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'slot0' },
                        { ...v3PoolABI, address: stateB[2].result as '0xstring', functionName: 'tickSpacing' }
                    ]
                })
                const token0 = poolState[0].result !== undefined ? poolState[0].result : "" as '0xstring'
                const sqrtPriceX96 = poolState[1].result !== undefined ? poolState[1].result[0] : BigInt(0)
                const _currPrice = token0.toUpperCase() === tokenB.value.toUpperCase() ? 
                    (Number(sqrtPriceX96) / (2 ** 96)) ** 2 : 
                    (1 / ((Number(sqrtPriceX96) / (2 ** 96)) ** 2));
                poolState[1].result !== undefined && setCurrPrice(_currPrice.toString())
                poolState[2].result !== undefined && setCurrTickSpacing(poolState[2].result.toString())
                
                let _lowerPrice = 0
                let _upperPrice = Infinity
                let alignedLowerTick = 0
                let alignedUpperTick = 0
                if (rangePercentage !== 1) {
                    _lowerPrice = ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * (1 - rangePercentage)
                    _upperPrice = ((Number(sqrtPriceX96) / (2 ** 96)) ** 2) * (1 + rangePercentage)
                    const _lowerTick = Math.floor(Math.log(_lowerPrice) / Math.log(1.0001))
                    const _upperTick = Math.ceil(Math.log(_upperPrice) / Math.log(1.0001))
                    alignedLowerTick = poolState[2].result !== undefined ? Math.floor(_lowerTick / poolState[2].result) * poolState[2].result : 0
                    alignedUpperTick = poolState[2].result !== undefined ? Math.ceil(_upperTick / poolState[2].result) * poolState[2].result : 0
                } else {
                    alignedLowerTick = poolState[2].result !== undefined ? Math.ceil(TickMath.MIN_TICK / poolState[2].result) * poolState[2].result : 0
                    alignedUpperTick = poolState[2].result !== undefined ? Math.floor(TickMath.MAX_TICK / poolState[2].result) * poolState[2].result : 0
                }
                const _lowerPriceShow = token0.toUpperCase() === tokenB.value.toUpperCase() ? 
                    Math.pow(1.0001, alignedLowerTick) : 
                    1 / Math.pow(1.0001, alignedUpperTick);
                const _upperPriceShow = token0.toUpperCase() === tokenB.value.toUpperCase() ? 
                    Math.pow(1.0001, alignedUpperTick) : 
                    1 / Math.pow(1.0001, alignedLowerTick);
                setLowerTick(alignedLowerTick.toString())
                setUpperTick(alignedUpperTick.toString())
                rangePercentage !== 1 ? setLowerPrice(_lowerPriceShow.toString()) : setLowerPrice(_lowerPrice.toString())
                rangePercentage !== 1 ? setUpperPrice(_upperPriceShow.toString()) : setUpperPrice(_upperPrice.toString())
                rangePercentage !== 1 ? setLowerPercentage((((_lowerPriceShow / _currPrice) - 1) * 100).toString()) : setLowerPercentage('-100')
                rangePercentage !== 1 ? setUpperPercentage((((_upperPriceShow / _currPrice) - 1) * 100).toString()) : setUpperPercentage('+♾️')
            } else {
                setCurrPrice("")
                const getTickSpacing = await readContracts(config, {
                    contracts: [
                        { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [10000] },
                        { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [3000] },
                        { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [500] },
                        { ...v3FactoryContract, functionName: 'feeAmountTickSpacing', args: [100] },
                    ]
                })
                getTickSpacing[0].status === 'success' && feeSelect === 10000 && setCurrTickSpacing(getTickSpacing[0].result.toString())
                getTickSpacing[1].status === 'success' && feeSelect === 3000 && setCurrTickSpacing(getTickSpacing[1].result.toString())
                getTickSpacing[2].status === 'success' && feeSelect === 500 && setCurrTickSpacing(getTickSpacing[2].result.toString())
                getTickSpacing[3].status === 'success' && feeSelect === 100 && setCurrTickSpacing(getTickSpacing[3].result.toString())
            }
        }

        setAmountA("")
        setAmountB("")
        address !== undefined && rangePercentage !== 999 && fetch1()
    }, [config, address, tokenA, tokenB, feeSelect, rangePercentage, txupdate])
    console.log({lowerTick, upperTick}) // for fetch monitoring

    return (
        <div className='space-y-2'>
            <div className="w-full gap-1 flex flex-row">
                <input className="p-4 bg-transparent border border-gray-800 rounded-lg w-4/6 text-gray-500 text-[10px] focus:outline-none" type="text" placeholder="Token A" value={tokenA.value} onChange={e => setTokenA({name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico'})} />
                <div className="w-2/6">
                    <Listbox value={tokenA} onChange={setTokenA}>
                        {({ open }) => {
                            React.useEffect(() => {
                                if (!open) {
                                    setQuery('')
                                }
                            }, [open]);

                            return (
                                <div>
                                    <ListboxButton className="cursor-pointer relative w-full h-full p-3 rounded-lg bg-white/5 text-left font-semibold gap-2 flex flex-row items-center focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                        <img alt="" src={tokenA.logo} className="size-5 shrink-0 rounded-full" />
                                        <span>{tokenA.name}</span>
                                        <ChevronDownIcon className="pointer-events-none absolute top-4 right-4 size-4 fill-white/60" aria-hidden="true"/>
                                    </ListboxButton>
                                    <ListboxOptions anchor="bottom" transition className="w-[var(--button-width)] rounded-lg bg-neutral-950 p-1 text-gray-500 text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-100">
                                        <input className="m-2 p-2 bg-white/5 rounded-lg w-6/7 text-gray-500 text-[10px] focus:outline-none" placeholder="Search Token" value={query} onChange={e => setQuery(e.target.value)} />
                                        {filteredTokens.map((token) => (
                                            <ListboxOption key={token.name} value={token} className="cursor-pointer py-2 pr-9 pl-3 text-gray-500 data-[focus]:bg-white data-[focus]:font-semibold">
                                                <div className="flex items-center">
                                                    <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                    <span className="ml-3 truncate">{token.name}</span>
                                                </div>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            )
                        }}
                    </Listbox>
                </div>
            </div>
            {lowerPrice === '' || Number(lowerPrice) < Number(currPrice) &&
                <div className="w-full gap-1 flex flex-row items-center">
                    <input className="p-4 rounded-lg bg-transparent w-4/6 font-bold focus:outline-none" type="text" placeholder="0" value={amountA} onChange={(e) => {setAmountA(e.target.value); Number(upperPrice) > Number(currPrice) && setAlignedAmountB(e.target.value);}} />
                    {tokenA.value !== '' as '0xstring' && <button className="cursor-pointer w-2/6 font-semibold text-right text-gray-400" onClick={() => {setAmountA(tokenABalance); Number(upperPrice) > Number(currPrice) && setAlignedAmountB(tokenABalance);}}>{Number(tokenABalance).toFixed(4)} {tokenA.name}</button>}
                </div>
            }
            <div className="w-full gap-1 flex flex-row">
                <input className="p-4 bg-transparent border border-gray-800 rounded-lg w-4/6 text-gray-500 text-[10px] focus:outline-none" type="text" placeholder="Token B" value={tokenB.value} onChange={e => setTokenB({name: 'Choose Token', value: e.target.value as '0xstring', logo: '../favicon.ico'})} />
                <div className="w-2/6">
                    <Listbox value={tokenB} onChange={setTokenB}>
                        {({ open }) => {
                            React.useEffect(() => {
                                if (!open) {
                                    setQuery('')
                                }
                            }, [open]);

                            return (
                                <div>
                                    <ListboxButton className="cursor-pointer relative w-full h-full p-3 rounded-lg bg-white/5 text-left font-semibold gap-2 flex flex-row items-center focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
                                        <img alt="" src={tokenB.logo} className="size-5 shrink-0 rounded-full" />
                                        <span>{tokenB.name}</span>
                                        <ChevronDownIcon className="pointer-events-none absolute top-4 right-4 size-4 fill-white/60" aria-hidden="true"/>
                                    </ListboxButton>
                                    <ListboxOptions anchor="bottom" transition className="w-[var(--button-width)] rounded-lg bg-neutral-950 p-1 text-gray-500 text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-100">
                                        <input className="m-2 p-2 bg-white/5 rounded-lg w-6/7 text-gray-500 text-[10px] focus:outline-none" placeholder="Search Token" value={query} onChange={e => setQuery(e.target.value)} />
                                        {filteredTokens.map((token) => (
                                            <ListboxOption key={token.name} value={token} className="cursor-pointer py-2 pr-9 pl-3 text-gray-500 data-[focus]:bg-white data-[focus]:font-semibold">
                                                <div className="flex items-center">
                                                    <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                                    <span className="ml-3 truncate">{token.name}</span>
                                                </div>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            )
                        }}
                    </Listbox>
                </div>
            </div>
            {upperPrice === '' || Number(upperPrice) > Number(currPrice) &&
                <div className="w-full gap-1 flex flex-row items-center">
                    <input className="p-4 rounded-lg bg-transparent w-4/6 font-bold focus:outline-none" type="text" placeholder="0" value={amountB} onChange={(e) => setAmountB(e.target.value)} />
                    {tokenB.value !== '' as '0xstring' && <button className="cursor-pointer w-2/6 font-semibold text-right text-gray-400" onClick={() => setAmountB(tokenBBalance)}>{Number(tokenBBalance).toFixed(4)} {tokenB.name}</button>}
                </div>
            }
            <div className="w-full h-[100px] gap-2 flex flex-row text-gray-400">
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (feeSelect === 100 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setFeeSelect(100)}>
                    <span>0.01%</span>
                    <span className="text-gray-500">Best for very stable pairs</span>
                </button>
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (feeSelect === 500 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setFeeSelect(500)}>
                    <span>0.05%</span>
                    <span className="text-gray-500">Best for stable pairs</span>
                </button>
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (feeSelect === 3000 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setFeeSelect(3000)}>
                    <span>0.3%</span>
                    <span className="text-gray-500">Best for most pairs</span>
                </button>
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (feeSelect === 10000 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setFeeSelect(10000)}>
                    <span>1%</span>
                    <span className="text-gray-500">Best for exotic pairs</span>
                </button>
            </div>
            <div className="m-2 font-semibold">Current price: {Number(currPrice).toFixed(4)} {tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenA.name + '/' + tokenB.name}</div>
            <div className="w-full h-[100px] gap-2 flex flex-row text-gray-400">
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (rangePercentage === 1 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setRangePercentage(1)}>
                    <span>Full Range</span>
                    <span className="text-gray-500">[-100%, ♾️]</span>
                </button>
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (rangePercentage === 0.15 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setRangePercentage(0.15)}>
                    <span>Wide</span>
                    <span className="text-gray-500">[-15%, +15%]</span>
                </button>
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (rangePercentage === 0.075 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setRangePercentage(0.075)}>
                    <span>Narrow</span>
                    <span className="text-gray-500">[-7.5%, +7.5%]</span>
                </button>
                <button className={"w-1/4 h-full p-3 rounded-lg gap-3 flex flex-col justify-start border border-gray-800 hover:text-white hover:bg-neutral-800 " + (rangePercentage === 0.02 ? "bg-white/5 text-white border-slate-500" : "cursor-pointer")} onClick={() => setRangePercentage(0.02)}>
                    <span>Degen</span>
                    <span className="text-gray-500">[-2%, +2%]</span>
                </button>
            </div>
            {pairDetect === '0x0000000000000000000000000000000000000000' &&
                <div className="w-full gap-1 flex flex-row items-center">
                    <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" placeholder="Initial Price" value={currPrice} onChange={e => setCurrPrice(e.target.value)} />
                    <span className="w-2/6 text-right text-gray-500">{tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenA.name + '/' + tokenB.name}</span>
                </div>
            }
            <div className="w-full gap-1 flex flex-row items-center">
                <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" placeholder="Lower Price" value={lowerPrice} onChange={e => {setLowerPrice(e.target.value); setAlignedLowerTick(e.target.value); setRangePercentage(999);}} />
                <span className="w-2/6 text-right text-gray-500">{tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenA.name + '/' + tokenB.name + (Number(currPrice) > 0 ? ' (' + Number(lowerPercentage).toFixed(2) + '%)' : '')}</span>
            </div>
            <div className="w-full gap-1 flex flex-row items-center">
                <input className="p-4 bg-neutral-900 rounded-lg w-4/6 focus:outline-none" placeholder="Upper Price" value={upperPrice} onChange={e => {setUpperPrice(e.target.value); setAlignedUpperTick(e.target.value); setRangePercentage(999);}} />
                <span className="w-2/6 text-right text-gray-500">{tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && tokenA.name + '/' + tokenB.name + (Number(currPrice) > 0 ? ' (+' + Number(upperPercentage).toFixed(2) + '%)' : '')}</span>
            </div>
            {tokenA.value !== '' as '0xstring' && tokenB.value !== '' as '0xstring' && Number(amountA) <= Number(tokenABalance) && Number(amountB) <= Number(tokenBBalance) ?
                <Button className="w-full h-[50px] bg-blue-500 text-white hover:text-black cursor-pointer" onClick={placeLiquidity}>Add Liquidity</Button> :
                <Button disabled className="w-full h-[50px]">Add Liquidity</Button>
            }
        </div>
    )
}
