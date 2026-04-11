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
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-8">
          <Zap size={14} />
          Coming Soon
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Decoded: The Voice <br />
          <span className="text-[#00E5FF]">of High Performance</span>
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed">
          We're building a resource center for LinkedIn creators who want to scale their authority without losing their soul to generic AI templates.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-zinc-900/50 border border-white/[0.08] rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-all"
            />
            <button
              type="submit"
              className="bg-[#00E5FF] text-[#0A0F1E] font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2"
            >
              Notify Me <Bell size={18} />
            </button>
          </form>
        ) : (
          <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-2xl p-6 text-[#00E5FF] font-semibold flex items-center justify-center gap-3">
            <Send size={20} />
            You're on the list! We'll notify you when we launch.
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          {[
            { title: "Voice DNA", desc: "How to train models on your unique rhythm." },
            { title: "Hook Mastery", desc: "The psychology behind high-impression starts." },
            { title: "Scaling Authority", desc: "Going from 10K to 100K followers." }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]">
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
