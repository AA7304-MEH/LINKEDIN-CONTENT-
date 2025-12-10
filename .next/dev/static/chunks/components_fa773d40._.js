(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/CommentFinder.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "authorName": "CommentFinder-module__Z5jYqq__authorName",
  "authorTitle": "CommentFinder-module__Z5jYqq__authorTitle",
  "avatar": "CommentFinder-module__Z5jYqq__avatar",
  "commentOption": "CommentFinder-module__Z5jYqq__commentOption",
  "commentsSection": "CommentFinder-module__Z5jYqq__commentsSection",
  "container": "CommentFinder-module__Z5jYqq__container",
  "fadeIn": "CommentFinder-module__Z5jYqq__fadeIn",
  "generateButton": "CommentFinder-module__Z5jYqq__generateButton",
  "inputSection": "CommentFinder-module__Z5jYqq__inputSection",
  "metrics": "CommentFinder-module__Z5jYqq__metrics",
  "optionHeader": "CommentFinder-module__Z5jYqq__optionHeader",
  "postCard": "CommentFinder-module__Z5jYqq__postCard",
  "postContent": "CommentFinder-module__Z5jYqq__postContent",
  "postHeader": "CommentFinder-module__Z5jYqq__postHeader",
  "qbadge": "CommentFinder-module__Z5jYqq__qbadge",
  "sbadge": "CommentFinder-module__Z5jYqq__sbadge",
  "searchButton": "CommentFinder-module__Z5jYqq__searchButton",
  "searchInput": "CommentFinder-module__Z5jYqq__searchInput",
  "webadge": "CommentFinder-module__Z5jYqq__webadge",
});
}),
"[project]/components/CommentFinder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommentFinder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/CommentFinder.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Mock Data for "Trending Posts" since we don't have live LinkedIn API access
const MOCK_POSTS = [
    {
        id: 1,
        author: "Sara Blakely",
        title: "Founder, Spanx",
        content: "Failure is not the outcome - failure is not trying. Don't be afraid to fail.",
        likes: "12,453",
        comments: "452"
    },
    {
        id: 2,
        author: "Simon Sinek",
        title: "Optimist & Author",
        content: "Leadership is not about being in charge. It is about taking care of those in your charge.",
        likes: "8,921",
        comments: "312"
    },
    {
        id: 3,
        author: "Gary Vaynerchuk",
        title: "Chairman, VaynerX",
        content: "Stop worrying about what others think. The only person you need to impress is yourself in 10 years.",
        likes: "15,234",
        comments: "891"
    }
];
function CommentFinder() {
    _s();
    const [activePostId, setActivePostId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [generatedComments, setGeneratedComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleGenerate = async (postId, postContent, postAuthor)=>{
        setActivePostId(postId);
        setLoading(true);
        setGeneratedComments(null);
        try {
            const res = await fetch('/api/generate-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postContent,
                    postAuthor
                })
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to generate comments');
            }
            const data = await res.json();
            setGeneratedComments(data);
        } catch (e) {
            alert(e.message || 'Error generating comments');
            setActivePostId(null);
        } finally{
            setLoading(false);
        }
    };
    const copyToClipboard = (text)=>{
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Enter topic to find posts (e.g. 'Marketing')...",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchInput
                    }, void 0, false, {
                        fileName: "[project]/components/CommentFinder.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchButton,
                        children: "Search (Simulated)"
                    }, void 0, false, {
                        fileName: "[project]/components/CommentFinder.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommentFinder.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].results,
                children: MOCK_POSTS.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar,
                                        children: post.author[0]
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 87,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authorName,
                                                children: post.author
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 89,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authorTitle,
                                                children: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 90,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 88,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommentFinder.tsx",
                                lineNumber: 86,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postContent,
                                children: [
                                    '"',
                                    post.content,
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommentFinder.tsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metrics,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "👍 ",
                                            post.likes
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 95,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "💬 ",
                                            post.comments,
                                            " comments"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 96,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommentFinder.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].generateButton,
                                onClick: ()=>handleGenerate(post.id, post.content, post.author),
                                disabled: loading && activePostId === post.id,
                                children: loading && activePostId === post.id ? 'Thinking...' : '⚡ Generate Smart Comments'
                            }, void 0, false, {
                                fileName: "[project]/components/CommentFinder.tsx",
                                lineNumber: 99,
                                columnNumber: 25
                            }, this),
                            activePostId === post.id && generatedComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].commentsSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].commentOption,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].optionHeader,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].webadge,
                                                        children: "Value Add"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentFinder.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(generatedComments.valueAdd),
                                                        children: "Copy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentFinder.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 110,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: generatedComments.valueAdd
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 114,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 109,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].commentOption,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].optionHeader,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].qbadge,
                                                        children: "Question"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentFinder.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(generatedComments.question),
                                                        children: "Copy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentFinder.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 118,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: generatedComments.question
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 122,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 117,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].commentOption,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].optionHeader,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentFinder$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sbadge,
                                                        children: "Story"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentFinder.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>copyToClipboard(generatedComments.story),
                                                        children: "Copy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentFinder.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 126,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: generatedComments.story
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommentFinder.tsx",
                                                lineNumber: 130,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentFinder.tsx",
                                        lineNumber: 125,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommentFinder.tsx",
                                lineNumber: 108,
                                columnNumber: 29
                            }, this)
                        ]
                    }, post.id, true, {
                        fileName: "[project]/components/CommentFinder.tsx",
                        lineNumber: 85,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CommentFinder.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CommentFinder.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_s(CommentFinder, "wVoviX6DNtUvqYfudzIDfXEJpdI=");
_c = CommentFinder;
var _c;
__turbopack_context__.k.register(_c, "CommentFinder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_fa773d40._.js.map