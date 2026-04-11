'use client';

import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useModal } from '../../context/ModalContext';
import HeroSection from './components/HeroSection';
import LoanTypesSection from './components/LoanTypesSection';
import EligibilityAndProcess from './components/EligibilityAndProcess';
import BenefitsSection from './components/BenefitsSection';
import EMICalculator from './components/EMICalculator';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import ScrollToTop from '../../component/ScrollToTop';

export default function EducationLoanPage() {
    const router = useRouter();
    const { openLogin } = useModal();

    const handleBackHome = () => router.push('/');

    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans scroll-smooth">
            <Toaster position="bottom-right" />

            <HeroSection onApplyClick={openLogin} />
            <LoanTypesSection />
            <EMICalculator onApplyClick={openLogin} />
            <EligibilityAndProcess />
            <BenefitsSection />
            <div className="bg-white px-2">
                <div className="max-w-[1440px] mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Loan details such as interest rates, amounts, and eligibility are indicative and may change based on lender policies, RBI guidelines, and applicant profile. Please verify terms with the respective bank or lender before applying.
                    </p>
                </div>
            </div>
            <FAQSection />
            <ContactSection />
            <ScrollToTop />
        </main>
    );
}
