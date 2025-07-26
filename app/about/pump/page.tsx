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

                <h3 className="text-xl font-semibold mt-6 mb-2 text-white">PUMP v2 — Virtual Liquidity Curve</h3>
                <p className="mb-4 leading-relaxed text-gray-200">
                    PUMP v2 introduces a new mechanism: virtual liquidity. Instead of deploying a Uniswap pool upfront, it simulates one internally using predefined reserves. This makes early trades smoother and less vulnerable to slippage or front-running, while giving the token time to grow before “graduating” into real liquidity.
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
