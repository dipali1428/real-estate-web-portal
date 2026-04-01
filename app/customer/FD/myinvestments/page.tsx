'use client';

import React, { useState } from 'react';
import {
    IndianRupee,
    Calendar,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Download,
    MoreVertical,
    ShieldCheck,
    RefreshCw,
    PiggyBank,
    Eye,
    EyeOff,
    CheckCircle2,
    X,
    ChevronDown,
    Check,
    Banknote,
    Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bankData } from '../../../products/FD/data/mockData';

// ==================== MOCK DATA ====================
const PENDING_TO_LAKH = 100000;

interface FDInvestment {
    id: string;
    bankName: string;
    logoColor: string;
    principal: number;
    interestRate: number;
    startDate: string;
    maturityDate: string;
    maturityAmount: number;
    status: 'ACTIVE' | 'MATURED';
    autoRenewal: boolean;
}

const mockInvestments: FDInvestment[] = [
    {
        id: 'FD-100234',
        bankName: 'HDFC Bank',
        logoColor: 'from-blue-600 to-blue-800',
        principal: 500000,
        interestRate: 7.20,
        startDate: '2023-01-15',
        maturityDate: '2026-01-15',
        maturityAmount: 619425,
        status: 'ACTIVE',
        autoRenewal: true
    },
    {
        id: 'FD-100872',
        bankName: 'State Bank of India',
        logoColor: 'from-blue-400 to-indigo-600',
        principal: 250000,
        interestRate: 6.80,
        startDate: '2023-06-10',
        maturityDate: '2025-06-10',
        maturityAmount: 286200,
        status: 'ACTIVE',
        autoRenewal: false
    },
    {
        id: 'FD-100991',
        bankName: 'Bajaj Finance',
        logoColor: 'from-blue-700 to-blue-900',
        principal: 1000000,
        interestRate: 8.40,
        startDate: '2024-02-01',
        maturityDate: '2027-02-01',
        maturityAmount: 1282600,
        status: 'ACTIVE',
        autoRenewal: true
    },
    {
        id: 'FD-098211',
        bankName: 'ICICI Bank',
        logoColor: 'from-orange-500 to-red-600',
        principal: 200000,
        interestRate: 6.50,
        startDate: '2022-03-01',
        maturityDate: '2024-03-01',
        maturityAmount: 227600,
        status: 'MATURED',
        autoRenewal: false
    }
];

// ==================== HELPER FUNCTIONS ====================
const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
};

const calculateProgress = (start: string, end: string) => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const now = new Date().getTime();

    if (now >= endDate) return 100;
    if (now <= startDate) return 0;

    return ((now - startDate) / (endDate - startDate)) * 100;
};

