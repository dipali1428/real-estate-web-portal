"use client";

import Hero from './components/Hero';
import NPSVatsalya from './components/NPSVatsalya';
import Features from './components/Features';
import Eligibility from './components/Eligibility';
import AccountTypes from './components/AccountTypes';
import NPSWithdrawal from './components/NPSWithdrawal';
import NPSCalculator from './components/NPSCalculator';
import ApplicationProcess from './components/ApplicationProcess';
import FAQ from './components/FAQ';
import CTASection from '@/app/component/CTASection';
import ScrollToTop from '@/app/component/ScrollToTop';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/context/ModalContext';
import { ArrowLeft, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { openLogin } = useModal();
  const handleBackHome = () => router.push('/');

  return (
    <main className="min-h-screen bg-white font-sans relative">
      {/* Fixed Back to Home Button */}
      <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
        <button
          onClick={handleBackHome}
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </button>
        <button
          onClick={handleBackHome}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          Back to Home
        </button>
      </div>


      <Hero />
      <NPSCalculator />
      <AccountTypes />
      <NPSVatsalya />
      <Features />
      <NPSWithdrawal />
      <Eligibility />
      <ApplicationProcess />
      {/* Disclaimer Section */}
      <div className="bg-white py-6 md:py-8 px-4">
        <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
            ⚠️ * Rules are subject to PFRDA guidelines and may change. Please refer to official documentation.
          </p>
        </div>
      </div>
      <FAQ />
      <CTASection
        title="Secure Your Golden Years with NPS"
        description="Start your journey towards a stress-free retirement. Invest in National Pension System today for better returns and tax benefits."
        buttonText="Request a Callback"
        buttonLink="/#contact"
      />
      <ScrollToTop />
    </main>
  );
}
