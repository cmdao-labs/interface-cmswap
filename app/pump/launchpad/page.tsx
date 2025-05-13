import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from 'react';
import Search from "@/app/pump/ui/Search";
import Sort from "@/app/pump/ui/Sort";
import Table from "@/app/pump/ui/Table";
// import Event from "@/app/pump/ui/Event";
import Sort4 from "@/app/pump/ui/Sort4";

export const metadata: Metadata = {
    title: "CMswap - PUMP",
    description: "hello superchain.",
};

export default async function Launchpad(props: {
  searchParams?: Promise<{
    chain?: string;
    mode?: string;
    query?: string;
    sort?: string;
    order?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const chain = searchParams?.chain || '';
  const mode = searchParams?.mode || '';
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || '';
  const order = searchParams?.order || '';
  
  return (
    <main className="mt-[100px] w-full h-full flex flex-col gap-4 items-center sm:items-start overflow-hidden">
        <div className="flex flex-row flex-wrap 2xl:flex-no-wrap gap-14 w-full gap-6 mt-2 mb-6" style={{zIndex: 1}}>
          <Sort4 />
          <Link href={"launchpad/launch?chain=" + chain + (mode === 'pro' ? "&mode=pro" : "&mode=lite")} prefetch={false} className="w-full xl:w-1/6 self-center flex flex-row items-center justify-center gap-2 p-4 rounded-full font-medium text-center text-lg hover:font-bold" style={{backgroundImage: 'radial-gradient( circle 1292px at -13.6% 51.7%,  rgba(0,56,68,1) 0%, rgba(163,217,185,1) 51.5%, rgba(255,252,247,1) 88.6% )', textShadow: '0px 0px 12px rgba(0,255,209,.7)'}}>
            <span>Create a token</span> 
            🚀
          </Link>
        </div>
        <Suspense key={'mode-' + mode + '-chain-' + chain + '-query-' + query + '-sort-' + sort + '-order-' + order} fallback={
          <div className="w-full h-full flex flex-row flex-wrap items-start justify-start gap-6 overflow-visible" style={{zIndex: 1}}>
            <div className="flex flex-row items-center sm:items-start gap-6 mt-1 w-full">
              <div className="p-2 mb-4 bg-slate-700 rounded-lg w-[156px] h-[46px] animate-pulse" />
              <div className="p-2 mb-4 bg-slate-700 rounded-lg w-[156px] h-[46px] animate-pulse" />
              <div className="p-2 mb-4 bg-slate-700 rounded-lg w-[156px] h-[46px] animate-pulse" />
            </div>
            <div className="flex flex-row flex-wrap 2xl:flex-no-wrap gap-6 w-full">
              <div className="w-full 2xl:w-1/4 h-[52px] self-center rounded-full bg-gray-950 p-4" />
              <div className="w-full 2xl:w-1/4 h-[56px] bg-gray-800 self-center p-2 rounded-2xl" />
              <div className="w-full 2xl:w-1/4 h-[56px] bg-gray-800 self-center p-2 rounded-2xl" />
            </div>
            <div className="w-full h-[700px] flex flex-row flex-wrap items-start justify-start">
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600  shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="p-2 w-full xl:w-1/3">
                <div className="w-full h-[220px] flex flex-row item-center justify-around bg-gray-600 shadow-xl rounded-lg">
                  <div className="ml-[10px] sm:ml-[30px] h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                  <div className="mr-[10px] sm:mr-[30px] w-2/5 h-[100px] sm:h-[170px] self-center bg-gray-500 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        }>
          <div className="w-full h-full flex flex-row flex-wrap items-start justify-start gap-6 overflow-visible" style={{zIndex: 1}}>
            {/* <Event mode={mode} chain={chain} /> */}
            <div className="flex flex-row flex-wrap 2xl:flex-no-wrap gap-6 w-full">
              <Search />
              <Sort />
            </div>
            <div className="w-full flex flex-row flex-wrap items-start justify-start overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-sky-500">
              <Table mode={mode} query={query} sort={sort} order={order} chain={chain} />
            </div>
          </div>
        </Suspense>
    </main>
  );
}
