'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Sort2() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const rankby = searchParams.get('rankby')?.toString()
    const mode = searchParams.get('mode')?.toString()

    const handleRank = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('rankby', term);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full xl:w-2/3 bg-gray-800 p-2 mb-2 rounded-2xl flex flex-row justify-around">
            <span className='p-2 w-1/4'>Rank by</span>
            <span className={(rankby === 'xp' || rankby === undefined ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline hover:font-bold p-2 w-1/2 text-center cursor-pointer ")} style={{backgroundImage: rankby === 'xp' || rankby === undefined ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleRank('xp')}>XP</span>
            <span className={(rankby === 'networth' ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: rankby === 'networth' ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleRank('networth')}>Net worth</span>
        </div>
    );
}
