"use client"

import React from 'react'
import { Axe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function WoodChoppingGame({ nftIdMiner, nftImgMiner, setErrMsg, woodBalance }:  {
    nftIdMiner: bigint | undefined
    nftImgMiner: string | undefined
    setErrMsg: React.Dispatch<React.SetStateAction<String | null>>
    woodBalance: string
}) {
    const [isChopping, setIsChopping] = React.useState(false)
    const [choppingProgress, setChoppingProgress] = React.useState(0)
    const [woodLog, setWoodLog] = React.useState({ health: 100, maxHealth: 100 })
    const [totalWoodChopped, setTotalWoodChopped] = React.useState(0)
    const [choppingPower, setChoppingPower] = React.useState(5)
    const [miningTimeAccumulated, setMiningTimeAccumulated] = React.useState(0)
    const [showAxeAnimation, setShowAxeAnimation] = React.useState(false)
    const [axePosition, setAxePosition] = React.useState({ x: 0, y: 0 })
    const [gameStats, setGameStats] = React.useState({
        clickCount: 0,
        logsChopped: 0,
        timeSpent: 0,
        efficiency: 0,
    })
    const gameAreaRef = React.useRef<HTMLDivElement>(null)
    const timerRef = React.useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = React.useRef<number>(0)
    // Sound effects
    const chopSoundRef = React.useRef<HTMLAudioElement | null>(null)
    const completeSoundRef = React.useRef<HTMLAudioElement | null>(null)

    React.useEffect(() => {
        // Initialize sound effects
        chopSoundRef.current = new Audio("/chop-sound.mp3")
        completeSoundRef.current = new Audio("/complete-sound.mp3")
        // Use placeholder sounds if the actual files don't exist
        chopSoundRef.current.onerror = () => {
            console.log("Chop sound not found, using fallback")
            chopSoundRef.current = null
        }
        completeSoundRef.current.onerror = () => {
            console.log("Complete sound not found, using fallback")
            completeSoundRef.current = null
        }
        // Calculate chopping power based on NFT ID
        if (nftIdMiner) {
            // Higher NFT IDs give slightly more chopping power (1-10 range)
            const bonusPower = Number(nftIdMiner) % 10000
            setChoppingPower(5 + Math.min(5, bonusPower))
        }
        return () => {
            if (timerRef.current) { clearInterval(timerRef.current) }
        }
    }, [nftIdMiner])

    const startChopping = () => {
        if (!nftIdMiner) {
            setErrMsg("Please select a miner first")
            return
        }
        setIsChopping(true)
        startTimeRef.current = Date.now()
        // Start timer to track chopping session
        timerRef.current = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000)
            setMiningTimeAccumulated(elapsedSeconds)
            setGameStats(prev => ({
                ...prev,
                timeSpent: prev.timeSpent + 1,
                efficiency: prev.logsChopped > 0 ? Number((prev.clickCount / prev.logsChopped).toFixed(1)) : 0,
            }))
        }, 1000)
    }

    const stopChopping = async () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
        setIsChopping(false)
        if (miningTimeAccumulated > 0 && totalWoodChopped > 0) {
            const woodReward = Math.floor(miningTimeAccumulated * (totalWoodChopped / 100))
            alert('Your woodPoint: ' + woodReward)
            setMiningTimeAccumulated(0)
            setTotalWoodChopped(0)
        }
    }

    const chopWood = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isChopping || !gameAreaRef.current) return
        if (chopSoundRef.current) {
            chopSoundRef.current.currentTime = 0
            chopSoundRef.current.play().catch((e) => console.log("Error playing sound:", e))
        }
        // Get click position for axe animation
        const rect = gameAreaRef.current.getBoundingClientRect()
        setAxePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
        setShowAxeAnimation(true)
        setTimeout(() => setShowAxeAnimation(false), 300)
        const newHealth = Math.max(0, woodLog.health - choppingPower)
        setWoodLog({ ...woodLog, health: newHealth })
        setGameStats(prev => ({ ...prev, clickCount: prev.clickCount + 1 }))
        // Check if log is completely chopped
        if (newHealth === 0) {
            if (completeSoundRef.current) {
                completeSoundRef.current.currentTime = 0
                completeSoundRef.current.play().catch((e) => console.log("Error playing sound:", e))
            }
            setTotalWoodChopped(prev => prev + 1)
            // Reset log with increased max health for progression
            const newMaxHealth = woodLog.maxHealth + 10
            setWoodLog({ health: newMaxHealth, maxHealth: newMaxHealth })
            setGameStats(prev => ({ ...prev, logsChopped: prev.logsChopped + 1 }))
        }
        setChoppingProgress(((woodLog.maxHealth - newHealth) / woodLog.maxHealth) * 100)
    }

    return (
        <div className="w-full h-[95vh] rounded-lg overflow-hidden flex flex-col items-center justify-start bg-neutral-900 text-xs xl:text-sm">
            <div className="w-full p-4 bg-black/80 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">Miner ID:</span>
                    <span className="text-white">{nftIdMiner ? String(nftIdMiner) : "None"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">$WOOD Balance:</span>
                    <span className="text-white">{Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(Number(woodBalance))}</span>
                    <img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={20} width={20} />
                </div>
            </div>
            {/* Game area */}
            <div
                ref={gameAreaRef}
                className="relative w-full flex-1 flex flex-col items-center justify-center bg-[url('https://gateway.commudao.xyz/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')] bg-cover"
                onClick={chopWood}
                style={{ cursor: isChopping ? "pointer" : "default" }}
            >
                {/* Axe animation */}
                {showAxeAnimation && (
                    <div
                        className="absolute z-10 animate-chop gap-2 flex flex-row"
                        style={{
                            left: `${axePosition.x - 20}px`,
                            top: `${axePosition.y - 20}px`,
                        }}
                    >
                        <img alt="" src={nftImgMiner} height={100} width={100} />
                        <Axe size={100} className="text-gray-200" />
                    </div>
                )}
                {/* Wood log */}
                <div className="relative flex flex-col items-center mb-8">
                    <div className="w-40 h-40 bg-[url('https://gateway.commudao.xyz/ipfs/bafkreihjwznuhsggekpqltdgkxzohd7atgxbz3ebvekhzgdyhdszpnzwwm')] bg-contain bg-center bg-no-repeat">
                        {showAxeAnimation && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="wood-chip"><img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={50} width={50}/></div>
                                <div className="wood-chip"><img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={50} width={50}/></div>
                                <div className="wood-chip"><img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={50} width={50}/></div>
                            </div>
                        )}
                    </div>
                    {/* Progress bar */}
                    <div className="w-48 mt-4"><Progress value={choppingProgress} className="h-3" /></div>
                </div>
                {/* Game instructions */}
                {!isChopping ? 
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <div className="text-center p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Wood Chopping Game</h2>
                            <p className="mb-6">Click on the forrest to chop it!</p>
                            <Button
                                onClick={e => {
                                    e.stopPropagation()
                                    startChopping()
                                }}
                                className="cursor-pointer"
                                disabled={!nftIdMiner}
                            >
                                Start Chopping
                            </Button>
                        </div>
                    </div> :
                    <Button
                        variant="destructive"
                        onClick={e => {
                            e.stopPropagation()
                            stopChopping()
                        }}
                        className="absolute bottom-8 cursor-pointer"
                    >
                        Stop & Claim Rewards
                    </Button>
                }
            </div>
            {/* Game stats */}
            <div className="w-full p-4 bg-black/80 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                    <p className="text-gray-400">Time Spent</p>
                    <p className="text-xl font-bold">{miningTimeAccumulated}s</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">Logs Chopped</p>
                    <p className="text-xl font-bold">{gameStats.logsChopped}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">Total Clicks</p>
                    <p className="text-xl font-bold">{gameStats.clickCount}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">Clicks Per Log</p>
                    <p className="text-xl font-bold">{gameStats.efficiency}</p>
                </div>
            </div>
        </div>
    )
}
