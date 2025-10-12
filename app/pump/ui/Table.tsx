import { connection } from "next/server";
import { readContracts } from "@wagmi/core";
import { createPublicClient, http, erc20Abi, formatUnits, type Chain, type PublicClient, } from "viem";
import { bitkubTestnet } from "viem/chains";
import GridLayout, { CoinCardData } from "./GridLayout";
import { config } from "@/app/config";
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";

const FALLBACK_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='%230a111f'/><path d='M20 34c0-7.732 6.268-14 14-14s14 6.268 14 14-6.268 14-14 14-14-6.268-14-14Zm14-10a10 10 0 1 0 10 10 10.011 10.011 0 0 0-10-10Zm1 6v5.586l3.707 3.707-1.414 1.414L33 37.414V30h2Z' fill='%235965f7'/></svg>";
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export default async function TokenGrid({ mode, query, sort, order, chain, token }: {
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
            { address: network.currencyAddress, abi: erc20Abi, functionName: "symbol", chainId: network.chainId },
            { address: network.currencyAddress, abi: erc20Abi, functionName: "decimals", chainId: network.chainId },
        ],
    });

    const currencySymbol = extractResult<string>(currencyMeta, 0) || network.baseSymbol;

    const listings = await fetchKubTestnetListings({network, publicClient,})
    const filteredListings = filterListings(listings, query);
    const sortedListings = sortListings(filteredListings, sort, order);
    const coins = mapToCoinCards(sortedListings, {
        baseSymbol: mode === 'lite' ? currencySymbol : network.baseSymbol,
        chainParam: network.queryChain,
        modeParam: network.queryMode,
    });

    return <GridLayout coins={coins} />;
}

type NetworkKey = "kubtestnet";

type NetworkConfig = {
    key: NetworkKey;
    chainId: number;
    chain: Chain;
    currencyAddress: `0x${string}`;
    factoryAddress: `0x${string}`;
    poolFactoryAddress: `0x${string}`;
    factoryAbi: typeof ERC20FactoryV2ABI;
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
    price: number;
    marketCap: number;
    searchTerms: string;
};

type KubTestnetContext = {
    network: NetworkConfig;
    publicClient: PublicClient;
};

function resolveNetworkConfig(chain: string, mode: string, token: string): NetworkConfig {
    const normalizedChain = (chain || "kubtestnet").toLowerCase() as NetworkKey;
    const normalizedMode = (mode || "lite").toLowerCase() as "lite" | "pro";

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
                    { address: tokenAddress, abi: erc20Abi, functionName: "symbol", chainId: network.chainId },
                    { address: tokenAddress, abi: erc20Abi, functionName: "name", chainId: network.chainId },
                    { address: tokenAddress, abi: erc20Abi, functionName: "decimals", chainId: network.chainId },
                    { address: tokenAddress, abi: erc20Abi, functionName: "totalSupply", chainId: network.chainId },
                    { ...{ address: network.factoryAddress, abi: network.factoryAbi, chainId: network.chainId }, functionName: "pumpReserve", args: [tokenAddress] },
                    { ...{ address: network.factoryAddress, abi: network.factoryAbi, chainId: network.chainId }, functionName: "virtualAmount" },
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
        const href = buildTokenHref(listing.address, chainParam, modeParam);
        const marketCapDisplay = formatMarketCap(listing.marketCap, baseSymbol);
        const progressPercent = computeProgressPercent(listing, chainParam, modeParam);
        return {
            id: listing.id,
            href,
            name: listing.name,
            symbol: listing.symbol,
            logoUrl: listing.logoUrl,
            marketCapDisplay,
            createdAgo: formatRelativeTime(listing.createdAt),
            progressPercent,
        } satisfies CoinCardData;
    });
}

function buildTokenHref(
    address: string,
    chain: string,
    mode: "lite" | "pro",
) {
    const params = new URLSearchParams();
    params.set("ticker", address);
    params.set("chain", chain);
    params.set("mode", mode);
    return `launchpad/token?${params.toString()}`;
}

function formatMarketCap(value: number, symbol: string) {
    if (!Number.isFinite(value) || value <= 0) return `${symbol} --`;
    return `${symbol} ${Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;
}

function computeProgressPercent(
    listing: ListingMetrics,
    chain: string,
    mode: "lite" | "pro",
) {
    const c = chain.toLowerCase();
    const m = mode.toLowerCase();
    const denom = (() => {
        if (c === "kubtestnet" && m === "pro") return 47800;
        return undefined;
    })();

    if (!denom || denom <= 0) return 0;

    const raw = c === "kubtestnet" ? listing.marketCap : listing.price;
    const pct = (raw * 100) / denom;
    if (!Number.isFinite(pct)) return 0;
    return pct;
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
