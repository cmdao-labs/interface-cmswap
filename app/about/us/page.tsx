'use client'
import React from 'react'

export default function AboutUsPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
            <section className="max-w-4xl w-full mt-[60px] md:mt-[120px]">
                        <h1 className="text-3xl font-bold mb-8">About CMswap</h1>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Swap Overview</h2>
                        <p className="mb-4">
                            CMswap is a decentralized digital asset exchange protocol designed with a focus on efficiency and cost-effectiveness. Built on the Automated Market Maker (AMM) model and powered by Uniswap V3 infrastructure, CMswap significantly enhances capital efficiency, improves liquidity provisioning, and reduces slippage and trading fees for users.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2">The Differences Between CMswap and Traditional AMMs</h2>
                        <p className="mb-4">
                            CMswap adopts the Concentrated Liquidity model, similar to Uniswap V3, allowing liquidity providers to allocate capital within specific price ranges rather than across the entire curve. This approach enables the following benefits:
                        </p>
                        <ul className="list-disc ml-6 mb-4">
                            <li><strong>Enhanced Liquidity Efficiency</strong> – Capital is utilized more effectively, maximizing the return on liquidity.</li>
                            <li><strong>Reduced Trading Slippage</strong> – Market prices become more stable, improving the overall trading experience.</li>
                            <li><strong>Flexible Profit Strategies</strong> – Liquidity providers can implement strategies tailored to their individual risk preferences.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Core Components of CMswap</h2>
                        <p className="mb-4">
                            <strong>Liquidity Provider (LP) – Price Range-Based Liquidity Provision</strong><br />
                            LPs can specify the price range within which they want their liquidity to be active. The system calculates fees based on the selected range, and LPs earn fees from trades executed within those price bounds.
                        </p>
                        <p className="mb-4">
                            <strong>Order Routing – Efficient Trade Matching</strong><br />
                            CMswap utilizes an algorithmic mechanism to identify the most efficient trading routes across multiple liquidity pools, ensuring optimal execution for users.
                        </p>
                        <p className="mb-4">
                            <strong>Fee Tiers – Flexible Fee Structure</strong><br />
                            LPs can choose fee tiers based on the characteristics of the assets they support. Higher-risk or more volatile assets may incur higher fees to compensate for the increased exposure.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 mb-2">How to Use CMswap</h2>
                        <h3 className="text-lg font-medium mt-4 mb-2">Swapping Tokens</h3>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Select the tokens you wish to exchange.</li>
                            <li>The system calculates the exchange rate based on available liquidity.</li>
                            <li>Execute the transaction through a smart contract.</li>
                            <li>Receive the swapped tokens upon successful completion.</li>
                        </ul>
                        <h3 className="text-lg font-medium mt-4 mb-2">Providing Liquidity</h3>
                        <ul className="list-disc ml-6 mb-4">
                            <li>Choose the token pair you want to provide liquidity for.</li>
                            <li>Set the desired fee tier.</li>
                            <li>Define the price range within which your liquidity will be active.</li>
                            <li>Deposit tokens into the smart contract.</li>
                            <li>Earn fees from trades that occur within your specified range.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
                        <ul className="list-disc ml-6 mb-4">
                            <li>CMswap uses code derived from Uniswap V3, which has been audited and is widely accepted in the industry.</li>
                            <li>All operations are On-chain and transparent.</li>
                            <li>The Smart Contract system has been security audited by experts.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Advantages of CMswap</h2>
                        <ul className="list-disc ml-6 mb-4">
                            <li><strong>Flexible Liquidity Management</strong> – LPs can define their own price ranges.</li>
                            <li><strong>Adjustable Fees</strong> – Supports a variety of asset types.</li>
                            <li><strong>Efficient Trade Routing</strong> – Reduces transaction costs.</li>
                            <li><strong>Transparency and Security</strong> – Uses publicly verifiable Smart Contracts.</li>
                        </ul>
                        <p className="mb-4">
                            CMswap enables digital asset exchanges to be efficient, secure, and cost-effective, making it a suitable choice for both traders and liquidity providers.
                        </p>
                    </section>
        </div>
    )
}
