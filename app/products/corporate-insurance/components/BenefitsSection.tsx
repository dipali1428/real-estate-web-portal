import React from "react";
import { motion } from "framer-motion";
import { BENEFITS } from "./data";

export const BenefitsSection: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div
        className="relative bg-white rounded-2xl p-8 md:p-12 border border-gray-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Benefits
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal">
            Why choose our corporate insurance solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <benefit.icon className="text-white w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
