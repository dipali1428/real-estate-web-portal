'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconCheck, IconSchool, IconBuildingBank, IconWorld, IconAward, IconCurrencyRupee, IconPercentage, IconShieldCheck, IconClock, IconHistory, IconReceiptTax, IconFileText, IconFirstAidKit, IconArrowRight, IconPhone, IconUpload } from '@tabler/icons-react';
import { useModal } from '../../../context/ModalContext';
import EMICalculator from './EMICalculator';
import MarketComparison from './MarketComparision';
import EducationLoanForm from '@/app/dashboard/leadmanagement/forms/educationloanform';
import EducationLoanService from '@/app/services/customer/educationLoanService';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const getCardStyle = (index: number) => {
    const styles = [
        { icon: IconSchool, color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50/30', border: 'border-blue-200' },
        { icon: IconWorld, color: 'from-[#2076C7] to-[#1CADA3]', bg: 'bg-gradient-to-br from-blue-50/30 to-teal-50/30', border: 'border-blue-100' },
        { icon: IconBuildingBank, color: 'from-teal-500 to-teal-700', bg: 'bg-teal-50/30', border: 'border-teal-200' },
        { icon: IconAward, color: 'from-indigo-500 to-indigo-700', bg: 'bg-indigo-50/30', border: 'border-indigo-200' }
    ];
    return styles[index % styles.length];
};

const comparison = [
    { feature: 'Loan Amount', domestic: '₹5 Lakh onwards', abroad: '₹4 Lakh onwards', icon: IconCurrencyRupee },
    { feature: 'Interest Rate', domestic: '8.0% onwards', abroad: '8.5% onwards', icon: IconPercentage },
    { feature: 'Collateral', domestic: 'Required > ₹7.5L', abroad: 'Secured & Unsecured', icon: IconShieldCheck },
    { feature: 'Moratorium', domestic: 'Course + 6-12 months', abroad: 'Course + 6-12 months', icon: IconClock },
    { feature: 'Repayment', domestic: 'Up to 15 years', abroad: 'Up to 15 years', icon: IconHistory },
    { feature: 'Processing Fee', domestic: '0.5% – 2%', abroad: '0.5% – 2% + GST', icon: IconReceiptTax },
    { feature: 'Tax Benefit', domestic: 'Sec 80E (8 years)', abroad: 'Sec 80E (8 years)', icon: IconFileText },
    { feature: 'Insurance Cover', domestic: true, abroad: true, icon: IconFirstAidKit },
];

export default function LoanTypesSection({ showOnlyLive = false, isDashboard = false }: { showOnlyLive?: boolean, isDashboard?: boolean }) {
    const { openLogin, openApplyNow } = useModal();
    const [activeTab, setActiveTab] = useState<'plans' | 'details' | 'calculator'>('plans');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [apiLoans, setApiLoans] = useState<any[]>([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [showAllPlans, setShowAllPlans] = useState(false);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await EducationLoanService.getAllEducationLoans();
                if (res && res.data) {
                    setApiLoans(res.data.filter((l: any) => l.status === 'ACTIVE'));
                }
            } catch (_err) {
                toast.error("Failed to fetch education loans.");
            } finally {
                setLoadingLoans(false);
            }
        };
        fetchLoans();
    }, []);

    return (
        <section className={isDashboard ? '' : "py-2 bg-white relative overflow-hidden"}>
            <div className={isDashboard ? '' : "max-w-[1440px] mx-auto px-6 leading-relaxed"}>

                {/* NAVIGATION HEADER */}
                {isDashboard ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100/60"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                                    {activeTab === 'calculator' ? (
                                        <IconBuildingBank size={24} />
                                    ) : activeTab === 'details' ? (
                                        <IconFileText size={24} />
                                    ) : (
                                        <IconSchool size={24} />
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                            {activeTab === 'plans'
                                                ? 'Education Loans'
                                                : activeTab === 'details'
                                                    ? 'Loan Details'
                                                    : 'EMI Calculator'}
                                        </h2>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                                        <span>
                                            {activeTab === 'plans'
                                                ? 'Explore and compare education loans'
                                                : activeTab === 'details'
                                                    ? 'Everything you need to know'
                                                    : 'Calculate your monthly repayments'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                                <div className="flex flex-wrap justify-center sm:flex-nowrap sm:flex-row p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 relative shadow-inner border border-slate-200/50">
                                    {[
                                        { id: 'plans', label: 'Plans', icon: IconSchool },
                                        { id: 'details', label: 'Details', icon: IconFileText },
                                        { id: 'calculator', label: 'Calculator', icon: IconBuildingBank },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`relative w-[calc(50%-0.5rem)] sm:w-auto px-3 md:px-5 py-3 sm:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="activeTabLoan"
                                                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <tab.icon size={16} className="sm:size-[14px] transition-all duration-300" />
                                            <span className="leading-none">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                            <IconAward size={14} />
                            Loan Products
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Choose Your Education Loan
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                            From domestic degrees to international programs — we have tailored loan products to match every aspiration and budget.
                        </p>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {(!isDashboard || activeTab === 'plans') && (
                        <motion.div
                            key="plans-tab"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
                                {loadingLoans ? (
                                    <div className="col-span-1 md:col-span-4 text-center py-20 text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">
                                        Loading Education Loans...
                                    </div>
                                ) : apiLoans.length === 0 ? (
                                    <div className="col-span-1 md:col-span-4 text-center py-20 text-gray-400 font-bold text-sm">
                                        No education loans available at the moment.
                                    </div>
                                ) : (
                                    (showAllPlans ? apiLoans : apiLoans.slice(0, 4)).map((loan, i) => {
                                        const style = getCardStyle(i);
                                        const Icon = style.icon;
                                        const featuresList = loan.features ? loan.features.split('|') : [];

                                        const loanName = (loan.loan_type || '').toLowerCase();
                                        const isPopular = loan.is_popular && (
                                            loanName.includes('domestic education') || 
                                            loanName.includes('skill development')
                                        );

                                        return (
                                            <motion.div
                                                key={loan.id || i}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                                className={`relative rounded-3xl border ${style.border} ${style.bg} p-5 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${isPopular ? 'ring-1 ring-[#2076C7]/30 shadow-lg' : ''}`}
                                            >
                                                {isPopular && (
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow">
                                                        Most Popular
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-center text-center">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${style.color} rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                                                        <Icon size={24} strokeWidth={1.8} className="text-white" />
                                                    </div>
                                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{loan.badge || 'EDUCATION LOAN'}</div>
                                                    <h3 className="text-lg font-extrabold text-gray-700 mb-3 tracking-tight leading-tight">{loan.loan_type}</h3>
                                                </div>

                                                <div className="space-y-1.5 mb-4">
                                                    <div className="flex justify-between items-center py-1.5 border-b border-black/5">
                                                        <span className="text-[11px] font-bold text-slate-400 uppercase">Max Amount</span>
                                                        <span className="text-sm font-extrabold text-[#2076C7]">{loan.max_amount || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1.5 border-b border-black/5">
                                                        <span className="text-[11px] font-bold text-slate-400 uppercase">Interest Rate</span>
                                                        <span className="text-sm font-extrabold text-slate-700">{loan.interest_rate || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-1.5">
                                                        <span className="text-[11px] font-bold text-slate-400 uppercase">Tenure</span>
                                                        <span className="text-sm font-extrabold text-slate-700">{loan.tenure || 'N/A'}</span>
                                                    </div>
                                                </div>

                                                <ul className="space-y-1.5 mb-6 flex-1">
                                                    {featuresList.map((f: string, idx: number) => (
                                                        <li key={idx} className="flex items-start gap-1.5 text-xs font-bold text-slate-600 leading-tight">
                                                            <IconCheck size={12} className="text-teal-500 shrink-0 mt-0.5" strokeWidth={3} />
                                                            {f.trim()}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Apply Now Button - Reduced width & centered at bottom */}
                                                <div className="mt-auto flex justify-center">
                                                    <button
                                                        onClick={() => {
                                                            if (isDashboard) {
                                                                setIsFormOpen(true);
                                                            } else {
                                                                openApplyNow(loan.loan_type, isDashboard);
                                                            }
                                                        }}
                                                        className="relative inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer group w-3/5"
                                                        style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                                    >
                                                        <span className="relative z-6 flex items-center justify-center gap-1">
                                                            Apply Now
                                                            <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                                                        </span>
                                                        <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>

                            {!loadingLoans && apiLoans.length > 4 && (
                                <div className="flex justify-center mb-12">
                                    <button
                                        onClick={() => setShowAllPlans(!showAllPlans)}
                                        className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                                    >
                                        {showAllPlans ? 'View Less' : `View All ${apiLoans.length} Plans`}
                                    </button>
                                </div>
                            )}

                            {/* --- NEW PUBLIC MARKET COMPARISON --- */}
                            {!isDashboard && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mt-8"
                                >
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                            Market Comparison
                                        </h3>
                                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                                            Real-time interest rates and approval insights from top lenders
                                        </p>
                                    </div>
                                    <MarketComparison onApplyClick={openApplyNow} />
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {(isDashboard && activeTab === 'details') && (
                        <motion.div
                            key="details-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* --- Comprehensive B2C Application Guide --- */}
                            <div className="space-y-8 pt-2 pb-8">

                                {/* --- 🔷 1. Loan Overview (Top Section) --- */}
                                <section>
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Loan Overview</h3>
                                            <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest opacity-60">Real-time summary of your sanctioned education loan</p>
                                        </div>
                                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Loan</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                                        {[
                                            { label: 'Sanctioned', value: '₹0.00', icon: IconShieldCheck, color: 'blue' },
                                            { label: 'Disbursed', value: '₹0.00', icon: IconUpload, color: 'teal' },
                                            { label: 'Outstanding', value: '₹0.00', icon: IconHistory, color: 'indigo' },
                                            { label: 'Interest Rate', value: '0.00%', icon: IconPercentage, color: 'orange' },
                                            { label: 'EMI Amount', value: '₹0', icon: IconReceiptTax, color: 'emerald' },
                                            { label: 'Next Due', value: 'TBD', icon: IconClock, color: 'rose' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl mb-3 md:mb-4 flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : stat.color === 'teal' ? 'bg-teal-50 text-teal-600' : stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : stat.color === 'orange' ? 'bg-orange-50 text-orange-600' : stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                    <stat.icon size={18} className="md:w-[20px] md:h-[20px]" strokeWidth={2.5} />
                                                </div>
                                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                                <p className="text-base md:text-lg font-black text-slate-800 tracking-tight">{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* --- 🔷 2. EMI & Repayment Details --- */}
                                        <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                                            <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between flex-wrap gap-4">
                                                <div>
                                                    <h4 className="text-lg md:text-xl font-black text-slate-800">EMI & Repayment</h4>
                                                    <p className="text-slate-400 text-[10px] md:text-xs font-bold mt-1">0 of 0 EMIs Paid | 0 Remaining</p>
                                                </div>
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <button className="px-5 md:px-6 py-2 md:py-2.5 bg-[#2076C7] text-white text-[10px] md:text-xs font-black rounded-full shadow-lg shadow-blue-200 hover:scale-105 transition-all opacity-50 cursor-not-allowed">Pay Now</button>
                                                    <button className="px-5 md:px-6 py-2 md:py-2.5 bg-slate-50 text-slate-600 text-[10px] md:text-xs font-black rounded-full border border-slate-200 hover:bg-slate-100 transition-all">Auto-Debit</button>
                                                </div>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead className="bg-slate-50/50">
                                                        <tr>
                                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Month</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Principal</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Interest</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-50">
                                                        {Object.keys({}).length === 0 ? (
                                                            <tr>
                                                                <td colSpan={4} className="px-8 py-10 text-center text-xs font-bold text-slate-400 italic">No repayment schedule available yet</td>
                                                            </tr>
                                                        ) : (
                                                            [].map((row, idx) => (
                                                                <tr key={idx} className="hover:bg-slate-50/30 transition-all">
                                                                    <td className="px-8 py-5 text-sm font-black text-slate-700"></td>
                                                                    <td className="px-8 py-5 text-sm font-bold text-slate-500"></td>
                                                                    <td className="px-8 py-5 text-sm font-bold text-slate-500"></td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>

                                        {/* --- 🔷 4. Loan Timeline / Journey Tracker --- */}
                                        <section className="bg-blue-50/50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-blue-100 overflow-hidden relative group">
                                            <h4 className="text-lg md:text-xl font-black text-[#2076C7] mb-8 md:mb-12 relative z-10">Loan Journey Tracker</h4>
                                            <div className="relative z-10 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                                                <div className="flex items-center justify-between min-w-[500px] md:min-w-0 mb-4 md:mb-8">
                                                    {[
                                                        { label: 'Applied', date: '-', active: false },
                                                        { label: 'Approved', date: '-', active: false },
                                                        { label: 'Disbursed', date: '-', active: false, current: false },
                                                        { label: 'Repayment', date: '-', active: false },
                                                        { label: 'Closed', date: '-', active: false },
                                                    ].map((step, i, arr) => (
                                                        <div key={i} className="flex flex-col items-center flex-1 relative">
                                                            {i < arr.length - 1 && (
                                                                <div className={`absolute top-4 left-1/2 w-full h-[2px] ${step.active && arr[i + 1].active ? 'bg-[#2076C7]' : 'bg-blue-100'}`} />
                                                            )}
                                                            <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-500 ${step.current ? 'bg-[#2076C7] border-white scale-125 shadow-lg shadow-blue-200' : step.active ? 'bg-[#2076C7] border-blue-50' : 'bg-white border-blue-100'}`}>
                                                                {step.active && !step.current && <IconCheck size={14} className="text-white" strokeWidth={4} />}
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${step.active ? 'text-[#2076C7]' : 'text-slate-400'}`}>{step.label}</span>
                                                            <span className="text-[9px] font-bold text-slate-400 mt-1">{step.date}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </section>

                                        {/* --- 🔷 3. Disbursement Details --- */}
                                        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                                                <h4 className="text-base md:text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                                        <IconUpload size={18} strokeWidth={2.5} />
                                                    </div>
                                                    Disbursed History
                                                </h4>
                                                <div className="space-y-4 md:space-y-6">
                                                    {[].length === 0 ? (
                                                        <div className="py-8 md:py-10 text-center">
                                                            <p className="text-[10px] md:text-xs font-bold text-slate-400 italic">No disbursements recorded</p>
                                                        </div>
                                                    ) : (
                                                        [].map((item, i) => (
                                                            <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                                                                <div>
                                                                    <p className="text-xs md:text-sm font-black text-slate-800">{ }</p>
                                                                </div>
                                                                <span className="text-xs md:text-sm font-black text-[#1CADA3]"></span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col justify-between">
                                                <div>
                                                    <IconClock size={32} strokeWidth={2.5} className="mb-4 opacity-50" />
                                                    <h4 className="text-lg font-black mb-2">Next Disbursement</h4>
                                                    <p className="text-white/70 text-sm font-bold">Planned cycle details TBD</p>
                                                </div>
                                                <div className="mt-8">
                                                    <p className="text-3xl font-black">TBD</p>
                                                    <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 tracking-widest">Expected Date</p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="space-y-8">
                                        {/* --- 🔷 6. Documents Section --- */}
                                        <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            <h4 className="text-lg font-black text-slate-800 mb-6">Digital Vault</h4>
                                            <div className="space-y-3 md:space-y-4">
                                                {[
                                                    { t: 'Sanction Letter', size: '-' },
                                                    { t: 'Loan Agreement', size: '-' },
                                                    { t: 'Disbursement Proof', size: '-' },
                                                    { t: 'Loan Statement', size: '-' },
                                                ].map((doc, i) => (
                                                    <div key={i} className="group flex items-center justify-between p-3 md:p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-all">
                                                                <IconFileText size={18} className="md:w-[20px] md:h-[20px]" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-800">{doc.t}</p>
                                                                <p className="text-[9px] font-bold text-slate-400">{doc.size} • PDF</p>
                                                            </div>
                                                        </div>
                                                        <IconUpload size={14} className="text-slate-300 group-hover:text-blue-500 rotate-180" />
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* --- 🔷 7. Co-applicant Details --- */}
                                        <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                                            <h4 className="text-lg font-black text-slate-800 mb-6">Co-Applicant Info</h4>
                                            <div className="p-5 md:p-6 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden">
                                                <div className="relative z-10">
                                                    <p className="text-sm font-black text-slate-800 tracking-tight">Not Provided</p>
                                                    <p className="text-[10px] font-bold text-[#2076C7] uppercase tracking-widest mb-4">Pending Setup</p>
                                                    <div className="space-y-2 md:space-y-3">
                                                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                                            <IconPhone size={14} className="text-slate-400" />
                                                            -
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                                            <IconWorld size={14} className="text-slate-400" />
                                                            -
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* --- 🔷 8. Tax Benefits --- */}
                                        <section className="bg-indigo-50/50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-indigo-100">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                                                    <IconReceiptTax size={20} />
                                                </div>
                                                <h4 className="text-lg font-black text-indigo-900">Tax Benefits</h4>
                                            </div>
                                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Section 80E Savings</p>
                                            <p className="text-2xl font-black text-indigo-900 mb-4">₹0</p>
                                            <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden mb-4">
                                                <div className="h-full bg-indigo-500 w-[0%]" />
                                            </div>
                                            <p className="text-[9px] font-bold text-indigo-500 leading-relaxed italic opacity-70">
                                                Interest paid in last 12 months. Download Cert for ITR.
                                            </p>
                                        </section>

                                        {/* --- 🔷 9. Alerts & 🔷 10. Support --- */}
                                        <div className="space-y-4">
                                            <div className="p-5 bg-rose-50 rounded-3xl border border-rose-100">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center shrink-0 shadow-sm border border-rose-100">
                                                        <IconShieldCheck size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-black text-rose-900 mb-0.5">No New Notifications</p>
                                                        <p className="text-[10px] font-bold text-rose-600/70">Your loan status will appear here once active.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}

                    {(isDashboard && activeTab === 'calculator') && (
                        <motion.div
                            key="calculator-tab"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                        >
                            <EMICalculator onApplyClick={() => setActiveTab('plans')} hidePartners={showOnlyLive} isDashboard={isDashboard} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {isFormOpen && (
                <EducationLoanForm onClose={() => setIsFormOpen(false)} />
            )}
        </section>
    );
}