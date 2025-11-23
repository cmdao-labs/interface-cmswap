import Link from "next/link"
import Image from "next/image"
import { Github, FileText } from "lucide-react"
import { FaTelegram } from "react-icons/fa"
import { BsTwitterX, BsDiscord  } from "react-icons/bs"

export default function Footer() {
    return (
        <footer className="relative z-10 bg-black/80">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-row justify-between items-start ml-[20px] md:ml-[0px] md:items-center gap-4">
                    <div className="flex flex-row items-start md:items-center gap-4">
                        <span className="text-xs font-mono">v{process.env.APP_VERSION}</span>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link href="https://docs.cmswap.xyz/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs font-mono flex items-center gap-1">
                            <FileText className="w-4 h-4" /><span>DOCS</span>
                        </Link> 
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link href="https://github.com/cmdao-labs" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs font-mono">
                            <Github className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs font-mono">
                            <BsDiscord className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://x.com/CMswap" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs font-mono">
                            <BsTwitterX className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link  href="https://t.me/CM_swap/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs font-mono">
                            <FaTelegram className="w-4 h-4" />
                        </Link>
                        <div className="h-4 w-px bg-[#32ffa7]/20" />
                        <Link href="https://farcaster.xyz/cmswap" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#32ffa7] text-xs font-mono">
                            <svg width="19" height="19" className="fill-current" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z" />
                                <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" />
                                <path d="M675.556 746.667C663.282 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
