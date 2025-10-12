import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
import { bitkubTestnet } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";

type Activity = {
    action: 'buy' | 'sell' | 'launch';
    value: number;
    hash: string;
    timestamp: number;
    ticker: string;
    logo: string;
    address: string;
};

function getActionStyles(action: Activity['action']) {
    switch (action) {
        case 'buy':
            return {
                valueAccent: 'text-emerald-300',
                cardAccent: 'shadow-emerald-500/20 hover:border-emerald-400/40 hover:shadow-emerald-500/30',
            } as const;
        case 'sell':
            return {
                valueAccent: 'text-rose-400',
                cardAccent: 'shadow-rose-500/20 hover:border-rose-400/40 hover:shadow-rose-500/30',
            } as const;
        default:
            return {
                valueAccent: 'font-semibold uppercase tracking-[0.2em] text-white',
                cardAccent: 'shadow-white/20 hover:border-white/40 hover:shadow-white/30',
            } as const;
    }
}

const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
function formatRelativeTime(timestamp: number) {
    const now = Date.now();
    const diff = Math.round((timestamp - now) / 1000);
    const abs = Math.abs(diff);
    if (abs < 60) return RELATIVE_TIME_FORMAT.format(diff, 'second');
    if (abs < 3600) return RELATIVE_TIME_FORMAT.format(Math.round(diff / 60), 'minute');
    if (abs < 86400) return RELATIVE_TIME_FORMAT.format(Math.round(diff / 3600), 'hour');
    return RELATIVE_TIME_FORMAT.format(Math.round(diff / 86400), 'day');
}

function resolveLogoUrl(raw: string) {
    if (!raw) return "/default.ico";
    if (raw.startsWith('ipfs://')) return `https://cmswap.mypinata.cloud/ipfs/${raw.slice(7)}`;
    if (raw.startsWith('https://') || raw.startsWith('http://')) return raw;
    return `https://cmswap.mypinata.cloud/ipfs/${raw}`;
}

