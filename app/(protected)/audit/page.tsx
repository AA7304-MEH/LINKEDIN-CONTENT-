import AuditWizard from "@/components/audit/AuditWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Content DNA Audit | Resonate",
    description: "Analyze your LinkedIn content strategy.",
};

export default function AuditPage() {
    return (
        <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_-100px,#3b0764,transparent)]"></div>

            <div className="max-w-7xl mx-auto relative z-10 text-white">
                <AuditWizard />
            </div>
        </div>
    );
}
