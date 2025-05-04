'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Sort() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const sort = searchParams.get('sort')?.toString()
    const order = searchParams.get('order')?.toString()

    const handleSort = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', term);
        params.set('order', 'ascending');
        replace(`${pathname}?${params.toString()}`);
    };

    const handleOrder = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('order', term);
        if (sort === undefined) {params.set('sort', 'mcap');}
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="w-full 2xl:w-1/4 bg-gray-800 self-center p-2 rounded-2xl flex flex-row justify-around">
                <span className='p-2 w-1/4'>Sort by</span>
                <span className={(sort === 'mcap' || sort === undefined ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: sort === 'mcap' || sort === undefined ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleSort('mcap')}>Marketcap</span>
                <span className={(sort === 'created' ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: sort === 'created' ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleSort('created')}>Created</span>
            </div>
            <div className="w-full 2xl:w-1/4 bg-gray-800 self-center p-2 rounded-2xl flex flex-row justify-around">
                <span className='p-2 w-1/4'>Order</span>
                {(sort === 'mcap' || sort === undefined) ?
                    <>
                        <span className={(order === 'ascending' || order === undefined ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: order === 'ascending' || order === undefined ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleOrder('ascending')}>High to low</span>
                        <span className={(order === 'descending' ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: order === 'descending' ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleOrder('descending')}>Low to high</span>
                    </> :
                    <>
                        <span className={(order === 'ascending' || order === undefined ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: order === 'ascending' || order === undefined ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleOrder('ascending')}>New</span>
                        <span className={(order === 'descending' ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg" : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center")} style={{backgroundImage: order === 'descending' ? 'radial-gradient( circle 919px at 1.7% 6.1%,  rgba(41,58,76,1) 0%, rgba(40,171,226,1) 100.2% )' : 'none'}} onClick={() => handleOrder('descending')}>Old</span>
                    </>
                }
            </div>
        </>
    );
}
