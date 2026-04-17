export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
        <span className="inline-block bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full mb-12">
          Last updated: April 11, 2026
        </span>
        {[
          { title: "Acceptance of Terms", body: "By accessing or using Resodin, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services." },
          { title: "Description of Service", body: "Resodin is an AI-powered content generation platform specifically designed for LinkedIn. We provide tools for voice cloning (Voice DNA), post generation, and content optimization." },
          { title: "Account Responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use." },
          { title: "Acceptable Use", body: "You agree not to use Resodin for any unlawful purpose or in any way that violates LinkedIn's User Agreement. You are solely responsible for the content you generate and post." },
          { title: "Payments & Refunds", body: "Subscriptions are billed in advance on a monthly or annual basis. You can cancel at any time. Refunds are provided on a case-by-case basis within 14 days of purchase." },
          { title: "Intellectual Property ownership", body: "You retain all ownership rights to the content you generate with Resodin. Resodin owns the underlying technology, AI models, and platform interface." },
          { title: "Limitation of Liability", body: "Resodin is provided 'as is' without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of the service." },
          { title: "Contact", body: "Legal questions: legal@resodin.ai | General support: support@resodin.ai | Resodin Inc., 2026" },
        ].map((s, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-white text-xl font-semibold mb-3">{s.title}</h2>
            <p className="text-zinc-400 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
