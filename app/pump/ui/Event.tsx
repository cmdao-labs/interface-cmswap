import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
import { bitkub } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';

export default async function Event({
    mode, chain,
  }: {
    mode: string;
    chain: string;
  }) {
    await connection();

    let _chain: any = null;
    let _chainId = 0;
    let _explorer = '';
    if (chain === 'kub' || chain === '') {
        _chain = bitkub;
        _chainId = 96;
        _explorer = 'https://www.kubscan.com/';
    }
    const publicClient = createPublicClient({ 
        chain: _chain,
        transport: http()
    });
    let currencyAddr: string = '';
    let bkgafactoryAddr: string = '';
    let _blockcreated: number = 0;
    let v2facAddr: string = '';
    if ((chain === 'kub') && (mode === 'lite' || mode === '')) {
        // currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
        // bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
        // _blockcreated = 8581591;
        // v2facAddr = '0x1f98400000000000000000000000000000000002';
    } else if ((chain === 'kub') && mode === 'pro') {
        currencyAddr = '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5';
        bkgafactoryAddr = '0xa4ccd318dA0659DE1BdA6136925b873C2117ef4C';
        _blockcreated = 25208360;
        v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
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
    const result4 = await publicClient.getContractEvents({
        abi: erc20Abi,
        eventName: 'Transfer',
        args: { 
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
    }).filter((res) => {
        return res.value !== 1000000000;
    });
    const result6 = await publicClient.getContractEvents({
        abi: erc20Abi,
        eventName: 'Transfer',
        args: { 
            from: lparr,
        },
        fromBlock: BigInt(dataofcurr.blockcreated),
        toBlock: 'latest',
    });
    const result7 = await Promise.all(result6);
    const fulldatabuy = result7.filter((res) => {
        return tokenlist.indexOf(res.address.toUpperCase()) !== -1;
    }).map((res: any) => {
        return {action: Number(formatEther(res.args.value)) === 90661089.38801491 ? 'launch' : 'buy', value: Number(formatEther(res.args.value)), hash: res.transactionHash, block: res.blockNumber, ticker: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].ticker, logo: lplist[lplist.map((res: any) => {return res.lpSearch}).indexOf(res.args.from.toUpperCase())].logo}
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
    }).sort((a: any, b: any) => {return b.timestamp - a.timestamp}).slice(0, 9);

    return (
        <div className="flex flex-row items-center sm:items-start gap-6 mt-1 w-full" style={{zIndex: 1}}>
            {theresult.map((res: any, index: any) =>
                <Link href={_explorer + "tx/" + res.hash} rel="noopener noreferrer" target="_blank" prefetch={false} className={"w-[156px] flex flex-row items-center justify-around text-xs md:text-sm p-2 mb-4 bg-slate-700 rounded-lg overflow-hidden "  + (res.action === 'launch' ? "border-double border-4 border-emerald-300 " : "") + (index >= 3 ? "hidden xl:block" : "")} key={index}>
                    <div className="flex flex-row items-center justify-end gap-2 text-xs sm:text-sm">
                        <div className="text-right flex flex-row gap-2 items-center justify-end overflow-hidden">
                            {res.action === 'buy' && <span className="text-green-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'sell' && <span className="text-red-500 font-bold">{res.action.toUpperCase()}</span>}
                            {res.action === 'launch' && <span>🚀</span>}
                            <div className="w-[30px] h-[30px] rounded-full overflow-hidden relative">
                                <Image src={res.logo.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + res.logo.slice(7) : "https://gateway.commudao.xyz/ipfs/" + res.logo} alt="token_waiting_for_approve" fill />
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
