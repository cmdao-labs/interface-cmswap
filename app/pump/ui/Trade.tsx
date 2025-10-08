"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useConnections, useAccount, useReadContracts } from "wagmi";
import { readContracts, writeContract, simulateContract, waitForTransactionReceipt, getBalance } from "@wagmi/core";
import { useDebouncedCallback } from "use-debounce";
import { formatEther, parseEther, erc20Abi, createPublicClient, http, decodeFunctionData} from "viem";
import { Copy, Check, Plus, Filter as FilterIcon, X } from "lucide-react";
import { bitkub, monadTestnet, bitkubTestnet } from "viem/chains";
import { config } from "@/app/config";
import { ERC20FactoryABI } from "@/app/pump/abi/ERC20Factory";
import { ERC20FactoryV2ABI } from "@/app/pump/abi/ERC20FactoryV2";
import { UniswapV2FactoryABI } from "@/app/pump/abi/UniswapV2Factory";
import { UniswapV2PairABI } from "@/app/pump/abi/UniswapV2Pair";
import { UniswapV2RouterABI } from "@/app/pump/abi/UniswapV2Router";
import { UniswapV3QouterABI } from "@/app/pump/abi/UniswapV3Qouter";
import { SocialsABI } from "@/app/pump/abi/Socials";
import Chart from "@/app/components/Chart";

const themes: any = {
    96: {
        primary: "from-green-400 to-emerald-400",
        secondary: "from-green-600 to-emerald-600",
        accent: "green-400",
        glow: "",
        border: "border-green-400/30",
        text: "text-green-300",
        btn: "radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)",
        tradebtn: "bg-emerald-300",
    },
    25925: {
        primary: "from-green-400 to-emerald-400",
        secondary: "from-green-600 to-emerald-600",
        accent: "green-400",
        glow: "",
        border: "border-green-400/30",
        text: "text-green-300",
        btn: "radial-gradient(circle farthest-corner at 10% 20%, rgba(0,255,147,1) 0.2%, rgba(22,255,220,1) 100.3%)",
        tradebtn: "bg-emerald-300",
    },
    8899: {
        primary: "from-blue-400 to-cyan-400",
        secondary: "from-blue-600 to-cyan-600",
        accent: "blue-400",
        glow: "",
        border: "border-blue-400/30",
        text: "text-blue-300",
        btn: "linear-gradient(135deg, #3B82F6, #06B6D4)",
        tradebtn: "bg-emerald-300",
    },
    56: {
        primary: "from-yellow-400 to-amber-400",
        secondary: "from-yellow-600 to-amber-600",
        accent: "yellow-400",
        glow: "",
        border: "border-yellow-400/30",
        text: "text-yellow-300",
        btn: "linear-gradient(135deg, #FBBF24, #F59E0B)",
        tradebtn: "bg-emerald-300",
    },
    3501: {
        primary: "from-red-400 to-rose-400",
        secondary: "from-red-600 to-rose-600",
        accent: "red-400",
        glow: "",
        border: "border-red-400/30",
        text: "text-red-300",
        btn: "linear-gradient(135deg, #F87171, #F43F5E)",
        tradebtn: "bg-emerald-300",
    },
    10143: {
        primary: "from-purple-400 to-violet-400",
        secondary: "from-purple-600 to-violet-600",
        accent: "purple-400",
        glow: "",
        border: "border-purple-400/30",
        text: "text-purple-300",
        btn: "linear-gradient(135deg, #D6BEF7, #A683EF)",
        tradebtn: "bg-purple-300",
    },
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const { ethereum } = window as any;
import {FaFacebookF, FaTelegramPlane, FaGlobe} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CMswapChartABI } from "@/app/lib/abi";

