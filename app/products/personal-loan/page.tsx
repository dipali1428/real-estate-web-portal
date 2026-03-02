"use client";
import React, { useState, useEffect } from 'react';
import PersonalLoanHero from './sections/PersonalLoanHero';
import FeaturesBenefits from './sections/FeaturesBenefits';
import PayoutStructure from './sections/PayoutStructure';
import LoanCalculator from './sections/LoanCalculator';
import EligibilityCriteria from './sections/EligibilityCriteria';
import FAQ from './sections/FAQ';
import HowItWorks from './sections/HowItWorks';
import ReadyToApply from './sections/ReadyToApply';
import BankSelectionModal from './sections/BankSelectionModal';
import PersonalLoanForm from './sections/personaloanform';

export default function PersonalLoanPage() {
    const [showForm, setShowForm] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState<string | undefined>(undefined);
    const [initialBankName, setInitialBankName] = useState<string | undefined>(undefined);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const openForm = (bankName?: string | any) => {
        if (typeof bankName === 'string') {
            setSelectedBank(bankName);
        } else {
            setSelectedBank(undefined);
        }
        setShowForm(true);
    };

    const openBankModal = (bankName?: string | any) => {
        if (typeof bankName === 'string') {
            setInitialBankName(bankName);
        } else {
            setInitialBankName(undefined);
        }
        setShowBankModal(true);
    };

    const handleBankApply = (bankName: string) => {
        setShowBankModal(false);
        openForm(bankName);
    };

    // Prevent hydration mismatch by waiting for mount
    if (!isMounted) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <div className="font-sans text-gray-900" suppressHydrationWarning>
            <PersonalLoanHero openForm={openForm} />
            <LoanCalculator openForm={openForm} />
            <PayoutStructure openBankModal={openBankModal} />
            <FeaturesBenefits openForm={openForm} />
            <HowItWorks />
            <EligibilityCriteria openForm={openForm} />
            <FAQ />
            <ReadyToApply />

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
        </div>
    );
}
