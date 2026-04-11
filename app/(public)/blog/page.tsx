"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Clock, ChevronRight } from "lucide-react";

const ARTICLES = [
  {
    title: "The Death of Generic AI Content on LinkedIn",
    category: "Strategy",
    readTime: "6 min read",
    id: 1
  },
  {
    title: "How to Map Your Voice DNA for Better Engagement",
    category: "Tutorial",
    readTime: "4 min read",
    id: 2
  },
  {
    title: "Case Study: Scaling a Founder's Brand to 1M Views",
    category: "Growth",
    readTime: "8 min read",
    id: 3
  }
];

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <header className="mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Insights for <span className="text-[#00E5FF]">LinkedIn creators</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
            We're writing our first articles on AI, personal branding, and the future of professional content. 
            Join 12,000+ creators getting our weekly updates.
          </p>
        </header>

        {/* Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-12">
             <div className="group relative rounded-3xl overflow-hidden bg-zinc-900/30 border border-white/[0.08] p-8 md:p-12 hover:border-[#00E5FF]/30 transition-colors">
                <div className="absolute top-0 right-0 p-8">
                   <span className="bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Coming Soon</span>
                </div>
                <div className="max-w-2xl">
                  <span className="text-zinc-500 text-sm font-semibold mb-4 block">NEWS & UPDATES</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">We're launching our full content engine in Spring 2026.</h2>
                  
                  {!subscribed ? (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md">
                      <div className="relative flex-1">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input 
                          type="email" 
                          placeholder="Enter your email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="bg-[#00E5FF] text-[#0A0F1E] font-bold px-8 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                      >
                        Notify me
                      </button>
                    </form>
                  ) : (
                    <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-2xl p-6">
                      <p className="text-[#00E5FF] font-semibold">✦ You're on the list! We'll reach out when we launch.</p>
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <div key={article.id} className="bg-zinc-900/30 border border-white/[0.08] rounded-3xl p-8 flex flex-col hover:border-white/20 transition-all opacity-60 grayscale hover:grayscale-0 hover:opacity-100 cursor-not-allowed group">
               <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 mb-6">
                  <span className="text-[#00E5FF]">{article.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
               </div>
               <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#00E5FF] transition-colors">{article.title}</h3>
               <div className="mt-auto flex items-center gap-2 text-sm text-zinc-400 font-medium">
                  Read article <ChevronRight size={16} />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
