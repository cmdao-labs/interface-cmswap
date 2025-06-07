'use client';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, redirect } from "next/navigation";
import { useConnections, useAccount } from 'wagmi';

export default function Menu({
  chainEnable,
}: {
  chainEnable: boolean;
}) {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || '';
    const chain = searchParams.get('chain') || '';
    const connections = useConnections();
    const account = useAccount();
    
    const handleChain = (term: string) => {
        redirect('/pump/launchpad?chain=' + term + '&mode=pro');
    };

    return (
        <div className="flex gap-4 md:gap-8 items-center justify-end md:justify-end text-xs md:text-sm flex-wrap mr-4">
            {chainEnable && 
                <div className="flex flex-row gap-1">
                    <button className="text-white hover:bg-neutral-800 focus:outline-none rounded-lg p-2 cursor-pointer" onClick={() => {if (chain !== 'kub') {handleChain('kub');}}}><Image src="/96.png" alt="" width={25} height={25} style={{filter: (chain === 'kub' || chain === '') ? "grayscale(0)" : "grayscale(1)"}} /></button>
                    <button className="text-white hover:bg-neutral-800 focus:outline-none rounded-lg p-2 cursor-pointer" onClick={() => {if (chain !== 'monad') {handleChain('monad');}}}><Image src="/monad.jpg" alt="" width={25} height={25} style={{filter: chain === 'monad' ? "grayscale(0)" : "grayscale(1)"}} /></button>
                </div>
            }
            {connections && account.address !== undefined &&
                <Link href={"/pump/launchpad/portfolio?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite") + "&addr=" + account.address} prefetch={false} className={"underline hover:font-bold " + (chain === 'kub' ? "text-emerald-300" : "") + (chain === 'monad' ? "text-purple-300" : "")}>Portfolio</Link>
            }
            <Link href={"/pump/launchpad/leaderboard?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className={"underline hover:font-bold " + (chain === 'kub' ? "text-emerald-300" : "") + (chain === 'monad' ? "text-purple-300" : "")}>Leaderboard</Link>
        </div>
    );
}
