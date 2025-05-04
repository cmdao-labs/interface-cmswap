'use client';
import Image from "next/image";
import Link from "next/link"; 
import { useState, useEffect } from 'react';
import { useConnections, useAccount, useReadContracts, useBalance } from 'wagmi';
import { readContracts, writeContract } from '@wagmi/core';
import { useDebouncedCallback } from 'use-debounce';
import { formatEther, parseEther, erc20Abi, createPublicClient, http } from 'viem';
import { unichain, base } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { UniswapV2RouterABI } from '@/app/pump/abi/UniswapV2Router';
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export default function Trade({
    mode, chain, ticker, lp,
  }: {
    mode: string;
    chain: string;
    ticker: string;
    lp: string;
  }) {
    let _chain: any = null;
    let _chainId = 0;
    let _explorer = '';
    let _rpc = '';
    if (chain === 'unichain' || chain === '') {
        _chain = unichain;
        _chainId = 130;
        _explorer = 'https://unichain.blockscout.com/';
    } else if (chain === 'base') {
        _chain = base;
        _chainId = 8453;
        _explorer = 'https://base.blockscout.com/';
        _rpc = 'https://base-mainnet.g.alchemy.com/v2/0shzCCUF1JEPvKjqoEuftQcYrgIufNzE';
    }
    const publicClient = createPublicClient({ 
        chain: _chain,
        transport: http(_rpc)
    });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let _blockcreated: number = 1;
    let v2facAddr: string = '';
    let v2routerAddr: string = '';
    if ((chain === 'unichain' || chain === '') && (mode === 'lite' || mode === '')) {
        currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
        bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
        _blockcreated = 8581591;
        v2facAddr = '0x1f98400000000000000000000000000000000002';
        v2routerAddr = '0x284f11109359a7e1306c3e447ef14d38400063ff';
    } else if ((chain === 'unichain' || chain === '') && mode === 'pro') {
        currencyAddr = '0x4200000000000000000000000000000000000006';
        bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
        _blockcreated = 8581591;
        v2facAddr = '0x1f98400000000000000000000000000000000002';
        v2routerAddr = '0x284f11109359a7e1306c3e447ef14d38400063ff';
    } else if (chain === 'base' && (mode === 'lite' || mode === '')) {
        currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
        bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
        _blockcreated = 26462082;
        v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
        v2routerAddr = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24';
    } else if (chain === 'base' && mode === 'pro') {
        currencyAddr = '0x4200000000000000000000000000000000000006';
        bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
        _blockcreated = 26462082;
        v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
        v2routerAddr = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24';
    }
    const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
    const dataofuniv2factory = {addr: v2facAddr};
    const dataofuniv2router = {addr: v2routerAddr};
    const bkgafactoryContract = {
        address: bkgafactoryAddr as '0xstring',
        abi: ERC20FactoryABI,
        chainId: _chainId,
    } as const
    const univ2factoryContract = {
        address: dataofuniv2factory.addr as '0xstring',
        abi: UniswapV2FactoryABI,
        chainId: _chainId,
    } as const
    const univ2RouterContract = {
        address: dataofuniv2router.addr as '0xstring',
        abi: UniswapV2RouterABI,
        chainId: _chainId,
    } as const

    const [trademode, setTrademode] = useState(true);
    const connections = useConnections();
    const account = useAccount();
    const tickerContract = {
        address: ticker as '0xstring',
        abi: erc20Abi,
        chainId: _chainId,
    } as const
    const [inputBalance, setInputBalance] = useState('');
    const [outputBalance, setOutputBalance] = useState('0');
    const [hash, setHash] = useState('');
    const [headnoti, setHeadnoti] = useState(false);
    const [gradHash, setGradHash] = useState('');
    
    const result2: any = useReadContracts({
        contracts: [
            {
                ...tickerContract,
                functionName: 'name',
            },
            {
                ...tickerContract,
                functionName: 'symbol',
            },
            {
                ...bkgafactoryContract,
                functionName: 'desp',
                args: [ticker as '0xstring'],
            },
            {
                ...bkgafactoryContract,
                functionName: 'logo',
                args: [ticker as '0xstring'],
            },
            {
                ...univ2factoryContract,
                functionName: 'getPair',
                args: [ticker as '0xstring', dataofcurr.addr as '0xstring'],
            },
            {
                address: dataofcurr.addr as '0xstring',
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: account.address !== undefined ? [account.address as '0xstring'] : ['0x0000000000000000000000000000000000000001'],
                chainId: _chainId,
            },
            {
                ...tickerContract,
                functionName: 'balanceOf',
                args: account.address !== undefined ? [account.address as '0xstring'] : ['0x0000000000000000000000000000000000000001'],
            },
            {
                ...bkgafactoryContract,
                functionName: 'isGraduate',
                args: [lp as '0xstring']
            },
        ],
    })
    const ethBal = useBalance({
        address: account.address !== undefined ? account.address as '0xstring' : '0x0000000000000000000000000000000000000001',
    })
    
    const result3 = useReadContracts({
        contracts: [
            {
                address: lp as '0xstring',
                abi: UniswapV2PairABI,
                functionName: 'getReserves',
                chainId: _chainId,
            },
            {
                address: lp as '0xstring',
                abi: UniswapV2PairABI,
                functionName: 'token0',
                chainId: _chainId,
            },
        ],
    })

    const [creator, setCreator] = useState('');
    const [createAt, setCreateAt] = useState(0);
    const [holder, setHolder] = useState([] as { addr: string; value: number; }[]);
    const [hx, setHx] = useState([] as { action: string; value: number; from: any; hash: any; timestamp: number; }[]);
 
    useEffect(() => {
        const fetchLogs = async () => {
            const res = await publicClient.getContractEvents({
                abi: erc20Abi,
                address: ticker as '0xstring',
                eventName: 'Transfer',
                args: { 
                    from: '0x0000000000000000000000000000000000000000',
                },
                fromBlock: BigInt(dataofcurr.blockcreated),
                toBlock: 'latest',
            });
            const res2 = await publicClient.getTransaction({ 
                hash: res[0].transactionHash,
            });
            const res3 = await publicClient.getBlock({ 
                blockNumber: res2.blockNumber,
            })
            setCreator(res2.from);
            setCreateAt(Number(res3.timestamp));
            const result4 = await publicClient.getContractEvents({
                abi: erc20Abi,
                address: ticker as '0xstring',
                eventName: 'Transfer',
                args: { 
                    from: lp as '0xstring',
                },
                fromBlock: BigInt(dataofcurr.blockcreated),
                toBlock: 'latest',
            });
            const result5 = (await Promise.all(result4)).map((res) => {return res.args.to});
            const result5removedup = [...new Set(result5)];
            const result6 = result5removedup.map(async (res) => {
                return await readContracts(config, {
                  contracts: [
                    {
                      address: ticker as '0xstring',
                      abi: erc20Abi,
                      functionName: 'balanceOf',
                      args: [res as '0xstring'],
                      chainId: _chainId,
                    },
                  ],
                });
            })
            const result7 = await Promise.all(result6);
            const result8 = result5removedup.map((res, index) => {
                return {addr: res as string, value: Number(formatEther(result7[index][0].result as bigint)) / 10000000}
            }).filter(
                (res) => {return res.value !== 0}
            );
            setHolder(result8);
            const result9 = await publicClient.getContractEvents({
                address: ticker as '0xstring',
                abi: erc20Abi,
                eventName: 'Transfer',
                args: { 
                    from: lp as '0xstring',
                },
                fromBlock: BigInt(dataofcurr.blockcreated),
                toBlock: 'latest',
            });
            const fulldatabuy = result9.map((res: any) => {
                return {action: Number(formatEther(res.args.value)) === 90661089.38801491 ? 'launch' : 'buy', value: Number(formatEther(res.args.value)), from: res.args.to, hash: res.transactionHash, block: res.blockNumber}
            });
            const result10 = await publicClient.getContractEvents({
                address: ticker as '0xstring',
                abi: erc20Abi,
                eventName: 'Transfer',
                args: { 
                    to: lp as '0xstring',
                },
                fromBlock: BigInt(dataofcurr.blockcreated),
                toBlock: 'latest',
            });            
            const fulldatasell = result10.map((res: any) => {
                return {action: 'sell', value: Number(formatEther(res.args.value)), from: res.args.from, hash: res.transactionHash, block: res.blockNumber}
            });
            const mergedata = fulldatasell.slice(1).concat(fulldatabuy);
            const _timestamparr = mergedata.map(async (res) => {
                return await publicClient.getBlock({ 
                    blockNumber: res.block,
                })
            });
            const timestamparr = await Promise.all(_timestamparr);
            const restimestamp = timestamparr.map((res) => {
                return Number(res.timestamp) * 1000;
            })
            const theresult = mergedata.map((res, index) => {
                return {action: res.action, value: res.value, from: res.from, hash: res.hash, timestamp: restimestamp[index]}
            }).sort((a: any, b: any) => {return b.timestamp - a.timestamp});
            setHx(theresult);
            const resGraduate = (await publicClient.getContractEvents({
                abi: erc20Abi,
                address: lp as '0xstring',
                eventName: 'Transfer',
                args: { 
                    to: '0x0000000000000000000000000000000000000000',
                },
                fromBlock: BigInt(dataofcurr.blockcreated),
                toBlock: 'latest',
            })).filter((res) => {
                return res.args.value === BigInt('12405643876881199591159421');
            });
            if (resGraduate[0] !== undefined) {
                setGradHash(resGraduate[0].transactionHash);
            }
        }
        if (hash === '') {
            fetchLogs();
        } else {
            setInterval(fetchLogs, 5000);
        }
    }, [hash])

    const qoute = useDebouncedCallback(async (value: string) => {
        const path = trademode ? [dataofcurr.addr as '0xstring', ticker as '0xstring'] : [ticker as '0xstring', dataofcurr.addr as '0xstring'];
        const result4 = await readContracts(config, {
            contracts: [
                {
                    ...univ2RouterContract,
                    functionName: 'getAmountsOut',
                    args: [parseEther(value), path]
                },
            ],
        });
        setOutputBalance(formatEther(result4[0].result![1]));
    }, 300);

    const trade = async () => {
        const path = trademode ? [dataofcurr.addr as '0xstring', ticker as '0xstring'] : [ticker as '0xstring', dataofcurr.addr as '0xstring'];
        let result: any = '';
        if (mode === 'pro' && trademode) {
            result = await writeContract(config, {
                ...univ2RouterContract,
                functionName: 'swapExactETHForTokens',
                args: [parseEther(String(Number(outputBalance) * 0.95)), path, account.address as '0xstring', BigInt((Number(Date.now() / 100).toFixed(0)) + 3600)],
                value: parseEther(inputBalance),
            })
        } else if (mode === 'pro' && !trademode) {
            const allowance = await readContracts(config, {
                contracts: [
                    {
                        address: ticker as '0xstring',
                        abi: erc20Abi,
                        functionName: 'allowance',
                        args: [account.address as '0xstring', dataofuniv2router.addr as '0xstring'],
                        chainId: _chainId,
                    },
                ],
            });
            if (Number(formatEther(allowance[0].result!)) < Number(inputBalance)) {
                writeContract(config, {
                    address: ticker as '0xstring',
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [dataofuniv2router.addr as '0xstring', parseEther(String(Number(inputBalance) + 1))],
                    chainId: _chainId,
                })
            }
            result = await writeContract(config, {
                ...univ2RouterContract,
                functionName: 'swapTokensForExactETH',
                args: [parseEther(String(outputBalance)), (parseEther(inputBalance) * BigInt(105)) / BigInt(100), path, account.address as '0xstring', BigInt((Number(Date.now() / 100).toFixed(0)) + 3600)],
            })
        } else {
            const allowance = await readContracts(config, {
                contracts: [
                    {
                        address: trademode ? dataofcurr.addr as '0xstring' : ticker as '0xstring',
                        abi: erc20Abi,
                        functionName: 'allowance',
                        args: [account.address as '0xstring', dataofuniv2router.addr as '0xstring'],
                        chainId: _chainId,
                    },
                ],
            });
            if (Number(formatEther(allowance[0].result!)) < Number(inputBalance)) {
                writeContract(config, {
                    address: trademode ? dataofcurr.addr as '0xstring' : ticker as '0xstring',
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [dataofuniv2router.addr as '0xstring', parseEther(String(Number(inputBalance) + 1))],
                    chainId: _chainId,
                })
            }
            result = await writeContract(config, {
                ...univ2RouterContract,
                functionName: 'swapExactTokensForTokens',
                args: [parseEther(inputBalance), parseEther(String(Number(outputBalance) * 0.95)), path, account.address as '0xstring', BigInt((Number(Date.now() / 100).toFixed(0)) + 3600)],
            })
        }
        setHeadnoti(true);
        setHash(result);
        setInputBalance('');
        setOutputBalance('0');
    }

    return (
        <main className="row-start-2 w-full flex flex-col gap-4 items-center xl:items-start">
            {headnoti && <div className="w-full h-[40px] bg-sky-500 animate-pulse text-center p-2 flex flex-row gap-2 items-center justify-center">
                <span>Trade Successful!, </span>
                <Link href={_explorer + "tx/" + hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="underline">your txn hash</Link>
                <button className="bg-red-600 px-2 rounded-lg" onClick={() => setHeadnoti(false)}>Close</button>
            </div>}
            <div className="ml-[28px] w-full xl:w-2/3 flex flex-col gap-4 mb-2">
                <Link href={"/launchpad?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline hover:font-bold">Back to launchpad</Link>
                <div className="w-full flex flex-row flex-wrap justify-between text-xs xl:text-md">
                    <div className="flex flex-row flex-wrap gap-2">
                        <span className="text-emerald-300">{result2.status === 'success' && result2.data![0].result}</span>
                        <span>{result2.status === 'success' && '[$' + result2.data![1].result + ']'}</span>
                        <span className="flex flex-row gap-2">
                            <span>CA: {ticker.slice(0, 5)}...{ticker.slice(37)}</span>
                            <Link href={_explorer + "address/" + ticker} rel="noopener noreferrer" target="_blank" prefetch={false} className="h-[14px] w-[16px] overflow-hidden flex flex-wrap content-center justify-center">
                                <div className="h-[20px] w-[20px] relative hover:h-[22px] hover:w-[22px]">
                                    <Image src="/bs.png" alt="blockscout" fill />
                                </div>
                            </Link>
                        </span>
                    </div>
                    <span>Price: <span className="text-emerald-300">{
                        result3.status === 'success' ? 
                            result3.data![1].result!.toUpperCase() === dataofcurr.addr.toUpperCase() ?
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(result3.data![0].result![0])) / Number(formatEther(result3.data![0].result![1]))) :
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(result3.data![0].result![1])) / Number(formatEther(result3.data![0].result![0])))
                            :
                            'Fetching...'
                    }</span> {mode === 'pro' ? '$ETH' : '$THB'}</span>
                    <span>Market Cap: <span className="text-emerald-300">{
                        result3.status === 'success' ?
                            result3.data![1].result!.toUpperCase() === dataofcurr.addr.toUpperCase() ?
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((Number(formatEther(result3.data![0].result![0])) / Number(formatEther(result3.data![0].result![1]))) * 1000000000) :
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((Number(formatEther(result3.data![0].result![1])) / Number(formatEther(result3.data![0].result![0]))) * 1000000000)
                            :
                            'Fetching...'
                    }</span> {mode === 'pro' ? '$ETH' : '$THB'}</span>
                    <span>
                        Creator: {creator.slice(0, 5)}...{creator.slice(37)} ····· {
                            Number(Number(Date.now() / 1000).toFixed(0)) - Number(createAt) < 60 && rtf.format(Number(createAt) - Number(Number(Date.now() / 1000).toFixed(0)), 'second')
                        }
                        {
                            Number(Number(Date.now() / 1000).toFixed(0)) - Number(createAt) >= 60 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(createAt) < 3600 && rtf.format(Number(Number((Number(createAt) - Number(Number(Date.now() / 1000).toFixed(0))) / 60).toFixed(0)), 'minute')
                        }
                        {
                            Number(Number(Date.now() / 1000).toFixed(0)) - Number(createAt) >= 3600 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(createAt) < 86400 && rtf.format(Number(Number((Number(createAt) - Number(Number(Date.now() / 1000).toFixed(0))) / 3600).toFixed(0)), 'hour')
                        }
                        {
                            Number(Number(Date.now() / 1000).toFixed(0)) - Number(createAt) >= 86400 && rtf.format(Number(Number((Number(createAt) - Number(Number(Date.now() / 1000).toFixed(0))) / 86400).toFixed(0)), 'day')
                        }
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-row flex-wrap-reverse gap-12 items-center xl:items-start justify-around">
                <div className="w-full xl:w-2/3 h-[1500px] flex flex-col gap-4 items-center xl:items-start" style={{zIndex: 1}}>
                    <iframe key={hash} id="dextools-widget" title="DEXTools Trading Chart" width="100%" height="500px" src={"https://www.dextools.io/widget-chart/en/" + chain + "/pe-light/" + lp + "?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false"} />
                    <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                        <div className="w-1/5 sm:w-1/3">Timestamp</div>
                        <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10">
                            <span className="text-right w-[50px] xl:w-[200px]">From</span>
                            <span className="text-right w-[100px] xl:w-[200px]">Asset</span>
                            <span className="text-right w-[50px] xl:w-[200px]">Amount</span>
                            <span className="text-right w-[50px] xl:w-[200px]">Txn hash</span>
                        </div>
                    </div>
                    <div className="w-full h-[950px] pr-4 flex flex-col items-center sm:items-start overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sky-500" style={{zIndex: 1}}>
                        {hx.map((res: any, index: any) =>
                            <div className="w-full h-[10px] flex flex-row items-center justify-around text-xs md:text-sm py-6 border-b border-gray-800" key={index}>
                                <span className="w-1/5 sm:w-1/3 text-gray-500 text-xs">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Bangkok', }).format(new Date(res.timestamp))}</span>
                                <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10 text-xs sm:text-sm">
                                    <span className="text-right w-[50px] xl:w-[200px]">{res.from.slice(0, 5) + '...' + res.from.slice(37)}</span>
                                    <div className="text-right w-[100px] xl:w-[200px] flex flex-row gap-2 items-center justify-end overflow-hidden">
                                        {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                                        {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                                        {res.action === 'launch' && <span className="text-emerald-300 font-bold">🚀 {res.action.toUpperCase()} & BUY</span>}
                                    </div>
                                    <span className="text-right w-[50px] xl:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                                    <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="font-bold text-right w-[50px] xl:w-[200px] underline truncate">{res.hash.slice(0, 5) + '...' + res.hash.slice(61)}</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full xl:w-1/4 h-fit xl:h-[1500px] flex flex-col gap-8">
                    <div className="w-full h-[300px] border-2 border-l-8 border-emerald-300 border-solid flex flex-col item-center justify-around bg-gray-900" style={{zIndex: 1}}>
                        <div className="w-3/4 bg-gray-800 self-center p-2 mt-3 mb-3 rounded-2xl flex flex-row justify-around">
                            <span className={(trademode ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: trademode ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => {setTrademode(true); setInputBalance(''); setOutputBalance('0');}}>Buy</span>
                            <span className={(!trademode ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: !trademode ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => {setTrademode(false); setInputBalance(''); setOutputBalance('0');}}>Sell</span>
                        </div>
                        <div className="w-full flex flex-row justify-between text-2xl">
                            <input className="appearance-none leading-tight focus:outline-none focus:shadow-outline ml-[20px] w-3/5 font-bold bg-transparent" placeholder="0" value={inputBalance} onChange={(event) => {setInputBalance(event.target.value); qoute(event.target.value);}} type="number" />
                            <span className="mr-[20px] w-2/5 text-right truncate">{trademode ? mode === 'pro' ? '$ETH' :'$THB' : result2.status === 'success' && '$' + result2.data![1].result}</span>
                        </div>
                        <div className="mr-[20px] self-end text-sm">
                            {mode === 'pro' ?
                                <>
                                    <span className="text-gray-300">{trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(ethBal.status === 'success' ? formatEther(ethBal.data!.value) : 0)) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(result2.status === 'success' ? formatEther(result2.data![6].result as bigint) : 0)) + ' '}</span>
                                    <span className="underline cursor-pointer hover:font-bold" onClick={() => {setInputBalance(trademode ? String(Number(formatEther(ethBal.data!.value)) - 0.00001) : String(formatEther(result2.data![6].result as bigint))); qoute(trademode ? String(Number(formatEther(ethBal.data!.value)) - 0.00001) : String(formatEther(result2.data![6].result as bigint)))}}>Max</span>
                                </> :
                                <>
                                    <span className="text-gray-300">{trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(result2.status === 'success' ? formatEther(result2.data![5].result as bigint) : 0)) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(result2.status === 'success' ? formatEther(result2.data![6].result as bigint) : 0)) + ' '}</span>
                                    <span className="underline cursor-pointer hover:font-bold" onClick={() => {setInputBalance(trademode ? String(formatEther(result2.data![5].result as bigint)) : String(formatEther(result2.data![6].result as bigint))); qoute(trademode ? String(formatEther(result2.data![5].result as bigint)) : String(formatEther(result2.data![6].result as bigint)))}}>Max</span>
                                </>
                            }
                        </div>
                        <div className="w-full flex flex-row justify-between text-2xl text-emerald-300 font-bold">
                            <span className="ml-[20px] w-3/5 overflow-hidden">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(outputBalance))}</span>
                            <span className="mr-[20px] w-2/5 text-right truncate">{!trademode ? mode === 'pro' ? '$ETH' :'$THB' : result2.status === 'success' && '$' + result2.data![1].result}</span>
                        </div>
                        <div className="mr-[20px] self-end text-sm">
                            {mode === 'pro' ?
                                <span className="text-gray-300">{!trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(ethBal.status === 'success' ? formatEther(ethBal.data!.value) : 0)) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(result2.status === 'success' ? formatEther(result2.data![6].result as bigint) : 0)) + ' '}</span> :
                                <span className="text-gray-300">{!trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(result2.status === 'success' ? formatEther(result2.data![5].result as bigint) : 0)) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(result2.status === 'success' ? formatEther(result2.data![6].result as bigint) : 0)) + ' '}</span>
                            }
                        </div>
                        {connections && account.address !== undefined && account.chainId === _chainId ? 
                            <button className="w-3/4 self-center p-2 my-3 rounded-2xl font-bold bg-emerald-300 text-slate-900 underline hover:bg-sky-500 hover:text-white" onClick={trade}><span className="self-center">Trade</span></button> :
                            <button className="w-3/4 self-center p-2 my-3 rounded-2xl font-bold bg-gray-500 cursor-not-allowed" disabled><span className="self-center text-slate-900">Trade</span></button>
                        }
                    </div>
                    <div className="w-full h-fit xl:h-[300px] flex flex-col gap-6 item-center justify-start">
                        <div className="w-1/2 ml-[20px]"><Image src={
                            result2.status === 'success' ? 
                                result2.data![3].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!.slice(7) : 
                                "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!
                            :
                            "https://gateway.commudao.xyz/ipfs/"
                        } alt="token_waiting_for_approve" width={100} height={100} /></div>
                        <div className="ml-[20px] h-[190px] overflow-hidden mr-[20px]"><span className="text-xs">Description: {result2.status === 'success' && result2.data![2].result}</span></div>
                        {(result2.status === 'success' && result2.data[7].result) ?
                            <>
                                <span className="ml-[20px] text-sm font-bold">🔥 This token has graduated!: {gradHash !== '' && <Link href={_explorer + "tx/" + gradHash} rel="noopener noreferrer" target="_blank" prefetch={false} className="underline text-emerald-300">Txn hash</Link>}</span>
                                <div className="ml-[20px] mr-[20px] h-6 bg-gray-400 rounded-lg overflow-hidden">
                                    <div className="h-6 bg-yellow-500 rounded-lg" style={{width: '100%'}} />
                                </div>
                            </> :
                            <>
                                <div className="ml-[20px] text-sm flex flex-row gap-2 justify-start">
                                    <span>graduation progress: {
                                        result3.status === 'success' &&  Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(
                                            result3.data![1].result?.toUpperCase() === currencyAddr.toUpperCase() ?
                                                ((Number(formatEther(result3.data![0].result![0])) / Number(formatEther(result3.data![0].result![1]))) * 1000000000 * 100) / (mode === 'pro' ? 1 : 320000000) :
                                                ((Number(formatEther(result3.data![0].result![1])) / Number(formatEther(result3.data![0].result![0]))) * 1000000000 * 100) / (mode === 'pro' ? 1 : 320000000)
                                        )
                                    }%</span>
                                    <div className='has-tooltip'>
                                        <span className='tooltip rounded shadow-lg p-1 bg-neutral-800 -mt-20 text-xs'>{'When the market cap reaches ' + (mode === 'pro' ? '1 ETH' : '320,000,000 $THB') + ', 90% of the liquidity in the factory contract will be burned, while the remaining 10% will be allocated as a platform fee.'}</span>
                                        i
                                    </div>
                                </div>
                                <div className="ml-[20px] mr-[20px] h-6 bg-gray-400 rounded-lg overflow-hidden">
                                    <div className="h-6 bg-sky-400 rounded-lg" style={{width: 
                                        result3.status === 'success' ?
                                            result3.data![1].result?.toUpperCase() === currencyAddr.toUpperCase() ? 
                                                (((Number(formatEther(result3.data![0].result![0])) / Number(formatEther(result3.data![0].result![1]))) * 1000000000 * 100) / (mode === 'pro' ? 1 : 320000000)) + '%' :
                                                (((Number(formatEther(result3.data![0].result![1])) / Number(formatEther(result3.data![0].result![0]))) * 1000000000 * 100) / (mode === 'pro' ? 1 : 320000000)) + '%'
                                            :
                                            '0%'
                                    }} />
                                </div>
                            </>
                        }
                        
                        
                    </div>
                    <div className="w-full h-[780px] p-8 rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center">
                        <span className="w-full h-[50px] pb-10 text-center text-sm lg:text-lg font-bold">
                            {holder.length} Holders
                        </span>
                        {holder.sort(
                            (a, b) => {return b.value - a.value}
                        ).map((res, index) =>
                            <div className="w-full h-[50px] flex flex-row items-center justify-between text-xs lg:text-md py-2 border-b border-gray-800" key={index}>
                                <div className="w-3/4 flex flex-row items-center justify-start gap-6 overflow-hidden">
                                    <span>{index + 1}.</span>
                                    <span className={"font-bold " + (res.addr.toUpperCase() === creator.toUpperCase() ? "text-emerald-300" : "")}>{res.addr.slice(0, 5) + '...' + res.addr.slice(37)} {res.addr.toUpperCase() === creator.toUpperCase() && '[Creator 🧑‍💻]'}</span>
                                </div>
                                <span className="w-1/4 text-right w-[50px] sm:w-[200px]">{res.value.toFixed(4)}%</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
