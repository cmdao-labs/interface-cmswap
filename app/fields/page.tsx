import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'

export default function Page() {    
    return (
        <div className='w-full min-h-screen'>
            <div className="w-full h-[320px] pt-[50px] px-14 flex flex-row items-center justify-between bg-white/5">
                <div className="text-[64px] text-white">Fields</div>
                <img src="./fieldlogo.png" width="150" alt="Fields_Logo" />
            </div>
            <div className="w-full mt-14 my-8 px-10 flex flex-row items-start justify-start">
                <div className="w-full xl:w-1/4 h-[450px] rounded-xl overflow-hidden bg-[url('https://gateway.commudao.xyz/ipfs/bafybeicyixoicb7ai6zads6t5k6qpyocoyelfbyoi73nmtobfjlv7fseiq')]">
                    <div className="h-full w-full backdrop-blur-[20px] gap-14 flex flex-col items-center justify-center">
                        <img alt="" src="https://gateway.commudao.xyz/ipfs/bafybeicyixoicb7ai6zads6t5k6qpyocoyelfbyoi73nmtobfjlv7fseiq" height="150" width="150" />
                        <Button variant="outline" className="w-3/4 bg-transparent text-black cursor-pointer"><Link href="/fields/cmdao-valley/undefined" className='gap-3 flex flex-row items-center'><LogInIcon /> Go to cmdao-valley field</Link></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
