'use client'
import React from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'

export default function Page() {
    const [scrollY, setScrollY] = React.useState(0)
    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen font-mono text-white relative overflow-hidden bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))]">
            <div className="fixed top-0 right-0 w-[400px] h-[400px] pointer-events-none select-none">
                <div className="absolute top-[20%] right-[25%] transform -rotate-1" style={{transform: `rotate(-12deg) translate(${Math.sin(scrollY * 0.02) * 10}px, ${Math.cos(scrollY * 0.02) * 10}px)`}}>
                    <img src="./fieldlogo.png" alt="" className="w-[250px] h-[250px] pixelated" />
                </div>
            </div>
            <main className="relative max-w-6xl mx-auto px-6 py-12 mt-[100px]">
                <div className="mb-12">
                    <h1 className="text-6xl font-light bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Fields</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-auto">
                    <Card className="group bg-[#0c1420] hover:bg-[#0d1522] border-0 rounded-xl overflow-hidden transition-all duration-300 py-0">
                        <div className="aspect-square relative overflow-hidden">
                            <img src="https://gateway.commudao.xyz/ipfs/bafybeicyixoicb7ai6zads6t5k6qpyocoyelfbyoi73nmtobfjlv7fseiq" alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1420] to-transparent opacity-60" />
                            <div className="absolute top-4 right-4 bg-[#00ff9d]/10 backdrop-blur-md px-3 py-1 rounded-full">
                                <span className="text-xs font-medium text-[#00ff9d]">ACTIVE</span>
                            </div>
                        </div>
                        <div className="px-6 py-2 space-y-5">
                            <h3 className="text-xl font-medium">CMDAO Valley</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">Hooks</div>
                                    <div className="text-[#00ff9d] font-medium">2</div>
                                </div>
                            </div>
                            <Link href="/fields/cmdao-valley/undefined"><Button className="w-full mb-5 bg-gradient-to-r from-[#00ff9d]/20 to-[#00cc7d]/20 hover:from-[#00ff9d]/40 hover:to-[#00cc7d]/80 text-[#00ff9d] hover:text-[#0c1420] border-0 h-11 rounded-lg transition-all duration-300 cursor-pointer">Enter Field</Button></Link>
                        </div>
                    </Card>
                    <Card className="bg-[#0c1420]/60 border-0 rounded-xl overflow-hidden py-0">
                        <div className="aspect-square relative bg-[#080a14]/80 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-purple-500/5 flex items-center justify-center">
                                <span className="text-2xl">🔒</span>
                            </div>
                        </div>
                        <div className="p-6 py-2 space-y-5">
                            <h3 className="text-xl font-medium text-gray-400">Your Field</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Hooks</div>
                                    <div className="text-gray-400">--</div>
                                </div>
                            </div>
                            <Button disabled className="w-full mb-5 bg-gray-800/30 text-gray-500 border-0 h-11 rounded-lg cursor-not-allowed">Locked</Button>
                        </div>
                    </Card>
                    <Card className="bg-[#0c1420]/60 border-0 rounded-xl overflow-hidden py-0">
                        <div className="aspect-square relative bg-[#080a14]/80 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-purple-500/5 flex items-center justify-center">
                                <span className="text-2xl">🔒</span>
                            </div>
                        </div>
                        <div className="p-6 py-2 space-y-5">
                            <h3 className="text-xl font-medium text-gray-400">Your Field</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Hooks</div>
                                    <div className="text-gray-400">--</div>
                                </div>
                            </div>
                            <Button disabled className="w-full mb-5 bg-gray-800/30 text-gray-500 border-0 h-11 rounded-lg cursor-not-allowed">Locked</Button>
                        </div>
                    </Card>
                </div>
                <div className="mt-16 pt-6 border-t border-[#00ff9d]/5">
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="text-[#00ff9d] mr-2">$</span>
                        <span className="text-gray-400 mr-2">fields_loaded</span>
                        <span className="text-white">1</span>
                        <span className="ml-2 w-2 h-4 bg-[#00ff9d] opacity-75 animate-pulse" />
                    </div>
                </div>
            </main>
        </div>
    )
}
