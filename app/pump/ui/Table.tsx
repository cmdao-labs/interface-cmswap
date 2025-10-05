import { connection } from "next/server";
import { readContracts } from "@wagmi/core";
import { createPublicClient, http, erc20Abi, formatUnits, type Chain, type PublicClient, } from "viem";
import { bitkub, monadTestnet, bitkubTestnet } from "viem/chains";
import GridLayout, { CoinCardData } from "@/app/pump/launchpad/components/GridLayout";
import { config } from "@/app/config";
import { ERC20FactoryETHABI } from "@/app/pump/abi/ERC20FactoryETH";
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";
import { UniswapV2FactoryABI } from "@/app/pump/abi/UniswapV2Factory";
import { UniswapV2PairABI } from "@/app/pump/abi/UniswapV2Pair";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const FALLBACK_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='%230a111f'/><path d='M20 34c0-7.732 6.268-14 14-14s14 6.268 14 14-6.268 14-14 14-14-6.268-14-14Zm14-10a10 10 0 1 0 10 10 10.011 10.011 0 0 0-10-10Zm1 6v5.586l3.707 3.707-1.414 1.414L33 37.414V30h2Z' fill='%235965f7'/></svg>";
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export default async function TokenGrid({
    mode,
    query,
    sort,
    order,
    chain,
    token,
}: {
    mode: string;
    query: string;
    sort: string;
    order: string;
    chain: string;
    token: string;
}) {
    await connection();

    const network = resolveNetworkConfig(chain, mode, token);
    const transportUrl = network.rpcUrl || network.chain.rpcUrls?.public?.http?.[0] || network.chain.rpcUrls?.default?.http?.[0];
    if (!transportUrl) throw new Error("Missing RPC URL for selected chain");
    const publicClient = createPublicClient({ chain: network.chain, transport: http(transportUrl), });

    const currencyMeta = await readContracts(config, {
        contracts: [
            {
                address: network.currencyAddress,
                abi: erc20Abi,
                functionName: "symbol",
                chainId: network.chainId,
            },
            {
                address: network.currencyAddress,
                abi: erc20Abi,
                functionName: "decimals",
                chainId: network.chainId,
            },
        ],
    });

    const currencySymbol = extractResult<string>(currencyMeta, 0) || network.baseSymbol;
    const currencyDecimals = Number(extractResult<number | bigint>(currencyMeta, 1) ?? 18,);

    const listings = network.key === "kubtestnet" ?
        await fetchKubTestnetListings({network, publicClient,}) :
        await fetchFactoryListings({network, currencyDecimals,});
    const filteredListings = filterListings(listings, query);
    const sortedListings = sortListings(filteredListings, sort, order);
    const coins = mapToCoinCards(sortedListings, {
        baseSymbol: currencySymbol || network.baseSymbol,
        chainParam: network.queryChain,
        modeParam: network.queryMode,
    });

    return <GridLayout coins={coins} />;
}

type NetworkKey = "kub" | "monad" | "kubtestnet";

type NetworkConfig = {
    key: NetworkKey;
    chainId: number;
    chain: Chain;
    currencyAddress: `0x${string}`;
    factoryAddress: `0x${string}`;
    poolFactoryAddress: `0x${string}`;
    factoryAbi: typeof ERC20FactoryETHABI | typeof ERC20FactoryV2ABI;
    blockCreated: bigint;
    rpcUrl?: string;
    baseSymbol: string;
    chainTag: string;
    queryChain: string;
    queryMode: "lite" | "pro";
};

type ListingMetrics = {
    id: string;
    address: `0x${string}`;
    symbol: string;
    name: string;
    description?: string;
    logoUrl: string;
    createdAt?: number;
    creator?: string;
    pool?: `0x${string}`;
    price: number;
    marketCap: number;
    searchTerms: string;
};

type FetchContext = {
    network: NetworkConfig;
    currencyDecimals: number;
};

type KubTestnetContext = {
    network: NetworkConfig;
    publicClient: PublicClient;
};

