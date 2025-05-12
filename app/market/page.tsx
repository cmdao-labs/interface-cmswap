'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from "@/components/ui/card"
import ErrorModal from '@/app/components/error-modal'
import Swap8899 from '../components/Swap8899'
import Swap96 from '../components/Swap96'
import Liquidity8899 from '../components/Liquidity8899'
import Liquidity96 from '../components/Liquidity96'
import Positions8899 from '../components/Positions8899'
import Positions96 from '../components/Positions96'
import Market96 from '../components/Market96'
export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))]">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
                <div className="px-4">
                   <Market96 setIsLoading={setIsLoading} setErrMsg={setErrMsg}/>
                </div>
        </div>
    )
}
