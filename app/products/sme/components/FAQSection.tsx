"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "./data";

export const FAQSection = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <motion.section
      id="Frequently Asked Questions"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC] border-t border-[#1FAD9F]/10 px-4 md:px-0"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans leading-tight bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {(showAll ? FAQ : FAQ.slice(0, 5)).map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#1FAD9F]/30 hover:shadow-md"
            >
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-start gap-3 bg-gray-50 hover:bg-teal-50/50 transition-colors focus:outline-none cursor-pointer group"
                aria-expanded={expandedIdx === idx}
              >
                <span className="font-bold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#1FAD9F] transition-colors">
                  {faq.q}
                </span>
                <div
                  className={`p-1.5 rounded-full bg-white border border-gray-300 text-gray-700 transition-transform duration-300 ${expandedIdx === idx ? "rotate-180" : ""}`}
                >
                  {expandedIdx === idx ? (
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} />
                  ) : (
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} />
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
                    <div className="px-4 sm:px-6 py-4 bg-white text-gray-600 text-base leading-relaxed border-t border-gray-100 font-normal">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {FAQ.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-[#2076C7] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
            >
              {showAll ? "View Less" : "View More"}
              <Plus
                size={18}
                className={`transition-transform duration-300 ${showAll ? "rotate-45" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};
