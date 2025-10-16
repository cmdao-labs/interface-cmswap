"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useConnections, useAccount, useReadContracts } from "wagmi";
import { readContracts, writeContract, simulateContract, waitForTransactionReceipt, getBalance } from "@wagmi/core";
import { useDebouncedCallback } from "use-debounce";
import { formatEther, parseEther, erc20Abi, createPublicClient, http, decodeFunctionData} from "viem";
import { Copy, Check, Plus, Filter as FilterIcon, X, Sprout, Users, ArrowLeft } from "lucide-react";
import { bitkubTestnet } from "viem/chains";
import { config } from "@/config/reown";
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";
import { SocialsABI } from "@/app/pump/abi/Socials";
import Chart from "@/components/cmswap/pump/Chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const ethereum = typeof window !== "undefined" ? (window as any).ethereum : null;
import {FaFacebookF, FaTelegramPlane, FaGlobe} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Trade({ mode, chain, ticker, lp, token }: {
    mode: string;
    chain: string;
    ticker: string;
    lp: string;
    token: string;
}) {
    let _chain: any = null;
    let _chainId = 0;
    let _explorer = "";
    let _rpc = "";
    if (chain === "kubtestnet" || chain === "") {
        _chain = bitkubTestnet;
        _chainId = 25925;
        _explorer = "https://testnet.kubscan.com/";
        _rpc = "https://rpc-testnet.bitkubchain.io" as string;
    } // add chain here
    const publicClient = createPublicClient({chain: _chain, transport: http(_rpc)});
    let currencyAddr: string = "";
    let factoryAddr: string = "";
    let _blockcreated: number = 1;
    let socialAddr: string = "";
    if ((chain === "kubtestnet" || chain === "") && (mode === "pro" || mode === "") && (token === "")) {
        currencyAddr = "0x700D3ba307E1256e509eD3E45D6f9dff441d6907";
        factoryAddr = "0x46a4073c830031ea19d7b9825080c05f8454e530";
        _blockcreated = 23935659;
        socialAddr = "0x6F17157b4EcD3734A9EA8ED4bfE78694e3695b90";
    }
    const reachData = [
        { chain: "kubtestnet", proAmount: "47800", proSymbol: "tKUB", lite: "", liteSymbol: "" }
    ]; // add chain and mode here

    const factoryContract = { address: factoryAddr as "0xstring", abi: ERC20FactoryV2ABI, chainId: _chainId } as const;
    const socialContrct = { address: socialAddr as "0xstring", abi: SocialsABI, chainId: _chainId } as const;

    const [trademode, setTrademode] = useState(true);
    const connections = useConnections();
    const account = useAccount();
    const tickerContract = {address: ticker as "0xstring", abi: erc20Abi, chainId: _chainId} as const;
    const [inputBalance, setInputBalance] = useState("");
    const [outputBalance, setOutputBalance] = useState("0");
    const [hash, setHash] = useState("");
    const [headnoti, setHeadnoti] = useState(false);
    // Tracks if the head notification has played its initial shake
    const [headnotiShaken, setHeadnotiShaken] = useState(false);
    const [gradHash, setGradHash] = useState("");
    const [ethBal, setEthBal] = useState(BigInt(0));
    const [state, setState] = useState<any>([
        { result: BigInt(0) },
        { result: BigInt(0) },
        { result: false },
        { result: [BigInt(0)] },
    ]);
    const [showSocials, setShowSocials] = useState(false);
    const hasSetSocialsRef = React.useRef(false);
    const [grapthType, setGrapthType] = useState("CMswap");
    const [graphData, setGraphData] = useState<{ time: number; price: number; volume: number }[]>([]);
    const [socials, setSocials] = useState({fb: "", x: "", telegram: "", website: ""});
    const [errors, setErrors] = useState({fb: false, x: false, telegram: false, website: false});
    const [price, setPrice] = useState(0);
    const [mcap, setMcap] = useState(0);
    const [symbol, setSymbol] = useState(null);
    const [name, setName] = useState(null);
    const [creator, setCreator] = useState<string | null>(null);
    const [createTime, setCreateTime] = useState<number | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    // Reset shake state whenever the head notification is shown
    React.useEffect(() => {
        if (headnoti) setHeadnotiShaken(false);
    }, [headnoti]);

    const resolvedLogo = React.useMemo(() => {
        if (!logo) return "/default.ico";
        const logoString = String(logo);
        if (logoString.startsWith("ipfs://")) return `https://cmswap.mypinata.cloud/ipfs/${logoString.slice(7)}`;
        return `https://cmswap.mypinata.cloud/ipfs/${logoString}`;
    }, [logo]);

    const baseAssetSymbol = React.useMemo(() => {
        const entry = reachData.find((item) => item.chain === chain);
        if (!entry) return "";
        if (mode === "pro" && entry.proSymbol) return entry.proSymbol;
        if (mode === "lite" && entry.liteSymbol && (token === entry.liteSymbol || token === "")) return entry.liteSymbol;
        return "";
    }, [chain, mode, token]);

    const bondingTarget = React.useMemo(() => {
        const entry = reachData.find((item) => item.chain === chain);
        if (!entry) return "";
        if (mode === "pro" && entry.proAmount && entry.proSymbol) return `${entry.proAmount} ${entry.proSymbol}`;
        if (mode === "lite" && entry.lite && entry.liteSymbol && (token === entry.liteSymbol || token === "")) return `${entry.lite} ${entry.liteSymbol}`;
        return "";
    }, [chain, mode, token]);

    const formatRelativeTime = (timestamp: number | null) => {
        if (!timestamp) return "";
        const nowSeconds = Math.floor(Date.now() / 1000);
        const diff = Number(timestamp) - nowSeconds;
        const absDiff = Math.abs(diff);
        if (absDiff < 60) return rtf.format(Math.round(diff), "second");
        if (absDiff < 3600) return rtf.format(Math.round(diff / 60), "minute");
        if (absDiff < 86400) return rtf.format(Math.round(diff / 3600), "hour");
        if (absDiff < 604800) return rtf.format(Math.round(diff / 86400), "day");
        if (absDiff < 2629800) return rtf.format(Math.round(diff / 604800), "week");
        if (absDiff < 31557600) return rtf.format(Math.round(diff / 2629800), "month");
        return rtf.format(Math.round(diff / 31557600), "year");
    };

    const relativeCreatedTime = formatRelativeTime(createTime);

    const formattedMcap = React.useMemo(() => {
        return Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short", maximumFractionDigits: 2}).format(mcap || 0);
    }, [mcap]);

    // Derived price stats: 24h change (abs and %) and ATH
    const priceFormatter = React.useCallback((v: number) => {
        if (!Number.isFinite(v)) return "0";
        return Intl.NumberFormat("en-US", {
            minimumFractionDigits: v < 1 ? 2 : 0,
            maximumFractionDigits: v < 1 ? 6 : 2,
        }).format(v);
    }, []);

    const { price24hAgo, changeAbs, changePct, athPrice } = React.useMemo(() => {
        const now = Date.now();
        const cutoff = now - 24 * 60 * 60 * 1000; // 24h in ms
        let prevPrice: number | null = null;
        let ath = Number.isFinite(price) ? price : 0;
        if (Array.isArray(graphData) && graphData.length > 0) {
            // Ensure chronological order
            const sorted = [...graphData].sort((a, b) => a.time - b.time);
            // ATH across known history and current price
            for (const p of sorted) {
                if (Number.isFinite(p.price)) ath = Math.max(ath, Number(p.price));
            }
            // Pick the last price before or at cutoff; fallback to earliest
            const before = sorted.filter((p) => p.time <= cutoff);
            if (before.length > 0) prevPrice = Number(before[before.length - 1].price);
            else prevPrice = Number(sorted[0].price);
        }
        const baseline = Number.isFinite(prevPrice as number) ? (prevPrice as number) : price;
        const abs = Number.isFinite(price) && Number.isFinite(baseline) ? Number(price) - Number(baseline) : 0;
        const pct = Number.isFinite(baseline) && baseline !== 0 ? (abs / baseline) * 100 : 0;
        return {
            price24hAgo: baseline * 1_000_000_000,
            changeAbs: abs * 1_000_000_000,
            changePct: pct,
            athPrice: ath * 1_000_000_000,
        };
    }, [graphData, price]);

    const formattedChangeAbs = React.useMemo(() => priceFormatter(Math.abs(changeAbs || 0)), [changeAbs, priceFormatter]);
    const formattedChangePct = React.useMemo(() => `${Number.isFinite(changePct) ? Math.abs(changePct).toFixed(2) : "0.00"}%`, [changePct]);
    const formattedAth = React.useMemo(() => priceFormatter(athPrice || 0), [athPrice, priceFormatter]);

    const athProgressPercent = React.useMemo(() => {
        if (!Number.isFinite(mcap) || !Number.isFinite(athPrice) || athPrice <= 0) return 0;
        return Math.max(0, Math.min(100, (mcap / athPrice) * 100));
    }, [mcap, athPrice]);

    const progressPercent = React.useMemo(() => {
        if (!Number.isFinite(progress)) return 0;
        return Math.max(0, Math.min(100, progress));
    }, [progress]);

    const bondingTooltip = bondingTarget ? `When the market cap reaches ${bondingTarget}, 90% of the liquidity in the factory contract will be burned and the remaining 10% will fund the platform.` : "90% of liquidity burns at graduation, 10% funds the platform.";

    const isGraduated = Boolean(state?.[2]?.result);

    const isWalletReady = Boolean(connections) && account.address !== undefined && account.chainId === _chainId;

    const chainLabel = React.useMemo(() => {
        switch (chain) {
            case "kubtestnet":
                return "Bitkub Testnet";
            default:
                return chain ? chain.toUpperCase() : "Bitkub Testnet";
        }
    }, [chain]);

    const modeLabel = mode === "pro" ? "Pro Mode" : "Lite Mode";

    const presetButtons = React.useMemo(() => mode === "pro" && trademode ? 
        [
            { label: "0.1", type: "amount" as const, value: 0.1 },
            { label: "0.5", type: "amount" as const, value: 0.5 },
            { label: "1", type: "amount" as const, value: 1 },
        ] :
        [25, 50, 75].map((percent) => ({label: `${percent}%`, type: "percent" as const, value: percent}))
    , [mode, trademode]);

    const tokenSymbolDisplay = symbol ? String(symbol) : "";
    const inputAssetSymbol = trademode ? 
        baseAssetSymbol : 
        tokenSymbolDisplay.length >= 7 ? tokenSymbolDisplay.slice(0, 6) + "..." : tokenSymbolDisplay;
    const outputAssetSymbol = trademode ? 
        tokenSymbolDisplay.length >= 7 ? tokenSymbolDisplay.slice(0, 6) + "..." : tokenSymbolDisplay : 
        baseAssetSymbol;

    const formattedAvailableBalance = React.useMemo(() => Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short", maximumFractionDigits: 3}).format(
        mode === "pro" ? 
            trademode ? Number(formatEther(ethBal)) : Number(formatEther(state[1].result as bigint)) :
            trademode ? Number(formatEther(state[0].result as bigint)) : Number(formatEther(state[1].result as bigint))
    ), [mode, trademode, ethBal, state]);

    const formattedOutput = React.useMemo(() => Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short", maximumFractionDigits: 6}).format(Number(outputBalance || 0)), [outputBalance]);

    const truncatedTicker = React.useMemo(() => {
        if (!ticker) return "";
        if (ticker.length <= 12) return ticker;
        return `${ticker.slice(0, 6)}...${ticker.slice(-4)}`;
    }, [ticker]);

    const gradientButtonStyle = (active: boolean, variant: "buy" | "sell") => {
        if (!active) return undefined;
        const backgroundImage = variant === "buy"
            ? "radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)" // green theme
            : "linear-gradient(135deg, #F87171, #F43F5E)"; // red theme
        return { backgroundImage } as React.CSSProperties;
    };

    const handlePresetClick = (preset: {
        label: string;
        type: "amount" | "percent";
        value: number;
    }) => {
        if (preset.type === "amount") {
            const formatted = preset.value.toFixed(6);
            setInputBalance(formatted);
            qoute(formatted);
            return;
        }
        try {
            let balance: bigint = BigInt(0);
            if (mode === "pro") {
                balance = BigInt(state[1].result as bigint);
            } else {
                balance = BigInt(trademode ? (state[0].result as bigint) : (state[1].result as bigint));
            }
            const amount = (balance * BigInt(Math.round(preset.value))) / BigInt(100);
            const formatted = Number(formatEther(amount)).toFixed(6);
            setInputBalance(formatted);
            qoute(formatted);
        } catch (error) {
            console.error("Failed to apply preset", error);
        }
    };

    const handleReset = () => {
        setInputBalance("");
        setOutputBalance("0");
    };

    const handleMaxClick = () => {
        try {
            let value = '';
            if (mode === "pro") {
                if (trademode) {
                    value = String(Number(formatEther(ethBal)) - 0.00001);
                } else {
                    value = formatEther(state[1].result as bigint);
                }
            } else {
                value = formatEther(trademode ? (state[0].result as bigint) : (state[1].result as bigint));
            }
            if (!Number.isFinite(Number(value))) value = '0';
            if (Number(value) < 0) value = '0';
            setInputBalance(value);
            qoute(value);
        } catch (error) {
            console.error("Failed to apply max", error);
        }
    };

    const tradeButtonLabel = isWalletReady ? 
        trademode ? `Buy ${tokenSymbolDisplay || "token"}` : `Sell ${tokenSymbolDisplay || "token"}` :
        "Connect wallet";
    const graduationLink = gradHash ? `${_explorer}tx/${gradHash}` : "";

    const getExplorerAddressUrl = (address?: string | null) => {
        if (!address) return "";
        const suffixKub = ["kub", "kubtestnet"].includes(chain) ? "/?tab=tokens" : "";
        const suffixMonad = chain === "monad" ? "#tokens" : "";
        return `${_explorer}address/${address}${suffixKub}${suffixMonad}`;
    };

    const tradeTimeFormatter = React.useMemo(() => new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Asia/Bangkok",
    }), []);
    const compactNumberFormatter = React.useMemo(
        () => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }),
        []
    );

    const isValidUrl = (url: string) => {return (url === "" || url.startsWith("http://") || url.startsWith("https://"))};

    const handleChange = (field: keyof typeof socials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSocials((prev) => ({ ...prev, [field]: value }));
            setErrors((prev) => ({ ...prev, [field]: !isValidUrl(value) }));
        };

    const handleSave = async () => {
        const hasError = Object.values(errors).some((v) => v);
        if (hasError) return;
        const { fb, x, telegram, website } = socials;
        await writeContract(config, {
            ...socialContrct,
            functionName: "setSocialMedia",
            args: [
                ticker as "0xstring",
                socials.fb,
                socials.x,
                socials.telegram,
                socials.website,
            ],
        });
        setShowSocials(false);
    };

    type JSXElement = React.ReactElement;

    const socialItems: {
        icon: JSXElement;
        field: keyof typeof socials;
        label: string;
        placeholder: string;
    }[] = [
        {
            icon: <FaFacebookF className="text-white" />,
            field: "fb",
            label: "Facebook",
            placeholder: "Facebook URL",
        },
        {
            icon: <BsTwitterX className="text-white" />,
            field: "x",
            label: "X (Twitter)",
            placeholder: "X (Twitter) URL",
        },
        {
            icon: <FaTelegramPlane className="text-white" />,
            field: "telegram",
            label: "Telegram",
            placeholder: "Telegram URL",
        },
        {
            icon: <FaGlobe className="text-white" />,
            field: "website",
            label: "Website",
            placeholder: "Website URL",
        },
    ];

    const socialsResult = useReadContracts({
        contracts: [
            {
                address: socialAddr as "0xstring",
                abi: SocialsABI,
                functionName: "socials",
                chainId: _chainId,
                args: [ticker as "0xstring"],
            },
        ],
    });

    const [holder, setHolder] = useState([] as { addr: string; value: number }[]);
    const sortedHolders = React.useMemo(() => holder.slice().sort((a, b) => b.value - a.value), [holder]);
    // Pagination
    const ROWS_PER_PAGE = 10;
    const [activityPage, setActivityPage] = useState(1);
    const [holdersPage, setHoldersPage] = useState(1);
    const [tradersPage, setTradersPage] = useState(1);
    const [hx, setHx] = useState(
        [] as {
            action: string;
            nativeValue: number;
            value: number;
            from: any;
            hash: any;
            timestamp: number;
        }[]
    );
    // Filters for Activity list
    const [filters, setFilters] = useState({
        time: "all" as "all" | "5m" | "1h" | "24h" | "7d",
        from: "",
        actions: { buy: true, sell: true },
        nativeMin: "",
        nativeMax: "",
        tokenMin: "",
        tokenMax: "",
        hash: "",
    });
    const [appliedFilters, setAppliedFilters] = useState(filters);
    const debouncedApplyFilters = useDebouncedCallback((next: typeof filters) => {
        setAppliedFilters(next);
    }, 200);
    const handleTimeChange = (value: "all" | "5m" | "1h" | "24h" | "7d") => {
        setFilters((prev) => ({ ...prev, time: value }));
        setAppliedFilters((prev) => ({ ...prev, time: value }));
    };
    const handleActionToggle = (key: "buy" | "sell") => {
        setFilters((prev) => {
            const a = prev.actions;
            const other: "buy" | "sell" = key === "buy" ? "sell" : "buy";
            const allOn = a.buy && a.sell;
            const onlyThisOn = a[key] && !a[other];

            let nextActions: typeof prev.actions;
            if (allOn || !onlyThisOn) {
                // Select only the clicked action
                nextActions = { buy: false, sell: false } as typeof prev.actions;
                nextActions[key] = true;
            } else {
                // If clicked again on the only-active one, reset to All
                nextActions = { buy: true, sell: true } as typeof prev.actions;
            }

            const next = { ...prev, actions: nextActions };
            setAppliedFilters(next);
            return next;
        });
    };
    const handleTextChange = (field: "from" | "hash") => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prev) => {
            const next = { ...prev, [field]: value } as typeof filters;
            debouncedApplyFilters(next);
            return next;
        });
    };
    const handleNumberChange = (field: "nativeMin" | "nativeMax" | "tokenMin" | "tokenMax") => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prev) => {
            const next = { ...prev, [field]: value } as typeof filters;
            debouncedApplyFilters(next);
            return next;
        });
    };
    const clearFilters = () => {
        const base = {
            time: "all" as const,
            from: "",
            actions: { buy: true, sell: true },
            nativeMin: "",
            nativeMax: "",
            tokenMin: "",
            tokenMax: "",
            hash: "",
        };
        setFilters(base);
        setAppliedFilters(base);
    };
    const hasActiveFilters = React.useMemo(() => {
        return (
            filters.time !== "all" ||
            filters.from.trim() !== "" ||
            !filters.actions.buy ||
            !filters.actions.sell ||
            filters.nativeMin.trim() !== "" ||
            filters.nativeMax.trim() !== "" ||
            filters.tokenMin.trim() !== "" ||
            filters.tokenMax.trim() !== "" ||
            filters.hash.trim() !== ""
        );
    }, [filters]);
    const filteredHx = React.useMemo(() => {
        const f = appliedFilters;
        const now = Date.now();
        const minNative = f.nativeMin.trim() === "" ? undefined : Number.parseFloat(f.nativeMin);
        const maxNative = f.nativeMax.trim() === "" ? undefined : Number.parseFloat(f.nativeMax);
        const minToken = f.tokenMin.trim() === "" ? undefined : Number.parseFloat(f.tokenMin);
        const maxToken = f.tokenMax.trim() === "" ? undefined : Number.parseFloat(f.tokenMax);
        const fromQ = f.from.trim().toLowerCase();
        const hashQ = f.hash.trim().toLowerCase();
        // Merge immediate action/time from filters to ensure instant toggles
        const effective = {
            ...f,
            time: filters.time,
            actions: filters.actions,
        };
        const windowMs = effective.time === "5m" ? 5 * 60 * 1000 :
            effective.time === "1h" ? 60 * 60 * 1000 :
            effective.time === "24h" ? 24 * 60 * 60 * 1000 :
            effective.time === "7d" ? 7 * 24 * 60 * 60 * 1000 : 0;
        return hx.filter((res: any) => {
            // time
            if (windowMs > 0 && !(res.timestamp >= (now - windowMs))) return false;
            // action
            const action = String(res.action || "").trim().toLowerCase();
            const actionKey = action as keyof typeof effective.actions;
            if (actionKey in effective.actions) {
                if (!effective.actions[actionKey]) return false;
            }
            // from match
            if (fromQ && !String(res.from || "").toLowerCase().includes(fromQ)) return false;
            // hash match
            if (hashQ && !String(res.hash || "").toLowerCase().includes(hashQ)) return false;
            // native amount range (optional field)
            const nVal = typeof res.nativeValue === "number" ? res.nativeValue : undefined;
            if (minNative !== undefined && !Number.isNaN(minNative)) {
                if (nVal === undefined || nVal < minNative) return false;
            }
            if (maxNative !== undefined && !Number.isNaN(maxNative)) {
                if (nVal === undefined || nVal > maxNative) return false;
            }
            // token amount range
            const tVal = typeof res.value === "number" ? res.value : Number.NaN;
            if (minToken !== undefined && !Number.isNaN(minToken) && !(tVal >= minToken)) return false;
            if (maxToken !== undefined && !Number.isNaN(maxToken) && !(tVal <= maxToken)) return false;
            return true;
        });
    }, [hx, appliedFilters, filters.time, filters.actions]);
    const totalTraders = React.useMemo(() => {
        const unique = new Set<string>();
        hx.forEach((res: any) => {
            if (res && typeof res.from === "string" && res.from) {
                unique.add(res.from.toLowerCase());
            }
        });
        return unique.size;
    }, [hx]);
    const traderStats = React.useMemo(() => {
        const stats = new Map<
            string,
            {
                address: string;
                totalBought: number;
                totalSold: number;
                trades: number;
                lastActive: number;
            }
        >();
        filteredHx.forEach((res: any) => {
            const from = typeof res?.from === "string" ? res.from : "";
            if (!from) return;
            const key = from.toLowerCase();
            let entry = stats.get(key);
            if (!entry) {
                entry = {
                    address: from,
                    totalBought: 0,
                    totalSold: 0,
                    trades: 0,
                    lastActive: 0,
                };
                stats.set(key, entry);
            }
            const nativeValue = Number.isFinite(res?.nativeValue) ? Number(res.nativeValue) : 0;
            const action = String(res?.action || "").toLowerCase();
            if (action === "buy") entry.totalBought += nativeValue;
            if (action === "sell") entry.totalSold += nativeValue;
            entry.trades += 1;
            const timestamp = Number(res?.timestamp) || 0;
            if (timestamp > entry.lastActive) entry.lastActive = timestamp;
        });
        return Array.from(stats.values())
            .map((entry) => ({
                ...entry,
                profit: entry.totalSold - entry.totalBought,
            }))
            .sort((a, b) => {
                if (b.trades !== a.trades) return b.trades - a.trades;
                if (b.totalBought !== a.totalBought) return b.totalBought - a.totalBought;
                return b.lastActive - a.lastActive;
            });
    }, [filteredHx]);
    // Derived pagination slices
    const activityTotalPages = React.useMemo(() => Math.max(1, Math.ceil(filteredHx.length / ROWS_PER_PAGE)), [filteredHx.length]);
    const paginatedActivity = React.useMemo(() => {
        const start = (activityPage - 1) * ROWS_PER_PAGE;
        return filteredHx.slice(start, start + ROWS_PER_PAGE);
    }, [filteredHx, activityPage]);
    const holdersTotalPages = React.useMemo(() => Math.max(1, Math.ceil(sortedHolders.length / ROWS_PER_PAGE)), [sortedHolders.length]);
    const paginatedHolders = React.useMemo(() => {
        const start = (holdersPage - 1) * ROWS_PER_PAGE;
        return sortedHolders.slice(start, start + ROWS_PER_PAGE);
    }, [sortedHolders, holdersPage]);
    const tradersTotalPages = React.useMemo(() => Math.max(1, Math.ceil(traderStats.length / ROWS_PER_PAGE)), [traderStats.length]);
    const paginatedTraders = React.useMemo(() => {
        const start = (tradersPage - 1) * ROWS_PER_PAGE;
        return traderStats.slice(start, start + ROWS_PER_PAGE);
    }, [traderStats, tradersPage]);
    // Reset pages when data sets change
    React.useEffect(() => { setActivityPage(1); }, [appliedFilters, filters.time, filters.actions, hx.length]);
    React.useEffect(() => { setHoldersPage(1); }, [sortedHolders.length]);
    React.useEffect(() => { setTradersPage(1); }, [traderStats.length]);
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const copyToClipboard = async (address: string): Promise<void> => {
        await navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => { setCopiedAddress(null) }, 2000);
    };

    React.useEffect(() => {
        const fetchBody = async () => {
            const nativeBal = account.address !== undefined ? await getBalance(config, { address: account.address as "0xstring" }) : { value: BigInt(0) };
            setEthBal(nativeBal.value);
            const state0 = account.address !== undefined ? 
                await readContracts(config, {
                    contracts: [
                        { address: currencyAddr as "0xstring", abi: erc20Abi, functionName: "balanceOf", args: account.address !== undefined ? [account.address as "0xstring"] : ["0x0000000000000000000000000000000000000001"], chainId: _chainId },
                        { ...tickerContract, functionName: "balanceOf", args: account.address !== undefined ? [account.address as "0xstring"] : ["0x0000000000000000000000000000000000000001"] },
                    ],
                }) : 
                [ { result: BigInt(0) }, { result: BigInt(0) }, { result: false }, { result: [BigInt(0)] } ];
            setState(state0);
        };

        const fetchSummary = async () => {
            try {
                const res = await fetch(`/api/token/summary?token=${ticker}&graphHours=8766&holdersLimit=50&tradersLimit=50`, { cache: 'no-store' })
                if (!res.ok) return
                const data = await res.json()
                if (data?.token) {
                    setCreator(data.token.creator || null)
                    setCreateTime(data.token.created_time ? Number(data.token.created_time) : null)
                    setLogo(data.token.logo || null)
                    setDescription(data.token.description || null)
                    setName(data.token.name || null)
                    setSymbol(data.token.symbol || null)
                }
                if (data?.header) {
                    setPrice(Number(data.header.price || 0))
                    setMcap(Number(data.header.mcap || 0))
                    setProgress(Number(data.header.progress || 0))
                }
                if (Array.isArray(data?.graph)) setGraphData(data.graph)
                if (Array.isArray(data?.activity)) setHx(data.activity)

                // Fetch holders via dedicated API and normalize to percentage of total supply (1e9)
                try {
                    const hres = await fetch(`/api/token/holders?token=${ticker}&limit=500`, { cache: 'no-store' })
                    if (hres.ok) {
                        const hdata = await hres.json()
                        const raw = Array.isArray(hdata?.holders) ? hdata.holders : []
                        const holders = raw.map((h: any) => ({
                            addr: String(h.holder || h.addr || ''),
                            value: Number(h.balance || h.value || 0) / 1e25,
                        }))
                        setHolder(holders)
                    }
                } catch (e) {
                    console.error('fetch holders error', e)
                }
                // Traders are derived from activity locally; server 'traders' is optional
            } catch (e) {
                console.error('fetch summary error', e)
            }
        }

        fetchSummary();
        fetchBody();

        const summaryTimer = setInterval(fetchSummary, 5000);
        const bodyTimer = setInterval(fetchBody, 5000);

        return () => {
            clearInterval(summaryTimer);
            clearInterval(bodyTimer);
        };
    }, [ticker, chain, account.address]);

    const qoute = useDebouncedCallback(async (value: string) => {
        try {
            if (Number(value) !== 0) {
                if (chain === "kubtestnet") {
                    const result = await readContracts(config, {
                        contracts: [
                            { ...factoryContract, functionName: "pumpReserve", args: [ticker as "0xstring"], chainId: _chainId },
                            { ...factoryContract, functionName: "virtualAmount", chainId: _chainId },
                            { ...factoryContract, functionName: "pumpFee", chainId: _chainId },
                        ],
                    });
                    const getAmountOut = (_inputAmount: number, _inputReserve: bigint, _outputReserve: bigint): number => {
                        const inputAmountWithFee = _inputAmount * 99; // Apply 99/100 multiplier for fee
                        const numerator = BigInt(Math.floor(inputAmountWithFee)) * _outputReserve;
                        const denominator = _inputReserve * BigInt(100) + BigInt(Math.floor(inputAmountWithFee));
                        return Number(Number(numerator) / Number(denominator));
                    };
                    if (!result || !Array.isArray(result) || result.length < 3) {
                        console.error("Invalid contract result:", result);
                        setOutputBalance("");
                        return;
                    }
                    const pumpReserve = result[0].result && Array.isArray(result[0].result) && result[0].result.length === 2 ? [BigInt(result[0].result[0] || 0), BigInt(result[0].result[1] || 0)] : [BigInt(0), BigInt(10000)];
                    const virtualAmount = result[1].result ? BigInt(result[1].result) : BigInt(0);
                    const fee = result[2].result ? Number(formatEther(result[2].result)) : 0;
                    const inputAmount = Number(value);
                    const feeAmount = (inputAmount * fee) / 10000;
                    const amountInAfterFee = inputAmount - feeAmount;
                    const amountOut = trademode ? getAmountOut(amountInAfterFee, virtualAmount + pumpReserve[0], pumpReserve[1]) : getAmountOut(amountInAfterFee, pumpReserve[1], pumpReserve[0] + virtualAmount);
                    setOutputBalance(amountOut.toFixed(18));
                }
            } else {
                setOutputBalance("");
            }
        } catch (error) {
            console.error("Error in quote calculation:", error);
            setOutputBalance("");
        }
    }, 300);

    const trade = async () => {
        try {
            let result: any = "";
            if (chain === "kubtestnet") {
                if (trademode) {
                    result = await writeContract(config, {
                        ...factoryContract,
                        functionName: "buy",
                        args: [ticker as "0xstring", (parseEther(outputBalance) * BigInt(95)) / BigInt(100)],
                        value: parseEther(inputBalance),
                        chainId: _chainId,
                    });
                } else {
                    const allowance = await readContracts(config, {
                        contracts: [
                            {
                                address: ticker as "0xstring",
                                abi: erc20Abi,
                                functionName: "allowance",
                                args: [account.address as "0xstring", factoryContract.address as "0xstring"],
                                chainId: _chainId,
                            },
                        ],
                    });
                    if (Number(formatEther(allowance[0].result!)) < Number(inputBalance)) {
                        const { request } = await simulateContract(config, {
                            address: ticker as "0xstring",
                            abi: erc20Abi,
                            functionName: "approve",
                            args: [factoryContract.address as "0xstring", parseEther(String(Number(inputBalance) + 1))],
                            chainId: _chainId,
                        });
                        const h = await writeContract(config, request);
                        await waitForTransactionReceipt(config, { hash: h });
                    }
                    result = await writeContract(config, {
                        ...factoryContract,
                        functionName: "sell",
                        args: [ticker as "0xstring", parseEther(inputBalance), (parseEther(outputBalance) * BigInt(90)) / BigInt(100)],
                        chainId: _chainId,
                    });
                }
            } 
            setHeadnoti(true);
            setHash(result);
            setInputBalance("");
            setOutputBalance("0");
        } catch (error) {
            console.error("Error in trade execution:", error);
            setHeadnoti(false);
            setHash("");
        }
    };

    React.useEffect(() => {
        if (socialsResult.status === "success" && !hasSetSocialsRef.current) {
            const rawResult = socialsResult.data?.[0]?.result;
            if (Array.isArray(rawResult)) {
                const [fb, x, telegram, website] = rawResult as string[];
                setSocials({fb: fb || "", x: x || "", telegram: telegram || "", website: website || ""});
                hasSetSocialsRef.current = true;
            } else {
                console.warn("Unexpected result format", rawResult);
            }
        }
    }, [socialsResult]);

    return (
        <main className="relative min-h-screen w-full 2xl:w-5/6 overflow-hidden pt-14 sm:pt-20 text-white">
            <div className="w-full my-4 px-4 flex items-center gap-6 text-[8px] sm:text-sm">
                <Link href={`/pump/launchpad?chain=${chain}${mode === "pro" ? "&mode=pro" : "&mode=lite"}`} prefetch={false} className="underline hover:font-bold"><ArrowLeft className="h-8 w-8 p-1 rounded-full bg-white/5" aria-hidden="true" /></Link>
                <div className="flex gap-2 uppercase tracking-[0.2em] text-white/60">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{chainLabel}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{modeLabel}</span>
                </div>
            </div>

            {headnoti && (
                <div className="fixed top-22 left-0 right-0 z-50 px-2 sm:px-4">
                    <div
                        className={`mx-auto w-full 2xl:w-5/6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500 bg-emerald-900 px-4 py-3 text-sm shadow-[0_0_25px_rgba(16,185,129,0.25)] ` + (!headnotiShaken && "animate-shake-once")}
                        onAnimationEnd={(e) => {if (e.animationName === 'shake') setHeadnotiShaken(true)}}
                    >
                        <div className="flex items-center gap-2 text-emerald-200">
                            <Check size={16} />
                            <span>Transaction sent</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                            <Link href={`${_explorer}tx/${hash}`} prefetch={false} target="_blank" rel="noopener noreferrer" className="rounded-full border border-emerald-300/30 px-3 py-1 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100">View</Link>
                            <button onClick={() => setHeadnoti(false)} className="rounded-full border border-transparent bg-emerald-400/20 px-3 py-1 text-emerald-100 transition hover:bg-emerald-400/30">Close</button>
                        </div>
                    </div>
                </div>
            )}

            <section className="flex flex-col gap-2 relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="flex flex-row gap-4 sm:gap-10">
                    <div className="relative shrink-0 overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_35px_rgba(34,197,94,0.35)] sm:mx-0 h-28 w-28">
                        <Image src={resolvedLogo} alt="" width={112} height={112} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 sm:gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-lg font-semibold tracking-tight text-white">{name ?? "Loading token..."}</h1>
                            {tokenSymbolDisplay && (<span className="rounded-full border border-white/10 bg-white/10 px-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase text-white/70">{tokenSymbolDisplay}</span>)}
                        </div>
                        {creator && (
                            <div className="flex flex-wrap items-center gap-2 text-[8px] sm:text-xs">
                                <span className="text-white/40 uppercase tracking-wide">Creator</span>
                                <Link href={getExplorerAddressUrl(creator)} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-white transition hover:text-emerald-200">{`${String(creator).slice(0, 6)}...${String(creator).slice(-4)}`}</Link>
                            </div>
                        )}
                        <div className="flex flex-wrap flex-row gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/70">
                            <div className="flex flex-row items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2">
                                <Sprout className="h-4 w-4" aria-hidden="true" />
                                <p>{relativeCreatedTime && relativeCreatedTime}</p>
                            </div>
                            <div className="flex flex-row items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2">
                                <Users className="h-4 w-4" aria-hidden="true" />
                                <p>{holder.length}</p>
                            </div>
                            <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 sm:py-0 flex flow-col items-center gap-2">
                                <p>CA: {truncatedTicker}</p>
                                <button onClick={() => copyToClipboard(ticker)} className="rounded-full border border-white/10 bg-white/10 p-1 transition hover:border-white/40 hover:bg-white/20" title="Copy contract address">{copiedAddress === ticker ? <Check size={12} /> : <Copy size={12} />}</button>
                                <button
                                    className="rounded-full border border-white/10 bg-white/10 p-1 transition hover:border-white/40 hover:bg-white/20"
                                    onClick={async () => {
                                        if (!ethereum) return;
                                        await ethereum.request({method: "wallet_watchAsset", params: { type: "ERC20", options: {address: ticker, symbol: tokenSymbolDisplay, decimals: 18, image: resolvedLogo} }});
                                    }}
                                    title="Add token to wallet"
                                >
                                    <Plus size={12} />
                                </button>
                                <Link href={`${_explorer}address/${ticker}`} prefetch={false} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/10 p-1 transition hover:border-white/40 hover:bg-white/20" title="View on explorer"><Image src="https://cmswap.mypinata.cloud/ipfs/bafkreigg4272v2iffgcehwh7xmel6ioixrs6r3beavdeb2dflewitcimui" alt="block explorer" width={12} height={12} /></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-2 grid grid-cols-2 lg:grid-cols-[2fr_1fr]">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-300">Market Cap</span>
                        <span className="text-lg sm:text-2xl font-bold tracking-wider text-emerald-300">{formattedMcap} {baseAssetSymbol}</span>
                        <div className="flex flex-row flex-wrap gap-1 text-[10px] sm:text-xs text-white/70"> 
                            <span className="text-white/60">24h: </span>
                            {Number.isFinite(changeAbs) && Number.isFinite(changePct) ?
                                <>
                                    <span className={`${changeAbs > 0 ? "text-emerald-300" : changeAbs < 0 ? "text-red-300" : "text-white/70"}`}>{changeAbs > 0 ? "+" : changeAbs < 0 ? "-" : ""}{formattedChangeAbs} {baseAssetSymbol}</span>
                                    <span className={`ml-1 ${changePct > 0 ? "text-emerald-300" : changePct < 0 ? "text-red-300" : "text-white/70"}`}>({changePct > 0 ? "+" : changePct < 0 ? "-" : ""}{formattedChangePct})</span>
                                </> : 
                                <span className="text-white/50">N/A</span>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="mt-2 relative h-2 rounded-full">
                            <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600"><div className="h-full w-full rounded-full bg-black/60" /></div>
                            <div className="relative h-2 overflow-hidden rounded-full">
                                <div className="relative h-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-fire" style={{ width: `${athProgressPercent}%` }}>
                                    <div className="absolute inset-0 rounded-full opacity-50 blur-[6px] bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 animate-fire-glow" />
                                </div>
                                <div className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.25),transparent_40%)] bg-repeat-x bg-[length:14px_14px,18px_18px] animate-spark" style={{ width: `${athProgressPercent}%` }} />
                            </div>
                        </div>
                        <div className="w-full text-right font-bold tracking-wider text-orange-500">
                            <span className="text-white">ATH: </span>
                            {Number.isFinite(athPrice) ? <span>{formattedAth} {baseAssetSymbol}</span> : <span>N/A</span>}
                        </div>
                    </div> 
                </div>
            </section>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr] gap-4">
                <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur">
                        <div className="mt-4 h-[520px] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40"><Chart data={graphData} /></div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-white/60 block md:hidden">
                        <div className="flex items-center justify-between">
                            <span>Status</span>
                            <span className={`font-semibold ${isGraduated ? "text-emerald-300" : "text-white"}`}>{isGraduated ? "Graduated" : "Bonding curve"}</span>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-sm text-white/50">
                                <span>Bonding Progress</span>
                                <span className="text-emerald-300">{progressPercent.toFixed(2)}%</span>
                            </div>
                            <div className="mt-2 relative h-2 w-full overflow-hidden rounded-full">
                                <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600"><div className="h-full w-full rounded-full bg-black/60" /></div>
                                <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="relative h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 animate-bonding" style={{ width: `${progressPercent}%` }}>
                                        <div className="absolute inset-0 rounded-full opacity-50 blur-[6px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 animate-bonding-glow" />
                                    </div>
                                    <div className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.25),transparent_40%)] bg-repeat-x bg-[length:14px_14px,18px_18px] animate-spark" style={{ width: `${progressPercent}%` }} />
                                </div>
                            </div>
                            <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                                {bondingTooltip}
                                {isGraduated && graduationLink && (
                                    <>
                                        {" "}
                                        <Link href={graduationLink} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-emerald-200 underline-offset-2 transition hover:text-emerald-100 hover:underline">View graduation txn</Link>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60 block md:hidden">
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-2 text-md font-semibold shadow-2xl backdrop-blur grid grid-cols-2">
                            <button
                                className={`rounded-full px-4 py-2 transition ${trademode ? "text-black" : "text-white/50 hover:text-white"}`}
                                style={gradientButtonStyle(trademode, "buy")}
                                onClick={() => {
                                    setTrademode(true);
                                    setInputBalance("");
                                    setOutputBalance("0");
                                }}
                            >
                                Buy
                            </button>
                            <button
                                className={`rounded-full px-4 py-2 transition ${!trademode ? "text-black" : "text-white/50 hover:text-white"}`}
                                style={gradientButtonStyle(!trademode, "sell")}
                                onClick={() => {
                                    setTrademode(false);
                                    setInputBalance("");
                                    setOutputBalance("0");
                                }}
                            >
                                Sell
                            </button>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div>
                                <div className="flex items-center justify-between text-xs text-white/50">
                                    <span>You pay</span>
                                    <span>Balance: {formattedAvailableBalance} {inputAssetSymbol}</span>
                                </div>
                                <div className="w-full mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 overflow-hidden">
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        value={inputBalance}
                                        onChange={(event) => {
                                            setInputBalance(event.target.value);
                                            qoute(event.target.value);
                                        }}
                                        className="bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-white/30 truncate"
                                    />
                                    <span className="-ml-10 text-sm uppercase tracking-wide text-white/60">{inputAssetSymbol}</span>
                                </div>
                                <div className="mt-2 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2 text-xs text-white/50">
                                    <div className="flex items-center gap-2 text-white/40">
                                        <span>You get</span>
                                        <span className="font-semibold text-white">{formattedOutput} {outputAssetSymbol}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={handleReset} className="rounded-full border border-white/10 px-2 py-1 transition hover:border-white/30 hover:text-white">Reset</button>
                                        {presetButtons.map((preset) => (
                                            <button key={preset.label} onClick={() => handlePresetClick(preset)} className="rounded-full border border-white/10 px-2 py-1 transition hover:border-white/30 hover:text-white">{preset.label}</button>
                                        ))}
                                        <button onClick={handleMaxClick} className="rounded-full border border-emerald-400/40 px-3 py-2 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100">Max</button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={trade}
                                disabled={!isWalletReady}
                                className={`w-full rounded-lg px-4 py-3 text-md font-semibold transition ${isWalletReady ? "bg-gradient-to-r from-emerald-400 to-sky-500 text-black shadow-[0_20px_60px_rgba(16,185,129,0.35)] hover:brightness-110" : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"}`}
                                style={!trademode && isWalletReady ? gradientButtonStyle(!trademode, "sell") : undefined}
                            >
                                {tradeButtonLabel}
                            </button>
                            {!isWalletReady && (<p className="text-center text-xs text-white/40">Connect your wallet on {chainLabel} to trade.</p>)}
                        </div>
                    </div>

                    <div className="sm:hidden rounded-3xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur">
                        <Tabs defaultValue="info" className="w-full">
                            <TabsList className="!w-full grid grid-cols-4 rounded-md !p-0 mb-2 overflow-hidden bg-transparent">
                                <TabsTrigger value="info" className="text-sm cursor-pointer rounded-none w-full h-full border-b-2 border-transparent data-[state=active]:bg-black/50 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-300">Info</TabsTrigger>
                                <TabsTrigger value="activity" className="text-sm cursor-pointer rounded-none w-full h-full border-b-2 border-transparent data-[state=active]:bg-black/50 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-300">Activity</TabsTrigger>
                                <TabsTrigger value="traders" className="text-sm cursor-pointer rounded-none w-full h-full border-b-2 border-transparent data-[state=active]:bg-black/50 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-300">Traders</TabsTrigger>
                                <TabsTrigger value="holders" className="text-sm cursor-pointer rounded-none w-full h-full border-b-2 border-transparent data-[state=active]:bg-black/50 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-300">Holders</TabsTrigger>
                            </TabsList>

                            <TabsContent value="info">
                                <div className="mt-2">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h2 className="text-lg font-semibold text-white">Project Info</h2>
                                        {creator === account.address && <button onClick={() => setShowSocials(true)} className="text-xs text-emerald-300 underline-offset-2 transition hover:text-emerald-100 hover:underline">Edit socials</button>}
                                    </div>
                                    <p className="mt-4 text-sm leading-relaxed text-white/70">{description ? description : "No description has been shared yet."}</p>
                                    <div className="mt-4 flex gap-3">
                                        {socialItems.filter((item) => socials[item.field]).length === 0 ? (
                                            <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-white/50">No socials linked yet.</div>
                                        ) : (
                                            socialItems
                                                .filter((item) => socials[item.field])
                                                .map((item) => (
                                                    <Link key={item.field} href={socials[item.field]} prefetch={false} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white">{item.icon}</Link>
                                                ))
                                        )}
                                    </div>
                                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60">
                                        <div className="text-[10px] sm:text-sm text-white/80 break-all">{ticker}</div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <button onClick={() => copyToClipboard(ticker)} className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">{copiedAddress === ticker ? "Copied" : "Copy"}</button>
                                            <Link href={`${_explorer}address/${ticker}`} prefetch={false} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-3 py-1 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100">View on explorer</Link>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="traders">
                                <div className="ml-auto flex items-center gap-2 text-xs">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                className={`rounded-md px-2 py-1 transition border ${hasActiveFilters ? "border-emerald-400/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`}
                                                title="Filter"
                                                aria-label="Filter traders"
                                            >
                                                <FilterIcon size={14} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[320px] p-0 z-50">
                                            <div className="p-3 space-y-3 text-[11px] text-white/80">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white/60">Filters</span>
                                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={12} />Clear</button>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Time</label>
                                                    <select className="w-full rounded-md border border-white/10 bg-black/60 p-2 text-xs outline-none hover:border-white/20" value={filters.time} onChange={(e) => handleTimeChange(e.target.value as any)}>
                                                        <option value="all">All</option>
                                                        <option value="5m">5m</option>
                                                        <option value="1h">1h</option>
                                                        <option value="24h">24h</option>
                                                        <option value="7d">7d</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">From</label>
                                                    <input value={filters.from} onChange={handleTextChange("from")} placeholder="address" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Action</label>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleActionToggle("buy")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.buy && !filters.actions.sell ? "border-emerald-300/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Buy">Buy</button>
                                                        <button onClick={() => handleActionToggle("sell")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.sell && !filters.actions.buy ? "border-rose-300/50 text-rose-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Sell">Sell</button>
                                                        <button onClick={() => {const next = { ...filters, actions: { buy: true, sell: true } }; setFilters(next); setAppliedFilters(next);}} className="rounded-full border px-2 py-1 text-[11px] border-white/10 text-white/60 hover:border-white/20" title="Show all">All</button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Native amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.nativeMin} onChange={handleNumberChange("nativeMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.nativeMax} onChange={handleNumberChange("nativeMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Token amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.tokenMin} onChange={handleNumberChange("tokenMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.tokenMax} onChange={handleNumberChange("tokenMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Tx hash</label>
                                                    <input value={filters.hash} onChange={handleTextChange("hash")} placeholder="hash" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <div className="text-white/50">Showing {traderStats.length} of {totalTraders}</div>
                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={14} />Clear</button>
                                </div>
                                <div className="mt-4 overflow-x-auto rounded-xl py-2 border border-white/10">
                                    <table className="table-auto border-seperate border-spacing-0 text-center w-full">
                                        <thead className="text-xs text-white/80">
                                            <tr>
                                                <th className="px-3 py-2"><span className="text-white/50">Address</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Total Bought</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Total Sold</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Profit</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Trades</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Last Active</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedTraders.length === 0 ? 
                                                <tr><td colSpan={6} className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">No trader stats yet.</td></tr> : 
                                                (paginatedTraders.map((trader) => {
                                                    const profitClass = trader.profit > 0 ? 
                                                        "text-emerald-300" : 
                                                        trader.profit < 0 ? "text-rose-300" : "text-white";
                                                    const profitValue = Math.abs(trader.profit);
                                                    const formattedProfit = trader.profit === 0 ? "0" : compactNumberFormatter.format(profitValue);
                                                    const profitLabel = trader.profit > 0 ?
                                                        `+${formattedProfit}` :
                                                        trader.profit < 0 ? `-${formattedProfit}` : formattedProfit;
                                                    return (
                                                        <tr key={trader.address} className="text-xs text-white/80 hover:bg-white/10 border-t border-white/10">
                                                            <td className="py-6">
                                                                <Link href={getExplorerAddressUrl(trader.address)} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-white/70 underline-offset-2 transition hover:text-white hover:underline">
                                                                    {trader.address.slice(0, 6)}...{trader.address.slice(-4)}
                                                                </Link>
                                                            </td>
                                                            <td className="py-6 text-white">{compactNumberFormatter.format(Math.max(trader.totalBought, 0))} {baseAssetSymbol}</td>
                                                            <td className="py-6 text-white">{compactNumberFormatter.format(Math.max(trader.totalSold, 0))} {baseAssetSymbol}</td>
                                                            <td className={`py-6 font-semibold ${profitClass}`}>{profitLabel} {baseAssetSymbol}</td>
                                                            <td className="py-6 text-white">{trader.trades}</td>
                                                            <td className="py-6 text-white/70">{trader.lastActive ? formatRelativeTime(trader.lastActive / 1000) : "-"}</td>
                                                        </tr>
                                                    );
                                                }))}
                                        </tbody>
                                    </table>
                                </div>
                                {traderStats.length > 0 && (
                                    <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                                        <span>Page {tradersPage} of {tradersTotalPages}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setTradersPage((p) => Math.max(1, p - 1))} disabled={tradersPage <= 1} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                                            <button onClick={() => setTradersPage((p) => Math.min(tradersTotalPages, p + 1))} disabled={tradersPage >= tradersTotalPages} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="activity">
                                <div className="ml-auto flex items-center gap-2 text-xs">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className={`rounded-md px-2 py-1 transition border ${hasActiveFilters ? "border-emerald-400/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Filter" aria-label="Filter activity">
                                                <FilterIcon size={14} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[320px] p-0 z-50">
                                            <div className="p-3 space-y-3 text-[11px] text-white/80">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white/60">Filters</span>
                                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={12} />Clear</button>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Time</label>
                                                    <select className="w-full rounded-md border border-white/10 bg-black/60 p-2 text-xs outline-none hover:border-white/20" value={filters.time} onChange={(e) => handleTimeChange(e.target.value as any)}>
                                                        <option value="all">All</option>
                                                        <option value="5m">5m</option>
                                                        <option value="1h">1h</option>
                                                        <option value="24h">24h</option>
                                                        <option value="7d">7d</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">From</label>
                                                    <input value={filters.from} onChange={handleTextChange("from")} placeholder="address" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Action</label>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleActionToggle("buy")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.buy && !filters.actions.sell ? "border-emerald-300/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Buy">Buy</button>
                                                        <button onClick={() => handleActionToggle("sell")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.sell && !filters.actions.buy ? "border-rose-300/50 text-rose-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Sell">Sell</button>
                                                        <button onClick={() => {const next = { ...filters, actions: { buy: true, sell: true } }; setFilters(next); setAppliedFilters(next);}} className="rounded-full border px-2 py-1 text-[11px] border-white/10 text-white/60 hover:border-white/20" title="Show all">All</button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Native amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.nativeMin} onChange={handleNumberChange("nativeMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.nativeMax} onChange={handleNumberChange("nativeMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Token amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.tokenMin} onChange={handleNumberChange("tokenMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.tokenMax} onChange={handleNumberChange("tokenMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Tx hash</label>
                                                    <input value={filters.hash} onChange={handleTextChange("hash")} placeholder="hash" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <div className="text-white/50">Showing {filteredHx.length} of {hx.length}</div>
                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={14} />Clear</button>
                                </div>

                                <div className="mt-4 overflow-x-auto rounded-xl py-2 border border-white/10">
                                    <table className="table-auto border-seperate border-spacing-0 text-center w-full">
                                        <thead className="text-xs text-white/80">
                                            <tr>
                                                <th className="px-3 py-2"><div className="flex flex-col items-center gap-1"><span className="text-white/50">Time</span></div></th>
                                                <th className="px-3 py-2"><div className="flex flex-col items-center gap-1"><span className="text-white/50">From</span></div></th>
                                                <th className="px-3 py-2"><div className="flex flex-col items-center gap-1"><span className="text-white/50">Action</span></div></th>
                                                <th className="px-3 py-2"><div className="flex flex-col items-center gap-1"><span className="text-white/50">Native</span></div></th>
                                                <th className="px-3 py-2"><div className="flex flex-col items-center gap-1"><span className="text-white/50">Token</span></div></th>
                                                <th className="px-3 py-2"><div className="flex flex-col items-center gap-1"><span className="text-white/50">Tx</span></div></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHx.length === 0 ? 
                                                <tr><td colSpan={7} className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">No trades yet. Be the first to make a move.</td></tr> :
                                                paginatedActivity.map((res) => (
                                                    <tr key={res.hash} className="text-xs text-white/80 hover:bg-white/10 border-t border-white/10">
                                                        <td className="py-6">{formatRelativeTime(res.timestamp / 1000)}</td>
                                                        <td className="py-6">
                                                            <Link href={getExplorerAddressUrl(res.from)} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-white/70 underline-offset-2 transition hover:text-white hover:underline">{res.from.slice(0, 6)}...{res.from.slice(-4)}</Link>
                                                        </td>
                                                        <td className="sm:px-0 py-6">
                                                            <div className={`inline-block rounded-full bg-white/10 px-2 py-1 capitalize font-semibold uppercase ${res.action === "buy" ? "text-emerald-300" : res.action === "sell" ? "text-rose-300" : "text-cyan-300"}`}>{res.action}</div>
                                                        </td>
                                                        <td className="py-6 text-white">{Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"}).format(res.nativeValue)} {baseAssetSymbol}</td>
                                                        <td className="py-6 text-white">{Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"}).format(res.value)} {tokenSymbolDisplay}</td>
                                                        <td className="py-6">
                                                            <Link href={`${_explorer}tx/${res.hash}`} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-emerald-200 underline-offset-2 transition hover:text-emerald-100 hover:underline">{res.hash.slice(0, 6)}...{res.hash.slice(-4)}</Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {filteredHx.length > 0 && (
                                    <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                                        <span>Page {activityPage} of {activityTotalPages}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setActivityPage((p) => Math.max(1, p - 1))} disabled={activityPage <= 1} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                                            <button onClick={() => setActivityPage((p) => Math.min(activityTotalPages, p + 1))} disabled={activityPage >= activityTotalPages} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="holders">
                                <div className="mt-2 space-y-3 overflow-y-auto pr-1">
                                    {sortedHolders.length === 0 ? 
                                        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">Holder data is loading...</div> :
                                        paginatedHolders.map((res, index) => (
                                            <div key={`${res.addr}-${index}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/80">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white/40">#{(holdersPage - 1) * ROWS_PER_PAGE + index + 1}</span>
                                                    <Link href={getExplorerAddressUrl(res.addr)} prefetch={false} target="_blank" rel="noopener noreferrer" className={`text-xs transition hover:text-white ${res.addr.toUpperCase() === String(creator).toUpperCase() ? "text-emerald-300" : res.addr.toUpperCase() === factoryAddr.toUpperCase() ? "text-emerald-300" : "text-white/70"}`}>
                                                        {res.addr.toUpperCase() === factoryAddr.toUpperCase() ? 'Liquidity pool' :  res.addr.toUpperCase() === String(creator).toUpperCase() ?  'Creator' : `${res.addr.slice(0, 6)}...${res.addr.slice(-4)}`}
                                                    </Link>
                                                </div>
                                                <span className="text-sm font-semibold text-white">{res.value.toFixed(4)}%</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                {sortedHolders.length > 0 && (
                                    <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                                        <span>Page {holdersPage} of {holdersTotalPages}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setHoldersPage((p) => Math.max(1, p - 1))} disabled={holdersPage <= 1} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                                            <button onClick={() => setHoldersPage((p) => Math.min(holdersTotalPages, p + 1))} disabled={holdersPage >= holdersTotalPages} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="hidden sm:block rounded-3xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur">
                        <Tabs defaultValue="activity" className="w-full">
                            <TabsList className="!w-full grid grid-cols-2 !p-0 overflow-hidden bg-transparent">
                                <TabsTrigger value="activity" className="text-sm cursor-pointer rounded-none w-full h-full border-b-2 border-transparent data-[state=active]:bg-black/50 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-300">Activity</TabsTrigger>
                                <TabsTrigger value="traders" className="text-sm cursor-pointer rounded-none w-full h-full border-b-2 border-transparent data-[state=active]:bg-black/50 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-300">Traders</TabsTrigger>
                            </TabsList>

                            <TabsContent value="activity">
                                <div className="mt-4 flex flex-wrap items-center justify-end gap-2 text-xs">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className={`rounded-md px-2 py-1 transition border ${hasActiveFilters ? "border-emerald-400/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Filter" aria-label="Filter activity">
                                                <FilterIcon size={14} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[320px] p-0 z-50">
                                            <div className="p-3 space-y-3 text-[11px] text-white/80">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white/60">Filters</span>
                                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={12} />Clear</button>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Time</label>
                                                    <select className="w-full rounded-md border border-white/10 bg-black/60 p-2 text-xs outline-none hover:border-white/20" value={filters.time} onChange={(e) => handleTimeChange(e.target.value as any)}>
                                                        <option value="all">All</option>
                                                        <option value="5m">5m</option>
                                                        <option value="1h">1h</option>
                                                        <option value="24h">24h</option>
                                                        <option value="7d">7d</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">From</label>
                                                    <input value={filters.from} onChange={handleTextChange("from")} placeholder="address" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Action</label>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleActionToggle("buy")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.buy && !filters.actions.sell ? "border-emerald-300/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Buy">Buy</button>
                                                        <button onClick={() => handleActionToggle("sell")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.sell && !filters.actions.buy ? "border-rose-300/50 text-rose-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Sell">Sell</button>
                                                        <button onClick={() => {const next = { ...filters, actions: { buy: true, sell: true } }; setFilters(next); setAppliedFilters(next);}} className="rounded-full border px-2 py-1 text-[11px] border-white/10 text-white/60 hover:border-white/20" title="Show all">All</button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Native amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.nativeMin} onChange={handleNumberChange("nativeMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.nativeMax} onChange={handleNumberChange("nativeMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Token amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.tokenMin} onChange={handleNumberChange("tokenMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.tokenMax} onChange={handleNumberChange("tokenMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Tx hash</label>
                                                    <input value={filters.hash} onChange={handleTextChange("hash")} placeholder="hash" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <div className="text-white/50">Showing {filteredHx.length} of {hx.length}</div>
                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={14} />Clear</button>
                                </div>

                                <div className="mt-4 overflow-x-auto rounded-xl py-2 border border-white/10">
                                    <table className="table-auto border-seperate border-spacing-0 text-center w-full">
                                        <thead className="text-xs text-white/80">
                                            <tr>
                                                <th className="px-3 py-2">
                                                    <div className="flex flex-col items-center gap-1"><span className="text-white/50">Time</span></div>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <div className="flex flex-col items-center gap-1"><span className="text-white/50">From</span></div>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <div className="flex flex-col items-center gap-1"><span className="text-white/50">Action</span></div>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <div className="flex flex-col items-center gap-1"><span className="text-white/50">Native</span></div>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <div className="flex flex-col items-center gap-1"><span className="text-white/50">Token</span></div>
                                                </th>
                                                <th className="px-3 py-2">
                                                    <div className="flex flex-col items-center gap-1"><span className="text-white/50">Tx</span></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHx.length === 0 ? 
                                                <tr><td colSpan={7} className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">No trades yet. Be the first to make a move.</td></tr> :
                                                paginatedActivity.map((res) => (
                                                    <tr key={res.hash} className="text-xs text-white/80 hover:bg-white/10 border-t border-white/10">
                                                        <td className="py-6">{formatRelativeTime(res.timestamp / 1000)}</td>
                                                        <td className="py-6">
                                                            <Link href={getExplorerAddressUrl(res.from)} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-white/70 underline-offset-2 transition hover:text-white hover:underline">{res.from.slice(0, 6)}...{res.from.slice(-4)}</Link>
                                                        </td>
                                                        <td className="sm:px-0 py-6">
                                                            <div className={`inline-block rounded-full bg-white/10 px-2 py-1 capitalize font-semibold uppercase ${res.action === "buy" ? "text-emerald-300" : res.action === "sell" ? "text-rose-300" : "text-cyan-300"}`}>{res.action}</div>
                                                        </td>
                                                        <td className="py-6 text-white">{Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"}).format(res.nativeValue)} {baseAssetSymbol}</td>
                                                        <td className="py-6 text-white">{Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"}).format(res.value)} {tokenSymbolDisplay}</td>
                                                        <td className="py-6">
                                                            <Link href={`${_explorer}tx/${res.hash}`} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-emerald-200 underline-offset-2 transition hover:text-emerald-100 hover:underline">{res.hash.slice(0, 6)}...{res.hash.slice(-4)}</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {filteredHx.length > 0 && (
                                    <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                                        <span>Page {activityPage} of {activityTotalPages}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setActivityPage((p) => Math.max(1, p - 1))} disabled={activityPage <= 1} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                                            <button onClick={() => setActivityPage((p) => Math.min(activityTotalPages, p + 1))} disabled={activityPage >= activityTotalPages} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="traders">
                                <div className="mt-4 flex flex-wrap items-center justify-end gap-2 text-xs">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className={`rounded-md px-2 py-1 transition border ${hasActiveFilters ? "border-emerald-400/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Filter" aria-label="Filter traders">
                                                <FilterIcon size={14} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[320px] p-0 z-50">
                                            <div className="p-3 space-y-3 text-[11px] text-white/80">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white/60">Filters</span>
                                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={12} />Clear</button>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Time</label>
                                                    <select className="w-full rounded-md border border-white/10 bg-black/60 p-2 text-xs outline-none hover:border-white/20" value={filters.time} onChange={(e) => handleTimeChange(e.target.value as any)}>
                                                        <option value="all">All</option>
                                                        <option value="5m">5m</option>
                                                        <option value="1h">1h</option>
                                                        <option value="24h">24h</option>
                                                        <option value="7d">7d</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">From</label>
                                                    <input value={filters.from} onChange={handleTextChange("from")} placeholder="address" className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Action</label>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleActionToggle("buy")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.buy && !filters.actions.sell ? "border-emerald-300/50 text-emerald-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Buy">Buy</button>
                                                        <button onClick={() => handleActionToggle("sell")} className={`rounded-full border px-2 py-1 text-[11px] ${filters.actions.sell && !filters.actions.buy ? "border-rose-300/50 text-rose-200" : "border-white/10 text-white/80 hover:border-white/20"}`} title="Sell">Sell</button>
                                                        <button
                                                            onClick={() => {
                                                                const next = { ...filters, actions: { buy: true, sell: true } };
                                                                setFilters(next);
                                                                setAppliedFilters(next);
                                                            }}
                                                            className="rounded-full border px-2 py-1 text-[11px] border-white/10 text-white/60 hover:border-white/20"
                                                            title="Show all"
                                                        >
                                                            All
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Native amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.nativeMin} onChange={handleNumberChange("nativeMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.nativeMax} onChange={handleNumberChange("nativeMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Token amount</label>
                                                    <div className="flex items-center gap-2">
                                                        <input type="number" inputMode="decimal" value={filters.tokenMin} onChange={handleNumberChange("tokenMin")} placeholder="min" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                        <input type="number" inputMode="decimal" value={filters.tokenMax} onChange={handleNumberChange("tokenMax")} placeholder="max" className="w-full text-xs rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20" />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-white/60">Tx hash</label>
                                                    <input
                                                        value={filters.hash}
                                                        onChange={handleTextChange("hash")}
                                                        placeholder="hash"
                                                        className="w-full rounded-md border border-white/10 bg-black/60 px-2 py-2 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <div className="text-white/50">Showing {traderStats.length} of {totalTraders}</div>
                                    <button onClick={clearFilters} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20" title="Clear filters"><X size={14} />Clear</button>
                                </div>

                                <div className="mt-4 overflow-x-auto rounded-xl py-2 border border-white/10">
                                    <table className="table-auto border-seperate border-spacing-0 text-center w-full">
                                        <thead className="text-xs text-white/80">
                                            <tr>
                                                <th className="px-3 py-2"><span className="text-white/50">Address</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Total Bought</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Total Sold</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Profit</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Trades</span></th>
                                                <th className="px-3 py-2"><span className="text-white/50">Last Active</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedTraders.length === 0 ?
                                                <tr><td colSpan={6} className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">No trader stats yet.</td></tr> :
                                                paginatedTraders.map((trader) => {
                                                    const profitClass = trader.profit > 0 ? 
                                                        "text-emerald-300" : 
                                                        trader.profit < 0 ? "text-rose-300" : "text-white";
                                                    const profitValue = Math.abs(trader.profit);
                                                    const formattedProfit = trader.profit === 0 ? "0" : compactNumberFormatter.format(profitValue);
                                                    const profitLabel = trader.profit > 0 ? 
                                                        `+${formattedProfit}` : 
                                                        trader.profit < 0 ? `-${formattedProfit}` : formattedProfit;
                                                    return (
                                                        <tr key={trader.address} className="text-xs text-white/80 hover:bg-white/10 border-t border-white/10">
                                                            <td className="py-6">
                                                                <Link href={getExplorerAddressUrl(trader.address)} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-white/70 underline-offset-2 transition hover:text-white hover:underline">{trader.address.slice(0, 6)}...{trader.address.slice(-4)}</Link>
                                                            </td>
                                                            <td className="py-6 text-white">{compactNumberFormatter.format(Math.max(trader.totalBought, 0))} {baseAssetSymbol}</td>
                                                            <td className="py-6 text-white">{compactNumberFormatter.format(Math.max(trader.totalSold, 0))} {baseAssetSymbol}</td>
                                                            <td className={`py-6 font-semibold ${profitClass}`}>{profitLabel} {baseAssetSymbol}</td>
                                                            <td className="py-6 text-white">{trader.trades}</td>
                                                            <td className="py-6 text-white/70">{trader.lastActive ? formatRelativeTime(trader.lastActive / 1000) : "-"}</td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {traderStats.length > 0 && (
                                    <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                                        <span>Page {tradersPage} of {tradersTotalPages}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setTradersPage((p) => Math.max(1, p - 1))} disabled={tradersPage <= 1} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                                            <button onClick={() => setTradersPage((p) => Math.min(tradersTotalPages, p + 1))} disabled={tradersPage >= tradersTotalPages} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60 hidden md:block">
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-2 text-md font-semibold shadow-2xl backdrop-blur grid grid-cols-2">
                            <button
                                className={`rounded-full px-4 py-2 transition ${trademode ? "text-black" : "text-white/50 hover:text-white"}`}
                                style={gradientButtonStyle(trademode, "buy")}
                                onClick={() => {
                                    setTrademode(true);
                                    setInputBalance("");
                                    setOutputBalance("0");
                                }}
                            >
                                Buy
                            </button>
                            <button
                                className={`rounded-full px-4 py-2 transition ${!trademode ? "text-black" : "text-white/50 hover:text-white"}`}
                                style={gradientButtonStyle(!trademode, "sell")}
                                onClick={() => {
                                    setTrademode(false);
                                    setInputBalance("");
                                    setOutputBalance("0");
                                }}
                            >
                                Sell
                            </button>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div>
                                <div className="flex items-center justify-between text-xs text-white/50">
                                    <span>You pay</span>
                                    <span>Balance: {formattedAvailableBalance} {inputAssetSymbol}</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                    <input
                                        type="number"
                                        placeholder="0.0"
                                        value={inputBalance}
                                        onChange={(event) => {
                                            setInputBalance(event.target.value);
                                            qoute(event.target.value);
                                        }}
                                        className="flex-1 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-white/30"
                                    />
                                    <span className="-ml-10 text-sm uppercase tracking-wide text-white/60">{inputAssetSymbol}</span>
                                </div>
                                <div className="mt-2 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2 text-xs text-white/50">
                                    <div className="flex items-center gap-2 text-white/40">
                                        <span>You get</span>
                                        <span className="font-semibold text-white">{formattedOutput} {outputAssetSymbol}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={handleReset} className="rounded-full border border-white/10 px-2 py-1 transition hover:border-white/30 hover:text-white">Reset</button>
                                        {presetButtons.map((preset) => (
                                            <button key={preset.label} onClick={() => handlePresetClick(preset)} className="rounded-full border border-white/10 px-2 py-1 transition hover:border-white/30 hover:text-white">{preset.label}</button>
                                        ))}
                                        <button onClick={handleMaxClick} className="rounded-full border border-emerald-400/40 px-3 py-2 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100">Max</button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={trade}
                                disabled={!isWalletReady}
                                className={`w-full rounded-lg px-4 py-3 text-md font-semibold transition ${isWalletReady ? "bg-gradient-to-r from-emerald-400 to-sky-500 text-black shadow-[0_20px_60px_rgba(16,185,129,0.35)] hover:brightness-110" : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"}`}
                                style={!trademode && isWalletReady ? gradientButtonStyle(!trademode, "sell") : undefined}
                            >
                                {tradeButtonLabel}
                            </button>
                            {!isWalletReady && (<p className="text-center text-xs text-white/40">Connect your wallet on {chainLabel} to trade.</p>)}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-white/60 hidden md:block">
                        <div className="flex items-center justify-between">
                            <span>Status</span>
                            <span className={`font-semibold ${isGraduated ? "text-emerald-300" : "text-white"}`}>{isGraduated ? "Graduated" : "Bonding curve"}</span>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-sm text-white/50">
                                <span>Bonding Progress</span>
                                <span className="text-emerald-300">{progressPercent.toFixed(2)}%</span>
                            </div>
                            <div className="mt-2 relative h-2 w-full overflow-hidden rounded-full">
                                <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600"><div className="h-full w-full rounded-full bg-black/60" /></div>
                                <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="relative h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 animate-bonding" style={{ width: `${progressPercent}%` }}>
                                        <div className="absolute inset-0 rounded-full opacity-50 blur-[6px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 animate-bonding-glow" />
                                    </div>
                                    <div className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.25),transparent_40%)] bg-repeat-x bg-[length:14px_14px,18px_18px] animate-spark" style={{ width: `${progressPercent}%` }} />
                                </div>
                            </div>
                            <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                                {bondingTooltip}
                                {isGraduated && graduationLink && (
                                    <>
                                        {" "}
                                        <Link href={graduationLink} prefetch={false} target="_blank" rel="noopener noreferrer" className="text-emerald-200 underline-offset-2 transition hover:text-emerald-100 hover:underline">View graduation txn</Link>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:block rounded-3xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-white">Project Info</h2>
                            {creator === account.address && <button onClick={() => setShowSocials(true)} className="text-xs text-emerald-300 underline-offset-2 transition hover:text-emerald-100 hover:underline">Edit socials</button>}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-white/70">{description ? description : "No description has been shared yet."}</p>
                        <div className="mt-6 flex gap-3">
                            {socialItems.filter((item) => socials[item.field]).length === 0 ? 
                                <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-white/50">No socials linked yet.</div> :
                                socialItems
                                    .filter((item) => socials[item.field])
                                    .map((item) => (
                                        <Link key={item.field} href={socials[item.field]} prefetch={false} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 p-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white">{item.icon}</Link>
                                    ))
                            }
                        </div>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60">
                            <div className="text-[10px] sm:text-sm text-white/80 break-all">{ticker}</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button onClick={() => copyToClipboard(ticker)} className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white">{copiedAddress === ticker ? "Copied" : "Copy"}</button>
                                <Link href={`${_explorer}address/${ticker}`} prefetch={false} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 px-3 py-1 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100">View on explorer</Link>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:block rounded-3xl border border-white/10 bg-black/30 p-4 shadow-xl backdrop-blur">
                        <h2 className="text-lg font-semibold text-white">Holder</h2>
                        <div className="mt-4 space-y-3 overflow-y-auto pr-1">
                            {sortedHolders.length === 0 ?
                                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">Holder data is loading...</div> :
                                paginatedHolders.map((res, index) => (
                                    <div key={`${res.addr}-${index}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/80">
                                        <div className="flex items-center gap-3">
                                            <span className="text-white/40">#{(holdersPage - 1) * ROWS_PER_PAGE + index + 1}</span>
                                            <Link
                                                href={getExplorerAddressUrl(res.addr)}
                                                prefetch={false}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-xs transition hover:text-white ${res.addr.toUpperCase() === String(creator).toUpperCase() ? "text-emerald-300" : res.addr.toUpperCase() === factoryAddr.toUpperCase() ? "text-emerald-300" : "text-white/70"}`}
                                            >
                                                {res.addr.toUpperCase() === factoryAddr.toUpperCase() ? 
                                                    'Liquidity pool' : 
                                                    res.addr.toUpperCase() === String(creator).toUpperCase() ? 'Creator' : `${res.addr.slice(0, 6)}...${res.addr.slice(-4)}`
                                                }
                                            </Link>
                                        </div>
                                        <span className="text-sm font-semibold text-white">{res.value.toFixed(4)}%</span>
                                    </div>
                                ))
                            }
                        </div>
                        {sortedHolders.length > 0 && (
                            <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                                <span>Page {holdersPage} of {holdersTotalPages}</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setHoldersPage((p) => Math.max(1, p - 1))} disabled={holdersPage <= 1} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Previous</button>
                                    <button onClick={() => setHoldersPage((p) => Math.min(holdersTotalPages, p + 1))} disabled={holdersPage >= holdersTotalPages} className="rounded-md border border-white/10 bg-white/10 px-2 py-1 transition hover:border-white/20 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>

            {showSocials && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
                    <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#050910] p-6 shadow-[0_0_80px_rgba(16,185,129,0.35)]">
                        <button onClick={() => setShowSocials(false)} className="absolute right-4 top-4 text-white/60 transition hover:text-white">✕</button>
                        <h2 className="text-center text-xl font-semibold text-white">Link your social profiles</h2>
                        <p className="mt-1 text-center text-xs text-white/50">Add official channels so traders can follow updates in real time.</p>
                        <div className="mt-6 space-y-4">
                            {socialItems.map((item) => (
                                <div key={item.field} className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-white/70">
                                        <span className="rounded-full bg-emerald-400/10 p-2 text-emerald-300">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                    <input type="text" placeholder={item.placeholder} value={socials[item.field]} onChange={handleChange(item.field)} maxLength={200} className={`w-full rounded-2xl border px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${errors[item.field] ? "border-rose-400 focus:ring-rose-400" : "border-white/10 bg-white/5 focus:ring-emerald-400"}`} />
                                    <div className="flex items-center justify-between text-[11px] text-white/40">
                                        {errors[item.field] ? <span>Must start with http:// or https://</span> : <span>Optional</span>}
                                        <span>{socials[item.field].length}/200</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-[11px] text-white/40">🚫 Links must be safe and official. The team may remove inaccurate information.</p>
                        <button onClick={handleSave} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" disabled={Object.values(errors).some(Boolean)}>Save socials</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes fireShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                @keyframes fireGlow { 0%, 100% { opacity: 0.35; filter: blur(6px); } 50% { opacity: 0.75; filter: blur(12px); } }
                @keyframes bondingShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                @keyframes bondingGlow { 0%, 100% { opacity: 0.35; filter: blur(6px); } 50% { opacity: 0.75; filter: blur(12px); } }
                @keyframes spark { 0% { background-position: 0 0, 0 0; opacity: 0.25; } 50% { background-position: 14px 0, 18px 0; opacity: 0.6; } 100% { background-position: 0 0, 0 0; opacity: 0.25; } }
                .animate-fire { background-size: 200% 200%; animation: fireShift 2.2s ease-in-out infinite; }
                .animate-fire-glow { background-size: 200% 200%; animation: fireGlow 1.6s ease-in-out infinite, fireShift 2.8s linear infinite; }
                .animate-bonding { background-size: 200% 200%; animation: bondingShift 2.2s ease-in-out infinite; }
                .animate-bonding-glow { background-size: 200% 200%; animation: bondingGlow 1.6s ease-in-out infinite, bondingShift 2.8s linear infinite; }
                .animate-spark { animation: spark 0.9s linear infinite; }
            `}</style>
        </main>
    );
}
