"use client";
import React from 'react';
import { CheckCircle, Briefcase, Calendar, CreditCard, ArrowRight } from 'lucide-react';

interface EligibilityCriteriaProps {
    openForm: () => void;
}

export default function EligibilityCriteria({ openForm }: EligibilityCriteriaProps) {
    const criteria = [
        {
            icon: Briefcase,
            title: 'Employment Status',
            desc: 'Salaried employee with a reputed public, private or multinational company.'
        },
        {
            icon: Calendar,
            title: 'Age Requirements',
            desc: 'Between 21 and 60 years of age.'
        },
        {
            icon: CreditCard,
            title: 'Monthly Income',
            desc: 'Minimum net monthly income of ₹15,000.'
        },
        {
            icon: CheckCircle,
            title: 'CIBIL Score',
            desc: 'A healthy credit score of 700 or above for quick approval.'
        }
    ];

    const documents = [
        'PAN Card / Aadhaar Card',
        '3 Months Salary Slips',
        '6 Months Bank Statement',
        'Passport Size Photograph',
        'Current Address Proof',
        'Company ID Card'
    ];

    return (
        <section className="py-12 md:py-20 bg-white font-sans" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        Easy Eligibility & Documents
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                        We ensure minimal documentation and flexible eligibility criteria so you can get your loan without the hassle.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 mb-12 md:mb-16 text-left">
                    {/* Eligibility Criteria */}
                    <div className="lg:w-1/2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 border-b pb-3">Eligibility Criteria</h3>
                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                            {criteria.map((item, idx) => (
                                <div key={idx} className="bg-blue-50/50 p-5 md:p-6 rounded-xl border border-blue-100 flex flex-col items-start text-left">
                                    <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-[#2076C7] mb-4 shadow-sm shrink-0">
                                        <item.icon size={18} />
                                    </div>
                                    <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">{item.title}</h4>
                                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Documents Required */}
                    <div className="lg:w-1/2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 border-b pb-3">Documents Required</h3>
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                            <p className="text-sm md:text-base text-gray-600 mb-6 font-medium">
                                Keep these handy for faster processing:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 mb-8">
                                {documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center text-left">
                                        <CheckCircle className="text-[#1CADA3] mr-2.5 shrink-0" size={18} />
                                        <span className="text-gray-800 font-medium text-xs md:text-sm leading-tight">{doc}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg text-[11px] md:text-sm text-teal-800 flex items-start">
                                <span className="font-bold mr-2 text-[#1CADA3] shrink-0">Note:</span>
                                <span>Existing customers may require less documentation for top-up loans.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center px-4">
                    <button
                        onClick={openForm}
                        suppressHydrationWarning
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1CADA3] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-bold shadow-lg shadow-teal-500/30 hover:bg-[#2076C7] hover:-translate-y-1 transition-all text-base md:text-lg"
                    >
                        Check Your Eligibility Now <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
