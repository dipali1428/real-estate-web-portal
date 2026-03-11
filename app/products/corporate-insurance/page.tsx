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

import CTASection from "../../component/CTASection";
export default function CorporateInsurancePage() {
  const { openQuote } = useModal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CorporateHero openQuote={openQuote} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 pb-24 md:pb-32">
        {/* Charts & Importance Section */}
        <section className="pt-8">
          <InsuranceCharts isMobile={isMobile} />
        </section>

        {/* Did You Know Facts */}
        <RiskInsights />

        {/* Commercial Property / Package Calculator */}
        <CorporatePremiumCalculator openQuote={openQuote} />

        {/* Group Health Calculator */}
        <GroupHealthCalculator openQuote={openQuote} />

        {/* Top Insurers Section */}
        <InsurersSection openQuote={openQuote} />

        {/* Products Grid */}
        <ProductGrid openQuote={openQuote} />

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
      <CTASection onClick={openQuote} />
    </div>
  );
}
