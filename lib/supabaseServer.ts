import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type Db = any // You can generate types later via Supabase CLI

let _client: SupabaseClient<Db> | null = null

export function getServiceSupabase(): SupabaseClient<Db> {
  if (_client) return _client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set')
  }
  _client = createClient<Db>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: (input, init) => fetch(input, init) },
  })
  return _client
}

