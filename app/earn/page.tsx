'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import ErrorModal from '@/components/cmswap/error-modal'
import Staking25925 from '@/components/cmswap/Staking25925'
import StakingError from '@/components/cmswap/StakingError'
import ReferralTracker from '@/components/cmswap/Refferal'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))] overflow-x-hidden">
            <ReferralTracker />
            {isLoading && <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full backdrop-blur-[12px] z-[999]" />}
            <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />
            <div className="w-full max-w-full  flex flex-col items-center justify-start p-4">
                {/* {chainId === 96 ? (<Ref96 />) : (<Ref25925/>)} */}
                {chainId === 25925 ? <Staking25925 setIsLoading={setIsLoading} setErrMsg={setErrMsg}/> : <StakingError chainID={Number(chainId)} />}
                {/* {chainId === 96 ? <Ref96 /> : <RefError chainID={Number(chainId)} />} */}
            </div>
        </div>
    )
}
