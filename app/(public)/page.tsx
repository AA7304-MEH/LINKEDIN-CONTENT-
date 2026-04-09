import LandingNavbar from "@/app/landing-components/LandingNavbar";
import HeroSection from "@/app/landing-components/HeroSection";
import ProductDemoSection from "@/app/landing-components/ProductDemoSection";
import FeaturesSection from "@/app/landing-components/FeaturesSection";
import TestimonialsSection from "@/app/landing-components/TestimonialsSection";
import PricingTable from "@/app/landing-components/PricingTable";
import FAQAccordion from "@/app/landing-components/FAQAccordion";
import LandingFooter from "@/app/landing-components/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d12] scroll-smooth">
      <LandingNavbar />
      <HeroSection />
      <ProductDemoSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingTable />
      <FAQAccordion />
      <LandingFooter />
    </main>
  );
}

