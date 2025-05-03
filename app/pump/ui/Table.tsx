import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem'
import { unichain, base } from 'viem/chains';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export default async function Table({
  mode, query, sort, order, chain,
}: {
  mode: string;
  query: string;
  sort: string;
  order: string;
  chain: string;
}) {
  await connection();

  let _chain: any = null;
  let _chainId = 0;
  let _rpc = '';
  if (chain === 'unichain' || chain === '') {
    _chain = unichain;
    _chainId = 130;
    _rpc = process.env.UNI_RPC as string;
  } else if (chain === 'base') {
    _chain = base;
    _chainId = 8453;
    _rpc = process.env.BASE_RPC as string;
  }
  const publicClient = createPublicClient({ 
    chain: _chain,
    transport: http(_rpc)
  });
  let currencyAddr: string = '';
  let bkgafactoryAddr: string = '';
  let _blockcreated: number = 1;
  let v2facAddr: string = '';
  if ((chain === 'unichain' || chain === '') && (mode === 'lite' || mode === '')) {
    currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    _blockcreated = 8581591;
    v2facAddr = '0x1f98400000000000000000000000000000000002';
  } else if ((chain === 'unichain' || chain === '') && mode === 'pro') {
    currencyAddr = '0x4200000000000000000000000000000000000006';
    bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    _blockcreated = 8581591;
    v2facAddr = '0x1f98400000000000000000000000000000000002';
  } else if (chain === 'base' && (mode === 'lite' || mode === '')) {
    currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    _blockcreated = 26462082;
    v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
  } else if (chain === 'base' && mode === 'pro') {
    currencyAddr = '0x4200000000000000000000000000000000000006';
    bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    _blockcreated = 26462082;
    v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
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
          functionName: 'getPair',
          args: [res.result!, dataofcurr.addr as '0xstring'],
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
          functionName: 'getReserves',
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
  const result6 = result.map(async (res: any) => {
    return await publicClient.getContractEvents({
      abi: erc20Abi,
      address: res.result!,
      eventName: 'Transfer',
      args: { 
        from: '0x0000000000000000000000000000000000000000',
      },
      fromBlock: BigInt(dataofcurr.blockcreated),
      toBlock: 'latest',
    });
  });
  const result66 = await Promise.all(result6);
  const result7 = result66.map(async (res) => {
    return await publicClient.getTransaction({ 
      hash: res[0].transactionHash,
    })
  });
  const result77 = await Promise.all(result7);
  const result8 = result77.map(async (res) => {
    return await publicClient.getBlock({ 
      blockNumber: res.blockNumber,
    })
  });
  const result88 = await Promise.all(result8);
  const resultfinal = result44.map((item, index) => {
    const mcap = result55[index][1].result!.toUpperCase() === dataofcurr.addr.toUpperCase() ? 
      Number((Number(formatEther(result55[index][0].result![0])) / Number(formatEther(result55[index][0].result![1]))) * 1000000000) :
      Number((Number(formatEther(result55[index][0].result![1])) / Number(formatEther(result55[index][0].result![0]))) * 1000000000);
    return [{result: item[0].result}, {result: item[1].result}, {result: item[2].result}, {result: mcap}, {result: result55[index][1].result}, {result: Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(mcap)}, {result: result77[index]}, {result: result88[index]}, {result: result[index].result}]
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
                  <span className="text-emerald-300 font-bold text-xl">{res[5].result} {mode === 'pro' ? '$ETH' : '$THB'}</span>
                  <span className="text-xs">[CA: {res[8].result!.slice(0, 5)}...{res[8].result!.slice(37)}]</span>
                  <span className="text-xs">
                  Creator: {res[6].result.from.slice(0, 5)}...{res[6].result.from.slice(37)} ····· {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result.timestamp) < 60 && rtf.format(Number(res[7].result.timestamp) - Number(Number(Date.now() / 1000).toFixed(0)), 'second')
                  }
                  {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result.timestamp) >= 60 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result.timestamp) < 3600 && rtf.format(Number(Number((Number(res[7].result.timestamp) - Number(Number(Date.now() / 1000).toFixed(0))) / 60).toFixed(0)), 'minute')
                  }
                  {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result.timestamp) >= 3600 && Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result.timestamp) < 86400 && rtf.format(Number(Number((Number(res[7].result.timestamp) - Number(Number(Date.now() / 1000).toFixed(0))) / 3600).toFixed(0)), 'hour')
                  }
                  {
                    Number(Number(Date.now() / 1000).toFixed(0)) - Number(res[7].result.timestamp) >= 86400 && rtf.format(Number(Number((Number(res[7].result.timestamp) - Number(Number(Date.now() / 1000).toFixed(0))) / 86400).toFixed(0)), 'day')
                  }
                  </span>
                </div>
              </Link>
          </div>
        )}
    </div>
  );
}
