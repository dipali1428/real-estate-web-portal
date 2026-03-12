"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../../component/ScrollToTop";
import CTASection from "../../component/CTASection";
import Chatbot from "../../component/chatbot/page";

// Modular Components
import { Hero } from "./components/Hero";
import { LoanProtectorCalculator } from "./components/Calculator";
import { Features } from "./components/Features";
import { SpecializedPlans } from "./components/SpecializedPlans";
import { Eligibility } from "./components/Eligibility";
import { Insurers } from "./components/Insurers";
import { Coverage } from "./components/Coverage";
import { Benefits } from "./components/Benefits";
import { FAQSection } from "./components/FAQSection";

export default function LoanProtectorInsurancePage() {
  const [planType, setPlanType] = useState("Individual Loan Protection Plan");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#2076C7]/10 selection:text-[#2076C7]">
      <Hero />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 space-y-12 md:space-y-16">
        <LoanProtectorCalculator
          planType={planType}
          setPlanType={setPlanType}
        />

        <Features />

        <SpecializedPlans setPlanType={setPlanType} />

        <Eligibility />

        <Insurers />

        <Coverage />

        <Benefits />

        {/* DISCLAIMER */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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

        <FAQSection />
      </main>

      <ScrollToTop />
      <CTASection />
      <Chatbot />

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
