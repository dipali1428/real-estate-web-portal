"use client";

import BusinessLoanHero from './components/BusinessLoanHero';
import BusinessLoanFeatures from './components/BusinessLoanFeatures';
import BusinessLoanEligibility from './components/BusinessLoanEligibility';
import BusinessLoanFAQ from './components/BusinessLoanFAQ';
import BusinessLoanCalculator from '@/app/page/businessloan/page';
import BusinessLoanPartners from './components/BusinessLoanPartners';
import BusinessLoanStepProcess from './components/BusinessLoanStepProcess';
import { useModal } from '@/app/context/ModalContext';
import CTASection from '@/app/component/CTASection';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ScrollToTop from '@/app/component/ScrollToTop';

export default function BusinessLoanProductPage() {
    const { openLogin } = useModal();
    const router = useRouter();
    const handleBackHome = () => router.push('/');

    const scrollToCalculator = () => {
        const calculator = document.getElementById('calculator');
        if (calculator) calculator.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
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
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>

            <BusinessLoanHero
                onApplyClick={openLogin}
                onCalculateClick={scrollToCalculator}
            />

            {/* Loan Calculator */}
            <div id="calculator" className="scroll-mt-20">
                <BusinessLoanCalculator />
            </div>

            <BusinessLoanPartners />
            <BusinessLoanFeatures />
            <BusinessLoanEligibility />
            <BusinessLoanStepProcess onApplyClick={openLogin} />

            {/* Disclaimer Section */}
            <div className="bg-white py-6 md:py-8 px-4">
                <div className="max-w-6xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Rules are subject to PFRDA guidelines and may change. Please refer to official documentation.
                    </p>
                </div>
            </div>

            <BusinessLoanFAQ />
            <CTASection
                title="Fuel Your Enterprise Growth Today"
                description="From working capital to expansion plans-Scale your operations, manage working capital, and take your business to the next level with our tailor-made financing solutions. Fast approvals, minimal paperwork."
                buttonText="Request a Callback"
                buttonLink="/#contact"
            />
            <ScrollToTop />
        </div>
    );
}
