import { headers } from "next/headers";
import { bitkubTestnet } from "viem/chains";
import LeaderboardTabs, { LeaderboardEntry, LeaderboardTab, } from "./LeaderboardTabs";

interface LeaderboardProps {rankby: string; mode: string; chain: string; token: string;}
interface NetworkConfig {chain: typeof bitkubTestnet; chainId: number; explorer: string; rpcUrl: string; currencyAddress: `0x${string}`; factoryAddress: `0x${string}`; blockCreated: number;}
function resolveNetworkConfig({ chain, mode, token, }: Pick<LeaderboardProps, "chain" | "mode" | "token">): NetworkConfig {
    const normalizedChain = chain || "kubtestnet";
    const normalizedMode = mode || "pro";
    const normalizedToken = token || "";
    const isKubTestnet = normalizedChain === "kubtestnet";
    let chainConfig: typeof bitkubTestnet = bitkubTestnet;
    let explorer = "https://www.kubscan.com";
    const defaultRpc = chainConfig.rpcUrls.default?.http?.[0] ?? "";
    let rpcUrl = process.env.NEXT_PUBLIC_KUB_RPC ?? defaultRpc;
    if (isKubTestnet) {
        chainConfig = bitkubTestnet;
        explorer = "https://testnet.kubscan.com";
        rpcUrl = process.env.NEXT_PUBLIC_KUB_TESTNET_RPC ?? (chainConfig.rpcUrls.default?.http?.[0] ?? "");
    }
    const networkMatrix = {
        kubtestnet: {
            pro: {default: {currencyAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907" as const, factoryAddress: "0x46a4073c830031ea19d7b9825080c05f8454e530" as const, blockCreated: 23935659,},},
        },
    } as const;
    const chainKey = isKubTestnet ? "kubtestnet" : "kubtestnet";
    const availableModes = networkMatrix[chainKey];
    const modeKey = normalizedMode in availableModes ? normalizedMode : Object.keys(availableModes)[0];
    const modeBucket = availableModes[modeKey as keyof typeof availableModes] as Record<string, { currencyAddress: `0x${string}`; factoryAddress: `0x${string}`; blockCreated: number }>;
    const tokenKey = normalizedToken in modeBucket ? normalizedToken : "default";
    const resolved = modeBucket[tokenKey];
    if (!resolved) throw new Error("Unsupported network configuration");
    return {chain: chainConfig, chainId: chainConfig.id, explorer, rpcUrl, currencyAddress: resolved.currencyAddress, blockCreated: resolved.blockCreated, factoryAddress: resolved.factoryAddress,};
}
function buildFallbackTabs(): LeaderboardTab[] {
    const emptyTab: LeaderboardTab = {id: "volume-token", label: "Top Volume Cult", entries: [],};
    return [emptyTab, { ...emptyTab, id: "top-volume-trader", label: "Top Volume Trader" }, { ...emptyTab, id: "top-profit-trader", label: "Top Profit Trader" },];
}
function truncateAddress(address: string) {
    if (!address) return "-";
    const normalized = address.toLowerCase();
    return `${normalized.slice(0, 6)}...${normalized.slice(-4)}`;
}

export default async function Leaderboard({ mode, chain, token, }: LeaderboardProps) {
    const network = resolveNetworkConfig({ chain, mode, token });
    if (network.chainId !== 25925) return (<LeaderboardTabs explorerUrl={network.explorer} tabs={buildFallbackTabs()} chainId={network.chainId} />);
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const lbLimit = 100;
    const res = await fetch(`${baseUrl}/api/swaps/leaderboard?chainId=${network.chainId}&limit=${lbLimit}`, { cache: "no-store" });
    const payload = res.ok ? await res.json() : null;
    const responseChainId = typeof payload?.chainId === 'number' ? payload.chainId : network.chainId;
    const tokenMeta = new Map<string, { symbol?: string; name?: string; logo?: string }>();
    const metaObj = (payload?.tokens ?? {}) as Record<string, { symbol?: string | null; name?: string | null; logo?: string | null }>;
    for (const k of Object.keys(metaObj)) {
        const v = metaObj[k];
        tokenMeta.set(k.toLowerCase(), { symbol: v?.symbol ?? undefined, name: v?.name ?? undefined, logo: v?.logo ?? undefined });
    }
    const explorerBase = network.explorer.replace(/\/$/, "");
    const volumeTokens = ((payload?.volumeTokens ?? []) as Array<{ token_address: string; value: number; latest_ts?: number | null }>).map((row) => {
        const addr = String(row.token_address || "");
        const meta = tokenMeta.get(addr.toLowerCase()) || {};
        const fallbackSym = addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}`.toUpperCase() : '';
        return {id: addr, name: meta.symbol || fallbackSym, subtitle: meta.name, logo: meta.logo || '', value: Number(row.value || 0), address: addr as `0x${string}`, href: `${explorerBase}/address/${addr}`, type: 'token' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId,} as LeaderboardEntry;
    });
    const volumeTraders = ((payload?.volumeTraders ?? []) as Array<{ sender: string; value: number; latest_ts?: number | null }>).map((row) => {
        const addr = String(row.sender || "");
        return {id: addr, name: truncateAddress(addr), logo: '', value: Number(row.value || 0), address: addr as `0x${string}`, type: 'trader' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId,} as LeaderboardEntry;
    });
    const profitTraders = ((payload?.profitTraders ?? []) as Array<{ sender: string; value: number; latest_ts?: number | null }>).map((row) => {
        const addr = String(row.sender || "");
        return {id: `${addr}-profit`, name: truncateAddress(addr), logo: '', value: Number(row.value || 0), address: addr as `0x${string}`, type: 'trader' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId,} as LeaderboardEntry;
    });
    const degenTraders = ((payload?.degenTraders ?? []) as Array<{ sender: string; value: number; latest_ts?: number | null }>).map((row) => {
        const addr = String(row.sender || "");
        return {id: `${addr}-degen`, name: truncateAddress(addr), logo: '', value: Number(row.value || 0), address: addr as `0x${string}`, type: 'degen' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId,} as LeaderboardEntry;
    });
    const tabs: LeaderboardTab[] = [
        {id: "volume-token", label: "Top Volume Cult", entries: volumeTokens,},
        {id: "top-volume-trader", label: "Top Volume Trader", entries: volumeTraders,},
        {id: "top-profit-trader", label: "Top Profit Trader", entries: profitTraders,},
        {id: "top-degen-trader", label: "Top Degen Trader", entries: degenTraders,},
    ];
    return <LeaderboardTabs explorerUrl={network.explorer} tabs={tabs} chainId={responseChainId} />;
}
