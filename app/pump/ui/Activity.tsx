import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'
import { bitkubTestnet } from 'viem/chains';
import { config } from '@/app/config';
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
        <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start" style={{zIndex: 1}}>
            <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                <div className="w-1/5 sm:w-1/3">Timestamp</div>
                <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10">
                    <span className="text-right w-[100px] sm:w-[600px]">Asset</span>
                    <span className="text-right w-[50px] sm:w-[200px]">Amount</span>
                    <span className="text-right w-[50px] sm:w-[200px]">Txn</span>
                </div>
            </div>
            {theresult.map((res: any, index: any) =>
                <div className="w-full h-[50px] flex flex-row items-center justify-around text-xs md:text-sm py-10 border-t border-gray-800" key={index}>
                    <span className="w-1/5 sm:w-1/3 text-gray-500 text-xs">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Bangkok', }).format(new Date(res.timestamp))}</span>
                    <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10 text-xs sm:text-sm">
                        <div className="text-right w-[100px] sm:w-[600px] flex flex-row gap-2 items-center justify-end overflow-hidden">
                            {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'launch' && <span className="text-emerald-300 font-bold">🚀 {res.action.toUpperCase()} & BUY</span>}
                            <div className="w-[15px] h-[15px] sm:w-[30px] sm:h-[30px] rounded-full overflow-hidden relative">
                                <Image src={res.logo.slice(0, 7) === 'ipfs://' ? "https://cmswap.mypinata.cloud/ipfs/" + res.logo.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res.logo} alt="" fill />
                            </div>
                            <Link
                                href={`/pump/launchpad/token?chain=${chain}&mode=${mode}${token ? `&token=${token}` : ''}&ticker=${res.tickerAddr}${res.lpAddr ? `&lp=${res.lpAddr}` : ''}`}
                                prefetch={false}
                                className="truncate underline decoration-dotted underline-offset-4"
                            >
                                {res.ticker}
                            </Link>
                        </div>
                        <span className="text-right w-[50px] sm:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                        <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="font-bold text-right w-[50px] sm:w-[200px] underline truncate">{res.hash.slice(0, 5) + '...' + res.hash.slice(61)}</Link>
                    </div>
                </div>
            )}
        </main>
    );
}
