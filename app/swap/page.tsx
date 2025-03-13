'use client'
import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Swap from '../components/Swap'
import Liquidity from '../components/Liquidity'
import Positions from '../components/Positions'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<String | null>(null)

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs">
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <Dialog open={errMsg !== null} onClose={() => setErrMsg(null)} className="relative z-999">
                <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-[12px]" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-xl space-y-2 rounded-lg border border-black bg-neutral-900 text-white">
                        <DialogTitle className="font-bold p-6 bg-red-600">ERROR! [beta 0.0.4]</DialogTitle>
                        <Description className="p-6 text-gray-500 overflow-hidden">{errMsg}</Description>
                        <div className='p-6'>
                            <button className='w-2/3 p-3 text-xs rounded-full border border-gray-500 hover:bg-neutral-800 cursor-pointer' onClick={() => setErrMsg(null)}>CLOSE</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <div className="w-full xl:w-1/3 h-[710px] mt-[100px] pt-4 pb-6 px-6 bg-white/5 rounded-3xl text-white card">
                <Tabs defaultValue="swap" className="sticky z-99">
                    <TabsList className="w-full bg-white/5">
                        <TabsTrigger value="swap" className="cursor-pointer">Instant swap</TabsTrigger>
                        <TabsTrigger value="liquidity" className="cursor-pointer">Add liquidity</TabsTrigger>
                        <TabsTrigger value="position" className="cursor-pointer">My position</TabsTrigger>
                    </TabsList>
                    <TabsContent value="swap"><Swap setIsLoading={setIsLoading} setErrMsg={setErrMsg} /></TabsContent>
                    <TabsContent value="liquidity"><Liquidity setIsLoading={setIsLoading} setErrMsg={setErrMsg} /></TabsContent>
                    <TabsContent value="position"><Positions setIsLoading={setIsLoading} setErrMsg={setErrMsg} /></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