type PoolSnapshot = {
    slot0?: readonly [bigint, number, number, number, number, number, boolean];
    token0?: `0x${string}`;
    token1?: `0x${string}`;
};

function resolveNetworkConfig(chain: string, mode: string, token: string): NetworkConfig {
    const normalizedChain = (chain || "kub").toLowerCase() as NetworkKey;
    const normalizedMode = (mode || "lite").toLowerCase() as "lite" | "pro";

    if (normalizedChain === "kubtestnet") {
        return {
            key: "kubtestnet",
            chainId: 25925,
            chain: bitkubTestnet,
            currencyAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907",
            factoryAddress: "0x46a4073c830031ea19d7b9825080c05f8454e530",
            poolFactoryAddress: "0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b",
            factoryAbi: ERC20FactoryV2ABI,
            blockCreated: BigInt(23935659),
            rpcUrl: "https://rpc-testnet.bitkubchain.io",
            baseSymbol: "tKUB",
            chainTag: "tKUB",
            queryChain: "kubtestnet",
            queryMode: "pro",
        };
    }

    if (normalizedChain === "monad") {
        return {
            key: "monad",
            chainId: 10143,
            chain: monadTestnet,
            currencyAddress: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701",
            factoryAddress: "0x6dfc8eecca228c45cc55214edc759d39e5b39c93",
            poolFactoryAddress: "0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142",
            factoryAbi: ERC20FactoryETHABI,
            blockCreated: BigInt(23935659),
            rpcUrl: process.env.NEXT_PUBLIC_MONAD_RPC,
            baseSymbol: "MON",
            chainTag: "MON",
            queryChain: "monad",
            queryMode: "pro",
        };
    }

    if (normalizedMode === "pro") {
        return {
            key: "kub",
            chainId: 96,
            chain: bitkub,
            currencyAddress: "0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5",
            factoryAddress: "0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56",
            poolFactoryAddress: "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c",
            factoryAbi: ERC20FactoryETHABI,
            blockCreated: BigInt(23935659),
            baseSymbol: "KUB",
            chainTag: "KUB",
            queryChain: "kub",
            queryMode: "pro",
        };
    }

    const isCmm = token === "cmm" || token === "";

    return {
        key: "kub",
        chainId: 96,
        chain: bitkub,
        currencyAddress: isCmm ? "0x9b005000a10ac871947d99001345b01c1cef2790" : "0x9b005000a10ac871947d99001345b01c1cef2790",
        factoryAddress: "0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62",
        poolFactoryAddress: "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c",
        factoryAbi: ERC20FactoryETHABI,
        blockCreated: BigInt(23935659),
        baseSymbol: isCmm ? "CMM" : "KUB",
        chainTag: "KUB",
        queryChain: "kub",
        queryMode: "lite",
    };
}

