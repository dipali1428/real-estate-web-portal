"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconCheck,
  IconExternalLink,
  IconAward,
  IconBuildingBank,
  IconBriefcase,
  IconSearch,
} from "@tabler/icons-react";
import { LENDER_TYPES } from "./data";

interface LASLenderTypesProps {
  openLogin: () => void;
}

export const LASLenderTypes: React.FC<LASLenderTypesProps> = ({
  openLogin,
}) => {
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
            Lending Network
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
            Types of Lending Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            We connect investors with a wide network of trusted lending
            institutions across India. Lender allocation depends on eligibility
            and portfolio.
          </p>
        </motion.div>

        {/* Lender Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LENDER_TYPES.map((lender, idx) => {
            const iconMap: Record<string, any> = {
              "Public Sector Banks": IconBuildingBank,
              "Private Sector Banks": IconBuildingBank,
              "NBFC Lenders": IconBriefcase,
              "Specialized Lenders": IconSearch,
            };
            const Icon = iconMap[lender.name] || IconBuildingBank;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(32,118,199,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group"
              >
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                    <Icon size={32} strokeWidth={1.8} className="text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#2076C7] tracking-tight leading-tight px-2">
                    {lender.name}
                  </h3>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {lender.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="mt-1 bg-teal-50 rounded-full p-0.5">
                        <IconCheck
                          size={12}
                          strokeWidth={3}
                          className="text-[#1CADA3]"
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-500 leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={openLogin}
                  className="w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#2076C7] border border-[#2076C7]/20 hover:bg-[#2076C7] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-lg"
                >
                  Check Eligibility{" "}
                  <IconExternalLink
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
