import type { Metadata } from 'next'
import { readContracts } from '@wagmi/core';
import { erc20Abi } from 'viem';
import Trade from "@/app/pump/ui/Trade";
import { config } from '@/app/config'
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';

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
    if (chain === 'kub' || chain === '') {
        chainId = 96;
        facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
    } else if (chain === 'monad') {
        chainId = 10143;
        facAddr = '0x6dfc8eecca228c45cc55214edc759d39e5b39c93';
    } else if (chain === 'kubtestnet'){
        chainId = 25925;
        facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    }// add chain here
    
    const result = await readContracts(config, {
        contracts: [
            {
                address: ticker as '0xstring',
                abi: erc20Abi,
                functionName: 'symbol',
                chainId: chainId,
            },
            {
                address: facAddr as '0xstring',
                abi: ERC20FactoryABI,
                chainId: chainId,
                functionName: 'desp',
                args: [ticker as '0xstring'],
            },
        ],
    })

    return {
        title: result[0].result + " | CMswap - PUMP",
        description: result[1].result,
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
