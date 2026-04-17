import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <span className="inline-block bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full mb-12">
          Last updated: April 11, 2026
        </span>
        {[
          { title: "Information We Collect", body: "We collect your name, email address, and LinkedIn content samples you choose to upload. We also collect usage data such as features used and posts generated. Payments are processed securely by Stripe — we never store card details." },
          { title: "How We Use Your Information", body: "We use your information to provide and improve Resodin, personalize your Voice DNA model, and send product updates (only with your consent). We never sell your personal data to third parties." },
          { title: "Data Storage & Security", body: "Your data is stored on secure servers with encryption at rest and in transit. Voice DNA models are stored per-user and never shared across accounts. You can request deletion at any time by emailing support@resodin.ai." },
          { title: "Cookies", body: "We use essential cookies for authentication and session management, and optional analytics cookies. We do not use advertising cookies. You can opt out of analytics cookies at any time." },
          { title: "Third-Party Services", body: "Resodin integrates with Clerk (authentication), Stripe (payments), Vercel (hosting), and OpenAI (content generation). Each has its own privacy policy." },
          { title: "Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. EU/UK users have additional rights under GDPR. Contact us at privacy@resodin.ai to exercise your rights." },
          { title: "Contact", body: "Privacy questions: privacy@resodin.ai | General support: support@resodin.ai | Resodin Inc., 2026" },
        ].map((s, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-white text-xl font-semibold mb-3">{s.title}</h2>
            <p className="text-zinc-400 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
