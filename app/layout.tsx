import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import SupportWidget from "@/components/SupportWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resodin | AI-Powered Professional Posts",
  description: "Generate engaging, professional LinkedIn posts in seconds with our AI-powered tool. Boost your personal brand today.",
  keywords: ["LinkedIn", "Content Generator", "AI", "Professional", "Social Media"],
  openGraph: {
    title: "Resodin",
    description: "Generate engaging, professional LinkedIn posts in seconds.",
    type: "website",
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
          <SupportWidget />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
