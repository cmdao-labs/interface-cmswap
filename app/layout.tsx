import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { ThemeProvider } from './components/theme-provider'
import ContextProvider from '@/app/context'
import Headbar from './components/Headbar'
import Footer from './components/Footer'
 
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'OpenBBQ',
    description: 'The Future of Permissionless Multiverse',
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
                        <Headbar />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </ContextProvider>
            </body>
        </html>
    )
}
