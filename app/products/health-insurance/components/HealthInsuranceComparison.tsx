'use client';

import React from 'react';
import { Check, X, ShieldCheck, Zap, Activity, HeartPulse, Star } from 'lucide-react';

const comparisonData = {
    plans: [
        { name: "HDFC Optima", premium: "₹499", sumInsured: "2 Cr", hospitals: "13,000+", restoration: "✔", maternity: "Optional", roomRent: "No Limit", color: "#2076C7" },
        { name: "Niva Bupa", premium: "₹450", sumInsured: "1 Cr", hospitals: "10,000+", restoration: "Unlimited", maternity: "✔", roomRent: "No Limit", color: "#2076C7" },
        { name: "ICICI Elevate", premium: "₹520", sumInsured: "3 Cr", hospitals: "9,000+", restoration: "✔", maternity: "Optional", roomRent: "No Limit", color: "#2076C7" },
        { name: "Care Supreme", premium: "₹480", sumInsured: "1 Cr", hospitals: "11,000+", restoration: "Unlimited", maternity: "Optional", roomRent: "No Limit", color: "#2076C7" },
        { name: "Star Health", premium: "₹410", sumInsured: "25 L", hospitals: "14,000+", restoration: "✔", maternity: "✔", roomRent: "Capped", color: "#2076C7" }
    ],
    features: [
        { label: "Starting Premium", key: "premium", icon: <Zap size={16} /> },
        { label: "Sum Insured", key: "sumInsured", icon: <ShieldCheck size={16} /> },
        { label: "Cashless Hospitals", key: "hospitals", icon: <Activity size={16} /> },
        { label: "Restoration", key: "restoration", icon: <HeartPulse size={16} /> },
        { label: "Maternity", key: "maternity", icon: <HeartPulse size={16} /> },
        { label: "Room Rent Limit", key: "roomRent", icon: <Star size={16} /> }
    ]
};

const HealthInsuranceComparison = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Side-by-Side Comparison
                    </h2>
                    <p className="text-xl text-gray-500 font-medium">Compare the top-performing health plans to find your ideal match.</p>
                </div>

                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                                    <th className="p-5 font-bold text-sm uppercase tracking-wider text-white">Plan Feature</th>
                                    {comparisonData.plans.map((plan, idx) => (
                                        <th key={idx} className="p-5 font-bold text-sm uppercase tracking-wider text-white text-center">
                                            {plan.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisonData.features.map((feature, fIdx) => (
                                    <tr key={fIdx} className={`hover:bg-blue-50/50 transition-colors ${fIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-md bg-white border border-gray-100 flex items-center justify-center text-[#2076C7] group-hover:bg-[#2076C7] group-hover:text-white transition-all shadow-sm">
                                                    {feature.icon}
                                                </div>
                                                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                                                    {feature.label}
                                                </span>
                                            </div>
                                        </td>
                                        {comparisonData.plans.map((plan, pIdx) => {
                                            const val = (plan as any)[feature.key];
                                            const isPositive = val === '✔' || val === 'Unlimited' || val === 'No Limit';
                                            const isNagative = val === '❌' || val === 'Capped';

                                            return (
                                                <td key={pIdx} className="px-8 py-6 text-center">
                                                    {val === '✔' ? (
                                                        <div className="flex justify-center">
                                                            <div className="w-6 h-6 rounded-md bg-teal-100 text-[#1CADA3] flex items-center justify-center">
                                                                <Check size={14} strokeWidth={4} />
                                                            </div>
                                                        </div>
                                                    ) : val === '❌' ? (
                                                        <div className="flex justify-center">
                                                            <div className="w-6 h-6 rounded-md bg-red-100 text-red-500 flex items-center justify-center">
                                                                <X size={14} strokeWidth={4} />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className={`text-sm font-semibold leading-tight ${isPositive ? 'text-[#1CADA3]' : isNagative ? 'text-red-500' : 'text-gray-900'}`}>
                                                            {val}
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HealthInsuranceComparison;
