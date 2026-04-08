"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import { PRODUCTS } from "@/app/products/corporate-insurance/components/data";

export default function CorporateInsuranceSection({ activeTab }: { activeTab: "medical" | "accident-wc" }) {
  const products = PRODUCTS.filter(p => {
    if (activeTab === "medical") return ["Health", "Life"].includes(p.category);
    return ["Accident", "Liability", "Property", "Cyber"].includes(p.category);
  });

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans ${products.length <= 3 ? "max-w-6xl mx-auto" : "xl:grid-cols-4"}`}>
      {products.map((plan, i) => {
        const Icon = plan.icon;

        return (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-[2rem] border border-slate-200 bg-white p-5 md:p-6 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Icon & Category */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <Icon
                  size={24}
                  className="text-white"
                  strokeWidth={1.8}
                />
              </div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {plan.category}
              </div>
              <h3 className="text-lg font-extrabold text-gray-800 mb-2 tracking-tight">
                {plan.title}
              </h3>
              <p className="text-xs text-slate-500 font-bold mb-6 line-clamp-3 leading-relaxed">
                {plan.desc}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-6 mt-auto">
              <div className="flex justify-between items-center py-2 border-b border-black/5">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Coverage</span>
                <span className="text-xs font-extrabold text-[#2076C7] text-right ml-4">{plan.coverage}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-black/5">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Network</span>
                <span className="text-xs font-extrabold text-slate-700 text-right ml-4">{plan.network}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Premium</span>
                <span className="text-xs font-extrabold text-slate-700 text-right ml-4">{plan.premium}</span>
              </div>
            </div>

            {/* Features (Wait Period & Claim Ratio) */}
            <ul className="space-y-2 pt-4 border-t border-slate-100">
                <li className="flex items-start gap-2 text-sm font-bold text-slate-600">
                  <IconCheck size={14} className="text-teal-500 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>Waiting Period: {plan.waiting}</span>
                </li>
                <li className="flex items-start gap-2 text-sm font-bold text-slate-600">
                  <IconCheck size={14} className="text-teal-500 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>Claim Rating: {plan.claimRatio}</span>
                </li>
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}