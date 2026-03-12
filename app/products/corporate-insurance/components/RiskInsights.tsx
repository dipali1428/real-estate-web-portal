import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { DID_YOU_KNOW } from "./data";

export const RiskInsights: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#1CADA3]/10 text-[#1CADA3] mb-4 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            Insider Facts
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Did You Know?
            </span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            Surprising statistics and essential facts about the corporate
            insurance landscape in India today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DID_YOU_KNOW.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white p-8 rounded-3xl border border-white/50 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-5px_rgba(32,118,199,0.1)] transition-all flex flex-col items-center text-center gap-6 relative group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />

              <div
                className={`w-16 h-16 ${
                  idx % 2 === 0 ? "bg-[#1CADA3]/10" : "bg-[#2076C7]/10"
                } rounded-2xl flex items-center justify-center relative shadow-sm`}
              >
                <item.icon
                  className={`w-8 h-8 ${
                    idx % 2 === 0 ? "text-[#1CADA3]" : "text-[#2076C7]"
                  }`}
                />
              </div>

              <div className="space-y-3 relative">
                <h4 className="font-bold text-xl text-slate-800 leading-tight">
                  {item.fact}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
