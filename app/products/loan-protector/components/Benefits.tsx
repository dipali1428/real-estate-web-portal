import React from "react";
import { motion } from "framer-motion";
import { benefits } from "./data";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } },
};

export function Benefits() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="text-center mb-16 md:mb-20">
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            The Benefits of Secure Financing
          </span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.div
              variants={cardHover}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100/80 text-center h-full flex flex-col items-center"
              style={{
                boxShadow:
                  "0 2px 4px rgba(32,118,199,0.04), 0 8px 24px rgba(32,118,199,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#2076C7]" />
              </div>

              <h4 className="text-base sm:text-lg lg:text-xl font-medium text-slate-800 mb-3">
                {benefit.title}
              </h4>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
