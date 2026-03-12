'use client';

import { strategyDetailsData } from "../utils/StrategyDetailsData";
import { Shield, Target, TrendingUp, Landmark, Info, ArrowUpRight } from 'lucide-react';

interface StrategyDetailsContentProps {
    profileName: keyof typeof strategyDetailsData.profiles;
}

const StrategyDetailsContent = ({ profileName }: StrategyDetailsContentProps) => {
    const profile = strategyDetailsData.profiles[profileName];

    return (
        <div id={`strategy-guide-${profileName}`} className="bg-white p-12 max-w-[850px] mx-auto text-slate-800 font-sans leading-relaxed border border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b-4 border-[#2076C7] pb-8">
                <div>
                    <img
                        src={strategyDetailsData.logoUrl}
                        alt="Infinity Arthvishva Logo"
                        className="h-20 w-auto mb-6"
                    />
                    <h1 className="text-4xl font-black text-[#2076C7] uppercase tracking-tighter">
                        {profile.title}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-[#1CADA3] uppercase tracking-[0.3em] mb-2">Allocation Report</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{strategyDetailsData.company}</p>
                </div>
            </div>

            {/* Profile Highlight */}
            <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Investor</p>
                    <p className="text-xl font-black text-[#0B1C2E]">{profile.target}</p>
                </div>
                <div className="p-6 bg-[#2076C7]/5 rounded-3xl border border-[#2076C7]/10">
                    <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-widest mb-1">Risk Profile</p>
                    <p className="text-xl font-black text-[#2076C7]">{profile.riskProfile}</p>
                </div>
            </div>

            {/* Core Philosophy */}
            <div className="mb-12 p-8 bg-linear-to-br from-[#0B1C2E] to-[#1e293b] rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <Target className="w-7 h-7 text-[#1CADA3]" />
                    Investment Philosophy
                </h2>
                <p className="text-lg text-slate-300 font-medium italic leading-relaxed">
                    "{profile.philosophy}"
                </p>
            </div>

            {/* Suggested Allocation Chart (Textual Represention for PDF) */}
            <div className="mb-12">
                <h2 className="text-2xl font-black text-[#0B1C2E] mb-6 border-l-8 border-[#1CADA3] pl-4">
                    Master Asset Allocation
                </h2>
                <div className="p-8 border-2 border-slate-100 rounded-[2.5rem] bg-slate-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-black text-[#2076C7] mb-4">
                            {profile.allocation}
                        </div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Balanced Portfolio Weightage</p>
                    </div>
                </div>
            </div>

            {/* Forced Page Break for 2-page Guide */}
            <div className="hidden print:block" style={{ pageBreakAfter: 'always' }}></div>

            {/* Focus Strategic Areas */}
            <div className="mb-12 space-y-6">
                <h2 className="text-2xl font-black text-[#0B1C2E] mb-8 border-l-8 border-[#2076C7] pl-4">
                    Key Implementation Pillars
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {profile.focusAreas.map((area, idx) => (
                        <div key={idx} className="flex gap-5 items-start p-6 bg-white border border-slate-100 rounded-2xl shadow-sm" style={{ pageBreakInside: 'avoid' }}>
                            <ArrowUpRight className="w-8 h-8 text-[#1CADA3] shrink-0" />
                            <p className="text-lg font-bold text-slate-700">{area}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Common Section */}
            <div className="p-8 bg-[#1CADA3]/5 border-2 border-dashed border-[#1CADA3]/30 rounded-[3rem] text-center mb-12" style={{ pageBreakInside: 'avoid' }}>
                <h3 className="text-xl font-black text-[#0B1C2E] mb-3">{strategyDetailsData.commonSections[0].title}</h3>
                <p className="text-slate-600 font-bold italic">{strategyDetailsData.commonSections[0].content}</p>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t-2 border-slate-100 text-center" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex justify-center gap-8 mb-6 opacity-40">
                    <Shield className="w-8 h-8" />
                    <Landmark className="w-8 h-8" />
                    <TrendingUp className="w-8 h-8" />
                </div>
                <p className="text-xs text-slate-400 font-black uppercase tracking-[0.4em] mb-4">
                    Professional Strategy Dossier
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="text-[10px] text-slate-500 font-medium leading-loose max-w-2xl mx-auto italic">
                        {strategyDetailsData.disclaimer}
                    </p>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: A4;
                    }
                    html, body {
                        height: auto !important;
                        overflow: visible !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }
                    body * {
                        visibility: hidden !important;
                    }
                    #strategy-guide-${profileName}, #strategy-guide-${profileName} * {
                        visibility: visible !important;
                    }
                    #strategy-guide-${profileName} {
                        display: block !important;
                        position: relative !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 1.5cm !important;
                        border: none !important;
                        box-shadow: none !important;
                        background: white !important;
                        page-break-after: avoid !important;
                    }
                    /* Prevent extra blank pages */
                    div[style*="page-break-after: always"] {
                        height: 0 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    svg {
                        display: inline-block !important;
                        visibility: visible !important;
                    }
                    span, p, h1, h2, h3, h4, div {
                        color: #0F172A !important;
                        -webkit-print-color-adjust: exact;
                    }
                }
            `}</style>
        </div>
    );
};

export default StrategyDetailsContent;
