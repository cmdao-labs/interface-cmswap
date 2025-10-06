import { createPublicClient, erc20Abi, formatEther, http } from "viem";
import { bitkub, bitkubTestnet, monadTestnet } from "viem/chains";
import { readContracts } from "@wagmi/core";
import { config } from "@/app/config";
import { ERC20FactoryABI } from "@/app/pump/abi/ERC20Factory";
import { UniswapV2FactoryABI } from "@/app/pump/abi/UniswapV2Factory";
import { UniswapV2PairABI } from "@/app/pump/abi/UniswapV2Pair";
import { PumpCoreNativeABI } from '@/app/pump/abi/PumpCoreNative';
import LeaderboardTabs, { LeaderboardEntry, LeaderboardTab, } from "./LeaderboardTabs";

interface LeaderboardProps {
    rankby: string;
    mode: string;
    chain: string;
    token: string;
}

interface NetworkConfig {
    chain: typeof bitkub | typeof monadTestnet | typeof bitkubTestnet;
    chainId: number;
    explorer: string;
    rpcUrl: string;
    currencyAddress: `0x${string}`;
    erc20FactoryAddress: `0x${string}`;
    poolFactoryAddress: `0x${string}`;
    pumpCoreAddress: `0x${string}`;
    blockCreated: number;
}

interface PairMetadata {
    pairAddress: `0x${string}`;
    tokenAddress: `0x${string}`;
    baseIsToken0: boolean;
}

