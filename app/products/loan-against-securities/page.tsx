"use client";
import React from "react";
import FAQSection from "./components/FAQSection";
import ScrollToTop from "../../component/ScrollToTop";
import { useModal } from "../../context/ModalContext";
import Chatbot from "../../component/chatbot/page";
import CTASection from "../../component/CTASection";
// Refactored Components
import { LASHero } from "./components/LASHero";
import { LASProductGrid } from "./components/LASProductGrid";
import { LASProcessSteps } from "./components/LASProcessSteps";
import { LASEligibility } from "./components/LASEligibility";
import { LASFeatures } from "./components/LASFeatures";
import { LASLenderTypes } from "./components/LASLenderTypes";

/* ---------------- MAIN PAGE ---------------- */

export default function LoanAgainstSecuritiesPage() {
  const { openLogin } = useModal();

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
      <Chatbot />

      {/* HERO SECTION */}
      <LASHero openLogin={openLogin} />

      {/* PRODUCT GRID */}
      <LASProductGrid openLogin={openLogin} />

      {/* PROCESS STEPS */}
      <LASProcessSteps />

      {/* ELIGIBILITY */}
      <LASEligibility />

      {/* FEATURES */}
      <LASFeatures />

      {/* LENDER TYPES */}
      <LASLenderTypes openLogin={openLogin} />

      {/* LEGAL DISCLAIMER SECTION */}
      <div className="bg-white px-2 py-4">
        <div className="max-w-[1440px] mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-700 text-center leading-relaxed">
            <strong className="text-black">Disclaimer:</strong> Infinity
            Arthvishva acts as a loan facilitator and connects borrowers with
            lending partners. Loan approval, interest rates, and terms are
            determined solely by the respective lender based on credit
            assessment.
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <FAQSection onApply={openLogin} />

      {/* CTA SECTION */}
      <CTASection />

      <ScrollToTop />
    </main>
  );
}
