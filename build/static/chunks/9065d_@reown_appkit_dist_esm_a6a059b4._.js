(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/9065d_@reown_appkit_dist_esm_a6a059b4._.js", {

"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/W3MFrameProviderSingleton.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mFrameProviderSingleton": (()=>W3mFrameProviderSingleton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameProvider.js [app-client] (ecmascript)");
;
class W3mFrameProviderSingleton {
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a singleton
    constructor(){}
    static getInstance({ projectId, chainId, enableLogger, onTimeout }) {
        if (!W3mFrameProviderSingleton.instance) {
            W3mFrameProviderSingleton.instance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameProvider"]({
                projectId,
                chainId,
                enableLogger,
                onTimeout
            });
        }
        return W3mFrameProviderSingleton.instance;
    }
} //# sourceMappingURL=W3MFrameProviderSingleton.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/store/ProviderUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ProviderUtil": (()=>ProviderUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/vanilla/utils.mjs [app-client] (ecmascript) <locals>");
;
;
const CLEAN_PROVIDERS_STATE = {
    eip155: undefined,
    solana: undefined,
    polkadot: undefined,
    bip122: undefined
};
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proxy"])({
    providers: {
        ...CLEAN_PROVIDERS_STATE
    },
    providerIds: {
        ...CLEAN_PROVIDERS_STATE
    }
});
const ProviderUtil = {
    state,
    subscribeKey (key, callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeKey"])(state, key, callback);
    },
    subscribeProviders (callback) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])(state.providers, ()=>callback(state.providers));
    },
    setProvider (chainNamespace, provider) {
        if (provider) {
            state.providers[chainNamespace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(provider);
        }
    },
    getProvider (chainNamespace) {
        return state.providers[chainNamespace];
    },
    setProviderId (chainNamespace, providerId) {
        if (providerId) {
            state.providerIds[chainNamespace] = providerId;
        }
    },
    getProviderId (chainNamespace) {
        return state.providerIds[chainNamespace];
    },
    reset () {
        state.providers = {
            ...CLEAN_PROVIDERS_STATE
        };
        state.providerIds = {
            ...CLEAN_PROVIDERS_STATE
        };
    },
    resetChain (chainNamespace) {
        state.providers[chainNamespace] = undefined;
        state.providerIds[chainNamespace] = undefined;
    }
}; //# sourceMappingURL=ProviderUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WcConstantsUtil": (()=>WcConstantsUtil)
});
const WcConstantsUtil = {
    ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
    ERROR_CODE_DEFAULT: 5000
}; //# sourceMappingURL=ConstantsUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "defineChain": (()=>defineChain)
});
function defineChain(chain) {
    return {
        formatters: undefined,
        fees: undefined,
        serializers: undefined,
        ...chain
    };
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solana.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "solana": (()=>solana)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const solana = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    name: 'Solana',
    network: 'solana-mainnet',
    nativeCurrency: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Solscan',
            url: 'https://solscan.io'
        }
    },
    testnet: false,
    chainNamespace: 'solana',
    caipNetworkId: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    deprecatedCaipNetworkId: 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ'
}); //# sourceMappingURL=solana.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaDevnet.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "solanaDevnet": (()=>solanaDevnet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const solanaDevnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    name: 'Solana Devnet',
    network: 'solana-devnet',
    nativeCurrency: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Solscan',
            url: 'https://solscan.io'
        }
    },
    testnet: true,
    chainNamespace: 'solana',
    caipNetworkId: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    deprecatedCaipNetworkId: 'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K'
}); //# sourceMappingURL=solanaDevnet.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaTestnet.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "solanaTestnet": (()=>solanaTestnet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const solanaTestnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
    name: 'Solana Testnet',
    network: 'solana-testnet',
    nativeCurrency: {
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    blockExplorers: {
        default: {
            name: 'Solscan',
            url: 'https://solscan.io'
        }
    },
    testnet: true,
    chainNamespace: 'solana',
    caipNetworkId: 'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z'
}); //# sourceMappingURL=solanaTestnet.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
;
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solana.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaDevnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaTestnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaTestnet.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/bitcoin.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "bitcoin": (()=>bitcoin),
    "bitcoinTestnet": (()=>bitcoinTestnet)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
