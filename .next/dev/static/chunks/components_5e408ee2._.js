(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ViralHookAnalyzer.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "alternatives": "ViralHookAnalyzer-module__um29jW__alternatives",
  "analyzeButton": "ViralHookAnalyzer-module__um29jW__analyzeButton",
  "badge": "ViralHookAnalyzer-module__um29jW__badge",
  "badges": "ViralHookAnalyzer-module__um29jW__badges",
  "container": "ViralHookAnalyzer-module__um29jW__container",
  "explanationToggle": "ViralHookAnalyzer-module__um29jW__explanationToggle",
  "fadeIn": "ViralHookAnalyzer-module__um29jW__fadeIn",
  "feedback": "ViralHookAnalyzer-module__um29jW__feedback",
  "green": "ViralHookAnalyzer-module__um29jW__green",
  "inputGroup": "ViralHookAnalyzer-module__um29jW__inputGroup",
  "red": "ViralHookAnalyzer-module__um29jW__red",
  "resultContainer": "ViralHookAnalyzer-module__um29jW__resultContainer",
  "scoreCircle": "ViralHookAnalyzer-module__um29jW__scoreCircle",
  "scoreLabel": "ViralHookAnalyzer-module__um29jW__scoreLabel",
  "scoreValue": "ViralHookAnalyzer-module__um29jW__scoreValue",
  "subtitle": "ViralHookAnalyzer-module__um29jW__subtitle",
  "textarea": "ViralHookAnalyzer-module__um29jW__textarea",
  "title": "ViralHookAnalyzer-module__um29jW__title",
  "yellow": "ViralHookAnalyzer-module__um29jW__yellow",
});
}),
"[project]/components/ViralHookAnalyzer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ViralHookAnalyzer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/ViralHookAnalyzer.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ViralHookAnalyzer() {
    _s();
    const [hook, setHook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showExplanation, setShowExplanation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleAnalyze = async ()=>{
        if (!hook.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch('/api/analyze-hook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hook
                })
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to analyze');
            }
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            alert(error.message || 'Failed to analyze hook. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "Viral Hook Engine"
            }, void 0, false, {
                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                children: "Test your opening line before you post."
            }, void 0, false, {
                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                        value: hook,
                        onChange: (e)=>setHook(e.target.value),
                        placeholder: "Paste your hook here...",
                        rows: 3
                    }, void 0, false, {
                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].analyzeButton,
                        onClick: handleAnalyze,
                        disabled: loading || !hook.trim(),
                        children: loading ? 'Analyzing...' : 'Analyze Hook'
                    }, void 0, false, {
                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scoreCircle} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][result.color]}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scoreValue,
                                children: result.score
                            }, void 0, false, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 73,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scoreLabel,
                                children: "/ 10"
                            }, void 0, false, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badges,
                        children: result.badges.map((badge, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge,
                                children: [
                                    badge.includes('warning') || badge.includes('Generic') ? '⚠️' : '✅',
                                    " ",
                                    badge
                                ]
                            }, index, true, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 79,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].explanationToggle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowExplanation(!showExplanation),
                                children: showExplanation ? 'Hide Explanation' : 'Why this score?'
                            }, void 0, false, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 86,
                                columnNumber: 25
                            }, this),
                            showExplanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].feedback,
                                children: result.feedback
                            }, void 0, false, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 89,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                        lineNumber: 85,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ViralHookAnalyzer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].alternatives,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Try these instead:"
                            }, void 0, false, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: result.alternatives.map((alt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: alt
                                    }, i, false, {
                                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                        lineNumber: 96,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ViralHookAnalyzer.tsx",
                        lineNumber: 92,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ViralHookAnalyzer.tsx",
                lineNumber: 71,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ViralHookAnalyzer.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
_s(ViralHookAnalyzer, "UdkrC/cv21oxTEn8pJvyBHm/DaE=");
_c = ViralHookAnalyzer;
var _c;
__turbopack_context__.k.register(_c, "ViralHookAnalyzer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_5e408ee2._.js.map