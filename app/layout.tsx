import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SupportWidget from "@/components/SupportWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ReferralTracker from "@/components/ReferralTracker";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resodin AI — LinkedIn Content Generator That Sounds Like You",
  description: "AI-powered LinkedIn post generator that learns your unique voice. Generate viral posts, analyze hooks, repurpose content. Join the waitlist for early access.",
  keywords: ["LinkedIn post generator", "AI LinkedIn content", "LinkedIn creator tool", "personal brand AI", "LinkedIn automation"],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: "Resodin AI — LinkedIn Content That Sounds Like You",
    description: "Stop sounding like AI. Resodin learns your voice and generates LinkedIn posts that sound unmistakably like you.",
    url: "https://resodin.vercel.app",
    siteName: "Resodin AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resodin AI — LinkedIn Content Generator",
    description: "AI that writes LinkedIn posts in YOUR voice. Try free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
          <GoogleAnalytics />
        </head>
        <body className="font-sans antialiased text-[#F9FAFB] bg-[#0A0F1E] selection:bg-[#06B6D4]/30 selection:text-white" style={{ backgroundColor: '#0A0F1E', color: '#F9FAFB', fontFamily: "'Inter', sans-serif", margin: 0 }} suppressHydrationWarning>
          {children}
          <ReferralTracker />
          <SupportWidget />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
