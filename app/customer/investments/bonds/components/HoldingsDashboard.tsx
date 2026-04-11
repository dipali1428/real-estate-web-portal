'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wallet, ShieldCheck, Calendar, BarChart3, 
    PieChart as PieChartIcon, ShoppingBag, TrendingUp, Plus,
    Clock, AlertCircle, FileText, Download, ArrowUpRight,
    CheckCircle2, LayoutDashboard, Globe
} from 'lucide-react';
import { 
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';
import InvestmentTable from './InvestmentTable';

interface Investment {
    id: number;
    name: string;
    amount: number;
    investedDate: string;
    coupon: string;
    status: "Active" | "Matured";
}

interface PortfolioStats {
    total: number;
    activeCount: number;
    maturedCount: number;
    returns: number;
    risk: string;
    weightedYield: string | number;
    nextCoupon: string;
}

interface HoldingsDashboardProps {
    investments: Investment[];
    portfolioStats: PortfolioStats;
    chartData: any[];
    onExplore: () => void;
    onReset: () => void;
}

const COLORS = ['#1a56db', '#0e9f6e', '#4b5563', '#7e3af2'];

export default function HoldingsDashboard({ 
    investments, 
    portfolioStats, 
    chartData, 
    onExplore, 
    onReset 
}: HoldingsDashboardProps) {

    const isZeroState = investments.length === 0;

    // 🔷 Mock Data for Zero State Discovery
    const sampleIssuerData = [
        { name: 'Corporate', value: 45 },
        { name: 'Sovereign', value: 30 },
        { name: 'PSU', value: 25 }
    ];

    const samplePayouts = [
        { month: 'Apr', amount: 8500 },
        { month: 'May', amount: 12400 },
        { month: 'Jun', amount: 9200 },
        { month: 'Jul', amount: 15100 }
    ];

    return (
        <div className="space-y-10 pb-20 font-sans">
            
            {/* 🔶 TOP TOOLBAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-2">
                <div>
                    <h3 className="text-2xl font-black bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight flex items-center gap-2 mb-1 py-1">
                        Investment Portfolio Matrix
                    </h3>
                    <p className="text-sm text-slate-500 font-semibold tracking-wide">{isZeroState ? 'Zero assets currently under management' : 'Live yield and liquidity oversight'}</p>
                </div>
                {!isZeroState && (
                    <div className="flex gap-4 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                            <Download size={14} /> Export Ledger
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2076C7] rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] text-white shadow-xl active:scale-95 transition-all">
                            <FileText size={14} /> Global Statement
                        </button>
                    </div>
                )}
            </div>

            {/* 🔷 Strategic Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Enterprise AUM', val: `₹${portfolioStats.total.toLocaleString()}`, icon: Wallet, color: 'blue', sub: 'Total Managed Assets' },
                    { label: 'Safety Index', val: portfolioStats.risk, icon: ShieldCheck, color: 'teal', sub: 'Credit Quality Average' },
                    { label: 'Next Payment', val: portfolioStats.nextCoupon, icon: Calendar, color: 'indigo', sub: 'Scheduled Realization' },
                    { label: 'Net Alpha', val: `${portfolioStats.weightedYield}%`, icon: TrendingUp, color: 'slate', sub: 'Portfolio Efficiency' }
                ].map((st, i) => (
                    <div 
                        key={i} 
                        className={`p-7 rounded-[2.5rem] bg-white text-slate-900 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-50 transition-all relative overflow-hidden group ${isZeroState ? 'opacity-85' : ''}`}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100/40 transition-colors" />
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 rounded-2xl bg-slate-50 text-slate-600">
                                <st.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{st.label}</span>
                        </div>
                        <h3 className="text-3xl font-black relative z-10">
                            {isZeroState 
                                ? (st.label === 'Safety Index' || st.label === 'Next Payment' ? 'N/A' : st.label === 'Net Alpha' ? '0.00%' : '₹0.00') 
                                : st.val}
                        </h3>
                        <p className="text-[9px] font-black mt-3 uppercase tracking-[0.15em] relative z-10 text-slate-400">{st.sub}</p>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {isZeroState ? (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                        
                        {/* 🔷 ZERO STATE DISCOVERY VIEW - IMPROVED COLOR */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-12 bg-white rounded-[4rem] p-20 text-center border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-3xl -z-10" />
                                
                                <div className="w-24 h-24 bg-gradient-to-br from-white to-blue-50/50 rounded-[2.5rem] flex items-center justify-center mb-8 mx-auto border border-blue-100/50 shadow-inner">
                                    <ShoppingBag className="w-10 h-10 text-[#2076C7] opacity-60" />
                                </div>
                                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Portfolio Engine is Idle</h2>
                                <p className="text-slate-600 max-w-sm mx-auto mb-12 leading-relaxed font-bold text-base opacity-90">
                                    Start building your institutional-grade fixed income legacy. Browse thousands of verified bond issues today.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <button 
                                        onClick={onExplore} 
                                        className="w-full sm:w-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-12 py-5 rounded-[2rem] font-black text-sm hover:shadow-2xl active:scale-95 transition-all shadow-xl shadow-blue-100/50 flex items-center justify-center gap-3 group"
                                    >
                                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                        Marketplace Discover
                                    </button>
                                    <button className="w-full sm:w-auto bg-slate-50 text-slate-500 px-10 py-5 rounded-[2rem] font-black text-sm hover:bg-slate-100 transition-all border border-slate-100 flex items-center justify-center gap-2">
                                        <Globe size={16} /> Global Catalog
                                    </button>
                                </div>

                                <div className="mt-12 flex items-center justify-center gap-8 border-t border-slate-50 pt-10">
                                    {[
                                        { label: 'Active Issues', count: '2,300+' },
                                        { label: 'Avg. Yield', count: '9.4% p.a.' },
                                        { label: 'Asset Rating', count: 'AAA/AA+' }
                                    ].map((badge, i) => (
                                        <div key={i} className="text-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{badge.label}</p>
                                            <p className="text-sm font-black text-[#2076C7]">{badge.count}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview of Analytics for Zero State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60">
                            <div className="bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="relative sm:absolute mb-4 sm:mb-0 sm:top-6 sm:right-10 bg-blue-600 px-4 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest shadow-md inline-block">Feature Preview</div>
                                <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-6 sm:mb-10 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-blue-600 shrink-0" /> Yield Concentration Flow
                                </h4>
                                <div className="h-[220px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={samplePayouts}>
                                            <Area type="monotone" dataKey="amount" fill="#2076C7" stroke="none" fillOpacity={0.15} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="mt-8 text-[11px] font-black text-slate-500 text-center uppercase tracking-[0.2em] opacity-50">Quantitative visualizers activate post-funding</p>
                            </div>
                            <div className="bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="relative sm:absolute mb-4 sm:mb-0 sm:top-6 sm:right-10 bg-teal-600 px-4 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest shadow-md inline-block">Feature Preview</div>
                                <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight mb-6 sm:mb-10 flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-teal-600 shrink-0" /> Issuer Spread Allocation
                                </h4>
                                <div className="h-[220px] w-full flex items-center justify-center">
                                    <PieChartIcon size={80} className="text-slate-100 animate-pulse" />
                                </div>
                                <p className="mt-8 text-[11px] font-black text-slate-500 text-center uppercase tracking-[0.2em] opacity-50">Risk diversification spectrum</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                        
                        {/* 🔷 LIVE HOLDINGS VIEW */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm relative">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-1">Yield Growth Stream</h3>
                                        <p className="text-sm text-slate-500 font-bold opacity-70 italic">Capital appreciation including coupon re-investment modules</p>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><LayoutDashboard size={20} /></div>
                                </div>
                                <div className="h-[320px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2076C7" stopOpacity={0.2}/>
                                                    <stop offset="95%" stopColor="#2076C7" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 900 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 900 }} />
                                            <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px' }} />
                                            <Area type="monotone" dataKey="returns" stroke="#2076C7" strokeWidth={5} fillOpacity={1} fill="url(#colorReturns)" dot={{ r: 4, fill: '#2076C7', strokeWidth: 0 }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Issuer Distribution Pie Chart */}
                            <div className="lg:col-span-4 bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
                                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-12 w-full flex items-center justify-between">
                                    Issuer Concentration <ShieldCheck size={18} className="text-teal-600" />
                                </h3>
                                <div className="w-full h-[200px] relative mb-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={sampleIssuerData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" cornerRadius={4}>
                                                {sampleIssuerData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', fontSize: '11px', fontWeight: '900' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter">ELITE</span>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">ISSUE SCORE</span>
                                    </div>
                                </div>
                                <div className="space-y-3 mt-auto">
                                    {sampleIssuerData.map((s, i) => (
                                        <div key={i} className="flex items-center justify-between text-[11px] font-black text-slate-600 uppercase tracking-tight p-3.5 bg-slate-50/80 border border-slate-100 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                                <span>{s.name} Sector</span>
                                            </div>
                                            <span className="text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-100">{s.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 🔷 PAYOUT TIMELINE & DIVERSIFICATION */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Timeline Payouts */}
                            <div className="bg-white p-6 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-10 flex items-center justify-between">
                                    Liquidity Event Calendar
                                    <div className="p-2 bg-blue-50 rounded-xl"><Clock size={20} className="text-blue-600" /></div>
                                </h3>
                                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                                    {[
                                        { date: '15 Apr 2026', title: 'Punjab National Bank (PERP)', amount: '₹8,75,000', type: 'Annual Coupon', status: 'Pending' },
                                        { date: '28 May 2026', title: 'REC Limited (PERP)', amount: '₹7,99,000', type: 'Accrued Interest', status: 'Processing' }
                                    ].map((event, i) => (
                                        <div key={i} className="relative pl-12 group">
                                            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-white border-4 border-slate-100 z-10 group-hover:border-blue-600 transition-all shadow-md" />
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">{event.date}</p>
                                                    <h4 className="text-base font-black text-slate-900 leading-tight">{event.title}</h4>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">{event.type}</span>
                                                        <span className="text-[9px] font-black text-slate-400">• {event.status}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex flex-col items-end">
                                                    <span className="text-lg font-black text-green-700 font-sans tracking-tight">{event.amount}</span>
                                                    <ArrowUpRight className="text-green-600 w-5 h-5 opacity-40" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary Diversification Card */}
                            <div className="bg-[#0B1C2E] p-6 sm:p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-900/40">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-white/10 rounded-2xl border border-white/5">
                                            <BarChart3 className="text-blue-400 w-6 h-6" />
                                        </div>
                                        <span className="text-[11px] font-black text-blue-300 uppercase tracking-[0.3em]">Institutional Grade Safety</span>
                                    </div>
                                    <h3 className="text-3xl font-black mb-4 tracking-tight">Alpha Shield Verified</h3>
                                    <p className="text-sm text-white/50 font-bold leading-relaxed max-w-[320px]">
                                        Your portfolio maintains a 9.2/10 safety score with broad sector dispersion.
                                    </p>
                                </div>
                                <div className="mt-12 space-y-6 relative z-10">
                                    <div className="justify-between items-end hidden">
                                        <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Dispersion Matrix Score</span>
                                        <span className="text-sm font-black text-teal-400 tracking-wider">92% Optimal</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                                    </div>
                                </div>
                                <button className="mt-12 w-full bg-teal-500/10 border border-teal-500/20 p-5 rounded-[2rem] flex items-center justify-center gap-4 hover:bg-teal-500/20 transition-all group relative z-10 overflow-hidden text-teal-300">
                                    <CheckCircle2 size={22} className="text-teal-400" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Institutional Guard Active</span>
                                </button>
                            </div>
                        </div>

                        {/* Tables */}
                        <InvestmentTable investments={investments} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reset Button */}
            <button onClick={onReset} className="mt-24 text-slate-300 text-[10px] font-black hover:text-red-500 transition-all flex items-center gap-3 mx-auto uppercase tracking-[0.3em] bg-white px-10 py-5 rounded-[2rem] border border-slate-100 shadow-sm">
                <AlertCircle className="w-4 h-4" /> System Maintenance Reset
            </button>
        </div>
    );
}
