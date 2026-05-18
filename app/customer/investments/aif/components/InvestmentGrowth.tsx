'use client';
import { useState, useMemo } from 'react';
import {
    TrendingUp,
    FileText,
    Download,
    Eye,
    EyeOff,
    Building2,
    Wallet,
    BarChart3,
    ShieldCheck,
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
import { aifStrategies } from '@/app/products/aif/data/aif_funds';
import Link from 'next/link';
// --- TYPES ---
interface Investment {
    id: number;
    fundName: string; // Changed from propertyId to be more explicit for AIF
    amount: number;
    date: string;
    units: number; // Renamed from factionTockens
}
export default function InvestmentGrowth() {
    const [isDemoMode, setIsDemoMode] = useState(false);
    // Real Data (Empty for now)
    const [realInvestments] = useState<Investment[]>([]); 
    // Demo Data
    const demoInvestments: Investment[] = [
        { id: 1, fundName: "360 ONE Multi-Stage Defense Fund", amount: 10000000, date: '2024-11-15', units: 1000 },
        { id: 2, fundName: "ABSL Structured Opportunities Fund", amount: 15000000, date: '2025-01-10', units: 1500 },
    ];
    const activeInvestments = isDemoMode ? demoInvestments : realInvestments;
    // Derived Funds Data
    const investedFunds = useMemo(() => {
        return activeInvestments.map(inv => {
            const fund = aifStrategies.find((s: any) => s.name === inv.fundName);
            return {
                ...inv,
                fund: fund
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
    investedFunds.forEach(inv => {
        if (!inv.fund) {
            // Fallback for simple demo entries
            totalCurrentValue += inv.amount * 1.05; 
            weightedIRRSum += 14 * inv.amount;
            return;
        }
        const irrText = inv.fund.details?.targetIRR || "18-22%";
        // Parse "18-22%" or similar to get a number
        const irrMatch = irrText.match(/\d+/);
        const irr = irrMatch ? parseInt(irrMatch[0]) : 14; 
        // Capital appreciation (Compound interest)
        const invDate = new Date(inv.date);
        const today = new Date();
        const yearsHeld = Math.max(0, (today.getTime() - invDate.getTime()) / (1000 * 3600 * 24 * 365));
        const currentValue = inv.amount * Math.pow(1 + irr / 100, yearsHeld);
        totalCurrentValue += currentValue;
        weightedIRRSum += irr * inv.amount;
    });
    const totalReturns = (totalCurrentValue - totalInvested);
    const blendedIRR = totalInvested > 0 ? (weightedIRRSum / totalInvested).toFixed(1) : "0.0";
    const isEmpty = activeInvestments.length === 0;
    // --- WEALTH PROJECTION CHART DATA ---
    const growthChartData = useMemo(() => {
        const data = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan","Feb", "Mar", "Apr","May", "Jun","Jul"];
        for (let i = 0; i <= 11; i++) {
            let monthTotalValue = 0;
            let monthTotalInvested = 0;
            const futureDate = new Date();
            futureDate.setMonth(futureDate.getMonth() + i);
            investedFunds.forEach(inv => {
                const irrText = inv.fund?.details?.targetIRR || "18-22%";
                const irrMatch = irrText.match(/\d+/);
                const irr = irrMatch ? parseInt(irrMatch[0]) : 14; 
                // Future value from original investment date + i months from NOW
                const yearsHeldNow = Math.max(0, (new Date().getTime() - new Date(inv.date).getTime()) / (1000 * 3600 * 24 * 365));
                const totalYears = yearsHeldNow + (i / 12);
                const projectedVal = inv.amount * Math.pow(1 + irr / 100, totalYears);
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
    }, [investedFunds]);
    // MAIN DASHBOARD LAYOUT
    return (
        <div className="flex-1 p-6 sm:p-10 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                {/* 1. HEADER SECTION */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-200 pb-5">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight">Portfolio Overview</h1>
                        <p className="text-slate-500 text-sm mt-1">Track the performance and valuation of your AIF and private equity assets.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsDemoMode(!isDemoMode)}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                            {isDemoMode ? <EyeOff size={16} /> : <Eye size={16} />}
                            {isDemoMode ? 'Exit Demo' : 'View Demo'}
                        </button>
                        <Link 
                            href="/customer/aif"
                            className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Invest More
                        </Link>
                    </div>
                </div>
                {/* 2. EXECUTIVE SUMMARY (HERO STATS) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-[#2076C7]">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Wallet size={16} />
                            <h3 className="text-xs font-semibold uppercase tracking-wider">Total Invested</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalInvested)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <TrendingUp size={16} />
                            <h3 className="text-xs font-semibold uppercase tracking-wider">Portfolio Valuation</h3>
                        </div>
                        <p className="text-2xl font-bold text-[#2076C7]">{formatCurrency(totalCurrentValue)}</p>
                        <p className="text-xs text-slate-500 mt-1">Capital Appreciation Only</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <BarChart3 size={16} />
                            <h3 className="text-xs font-semibold uppercase tracking-wider">Absolute Gains</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalReturns)}</p>
                        <p className="text-xs text-emerald-600 mt-1 font-medium">Growth on Principal</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Building2 size={16} />
                            <h3 className="text-xs font-semibold uppercase tracking-wider">Target Portfolio IRR</h3>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">{blendedIRR}%</p>
                        <p className="text-xs text-slate-500 mt-1">Weighted Average</p>
                    </div>
                </div>
                {/* 3. PROJECTED WEALTH CHART */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-8 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-base font-semibold text-slate-800">12-Month Wealth Projection</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Estimated growth of your total portfolio based on individual asset IRRs.</p>
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
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis 
                                    domain={[0, 'auto']}
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(val) => {
                                        if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
                                        if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`;
                                        return `₹${val}`;
                                    }}
                                    dx={-10}
                                />
                                <Tooltip 
                                    cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '3 3', fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    labelStyle={{ color: '#475569', fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}
                                    itemStyle={{ fontSize: '13px', fontWeight: 500 }}
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
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-8 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                            <h3 className="text-base font-semibold text-slate-800">Portfolio Holdings</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Detailed breakdown of your Alternative Investment Funds.</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Fund Details</th>
                                    <th className="px-6 py-4">Investment Date</th>
                                    <th className="px-6 py-4 text-right">Invested Value</th>
                                    <th className="px-6 py-4 text-right">Current Est. Value</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {investedFunds.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-400 italic font-medium">
                                            No funds in your portfolio yet.
                                        </td>
                                    </tr>
                                ) : (
                                    investedFunds.map((inv, idx) => {
                                        const irrText = inv.fund?.details?.targetIRR || "18-22%";
                                        const irrMatch = irrText.match(/\d+/);
                                        const irr = irrMatch ? parseInt(irrMatch[0]) : 14; 
                                        const yearsHeld = Math.max(0, (new Date().getTime() - new Date(inv.date).getTime()) / (1000 * 3600 * 24 * 365));
                                        const currentVal = inv.amount * Math.pow(1 + irr / 100, yearsHeld);
                                        return (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-slate-800">{inv.fundName}</div>
                                                    <div className="text-xs text-slate-400 mt-0.5">{inv.fund?.category || "Category II AIF"}</div>
                                                    <div className="text-xs text-[#2076C7] mt-1 font-medium">{irrText} Target IRR</div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    {formatDate(inv.date)}
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium text-slate-700">
                                                    {formatCurrency(inv.amount)}
                                                </td>
                                                <td className="px-6 py-4 text-right font-semibold text-[#2076C7]">
                                                    {formatCurrency(currentVal)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                        Active Lock-in
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button className="text-xs font-semibold text-[#2076C7] hover:text-blue-800 transition-colors">
                                                        View PPM
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
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="text-base font-semibold text-slate-800">Compliance & Legal Documents</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Access ownership certificates, agreements, and tax documents.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        {investedFunds.length === 0 ? (
                            <div className="col-span-full p-8 text-center text-slate-400 text-sm font-medium italic">
                                No investment documents found. Documents will appear here once you invest.
                            </div>
                        ) : (
                            <>
                                <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="p-2.5 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-[#2076C7] group-hover:text-white transition-colors">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800">PPM & Subscription Docs</h4>
                                        <p className="text-xs text-slate-500 mt-1 mb-2">Legal fund ownership documents</p>
                                        <span className="text-[11px] font-semibold text-[#2076C7] flex items-center gap-1">
                                            <Download size={12} /> Download ZIP
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="p-2.5 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-[#2076C7] group-hover:text-white transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800">Tax & TDS Certificates</h4>
                                        <p className="text-xs text-slate-500 mt-1 mb-2">TDS on capital appreciation</p>
                                        <span className="text-[11px] font-semibold text-[#2076C7] flex items-center gap-1">
                                            <Download size={12} /> Download PDF
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="p-2.5 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-[#2076C7] group-hover:text-white transition-colors">
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800">Asset Performance Reports</h4>
                                        <p className="text-xs text-slate-500 mt-1 mb-2">Quarterly valuation & audit reports</p>
                                        <span className="text-[11px] font-semibold text-[#2076C7] flex items-center gap-1">
                                            <Download size={12} /> View Reports
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
