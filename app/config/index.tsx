import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { jbc, bsc, bitkub, unichain, base } from '@reown/appkit/networks'

export const projectId = '1387f8ef666a56825e503ca148275bcb'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [jbc, bsc, bitkub, unichain, base]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
    storage: cookieStorage
}),
    ssr: true,
    projectId,
    networks,
    transports: {
        [unichain.id]: http(process.env.UNI_RPC),
        [base.id]: http(process.env.BASE_RPC),
    },
})

export const config = wagmiAdapter.wagmiConfig
