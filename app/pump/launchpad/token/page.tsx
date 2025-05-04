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
    if (chain === 'unichain') {
        chainId = 130;
        facAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    } else if (chain === 'base') {
        chainId = 8453;
        facAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    }
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
    }>;
  }) {
    const searchParams = await props.searchParams;
    const mode = searchParams?.mode || '';
    const chain = searchParams?.chain || '';
    const ticker = searchParams?.ticker || '';
    const lp = searchParams?.lp || '';
    
    return (
        <Trade mode={mode} chain={chain} ticker={ticker} lp={lp} />
    )
}
