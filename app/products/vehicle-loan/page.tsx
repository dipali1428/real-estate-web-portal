"use client";

import VehicleLoanHero from './components/VehicleLoanHero';
import VehicleLoanFeatures from './components/VehicleLoanFeatures';
import VehicleLoanTypes from './components/VehicleLoanTypes';
import VehicleLoanProcess from './components/VehicleLoanProcess';
import VehicleLoanCalculator from './components/VehicleLoanCalculator';
import VehicleLoanEligibility from './components/VehicleLoanEligibility';
import VehicleLoanFAQ from './components/VehicleLoanFAQ';

export default function VehicleLoanPage() {
    const handleApplyClick = () => {
        // Handle scrolling to the form or opening a modal
        const formElement = document.getElementById('apply-now-form');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCalculateClick = () => {
        // Scroll to calculator section
        const calcElement = document.getElementById('calculator');
        if (calcElement) calcElement.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-gray-50 overflow-x-hidden pt-16">
            <VehicleLoanHero
                onApplyClick={handleApplyClick}
                onCalculateClick={handleCalculateClick}
            />
            <VehicleLoanTypes />
            <VehicleLoanCalculator />
            <VehicleLoanFeatures />
            <VehicleLoanProcess />
            <VehicleLoanEligibility />
            <VehicleLoanFAQ />
        </main>
    );
}
