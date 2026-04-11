"use client";

import React, { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Get in touch
        </h1>
        <p className="text-zinc-400 text-lg">We typically respond to all inquiries within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-zinc-900/50 border border-white/[0.08] rounded-3xl p-8 md:p-10">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              
              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#00E5FF] text-[#0A0F1E] font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-[#00E5FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="text-[#00E5FF]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-zinc-400 mb-8">Thank you for reaching out. We'll be in touch soon.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="text-[#00E5FF] font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        <div className="space-y-12 flex flex-col justify-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Direct Email</h3>
            <p className="text-zinc-400 leading-relaxed">
              Prefer a direct conversation? Shoot us an email and we'll route it to the right person.
            </p>
            <div className="flex items-center gap-3 text-[#00E5FF] font-semibold text-lg">
              <Mail size={24} />
              <a href="mailto:support@resodin.ai" className="hover:underline">support@resodin.ai</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Office Hour</h3>
            <p className="text-zinc-400">
              Mon – Fri: 9:00 AM – 6:00 PM EST<br />
              Closed on Weekends and Holidays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
