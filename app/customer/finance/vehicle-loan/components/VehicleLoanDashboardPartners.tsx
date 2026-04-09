"use client";

import { motion } from "framer-motion";
import { 
    Landmark, 
    Building2, 
    ChevronRight, 
    Clock, 
    Percent, 
    Wallet, 
    ShieldCheck, 
    Zap,
    TrendingUp,
    Users
} from "lucide-react";

interface PartnerDetail {
    name: string;
    roi: string;
    tenure: string;
    maxLoan: string;
    processingFee: string;
    bestFor: string;
    color: string;
    iconColor: string;
}

const detailedPartners: PartnerDetail[] = [
    {
        name: "HDFC Bank",
        roi: "10.5% - 15.0%",
        tenure: "12 - 60 Mos",
        maxLoan: "₹1 Crore",
        processingFee: "0.99% - 2.5%",
        bestFor: "Established MSMEs",
        color: "bg-blue-50 border-blue-100",
        iconColor: "text-blue-500 bg-blue-100"
    },
    {
        name: "Axis Bank",
        roi: "11.25% - 16.5%",
        tenure: "Up to 48 Mos",
        maxLoan: "₹75 Lakhs",
        processingFee: "1.5% - 2.0%",
        bestFor: "Quick Disbursal",
        color: "bg-teal-50 border-teal-100",
        iconColor: "text-teal-500 bg-teal-100"
    },
    {
        name: "ICICI Bank",
        roi: "10.75% - 15.5%",
        tenure: "Up to 60 Mos",
        maxLoan: "₹2 Crores",
        processingFee: "Up to 2%",
        bestFor: "Working Capital",
        color: "bg-orange-50 border-orange-100",
        iconColor: "text-orange-500 bg-orange-100"
    },
    {
        name: "Kotak Mahindra",
        roi: "11.0% - 18.0%",
        tenure: "12 - 48 Mos",
        maxLoan: "₹50 Lakhs",
        processingFee: "2.0% + GST",
        bestFor: "Expanding Startups",
        color: "bg-red-50 border-red-100",
        iconColor: "text-red-500 bg-red-100"
    },
    {
        name: "IDFC First Bank",
        roi: "11.49% - 17.5%",
        tenure: "Up to 60 Mos",
        maxLoan: "₹1.5 Crores",
        processingFee: "1.0% - 3.0%",
        bestFor: "Flexible Repayment",
        color: "bg-slate-50 border-slate-100",
        iconColor: "text-slate-500 bg-slate-100"
    },
    {
        name: "Bajaj Finance",
        roi: "12% - 19%",
        tenure: "Up to 36 Mos",
        maxLoan: "₹45 Lakhs",
        processingFee: "Flat 2%",
        bestFor: "No Collateral",
        color: "bg-blue-50 border-blue-100",
        iconColor: "text-blue-600 bg-blue-100"
    }
];

export default function VehicleLoanDashboardPartners() {
    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-[#1CADA3] text-[10px] font-black rounded-lg border border-teal-100 uppercase tracking-widest mb-2">
                        <TrendingUp size={12} />
                        Top Market Rates
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        Financial Partners & Offers
                    </h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">
                        Select a partner to explore customized Vehicle credit solutions
                    </p>
                </div>
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" /> Secure Application Process
                </div>
            </div>

            {/* Detailed Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedPartners.map((partner, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        key={partner.name}
                        className={`group relative flex flex-col p-6 rounded-[2.5rem] border bg-white shadow-xs hover:shadow-xl hover:border-slate-200 transition-all duration-500 cursor-pointer overflow-hidden ${partner.color}`}
                    >
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6">
                             <div className="px-2.5 py-1 bg-white/80 backdrop-blur-md rounded-full text-[8px] font-black text-slate-500 uppercase tracking-tighter border border-slate-100 shadow-xs">
                                Verified
                             </div>
                        </div>

                        {/* Bank Icon & Name */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 duration-500 ${partner.iconColor}`}>
                                <Landmark size={24} strokeWidth={2.5} />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-black text-slate-800 group-hover:text-[#2076C7] transition-colors leading-tight">
                                    {partner.name}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Users size={12} className="text-[#1CADA3]" />
                                    <span className="text-[10px] font-black text-slate-400 tracking-wide uppercase">{partner.bestFor}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-y-5 gap-x-2 mb-8 pt-4 border-t border-slate-100/50">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <Percent size={10} className="text-[#2076C7]" /> Interest Rate
                                </p>
                                <p className="text-sm font-black text-slate-700">{partner.roi}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <Clock size={10} className="text-[#2076C7]" /> Tenure
                                </p>
                                <p className="text-sm font-black text-slate-700">{partner.tenure}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <Wallet size={10} className="text-[#1CADA3]" /> Max Limit
                                </p>
                                <p className="text-sm font-black text-slate-700">{partner.maxLoan}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <Zap size={10} className="text-[#1CADA3]" /> Processing
                                </p>
                                <p className="text-sm font-black text-slate-700">{partner.processingFee}</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full py-3.5 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-[#2076C7] uppercase tracking-widest shadow-xs group-hover:bg-[#2076C7] group-hover:text-white group-hover:border-[#2076C7] group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                            Check Eligibility <ChevronRight size={14} />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Info Banner */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/20 group text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1CADA3]/10 rounded-full -mt-20 -mr-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                         <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                            <Building2 className="text-[#1CADA3]" size={32} />
                         </div>
                         <div>
                            <h3 className="text-xl font-black mb-1">Looking for Corporate Funding?</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Get customized solutions for large scale Vehicle expansion.</p>
                         </div>
                    </div>
                    <button className="px-8 py-4 bg-[#1CADA3] text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-slate-900 hover:shadow-lg transition-all active:scale-95 whitespace-nowrap">
                        Talk to RM
                    </button>
                </div>
            </div>
        </div>
    );
}
