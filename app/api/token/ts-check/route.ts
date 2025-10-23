import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

function fmt(ts: number) {
    const ms = ts > 1e12 ? ts : ts * 1000
    const d = new Date(ms)
    return {raw: ts, ms, iso: d.toISOString(), utc: `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')} ${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}:${String(d.getUTCSeconds()).padStart(2,'0')} UTC`}
}

function parseChainId(value: string | null): number | null {
    if (!value) return null
    const parsed = Number.parseInt(value, 10)
    if (!Number.isFinite(parsed)) return null
    if (parsed < 0) return null
    return parsed
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const limit = Number(searchParams.get('limit') || '5')
    const chainId = parseChainId(searchParams.get('chainId'))
    if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })
    if (chainId == null) return NextResponse.json({ error: 'chainId required' }, { status: 400 })
    try {
        const supabase = getServiceSupabase()
        const latest = await supabase
            .from('swaps')
            .select('tx_hash, block_number, timestamp, price')
            .eq('chain_id', chainId)
            .eq('token_address', token)
            .order('timestamp', { ascending: false })
            .limit(limit)
        const earliest = await supabase
            .from('swaps')
            .select('tx_hash, block_number, timestamp, price')
            .eq('chain_id', chainId)
            .eq('token_address', token)
            .order('timestamp', { ascending: true })
            .limit(limit)
        const map = (rows: any[] | null | undefined) => (rows || []).map((r: any) => ({tx_hash: r.tx_hash, block_number: r.block_number, price: Number(r.price || 0), ts: fmt(Number(r.timestamp || 0))}))
        return NextResponse.json({sample: {latest: map(latest.data), earliest: map(earliest.data)}, chainId})
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'internal error' }, { status: 500 })
    }
}
