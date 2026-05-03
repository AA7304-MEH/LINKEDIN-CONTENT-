// v2 - updated privacy policy
export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Privacy Policy</h1>
        <span className="inline-block bg-zinc-900 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-12">
          Effective: April 2026
        </span>

        {[
          {
            title: "1. Introduction",
            content: "Welcome to Resodin. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
          },
          {
            title: "2. The Data We Collect",
            content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (name, username), Contact Data (email address), Technical Data (IP address, browser type), and Usage Data (how you use our website)."
          },
          {
            title: "3. Voice DNA & Content Samples",
            content: "Unique to Resodin, we process content samples you provide to generate your 'Voice DNA' model. These samples are used solely for the training and refinement of your personal content generation model. We do not use your personal content samples to train global models that benefit other users."
          },
          {
            title: "4. How We Use Your Data",
            content: "We only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, or where it is necessary for our legitimate interests."
          },
          {
            title: "5. Data Security",
            content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, and contractors who have a business need to know."
          },
          {
            title: "6. Your Legal Rights",
            content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, or transfer of your data."
          },
          {
            title: "7. Contact Us",
            content: "If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@resodin.ai."
          }
        ].map((section, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-white text-xl font-bold mb-4">{section.title}</h2>
            <p className="text-zinc-500 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
