'use client'

import React, { useState, useEffect, createContext, useContext } from 'react';
import { readContracts } from '@wagmi/core';
import { config } from '@/app/config';
import { v3FactoryContract as v3FactoryContract_96, v3PoolABI as v3PoolABI_96 } from '@/app/lib/96';

type PriceContextType = {
  priceList: { token: string; priceUSDT: number; priceKKUB: number }[];
};

const PriceContext = createContext<PriceContextType>({ priceList: [] });

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [priceList, setPriceList] = useState<{ token: string; priceUSDT: number; priceKKUB: number }[]>([]);
    const [isLoading, setIsLoading] = React.useState(false)

  const fetchKKUBPrice = async () => {
    const baseURL = 'https://api.geckoterminal.com/api/v2/networks/bitkub_chain/'
    const response = await fetch(`${baseURL}tokens/0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5/pools?page=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from GeckoTerminal');
    }else{
        const responseJson = await response.json();
        console.log("GeckoTerminal Response:", responseJson.data[0].attributes.token_price_usd);
        let prices = [
          { token: 'KKUB', priceUSDT:  Number(responseJson.data[0].attributes.token_price_usd) ,priceKKUB: 1} //* KKUB price IN KUSDT
        ];
        setPriceList((prev) => [...prev, ...prices]);
        return {priceUSDT: prices[0].priceUSDT, priceKKUB: 1}; 
    }

  }



  useEffect(() => {
    const loadPrices = async () => {
      try {
        const kkubPrice = await fetchKKUBPrice();
        const cmmPrices = await fetchCMM(kkubPrice.priceUSDT);
        const shkPrices = await fetchSHK(cmmPrices, "SHK");
        const lumiPrices = await fetchLUMI(kkubPrice, "LUMI");
      } catch (err) {
        console.error("Failed to load prices:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrices();
  }, []);

    const fetchCMM = async (kkubPrice: any) => {
        const result = await readContracts(config, {
      contracts: [
        { ...v3FactoryContract_96, functionName: 'getPool', args: ['0x9B005000A10Ac871947D99001345b01C1cEf2790', '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 100] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: ['0x9B005000A10Ac871947D99001345b01C1cEf2790', '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 500] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: ['0x9B005000A10Ac871947D99001345b01C1cEf2790', '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 3000] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: ['0x9B005000A10Ac871947D99001345b01C1cEf2790', '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 10000] },
      ],
    });

    const poolAddresses = result
      .map(res => res.result)
      .filter((addr): addr is `0x${string}` => typeof addr === 'string' && addr.startsWith('0x'));

    const poolInfos = await readContracts(config, {
      contracts: poolAddresses.flatMap(poolAddress => [
        { ...v3PoolABI_96, address: poolAddress, functionName: 'slot0' },
        { ...v3PoolABI_96, address: poolAddress, functionName: 'token0' },
        { ...v3PoolABI_96, address: poolAddress, functionName: 'token1' },
      ]),
    });

    const pools = [];
    for (let i = 0; i < poolInfos.length; i += 3) {
      const slot0 = poolInfos[i].result;
      const token0 = poolInfos[i + 1].result;
      const token1 = poolInfos[i + 2].result;

      pools.push({ slot0, token0, token1 });
    }

    let priceUSDT;
    let priceKKUB;

    const prices = pools.map(({ slot0, token0, token1 }) => {
      if (
        slot0 &&
        Array.isArray(slot0) &&
        (typeof slot0[0] === 'bigint' || typeof slot0[0] === 'number')
      ) {
        const sqrtPriceX96 = BigInt(slot0[0]);
 
        const kkubAddress = '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5'.toLowerCase();
        const cmmAddress = '0x9B005000A10Ac871947D99001345b01C1cEf2790'.toLowerCase();

        

        if (token0 && token1 && typeof token0 === 'string' && typeof token1 === 'string') {
          if (token0.toLowerCase() === kkubAddress && token1.toLowerCase() === cmmAddress) {
            priceUSDT = (1/(Number(sqrtPriceX96) / (2 ** 96)) ** 2) * kkubPrice;
            priceKKUB = (1/(Number(sqrtPriceX96) / (2 ** 96)) ** 2);
            return { token: 'CMM', priceUSDT, priceKKUB };
          } else if (token0.toLowerCase() === cmmAddress && token1.toLowerCase() === kkubAddress) {
            priceUSDT = (Number(sqrtPriceX96) / (2 ** 96)) ** 2 * kkubPrice;
            priceKKUB = (Number(sqrtPriceX96) / (2 ** 96)) ** 2;
            return { token: 'CMM', priceUSDT, priceKKUB };
            
          }
        }
      }
      return null;
    }).filter(Boolean) as { token: string; priceUSDT: number; priceKKUB: number }[];
    setPriceList((prev) => [...prev, ...prices]);
    return {priceUSDT: priceUSDT, priceKKUB: priceKKUB}; 


    };

    const fetchSHK = async (currencyPrice: any,name: any) => {
        const main = '0x9B005000A10Ac871947D99001345b01C1cEf2790';
        const pair = '0xF27DF35ead39E2aed24cc05C52db303Ef4C4aA83';

        const result = await readContracts(config, {
      
      contracts: [
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 100] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 500] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 3000] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 10000] },
      ],
    });

    const poolAddresses = result
      .map(res => res.result)
      .filter((addr): addr is `0x${string}` => typeof addr === 'string' && addr.startsWith('0x'));

    const poolInfos = await readContracts(config, {
      contracts: poolAddresses.flatMap(poolAddress => [
        { ...v3PoolABI_96, address: poolAddress, functionName: 'slot0' },
        { ...v3PoolABI_96, address: poolAddress, functionName: 'token0' },
        { ...v3PoolABI_96, address: poolAddress, functionName: 'token1' },
      ]),
    });

    const pools = [];
    for (let i = 0; i < poolInfos.length; i += 3) {
      const slot0 = poolInfos[i].result;
      const token0 = poolInfos[i + 1].result;
      const token1 = poolInfos[i + 2].result;

      pools.push({ slot0, token0, token1 });
    }

    let priceUSDT;
    let priceKKUB;

    const prices = pools.map(({ slot0, token0, token1 }) => {
      if (
        slot0 &&
        Array.isArray(slot0) &&
        (typeof slot0[0] === 'bigint' || typeof slot0[0] === 'number')
      ) {
        const sqrtPriceX96 = BigInt(slot0[0]);
 
        const mainAddress = main.toLowerCase();
        const pairAddress = pair.toLowerCase();

        

        if (token0 && token1 && typeof token0 === 'string' && typeof token1 === 'string') {
          if (token0.toLowerCase() === mainAddress && token1.toLowerCase() === pairAddress) {
            return { token: name, priceUSDT: (1/(Number(sqrtPriceX96) / (2 ** 96)) ** 2) * currencyPrice.priceUSDT, priceKKUB: (1/(Number(sqrtPriceX96) / (2 ** 96)) ** 2) * currencyPrice.priceKKUB};
          } else if (token0.toLowerCase() === pairAddress && token1.toLowerCase() === mainAddress) {
            return { token: name, priceUSDT: (Number(sqrtPriceX96) / (2 ** 96)) ** 2 * currencyPrice.priceUSDT, priceKKUB: (Number(sqrtPriceX96) / (2 ** 96)) ** 2 * currencyPrice.priceKKUB};
          }
        }
      }
      return null;
    }).filter(Boolean) as { token: string; priceUSDT: number; priceKKUB: number }[];
    setPriceList((prev) => [...prev, ...prices]);
    return {priceUSDT: priceUSDT, priceKKUB: priceKKUB};


    };

    const fetchLUMI = async (currencyPrice: any,name: any) => {
        const main = '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5';
        const pair = '0x95013Dcb6A561e6C003AED9C43Fb8B64008aA361';

        const result = await readContracts(config, {
      
      contracts: [
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 100] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 500] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 3000] },
        { ...v3FactoryContract_96, functionName: 'getPool', args: [main, pair, 10000] },
      ],
    });

    const poolAddresses = result
      .map(res => res.result)
      .filter((addr): addr is `0x${string}` => typeof addr === 'string' && addr.startsWith('0x'));

    const poolInfos = await readContracts(config, {
      contracts: poolAddresses.flatMap(poolAddress => [
        { ...v3PoolABI_96, address: poolAddress, functionName: 'slot0' },
        { ...v3PoolABI_96, address: poolAddress, functionName: 'token0' },
        { ...v3PoolABI_96, address: poolAddress, functionName: 'token1' },
      ]),
    });

    const pools = [];
    for (let i = 0; i < poolInfos.length; i += 3) {
      const slot0 = poolInfos[i].result;
      const token0 = poolInfos[i + 1].result;
      const token1 = poolInfos[i + 2].result;

      pools.push({ slot0, token0, token1 });
    }

    let priceUSDT;
    let priceKKUB;

    const prices = pools.map(({ slot0, token0, token1 }) => {
      if (
        slot0 &&
        Array.isArray(slot0) &&
        (typeof slot0[0] === 'bigint' || typeof slot0[0] === 'number')
      ) {
        const sqrtPriceX96 = BigInt(slot0[0]);
 
        const mainAddress = main.toLowerCase();
        const pairAddress = pair.toLowerCase();

        

        if (token0 && token1 && typeof token0 === 'string' && typeof token1 === 'string') {
          if (token0.toLowerCase() === mainAddress && token1.toLowerCase() === pairAddress) {
            return { token: name, priceUSDT: (1/(Number(sqrtPriceX96) / (2 ** 96)) ** 2) * currencyPrice.priceUSDT, priceKKUB: (1/(Number(sqrtPriceX96) / (2 ** 96)) ** 2) * currencyPrice.priceKKUB};
          } else if (token0.toLowerCase() === pairAddress && token1.toLowerCase() === mainAddress) {
            return { token: name, priceUSDT: (Number(sqrtPriceX96) / (2 ** 96)) ** 2 * currencyPrice.priceUSDT, priceKKUB: (Number(sqrtPriceX96) / (2 ** 96)) ** 2 * currencyPrice.priceKKUB};
          }
        }
      }
      return null;
    }).filter(Boolean) as { token: string; priceUSDT: number; priceKKUB: number }[];
    setPriceList((prev) => [...prev, ...prices]);
    return {priceUSDT: priceUSDT, priceKKUB: priceKKUB};


    };

  {isLoading && (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full backdrop-blur-[12px] z-[999]" />
  )}

  return (
    <PriceContext.Provider value={{ priceList }}>
      {children}
    </PriceContext.Provider>
  );
};