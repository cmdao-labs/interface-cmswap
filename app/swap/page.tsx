'use client'
import React from 'react'
import { type WriteContractErrorType } from '@wagmi/core'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from "@/components/ui/card"
import ErrorModal from '@/app/components/error-modal'
import Swap from '../components/Swap'
import Liquidity from '../components/Liquidity'
import Positions from '../components/Positions'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))]">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <div className="w-full max-w-xl mx-auto mt-[100px] mb-8">
                <div className="border border-[#00ff9d]/30 rounded px-4 py-2 text-center">
                    <span className="text-gray-500 font-mono text-sm">🛡️ SWAP WITH SAME SECURITY LEVEL OF UNISWAP V3</span>
                </div>
            </div>
            <Card className="w-full max-w-xl mx-auto bg-black/80 border border-[#00ff9d]/20 rounded-lg overflow-hidden py-2 mb-8">
                <div className="px-4">
                    <Tabs defaultValue="swap" className="w-full sticky">
                        <TabsList className="w-full grid grid-cols-3 bg-[#0a0b1e] rounded-md p-1 mb-4">
                            <TabsTrigger value="swap" className="font-mono text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Instant swap</TabsTrigger>
                            <TabsTrigger value="liquidity" className="font-mono text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Liquidity</TabsTrigger>
                            <TabsTrigger value="position" className="font-mono text-sm data-[state=active]:bg-[#162638] data-[state=active]:text-[#00ff9d] rounded cursor-pointer">Positions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="swap"><Swap setIsLoading={setIsLoading} setErrMsg={setErrMsg} /></TabsContent>
                        <TabsContent value="liquidity"><Liquidity setIsLoading={setIsLoading} setErrMsg={setErrMsg} /></TabsContent>
                        <TabsContent value="position"><Positions setIsLoading={setIsLoading} setErrMsg={setErrMsg} /></TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}
