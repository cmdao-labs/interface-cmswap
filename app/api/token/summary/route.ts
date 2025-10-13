import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function nowMs() { return Date.now() }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const hours = Number(searchParams.get('graphHours') || '24')
  const activityLimit = Number(searchParams.get('activityLimit') || '50')
  const holdersLimit = Number(searchParams.get('holdersLimit') || '50')
  const tradersLimit = Number(searchParams.get('tradersLimit') || '50')
  if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })

  try {
    const supabase = getServiceSupabase()
    const cutoffMs = nowMs() - hours * 60 * 60 * 1000

    // Token + socials
    const { data: tokenRow } = await supabase.from('tokens').select('*').eq('address', token).maybeSingle()

    // Latest price, ATH, and 24h baseline
    const latestRes = await supabase
      .from('swaps')
      .select('price, timestamp')
      .eq('token_address', token)
      .not('price', 'is', null)
      .order('block_number', { ascending: false })
      .limit(1)
    const latest = latestRes.data?.[0] || null
    const lastPrice = Number(latest?.price || 0)

    const athRes = await supabase
      .from('swaps')
      .select('price')
      .eq('token_address', token)
      .not('price', 'is', null)
      .order('price', { ascending: false })
      .limit(1)
    const athPrice = Number(athRes.data?.[0]?.price || 0)

    const base24hRes = await supabase
      .from('swaps')
      .select('price, timestamp')
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
        .eq('token_address', token)
        .not('price', 'is', null)
        .order('timestamp', { ascending: true })
        .limit(1)
      base24h = Number(firstRes.data?.[0]?.price || 0)
    }

    const changeAbs = Number((lastPrice || 0) - (base24h || 0))
    const changePct = base24h ? (changeAbs / base24h) * 100 : 0
    const mcap = (lastPrice || 0) * 1_000_000_000
    const progress = (mcap / 47800) * 100

    // Graph data aggregated by 5 minutes (avg price, sum volume)
    const graphRes = await supabase
      .from('swaps')
      .select('timestamp, price, volume_native')
      .eq('token_address', token)
      .not('price', 'is', null)
      .gte('timestamp', cutoffMs)
      .order('timestamp', { ascending: true })
    const rows = graphRes.data || []
    const buckets = new Map()
    for (const r of rows) {
      const bucket = Math.floor(Number(r.timestamp) / 300000) * 300000
      const g = buckets.get(bucket) || { time: bucket, priceSum: 0, priceCount: 0, volume: 0 }
      const p = Number(r.price || 0)
      g.priceSum += isFinite(p) ? p : 0
      g.priceCount += isFinite(p) ? 1 : 0
      g.volume += Number(r.volume_native || 0)
      buckets.set(bucket, g)
    }
    const graph = Array.from(buckets.values())
      .map((b) => ({ time: b.time, price: b.priceCount ? b.priceSum / b.priceCount : 0, volume: b.volume }))
      .sort((a, b) => a.time - b.time)

    // Activity list
    const actRes = await supabase
      .from('swaps')
      .select('is_buy, amount_in, amount_out, sender, tx_hash, timestamp, volume_native, volume_token')
      .eq('token_address', token)
      .order('timestamp', { ascending: false })
      .limit(activityLimit)
    const activity = (actRes.data || []).map((r: any) => ({
      action: r.is_buy ? 'buy' : 'sell',
      nativeValue: Number(r.volume_native || 0),
      value: Number(r.volume_token || 0),
      from: r.sender,
      hash: r.tx_hash,
      timestamp: Number(r.timestamp || 0),
    }))

    // Holders (via SQL function)
    const holdersRes = await supabase.rpc('holders_for_token', { token, limit_i: holdersLimit, offset_i: 0 })
    const holders = (holdersRes.data || []).map((h: any) => ({ addr: h.holder, value: Number(h.balance || 0) }))

    // Traders (on-the-fly aggregation)
    const tradersRes = await supabase
      .from('swaps')
      .select('sender, is_buy, volume_native, volume_token')
      .eq('token_address', token)
    const traderMap = new Map<string, { addr: string; buys: number; sells: number; volumeNative: number; volumeToken: number }>()
    for (const r of tradersRes.data || []) {
      const key = r.sender || '0x0'
      const t = traderMap.get(key) || { addr: key, buys: 0, sells: 0, volumeNative: 0, volumeToken: 0 }
      if (r.is_buy) t.buys += 1
      else t.sells += 1
      t.volumeNative += Number(r.volume_native || 0)
      t.volumeToken += Number(r.volume_token || 0)
      traderMap.set(key, t)
    }
    const traders = Array.from(traderMap.values()).sort((a, b) => b.volumeNative - a.volumeNative).slice(0, tradersLimit)

    return NextResponse.json({
      token: tokenRow,
      header: {
        price: lastPrice,
        mcap,
        progress,
        athPrice,
        changeAbs,
        changePct,
      },
      graph,
      activity,
      holders,
      traders,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'internal error' }, { status: 500 })
  }
}
