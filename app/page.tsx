'use client'
import React from "react"
import Link from "next/link"
import { ExternalLink, Github, FileText, MessageSquare, Facebook, Globe, Palette, HeartHandshake } from "lucide-react"

export default function Page() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        const updateSize = () => {
            canvas.width = window.innerWidth
            canvas.height = 400
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        let time = 0
        const speed = 0.0005
        const draw = () => {
            time += speed
            ctx.fillStyle = "#050510"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const lineWidth = Math.min(canvas.width, 1200)
            const lineHeight = 1
            const gradient = ctx.createLinearGradient(centerX - lineWidth / 2, centerY, centerX + lineWidth / 2, centerY)
            gradient.addColorStop(0, "rgba(0, 255, 65, 0)")
            gradient.addColorStop(0.1, "rgba(0, 255, 65, 0.05)")
            gradient.addColorStop(0.5, "rgba(0, 255, 65, 0.3)")
            gradient.addColorStop(0.9, "rgba(0, 255, 65, 0.05)")
            gradient.addColorStop(1, "rgba(0, 255, 65, 0)")
            ctx.fillStyle = gradient
            ctx.fillRect(centerX - lineWidth / 2, centerY, lineWidth, lineHeight)
            const maxRadius = 120
            const minRadius = 100
            const pulseRadius = minRadius + Math.sin(time * 2) * ((maxRadius - minRadius) / 2)
            const glowGradient = ctx.createRadialGradient(
                centerX,
                centerY,
                pulseRadius * 0.8,
                centerX,
                centerY,
                pulseRadius * 1.2,
            )
            glowGradient.addColorStop(0, "rgba(0, 255, 65, 0.1)")
            glowGradient.addColorStop(1, "rgba(0, 255, 65, 0)")
            ctx.beginPath()
            ctx.arc(centerX, centerY, pulseRadius * 1.2, 0, Math.PI * 2)
            ctx.fillStyle = glowGradient
            ctx.fill()
            ctx.beginPath()
            ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
            ctx.strokeStyle = "rgba(0, 255, 65, 0.2)"
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(centerX, centerY, pulseRadius * 0.7, 0, Math.PI * 2)
            ctx.strokeStyle = "rgba(0, 255, 65, 0.3)"
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(0, 255, 65, 0.8)"
            ctx.fill()
            requestAnimationFrame(draw)
        }
        draw()
        return () => {
            window.removeEventListener("resize", updateSize)
        }
    }, [])

    return (
        <div className="min-h-screen bg-[#050510] relative overflow-hidden">
            <div className="absolute inset-0 z-0"><div className="grid-background w-full h-full" /></div>
            <div className="absolute top-[25%] right-[10%] w-24 h-24 md:w-32 md:h-32 floating-element floating-element-1 opacity-30">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[#00FF41]/30 rounded-md rotate-12 opacity-80 blur-sm" />
                    <div className="absolute inset-0 bg-[#00FF41]/20 rounded-md rotate-12 border border-[#00FF41] flex items-center justify-center">
                        <Globe className="w-10 h-10 text-[#00FF41]" />
                    </div>
                </div>
            </div>
            <div className="absolute top-[45%] left-[10%] w-20 h-20 md:w-28 md:h-28 floating-element floating-element-2 opacity-30">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[#00FF41]/30 rounded-md -rotate-12 opacity-80 blur-sm" />
                    <div className="absolute inset-0 bg-[#00FF41]/20 rounded-md -rotate-12 border border-[#00FF41] flex items-center justify-center">
                        <Palette className="w-8 h-8 text-[#00FF41]" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-[20%] right-[25%] w-16 h-16 md:w-24 md:h-24 floating-element floating-element-3 opacity-30">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[#00FF41]/30 rounded-md rotate-45 opacity-80 blur-sm" />
                    <div className="absolute inset-0 bg-[#00FF41]/20 rounded-md rotate-45 border border-[#00FF41] flex items-center justify-center">
                        <HeartHandshake className="w-6 h-6 text-[#00FF41]" />
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-[400px] z-0"><canvas ref={canvasRef} className="w-full h-full" /></div>
            <div className="relative z-10 flex justify-center mt-[100px]">
                <div className="inline-flex items-center px-4 py-2 rounded-none bg-black/30 border border-[#00FF41]/30 text-sm text-white/80 font-mono">
                    <span>✨ OUR DOCUMENTATION AND FUTURE PLANS</span>
                    <span className="mx-2 text-[#00FF41]">::</span>
                    <Link href="http://docs.openbbq.xyz/th" target="_blank" rel="noreferrer" className="text-[#00FF41] hover:text-white font-mono flex items-center">DOCS<ExternalLink className="w-3 h-3 ml-1" /></Link>
                </div>
            </div>
            <main className="relative z-10">
                <div className="container mx-auto px-4 py-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="inline-block">
                            <div className="px-3 py-1 border border-[#00FF41]/30 bg-[#0A0A1A] font-mono text-xs text-[#00FF41]">
                                <span className="typing-effect">INITIALIZING_PERMISSIONLESS_PROTOCOL</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight font-mono relative">
                            <span className="text-white glitch-heading">CRYPTO MULTIVERSE OF</span>
                            <br />
                            <span className="text-[#00FF41] glitch-heading">COMMUNITY_</span>
                            <span className="blink">|</span>
                        </h1>
                        <div className="terminal-window max-w-3xl mx-auto">
                            <div className="terminal-header">
                                <div className="terminal-title font-mono text-xs">creators@openbbq:~</div>
                            </div>
                            <div className="terminal-body font-mono text-sm md:text-base">
                                <div className="terminal-line">
                                    <span className="text-[#00FF41]">$</span> <span className="text-white/90">cmd infinite-imagination.txt</span>
                                </div>
                                <div className="terminal-line">
                                    <span className="text-white/70">Unlock infinite possibilities. Designed with modularity at its core, allowing developers to customize and extend functionality effortlessly.</span>
                                </div>
                                <div className="terminal-line"><span className="text-[#00FF41]">$</span> <span className="text-white/90">_</span></div>
                            </div>
                        </div>
                        <div className="pt-8" />
                    </div>
                    <div className="max-w-3xl mx-auto mt-12 relative">
                        <div className="absolute -inset-0.5 bg-[#00FF41]/20" />
                        <div className="relative bg-[#0A0A1A] border border-[#00FF41]/30 p-8 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF41]/5 rounded-full blur-2xl -mr-16 -mt-16" />
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 border border-[#00FF41]/50 flex items-center justify-center">
                                        <span className="text-[#00FF41] font-mono font-bold">2</span>
                                    </div>
                                    <span className="text-xl font-mono text-white">GAME_HOOKS</span>
                                </div>
                                <div className="text-[#00FF41]">[...]</div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/70 text-sm font-mono">NON-COMMITTED-POINT</span>
                                    <span className="text-[#00FF41] font-mono">1</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-full bg-[#00FF41]/70 loading-bar" />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-white/70 text-sm font-mono">MINING</span>
                                    <span className="text-[#00FF41] font-mono">1</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 overflow-hidden">
                                    <div className="h-full w-full bg-[#00FF41]/70 loading-bar" />
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-[#00FF41]/20">
                                <p className="text-white/60 text-sm font-mono">DEVELOPED_BY::SECOND_LABS</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><Globe className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-lg mb-2">PERMISSIONLESS</h3>
                            <p className="text-white/70 font-mono text-sm">Unlock infinite possibilities. Designed with modularity at its core, allowing developers to customize and extend functionality effortlessly.</p>
                        </div>
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><Palette className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-lg mb-2">FOCUS_ON_CREATIVITY</h3>
                            <p className="text-white/70 font-mono text-sm">Turn ideas into reality. Developers build the tools — communities decide how to use them. Build, integrate, and expand what’s possible — your vision, your rules.</p>
                        </div>
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><HeartHandshake className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-lg mb-2">POWERED_BY_COMMUNITY</h3>
                            <p className="text-white/70 font-mono text-sm">Leverage the power of our community-led protocol — where active participation is rewarded — just limitless, shared advancement.</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mb-24 px-4 py-16 text-center">
                    <div className="text-[#00FF41] text-sm font-mono mb-4">BUILT_BY_CONTRIBUTORS_WITH</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-mono">
                        BACKGROUNDS_FROM:
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <div className="w-32 h-12 bg-black/30 border border-[#00FF41]/30 flex items-center justify-center hover:border-[#00FF41]/70 transition-all">
                            <span className="text-white/70 font-mono text-sm">CommuDAO</span>
                        </div>
                    </div>
                </div>
                <div className="glitch-container"><div className="glitch-line" /></div>
            </main>
        </div>
    )
}
