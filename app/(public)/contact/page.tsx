"use client";

import React, { useState } from "react";
import { Mail, Send, Loader2, MessageSquare, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/support/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          subject: `Contact Form: ${formData.name}`,
          message: `Name: ${formData.name}\n\n${formData.message}`
        })
      });
      
      if (!response.ok) throw new Error("Failed to send message.");
      
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Get in <span className="text-[#00E5FF]">touch</span>
            </h1>
            <p className="text-zinc-400 text-xl leading-relaxed mb-12">
              Have a question about Resodin? Want to discuss a custom plan? 
              Our team is here to help you sound like your best self.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Mail className="text-[#00E5FF]" />, title: "Support Email", detail: "support@resodin.ai", sub: "We typically reply within 24 hours" },
                { icon: <MessageSquare className="text-[#00E5FF]" />, title: "Live Chat", detail: "Available for Pro users", sub: "Instant response during EST hours" },
                { icon: <Globe className="text-[#00E5FF]" />, title: "Headquarters", detail: "Remote-first team", sub: "Based in New York & San Francisco" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold">{item.title}</div>
                    <div className="text-[#00E5FF] font-medium">{item.detail}</div>
                    <div className="text-zinc-500 text-sm">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-[#00E5FF]/5 blur-3xl rounded-[40px] pointer-events-none" />
            <div className="relative bg-zinc-900/30 border border-white/[0.08] rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-400 mb-2">Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-zinc-800"
                        placeholder="Arjun Mehta"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-400 mb-2">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-zinc-800"
                        placeholder="arjun@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-400 mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#0A0F1E] border border-white/[0.08] rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors resize-none placeholder:text-zinc-800"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00E5FF] text-[#0A0F1E] font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#00E5FF]/10 group"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message</>}
                  </button>

                  <p className="text-center text-zinc-600 text-sm mt-8">
                    Or email us directly at <a href="mailto:support@resodin.ai" className="text-zinc-400 hover:text-[#00E5FF] transition-colors">support@resodin.ai</a>
                  </p>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#00E5FF]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
                    <Zap className="text-[#00E5FF]" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                    Thanks for reaching out, {formData.name.split(' ')[0]}. We've received your ticket and will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