const PLACEHOLDER_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export default async function Leaderboard({ mode, chain, token, }: LeaderboardProps) {
    const network = resolveNetworkConfig({ chain, mode, token });
    const publicClient = createPublicClient({chain: network.chain, transport: http(network.rpcUrl),});
    const { tokens, pairs } = await fetchPairs(network, publicClient);
    if (!pairs.length && network.chainId !== 25925) return (<LeaderboardTabs explorerUrl={network.explorer} tabs={buildFallbackTabs()} />);
    
    let swapEvents: any;
    if (network.chainId === 25925) {
        const addrs = [...tokens.keys()];
        const r1 = await publicClient.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: { to: network.pumpCoreAddress as '0xstring', },
            fromBlock: BigInt(network.blockCreated),
            toBlock: 'latest',
        });
        const r2 = await Promise.all(r1);
        const r3 = await publicClient.getContractEvents({
            address: network.pumpCoreAddress,
            abi: PumpCoreNativeABI,
            eventName: 'Swap',
            fromBlock: BigInt(network.blockCreated),
            toBlock: 'latest',
        });
        const r4: any = await Promise.all(r3);
        
        const sell = r2.filter((r: any) => {
            return addrs.indexOf(r.address.toUpperCase()) !== -1;
        }).map((r: any) => {
            return {
                action: 'sell', 
                value: Number(formatEther(r.args.value)), 
                transactionHash: r.transactionHash, 
                block: r.blockNumber, 
                from: r.args.from,
                to: r.args.to, 
                address: tokens.get(r.address.toUpperCase())?.address, 
                name: tokens.get(r.address.toUpperCase())?.name,
                symbol: tokens.get(r.address.toUpperCase())?.symbol, 
                logo: tokens.get(r.address.toUpperCase())?.logo, 
            }
        }).filter((r) => {
            return r.from.toUpperCase() !== '0x0000000000000000000000000000000000000000'.toUpperCase();
        });

        const r5 = await publicClient.getContractEvents({
            abi: erc20Abi,
            eventName: 'Transfer',
            args: { from: network.pumpCoreAddress as '0xstring', },
            fromBlock: BigInt(network.blockCreated),
            toBlock: 'latest',
        });
        const r6 = await Promise.all(r5);
        const buy = r6.filter((r) => {
            return addrs.indexOf(r.address.toUpperCase()) !== -1;
        }).map((r: any) => {
            return {
                action: 'buy', 
                value: Number(formatEther(r.args.value)), 
                transactionHash: r.transactionHash, 
                block: r.blockNumber,
                from: r.args.from,
                to: r.args.to, 
                address: tokens.get(r.address.toUpperCase())?.address, 
                name: tokens.get(r.address.toUpperCase())?.name,
                symbol: tokens.get(r.address.toUpperCase())?.symbol, 
                logo: tokens.get(r.address.toUpperCase())?.logo, 
            }
        }).filter((r) => {
            return r.to.toUpperCase() !== '0x1fE5621152A33a877f2b40a4bB7bc824eEbea1EA'.toUpperCase();
        });

        const orderMap = new Map(r4.map((obj: any, index: any) => [obj.transactionHash, index]));
        swapEvents = sell.concat(buy).slice().sort(
            (a: any, b: any) => Number(orderMap.get(a.transactionHash) ?? Infinity) - Number(orderMap.get(b.transactionHash) ?? Infinity)
        ).map((r: any, index: any) => {
            return {
                action: r.action, 
                value: r4[index].args.isBuy ? Number(formatEther(r4[index].args.amountIn)) : Number(formatEther(r4[index].args.amountOut)), 
                trader: r4[index].args.sender,
                transactionHash: r.transactionHash, 
                block: r.block,
                from: r.from,
                to: r.to, 
                address: r.address, 
                name: r.name,
                symbol: r.symbol,
                logo: r.logo,
            }
        });
        console.log(swapEvents)
    } else {
        swapEvents = await publicClient.getContractEvents({
            abi: UniswapV2PairABI,
            address: pairs.map((pair: any) => pair.pairAddress),
            eventName: "Swap",
            fromBlock: BigInt(network.blockCreated),
            toBlock: "latest",
        });
    }

    // Enrich events with block timestamps for time-based filtering
    const swapEventsWithTs = await attachBlockTimestamps(publicClient, swapEvents, network);

    const { volumeTokens, volumeTraders, profitTraders, degenTraders } = buildDatasets({swapEvents: swapEventsWithTs, pairs, tokens, explorerUrl: network.explorer, network,});
    const tabs: LeaderboardTab[] = [
        {
            id: "volume-token",
            label: "Top Volume Cult",
            entries: volumeTokens,
        },
        {
            id: "top-volume-trader",
            label: "Top Volume Trader",
            entries: volumeTraders,
        },
        {
            id: "top-profit-trader",
            label: "Top Profit Trader",
            entries: profitTraders,
        },
        {
            id: "top-degen-trader",
            label: "Top Degen Trader",
            entries: degenTraders,
        },
    ];

    return <LeaderboardTabs explorerUrl={network.explorer} tabs={tabs} />;
}

