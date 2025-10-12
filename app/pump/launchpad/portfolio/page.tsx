import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowLeft, Sparkles } from "lucide-react";
import Dashboard from "@/app/pump/ui/Dashboard";
import Activity from "@/app/pump/ui/Activity";
import Sort3 from "@/app/pump/ui/Sort3";

export const metadata: Metadata = {
    title: "Portfolio | CMswap - PUMP",
    description: "hello pump.",
};

const chainLabelMap: Record<string, string> = {
    kubtestnet: "Bitkub Testnet",
};

const getChainLabel = (chain: string) => {
    if (!chain) return "Bitkub Testnet";
    return chainLabelMap[chain] ?? chain.toUpperCase();
};

const truncateAddress = (address: string) => {
    if (!address) return "";
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const PortfolioSkeleton = () => (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 shadow-xl backdrop-blur">
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="h-5 w-28 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-white/5" />
            </div>
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-12 w-full animate-pulse rounded-2xl bg-white/5" />
                ))}
            </div>
        </div>
    </div>
);

export default async function Portfolio(props: {
    searchParams?: Promise<{
        addr?: string;
        activity?: string;
        mode?: string;
        chain?: string;
        token?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const addr = searchParams?.addr || '';
    const activity = searchParams?.activity || '';
    const mode = searchParams?.mode || 'pro';
    const chain = searchParams?.chain || 'kubtestnet';
    const token = searchParams?.token || '';
    const showActivity = activity === "true";
    const chainLabel = getChainLabel(chain);
    const modeLabel = mode === "pro" ? "Pro Mode" : "Lite Mode";
    const truncatedAddr = truncateAddress(addr);
    const backHref = `/pump/launchpad?chain=${chain}${(mode === "pro" || mode === "") ? "&mode=pro" : "&mode=lite"}`;

    return (
        <main className="relative min-h-screen w-full overflow-hidden pt-16 pb-12 text-white">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 -left-32 h-[320px] w-[320px] rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 pt-2 pb-4">
                <header className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60">
                        <Link
                            href={backHref}
                            prefetch={false}
                            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:border-white/30 hover:bg-white/10"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <div className="flex flex-wrap items-center gap-2">
                            {chainLabel && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">{chainLabel}</span>
                            )}
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">{modeLabel}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                            <Sparkles className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                            <span className="uppercase tracking-[0.35em] text-[9px] text-white/40">Address</span>
                            <span className="font-semibold text-white">{truncatedAddr || "Connect a wallet to populate data"}</span>
                        </div>
                    </div>
                </header>

                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_55%)]" />
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><Sort3 /></div>
                        <Suspense key={`${addr}-${activity}-${mode}-${chain}-${token}`} fallback={<PortfolioSkeleton />}>
                            <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 shadow-xl backdrop-blur">
                                {showActivity ? (
                                    <Activity addr={addr} mode={mode} chain={chain} token={token} />
                                ) : (
                                    <Dashboard addr={addr} mode={mode} chain={chain} token={token} />
                                )}
                            </div>
                        </Suspense>
                    </div>
                </section>
            </div>
        </main>
    );
}
