"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const fireInsuranceFaqs = [
  {
    question: "What is Fire Insurance?",
    answer:
      "Fire insurance is a type of property insurance that provides financial protection against loss or damage caused by fire. It helps cover buildings, furniture, stock, machinery, and other assets damaged due to accidental fire incidents."
  },
  {
    question: "What does Fire Insurance typically cover?",
    answer:
      "Fire insurance generally covers damage caused by fire, lightning, explosion, aircraft damage, riots, storms, floods, landslides, and impact damage. It can also cover buildings, machinery, stock, furniture, and business equipment depending on the policy."
  },
  {
    question: "Who should buy Fire Insurance?",
    answer:
      "Fire insurance is recommended for homeowners, shop owners, factories, warehouses, offices, and businesses that want to protect their property, inventory, and equipment from fire-related risks."
  },
  {
    question: "What is not covered under Fire Insurance?",
    answer:
      "Most fire insurance policies do not cover damage caused by war, nuclear risks, intentional fire, pollution, or electrical breakdown without fire. Theft or burglary is also usually excluded unless additional cover is purchased."
  },
  {
    question: "How is the Fire Insurance premium calculated?",
    answer:
      "The premium depends on factors such as the value of the property, location, type of construction, fire safety systems, and the total sum insured. Higher risk properties usually have higher premiums."
  },
  {
    question: "What documents are required to file a Fire Insurance claim?",
    answer:
      "You generally need the insurance policy document, claim form, fire brigade report, FIR (if required), photographs of damage, and proof of ownership or purchase bills for the damaged property."
  },
  {
    question: "How does the Fire Insurance claim process work?",
    answer:
      "In case of fire damage, you must immediately inform the insurer, secure the premises, and submit a claim form with supporting documents. The insurance company appoints a surveyor to inspect the damage before approving the claim."
  },
  {
    question: "How long does Fire Insurance claim settlement take?",
    answer:
      "After verification and survey, most fire insurance claims are settled within 15–30 working days depending on the insurer and complexity of the claim."
  },
  {
    question: "Can businesses insure machinery and stock under Fire Insurance?",
    answer:
      "Yes, fire insurance policies can cover buildings, plant and machinery, stock, furniture, fixtures, and other assets used in business operations."
  },
  {
    question: "Why is Fire Insurance important for businesses?",
    answer:
      "Fire incidents can cause massive financial losses to property and business assets. Fire insurance helps businesses recover financially and continue operations after unexpected fire accidents."
  }
];

const FireInsuranceFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-10 py-10 md:py-16">

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Frequently Asked Questions
          </h2>

          <div
            className="w-24 h-1 mx-auto rounded-full mb-4"
            style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
          ></div>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Got questions about fire insurance? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {(showAllFaqs ? fireInsuranceFaqs : fireInsuranceFaqs.slice(0, 5)).map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
              >
                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>

                <div
                  className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${activeIndex === idx ? "rotate-180" : ""
                    }`}
                >
                  {activeIndex === idx ? (
                    <Minus size={18} strokeWidth={3} />
                  ) : (
                    <Plus size={18} strokeWidth={3} />
                  )}
                </div>
              </button>

              {activeIndex === idx && (
                <div className="px-6 py-3 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {fireInsuranceFaqs.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
            >
              {showAllFaqs ? "View Less" : "View More"}

              <Plus
                size={18}
                className={`transition-transform duration-300 ${showAllFaqs ? "rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FireInsuranceFAQ;