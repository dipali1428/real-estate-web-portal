"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ArrowLeft as IconArrowLeft } from 'lucide-react';
import Hero from "./components/Hero";
import LifeProductGrid from "./components/LifeProductGrid";
import TopPlansComparison from "./components/TopPlansComparison";
import InsurersMarquee from "./components/InsurersMarquee";
import TopRecommendedPlans from "./components/TopRecommendedPlans";
import WealthAnalysis from "./components/WealthAnalysis";
import LifeInsuranceCTA from "./components/LifeInsuranceCTA";
import EligibilityDocs from "./components/EligibilityDocs";
import TrustSection from "./components/TrustSection";
import TermCalculator from "./components/TermCalculator";
import FAQSection from "./components/FAQSection";
import { MotionConfig } from "framer-motion";
import ScrollToTop from "@/app/component/ScrollToTop";
import ChatbotWidget from "@/app/component/chatbot/page";

export default function LifeInsurancePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleBackHome = () => {
    router.push('/');
  };

  useEffect(() => {
    setMounted(true);
    // Ensure body is scrollable
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 100, damping: 20 }}>
      {/* Back to Home Button */}
      <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
        <button
          onClick={handleBackHome}
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </button>
        <button
          onClick={handleBackHome}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group font-sans"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          Back to Home
        </button>
      </div>

      <main className="bg-white min-h-screen overflow-visible font-sans">
        <Hero />

        <div className="w-full">
          <TermCalculator />
        </div>

        <div className="w-full">
          <WealthAnalysis />
        </div>

        <div className="w-full">
          <TopRecommendedPlans />
        </div>

        <div className="w-full">
          <TopPlansComparison />
        </div>

        <div className="w-full">
          <LifeProductGrid />
        </div>

        <div className="space-y-0">
          <div className="w-full">
            <EligibilityDocs />
          </div>

          <div className="w-full">
            <TrustSection />
          </div>



          <InsurersMarquee />
        </div>

        <div className="bg-white py-8 px-6 font-sans">
          <div className="max-w-4xl mx-auto bg-yellow-50/50 border border-yellow-200/50 rounded-xl p-6 shadow-sm">
            <p className="font-sans text-sm text-gray-700 text-center leading-relaxed">
              <strong className="font-sans text-black">Disclaimer:</strong> Insurance is a subject matter of solicitation. The information provided on this website is for general informational purposes only and does not constitute professional financial advice. Coverage details, premiums, and benefits are subject to the specific terms and conditions of the respective insurance policies. We strongly recommend reading the policy documents carefully before making any legally binding decision.
            </p>
          </div>
        </div>

        <div className="w-full">
          <FAQSection />
        </div>


      </main>
      <ScrollToTop />
      <ChatbotWidget />
      <LifeInsuranceCTA />
    </MotionConfig>

  );
}