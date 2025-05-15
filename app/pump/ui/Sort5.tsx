'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Sort5() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const mode = searchParams.get('mode')?.toString();
    const token = searchParams.get('token')?.toString();

    const handleToken = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('token', term);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full xl:w-1/3 self-center bg-neutral-900 p-2 rounded-2xl flex flex-row justify-start border-solid border-2 border-emerald-300" style={{zIndex: 1}}>
            <span className={(token === 'cmm' || token === undefined ? "text-black font-bold p-2 w-1/4 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-not-allowed hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: mode === 'lite' || mode === undefined ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3% )' : 'none'}} onClick={() => {if (mode === 'lite') {handleToken('cmm');}}}>$CMM</span>
        </div>
    );
}
