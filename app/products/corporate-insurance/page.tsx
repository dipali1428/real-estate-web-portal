"use client";

import React, { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { motion } from "framer-motion";
// Modular Components

import { CorporateHero } from "./components/CorporateHero";
import { InsuranceCharts } from "./components/InsuranceCharts";
import { RiskInsights } from "./components/RiskInsights";
import { ProductGrid } from "./components/ProductGrid";
import { CorporatePremiumCalculator } from "./components/CorporatePremiumCalculator";
import { GroupHealthCalculator } from "./components/GroupHealthCalculator";
import { InsurersSection } from "./components/InsurersSection";
import { IndustryFocus } from "./components/IndustryFocus";
import { ProcessSection } from "./components/ProcessSection";
import { ClaimsAssistance } from "./components/ClaimsAssistance";
import { BenefitsSection } from "./components/BenefitsSection";
import { FAQSection } from "./components/FAQSection";
import ScrollToTop from "../../component/ScrollToTop";
import ChatBot from "../../component/chatbot/page";

import CTASection from "../../component/CTASection";
export default function CorporateInsurancePage() {
  const { openLogin } = useModal();
  const [isMobile, setIsMobile] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState<
    "commercial" | "group-health"
  >("commercial");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CorporateHero openQuote={openLogin} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 pb-24 md:pb-32">
        {/* Charts & Importance Section */}
        <section className="pt-8">
          <InsuranceCharts isMobile={isMobile} />
        </section>

        {/* Did You Know Facts */}
        <RiskInsights />

        {/* Calculator Switcher section */}
        <section className="space-y-12">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 font-sans leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                  Premium Calculators
                </span>
              </h2>
              <p className="text-gray-600">
                Choose a calculator to estimate your insurance premiums
                instantly.
              </p>
            </div>

            <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl shadow-inner relative z-10 w-full max-w-md mx-auto">
              {["commercial", "group-health"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCalculator(tab as any)}
                  className={`
                    relative flex-1 py-3.5 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-500 overflow-hidden
                    ${
                      activeCalculator === tab
                        ? "text-white shadow-lg"
                        : "text-gray-500 hover:text-gray-800"
                    }
                  `}
                >
                  {/* Active Background Glow */}
                  {activeCalculator === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 z-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 uppercase">
                    {tab === "commercial" ? "Commercial" : "Group Health"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative pt-8">
            <motion.div
              key={activeCalculator}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeCalculator === "commercial" ? (
                <CorporatePremiumCalculator openQuote={openLogin} />
              ) : (
                <GroupHealthCalculator openQuote={openLogin} />
              )}
            </motion.div>
          </div>
        </section>

        {/* Top Insurers Section */}
        <InsurersSection openQuote={openLogin} />

        {/* Products Grid */}
        <ProductGrid openQuote={openLogin} />

        {/* Industry Focus */}
        <IndustryFocus />

        {/* How It Works Section */}
        <ProcessSection />

        {/* Claims Support Section */}
        <ClaimsAssistance />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* DISCLAIMER */}

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
              <div className="space-y-2">
                <p className="text-amber-900 text-xs sm:text-sm md:text-base leading-relaxed opacity-80">
                  <b> Disclaimer:</b> Information and premium quotes provided
                  are for general guidance and are subject to change. Please
                  verify all details with the respective insurance providers
                  before making a final decision.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <FAQSection />
      </main>
      <CTASection />
      <ScrollToTop/>
      <ChatBot/>
    </div>
  );
}
