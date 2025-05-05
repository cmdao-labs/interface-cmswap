import Link from "next/link"
import { Github, FileText, MessageSquare, X } from "lucide-react"

export default function Footer() {
    return (
        <footer className="relative z-10 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono">CMswap_v0.0.10</span>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link href="https://github.com/coshi190/contracts-openbbq" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <Github className="w-4 h-4" /><span>CONTRACTS</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://github.com/coshi190/interface-openbbq" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <Github className="w-4 h-4" /><span>INTERFACE</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="http://docs.openbbq.xyz/th" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 hidden md:flex font-mono">
                            <FileText className="w-4 h-4" /><span>DOCS</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <MessageSquare className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://x.com/CMswap" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <X className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
