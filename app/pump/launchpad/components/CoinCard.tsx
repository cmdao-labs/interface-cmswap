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
						<div className="relative h-2 w-full overflow-hidden rounded-full">
							<div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">
								<div className="h-full w-full rounded-full bg-black/60" />
							</div>
							<div className="relative h-2 overflow-hidden rounded-full bg-white/10">
								<div
									className="relative h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 animate-bonding"
									style={{ width: `${clampedProgress}%` }}
								>
									<div className="absolute inset-0 rounded-full opacity-50 blur-[6px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 animate-bonding-glow" />
								</div>
								<div
									className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.25),transparent_40%)] bg-repeat-x bg-[length:14px_14px,18px_18px] animate-spark"
									style={{ width: `${clampedProgress}%` }}
								/>
							</div>
						</div>
						<div className="mt-1 w-full text-right text-[11px] text-emerald-300">
							{clampedProgress.toFixed(2)}%
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				@keyframes bondingShift {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
				@keyframes bondingGlow {
					0%, 100% { opacity: 0.35; filter: blur(6px); }
					50% { opacity: 0.75; filter: blur(12px); }
				}
				@keyframes spark {
					0% { background-position: 0 0, 0 0; opacity: 0.25; }
					50% { background-position: 14px 0, 18px 0; opacity: 0.6; }
					100% { background-position: 0 0, 0 0; opacity: 0.25; }
				}
				.animate-bonding { background-size: 200% 200%; animation: bondingShift 2.2s ease-in-out infinite; }
				.animate-bonding-glow { background-size: 200% 200%; animation: bondingGlow 1.6s ease-in-out infinite, bondingShift 2.8s linear infinite; }
				.animate-spark { animation: spark 0.9s linear infinite; }
			`}</style>
		</Link>
	);
}
