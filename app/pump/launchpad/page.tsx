import type { Metadata } from "next";
import { Suspense } from "react";

import LaunchpadHeader from "./components/Header";
import GridSkeleton from "./components/GridSkeleton";
import ReferralTracker from "../../components/Refferal";
import Event from "@/app/pump/ui/Event";
import Sort from "@/app/pump/ui/Sort";
import Sort4 from "@/app/pump/ui/Sort4";
import Sort5 from "@/app/pump/ui/Sort5";
import TokenGrid from "@/app/pump/ui/Table";

export const metadata: Metadata = { title: "CMswap - PUMP", description: "hello pump.", };

export default async function Launchpad(props: {
	searchParams?: Promise<{
		chain?: string;
		mode?: string;
		query?: string;
		sort?: string;
		order?: string;
		page?: string;
		token?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const chain = searchParams?.chain || "";
	const mode = searchParams?.mode || "";
	const query = searchParams?.query || "";
	const sort = searchParams?.sort || "";
	const order = searchParams?.order || "";
	const token = searchParams?.token || "";

	const ctaHref = `launchpad/launch?chain=${chain}${mode === "pro" ? "&mode=pro" : "&mode=lite"}`;

	return (
		<div className="min-h-screen w-full text-slate-100">
			<LaunchpadHeader ctaHref={ctaHref} activeRoute="Markets" />
			<main className="mx-auto flex w-full flex-col gap-4 pb-16 pt-1 sm:px-6 lg:px-10 overflow-hidden">
				<ReferralTracker />
				<section className="grid gap-6">
					<Suspense
						key={`mode-${mode}-chain-${chain}`}
						fallback={<div className="h-28 w-full animate-pulse rounded-3xl bg-white/5" />}
					>
						<div className="">
							<Event mode={mode} chain={chain} token={token} />
						</div>
					</Suspense>
				</section>
				<section className="space-y-3">
					<div className="flex flex-col gap-4 p-3 shadow-inner">
						<div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-[2fr_3fr_2fr]">
							<div className="flex flex-col gap-4 lg:col-span-1 xl:col-span-2 xl:flex-row">
								<Sort4 />
								<Sort />
							</div>
						</div>
						{mode === "lite" && chain === "kub" && (<div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4"><Sort5 /></div>)}
					</div>
					<Suspense
						key={`grid-${mode}-${chain}-${query}-${sort}-${order}`}
						fallback={<GridSkeleton />}
					>
						<TokenGrid
							mode={mode}
							query={query}
							sort={sort}
							order={order}
							chain={chain}
							token={token}
						/>
					</Suspense>
				</section>
			</main>
		</div>
  	);
}
