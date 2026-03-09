"use client";
import React, { useState } from 'react';
import { X, Landmark, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface Bank {
    name: string;
    color: string;
    idealProfile: string;
    description: string;
}

const partnerBanks: Bank[] = [
    {
        name: 'ADITYA BIRLA FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Salaried professionals with ₹25k+ monthly income.',
        description: 'Instant digital processing with minimal documentation and attractive interest rates.'
    },
    {
        name: 'AXIS BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Salaried employees and self-employed professionals.',
        description: 'Multi-purpose loans with flexible tenures and quick disbursal into bank accounts.'
    },
    {
        name: 'AXIS FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Individuals looking for structured debt solutions.',
        description: 'Customized personal credit lines with competitive processing fees.'
    },
    {
        name: 'BAJAJ FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Individuals with a strong repayment track record.',
        description: 'Fastest approval cycle in the industry with minimal eligibility hurdles.'
    },
    {
        name: 'BANDHAN BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Micro-entrepreneurs and mid-income salaried individuals.',
        description: 'Doorstep service options and simplified documentation for quick onboarding.'
    },
    {
        name: 'CHOLAMANDALAM',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Tier 2/3 city residents and self-employed businessmen.',
        description: 'Deep rural and semi-urban reach with personalized local support.'
    },
    {
        name: 'CREDIT SAISON',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'New-to-credit customers and young tech professionals.',
        description: 'Digital-first credit assessment using advanced AI for rapid approvals.'
    },
    {
        name: 'HSBC BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'High-net-worth individuals and MNC employees.',
        description: 'Premium global banking standards with attractive rates for prime customers.'
    },
    {
        name: 'ICICI BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Confirmed employees of top-tier private and public companies.',
        description: 'Zero physical documentation and competitive interest rates for prime customers.'
    },
    {
        name: 'HDFC BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'HDFC salary account holders and corporate employees.',
        description: 'Pre-approved offers with instant disbursal for existing customers.'
    },
    {
        name: 'INDUSIND BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Salaried individuals with a minimum income of ₹25,000.',
        description: 'Easy online application with the privilege of choosing your own loan tenure.'
    },
    {
        name: 'IDFC FIRST BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Young professionals and first-time loan seekers.',
        description: 'Simplified digital journey with transparent processing and no hidden costs.'
    },
    {
        name: 'KOTAK MAHINDRA',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'MNC employees and government officials.',
        description: 'Special rates for corporate employees with convenient online application.'
    },
    {
        name: 'FIBE (EARLYSALARY)',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Young tech-savvy professionals seeking instant short-term credit.',
        description: 'Paperless 5-minute process for salary advances and medical emergencies.'
    },
    {
        name: 'FINNABLE CREDIT',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Salaried individuals with income starting from ₹15,000.',
        description: 'Focus on speed and transparency for essential credit needs.'
    },
    {
        name: 'INCRED FINANCIAL',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Education and personal loan seekers with flexible credit history.',
        description: 'Personalized risk assessment that looks beyond just the credit score.'
    },
    {
        name: 'L&T FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Two-wheeler and micro-loan customers seeking top-ups.',
        description: 'Backed by engineering legacy with a focus on ease and efficiency.'
    },
    {
        name: 'MUTHOOT FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Customers seeking quick credit against established track records.',
        description: 'Trusted nationwide network with a focus on gold and personal credit.'
    },
    {
        name: 'MANBA FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Self-employed individuals and micro-enterprises.',
        description: 'Simplified lending for the unorganized sector and emerging businesses.'
    },
    {
        name: 'POONAWALLA FINCORP',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Doctors, CAs, and high-income salaried professionals.',
        description: 'Unsecured loans up to ₹30 Lakhs with zero hidden charges.'
    },
    {
        name: 'MAS FINANCIAL SERVICES',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Lower and middle-income segments in urban and semi-urban areas.',
        description: 'Focused financial inclusion with high emphasis on relationship management.'
    },
    {
        name: 'PIRAMAL CAPITAL',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Multi-category loan seekers with specific funding goals.',
        description: 'Innovative credit solutions with a fast-track processing system.'
    },
    {
        name: 'PREFR (CREDIT VIDYA)',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Salaried customers of mid-market companies.',
        description: 'Fully digital end-to-end journey with algorithm-based approvals.'
    },
    {
        name: 'SHRIRAM FINANCE',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Transport operators and small business owners.',
        description: 'Vast physical network for personalized service across India.'
    },
    {
        name: 'SMFG INDIA CREDIT',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Wide range of customers from self-employed to large corporates.',
        description: 'Flexible repayment structures and competitive interest rates.'
    },
    {
        name: 'TATA CAPITAL',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Professionals looking for high loan amounts up to ₹35L.',
        description: 'End-to-end digital process with personalized loan solutions.'
    },
    {
        name: 'THE SOUTH INDIAN BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'NRIs and native South Indian business communities.',
        description: 'Tradition of trust combined with modern technology-enabled banking.'
    },
    {
        name: 'UTKARSH SMALL FINANCE BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Under-banked segments with consistent savings habits.',
        description: 'Empowering the grassroots level with accessible financial products.'
    },
    {
        name: 'YES BANK',
        color: 'bg-teal-50 text-[#1CADA3]',
        idealProfile: 'Tech-enabled businesses and high-salaried professionals.',
        description: 'Smart personal loan products with customized interest rate offers.'
    }
];

interface BankSelectionModalProps {
    onClose: () => void;
    onApply: (bankName: string) => void;
    initialBankName?: string;
}

export default function BankSelectionModal({ onClose, onApply, initialBankName }: BankSelectionModalProps) {
    const [selectedBank, setSelectedBank] = useState<Bank | null>(() => {
        if (initialBankName) {
            return partnerBanks.find(b => b.name === initialBankName) || null;
        }
        return null;
    });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
                {/* Header */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight font-sans">
                            {selectedBank ? 'Partner Details' : 'Choose Your Preferred Partner'}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider mt-1 font-sans">
                            {selectedBank ? selectedBank.name : 'Select a bank to view specific offers & details'}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-gray-50/30">
                    {!selectedBank ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                            {partnerBanks.map((bank, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedBank(bank)}
                                    className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl hover:border-[#1CADA3]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${bank.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                                        <Landmark size={24} strokeWidth={1.5} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="font-black text-gray-800 text-xs md:text-sm uppercase tracking-tight truncate font-sans">
                                            {bank.name}
                                        </h4>
                                        <span className="text-[10px] text-[#1CADA3] font-bold">View Details →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto animate-in slide-in-from-right duration-300">
                            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-lg">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className={`w-16 h-16 rounded-2xl ${selectedBank.color} flex items-center justify-center shrink-0`}>
                                        <Landmark size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#2076C7] transition-colors font-sans">{selectedBank.name}</h3>
                                        <div className="flex items-center gap-2 text-[#1CADA3] text-sm font-bold mt-1">
                                            <ShieldCheck size={16} /> Verified Lending Partner
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <div className="p-5 bg-teal-50/50 rounded-2xl border border-teal-100/50">
                                        <h4 className="text-[#1CADA3] font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <CheckCircle2 size={14} /> Ideal Profile
                                        </h4>
                                        <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                                            {selectedBank.idealProfile}
                                        </p>
                                    </div>

                                    <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                        <h4 className="text-[#2076C7] font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Zap size={14} className="fill-current" /> Key Features
                                        </h4>
                                        <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                                            {selectedBank.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => onApply(selectedBank.name)}
                                        className="flex-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 font-sans"
                                    >
                                        Proceed with <span className="font-sans ml-1 mr-1">{selectedBank.name.split(' ')[0]}</span> <ArrowRight size={22} />
                                    </button>
                                    <button
                                        onClick={() => setSelectedBank(null)}
                                        className="px-8 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Warning */}
                <div className="p-5 bg-gray-50 border-t border-gray-100 text-center shrink-0">
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
                        Your Data is Protected with 256-bit AES Encryption
                    </p>
                </div>
            </div>
        </div>
    );
}
