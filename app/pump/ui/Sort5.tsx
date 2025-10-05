'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const cardClasses = 'flex w-full flex-col gap-3 rounded-2xl border border-emerald-400/30 bg-[#071017]/80 p-4 text-sm shadow-inner shadow-emerald-500/20';
const buttonClasses = 'w-full rounded-xl border border-emerald-400/40 px-4 py-2 text-center text-sm font-semibold transition-all duration-200';

export default function Sort5() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const mode = searchParams.get('mode')?.toString();
    const token = searchParams.get('token')?.toString();

    const isLite = !mode || mode === 'lite';
    const isActive = token === 'cmm' || token === undefined;

    const handleToken = (term: string) => {
        if (!isLite) return;
        const params = new URLSearchParams(searchParams);
        params.set('token', term);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={cardClasses}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">Lite collections</span>
            <p className="text-xs text-slate-400">Access curated CMM markets optimised for rapid discoveries.</p>
            <button
                type="button"
                onClick={() => handleToken('cmm')}
                className={`${buttonClasses} ${isActive ? 'bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-500/30 text-white shadow-lg shadow-emerald-500/20' : 'text-emerald-300/70 hover:text-emerald-200'}`}
                aria-pressed={isActive}
                aria-disabled={!isLite}
                disabled={!isLite}
            >
                $CMM Spotlight
            </button>
            {!isLite && (
                <span className="text-xs text-slate-500">Switch to lite mode to explore the $CMM rail.</span>
            )}
        </div>
    );
}
