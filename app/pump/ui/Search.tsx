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
        <div className="w-full 2xl:w-1/4 flex flex-row gap-4 items-center self-center rounded-full bg-gray-950 p-4 border-2 border-gray">
            👀
            <input className="appearance-none leading-tight bg-transparent focus:outline-none focus:shadow-outline font-bold" placeholder="Search Token By Ticket" onChange={(event) => handleSearch(event.target.value)} defaultValue={searchParams.get('query')?.toString()} />
        </div>
    );
}
