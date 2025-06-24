'use client'
import React from 'react'

export default function FeeStructurePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-8 bg-gradient-to-br from-slate-900 via-black to-emerald-900 text-white">
      <section className="max-w-4xl w-full mt-[60px] md:mt-[120px] bg-gray-900 bg-opacity-30 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold mb-10 text-[#32ffa7] drop-shadow-lg">Fee Structure</h1>
        <p className="mb-8 text-lg text-gray-300">
          The following fees are charged by the <span className="font-semibold text-white">cmswap.xyz</span> platform:
        </p>
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#0f2d1a]">
                <th className="text-left px-6 py-4 font-semibold text-[#32ffa7] border-b border-[#32ffa7]/50">Function</th>
                <th className="text-left px-6 py-4 font-semibold text-[#32ffa7] border-b border-[#32ffa7]/50">Fee Details</th>
              </tr>
            </thead>
            <tbody>
              {[
                { func: "Swap", detail: "Liquidity Provider Fee : 0.01% - 1% , Frontend Fee : 0%" },
                { func: "Swap : Best Rate", detail: "Frontend Fee : 0%" },
               /*  { func: "Swap", detail: "V3 Fee 0.01% - 1% + FrontEnd Fee 0.3%" }, */
                /* { func: "Trade (P2P)", detail: "Maker Fee 0.5%, Taker Fee 0.5%" }, */
             /*    { func: "Pump Trading on Bonding Curve", detail: "0.5% per transaction" }, */
                { func: "Pump Token Gradulation Fee", detail: "10% when applying gradulation policy" },
                /* {
                  func: "Pump Promode Token Creation Fee",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>KUB chain: 1 KUB per token creation</li>
                      <li>Monad chain: 1 MON per token creation</li>
                    </ul>
                  ),
                },
                {
                  func: "Pump Litemode Token Creation Fee",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>KUB chain: 6000 CMM per token creation</li>
                    </ul>
                  ),
                }, */
              ].map(({ func, detail }, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-[#10381f]" : "bg-[#0d2f19]"}
                >
                  <td className="px-6 py-4 border-b border-[#32ffa7]/30 font-medium text-white">{func}</td>
                  <td className="px-6 py-4 border-b border-[#32ffa7]/30 text-white">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
