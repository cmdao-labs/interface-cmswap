// import Image from "next/image";
// import { connection } from 'next/server';
// import { getBalance, readContracts } from '@wagmi/core';
// import { createPublicClient, http, formatEther, erc20Abi } from 'viem';
// import { config } from '@/app/config';
// import { base } from 'viem/chains';
// import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
// import { UniswapV2FactoryABI } from '@/app/pump/abi/UniswapV2Factory';
// import { UniswapV2PairABI } from '@/app/pump/abi/UniswapV2Pair';
// import { aggregatorV3InterfaceABI } from '@/app/pump/abi/Chainlink';

// export default async function Dashboard({
//     addr, mode, chain,
//   }: {
//     addr: string;
//     mode: string;
//     chain: string;
//   }) {
//   await connection();

//   let priceFeed: any = [];
//   if (mode === 'pro') {
//     const publicClientOracle = createPublicClient({ 
//       chain: base,
//       transport: http(process.env.BASE_RPC as string)
//     });
//     priceFeed = await publicClientOracle.readContract({
//       address: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
//       abi: aggregatorV3InterfaceABI,
//       functionName: 'latestRoundData',
//     });
//   }
//   let _chainId = 0;
//   let _explorer = '';
//   if (chain === 'unichain' || chain === '') {
//     _chainId = 130;
//     _explorer = 'https://unichain.blockscout.com/';
//   } else if (chain === 'base') {
//     _chainId = 8453;
//     _explorer = 'https://base.blockscout.com/';
//   }
//   let currencyAddr: string = '';
//   let bkgafactoryAddr: string = '';
//   let _blockcreated: number = 1;
//   let v2facAddr: string = '';
//   let currencyLp: string = '';
//   if ((chain === 'unichain' || chain === '') && (mode === 'lite' || mode === '')) {
//     currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
//     bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
//     _blockcreated = 8581591;
//     v2facAddr = '0x1f98400000000000000000000000000000000002';
//     currencyLp = '0x8E2D7f0F8b3A4DEFa2e00f85254C77F3FcD26053';
//   } else if ((chain === 'unichain' || chain === '') && mode === 'pro') {
//     currencyAddr = '0x4200000000000000000000000000000000000006';
//     bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
//     _blockcreated = 8581591;
//     v2facAddr = '0x1f98400000000000000000000000000000000002';
//     currencyLp = '0x8E2D7f0F8b3A4DEFa2e00f85254C77F3FcD26053';
//   } else if (chain === 'base' && (mode === 'lite' || mode === '')) {
//     currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
//     bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
//     _blockcreated = 26462082;
//     v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
//     currencyLp = '0x656D7c47e9Dd3035784d5e56b7F2b118BBA7E324';
//   } else if (chain === 'base' && mode === 'pro') {
//     currencyAddr = '0x4200000000000000000000000000000000000006';
//     bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
//     _blockcreated = 26462082;
//     v2facAddr = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6';
//     currencyLp = '0x656D7c47e9Dd3035784d5e56b7F2b118BBA7E324';
//   }
//   const dataofcurr = {addr: currencyAddr, lp: currencyLp, blockcreated: _blockcreated};
//   const dataofuniv2factory = {addr: v2facAddr};
//   const bkgafactoryContract = {
//     address: bkgafactoryAddr as '0xstring',
//     abi: ERC20FactoryABI,
//     chainId: _chainId,
//   } as const
//   const univ2factoryContract = {
//     address: dataofuniv2factory.addr as '0xstring',
//     abi: UniswapV2FactoryABI,
//     chainId: _chainId,
//   } as const

