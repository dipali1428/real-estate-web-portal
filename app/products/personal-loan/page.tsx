"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft as IconArrowLeft } from 'lucide-react';

// Shared Components
import CTASection from '../../component/CTASection';
import ScrollToTop from '../../component/ScrollToTop';
import Chatbot from '../../component/chatbot/page';

// Section Components
import PersonalLoanHero from './components/PersonalLoanHero';
import FeaturesBenefits from './components/FeaturesBenefits';
import PayoutStructure from './components/PayoutStructure';
import LoanCalculator from './components/LoanCalculator';
import EligibilityCriteria from './components/EligibilityCriteria';
import FAQ from './components/FAQ';
import HowItWorks from './components/HowItWorks';
import BankSelectionModal from './components/BankSelectionModal';
import PersonalLoanForm from './components/personaloanform';

export default function PersonalLoanPage() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<string | undefined>(undefined);
    const [initialBankName, setInitialBankName] = useState<string | undefined>(undefined);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const openForm = (bankName?: string) => {
        setSelectedBank(bankName);
        setShowForm(true);
    };

    const openBankModal = (bankName?: string) => {
        setInitialBankName(bankName);
        setShowBankModal(true);
    };

    const handleBankApply = (bankName: string) => {
        setShowBankModal(false);
        openForm(bankName);
    };

    const handleBackHome = () => {
        router.push('/');
    };

    // Prevent hydration mismatch
    if (!isMounted) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <div className="font-sans text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {/* Back to Home Button */}
            <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
                <button
                    onClick={handleBackHome}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                        <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={handleBackHome}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group font-sans"
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                    <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>

            <PersonalLoanHero />
            <LoanCalculator />
            <PayoutStructure openBankModal={openBankModal} />
            <FeaturesBenefits />
            <EligibilityCriteria openForm={() => openForm()} />
            <HowItWorks />

            {/* Disclaimer Section */}
            <div className="bg-white py-10 px-4">
                <div className="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Loan details such as interest rates, amounts, and eligibility are indicative and may change based on lender policies, RBI guidelines, and applicant profile. Please verify terms with the respective bank or lender before applying.
                    </p>
                </div>
            </div>

            <FAQ />
            <CTASection />

            {/* Modals & Overlays */}
            {showBankModal && (
                <BankSelectionModal
                    onClose={() => setShowBankModal(false)}
                    onApply={handleBankApply}
                    initialBankName={initialBankName}
                />
            )}

            {showForm && (
                <PersonalLoanForm
                    onClose={() => setShowForm(false)}
                    selectedBank={selectedBank}
                />
            )}

            <Chatbot />
            <ScrollToTop />
        </div>
    );
}
