"use client";
import React from "react";
import { Copy,Check, Users, Gift, TrendingUp, Zap } from "lucide-react";
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
import {
  tokens,
  erc20ABI,
  kap20ABI,
  wrappedNative,
  unwarppedNative,
  bkcUnwapped,
  cmSwapRefProgram,
  cmSwapRefProgramContract,
} from "@/app/lib/25925";
import { config } from "@/app/config";
import { formatEther, parseEther } from "viem";

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  border: string;
  text: string;
}

type Referral = {
  referral: string;
  timestamp: bigint;
};

const themes: Record<number, Theme> = {
    96: {
      primary: "from-green-400 to-emerald-400",
      secondary: "from-green-600 to-emerald-600",
      accent: "green-400",
      glow: "" /* "shadow-green-400/50" */,
      border: "border-green-400/30",
      text: "text-green-300",
    },
    8899: {
      primary: "from-blue-400 to-cyan-400",
      secondary: "from-blue-600 to-cyan-600",
      accent: "blue-400",
      glow: "" /* "shadow-blue-400/50" */,
      border: "border-blue-400/30",
      text: "text-blue-300",
    },
    56: {
      primary: "from-yellow-400 to-amber-400",
      secondary: "from-yellow-600 to-amber-600",
      accent: "yellow-400",
      glow: "" /* "shadow-yellow-400/50" */,
      border: "border-yellow-400/30",
      text: "text-yellow-300",
    },
    3501: {
      primary: "from-red-400 to-rose-400",
      secondary: "from-red-600 to-rose-600",
      accent: "red-400",
      glow: "" /* "shadow-red-400/50" */,
      border: "border-red-400/30",
      text: "text-red-300",
    },
    10143: {
      primary: "from-purple-400 to-violet-400",
      secondary: "from-purple-600 to-violet-600",
      accent: "purple-400",
      glow: "" /* "shadow-purple-400/50" */,
      border: "border-purple-400/30",
      text: "text-purple-300",
    },
  };

