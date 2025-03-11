module.exports = {

"[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/styles.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$40$3$2e$1$2e$0$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit@3.1.0/node_modules/lit/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/node/development/css-tag.js [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;
 //# sourceMappingURL=styles.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mModal": (()=>W3mModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$40$3$2e$1$2e$0$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit@3.1.0/node_modules/lit/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$element$40$4$2e$1$2e$1$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit-element@4.1.1/node_modules/lit-element/development/lit-element.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$html$40$3$2e$2$2e$1$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit-html@3.2.1/node_modules/lit-html/node/development/lit-html.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$40$3$2e$1$2e$0$2f$node_modules$2f$lit$2f$decorators$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit@3.1.0/node_modules/lit/decorators.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/node/development/decorators/property.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@lit+reactive-element@2.0.4/node_modules/@lit/reactive-element/node/development/decorators/state.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$40$3$2e$1$2e$0$2f$node_modules$2f$lit$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit@3.1.0/node_modules/lit/directives/if-defined.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$html$40$3$2e$2$2e$1$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lit-html@3.2.1/node_modules/lit-html/node/development/directives/if-defined.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-common@1.6.8_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.22.4/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$exports$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/exports/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ApiController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/AssetUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ChainController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/CoreHelperUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ModalController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/OptionsController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/RouterController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/utils/SIWXUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/SnackController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-core@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_typescript@_93649c074a226a601b7ca66de870db9f/node_modules/@reown/appkit-core/dist/esm/src/controllers/ThemeController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-ui@1.6.8/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$styles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/styles.js [app-ssr] (ecmascript)");
var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
;
;
;
;
;
;
const SCROLL_LOCK = 'scroll-lock';
let W3mModal = class W3mModal extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$element$40$4$2e$1$2e$1$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LitElement"] {
    constructor(){
        super();
        this.unsubscribe = [];
        this.abortController = undefined;
        this.hasPrefetched = false;
        this.enableEmbedded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEmbedded;
        this.open = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].state.open;
        this.caipAddress = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipAddress;
        this.caipNetwork = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.activeCaipNetwork;
        this.shake = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].state.shake;
        this.initializeTheming();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].prefetchAnalyticsConfig();
        this.unsubscribe.push(...[
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('open', (val)=>val ? this.onOpen() : this.onClose()),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].subscribeKey('shake', (val)=>this.shake = val),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipNetwork', (val)=>this.onNewNetwork(val)),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].subscribeKey('activeCaipAddress', (val)=>this.onNewAddress(val)),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].subscribeKey('enableEmbedded', (val)=>this.enableEmbedded = val)
        ]);
    }
    firstUpdated() {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssetUtil"].fetchNetworkImage(this.caipNetwork?.assets?.imageId);
        if (this.caipAddress) {
            if (this.enableEmbedded) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].close();
                this.prefetch();
                return;
            }
            this.onNewAddress(this.caipAddress);
        }
        if (this.open) {
            this.onOpen();
        }
        if (this.enableEmbedded) {
            this.prefetch();
        }
    }
    disconnectedCallback() {
        this.unsubscribe.forEach((unsubscribe)=>unsubscribe());
        this.onRemoveKeyboardListener();
    }
    render() {
        this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? 'clamp(0px, var(--wui-border-radius-l), 44px)' : '0px'};
    `;
        if (this.enableEmbedded) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$html$40$3$2e$2$2e$1$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["html"]`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `;
        }
        return this.open ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$html$40$3$2e$2$2e$1$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["html"]`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        ` : null;
    }
    contentTemplate() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$html$40$3$2e$2$2e$1$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["html"]` <wui-card
      shake="${this.shake}"
      data-embedded="${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lit$2d$html$40$3$2e$2$2e$1$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$directives$2f$if$2d$defined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ifDefined"])(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
    }
    async onOverlayClick(event) {
        if (event.target === event.currentTarget) {
            await this.handleClose();
        }
    }
    async handleClose() {
        const isUnsupportedChain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'UnsupportedChain';
        if (isUnsupportedChain || await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIWXUtil"].isSIWXCloseDisabled()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].shake();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].close();
        }
    }
    initializeTheming() {
        const { themeVariables, themeMode } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ThemeController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeController"].state;
        const defaultThemeMode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UiHelperUtil"].getColorTheme(themeMode);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeTheming"])(themeVariables, defaultThemeMode);
    }
    onClose() {
        this.open = false;
        this.classList.remove('open');
        this.onScrollUnlock();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$SnackController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SnackController"].hide();
        this.onRemoveKeyboardListener();
    }
    onOpen() {
        this.prefetch();
        this.open = true;
        this.classList.add('open');
        this.onScrollLock();
        this.onAddKeyboardListener();
    }
    onScrollLock() {
        const styleTag = document.createElement('style');
        styleTag.dataset['w3m'] = SCROLL_LOCK;
        styleTag.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `;
        document.head.appendChild(styleTag);
    }
    onScrollUnlock() {
        const styleTag = document.head.querySelector(`style[data-w3m="${SCROLL_LOCK}"]`);
        if (styleTag) {
            styleTag.remove();
        }
    }
    onAddKeyboardListener() {
        this.abortController = new AbortController();
        const card = this.shadowRoot?.querySelector('wui-card');
        card?.focus();
        window.addEventListener('keydown', (event)=>{
            if (event.key === 'Escape') {
                this.handleClose();
            } else if (event.key === 'Tab') {
                const { tagName } = event.target;
                if (tagName && !tagName.includes('W3M-') && !tagName.includes('WUI-')) {
                    card?.focus();
                }
            }
        }, this.abortController);
    }
    onRemoveKeyboardListener() {
        this.abortController?.abort();
        this.abortController = undefined;
    }
    async onNewAddress(caipAddress) {
        const isSwitchingNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.isSwitchingNamespace;
        const nextConnected = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoreHelperUtil"].getPlainAddress(caipAddress);
        const isDisconnectedInSameNamespace = !nextConnected && !isSwitchingNamespace;
        const isSwitchingNamespaceAndConnected = isSwitchingNamespace && nextConnected;
        if (isDisconnectedInSameNamespace) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ModalController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalController"].close();
        } else if (isSwitchingNamespaceAndConnected) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RouterController"].goBack();
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$SIWXUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIWXUtil"].initializeIfEnabled();
        this.caipAddress = caipAddress;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].setIsSwitchingNamespace(false);
    }
    onNewNetwork(nextCaipNetwork) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$utils$2f$AssetUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssetUtil"].fetchNetworkImage(nextCaipNetwork?.assets?.imageId);
        const prevCaipNetworkId = this.caipNetwork?.caipNetworkId?.toString();
        const nextNetworkId = nextCaipNetwork?.caipNetworkId?.toString();
        const networkChanged = prevCaipNetworkId && nextNetworkId && prevCaipNetworkId !== nextNetworkId;
        const isSwitchingNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.isSwitchingNamespace;
        const isUnsupportedNetwork = this.caipNetwork?.name === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$common$40$1$2e$6$2e$8_bufferutil$40$4$2e$0$2e$9_typescript$40$5$2e$7$2e$3_utf$2d$8$2d$validate$40$5$2e$0$2e$10_zod$40$3$2e$22$2e$4$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME;
        const isConnectingExternal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'ConnectingExternal';
        const isNotConnected = !this.caipAddress;
        const isNetworkChangedInSameNamespace = networkChanged && !isUnsupportedNetwork && !isSwitchingNamespace;
        const isUnsupportedNetworkScreen = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RouterController"].state.view === 'UnsupportedChain';
        if (!isConnectingExternal && (isNotConnected || isUnsupportedNetworkScreen || isNetworkChangedInSameNamespace)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$RouterController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RouterController"].goBack();
        }
        this.caipNetwork = nextCaipNetwork;
    }
    prefetch() {
        if (!this.hasPrefetched) {
            this.hasPrefetched = true;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$core$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_typescript$40$_93649c074a226a601b7ca66de870db9f$2f$node_modules$2f40$reown$2f$appkit$2d$core$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].prefetch();
        }
    }
};
W3mModal.styles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$styles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$property$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["property"])({
        type: Boolean
    })
], W3mModal.prototype, "enableEmbedded", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["state"])()
], W3mModal.prototype, "open", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["state"])()
], W3mModal.prototype, "caipAddress", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["state"])()
], W3mModal.prototype, "caipNetwork", void 0);
__decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$lit$2b$reactive$2d$element$40$2$2e$0$2e$4$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$decorators$2f$state$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["state"])()
], W3mModal.prototype, "shake", void 0);
W3mModal = __decorate([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$ui$40$1$2e$6$2e$8$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["customElement"])('w3m-modal')
], W3mModal);
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
;
 //# sourceMappingURL=w3m-modal.js.map
}}),
"[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$w3m$2d$modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mModal": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["W3mModal"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$modal$2f$w3m$2d$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/modal/w3m-modal/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$w3m$2d$modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <locals>");
}}),
"[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "W3mModal": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$w3m$2d$modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__["W3mModal"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$w3m$2d$modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$reown$2b$appkit$2d$scaffold$2d$ui$40$1$2e$6$2e$8_$40$types$2b$react$40$19$2e$0$2e$10_bufferutil$40$4$2e$0$2e$9_react$40$18$2e$3$2e$1_type_af3cfa31b14d6cb466d66e3ff078925d$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$exports$2f$w3m$2d$modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@reown+appkit-scaffold-ui@1.6.8_@types+react@19.0.10_bufferutil@4.0.9_react@18.3.1_type_af3cfa31b14d6cb466d66e3ff078925d/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/w3m-modal.js [app-ssr] (ecmascript) <exports>");
}}),

};

//# sourceMappingURL=14a25_%40reown_appkit-scaffold-ui_dist_esm_4243de39._.js.map