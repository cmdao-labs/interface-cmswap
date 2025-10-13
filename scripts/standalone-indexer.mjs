// Env required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Optional: KUBTESTNET_RPC (default https://rpc-testnet.bitkubchain.io) / INDEXER_INTERVAL_MS (default 3000) / INDEXER_MAX_RANGE (default 2000) / INDEXER_MODE (all|creation|swap|transfer, default all)
import { createPublicClient, decodeFunctionData, http, formatEther } from 'viem'
import { bitkubTestnet } from 'viem/chains'
import { erc20Abi } from 'viem'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const FACTORY_ADDR = '0x46a4073c830031ea19d7b9825080c05f8454e530'
const START_BLOCK = 23935659n

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
const RPC_URL = process.env.KUBTESTNET_RPC || 'https://rpc-testnet.bitkubchain.io'

const client = createPublicClient({ chain: bitkubTestnet, transport: http(RPC_URL) })

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

async function getLastBlock(stream) {
    const rows = await restGet('index_state', `select=last_block&stream=eq.${encodeURIComponent(stream)}&limit=1`)
    if (!rows || rows.length === 0) return START_BLOCK
    return BigInt(rows[0].last_block)
}

async function setLastBlock(stream, block) {
    await restUpsert('index_state', [{ stream, last_block: String(block) }], 'stream')
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
            address: l.args?.tokenAddr ?? '',
            symbol: null,
            name: null,
            creator: l.args?.creator ?? null,
            created_time: l.args?.createdTime ? String(l.args.createdTime) : null,
            logo: l.args?.logo ?? null,
            description: l.args?.description ?? null,
        }))
        await restUpsert('tokens', rows, 'address')
        for (const r of rows) {
            try {
                const symbol = await client.readContract({ address: r.address, abi: erc20Abi, functionName: 'symbol' })
                const name = await client.readContract({ address: r.address, abi: erc20Abi, functionName: 'name' })
                await restUpsert('tokens', [{ address: r.address, symbol, name }], 'address')
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
            await restUpsert('swaps', rows, 'tx_hash,log_index')
        }
        await setLastBlock('swap', to)
        from = to + 1n
    }
}

async function indexTransfers(latest) {
    const tokens = await restGet('tokens', 'select=address')
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
                    token_address: token,
                    block_number: String(l.blockNumber),
                    log_index: Number(l.logIndex ?? 0),
                    tx_hash: l.transactionHash,
                    from_addr: l.args?.from ?? null,
                    to_addr: l.args?.to ?? null,
                    amount: l.args?.value ? String(l.args.value) : null,
                    timestamp: blockMap.get(String(l.blockNumber)) || null,
                }))
                await restUpsert('transfers', rows, 'tx_hash,log_index')
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
}

async function main() {
    console.log('Standalone indexer starting...')
    console.log('Supabase:', SUPABASE_URL)
    console.log('RPC:', RPC_URL)
    console.log('Mode:', MODE, 'Interval(ms):', INTERVAL_MS, 'MaxRange:', MAX_RANGE)
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
