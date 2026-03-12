'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft as IconArrowLeft } from 'lucide-react';

import Hero from './components/sections/Hero';
import WhyInvest from './components/sections/WhyInvest';
import Offers from './components/sections/Offers';
import Comparison from './components/sections/Comparison';
import InvestmentUniverse from './components/sections/InvestmentUniverse';
import Eligibility from './components/sections/Eligibility';
import TaxBenefits from './components/sections/TaxBenefits';
import Risks from './components/sections/Risks';
import Portfolio from './components/sections/Portfolio';
import FAQ from './components/sections/FAQ';
import HowItWorks from './components/sections/HowItWorks';
import NCDYieldChart from './components/sections/NCDYieldChart';
import Disclaimer from './components/sections/Disclaimer';
import CTASection from '../../component/CTASection';

import { useModal } from '../../context/ModalContext';

function HomeContent() {
    const { openLogin } = useModal();
    const router = useRouter();

    const handleBackHome = () => {
        router.push('/');
    };

    const handleStartInvesting = () => {
        openLogin();
    };

    const handleInvestNow = (id: string) => {
        openLogin();
    };

    const handleApplyNow = (id: string) => {
        openLogin();
    };


    return (
        <div className="flex min-h-screen flex-col bg-white font-sans">
            {/* Back to Home Button */}
            <div className="fixed z-50 top-16 left-4 md:top-24 md:left-8">
                <button
                    onClick={handleBackHome}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                        <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={handleBackHome}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group font-sans"
                >
                    <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>

            <main className="grow">

                <Hero onStart={handleStartInvesting} />

                <div className="space-y-0">
                    {/* NEW SEQUENCE:
                        1. Hero
                        2. Active opportunities (Offers)
                        3. NCD Graph (NCDYieldChart)
                        4. Invest in 3 simple (HowItWorks)
                        5. Explore our investment universe (InvestmentUniverse)
                        6. Who can invest / Documents / 4 steps (Eligibility)
                        7. Investment portfolios (Portfolio)
                        8. Tax benefit and efficiency (TaxBenefits)
                        9. Risk assessment (Risks)
                        10. Why invest in NCD (WhyInvest)
                        11. NCD vs FD (Comparison)
                        12. FAQ
                        13. CTA
                    */}

                    <Offers
                        onInvest={handleInvestNow}
                        onApply={handleApplyNow}
                        onViewAll={handleStartInvesting}
                    />

                    <NCDYieldChart />

                    <HowItWorks onStart={handleStartInvesting} />

                    <InvestmentUniverse />

                    <Eligibility />

                    <Portfolio />

                    <TaxBenefits />

                    <Risks />

                    <WhyInvest />

                    <Comparison />

                    <Disclaimer />

                    <FAQ />
                </div>

                {/* Global CTA */}
                <CTASection />

            </main>
        </div>
    );
}

export default function Home() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-gray-500">
                    Loading...
                </div>
            }>
            <HomeContent />
        </Suspense>
    );
}
