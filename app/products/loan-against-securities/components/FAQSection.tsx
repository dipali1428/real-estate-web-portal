"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

/* ---------------- FAQ DATA ---------------- */
const FAQ_DATA = [
  {
    q: "What is a Loan Against Securities (LAS)?",
    a: "Loan Against Securities allows you to borrow funds by pledging your existing investments such as mutual funds, shares, bonds, or insurance policies as collateral. You continue to retain ownership of your investments while accessing liquidity.",
  },
  {
    q: "Which securities can be pledged for LAS?",
    a: "You can pledge Mutual Funds, Listed Shares (Equity), Bonds and Debentures, Exchange Traded Funds (ETFs), Government Securities, and select Life Insurance Policies. Approval depends on lender eligibility criteria.",
  },
  {
    q: "How much loan amount can I get?",
    a: "You can get a loan up to ₹5 Crores or more, depending on the market value of your securities, type of securities, lender policies, and margin requirements. Typically, lenders offer 50% to 80% of the security value.",
  },
  {
    q: "What is the interest rate for Loan Against Securities?",
    a: "Interest rates usually start from 9% p.a. and may vary up to 12% p.a. depending on security type, loan amount, credit profile, and lender terms. Final rates are confirmed after evaluation.",
  },
  {
    q: "Do I lose ownership of my investments?",
    a: "No. Your securities remain in your demat account and are only pledged. You continue to receive dividends, bonuses, and benefits associated with your investments.",
  },
];

interface FAQSectionProps {
  onApply: () => void;
}

export default function FAQSection({ onApply }: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">
              <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need to know about Loan Against Securities.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left group cursor-pointer"
                >
                  <span className="font-bold text-[#2076C7] text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2076C7] flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2.5rem] p-10 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black mb-8">
                Ready to Unlock Your Capital?
              </h3>
              <button
                onClick={onApply}
                className="px-10 py-5 bg-white text-[#2076C7] hover:text-[#1CADA3] rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center gap-2 mx-auto uppercase tracking-wider"
              >
                Apply Now <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-slate-50 border-t border-slate-200/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-slate-700">Disclaimer:</strong> Infinity
            Arthvishva is a facilitator. Loan approval and terms are subject to
            the lender&apos;s credit policy.
          </p>
        </div>
      </section>
    </>
  );
}