export default function Trade({
    mode,
    chain,
    ticker,
    lp,
    token,
}: {
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
    if (chain === "kub" || chain === "") {
        _chain = bitkub;
        _chainId = 96;
        _explorer = "https://www.kubscan.com/";
    } else if (chain === "monad") {
        _chain = monadTestnet;
        _chainId = 10143;
        _explorer = "https://monad-testnet.socialscan.io/";
        _rpc = process.env.NEXT_PUBLIC_MONAD_RPC as string;
    } else if (chain === "kubtestnet") {
        _chain = bitkubTestnet;
        _chainId = 25925;
        _explorer = "https://testnet.kubscan.com/";
        _rpc = "https://rpc-testnet.bitkubchain.io" as string;
    } // add chain here
    const publicClient = createPublicClient({chain: _chain, transport: http(_rpc)});
    const [theme, setTheme] = React.useState(themes[Number(_chainId)] || themes[96]);
    let currencyAddr: string = "";
    let bkgafactoryAddr: string = "";
    let _blockcreated: number = 1;
    let v2facAddr: string = "";
    let v2routerAddr: string = "";
    let v3qouterAddr: string = "";
    let socialAddr: string = "";
    let graduatedAddr: string = "";
    if (
        (chain === "kub" || chain === "") &&
        (mode === "lite" || mode === "") &&
        (token === "cmm" || token === "")
    ) {
        currencyAddr = "0x9b005000a10ac871947d99001345b01c1cef2790";
        bkgafactoryAddr = "0x10d7c3bDc6652bc3Dd66A33b9DD8701944248c62";
        _blockcreated = 25229488;
        v2facAddr = "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c";
        v2routerAddr = "0x3F7582E36843FF79F173c7DC19f517832496f2D8";
        v3qouterAddr = "0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f";
        socialAddr = "0xf8dec288D2438771f65ed59509ab474edaf067Da";
        graduatedAddr = "0x7479A1e11e9940CAb6ee6c44aa1a72F3F02EEd8b";
    } else if ((chain === "kub" || chain === "") && mode === "pro") {
        currencyAddr = "0x67ebd850304c70d983b2d1b93ea79c7cd6c3f6b5";
        bkgafactoryAddr = "0x7bdceEAf4F62ec61e2c53564C2DbD83DB2015a56";
        _blockcreated = 25232899;
        v2facAddr = "0x090c6e5ff29251b1ef9ec31605bdd13351ea316c";
        v2routerAddr = "0x3F7582E36843FF79F173c7DC19f517832496f2D8";
        v3qouterAddr = "0xCB0c6E78519f6B4c1b9623e602E831dEf0f5ff7f";
        socialAddr = "0xf8dec288D2438771f65ed59509ab474edaf067Da";
        graduatedAddr = "0xd1D024be49c90f7bA83fb97c1857D45B98Ad294b";
    } else if (chain === "monad" && mode === "pro") {
        currencyAddr = "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701";
        bkgafactoryAddr = "0x6dfc8eecca228c45cc55214edc759d39e5b39c93";
        _blockcreated = 16912084;
        v2facAddr = "0x399FE73Bb0Ee60670430FD92fE25A0Fdd308E142";
        v2routerAddr = "0x5a16536bb85a2fa821ec774008d6068eced79c96";
        v3qouterAddr = "0x555756bd5b347853af6f713a2af6231414bedefc";
        socialAddr = "0x01837156518e60362048e78d025a419C51346f55";
        graduatedAddr = "0x6dfc8eecca228c45cc55214edc759d39e5b39c93";
    } else if (chain === "kubtestnet" && mode === "pro") {
        currencyAddr = "0x700D3ba307E1256e509eD3E45D6f9dff441d6907";
        bkgafactoryAddr = "0x46a4073c830031ea19d7b9825080c05f8454e530";
        _blockcreated = 23935659;
        v2facAddr = "0xCBd41F872FD46964bD4Be4d72a8bEBA9D656565b";
        v2routerAddr = "0x3C5514335dc4E2B0D9e1cc98ddE219c50173c5Be";
        v3qouterAddr = "0x3F64C4Dfd224a102A4d705193a7c40899Cf21fFe";
        socialAddr = "0x6F17157b4EcD3734A9EA8ED4bfE78694e3695b90";
        lp = "0x46a4073C830031eA19D7b9825080c05F8454E530"
    }
    const reachData = [
        {
            chain: "kub",
            proAmount: "2000",
            proSymbol: "KUB",
            lite: "100000",
            liteSymbol: "CMM",
        },
        {
            chain: "kubtestnet",
            proAmount: "47800",
            proSymbol: "tKUB",
            lite: "",
            liteSymbol: "",
        },
        {
            chain: "monad",
            proAmount: "1",
            proSymbol: "MON",
            lite: "",
            liteSymbol: "",
        },
    ];
    // add chain and mode here

    const dataofcurr = { addr: currencyAddr, blockcreated: _blockcreated };
    const dataofuniv2factory = { addr: v2facAddr };
    const dataofuniv2router = { addr: v2routerAddr };
    const dataofuniv3qouter = { addr: v3qouterAddr };
    const bkgafactoryContract = { address: bkgafactoryAddr as "0xstring", abi: chain === "kubtestnet" ? ERC20FactoryV2ABI : ERC20FactoryABI, chainId: _chainId } as const;
    const graduatedContract = { address: graduatedAddr as "0xstring", abi: ERC20FactoryABI, chainId: _chainId };
    const univ2factoryContract = { address: dataofuniv2factory.addr as "0xstring", abi: UniswapV2FactoryABI, chainId: _chainId } as const;
    const univ2RouterContract = { address: dataofuniv2router.addr as "0xstring", abi: UniswapV2RouterABI, chainId: _chainId } as const;
    const univ3QouterContract = { address: dataofuniv3qouter.addr as "0xstring", abi: UniswapV3QouterABI, chainId: _chainId } as const;
    const socialContrct = { address: socialAddr as "0xstring", abi: SocialsABI, chainId: _chainId } as const;

    const [trademode, setTrademode] = useState(true);
    const connections = useConnections();
    const account = useAccount();
    const tickerContract = {address: ticker as "0xstring", abi: erc20Abi, chainId: _chainId} as const;
    const [inputBalance, setInputBalance] = useState("");
    const [outputBalance, setOutputBalance] = useState("0");
    const [hash, setHash] = useState("");
    const [headnoti, setHeadnoti] = useState(false);
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

    const resolvedLogo = React.useMemo(() => {
        if (!logo) return "https://cmswap.mypinata.cloud/ipfs/";
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
    const createdAtAbsolute = React.useMemo(() => {
        if (!createTime) return "";
        return new Date(Number(createTime) * 1000).toLocaleString();
    }, [createTime]);

    const formattedPrice = React.useMemo(() => {
        if (!price) return "0.00";
        return Intl.NumberFormat("en-US", {
            minimumFractionDigits: price < 1 ? 2 : 0,
            maximumFractionDigits: price < 1 ? 6 : 2,
        }).format(price);
    }, [price]);

    const formattedMcap = React.useMemo(() => {
        return Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short", maximumFractionDigits: 2}).format(mcap || 0);
    }, [mcap]);

    const progressPercent = React.useMemo(() => {
        if (!Number.isFinite(progress)) return 0;
        return Math.max(0, Math.min(100, progress));
    }, [progress]);

    const bondingTooltip = bondingTarget ? `When the market cap reaches ${bondingTarget}, 90% of the liquidity in the factory contract will be burned and the remaining 10% will fund the platform.` : "90% of liquidity burns at graduation, 10% funds the platform.";

    const isGraduated = Boolean(state?.[2]?.result);

    const isWalletReady = Boolean(connections) && account.address !== undefined && account.chainId === _chainId;

    const chainLabel = React.useMemo(() => {
        switch (chain) {
        case "kub":
            return "Bitkub Chain";
        case "kubtestnet":
            return "Bitkub Testnet";
        case "monad":
            return "Monad Testnet";
        default:
            return chain ? chain.toUpperCase() : "Bitkub Chain";
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
    const inputAssetSymbol = trademode ? baseAssetSymbol : tokenSymbolDisplay;
    const outputAssetSymbol = trademode ? tokenSymbolDisplay : baseAssetSymbol;

    const formattedAvailableBalance = React.useMemo(() => Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short", maximumFractionDigits: 3}).format(
        mode === "pro" ? 
            trademode ? Number(formatEther(ethBal)) : Number(formatEther(state[1].result as bigint)) :
            trademode ? Number(formatEther(state[0].result as bigint)) : Number(formatEther(state[1].result as bigint))
    ), [mode, trademode, ethBal, state]);

    const formattedCounterBalance = React.useMemo(() => Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short", maximumFractionDigits: 3}).format(
        mode === "pro" ? 
            !trademode ? Number(formatEther(ethBal)) : Number(formatEther(state[1].result as bigint)) :
            !trademode ? Number(formatEther(state[0].result as bigint)) : Number(formatEther(state[1].result as bigint))
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
            let value = 0;
            if (mode === "pro") {
                if (trademode) {
                    value = Number(formatEther(ethBal)) - 0.00001;
                } else {
                    value = Number(formatEther(state[1].result as bigint));
                }
            } else {
                value = Number(formatEther(trademode ? (state[0].result as bigint) : (state[1].result as bigint)));
            }
            if (!Number.isFinite(value)) value = 0;
            if (value < 0) value = 0;
            const formatted = value.toFixed(6);
            setInputBalance(formatted);
            qoute(formatted);
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
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const copyToClipboard = async (address: string): Promise<void> => {
        await navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => { setCopiedAddress(null) }, 2000);
    };

    React.useEffect(() => {
        const fetchHeader = async () => {
            try {
                if (chain == "kubtestnet") {
                    const t: any = await readContracts(config, {
                        contracts: [
                            { ...tickerContract, functionName: "name" },
                            { ...tickerContract, functionName: "symbol" },
                            { ...tickerContract, functionName: "totalSupply" },
                        ],
                    });
                    const f: any = await readContracts(config, {
                        contracts: [
                            { ...bkgafactoryContract, functionName: "pumpReserve", args: [ticker as '0xstring'], chainId: _chainId },
                            { ...bkgafactoryContract, functionName: "virtualAmount", chainId: _chainId },
                        ],
                    });
                    const logCreateData = await publicClient.getContractEvents({
                        ...bkgafactoryContract,
                        eventName: "Creation",
                        fromBlock: BigInt(_blockcreated),
                        toBlock: "latest",
                    });
                    const data: {creator: '0xstring', createdTime: Number, logo: string, description: string }[] = logCreateData.filter((r: any) => {return r.args.tokenAddr.toUpperCase() === ticker.toUpperCase()})
                        .map((r: any) => {return {creator: r.args.creator, createdTime: r.args.createdTime, logo: r.args.logo, description: r.args.description }});
                    setSymbol(t[1].result);
                    setName(t[0].result);
                    setCreator(data[0].creator);
                    setCreateTime(Number(data[0].createdTime));
                    setLogo(data[0].logo);
                    setDescription(data[0].description);
                    const pump0 = f[0].result && Array.isArray(f[0].result) && f[0].result[0] !== undefined ? Number(formatEther(f[0].result[0])) : 0;
                    const pump1 = f[0].result && Array.isArray(f[0].result) && f[0].result[1] !== undefined ? Number(formatEther(f[0].result[1])) : 0;
                    const va = f[1].result !== undefined ? Number(formatEther(f[1].result)) : 0;
                    const price = (pump0 + va) / pump1;
                    setPrice(price);
                    const mcap = (1000000000 * price) - 3400;
                    setMcap(mcap);
                    const denominator = 47800;
                    setProgress(Number(((mcap * 100) / denominator).toFixed(2)));
                } else {
                    const result2: any = await readContracts(config, {
                        contracts: [
                            { ...tickerContract, functionName: "name" },
                            { ...tickerContract, functionName: "symbol" },
                            { ...bkgafactoryContract, functionName: "desp", args: [ticker as "0xstring"] },
                            { ...bkgafactoryContract, functionName: "logo", args: [ticker as "0xstring"] },
                            { ...univ2factoryContract, functionName: "getPool", args: [ticker as "0xstring", dataofcurr.addr as "0xstring", 10000] },
                            { ...bkgafactoryContract, functionName: "creator", args: [ticker as "0xstring"] },
                            { ...bkgafactoryContract, functionName: "createdTime", args: [ticker as "0xstring"] },
                        ],
                    });
                    setSymbol(result2[1].result);
                    setName(result2[0].result);
                    setCreator(result2[5].result);
                    setCreateTime(result2[6].result);
                    setLogo(result2[3].result);
                    setDescription(result2[2].result);
                    const result3 = await readContracts(config, {
                        contracts: [
                            { address: lp as "0xstring", abi: UniswapV2PairABI, functionName: "slot0", chainId: _chainId },
                            { address: lp as "0xstring", abi: UniswapV2PairABI, functionName: "token0", chainId: _chainId },
                        ],
                    });
                    const sqrtPriceX96 = result3[0] && result3[0].status === "success" && result3[0].result !== undefined ? Number(result3[0].result[0]) / (2 ** 96) : 0;          
                    const isToken0 = result3[1].result?.toUpperCase() !== currencyAddr.toUpperCase();
                    const price = isToken0 ? sqrtPriceX96 ** 2 : 1 / sqrtPriceX96 ** 2;
                    const getItems = reachData.find((item) => item.chain === chain)
                    const denominator = getItems ? mode === 'pro' ? Number(getItems?.proAmount) : Number(getItems?.lite) : 1;                    
                    setProgress(Number(((Number(price) * 100) / denominator).toFixed(2)));
                    setPrice(Number(price));
                    setMcap(Number(price !== 0 ? price * 1000000000 : 0));
                }
            } catch (error) {
                console.error("error with reason", error);
            }
        };

        const fetchBody = async () => {
            const nativeBal = account.address !== undefined ? await getBalance(config, { address: account.address as "0xstring" }) : { value: BigInt(0) };
            setEthBal(nativeBal.value);
            const state0 = account.address !== undefined ? 
                await readContracts(config, {
                    contracts: [
                        { address: dataofcurr.addr as "0xstring", abi: erc20Abi, functionName: "balanceOf", args: account.address !== undefined ? [account.address as "0xstring"] : ["0x0000000000000000000000000000000000000001"], chainId: _chainId },
                        { ...tickerContract, functionName: "balanceOf", args: account.address !== undefined ? [account.address as "0xstring"] : ["0x0000000000000000000000000000000000000001"] },
                        { ...graduatedContract, functionName: "isGraduate", args: [lp as "0xstring"] },
                        { address: lp as "0xstring", abi: UniswapV2PairABI, functionName: "slot0", chainId: _chainId },
                    ],
                }) :
                [ { result: BigInt(0) }, { result: BigInt(0) }, { result: false }, { result: [BigInt(0)] } ];
            setState(state0);
        };

        const fetchLogs = async () => {
            let result5removedup;
            if (chain === "monad") {
                const headers = {Accept: "application/json", "Content-Type": "application/json"};
                const body = JSON.stringify({
                    id: 1, jsonrpc: "2.0", method: "alchemy_getAssetTransfers",
                    params: [{
                        fromBlock: "0x0",
                        toBlock: "latest",
                        contractAddresses: [ticker as "0xstring"],
                        excludeZeroValue: true,
                        category: ["erc20"],
                    }],
                });
                const response = await fetch(_rpc, {method: "POST", headers: headers, body: body});
                const data = await response.json();
                const _holder = data.result.transfers.map(async (res: any) => {return res.to});
                result5removedup = [...new Set(await Promise.all(_holder))];
            } else {
                const result4 = await publicClient.getContractEvents({
                    abi: erc20Abi,
                    address: ticker as "0xstring",
                    eventName: "Transfer",
                    fromBlock: BigInt(dataofcurr.blockcreated),
                    toBlock: "latest",
                });
                const result5 = (await Promise.all(result4)).map((res) => {
                return res.args.to;
                });
                result5removedup = [...new Set(result5)];
            }
            const result6 = result5removedup.map(async (res) => {
                return await readContracts(config, {
                    contracts: [
                        {
                            address: ticker as "0xstring",
                            abi: erc20Abi,
                            functionName: "balanceOf",
                            args: [res as "0xstring"],
                            chainId: _chainId,
                        },
                    ],
                });
            });
            const result7 = await Promise.all(result6);
            const result8 = result5removedup.map((res, index) => {
                return {
                    addr: res as string,
                    value: Number(formatEther(result7[index][0].result as bigint)) / 10000000,
                };
            }).filter((res) => {
                return res.value !== 0;
            });
            setHolder(result8);
            let fulldatabuy;
            let fulldatasell;
            if (chain === "monad") {
                const headers = {Accept: "application/json", "Content-Type": "application/json"};
                const body = JSON.stringify({
                    id: 2, jsonrpc: "2.0", method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: "0x0",
                            toBlock: "latest",
                            fromAddress: lp as "0xstring",
                            contractAddresses: [ticker as "0xstring"],
                            excludeZeroValue: true,
                            category: ["erc20"],
                        },
                    ],
                });
                const response = await fetch(_rpc, {method: "POST", headers: headers, body: body});
                const data = await response.json();
                fulldatabuy = data.result.transfers.map((res: any) => {
                    return {
                        action: "buy",
                        value: Number(formatEther(BigInt(res.rawContract.value))),
                        from: res.to,
                        hash: res.hash,
                        block: Number(res.blockNum),
                    };
                });
                const body2 = JSON.stringify({
                    id: 3, jsonrpc: "2.0", method: "alchemy_getAssetTransfers",
                    params: [
                        {
                            fromBlock: "0x0",
                            toBlock: "latest",
                            toAddress: lp as "0xstring",
                            contractAddresses: [ticker as "0xstring"],
                            excludeZeroValue: true,
                            category: ["erc20"],
                        },
                    ],
                });
                const response2 = await fetch(_rpc, {method: "POST", headers: headers, body: body2});
                const data2 = await response2.json();
                fulldatasell = data2.result.transfers.map((res: any) => {
                    return {
                        action: "sell",
                        value: Number(formatEther(BigInt(res.rawContract.value))),
                        from: res.from,
                        hash: res.hash,
                        block: Number(res.blockNum),
                    };
                });
            } else {
                if (chain === "kubtestnet") {
                    const swapLogs = await publicClient.getContractEvents({
                        ...bkgafactoryContract,
                        eventName: "Swap",
                        fromBlock: BigInt(_blockcreated),
                        toBlock: "latest",
                    });
                    const decoded = await Promise.all(swapLogs.map(async (log: any) => {
                        try {
                            const tx = await publicClient.getTransaction({hash: log.transactionHash});
                            const decodedInput = decodeFunctionData({abi: ERC20FactoryV2ABI, data: tx.input as `0x${string}`});
                            const fn = decodedInput.functionName;
                            const args = decodedInput.args as any;
                            const tokenArg = (args && args.length > 0) ? String(args[0]) : "";
                            const isTargetToken = tokenArg.toLowerCase() === ticker.toLowerCase();
                            if (!isTargetToken) return null;
                            return { log, fn };
                        } catch (e) {
                            return null;
                        }
                    }));
                    const filtered = decoded.filter((x) => x !== null) as { log: any; fn: string }[];
                    const _timestamparr = filtered.map(async (r: any) => {return await publicClient.getBlock({blockNumber: r.log.blockNumber})});
                    const timestamparr = await Promise.all(_timestamparr);
                    const restimestamp = timestamparr.map((res) => {return Number(res.timestamp) * 1000});
                    const theresult = filtered.map((r: any, index: any) => {
                        return {
                            action: r.fn === 'buy' ? 'buy' : 'sell',
                            nativeValue: r.fn === 'buy' ? Number(formatEther(r.log.args.amountIn)) : Number(formatEther(r.log.args.amountOut)), 
                            value: r.fn === 'buy' ? Number(formatEther(r.log.args.amountOut)) : Number(formatEther(r.log.args.amountIn)),
                            from: r.log.args.sender,
                            hash: r.log.transactionHash,
                            timestamp: restimestamp[index],
                        };
                    }).sort((a: any, b: any) => {
                        return b.timestamp - a.timestamp;
                    });
                    setHx(theresult);
                    return;
                } else {
                    const result9 = await publicClient.getContractEvents({
                        address: ticker as "0xstring",
                        abi: erc20Abi,
                        eventName: "Transfer",
                        args: {from: lp as "0xstring"},
                        fromBlock: BigInt(dataofcurr.blockcreated),
                        toBlock: "latest",
                    });
                    fulldatabuy = result9.map((res: any) => {
                        return {
                            action: "buy",
                            value: Number(formatEther(res.args.value)),
                            from: res.args.to,
                            hash: res.transactionHash,
                            block: res.blockNumber,
                        };
                    });
                    const result10 = await publicClient.getContractEvents({
                        address: ticker as "0xstring",
                        abi: erc20Abi,
                        eventName: "Transfer",
                        args: {to: lp as "0xstring"},
                        fromBlock: BigInt(dataofcurr.blockcreated),
                        toBlock: "latest",
                    });
                    fulldatasell = result10.map((res: any) => {
                        return {
                            action: "sell",
                            value: Number(formatEther(res.args.value)),
                            from: res.args.from,
                            hash: res.transactionHash,
                            block: res.blockNumber,
                        };
                    });
                }
            }
            const mergedata = fulldatasell.slice(1).concat(fulldatabuy);
            const _timestamparr = mergedata.map(async (res: any) => {return await publicClient.getBlock({blockNumber: res.block})});
            const timestamparr = await Promise.all(_timestamparr);
            const restimestamp = timestamparr.map((res) => {return Number(res.timestamp) * 1000});
            const theresult = mergedata.map((res: any, index: any) => {
                return {
                    action: res.action,
                    value: res.value,
                    from: res.from,
                    hash: res.hash,
                    timestamp: restimestamp[index],
                };
            }).sort((a: any, b: any) => {
                return b.timestamp - a.timestamp;
            });
            setHx(theresult);
        };

        const fetchGraph = async () => {
            try {
                if (chain === "kubtestnet") {
                    const swapLogs = await publicClient.getContractEvents({
                        ...bkgafactoryContract,
                        eventName: "Swap",
                        fromBlock: BigInt(_blockcreated),
                        toBlock: "latest",
                    });
                    const decoded = await Promise.all(swapLogs.map(async (log: any) => {
                        try {
                            const tx = await publicClient.getTransaction({hash: log.transactionHash});
                            const decodedInput = decodeFunctionData({abi: ERC20FactoryV2ABI, data: tx.input as `0x${string}`});
                            const fn = decodedInput.functionName;
                            const args = decodedInput.args as any;
                            const tokenArg = (args && args.length > 0) ? String(args[0]) : "";
                            const isTargetToken = tokenArg.toLowerCase() === ticker.toLowerCase();
                            if (!isTargetToken) return null;
                            return { log, fn };
                        } catch (e) {
                            return null;
                        }
                    }));
                    const filtered = decoded.filter((x) => x !== null) as { log: any; fn: string }[];
                    if (filtered.length === 0) {
                        setGraphData([]);
                        return;
                    }

                    const blocks = await Promise.all(filtered.map((x) => publicClient.getBlock({ blockNumber: x.log.blockNumber })));
                    const points = filtered.map((x, idx) => {
                        const { log } = x;
                        const isBuy = Boolean(log.args.isBuy);
                        const amountIn = BigInt(log.args.amountIn || BigInt(0));
                        const amountOut = BigInt(log.args.amountOut || BigInt(0));
                        const price = isBuy ? Number(formatEther(amountIn)) / Math.max(1e-18, Number(formatEther(amountOut))) : Number(formatEther(amountOut)) / Math.max(1e-18, Number(formatEther(amountIn)));            
                        const volume = isBuy ? Number(formatEther(amountIn)) : Number(formatEther(amountOut));
                        const block = blocks[idx];
                        const timeMs = Number(block.timestamp) * 1000;
                        return {
                            time: timeMs,
                            price: Number.isFinite(price) ? price : 0,
                            volume: Number.isFinite(volume) ? volume : 0,
                        };
                    });

                    const sorted = points.filter((p) => p && p.time && p.price > 0 && p.volume > 0).sort((a, b) => a.time - b.time);
                    console.log(sorted)
                    setGraphData(sorted);
                    return;
                }

                const result = await readContracts(config, {
                    contracts: [
                        {
                            address: "0x7a90f3F76E88D4A2079E90197DD2661B8FEcA9B6" as "0xstring",
                            abi: CMswapChartABI,
                            functionName: "getCandleDataCount",
                            args: [ticker as "0xstring", currencyAddr as "0xstring"],
                            chainId: 88991001,
                        },
                    ],
                }); // Fallback to CMswap aggregator (for non-kubtestnet)
                let dataSet: any[] = [];
                if (result && result[0]?.status === "success") {
                    const count = result[0].result;
                    const totalCount = Number(count);
                    const pageSize = 100;
                    for (let startIndex = 0; startIndex < totalCount; startIndex += pageSize) {
                        const fetch = await readContracts(config, {
                            contracts: [
                                {
                                    address: "0x7a90f3F76E88D4A2079E90197DD2661B8FEcA9B6" as "0xstring",
                                    abi: CMswapChartABI,
                                    functionName: "getCandleData",
                                    args: [
                                        ticker as "0xstring",
                                        currencyAddr as "0xstring",
                                        BigInt(startIndex),
                                        BigInt(pageSize),
                                    ],
                                    chainId: 88991001,
                                },
                            ],
                        });
                        if (fetch && fetch[0]?.status === "success") {
                        dataSet = dataSet.concat(fetch[0].result);
                        }
                    }
                }
                const timestamps = dataSet[0];
                const prices = dataSet[1];
                const volumes = dataSet[2];
                const formattedData = (timestamps || []).map((time: any, index: number) => ({
                    time: Number(timestamps[index]) * 1000,
                    price: Number(formatEther(prices[index]?.toString() || "0")),
                    volume: Number(formatEther(volumes[index]?.toString() || "0")),
                }));
                setGraphData(formattedData);
            } catch (err) {
                console.error("fetchGraph error", err);
            }
        };

        if (hash === "") {
            fetchGraph();
            fetchLogs();
            fetchHeader();
            fetchBody();
        } else {
            setInterval(fetchHeader, 5000);
            setInterval(fetchGraph, 5000);
            setInterval(fetchLogs, 5000);
            setInterval(fetchBody, 5000);
        }
    }, [hash]);

    const qoute = useDebouncedCallback(async (value: string) => {
        try {
            if (Number(value) !== 0) {
                if (chain === "kubtestnet") {
                    const result = await readContracts(config, {
                        contracts: [
                            { ...bkgafactoryContract, functionName: "pumpReserve", args: [ticker as "0xstring"], chainId: _chainId },
                            { ...bkgafactoryContract, functionName: "virtualAmount", chainId: _chainId },
                            { ...bkgafactoryContract, functionName: "pumpFee", chainId: _chainId },
                        ],
                    });
                    const getAmountOut = (
                        _inputAmount: number,
                        _inputReserve: bigint,
                        _outputReserve: bigint
                    ): number => {
                        const inputAmountWithFee = _inputAmount * 99; // Apply 99/100 multiplier for fee
                        const numerator = BigInt(Math.floor(inputAmountWithFee)) * _outputReserve;
                        const denominator = _inputReserve * BigInt(100) + BigInt(Math.floor(inputAmountWithFee));
                        return Number(numerator / denominator);
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
                } else {
                    const qouteOutput = await simulateContract(config, {
                        ...univ3QouterContract,
                        functionName: "quoteExactInputSingle",
                        args: [
                            {
                                tokenIn: trademode ? (dataofcurr.addr as "0xstring") : (ticker as "0xstring"),
                                tokenOut: trademode ? (ticker as "0xstring") : (dataofcurr.addr as "0xstring"),
                                amountIn: parseEther(value),
                                fee: 10000,
                                sqrtPriceLimitX96: BigInt(0),
                            },
                        ],
                    });
                    setOutputBalance(formatEther(qouteOutput.result[0]));
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
                        ...bkgafactoryContract,
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
                                args: [account.address as "0xstring", bkgafactoryContract.address as "0xstring"],
                                chainId: _chainId,
                            },
                        ],
                    });
                    if (Number(formatEther(allowance[0].result!)) < Number(inputBalance)) {
                        const { request } = await simulateContract(config, {
                            address: ticker as "0xstring",
                            abi: erc20Abi,
                            functionName: "approve",
                            args: [bkgafactoryContract.address as "0xstring", parseEther(String(Number(inputBalance) + 1))],
                            chainId: _chainId,
                        });
                        const h = await writeContract(config, request);
                        await waitForTransactionReceipt(config, { hash: h });
                    }
                    result = await writeContract(config, {
                        ...bkgafactoryContract,
                        functionName: "sell",
                        args: [ticker as "0xstring", parseEther(inputBalance), (parseEther(outputBalance) * BigInt(90)) / BigInt(100)],
                        chainId: _chainId,
                    });
                }
            } else {
                if (mode === "pro") {
                    if (!trademode) {
                        const allowance = await readContracts(config, {
                            contracts: [
                                {
                                    address: ticker as "0xstring",
                                    abi: erc20Abi,
                                    functionName: "allowance",
                                    args: [account.address as "0xstring", dataofuniv2router.addr as "0xstring"],
                                    chainId: _chainId,
                                },
                            ],
                        });
                        if (Number(formatEther(allowance[0].result!)) < Number(inputBalance)) {
                            const { request } = await simulateContract(config, {
                                address: ticker as "0xstring",
                                abi: erc20Abi,
                                functionName: "approve",
                                args: [dataofuniv2router.addr as "0xstring", parseEther(String(Number(inputBalance) + 1))],
                                chainId: _chainId,
                            });
                            const h = await writeContract(config, request);
                            await waitForTransactionReceipt(config, { hash: h });
                        }
                    }
                    result = await writeContract(config, {
                        ...univ2RouterContract,
                        functionName: "exactInputSingle",
                        args: [
                            {
                                tokenIn: trademode ? (dataofcurr.addr as "0xstring") : (ticker as "0xstring"),
                                tokenOut: trademode ? (ticker as "0xstring") : (dataofcurr.addr as "0xstring"),
                                fee: 10000,
                                recipient: account.address as "0xstring",
                                amountIn: parseEther(inputBalance),
                                amountOutMinimum: (parseEther(outputBalance) * BigInt(95)) / BigInt(100),
                                sqrtPriceLimitX96: BigInt(0),
                            },
                        ],
                        value: trademode ? parseEther(inputBalance) : BigInt(0),
                    });
                } else {
                    const allowance = await readContracts(config, {
                        contracts: [
                            {
                                address: trademode ? (dataofcurr.addr as "0xstring") : (ticker as "0xstring"),
                                abi: erc20Abi,
                                functionName: "allowance",
                                args: [account.address as "0xstring", dataofuniv2router.addr as "0xstring"],
                                chainId: _chainId,
                            },
                        ],
                    });
                    if (
                        Number(formatEther(allowance[0].result!)) < Number(inputBalance)
                    ) {
                        const { request } = await simulateContract(config, {
                            address: trademode ? (dataofcurr.addr as "0xstring") : (ticker as "0xstring"),
                            abi: erc20Abi,
                            functionName: "approve",
                            args: [dataofuniv2router.addr as "0xstring", parseEther(String(Number(inputBalance) + 1))],
                            chainId: _chainId,
                        });
                        const h = await writeContract(config, request);
                        await waitForTransactionReceipt(config, { hash: h });
                    }
                    result = await writeContract(config, {
                        ...univ2RouterContract,
                        functionName: "exactInputSingle",
                        args: [
                            {
                                tokenIn: trademode ? (dataofcurr.addr as "0xstring") : (ticker as "0xstring"),
                                tokenOut: trademode ? (ticker as "0xstring") : (dataofcurr.addr as "0xstring"),
                                fee: 10000,
                                recipient: account.address as "0xstring",
                                amountIn: parseEther(inputBalance),
                                amountOutMinimum: (parseEther(outputBalance) * BigInt(95)) / BigInt(100),
                                sqrtPriceLimitX96: BigInt(0),
                            },
                        ],
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
        <main className="relative min-h-screen w-full md:w-6/7 overflow-hidden pt-20 pb-24 text-white">
            <div className="w-full my-4 px-4 flex items-center gap-6 text-[8px] sm:text-sm">
                <Link href={`/pump/launchpad?chain=${chain}${mode === "pro" ? "&mode=pro" : "&mode=lite"}`} prefetch={false} className="underline hover:font-bold">Back to launchpad</Link>
                <div className="flex gap-2 uppercase tracking-[0.2em] text-white/60">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{chainLabel}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{modeLabel}</span>
                </div>
            </div>

            {!headnoti && (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                    <div className="flex items-center gap-2 text-emerald-200">
                        <Check size={16} />
                        <span>Trade successful</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                        <Link
                            href={`${_explorer}tx/${hash}`}
                            prefetch={false}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-emerald-300/30 px-3 py-1 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100"
                        >
                            View transaction
                        </Link>
                        <button
                            onClick={() => setHeadnoti(false)}
                            className="rounded-full border border-transparent bg-emerald-400/20 px-3 py-1 text-emerald-100 transition hover:bg-emerald-400/30"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <section className="flex flex-row gap-4 sm:gap-10 relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_35px_rgba(34,197,94,0.35)] sm:mx-0 sm:h-28 sm:w-28">
                    <Image
                        src={resolvedLogo}
                        alt={tokenSymbolDisplay ? `${tokenSymbolDisplay} logo` : "Token logo"}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-1 flex-col gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-sm sm:text-lg font-semibold tracking-tight text-white">{name ?? "Loading token..."}</h1>
                        {tokenSymbolDisplay && (<span className="rounded-full border border-white/10 bg-white/10 px-1 sm:px-3 sm:py-1 text-[8px] sm:text-xs font-semibold uppercase text-white/70">{tokenSymbolDisplay}</span>)}
                    </div>
                    {creator && (
                        <div className="flex flex-wrap items-center gap-2 text-[8px] sm:text-xs">
                            <span className="text-white/40 uppercase tracking-wide">Creator</span>
                            <Link
                                href={getExplorerAddressUrl(creator)}
                                prefetch={false}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-white transition hover:text-emerald-200"
                            >
                                {`${String(creator).slice(0, 6)}...${String(creator).slice(-4)}`}
                            </Link>
                        </div>
                    )}
                    <div className="flex flex-wrap flex-row gap-1 sm:gap-2 text-[8px] sm:text-xs text-white/70">
                        <p className="rounded-full border border-white/10 bg-black/60 px-3 py-2">Created At: {relativeCreatedTime && relativeCreatedTime}</p>
                        <p className="rounded-full border border-white/10 bg-black/60 px-3 py-2">Price: {formattedPrice}{" "}{baseAssetSymbol && baseAssetSymbol}</p>
                        <p className="rounded-full border border-white/10 bg-black/60 px-3 py-2">Holders: {holder.length}</p>
                        <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 sm:py-0 flex flow-col items-center gap-2">
                            <p>Contract: {truncatedTicker}</p>
                            <button
                                onClick={() => copyToClipboard(ticker)}
                                className="rounded-full border border-white/10 bg-white/10 p-1 transition hover:border-white/40 hover:bg-white/20"
                                title="Copy contract address"
                            >
                                {copiedAddress === ticker ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                            <button
                                className="rounded-full border border-white/10 bg-white/10 p-1 transition hover:border-white/40 hover:bg-white/20"
                                onClick={async () => {
                                    if (!ethereum) return;
                                    await ethereum.request({
                                        method: "wallet_watchAsset",
                                        params: {
                                        type: "ERC20",
                                        options: {
                                            address: ticker,
                                            symbol: tokenSymbolDisplay || "TOKEN",
                                            decimals: 18,
                                            image: resolvedLogo,
                                        },
                                        },
                                    });
                                }}
                                title="Add token to wallet"
                            >
                                <Plus size={12} />
                            </button>
                            <Link
                                href={`${_explorer}address/${ticker}`}
                                prefetch={false}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/10 bg-white/10 p-1 transition hover:border-white/40 hover:bg-white/20"
                                title="View on explorer"
                            >
                                <Image src="/bs.png" alt="block explorer" width={12} height={12} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-4 px-6 grid grid-cols-[1fr_2fr] sm:grid-cols-[2fr_1fr] rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-slate-300">Market Cap</span>
                    <span className="text-sm sm:text-2xl font-bold tracking-wider text-emerald-300">{formattedMcap} {baseAssetSymbol}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="w-full text-right">{progressPercent.toFixed(2)}%</span>
                </div> 
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-6">
                    <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 shadow-xl backdrop-blur">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-white"></h2>
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold">
                                {["CMswap", "GeckoTerminal"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setGrapthType(type)}
                                        className={`rounded-full px-3 py-1 transition ${
                                            grapthType === type ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 h-[520px] w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40">
                            {grapthType === "GeckoTerminal" ? (
                                <iframe
                                    className="h-full w-full"
                                    allow="clipboard-write"
                                    title="GeckoTerminal Embed"
                                    src={`https://www.geckoterminal.com/${
                                    chain === "kub" ? 
                                        "bitkub_chain" : 
                                        chain === "monad" ? "monad-testnet" : ""
                                    }/pools/${lp}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=market_cap&resolution=1m`}
                                />
                            ) : (
                                <Chart data={graphData} />
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 shadow-xl backdrop-blur">
                        <h2 className="mb-3 text-lg font-semibold text-white">Activity</h2>
                        <div className="ml-auto flex items-center gap-2 text-xs">
                            <FilterIcon size={14} className="text-white/60" />
                            <div className="text-white/50">Showing {filteredHx.length} of {hx.length}</div>
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-white/80 transition hover:border-white/20 hover:bg-white/20"
                                title="Clear filters"
                            >
                                <X size={14} />
                                Clear
                            </button>
                        </div>
                        
                        <div className="mt-4 overflow-x-auto rounded-xl py-2 border border-white/10">
                            <table className="table-auto border-seperate border-spacing-0 text-center w-full">
                                <thead className="text-xs text-white/80">
                                    <tr>
                                        <th className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white/50">Time</span>
                                                <div className="flex flex-row items-center gap-1">
                                                    <FilterIcon size={14} className="text-white/60" />
                                                    <select
                                                        className="rounded-md border border-white/10 bg-black/60 px-2 py-1 outline-none hover:border-white/20"
                                                        value={filters.time}
                                                        onChange={(e) => handleTimeChange(e.target.value as any)}
                                                    >
                                                        <option value="all">All</option>
                                                        <option value="5m">5m</option>
                                                        <option value="1h">1h</option>
                                                        <option value="24h">24h</option>
                                                        <option value="7d">7d</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white/50">From</span>
                                                <div className="flex flex-row items-center gap-1">
                                                    <FilterIcon size={14} className="text-white/60" />
                                                    <input
                                                        value={filters.from}
                                                        onChange={handleTextChange("from")}
                                                        placeholder="address"
                                                        className="w-28 rounded-md border border-white/10 bg-black/60 px-2 py-1 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white/50">Action</span>
                                                <div className="flex flex-row  items-center gap-1">
                                                    <FilterIcon size={14} className="text-white/60" />
                                                    <button onClick={() => handleActionToggle("buy")} className={`rounded-full border px-2 py-1`} title="Buy">Buy</button>
                                                    <button onClick={() => handleActionToggle("sell")} className={`rounded-full border px-2 py-1`} title="Sell">Sell</button>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white/50">Native</span>
                                                <div className="flex flex-row  items-center gap-1">
                                                    <FilterIcon size={14} className="text-white/60" />
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={filters.nativeMin}
                                                        onChange={handleNumberChange("nativeMin")}
                                                        placeholder="min"
                                                        className="w-20 rounded-md border border-white/10 bg-black/60 px-2 py-1 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={filters.nativeMax}
                                                        onChange={handleNumberChange("nativeMax")}
                                                        placeholder="max"
                                                        className="w-20 rounded-md border border-white/10 bg-black/60 px-2 py-1 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white/50">Token</span>
                                                <div className="flex flex-row  items-center gap-1">
                                                    <FilterIcon size={14} className="text-white/60" />
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={filters.tokenMin}
                                                        onChange={handleNumberChange("tokenMin")}
                                                        placeholder="min"
                                                        className="w-20 rounded-md border border-white/10 bg-black/60 px-2 py-1 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                    <input
                                                        type="number"
                                                        inputMode="decimal"
                                                        value={filters.tokenMax}
                                                        onChange={handleNumberChange("tokenMax")}
                                                        placeholder="max"
                                                        className="w-20 rounded-md border border-white/10 bg-black/60 px-2 py-1 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white/50">Tx</span>
                                                <div className="flex flex-row  items-center gap-1">
                                                    <FilterIcon size={14} className="text-white/60" />
                                                    <input
                                                        value={filters.hash}
                                                        onChange={handleTextChange("hash")}
                                                        placeholder="hash"
                                                        className="w-28 rounded-md border border-white/10 bg-black/60 px-2 py-1 placeholder-white/30 outline-none hover:border-white/20"
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHx.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">No trades yet. Be the first to make a move.</td>
                                        </tr>
                                    ) : (
                                        filteredHx.map((res) => (
                                            <tr key={res.hash} className="text-xs text-white/80 hover:bg-white/10 border-t border-white/10">
                                                <td className="py-6">{formatRelativeTime(res.timestamp / 1000)}</td>
                                                <td className="py-6">
                                                    <Link
                                                        href={getExplorerAddressUrl(res.from)}
                                                        prefetch={false}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-mono text-xs text-white/70 underline-offset-2 transition hover:text-white hover:underline"
                                                    >
                                                        {res.from.slice(0, 6)}...{res.from.slice(-4)}
                                                    </Link>
                                                </td>
                                                <td className="py-6">
                                                    <div
                                                        className={`hidden rounded-full bg-white/10 px-2 py-1 capitalize md:inline-block text-xs font-semibold uppercase ${
                                                            res.action === "buy" ? "text-emerald-300" :
                                                            res.action === "sell" ? "text-rose-300" : "text-cyan-300"
                                                        }`}
                                                    >
                                                        {res.action}
                                                    </div>
                                                </td>
                                                <td className="py-6 font-mono text-sm text-white">{Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"}).format(res.nativeValue)} {baseAssetSymbol}</td>
                                                <td className="py-6 font-mono text-sm text-white">{Intl.NumberFormat("en-US", {notation: "compact", compactDisplay: "short"}).format(res.value)} {tokenSymbolDisplay}</td>
                                                <td className="py-6">
                                                    <Link
                                                        href={`${_explorer}tx/${res.hash}`}
                                                        prefetch={false}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-mono text-xs text-emerald-200 underline-offset-2 transition hover:text-emerald-100 hover:underline"
                                                    >
                                                        {res.hash.slice(0, 6)}...{res.hash.slice(-4)}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60">
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
                                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
                                    <div className="flex items-center gap-2 text-white/40">
                                        <span>You get</span>
                                        <span className="font-semibold text-white">{formattedOutput} {outputAssetSymbol}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={handleReset}
                                            className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
                                        >
                                            Reset
                                        </button>
                                        {presetButtons.map((preset) => (
                                            <button
                                                key={preset.label}
                                                onClick={() => handlePresetClick(preset)}
                                                className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                        <button
                                            onClick={handleMaxClick}
                                            className="rounded-full border border-emerald-400/40 px-3 py-1 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100"
                                        >
                                            Max
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={trade}
                                disabled={!isWalletReady}
                                className={`w-full rounded-lg px-4 py-3 text-md font-semibold transition ${
                                    isWalletReady ? "bg-gradient-to-r from-emerald-400 to-sky-500 text-black shadow-[0_20px_60px_rgba(16,185,129,0.35)] hover:brightness-110" : "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
                                }`}
                                style={gradientButtonStyle(!trademode, "sell")}
                            >
                                {tradeButtonLabel}
                            </button>
                            {!isWalletReady && (<p className="text-center text-xs text-white/40">Connect your wallet on {chainLabel} to trade.</p>)}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60">
                        <div className="flex items-center justify-between">
                            <span>Status</span>
                            <span className={`font-semibold ${isGraduated ? "text-emerald-300" : "text-white"}`}>{isGraduated ? "Graduated" : "Bonding curve"}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span>Max payout balance</span>
                            <span className="font-semibold text-white">{formattedCounterBalance} {outputAssetSymbol}</span>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between text-xs text-white/50">
                                <span>Bonding Progress</span>
                                <span>{progressPercent.toFixed(2)}%</span>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                                {bondingTooltip}
                                {isGraduated && graduationLink && (
                                    <>
                                        {" "}
                                        <Link
                                            href={graduationLink}
                                            prefetch={false}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-200 underline-offset-2 transition hover:text-emerald-100 hover:underline"
                                        >
                                            View graduation txn
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/30 p-6 shadow-xl backdrop-blur">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-white">Project Info</h2>
                            {creator === account.address && (
                                <button
                                    onClick={() => setShowSocials(true)}
                                    className="text-xs text-emerald-300 underline-offset-2 transition hover:text-emerald-100 hover:underline"
                                >
                                    Edit socials
                                </button>
                            )}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-white/70">{description ? description : "No description has been shared yet."}</p>
                        <div className="mt-6 flex gap-3">
                            {socialItems.filter((item) => socials[item.field]).length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-white/50">No socials linked yet.</div>
                            ) : (
                                socialItems
                                    .filter((item) => socials[item.field])
                                    .map((item) => (
                                        <Link
                                            key={item.field}
                                            href={socials[item.field]}
                                            prefetch={false}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full border border-white/10 bg-white/5 p-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
                                        >
                                            {item.icon}
                                        </Link>
                                    ))
                            )}
                        </div>
                        <div className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60">
                            <div className="font-mono text-sm text-white/80 break-all">{ticker}</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    onClick={() => copyToClipboard(ticker)}
                                    className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-white"
                                >
                                    {copiedAddress === ticker ? "Copied" : "Copy"}
                                </button>
                                <Link
                                    href={`${_explorer}address/${ticker}`}
                                    prefetch={false}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-white/10 px-3 py-1 text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100"
                                >
                                    View on explorer
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 shadow-xl backdrop-blur">
                            <h2 className="text-lg font-semibold text-white">Holder</h2>
                            <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
                                {sortedHolders.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50">Holder data is loading...</div>
                                ) : (
                                    sortedHolders.map((res, index) => (
                                        <div
                                            key={`${res.addr}-${index}`}
                                            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/80"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-white/40">#{index + 1}</span>
                                                <Link
                                                    href={getExplorerAddressUrl(res.addr)}
                                                    prefetch={false}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`font-mono text-xs transition hover:text-white ${
                                                        res.addr.toUpperCase() === String(creator).toUpperCase() ? 
                                                            "text-emerald-300" :
                                                            res.addr.toUpperCase() === lp.toUpperCase() ? "text-purple-300" : "text-white/70"
                                                    }`}
                                                >
                                                    {res.addr.slice(0, 6)}...{res.addr.slice(-4)}
                                                </Link>
                                            </div>
                                            <span className="text-sm font-semibold text-white">{res.value.toFixed(4)}%</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
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
                                    <input
                                        type="text"
                                        placeholder={item.placeholder}
                                        value={socials[item.field]}
                                        onChange={handleChange(item.field)}
                                        maxLength={200}
                                        className={`w-full rounded-2xl border px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${
                                            errors[item.field] ? "border-rose-400 focus:ring-rose-400" : "border-white/10 bg-white/5 focus:ring-emerald-400"
                                        }`}
                                    />
                                    <div className="flex items-center justify-between text-[11px] text-white/40">
                                        {errors[item.field] ? <span>Must start with http:// or https://</span> : <span>Optional</span>}
                                        <span>{socials[item.field].length}/200</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-[11px] text-white/40">🚫 Links must be safe and official. The team may remove inaccurate information.</p>
                        <button
                            onClick={handleSave}
                            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                            disabled={Object.values(errors).some(Boolean)}
                        >
                            Save socials
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
