'use client';

import { Briefcase, ChevronRight, ShieldCheck } from 'lucide-react';

interface Investment {
    id: number;
    name: string;
    amount: number;
    investedDate: string;
    coupon: string;
    rating?: string;
    status: "Active" | "Matured";
}

interface InvestmentTableProps {
    investments: Investment[];
}

export default function InvestmentTable({ investments }: InvestmentTableProps) {
    if (investments.length === 0) return null;

    return (
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mt-8">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase tracking-tighter font-sans">
                    <Briefcase className="w-5 h-5 text-[#2076C7]" /> Current Portfolio Ledger
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/40">
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] font-sans">Asset Detail</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] font-sans">Principal</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] font-sans">Rating</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] font-sans">Coupon Alpha</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center font-sans">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right font-sans">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {investments.map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="font-bold text-slate-900 group-hover:text-[#2076C7] transition-colors font-sans">{inv.name}</div>
                                    <div className="text-[10px] text-slate-400 mt-1 font-bold font-sans">Invested on {inv.investedDate}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="font-black text-slate-800 font-sans">₹{inv.amount.toLocaleString()}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="flex items-center gap-1.5 text-[11px] font-black text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 w-fit">
                                        <ShieldCheck size={12} className="text-[#1CADA3]" />
                                        {inv.rating || 'AAA'}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="font-black text-[#2076C7] font-sans">{inv.coupon}</div>
                                </td>
                                <td className="px-8 py-6 text-center font-sans">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                        inv.status === "Active" 
                                            ? "bg-emerald-50 text-emerald-600" 
                                            : "bg-amber-50 text-amber-600"
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${inv.status === "Active" ? "bg-emerald-600" : "bg-amber-600"}`}></span>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-[#2076C7] hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}