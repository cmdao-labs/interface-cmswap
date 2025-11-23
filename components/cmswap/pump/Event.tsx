import Image from "next/image";
import Link from "next/link";
import { connection } from 'next/server';
import { getServiceSupabase } from '@/lib/supabaseServer';

type Activity = {action: 'buy' | 'sell' | 'launch'; value: number; hash: string; timestamp: number; ticker: string; logo: string; address: string;};
function getActionStyles(action: Activity['action']) {
    switch (action) {
        case 'buy': return {valueAccent: 'text-emerald-300', cardAccent: 'shadow-emerald-500/20 hover:border-emerald-400/40 hover:shadow-emerald-500/30',} as const;
        case 'sell': return {valueAccent: 'text-rose-400', cardAccent: 'shadow-rose-500/20 hover:border-rose-400/40 hover:shadow-rose-500/30',} as const;
        default: return {valueAccent: 'font-semibold uppercase tracking-[0.2em] text-white', cardAccent: 'shadow-white/20 hover:border-white/40 hover:shadow-white/30',} as const;
    }
}
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
function formatRelativeTime(timestamp: number) {
    const now = Date.now();
    const diff = Math.round((timestamp - now) / 1000);
    const abs = Math.abs(diff);
    if (abs < 60) return RELATIVE_TIME_FORMAT.format(diff, 'second');
    if (abs < 3600) return RELATIVE_TIME_FORMAT.format(Math.round(diff / 60), 'minute');
    if (abs < 86400) return RELATIVE_TIME_FORMAT.format(Math.round(diff / 3600), 'hour');
    return RELATIVE_TIME_FORMAT.format(Math.round(diff / 86400), 'day');
}
function resolveLogoUrl(raw: string) {
    if (!raw) return "/default.ico";
    if (raw.startsWith('ipfs://')) return `https://cmswap.mypinata.cloud/ipfs/${raw.slice(7)}`;
    if (raw.startsWith('https://') || raw.startsWith('http://')) return raw;
    return `https://cmswap.mypinata.cloud/ipfs/${raw}`;
}

export default async function Event({ mode, chain, token, }: { mode: string; chain: string; token: string; }) {
    await connection();
    let timeline: Activity[] = [];
    if (chain === 'kubtestnet' && mode === 'pro') {
        const supabase = getServiceSupabase();
        const swapsRes = await supabase
            .from('swaps')
            .select('is_buy, volume_token, tx_hash, timestamp, token_address')
            .order('timestamp', { ascending: false })
            .limit(50);
        const swapRows = (swapsRes.data || []) as Array<{is_buy: boolean | null; volume_token: number | string | null; tx_hash: string | null; timestamp: number | string | null; token_address: string | null;}>;
        const addresses = Array.from(new Set(swapRows.map((r) => String(r.token_address || '')).filter((a) => a && a !== '0x0')));
        let tokensMap = new Map<string, { symbol?: string; logo?: string }>();
        if (addresses.length > 0) {
            const tokensRes = await supabase
                .from('tokens')
                .select('address, symbol, logo')
                .in('address', addresses);
            for (const t of tokensRes.data || []) {
                const key = String(t.address || '').toLowerCase();
                tokensMap.set(key, { symbol: t.symbol, logo: t.logo });
            }
        }
        const buySell: Activity[] = swapRows.map((r) => {
            const addr = String(r.token_address || '').toLowerCase();
            const meta = tokensMap.get(addr) || {};
            const sym = meta.symbol || (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '');
            return {action: r.is_buy ? 'buy' : 'sell', value: Number(r.volume_token || 0), hash: String(r.tx_hash || ''), timestamp: Number(r.timestamp || 0), ticker: sym, logo: meta.logo || '', address: String(r.token_address || ''),} as Activity;
        });
        const launchesRes = await supabase
            .from('tokens')
            .select('address, symbol, logo, created_time')
            .order('created_time', { ascending: false })
            .limit(20);
        const launches: Activity[] = (launchesRes.data || []).map((t: any) => ({action: 'launch', value: 0, hash: `launch-${String(t.address || '')}`, timestamp: Number(t.created_time || 0), ticker: String(t.symbol || ''), logo: String(t.logo || ''), address: String(t.address || ''),}));
        timeline = launches.concat(buySell).filter((e) => Number.isFinite(e.timestamp) && e.timestamp > 0).sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
    }
    const activity = timeline.slice(0, 10);
    if (activity.length === 0) return (<div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080c18]/70 text-center text-sm text-slate-400">No recent launchpad activity detected.</div>);

    return (
        <div className="gap-2 flex w-full min-w-0 flex-nowrap overflow-x-auto sm:grid sm:grid-cols-5 sm:overflow-x-visible sm:flex-none eventbar">
            {activity.map((item) => {
                const { valueAccent, cardAccent } = getActionStyles(item.action);
                const primary = item.action === 'launch' ? 'Launch' : `${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(item.value)} ${item.action === 'buy' ? 'bought' : 'sold'}`;
                return (
                    <Link
                        key={item.hash + '/' + item.value}
                        href={{pathname: '/pump/launchpad/token', query: {mode: mode || '', chain: chain || '', ticker: item.address, token: token || '',},}}
                        prefetch={false}
                        className={`group flex flex-row justify-between w-[240px] shrink-0 flex-col gap-2 rounded-lg border border-white/5 p-3 text-xs sm:w-auto sm:shrink shadow-lg transition-all duration-300 hover:-translate-y-1 ${cardAccent}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden sm:rounded-2xl border border-white/10 bg-white/5">
                                <Image src={resolveLogoUrl(item.logo)} alt={`${item.ticker}`} fill sizes="48px" className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-white">{item.ticker}</span>
                                <span className={`font-medium ${valueAccent}`}>{primary}</span>
                            </div>
                        </div>
                        <span className="mt-1 text-slate-500">{formatRelativeTime(item.timestamp)}</span>
                    </Link>
                );
            })}
        </div>
    );
}
