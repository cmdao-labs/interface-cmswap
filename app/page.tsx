'use client'
import React from "react"
import Link from "next/link"
import { ExternalLink, Github, FileText, MessageSquare, Facebook, Globe, Palette, HeartHandshake } from "lucide-react"
import ReferralTracker from './components/Refferal'

export default function Page() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const visualizationCanvasRef = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        
        // Main header canvas animation
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth
            canvas.height = 400
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        // Visualization canvas animation
        const initVisualizationCanvas = () => {
            const canvas = visualizationCanvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            // Set canvas size
            canvas.width = 500
            canvas.height = 300
            let time = 0
            const speed = 0.001
            const drawVisualization = () => {
                time += speed
                // Clear canvas
                ctx.fillStyle = "rgba(0, 0, 0, 0)"
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                const centerX = canvas.width / 2
                const centerY = canvas.height / 2
                // Draw orbital rings
                const ringCount = 15
                const maxRadius = 120
                for (let i = 0; i < ringCount; i++) {
                    // Calculate ring properties
                    const ringRadius = maxRadius * (0.3 + (i / ringCount) * 0.7)
                    const ringTilt = Math.PI / 4 // 45 degrees tilt
                    const ringRotation = time * (0.2 + i * 0.05) // Each ring rotates at different speed
                    const ringOpacity = 0.7 - (i / ringCount) * 0.5
                    // Draw elliptical ring
                    ctx.beginPath()
                    // Create gradient for the ring
                    const gradient = ctx.createLinearGradient(centerX - ringRadius, centerY, centerX + ringRadius, centerY)
                    if (i % 2 === 0) {
                        gradient.addColorStop(0, `rgba(0, 255, 150, ${ringOpacity})`)
                        gradient.addColorStop(1, `rgba(0, 150, 255, ${ringOpacity})`)
                    } else {
                        gradient.addColorStop(0, `rgba(0, 200, 255, ${ringOpacity})`)
                        gradient.addColorStop(1, `rgba(0, 255, 150, ${ringOpacity})`)
                    }
                    ctx.strokeStyle = gradient
                    ctx.lineWidth = 1
                    // Draw the elliptical ring with rotation
                    for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
                        const rotatedAngle = angle + ringRotation
                        // Calculate point on ellipse
                        const x = centerX + Math.cos(rotatedAngle) * ringRadius
                        const y = centerY + Math.sin(rotatedAngle) * ringRadius * Math.cos(ringTilt)
                        if (angle === 0) {
                            ctx.moveTo(x, y)
                        } else {
                            ctx.lineTo(x, y)
                        }
                    }
                    ctx.closePath()
                    ctx.stroke()
                    // Add orbital particles
                    if (i % 3 === 0) {
                        const particleCount = 3
                        for (let j = 0; j < particleCount; j++) {
                            const particleAngle = ((Math.PI * 2) / particleCount) * j + time * (1 + i * 0.2)
                            const rotatedParticleAngle = particleAngle + ringRotation
                            const particleX = centerX + Math.cos(rotatedParticleAngle) * ringRadius
                            const particleY = centerY + Math.sin(rotatedParticleAngle) * ringRadius * Math.cos(ringTilt)
                            // Draw particle
                            ctx.beginPath()
                            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
                            ctx.fillStyle = i % 2 === 0 ? "rgba(0, 255, 150, 0.9)" : "rgba(0, 150, 255, 0.9)"
                            ctx.fill()
                            // Draw particle trail
                            ctx.beginPath()
                            const trailLength = Math.PI / 8
                            for (let t = 0; t < trailLength; t += 0.01) {
                                const trailAngle = rotatedParticleAngle - t
                                const trailX = centerX + Math.cos(trailAngle) * ringRadius
                                const trailY = centerY + Math.sin(trailAngle) * ringRadius * Math.cos(ringTilt)
                                if (t === 0) {
                                    ctx.moveTo(trailX, trailY)
                                } else {
                                    ctx.lineTo(trailX, trailY)
                                }
                            }
                            const trailGradient = ctx.createLinearGradient(
                                particleX,
                                particleY,
                                centerX + Math.cos(rotatedParticleAngle - trailLength) * ringRadius,
                                centerY + Math.sin(rotatedParticleAngle - trailLength) * ringRadius * Math.cos(ringTilt),
                            )
                            trailGradient.addColorStop(0, i % 2 === 0 ? "rgba(0, 255, 150, 0.7)" : "rgba(0, 150, 255, 0.7)")
                            trailGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
                            ctx.strokeStyle = trailGradient
                            ctx.lineWidth = 1.5
                            ctx.stroke()
                        }
                    }
                }
                // Draw central element
                ctx.beginPath()
                ctx.arc(centerX, centerY, 6, 0, Math.PI * 2)
                const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 6)
                coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
                coreGradient.addColorStop(1, "rgba(0, 200, 255, 0.7)")
                ctx.fillStyle = coreGradient
                ctx.fill()
                // Draw central glow
                ctx.beginPath()
                ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
                const glowGradient = ctx.createRadialGradient(centerX, centerY, 6, centerX, centerY, 15)
                glowGradient.addColorStop(0, "rgba(0, 200, 255, 0.5)")
                glowGradient.addColorStop(1, "rgba(0, 200, 255, 0)")
                ctx.fillStyle = glowGradient
                ctx.fill()
                // Draw axis lines
                ctx.beginPath()
                ctx.moveTo(centerX - 20, centerY)
                ctx.lineTo(centerX + 20, centerY)
                ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
                ctx.lineWidth = 0.5
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(centerX, centerY - 20)
                ctx.lineTo(centerX, centerY + 20)
                ctx.stroke()
                requestAnimationFrame(drawVisualization)
            }
            drawVisualization()
        }
        initVisualizationCanvas()
        return () => {
            window.removeEventListener("resize", updateSize)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-700 via-black to-emerald-900 relative overflow-hidden">
            <ReferralTracker/>
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
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight font-mono relative">
                            <span className="text-white glitch-heading">CRYPTO MULTIVERSE OF</span>
                            <br />
                            <span className="text-[#00FF41] glitch-heading">COMMUNITY</span>
                        </h1>
                        <div className="mt-16 max-w-4xl mx-auto">
                            <div className="bg-water-200 bg-opacity-[0.07] rounded-lg overflow-hidden border border-[#00FF41]/20 relative">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 255, 150, 0.1) 1px, transparent 1px)", backgroundSize: "20px 20px",}} />
                                <div className="flex flex-col md:flex-row relative z-10">
                                    <div className="w-full md:w-1/4 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#00FF41]/10">
                                        <div className="flex items-center mb-4">
                                            <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
                                            <div className="h-px flex-grow ml-2 bg-gradient-to-r from-[#00FF41] to-transparent" />
                                        </div>
                                        <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-wider">INFINITE GAME</h3>
                                        <div className="h-px w-12 bg-[#00FF41]/30 mb-4" />
                                        <p className="text-white/60 font-mono text-xs leading-relaxed text-left">Unlock limitless potential with modular architecture and extensible protocols.</p>
                                    </div>
                                    <div className="w-full md:w-2/4 flex items-center justify-center py-8 relative overflow-hidden">
                                        <canvas ref={visualizationCanvasRef} className="w-full h-[300px]"></canvas>
                                    </div>
                                    <div className="w-full md:w-1/4 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#00FF41]/10">
                                        <div className="flex items-center mb-4 justify-end">
                                            <div className="h-px flex-grow mr-2 bg-gradient-to-l from-[#0096FF] to-transparent" />
                                            <div className="w-3 h-3 rounded-full bg-[#0096FF]" />
                                        </div>
                                        <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-wider text-right">DEEP LIQUIDITY</h3>
                                        <div className="h-px w-12 bg-[#0096FF]/30 mb-4 ml-auto" />
                                        <p className="text-white/60 font-mono text-xs leading-relaxed text-right">Amplify market depth with dynamic gamified incentives, and frictionless execution at any scale.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8" />
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><Globe className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-xl mb-4">PERMISSIONLESS</h3>
                            <p className="text-white/70 font-mono text-sm">Unlock infinite possibilities. Designed with modularity at its core, allowing developers to customize and extend functionality effortlessly.</p>
                        </div>
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><Palette className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-xl mb-4">FOCUS ON CREATIVITY</h3>
                            <p className="text-white/70 font-mono text-sm">Turn ideas into reality. Developers build the tools - communities decide how to use them. Build, integrate, and expand what’s possible — your vision, your rules.</p>
                        </div>
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><HeartHandshake className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-xl mb-4">POWERED BY COMMUNITY</h3>
                            <p className="text-white/70 font-mono text-sm">Leverage the power of our community-led protocol — where active participation is rewarded — just limitless, shared advancement.</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mb-24 px-4 py-16 text-center">
                    <div className="text-[#00FF41] text-sm font-mono mb-4">BUILT BY CONTRIBUTORS WITH</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-mono">BACKGROUNDS FROM:</h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <div className="w-32 h-12 bg-black/30 border border-[#00FF41]/30 flex items-center justify-center hover:border-[#00FF41]/70 transition-all">
                            <span className="text-white/70 font-mono text-sm">CommuDAO</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
