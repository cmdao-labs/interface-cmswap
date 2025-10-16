'use client'
import React from "react"
import { Globe, Palette, HeartHandshake } from "lucide-react"
import ReferralTracker from '@/components/cmswap/Refferal'

export default function Page() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const visualizationCanvasRef = React.useRef<HTMLCanvasElement>(null)
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
        const initVisualizationCanvas = () => {
            const canvas = visualizationCanvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext("2d")
            if (!ctx) return
            canvas.width = 500
            canvas.height = 300
            let time = 0
            const speed = 0.001
            const drawVisualization = () => {
                time += speed
                ctx.fillStyle = "rgba(0, 0, 0, 0)"
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                const centerX = canvas.width / 2
                const centerY = canvas.height / 2
                const ringCount = 15
                const maxRadius = 120
                for (let i = 0; i < ringCount; i++) {
                    const ringRadius = maxRadius * (0.3 + (i / ringCount) * 0.7)
                    const ringTilt = Math.PI / 4
                    const ringRotation = time * (0.2 + i * 0.05)
                    const ringOpacity = 0.7 - (i / ringCount) * 0.5
                    ctx.beginPath()
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
                    for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
                        const rotatedAngle = angle + ringRotation
                        const x = centerX + Math.cos(rotatedAngle) * ringRadius
                        const y = centerY + Math.sin(rotatedAngle) * ringRadius * Math.cos(ringTilt)
                        if (angle === 0) {ctx.moveTo(x, y)} else {ctx.lineTo(x, y)}
                    }
                    ctx.closePath()
                    ctx.stroke()
                    if (i % 3 === 0) {
                        const particleCount = 3
                        for (let j = 0; j < particleCount; j++) {
                            const particleAngle = ((Math.PI * 2) / particleCount) * j + time * (1 + i * 0.2)
                            const rotatedParticleAngle = particleAngle + ringRotation
                            const particleX = centerX + Math.cos(rotatedParticleAngle) * ringRadius
                            const particleY = centerY + Math.sin(rotatedParticleAngle) * ringRadius * Math.cos(ringTilt)
                            ctx.beginPath()
                            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
                            ctx.fillStyle = i % 2 === 0 ? "rgba(0, 255, 150, 0.9)" : "rgba(0, 150, 255, 0.9)"
                            ctx.fill()
                            ctx.beginPath()
                            const trailLength = Math.PI / 8
                            for (let t = 0; t < trailLength; t += 0.01) {
                                const trailAngle = rotatedParticleAngle - t
                                const trailX = centerX + Math.cos(trailAngle) * ringRadius
                                const trailY = centerY + Math.sin(trailAngle) * ringRadius * Math.cos(ringTilt)
                                if (t === 0) {ctx.moveTo(trailX, trailY)} else {ctx.lineTo(trailX, trailY)}
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
                ctx.beginPath()
                ctx.arc(centerX, centerY, 6, 0, Math.PI * 2)
                const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 6)
                coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
                coreGradient.addColorStop(1, "rgba(0, 200, 255, 0.7)")
                ctx.fillStyle = coreGradient
                ctx.fill()
                ctx.beginPath()
                ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
                const glowGradient = ctx.createRadialGradient(centerX, centerY, 6, centerX, centerY, 15)
                glowGradient.addColorStop(0, "rgba(0, 200, 255, 0.5)")
                glowGradient.addColorStop(1, "rgba(0, 200, 255, 0)")
                ctx.fillStyle = glowGradient
                ctx.fill()
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
            <main className="relative z-10 mt-[100px]">
                <div className="container mx-auto px-4 py-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="mb-18 mx-auto text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-mono relative flex flex-col items-start sm:items-center text-left sm:text-center">
                            <span className="text-white glitch-heading">Trade Anything, Earn Anywhere</span>
                            <span className="text-[#00FF41]">Across the Crypto Multiverse</span>
                        </h1>
                        <div className="mx-auto max-w-4xl mx-auto">
                            <div className="bg-water-200 rounded-lg overflow-hidden border border-[#00FF41]/20 relative">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 255, 150, 0.1) 1px, transparent 1px)", backgroundSize: "20px 20px",}} />
                                <div className="flex flex-col md:flex-row relative z-10">
                                    <div className="w-full md:w-1/4 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#00FF41]/10">
                                        <div className="flex items-center mb-4">
                                            <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
                                            <div className="h-px flex-grow ml-2 bg-gradient-to-r from-[#00FF41] to-transparent" />
                                        </div>
                                        <h3 className="text-white font-mono text-lg mb-2 tracking-wider text-left">Infinite Game</h3>
                                        <div className="h-px w-12 bg-[#00FF41]/30 mb-4" />
                                        <p className="text-white/60 font-mono text-xs leading-relaxed text-left">Composable finance, endless play with DeFi legos.</p>
                                    </div>
                                    <div className="w-full md:w-2/4 flex items-center justify-center md:py-8 relative overflow-hidden">
                                        <canvas ref={visualizationCanvasRef} className="w-full h-[150px] md:h-[300px]"></canvas>
                                    </div>
                                    <div className="w-full md:w-1/4 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#00FF41]/10">
                                        <div className="flex items-center mb-4 justify-end">
                                            <div className="h-px flex-grow mr-2 bg-gradient-to-l from-[#0096FF] to-transparent" />
                                            <div className="w-3 h-3 rounded-full bg-[#0096FF]" />
                                        </div>
                                        <h3 className="text-white font-mono text-lg mb-2 tracking-wider text-right">Deep Liquidity</h3>
                                        <div className="h-px w-12 bg-[#0096FF]/30 mb-4 ml-auto" />
                                        <p className="text-white/60 font-mono text-xs leading-relaxed text-right">Amplify market depth through community-driven incentives.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><Globe className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-xl mb-4">Permissionless</h3>
                            <p className="text-white/70 font-mono text-xs">Explore infinite possibilities. Built for modularity, open for anyone to extend.</p>
                        </div>
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><Palette className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-xl mb-4">Design Your Strategy</h3>
                            <p className="text-white/70 font-mono text-xs">Developers craft the tools, communities shape the flow.</p>
                        </div>
                        <div className="bg-black/30 border border-[#00FF41]/30 p-6 hover:border-[#00FF41]/70 transition-all">
                            <div className="w-12 h-12 border border-[#00FF41]/50 mb-6 flex items-center justify-center"><HeartHandshake className="w-6 h-6 text-[#00FF41]" /></div>
                            <h3 className="text-white font-mono text-xl mb-4">Powered by Community</h3>
                            <p className="text-white/70 font-mono text-xs">Leverage the power of our community-led protocol, where active participation is rewarded.</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mb-4 px-4 py-16 text-center">
                    <div className="text-[#00FF41] text-md md:text-lg font-bold text-white mb-4 font-mono">Built by contributors with backgrounds from:</div>
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
