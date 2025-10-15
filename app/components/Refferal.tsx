'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReferralTracker() {
    const searchParams = useSearchParams()
    useEffect(() => {
        const ref = searchParams.get('ref')
        const existingRef = localStorage.getItem('referral_code')
        if (ref && ref.startsWith('0x') && !existingRef) {
            localStorage.setItem('referral_code', ref)
            console.log('Referral Code Saved:', ref)
        } else if (!ref) {
            console.log('Not found ref code')
        } else if (existingRef) {
            console.log('Referral code already exists in localStorage:', existingRef)
        } else if (ref && !ref.startsWith('0x')) {
            console.log('Invalid ref format (must start with 0x):', ref)
        }
    }, [searchParams])
    return null
}
