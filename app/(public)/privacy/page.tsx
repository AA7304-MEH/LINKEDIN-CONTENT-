"use client";

import React from "react";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "April 11, 2026";

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-500 text-sm">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-12 text-zinc-400">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye size={18} className="text-[#00E5FF]" /> 
              1. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We collect information that you provide directly to us when you create an account, such as your name, email address, and LinkedIn profile data. Specifically, our "Voice DNA" feature analyzes the text of your past LinkedIn posts to create a stylistic profile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#00E5FF]" /> 
              2. How We Use Your Data
            </h2>
            <p className="leading-relaxed mb-4">
              Your data is used exclusively to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our Content Generation services.</li>
              <li>Develop your unique Stylistic Profile (Voice DNA).</li>
              <li>Process your payments and prevent fraud.</li>
              <li>Communicate with you about updates and support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock size={18} className="text-[#00E5FF]" /> 
              3. Data Security & Storage
            </h2>
            <p className="leading-relaxed">
              We use industry-standard encryption and security protocols to protect your data. Your LinkedIn content analysis is stored securely and is never shared with third parties for their own marketing purposes. We use Clerk for authentication and Stripe for payment processing, both of which maintain rigorous security standards.
            </p>
          </section>

          <section className="bg-zinc-900/50 border border-white/[0.06] p-8 rounded-2xl">
            <h3 className="text-white font-bold mb-4">Your Rights</h3>
            <p className="text-sm leading-relaxed mb-4">
              Under various data protection laws (including GDPR and CCPA), you have the right to access, correct, or delete your personal data. You can export your Voice DNA profile or delete your account entirely through the dashboard at any time.
            </p>
            <p className="text-sm font-semibold text-[#00E5FF]">
              Request data deletion: privacy@resodin.ai
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
