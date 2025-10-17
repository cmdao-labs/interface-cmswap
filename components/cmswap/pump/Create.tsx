'use client';
import Link from "next/link";
import { ArrowLeft, UploadCloud, Info, Loader2 } from "lucide-react";
import { useConnections, useAccount } from "wagmi";
import { parseEther } from "viem";
import { writeContract } from "@wagmi/core";
import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { config } from "@/config/reown";
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";
import { useRouter } from "next/navigation";
import CustomPopup from "@/components/cmswap/popup-modal";

export default function Create({ mode, chain, token, }: {
    mode: string;
    chain: string;
    token: string;
}) {
    const router = useRouter();
    const connections = useConnections();

    let _chainId = 0;
    if (chain === "kubtestnet" || chain === "") _chainId = 25925;
    let currencyAddr = "";
    let bkgafactoryAddr = "";
    if ((chain === "kubtestnet" || chain === "") && (mode === "pro" || mode === "") && (token === "")) {
        currencyAddr = "0x700D3ba307E1256e509eD3E45D6f9dff441d6907";
        bkgafactoryAddr = "0x46a4073c830031ea19d7b9825080c05f8454e530";
    }
    const factoryContract = {address: bkgafactoryAddr as "0xstring", abi: ERC20FactoryV2ABI, chainId: _chainId} as const;

    const account = useAccount();
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [ticker, setTicker] = useState("");
    const [desp, setDesp] = useState("");
    const [isLaunching, setIsLaunching] = useState(false);
    const [popupState, setPopupState] = useState({
        isOpen: false,
        header: "",
        description: "",
        actionButton: null as ReactNode | null,
        footer: null as ReactNode | null,
    });

    const chainLabel = useMemo(() => {
        switch (chain) {
            case "kubtestnet":
                return "Bitkub Testnet";
            default:
                return chain ? chain.toUpperCase() : "Bitkub Chain";
        }
    }, [chain]);

    const modeLabel = mode === "pro" ? "Pro Mode" : "Lite Mode";
    const isWalletReady = Boolean(connections) && account.address !== undefined && account.chainId === _chainId;

    const deploymentCostCopy = useMemo(() => {
        if ((chain === "kubtestnet" || chain === "") && (mode === "pro" || mode === "") && (token === "cmm" || token === "")) return "0 tKUB (network fee not included)";
        return "Gas fee only";
    }, [chain, mode, token]);

    const requirementNotes = useMemo(() => {
        const notes: string[] = [];
        notes.push("Your logo is automatically pinned to IPFS; 512x512 PNG works best.");
        notes.push("Connect to the correct network before confirming the transaction.");
        return notes;
    }, [mode, token]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;
        setFile(selected);
    };

    const handleIpfsUpload = (upload: any) => {
        if (!upload || upload.IpfsHash === undefined) {
            setPopupState({
                isOpen: true,
                header: "IPFS Upload Failed",
                description: "Upload IPFS Fail, please contact support.",
                actionButton: null,
                footer: (
                    <span>
                        Contact support at{" "}
                        <Link href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer" className="underline transition hover:font-bold">Discord</Link>
                    </span>
                ),
            });
            return false;
        }
        return true;
    };

    const closePopup = () => {
        setPopupState((prev) => ({ ...prev, isOpen: false }));
    };

    const _launch = async () => {
        if (!file) {
            setPopupState({
                isOpen: true,
                header: "Missing Logo",
                description: "Please attach a token logo before launching.",
                actionButton: null,
                footer: null,
            });
            return;
        }

        try {
            setIsLaunching(true);
            setPopupState({
                isOpen: true,
                header: "Creating Token",
                description: "Your token is being launched, please wait...",
                actionButton: null,
                footer: null,
            });

            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/pump/api/files", { method: "POST", body: data });
            const upload = await uploadRequest.json();

            if (!handleIpfsUpload(upload)) return;

            let result = "";
            if (chain === "kubtestnet" && mode === "pro") {
                result = await writeContract(config, {
                    ...factoryContract,
                    functionName: "createToken",
                    args: [name, ticker, `ipfs://${upload.IpfsHash}`, desp, "ipfs://bafkreiexe7q5ptjflrlccf3vtqdbpwk36j3emlsulksx7ot52e3uqyqu3u", "l2", "l3"],
                    value: parseEther("0"),
                });
            }

            setPopupState({
                isOpen: true,
                header: "Launch Successful",
                description: "Your token has been launched successfully!",
                actionButton: (
                    <button
                        onClick={() => {
                        closePopup();
                        router.replace(`/pump/launchpad?chain=${chain}&mode=${mode}`);
                        }}
                        className="rounded-full border border-emerald-400/40 bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30"
                    >
                        Go to Launchpad
                    </button>
                ),
                footer: null,
            });

            setName("");
            setTicker("");
            setDesp("");
            setFile(null);
            router.replace(`/pump/launchpad?chain=${chain}&mode=${mode}`);
        } catch (e) {
            console.warn(e);
            setPopupState({
                isOpen: true,
                header: "Launch Failed",
                description: `Launch fail with reason ${e}`,
                actionButton: null,
                footer: null,
            });
        } finally {
            setIsLaunching(false);
        }
    };

    const launch = () => {
        void _launch();
    };

    const buttonDisabled = !isWalletReady || isLaunching;
    const buttonLabel = isWalletReady ? (isLaunching ? "Launching..." : "Launch Meme Token") : "Connect Wallet to Launch";

    return (
        <main className="relative min-h-screen w-full overflow-hidden pt-14 sm:pt-20 text-white">
            <div className="w-full my-4 px-4 flex items-center gap-6 text-[8px] sm:text-sm">
                <Link
                    href={`/pump/launchpad?chain=${chain}${mode === "pro" ? "&mode=pro" : "&mode=lite"}`}
                    prefetch={false}
                    className="rounded-full border border-white/10 bg-white/5 p-1 transition hover:border-white/30 hover:bg-white/10"
                    aria-label="Back to launchpad"
                >
                    <ArrowLeft className="h-6 w-6" aria-hidden="true" />
                </Link>
                <div className="flex gap-2 uppercase tracking-[0.2em] text-white/60">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{chainLabel}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{modeLabel}</span>
                </div>
            </div>

            <section className="relative sm:mx-4 flex flex-col gap-8 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    Create a meme <span className="inline-block">🚀</span>
                </h1>

                <form action={launch} className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-wide text-white/50">Coin Name</span>
                                <input
                                    className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-emerald-400/80 focus:bg-white/[0.08]"
                                    placeholder="e.g. Cosmic Meme"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-wide text-white/50">Ticker</span>
                                <input
                                    className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-emerald-400/80 focus:bg-white/[0.08]"
                                    placeholder="e.g. COSMIC"
                                    value={ticker}
                                    onChange={(e) => setTicker(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <label className="flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/50">
                                <span>Description</span>
                                <span className="text-[10px] font-normal text-white/35">{desp.length}/200</span>
                            </div>
                            <textarea
                                className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-emerald-400/80 focus:bg-white/[0.08]"
                                placeholder="Share your meme coin&apos;s backstory in a sentence or two."
                                value={desp}
                                onChange={(e) => setDesp(e.target.value)}
                                maxLength={200}
                            />
                        </label>

                        <div className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-wide text-white/50">Token Logo</span>
                            <label className="group relative flex flex-col gap-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.04] px-4 py-6 transition hover:border-emerald-300/60 hover:bg-emerald-300/5">
                                <div className="flex flex-col gap-1 text-sm">
                                    <span className="font-medium text-white">{file ? file.name : "Upload PNG, JPG or GIF (max 2MB)"}</span>
                                    <span className="text-xs text-white/40">512 x 512 recommended - Transparent background preferred</span>
                                </div>
                                <div className="flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition group-hover:bg-emerald-400/20 group-hover:text-emerald-100">
                                    <UploadCloud className="h-4 w-4" aria-hidden="true" />
                                    <span>Select logo</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                    onChange={handleFileChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    <aside className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full border border-emerald-400/40 bg-emerald-400/10 p-2 text-emerald-200">
                                <Info className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Launch checklist</p>
                                <p className="text-xs text-white/50">Review fees and prerequisites before confirming.</p>
                            </div>
                            </div>

                            <div className="grid gap-4 text-sm text-white/70">
                            <div>
                                <span className="text-xs uppercase tracking-wide text-white/40">Deployment Cost</span>
                                <p className="mt-1 text-base text-white">{deploymentCostCopy}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs uppercase tracking-wide text-white/40">Before You Launch</span>
                                <ul className="space-y-2 text-sm leading-relaxed text-white/70">
                                    {requirementNotes.map((note) => (
                                        <li key={note} className="flex gap-2">
                                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                                        <span>{note}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-200">Make sure your wallet is connected to {chainLabel} and has enough balance to cover the network fee.</div>

                        <button
                            type="submit"
                            disabled={buttonDisabled}
                            aria-busy={isLaunching}
                            className={`flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold tracking-wide transition ${
                                buttonDisabled
                                ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40"
                                : "border-emerald-400/40 bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                            }`}
                        >
                            {isLaunching && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                            <span>{buttonLabel}</span>
                        </button>
                    </aside>
                </form>
            </section>

            <CustomPopup
                isOpen={popupState.isOpen}
                onClose={closePopup}
                header={popupState.header}
                description={popupState.description}
                actionButton={popupState.actionButton}
                footer={popupState.footer}
            />
        </main>
    );
}
