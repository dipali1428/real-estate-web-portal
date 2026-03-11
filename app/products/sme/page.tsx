"use client";
import React from "react";
import CTASection from "../../component/CTASection";
import { useModal } from "../../context/ModalContext";
import Chatbot from "../../component/chatbot/page";
import ScrollToTop from "../../component/ScrollToTop";

// Modular Components
import { SMEHero } from "./components/SMEHero";
import { EMICalculator } from "./components/EmiCalculator";
import { ProductSection } from "./components/ProductSection";
import { LendersSection } from "./components/LendersSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { EligibilitySection } from "./components/EligibilitySection";
import { DocumentsSection } from "./components/DocumentsSection";
import { FAQSection } from "./components/FAQSection";

export default function SMELoansPage() {
  const { openLogin } = useModal();

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
      {/* HERO SECTION */}
      <SMEHero openLogin={openLogin} />

      {/* PRODUCT SECTION */}
      <ProductSection openLogin={openLogin} />

      {/* EMI CALCULATOR SECTION */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden">
            <EMICalculator />
          </div>
        </div>
      </section>

      {/* LENDERS SECTION */}
      <LendersSection openLogin={openLogin} />

      {/* INDUSTRIES SECTION */}
      <IndustriesSection />

      {/* ELIGIBILITY SECTION */}
      <EligibilitySection />

      {/* DOCUMENTS SECTION */}
      <DocumentsSection />

      {/* LEGAL DISCLAIMER SECTION */}
      <div className="bg-white px-2 py-12">
        <div className="max-w-[1440px] mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-8 shadow-sm">
          <p className="text-sm text-gray-700 text-center leading-relaxed font-medium">
            <strong className="text-black font-black">Disclaimer:</strong>{" "}
            Infinity Arthvishva acts as a loan facilitator and connects
            borrowers with lending partners. Loan approval, interest rates, and
            terms are determined solely by the respective lender based on credit
            assessment. Final terms may change based on lender policies and
            applicant profile.
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <FAQSection />

      <CTASection />
      <ScrollToTop />
      <Chatbot />
    </main>
  );
}
/* --- END: MAIN PAGE COMPONENT --- */
