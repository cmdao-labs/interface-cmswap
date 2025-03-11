(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/50f5f_@reown_appkit-wallet_dist_esm_476e1795._.js", {

"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_LOG_LEVEL": (()=>DEFAULT_LOG_LEVEL),
    "SECURE_SITE_SDK": (()=>SECURE_SITE_SDK),
    "SECURE_SITE_SDK_VERSION": (()=>SECURE_SITE_SDK_VERSION),
    "W3mFrameConstants": (()=>W3mFrameConstants),
    "W3mFrameRpcConstants": (()=>W3mFrameRpcConstants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.1_@babel+core@7.26.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const SECURE_SITE_SDK = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_SECURE_SITE_SDK_URL'] || 'https://secure.walletconnect.org/sdk';
const DEFAULT_LOG_LEVEL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_DEFAULT_LOG_LEVEL'] || 'error';
const SECURE_SITE_SDK_VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$1_$40$babel$2b$core$40$7$2e$26$2e$9_react$2d$dom$40$18$2e$3$2e$1_react$40$18$2e$3$2e$1_$5f$react$40$18$2e$3$2e$1$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env['NEXT_PUBLIC_SECURE_SITE_SDK_VERSION'] || 3;
const W3mFrameConstants = {
    APP_EVENT_KEY: '@w3m-app/',
    FRAME_EVENT_KEY: '@w3m-frame/',
    RPC_METHOD_KEY: 'RPC_',
    STORAGE_KEY: '@appkit-wallet/',
    SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
    EMAIL_LOGIN_USED_KEY: 'EMAIL_LOGIN_USED_KEY',
    LAST_USED_CHAIN_KEY: 'LAST_USED_CHAIN_KEY',
    LAST_EMAIL_LOGIN_TIME: 'LAST_EMAIL_LOGIN_TIME',
    EMAIL: 'EMAIL',
    PREFERRED_ACCOUNT_TYPE: 'PREFERRED_ACCOUNT_TYPE',
    SMART_ACCOUNT_ENABLED: 'SMART_ACCOUNT_ENABLED',
    SMART_ACCOUNT_ENABLED_NETWORKS: 'SMART_ACCOUNT_ENABLED_NETWORKS',
    SOCIAL_USERNAME: 'SOCIAL_USERNAME',
    APP_SWITCH_NETWORK: '@w3m-app/SWITCH_NETWORK',
    APP_CONNECT_EMAIL: '@w3m-app/CONNECT_EMAIL',
    APP_CONNECT_DEVICE: '@w3m-app/CONNECT_DEVICE',
    APP_CONNECT_OTP: '@w3m-app/CONNECT_OTP',
    APP_CONNECT_SOCIAL: '@w3m-app/CONNECT_SOCIAL',
    APP_GET_SOCIAL_REDIRECT_URI: '@w3m-app/GET_SOCIAL_REDIRECT_URI',
    APP_GET_USER: '@w3m-app/GET_USER',
    APP_SIGN_OUT: '@w3m-app/SIGN_OUT',
    APP_IS_CONNECTED: '@w3m-app/IS_CONNECTED',
    APP_GET_CHAIN_ID: '@w3m-app/GET_CHAIN_ID',
    APP_RPC_REQUEST: '@w3m-app/RPC_REQUEST',
    APP_UPDATE_EMAIL: '@w3m-app/UPDATE_EMAIL',
    APP_UPDATE_EMAIL_PRIMARY_OTP: '@w3m-app/UPDATE_EMAIL_PRIMARY_OTP',
    APP_UPDATE_EMAIL_SECONDARY_OTP: '@w3m-app/UPDATE_EMAIL_SECONDARY_OTP',
    APP_AWAIT_UPDATE_EMAIL: '@w3m-app/AWAIT_UPDATE_EMAIL',
    APP_SYNC_THEME: '@w3m-app/SYNC_THEME',
    APP_SYNC_DAPP_DATA: '@w3m-app/SYNC_DAPP_DATA',
    APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: '@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS',
    APP_INIT_SMART_ACCOUNT: '@w3m-app/INIT_SMART_ACCOUNT',
    APP_SET_PREFERRED_ACCOUNT: '@w3m-app/SET_PREFERRED_ACCOUNT',
    APP_CONNECT_FARCASTER: '@w3m-app/CONNECT_FARCASTER',
    APP_GET_FARCASTER_URI: '@w3m-app/GET_FARCASTER_URI',
    APP_RELOAD: '@w3m-app/RELOAD',
    FRAME_SWITCH_NETWORK_ERROR: '@w3m-frame/SWITCH_NETWORK_ERROR',
    FRAME_SWITCH_NETWORK_SUCCESS: '@w3m-frame/SWITCH_NETWORK_SUCCESS',
    FRAME_CONNECT_EMAIL_ERROR: '@w3m-frame/CONNECT_EMAIL_ERROR',
    FRAME_CONNECT_EMAIL_SUCCESS: '@w3m-frame/CONNECT_EMAIL_SUCCESS',
    FRAME_CONNECT_DEVICE_ERROR: '@w3m-frame/CONNECT_DEVICE_ERROR',
    FRAME_CONNECT_DEVICE_SUCCESS: '@w3m-frame/CONNECT_DEVICE_SUCCESS',
    FRAME_CONNECT_OTP_SUCCESS: '@w3m-frame/CONNECT_OTP_SUCCESS',
    FRAME_CONNECT_OTP_ERROR: '@w3m-frame/CONNECT_OTP_ERROR',
    FRAME_CONNECT_SOCIAL_SUCCESS: '@w3m-frame/CONNECT_SOCIAL_SUCCESS',
    FRAME_CONNECT_SOCIAL_ERROR: '@w3m-frame/CONNECT_SOCIAL_ERROR',
    FRAME_CONNECT_FARCASTER_SUCCESS: '@w3m-frame/CONNECT_FARCASTER_SUCCESS',
    FRAME_CONNECT_FARCASTER_ERROR: '@w3m-frame/CONNECT_FARCASTER_ERROR',
    FRAME_GET_FARCASTER_URI_SUCCESS: '@w3m-frame/GET_FARCASTER_URI_SUCCESS',
    FRAME_GET_FARCASTER_URI_ERROR: '@w3m-frame/GET_FARCASTER_URI_ERROR',
    FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: '@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS',
    FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: '@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR',
    FRAME_GET_USER_SUCCESS: '@w3m-frame/GET_USER_SUCCESS',
    FRAME_GET_USER_ERROR: '@w3m-frame/GET_USER_ERROR',
    FRAME_SIGN_OUT_SUCCESS: '@w3m-frame/SIGN_OUT_SUCCESS',
    FRAME_SIGN_OUT_ERROR: '@w3m-frame/SIGN_OUT_ERROR',
    FRAME_IS_CONNECTED_SUCCESS: '@w3m-frame/IS_CONNECTED_SUCCESS',
    FRAME_IS_CONNECTED_ERROR: '@w3m-frame/IS_CONNECTED_ERROR',
    FRAME_GET_CHAIN_ID_SUCCESS: '@w3m-frame/GET_CHAIN_ID_SUCCESS',
    FRAME_GET_CHAIN_ID_ERROR: '@w3m-frame/GET_CHAIN_ID_ERROR',
    FRAME_RPC_REQUEST_SUCCESS: '@w3m-frame/RPC_REQUEST_SUCCESS',
    FRAME_RPC_REQUEST_ERROR: '@w3m-frame/RPC_REQUEST_ERROR',
    FRAME_SESSION_UPDATE: '@w3m-frame/SESSION_UPDATE',
    FRAME_UPDATE_EMAIL_SUCCESS: '@w3m-frame/UPDATE_EMAIL_SUCCESS',
    FRAME_UPDATE_EMAIL_ERROR: '@w3m-frame/UPDATE_EMAIL_ERROR',
    FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: '@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS',
    FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: '@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR',
    FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: '@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS',
    FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: '@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR',
    FRAME_SYNC_THEME_SUCCESS: '@w3m-frame/SYNC_THEME_SUCCESS',
    FRAME_SYNC_THEME_ERROR: '@w3m-frame/SYNC_THEME_ERROR',
    FRAME_SYNC_DAPP_DATA_SUCCESS: '@w3m-frame/SYNC_DAPP_DATA_SUCCESS',
    FRAME_SYNC_DAPP_DATA_ERROR: '@w3m-frame/SYNC_DAPP_DATA_ERROR',
    FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: '@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS',
    FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: '@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR',
    FRAME_INIT_SMART_ACCOUNT_SUCCESS: '@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS',
    FRAME_INIT_SMART_ACCOUNT_ERROR: '@w3m-frame/INIT_SMART_ACCOUNT_ERROR',
    FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: '@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS',
    FRAME_SET_PREFERRED_ACCOUNT_ERROR: '@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR',
    FRAME_READY: '@w3m-frame/READY',
    FRAME_RELOAD_SUCCESS: '@w3m-frame/RELOAD_SUCCESS',
    FRAME_RELOAD_ERROR: '@w3m-frame/RELOAD_ERROR',
    RPC_RESPONSE_TYPE_ERROR: 'RPC_RESPONSE_ERROR',
    RPC_RESPONSE_TYPE_TX: 'RPC_RESPONSE_TRANSACTION_HASH',
    RPC_RESPONSE_TYPE_OBJECT: 'RPC_RESPONSE_OBJECT'
};
const W3mFrameRpcConstants = {
    SAFE_RPC_METHODS: [
        'eth_accounts',
        'eth_blockNumber',
        'eth_call',
        'eth_chainId',
        'eth_estimateGas',
        'eth_feeHistory',
        'eth_gasPrice',
        'eth_getAccount',
        'eth_getBalance',
        'eth_getBlockByHash',
        'eth_getBlockByNumber',
        'eth_getBlockReceipts',
        'eth_getBlockTransactionCountByHash',
        'eth_getBlockTransactionCountByNumber',
        'eth_getCode',
        'eth_getFilterChanges',
        'eth_getFilterLogs',
        'eth_getLogs',
        'eth_getProof',
        'eth_getStorageAt',
        'eth_getTransactionByBlockHashAndIndex',
        'eth_getTransactionByBlockNumberAndIndex',
        'eth_getTransactionByHash',
        'eth_getTransactionCount',
        'eth_getTransactionReceipt',
        'eth_getUncleCountByBlockHash',
        'eth_getUncleCountByBlockNumber',
        'eth_maxPriorityFeePerGas',
        'eth_newBlockFilter',
        'eth_newFilter',
        'eth_newPendingTransactionFilter',
        'eth_sendRawTransaction',
        'eth_syncing',
        'eth_uninstallFilter',
        'wallet_getCapabilities',
        'wallet_getCallsStatus',
        'eth_getUserOperationReceipt',
        'eth_estimateUserOperationGas',
        'eth_getUserOperationByHash',
        'eth_supportedEntryPoints',
        'wallet_getAssets'
    ],
    NOT_SAFE_RPC_METHODS: [
        'personal_sign',
        'eth_signTypedData_v4',
        'eth_sendTransaction',
        'solana_signMessage',
        'solana_signTransaction',
        'solana_signAllTransactions',
        'solana_signAndSendTransaction',
        'wallet_sendCalls',
        'wallet_grantPermissions',
        'wallet_revokePermissions',
        'eth_sendUserOperation'
    ],
    GET_CHAIN_ID: 'eth_chainId',
    RPC_METHOD_NOT_ALLOWED_MESSAGE: 'Requested RPC call is not allowed',
    RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: 'Action not allowed',
    ACCOUNT_TYPES: {
        EOA: 'eoa',
        SMART_ACCOUNT: 'smartAccount'
    }
}; //# sourceMappingURL=W3mFrameConstants.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/RegexUtil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RegexUtil": (()=>RegexUtil)
});
const RegexUtil = {
    address: /^0x(?:[A-Fa-f0-9]{40})$/u,
    transactionHash: /^0x(?:[A-Fa-f0-9]{64})$/u,
    signedMessage: /^0x(?:[a-fA-F0-9]{62,})$/u
}; //# sourceMappingURL=RegexUtil.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameStorage.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mFrameStorage": (()=>W3mFrameStorage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js [app-client] (ecmascript)");
;
;
const W3mFrameStorage = {
    set (key, value) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
            localStorage.setItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].STORAGE_KEY}${key}`, value);
        }
    },
    get (key) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
            return localStorage.getItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].STORAGE_KEY}${key}`);
        }
        return null;
    },
    delete (key, social) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
            if (social) {
                localStorage.removeItem(key);
            } else {
                localStorage.removeItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].STORAGE_KEY}${key}`);
            }
        }
    }
}; //# sourceMappingURL=W3mFrameStorage.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mFrameHelpers": (()=>W3mFrameHelpers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$RegexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/RegexUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameStorage.js [app-client] (ecmascript)");
;
;
;
const EMAIL_MINIMUM_TIMEOUT = 30 * 1000;
const W3mFrameHelpers = {
    checkIfAllowedToTriggerEmail () {
        const lastEmailLoginTime = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_EMAIL_LOGIN_TIME);
        if (lastEmailLoginTime) {
            const difference = Date.now() - Number(lastEmailLoginTime);
            if (difference < EMAIL_MINIMUM_TIMEOUT) {
                const cooldownSec = Math.ceil((EMAIL_MINIMUM_TIMEOUT - difference) / 1000);
                throw new Error(`Please try again after ${cooldownSec} seconds`);
            }
        }
    },
    getTimeToNextEmailLogin () {
        const lastEmailLoginTime = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_EMAIL_LOGIN_TIME);
        if (lastEmailLoginTime) {
            const difference = Date.now() - Number(lastEmailLoginTime);
            if (difference < EMAIL_MINIMUM_TIMEOUT) {
                return Math.ceil((EMAIL_MINIMUM_TIMEOUT - difference) / 1000);
            }
        }
        return 0;
    },
    checkIfRequestExists (request) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].NOT_SAFE_RPC_METHODS.includes(request.method) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].SAFE_RPC_METHODS.includes(request.method);
    },
    getResponseType (response) {
        const isPayloadString = typeof response === 'string';
        const isTransactionHash = isPayloadString && (response?.match(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$RegexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegexUtil"].transactionHash) || response?.match(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$RegexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegexUtil"].signedMessage));
        if (isTransactionHash) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].RPC_RESPONSE_TYPE_TX;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].RPC_RESPONSE_TYPE_OBJECT;
    },
    checkIfRequestIsSafe (request) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].SAFE_RPC_METHODS.includes(request.method);
    },
    isClient: typeof window !== 'undefined'
}; //# sourceMappingURL=W3mFrameHelpers.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameSchema.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AppConnectEmailRequest": (()=>AppConnectEmailRequest),
    "AppConnectOtpRequest": (()=>AppConnectOtpRequest),
    "AppConnectSocialRequest": (()=>AppConnectSocialRequest),
    "AppGetSocialRedirectUriRequest": (()=>AppGetSocialRedirectUriRequest),
    "AppGetUserRequest": (()=>AppGetUserRequest),
    "AppSetPreferredAccountRequest": (()=>AppSetPreferredAccountRequest),
    "AppSwitchNetworkRequest": (()=>AppSwitchNetworkRequest),
    "AppSyncDappDataRequest": (()=>AppSyncDappDataRequest),
    "AppSyncThemeRequest": (()=>AppSyncThemeRequest),
    "AppUpdateEmailPrimaryOtpRequest": (()=>AppUpdateEmailPrimaryOtpRequest),
    "AppUpdateEmailRequest": (()=>AppUpdateEmailRequest),
    "AppUpdateEmailSecondaryOtpRequest": (()=>AppUpdateEmailSecondaryOtpRequest),
    "EventSchema": (()=>EventSchema),
    "FrameConnectEmailResponse": (()=>FrameConnectEmailResponse),
    "FrameConnectFarcasterResponse": (()=>FrameConnectFarcasterResponse),
    "FrameConnectSocialResponse": (()=>FrameConnectSocialResponse),
    "FrameGetChainIdResponse": (()=>FrameGetChainIdResponse),
    "FrameGetFarcasterUriResponse": (()=>FrameGetFarcasterUriResponse),
    "FrameGetSmartAccountEnabledNetworksResponse": (()=>FrameGetSmartAccountEnabledNetworksResponse),
    "FrameGetSocialRedirectUriResponse": (()=>FrameGetSocialRedirectUriResponse),
    "FrameGetUserResponse": (()=>FrameGetUserResponse),
    "FrameInitSmartAccountResponse": (()=>FrameInitSmartAccountResponse),
    "FrameIsConnectedResponse": (()=>FrameIsConnectedResponse),
    "FrameReadyResponse": (()=>FrameReadyResponse),
    "FrameSession": (()=>FrameSession),
    "FrameSetPreferredAccountResponse": (()=>FrameSetPreferredAccountResponse),
    "FrameSwitchNetworkResponse": (()=>FrameSwitchNetworkResponse),
    "FrameUpdateEmailResponse": (()=>FrameUpdateEmailResponse),
    "FrameUpdateEmailSecondaryOtpResponse": (()=>FrameUpdateEmailSecondaryOtpResponse),
    "GetTransactionByHashResponse": (()=>GetTransactionByHashResponse),
    "RcpEthGetBlockTransactionCountByHash": (()=>RcpEthGetBlockTransactionCountByHash),
    "RcpEthGetBlockTransactionCountByNumber": (()=>RcpEthGetBlockTransactionCountByNumber),
    "RpcEthAccountsRequest": (()=>RpcEthAccountsRequest),
    "RpcEthBlockNumber": (()=>RpcEthBlockNumber),
    "RpcEthCall": (()=>RpcEthCall),
    "RpcEthChainId": (()=>RpcEthChainId),
    "RpcEthEstimateGas": (()=>RpcEthEstimateGas),
    "RpcEthFeeHistory": (()=>RpcEthFeeHistory),
    "RpcEthGasPrice": (()=>RpcEthGasPrice),
    "RpcEthGetAccount": (()=>RpcEthGetAccount),
    "RpcEthGetBalance": (()=>RpcEthGetBalance),
    "RpcEthGetBlockByNumber": (()=>RpcEthGetBlockByNumber),
    "RpcEthGetBlockReceipts": (()=>RpcEthGetBlockReceipts),
    "RpcEthGetBlockyByHash": (()=>RpcEthGetBlockyByHash),
    "RpcEthGetCode": (()=>RpcEthGetCode),
    "RpcEthGetFilter": (()=>RpcEthGetFilter),
    "RpcEthGetFilterLogs": (()=>RpcEthGetFilterLogs),
    "RpcEthGetLogs": (()=>RpcEthGetLogs),
    "RpcEthGetProof": (()=>RpcEthGetProof),
    "RpcEthGetStorageAt": (()=>RpcEthGetStorageAt),
    "RpcEthGetTransactionByBlockHashAndIndex": (()=>RpcEthGetTransactionByBlockHashAndIndex),
    "RpcEthGetTransactionByBlockNumberAndIndex": (()=>RpcEthGetTransactionByBlockNumberAndIndex),
    "RpcEthGetTransactionByHash": (()=>RpcEthGetTransactionByHash),
    "RpcEthGetTransactionCount": (()=>RpcEthGetTransactionCount),
    "RpcEthGetTransactionReceipt": (()=>RpcEthGetTransactionReceipt),
    "RpcEthGetUncleCountByBlockHash": (()=>RpcEthGetUncleCountByBlockHash),
    "RpcEthGetUncleCountByBlockNumber": (()=>RpcEthGetUncleCountByBlockNumber),
    "RpcEthMaxPriorityFeePerGas": (()=>RpcEthMaxPriorityFeePerGas),
    "RpcEthNewBlockFilter": (()=>RpcEthNewBlockFilter),
    "RpcEthNewFilter": (()=>RpcEthNewFilter),
    "RpcEthNewPendingTransactionFilter": (()=>RpcEthNewPendingTransactionFilter),
    "RpcEthSendRawTransaction": (()=>RpcEthSendRawTransaction),
    "RpcEthSendTransactionRequest": (()=>RpcEthSendTransactionRequest),
    "RpcEthSignTypedDataV4": (()=>RpcEthSignTypedDataV4),
    "RpcEthSyncing": (()=>RpcEthSyncing),
    "RpcPersonalSignRequest": (()=>RpcPersonalSignRequest),
    "RpcResponse": (()=>RpcResponse),
    "RpcSolanaSignAllTransactionsRequest": (()=>RpcSolanaSignAllTransactionsRequest),
    "RpcSolanaSignAndSendTransactionRequest": (()=>RpcSolanaSignAndSendTransactionRequest),
    "RpcSolanaSignMessageRequest": (()=>RpcSolanaSignMessageRequest),
    "RpcSolanaSignTransactionRequest": (()=>RpcSolanaSignTransactionRequest),
    "RpcUnistallFilter": (()=>RpcUnistallFilter),
    "W3mFrameSchema": (()=>W3mFrameSchema),
    "WalletGetAssetsRequest": (()=>WalletGetAssetsRequest),
    "WalletGetCallsReceiptRequest": (()=>WalletGetCallsReceiptRequest),
    "WalletGetCapabilitiesRequest": (()=>WalletGetCapabilitiesRequest),
    "WalletGrantPermissionsRequest": (()=>WalletGrantPermissionsRequest),
    "WalletRevokePermissionsRequest": (()=>WalletRevokePermissionsRequest),
    "WalletSendCallsRequest": (()=>WalletSendCallsRequest)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.22.4/node_modules/zod/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
;
;
const zError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
function zType(key) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"][key]);
}
const GetTransactionByHashResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    accessList: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()),
    blockHash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().nullable(),
    blockNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().nullable(),
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number()),
    from: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    gas: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    hash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    input: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().nullable(),
    maxFeePerGas: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    maxPriorityFeePerGas: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    nonce: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    r: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    s: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    to: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    transactionIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().nullable(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    v: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const AppSwitchNetworkRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number())
});
const AppConnectEmailRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().email()
});
const AppConnectOtpRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    otp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const AppConnectSocialRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    uri: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const AppGetUserRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number())),
    preferredAccountType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string())
});
const AppGetSocialRedirectUriRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
        'google',
        'github',
        'apple',
        'facebook',
        'x',
        'discord'
    ])
});
const AppUpdateEmailRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().email()
});
const AppUpdateEmailPrimaryOtpRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    otp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const AppUpdateEmailSecondaryOtpRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    otp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const AppSyncThemeRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    themeMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
        'light',
        'dark'
    ])),
    themeVariables: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number()))),
    w3mThemeVariables: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()))
});
const AppSyncDappDataRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        icons: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string())
    }).optional(),
    sdkVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    sdkType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const AppSetPreferredAccountRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const FrameConnectEmailResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    action: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
        'VERIFY_DEVICE',
        'VERIFY_OTP',
        'CONNECT'
    ])
});
const FrameGetFarcasterUriResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const FrameConnectFarcasterResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    userName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const FrameConnectSocialResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number()),
    accounts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.EOA,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
        ])
    })).optional(),
    userName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional()
});
const FrameUpdateEmailResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    action: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
        'VERIFY_PRIMARY_OTP',
        'VERIFY_SECONDARY_OTP'
    ])
});
const FrameGetUserResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().email().optional().nullable(),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number()),
    smartAccountDeployed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean()),
    accounts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.EOA,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.SMART_ACCOUNT
        ])
    })).optional(),
    preferredAccountType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string())
});
const FrameGetSocialRedirectUriResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    uri: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const FrameIsConnectedResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    isConnected: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean()
});
const FrameGetChainIdResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number())
});
const FrameSwitchNetworkResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number())
});
const FrameUpdateEmailSecondaryOtpResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    newEmail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().email()
});
const FrameGetSmartAccountEnabledNetworksResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    smartAccountEnabledNetworks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number())
});
const FrameInitSmartAccountResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    isDeployed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean()
});
const FrameReadyResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional()
});
const FrameSetPreferredAccountResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const RpcResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any();
const RpcEthAccountsRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_accounts')
});
const RpcEthBlockNumber = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_blockNumber')
});
const RpcEthCall = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_call'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthChainId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_chainId')
});
const RpcEthEstimateGas = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_estimateGas'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthFeeHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_feeHistory'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGasPrice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_gasPrice')
});
const RpcEthGetAccount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getAccount'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetBalance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getBalance'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetBlockyByHash = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getBlockByHash'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetBlockByNumber = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getBlockByNumber'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetBlockReceipts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getBlockReceipts'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RcpEthGetBlockTransactionCountByHash = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getBlockTransactionCountByHash'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RcpEthGetBlockTransactionCountByNumber = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getBlockTransactionCountByNumber'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetCode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getCode'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getFilterChanges'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetFilterLogs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getFilterLogs'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetLogs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getLogs'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetProof = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getProof'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetStorageAt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getStorageAt'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetTransactionByBlockHashAndIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getTransactionByBlockHashAndIndex'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetTransactionByBlockNumberAndIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getTransactionByBlockNumberAndIndex'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetTransactionByHash = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getTransactionByHash'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetTransactionCount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getTransactionCount'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetTransactionReceipt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getTransactionReceipt'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetUncleCountByBlockHash = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getUncleCountByBlockHash'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthGetUncleCountByBlockNumber = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_getUncleCountByBlockNumber'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthMaxPriorityFeePerGas = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_maxPriorityFeePerGas')
});
const RpcEthNewBlockFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_newBlockFilter')
});
const RpcEthNewFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_newFilter'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthNewPendingTransactionFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_newPendingTransactionFilter')
});
const RpcEthSendRawTransaction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_sendRawTransaction'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthSyncing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_syncing'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcUnistallFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_uninstallFilter'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcPersonalSignRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('personal_sign'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthSignTypedDataV4 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_signTypedData_v4'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcEthSendTransactionRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('eth_sendTransaction'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const RpcSolanaSignMessageRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('solana_signMessage'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        pubkey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
    })
});
const RpcSolanaSignTransactionRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('solana_signTransaction'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        transaction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
    })
});
const RpcSolanaSignAllTransactionsRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('solana_signAllTransactions'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        transactions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string())
    })
});
const RpcSolanaSignAndSendTransactionRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('solana_signAndSendTransaction'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        transaction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string(),
        options: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
            skipPreflight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].boolean().optional(),
            preflightCommitment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].enum([
                'processed',
                'confirmed',
                'finalized',
                'recent',
                'single',
                'singleGossip',
                'root',
                'max'
            ]).optional(),
            maxRetries: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().optional(),
            minContextSlot: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number().optional()
        }).optional()
    })
});
const WalletSendCallsRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('wallet_sendCalls'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].number()).optional(),
        from: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional(),
        capabilities: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any().optional(),
        calls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
            to: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().startsWith('0x'),
            data: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().startsWith('0x').optional(),
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional()
        }))
    }))
});
const WalletGetCallsReceiptRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('wallet_getCallsStatus'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string())
});
const WalletGetCapabilitiesRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('wallet_getCapabilities')
});
const WalletGrantPermissionsRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('wallet_grantPermissions'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const WalletRevokePermissionsRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('wallet_revokePermissions'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any()
});
const WalletGetAssetsRequest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].literal('wallet_getAssets'),
    params: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].any())
});
const FrameSession = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string()
});
const EventSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().optional()
});
const W3mFrameSchema = {
    appEvent: EventSchema.extend({
        type: zType('APP_SWITCH_NETWORK'),
        payload: AppSwitchNetworkRequest
    }).or(EventSchema.extend({
        type: zType('APP_CONNECT_EMAIL'),
        payload: AppConnectEmailRequest
    })).or(EventSchema.extend({
        type: zType('APP_CONNECT_DEVICE')
    })).or(EventSchema.extend({
        type: zType('APP_CONNECT_OTP'),
        payload: AppConnectOtpRequest
    })).or(EventSchema.extend({
        type: zType('APP_CONNECT_SOCIAL'),
        payload: AppConnectSocialRequest
    })).or(EventSchema.extend({
        type: zType('APP_GET_FARCASTER_URI')
    })).or(EventSchema.extend({
        type: zType('APP_CONNECT_FARCASTER')
    })).or(EventSchema.extend({
        type: zType('APP_GET_USER'),
        payload: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(AppGetUserRequest)
    })).or(EventSchema.extend({
        type: zType('APP_GET_SOCIAL_REDIRECT_URI'),
        payload: AppGetSocialRedirectUriRequest
    })).or(EventSchema.extend({
        type: zType('APP_SIGN_OUT')
    })).or(EventSchema.extend({
        type: zType('APP_IS_CONNECTED'),
        payload: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$22$2e$4$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].optional(FrameSession)
    })).or(EventSchema.extend({
        type: zType('APP_GET_CHAIN_ID')
    })).or(EventSchema.extend({
        type: zType('APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS')
    })).or(EventSchema.extend({
        type: zType('APP_INIT_SMART_ACCOUNT')
    })).or(EventSchema.extend({
        type: zType('APP_SET_PREFERRED_ACCOUNT'),
        payload: AppSetPreferredAccountRequest
    })).or(EventSchema.extend({
        type: zType('APP_RPC_REQUEST'),
        payload: RpcPersonalSignRequest.or(WalletGetAssetsRequest).or(RpcEthAccountsRequest).or(RpcEthBlockNumber).or(RpcEthCall).or(RpcEthChainId).or(RpcEthEstimateGas).or(RpcEthFeeHistory).or(RpcEthGasPrice).or(RpcEthGetAccount).or(RpcEthGetBalance).or(RpcEthGetBlockyByHash).or(RpcEthGetBlockByNumber).or(RpcEthGetBlockReceipts).or(RcpEthGetBlockTransactionCountByHash).or(RcpEthGetBlockTransactionCountByNumber).or(RpcEthGetCode).or(RpcEthGetFilter).or(RpcEthGetFilterLogs).or(RpcEthGetLogs).or(RpcEthGetProof).or(RpcEthGetStorageAt).or(RpcEthGetTransactionByBlockHashAndIndex).or(RpcEthGetTransactionByBlockNumberAndIndex).or(RpcEthGetTransactionByHash).or(RpcEthGetTransactionCount).or(RpcEthGetTransactionReceipt).or(RpcEthGetUncleCountByBlockHash).or(RpcEthGetUncleCountByBlockNumber).or(RpcEthMaxPriorityFeePerGas).or(RpcEthNewBlockFilter).or(RpcEthNewFilter).or(RpcEthNewPendingTransactionFilter).or(RpcEthSendRawTransaction).or(RpcEthSyncing).or(RpcUnistallFilter).or(RpcPersonalSignRequest).or(RpcEthSignTypedDataV4).or(RpcEthSendTransactionRequest).or(RpcSolanaSignMessageRequest).or(RpcSolanaSignTransactionRequest).or(RpcSolanaSignAllTransactionsRequest).or(RpcSolanaSignAndSendTransactionRequest).or(WalletGetCallsReceiptRequest).or(WalletSendCallsRequest).or(WalletGetCapabilitiesRequest).or(WalletGrantPermissionsRequest).or(WalletRevokePermissionsRequest)
    })).or(EventSchema.extend({
        type: zType('APP_UPDATE_EMAIL'),
        payload: AppUpdateEmailRequest
    })).or(EventSchema.extend({
        type: zType('APP_UPDATE_EMAIL_PRIMARY_OTP'),
        payload: AppUpdateEmailPrimaryOtpRequest
    })).or(EventSchema.extend({
        type: zType('APP_UPDATE_EMAIL_SECONDARY_OTP'),
        payload: AppUpdateEmailSecondaryOtpRequest
    })).or(EventSchema.extend({
        type: zType('APP_SYNC_THEME'),
        payload: AppSyncThemeRequest
    })).or(EventSchema.extend({
        type: zType('APP_SYNC_DAPP_DATA'),
        payload: AppSyncDappDataRequest
    })).or(EventSchema.extend({
        type: zType('APP_RELOAD')
    })),
    frameEvent: EventSchema.extend({
        type: zType('FRAME_SWITCH_NETWORK_ERROR'),
        payload: zError
    }).or(EventSchema.extend({
        type: zType('FRAME_SWITCH_NETWORK_SUCCESS'),
        payload: FrameSwitchNetworkResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_EMAIL_SUCCESS'),
        payload: FrameConnectEmailResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_EMAIL_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_FARCASTER_URI_SUCCESS'),
        payload: FrameGetFarcasterUriResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_FARCASTER_URI_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_FARCASTER_SUCCESS'),
        payload: FrameConnectFarcasterResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_FARCASTER_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_OTP_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_OTP_SUCCESS')
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_DEVICE_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_DEVICE_SUCCESS')
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_SOCIAL_SUCCESS'),
        payload: FrameConnectSocialResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_CONNECT_SOCIAL_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_USER_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_USER_SUCCESS'),
        payload: FrameGetUserResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_SOCIAL_REDIRECT_URI_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS'),
        payload: FrameGetSocialRedirectUriResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_SIGN_OUT_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_SIGN_OUT_SUCCESS')
    })).or(EventSchema.extend({
        type: zType('FRAME_IS_CONNECTED_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_IS_CONNECTED_SUCCESS'),
        payload: FrameIsConnectedResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_CHAIN_ID_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_CHAIN_ID_SUCCESS'),
        payload: FrameGetChainIdResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_RPC_REQUEST_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_RPC_REQUEST_SUCCESS'),
        payload: RpcResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_SESSION_UPDATE'),
        payload: FrameSession
    })).or(EventSchema.extend({
        type: zType('FRAME_UPDATE_EMAIL_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_UPDATE_EMAIL_SUCCESS'),
        payload: FrameUpdateEmailResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS')
    })).or(EventSchema.extend({
        type: zType('FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS'),
        payload: FrameUpdateEmailSecondaryOtpResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_SYNC_THEME_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_SYNC_THEME_SUCCESS')
    })).or(EventSchema.extend({
        type: zType('FRAME_SYNC_DAPP_DATA_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_SYNC_DAPP_DATA_SUCCESS')
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS'),
        payload: FrameGetSmartAccountEnabledNetworksResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_INIT_SMART_ACCOUNT_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_SET_PREFERRED_ACCOUNT_SUCCESS'),
        payload: FrameSetPreferredAccountResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_SET_PREFERRED_ACCOUNT_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_READY'),
        payload: FrameReadyResponse
    })).or(EventSchema.extend({
        type: zType('FRAME_RELOAD_ERROR'),
        payload: zError
    })).or(EventSchema.extend({
        type: zType('FRAME_RELOAD_SUCCESS')
    }))
}; //# sourceMappingURL=W3mFrameSchema.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrame.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mFrame": (()=>W3mFrame)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameSchema.js [app-client] (ecmascript)");
;
;
;
;
function shouldHandleEvent(eventKey, data = {}) {
    return typeof data?.type === 'string' && data?.type?.includes(eventKey);
}
class W3mFrame {
    constructor({ projectId, isAppClient = false, chainId = 'eip155:1', enableLogger = true }){
        this.iframe = null;
        this.rpcUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConstantsUtil"].BLOCKCHAIN_API_RPC_URL;
        this.initFrame = ()=>{
            const isFrameInitialized = document.getElementById('w3m-iframe');
            if (this.iframe && !isFrameInitialized) {
                document.body.appendChild(this.iframe);
            }
        };
        this.events = {
            registerFrameEventHandler: (id, callback, signal)=>{
                function eventHandler({ data }) {
                    if (!shouldHandleEvent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_EVENT_KEY, data)) {
                        return;
                    }
                    const frameEvent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameSchema"].frameEvent.parse(data);
                    if (frameEvent.id === id) {
                        callback(frameEvent);
                        window.removeEventListener('message', eventHandler);
                    }
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
                    window.addEventListener('message', eventHandler);
                    signal.addEventListener('abort', ()=>{
                        window.removeEventListener('message', eventHandler);
                    });
                }
            },
            onFrameEvent: (callback)=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
                    window.addEventListener('message', ({ data })=>{
                        if (!shouldHandleEvent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_EVENT_KEY, data)) {
                            return;
                        }
                        const frameEvent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameSchema"].frameEvent.parse(data);
                        callback(frameEvent);
                    });
                }
            },
            onAppEvent: (callback)=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
                    window.addEventListener('message', ({ data })=>{
                        if (!shouldHandleEvent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_EVENT_KEY, data)) {
                            return;
                        }
                        const appEvent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameSchema"].appEvent.parse(data);
                        callback(appEvent);
                    });
                }
            },
            postAppEvent: (event)=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
                    if (!this.iframe?.contentWindow) {
                        throw new Error('W3mFrame: iframe is not set');
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameSchema"].appEvent.parse(event);
                    this.iframe.contentWindow.postMessage(event, '*');
                }
            },
            postFrameEvent: (event)=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
                    if (!parent) {
                        throw new Error('W3mFrame: parent is not set');
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameSchema"].frameEvent.parse(event);
                    parent.postMessage(event, '*');
                }
            }
        };
        this.projectId = projectId;
        this.frameLoadPromise = new Promise((resolve, reject)=>{
            this.frameLoadPromiseResolver = {
                resolve,
                reject
            };
        });
        if (isAppClient) {
            this.frameLoadPromise = new Promise((resolve, reject)=>{
                this.frameLoadPromiseResolver = {
                    resolve,
                    reject
                };
            });
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].isClient) {
                const iframe = document.createElement('iframe');
                iframe.id = 'w3m-iframe';
                iframe.src = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECURE_SITE_SDK"]}?projectId=${projectId}&chainId=${chainId}&version=${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECURE_SITE_SDK_VERSION"]}&enableLogger=${enableLogger}`;
                iframe.name = 'w3m-secure-iframe';
                iframe.style.position = 'fixed';
                iframe.style.zIndex = '999999';
                iframe.style.display = 'none';
                iframe.style.animationDelay = '0s, 50ms';
                iframe.style.borderBottomLeftRadius = `clamp(0px, var(--wui-border-radius-l), 44px)`;
                iframe.style.borderBottomRightRadius = `clamp(0px, var(--wui-border-radius-l), 44px)`;
                this.iframe = iframe;
                this.iframe.onerror = ()=>{
                    this.frameLoadPromiseResolver?.reject('Unable to load email login dependency');
                };
                this.events.onFrameEvent((event)=>{
                    if (event.type === '@w3m-frame/READY') {
                        this.frameLoadPromiseResolver?.resolve(undefined);
                    }
                });
            }
        }
    }
    get networks() {
        const data = [
            'eip155:1',
            'eip155:5',
            'eip155:11155111',
            'eip155:10',
            'eip155:420',
            'eip155:42161',
            'eip155:421613',
            'eip155:137',
            'eip155:80001',
            'eip155:42220',
            'eip155:1313161554',
            'eip155:1313161555',
            'eip155:56',
            'eip155:97',
            'eip155:43114',
            'eip155:43113',
            'eip155:324',
            'eip155:280',
            'eip155:100',
            'eip155:8453',
            'eip155:84531',
            'eip155:84532',
            'eip155:7777777',
            'eip155:999',
            'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
            'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
            'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'
        ].map((id)=>({
                [id]: {
                    rpcUrl: `${this.rpcUrl}/v1/?chainId=${id}&projectId=${this.projectId}`,
                    chainId: id
                }
            }));
        return Object.assign({}, ...data);
    }
} //# sourceMappingURL=W3mFrame.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameLogger.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mFrameLogger": (()=>W3mFrameLogger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$logger$40$2$2e$1$2e$2$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+logger@2.1.2/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$logger$40$2$2e$1$2e$2$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@walletconnect+logger@2.1.2/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
;
;
class W3mFrameLogger {
    constructor(projectId){
        const loggerOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$logger$40$2$2e$1$2e$2$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_LOG_LEVEL"]
        });
        const { logger, chunkLoggerController } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$logger$40$2$2e$1$2e$2$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generatePlatformLogger"])({
            opts: loggerOptions
        });
        this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$walletconnect$2b$logger$40$2$2e$1$2e$2$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(logger, this.constructor.name);
        this.chunkLoggerController = chunkLoggerController;
        if (typeof window !== 'undefined' && this.chunkLoggerController?.downloadLogsBlobInBrowser) {
            if (!window.downloadAppKitLogsBlob) {
                window.downloadAppKitLogsBlob = {};
            }
            window.downloadAppKitLogsBlob['sdk'] = ()=>{
                if (this.chunkLoggerController?.downloadLogsBlobInBrowser) {
                    this.chunkLoggerController.downloadLogsBlobInBrowser({
                        projectId
                    });
                }
            };
        }
    }
} //# sourceMappingURL=W3mFrameLogger.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameProvider.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mFrameProvider": (()=>W3mFrameProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrame.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameLogger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameStorage.js [app-client] (ecmascript)");
;
;
;
;
;
class W3mFrameProvider {
    constructor({ projectId, chainId, enableLogger = true, onTimeout }){
        this.openRpcRequests = [];
        if (enableLogger) {
            this.w3mLogger = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameLogger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameLogger"](projectId);
        }
        this.w3mFrame = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrame"]({
            projectId,
            isAppClient: true,
            chainId,
            enableLogger
        });
        this.onTimeout = onTimeout;
        if (this.getLoginEmailUsed()) {
            this.w3mFrame.initFrame();
        }
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_GET_USER_SUCCESS) {
                this.user = event.payload;
            }
        });
    }
    getLoginEmailUsed() {
        return Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].EMAIL_LOGIN_USED_KEY));
    }
    getEmail() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].EMAIL);
    }
    getUsername() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].SOCIAL_USERNAME);
    }
    async reload() {
        try {
            this.w3mFrame.initFrame();
            await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_RELOAD
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error reloading iframe');
            throw error;
        }
    }
    async connectEmail(payload) {
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameHelpers"].checkIfAllowedToTriggerEmail();
            this.w3mFrame.initFrame();
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_EMAIL,
                payload
            });
            this.setNewLastEmailLoginTime();
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting email');
            throw error;
        }
    }
    async connectDevice() {
        try {
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_DEVICE
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting device');
            throw error;
        }
    }
    async connectOtp(payload) {
        try {
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_OTP,
                payload
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting otp');
            throw error;
        }
    }
    async isConnected() {
        try {
            if (!this.getLoginEmailUsed()) {
                return {
                    isConnected: false
                };
            }
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_IS_CONNECTED
            });
            if (!response.isConnected) {
                this.deleteAuthLoginCache();
            }
            return response;
        } catch (error) {
            this.deleteAuthLoginCache();
            this.w3mLogger?.logger.error({
                error
            }, 'Error checking connection');
            throw error;
        }
    }
    async getChainId() {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_CHAIN_ID
            });
            this.setLastUsedChainId(response.chainId);
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error getting chain id');
            throw error;
        }
    }
    async getSocialRedirectUri(payload) {
        try {
            this.w3mFrame.initFrame();
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_SOCIAL_REDIRECT_URI,
                payload
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error getting social redirect uri');
            throw error;
        }
    }
    async updateEmail(payload) {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_UPDATE_EMAIL,
                payload
            });
            this.setNewLastEmailLoginTime();
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error updating email');
            throw error;
        }
    }
    async updateEmailPrimaryOtp(payload) {
        try {
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_UPDATE_EMAIL_PRIMARY_OTP,
                payload
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error updating email primary otp');
            throw error;
        }
    }
    async updateEmailSecondaryOtp(payload) {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_UPDATE_EMAIL_SECONDARY_OTP,
                payload
            });
            this.setLoginSuccess(response.newEmail);
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error updating email secondary otp');
            throw error;
        }
    }
    async syncTheme(payload) {
        try {
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_SYNC_THEME,
                payload
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error syncing theme');
            throw error;
        }
    }
    async syncDappData(payload) {
        try {
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_SYNC_DAPP_DATA,
                payload
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error syncing dapp data');
            throw error;
        }
    }
    async getSmartAccountEnabledNetworks() {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS
            });
            this.persistSmartAccountEnabledNetworks(response.smartAccountEnabledNetworks);
            return response;
        } catch (error) {
            this.persistSmartAccountEnabledNetworks([]);
            this.w3mLogger?.logger.error({
                error
            }, 'Error getting smart account enabled networks');
            throw error;
        }
    }
    async setPreferredAccount(type) {
        try {
            return this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_SET_PREFERRED_ACCOUNT,
                payload: {
                    type
                }
            });
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error setting preferred account');
            throw error;
        }
    }
    async connect(payload) {
        try {
            const chainId = payload?.chainId || this.getLastUsedChainId() || 1;
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_USER,
                payload: {
                    ...payload,
                    chainId
                }
            });
            this.setLoginSuccess(response.email);
            this.setLastUsedChainId(response.chainId);
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting');
            throw error;
        }
    }
    async getUser(payload) {
        try {
            const chainId = payload?.chainId || this.getLastUsedChainId() || 1;
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_USER,
                payload: {
                    ...payload,
                    chainId
                }
            });
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting');
            throw error;
        }
    }
    async connectSocial(uri) {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_SOCIAL,
                payload: {
                    uri
                }
            });
            if (response.userName) {
                this.setSocialLoginSuccess(response.userName);
            }
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting social');
            throw error;
        }
    }
    async getFarcasterUri() {
        try {
            this.w3mFrame.initFrame();
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_FARCASTER_URI
            });
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error getting farcaster uri');
            throw error;
        }
    }
    async connectFarcaster() {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_FARCASTER
            });
            if (response.userName) {
                this.setSocialLoginSuccess(response.userName);
            }
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error connecting farcaster');
            throw error;
        }
    }
    async switchNetwork(chainId) {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_SWITCH_NETWORK,
                payload: {
                    chainId
                }
            });
            this.setLastUsedChainId(response.chainId);
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error switching network');
            throw error;
        }
    }
    async disconnect() {
        try {
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_SIGN_OUT
            });
            this.deleteAuthLoginCache();
            return response;
        } catch (error) {
            this.w3mLogger?.logger.error({
                error
            }, 'Error disconnecting');
            throw error;
        }
    }
    async request(req) {
        try {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].GET_CHAIN_ID === req.method) {
                return this.getLastUsedChainId();
            }
            this.rpcRequestHandler?.(req);
            const response = await this.appEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_RPC_REQUEST,
                payload: req
            });
            this.rpcSuccessHandler?.(response, req);
            return response;
        } catch (error) {
            this.rpcErrorHandler?.(error, req);
            this.w3mLogger?.logger.error({
                error
            }, 'Error requesting');
            throw error;
        }
    }
    onRpcRequest(callback) {
        this.rpcRequestHandler = callback;
    }
    onRpcSuccess(callback) {
        this.rpcSuccessHandler = callback;
    }
    onRpcError(callback) {
        this.rpcErrorHandler = callback;
    }
    onIsConnected(callback) {
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_IS_CONNECTED_SUCCESS && event.payload.isConnected) {
                callback();
            }
        });
    }
    onNotConnected(callback) {
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_IS_CONNECTED_ERROR) {
                callback();
            }
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_IS_CONNECTED_SUCCESS && !event.payload.isConnected) {
                callback();
            }
        });
    }
    onConnect(callback) {
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_GET_USER_SUCCESS) {
                callback(event.payload);
            }
        });
    }
    onSocialConnected(callback) {
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_CONNECT_SOCIAL_SUCCESS) {
                callback(event.payload);
            }
        });
    }
    async getCapabilities() {
        try {
            const capabilities = await this.request({
                method: 'wallet_getCapabilities'
            });
            return capabilities || {};
        } catch  {
            return {};
        }
    }
    onSetPreferredAccount(callback) {
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_SET_PREFERRED_ACCOUNT_SUCCESS) {
                callback(event.payload);
            } else if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_SET_PREFERRED_ACCOUNT_ERROR) {
                callback({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].ACCOUNT_TYPES.EOA
                });
            }
        });
    }
    onGetSmartAccountEnabledNetworks(callback) {
        this.w3mFrame.events.onFrameEvent((event)=>{
            if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS) {
                callback(event.payload.smartAccountEnabledNetworks);
            } else if (event.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR) {
                callback([]);
            }
        });
    }
    getAvailableChainIds() {
        return Object.keys(this.w3mFrame.networks);
    }
    rejectRpcRequests() {
        try {
            this.openRpcRequests.forEach(({ abortController, method })=>{
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameRpcConstants"].SAFE_RPC_METHODS.includes(method)) {
                    abortController.abort();
                }
            });
            this.openRpcRequests = [];
        } catch (e) {
            this.w3mLogger?.logger.error({
                error: e
            }, 'Error aborting RPC request');
        }
    }
    async appEvent(event) {
        await this.w3mFrame.frameLoadPromise;
        let timer = undefined;
        function replaceEventType(type) {
            return type.replace('@w3m-app/', '');
        }
        const abortController = new AbortController();
        const type = replaceEventType(event.type);
        const shouldCheckForTimeout = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_EMAIL,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_DEVICE,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_OTP,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_CONNECT_SOCIAL,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].APP_GET_SOCIAL_REDIRECT_URI
        ].map(replaceEventType).includes(type);
        if (shouldCheckForTimeout) {
            timer = setTimeout(()=>{
                this.onTimeout?.();
                abortController.abort();
            }, 30000);
        }
        return new Promise((resolve, reject)=>{
            const id = Math.random().toString(36).substring(7);
            this.w3mLogger?.logger.info?.({
                event,
                id
            }, 'Sending app event');
            this.w3mFrame.events.postAppEvent({
                ...event,
                id
            });
            if (type === 'RPC_REQUEST') {
                const rpcEvent = event;
                this.openRpcRequests = [
                    ...this.openRpcRequests,
                    {
                        ...rpcEvent.payload,
                        abortController
                    }
                ];
            }
            abortController.signal.addEventListener('abort', ()=>{
                if (type === 'RPC_REQUEST') {
                    reject(new Error('Request was aborted'));
                } else if (type !== 'GET_FARCASTER_URI') {
                    reject(new Error('Something went wrong'));
                }
            });
            function handler(framEvent, logger) {
                if (framEvent.id !== id) {
                    return;
                }
                logger?.logger.info?.({
                    framEvent,
                    id
                }, 'Received frame response');
                if (framEvent.type === `@w3m-frame/${type}_SUCCESS`) {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    if ('payload' in framEvent) {
                        resolve(framEvent.payload);
                    }
                    resolve(undefined);
                } else if (framEvent.type === `@w3m-frame/${type}_ERROR`) {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    if ('payload' in framEvent) {
                        reject(new Error(framEvent.payload?.message || 'An error occurred'));
                    }
                    reject(new Error('An error occurred'));
                }
            }
            this.w3mFrame.events.registerFrameEventHandler(id, (frameEvent)=>handler(frameEvent, this.w3mLogger), abortController.signal);
        });
    }
    setNewLastEmailLoginTime() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_EMAIL_LOGIN_TIME, Date.now().toString());
    }
    setSocialLoginSuccess(username) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].SOCIAL_USERNAME, username);
    }
    setLoginSuccess(email) {
        if (email) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].EMAIL, email);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].EMAIL_LOGIN_USED_KEY, 'true');
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_EMAIL_LOGIN_TIME);
    }
    deleteAuthLoginCache() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].EMAIL_LOGIN_USED_KEY);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].EMAIL);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_USED_CHAIN_KEY);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].SOCIAL_USERNAME);
    }
    setLastUsedChainId(chainId) {
        if (chainId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_USED_CHAIN_KEY, String(chainId));
        }
    }
    getLastUsedChainId() {
        const chainId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].get(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].LAST_USED_CHAIN_KEY) ?? undefined;
        const numberChainId = Number(chainId);
        return isNaN(numberChainId) ? chainId : numberChainId;
    }
    persistSmartAccountEnabledNetworks(networks) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameStorage"].set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["W3mFrameConstants"].SMART_ACCOUNT_ENABLED_NETWORKS, networks.join(','));
    }
} //# sourceMappingURL=W3mFrameProvider.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$polyfills$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$polyfills$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-polyfills@1.6.8/node_modules/@reown/appkit-polyfills/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrame.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameSchema$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameSchema.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameConstants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$src$2f$W3mFrameStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$wallet$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10$2f$node_modules$2f40$reown$2f$appkit$2d$wallet$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-wallet@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10/node_modules/@reown/appkit-wallet/dist/esm/index.js [app-client] (ecmascript) <locals>");
}}),
}]);

//# sourceMappingURL=50f5f_%40reown_appkit-wallet_dist_esm_476e1795._.js.map