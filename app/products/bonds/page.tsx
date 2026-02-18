"use client";

import { useState, useEffect } from "react";
import BondsHero from "./components/BondsHero";
import MarketSnapshot from "./components/MarketSnapshot";
import FeaturedCollections from "./components/FeaturedCollections";
import MarketUpdates from "./components/MarketUpdates";
import PrivateBonds from "./components/PrivateBonds";
import StateGuaranteedBonds from "./components/StateGuaranteedBonds";
import BondsOverview from "./components/BondsOverview";
import RiskReturnChart from "./components/RiskReturnChart";
import InvestmentCalculator from "./components/InvestmentCalculator";
import BondBenefits from "./components/BondBenefits";
import HowItWorks from "./components/HowItWorks";
import RiskSection from "./components/RiskSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";

import BondDetailsView from "./components/views/BondDetailsView";
import BondInvestmentFormView from "./components/views/BondInvestmentFormView";

type ViewType = 'home' | 'details' | 'apply';

export default function BondsPage() {
    const [view, setView] = useState<ViewType>('home');
    const [selectedBondId, setSelectedBondId] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view]);

    const handleInvestNow = (id: number) => {
        setSelectedBondId(id);
        setView('details');
    };

    const handleApplyNow = (id: number) => {
        if (!selectedBondId && id) setSelectedBondId(id);
        setView('apply');
    };

    const handleBack = () => {
        if (view === 'apply') setView('details');
        else setView('home');
    };

    const handleSuccess = () => {
        setView('home');
    };

    return (
        <main className="bg-white min-h-screen">
            {view === 'home' && (
                <>
                    <BondsHero />
                    <MarketUpdates />
                    <MarketSnapshot />
                    <FeaturedCollections />
                    <BondsOverview />
                    <PrivateBonds onInvest={handleInvestNow} />
                    <StateGuaranteedBonds onInvest={handleInvestNow} />
                    <RiskReturnChart />
                    <InvestmentCalculator />
                    <BondBenefits />
                    <HowItWorks />
                    <RiskSection />
                    <FAQSection />
                    <CTASection />
                </>
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
    );
}