export default function Ref96() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState(96);
  const { address, chainId } = useAccount();
  const [theme, setTheme] = React.useState<Theme>(themes[96]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const referralsPerPage = 5;
  const [refAmount, setRefAmount] = React.useState(0);
  const [referrals, setReferrals] = React.useState<Referral[]>([]);
  const [copyLocation, setCopyLocation] = React.useState<"" | "address" | "url">("");


  const [RewardList, setRewardList] = React.useState<
    { token: string; symbol: string; reward: string }[]
  >([]);

  React.useEffect(() => {
    const fetch = async () => {
      const result = await readContracts(config, {
        contracts: [
          {
            ...cmSwapRefProgramContract,
            functionName: "getTotalRef",
            args: [address as "0xstring"],
          },
        ],
      });

      let round =
        result[0].result !== undefined
          ? Math.floor(Number(result[0].result) / 50)
          : 0;
      let allReferrals: any[] = [];

      for (let i = 0; i <= round; i++) {
        const batchResult = await readContracts(config, {
          contracts: [
            {
              ...cmSwapRefProgramContract,
              functionName: "getRefferal",
              args: [address as "0xstring", BigInt(i), BigInt(50)],
            },
          ],
        });

        const resultList = batchResult[0].result;
        if (Array.isArray(resultList)) {
          allReferrals.push(...resultList);
        }
      }

      setReferrals(allReferrals);

      setRefAmount(
        result[0].result !== undefined ? Number(result[0].result) : 0
      );
    };

    const fetchReward = async () => {
      try {
        const RewardList: any[] = [];

        // Step 1: ดึงข้อมูล getUserRewards
        const [userRewardResponse] = await readContracts(config, {
          contracts: [
            {
              ...cmSwapRefProgramContract,
              functionName: "getUserRewards",
              args: [address as `0x${string}`, BigInt(0), BigInt(50)],
            },
          ],
        });

        // Step 2: ดึงข้อมูล getRefferal
        const [referralResponse] = await readContracts(config, {
          contracts: [
            {
              ...cmSwapRefProgramContract,
              functionName: "getRefferal", // ตรวจสอบให้แน่ใจว่าสะกดถูกตาม smart contract
              args: [address as `0x${string}`, BigInt(0), BigInt(50)],
            },
          ],
        });

        // Step 3: จัดการกับผลลัพธ์ที่ได้จากทั้งสองฟังก์ชัน
        const rewards = (userRewardResponse.result ?? []) as {
          rewardToken: `0x${string}`;
          amount: bigint;
        }[];

        const referrals = (referralResponse.result ?? []) as {
          referral: `0x${string}`;
          timestamp: bigint;
        }[];

        const rewardTokens = rewards.map((r) => r.rewardToken);
        const rewardAmounts = rewards.map((r) => r.amount);

        const symbolResults: string[] = [];

        for (let i = 0; i < rewardTokens.length; i++) {
          const symbolResult = await readContract(config, {
            ...erc20ABI,
            address: rewardTokens[i] as `0x${string}`,
            functionName: "symbol",
          });

          symbolResults.push(symbolResult);
        }

        const symbols = symbolResults;
        console.log(symbols);

        // Step 5: สร้างรายการ RewardList โดยผูก token, symbol และ amount
        for (let i = 0; i < rewardTokens.length; i++) {
          let reward = formatEther(rewardAmounts[i]) ?? BigInt(0)
          if(Number(reward) > 0 ){
            RewardList.push({
            token: rewardTokens[i],
            symbol: symbols[i] ?? "",
            reward,
          });
          }
        }

        console.log(RewardList);
        setRewardList(RewardList);
      } catch (error) {
        console.error("Error fetching reward data:", error);
        return [];
      }
    };

    fetch();
    fetchReward();
  }, [address]);



  const handleClaim = async () => {
    let { request } = await simulateContract(config, {
      ...cmSwapRefProgramContract,
      functionName: "claimAllRemainingReward",
    });
    let h = await writeContract(config, request);
    await waitForTransactionReceipt(config, { hash: h });
  };

  const getThemeColors = (chainId: number | 96): Theme => {
    return themes[chainId as number] || themes[96];
  };

  // Update theme when chainId changes
  React.useEffect(() => {
    if (chainId) {
      setTheme(getThemeColors(chainId));
      setSelectedTheme(chainId);
      console.log("Chain ID:", chainId);
    }else{
      setTheme(getThemeColors(96));
    }
  }, [chainId]);

  const copyToClipboard = (text: string, location: "" | "address" | "url") => {
    navigator.clipboard.writeText(text);
    setCopyLocation(location);

    setTimeout(() => {
      setCopyLocation("");
    }, 800);
  };


  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const mreferrals = Array.from({ length: 50 }, (_, i) => ({
    referral: `0x000000000000000000000000000000000000000${i + 1}`,
    timestamp: (Date.now() / 1000 - i * 3600).toString(), // ลดเวลาทีละ 1 ชั่วโมง
  }));

  const totalPages = Math.ceil(referrals.length / referralsPerPage);

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      {/*       <div className="fixed inset-0 opacity-30">
        <div
          className={`absolute top-20 left-20 w-64 h-64 bg-gradient-to-r ${theme.primary} rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r ${theme.secondary} rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r ${theme.primary} rounded-full blur-2xl animate-bounce`}
        ></div>
      </div> */}

      <div className="relative z-10 p-6 max-w-7xl mx-auto mt-[90px]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className={`text-4xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent mb-2`}
              >
                Referral Dashboard
              </h1>
              <p className="text-gray-400">
                Track your referrals and rewards in real-time
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div
            className={`bg-black/40 backdrop-blur-lg border ${theme.border} rounded-2xl p-6 ${theme.glow} shadow-2xl`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="w-full break-all">
                <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
                <p
                  className={`font-mono text-xs sm:text-sm lg:text-lg ${theme.text} break-all`}
                >
                  {address}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(address as "0xstring","address")}
                className={`p-2 sm:p-3 bg-gradient-to-r ${theme.primary} rounded-xl hover:scale-105 transition-transform ${theme.glow} shadow-lg`}
              >
                {copyLocation !== "address" ? 
                <Copy className={`w-4 h-4 sm:w-5 sm:h-5 text-black bg-gradient-to-r ${theme.primary}`}  />
                : 
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Referrers */}
          <div
            className={`bg-black/40 backdrop-blur-lg border ${theme.border} rounded-2xl p-6 ${theme.glow} shadow-2xl group hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 bg-gradient-to-r ${theme.primary} rounded-xl ${theme.glow} shadow-lg`}
              >
                <Users size={24} className="text-black" />
              </div>
              <TrendingUp
                className={`text-${theme.accent} opacity-60`}
                size={20}
              />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Referrers</p>
            <p
              className={`text-3xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}
            >
              {refAmount}
            </p>
          </div>

          {/* Referral Code */}
          <div
            className={`bg-black/40 backdrop-blur-lg border ${theme.border} rounded-2xl p-6 ${theme.glow} shadow-2xl group hover:scale-105 transition-transform md:col-span-2`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 bg-gradient-to-r ${theme.primary} rounded-xl ${theme.glow} shadow-lg`}
              >
                <Zap size={24} className="text-black" />
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`https://cmswap.xyz/?ref=${address}`,"url")
                }
                className={`p-2 bg-gradient-to-r ${theme.primary} rounded-lg hover:scale-105 transition-transform`}
              >
                 {copyLocation !== "url" ? 
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                : 
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                }
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-2">Your Referral Code</p>
            <p
              className={`font-mono text-[12px] lg:text-sm ${theme.text} break-all`}
            >
              {"https://cmswap.xyz/?ref=" + address}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referrals Table */}
          <div
            className={`bg-black/40 backdrop-blur-lg border ${theme.border} rounded-2xl p-6 ${theme.glow} shadow-2xl`}
          >
            <h3
              className={`text-xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent`}
            >
              Referrals
            </h3>
            <div className="space-y-3">
              {referrals.length > 0 ?
              <>
              {referrals
                .slice(
                  (currentPage - 1) * referralsPerPage,
                  currentPage * referralsPerPage
                )
                .map((referral, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 bg-black/30 rounded-xl border ${theme.border} hover:bg-black/50 transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-black font-bold text-sm`}
                      >
                        {(currentPage - 1) * referralsPerPage + index + 1}
                      </div>

                      <span
                        className="font-mono text-gray-300 break-all cursor-pointer hover:underline"
                        onClick={() =>
                          navigator.clipboard.writeText(referral.referral)
                        }
                        title="Click to copy full address"
                      >
                        {referral.referral.slice(0, 6) +
                          "..." +
                          referral.referral.slice(-4)}
                      </span>
                    </div>

                    <div
                      className={`px-3 py-1 bg-gradient-to-r ${theme.secondary} rounded-full text-[10px] lg:text-[14px] font-bold`}
                    >
                      {new Date(
                        Number(referral.timestamp) * 1000
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}

                {/* Page Button */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-sm">
              {/* << */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 2, 1))}
                disabled={currentPage <= 2}
                className="px-2 py-1 rounded bg-black/30 text-white hover:bg-black/50 disabled:opacity-50"
              >
                &laquo;
              </button>

              {/* < */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-black/30 text-white hover:bg-black/50 disabled:opacity-50"
              >
                &lsaquo;
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;

                // เฉพาะหน้าใกล้ currentPage หรือ หน้าแรก/สุดท้าย
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded font-bold ${
                        pageNum === currentPage
                          ? "bg-gradient-to-r " +
                            theme.primary +
                            " text-black shadow-md"
                          : "bg-black/30 text-white hover:bg-black/50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }

                // แสดง ... เฉพาะจุดเปลี่ยน
                if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              {/* > */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-black/30 text-white hover:bg-black/50 disabled:opacity-50"
              >
                &rsaquo;
              </button>

              {/* >> */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 2, totalPages))
                }
                disabled={currentPage >= totalPages - 1}
                className="px-2 py-1 rounded bg-black/30 text-white hover:bg-black/50 disabled:opacity-50"
              >
                &raquo;
              </button>
            </div>

                </> 
                :
                <div className="flex items-center justify-center text-gray-400 text-sm py-10">
                  No referrals yet.
                </div>
                }
            </div>

            
          </div>

          {/* Pending Rewards */}
          <div
            className={`bg-black/40 backdrop-blur-lg border ${theme.border} rounded-2xl p-6 ${theme.glow} shadow-2xl`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 bg-gradient-to-r ${theme.primary} rounded-xl ${theme.glow} shadow-lg`}
              >
                <Gift size={24} />
              </div>
              <h3
                className={`text-xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent`}
              >
                Pending Rewards
              </h3>
            </div>
            <div className="space-y-4">
              {RewardList.length > 0 ? <>
              {RewardList.map((reward, index) => {
                // หาข้อมูล token จาก array tokens ตาม address (value)
                const tokenInfo = tokens.find(
                  (t) => t.value.toLowerCase() === reward.token.toLowerCase()
                );

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 bg-black/30 rounded-xl border ${theme.border} hover:bg-black/50 transition-colors group`}
                  >
                    <div className="flex items-center gap-3">
                      {tokenInfo ? (
                        <img
                          src={tokenInfo.logo}
                          alt={tokenInfo.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center font-bold text-black text-sm`}
                        >
                          {reward.symbol?.slice(0, 2) ||
                            reward.token.slice(0, 2)}
                        </div>
                      )}

                      <span className="font-semibold text-gray-300">
                        {reward.symbol || reward.token}
                      </span>
                    </div>
                    <div className="text-right group-hover:scale-105 transition-transform">
                      <p className={`text-xl font-bold ${theme.text}`}>
                        {reward.reward}
                      </p>
                      <p className="text-gray-500 text-sm">Available</p>
                    </div>
                  </div>
                );
              })}

              <button
                className={`w-full mt-4 py-3 bg-gradient-to-r ${theme.primary} rounded-xl font-bold text-black hover:scale-105 transition-transform ${theme.glow} shadow-lg`}
                onClick={() => handleClaim()}
              >
                Claim All Rewards
              </button>
              </> : 
              (
                <div className="flex items-center justify-center text-gray-400 text-sm py-10">
  You haven’t earned any rewards from referrals yet.
</div>

              )} 
              
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-${theme.accent}`}
          ></div>
        </div>
      )}
    </div>
  );
}
