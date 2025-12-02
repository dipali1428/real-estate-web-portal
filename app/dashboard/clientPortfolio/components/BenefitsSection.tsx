"use client"
import React from 'react';

const BenefitsSection: React.FC = () => {
    const benefits = [
        'Centralized record of all clients and leads',
        'Helps improve follow-up and conversions',
        'Saves time and avoids manual tracking',
        'Gives a full view of monthly and yearly business',
        'Shows which leads require urgent attention',
        'Strengthens customer relationship management'
    ];

    return (
        <div className="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[#2076C7] mb-3 sm:mb-4">Why My Client Portfolio Is Useful for DSAs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                        <div className="shrink-0">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#2076C7] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <p className="ml-2 sm:ml-3 text-xs sm:text-sm text-[#2076C7]">{benefit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BenefitsSection;