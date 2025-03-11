(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/3a3ed_isows__esm_3aef3016._.js", {

"[project]/node_modules/.pnpm/isows@1.0.6_ws@8.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10_/node_modules/isows/_esm/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getNativeWebSocket": (()=>getNativeWebSocket)
});
function getNativeWebSocket() {
    if (typeof WebSocket !== "undefined") return WebSocket;
    if (typeof global.WebSocket !== "undefined") return global.WebSocket;
    if (typeof window.WebSocket !== "undefined") return window.WebSocket;
    if (typeof self.WebSocket !== "undefined") return self.WebSocket;
    throw new Error("`WebSocket` is not supported in this environment");
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/.pnpm/isows@1.0.6_ws@8.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10_/node_modules/isows/_esm/native.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "WebSocket": (()=>WebSocket)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$isows$40$1$2e$0$2e$6_ws$40$8$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10_$2f$node_modules$2f$isows$2f$_esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/isows@1.0.6_ws@8.18.0_bufferutil@4.0.9_utf-8-validate@5.0.10_/node_modules/isows/_esm/utils.js [app-client] (ecmascript)");
;
const WebSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$isows$40$1$2e$0$2e$6_ws$40$8$2e$18$2e$0_bufferutil$40$4$2e$0$2e$9_utf$2d$8$2d$validate$40$5$2e$0$2e$10_$2f$node_modules$2f$isows$2f$_esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNativeWebSocket"])(); //# sourceMappingURL=native.js.map
}}),
}]);

//# sourceMappingURL=3a3ed_isows__esm_3aef3016._.js.map