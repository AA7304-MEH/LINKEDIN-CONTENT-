"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-zinc-900/10 border border-white/[0.08] rounded-[40px] p-8 md:p-12 backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Terms of Service</h1>
          <p className="mb-12 text-zinc-500 font-medium tracking-tight uppercase text-xs">Last updated: April 2026</p>

          <div className="space-y-12 text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Resodin.ai, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Account Usage</h2>
              <p>
                You are responsible for maintaining the security of your account. You agree not to share your account credentials with third parties. We reserve the right to suspend accounts that engage in fraudulent or abusive behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Content and AI</h2>
              <p>
                Our platform uses AI to generate content based on your inputs. While we strive for high quality, we do not guarantee the accuracy or appropriateness of generated content. You are responsible for final proofreading and publishing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment and Refunds</h2>
              <p>
                We offer various subscription tiers. Payments are processed via Razorpay. You can cancel your subscription at any time. Refunds are handled on a case-by-case basis according to our pricing policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>
                Resodin Inc. shall not be liable for any damages resulting from your use or inability to use the service, including but not limited to any changes to LinkedIn's algorithms or account policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Resodin Inc. is registered.
              </p>
            </section>
          </div>

          <div className="mt-20 pt-12 border-t border-white/[0.08] text-center">
            <p className="text-zinc-500 italic text-sm">
              For any questions regarding these terms, please contact us at <a href="mailto:support@resodin.ai" className="text-[#00E5FF] hover:underline">support@resodin.ai</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
