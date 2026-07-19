"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import styles from './ContentCalendar.module.css';

interface CalendarPost {
    id: string; // Post ID or custom draft ID
    calendarEntryId?: string; // DB calendar entry ID
    content: string;
    type: string;
    hookScore?: number;
}

interface DaySlot {
    day: string;
    date: string;
    posts: CalendarPost[];
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getWeekDates = () => {
    const now = new Date();
    const day = now.getDay();
    // Sunday is 0, Monday is 1, etc.
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(now.setDate(diff));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        date.setHours(0, 0, 0, 0);
        dates.push(date);
    }
    return dates;
};

const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

export default function ContentCalendar() {
    const { user, isLoaded } = useUser();
    const [weekDates] = useState<Date[]>(getWeekDates());

    const [scheduled, setScheduled] = useState<DaySlot[]>(
        DAYS.map((d, i) => ({ 
            day: d, 
            date: getWeekDates()[i].toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), 
            posts: [] 
        }))
    );

    const [newDraft, setNewDraft] = useState('');
    const [draftType, setDraftType] = useState('Educational');
    const [unscheduled, setUnscheduled] = useState<CalendarPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Load scheduled and unscheduled posts from DB
    useEffect(() => {
        if (!isLoaded || !user) return;

        const loadCalendarData = async () => {
            setLoading(true);
            try {
                // 1. Fetch scheduled calendar entries from DB
                const calendarRes = await fetch('/api/calendar');
                let calendarEntries = [];
                if (calendarRes.ok) {
                    const data = await calendarRes.json();
                    calendarEntries = data.entries || [];
                }

                // 2. Fetch all user posts/drafts from DB
                const postsRes = await fetch('/api/posts');
                let allPosts: CalendarPost[] = [];
                if (postsRes.ok) {
                    const data = await postsRes.json();
                    allPosts = (data.posts || []).map((p: any) => ({
                        id: p.id,
                        content: p.content,
                        type: p.type || 'Educational',
                        hookScore: p.hookScore ?? undefined,
                    }));
                }

                // Map scheduled posts into corresponding DaySlots based on date
                const scheduledIds = new Set<string>();
                const newScheduled = DAYS.map((d, index) => {
                    const targetDate = weekDates[index];
                    const postsForDay: CalendarPost[] = [];

                    calendarEntries.forEach((entry: any) => {
                        const entryDate = new Date(entry.scheduledAt);
                        if (isSameDay(entryDate, targetDate) && entry.post) {
                            postsForDay.push({
                                id: entry.post.id,
                                calendarEntryId: entry.id,
                                content: entry.post.content,
                                type: entry.post.type || 'Educational',
                                hookScore: entry.post.hookScore ?? undefined,
                            });
                            scheduledIds.add(entry.post.id);
                        }
                    });

                    return {
                        day: d,
                        date: targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                        posts: postsForDay
                    };
                });

                setScheduled(newScheduled);

                // Unscheduled are posts that are NOT present in any DaySlot
                const unschedPosts = allPosts.filter(p => !scheduledIds.has(p.id));
                setUnscheduled(unschedPosts);

            } catch (err) {
                console.error("Error loading content calendar:", err);
            } finally {
                setLoading(false);
            }
        };

        loadCalendarData();
    }, [user, isLoaded, weekDates]);

    const handleAddDraft = async () => {
        if (!newDraft.trim()) return;
        try {
            // Save as draft post in DB
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: newDraft,
                    type: draftType,
                    tone: 'Professional'
                })
            });

            if (res.ok) {
                const data = await res.json();
                const newPost: CalendarPost = {
                    id: data.post.id,
                    content: data.post.content,
                    type: data.post.type || 'Educational',
                    hookScore: data.post.hookScore ?? undefined
                };
                setUnscheduled([...unscheduled, newPost]);
                setNewDraft('');
            }
        } catch (e) {
            console.error("Error adding draft:", e);
        }
    };

    const handleDragStart = (e: React.DragEvent, post: CalendarPost, source: 'sidebar' | number) => {
        e.dataTransfer.setData('post', JSON.stringify(post));
        e.dataTransfer.setData('source', source.toString());
    };

    const handleDrop = async (e: React.DragEvent, dayIndex: number) => {
        e.preventDefault();
        const post = JSON.parse(e.dataTransfer.getData('post')) as CalendarPost;
        const source = e.dataTransfer.getData('source');

        if (scheduled[dayIndex].posts.length >= 3) {
            alert("Max 3 posts per day to maintain quality!");
            return;
        }

        const targetDate = weekDates[dayIndex];

        try {
            if (source === 'sidebar') {
                // Create new CalendarEntry in DB
                const res = await fetch('/api/calendar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        postId: post.id,
                        scheduledAt: targetDate.toISOString(),
                        title: post.type
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    const newPost: CalendarPost = {
                        ...post,
                        calendarEntryId: data.entry.id
                    };
                    
                    const newScheduled = [...scheduled];
                    newScheduled[dayIndex].posts.push(newPost);
                    setScheduled(newScheduled);
                    setUnscheduled(unscheduled.filter(p => p.id !== post.id));
                }
            } else {
                const sourceDay = parseInt(source);
                if (sourceDay !== dayIndex) {
                    // Update scheduledAt for existing CalendarEntry
                    const res = await fetch('/api/calendar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: post.calendarEntryId,
                            postId: post.id,
                            scheduledAt: targetDate.toISOString(),
                            title: post.type
                        })
                    });

                    if (res.ok) {
                        const newScheduled = [...scheduled];
                        // Remove from old slot
                        newScheduled[sourceDay].posts = newScheduled[sourceDay].posts.filter(p => p.id !== post.id);
                        // Add to new slot
                        newScheduled[dayIndex].posts.push(post);
                        setScheduled(newScheduled);
                    }
                }
            }
        } catch (err) {
            console.error("Error moving scheduled post:", err);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const clearDay = async (dayIndex: number) => {
        const postsToReturn = scheduled[dayIndex].posts;
        
        try {
            // Delete entries from DB
            for (const post of postsToReturn) {
                if (post.calendarEntryId) {
                    await fetch(`/api/calendar?id=${post.calendarEntryId}`, {
                        method: 'DELETE'
                    });
                }
            }

            const newScheduled = [...scheduled];
            newScheduled[dayIndex].posts = [];
            setScheduled(newScheduled);
            
            // Clean up calendarEntryId before returning to sidebar
            const cleanedPosts = postsToReturn.map(({ calendarEntryId, ...rest }) => rest);
            setUnscheduled([...unscheduled, ...cleanedPosts]);

        } catch (err) {
            console.error("Error clearing schedule:", err);
        }
    };

    const exportSchedule = () => {
        let text = "📅 Content Schedule:\n\n";
        scheduled.forEach(slot => {
            if (slot.posts.length > 0) {
                text += `${slot.day} (${slot.date}):\n`;
                slot.posts.forEach(p => text += `- [${p.type}] ${p.content.substring(0, 100)}...\n`);
                text += "\n";
            }
        });
        navigator.clipboard.writeText(text);
        alert("Schedule copied to clipboard!");
    };

    if (!isLoaded || loading) {
        return <div style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>Loading Content Calendar...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Weekly Planner</h2>
                <button className={styles.exportButton} onClick={exportSchedule}>Export Text</button>
            </div>

            <div className={styles.layout}>
                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.addDraftSection}>
                        <h3>Add New Idea</h3>
                        <textarea
                            value={newDraft}
                            onChange={(e) => setNewDraft(e.target.value)}
                            placeholder="Type your post idea..."
                            className={styles.addInput}
                        />
                        <div className={styles.addControls}>
                            <select value={draftType} onChange={(e) => setDraftType(e.target.value)} className={styles.typeSelect}>
                                <option>Educational</option>
                                <option>Story</option>
                                <option>Contrarian</option>
                                <option>Promotional</option>
                            </select>
                            <button onClick={handleAddDraft} disabled={!newDraft.trim()} className={styles.addButton}>Add</button>
                        </div>
                    </div>

                    <h3>Unscheduled Drafts</h3>
                    <div className={styles.draftList}>
                        {unscheduled.map(post => (
                            <div
                                key={post.id}
                                className={styles.draggablePost}
                                draggable
                                onDragStart={(e) => handleDragStart(e, post, 'sidebar')}
                            >
                                <div className={styles.postType}>{post.type}</div>
                                <div className={styles.postContent}>{post.content.substring(0, 45)}...</div>
                                {post.hookScore && (
                                    <div
                                        className={styles.scoreBadge}
                                        style={{ background: post.hookScore > 8 ? '#10b981' : '#f59e0b' }}
                                    >
                                        {post.hookScore}
                                    </div>
                                )}
                            </div>
                        ))}
                        {unscheduled.length === 0 && <p style={{ color: '#555', fontStyle: 'italic', fontSize: '0.85rem' }}>No unscheduled drafts.</p>}
                    </div>
                </div>

                {/* Weekly Grid */}
                <div className={styles.grid}>
                    {scheduled.map((slot, i) => (
                        <div
                            key={slot.day}
                            className={styles.daySlot}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, i)}
                        >
                            <div className={styles.slotHeader}>
                                <span className={styles.dayName}>{slot.day} <span className={styles.slotDate}>{slot.date}</span></span>
                                {slot.posts.length > 0 && (
                                    <button className={styles.clearBtn} onClick={() => clearDay(i)}>×</button>
                                )}
                            </div>

                            <div className={styles.slotPosts}>
                                {slot.posts.map(post => (
                                    <div
                                        key={post.id}
                                        className={styles.plannedPost}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, post, i)}
                                    >
                                        <span className={styles.tinyType}>{post.type}</span>
                                        {post.content.substring(0, 30)}...
                                    </div>
                                ))}
                                {slot.posts.length === 0 && <div className={styles.placeholder}>Drop here</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
