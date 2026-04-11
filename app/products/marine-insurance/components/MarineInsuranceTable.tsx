'use client';

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

const comparisonData = {
    features: [
        { name: "Institute Cargo Clauses (A/B/C)", icici: true, tata: true, hdfc: true, bajaj: true, sbi: true },
        { name: "Digital Claim Process", icici: true, tata: false, hdfc: true, bajaj: false, sbi: true },
        { name: "War & Strike Risk Add-on", icici: true, tata: true, hdfc: false, bajaj: true, sbi: false },
        { name: "Theft & Pilferage Cover", icici: true, tata: true, hdfc: true, bajaj: true, sbi: true },
        { name: "Warehouse-to-Warehouse", icici: true, tata: true, hdfc: false, bajaj: true, sbi: true },
        { name: "Global Coverage", icici: true, tata: true, hdfc: false, bajaj: true, sbi: true },
        { name: "Customizable Clauses", icici: false, tata: true, hdfc: false, bajaj: true, sbi: false },
    ],
    headers: ["Technical Feature", "ICICI Lombard", "Tata AIG", "HDFC ERGO", "Bajaj Allianz", "SBI General"]
};

const MarineInsuranceTable = () => {
    return (
        <section className="py-16 md:py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 tracking-tight">
                        Detailed Provider Comparison
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl mx-auto px-4">
                        A feature-by-feature technical breakdown of India&apos;s leading marine insurers
                    </p>
                </div>

                {/* Tablet & Mobile Card View (Visible up to 1024px) */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                    {comparisonData.headers.slice(1).map((provider, providerIdx) => (
                        <div key={providerIdx} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                            <div className="p-6 md:p-8 bg-neutral-50/50 border-b border-gray-50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{provider}</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Provider Feature Matrix</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-blue-600/5 flex items-center justify-center text-blue-600">
                                    <CheckCircle2 size={20} />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 space-y-5 bg-white flex-grow">
                                {comparisonData.features.map((feature, featureIdx) => {
                                    const providerKey = comparisonData.headers[providerIdx + 1].toLowerCase().replace(' ', '') as keyof typeof feature;
                                    const keyMap: { [key: string]: string } = {
                                        'icicilombard': 'icici',
                                        'tataaig': 'tata',
                                        'hdfcergo': 'hdfc',
                                        'bajajallianz': 'bajaj',
                                        'sbigeneral': 'sbi'
                                    };
                                    const actualKey = keyMap[providerKey] || providerKey;
                                    const hasFeature = feature[actualKey as keyof typeof feature];

                                    return (
                                        <div key={featureIdx} className="flex items-center justify-between py-1 group">
                                            <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{feature.name}</span>
                                            {hasFeature ? (
                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1CADA3]/10 text-[#1CADA3] border border-[#1CADA3]/20">
                                                    <CheckCircle2 size={12} strokeWidth={3} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Yes</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-400 border border-gray-200">
                                                    <X size={12} strokeWidth={3} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">No</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-6 pt-0 bg-white">
                                <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold text-[11px] rounded-xl transition-all uppercase tracking-[0.2em] border border-gray-100">
                                    View Detailed Terms
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View (Visible on screens >= 1024px) */}
                <div className="hidden lg:block overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-2xl bg-white focus-within:ring-4 focus-within:ring-[#1CADA3]/10 transition-all">
                    <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-white relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-xl shadow-[#1CADA3]/20">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-sans font-bold text-gray-900 tracking-[0.1em] leading-none mb-2">Technical Feature Matrix</h3>
                                <p className="text-[11px] text-gray-500 font-bold tracking-widest uppercase">Comparing India&apos;s top 5 market leaders side-by-side</p>
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center gap-3">
                            <span className="px-5 py-2.5 bg-neutral-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-gray-200 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] animate-pulse"></div>
                                Verified Data
                            </span>
                        </div>
                        {/* Subtle Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-[#f8fafd] to-transparent pointer-events-none" />
                    </div>
                    
                    <div className="overflow-x-auto custom-scrollbar pb-2">
                        <table className="w-full text-left bg-white border-collapse">
                            <thead>
                                <tr className="bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                                    <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white border-b border-[#1CADA3]/20 sticky left-0 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.1)] bg-[#2076C7] min-w-[200px]">
                                        Provider
                                    </th>
                                    {comparisonData.features.map((feature, i) => (
                                        <th key={i} className="px-6 py-6 text-[10px] font-bold uppercase tracking-[0.1em] text-white/90 text-center border-b border-[#1CADA3]/20 min-w-[160px] max-w-[180px]">
                                            {feature.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {comparisonData.headers.slice(1).map((provider, providerIdx) => {
                                    const providerKey = provider.toLowerCase().replace(' ', '');
                                    const keyMap: { [key: string]: string } = {
                                        'icicilombard': 'icici',
                                        'tataaig': 'tata',
                                        'hdfcergo': 'hdfc',
                                        'bajajallianz': 'bajaj',
                                        'sbigeneral': 'sbi'
                                    };
                                    const actualKey = keyMap[providerKey] || providerKey;

                                    return (
                                        <tr key={providerIdx} className="hover:bg-[#f8fafd] transition-colors group">
                                            <td className="px-8 py-6 border-r border-gray-50 bg-white sticky left-0 z-10 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.05)] group-hover:bg-[#f8fafd] transition-colors">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 text-[13px] tracking-tight">{provider}</span>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Marine Cover</span>
                                                </div>
                                            </td>
                                            {comparisonData.features.map((feature, featureIdx) => {
                                                const hasFeature = feature[actualKey as keyof typeof feature];
                                                return (
                                                    <td key={featureIdx} className="px-6 py-6 text-center bg-transparent group-hover:bg-[#f8fafd] transition-colors">
                                                        {hasFeature ? (
                                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1CADA3]/10 text-[#1CADA3] ring-1 ring-[#1CADA3]/30 group-hover:scale-110 transition-transform">
                                                                <CheckCircle2 size={16} strokeWidth={3} />
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-300 ring-1 ring-gray-200 group-hover:bg-red-50 group-hover:text-red-300 group-hover:ring-red-100 transition-colors">
                                                                <X size={16} strokeWidth={3} />
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend Section */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 px-4 py-6 bg-white border border-gray-100 rounded-2xl shadow-sm lg:hidden md:flex">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#1CADA3]" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feature Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partial / Not Available</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarineInsuranceTable;
