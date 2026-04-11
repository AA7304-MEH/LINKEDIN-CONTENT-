import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <div className="mb-12 relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center group-hover:border-[#00E5FF]/50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-[#00E5FF]"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            RESODIN<span className="text-[#00E5FF]">.AI</span>
          </span>
        </Link>
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-[#111111] border border-[#1E1E1E] rounded-2xl shadow-2xl p-2",
              headerTitle: "text-2xl font-bold text-white",
              headerSubtitle: "text-zinc-400 font-medium",
              socialButtonsBlockButton: "bg-zinc-900 border border-white/[0.08] text-white hover:bg-zinc-800 transition-colors",
              socialButtonsBlockButtonText: "text-white font-semibold",
              dividerLine: "bg-white/[0.08]",
              dividerText: "text-zinc-500 text-xs font-bold uppercase",
              formFieldLabel: "text-zinc-400 font-semibold mb-2",
              formFieldInput: "bg-[#0A0A0A] border border-white/[0.08] text-white rounded-xl py-3 focus:ring-[#00E5FF] focus:border-[#00E5FF] transition-all",
              formButtonPrimary: "bg-[#00E5FF] text-[#0A0A0A] font-bold py-3 rounded-xl hover:bg-cyan-300 transition-all",
              footerActionLink: "text-[#00E5FF] font-semibold hover:text-cyan-300",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-zinc-400",
              formResendCodeLink: "text-[#00E5FF]",
              otpCodeFieldInput: "bg-[#0A0A0A] border border-white/[0.08] text-white rounded-xl focus:ring-[#00E5FF]",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              showOptionalFields: false,
            }
          }}
        />
      </div>

      <p className="mt-8 text-zinc-500 text-sm font-medium">
        &copy; 2026 Resodin Inc. All rights reserved.
      </p>
    </div>
  );
}
