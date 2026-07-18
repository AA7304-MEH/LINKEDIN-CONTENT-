// v2 - updated blog page with post cards
"use client";

import React, { useState } from "react";
import { Send, Zap, Bell } from "lucide-react";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            The Voice of <br />
            <span className="text-[#00E5FF]">High Performance</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Resources and insights for LinkedIn creators who want to scale their authority without losing their soul to generic AI templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "The LinkedIn Algorithm in 2026: What Actually Works",
              excerpt: "Most creators are optimizing for the wrong signals. We deep dive into how authority signals have overtaken vanity metrics in the latest update.",
              date: "April 10, 2026",
              readTime: "5 min read",
              category: "Algorithm"
            },
            {
              title: "Why Your AI Content Sounds Like AI (And How to Fix It)",
              excerpt: "The problem isn't the AI. It's that you haven't taught it your voice yet. Learn the 3-step DNA mapping protocol for authentic generation.",
              date: "April 3, 2026",
              readTime: "4 min read",
              category: "Voice DNA"
            },
            {
              title: "From 200 to 40,000 Impressions: A LinkedIn Case Study",
              excerpt: "Three months ago, Arjun Mehta's posts were getting 200 impressions. Using Resodin's narrative framework, he hit 40k in 30 days.",
              date: "March 28, 2026",
              readTime: "6 min read",
              category: "Case Study"
            }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer bg-[#111111] border border-white/[0.06] rounded-24 p-8 hover:border-[#00E5FF]/40 transition-all duration-300">
              <div className="text-[#00E5FF] text-[10px] font-black uppercase tracking-widest mb-4">
                {post.category}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
                <span className="text-zinc-600 text-[11px] font-medium">{post.date}</span>
                <span className="text-zinc-600 text-[11px] font-medium">{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-24 p-12 bg-gradient-to-br from-[#111111] to-[#0A0F1E] border border-white/[0.06] rounded-[32px] text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Master your digital voice</h2>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">Get one deep-dive essay every Sunday on scaling authority via AI.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 bg-black/40 border border-white/[0.08] rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-all"
            />
            <button className="bg-[#00E5FF] text-[#0A0F1E] font-bold px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
