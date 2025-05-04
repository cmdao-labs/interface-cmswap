'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Sort3() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const activity = searchParams.get('activity')?.toString()

    const handleActivity = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('activity', term);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full xl:w-2/3 bg-gray-800 p-2 mb-2 rounded-2xl flex flex-row justify-around">
            <span className={(activity === 'false' || activity === undefined ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: activity === 'false' || activity === undefined ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleActivity('false')}>Portfolio</span>
            <span className={(activity === 'true' ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: activity === 'true' ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleActivity('true')}>Activity</span>
        </div>
    );
}
