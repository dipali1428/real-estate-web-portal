'use client';

import React, { useState, useMemo } from 'react';
import {
    TrendingUp,
    FileText,
    Download,
    Eye,
    EyeOff,
    Building2,
    Wallet,
    BarChart3,
    ShieldCheck
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer
} from 'recharts';
import { properties as staticProperties } from '@/app/products/RealEstate/data/properties';

// --- TYPES ---
interface Investment {
    id: number;
    propertyId: number;
    amount: number;
    date: string;
    factionTockens: number;
}

export default function InvestmentGrowth() {
    const [isDemoMode, setIsDemoMode] = useState(false);
    
    // Real Data (Empty for now)
    const [realInvestments] = useState<Investment[]>([]); 

    // Demo Data
    const demoInvestments: Investment[] = [
        { id: 1, propertyId: 17, amount: 800000, date: '2025-01-15', factionTockens: 250 }, // HORIZON HARMONY
        { id: 2, propertyId: 21, amount: 1000000, date: '2025-03-10', factionTockens: 180 },  // THE CUBE
    ];

    const activeInvestments = isDemoMode ? demoInvestments : realInvestments;

    // Derived Properties Data
    const investedProperties = useMemo(() => {
        return activeInvestments.map(inv => {
            const prop = staticProperties.find((p: any) => p.id === inv.propertyId);
            return {
                ...inv,
                property: prop
            };
        });
    }, [activeInvestments]);

    // Format Helpers
    const formatCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    // --- AGGREGATED CALCULATIONS ---
    const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0);
    let totalCurrentValue = 0;
    let weightedIRRSum = 0;
    
    investedProperties.forEach(inv => {
        if (!inv.property) return;
        const irr = inv.property.irr_percentage || 12.5;
        
        // Capital appreciation (Compound interest)
        const invDate = new Date(inv.date);
        const today = new Date();
        const yearsHeld = Math.max(0, (today.getTime() - invDate.getTime()) / (1000 * 3600 * 24 * 365));
        
        const capitalAppreciationRate = irr;
        const currentValue = inv.amount * Math.pow(1 + capitalAppreciationRate / 100, yearsHeld);
        
        totalCurrentValue += currentValue;
        weightedIRRSum += irr * inv.amount;
    });

    const totalReturns = (totalCurrentValue - totalInvested);
    const blendedIRR = totalInvested > 0 ? (weightedIRRSum / totalInvested).toFixed(1) : "0.0";

    // --- WEALTH PROJECTION CHART DATA ---
    const growthChartData = useMemo(() => {
        const data = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan","Feb", "Mar", "Apr","May", "Jun","Jul"];
        
        for (let i = 0; i <= 11; i++) {
            let monthTotalValue = 0;
            let monthTotalInvested = 0;

            const futureDate = new Date();
            futureDate.setMonth(futureDate.getMonth() + i);

            investedProperties.forEach(inv => {
                if (!inv.property) return;
                const irr = inv.property.irr_percentage || 12.5;
                const capitalAppreciationRate = irr;
                
                // Future value from original investment date + i months from NOW
                const yearsHeldNow = Math.max(0, (new Date().getTime() - new Date(inv.date).getTime()) / (1000 * 3600 * 24 * 365));
                const totalYears = yearsHeldNow + (i / 12);
                
                const projectedVal = inv.amount * Math.pow(1 + capitalAppreciationRate / 100, totalYears);
                monthTotalValue += projectedVal;
                monthTotalInvested += inv.amount;
            });

            data.push({
                month: `${monthNames[futureDate.getMonth()]} '${futureDate.getFullYear().toString().slice(2)}`,
                ProjectedValue: Math.round(monthTotalValue),
                InvestedCapital: Math.round(monthTotalInvested),
            });
        }
        return data;
    }, [investedProperties]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* 1. HEADER SECTION (Inline context) */}
            <div className="flex justify-end">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsDemoMode(!isDemoMode)}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 shadow-sm rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                        {isDemoMode ? <EyeOff size={14} /> : <Eye size={14} />}
                        {isDemoMode ? 'Exit Demo' : 'View Demo'}
                    </button>
                </div>
            </div>

            {/* 2. EXECUTIVE SUMMARY (HERO STATS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-[#2076C7]">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <Wallet size={16} />
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Invested</h3>
                    </div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">{formatCurrency(totalInvested)}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <TrendingUp size={16} />
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portfolio Valuation</h3>
                    </div>
                    <p className="text-2xl font-black text-[#2076C7] tracking-tight">{formatCurrency(totalCurrentValue)}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Capital Appreciation Only</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <BarChart3 size={16} />
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Absolute Gains</h3>
                    </div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">{formatCurrency(totalReturns)}</p>
                    <p className="text-[10px] text-emerald-600 mt-1 font-bold">Growth on Principal</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                        <Building2 size={16} />
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Target Portfolio IRR</h3>
                    </div>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">{blendedIRR}%</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Weighted Average</p>
                </div>
            </div>

            {/* 3. PROJECTED WEALTH CHART */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">12-Month Wealth Projection</h3>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Estimated growth of your total portfolio based on individual asset IRRs.</p>
                </div>
                <div className="h-[350px] w-full p-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2076C7" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#2076C7" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                dy={10}
                            />
                            <YAxis 
                                domain={[0, 'auto']}
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                tickFormatter={(val) => {
                                    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
                                    if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`;
                                    return `₹${val}`;
                                }}
                                dx={-10}
                            />
                            <Tooltip 
                                cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '3 3' }}
                                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ color: '#475569', fontWeight: 800, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                                formatter={(value: any) => [formatCurrency(value || 0), undefined]}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="ProjectedValue" 
                                name="Est. Value"
                                stroke="#2076C7" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorBlue)" 
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#2076C7' }}
                            />
                            <Area 
                                type="step" 
                                dataKey="InvestedCapital" 
                                name="Invested Capital"
                                stroke="#94a3b8" 
                                strokeWidth={1}
                                strokeDasharray="4 4"
                                fill="none"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. PROFESSIONAL DATA TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Portfolio Holdings</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-extrabold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 tracking-widest">Asset Details</th>
                                <th className="px-6 py-4 tracking-widest">Investment Date</th>
                                <th className="px-6 py-4 text-right tracking-widest">Invested Value</th>
                                <th className="px-6 py-4 text-right tracking-widest">Current Est. Value</th>
                                <th className="px-6 py-4 text-center tracking-widest">Status</th>
                                <th className="px-6 py-4 text-center tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {investedProperties.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic font-bold text-xs uppercase tracking-widest">
                                        No properties in your portfolio yet.
                                    </td>
                                </tr>
                            ) : (
                                investedProperties.map((inv, idx) => {
                                    if (!inv.property) return null;
                                    
                                    const irr = inv.property.irr_percentage || 12.5;
                                    const capRate = irr;
                                    
                                    const invDate = new Date(inv.date);
                                    const yearsHeld = Math.max(0, (new Date().getTime() - new Date(inv.date).getTime()) / (1000 * 3600 * 24 * 365));
                                    const currentVal = inv.amount * Math.pow(1 + capRate / 100, yearsHeld);
                                    
                                    return (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-800">{inv.property.title}</div>
                                                <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{inv.property.location.split(',').slice(-2).join(',')}</div>
                                                <div className="text-[10px] text-[#2076C7] mt-1.5 font-extrabold uppercase tracking-widest">{irr}% Target IRR</div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-500 font-bold text-xs">
                                                {formatDate(inv.date)}
                                            </td>
                                            <td className="px-6 py-5 text-right font-bold text-slate-700">
                                                {formatCurrency(inv.amount)}
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-[#2076C7]">
                                                {formatCurrency(currentVal)}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-100">
                                                    Active Lock-in
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <button className="text-[10px] font-extrabold text-[#2076C7] hover:text-blue-800 transition-colors uppercase tracking-widest">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5. DOCUMENT VAULT (Simple List) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Compliance & Vault</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {investedProperties.length === 0 ? (
                        <div className="col-span-full p-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest italic opacity-60">
                            No investment documents found.
                        </div>
                    ) : (
                        <>
                            <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#2076C7] group-hover:text-white transition-colors border border-slate-100">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Partnership Deeds</h4>
                                    <p className="text-[10px] font-medium text-slate-500 mt-1 mb-2">Legal SPV ownership documents</p>
                                    <span className="text-[10px] font-black text-[#2076C7] flex items-center gap-1 uppercase tracking-widest">
                                        <Download size={12} strokeWidth={3} /> Download ZIP
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#2076C7] group-hover:text-white transition-colors border border-slate-100">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Tax Certificates</h4>
                                    <p className="text-[10px] font-medium text-slate-500 mt-1 mb-2">TDS on capital appreciation</p>
                                    <span className="text-[10px] font-black text-[#2076C7] flex items-center gap-1 uppercase tracking-widest">
                                        <Download size={12} strokeWidth={3} /> Download PDF
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#2076C7] group-hover:text-white transition-colors border border-slate-100">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800">Performance Reports</h4>
                                    <p className="text-[10px] font-medium text-slate-500 mt-1 mb-2">Quarterly valuation & audit reports</p>
                                    <span className="text-[10px] font-black text-[#2076C7] flex items-center gap-1 uppercase tracking-widest">
                                        <Download size={12} strokeWidth={3} /> View Reports
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
