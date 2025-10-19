import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
function parseChainId(value: string | null): number | null {
    if (!value) return null
    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed)) return null
    if (parsed < 0) return null
    return parsed
}
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const limit = Number(searchParams.get('limit') || '500')
    const offset = Number(searchParams.get('offset') || '0')
    const chainId = parseChainId(searchParams.get('chainId'))
    if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })
    if (chainId == null) return NextResponse.json({ error: 'chainId required' }, { status: 400 })
    try {
        const supabase = getServiceSupabase()
        const { data, error } = await supabase.rpc('holders_for_token', { chain_i: chainId, token, limit_i: limit, offset_i: offset })
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json({ holders: data || [], chainId })
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'internal error' }, { status: 500 })
    }
}