async function fetchFactoryListings({
    network,
    currencyDecimals,
}: FetchContext): Promise<ListingMetrics[]> {
    const bkgafactoryContract = {address: network.factoryAddress, abi: network.factoryAbi, chainId: network.chainId,} as const;
    const univ2factoryContract = {address: network.poolFactoryAddress, abi: UniswapV2FactoryABI, chainId: network.chainId,} as const;

    const indexResponse = await readContracts(config, {
        contracts: [{ ...bkgafactoryContract, functionName: "totalIndex", },],
    });
    const totalIndex = Number(extractResult<number | bigint>(indexResponse, 0) ?? 0,);
    if (!Number.isFinite(totalIndex) || totalIndex <= 0) return [];

    const indexContracts = Array.from({ length: totalIndex }, (_, idx) => ({
        ...bkgafactoryContract,
        functionName: "index",
        args: [BigInt(idx + 1)],
    }));
    const indexResults = await readContracts(config, {contracts: indexContracts,});

    const tokenAddresses = indexResults
        .map((res) => (res.status === "success" ? res.result : undefined))
        .filter((addr): addr is `0x${string}` => Boolean(addr));

    const tokenMetadata = await Promise.all(
        tokenAddresses.map(async (tokenAddress) => {
            const metadata = await readContracts(config, {
                contracts: [
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "symbol",
                        chainId: network.chainId,
                    },
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "name",
                        chainId: network.chainId,
                    },
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "decimals",
                        chainId: network.chainId,
                    },
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "totalSupply",
                        chainId: network.chainId,
                    },
                    {
                        ...bkgafactoryContract,
                        functionName: "logo",
                        args: [tokenAddress],
                    },
                    {
                        ...bkgafactoryContract,
                        functionName: "creator",
                        args: [tokenAddress],
                    },
                    {
                        ...bkgafactoryContract,
                        functionName: "createdTime",
                        args: [tokenAddress],
                    },
                    {
                        ...bkgafactoryContract,
                        functionName: "desp",
                        args: [tokenAddress],
                    },
                    {
                        ...univ2factoryContract,
                        functionName: "getPool",
                        args: [tokenAddress, network.currencyAddress, 10000],
                    },
                ],
            });

            const symbol = extractResult<string>(metadata, 0) || "N/A";
            const name = extractResult<string>(metadata, 1) || symbol;
            const decimals = Number(extractResult<number | bigint>(metadata, 2) ?? 18,);
            const totalSupply = extractResult<bigint>(metadata, 3) ?? BigInt(0);
            const rawLogo = extractResult<string>(metadata, 4);
            const creator = extractResult<string>(metadata, 5);
            const createdAtRaw = extractResult<number | bigint>(metadata, 6);
            const description = extractResult<string>(metadata, 7);
            const pool = extractResult<string>(metadata, 8);

            return {
                address: tokenAddress,
                symbol,
                name,
                decimals,
                totalSupply,
                rawLogo,
                creator,
                createdAt: createdAtRaw ? Number(createdAtRaw) : undefined,
                description,
                pool:
                pool && pool !== ZERO_ADDRESS ? (pool as `0x${string}`) : undefined,
            };
        }),
    );

    const poolAddresses = tokenMetadata
        .map((token) => token.pool)
        .filter((pool): pool is `0x${string}` => Boolean(pool));

    const poolSnapshots = await Promise.all(
        poolAddresses.map(async (pool) => {
            const snapshot = await readContracts(config, {
                contracts: [
                    {
                        address: pool,
                        abi: UniswapV2PairABI,
                        functionName: "slot0",
                        chainId: network.chainId,
                    },
                    {
                        address: pool,
                        abi: UniswapV2PairABI,
                        functionName: "token0",
                        chainId: network.chainId,
                    },
                    {
                        address: pool,
                        abi: UniswapV2PairABI,
                        functionName: "token1",
                        chainId: network.chainId,
                    },
                ],
            });

            return {
                pool,
                slot0: extractResult<
                readonly [bigint, number, number, number, number, number, boolean]
                >(snapshot, 0),
                token0: extractResult<string>(snapshot, 1) as `0x${string}` | undefined,
                token1: extractResult<string>(snapshot, 2) as `0x${string}` | undefined,
            };
        }),
    );

    const poolSnapshotMap = new Map<string, PoolSnapshot>();
    poolSnapshots.forEach((entry) => {
        poolSnapshotMap.set(entry.pool.toLowerCase(), {slot0: entry.slot0, token0: entry.token0, token1: entry.token1,});
    });

    return tokenMetadata.map((token) => {
        const snapshot = token.pool ? poolSnapshotMap.get(token.pool.toLowerCase()) : undefined;

        const price = computePriceFromPool({
            snapshot,
            tokenAddress: token.address,
            tokenDecimals: token.decimals,
            currencyAddress: network.currencyAddress,
            currencyDecimals,
        });

        const supply = Number(formatUnits(token.totalSupply, token.decimals));
        const marketCap = Number.isFinite(price) ? price * supply : 0;

        return {
            id: token.address,
            address: token.address,
            symbol: token.symbol,
            name: token.name,
            description: token.description,
            logoUrl: resolveLogoUrl(token.rawLogo),
            createdAt: token.createdAt,
            creator: token.creator,
            pool: token.pool,
            price: Number.isFinite(price) ? price : 0,
            marketCap: Number.isFinite(marketCap) ? marketCap : 0,
            searchTerms: `${token.symbol} ${token.name}`.toLowerCase(),
        } satisfies ListingMetrics;
    });
}

