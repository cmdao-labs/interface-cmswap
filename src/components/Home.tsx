export default function Home() {
    window.scrollTo(0, 0)
    
    return (
        <div className="welcome pixel h-[100vh] w-full flex flex-row items-end text-left">
            <div className='w-full m-6 gap-6 flex flex-col items-start'>
                <div className="text-4xl">Introducing Fields V2: game hooks</div>
                <div className="w-full xl:w-1/5 py-4 px-16 flex flex-col items-center gap-2 rounded-2xl border-none" style={{background: "hsla(0,0%,100%,.05)"}}>
                    <div className="text-5xl" style={{backgroundImage: "linear-gradient(270deg, #ff0420, #d9029d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>1</div>
                    <div className="text-sm text-gray-300">Hooks on Fields V2</div>
                </div>
                <div className='typed-out px-2 text-[18px]'>Developed by CMDAO Second Labs</div>
            </div>
        </div>
    )
}
