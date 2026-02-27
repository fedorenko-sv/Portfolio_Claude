import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import PortfolioSection from "@/components/PortfolioSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <PortfolioSection />
        <IntegrationsSection />
        <PricingSection />
        <ContactSection />
      </main>
    </>
  );
}
