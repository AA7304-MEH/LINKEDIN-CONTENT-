import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/[0.06]" style={{ backgroundColor: '#070C18' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-bold text-white tracking-tight mb-6 block" style={{ fontSize: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              RESODIN<span className="text-[#00E5FF]">.AI</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
              The first AI content engine that decodes your personal voice for high-authority LinkedIn growth.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Product</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/#features" className="hover:text-[#00E5FF] transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-[#00E5FF] transition-colors">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-[#00E5FF] transition-colors">Blog</Link></li>
                <li><Link href="/audit" className="hover:text-[#00E5FF] transition-colors font-semibold text-[#00E5FF]">Free Audit</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/about" className="hover:text-[#00E5FF] transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#00E5FF] transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[#00E5FF] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#00E5FF] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8">Stay Connected</h4>
            <p className="text-xs text-zinc-500 mb-6">Join 12,000+ creators mastering their digital voice.</p>
            <div className="flex gap-4">
              <Link href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            © 2026 Resodin Inc.
          </p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <span>Powered by Gemini 2.0</span>
            <span>Handcrafted for excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
