'use client';

import { Check, X, Minus, TrendingUp, ShieldCheck, Clock, PiggyBank, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Comparison() {
    const features = [
        {
            icon: TrendingUp,
            label: "Returns",
            nps: "9-12% (Market Linked)",
            ppf: "7.1% (Fixed)",
            fd: "6-7.5% (Fixed)",
            mf: "12-15% (Market Linked)",
            npsHighlight: true
        },
        {
            icon: PiggyBank,
            label: "Tax Benefit (80C)",
            nps: "Yes (1.5L)",
            ppf: "Yes (1.5L)",
            fd: "Yes (5yr Lock-in)",
            mf: "Yes (1.5L)"
        },
        {
            icon: ShieldCheck,
            label: "Addl. Tax Benefit",
            nps: "Yes (50k u/s 80CCD 1B)",
            ppf: "No",
            fd: "No",
            mf: "No",
            npsHighlight: true
        },
        {
            icon: Clock,
            label: "Lock-in Period",
            nps: "Till Retirement (60)",
            ppf: "15 Years",
            fd: "5 Years (Tax saver)",
            mf: "3 Years"
        },
        {
            icon: AlertCircle,
            label: "Risk Profile",
            nps: "Moderate - High",
            ppf: "Low (Govt Backed)",
            fd: "Low",
            mf: "High"
        }
    ];

    return (
        <section className="relative py-20 bg-slate-50 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-teal-100/40 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow tracking-tight pb-1">
                            How NPS Compares
                        </h2>
                        <p className="max-w-2xl mx-auto text-slate-600 font-medium text-lg leading-relaxed">
                            See how National Pension Scheme stands tall against other popular investment options.
                        </p>
                    </motion.div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block relative">
                    <div className="grid grid-cols-5 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl overflow-hidden">

                        {/* Headers */}
                        <div className="contents">
                            <div className="p-8 bg-slate-50/50 border-b border-r border-slate-200/50 font-black text-slate-400 uppercase tracking-widest text-xs flex items-center">
                                Feature
                            </div>
                            <div className="p-8 bg-[#2076C7]/5 border-b border-r border-[#2076C7]/10 text-[#2076C7] font-black text-lg text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#2076C7]/5 animate-pulse" />
                                <span className="relative z-10">NPS (National Pension System)</span>
                            </div>
                            <div className="p-8 bg-white border-b border-r border-slate-200/50 text-slate-700 font-bold text-center flex items-center justify-center">
                                PPF
                            </div>
                            <div className="p-8 bg-white border-b border-r border-slate-200/50 text-slate-700 font-bold text-center flex items-center justify-center">
                                Fixed Deposit
                            </div>
                            <div className="p-8 bg-white border-b border-slate-200/50 text-slate-700 font-bold text-center flex items-center justify-center">
                                Mutual Funds

                            </div>
                        </div>

                        {/* Rows */}
                        {features.map((item, idx) => (
                            <div key={idx} className="contents group">
                                <div className="p-6 pl-8 bg-white/50 border-b border-r border-slate-200/50 flex items-center gap-3 font-bold text-slate-700 group-hover:bg-white transition-colors">
                                    <item.icon className={`w-5 h-5 ${item.npsHighlight ? 'text-[#2076C7]' : 'text-slate-400'}`} />
                                    {item.label}
                                </div>
                                <div className={`p-6 bg-[#2076C7]/5 border-b border-r border-[#2076C7]/10 flex items-center justify-center text-center font-bold text-base ${item.npsHighlight ? 'text-[#2076C7] bg-[#2076C7]/10' : 'text-slate-800'}`}>
                                    {item.npsHighlight && <Check className="w-5 h-5 mr-2" />}
                                    {item.nps}
                                </div>
                                <div className="p-6 bg-white border-b border-r border-slate-200/50 flex items-center justify-center text-center text-slate-600 font-medium group-hover:bg-slate-50/50 transition-colors">
                                    {item.ppf}
                                </div>
                                <div className="p-6 bg-white border-b border-r border-slate-200/50 flex items-center justify-center text-center text-slate-600 font-medium group-hover:bg-slate-50/50 transition-colors">
                                    {item.fd}
                                </div>
                                <div className="p-6 bg-white border-b border-slate-200/50 flex items-center justify-center text-center text-slate-600 font-medium group-hover:bg-slate-50/50 transition-colors">
                                    {item.mf}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile View (Cards) */}
                <div className="grid md:grid-cols-2 gap-6 lg:hidden">
                    {features.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className="p-3 bg-blue-50 rounded-2xl text-[#2076C7]">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-lg">{item.label}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className={`p-4 rounded-2xl ${item.npsHighlight ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg shadow-blue-500/20' : 'bg-slate-50 text-slate-800'}`}>
                                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">NPS</p>
                                    <p className="font-bold text-lg">{item.nps}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="p-2 bg-slate-50 rounded-xl">
                                        <p className="text-[10px] text-slate-400 font-bold mb-1">PPF</p>
                                        <p className="text-sm font-bold text-slate-700 leading-tight">{item.ppf}</p>
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded-xl">
                                        <p className="text-[10px] text-slate-400 font-bold mb-1">FD</p>
                                        <p className="text-sm font-bold text-slate-700 leading-tight">{item.fd}</p>
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded-xl">
                                        <p className="text-[10px] text-slate-400 font-bold mb-1">ELSS</p>
                                        <p className="text-sm font-bold text-slate-700 leading-tight">{item.mf}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <p className="flex items-center gap-2 text-sm text-slate-400 font-semibold bg-white/50 px-4 py-2 rounded-full border border-slate-200/50">
                        <AlertCircle className="w-4 h-4" />
                        Indicative returns based on past market performance
                    </p>
                </div>
            </div>
        </section>
    );
}
