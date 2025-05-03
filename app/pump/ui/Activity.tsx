import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'
import { unichain, base } from 'viem/chains';
import { config } from '@/app/config'
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';

export default async function Activity({
    addr, mode, chain,
}: {
    addr: string;
    mode: string;
    chain: string;
}) {
    await connection();

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
        _rpc = process.env.BASE_RPC as string;
    }
    const publicClient = createPublicClient({ 
        chain: _chain,
        transport: http(_rpc)
    });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let _blockcreated: number = 1;
    let v2facAddr: string = '';
    if ((chain === 'unichain' || chain === '') && (mode === 'lite' || mode === '')) {
        currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
        bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
        _blockcreated = 8581591;
        v2facAddr = '0x1f98400000000000000000000000000000000002';
    } else if ((chain === 'unichain' || chain === '') && mode === 'pro') {
        currencyAddr = '0x4200000000000000000000000000000000000006';
        bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
        _blockcreated = 8581591;
        v2facAddr = '0x1f98400000000000000000000000000000000002';
    } else if (chain === 'base' && (mode === 'lite' || mode === '')) {
        currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
        bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
        _blockcreated = 26462082;
        v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    } else if (chain === 'base' && mode === 'pro') {
        currencyAddr = '0x4200000000000000000000000000000000000006';
        bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
        _blockcreated = 26462082;
        v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    }
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
                functionName: 'getPair',
                args: [res.result!, dataofcurr.addr as '0xstring'],
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
    const fulldatasell = result5.filter((res) => {
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
    const fulldatabuy = result7.filter((res) => {
        return tokenlist.indexOf(res.address.toUpperCase()) !== -1;
    }).map((res: any) => {
        return {action: (Number(formatEther(res.args.value)) === 90661089.38801491 || Number(formatEther(res.args.value)) === 99729918.975692707812343703) ? 'launch' : 'buy', value: Number(formatEther(res.args.value)), hash: res.transactionHash, block: res.blockNumber, ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].logo}
    });
    const mergedata = fulldatasell.concat(fulldatabuy);
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
                    <span className="text-right w-[100px] xl:w-[600px]">Asset</span>
                    <span className="text-right w-[50px] xl:w-[200px]">Amount</span>
                    <span className="text-right w-[50px] xl:w-[200px]">Txn hash</span>
                </div>
            </div>
            {theresult.map((res: any, index: any) =>
                <div className="w-full h-[50px] flex flex-row items-center justify-around text-xs md:text-sm py-10 border-t border-gray-800" key={index}>
                    <span className="w-1/5 sm:w-1/3 text-gray-500 text-xs">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Bangkok', }).format(new Date(res.timestamp))}</span>
                    <div className="w-5/6 sm:w-3/4 flex flex-row items-center justify-end gap-10 text-xs sm:text-sm">
                        <div className="text-right w-[100px] xl:w-[600px] flex flex-row gap-2 items-center justify-end overflow-hidden">
                            {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'launch' && <span className="text-emerald-300 font-bold">🚀 {res.action.toUpperCase()} & BUY</span>}
                            <div className="w-[15px] h-[15px] sm:w-[30px] sm:h-[30px] rounded-full overflow-hidden relative">
                                <Image src={res.logo.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + res.logo.slice(7) : "https://gateway.commudao.xyz/ipfs/" + res.logo} alt="token_waiting_for_approve" fill />
                            </div>
                            <span className="truncate">{res.ticker}</span>
                        </div>
                        <span className="text-right w-[50px] xl:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res.value)}</span>
                        <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className="font-bold text-right w-[50px] xl:w-[200px] underline truncate">{res.hash.slice(0, 5) + '...' + res.hash.slice(61)}</Link>
                    </div>
                </div>
            )}
        </main>
    );
}
