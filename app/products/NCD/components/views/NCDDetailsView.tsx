'use client';

import { ArrowLeft, Calendar, ShieldCheck, TrendingUp, Wallet, Landmark, Download, CheckCircle, Info } from 'lucide-react';
import { ncdData } from '../../data/ncdData';

interface NCDDetailsViewProps {
    id: string;
    onApply: (id: string) => void;
    onBack: () => void;
}

export default function NCDDetailsView({ id, onApply, onBack }: NCDDetailsViewProps) {
    const ncd = ncdData.find(item => item.id === id);

    if (!ncd) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <button onClick={onBack} className="text-[#2076C7] font-bold hover:underline">Back to All Offers</button>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="container-custom">
                {/* Breadcrumb / Back */}
                <button onClick={onBack} className="inline-flex items-center text-gray-500 hover:text-[#2076C7] font-bold mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Offers
                </button>

                {/* Header Section */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-blue-50 relative overflow-hidden mb-12">
                    {/* Integrated Brand Gradient Overlay - Subtle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2076C7]/10 to-transparent rounded-bl-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <div className="flex items-center space-x-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ncd.status === 'Open' ? 'bg-[#1CADA3]/10 text-[#1CADA3]' :
                                    ncd.status === 'Upcoming' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {ncd.status}
                                </span>
                                <span className="flex items-center text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                    <ShieldCheck className="w-3 h-3 mr-1 text-[#2076C7]" />
                                    {ncd.rating}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1C2E] mb-2">{ncd.issuer}</h1>
                            <p className="text-lg text-gray-600 font-medium">{ncd.title}</p>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <button
                                onClick={() => onApply(id)}
                                className="bg-[#1CADA3] text-white hover:bg-[#168a82] px-10 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all active:scale-95 shadow-xl w-full md:w-64 justify-center text-center py-3 text-lg"
                            >
                                Apply Now
                            </button>
                            <button className="flex items-center justify-center space-x-2 text-[#2076C7] font-bold hover:bg-blue-50 py-3 rounded-xl transition-colors text-sm">
                                <Download className="w-4 h-4" />
                                <span>Download Prospectus</span>
                            </button>
                        </div>
                    </div>

                    {/* Key Stats Grid - More Compact */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Interest Rate</p>
                            <p className="text-3xl font-black text-[#2076C7]">{ncd.interest}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Tenure</p>
                            <p className="text-xl font-bold text-[#0B1C2E]">{ncd.tenure}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Min Investment</p>
                            <p className="text-xl font-bold text-[#0B1C2E]">{ncd.minInvest}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Frequency</p>
                            <p className="text-xl font-bold text-[#0B1C2E]">{ncd.payout}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Details Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Issue Details */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-[#0B1C2E] mb-6 flex items-center">
                                <Landmark className="w-6 h-6 mr-3 text-[#2076C7]" />
                                Issue Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                <div className="flex justify-between py-3 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Open Date</span>
                                    <span className="font-bold text-[#0B1C2E]">{ncd.openDate}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Close Date</span>
                                    <span className="font-bold text-[#0B1C2E]">{ncd.closeDate}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Rating Agency</span>
                                    <span className="font-bold text-[#0B1C2E]">{ncd.ratingAgency}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Security Type</span>
                                    <span className="font-bold text-[#0B1C2E]">{ncd.securityType}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">Face Value</span>
                                    <span className="font-bold text-[#0B1C2E]">{ncd.faceValue}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-50">
                                    <span className="text-gray-600 font-medium">ISIN</span>
                                    <span className="font-bold text-[#0B1C2E] font-mono">{ncd.isin}</span>
                                </div>
                            </div>
                        </div>

                        {/* Credit Rating Analysis */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-[#0B1C2E] mb-6 flex items-center">
                                <ShieldCheck className="w-6 h-6 mr-3 text-[#1CADA3]" />
                                Credit Rating Analysis
                            </h3>
                            <div className="bg-[#1CADA3]/5 p-6 rounded-2xl border border-[#1CADA3]/20 mb-6">
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    {ncd.creditRatingDetails}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Highlights Widget */}
                        <div className="bg-[#1CADA3] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2076C7] rounded-bl-full opacity-20"></div>
                            <h4 className="text-xl font-bold mb-6 flex items-center">
                                <TrendingUp className="w-5 h-5 mr-3 text-white" />
                                Highlights
                            </h4>
                            <ul className="space-y-4">
                                {ncd.highlights.map((point, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 mr-3 text-white flex-shrink-0 mt-0.5" />
                                        <span className="text-white/80 text-sm font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Help Widget */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                <Info className="w-6 h-6 text-[#2076C7]" />
                            </div>
                            <h4 className="text-lg font-bold text-[#0B1C2E] mb-2">Need Help?</h4>
                            <p className="text-gray-500 text-sm mb-6">
                                Our relationship managers can help you understand if this NCD fits your portfolio.
                            </p>
                            <button className="w-full py-3 bg-white border-2 border-[#2076C7] text-[#2076C7] font-bold rounded-xl hover:bg-blue-50 transition-colors">
                                Request Call Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
