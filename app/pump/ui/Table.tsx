import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { readContracts } from '@wagmi/core';
import { erc20Abi, formatEther, parseEther } from 'viem'
import { config } from '@/app/config';
import { ERC20FactoryETHABI } from '@/app/pump/abi/ERC20FactoryETH';
import { ERC20FactoryV2ABI } from '@/app/pump/abi/ERC20FactoryV2';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { bitkub, monadTestnet, bitkubTestnet } from "viem/chains";
import { ERC20FactoryABI } from "../abi/ERC20Factory";

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

  let _chain: any = null;
  let _chainId = 0;
  let _explorer = "";
  let _rpc = "";
  let _blockcreated = BigInt(0);
  if (chain === "kub" || chain === "") {
    _chain = bitkub;
    _chainId = 96;
    _explorer = "https://www.kubscan.com/";
      _blockcreated = BigInt(23935659)
  } else if (chain === "monad") {
    _chain = monadTestnet;
    _chainId = 10143;
    _explorer = "https://monad-testnet.socialscan.io/";
    _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
      _blockcreated = BigInt(23935659)
  } else if (chain === 'kubtestnet'){
      _chain = bitkubTestnet;
      _chainId = 25925;
      _explorer = 'https://testnet.kubscan.com/';
      _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
      _blockcreated = BigInt(23935659)
  } // add chain here
  const publicClient = createPublicClient({
    chain: _chain,
    transport: http(_rpc),
  });

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
  } else if (chain === 'kubtestnet' && mode === 'pro') {
        currencyAddr = '0x700D3ba307E1256e509eD3E45D6f9dff441d6907';
        bkgafactoryAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
        v2facAddr = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b';
    }// add chain and mode here
  const dataofcurr = {addr: currencyAddr};
  const dataofuniv2factory = {addr: v2facAddr};
  const bkgafactoryContract = {
    address: bkgafactoryAddr as '0xstring',
    abi: chain === 'kubtestnet' ? ERC20FactoryV2ABI : ERC20FactoryETHABI  ,
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


type ContractReadResult = { status: "success"; result: string } | { status: "failure"; error: Error };

const resultfinal = await (async () => {
  let result: ContractReadResult[] = [];
  let result44: any[] = [];

  if (chain === 'kubtestnet') {
    const logCreateData = await publicClient.getContractEvents({
      address: bkgafactoryContract.address,
      abi: bkgafactoryContract.abi,
      eventName: 'Creation',
      fromBlock: BigInt(_blockcreated),
      toBlock: 'latest',
    });

const poolDataPromises = logCreateData.map(async (res: any) => {
  const tokenData = await readContracts(config, {
    contracts: [
      {
        address: res.args.tokenAddr as `0x${string}`,
        abi: erc20Abi,
        functionName: 'symbol',
        chainId: _chainId,
      },
      {
        address: res.args.tokenAddr as `0x${string}`,
        abi: erc20Abi,
        functionName: 'totalSupply',
        chainId: _chainId,
      },
      {
        ...bkgafactoryContract,
        functionName: 'pumpReserve',
        args : [res.args.tokenAddr as '0xstring'],
        chainId: _chainId,
      },
      {
        ...bkgafactoryContract,
        functionName: 'virtualAmount',
        chainId: _chainId,
      },
    ],
  });

  return {
    tokenAddress: res.args.tokenAddr as `0x${string}`,
    creator: res.args.creator as `0x${string}`,
    logo:
      res.args.logo &&
      res.args.logo.startsWith("ipfs://") &&
      !res.args.logo.startsWith("ipfs://undefined")
        ? res.args.logo
        : res.args.link1,
    createdTime: Number(res.args.createdTime),
    description: res.args.description,
    tokenSymbol: tokenData[0].status === 'success' ? tokenData[0].result : undefined,
    totalSupply: tokenData[1].status === 'success' ? tokenData[1].result : undefined,
    pumpReserve: tokenData[2].status === 'success' ? tokenData[2].result : undefined,
    virtualAmount: tokenData[3].status === 'success' ? tokenData[3].result : undefined
  };
});


    result44 = await Promise.all(poolDataPromises);
  } else {
    result = await readContracts(config, init) as ContractReadResult[];;
    
    const result4Promises = result.map(async (res: ContractReadResult) => {
      if (res.status === 'success') {
        return await readContracts(config, {
          contracts: [
            {
              address: res.result as '0xstring',
              abi: erc20Abi,
              functionName: 'symbol',
              chainId: _chainId,
            },
            {
              ...bkgafactoryContract,
              functionName: 'logo',
              args: [res.result as '0xstring'],
            },
            {
              ...univ2factoryContract,
              functionName: 'getPool',
              args: [res.result as '0xstring', dataofcurr.addr as `0x${string}`, 10000],
            },
            {
              ...bkgafactoryContract,
              functionName: 'creator',
              args: [res.result as '0xstring'],
            },
            {
              ...bkgafactoryContract,
              functionName: 'createdTime',
              args: [res.result as '0xstring'],
            },
            {
              ...bkgafactoryContract,
              functionName: 'desp',
              args: [res.result as '0xstring'],
            },
          ],
        });
      }
      return [];
    });

    result44 = await Promise.all(result4Promises);
  }

  const result5Promises = result44.map(async (res: any[]) => {
    if (!res[2]?.result) return [];
    return await readContracts(config, {
      contracts: [
        {
          address: res[2].result,
          abi: UniswapV2PairABI,
          functionName: 'slot0',
          chainId: _chainId,
        },
        {
          address: res[2].result,
          abi: UniswapV2PairABI,
          functionName: 'token0',
          chainId: _chainId,
        },
      ],
    });
  });

  const result55 = await Promise.all(result5Promises);
  
  return result44.map((item, index) => {

    if(chain === 'kubtestnet'){
      /// virtual No Liquidity Pool      
      const pump0 = Number(item.pumpReserve[0]);
      const pump1 = Number(item.pumpReserve[1]);
      const virtualAmount = Number(item.virtualAmount);

      const price = (pump0 + virtualAmount) / pump1;
      const supplyReadable = formatEther(item.totalSupply.toString());
      const mcap = parseFloat(supplyReadable) * price;

      console.log("supply", supplyReadable);
      console.log("price", price);
      console.log("mcap", mcap);


      return [
        { result: item.tokenSymbol || '' }, // symbol
        { result: item.logo || '' }, // logo
        { result: '0x0000000000000000000000000000000000000000' }, // pool
        { result: mcap }, // mcap
        { result: '0x0000000000000000000000000000000000000000' }, // token0
        { result: Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(mcap) }, // formatted mcap
        { result: item.creator || '' }, // creator
        { result: Number(item.createdTime) || 0 }, // createdTime
        { result: item.tokenAddress || {} }, // original result
        { result: item.description || '' } // description
      ];
    }else{
      if (!item[2]?.result || !result55[index][0]?.result) return [];
      console.log(result)
    
    const mcap = result55[index][1].result?.toUpperCase() !== dataofcurr.addr.toUpperCase()
      ? ((Number(result55[index][0].result[0]) / (2 ** 96)) ** 2) * 1000000000
      : (1 / ((Number(result55[index][0].result[0]) / (2 ** 96)) ** 2)) * 1000000000;

    return [
      { result: item?.[0].result || '' }, // symbol
      { result: item[1]?.result || '' }, // logo
      { result: item[2]?.result || '' }, // pool
      { result: mcap }, // mcap
      { result: result55[index][1]?.result || '' }, // token0
      { result: Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(mcap) }, // formatted mcap
      { result: item[3]?.result || '' }, // creator
      { result: Number(item[4]?.result) || 0 }, // createdTime
      { result: result[index].status === 'success' ? result[index].result : '0x0000000000000000000000000000000000000000' }, // original result
      { result: item[5]?.result || '' } // description
    ];}}

)}

)();
/*     console.log('resultfinal:', resultfinal); */


  return (
    <div className="w-full h-full flex flex-row flex-wrap items-start justify-start overflow-visible" style={{zIndex: 1}}>
        {resultfinal.filter(
          (res: any) => {if (query !== '') {return res[0].result!.toLowerCase().includes(query.toLowerCase())} else {return res}}
        ).sort(
          (a: any, b: any) => {if (sort === 'created' && order === 'ascending') {return Number(b[7].result) - Number(a[7].result)} else if (sort === 'created' && order === 'descending') {return Number(a[7].result) - Number(b[7].result)} else if (sort === 'mcap' && order === 'ascending') {return b[3].result - a[3].result} else if (sort === 'mcap' && order === 'descending') {return a[3].result - b[3].result} else {return b[3].result - a[3].result}}
        ).map((res: any, index) => 
          <div key={index} className="p-2 w-full 2xl:w-1/3 hover:scale-[1.02]">
            <Link
              href={`launchpad/token?ticker=${res[8].result}${res[2].result !== "0x0000000000000000000000000000000000000000" ? `&lp=${res[2].result}` : ''}&chain=${chain}${mode === 'pro' ? '&mode=pro' : '&mode=lite'}`}
              prefetch={false}
              className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-800 shadow-xl rounded-lg"
            >
                <div className="h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] self-center overflow-hidden flex flex-wrap content-center justify-center">
                  <div className="h-full w-full relative">
                    <Image src={res[1].result!.slice(0, 7) === 'ipfs://' ? "https://cmswap.mypinata.cloud/ipfs/" + res[1].result!.slice(7) : "https://cmswap.mypinata.cloud/ipfs/" + res[1].result!} alt="token_waiting_for_approve" fill />
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-4 item-center justify-center">
                  <span className="font-mono font-bold text-2xl truncate">{res[0].result}</span>
                  {(() => {
                    let textColor = "";
                    let tokenSymbol = "";

                    if (chain === 'kub' ) {
                      textColor = "text-emerald-300";
                      if (mode === 'pro') tokenSymbol = 'KUB';
                      else if (mode === 'lite' && (token === 'cmm' || token === '')) tokenSymbol = 'CMM';
                    } else if (chain === 'monad') {
                      textColor = "text-purple-300";
                      if (mode === 'pro') tokenSymbol = 'MON';
                   } else if(chain === 'kubtestnet') {
                     textColor = "text-emerald-300";
                      if (mode === 'pro') tokenSymbol = 'tKUB';
                   }

                    return (
                      <span className={`font-bold text-xl ${textColor}`}>
                        {res[5].result} {tokenSymbol}
                      </span>
                    );
                  })()}

                  <span className="text-xs text-gray-500 truncate">{res[9].result}</span>
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
