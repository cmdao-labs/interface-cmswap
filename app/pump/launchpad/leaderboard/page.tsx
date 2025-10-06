import Link from "next/link";
import { Suspense } from 'react';
import type { Metadata } from "next";
import Leaderboard from "@/app/pump/ui/Leaderboard";

export const metadata: Metadata = { title: "Leaderboard | CMswap - PUMP", description: "hello pump.",};

export default async function LeaderboardPage(props: {
    searchParams?: Promise<{
        rankby?: string;
        mode?: string;
        chain?: string;
        token?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const rankby = searchParams?.rankby || '';
    const mode = searchParams?.mode || '';
    const chain = searchParams?.chain || '';
    const token = searchParams?.token || '';

    return (
        <main className="row-start-2 md:w-6/7 w-full self-center h-full flex flex-col gap-6 items-center sm:items-start mt-16">
            <Link href={"/pump/launchpad?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline hover:font-bold px-4">Back to launchpad</Link>
            <Suspense key={rankby + mode} fallback={
                <div className="w-full rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center">
                    <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
                    <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
                    <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
                    <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
                    <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
                </div>
            }>
                <Leaderboard rankby={rankby} mode={mode} chain={chain} token={token} />
            </Suspense>
        </main>
    );
}
