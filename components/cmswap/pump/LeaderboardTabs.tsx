"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as JazziconModule from "@raugfer/jazzicon";

interface LeaderboardTabsProps {explorerUrl: string; tabs: LeaderboardTab[]; chainId?: number;}
const formatValue = (value: number) => {
    if (!Number.isFinite(value)) return "-";
    const absolute = Math.abs(value);
    const precision = absolute >= 1000 ? 0 : absolute >= 1 ? 2 : 4;
    return `${Intl.NumberFormat("en-US", {minimumFractionDigits: precision, maximumFractionDigits: precision,}).format(absolute)}`;
};
const formatValueSigned = (value: number) => {
    if (!Number.isFinite(value)) return "-";
    const absolute = Math.abs(value);
    const precision = absolute >= 1000 ? 0 : absolute >= 1 ? 2 : 4;
    return `${Intl.NumberFormat("en-US", {minimumFractionDigits: precision, maximumFractionDigits: precision,}).format(value)}`;
};
const shortAddress = (address?: string) => {
    if (!address) return "-";
    const normalized = address.toLowerCase();
    return `${normalized.slice(0, 6)}...${normalized.slice(-4)}`;
};
function resolveLogoUrl(raw: string) {
    if (!raw || raw === 'undefined' || raw.startsWith('ipfs://undefined')) return "/default.ico";
    if (raw.startsWith('ipfs://')) return `https://cmswap.mypinata.cloud/ipfs/${raw.slice(7)}`;
    if (raw.startsWith('https://') || raw.startsWith('http://')) return raw;
    return `https://cmswap.mypinata.cloud/ipfs/${raw}`;
}
const JazziconAvatar = ({ address, size = 48 }: { address: string; size?: number }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!ref.current || !address) return;
        try {
            ref.current.innerHTML = "";
            const jazziconFn: any = (JazziconModule as any).default ?? (JazziconModule as any);
            const svgMarkup = jazziconFn(address);
            if (typeof svgMarkup === "string") {
                ref.current.innerHTML = svgMarkup;
                const svgEl = ref.current.querySelector("svg");
                if (svgEl) {svgEl.setAttribute("width", "100%"); svgEl.setAttribute("height", "100%");}
            }
        } catch {}
    }, [address, size]);
    return <div ref={ref} className="h-12 w-12" />;
};
const LeaderboardTabs = ({ explorerUrl, tabs, chainId }: LeaderboardTabsProps) => {
    const [activeTabId, setActiveTabId] = useState(() => tabs[0]?.id ?? "");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;
    const searchParams = useSearchParams();
    const chainParam = (searchParams?.get("chain") || "kub").trim();
    const modeParam = (searchParams?.get("mode") || "lite").trim();
    const tokenParam = (searchParams?.get("token") || "cmm").trim();
    const rankbyParam = (searchParams?.get("rankby") || "").trim();
    useEffect(() => {
        if (!rankbyParam) return;
        const match = tabs.find(t => t.id === rankbyParam);
        if (match && match.id !== activeTabId) {
            setActiveTabId(match.id);
            setCurrentPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rankbyParam, tabs]);
    useEffect(() => {setCurrentPage(1)}, [activeTabId]);
    const buildTokenHref = (entry: LeaderboardEntry) => {
        const params = new URLSearchParams();
        if (chainParam) params.set("chain", chainParam);
        if (modeParam) params.set("mode", modeParam);
        if (tokenParam) params.set("token", tokenParam);
        params.set("ticker", entry.address);
        if (entry.lp) params.set("lp", String(entry.lp));
        return `/pump/launchpad/token?${params.toString()}`;
    };
    const buildPortfolioHref = (entry: LeaderboardEntry) => {
        const params = new URLSearchParams();
        if (chainParam) params.set("chain", chainParam);
        if (modeParam) params.set("mode", modeParam);
        params.set("addr", entry.address);
        return `/pump/launchpad/portfolio?${params.toString()}`;
    };
    const [timeRange, setTimeRange] = useState<"all" | "today" | "7d" | "30d" | "custom">("all");
    const [customStart, setCustomStart] = useState<string>("");
    const [customEnd, setCustomEnd] = useState<string>("");
    const [minValueInput, setMinValueInput] = useState<string>("0");
    const addrFilterParam = (searchParams?.get("q") || searchParams?.get("addr") || searchParams?.get("address") || "").trim();
    const [addressQuery, setAddressQuery] = useState<string>(addrFilterParam);
    const minValue = useMemo(() => {
        const n = Number(minValueInput);
        return Number.isFinite(n) && n >= 0 ? n : 0;
    }, [minValueInput]);
    const [remoteTabs, setRemoteTabs] = useState<LeaderboardTab[] | null>(null);
    const effectiveTabs = remoteTabs ?? tabs;
    const activeTab = useMemo(() => {
        if (!effectiveTabs.length) return undefined as any;
        return effectiveTabs.find((tab) => tab.id === activeTabId) ?? effectiveTabs[0];
    }, [activeTabId, effectiveTabs]);
    const effectiveChainId = useMemo(() => {
        if (typeof chainId === 'number' && Number.isFinite(chainId) && chainId > 0) return chainId;
        for (const tab of tabs) {
            if (!tab?.entries) continue;
            for (const entry of tab.entries) {
                if (entry && typeof entry.chainId === 'number' && Number.isFinite(entry.chainId) && entry.chainId > 0) return entry.chainId;
            }
        }
        return 0;
    }, [chainId, tabs]);
    const entries = activeTab?.entries ?? [];
    const rankById = useMemo(() => {
        const m = new Map<string, number>();
        entries.forEach((e: any, i: any) => m.set(e.id, i + 1));
        return m;
    }, [entries]);
    const filteredEntries = useMemo(() => {
        if (!entries.length) return entries;
        let startTs: number | undefined;
        let endTs: number | undefined;
        const now = new Date();
        if (timeRange === "today") {
            const start = new Date(now);
            start.setHours(0, 0, 0, 0);
            startTs = start.getTime();
            endTs = now.getTime();
        } else if (timeRange === "7d") {
            startTs = now.getTime() - 7 * 24 * 60 * 60 * 1000;
            endTs = now.getTime();
        } else if (timeRange === "30d") {
            startTs = now.getTime() - 30 * 24 * 60 * 60 * 1000;
            endTs = now.getTime();
        } else if (timeRange === "custom") {
            if (customStart) startTs = new Date(customStart + "T00:00:00").getTime();
            if (customEnd) endTs = new Date(customEnd + "T23:59:59").getTime();
        }
        const isProfitTab = activeTab?.id === 'top-profit-trader';
        const addrQuery = addressQuery.trim().toLowerCase();
        return entries.filter((e: any) => {
            const valForMin = isProfitTab ? Math.abs(e.value) : e.value;
            if (!Number.isFinite(valForMin) || valForMin < minValue) return false;
            if (addrQuery) {
                const entryAddr = String(e.address || "").toLowerCase();
                if (!entryAddr.includes(addrQuery)) return false;
            }
            if (startTs !== undefined || endTs !== undefined) {
                const ts = e.timestamp;
                if (typeof ts !== "number") return false;
                if (startTs !== undefined && ts < startTs) return false;
                if (endTs !== undefined && ts > endTs) return false;
            }
            return true;
        });
    }, [entries, timeRange, customStart, customEnd, minValue, addressQuery, activeTab?.id]);
    const paginatedEntries = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredEntries.slice(startIndex, endIndex);
    }, [filteredEntries, currentPage]);
    const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    useEffect(() => {setCurrentPage(1)}, [timeRange, customStart, customEnd, minValue, addressQuery]);
    useEffect(() => {
        const fetchRange = async () => {
            let start: number | undefined;
            let end: number | undefined;
            const now = new Date();
            if (timeRange === 'today') {
                const s = new Date(now);
                s.setHours(0, 0, 0, 0);
                start = s.getTime();
                end = now.getTime();
            } else if (timeRange === '7d') {
                start = now.getTime() - 7 * 24 * 60 * 60 * 1000;
                end = now.getTime();
            } else if (timeRange === '30d') {
                start = now.getTime() - 30 * 24 * 60 * 60 * 1000;
                end = now.getTime();
            } else if (timeRange === 'custom') {
                if (customStart) start = new Date(customStart + 'T00:00:00').getTime();
                if (customEnd) end = new Date(customEnd + 'T23:59:59').getTime();
            }
            if (timeRange === 'all' || (!start && !end)) {
                setRemoteTabs(null);
                return;
            }
            const chainIdForQuery = effectiveChainId;
            if (!Number.isFinite(chainIdForQuery) || chainIdForQuery <= 0) {
                setRemoteTabs(null);
                return;
            }
            const qs = new URLSearchParams();
            qs.set('limit', '100');
            qs.set('chainId', String(chainIdForQuery));
            if (start) qs.set('startTs', String(start));
            if (end) qs.set('endTs', String(end));
            try {
                const res = await fetch(`/api/swaps/leaderboard?${qs.toString()}`, { cache: 'no-store' });
                if (!res.ok) return;
                const payload = await res.json();
                const tokenMeta = new Map<string, { symbol?: string; name?: string; logo?: string }>();
                const metaObj = (payload?.tokens ?? {}) as Record<string, { symbol?: string | null; name?: string | null; logo?: string | null }>;
                for (const k of Object.keys(metaObj)) {
                    const v = metaObj[k];
                    tokenMeta.set(k.toLowerCase(), { symbol: v?.symbol ?? undefined, name: v?.name ?? undefined, logo: v?.logo ?? undefined });
                }
                const explorerBase = explorerUrl.replace(/\/$/, '');
                const responseChainId = typeof payload?.chainId === 'number' ? payload.chainId : chainIdForQuery;
                const volumeTokens = ((payload?.volumeTokens ?? []) as Array<{ token_address: string; value: number; latest_ts?: number | null }>).map((row) => {
                    const addr = String(row.token_address || '');
                    const meta = tokenMeta.get(addr.toLowerCase()) || {};
                    const fallbackSym = addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}`.toUpperCase() : '';
                    return {
                        id: addr,
                        name: meta.symbol || fallbackSym,
                        subtitle: meta.name,
                        logo: meta.logo || '',
                        value: Number(row.value || 0),
                        address: addr as `0x${string}`,
                        href: `${explorerBase}/address/${addr}`,
                        type: 'token' as const,
                        timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined,
                        chainId: responseChainId,
                    };
                });
                const volumeTraders = ((payload?.volumeTraders ?? []) as Array<{ sender: string; value: number; latest_ts?: number | null }>).
                    map((row) => ({ id: String(row.sender || ''), name: shortAddress(row.sender), logo: '', value: Number(row.value || 0), address: String(row.sender || '') as `0x${string}`, type: 'trader' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId }));
                const profitTraders = ((payload?.profitTraders ?? []) as Array<{ sender: string; value: number; latest_ts?: number | null }>).
                    map((row) => ({ id: `${row.sender}-profit`, name: shortAddress(row.sender), logo: '', value: Number(row.value || 0), address: String(row.sender || '') as `0x${string}`, type: 'trader' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId }));
                const degenTraders = ((payload?.degenTraders ?? []) as Array<{ sender: string; value: number; latest_ts?: number | null }>).
                    map((row) => ({ id: `${row.sender}-degen`, name: shortAddress(row.sender), logo: '', value: Number(row.value || 0), address: String(row.sender || '') as `0x${string}`, type: 'degen' as const, timestamp: typeof row.latest_ts === 'number' ? row.latest_ts : undefined, chainId: responseChainId }));
                setRemoteTabs([
                    { id: 'volume-token', label: 'Top Volume Cult', entries: volumeTokens },
                    { id: 'top-volume-trader', label: 'Top Volume Trader', entries: volumeTraders },
                    { id: 'top-profit-trader', label: 'Top Profit Trader', entries: profitTraders },
                    { id: 'top-degen-trader', label: 'Top Degen Trader', entries: degenTraders },
                ]);
            } catch {}
        };
        fetchRange();
    }, [timeRange, customStart, customEnd, explorerUrl, effectiveChainId]);

    return (
        <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#080b17]/85 shadow-[0_0_28px_rgba(15,118,110,0.15)] backdrop-blur-xl">
            <div className="sticky top-[24px] z-20 border-b border-white/10 bg-[#080b17]/95 pb-6 px-6 md:px-10 backdrop-blur-xl">
                <h1 className="mb-6 text-2xl font-semibold text-slate-100 md:text-3xl">Leaderboard</h1>
                <nav className="flex flex-wrap gap-3">
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTab?.id;
                        return (
                            <button onClick={() => {setActiveTabId(tab.id); setCurrentPage(1);}} key={tab.id} type="button" className={`group relative overflow-hidden rounded-full border px-5 py-2 text-xs font-semibold transition-all duration-300 ease-out ${isActive ? "border-emerald-300/40 bg-emerald-500/15 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.45)]" : "border-white/5 text-slate-400 hover:border-emerald-300/40 hover:text-emerald-100"}`}>
                                <span className="relative z-[1]">{tab.label}</span>
                                <span className={`absolute inset-x-4 bottom-1 h-[2px] rounded-full transition-opacity duration-300 ease-out ${isActive ? "opacity-100 bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.8)]" : "opacity-0 bg-transparent"}`} />
                                {isActive && (<span className="absolute inset-0 -z-[1] bg-emerald-400/10 blur-2xl" />)}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div key={activeTab?.id} className="animate-fade-in px-4 pb-8 pt-6 md:px-10 md:pb-10">
                <div className="mt-6 mb-2 rounded-xl border border-white/10 bg-[#0b0f1d]/60">
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-xs font-medium tracking-wide text-slate-300">Filters</span>
                        <button onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} aria-controls="leaderboard-filters" type="button" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/5">
                            {filtersOpen ? "Hide" : "Show"}
                            <svg className={`h-3.5 w-3.5 transition-transform ${filtersOpen ? "rotate-0" : "-rotate-90"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                    </div>
                    <div id="leaderboard-filters" className={`grid grid-cols-1 gap-2 transition-all duration-300 ease-out md:grid-cols-2 ${filtersOpen ? "opacity-100 p-4" : "pointer-events-none max-h-0 overflow-hidden opacity-0 p-0"}`}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-medium tracking-wide text-slate-400">Time Range</label>
                            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                <select className="w-full rounded-md border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-slate-200 outline-none ring-emerald-400/40 focus:ring" value={timeRange} onChange={(e) => setTimeRange(e.target.value as any)}>
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                    <option value="custom">Custom</option>
                                </select>
                                {timeRange === "custom" && (
                                    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                                        <input value={customStart} onChange={(e) => setCustomStart(e.target.value)} type="date" className="w-full rounded-md border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-slate-200 outline-none ring-emerald-400/40 focus:ring" />
                                        <input value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} type="date" className="w-full rounded-md border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-slate-200 outline-none ring-emerald-400/40 focus:ring" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-medium tracking-wide text-slate-400">Minimum Value</label>
                            <input
                                type="number"
                                inputMode="decimal"
                                step="any"
                                min={0}
                                placeholder="0"
                                className="w-full rounded-md border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-slate-200 outline-none ring-emerald-400/40 focus:ring"
                                value={minValueInput}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (v === "") return setMinValueInput("");
                                    const n = Number(v);
                                    if (Number.isFinite(n)) setMinValueInput(v);
                                }}
                                onBlur={() => {if (minValueInput === "" || Number(minValueInput) < 0) setMinValueInput("0")}}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-medium tracking-wide text-slate-400">Address Contains</label>
                            <input value={addressQuery} onChange={(e) => setAddressQuery(e.target.value)} type="text" inputMode="text" placeholder="0x..." className="w-full rounded-md border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-slate-200 outline-none ring-emerald-400/40 focus:ring" />
                        </div>
                    </div>
                </div>
                {entries.length ?
                    <>
                        <table className="hidden w-full border-separate border-spacing-y-4 text-sm text-slate-200 md:table">
                            <tbody>
                                {paginatedEntries.map((entry: any, index: any) => {
                                    const isTrader = entry.type === "trader" || entry.type === "degen";
                                    const primaryText = isTrader ? shortAddress(entry.address) : entry.subtitle;
                                    const secondaryText = isTrader ? undefined : entry.name;
                                    return (
                                        <tr key={entry.id} className="align-middle">
                                            <td colSpan={3} className="p-0">
                                                <a href={isTrader ? buildPortfolioHref(entry) : buildTokenHref(entry)} rel="noopener noreferrer" target="_blank" className="group block rounded-2xl border border-white/5 bg-gradient-to-r from-[#0b1020]/90 via-[#0d1324]/90 to-[#0b1020]/90 px-6 py-4 shadow-[0_0_16px_rgba(15,118,110,0.08)] transition-all duration-300 ease-out hover:border-emerald-300/60 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]">
                                                    <div className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-6">
                                                        <span className="text-lg font-semibold tracking-[0.2em] text-slate-300">{rankById.get(entry.id) ?? ((currentPage - 1) * ITEMS_PER_PAGE + index + 1)}</span>
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-[#0b1020]">
                                                                {isTrader ? <JazziconAvatar address={entry.address} size={48} /> : <img src={resolveLogoUrl(entry.logo)} alt={entry.name} className="h-full w-full object-cover" />}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-base font-semibold text-slate-100">{primaryText}</span>
                                                                {secondaryText ? <span className="text-xs text-slate-500">{secondaryText}</span> : null}
                                                            </div>
                                                        </div>
                                                        <span className="text-right text-lg font-semibold text-emerald-200 drop-shadow-[0_0_8px_rgba(16,185,129,0.55)]">{(activeTab?.id === 'top-profit-trader' ? formatValueSigned(entry.value) : formatValue(entry.value)) + (entry.type === 'degen' ?  ' txn' : ' tKub')}</span>
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="flex flex-col gap-4 md:hidden">
                            {paginatedEntries.map((entry: any, index: any) => {
                                const isTrader = entry.type === "trader" || entry.type === "degen";
                                const primaryText = isTrader ? shortAddress(entry.address) : entry.subtitle;
                                const secondaryText = isTrader ? undefined : entry.name;
                                return (
                                    <a href={isTrader ? buildPortfolioHref(entry) : buildTokenHref(entry)} rel="noopener noreferrer" target="_blank" key={`${entry.id}-mobile`} className="relative block rounded-2xl border border-white/10 bg-[#0b1020]/90 p-4 shadow-[0_0_18px_rgba(16,185,129,0.15)] transition-all duration-300 ease-out hover:border-emerald-300/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">#{rankById.get(entry.id) ?? ((currentPage - 1) * ITEMS_PER_PAGE + index + 1)}</span>
                                            <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{entry.type === "token" ? "Token" : "Trader"}</span>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-[#0b1020]">
                                                {isTrader ? <JazziconAvatar address={entry.address} size={48} /> : <img src={resolveLogoUrl(entry.logo)} alt={entry.name} className="h-full w-full object-cover" />}
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <span className="text-base font-semibold text-slate-100">{primaryText}</span>
                                                {secondaryText ? <span className="text-xs text-slate-500">{secondaryText}</span> : null}
                                            </div>
                                            <span className="text-right text-lg font-semibold text-emerald-200 drop-shadow-[0_0_8px_rgba(16,185,129,0.55)]">{(activeTab?.id === 'top-profit-trader' ? formatValueSigned(entry.value) : formatValue(entry.value)) + (entry.type === 'degen' ?  ' txn' : ' tKub')}</span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/10 pt-6">
                                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={!hasPreviousPage} type="button" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#0b1020] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>Previous
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-400">Page <span className="font-medium text-slate-200">{currentPage}</span> of <span className="font-medium text-slate-200">{totalPages}</span></span>
                                    <span className="text-sm text-slate-500">({filteredEntries.length} total items)</span>
                                </div>
                                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={!hasNextPage} type="button" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#0b1020] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Next<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                            </div>
                        )}
                    </> :
                    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-[#0b0f1d]/80 px-6 py-16 text-center text-sm text-slate-400">
                        <span className="text-lg font-semibold tracking-[0.24em] text-slate-200">No data yet</span>
                    </div>
                }
            </div>
            <style jsx>{`
                @keyframes fade-in {from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); }} 
                .animate-fade-in { animation: fade-in 0.4s ease forwards; }
            `}</style>
        </section>
    );
};

export interface LeaderboardEntry {id: string; name: string; value: number; address: `0x${string}`; href?: string; subtitle?: string; logo: string; type: "token" | "trader" | "degen"; timestamp?: number; lp?: `0x${string}` | string; chainId: number;}
export interface LeaderboardTab {id: string; label: string; entries: LeaderboardEntry[];}
export default LeaderboardTabs;
