"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SMEHeroProps {
  openSignup: () => void;
}

export const SMEHero: React.FC<SMEHeroProps> = ({ openSignup }) => {
  return (
    <div className="relative w-full overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-16 md:pb-20 bg-white">
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
      <div className="absolute inset-0 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-50 border border-teal-200 text-teal-700 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
              Empowering Indian SMEs
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-sans"
            >
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                Financing for Growth-Driven SMEs
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Fast, flexible, and secure business financing designed for your
              growth journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full"
            >
              <button
                onClick={openSignup}
                className="group relative text-white px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer w-full sm:w-auto"
                style={{
                  background: "linear-gradient(to right, #1CADA3, #2076C7)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enquire Online <ArrowRight className="w-5 h-5" />
                </span>
                <div
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  style={{
                    background: "linear-gradient(to right, #189B8D, #1A68B0)",
                  }}
                ></div>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border border-[#2076C7]/30 text-[#2076C7] hover:from-[#2076C7]/20 hover:to-[#1CADA3]/20 transform hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
                style={{ color: "#2076C7", borderColor: "#2076C7" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Products
                </span>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-slate-600 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Supported by
                Top Lenders
              </div>
            </motion.div>
          </div>

          {/* Hero Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[650px] h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
              <Image
                src="/loan/sme.jpeg"
                alt="SME Loans AI Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
