"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { LENDER_TYPES } from "./data";

interface LendersSectionProps {
  openLogin: () => void;
}

export const LendersSection: React.FC<LendersSectionProps> = ({
  openLogin,
}) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC] relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Types of Lending Partners
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-normal text-lg md:text-xl">
            We connect businesses with a wide network of trusted lending
            institutions across India. Lender allocation depends on eligibility,
            credit profile, and business requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {LENDER_TYPES.map((lender, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`${lender.color} p-6 rounded-2xl border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
            >
              <div className="flex flex-col items-center text-center mb-6 w-full">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center font-black shadow-sm mb-4">
                  {lender.icon}
                </div>
                <h3 className="font-extrabold text-xl text-[#2076C7] leading-tight">
                  {lender.name}
                </h3>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {lender.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
className="flex items-start gap-3 text-left"                  >
                    <CheckCircle2
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${idx % 2 === 0 ? "text-[#0056D2]" : "text-[#1FAD9F]"}`}
                    />
                    <span className="font-medium text-slate-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full pt-4 border-t border-black/5">
                <button
                  onClick={openLogin}
                  className={`w-full py-3 bg-white rounded-lg text-sm font-bold border transition-all flex items-center justify-center gap-2 group/btn cursor-pointer ${lender.buttonColor}`}
                >
                  Enquire Now
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
