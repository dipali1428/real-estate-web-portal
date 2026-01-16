import AboutSection from "./component/AboutSection";
import ContactSection from "./component/ContactSection";
import CTASection from "./component/CTASection";
import HeroSection from "./component/HeroSection";
import LeadershipSection from "./component/LeaderShipSection";
import PartnershipSection from "./component/PartnerShipSection";
import ServicesSection from "./component/ServicesSection";
import Chatbot from "./component/chatbot/page"
export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans">
      {/* Responsive container */}
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <LeadershipSection />
      <PartnershipSection />
      <ContactSection />
      <CTASection />
      <Chatbot />
    </div>
  );
}
