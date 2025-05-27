'use client';
import Image from "next/image";
import Link from "next/link"; 
import React, { useState, useEffect } from 'react';
import { useConnections, useAccount, useReadContracts } from 'wagmi';
import { readContracts, writeContract, simulateContract, waitForTransactionReceipt, getBalance } from '@wagmi/core';
import { useDebouncedCallback } from 'use-debounce';
import { formatEther, parseEther, erc20Abi, createPublicClient, http } from 'viem';
import { Copy, Check, Plus } from 'lucide-react';
import { bitkub, monadTestnet } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { UniswapV2RouterABI } from '@/app/pump/abi/UniswapV2Router';
import { UniswapV3QouterABI } from '@/app/pump/abi/UniswapV3Qouter';
import { SocialsABI } from "@/app/pump/abi/Socials";

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const { ethereum } = window as any
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaGlobe } from "react-icons/fa"; 

export default function Trade({
    mode, chain, ticker, lp, token,
  }: {
    mode: string;
    chain: string;
    ticker: string;
    lp: string;
    token: string;
  }) {
    let _chain: any = null;
    let _chainId = 0;
    let _explorer = '';
    let _rpc = '';
    if (chain === 'kub' || chain === '') {
        _chain = bitkub;
        _chainId = 96;
        _explorer = 'https://www.kubscan.com/';
    } else if (chain === 'monad') {
        _chain = monadTestnet;
        _chainId = 10143;
        _explorer = 'https://monad-testnet.socialscan.io/';
        _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
    } // add chain here
    const publicClient = createPublicClient({ 
        chain: _chain,
        transport: http(_rpc)
    });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let _blockcreated: number = 1;
    let v2facAddr: string = '';
    let v2routerAddr: string = '';
    let v3qouterAddr: string = '';
    let socialAddr: string = '';
    if ((chain === 'kub' || chain === '') && (mode === 'lite' || mode === '') && (token === 'cmm' || token === '')) {
        currencyAddr = '0x9b005000a10ac871947d99001345b01c1cef2790';
        bkgafactoryAddr = '0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62';
        _blockcreated = 25229488;
        v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
        v2routerAddr = '0x3F7582E36843FF79F173c7DC19f517832496f2D8';
        v3qouterAddr = '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f';
        socialAddr = '0xdf6516Bd0e28F85f94Fdd6E9E5569ab5f24AbEF6';
    } else if ((chain === 'kub' || chain === '') && mode === 'pro') {
        currencyAddr = '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5';
        bkgafactoryAddr = '0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56';
        _blockcreated = 25232899;
        v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
        v2routerAddr = '0x3F7582E36843FF79F173c7DC19f517832496f2D8';
        v3qouterAddr = '0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f';
        socialAddr = '0xdf6516Bd0e28F85f94Fdd6E9E5569ab5f24AbEF6';
    } else if (chain === 'monad' && mode === 'pro') {
        currencyAddr = '0x760afe86e5de5fa0ee542fc7b7b713e1c5425701';
        bkgafactoryAddr = '0x6dfc8eecca228c45cc55214edc759d39e5b39c93';
        _blockcreated = 16912084;
        v2facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
        v2routerAddr = '0x5a16536bb85a2fa821ec774008d6068eced79c96';
        v3qouterAddr = '0x555756bd5b347853af6f713a2af6231414bedefc';
        socialAddr = '';
    } // add chain and mode here
    const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
    const dataofuniv2factory = {addr: v2facAddr};
    const dataofuniv2router = {addr: v2routerAddr};
    const dataofuniv3qouter = {addr: v3qouterAddr};
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
    const univ3QouterContract = {
        address: dataofuniv3qouter.addr as '0xstring',
        abi: UniswapV3QouterABI,
        chainId: _chainId,
    } as const

    const socialContrct = {
        address : socialAddr as '0xstring',
        abi: SocialsABI,
        chainId: _chainId,
    } as const

    const [trademode, setTrademode] = useState(true);
    const [tabmode, setTabmode] = useState(false);
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
    const [ethBal, setEthBal] = useState(BigInt(0));
    const [state, setState] = useState<any>([{result: BigInt(0)}, {result: BigInt(0)}, {result: false}, {result: [BigInt(0)]}]);
    const [showSocials, setShowSocials] = useState(false);
    const hasSetSocialsRef = React.useRef(false);

    const [socials, setSocials] = useState({
        fb: "",
        x: "",
        telegram: "",
        website: "",
    });
    const [errors, setErrors] = useState({
        fb: false,
        x: false,
        telegram: false,
        website: false,
    });

  const isValidUrl = (url: string) => {
    return url === "" || url.startsWith("http://") || url.startsWith("https://");
  };

  const handleChange = (field: keyof typeof socials) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSocials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: !isValidUrl(value) }));
  };
    
  const handleSave = () => {
    const hasError = Object.values(errors).some((v) => v);
    if (hasError) {
      return;
    }

    const { fb, x, telegram, website } = socials;
    setSocial();
    console.log("Saving socials:", { fb, x, telegram, website });
    setShowSocials(false);
  };

    type JSXElement = React.ReactElement;

    const socialItems: { icon: JSXElement; field: keyof typeof socials }[] = [
        { icon: <FaFacebookF className="text-blue-600" />, field: "fb" },
        { icon: <FaTwitter className="text-blue-400" />, field: "x" },
        { icon: <FaTelegramPlane className="text-blue-500" />, field: "telegram" },
        { icon: <FaGlobe className="text-green-500" />, field: "website" },
    ];

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
                functionName: 'getPool',
                args: [ticker as '0xstring', dataofcurr.addr as '0xstring', 10000],
            },
            {
                ...bkgafactoryContract,
                functionName: 'creator',
                args: [ticker as '0xstring'],
            },
            {
                ...bkgafactoryContract,
                functionName: 'createdTime',
                args: [ticker as '0xstring'],
            },
        ],
    })
    
    const result3 = useReadContracts({
        contracts: [
            {
                address: lp as '0xstring',
                abi: UniswapV2PairABI,
                functionName: 'slot0',
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

    const socialsResult = useReadContracts({
        contracts: [
            {
                address: socialAddr as '0xstring',
                abi: SocialsABI,
                functionName: 'socials',
                chainId: _chainId,
                args: [ticker as '0xstring'],
            }
        ]
    })

    const [holder, setHolder] = useState([] as { addr: string; value: number; }[]);
    const [hx, setHx] = useState([] as { action: string; value: number; from: any; hash: any; timestamp: number; }[]);
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const copyToClipboard = async (address: string): Promise<void> => {
        await navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => {
            setCopiedAddress(null);
        }, 2000);
    }
 
    useEffect(() => {
        const fetch0 = async () => {
            const nativeBal = account.address !== undefined ? await getBalance(config, { address: account.address as '0xstring' }) : { value: BigInt(0) }
            setEthBal(nativeBal.value)
            const state0 = account.address !== undefined ? await readContracts(config, {
                contracts: [
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
                    {
                        address: lp as '0xstring',
                        abi: UniswapV2PairABI,
                        functionName: 'slot0',
                        chainId: _chainId,
                    },
                ]
            }) : [{result: BigInt(0)}, {result: BigInt(0)}, {result: false}, {result: [BigInt(0)]}]
            setState(state0)
        }
        const fetchLogs = async () => {
            // if (chain === 'monad' && mode === 'pro') {
            //     const blockNumber = await publicClient.getBlockNumber() 
            //     dataofcurr.blockcreated = Number(blockNumber - BigInt(400));
            // }
            let result5removedup
            if (chain === 'monad') {
                const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
                const body = JSON.stringify({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: "0x0",
                            toBlock: "latest",
                            contractAddresses: [ticker as '0xstring'],
                            excludeZeroValue: true,
                            category: ["erc20"]
                        }
                    ]
                })
                const response = await fetch(_rpc, {method: 'POST', headers: headers, body: body})
                const data = await response.json()
                const _holder = data.result.transfers.map(async (res: any) => {
                    return res.to
                })
                result5removedup = [...new Set(await Promise.all(_holder))];
            } else {
                const result4 = await publicClient.getContractEvents({
                    abi: erc20Abi,
                    address: ticker as '0xstring',
                    eventName: 'Transfer',
                    fromBlock: BigInt(dataofcurr.blockcreated),
                    toBlock: 'latest',
                });
                const result5 = (await Promise.all(result4)).map((res) => {return res.args.to});
                result5removedup = [...new Set(result5)];
            }
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
            let fulldatabuy
            let fulldatasell
            if (chain === 'monad') {
                const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
                const body = JSON.stringify({
                    id: 2,
                    jsonrpc: "2.0",
                    method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: "0x0",
                            toBlock: "latest",
                            fromAddress: lp as '0xstring',
                            contractAddresses: [ticker as '0xstring'],
                            excludeZeroValue: true,
                            category: ["erc20"]
                        }
                    ]
                })
                const response = await fetch(_rpc, {method: 'POST', headers: headers, body: body})
                const data = await response.json()
                fulldatabuy = data.result.transfers.map((res: any) => {
                    return {action: 'buy', value: Number(formatEther(BigInt(res.rawContract.value))), from: res.to, hash: res.hash, block: Number(res.blockNum)}
                });
                const body2 = JSON.stringify({
                    id: 3,
                    jsonrpc: "2.0",
                    method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: "0x0",
                            toBlock: "latest",
                            toAddress: lp as '0xstring',
                            contractAddresses: [ticker as '0xstring'],
                            excludeZeroValue: true,
                            category: ["erc20"]
                        }
                    ]
                })
                const response2 = await fetch(_rpc, {method: 'POST', headers: headers, body: body2})
                const data2 = await response2.json()
                fulldatasell = data2.result.transfers.map((res: any) => {
                    return {action: 'sell', value: Number(formatEther(BigInt(res.rawContract.value))), from: res.from, hash: res.hash, block: Number(res.blockNum)}
                });
            } else {
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
                fulldatabuy = result9.map((res: any) => {
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
                fulldatasell = result10.map((res: any) => {
                    return {action: 'sell', value: Number(formatEther(res.args.value)), from: res.args.from, hash: res.transactionHash, block: res.blockNumber}
                });
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
            const mergedata = fulldatasell.slice(1).concat(fulldatabuy);
            const _timestamparr = mergedata.map(async (res: any) => {
                return await publicClient.getBlock({ 
                    blockNumber: res.block,
                })
            });
            const timestamparr = await Promise.all(_timestamparr);
            const restimestamp = timestamparr.map((res) => {
                return Number(res.timestamp) * 1000;
            })
            const theresult = mergedata.map((res: any, index: any) => {
                return {action: res.action, value: res.value, from: res.from, hash: res.hash, timestamp: restimestamp[index]}
            }).sort((a: any, b: any) => {return b.timestamp - a.timestamp});
            setHx(theresult);
        }
        if (hash === '') {
            fetchLogs();
            fetch0();
        } else {
            setInterval(fetchLogs, 5000);
            setInterval(fetch0, 5000);
        }
    }, [hash])

    const qoute = useDebouncedCallback(async (value: string) => {
         try {
            if (Number(value) !== 0) {
                const qouteOutput = await simulateContract(config, {
                    ...univ3QouterContract, 
                    functionName: 'quoteExactInputSingle', 
                    args: [{ 
                        tokenIn: trademode ? dataofcurr.addr as '0xstring' : ticker as '0xstring', 
                        tokenOut: trademode ? ticker as '0xstring' : dataofcurr.addr as '0xstring', 
                        amountIn: parseEther(value), 
                        fee: 10000, 
                        sqrtPriceLimitX96: BigInt(0), 
                        
                    }]
                })
                setOutputBalance(formatEther(qouteOutput.result[0]))
            } else {
                setOutputBalance("")
            }
        } catch {}
    }, 300);

    const trade = async () => {
        let result: any = '';
        if (mode === 'pro') {
            if (!trademode) {
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
                    const { request } = await simulateContract(config, {
                        address: ticker as '0xstring',
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [dataofuniv2router.addr as '0xstring', parseEther(String(Number(inputBalance) + 1))],
                        chainId: _chainId,
                    })
                    const h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
            }
            result = await writeContract(config, {
                ...univ2RouterContract,
                functionName: 'exactInputSingle',
                args: [{
                    tokenIn: trademode ? dataofcurr.addr as '0xstring' : ticker as '0xstring', 
                    tokenOut: trademode ? ticker as '0xstring' : dataofcurr.addr as '0xstring', 
                    fee: 10000,
                    recipient: account.address as '0xstring',
                    amountIn: parseEther(inputBalance),
                    amountOutMinimum: parseEther(outputBalance) * BigInt(95) / BigInt(100),
                    sqrtPriceLimitX96: BigInt(0)
                }],
                value: trademode ? parseEther(inputBalance) : BigInt(0)
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
                const { request } = await simulateContract(config, {
                    address: trademode ? dataofcurr.addr as '0xstring' : ticker as '0xstring',
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [dataofuniv2router.addr as '0xstring', parseEther(String(Number(inputBalance) + 1))],
                    chainId: _chainId,
                })
                const h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            result = await writeContract(config, {
                ...univ2RouterContract,
                functionName: 'exactInputSingle',
                args: [{
                    tokenIn: trademode ? dataofcurr.addr as '0xstring' : ticker as '0xstring', 
                    tokenOut: trademode ? ticker as '0xstring' : dataofcurr.addr as '0xstring', 
                    fee: 10000,
                    recipient: account.address as '0xstring',
                    amountIn: parseEther(inputBalance),
                    amountOutMinimum: parseEther(outputBalance) * BigInt(95) / BigInt(100),
                    sqrtPriceLimitX96: BigInt(0)
                }],
            })
        }
        setHeadnoti(true);
        setHash(result);
        setInputBalance('');
        setOutputBalance('0');
    }

    const setSocial = async () => {
        let result = await writeContract(config, {
            ...socialContrct,
            functionName: 'setSocialMedia',
            args: [ticker as '0xstring',socials.fb, socials.x, socials.telegram, socials.website],
        })
    }

React.useEffect(() => {
  if (socialsResult.status === 'success' && !hasSetSocialsRef.current) {
    const rawResult = socialsResult.data?.[0]?.result;

    if (Array.isArray(rawResult)) {
      const [fb, x, telegram, website] = rawResult as string[];

      setSocials({
        fb: fb || "",
        x: x || "",
        telegram: telegram || "",
        website: website || "",
      });

      hasSetSocialsRef.current = true;  
    } else {
      console.warn("Unexpected result format", rawResult);
    }
  }
}, [socialsResult]);

    return (
        <main className="row-start-2 w-full flex flex-col gap-4 items-center xl:items-start mt-[60px] md:mt-1">
            {headnoti && <div className="w-full h-[40px] bg-sky-500 animate-pulse text-center p-2 flex flex-row gap-2 items-center justify-center">
                <span>Trade Successful!, </span>
                <Link href={_explorer + "tx/" + hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="underline">your txn hash</Link>
                <button className="bg-red-600 px-2 rounded-lg" onClick={() => setHeadnoti(false)}>Close</button>
            </div>}
            <div className="md:hidden w-full xl:w-1/3 self-center bg-neutral-900 p-2 rounded-2xl flex flex-row justify-around border-solid border-2 border-emerald-300" style={{zIndex: 1}}>
                <span className={tabmode === false ? "text-black font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline hover:font-bold p-2 w-1/2 text-center"} style={{backgroundImage: tabmode === false ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3% )' : 'none'}} onClick={() => {setTabmode(false)}}>Info</span>
                <span className={tabmode === true ? "text-black font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline hover:font-bold p-2 w-1/2 text-center"} style={{backgroundImage: tabmode === true ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3% )' : 'none'}} onClick={() => {setTabmode(true)}}>Trade</span>
            </div>
            <div className="ml-[28px] w-full xl:w-2/3 flex flex-col gap-4 mb-2">
                <Link href={"/pump/launchpad?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline hover:font-bold">Back to launchpad</Link>
                <div className="hidden md:block w-full flex flex-col md:flex-row flex-wrap justify-between text-xs xl:text-md">
                    <div className="flex flex-row flex-wrap gap-2">
                        <span className="text-emerald-300">{result2.status === 'success' && result2.data![0].result}</span>
                        <span>{result2.status === 'success' && '[$' + result2.data![1].result + ']'}</span>
                        <span className="flex flex-row gap-2">
                            <span>CA: {ticker.slice(0, 5)}...{ticker.slice(37)}</span>
                            <div className="flex items-center gap-1 ml-2">
                                <button
                                    onClick={() => copyToClipboard(ticker)}
                                    className="flex items-center gap-2 bg-water-300 hover:bg-neutral-700 px-3 py-2 -mt-2 rounded-md transition-colors text-xs cursor-pointer"
                                    title="Copy contract address"
                                >
                                    {copiedAddress === ticker ? 
                                        <>
                                            <Check size={16} />
                                            Copied!
                                        </> :
                                        <Copy size={16} />
                                    }
                                </button>
                                <button 
                                    className="flex items-center gap-1 bg-water-300 hover:bg-neutral-700 px-2 py-2 -mt-2 rounded-md transition-colors text-sm cursor-pointer"
                                    onClick={async () => {
                                        await ethereum.request({
                                            method: 'wallet_watchAsset',
                                            params: {
                                                type: 'ERC20',
                                                options: {
                                                    address: ticker,
                                                    symbol: result2.status === 'success' && result2.data![1].result,
                                                    decimals: 18,
                                                    image: result2.status === 'success' && result2.data![3].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!.slice(7) : "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!                                             
                                                },
                                            },
                                        })
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                                <Link 
                                    href={_explorer + "address/" + ticker} rel="noopener noreferrer" target="_blank" prefetch={false}
                                    className="flex items-center gap-1 bg-water-300 hover:bg-neutral-700 px-2 py-2 -mt-2 rounded-md transition-colors text-sm"
                                    title="View on Etherscan"
                                >
                                    <Image src="/bs.png" alt="blockscout" height={16} width={16} />
                                </Link>
                            </div>
                        </span>
                    </div>
                    <span className="mr-6">Price: <span className="text-emerald-300">{
                        result3.status === 'success' ? 
                            result3.data![1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ?
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((Number(state[3].result![0]) / (2 ** 96)) ** 2) :
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)))
                            :
                            'Fetching...'
                    }</span> {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}</span>
                    <span className="mr-6">Market Cap: <span className="text-emerald-300">{
                        result3.status === 'success' ?
                            result3.data![1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ?
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((Number(state[3].result![0]) / (2 ** 96)) ** 2 * 1000000000) :
                                Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)) * 1000000000)
                            :
                            'Fetching...'
                    }</span> {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}</span>
                    {result2.status === 'success' &&
                        <span className="mr-6">
                            Creator: <Link href={_explorer + "address/" + result2.data![5].result + (chain === 'kub' ? "/?tab=tokens" : "") + (chain === 'monad' ? "#tokens" : "")} rel="noopener noreferrer" target="_blank" prefetch={false} className="text-right w-[30px] xl:w-[200px]">{result2.data![5].result.slice(0, 5)}...{result2.data![5].result.slice(37)}</Link> ····· {
                                Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) < 60 && rtf.format(Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0)), 'second')
                            }
                            {
                                Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) >= 60 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) < 3600 && rtf.format(Number(Number((Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 60).toFixed(0)), 'minute')
                            }
                            {
                                Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) >= 3600 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) < 86400 && rtf.format(Number(Number((Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 3600).toFixed(0)), 'hour')
                            }
                            {
                                Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) >= 86400 && rtf.format(Number(Number((Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 86400).toFixed(0)), 'day')
                            }
                        </span>
                    }
                </div>
            </div>
            <div className="w-full flex flex-row flex-wrap gap-12 items-center xl:items-start justify-around">
                {!tabmode ?
                    <div className="block md:hidden w-full xl:w-2/3 h-[1500px] flex flex-col gap-4 items-center xl:items-start" style={{zIndex: 1}}>
                        <div className="w-full flex flex-col md:flex-row flex-wrap justify-between text-xs xl:text-md">
                            <div className="flex flex-row flex-wrap gap-2">
                                <span className="text-emerald-300">{result2.status === 'success' && result2.data![0].result}</span>
                                <span>{result2.status === 'success' && '[$' + result2.data![1].result + ']'}</span>
                                <span className="flex flex-row gap-2">
                                    <span>CA: {ticker.slice(0, 5)}...{ticker.slice(37)}</span>
                                    <div className="flex items-center gap-1 ml-2">
                                        <button
                                            onClick={() => copyToClipboard(ticker)}
                                            className="flex items-center gap-2 bg-water-300 hover:bg-neutral-700 px-3 py-2 -mt-2 rounded-md transition-colors text-xs cursor-pointer"
                                            title="Copy contract address"
                                        >
                                            {copiedAddress === ticker ? 
                                                <>
                                                    <Check size={16} />
                                                    Copied!
                                                </> :
                                                <Copy size={16} />
                                            }
                                        </button>
                                        <button 
                                            className="flex items-center gap-1 bg-water-300 hover:bg-neutral-700 px-2 py-2 -mt-2 rounded-md transition-colors text-sm cursor-pointer"
                                            onClick={async () => {
                                                await ethereum.request({
                                                    method: 'wallet_watchAsset',
                                                    params: {
                                                        type: 'ERC20',
                                                        options: {
                                                            address: ticker,
                                                            symbol: result2.status === 'success' && result2.data![1].result,
                                                            decimals: 18,
                                                            image: result2.status === 'success' && result2.data![3].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!.slice(7) : "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!                                             
                                                        },
                                                    },
                                                })
                                            }}
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <Link 
                                            href={_explorer + "address/" + ticker} rel="noopener noreferrer" target="_blank" prefetch={false}
                                            className="flex items-center gap-1 bg-water-300 hover:bg-neutral-700 px-2 py-2 -mt-2 rounded-md transition-colors text-sm"
                                            title="View on Etherscan"
                                        >
                                            <Image src="/bs.png" alt="blockscout" height={16} width={16} />
                                        </Link>
                                    </div>
                                </span>
                            </div>
                            <span>Price: <span className="text-emerald-300">{
                                result3.status === 'success' ? 
                                    result3.data![1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ?
                                        Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((Number(state[3].result![0]) / (2 ** 96)) ** 2) :
                                        Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)))
                                    :
                                    'Fetching...'
                            }</span> {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}</span>
                            <span>Market Cap: <span className="text-emerald-300">{
                                result3.status === 'success' ?
                                    result3.data![1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ?
                                        Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((Number(state[3].result![0]) / (2 ** 96)) ** 2 * 1000000000) :
                                        Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)) * 1000000000)
                                    :
                                    'Fetching...'
                            }</span> {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}</span>
                            {result2.status === 'success' &&
                                <span>
                                    Creator: <Link href={_explorer + "address/" + result2.data![5].result + (chain === 'kub' ? "/?tab=tokens" : "") + (chain === 'monad' ? "#tokens" : "")} rel="noopener noreferrer" target="_blank" prefetch={false} className="text-right w-[30px] xl:w-[200px]">{result2.data![5].result.slice(0, 5)}...{result2.data![5].result.slice(37)}</Link> ····· {
                                        Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) < 60 && rtf.format(Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0)), 'second')
                                    }
                                    {
                                        Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) >= 60 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) < 3600 && rtf.format(Number(Number((Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 60).toFixed(0)), 'minute')
                                    }
                                    {
                                        Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) >= 3600 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) < 86400 && rtf.format(Number(Number((Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 3600).toFixed(0)), 'hour')
                                    }
                                    {
                                        Number(Number(Date.now() / 1000).toFixed(0)) - Number(result2.data![6].result) >= 86400 && rtf.format(Number(Number((Number(result2.data![6].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 86400).toFixed(0)), 'day')
                                    }
                                </span>
                            }
                        </div>
                        <div className="w-full h-fit xl:h-[300px] flex flex-col gap-6 item-center justify-start">
                            <div className="flex flex-row justify-start mt-5">
                                <div className="flex flex-row items-start gap-2 px-5">
                                    <div className="mr-2">
                                        <Image
                                            src={
                                                result2.status === 'success' 
                                                ? (result2.data![3].result!.startsWith('ipfs://') 
                                                    ? "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!.slice(7)
                                                    : "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!)
                                                : "https://gateway.commudao.xyz/ipfs/"
                                            }
                                            alt="token_waiting_for_approve"
                                            width={120}
                                            height={120}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs break-words">Description: {result2.status === 'success' && result2.data![2].result}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(result2.status === 'success' && state[2].result) ?
                            <>
                                <span className="ml-[20px] text-sm font-bold">🔥 This token has graduated!: {gradHash !== '' && <Link href={_explorer + "tx/" + gradHash} rel="noopener noreferrer" target="_blank" prefetch={false} className="underline text-emerald-300">Txn hash</Link>}</span>
                                <div className="ml-[20px] mr-[20px] h-6 bg-gray-400 rounded-lg overflow-hidden">
                                    <div className="h-6 bg-yellow-500 rounded-lg" style={{width: '100%'}} />
                                </div>
                            </> :
                            <>
                                <div className="ml-[20px] text-sm flex flex-col gap-2 justify-start">
                                    <span>bonding curve progress: {
                                        result3.status === 'success' &&  Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(
                                            result3.data![1].result?.toUpperCase() !== currencyAddr.toUpperCase() ?
                                                ((Number(state[3].result![0]) / (2 ** 96)) ** 2 * 100 / (mode === 'pro' ? 1 : 1)) :
                                                ((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)) * 100) / (mode === 'pro' ? 1 : 1)
                                        )
                                    }%</span>
                                    <div className='has-tooltip'>
                                        <span className='tooltip rounded shadow-lg p-1 bg-neutral-800 -mt-20 text-xs'>{'When the market cap reaches 1,000,000,000 ' + (chain === 'kub' && mode === 'pro' ? 'KUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : '') + (chain === 'monad' && mode === 'pro' ? 'MON' : '') + ', 90% of the liquidity in the factory contract will be burned, while the remaining 10% will be allocated as a platform fee.'}</span>
                                    </div>
                                </div>
                                <div className="w-full mx-14 h-6 bg-gray-400 rounded-lg overflow-hidden">
                                    <div className="h-6 bg-sky-400 rounded-lg" style={{width: 
                                        result3.status === 'success' ?
                                            result3.data![1].result?.toUpperCase() !== currencyAddr.toUpperCase() ? 
                                                ((Number(state[3].result![0]) / (2 ** 96)) ** 2 * 100 / (mode === 'pro' ? 1 : 1)) + '%':
                                                (((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)) * 100) / (mode === 'pro' ? 1 : 1)) + '%'
                                            :
                                            '0%'
                                    }} />
                                </div>
                            </>
                        }
                        <div className="w-full h-[780px] p-8 rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                            <span className="w-full h-[50px] pb-10 text-center text-sm lg:text-lg font-bold">
                                {holder.length} Holders
                            </span>
                            {holder.sort(
                                (a, b) => {return b.value - a.value}
                            ).map((res, index) =>
                                <div className="w-full h-[50px] flex flex-row items-center justify-between text-xs lg:text-md py-2 border-b border-gray-800" key={index}>
                                    <div className="w-3/4 flex flex-row items-center justify-start gap-6 overflow-hidden">
                                        <span>{index + 1}.</span>
                                        <Link href={_explorer + "address/" + res.addr + (chain === 'kub' ? "/?tab=tokens" : "") + (chain === 'monad' ? "#tokens" : "")} rel="noopener noreferrer" target="_blank" prefetch={false} className={"font-bold " + ((res.addr.toUpperCase() === result2.data![5].result.toUpperCase() || res.addr.toUpperCase() === lp.toUpperCase()) ? "text-emerald-300" : "")}>{res.addr.slice(0, 5) + '...' + res.addr.slice(37)} {res.addr.toUpperCase() === result2.data![5].result.toUpperCase() && '[Creator 🧑‍💻]'}{res.addr.toUpperCase() === lp.toUpperCase() && '[Bonding curve]'}</Link>
                                    </div>
                                    <span className="w-1/4 text-right w-[50px] sm:w-[200px]">{res.value.toFixed(4)}%</span>
                                </div>
                            )}
                        </div> 
                    </div> :
                    <div className="block md:hidden w-full xl:w-2/3 h-[1500px] flex flex-col gap-4 items-center xl:items-start" style={{zIndex: 1}}>
                        <div className="w-full h-[300px] border-2 border-l-8 border-emerald-300 border-solid flex flex-col item-center justify-around bg-gray-900" style={{zIndex: 1}}>
                            <div className="w-3/4 bg-gray-800 self-center p-2 mt-3 mb-3 rounded-2xl flex flex-row justify-around">
                                <span className={(trademode ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: trademode ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => {setTrademode(true); setInputBalance(''); setOutputBalance('0');}}>Buy</span>
                                <span className={(!trademode ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: !trademode ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => {setTrademode(false); setInputBalance(''); setOutputBalance('0');}}>Sell</span>
                            </div>
                            <div className="w-full flex flex-row justify-between text-2xl">
                                <input className="appearance-none leading-tight focus:outline-none focus:shadow-outline ml-[20px] w-3/5 font-bold bg-transparent" placeholder="0" value={inputBalance} onChange={(event) => {setInputBalance(event.target.value); qoute(event.target.value);}} type="number" />
                                <span className="mr-[20px] w-2/5 text-right truncate">{trademode ? chain === 'kub' && mode === 'pro' ? 'KUB' : chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : chain === 'monad' && mode === 'pro' ? 'MON' : '' : result2.status === 'success' && '$' + result2.data![1].result}</span>
                            </div>
                            <div className="mr-[20px] self-end text-sm">
                                {mode === 'pro' ?
                                    <>
                                        <span className="text-gray-300">{trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(ethBal))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span>
                                        <span className="underline cursor-pointer hover:font-bold" onClick={() => {setInputBalance(trademode ? String(Number(formatEther(ethBal)) - 0.00001) : String(formatEther(state[1].result as bigint))); qoute(trademode ? String(Number(formatEther(ethBal)) - 0.00001) : String(formatEther(state[1].result as bigint)))}}>Max</span>
                                    </> :
                                    <>
                                        <span className="text-gray-300">{trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[0].result as bigint))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span>
                                        <span className="underline cursor-pointer hover:font-bold" onClick={() => {setInputBalance(trademode ? String(formatEther(state[0].result as bigint)) : String(formatEther(state[1].result as bigint))); qoute(trademode ? String(formatEther(state[0].result as bigint)) : String(formatEther(state[1].result as bigint)))}}>Max</span>
                                    </>
                                }
                            </div>
                            <div className="w-full flex flex-row justify-between text-2xl text-emerald-300 font-bold">
                                <span className="ml-[20px] w-3/5 overflow-hidden">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(outputBalance))}</span>
                                <span className="mr-[20px] w-2/5 text-right truncate">{!trademode ? chain === 'kub' && mode === 'pro' ? 'KUB' : chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : chain === 'monad' && mode === 'pro' ? 'MON' : '' : result2.status === 'success' && '$' + result2.data![1].result}</span>
                            </div>
                            <div className="mr-[20px] self-end text-sm">
                                {mode === 'pro' ?
                                    <span className="text-gray-300">{!trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(ethBal))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span> :
                                    <span className="text-gray-300">{!trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[0].result as bigint))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span>
                                }
                            </div>
                            {connections && account.address !== undefined && account.chainId === _chainId ? 
                                <button className="w-3/4 self-center p-2 my-3 rounded-2xl font-bold bg-emerald-300 text-slate-900 underline hover-effect hover:text-white cursor-pointer" onClick={trade}><span className="self-center">Trade</span></button> :
                                <button className="w-3/4 self-center p-2 my-3 rounded-2xl font-bold bg-gray-500 cursor-not-allowed" disabled><span className="self-center text-slate-900">Trade</span></button>
                            }
                        </div>
                        <iframe height="35%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed" src={"https://www.geckoterminal.com/" + (chain === "kub" ? "bitkub_chain" : chain === "monad" ? "monad-testnet" : '') + "/pools/" + lp + "?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=market_cap&resolution=1m"} allow="clipboard-write"></iframe>
                        <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                            <div className="w-1/5 sm:w-1/3">Timestamp</div>
                            <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-start gap-10">
                                <span className="text-right w-[30px] xl:w-[200px]">From</span>
                                <span className="text-right w-[70px] xl:w-[200px]">Asset</span>
                                <span className="text-right w-[30px] xl:w-[200px]">Amount</span>
                                <span className="text-right w-[30px] xl:w-[200px]">Txn</span>
                            </div>
                        </div>
                        <div className="w-full h-[950px] pr-4 flex flex-col items-center sm:items-start overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500" style={{zIndex: 1}}>
                            {hx.map((res: any, index: any) =>
                                <div className="w-full h-[10px] flex flex-row items-center justify-around text-xs md:text-sm py-6 border-b border-gray-800" key={index}>
                                    <span className="w-1/5 sm:w-1/3 text-gray-500 text-xs">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Bangkok', }).format(new Date(res.timestamp))}</span>
                                    <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10 text-xs sm:text-sm">
                                        <Link href={_explorer + "address/" + res.from + (chain === 'kub' ? "/?tab=tokens" : "") + (chain === 'monad' ? "#tokens" : "")} rel="noopener noreferrer" target="_blank" prefetch={false} className="text-right w-[30px] xl:w-[200px]">{res.from.slice(0, 5) + '...' + res.from.slice(37)}</Link>
                                        <div className="text-right w-[70px] xl:w-[200px] flex flex-row gap-2 items-center justify-end overflow-hidden">
                                            {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                                            {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                                            {res.action === 'launch' && <span className="text-emerald-300 font-bold">🚀 {res.action.toUpperCase()} & BUY</span>}
                                        </div>
                                        <span className="text-right w-[30px] xl:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                                        <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="font-bold text-right w-[30px] xl:w-[200px] underline truncate">{res.hash.slice(0, 5) + '...' + res.hash.slice(61)}</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }       
                
                <div className="hidden md:block w-full xl:w-2/3 h-[1500px] flex flex-col gap-4 items-center xl:items-start" style={{zIndex: 1}}>
                    <iframe height="35%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed" src={"https://www.geckoterminal.com/" + (chain === "kub" ? "bitkub_chain" : chain === "monad" ? "monad-testnet" : '') + "/pools/" + lp + "?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=market_cap&resolution=1m"} allow="clipboard-write"></iframe>
                    <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                        <div className="w-1/5 sm:w-1/3">Timestamp</div>
                        <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-start gap-10">
                            <span className="text-right w-[30px] xl:w-[200px]">From</span>
                            <span className="text-right w-[70px] xl:w-[200px]">Asset</span>
                            <span className="text-right w-[30px] xl:w-[200px]">Amount</span>
                            <span className="text-right w-[30px] xl:w-[200px]">Txn</span>
                        </div>
                    </div>
                    <div className="w-full h-[950px] pr-4 flex flex-col items-center sm:items-start overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500" style={{zIndex: 1}}>
                        {hx.map((res: any, index: any) =>
                            <div className="w-full h-[10px] flex flex-row items-center justify-around text-xs md:text-sm py-6 border-b border-gray-800" key={index}>
                                <span className="w-1/5 sm:w-1/3 text-gray-500 text-xs">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Bangkok', }).format(new Date(res.timestamp))}</span>
                                <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10 text-xs sm:text-sm">
                                    <Link href={_explorer + "address/" + res.from + (chain === 'kub' ? "/?tab=tokens" : "") + (chain === 'monad' ? "#tokens" : "")} rel="noopener noreferrer" target="_blank" prefetch={false} className="text-right w-[30px] xl:w-[200px]">{res.from.slice(0, 5) + '...' + res.from.slice(37)}</Link>
                                    <div className="text-right w-[70px] xl:w-[200px] flex flex-row gap-2 items-center justify-end overflow-hidden">
                                        {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                                        {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                                        {res.action === 'launch' && <span className="text-emerald-300 font-bold">🚀 {res.action.toUpperCase()} & BUY</span>}
                                    </div>
                                    <span className="text-right w-[30px] xl:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                                    <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="font-bold text-right w-[30px] xl:w-[200px] underline truncate">{res.hash.slice(0, 5) + '...' + res.hash.slice(61)}</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden md:block w-full xl:w-1/4 h-fit xl:h-[1500px] flex flex-col gap-8">
                    <div className="w-full h-[300px] border-2 border-l-8 border-emerald-300 border-solid flex flex-col item-center justify-around bg-gray-900" style={{zIndex: 1}}>
                        <div className="w-3/4 bg-gray-800 self-center p-2 mt-3 mb-3 rounded-2xl flex flex-row justify-around">
                            <span className={(trademode ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: trademode ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => {setTrademode(true); setInputBalance(''); setOutputBalance('0');}}>Buy</span>
                            <span className={(!trademode ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: !trademode ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => {setTrademode(false); setInputBalance(''); setOutputBalance('0');}}>Sell</span>
                        </div>
                        <div className="w-full flex flex-row justify-between text-2xl">
                            <input className="appearance-none leading-tight focus:outline-none focus:shadow-outline ml-[20px] w-3/5 font-bold bg-transparent" placeholder="0" value={inputBalance} onChange={(event) => {setInputBalance(event.target.value); qoute(event.target.value);}} type="number" />
                            <span className="mr-[20px] w-2/5 text-right truncate">{trademode ? chain === 'kub' && mode === 'pro' ? 'KUB' : chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : chain === 'monad' && mode === 'pro' ? 'MON' : '' : result2.status === 'success' && '$' + result2.data![1].result}</span>
                        </div>
                        <div className="mr-[20px] self-end text-sm">
                            {mode === 'pro' ?
                                <>
                                    <span className="text-gray-300">{trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(ethBal))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span>
                                    <span className="underline cursor-pointer hover:font-bold" onClick={() => {setInputBalance(trademode ? String(Number(formatEther(ethBal)) - 0.00001) : String(formatEther(state[1].result as bigint))); qoute(trademode ? String(Number(formatEther(ethBal)) - 0.00001) : String(formatEther(state[1].result as bigint)))}}>Max</span>
                                </> :
                                <>
                                    <span className="text-gray-300">{trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[0].result as bigint))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span>
                                    <span className="underline cursor-pointer hover:font-bold" onClick={() => {setInputBalance(trademode ? String(formatEther(state[0].result as bigint)) : String(formatEther(state[1].result as bigint))); qoute(trademode ? String(formatEther(state[0].result as bigint)) : String(formatEther(state[1].result as bigint)))}}>Max</span>
                                </>
                            }
                        </div>
                        <div className="w-full flex flex-row justify-between text-2xl text-emerald-300 font-bold">
                            <span className="ml-[20px] w-3/5 overflow-hidden">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(outputBalance))}</span>
                            <span className="mr-[20px] w-2/5 text-right truncate">{!trademode ? chain === 'kub' && mode === 'pro' ? 'KUB' : chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : chain === 'monad' && mode === 'pro' ? 'MON' : '' : result2.status === 'success' && '$' + result2.data![1].result}</span>
                        </div>
                        <div className="mr-[20px] self-end text-sm">
                            {mode === 'pro' ?
                                <span className="text-gray-300">{!trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(ethBal))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span> :
                                <span className="text-gray-300">{!trademode ? Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[0].result as bigint))) + ' ' : Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(Number(formatEther(state[1].result as bigint))) + ' '}</span>
                            }
                        </div>
                        {connections && account.address !== undefined && account.chainId === _chainId ? 
                            <button className="w-3/4 self-center p-2 my-3 rounded-2xl font-bold bg-emerald-300 text-slate-900 underline hover-effect hover:text-white cursor-pointer" onClick={trade}><span className="self-center">Trade</span></button> :
                            <button className="w-3/4 self-center p-2 my-3 rounded-2xl font-bold bg-gray-500 cursor-not-allowed" disabled><span className="self-center text-slate-900">Trade</span></button>
                        }
                    </div>

                    {/* Socials Section */}
                    {result2.status === 'success' && result2.data![5].result === account.address && (
                    <div>
                    <div className="flex flex-col gap-3 mb-4">
                    {socialItems.map(({ icon, field }) => {
                        const url = socials[field];
                        if (!url || url.trim() === "") return null;

                        return (
                        <a
                            key={field}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-transparent border border-green-700 rounded-lg shadow-md hover:bg-green-900 hover:bg-opacity-50 transition-colors duration-200"
                        >
                            <div className="text-xl text-green-400">{icon}</div>
                            <span className="text-sm text-green-300 truncate max-w-xs break-all">{url}</span>
                        </a>
                        );
                    })}
                    </div>


                        {/* ปุ่มเพิ่ม Socials */}
                        <div>
                        <button
                            className="w-full p-2 rounded-2xl font-bold bg-gray-800 text-slate-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                            onClick={() => setShowSocials(!showSocials)}
                        >
                            <span className="self-center">Add Socials</span>
                        </button>
                        </div>
                    </div>
                    )}

                    <div className="w-full h-fit flex flex-col gap-6 item-center justify-start">
                        <div className="flex flex-row justify-start mt-5">
                            <div className="flex flex-row items-start gap-2 px-5">
                                <div className="mr-2">
                                    <Image
                                        src={
                                            result2.status === 'success' 
                                            ? (result2.data![3].result!.startsWith('ipfs://') 
                                                ? "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!.slice(7)
                                                : "https://gateway.commudao.xyz/ipfs/" + result2.data![3].result!)
                                            : "https://gateway.commudao.xyz/ipfs/"
                                        }
                                        alt="token_waiting_for_approve"
                                        width={120}
                                        height={120}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 h-[300px] overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                                    <span className="text-xs break-words">Description: {result2.status === 'success' && result2.data![2].result}</span>
                                </div>
                            </div>
                        </div>
                        {(result2.status === 'success' && state[2].result) ?
                            <>
                                <span className="ml-[20px] text-sm font-bold">🔥 This token has graduated!: {gradHash !== '' && <Link href={_explorer + "tx/" + gradHash} rel="noopener noreferrer" target="_blank" prefetch={false} className="underline text-emerald-300">Txn hash</Link>}</span>
                                <div className="ml-[20px] mr-[20px] h-6 bg-gray-400 rounded-lg overflow-hidden">
                                    <div className="h-6 bg-yellow-500 rounded-lg" style={{width: '100%'}} />
                                </div>
                            </> :
                            <>
                                <div className="ml-[20px] text-sm flex flex-col gap-2 justify-start">
                                    <span>bonding curve progress: {
                                        result3.status === 'success' &&  Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(
                                            result3.data![1].result?.toUpperCase() !== currencyAddr.toUpperCase() ?
                                                (((Number(state[3].result![0]) / (2 ** 96)) ** 2 * 100) / ((chain === 'kub' && mode === 'pro' ? 0.000002  : 1) * (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 0.0001 : 1) * (chain === 'monad' && mode === 'pro' ? 1 : 1))) :
                                                ((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)) * 100) / ((chain === 'kub' && mode === 'pro' ? 0.000002  : 1) * (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 0.0001 : 1) * (chain === 'monad' && mode === 'pro' ? 1 : 1))
                                        )
                                    }%</span>
                                    <div className='has-tooltip'>
                                        <span className='tooltip rounded shadow-lg p-1 bg-neutral-800 -mt-20 text-xs'>{'When the market cap reaches ' + (chain === 'kub' && mode === 'pro' ? '2,000 KUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? '100,000 CMM' : '') + (chain === 'monad' && mode === 'pro' ? '1 MON' : '') + ', 90% of the liquidity in the factory contract will be burned, while the remaining 10% will be allocated as a platform fee.'}</span>
                                    </div>
                                </div>
                                <div className="ml-[20px] mr-[20px] h-6 bg-gray-400 rounded-lg overflow-hidden">
                                    <div className="h-6 bg-sky-400 rounded-lg" style={{width: 
                                        result3.status === 'success' ?
                                            result3.data![1].result?.toUpperCase() !== currencyAddr.toUpperCase() ? 
                                                (((Number(state[3].result![0]) / (2 ** 96)) ** 2 * 100) / ((chain === 'kub' && mode === 'pro' ? 0.000002  : 1) * (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 0.0001 : 1) * (chain === 'monad' && mode === 'pro' ? 1 : 1))) + '%':
                                                (((1 / ((Number(state[3].result![0]) / (2 ** 96)) ** 2)) * 100) / ((chain === 'kub' && mode === 'pro' ? 0.000002  : 1) * (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 0.0001 : 1) * (chain === 'monad' && mode === 'pro' ? 1 : 1))) + '%'
                                            :
                                            '0%'
                                    }} />
                                </div>
                            </>
                        }
                    </div>
                    <div className="w-full h-[780px] p-8 rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-500">
                        <span className="w-full h-[50px] pb-10 text-center text-sm lg:text-lg font-bold">
                            {holder.length} Holders
                        </span>
                        {holder.sort(
                            (a, b) => {return b.value - a.value}
                        ).map((res, index) =>
                            <div className="w-full h-[50px] flex flex-row items-center justify-between text-xs lg:text-md py-2 border-b border-gray-800" key={index}>
                                <div className="w-3/4 flex flex-row items-center justify-start gap-6 overflow-hidden">
                                    <span>{index + 1}.</span>
                                    <Link href={_explorer + "address/" + res.addr + (chain === 'kub' ? "/?tab=tokens" : "") + (chain === 'monad' ? "#tokens" : "")} rel="noopener noreferrer" target="_blank" prefetch={false} className={"font-bold " + ((res.addr.toUpperCase() === result2.data![5].result.toUpperCase() || res.addr.toUpperCase() === lp.toUpperCase()) ? "text-emerald-300" : "")}>{res.addr.slice(0, 5) + '...' + res.addr.slice(37)} {res.addr.toUpperCase() === result2.data![5].result.toUpperCase() && '[Creator 🧑‍💻]'}{res.addr.toUpperCase() === lp.toUpperCase() && '[Bonding curve]'}</Link>
                                </div>
                                <span className="w-1/4 text-right w-[50px] sm:w-[200px]">{res.value.toFixed(4)}%</span>
                            </div>
                        )}
                    </div>

                    {/* Social Modal */}
                    {showSocials && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
                            <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowSocials(false)}
                            >
                            ✕
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Add Your Socials</h2>

                            <div className="space-y-4 bg-white rounded-2xl p-6 shadow-md border border-gray-300 text-black">
                            {[
                                { icon: <FaFacebookF className="text-blue-600" />, field: "fb", placeholder: "Facebook URL" },
                                { icon: <FaTwitter className="text-blue-400" />, field: "x", placeholder: "X (Twitter) URL" },
                                { icon: <FaTelegramPlane className="text-blue-500" />, field: "telegram", placeholder: "Telegram URL" },
                                { icon: <FaGlobe className="text-green-500" />, field: "website", placeholder: "Website URL" },
                            ].map(({ icon, field, placeholder }) => (
                                <div key={field}>
                                <div className="flex items-center gap-3">
                                    {icon}
                                    <input
                                    type="text"
                                    placeholder={placeholder}
                                    value={socials[field as keyof typeof socials]}
                                    onChange={handleChange(field as keyof typeof socials)}
                                    className={`flex-1 border ${
                                        errors[field as keyof typeof errors] ? "border-red-500" : "border-gray-300"
                                    } rounded-lg p-2 focus:outline-none focus:ring-2 ${
                                        errors[field as keyof typeof errors] ? "focus:ring-red-500" : "focus:ring-blue-400"
                                    }`}
                                    />
                                </div>
                                {errors[field as keyof typeof errors] && (
                                    <p className="text-sm text-red-500 mt-1 ml-7">Must start with http:// or https://</p>
                                )}
                                </div>
                            ))}

                            <button
                                onClick={handleSave}
                                className="w-full mt-4 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                Save Socials
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
