'use client'
import React from 'react'
import { Axe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface GameStats {
    totalWoodChopped: number
    totalTimeSpent: number
    clickCount: number
    logsChopped: number
    efficiency: number
    lastPlayed: number
    highestCombo: number
    woodScore: number
}

export default function WoodChoppingGame({ nftIdMiner, nftImgMiner, woodBalance }:  {
    nftIdMiner: bigint | undefined
    nftImgMiner: string | undefined
    woodBalance: string
}) {
    const [isChopping, setIsChopping] = React.useState(false)
    const [choppingProgress, setChoppingProgress] = React.useState(0)
    const [woodLog, setWoodLog] = React.useState({ health: 100, maxHealth: 100 })
    const [choppingPower, setChoppingPower] = React.useState(5)
    const [miningTimeAccumulated, setMiningTimeAccumulated] = React.useState(0)
    const [showAxeAnimation, setShowAxeAnimation] = React.useState(false)
    const [axePosition, setAxePosition] = React.useState({ x: 0, y: 0 })
    const [combo, setCombo] = React.useState(0)
    const [lastClickTime, setLastClickTime] = React.useState(0)
    const [powerAttackValue, setPowerAttackValue] = React.useState(0)
    const [localStorageAvailable, setLocalStorageAvailable] = React.useState(true)
    const [gameStats, setGameStats] = React.useState<GameStats>({
        totalWoodChopped: 0,
        totalTimeSpent: 0,
        clickCount: 0,
        logsChopped: 0,
        efficiency: 0,
        lastPlayed: Date.now(),
        highestCombo: 0,
        woodScore: 0,
    })  
    const gameAreaRef = React.useRef<HTMLDivElement>(null)
    const timerRef = React.useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = React.useRef<number>(0)    
    const chopSoundRef = React.useRef<HTMLAudioElement | null>(null)
    const completeSoundRef = React.useRef<HTMLAudioElement | null>(null)

    // Check if localStorage is available
    React.useEffect(() => {
        try {
            const testKey = "__test_storage__"
            localStorage.setItem(testKey, testKey)
            localStorage.removeItem(testKey)
            setLocalStorageAvailable(true)
        } catch (e) {
            console.warn("localStorage is not available:", e)
            setLocalStorageAvailable(false)
        }
    }, [])
      
    // Load saved game stats from localStorage
    React.useEffect(() => {
        if (localStorageAvailable) {
            try {
                const savedStats = localStorage.getItem("woodChoppingGameStats")
                if (savedStats) {
                    const parsedStats = JSON.parse(savedStats)
                    // If woodScore doesn't exist in saved stats, calculate it
                    if (!parsedStats.woodScore && nftIdMiner) {
                        parsedStats.woodScore = calculateWoodScore(nftIdMiner, parsedStats.totalTimeSpent, parsedStats.highestCombo, parsedStats.totalWoodChopped)
                    }
                    setGameStats(parsedStats)
                } else if (nftIdMiner) {
                    // Initialize with woodScore if we have an NFT ID
                    setGameStats(prev => ({
                        ...prev,
                        woodScore: calculateWoodScore(nftIdMiner, prev.totalTimeSpent, prev.highestCombo, prev.totalWoodChopped),
                    }))
                }
            } catch (e) {
                console.error("Error loading game stats:", e)
            }
        }
        // Initialize sound effects
        chopSoundRef.current = new Audio("/chop-sound.mp3")
        completeSoundRef.current = new Audio("/complete-sound.mp3")
        chopSoundRef.current.onerror = () => {
            console.log("Chop sound not found, using fallback")
            chopSoundRef.current = null
        }
        completeSoundRef.current.onerror = () => {
            console.log("Complete sound not found, using fallback")
            completeSoundRef.current = null
        }
        if (nftIdMiner) {
            const cmpow = (Number(nftIdMiner) % 10000)
            setChoppingPower(Math.max(5, cmpow))
        }

        return () => {
            if (timerRef.current) { clearInterval(timerRef.current) }
            // Save game stats when component unmounts
            saveGameStats()
        }
    }, [nftIdMiner, localStorageAvailable])

    const saveGameStats = () => {
        if (!localStorageAvailable) return
        try {
            const updatedStats = {
                ...gameStats,
                lastPlayed: Date.now(),
                woodScore: nftIdMiner ? calculateWoodScore(nftIdMiner, gameStats.totalTimeSpent, gameStats.highestCombo, gameStats.totalWoodChopped) : gameStats.woodScore
            }
            localStorage.setItem("woodChoppingGameStats", JSON.stringify(updatedStats))
            setGameStats(updatedStats)
        } catch (e) {
            console.error("Error saving game stats:", e)
            setLocalStorageAvailable(false)
        }
    }

    const startChopping = () => {
        if (!nftIdMiner) {
            alert("Please select a miner first")
            return
        }
        setIsChopping(true)
        startTimeRef.current = Date.now()
        // Start timer to track chopping session
        timerRef.current = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000)
            setMiningTimeAccumulated(elapsedSeconds)
            // Update stats
            setGameStats((prev) => {
                const updated = {
                    ...prev,
                    totalTimeSpent: prev.totalTimeSpent + 1,
                    efficiency: prev.logsChopped > 0 ? Math.round((prev.clickCount / prev.logsChopped) * 10) / 10 : 0,
                    woodScore: nftIdMiner ? calculateWoodScore(nftIdMiner, prev.totalTimeSpent + 1, prev.highestCombo, prev.totalWoodChopped) : prev.woodScore
                }
                // Save to localStorage every 10 seconds
                if (localStorageAvailable && elapsedSeconds % 10 === 0) {
                    try {
                        localStorage.setItem("woodChoppingGameStats", JSON.stringify(updated))
                    } catch (e) {
                        console.error("Error saving game stats:", e)
                        setLocalStorageAvailable(false)
                    }
                }
                return updated
            })
        }, 1000)
    }

    const stopChopping = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
        setIsChopping(false)
        // Save final stats
        saveGameStats()
        // Reset session variables but keep accumulated totals
        setMiningTimeAccumulated(0)
        setCombo(0)
        setPowerAttackValue(0)
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
        // Handle combo system
        const now = Date.now()
        if (now - lastClickTime < 1000) {
            // If clicked within 1 second of last click
            setCombo((prev) => prev + 1)
        } else {
            setCombo(1) // Reset combo if too slow
        }
        setLastClickTime(now)
        const comboPower = Math.min(combo * 0.5, 1000) // Max 1000x bonus from combo
        const effectivePower = choppingPower + comboPower
        const nftMultiplier = nftIdMiner ? (Number(nftIdMiner) % 10000) / 100 : 1
        const newPowerAttackValue = Math.round(nftMultiplier * (combo > 1 ? combo : 1))
        setPowerAttackValue(newPowerAttackValue)
        // Update wood log health
        const newHealth = Math.max(0, woodLog.health - effectivePower)
        setWoodLog({ ...woodLog, health: newHealth })
        setGameStats(prev => {
            const newHighestCombo = Math.max(prev.highestCombo, combo)
            const updated = {
                ...prev,
                clickCount: prev.clickCount + 1,
                highestCombo: newHighestCombo,
                woodScore:
                nftIdMiner && newHighestCombo > prev.highestCombo ? calculateWoodScore(nftIdMiner, prev.totalTimeSpent, newHighestCombo, prev.totalWoodChopped) : prev.woodScore
            }
            return updated
        })
        // Check if log is completely chopped
        if (newHealth === 0) {
            if (completeSoundRef.current) {
                completeSoundRef.current.currentTime = 0
                completeSoundRef.current.play().catch((e) => console.log("Error playing sound:", e))
            }
            // Update total wood chopped in persistent stats
            setGameStats(prev => {
                const updated = {
                    ...prev,
                    totalWoodChopped: prev.totalWoodChopped + 1,
                    logsChopped: prev.logsChopped + 1,
                }
                // Update woodScore when a log is chopped
                if (nftIdMiner) {
                    updated.woodScore = calculateWoodScore(
                        nftIdMiner,
                        prev.totalTimeSpent,
                        prev.highestCombo,
                        prev.totalWoodChopped + 1,
                    ) 
                }
                return updated
            })
            // Reset log with increased max health for progression
            const newMaxHealth = woodLog.maxHealth + 10
            setWoodLog({ health: newMaxHealth, maxHealth: newMaxHealth })
        }
        // Update chopping progress
        setChoppingProgress(((woodLog.maxHealth - newHealth) / woodLog.maxHealth) * 100)
    }

    return (
        <div className="w-full h-[95vh] rounded-lg overflow-hidden flex flex-col items-center justify-start bg-neutral-900 text-xs xl:text-sm">
            <div className="w-full p-4 bg-black/80 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">Miner ID:</span>
                    <span className="text-white">{nftIdMiner ? String(nftIdMiner) : "None"}</span>
                </div>
            </div>
            <div
                ref={gameAreaRef}
                className="relative w-full flex-1 flex flex-col items-center justify-center bg-[url('https://gateway.commudao.xyz/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')] bg-cover"
                onClick={chopWood}
                style={{ cursor: isChopping ? "pointer" : "default" }}
            >
                {showAxeAnimation && 
                    <div
                        className="absolute z-10 animate-chop gap-2 flex flex-row"
                        style={{ left: `${axePosition.x - 20}px`, top: `${axePosition.y - 20}px` }}
                    >
                        <img alt="" src={nftImgMiner} height={100} width={100} />
                        <Axe size={100} className="text-gray-200" />
                    </div>
                }
                <div className="relative flex flex-col items-center mb-8">
                    <div className="w-40 h-40 bg-[url('https://gateway.commudao.xyz/ipfs/bafkreihjwznuhsggekpqltdgkxzohd7atgxbz3ebvekhzgdyhdszpnzwwm')] bg-contain bg-center bg-no-repeat">
                        {showAxeAnimation && 
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="wood-chip"><img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={50} width={50}/></div>
                                <div className="wood-chip"><img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={50} width={50}/></div>
                                <div className="wood-chip"><img alt="" src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height={50} width={50}/></div>
                            </div>
                        }
                    </div>
                    <div className="w-48 mt-4"><Progress value={choppingProgress} className="h-3" /></div>
                    {isChopping && 
                        <div className="mt-2 text-center">
                            <span className="text-gray-300 text-sm">Attack power: </span>
                            <span className={`font-bold ${powerAttackValue > 0 ? "text-yellow-400" : "text-white"}`}>{powerAttackValue > 0 ? `+${powerAttackValue}` : "0"}</span>
                        </div>
                    }
                    {combo > 1 && 
                        <div className="absolute -top-8 right-0 bg-yellow-500 text-black font-bold px-2 py-1 rounded-md animate-pulse">{combo}x Combo!</div>
                    }
                </div>
                {!isChopping ? 
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <div className="text-center p-8 rounded-lg bg-black/100">
                            <h2 className="text-2xl font-bold mb-4">Wood Chopping Game</h2>
                            <p className="mb-6">Click on the wood log to chop it!</p>
                            {!localStorageAvailable && <p className="mb-4 text-yellow-400 text-sm">Warning: Local storage is not available. Your progress won't be saved between sessions.</p>}
                            <Button onClick={e => { e.stopPropagation(); startChopping(); }} className="cursor-pointer" disabled={!nftIdMiner}>Start Chopping</Button>
                        </div>
                    </div> :
                    <Button variant="destructive" onClick={e => { e.stopPropagation(); stopChopping(); }} className="absolute bottom-8 cursor-pointer">Stop Chopping</Button>
                }
            </div>
            {/* Game stats */}
            <div className="w-full p-4 bg-black/80 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center col-span-2 md:col-span-1">
                    <p className="text-emerald-400 font-bold text-2xl">{Intl.NumberFormat("en-US").format(gameStats.woodScore)}</p>
                    <p className="text-gray-400">Wood Score</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{formatTime(gameStats.totalTimeSpent)}</p>
                    <p className="text-gray-400">Total Time</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{gameStats.totalWoodChopped}</p>
                    <p className="text-gray-400">Logs Chopped</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{gameStats.highestCombo}</p>
                    <p className="text-gray-400">Highest Combo</p>
                </div>
            </div>
            {/* Current session stats */}
            {isChopping && 
                <div className="w-full p-2 bg-black/60 text-center">
                    <p className="text-sm">
                        Current Session: {formatTime(miningTimeAccumulated)} | Hash rate: {choppingPower}{" "}
                        {combo > 1 ? `+ ${Math.min(combo * 0.5, 1000).toFixed(1)} (Combo)` : ""}
                    </p>
                </div>
            }
        </div>
    )
}

// Helper function to format time in HH:MM:SS
function formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
        return `${hrs}h ${mins}m ${secs}s`
    } else if (mins > 0) {
        return `${mins}m ${secs}s`
    } else {
        return `${secs}s`
    }
}
// Wood score calculation function
function calculateWoodScore(
    nftId: bigint | undefined,
    totalTime: number,
    highestCombo: number,
    logsChopped: number,
): number {
    if (!nftId) return 0 
    const nftMultiplier = (Number(nftId) % 10000) / 100
    const timeFactor = Math.log10(Math.max(totalTime, 10)) * 10
    const comboFactor = Math.pow(highestCombo, 1.5)
    const logsChoppedFactor = Math.sqrt(logsChopped) * 5
    const score = Math.floor((nftMultiplier + 10) * (timeFactor + comboFactor + logsChoppedFactor))
    return score
}
  