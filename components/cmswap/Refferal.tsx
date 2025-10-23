'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReferralTracker() {
    const searchParams = useSearchParams()
    useEffect(() => {
        const ref = searchParams.get('ref')
        const existingRef = localStorage.getItem('referral_code')
        if (ref && ref.startsWith('0x') && !existingRef) localStorage.setItem('referral_code', ref);
    }, [searchParams])
    return null
}
