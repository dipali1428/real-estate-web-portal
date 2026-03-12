import React from "react";
import { motion } from "framer-motion";
import { CLAIMS_FEATURES } from "./data";

export const ClaimsAssistance: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div
        className="relative bg-white rounded-2xl p-8 md:p-12 border border-gray-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-[#2076C7] text-sm font-bold mb-4 border border-blue-200/50">
            Claims Assistance
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 font-sans leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Seamless Claims Experience
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
            We don't just sell policies; we settle claims. Our dedicated team
            ensures you get what you were promised.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {CLAIMS_FEATURES.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full group"
            >
              <div
                className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300`}
              >
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-xl leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
