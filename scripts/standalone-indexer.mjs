// Env required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Optional: INDEXER_RPC_URL (fallback KUBTESTNET_RPC; default https://rpc-testnet.bitkubchain.io)
//           INDEXER_INTERVAL_MS (default 3000) / INDEXER_MAX_RANGE (default 2000)
//           INDEXER_MODE (all|creation|swap|transfer, default all)
//           INDEXER_CHAIN_ID (default: auto-detect via RPC)
//           INDEXER_FACTORY_ADDR (default current Bitkub testnet factory)
//           INDEXER_START_BLOCK (default current Bitkub testnet start block)
//           UNISWAP_V3_FACTORY_ADDR (optional; enables Uniswap V3 indexing if set)
//           UNISWAP_V3_START_BLOCK (default Bitkub testnet V3 factory creation block)
//           INDEXER_BASE_TOKEN
import { createPublicClient, decodeFunctionData, http, formatEther, erc20Abi } from 'viem'
import { bitkubTestnet } from 'viem/chains'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const FACTORY_ADDR = (process.env.INDEXER_FACTORY_ADDR || '0x46a4073c830031ea19d7b9825080c05f8454e530').toLowerCase()
const START_BLOCK = BigInt(process.env.INDEXER_START_BLOCK || '23935659')

// Uniswap V3 options (Bitkub testnet defaults from lib/chains.ts)
const V3_FACTORY_ADDR = (process.env.UNISWAP_V3_FACTORY_ADDR || process.env.INDEXER_V3_FACTORY_ADDR || '').toLowerCase()
const V3_START_BLOCK = BigInt(process.env.UNISWAP_V3_START_BLOCK || process.env.INDEXER_V3_START_BLOCK || '23935400')

