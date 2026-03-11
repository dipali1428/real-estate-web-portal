"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { COMMERCIAL_PRODUCTS, GOVT_SCHEMES } from "./data";

interface ProductSectionProps {
  openSignup: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  openSignup,
}) => {
  const [activeTab, setActiveTab] = useState<"commercial" | "govt">(
    "commercial",
  );

  return (
    <section
      id="products"
      className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FCFC]"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1350px]">
        <div className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Customized SME Products
            </span>
          </h2>
          <p className="text-slate-600 max-w-md sm:max-w-xl mx-auto font-normal text-sm sm:text-base md:text-lg leading-relaxed">
            Explore our range of commercial loan products and government-backed
            schemes designed to fuel your business growth.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 w-full max-w-full overflow-hidden">
            <button
              onClick={() => setActiveTab("commercial")}
              className={`flex-1 min-w-0 px-2 sm:px-4 py-3 rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wide transition-all ${
                activeTab === "commercial"
                  ? "bg-white text-[#0056D2] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Commercial Loans
            </button>
            <button
              onClick={() => setActiveTab("govt")}
              className={`flex-1 min-w-0 px-2 sm:px-4 py-3 rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wide transition-all ${
                activeTab === "govt"
                  ? "bg-white text-[#1FAD9F] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Government Schemes
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1200px]"
          >
            {(activeTab === "commercial"
              ? COMMERCIAL_PRODUCTS
              : GOVT_SCHEMES
            ).map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="w-full"
              >
                <div className="bg-white rounded-xl border border-slate-200 hover:border-[#1FAD9F]/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden text-sm sm:text-base">
                  <div className="p-5 border-b border-slate-100 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] text-white shadow-sm">
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2076C7] text-sm leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {product.rate}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="space-y-2">
                      {product.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center justify-center gap-2 text-center"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#1FAD9F]" />
                          <span className="text-xs text-slate-600 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                      <span className="block font-semibold text-[#1FAD9F]">
                        {product.tenure}
                      </span>
                      tenure
                    </div>
                    <button
                      onClick={openSignup}
                      className="text-xs font-bold text-[#0056D2] flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                    >
                      Apply
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
