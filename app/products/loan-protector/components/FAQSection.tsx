import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "./data";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function FAQSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="bg-white font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Frequently Asked Questions
              </span>
            </motion.h2>
          </div>

          <div className="space-y-4">
            {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md"
              >
                <button
                  onClick={() =>
                    setExpandedIdx(expandedIdx === idx ? null : idx)
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-blue-50/50 transition-colors focus:outline-none cursor-pointer group"
                >
                  <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-blue-600 transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${expandedIdx === idx ? "rotate-180" : ""}`}
                  >
                    {expandedIdx === idx ? (
                      <Minus size={18} strokeWidth={3} />
                    ) : (
                      <Plus size={18} strokeWidth={3} />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {expandedIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 animate-fadeIn">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {faqs.length > 5 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {showAllFaqs ? "View Less" : "View More"}
                <Plus
                  size={18}
                  className={`transition-transform duration-300 ${showAllFaqs ? "rotate-45" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
