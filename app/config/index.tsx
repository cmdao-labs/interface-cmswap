import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { jbc } from '@reown/appkit/networks'

export const projectId = '1387f8ef666a56825e503ca148275bcb'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [jbc]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
    storage: cookieStorage
}),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig
