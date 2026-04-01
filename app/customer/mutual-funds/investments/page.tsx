'use client';

import { useEffect, useState, useMemo } from 'react';
import { 
  Plus, Search, Filter, Download, History, 
  TrendingUp, TrendingDown, IndianRupee, PieChart,
  Calendar, ArrowUpRight, X, SlidersHorizontal,
  Briefcase, Loader2, CheckCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import mutualFundService from '@/app/services/mutualfundservice';

interface Investment {
    id: number;
    fund_name: string;
    scheme_code: string;
    amount: string;
    current_value: string;
    returns_pct: string;
    category: string;
    investment_type: string; // 'SIP' or 'LUMPSUM'
    created_at: string;
    total_units?: string;
    average_nav?: string;
}

export default function InvestmentsPage() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchInvestments();
    }, []);

    const fetchInvestments = async () => {
        try {
            const data = await mutualFundService.getInvestments();
            setInvestments(data);
        } catch {
        } finally {
            setLoading(false);
        }
    };

    const stats = useMemo(() => {
        const totalInvested = investments.reduce((acc, inv) => acc + parseFloat(inv.amount || '0'), 0);
        const totalCurrentValue = investments.reduce((acc, inv) => acc + parseFloat(inv.current_value || '0'), 0);
        const totalReturns = totalCurrentValue - totalInvested;
        const returnsPct = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
        return { totalInvested, totalCurrentValue, totalReturns, returnsPct };
    }, [investments]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn font-sans">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Investments</h2>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Real-time performance and asset allocation</p>
                </div>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-[#1CADA3] text-white px-4 py-2 rounded-lg hover:bg-[#158f87] transition-colors"
                >
                    <Plus size={18} />
                    Add Investment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Market Value', value: formatCurrency(stats.totalCurrentValue), icon: TrendingUp, color: 'text-[#2076C7]', bg: 'bg-indigo-50', sub: 'Current valuation' },
                    { label: 'Total Invested', value: formatCurrency(stats.totalInvested), icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-50', sub: 'Principal amount' },
                    { label: 'Total Returns', value: formatCurrency(stats.totalReturns), icon: ArrowUpRight, color: stats.totalReturns >= 0 ? 'text-emerald-600' : 'text-rose-600', bg: stats.totalReturns >= 0 ? 'bg-emerald-50' : 'bg-rose-50', sub: `${stats.totalReturns >= 0 ? '+' : ''}${formatCurrency(stats.totalReturns)}` },
                    { label: 'Returns %', value: `${stats.returnsPct.toFixed(2)}%`, icon: PieChart, color: 'text-indigo-600', bg: 'bg-purple-50', sub: 'Portfolio XIRR' }
                ].map((card, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm`}>
                            <card.icon size={28} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{card.label}</p>
                        <p className={`text-2xl font-black text-slate-900 ${card.label === 'Total Returns' ? card.color : ''}`}>{card.value}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                           <span className={`text-[10px] font-bold ${card.label === 'Total Returns' ? card.color : 'text-slate-400'}`}>{card.sub}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Portfolio Breakdown Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                            <PieChart className="text-[#2076C7]" size={20} />
                            Portfolio Allocation
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Search size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Equity</p>
                                <p className="text-lg font-black text-slate-900">0%</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Debt</p>
                                <p className="text-lg font-black text-slate-900">0%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-black mb-1">Quick Action</h3>
                        <p className="text-xs text-white/70 font-bold mb-6">Invest more in your existing funds or browse new ones.</p>
                        <div className="space-y-4">
                            <Link href="/customer/mutual-funds/explore" className="w-full py-4 bg-white text-[#2076C7] rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                <Plus size={16} /> Browse More Funds
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <History size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Last Transaction</p>
                                <p className="text-sm font-black">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search funds..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1CADA3]/50"
                    />
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            {/* Investments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm text-gray-600 font-semibold">Fund Name</th>
                            <th className="px-6 py-4 text-sm text-gray-600 font-semibold">Category</th>
                            <th className="px-6 py-4 text-sm text-gray-600 font-semibold">Invested</th>
                            <th className="px-6 py-4 text-sm text-gray-600 font-semibold">Current Value</th>
                            <th className="px-6 py-4 text-sm text-gray-600 font-semibold">Returns</th>
                            <th className="px-6 py-4 text-sm text-gray-600 font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8">Loading...</td>
                            </tr>
                        ) : investments.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    No investments found
                                </td>
                            </tr>
                        ) : (
                            investments.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-800">{inv.fund_name}</p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(inv.created_at).toLocaleDateString()}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-xs font-semibold text-gray-700 rounded-full border border-gray-200">
                                            {inv.category || 'N/A'}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        ₹{inv.amount}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        ₹{inv.current_value}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`font-medium ${
                                            parseFloat(inv.returns_pct || "0") >= 0
                                                ? 'text-green-600'
                                                : 'text-red-500'
                                        }`}>
                                            {inv.returns_pct || "0"}%
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link 
                                            href={`/customer/mutual-funds/funds/${inv.scheme_code}`}
                                            className="text-[#1CADA3] hover:underline text-sm font-medium"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AddInvestmentModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                refresh={fetchInvestments}
            />
        </div>
    );
}

function AddInvestmentModal({
    isOpen,
    onClose,
    refresh,
}: {
    isOpen: boolean;
    onClose: () => void;
    refresh: () => Promise<void>;
}) {

    const [formData, setFormData] = useState({
        fund_name: '',
        scheme_code: '',
        amount: '',
        category: 'Equity',
        investment_type: 'LUMPSUM'
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            await mutualFundService.addInvestment({
                ...formData,
                amount: Number(formData.amount)
            });

            refresh();
            onClose();

        } catch {
            toast.error("Please wait or retry in a moment");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
                    >

                        <div className="p-6 border-b-2 border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-extrabold !text-slate-900">Add New Investment</h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">

                            <div>
                                <label className="block text-[11px] font-black !text-slate-500 uppercase tracking-wider mb-1.5">Fund Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter fund name"
                                    className="w-full border-2 border-slate-100 rounded-xl p-3 !text-slate-900 font-bold placeholder-slate-300 focus:border-[#1CADA3] focus:ring-4 focus:ring-[#1CADA3]/10 outline-none transition-all"
                                    value={formData.fund_name}
                                    onChange={e => setFormData({ ...formData, fund_name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-black !text-slate-500 uppercase tracking-wider mb-1.5">Scheme Code (optional)</label>
                                <input
                                    type="text"
                                    placeholder="Enter AMFI code"
                                    className="w-full border-2 border-slate-100 rounded-xl p-3 !text-slate-900 font-bold placeholder-slate-300 focus:border-[#1CADA3] focus:ring-4 focus:ring-[#1CADA3]/10 outline-none transition-all"
                                    value={formData.scheme_code}
                                    onChange={e => setFormData({ ...formData, scheme_code: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-black !text-slate-500 uppercase tracking-wider mb-1.5">Investment Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Min ₹500"
                                    className="w-full border-2 border-slate-100 rounded-xl p-3 !text-slate-900 font-extrabold text-lg placeholder-slate-300 focus:border-[#1CADA3] focus:ring-4 focus:ring-[#1CADA3]/10 outline-none transition-all"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-[#1CADA3] !text-white py-4 rounded-xl font-black text-base hover:bg-[#158f87] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-4"
                            >
                                {submitting ? "Processing Transaction..." : "Complete Investment"}
                            </button>

                        </form>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );
}
