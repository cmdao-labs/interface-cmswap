import CoinCard, { CoinCardData } from "./CoinCard";

type GridLayoutProps = { coins: CoinCardData[]; };

export default function GridLayout({ coins }: GridLayoutProps) {
    if (coins.length === 0) {
        return (
            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#080c18]/70 text-center text-slate-400">
                <p className="text-base font-medium text-white">No tokens found</p>
                <p className="text-sm text-slate-500">Try adjusting your filters or search to discover more listings.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {coins.map((coin) => (<CoinCard key={coin.id} {...coin} />))}
        </div>
    );
}

export type { CoinCardData };
