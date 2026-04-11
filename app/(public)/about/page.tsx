import React from "react";
import { Shield, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Sound like <span className="text-[#00E5FF]">yourself</span>, at scale.
        </h1>
        <p className="text-zinc-400 text-xl leading-relaxed">
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
          <div key={value.title} className="bg-zinc-900/50 border border-white/[0.08] rounded-3xl p-8 hover:border-[#00E5FF]/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center mb-6">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{value.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900/30 border border-white/[0.08] rounded-[40px] p-12 md:p-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">The Team</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {[
              { name: "Arjun Mehta", role: "CEO & Founder", initial: "AM", color: "bg-purple-700" },
              { name: "Sarah Chen", role: "Head of AI", initial: "SC", color: "bg-cyan-700" },
              { name: "Marcus Williams", role: "Eng Lead", initial: "MW", color: "bg-emerald-700" }
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full ${member.color} flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-xl`}>
                  {member.initial}
                </div>
                <div className="text-white font-bold">{member.name}</div>
                <div className="text-zinc-500 text-sm">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
