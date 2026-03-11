import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { coverage } from "./data";

export function Coverage() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-linear-to-b from-gray-50 to-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="w-full lg:w-5/12 text-center lg:text-left">
          <motion.span className="text-[#2076C7] font-medium tracking-wider text-sm uppercase mb-2 block">
            Coverage Details
          </motion.span>

          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              What's Covered Under Loan Protection?
            </span>
          </motion.h2>

          <motion.p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal">
            We ensure a wide safety net so your family remains unburdened from
            debt in difficult times.
          </motion.p>
        </div>

        <div className="w-full lg:w-6/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coverage.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white p-4 rounded-xl border border-blue-50 shadow-sm"
            >
              <CheckCircle className="text-[#2076C7] w-5 h-5 flex-shrink-0" />

              <span className="text-sm sm:text-base font-medium text-slate-700">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
