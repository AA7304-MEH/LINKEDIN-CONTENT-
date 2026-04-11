import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/[0.06]" style={{ backgroundColor: '#0A0F1E' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="font-bold text-white tracking-tight mb-4 block" style={{ fontSize: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Resodin.ai</Link>
            <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.6 }}>AI-powered LinkedIn content that sounds like you.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/audit" className="hover:text-white transition-colors">Free Audit</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li><Link href="#" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Voice DNA</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.06] text-center">
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>© 2026 Resodin Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
