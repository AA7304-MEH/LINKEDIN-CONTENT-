"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08]" 
         style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-bold text-white tracking-tight" 
                style={{ fontSize: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Resodin.ai
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-white hover:text-[#00E5FF] transition-colors font-medium">Features</Link>
            <Link href="/#pricing" className="text-white hover:text-[#00E5FF] transition-colors font-medium">Pricing</Link>
            <Link href="/audit" className="text-white hover:text-[#00E5FF] transition-colors font-medium">Free Audit</Link>
            <Link href="/blog" className="text-white hover:text-[#00E5FF] transition-colors font-medium">Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Link href="/sign-in" className="text-white hover:text-[#00E5FF] transition-colors font-medium px-4 py-2">
                Log in
              </Link>
              <Link href="/sign-up" className="font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center" 
                    style={{ backgroundColor: '#00E5FF', color: '#0A0F1E', borderRadius: '100px', padding: '10px 24px', fontSize: '15px' }}>
                Start free
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-white hover:text-[#00E5FF] transition-colors font-medium px-4 py-2">
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0F1E] border-b border-white/[0.08] px-4 pt-2 pb-6 space-y-4 shadow-xl">
          <Link href="/#features" className="block text-white hover:text-[#00E5FF] py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
          <Link href="/#pricing" className="block text-white hover:text-[#00E5FF] py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link href="/audit" className="block text-white hover:text-[#00E5FF] py-2" onClick={() => setIsMobileMenuOpen(false)}>Free Audit</Link>
          <Link href="/blog" className="block text-white hover:text-[#00E5FF] py-2" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <div className="pt-4 border-t border-white/[0.08] flex flex-col space-y-3">
            <SignedOut>
              <Link href="/sign-in" className="text-center text-white px-4 py-2 border border-white/[0.08] rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link href="/sign-up" className="text-center font-bold px-4 py-2 rounded-xl" style={{ backgroundColor: '#00E5FF', color: '#0A0F1E' }} onClick={() => setIsMobileMenuOpen(false)}>Start free</Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-center text-white px-4 py-2 border border-white/[0.08] rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <div className="flex justify-center py-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}
