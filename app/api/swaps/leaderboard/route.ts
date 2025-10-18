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

  try {
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
    const profitTraders = (profitAgg.data || []) as Array<{ sender: string; value: number; latest_ts: number | null }>;

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
