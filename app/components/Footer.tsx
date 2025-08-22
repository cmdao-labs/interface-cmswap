import Link from "next/link"
import { Github, FileText } from "lucide-react"
import { FaTelegram } from "react-icons/fa"
import { BsTwitterX, BsDiscord  } from "react-icons/bs"
import getConfig from 'next/config'

export default function Footer() {
    const { publicRuntimeConfig } = getConfig()

    return (
        <footer className="relative z-10 bg-black/80">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-start ml-[20px] md:ml-[0px] md:items-center gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <span className="text-xs font-mono">v{process.env.APP_VERSION}</span>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://docs.cmswap.xyz/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1  font-mono">
                            <FileText className="w-4 h-4" /><span>DOCS</span>
                        </Link> 
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://github.com/coshi190/contracts-openbbq" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <Github className="w-4 h-4" /><span>CONTRACTS</span>
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20 hidden md:block" />
                        <Link href="https://github.com/coshi190/interface-openbbq" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <Github className="w-4 h-4  " /><span>INTERFACE</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <BsDiscord   className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://x.com/CMswap" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <BsTwitterX className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://t.me/CM_swap/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs flex items-center gap-1 font-mono">
                            <FaTelegram className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
