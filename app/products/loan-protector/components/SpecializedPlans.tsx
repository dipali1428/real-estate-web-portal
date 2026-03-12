"use client";

import React, { useState } from "react"; // Added useState
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, ArrowUp } from "lucide-react";
import { PLAN_TYPES } from "./data";
import { useModal } from "../../../context/ModalContext";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function SpecializedPlans({
  setPlanType,
}: {
  setPlanType: (val: string) => void;
}) {
  const { openLogin } = useModal();
  // State to track if we are showing all 5 plans
  const [showAll, setShowAll] = useState(false);

  // Show only 3 initially, then all 5
  const visiblePlans = showAll ? PLAN_TYPES : PLAN_TYPES.slice(0, 3);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-8 sm:py-12"
    >
      <div className="text-center mb-16 md:mb-20">
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Our Specialized Loan Protection Plans
          </span>
        </motion.h2>

        <motion.p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
          Choose the protection plan that perfectly matches your borrowing
          profile.
        </motion.p>
      </div>

      <motion.div 
        layout // Smooth grid expansion
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
      >
        <AnimatePresence mode="popLayout">
          {visiblePlans.map((plan, idx) => (
            <motion.div
              key={plan.title} // Use title as key for stable animations
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div
                className="relative h-full bg-white p-8 rounded-3xl border border-gray-100/80 transition-all duration-300 flex flex-col items-center text-center"
                style={{
                  boxShadow:
                    "0 2px 4px rgba(28,173,163,0.04), 0 8px 24px rgba(28,173,163,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${plan.bg} ${plan.color} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}
                >
                  <plan.icon size={32} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#2076C7] transition-colors">
                  {plan.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6 font-light line-clamp-3">
                  {plan.desc}
                </p>

                <div className="mt-auto w-full pt-6 border-t border-slate-50 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setPlanType(plan.title);
                      document
                        .getElementById("calculator")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-blue-50 hover:text-[#2076C7] transition-all flex items-center justify-center gap-2"
                  >
                    View in Calculator
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={openLogin}
                    className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Get Instant Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- TOGGLE BUTTON --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex justify-center"
      >
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex items-center gap-3 px-10 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-[#2076C7] hover:border-[#2076C7]/40 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          {showAll ? (
            <>
              Show Fewer Plans
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </>
          ) : (
            <>
              View All Protection Plans
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </motion.div>
    </motion.section>
  );
}