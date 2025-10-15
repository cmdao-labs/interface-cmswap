"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Coins, TrendingUp, Users, DollarSign, Lock, Unlock, Calendar, Zap, Trophy, Settings } from "lucide-react";
import Link from "next/link"

const stakingHistory = [
    { time: "2025-08-01 12:30", amount: "1,500 TOKEN", status: "Active", apy: "12.5%" },
    { time: "2025-08-05 08:15", amount: "2,000 TOKEN", status: "Active", apy: "12.5%" },
];
const lockHistory = [
    { lockTime: "90 days", amount: "3,000 TOKEN", unlockAt: "2025-11-03 10:00", status: "Locked", multiplier: "1.5x" },
    { lockTime: "90 days", amount: "5,000 TOKEN", unlockAt: "2026-02-03 10:00", status: "Locked", multiplier: "1.5x" },
];
const multipleLockHistory = [
    { lockTime: "30 days", amount: "1,000 TOKEN", power: "1.2x", unlockAt: "2025-09-08 15:00", status: "Locked" },
    { lockTime: "60 days", amount: "2,000 TOKEN", power: "1.5x", unlockAt: "2025-10-08 15:00", status: "Locked" },
];
const nftHistory = [
    { tokenId: "#12345", liquidity: "125 KKUB : 200 KUSDT", fee: "0.3%", unlockAt: "Flexible", status: "Active", rewards: "25 TOKEN" },
    { tokenId: "#67890", liquidity: "12 KKUB : 19.2 KUSDT", fee: "0.05%", unlockAt: "Flexible", status: "Out of range", rewards: "58 TOKEN" },
];
const lockOptions = [
    { days: 30, multiplier: 1.2, apy: "15%" },
    { days: 60, multiplier: 1.5, apy: "22%" },
    { days: 90, multiplier: 1.8, apy: "28%" },
    { days: 180, multiplier: 2.0, apy: "35%" },
    { days: 365, multiplier: 2.5, apy: "45%" },
];

