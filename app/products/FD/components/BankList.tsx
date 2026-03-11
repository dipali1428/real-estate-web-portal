"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, X } from 'lucide-react';
import { bankData, BankCategory, Bank } from '../data/mockData';
import { useModal } from '@/app/context/ModalContext';

const BankList = () => {
    const { openLogin } = useModal();
    const [openCategory, setOpenCategory] = useState<string | null>(bankData[0].category);
    const [activeTenure, setActiveTenure] = useState<keyof Bank['tenures']>('medium');
    const [selectedBanks, setSelectedBanks] = useState<Bank[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const isFirstMount = useRef(true);
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleSelectBank = (bank: Bank) => {
        setSelectedBanks(prev => {
            const isSelected = prev.some(b => b.name === bank.name);
            if (isSelected) {
                return prev.filter(b => b.name !== bank.name);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, bank];
        });
    };

    // Calculate Maturity Details for comparison
    const calculateFD = (rateStr: string, tenureKey: keyof Bank['tenures']) => {
        if (!rateStr || rateStr === '-') return { maturity: '-', earned: '-' };
        const rate = parseFloat(rateStr.replace('%', ''));
        if (isNaN(rate)) return { maturity: '-', earned: '-' };

        let years = 1;
        if (tenureKey === 'short') years = 0.5;
        if (tenureKey === 'medium') years = 2;
        if (tenureKey === 'long') years = 4;
        if (tenureKey === 'mega') years = 6;

        const principal = 100000;
        const maturityAmount = principal * Math.pow((1 + (rate / 100) / 4), 4 * years);
        const interestEarned = maturityAmount - principal;

        return {
            maturity: `₹${Math.round(maturityAmount).toLocaleString('en-IN')}`,
            earned: `₹${Math.round(interestEarned).toLocaleString('en-IN')}`
        };
    };

    const toggleCategory = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (openCategory && categoryRefs.current[openCategory]) {
            setTimeout(() => {
                const element = categoryRefs.current[openCategory];
                if (element) {
                    const offset = 100; // Height of fixed navbar + some padding
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 150);
        }
    }, [openCategory]);

    const tenureBuckets: { id: keyof Bank['tenures']; label: string }[] = [
        { id: 'short', label: '< 1 Year' },
        { id: 'medium', label: '1 - 3 Years' },
        { id: 'long', label: '3 - 5 Years' },
        { id: 'mega', label: '5+ Years' },
    ];

    return (
        <div className="w-full font-sans">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                    Compare FD Rates Across Banks
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Select your preferred tenure to see the most accurate interest rates.
                </p>
            </div>

            {/* Tenure Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {tenureBuckets.map((tenure) => (
                    <button
                        key={tenure.id as string}
                        onClick={() => setActiveTenure(tenure.id)}
                        className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 border-2 ${activeTenure === tenure.id
                            ? 'text-white shadow-lg scale-105 border-transparent'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400/30 hover:bg-gray-50'
                            }`}
                        style={activeTenure === tenure.id ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                    >
                        {tenure.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-6">
                {bankData.map((section: BankCategory, idx: number) => (
                    <div
                        key={idx}
                        ref={(el) => { categoryRefs.current[section.category] = el; }}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <button
                            onClick={() => toggleCategory(section.category)}
                            className={`w-full px-6 md:px-8 py-4 md:py-5 flex justify-between items-center transition-all ${openCategory === section.category
                                ? ''
                                : 'bg-white text-slate-700 hover:bg-gray-50'
                                }`}
                            style={openCategory === section.category ? { background: 'linear-gradient(to right, #2076C7, #1CADA3)', color: 'white' } : {}}
                        >
                            <h4 className="text-lg md:text-xl font-bold flex items-center gap-3" style={openCategory === section.category ? { color: 'white' } : {}}>
                                {section.category}
                            </h4>
                            {openCategory === section.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {openCategory === section.category && (
                            <div className="p-4 md:p-8">
                                {/* Desktop Table View */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full min-w-[700px]">
                                        <thead>
                                            <tr className="border-b-2 border-gray-100 text-left">
                                                <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Bank Name</th>
                                                <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Regular Rate</th>
                                                <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Senior Citizen</th>
                                                <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Special Offer</th>
                                                <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider w-24 text-center">Compare</th>
                                                <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {section.banks.map((bank: Bank, bIdx: number) => {
                                                const isSelected = selectedBanks.some(b => b.name === bank.name);
                                                const isMaxSelected = selectedBanks.length >= 3;
                                                const isDisabled = !isSelected && isMaxSelected;

                                                return (
                                                    <tr key={bIdx} className={`group hover:bg-blue-50/50 transition-colors animate-fade-in ${isSelected ? 'bg-blue-50/30' : ''}`}>
                                                        <td className="py-5 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                                                                    <CheckCircle2 size={16} />
                                                                </div>
                                                                <div className="font-bold text-slate-700 group-hover:text-[#2076C7] transition-colors text-lg tracking-tight">{bank.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-4 text-slate-800 font-bold text-lg tracking-tight">
                                                            {bank.tenures?.[activeTenure]?.rate || '-'}
                                                        </td>
                                                        <td className="py-5 px-4">
                                                            <span className="text-slate-800 font-bold text-lg tracking-tight">{bank.tenures?.[activeTenure]?.senior || '-'}</span>
                                                        </td>
                                                        <td className="py-5 px-4">
                                                            {bank.specialRate ? (
                                                                <span className="text-teal-600 font-bold bg-teal-50 px-3 py-1.5 rounded-lg text-xs border border-teal-100 block w-fit shadow-sm">
                                                                    {bank.specialRate}
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400 text-xs">-</span>
                                                            )}
                                                        </td>
                                                        <td className="py-5 px-4 text-center">
                                                            <div className="flex items-center justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() => handleSelectBank(bank)}
                                                                    disabled={isDisabled}
                                                                    className="w-5 h-5 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3] accent-[#1CADA3] disabled:opacity-50 cursor-pointer"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-4 text-center">
                                                            <button
                                                                onClick={openLogin}
                                                                className="text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
                                                                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                                            >
                                                                Apply Now
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile/Tablet Card View */}
                                <div className="lg:hidden space-y-4">
                                    {section.banks.map((bank: Bank, bIdx: number) => {
                                        const isSelected = selectedBanks.some(b => b.name === bank.name);
                                        const isMaxSelected = selectedBanks.length >= 3;
                                        const isDisabled = !isSelected && isMaxSelected;

                                        return (
                                            <div key={bIdx} className={`p-5 rounded-2xl border transition-all ${isSelected ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-white border-gray-100'}`}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                                                            <CheckCircle2 size={16} />
                                                        </div>
                                                        <h5 className="font-bold text-slate-700 text-lg">{bank.name}</h5>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] uppercase font-bold text-gray-400 mr-1">Compare</span>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleSelectBank(bank)}
                                                            disabled={isDisabled}
                                                            className="w-6 h-6 rounded border-gray-300 text-[#1CADA3] focus:ring-[#1CADA3] accent-[#1CADA3] disabled:opacity-50 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Regular Rate</p>
                                                        <p className="text-xl font-extrabold text-slate-800">{bank.tenures?.[activeTenure]?.rate || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Senior Citizen</p>
                                                        <p className="text-xl font-extrabold text-slate-800">{bank.tenures?.[activeTenure]?.senior || '-'}</p>
                                                    </div>
                                                    {bank.specialRate && (
                                                        <div className="col-span-2">
                                                            <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">Special Offer</p>
                                                            <span className="text-teal-600 font-bold bg-teal-50 px-3 py-1.5 rounded-lg text-xs border border-teal-100 block w-fit">
                                                                {bank.specialRate}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={openLogin}
                                                    className="w-full text-white font-bold text-sm py-3 rounded-xl shadow-md active:scale-[0.98] transition-all"
                                                    style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                                >
                                                    Apply Now
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Section Action Bar for Comparison */}
            {selectedBanks.length > 0 && (
                <div className="sticky bottom-6 z-40 px-4 md:px-0">
                    <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in-up">
                        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                                <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Selected ({selectedBanks.length}/3):</span>
                                <div className="flex gap-2">
                                    {selectedBanks.map((bank, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 whitespace-nowrap">
                                            <span className="text-xs font-bold text-[#2076C7]">{bank.name}</span>
                                            <button onClick={() => handleSelectBank(bank)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => setSelectedBanks([])}
                                    className="text-gray-500 font-bold text-xs hover:text-gray-800 transition-colors px-2 whitespace-nowrap"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setIsCompareModalOpen(true)}
                                    disabled={selectedBanks.length < 2}
                                    className={`font-bold text-xs md:text-sm px-6 md:px-8 py-3 rounded-xl shadow-lg transition-all transform w-full sm:w-auto ${selectedBanks.length < 2
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                        : 'text-white hover:-translate-y-0.5 active:scale-95'
                                        }`}
                                    style={selectedBanks.length >= 2 ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                                >
                                    Compare {selectedBanks.length >= 2 ? `(${selectedBanks.length})` : '(Min. 2)'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comparison Modal */}
            {
                isCompareModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-6">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsCompareModalOpen(false)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col animate-fade-in-up">
                            {/* Header */}
                            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-extrabold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Compare FD Rates</h3>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                        <p className="text-[10px] md:text-sm text-gray-500 font-medium whitespace-nowrap">Investment: <span className="font-bold text-gray-700">₹1,00,000</span></p>
                                        <span className="hidden md:inline text-gray-300">|</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] md:text-sm text-gray-500 font-medium">Tenure:</span>
                                            <select
                                                value={activeTenure}
                                                onChange={(e) => setActiveTenure(e.target.value as keyof Bank['tenures'])}
                                                className="text-[10px] md:text-sm font-bold text-teal-600 bg-white border border-teal-100 rounded-md px-1 md:px-2 py-0.5 md:py-1 outline-none cursor-pointer"
                                            >
                                                {tenureBuckets.map(t => (
                                                    <option key={t.id} value={t.id}>{t.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsCompareModalOpen(false)}
                                    className="p-1.5 md:p-2 bg-white rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all shadow-sm border border-gray-200"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Comparison Table */}
                            <div className="overflow-x-auto p-4 md:p-8">
                                <div className="min-w-[600px] md:min-w-[800px]">
                                    <table className="w-full border border-gray-200 rounded-xl md:rounded-2xl overflow-hidden border-separate border-spacing-0">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="p-4 md:p-6 text-left text-gray-700 font-bold border-b border-r border-gray-200 w-1/4">Institution</th>
                                                {selectedBanks.map((bank, i) => (
                                                    <th key={i} className={`p-4 md:p-6 text-center border-b border-gray-200 ${i !== selectedBanks.length - 1 ? 'border-r' : ''} ${selectedBanks.length === 2 ? 'w-[37.5%]' : 'w-1/4'}`}>
                                                        <h4 className="text-sm md:text-base font-extrabold text-teal-500 leading-tight">{bank.name}</h4>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {/* Interest Rate */}
                                            <tr className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-4 md:p-6 text-xs md:text-sm text-slate-700 font-bold border-r border-gray-200">Interest Rate</td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className={`p-4 md:p-6 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                                        <span className="text-sm md:text-base font-extrabold text-slate-700">{bank.tenures?.[activeTenure]?.rate || '-'}</span>
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* Maturity Amount */}
                                            <tr className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-4 md:p-6 text-xs md:text-sm text-slate-700 font-bold border-r border-gray-200">Maturity*</td>
                                                {selectedBanks.map((bank, i) => {
                                                    const calc = calculateFD(bank.tenures?.[activeTenure]?.rate || '', activeTenure);
                                                    return (
                                                        <td key={i} className={`p-4 md:p-6 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                                            <span className="text-xs md:text-base font-extrabold text-teal-600 bg-teal-50 px-2 md:px-4 py-1.5 md:py-2 rounded-lg">{calc.maturity}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Interest Earned */}
                                            <tr className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-4 md:p-6 text-xs md:text-sm text-slate-700 font-bold border-r border-gray-200">Gain*</td>
                                                {selectedBanks.map((bank, i) => {
                                                    const calc = calculateFD(bank.tenures?.[activeTenure]?.rate || '', activeTenure);
                                                    return (
                                                        <td key={i} className={`p-4 md:p-6 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                                            <span className="text-xs md:text-base font-extrabold text-teal-600 bg-teal-50 px-2 md:px-4 py-1.5 md:py-2 rounded-lg">{calc.earned}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Senior Citizen Rate */}
                                            <tr className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-4 md:p-6 text-xs md:text-sm text-slate-700 font-bold border-r border-gray-200">Sr. Citizen</td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className={`p-4 md:p-6 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                                        <span className="text-sm md:text-base font-bold text-slate-700">{bank.tenures?.[activeTenure]?.senior || '-'}</span>
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* Row 6: Bank A/c Required */}
                                            <tr className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-4 md:p-6 text-xs md:text-sm text-slate-700 font-bold border-r border-gray-200">A/c Required</td>
                                                {selectedBanks.map((bank, i) => {
                                                    const isNBFC = bankData.find(c => c.category === "NBFCs")?.banks.some(b => b.name === bank.name);
                                                    return (
                                                        <td key={i} className={`p-4 md:p-6 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                                            <span className="text-xs md:text-sm font-semibold text-slate-600">{isNBFC ? 'No' : 'Savings'}</span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {/* Action */}
                                            <tr className="hover:bg-gray-50/30 transition-colors">
                                                <td className="p-4 md:p-6 border-r border-gray-200"></td>
                                                {selectedBanks.map((bank, i) => (
                                                    <td key={i} className={`p-4 md:p-6 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-200' : ''}`}>
                                                        <button
                                                            onClick={openLogin}
                                                            className="w-full text-white font-bold text-xs md:text-base px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                                            style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                                        >
                                                            Apply
                                                        </button>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p className="mt-4 text-[10px] text-gray-400 italic">* Maturity amounts are indicative and calculated based on quarterly compounding.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default BankList;
