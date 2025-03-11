(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/faa24_@reown_appkit-core_dist_esm_f2ad51ac._.js", {

"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ConstantsUtil": (()=>ConstantsUtil),
    "MELD_PUBLIC_KEY": (()=>MELD_PUBLIC_KEY),
    "ONRAMP_PROVIDERS": (()=>ONRAMP_PROVIDERS)
});
const SECURE_SITE = 'https://secure.walletconnect.org';
const ONRAMP_PROVIDERS = [
    {
        label: 'Coinbase',
        name: 'coinbase',
        feeRange: '1-2%',
        url: '',
        supportedChains: [
            'eip155'
        ]
    },
    {
        label: 'Meld.io',
        name: 'meld',
        feeRange: '1-2%',
        url: 'https://meldcrypto.com',
        supportedChains: [
            'eip155',
            'solana'
        ]
    }
];
const MELD_PUBLIC_KEY = 'WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU';
const ConstantsUtil = {
    FOUR_MINUTES_MS: 240000,
    TEN_SEC_MS: 10000,
    FIVE_SEC_MS: 5000,
    THREE_SEC_MS: 3000,
    ONE_SEC_MS: 1000,
    SECURE_SITE,
    SECURE_SITE_DASHBOARD: `${SECURE_SITE}/dashboard`,
    SECURE_SITE_FAVICON: `${SECURE_SITE}/images/favicon.png`,
    RESTRICTED_TIMEZONES: [
        'ASIA/SHANGHAI',
        'ASIA/URUMQI',
        'ASIA/CHONGQING',
        'ASIA/HARBIN',
        'ASIA/KASHGAR',
        'ASIA/MACAU',
        'ASIA/HONG_KONG',
        'ASIA/MACAO',
        'ASIA/BEIJING',
        'ASIA/HARBIN'
    ],
    /**
     * Network name to Coinbase Pay SDK chain name map object
     * @see supported chain names on Coinbase for Pay SDK: https://github.com/coinbase/cbpay-js/blob/d4bda2c05c4d5917c8db6a05476b603546046394/src/types/onramp.ts
     */ WC_COINBASE_PAY_SDK_CHAINS: [
        'ethereum',
        'arbitrum',
        'polygon',
        'avalanche-c-chain',
        'optimism',
        'celo',
        'base'
    ],
    WC_COINBASE_PAY_SDK_FALLBACK_CHAIN: 'ethereum',
    WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP: {
        Ethereum: 'ethereum',
        'Arbitrum One': 'arbitrum',
        Polygon: 'polygon',
        Avalanche: 'avalanche-c-chain',
        'OP Mainnet': 'optimism',
        Celo: 'celo',
        Base: 'base'
    },
    WC_COINBASE_ONRAMP_APP_ID: 'bf18c88d-495a-463b-b249-0b9d3656cf5e',
    SWAP_SUGGESTED_TOKENS: [
        'ETH',
        'UNI',
        '1INCH',
        'AAVE',
        'SOL',
        'ADA',
        'AVAX',
        'DOT',
        'LINK',
        'NITRO',
        'GAIA',
        'MILK',
        'TRX',
        'NEAR',
        'GNO',
        'WBTC',
        'DAI',
        'WETH',
        'USDC',
        'USDT',
        'ARB',
        'BAL',
        'BICO',
        'CRV',
        'ENS',
        'MATIC',
        'OP'
    ],
    SWAP_POPULAR_TOKENS: [
        'ETH',
        'UNI',
        '1INCH',
        'AAVE',
        'SOL',
        'ADA',
        'AVAX',
        'DOT',
        'LINK',
        'NITRO',
        'GAIA',
        'MILK',
        'TRX',
        'NEAR',
        'GNO',
        'WBTC',
        'DAI',
        'WETH',
        'USDC',
        'USDT',
        'ARB',
        'BAL',
        'BICO',
        'CRV',
        'ENS',
        'MATIC',
        'OP',
        'METAL',
        'DAI',
        'CHAMP',
        'WOLF',
        'SALE',
        'BAL',
        'BUSD',
        'MUST',
        'BTCpx',
        'ROUTE',
        'HEX',
        'WELT',
        'amDAI',
        'VSQ',
        'VISION',
        'AURUM',
        'pSP',
        'SNX',
        'VC',
        'LINK',
        'CHP',
        'amUSDT',
        'SPHERE',
        'FOX',
        'GIDDY',
        'GFC',
        'OMEN',
        'OX_OLD',
        'DE',
        'WNT'
    ],
    BALANCE_SUPPORTED_CHAINS: [
        'eip155',
        'solana'
    ],
    SWAP_SUPPORTED_NETWORKS: [
        // Ethereum'
        'eip155:1',
        // Arbitrum One'
        'eip155:42161',
        // Optimism'
        'eip155:10',
        // ZKSync Era'
        'eip155:324',
        // Base'
        'eip155:8453',
        // BNB Smart Chain'
        'eip155:56',
        // Polygon'
        'eip155:137',
        // Gnosis'
        'eip155:100',
        // Avalanche'
        'eip155:43114',
        // Fantom'
        'eip155:250',
        // Klaytn'
        'eip155:8217',
        // Aurora
        'eip155:1313161554'
    ],
    NAMES_SUPPORTED_CHAIN_NAMESPACES: [
        'eip155'
    ],
    ONRAMP_SUPPORTED_CHAIN_NAMESPACES: [
        'eip155',
        'solana'
    ],
    ACTIVITY_ENABLED_CHAIN_NAMESPACES: [
        'eip155',
        'solana'
    ],
    NATIVE_TOKEN_ADDRESS: {
        eip155: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        solana: 'So11111111111111111111111111111111111111111',
        polkadot: '0x',
        bip122: '0x'
    },
    CONVERT_SLIPPAGE_TOLERANCE: 1,
    CONNECT_LABELS: {
        MOBILE: 'Open and continue in a new browser tab'
    },
    DEFAULT_FEATURES: {
        swaps: true,
        onramp: true,
        receive: true,
        send: true,
        email: true,
        emailShowWallets: true,
        socials: [
            'google',
            'x',
            'discord',
            'farcaster',
            'github',
            'apple',
            'facebook'
        ],
        history: true,
        analytics: true,
        allWallets: true,
        legalCheckbox: false,
        smartSessions: false,
        collapseWallets: false,
        walletFeaturesOrder: [
            'onramp',
            'swaps',
            'receive',
            'send'
        ],
        connectMethodsOrder: undefined
    },
    DEFAULT_ACCOUNT_TYPES: {
        bip122: 'payment',
        eip155: 'smartAccount',
        polkadot: 'eoa',
        solana: 'eoa'
    }
}; //# sourceMappingURL=ConstantsUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CoreHelperUtil": (()=>CoreHelperUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
const CoreHelperUtil = {
    isMobile () {
        if (this.isClient()) {
            return Boolean(window.matchMedia('(pointer:coarse)').matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent));
        }
        return false;
    },
    checkCaipNetwork (network, networkName = '') {
        return network?.caipNetworkId.toLocaleLowerCase().includes(networkName.toLowerCase());
    },
    isAndroid () {
        if (!this.isMobile()) {
            return false;
        }
        const ua = window.navigator.userAgent.toLowerCase();
        return CoreHelperUtil.isMobile() && ua.includes('android');
    },
    isIos () {
        if (!this.isMobile()) {
            return false;
        }
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.includes('iphone') || ua.includes('ipad');
    },
    isSafari () {
        if (!this.isClient()) {
            return false;
        }
        const ua = window.navigator.userAgent.toLowerCase();
        return ua.includes('safari');
    },
    isClient () {
        return typeof window !== 'undefined';
    },
    isPairingExpired (expiry) {
        return expiry ? expiry - Date.now() <= __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].TEN_SEC_MS : true;
    },
    isAllowedRetry (lastRetry, differenceMs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ONE_SEC_MS) {
        return Date.now() - lastRetry >= differenceMs;
    },
    copyToClopboard (text) {
        navigator.clipboard.writeText(text);
    },
    isIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return false;
        }
    },
    getPairingExpiry () {
        return Date.now() + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].FOUR_MINUTES_MS;
    },
    getNetworkId (caipAddress) {
        return caipAddress?.split(':')[1];
    },
    getPlainAddress (caipAddress) {
        return caipAddress?.split(':')[2];
    },
    async wait (milliseconds) {
        return new Promise((resolve)=>{
            setTimeout(resolve, milliseconds);
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debounce (func, timeout = 500) {
        let timer = undefined;
        return (...args)=>{
            function next() {
                func(...args);
            }
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(next, timeout);
        };
    },
    isHttpUrl (url) {
        return url.startsWith('http://') || url.startsWith('https://');
    },
    formatNativeUrl (appUrl, wcUri) {
        if (CoreHelperUtil.isHttpUrl(appUrl)) {
            return this.formatUniversalUrl(appUrl, wcUri);
        }
        let safeAppUrl = appUrl;
        if (!safeAppUrl.includes('://')) {
            safeAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '');
            safeAppUrl = `${safeAppUrl}://`;
        }
        if (!safeAppUrl.endsWith('/')) {
            safeAppUrl = `${safeAppUrl}/`;
        }
        // Android deeplinks in tg context require the uri to be encoded twice
        if (this.isTelegram() && this.isAndroid()) {
            // eslint-disable-next-line no-param-reassign
            wcUri = encodeURIComponent(wcUri);
        }
        const encodedWcUrl = encodeURIComponent(wcUri);
        return {
            redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
            href: safeAppUrl
        };
    },
    formatUniversalUrl (appUrl, wcUri) {
        if (!CoreHelperUtil.isHttpUrl(appUrl)) {
            return this.formatNativeUrl(appUrl, wcUri);
        }
        let safeAppUrl = appUrl;
        if (!safeAppUrl.endsWith('/')) {
            safeAppUrl = `${safeAppUrl}/`;
        }
        const encodedWcUrl = encodeURIComponent(wcUri);
        return {
            redirect: `${safeAppUrl}wc?uri=${encodedWcUrl}`,
            href: safeAppUrl
        };
    },
    getOpenTargetForPlatform (target) {
        // Only '_blank' deeplinks work in Telegram context
        if (this.isTelegram()) {
            return '_blank';
        }
        return target;
    },
    openHref (href, target, features) {
        window.open(href, this.getOpenTargetForPlatform(target), features || 'noreferrer noopener');
    },
    returnOpenHref (href, target, features) {
        return window.open(href, this.getOpenTargetForPlatform(target), features || 'noreferrer noopener');
    },
    isTelegram () {
        return typeof window !== 'undefined' && // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Boolean(window.TelegramWebviewProxy) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Boolean(window.Telegram) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Boolean(window.TelegramWebviewProxyProto));
    },
    async preloadImage (src) {
        const imagePromise = new Promise((resolve, reject)=>{
            const image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.crossOrigin = 'anonymous';
            image.src = src;
        });
        return Promise.race([
            imagePromise,
            CoreHelperUtil.wait(2000)
        ]);
    },
    formatBalance (balance, symbol) {
        let formattedBalance = '0.000';
        if (typeof balance === 'string') {
            const number = Number(balance);
            if (number) {
                const formattedValue = Math.floor(number * 1000) / 1000;
                if (formattedValue) {
                    formattedBalance = formattedValue.toString();
                }
            }
        }
        return `${formattedBalance}${symbol ? ` ${symbol}` : ''}`;
    },
    formatBalance2 (balance, symbol) {
        let formattedBalance = undefined;
        if (balance === '0') {
            formattedBalance = '0';
        } else if (typeof balance === 'string') {
            const number = Number(balance);
            if (number) {
                formattedBalance = number.toString().match(/^-?\d+(?:\.\d{0,3})?/u)?.[0];
            }
        }
        return {
            value: formattedBalance ?? '0',
            rest: formattedBalance === '0' ? '000' : '',
            symbol
        };
    },
    getApiUrl () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].W3M_API_URL;
    },
    getBlockchainApiUrl () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].BLOCKCHAIN_API_RPC_URL;
    },
    getAnalyticsUrl () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].PULSE_API_URL;
    },
    getUUID () {
        if (crypto?.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, (c)=>{
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseError (error) {
        if (typeof error === 'string') {
            return error;
        } else if (typeof error?.issues?.[0]?.message === 'string') {
            return error.issues[0].message;
        } else if (error instanceof Error) {
            return error.message;
        }
        return 'Unknown error';
    },
    sortRequestedNetworks (approvedIds, requestedNetworks = []) {
        const approvedIndexMap = {};
        if (requestedNetworks && approvedIds) {
            approvedIds.forEach((id, index)=>{
                approvedIndexMap[id] = index;
            });
            requestedNetworks.sort((a, b)=>{
                const indexA = approvedIndexMap[a.id];
                const indexB = approvedIndexMap[b.id];
                if (indexA !== undefined && indexB !== undefined) {
                    return indexA - indexB;
                } else if (indexA !== undefined) {
                    return -1;
                } else if (indexB !== undefined) {
                    return 1;
                }
                return 0;
            });
        }
        return requestedNetworks;
    },
    calculateBalance (array) {
        let sum = 0;
        for (const item of array){
            sum += item.value ?? 0;
        }
        return sum;
    },
    formatTokenBalance (number) {
        const roundedNumber = number.toFixed(2);
        const [dollars, pennies] = roundedNumber.split('.');
        return {
            dollars,
            pennies
        };
    },
    isAddress (address, chain = 'eip155') {
        switch(chain){
            case 'eip155':
                if (!/^(?:0x)?[0-9a-f]{40}$/iu.test(address)) {
                    return false;
                } else if (/^(?:0x)?[0-9a-f]{40}$/iu.test(address) || /^(?:0x)?[0-9A-F]{40}$/iu.test(address)) {
                    return true;
                }
                return false;
            case 'solana':
                return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(address);
            default:
                return false;
        }
    },
    uniqueBy (arr, key) {
        const set = new Set();
        return arr.filter((item)=>{
            const keyValue = item[key];
            if (set.has(keyValue)) {
                return false;
            }
            set.add(keyValue);
            return true;
        });
    },
    generateSdkVersion (adapters, platform, version) {
        const noAdapters = adapters.length === 0;
        const adapterNames = noAdapters ? 'universal' : adapters.map((adapter)=>adapter.adapterType).join(',');
        return `${platform}-${adapterNames}-${version}`;
    },
    // eslint-disable-next-line max-params
    createAccount (namespace, address, type, publicKey, path) {
        return {
            namespace,
            address,
            type,
            publicKey,
            path
        };
    },
    isCaipAddress (address) {
        if (typeof address !== 'string') {
            return false;
        }
        const sections = address.split(':');
        const namespace = sections[0];
        return sections.filter(Boolean).length === 3 && namespace in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN_NAME_MAP;
    }
}; //# sourceMappingURL=CoreHelperUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AssetController": (()=>AssetController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    walletImages: {},
    networkImages: {},
    chainImages: {},
    connectorImages: {},
    tokenImages: {},
    currencyImages: {}
});
const AssetController = {
    state,
    subscribeNetworkImages (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state.networkImages, ()=>callback(state.networkImages));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    setWalletImage (key, value) {
        state.walletImages[key] = value;
    },
    setNetworkImage (key, value) {
        state.networkImages[key] = value;
    },
    setChainImage (key, value) {
        state.chainImages[key] = value;
    },
    setConnectorImage (key, value) {
        state.connectorImages = {
            ...state.connectorImages,
            [key]: value
        };
    },
    setTokenImage (key, value) {
        state.tokenImages[key] = value;
    },
    setCurrencyImage (key, value) {
        state.currencyImages[key] = value;
    }
}; //# sourceMappingURL=AssetController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AssetUtil": (()=>AssetUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
;
;
const namespaceImageIds = {
    // Ethereum
    eip155: 'ba0ba0cd-17c6-4806-ad93-f9d174f17900',
    // Solana
    solana: 'a1b58899-f671-4276-6a5e-56ca5bd59700',
    // Polkadot
    polkadot: '',
    // Bitcoin
    bip122: ''
};
const AssetUtil = {
    async fetchWalletImage (imageId) {
        if (!imageId) {
            return undefined;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"]._fetchWalletImage(imageId);
        return this.getWalletImageById(imageId);
    },
    async fetchNetworkImage (imageId) {
        if (!imageId) {
            return undefined;
        }
        const existingImage = this.getNetworkImageById(imageId);
        if (existingImage) {
            return existingImage;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"]._fetchNetworkImage(imageId);
        return this.getNetworkImageById(imageId);
    },
    getWalletImageById (imageId) {
        if (!imageId) {
            return undefined;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.walletImages[imageId];
    },
    getWalletImage (wallet) {
        if (wallet?.image_url) {
            return wallet?.image_url;
        }
        if (wallet?.image_id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.walletImages[wallet.image_id];
        }
        return undefined;
    },
    getNetworkImage (network) {
        if (network?.assets?.imageUrl) {
            return network?.assets?.imageUrl;
        }
        if (network?.assets?.imageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.networkImages[network.assets.imageId];
        }
        return undefined;
    },
    getNetworkImageById (imageId) {
        if (!imageId) {
            return undefined;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.networkImages[imageId];
    },
    getConnectorImage (connector) {
        if (connector?.imageUrl) {
            return connector.imageUrl;
        }
        if (connector?.imageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.connectorImages[connector.imageId];
        }
        return undefined;
    },
    getChainImage (chain) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].state.networkImages[namespaceImageIds[chain]];
    }
}; //# sourceMappingURL=AssetUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "FetchUtil": (()=>FetchUtil)
});
async function fetchData(...args) {
    const response = await fetch(...args);
    if (!response.ok) {
        // Create error object and reject if not a 2xx response code
        const err = new Error(`HTTP status code: ${response.status}`, {
            cause: response
        });
        throw err;
    }
    return response;
}
class FetchUtil {
    constructor({ baseUrl, clientId }){
        this.baseUrl = baseUrl;
        this.clientId = clientId;
    }
    async get({ headers, signal, cache, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'GET',
            headers,
            signal,
            cache
        });
        return response.json();
    }
    async getBlob({ headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'GET',
            headers,
            signal
        });
        return response.blob();
    }
    async post({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'POST',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    async put({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'PUT',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    async delete({ body, headers, signal, ...args }) {
        const url = this.createUrl(args);
        const response = await fetchData(url, {
            method: 'DELETE',
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal
        });
        return response.json();
    }
    createUrl({ path, params }) {
        const url = new URL(path, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value])=>{
                if (value) {
                    url.searchParams.append(key, value);
                }
            });
        }
        if (this.clientId) {
            url.searchParams.append('clientId', this.clientId);
        }
        return url;
    }
} //# sourceMappingURL=FetchUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
/* eslint-disable no-console */ __turbopack_context__.s({
    "StorageUtil": (()=>StorageUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-client] (ecmascript)");
;
const StorageUtil = {
    getActiveNetworkProps () {
        const namespace = StorageUtil.getActiveNamespace();
        const caipNetworkId = StorageUtil.getActiveCaipNetworkId();
        const stringChainId = caipNetworkId ? caipNetworkId.split(':')[1] : undefined;
        // eslint-disable-next-line no-nested-ternary
        const chainId = stringChainId ? isNaN(Number(stringChainId)) ? stringChainId : Number(stringChainId) : undefined;
        return {
            namespace,
            caipNetworkId,
            chainId
        };
    },
    setWalletConnectDeepLink ({ name, href }) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DEEPLINK_CHOICE, JSON.stringify({
                href,
                name
            }));
        } catch  {
            console.info('Unable to set WalletConnect deep link');
        }
    },
    getWalletConnectDeepLink () {
        try {
            const deepLink = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DEEPLINK_CHOICE);
            if (deepLink) {
                return JSON.parse(deepLink);
            }
        } catch  {
            console.info('Unable to get WalletConnect deep link');
        }
        return undefined;
    },
    deleteWalletConnectDeepLink () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].DEEPLINK_CHOICE);
        } catch  {
            console.info('Unable to delete WalletConnect deep link');
        }
    },
    setActiveNamespace (namespace) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_NAMESPACE, namespace);
        } catch  {
            console.info('Unable to set active namespace');
        }
    },
    setActiveCaipNetworkId (caipNetworkId) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID, caipNetworkId);
            StorageUtil.setActiveNamespace(caipNetworkId.split(':')[0]);
        } catch  {
            console.info('Unable to set active caip network id');
        }
    },
    getActiveCaipNetworkId () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID);
        } catch  {
            console.info('Unable to get active caip network id');
            return undefined;
        }
    },
    deleteActiveCaipNetworkId () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID);
        } catch  {
            console.info('Unable to delete active caip network id');
        }
    },
    deleteConnectedConnectorId (namespace) {
        try {
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnectorIdKey"])(namespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(key);
        } catch  {
            console.info('Unable to delete connected connector id');
        }
    },
    setAppKitRecent (wallet) {
        try {
            const recentWallets = StorageUtil.getRecentWallets();
            const exists = recentWallets.find((w)=>w.id === wallet.id);
            if (!exists) {
                recentWallets.unshift(wallet);
                if (recentWallets.length > 2) {
                    recentWallets.pop();
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLETS, JSON.stringify(recentWallets));
            }
        } catch  {
            console.info('Unable to set AppKit recent');
        }
    },
    getRecentWallets () {
        try {
            const recent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].RECENT_WALLETS);
            return recent ? JSON.parse(recent) : [];
        } catch  {
            console.info('Unable to get AppKit recent');
        }
        return [];
    },
    setConnectedConnectorId (namespace, connectorId) {
        try {
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnectorIdKey"])(namespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(key, connectorId);
        } catch  {
            console.info('Unable to set Connected Connector Id');
        }
    },
    getActiveNamespace () {
        try {
            const activeNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_NAMESPACE);
            return activeNamespace;
        } catch  {
            console.info('Unable to get active namespace');
        }
        return undefined;
    },
    getConnectedConnectorId (namespace) {
        if (!namespace) {
            return undefined;
        }
        try {
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSafeConnectorIdKey"])(namespace);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(key);
        } catch (e) {
            console.info('Unable to get connected connector id in namespace ', namespace);
        }
        return undefined;
    },
    setConnectedSocialProvider (socialProvider) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL, socialProvider);
        } catch  {
            console.info('Unable to set connected social provider');
        }
    },
    getConnectedSocialProvider () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL);
        } catch  {
            console.info('Unable to get connected social provider');
        }
        return undefined;
    },
    deleteConnectedSocialProvider () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL);
        } catch  {
            console.info('Unable to delete connected social provider');
        }
    },
    getConnectedSocialUsername () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_SOCIAL_USERNAME);
        } catch  {
            console.info('Unable to get connected social username');
        }
        return undefined;
    },
    getStoredActiveCaipNetworkId () {
        const storedCaipNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].ACTIVE_CAIP_NETWORK_ID);
        const networkId = storedCaipNetworkId?.split(':')?.[1];
        return networkId;
    },
    setConnectionStatus (status) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTION_STATUS, status);
        } catch  {
            console.info('Unable to set connection status');
        }
    },
    getConnectionStatus () {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTION_STATUS);
        } catch  {
            return undefined;
        }
    },
    getConnectedNamespaces () {
        try {
            const namespaces = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].getItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_NAMESPACES);
            if (!namespaces?.length) {
                return [];
            }
            return namespaces.split(',');
        } catch  {
            return [];
        }
    },
    setConnectedNamespaces (namespaces) {
        try {
            const uniqueNamespaces = Array.from(new Set(namespaces));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorage"].setItem(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SafeLocalStorageKeys"].CONNECTED_NAMESPACES, uniqueNamespaces.join(','));
        } catch  {
            console.info('Unable to set namespaces in storage');
        }
    },
    addConnectedNamespace (namespace) {
        try {
            const namespaces = StorageUtil.getConnectedNamespaces();
            if (!namespaces.includes(namespace)) {
                namespaces.push(namespace);
                StorageUtil.setConnectedNamespaces(namespaces);
            }
        } catch  {
            console.info('Unable to add connected namespace');
        }
    },
    removeConnectedNamespace (namespace) {
        try {
            const namespaces = StorageUtil.getConnectedNamespaces();
            const index = namespaces.indexOf(namespace);
            if (index > -1) {
                namespaces.splice(index, 1);
                StorageUtil.setConnectedNamespaces(namespaces);
            }
        } catch  {
            console.info('Unable to remove connected namespace');
        }
    }
}; //# sourceMappingURL=StorageUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "OptionsController": (()=>OptionsController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    features: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES,
    projectId: '',
    sdkType: 'appkit',
    sdkVersion: 'html-wagmi-undefined',
    defaultAccountTypes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_ACCOUNT_TYPES
});
const OptionsController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    setOptions (options) {
        Object.assign(state, options);
    },
    setFeatures (features) {
        if (!features) {
            return;
        }
        if (!state.features) {
            state.features = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES;
            return;
        }
        const newFeatures = {
            ...state.features,
            ...features
        };
        state.features = newFeatures;
    },
    setProjectId (projectId) {
        state.projectId = projectId;
    },
    setAllWallets (allWallets) {
        state.allWallets = allWallets;
    },
    setIncludeWalletIds (includeWalletIds) {
        state.includeWalletIds = includeWalletIds;
    },
    setExcludeWalletIds (excludeWalletIds) {
        state.excludeWalletIds = excludeWalletIds;
    },
    setFeaturedWalletIds (featuredWalletIds) {
        state.featuredWalletIds = featuredWalletIds;
    },
    setTokens (tokens) {
        state.tokens = tokens;
    },
    setTermsConditionsUrl (termsConditionsUrl) {
        state.termsConditionsUrl = termsConditionsUrl;
    },
    setPrivacyPolicyUrl (privacyPolicyUrl) {
        state.privacyPolicyUrl = privacyPolicyUrl;
    },
    setCustomWallets (customWallets) {
        state.customWallets = customWallets;
    },
    setIsSiweEnabled (isSiweEnabled) {
        state.isSiweEnabled = isSiweEnabled;
    },
    setIsUniversalProvider (isUniversalProvider) {
        state.isUniversalProvider = isUniversalProvider;
    },
    setSdkVersion (sdkVersion) {
        state.sdkVersion = sdkVersion;
    },
    setMetadata (metadata) {
        state.metadata = metadata;
    },
    setDisableAppend (disableAppend) {
        state.disableAppend = disableAppend;
    },
    setEIP6963Enabled (enableEIP6963) {
        state.enableEIP6963 = enableEIP6963;
    },
    setDebug (debug) {
        state.debug = debug;
    },
    setEnableWalletConnect (enableWalletConnect) {
        state.enableWalletConnect = enableWalletConnect;
    },
    setEnableWalletGuide (enableWalletGuide) {
        state.enableWalletGuide = enableWalletGuide;
    },
    setEnableAuthLogger (enableAuthLogger) {
        state.enableAuthLogger = enableAuthLogger;
    },
    setEnableWallets (enableWallets) {
        state.enableWallets = enableWallets;
    },
    setHasMultipleAddresses (hasMultipleAddresses) {
        state.hasMultipleAddresses = hasMultipleAddresses;
    },
    setSIWX (siwx) {
        state.siwx = siwx;
    },
    setConnectMethodsOrder (connectMethodsOrder) {
        state.features = {
            ...state.features,
            connectMethodsOrder
        };
    },
    setWalletFeaturesOrder (walletFeaturesOrder) {
        state.features = {
            ...state.features,
            walletFeaturesOrder
        };
    },
    setSocialsOrder (socialsOrder) {
        state.features = {
            ...state.features,
            socials: socialsOrder
        };
    },
    setCollapseWallets (collapseWallets) {
        state.features = {
            ...state.features,
            collapseWallets
        };
    },
    setEnableEmbedded (enableEmbedded) {
        state.enableEmbedded = enableEmbedded;
    },
    setAllowUnsupportedChain (allowUnsupportedChain) {
        state.allowUnsupportedChain = allowUnsupportedChain;
    },
    setUsingInjectedUniversalProvider (useInjectedUniversalProvider) {
        state.useInjectedUniversalProvider = useInjectedUniversalProvider;
    },
    setDefaultAccountTypes (defaultAccountType = {}) {
        Object.entries(defaultAccountType).forEach(([namespace, accountType])=>{
            if (accountType) {
                // @ts-expect-error - Keys are validated by the param type
                state.defaultAccountTypes[namespace] = accountType;
            }
        });
    },
    getSnapshot () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(state);
    }
}; //# sourceMappingURL=OptionsController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BlockchainApiController": (()=>BlockchainApiController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const DEFAULT_OPTIONS = {
    purchaseCurrencies: [
        {
            id: '2b92315d-eab7-5bef-84fa-089a131333f5',
            name: 'USD Coin',
            symbol: 'USDC',
            networks: [
                {
                    name: 'ethereum-mainnet',
                    display_name: 'Ethereum',
                    chain_id: '1',
                    contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                },
                {
                    name: 'polygon-mainnet',
                    display_name: 'Polygon',
                    chain_id: '137',
                    contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                }
            ]
        },
        {
            id: '2b92315d-eab7-5bef-84fa-089a131333f5',
            name: 'Ether',
            symbol: 'ETH',
            networks: [
                {
                    name: 'ethereum-mainnet',
                    display_name: 'Ethereum',
                    chain_id: '1',
                    contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
                },
                {
                    name: 'polygon-mainnet',
                    display_name: 'Polygon',
                    chain_id: '137',
                    contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                }
            ]
        }
    ],
    paymentCurrencies: [
        {
            id: 'USD',
            payment_method_limits: [
                {
                    id: 'card',
                    min: '10.00',
                    max: '7500.00'
                },
                {
                    id: 'ach_bank_account',
                    min: '10.00',
                    max: '25000.00'
                }
            ]
        },
        {
            id: 'EUR',
            payment_method_limits: [
                {
                    id: 'card',
                    min: '10.00',
                    max: '7500.00'
                },
                {
                    id: 'ach_bank_account',
                    min: '10.00',
                    max: '25000.00'
                }
            ]
        }
    ]
};
// -- Helpers ------------------------------------------- //
const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getBlockchainApiUrl();
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    clientId: null,
    api: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
        baseUrl,
        clientId: null
    }),
    supportedChains: {
        http: [],
        ws: []
    }
});
const BlockchainApiController = {
    state,
    async isNetworkSupported (network) {
        if (!network) {
            return false;
        }
        try {
            if (!state.supportedChains.http.length) {
                await BlockchainApiController.getSupportedNetworks({
                    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
                });
            }
        } catch (e) {
            return false;
        }
        return state.supportedChains.http.includes(network);
    },
    async getSupportedNetworks ({ projectId }) {
        const supportedChains = await state.api.get({
            path: 'v1/supported-chains',
            params: {
                projectId
            }
        });
        state.supportedChains = supportedChains;
        return supportedChains;
    },
    async fetchIdentity ({ address }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                avatar: '',
                name: ''
            };
        }
        return state.api.get({
            path: `/v1/identity/${address}`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                sender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress) : undefined
            }
        });
    },
    async fetchTransactions ({ account, projectId, cursor, onramp, signal, cache, chainId }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                data: [],
                next: undefined
            };
        }
        return state.api.get({
            path: `/v1/account/${account}/history`,
            params: {
                projectId,
                cursor,
                onramp,
                chainId
            },
            signal,
            cache
        });
    },
    async fetchSwapQuote ({ projectId, amount, userAddress, from, to, gasPrice }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                quotes: []
            };
        }
        return state.api.get({
            path: `/v1/convert/quotes`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                projectId,
                amount,
                userAddress,
                from,
                to,
                gasPrice
            }
        });
    },
    async fetchSwapTokens ({ projectId, chainId }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                tokens: []
            };
        }
        return state.api.get({
            path: `/v1/convert/tokens`,
            params: {
                projectId,
                chainId
            }
        });
    },
    async fetchTokenPrice ({ projectId, addresses }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                fungibles: []
            };
        }
        return state.api.post({
            path: '/v1/fungible/price',
            body: {
                projectId,
                currency: 'usd',
                addresses
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    async fetchSwapAllowance ({ projectId, tokenAddress, userAddress }) {
        const { sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                allowance: '0'
            };
        }
        return state.api.get({
            path: `/v1/convert/allowance`,
            params: {
                projectId,
                tokenAddress,
                userAddress
            },
            headers: {
                'Content-Type': 'application/json',
                'x-sdk-type': sdkType,
                'x-sdk-version': sdkVersion || 'html-wagmi-4.2.2'
            }
        });
    },
    async fetchGasPrice ({ projectId, chainId }) {
        const { sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            throw new Error('Network not supported for Gas Price');
        }
        return state.api.get({
            path: `/v1/convert/gas-price`,
            headers: {
                'Content-Type': 'application/json',
                'x-sdk-type': sdkType,
                'x-sdk-version': sdkVersion || 'html-wagmi-4.2.2'
            },
            params: {
                projectId,
                chainId
            }
        });
    },
    async generateSwapCalldata ({ amount, from, projectId, to, userAddress }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            throw new Error('Network not supported for Swaps');
        }
        return state.api.post({
            path: '/v1/convert/build-transaction',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                amount,
                eip155: {
                    slippage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONVERT_SLIPPAGE_TOLERANCE
                },
                from,
                projectId,
                to,
                userAddress
            }
        });
    },
    async generateApproveCalldata ({ from, projectId, to, userAddress }) {
        const { sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            throw new Error('Network not supported for Swaps');
        }
        return state.api.get({
            path: `/v1/convert/build-approve`,
            headers: {
                'Content-Type': 'application/json',
                'x-sdk-type': sdkType,
                'x-sdk-version': sdkVersion || 'html-wagmi-4.2.2'
            },
            params: {
                projectId,
                userAddress,
                from,
                to
            }
        });
    },
    async getBalance (address, chainId, forceUpdate) {
        const { sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                balances: []
            };
        }
        return state.api.get({
            path: `/v1/account/${address}/balance`,
            headers: {
                'x-sdk-type': sdkType,
                'x-sdk-version': sdkVersion || 'html-wagmi-4.2.2'
            },
            params: {
                currency: 'usd',
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                chainId,
                forceUpdate
            }
        });
    },
    async lookupEnsName (name) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                addresses: {},
                attributes: []
            };
        }
        return state.api.get({
            path: `/v1/profile/account/${name}`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                apiVersion: '2'
            }
        });
    },
    async reverseLookupEnsName ({ address }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return [];
        }
        return state.api.get({
            path: `/v1/profile/reverse/${address}`,
            params: {
                sender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                apiVersion: '2'
            }
        });
    },
    async getEnsNameSuggestions (name) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                suggestions: []
            };
        }
        return state.api.get({
            path: `/v1/profile/suggestions/${name}`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                zone: 'reown.id'
            }
        });
    },
    async registerEnsName ({ coinType, address, message, signature }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                success: false
            };
        }
        return state.api.post({
            path: `/v1/profile/account`,
            body: {
                coin_type: coinType,
                address,
                message,
                signature
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    async generateOnRampURL ({ destinationWallets, partnerUserId, defaultNetwork, purchaseAmount, paymentAmount }) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return '';
        }
        const response = await state.api.post({
            path: `/v1/generators/onrampurl`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
            },
            body: {
                destinationWallets,
                defaultNetwork,
                partnerUserId,
                defaultExperience: 'buy',
                presetCryptoAmount: purchaseAmount,
                presetFiatAmount: paymentAmount
            }
        });
        return response.url;
    },
    async getOnrampOptions () {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                paymentCurrencies: [],
                purchaseCurrencies: []
            };
        }
        try {
            const response = await state.api.get({
                path: `/v1/onramp/options`,
                params: {
                    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
                }
            });
            return response;
        } catch (e) {
            return DEFAULT_OPTIONS;
        }
    },
    async getOnrampQuote ({ purchaseCurrency, paymentCurrency, amount, network }) {
        try {
            const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
            if (!isSupported) {
                return null;
            }
            const response = await state.api.post({
                path: `/v1/onramp/quote`,
                params: {
                    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
                },
                body: {
                    purchaseCurrency,
                    paymentCurrency,
                    amount,
                    network
                }
            });
            return response;
        } catch (e) {
            // Mocking response as 1:1 until endpoint is ready
            return {
                coinbaseFee: {
                    amount,
                    currency: paymentCurrency.id
                },
                networkFee: {
                    amount,
                    currency: paymentCurrency.id
                },
                paymentSubtotal: {
                    amount,
                    currency: paymentCurrency.id
                },
                paymentTotal: {
                    amount,
                    currency: paymentCurrency.id
                },
                purchaseAmount: {
                    amount,
                    currency: paymentCurrency.id
                },
                quoteId: 'mocked-quote-id'
            };
        }
    },
    async getSmartSessions (caipAddress) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return [];
        }
        return state.api.get({
            path: `/v1/sessions/${caipAddress}`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
            }
        });
    },
    async revokeSmartSession (address, pci, signature) {
        const isSupported = await BlockchainApiController.isNetworkSupported(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        if (!isSupported) {
            return {
                success: false
            };
        }
        return state.api.post({
            path: `/v1/sessions/${address}/revoke`,
            params: {
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
            },
            body: {
                pci,
                signature
            }
        });
    },
    setClientId (clientId) {
        state.clientId = clientId;
        state.api = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
            baseUrl,
            clientId
        });
    }
}; //# sourceMappingURL=BlockchainApiController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AlertController": (()=>AlertController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    message: '',
    variant: 'info',
    open: false
});
const AlertController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    open (message, variant) {
        const { debug } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const { shortMessage, longMessage } = message;
        if (debug) {
            state.message = shortMessage;
            state.variant = variant;
            state.open = true;
        }
        if (longMessage) {
            // eslint-disable-next-line no-console
            console.error(typeof longMessage === 'function' ? longMessage() : longMessage);
        }
    },
    close () {
        state.open = false;
        state.message = '';
        state.variant = 'info';
    }
}; //# sourceMappingURL=AlertController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EventsController": (()=>EventsController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
// -- Helpers ------------------------------------------- //
const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getAnalyticsUrl();
const api = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
    baseUrl,
    clientId: null
});
const excluded = [
    'MODAL_CREATED'
];
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    timestamp: Date.now(),
    reportedErrors: {},
    data: {
        type: 'track',
        event: 'MODAL_CREATED'
    }
});
const EventsController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    _getApiHeaders () {
        const { projectId, sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        return {
            'x-project-id': projectId,
            'x-sdk-type': sdkType,
            'x-sdk-version': sdkVersion || 'html-wagmi-4.2.2'
        };
    },
    async _sendAnalyticsEvent (payload) {
        try {
            const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
            if (excluded.includes(payload.data.event) || typeof window === 'undefined') {
                return;
            }
            await api.post({
                path: '/e',
                headers: EventsController._getApiHeaders(),
                body: {
                    eventId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getUUID(),
                    url: window.location.href,
                    domain: window.location.hostname,
                    timestamp: payload.timestamp,
                    props: {
                        ...payload.data,
                        address
                    }
                }
            });
            state.reportedErrors['FORBIDDEN'] = false;
        } catch (err) {
            const isForbiddenError = err instanceof Error && err.cause instanceof Response && err.cause.status === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].HTTP_STATUS_CODES.FORBIDDEN && !state.reportedErrors['FORBIDDEN'];
            if (isForbiddenError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open({
                    shortMessage: 'Invalid App Configuration',
                    longMessage: `Origin ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafe"])() ? window.origin : 'uknown'} not found on Allowlist - update configuration on cloud.reown.com`
                }, 'error');
                state.reportedErrors['FORBIDDEN'] = true;
            }
        }
    },
    sendEvent (data) {
        state.timestamp = Date.now();
        state.data = data;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.analytics) {
            EventsController._sendAnalyticsEvent(state);
        }
    }
}; //# sourceMappingURL=EventsController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/MobileWallet.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileWalletUtil": (()=>MobileWalletUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
;
;
const MobileWalletUtil = {
    /**
     * Handles mobile wallet redirection for wallets that have Universal Links.
     *
     * @param {Object} properties - The properties object.
     * @param {string} properties.name - The name of the wallet.
     */ handleSolanaDeeplinkRedirect (name) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA) {
            /**
             * Universal Links requires explicit user interaction to open the wallet app.
             * Previously we've been calling this with the life-cycle methods in the Solana clients by listening the SELECT_WALLET event of EventController.
             * But this breaks the UL functionality for some wallets like Phantom.
             */ const href = window.location.href;
            const encodedHref = encodeURIComponent(href);
            if (name === 'Phantom' && !('phantom' in window)) {
                const protocol = href.startsWith('https') ? 'https' : 'http';
                const host = href.split('/')[2];
                const encodedRef = encodeURIComponent(`${protocol}://${host}`);
                window.location.href = `https://phantom.app/ul/browse/${encodedHref}?ref=${encodedRef}`;
            }
            if (name === 'Coinbase Wallet' && !('coinbaseSolana' in window)) {
                window.location.href = `https://go.cb-w.com/dapp?cb_url=${encodedHref}`;
            }
        }
    }
}; //# sourceMappingURL=MobileWallet.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeController": (()=>ThemeController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    themeMode: 'dark',
    themeVariables: {},
    w3mThemeVariables: undefined
});
const ThemeController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    setThemeMode (themeMode) {
        state.themeMode = themeMode;
        try {
            const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
            if (authConnector) {
                const themeVariables = ThemeController.getSnapshot().themeVariables;
                authConnector.provider.syncTheme({
                    themeMode,
                    themeVariables,
                    w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(themeVariables, themeMode)
                });
            }
        } catch  {
            // eslint-disable-next-line no-console
            console.info('Unable to sync theme to auth connector');
        }
    },
    setThemeVariables (themeVariables) {
        state.themeVariables = {
            ...state.themeVariables,
            ...themeVariables
        };
        try {
            const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
            if (authConnector) {
                const themeVariablesSnapshot = ThemeController.getSnapshot().themeVariables;
                authConnector.provider.syncTheme({
                    themeVariables: themeVariablesSnapshot,
                    w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(state.themeVariables, state.themeMode)
                });
            }
        } catch  {
            // eslint-disable-next-line no-console
            console.info('Unable to sync theme to auth connector');
        }
    },
    getSnapshot () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(state);
    }
}; //# sourceMappingURL=ThemeController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ConnectorController": (()=>ConnectorController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/MobileWallet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    allConnectors: [],
    connectors: [],
    activeConnector: undefined,
    filterByNamespace: undefined
});
const ConnectorController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>{
            callback(state);
        });
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    setActiveConnector (connector) {
        if (connector) {
            state.activeConnector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(connector);
        }
    },
    setConnectors (connectors) {
        const newConnectors = connectors.filter((newConnector)=>!state.allConnectors.some((existingConnector)=>existingConnector.id === newConnector.id && this.getConnectorName(existingConnector.name) === this.getConnectorName(newConnector.name) && existingConnector.chain === newConnector.chain));
        /**
         * We are reassigning the state of the proxy to a new array of new objects, this can cause issues. So it is better to use ref in this case.
         * Check more about proxy on https://valtio.dev/docs/api/basic/proxy#Gotchas
         * Check more about ref on https://valtio.dev/docs/api/basic/ref
         */ newConnectors.forEach((connector)=>{
            if (connector.type !== 'MULTI_CHAIN') {
                state.allConnectors.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(connector));
            }
        });
        state.connectors = this.mergeMultiChainConnectors(state.allConnectors);
    },
    removeAdapter (namespace) {
        state.allConnectors = state.allConnectors.filter((connector)=>connector.chain !== namespace);
        state.connectors = this.mergeMultiChainConnectors(state.allConnectors);
    },
    mergeMultiChainConnectors (connectors) {
        const connectorsByNameMap = this.generateConnectorMapByName(connectors);
        const mergedConnectors = [];
        connectorsByNameMap.forEach((keyConnectors)=>{
            const firstItem = keyConnectors[0];
            const isAuthConnector = firstItem?.id === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
            if (keyConnectors.length > 1 && firstItem) {
                mergedConnectors.push({
                    name: firstItem.name,
                    imageUrl: firstItem.imageUrl,
                    imageId: firstItem.imageId,
                    connectors: [
                        ...keyConnectors
                    ],
                    type: isAuthConnector ? 'AUTH' : 'MULTI_CHAIN',
                    // These values are just placeholders, we don't use them in multi-chain connector select screen
                    chain: 'eip155',
                    id: firstItem?.id || ''
                });
            } else if (firstItem) {
                mergedConnectors.push(firstItem);
            }
        });
        return mergedConnectors;
    },
    generateConnectorMapByName (connectors) {
        const connectorsByNameMap = new Map();
        connectors.forEach((connector)=>{
            const { name } = connector;
            const connectorName = this.getConnectorName(name);
            if (!connectorName) {
                return;
            }
            const connectorsByName = connectorsByNameMap.get(connectorName) || [];
            const haveSameConnector = connectorsByName.find((c)=>c.chain === connector.chain);
            if (!haveSameConnector) {
                connectorsByName.push(connector);
            }
            connectorsByNameMap.set(connectorName, connectorsByName);
        });
        return connectorsByNameMap;
    },
    getConnectorName (name) {
        if (!name) {
            return name;
        }
        const nameOverrideMap = {
            'Trust Wallet': 'Trust'
        };
        return nameOverrideMap[name] || name;
    },
    getUniqueConnectorsByName (connectors) {
        const uniqueConnectors = [];
        connectors.forEach((c)=>{
            if (!uniqueConnectors.find((uc)=>uc.chain === c.chain)) {
                uniqueConnectors.push(c);
            }
        });
        return uniqueConnectors;
    },
    addConnector (connector) {
        if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
            const authConnector = connector;
            const optionsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state);
            const themeMode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeMode;
            const themeVariables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeVariables;
            authConnector?.provider?.syncDappData?.({
                metadata: optionsState.metadata,
                sdkVersion: optionsState.sdkVersion,
                projectId: optionsState.projectId,
                sdkType: optionsState.sdkType
            });
            authConnector?.provider?.syncTheme({
                themeMode,
                themeVariables,
                w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(themeVariables, themeMode)
            });
            this.setConnectors([
                connector
            ]);
        } else {
            this.setConnectors([
                connector
            ]);
        }
    },
    getAuthConnector () {
        const activeNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const authConnector = state.connectors.find((c)=>c.id === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH);
        if (!authConnector) {
            return undefined;
        }
        if (authConnector?.connectors?.length) {
            const connector = authConnector.connectors.find((c)=>c.chain === activeNamespace);
            return connector;
        }
        return authConnector;
    },
    getAnnouncedConnectorRdns () {
        return state.connectors.filter((c)=>c.type === 'ANNOUNCED').map((c)=>c.info?.rdns);
    },
    getConnector (id, rdns) {
        return state.connectors.find((c)=>c.explorerId === id || c.info?.rdns === rdns);
    },
    syncIfAuthConnector (connector) {
        if (connector.id !== 'ID_AUTH') {
            return;
        }
        const authConnector = connector;
        const optionsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state);
        const themeMode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeMode;
        const themeVariables = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot().themeVariables;
        authConnector?.provider?.syncDappData?.({
            metadata: optionsState.metadata,
            sdkVersion: optionsState.sdkVersion,
            sdkType: optionsState.sdkType,
            projectId: optionsState.projectId
        });
        authConnector.provider.syncTheme({
            themeMode,
            themeVariables,
            w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(themeVariables, themeMode)
        });
    },
    /**
     * Returns the connectors filtered by namespace.
     * @param namespace - The namespace to filter the connectors by.
     * @returns ConnectorWithProviders[].
     */ getConnectorsByNamespace (namespace) {
        const namespaceConnectors = state.allConnectors.filter((connector)=>connector.chain === namespace);
        return this.mergeMultiChainConnectors(namespaceConnectors);
    },
    selectWalletConnector (wallet) {
        const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$MobileWallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileWalletUtil"].handleSolanaDeeplinkRedirect(connector?.name || wallet.name || '');
        }
        if (connector) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('ConnectingExternal', {
                connector
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('ConnectingWalletConnect', {
                wallet
            });
        }
    },
    /**
     * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
     * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
     * @returns ConnectorWithProviders[].
     */ getConnectors (namespace) {
        if (namespace) {
            return this.getConnectorsByNamespace(namespace);
        }
        return this.mergeMultiChainConnectors(state.allConnectors);
    },
    /**
     * Sets the filter by namespace and updates the connectors.
     * @param namespace - The namespace to filter the connectors by.
     */ setFilterByNamespace (namespace) {
        state.filterByNamespace = namespace;
        state.connectors = this.getConnectors(namespace);
    },
    clearNamespaceFilter () {
        state.filterByNamespace = undefined;
        state.connectors = this.getConnectors();
    }
}; //# sourceMappingURL=ConnectorController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouterController": (()=>RouterController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    view: 'Connect',
    history: [
        'Connect'
    ],
    transactionStack: []
});
const RouterController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    pushTransactionStack (action) {
        state.transactionStack.push(action);
    },
    popTransactionStack (cancel) {
        const action = state.transactionStack.pop();
        if (!action) {
            return;
        }
        if (cancel) {
            // When the transaction is cancelled, we go back to the previous view
            this.goBack();
            action?.onCancel?.();
        } else {
            // When the transaction is successful, we do conditional navigation depending on the action properties
            if (action.goBack) {
                this.goBack();
            } else if (action.replace) {
                /*
                 *  If the history like ["ConnectingSiwe", "ApproveTransaction"], this means SIWE popup is opened after page rendered (not after user interaction)
                 *  we need to conditionally call replace.
                 *  There is a chance that there is only these two views in the history; when user approved, the modal should closed and history should be empty (both connectingsiwe and approveTX should be removed)
                 *  If there is another views before the ConnectingSiwe (if the CS is not the first view), we should back to the first view before CS.
                 */ const history = state.history;
                const connectingSiweIndex = history.indexOf('ConnectingSiwe');
                if (connectingSiweIndex > 0) {
                    // There are views before ConnectingSiwe
                    this.goBackToIndex(connectingSiweIndex - 1);
                } else {
                    // ConnectingSiwe is the first view
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
                    state.history = [];
                }
            } else if (action.view) {
                this.reset(action.view);
            }
            action?.onSuccess?.();
        }
    },
    push (view, data) {
        if (view !== state.view) {
            state.view = view;
            state.history.push(view);
            state.data = data;
        }
    },
    reset (view, data) {
        state.view = view;
        state.history = [
            view
        ];
        state.data = data;
    },
    replace (view, data) {
        const lastView = state.history.at(-1);
        const isSameView = lastView === view;
        if (!isSameView) {
            state.view = view;
            state.history[state.history.length - 1] = view;
            state.data = data;
        }
    },
    goBack () {
        const shouldReload = !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress && this.state.view === 'ConnectingFarcaster';
        if (state.history.length > 1 && !state.history.includes('UnsupportedChain')) {
            state.history.pop();
            const [last] = state.history.slice(-1);
            if (last) {
                state.view = last;
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
        // Reloading the iframe contentwindow and doing the view animation in the modal causes a small freeze in the transition. Doing these separately fixes that.
        setTimeout(()=>{
            if (shouldReload) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setFarcasterUrl(undefined, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
                authConnector?.provider?.reload();
                const optionsState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state);
                authConnector?.provider?.syncDappData?.({
                    metadata: optionsState.metadata,
                    sdkVersion: optionsState.sdkVersion,
                    projectId: optionsState.projectId,
                    sdkType: optionsState.sdkType
                });
            }
        }, 100);
    },
    goBackToIndex (historyIndex) {
        if (state.history.length > 1) {
            state.history = state.history.slice(0, historyIndex + 1);
            const [last] = state.history.slice(-1);
            if (last) {
                state.view = last;
            }
        }
    }
}; //# sourceMappingURL=RouterController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SnackController": (()=>SnackController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
;
;
;
// -- Constants ----------------------------------------- //
const DEFAULT_STATE = Object.freeze({
    message: '',
    variant: 'success',
    svg: undefined,
    open: false,
    autoClose: true
});
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    ...DEFAULT_STATE
});
const SnackController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    showLoading (message, options = {}) {
        this._showMessage({
            message,
            variant: 'loading',
            ...options
        });
    },
    showSuccess (message) {
        this._showMessage({
            message,
            variant: 'success'
        });
    },
    showSvg (message, svg) {
        this._showMessage({
            message,
            svg
        });
    },
    showError (message) {
        const errorMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].parseError(message);
        this._showMessage({
            message: errorMessage,
            variant: 'error'
        });
    },
    hide () {
        state.message = DEFAULT_STATE.message;
        state.variant = DEFAULT_STATE.variant;
        state.svg = DEFAULT_STATE.svg;
        state.open = DEFAULT_STATE.open;
        state.autoClose = DEFAULT_STATE.autoClose;
    },
    _showMessage ({ message, svg, variant = 'success', autoClose = DEFAULT_STATE.autoClose }) {
        if (state.open) {
            state.open = false;
            setTimeout(()=>{
                state.message = message;
                state.variant = variant;
                state.svg = svg;
                state.open = true;
                state.autoClose = autoClose;
            }, 150);
        } else {
            state.message = message;
            state.variant = variant;
            state.svg = svg;
            state.open = true;
            state.autoClose = autoClose;
        }
    }
}; //# sourceMappingURL=SnackController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SIWXUtil": (()=>SIWXUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$universal$2d$provider$40$2$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+universal-provider@2.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
const SIWXUtil = {
    getSIWX () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
    },
    async initializeIfEnabled () {
        const siwx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress();
        if (!(siwx && caipAddress)) {
            return;
        }
        const [namespace, chainId, address] = caipAddress.split(':');
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].checkIfSupportedNetwork(namespace)) {
            return;
        }
        try {
            const sessions = await siwx.getSessions(`${namespace}:${chainId}`, address);
            if (sessions.length) {
                return;
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                view: 'SIWXSignMessage'
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('SIWXUtil:initializeIfEnabled', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_ERROR',
                properties: this.getSIWXEventProperties()
            });
            // eslint-disable-next-line no-console
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]._getClient()?.disconnect().catch(console.error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Connect');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('A problem occurred while trying initialize authentication');
        }
    },
    async requestSignMessage () {
        const siwx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress());
        const network = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork();
        const client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]._getClient();
        if (!siwx) {
            throw new Error('SIWX is not enabled');
        }
        if (!address) {
            throw new Error('No ActiveCaipAddress found');
        }
        if (!network) {
            throw new Error('No ActiveCaipNetwork or client found');
        }
        if (!client) {
            throw new Error('No ConnectionController client found');
        }
        try {
            const siwxMessage = await siwx.createMessage({
                chainId: network.caipNetworkId,
                accountAddress: address
            });
            const message = siwxMessage.toString();
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(network.chainNamespace);
            if (connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
                    view: null,
                    goBack: false,
                    replace: true
                });
            }
            const signature = await client.signMessage(message);
            await siwx.addSession({
                data: siwxMessage,
                message,
                signature: signature
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_SUCCESS',
                properties: this.getSIWXEventProperties()
            });
        } catch (error) {
            const properties = this.getSIWXEventProperties();
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'ApproveTransaction') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
                    view: 'SIWXSignMessage'
                });
            }
            if (properties.isSmartAccount) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('This application might not support Smart Accounts');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Signature declined');
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SIWX_AUTH_ERROR',
                properties
            });
            // eslint-disable-next-line no-console
            console.error('SWIXUtil:requestSignMessage', error);
        }
    },
    async cancelSignMessage () {
        try {
            const siwx = this.getSIWX();
            const required = siwx?.getRequired?.();
            if (required) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Connect');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                event: 'CLICK_CANCEL_SIWX',
                type: 'track',
                properties: this.getSIWXEventProperties()
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('SIWXUtil:cancelSignMessage', error);
        }
    },
    async getSessions () {
        const siwx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.siwx;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipAddress());
        const network = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork();
        if (!(siwx && address && network)) {
            return [];
        }
        return siwx.getSessions(network.caipNetworkId, address);
    },
    async isSIWXCloseDisabled () {
        const siwx = this.getSIWX();
        if (siwx) {
            const isApproveSignScreen = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'ApproveTransaction';
            const isSiwxSignMessage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'SIWXSignMessage';
            if (isApproveSignScreen || isSiwxSignMessage) {
                return siwx.getRequired?.() && (await this.getSessions()).length === 0;
            }
        }
        return false;
    },
    async universalProviderAuthenticate ({ universalProvider, chains, methods }) {
        const siwx = SIWXUtil.getSIWX();
        const namespaces = new Set(chains.map((chain)=>chain.split(':')[0]));
        if (!siwx || namespaces.size !== 1 || !namespaces.has('eip155')) {
            return false;
        }
        // Ignores chainId and account address to get other message data
        const siwxMessage = await siwx.createMessage({
            chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveCaipNetwork()?.caipNetworkId || '',
            accountAddress: ''
        });
        const result = await universalProvider.authenticate({
            nonce: siwxMessage.nonce,
            domain: siwxMessage.domain,
            uri: siwxMessage.uri,
            exp: siwxMessage.expirationTime,
            iat: siwxMessage.issuedAt,
            nbf: siwxMessage.notBefore,
            requestId: siwxMessage.requestId,
            version: siwxMessage.version,
            resources: siwxMessage.resources,
            statement: siwxMessage.statement,
            chainId: siwxMessage.chainId,
            methods,
            // The first chainId is what is used for universal provider to build the message
            chains: [
                siwxMessage.chainId,
                ...chains.filter((chain)=>chain !== siwxMessage.chainId)
            ]
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showLoading('Authenticating...', {
            autoClose: false
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setConnectedWalletInfo({
            ...result.session.peer.metadata,
            name: result.session.peer.metadata.name,
            icon: result.session.peer.metadata.icons?.[0]
        }, Array.from(namespaces)[0]);
        if (result?.auths?.length) {
            const sessions = result.auths.map((cacao)=>{
                const message = universalProvider.client.formatAuthMessage({
                    request: cacao.p,
                    iss: cacao.p.iss
                });
                return {
                    data: {
                        ...cacao.p,
                        accountAddress: cacao.p.iss.split(':').slice(-1).join(''),
                        chainId: cacao.p.iss.split(':').slice(2, 4).join(':'),
                        uri: cacao.p.aud,
                        version: cacao.p.version || siwxMessage.version,
                        expirationTime: cacao.p.exp,
                        issuedAt: cacao.p.iat,
                        notBefore: cacao.p.nbf
                    },
                    message,
                    signature: cacao.s.s,
                    cacao
                };
            });
            try {
                await siwx.setSessions(sessions);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                    type: 'track',
                    event: 'SIWX_AUTH_SUCCESS',
                    properties: SIWXUtil.getSIWXEventProperties()
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('SIWX:universalProviderAuth - failed to set sessions', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                    type: 'track',
                    event: 'SIWX_AUTH_ERROR',
                    properties: SIWXUtil.getSIWXEventProperties()
                });
                // eslint-disable-next-line no-console
                await universalProvider.disconnect().catch(console.error);
                throw error;
            } finally{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].hide();
            }
        }
        return true;
    },
    getSIWXEventProperties () {
        return {
            network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
            isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
        };
    },
    async clearSessions () {
        const siwx = this.getSIWX();
        if (siwx) {
            await siwx.setSessions([]);
        }
    }
}; //# sourceMappingURL=SIWXUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/TransactionsController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TransactionsController": (()=>TransactionsController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    transactions: [],
    coinbaseTransactions: {},
    transactionsByYear: {},
    lastNetworkInView: undefined,
    loading: false,
    empty: false,
    next: undefined
});
const TransactionsController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    setLastNetworkInView (lastNetworkInView) {
        state.lastNetworkInView = lastNetworkInView;
    },
    async fetchTransactions (accountAddress, onramp) {
        const { projectId } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        if (!projectId || !accountAddress) {
            throw new Error("Transactions can't be fetched without a projectId and an accountAddress");
        }
        state.loading = true;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchTransactions({
                account: accountAddress,
                projectId,
                cursor: state.next,
                onramp,
                // Coinbase transaction history state updates require the latest data
                cache: onramp === 'coinbase' ? 'no-cache' : undefined,
                chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId
            });
            const nonSpamTransactions = this.filterSpamTransactions(response.data);
            const sameChainTransactions = this.filterByConnectedChain(nonSpamTransactions);
            const filteredTransactions = [
                ...state.transactions,
                ...sameChainTransactions
            ];
            state.loading = false;
            if (onramp === 'coinbase') {
                state.coinbaseTransactions = this.groupTransactionsByYearAndMonth(state.coinbaseTransactions, response.data);
            } else {
                state.transactions = filteredTransactions;
                state.transactionsByYear = this.groupTransactionsByYearAndMonth(state.transactionsByYear, sameChainTransactions);
            }
            state.empty = filteredTransactions.length === 0;
            state.next = response.next ? response.next : undefined;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'ERROR_FETCH_TRANSACTIONS',
                properties: {
                    address: accountAddress,
                    projectId,
                    cursor: state.next,
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to fetch transactions');
            state.loading = false;
            state.empty = true;
            state.next = undefined;
        }
    },
    groupTransactionsByYearAndMonth (transactionsMap = {}, transactions = []) {
        const grouped = transactionsMap;
        transactions.forEach((transaction)=>{
            const year = new Date(transaction.metadata.minedAt).getFullYear();
            const month = new Date(transaction.metadata.minedAt).getMonth();
            const yearTransactions = grouped[year] ?? {};
            const monthTransactions = yearTransactions[month] ?? [];
            // If there's a transaction with the same id, remove the old one
            const newMonthTransactions = monthTransactions.filter((tx)=>tx.id !== transaction.id);
            grouped[year] = {
                ...yearTransactions,
                [month]: [
                    ...newMonthTransactions,
                    transaction
                ].sort((a, b)=>new Date(b.metadata.minedAt).getTime() - new Date(a.metadata.minedAt).getTime())
            };
        });
        return grouped;
    },
    filterSpamTransactions (transactions) {
        return transactions.filter((transaction)=>{
            const isAllSpam = transaction.transfers.every((transfer)=>transfer.nft_info?.flags.is_spam === true);
            return !isAllSpam;
        });
    },
    filterByConnectedChain (transactions) {
        const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId;
        const filteredTransactions = transactions.filter((transaction)=>transaction.metadata.chain === chainId);
        return filteredTransactions;
    },
    clearCursor () {
        state.next = undefined;
    },
    resetTransactions () {
        state.transactions = [];
        state.transactionsByYear = {};
        state.lastNetworkInView = undefined;
        state.loading = false;
        state.empty = false;
        state.next = undefined;
    }
}; //# sourceMappingURL=TransactionsController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ConnectionController": (()=>ConnectionController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$TransactionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/TransactionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    wcError: false,
    buffering: false,
    status: 'disconnected'
});
// eslint-disable-next-line init-declarations
let wcConnectionPromise;
const ConnectionController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    _getClient () {
        return state._client;
    },
    setClient (client) {
        state._client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(client);
    },
    async connectWalletConnect () {
        // Connect all namespaces to WalletConnect
        const namespaces = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys()
        ];
        namespaces.forEach((namespace)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedConnectorId(namespace, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT);
        });
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isTelegram() || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isSafari() && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isIos()) {
            if (wcConnectionPromise) {
                await wcConnectionPromise;
                wcConnectionPromise = undefined;
                return;
            }
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isPairingExpired(state?.wcPairingExpiry)) {
                const link = state.wcUri;
                state.wcUri = link;
                return;
            }
            wcConnectionPromise = this._getClient()?.connectWalletConnect?.().catch(()=>undefined);
            this.state.status = 'connecting';
            await wcConnectionPromise;
            wcConnectionPromise = undefined;
            state.wcPairingExpiry = undefined;
            this.state.status = 'connected';
        } else {
            await this._getClient()?.connectWalletConnect?.();
        }
    },
    async connectExternal (options, chain, setChain = true) {
        await this._getClient()?.connectExternal?.(options);
        if (setChain) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveNamespace(chain);
        }
    },
    async reconnectExternal (options) {
        await this._getClient()?.reconnectExternal?.(options);
        const namespace = options.chain || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        if (namespace) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedConnectorId(namespace, options.id);
        }
    },
    async setPreferredAccountType (accountType) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(true);
        const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
        if (!authConnector) {
            return;
        }
        await authConnector?.provider.setPreferredAccount(accountType);
        await this.reconnectExternal(authConnector);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'SET_PREFERRED_ACCOUNT_TYPE',
            properties: {
                accountType,
                network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
            }
        });
    },
    async signMessage (message) {
        return this._getClient()?.signMessage(message);
    },
    parseUnits (value, decimals) {
        return this._getClient()?.parseUnits(value, decimals);
    },
    formatUnits (value, decimals) {
        return this._getClient()?.formatUnits(value, decimals);
    },
    async sendTransaction (args) {
        return this._getClient()?.sendTransaction(args);
    },
    async getCapabilities (params) {
        return this._getClient()?.getCapabilities(params);
    },
    async grantPermissions (params) {
        return this._getClient()?.grantPermissions(params);
    },
    async estimateGas (args) {
        return this._getClient()?.estimateGas(args);
    },
    async writeContract (args) {
        return this._getClient()?.writeContract(args);
    },
    async getEnsAddress (value) {
        return this._getClient()?.getEnsAddress(value);
    },
    async getEnsAvatar (value) {
        return this._getClient()?.getEnsAvatar(value);
    },
    checkInstalled (ids) {
        return this._getClient()?.checkInstalled?.(ids) || false;
    },
    resetWcConnection () {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        state.wcLinking = undefined;
        state.recentWallet = undefined;
        state.status = 'disconnected';
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$TransactionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionsController"].resetTransactions();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteWalletConnectDeepLink();
    },
    setUri (uri) {
        state.wcUri = uri;
        state.wcPairingExpiry = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPairingExpiry();
    },
    setWcLinking (wcLinking) {
        state.wcLinking = wcLinking;
    },
    setWcError (wcError) {
        state.wcError = wcError;
        state.buffering = false;
    },
    setRecentWallet (wallet) {
        state.recentWallet = wallet;
    },
    setBuffering (buffering) {
        state.buffering = buffering;
    },
    setStatus (status) {
        state.status = status;
    },
    async disconnect () {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].clearSessions();
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].disconnect();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(false);
        } catch (error) {
            throw new Error('Failed to disconnect');
        }
    }
}; //# sourceMappingURL=ConnectionController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SwapApiUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SwapApiUtil": (()=>SwapApiUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
const SwapApiUtil = {
    async getTokenList () {
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchSwapTokens({
            chainId: caipNetwork?.caipNetworkId,
            projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId
        });
        const tokens = response?.tokens?.map((token)=>({
                ...token,
                eip2612: false,
                quantity: {
                    decimals: '0',
                    numeric: '0'
                },
                price: 0,
                value: 0
            })) || [];
        return tokens;
    },
    async fetchGasPrice () {
        const projectId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId;
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        if (!caipNetwork) {
            return null;
        }
        try {
            switch(caipNetwork.chainNamespace){
                case 'solana':
                    // eslint-disable-next-line no-case-declarations
                    const lamportsPerSignature = (await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"]?.estimateGas({
                        chainNamespace: 'solana'
                    }))?.toString();
                    return {
                        standard: lamportsPerSignature,
                        fast: lamportsPerSignature,
                        instant: lamportsPerSignature
                    };
                case 'eip155':
                default:
                    return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchGasPrice({
                        projectId,
                        chainId: caipNetwork.caipNetworkId
                    });
            }
        } catch  {
            return null;
        }
    },
    async fetchSwapAllowance ({ tokenAddress, userAddress, sourceTokenAmount, sourceTokenDecimals }) {
        const projectId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchSwapAllowance({
            projectId,
            tokenAddress,
            userAddress
        });
        if (response?.allowance && sourceTokenAmount && sourceTokenDecimals) {
            const parsedValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(sourceTokenAmount, sourceTokenDecimals) || 0;
            const hasAllowance = BigInt(response.allowance) >= parsedValue;
            return hasAllowance;
        }
        return false;
    },
    async getMyTokensWithBalance (forceUpdate) {
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        if (!address || !caipNetwork) {
            return [];
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getBalance(address, caipNetwork.caipNetworkId, forceUpdate);
        const balances = response.balances.filter((balance)=>balance.quantity.decimals !== '0');
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setTokenBalance(balances, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        return this.mapBalancesToSwapTokens(balances);
    },
    mapBalancesToSwapTokens (balances) {
        return balances?.map((token)=>({
                ...token,
                address: token?.address ? token.address : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveNetworkTokenAddress(),
                decimals: parseInt(token.quantity.decimals, 10),
                logoUri: token.iconUrl,
                eip2612: false
            })) || [];
    }
}; //# sourceMappingURL=SwapApiUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SwapCalculationUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
// -- Types --------------------------------------------- //
__turbopack_context__.s({
    "SwapCalculationUtil": (()=>SwapCalculationUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js [app-client] (ecmascript)");
;
const SwapCalculationUtil = {
    getGasPriceInEther (gas, gasPrice) {
        const totalGasCostInWei = gasPrice * gas;
        const totalGasCostInEther = Number(totalGasCostInWei) / 1e18;
        return totalGasCostInEther;
    },
    getGasPriceInUSD (networkPrice, gas, gasPrice) {
        const totalGasCostInEther = SwapCalculationUtil.getGasPriceInEther(gas, gasPrice);
        const networkPriceInUSD = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(networkPrice);
        const gasCostInUSD = networkPriceInUSD.times(totalGasCostInEther);
        return gasCostInUSD.toNumber();
    },
    getPriceImpact ({ sourceTokenAmount, sourceTokenPriceInUSD, toTokenPriceInUSD, toTokenAmount }) {
        const inputValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(sourceTokenAmount).times(sourceTokenPriceInUSD);
        const outputValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(toTokenAmount).times(toTokenPriceInUSD);
        const priceImpact = inputValue.minus(outputValue).div(inputValue).times(100);
        return priceImpact.toNumber();
    },
    getMaxSlippage (slippage, toTokenAmount) {
        const slippageToleranceDecimal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(slippage).div(100);
        const maxSlippageAmount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].multiply(toTokenAmount, slippageToleranceDecimal);
        return maxSlippageAmount.toNumber();
    },
    getProviderFee (sourceTokenAmount, feePercentage = 0.0085) {
        const providerFee = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(sourceTokenAmount).times(feePercentage);
        return providerFee.toString();
    },
    isInsufficientNetworkTokenForGas (networkBalanceInUSD, gasPriceInUSD) {
        const gasPrice = gasPriceInUSD || '0';
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(networkBalanceInUSD).eq(0)) {
            return true;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(gasPrice)).gt(networkBalanceInUSD);
    },
    isInsufficientSourceTokenForSwap (sourceTokenAmount, sourceTokenAddress, balance) {
        const sourceTokenBalance = balance?.find((token)=>token.address === sourceTokenAddress)?.quantity?.numeric;
        const isInSufficientBalance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(sourceTokenBalance || '0').lt(sourceTokenAmount);
        return isInSufficientBalance;
    },
    getToTokenAmount ({ sourceToken, toToken, sourceTokenPrice, toTokenPrice, sourceTokenAmount }) {
        if (sourceTokenAmount === '0') {
            return '0';
        }
        if (!sourceToken || !toToken) {
            return '0';
        }
        const sourceTokenDecimals = sourceToken.decimals;
        const sourceTokenPriceInUSD = sourceTokenPrice;
        const toTokenDecimals = toToken.decimals;
        const toTokenPriceInUSD = toTokenPrice;
        if (toTokenPriceInUSD <= 0) {
            return '0';
        }
        // Calculate the provider fee (0.85% of the source token amount)
        const providerFee = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(sourceTokenAmount).times(0.0085);
        // Adjust the source token amount by subtracting the provider fee
        const adjustedSourceTokenAmount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(sourceTokenAmount).minus(providerFee);
        // Proceed with conversion using the adjusted source token amount
        const sourceAmountInSmallestUnit = adjustedSourceTokenAmount.times(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(10).pow(sourceTokenDecimals));
        const priceRatio = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(sourceTokenPriceInUSD).div(toTokenPriceInUSD);
        const decimalDifference = sourceTokenDecimals - toTokenDecimals;
        const toTokenAmountInSmallestUnit = sourceAmountInSmallestUnit.times(priceRatio).div(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(10).pow(decimalDifference));
        const toTokenAmount = toTokenAmountInSmallestUnit.div(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(10).pow(toTokenDecimals));
        const amount = toTokenAmount.toFixed(toTokenDecimals).toString();
        return amount;
    }
}; //# sourceMappingURL=SwapCalculationUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SwapController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "INITIAL_GAS_LIMIT": (()=>INITIAL_GAS_LIMIT),
    "SwapController": (()=>SwapController),
    "TO_AMOUNT_DECIMALS": (()=>TO_AMOUNT_DECIMALS)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SwapApiUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SwapCalculationUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const INITIAL_GAS_LIMIT = 150000;
const TO_AMOUNT_DECIMALS = 6;
class TransactionError extends Error {
    constructor(message, shortMessage){
        super(message);
        this.name = 'TransactionError';
        this.shortMessage = shortMessage;
    }
}
// -- State --------------------------------------------- //
const initialState = {
    // Loading states
    initializing: false,
    initialized: false,
    loadingPrices: false,
    loadingQuote: false,
    loadingApprovalTransaction: false,
    loadingBuildTransaction: false,
    loadingTransaction: false,
    // Error states
    fetchError: false,
    // Approval & Swap transaction states
    approvalTransaction: undefined,
    swapTransaction: undefined,
    transactionError: undefined,
    // Input values
    sourceToken: undefined,
    sourceTokenAmount: '',
    sourceTokenPriceInUSD: 0,
    toToken: undefined,
    toTokenAmount: '',
    toTokenPriceInUSD: 0,
    networkPrice: '0',
    networkBalanceInUSD: '0',
    networkTokenSymbol: '',
    inputError: undefined,
    // Request values
    slippage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONVERT_SLIPPAGE_TOLERANCE,
    // Tokens
    tokens: undefined,
    popularTokens: undefined,
    suggestedTokens: undefined,
    foundTokens: undefined,
    myTokensWithBalance: undefined,
    tokensPriceMap: {},
    // Calculations
    gasFee: '0',
    gasPriceInUSD: 0,
    priceImpact: undefined,
    maxSlippage: undefined,
    providerFee: undefined
};
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])(initialState);
const SwapController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    getParams () {
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress);
        const networkAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveNetworkTokenAddress();
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(namespace);
        if (!address) {
            throw new Error('No address found to swap the tokens from.');
        }
        const invalidToToken = !state.toToken?.address || !state.toToken?.decimals;
        const invalidSourceToken = !state.sourceToken?.address || !state.sourceToken?.decimals || !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(state.sourceTokenAmount).gt(0);
        const invalidSourceTokenAmount = !state.sourceTokenAmount;
        return {
            networkAddress,
            fromAddress: address,
            fromCaipAddress: caipAddress,
            sourceTokenAddress: state.sourceToken?.address,
            toTokenAddress: state.toToken?.address,
            toTokenAmount: state.toTokenAmount,
            toTokenDecimals: state.toToken?.decimals,
            sourceTokenAmount: state.sourceTokenAmount,
            sourceTokenDecimals: state.sourceToken?.decimals,
            invalidToToken,
            invalidSourceToken,
            invalidSourceTokenAmount,
            availableToSwap: caipAddress && !invalidToToken && !invalidSourceToken && !invalidSourceTokenAmount,
            isAuthConnector: connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH
        };
    },
    setSourceToken (sourceToken) {
        if (!sourceToken) {
            state.sourceToken = sourceToken;
            state.sourceTokenAmount = '';
            state.sourceTokenPriceInUSD = 0;
            return;
        }
        state.sourceToken = sourceToken;
        this.setTokenPrice(sourceToken.address, 'sourceToken');
    },
    setSourceTokenAmount (amount) {
        state.sourceTokenAmount = amount;
    },
    setToToken (toToken) {
        if (!toToken) {
            state.toToken = toToken;
            state.toTokenAmount = '';
            state.toTokenPriceInUSD = 0;
            return;
        }
        state.toToken = toToken;
        this.setTokenPrice(toToken.address, 'toToken');
    },
    setToTokenAmount (amount) {
        state.toTokenAmount = amount ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].formatNumberToLocalString(amount, TO_AMOUNT_DECIMALS) : '';
    },
    async setTokenPrice (address, target) {
        let price = state.tokensPriceMap[address] || 0;
        if (!price) {
            state.loadingPrices = true;
            price = await this.getAddressPrice(address);
        }
        if (target === 'sourceToken') {
            state.sourceTokenPriceInUSD = price;
        } else if (target === 'toToken') {
            state.toTokenPriceInUSD = price;
        }
        if (state.loadingPrices) {
            state.loadingPrices = false;
        }
        if (this.getParams().availableToSwap) {
            this.swapTokens();
        }
    },
    switchTokens () {
        if (state.initializing || !state.initialized) {
            return;
        }
        const newSourceToken = state.toToken ? {
            ...state.toToken
        } : undefined;
        const newToToken = state.sourceToken ? {
            ...state.sourceToken
        } : undefined;
        const newSourceTokenAmount = newSourceToken && state.toTokenAmount === '' ? '1' : state.toTokenAmount;
        this.setSourceToken(newSourceToken);
        this.setToToken(newToToken);
        this.setSourceTokenAmount(newSourceTokenAmount);
        this.setToTokenAmount('');
        this.swapTokens();
    },
    resetState () {
        state.myTokensWithBalance = initialState.myTokensWithBalance;
        state.tokensPriceMap = initialState.tokensPriceMap;
        state.initialized = initialState.initialized;
        state.sourceToken = initialState.sourceToken;
        state.sourceTokenAmount = initialState.sourceTokenAmount;
        state.sourceTokenPriceInUSD = initialState.sourceTokenPriceInUSD;
        state.toToken = initialState.toToken;
        state.toTokenAmount = initialState.toTokenAmount;
        state.toTokenPriceInUSD = initialState.toTokenPriceInUSD;
        state.networkPrice = initialState.networkPrice;
        state.networkTokenSymbol = initialState.networkTokenSymbol;
        state.networkBalanceInUSD = initialState.networkBalanceInUSD;
        state.inputError = initialState.inputError;
    },
    resetValues () {
        const { networkAddress } = this.getParams();
        const networkToken = state.tokens?.find((token)=>token.address === networkAddress);
        this.setSourceToken(networkToken);
        this.setToToken(undefined);
    },
    getApprovalLoadingState () {
        return state.loadingApprovalTransaction;
    },
    clearError () {
        state.transactionError = undefined;
    },
    async initializeState () {
        if (state.initializing) {
            return;
        }
        state.initializing = true;
        if (!state.initialized) {
            try {
                await this.fetchTokens();
                state.initialized = true;
            } catch (error) {
                state.initialized = false;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to initialize swap');
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
            }
        }
        state.initializing = false;
    },
    async fetchTokens () {
        const { networkAddress } = this.getParams();
        await this.getTokenList();
        await this.getNetworkTokenPrice();
        await this.getMyTokensWithBalance();
        const networkToken = state.tokens?.find((token)=>token.address === networkAddress);
        if (networkToken) {
            state.networkTokenSymbol = networkToken.symbol;
            this.setSourceToken(networkToken);
            this.setSourceTokenAmount('1');
        }
    },
    async getTokenList () {
        const tokens = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].getTokenList();
        state.tokens = tokens;
        state.popularTokens = tokens.sort((aTokenInfo, bTokenInfo)=>{
            if (aTokenInfo.symbol < bTokenInfo.symbol) {
                return -1;
            }
            if (aTokenInfo.symbol > bTokenInfo.symbol) {
                return 1;
            }
            return 0;
        });
        state.suggestedTokens = tokens.filter((token)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].SWAP_SUGGESTED_TOKENS.includes(token.symbol)) {
                return true;
            }
            return false;
        }, {});
    },
    async getAddressPrice (address) {
        const existPrice = state.tokensPriceMap[address];
        if (existPrice) {
            return existPrice;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchTokenPrice({
            projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
            addresses: [
                address
            ]
        });
        const fungibles = response?.fungibles || [];
        const allTokens = [
            ...state.tokens || [],
            ...state.myTokensWithBalance || []
        ];
        const symbol = allTokens?.find((token)=>token.address === address)?.symbol;
        const price = fungibles.find((p)=>p.symbol.toLowerCase() === symbol?.toLowerCase())?.price || 0;
        const priceAsFloat = parseFloat(price.toString());
        state.tokensPriceMap[address] = priceAsFloat;
        return priceAsFloat;
    },
    async getNetworkTokenPrice () {
        const { networkAddress } = this.getParams();
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchTokenPrice({
            projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
            addresses: [
                networkAddress
            ]
        }).catch(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to fetch network token price');
            return {
                fungibles: []
            };
        });
        const token = response.fungibles?.[0];
        const price = token?.price.toString() || '0';
        state.tokensPriceMap[networkAddress] = parseFloat(price);
        state.networkTokenSymbol = token?.symbol || '';
        state.networkPrice = price;
    },
    async getMyTokensWithBalance (forceUpdate) {
        const balances = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].getMyTokensWithBalance(forceUpdate);
        if (!balances) {
            return;
        }
        await this.getInitialGasPrice();
        this.setBalances(balances);
    },
    setBalances (balances) {
        const { networkAddress } = this.getParams();
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        if (!caipNetwork) {
            return;
        }
        const networkToken = balances.find((token)=>token.address === networkAddress);
        balances.forEach((token)=>{
            state.tokensPriceMap[token.address] = token.price || 0;
        });
        state.myTokensWithBalance = balances.filter((token)=>token.address.startsWith(caipNetwork.caipNetworkId));
        state.networkBalanceInUSD = networkToken ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].multiply(networkToken.quantity.numeric, networkToken.price).toString() : '0';
    },
    async getInitialGasPrice () {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].fetchGasPrice();
        if (!res) {
            return {
                gasPrice: null,
                gasPriceInUSD: null
            };
        }
        switch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state?.activeCaipNetwork?.chainNamespace){
            case 'solana':
                state.gasFee = res.standard ?? '0';
                state.gasPriceInUSD = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].multiply(res.standard, state.networkPrice).div(1e9).toNumber();
                return {
                    gasPrice: BigInt(state.gasFee),
                    gasPriceInUSD: Number(state.gasPriceInUSD)
                };
            case 'eip155':
            default:
                // eslint-disable-next-line no-case-declarations
                const value = res.standard ?? '0';
                // eslint-disable-next-line no-case-declarations
                const gasFee = BigInt(value);
                // eslint-disable-next-line no-case-declarations
                const gasLimit = BigInt(INITIAL_GAS_LIMIT);
                // eslint-disable-next-line no-case-declarations
                const gasPrice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].getGasPriceInUSD(state.networkPrice, gasLimit, gasFee);
                state.gasFee = value;
                state.gasPriceInUSD = gasPrice;
                return {
                    gasPrice: gasFee,
                    gasPriceInUSD: gasPrice
                };
        }
    },
    // -- Swap -------------------------------------- //
    async swapTokens () {
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
        const sourceToken = state.sourceToken;
        const toToken = state.toToken;
        const haveSourceTokenAmount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(state.sourceTokenAmount).gt(0);
        if (!toToken || !sourceToken || state.loadingPrices || !haveSourceTokenAmount) {
            return;
        }
        state.loadingQuote = true;
        const amountDecimal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(state.sourceTokenAmount).times(10 ** sourceToken.decimals).round(0);
        try {
            const quoteResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchSwapQuote({
                userAddress: address,
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                from: sourceToken.address,
                to: toToken.address,
                gasPrice: state.gasFee,
                amount: amountDecimal.toString()
            });
            state.loadingQuote = false;
            const quoteToAmount = quoteResponse?.quotes?.[0]?.toAmount;
            if (!quoteToAmount) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open({
                    shortMessage: 'Incorrect amount',
                    longMessage: 'Please enter a valid amount'
                }, 'error');
                return;
            }
            const toTokenAmount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(quoteToAmount).div(10 ** toToken.decimals).toString();
            this.setToTokenAmount(toTokenAmount);
            const isInsufficientToken = this.hasInsufficientToken(state.sourceTokenAmount, sourceToken.address);
            if (isInsufficientToken) {
                state.inputError = 'Insufficient balance';
            } else {
                state.inputError = undefined;
                this.setTransactionDetails();
            }
        } catch (error) {
            state.loadingQuote = false;
            state.inputError = 'Insufficient balance';
        }
    },
    // -- Create Transactions -------------------------------------- //
    async getTransaction () {
        const { fromCaipAddress, availableToSwap } = this.getParams();
        const sourceToken = state.sourceToken;
        const toToken = state.toToken;
        if (!fromCaipAddress || !availableToSwap || !sourceToken || !toToken || state.loadingQuote) {
            return undefined;
        }
        try {
            state.loadingBuildTransaction = true;
            const hasAllowance = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].fetchSwapAllowance({
                userAddress: fromCaipAddress,
                tokenAddress: sourceToken.address,
                sourceTokenAmount: state.sourceTokenAmount,
                sourceTokenDecimals: sourceToken.decimals
            });
            let transaction = undefined;
            if (hasAllowance) {
                transaction = await this.createSwapTransaction();
            } else {
                transaction = await this.createAllowanceTransaction();
            }
            state.loadingBuildTransaction = false;
            state.fetchError = false;
            return transaction;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to check allowance');
            state.loadingBuildTransaction = false;
            state.approvalTransaction = undefined;
            state.swapTransaction = undefined;
            state.fetchError = true;
            return undefined;
        }
    },
    async createAllowanceTransaction () {
        const { fromCaipAddress, fromAddress, sourceTokenAddress, toTokenAddress } = this.getParams();
        if (!fromCaipAddress || !toTokenAddress) {
            return undefined;
        }
        if (!sourceTokenAddress) {
            throw new Error('createAllowanceTransaction - No source token address found.');
        }
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].generateApproveCalldata({
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                from: sourceTokenAddress,
                to: toTokenAddress,
                userAddress: fromCaipAddress
            });
            const gasLimit = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].estimateGas({
                address: fromAddress,
                to: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(response.tx.to),
                data: response.tx.data
            });
            const transaction = {
                data: response.tx.data,
                to: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(response.tx.from),
                gas: gasLimit,
                gasPrice: BigInt(response.tx.eip155.gasPrice),
                value: BigInt(response.tx.value),
                toAmount: state.toTokenAmount
            };
            state.swapTransaction = undefined;
            state.approvalTransaction = {
                data: transaction.data,
                to: transaction.to,
                gas: transaction.gas ?? BigInt(0),
                gasPrice: transaction.gasPrice,
                value: transaction.value,
                toAmount: transaction.toAmount
            };
            return {
                data: transaction.data,
                to: transaction.to,
                gas: transaction.gas ?? BigInt(0),
                gasPrice: transaction.gasPrice,
                value: transaction.value,
                toAmount: transaction.toAmount
            };
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to create approval transaction');
            state.approvalTransaction = undefined;
            state.swapTransaction = undefined;
            state.fetchError = true;
            return undefined;
        }
    },
    async createSwapTransaction () {
        const { networkAddress, fromCaipAddress, sourceTokenAmount } = this.getParams();
        const sourceToken = state.sourceToken;
        const toToken = state.toToken;
        if (!fromCaipAddress || !sourceTokenAmount || !sourceToken || !toToken) {
            return undefined;
        }
        const amount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(sourceTokenAmount, sourceToken.decimals)?.toString();
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].generateSwapCalldata({
                projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.projectId,
                userAddress: fromCaipAddress,
                from: sourceToken.address,
                to: toToken.address,
                amount: amount
            });
            const isSourceTokenIsNetworkToken = sourceToken.address === networkAddress;
            const gas = BigInt(response.tx.eip155.gas);
            const gasPrice = BigInt(response.tx.eip155.gasPrice);
            const transaction = {
                data: response.tx.data,
                to: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(response.tx.to),
                gas,
                gasPrice,
                value: isSourceTokenIsNetworkToken ? BigInt(amount ?? '0') : BigInt('0'),
                toAmount: state.toTokenAmount
            };
            state.gasPriceInUSD = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].getGasPriceInUSD(state.networkPrice, gas, gasPrice);
            state.approvalTransaction = undefined;
            state.swapTransaction = transaction;
            return transaction;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to create transaction');
            state.approvalTransaction = undefined;
            state.swapTransaction = undefined;
            state.fetchError = true;
            return undefined;
        }
    },
    // -- Send Transactions --------------------------------- //
    async sendTransactionForApproval (data) {
        const { fromAddress, isAuthConnector } = this.getParams();
        state.loadingApprovalTransaction = true;
        const approveLimitMessage = `Approve limit increase in your wallet`;
        if (isAuthConnector) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
                view: null,
                goBack: true,
                onSuccess () {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showLoading(approveLimitMessage);
                }
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showLoading(approveLimitMessage);
        }
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].sendTransaction({
                address: fromAddress,
                to: data.to,
                data: data.data,
                gas: data.gas,
                gasPrice: BigInt(data.gasPrice),
                value: data.value,
                chainNamespace: 'eip155'
            });
            await this.swapTokens();
            await this.getTransaction();
            state.approvalTransaction = undefined;
            state.loadingApprovalTransaction = false;
        } catch (err) {
            const error = err;
            state.transactionError = error?.shortMessage;
            state.loadingApprovalTransaction = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError(error?.shortMessage || 'Transaction error');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SWAP_APPROVAL_ERROR',
                properties: {
                    message: error?.shortMessage || error?.message || 'Unknown',
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
                    swapFromToken: this.state.sourceToken?.symbol || '',
                    swapToToken: this.state.toToken?.symbol || '',
                    swapFromAmount: this.state.sourceTokenAmount || '',
                    swapToAmount: this.state.toTokenAmount || '',
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
        }
    },
    async sendTransactionForSwap (data) {
        if (!data) {
            return undefined;
        }
        const { fromAddress, toTokenAmount, isAuthConnector } = this.getParams();
        state.loadingTransaction = true;
        const snackbarPendingMessage = `Swapping ${state.sourceToken?.symbol} to ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].formatNumberToLocalString(toTokenAmount, 3)} ${state.toToken?.symbol}`;
        const snackbarSuccessMessage = `Swapped ${state.sourceToken?.symbol} to ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].formatNumberToLocalString(toTokenAmount, 3)} ${state.toToken?.symbol}`;
        if (isAuthConnector) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
                view: 'Account',
                goBack: false,
                onSuccess () {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showLoading(snackbarPendingMessage);
                    SwapController.resetState();
                }
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showLoading('Confirm transaction in your wallet');
        }
        try {
            const forceUpdateAddresses = [
                state.sourceToken?.address,
                state.toToken?.address
            ].join(',');
            const transactionHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].sendTransaction({
                address: fromAddress,
                to: data.to,
                data: data.data,
                gas: data.gas,
                gasPrice: BigInt(data.gasPrice),
                value: data.value,
                chainNamespace: 'eip155'
            });
            state.loadingTransaction = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showSuccess(snackbarSuccessMessage);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SWAP_SUCCESS',
                properties: {
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
                    swapFromToken: this.state.sourceToken?.symbol || '',
                    swapToToken: this.state.toToken?.symbol || '',
                    swapFromAmount: this.state.sourceTokenAmount || '',
                    swapToAmount: this.state.toTokenAmount || '',
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            SwapController.resetState();
            if (!isAuthConnector) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('Account');
            }
            SwapController.getMyTokensWithBalance(forceUpdateAddresses);
            return transactionHash;
        } catch (err) {
            const error = err;
            state.transactionError = error?.shortMessage;
            state.loadingTransaction = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError(error?.shortMessage || 'Transaction error');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SWAP_ERROR',
                properties: {
                    message: error?.shortMessage || error?.message || 'Unknown',
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || '',
                    swapFromToken: this.state.sourceToken?.symbol || '',
                    swapToToken: this.state.toToken?.symbol || '',
                    swapFromAmount: this.state.sourceTokenAmount || '',
                    swapToAmount: this.state.toTokenAmount || '',
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
                }
            });
            return undefined;
        }
    },
    // -- Checks -------------------------------------------- //
    hasInsufficientToken (sourceTokenAmount, sourceTokenAddress) {
        const isInsufficientSourceTokenForSwap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].isInsufficientSourceTokenForSwap(sourceTokenAmount, sourceTokenAddress, state.myTokensWithBalance);
        let insufficientNetworkTokenForGas = true;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT) {
            // Smart Accounts may pay gas in any ERC20 token
            insufficientNetworkTokenForGas = false;
        } else {
            insufficientNetworkTokenForGas = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].isInsufficientNetworkTokenForGas(state.networkBalanceInUSD, state.gasPriceInUSD);
        }
        return insufficientNetworkTokenForGas || isInsufficientSourceTokenForSwap;
    },
    // -- Calculations -------------------------------------- //
    setTransactionDetails () {
        const { toTokenAddress, toTokenDecimals } = this.getParams();
        if (!toTokenAddress || !toTokenDecimals) {
            return;
        }
        state.gasPriceInUSD = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].getGasPriceInUSD(state.networkPrice, BigInt(state.gasFee), BigInt(INITIAL_GAS_LIMIT));
        state.priceImpact = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].getPriceImpact({
            sourceTokenAmount: state.sourceTokenAmount,
            sourceTokenPriceInUSD: state.sourceTokenPriceInUSD,
            toTokenPriceInUSD: state.toTokenPriceInUSD,
            toTokenAmount: state.toTokenAmount
        });
        state.maxSlippage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].getMaxSlippage(state.slippage, state.toTokenAmount);
        state.providerFee = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapCalculationUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapCalculationUtil"].getProviderFee(state.sourceTokenAmount);
    }
}; //# sourceMappingURL=SwapController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AccountController": (()=>AccountController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SwapApiUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SwapController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SwapController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    currentTab: 0,
    tokenBalance: [],
    smartAccountDeployed: false,
    addressLabels: new Map(),
    allAccounts: []
});
const AccountController = {
    state,
    replaceState (newState) {
        if (!newState) {
            return;
        }
        Object.assign(state, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(newState));
    },
    subscribe (callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeChainProp('accountState', (accountState)=>{
            if (accountState) {
                return callback(accountState);
            }
            return undefined;
        });
    },
    subscribeKey (property, callback, chain) {
        let prev = undefined;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeChainProp('accountState', (accountState)=>{
            if (accountState) {
                const nextValue = accountState[property];
                if (prev !== nextValue) {
                    prev = nextValue;
                    callback(nextValue);
                }
            }
        }, chain);
    },
    setStatus (status, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('status', status, chain);
    },
    getCaipAddress (chain) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountProp('caipAddress', chain);
    },
    setCaipAddress (caipAddress, chain) {
        const newAddress = caipAddress ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress) : undefined;
        if (chain === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress = caipAddress;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('caipAddress', caipAddress, chain);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('address', newAddress, chain);
    },
    setBalance (balance, balanceSymbol, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('balance', balance, chain);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('balanceSymbol', balanceSymbol, chain);
    },
    setProfileName (profileName, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('profileName', profileName, chain);
    },
    setProfileImage (profileImage, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('profileImage', profileImage, chain);
    },
    setUser (user) {
        state.user = user;
    },
    setAddressExplorerUrl (explorerUrl, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('addressExplorerUrl', explorerUrl, chain);
    },
    setSmartAccountDeployed (isDeployed, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('smartAccountDeployed', isDeployed, chain);
    },
    setCurrentTab (currentTab) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('currentTab', currentTab, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
    },
    setTokenBalance (tokenBalance, chain) {
        if (tokenBalance) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('tokenBalance', tokenBalance, chain);
        }
    },
    setShouldUpdateToAddress (address, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('shouldUpdateToAddress', address, chain);
    },
    setAllAccounts (accounts, namespace) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('allAccounts', accounts, namespace);
    },
    addAddressLabel (address, label, chain) {
        const map = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountProp('addressLabels', chain) || new Map();
        map.set(address, label);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('addressLabels', map, chain);
    },
    removeAddressLabel (address, chain) {
        const map = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountProp('addressLabels', chain) || new Map();
        map.delete(address);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('addressLabels', map, chain);
    },
    setConnectedWalletInfo (connectedWalletInfo, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('connectedWalletInfo', connectedWalletInfo, chain, false);
    },
    setPreferredAccountType (preferredAccountType, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('preferredAccountType', preferredAccountType, chain);
    },
    setSocialProvider (socialProvider, chain) {
        if (socialProvider) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('socialProvider', socialProvider, chain);
        }
    },
    setSocialWindow (socialWindow, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('socialWindow', socialWindow ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(socialWindow) : undefined, chain);
    },
    setFarcasterUrl (farcasterUrl, chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setAccountProp('farcasterUrl', farcasterUrl, chain);
    },
    async fetchTokenBalance (onError) {
        state.balanceLoading = true;
        const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId;
        const chain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace;
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        const address = caipAddress ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress) : undefined;
        if (state.lastRetry && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isAllowedRetry(state.lastRetry, 30 * __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].ONE_SEC_MS)) {
            state.balanceLoading = false;
            return [];
        }
        try {
            if (address && chainId && chain) {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getBalance(address, chainId);
                const filteredBalances = response.balances.filter((balance)=>balance.quantity.decimals !== '0');
                this.setTokenBalance(filteredBalances, chain);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SwapController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapController"].setBalances(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].mapBalancesToSwapTokens(response.balances));
                state.lastRetry = undefined;
                state.balanceLoading = false;
                return filteredBalances;
            }
        } catch (error) {
            state.lastRetry = Date.now();
            onError?.(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Token Balance Unavailable');
        } finally{
            state.balanceLoading = false;
        }
        return [];
    },
    resetAccount (chain) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].resetAccount(chain);
    }
}; //# sourceMappingURL=AccountController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PublicStateController": (()=>PublicStateController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    loading: false,
    open: false,
    selectedNetworkId: undefined,
    activeChain: undefined,
    initialized: false
});
const PublicStateController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    set (newState) {
        Object.assign(state, {
            ...state,
            ...newState
        });
    }
}; //# sourceMappingURL=PublicStateController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChainController": (()=>ChainController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- Constants ----------------------------------------- //
const accountState = {
    currentTab: 0,
    tokenBalance: [],
    smartAccountDeployed: false,
    addressLabels: new Map(),
    allAccounts: []
};
const networkState = {
    supportsAllNetworks: true,
    smartAccountEnabledNetworks: []
};
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["proxyMap"])(),
    activeCaipAddress: undefined,
    activeChain: undefined,
    activeCaipNetwork: undefined,
    noAdapters: false,
    universalAdapter: {
        networkControllerClient: undefined,
        connectionControllerClient: undefined
    },
    isSwitchingNamespace: false
});
const ChainController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>{
            callback(state);
        });
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    subscribeChainProp (property, callback, chain) {
        let prev = undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state.chains, ()=>{
            const activeChain = chain || state.activeChain;
            if (activeChain) {
                const nextValue = state.chains.get(activeChain)?.[property];
                if (prev !== nextValue) {
                    prev = nextValue;
                    callback(nextValue);
                }
            }
        });
    },
    initialize (adapters, caipNetworks, clients) {
        const { chainId: activeChainId, namespace: activeNamespace } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveNetworkProps();
        const activeCaipNetwork = caipNetworks?.find((network)=>network.id.toString() === activeChainId?.toString());
        const defaultAdapter = adapters.find((adapter)=>adapter?.namespace === activeNamespace);
        const adapterToActivate = defaultAdapter || adapters?.[0];
        const namespaces = new Set([
            ...caipNetworks?.map((network)=>network.chainNamespace) ?? []
        ]);
        if (adapters?.length === 0 || !adapterToActivate) {
            state.noAdapters = true;
        }
        if (!state.noAdapters) {
            state.activeChain = adapterToActivate?.namespace;
            state.activeCaipNetwork = activeCaipNetwork;
            if (state.activeChain) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
                    activeChain: adapterToActivate?.namespace
                });
            }
        }
        namespaces.forEach((namespace)=>{
            const namespaceNetworks = caipNetworks?.filter((network)=>network.chainNamespace === namespace);
            ChainController.state.chains.set(namespace, {
                namespace,
                networkState,
                accountState,
                caipNetworks: namespaceNetworks ?? [],
                ...clients
            });
            this.setRequestedCaipNetworks(namespaceNetworks ?? [], namespace);
        });
    },
    removeAdapter (namespace) {
        if (state.activeChain === namespace) {
            const nextAdapter = Array.from(state.chains.entries()).find(([chainNamespace])=>chainNamespace !== namespace);
            if (nextAdapter) {
                const caipNetwork = nextAdapter[1]?.caipNetworks?.[0];
                if (caipNetwork) {
                    this.setActiveCaipNetwork(caipNetwork);
                }
            }
        }
        state.chains.delete(namespace);
    },
    addAdapter (adapter, { networkControllerClient, connectionControllerClient }, caipNetworks) {
        state.chains.set(adapter.namespace, {
            namespace: adapter.namespace,
            networkState,
            accountState,
            caipNetworks,
            connectionControllerClient,
            networkControllerClient
        });
        this.setRequestedCaipNetworks(caipNetworks?.filter((caipNetwork)=>caipNetwork.chainNamespace === adapter.namespace) ?? [], adapter.namespace);
    },
    addNetwork (network) {
        const chainAdapter = state.chains.get(network.chainNamespace);
        if (chainAdapter) {
            const newNetworks = [
                ...chainAdapter.caipNetworks || []
            ];
            if (!chainAdapter.caipNetworks?.find((caipNetwork)=>caipNetwork.id === network.id)) {
                newNetworks.push(network);
            }
            state.chains.set(network.chainNamespace, {
                ...chainAdapter,
                caipNetworks: newNetworks
            });
            this.setRequestedCaipNetworks(newNetworks, network.chainNamespace);
        }
    },
    removeNetwork (namespace, networkId) {
        const chainAdapter = state.chains.get(namespace);
        if (chainAdapter) {
            // Check if network being removed is active network
            const isActiveNetwork = state.activeCaipNetwork?.id === networkId;
            // Filter out the network being removed
            const newCaipNetworksOfAdapter = [
                ...chainAdapter.caipNetworks?.filter((network)=>network.id !== networkId) || []
            ];
            // If active network was removed and there are other networks available, switch to first one
            if (isActiveNetwork && chainAdapter?.caipNetworks?.[0]) {
                this.setActiveCaipNetwork(chainAdapter.caipNetworks[0]);
            }
            state.chains.set(namespace, {
                ...chainAdapter,
                caipNetworks: newCaipNetworksOfAdapter
            });
            this.setRequestedCaipNetworks(newCaipNetworksOfAdapter || [], namespace);
        }
    },
    setAdapterNetworkState (chain, props) {
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            chainAdapter.networkState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])({
                ...chainAdapter.networkState || networkState,
                ...props
            });
            state.chains.set(chain, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(chainAdapter));
        }
    },
    setChainAccountData (chain, accountProps, _unknown = true) {
        if (!chain) {
            throw new Error('Chain is required to update chain account data');
        }
        const chainAdapter = state.chains.get(chain);
        if (chainAdapter) {
            chainAdapter.accountState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])({
                ...chainAdapter.accountState || accountState,
                ...accountProps
            });
            state.chains.set(chain, chainAdapter);
            if (state.chains.size === 1 || state.activeChain === chain) {
                if (accountProps.caipAddress) {
                    state.activeCaipAddress = accountProps.caipAddress;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].replaceState(chainAdapter.accountState);
            }
        }
    },
    // eslint-disable-next-line max-params
    setAccountProp (prop, value, chain, replaceState = true) {
        this.setChainAccountData(chain, {
            [prop]: value
        }, replaceState);
    },
    setActiveNamespace (chain) {
        state.activeChain = chain;
        const newAdapter = chain ? state.chains.get(chain) : undefined;
        const caipNetwork = newAdapter?.networkState?.caipNetwork;
        if (caipNetwork?.id && chain) {
            state.activeCaipAddress = newAdapter?.accountState?.caipAddress;
            state.activeCaipNetwork = caipNetwork;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setActiveCaipNetworkId(caipNetwork?.caipNetworkId);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
                activeChain: chain,
                selectedNetworkId: caipNetwork?.caipNetworkId
            });
        }
    },
    setActiveCaipNetwork (caipNetwork) {
        if (!caipNetwork) {
            return;
        }
        if (state.activeChain !== caipNetwork.chainNamespace) {
            this.setIsSwitchingNamespace(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setFilterByNamespace(caipNetwork.chainNamespace);
        }
        const newAdapter = state.chains.get(caipNetwork.chainNamespace);
        state.activeChain = caipNetwork.chainNamespace;
        state.activeCaipNetwork = caipNetwork;
        if (newAdapter?.accountState?.address) {
            state.activeCaipAddress = `${caipNetwork.chainNamespace}:${caipNetwork.id}:${newAdapter?.accountState?.address}`;
        } else {
            state.activeCaipAddress = undefined;
        }
        if (newAdapter) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].replaceState(newAdapter.accountState);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            activeChain: state.activeChain,
            selectedNetworkId: state.activeCaipNetwork?.caipNetworkId
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setActiveCaipNetworkId(caipNetwork.caipNetworkId);
        const isSupported = this.checkIfSupportedNetwork(caipNetwork.chainNamespace);
        if (!isSupported && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.allowUnsupportedChain) {
            this.showUnsupportedChainUI();
        }
    },
    addCaipNetwork (caipNetwork) {
        if (!caipNetwork) {
            return;
        }
        const chain = state.chains.get(caipNetwork.chainNamespace);
        if (chain) {
            chain?.caipNetworks?.push(caipNetwork);
        }
    },
    async switchActiveNetwork (network) {
        const activeAdapter = ChainController.state.chains.get(ChainController.state.activeChain);
        const unsupportedNetwork = !activeAdapter?.caipNetworks?.some((caipNetwork)=>caipNetwork.id === state.activeCaipNetwork?.id);
        if (unsupportedNetwork) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
        }
        const networkControllerClient = this.getNetworkControllerClient(network.chainNamespace);
        if (networkControllerClient) {
            await networkControllerClient.switchCaipNetwork(network);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SWITCH_NETWORK',
                properties: {
                    network: network.caipNetworkId
                }
            });
        }
    },
    getNetworkControllerClient (chainNamespace) {
        const chain = chainNamespace || state.activeChain;
        const chainAdapter = state.chains.get(chain);
        if (!chainAdapter) {
            throw new Error('Chain adapter not found');
        }
        if (!chainAdapter.networkControllerClient) {
            throw new Error('NetworkController client not set');
        }
        return chainAdapter.networkControllerClient;
    },
    getConnectionControllerClient (_chain) {
        const chain = _chain || state.activeChain;
        if (!chain) {
            throw new Error('Chain is required to get connection controller client');
        }
        const chainAdapter = state.chains.get(chain);
        if (!chainAdapter?.connectionControllerClient) {
            throw new Error('ConnectionController client not set');
        }
        return chainAdapter.connectionControllerClient;
    },
    getAccountProp (key, _chain) {
        let chain = state.activeChain;
        if (_chain) {
            chain = _chain;
        }
        if (!chain) {
            return undefined;
        }
        const chainAccountState = state.chains.get(chain)?.accountState;
        if (!chainAccountState) {
            return undefined;
        }
        return chainAccountState[key];
    },
    getNetworkProp (key, namespace) {
        const chainNetworkState = state.chains.get(namespace)?.networkState;
        if (!chainNetworkState) {
            return undefined;
        }
        return chainNetworkState[key];
    },
    getRequestedCaipNetworks (chainToFilter) {
        const adapter = state.chains.get(chainToFilter);
        const { approvedCaipNetworkIds = [], requestedCaipNetworks = [] } = adapter?.networkState || {};
        const sortedNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
        return sortedNetworks;
    },
    getAllRequestedCaipNetworks () {
        const requestedCaipNetworks = [];
        state.chains.forEach((chainAdapter)=>{
            const caipNetworks = this.getRequestedCaipNetworks(chainAdapter.namespace);
            requestedCaipNetworks.push(...caipNetworks);
        });
        return requestedCaipNetworks;
    },
    setRequestedCaipNetworks (requestedCaipNetworks, chain) {
        this.setAdapterNetworkState(chain, {
            requestedCaipNetworks
        });
    },
    getAllApprovedCaipNetworkIds () {
        const approvedCaipNetworkIds = [];
        state.chains.forEach((chainAdapter)=>{
            const approvedIds = this.getApprovedCaipNetworkIds(chainAdapter.namespace);
            approvedCaipNetworkIds.push(...approvedIds);
        });
        return approvedCaipNetworkIds;
    },
    getActiveCaipNetwork () {
        return state.activeCaipNetwork;
    },
    getActiveCaipAddress () {
        return state.activeCaipAddress;
    },
    getApprovedCaipNetworkIds (namespace) {
        const adapter = state.chains.get(namespace);
        const approvedCaipNetworkIds = adapter?.networkState?.approvedCaipNetworkIds || [];
        return approvedCaipNetworkIds;
    },
    async setApprovedCaipNetworksData (namespace) {
        const networkControllerClient = this.getNetworkControllerClient();
        const data = await networkControllerClient?.getApprovedCaipNetworksData();
        this.setAdapterNetworkState(namespace, {
            approvedCaipNetworkIds: data?.approvedCaipNetworkIds,
            supportsAllNetworks: data?.supportsAllNetworks
        });
    },
    checkIfSupportedNetwork (namespace) {
        const activeCaipNetwork = this.state.activeCaipNetwork;
        const requestedCaipNetworks = this.getRequestedCaipNetworks(namespace);
        if (!requestedCaipNetworks.length) {
            return true;
        }
        return requestedCaipNetworks?.some((network)=>network.id === activeCaipNetwork?.id);
    },
    checkIfSupportedChainId (chainId) {
        if (!this.state.activeChain) {
            return true;
        }
        const requestedCaipNetworks = this.getRequestedCaipNetworks(this.state.activeChain);
        return requestedCaipNetworks?.some((network)=>network.id === chainId);
    },
    // Smart Account Network Handlers
    setSmartAccountEnabledNetworks (smartAccountEnabledNetworks, chain) {
        this.setAdapterNetworkState(chain, {
            smartAccountEnabledNetworks
        });
    },
    checkIfSmartAccountEnabled () {
        const networkId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].caipNetworkIdToNumber(state.activeCaipNetwork?.caipNetworkId);
        const activeChain = this.state.activeChain;
        if (!activeChain || !networkId) {
            return false;
        }
        const smartAccountEnabledNetworks = this.getNetworkProp('smartAccountEnabledNetworks', activeChain);
        return Boolean(smartAccountEnabledNetworks?.includes(Number(networkId)));
    },
    getActiveNetworkTokenAddress () {
        const namespace = this.state.activeCaipNetwork?.chainNamespace || 'eip155';
        const chainId = this.state.activeCaipNetwork?.id || 1;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].NATIVE_TOKEN_ADDRESS[namespace];
        return `${namespace}:${chainId}:${address}`;
    },
    showUnsupportedChainUI () {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open({
            view: 'UnsupportedChain'
        });
    },
    checkIfNamesSupported () {
        const activeCaipNetwork = state.activeCaipNetwork;
        return Boolean(activeCaipNetwork?.chainNamespace && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(activeCaipNetwork.chainNamespace));
    },
    resetNetwork (namespace) {
        this.setAdapterNetworkState(namespace, {
            approvedCaipNetworkIds: undefined,
            supportsAllNetworks: true,
            smartAccountEnabledNetworks: []
        });
    },
    resetAccount (chain) {
        const chainToWrite = chain;
        if (!chainToWrite) {
            throw new Error('Chain is required to set account prop');
        }
        this.state.activeCaipAddress = undefined;
        this.setChainAccountData(chainToWrite, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])({
            smartAccountDeployed: false,
            currentTab: 0,
            caipAddress: undefined,
            address: undefined,
            balance: undefined,
            balanceSymbol: undefined,
            profileName: undefined,
            profileImage: undefined,
            addressExplorerUrl: undefined,
            tokenBalance: [],
            connectedWalletInfo: undefined,
            preferredAccountType: undefined,
            socialProvider: undefined,
            socialWindow: undefined,
            farcasterUrl: undefined,
            provider: undefined,
            allAccounts: []
        }));
    },
    async disconnect () {
        try {
            const disconnectResults = await Promise.allSettled(Array.from(state.chains.entries()).map(async ([namespace, adapter])=>{
                try {
                    if (adapter.connectionControllerClient?.disconnect) {
                        await adapter.connectionControllerClient.disconnect();
                    }
                    this.resetAccount(namespace);
                    this.resetNetwork(namespace);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteConnectedConnectorId(namespace);
                } catch (error) {
                    throw new Error(`Failed to disconnect chain ${namespace}: ${error.message}`);
                }
            }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
            const failures = disconnectResults.filter((result)=>result.status === 'rejected');
            if (failures.length > 0) {
                throw new Error(failures.map((f)=>f.reason.message).join(', '));
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteConnectedSocialProvider();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'DISCONNECT_SUCCESS'
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error.message || 'Failed to disconnect chains');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'DISCONNECT_ERROR',
                properties: {
                    message: error.message || 'Failed to disconnect chains'
                }
            });
        }
    },
    setIsSwitchingNamespace (isSwitchingNamespace) {
        state.isSwitchingNamespace = isSwitchingNamespace;
    },
    getFirstCaipNetworkSupportsAuthConnector () {
        const availableChains = [];
        let firstCaipNetwork = undefined;
        state.chains.forEach((chain)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS.find((ns)=>ns === chain.namespace)) {
                if (chain.namespace) {
                    availableChains.push(chain.namespace);
                }
            }
        });
        if (availableChains.length > 0) {
            const firstAvailableChain = availableChains[0];
            firstCaipNetwork = firstAvailableChain ? state.chains.get(firstAvailableChain)?.caipNetworks?.[0] : undefined;
            return firstCaipNetwork;
        }
        return undefined;
    }
}; //# sourceMappingURL=ChainController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ApiController": (()=>ApiController),
    "api": (()=>api)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
