
'use client'
import React from 'react'

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
            <section className="max-w-4xl w-full mt-[60px] md:mt-[120px]">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <p><strong>Effective Date:</strong> 24/06/2025</p>
                <h2 className="text-xl font-semibold mt-6 mb-2">Introduction</h2>
                <p>We respect your privacy. This Privacy Policy describes how we collect, use, and safeguard your information when you use our Web3 platform providing decentralized Swap, P2P Trading, Meme Coin Pump events, and 100% on-chain services.</p>
                <h2 className="text-xl font-semibold mt-6 mb-2">Data Collection</h2>
                <p>As a 100% on-chain platform, we do not collect personal data such as:</p>
                <ul className="list-disc ml-6">
                    <li>Name</li>
                    <li>Email</li>
                    <li>Address</li>
                    <li>Phone number</li>
                </ul>
                <p>However, when you interact with our smart contracts or platform interfaces, the following data may be recorded:</p>
                <ul className="list-disc ml-6">
                    <li>Blockchain wallet address (public key)</li>
                    <li>Transaction data (including token swaps, trades, pump events, or liquidity provisions)</li>
                    <li>On-chain activity linked to your wallet</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">Use of Data</h2>
                <p>We use on-chain data solely for:</p>
                <ul className="list-disc ml-6">
                    <li>Providing platform functionality</li>
                    <li>Displaying real-time trading and swap activities</li>
                    <li>Generating aggregated, non-personal analytics</li>
                </ul>
                <p>We do not sell, rent, or disclose your personal data to third parties, as we do not collect any off-chain personal information.</p>
                <h2 className="text-xl font-semibold mt-6 mb-2">Cookies and Analytics</h2>
                <p>Our web interface may use:</p>
                <ul className="list-disc ml-6">
                    <li>Essential cookies for session management</li>
                    <li>Analytics tools for aggregate traffic insights (non-personalized)</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Links</h2>
                <p>Our platform may include links to third-party services. We are not responsible for their privacy practices.</p>
                <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
                <p>All interactions occur on-chain, reducing central data storage risks. However, users are responsible for:</p>
                <ul className="list-disc ml-6">
                    <li>Securing their private keys</li>
                    <li>Using hardware wallets or secure wallet providers</li>
                    <li>Preventing phishing or social engineering attacks</li>
                </ul>
                <h2 className="text-xl font-semibold mt-6 mb-2">Changes</h2>
                <p>We may update this policy. Continued use of the platform indicates your acceptance of any changes.</p>
            </section>
        </div>
    )
}