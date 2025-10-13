'use client';
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, type KeyboardEvent } from 'react';

type ModeType = 'lite' | 'pro';
type ChainStyle = {
    gradient: string;
    accentBorder: string;
    accentText: string;
    label: string;
    supportedModes: ModeType[];
};
const baseCardClasses = 'flex flex-row gap-3 rounded-full border border-white/20 p-4 text-sm shadow-inner shadow-black/30';
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
const modeVisuals = {
    pro: {
        track: 'bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-emerald-500/20 border-emerald-400/40',
        activeText: 'text-emerald-200',
    },
    lite: {
        track: 'bg-gradient-to-r from-white-500/20 via-white-400/10 to-white-500/20 border-white-400/40',
        activeText: 'text-white-200',
    },
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
    const isPro = mode === 'pro';
    const canGoLite = supportedModes.includes('lite');
    const canGoPro = supportedModes.includes('pro');
    const canSwitch = isPro ? canGoLite : canGoPro;
    const handleToggle = useCallback(() => {
        if (isPro) {
            if (canGoLite) setMode('lite');
        } else {
            if (canGoPro) setMode('pro');
        }
    }, [isPro, canGoLite, canGoPro, setMode]);
    const handleKey = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
        if (!canSwitch) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    }, [canSwitch, handleToggle]);

    return (
        <div className={baseCardClasses}>
            <div className="flex flex-row items-center gap-2">
                {chainConfig.label === 'Bitkub Testnet' ? (
                    <>
                        <Image src="https://cmswap.mypinata.cloud/ipfs/bafkreiggymvcdojbawajbufsesu6npqldlv3hncq5hrolwoqu4whyvrexy" alt="" width={64} height={64} />
                        <span className='text-[8px] px-2 py-1 border border-white'>testnet</span>
                    </>
                ) : (
                    <span className={`font-semibold uppercase tracking-[0.2em] ${chainConfig.accentText}`}>{chainConfig.label}</span>
                )}
            </div>

            <div className="flex items-center">
                <button
                    type="button"
                    role="switch"
                    aria-checked={isPro}
                    aria-label="Toggle mode between Lite and Pro"
                    aria-disabled={!canSwitch}
                    disabled={!canSwitch}
                    onClick={handleToggle}
                    onKeyDown={handleKey}
                    className={`relative inline-flex h-8 w-18 items-center rounded-full border px-0.5 transition-all duration-200 focus:outline-none focus:ring-2 ${isPro ? 'focus:ring-emerald-400/40' : 'focus:ring-white-400/40'} ${canSwitch ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} ${isPro ? modeVisuals.pro.track : modeVisuals.lite.track} ${isPro ? 'justify-start' : 'justify-end'}`}
                >
                    <span className={`pointer-events-none absolute left-1.5 z-20 select-none text-xs font-semibold tracking-wide ${!isPro ? modeVisuals.lite.activeText : 'text-slate-400'}`}>Lite</span>
                    <span className={`pointer-events-none absolute right-1.5 z-20 select-none text-xs font-semibold tracking-wide ${isPro ? modeVisuals.pro.activeText : 'text-slate-400'}`}>Pro</span>
                    <span className="relative z-20 inline-block h-6 w-8 rounded-full bg-white shadow-sm" />
                </button>
            </div>
        </div>
    );
}
