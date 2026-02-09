'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Hero from './components/sections/Hero';
import WhyInvest from './components/sections/WhyInvest';
import Offers from './components/sections/Offers';
import Comparison from './components/sections/Comparison';
import Bonds from './components/sections/Bonds';
import InvestmentUniverse from './components/sections/InvestmentUniverse';
import Eligibility from './components/sections/Eligibility';
import TaxBenefits from './components/sections/TaxBenefits';
import Risks from './components/sections/Risks';
import Portfolio from './components/sections/Portfolio';
import InvestorGuide from './components/sections/InvestorGuide';
import FAQ from './components/sections/FAQ';
import Trust from './components/sections/Trust';
import HowItWorks from './components/sections/HowItWorks';

import ActiveIssuesView from './components/views/ActiveIssuesView';
import NCDDetailsView from './components/views/NCDDetailsView';
import InvestmentFormView from './components/views/InvestmentFormView';

type ViewType = 'home' | 'active-issues' | 'details' | 'apply';

function HomeContent() {
    const searchParams = useSearchParams();
    const isEmbedded = searchParams.get('embed') === 'true';

    const [view, setView] = useState<ViewType>('home');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view]);

    const handleStartInvesting = () => setView('active-issues');

    const handleInvestNow = (id: string) => {
        setSelectedId(id);
        setView('details');
    };

    const handleApplyNow = (id: string) => {
        setSelectedId(id);
        setView('apply');
    };

    const handleDownloadGuide = () => {
        const link = document.createElement('a');
        link.href = '/investment_guide.html';
        link.target = '_blank';
        link.download = 'Infinity_Arthvishva_Investment_Guide.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans">
            <main className="grow">

                {view === 'home' && (
                    <>
                        {/* Hero stays full-width */}
                        <Hero onStart={handleStartInvesting} />

                        {/* Content Sections */}
                        <div className="container-custom">
                            <div className="space-y-20 py-16 md:py-20">

                                <Trust />
                                <WhyInvest />
                                <HowItWorks />
                                <Comparison />
                                <InvestmentUniverse />

                                <Offers
                                    onInvest={handleInvestNow}
                                    onApply={handleApplyNow}
                                    onViewAll={handleStartInvesting}
                                />

                                <Bonds />
                                <Eligibility />
                                <TaxBenefits />
                                <Risks />
                                <Portfolio />
                                <InvestorGuide />
                                <FAQ />

                            </div>
                        </div>

                        {/* Global CTA */}
                        <section className="relative overflow-hidden py-20 md:py-24">
                            {/* Background */}
                            <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#F0F7FF] via-white to-[#E8F7F6]" />

                            <div className="container-custom text-center">
                                <h2 className="mb-6 text-3xl md:text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                    Ready to Secure Your Financial Future?
                                </h2>

                                <p className="mx-auto mb-12 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                                    Join thousands of investors who trust Infinity Arthvishva for high-yield, secure fixed income investments.
                                </p>

                                <div className="flex flex-col sm:flex-row justify-center gap-6">
                                    <button
                                        onClick={handleStartInvesting}
                                        className="rounded-xl bg-[#1CADA3] px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-[#168a82] hover:shadow-2xl active:scale-95">
                                        Start Investing Now
                                    </button>

                                    <button
                                        onClick={handleDownloadGuide}
                                        className="rounded-xl border-2 border-[#2076C7]/20 bg-white px-10 py-4 text-lg font-bold text-[#2076C7] transition-all hover:bg-gray-50 hover:shadow-md active:scale-95">
                                        Download Guide
                                    </button>
                                </div>
                            </div>
                        </section>

                    </>
                )}

                {view === 'active-issues' && (
                    <ActiveIssuesView
                        onInvest={handleInvestNow}
                        onApply={handleApplyNow}
                    />
                )}

                {view === 'details' && selectedId && (
                    <NCDDetailsView
                        id={selectedId}
                        onApply={handleApplyNow}
                        onBack={handleStartInvesting}
                    />
                )}

                {view === 'apply' && selectedId && (
                    <InvestmentFormView
                        id={selectedId}
                        onBack={() => setView('details')}
                        onSuccess={handleStartInvesting}
                    />
                )}

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
