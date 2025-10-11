import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'
import { bitkub, monadTestnet , bitkubTestnet } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { PumpCoreNativeABI } from '@/app/pump/abi/PumpCoreNative';

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
    if (chain === 'kub' || chain === '') {
        _chain = bitkub;
        _chainId = 96;
        _explorer = 'https://www.kubscan.com/';
    } else if (chain === 'monad') {
        _chain = monadTestnet;
        _chainId = 10143;
        _explorer = 'https://monad-testnet.socialscan.io/';
        _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
    } else if (chain === 'kubtestnet'){
        _chain = bitkubTestnet;
        _chainId = 25925;
        _explorer = 'https://testnet.kubscan.com/';
        _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
    }
    // add chain here
    const publicClient = createPublicClient({ chain: _chain, transport: http(_rpc) });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let pumpCoreAddr: string = '';
    let _blockcreated: number = 1;
    let v2facAddr: string = '';
    if ((chain === 'kub' || chain === '') && (mode === 'lite' || mode === '') && (token === 'cmm' || token === '')) {
        currencyAddr = '0x9b005000a10ac871947d99001345b01c1cef2790';
        bkgafactoryAddr = '0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62';
        _blockcreated = 25229488;
        v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
    } else if ((chain === 'kub' || chain === '') && mode === 'pro') {
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
        bkgafactoryAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
        pumpCoreAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
       _blockcreated = 23935659;
        v2facAddr = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b';
    }  // add chain and mode here
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

    let fulldatabuy: any[] = [];
    let fulldatasell: any[] = [];
    let launchEvents: any[] = [];
    let lplist: any[] = [];
    let tokenlist: any[] = [];

    if (chain === 'kubtestnet' && mode === 'pro') {
        const coreAddress = (pumpCoreAddr || bkgafactoryAddr) as '0xstring';
        const rpcUrl = _rpc || bitkubTestnet.rpcUrls.default?.http?.[0] || '';
        const client = rpcUrl
            ? createPublicClient({
                chain: _chain,
                transport: http(rpcUrl),
            })
            : publicClient;

        const creationLogs = await client.getContractEvents({
            address: coreAddress,
            abi: PumpCoreNativeABI,
            eventName: 'Creation',
            fromBlock: BigInt(dataofcurr.blockcreated),
            toBlock: 'latest',
        });
        const _getticker = creationLogs.map(async (log: any) => {
            return await readContracts(config, {
                contracts: [
                    {
                        address: log.args.tokenAddr,
                        abi: erc20Abi,
                        functionName: 'symbol',
                        chainId: _chainId,
                    },
                ],
            });
        });
        const getticker: any = await Promise.all(_getticker);

        const tokenslist = creationLogs.map((log: any, index: number) => {
            const symbolEntry = getticker[index]?.[0];
            const symbol =
                symbolEntry?.status === 'success' && typeof symbolEntry.result === 'string'
                    ? symbolEntry.result
                    : log.args.tokenAddr.slice(2, 8).toUpperCase();
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
            }));

        const sellLogs = await client.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: {
                from: addr as '0xstring',
                to: coreAddress,
            },
            fromBlock: BigInt(dataofcurr.blockcreated),
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
                };
            });

        const buyLogs = await client.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: {
                from: coreAddress,
                to: addr as '0xstring',
            },
            fromBlock: BigInt(dataofcurr.blockcreated),
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
                };
            });
    } else {
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
        lplist = result3.map((res: any) => {return {lp: res[2].result, lpSearch: res[2].result.toUpperCase(), ticker: res[0].result, logo: res[1].result}});
        const lparr: any = [];
        for (let i = 0; i <= lplist.length - 1; i++) {
            lparr.push(lplist[i].lp);
        }
        tokenlist = result.map((res: any) => {return res.result.toUpperCase()});

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
                        toAddress: addr as '0xstring',
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
                        fromAddress: addr as '0xstring',
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
                fulldatasell.push({action: 'sell', value: Number(formatEther(BigInt(res.rawContract.value))), hash: res.hash, block: Number(res.blockNum), ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.to.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.to.toUpperCase())].logo})
            })
        }
    } else {
        const result4 = await publicClient.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: { 
                from: addr as '0xstring',
                to: lparr,
            },
            fromBlock: BigInt(dataofcurr.blockcreated),
            toBlock: 'latest',
        });
        const result5 = await Promise.all(result4);
        fulldatasell = result5.filter((res) => {
            return tokenlist.indexOf(res.address.toUpperCase()) !== -1;
        }).map((res: any) => {
            return {action: 'sell', value: Number(formatEther(res.args.value)), hash: res.transactionHash, block: res.blockNumber, ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.to.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.to.toUpperCase())].logo}
        });
        const result6 = await publicClient.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: { 
                from: lparr,
                to: addr as '0xstring',
            },
            fromBlock: BigInt(dataofcurr.blockcreated),
            toBlock: 'latest',
        });
        const result7 = await Promise.all(result6);
        fulldatabuy = result7.filter((res) => {
            return tokenlist.indexOf(res.address.toUpperCase()) !== -1;
        }).map((res: any) => {
            return {action: (Number(formatEther(res.args.value)) === 90661089.38801491 || Number(formatEther(res.args.value)) === 99729918.975692707812343703) ? 'launch' : 'buy', value: Number(formatEther(res.args.value)), hash: res.transactionHash, block: res.blockNumber, ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].logo}
        });
        }
    }
    const mergedata = fulldatasell.concat(fulldatabuy, launchEvents);
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
        return {action: res.action, value: res.value, hash: res.hash, timestamp: restimestamp[index], ticker: res.ticker, logo: res.logo}
    }).sort((a: any, b: any) => {return b.timestamp - a.timestamp});

    return (
        <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start" style={{zIndex: 1}}>
            <div className="w-full h-[50px] py-6 flex flex-row items-center justify-between sm:gap-2 text-lg lg:text-3xl">
                <div className="flex flex-row gap-2 items-center">
                    <span>{addr.slice(0, 5) + '...' + addr.slice(37)}</span>
                </div>
                <span className="font-bold">Activity</span>
            </div>
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
                                <Image src={res.logo.slice(0, 7) === 'ipfs://' ? "https://cmswap.mypinata.cloud/ipfs/" + res.logo.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res.logo} alt="token_waiting_for_approve" fill />
                            </div>
                            <span className="truncate">{res.ticker}</span>
                        </div>
                        <span className="text-right w-[50px] sm:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                        <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="font-bold text-right w-[50px] sm:w-[200px] underline truncate">{res.hash.slice(0, 5) + '...' + res.hash.slice(61)}</Link>
                    </div>
                </div>
            )}
        </main>
    );
}
