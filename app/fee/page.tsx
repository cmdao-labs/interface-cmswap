"use client";
import React from "react";

export default function FeeStructurePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white px-4 py-8 md:py-16">
      <section className="w-full max-w-4xl bg-gray-800 border border-green-400/30 rounded-xl p-8 shadow-sm">
        <h1 className="text-4xl font-extrabold mb-10 text-white "> {/**text-[#32ffa7] */}
          Fee Structure
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          The following fees are charged by the{" "}
          <span className="font-semibold text-white">cmswap.xyz</span> platform:
        </p>
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className=""> {/**bg-[#0f2d1a] */}
                <th className="text-left px-6 py-4 font-semibold text-[#32ffa7] border-b border-[#32ffa7]/50">
                  Function
                </th>
                <th className="text-left px-6 py-4 font-semibold text-[#32ffa7] border-b border-[#32ffa7]/50">
                  Fee Details
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  func: "Swap",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>Liquidity Provider Fee : 0.01% - 1% </li>
                      <li>Frontend Fee : 0%</li>
                    </ul>
                  ),
                },
                {
                  func: "Swap : Best Rate",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>
                        Liquidity Provider Fee: Varies based on third-party swap
                        charges.
                      </li>
                      <li>Frontend Fee : 0%</li>
                    </ul>
                  ),
                },
                /*  { func: "Swap", detail: "V3 Fee 0.01% - 1% + FrontEnd Fee 0.3%" }, */
                /* { func: "Trade (P2P)", detail: "Maker Fee 0.5%, Taker Fee 0.5%" }, */
                /*    { func: "Pump Trading on Bonding Curve", detail: "0.5% per transaction" }, */
                {
                  func: "Pump Creation Fee",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>Kub : 1 KUB for intitials liquidity position.</li>
                      <li>Monad : 1 MON for intitials liquidity position.</li>
                      <li>Kub Testnet : 0 tKUB (Virtual Liquidity) </li>
                    </ul>
                  ),
                },
                {
                  func: "Pump Swap Fee",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>Liquidity Position Fee : 1% </li>
                      <li>Frontend Fee : 0%</li>
                    </ul>
                  ),
                },
                {
                  func: "Pump Token Gradulation Fee",
                  detail: (
                    <ul className="list-disc list-inside ml-4 text-white">
                      <li>10% when applying gradulation policy </li>
                    </ul>
                  ),
                },

                /*{
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
                  /* className={i % 2 === 0 ? "bg-[#10381f]" : "bg-[#0d2f19]"} */
                >
                  <td className="px-6 py-4 border-b border-[#32ffa7]/30 font-medium text-white">
                    {func}
                  </td>
                  <td className="px-6 py-4 border-b border-[#32ffa7]/30 text-white">
                    {detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
