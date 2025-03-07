import React from "react"

export default function Home() {
    const divRef = React.useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = React.useState(false)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = React.useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return
            const div = divRef.current
            const rect = div.getBoundingClientRect()
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    const handleFocus = () => {
        setIsFocused(true)
        setOpacity(1)
    }
    const handleBlur = () => {
        setIsFocused(false)
        setOpacity(0)
    }
    const handleMouseEnter = () => {setOpacity(1)}
    const handleMouseLeave = () => {setOpacity(0)}
    
    return (
        <div 
            className="pixel h-[83vh] w-full flex flex-row items-end text-left bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:99px_99px]"
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300" style={{opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`}} />
            <div className='w-full m-14 gap-6 flex flex-col items-start'>
                <div className="text-3xl xl:text-5xl gap-5 flex flex-wrap items-center text-gray-500">
                    <span>Crypto multiverse of </span>
                    <span className="slider">
                        <span className="slider__word">Communities</span>
                        <span className="slider__word">Creativity</span>
                        <span className="slider__word">Permissionless</span>
                    </span>
                </div>
                <div className="w-3/4 xl:w-1/4 py-4 px-16 flex flex-col items-center gap-2 rounded-2xl border-none bg-white/5">
                    <div className="text-5xl">2</div>
                    <div className="text-sm text-gray-300">Game Hooks</div>
                </div>
                <div className='px-2 text-[18px]'>Developed by second labs</div>
            </div>
        </div>
    )
}
