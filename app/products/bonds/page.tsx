"use client";

import { useState, useEffect } from "react";
import BondsHero from "./components/BondsHero";
import FeaturedCollections from "./components/FeaturedCollections";
import PrivateBonds from "./components/PrivateBonds";
import StateGuaranteedBonds from "./components/StateGuaranteedBonds";
import RiskReturnChart from "./components/RiskReturnChart";
import InvestmentSection from "./components/InvestmentSection";
import HowItWorks from "./components/HowItWorks";
import FAQSection from "./components/FAQSection";
import CTASection from "../../component/CTASection";

import { ArrowLeft as IconArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import BondDetailsView from "./components/views/BondDetailsView";
import BondInvestmentFormView from "./components/views/BondInvestmentFormView";
import AllBondsListingView from "./components/views/AllBondsListingView";

import { useModal } from "../../context/ModalContext";

import BondCategorySection from "./components/BondCategorySection";

type ViewType = 'home' | 'details' | 'apply' | 'private' | 'state' | 'psu' | 'taxfree' | 'sgb' | 'municipal' | 'gsec';

import MarketUpdates from "./components/MarketUpdates";

export default function BondsPage() {
    const [view, setView] = useState<ViewType>('home');
    const [selectedBondId, setSelectedBondId] = useState<number | null>(null);
    const router = useRouter();
    const { openLogin } = useModal();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view]);

    const handleInvestNow = (id: number) => {
        openLogin();
    };

    const handleApplyNow = (id: number) => {
        setSelectedBondId(id);
        setView('apply');
    };

    const handleBack = () => {
        if (view === 'apply') setView('details');
        else setView('home');
    };

    const handleSuccess = () => {
        setView('home');
    };

    const handleBackHome = () => {
        router.push('/');
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans">
             {/* Back to Home Button */}
            {view === 'home' && (
                <div className="fixed z-50 top-16 left-4 md:top-24 md:left-8">
                    <button
                        onClick={handleBackHome}
                        aria-label="Back to Home"
                        className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                    >
                        <div className="p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-90 transition-all">
                            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
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
            )}
            <main className="grow min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
            {view === 'home' && (
                <>
                    <BondsHero />
                    <MarketUpdates />
                    <FeaturedCollections />
                    <div id="private-section">
                        <PrivateBonds 
                            onInvest={handleInvestNow} 
                            onViewAll={() => setView('private')}
                        />
                    </div>

                    <div id="state-section">
                        <StateGuaranteedBonds 
                            onInvest={handleInvestNow} 
                            onViewAll={() => setView('state')}
                        />
                    </div>
                    
                    <div id="psu-section">
                        <BondCategorySection 
                            category="PSU"
                            title="PSU Bonds"
                            subtitle="PSU Bonds"
                            badge="Public Sector"
                            description="Explore highly secure bonds issued by Public Sector Undertakings like NABARD, IRFC, and REC."
                            onInvest={handleInvestNow}
                            onViewAll={() => setView('psu')}
                        />
                    </div>

                    <div id="tax-free-section">
                        <BondCategorySection 
                            category="TaxFree"
                            title="Tax-Free Bonds"
                            subtitle="Tax-Free Bonds"
                            badge="Tax Savings"
                            description="Maximize your post-tax returns with bonds that offer 100% tax-free interest income."
                            onInvest={handleInvestNow}
                            onViewAll={() => setView('taxfree')}
                            bgColor="bg-slate-50"
                        />
                    </div>

                    <div id="sgb-section">
                        <BondCategorySection 
                            category="SGB"
                            title="Sovereign Gold Bonds"
                            subtitle="SGB"
                            badge="Gold Investment"
                            description="Invest in gold digitally with the safety of a sovereign guarantee and additional annual interest."
                            onInvest={handleInvestNow}
                            onViewAll={() => setView('sgb')}
                        />
                    </div>

                    <div id="municipal-section">
                        <BondCategorySection 
                            category="Municipal"
                            title="Municipal Bonds"
                            subtitle="Municipal"
                            badge="City Infrastructure"
                            description="Invest in bonds issued by urban bodies and earn returns while supporting city development."
                            onInvest={handleInvestNow}
                            onViewAll={() => setView('municipal')}
                            bgColor="bg-indigo-50/50"
                        />
                    </div>

                    <div id="gsec-section">
                        <BondCategorySection 
                            category="GSec"
                            title="Government Securities"
                            subtitle="G-Sec"
                            badge="Highest Safety"
                            description="Backed directly by the central government, these bonds offer the highest form of safety for your investments."
                            onInvest={handleInvestNow}
                            onViewAll={() => setView('gsec')}
                        />
                    </div>

                    <RiskReturnChart />
                    <InvestmentSection />
                    <HowItWorks />
                    <div className="bg-white py-8 font-sans">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                                <p className="text-sm text-gray-700 text-center leading-relaxed">
                                    <strong className="text-black">Disclaimer:</strong> Bond investments are subject to market risks. Interest rate changes, credit rating downgrades, and issuer defaults can affect returns. Past performance is not indicative of future results. Please read the offer document and consider your risk appetite before investing.
                                </p>
                            </div>
                        </div>
                    </div>
                    <FAQSection />
                    <CTASection />
                </>
            )}

            {view === 'private' && (
                <AllBondsListingView 
                    category="Private" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'state' && (
                <AllBondsListingView 
                    category="StateGuaranteed" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'psu' && (
                <AllBondsListingView 
                    category="PSU" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'taxfree' && (
                <AllBondsListingView 
                    category="TaxFree" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'sgb' && (
                <AllBondsListingView 
                    category="SGB" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'municipal' && (
                <AllBondsListingView 
                    category="Municipal" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'gsec' && (
                <AllBondsListingView 
                    category="GSec" 
                    onBack={handleBack} 
                    onInvest={handleInvestNow}
                />
            )}

            {view === 'details' && selectedBondId && (
                <BondDetailsView
                    id={selectedBondId}
                    onApply={() => handleApplyNow(selectedBondId)}
                    onBack={handleBack}
                />
            )}

            {view === 'apply' && selectedBondId && (
                <BondInvestmentFormView
                    id={selectedBondId}
                    onBack={handleBack}
                    onSuccess={handleSuccess}
                />
            )}
            </main>
        </div>
    );
}
