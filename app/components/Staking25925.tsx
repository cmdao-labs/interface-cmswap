import React, { useState } from "react";
import { Copy, Plus, ChevronDown, ChevronUp, CopyCheck } from "lucide-react";
import { Button } from '@/components/ui/button'

const StakingList = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState("");

  // Chain themes
  type ChainName = "KUB" | "MONAD" | "BINANCE" | "JFIN";
  const chainThemes: Record<ChainName, {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    bg: string;
    text: string;
  }> = {
    KUB: {
      primary: "rgb(34, 197, 94)", // green-500
      secondary: "rgb(22, 163, 74)", // green-600
      accent: "rgb(187, 247, 208)", // green-200
      border: "border-green-500",
      bg: "bg-green-500/10",
      text: "text-green-400",
    },
    MONAD: {
      primary: "rgb(147, 51, 234)", // purple-600
      secondary: "rgb(126, 34, 206)", // purple-700
      accent: "rgb(221, 214, 254)", // purple-200
      border: "border-purple-500",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
    },
    BINANCE: {
      primary: "rgb(234, 179, 8)", // yellow-500
      secondary: "rgb(202, 138, 4)", // yellow-600
      accent: "rgb(254, 240, 138)", // yellow-200
      border: "border-yellow-500",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
    },
    JFIN: {
      primary: "rgb(239, 68, 68)", // red-500
      secondary: "rgb(220, 38, 38)", // red-600
      accent: "rgb(254, 202, 202)", // red-200
      border: "border-red-500",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
  };

  const stakingData = [
    {
      id: 1,
      chain: "KUB",
      coinImage: "/96.png",
      coin2Image: "",
      coinName: "KUB COIN",
      programName: "Compound Staking POS",
      tokenAddress: "0x1234...5678",
      totalStake: "1,234,567",
      apr: "12.5%",
      reward: "156.78",
      staked: "10,000",
      commission: "5%",
      totalStaked: "5,000,000",
      tokenContract: "0xabcd...efgh",
      programContract: "0x9876...5432",
      isNFT: false,
      strategy: 'Auto-compound from POS node "COMMUDAO" rewards daily',
    },
    /*     {
      id: 2,
      chain: 'MONAD',
      coinImage: '🟣',
      coinName: 'MONAD',
      tokenAddress: '0x2345...6789',
      totalStake: '2,345,678',
      apr: '15.2%',
      reward: '234.56',
      staked: '15,000',
      commission: '3%',
      totalStaked: '8,000,000',
      tokenContract: '0xbcde...fghi',
      programContract: '0x8765...4321',
      isNFT: false,
      strategy: 'Liquid staking with instant unstaking'
    },
    {
      id: 3,
      chain: 'BINANCE',
      coinImage: '🟡',
      coinName: 'BNB',
      tokenAddress: '0x3456...7890',
      totalStake: '3,456,789',
      apr: '8.7%',
      reward: '89.12',
      staked: '25,000',
      commission: '2%',
      totalStaked: '12,000,000',
      tokenContract: '0xcdef...ghij',
      programContract: '0x7654...3210',
      isNFT: false
    }, */
    {
      id: 4,
      chain: "KUB",
      coinImage: "/96.png",
      coin2Image: "/usdt.png",
      coinName: "KKUB-KUSDT V3 LP",
      programName: "Farming KKUB-KUSDT V3 LP",
      tokenAddress: "0x4567...8901",
      totalStake: "567,890",
      apr: "25.4%",
      reward: "345.67",
      staked: "5",
      commission: "1%",
      totalStaked: "2,000,000",
      tokenContract: "0xdef0...hijk",
      programContract: "0x6543...2109",
      isNFT: true,
      strategy: "",
    },
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
  const getTheme = (chain: string) => chainThemes[(chain as ChainName)] || chainThemes.KUB;
    setTimeout(() => setCopiedAddress(""), 800);
  };

  const toggleExpanded = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getTheme = (chain: string) => chainThemes[(chain as ChainName)] ?? chainThemes.KUB;

  const StakingPopup = ({ theme }: { theme: typeof chainThemes.KUB }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700 ">
        <div className="flex justify-between items-center mb-4 ">
          <h3 className="text-xl font-bold text-white">Add Staking Power</h3>
          <button
            onClick={() => setShowPopup(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select NFT Position
            </label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
              <option>Position #1234 - ETH/USDC</option>
              <option>Position #5678 - BTC/ETH</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border}`}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: theme.primary }}
            >
              Add Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Staking Programs</h2>
          <Button
                    variant="outline"
                    className={
                        "font-mono h-auto rounded text-xs flex flex-col bg-[#162638] text-[#00ff9d] border border-[#00ff9d]/20" 
                    }
                    onClick={() => setShowPopup(true)}
                >
                    <span>Create Staking Program</span>
                </Button>
        </div>
        <div className="space-y-4">
          {stakingData.map((item) => {
            const theme = getTheme(item.chain);
            const isExpanded = expandedItem === item.id;

            return (
              <div
                key={item.id}
                className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
              >
                {/* Name */}
                <div className="p-4">
                  <h3 className="font-semibold text-white">
                    {item.programName}
                  </h3>
                </div>

                {/* Collapsed View */}
                <div className="px-4 pb-4">
                  {/* Desktop Column View */}
                  <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10">
                        {/* เหรียญหลัก (coinImage) อยู่ด้านหลัง */}
                        <img
                          src={item.coinImage}
                          alt="token1"
                          className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                        />

                        {/* เหรียญ 2 (coin2Image) อยู่ด้านหน้า ขนาดเล็กลง และชิดขวาล่าง */}
                        {item.coin2Image && (
                          <img
                            src={item.coin2Image}
                            alt="token2"
                            className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                          />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {item.coinName}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(
                              item.tokenAddress,
                              `token-${item.id}`
                            );
                          }}
                          className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
                        >
                          <span>{item.tokenAddress}</span>
                          {copiedAddress === `token-${item.id}` ? (
                            <CopyCheck size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Total Stake</div>
                      <div className="font-semibold">{item.totalStake}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">APR</div>
                      <div className={`font-semibold ${theme.text}`}>
                        {item.apr}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Reward</div>
                      <div className="font-semibold">{item.reward}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-400">Staked</div>
                      <div className="font-semibold">{item.staked}</div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Row View */}
                  <div className="md:hidden">
                    <div
                      className="cursor-pointer hover:bg-gray-800 transition-colors p-2 rounded-lg"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10">
                            {/* เหรียญหลัก (coinImage) อยู่ด้านหลัง */}
                            <img
                              src={item.coinImage}
                              alt="token1"
                              className="w-8 h-8 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                            />

                            {/* เหรียญ 2 (coin2Image) อยู่ด้านหน้า ขนาดเล็กลง และชิดขวาล่าง */}
                            {item.coin2Image && (
                              <img
                                src={item.coin2Image}
                                alt="token2"
                                className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                              />
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-white">
                              {item.coinName}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(
                                  item.tokenAddress,
                                  `token-${item.id}`
                                );
                              }}
                              className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white"
                            >
                              <span>{item.tokenAddress}</span>
                              {copiedAddress === `token-${item.id}` ? (
                                <CopyCheck size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-400">
                            Total Stake
                          </div>
                          <div className="font-semibold">{item.totalStake}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">APR</div>
                          <div className={`font-semibold ${theme.text}`}>
                            {item.apr}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Reward</div>
                          <div className="font-semibold">{item.reward}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Staked</div>
                          <div className="font-semibold">{item.staked}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {isExpanded && (
                  <div className="border-t border-gray-700 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Section 1: Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-white mb-4">
                          Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">APR:</span>
                            <span className={`font-semibold ${theme.text}`}>
                              {item.apr}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Commission:</span>
                            <span className="font-semibold">
                              {item.commission}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Staked:</span>
                            <span className="font-semibold">
                              {item.totalStaked}
                            </span>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">
                              Token Contract:
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  item.tokenContract,
                                  `contract-${item.id}`
                                )
                              }
                              className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                            >
                              <span>{item.tokenContract}</span>
                              {copiedAddress === `contract-${item.id}` ? (
                                <CopyCheck size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-1">
                              Program Contract:
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  item.programContract,
                                  `program-${item.id}`
                                )
                              }
                              className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
                            >
                              <span>{item.programContract}</span>
                              {copiedAddress === `program-${item.id}` ? (
                                <CopyCheck size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Staking Reward */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-white mb-4">
                          Staking Reward
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Amount:</span>

                            <span className="font-semibold">{item.reward}</span>
                            <span className="text-xl">
                              <div className="relative w-7 h-7">
                                {/* เหรียญหลัก (coinImage) อยู่ด้านหลัง */}
                                <img
                                  src={item.coinImage}
                                  alt="token1"
                                  className="w-6 h-6 rounded-full border-2 border-[#1a1b2e] bg-white z-0 absolute top-0 left-0"
                                />

                                {/* เหรียญ 2 (coin2Image) อยู่ด้านหน้า ขนาดเล็กลง และชิดขวาล่าง */}
                                {item.coin2Image && (
                                  <img
                                    src={item.coin2Image}
                                    alt="token2"
                                    className="w-4 h-4 rounded-full border-2 border-[#1a1b2e] bg-white z-10 absolute bottom-0 right-0"
                                  />
                                )}
                              </div>
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Staked:</span>
                            <span className="font-semibold">{item.staked}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Staked/Staked Power */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-white mb-4">
                          {item.isNFT ? "Staked Power" : "Staked"}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Current:</span>
                            <span className="font-semibold">{item.staked}</span>
                          </div>

                          {/* Regular Token Actions */}
                          {!item.isNFT && (
                            <div className="flex space-x-2">
                              <button
                                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-80`}
                              >
                                <Plus size={16} />
                                <span>Stake</span>
                              </button>
                              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600">
                                <span>−</span>
                                <span>Unstake</span>
                              </button>
                            </div>
                          )}

                          {/* NFT Actions */}
                          {item.isNFT && (
                            <button
                              onClick={() => setShowPopup(true)}
                              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme.bg} ${theme.text} border ${theme.border} hover:opacity-80`}
                            >
                              <Plus size={16} />
                              <span>Add Position</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Strategy Section */}
                    {item.strategy && (
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <h4 className="font-semibold text-lg text-white mb-3">
                          Strategy
                        </h4>
                        <p className="text-gray-300">{item.strategy}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup */}
      {showPopup && <StakingPopup theme={getTheme("JFIN")} />}
    </div>
  );
};

export default StakingList;
