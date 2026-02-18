"use client";

import { motion } from "framer-motion";

export default function BondsHero() {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10 opacity-30" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-teal-50 to-transparent -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="leading-[1.1] mb-8 tracking-tight font-sans px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block mb-3 text-[#2076C7] font-bold text-2xl sm:text-3xl md:text-5xl">
              Invest in High-Quality
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] font-black text-3xl sm:text-4xl md:text-7xl drop-shadow-sm">
              Corporate Bonds
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Secure stable returns with fixed income opportunities. Explore premium bond investments
            curated by <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3] font-black">Infinity Arthvishva</span>.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          >
            <button className="bg-[#2076C7] hover:bg-[#1CADA3] transition-all duration-300 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200/50 text-lg group overflow-hidden relative">
              <span className="relative z-10">Explore Available Bonds</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="bg-white border-2 border-gray-100 hover:border-[#2076C7] hover:text-[#2076C7] transition-all duration-300 text-gray-700 px-10 py-4 rounded-2xl font-semibold text-lg">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
