"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconAward,
  IconTrendingUp,
  IconChartLine,
  IconShieldCheck,
  IconBriefcase,
  IconChartPie,
  IconBuildingBank,
} from "@tabler/icons-react";
import { LAS_PRODUCTS } from "./data";

interface LASProductGridProps {
  openLogin: () => void;
}

export const LASProductGrid: React.FC<LASProductGridProps> = ({
  openLogin,
}) => {
  return (
    <section
      id="products"
      className="py-24 bg-white relative overflow-hidden font-sans"
    >
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
            LAS Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
            Loan Against Securities Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Get competitive rates and instant liquidity without selling your
            investments. Choose from our diverse range of LAS products.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LAS_PRODUCTS.map((product, idx) => {
            // Map icons to Tabler if possible, or use the one from data
            const iconMap: Record<string, any> = {
              "Mutual Funds": IconTrendingUp,
              "Shares (Equity)": IconChartLine,
              "Insurance Policies": IconShieldCheck,
              Bonds: IconBriefcase,
              ETFs: IconChartPie,
              "Govt Securities": IconBuildingBank,
            };
            const Icon = iconMap[product.title] || product.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-[2.5rem] border border-blue-100 bg-white p-10 pb-28 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group ${product.popular ? "ring-2 ring-[#2076C7]/30 shadow-xl" : ""}`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow">
                    Most Popular
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[1.25rem] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={32} strokeWidth={1.8} className="text-white" />
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Asset Class
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#2076C7] mb-4 tracking-tight leading-tight">
                    {product.title}
                  </h3>
                </div>

                <p className="text-sm font-medium text-slate-500 text-center mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-3 mb-8 border-t border-slate-100 pt-6">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Interest Rate
                    </span>
                    <span className="text-sm font-extrabold text-[#1CADA3] bg-[#1CADA3]/5 px-3 py-1 rounded-full">
                      {product.rate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Max LTV
                    </span>
                    <span className="text-sm font-extrabold text-[#2076C7] bg-[#2076C7]/5 px-3 py-1 rounded-full">
                      {product.ltv}
                    </span>
                  </div>
                </div>

                <button
                  onClick={openLogin}
                  className="absolute bottom-10 left-10 right-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
                  style={{
                    background: "linear-gradient(to right, #1CADA3, #2076C7)",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Enquire Now
                    <IconArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                      strokeWidth={3}
                    />
                  </span>
                  <div
                    className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                    style={{
                      background: "linear-gradient(to right, #189B8D, #1A68B0)",
                    }}
                  ></div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
