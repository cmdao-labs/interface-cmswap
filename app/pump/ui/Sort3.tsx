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
        <div className="w-full mb-2 grid grid-cols-2">
            <span className={(activity === 'false' || activity === undefined ? "font-bold p-2 text-center text-emerald-300 border-b border-emerald-300" : "text-gray-400 cursor-pointer hover:font-bold p-2 text-center")} onClick={() => handleActivity('false')}>Portfolio</span>
            <span className={(activity === 'true' ? "font-bold p-2 text-center text-emerald-300 border-b border-emerald-300" : "text-gray-400 cursor-pointer hover:font-bold p-2 text-center")} onClick={() => handleActivity('true')}>Activity</span>
        </div>
    );
}
