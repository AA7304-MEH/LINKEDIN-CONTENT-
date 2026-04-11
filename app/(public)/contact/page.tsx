"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, Send, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        {/* Info Column */}
        <div className="md:w-1/3">
          <h1 className="text-4xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Let's Talk <br />
            <span className="text-[#00E5FF]">Optimization</span>
          </h1>
          <p className="text-zinc-500 mb-12 text-lg">
            Have a question about Enterprise plans, API access, or just want to tell us how much time you've saved? Reach out below.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Email us</h4>
                <p className="text-zinc-500 text-sm">hello@resodin.ai</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Support chat</h4>
                <p className="text-zinc-500 text-sm">Available 9am - 6pm EST</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Headquarters</h4>
                <p className="text-zinc-500 text-sm">New York, NY (Remote-First)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="flex-1">
          {!submitted ? (
            <div className="bg-zinc-900/40 border border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest pl-1">Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#00E5FF] transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest pl-1">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@company.com"
                      className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#00E5FF] transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 font-bold uppercase tracking-widest pl-1">Message</label>
                  <textarea 
                    required
                    placeholder="Tell us about your needs..."
                    rows={5}
                    className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-[#00E5FF] transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#00E5FF] text-[#0A0F1E] font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2"
                >
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-3xl p-16 text-center space-y-6 animate-in fade-in zoom-in duration-500">
               <div className="w-20 h-20 rounded-full bg-[#00E5FF] text-[#0A0F1E] flex items-center justify-center mx-auto text-3xl">✓</div>
               <h3 className="text-3xl font-bold text-white">Message Received</h3>
               <p className="text-zinc-400 max-w-sm mx-auto text-lg leading-relaxed">
                 Thanks for reaching out! One of our team members will get back to you within 24 hours.
               </p>
               <button 
                 onClick={() => setSubmitted(false)}
                 className="text-[#00E5FF] font-semibold hover:underline"
               >
                 Send another message
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
