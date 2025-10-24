"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { simulateContract, waitForTransactionReceipt, writeContract, getBalance, sendTransaction, type WriteContractErrorType } from "@wagmi/core";
import { Button } from "@/components/ui/button";
import { createPublicClient, http, erc20Abi, parseUnits } from "viem";
import { jbc, bitkub, bitkubTestnet, bsc } from "viem/chains";
import { Copy, CopyCheck,ScanQrCode,ChevronDown } from "lucide-react";
import { config } from "../../config/reown";
import { chains } from '@/lib/chains'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import QRScannerModal from "./QRScannerModal";

type ChainConfig = { chain: any; chainId: number; explorer: string; rpc: string; blocktime: number; nameService?: "ENS" | "KNS"; lib: { tokens: any; }; };
const chainConfigs: Record<number, ChainConfig> = {
    25925: {chain: bitkubTestnet, chainId: 25925, explorer: "https://testnet.kubscan.com/", rpc: "https://rpc-testnet.bitkubchain.io", blocktime: 5, lib: { tokens: chains[25925].tokens } },
    96: { chain: bitkub, chainId: 96, explorer: "https://www.kubscan.com/", rpc: "https://rpc.bitkubchain.io", blocktime: 5, nameService: "KNS", lib: { tokens: chains[96].tokens } },
    8899: { chain: jbc, chainId: 8899, explorer: "https://exp.jbcha.in/", rpc: "https://rpc2-l1.jbc.xpool.pw", blocktime: 5, lib: { tokens: chains[8899].tokens } },
    56: { chain: bsc, chainId: 56, explorer: "https://bscscan.com/", rpc: "https://bsc-dataseed1.binance.org/", blocktime: 3, lib: { tokens: chains[56].tokens } }
};

