import React, { useState } from "react";
import { ArrowDownUp, X } from "lucide-react";
import {
  game_tokens,
  tokens,
  CMswapP2PMarketplace,
  CMswapP2PMarketplaceContract,
  AddrZero,
  faucetTestTokenContract,
} from "../lib/25925";
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
import { erc20ABI, kap20ABI } from "@/app/lib/25925";
import { config } from "@/app/config";
import { formatEther, parseEther } from "viem";

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
  return name.toLowerCase().replace(/\s+/g, "-");
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
  const [ref, setRef] = React.useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [txupdate, setTxupdate] = React.useState("");
  const [lastPrice, setLastPrice] = React.useState("");

  const [uorders, setUOrders] = useState<
    Array<{
      id: number;
      date: string;
      tokenSymbol: string;
      type: string;
      price: number;
      amount: number;
      filledAmount: number;
      cancelAt: number;
      feeLocked: number;
    }>
  >([]);

  const [orders, setOrders] = useState<Order[]>([]);

  const currencyAddr = tokens[2].value;
  const currencySymbol = tokens[2].name;
  const baseExpURL = "https://www.kubscan.com/";

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenSlug = urlParams.get("token");

    const existingRef = localStorage.getItem("referral_code");

    if (
      ref?.startsWith("0x") &&
      existingRef &&
      existingRef !== AddrZero &&
      existingRef !== address
    ) {
      setRef(existingRef);
    }

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

    const tokenSlug = toSlugName(select.name);
    url.searchParams.set("token", tokenSlug);
    url.searchParams.set("ref", address);

    window.history.replaceState(null, "", url.toString());
  }, [select, address]);

  function getCurrentLink(
    select: { name: string } | null,
    address: string | null
  ): string {
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

  function matchTokenByAddress(addr: string): Token | undefined {
    const pair = tokenPairs.find(
      (token) => token.value.toLowerCase() === addr.toLowerCase()
    );
    if (pair) {
      return {
        name: pair.name,
        logo: pair.img1,
        value: pair.value,
      };
    }
    return undefined;
  }

  async function renders() {
    try {
      setOnLoading(true);
      const stateB = await readContracts(config, {
        contracts: [
          {
            ...kap20ABI,
            address: currencyAddr,
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
      console.log("testKUB Bal", stateB[0].result);
    } catch (error) {
      setOnLoading(false);
    }
    setOnLoading(false);
  }

  async function fetchMyOrders(address: `0x${string}`) {
    console.log(`Fetch order of ${address}`);
    try {
      const result = await readContracts(config, {
        contracts: [
          {
            ...CMswapP2PMarketplaceContract,
            functionName: "getMyOrders",
            args: [address],
          },
        ],
      });

      const rawOrders = result[0]?.result;
      console.log("order", result[0]?.result);
      if (!rawOrders || rawOrders.length < 2) {
        console.warn("No orders found or unexpected structure.");
        return;
      }

      const [orderIds, orderDetails] = rawOrders;

      console.log("Order IDs:", orderIds);
      console.log("Order Details:", orderDetails);

      const mappedOrders = orderDetails.map((order: any, index: number) => {
        const amount = Number(order.amount) / 1e18;
        const price = Number(order.pricePerUnit) / 1e18;
        const tokenSymbolObj = matchTokenByAddress(order.token);
        const tokenSymbol = tokenSymbolObj ? tokenSymbolObj.name : "Unknown";

        const filledAmount = Number(order.filledAmount) / 1e18;
        const cancelAt = Number(order.cancelAt);
        const feeLocked = Number(order.lockedFee) /1e18;

        return {
          id: Number(orderIds[index]),
          date: new Date().toISOString().slice(0, 19).replace("T", " "),
          tokenSymbol,
          type: order.isBuy ? "buy" : "sell",
          price,
          amount,
          filledAmount,
          cancelAt,
          feeLocked
        };
      });

      setUOrders(mappedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  function mapDepthToOrders(
    rawDepth: [bigint[], bigint[], bigint[]],
    type: "buy" | "sell",
    fromTokenAddr: string,
    toToken: Token
  ): Order[] {
    const [ids, prices, amounts] = rawDepth;

    return ids.map((id, index) => ({
      id: Number(id),
      fromToken: fromTokenAddr as "0xstring",
      toToken: toToken,
      amount: Number(amounts[index]) / 1e18,
      price: Number(prices[index]) / 1e18,
      type,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    }));
  }

  async function fetchOrderData() {
    let result = await readContracts(config, {
      contracts: [
        {
          ...CMswapP2PMarketplaceContract,
          functionName: "getLastTradePrice",
          args: [select.value, currencyAddr],
        },
      ],
    });
    if (result[0].result !== undefined) {
      setLastPrice(formatEther(result[0].result));
    }

    let result_depth = await readContracts(config, {
      contracts: [
        {
          ...CMswapP2PMarketplaceContract,
          functionName: "getOrderBookDepth",
          args: [select.value, currencyAddr, true, BigInt(50)],
        },
        {
          ...CMswapP2PMarketplaceContract,
          functionName: "getOrderBookDepth",
          args: [select.value, currencyAddr, false, BigInt(50)],
        },
      ],
    });

    const newOrders: Order[] = [];

    if (
      result_depth[0]?.result &&
      Array.isArray(result_depth[0].result[0]) &&
      result_depth[0].result[0].length > 0
    ) {
      const buyOrders = mapDepthToOrders(
        result_depth[0].result as [bigint[], bigint[], bigint[]],
        "buy",
        select.value,
        { name: "KKUB", logo: "KKUB", value: "0xkkub" }
      );
      console.log("buy depth", buyOrders);
      newOrders.push(...buyOrders);
    }

    if (
      result_depth[1]?.result &&
      Array.isArray(result_depth[1].result[0]) &&
      result_depth[1].result[0].length > 0
    ) {
      const sellOrders = mapDepthToOrders(
        result_depth[1].result as [bigint[], bigint[], bigint[]],
        "sell",
        select.value,
        { name: "KKUB", logo: "KKUB", value: "0xkkub" }
      );

      console.log("sell depth", sellOrders);
      newOrders.push(...sellOrders);
    }

    if (newOrders.length > 0) {
      setOrders(newOrders); // หรือ setOrders(prev => [...prev, ...newOrders]) ถ้าต้องการสะสม
    } else {
      console.warn("No valid buy or sell orders found.");
    }
  }

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

  const handleOrder = async () => {
    if (!amount || !price) return;

    {
      /* Checking Approval */
    }
    let allowanceA;
    let approvedToken = tradeType === "buy" ? currencyAddr : select.value;
    let amounts =
      tradeType === "buy"
        ? parseFloat(price) * parseFloat(amount) * 1.005
        : amount;
    console.log(`Apporve token ${approvedToken}\nAmount ${amounts}`);

    try {
      allowanceA = await readContract(config, {
        ...erc20ABI,
        address: approvedToken as "0xstring",
        functionName: "allowance",
        args: [address as "0xstring", CMswapP2PMarketplace],
      });
      if (allowanceA < parseEther(amounts.toLocaleString())) {
        const { request } = await simulateContract(config, {
          ...erc20ABI,
          address: approvedToken as "0xstring",
          functionName: "approve",
          args: [
            CMswapP2PMarketplace,
            parseEther(
              amounts.toLocaleString(undefined, { minimumFractionDigits: 18 })
            ),
          ],
        });
        const h = await writeContract(config, request);
        await waitForTransactionReceipt(config, { hash: h });
      }
    } catch (error) {
      console.log("Token is not ERC20 checking KAP20");
      try {
        allowanceA = await readContract(config, {
          ...kap20ABI,
          address: approvedToken as "0xstring",
          functionName: "allowances",
          args: [address as "0xstring", CMswapP2PMarketplace],
        });
        if (allowanceA < parseEther(amounts.toLocaleString())) {
          const { request } = await simulateContract(config, {
            ...erc20ABI,
            address: approvedToken as "0xstring",
            functionName: "approve",
            args: [CMswapP2PMarketplace, parseEther(amounts.toLocaleString())],
          });
          const h = await writeContract(config, request);
          await waitForTransactionReceipt(config, { hash: h });
        }
      } catch (error) {
        console.log("Token is not ERC20 and KAP20");
        setErrMsg(error as WriteContractErrorType);
      }
    }

    {
      /* Place Order */
    }
    let h;
    let r;
    try {
      const isBuy = tradeType === "buy";
      const token = select.value; // ซื้อ: token = token, ขาย: token = token
      const currency = currencyAddr;
      const orderAmount = parseEther(amount); // จำนวน Token
      const orderPrice = parseEther(price); // ราคาต่อหน่วย (เช่น 1 Token = 2 KKUB)
      const minUnitSize = parseEther("1"); // เช่น 1e18 => เทรดได้ทีละอย่างต่ำ 1 token
      const referral = ref as `0x${string}`; // ref เป็น address string

      const { result, request } = await simulateContract(config, {
        ...CMswapP2PMarketplaceContract,
        functionName: "createOrder",
        args: [
          isBuy,
          token,
          currency,
          orderAmount,
          orderPrice,
          minUnitSize,
          referral,
        ],
      });

      h = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash: h });
      setTxupdate(h);
    } catch (error) {
      setErrMsg(error as WriteContractErrorType);
    }

    /*     const newOrder: Order = {
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
    setAmount(""); */
  };

  const handleCancelOrder = async (id: number) => {
    let h;
    let r;
    try {
      const { result, request } = await simulateContract(config, {
        ...CMswapP2PMarketplaceContract,
        functionName: "cancelOrder",
        args: [BigInt(id)],
      });

      h = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash: h });
      setTxupdate(h);
    } catch (error) {
      setErrMsg(error as WriteContractErrorType);
    }
  };

  React.useEffect(() => {
    fetchOrderData();
    renders();
    fetchMyOrders(address as "0xstring");
  }, [select, txupdate, address]);

  const testNetFaucet = async () => {
    let h;
    let r;
    try {
      const { result, request } = await simulateContract(config, {
        ...faucetTestTokenContract,
        functionName: "claim",
      });

      h = await writeContract(config, request);
      await waitForTransactionReceipt(config, { hash: h });
      setTxupdate(h);
    } catch (error) {
      setErrMsg(error as WriteContractErrorType);
    }
  };

  return (
    <div className="font-mono max-w-[1680px] mx-[30px] lg:[60px] xl:[120px] 2xl:mx-[240px] mt-[120px]">
      {/* TESTNET FAUCET */}
      <div className="bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-6 mb-6 space-y-4">
        {/* tKUB Faucet */}
        <div className="flex items-center space-x-3">
          <span className="text-green-400 text-lg font-semibold">
            🚰 tKUB Faucet (Gas):
          </span>
          <span className="text-white">Bitkub Testnet</span>
        </div>
        <div className="ml-6">
          <a
            href="https://faucet.kubchain.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff9d] hover:underline"
          >
            https://faucet.kubchain.com/
          </a>
          <p className="text-sm text-gray-400">(Get up to 5 tKUB per day)</p>
        </div>

        {/* testKUB & testToken Faucet */}
        <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
          <span className="text-green-400 text-lg font-semibold">
            💧 Token Faucet:
          </span>
          <span className="text-white">testKUB & testToken</span>
        </div>
        <div className="ml-6 flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
          <button
            onClick={() => testNetFaucet()}
            className="bg-[#00ff9d] text-black font-semibold px-4 py-2 rounded hover:bg-[#00e68a] transition"
          >
            CLAIM 100,000 Tokens
          </button>
          <p className="text-sm text-gray-400">(Once every 24 hours)</p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-6 mb-6 flex flex-col md:flex-row  items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img
              src={select.img1}
              alt="token1"
              className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white"
            />
            <h2 className="text-2xl font-bold uppercase text-white">
              {select.name} / {currencySymbol}
            </h2>
          </div>

          <p className="text-sm">
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

        <div className="ml-[2px] sm:ml-[24px]">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold uppercase text-white">
              Last Price
            </h2>
          </div>

          <p className="text-sm">
            <p className="text-lg font-bold text-green-400">
              {lastPrice} {currencySymbol}
            </p>
          </p>
        </div>

        <div className="ml-[2px] sm:ml-[40px]">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold uppercase text-white">
              Trade Fee
            </h2>
          </div>

          <p className="text-sm">
            <p className="text-lg font-bold text-red-400">
              {" "}
              Maker 0.5% / Taker 0.5%
            </p>
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-1 md:grid-cols-12 gap-6 max-w-[1920px]">
        {/* Left Panel: Order Book and Trade History */}
        <div className="md:col-span-3 rounded-xl flex flex-col space-y-6 w-full">
          <div className="flex flex-col w-full mx-auto flex-1 space-y-6">
            {/* Order Book */}
            <div className="bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-4 w-full flex flex-col flex-grow min-h-[200px]">
              <h3 className="text-lg font-semibold mb-4 text-white text-center w-full">
                Order Book
              </h3>

              <div className="flex flex-col divide-y divide-gray-700 w-full overflow-y-auto max-h-[500px] flex-grow min-w-0">
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
                      <span className="w-1/2 text-center truncate">
                        {price.toFixed(8)} {currencySymbol}
                      </span>
                      <span
                        className="w-1/2 text-center truncate overflow-hidden whitespace-nowrap"
                        title={select.name}
                      >
                        {amount.toFixed(0)} {select.name}
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
                      <span className="w-1/2 text-center truncate">
                        {price.toFixed(8)} {currencySymbol}
                      </span>
                      <span
                        className="w-1/2 text-center truncate overflow-hidden whitespace-nowrap"
                        title={select.name}
                      >
                        {amount.toFixed(0)} {select.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trade History */}
            <div className="bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-4 w-full flex flex-col flex-grow min-h-[200px]">
              <h3 className="text-lg font-semibold mb-4 text-white text-center w-full">
                Trade History
              </h3>

              {/* Header Columns */}
              <div className="grid grid-cols-3 text-gray-400 text-sm font-semibold border-b border-gray-600 pb-2 mb-2">
                <span className="text-center">Timestamp</span>
                <span className="text-center">Price ({currencySymbol})</span>
                <span className="text-center">Volume ({select.name}) </span>
              </div>

              {/* Order List */}
              <div className="flex flex-col divide-y divide-gray-700 w-full overflow-y-auto max-h-[500px] flex-grow min-w-0">
                {/* Sell Orders */}
                {groupOrdersByPrice(orders, "sell").map(([price, amount]) => (
                  <div
                    key={`sell-${price}`}
                    className="grid grid-cols-3 text-sm text-red-200 py-2 min-w-0"
                  >
                    <span className="text-center">—</span>
                    <span className="text-center truncate">
                      {price.toFixed(8)}
                    </span>
                    <span
                      className="text-center truncate overflow-hidden whitespace-nowrap"
                      title={select.name}
                    >
                      {amount.toFixed(0)}
                    </span>
                  </div>
                ))}

                {/* Buy Orders */}
                {groupOrdersByPrice(orders, "buy").map(([price, amount]) => (
                  <div
                    key={`buy-${price}`}
                    className="grid grid-cols-3 text-sm text-green-200 py-2 min-w-0"
                  >
                    <span className="text-center">—</span>
                    <span className="text-center truncate">
                      {price.toFixed(8)}
                    </span>
                    <span
                      className="text-center truncate overflow-hidden whitespace-nowrap"
                      title={select.name}
                    >
                      {amount.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Trading */}
        <div className="md:col-span-6 bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-6 w-full">
          <div className="h-[550px] bg-opacity-[0.07] border border-[#00ff9d]/20 mb-6 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">[Trading Chart Coming Soon]</span>
          </div>
          {/* Trade Buttons */}
          <div className="flex space-x-4 mb-4 bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl">
            <button
              onClick={() => setTradeType("buy")}
              className={`${
                tradeType === "buy"
                  ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg"
                  : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center"
              }`}
              style={{
                backgroundImage:
                  tradeType === "buy"
                    ? "radial-gradient(circle 919px at 1.7% 6.1%, rgb(34, 197, 94) 0%, rgb(20, 83, 45) 60%, rgba(34, 197, 94, 0.2) 100%)"
                    : "none",
              }}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType("sell")}
              className={`${
                tradeType === "sell"
                  ? "font-bold p-2 w-1/2 bg-black text-center rounded-lg"
                  : "text-gray-400 underline cursor-pointer hover:font-bold p-2 w-1/2 text-center"
              }`}
              style={{
                backgroundImage:
                  tradeType === "sell"
                    ? "radial-gradient(circle 919px at 1.7% 6.1%, rgb(239, 68, 68) 0%, rgb(139, 15, 15) 60%, rgba(239, 68, 68, 0.2) 100%)"
                    : "none",
              }}
            >
              Sell
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 bg-opacity-[0.07] border border-[#00ff9d]/20 p-4 rounded-xl">
            {/* Price Input */}
            {tradeType === "buy" ? (
              <div className="text-sm text-gray-400 text-right">
                Your Balance :{" "}
                {kkub.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
                {currencySymbol}
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
            <div className="flex items-center justify-between bg-opacity-[0.07] border border-[#00ff9d]/20 p-2 rounded-lg">
              <label className="text-sm text-gray-300 w-24">Price</label>
              <input
                type="number"
                className="focus:outline-none text-gray-400 font-mono text-xs rounded-lg px-3 py-1 w-full text-white placeholder-gray-400 text-right"
                placeholder="0.00"
                value={price}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = parseFloat(value);
                  if (numericValue < 0.00001) {
                    setPrice("0.00001");
                  } else {
                    setPrice(value);
                  }
                }}
              />
              <span className="text-xs text-gray-400">{currencySymbol}</span>
            </div>

            {/* Amount Input */}
            <div className="flex items-center justify-between bg-opacity-[0.07] border border-[#00ff9d]/20 p-2 rounded-lg">
              <label className="text-sm text-gray-300 w-24">Amount</label>
              <input
                type="number"
                min="0"
                step="1"
                className="focus:outline-none text-gray-400 font-mono text-xs rounded-lg px-3 py-1 w-full text-white placeholder-gray-400 text-right"
                placeholder="0"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;

                  // ปล่อยให้ใส่ค่าว่าง (สำหรับการ backspace ล้างค่า)
                  if (value === "") {
                    setAmount("");
                    return;
                  }

                  // ตรวจว่าค่าที่กรอกเป็นจำนวนเต็มบวกเท่านั้น
                  const numericValue = Number(value);

                  // ป้องกันค่าที่ไม่ใช่จำนวนเต็ม หรือค่าติดลบ
                  if (!Number.isInteger(numericValue) || numericValue < 0) {
                    return; // ไม่อัปเดต state ถ้าไม่ผ่าน
                  }

                  setAmount(value); // ยอมรับค่าที่ถูกต้องเท่านั้น
                }}
              />

              <span className="text-xs text-gray-400">{select.name}</span>
            </div>

            {/* Total */}

            {/* Fee Breakdown */}
            {price && amount && (
              <>
                <div className="flex items-center justify-between text-sm text-gray-400 px-2">
                  <span>Total </span>
                  <span>
                    {(parseFloat(price) * parseFloat(amount)).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 8,
                        maximumFractionDigits: 8,
                      }
                    )}{" "}
                    {currencySymbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 px-2">
                  <span>Fee (0.5%)</span>
                  <span>
                    {(
                      parseFloat(price) *
                      parseFloat(amount) *
                      0.005
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 8,
                      maximumFractionDigits: 8,
                    })}{" "}
                    {currencySymbol}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm px-2 font-bold text-white">
                  <span>
                    {tradeType === "buy" ? "You must pay" : "You receive"}
                  </span>
                  <span>
                    {(
                      parseFloat(price) *
                      parseFloat(amount) *
                      (tradeType === "buy" ? 1.005 : 0.995)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 8,
                      maximumFractionDigits: 8,
                    })}{" "}
                    {currencySymbol}
                  </span>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              onClick={handleOrder}
              className={`font-bold p-2 w-full text-center rounded-lg transition-all duration-300
              ${
                tradeType === "buy"
                  ? "text-green-100 hover:brightness-110 active:scale-95"
                  : "text-red-100 hover:brightness-110 active:scale-95"
              }
              ${
                !select?.name
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              style={{
                backgroundImage:
                  tradeType === "buy"
                    ? "radial-gradient(circle 919px at 1.7% 6.1%, rgb(34, 197, 94) 0%, rgb(20, 83, 45) 60%, rgba(34, 197, 94, 0.2) 100%)"
                    : "radial-gradient(circle 919px at 1.7% 6.1%, rgb(239, 68, 68) 0%, rgb(139, 15, 15) 60%, rgba(239, 68, 68, 0.2) 100%)",
              }}
              disabled={!select?.name}
            >
              {tradeType === "buy" ? "Buy" : "Sell"} {select?.name || ""}
            </button>
          </div>

          <div className="mt-8 w-full px-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-black/30 border border-gray-700 rounded-xl p-3">
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-gray-400 mb-1">
                  Share to your friend, earn{" "}
                  <span className="text-emerald-400 font-bold">15%</span>
                </p>
                <p className="font-mono text-[12px] text-white ">
                  {getCurrentLink(select, address as "0xstring")}
                </p>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(getCurrentLink(select, address as "0xstring"))
                }
                className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg text-black font-bold hover:scale-105 transition-transform"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Token Pair */}
        <div className="md:col-span-3 bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-4 flex flex-col w-full">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Pair</h3>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none text-gray-400 font-mono text-xs rounded-lg px-3 py-1 w-full text-white placeholder-gray-400 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter buttons */}
          <div className="flex space-x-3 mb-4  w-full">
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
          <div className="space-y-4 h-250 overflow-y-auto pr-2 scrollbar-hide">
            {filteredPairs.length === 0 ? (
              <p className="text-gray-400 font-mono text-center">
                No pairs found
              </p>
            ) : (
              filteredPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => setSelectToken(pair)}
                >
                  {/* Token Icons */}
                  <div className="relative w-10 aspect-square flex-shrink-0">
                    {/* Token 1 */}
                    <div className="absolute top-0 left-0 w-8 aspect-square rounded-full overflow-hidden border-2 border-[#1a1b2e] bg-white">
                      <img
                        src={pair.img1}
                        alt="token1"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Token 2 (overlap) */}
                    <div className="absolute top-0 left-5 w-6 aspect-square rounded-full overflow-hidden border-2 border-[#1a1b2e] bg-white">
                      <img
                        src={pair.img2}
                        alt="token2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Token Info */}
                  <div className="flex flex-col justify-center max-w-full overflow-hidden">
                    <p
                      className="text-white font-mono truncate uppercase 
      text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl"
                    >
                      {pair.name}
                    </p>

                    <p
                      className="text-gray-400 truncate
      text-xs sm:text-sm md:text-base lg:text-sm xl:text-base"
                    >
                      {pair.desc}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer: Tabs + Order Table */}
      <div className="bg-water-200 bg-opacity-[0.07] border border-[#00ff9d]/20 rounded-xl p-6 mt-6">
        {/* Tabs */}
        <div className="flex justify-start space-x-8 mb-6 border-b border-gray-700 pb-2">
          <button
            className={`${
              view === "Orders"
                ? "text-white font-semibold  border-green-500"
                : "text-gray-400 hover:text-white "
            }`}
            onClick={() => setView("Orders")}
          >
            Orders
          </button>
          <button
            className={`${
              view === "History"
                ? "text-white font-semibold  border-green-500"
                : "text-gray-400 hover:text-white "
            }`}
            onClick={() => setView("History")}
          >
            Trade History
          </button>
        </div>

        {view === "Orders" && (
          <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-full whitespace-nowrap">
              {/* Table Header */}
              <div className="grid grid-cols-7 gap-x-6 gap-y-2 text-sm text-gray-400 font-semibold px-4 py-3 border-b border-gray-700">
                <span className="text-left">Date</span>
                <span className="text-left">Pair</span>
                <span className="text-left">Side</span>
                <span className="text-left">Price</span>
                <span className="text-left">Amount</span>
                <span className="text-left">Total</span>
                <span className="text-center">Action</span>
              </div>

              {/* Table Rows */}
              {uorders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-7 gap-x-6 gap-y-2 text-sm text-white items-center px-4 py-4 border-b border-[#2a2b3c]"
                >
                  <span className="text-xs text-gray-400">
                    {order.date.split(" ")[0]}
                  </span>
                  <span>
                    {order.tokenSymbol}/{currencySymbol}
                  </span>
                  <span
                    className={
                      order.type === "buy" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {order.type.toUpperCase()}
                  </span>
                  <span>
                    {order.price.toFixed(8)} {currencySymbol}
                  </span>
                  <span>
                    {order.filledAmount}/{order.amount} {order.tokenSymbol}
                  </span>
                  <span>
                    {((order.amount * order.price) + order.feeLocked).toFixed(8)} {currencySymbol}
                  </span>
                  {order.filledAmount !== order.amount &&
                  order.cancelAt === 0 ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-xs text-red-500 hover:text-red-600 px-3 py-1 rounded bg-[#3e3f4c] hover:bg-[#4f505c] transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>
          </div>
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
                <span>
                  {order.price.toFixed(2)} {currencySymbol}
                </span>
                <span>
                  {order.amount} {order.fromToken.logo}
                </span>
                <span>
                  {(order.amount * order.price).toFixed(2)} {currencySymbol}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