;
const bitcoin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '000000000019d6689c085ae165831e93',
    caipNetworkId: 'bip122:000000000019d6689c085ae165831e93',
    chainNamespace: 'bip122',
    name: 'Bitcoin',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    }
});
const bitcoinTestnet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    id: '000000000933ea01ad0ee984209779ba',
    caipNetworkId: 'bip122:000000000933ea01ad0ee984209779ba',
    chainNamespace: 'bip122',
    name: 'Bitcoin Testnet',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.walletconnect.org/v1'
            ]
        }
    },
    testnet: true
}); //# sourceMappingURL=bitcoin.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
// -- Networks ---------------------------------------------------------------
__turbopack_context__.s({});
;
;
;
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$bitcoin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/bitcoin.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WcHelpersUtil": (()=>WcHelpersUtil)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solana.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/solana/solanaDevnet.js [app-client] (ecmascript)");
;
;
const WcHelpersUtil = {
    getMethodsByChainNamespace (chainNamespace) {
        switch(chainNamespace){
            case 'solana':
                return [
                    'solana_signMessage',
                    'solana_signTransaction',
                    'solana_requestAccounts',
                    'solana_getAccounts',
                    'solana_signAllTransactions',
                    'solana_signAndSendTransaction'
                ];
            case 'eip155':
                return [
                    'personal_sign',
                    'eth_sign',
                    'eth_signTransaction',
                    'eth_signTypedData',
                    'eth_signTypedData_v3',
                    'eth_signTypedData_v4',
                    'eth_sendRawTransaction',
                    'eth_sendTransaction',
                    'wallet_getCapabilities',
                    'wallet_sendCalls',
                    'wallet_showCallsStatus',
                    'wallet_getCallsStatus',
                    'wallet_grantPermissions',
                    'wallet_revokePermissions',
                    'wallet_switchEthereumChain',
                    //EIP-7811
                    'wallet_getAssets'
                ];
            case 'bip122':
                return [
                    'sendTransfer',
                    'signMessage',
                    'signPsbt',
                    'getAccountAddresses'
                ];
            default:
                return [];
        }
    },
    createNamespaces (caipNetworks) {
        return caipNetworks.reduce((acc, chain)=>{
            const { id, chainNamespace, rpcUrls } = chain;
            const rpcUrl = rpcUrls.default.http[0];
            const methods = this.getMethodsByChainNamespace(chainNamespace);
            if (!acc[chainNamespace]) {
                acc[chainNamespace] = {
                    methods,
                    events: [
                        'accountsChanged',
                        'chainChanged'
                    ],
                    chains: [],
                    rpcMap: {}
                };
            }
            const caipNetworkId = `${chainNamespace}:${id}`;
            // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
            const namespace = acc[chainNamespace];
            namespace.chains.push(caipNetworkId);
            // Workaround for wallets that only support deprecated Solana network ID
            switch(caipNetworkId){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solana"].caipNetworkId:
                    namespace.chains.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solana$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solana"].deprecatedCaipNetworkId);
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solanaDevnet"].caipNetworkId:
                    namespace.chains.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$solana$2f$solanaDevnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solanaDevnet"].deprecatedCaipNetworkId);
                    break;
                default:
            }
            if (namespace?.rpcMap && rpcUrl) {
                namespace.rpcMap[id] = rpcUrl;
            }
            return acc;
        }, {});
    },
    resolveReownName: async (name)=>{
        const wcNameAddress = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnsController"].resolveName(name);
        const networkNameAddresses = Object.values(wcNameAddress?.addresses) || [];
        return networkNameAddresses[0]?.address || false;
    },
    getChainsFromNamespaces (namespaces = {}) {
        return Object.values(namespaces).flatMap((namespace)=>{
            const chains = namespace.chains || [];
            const accountsChains = namespace.accounts.map((account)=>{
                const [chainNamespace, chainId] = account.split(':');
                return `${chainNamespace}:${chainId}`;
            });
            return Array.from(new Set([
                ...chains,
                ...accountsChains
            ]));
        });
    },
    isSessionEventData (data) {
        return typeof data === 'object' && data !== null && 'id' in data && 'topic' in data && 'params' in data && typeof data.params === 'object' && data.params !== null && 'chainId' in data.params && 'event' in data.params && typeof data.params.event === 'object' && data.params.event !== null;
    }
}; //# sourceMappingURL=HelpersUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/TypesUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=TypesUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
;
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$TypesUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/TypesUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WalletConnectConnector": (()=>WalletConnectConnector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$universal$2d$provider$40$2$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+universal-provider@2.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SIWXUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
;
;
;
;
;
class WalletConnectConnector {
    constructor({ provider, caipNetworks, namespace }){
        this.id = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
        this.name = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorNamesMap[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT];
        this.type = 'WALLET_CONNECT';
        this.imageId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT];
        this.caipNetworks = caipNetworks;
        this.provider = provider;
        this.chain = namespace;
    }
    get chains() {
        return this.caipNetworks;
    }
    async connectWalletConnect() {
        const isAuthenticated = await this.authenticate();
        if (!isAuthenticated) {
            await this.provider.connect({
                optionalNamespaces: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].createNamespaces(this.caipNetworks)
            });
        }
        return {
            clientId: await this.provider.client.core.crypto.getClientId(),
            session: this.provider.session
        };
    }
    async disconnect() {
        await this.provider.disconnect();
    }
    async authenticate() {
        const chains = this.chains.map((network)=>network.caipNetworkId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIWXUtil"].universalProviderAuthenticate({
            universalProvider: this.provider,
            chains,
            methods: OPTIONAL_METHODS
        });
    }
}
const OPTIONAL_METHODS = [
    'eth_accounts',
    'eth_requestAccounts',
    'eth_sendRawTransaction',
    'eth_sign',
    'eth_signTransaction',
    'eth_signTypedData',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
    'eth_sendTransaction',
    'personal_sign',
    'wallet_switchEthereumChain',
    'wallet_addEthereumChain',
    'wallet_getPermissions',
    'wallet_requestPermissions',
    'wallet_registerOnboarding',
    'wallet_watchAsset',
    'wallet_scanQRCode',
    // EIP-5792
    'wallet_getCallsStatus',
    'wallet_sendCalls',
    'wallet_getCapabilities',
    // EIP-7715
    'wallet_grantPermissions',
    'wallet_revokePermissions',
    //EIP-7811
    'wallet_getAssets'
]; //# sourceMappingURL=WalletConnectConnector.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/ChainAdapterBlueprint.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AdapterBlueprint": (()=>AdapterBlueprint)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$universal$2d$provider$40$2$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+universal-provider@2.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)");
;
;
;
;
;
;
class AdapterBlueprint {
    /**
     * Creates an instance of AdapterBlueprint.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */ constructor(params){
        this.availableConnectors = [];
        this.eventListeners = new Map();
        if (params) {
            this.construct(params);
        }
    }
    /**
     * Initializes the adapter with the given parameters.
     * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
     */ construct(params) {
        this.caipNetworks = params.networks;
        this.projectId = params.projectId;
        this.namespace = params.namespace;
    }
    /**
     * Gets the available connectors.
     * @returns {Connector[]} An array of available connectors
     */ get connectors() {
        return this.availableConnectors;
    }
    /**
     * Gets the supported networks.
     * @returns {CaipNetwork[]} An array of supported networks
     */ get networks() {
        return this.caipNetworks || [];
    }
    /**
     * Sets the auth provider.
     * @param {W3mFrameProvider} authProvider - The auth provider instance
     */ setAuthProvider(authProvider) {
        this.addConnector({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
            type: 'AUTH',
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_NAMES.AUTH,
            provider: authProvider,
            imageId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresetsUtil"].ConnectorImageIds[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH],
            chain: this.namespace,
            chains: []
        });
    }
    /**
     * Adds one or more connectors to the available connectors list.
     * @param {...Connector} connectors - The connectors to add
     */ addConnector(...connectors) {
        const connectorsAdded = new Set();
        this.availableConnectors = [
            ...connectors,
            ...this.availableConnectors
        ].filter((connector)=>{
            if (connectorsAdded.has(connector.id)) {
                return false;
            }
            connectorsAdded.add(connector.id);
            return true;
        });
        this.emit('connectors', this.availableConnectors);
    }
    setStatus(status, chainNamespace) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setStatus(status, chainNamespace);
    }
    /**
     * Adds an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
     */ on(eventName, callback) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, new Set());
        }
        this.eventListeners.get(eventName)?.add(callback);
    }
    /**
     * Removes an event listener for a specific event.
     * @template T
     * @param {T} eventName - The name of the event
     * @param {EventCallback<T>} callback - The callback function to be removed
     */ off(eventName, callback) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
        }
    }
    /**
     * Removes all event listeners.
     */ removeAllEventListeners() {
        this.eventListeners.forEach((listeners)=>{
            listeners.clear();
        });
    }
    /**
     * Emits an event with the given name and optional data.
     * @template T
     * @param {T} eventName - The name of the event to emit
     * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
     */ emit(eventName, data) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.forEach((callback)=>callback(data));
        }
    }
    /**
     * Connects to WalletConnect.
     * @param {number | string} [_chainId] - Optional chain ID to connect to
     */ async connectWalletConnect(_chainId) {
        const connector = this.getWalletConnectConnector();
        const result = await connector.connectWalletConnect();
        return {
            clientId: result.clientId
        };
    }
    /**
     * Switches the network.
     * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
     */ async switchNetwork(params) {
        const { caipNetwork, providerType } = params;
        if (!params.provider) {
            return;
        }
        const provider = 'provider' in params.provider ? params.provider.provider : params.provider;
        if (providerType === 'WALLET_CONNECT') {
            ;
            provider.setDefaultChain(caipNetwork.caipNetworkId);
            return;
        }
        if (provider && providerType === 'AUTH') {
            const authProvider = provider;
            await authProvider.switchNetwork(caipNetwork.caipNetworkId);
            const user = await authProvider.getUser({
                chainId: caipNetwork.caipNetworkId,
                preferredAccountType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.defaultAccountTypes[caipNetwork.chainNamespace]
            });
            this.emit('switchNetwork', user);
        }
    }
    getWalletConnectConnector() {
        const connector = this.connectors.find((c)=>c instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectConnector"]);
        if (!connector) {
            throw new Error('WalletConnectConnector not found');
        }
        return connector;
    }
} //# sourceMappingURL=ChainAdapterBlueprint.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/universal-adapter/client.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "UniversalAdapter": (()=>UniversalAdapter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bs58@6.0.0/node_modules/bs58/src/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.23.4_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/ChainAdapterBlueprint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
class UniversalAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdapterBlueprint"] {
    setUniversalProvider(universalProvider) {
        this.addConnector(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnectConnector"]({
            provider: universalProvider,
            caipNetworks: this.caipNetworks || [],
            namespace: this.namespace
        }));
    }
    async connect(params) {
        return Promise.resolve({
            id: 'WALLET_CONNECT',
            type: 'WALLET_CONNECT',
            chainId: Number(params.chainId),
            provider: this.provider,
            address: ''
        });
    }
    async disconnect() {
        try {
            const connector = this.getWalletConnectConnector();
            await connector.disconnect();
        } catch (error) {
            console.warn('UniversalAdapter:disconnect - error', error);
        }
    }
    async getAccounts({ namespace }) {
        const provider = this.provider;
        const addresses = provider?.session?.namespaces?.[namespace]?.accounts?.map((account)=>{
            const [, , address] = account.split(':');
            return address;
        }).filter((address, index, self)=>self.indexOf(address) === index) || [];
        return Promise.resolve({
            accounts: addresses.map((address)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(namespace, address, namespace === 'bip122' ? 'payment' : 'eoa'))
        });
    }
    async syncConnectors() {
        return Promise.resolve();
    }
    async getBalance(params) {
        const isBalanceSupported = params.caipNetwork && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].BALANCE_SUPPORTED_CHAINS.includes(params.caipNetwork?.chainNamespace);
        if (!isBalanceSupported || params.caipNetwork?.testnet) {
            return {
                balance: '0.00',
                symbol: params.caipNetwork?.nativeCurrency.symbol || ''
            };
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.balanceLoading && params.chainId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id) {
            return {
                balance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.balance || '0.00',
                symbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.balanceSymbol || ''
            };
        }
        const balances = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].fetchTokenBalance();
        const balance = balances.find((b)=>b.chainId === `${params.caipNetwork?.chainNamespace}:${params.chainId}` && b.symbol === params.caipNetwork?.nativeCurrency.symbol);
        return {
            balance: balance?.quantity.numeric || '0.00',
            symbol: balance?.symbol || params.caipNetwork?.nativeCurrency.symbol || ''
        };
    }
    async signMessage(params) {
        const { provider, message, address } = params;
        if (!provider) {
            throw new Error('UniversalAdapter:signMessage - provider is undefined');
        }
        let signature = '';
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.SOLANA) {
            const response = await provider.request({
                method: 'solana_signMessage',
                params: {
                    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bs58$40$6$2e$0$2e$0$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(new TextEncoder().encode(message)),
                    pubkey: address
                }
            }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
            signature = response.signature;
        } else {
            signature = await provider.request({
                method: 'personal_sign',
                params: [
                    message,
                    address
                ]
            }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.caipNetworkId);
        }
        return {
            signature
        };
    }
    // -- Transaction methods ---------------------------------------------------
    /**
     *
     * These methods are supported only on `wagmi` and `ethers` since the Solana SDK does not support them in the same way.
     * These function definition is to have a type parity between the clients. Currently not in use.
     */ async estimateGas() {
        return Promise.resolve({
            gas: BigInt(0)
        });
    }
    async getProfile() {
        return Promise.resolve({
            profileImage: '',
            profileName: ''
        });
    }
    async sendTransaction() {
        return Promise.resolve({
            hash: ''
        });
    }
    async writeContract() {
        return Promise.resolve({
            hash: ''
        });
    }
    async getEnsAddress() {
        return Promise.resolve({
            address: false
        });
    }
    parseUnits() {
        return 0n;
    }
    formatUnits() {
        return '0';
    }
    async getCapabilities() {
        return Promise.resolve({});
    }
    async grantPermissions() {
        return Promise.resolve({});
    }
    async revokePermissions() {
        return Promise.resolve('0x');
    }
    async syncConnection() {
        return Promise.resolve({
            id: 'WALLET_CONNECT',
            type: 'WALLET_CONNECT',
            chainId: 1,
            provider: this.provider,
            address: ''
        });
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async switchNetwork(params) {
        const { caipNetwork } = params;
        const connector = this.getWalletConnectConnector();
        if (caipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
            try {
                await connector.provider?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(caipNetwork.id)
                        }
                    ]
                });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (switchError) {
                if (switchError.code === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_CODE_UNRECOGNIZED_CHAIN_ID || switchError.code === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_CODE_DEFAULT || switchError?.data?.originalError?.code === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcConstantsUtil"].ERROR_CODE_UNRECOGNIZED_CHAIN_ID) {
                    try {
                        await connector.provider?.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(caipNetwork.id),
                                    rpcUrls: [
                                        caipNetwork?.rpcUrls['chainDefault']?.http
                                    ],
                                    chainName: caipNetwork.name,
                                    nativeCurrency: caipNetwork.nativeCurrency,
                                    blockExplorerUrls: [
                                        caipNetwork.blockExplorers?.default.url
                                    ]
                                }
                            ]
                        });
                    } catch (error) {
                        throw new Error('Chain is not supported');
                    }
                }
            }
        }
        connector.provider.setDefaultChain(caipNetwork.caipNetworkId);
    }
    getWalletConnectProvider() {
        const connector = this.connectors.find((c)=>c.type === 'WALLET_CONNECT');
        const provider = connector?.provider;
        return provider;
    }
} //# sourceMappingURL=client.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AppKit": (()=>AppKit)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$universal$2d$provider$40$2$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+universal-provider@2.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AccountController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/AlertController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/AssetUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/BlockchainApiController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectionController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ConnectorController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EnsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/EventsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/PublicStateController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/StorageUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ThemeController.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/CaipNetworkUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/ErrorUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$LoggerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/LoggerUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/W3MFrameProviderSingleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/store/ProviderUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$universal$2d$adapter$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/universal-adapter/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
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
// -- Helpers -------------------------------------------------------------------
let isInitialized = false;
class AppKit {
    constructor(options){
        this.chainNamespaces = [];
        this.initPromise = undefined;
        this.reportedAlertErrors = {};
        this.setStatus = (status, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectionStatus(status);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setStatus(status, chain);
        };
        this.getIsConnectedState = ()=>Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress);
        this.setAllAccounts = (addresses, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setAllAccounts(addresses, chain);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setHasMultipleAddresses(addresses?.length > 1);
        };
        this.addAddressLabel = (address, label, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].addAddressLabel(address, label, chain);
        };
        this.removeAddressLabel = (address, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].removeAddressLabel(address, chain);
        };
        this.getCaipAddress = (chainNamespace)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace || !chainNamespace) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountProp('caipAddress', chainNamespace);
        };
        this.getAddressByChainNamespace = (chainNamespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountProp('address', chainNamespace);
        this.getAddress = (chainNamespace)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace || !chainNamespace) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAccountProp('address', chainNamespace);
        };
        this.getProvider = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(namespace);
        this.getProviderType = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providerIds[namespace];
        this.getPreferredAccountType = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType;
        this.setCaipAddress = (caipAddress, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setCaipAddress(caipAddress, chain);
        };
        this.setBalance = (balance, balanceSymbol, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setBalance(balance, balanceSymbol, chain);
        };
        this.setProfileName = (profileName, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setProfileName(profileName, chain);
        };
        this.setProfileImage = (profileImage, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setProfileImage(profileImage, chain);
        };
        this.setUser = (user)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setUser(user);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
            }
        };
        this.resetAccount = (chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].resetAccount(chain);
        };
        this.setCaipNetwork = (caipNetwork)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveCaipNetwork(caipNetwork);
        };
        this.getCaipNetwork = (chainNamespace)=>{
            if (chainNamespace) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworks(chainNamespace).filter((c)=>c.chainNamespace === chainNamespace)?.[0];
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork || this.defaultCaipNetwork;
        };
        this.getCaipNetworkId = ()=>{
            const network = this.getCaipNetwork();
            if (network) {
                return network.id;
            }
            return undefined;
        };
        this.getCaipNetworks = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getRequestedCaipNetworks(namespace);
        this.getActiveChainNamespace = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        this.setRequestedCaipNetworks = (requestedCaipNetworks, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setRequestedCaipNetworks(requestedCaipNetworks, chain);
        };
        this.getApprovedCaipNetworkIds = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getAllApprovedCaipNetworkIds();
        this.setApprovedCaipNetworksData = (namespace)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setApprovedCaipNetworksData(namespace);
        this.resetNetwork = (namespace)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].resetNetwork(namespace);
        };
        this.setConnectors = (connectors)=>{
            const allConnectors = [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors(),
                ...connectors
            ];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setConnectors(allConnectors);
        };
        this.addConnector = (connector)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].addConnector(connector);
        };
        this.getConnectors = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors();
        this.resetWcConnection = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
        };
        this.fetchIdentity = (request)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].fetchIdentity(request);
        this.setAddressExplorerUrl = (addressExplorerUrl, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setAddressExplorerUrl(addressExplorerUrl, chain);
        };
        this.setSmartAccountDeployed = (isDeployed, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setSmartAccountDeployed(isDeployed, chain);
        };
        this.setConnectedWalletInfo = (connectedWalletInfo, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setConnectedWalletInfo(connectedWalletInfo, chain);
        };
        this.setSmartAccountEnabledNetworks = (smartAccountEnabledNetworks, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setSmartAccountEnabledNetworks(smartAccountEnabledNetworks, chain);
        };
        this.setPreferredAccountType = (preferredAccountType, chain)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].setPreferredAccountType(preferredAccountType, chain);
        };
        this.getReownName = (address)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EnsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnsController"].getNamesForAddress(address);
        this.setEIP6963Enabled = (enabled)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEIP6963Enabled(enabled);
        };
        this.setClientId = (clientId)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].setClientId(clientId);
        };
        this.getConnectorImage = (connector)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssetUtil"].getConnectorImage(connector);
        this.handleUnsafeRPCRequest = ()=>{
            if (this.isOpen()) {
                // If we are on the modal but there is no transaction stack, close the modal
                if (this.isTransactionStackEmpty()) {
                    return;
                }
                // Check if we need to replace or redirect
                this.redirect('ApproveTransaction');
            } else {
                // If called from outside the modal, open ApproveTransaction
                this.open({
                    view: 'ApproveTransaction'
                });
            }
        };
        this.options = options;
        this.version = options.sdkVersion;
        this.caipNetworks = this.extendCaipNetworks(options);
        this.chainNamespaces = [
            ...new Set(this.caipNetworks?.map((caipNetwork)=>caipNetwork.chainNamespace))
        ];
        this.defaultCaipNetwork = this.extendDefaultCaipNetwork(options);
        this.chainAdapters = this.createAdapters(options.adapters);
        this.initialize(options);
        this.sendInitializeEvent(options);
    }
    static getInstance() {
        return this.instance;
    }
    async initialize(options) {
        this.initControllers(options);
        await this.initChainAdapters();
        await this.injectModalUi();
        await this.syncExistingConnection();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].set({
            initialized: true
        });
    }
    sendInitializeEvent(options) {
        const { ...optionsCopy } = options;
        delete optionsCopy.adapters;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].sendEvent({
            type: 'track',
            event: 'INITIALIZE',
            properties: {
                ...optionsCopy,
                networks: options.networks.map((n)=>n.id),
                siweConfig: {
                    options: options.siweConfig?.options || {}
                }
            }
        });
    }
    // -- Public -------------------------------------------------------------------
    async open(options) {
        await this.injectModalUi();
        if (options?.uri && this.universalProvider) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setUri(options.uri);
        }
        if (options?.namespace) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].setFilterByNamespace(options.namespace);
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].open(options);
    }
    async close() {
        await this.injectModalUi();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].close();
    }
    setLoading(loading) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].setLoading(loading);
    }
    // -- Adapter Methods ----------------------------------------------------------
    getError() {
        return '';
    }
    getChainId() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id;
    }
    switchNetwork(appKitNetwork) {
        const network = this.caipNetworks?.find((n)=>n.id === appKitNetwork.id);
        if (!network) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, 'error');
            return;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].switchActiveNetwork(network);
    }
    getWalletProvider() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providers[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain] : null;
    }
    getWalletProviderType() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providerIds[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain] : null;
    }
    subscribeProviders(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].subscribeProviders(callback);
    }
    getThemeMode() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeMode;
    }
    getThemeVariables() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeVariables;
    }
    setThemeMode(themeMode) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeMode(themeMode);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setColorTheme"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeMode);
    }
    setTermsConditionsUrl(termsConditionsUrl) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setTermsConditionsUrl(termsConditionsUrl);
    }
    setPrivacyPolicyUrl(privacyPolicyUrl) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setPrivacyPolicyUrl(privacyPolicyUrl);
    }
    setThemeVariables(themeVariables) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeVariables(themeVariables);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setThemeVariables"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].state.themeVariables);
    }
    subscribeTheme(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].subscribe(callback);
    }
    getWalletInfo() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.connectedWalletInfo;
    }
    subscribeAccount(callback) {
        function updateVal() {
            const authConnector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getAuthConnector();
            callback({
                allAccounts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.allAccounts,
                caipAddress: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress,
                address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress),
                isConnected: Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress),
                status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.status,
                embeddedWalletInfo: authConnector ? {
                    user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.user,
                    authProvider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.socialProvider || 'email',
                    accountType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.preferredAccountType,
                    isSmartAccountDeployed: Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.smartAccountDeployed)
                } : undefined
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribe(updateVal);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].subscribe(updateVal);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].subscribe(updateVal);
    }
    subscribeNetwork(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribe(({ activeCaipNetwork })=>{
            callback({
                caipNetwork: activeCaipNetwork,
                chainId: activeCaipNetwork?.id,
                caipNetworkId: activeCaipNetwork?.caipNetworkId
            });
        });
    }
    subscribeWalletInfo(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].subscribeKey('connectedWalletInfo', callback);
    }
    subscribeShouldUpdateToAddress(callback) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].subscribeKey('shouldUpdateToAddress', callback);
    }
    subscribeCaipNetworkChange(callback) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipNetwork', callback);
    }
    getState() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].state;
    }
    subscribeState(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$PublicStateController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicStateController"].subscribe(callback);
    }
    showErrorMessage(message) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showError(message);
    }
    showSuccessMessage(message) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnackController"].showSuccess(message);
    }
    getEvent() {
        return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].state
        };
    }
    subscribeEvents(callback) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$EventsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventsController"].subscribe(callback);
    }
    replace(route) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].replace(route);
    }
    redirect(route) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].push(route);
    }
    popTransactionStack(cancel) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].popTransactionStack(cancel);
    }
    isOpen() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModalController"].state.open;
    }
    isTransactionStackEmpty() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterController"].state.transactionStack.length === 0;
    }
    updateFeatures(newFeatures) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures(newFeatures);
    }
    updateOptions(newOptions) {
        const currentOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state || {};
        const updatedOptions = {
            ...currentOptions,
            ...newOptions
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setOptions(updatedOptions);
    }
    setConnectMethodsOrder(connectMethodsOrder) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setConnectMethodsOrder(connectMethodsOrder);
    }
    setWalletFeaturesOrder(walletFeaturesOrder) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setWalletFeaturesOrder(walletFeaturesOrder);
    }
    setCollapseWallets(collapseWallets) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setCollapseWallets(collapseWallets);
    }
    setSocialsOrder(socialsOrder) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSocialsOrder(socialsOrder);
    }
    async disconnect() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].disconnect();
    }
    getConnectMethodsOrder() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletUtil"].getConnectOrderMethod(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.features, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectors());
    }
    /**
     * Removes an adapter from the AppKit.
     * @param namespace - The namespace of the adapter to remove.
     */ removeAdapter(namespace) {
        const isConnected = this.getIsConnectedState();
        const adapter = this.getAdapter(namespace);
        if (!adapter || !this.chainAdapters || isConnected) {
            return;
        }
        const newCaipNetworks = this.caipNetworks?.filter((network)=>network.chainNamespace !== namespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].removeAdapter(namespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectorController"].removeAdapter(namespace);
        this.chainNamespaces = this.chainNamespaces.filter((n)=>n !== namespace);
        this.caipNetworks = newCaipNetworks;
        adapter.removeAllEventListeners();
        Reflect.deleteProperty(this.chainAdapters, namespace);
    }
    /**
     * Adds an adapter to the AppKit.
     * @param adapter - The adapter instance.
     * @param networks - The list of networks that this adapter supports / uses.
     */ addAdapter(adapter, networks) {
        const namespace = adapter.namespace;
        if (!this.connectionControllerClient || !this.networkControllerClient) {
            return;
        }
        if (!this.chainAdapters || !namespace) {
            return;
        }
        const extendedAdapterNetworks = this.extendCaipNetworks({
            ...this.options,
            networks
        });
        this.caipNetworks = [
            ...this.caipNetworks || [],
            ...extendedAdapterNetworks
        ];
        this.createAdapter(adapter);
        this.initChainAdapter(namespace);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].addAdapter(adapter, {
            connectionControllerClient: this.connectionControllerClient,
            networkControllerClient: this.networkControllerClient
        }, extendedAdapterNetworks);
    }
    /**
     * Adds a network to an existing adapter in AppKit.
     * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
     * @param network - The network configuration to add
     * @throws Error if adapter for namespace doesn't exist
     */ addNetwork(namespace, network) {
        if (this.chainAdapters && !this.chainAdapters[namespace]) {
            throw new Error(`Adapter for namespace ${namespace} doesn't exist`);
        }
        const extendedNetwork = this.extendCaipNetwork(network, this.options);
        if (this.caipNetworks && !this.caipNetworks?.find((n)=>n.id === extendedNetwork.id)) {
            this.caipNetworks.push(extendedNetwork);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].addNetwork(extendedNetwork);
        }
    }
    /**
     * Removes a network from an existing adapter in AppKit.
     * @param namespace - The chain namespace the network belongs to
     * @param networkId - The network ID to remove
     * @throws Error if adapter for namespace doesn't exist or if removing last network
     */ removeNetwork(namespace, networkId) {
        if (this.chainAdapters && !this.chainAdapters[namespace]) {
            throw new Error(`Adapter for namespace ${namespace} doesn't exist`);
        }
        const networkToRemove = this.caipNetworks?.find((n)=>n.id === networkId);
        if (!networkToRemove) {
            throw new Error(`Network with ID ${networkId} not found`);
        }
        if (!this.caipNetworks) {
            return;
        }
        const remainingAllNetworks = this.caipNetworks.filter((n)=>n.id !== networkId);
        const remainingNamespaceNetworks = this.caipNetworks.filter((n)=>n.id !== networkId && n.chainNamespace === namespace);
        if (!remainingNamespaceNetworks?.length) {
            throw new Error('Cannot remove last network for a namespace');
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].removeNetwork(namespace, networkId);
        this.caipNetworks = [
            ...remainingAllNetworks
        ];
    }
    // -- Private ------------------------------------------------------------------
    initializeOptionsController(options) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setDebug(options.debug !== false);
        if (!options.projectId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, 'error');
            return;
        }
        // On by default
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableWalletConnect(options.enableWalletConnect !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableWalletGuide(options.enableWalletGuide !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableWallets(options.enableWallets !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEIP6963Enabled(options.enableEIP6963 !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableAuthLogger(options.enableAuthLogger !== false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSdkVersion(options.sdkVersion);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setProjectId(options.projectId);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableEmbedded(options.enableEmbedded);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setAllWallets(options.allWallets);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setIncludeWalletIds(options.includeWalletIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setExcludeWalletIds(options.excludeWalletIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeaturedWalletIds(options.featuredWalletIds);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setTokens(options.tokens);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setTermsConditionsUrl(options.termsConditionsUrl);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setPrivacyPolicyUrl(options.privacyPolicyUrl);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setCustomWallets(options.customWallets);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setFeatures(options.features);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setAllowUnsupportedChain(options.allowUnsupportedChain);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setDefaultAccountTypes(options.defaultAccountTypes);
        const defaultMetaData = this.getDefaultMetaData();
        if (!options.metadata && defaultMetaData) {
            options.metadata = defaultMetaData;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setMetadata(options.metadata);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setDisableAppend(options.disableAppend);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setEnableEmbedded(options.enableEmbedded);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSIWX(options.siwx);
        const evmAdapter = options.adapters?.find((adapter)=>adapter.namespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM);
        // Set the SIWE client for EVM chains
        if (evmAdapter) {
            if (options.siweConfig) {
                if (options.siwx) {
                    throw new Error('Cannot set both `siweConfig` and `siwx` options');
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setSIWX(options.siweConfig.mapToSIWX());
            }
        }
    }
    initializeThemeController(options) {
        if (options.themeMode) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeMode(options.themeMode);
        }
        if (options.themeVariables) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].setThemeVariables(options.themeVariables);
        }
    }
    initializeChainController(options) {
        if (!this.connectionControllerClient || !this.networkControllerClient) {
            throw new Error('ConnectionControllerClient and NetworkControllerClient must be set');
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].initialize(options.adapters ?? [], this.caipNetworks, {
            connectionControllerClient: this.connectionControllerClient,
            networkControllerClient: this.networkControllerClient
        });
        const network = this.getDefaultNetwork();
        if (network) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveCaipNetwork(network);
        }
    }
    async initializeBlockchainApiController(options) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$BlockchainApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockchainApiController"].getSupportedNetworks({
            projectId: options.projectId
        });
    }
    initControllers(options) {
        this.initializeOptionsController(options);
        this.initializeChainController(options);
        this.initializeThemeController(options);
        this.initializeBlockchainApiController(options);
        if (options.excludeWalletIds) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiController"].initializeExcludedWalletRdns({
                ids: options.excludeWalletIds
            });
        }
    }
    getDefaultMetaData() {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            return {
                name: document.getElementsByTagName('title')?.[0]?.textContent || '',
                description: document.querySelector('meta[property="og:description"]')?.content || '',
                url: window.location.origin,
                icons: [
                    document.querySelector('link[rel~="icon"]')?.href || ''
                ]
            };
        }
        return null;
    }
    setUnsupportedNetwork(chainId) {
        const namespace = this.getActiveChainNamespace();
        if (namespace) {
            const unsupportedNetwork = this.getUnsupportedNetwork(`${namespace}:${chainId}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setActiveCaipNetwork(unsupportedNetwork);
        }
    }
    extendCaipNetwork(network, options) {
        const extendedNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetwork(network, {
            customNetworkImageUrls: options.chainImages,
            projectId: options.projectId
        });
        return extendedNetwork;
    }
    extendCaipNetworks(options) {
        const extendedNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetworks(options.networks, {
            customNetworkImageUrls: options.chainImages,
            projectId: options.projectId
        });
        return extendedNetworks;
    }
    extendDefaultCaipNetwork(options) {
        const defaultNetwork = options.networks.find((n)=>n.id === options.defaultNetwork?.id);
        const extendedNetwork = defaultNetwork ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$CaipNetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CaipNetworksUtil"].extendCaipNetwork(defaultNetwork, {
            customNetworkImageUrls: options.chainImages,
            projectId: options.projectId
        }) : undefined;
        return extendedNetwork;
    }
    createClients() {
        this.connectionControllerClient = {
            connectWalletConnect: async ()=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!adapter) {
                    throw new Error('Adapter not found');
                }
                const result = await adapter.connectWalletConnect(this.getCaipNetwork()?.id);
                this.close();
                this.setClientId(result?.clientId || null);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedNamespaces([
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.chains.keys()
                ]);
                await this.syncWalletConnectAccount();
            },
            connectExternal: async ({ id, info, type, provider, chain, caipNetwork })=>{
                const activeChain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const chainToUse = chain || activeChain;
                const adapter = this.getAdapter(chainToUse);
                if (chain && chain !== activeChain && !caipNetwork) {
                    const toConnectNetwork = this.caipNetworks?.find((network)=>network.chainNamespace === chain);
                    if (toConnectNetwork) {
                        this.setCaipNetwork(toConnectNetwork);
                    }
                }
                if (!adapter) {
                    throw new Error('Adapter not found');
                }
                const res = await adapter.connect({
                    id,
                    info,
                    type,
                    provider,
                    chainId: caipNetwork?.id || this.getCaipNetwork()?.id,
                    rpcUrl: caipNetwork?.rpcUrls?.default?.http?.[0] || this.getCaipNetwork()?.rpcUrls?.default?.http?.[0]
                });
                if (!res) {
                    return;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(chainToUse);
                this.syncProvider({
                    ...res,
                    chainNamespace: chainToUse
                });
                await this.syncAccount({
                    ...res,
                    chainNamespace: chainToUse
                });
                const { accounts } = await adapter.getAccounts({
                    namespace: chainToUse,
                    id
                });
                this.setAllAccounts(accounts, chainToUse);
            },
            reconnectExternal: async ({ id, info, type, provider })=>{
                const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const adapter = this.getAdapter(namespace);
                if (adapter?.reconnect) {
                    await adapter?.reconnect({
                        id,
                        info,
                        type,
                        provider,
                        chainId: this.getCaipNetwork()?.id
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(namespace);
                }
            },
            disconnect: async ()=>{
                const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
                const adapter = this.getAdapter(namespace);
                const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(namespace);
                const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providerIds[namespace];
                await adapter?.disconnect({
                    provider,
                    providerType
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].removeConnectedNamespace(namespace);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].resetChain(namespace);
                this.setUser(undefined);
                this.setStatus('disconnected', namespace);
            },
            checkInstalled: (ids)=>{
                if (!ids) {
                    return Boolean(window.ethereum);
                }
                return ids.some((id)=>Boolean(window.ethereum?.[String(id)]));
            },
            signMessage: async (message)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                const result = await adapter?.signMessage({
                    message,
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain)
                });
                return result?.signature || '';
            },
            sendTransaction: async (args)=>{
                if (args.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
                    const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                    const result = await adapter?.sendTransaction({
                        ...args,
                        provider
                    });
                    return result?.hash || '';
                }
                return '';
            },
            estimateGas: async (args)=>{
                if (args.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
                    const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                    const caipNetwork = this.getCaipNetwork();
                    if (!caipNetwork) {
                        throw new Error('CaipNetwork is undefined');
                    }
                    const result = await adapter?.estimateGas({
                        ...args,
                        provider,
                        caipNetwork
                    });
                    return result?.gas || 0n;
                }
                return 0n;
            },
            getEnsAvatar: async ()=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                const result = await adapter?.getProfile({
                    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                    chainId: Number(this.getCaipNetwork()?.id)
                });
                return result?.profileImage || false;
            },
            getEnsAddress: async (name)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                const caipNetwork = this.getCaipNetwork();
                if (!caipNetwork) {
                    return false;
                }
                const result = await adapter?.getEnsAddress({
                    name,
                    caipNetwork
                });
                return result?.address || false;
            },
            writeContract: async (args)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                const caipNetwork = this.getCaipNetwork();
                const caipAddress = this.getCaipAddress();
                const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (!caipNetwork || !caipAddress) {
                    throw new Error('CaipNetwork or CaipAddress is undefined');
                }
                const result = await adapter?.writeContract({
                    ...args,
                    caipNetwork,
                    provider,
                    caipAddress
                });
                return result?.hash;
            },
            parseUnits: (value, decimals)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                return adapter?.parseUnits({
                    value,
                    decimals
                }) ?? 0n;
            },
            formatUnits: (value, decimals)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                return adapter?.formatUnits({
                    value,
                    decimals
                }) ?? '0';
            },
            getCapabilities: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                await adapter?.getCapabilities(params);
            },
            grantPermissions: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                return await adapter?.grantPermissions(params);
            },
            revokePermissions: async (params)=>{
                const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                if (adapter?.revokePermissions) {
                    return await adapter.revokePermissions(params);
                }
                return '0x';
            }
        };
        this.networkControllerClient = {
            switchCaipNetwork: async (caipNetwork)=>{
                if (!caipNetwork) {
                    return;
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address && caipNetwork.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain) {
                    const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
                    const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providerIds[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain];
                    await adapter?.switchNetwork({
                        caipNetwork,
                        provider,
                        providerType
                    });
                    this.setCaipNetwork(caipNetwork);
                    await this.syncAccount({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                        chainId: caipNetwork.id,
                        chainNamespace: caipNetwork.chainNamespace
                    });
                } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address) {
                    const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providerIds[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain];
                    if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_AUTH) {
                        try {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain = caipNetwork.chainNamespace;
                            await this.connectionControllerClient?.connectExternal?.({
                                id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
                                provider: this.authProvider,
                                chain: caipNetwork.chainNamespace,
                                chainId: caipNetwork.id,
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_AUTH,
                                caipNetwork
                            });
                            this.setCaipNetwork(caipNetwork);
                        } catch (error) {
                            const adapter = this.getAdapter(caipNetwork.chainNamespace);
                            await adapter?.switchNetwork({
                                caipNetwork,
                                provider: this.authProvider,
                                providerType
                            });
                        }
                    } else if (providerType === 'WALLET_CONNECT') {
                        this.setCaipNetwork(caipNetwork);
                        this.syncWalletConnectAccount();
                    } else {
                        this.setCaipNetwork(caipNetwork);
                        const address = this.getAddressByChainNamespace(caipNetwork.chainNamespace);
                        if (address) {
                            this.syncAccount({
                                address,
                                chainId: caipNetwork.id,
                                chainNamespace: caipNetwork.chainNamespace
                            });
                        }
                    }
                } else {
                    this.setCaipNetwork(caipNetwork);
                }
            },
            // eslint-disable-next-line @typescript-eslint/require-await
            getApprovedCaipNetworksData: async ()=>{
                const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state.providerIds[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain];
                if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT) {
                    const namespaces = this.universalProvider?.session?.namespaces;
                    return {
                        /*
                         * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
                         * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
                         * will make it possible to switch to other networks.
                         */ supportsAllNetworks: this.universalProvider?.session?.peer?.metadata.name === 'MetaMask Wallet',
                        approvedCaipNetworkIds: this.getChainsFromNamespaces(namespaces)
                    };
                }
                return {
                    supportsAllNetworks: true,
                    approvedCaipNetworkIds: []
                };
            }
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setClient(this.connectionControllerClient);
    }
    setupAuthConnectorListeners(provider) {
        provider.onRpcRequest((request)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].checkIfRequestExists(request)) {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].checkIfRequestIsSafe(request)) {
                    this.handleUnsafeRPCRequest();
                }
            } else {
                this.open();
                // eslint-disable-next-line no-console
                console.error(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].RPC_METHOD_NOT_ALLOWED_MESSAGE, {
                    method: request.method
                });
                setTimeout(()=>{
                    this.showErrorMessage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
                }, 300);
                provider.rejectRpcRequests();
            }
        });
        provider.onRpcError(()=>{
            const isModalOpen = this.isOpen();
            if (isModalOpen) {
                if (this.isTransactionStackEmpty()) {
                    this.close();
                } else {
                    this.popTransactionStack(true);
                }
            }
        });
        provider.onRpcSuccess((_, request)=>{
            const isSafeRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].checkIfRequestIsSafe(request);
            if (isSafeRequest) {
                return;
            }
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id) {
                this.updateNativeBalance();
            }
            if (this.isTransactionStackEmpty()) {
                this.close();
            } else {
                this.popTransactionStack();
            }
        });
        provider.onNotConnected(()=>{
            const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(namespace);
            const isConnectedWithAuth = connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH;
            if (isConnectedWithAuth) {
                this.setCaipAddress(undefined, namespace);
                this.setLoading(false);
            }
        });
        provider.onConnect(async (user)=>{
            const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
            // To keep backwards compatibility, eip155 chainIds are numbers and not actual caipChainIds
            const caipAddress = namespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM ? `eip155:${user.chainId}:${user.address}` : `${user.chainId}:${user.address}`;
            this.setSmartAccountDeployed(Boolean(user.smartAccountDeployed), namespace);
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(user.address, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address)) {
                this.syncIdentity({
                    address: user.address,
                    chainId: user.chainId,
                    chainNamespace: namespace
                });
            }
            this.setCaipAddress(caipAddress, namespace);
            this.setUser({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.user || {},
                email: user.email
            });
            const preferredAccountType = user.preferredAccountType || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.defaultAccountTypes[namespace];
            this.setPreferredAccountType(preferredAccountType, namespace);
            const userAccounts = user.accounts?.map((account)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(namespace, account.address, account.type || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.defaultAccountTypes[namespace]));
            this.setAllAccounts(userAccounts || [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(namespace, user.address, preferredAccountType)
            ], namespace);
            await provider.getSmartAccountEnabledNetworks();
            this.setLoading(false);
        });
        provider.onSocialConnected(({ userName })=>{
            this.setUser({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.user || {},
                username: userName
            });
        });
        provider.onGetSmartAccountEnabledNetworks((networks)=>{
            this.setSmartAccountEnabledNetworks(networks, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        });
        provider.onSetPreferredAccount(({ address, type })=>{
            if (!address) {
                return;
            }
            this.setPreferredAccountType(type, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        });
    }
    async syncAuthConnector(provider) {
        this.setLoading(true);
        const isLoginEmailUsed = provider.getLoginEmailUsed();
        this.setLoading(isLoginEmailUsed);
        if (isLoginEmailUsed) {
            this.setStatus('connecting', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        }
        const email = provider.getEmail();
        const username = provider.getUsername();
        this.setUser({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state?.user || {},
            username,
            email
        });
        this.setupAuthConnectorListeners(provider);
        const { isConnected } = await provider.isConnected();
        const theme = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeController"].getSnapshot();
        const options = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].getSnapshot();
        provider.syncDappData({
            metadata: options.metadata,
            sdkVersion: options.sdkVersion,
            projectId: options.projectId,
            sdkType: options.sdkType
        });
        provider.syncTheme({
            themeMode: theme.themeMode,
            themeVariables: theme.themeVariables,
            w3mThemeVariables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getW3mThemeVariables"])(theme.themeVariables, theme.themeMode)
        });
        const namespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveNamespace();
        if (namespace) {
            if (isConnected && this.connectionControllerClient?.connectExternal) {
                await this.connectionControllerClient?.connectExternal({
                    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH,
                    info: {
                        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH
                    },
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_AUTH,
                    provider,
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id,
                    chain: namespace
                });
                this.setStatus('connected', namespace);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(namespace) === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
                this.setStatus('disconnected', namespace);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].removeConnectedNamespace(namespace);
            }
        }
        this.setLoading(false);
    }
    listenWalletConnect() {
        if (this.universalProvider) {
            this.universalProvider.on('display_uri', (uri)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].setUri(uri);
            });
            this.universalProvider.on('disconnect', ()=>{
                this.chainNamespaces.forEach((namespace)=>{
                    this.resetAccount(namespace);
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionController"].resetWcConnection();
            });
            this.universalProvider.on('chainChanged', (chainId)=>{
                // eslint-disable-next-line eqeqeq
                const caipNetwork = this.caipNetworks?.find((c)=>c.id == chainId);
                const currentCaipNetwork = this.getCaipNetwork();
                if (!caipNetwork) {
                    this.setUnsupportedNetwork(chainId);
                    return;
                }
                if (currentCaipNetwork?.id !== caipNetwork?.id) {
                    this.setCaipNetwork(caipNetwork);
                }
            });
            this.universalProvider.on('session_event', (callbackData)=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcHelpersUtil"].isSessionEventData(callbackData)) {
                    const { name, data } = callbackData.params.event;
                    if (name === 'accountsChanged' && Array.isArray(data) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isCaipAddress(data[0])) {
                        this.syncAccount(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(data[0]));
                    }
                }
            });
        }
    }
    listenAdapter(chainNamespace) {
        const adapter = this.getAdapter(chainNamespace);
        if (!adapter) {
            return;
        }
        const connectionStatus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectionStatus();
        if (connectionStatus === 'connected') {
            this.setStatus('connecting', chainNamespace);
        } else {
            this.setStatus(connectionStatus, chainNamespace);
        }
        adapter.on('switchNetwork', ({ address, chainId })=>{
            if (chainId && this.caipNetworks?.find((n)=>n.id === chainId || n.caipNetworkId === chainId)) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace && address) {
                    this.syncAccount({
                        address,
                        chainId,
                        chainNamespace
                    });
                } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address) {
                    this.syncAccount({
                        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                        chainId,
                        chainNamespace
                    });
                }
            } else {
                this.setUnsupportedNetwork(chainId);
            }
        });
        adapter.on('disconnect', this.disconnect.bind(this));
        adapter.on('pendingTransactions', ()=>{
            const address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address;
            const activeCaipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
            if (!address || !activeCaipNetwork?.id) {
                return;
            }
            this.updateNativeBalance();
        });
        adapter.on('accountChanged', ({ address, chainId })=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace && chainId) {
                this.syncAccount({
                    address,
                    chainId,
                    chainNamespace
                });
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain === chainNamespace && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id) {
                this.syncAccount({
                    address,
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id,
                    chainNamespace
                });
            }
        });
    }
    async updateNativeBalance() {
        const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        if (adapter && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address) {
            const balance = await adapter.getBalance({
                address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address,
                chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id,
                caipNetwork: this.getCaipNetwork(),
                tokens: this.options.tokens
            });
            this.setBalance(balance.balance, balance.symbol, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        }
    }
    getChainsFromNamespaces(namespaces = {}) {
        return Object.values(namespaces).flatMap((namespace)=>{
            const chains = namespace.chains || [];
            const accountsChains = namespace.accounts.map((account)=>{
                const { chainId, chainNamespace } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(account);
                return `${chainNamespace}:${chainId}`;
            });
            return Array.from(new Set([
                ...chains,
                ...accountsChains
            ]));
        });
    }
    async syncWalletConnectAccount() {
        const adapter = this.getAdapter(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
        this.chainNamespaces.forEach(async (chainNamespace)=>{
            const namespaceAccounts = this.universalProvider?.session?.namespaces?.[chainNamespace]?.accounts || [];
            // We try and find the address for this network in the session object.
            const activeChainId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id;
            const sessionAddress = namespaceAccounts.find((account)=>{
                const { chainId } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(account);
                return chainId === activeChainId?.toString();
            }) || namespaceAccounts[0];
            if (sessionAddress) {
                const caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].validateCaipAddress(sessionAddress);
                const { chainId, address } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(caipAddress);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].setProviderId(chainNamespace, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT);
                if (this.caipNetworks && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork && adapter?.namespace !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM) {
                    const provider = adapter?.getWalletConnectProvider({
                        caipNetworks: this.caipNetworks,
                        provider: this.universalProvider,
                        activeCaipNetwork: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].setProvider(chainNamespace, provider);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].setProvider(chainNamespace, this.universalProvider);
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedConnectorId(chainNamespace, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].addConnectedNamespace(chainNamespace);
                if (adapter?.adapterType === 'wagmi') {
                    try {
                        await adapter?.connect({
                            id: 'walletConnect',
                            type: 'WALLET_CONNECT',
                            chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.id
                        });
                    } catch (error) {
                        /**
                         * Handle edge case where wagmi detects existing connection but lacks to complete UniversalProvider instance.
                         * Connection attempt fails due to already connected state - reconnect to restore provider state.
                         */ if (adapter?.reconnect) {
                            adapter?.reconnect({
                                id: 'walletConnect',
                                type: 'WALLET_CONNECT'
                            });
                        }
                    }
                }
                this.syncWalletConnectAccounts(chainNamespace);
                await this.syncAccount({
                    address,
                    chainId,
                    chainNamespace
                });
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].setApprovedCaipNetworksData(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain);
    }
    syncWalletConnectAccounts(chainNamespace) {
        const addresses = this.universalProvider?.session?.namespaces?.[chainNamespace]?.accounts?.map((account)=>{
            const { address } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipAddress(account);
            return address;
        }).filter((address, index, self)=>self.indexOf(address) === index);
        if (addresses) {
            this.setAllAccounts(addresses.map((address)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(chainNamespace, address, chainNamespace === 'bip122' ? 'payment' : 'eoa')), chainNamespace);
        }
    }
    syncProvider({ type, provider, id, chainNamespace }) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].setProviderId(chainNamespace, type);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].setProvider(chainNamespace, provider);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].setConnectedConnectorId(chainNamespace, id);
    }
    async syncAccount(params) {
        const { address, chainId, chainNamespace } = params;
        const { chainId: activeChainId } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveNetworkProps();
        const chainIdToUse = chainId || activeChainId;
        const isUnsupportedNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.name === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME;
        const shouldSupportAllNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].getNetworkProp('supportsAllNetworks', chainNamespace);
        this.setStatus('connected', chainNamespace);
        if (isUnsupportedNetwork && !shouldSupportAllNetworks) {
            return;
        }
        if (chainIdToUse) {
            let caipNetwork = this.caipNetworks?.find((n)=>n.id.toString() === chainIdToUse.toString());
            let fallbackCaipNetwork = this.caipNetworks?.find((n)=>n.chainNamespace === chainNamespace);
            // If doesn't support all networks, we need to use approved networks
            if (!shouldSupportAllNetworks && !caipNetwork && !fallbackCaipNetwork) {
                // Connection can be requested for a chain that is not supported by the wallet so we need to use approved networks here
                const caipNetworkIds = this.getApprovedCaipNetworkIds() || [];
                const caipNetworkId = caipNetworkIds.find((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipNetworkId(id)?.chainId === chainIdToUse.toString());
                const fallBackCaipNetworkId = caipNetworkIds.find((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ParseUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParseUtil"].parseCaipNetworkId(id)?.chainNamespace === chainNamespace);
                caipNetwork = this.caipNetworks?.find((n)=>n.caipNetworkId === caipNetworkId);
                fallbackCaipNetwork = this.caipNetworks?.find((n)=>n.caipNetworkId === fallBackCaipNetworkId || 'deprecatedCaipNetworkId' in n && n.deprecatedCaipNetworkId === fallBackCaipNetworkId);
            }
            const network = caipNetwork || fallbackCaipNetwork;
            if (network?.chainNamespace === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain) {
                // If the network is unsupported and the user doesn't allow unsupported chains, we show the unsupported chain UI
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.allowUnsupportedChain && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork?.name === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChainController"].showUnsupportedChainUI();
                } else {
                    this.setCaipNetwork(network);
                }
            }
            this.syncConnectedWalletInfo(chainNamespace);
            // Only update state when needed
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(address, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AccountController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountController"].state.address)) {
                this.setCaipAddress(`${chainNamespace}:${network?.id}:${address}`, chainNamespace);
                await this.syncIdentity({
                    address,
                    chainId: network?.id,
                    chainNamespace
                });
            }
            await this.syncBalance({
                address,
                chainId: network?.id,
                chainNamespace
            });
        }
    }
    async syncBalance(params) {
        const caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$NetworkUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NetworkUtil"].getNetworksByNamespace(this.caipNetworks, params.chainNamespace).find((n)=>n.id.toString() === params.chainId?.toString());
        if (!caipNetwork) {
            return;
        }
        await this.updateNativeBalance();
    }
    syncConnectedWalletInfo(chainNamespace) {
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(chainNamespace);
        const providerType = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProviderId(chainNamespace);
        if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_ANNOUNCED || providerType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_INJECTED) {
            if (connectorId) {
                const connector = this.getConnectors().find((c)=>c.id === connectorId);
                if (connector) {
                    const { info, name, imageUrl } = connector;
                    const icon = imageUrl || this.getConnectorImage(connector);
                    this.setConnectedWalletInfo({
                        name,
                        icon,
                        ...info
                    }, chainNamespace);
                }
            }
        } else if (providerType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_WALLET_CONNECT) {
            const provider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].getProvider(chainNamespace);
            if (provider?.session) {
                this.setConnectedWalletInfo({
                    ...provider.session.peer.metadata,
                    name: provider.session.peer.metadata.name,
                    icon: provider.session.peer.metadata.icons?.[0]
                }, chainNamespace);
            }
        } else if (connectorId) {
            if (connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE) {
                const connector = this.getConnectors().find((c)=>c.id === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE);
                this.setConnectedWalletInfo({
                    name: 'Coinbase Wallet',
                    icon: this.getConnectorImage(connector)
                }, chainNamespace);
            }
            this.setConnectedWalletInfo({
                name: connectorId
            }, chainNamespace);
        }
    }
    async syncIdentity({ address, chainId, chainNamespace }) {
        const activeCaipNetwork = this.caipNetworks?.find((n)=>n.caipNetworkId === `${chainNamespace}:${chainId}`);
        if (chainNamespace !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM || activeCaipNetwork?.testnet) {
            return;
        }
        try {
            const { name, avatar } = await this.fetchIdentity({
                address
            });
            this.setProfileName(name, chainNamespace);
            this.setProfileImage(avatar, chainNamespace);
            if (!name) {
                await this.syncReownName(address, chainNamespace);
                const adapter = this.getAdapter(chainNamespace);
                const result = await adapter?.getProfile({
                    address,
                    chainId: Number(chainId)
                });
                if (result?.profileName) {
                    this.setProfileName(result.profileName, chainNamespace);
                    if (result.profileImage) {
                        this.setProfileImage(result.profileImage, chainNamespace);
                    }
                } else {
                    await this.syncReownName(address, chainNamespace);
                    this.setProfileImage(null, chainNamespace);
                }
            }
        } catch  {
            if (chainId === 1) {
                await this.syncReownName(address, chainNamespace);
            } else {
                await this.syncReownName(address, chainNamespace);
                this.setProfileImage(null, chainNamespace);
            }
        }
    }
    async syncReownName(address, chainNamespace) {
        try {
            const registeredWcNames = await this.getReownName(address);
            if (registeredWcNames[0]) {
                const wcName = registeredWcNames[0];
                this.setProfileName(wcName.name, chainNamespace);
            } else {
                this.setProfileName(null, chainNamespace);
            }
        } catch  {
            this.setProfileName(null, chainNamespace);
        }
    }
    async syncAdapterConnection(namespace) {
        const adapter = this.getAdapter(namespace);
        const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(namespace);
        const caipNetwork = this.getCaipNetwork();
        try {
            if (!adapter || !connectorId) {
                throw new Error(`Adapter or connectorId not found for namespace ${namespace}`);
            }
            const connection = await adapter?.syncConnection({
                namespace,
                id: connectorId,
                chainId: caipNetwork?.id,
                rpcUrl: caipNetwork?.rpcUrls?.default?.http?.[0]
            });
            if (connection) {
                const accounts = await adapter?.getAccounts({
                    namespace,
                    id: connectorId
                });
                if (accounts && accounts.accounts.length > 0) {
                    this.setAllAccounts(accounts.accounts, namespace);
                } else {
                    this.setAllAccounts([
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].createAccount(namespace, connection.address, 'eoa')
                    ], namespace);
                }
                this.syncProvider({
                    ...connection,
                    chainNamespace: namespace
                });
                await this.syncAccount({
                    ...connection,
                    chainNamespace: namespace
                });
                this.setStatus('connected', namespace);
            } else {
                this.setStatus('disconnected', namespace);
            }
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteConnectedConnectorId(namespace);
            this.setStatus('disconnected', namespace);
        }
    }
    async syncNamespaceConnection(namespace) {
        try {
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getConnectedConnectorId(namespace);
            const isEmailUsed = this.authProvider?.getLoginEmailUsed();
            if (isEmailUsed) {
                return;
            }
            this.setStatus('connecting', namespace);
            switch(connectorId){
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT:
                    await this.syncWalletConnectAccount();
                    break;
                case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH:
                    break;
                default:
                    await this.syncAdapterConnection(namespace);
            }
        } catch (err) {
            console.warn("AppKit couldn't sync existing connection", err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].deleteConnectedConnectorId(namespace);
            this.setStatus('disconnected', namespace);
        }
    }
    async syncExistingConnection() {
        await Promise.allSettled(this.chainNamespaces.map((namespace)=>this.syncNamespaceConnection(namespace)));
    }
    getAdapter(namespace) {
        if (!namespace) {
            return undefined;
        }
        return this.chainAdapters?.[namespace];
    }
    createUniversalProvider() {
        if (!this.universalProviderInitPromise && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isClient() && this.options?.projectId) {
            this.universalProviderInitPromise = this.initializeUniversalAdapter();
        }
        return this.universalProviderInitPromise;
    }
    handleAlertError(error) {
        const matchedUniversalProviderError = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].UniversalProviderErrors).find(([, { message }])=>error.message.includes(message));
        const [errorKey, errorValue] = matchedUniversalProviderError ?? [];
        const { message, alertErrorKey } = errorValue ?? {};
        if (errorKey && message && !this.reportedAlertErrors[errorKey]) {
            const alertError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS[alertErrorKey];
            if (alertError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(alertError, 'error');
                this.reportedAlertErrors[errorKey] = true;
            }
        }
    }
    async initializeUniversalAdapter() {
        const logger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$LoggerUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoggerUtil"].createLogger((error, ...args)=>{
            if (error) {
                this.handleAlertError(error);
            }
            // eslint-disable-next-line no-console
            console.error(...args);
        });
        const universalProviderOptions = {
            projectId: this.options?.projectId,
            metadata: {
                name: this.options?.metadata ? this.options?.metadata.name : '',
                description: this.options?.metadata ? this.options?.metadata.description : '',
                url: this.options?.metadata ? this.options?.metadata.url : '',
                icons: this.options?.metadata ? this.options?.metadata.icons : [
                    ''
                ]
            },
            logger
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].setUsingInjectedUniversalProvider(Boolean(this.options?.universalProvider));
        this.universalProvider = this.options.universalProvider ?? await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$universal$2d$provider$40$2$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init(universalProviderOptions);
        this.listenWalletConnect();
    }
    async getUniversalProvider() {
        if (!this.universalProvider) {
            try {
                await this.createUniversalProvider();
            } catch (error) {
                throw new Error('AppKit:getUniversalProvider - Cannot create provider');
            }
        }
        return this.universalProvider;
    }
    createAuthProvider() {
        const isEmailEnabled = this.options?.features?.email === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES.email : this.options?.features?.email;
        const isSocialsEnabled = this.options?.features?.socials ? this.options?.features?.socials?.length > 0 : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_FEATURES.socials;
        const isAuthEnabled = isEmailEnabled || isSocialsEnabled;
        if (!this.authProvider && this.options?.projectId && isAuthEnabled) {
            this.authProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameProviderSingleton"].getInstance({
                projectId: this.options.projectId,
                enableLogger: this.options.enableAuthLogger,
                chainId: this.getCaipNetwork()?.caipNetworkId,
                onTimeout: ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$AlertController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertController"].open(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ErrorUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorUtil"].ALERT_ERRORS.SOCIALS_TIMEOUT, 'error');
                }
            });
            this.subscribeState((val)=>{
                if (!val.open) {
                    this.authProvider?.rejectRpcRequests();
                }
            });
            this.syncAuthConnector(this.authProvider);
        }
    }
    async createUniversalProviderForAdapter(chainNamespace) {
        await this.getUniversalProvider();
        if (this.universalProvider) {
            this.chainAdapters?.[chainNamespace]?.setUniversalProvider?.(this.universalProvider);
        }
    }
    createAuthProviderForAdapter(chainNamespace) {
        this.createAuthProvider();
        if (this.authProvider) {
            this.chainAdapters?.[chainNamespace]?.setAuthProvider?.(this.authProvider);
        }
    }
    createAdapter(blueprint) {
        if (!blueprint) {
            return;
        }
        const namespace = blueprint.namespace;
        if (!namespace) {
            return;
        }
        this.createClients();
        const adapterBlueprint = blueprint;
        adapterBlueprint.namespace = namespace;
        adapterBlueprint.construct({
            namespace,
            projectId: this.options?.projectId,
            networks: this.caipNetworks
        });
        if (!this.chainNamespaces.includes(namespace)) {
            this.chainNamespaces.push(namespace);
        }
        if (this.chainAdapters) {
            this.chainAdapters[namespace] = adapterBlueprint;
        }
    }
    createAdapters(blueprints) {
        this.createClients();
        return this.chainNamespaces.reduce((adapters, namespace)=>{
            const blueprint = blueprints?.find((b)=>b.namespace === namespace);
            if (blueprint) {
                adapters[namespace] = blueprint;
                adapters[namespace].namespace = namespace;
                adapters[namespace].construct({
                    namespace,
                    projectId: this.options?.projectId,
                    networks: this.caipNetworks
                });
            } else {
                adapters[namespace] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$universal$2d$adapter$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniversalAdapter"]({
                    namespace,
                    networks: this.caipNetworks
                });
            }
            return adapters;
        // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
        }, {});
    }
    onConnectors(chainNamespace) {
        const adapter = this.getAdapter(chainNamespace);
        adapter?.on('connectors', this.setConnectors.bind(this));
    }
    async initChainAdapter(namespace) {
        this.onConnectors(namespace);
        this.listenAdapter(namespace);
        this.chainAdapters?.[namespace].syncConnectors(this.options, this);
        await this.createUniversalProviderForAdapter(namespace);
        this.createAuthProviderForAdapter(namespace);
    }
    async initChainAdapters() {
        await Promise.all(this.chainNamespaces.map(async (namespace)=>{
            await this.initChainAdapter(namespace);
        }));
    }
    getUnsupportedNetwork(caipNetworkId) {
        return {
            id: caipNetworkId.split(':')[1],
            caipNetworkId,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME,
            chainNamespace: caipNetworkId.split(':')[0],
            nativeCurrency: {
                name: '',
                decimals: 0,
                symbol: ''
            },
            rpcUrls: {
                default: {
                    http: []
                }
            }
        };
    }
    getDefaultNetwork() {
        const caipNetworkId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveCaipNetworkId();
        if (caipNetworkId) {
            const caipNetwork = this.caipNetworks?.find((n)=>n.caipNetworkId === caipNetworkId);
            if (caipNetwork) {
                return caipNetwork;
            }
            return this.getUnsupportedNetwork(caipNetworkId);
        }
        return this.caipNetworks?.[0];
    }
    async injectModalUi() {
        if (!this.initPromise && !isInitialized && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isClient()) {
            isInitialized = true;
            this.initPromise = new Promise(async (resolve)=>{
                await Promise.all([
                    __turbopack_context__.r("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/index.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i),
                    __turbopack_context__.r("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i)
                ]);
                const modal = document.createElement('w3m-modal');
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.disableAppend && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded) {
                    document.body.insertAdjacentElement('beforeend', modal);
                }
                resolve();
            });
        }
        return this.initPromise;
    }
} //# sourceMappingURL=client.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$universal$2d$provider$40$2$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+universal-provider@2.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/utils.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$utils$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript_c1b0963346fae7bc46b8c4e07605976a$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-utils@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript_c1b0963346fae7bc46b8c4e07605976a/node_modules/@reown/appkit-utils/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/W3MFrameProviderSingleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/store/ProviderUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$universal$2d$adapter$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/universal-adapter/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$HelpersUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/HelpersUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PACKAGE_VERSION": (()=>PACKAGE_VERSION)
});
const PACKAGE_VERSION = '1.6.8'; //# sourceMappingURL=constants.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createAppKit": (()=>createAppKit)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)");
;
;
;
;
;
;
function createAppKit(options) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppKit"]({
        ...options,
        sdkVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].generateSdkVersion(options.adapters ?? [], 'html', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PACKAGE_VERSION"])
    });
}
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$ChainAdapterBlueprint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/ChainAdapterBlueprint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/adapters.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=adapters.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/adapters.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$adapters$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/adapters/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$adapters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/adapters.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$WalletConnectConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/WalletConnectConnector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/connectors.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=connectors.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/connectors.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$connectors$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/connectors/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$connectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/connectors.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$W3MFrameProviderSingleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/W3MFrameProviderSingleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/auth-provider.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=auth-provider.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/auth-provider.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$auth$2d$provider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/auth-provider/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$auth$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/auth-provider.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/networks.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=networks.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/networks.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$networks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/networks/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$networks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/networks.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/library/react/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getAppKit": (()=>getAppKit),
    "useAppKit": (()=>useAppKit),
    "useAppKitEvents": (()=>useAppKitEvents),
    "useAppKitProvider": (()=>useAppKitProvider),
    "useAppKitState": (()=>useAppKitState),
    "useAppKitTheme": (()=>useAppKitTheme),
    "useWalletInfo": (()=>useWalletInfo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.1_@babel+core@7.26.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/valtio@1.13.2_@types+react@19.0.10_react@18.3.1/node_modules/valtio/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/store/ProviderUtil.js [app-client] (ecmascript)");
;
;
;
let modal = undefined;
function getAppKit(appKit) {
    if (appKit) {
        modal = appKit;
    }
}
;
function useAppKitProvider(chainNamespace) {
    const { providers, providerIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$valtio$40$1$2e$13$2e$2_$40$types$2b$react$40$19$2e$0$2e$10_react$40$18$2e$3$2e$1$2f$node_modules$2f$valtio$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSnapshot"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProviderUtil"].state);
    const walletProvider = providers[chainNamespace];
    const walletProviderType = providerIds[chainNamespace];
    return {
        walletProvider,
        walletProviderType
    };
}
function useAppKitTheme() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitTheme" hook');
    }
    function setThemeMode(themeMode) {
        if (themeMode) {
            modal?.setThemeMode(themeMode);
        }
    }
    function setThemeVariables(themeVariables) {
        if (themeVariables) {
            modal?.setThemeVariables(themeVariables);
        }
    }
    const [themeMode, setInternalThemeMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(modal.getThemeMode());
    const [themeVariables, setInternalThemeVariables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(modal.getThemeVariables());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAppKitTheme.useEffect": ()=>{
            const unsubscribe = modal?.subscribeTheme({
                "useAppKitTheme.useEffect": (state)=>{
                    setInternalThemeMode(state.themeMode);
                    setInternalThemeVariables(state.themeVariables);
                }
            }["useAppKitTheme.useEffect"]);
            return ({
                "useAppKitTheme.useEffect": ()=>{
                    unsubscribe?.();
                }
            })["useAppKitTheme.useEffect"];
        }
    }["useAppKitTheme.useEffect"], []);
    return {
        themeMode,
        themeVariables,
        setThemeMode,
        setThemeVariables
    };
}
function useAppKit() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKit" hook');
    }
    async function open(options) {
        await modal?.open(options);
    }
    async function close() {
        await modal?.close();
    }
    return {
        open,
        close
    };
}
function useWalletInfo() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useWalletInfo" hook');
    }
    const walletInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(modal.subscribeWalletInfo, modal.getWalletInfo, modal.getWalletInfo);
    return {
        walletInfo
    };
}
function useAppKitState() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitState" hook');
    }
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(modal.getState());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAppKitState.useEffect": ()=>{
            const unsubscribe = modal?.subscribeState({
                "useAppKitState.useEffect": (newState)=>{
                    setState({
                        ...newState
                    });
                }
            }["useAppKitState.useEffect"]);
            return ({
                "useAppKitState.useEffect": ()=>{
                    unsubscribe?.();
                }
            })["useAppKitState.useEffect"];
        }
    }["useAppKitState.useEffect"], []);
    return state;
}
function useAppKitEvents() {
    if (!modal) {
        throw new Error('Please call "createAppKit" before using "useAppKitEvents" hook');
    }
    const [event, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(modal.getEvent());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAppKitEvents.useEffect": ()=>{
            const unsubscribe = modal?.subscribeEvents({
                "useAppKitEvents.useEffect": (newEvent)=>{
                    setEvents({
                        ...newEvent
                    });
                }
            }["useAppKitEvents.useEffect"]);
            return ({
                "useAppKitEvents.useEffect": ()=>{
                    unsubscribe?.();
                }
            })["useAppKitEvents.useEffect"];
        }
    }["useAppKitEvents.useEffect"], []);
    return event;
} //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/library/react/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.1_@babel+core@7.26.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$store$2f$ProviderUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/store/ProviderUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$library$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/library/react/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/react.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createAppKit": (()=>createAppKit),
    "modal": (()=>modal),
    "useAppKitNetwork": (()=>useAppKitNetwork)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$library$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/library/react/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
let modal = undefined;
function createAppKit(options) {
    if (!modal) {
        modal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppKit"]({
            ...options,
            sdkVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoreHelperUtil"].generateSdkVersion(options.adapters ?? [], 'react', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PACKAGE_VERSION"])
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$library$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAppKit"])(modal);
    }
    return modal;
}
;
;
function useAppKitNetwork() {
    const { caipNetwork, caipNetworkId, chainId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppKitNetworkCore"])();
    function switchNetwork(network) {
        modal?.switchNetwork(network);
    }
    return {
        caipNetwork,
        caipNetworkId,
        chainId,
        switchNetwork
    };
}
;
 //# sourceMappingURL=react.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/react.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/client.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$library$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/library/react/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$src$2f$utils$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/src/utils/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/react.js [app-client] (ecmascript) <locals>");
}}),
}]);

//# sourceMappingURL=9065d_%40reown_appkit_dist_esm_a6a059b4._.js.map