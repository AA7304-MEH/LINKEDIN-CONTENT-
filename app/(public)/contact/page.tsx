"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Get in touch</h1>
          <p className="text-zinc-400 text-lg">Have a question? We'd love to hear from you.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-8">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-zinc-400 text-sm font-medium block mb-2">Full Name</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400/50 transition"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="text-zinc-400 text-sm font-medium block mb-2">Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400/50 transition"
                    placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-zinc-400 text-sm font-medium block mb-2">Subject</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400/50 transition">
                    <option>General</option>
                    <option>Billing</option>
                    <option>Technical</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 text-sm font-medium block mb-2">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400/50 transition resize-none"
                    placeholder="How can we help?" />
                </div>
                <button type="submit"
                  className="w-full bg-cyan-400 text-black font-bold rounded-lg py-3 hover:bg-cyan-300 transition">
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="text-cyan-400 text-5xl mb-4">✓</div>
                <h3 className="text-white text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-zinc-400">We'll reply within 24 hours.</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
              <p className="text-cyan-400 font-semibold text-sm mb-1">Email</p>
              <a href="mailto:support@resodin.ai" className="text-white hover:text-cyan-400 transition">support@resodin.ai</a>
              <p className="text-zinc-500 text-sm mt-1">We reply within 24 hours</p>
            </div>
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl p-5">
              <p className="text-cyan-400 font-semibold text-sm mb-1">Follow us</p>
              <div className="space-y-1 mt-1">
                <a href="https://x.com/Resonate462882" target="_blank" className="block text-white hover:text-cyan-400 transition text-sm">X (Twitter) →</a>
                <a href="https://www.linkedin.com/company/resodin-ai" target="_blank" className="block text-white hover:text-cyan-400 transition text-sm">LinkedIn →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
