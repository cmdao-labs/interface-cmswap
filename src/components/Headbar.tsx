import { useAccount } from 'wagmi'
import type { NavigateFunction } from 'react-router-dom'

export default function Headbar({ 
    callMode, navigate 
}: {
    callMode: (_mode: number) => void,
    navigate: NavigateFunction
}) {
    const { chain } = useAccount()

    return (
        <header className='h-[60px] w-full flex flex-row items-center justify-between fixed backdrop-blur-lg' style={{zIndex: 999}}>
            <div className="pixel gap-6 flex flex-row items-center p-6 text-sm">
                <div className="cursor-pointer" onClick={() => {callMode(0); navigate('/');}}>
                    <img alt="" src="/../favicon.png" height="25" width="25" />
                </div>
                <button className="hover:bg-neutral-800 p-2 rounded-xl" onClick={() => {callMode(1); navigate('/fields');}}>Fields</button>
                <button className="hover:bg-neutral-800 p-2 rounded-xl" onClick={() => {callMode(2); navigate('/swap');}}>Swap</button>
            </div>
            <div className="flex align-center justify-end mr-8 text-sm">
                {/* @ts-expect-error msg */}
                <appkit-button />
            </div>
        </header>
  )
}
