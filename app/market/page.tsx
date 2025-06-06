'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import ErrorModal from '@/app/components/error-modal'

import Market96 from '../components/Market96'
import ReferralTracker from '../components/Refferal'


export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))]">
            <ReferralTracker/>
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
                <div className="px-4">
                   {chainId === 96 || chainId === undefined && <Market96 />}
                </div>
        </div>
    )
}
