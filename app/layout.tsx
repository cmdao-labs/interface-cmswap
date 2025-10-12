import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { ThemeProvider } from './components/theme-provider'
import ContextProvider from '@/app/context'
import Headbar from './components/Headbar'
import Footer from './components/Footer'
import { PriceProvider } from './context/getPrice'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
  title: 'CMswap',
  description: 'The Future of Permissionless Multiverse',
  keywords: 'CMswap, crypto, cryptocurrency, blockchain, web3, defi, decentralized exchange, dex, multiverse, metaverse, permissionless trading, smart contracts, ethereum, bnb chain, polygon, arbitrum, zk rollups, liquidity pool, token swap, crypto swap, yield farming, staking, crypto wallet, wallet connect, secure crypto trading, low fee crypto, future of finance, non-custodial exchange, cross chain, multichain swap, instant settlement, on-chain trading, digital asset, DeFi 2.0, crypto tools, permissionless finance, decentralized apps, crypto ecosystem, CMswap platform, trade crypto easily, next-gen DEX, crypto liquidity, secure DEX, swap crypto tokens, best DEX for beginners, gasless crypto trading, low cap gem swap, earn with staking, swap meme coins, multichain defi project, privacy-first DEX, mobile-friendly crypto platform, DEX for Thai users, swap new launch tokens, community-driven DEX, invest in multiverse, passive income crypto, no KYC trading, Web3 onboarding platform',
  openGraph: {
    title: 'CMswap',
    description: 'The Future of Permissionless Multiverse',
    url: 'https://cmswap.xyz',
    siteName: 'CMswap',
    images: [
      {
        url: 'https://cmswap.mypinata.cloud/ipfs/bafkreibddbfpmsborzagg6whymuoprpv53wuzlbaac4ri7fflowjl562qu',
        width: 1200,
        height: 630,
        alt: 'CMswap Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMswap',
    description: 'The Future of Permissionless Multiverse',
    images: ['https://cmswap.mypinata.cloud/ipfs/bafkreibddbfpmsborzagg6whymuoprpv53wuzlbaac4ri7fflowjl562qu'],
    site: '@CMswap',
    creator: '@CMswap',
  },
  metadataBase: new URL('https://cmswap.xyz'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default async function RootLayout({ 
    children, 
}: {
    children: React.ReactNode
}) {
    const headersObj = await headers()
    const cookies = headersObj.get('cookie')

    return (
        <html lang="en" className={inter.className}>
            <body>
                <ContextProvider cookies={cookies}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                      <PriceProvider>
                        <Headbar />
                        {children}
                        <Footer />
                      </PriceProvider>
                    
                    </ThemeProvider>
                </ContextProvider>
            </body>
        </html>
    )
}