//   const indexCount = await readContracts(config, {
//     contracts: [
//       {
//         ...bkgafactoryContract,
//         functionName: 'totalIndex',
//       },
//     ],
//   });
//   const init: any = {contracts: []};
//   for (let i = 0; i <= Number(indexCount[0].result) - 1; i++) {
//     init.contracts.push(
//         {
//             ...bkgafactoryContract,
//             functionName: 'index',
//             args: [BigInt(i + 1)],
//         }
//     );
//   }
//   const result = await readContracts(config, init);
//   const result4 = result.map(async (res: any) => {
//     return await readContracts(config, {
//       contracts: [
//         {
//             address: res.result!,
//             abi: erc20Abi,
//             functionName: 'symbol',
//             chainId: _chainId,
//         },
//         {
//             ...bkgafactoryContract,
//             functionName: 'logo',
//             args: [res.result!],
//         },
//         {
//             ...univ2factoryContract,
//             functionName: 'getPair',
//             args: [res.result!, dataofcurr.addr as '0xstring'],
//         },
//         {
//             address: res.result!,
//             abi: erc20Abi,
//             functionName: 'balanceOf',
//             args: [addr as '0xstring'],
//             chainId: _chainId,
//         },
//       ],
//     });
//   })
//   const result44: any = await Promise.all(result4);
//   const thbData = await readContracts(config, {
//     contracts: [
//         {
//             address: dataofcurr.addr as '0xstring',
//             abi: erc20Abi,
//             functionName: 'balanceOf',
//             args: [addr as '0xstring'],
//             chainId: _chainId,
//         },
//     ],
//   });
//   const ethBal = await getBalance(config, {
//     address: addr as '0xstring',
//     chainId: _chainId,
//   })
//   if (mode === 'pro') {
//     result44.push([{result: 'ETH'}, {result: 'ipfs://bafkreiejfw35g5qdgzw5mv42py5a3cya2mknerishahx24lzgtowajvivm'}, {result: dataofcurr.lp}, {result: ethBal.value}]);
//   } else {
//     result44.push([{result: '$THB'}, {result: 'ipfs://bafkreiap46j6naouhp6l2qhlfb3tq2pltinynqv3aog5l5n5k7fwhxpzeu'}, {result: dataofcurr.lp}, {result: thbData[0].result}]);
//   }
//   const result5 = result44.map(async (res: any) => {
//     return await readContracts(config, {
//       contracts: [
//         {
//             address: res[2].result!,
//             abi: UniswapV2PairABI,
//             functionName: 'getReserves',
//             chainId: _chainId,
//         },
//         {
//             address: res[2].result!,
//             abi: UniswapV2PairABI,
//             functionName: 'token0',
//             chainId: _chainId,
//         },
//       ],
//     });
//   });
//   const result55 = await Promise.all(result5);
//   const resultfinal = result44.map((item: any, index: any) => {
//     const price = result55[index][1].result!.toUpperCase() === dataofcurr.addr.toUpperCase() ? 
//       Number((Number(formatEther(result55[index][0].result![0])) / Number(formatEther(result55[index][0].result![1])))) :
//       Number((Number(formatEther(result55[index][0].result![1])) / Number(formatEther(result55[index][0].result![0]))));
//     return [{result: item[0].result}, {result: item[1].result}, {result: Number(formatEther(item[3].result as bigint))}, {result: (item[0].result === '$THB' || item[0].result === 'ETH') ? item[0].result === 'ETH' ? Number(priceFeed[1] / BigInt(1e8)) : 1 : price}, {result: (item[0].result === '$THB' || item[0].result === 'ETH') ? dataofcurr.addr : result[index].result}]
//   })
//   const allvalue = resultfinal.map((res: any) => {return res[2].result * res[3].result}).reduce((a: any, b: any) => a + b, 0);

//   return (
//     <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start">
//         <div className="w-full h-[50px] py-6 flex flex-row items-center justify-between sm:gap-2 text-lg lg:text-3xl">
//             <div className="flex flex-row gap-2 items-center">
//                 <span>{addr.slice(0, 5) + '...' + addr.slice(37)}</span>
//             </div>
//             <span className="font-bold">{(mode === 'pro' ? '$' : '฿') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(allvalue)}</span>
//         </div>
//         <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
//             <div className="w-1/3">
//                 <span>Asset</span>
//             </div>
//             <div className="w-3/4 flex flex-row items-center justify-end sm:gap-10">
//                 <span className="text-right w-[50px] sm:w-[200px]">Balance</span>
//                 <span className="text-right w-[100px] sm:w-[200px]">Price</span>
//                 <span className="text-right w-[100px] sm:w-[200px]">Value</span>
//             </div>
//         </div>
//         {resultfinal.filter(
//           (res: any) => {return res[2].result !== 0}
//         ).sort(
//           (a: any, b: any) => {return b[3].result - a[3].result}
//         ).map((res: any, index: any) =>
//             <div className="w-full h-[50px] flex flex-row items-center justify-around text-xs lg:text-lg py-10 border-t border-gray-800" key={index}>
//                 <div className="w-1/3 flex flex-row items-center justify-start gap-6 overflow-hidden">
//                     <div className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden relative">
//                         <Image src={res[1].result!.slice(0, 7) === 'ipfs://' ? "https://gateway.commudao.xyz/ipfs/" + res[1].result!.slice(7) : "https://gateway.commudao.xyz/ipfs/" + res[1].result!} alt="token_waiting_for_approve" fill />
//                     </div>
//                     <span className="font-bold truncate">{res[0].result}</span>
//                 </div>
//                 <div className="w-3/4 flex flex-row items-center justify-end sm:gap-10">
//                     <span className="text-right w-[50px] sm:w-[200px]">{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result)}</span>
//                     <span className={"text-right w-[100px] sm:w-[200px] " + (mode === 'pro' ? 'text-xs' : '')}>{Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[3].result)} {mode === 'pro' ? '$USD' : '$THB'}</span>
//                     <span className="font-bold text-right w-[100px] sm:w-[200px]">{(mode === 'pro' ? '$' : '฿') + Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "short" }).format(res[2].result * res[3].result)}</span>
//                 </div>
//             </div>
//         )}
//     </main>
//   );
// }
