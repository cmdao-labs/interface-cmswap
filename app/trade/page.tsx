'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import ErrorModal from '@/app/components/error-modal'

import Market96 from '../components/Market96'
import Market25925 from '../components/Market25925'
import ReferralTracker from '../components/Refferal'


export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-gradient-to-br from-slate-700 via-black to-emerald-900">
            <ReferralTracker/>
            {isLoading && <div className="w-full h-full fixed backdrop-blur-[12px] z-999" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            {chainId === 96 ?
            (<Market96 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />)
            :
            (<Market25925 setIsLoading={setIsLoading} setErrMsg={setErrMsg} />)

        }
        </div>
    )
}
