import { Separator } from "@/components/ui/separator"

export default function Footer() {
    return (
        <footer className='w-full py-6 px-14 flex flex-row justify-between text-gray-500 text-xs text-left fixed z-99'>
            <div>
                <div className="text-slate-300">{'OpenBBQ 0.0.4'}</div>
                <Separator className="my-2 bg-gray-600" />
                <a className='hover:text-white no-underline' href="https://github.com/coshi190/interface-openbbq" target="_blank" rel="noreferrer">Github Interface</a>
                <br />
                <a className='hover:text-white no-underline' href="https://github.com/coshi190/contracts-openbbq" target="_blank" rel="noreferrer">Github Contracts</a>
                <Separator className="my-2 bg-gray-600" />
                <a className='hover:text-white no-underline' href="http://docs.openbbq.xyz/th" target="_blank" rel="noreferrer">Docs</a>
            </div>
            <div>
                <a className='hover:text-white no-underline' href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer">Discord</a>
                <Separator className="my-2 bg-gray-600" />
                <a className='hover:text-white no-underline' href="https://www.facebook.com/commudaostory" target="_blank" rel="noreferrer">Facebook Page</a>
            </div>
        </footer>
  )
}