async function fetchKubTestnetListings({
    network,
    publicClient,
}: KubTestnetContext): Promise<ListingMetrics[]> {
    const creationEvents = await publicClient.getContractEvents({
        address: network.factoryAddress,
        abi: network.factoryAbi,
        eventName: "Creation",
        fromBlock: network.blockCreated,
        toBlock: "latest",
    });

    const listings = await Promise.all(
        creationEvents.map(async (event: any) => {
            const tokenAddress = event.args?.tokenAddr as '0xstring';
            const metadata = await readContracts(config, {
                contracts: [
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "symbol",
                        chainId: network.chainId,
                    },
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "name",
                        chainId: network.chainId,
                    },
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "decimals",
                        chainId: network.chainId,
                    },
                    {
                        address: tokenAddress,
                        abi: erc20Abi,
                        functionName: "totalSupply",
                        chainId: network.chainId,
                    },
                    {
                        ...{
                            address: network.factoryAddress,
                            abi: network.factoryAbi,
                            chainId: network.chainId,
                        },
                        functionName: "pumpReserve",
                        args: [tokenAddress],
                    },
                    {
                        ...{
                            address: network.factoryAddress,
                            abi: network.factoryAbi,
                            chainId: network.chainId,
                        },
                        functionName: "virtualAmount",
                    },
                ],
            });

            const symbol = extractResult<string>(metadata, 0) || "N/A";
            const name = extractResult<string>(metadata, 1) || symbol;
            const decimals = Number(extractResult<number | bigint>(metadata, 2) ?? 18,);
            const totalSupply = extractResult<bigint>(metadata, 3) ?? BigInt(0);
            const pumpReserve = extractResult<readonly bigint[]>(metadata, 4);
            const virtualAmount = extractResult<bigint>(metadata, 5) ?? BigInt(0);
            const reserve0 = Number(pumpReserve?.[0] ?? BigInt(0));
            const reserve1 = Number(pumpReserve?.[1] ?? BigInt(0));
            const virtual = Number(virtualAmount);
            const denominator = reserve1 === 0 ? 1 : reserve1;
            const priceRaw = (reserve0 + virtual) / denominator;
            const price = Number.isFinite(priceRaw) ? priceRaw : 0;
            const supply = Number(formatUnits(totalSupply, decimals));
            const marketCap = Number.isFinite(price) ? price * supply : 0;
            const logoRaw = event.args?.logo as string | undefined;
            const fallbackLogo = event.args?.link1 as string | undefined;

            return {
                id: tokenAddress,
                address: tokenAddress,
                symbol,
                name,
                description: event.args?.description as string | undefined,
                logoUrl: resolveLogoUrl(logoRaw || fallbackLogo),
                createdAt: event.args?.createdTime ? Number(event.args.createdTime) : undefined,
                creator: event.args?.creator as `0x${string}` | undefined,
                pool: undefined,
                price,
                marketCap,
                searchTerms: `${symbol} ${name}`.toLowerCase(),
            } satisfies ListingMetrics;
        }),
    );
    return listings;
}

function filterListings(listings: ListingMetrics[], query: string) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return listings;
    return listings.filter((listing) => listing.searchTerms.includes(trimmed),);
}

function sortListings(listings: ListingMetrics[], sort: string, order: string) {
    const desired = sort.toLowerCase();
    const desiredOrder = order.toLowerCase();
    return [...listings].sort((a, b) => {
        if (desired === "created") {
            const createdA = a.createdAt ?? 0;
            const createdB = b.createdAt ?? 0;
            if (desiredOrder === "descending") return createdA - createdB;
            return createdB - createdA;
        }
        const capA = a.marketCap ?? 0;
        const capB = b.marketCap ?? 0;
        if (desiredOrder === "descending") return capA - capB;
        return capB - capA;
    });
}

