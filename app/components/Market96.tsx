import React, { useState } from "react";
import { ArrowDownUp, X } from "lucide-react";
import { game_tokens } from "../lib/96";
import { useAccount } from "wagmi";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
  readContract,
  readContracts,
  getBalance,
  sendTransaction,
  type WriteContractErrorType,
} from "@wagmi/core";
import { erc20ABI, kap20ABI } from "@/app/lib/96";
import { config } from "@/app/config";
import { formatEther } from "viem";

type Token = {
  name: string;
  logo: string;
  value: string; // แทน address
};

type Order = {
  id: number;
  fromToken: "0xstring";
  toToken: Token;
  amount: number;
  price: number;
  type: "buy" | "sell";
  date: string;
};

const KKUB_LOGO = "./96.png";
const DEFAULT_LOGO = "../favicon.ico";

type TokenPair = {
  name: string; // เช่น "Sola Booster / KKUB"
  desc: string; // เช่น "Metal Valley"
  img1: string; // logo ของ token หรือ placeholder
  img2: string; // logo ของ KKUB (คงที่)
  value: "0xstring";
};

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

function generateTokenPairs(gameTokens: Record<string, Token[]>): TokenPair[] {
  const pairs: TokenPair[] = [];

  for (const [gameName, tokens] of Object.entries(gameTokens)) {
    tokens.forEach((token) => {
      pairs.push({
        name: `${token.name}`,
        desc: gameName,
        img1:
          token.logo && token.logo.trim() !== "" ? token.logo : DEFAULT_LOGO,
        img2: KKUB_LOGO,
        value: token.value as "0xstring",
      });
    });
  }

  // เรียงลำดับ A-Z ตาม name
  pairs.sort((a, b) => a.name.localeCompare(b.name));
  return pairs;
}

function groupOrdersByPrice(orders: Order[], type: "buy" | "sell") {
  const grouped: Record<number, number> = {};

  orders
    .filter((o) => o.type === type)
    .forEach((o) => {
      if (!grouped[o.price]) {
        grouped[o.price] = 0;
      }
      grouped[o.price] += o.amount;
    });

  return Object.entries(grouped)
    .map(([price, amount]) => [parseFloat(price), amount])
    .sort((a, b) => (type === "buy" ? b[0] - a[0] : a[0] - b[0]));
}

function toSlugName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}


