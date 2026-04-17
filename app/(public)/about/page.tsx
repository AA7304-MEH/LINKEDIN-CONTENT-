"use client";

import React from "react";
import { Users, Target, Rocket, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col py-32 px-6">
      <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Mission to <br />
              <span className="text-[#00E5FF]">Humanize AI Content</span>
            </h1>
            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
              We believe AI should be a mirror, not a mask. Resodin was born from the frustration of seeing brilliant minds reduced to generic corporate-speak by standard AI tools.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {[
              { icon: <Target className="text-[#00E5FF]" />, title: "Precision Voice Decoding", desc: "Our proprietary Voice DNA technology doesn't just copy words; it maps the logic, rhythm, and sentence structures that make you, you." },
              { icon: <Shield className="text-[#00E5FF]" />, title: "Authority First", desc: "We don't optimize for 'engagement' (vague). We optimize for authority—the kind that leads to DMs, sales, and real opportunities." },
              { icon: <Rocket className="text-[#00E5FF]" />, title: "Efficiency with Soul", desc: "Save 10+ hours a week without sacrificing your digital identity. Spend that time on actually building your business." },
              { icon: <Users className="text-[#00E5FF]" />, title: "Creator Led", desc: "Resodin is built by creators, for creators. Every feature is battle-tested in the LinkedIn feed before it reaches your dashboard." }
            ].map((value, i) => (
              <div key={i} className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Built by the best in AI & Growth</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {[
                { name: "Alex Rivers", role: "Co-Founder & CEO", avatar: "AR", color: "bg-purple-600" },
                { name: "Sarah J. Miller", role: "Head of AI Research", avatar: "SM", color: "bg-[#00E5FF]" },
                { name: "David Chen", role: "Growth Strategy", avatar: "DC", color: "bg-emerald-600" }
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-full ${member.color} flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg`}>
                    {member.avatar}
                  </div>
                  <h4 className="text-white font-bold">{member.name}</h4>
                  <p className="text-zinc-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
