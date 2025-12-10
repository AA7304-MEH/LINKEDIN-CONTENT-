(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ContentCalendar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "addButton": "ContentCalendar-module__lW6IAW__addButton",
  "addControls": "ContentCalendar-module__lW6IAW__addControls",
  "addDraftSection": "ContentCalendar-module__lW6IAW__addDraftSection",
  "addInput": "ContentCalendar-module__lW6IAW__addInput",
  "clearBtn": "ContentCalendar-module__lW6IAW__clearBtn",
  "container": "ContentCalendar-module__lW6IAW__container",
  "dayName": "ContentCalendar-module__lW6IAW__dayName",
  "daySlot": "ContentCalendar-module__lW6IAW__daySlot",
  "draftList": "ContentCalendar-module__lW6IAW__draftList",
  "draggablePost": "ContentCalendar-module__lW6IAW__draggablePost",
  "exportButton": "ContentCalendar-module__lW6IAW__exportButton",
  "grid": "ContentCalendar-module__lW6IAW__grid",
  "header": "ContentCalendar-module__lW6IAW__header",
  "layout": "ContentCalendar-module__lW6IAW__layout",
  "placeholder": "ContentCalendar-module__lW6IAW__placeholder",
  "plannedPost": "ContentCalendar-module__lW6IAW__plannedPost",
  "postContent": "ContentCalendar-module__lW6IAW__postContent",
  "postType": "ContentCalendar-module__lW6IAW__postType",
  "scoreBadge": "ContentCalendar-module__lW6IAW__scoreBadge",
  "sidebar": "ContentCalendar-module__lW6IAW__sidebar",
  "slotHeader": "ContentCalendar-module__lW6IAW__slotHeader",
  "slotPosts": "ContentCalendar-module__lW6IAW__slotPosts",
  "tinyType": "ContentCalendar-module__lW6IAW__tinyType",
  "typeSelect": "ContentCalendar-module__lW6IAW__typeSelect",
});
}),
"[project]/components/ContentCalendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContentCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/ContentCalendar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const DAYS = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];
function ContentCalendar() {
    _s();
    // Mock data - in real app would sync with DB
    const [scheduled, setScheduled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DAYS.map({
        "ContentCalendar.useState": (d)=>({
                day: d,
                date: '',
                posts: []
            })
    }["ContentCalendar.useState"]));
    const [newDraft, setNewDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [draftType, setDraftType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Educational');
    const [unscheduled, setUnscheduled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            content: "5 secrets to scaling your startup...",
            type: 'Educational',
            hookScore: 8.5
        },
        {
            id: '2',
            content: "My biggest failure in 2024 was...",
            type: 'Story',
            hookScore: 9.2
        },
        {
            id: '3',
            content: "Why I switched from React to Vue...",
            type: 'Contrarian',
            hookScore: 7.8
        },
        {
            id: '4',
            content: "Join my webinar on Saturday...",
            type: 'Promotional',
            hookScore: 6.0
        }
    ]);
    const handleAddDraft = ()=>{
        if (!newDraft.trim()) return;
        const draft = {
            id: Date.now().toString(),
            content: newDraft,
            type: draftType
        };
        setUnscheduled([
            ...unscheduled,
            draft
        ]);
        setNewDraft('');
    };
    const handleDragStart = (e, post, source)=>{
        e.dataTransfer.setData('post', JSON.stringify(post));
        e.dataTransfer.setData('source', source.toString());
    };
    const handleDrop = (e, dayIndex)=>{
        e.preventDefault();
        const post = JSON.parse(e.dataTransfer.getData('post'));
        const source = e.dataTransfer.getData('source');
        if (scheduled[dayIndex].posts.length >= 3) {
            alert("Max 3 posts per day to maintain quality!");
            return;
        }
        // Add to new slot
        const newScheduled = [
            ...scheduled
        ];
        newScheduled[dayIndex].posts.push(post);
        setScheduled(newScheduled);
        // Remove from source
        if (source === 'sidebar') {
            setUnscheduled(unscheduled.filter((p)=>p.id !== post.id));
        } else {
            const sourceDay = parseInt(source);
            // Don't duplicate if dropped in same slot
            if (sourceDay !== dayIndex) {
                newScheduled[sourceDay].posts = newScheduled[sourceDay].posts.filter((p)=>p.id !== post.id);
                setScheduled(newScheduled);
            }
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
    };
    const clearDay = (dayIndex)=>{
        const postsToReturn = scheduled[dayIndex].posts;
        const newScheduled = [
            ...scheduled
        ];
        newScheduled[dayIndex].posts = [];
        setScheduled(newScheduled);
        setUnscheduled([
            ...unscheduled,
            ...postsToReturn
        ]);
    };
    const exportSchedule = ()=>{
        let text = "📅 Content Schedule:\n\n";
        scheduled.forEach((slot)=>{
            if (slot.posts.length > 0) {
                text += `${slot.day}:\n`;
                slot.posts.forEach((p)=>text += `- [${p.type}] ${p.content.substring(0, 50)}...\n`);
                text += "\n";
            }
        });
        navigator.clipboard.writeText(text);
        alert("Schedule copied to clipboard!");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Weekly Planner"
                    }, void 0, false, {
                        fileName: "[project]/components/ContentCalendar.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].exportButton,
                        onClick: exportSchedule,
                        children: "Export Text"
                    }, void 0, false, {
                        fileName: "[project]/components/ContentCalendar.tsx",
                        lineNumber: 110,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContentCalendar.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addDraftSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Add New Idea"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContentCalendar.tsx",
                                        lineNumber: 117,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: newDraft,
                                        onChange: (e)=>setNewDraft(e.target.value),
                                        placeholder: "Type your post idea...",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addInput
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContentCalendar.tsx",
                                        lineNumber: 118,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addControls,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: draftType,
                                                onChange: (e)=>setDraftType(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].typeSelect,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Educational"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ContentCalendar.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Story"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ContentCalendar.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Contrarian"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ContentCalendar.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Promotional"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ContentCalendar.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ContentCalendar.tsx",
                                                lineNumber: 125,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleAddDraft,
                                                disabled: !newDraft.trim(),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addButton,
                                                children: "Add"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContentCalendar.tsx",
                                                lineNumber: 131,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ContentCalendar.tsx",
                                        lineNumber: 124,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContentCalendar.tsx",
                                lineNumber: 116,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Unscheduled Drafts"
                            }, void 0, false, {
                                fileName: "[project]/components/ContentCalendar.tsx",
                                lineNumber: 135,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].draftList,
                                children: [
                                    unscheduled.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].draggablePost,
                                            draggable: true,
                                            onDragStart: (e)=>handleDragStart(e, post, 'sidebar'),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postType,
                                                    children: post.type
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ContentCalendar.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postContent,
                                                    children: [
                                                        post.content.substring(0, 40),
                                                        "..."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/ContentCalendar.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 33
                                                }, this),
                                                post.hookScore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scoreBadge,
                                                    style: {
                                                        background: post.hookScore > 8 ? '#10b981' : '#f59e0b'
                                                    },
                                                    children: post.hookScore
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ContentCalendar.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, post.id, true, {
                                            fileName: "[project]/components/ContentCalendar.tsx",
                                            lineNumber: 138,
                                            columnNumber: 29
                                        }, this)),
                                    unscheduled.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].empty,
                                        children: "All planned!"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContentCalendar.tsx",
                                        lineNumber: 156,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContentCalendar.tsx",
                                lineNumber: 136,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContentCalendar.tsx",
                        lineNumber: 115,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                        children: scheduled.map((slot, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].daySlot,
                                onDragOver: handleDragOver,
                                onDrop: (e)=>handleDrop(e, i),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slotHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dayName,
                                                children: slot.day
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContentCalendar.tsx",
                                                lineNumber: 170,
                                                columnNumber: 33
                                            }, this),
                                            slot.posts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clearBtn,
                                                onClick: ()=>clearDay(i),
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContentCalendar.tsx",
                                                lineNumber: 172,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ContentCalendar.tsx",
                                        lineNumber: 169,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slotPosts,
                                        children: [
                                            slot.posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].plannedPost,
                                                    draggable: true,
                                                    onDragStart: (e)=>handleDragStart(e, post, i),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tinyType,
                                                            children: post.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ContentCalendar.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 41
                                                        }, this),
                                                        post.content.substring(0, 30),
                                                        "..."
                                                    ]
                                                }, post.id, true, {
                                                    fileName: "[project]/components/ContentCalendar.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 37
                                                }, this)),
                                            slot.posts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContentCalendar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholder,
                                                children: "Drop here"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ContentCalendar.tsx",
                                                lineNumber: 188,
                                                columnNumber: 61
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ContentCalendar.tsx",
                                        lineNumber: 176,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, slot.day, true, {
                                fileName: "[project]/components/ContentCalendar.tsx",
                                lineNumber: 163,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ContentCalendar.tsx",
                        lineNumber: 161,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContentCalendar.tsx",
                lineNumber: 113,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ContentCalendar.tsx",
        lineNumber: 107,
        columnNumber: 9
    }, this);
}
_s(ContentCalendar, "qucq0Rd1VBtQ1fFXHgbTXImUmws=");
_c = ContentCalendar;
var _c;
__turbopack_context__.k.register(_c, "ContentCalendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_6379d1c9._.js.map