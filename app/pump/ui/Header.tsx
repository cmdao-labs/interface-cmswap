'use client';
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAccount } from 'wagmi';
import Search from "@/app/pump/ui/Search";
import { useState } from "react";

type LaunchpadHeaderProps = {
    activeRoute?: "Markets" | "Portfolio" | "Leaderboard";
    ctaHref: string;
};

export default function LaunchpadHeader({ activeRoute = "Markets" }: LaunchpadHeaderProps) {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || '';
    const chain = searchParams.get('chain') || '';
    const account = useAccount();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NAV_ITEMS = [
        { label: "Portfolio", href: "/pump/launchpad/portfolio?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite") + "&addr=" + account.address },
        { label: "Leaderboard", href: "/pump/launchpad/leaderboard?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")}
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur">
            <div className="pt-22 mx-auto flex flex-col-reverse md:flex-row w-full flex-wrap items-center justify-between gap-6 py-4 sm:px-6 lg:px-10 relative">
                <nav className="hidden md:flex gap-4 text-xs md:text-sm rounded-lg border border-white/10 bg-white/5 px-4 py-1 shadow-inner shadow-black/20">
                    <Link href="/pump/launchpad" prefetch={false} className="p-2 font-semibold tracking-wider text-[#00FF41]">Pump</Link>
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.label === activeRoute;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                prefetch={false}
                                className={`rounded-full px-3 py-2 font-medium transition-colors duration-300 ${
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex w-full items-center justify-between md:hidden">
                    <Link href="/pump/launchpad" prefetch={false} className="p-2 font-semibold tracking-wider text-[#00FF41]">Pump</Link>
                    <Search />
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-5 sm:gap-3">
                    <div className="hidden sm:block"><Search /></div>
                    <Link
                        href={"launchpad/launch?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")}
                        prefetch={false}
                        className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 px-6 py-2 font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-300 hover:scale-[1.03] focus:outline-none"
                    >
                        <span>Launch Token</span>
                        <Rocket className="ml-2 h-6 w-6 rounded-xs border border-white/10 bg-white/10" aria-hidden="true" />
                    </Link>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden absolute left-2 right-2 top-full mt-2 rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl shadow-lg shadow-black/30">
                        <div className="flex flex-col divide-y divide-white/10">
                            {NAV_ITEMS.map((item) => {
                                const isActive = item.label === activeRoute;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        prefetch={false}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                                            isActive
                                                ? "text-white bg-white/5"
                                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
