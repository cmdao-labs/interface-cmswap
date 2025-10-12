'use client';
import { redirect } from 'next/navigation';
import { useAccount } from "wagmi";

export default function Home() {
    const { chainId } = useAccount();
    if (chainId === 25925 || chainId === null || chainId === undefined) redirect('/pump/launchpad?chain=kubtestnet&mode=pro');
}
