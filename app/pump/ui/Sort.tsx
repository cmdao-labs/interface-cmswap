'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, ClockArrowUp, ClockArrowDown } from "lucide-react";

const baseCardClasses = 'flex flex-row flex-wrap items-center justify-between gap-4 sm:px-6 py-2 text-xs';
const baseButtonClasses = 'flex-1 rounded-xl border border-white/10 px-4 py-2 text-center text-xs font-semibold transition-all duration-200';
const activeButtonClasses = 'bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-500/30 text-white border-emerald-400/50 shadow-lg shadow-emerald-500/20';
const inactiveButtonClasses = 'text-slate-400 hover:border-emerald-400/30 hover:text-white';

export default function Sort() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const sort = searchParams.get('sort')?.toString();
    const order = searchParams.get('order')?.toString();

    const handleSort = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', term);
        params.set('order', 'ascending');
        replace(`${pathname}?${params.toString()}`);
    };

    const handleOrder = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('order', term);
        if (!sort) {
            params.set('sort', 'mcap');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const isMarketCap = !sort || sort === 'mcap';

    const orderOptions = isMarketCap
        ? [
            { key: 'ascending', label: 'Highest' },
            { key: 'descending', label: 'Lowest' },
        ]
        : [
            { key: 'ascending', label: 'Newest' },
            { key: 'descending', label: 'Oldest' },
        ];

    return (
        <div className="grid gap-2 grid-cols-2">
            <div className={baseCardClasses}>
                <span className="text-slate-500">Sort by</span>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleSort('mcap')}
                        className={`${baseButtonClasses} ${isMarketCap ? activeButtonClasses : inactiveButtonClasses}`}
                        aria-pressed={isMarketCap}
                    >
                        MCap
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSort('created')}
                        className={`${baseButtonClasses} ${sort === 'created' ? activeButtonClasses : inactiveButtonClasses}`}
                        aria-pressed={sort === 'created'}
                    >
                        Created
                    </button>
                </div>
            </div>
            <div className={baseCardClasses}>
                <span className="text-slate-500 inline-flex items-center gap-1">
                    Order By
                    {((sort === 'mcap' && order === 'ascending') || (sort === undefined || order === undefined)) && (<TrendingUp className="h-4 w-4" aria-hidden="true" />)}
                    {sort === 'mcap' && order === 'descending' && (<TrendingDown className="h-4 w-4" aria-hidden="true" />)}
                    {sort === 'created' && order === 'ascending' && (<ClockArrowUp className="h-4 w-4" aria-hidden="true" />)}
                    {sort === 'created' && order === 'descending' && (<ClockArrowDown className="h-4 w-4" aria-hidden="true" />)}
                </span>
                <div className="flex gap-2">
                    {orderOptions.map((option) => {
                        const isActive = order === option.key || (!order && option.key === 'ascending');
                        return (
                            <button
                                key={option.key}
                                type="button"
                                onClick={() => handleOrder(option.key)}
                                className={`${baseButtonClasses} ${isActive ? activeButtonClasses : inactiveButtonClasses}`}
                                aria-pressed={isActive}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
