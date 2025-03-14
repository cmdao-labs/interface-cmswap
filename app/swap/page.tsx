'use client'
import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from "@/components/ui/card"
import Swap from '../components/Swap'
import Liquidity from '../components/Liquidity'
import Positions from '../components/Positions'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<String | null>(null)

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))]">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <Dialog open={errMsg !== null} onClose={() => setErrMsg(null)} className="relative z-999">
                <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-[12px]" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-xl space-y-2 rounded-lg border border-black bg-neutral-900 text-white">
                        <DialogTitle className="font-bold p-6 bg-red-600">ERROR! [beta 0.0.5]</DialogTitle>
                        <Description className="p-6 text-gray-500 overflow-hidden">{errMsg}</Description>
                        <div className='p-6'>
                            <button className='w-2/3 p-3 text-xs rounded-full border border-gray-500 hover:bg-neutral-800 cursor-pointer' onClick={() => setErrMsg(null)}>CLOSE</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <div className="w-full max-w-xl mx-auto mt-[100px] mb-8">
                <div className="border border-[#00ff9d]/30 rounded px-4 py-2 text-center">
                    <span className="text-gray-500 font-mono text-sm">🛡️ SWAP WITH SAME SECURITY LEVEL OF UNISWAP V3</span>
                </div>
            </div>
            <Card className="w-full max-w-xl mx-auto bg-black/80 border border-[#00ff9d]/20 rounded-lg overflow-hidden py-2 mb-8">
                <div className="px-4">
                    <Tabs defaultValue="swap" className="w-full sticky z-99">
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
