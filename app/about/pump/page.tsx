'use client'
import React from 'react'

export default function AboutPumpPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
            <section className="max-w-4xl w-full mt-[60px] md:mt-[120px]">
                <h1 className="text-4xl font-bold mb-6 text-white">What is PUMP?</h1>
                <p className="mb-6 leading-relaxed text-gray-200">
                    PUMP is a platform that allows anyone to easily create their own meme coin or utility token directly on-chain. Once deployed, the token is instantly tradable within the same ecosystem, with no need to set up external liquidity or pairings.
                </p>
                <p className="mb-6 leading-relaxed text-gray-200">
                    With a simple, gas-efficient design, PUMP lets communities experiment with token launches, fair pricing curves, and on-chain trading — all from a single contract interface.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Product Variants</h2>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-white">PUMP v1 — Concentrated Uniswap V3 Pool</h3>
                <p className="mb-4 leading-relaxed text-gray-200">
                    This version launches a Uniswap V3 concentrated liquidity pool immediately. The token creator pays a creation fee, which is used to seed the pool with real ETH/token liquidity. Prices are determined based on Uniswap’s AMM math.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-white">PUMP v2 — Virtual Liquidity & Graduation</h3>
                <p className="mb-4 leading-relaxed text-gray-200">
                    PUMP v2 introduces a unique mechanism: <strong>virtual liquidity</strong>. Instead of creating a real Uniswap pool upfront, it simulates one internally using predefined reserves. This allows smoother early trading, limits slippage and bot exploitation, and gives the token time to build value before transitioning to real liquidity.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Why Virtual Liquidity?</h2>
                <p className="mb-4 leading-relaxed text-gray-200">
                    Virtual liquidity lets tokens launch without requiring real intitals Native Token upfront, reducing risk while enabling fairer, organic growth. It creates a simulated bonding curve that mimics deep liquidity, so early trades don't face extreme price impact or bot abuse.
                </p>
                <ul className="list-disc list-inside mb-6 text-gray-200 space-y-1">
                    <li>Prevents front-running and instant rug pulls</li>
                    <li>Controls early price volatility using internal math</li>
                    <li>Requires no upfront liquidity from token creators</li>
                    <li>Allows projects to build community before exposure to open markets</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Why Use a 14x Virtual-to-Graduation Ratio?</h2>
                <p className="mb-4 leading-relaxed text-gray-200">
                    PUMP v2 uses a default ratio where the <strong>graduation reserve</strong> is approximately <strong>14 times larger</strong> than the <strong>virtual reserve</strong>. This is designed to:
                </p>
                <ul className="list-disc list-inside mb-6 text-gray-200 space-y-1">
                    <li>Make early prices conservative — avoiding unrealistic pump values</li>
                    <li>Ensure enough Native Token accumulates before launching a real market</li>
                    <li>Prevent early buyers from dumping after graduation at an inflated virtual price</li>
                </ul>
                <p className="mb-4 leading-relaxed text-gray-200">
                    This ratio encourages long-term sustainability while still allowing organic growth and trading during the early phase.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Before vs After Graduation</h2>
                <p className="mb-4 leading-relaxed text-gray-200">
                    <strong>Before Graduation</strong>, trades happen against simulated liquidity. The price follows a bonding curve that responds to internal reserves and a virtual amount. These trades are fast, low-gas, and immune to DEX bots — but prices can appear high due to limited real backing.
                </p>
                <p className="mb-4 leading-relaxed text-gray-200">
                    <strong>After Graduation</strong>, the contract migrates the token into a real <strong>Uniswap V3 pool</strong> using the actual Native/token reserves accumulated. LP tokens are burned (sent to <code>0xdead</code>) to lock the liquidity permanently.
                </p>
                <p className="mb-4 leading-relaxed text-gray-200">
                    This transition changes pricing logic entirely — now governed by Uniswap’s AMM and the real market price may shift down from the virtual price, especially if the token was overbought early, but the curve becomes real, transparent, and decentralized.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2 text-white">Things to Consider:</h3>
                <ul className="list-disc list-inside mb-6 text-gray-200 space-y-1">
                    <li>If early buyers paid high virtual prices, they may face lower real prices after graduation</li>
                    <li>Gradual accumulation is key — rushing to graduate too early may hurt long-term value</li>
                </ul>

                <p className="mb-10 leading-relaxed text-gray-200">
                    With carefully tuned parameters and a well-timed graduation, PUMP v2 offers a powerful launchpad for long-term, community-first token ecosystems.
                </p>



                <img src="../pump chart1.png" alt="Pump Logic Illustration" className="mb-6 w-full h-auto rounded" />

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">PUMP v1 vs v2 — Comparison</h2>
                <p className="mb-6 leading-relaxed text-gray-200">
                    Both versions follow a similar path: token creation → price discovery → optional migration to Uniswap V3. However, the internal logic and target use cases differ.
                </p>

                <div className="overflow-x-auto text-sm">
                    <table className="w-full border border-gray-600 text-left mb-6">
                        <thead className="bg-emerald-800 text-white">
                            <tr>
                                <th className="p-2 border">Aspect</th>
                                <th className="p-2 border">PUMP v1</th>
                                <th className="p-2 border">PUMP v2</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-200">
                            <tr>
                                <td className="p-2 border font-semibold">Advantages</td>
                                <td className="p-2 border">
                                    - Simple and transparent AMM logic<br />
                                    - Immediate Uniswap V3 liquidity<br />
                                    - Compatible with other DEX aggregators
                                </td>
                                <td className="p-2 border">
                                    - Simulated deep liquidity with virtual reserves<br />
                                    - Smoother early trading experience<br />
                                    - Reduces front-running and bot drain<br />
                                    - Fairer distribution over time
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-semibold">Disadvantages</td>
                                <td className="p-2 border">
                                    - Requires upfront ETH for pool<br />
                                    - High slippage for early trades<br />
                                    - Susceptible to sniping bots
                                </td>
                                <td className="p-2 border">
                                    - Slightly more complex logic<br />
                                    - Needs parameter tuning (virtual amount)<br />
                                    - Higher dev integration cost for edge tools
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-semibold">Use Case Scenario</td>
                                <td className="p-2 border">
                                    A meme project launches with 1B tokens and seeds 0.1 ETH. Early buyer gets a huge portion; later buyers suffer high price impact. Short-term pumps dominate.
                                </td>
                                <td className="p-2 border">
                                    The same project uses v2. With virtual reserves, early buyers receive fewer tokens proportionally, leaving room for community participation. Smoother growth with less dumping.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 border font-semibold">Recommended For</td>
                                <td className="p-2 border">
                                    Instant meme launches, basic test tokens, liquidity-based experiments
                                </td>
                                <td className="p-2 border">
                                    Fair launches, community-driven projects, early-phase DeFi tokens
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
