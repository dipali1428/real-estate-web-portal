'use client';

import { Toaster } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import { PetInsuranceOverview, HowItWorks, PetEligibility } from './components/PetInfoSections';
import { ProviderComparison, PetPlanTypes, PetClaimsProcess, PetDocumentsSection } from './components/PetPolicyDetails';
import PetInsuranceCalculator from './components/PetInsuranceCalculator';
import { PetFAQSection } from './components/PetSupportSections';
import CTASection from '../../component/CTASection';
import ScrollToTop from '../../component/ScrollToTop';

export default function PetInsurancePage() {
    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth shadow-2xl overflow-hidden relative w-full">
            <Toaster position="bottom-right" />
            <HeroSection />
            <PetPlanTypes />
            <PetInsuranceOverview />
            <ProviderComparison />
            <PetInsuranceCalculator />
            <HowItWorks />
            <PetEligibility />
            <PetClaimsProcess />
            <PetDocumentsSection />
            <PetFAQSection />
            <CTASection 
                title="Your Pet's Health is Our Priority"
                description="From routine checkups to emergency surgeries, ensure your furry friend gets the best care without financial worry. Join thousands of happy pet parents who trust Infinity Arthvishva for comprehensive pet protection."
                buttonText="Get Pet Consultation"
            />
            <ScrollToTop />
        </main>
    );
}
