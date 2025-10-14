import { bitkubTestnet } from "viem/chains";
import { formatEther } from "viem";
import { getServiceSupabase } from "@/lib/supabaseServer";
import LeaderboardTabs, { LeaderboardEntry, LeaderboardTab, } from "./LeaderboardTabs";

interface LeaderboardProps {
    rankby: string;
    mode: string;
    chain: string;
    token: string;
}

interface NetworkConfig {
    chain: typeof bitkubTestnet;
    chainId: number;
    explorer: string;
    rpcUrl: string;
    currencyAddress: `0x${string}`;
    factoryAddress: `0x${string}`;
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
    // For non-kubtestnet, return empty/fallback tabs as before
    if (network.chainId !== 25925) {
        return (<LeaderboardTabs explorerUrl={network.explorer} tabs={buildFallbackTabs()} />);
    }

    const supabase = getServiceSupabase();

    // Pull recent swaps for leaderboard calculation
    const swapsRes = await supabase
        .from('swaps')
        .select('token_address, sender, is_buy, volume_native, timestamp, tx_hash')
        .order('timestamp', { ascending: false })
        .limit(5000);
    const swapRows = (swapsRes.data || []) as Array<{
        token_address?: string;
        sender?: string;
        is_buy?: boolean | null;
        volume_native?: number | string | null;
        timestamp?: number | string | null;
        tx_hash?: string | null;
    }>;

    // Gather token metadata for involved tokens
    const addrSet = new Set<string>();
    for (const r of swapRows) {
        const a = String(r.token_address || '');
        if (a) addrSet.add(a);
    }
    let tokenMeta = new Map<string, { symbol?: string; name?: string; logo?: string }>();
    if (addrSet.size > 0) {
        const addrs = Array.from(addrSet);
        const tokensRes = await supabase
            .from('tokens')
            .select('address, symbol, name, logo')
            .in('address', addrs);
        for (const t of tokensRes.data || []) {
            const key = String((t as any).address || '').toLowerCase();
            tokenMeta.set(key, { symbol: (t as any).symbol, name: (t as any).name, logo: (t as any).logo });
        }
    }

    // Build swap events compatible with existing dataset aggregator
    const swapEventsWithTs = swapRows.map((r) => {
        const addr = String(r.token_address || '');
        const meta = tokenMeta.get(addr.toLowerCase()) || {};
        const fallbackSym = addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}`.toUpperCase() : '';
        return {
            action: r.is_buy ? 'buy' : 'sell',
            value: Number(r.volume_native || 0),
            trader: String(r.sender || ''),
            transactionHash: String(r.tx_hash || ''),
            address: addr,
            name: meta.name || meta.symbol || fallbackSym,
            symbol: meta.symbol || fallbackSym,
            logo: meta.logo || '',
            timestampMs: Number(r.timestamp || 0),
        };
    });

    // Dummy containers for non-kubtestnet flow
    const tokens = new Map<string, any>();
    const pairs: any[] = [];

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
            pro: {
                default: {
                    currencyAddress: "0x700D3ba307E1256e509eD3E45D6f9dff441d6907" as const,
                    factoryAddress: "0x46a4073c830031ea19d7b9825080c05f8454e530" as const,
                    blockCreated: 23935659,
                },
            },
        },
    } as const;

    const chainKey = isKubTestnet ? "kubtestnet" : "kubtestnet";
    const availableModes = networkMatrix[chainKey];
    const modeKey = normalizedMode in availableModes ? normalizedMode : Object.keys(availableModes)[0];
    const modeBucket = availableModes[modeKey as keyof typeof availableModes] as Record<string, { currencyAddress: `0x${string}`; factoryAddress: `0x${string}`; blockCreated: number }>;
    const tokenKey = normalizedToken in modeBucket ? normalizedToken : "default";
    const resolved = modeBucket[tokenKey];

    if (!resolved) throw new Error("Unsupported network configuration");

    return {
        chain: chainConfig,
        chainId: chainConfig.id,
        explorer,
        rpcUrl,
        currencyAddress: resolved.currencyAddress,
        blockCreated: resolved.blockCreated,
        factoryAddress: resolved.factoryAddress,
    };
}

// Deprecated on-chain pair/token discovery is no longer used for kubtestnet leaderboard
async function fetchPairs(network: NetworkConfig, _publicClient: any) {
    return { tokens: new Map<string, TokenMetadata>(), pairs: [] as any[] };
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
            let key: string = String(tx.address || '').toLowerCase();
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

// Timestamps are supplied directly from Supabase 'swaps' rows (timestamp in ms)
async function attachBlockTimestamps(_publicClient: any, swapEvents: any[], _network: any) {
    return swapEvents;
}

function buildFallbackTabs(): LeaderboardTab[] {
    const emptyTab: LeaderboardTab = {
        id: "volume-token",
        label: "Top Volume Cult",
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
