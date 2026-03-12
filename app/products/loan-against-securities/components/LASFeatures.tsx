"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconChartDots,
  IconClock,
  IconRefresh,
  IconAward,
} from "@tabler/icons-react";
import { FEATURES } from "./data";

export const LASFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
            <IconAward size={14} />
            Key Advantages
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
            Why Choose Loan Against Securities?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Retain your wealth while accessing the funds you need. Our LAS
            solution offers unmatched flexibility and speed.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const iconMap: Record<string, any> = {
              "Maintain Portfolio": IconChartDots,
              "Swift Disbursal": IconClock,
              "Flexible Repayment": IconRefresh,
            };
            const Icon = iconMap[feature.title] || IconChartDots;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(32,118,199,0.1)] hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center h-full"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-[#2076C7] group-hover:text-[#1CADA3] transition-colors"
                  />
                </div>
                <h4 className="text-xl font-extrabold text-[#2076C7] mb-4 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
