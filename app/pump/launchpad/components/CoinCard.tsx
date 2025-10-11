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
	// Percentage of bonding progress (0-100). Optional.
	progressPercent?: number;
};

export default function CoinCard({
	href,
	logoUrl,
	name,
	symbol,
	marketCapDisplay,
	createdAgo,
	progressPercent,
}: CoinCardData) {
	const [src, setSrc] = useState(logoUrl);
	const clampedProgress = Math.max(0, Math.min(100, Number.isFinite(progressPercent as number) ? (progressPercent as number) : 0));

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
						sizes="256px"
					/>
				</div>
				<div className="flex flex-col gap-2 overflow-hidden w-1/2">
					<div className="flex flex-col gap-1">
						<span className="text-base font-semibold text-white truncate">{name}</span>
						<span className="text-sm text-slate-400">{symbol}</span>
						{createdAgo && (<span className="text-xs text-slate-500">{createdAgo}</span>)}
					</div>
					<span className="font-bold uppercase text-lg text-emerald-200">{marketCapDisplay}</span>
					<div className="mt-2">
						<div className="h-2 w-full rounded-full bg-white/10">
							<div
								className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500"
								style={{ width: `${clampedProgress}%` }}
							/>
						</div>
						<div className="mt-1 w-full text-right text-[11px] text-emerald-300">
							{clampedProgress.toFixed(2)}%
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
