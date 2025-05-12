import React, { useState } from "react";
import { ExternalLink, X } from "lucide-react";

type Token = {
  name: string;
  symbol: string;
  address: string;
};

type Order = {
  id: number;
  fromToken: Token;
  toToken: Token;
  amount: number;
  price: number;
  type: "buy" | "sell";
  date: string;
};

export default function ExchangePage() {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [view, setView] = useState("Orders");
  const token: Token = {
    name: "SOLA BOOSTER",
    symbol: "SOLA",
    address: "0x1234567890abcdef1234567890abcdef12345678",
  };
  const baseExpURL = "https://www.kubscan.com/";

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 5,
      price: 50,
      type: "sell",
      date: "2025-05-11 12:34:56",
    },
    {
      id: 5,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 48.5,
      type: "buy",
      date: "2025-05-11 11:30:00",
    },
    {
      id: 2,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 48.5,
      type: "buy",
      date: "2025-05-11 11:30:00",
    },
    {
      id: 3,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 48.5,
      type: "buy",
      date: "2025-05-11 11:30:00",
    }, {
      id: 4,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 5,
      price: 50,
      type: "sell",
      date: "2025-05-11 12:34:56",
    }, {
      id: 6,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 5,
      price: 51,
      type: "sell",
      date: "2025-05-11 12:34:56",
    }, {
      id: 7,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 49,
      type: "sell",
      date: "2025-05-11 12:34:56",
    },{
      id: 8,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 48.5,
      type: "sell",
      date: "2025-05-11 12:34:56",
    },{
      id: 9,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 47,
      type: "sell",
      date: "2025-05-11 12:34:56",
    },{
      id: 10,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 49,
      type: "buy",
      date: "2025-05-11 12:34:56",
    },{
      id: 11,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 3,
      price: 45,
      type: "buy",
      date: "2025-05-11 12:34:56",
    },{
      id: 12,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 48,
      price: 40,
      type: "buy",
      date: "2025-05-11 12:34:56",
    },{
      id: 13,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 47,
      price: 40.5,
      type: "buy",
      date: "2025-05-11 12:34:56",
    },
  ]);

  const tokenPairs = [
    {
      name: "SOLA BOOSTER / KKUB",
      desc: "Metal Valley",
      img1: "https://cryptologos.cc/logos/solana-sol-logo.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "MinerK / KKUB",
      desc: "Metal Valley",
      img1: "https://cdn-icons-png.flaticon.com/512/4332/4332625.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Carrot Seed / KKUB",
      desc: "Morning Moon Village",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Cabbage Seed / KKUB",
      desc: "Morning Moon Village",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Honeycomb / KKUB",
      desc: "Morning Moon Village",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Raw Diamond / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Raw Ruby / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    },
    {
      name: "Apple / KKUB",
      desc: "Bitkub Metaverse",
      img1: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
      img2: "https://cryptologos.cc/logos/kubecoin-kubc-logo.png"
    }
  ];

  const handleOrder = () => {
    const newOrder: Order = {
      id: orders.length + 1,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: parseFloat(amount),
      price: parseFloat(price),
      type: tradeType,
      date: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
    setPrice("");
    setAmount("");
  };

  const handleCancelOrder = (id: number) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const groupOrdersByPrice = (orders: Order[], type: 'buy' | 'sell') => {
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
          <div className="space-y-4 max-h-100 overflow-y-auto pr-2 scrollbar-hide">
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
                  <p className="text-white font-semibold text-sm">{pair.name}</p>
                  <p className="text-xs text-gray-400">{pair.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Center Panel: Trading */}
        <div className="md:col-span-6 bg-[#1a1b2e] rounded-xl p-6">
          <div className="h-48 bg-[#2a2b3c] mb-6 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">[Trading Chart Placeholder]</span>
          </div>

          {/* Trade Buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setTradeType("buy")}
              className={`flex-1 py-2 rounded-lg font-semibold ${tradeType === "buy" ? "bg-green-600" : "bg-gray-700"
                }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType("sell")}
              className={`flex-1 py-2 rounded-lg font-semibold ${tradeType === "sell" ? "bg-red-600" : "bg-gray-700"
                }`}
            >
              Sell
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 bg-[#2a2b3c] p-4 rounded-xl">
            {/* Price Input */}
            <div className="flex items-center justify-between bg-[#1e1f30] p-2 rounded-lg">
              <label className="text-sm text-gray-300 w-24">Price</label>
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
              <label className="text-sm text-gray-300 w-24">Amount</label>
              <input
                type="number"
                className="bg-transparent text-right w-full mr-2 outline-none"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="text-xs text-gray-400">{token.symbol}</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-sm text-gray-400 px-2">
              <span>Total</span>
              <span className="font-bold text-white">
                {price && amount
                  ? (parseFloat(price) * parseFloat(amount)).toFixed(4)
                  : "0.00"}{" "}
                KKUB
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleOrder}
              className={`w-full py-2 rounded-lg font-semibold ${tradeType === "buy" ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {tradeType === "buy" ? "BUY" : "SELL"} {token.symbol}
            </button>
          </div>
        </div>

{/* Right Panel: Order Book */}
<div className="md:col-span-4 bg-[#1a1b2e] rounded-xl p-4">
  <h3 className="text-lg font-semibold mb-4 text-white">Order Book</h3>

  {/* Sell Orders */}
  <div className="space-y-2 mb-6">
    <p className="text-red-400 font-semibold">Sell Orders</p>
    {groupOrdersByPrice(orders, "sell").map(([price, amount]) => (
      <div key={`sell-${price}`} className="flex justify-between text-sm text-red-200">
        <span>{price.toFixed(2)} KKUB</span>
        <span>{amount.toFixed(2)} SOLA</span>
      </div>
    ))}
  </div>

  {/* Buy Orders */}
  <div className="space-y-2">
    <p className="text-green-400 font-semibold">Buy Orders</p>
    {groupOrdersByPrice(orders, "buy").map(([price, amount]) => (
      <div key={`buy-${price}`} className="flex justify-between text-sm text-green-200">
        <span>{price.toFixed(2)} KKUB</span>
        <span>{amount.toFixed(2)} SOLA</span>
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Footer: Tabs + Order Table */}
      <div className="bg-[#1a1b2e] rounded-xl p-6 mt-6">
        {/* Tabs */}
        <div className="flex justify-start space-x-8 mb-6 border-b border-gray-700 pb-2">
          <button
            className={`${view === "Orders"
              ? "text-white font-semibold pb-2 border-b-2 border-green-500"
              : "text-gray-400 hover:text-white "
              }`}
            onClick={() => setView("Orders")}
          >
            Orders
          </button>
          <button
            className={`${view === "History"
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
