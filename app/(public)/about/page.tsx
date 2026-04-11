"use client";

import React from "react";
import { Shield, Sparkles, Users, ArrowLeft, Heart, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="max-w-4xl mb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Mission & <span className="text-[#00E5FF]">Vision</span>
          </h1>
          <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed">
            We're on a mission to make every professional sound like their best self — at scale. In a world increasingly filled with generic AI noise, your unique voice is your most valuable asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { 
              icon: <Sparkles className="text-[#00E5FF]" />, 
              title: "Voice-first AI", 
              desc: "Most AI tools try to replace you. Resodin is built specifically to map your DNA and amplify what makes you unique." 
            },
            { 
              icon: <Shield className="text-[#00E5FF]" />, 
              title: "Privacy-first", 
              desc: "Your data is yours. We don't train our base models on your private content, and we protect your Voice DNA with encryption." 
            },
            { 
              icon: <Users className="text-[#00E5FF]" />, 
              title: "Creator-built", 
              desc: "Founded by LinkedIn power-users who were tired of sounding like robots. We build for the nuances of human connection." 
            }
          ].map((value) => (
            <div key={value.title} className="bg-zinc-900/30 border border-white/[0.08] rounded-[32px] p-8 hover:border-[#00E5FF]/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/20 border border-white/[0.08] rounded-[48px] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 blur-[120px] -mr-48 -mt-48" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">The values that drive us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold">
                   <Heart className="text-pink-500" size={20} />
                   Authenticity Over All
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">We believe the best content comes from human truth. AI should only be the bridge from thought to digital ink.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white font-bold">
                   <Target className="text-[#00E5FF]" size={20} />
                   Precision Engineering
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">A 90% match isn't enough. We strive for 100% voice alignment, ensuring every word feels like it was whispered into the machine by you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
