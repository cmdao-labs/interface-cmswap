import type { Metadata } from 'next'
import { readContracts } from '@wagmi/core';
import { erc20Abi } from 'viem';
import Trade from "@/app/components/pump/Trade";
import { config } from '@/config/reown'

export async function generateMetadata(
    props: {
        searchParams?: Promise<{
          mode?: string;
          chain?: string;
          ticker?: string;
          lp?: string;
        }>;
    }
): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const chain = searchParams?.chain || '';
    const ticker = searchParams?.ticker || '';
    let chainId = 0;
    let facAddr = '';
    if (chain === 'kubtestnet' || chain === '') {
        chainId = 25925;
        facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    } // add chain here
    
    const result = await readContracts(config, {
        contracts: [
            { address: ticker as '0xstring', abi: erc20Abi, functionName: 'symbol', chainId: chainId },
        ],
    })

    return {
        title: result[0].result + " | CMswap - PUMP",
    }
}

export default async function Ticker(props: {
    searchParams?: Promise<{
      mode?: string;
      chain?: string;
      ticker?: string;
      lp?: string;
      token?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const mode = searchParams?.mode || '';
    const chain = searchParams?.chain || '';
    const ticker = searchParams?.ticker || '';
    const lp = searchParams?.lp || '';
    const token = searchParams?.token || '';
    
    return (
        <Trade mode={mode} chain={chain} ticker={ticker} lp={lp} token={token} />
    )
}
