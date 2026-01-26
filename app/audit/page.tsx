import AuditWizard from "@/components/audit/AuditWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Content Audit | Resonate",
    description: "Get a free 6-point audit of your LinkedIn content strategy.",
};

export default function AuditPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen">
                <AuditWizard />
            </div>
        </main>
    );
}
