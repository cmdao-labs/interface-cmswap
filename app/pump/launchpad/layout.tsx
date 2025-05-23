'use client';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { useState, useEffect } from 'react';
import { formatEther, createPublicClient, http } from 'viem';
import { unichain, base } from 'viem/chains';
import { config } from '@/app/config'
import { useConnections, useAccount } from 'wagmi';
import { readContracts } from '@wagmi/core';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { dataxp } from "@/app/pump/blob/data";
export const experimental_ppr = true;

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || '';
    const chain = searchParams.get('chain') || '';
    const connections = useConnections();
    const account = useAccount();
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(0);
    
    // let _chain: any = unichain;
    // let _rpc = '';
    // if (account.chainId === 130) {
    //     _chain = unichain;
    // } else if (account.chainId === 8453) {
    //     _chain = base;
    //     _rpc = process.env.BASE_RPC as string;
    // }
    // const publicClient = createPublicClient({ 
    //     chain: _chain,
    //     transport: http(_rpc)
    // });
    // let currencyAddr: string = '';
    // let bkgafactoryAddr: string = '';
    // let _blockcreated: number = 1;
    // let v2facAddr: string = '';
    // if (account.chainId === 130 && (mode === 'lite' || mode === '')) {
    //     currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    //     bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    //     _blockcreated = 8581591;
    //     v2facAddr = '0x1f98400000000000000000000000000000000002';
    // } else if (account.chainId === 130 && mode === 'pro') {
    //     currencyAddr = '0x4200000000000000000000000000000000000006';
    //     bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    //     _blockcreated = 8581591;
    //     v2facAddr = '0x1f98400000000000000000000000000000000002';
    // } else if (account.chainId === 8453 && (mode === 'lite' || mode === '')) {
    //     currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    //     bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    //     _blockcreated = 26462082;
    //     v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    // } else if (account.chainId === 8453 && mode === 'pro') {
    //     currencyAddr = '0x4200000000000000000000000000000000000006';
    //     bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    //     _blockcreated = 26462082;
    //     v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    // }
    // const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
    // const bkgafactoryContract = {
    //     address: bkgafactoryAddr as '0xstring',
    //     abi: ERC20FactoryABI,
    //     chainId: account.chainId,
    // } as const
    // const univ2factoryContract = {
    //     address: v2facAddr as '0xstring',
    //     abi: UniswapV2FactoryABI,
    //     chainId: account.chainId,
    // } as const

    // useEffect(() => {
    //     const fetchLogs = async () => {
    //         setXp(0);
    //         setLevel(0);
    //         if (account.address !== undefined) {
    //             const tokenCount = await readContracts(config, {contracts: [{ ...bkgafactoryContract, functionName: 'totalIndex', },],});
    //             const init: any = {contracts: []};
    //             for (let i = 0; i <= Number(tokenCount[0].result) - 1; i++) {
    //                 init.contracts.push(
    //                     {
    //                         ...bkgafactoryContract,
    //                         functionName: 'index',
    //                         args: [BigInt(i + 1)],
    //                     }
    //                 );
    //             }
    //             const tokenList: any = await readContracts(config, init);
    //             const _resLpList = tokenList.map(async (res: any) => {
    //                 return await readContracts(config, {
    //                     contracts: [
    //                         {
    //                             ...univ2factoryContract,
    //                             functionName: 'getPair',
    //                             args: [res.result!, dataofcurr.addr as '0xstring'],
    //                         },
    //                     ],
    //                 });
    //             });
    //             const resLpList: any = await Promise.all(_resLpList);
    //             const lpList2: any = resLpList.map((res: any) => {return res[0].result!;});
    //             const lpList2UpperCase: any = resLpList.map((res: any) => {return res[0].result!.toUpperCase();});
    //             const init2: any = {contracts: []};
    //             for (let i = 0; i <= lpList2.length - 1; i++) {
    //                 init2.contracts.push(
    //                     {
    //                         address: lpList2[i],
    //                         abi: UniswapV2PairABI,
    //                         functionName: 'token0',
    //                         chainId: account.chainId,
    //                     }
    //                 );
    //             }
    //             const fetchtoken0: any = await readContracts(config, init2);
    //             const _xp = Object.values((await publicClient.getContractEvents({
    //                 abi: UniswapV2PairABI,
    //                 address: lpList2,
    //                 eventName: 'Swap',
    //                 fromBlock: BigInt(dataofcurr.blockcreated),
    //                 toBlock: 'latest',
    //             })).filter((res) => {
    //                 return res.args.to!.toUpperCase() === account.address?.toUpperCase(); 
    //             }).map((res) => {
    //                 if (fetchtoken0[lpList2UpperCase.indexOf(res.address.toUpperCase())].result.toUpperCase() === currencyAddr.toUpperCase()) {
    //                     if (Number(res.args.amount1In) === 0) {
    //                         return {addr: res.args.to, value: Number(formatEther(res.args.amount0In as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
    //                     } else {
    //                         return {addr: res.args.to, value: Number(formatEther(res.args.amount0Out as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
    //                     }
    //                 } else {
    //                     if (Number(res.args.amount0In) === 0) {
    //                         return {addr: res.args.to, value: Number(formatEther(res.args.amount1In as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
    //                     } else {
    //                         return {addr: res.args.to, value: Number(formatEther(res.args.amount1Out as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
    //                     }
    //                 }
    //             }).reduce((a: any, b: any) => {
    //                 if (a[b.addr.toUpperCase()]) {
    //                     a[b.addr.toUpperCase()].value += b.value
    //                 } else {
    //                     a[b.addr.toUpperCase()] = b
    //                 }
    //                 return a
    //             }, {})).map((res: any) => {
    //                 let questxp = 0;
    //                 if (dataxp.map(i => i.addr).indexOf(res.addr.toUpperCase()) !== -1) {
    //                     questxp += dataxp[dataxp.map(i => i.addr).indexOf(res.addr.toUpperCase())].xp;
    //                 }
    //                 let lvl = 1;
    //                 if (res.value + questxp >= 25900) {
    //                     lvl = 10;
    //                 } else if (res.value + questxp >= 20900) {
    //                     lvl = 9;
    //                 } else if (res.value + questxp >= 16350) {
    //                     lvl = 8;
    //                 } else if (res.value + questxp >= 12150) {
    //                     lvl = 7;
    //                 } else if (res.value + questxp >= 8350) {
    //                     lvl = 6;
    //                 } else if (res.value + questxp >= 5150) {
    //                     lvl = 5;
    //                 } else if (res.value + questxp >= 2950) {
    //                     lvl = 4;
    //                 } else if (res.value + questxp >= 1450) {
    //                     lvl = 3;
    //                 } else if (res.value + questxp >= 550) {
    //                     lvl = 2;
    //                 }
    //                 return {addr: res.addr, value: Number(res.value + questxp).toFixed(0), lvl: lvl}
    //             }).sort((a: any, b: any) => {return b.value - a.value});
    //             if (_xp[0] !== undefined) {setXp(Number(_xp[0].value)); setLevel(_xp[0].lvl);}
    //         }
    //     }
    //     fetchLogs()
    // }, [account, mode])

    const handleChain = (term: string) => {
        redirect('/pump/launchpad?chain=' + term + '&mode=pro');
    };

    return (
        <div className="grid grid-rows-[20px_1fr_10px] items-center justify-items-center min-h-screen pb-20 gap-16 p-4 sm:p-10 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-700 via-black to-emerald-900">
            <header className="mt-[220px] md:mt-[150px] mb-10 row-start-1 flex gap-4 md:gap-8 items-center justify-start md:justify-center text-xs md:text-sm w-full flex-wrap" style={{zIndex: 1}}>
                <div className="flex flex-row gap-1">
                    <button className="text-white hover:bg-neutral-800 focus:outline-none rounded-lg p-2 cursor-pointer" onClick={() => {if (chain !== 'kub') {handleChain('kub');}}}><Image src="/96.png" alt="" width={25} height={25} style={{filter: (chain === 'kub' || chain === '') ? "grayscale(0)" : "grayscale(1)"}} /></button>
                    <button className="text-white hover:bg-neutral-800 focus:outline-none rounded-lg p-2 cursor-pointer" onClick={() => {if (chain !== 'monad') {handleChain('monad');}}}><Image src="/monad.jpg" alt="" width={25} height={25} style={{filter: chain === 'monad' ? "grayscale(0)" : "grayscale(1)"}} /></button>
                </div>
                {connections && account.address !== undefined &&
                    <Link href={"/pump/launchpad/portfolio?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite") + "&addr=" + account.address} prefetch={false} className="underline text-emerald-300 hover:font-bold">Portfolio</Link>
                }
                <Link href={"/pump/launchpad/leaderboard?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline text-emerald-300 hover:font-bold">Leaderboard</Link>
            </header>
            <div className="w-[100px] h-[100px] sm:w-[500px] sm:h-[500px] absolute top-14 right-0" style={{backgroundImage: mode === 'pro' ? 'radial-gradient(circle farthest-side at 100% 10%,rgb(110 231 183),#8586ad00 58%)' : 'radial-gradient(circle farthest-side at 100% 10%,#8586ad26,#8586ad00 88%)'}}></div>
            <div className="w-[100px] h-[100px] sm:w-[500px] sm:h-[500px] absolute bottom-0 left-0" style={{backgroundImage: mode === 'pro' ? 'radial-gradient(circle closest-corner at 0%,rgb(110 231 183) 1%,#0000)' : 'radial-gradient(circle closest-corner at 0%,#8586ad26 14%,#0000)'}}></div>
            {children}
        </div>
    );
}