export default function Market96({
  setIsLoading,
  setErrMsg,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrMsg: React.Dispatch<
    React.SetStateAction<WriteContractErrorType | null>
  >;
}) {
  const { address } = useAccount();
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState<
    "all" | "Metal Valley" | "Morning Moon Village"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const tokenPairs: TokenPair[] = generateTokenPairs(game_tokens);
  const [select, setSelectToken] = useState(tokenPairs[0]);
  const [kkub, setKKUBbal] = useState(0.0);
  const [tokenBal, setTokenBal] = useState(0.0);
  const [onLoading, setOnLoading] = React.useState(false);
  const [view, setView] = useState<"Orders" | "History">("Orders");

  const baseExpURL = "https://www.kubscan.com/";

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenSlug = urlParams.get("token");

    if (tokenSlug) {
      const matched = tokenPairs.find(
        (pair) => toSlugName(pair.name) === tokenSlug.toLowerCase()
      );

      if (matched && matched.value !== select?.value) {
        setSelectToken(matched);
      }
    }
  }, []);


  React.useEffect(() => {
    if (!select || !address) return;

    const url = new URL(window.location.href);

    // 👇 แปลงชื่อเป็น slug ก่อนใส่ใน URL
    const tokenSlug = toSlugName(select.name);
    url.searchParams.set("token", tokenSlug);
    url.searchParams.set("ref", address);

    window.history.replaceState(null, "", url.toString());
  }, [select, address]);

  function getCurrentLink(select: { name: string } | null, address: string | null): string {
    const url = new URL(window.location.href);

    if (select?.name) {
      const tokenSlug = toSlugName(select.name);
      url.searchParams.set("token", tokenSlug);
    }

    if (address) {
      url.searchParams.set("ref", address);
    }

    return url.toString();
  }


  React.useEffect(() => {
    async function renders() {
      try {
        setOnLoading(true);
        const stateB = await readContracts(config, {
          contracts: [
            {
              ...kap20ABI,
              address: "0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5",
              functionName: "balanceOf",
              args: [address as "0xstring"],
            },
            {
              ...kap20ABI,
              address: select.value,
              functionName: "balanceOf",
              args: [address as "0xstring"],
            },
          ],
        });

        stateB[0].result !== undefined &&
          setKKUBbal(Number(formatEther(stateB[0].result)));
        stateB[1].result !== undefined &&
          setTokenBal(Number(formatEther(stateB[1].result)));
        console.log("kkub Bal", stateB[0].result);
      } catch (error) {
        setOnLoading(false);
      }
      setOnLoading(false);
    }

    renders();
  }, [select]);



  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      fromToken: select.value,
      toToken: { name: "KKUB", logo: "KKUB", value: "0xkkub" },
      amount: 5,
      price: 50,
      type: "sell",
      date: "2025-05-11 12:34:56",
    },
    {
      id: 5,
      fromToken: select.value,
      toToken: { name: "KKUB", logo: "KKUB", value: "0xkkub" },
      amount: 3,
      price: 48.5,
      type: "buy",
      date: "2025-05-11 11:30:00",
    },
    // ... เพิ่ม order อื่น ๆ ตามต้องการ
  ]);

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

  const handleOrder = () => {
    if (!amount || !price) return;
    const newOrder: Order = {
      id: orders.length + 1,
      fromToken: select.value,
      toToken: { name: "KKUB", logo: "KKUB", value: "0xkkub" },
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

  return (
    <div className="min-h-screen min-w-screen  w-full bg-[#0a0b1e] text-white px-6 py-6 mt-[120px]">
      {/* Header */}
      <div className="bg-[#1a1b2e] rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img
              src={select.img1}
              alt="token1"
              className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white"
            />
            <h2 className="text-xl font-bold uppercase text-white">
              {select.name} / KKUB
            </h2>
          </div>

          <p className="text-xs">
            Token Address:{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() =>
                window.open(`${baseExpURL}address/${select.value}`, "_blank")
              }
            >
              {select.value}
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
            <p className="text-lg font-bold text-red-400">
              Maker 0.5% / Taker 0.5%
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Panel: Token Pair */}
        <div className="md:col-span-2 bg-[#1a1b2e] rounded-xl p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Pair</h3>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#2a2b3c] text-sm rounded-lg px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter buttons */}
          <div className="flex space-x-3 mb-4">
            {["all", "metal valley", "Morning Moon Village"].map((f) => {
              const label =
                f === "Morning Moon Village"
                  ? "MMV"
                  : f.charAt(0).toUpperCase() + f.slice(1);

              return (
                <button
                  key={f}
                  onClick={() =>
                    setFilter(
                      f as "all" | "Metal Valley" | "Morning Moon Village"
                    )
                  }
                  className={`px-3 py-1 rounded ${
                    filter === f
                      ? "bg-blue-600 text-white"
                      : "bg-[#2a2b3c] text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <hr className="border-gray-700 mb-4" />

          {/* Token pairs list */}
          <div className="space-y-4 max-h-200 overflow-y-auto pr-2 scrollbar-hide">
            {filteredPairs.length === 0 ? (
              <p className="text-gray-400 text-center">No pairs found</p>
            ) : (
              filteredPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3"
                  onClick={() => setSelectToken(pair)}
                >
                  <div className="relative w-10 h-10">
                    <img
                      src={pair.img1}
                      alt="token1"
                      className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white"
                    />
                    <img
                      src={pair.img2}
                      alt="token2"
                      className="absolute top-0 left-4 w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm uppercase">
                      {pair.name}
                    </p>
                    <p className="text-xs text-gray-400">{pair.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center Panel: Trading */}
        <div className="md:col-span-6 bg-[#1a1b2e] rounded-xl p-6">
          <div className="h-[550px] bg-[#2a2b3c] mb-6 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">[Trading Chart Coming Soon]</span>
          </div>
          {/* Trade Buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setTradeType("buy")}
              className={`w-1/2 py-2 font-semibold rounded-l ${
                tradeType === "buy" ? "bg-green-500" : "bg-[#2a2f45]"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType("sell")}
              className={`w-1/2 py-2 font-semibold rounded-r ${
                tradeType === "sell" ? "bg-red-500" : "bg-[#2a2f45]"
              }`}
            >
              Sell
            </button>
          </div>
          {/* Form */}
          <div className="space-y-4 bg-[#2a2b3c] p-4 rounded-xl">
            {/* Price Input */}
            {tradeType === "buy" ? (
              <div className="text-sm text-gray-400 text-right">
                Your Balance :{" "}
                {kkub.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
                KKUB
              </div>
            ) : (
              <div className="text-sm text-gray-400 text-right">
                Your Balance :{" "}
                {tokenBal.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}{" "}
                {select.name}
              </div>
            )}
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
              <span className="text-xs text-gray-400">{select.name}</span>
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
          <div className="mt-8 w-full px-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-black/30 border border-gray-700 rounded-xl p-3">
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-gray-400 mb-1">Share to your friend, earn <span className="text-emerald-400 font-bold">15%</span></p>
              <p className="font-mono text-[12px] text-white ">
                {getCurrentLink(select, address as '0xstring')}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(getCurrentLink(select, address as '0xstring'))}
              className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg text-black font-bold hover:scale-105 transition-transform"
            >
              Copy
            </button>
          </div>
        </div>

        </div>

        {/* Right Panel: Order Book */}
        <div className="md:col-span-4 bg-[#1a1b2e] rounded-xl p-4 flex flex-col justify-center h-full">
          <h3 className="text-lg font-semibold mb-4 text-white text-center">
            Order Book
          </h3>

          <div className="flex flex-col divide-y divide-gray-700 max-h-[400px] overflow-y-auto">
            {/* Sell Orders */}
            <div className="flex flex-col items-center space-y-2 pb-4 w-full">
              <p className="text-red-400 font-semibold text-center">
                Sell Orders
              </p>
              {groupOrdersByPrice(orders, "sell").map(([price, amount]) => (
                <div
                  key={`sell-${price}`}
                  className="flex justify-center items-center space-x-4 text-sm text-red-200 w-full"
                >
                  <span className="w-1/2 text-center">
                    {price.toFixed(2)} KKUB
                  </span>
                  <span className="w-1/2 text-center">
                    {amount.toFixed(2)} {select.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Buy Orders */}
            <div className="flex flex-col items-center space-y-2 pt-4 w-full">
              <p className="text-green-400 font-semibold text-center">
                Buy Orders
              </p>
              {groupOrdersByPrice(orders, "buy").map(([price, amount]) => (
                <div
                  key={`buy-${price}`}
                  className="flex justify-center items-center space-x-4 text-sm text-green-200 w-full"
                >
                  <span className="w-1/2 text-center">
                    {price.toFixed(2)} KKUB
                  </span>
                  <span className="w-1/2 text-center">
                    {amount.toFixed(2)} SOLA
                  </span>
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
                fromToken: { logo: "SOLA" },
                toToken: { logo: "KKUB" },
                type: "sell",
                price: 2.5,
                amount: 5,
              },
              {
                id: 2,
                date: "2025-05-10 11:20:10",
                fromToken: { logo: "SOLA" },
                toToken: { logo: "KKUB" },
                type: "buy",
                price: 2.4,
                amount: 10,
              },
              {
                id: 3,
                date: "2025-05-09 09:10:25",
                fromToken: { logo: "SOLA" },
                toToken: { logo: "KKUB" },
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
                  {order.fromToken.logo}/{order.toToken.logo}
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
                  {order.amount} {order.fromToken.logo}
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
            <div className="grid grid-cols-7 gap-4 text-sm text-gray-400 font-semibold px-2 py-3 border-b border-gray-700">
              <span className="text-left">Date</span>
              <span className="text-left">Pair</span>
              <span className="text-left">Side</span>
              <span className="text-left">Price</span>
              <span className="text-left">Fee</span>
              <span className="text-left">Amount</span>
              <span className="text-left">Total</span>
            </div>

            {/* Table Rows (Mockup Data) */}
            {[
              {
                id: 1,
                date: "2025-05-11 12:34:56",
                fromToken: { logo: "SOLA" },
                toToken: { logo: "KKUB" },
                type: "sell",
                price: 2.5,
                amount: 5,
              },
              {
                id: 2,
                date: "2025-05-10 11:20:10",
                fromToken: { logo: "SOLA" },
                toToken: { logo: "KKUB" },
                type: "buy",
                price: 2.4,
                amount: 10,
              },
              {
                id: 3,
                date: "2025-05-09 09:10:25",
                fromToken: { logo: "SOLA" },
                toToken: { logo: "KKUB" },
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
                  {order.fromToken.logo}/{order.toToken.logo}
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
                  {order.amount} {order.fromToken.logo}
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