export default async function Event({
    mode, chain, token,
}: {
    mode: string;
    chain: string;
    token: string;
}) {
    await connection();
    let _chain: any = null;
    let _chainId = 0;
    let _rpc = '';
    if (chain === 'kubtestnet') {
        _chain = bitkubTestnet;
        _chainId = 25925;
        _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
    } // add chain here
    const publicClient = createPublicClient({ chain: _chain, transport: http(_rpc) });
    let currencyAddr: string = '';
    let pumpCoreAddr: string = '';
    let _blockcreated: number = 0;
    let v3facAddr: string = '';
    if (chain === 'kubtestnet' && mode === 'pro') {
        currencyAddr = '0x700D3ba307E1256e509eD3E45D6f9dff441d6907';
        pumpCoreAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
        _blockcreated = 23935659;
        v3facAddr = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b';
    }  // add chain and mode here

    let timeline: Activity[] = [];
    if (chain === 'kubtestnet' && mode === 'pro') {
        const r1 = await publicClient.getContractEvents({
            address: pumpCoreAddr as '0xstring',
            abi: ERC20FactoryV2ABI,
            eventName: 'Creation',
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        const r2 = await Promise.all(r1);
        const _getticker = r2.map(async (r: any) => {
            return await readContracts(config, {
                contracts: [
                    { address: r.args.tokenAddr, abi: erc20Abi, functionName: 'symbol', chainId: _chainId }
                ],
            });
        })
        const getticker: any = await Promise.all(_getticker);
        const tokenslist = r2.map((r: any, index) => {return {addr: r.args.tokenAddr, ticker: getticker[index][0].result, logo: r.args.logo}});
        const addrs = tokenslist.map(t => {return t.addr.toUpperCase()});

        const launch = r2.map((r: any) => {
            return {
                action: 'launch', 
                value: 0, 
                hash: r.transactionHash, 
                block: r.blockNumber, 
                from: r.args.from,
                to: r.args.to, 
                addr: tokenslist[addrs.indexOf(r.args.tokenAddr.toUpperCase())].addr, 
                ticker: tokenslist[addrs.indexOf(r.args.tokenAddr.toUpperCase())].ticker, 
                logo: tokenslist[addrs.indexOf(r.args.tokenAddr.toUpperCase())].logo,
            }
        });

        const r3 = await publicClient.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: { to: pumpCoreAddr as '0xstring', },
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        const r4 = await Promise.all(r3);
        const sell = r4.filter((r) => {
            return addrs.indexOf(r.address.toUpperCase()) !== -1;
        }).map((r: any) => {
            return {
                action: 'sell', 
                value: Number(formatEther(r.args.value)), 
                hash: r.transactionHash, 
                block: r.blockNumber, 
                from: r.args.from,
                to: r.args.to, 
                addr: tokenslist[addrs.indexOf(r.address.toUpperCase())].addr, 
                ticker: tokenslist[addrs.indexOf(r.address.toUpperCase())].ticker, 
                logo: tokenslist[addrs.indexOf(r.address.toUpperCase())].logo,
            }
        }).filter((r) => {
            return r.from.toUpperCase() !== '0x0000000000000000000000000000000000000000'.toUpperCase();
        });

        const r5 = await publicClient.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: { from: pumpCoreAddr as '0xstring', },
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        const r6 = await Promise.all(r5);
        const buy = r6.filter((r) => {
            return addrs.indexOf(r.address.toUpperCase()) !== -1;
        }).map((r: any) => {
            return {
                action: 'buy', 
                value: Number(formatEther(r.args.value)), 
                hash: r.transactionHash, 
                block: r.blockNumber,
                from: r.args.from,
                to: r.args.to, 
                addr: tokenslist[addrs.indexOf(r.address.toUpperCase())].addr, 
                ticker: tokenslist[addrs.indexOf(r.address.toUpperCase())].ticker, 
                logo: tokenslist[addrs.indexOf(r.address.toUpperCase())].logo,
            }
        }).filter((r) => {
            return r.to.toUpperCase() !== '0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase();
        });

        const merge = launch.concat(sell, buy);
        const _timestamparr = merge.map(async (res: any) => { return await publicClient.getBlock({ blockNumber: res.block, }) });
        const timestamparr = await Promise.all(_timestamparr);
        const restimestamp = timestamparr.map((res) => { return Number(res.timestamp) * 1000; })
        timeline = merge.map((res: any, index: any) => {
            return {
                action: res.action,
                value: res.value,
                hash: res.hash,
                timestamp: restimestamp[index],
                ticker: res.ticker,
                logo: res.logo,
                address: res.addr,
                lp: res.lp,
            } as Activity;
        }).sort((a: Activity, b: Activity) => {return b.timestamp - a.timestamp}).slice(0, 10);
    }

    const activity = timeline.slice(0, 10);
    if (activity.length === 0) return (<div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080c18]/70 text-center text-sm text-slate-400">No recent launchpad activity detected.</div>);

    return (
        <div className="gap-2 flex w-full min-w-0 flex-nowrap overflow-x-auto sm:grid sm:grid-cols-5 sm:overflow-x-visible sm:flex-none eventbar">
            {activity.map((item) => {
                const { valueAccent, cardAccent } = getActionStyles(item.action);
                const primary = item.action === 'launch' ? 'Launch' : `${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(item.value)} ${item.action === 'buy' ? 'bought' : 'sold'}`;

                return (
                    <Link
                        key={item.hash + '/' + item.value}
                        href={{
                            pathname: '/pump/launchpad/token',
                            query: {
                                mode: mode || '',
                                chain: chain || '',
                                ticker: item.address,
                                token: token || '',
                            },
                        }}
                        prefetch={false}
                        className={`group flex flex-row justify-between w-[240px] shrink-0 flex-col gap-2 rounded-lg border border-white/5 p-3 text-xs sm:w-auto sm:shrink shadow-lg transition-all duration-300 hover:-translate-y-1 ${cardAccent}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden sm:rounded-2xl border border-white/10 bg-white/5">
                                <Image src={resolveLogoUrl(item.logo)} alt={`${item.ticker}`} fill sizes="48px" className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-white">{item.ticker}</span>
                                <span className={`font-medium ${valueAccent}`}>{primary}</span>
                            </div>
                        </div>
                        <span className="mt-1 text-slate-500">{formatRelativeTime(item.timestamp)}</span>
                    </Link>
                );
            })}
        </div>
    );
}
