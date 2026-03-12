'use client';

import { Toaster } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import CoverageTypes from './components/CoverageTypes';
import ComparisonchartAndGraph from './components/ComparisonchartAndGraph';
import WhyCattleAndEligibility from './components/WhyCattleAndEligibility';
import CattleCalculator from './components/CattleCalculator';
import ClaimsProcess from './components/ClaimsProcess';
import FAQSection from './components/FAQSection';
import CTASection from '../../component/CTASection';
import ScrollToTop from '../../component/ScrollToTop';


export default function CattleInsurancePage() {
    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
            <Toaster position="bottom-right" />
            <HeroSection />
            <CoverageTypes />
            <ComparisonchartAndGraph />
            <CattleCalculator />
            <WhyCattleAndEligibility />
            <ClaimsProcess />
            <FAQSection />

            <CTASection 
                title="Protect Your Livestock Today"
                description="Don't let unexpected events affect your livelihood. Protect your cows, buffaloes, and other livestock with India's most trusted cattle insurance plans. Get comprehensive coverage and peace of mind today."
                buttonText="Connect With Expert"
            />
            <ScrollToTop />
        </main>
    );
}
