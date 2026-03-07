'use client';

import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import { useModal } from '../../context/ModalContext';
import HeroSection from './components/HeroSection';
import LoanTypesSection from './components/LoanTypesSection';
import EligibilityAndProcess from './components/EligibilityAndProcess';
import BenefitsSection from './components/BenefitsSection';
import EMICalculator from './components/EMICalculator';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';

export default function EducationLoanPage() {
    const router = useRouter();
    const { openLogin } = useModal();

    const handleBackHome = () => router.push('/');

    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
            <Toaster position="bottom-right" />

            {/* FIXED BACK BUTTON */}
            <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
                <button
                    onClick={handleBackHome}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all" >
                        <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={handleBackHome}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
                >
                    <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>

            </div>
            <HeroSection onApplyClick={openLogin} />
            <LoanTypesSection />
            <EMICalculator onApplyClick={openLogin} />
            <EligibilityAndProcess />
            <BenefitsSection />
            <div className="bg-white px-2">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Loan details such as interest rates, amounts, and eligibility are indicative and may change based on lender policies, RBI guidelines, and applicant profile. Please verify terms with the respective bank or lender before applying.
                    </p>
                </div>
            </div>
            <FAQSection />
            <ContactSection />
        </main>
    );
}
