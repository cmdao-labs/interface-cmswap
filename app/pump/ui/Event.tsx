import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
import { bitkub, monadTestnet, bitkubTestnet } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';

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
    } else if (chain === 'kubtestnet'){
        _chain = bitkubTestnet;
        _chainId = 25925;
        _explorer = 'https://testnet.kubscan.com/';
        _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
        _blockTime = 5;
    }
        // add chain here
    const publicClient = createPublicClient({ 
        chain: _chain,
        transport: http(_rpc)
    });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let _blockcreated: number = 0;
    let v2facAddr: string = '';
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
        bkgafactoryAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
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
    const theresult = mergedata.map((res: any, index: any) => {
        return {action: res.action, value: res.value, hash: res.hash, timestamp: restimestamp[index], ticker: res.ticker, logo: res.logo}
    }).sort((a: any, b: any) => {return b.timestamp - a.timestamp}).slice(0, 9);

    return (
        <div className="flex flex-row items-center sm:items-start gap-2 mt-1 w-full" style={{zIndex: 1}}>
            {theresult.map((res: any, index: any) =>
            <Link
            href={_explorer + "tx/" + res.hash}
            rel="noopener noreferrer"
            target="_blank"
            prefetch={false}
            className={
                `
                w-[156px] flex flex-row items-center justify-around 
                text-xs md:text-sm p-1 mb-4 rounded-lg overflow-hidden 
                backdrop-blur-sm bg-white/10 transition-shadow duration-300 
                shadow-[2px] hover:shadow-[0_0_8px_2px_rgba(255,255,255,0.4)] 
                border-1
                ${
                    res.action === 'buy'
                    ? 'border-green-400 shadow-green-400'
                    : res.action === 'sell'
                    ? 'border-red-400 shadow-red-400'
                    : 'border-slate-500'
                } 
                ${res.action === 'launch' ? 'border-double border-4 border-emerald-300' : ''} 
                ${index >= 2 ? 'hidden xl:block' : ''}
                `
            }
            key={index}
            >
                    <div className="flex flex-row items-center justify-end gap-2 text-xs min-w-[125px]">
                        <div className="text-right flex flex-row gap-2 items-center justify-end overflow-hidden">
                            {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'launch' && <span>🚀</span>}
                            <div className="w-[30px] h-[30px] rounded-full overflow-hidden relative">
                                <Image src={res.logo.slice(0, 7) === 'ipfs://' ? "https://cmswap.mypinata.cloud/ipfs/" + res.logo.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res.logo} alt="token_waiting_for_approve" fill />
                            </div>
                            <span className="w-[30px] truncate">{res.ticker}</span>
                        </div>
                        <span className="text-right">{res.action !== 'launch' && Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                    </div>
                </Link>
            )}
        </div>
    );
}
