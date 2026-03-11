import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle } from "lucide-react";
import corpPng from "./corp.png";

interface CorporateHeroProps {
  openQuote: () => void;
}

export const CorporateHero: React.FC<CorporateHeroProps> = ({ openQuote }) => {
  return (
    <header className="relative w-full overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-16 md:pb-20 bg-white">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-5 sm:left-6 z-20 inline-flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 sm:border-gray-300 hover:bg-white shadow-sm hover:shadow-md active:scale-95 transition-all group"
      >
        <ArrowLeft
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          strokeWidth={2}
        />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* LEFT HERO TEXT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-50 border border-teal-200 text-teal-700 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
              Comprehensive Business Protection
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-sans"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Protect your business with confidence.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Comprehensive insurance solutions for modern Indian businesses.
              Protect your employees, assets, and operations with coverage from
              top-rated insurers.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full"
            >
              <button
                onClick={() => openQuote()}
                className="group relative px-8 py-4 text-white font-bold rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgb(32,118,199,0.4)] hover:shadow-[0_15px_30px_-5px_rgb(28,173,163,0.5)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#1CADA3] to-[#2076C7]"></span>
                <span className="relative z-10">Get Quote</span>
              </button>

              <Link href="#products">
                <button className="group relative bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 px-8 py-4 rounded-lg font-semibold text-lg border border-[#2076C7]/30 text-[#2076C7] hover:from-[#2076C7]/20 hover:to-[#1CADA3]/20 transform hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Products
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 pt-4 text-sm text-slate-600 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" /> IRDAI
                Approved & Secure
              </div>
            </motion.div>
          </div>
          {/* RIGHT HERO GRAPHIC */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative">
            <div className="relative w-full max-w-[650px] h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
              <Image
                src={corpPng}
                alt="Corporate Insurance"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