function mapToCoinCards(
    listings: ListingMetrics[],
    {
        baseSymbol,
        chainParam,
        modeParam,
    }: {
        baseSymbol: string;
        chainParam: string;
        modeParam: "lite" | "pro";
    },
): CoinCardData[] {
    return listings.map((listing) => {
        const href = buildTokenHref(listing.address, listing.pool, chainParam, modeParam);
        const marketCapDisplay = formatMarketCap(listing.marketCap, baseSymbol);
        return {
            id: listing.id,
            href,
            name: listing.name,
            symbol: listing.symbol,
            logoUrl: listing.logoUrl,
            marketCapDisplay,
            createdAgo: formatRelativeTime(listing.createdAt),
        } satisfies CoinCardData;
    });
}

function computePriceFromPool({
    snapshot,
    tokenAddress,
    tokenDecimals,
    currencyAddress,
    currencyDecimals,
}: {
    snapshot?: PoolSnapshot;
    tokenAddress: `0x${string}`;
    tokenDecimals: number;
    currencyAddress: `0x${string}`;
    currencyDecimals: number;
}): number {
    if (!snapshot?.slot0 || !snapshot.token0 || !snapshot.token1) return 0;
    const sqrtPrice = Number(snapshot.slot0[0]);
    if (!Number.isFinite(sqrtPrice) || sqrtPrice === 0) return 0;
    const q = sqrtPrice / 2 ** 96;
    const ratio = q * q;
    const token0 = snapshot.token0.toLowerCase();
    const token1 = snapshot.token1.toLowerCase();
    const tokenLower = tokenAddress.toLowerCase();
    const currencyLower = currencyAddress.toLowerCase();
    const decimalsAdjustment = Math.pow(10, currencyDecimals - tokenDecimals);
    if (tokenLower === token0 && currencyLower === token1) {
        const price = ratio * decimalsAdjustment;
        return Number.isFinite(price) ? price : 0;
    }
    if (tokenLower === token1 && currencyLower === token0) {
        const inverse = ratio === 0 ? 0 : (1 / ratio) * decimalsAdjustment;
        return Number.isFinite(inverse) ? inverse : 0;
    }
    return 0;
}

function buildTokenHref(
    address: string,
    pool: string | undefined,
    chain: string,
    mode: "lite" | "pro",
) {
    const params = new URLSearchParams();
    params.set("ticker", address);
    if (pool) params.set("lp", pool);
    params.set("chain", chain);
    params.set("mode", mode);
    return `launchpad/token?${params.toString()}`;
}

function formatMarketCap(value: number, symbol: string) {
    if (!Number.isFinite(value) || value <= 0) return `${symbol} --`;
    return `${symbol} ${Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value)}`;
}

function formatRelativeTime(timestamp?: number) {
    if (!timestamp) return undefined;
    const now = Math.floor(Date.now() / 1000);
    const diff = timestamp - now;
    const abs = Math.abs(diff);
    if (abs < 60) return RELATIVE_TIME_FORMAT.format(Math.round(diff), "second");
    if (abs < 3600) return RELATIVE_TIME_FORMAT.format(Math.round(diff / 60), "minute");
    if (abs < 86400) return RELATIVE_TIME_FORMAT.format(Math.round(diff / 3600), "hour");
    return RELATIVE_TIME_FORMAT.format(Math.round(diff / 86400), "day");
}

function resolveLogoUrl(raw?: string) {
    if (!raw) return FALLBACK_LOGO;
    if (raw.startsWith("ipfs://")) return `https://cmswap.mypinata.cloud/ipfs/${raw.slice(7)}`;
    if (raw.startsWith("https://") || raw.startsWith("http://")) return raw;
    return `https://cmswap.mypinata.cloud/ipfs/${raw}`;
}

function extractResult<T>(responses: readonly any[], index: number): T | undefined {
    const entry = responses[index];
    if (!entry || entry.status !== "success") return undefined;
    return entry.result as T;
}
