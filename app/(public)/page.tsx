"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Dna, Zap, PenTool, Layers, Menu, X, Check, ArrowRight, Twitter, Linkedin } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [annualBilling, setAnnualBilling] = useState(false);
  const [activeTone, setActiveTone] = useState("Authoritative");
  const [activeType, setActiveType] = useState("Thought leadership");

  return (
    <div className="min-h-screen selection:bg-[#06B6D4]/30 selection:text-white" 
         style={{ backgroundColor: '#0A0F1E', color: '#F9FAFB', fontFamily: "'Inter', sans-serif", margin: 0 }}>
      
      {/* SECTION 1 — NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08]" 
           style={{ background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="font-bold text-white tracking-tight" 
                  style={{ fontSize: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Resodin.ai
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-white hover:text-[#06B6D4] transition-colors font-medium">Features</Link>
              <Link href="#pricing" className="text-white hover:text-[#06B6D4] transition-colors font-medium">Pricing</Link>
              <Link href="/audit" className="text-white hover:text-[#06B6D4] transition-colors font-medium">Free Audit</Link>
              <Link href="/blog" className="text-white hover:text-[#06B6D4] transition-colors font-medium">Blog</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/sign-in" className="text-white hover:text-[#06B6D4] transition-colors font-medium px-4 py-2">
                Log in
              </Link>
              <Link href="/sign-up" className="font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center" 
                    style={{ backgroundColor: '#06B6D4', color: '#0A0F1E', borderRadius: '100px', padding: '10px 24px', fontSize: '15px' }}>
                Start free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A0F1E] border-b border-white/[0.08] px-4 pt-2 pb-6 space-y-4 shadow-xl">
            <Link href="#features" className="block text-white hover:text-[#06B6D4] py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="#pricing" className="block text-white hover:text-[#06B6D4] py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/audit" className="block text-white hover:text-[#06B6D4] py-2" onClick={() => setIsMobileMenuOpen(false)}>Free Audit</Link>
            <Link href="/blog" className="block text-white hover:text-[#06B6D4] py-2" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col space-y-3">
              <Link href="/sign-in" className="text-center text-white px-4 py-2 border border-white/[0.08] rounded-xl">Log in</Link>
              <Link href="/sign-up" className="text-center font-bold px-4 py-2 rounded-xl" style={{ backgroundColor: '#06B6D4', color: '#0A0F1E' }}>Start free</Link>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 2 — HERO */}
      <section className="relative flex items-center justify-center overflow-hidden" 
               style={{ minHeight: '100vh', padding: '120px 24px' }}>
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
              <span className="block">Your LinkedIn posts,</span>
              <span className="block" style={{ color: '#06B6D4' }}>written in your voice.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-center max-w-[560px] mx-auto mb-10" 
               style={{ color: '#9CA3AF', fontSize: '20px', lineHeight: 1.6 }}>
              Resodin learns your unique tone and style to generate high-authority LinkedIn content that sounds exactly like you — and converts.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link href="/sign-up" className="w-full sm:w-auto text-center h-12 flex items-center justify-center transition-transform hover:scale-105 active:scale-95" 
                    style={{ backgroundColor: '#06B6D4', color: '#0A0F1E', borderRadius: '100px', padding: '14px 32px', fontWeight: 600, fontSize: '16px', border: 'none' }}>
                Start writing free
              </Link>
              <Link href="#demo" className="w-full sm:w-auto text-center bg-transparent border border-white/[0.08] hover:border-white/20 text-white font-medium px-8 h-12 flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95">
                See how it works →
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-[12px] text-[#9CA3AF]">
              <span>No credit card required</span>
              <span className="w-1 h-1 rounded-full bg-[#9CA3AF]"></span>
              <span>5 free posts/month</span>
              <span className="w-1 h-1 rounded-full bg-[#9CA3AF]"></span>
              <span>Cancel anytime</span>
            </div>
          </FadeIn>

          {/* Floating Product Mockup */}
          <FadeIn delay={0.5} className="mt-16 w-full max-w-4xl px-4">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6"
              style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px' }}
            >
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wider mb-2 block">Your topic</label>
                  <div className="h-24 bg-[#0A0F1E] rounded-xl border border-white/[0.06] p-3 text-sm text-[#F9FAFB]/50">
                    Entering a new market gracefully...
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-[#0A0F1E] border border-[#06B6D4] text-[#06B6D4] text-xs px-3 py-1.5 rounded-lg">Professional Tone</div>
                  <div className="bg-[#0A0F1E] border border-white/[0.06] text-[#9CA3AF] text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">Regenerate <Zap size={12} /></div>
                </div>
                <div className="pt-2">
                  <button className="w-full bg-[#06B6D4] text-[#0A0F1E] font-bold py-2.5 rounded-xl text-sm">Generate</button>
                </div>
              </div>
              <div className="flex-[1.5] bg-[#0A0F1E] rounded-xl border border-white/[0.06] p-5 relative">
                <div className="absolute -right-4 -top-4 bg-[#06B6D4] text-[#0A0F1E] text-xs font-bold px-3 py-2 rounded-xl shadow-lg transform rotate-3 z-10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0A0F1E] animate-pulse"></span>
                  42,891 impressions
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center font-bold text-xs">YN</div>
                  <div>
                    <div className="text-sm font-semibold">Your Name</div>
                    <div className="text-xs text-[#9CA3AF]">Founder & CEO • 1st</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-[#F9FAFB]/90 leading-relaxed">
                  <p>Entering a new market isn't about being the loudest in the room.</p>
                  <p>It's about listening to the quietest problems.</p>
                  <p>When we expanded to Europe last year, we threw out our entire US playbook. Why? Because the pain points weren't the same. The regulations weren't the same. The culture wasn't the same.</p>
                  <p style={{ color: '#06B6D4' }}>#Growth #Startups #Leadership</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3 — SOCIAL PROOF BAR */}
      <section style={{ backgroundColor: '#111827', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <p className="text-[#9CA3AF] text-sm font-medium whitespace-nowrap shrink-0">As featured in</p>
          <div className="flex-1 w-full overflow-hidden relative">
            <motion.div 
              className="flex items-center space-x-12 md:space-x-20 whitespace-nowrap"
              animate={{ x: ["0%", "-50%", "0%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="text-[#9CA3AF] font-bold text-xl opacity-60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>TechCrunch</span>
                  <span className="text-[#9CA3AF] font-bold text-xl opacity-60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Forbes</span>
                  <span className="text-[#9CA3AF] font-bold text-xl opacity-60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>IndieHackers</span>
                  <span className="text-[#9CA3AF] font-bold text-xl opacity-60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Product Hunt</span>
                  <span className="text-[#9CA3AF] font-bold text-xl opacity-60" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Morning Brew</span>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURES */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#06B6D4] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">WHAT MAKES RESODIN DIFFERENT</span>
            <h2 className="text-white mb-4" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Built for creators who refuse to sound like AI</h2>
            <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7 }}>Every feature is designed to amplify your voice, not replace it.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: <Dna className="text-[#06B6D4]" />, title: "Personal Voice DNA", desc: "Upload 3–5 of your best posts. Our AI maps your sentence structure, vocabulary, and rhythm to generate content that's unmistakably yours.", tag: "The core technology" },
            { icon: <Zap className="text-[#8B5CF6]" />, title: "One-click regeneration", desc: "Not feeling the first draft? Hit regenerate and get a completely different angle in under 3 seconds. No two outputs are ever the same.", tag: "Infinite variations" },
            { icon: <PenTool className="text-[#06B6D4]" />, title: "Smart inline editor", desc: "Tweak any word. The AI watches your edits in real time and adjusts its model of your voice — so every post is better than the last.", tag: "Gets smarter over time" },
            { icon: <Layers className="text-[#8B5CF6]" />, title: "Multi-profile management", desc: "Run a personal brand AND a company page with completely separate voices, tone settings, and content calendars from one dashboard.", tag: "Business plan" }
          ].map((feat, idx) => (
            <FadeIn key={feat.title} delay={idx * 0.1}>
              <div className="group transition-all duration-300 hover:scale-[1.02] flex flex-col h-full" 
                   style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{feat.title}</h3>
                <p className="flex-1" style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.7 }}>{feat.desc}</p>
                <div className="mt-6 inline-flex px-3 py-1 bg-[#0A0F1E] border border-white/[0.06] rounded-md text-[11px] text-[#9CA3AF] font-medium w-fit">
                  {feat.tag}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PRODUCT DEMO */}
      <section id="demo" className="border-y border-white/[0.04]" style={{ padding: '100px 24px', backgroundColor: '#111827' }}>
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
                        onClick={() => setActiveTone(tone)}
                        className="text-xs px-3 py-1.5 rounded-full border transition-all"
                        style={{ background: activeTone === tone ? 'rgba(6,182,212,0.1)' : 'transparent', borderColor: activeTone === tone ? '#06B6D4' : 'rgba(255,255,255,0.08)', color: activeTone === tone ? '#06B6D4' : '#9CA3AF' }}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]" 
                        style={{ backgroundColor: '#06B6D4', color: '#0A0F1E', border: 'none' }}>
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

                <div className="bg-[#111827] border border-white/[0.06] rounded-xl p-6 shadow-lg flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#0A0F1E] flex items-center justify-center font-bold text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#06B6D4]/20 to-[#8B5CF6]/20"></div>
                      YN
                    </div>
                    <div>
                      <div className="font-semibold text-[15px] text-white">Your Name</div>
                      <div className="text-[13px] text-[#9CA3AF]">Founder & CEO</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-[14px] leading-relaxed text-[#F9FAFB]/90 font-sans">
                    <p>Most founders make this hiring mistake in year 2.</p>
                    <p>They hire for the role they needed 6 months ago — not the one they need today.</p>
                    <p className="text-[#06B6D4]">#Startups #Scaling #Hiring #Leadership</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#06B6D4] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">REAL RESULTS</span>
            <h2 className="text-white" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>People who sound more like themselves</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "I've tried 6 LinkedIn tools. Resodin is the first one where people actually DM me asking if I write my posts myself. That's the bar.", stat: "↑ 380% impressions", author: "Arjun Mehta", badgeColor: '#06B6D4' },
            { quote: "The Voice DNA feature is witchcraft. I uploaded 4 old posts and it immediately nailed my tone. I haven't edited a single post.", stat: "3.2M impressions", author: "Sarah Chen", badgeColor: '#8B5CF6' },
            { quote: "We use Resodin for our CEO's personal brand. The voices are completely distinct. Engagement went from 2K to 89K monthly.", stat: "44x engagement", author: "Marcus Williams", badgeColor: '#06B6D4' }
          ].map((t, idx) => (
            <FadeIn key={t.author} delay={idx * 0.1}>
              <div className="flex flex-col h-full" 
                   style={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderLeft: `3px solid ${t.badgeColor}`, borderRadius: '0 16px 16px 0', padding: '32px' }}>
                <p className="flex-1 italic mb-8" style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: 1.7 }}>"{t.quote}"</p>
                <div>
                  <div className="inline-block text-xs font-bold px-2.5 py-1 rounded-md mb-4" style={{ backgroundColor: t.badgeColor, color: t.badgeColor === '#06B6D4' ? '#0A0F1E' : '#FFF' }}>
                    {t.stat}
                  </div>
                  <div className="font-semibold text-white">{t.author}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECTION 7 — PRICING */}
      <section id="pricing" className="border-y border-white/[0.04]" style={{ padding: '100px 24px', backgroundColor: '#111827' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeIn>
            <span className="text-[#06B6D4] text-[11px] font-bold tracking-[0.1em] uppercase mb-4 block">SIMPLE PRICING</span>
            <h2 className="text-white mb-12" style={{ fontSize: '40px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Start free. Grow when you're ready.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {/* Pro Card Highlighted */}
            <div className="md:order-1 order-2">
              <FadeIn>
                <div style={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }} className="h-full flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-2">Free Forever</h3>
                   <div className="text-3xl font-bold text-white mb-8">$0<span className="text-sm font-normal text-[#9CA3AF]">/mo</span></div>
                   <ul className="text-left space-y-4 mb-8 flex-1" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                     <li>✓ 5 AI posts per month</li>
                     <li>✓ Basic tone settings</li>
                     <li>✓ 1 profile</li>
                   </ul>
                   <Link href="/sign-up" className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">Start for free</Link>
                </div>
              </FadeIn>
            </div>
            
            <div className="md:order-2 order-1 transform md:-translate-y-4">
              <FadeIn delay={0.1}>
                <div style={{ border: '2px solid #06B6D4', boxShadow: '0 0 40px rgba(6,182,212,0.15)', backgroundColor: '#111827', borderRadius: '16px', padding: '32px' }} className="h-full flex flex-col relative">
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#06B6D4] text-[#0A0F1E] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
                   <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                   <div className="text-3xl font-bold text-white mb-2">$19<span className="text-sm font-normal text-[#9CA3AF]">/mo</span></div>
                   <p className="text-xs text-[#9CA3AF] mb-8">No credit card needed</p>
                   <ul className="text-left space-y-4 mb-8 flex-1" style={{ color: '#F9FAFB', fontSize: '14px' }}>
                     <li>✓ <strong>Unlimited posts</strong></li>
                     <li>✓ <strong>Voice DNA</strong></li>
                     <li>✓ Advanced controls</li>
                     <li>✓ 3 profiles</li>
                   </ul>
                   <Link href="/sign-up" className="w-full py-3 rounded-xl font-bold transition-transform hover:scale-[1.02]" style={{ backgroundColor: '#06B6D4', color: '#0A0F1E' }}>Start free trial</Link>
                </div>
              </FadeIn>
            </div>

            <div className="md:order-3 order-3">
              <FadeIn delay={0.2}>
                <div style={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px' }} className="h-full flex flex-col">
                   <h3 className="text-xl font-bold text-white mb-2">Business</h3>
                   <div className="text-3xl font-bold text-white mb-8">$49<span className="text-sm font-normal text-[#9CA3AF]">/mo</span></div>
                   <ul className="text-left space-y-4 mb-8 flex-1" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                     <li>✓ Everything in Pro</li>
                     <li>✓ Unlimited profiles</li>
                     <li>✓ Team collaboration</li>
                     <li>✓ API Access</li>
                   </ul>
                   <Link href="/contact" className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">Get started</Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA BANNER */}
      <section style={{ padding: '100px 24px' }}>
        <div className="max-w-[1200px] mx-auto rounded-[24px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl" 
             style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)' }}>
          <div className="relative z-10">
            <h2 className="text-white mb-6" style={{ fontSize: '48px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}>Your next viral post is one click away.</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Join 12,000+ creators who post consistently without sounding like a robot.</p>
            <Link href="/sign-up" className="inline-block transition-transform hover:scale-[1.03]" 
                  style={{ backgroundColor: '#FFFFFF', color: '#0A0F1E', borderRadius: '100px', padding: '16px 40px', fontWeight: 700, fontSize: '18px' }}>
              Write my first post free →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#0A0F1E', padding: '80px 24px 32px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <Link href="/" className="font-bold text-white tracking-tight mb-4 block" style={{ fontSize: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Resodin.ai</Link>
              <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.6 }}>AI-powered LinkedIn content that sounds like you.</p>
            </div>
            {['Product', 'Resources', 'Company'].map(cat => (
              <div key={cat}>
                <h4 className="text-white font-semibold mb-6">{cat}</h4>
                <ul className="space-y-4 text-sm text-[#9CA3AF]">
                  <li><Link href="#">Link 1</Link></li>
                  <li><Link href="#">Link 2</Link></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/[0.06] text-center">
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>© 2026 Resodin Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
