import AuditWizard from "@/components/audit/AuditWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Content DNA Audit | Resodin",
    description: "Analyze your LinkedIn content strategy and get personalized recommendations.",
};

export default function PublicAuditPage() {
    return (
        <main className="min-h-screen bg-[#0d0d12]">
            <AuditWizard />
        </main>
    );
}