const FACTORY_EVENTS_ABI = [
    {
        anonymous: false,
        name: 'Creation',
        type: 'event',
        inputs: [
            { indexed: true, internalType: 'address', name: 'creator', type: 'address' },
            { indexed: false, internalType: 'address', name: 'tokenAddr', type: 'address' },
            { indexed: false, internalType: 'string', name: 'logo', type: 'string' },
            { indexed: false, internalType: 'string', name: 'description', type: 'string' },
            { indexed: false, internalType: 'string', name: 'link1', type: 'string' },
            { indexed: false, internalType: 'string', name: 'link2', type: 'string' },
            { indexed: false, internalType: 'string', name: 'link3', type: 'string' },
            { indexed: false, internalType: 'uint256', name: 'createdTime', type: 'uint256' },
        ],
    },
    {
        anonymous: false,
        name: 'Swap',
        type: 'event',
        inputs: [
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
            { indexed: true, internalType: 'bool', name: 'isBuy', type: 'bool' },
            { indexed: false, internalType: 'uint256', name: 'amountIn', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'amountOut', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
        ],
    },
]

// Minimal Uniswap V3 ABIs for events we need
const V3_FACTORY_EVENTS_ABI = [
    {
        anonymous: false,
        name: 'PoolCreated',
        type: 'event',
        inputs: [
            { indexed: true, internalType: 'address', name: 'token0', type: 'address' },
            { indexed: true, internalType: 'address', name: 'token1', type: 'address' },
            { indexed: true, internalType: 'uint24', name: 'fee', type: 'uint24' },
            { indexed: false, internalType: 'int24', name: 'tickSpacing', type: 'int24' },
            { indexed: false, internalType: 'address', name: 'pool', type: 'address' },
        ],
    },
]

const V3_POOL_EVENTS_ABI = [
    {
        anonymous: false,
        name: 'Swap',
        type: 'event',
        inputs: [
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
            { indexed: true, internalType: 'address', name: 'recipient', type: 'address' },
            { indexed: false, internalType: 'int256', name: 'amount0', type: 'int256' },
            { indexed: false, internalType: 'int256', name: 'amount1', type: 'int256' },
            { indexed: false, internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
            { indexed: false, internalType: 'uint128', name: 'liquidity', type: 'uint128' },
            { indexed: false, internalType: 'int24', name: 'tick', type: 'int24' },
        ],
    },
]

const FACTORY_FUNC_ABI = [
    {
        type: 'function',
        name: 'buy',
        stateMutability: 'payable',
        inputs: [
            { internalType: 'address', name: '_tokenAddr', type: 'address' },
            { internalType: 'uint256', name: '_minToken', type: 'uint256' },
        ],
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    },
    {
        type: 'function',
        name: 'sell',
        stateMutability: 'nonpayable',
        inputs: [
            { internalType: 'address', name: '_tokenAddr', type: 'address' },
            { internalType: 'uint256', name: '_tokenSold', type: 'uint256' },
            { internalType: 'uint256', name: '_minToken', type: 'uint256' },
        ],
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    },
]

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const REST_BASE = SUPABASE_URL ? `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1` : ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const INTERVAL_MS = Number(process.env.INDEXER_INTERVAL_MS || '3000')
const MAX_RANGE = Number(process.env.INDEXER_MAX_RANGE || '2000')
const MODE = (process.env.INDEXER_MODE || 'all')
const RPC_URL = process.env.INDEXER_RPC_URL || process.env.KUBTESTNET_RPC || 'https://rpc-testnet.bitkubchain.io'

const client = createPublicClient({ chain: bitkubTestnet, transport: http(RPC_URL) })

let CHAIN_ID = Number(process.env.INDEXER_CHAIN_ID || '0') || null

const BASE_TOKEN = (process.env.INDEXER_BASE_TOKEN || '0x700d3ba307e1256e509ed3e45d6f9dff441d6907').toLowerCase()
const BASE_TOKEN_DECIMALS = Number(process.env.INDEXER_BASE_TOKEN_DECIMALS || '18')
const TIMEFRAMES_SECONDS = [15, 60, 300, 900, 3600, 14400, 86400]
const decimalsCache = new Map()
decimalsCache.set(BASE_TOKEN, BASE_TOKEN_DECIMALS)

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }

async function restGet(path, qs = '') {
    const url = `${REST_BASE}/${path}${qs ? `?${qs}` : ''}`
    const res = await fetch(url, {headers: {apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`}})
    if (!res.ok) throw new Error(`GET ${path} ${res.status}`)
    return await res.json()
}

async function restUpsert(table, rows, onConflictCols) {
    if (!rows || rows.length === 0) return
    const url = `${REST_BASE}/${table}?on_conflict=${encodeURIComponent(onConflictCols)}`
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify(rows),
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`UPSERT ${table} ${res.status}: ${text}`)
    }
}

function toLowerAddr(value) {
    if (typeof value !== 'string') return ''
    return value.trim().toLowerCase()
}

// Note: canonicalMarket for cmswap removed; Uniswap V3 has its own canonical function

function bucketStart(timestampMs, seconds) {
    const sizeMs = seconds * 1000
    return Math.floor(Number(timestampMs) / sizeMs) * sizeMs
}

function pow10(exp) {
    // supports negative exponents
    return Math.pow(10, exp)
}

function toNumber(value) {
    if (value === null || value === undefined) return null
    const num = Number(value)
    return Number.isFinite(num) ? num : null
}

async function getTokenDecimals(addr) {
    const lower = toLowerAddr(addr)
    if (!lower) return 18
    if (decimalsCache.has(lower)) return decimalsCache.get(lower)
    try {
        const decimals = await client.readContract({ address: lower, abi: erc20Abi, functionName: 'decimals' })
        const parsed = Number(decimals)
        const safe = Number.isFinite(parsed) ? parsed : 18
        decimalsCache.set(lower, safe)
        return safe
    } catch {
        decimalsCache.set(lower, 18)
        return 18
    }
}

// cmswap market ensuring removed; swap_markets should be populated from Uniswap V3 only

function updateCandleAccumulator(map, marketId, timeframeSeconds, bucketMs, price, volume0, volume1) {
    const key = `${marketId}:${timeframeSeconds}:${bucketMs}`
    const existing = map.get(key)
    if (!existing) {
        map.set(key, {
            market_id: marketId,
            timeframe_seconds: timeframeSeconds,
            bucket_start: bucketMs,
            open: price,
            high: price,
            low: price,
            close: price,
            volume0: volume0 ?? 0,
            volume1: volume1 ?? 0,
            trades: 1,
            updated_at: Date.now(),
        })
        return
    }
    existing.close = price
    if (price != null) {
        if (existing.high == null || price > existing.high) existing.high = price
        if (existing.low == null || price < existing.low) existing.low = price
        if (existing.open == null) existing.open = price
    }
    existing.volume0 = (existing.volume0 ?? 0) + (volume0 ?? 0)
    existing.volume1 = (existing.volume1 ?? 0) + (volume1 ?? 0)
    existing.trades = (existing.trades ?? 0) + 1
    existing.updated_at = Date.now()
}

async function getLastBlock(stream) {
    const rows = await restGet('index_state', `select=last_block&chain_id=eq.${CHAIN_ID}&stream=eq.${encodeURIComponent(stream)}&limit=1`)
    if (!rows || rows.length === 0) return START_BLOCK
    return BigInt(rows[0].last_block)
}

async function getLastBlockWithFallback(stream, fallbackStartBlock) {
    const rows = await restGet('index_state', `select=last_block&chain_id=eq.${CHAIN_ID}&stream=eq.${encodeURIComponent(stream)}&limit=1`)
    if (!rows || rows.length === 0) return BigInt(fallbackStartBlock)
    return BigInt(rows[0].last_block)
}

async function setLastBlock(stream, block) {
    await restUpsert('index_state', [{ chain_id: CHAIN_ID, stream, last_block: String(block) }], 'chain_id,stream')
}

async function indexCreation(latest) {
    let from = await getLastBlock('creation')
    if (from > latest) return
    const chunk = BigInt(MAX_RANGE)
    while (from <= latest) {
        const to = from + chunk < latest ? from + chunk : latest
        const logs = await client.getContractEvents({
            address: FACTORY_ADDR,
            abi: FACTORY_EVENTS_ABI,
            eventName: 'Creation',
            fromBlock: from,
            toBlock: to,
        })
        if (logs.length) {
        const rows = logs.map((l) => ({
            chain_id: CHAIN_ID,
            address: l.args?.tokenAddr ?? '',
            symbol: null,
            name: null,
            creator: l.args?.creator ?? null,
            created_time: l.args?.createdTime ? String(l.args.createdTime) : null,
            logo: l.args?.logo ?? null,
            description: l.args?.description ?? null,
        }))
        await restUpsert('tokens', rows, 'chain_id,address')
        for (const r of rows) {
            try {
                const symbol = await client.readContract({ address: r.address, abi: erc20Abi, functionName: 'symbol' })
                const name = await client.readContract({ address: r.address, abi: erc20Abi, functionName: 'name' })
                await restUpsert('tokens', [{ chain_id: CHAIN_ID, address: r.address, symbol, name }], 'chain_id,address')
            } catch {}
        }
        }
        await setLastBlock('creation', to)
        from = to + 1n
    }
}

async function indexSwaps(latest) {
    let from = await getLastBlock('swap')
    if (from > latest) return
    const chunk = BigInt(MAX_RANGE)
    while (from <= latest) {
        const to = from + chunk < latest ? from + chunk : latest
        const logs = await client.getContractEvents({
            address: FACTORY_ADDR,
            abi: FACTORY_EVENTS_ABI,
            eventName: 'Swap',
            fromBlock: from,
            toBlock: to,
        })
        if (logs.length) {
            // Fetch virtualAmount once per batch
            let virtualAmount = 0n
            try {
                virtualAmount = await client.readContract({ address: FACTORY_ADDR, abi: [{ name: 'virtualAmount', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint256' }] }], functionName: 'virtualAmount' })
            } catch {}
            const blockNumbers = Array.from(new Set(logs.map((l) => String(l.blockNumber))))
            const blocks = await Promise.all(blockNumbers.map((bn) => client.getBlock({ blockNumber: BigInt(bn) })))
            const blockMap = new Map()
            blocks.forEach((b, i) => blockMap.set(blockNumbers[i], Number(b.timestamp) * 1000))

            const txHashes = Array.from(new Set(logs.map((l) => l.transactionHash)))
            const txs = await Promise.all(txHashes.map((h) => client.getTransaction({ hash: h })))
            const txMap = new Map()
            txs.forEach((tx, i) => txMap.set(txHashes[i], tx.input))
            // No need to persist blocks or transactions; we embed timestamp in swaps
            const rows = logs.map((l) => {
                const input = txMap.get(l.transactionHash) || '0x'
                let tokenAddr = null
                try {
                    const decoded = decodeFunctionData({ abi: FACTORY_FUNC_ABI, data: input })
                    const args = decoded.args
                    if (args && args.length) tokenAddr = String(args[0])
                } catch {}

                const isBuy = Boolean(l.args?.isBuy)
                const amountIn = BigInt(l.args?.amountIn ?? 0)
                const amountOut = BigInt(l.args?.amountOut ?? 0)
                const reserveIn = BigInt(l.args?.reserveIn ?? 0)
                const reserveOut = BigInt(l.args?.reserveOut ?? 0)
                const price = Number((isBuy ? (Number(formatEther(reserveIn)) + Number(formatEther(virtualAmount))) / Math.max(1e-18, Number(formatEther(reserveOut))) : (Number(formatEther(reserveOut)) + Number(formatEther(virtualAmount))) / Math.max(1e-18, Number(formatEther(reserveIn)))))
                const volume_native = Number(formatEther(isBuy ? amountIn : amountOut))
                const volume_token = Number(formatEther(isBuy ? amountOut : amountIn))
                return {
                    chain_id: CHAIN_ID,
                    factory_address: FACTORY_ADDR,
                    token_address: tokenAddr,
                    block_number: String(l.blockNumber),
                    log_index: Number(l.logIndex ?? 0),
                    tx_hash: l.transactionHash,
                    is_buy: isBuy,
                    amount_in: String(amountIn),
                    amount_out: String(amountOut),
                    reserve_in: String(reserveIn),
                    reserve_out: String(reserveOut),
                    sender: l.args?.sender ?? null,
                    timestamp: blockMap.get(String(l.blockNumber)) || null,
                    price: isFinite(price) ? price : null,
                    volume_native: isFinite(volume_native) ? volume_native : null,
                    volume_token: isFinite(volume_token) ? volume_token : null,
                }
            })
            await restUpsert('swaps', rows, 'chain_id,tx_hash,log_index')
            // Note: cmswap candles/markets/snapshots aggregation removed. Uniswap V3 handles those tables.
        }
        await setLastBlock('swap', to)
        from = to + 1n
    }
}

// ============= Uniswap V3 indexing =============

function canonicalMarketV3(a, b) {
    const aLower = toLowerAddr(a)
    const bLower = toLowerAddr(b)
    if (!aLower || !bLower) throw new Error('invalid market addresses')
    if (aLower === bLower) throw new Error('market tokens must differ')
    if (aLower < bLower) return { token0: aLower, token1: bLower }
    return { token0: bLower, token1: aLower }
}

function v3MarketId(token0, token1, fee) {
    // Include a prefix and fee tier to avoid collisions with other DEXes and fee tiers
    const feeNum = Number(fee || 0)
    return `univ3:${token0}-${token1}:fee${feeNum}`
}

async function indexV3Factory(latest) {
    if (!V3_FACTORY_ADDR) return
    let from = await getLastBlockWithFallback('v3:factory', V3_START_BLOCK)
    if (from > latest) return
    const chunk = BigInt(MAX_RANGE)
    while (from <= latest) {
        const to = from + chunk < latest ? from + chunk : latest
        const logs = await client.getContractEvents({
            address: V3_FACTORY_ADDR,
            abi: V3_FACTORY_EVENTS_ABI,
            eventName: 'PoolCreated',
            fromBlock: from,
            toBlock: to,
        })
        if (logs.length) {
            // prepare markets and tokens
            const marketRows = []
            const tokenSet = new Set()
            for (const l of logs) {
                const t0 = toLowerAddr(l.args?.token0)
                const t1 = toLowerAddr(l.args?.token1)
                const fee = Number(l.args?.fee ?? 0)
                if (!t0 || !t1) continue
                const { token0, token1 } = canonicalMarketV3(t0, t1)
                const [dec0, dec1] = await Promise.all([
                    getTokenDecimals(token0),
                    getTokenDecimals(token1),
                ])
                const mid = v3MarketId(token0, token1, fee)
                marketRows.push({
                    chain_id: CHAIN_ID,
                    market_id: mid,
                    token0,
                    token1,
                    pair_address: toLowerAddr(l.args?.pool) || '',
                    dex: 'uniswap-v3',
                    decimals0: dec0,
                    decimals1: dec1,
                })
                tokenSet.add(token0)
                tokenSet.add(token1)
            }
            if (marketRows.length) {
                await restUpsert('swap_markets', marketRows, 'chain_id,market_id')
            }
            if (tokenSet.size) {
                // Best-effort metadata fetch
                for (const addr of tokenSet) {
                    try {
                        const [symbol, name] = await Promise.all([
                            client.readContract({ address: addr, abi: erc20Abi, functionName: 'symbol' }),
                            client.readContract({ address: addr, abi: erc20Abi, functionName: 'name' }),
                        ])
                        await restUpsert('tokens', [{ chain_id: CHAIN_ID, address: addr, symbol, name }], 'chain_id,address')
                    } catch {}
                }
            }
        }
        await setLastBlock('v3:factory', to)
        from = to + 1n
    }
}

async function indexV3Swaps(latest) {
    if (!V3_FACTORY_ADDR) return
    // Load known V3 pools from swap_markets
    const markets = await restGet('swap_markets', `select=market_id,pair_address,token0,token1,decimals0,decimals1&chain_id=eq.${CHAIN_ID}&dex=eq.uniswap-v3`)
    if (!Array.isArray(markets) || markets.length === 0) return
    const chunk = BigInt(MAX_RANGE)
    for (const m of markets) {
        const pool = toLowerAddr(m.pair_address)
        if (!pool) continue
        let from = await getLastBlockWithFallback(`v3:swap:${pool}`, V3_START_BLOCK)
        if (from > latest) continue
        while (from <= latest) {
            const to = from + chunk < latest ? from + chunk : latest
            const logs = await client.getContractEvents({
                address: pool,
                abi: V3_POOL_EVENTS_ABI,
                eventName: 'Swap',
                fromBlock: from,
                toBlock: to,
            })
            if (logs.length) {
                const blockNumbers = Array.from(new Set(logs.map((l) => String(l.blockNumber))))
                const blocks = await Promise.all(blockNumbers.map((bn) => client.getBlock({ blockNumber: BigInt(bn) })))
                const blockMap = new Map()
                blocks.forEach((b, i) => blockMap.set(blockNumbers[i], Number(b.timestamp) * 1000))

                const candleAccumulator = new Map()
                const snapshotRows = []
                for (const l of logs) {
                    const tsMs = blockMap.get(String(l.blockNumber)) || null
                    const amount0 = BigInt(l.args?.amount0 ?? 0)
                    const amount1 = BigInt(l.args?.amount1 ?? 0)
                    const sqrtPriceX96 = BigInt(l.args?.sqrtPriceX96 ?? 0)
                    const dec0 = Number(m.decimals0 ?? 18)
                    const dec1 = Number(m.decimals1 ?? 18)
                    // Compute price1_per_0 = (sqrtX96/2^96)^2 * 10^(dec0-dec1)
                    let price1_per_0 = null
                    try {
                        const q96 = Math.pow(2, 96)
                        const sqrtP = Number(sqrtPriceX96) / q96
                        const raw = sqrtP * sqrtP
                        const adj = raw * pow10(dec0 - dec1)
                        price1_per_0 = Number.isFinite(adj) && adj > 0 ? adj : null
                    } catch {}
                    const price0_per_1 = price1_per_0 && price1_per_0 > 0 ? 1 / price1_per_0 : null

                    // Volumes per swap in natural units
                    const vol0 = Math.abs(Number(amount0) / Math.pow(10, dec0))
                    const vol1 = Math.abs(Number(amount1) / Math.pow(10, dec1))

                    if (tsMs && price0_per_1 && Number.isFinite(vol0) && Number.isFinite(vol1)) {
                        for (const seconds of TIMEFRAMES_SECONDS) {
                            const bucketMs = bucketStart(tsMs, seconds)
                            updateCandleAccumulator(candleAccumulator, m.market_id, seconds, bucketMs, price0_per_1, vol0, vol1)
                        }
                        snapshotRows.push({
                            chain_id: CHAIN_ID,
                            market_id: m.market_id,
                            pair_address: pool,
                            dex: 'uniswap-v3',
                            block_number: String(l.blockNumber),
                            timestamp: tsMs,
                            reserve0: null,
                            reserve1: null,
                            price: price0_per_1,
                        })
                    }
                }
                if (candleAccumulator.size) {
                    const withChain = Array.from(candleAccumulator.values()).map((c) => ({ ...c, chain_id: CHAIN_ID }))
                    await restUpsert('swap_candles', withChain, 'chain_id,market_id,timeframe_seconds,bucket_start')
                }
                if (snapshotRows.length) {
                    await restUpsert('swap_pair_snapshots', snapshotRows, 'chain_id,pair_address,block_number')
                }
            }
            await setLastBlock(`v3:swap:${pool}`, to)
            from = to + 1n
        }
    }
}

async function indexTransfers(latest) {
    const tokens = await restGet('tokens', `select=address&chain_id=eq.${CHAIN_ID}`)
    if (!Array.isArray(tokens) || tokens.length === 0) return
    const chunk = BigInt(MAX_RANGE)
    for (const t of tokens) {
        const token = t.address
        if (!token) continue
        let from = await getLastBlock(`transfer:${token.toLowerCase()}`)
        if (from > latest) continue
        while (from <= latest) {
            const to = from + chunk < latest ? from + chunk : latest
            const logs = await client.getContractEvents({
                address: token,
                abi: erc20Abi,
                eventName: 'Transfer',
                fromBlock: from,
                toBlock: to,
            })
            if (logs.length) {
                const blockNumbers = Array.from(new Set(logs.map((l) => String(l.blockNumber))))
                const blocks = await Promise.all(blockNumbers.map((bn) => client.getBlock({ blockNumber: BigInt(bn) })))
                const blockMap = new Map()
                blocks.forEach((b, i) => blockMap.set(blockNumbers[i], Number(b.timestamp) * 1000))
                const rows = logs.map((l) => ({
                    chain_id: CHAIN_ID,
                    token_address: token,
                    block_number: String(l.blockNumber),
                    log_index: Number(l.logIndex ?? 0),
                    tx_hash: l.transactionHash,
                    from_addr: l.args?.from ?? null,
                    to_addr: l.args?.to ?? null,
                    amount: l.args?.value ? String(l.args.value) : null,
                    timestamp: blockMap.get(String(l.blockNumber)) || null,
                }))
                await restUpsert('transfers', rows, 'chain_id,tx_hash,log_index')
            }
            await setLastBlock(`transfer:${token.toLowerCase()}`, to)
            from = to + 1n
        }
    }
}

async function tick() {
    const latest = await client.getBlockNumber()
    if (MODE === 'all' || MODE === 'creation') await indexCreation(latest)
    if (MODE === 'all' || MODE === 'swap') await indexSwaps(latest)
    if (MODE === 'all' || MODE === 'transfer') await indexTransfers(latest)
    // Uniswap V3 indexing; runs when factory is provided or when mode explicitly targets v3
    if (V3_FACTORY_ADDR && (MODE === 'all' || MODE === 'v3' || MODE === 'v3-market')) await indexV3Factory(latest)
    if (V3_FACTORY_ADDR && (MODE === 'all' || MODE === 'v3' || MODE === 'v3-swap')) await indexV3Swaps(latest)
}

async function main() {
    console.log('Standalone indexer starting...')
    console.log('Supabase:', SUPABASE_URL)
    console.log('RPC:', RPC_URL)
    console.log('Mode:', MODE, 'Interval(ms):', INTERVAL_MS, 'MaxRange:', MAX_RANGE)
    try {
        if (!CHAIN_ID) CHAIN_ID = await client.getChainId()
    } catch (e) {
        console.warn('Could not auto-detect chain id, using env or 0. Set INDEXER_CHAIN_ID to avoid this warning.')
        CHAIN_ID = Number(process.env.INDEXER_CHAIN_ID || '0') || 0
    }
    console.log('Chain ID:', CHAIN_ID)
    while (true) {
        try {
            await tick()
        } catch (e) {
            console.error('Indexer tick error:', e)
        }
        await sleep(INTERVAL_MS)
    }
}

main().catch((e) => { console.error(e); process.exit(1) })
