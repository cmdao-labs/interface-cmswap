'use client'
import { wagmiAdapter, projectId } from '@/config/reown'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { bsc, /*base, worldchain,*/ bitkub, jbc, bitkubTestnet } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()
if (!projectId) throw new Error('Project ID is not defined');
createAppKit({
    adapters: [wagmiAdapter],
    networks: [bsc, /*base, worldchain,*/ bitkub, jbc, bitkubTestnet],
    projectId,
    themeMode: 'dark',
    themeVariables: {'--w3m-font-size-master': '8px', '--w3m-z-index': 1000, '--w3m-accent': '#1a1a3a'},
    chainImages: {
        8899: 'https://cmswap.mypinata.cloud/ipfs/bafkreiguxm4at5dehn6s7v2qniim7edqsntdmukwjmgyqkr4rv4aujvbdy',
        96: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u',
        56: 'https://cmswap.mypinata.cloud/ipfs/bafkreifw5yj7khnjb7vm6jpsos5cuzmaasi7gbg4y73lgrsvlnsvwxvlai',
        25925: 'https://cmswap.mypinata.cloud/ipfs/bafkreifelq2ktrxybwnkyabw7veqzec3p4v47aoco7acnzdwj34sn7q56u',
    },
    features: { analytics: true, }
})
function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
export default ContextProvider
