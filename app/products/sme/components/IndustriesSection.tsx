"use client";
import React from "react";
import { motion } from "framer-motion";
import { INDUSTRIES_SERVED } from "./data";

export const IndustriesSection = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Industries We Serve
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {INDUSTRIES_SERVED.map((industry: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col items-center text-center h-full"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <industry.icon className="text-[#0056D2] w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-xl text-[#2076C7] mb-3 font-sans">
                {industry.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto font-normal">
                {industry.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
