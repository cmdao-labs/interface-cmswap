import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'
import { bitkubTestnet } from 'viem/chains';
import { config } from '@/config/reown';
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";

export default async function Activity({
    addr, mode, chain, token,
}: {
    addr: string;
    mode: string;
    chain: string;
    token: string;
}) {
    await connection();
    let _chain: any = null;
    let _chainId = 0;
    let _explorer = '';
    let _rpc = '';
    if (chain === 'kubtestnet' || chain === '') {
        _chain = bitkubTestnet;
        _chainId = 25925;
        _explorer = 'https://testnet.kubscan.com/';
        _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
    }
    const publicClient = createPublicClient({ chain: _chain, transport: http(_rpc) });
    let factoryAddr: string = '';
    let _blockcreated: number = 1;
    if ((chain === 'kubtestnet' || chain === '') && (mode === 'pro' || mode === '') && (token === '')) {
        factoryAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
        _blockcreated = 23935659;
    }

    let fulldatabuy: any[] = [];
    let fulldatasell: any[] = [];
    let launchEvents: any[] = [];
    if (chain === 'kubtestnet' && mode === 'pro') {
        const coreAddress = factoryAddr as '0xstring';
        const rpcUrl = _rpc || bitkubTestnet.rpcUrls.default?.http?.[0] || '';
        const client = rpcUrl ? createPublicClient({chain: _chain, transport: http(rpcUrl)}) : publicClient;

        const creationLogs = await client.getContractEvents({
            address: coreAddress,
            abi: ERC20FactoryV2ABI,
            eventName: 'Creation',
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        const _getticker = creationLogs.map(async (log: any) => {
            return await readContracts(config, {
                contracts: [
                    { address: log.args.tokenAddr, abi: erc20Abi, functionName: 'symbol', chainId: _chainId },
                ],
            });
        });
        const getticker: any = await Promise.all(_getticker);

        const tokenslist = creationLogs.map((log: any, index: number) => {
            const symbolEntry = getticker[index]?.[0];
            const symbol = symbolEntry?.status === 'success' && typeof symbolEntry.result === 'string' ? symbolEntry.result : log.args.tokenAddr.slice(2, 8).toUpperCase();
            return {
                addr: log.args.tokenAddr,
                ticker: symbol,
                logo: log.args.logo,
                creator: log.args.creator,
                blockNumber: log.blockNumber,
                transactionHash: log.transactionHash,
            };
        });
        const tokenMap = new Map(tokenslist.map((token: any) => [token.addr.toUpperCase(), token]));
        const normalizedAddr = addr?.toUpperCase?.() ?? '';

        launchEvents = tokenslist
            .filter((token) => (token.creator as string)?.toUpperCase() === normalizedAddr && token.transactionHash)
            .map((token) => ({
                action: 'launch',
                value: 0,
                hash: token.transactionHash,
                block: token.blockNumber,
                ticker: token.ticker,
                logo: token.logo,
                tickerAddr: token.addr,
            }));

        const sellLogs = await client.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: {
                from: addr as '0xstring',
                to: coreAddress,
            },
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        fulldatasell = sellLogs
            .filter((log: any) => tokenMap.has(log.address.toUpperCase()))
            .filter(
                (log: any) =>
                    (log.args?.from as string)?.toUpperCase() !==
                    '0x0000000000000000000000000000000000000000'.toUpperCase(),
            )
            .map((log: any) => {
                const token = tokenMap.get(log.address.toUpperCase());
                const valueBig = log.args.value as bigint;
                return {
                    action: 'sell',
                    value: Number(formatEther(valueBig)),
                    hash: log.transactionHash,
                    block: log.blockNumber,
                    ticker: token?.ticker ?? log.address,
                    logo: token?.logo ?? '',
                    tickerAddr: log.address,
                };
            });

        const buyLogs = await client.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: {
                from: coreAddress,
                to: addr as '0xstring',
            },
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        fulldatabuy = buyLogs
            .filter((log: any) => tokenMap.has(log.address.toUpperCase()))
            .filter(
                (log: any) =>
                    (log.args?.to as string)?.toUpperCase() !==
                    '0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase(),
            )
            .map((log: any) => {
                const token = tokenMap.get(log.address.toUpperCase());
                const valueBig = log.args.value as bigint;
                return {
                    action: 'buy',
                    value: Number(formatEther(valueBig)),
                    hash: log.transactionHash,
                    block: log.blockNumber,
                    ticker: token?.ticker ?? log.address,
                    logo: token?.logo ?? '',
                    tickerAddr: log.address,
                };
            });
    }
    const mergedata = fulldatasell.concat(fulldatabuy, launchEvents);
    const _timestamparr = mergedata.map(async (res) => {return await publicClient.getBlock({ blockNumber: res.block })});
    const timestamparr = await Promise.all(_timestamparr);
    const restimestamp = timestamparr.map((res) => {return Number(res.timestamp) * 1000;})
    const theresult = mergedata.map((res, index) => {
        return {
            action: res.action,
            value: res.value,
            hash: res.hash,
            timestamp: restimestamp[index],
            ticker: res.ticker,
            logo: res.logo,
            tickerAddr: res.tickerAddr ?? '',
        }
    }).sort((a: any, b: any) => {return b.timestamp - a.timestamp});

    return (
        <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start gap-4 sm:gap-0" style={{ zIndex: 1 }}>
            <div className="w-full h-[50px] flex items-center py-6 flex text-lg lg:text-3xl">
                <span>{addr.slice(0, 5) + '...' + addr.slice(37)}</span>
            </div>
            <div className="hidden sm:flex w-full h-[50px] flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                <div className="w-1/5 sm:w-1/3">Timestamp</div>
                <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10">
                    <span className="text-right w-[100px] sm:w-[200px]">Asset</span>
                    <span className="text-right w-[50px] sm:w-[200px]">Amount</span>
                    <span className="text-right w-[50px] sm:w-[200px]">Txn</span>
                </div>
            </div>
            {theresult.map((res: any, index: any) => {
                const dateLabel = new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "Asia/Bangkok",
                }).format(new Date(res.timestamp));

                return (
                    <article
                        className="w-full border-t border-gray-800 px-4 py-5 text-sm shadow-sm sm:flex sm:h-[50px] sm:items-center sm:justify-between sm:rounded-none sm:border-t sm:border-gray-800 sm:bg-transparent sm:px-0 sm:py-10"
                        key={index}
                    >
                        <div className="flex flex-col gap-1 text-gray-300 sm:w-1/3 sm:flex-row sm:items-center sm:gap-0">
                            <span className="text-[11px] uppercase tracking-wide text-gray-500 sm:hidden">Timestamp</span>
                            <span className="sm:text-xs">{dateLabel}</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-4 text-sm sm:mt-0 sm:w-3/4 sm:flex-row sm:items-center sm:justify-end sm:gap-10">
                            <div className="flex items-center justify-between gap-3 sm:w-[600px] sm:justify-end sm:gap-2">
                                <div className="flex items-center gap-3 sm:hidden">
                                    {res.action === "buy" && <span className="text-green-500 font-semibold uppercase">Buy</span>}
                                    {res.action === "sell" && <span className="text-red-500 font-semibold uppercase">Sell</span>}
                                    {res.action === "launch" && <span className="text-emerald-300 font-semibold">🚀 Launch & Buy</span>}
                                </div>
                                <div className="hidden sm:flex sm:items-center sm:gap-2">
                                    {res.action === "buy" && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                                    {res.action === "sell" && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                                    {res.action === "launch" && <span className="text-emerald-300 font-bold">🚀 {res.action.toUpperCase()} & BUY</span>}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative h-6 w-6 overflow-hidden rounded-full sm:h-[30px] sm:w-[30px]">
                                        <Image src={res.logo.slice(0, 7) === "ipfs://" ? "https://cmswap.mypinata.cloud/ipfs/" + res.logo.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res.logo} alt="" fill />
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end">
                                        <span className="text-[11px] uppercase tracking-wide text-gray-500 sm:hidden text-left w-full">Asset</span>
                                        <Link
                                            href={`/pump/launchpad/token?chain=${chain}&mode=${mode}${token ? `&token=${token}` : ""}&ticker=${res.tickerAddr}${res.lpAddr ? `&lp=${res.lpAddr}` : ""}`}
                                            prefetch={false}
                                            className="truncate text-sm underline decoration-dotted underline-offset-4 sm:text-right"
                                        >
                                            {(res.ticker).length >= 7 ? (res.ticker).slice(0, 6) + '...' : res.ticker}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm sm:hidden">
                                <span className="text-[11px] uppercase tracking-wide text-gray-500">Amount</span>
                                <span className="text-right text-sm font-medium">{Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(res.value)}</span>
                                <span className="text-[11px] uppercase tracking-wide text-gray-500">Txn</span>
                                <Link
                                    href={_explorer + "tx/" + res.hash}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    prefetch={false}
                                    className="text-right text-sm font-medium underline"
                                >
                                    {res.hash.slice(0, 5) + "..." + res.hash.slice(61)}
                                </Link>
                            </div>
                            <div className="hidden w-full flex-row items-center justify-end gap-10 sm:flex sm:w-auto">
                                <span className="text-right w-[50px] sm:w-[200px]">
                                    {Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(res.value)}
                                </span>
                                <Link
                                    href={_explorer + "tx/" + res.hash}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    prefetch={false}
                                    className="font-bold text-right w-[50px] sm:w-[200px] underline truncate"
                                >
                                    {res.hash.slice(0, 5) + "..." + res.hash.slice(61)}
                                </Link>
                            </div>
                        </div>
                    </article>
                );
            })}
        </main>
    );
}
