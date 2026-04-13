"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, RefreshCw, Edit3, Users, ArrowRight, Zap, ThumbsUp, MessageSquare, Repeat, Send } from "lucide-react";

// Fade-in animation wrapper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [annualBilling, setAnnualBilling] = useState(false);
  const [activeTone, setActiveTone] = useState("Authoritative");

  return (
    <div className="min-h-screen selection:bg-[#06B6D4]/30 selection:text-white" 
         style={{ backgroundColor: '#0A0F1E', color: '#F9FAFB', fontFamily: "'Inter', sans-serif", margin: 0 }}>
      

      {/* SECTION 2 — HERO */}
      <section className="relative flex items-center justify-center overflow-hidden py-16 md:py-24" 
               style={{ minHeight: '100vh' }}>
        {/* Animated Background Glow */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #0A0F1E 0%, #0A0F1E 100%)",
              "radial-gradient(circle at 50% 50%, #0D1A2E 0%, #0A0F1E 80%)",
              "radial-gradient(circle at 50% 50%, #0A0F1E 0%, #0A0F1E 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
          <FadeIn>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/[0.08] text-[#06B6D4] text-[13px] font-medium mb-8">
              <span>✦ Trusted by 12,000+ LinkedIn creators</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-center tracking-tight mb-6" 
                style={{ fontSize: '64px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1, color: '#F9FAFB' }}>
              <span className="block md:text-[72px]">Your LinkedIn posts,</span>
              <span className="block md:text-[72px]" style={{ color: '#06B6D4' }}> written in your voice.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-center max-w-[560px] mx-auto mb-10" 
               style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7 }}>
              Resodin learns your unique tone and style to generate high-authority LinkedIn content that sounds exactly like you — and converts.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/sign-up" className="w-full sm:w-auto text-center h-12 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 px-8" 
                    style={{ backgroundColor: '#06B6D4', color: '#0A0F1E', borderRadius: '100px', padding: '14px 32px', fontWeight: 600, fontSize: '16px', border: 'none', cursor: 'pointer' }}>
                Start writing free
              </Link>
              <Link href="#demo" className="w-full sm:w-auto text-center bg-transparent border border-white/[0.08] hover:border-white/20 text-white font-medium px-8 h-12 flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95">
                See how it works →
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-sm text-zinc-500 font-medium">
              <span>No credit card required</span>
              <span className="text-zinc-600 mx-2"> · </span>
              <span>5 free posts/month</span>
              <span className="text-zinc-600 mx-2"> · </span>
              <span>Cancel anytime</span>
            </div>
          </FadeIn>

          {/* Floating Product Mockup */}
          {/* ... (mockup content) */}
          <FadeIn delay={0.5} className="mt-16 w-full max-w-4xl px-4">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#111111] border border-[#1E1E1E] rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.08)] p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider mb-2 block">Your topic</label>
                  <div className="h-24 bg-[#0A0F1E] rounded-xl border border-white/[0.06] p-3 text-sm text-[#F9FAFB]/50">
                    Entering a new market gracefully...
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-[#0A0F1E] border border-[#00E5FF] text-[#00E5FF] text-xs px-3 py-1.5 rounded-lg">Professional Tone</div>
                  <div className="bg-[#0A0F1E] border border-white/[0.06] text-[#9CA3AF] text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">Regenerate <Zap size={12} /></div>
                </div>
                <div className="pt-2">
                  <button className="w-full bg-[#00E5FF] text-[#0A0F1E] font-bold py-2.5 rounded-xl text-sm">Generate</button>
                </div>
              </div>
              <div className="flex-[1.5] bg-[#0A0F1E] rounded-xl border border-white/[0.06] p-5 relative">
                <div className="absolute -right-4 -top-4 bg-[#00E5FF] text-[#0A0F1E] text-xs font-bold px-3 py-2 rounded-xl shadow-lg transform rotate-3 z-10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0A0F1E] animate-pulse"></span>
                  42,891 impressions
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center font-bold text-xs text-white">YN</div>
                  <div>
                    <div className="text-sm font-semibold">Your Name</div>
                    <div className="text-xs text-[#9CA3AF]">Founder & CEO • 1st</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-[#F9FAFB]/90 leading-relaxed">
                  <p>Entering a new market isn't about being the loudest in the room.</p>
                  <p>It's about listening to the quietest problems.</p>
                  <p>When we expanded to Europe last year, we threw out our entire US playbook. Why? Because the pain points weren't the same. The regulations weren't the same. The culture wasn't the same.</p>
                  <p className="text-[#00E5FF]">#Growth #Startups #Leadership</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3 — SOCIAL PROOF BAR */}
      {/* ... (brands content) */}
      <section className="py-16 md:py-24 border-y border-white/[0.06]" style={{ backgroundColor: '#0A0F1E', padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-10">
            <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">As featured in</p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-opacity">
              {['TechCrunch', 'Forbes', 'Entrepreneur', 'Wired', 'Bloomberg'].map((brand) => (
                <span key={brand} className="font-bold text-xl md:text-2xl tracking-tighter text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURES */}
      <section id="features" className="py-16 md:py-24 max-w-6xl mx-auto px-6" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#00E5FF] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">WHAT MAKES RESODIN DIFFERENT</span>
            <h2 className="text-white mb-4" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Built for creators who refuse to sound like AI</h2>
            <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7 }}>Every feature is designed to amplify your voice, not replace it.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: <Mic className="text-[#00E5FF]" size={20} />, title: "Personal Voice DNA", desc: "Upload 3–5 of your best posts. Our AI maps your sentence structure, vocabulary, and rhythm to generate content that's unmistakably yours.", tag: "The core technology" },
            { icon: <RefreshCw className="text-[#00E5FF]" size={20} />, title: "One-click regeneration", desc: "Not feeling the first draft? Hit regenerate and get a completely different angle in under 3 seconds. No two outputs are ever the same.", tag: "Infinite variations" },
            { icon: <Edit3 className="text-[#00E5FF]" size={20} />, title: "Smart inline editor", desc: "Tweak any word. The AI watches your edits in real time and adjusts its model of your voice — so every post is better than the last.", tag: "Gets smarter over time" },
            { icon: <Users className="text-[#00E5FF]" size={20} />, title: "Multi-profile management", desc: "Run a personal brand AND a company page with completely separate voices, tone settings, and content calendars from one dashboard.", tag: "BUSINESS PLAN" }
          ].map((feat, idx) => (
            <FadeIn key={feat.title} delay={idx * 0.1}>
              <div className="group transition-all duration-300 hover:scale-[1.02] flex flex-col h-full border-l-2 border-[#00E5FF]/40 hover:border-[#00E5FF] transition-colors" 
                   style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
                <div className="mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{feat.title}</h3>
                <p className="flex-1" style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7 }}>{feat.desc}</p>
                <div className={`mt-6 inline-flex px-2 py-0.5 rounded-full text-xs font-medium w-fit ${feat.tag === "BUSINESS PLAN" ? "bg-amber-900/30 text-amber-400" : "bg-white/5 text-[#9CA3AF]"}`}>
                  {feat.tag}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PRODUCT DEMO */}
      <section id="demo" className="border-y border-white/[0.04]" style={{ backgroundColor: '#111827', padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-[#06B6D4] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">SEE IT IN ACTION</span>
              <h2 className="text-white" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>From idea to high-performing post in 60 seconds</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#0A0F1E] border border-white/[0.08] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="md:w-[40%] p-8 border-b md:border-b-0 md:border-r border-white/[0.08]">
                <h4 className="text-sm font-semibold text-white mb-4">What do you want to write about?</h4>
                <textarea 
                  className="w-full bg-[#111827] border border-white/[0.08] rounded-xl p-4 text-sm text-white placeholder-[#9CA3AF] resize-none h-32 focus:outline-none"
                  placeholder="The biggest mistake founders make when hiring..."
                ></textarea>
                
                <div className="mt-6 mb-8">
                  <h4 className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider mb-3">Tone</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Authoritative", "Conversational", "Storytelling", "Contrarian"].map((tone) => (
                      <button 
                        key={tone} 
                        className={`text-xs px-3 py-1.5 rounded-md border transition-all ${activeTone === tone ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]" 
                        style={{ backgroundColor: '#00E5FF', color: '#0A0F1E', border: 'none' }}>
                  Generate with Resodin <ArrowRight size={16} />
                </button>
              </div>

              <div className="md:w-[60%] p-8 bg-gradient-to-br from-[#111827] to-[#0A0F1E] flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <h4 className="text-sm font-semibold text-white">Your LinkedIn post</h4>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]"></span>
                  </span>
                </div>

                <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-6 shadow-lg flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center font-bold text-white text-sm">
                      YN
                    </div>
                    <div>
                      <div className="font-semibold text-[15px] text-white">Your Name</div>
                      <div className="text-[13px] text-zinc-400">Founder & CEO • 1st</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-[14px] leading-relaxed text-[#F9FAFB]/90 font-sans flex-1">
                    <p>Most founders make this hiring mistake in year 2.</p>
                    <p>They hire for the role they needed 6 months ago — not the one they need today.</p>
                    <p className="text-[#00E5FF]">#Startups #Scaling #Hiring #Leadership</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-4 border-t border-zinc-800">
                    <button className="flex items-center gap-1.5 text-zinc-500 text-sm hover:text-white transition-colors">
                      <ThumbsUp size={16} /> Like
                    </button>
                    <button className="flex items-center gap-1.5 text-zinc-500 text-sm hover:text-white transition-colors">
                      <MessageSquare size={16} /> Comment
                    </button>
                    <button className="flex items-center gap-1.5 text-zinc-500 text-sm hover:text-white transition-colors">
                      <Repeat size={16} /> Repost
                    </button>
                    <button className="flex items-center gap-1.5 text-zinc-500 text-sm hover:text-white transition-colors">
                      <Send size={16} /> Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }} className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#00E5FF] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">REAL RESULTS</span>
            <h2 className="text-white" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>People who sound more like themselves</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "I've tried 6 LinkedIn tools. Resodin is the first one where people actually DM me asking if I write my posts myself. That's the bar.", stat: "↑ 380% impressions", author: "Arjun Mehta", avatar: "AM", avatarBg: 'bg-purple-700' },
            { quote: "The Voice DNA feature is witchcraft. I uploaded 4 old posts and it immediately nailed my tone. I haven't edited a single post.", stat: "3.2M impressions", author: "Sarah Chen", avatar: "SC", avatarBg: 'bg-cyan-700' },
            { quote: "We use Resodin for our CEO's personal brand. The voices are completely distinct. Engagement went from 2K to 89K monthly.", stat: "44x engagement", author: "Marcus Williams", avatar: "MW", avatarBg: 'bg-emerald-700' }
          ].map((t, idx) => (
            <FadeIn key={t.author} delay={idx * 0.1}>
              <div className="flex flex-col h-full" 
                   style={{ backgroundColor: '#111827', borderLeft: `2px solid #00E5FF66`, borderRadius: '0 16px 16px 0', padding: '32px' }}>
                <div className="mb-6">
                  <div className="text-[28px] font-extrabold text-[#00E5FF] mb-1">{t.stat}</div>
                </div>
                <p className="flex-1 italic mb-8" style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7 }}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full ${t.avatarBg} flex items-center justify-center font-semibold text-white`}>
                    {t.avatar}
                  </div>
                  <div className="font-semibold text-white">{t.author}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section id="pricing" className="border-y border-white/[0.04] py-16 md:py-24" style={{ backgroundColor: '#111827', padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-[#00E5FF] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">SIMPLE PRICING</span>
            <h2 className="text-white mb-8" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Start free. Grow when you're ready.</h2>
            
            {/* Annual Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!annualBilling ? 'text-white font-medium' : 'text-zinc-500'}`}>Monthly</span>
              <button 
                onClick={() => setAnnualBilling(!annualBilling)}
                className="w-12 h-6 rounded-full bg-zinc-800 p-1 transition-colors relative"
              >
                <div className={`w-4 h-4 rounded-full bg-[#00E5FF] transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${annualBilling ? 'text-white font-medium' : 'text-zinc-500'}`}>Annually</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] uppercase">Save 20%</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Free Card */}
            <FadeIn>
              <div style={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }} className="h-full flex flex-col">
                 <h3 className="text-xl font-bold text-white mb-2">Free Forever</h3>
                 <div className="text-3xl font-bold text-white mb-8">$0<span className="text-sm font-normal text-[#9CA3AF]">/mo</span></div>
                 <ul className="text-left space-y-4 mb-8 flex-1" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                   <li>✓ 5 AI posts per month</li>
                   <li>✓ Basic tone settings</li>
                   <li>✓ 1 profile</li>
                 </ul>
                 <Link href="/sign-up" className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-center">Start for free</Link>
              </div>
            </FadeIn>
            
            {/* Pro Card (Highlighted) */}
            <FadeIn delay={0.1}>
              <div style={{ border: '2px solid #06B6D4', boxShadow: '0 0 40px rgba(6,182,212,0.15)', backgroundColor: '#111827', borderRadius: '16px', padding: '32px' }} className="h-full flex flex-col relative z-10">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-[#0A0F1E] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
                 <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                 <div className="text-3xl font-bold text-white mb-8">
                   ${annualBilling ? '15' : '19'}<span className="text-sm font-normal text-[#9CA3AF]">/mo</span>
                 </div>
                 <ul className="text-left space-y-4 mb-8 flex-1" style={{ color: '#F9FAFB', fontSize: '14px' }}>
                   <li>✓ <strong>Unlimited posts</strong></li>
                   <li>✓ <strong>Voice DNA</strong></li>
                   <li>✓ Advanced controls</li>
                   <li>✓ 3 profiles</li>
                 </ul>
                 <div className="space-y-3">
                   <Link href="/sign-up" className="w-full py-3 rounded-xl font-bold bg-[#00E5FF] text-[#0A0F1E] block text-center">Start free trial</Link>
                   <p className="text-xs text-[#9CA3AF] text-center">No credit card needed</p>
                 </div>
              </div>
            </FadeIn>

            {/* Business Card */}
            <FadeIn delay={0.2}>
              <div style={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }} className="h-full flex flex-col">
                 <h3 className="text-xl font-bold text-white mb-2">Business</h3>
                 <div className="text-3xl font-bold text-white mb-8">
                   ${annualBilling ? '39' : '49'}<span className="text-sm font-normal text-[#9CA3AF]">/mo</span>
                 </div>
                 <ul className="text-left space-y-4 mb-8 flex-1" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                   <li>✓ Everything in Pro</li>
                   <li>✓ Unlimited profiles</li>
                   <li>✓ Team collaboration</li>
                   <li>✓ API Access</li>
                 </ul>
                 <Link href="/contact" className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-center">Get started</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA BANNER */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="rounded-[24px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl" 
               style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #8B5CF6 100%)' }}>
            <div className="relative z-10">
              <h2 className="text-[#0A0F1E] mb-6" style={{ fontSize: '48px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}>Your next viral post is one click away.</h2>
              <div className="flex flex-col items-center gap-6">
                <Link href="/sign-up" className="inline-block transition-transform hover:scale-[1.03] rounded-full px-10 py-4 bg-white text-[#0A0F1E] font-bold text-lg shadow-xl">
                  Write my first post free →
                </Link>
                <div className="text-[#0A0F1E]/60 text-sm font-medium">
                  Join 12,000+ creators · No credit card · Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    {/* Footer Section */}
    <footer className="bg-[#070C18] border-t border-white/[0.06] pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="font-bold text-white tracking-tight mb-6 block text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            RESODIN<span className="text-[#00E5FF]">.AI</span>
          </Link>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
            The first AI content engine that decodes your personal voice for high-authority LinkedIn growth.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Product</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li><Link href="#features" className="hover:text-[#00E5FF] transition-colors">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-[#00E5FF] transition-colors">Pricing</Link></li>
            <li><Link href="/audit" className="hover:text-[#00E5FF] transition-colors">Free Audit</Link></li>
            <li><Link href="/blog" className="hover:text-[#00E5FF] transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Resources</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li><Link href="#demo" className="hover:text-[#00E5FF] transition-colors">How It Works</Link></li>
            <li><Link href="#features" className="hover:text-[#00E5FF] transition-colors">Voice DNA</Link></li>
            <li><Link href="/contact" className="hover:text-[#00E5FF] transition-colors">Contact</Link></li>
            <li><Link href="#pricing" className="hover:text-[#00E5FF] transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Company</h4>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li><Link href="/about" className="hover:text-[#00E5FF] transition-colors">About</Link></li>
            <li><Link href="/privacy" className="hover:text-[#00E5FF] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#00E5FF] transition-colors">Terms</Link></li>
            <li><Link href="/contact" className="hover:text-[#00E5FF] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/[0.06] flex justify-between items-center">
        <p className="text-zinc-600 text-xs">© 2026 Resodin Inc. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-zinc-600">
          <span>Powered by Gemini 2.0</span>
          <span>Handcrafted for excellence</span>
        </div>
      </div>
    </footer>
  </div>
  );
}
