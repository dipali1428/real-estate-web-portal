'use client';

import { useRouter } from 'next/navigation';
import HeroAndHighlights from './components/HeroAndHighlights';
import ProvidersAndPlans from './components/ProvidersAndPlans';
import CoverageHighlights from './components/CoverageHighlights';
import CalculatorAndProcess from './components/CalculatorAndProcess';
import BenefitsAndEligibility from './components/BenefitsAndEligibility';
import ClaimsAndDocuments from './components/ClaimsAndDocuments';
import SupportAndFaqs from './components/SupportAndFaqs';
import ScrollToTop from '../../component/ScrollToTop';

export default function TravelInsurancePage() {
    const router = useRouter();
    const handleBackHome = () => router.push('/');

    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
            <HeroAndHighlights />
            <ProvidersAndPlans />
            <CoverageHighlights />
            <CalculatorAndProcess />
            <BenefitsAndEligibility />
            <ClaimsAndDocuments />
            <SupportAndFaqs />
            <ScrollToTop />
        </main>
    );
}