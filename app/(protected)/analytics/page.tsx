"use client";

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './page.module.css';

// Mock Data for Analytics
const followerData = [
    { name: 'Day 1', followers: 1200 },
    { name: 'Day 5', followers: 1250 },
    { name: 'Day 10', followers: 1320 },
    { name: 'Day 15', followers: 1410 },
    { name: 'Day 20', followers: 1550 },
    { name: 'Day 25', followers: 1680 },
    { name: 'Day 30', followers: 1850 },
];

const postTypeData = [
    { name: 'Text Posts', value: 45, color: '#06B6D4' },
    { name: 'Carousels', value: 35, color: '#3B82F6' },
    { name: 'Articles', value: 20, color: '#10B981' },
];

export default function AnalyticsPage() {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <main className={styles.main}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>LinkedIn Post Analytics</h1>
                <p className={styles.subtitle}>
                    Track your audience growth, impressions, and engagement metrics.
                </p>
            </div>

            {/* LinkedIn Connection Alert */}
            {!isConnected && (
                <div className={styles.connectAlert}>
                    <div className={styles.alertContent}>
                        <h3>🔒 LinkedIn Account Not Connected</h3>
                        <p>We are displaying mock data. Connect your LinkedIn profile to sync real-time reach, views, and engagement metrics directly.</p>
                    </div>
                    <button 
                        className={styles.connectBtn}
                        onClick={() => window.location.href = '/settings'}
                    >
                        Connect LinkedIn Account
                    </button>
                </div>
            )}

            {/* Metrics Grid */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Total Impressions (30d)</span>
                    <strong className={styles.metricValue}>42,850</strong>
                    <span className={styles.metricTrendUp}>↑ 24% vs last month</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Average Engagement Rate</span>
                    <strong className={styles.metricValue}>6.8%</strong>
                    <span className={styles.metricTrendUp}>↑ 1.2% vs last month</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Best Day to Post</span>
                    <strong className={styles.metricValue}>Wednesday</strong>
                    <span className={styles.metricSub}>Optimal time: 9:15 AM</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Followers Gained</span>
                    <strong className={styles.metricValue}>+650</strong>
                    <span className={styles.metricTrendUp}>↑ 84% vs last month</span>
                </div>
            </div>

            {/* Charts Section */}
            <div className={styles.chartsGrid}>
                {/* Follower Growth Chart */}
                <div className={styles.chartCard}>
                    <h3>Audience Growth (30 Days)</h3>
                    <div style={{ width: '100%', height: 300, marginTop: '1rem' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={followerData}>
                                <defs>
                                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                                <Area type="monotone" dataKey="followers" stroke="#06B6D4" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Post Type Breakdown Chart */}
                <div className={styles.chartCard}>
                    <h3>Content Format Breakdown</h3>
                    <div style={{ width: '100%', height: 300, marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={postTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {postTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className={styles.legend}>
                            {postTypeData.map((item) => (
                                <div key={item.name} className={styles.legendItem}>
                                    <span className={styles.legendDot} style={{ backgroundColor: item.color }} />
                                    <span className={styles.legendText}>{item.name} ({item.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Performing Post */}
            <div className={styles.bestPostCard}>
                <h3>🏆 Month&apos;s Best Performing Post</h3>
                <div className={styles.postBody}>
                    <p>
                        <strong>Unpopular opinion:</strong> Most founders hire too fast and fire too slow because they are scared of missing timelines. 
                        But a bad hire sets you back 6 months, while a vacant seat only sets you back 2 weeks. 
                        Hire for values, train for skills, and cut ties quickly when things don&apos;t align.
                    </p>
                    <div className={styles.postStats}>
                        <span>👁️ 12.4K Views</span>
                        <span>👍 342 Likes</span>
                        <span>💬 87 Comments</span>
                        <span>🔄 14 Reposts</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
