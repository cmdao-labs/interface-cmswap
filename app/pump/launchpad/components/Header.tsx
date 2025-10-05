'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAccount } from 'wagmi';
import Search from "@/app/pump/ui/Search";

type LaunchpadHeaderProps = {
    activeRoute?: "Home" | "Markets" | "Portfolio";
    ctaHref: string;
};

export default function LaunchpadHeader({ activeRoute = "Home" }: LaunchpadHeaderProps) {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || '';
    const chain = searchParams.get('chain') || '';
    const account = useAccount();

    const NAV_ITEMS = [
        { label: "Home", href: "/pump/launchpad" },
        { label: "Portfolio", href: "/pump/launchpad/portfolio?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite") + "&addr=" + account.address },
        { label: "Leaderboard", href: "/pump/launchpad/leaderboard?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")}
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl">
            <div className="mt-10 mx-auto flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-10">
                <Link href="/" prefetch={false} className="flex items-center gap-3 text-white">
                    <span className="text-lg font-semibold tracking-wider">Pump</span>
                </Link>
                <div className="">
                    <Search />
                </div>
                <nav className="flex flex-1 items-center justify-end gap-2 text-sm">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.label === activeRoute;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                prefetch={false}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
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
                <Link
                    href={"launchpad/launch?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")}
                    prefetch={false}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition-transform duration-300 hover:scale-[1.03] focus:outline-none"
                >
                    Launch Token
                </Link>
            </div>
        </header>
    );
}
