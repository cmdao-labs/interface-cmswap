import { connection } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseServer";
import GridLayout, { CoinCardData } from "./GridLayout";

const FALLBACK_LOGO = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='%230a111f'/><path d='M20 34c0-7.732 6.268-14 14-14s14 6.268 14 14-6.268 14-14 14-14-6.268-14-14Zm14-10a10 10 0 1 0 10 10 10.011 10.011 0 0 0-10-10Zm1 6v5.586l3.707 3.707-1.414 1.414L33 37.414V30h2Z' fill='%235965f7'/></svg>";
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
type NetworkKey = "kubtestnet";
type NetworkConfig = { key: NetworkKey; baseSymbol: string; chainTag: string; queryChain: string; queryMode: "lite" | "pro"; };
type ListingMetrics = { id: string; address: `0x${string}`; symbol: string; name: string; description?: string; logoUrl: string; createdAt?: number; creator?: string; price: number; marketCap: number; searchTerms: string; };
type KubTestnetContext = { network: NetworkConfig };
function resolveNetworkConfig(mode: string): NetworkConfig {
    const normalizedMode = (mode || "pro").toLowerCase() as "lite" | "pro";
    return {key: "kubtestnet", baseSymbol: "tKUB", chainTag: "tKUB", queryChain: "kubtestnet", queryMode: normalizedMode,};
}
async function fetchSupabaseListings({ network }: KubTestnetContext): Promise<ListingMetrics[]> {
    const supabase = getServiceSupabase();
    const PAGE_SIZE = 1000;
    let offset = 0;
    const tokens: Array<{ address?: string; symbol?: string; name?: string; description?: string; logo?: string; created_time?: number | string | null; creator?: string; }> = [];
    while (true) {
        const page = await supabase
            .from('tokens')
            .select('address, symbol, name, description, logo, created_time, creator')
            .order('created_time', { ascending: false })
            .range(offset, offset + PAGE_SIZE - 1);
        const rows = (page.data || []) as typeof tokens;
        tokens.push(...rows);
        if (!rows.length || rows.length < PAGE_SIZE) break;
        offset += rows.length;
    }
    const addresses = tokens.map((t) => String(t.address || '')).filter(Boolean);
    const latestPriceByToken = new Map<string, { price: number; timestamp: number }>();
    const ADDR_CHUNK = 150;
    const SWAPS_PAGE = 1000;
    for (let i = 0; i < addresses.length; i += ADDR_CHUNK) {
        const chunk = addresses.slice(i, i + ADDR_CHUNK);
        let gotForChunk = 0;
        let start = 0;
        while (gotForChunk < chunk.length) {
            const { data, error } = await supabase
                .from('swaps')
                .select('token_address, price, timestamp')
                .in('token_address', chunk)
                .order('timestamp', { ascending: false })
                .range(start, start + SWAPS_PAGE - 1);
            if (error) break;
            const rows = (data || []) as Array<{ token_address?: string; price?: number; timestamp?: number }>;
            if (!rows.length) break;
            for (const r of rows) {
                const addr = String(r.token_address || '');
                if (!addr || latestPriceByToken.has(addr)) continue;
                const p = Number(r.price);
                const ts = Number(r.timestamp || 0);
                if (!Number.isFinite(p)) continue;
                latestPriceByToken.set(addr, { price: p, timestamp: ts });
                gotForChunk += 1;
                if (gotForChunk >= chunk.length) break;
            }
            if (rows.length < SWAPS_PAGE) break;
            start += rows.length;
        }
    }
    const listings: ListingMetrics[] = tokens.map((t) => {
        const addrRaw = String(t.address || '');
        const sym = String(t.symbol || '');
        const nm = String(t.name || sym || '');
        const logoUrl = resolveLogoUrl(String(t.logo || ''));
        const createdAt = toSecondsMaybe(Number(t.created_time || 0));
        const latest = latestPriceByToken.get(addrRaw);
        const price = latest?.price || 0;
        const marketCap = Number.isFinite(price) ? price * 1_000_000_000 : 0;
        return {id: addrRaw, address: addrRaw as `0x${string}`, symbol: sym || 'N/A', name: nm || sym || 'Token', description: t.description || undefined, logoUrl, createdAt, creator: t.creator as `0x${string}` | undefined, price, marketCap, searchTerms: `${sym} ${nm}`.toLowerCase()} satisfies ListingMetrics;
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
function mapToCoinCards(listings: ListingMetrics[], { baseSymbol, chainParam, modeParam }: { baseSymbol: string; chainParam: string; modeParam: "lite" | "pro"; },): CoinCardData[] {
    return listings.map((listing) => {
        const href = buildTokenHref(listing.address, chainParam, modeParam);
        const marketCapDisplay = formatMarketCap(listing.marketCap, baseSymbol);
        const progressPercent = computeProgressPercent(listing, chainParam, modeParam);
        return {id: listing.id, href, name: listing.name, symbol: listing.symbol, logoUrl: listing.logoUrl, marketCapDisplay, createdAgo: formatRelativeTime(listing.createdAt), progressPercent} satisfies CoinCardData;
    });
}
function buildTokenHref(address: string, chain: string, mode: "lite" | "pro") {
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
function computeProgressPercent(listing: ListingMetrics, chain: string, mode: "lite" | "pro") {
    const c = chain.toLowerCase();
    const m = mode.toLowerCase();
    const denom = (() => {
        if (c === "kubtestnet" && m === "pro") return 60600;
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
    if (n > 1e12) return Math.floor(n / 1000);
    return n;
}

export default async function TokenGrid({ mode, query, sort, order }: { mode: string; query: string; sort: string; order: string; }) {
    await connection();
    const network = resolveNetworkConfig(mode);
    const listings = await fetchSupabaseListings({ network });
    const filteredListings = filterListings(listings, query);
    const sortedListings = sortListings(filteredListings, sort, order);
    const coins = mapToCoinCards(sortedListings, {baseSymbol: network.baseSymbol, chainParam: network.queryChain, modeParam: network.queryMode});
    return <GridLayout coins={coins} />;
}
