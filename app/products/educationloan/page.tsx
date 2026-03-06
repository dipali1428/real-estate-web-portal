'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import HeroSection from './components/HeroSection';
import LoanTypesSection from './components/LoanTypesSection';
import EligibilityAndProcess from './components/EligibilityAndProcess';
import BenefitsSection from './components/BenefitsSection';
import EMICalculator from './components/EMICalculator';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import EducationLoanForm from './components/educationloanform';

export default function EducationLoanPage() {
    const [showForm, setShowForm] = useState(false);

    return (
        <main className="min-h-screen bg-[#fafcfe] text-slate-800 font-sans scroll-smooth">
            <Toaster position="bottom-right" />
            <HeroSection onApplyClick={() => setShowForm(true)} />
            <LoanTypesSection />
            <EMICalculator onApplyClick={() => setShowForm(true)} />
            <EligibilityAndProcess />
            <BenefitsSection />
            <FAQSection />
            <ContactSection />

            {showForm && <EducationLoanForm onClose={() => setShowForm(false)} />}
        </main>
    );
}
