'use client';

import { Toaster } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import { PetInsuranceOverview, HowItWorks, PetEligibility } from './components/PetInfoSections';
import { ProviderComparison, PetPlanTypes, PetClaimsProcess, PetDocumentsSection } from './components/PetPolicyDetails';
import PetInsuranceCalculator from './components/PetInsuranceCalculator';
import { PetFAQSection, PetContactSection, PetDisclaimer } from './components/PetSupportSections';

export default function PetInsurancePage() {
    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth max-w-[1536px] mx-auto shadow-2xl overflow-hidden relative">
            <Toaster position="bottom-right" />
            <HeroSection />
            <PetPlanTypes />
            <PetInsuranceOverview />
            {/* <ProviderComparison /> */}
            <HowItWorks />

            <PetEligibility />
            <PetInsuranceCalculator />
            <PetClaimsProcess />
            <PetDocumentsSection />
            <PetFAQSection />
            <PetContactSection />
            <PetDisclaimer />
        </main>
    );
}
