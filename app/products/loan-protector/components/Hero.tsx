"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Lock, ShieldCheck } from "lucide-react";
import { useModal } from "../../../context/ModalContext";

export function Hero() {
  const { openLogin } = useModal();

  return (
    <header className="relative w-full bg-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      
      {/* Back Button - Positioned to match Corporate style exactly */}
      <div className="absolute top-6 left-6 lg:top-10 lg:left-12 z-30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-all group"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            strokeWidth={2}
          />
          <span>Back to Home</span>
        </Link>
      </div>



      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">
          
          {/* LEFT CONTENT - Spans 7 columns to prevent text crowding */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-blue-50 border border-blue-100 text-[#2076C7]"
            >
              <ShieldCheck size={14} className="animate-pulse" />
              IRDAI-Approved Loan Protection
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-extrabold leading-[1.1] tracking-tight"
            >
              <span className="block bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                Protect Your Debt.
              </span>
              <span className="text-[#2076C7]">
                Secure Your Family.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed"
            >
              Ensure your family never inherits your liabilities. Loan Protector
              Insurance automatically clears your home, car, or business loans
              in unforeseen events.
            </motion.p>

            {/* CTA Container - Matched button sizing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center lg:justify-start"
            >
              <button
                onClick={openLogin}
                className="group relative px-10 py-5 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden min-w-[200px]"
                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center justify-center gap-2 text-xl">
                  Get Quote
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <div className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest pl-2">
                <Lock className="w-4 h-4 text-[#1CADA3]" /> 
                100% Secure & Paperless
              </div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE - Spans 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            {/* Glow matching the Mutual Funds card depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 blur-[100px] rounded-full scale-90"></div>

            <img
              src="/insurance/loan-protector.jpeg"
              alt="Loan Protector Insurance"
              className="relative z-10 w-full max-w-[500px] lg:max-w-none object-contain drop-shadow-[0_30px_50px_rgba(32,118,199,0.2)]"
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
}