import Link from "next/link"
import { ExternalLink, Github, FileText, MessageSquare, Facebook, Globe, Palette, HeartHandshake } from "lucide-react"

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2d] to-[#0a0a1a] relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10"><div id="matrix-rain" className="w-full h-full" /></div>
            <div className="absolute inset-0 z-0 opacity-10"><div className="circuit-pattern w-full h-full" /></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="shape-blob shape-blob-1" />
                <div className="shape-blob shape-blob-2" />
                <div className="shape-blob shape-blob-3" />
        </div>
        <div className="relative z-10 flex justify-center mt-[250px]">
            <div className="inline-flex items-center px-4 py-2 rounded-none bg-black/30 border border-[#32ffa7]/30 text-sm text-white/80 font-mono">
                <span>✨ OUR DOCUMENTATION AND FUTURE PLANS</span>
                <span className="mx-2 text-[#32ffa7]">::</span>
                <Link href="http://docs.openbbq.xyz/th" target="_blank" rel="noreferrer" className="text-[#32ffa7] hover:text-white font-mono flex items-center">DOCS<ExternalLink className="w-3 h-3 ml-1" /></Link>
            </div>
        </div>
        <main className="relative z-10">
            <div className="container mx-auto px-4 py-16 md:py-20">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-block mb-4">
                        <div className="px-3 py-1 border border-[#32ffa7]/30 bg-black/30 font-mono text-xs text-[#32ffa7]">
                            <span className="typing-effect">INITIALIZING_PERMISSIONLESS_PROTOCOL</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight font-mono relative">
                        <span className="text-white glitch-heading">CRYPTO MULTIVERSE OF</span>
                        <br />
                        <span className="text-[#32ffa7] glitch-heading">COMMUNITY_</span>
                        <span className="blink">|</span>
                    </h1>
                    <div className="terminal-window max-w-2xl mx-auto">
                        <div className="terminal-header">
                            <div className="terminal-title font-mono text-xs">creators@openbbq:~</div>
                        </div>
                        <div className="terminal-body font-mono text-sm md:text-base">
                            <div className="terminal-line">
                                <span className="text-[#32ffa7]">$</span> <span className="text-white/90">cmd infinite-imagination.txt</span>
                            </div>
                            <div className="terminal-line">
                                <span className="text-white/70">Unlock infinite possibilities. Designed with modularity at its core, allowing developers to customize and extend functionality effortlessly.</span>
                            </div>
                            <div className="terminal-line"><span className="text-[#32ffa7]">$</span> <span className="text-white/90">_</span></div>
                        </div>
                    </div>
                    <div className="pt-8" />
                </div>
                <div className="max-w-md mx-auto mt-20 relative">
                    <div className="absolute -inset-0.5 bg-[#32ffa7]/20" />
                        <div className="relative bg-black/50 border border-[#32ffa7]/30 p-8 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#32ffa7]/5 rounded-full blur-2xl -mr-16 -mt-16" />
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 border border-[#32ffa7]/50 flex items-center justify-center">
                                        <span className="text-[#32ffa7] font-mono font-bold">2</span>
                                    </div>
                                    <span className="text-xl font-mono text-white">GAME_HOOKS</span>
                                </div>
                                <div className="text-[#32ffa7]">[...]</div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-sm font-mono">NON-COMMITTED-POINT</span>
                                    <span className="text-[#32ffa7] font-mono">1</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-full bg-[#32ffa7]/70 loading-bar" />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-white/70 text-sm font-mono">MINING</span>
                                    <span className="text-[#32ffa7] font-mono">1</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-full bg-[#32ffa7]/70 loading-bar" />
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-[#32ffa7]/20">
                                <p className="text-white/60 text-sm font-mono">DEVELOPED_BY::SECOND_LABS</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/30 border border-[#32ffa7]/30 p-6 hover:bg-black/50 hover:border-[#32ffa7]/50 transition-all">
                            <Globe className="w-8 h-8 text-[#32ffa7] mb-4" />
                            <h3 className="text-white font-mono text-lg mb-2">PERMISSIONLESS</h3>
                            <p className="text-white/70 font-mono text-sm">Unlock infinite possibilities. Designed with modularity at its core, allowing developers to customize and extend functionality effortlessly.</p>
                        </div>
                        <div className="bg-black/30 border border-[#32ffa7]/30 p-6 hover:bg-black/50 hover:border-[#32ffa7]/50 transition-all">
                            <Palette className="w-8 h-8 text-[#32ffa7] mb-4" />
                            <h3 className="text-white font-mono text-lg mb-2">FOCUS_ON_CREATIVITY</h3>
                            <p className="text-white/70 font-mono text-sm">Turn ideas into reality. Developers build the tools — communities decide how to use them. Build, integrate, and expand what’s possible — your vision, your rules.</p>
                        </div>
                        <div className="bg-black/30 border border-[#32ffa7]/30 p-6 hover:bg-black/50 hover:border-[#32ffa7]/50 transition-all">
                            <HeartHandshake className="w-8 h-8 text-[#32ffa7] mb-4" />
                            <h3 className="text-white font-mono text-lg mb-2">POWERED_BY_COMMUNITY</h3>
                            <p className="text-white/70 font-mono text-sm">Leverage the power of our community-led protocol — where active participation is rewarded — just limitless, shared advancement.</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-mono">BUILT_BY_CONTRIBUTORS_WITH</h2>
                    <p className="text-xl md:text-2xl text-[#32ffa7] font-mono">BACKGROUNDS_FROM:</p>
                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <div className="w-32 h-12 bg-black/30 border border-[#32ffa7]/30 flex items-center justify-center hover:border-[#32ffa7]/70 transition-all">
                            <span className="text-white/70 font-mono text-sm">CommuDAO</span>
                        </div>
                    </div>
                </div>
            </main>      
        </div>
    )
}