// ==================== MAIN COMPONENT ====================
export default function MyInvestmentsPage() {
    const [activeTab, setActiveTab] = useState<'ACTIVE' | 'MATURED'>('ACTIVE');
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        bankName: '',
        principal: 100000,
        tenure: 1,
        tenureUnit: 'years' as 'years' | 'months',
        autoRenewal: true
    });

    const selectedBank = bankData.flatMap(cat => cat.banks).find(b => b.name === formData.bankName);
    
    const getInterestRate = () => {
        if (!selectedBank) return 7.5; // Default
        const tenure = formData.tenureUnit === 'years' ? formData.tenure : formData.tenure / 12;
        if (tenure <= 1) return parseFloat(selectedBank.tenures.short.rate);
        if (tenure <= 3) return parseFloat(selectedBank.tenures.medium.rate);
        if (tenure <= 5) return parseFloat(selectedBank.tenures.long.rate);
        return parseFloat(selectedBank.tenures.mega.rate);
    };

    const interestRate = getInterestRate();

    const calculateMaturity = () => {
        const p = formData.principal;
        const r = interestRate / 100;
        const t = formData.tenureUnit === 'years' ? formData.tenure : formData.tenure / 12;
        const n = 4; // Quarterly compounding
        const maturity = p * Math.pow(1 + r/n, n * t);
        return {
            maturity: Math.round(maturity),
            interest: Math.round(maturity - p)
        };
    };

    const { maturity, interest } = calculateMaturity();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setIsFormOpen(false);
            // Reset form
            setFormData({
                bankName: '',
                principal: 100000,
                tenure: 1,
                tenureUnit: 'years',
                autoRenewal: true
            });
        }, 3000);
    };

    const filteredInvestments = mockInvestments.filter(inv => inv.status === activeTab);

    const totalInvested = mockInvestments.filter(i => i.status === 'ACTIVE').reduce((sum, inv) => sum + inv.principal, 0);
    const totalCurrentValue = mockInvestments.filter(i => i.status === 'ACTIVE').reduce((sum, inv) => {
        // Mock current value calculation based on progress
        const progress = calculateProgress(inv.startDate, inv.maturityDate) / 100;
        const earnedInterest = (inv.maturityAmount - inv.principal) * progress;
        return sum + inv.principal + earnedInterest;
    }, 0);

    const weightedAvgInterest = mockInvestments.filter(i => i.status === 'ACTIVE').reduce((sum, inv) => sum + (inv.interestRate * inv.principal), 0) / (totalInvested || 1);

    // Find next maturity
    const activeFDsList = mockInvestments.filter(i => i.status === 'ACTIVE').sort((a, b) => new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime());
    const nextMaturity = activeFDsList.length > 0 ? activeFDsList[0] : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-lg shadow-[#2076C7]/20">
                                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                                    My Fixed Deposits
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                                    <Clock size={14} className="text-[#2076C7]" />
                                    Track and manage your secure investments
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsFormOpen(true)}
                                className="px-4 py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg shadow-[#2076C7]/20 transition-all flex items-center gap-2"
                            >
                                <PiggyBank size={16} />
                                <span className="hidden sm:inline">New Fixed Deposit</span>
                                <span className="sm:hidden">New FD</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {/* Total Invested */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="flex justify-between items-start mb-2">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7]">
                                <IndianRupee size={20} />
                            </div>
                            <button onClick={() => setBalanceVisible(!balanceVisible)} className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg transition-colors">
                                {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Active Investment</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {balanceVisible ? formatCurrency(totalInvested) : '••••••'}
                        </h3>
                    </div>

                    {/* Current Value */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                            <TrendingUp size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Current Portfolio Value</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {balanceVisible ? formatCurrency(Math.floor(totalCurrentValue)) : '••••••'}
                        </h3>
                        {balanceVisible && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                <ArrowUpRight size={14} />
                                +{formatCurrency(Math.floor(totalCurrentValue - totalInvested))} returns
                            </div>
                        )}
                    </div>

                    {/* Average Interest Rate */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-2">
                            <RefreshCw size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Avg. Interest Rate</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {weightedAvgInterest > 0 ? `${weightedAvgInterest.toFixed(2)}%` : '0.00%'}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Weighted across active FDs</p>
                    </div>

                    {/* Next Maturity */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                            <Calendar size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Next Maturity</p>
                        <h3 className="text-xl font-bold text-gray-900">
                            {nextMaturity ? new Date(nextMaturity.maturityDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'None'}
                        </h3>
                        {nextMaturity && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                {nextMaturity.bankName} • {formatCurrency(nextMaturity.maturityAmount)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 sm:mb-8 bg-white/50 px-2 pt-2 rounded-t-xl">
                    <button
                        onClick={() => setActiveTab('ACTIVE')}
                        className={`pb-3 sm:pb-4 px-4 sm:px-6 text-sm font-semibold transition-all relative ${activeTab === 'ACTIVE' ? 'text-[#2076C7]' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Active Deposits
                        {activeTab === 'ACTIVE' && (
                            <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2076C7]" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('MATURED')}
                        className={`pb-3 sm:pb-4 px-4 sm:px-6 text-sm font-semibold transition-all relative ${activeTab === 'MATURED' ? 'text-[#2076C7]' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Matured Deposits
                        {activeTab === 'MATURED' && (
                            <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2076C7]" />
                        )}
                    </button>
                </div>

                {/* Investment List */}
                <div className="space-y-4 sm:space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredInvestments.length > 0 ? (
                            filteredInvestments.map((inv) => {
                                const progress = calculateProgress(inv.startDate, inv.maturityDate);

                                return (
                                    <motion.div
                                        key={inv.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <div className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${inv.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-inner flex-shrink-0`}>
                                                        {inv.bankName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="text-lg font-bold text-gray-900">{inv.bankName}</h3>
                                                            {inv.status === 'MATURED' ? (
                                                                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] uppercase font-bold tracking-wider border border-gray-200 flex items-center gap-1">
                                                                    <CheckCircle2 size={10} /> Matured
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] uppercase font-bold tracking-wider border border-emerald-100">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1 truncate">ID: {inv.id}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                                                            <span className="font-medium text-[#2076C7]">{inv.interestRate}% p.a.</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 sm:self-start">
                                                    {inv.status === 'ACTIVE' && (
                                                        <button className="px-3 py-1.5 text-xs font-semibold text-[#2076C7] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
                                                            Invest More
                                                        </button>
                                                    )}
                                                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-gray-50/50 rounded-xl p-4 sm:px-6 sm:py-5 border border-gray-100">
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Principal Amount</p>
                                                    <p className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(inv.principal)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Maturity Amount</p>
                                                    <p className="text-base sm:text-lg font-bold text-emerald-600">{formatCurrency(inv.maturityAmount)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Start Date</p>
                                                    <p className="text-sm font-semibold text-gray-800">{new Date(inv.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Maturity Date</p>
                                                    <p className="text-sm font-semibold text-gray-800">{new Date(inv.maturityDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                </div>
                                            </div>

                                            {/* Progress Bar & Renewal (Only for Active) */}
                                            {inv.status === 'ACTIVE' && (
                                                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenure Progress</span>
                                                            <span className="text-xs font-bold text-[#2076C7]">{Math.floor(progress)}%</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full relative"
                                                                    style={{ width: isMounted ? `${progress.toFixed(2)}%` : '0%' }}
                                                                >
                                                                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
                                                                </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 sm:min-w-[140px] sm:justify-end">
                                                        <span className="text-xs font-medium text-gray-500">Auto Renewal:</span>
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${inv.autoRenewal ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                                                            {inv.autoRenewal ? 'ON' : 'OFF'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={32} className="text-[#2076C7]" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    No {activeTab.toLowerCase()} deposits
                                </h3>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                                    When you {activeTab === 'ACTIVE' ? 'invest in' : 'have matured'} fixed deposits, they will securely appear here for your tracking.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/customer/FD/companies'}
                                    className="px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                                >
                                    Explore Companies
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* New FD Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSubmitting && !showSuccess && setIsFormOpen(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                        >
                            {showSuccess ? (
                                <div className="p-8 sm:p-12 text-center py-20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12 }}
                                        className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600"
                                    >
                                        <Check size={40} strokeWidth={3} />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
                                    <p className="text-gray-500">Your Fixed Deposit request has been received. Our team will process it shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    {/* Modal Header */}
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7]">
                                                <PiggyBank size={20} />
                                            </div>
                                            <h2 className="text-lg font-bold text-gray-900">New Fixed Deposit</h2>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsFormOpen(false)}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                        {/* Bank Selection */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 block">Select Provider</label>
                                            <div className="relative">
                                                <select
                                                    required
                                                    value={formData.bankName}
                                                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                                    className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 font-medium appearance-none outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all"
                                                >
                                                    <option value="">Choose a bank or NBFC</option>
                                                    {bankData.map(category => (
                                                        <optgroup key={category.category} label={category.category}>
                                                            {category.banks.map(bank => (
                                                                <option key={bank.name} value={bank.name}>{bank.name}</option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Principal Amount */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700 block">Investment Amount</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</div>
                                                    <input
                                                        type="number"
                                                        required
                                                        min="10000"
                                                        step="5000"
                                                        value={formData.principal}
                                                        onChange={(e) => setFormData({ ...formData, principal: Number(e.target.value) })}
                                                        className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all font-semibold"
                                                        placeholder="e.g. 1,00,000"
                                                    />
                                                </div>
                                            </div>

                                            {/* Tenure */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700 block">Tenure</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        required
                                                        min="1"
                                                        max={formData.tenureUnit === 'years' ? 10 : 120}
                                                        value={formData.tenure}
                                                        onChange={(e) => setFormData({ ...formData, tenure: Number(e.target.value) })}
                                                        className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all font-semibold"
                                                    />
                                                    <select
                                                        value={formData.tenureUnit}
                                                        onChange={(e) => setFormData({ ...formData, tenureUnit: e.target.value as any })}
                                                        className="w-28 px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] transition-all font-medium"
                                                    >
                                                        <option value="years">Years</option>
                                                        <option value="months">Months</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Summary Result */}
                                        <div className="bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-2xl p-4 sm:p-5 border border-[#2076C7]/10">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Interest Rate</p>
                                                    <p className="text-lg font-black text-[#2076C7]">{interestRate}% <span className="text-[10px] font-medium text-gray-400">p.a.</span></p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Interest Earned</p>
                                                    <p className="text-lg font-black text-emerald-600">+{formatCurrency(interest)}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-white/40 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Maturity Value</p>
                                                    <p className="text-2xl font-black text-gray-900">{formatCurrency(maturity)}</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1CADA3]">
                                                    <TrendingUp size={24} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Auto Renewal Toggle */}
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <RefreshCw className={`w-5 h-5 ${formData.autoRenewal ? 'text-[#2076C7]' : 'text-gray-400'}`} />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Auto Renewal</p>
                                                    <p className="text-xs text-gray-500">Automatically renew FD on maturity</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, autoRenewal: !formData.autoRenewal })}
                                                className={`w-12 h-6 rounded-full transition-all relative ${formData.autoRenewal ? 'bg-[#2076C7]' : 'bg-gray-300'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.autoRenewal ? 'right-1' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsFormOpen(false)}
                                            className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.bankName}
                                            className="flex-[2] py-3 text-sm font-bold text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl hover:opacity-90 shadow-lg shadow-[#2076C7]/20 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <RefreshCw className="animate-spin" size={18} />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Banknote size={18} />
                                                    Create Fixed Deposit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
