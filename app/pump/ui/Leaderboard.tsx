import Image from "next/image";
import Jazzicon from '@raugfer/jazzicon';
import { connection } from 'next/server';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
import { unichain, base } from 'viem/chains';
import { config } from '@/app/config';
import { readContracts, getBalance } from '@wagmi/core';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { aggregatorV3InterfaceABI } from '@/app/pump/abi/Chainlink';
import { dataxp } from "@/app/pump/blob/data";
const buildDataUrl = (address: string): string => {
  return 'data:image/svg+xml;base64,' + btoa(Jazzicon(address));
};

export default async function Leaderboard({
  rankby, mode, chain,
}: {
  rankby: string;
  mode: string;
  chain: string;
}) {
  await connection();

  let priceFeed: any = [];
  if (mode === 'pro') {
    const publicClientOracle = createPublicClient({ 
      chain: base,
      transport: http(process.env.BASE_RPC as string)
    });
    priceFeed = await publicClientOracle.readContract({
      address: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
      abi: aggregatorV3InterfaceABI,
      functionName: 'latestRoundData',
    });
  }

  let _chain: any = null;
  let _chainId = 0;
  let _explorer = '';
  let _rpc = '';
  if (chain === 'unichain' || chain === '') {
      _chain = unichain;
      _chainId = 130;
      _explorer = 'https://unichain.blockscout.com/';
  } else if (chain === 'base') {
      _chain = base;
      _chainId = 8453;
      _explorer = 'https://base.blockscout.com/';
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
  let v2routerAddr: string = '';
  let currencyLp: string = '';
  if ((chain === 'unichain' || chain === '') && (mode === 'lite' || mode === '')) {
    currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    _blockcreated = 8581591;
    v2facAddr = '0x1f98400000000000000000000000000000000002';
    v2routerAddr = '0x284f11109359a7e1306c3e447ef14d38400063ff';
    currencyLp = '0x8E2D7f0F8b3A4DEFa2e00f85254C77F3FcD26053';
  } else if ((chain === 'unichain' || chain === '') && mode === 'pro') {
    currencyAddr = '0x4200000000000000000000000000000000000006';
    bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    _blockcreated = 8581591;
    v2facAddr = '0x1f98400000000000000000000000000000000002';
    v2routerAddr = '0x284f11109359a7e1306c3e447ef14d38400063ff';
    currencyLp = '0x8E2D7f0F8b3A4DEFa2e00f85254C77F3FcD26053';
  } else if (chain === 'base' && (mode === 'lite' || mode === '')) {
    currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    _blockcreated = 26462082;
    v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    v2routerAddr = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24';
    currencyLp = '0x656D7c47e9Dd3035784d5e56b7F2b118BBA7E324';
  } else if (chain === 'base' && mode === 'pro') {
    currencyAddr = '0x4200000000000000000000000000000000000006';
    bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    _blockcreated = 26462082;
    v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
    v2routerAddr = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24';
    currencyLp = '0x656D7c47e9Dd3035784d5e56b7F2b118BBA7E324';
  }
  const dataofcurr = {addr: currencyAddr, lp: currencyLp, blockcreated: _blockcreated};
  const dataofuniv2factory = {addr: v2facAddr};
  const dataofuniv2router = {addr: v2routerAddr};
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

  const bkgafactoryLiteContract = {
    address: '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4',
    abi: ERC20FactoryABI,
    chainId: _chainId,
  } as const

  const tokenCount = await readContracts(config, {contracts: [{ ...bkgafactoryContract, functionName: 'totalIndex', },],});
  const init: any = {contracts: []};
  for (let i = 0; i <= Number(tokenCount[0].result) - 1; i++) {
    init.contracts.push(
        {
          ...bkgafactoryContract,
          functionName: 'index',
          args: [BigInt(i + 1)],
        }
    );
  }
  const tokenList: any = await readContracts(config, init);
  const _resLpList = tokenList.map(async (res: any) => {
    return await readContracts(config, {
      contracts: [
        {
          ...univ2factoryContract,
          functionName: 'getPair',
          args: [res.result!, dataofcurr.addr as '0xstring'],
        },
      ],
    });
  });
  const resLpList: any = await Promise.all(_resLpList);
  const lpList: any = resLpList.map((res: any) => {return res[0].result!.toUpperCase();});
  lpList.push('0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase(), bkgafactoryAddr.toUpperCase(), dataofcurr.lp.toUpperCase());

  let rank: any = [];
  if (rankby === '' || rankby === 'xp') {
    const lpList2: any = resLpList.map((res: any) => {return res[0].result!;});
    const lpList2UpperCase: any = resLpList.map((res: any) => {return res[0].result!.toUpperCase();});
    const init2: any = {contracts: []};
    for (let i = 0; i <= lpList2.length - 1; i++) {
      init2.contracts.push(
          {
            address: lpList2[i],
            abi: UniswapV2PairABI,
            functionName: 'token0',
            chainId: _chainId,
          }
      );
    }
    const fetchtoken0: any = await readContracts(config, init2);
    rank = Object.values((await publicClient.getContractEvents({
      abi: UniswapV2PairABI,
      address: lpList2,
      eventName: 'Swap',
      fromBlock: BigInt(dataofcurr.blockcreated),
      toBlock: 'latest',
    })).map((res) => {
      if (fetchtoken0[lpList2UpperCase.indexOf(res.address.toUpperCase())].result.toUpperCase() === currencyAddr.toUpperCase()) {
        if (Number(res.args.amount1In) === 0) {
          return {addr: res.args.to, value: Number(formatEther(res.args.amount0In as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
        } else {
          return {addr: res.args.to, value: Number(formatEther(res.args.amount0Out as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
        }
      } else {
        if (Number(res.args.amount0In) === 0) {
          return {addr: res.args.to, value: Number(formatEther(res.args.amount1In as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
        } else {
          return {addr: res.args.to, value: Number(formatEther(res.args.amount1Out as bigint)) / (mode !== 'pro' ? 1000000 : 0.00001)};
        }
      }
    }).reduce((a: any, b: any) => {
      if (a[b.addr.toUpperCase()]) {
        a[b.addr.toUpperCase()].value += b.value
      } else {
        a[b.addr.toUpperCase()] = b
      }
      return a
    }, {})).map((res: any) => {
      let questxp = 0;
      if (dataxp.map(i => i.addr).indexOf(res.addr.toUpperCase()) !== -1) {
        questxp += dataxp[dataxp.map(i => i.addr).indexOf(res.addr.toUpperCase())].xp;
      }
      let lvl = 1;
      if (res.value + questxp >= 25900) {
        lvl = 10;
      } else if (res.value + questxp >= 20900) {
        lvl = 9;
      } else if (res.value + questxp >= 16350) {
        lvl = 8;
      } else if (res.value + questxp >= 12150) {
        lvl = 7;
      } else if (res.value + questxp >= 8350) {
        lvl = 6;
      } else if (res.value + questxp >= 5150) {
        lvl = 5;
      } else if (res.value + questxp >= 2950) {
        lvl = 4;
      } else if (res.value + questxp >= 1450) {
        lvl = 3;
      } else if (res.value + questxp >= 550) {
        lvl = 2;
      }
      return {addr: res.addr, value: Number(res.value + questxp).toFixed(0), lvl: lvl}
    }).sort((a: any, b: any) => {return b.value - a.value});

  } else if (rankby === 'networth') {
    let lpListLite: any = [];
    if (mode === 'pro') {
      const tokenCountLite = await readContracts(config, {contracts: [{ ...bkgafactoryLiteContract, functionName: 'totalIndex', },],});
      const initLite: any = {contracts: []};
      for (let i = 0; i <= Number(tokenCountLite[0].result) - 1; i++) {
        initLite.contracts.push(
            {
              ...bkgafactoryLiteContract,
              functionName: 'index',
              args: [BigInt(i + 1)],
            }
        );
      }
      const tokenListLite: any = await readContracts(config, initLite);
      const _lpListLite = tokenListLite.map(async (res: any) => {
        return await readContracts(config, {
          contracts: [
            {
              ...univ2factoryContract,
              functionName: 'getPair',
              args: [res.result!, '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142'],
            },
          ],
        });
      });
      const reslpListLite: any = await Promise.all(_lpListLite);
      lpListLite = reslpListLite.map((res: any) => {return res[0].result!.toUpperCase();});
      lpListLite.push('0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase(), '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4'.toUpperCase(), '0x8E2D7f0F8b3A4DEFa2e00f85254C77F3FcD26053'.toUpperCase());
    }
    const getEOA = await publicClient.getContractEvents({
      abi: erc20Abi,
      address: '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142',
      eventName: 'Transfer',
      fromBlock: BigInt(dataofcurr.blockcreated),
      toBlock: 'latest',
    });
    const _getRelatedCA = getEOA.map(async (res) => {
      return await publicClient.getTransaction({ 
        hash: res.transactionHash,
      });
    });
    const getRelatedCA = await Promise.all(_getRelatedCA);
    const relatedEOA = getEOA.filter((res, index) => {
      return (getRelatedCA[index].to !== null && (getRelatedCA[index].to!.toUpperCase() === '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4'.toUpperCase() || getRelatedCA[index].to!.toUpperCase() === dataofuniv2router.addr.toUpperCase()))
    });
    const from = relatedEOA.map((res) => {return res.args.from;});
    const to = relatedEOA.map((res) => {return res.args.to;});
    const excludedEOA = [...new Set(from.concat(to))].filter((res: any) => {if (mode === 'pro') {return lpListLite.indexOf(res.toUpperCase()) === -1} else {return lpList.indexOf(res.toUpperCase()) === -1}});
    if (mode !== 'pro') {tokenList.push({result: dataofcurr.addr});}
    const init2: any = {contracts: []};
    const arrListbal = [];
    for (let ii = 0; ii <= excludedEOA.length - 1; ii++) {
      for (let i = 0; i <= tokenList.length - 1; i++) {
        init2.contracts.push(
            {
              address: tokenList[i].result,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [excludedEOA[ii] as '0xstring'],
              chainId: _chainId,
            }
        );
        arrListbal.push({addr: excludedEOA[ii], token: tokenList[i].result})
      }
    }
    const resBal = await readContracts(config, init2);
    const listbal = arrListbal.map((res, index) => {return {addr: res.addr, token: res.token.toUpperCase(), value: Number(formatEther(resBal[index].result as bigint))}});    
    const lpArr = resLpList.map((res: any, index: any) => {return {token: tokenList[index].result, lp: res[0].result};}).concat([{token: dataofcurr.addr, lp: dataofcurr.lp}]);
    const _fetchlp = lpArr.map(async (res: any) => {
      return await readContracts(config, {
        contracts: [
          {
              address: res.lp,
              abi: UniswapV2PairABI,
              functionName: 'getReserves',
              chainId: _chainId,
          },
          {
              address: res.lp,
              abi: UniswapV2PairABI,
              functionName: 'token0',
              chainId: _chainId,
          },
        ],
      });
    });
    const fetchlp = await Promise.all(_fetchlp);
    const reslp = fetchlp.map((item: any, index: any) => {
      const price = item[1].result.toUpperCase() === dataofcurr.addr.toUpperCase() ? 
        Number((Number(formatEther(item[0].result[0])) / Number(formatEther(item[0].result[1])))) :
        Number((Number(formatEther(item[0].result[1])) / Number(formatEther(item[0].result[0]))));
      return {token: lpArr[index].token.toUpperCase(), price: lpArr[index].token.toUpperCase() === dataofcurr.addr.toUpperCase() ? 1 : price}
    })
    const calvalue = listbal.map((res) => {
      return {addr: res.addr, value: reslp[reslp.map((i) => i.token).indexOf(res.token)].price * res.value * (mode === 'pro' ? Number(priceFeed[1] / BigInt(1e8)) : 1)}
    })
    for (let ii = 0; mode === 'pro' && ii <= excludedEOA.length - 1; ii++) {
      const ethBal = await getBalance(config, {
        address: excludedEOA[ii] as '0xstring',
        chainId: _chainId,
      })
      calvalue.push({addr: excludedEOA[ii], value: Number(formatEther(ethBal.value)) * (mode === 'pro' ? Number(priceFeed[1] / BigInt(1e8)) : 1)})
    }
    rank = Object.values(calvalue.reduce((a: any, b: any) => {
      if (a[b.addr.toUpperCase()]) {
        a[b.addr.toUpperCase()].value += b.value
      } else {
        a[b.addr.toUpperCase()] = b
      }
      return a
    }, {})).sort((a: any, b: any) => {return b.value - a.value});
  }

  return (
    <div className="w-full rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center">
        {rank.map((item: any, index: any) => {
          return <div className={"w-full h-[70px] flex flex-row items-center justify-around sm:gap-2 sm:px-14 sm:py-10 text-xs sm:text-xl " + (index !== 0 && "border-t border-gray-800")} key={index}>
              <span className="w-[20px] text-left">{index + 1}</span>
              <div className="w-1/3 sm:w-1/2 flex flex-row items-center justify-start gap-2 sm:gap-10">
              <div className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden relative">
                  <Image src={buildDataUrl(item.addr)} alt="jazzicon" fill />
              </div>
              <span>{item.addr.slice(0, 5) + '...' + item.addr.slice(37)}</span>
              </div>
              <div className="w-1/4 flex flex-row items-center justify-between sm:gap-10">
                {(rankby === '' || rankby === 'xp') &&
                  <>
                    <span className="font-bold">LVL {item.lvl}</span>
                    <span>{item.value} XP</span>
                  </>
                }
                {rankby === 'networth' && <span className="font-bold w-full text-right">{mode === 'pro' ? '$' : '฿'}{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(item.value)}</span>}
              </div>
          </div>
        })}
    </div>
  );
}
