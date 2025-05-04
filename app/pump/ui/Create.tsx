'use client';
import Link from "next/link";
import { useState } from 'react';
import { useConnections, useAccount } from 'wagmi';
import { formatEther, parseEther, erc20Abi } from 'viem';
import { writeContract, readContracts } from '@wagmi/core';
import { config } from '@/app/config';
import { ERC20FactoryABI } from '@/app/pump/abi/ERC20Factory';
import { ERC20FactoryETHABI } from '@/app/pump/abi/ERC20FactoryETH';

export default function Create({
  mode, chain,
}: {
  mode: string;
  chain: string;
}) {
  const connections = useConnections();

  let _chainId = 0;
  if (chain === 'unichain' || chain === '') {
    _chainId = 130;
  } else if (chain === 'base') {
    _chainId = 8453;
  }
  let currencyAddr: string = '';
  let bkgafactoryAddr: string = '';
  let _blockcreated: number = 1;
  let facABI: any = null;
  if ((chain === 'unichain' || chain === '') && (mode === 'lite' || mode === '')) {
    currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    _blockcreated = 8581591;
    facABI = ERC20FactoryABI;
  } else if ((chain === 'unichain' || chain === '') && mode === 'pro') {
    currencyAddr = '0x4200000000000000000000000000000000000006';
    bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    _blockcreated = 8581591;
    facABI = ERC20FactoryABI;
  } else if (chain === 'base' && (mode === 'lite' || mode === '')) {
    currencyAddr = '0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142';
    bkgafactoryAddr = '0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4';
    _blockcreated = 26462082;
    facABI = ERC20FactoryETHABI;
  } else if (chain === 'base' && mode === 'pro') {
    currencyAddr = '0x4200000000000000000000000000000000000006';
    bkgafactoryAddr = '0xf9ACe692e54183acdaB6341DcCde4e457aEf37Dd';
    _blockcreated = 26462082;
    facABI = ERC20FactoryETHABI;
  }
  const dataofcurr = {addr: currencyAddr, blockcreated: _blockcreated};
  const bkgafactoryContract = {
    address: bkgafactoryAddr as '0xstring',
    abi: facABI,
    chainId: _chainId,
  } as const

  const account = useAccount();
  const [file, setFile] = useState(null as unknown as File);
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [desp, setDesp] = useState('');

  const _launch = async () => {
    try {
      alert('Your token is launching, pls wait a sec...')
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", { method: "POST", body: data, });
      const upload = await uploadRequest.json();
      console.log(name, ticker, desp, 'ipfs://' + upload.IpfsHash);
      let result = '';
      if (mode !== 'pro') {
        const allowance = await readContracts(config, {
          contracts: [
            {
                address: dataofcurr.addr as '0xstring',
                abi: erc20Abi,
                functionName: 'allowance',
                args: [account.address as '0xstring', bkgafactoryAddr as '0xstring'],
                chainId: _chainId,
            },
          ],
        });
        if (Number(formatEther(allowance[0].result!)) < 309000) {
            writeContract(config, {
                address: dataofcurr.addr as '0xstring',
                abi: erc20Abi,
                functionName: 'approve',
                args: [bkgafactoryAddr as '0xstring', parseEther('309000')],
                chainId: _chainId,
            })
        }
        result = await writeContract(config, {
          ...bkgafactoryContract,
          functionName: 'createToken',
          args: [name, ticker, 'ipfs://' + upload.IpfsHash, desp],
        });
      } else {
        result = await writeContract(config, {
          ...bkgafactoryContract,
          functionName: 'createToken',
          args: [name, ticker, 'ipfs://' + upload.IpfsHash, desp],
          value: parseEther('0.005'),
        });
      }
      alert("Launch success!, your txn hash: https://unichain.blockscout.com/tx/" + result);
    } catch (e) {
      console.log(e);
      alert("Launch failed");
    }
  }
  const launch = () => {
    _launch();
    setName('');
    setTicker('');
    setDesp('');
  };

  return (
    <main className="row-start-2 w-full xl:w-1/4 self-center h-full flex flex-col gap-6 items-center xl:items-start">
        <Link href={"/pump/launchpad?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline hover:font-bold">Back to launchpad</Link>
        <span className="text-2xl font-bold mt-4">Create a meme 🚀</span>
        <form action={launch} className="flex flex-col gap-6">
          <input className="w-full p-4 bg-gray-700 rounded-xl leading-tight focus:outline-none" placeholder="Coin Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="w-full p-4 bg-gray-700 rounded-xl leading-tight focus:outline-none" placeholder="Ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} required />
          <input className="w-full p-4 bg-gray-700 rounded-xl leading-tight focus:outline-none" placeholder="Description" value={desp} onChange={(e) => setDesp(e.target.value)} required />
          <div className="w-full pt-1 flex flex-col gap-4" >
            <input type="file" className="file:mr-4 file:rounded-full file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..." onChange={(e) => setFile(e.target.files![0])} required />
          </div>
          <div className="text-teal-900 pt-2 w-full" role="alert">
            <div className="flex">
              <svg className="fill-current h-4 w-4 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
              <p className="font-bold text-xs">Deployment cost: {mode === 'pro' ? '0.005 eth' : '209,000 $THB'}</p>
            </div>
          </div>
          {connections && account.address !== undefined && account.chainId === _chainId ? 
            <button className="w-1/2 p-2 mb-3 rounded-2xl font-bold bg-emerald-300 text-slate-900 underline hover:bg-sky-500 hover:text-white" type="submit"><span className="self-center">Launch!</span></button> :
            <button className="w-1/2 p-2 mb-3 rounded-2xl font-bold bg-gray-500 cursor-not-allowed"><span className="self-center">Launch!</span></button>
          }
        </form>
    </main>
  );
}
