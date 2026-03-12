"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2 } from "lucide-react";
import { DOCUMENTS } from "./data";

export const DocumentsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Documents Required
            </span>
          </h2>
          <p className="text-slate-600 max-w-md sm:max-w-xl mx-auto font-normal text-sm sm:text-base md:text-lg leading-relaxed">
            Keep these documents handy to ensure a smooth and accelerated loan
            approval process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCUMENTS.map((docCategory, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#1FAD9F]/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center gap-3 p-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#0056D2] to-[#1FAD9F] text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Category
                  </p>
                  <h3 className="font-bold text-[#2076C7] text-sm">
                    {docCategory.category}
                  </h3>
                </div>
              </div>
              <div className="p-5 flex-1 space-y-3">
                {docCategory.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
className="flex items-start gap-2 text-left"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1FAD9F] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
