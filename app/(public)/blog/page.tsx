"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribing email:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh] flex flex-col justify-center">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 w-fit">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="space-y-6 mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Insights for <span className="text-[#00E5FF]">LinkedIn creators</span>
        </h1>
        <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
          We're writing our first articles on AI, personal branding, and the future of professional content. 
          Drop your email to get notified when we publish.
        </p>
      </div>

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
              className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF] transition-colors"
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
        <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-2xl p-6 max-w-md">
          <p className="text-[#00E5FF] font-semibold">✦ You're on the list! We'll reach out soon.</p>
        </div>
      )}
    </div>
  );
}
