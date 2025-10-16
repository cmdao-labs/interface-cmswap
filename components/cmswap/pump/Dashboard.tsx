"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readContracts } from "@wagmi/core";
import { createPublicClient, erc20Abi, formatEther, formatUnits, http } from "viem";
import { bitkubTestnet } from "viem/chains";
import { Plus } from "lucide-react";
import { config } from "@/config/reown";
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";
const { ethereum } = window as any;

export default function Dashboard({
    addr, mode, chain, token,
}: {
    addr: string;
    mode: string;
    chain: string;
    token: string;
}) {
    let _chainId = 0;
    let chainConfig: any = null;
    let _rpc = "";
    if (chain === "kubtestnet" || chain === "") {
        _chainId = 25925;
        chainConfig = bitkubTestnet;
        _rpc = "https://rpc-testnet.bitkubchain.io";
    } // add chain here
    let currencyAddr: string = '';
    let factoryAddr: string = '';
    let _blockcreated: number = 1;
    if ((chain === 'kubtestnet' || chain === '') && (mode === 'pro' || mode === '') && (token === 'cmm' || token === '')) {
        currencyAddr = '0x700D3ba307E1256e509eD3E45D6f9dff441d6907';
        factoryAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
        _blockcreated = 23935659;
    } // add chain and mode here

    const [resultfinal, setResultfinal] = useState<any[]>([]);
    const [allvalue, setAllvalue] = useState<number>(0);

    useEffect(() => {
        let cancelled = false;
        const fetch0 = async () => {
            if (!factoryAddr || !_chainId) {
                if (!cancelled) {
                    setResultfinal([]);
                    setAllvalue(0);
                }
                return;
            }
            if (chain === "kubtestnet" && mode === "pro") {
                try {
                    const coreAddress = factoryAddr as "0xstring";
                    const rpcUrl = _rpc || bitkubTestnet.rpcUrls.default?.http?.[0] || "";
                    if (!coreAddress || !rpcUrl) {
                        if (!cancelled) {
                            setResultfinal([]);
                            setAllvalue(0);
                        }
                        return;
                    }

                    const publicClient = createPublicClient({ chain: chainConfig, transport: http(rpcUrl) });
                    const creationLogs = await publicClient.getContractEvents({
                        address: coreAddress,
                        abi: ERC20FactoryV2ABI,
                        eventName: "Creation",
                        fromBlock: BigInt(_blockcreated),
                        toBlock: "latest",
                    });

                    const virtualResponse = await readContracts(config, {
                        contracts: [
                            {
                                address: coreAddress,
                                abi: ERC20FactoryV2ABI,
                                functionName: "virtualAmount",
                                chainId: _chainId,
                            },
                        ],
                    });
                    const virtualEntry = virtualResponse?.[0];
                    const virtualAmount = virtualEntry?.status === "success" ? (virtualEntry.result as bigint) : BigInt(0);

                    const entries = await Promise.all(
                        creationLogs.map(async (evt: any) => {
                            const tokenAddress = evt?.args?.tokenAddr as `0x${string}` | undefined;
                            if (!tokenAddress) return null;
                            const metadata = await readContracts(config, {
                                contracts: [
                                    {
                                        address: tokenAddress,
                                        abi: erc20Abi,
                                        functionName: "symbol",
                                        chainId: _chainId,
                                    },
                                    {
                                        address: tokenAddress,
                                        abi: erc20Abi,
                                        functionName: "decimals",
                                        chainId: _chainId,
                                    },
                                    {
                                        address: tokenAddress,
                                        abi: erc20Abi,
                                        functionName: "balanceOf",
                                        args: [addr as "0xstring"],
                                        chainId: _chainId,
                                    },
                                    {
                                        address: coreAddress,
                                        abi: ERC20FactoryV2ABI,
                                        functionName: "pumpReserve",
                                        args: [tokenAddress],
                                        chainId: _chainId,
                                    },
                                ],
                            });

                            const [symbolRes, decimalsRes, balanceRes, reserveRes] = metadata;
                            const symbol = symbolRes?.status === "success" && typeof symbolRes.result === "string" ? symbolRes.result : tokenAddress.slice(2, 8).toUpperCase();
                            const decimals = decimalsRes?.status === "success" && decimalsRes.result !== undefined ? Number(decimalsRes.result) : 18;
                            const balanceRaw = balanceRes?.status === "success" && typeof balanceRes.result === "bigint" ? (balanceRes.result as bigint) : BigInt(0);
                            const reserveTuple = reserveRes?.status === "success" && Array.isArray(reserveRes.result) ? (reserveRes.result as readonly bigint[]) : undefined;
                            const nativeReserve = reserveTuple?.[0] ?? BigInt(0);
                            const tokenReserve = reserveTuple?.[1] ?? BigInt(0);
                            const balance = Number(formatUnits(balanceRaw, decimals));
                            const numerator = Number(formatEther(nativeReserve + virtualAmount));
                            const tokenReserveNormalized = tokenReserve === BigInt(0) ? 0 : Number(formatUnits(tokenReserve, decimals));
                            const price = tokenReserve === BigInt(0) || tokenReserveNormalized === 0 ? 0 : numerator / tokenReserveNormalized;
                            const logo = (evt?.args?.logo as string) ?? (evt?.args?.link1 as string) ?? "";

                            return [
                                { result: symbol },
                                { result: logo },
                                { result: Number.isFinite(balance) ? balance : 0 },
                                { result: Number.isFinite(price) ? price : 0 },
                                { result: tokenAddress },
                            ];
                        }),
                    );

                    const compactEntries = entries.filter((entry): entry is any[] => Array.isArray(entry));
                    const aggregatedValue = compactEntries.reduce((acc, entry) => {
                        const bal = Number(entry?.[2]?.result ?? 0);
                        const price = Number(entry?.[3]?.result ?? 0);
                        return acc + bal * price;
                    }, 0);

                    if (!cancelled) {
                        setResultfinal(compactEntries);
                        setAllvalue(Number.isFinite(aggregatedValue) ? aggregatedValue : 0);
                    }
                    return;
                } catch (error) {
                    if (!cancelled) {
                        setResultfinal([]);
                        setAllvalue(0);
                    }
                    return;
                }
            }
        };

        fetch0();
        return () => {
            cancelled = true;
        };
    }, [addr, chain, mode, token, _chainId, factoryAddr, currencyAddr, _blockcreated, _rpc]);

    return (
        <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start gap-4 sm:gap-0">
            <div className="w-full h-[50px] py-6 flex flex-row items-center justify-between sm:gap-2 text-lg lg:text-3xl">
                <div className="flex flex-row gap-2 items-center">
                    <span>{addr.slice(0, 5) + '...' + addr.slice(37)}</span>
                </div>
                <span className="font-bold">{(chain === 'kub' && mode === 'pro' ? 'KUB' : '') + (chain === 'kubtestnet' && mode === 'pro' ? 'tKUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : '') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(allvalue)}</span>
            </div>
            <div className="hidden sm:flex w-full h-[50px] flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                <div className="w-1/2">
                    <span>Asset</span>
                </div>
                <div className="w-3/5 flex flex-row items-center justify-end sm:gap-10">
                    <span className="text-right w-[50px] sm:w-[200px]">Balance</span>
                    <span className="text-right w-[100px] sm:w-[200px]">Price</span>
                    <span className="text-right w-[100px] sm:w-[200px]">Value</span>
                </div>
            </div>
            {resultfinal.filter(
                (res: any) => {return res[2].result !== 0}
            ).sort(
                (a: any, b: any) => {return b[3].result - a[3].result}
            ).map((res: any, index: any) =>
                <article
                    className="w-full border-t border-gray-800 px-4 py-5 text-sm shadow-sm sm:flex sm:h-[50px] sm:items-center sm:justify-between sm:rounded-none sm:border-t sm:border-gray-800 sm:bg-transparent sm:px-0 sm:py-10"
                    key={index}
                >
                    <div className="flex items-center justify-start gap-4 overflow-hidden sm:w-1/2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full sm:h-[40px] sm:w-[40px]">
                            <Image src={res[1].result!.slice(0, 7) === 'ipfs://' ? "https://cmswap.mypinata.cloud/ipfs/" + res[1].result!.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res[1].result!} alt="token_waiting_for_approve" fill />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                            <Link
                                href={`/pump/launchpad/token?chain=${chain}&mode=${mode}${token ? `&token=${token}` : ''}&ticker=${res[4].result}${res[5]?.result ? `&lp=${res[5].result}` : ''}`}
                                prefetch={false}
                                className="font-semibold text-base sm:text-lg truncate underline decoration-dotted underline-offset-4"
                            >
                                {(res[0].result).length >= 7 ? (res[0].result).slice(0, 6) + '...' : res[0].result}
                            </Link>
                            <button
                                className="mt-2 inline-flex items-center gap-1 self-start rounded-md bg-water-300 px-2 py-2 text-sm font-medium transition-colors hover:bg-neutral-700 sm:mt-0"
                                onClick={async () => {
                                    await ethereum.request({
                                        method: 'wallet_watchAsset',
                                        params: {
                                            type: 'ERC20',
                                            options: {
                                                address: res[4].result,
                                                symbol: (res[0].result).length >= 7 ? (res[0].result).slice(0, 6) : res[0].result,
                                                decimals: 18,
                                                image: res[1].result!.slice(0, 7) === 'ipfs://' ? "https://cmswap.mypinata.cloud/ipfs/" + res[1].result!.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res[1].result!
                                            },
                                        },
                                    })
                                }}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-6 sm:hidden">
                        <span className="text-[11px] uppercase tracking-wide text-gray-500">Balance</span>
                        <span className="text-right text-sm font-medium">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result)}</span>
                        <span className="text-[11px] uppercase tracking-wide text-gray-500">Price</span>
                        <span className="text-right text-sm font-medium">
                            {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[3].result)} {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kubtestnet' && mode === 'pro' && 'tKUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}
                        </span>
                        <span className="text-[11px] uppercase tracking-wide text-gray-500">Value</span>
                        <span className="text-right text-sm font-semibold">
                            {(chain === 'kub' && mode === 'pro' ? 'KUB' : '') + (chain === 'kubtestnet' && mode === 'pro' ? 'tKUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : '') + (chain === 'monad' && mode === 'pro' ? 'MON' : '') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result * res[3].result)}
                        </span>
                    </div>
                    <div className="hidden w-3/5 flex-row items-center justify-end sm:flex sm:gap-10">
                        <span className="text-right w-[50px] sm:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result)}</span>
                        <span className={"text-right w-[100px] sm:w-[200px] " + (mode === 'pro' ? 'text-xs' : '')}>
                            {Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[3].result)} {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kubtestnet' && mode === 'pro' && 'tKUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}
                        </span>
                        <span className="font-bold text-right w-[100px] sm:w-[200px]">
                            {(chain === 'kub' && mode === 'pro' ? 'KUB' : '') + (chain === 'kubtestnet' && mode === 'pro' ? 'tKUB' : '') + (chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') ? 'CMM' : '') + (chain === 'monad' && mode === 'pro' ? 'MON' : '') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result * res[3].result)}
                        </span>
                    </div>
                </article>
            )}
        </main>
    );
}
