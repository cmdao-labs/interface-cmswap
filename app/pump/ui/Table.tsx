import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { erc20Abi } from 'viem'
import { config } from '@/app/config';
import { ERC20FactoryETHABI } from '@/app/pump/abi/ERC20FactoryETH';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export default async function Table({
  mode, query, sort, order, chain, token,
}: {
  mode: string;
  query: string;
  sort: string;
  order: string;
  chain: string;
  token: string;
}) {
  await connection();

  let _chainId = 0;
  if (chain === 'kub' || chain === '') {
    _chainId = 96;
  } else if (chain === 'monad') {
    _chainId = 10143;
  } // add chain here
  let currencyAddr: string = '';
  let bkgafactoryAddr: string = '';
  let v2facAddr: string = '';
  if ((chain === 'kub' || chain === '') && (mode === 'lite' || mode === '') && (token === 'cmm' || token === '')) {
    currencyAddr = '0x9b005000a10ac871947d99001345b01c1cef2790';
    bkgafactoryAddr = '0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62';
    v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
  } else if ((chain === 'kub' || chain === '') && mode === 'pro') {
    currencyAddr = '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5';
    bkgafactoryAddr = '0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56';
    v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
  } else if (chain === 'monad' && mode === 'pro') {
    currencyAddr = '0x760afe86e5de5fa0ee542fc7b7b713e1c5425701';
    bkgafactoryAddr = '0x6dfc8eecca228c45cc55214edc759d39e5b39c93';
    v2facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
  } // add chain and mode here
  const dataofcurr = {addr: currencyAddr};
  const dataofuniv2factory = {addr: v2facAddr};
  const bkgafactoryContract = {
    address: bkgafactoryAddr as '0xstring',
    abi: ERC20FactoryETHABI,
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
  const result4 = result.map(async (res: any) => {
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
        {
          ...bkgafactoryContract,
          functionName: 'creator',
          args: [res.result!],
        },
        {
          ...bkgafactoryContract,
          functionName: 'createdTime',
          args: [res.result!],
        },
      ],
    });
  })
  const result44 = await Promise.all(result4);
  const result5 = result44.map(async (res) => {
    return await readContracts(config, {
      contracts: [
        {
          address: res[2].result!,
          abi: UniswapV2PairABI,
          functionName: 'slot0',
          chainId: _chainId,
        },
        {
          address: res[2].result!,
          abi: UniswapV2PairABI,
          functionName: 'token0',
          chainId: _chainId,
        },
      ],
    });
  });
  const result55 = await Promise.all(result5);
  const resultfinal = result44.map((item, index) => {
    const mcap = result55[index][1].result!.toUpperCase() !== dataofcurr.addr.toUpperCase() ? 
      ((Number(result55[index][0].result![0]) / (2 ** 96)) ** 2) * 1000000000 : 
      (1 / ((Number(result55[index][0].result![0]) / (2 ** 96)) ** 2)) * 1000000000;
    return [{result: item[0].result}, {result: item[1].result}, {result: item[2].result}, {result: mcap}, {result: result55[index][1].result}, {result: Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(mcap)}, {result: item[3].result}, {result: Number(item[4].result)}, {result: result[index].result}]
  })

  return (
    <div className="w-full h-full flex flex-row flex-wrap items-start justify-start overflow-visible" style={{zIndex: 1}}>
        {resultfinal.filter(
          (res: any) => {if (query !== '') {return res[0].result!.toLowerCase().includes(query.toLowerCase())} else {return res}}
        ).sort(
          (a: any, b: any) => {if (sort === 'created' && order === 'ascending') {return Number(b[7].result.timestamp) - Number(a[7].result.timestamp)} else if (sort === 'created' && order === 'descending') {return Number(a[7].result.timestamp) - Number(b[7].result.timestamp)} else if (sort === 'mcap' && order === 'ascending') {return b[3].result - a[3].result} else if (sort === 'mcap' && order === 'descending') {return a[3].result - b[3].result} else {return b[3].result - a[3].result}}
        ).map((res: any, index) => 
          <div key={index} className="p-2 w-full 2xl:w-1/3">
              <Link href={"launchpad/token?ticker=" + res[8].result + '&lp=' + res[2].result + '&chain=' + chain + (mode === 'pro' ? '&mode=pro' : '&mode=lite')} prefetch={false} className="group w-full h-[220px] flex flex-row item-center justify-around bg-gray-800 shadow-xl rounded-lg">
                <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center overflow-hidden flex flex-wrap content-center justify-center">
                  <div className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] group-hover:w-[180px] group-hover:h-[180px] relative">
                    <Image src={res[1].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + res[1].result!.slice(7) : "https://gateway.commudao.xyz/ipfs/" + res[1].result!} alt="token_waiting_for_approve" fill />
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-6 item-center justify-center">
                  <span className="font-bold text-2xl truncate">{res[0].result}</span>
                  <span className="text-emerald-300 font-bold text-xl">{res[5].result} {chain === 'kub' && mode === 'pro' && 'KUB'}{chain === 'kub' && mode === 'lite' && (token === 'cmm' || token === '') && 'CMM'}{chain === 'monad' && mode === 'pro' && 'MON'}</span>
                  <span className="text-xs">[CA: {res[8].result!.slice(0, 5)}...{res[8].result!.slice(37)}]</span>
                  <span className="text-xs">
                  Creator: {res[6].result.slice(0, 5)}...{res[6].result.slice(37)} ····· {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result) < 60 && rtf.format(Number(res[7].result) - Number(Number(Date.now() / 1000).toFixed(0)), 'second')
                  }
                  {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result) >= 60 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result) < 3600 && rtf.format(Number(Number((Number(res[7].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 60).toFixed(0)), 'minute')
                  }
                  {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result) >= 3600 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result) < 86400 && rtf.format(Number(Number((Number(res[7].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 3600).toFixed(0)), 'hour')
                  }
                  {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result) >= 86400 && rtf.format(Number(Number((Number(res[7].result) - Number(Number(Date.now() / 1000).toFixed(0))) / 86400).toFixed(0)), 'day')
                  }
                  </span>
                </div>
              </Link>
          </div>
        )}
    </div>
  );
}