export default function AdvancedStakingPlatform() {
    const [mode, setMode] = useState<"staking" | "lock" | "multiple" | "nft">("staking");
    const [stakingAmount, setStakingAmount] = useState("");
    const [selectedLockDuration, setSelectedLockDuration] = useState<number>(30);
    const [isStakeDialogOpen, setIsStakeDialogOpen] = useState(false);
    const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [nftTokenIds, setNftTokenIds] = useState("");
    const [activeTab, setActiveTab] = useState<"history" | "overview">("history");
    const calculateUnlockTime = (days: number) => {
        const unlockDate = new Date();
        unlockDate.setDate(unlockDate.getDate() + days);
        return unlockDate.toLocaleString();
    };
    const selectedOption = lockOptions.find((opt) => opt.days === selectedLockDuration);
    const renderStatsCard = (icon: React.ReactNode, title: string, value: string, change?: string, color?: string) => (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${color || "bg-blue-500/20 text-blue-400"}`}>{icon}</div>
            </div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    );

    const renderActionButton = (icon: React.ReactNode, label: string, onClick: () => void, variant: "default" | "outline" | "destructive" = "default") => (
        <Button className={`flex flex-wrap h-12 font-semibold transition-all duration-300 hover:scale-[1.02] font-mono h-auto rounded text-xs   bg-[#162638] text-[#00ff9d] border border-[#00ff9d]/20        "border-gray-600 hover:border-blue-500/50 hover:bg-blue-500/10"}`} variant={variant} onClick={onClick}>
            {icon}
            <span className="ml-2">{label}</span>
        </Button>
    );

    const renderTable = () => {
        if (mode === "staking") {
            return (
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Staking Time</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stakingHistory.map((row, i) => (
                            <TableRow key={i} className="border-gray-700 hover:bg-gray-800/30">
                                <TableCell className="font-mono text-sm">{row.time}</TableCell>
                                <TableCell className="font-semibold">{row.amount}</TableCell>
                                <TableCell><Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">{row.status}</Badge></TableCell>
                                <TableCell>
                                    <Button size="sm" variant="outline" className="border-gray-600 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400">
                                        <Unlock className="w-3 h-3 mr-1" />
                                        Withdraw
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        if (mode === "lock") {
            return (
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Lock Duration</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Unlock At</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lockHistory.map((row, i) => (
                            <TableRow key={i} className="border-gray-700 hover:bg-gray-800/30">
                                <TableCell className="font-semibold">{row.lockTime}</TableCell>
                                <TableCell className="font-semibold">{row.amount}</TableCell>
                                <TableCell className="font-mono text-sm">{row.unlockAt}</TableCell>
                                <TableCell><Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">{row.status}</Badge></TableCell>
                                <TableCell>
                                    <Button size="sm" variant="outline" disabled className="border-gray-600 text-gray-500">
                                        <Lock className="w-3 h-3 mr-1" />
                                        Locked
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        if (mode === "multiple") {
            return (
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Lock Duration</TableHead>
                            <TableHead className="text-gray-300">Amount</TableHead>
                            <TableHead className="text-gray-300">Power</TableHead>
                            <TableHead className="text-gray-300">Unlock At</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {multipleLockHistory.map((row, i) => (
                            <TableRow key={i} className="border-gray-700 hover:bg-gray-800/30">
                                <TableCell className="font-semibold">{row.lockTime}</TableCell>
                                <TableCell className="font-semibold">{row.amount}</TableCell>
                                <TableCell><Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{row.power}</Badge></TableCell>
                                <TableCell className="font-mono text-sm">{row.unlockAt}</TableCell>
                                <TableCell><Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">{row.status}</Badge></TableCell>
                                <TableCell>
                                    <Button size="sm" variant="outline" disabled className="border-gray-600 text-gray-500">
                                        <Lock className="w-3 h-3 mr-1" />
                                        Locked
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        if (mode === "nft") {
            return (
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-700">
                            <TableHead className="text-gray-300">Token ID</TableHead>
                            <TableHead className="text-gray-300">Liquidity</TableHead>
                            <TableHead className="text-gray-300">Fee Tier</TableHead>
                            <TableHead className="text-gray-300">Rewards</TableHead>
                            <TableHead className="text-gray-300">Status</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nftHistory.map((row, i) => (
                            <TableRow key={i} className="border-gray-700 hover:bg-gray-800/30">
                                <TableCell className="font-mono font-semibold text-purple-400">{row.tokenId}</TableCell>
                                <TableCell className="font-semibold">{row.liquidity}</TableCell>
                                <TableCell><Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">{row.fee}</Badge></TableCell>
                                <TableCell className="font-semibold text-green-400">{row.rewards}</TableCell>
                                <TableCell><Badge variant="secondary" className={row.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>{row.status}</Badge></TableCell>
                                <TableCell>
                                    <Button size="sm" variant="outline" className="border-gray-600 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400">
                                        <Unlock className="w-3 h-3 mr-1" />
                                        Withdraw
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        return null;
    };

    const renderStakeDialog = () => (
        <Dialog open={isStakeDialogOpen} onOpenChange={setIsStakeDialogOpen}>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {mode === "nft" ? "Stake NFT Positions" : "Stake Tokens"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {mode === "nft" ? (
                        <div className="space-y-2">
                            <label htmlFor="nft-tokens" className="text-gray-300 text-sm font-medium">NFT Token IDs (comma separated)</label>
                            <Input
                                id="nft-tokens"
                                placeholder="12345, 67890, 11111"
                                value={nftTokenIds}
                                onChange={(e) => setNftTokenIds(e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                            />
                            <p className="text-sm text-gray-400">Enter Uniswap V3 LP NFT token IDs</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label htmlFor="amount" className="text-gray-300 text-sm font-medium">Amount</label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount to stake"
                                value={stakingAmount}
                                onChange={(e) => setStakingAmount(e.target.value)}
                                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                            />
                        </div>
                    )}
                    {(mode === "lock" || mode === "multiple") && (
                        <div className="space-y-3">
                            <label className="text-gray-300 text-sm font-medium">Lock Duration</label>
                            {mode === "multiple" ? (
                                <div className="grid grid-cols-1 gap-2">
                                {lockOptions.map((option) => (
                                    <div
                                        key={option.days}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedLockDuration === option.days ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800/50 hover:border-gray-500"}`}
                                        onClick={() => setSelectedLockDuration(option.days)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-white">{option.days} Days</div>
                                                <div className="text-sm text-gray-400">APY: {option.apy}</div>
                                            </div>
                                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{option.multiplier}x</Badge>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="relative">
                                        <select
                                            value={selectedLockDuration.toString()}
                                            onChange={(e) => setSelectedLockDuration(parseInt(e.target.value))}
                                            className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 appearance-none cursor-pointer hover:border-gray-500 focus:border-blue-500 focus:outline-none"
                                        >
                                        {lockOptions.map((option) => (
                                            <option key={option.days} value={option.days.toString()}>{option.days} Days - {option.apy} APY ({option.multiplier}x)</option>
                                        ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {selectedOption && (
                                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-300">Estimated Unlock Time:</span>
                                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Calendar className="w-3 h-3 mr-1" />{selectedOption.days} Days</Badge>
                                    </div>
                                    <p className="text-sm font-mono text-blue-300">{calculateUnlockTime(selectedOption.days)}</p>
                                    <div className="flex justify-between mt-2 text-sm">
                                        <span className="text-gray-400">Power Multiplier:</span>
                                        <span className="text-purple-400 font-semibold">{selectedOption.multiplier}x</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Estimated APY:</span>
                                        <span className="text-green-400 font-semibold">{selectedOption.apy}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsStakeDialogOpen(false)} className="flex-1 border-gray-600 hover:border-gray-500">Cancel</Button>
                        <Button
                            onClick={() => {
                                setIsStakeDialogOpen(false);
                                setStakingAmount("");
                                setNftTokenIds("");
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                            {mode === "nft" ? "Stake NFTs" : "Stake Tokens"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono">
            <div className="bg-gradient-to-r from-gray-900/80 via-blue-900/20 to-purple-900/20 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="mt-[120px] flex items-center justify-between"></div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">            
                <Link href={"/earn"} prefetch={false} className="underline hover:font-bold pl-4 xl:ml-4 pb-[6px]">Back to All Programs</Link>
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/20">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-400" />Program Overview</CardTitle>
                        <div className="flex gap-2">
                            <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="border-green-600 hover:border-green-500 hover:bg-green-500/10 text-green-400"><TrendingUp className="w-4 h-4 mr-1" />Extend Program</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                                    <DialogHeader><DialogTitle className="text-green-400">Extend Staking Program</DialogTitle></DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div>
                                            <label htmlFor="total-reward" className="text-gray-300 text-sm font-medium">Total Reward</label>
                                            <Input id="total-reward" placeholder="10000" className="bg-gray-800 border-gray-600" />
                                        </div>
                                        <div>
                                            <label htmlFor="new-end-block" className="text-gray-300 text-sm font-medium">New End Block</label>
                                            <Input id="new-end-block" placeholder="20000000" className="bg-gray-800 border-gray-600" />
                                        </div>
                                        <div className="flex gap-3">
                                            <Button variant="outline" onClick={() => setIsExtendDialogOpen(false)} className="flex-1">Cancel</Button>
                                            <Button onClick={() => setIsExtendDialogOpen(false)} className="flex-1 bg-green-600 hover:bg-green-700">Extend</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="border-red-600 hover:border-red-500 hover:bg-red-500/10 text-red-400"><Settings className="w-4 h-4 mr-1" />Cancel Program</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                                    <DialogHeader><DialogTitle className="text-red-400">Cancel Staking Program</DialogTitle></DialogHeader>
                                    <div className="py-4">
                                        <p className="text-gray-300 mb-4">Are you sure you want to cancel this staking program? This action cannot be undone and will pause all staking activities.</p>
                                        <div className="flex gap-3">
                                            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)} className="flex-1">Cancel</Button>
                                            <Button onClick={() => setIsCancelDialogOpen(false)} className="flex-1 bg-red-600 hover:bg-red-700">Confirm Cancel</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {renderStatsCard(<Users className="w-5 h-5" />, "Total Users", "1,245", "+5.2%")}
                            {renderStatsCard(<Zap className="w-5 h-5" />, "Total Power", "54,000 Power", "+12.3%", "bg-purple-500/20 text-purple-400")}
                            {renderStatsCard(<DollarSign className="w-5 h-5" />, "Total TVL", "$123,456", "+8.7%", "bg-green-500/20 text-green-400")}
                            {renderStatsCard(<Coins className="w-5 h-5" />, "Reward Pool", "9,000 TOKEN", "-2.1%", "bg-yellow-500/20 text-yellow-400")}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm border border-gray-600/20">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" />Your Position
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                                    <p className="text-gray-400 text-sm mb-1">Your Stake</p>
                                    <p className="text-2xl font-bold text-white">1,000 TOKEN</p>
                                    <p className="text-sm text-gray-400">≈ $120.00</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                                    <p className="text-gray-400 text-sm mb-1">Pending Rewards</p>
                                    <p className="text-2xl font-bold text-green-400">45 TOKEN</p>
                                    <p className="text-sm text-gray-400">≈ $5.40</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                {renderActionButton(<Coins className="w-4 h-4" />, "Harvest", () => {})}
                                {renderActionButton(<TrendingUp className="w-4 h-4" />, "Deposit", () => setIsStakeDialogOpen(true))}
                                {renderActionButton(<Unlock className="w-4 h-4" />, "Withdraw", () => {}, "destructive")}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex flex-wrap gap-3">
                    <Button variant={mode === "staking" ? "default" : "outline"} onClick={() => setMode("staking")} className={mode === "staking" ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25" : "border-gray-600 hover:border-blue-500/50 hover:bg-blue-500/10"}>
                        <Coins className="w-4 h-4 mr-2" />
                        Flexible Staking
                    </Button>
                    <Button variant={mode === "lock" ? "default" : "outline"} onClick={() => setMode("lock")} className={mode === "lock" ? "bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25" : "border-gray-600 hover:border-orange-500/50 hover:bg-orange-500/10"}>
                        <Lock className="w-4 h-4 mr-2" />
                        Fixed Lock
                    </Button>
                    <Button variant={mode === "multiple" ? "default" : "outline"} onClick={() => setMode("multiple")} className={mode === "multiple" ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/25" : "border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/10"}>
                        <Zap className="w-4 h-4 mr-2" />
                        Multiple Lock
                    </Button>
                    <Button variant={mode === "nft" ? "default" : "outline"} onClick={() => setMode("nft")} className={mode === "nft" ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25" : "border-gray-600 hover:border-cyan-500/50 hover:bg-cyan-500/10"}>
                        <Trophy className="w-4 h-4 mr-2" />
                        NFT Staking
                    </Button>
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20 mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-4">
                            <button onClick={() => setActiveTab("history")} className={`px-3 py-2 rounded-md font-medium transition ${activeTab === "history" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"}`}>
                                Transaction History
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Mode:</span>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 capitalize">{mode}</Badge>
                        </div>
                    </div>
                    {activeTab === "overview" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Card className="bg-gradient-to-br from-gray-800/40 to-gray-700/20 border border-gray-600/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Position Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-lg bg-gray-900/40 border border-gray-700">
                                                <p className="text-sm text-gray-400">Total Stake</p>
                                                <p className="text-2xl font-bold">1,000 TOKEN</p>
                                                <p className="text-sm text-gray-400">≈ $120</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-gray-900/40 border border-gray-700">
                                                <p className="text-sm text-gray-400">Total Power</p>
                                                <p className="text-2xl font-bold">3,000 Power</p>
                                                <p className="text-sm text-gray-400">APY range 12% - 45%</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-gray-900/40 border border-gray-700">
                                                <p className="text-sm text-gray-400">Pending Rewards</p>
                                                <p className="text-2xl font-bold text-green-400">45 TOKEN</p>
                                                <p className="text-sm text-gray-400">≈ $5.4</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-gray-900/40 border border-gray-700">
                                                <p className="text-sm text-gray-400">Reward Pool</p>
                                                <p className="text-2xl font-bold">9,000 TOKEN</p>
                                                <p className="text-sm text-gray-400">Distributed across farms</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div>
                                <Card className="bg-gradient-to-br from-gray-800/40 to-gray-700/20 border border-gray-600/20">
                                    <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-3">
                                            <Button onClick={() => setIsStakeDialogOpen(true)} className="w-full">Deposit / Stake</Button>
                                            <Button variant="outline" className="w-full">Claim Rewards</Button>
                                            <Button variant="destructive" className="w-full">Withdraw</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : 
                    <div className="overflow-x-auto">{renderTable()}</div>}
                </div>
            </div>
            {renderStakeDialog()}
        </div>
    );
}
