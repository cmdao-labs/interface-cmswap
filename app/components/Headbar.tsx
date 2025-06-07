'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Headbar() {
    const queryClient = new QueryClient()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const handleLinkClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <QueryClientProvider client={queryClient}> 
            <header className='h-[85px] w-[80%] lg:w-full fixed backdrop-blur-lg text-sm text-white z-999'>
                <div className='flex flex-row items-center justify-between'>
                    <div className="gap-2 flex flex-row items-center p-6">
                        <div className="flex items-center justify-between h-8">
                            <Link href="/"><Button variant="ghost" className='cursor-pointer' size="icon"><img alt="" src="/favicon.ico" height="25" width="25" /></Button></Link>
                            <div className="hidden md:block">

                            <div className="ml-8 flex justify-between items-center w-full max-w-screen-xl mx-auto">
                                    <Link href="/swap" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono">
                                    <Button variant="ghost" className="cursor-pointer">Swap</Button>
                                    </Link>
                                    <Link href="/bridge" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono">
                                    <Button variant="ghost" className="cursor-pointer">Bridge</Button>
                                    </Link>
                                    <Link href="/pump" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono">
                                    <Button variant="ghost" className="cursor-pointer">Pump</Button>
                                    </Link>
                                    {/* <Link href="/trade" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono">
                                    <Button variant="ghost" className="cursor-pointer">Trade</Button>
                                    </Link>        
                                    <Link href="/referral" className="text-white/70 hover:text-[#32ffa7] transition-colors text-sm font-mono">
                                    <Button variant="ghost" className="cursor-pointer">Referral Program</Button>
                                    </Link> */}
                            </div>


                            </div>
                            <div className="md:hidden ml-4 flex items-center">
                                <button 
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-expanded="false"
                                    onClick={toggleMenu}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex align-center justify-end xl:mr-2 p-6">
                        {/* @ts-expect-error msg */}
                        <appkit-button />
                        <Link href="/"><Button variant="ghost" className="cursor-pointer" size="icon"><img alt="" src="/flag-of-singapore.png" className="rounded-full w-[25px] h-[25px] object-cover" /></Button></Link>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden w-full bg-gray-950 text-white">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/swap" className="text-white/70 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 font-mono"><Button variant="ghost" className='cursor-pointer' onClick={handleLinkClick}>Swap</Button></Link>
                            <Link href="/bridge" className="text-white/70 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 font-mono"><Button variant="ghost" className='cursor-pointer' onClick={handleLinkClick}>Bridge</Button></Link>
                            <Link href="/pump" className="text-white/70 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 font-mono"><Button variant="ghost" className='cursor-pointer' onClick={handleLinkClick}>Pump</Button></Link>
                            {/* <Link href="/trade" className="text-white/70 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 font-mono"><Button variant="ghost" className='cursor-pointer' onClick={handleLinkClick}>Trade</Button></Link>
                            <Link href="/referral" className="text-white/70 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 font-mono"><Button variant="ghost" className='cursor-pointer' onClick={handleLinkClick}>Referral Program</Button></Link> */}
                        </div>
                    </div>
                )}
            </header>
        </QueryClientProvider>
    )
}
