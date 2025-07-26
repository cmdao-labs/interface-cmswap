'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const chainStyles: Record<string, {
    borderColor: string;
    gradients: { lite: string; pro: string };
    supportedModes: ('lite' | 'pro')[];
}> = {
    monad: {
        borderColor: 'border-purple-300',
        gradients: {
            lite: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)',
            pro: 'linear-gradient(135deg, #D6BEF7, #A683EF)',
        },
        supportedModes: ['pro'],
    },
    kub: {
        borderColor: 'border-emerald-300',
        gradients: {
            lite: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)',
            pro: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)',
        },
        supportedModes: ['lite', 'pro'],
    },
    kubtestnet: {
        borderColor: 'border-emerald-300',
        gradients: {
            lite: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)',
            pro: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)',
        },
        supportedModes: ['pro'],
    },

};

export default function Sort4() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const mode = searchParams.get('mode') || 'lite';
    const chain = searchParams.get('chain') || 'kub';

    const chainConfig = chainStyles[chain] || chainStyles.base;
    const { supportedModes } = chainConfig;

    const setMode = useCallback((newMode: 'lite' | 'pro') => {
        if (!supportedModes.includes(newMode)) return; 
        const params = new URLSearchParams(searchParams);
        params.set('mode', newMode);
        replace(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, replace, supportedModes]);

    const getButtonStyle = (type: 'lite' | 'pro') => {
        const isActive = mode === type || (type === 'lite' && !mode);
        return {
            backgroundImage: isActive ? chainConfig.gradients[type] : 'none',
            cursor: supportedModes.includes(type) ? 'pointer' : 'not-allowed',
            opacity: supportedModes.includes(type) ? 1 : 0.4,
        };
    };

    return (
        <div className={`w-full xl:w-1/3 self-center bg-neutral-900 p-2 rounded-2xl flex flex-row justify-around border-solid border-2 ${chainConfig.borderColor}`} style={{ zIndex: 1 }}>
            <span
                className={`${mode === 'lite' ? 'text-black font-bold' : 'text-gray-400 underline hover:font-bold'} p-2 w-1/2 text-center rounded-lg`}
                style={getButtonStyle('lite')}
                onClick={() => supportedModes.includes('lite') && setMode('lite')}
            >
                Lite mode
            </span>
            <span
                className={`${mode === 'pro' ? 'text-black font-bold' : 'text-gray-400 underline hover:font-bold'} p-2 w-1/2 text-center rounded-lg`}
                style={getButtonStyle('pro')}
                onClick={() => supportedModes.includes('pro') && setMode('pro')}
            >
                Pro mode
            </span>
        </div>
    );
}
