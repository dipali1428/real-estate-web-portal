'use client';

import { FileText, UserCheck, CreditCard, Send, CheckSquare } from 'lucide-react';

export default function ApplicationProcess() {
    const steps = [
        {
            icon: <UserCheck className="w-6 h-6 text-white" />,
            title: "Registration",
            desc: "Visit the NPS portal of Infinity Arthvishwa and click on new registration."
        },
        {
            icon: <FileText className="w-6 h-6 text-white" />,
            title: "KYC Details",
            desc: "Enter your Aadhaar or PAN details for KYC verification. authentications via OTP."
        },
        {
            icon: <CheckSquare className="w-6 h-6 text-white" />,
            title: "Fill Application",
            desc: "Provide personal details, bank info, and nomination. Select Pension Fund Manager & Asset Allocation."
        },
        {
            icon: <CreditCard className="w-6 h-6 text-white" />,
            title: "Payment",
            desc: "Make the initial contribution (Min ₹500) through Net Banking/Debit/Credit Card/UPI."
        },
        {
            icon: <Send className="w-6 h-6 text-white" />,
            title: "PRAN Generation",
            desc: "PRAN (Permanent Retirement Account Number) is generated instantly related to your account."
        }
    ];

    return (
        <section id="application-process" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm pb-2">
                        Process to Apply
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="mt-4 text-slate-800">
                        Open your NPS account in 5 simple steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10 px-12"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-800 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}
