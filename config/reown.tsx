import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bitkub, base, worldchain, bsc, jbc, bitkubTestnet, } from '@reown/appkit/networks'

export const projectId = '1387f8ef666a56825e503ca148275bcb'
if (!projectId) throw new Error('Project ID is not defined');
export const networks = [bitkub, base, worldchain, bsc, jbc, bitkubTestnet,]
export const wagmiAdapter = new WagmiAdapter({ storage: createStorage({ storage: cookieStorage }), ssr: true, projectId, networks, transports: {} })
export const config = wagmiAdapter.wagmiConfig