function resolveNetworkConfig({ chain, mode, token, }: Pick<LeaderboardProps, "chain" | "mode" | "token">): NetworkConfig {
    const normalizedChain = chain || "kub";
    const normalizedMode = mode || "lite";
    const normalizedToken = token || "cmm";
    const isMonad = normalizedChain === "monad";
    const isKubTestnet = normalizedChain === "kubtestnet";
    let chainConfig: typeof bitkub | typeof monadTestnet | typeof bitkubTestnet = bitkub;
    let explorer = "https://www.kubscan.com";
    const defaultRpc = chainConfig.rpcUrls.default?.http?.[0] ?? "";
    let rpcUrl = process.env.NEXT_PUBLIC_KUB_RPC ?? defaultRpc;
    if (isMonad) {
        chainConfig = monadTestnet;
        explorer = "https://monad-testnet.socialscan.io";
        rpcUrl = process.env.NEXT_PUBLIC_MONAD_RPC ?? (chainConfig.rpcUrls.default?.http?.[0] ?? "");
    } else if (isKubTestnet) {
        chainConfig = bitkubTestnet;
        explorer = "https://testnet.kubscan.com";
        rpcUrl = process.env.NEXT_PUBLIC_KUB_TESTNET_RPC ?? (chainConfig.rpcUrls.default?.http?.[0] ?? "");
    }

    const networkMatrix = {
        kub: {
            lite: {
                cmm: {
                    currencyAddress: "0x9b005000a10ac871947d99001345b01c1cef2790" as const,
                    erc20FactoryAddress: "0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62" as const,
                    poolFactoryAddress: "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c" as const,
                    pumpCoreAddress: "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c" as const,
                    blockCreated: 25229488,
                },
            },
            pro: {
                default: {
                    currencyAddress: "0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5" as const,
                    erc20FactoryAddress: "0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56" as const,
                    poolFactoryAddress: "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c" as const,
                    pumpCoreAddress: "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c" as const,
                    blockCreated: 25232899,
                },
            },
        },
        monad: {
            pro: {
                default: {
                    currencyAddress: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701" as const,
                    erc20FactoryAddress: "0x6dfc8eecca228c45cc55214edc759d39e5b39c93" as const,
                    poolFactoryAddress: "0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142" as const,
                    pumpCoreAddress: "0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142" as const,
                    blockCreated: 16912084,
                },
            },
        },
        kubtestnet: {
            pro: {
                default: {
                    currencyAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907" as const,
                    erc20FactoryAddress: "0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b" as const,
                    poolFactoryAddress: "0x46a4073c830031ea19d7b9825080c05f8454e530" as const,
                    pumpCoreAddress: "0x46a4073c830031ea19d7b9825080c05f8454e530" as const,
                    blockCreated: 23935659,
                },
            },
        },
    } as const;

    const chainKey = isMonad ? "monad" : isKubTestnet ? "kubtestnet" : "kub";
    const availableModes = networkMatrix[chainKey];
    const modeKey = normalizedMode in availableModes ? normalizedMode : Object.keys(availableModes)[0];
    const modeBucket = availableModes[modeKey as keyof typeof availableModes] as Record<string, { currencyAddress: `0x${string}`; erc20FactoryAddress: `0x${string}`; poolFactoryAddress: `0x${string}`; pumpCoreAddress: `0x${string}`; blockCreated: number }>;
    const tokenKey = normalizedToken in modeBucket ? normalizedToken : "default";
    const resolved = modeBucket[tokenKey];

    if (!resolved) throw new Error("Unsupported network configuration");

    return {
        chain: chainConfig,
        chainId: chainConfig.id,
        explorer,
        rpcUrl,
        currencyAddress: resolved.currencyAddress,
        erc20FactoryAddress: resolved.erc20FactoryAddress,
        poolFactoryAddress: resolved.poolFactoryAddress,
        blockCreated: resolved.blockCreated,
        pumpCoreAddress: resolved.pumpCoreAddress,
    };
}

