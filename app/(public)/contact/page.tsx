// v2 - updated contact page
"use client";
import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-6 tracking-tighter" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Get in touch</h1>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed">
            Need help with your Voice DNA model? Questions about our enterprise plans? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-[#111111] border border-white/[0.06] rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent top-0" />
            
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-zinc-500 text-xs font-black uppercase tracking-widest block mb-2">Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.08] text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00E5FF] transition-all"
                      placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs font-black uppercase tracking-widest block mb-2">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/[0.08] text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00E5FF] transition-all"
                      placeholder="jane@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-zinc-500 text-xs font-black uppercase tracking-widest block mb-2">Subject</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full bg-black/40 border border-white/[0.08] text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00E5FF] transition-all appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnership/Media</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-500 text-xs font-black uppercase tracking-widest block mb-2">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-black/40 border border-white/[0.08] text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00E5FF] transition-all resize-none"
                    placeholder="Tell us what you need..." />
                </div>
                <button type="submit"
                  className="w-full bg-[#00E5FF] text-[#0A0F1E] font-black rounded-xl py-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(0,229,255,0.1)]">
                  Submit Message
                </button>
              </form>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#00E5FF]/10 text-[#00E5FF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Transmission Received</h3>
                <p className="text-zinc-500 mb-8 max-w-xs mx-auto">We've received your message and will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSent(false)}
                  className="text-[#00E5FF] font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          <div className="space-y-8 pl-0 md:pl-12">
            <div>
              <h2 className="text-white text-2xl font-bold mb-8">Direct Channels</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.06] flex items-center justify-center text-[#00E5FF]">@</div>
                  <div>
                    <p className="text-zinc-400 font-bold text-sm mb-1 uppercase tracking-tight">Support Email</p>
                    <a href="mailto:support@resodin.ai" className="text-xl font-bold text-white hover:text-[#00E5FF] transition-colors">support@resodin.ai</a>
                    <p className="text-zinc-600 text-xs mt-2 italic font-medium">We typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-zinc-900 border border-white/[0.06] flex items-center justify-center text-[#00E5FF]">#</div>
                  <div>
                    <p className="text-zinc-400 font-bold text-sm mb-1 uppercase tracking-tight">Socials</p>
                    <div className="flex gap-6 mt-2">
                       <a href="https://linkedin.com/company/resodin" target="_blank" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold underline decoration-[#00E5FF]/30 underline-offset-4">LinkedIn</a>
                       <a href="https://x.com/resodin" target="_blank" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold underline decoration-[#00E5FF]/30 underline-offset-4">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/40 border border-white/[0.04] rounded-24">
               <p className="text-white font-bold mb-3 text-sm">Need a faster response?</p>
               <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                 Pro and Business users get access to priority ticketing with 4-hour response windows during business hours.
               </p>
               <Link href="/pricing" className="text-[#00E5FF] text-xs font-black uppercase tracking-widest hover:underline">
                 Upgrade Plan →
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
