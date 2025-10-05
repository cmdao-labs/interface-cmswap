import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
import { bitkub, monadTestnet, bitkubTestnet } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { PumpCoreNativeABI } from '@/app/pump/abi/PumpCoreNative';

const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const FALLBACK_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='%230a111f'/><path d='M20 34c0-7.732 6.268-14 14-14s14 6.268 14 14-6.268 14-14 14-14-6.268-14-14Zm14-10a10 10 0 1 0 10 10 10.011 10.011 0 0 0-10-10Zm1 6v5.586l3.707 3.707-1.414 1.414L33 37.414V30h2Z' fill='%235965f7'/></svg>";

type Activity = {
    action: 'buy' | 'sell' | 'launch';
    value: number;
    hash: string;
    timestamp: number;
    ticker: string;
    logo: string;
};

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
    let _explorer = '';
    let _rpc = '';
    let _blockTime = 5;
    if (chain === 'kub' || chain === '') {
        _chain = bitkub;
        _chainId = 96;
        _explorer = 'https://www.kubscan.com/';
        _blockTime = 5;
    } else if (chain === 'monad') {
        _chain = monadTestnet;
        _chainId = 10143;
        _explorer = 'https://monad-testnet.socialscan.io/';
        _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
        _blockTime = 1;
    } else if (chain === 'kubtestnet') {
        _chain = bitkubTestnet;
        _chainId = 25925;
        _explorer = 'https://testnet.kubscan.com/';
        _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
    } // add chain here
    const publicClient = createPublicClient({ chain: _chain, transport: http(_rpc) });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let pumpCoreAddr: string = '';
    let _blockcreated: number = 0;
    let v2facAddr: string = '';
    let v3facAddr: string = '';
    if ((chain === 'kub') && (mode === 'lite' || mode === '') && (token === 'cmm' || token === '')) {
        currencyAddr = '0x9b005000a10ac871947d99001345b01c1cef2790';
        bkgafactoryAddr = '0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62';
        _blockcreated = 25229488;
        v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
    } else if ((chain === 'kub') && mode === 'pro') {
        currencyAddr = '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5';
        bkgafactoryAddr = '0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56';
        _blockcreated = 25232899;
        v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
    } else if (chain === 'monad' && mode === 'pro') {
        currencyAddr = '0x760afe86e5de5fa0ee542fc7b7b713e1c5425701';
        bkgafactoryAddr = '0x6dfc8eecca228c45cc55214edc759d39e5b39c93';
       _blockcreated = 16912084;
        v2facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    } else if (chain === 'kubtestnet' && mode === 'pro') {
        currencyAddr = '0x700D3ba307E1256e509eD3E45D6f9dff441d6907';
        pumpCoreAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
        _blockcreated = 23935659;
        v3facAddr = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b';
    }  // add chain and mode here
    let timeline: Activity[] = [];
    if (chain === 'kubtestnet' && mode === 'pro') {
        const r1 = await publicClient.getContractEvents({
            address: pumpCoreAddr as '0xstring',
            abi: PumpCoreNativeABI,
            eventName: 'Creation',
            fromBlock: BigInt(_blockcreated),
            toBlock: 'latest',
        });
        const r2 = await Promise.all(r1);
        const _getticker = r2.map(async (r: any) => {
            return await readContracts(config, {
                contracts: [
                    {
                        address: r.args.tokenAddr,
                        abi: erc20Abi,
                        functionName: 'symbol',
                        chainId: _chainId,
                    }
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
                logo: tokenslist[addrs.indexOf(r.args.tokenAddr.toUpperCase())].logo
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
                logo: tokenslist[addrs.indexOf(r.address.toUpperCase())].logo
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
                logo: tokenslist[addrs.indexOf(r.address.toUpperCase())].logo
            }
        }).filter((r) => {
            return r.to.toUpperCase() !== '0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase();
        });

        const merge = launch.concat(sell, buy);
        const _timestamparr = merge.map(async (res: any) => {
            return await publicClient.getBlock({ blockNumber: res.block, })
        });
        const timestamparr = await Promise.all(_timestamparr);
        const restimestamp = timestamparr.map((res) => {
            return Number(res.timestamp) * 1000;
        })
        timeline = merge.map((res: any, index: any) => {
            return {
                action: res.action,
                value: res.value,
                hash: res.hash,
                timestamp: restimestamp[index],
                ticker: res.ticker,
                logo: res.logo,
            } as Activity;
        }).sort((a: Activity, b: Activity) => {return b.timestamp - a.timestamp}).slice(0, 5);
    } else {
        const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
        const dataofuniv2factory = {addr: v2facAddr};
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
        const indexCount = await readContracts(config, {
            contracts: [
                {
                    ...bkgafactoryContract,
                    functionName: 'totalIndex',
                },
            ],
        });
        const init: any = {contracts: []};
        for (let i = 0; i <= Number(indexCount[0].result) - 1; i++) {
            init.contracts.push(
                {
                    ...bkgafactoryContract,
                    functionName: 'index',
                    args: [BigInt(i + 1)],
                }
            );
        }
        const result = await readContracts(config, init);
        const result2 = result.map(async (res: any) => {
            return await readContracts(config, {
                contracts: [
                    {
                        address: res.result!,
                        abi: erc20Abi,
                        functionName: 'symbol',
                        chainId: _chainId,
                    },
                    {
                        ...bkgafactoryContract,
                        functionName: 'logo',
                        args: [res.result!],
                    },
                    {
                        ...univ2factoryContract,
                        functionName: 'getPool',
                        args: [res.result!, dataofcurr.addr as '0xstring', 10000],
                    },
                ],
            });
        })
        const result3: any = await Promise.all(result2);
        const lplist = result3.map((res: any) => {return {lp: res[2].result, lpSearch: res[2].result.toUpperCase(), ticker: res[0].result, logo: res[1].result}});
        const lparr: any = [];
        for (let i = 0; i <= lplist.length - 1; i++) {
            lparr.push(lplist[i].lp);
        }
        const tokenlist = result.map((res: any) => {return res.result.toUpperCase()});
        let fulldatabuy: any[]
        let fulldatasell: any[]
        
        const currentBlock = await publicClient.getBlockNumber();
        const fromBlock = currentBlock - BigInt(Math.floor((86400 * 30 * 3) / _blockTime)); // last 3 months

        if (chain === 'monad') {
            const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
            fulldatabuy = []
            fulldatasell = []
            for (const address of lparr) {
                const individualBody = JSON.stringify({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: '0x' + Number(dataofcurr.blockcreated).toString(16),
                            toBlock: "latest",
                            fromAddress: address,
                            excludeZeroValue: true,
                            category: ["erc20"]
                        }
                    ]
                })
                const individualResponse = await fetch(_rpc, {
                    method: 'POST', 
                    headers: headers, 
                    body: individualBody
                })
                const individualData = await individualResponse.json()
                individualData.result.transfers.filter((res: any) => {
                    return tokenlist.indexOf(res.rawContract.address.toUpperCase()) !== -1;
                }).map((res: any) => {
                    fulldatabuy.push({action: 'buy', value: Number(formatEther(BigInt(res.rawContract.value))), hash: res.hash, block: Number(res.blockNum), ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.from.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.from.toUpperCase())].logo})
                })
                const individualBody2 = JSON.stringify({
                    id: 2,
                    jsonrpc: "2.0",
                    method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: '0x' + Number(dataofcurr.blockcreated).toString(16),
                            toBlock: "latest",
                            toAddress: address,
                            excludeZeroValue: true,
                            category: ["erc20"]
                        }
                    ]
                })
                const individualResponse2 = await fetch(_rpc, {
                    method: 'POST', 
                    headers: headers, 
                    body: individualBody2
                })
                const individualData2 = await individualResponse2.json()
                individualData2.result.transfers.filter((res: any) => {
                    return tokenlist.indexOf(res.rawContract.address.toUpperCase()) !== -1;
                }).map((res: any) => {
                    fulldatasell.push({action: formatEther(BigInt(res.rawContract.value)) === '999999999.999999999999968705' ? 'launch' : 'sell', value: Number(formatEther(BigInt(res.rawContract.value))), hash: res.hash, block: Number(res.blockNum), ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.to.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.to.toUpperCase())].logo})
                })
            }
        } else {
            const result4 = await publicClient.getContractEvents({
                abi: erc20Abi,
                eventName: 'Transfer',
                args: { 
                    to: lparr,
                },
                fromBlock,
                toBlock: 'latest',
            });
            const result5 = await Promise.all(result4);
            fulldatasell = result5.filter((res) => {
                return tokenlist.indexOf(res.address.toUpperCase()) !== -1;
            }).map((res: any) => {
                return {action: 'sell', value: Number(formatEther(res.args.value)), hash: res.transactionHash, block: res.blockNumber, ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.to.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.to.toUpperCase())].logo}
            }).filter((res) => {
                return res.value !== 1000000000;
            });
            const result6 = await publicClient.getContractEvents({
                abi: erc20Abi,
                eventName: 'Transfer',
                args: { 
                    from: lparr,
                },
                fromBlock,
                toBlock: 'latest',
            });
            const result7 = await Promise.all(result6);
            fulldatabuy = result7.filter((res) => {
                return tokenlist.indexOf(res.address.toUpperCase()) !== -1;
            }).map((res: any) => {
                return {action: Number(formatEther(res.args.value)) === 90661089.38801491 ? 'launch' : 'buy', value: Number(formatEther(res.args.value)), hash: res.transactionHash, block: res.blockNumber, ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].logo}
            });
        }
        const mergedata = fulldatasell.concat(fulldatabuy);
        const _timestamparr = mergedata.map(async (res: any) => {
            return await publicClient.getBlock({ 
                blockNumber: res.block,
            })
        });
        const timestamparr = await Promise.all(_timestamparr);
        const restimestamp = timestamparr.map((res) => {
            return Number(res.timestamp) * 1000;
        })
        timeline = mergedata.map((res: any, index: any) => {
            return {
                action: res.action,
                value: res.value,
                hash: res.hash,
                timestamp: restimestamp[index],
                ticker: res.ticker,
                logo: res.logo,
            } as Activity;
        }).sort((a: Activity, b: Activity) => {return b.timestamp - a.timestamp}).slice(0, 5);
    }

    const activity = timeline.slice(0, 5);

    if (activity.length === 0) {
        return (
            <div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080c18]/70 text-center text-sm text-slate-400">
                No recent launchpad activity detected.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-2 sm:grid-cols-4 xl:grid-cols-5">
                {activity.map((item) => {
                    const { valueAccent, cardAccent } = getActionStyles(item.action);
                    const primary = item.action === 'launch' ? 'Launch' : `${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(item.value)} ${item.action === 'buy' ? 'bought' : 'sold'}`;

                    return (
                        <Link
                            key={item.hash + '/' + item.value}
                            href={_explorer + 'tx/' + item.hash}
                            rel="noopener noreferrer"
                            target="_blank"
                            prefetch={false}
                            className={`group flex flex-col gap-2 rounded-4xl border border-white/5 p-3 text-sm shadow-lg transition-all duration-300 hover:-translate-y-1 ${cardAccent}`}
                        >
                            <div className="flex justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                                        <Image src={resolveLogoUrl(item.logo)} alt={`${item.ticker} logo`} fill sizes="48px" className="object-cover" />
                                    </div>
                                    <div className="flex flex-col text-xs">
                                        <span className="font-semibold text-white">{item.ticker}</span>
                                        <span className={`font-medium ${valueAccent}`}>{primary}</span>
                                    </div>
                                </div>
                                <span className="text-xs mt-1 text-slate-500">{formatRelativeTime(item.timestamp)}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

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
    if (!raw) return FALLBACK_LOGO;
    if (raw.startsWith('ipfs://')) return `https://cmswap.mypinata.cloud/ipfs/${raw.slice(7)}`;
    if (raw.startsWith('https://') || raw.startsWith('http://')) return raw;
    return `https://cmswap.mypinata.cloud/ipfs/${raw}`;
}
