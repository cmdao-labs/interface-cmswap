import React, { useState } from "react";
import { ArrowDownUp, X } from "lucide-react";

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
  const token: Token = {
    name: "SOLA BOOSTER",
    symbol: "SOLA",
    address: "0x1234567890abcdef1234567890abcdef12345678",
  };

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
      id: 6,
      fromToken: token,
      toToken: { name: "KKUB", symbol: "KKUB", address: "0xkkub" },
      amount: 10,
      price: 49,
      type: "buy",
      date: "2025-05-11 11:25:00",
    },
  ]);

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

  return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-xs bg-[#0a0b1e] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.5))]">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mt-[120px]">
        {/* Buy/Sell Form */}
        <div className="col-span-1 bg-[#1b2234] rounded-lg p-4">
          <div className="flex justify-between mb-4">
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
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#2a2f45] p-2 rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#2a2f45] p-2 rounded"
            />
            <button
              className={`w-full py-2 rounded font-bold ${
                tradeType === "buy" ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={handleOrder}
            >
              {tradeType === "buy" ? "Buy SOLA" : "Sell SOLA"}
            </button>
          </div>
        </div>

        {/* Order Book */}
        <div className="col-span-1 bg-[#1b2234] rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Order Book</h3>
          <div className="space-y-1 max-h-[300px] overflow-y-auto text-sm">
            {orders
              .sort((a, b) => b.price - a.price)
              .map((order) => (
                <div
                  key={order.id}
                  className={`flex justify-between px-2 py-1 rounded ${
                    order.type === "buy" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <span>{order.price.toFixed(2)}</span>
                  <span>{order.amount.toFixed(2)} SOLA</span>
                </div>
              ))}
          </div>
        </div>

        {/* Order History */}
        <div className="col-span-1 bg-[#1b2234] rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">My Orders</h3>
          <div className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-gray-700 pb-1"
              >
                <div>
                  <span
                    className={`font-semibold ${
                      order.type === "buy" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {order.type.toUpperCase()}
                  </span>{" "}
                  {order.amount} {} @ {order.price}
                </div>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
