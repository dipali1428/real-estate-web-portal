'use client';

import { Toaster } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowDeliverResult';
import InsuranceTypes from './components/TravelPlans';
import DocumentsSection from './components/DocumentsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import ClaimsProcess from './components/ClaimsProcess';
import KeyCoverageHighlights from './components/NeedOfTravelInsurace';
import WhyTravelInsurance from './components/WhyTravelInsurance';
import GlobalEligibility from './components/GlobalEligibility';
import ProviderComparison from './components/ProviderComparison';
import TravelDisclaimer from './components/TravelDisclaimer';
import TravelCalculator from './components/TravelCalculator';

export default function TravelInsurancePage() {
    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
            <Toaster position="bottom-right" />
            <HeroSection />
            <KeyCoverageHighlights />
            <ProviderComparison />
            <InsuranceTypes />
            <HowItWorks />
            <WhyTravelInsurance />
            <GlobalEligibility />
            <TravelCalculator />
            <ClaimsProcess />
            <DocumentsSection />
            <FAQSection />
            <ContactSection />
            <TravelDisclaimer />
        </main>
    );
}
