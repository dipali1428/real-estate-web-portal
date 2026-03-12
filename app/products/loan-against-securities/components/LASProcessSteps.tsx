"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconAward } from "@tabler/icons-react";
import { PROCESS_STEPS } from "./data";

export const LASProcessSteps: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-blue-50 shadow-[0_40px_100px_-20px_rgba(32,118,199,0.1)] relative">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
              <IconAward size={14} />
              Efficient Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
              Digitized 5-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white border-2 border-blue-50 rounded-[2rem] flex items-center justify-center text-2xl font-black text-[#2076C7] mx-auto mb-8 shadow-sm group-hover:bg-gradient-to-br group-hover:from-[#2076C7] group-hover:to-[#1CADA3] group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative">
                  {item.step}
                  <div className="absolute -inset-2 bg-blue-100/20 rounded-[2.5rem] scale-0 group-hover:scale-100 transition-transform duration-500 z-[-1]" />
                </div>
                <h5 className="font-extrabold text-[#2076C7] mb-2 tracking-tight">
                  {item.title}
                </h5>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
