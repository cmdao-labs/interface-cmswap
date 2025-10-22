import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

function nowMs() { return Date.now() }

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
    const hours = Number(searchParams.get('graphHours') || '24')
    const activityLimit = Number(searchParams.get('activityLimit') || '20000')
    const holdersLimit = Number(searchParams.get('holdersLimit') || '50')
    const tradersLimit = Number(searchParams.get('tradersLimit') || '20000')
    const traderHours = Number(searchParams.get('traderHours') || '0')
    const chainId = parseChainId(searchParams.get('chainId'))
    if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })
    if (chainId == null) return NextResponse.json({ error: 'chainId required' }, { status: 400 })
    try {
        const supabase = getServiceSupabase()
        const cutoffMs = nowMs() - hours * 60 * 60 * 1000
        const cutoffSec = Math.floor(cutoffMs / 1000)
        const { data: tokenRow } = await supabase
            .from('tokens')
            .select('*')
            .eq('chain_id', chainId)
            .eq('address', token)
            .maybeSingle()
        const latestRes = await supabase
            .from('swaps')
            .select('price, timestamp')
            .eq('chain_id', chainId)
            .eq('token_address', token)
            .not('price', 'is', null)
            .order('block_number', { ascending: false })
            .limit(1)
        const latest = latestRes.data?.[0] || null
        const lastPrice = Number(latest?.price || 0)
        const athRes = await supabase
            .from('swaps')
            .select('price')
            .eq('chain_id', chainId)
            .eq('token_address', token)
            .not('price', 'is', null)
            .order('price', { ascending: false })
            .limit(1)
        const athPrice = Number(athRes.data?.[0]?.price || 0)
        const base24hRes = await supabase
            .from('swaps')
            .select('price, timestamp')
            .eq('chain_id', chainId)
            .eq('token_address', token)
            .not('price', 'is', null)
            .lte('timestamp', cutoffMs)
            .order('timestamp', { ascending: false })
            .limit(1)
        let base24h = Number(base24hRes.data?.[0]?.price || 0)
        if (!base24h) {
            const firstRes = await supabase
                .from('swaps')
                .select('price')
                .eq('chain_id', chainId)
                .eq('token_address', token)
                .not('price', 'is', null)
                .order('timestamp', { ascending: true })
                .limit(1)
            base24h = Number(firstRes.data?.[0]?.price || 0)
        }
        const changeAbs = Number((lastPrice || 0) - (base24h || 0))
        const changePct = base24h ? (changeAbs / base24h) * 100 : 0
        const mcap = (lastPrice || 0) * 1_000_000_000
        const progress = (mcap / 60600) * 100
        const CHART_PAGE_SIZE = 1000
        const graphData: any[] = []
        let graphOffset = 0
        let hasMoreGraph = true
        while (hasMoreGraph) {
            const graphRes = await supabase
                .from('swaps')
                .select('timestamp, price, volume_native')
                .eq('chain_id', chainId)
                .eq('token_address', token)
                .not('price', 'is', null)
                .gte('timestamp', cutoffMs)
                .order('timestamp', { ascending: true })
                .range(graphOffset, graphOffset + CHART_PAGE_SIZE - 1)

            const pageData = graphRes.data || []
            graphData.push(...pageData)
            graphOffset += CHART_PAGE_SIZE
            hasMoreGraph = pageData.length === CHART_PAGE_SIZE
            if (graphData.length > 50000) break;
        }
        const rows = graphData
        const normalizeTs = (ts: number) => (ts > 1e12 ? ts : ts * 1000);
        const graph = rows
            .map((r: any) => ({
                time: normalizeTs(Number(r?.timestamp || 0)),
                price: Number(r?.price || 0),
                volume: Number(r?.volume_native || 0),
            }))
            .filter((p: any) => Number.isFinite(p.time) && Number.isFinite(p.price) && p.time >= cutoffMs)
            .sort((a: any, b: any) => a.time - b.time)
        const actRes = await supabase
            .from('swaps')
            .select('is_buy, amount_in, amount_out, sender, tx_hash, timestamp, volume_native, volume_token')
            .eq('chain_id', chainId)
            .eq('token_address', token)
            .order('timestamp', { ascending: false })
            .limit(activityLimit)
        const activity = (actRes.data || []).map((r: any) => ({
            action: r.is_buy ? 'buy' : 'sell',
            nativeValue: Number(r.volume_native || 0),
            value: Number(r.volume_token || 0),
            from: r.sender,
            hash: r.tx_hash,
            timestamp: normalizeTs(Number(r.timestamp || 0)),
        }))
        const holdersRes = await supabase.rpc('holders_for_token', { chain_i: chainId, token, limit_i: holdersLimit, offset_i: 0 })
        const holders = (holdersRes.data || []).map((h: any) => ({ addr: h.holder, value: Number(h.balance || 0) }))
        const PAGE_SIZE = 1000
        let offset = 0
        const tmap = new Map<string, { addr: string; buys: number; sells: number; trades: number; lastActive: number; boughtNative: number; soldNative: number; boughtToken: number; soldToken: number }>()
        while (true) {
            let q = supabase
                .from('swaps')
                .select('sender, is_buy, volume_native, volume_token, timestamp')
                .eq('chain_id', chainId)
                .eq('token_address', token)
                .order('timestamp', { ascending: false })
                .range(offset, offset + PAGE_SIZE - 1)
            if (traderHours > 0) {
                const traderCutoffMs = nowMs() - traderHours * 60 * 60 * 1000
                q = q.gte('timestamp', traderCutoffMs)
            }
            const { data: tpage, error: terr } = await q
            if (terr) throw terr
            const rows = tpage || []
            for (const r of rows as any[]) {
                const addr = String(r?.sender || '').toLowerCase()
                if (!addr) continue
                const isBuy = Boolean(r?.is_buy)
                const volN = Number(r?.volume_native || 0)
                const volT = Number(r?.volume_token || 0)
                const ts = normalizeTs(Number(r?.timestamp || 0))
                const cur = tmap.get(addr) || { addr, buys: 0, sells: 0, trades: 0, lastActive: 0, boughtNative: 0, soldNative: 0, boughtToken: 0, soldToken: 0 }
                if (isBuy) {
                    cur.buys += 1
                    cur.boughtNative += isFinite(volN) ? volN : 0
                    cur.boughtToken += isFinite(volT) ? volT : 0
                } else {
                    cur.sells += 1
                    cur.soldNative += isFinite(volN) ? volN : 0
                    cur.soldToken += isFinite(volT) ? volT : 0
                }
                cur.trades = cur.buys + cur.sells
                if (isFinite(ts) && ts > cur.lastActive) cur.lastActive = ts
                tmap.set(addr, cur)
            }
            offset += rows.length
            if (rows.length < PAGE_SIZE) break
        }
        const traders = Array.from(tmap.values())
            .sort((a, b) => {
                if (b.trades !== a.trades) return b.trades - a.trades
                if (b.boughtNative !== a.boughtNative) return b.boughtNative - a.boughtNative
                return b.lastActive - a.lastActive
            })
            .slice(0, tradersLimit)
        return NextResponse.json({
            token: tokenRow,
            header: {price: lastPrice, mcap, progress, athPrice, changeAbs, changePct},
            graph,
            activity,
            holders,
            traders,
            chainId,
        })
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || 'internal error' }, { status: 500 })
    }
}
