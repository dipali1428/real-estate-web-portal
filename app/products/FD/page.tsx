"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FDCalculator from './components/FDCalculator';
import BankList from './components/BankList';
import Features from './components/Features';
import FAQ from './components/FAQ';
import InvestmentGuide from './components/InvestmentGuide';
import SectorComparisonMatrix from './components/BankComparisonChart';
import BankVsNBFC from './components/BankVsNBFC';
import ScrollToTop from './components/ScrollToTop';
const MotionDiv = motion.div;

const Home = () => {
  return (
    <div className="flex flex-col font-sans">
      <ScrollToTop />
      {/* 1. Hero Section */}
      <section className="relative bg-[#f8fafc] text-slate-800 pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-gray-100">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(32,118,199,0.08),transparent_50%)] z-0"
        ></motion.div>

        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            skewX: [-12, -15, -12],
            x: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4 z-0"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left Content */}
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-left">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/5 px-6 py-2 rounded-full text-sm font-bold border border-primary/10 text-primary tracking-wide transition-all">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span> Save today, grow tomorrow.
              </motion.div>

              <motion.h1
                className="text-3xl md:text-5xl font-bold leading-[1.1] bg-clip-text text-transparent drop-shadow-sm pt-2"
                style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Grow Your Wealth with <br />
                High-Interest <br />
                Fixed Deposits
              </motion.h1>

              <div className="space-y-6">
                <motion.p
                  className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed mt-10 mb-10">
                  Sophisticated fixed-income solutions for secure wealth growth.
                </motion.p>

                <motion.div

                  whileHover={{ scale: 1.02, translateY: -5 }}
                  className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-[0.2em] bg-white py-4 px-6 rounded-2xl w-fit border-2 border-primary/10 shadow-xl shadow-primary/5 flex items-center gap-3 cursor-default font-sans">
                  <span className="text-2xl not-italic">🛡️</span>
                  <span>Security comes first. All bank fixed deposits are covered under DICGC insurance, backed by RBI</span>
                </motion.div>
              </div>


            </MotionDiv>

            {/* Right Image/Illustration */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full transform -translate-x-12 translate-y-12"
              ></motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <Image
                  src="/FD/fdimage.png"
                  alt="Financial Wealth Growth"
                  width={512}
                  height={512}
                  className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_35px_35px_rgba(32,118,199,0.15)] rounded-[40px] hover:rotate-2 transition-transform duration-500"
                />
              </motion.div>

              <MotionDiv
                animate={{
                  y: [0, -15, 0], // Made smaller to sync with parent but still have relative motion
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 md:-top-16 md:-right-16 p-1.5 md:p-7 rounded-lg md:rounded-3xl shadow-xl z-20 backdrop-blur-sm bg-white/90 max-w-20 md:max-w-none text-center">
                <div className="text-slate-700 font-bold text-base md:text-xl leading-none md:mb-1">9.10%*</div>
                <div className="text-[6px] md:text-[10px] font-bold text-slate-600 uppercase tracking-tighter md:tracking-widest leading-none">Max Interest Rate*</div>
              </MotionDiv>

            </MotionDiv>
          </div>
        </div>
      </section >


      {/* 3. Bank List Section - Compare FD Rates */}
      < section id="compare" className="py-24 bg-gray-50 border-b border-gray-200" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <BankList />
        </div>
      </section >

      {/* 4. Comparison & Calculator Section */}
      < section id="calculator" className="py-24 bg-white relative z-20" >
        <div className="max-w-7xl mx-auto px-4 animate-fade-in-up">
          {/* Sector Comparison Matrix */}
          <div className="mb-24">
            <SectorComparisonMatrix />
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Calculator Section */}
            <FDCalculator />
          </div>
        </div>
      </section >

      {/* 5. Bank vs NBFC Comparison - NEW */}
      <BankVsNBFC />

      {/* 6. Features Section - Why Choose Us */}
      < div id="about" className="bg-gray-50" >
        <Features />
      </div >

      {/* 5. Investment Guide Section - Process */}
      < div id="services" className="bg-white" >
        <InvestmentGuide />
      </div >

      {/* 6. FAQ Section */}
      < section id="faq" className="bg-gray-50" >
        <FAQ />
      </section >

    </div >
  );
};

export default Home;
