"use client";
import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';

export default function FireFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What items can be covered under fire insurance?",
            answer: "Fire insurance covers buildings, plant & machinery, furniture, fixtures, fittings, and stocks (raw materials, semi-finished, and finished goods). Personal effects and certain valuables like curios may require special declarations."
        },
        {
            question: "Does fire insurance cover earthquake or flood damage?",
            answer: "Yes, our Standard Fire and Special Perils policy includes coverage for natural calamities like earthquakes, storms, cyclones, floods, and landslides as standard perils."
        },
        {
            question: "How is the sum insured calculated for property?",
            answer: "The sum insured can be calculated on a 'Market Value' basis (considering depreciation) or 'Reinstatement Value' basis (cost to replace with a new asset). We recommend Reinstatement Value for buildings and machinery to ensure full financial recovery."
        },
        {
            question: "What happens if I don't insure for the full value?",
            answer: "This is called 'Under-insurance'. If the actual value of the property is higher than the sum insured at the time of a loss, the claim amount will be reduced proportionately. It is crucial to maintain accurate valuations."
        },
        {
            question: "Can I add terrorism coverage to my policy?",
            answer: "Absolutely. Terrorism coverage is a common add-on that protects your assets from damage caused by terrorist acts. It can be easily integrated into your standard fire policy for a marginal additional premium."
        },
        {
            question: "How long does it take to settle a fire insurance claim?",
            answer: "While complex fire claims involve survey and assessment, our digital-first approach aims for initial approval within 7-10 working days of document submission. We provide interim payments for high-value industrial losses to maintain business continuity."
        }
    ];

    return (
       <section className="py-16 md:py-24 bg-[#f8fbff] font-sans overflow-hidden flex justify-center">
  <div className="w-full max-w-5xl px-6 relative">

    {/* Header */}
    <div className="text-center mb-16 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2076C7] flex items-center justify-center mb-6 shadow-sm">
        <HelpCircle size={28} strokeWidth={1.5} />
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
        Common Questions
      </h2>

      <p className="text-gray-600 font-medium max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
        Everything you need to know about protecting your assets with our
        Fire & Special Perils insurance.
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-5">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className={`rounded-2xl md:rounded-3xl border transition-all duration-300 ${
            openIndex === idx
              ? "bg-gradient-to-br from-[#f8fbff] to-white border-[#2076C7]/20 shadow-lg shadow-blue-500/5"
              : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
          }`}
        >
          <button
            onClick={() =>
              setOpenIndex(openIndex === idx ? null : idx)
            }
            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
          >
            <span
              className={`text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight transition-colors ${
                openIndex === idx
                  ? "text-[#1CADA3]"
                  : "text-[#2076C7]"
              }`}
            >
              {faq.question}
            </span>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                openIndex === idx
                  ? "bg-[#2076C7] text-white rotate-180"
                  : "bg-gray-50 text-slate-400 hover:bg-gray-100"
              }`}
            >
              <ChevronDown size={18} />
            </div>
          </button>

          {/* Answer */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              openIndex === idx
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 md:px-8 pb-8">
              <div className="w-full h-[1px] bg-gray-100 mb-6"></div>
              <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
    );
}
