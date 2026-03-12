"use client"

import { taxGuideData } from "../../../utils/TaxGuideData";
import { ShieldCheck, Receipt, Percent, Info } from 'lucide-react';

const TaxGuideContent = () => {
    return (
        <div id="tax-guide-pdf" className="bg-white p-12 max-w-[850px] mx-auto text-slate-800 font-sans leading-relaxed border border-slate-200">
            {/* Header with Logo */}
            <div className="flex justify-between items-start mb-12 border-b-4 border-[#1CADA3] pb-8">
                <div>
                    <img
                        src={taxGuideData.logoUrl}
                        alt="Infinity Arthvishva Logo"
                        className="h-20 w-auto mb-6"
                    />
                    <h1 className="text-4xl font-black text-[#2076C7] uppercase tracking-tighter font-sans">
                        {taxGuideData.title}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-[#1CADA3] uppercase tracking-[0.3em] mb-2">Tax Efficiency Report</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{taxGuideData.company}</p>
                </div>
            </div>

            {/* Smart Planning Alert */}
            <div className="mb-10 p-6 bg-linear-to-r from-[#1CADA3] to-[#2076C7] rounded-3xl text-white shadow-xl flex items-center gap-6">
                <div className="bg-white/20 p-4 rounded-2xl">
                    <Percent className="w-8 h-8 text-white" />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-80">PRO TIP: Tax Optimization</p>
                    <p className="text-xl font-black leading-tight">
                        "{taxGuideData.sections[4].content}"
                    </p>
                </div>
            </div>

            {/* Detail Sections */}
            <div className="space-y-8">
                {/* Interest Income */}
                <div className="section-block" style={{ pageBreakInside: 'avoid' }}>
                    <h2 className="text-2xl font-black text-[#0B1C2E] mb-4 border-l-8 border-[#2076C7] pl-4 flex items-center gap-3 font-sans">
                        <Receipt className="w-7 h-7 text-[#2076C7]" />
                        {taxGuideData.sections[0].title}
                    </h2>
                    <p className="text-slate-600 text-lg font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        {taxGuideData.sections[0].content}
                    </p>
                </div>

                {/* Capital Gains Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ pageBreakInside: 'avoid' }}>
                    <div className="p-8 border-2 border-slate-100 rounded-[2.5rem] bg-white shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#2076C7]/5 rounded-bl-full" />
                        <h3 className="text-xl font-black text-[#0B1C2E] mb-4 flex items-center gap-3 font-sans">
                            <span className="w-8 h-8 bg-[#2076C7] text-white rounded-lg flex items-center justify-center text-sm">ST</span>
                            {taxGuideData.sections[1].title}
                        </h3>
                        <p className="text-slate-600 font-bold leading-relaxed">
                            {taxGuideData.sections[1].content}
                        </p>
                    </div>

                    <div className="p-8 border-2 border-[#1CADA3]/20 rounded-[2.5rem] bg-[#1CADA3]/5 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#1CADA3]/10 rounded-bl-full" />
                        <h3 className="text-xl font-black text-[#0B1C2E] mb-4 flex items-center gap-3 font-sans">
                            <span className="w-8 h-8 bg-[#1CADA3] text-white rounded-lg flex items-center justify-center text-sm">LT</span>
                            {taxGuideData.sections[2].title}
                        </h3>
                        <p className="text-slate-700 font-black leading-relaxed">
                            {taxGuideData.sections[2].content}
                        </p>
                    </div>
                </div>

                {/* Forced Page Break for 2-page Guide */}
                <div className="hidden print:block" style={{ pageBreakAfter: 'always' }}></div>

                {/* TDS & Exemptions */}
                <div className="section-block" style={{ pageBreakInside: 'avoid' }}>
                    <h2 className="text-2xl font-black text-[#0B1C2E] mb-6 border-l-8 border-[#1CADA3] pl-4 font-sans">
                        {taxGuideData.sections[3].title}
                    </h2>
                    <div className="space-y-4">
                        {taxGuideData.sections[3].bullets?.map((bullet, idx) => (
                            <div key={idx} className="flex gap-4 items-start p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                                <div className="w-10 h-10 rounded-xl bg-[#1CADA3]/10 text-[#1CADA3] flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <p className="text-lg font-bold text-slate-700">{bullet}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documentation Section */}
                <div className="p-8 bg-[#2076C7]/5 border-L-4 border-[#2076C7] rounded-[2rem]" style={{ pageBreakInside: 'avoid' }}>
                    <h2 className="text-2xl font-black text-[#0B1C2E] mb-2 flex items-center gap-3 font-sans">
                        <Info className="w-7 h-7 text-[#2076C7]" />
                        Ready to Optimize?
                    </h2>
                    <p className="text-slate-600 font-bold">
                        Most investors pay higher tax than required on their fixed income simply due to poor instrument choice. Our specialists can help you calculate your post-tax yield.
                    </p>
                </div>
            </div>

            {/* Final Footer */}
            <div className="mt-12 pt-8 border-t-2 border-slate-100 text-center" style={{ pageBreakInside: 'avoid' }}>
                <p className="text-xs text-slate-400 font-black uppercase tracking-[0.4em] mb-4">
                    Official Tax Compliance Resource
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="text-[10px] text-slate-500 font-medium leading-loose max-w-2xl mx-auto">
                        {taxGuideData.disclaimer}
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
                    #tax-guide-pdf, #tax-guide-pdf * {
                        visibility: visible !important;
                    }
                    #tax-guide-pdf {
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

export default TaxGuideContent;
