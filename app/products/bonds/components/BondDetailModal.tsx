"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bond } from "../data/bondsData";
import { X, TrendingUp, ShieldCheck, Calendar, Clock, Lock, Award, Activity, IndianRupee, Info, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "react-hot-toast";
import { getBondInsight } from "../utils/bondContentEngine";

interface Props {
    bond: Bond | null;
    isOpen: boolean;
    onClose: () => void;
    onInvest?: (id: number) => void;
}

// Helper to generate comparison chart data
const generateComparisonData = (coupon: string) => {
    const rateMatch = coupon.match(/(\d+(\.\d+)?)/);
    const bondRate = rateMatch ? parseFloat(rateMatch[0]) : 8.5; 
    
    return [
        { name: 'Inflation', Rate: 6.0, color: '#ef4444' },     
        { name: 'Avg Bank FD', Rate: 7.0, color: '#94a3b8' },   
        { name: 'This Bond', Rate: bondRate, color: '#1CADA3' } 
    ];
};

// Helper to generate mock chart data based on coupon
const generateChartData = (coupon: string, frequency: string) => {
    const rateMatch = coupon.match(/(\d+(\.\d+)?)/);
    const rate = rateMatch ? parseFloat(rateMatch[0]) : 8.5; // default to 8.5%

     
    let paymentsPerYear = 1;
    if (frequency.toLowerCase().includes("semi")) paymentsPerYear = 2;
    if (frequency.toLowerCase().includes("quarter")) paymentsPerYear = 4;
    if (frequency.toLowerCase().includes("month")) paymentsPerYear = 12;

    const currentYear = new Date().getFullYear();
    const data = [];

    const totalPrincipal = 100000; // Base ₹1L assumption for chart scaling
    const yearlyInterest = (totalPrincipal * (rate / 100));

    for (let i = 0; i <= 5; i++) {
        data.push({
            year: (currentYear + i).toString(),
            "Interest Payout": Math.round(yearlyInterest),
            "Cumulative Return": Math.round(yearlyInterest * i),
            "Principal": totalPrincipal
        });
    }

    return data;
};

export default function BondDetailModal({ bond, isOpen, onClose, onInvest }: Props) {
    if (!bond) return null;

    const chartData = generateChartData(bond.coupon, bond.frequency);
    const comparisonData = generateComparisonData(bond.coupon);
    const insight = getBondInsight(bond);

    const handleInvest = () => {
        if (onInvest) {
            onInvest(bond.id);
        } else {
            toast.success(`Investment initiated for ${bond.company}`, {
                duration: 3000,
                icon: '🚀',
                style: {
                    borderRadius: '16px',
                    background: '#2076C7',
                    color: '#fff',
                    fontWeight: '600',
                },
            });
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 z-[100] backdrop-blur-[4px]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[840px] w-[95vw] h-[90vh] md:h-[85vh] bg-white rounded-3xl z-[101] overflow-hidden shadow-2xl flex flex-col font-sans"
                    >
                        {/* Header Image / Pattern Area */}
                        <div className="relative h-40 md:h-48 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-6 md:p-8 text-white shrink-0 overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                            
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-[110] cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-white" />
                            </button>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex gap-2 mb-2 flex-wrap">
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                        {bond.category}
                                    </span>
                                    {bond.rating && (
                                        <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md">
                                            <ShieldCheck size={14} /> {bond.rating}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black leading-tight mb-1">{bond.company}</h2>
                                    {bond.isin && <p className="text-white/80 font-mono text-xs md:text-sm">ISIN: {bond.isin}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-8">
                            
                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex flex-col justify-center items-center text-center">
                                    <Activity className="text-blue-500 mb-2" size={24} />
                                    <p className="text-[10px] md:text-xs text-blue-600/70 font-bold uppercase tracking-wider">Yield</p>
                                    <p className="text-xl md:text-2xl font-black text-[#2076C7]">{bond.yield}</p>
                                </div>
                                <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-100 flex flex-col justify-center items-center text-center">
                                    <TrendingUp className="text-teal-500 mb-2" size={24} />
                                    <p className="text-[10px] md:text-xs text-teal-600/70 font-bold uppercase tracking-wider">Coupon</p>
                                    <p className="text-xl md:text-2xl font-black text-[#1CADA3]">{bond.coupon}</p>
                                </div>
                                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100 flex flex-col justify-center items-center text-center">
                                    <IndianRupee className="text-amber-500 mb-2" size={24} />
                                    <p className="text-[10px] md:text-xs text-amber-600/70 font-bold uppercase tracking-wider">Min Invest</p>
                                    <p className="text-lg md:text-xl font-black text-amber-700">{bond.minInvestment}</p>
                                </div>
                                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 flex flex-col justify-center items-center text-center">
                                    <Clock className="text-purple-500 mb-2" size={24} />
                                    <p className="text-[10px] md:text-xs text-purple-600/70 font-bold uppercase tracking-wider">Maturity</p>
                                    <p className="text-sm font-black text-purple-700 whitespace-nowrap overflow-hidden text-ellipsis w-full">{bond.maturity}</p>
                                </div>
                            </div>

                            {/* Detailed Info & Chart Section */}
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                
                                {/* Info List */}
                                <div className="space-y-4">
                                    <h3 className="text-lg md:text-xl font-bold text-[#2076C7] border-b border-blue-100 pb-3 flex items-center gap-2">
                                        <Award size={20} className="text-[#1CADA3]"/> Issue Details
                                    </h3>
                                    
                                    <ul className="space-y-3">
                                        <li className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100/60">
                                            <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">Bond Type</span>
                                            <span className="text-sm font-black text-slate-800">{bond.type}</span>
                                        </li>
                                        <li className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100/60">
                                            <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">Payout Freq</span>
                                            <span className="text-sm font-black text-slate-800">{bond.frequency}</span>
                                        </li>
                                        {bond.callDate && (
                                            <li className="flex justify-between items-center bg-teal-50/60 p-3.5 rounded-xl border border-teal-100">
                                                <span className="text-sm text-teal-700 font-bold uppercase tracking-wide flex items-center gap-1.5"><Calendar size={16}/> Next Call Date</span>
                                                <span className="text-sm font-black text-teal-900">{bond.callDate}</span>
                                            </li>
                                        )}
                                        <li className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100/60">
                                            <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">Rating Profile</span>
                                            <span className="text-[10px] sm:text-xs font-black bg-white border-2 border-slate-200 text-slate-700 px-2 py-1.5 rounded-lg shadow-sm">{bond.rating}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Yield Comparison Bar Chart */}
                                <div className="space-y-4 flex flex-col h-full">
                                    <h3 className="text-lg md:text-xl font-bold text-[#2076C7] border-b border-blue-100 pb-3 flex items-center gap-2">
                                        <Activity size={20} className="text-[#1CADA3]" /> Yield vs Market Average
                                    </h3>
                                    
                                    <div className="flex-1 min-h-[12rem] w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-5">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} tickFormatter={(value) => `${value}%`} />
                                                <Tooltip 
                                                    cursor={{ fill: 'rgba(32,118,199,0.05)' }}
                                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                                                    labelStyle={{ fontWeight: '900', color: '#1e293b', marginBottom: '4px' }}
                                                    itemStyle={{ fontWeight: '600', fontSize: '13px' }}
                                                    formatter={(value) => [`${value}%`, 'Annual Return']}
                                                />
                                                <Bar dataKey="Rate" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                                    {comparisonData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <p className="text-[10px] text-[#1CADA3] bg-teal-50/50 p-2 rounded-lg text-center leading-tight font-bold flex gap-1.5 items-start mt-auto">
                                        <Info size={12} className="shrink-0 mt-0.5" />
                                        This bond delivers a real return premium over standard asset inflation indices.
                                    </p>
                                </div>

                            </div>

                            {/* Full Width Area Chart for Wealth Projection */}
                            <div className="space-y-4 mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-[#2076C7] border-b border-blue-100 pb-3 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-[#1CADA3]" /> Projected Wealth Accumulation (per ₹1L)
                                </h3>
                                
                                <div className="h-56 md:h-72 w-full bg-gradient-to-br from-slate-50 to-white shadow-[inset_0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 rounded-2xl p-4 md:p-6">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#1CADA3" stopOpacity={0.6}/>
                                                    <stop offset="95%" stopColor="#1CADA3" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} tickFormatter={(value) => `₹${value/1000}k`} />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                                                labelStyle={{ fontWeight: '900', color: '#1e293b', marginBottom: '8px' }}
                                                itemStyle={{ fontWeight: '600', fontSize: '12px' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '15px' }} />
                                            <Area type="monotone" name="Total Wealth" dataKey="Cumulative Return" stroke="#1CADA3" strokeWidth={3} fillOpacity={1} fill="url(#colorReturn)" />
                                            <Area type="monotone" name="Annual Interest" dataKey="Interest Payout" stroke="#2076C7" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-[10px] text-slate-400 text-center leading-tight px-4 flex gap-1.5 justify-center items-start">
                                    <Activity size={12} className="shrink-0 mt-0.5" />
                                    * Projection is indicative based on ₹1L principal and stated coupon. Actuals may vary per tax deductions & specific market fluctuations.
                                </p>
                            </div>
                            
                            {/* Investment Rationale Section */}
                            <div className="space-y-5 bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-5 md:p-6 rounded-2xl shadow-sm mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-[#2076C7] flex items-center gap-2 border-b border-blue-100 pb-3">
                                    <Info size={22} className="text-[#1CADA3]" /> Why Invest in {bond.company}?
                                </h3>
                                <p className="text-[13px] md:text-sm text-slate-600 leading-relaxed font-semibold">
                                    {insight.productOverview}
                                </p>
                                
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Key Investment Benefits</h4>
                                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                        {insight.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5">
                                                <CheckCircle2 size={18} className="text-[#1CADA3] shrink-0 mt-0.5" />
                                                <span className="text-xs md:text-[13px] text-slate-700 font-medium leading-relaxed">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center justify-between bg-blue-50/50 p-3 md:p-4 rounded-xl border border-blue-100">
                                    <span className="text-[11px] md:text-xs font-bold text-blue-800/80 uppercase tracking-wider">Estimated Risk Profile</span>
                                    <span className="text-xs font-black bg-white px-3 py-1.5 rounded-lg border border-blue-200 text-[#2076C7] shadow-sm">{insight.riskProfile}</span>
                                </div>
                            </div>

                            {/* Disclaimer / Additional Info block */}
                            <div className="mt-8 bg-orange-50/80 border border-orange-100 p-4 md:p-5 rounded-2xl text-[11px] md:text-xs text-orange-800 flex gap-3 shadow-sm shadow-orange-100/50">
                                <Lock className="shrink-0 mt-0.5 text-orange-500" size={18} />
                                <p className="leading-relaxed font-medium">
                                    <strong className="block mb-1 text-orange-900">Risk Warning</strong>
                                    Investments in debt securities are subject to market risks. Read all offer-related documents carefully. Past performance is not indicative of future returns. Check with your financial advisor before proceeding. 
                                </p>
                            </div>

                        </div>

                        {/* Footer Action */}
                        <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/80 shrink-0 flex justify-end gap-3 md:gap-4">
                            <button 
                                onClick={onClose}
                                className="px-5 md:px-6 py-3 md:py-3.5 rounded-xl text-slate-600 font-bold text-xs md:text-sm bg-white border-2 border-slate-200 hover:bg-slate-100 transition-colors uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleInvest}
                                className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl text-white font-black text-xs md:text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                            >
                                Invest Now
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
