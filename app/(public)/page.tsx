"use client";

import LandingNavbar from '@/app/landing-components/LandingNavbar';
import HeroSection from '@/app/landing-components/HeroSection';
import LaunchBanner from '@/app/landing-components/LaunchBanner';
import ValueProps from '@/app/landing-components/ValueProps';
import FeatureDemo from '@/app/landing-components/FeatureDemo';
import LiveDemoSamples from '@/app/landing-components/LiveDemoSamples';
import SocialProof from '@/app/landing-components/SocialProof';
import PricingTable from '@/app/landing-components/PricingTable';
import FAQAccordion from '@/app/landing-components/FAQAccordion';
import CTASection from '@/app/landing-components/CTASection';
import LandingFooter from '@/app/landing-components/LandingFooter';


export default function Home() {
  return (
    <main>
      <LaunchBanner />
      <LandingNavbar />
      <HeroSection />
      <ValueProps />
      <FeatureDemo />
      <LiveDemoSamples />
      <SocialProof />
      <PricingTable />
      <FAQAccordion />
      <CTASection />
      <LandingFooter />
    </main>
  );
}
