'use client';

import { Toaster } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import CoverageTypes from './components/CoverageTypes';
import ComparisonchartAndGraph from './components/ComparisonchartAndGraph';
import WhyCattleAndEligibility from './components/WhyCattleAndEligibility';
import CattleCalculator from './components/CattleCalculator';
import ClaimsProcess from './components/ClaimsProcess';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';


export default function CattleInsurancePage() {
    return (
        <main className="min-h-screen bg-[#fafcfe] text-slate-800 font-sans scroll-smooth">
            <Toaster position="bottom-right" />
            <HeroSection />
            <CoverageTypes />
            <ComparisonchartAndGraph />
            <CattleCalculator />
            <WhyCattleAndEligibility />
            <ClaimsProcess />
            <FAQSection />
            <ContactSection />

        </main>
    );
}
