import React, { useState } from "react";
import { ArrowDownUp, X } from "lucide-react";
import { game_tokens } from "../lib/96";
import { useAccount } from 'wagmi'
import { simulateContract, waitForTransactionReceipt, writeContract, readContract, readContracts, getBalance, sendTransaction, type WriteContractErrorType } from '@wagmi/core'
import { tokens,  erc20ABI, kap20ABI,CMswapP2PMarketplace, CMswapP2PMarketplaceContract } from '@/app/lib/96'
import { formatEther, parseEther } from 'viem'

import { config } from '@/app/config'

type Token = {
  name: string;
  symbol: string;
  address: string;
};

type Order = {
  id: number;
  fromToken: "0xstring";
  toToken:  "0xstring";
  amount: number;
  price: number;
  type: "buy" | "sell";
  date: string;
};

export default function ExchangePage() {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState<
    "all" | "Metal Valley" | "Morning Moon Village"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const tokenPairs: TokenPair[] = generateTokenPairs(game_tokens);
  const [select, setSelectToken] = useState(tokenPairs[0]); 
  const [kkub,setKKUBbal] = useState(0.00);
  const [tokenBal,setTokenBal] = useState(0.00);
  const [onLoading, setOnLoading] = React.useState(false)
  const [view, setView] = useState<"Orders" | "History">("Orders");
  const feePercent = 0.003; // 0.3%
  const total = price && amount ? parseFloat(price) * parseFloat(amount) : 0;
  const fee = total * feePercent;
  const net = tradeType === "buy" ? total + fee : total - fee;
  const [txupdate, setTxupdate] = React.useState("")
  const [isOnlyFullDecimal, setIsOnlyFullDecimal] = React.useState(false)

  const baseExpURL = "https://www.kubscan.com/";

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenValue = urlParams.get("token");


    if (tokenValue) {
      const matched = tokenPairs.find(
        (pair) => pair.value.toLowerCase() === tokenValue.toLowerCase()
      );
      if (matched && matched.value !== select.value) {
        setSelectToken(matched);
      }
    }
    // ใส่ [] เพื่อรันแค่ตอน mount
    // ถ้า tokenPairs ไม่เปลี่ยนระหว่างรันแอป
  }, []);

  React.useEffect(() => {
    if (!select) return;

    const url = new URL(window.location.href);
    url.searchParams.set("token", select.value);
    // แทนที่ URL ใน browser โดยไม่ reload หน้า
    window.history.replaceState(null, "", url.toString());
  }, [select]);

      const [orders, setOrders] = useState<Order[]>([
      {
        id: 1,
        fromToken: select.value,
        toToken: "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5" as '0xstring',
        amount: 5,
        price: 50,
        type: "sell",
        date: "2025-05-11 12:34:56",
      },
      {
        id: 5,
        fromToken: select.value,
        toToken: "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5" as '0xstring',
        amount: 3,
        price: 48.5,
        type: "buy",
        date: "2025-05-11 11:30:00",
      },
      // ... เพิ่ม order อื่น ๆ ตามต้องการ
    ]);
    

  React.useEffect(() => {
    async function renders(){
      try {
        setOnLoading(true)
         const stateB = await readContracts(config, {
            contracts: [
                { ...kap20ABI, address: "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5", functionName: 'balanceOf', args: [address as '0xstring'] },
                { ...kap20ABI, address: select.value, functionName: 'balanceOf', args: [address as '0xstring'] },
            ]
    })

        stateB[0].result !== undefined && setKKUBbal(Number(formatEther(stateB[0].result)))
        stateB[1].result !== undefined && setTokenBal(Number(formatEther(stateB[1].result)))
        console.log("kkub Bal",stateB[0].result)

      } catch (error) {
        setOnLoading(false)
        
      }
        setOnLoading(false)
      
    }

    renders();
  },[select])

  const placeOrder = async () => {
      let allowanceA;
      let targetToken = tradeType === "buy" ? "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5" : select.value;
      let Cur_amount = tradeType === "buy" ? net.toString() : amount.toString();

      allowanceA = await readContract(config, { ...erc20ABI, address: targetToken as '0xstring', functionName: 'allowance', args: [address as '0xstring', CMswapP2PMarketplace] })

      if (allowanceA < parseEther(Cur_amount)) {
          const { request } = await simulateContract(config, { ...erc20ABI, address: targetToken as '0xstring', functionName: 'approve', args: [CMswapP2PMarketplace, parseEther(Cur_amount)] })
          const h = await writeContract(config, request)
          await waitForTransactionReceipt(config, { hash: h })
      }

      let h, r
      console.log({
        isBuy: tradeType === "buy",
        tokenSale: select.value,
        currency: "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5",
        saleAmount: parseEther(Cur_amount),
        currencyAmount: parseEther(price),
        unitSize: parseEther("1"),
        acceptPartial: !isOnlyFullDecimal,
        referrer: "0x0000000000000000000000000000000000000000"
    })
      const { result, request } = await simulateContract(config, {
          ...CMswapP2PMarketplaceContract,
          functionName: 'createOrder',
          args: [
            tradeType === "buy", // boolean: true for buy, false for sell
            select.value as '0xstring',
            "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5" as '0xstring',
            parseEther(Cur_amount),
            parseEther(price),
            parseEther("1"), // unitSize
            !isOnlyFullDecimal, // acceptPartial: true for partial, false for full units only
            "0x0000000000000000000000000000000000000000" as '0xstring',
          ]
      })
        r = result
        h = await writeContract(config, request)
        await waitForTransactionReceipt(config, { hash: h })
        setTxupdate(h)


  }

  const renderActiveOrder = async () => {
    let orders = await readContract(config, {
      ...CMswapP2PMarketplaceContract,
      functionName: 'getActiveOrdersPaginated',
      args: [
        select.value as '0xstring',
        "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5",
        BigInt(0),
        BigInt(50)
      ]
    });

    console.log("Active Orders", orders);

    const formattedOrders: Order[] = [];

    for (let i = 0; i < orders.length; i++) {
      const data = await readContract(config, {
        ...CMswapP2PMarketplaceContract,
        functionName: 'orders',
        args: [orders[i]]
      });

      const order: Order = {
        id: Number(orders[i]),
        fromToken: data[1] ? data[3] as '0xstring' : data[2] as '0xstring', // buy: from = currency, sell: from = tokenSale
        toToken: data[1] ? data[2] as '0xstring' : data[3] as '0xstring',   // buy: to = tokenSale, sell: to = currency
        amount: Number(data[1] ? data[5] : data[4]) / 1e18, // amount user will spend
        price: Number(data[5]) / Number(data[4]), // price = currencyAmount / saleAmount
        type: data[1] ? 'buy' : 'sell',
        date: new Date(Number(data[10]) * 1000).toISOString()
      };

      formattedOrders.push(order);
      console.log("Formatted Order", order);
    }
    setOrders(formattedOrders)

  };

  const ownerOrder = async () => {
    let orders = await readContract(config, {
      ...CMswapP2PMarketplaceContract,
      functionName: 'getOrdersByMaker',
      args: [
        address as '0xstring',
      ]
    });

    console.log("Active Orders", orders);

    const formattedOrders: Order[] = [];

    for (let i = 0; i < orders.length; i++) {
      const data = await readContract(config, {
        ...CMswapP2PMarketplaceContract,
        functionName: 'orders',
        args: [orders[i]]
      });

      const order: Order = {
        id: Number(orders[i]),
        fromToken: data[1] ? data[3] as '0xstring' : data[2] as '0xstring', // buy: from = currency, sell: from = tokenSale
        toToken: data[1] ? data[2] as '0xstring' : data[3] as '0xstring',   // buy: to = tokenSale, sell: to = currency
        amount: Number(data[1] ? data[5] : data[4]) / 1e18, // amount user will spend
        price: Number(data[5]) / Number(data[4]), // price = currencyAmount / saleAmount
        type: data[1] ? 'buy' : 'sell',
        date: new Date(Number(data[10]) * 1000).toISOString()
      };

      formattedOrders.push(order);
      console.log("Formatted Order", order);
    }
    setOrders(formattedOrders)

  };

  React.useEffect(() => {
    renderActiveOrder();
  }, [select]);


  const filteredPairs = tokenPairs.filter((pair) => {
    // กรองตาม filter
    const matchesFilter =
      filter === "all" || pair.desc.toLowerCase() === filter.toLowerCase();

    // กรองตาม searchTerm (เช็คทั้งชื่อและ desc)
    const matchesSearch =
      pair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.desc.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  const handleCancelOrder = (id: number) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const groupOrdersByPrice = (orders: Order[], type: "buy" | "sell") => {
    const grouped = new Map<number, number>();

    orders
      .filter((o) => o.type === type)
      .forEach((o) => {
        if (grouped.has(o.price)) {
          grouped.set(o.price, grouped.get(o.price)! + o.amount);
        } else {
          grouped.set(o.price, o.amount);
        }
      });

    // Sort descending for sell, ascending for buy
    const sortedEntries = Array.from(grouped.entries()).sort((a, b) =>
      type === "sell" ? b[0] - a[0] : a[0] - b[0]
    );

    return sortedEntries;
  };

  return (
    <div className="min-h-screen min-w-screen  w-full bg-[#0a0b1e] text-white px-6 py-6 mt-[120px]">
      {/* Header */}
      <div className="bg-[#1a1b2e] rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold">{token.name} / KKUB</h2>
          <p className="text-xs">
            Token Address:{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() =>
                window.open(`${baseExpURL}address/${token.address}`, "_blank")
              }
            >
              {token.address}
            </span>
          </p>
        </div>
        <div className="flex space-x-8">
          <div>
            <p className="text-sm text-gray-400">Last Price</p>
            <p className="text-lg font-bold text-green-400">0.5 KKUB</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Trade Fee</p>
            <p className="text-lg font-bold text-red-400">1%</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Panel: My Orders */}
        <div className="md:col-span-2 bg-[#1a1b2e] rounded-xl p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Pair</h3>
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#2a2b3c] text-sm rounded-lg px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Divider */}
          <hr className="border-gray-700 mb-4" />

          {/* Mapping Token Pairs with Scrollable Container */}
          <div className="space-y-4 max-h-200 overflow-y-auto pr-2 scrollbar-hide">
            {tokenPairs.map((pair, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <img
                    src={pair.img1}
                    alt="token1"
                    className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white"
                  />
                  <img
                    src={pair.img2}
                    alt="token2"
                    className="absolute top-0 left-4 w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {pair.name}
                  </p>
                  <p className="text-xs text-gray-400">{pair.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel: Trading */}
        <div className="md:col-span-6 bg-[#1a1b2e] rounded-xl p-6">
          <div className="h-[550px] bg-[#2a2b3c] mb-6 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">[Trading Chart Placeholder]</span>
          </div>

          {/* Trade Buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setTradeType("buy")}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                tradeType === "buy" ? "bg-green-600" : "bg-gray-700"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType("sell")}
              className={`flex-1 py-2 rounded-lg font-semibold ${
                tradeType === "sell" ? "bg-red-600" : "bg-gray-700"
              }`}
            >
              Sell
            </button>
          </div>

          {/* Form */}
<div className="space-y-4 bg-[#2a2b3c] p-4 rounded-xl text-sm">
  {/* Balance Info */}
  <div className="text-right text-gray-400">
    Your Balance:{" "}
    {tradeType === "buy"
      ? `${kkub.toLocaleString(undefined, { maximumFractionDigits: 4 })} KKUB`
      : `${tokenBal.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${select.name}`}
  </div>

  {/* Price Input */}
  <div className="flex items-center justify-between bg-[#1e1f30] p-2 rounded-lg">
    <label className="text-sm text-gray-300 w-28">Price per {select.name}</label>
    <input
      type="number"
      className="bg-transparent text-right w-full mr-2 outline-none"
      placeholder="0.00"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
    <span className="text-xs text-gray-400">KKUB</span>
  </div>

  {/* Amount Input */}
  <div className="flex items-center justify-between bg-[#1e1f30] p-2 rounded-lg">
    <label className="text-sm text-gray-300 w-28">Amount</label>
    <input
      type="number"
      className="bg-transparent text-right w-full mr-2 outline-none"
      placeholder="0"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <span className="text-xs text-gray-400">{select.name}</span>
  </div>

  {/* Summary with Fee */}
  {price && amount && (
    <div className="space-y-1 text-gray-300 bg-[#1e1f30] rounded-lg px-3 py-2">
      <div className="flex justify-between">
        <span>{tradeType === "buy" ? "You Pay (Before Fee)" : "You Receive (Before Fee)"}</span>
        <span>{total.toFixed(8)} KKUB</span>
      </div>
      <div className="flex justify-between">
        <span>Fee (0.3%)</span>
        <span>{fee.toFixed(8)} KKUB</span>
      </div>
      <div className="flex justify-between font-bold text-white">
        <span>{tradeType === "buy" ? "Total You Pay" : "Net You Receive"}</span>
        <span>{net.toFixed(8)} KKUB</span>
      </div>
      <hr className="my-1 border-gray-600" />
      <div className="flex justify-between">
        <span>{tradeType === "buy" ? "You Get" : "You Sell"}</span>
        <span>{amount} {select.name}</span>
      </div>
    </div>
  )}

  {/* Submit Button */}
  <button
    onClick={placeOrder}
    className={`w-full py-2 rounded-lg font-semibold uppercase transition-colors duration-200 ${
      tradeType === "buy"
        ? "bg-green-600 hover:bg-green-700"
        : "bg-red-600 hover:bg-red-700"
    }`}
    disabled={!select?.name}
  >
    {tradeType === "buy" ? "Buy" : "Sell"} {select?.name || ""}
  </button>
</div>

        </div>

      {/* Right Panel: Order Book */}
<div className="md:col-span-4 bg-[#1a1b2e] rounded-xl p-4 flex flex-col justify-center h-full">
  <h3 className="text-lg font-semibold mb-4 text-white text-center">Order Book</h3>

  <div className="flex flex-col divide-y divide-gray-700 max-h-[400px] overflow-y-auto">
    {/* Sell Orders */}
    <div className="flex flex-col items-center space-y-2 pb-4 w-full">
      <p className="text-red-400 font-semibold text-center">Sell Orders</p>
      {groupOrdersByPrice(orders, "sell").map(([price, amount]) => (
        <div
          key={`sell-${price}`}
          className="flex justify-center items-center space-x-4 text-sm text-red-200 w-full"
        >
          <span className="w-1/2 text-center">{price.toFixed(2)} KKUB</span>
          <span className="w-1/2 text-center">{amount.toFixed(2)} SOLA</span>
        </div>
      ))}
    </div>

    {/* Buy Orders */}
    <div className="flex flex-col items-center space-y-2 pt-4 w-full">
      <p className="text-green-400 font-semibold text-center">Buy Orders</p>
      {groupOrdersByPrice(orders, "buy").map(([price, amount]) => (
        <div
          key={`buy-${price}`}
          className="flex justify-center items-center space-x-4 text-sm text-green-200 w-full"
        >
          <span className="w-1/2 text-center">{price.toFixed(2)} KKUB</span>
          <span className="w-1/2 text-center">{amount.toFixed(2)} SOLA</span>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>

      {/* Footer: Tabs + Order Table */}
      <div className="bg-[#1a1b2e] rounded-xl p-6 mt-6">
        {/* Tabs */}
        <div className="flex justify-start space-x-8 mb-6 border-b border-gray-700 pb-2">
          <button
            className={`${
              view === "Orders"
                ? "text-white font-semibold pb-2 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white "
            }`}
            onClick={() => setView("Orders")}
          >
            Orders
          </button>
          <button
            className={`${
              view === "History"
                ? "text-white font-semibold pb-2 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white "
            }`}
            onClick={() => setView("History")}
          >
            Trade History
          </button>
        </div>

        {view === "Orders" && (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 text-sm text-gray-400 font-semibold px-2 py-3 border-b border-gray-700">
              <span className="text-left">Date</span>
              <span className="text-left">Pair</span>
              <span className="text-left">Side</span>
              <span className="text-left">Price</span>
              <span className="text-left">Amount</span>
              <span className="text-left">Total</span>
              <span className="text-center">Action</span>
            </div>

            {/* Table Rows (Mockup Data) */}
            {[
              {
                id: 1,
                date: "2025-05-11 12:34:56",
                fromToken: { symbol: "SOLA" },
                toToken: { symbol: "KKUB" },
                type: "sell",
                price: 2.5,
                amount: 5,
              },
              {
                id: 2,
                date: "2025-05-10 11:20:10",
                fromToken: { symbol: "SOLA" },
                toToken: { symbol: "KKUB" },
                type: "buy",
                price: 2.4,
                amount: 10,
              },
              {
                id: 3,
                date: "2025-05-09 09:10:25",
                fromToken: { symbol: "SOLA" },
                toToken: { symbol: "KKUB" },
                type: "sell",
                price: 2.3,
                amount: 7,
              },
            ].map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-7 gap-4 text-sm text-white items-center px-2 py-4 border-b border-[#2a2b3c]"
              >
                <span className="text-xs text-gray-400">
                  {order.date.split("T")[0]}
                </span>
                <span>
                  {order.fromToken.symbol}/{order.toToken.symbol}
                </span>
                <span
                  className={
                    order.type === "buy" ? "text-green-500" : "text-red-500"
                  }
                >
                  {order.type.toUpperCase()}
                </span>
                <span>{order.price.toFixed(2)} KKUB</span>
                <span>
                  {order.amount} {order.fromToken.symbol}
                </span>
                <span>{(order.amount * order.price).toFixed(2)} KKUB</span>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="text-xs text-red-500 hover:text-red-600 px-3 py-1 rounded bg-[#3e3f4c] hover:bg-[#4f505c] transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {view === "History" && (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 text-sm text-gray-400 font-semibold px-2 py-3 border-b border-gray-700">
              <span className="text-left">Date</span>
              <span className="text-left">Pair</span>
              <span className="text-left">Side</span>
              <span className="text-left">Price</span>
              <span className="text-left">Amount</span>
              <span className="text-left">Total</span>
            </div>

            {/* Table Rows (Mockup Data) */}
            {[
              {
                id: 1,
                date: "2025-05-11 12:34:56",
                fromToken: { symbol: "SOLA" },
                toToken: { symbol: "KKUB" },
                type: "sell",
                price: 2.5,
                amount: 5,
              },
              {
                id: 2,
                date: "2025-05-10 11:20:10",
                fromToken: { symbol: "SOLA" },
                toToken: { symbol: "KKUB" },
                type: "buy",
                price: 2.4,
                amount: 10,
              },
              {
                id: 3,
                date: "2025-05-09 09:10:25",
                fromToken: { symbol: "SOLA" },
                toToken: { symbol: "KKUB" },
                type: "sell",
                price: 2.3,
                amount: 7,
              },
            ].map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-6 gap-4 text-sm text-white items-center px-2 py-4 border-b border-[#2a2b3c]"
              >
                <span className="text-xs text-gray-400">
                  {order.date.split("T")[0]}
                </span>
                <span>
                  {order.fromToken.symbol}/{order.toToken.symbol}
                </span>
                <span
                  className={
                    order.type === "buy" ? "text-green-500" : "text-red-500"
                  }
                >
                  {order.type.toUpperCase()}
                </span>
                <span>{order.price.toFixed(2)} KKUB</span>
                <span>
                  {order.amount} {order.fromToken.symbol}
                </span>
                <span>{(order.amount * order.price).toFixed(2)} KKUB</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
