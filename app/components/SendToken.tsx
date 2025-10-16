"use client";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { simulateContract, waitForTransactionReceipt, writeContract, getBalance, sendTransaction, type WriteContractErrorType } from "@wagmi/core";
import { Button } from "@/components/ui/button";
import { createPublicClient, http, erc20Abi } from "viem";
import { jbc, bitkub, monadTestnet, bitkubTestnet, mainnet } from "viem/chains";
import { Copy, CopyCheck,ScanQrCode,ChevronDown } from "lucide-react";
import { config } from "../../config/reown";
import { chains } from '@/lib/chains'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import QRScannerModal from "./QRScannerModal";

type ChainConfig = {
    chain: any;
    chainId: number;
    explorer: string;
    rpc: string;
    blocktime: number;
    nameService?: "ENS" | "KNS";
    lib: { tokens: any; };
};

const chainConfigs: Record<number, ChainConfig> = {
    25925: {
        chain: bitkubTestnet,
        chainId: 25925,
        explorer: "https://testnet.kubscan.com/",
        rpc: "https://rpc-testnet.bitkubchain.io",
        blocktime: 5,
        lib: { tokens: chains[25925].tokens },
    },
    96: {
        chain: bitkub,
        chainId: 96,
        explorer: "https://www.kubscan.com/",
        rpc: "https://rpc.bitkubchain.io",
        blocktime: 5,
        nameService: "KNS",
        lib: { tokens: chains[96].tokens },
    },
    8899: {
        chain: jbc,
        chainId: 8899,
        explorer: "https://exp.jbcha.in/",
        rpc: "https://rpc2-l1.jbc.xpool.pw",
        blocktime: 5,
        lib: { tokens: chains[8899].tokens },
    },
    10143: {
        chain: monadTestnet,
        chainId: 10143,
        explorer: "https://testnet.monadexplorer.com/",
        rpc: "https://testnet-rpc.monad.xyz",
        blocktime: 5,
        lib: { tokens: chains[10143].tokens },
    },
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
    const [recipient, setRecipient] = useState("");
    const [showScanner, setShowScanner] = useState(false);


    async function resolveNameIfNeeded(input: string) {
        if (!nameService) return input;
        try {
            const resolved = await publicClient.getEnsAddress({name: input});
            return resolved ?? input as '0xstring';
        } catch (e) {
            return input as '0xstring';
        }
    }

    async function handleSend() {
        if (!address) return;
        setIsLoading(true);
        try {
            const toResolved = await resolveNameIfNeeded(to);
            setResolvedTo(toResolved);
            if (token.value === "0xnative" as "0xstring") {
                const tx = await sendTransaction(config, {account: address, to: toResolved as `0x${string}`, value: BigInt(Number(amount) * 1e18), chainId: Number(chain.chainId)});
                await waitForTransactionReceipt(config, { hash: tx });
            } else {
                const { request } = await simulateContract(config, {account: address, address: token.value as `0x${string}`, abi: erc20Abi, functionName: "transfer", args: [toResolved as '0xstring', BigInt(Number(amount) * 1e18)]});
                const tx = await writeContract(config,request);
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
            bal = nativeBal.value - BigInt(1e15); // reserve handle - 0.001 for gas 
        } else {
            const ercBal = await publicClient.readContract({
            address: token.value as `0x${string}`,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
            });
            bal = BigInt(ercBal);
        }
        const factor = BigInt(10) ** BigInt(18 - decimals);
        const truncated = bal / factor;
        const str = truncated.toString().padStart(decimals + 1, "0"); // pad เผื่อกรณี <1
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 pr-12 mt-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder={`0x... or ${nameService ?? "address"}`}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                        <ScanQrCode onClick={() => setShowScanner(true)} />
                    </div>
                </div>
            </div>
            {showScanner && <QRScannerModal onClose={() => setShowScanner(false)} onScan={(addr: `0x${string}`) => setTo(addr)} />}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Send</label>
                <div className="flex gap-3">
                    <input
                        type="number"
                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button className="px-6 py-3 Token font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 rounded-lg active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" onClick={() => handleMax(10)}>MAX</Button>
                </div>
            </div>
            <Button className="w-full py-4 px-8 Token font-bold uppercase tracking-wider text-white relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 hover:scale-[1.02] hover:custom-gradient hover:custom-text-shadow hover-effect shadow-lg shadow-emerald-500/40 rounded-lg active:translate-y-[-1px] active:scale-[1.01] active:duration-100 cursor-pointer" onClick={handleSend}>
                Send {Number(amount).toLocaleString()} {token.name}
            </Button>
        </div>
    );
}
