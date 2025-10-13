-- Supabase schema for RPC-compatible caching
-- Create tables and indexes to support Trade.tsx data needs

-- Note: We removed blocks and transactions since Trade.tsx only needs
-- precomputed swap timestamps in the swaps table.

-- Tokens metadata (from factory Creation event)
create table if not exists tokens (
  address text primary key,
  symbol text,
  name text,
  creator text,
  created_time bigint,
  logo text,
  description text
);

-- Note: Socials table removed (Trade.tsx reads from chain).

-- Note: factory_state removed; price/mcap computed from swaps.

-- Swap events
create table if not exists swaps (
  id bigserial primary key,
  factory_address text not null,
  token_address text not null,
  block_number bigint not null,
  log_index integer not null,
  tx_hash text not null,
  is_buy boolean,
  amount_in numeric,
  amount_out numeric,
  reserve_in numeric,
  reserve_out numeric,
  sender text,
  timestamp bigint,
  -- Precomputed fields for fast reads
  price numeric,
  volume_native numeric,
  volume_token numeric
);

create index if not exists swaps_token_block_idx on swaps(token_address, block_number);
create unique index if not exists swaps_uniqueness_idx on swaps(tx_hash, log_index);
create index if not exists swaps_token_time_idx on swaps(token_address, timestamp);

-- ERC20 transfer events per token
create table if not exists transfers (
  id bigserial primary key,
  token_address text not null,
  block_number bigint not null,
  log_index integer not null,
  tx_hash text not null,
  from_addr text,
  to_addr text,
  amount numeric,
  timestamp bigint
);

create index if not exists transfers_token_block_idx on transfers(token_address, block_number);
create unique index if not exists transfers_uniqueness_idx on transfers(tx_hash, log_index);

-- Note: balances table removed; holders derived from transfers.

-- Indexer progress per stream
create table if not exists index_state (
  stream text primary key,
  last_block bigint not null
);

-- Compute holders from transfers on the fly
-- Usage: select * from holders_for_token('0x..', 500, 0)
create or replace function holders_for_token(token text, limit_i integer default 500, offset_i integer default 0)
returns table(holder text, balance numeric)
language sql
as $$
  with credits as (
    select to_addr as addr, sum(amount) as credit
    from transfers
    where token_address = token
    group by to_addr
  ),
  debits as (
    select from_addr as addr, sum(amount) as debit
    from transfers
    where token_address = token
    group by from_addr
  ),
  joined as (
    select coalesce(c.addr, d.addr) as addr,
           coalesce(c.credit, 0) as credit,
           coalesce(d.debit, 0) as debit
    from credits c
    full outer join debits d on c.addr = d.addr
  )
  select addr as holder,
         (credit - debit) as balance
  from joined
  where (credit - debit) > 0
  order by balance desc
  limit limit_i offset offset_i;
$$;

-- Note: token_stats and candles_5m removed to keep schema minimal.
