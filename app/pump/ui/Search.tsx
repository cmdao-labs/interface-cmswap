'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-inner shadow-black/20">
            <span role="img" aria-label="search" className="text-lg">🔍</span>
            <input
                className="flex-1 bg-transparent font-medium text-white placeholder-slate-500 outline-none"
                placeholder="Search tokens by ticker"
                onChange={(event) => handleSearch(event.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}
