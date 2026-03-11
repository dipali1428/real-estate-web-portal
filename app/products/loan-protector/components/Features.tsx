import React from "react";
import { motion } from "framer-motion";
import { features } from "./data";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } },
};

export function Features() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="text-center mb-16 md:mb-20">
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Comprehensive Protection Features
          </span>
        </motion.h2>

        <motion.p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal">
          Explore the layers of protection we provide for your financial
          liabilities.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.div
              variants={cardHover}
              className="h-full bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 hover:border-[#1CADA3]/20 transition-all duration-300 group cursor-pointer text-center md:text-left"
              style={{
                boxShadow:
                  "0 2px 4px rgba(28,173,163,0.04), 0 8px 24px rgba(28,173,163,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${feat.bg} rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0`}
              >
                <feat.icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${feat.color}`}
                />
              </div>

              <h3 className="text-sm sm:text-base lg:text-xl font-medium text-slate-800 mb-1 sm:mb-2 lg:mb-3 group-hover:text-[#2076C7] transition-colors">
                {feat.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm hidden sm:block">
                {feat.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
