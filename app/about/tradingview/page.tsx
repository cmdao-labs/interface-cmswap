'use client'
import React from 'react'

export default function AboutTradingViewPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
            <section className="max-w-4xl w-full mt-[60px] md:mt-[120px]">
                <h1 className="text-4xl font-bold mb-6 text-white">Getting Started with TradingView</h1>
                <p className="mb-6 leading-relaxed text-gray-200">
                    TradingView is one of the most popular platforms for analyzing price charts, tracking market movements, and exploring ideas shared by traders worldwide. Whether you're new to trading or a seasoned investor, TradingView provides powerful tools to help you make smarter, data-driven decisions.
                </p>
                <img src="../trading chart3.webp" alt="TradingView Logo" className="mb-6 w-full h-auto" />

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white"> What Makes TradingView Unique?</h2>
                <ul className="list-disc ml-6 mb-6 space-y-2">
                    <li><strong>Live Market Charts</strong> — View real-time charts for crypto, stocks, forex, and more from global exchanges.</li>
                    <li><strong>Custom Indicators</strong> — Apply technical indicators or create your own using Pine Script.</li>
                    <li><strong>Set Smart Alerts</strong> — Get notified when prices or conditions meet your criteria.</li>
                    <li><strong>Strategy Testing</strong> — Backtest your trading ideas using historical data.</li>
                    <li><strong>Community & Collaboration</strong> — Discover and share strategies with millions of traders around the world.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white"> Why Crypto Traders Love It</h2>
                <p className="mb-6 leading-relaxed text-gray-200">
                    For crypto enthusiasts, TradingView is a game-changer. With real-time data from top exchanges and DeFi integrations, you can monitor your favorite tokens, track key support/resistance levels, and plan entries or exits with precision — all from a sleek, responsive interface.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white"> Getting Started is Easy</h2>
                <ul className="list-decimal ml-6 mb-6 space-y-2">
                    <li>Visit <a href="https://www.tradingview.com/" target="_blank" className="underline text-emerald-400">tradingview.com</a></li>
                    <li>Create a free account to unlock basic features</li>
                    <li>Explore charts, add indicators, and set up alerts</li>
                    <li>Follow top traders or publish your own ideas</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-white"> Perfect for Every Trader</h2>
                <ul className="list-disc ml-6 mb-6 space-y-2">
                    <li><strong>Beginner-Friendly</strong> — Clean UI and educational content make it easy to learn.</li>
                    <li><strong>Pro-Level Tools</strong> — Get advanced drawing tools, indicators, and multi-chart layouts.</li>
                    <li><strong>Cross-Device Access</strong> — Use it on web, desktop, and mobile seamlessly.</li>
                    <li><strong>Integration Ready</strong> — Many wallets and DeFi protocols embed TradingView directly.</li>
                </ul>

                <p className="mt-10 leading-relaxed text-gray-300">
                    Whether you’re just starting out or refining your trading strategy, TradingView gives you the clarity and control you need — all in one place. From smart charts to social ideas, it’s your go-to platform to stay ahead of the curve.
                </p>

                <p className="mt-10 text-sm text-muted-foreground">
                    Learn more at <a href="https://www.tradingview.com/" target="_blank" className="underline text-emerald-400">TradingView.com</a>
                </p>
            </section>
        </div>
    )
}
