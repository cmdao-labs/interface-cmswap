'use client';
import { redirect } from 'next/navigation';
import { useAccount } from "wagmi";

export default function Home() {
    const { chainId } = useAccount();
    if (chainId === 25925 || chainId === null || chainId === undefined) redirect('/pump/launchpad?chain=kubtestnet&mode=pro')
    else if(chainId === 96) redirect('https://www.cmswap.fun/pump/launchpad?chain=kub&mode=pro');
    else if(chainId === 10143) redirect('https://www.cmswap.fun/pump/launchpad?chain=monad&mode=pro');
}
