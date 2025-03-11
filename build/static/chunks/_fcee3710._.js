(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_fcee3710._.js", {

"[project]/config/index.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "networks": (()=>networks),
    "projectId": (()=>projectId),
    "wagmiAdapter": (()=>wagmiAdapter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$types$2b$react$40$19$2e$0$2e$10_immer$40$9$2e$0$2e$21_react$40$_3ce7d148b0d49172acac0542ebf56d07$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@wagmi+core@2.16.4_@tanstack+query-core@5.66.4_@types+react@19.0.10_immer@9.0.21_react@_3ce7d148b0d49172acac0542ebf56d07/node_modules/@wagmi/core/dist/esm/utils/cookie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$types$2b$react$40$19$2e$0$2e$10_immer$40$9$2e$0$2e$21_react$40$_3ce7d148b0d49172acac0542ebf56d07$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@wagmi+core@2.16.4_@tanstack+query-core@5.66.4_@types+react@19.0.10_immer@9.0.21_react@_3ce7d148b0d49172acac0542ebf56d07/node_modules/@wagmi/core/dist/esm/createStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$adapter$2d$wagmi$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_$40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$que_819fb54ee4af5f42410d717b7d222f39$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-adapter-wagmi@1.6.8_@types+react@19.0.10_@wagmi+core@2.16.4_@tanstack+que_819fb54ee4af5f42410d717b7d222f39/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$adapter$2d$wagmi$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_$40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$que_819fb54ee4af5f42410d717b7d222f39$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-adapter-wagmi@1.6.8_@types+react@19.0.10_@wagmi+core@2.16.4_@tanstack+que_819fb54ee4af5f42410d717b7d222f39/node_modules/@reown/appkit-adapter-wagmi/dist/esm/src/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$networks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/networks.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$jbc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.23.4_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/viem/_esm/chains/definitions/jbc.js [app-client] (ecmascript)");
;
;
;
const projectId = '1387f8ef666a56825e503ca148275bcb';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
const networks = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$jbc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jbc"]
];
const wagmiAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$adapter$2d$wagmi$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_$40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$que_819fb54ee4af5f42410d717b7d222f39$2f$node_modules$2f40$reown$2f$appkit$2d$adapter$2d$wagmi$2f$dist$2f$esm$2f$src$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiAdapter"]({
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$types$2b$react$40$19$2e$0$2e$10_immer$40$9$2e$0$2e$21_react$40$_3ce7d148b0d49172acac0542ebf56d07$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStorage"])({
        storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$types$2b$react$40$19$2e$0$2e$10_immer$40$9$2e$0$2e$21_react$40$_3ce7d148b0d49172acac0542ebf56d07$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookieStorage"]
    }),
    ssr: true,
    projectId,
    networks
});
const config = wagmiAdapter.wagmiConfig;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/context/index.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.1_@babel+core@7.26.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+query-core@5.66.4/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$66$2e$9_react$40$18$2e$3$2e$1$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@tanstack+react-query@5.66.9_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/react.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/react.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$networks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit/dist/esm/exports/networks.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$jbc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/viem@2.23.4_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/viem/_esm/chains/definitions/jbc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$types$2b$react$40$19$2e$0$2e$10_immer$40$9$2e$0$2e$21_react$40$_3ce7d148b0d49172acac0542ebf56d07$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@wagmi+core@2.16.4_@tanstack+query-core@5.66.4_@types+react@19.0.10_immer@9.0.21_react@_3ce7d148b0d49172acac0542ebf56d07/node_modules/@wagmi/core/dist/esm/utils/cookie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$14$2e$11_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$66$2e$9_react$40$18$2e$3$2e$1_$5f40$t_91f813e408311e1857744fd3ce76287a$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/wagmi@2.14.11_@tanstack+query-core@5.66.4_@tanstack+react-query@5.66.9_react@18.3.1__@t_91f813e408311e1857744fd3ce76287a/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]();
if (!__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectId"]) {
    throw new Error('Project ID is not defined');
}
const metadata = {
    name: 'appkit-example',
    description: 'AppKit Example',
    url: 'https://appkitexampleapp.com',
    icons: [
        'https://avatars.githubusercontent.com/u/179229932'
    ]
};
const modal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2f$dist$2f$esm$2f$exports$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAppKit"])({
    adapters: [
        __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiAdapter"]
    ],
    networks: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$viem$40$2$2e$23$2e$4_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$jbc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jbc"]
    ],
    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projectId"],
    themeMode: 'dark',
    themeVariables: {
        '--w3m-font-family': 'Inter',
        '--w3m-font-size-master': '8px',
        '--w3m-z-index': 1000
    },
    chainImages: {
        8899: 'https://gateway.commudao.xyz/ipfs/bafkreihdmsnmmzhepcfxuvoflht2iqv5w73hg5kbgrc33jrhk7il5ddpgu?img-width=100&img-height=100'
    },
    features: {
        analytics: true
    }
});
function ContextProvider({ children, cookies }) {
    const initialState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$wagmi$2b$core$40$2$2e$16$2e$4_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$types$2b$react$40$19$2e$0$2e$10_immer$40$9$2e$0$2e$21_react$40$_3ce7d148b0d49172acac0542ebf56d07$2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$utils$2f$cookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookieToInitialState"])(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiAdapter"].wagmiConfig, cookies);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$wagmi$40$2$2e$14$2e$11_$40$tanstack$2b$query$2d$core$40$5$2e$66$2e$4_$40$tanstack$2b$react$2d$query$40$5$2e$66$2e$9_react$40$18$2e$3$2e$1_$5f40$t_91f813e408311e1857744fd3ce76287a$2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiAdapter"].wagmiConfig,
        initialState: initialState,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$tanstack$2b$react$2d$query$40$5$2e$66$2e$9_react$40$18$2e$3$2e$1$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: children
        }, void 0, false, {
            fileName: "[project]/context/index.tsx",
            lineNumber: 45,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/context/index.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
_c = ContextProvider;
const __TURBOPACK__default__export__ = ContextProvider;
var _c;
__turbopack_context__.k.register(_c, "ContextProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_fcee3710._.js.map