export default function SendTokenComponent({ setIsLoading, setErrMsg, chainConfig }: {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setErrMsg: React.Dispatch<React.SetStateAction<WriteContractErrorType | null>>;
    chainConfig: number;
}) {
    const { address } = useAccount();
    const selectedChainConfig = chainConfigs[chainConfig || 96];
    const { chain, rpc, nameService, lib } = selectedChainConfig;
    const publicClient = createPublicClient({chain, transport: http(rpc)});
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("");
    const [resolvedTo, setResolvedTo] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = React.useState<{ name: string; value: "0xstring"; logo: string; }>(lib.tokens[0]);
    const [showScanner, setShowScanner] = useState(false);
    const [isMultiTransfer, setIsMultiTransfer] = useState(false);
    const [multiInput, setMultiInput] = useState("");
    const [multiMode, setMultiMode] = useState<"fixed" | "variable">("fixed");
    const [variableMinAmount, setVariableMinAmount] = useState("");
    const [variableMaxAmount, setVariableMaxAmount] = useState("");
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [amountMode, setAmountMode] = useState<"equal" | "specific">("equal");
    const [specificAmounts, setSpecificAmounts] = useState<{ address: string; amount: string }[]>([]);
    const parseAddresses = (input: string) => input.split(/[\n,]+/).map((addr) => addr.trim()).filter(Boolean);
    const multiAddresses = React.useMemo(() => parseAddresses(multiInput), [multiInput]);
    const amountLabel = isMultiTransfer ?  multiMode === "variable" ? "Amount Range (per address)" : "Amount per Address" : "Amount to Send";
    const downloadCSVTpl = () => {
        const csv = "address,amount\n0x1234567890123456789012345678901234567890,0.1\n0x0987654321098765432109876543210987654321,0.2";
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transfer_template.csv";
        a.click();
        URL.revokeObjectURL(url);
    };
    const parseAddressAmountCSV = (csvText: string): { address: string; amount: string }[] => {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) throw new Error("CSV must have header and at least one data row");
        const header = lines[0].toLowerCase().trim();
        if (!header.includes('address') || !header.includes('amount')) throw new Error("CSV must have 'address' and 'amount' columns");
        const result: { address: string; amount: string }[] = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const parts = line.split(',').map(p => p.trim());
            if (parts.length < 2) continue;
            const address = parts[0];
            const amount = parts[1];
            if (address && amount) result.push({ address, amount });
        }
        return result;
    };
    async function resolveNameIfNeeded(input: string) {
        if (!nameService) return input;
        try {
            const resolved = await publicClient.getEnsAddress({name: input});
            return resolved ?? input as '0xstring';
        } catch (e) {
            return input as '0xstring';
        }
    }
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            if (amountMode === "specific") {
                const parsed = parseAddressAmountCSV(text);
                setSpecificAmounts(parsed);
                setMultiInput(parsed.map(item => item.address).join('\n'));
            } else {
                setMultiInput(text);
                setSpecificAmounts([]);
            }
            setUploadError(null);
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : "Unable to read file. Please try again.");
        } finally {
            input.value = "";
        }
    };
    const getRandomAmountInRange = (min: number, max: number) => {
        if (max <= min) return min.toFixed(10);
        const random = Math.random() * (max - min) + min;
        return random.toFixed(10);
    };
    async function handleSend() {
        if (!address) return;
        setIsLoading(true);
        try {
            if (isMultiTransfer) {
                if (multiAddresses.length === 0) throw new Error("Add at least one destination address.");
                let perAddressAmounts: string[] = [];
                if (multiMode === "fixed" && amountMode === "equal") {
                    const normalizedAmount = amount.trim();
                    if (!normalizedAmount || Number(normalizedAmount) <= 0) throw new Error("Enter a valid amount per address.");
                    perAddressAmounts = multiAddresses.map(() => normalizedAmount);
                } else if (multiMode === "fixed" && amountMode === "specific") {
                    if (specificAmounts.length === 0) throw new Error("Upload a CSV with specific amounts.");
                    perAddressAmounts = specificAmounts.map(item => item.amount);
                } else if (multiMode === "variable") {
                    const min = Number(variableMinAmount);
                    const max = Number(variableMaxAmount);
                    if (Number.isNaN(min) || Number.isNaN(max) || min <= 0 || max <= 0) throw new Error("Enter valid minimum and maximum amounts.");
                    if (max < min) throw new Error("Maximum amount must be greater than or equal to minimum amount.");
                    perAddressAmounts = multiAddresses.map(() => getRandomAmountInRange(min, max));
                }
                const addressesToProcess = amountMode === "specific" && specificAmounts.length > 0 ? specificAmounts.map(item => item.address) : multiAddresses;
                for (let i = 0; i < addressesToProcess.length; i += 1) {
                    const rawTarget = addressesToProcess[i];
                    const toResolved = await resolveNameIfNeeded(rawTarget);
                    setResolvedTo(toResolved);
                    const amountForRecipient = parseUnits(perAddressAmounts[i], 18);
                    if (token.value === "0xnative" as "0xstring") {
                        const tx = await sendTransaction(config, {account: address, to: toResolved as `0x${string}`, value: amountForRecipient, chainId: Number(chain.chainId)});
                        await waitForTransactionReceipt(config, { hash: tx });
                    } else {
                        const { request } = await simulateContract(config, {account: address, address: token.value as `0x${string}`, abi: erc20Abi, functionName: "transfer", args: [toResolved as "0xstring", amountForRecipient]});
                        const tx = await writeContract(config, request);
                        await waitForTransactionReceipt(config, { hash: tx });
                    }
                }
                return;
            }
            const toResolved = await resolveNameIfNeeded(to);
            setResolvedTo(toResolved);
            const normalizedAmount = amount.trim();
            if (!normalizedAmount || Number(normalizedAmount) <= 0) throw new Error("Enter a valid amount to send.");
            const amountToSend = parseUnits(normalizedAmount, 18);
            if (token.value === "0xnative" as "0xstring") {
                const tx = await sendTransaction(config, {account: address, to: toResolved as `0x${string}`, value: amountToSend, chainId: Number(chain.chainId)});
                await waitForTransactionReceipt(config, { hash: tx });
            } else {
                const { request } = await simulateContract(config, {account: address, address: token.value as `0x${string}`, abi: erc20Abi, functionName: "transfer", args: [toResolved as "0xstring", amountToSend]});
                const tx = await writeContract(config, request);
                await waitForTransactionReceipt(config, { hash: tx });
            }
        } catch (err) {
            setErrMsg(err as WriteContractErrorType);
        } finally {
            setIsLoading(false);
        }
    }
    async function handleMax(decimals: number = 10) {
        if (!address) return;
        let bal: bigint;
        if (token.value === "0xnative" as '0xstring') {
            const nativeBal = await getBalance(config, { address });
            bal = nativeBal.value - BigInt(1e15);
        } else {
            const ercBal = await publicClient.readContract({address: token.value as `0x${string}`, abi: erc20Abi, functionName: "balanceOf", args: [address]});
            bal = BigInt(ercBal);
        }
        const factor = BigInt(10) ** BigInt(18 - decimals);
        const truncated = bal / factor;
        const str = truncated.toString().padStart(decimals + 1, "0");
        const integerPart = str.slice(0, -decimals) || "0";
        const decimalPart = str.slice(-decimals).padEnd(decimals, "0");
        setAmount(`${integerPart}.${decimalPart}`);
    }
    const renderToken = async(value: string) => {
        if (!address) return;
        if (value === "0xnative") {
            const bal = await getBalance(config, { address });
            setBalance((Number(bal.value) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 }));
        } else {
            const bal = await publicClient.readContract({address: value as `0x${string}`, abi: erc20Abi, functionName: "balanceOf", args: [address]});
            setBalance((Number(bal) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 6 }));
        }
    };
    React.useEffect(() => {renderToken(token.value);}, [token])

    return (
        <div className="p-6 border rounded-2xl shadow-md max-w-md mx-auto min-h-[300px] mb-8">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-400">Send {token.name}</h2>        
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-500 Token text-sm">Select Token</span>
                    <span className="text-emerald-600 Token text-sm font-medium">Balance: {balance}</span>
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full bg-[#162638] hover:bg-[#1e3048] text-white border-[#00ff9d]/20 Token flex items-center justify-between h-12 cursor-pointer rounded-lg">
                        <div className="gap-3 flex flex-row items-center justify-start">
                            <div className="w-6 h-6 rounded-full bg-[#00ff9d]/20 flex items-center justify-center">
                                {token.logo !== "../favicon.ico" ? <img alt="" src={token.logo} className="size-6 shrink-0 rounded-full" /> : <span className="text-[#00ff9d] text-sm">?</span>}
                            </div>
                            <span className="truncate font-medium">{token.name}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-[#00ff9d]" />
                    </Button>
                </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 z-100">
                        <Command>
                            <CommandInput placeholder="Search tokens..." />
                            <CommandList>
                                <CommandEmpty>No tokens found.</CommandEmpty>
                                <CommandGroup>
                                {lib.tokens.map((token: any) => (
                                    <CommandItem
                                        key={token.name}
                                        value={token.name}
                                        onSelect={() => {
                                            renderToken(token.value);
                                            setToken(token);
                                            setAmount('')
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <img alt="" src={token.logo} className="size-5 shrink-0 rounded-full" />
                                            <span className="ml-3 truncate">{token.name}</span>
                                        </div>
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {token.value !== ("0xnative" as "0xstring") && (
                    <div className="flex items-center justify-between mt-2 p-2 bg-[#162638] rounded-lg">
                        <span className="text-[11px] lg:text-[14px] text-white Token truncate pr-2">{`${token.value}`}</span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(token.value);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className="text-gray-500 hover:text-emerald-600 transition-colors"
                        >
                            {copied ? <CopyCheck size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                )}
            </div>
            <div className="mb-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <label className="block text-sm font-medium text-gray-700">{isMultiTransfer ? "Recipient Addresses" : "Recipient Address"}</label>
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-400 text-emerald-500 focus:ring-emerald-500"
                            checked={isMultiTransfer}
                            onChange={(event) => {
                                const checked = event.target.checked;
                                setIsMultiTransfer(checked);
                                if (checked) {
                                    setShowScanner(false);
                                }
                            }}
                        />
                        Transfer to Multiple Addresses
                    </label>
                </div>
                {isMultiTransfer ? (
                    <div className="flex flex-col gap-3">
                        <textarea value={multiInput} onChange={(e) => setMultiInput(e.target.value)} placeholder="Paste comma or line separated addresses" className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-sm" />
                        <div className="flex flex-wrap items-center gap-3">
                            <label htmlFor="multi-file-upload" className="cursor-pointer px-4 py-2 border border-dashed border-gray-500 rounded-lg text-xs uppercase tracking-wide text-gray-400 hover:border-emerald-500 hover:text-emerald-400 transition">
                                Upload {amountMode === "specific" ? "CSV with Amounts" : "Addresses"} (.txt / .csv)
                            </label>
                            <input id="multi-file-upload" type="file" accept=".txt,.csv" className="hidden" onChange={handleFileUpload} />
                            <span className="text-xs text-gray-500">
                                Detected {multiAddresses.length} address{multiAddresses.length === 1 ? "" : "es"}
                                {amountMode === "specific" && specificAmounts.length > 0 && ` with ${specificAmounts.length} specific amounts`}
                            </span>
                        </div>
                        {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
                    </div>
                ) : (
                    <div className="relative">
                        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder={`0x... or ${nameService ?? "address"}`} type="text" className="w-full border border-gray-300 rounded-lg p-3 pr-12 mt-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-base" />
                        <div className="absolute inset-y-0 right-3 flex items-center"><ScanQrCode onClick={() => setShowScanner(true)} /></div>
                    </div>
                )}
            </div>
            {showScanner && !isMultiTransfer && (<QRScannerModal onClose={() => setShowScanner(false)} onScan={(addr: `0x${string}`) => setTo(addr)} />)}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">{amountLabel}</label>
                    {isMultiTransfer && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <button onClick={() => setMultiMode("fixed")} aria-pressed={multiMode === "fixed"} type="button" className={`h-9 px-4 text-xs font-semibold uppercase tracking-wide rounded-lg border transition ${multiMode === "fixed" ? "bg-emerald-500 text-white border-emerald-500" : "bg-[#162638] text-gray-300 border-[#1f2f46]"}`}>Fixed Rate</button>
                                <button onClick={() => setMultiMode("variable")} aria-pressed={multiMode === "variable"} type="button" className={`h-9 px-4 text-xs font-semibold uppercase tracking-wide rounded-lg border transition ${multiMode === "variable" ? "bg-emerald-500 text-white border-emerald-500" : "bg-[#162638] text-gray-300 border-[#1f2f46]"}`}>Variable Rate</button>
                            </div>
                            {multiMode === "fixed" && (
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 text-xs text-gray-400">
                                        <input type="radio" name="amountMode" checked={amountMode === "equal"} onChange={() => setAmountMode("equal")} className="h-3 w-3 text-emerald-500 focus:ring-emerald-500" />
                                        Equal Amount
                                    </label>
                                    <label className="flex items-center gap-2 text-xs text-gray-400">
                                        <input type="radio" name="amountMode" checked={amountMode === "specific"} onChange={() => setAmountMode("specific")} className="h-3 w-3 text-emerald-500 focus:ring-emerald-500" />
                                        Specific Amounts
                                    </label>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {isMultiTransfer && multiMode === "variable" ? (
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input value={variableMinAmount} onChange={(e) => setVariableMinAmount(e.target.value)} placeholder="Min amount" type="number" min="0" className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-base" />
                            <input value={variableMaxAmount} onChange={(e) => setVariableMaxAmount(e.target.value)} placeholder="Max amount" type="number" min="0" className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-base" />
                        </div>
                        <p className="text-xs text-gray-500">Each address receives a random amount within the specified range.</p>
                    </div>
                ) : isMultiTransfer && multiMode === "fixed" && amountMode === "specific" ? (
                    <div className="flex flex-col gap-3">
                        <div className="p-3 bg-[#162638] rounded-lg border border-gray-600">
                            <p className="text-xs text-gray-400 mb-2">Upload CSV with specific amounts per address.</p>
                            <p className="text-xs text-gray-500 mb-3">Format: address,amount (one per line)</p>
                            <div className="flex items-center gap-2">
                                <button onClick={downloadCSVTpl} className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">Download Template</button>
                                {specificAmounts.length > 0 && <span className="text-xs text-emerald-400">Loaded {specificAmounts.length} specific amounts</span>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-[2fr_1fr] gap-3">
                        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0" className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-base" placeholder="0.00" />
                        <Button onClick={() => handleMax(10)} className="p-6 Token font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 rounded-lg active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer">MAX</Button>
                    </div>
                )}
            </div>
            <Button className="w-full py-4 px-8 Token font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 rounded-lg active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" onClick={handleSend}>Send</Button>
        </div>
    );
}
