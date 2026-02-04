"use client"; // Important for refs and state
// import { useRef } from "react";
import AboutSection from "./component/AboutSection";
import ContactSection from "./component/ContactSection";
import CTASection from "./component/CTASection";
import HeroSection from "./component/HeroSection";
import GroupOfCompaniesPage from "./component/GroupOfCompanies";
import PartnershipSection from "./component/PartnerShipSection";
import ServicesSection from "./component/ServicesSection";
import Chatbot from "./component/chatbot/page";
// import ScrollToTop from "./component/ScrollToTop";

export default function Home() {
  // 1. Create the reference
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      // ref={scrollContainerRef} // 2. Attach the reference
      // className="h-screen w-full overflow-x-hidden overflow-y-auto font-sans home-scrollbar scroll-smooth"
      >
      {/* Sections */}
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GroupOfCompaniesPage />
      <PartnershipSection />
      <ContactSection />
      <CTASection />
      
      {/* Components that stay floating */}
      <Chatbot />
      
      {/* 3. Pass the reference to the button */}
      {/* <ScrollToTop containerRef={scrollContainerRef} /> */}
    </div>
  );
}