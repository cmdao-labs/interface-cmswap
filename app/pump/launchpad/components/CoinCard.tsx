"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

export type CoinCardData = {
	id: string;
	href: string;
	name: string;
	symbol: string;
	logoUrl: string;
	marketCapDisplay: string;
	createdAgo?: string;
};

export default function CoinCard({
	href,
	logoUrl,
	name,
	symbol,
	marketCapDisplay,
	createdAgo,
}: CoinCardData) {
	const [src, setSrc] = useState(logoUrl);

	return (
		<Link
			href={href}
			prefetch={false}
			className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-lg bg-[#0a111f]/80 p-3 border border-white/5 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border hover:border-white"
		>
			<div className="flex items-start gap-4">
				<div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-white/10">
					<Image
						src={src}
						alt={`${name}`}
						onError={() => setSrc("/default.ico")}
						fill
						className="object-cover"
						sizes="64px"
					/>
				</div>
				<div className="flex flex-col gap-1 overflow-hidden">
					<div className="flex items-center gap-3">
						<span className="text-base font-semibold text-white truncate">{name}</span>
					</div>
					<span className="text-sm text-slate-400">{symbol}</span>
					{createdAgo && (<span className="text-xs text-slate-500">{createdAgo}</span>)}
					<span className="font-bold uppercase text-sm text-emerald-200">{marketCapDisplay}</span>
				</div>
			</div>
		</Link>
	);
}
