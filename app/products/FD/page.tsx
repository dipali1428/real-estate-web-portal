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
    <main className="min-h-screen bg-gray-50 overflow-x-hidden font-sans text-center md:text-left">
      <ScrollToTop />

      {/* Fixed Back to Home Button */}
      <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
        {/* Mobile: icon only */}
        <button
          onClick={handleBackHome}
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </button>
        {/* Desktop: full text button */}
        <button
          onClick={handleBackHome}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          Back to Home
        </button>
      </div>

      {/* 1. Hero Section - Extracted */}
      <FDHero openLogin={openLogin} scrollToCalculator={scrollToCalculator} />

      {/* 2. Bank List Section - Compare FD Rates */}
      <section id="compare" className="pt-16 pb-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BankList />
        </div>
      </section>

      {/* 3. Comparison & Calculator Section */}
      <section className="pt-12 pb-4 relative z-20 scroll-mt-20 bg-white border-b border-gray-100">
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
      <div className="bg-white border-b border-gray-100">
        <BankVsNBFC />
      </div>


      {/* 6. Features Section - Why Choose Us */}
      <div id="about" className="bg-white border-b border-gray-100">
        <Features />
      </div>

      <FDEligibility />

      {/* 5. Process Section */}
      <div className="bg-gray-50">
        <FDStepProcess onApplyClick={openLogin} />
      </div>

      {/* Disclaimer Section */}
      <section className="bg-white px-4 pt-16 pb-10">
        <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-700 text-center leading-relaxed font-medium">
            <strong className="text-black">Disclaimer:</strong> Fixed Deposit rates are subject to change based on bank policies and RBI guidelines. Please verify latest rates before investing.
          </p>
        </div>
      </section>

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
    </main>
  );
}
