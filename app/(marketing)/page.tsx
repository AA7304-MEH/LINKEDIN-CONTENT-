"use client";

import LandingNavbar from './landing-components/LandingNavbar';
import HeroSection from './landing-components/HeroSection';
import LaunchBanner from './landing-components/LaunchBanner';
import ValueProps from './landing-components/ValueProps';
import FeatureDemo from './landing-components/FeatureDemo';
import SocialProof from './landing-components/SocialProof';
import PricingTable from './landing-components/PricingTable';
import FAQAccordion from './landing-components/FAQAccordion';
import CTASection from './landing-components/CTASection';
import LandingFooter from './landing-components/LandingFooter';

export default function Home() {
  return (
    <main>
      <LaunchBanner />
      <LandingNavbar />
      <HeroSection />
      <ValueProps />
      <FeatureDemo />
      <SocialProof />
      <PricingTable />
      <FAQAccordion />
      <CTASection />
      <LandingFooter />
    </main>
  );
}
