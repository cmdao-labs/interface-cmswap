'use client'
import { wagmiAdapter, projectId } from '@/app/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { jbc, bsc, bitkub, base, monadTestnet, bitkubTestnet } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

const modal = createAppKit({
  adapters: [wagmiAdapter],
    networks: [bsc, monadTestnet, bitkub, jbc,bitkubTestnet],
    projectId,
    themeMode: 'dark',
    themeVariables: {
        '--w3m-font-size-master': '8px',
        '--w3m-z-index': 1000, 
        '--w3m-accent': '#1a1a3a',
    },
    chainImages: {
        8899: '/8899.png',
        96: '/96.png',
        56: '/56.png',
        10143: '/monad.jpg',
        25925: '/96.png',

    },
    features: {
        analytics: true,
    }
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
