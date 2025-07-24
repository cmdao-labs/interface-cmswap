'use client'
import React from 'react'

export default function AboutTradingViewPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
            <section className="max-w-4xl w-full mt-[60px] md:mt-[120px]">
                <h1 className="text-4xl font-bold mb-6 text-white">What Is PUMP?</h1>
                <p className="mb-6 leading-relaxed text-gray-200">
                    PUMP is a lightweight token launch platform built for on-chain experimentation. It allows anyone to instantly create a new ERC20 token with an integrated price curve and a built-in buy/sell mechanism — no liquidity pool required at launch. As tokens gain traction, they automatically “graduate” into Uniswap V3 with real liquidity.
                </p>
                <p className="mb-6 leading-relaxed text-gray-200">
                    The goal is to enable fair token launches without needing complex setups or seed liquidity. Every project begins with a fixed curve and pre-minted supply, and progresses based on community-driven trading activity.
                </p>

                <img src="../pump chart1.png" alt="Pump Logic Illustration" className="mb-6 w-full h-auto rounded" />

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">PUMP v1 vs v2 — What's the Difference?</h2>
                <p className="mb-6 leading-relaxed text-gray-200">
                    Both versions follow the same high-level logic: token creation → curve-based price discovery → Uniswap V3 graduation. But the internal logic and behavior differ significantly.
                </p>

       <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Pros & Cons</h2>
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
          - Simple and minimal logic<br />
          - Low gas consumption<br />
          - Instant price reflection after every trade
        </td>
        <td className="p-2 border">
          - Simulated deep liquidity using virtual reserves<br />
          - Smoother price curve during early trading<br />
          - Prevents large buyers from draining token supply<br />
          - Better UX for communities launching fair tokens
        </td>
      </tr>
      <tr>
        <td className="p-2 border font-semibold">Disadvantages</td>
        <td className="p-2 border">
          - High slippage for early buyers<br />
          - Easily manipulated by bots<br />
          - Often unfair token distribution in early stage
        </td>
        <td className="p-2 border">
          - Slightly more complex logic<br />
          - Requires tuning of virtualAmount<br />
          - Slightly higher gas usage
        </td>
      </tr>
      <tr>
        <td className="p-2 border font-semibold">Use Case Scenario</td>
        <td className="p-2 border">
          Alice buys 0.1 ETH worth of a new token. With shallow liquidity, she receives 800M out of 1B tokens.
          Later buyers get almost nothing, causing immediate dumps and low retention.
        </td>
        <td className="p-2 border">
          Alice buys the same 0.1 ETH, but with virtual reserves simulating deeper liquidity, she receives only 150M tokens.
          This leaves room for other buyers, encourages organic price movement, and makes the launch feel more fair.
        </td>
      </tr>
      <tr>
        <td className="p-2 border font-semibold">Recommended For</td>
        <td className="p-2 border">
          Meme coins or test projects where launch speed is more important than fairness
        </td>
        <td className="p-2 border">
          Fair launches, DeFi tools, or community-driven tokens aiming for organic growth and better market structure
        </td>
      </tr>
    </tbody>
  </table>
</div>

{/* 
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Real-World Analogy</h2>
                <p className="mb-4 leading-relaxed text-gray-200">
                    <strong>PUMP v1:</strong> Think of it like a simple vending machine — the price changes fast depending on demand. If someone buys a lot, the next price increases instantly.
                </p>
                <p className="mb-4 leading-relaxed text-gray-200">
                    <strong>PUMP v2:</strong> It's more like a dampened scale — early trades don’t cause big jumps. The system simulates a much larger “virtual” pool, making the price feel smoother and less volatile.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Which Version Should You Use?</h2>
                <ul className="list-disc ml-6 mb-6 space-y-2">
                    <li><strong>PUMP v1</strong> — Great for fast, raw token launches where speed and simplicity matter.</li>
                    <li><strong>PUMP v2</strong> — Ideal for fair launches and community coins where stability and trust are key.</li>
                </ul>

                <p className="mt-10 leading-relaxed text-gray-300">
                    Whether you're launching a meme, utility token, or experimental asset, the PUMP framework gives you a lightweight foundation with native pricing logic — no need for pre-seeded liquidity pools or external funding.
                </p>

                <p className="mt-10 text-sm text-muted-foreground">
                    Explore more or deploy your own version — the pump is yours to control.
                </p> */}
            </section>
        </div>
    )
}
