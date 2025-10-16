import { connection } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseServer";
import GridLayout, { CoinCardData } from "./GridLayout";

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
    const listings = await fetchSupabaseListings({ network });
    const filteredListings = filterListings(listings, query);
    const sortedListings = sortListings(filteredListings, sort, order);
    const coins = mapToCoinCards(sortedListings, {
        baseSymbol: network.baseSymbol,
        chainParam: network.queryChain,
        modeParam: network.queryMode,
    });

    return <GridLayout coins={coins} />;
}

type NetworkKey = "kubtestnet";

type NetworkConfig = {
    key: NetworkKey;
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

type KubTestnetContext = { network: NetworkConfig };

function resolveNetworkConfig(chain: string, mode: string, token: string): NetworkConfig {
    const normalizedChain = (chain || "kubtestnet").toLowerCase() as NetworkKey;
    const normalizedMode = (mode || "lite").toLowerCase() as "lite" | "pro";

    return {
        key: "kubtestnet",
        baseSymbol: "tKUB",
        chainTag: "tKUB",
        queryChain: "kubtestnet",
        queryMode: "pro",
    };
}

async function fetchSupabaseListings({ network }: KubTestnetContext): Promise<ListingMetrics[]> {
    const supabase = getServiceSupabase();

    // Fetch tokens metadata
    const tokenRes = await supabase
        .from('tokens')
        .select('address, symbol, name, description, logo, created_time, creator')
        .order('created_time', { ascending: false });
    const tokens = (tokenRes.data || []) as Array<{
        address?: string;
        symbol?: string;
        name?: string;
        description?: string;
        logo?: string;
        created_time?: number | string | null;
        creator?: string;
    }>;

    const addresses = tokens.map((t) => String(t.address || '')).filter(Boolean);

    // Fetch latest swap price per token in a single query, then reduce
    let latestPriceByToken = new Map<string, { price: number; timestamp: number }>();
    if (addresses.length > 0) {
        const swapsRes = await supabase
            .from('swaps')
            .select('token_address, price, timestamp')
            .in('token_address', addresses)
            .order('timestamp', { ascending: false });
        for (const r of swapsRes.data || []) {
            const addr = String((r as any).token_address || '');
            if (!addr || latestPriceByToken.has(addr)) continue; // first row per token (latest)
            const p = Number((r as any).price || 0);
            const ts = Number((r as any).timestamp || 0);
            latestPriceByToken.set(addr, { price: Number.isFinite(p) ? p : 0, timestamp: ts });
        }
    }

    // Map into ListingMetrics
    const listings: ListingMetrics[] = tokens.map((t) => {
        const addr = String(t.address || '');
        const sym = String(t.symbol || '');
        const nm = String(t.name || sym || '');
        const logoUrl = resolveLogoUrl(String(t.logo || ''));
        const createdAt = toSecondsMaybe(Number(t.created_time || 0));
        const latest = latestPriceByToken.get(addr);
        const price = latest?.price || 0;
        const marketCap = Number.isFinite(price) ? price * 1_000_000_000 : 0; // assume 1e9 supply
        return {
            id: addr,
            address: addr as `0x${string}`,
            symbol: sym || 'N/A',
            name: nm || sym || 'Token',
            description: t.description || undefined,
            logoUrl,
            createdAt,
            creator: t.creator as `0x${string}` | undefined,
            price,
            marketCap,
            searchTerms: `${sym} ${nm}`.toLowerCase(),
        } satisfies ListingMetrics;
    });

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

function toSecondsMaybe(ts: number | undefined | null): number | undefined {
    if (!ts || !Number.isFinite(Number(ts))) return undefined;
    const n = Number(ts);
    // Heuristic: if timestamp looks like ms, convert to seconds
    if (n > 1e12) return Math.floor(n / 1000);
    return n;
}
