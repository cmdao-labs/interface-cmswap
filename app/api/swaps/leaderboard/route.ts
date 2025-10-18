import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseServer";

// Aggregated, all-time leaderboard over the full swaps history
// Returns top tokens and traders using SQL group-bys in Supabase

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function parseBoundedInt(
  value: string | null,
  fallback: number,
  { min = 1, max }: { min?: number; max: number }
) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  const clamped = Math.min(Math.max(parsed, min), max);
  return clamped;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const supabase = getServiceSupabase();
  const { searchParams } = req.nextUrl;
  const limit = parseBoundedInt(searchParams.get("limit"), DEFAULT_LIMIT, {
    max: MAX_LIMIT,
  });
  const startTsRaw = searchParams.get("startTs");
  const endTsRaw = searchParams.get("endTs");
  const startTs = startTsRaw ? Number(startTsRaw) : undefined;
  const endTs = endTsRaw ? Number(endTsRaw) : undefined;

  try {
    // If a time window is provided, aggregate within [startTs, endTs] on the server
    if (Number.isFinite(startTs) || Number.isFinite(endTs)) {
      const PAGE_SIZE = 2000;
      let offset = 0;
      const tokenMap = new Map<string, { value: number; latest_ts: number }>();
      const traderVolume = new Map<string, { value: number; latest_ts: number }>();
      const traderProfit = new Map<string, { value: number; latest_ts: number }>();
      const traderDegen = new Map<string, { value: number; latest_ts: number }>();
      // Paged scan of swaps within time bounds
      while (true) {
        let q = supabase
          .from('swaps')
          .select('token_address, sender, is_buy, volume_native, timestamp')
          .order('timestamp', { ascending: true })
          .range(offset, offset + PAGE_SIZE - 1);
        if (Number.isFinite(startTs)) q = q.gte('timestamp', Number(startTs));
        if (Number.isFinite(endTs)) q = q.lte('timestamp', Number(endTs));
        const { data: page, error } = await q;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        const rows = page || [];
        for (const r of rows as any[]) {
          const token = String(r?.token_address || '').toLowerCase();
          const sender = String(r?.sender || '').toLowerCase();
          const isBuy = Boolean(r?.is_buy);
          const volN = Number(r?.volume_native || 0);
          const ts = Number(r?.timestamp || 0) || 0;
          if (token) {
            const cur = tokenMap.get(token) || { value: 0, latest_ts: 0 };
            cur.value += Number.isFinite(volN) ? volN : 0;
            if (ts > cur.latest_ts) cur.latest_ts = ts;
            tokenMap.set(token, cur);
          }
          if (sender) {
            const vcur = traderVolume.get(sender) || { value: 0, latest_ts: 0 };
            vcur.value += Number.isFinite(volN) ? volN : 0;
            if (ts > vcur.latest_ts) vcur.latest_ts = ts;
            traderVolume.set(sender, vcur);

            const pcur = traderProfit.get(sender) || { value: 0, latest_ts: 0 };
            // realized PnL proxy: sells positive, buys negative
            pcur.value += Number.isFinite(volN) ? (isBuy ? -volN : volN) : 0;
            if (ts > pcur.latest_ts) pcur.latest_ts = ts;
            traderProfit.set(sender, pcur);

            const dcur = traderDegen.get(sender) || { value: 0, latest_ts: 0 };
            dcur.value += 1;
            if (ts > dcur.latest_ts) dcur.latest_ts = ts;
            traderDegen.set(sender, dcur);
          }
        }
        offset += rows.length;
        if (rows.length < PAGE_SIZE) break;
      }

      const sortDesc = (a: [string, { value: number; latest_ts: number }], b: [string, { value: number; latest_ts: number }]) => b[1].value - a[1].value;
      const volumeTokens = Array.from(tokenMap.entries()).sort(sortDesc).slice(0, limit).map(([token_address, v]) => ({ token_address, value: v.value, latest_ts: v.latest_ts }));
      const volumeTraders = Array.from(traderVolume.entries()).sort(sortDesc).slice(0, limit).map(([sender, v]) => ({ sender, value: v.value, latest_ts: v.latest_ts }));
      const profitTraders = Array.from(traderProfit.entries()).sort(sortDesc).slice(0, limit).map(([sender, v]) => ({ sender, value: v.value, latest_ts: v.latest_ts }));
      const degenTraders = Array.from(traderDegen.entries()).sort(sortDesc).slice(0, limit).map(([sender, v]) => ({ sender, value: v.value, latest_ts: v.latest_ts }));

      // Token metadata for volume tokens
      const tokenAddresses = Array.from(new Set(volumeTokens.map((r) => r.token_address)));
      const tokenMeta: Record<string, { symbol?: string | null; name?: string | null; logo?: string | null }> = {};
      if (tokenAddresses.length) {
        const { data, error } = await supabase
          .from('tokens')
          .select('address, symbol, name, logo')
          .in('address', tokenAddresses);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        for (const t of data || []) {
          const addr = String((t as any).address || '').toLowerCase();
          if (!addr) continue;
          tokenMeta[addr] = { symbol: (t as any).symbol, name: (t as any).name, logo: (t as any).logo };
        }
      }

      return NextResponse.json({ volumeTokens, volumeTraders, profitTraders, degenTraders, tokens: tokenMeta, limit, startTs: Number.isFinite(startTs) ? Number(startTs) : null, endTs: Number.isFinite(endTs) ? Number(endTs) : null });
    }

    // No time window: fallback to fast SQL RPC aggregations (all-time)
    // Top tokens by native volume (all-time)
    const tokenAgg = await supabase.rpc('top_tokens', { limit_i: limit });
    if (tokenAgg.error)
      return NextResponse.json(
        { error: tokenAgg.error.message },
        { status: 500 }
      );

    // Top traders by native volume (all-time)
    const traderAgg = await supabase.rpc('top_volume_traders', { limit_i: limit });
    if (traderAgg.error)
      return NextResponse.json(
        { error: traderAgg.error.message },
        { status: 500 }
      );

    // Top traders by profit (all-time)
    const profitAgg = await supabase.rpc('top_profit_traders', { limit_i: limit });
    if (profitAgg.error)
      return NextResponse.json(
        { error: profitAgg.error.message },
        { status: 500 }
      );
    // Normalize numeric types (Supabase numeric can arrive as strings)
    const profitTraders = (profitAgg.data || []).map((r: any) => ({
      sender: (r as any).sender,
      value: Number((r as any).value || 0),
      latest_ts: (r as any).latest_ts ?? null,
    }));

    // Degen = trade count per sender
    const degenAgg = await supabase.rpc('top_degen_traders', { limit_i: limit });
    if (degenAgg.error)
      return NextResponse.json(
        { error: degenAgg.error.message },
        { status: 500 }
      );

    // Token metadata for volume tokens
    const tokenAddresses = new Set<string>();
    for (const row of tokenAgg.data || []) {
      const addr = String((row as any).token_address || "");
      if (addr) tokenAddresses.add(addr);
    }
    const tokenMeta: Record<
      string,
      { symbol?: string | null; name?: string | null; logo?: string | null }
    > = {};
    if (tokenAddresses.size > 0) {
      const { data, error } = await supabase
        .from("tokens")
        .select("address, symbol, name, logo")
        .in("address", Array.from(tokenAddresses));
      if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });
      for (const t of data || []) {
        const addr = String((t as any).address || "").toLowerCase();
        if (!addr) continue;
        tokenMeta[addr] = {
          symbol: (t as any).symbol,
          name: (t as any).name,
          logo: (t as any).logo,
        };
      }
    }

    return NextResponse.json({
      volumeTokens: (tokenAgg.data || []).map((r: any) => ({
        token_address: (r as any).token_address,
        value: Number((r as any).value || 0),
        latest_ts: (r as any).latest_ts ?? null,
      })),
      volumeTraders: (traderAgg.data || []).map((r: any) => ({
        sender: (r as any).sender,
        value: Number((r as any).value || 0),
        latest_ts: (r as any).latest_ts ?? null,
      })),
      profitTraders,
      degenTraders: (degenAgg.data || []).map((r: any) => ({
        sender: (r as any).sender,
        value: Number((r as any).value || 0), // count
        latest_ts: (r as any).latest_ts ?? null,
      })),
      tokens: tokenMeta,
      limit,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "internal error" },
      { status: 500 }
    );
  }
}
