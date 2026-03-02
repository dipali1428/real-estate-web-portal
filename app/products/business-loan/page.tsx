"use client";

import { useState } from 'react';
import BusinessLoanHero from '../business-loan/components/BusinessLoanHero';
import BusinessLoanFeatures from '../business-loan/components/BusinessLoanFeatures';
import BusinessLoanEligibility from '../business-loan/components/BusinessLoanEligibility';
import BusinessLoanForm from '../business-loan/components/businessloanform';
import BusinessLoanFAQ from '../business-loan/components/BusinessLoanFAQ';
import BusinessLoanCalculator from '../business-loan/components/BusinessLoanCalculator';
import BusinessLoanPartners from '../business-loan/components/BusinessLoanPartners';
import BusinessLoanStepProcess from '../business-loan/components/BusinessLoanStepProcess';


export default function BusinessLoanProductPage() {
    const [showForm, setShowForm] = useState(false);

    const scrollToCalculator = () => {
        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <BusinessLoanHero
                onApplyClick={() => setShowForm(true)}
                onCalculateClick={scrollToCalculator}
            />

            {/* Loan Calculator */}
            <div id="calculator" className="scroll-mt-20">
                <BusinessLoanCalculator />
            </div>
            <BusinessLoanPartners />
            <BusinessLoanFeatures />
            <BusinessLoanEligibility />
            <BusinessLoanStepProcess />


            <BusinessLoanFAQ />

            {showForm && <BusinessLoanForm onClose={() => setShowForm(false)} />}
        </div>
    );
}
