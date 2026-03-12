"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

/* ---------------- FAQ DATA ---------------- */
const FAQ_DATA = [
  {
    q: "What is a Loan Against Securities (LAS)?",
    a: "Loan Against Securities allows you to borrow funds by pledging your existing investments such as mutual funds, shares, bonds, or insurance policies as collateral.",
  },
  {
    q: "Which securities can be pledged for LAS?",
    a: "You can pledge Mutual Funds, Listed Shares, Bonds, ETFs, Government Securities and select Life Insurance Policies.",
  },
  {
    q: "How much loan amount can I get?",
    a: "Loan amount depends on the market value of pledged securities. Typically lenders provide 50% to 80% of the value.",
  },
  {
    q: "What is the interest rate for Loan Against Securities?",
    a: "Interest rates usually start from around 9% p.a. depending on lender evaluation and security type.",
  },
  {
    q: "Do I lose ownership of my investments?",
    a: "No. You continue to hold ownership and receive dividends or benefits while securities are pledged.",
  },
  {
    q: "Is there any prepayment penalty?",
    a: "Most lenders do not charge prepayment or foreclosure penalties for LAS.",
  },
];

interface FAQSectionProps {
  onApply: () => void;
}

export default function FAQSection({ onApply }: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10">
          <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>

        {/* FAQ List */}
        <div className="space-y-4">

          {(showAllFaqs ? FAQ_DATA : FAQ_DATA.slice(0, 5)).map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl">

              {/* Question */}
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === idx ? null : idx)
                }
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                {faq.q}

                {expandedFaq === idx ? (
                  <Minus className="w-5 h-5 text-[#2076C7]" />
                ) : (
                  <Plus className="w-5 h-5 text-[#2076C7]" />
                )}
              </button>

              {/* Answer */}
              <AnimatePresence>
                {expandedFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}

        </div>

        {/* View More */}
        {FAQ_DATA.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              className="px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition"
            >
              {showAllFaqs ? "View Less" : "View More"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}