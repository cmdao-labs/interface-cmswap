import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { jbc, bsc, bitkub, monadTestnet, bitkubTestnet } from '@reown/appkit/networks'

export const projectId = '1387f8ef666a56825e503ca148275bcb'

if (!projectId) throw new Error('Project ID is not defined');

export const networks = [bitkub, bsc, monadTestnet, jbc, bitkubTestnet]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({ storage: cookieStorage }),
    ssr: true,
    projectId,
    networks,
    transports: {
        [monadTestnet.id]: http(process.env.NEXT_PUBLIC_MONAD_RPC as string),
    },
})

export const config = wagmiAdapter.wagmiConfig
