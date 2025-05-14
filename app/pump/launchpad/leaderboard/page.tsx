import Link from "next/link";
import Image from "next/image";
import { Suspense } from 'react';
import type { Metadata } from "next";
import Leaderboard from "@/app/pump/ui/Leaderboard";
import Sort2 from "@/app/pump/ui/Sort2";

export const metadata: Metadata = {
    title: "Leaderboard | CMswap - PUMP",
    description: "hello superchain.",
};

export default async function LeaderboardPage(props: {
  searchParams?: Promise<{
    rankby?: string;
    mode?: string;
    chain?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const rankby = searchParams?.rankby || '';
  const mode = searchParams?.mode || '';
  const chain = searchParams?.chain || '';

  return (
    <main className="row-start-2 w-full sm:w-1/2 self-center h-full flex flex-col gap-6 items-center sm:items-start mt-[150px]">
      <Link href={"/pump/launchpad?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline hover:font-bold">Back to launchpad</Link>
      {/* <span className="text-2xl font-bold my-2">Quest</span>
      <Link href="https://forms.gle/MxQfSDHpyx5tDFvQA" rel="noopener noreferrer" target="_blank" className="w-[300px] h-[420px] rounded-2xl shadow-2xl bg-slate-300 bg-opacity-25 flex flex-col items-center align-center overflow-hidden hover:cursor-pointer hover:shadow-emerald-300">
        <div className="w-[300px] h-[300px] overflow-hidden flex flex-wrap content-center justify-center">
          <div className="w-[300px] h-[300px] relative">
            <Image src={'/quest001.png'} alt="quest001" fill />
          </div>
        </div>
        <div className="w-full p-4 flex flex-col gap-2 justify-around">
          <span className="text-xs text-center w-[100px] p-1 rounded-full bg-gray-500">Repeatable</span>
          <span className="text-lg font-bold">Everyday Social Contributor</span>
          <span className="text-sm text-right">🎁 500 XP</span>
        </div>
      </Link> */}
      <span className="text-2xl font-bold mt-4 mb-2">Leaderboard 🏆</span>
      <Sort2 />
      <Suspense key={rankby + mode} fallback={
        <div className="w-full rounded-2xl shadow-2xl bg-slate-950 bg-opacity-25 flex flex-col items-center align-center">
          <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
          <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
          <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
          <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
          <div className="w-full h-[70px] sm:px-14 sm:py-10 bg-gray-500 rounded-lg mb-1 animate-pulse" />
        </div>
      }>
        <Leaderboard rankby={rankby} mode={mode} chain={chain} />
      </Suspense>
    </main>
  );
}
