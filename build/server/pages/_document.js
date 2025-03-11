const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules__pnpm_2bcc839e._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__e237d7a2._.js");
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/.pnpm/next@15.2.1_@babel+core@7.26.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/document.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/.pnpm/next@15.2.1_@babel+core@7.26.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/document.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
