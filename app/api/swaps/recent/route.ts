import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 5000;
const DEFAULT_PAGE_SIZE = 1000;
const MAX_LIMIT = 20000;
const MAX_PAGE_SIZE = 2000;
const TOKEN_CHUNK_SIZE = 100;

function parseBoundedInt(
    value: string | null,
    fallback: number,
    { min = 1, max }: { min?: number; max: number },
) {
    if (!value) return fallback;
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return fallback;
    const clamped = Math.min(Math.max(parsed, min), max);
    return clamped;
}

export async function GET(req: NextRequest) {
    const supabase = getServiceSupabase();
    const { searchParams } = req.nextUrl;
    const limit = parseBoundedInt(searchParams.get("limit"), DEFAULT_LIMIT, {
        max: MAX_LIMIT,
    });
    const pageSize = parseBoundedInt(
        searchParams.get("pageSize"),
        DEFAULT_PAGE_SIZE,
        {
            max: MAX_PAGE_SIZE,
        },
    );

    try {
        const swaps: Array<{
            token_address?: string;
            sender?: string;
            is_buy?: boolean | null;
            volume_native?: number | string | null;
            timestamp?: number | string | null;
            tx_hash?: string | null;
        }> = [];

        let page = 0;
        while (swaps.length < limit) {
            const from = page * pageSize;
            let to = from + pageSize - 1;
            if (to >= limit) to = limit - 1;
            if (to < from) break;

            const { data, error } = await supabase
                .from("swaps")
                .select(
                    "token_address, sender, is_buy, volume_native, timestamp, tx_hash",
                )
                .order("timestamp", { ascending: false })
                .range(from, to);

            if (error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 },
                );
            }

            const batch = data ?? [];
            swaps.push(...batch);

            if (batch.length < pageSize || to >= limit - 1) {
                break;
            }

            page += 1;
        }

        const addressSet = new Set<string>();
        for (const swap of swaps) {
            const addr = String(swap.token_address || "").trim();
            if (addr) addressSet.add(addr);
        }
        const addresses = Array.from(addressSet);

        const tokenMeta: Record<
            string,
            { symbol?: string | null; name?: string | null; logo?: string | null }
        > = {};

        for (let i = 0; i < addresses.length; i += TOKEN_CHUNK_SIZE) {
            const chunk = addresses.slice(i, i + TOKEN_CHUNK_SIZE);
            const { data, error } = await supabase
                .from("tokens")
                .select("address, symbol, name, logo")
                .in("address", chunk);

            if (error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 500 },
                );
            }

            for (const token of data || []) {
                const addr = String((token as any).address || "").toLowerCase();
                if (!addr) continue;
                tokenMeta[addr] = {
                    symbol: (token as any).symbol,
                    name: (token as any).name,
                    logo: (token as any).logo,
                };
            }
        }

        return NextResponse.json({
            swaps,
            tokens: tokenMeta,
            count: swaps.length,
            limit,
            pageSize,
        });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message || "internal error" },
            { status: 500 },
        );
    }
}
