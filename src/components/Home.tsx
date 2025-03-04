export default function Home() {
    window.scrollTo(0, 0)
    
    return (
        <div className="pixel h-[100vh] w-full flex flex-row items-end text-left bg-[url('../public/home.png')] bg-cover">
            <div className='w-full m-6 gap-6 flex flex-col items-start'>
                <div className="text-5xl p-2 bg-black/70">The Future of Permissionless Multiverse</div>
                <div className="w-full xl:w-1/5 py-4 px-16 flex flex-col items-center gap-2 rounded-2xl border-none bg-black/75">
                    <div className="text-5xl">2</div>
                    <div className="text-sm text-gray-300">Game Hooks</div>
                </div>
                <div className='typed-out px-2 text-[18px] bg-black/70'>Developed by second Labs</div>
            </div>
        </div>
    )
}
