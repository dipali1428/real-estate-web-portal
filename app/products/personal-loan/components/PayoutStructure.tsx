"use client";
import React, { useState } from 'react';
import { Landmark, ChevronDown, ChevronUp } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';

interface PayoutStructureProps {
    openBankModal?: (bankName: string) => void;
}

export default function PayoutStructure({ openBankModal }: PayoutStructureProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { openLogin } = useModal();

    const partnerBanks = [
        { name: 'ADITYA BIRLA FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'AXIS BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'AXIS FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'BAJAJ FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'BANDHAN BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'CHOLAMANDALAM', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'CREDIT SAISON', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'HSBC BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'ICICI BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'HDFC BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'INDUSIND BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'IDFC FIRST BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'KOTAK MAHINDRA', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'FIBE (EARLYSALARY)', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'FINNABLE CREDIT', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'INCRED FINANCIAL', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'L&T FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'MUTHOOT FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'MANBA FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'POONAWALLA FINCORP', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'MAS FINANCIAL SERVICES', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'PIRAMAL CAPITAL', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'PREFR (CREDIT VIDYA)', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'SHRIRAM FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'SMFG INDIA CREDIT', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'TATA CAPITAL', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'THE SOUTH INDIAN BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'UTKARSH SMALL FINANCE BANK', color: 'bg-teal-50 text-[#1CADA3]' },
        { name: 'YES BANK', color: 'bg-teal-50 text-[#1CADA3]' }
    ];

    const displayBanks = isExpanded ? partnerBanks : partnerBanks.slice(0, 8);

    return (
        <section className="py-12 md:py-20 bg-[#f8fbff] font-sans" id="payout-structure" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                {/* Main Heading for the Section */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
                        Our Partner Banks
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 font-medium">Choose from our wide network of trusted financial partners</p>
                </div>

                {/* Partner Bridge Card */}
                <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100">

                    {/* Inner Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12 gap-6">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-3">
                                <span className="w-[1.5px] h-4 bg-gray-300 hidden sm:block"></span>
                                <p className="text-[10px] md:text-xs text-gray-400 font-extrabold uppercase tracking-[0.15em] leading-none">
                                    Trusted by Millions Across India
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            suppressHydrationWarning
                            className="bg-[#f0f7ff] text-[#2076C7] px-5 md:px-7 py-2.5 md:py-3 rounded-full font-bold text-[10px] md:text-xs flex items-center gap-2 hover:bg-[#2076C7] hover:text-white transition-all shadow-sm shrink-0 uppercase tracking-wider"
                        >
                            {isExpanded ? 'Show Less' : `View All ${partnerBanks.length} Partners`}
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    </div>

                    {/* Bank Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {displayBanks.map((bank, idx) => (
                            <div
                                key={idx}
                                onClick={() => openLogin()}
                                className="group bg-white rounded-2xl md:rounded-3xl border border-gray-50 p-4 md:p-5 flex items-center gap-4 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl ${bank.color} flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110`}>
                                    <Landmark className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                                </div>
                                <span className="font-extrabold text-gray-700 text-[11px] md:text-xs uppercase tracking-tight group-hover:text-[#2076C7] transition-colors leading-tight font-sans">
                                    {bank.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 pt-8 border-t border-gray-50 flex justify-center">
                        <p className="text-xs md:text-sm text-gray-400 font-medium">
                            Explore customized offers from over <span className="text-[#1CADA3] font-black">50+ Lenders</span> through our platform.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}