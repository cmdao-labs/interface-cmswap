'use client'
import React from 'react'
import { Copy, Users, Gift, TrendingUp, Zap } from 'lucide-react'
import { useAccount } from "wagmi"


interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
}

interface RefErrorProps {
  chainID: number;
}

export default function RefError({ chainID }: RefErrorProps) {
  const [theme, setTheme] = React.useState<Theme>({} as Theme)
  const [selectedTheme, setSelectedTheme] = React.useState(96)

  // Theme configuration based on chainID
  const themes: Record<number, Theme> = {
    96: {
      primary: 'from-green-400 to-emerald-400',
      secondary: 'from-green-600 to-emerald-600',
      accent: 'green-400',
      glow: 'shadow-green-400/50',
      border: 'border-green-400/30',
      text: 'text-green-300'
    },
    8899: {
      primary: 'from-blue-400 to-cyan-400',
      secondary: 'from-blue-600 to-cyan-600',
      accent: 'blue-400',
      glow: 'shadow-blue-400/50',
      border: 'border-blue-400/30',
      text: 'text-blue-300'
    },
    56: {
      primary: 'from-yellow-400 to-amber-400',
      secondary: 'from-yellow-600 to-amber-600',
      accent: 'yellow-400',
      glow: 'shadow-yellow-400/50',
      border: 'border-yellow-400/30',
      text: 'text-yellow-300'
    },
    3501: {
      primary: 'from-red-400 to-rose-400',
      secondary: 'from-red-600 to-rose-600',
      accent: 'red-400',
      glow: 'shadow-red-400/50',
      border: 'border-red-400/30',
      text: 'text-red-300'
    },
    10143: {
      primary: 'from-purple-400 to-violet-400',
      secondary: 'from-purple-600 to-violet-600',
      accent: 'purple-400',
      glow: 'shadow-purple-400/50',
      border: 'border-purple-400/30',
      text: 'text-purple-300'
    }
  }

  const getThemeColors = (chainID: number | undefined): Theme => {
    return themes[chainID as number] || themes[96]
  }

  // Update theme when chainID changes
  React.useEffect(() => {
    if (chainID) {
      setTheme(getThemeColors(chainID))
      setSelectedTheme(chainID)
      console.log('Chain ID:', chainID)
    }
  }, [chainID])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
<div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
  {/* Background Effects */}
  <div className="fixed inset-0 opacity-30">
    <div className={`absolute top-20 left-20 w-64 h-64 bg-gradient-to-r ${theme.primary} rounded-full blur-3xl animate-pulse`}></div>
    <div className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r ${theme.secondary} rounded-full blur-3xl animate-pulse delay-1000`}></div>
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r ${theme.primary} rounded-full blur-2xl animate-bounce`}></div>
  </div>

  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-5xl md:text-7xl font-bold mb-4">Stay Tuned !!</h1>
    <p className="text-xl md:text-2xl text-gray-300">Referral System Not Supported for Chain ID: {chainID}</p>
  </div>
</div>
  )
}