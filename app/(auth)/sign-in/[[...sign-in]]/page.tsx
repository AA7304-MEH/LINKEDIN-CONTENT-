"use client";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Resodin.AI
      </Link>
      <div className="w-full max-w-md">
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-3xl p-2 shadow-[0_0_60px_rgba(0,229,255,0.05)]">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-none p-6 md:p-8",
                headerTitle: "text-2xl font-bold text-white",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton: "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white font-medium h-12",
                socialButtonsBlockButtonText: "text-white font-semibold",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-500 text-xs uppercase",
                formFieldLabel: "text-zinc-400 font-medium mb-1",
                formFieldInput: "bg-[#0A0A0A] border border-white/[0.08] text-white rounded-xl py-3 focus:ring-[#00E5FF] focus:border-[#00E5FF] transition-all",
                formButtonPrimary: "bg-[#00E5FF] text-black font-bold py-3 rounded-xl hover:bg-cyan-300 transition-all",
                footerActionLink: "text-[#00E5FF] font-semibold hover:text-cyan-300",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
