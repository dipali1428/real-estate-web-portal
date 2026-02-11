'use client';

import { useState } from 'react';
import { TrendingUp, ShieldCheck, Clock, Banknote, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const Comparison = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const detailedComparison = [
        { feature: "Returns (Annually)", fd: "6.50% - 7.50%", ncd: "9.00% - 11.00%" },
        { feature: "Safety", fd: "DICGC Insured (Max ₹5L)", ncd: "1.25x - 1.5x Asset Backed" },
        { feature: "Liquidity", fd: "Low (Penalty on withdrawal)", ncd: "High (Tradeable on Exchange)" },
        { feature: "Taxation", fd: "TDS Deducted > ₹40k/yr", ncd: "No TDS on Demat Holdings" },
        { feature: "Tenure", fd: "Flexible (7 days - 10 yrs)", ncd: "Fixed (24 - 60 Months)" },
    ];

    return (
        <section className="py-12 bg-white" id="comparison">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        NCDs vs Fixed Deposits
                    </h2>
                    <div className="w-20 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-sm md:text-lg text-gray-600 font-medium">
                        See why modern investors are shifting to NCDs for better inflation-beating returns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
                    {/* Fixed Deposits Card */}
                    <div className="bg-gray-50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 flex flex-col relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 right-0 px-4 py-1.5 md:px-6 md:py-2 bg-gray-200 text-gray-600 font-bold rounded-bl-2xl text-[10px] uppercase tracking-wider">
                            Traditional
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 flex items-center gap-3">
                            <Banknote className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                            Bank Fixed Deposit
                        </h3>

                        <div className="space-y-6 grow">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white shrink-0 flex items-center justify-center shadow-sm text-gray-400">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase">Returns</p>
                                    <p className="text-xl font-bold text-gray-700">6.50% - 7.50%</p>
                                    <p className="text-xs text-gray-500 mt-1">Often fails to beat high inflation</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white shrink-0 flex items-center justify-center shadow-sm text-gray-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase">Safety</p>
                                    <p className="text-lg font-bold text-gray-700">DICGC Insured</p>
                                    <p className="text-xs text-gray-500 mt-1">Insured up to ₹5 Lakhs only</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white shrink-0 flex items-center justify-center shadow-sm text-gray-400">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase">Liquidity</p>
                                    <p className="text-lg font-bold text-gray-700">Low Liquidity</p>
                                    <p className="text-xs text-gray-500 mt-1">Penalty on premature withdrawal</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NCDs Card - Highlighted */}
                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border-2 border-[#2076C7] flex flex-col relative overflow-hidden shadow-[0_20px_50px_rgba(32,118,199,0.15)] transform md:scale-105 z-10">
                        <div className="absolute top-0 right-0 px-4 py-1.5 md:px-6 md:py-2 bg-[#1CADA3] text-white font-bold rounded-bl-2xl text-[10px] uppercase tracking-wider shadow-lg">
                            Smart Choice
                        </div>
                        {/* Subtle premium gradient overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#F8FBFE] via-white to-[#F0F7FF] -z-10" />

                        <h3 className="text-xl md:text-2xl font-bold text-[#2076C7] mb-6 md:mb-8 flex items-center gap-3 relative z-10">
                            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#1CADA3]" />
                            Secured NCDs
                        </h3>

                        <div className="space-y-6 grow relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] shrink-0 flex items-center justify-center text-[#1CADA3]">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase">Returns</p>
                                    <p className="text-3xl font-black text-[#2076C7]">9.00% - 11.00%</p>
                                    <p className="text-xs text-[#1CADA3] mt-1 font-bold">Beats inflation comfortably</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#E3F2FD] shrink-0 flex items-center justify-center text-[#2076C7]">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase">Safety</p>
                                    <p className="text-lg font-bold text-[#2076C7]">Asset Backed Security</p>
                                    <p className="text-xs text-gray-500 mt-1">1.25x - 1.5x Asset Cover usually provided</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#2076C7]/10 shrink-0 flex items-center justify-center text-[#2076C7]">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase">Liquidity</p>
                                    <p className="text-lg font-bold text-[#2076C7]">High Liquidity</p>
                                    <p className="text-xs text-gray-500 mt-1">Tradeable on NSE/BSE anytime</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full mt-8 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-extrabold rounded-2xl shadow-lg border border-white/10 flex items-center justify-center space-x-2 hover:translate-y-px transition-transform duration-200"
                        >
                            <span>{isExpanded ? "Hide Comparisons" : "Explore Comparisons"}</span>
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Expandable Detailed Comparison Table */}
                {isExpanded && (
                    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                        <div className="bg-gray-50 px-6 md:px-8 py-4 border-b border-gray-100">
                            <h3 className="text-base md:text-lg font-bold text-gray-800">Detailed Comparison</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white border-b border-gray-100">
                                        <th className="px-4 md:px-8 py-4 font-extrabold text-gray-500 uppercase text-[10px] md:text-xs tracking-wider w-1/3">Feature</th>
                                        <th className="px-4 md:px-8 py-4 font-extrabold text-gray-500 uppercase text-[10px] md:text-xs tracking-wider w-1/3">Fixed Deposit</th>
                                        <th className="px-4 md:px-8 py-4 font-extrabold text-[#2076C7] uppercase text-[10px] md:text-xs tracking-wider w-1/3">Secured NCD</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {detailedComparison.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 md:px-8 py-4 font-bold text-gray-700 text-xs md:text-sm">{item.feature}</td>
                                            <td className="px-4 md:px-8 py-4 text-gray-600 font-medium text-xs md:text-sm">{item.fd}</td>
                                            <td className="px-4 md:px-8 py-4 text-[#2076C7] font-bold bg-blue-50/30 text-xs md:text-sm">{item.ncd}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Comparison;