async function fetchPairs(network: NetworkConfig, publicClient: any) {
    let tokens = new Map<string, TokenMetadata>();
    let pairs: any = [];
    if (network.chainId === 25925) {
        const r1 = await publicClient.getContractEvents({
            address: network.pumpCoreAddress,
            abi: PumpCoreNativeABI,
            eventName: 'Creation',
            fromBlock: BigInt(network.blockCreated),
            toBlock: 'latest',
        });
        const r2 = await Promise.all(r1);
        const _getticker = r2.map(async (r: any) => {
            return await readContracts(config, {
                contracts: [
                    {
                        address: r.args.tokenAddr,
                        abi: erc20Abi,
                        functionName: 'symbol',
                        chainId: network.chainId,
                    },
                    {
                        address: r.args.tokenAddr,
                        abi: erc20Abi,
                        functionName: 'name',
                        chainId: network.chainId,
                    },
                ],
            });
        })
        const getticker: any = await Promise.all(_getticker);
        
        r2.map((r: any, index) => {
            const upperAddress = r.args.tokenAddr.toUpperCase();
            tokens.set(upperAddress, {
                address: r.args.tokenAddr,
                symbol: getticker[index][0].result,
                name: getticker[index][1].result,
                logo: r.args.logo,
            });
        });
    } else {
        const factoryContract = { address: network.erc20FactoryAddress, abi: ERC20FactoryABI, chainId: network.chainId, } as const;
        const factoryIndexResult = await readContracts(config, {contracts: [{ ...factoryContract, functionName: "totalIndex", },],});
        const tokenCount = Number(factoryIndexResult[0].result ?? BigInt(0));
        if (!tokenCount) return { tokens: new Map<string, TokenMetadata>(), pairs: [] as PairMetadata[] };

        const indexContracts = Array.from({ length: tokenCount }, (_, idx) => ({...factoryContract, functionName: "index", args: [BigInt(idx + 1)],}));
        const tokenList = await readContracts(config, { contracts: indexContracts });

        const uniswapFactory = {
            address: network.poolFactoryAddress,
            abi: UniswapV2FactoryABI,
            chainId: network.chainId,
        } as const;
        const poolContracts = tokenList
            .map((entry) => entry.result as `0x${string}` | undefined)
            .filter((address): address is `0x${string}` => Boolean(address && address !== PLACEHOLDER_ADDRESS),)
            .map((tokenAddress) => ({
                ...uniswapFactory,
                functionName: "getPool",
                args: [tokenAddress, network.currencyAddress, 10000],
            }));
        const poolList = await readContracts(config, { contracts: poolContracts });
        const rawPairs = poolList
            .map((pool) => pool.result as `0x${string}` | undefined)
            .filter((address): address is `0x${string}` => Boolean(address && address !== PLACEHOLDER_ADDRESS),);
        if (!rawPairs.length) return { tokens: new Map<string, TokenMetadata>(), pairs: [] as PairMetadata[] };

        const token0and1Contracts = rawPairs.flatMap((pairAddress) => [
            {
                address: pairAddress,
                abi: UniswapV2PairABI,
                functionName: "token0",
                chainId: network.chainId,
            } as const,
            {
                address: pairAddress,
                abi: UniswapV2PairABI,
                functionName: "token1",
                chainId: network.chainId,
            } as const,
        ]);
        const token0and1 = await readContracts(config, {contracts: token0and1Contracts,});

        const pairs: PairMetadata[] = rawPairs
            .map((pair, index) => {
                const token0 = token0and1[index * 2].result as `0x${string}` | undefined;
                const token1 = token0and1[index * 2 + 1].result as `0x${string}` | undefined;
                if (!token0 || !token1) return null;
                const baseIsToken0 = token0.toUpperCase() === network.currencyAddress.toUpperCase();
                const tokenAddress = baseIsToken0 ? token1 : token0;

                return {
                    pairAddress: pair,
                    tokenAddress,
                    baseIsToken0,
                };
            })
            .filter((pair): pair is PairMetadata => Boolean(pair));
        
        const uniqueTokenAddresses = Array.from(new Set(pairs.map((pair) => pair.tokenAddress.toLowerCase())),);
        const tokenMetadataContracts = uniqueTokenAddresses.flatMap((tokenAddress) => [
            {
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: "symbol",
                chainId: network.chainId,
            },
            {
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: "name",
                chainId: network.chainId,
            },
        ]);
        const tokenMetadataResults = await readContracts(config, {allowFailure: true, contracts: tokenMetadataContracts,});

        for (let i = 0; i < uniqueTokenAddresses.length; i++) {
            const symbolResult = tokenMetadataResults[i * 2];
            const nameResult = tokenMetadataResults[i * 2 + 1];
            const originalAddress = uniqueTokenAddresses[i] as `0x${string}`;
            const upperAddress = originalAddress.toUpperCase();
            tokens.set(upperAddress, {
                address: originalAddress,
                symbol: typeof symbolResult.result === "string" && symbolResult.result.length ? symbolResult.result : truncateAddress(upperAddress),
                name: typeof nameResult.result === "string" && nameResult.result.length ? nameResult.result : undefined,
                logo: '',
            });
        }
    }
    return { tokens, pairs };
}

