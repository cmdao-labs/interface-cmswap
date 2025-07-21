'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import ErrorModal from '@/app/components/error-modal'

import LiquidityPool25925 from '../components/LiquidityPool25925'
import LiquidityPool96 from '../components/LiquidityPool96'

export default function Page() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState<WriteContractErrorType | null>(null)
    const { chainId } = useAccount()

    return (
<div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))] overflow-x-hidden">

  {isLoading && (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full backdrop-blur-[12px] z-[999]" />
  )}

  <ErrorModal errorMsg={errMsg} setErrMsg={setErrMsg} />

  <div className="w-full max-w-full">
    {chainId === 96 && <LiquidityPool96 /> }
    {chainId === 25925 && <LiquidityPool25925 />}
    {/* {chainId === 96 ? <Ref96 /> : <RefError chainID={Number(chainId)} />} */}
  </div>
</div>

    )
}
