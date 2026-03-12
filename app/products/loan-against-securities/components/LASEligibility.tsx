"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconUsers,
  IconBriefcase,
  IconShieldCheck,
  IconCircleCheck,
  IconAward,
} from "@tabler/icons-react";
import { ELIGIBILITY_ITEMS } from "./data";

export const LASEligibility: React.FC = () => {
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
            Who Can Apply
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
            Eligibility Criteria
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Check if you qualify for a Loan Against Securities in just a few
            simple steps.
          </p>
        </motion.div>

        {/* Eligibility Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ELIGIBILITY_ITEMS.map((item, idx) => {
            const iconMap: Record<string, any> = {
              "Resident Indian": IconUsers,
              "Eligible Securities": IconBriefcase,
              "Valid PAN & KYC": IconShieldCheck,
              "Age 18+": IconCircleCheck,
            };
            const Icon = iconMap[item.title] || IconCircleCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(32,118,199,0.08)] hover:-translate-y-2 transition-all duration-500 text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-50/50 to-teal-50/50 rounded-2xl flex items-center justify-center text-[#2076C7] mb-6 group-hover:scale-110 transition-transform border border-blue-50">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="font-extrabold text-[#2076C7] text-lg mb-2 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
