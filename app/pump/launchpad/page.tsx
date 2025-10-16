import type { Metadata } from "next";
import { Suspense } from "react";
import LaunchpadHeader from "@/components/cmswap/pump/Header";
import GridSkeleton from "@/components/cmswap/pump/GridSkeleton";
import Event from "@/components/cmswap/pump/Event";
import Sort from "@/components/cmswap/pump/Sort";
import Sort4 from "@/components/cmswap/pump/Sort4";
import TokenGrid from "@/components/cmswap/pump/Table";
export const metadata: Metadata = { title: "CMswap - PUMP", description: "hello pump.", };

export default async function Launchpad(props: {searchParams?: Promise<{ chain?: string; mode?: string; query?: string; sort?: string; order?: string; page?: string; token?: string; }>;}) {
	const searchParams = await props.searchParams;
	const chain = searchParams?.chain || "kubtestnet";
	const mode = searchParams?.mode || "pro";
	const query = searchParams?.query || "";
	const sort = searchParams?.sort || "";
	const order = searchParams?.order || "";
	const token = searchParams?.token || "";
	const ctaHref = `launchpad/launch?chain=${chain}${mode === "pro" ? "&mode=pro" : "&mode=lite"}`;
	return (
		<div className="min-h-screen w-full text-slate-100">
			<LaunchpadHeader ctaHref={ctaHref} activeRoute="Markets" />
			<main className="mx-auto flex w-full flex-col gap-4 py-1 sm:px-6 lg:px-10 overflow-hidden">
				<section className="grid gap-6">
					<Suspense key={`mode-${mode}-chain-${chain}`} fallback={<div className="h-[74px] w-full animate-pulse rounded-3xl bg-white/5" />}>
						<Event mode={mode} chain={chain} token={token} />
					</Suspense>
				</section>
				<section className="space-y-3">
					<div className="flex flex-row flex-wrap gap-4 py-3 shadow-inner">
						<div className="hidden sm:block"><Sort4 /></div>
						<Sort />
					</div>
					<Suspense key={`grid-${mode}-${chain}-${query}-${sort}-${order}`} fallback={<GridSkeleton />}>
						<TokenGrid mode={mode} query={query} sort={sort} order={order} chain={chain} token={token} />
					</Suspense>
				</section>
			</main>
		</div>
  	);
}
