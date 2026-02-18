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
import ScrollToTop from "./component/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans">
      {/* Sections */}
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GroupOfCompaniesPage />
      <PartnershipSection />
      <ContactSection />
      <CTASection />
      <Chatbot />
      <ScrollToTop/>
    </div>
  );
}