"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconCheck,
  IconArrowRight,
  IconAward,
  IconBuildingBank,
  IconTrendingUp,
} from "@tabler/icons-react";
import { COMMERCIAL_PRODUCTS, GOVT_SCHEMES } from "./data";

interface ProductSectionProps {
  openLogin: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  openLogin,
}) => {
  const [activeTab, setActiveTab] = useState<"commercial" | "govt">(
    "commercial",
  );

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
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
            SME Loan Suites
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
            Powering Your Business Ambitions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Precision-engineered financial products designed to scale with your
            business. Choose the path that fits your growth.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 w-full max-w-md shadow-inner">
            <button
              onClick={() => setActiveTab("commercial")}
              className={`flex-1 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "commercial"
                  ? "bg-white text-[#2076C7] shadow-lg scale-[1.02]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Commercial
            </button>
            <button
              onClick={() => setActiveTab("govt")}
              className={`flex-1 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "govt"
                  ? "bg-white text-[#1CADA3] shadow-lg scale-[1.02]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Govt. Schemes
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(activeTab === "commercial"
            ? COMMERCIAL_PRODUCTS
            : GOVT_SCHEMES
          ).map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-[2.5rem] border border-blue-100 bg-white p-10 pb-28 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[1.25rem] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {/* Icons are lucide in data.tsx, we should ideally use tabler for consistency but for now we keep the dynamic icon */}
                    {product.icon}
                  </div>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Product Category
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
                    Tenure Range
                  </span>
                  <span className="text-sm font-extrabold text-[#1CADA3] bg-[#1CADA3]/5 px-3 py-1 rounded-full">
                    {product.tenure}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-10">
                {product.features.map((f, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-3 text-sm font-bold text-slate-600"
                  >
                    <div className="mt-1 w-4 h-4 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <IconCheck
                        size={10}
                        className="text-[#1CADA3]"
                        strokeWidth={4}
                      />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={openLogin}
                className="absolute bottom-10 left-10 right-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
                style={{
                  background: "linear-gradient(to right, #1CADA3, #2076C7)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Apply Now
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};
