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
  const { openSignup } = useModal();

  return (
    <div className="bg-white text-gray-800 font-sans selection:bg-[#2076C7]/10 selection:text-[#2076C7] relative w-full overflow-x-hidden">
      
      {/* HERO SECTION */}
      <SMEHero openSignup={openSignup} />

      {/* EMI CALCULATOR SECTION */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-slate-50/50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div
            className="relative bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-100 shadow-sm"
            style={{
              boxShadow:
                "0 2px 8px rgba(32,118,199,0.06), 0 8px 24px rgba(32,118,199,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <EMICalculator />
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <ProductSection openSignup={openSignup} />

      {/* LENDERS SECTION */}
      <LendersSection openSignup={openSignup} />

      {/* INDUSTRIES SECTION */}
      <IndustriesSection />

   

      {/* ELIGIBILITY SECTION */}
      <EligibilitySection />

      {/* DOCUMENTS SECTION */}
      <DocumentsSection />

      {/* LEGAL DISCLAIMER SECTION */}
      <section className="py-8 bg-slate-50 border-t border-slate-200/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-yellow-50 border border-yellow-200 shadow-sm p-6 rounded-xl max-w-4xl mx-auto">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              <strong className="text-black">Disclaimer:</strong> Infinity
              Arthvishva acts as a loan facilitator and connects borrowers with
              lending partners. Loan approval, interest rates, and terms are
              determined solely by the respective lender based on credit
              assessment.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      <CTASection onClick={openSignup} />
      <ScrollToTop />
      <Chatbot />
    </div>
  );
}
/* --- END: MAIN PAGE COMPONENT --- */
