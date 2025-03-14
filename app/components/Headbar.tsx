'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Headbar() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}> 
            <header className='h-[85px] w-full fixed backdrop-blur-lg text-sm text-white z-999'>
                <div className='flex flex-row items-center justify-between'>
                    <div className="gap-2 flex flex-row items-center p-6">
                        <Button variant="ghost" size="icon"><Link href="/"><img alt="" src="/favicon.ico" height="25" width="25" /></Link></Button>
                        <Button variant="ghost"><Link href="/fields" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono"><span className="text-[#32ffa7]">&gt;</span> Fields</Link></Button>
                        <Button variant="ghost"><Link href="/swap" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono"><span className="text-[#32ffa7]">&gt;</span> Swap</Link></Button>
                    </div>
                    <div className="flex align-center justify-end xl:mr-2">
                        {/* @ts-expect-error msg */}
                        <appkit-button />
                    </div>
                </div>
            </header>
        </QueryClientProvider>
    )
}
