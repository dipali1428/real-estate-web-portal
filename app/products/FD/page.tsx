"use client";

import React from 'react';
import { motion } from 'framer-motion';
import FDHero from './components/FDHero';
import FDCalculator from './components/FDCalculator';
import BankList from './components/BankList';
import Features from './components/Features';
import FAQ from './components/FAQ';
import FDStepProcess from './components/FDStepProcess';
import FDEligibility from './components/FDEligibility';
import SectorComparisonMatrix from './components/BankComparisonChart';
import BankVsNBFC from './components/BankVsNBFC';
import CTASection from '@/app/component/CTASection';
import ScrollToTop from '@/app/component/ScrollToTop';
import { useModal } from '@/app/context/ModalContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const { openLogin } = useModal();
  const router = useRouter();
  const handleBackHome = () => router.push('/');

  const scrollToCalculator = () => {
    const calculator = document.getElementById('calculator');
    if (calculator) calculator.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col font-sans bg-white min-h-screen">
      <ScrollToTop />

      {/* Fixed Back to Home Button */}
      <div className="fixed z-50 top-16 left-2 md:top-24 md:left-8">
        <button
          onClick={handleBackHome}
          className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          <span className="hidden md:inline">Back to Home</span>
        </button>
      </div>

      {/* 1. Hero Section - Extracted */}
      <FDHero openLogin={openLogin} scrollToCalculator={scrollToCalculator} />

      {/* 2. Bank List Section - Compare FD Rates */}
      <section id="compare" className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BankList />
        </div>
      </section>

      {/* 3. Comparison & Calculator Section */}
      <section className="py-12 relative z-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 animate-fade-in-up">
          <div id="calculator" className="grid grid-cols-1 gap-12 mb-20 scroll-mt-24">
            <FDCalculator />
          </div>
          <div className="mb-4">
            <SectorComparisonMatrix />
          </div>

        </div>
      </section>

      {/* 4. Bank vs NBFC Comparison */}
      <div className="bg-white">
        <BankVsNBFC />
      </div>


      {/* 6. Features Section - Why Choose Us */}
      <div id="about" className="bg-white">
        <Features />
      </div>

      <FDEligibility />

      {/* 5. Process Section */}
      <div className="bg-gray-50">
        <FDStepProcess onApplyClick={openLogin} />
      </div>

      {/* Disclaimer Section */}
      <div className="max-w-4xl mx-auto mb-10 mt-16 bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
        <p className="text-sm text-gray-700 text-center leading-relaxed font-medium">
          <strong className="text-black">Disclaimer:</strong> Fixed Deposit rates are subject to change based on bank policies and RBI guidelines. Please verify latest rates before investing.
        </p>
      </div>

      {/* 8. FAQs */}
      <FAQ />

      {/* 9. CTA Section */}
      <CTASection
        title="Maximize Your Savings with Infinity Arthvishva"
        description="Small savings today, bigger security tomorrow. Your money deserves safe and steady growth.
         Grow your wealth with reliable FD returns. Create your Fixed Deposit now and start growing your wealth."
        buttonText="Get a Consultation"
        buttonLink="/#contact"
      />
    </div>
  );
}