interface TokenMetadata {
    address: string;
    symbol: string;
    name?: string;
    logo: string;
}

interface BuildDatasetsParams {
    swapEvents: any[];
    pairs: PairMetadata[];
    tokens: Map<string, TokenMetadata>;
    explorerUrl: string;
    network: any;
}

function buildDatasets({
    swapEvents,
    pairs,
    tokens,
    explorerUrl,
    network
}: BuildDatasetsParams) {
    if (network.chainId === 25925) {
        const _volumeTokens: Record<string, LeaderboardEntry & { _latestTs?: number }> = {};
        for (const tx of swapEvents) {
            let key: string = tx.symbol || tx.name || tx.address;
            let name: string = tx.name;
            let symbol: string = tx.symbol;
            let logo: string = tx.logo;
            let address: `0x${string}` = tx.address as `0x${string}`;
            if (!_volumeTokens[key]) _volumeTokens[key] = {id: key, name, subtitle: symbol, logo, value: 0, address, type: 'token', chainId: network.chainId,} as any;
            _volumeTokens[key].value += Number(tx.value);
            const ts = typeof tx.timestampMs === 'number' ? tx.timestampMs : undefined;
            if (ts !== undefined) _volumeTokens[key]._latestTs = Math.max(_volumeTokens[key]._latestTs ?? 0, ts);
        }
        const volumeTokens = (Object.values(_volumeTokens) as (LeaderboardEntry & { _latestTs?: number })[]).map(e => ({...e, timestamp: e._latestTs})).sort(
            (a: any, b: any) => b.value - a.value
        );

        const _volumeTraders: Record<string, LeaderboardEntry & { _latestTs?: number }> = {};
        for (const tx of swapEvents) {
            let key: string = tx.trader;
            let name: string = tx.name;
            let symbol: string = tx.symbol;
            let logo: string = tx.logo;
            let trader: `0x${string}` = tx.trader as `0x${string}`;
            if (!_volumeTraders[key]) _volumeTraders[key] = {id: key, name, subtitle: symbol, logo, value: 0, address: trader, type: 'trader', chainId: network.chainId,} as any;
            _volumeTraders[key].value += Number(tx.value);
            const ts = typeof tx.timestampMs === 'number' ? tx.timestampMs : undefined;
            if (ts !== undefined) _volumeTraders[key]._latestTs = Math.max(_volumeTraders[key]._latestTs ?? 0, ts);
        }
        const volumeTraders = (Object.values(_volumeTraders) as (LeaderboardEntry & { _latestTs?: number })[]).map(e => ({...e, timestamp: e._latestTs})).sort(
            (a: any, b: any) => b.value - a.value
        );

        const _profitTraders: Record<string, LeaderboardEntry & { _latestTs?: number }> = {};
        for (const tx of swapEvents) {
            let key: string = tx.trader;
            let name: string = tx.name;
            let symbol: string = tx.symbol;
            let logo: string = tx.logo;
            let trader: `0x${string}` = tx.trader as `0x${string}`;
            if (!_profitTraders[key]) _profitTraders[key] = {id: key, name, subtitle: symbol, logo, value: 0, address: trader, type: 'trader', chainId: network.chainId,} as any;
            if (tx.action === "buy") {
                _profitTraders[key].value += Number(tx.value);
            } else if (tx.action === "buy") {
                _profitTraders[key].value -= Number(tx.value);
            }
            const ts = typeof tx.timestampMs === 'number' ? tx.timestampMs : undefined;
            if (ts !== undefined) _profitTraders[key]._latestTs = Math.max(_profitTraders[key]._latestTs ?? 0, ts);
        }
        const profitTraders = (Object.values(_profitTraders) as (LeaderboardEntry & { _latestTs?: number })[]).map(e => ({...e, timestamp: e._latestTs})).sort(
            (a: any, b: any) => b.value - a.value
        );

        const _degenTraders: Record<string, LeaderboardEntry & { _latestTs?: number }> = {};
        for (const tx of swapEvents) {
            let key: string = tx.trader;
            let name: string = tx.name;
            let symbol: string = tx.symbol;
            let logo: string = tx.logo;
            let trader: `0x${string}` = tx.trader as `0x${string}`;
            if (!_degenTraders[key]) _degenTraders[key] = {id: key, name, subtitle: symbol, logo, value: 0, address: trader, type: 'degen', chainId: network.chainId,} as any;
            _degenTraders[key].value += 1;
            const ts = typeof tx.timestampMs === 'number' ? tx.timestampMs : undefined;
            if (ts !== undefined) _degenTraders[key]._latestTs = Math.max(_degenTraders[key]._latestTs ?? 0, ts);
        }
        const degenTraders = (Object.values(_degenTraders) as (LeaderboardEntry & { _latestTs?: number })[]).map(e => ({...e, timestamp: e._latestTs})).sort(
            (a: any, b: any) => b.value - a.value
        );

        return { volumeTokens, volumeTraders, profitTraders, degenTraders };
    } else {
        const explorerBase = explorerUrl.replace(/\/$/, "");
        const pairMap = new Map<string, PairMetadata>();
        const tokenToPair = new Map<string, `0x${string}`>();
        pairs.forEach((pair) => {
            pairMap.set(pair.pairAddress.toUpperCase(), pair);
            tokenToPair.set(pair.tokenAddress.toUpperCase(), pair.pairAddress);
        });

        const tokenVolume = new Map<string, number>();
        const traderVolume = new Map<string, number>();
        const traderProfit = new Map<string, number>();
        const tokenLatestTs = new Map<string, number>();
        const traderLatestTs = new Map<string, number>();
        const traderProfitLatestTs = new Map<string, number>();

        swapEvents.forEach((event) => {
            const { address, args } = event;
            const pair = pairMap.get((address as string).toUpperCase());
            if (!pair) return;

            const rawAmountValue = pair.baseIsToken0 ? args.amount0 : args.amount1;
            if (rawAmountValue === undefined) return;

            const amountRaw = Number(formatEther(rawAmountValue as bigint));

            if (!Number.isFinite(amountRaw)) return;

            const absoluteAmount = Math.abs(amountRaw);
            const tokenKey = pair.tokenAddress.toUpperCase();
            tokenVolume.set(tokenKey, (tokenVolume.get(tokenKey) ?? 0) + absoluteAmount);
            const ts = typeof (event as any).timestampMs === 'number' ? (event as any).timestampMs as number : undefined;
            if (ts !== undefined) tokenLatestTs.set(tokenKey, Math.max(tokenLatestTs.get(tokenKey) ?? 0, ts));

            const recipient = (args.recipient as string | undefined)?.toUpperCase();
            if (!recipient || recipient === PLACEHOLDER_ADDRESS.toUpperCase()) return;

            traderVolume.set(recipient, (traderVolume.get(recipient) ?? 0) + absoluteAmount);
            if (ts !== undefined) traderLatestTs.set(recipient, Math.max(traderLatestTs.get(recipient) ?? 0, ts));

            if (amountRaw < 0) {
                traderProfit.set(
                    recipient,
                    (traderProfit.get(recipient) ?? 0) + Math.abs(amountRaw),
                );
                if (ts !== undefined) traderProfitLatestTs.set(recipient, Math.max(traderProfitLatestTs.get(recipient) ?? 0, ts));
            } else if (!traderProfit.has(recipient)) {
                traderProfit.set(recipient, 0);
                if (ts !== undefined) traderProfitLatestTs.set(recipient, Math.max(traderProfitLatestTs.get(recipient) ?? 0, ts));
            }
        });

        const volumeTokens: LeaderboardEntry[] = Array.from(tokenVolume.entries())
            .map(([tokenAddress, value]) => {
                const metadata = tokens.get(tokenAddress);
                const resolvedAddress = (metadata?.address ?? tokenAddress) as `0x${string}`;
                const lp = tokenToPair.get(resolvedAddress.toUpperCase());
                return {
                    id: tokenAddress,
                    name: metadata?.symbol ?? truncateAddress(tokenAddress),
                    subtitle: metadata?.name,
                    value,
                    logo: '',
                    href: `${explorerBase}/address/${resolvedAddress}`,
                    address: resolvedAddress,
                    lp,
                    type: "token",
                    timestamp: tokenLatestTs.get(tokenAddress),
                    chainId: network.chainId,
                } satisfies LeaderboardEntry;
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 20);

        const volumeTraders: LeaderboardEntry[] = Array.from(traderVolume.entries())
            .map(([traderAddress, value]) => {
                const resolvedAddress = traderAddress as `0x${string}`;
                return {
                    id: traderAddress,
                    name: truncateAddress(traderAddress),
                    value,
                    logo: '',
                    address: resolvedAddress,
                    href: `${explorerBase}/address/${resolvedAddress}`,
                    type: "trader",
                    timestamp: traderLatestTs.get(traderAddress),
                    chainId: network.chainId,
                } satisfies LeaderboardEntry;
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 20);

        const profitTraders: LeaderboardEntry[] = Array.from(traderProfit.entries())
            .filter(([, value]) => value > 0)
            .map(([traderAddress, value]) => {
                const resolvedAddress = traderAddress as `0x${string}`;
                return {
                    id: `${traderAddress}-profit`,
                    name: truncateAddress(traderAddress),
                    value,
                    logo: '',
                    address: resolvedAddress,
                    href: `${explorerBase}/address/${resolvedAddress}`,
                    type: "trader",
                    timestamp: traderProfitLatestTs.get(traderAddress),
                    chainId: network.chainId,
                } satisfies LeaderboardEntry;
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 20);
        
        const degenTraders: LeaderboardEntry[] = [];
        return { volumeTokens, volumeTraders, profitTraders, degenTraders };
    }
}

async function attachBlockTimestamps(publicClient: any, swapEvents: any[], network: any) {
    try {
        if (!Array.isArray(swapEvents) || swapEvents.length === 0) return swapEvents;
        // Collect unique block numbers as bigint
        const blockNums = new Set<string>();
        for (const ev of swapEvents) {
            const bn = network.chainId === 25925 ? BigInt(ev.block) : (ev.blockNumber as bigint | undefined);
            if (bn !== undefined) blockNums.add(bn.toString());
        }
        if (!blockNums.size) return swapEvents;

        const bnList = Array.from(blockNums).map((s) => BigInt(s));
        const blocks = await Promise.all(
            bnList.map((bn) => publicClient.getBlock({ blockNumber: bn }).catch(() => undefined))
        );
        const tsMap = new Map<string, number>();
        blocks.forEach((b) => {
            if (!b) return;
            const ts = Number(b.timestamp) * 1000;
            tsMap.set((b.number as bigint).toString(), ts);
        });

        return swapEvents.map((ev) => {
            const bn = network.chainId === 25925 ? BigInt(ev.block) : (ev.blockNumber as bigint | undefined);
            const ts = bn !== undefined ? tsMap.get(bn.toString()) : undefined;
            return { ...ev, timestampMs: ts };
        });
    } catch {
        return swapEvents;
    }
}

function buildFallbackTabs(): LeaderboardTab[] {
    const emptyTab: LeaderboardTab = {
        id: "volume-token",
        label: "TOp Volume Cult",
        entries: [],
    };
    return [
        emptyTab,
        { ...emptyTab, id: "top-volume-trader", label: "Top Volume Trader" },
        { ...emptyTab, id: "top-profit-trader", label: "Top Profit Trader" },
    ];
}

function truncateAddress(address: string) {
    if (!address) return "-";
    const normalized = address.toLowerCase();
    return `${normalized.slice(0, 6)}...${normalized.slice(-4)}`;
}
