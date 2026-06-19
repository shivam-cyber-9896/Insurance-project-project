import HeroSection from "../components/landing/HeroSection";
import ProductsSection from "../components/landing/ProductsSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";
import StatsSection from "../components/landing/StatsSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import PlansSection from "../components/landing/PlansSection";
import ClaimsSection from "../components/landing/ClaimsSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import FaqSection from "../components/landing/FaqSection";
import ContactSection from "../components/landing/ContactSection";

export default function LandingPage() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroSection scrollTo={scrollTo} />
      <ProductsSection />
      <WhyChooseSection />
      <StatsSection />
      <HowItWorksSection />
      <PlansSection />
      <ClaimsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
