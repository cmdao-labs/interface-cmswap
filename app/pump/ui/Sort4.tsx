'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

type ModeType = 'lite' | 'pro';

type ChainStyle = {
    gradient: string;
    accentBorder: string;
    accentText: string;
    label: string;
    supportedModes: ModeType[];
};

const baseCardClasses = 'flex w-full flex-col gap-3 rounded-full border border-white/20 px-8 py-4 text-sm shadow-inner shadow-black/30';
const baseButtonClasses = 'flex-1 rounded-xl border border-white/10 px-4 py-2 text-center text-sm font-semibold transition-all duration-200';
const inactiveButtonClasses = 'text-slate-400 hover:border-emerald-400/30 hover:text-white';

const chainStyles: Record<string, ChainStyle> = {
    kub: {
        gradient: 'from-emerald-500/40 via-emerald-400/20 to-emerald-500/30',
        accentBorder: 'border-emerald-400/50 shadow-emerald-500/20',
        accentText: 'text-emerald-300',
        label: 'KUB Network',
        supportedModes: ['lite', 'pro'],
    },
    monad: {
        gradient: 'from-purple-500/40 via-fuchsia-400/20 to-indigo-500/30',
        accentBorder: 'border-purple-400/50 shadow-purple-500/20',
        accentText: 'text-purple-300',
        label: 'Monad Testnet',
        supportedModes: ['pro'],
    },
    kubtestnet: {
        gradient: 'from-emerald-400/35 via-emerald-300/15 to-emerald-500/25',
        accentBorder: 'border-emerald-300/50 shadow-emerald-400/20',
        accentText: 'text-emerald-200',
        label: 'Bitkub Testnet',
        supportedModes: ['pro'],
    },
};

const defaultStyle: ChainStyle = {
    gradient: 'from-emerald-500/40 via-emerald-400/20 to-emerald-500/30',
    accentBorder: 'border-emerald-400/50 shadow-emerald-500/20',
    accentText: 'text-emerald-300',
    label: 'CMSwap',
    supportedModes: ['lite', 'pro'],
};

export default function Sort4() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const mode = (searchParams.get('mode') || 'lite') as ModeType;
    const chain = searchParams.get('chain') || 'kub';

    const chainConfig = chainStyles[chain] ?? defaultStyle;
    const { supportedModes } = chainConfig;

    const setMode = useCallback((newMode: ModeType) => {
        if (!supportedModes.includes(newMode)) return;
        const params = new URLSearchParams(searchParams);
        params.set('mode', newMode);
        replace(`${pathname}?${params.toString()}`);
    }, [replace, pathname, searchParams, supportedModes]);

    return (
        <div className={baseCardClasses}>
            <div className="flex items-center justify-between text-xs mb-2">
                <span className={`font-semibold uppercase tracking-[0.2em] ${chainConfig.accentText}`}>{chainConfig.label}</span>
            </div>
            <div className="flex gap-2">
                {(['lite', 'pro'] as ModeType[]).map((type) => {
                    const isActive = mode === type;
                    const isSupported = supportedModes.includes(type);
                    const activeClasses = isActive
                        ? `bg-gradient-to-r ${chainConfig.gradient} text-white ${chainConfig.accentBorder}`
                        : inactiveButtonClasses;
                    return (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setMode(type)}
                            className={`${baseButtonClasses} ${activeClasses} ${!isSupported ? 'cursor-not-allowed opacity-40' : ''}`}
                            aria-pressed={isActive}
                            aria-disabled={!isSupported}
                            disabled={!isSupported}
                        >
                            {type === 'lite' ? 'Lite Mode' : 'Pro Mode'}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
