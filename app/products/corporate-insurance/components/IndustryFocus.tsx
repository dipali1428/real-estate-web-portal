import React from "react";
import { motion } from "framer-motion";
import { INDUSTRIES } from "./data";

export const IndustryFocus: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Industries We Serve
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {INDUSTRIES.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-2xl transition-all duration-300 border border-slate-100/80 group flex flex-col items-center text-center h-full hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 2px 8px rgba(28,173,163,0.06), 0 8px 24px rgba(28,173,163,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div className="w-14 h-14 bg-[#1CADA3]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <industry.icon className="text-[#1CADA3] w-7 h-7" />
              </div>
              <h3 className="font-bold text-2xl text-[#1CADA3] mb-3">
                {industry.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-xs mx-auto">
                {industry.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
