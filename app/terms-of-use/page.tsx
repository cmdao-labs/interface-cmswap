'use client'
import React from 'react'

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
            <section className="max-w-4xl w-full mt-[60px] md:mt-[120px]">
                <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
                <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
                <p>cmswap.xyz is a decentralized Web3 platform that provides technological infrastructure to facilitate swaps, P2P trading, and pump events on-chain. We are solely a platform provider and do not operate as a financial intermediary, broker, custodian, exchange, or advisor. All interactions occur directly between users via smart contracts without any custodial control or financial management by cmswap.xyz.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Eligibility</h2>
                <ul className="list-disc ml-6">
                    <li>Users must be at least 18 years old.</li>
                    <li>Users must have full legal capacity to use blockchain and Web3 services.</li>
                    <li>Users must not be located in any restricted jurisdictions.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Platform Description</h2>
                <p>Our platform offers:</p>
                <ul className="list-disc ml-6">
                    <li>Decentralized Swap Services (AMM-based and custom liquidity pools)</li>
                    <li>Peer-to-Peer (P2P) Trading</li>
                    <li>Meme Coin Pump Events (high-risk, speculative trading)</li>
                    <li>100% on-chain execution without custodial fund management</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">No Financial Advice</h2>
                <p>We do not provide financial advice, investment recommendations, or guarantee any returns or price performance. Trading involves risk and may result in complete loss of funds.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Risk Disclosure</h2>
                <ul className="list-disc ml-6">
                    <li>Crypto assets are volatile.</li>
                    <li>Meme Pump events involve extreme price swings and speculative trading.</li>
                    <li>Smart contract risks, bugs, or exploits may occur.</li>
                    <li>Regulatory changes may affect platform availability.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Prohibited Activities</h2>
                <ul className="list-disc ml-6">
                    <li>Money laundering or illegal activities</li>
                    <li>Exploiting smart contract vulnerabilities</li>
                    <li>Market manipulation (e.g., wash trading, front-running, insider trading)</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
                <p>We are not liable for loss of funds, smart contract failures, third-party attacks, or regulatory actions.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Intellectual Property</h2>
                <p>All platform logos, designs, and code (excluding open-source components) remain the intellectual property of cmswap.xyz.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
                <p>We reserve the right to suspend or terminate services without prior notice if malicious activity is detected.</p>
            </section>
        </div>
    )
}
