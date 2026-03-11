"use client";

import VehicleLoanHero from './components/VehicleLoanHero';
import VehicleLoanFeatures from './components/VehicleLoanFeatures';
import VehicleLoanTypes from './components/VehicleLoanTypes';
import VehicleLoanProcess from './components/VehicleLoanProcess';
import VehicleLoanCalculator from './components/VehicleLoanCalculator';
import VehicleLoanEligibility from './components/VehicleLoanEligibility';
import VehicleLoanFAQ from './components/VehicleLoanFAQ';
import CTASection from '@/app/component/CTASection';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Zap } from 'lucide-react';
import ScrollToTop from '@/app/component/ScrollToTop';
import { useModal } from '@/app/context/ModalContext';

export default function VehicleLoanPage() {
    const router = useRouter();
    const { openLogin } = useModal();
    const handleBackHome = () => router.push('/');

    const handleApplyClick = () => {
        openLogin();
    };

    const handleCalculateClick = () => {
        // Scroll to calculator section
        const calcElement = document.getElementById('calculator');
        if (calcElement) calcElement.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Fixed Back to Home Button */}
            <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
                {/* Mobile: icon only */}
                <button
                    onClick={handleBackHome}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                        <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                {/* Desktop: full text button */}
                <button
                    onClick={handleBackHome}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>



            <VehicleLoanHero
                onApplyClick={handleApplyClick}
                onCalculateClick={handleCalculateClick}
            />
            <VehicleLoanTypes />
            <VehicleLoanCalculator />
            <VehicleLoanFeatures />
            <VehicleLoanEligibility />
            <VehicleLoanProcess />

            {/* Disclaimer Section */}
            <div className="bg-white py-6 md:py-8 px-4">
                <div className="max-w-6xl mx-auto bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        <strong className="text-black">Disclaimer:</strong> Loan details such as interest rates, amounts, and eligibility are indicative and may change based on lender policies, RBI guidelines, and applicant profile. Please verify terms with the respective bank or lender before applying.
                    </p>
                </div>
            </div>

            <VehicleLoanFAQ />
            <CTASection
                title="Ready to Drive Your New Vehicle?"
                description="Stop waiting and start driving. Apply today for a seamless vehicle financing experience with low interest rates and flexible tenures. Minimal paperwork and quick approvals to get you moving."
                buttonText="Request a Callback"
                buttonLink="/#contact"
            />
            <ScrollToTop />
        </div>
    );
}
