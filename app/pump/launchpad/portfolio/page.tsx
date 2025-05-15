import Link from "next/link";
import { Suspense } from 'react';
import type { Metadata } from "next";
import Dashboard from "@/app/pump/ui/Dashboard";
import Activity from "@/app/pump/ui/Activity";
import Sort3 from "@/app/pump/ui/Sort3";

export const metadata: Metadata = {
    title: "Portfolio | CMswap - PUMP",
    description: "hello superchain.",
};

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
  const mode = searchParams?.mode || '';
  const chain = searchParams?.chain || '';
  const token = searchParams?.token || '';

  return (
    <main className="row-start-2 w-full xl:w-1/2 self-center h-full flex flex-col gap-6 items-center lg:items-start mt-[100px]">
      <Link href={"/pump/launchpad?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="underline hover:font-bold">Back to launchpad</Link>
      <Sort3 />
      <Suspense key={addr + activity + mode} fallback={
        <main className="row-start-2 w-full h-full flex flex-col items-center sm:items-start">
            <div className="w-full h-[50px] py-6 bg-gray-500 rounded-lg mb-1 animate-pulse" />
            <div className="w-full h-[50px] flex flex-row items-center justify-start sm:gap-2 text-xs sm:text-lg text-gray-500">
                <div className="w-1/3">
                    <span>Asset</span>
                </div>
                <div className="w-3/4 flex flex-row items-center justify-end sm:gap-10">
                    <span className="text-right w-[50px] sm:w-[200px]">Balance</span>
                    <span className="text-right w-[100px] sm:w-[200px]">Price</span>
                    <span className="text-right w-[100px] sm:w-[200px]">Value</span>
                </div>
            </div>
            <div className="w-full h-[50px] py-6 bg-gray-500 rounded-lg mb-1 animate-pulse" />
            <div className="w-full h-[50px] py-6 bg-gray-500 rounded-lg mb-1 animate-pulse" />
            <div className="w-full h-[50px] py-6 bg-gray-500 rounded-lg mb-1 animate-pulse" />
            <div className="w-full h-[50px] py-6 bg-gray-500 rounded-lg mb-1 animate-pulse" />
            <div className="w-full h-[50px] py-6 bg-gray-500 rounded-lg mb-1 animate-pulse" />
        </main>
      }>
        {activity === 'true' ? <Activity addr={addr} mode={mode} chain={chain} token={token} /> : <Dashboard addr={addr} mode={mode} chain={chain} token={token} />}
      </Suspense>
    </main>
  );
}
