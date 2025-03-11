'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Headbar() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}> 
            <header className='h-[60px] w-full flex flex-row items-center justify-between fixed backdrop-blur-lg text-sm text-white z-999'>
                <div className="gap-2 flex flex-row items-center p-6">
                    <Button variant="ghost" size="icon"><Link href="/"><img alt="" src="/favicon.ico" height="25" width="25" /></Link></Button>
                    <Button variant="ghost"><Link href="/fields">Fields</Link></Button>
                    <Button variant="ghost"><Link href="/swap">Swap</Link></Button>
                </div>
                <div className="flex align-center justify-end xl:mr-2">
                    {/* @ts-expect-error msg */}
                    <appkit-button />
                </div>
            </header>
        </QueryClientProvider>
  )
}
