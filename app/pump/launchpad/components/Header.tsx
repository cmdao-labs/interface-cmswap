'use client';
import Link from "next/link";
import { Rocket } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAccount } from 'wagmi';
import Search from "@/app/pump/ui/Search";

type LaunchpadHeaderProps = {
    activeRoute?: "Markets" | "Portfolio" | "Leaderboard";
    ctaHref: string;
};

export default function LaunchpadHeader({ activeRoute = "Markets" }: LaunchpadHeaderProps) {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || '';
    const chain = searchParams.get('chain') || '';
    const account = useAccount();

    const NAV_ITEMS = [
        { label: "Portfolio", href: "/pump/launchpad/portfolio?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite") + "&addr=" + account.address },
        { label: "Leaderboard", href: "/pump/launchpad/leaderboard?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")}
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl">
            <div className="pt-24 md:pt-22 mx-auto flex flex-col-reverse md:flex-row w-full flex-wrap items-center justify-between gap-4 px-2 py-4 sm:px-6 lg:px-10">
                <nav className="flex flex-1 gap-3 items-center text-xs md:text-sm">
                    <Link href="/pump/launchpad" prefetch={false} className="p-2 font-semibold tracking-wider text-[#00FF41]">Pump</Link>
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.label === activeRoute;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                prefetch={false}
                                className={`rounded-full p-2 font-medium transition-colors duration-300 ${
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
                <div className="flex flex-col-reverse sm:flex-row gap-5 sm:gap-3">
                    <Search />
                    <Link
                        href={"launchpad/launch?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")}
                        prefetch={false}
                        className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 px-6 py-2 font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-300 hover:scale-[1.03] focus:outline-none"
                    >
                        <span>Launch Token</span>
                        <Rocket className="ml-2 h-6 w-6 rounded-xs border border-white/10 bg-white/10" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
