import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabaseServer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const limit = Number(searchParams.get('limit') || '500')
  const offset = Number(searchParams.get('offset') || '0')
  if (!token) return NextResponse.json({ error: 'token required' }, { status: 400 })

  try {
    const supabase = getServiceSupabase()
    const { data, error } = await supabase.rpc('holders_for_token', { token, limit_i: limit, offset_i: offset })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ holders: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'internal error' }, { status: 500 })
  }
}

