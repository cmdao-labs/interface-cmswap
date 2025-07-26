'use client';
import { redirect } from 'next/navigation';
import { useAccount } from "wagmi";

export default function Home() {
  const { chainId } = useAccount()
  if(chainId === 96){
    redirect('/pump/launchpad?chain=kub&mode=pro');
  }else if(chainId === 10143){
    redirect('/pump/launchpad?chain=monad&mode=pro');
  }else if(chainId === 25925){
    redirect('/pump/launchpad?chain=kubtestnet&mode=pro');
  }
}
