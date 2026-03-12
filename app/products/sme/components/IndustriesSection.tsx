"use client";

import React, { useState } from "react"; // Added useState
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react"; // Added icons
import { INDUSTRIES_SERVED } from "./data";

export const IndustriesSection = () => {
  // State to handle show more/less logic
  const [showAll, setShowAll] = useState(false);

  // Show only 3 initially, then show all
  const displayedIndustries = showAll 
    ? INDUSTRIES_SERVED 
    : INDUSTRIES_SERVED.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Industries We Serve
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Providing tailored financial protection across diverse sectors.
          </p>
        </div>

        <motion.div 
          layout // Smoothly animate grid items repositioning
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {displayedIndustries.map((industry: any, index: number) => (
              <motion.div
                key={industry.title} // Using title for stable animation
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl hover:shadow-[0_20px_50px_rgba(32,118,199,0.1)] transition-all duration-300 border border-slate-100 group flex flex-col items-center text-center h-full"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <industry.icon className="text-[#2076C7] w-8 h-8" />
                </div>
                
                <h3 className="font-extrabold text-xl text-[#2076C7] mb-3 font-sans group-hover:text-[#1CADA3] transition-colors">
                  {industry.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto font-normal">
                  {industry.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- VIEW ALL BUTTON --- */}
        {INDUSTRIES_SERVED.length > 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-3 px-10 py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold text-[#2076C7] hover:border-[#2076C7]/40 hover:bg-slate-100 transition-all shadow-sm active:scale-95"
            >
              {showAll ? (
                <>
                  Show Fewer Industries
                  <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  View All Industries
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};