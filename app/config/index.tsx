import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { jbc, bsc, bitkub, monadTestnet,bitkubTestnet } from '@reown/appkit/networks'
import { cmChain } from '../lib/88991001'

export const projectId = '1387f8ef666a56825e503ca148275bcb'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [bsc, monadTestnet, bitkub, jbc,cmChain,bitkubTestnet]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
    storage: cookieStorage
}),
    ssr: true,
    projectId,
    networks,
    transports: {
        [monadTestnet.id]: http(process.env.NEXT_PUBLIC_MONAD_RPC as string),
        [cmChain.id]: http('https://cm-rpc.jibl2.com/'), 
    },
})

export const config = wagmiAdapter.wagmiConfig