// -- Helpers ------------------------------------------- //
const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getApiUrl();
const api = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FetchUtil"]({
    baseUrl,
    clientId: null
});
const entries = '40';
const recommendedEntries = '4';
const imageCountToFetch = 20;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    page: 1,
    count: 0,
    featured: [],
    recommended: [],
    wallets: [],
    search: [],
    isAnalyticsEnabled: false,
    excludedRDNS: []
});
const ApiController = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    _getSdkProperties () {
        const { projectId, sdkType, sdkVersion } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        return {
            projectId,
            st: sdkType || 'appkit',
            sv: sdkVersion || 'html-wagmi-4.2.2'
        };
    },
    _filterOutExtensions (wallets) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.isUniversalProvider) {
            return wallets.filter((w)=>Boolean(w.mobile_link || w.desktop_link || w.webapp_link));
        }
        return wallets;
    },
    async _fetchWalletImage (imageId) {
        const imageUrl = `${api.baseUrl}/getWalletImage/${imageId}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setWalletImage(imageId, URL.createObjectURL(blob));
    },
    async _fetchNetworkImage (imageId) {
        const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setNetworkImage(imageId, URL.createObjectURL(blob));
    },
    async _fetchConnectorImage (imageId) {
        const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setConnectorImage(imageId, URL.createObjectURL(blob));
    },
    async _fetchCurrencyImage (countryCode) {
        const imageUrl = `${api.baseUrl}/public/getCurrencyImage/${countryCode}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setCurrencyImage(countryCode, URL.createObjectURL(blob));
    },
    async _fetchTokenImage (symbol) {
        const imageUrl = `${api.baseUrl}/public/getTokenImage/${symbol}`;
        const blob = await api.getBlob({
            path: imageUrl,
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetController"].setTokenImage(symbol, URL.createObjectURL(blob));
    },
    async prefetchNetworkImages () {
        const requestedCaipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        const ids = requestedCaipNetworks?.map(({ assets })=>assets?.imageId).filter(Boolean).filter((imageId)=>!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getNetworkImageById(imageId));
        if (ids) {
            await Promise.allSettled(ids.map((id)=>ApiController._fetchNetworkImage(id)));
        }
    },
    async fetchConnectorImages () {
        const { connectors } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].state;
        const ids = connectors.map(({ imageId })=>imageId).filter(Boolean);
        await Promise.allSettled(ids.map((id)=>ApiController._fetchConnectorImage(id)));
    },
    async fetchCurrencyImages (currencies = []) {
        await Promise.allSettled(currencies.map((currency)=>ApiController._fetchCurrencyImage(currency)));
    },
    async fetchTokenImages (tokens = []) {
        await Promise.allSettled(tokens.map((token)=>ApiController._fetchTokenImage(token)));
    },
    async fetchFeaturedWallets () {
        const { featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        if (featuredWalletIds?.length) {
            const { data } = await api.get({
                path: '/getWallets',
                params: {
                    ...ApiController._getSdkProperties(),
                    page: '1',
                    entries: featuredWalletIds?.length ? String(featuredWalletIds.length) : recommendedEntries,
                    include: featuredWalletIds?.join(',')
                }
            });
            data.sort((a, b)=>featuredWalletIds.indexOf(a.id) - featuredWalletIds.indexOf(b.id));
            const images = data.map((d)=>d.image_id).filter(Boolean);
            await Promise.allSettled(images.map((id)=>ApiController._fetchWalletImage(id)));
            state.featured = data;
        }
    },
    async fetchRecommendedWallets () {
        try {
            const { includeWalletIds, excludeWalletIds, featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
            const exclude = [
                ...excludeWalletIds ?? [],
                ...featuredWalletIds ?? []
            ].filter(Boolean);
            const { data, count } = await api.get({
                path: '/getWallets',
                params: {
                    ...ApiController._getSdkProperties(),
                    page: '1',
                    chains: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId,
                    entries: recommendedEntries,
                    include: includeWalletIds?.join(','),
                    exclude: exclude?.join(',')
                }
            });
            const recent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
            const recommendedImages = data.map((d)=>d.image_id).filter(Boolean);
            const recentImages = recent.map((r)=>r.image_id).filter(Boolean);
            await Promise.allSettled([
                ...recommendedImages,
                ...recentImages
            ].map((id)=>ApiController._fetchWalletImage(id)));
            state.recommended = data;
            state.count = count ?? 0;
        } catch  {
        // Catch silently
        }
    },
    async fetchWallets ({ page }) {
        const { includeWalletIds, excludeWalletIds, featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const exclude = [
            ...state.recommended.map(({ id })=>id),
            ...excludeWalletIds ?? [],
            ...featuredWalletIds ?? []
        ].filter(Boolean);
        const { data, count } = await api.get({
            path: '/getWallets',
            params: {
                ...ApiController._getSdkProperties(),
                page: String(page),
                entries,
                chains: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId,
                include: includeWalletIds?.join(','),
                exclude: exclude.join(',')
            }
        });
        const images = data.slice(0, imageCountToFetch).map((w)=>w.image_id).filter(Boolean);
        await Promise.allSettled(images.map((id)=>ApiController._fetchWalletImage(id)));
        state.wallets = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].uniqueBy([
            ...state.wallets,
            ...ApiController._filterOutExtensions(data)
        ], 'id');
        state.count = count > state.count ? count : state.count;
        state.page = page;
    },
    async initializeExcludedWalletRdns ({ ids }) {
        const { data } = await api.get({
            path: '/getWallets',
            params: {
                ...ApiController._getSdkProperties(),
                page: '1',
                entries: String(ids.length),
                chains: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId,
                include: ids?.join(',')
            }
        });
        if (data) {
            data.forEach((wallet)=>{
                if (wallet?.rdns) {
                    state.excludedRDNS.push(wallet.rdns);
                }
            });
        }
    },
    async searchWallet ({ search, badge }) {
        const { includeWalletIds, excludeWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state;
        state.search = [];
        const { data } = await api.get({
            path: '/getWallets',
            params: {
                ...ApiController._getSdkProperties(),
                page: '1',
                entries: '100',
                search: search?.trim(),
                badge_type: badge,
                chains: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId,
                include: includeWalletIds?.join(','),
                exclude: excludeWalletIds?.join(',')
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'SEARCH_WALLET',
            properties: {
                badge: badge ?? '',
                search: search ?? ''
            }
        });
        const images = data.map((w)=>w.image_id).filter(Boolean);
        await Promise.allSettled([
            ...images.map((id)=>ApiController._fetchWalletImage(id)),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].wait(300)
        ]);
        state.search = ApiController._filterOutExtensions(data);
    },
    prefetch () {
        if (state.prefetchPromise) {
            return state.prefetchPromise;
        }
        const promises = [
            ApiController.fetchFeaturedWallets(),
            ApiController.fetchRecommendedWallets(),
            ApiController.fetchConnectorImages(),
            ApiController.prefetchNetworkImages()
        ];
        state.prefetchPromise = Promise.allSettled(promises);
        return state.prefetchPromise;
    },
    prefetchAnalyticsConfig () {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.analytics) {
            ApiController.fetchAnalyticsConfig();
        }
    },
    async fetchAnalyticsConfig () {
        const { isAnalyticsEnabled } = await api.get({
            path: '/getAnalyticsConfig',
            params: ApiController._getSdkProperties()
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures({
            analytics: isAnalyticsEnabled
        });
    }
}; //# sourceMappingURL=ApiController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ModalController": (()=>ModalController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    loading: false,
    open: false,
    shake: false
});
const ModalController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    async open (options) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].prefetch();
        const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        const noAdapters = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.noAdapters;
        if (options?.view) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset(options.view);
        } else if (caipAddress) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Account');
        } else if (noAdapters && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('ConnectingWalletConnectBasic');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].reset('Connect');
        }
        state.open = true;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            open: true
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'MODAL_OPEN',
            properties: {
                connected: Boolean(caipAddress)
            }
        });
    },
    close () {
        const isEmbeddedEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded;
        const connected = Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress);
        state.open = false;
        if (isEmbeddedEnabled) {
            if (connected) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('Account');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push('Connect');
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
                open: false
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'MODAL_CLOSE',
            properties: {
                connected
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].clearNamespaceFilter();
    },
    setLoading (loading) {
        state.loading = loading;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            loading
        });
    },
    shake () {
        if (state.shake) {
            return;
        }
        state.shake = true;
        setTimeout(()=>{
            state.shake = false;
        }, 500);
    }
}; //# sourceMappingURL=ModalController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OnRampController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "OnRampController": (()=>OnRampController),
    "USDC_CURRENCY_DEFAULT": (()=>USDC_CURRENCY_DEFAULT),
    "USD_CURRENCY_DEFAULT": (()=>USD_CURRENCY_DEFAULT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const USDC_CURRENCY_DEFAULT = {
    id: '2b92315d-eab7-5bef-84fa-089a131333f5',
    name: 'USD Coin',
    symbol: 'USDC',
    networks: [
        {
            name: 'ethereum-mainnet',
            display_name: 'Ethereum',
            chain_id: '1',
            contract_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        },
        {
            name: 'polygon-mainnet',
            display_name: 'Polygon',
            chain_id: '137',
            contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        }
    ]
};
const USD_CURRENCY_DEFAULT = {
    id: 'USD',
    payment_method_limits: [
        {
            id: 'card',
            min: '10.00',
            max: '7500.00'
        },
        {
            id: 'ach_bank_account',
            min: '10.00',
            max: '25000.00'
        }
    ]
};
const defaultState = {
    providers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONRAMP_PROVIDERS"],
    selectedProvider: null,
    error: null,
    purchaseCurrency: USDC_CURRENCY_DEFAULT,
    paymentCurrency: USD_CURRENCY_DEFAULT,
    purchaseCurrencies: [
        USDC_CURRENCY_DEFAULT
    ],
    paymentCurrencies: [],
    quotesLoading: false
};
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])(defaultState);
const OnRampController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    setSelectedProvider (provider) {
        if (provider && provider.name === 'meld') {
            const currency = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA ? 'SOL' : 'USDC';
            const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address ?? '';
            const url = new URL(provider.url);
            url.searchParams.append('publicKey', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MELD_PUBLIC_KEY"]);
            url.searchParams.append('destinationCurrencyCode', currency);
            url.searchParams.append('walletAddress', address);
            provider.url = url.toString();
        }
        state.selectedProvider = provider;
    },
    setPurchaseCurrency (currency) {
        state.purchaseCurrency = currency;
    },
    setPaymentCurrency (currency) {
        state.paymentCurrency = currency;
    },
    setPurchaseAmount (amount) {
        this.state.purchaseAmount = amount;
    },
    setPaymentAmount (amount) {
        this.state.paymentAmount = amount;
    },
    async getAvailableCurrencies () {
        const options = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getOnrampOptions();
        state.purchaseCurrencies = options.purchaseCurrencies;
        state.paymentCurrencies = options.paymentCurrencies;
        state.paymentCurrency = options.paymentCurrencies[0] || USD_CURRENCY_DEFAULT;
        state.purchaseCurrency = options.purchaseCurrencies[0] || USDC_CURRENCY_DEFAULT;
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchCurrencyImages(options.paymentCurrencies.map((currency)=>currency.id));
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].fetchTokenImages(options.purchaseCurrencies.map((currency)=>currency.symbol));
    },
    async getQuote () {
        state.quotesLoading = true;
        try {
            const quote = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getOnrampQuote({
                purchaseCurrency: state.purchaseCurrency,
                paymentCurrency: state.paymentCurrency,
                amount: state.paymentAmount?.toString() || '0',
                network: state.purchaseCurrency?.symbol
            });
            state.quotesLoading = false;
            state.purchaseAmount = Number(quote?.purchaseAmount.amount);
            return quote;
        } catch (error) {
            state.error = error.message;
            state.quotesLoading = false;
            return null;
        } finally{
            state.quotesLoading = false;
        }
    },
    resetState () {
        state.providers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONRAMP_PROVIDERS"];
        state.selectedProvider = null;
        state.error = null;
        state.purchaseCurrency = USDC_CURRENCY_DEFAULT;
        state.paymentCurrency = USD_CURRENCY_DEFAULT;
        state.purchaseCurrencies = [
            USDC_CURRENCY_DEFAULT
        ];
        state.paymentCurrencies = [];
        state.paymentAmount = undefined;
        state.purchaseAmount = undefined;
        state.quotesLoading = false;
    }
}; //# sourceMappingURL=OnRampController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SendController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "SendController": (()=>SendController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ContractUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ContractUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SwapApiUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    loading: false
});
const SendController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    setToken (token) {
        if (token) {
            state.token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(token);
        }
    },
    setTokenAmount (sendTokenAmount) {
        state.sendTokenAmount = sendTokenAmount;
    },
    setReceiverAddress (receiverAddress) {
        state.receiverAddress = receiverAddress;
    },
    setReceiverProfileImageUrl (receiverProfileImageUrl) {
        state.receiverProfileImageUrl = receiverProfileImageUrl;
    },
    setReceiverProfileName (receiverProfileName) {
        state.receiverProfileName = receiverProfileName;
    },
    setGasPrice (gasPrice) {
        state.gasPrice = gasPrice;
    },
    setGasPriceInUsd (gasPriceInUSD) {
        state.gasPriceInUSD = gasPriceInUSD;
    },
    setNetworkBalanceInUsd (networkBalanceInUSD) {
        state.networkBalanceInUSD = networkBalanceInUSD;
    },
    setLoading (loading) {
        state.loading = loading;
    },
    sendToken () {
        switch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace){
            case 'eip155':
                this.sendEvmToken();
                return;
            case 'solana':
                this.sendSolanaToken();
                return;
            default:
                throw new Error('Unsupported chain');
        }
    },
    sendEvmToken () {
        if (this.state.token?.address && this.state.sendTokenAmount && this.state.receiverAddress) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_INITIATED',
                properties: {
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: this.state.token.address,
                    amount: this.state.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
            this.sendERC20Token({
                receiverAddress: this.state.receiverAddress,
                tokenAddress: this.state.token.address,
                sendTokenAmount: this.state.sendTokenAmount,
                decimals: this.state.token.quantity.decimals
            });
        } else if (this.state.receiverAddress && this.state.sendTokenAmount && this.state.gasPrice && this.state.token?.quantity.decimals) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_INITIATED',
                properties: {
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: this.state.token?.symbol,
                    amount: this.state.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
            this.sendNativeToken({
                receiverAddress: this.state.receiverAddress,
                sendTokenAmount: this.state.sendTokenAmount,
                gasPrice: this.state.gasPrice,
                decimals: this.state.token.quantity.decimals
            });
        }
    },
    async fetchNetworkBalance () {
        const balances = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SwapApiUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapApiUtil"].getMyTokensWithBalance();
        if (!balances) {
            return;
        }
        const networkToken = balances.find((token)=>token.address === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getActiveNetworkTokenAddress());
        if (!networkToken) {
            return;
        }
        state.networkBalanceInUSD = networkToken ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].multiply(networkToken.quantity.numeric, networkToken.price).toString() : '0';
    },
    isInsufficientNetworkTokenForGas (networkBalanceInUSD, gasPriceInUSD) {
        const gasPrice = gasPriceInUSD || '0';
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(networkBalanceInUSD).eq(0)) {
            return true;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NumberUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberUtil"].bigNumber(gasPrice)).gt(networkBalanceInUSD);
    },
    hasInsufficientGasFunds () {
        let insufficientNetworkTokenForGas = true;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT) {
            // Smart Accounts may pay gas in any ERC20 token
            insufficientNetworkTokenForGas = false;
        } else if (state.networkBalanceInUSD) {
            insufficientNetworkTokenForGas = this.isInsufficientNetworkTokenForGas(state.networkBalanceInUSD, state.gasPriceInUSD);
        }
        return insufficientNetworkTokenForGas;
    },
    async sendNativeToken (params) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
            view: 'Account',
            goBack: false
        });
        const to = params.receiverAddress;
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
        const value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
        const data = '0x';
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].sendTransaction({
                chainNamespace: 'eip155',
                to,
                address,
                data,
                value: value ?? BigInt(0),
                gasPrice: params.gasPrice
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showSuccess('Transaction started');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_SUCCESS',
                properties: {
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: this.state.token?.symbol || '',
                    amount: params.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
            this.resetSend();
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
                type: 'track',
                event: 'SEND_ERROR',
                properties: {
                    isSmartAccount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT,
                    token: this.state.token?.symbol || '',
                    amount: params.sendTokenAmount,
                    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId || ''
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Something went wrong');
        }
    },
    async sendERC20Token (params) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
            view: 'Account',
            goBack: false
        });
        const amount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].parseUnits(params.sendTokenAmount.toString(), Number(params.decimals));
        try {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address && params.sendTokenAmount && params.receiverAddress && params.tokenAddress) {
                const tokenAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(params.tokenAddress);
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].writeContract({
                    fromAddress: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                    tokenAddress,
                    args: [
                        params.receiverAddress,
                        amount ?? BigInt(0)
                    ],
                    method: 'transfer',
                    abi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ContractUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContractUtil"].getERC20Abi(tokenAddress),
                    chainNamespace: 'eip155'
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showSuccess('Transaction started');
                this.resetSend();
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Something went wrong');
        }
    },
    sendSolanaToken () {
        if (!this.state.sendTokenAmount || !this.state.receiverAddress) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Please enter a valid amount and receiver address');
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
            view: 'Account',
            goBack: false
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].sendTransaction({
            chainNamespace: 'solana',
            to: this.state.receiverAddress,
            value: this.state.sendTokenAmount
        }).then(()=>{
            this.resetSend();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].fetchTokenBalance();
        }).catch((error)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError('Failed to send transaction. Please try again.');
            // eslint-disable-next-line no-console
            console.error('SendController:sendToken - failed to send solana transaction', error);
        });
    },
    resetSend () {
        state.token = undefined;
        state.sendTokenAmount = undefined;
        state.receiverAddress = undefined;
        state.receiverProfileImageUrl = undefined;
        state.receiverProfileName = undefined;
        state.loading = false;
    }
}; //# sourceMappingURL=SendController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/TooltipController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TooltipController": (()=>TooltipController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    message: '',
    open: false,
    triggerRect: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
    },
    variant: 'shade'
});
const TooltipController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    showTooltip ({ message, triggerRect, variant }) {
        state.open = true;
        state.message = message;
        state.triggerRect = triggerRect;
        state.variant = variant;
    },
    hide () {
        state.open = false;
        state.message = '';
        state.triggerRect = {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        };
    }
}; //# sourceMappingURL=TooltipController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/EnsUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EnsUtil": (()=>EnsUtil)
});
const SLIP44_MSB = 0x80000000;
const EnsUtil = {
    convertEVMChainIdToCoinType (chainId) {
        if (chainId >= SLIP44_MSB) {
            throw new Error('Invalid chainId');
        }
        return (SLIP44_MSB | chainId) >>> 0;
    }
}; //# sourceMappingURL=EnsUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EnsController": (()=>EnsController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$EnsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/EnsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
// -- State --------------------------------------------- //
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    suggestions: [],
    loading: false
});
const EnsController = {
    state,
    subscribe (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state, ()=>callback(state));
    },
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    async resolveName (name) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].lookupEnsName(name);
        } catch (e) {
            const error = e;
            throw new Error(error?.reasons?.[0]?.description || 'Error resolving name');
        }
    },
    async isNameRegistered (name) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].lookupEnsName(name);
            return true;
        } catch  {
            return false;
        }
    },
    async getSuggestions (value) {
        try {
            state.loading = true;
            state.suggestions = [];
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getEnsNameSuggestions(value);
            state.suggestions = response.suggestions.map((suggestion)=>({
                    ...suggestion,
                    name: suggestion.name
                })) || [];
            return state.suggestions;
        } catch (e) {
            const errorMessage = this.parseEnsApiError(e, 'Error fetching name suggestions');
            throw new Error(errorMessage);
        } finally{
            state.loading = false;
        }
    },
    async getNamesForAddress (address) {
        try {
            const network = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
            if (!network) {
                return [];
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].reverseLookupEnsName({
                address
            });
            return response;
        } catch (e) {
            const errorMessage = this.parseEnsApiError(e, 'Error fetching names for address');
            throw new Error(errorMessage);
        }
    },
    async registerName (name) {
        const network = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        if (!network) {
            throw new Error('Network not found');
        }
        const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
        const emailConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
        if (!address || !emailConnector) {
            throw new Error('Address or auth connector not found');
        }
        state.loading = true;
        try {
            const message = JSON.stringify({
                name,
                attributes: {},
                // Unix timestamp
                timestamp: Math.floor(Date.now() / 1000)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].pushTransactionStack({
                view: 'RegisterAccountNameSuccess',
                goBack: false,
                replace: true,
                onCancel () {
                    state.loading = false;
                }
            });
            const signature = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].signMessage(message);
            const networkId = network.id;
            if (!networkId) {
                throw new Error('Network not found');
            }
            const coinType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$EnsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnsUtil"].convertEVMChainIdToCoinType(Number(networkId));
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].registerEnsName({
                coinType,
                address: address,
                signature: signature,
                message
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setProfileName(name, network.chainNamespace);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('RegisterAccountNameSuccess');
        } catch (e) {
            const errorMessage = this.parseEnsApiError(e, `Error registering name ${name}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace('RegisterAccountName');
            throw new Error(errorMessage);
        } finally{
            state.loading = false;
        }
    },
    validateName (name) {
        return /^[a-zA-Z0-9-]{4,}$/u.test(name);
    },
    parseEnsApiError (error, defaultError) {
        const ensError = error;
        return ensError?.reasons?.[0]?.description || defaultError;
    }
}; //# sourceMappingURL=EnsController.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/RouterUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouterUtil": (()=>RouterUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
;
;
const RouterUtil = {
    goBackOrCloseModal () {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.history.length > 1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBack();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
    },
    navigateAfterNetworkSwitch () {
        const { history } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state;
        const networkSelectIndex = history.findIndex((name)=>name === 'Networks');
        if (networkSelectIndex >= 1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].goBackToIndex(networkSelectIndex - 1);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
    }
}; //# sourceMappingURL=RouterUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/OptionsUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "OptionsUtil": (()=>OptionsUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
const OptionsUtil = {
    getFeatureValue (key, features) {
        const optionValue = features?.[key];
        if (optionValue === undefined) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES[key];
        }
        return optionValue;
    }
}; //# sourceMappingURL=OptionsUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
// -- Controllers -------------------------------------------------------------
__turbopack_context__.s({});
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OnRampController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OnRampController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AssetController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AssetController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$TransactionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/TransactionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SwapController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SwapController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SendController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SendController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$TooltipController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/TooltipController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$RouterUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/RouterUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$OptionsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/OptionsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$FetchUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/FetchUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/react.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAppKitAccount": (()=>useAppKitAccount),
    "useAppKitNetworkCore": (()=>useAppKitNetworkCore),
    "useDisconnect": (()=>useDisconnect)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
function useAppKitNetworkCore() {
    const { activeCaipNetwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSnapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state);
    return {
        caipNetwork: activeCaipNetwork,
        chainId: activeCaipNetwork?.id,
        caipNetworkId: activeCaipNetwork?.caipNetworkId
    };
}
function useAppKitAccount() {
    const { status, user, preferredAccountType, smartAccountDeployed, allAccounts, socialProvider } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSnapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state);
    const { activeCaipAddress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSnapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state);
    const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
    return {
        allAccounts: allAccounts,
        caipAddress: activeCaipAddress,
        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(activeCaipAddress),
        isConnected: Boolean(activeCaipAddress),
        status,
        embeddedWalletInfo: authConnector ? {
            user,
            authProvider: socialProvider || 'email',
            accountType: preferredAccountType,
            isSmartAccountDeployed: Boolean(smartAccountDeployed)
        } : undefined
    };
}
function useDisconnect() {
    async function disconnect() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect();
    }
    return {
        disconnect
    };
} //# sourceMappingURL=react.js.map
}}),
}]);

//# sourceMappingURL=faa24_%40reown_appkit-core_dist_esm_f2ad51ac._.js.map