"use client";
import React from "react";
import FAQSection from "./components/FAQSection";
import ScrollToTop from "../../component/ScrollToTop";
import { useModal } from "../../context/ModalContext";
import CTASection from "../../component/CTASection";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
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
  const router = useRouter();
  const handleBackHome = () => router.push('/');

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">

      {/* Fixed Back to Home Button */}
      <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
        {/* Mobile: icon only */}
        <button
          onClick={handleBackHome}
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </button>
      </div>

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