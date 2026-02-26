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
        <section className="py-16 md:py-24 bg-neutral-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 tracking-tight">
                        Detailed Provider Comparison
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 font-bold max-w-2xl mx-auto px-4">
                        A feature-by-feature technical breakdown of India's leading marine insurers
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
                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                                    <CheckCircle2 size={12} strokeWidth={3} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Yes</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-500 border border-rose-100/50">
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
                <div className="hidden lg:block overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-2xl bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
                    <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-white relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#2076C7]/5 flex items-center justify-center text-[#2076C7] shadow-inner">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-[0.15em] leading-none mb-2">Technical Feature Matrix</h3>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Comparing India's top 5 market leaders side-by-side</p>
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center gap-3">
                            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100/50">Verified Data</span>
                        </div>
                        {/* Subtle Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-blue-50/50 to-transparent pointer-events-none" />
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left bg-white border-collapse">
                            <thead>
                                <tr className="bg-neutral-50/80">
                                    <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 border-b border-gray-100 bg-neutral-50/80 sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                        Feature Set
                                    </th>
                                    {comparisonData.headers.slice(1).map((header, i) => (
                                        <th key={i} className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-600 text-center border-b border-gray-100 min-w-[200px]">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {comparisonData.features.map((feature, i) => (
                                    <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-10 py-8 border-r border-gray-50 bg-white sticky left-0 z-10 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.08)] group-hover:bg-blue-50/10 transition-colors">
                                            <span className="font-bold text-gray-700 text-[13px] uppercase tracking-tight">{feature.name}</span>
                                        </td>
                                        {['icici', 'tata', 'hdfc', 'bajaj', 'sbi'].map((key) => (
                                            <td key={key} className="px-10 py-8 text-center bg-white group-hover:bg-blue-50/10 transition-colors">
                                                {feature[key as keyof typeof feature] ? (
                                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 shadow-sm ring-4 ring-emerald-50/50 group-hover:scale-110 transition-transform">
                                                        <CheckCircle2 size={18} strokeWidth={2.5} />
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-rose-50 text-rose-400 shadow-sm ring-4 ring-rose-50/50 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                                                        <X size={18} strokeWidth={2.5} />
                                                    </div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend Section */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 px-4 py-6 bg-white border border-gray-100 rounded-2xl shadow-sm lg:hidden md:flex">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feature Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partial / Not Available</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarineInsuranceTable;
