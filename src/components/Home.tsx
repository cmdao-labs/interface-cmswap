export default function Home() {
    window.scrollTo(0, 0)
    
    return (
        <div className="pixel h-[100vh] w-full flex flex-row items-end text-left bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:99px_99px]">
            <div className='w-full m-14 gap-6 flex flex-col items-start'>
                <div className="text-5xl gap-2 flex items-center text-gray-500">
                    <span>Crypto multiverse of </span>
                    <span className="slider">
                        <span className="slider__word">Communities</span>
                        <span className="slider__word">Future</span>
                        <span className="slider__word">Permissionless</span>
                    </span>
                </div>
                <div className="w-full xl:w-1/4 py-4 px-16 flex flex-col items-center gap-2 rounded-2xl border-none bg-white/5">
                    <div className="text-5xl">2</div>
                    <div className="text-sm text-gray-300">Game Hooks</div>
                </div>
                <div className='px-2 text-[18px]'>Developed by second labs</div>
            </div>
        </div>
    )
}
