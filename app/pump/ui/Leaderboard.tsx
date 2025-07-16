import Image from "next/image";
import Jazzicon from '@raugfer/jazzicon';
import { connection } from 'next/server';
import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
import { bitkub, monadTestnet, bitkubTestnet } from 'viem/chains';
import { config } from '@/app/config';
import { readContracts, getBalance } from '@wagmi/core';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
import { dataxp } from "@/app/pump/blob/data";
const buildDataUrl = (address: string): string => {
  return 'data:image/svg+xml;base64,' + btoa(Jazzicon(address));
};

export default async function Leaderboard({
  rankby, mode, chain, token,
}: {
  rankby: string;
  mode: string;
  chain: string;
  token: string;
}) {
  await connection();

  // let priceFeed: any = [0, 1];
  let _chain: any = null;
  let _chainId = 0;
  let _explorer = '';
  let _rpc = '';
  if (chain === 'kub' || chain === '') {
    _chain = bitkub;
    _chainId = 96;
    _explorer = 'https://www.kubscan.com/';
  } else if (chain === 'monad') {
    _chain = monadTestnet;
    _chainId = 10143;
    _explorer = 'https://monad-testnet.socialscan.io/';
    _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
  } else if (chain === 'kubtestnet'){
    _chain = bitkubTestnet;
    _chainId = 25925;
    _explorer = 'https://testnet.kubscan.com/';
    _rpc = 'https://rpc-testnet.bitkubchain.io' as string;
} // add chain here
  const publicClient = createPublicClient({ 
    chain: _chain,
    transport: http(_rpc)
  });
  let currencyAddr: string = '';
  let bkgafactoryAddr: string = '';
  let _blockcreated: number = 1;
  let v2facAddr: string = '';
  let v2routerAddr: string = '';
  if ((chain === 'kub' || chain === '') && (mode === 'lite' || mode === '') && (token === 'cmm' || token === '')) {
    currencyAddr = '0x9b005000a10ac871947d99001345b01c1cef2790';
    bkgafactoryAddr = '0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62';
    _blockcreated = 25229488;
    v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
    v2routerAddr = '0x3F7582E36843FF79F173c7DC19f517832496f2D8';
  } else if ((chain === 'kub' || chain === '') && mode === 'pro') {
    currencyAddr = '0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5';
    bkgafactoryAddr = '0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56';
    _blockcreated = 25232899;
    v2facAddr = '0x090c6e5ff29251b1ef9ec31605bdd13351ea316c';
    v2routerAddr = '0x3F7582E36843FF79F173c7DC19f517832496f2D8';
  } else if (chain === 'monad' && mode === 'pro') {
    currencyAddr = '0x760afe86e5de5fa0ee542fc7b7b713e1c5425701';
    bkgafactoryAddr = '0x6dfc8eecca228c45cc55214edc759d39e5b39c93';
    _blockcreated = 16912084;
    v2facAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    v2routerAddr = '0x5a16536bb85a2fa821ec774008d6068eced79c96'
  }  else if (chain === 'kubtestnet' && mode === 'pro') {
        currencyAddr = '0x700D3ba307E1256e509eD3E45D6f9dff441d6907';
        bkgafactoryAddr = '0x46a4073c830031ea19d7b9825080c05f8454e530';
       _blockcreated = 23935659;
        v2facAddr = '0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b';
    v2routerAddr = '0x3C5514335dc4E2B0D9e1cc98ddE219c50173c5Be'
    }  // add chain and mode here
  const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
  const dataofuniv2factory = {addr: v2facAddr};
  // const dataofuniv2router = {addr: v2routerAddr};
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

  // const bkgafactoryLiteContract = {
  //   address: '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4',
  //   abi: ERC20FactoryABI,
  //   chainId: _chainId,
  // } as const

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
          functionName: 'getPool',
          args: [res.result!, dataofcurr.addr as '0xstring', 10000],
        },
      ],
    });
  });
  const resLpList: any = await Promise.all(_resLpList);
  const lpList: any = resLpList.map((res: any) => {return res[0].result!.toUpperCase();});
  lpList.push('0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase(), bkgafactoryAddr.toUpperCase());

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
    if (chain === 'monad') {
      let fulldata: any[] = []
      const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
      const body = JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getAssetTransfers",
          params: [
              {
                  fromBlock: '0x' + Number(dataofcurr.blockcreated).toString(16),
                  toBlock: "latest",
                  toAddress: v2routerAddr,
                  excludeZeroValue: true,
                  category: ["external"]
              }
          ]
      })
      const response = await fetch(_rpc, {method: 'POST', headers: headers, body: body})
      const data = await response.json()
      data.result.transfers.map((res: any) => {
          fulldata.push({value: Number(formatEther(BigInt(res.rawContract.value))), addr: res.from})
      });
      const body2 = JSON.stringify({
          id: 2,
          jsonrpc: "2.0",
          method: "alchemy_getAssetTransfers",
          params: [
              {
                  fromBlock: '0x' + Number(dataofcurr.blockcreated).toString(16),
                  toBlock: "latest",
                  fromAddress: v2routerAddr,
                  excludeZeroValue: true,
                  category: ["external"]
              }
          ]
      })
      const response2 = await fetch(_rpc, {method: 'POST', headers: headers, body: body2})
      const data2 = await response2.json()
      data2.result.transfers.map((res: any) => {
          fulldata.push({value: Number(formatEther(BigInt(res.rawContract.value))), addr: res.to})
      });
      rank = Object.values(fulldata.reduce((a: any, b: any) => {
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
        return {addr: res.addr, value: Number(res.value + questxp).toFixed(2), lvl: lvl}
      }).sort((a: any, b: any) => {return b.value - a.value});
      // for (const addr of lpList2) {
      //   const individualBody = JSON.stringify({
      //     id: 1,
      //     jsonrpc: "2.0",
      //     method: "alchemy_getAssetTransfers",
      //     params: [
      //       {
      //         fromBlock: '0x' + Number(dataofcurr.blockcreated).toString(16),
      //         toBlock: "latest",
      //         toAddress: addr,
      //         contractAddresses: [dataofcurr.addr],
      //         excludeZeroValue: true,
      //         category: ["erc20"]
      //       }
      //     ]
      //   })
      //   const individualResponse = await fetch(_rpc, {
      //     method: 'POST', 
      //     headers: headers, 
      //     body: individualBody
      //   })
      //   const individualData = await individualResponse.json()
      //   individualData.result.transfers.map((res: any) => {
      //     fulldata.push({value: Number(formatEther(BigInt(res.rawContract.value))), addr: res.from})
      //   })
      //   const individualBody2 = JSON.stringify({
      //     id: 2,
      //     jsonrpc: "2.0",
      //     method: "alchemy_getAssetTransfers",
      //     params: [
      //       {
      //         fromBlock: '0x' + Number(dataofcurr.blockcreated).toString(16),
      //         toBlock: "latest",
      //         fromAddress: addr,
      //         contractAddresses: [dataofcurr.addr],
      //         excludeZeroValue: true,
      //         category: ["erc20"]
      //       }
      //     ]
      //   })
      //   const individualResponse2 = await fetch(_rpc, {
      //     method: 'POST', 
      //     headers: headers, 
      //     body: individualBody2
      //   })
      //   const individualData2 = await individualResponse2.json()
      //   individualData2.result.transfers.map((res: any) => {
      //     fulldata.push({value: Number(formatEther(BigInt(res.rawContract.value))), addr: res.to})
      //   })
      // }
    } else {
      rank = Object.values((await publicClient.getContractEvents({
        abi: UniswapV2PairABI,
        address: lpList2,
        eventName: 'Swap',
        fromBlock: BigInt(dataofcurr.blockcreated),
        toBlock: 'latest',
      })).map((res) => {
        if (fetchtoken0[lpList2UpperCase.indexOf(res.address.toUpperCase())].result.toUpperCase() === currencyAddr.toUpperCase()) {
          return {addr: res.args.recipient, value: Number(formatEther(res.args.amount0 as bigint)) < 0 ? Number(formatEther(res.args.amount0 as bigint)) / (mode !== 'pro' ? 1 : 1) * -1 : Number(formatEther(res.args.amount0 as bigint)) / (mode !== 'pro' ? 1 : 1)};
        } else {
          return {addr: res.args.recipient, value: Number(formatEther(res.args.amount1 as bigint)) < 0 ? Number(formatEther(res.args.amount1 as bigint)) / (mode !== 'pro' ? 1 : 1) * -1 : Number(formatEther(res.args.amount1 as bigint)) / (mode !== 'pro' ? 1 : 1)};
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
        return {addr: res.addr, value: Number(res.value + questxp).toFixed(2), lvl: lvl}
      }).sort((a: any, b: any) => {return b.value - a.value});
    }
  } 
//   else if (rankby === 'networth') {
//     let lpListLite: any = [];
//     if (mode === 'pro') {
//       const tokenCountLite = await readContracts(config, {contracts: [{ ...bkgafactoryContract, functionName: 'totalIndex', },],});
//       const initLite: any = {contracts: []};
//       for (let i = 0; i <= Number(tokenCountLite[0].result) - 1; i++) {
//         initLite.contracts.push(
//             {
//               ...bkgafactoryContract,
//               functionName: 'index',
//               args: [BigInt(i + 1)],
//             }
//         );
//       }
//       const tokenListLite: any = await readContracts(config, initLite);
//       const _lpListLite = tokenListLite.map(async (res: any) => {
//         return await readContracts(config, {
//           contracts: [
//             {
//               ...univ2factoryContract,
//               functionName: 'getPool',
//               args: [res.result!, dataofcurr.addr as '0xtring', 10000],
//             },
//           ],
//         });
//       });
//       const reslpListLite: any = await Promise.all(_lpListLite);
//       lpListLite = reslpListLite.map((res: any) => {return res[0].result!.toUpperCase();});
//       lpListLite.push('0x3F7582E36843FF79F173c7DC19f517832496f2D8'.toUpperCase());
//     }
//     const getEOA = await publicClient.getContractEvents({
//       abi: erc20Abi,
//       address: dataofcurr.addr as '0xstring',
//       eventName: 'Transfer',
//       fromBlock: BigInt(dataofcurr.blockcreated),
//       toBlock: 'latest',
//     });
//     const _getRelatedCA = getEOA.map(async (res) => {
//       return await publicClient.getTransaction({ 
//         hash: res.transactionHash,
//       });
//     });
//     const getRelatedCA = await Promise.all(_getRelatedCA);
//     const relatedEOA = getEOA.filter((res, index) => {
//       return (getRelatedCA[index].to !== null && (getRelatedCA[index].to!.toUpperCase() === '0x3F7582E36843FF79F173c7DC19f517832496f2D8'.toUpperCase() || getRelatedCA[index].to!.toUpperCase() === dataofuniv2router.addr.toUpperCase()))
//     });
//     console.log(relatedEOA)
//     const from = relatedEOA.map((res) => {return res.args.from;});
//     const to = relatedEOA.map((res) => {return res.args.to;});
//     const excludedEOA = [...new Set(from.concat(to))].filter((res: any) => {if (mode === 'pro') {return lpListLite.indexOf(res.toUpperCase()) === -1} else {return lpList.indexOf(res.toUpperCase()) === -1}});
//     if (mode !== 'pro') {tokenList.push({result: dataofcurr.addr});}
//     const init2: any = {contracts: []};
//     const arrListbal = [];
//     for (let ii = 0; ii <= excludedEOA.length - 1; ii++) {
//       for (let i = 0; i <= tokenList.length - 1; i++) {
//         init2.contracts.push(
//             {
//               address: tokenList[i].result,
//               abi: erc20Abi,
//               functionName: 'balanceOf',
//               args: [excludedEOA[ii] as '0xstring'],
//               chainId: _chainId,
//             }
//         );
//         arrListbal.push({addr: excludedEOA[ii], token: tokenList[i].result})
//       }
//     }
//     const resBal = await readContracts(config, init2);
//     const listbal = arrListbal.map((res, index) => {return {addr: res.addr, token: res.token.toUpperCase(), value: Number(formatEther(resBal[index].result as bigint))}});
//     console.log(listbal)
//     const lpArr = resLpList.map((res: any, index: any) => {return {token: tokenList[index].result, lp: res[0].result};}); //.concat([{token: dataofcurr.addr}])
//     const _fetchlp = lpArr.map(async (res: any) => {
//       return await readContracts(config, {
//         contracts: [
//           {
//               address: res.lp,
//               abi: UniswapV2PairABI,
//               functionName: 'slot0',
//               chainId: _chainId,
//           },
//           {
//               address: res.lp,
//               abi: UniswapV2PairABI,
//               functionName: 'token0',
//               chainId: _chainId,
//           },
//         ],
//       });
//     });
//     const fetchlp = await Promise.all(_fetchlp);
//     const reslp = fetchlp.map((item: any, index: any) => {
//       const price = item[1].result.toUpperCase() === dataofcurr.addr.toUpperCase() ? 
//         ((Number(item[0].result[0]) / (2 ** 96)) ** 2) : 
//         (1 / ((Number(item[0].result[0]) / (2 ** 96)) ** 2));
//       return {token: lpArr[index].token.toUpperCase(), price: lpArr[index].token.toUpperCase() === dataofcurr.addr.toUpperCase() ? 1 : price}
//     })
//     const calvalue = listbal.map((res) => {
//       return {addr: res.addr, value: reslp[reslp.map((i) => i.token).indexOf(res.token)].price * res.value * (mode === 'pro' ? 1 : 1)}
//     })
//     for (let ii = 0; mode === 'pro' && ii <= excludedEOA.length - 1; ii++) {
//       const ethBal = await getBalance(config, {
//         address: excludedEOA[ii] as '0xstring',
//         chainId: _chainId,
//       })
//       calvalue.push({addr: excludedEOA[ii], value: Number(formatEther(ethBal.value)) * (mode === 'pro' ? 1 : 1)})
//     }
//     rank = Object.values(calvalue.reduce((a: any, b: any) => {
//       if (a[b.addr.toUpperCase()]) {
//         a[b.addr.toUpperCase()].value += b.value
//       } else {
//         a[b.addr.toUpperCase()] = b
//       }
//       return a
//     }, {})).sort((a: any, b: any) => {return b.value - a.value});
//   }

  return (
    <div className="w-full rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center">
        {rank.map((item: any, index: any) => {
          return <div className={"w-full h-[70px] flex flex-row items-center justify-around sm:gap-2 sm:px-14 sm:py-10 text-xs sm:text-md " + (index !== 0 && "border-t border-gray-800")} key={index}>
              <span className="w-[20px] text-left">{index + 1}</span>
              <div className="w-1/3 sm:w-1/2 flex flex-row items-center justify-start gap-2 sm:gap-10">
              <div className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden relative">
                  <Image src={buildDataUrl(item.addr)} alt="jazzicon" fill />
              </div>
              <a href={`${_explorer}/address/${item.addr}`} target="_blank" rel="noopener noreferrer">{item.addr.slice(0, 5) + '...' + item.addr.slice(37)}</a>
              </div>
              <div className="w-2/5 flex flex-row items-center justify-between sm:gap-10">
                {(rankby === '' || rankby === 'xp') &&
                  <>
                    <span className="font-bold">LVL {item.lvl}</span>
                    <span>{item.value} XP</span>
                  </>
                }
                {/* {rankby === 'networth' && <span className="font-bold w-full text-right">{mode === 'pro' ? '$' : '฿'}{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(item.value)}</span>} */}
              </div>
          </div>
        })}
    </div>
  );
}
