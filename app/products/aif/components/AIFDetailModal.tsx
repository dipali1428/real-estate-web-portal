"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, TrendingUp, Briefcase, FileText, Phone, Download, PieChart as PieIcon, BarChart as BarIcon, Target, Users, Clock, IndianRupee } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AIFDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    fund: any; // Using any for flexibility with the strategy object structure
}

const COLORS = ['#2076C7', '#1CADA3'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm p-3 shadow-xl border border-gray-100 rounded-xl min-w-[150px]">
                <p className="text-sm font-bold text-gray-800 mb-2 border-b border-gray-100 pb-1.5">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <span className="text-xs font-medium text-gray-500 capitalize">{entry.name}:</span>
                        <span className="text-xs font-bold" style={{ color: entry.color || entry.fill || '#2076C7' }}>
                            {entry.value}{entry.unit || '%'}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function AIFDetailModal({ isOpen, onClose, fund }: AIFDetailModalProps) {
    const { openLogin } = useModal();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setMounted(true);
        }
    }, [isOpen]);

    if (!isOpen || !fund || !fund.details) return null;

    const { details } = fund;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto my-3 sm:my-0"
                        >
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-5 sm:p-8 text-white shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shrink-0">
                                        <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
                                            <span className="px-2.5 py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                                                {details.category || "Category II AIF"}
                                            </span>
                                            <span className="px-2.5 py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                                                {details.structure || "Closed-Ended"}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 pr-8 sm:pr-0">{fund.name}</h2>
                                        <p className="text-white/80 text-sm sm:text-lg leading-snug">Managed by {details.manager || fund.manager}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 p-4 sm:p-8 bg-gray-50/50 overscroll-contain">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                    {/* Left Column (Main Info) */}
                                    <div className="lg:col-span-2 space-y-8">

                                        {/* Investment Strategy */}
                                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                                                <Target className="w-5 h-5 text-[#2076C7]" />
                                                Investment Strategy
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                {details.strategyDescription}
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {details.coreFocusAreas?.map((area: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                                        <div className="w-2 h-2 rounded-full bg-[#1CADA3] shrink-0" />
                                                        <span className="text-gray-700 font-medium">{area}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Suitable For */}
                                        {details.suitableFor && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                                                    <Users className="w-5 h-5 text-[#1CADA3]" />
                                                    Suitable For
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {details.suitableFor.map((item: string, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-3 p-3 bg-teal-50/50 rounded-lg border border-teal-100">
                                                            <div className="w-2 h-2 rounded-full bg-[#2076C7] shrink-0" />
                                                            <span className="text-gray-700 font-medium">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Charts Section */}
                                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Sector Allocation */}
                                            {details.graphs?.sectorAllocation && (
                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                                    <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                        <PieIcon className="w-4 h-4 text-[#1CADA3]" /> {details.graphs.sectorAllocationTitle || "Sector Allocation"}
                                                    </h4>
                                                    <div className="h-80 w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            {mounted ? (
                                                                <PieChart>
                                                                    <Pie
                                                                        data={details.graphs.sectorAllocation}
                                                                        cx="50%"
                                                                        cy="40%"
                                                                        innerRadius={60}
                                                                        outerRadius={80}
                                                                        paddingAngle={5}
                                                                        dataKey="value"
                                                                    >
                                                                        {details.graphs.sectorAllocation.map((entry: any, index: number) => (
                                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                        ))}
                                                                    </Pie>
                                                                    <Tooltip content={<CustomTooltip />} />
                                                                    <Legend layout="vertical" verticalAlign="bottom" iconType="circle" />
                                                                </PieChart>
                                                            ) : (
                                                                <div />
                                                            )}
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Stage Allocation */}
                                            {details.graphs?.stageAllocation && (
                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                                    <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                        <BarIcon className="w-4 h-4 text-[#2076C7]" /> {details.graphs.stageAllocationTitle || "Stage Allocation"}
                                                    </h4>
                                                    <div className="h-64 w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            {mounted ? (
                                                                <BarChart data={details.graphs.stageAllocation}>
                                                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                                    <YAxis hide />
                                                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(32, 118, 199, 0.05)' }} />
                                                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                                        {details.graphs.stageAllocation.map((entry: any, index: number) => (
                                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                        ))}
                                                                    </Bar>
                                                                </BarChart>
                                                            ) : (
                                                                <div />
                                                            )}
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Yield Profile */}
                                            {details.graphs?.yieldProfile && (
                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                                    <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-[#1CADA3]" /> {details.graphs.yieldProfileTitle || "Yield Profile"}
                                                    </h4>
                                                    <div className="h-64 w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            {mounted ? (
                                                                <BarChart data={details.graphs.yieldProfile} layout="vertical">
                                                                    <XAxis type="number" hide />
                                                                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(28, 173, 163, 0.05)' }} />
                                                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                                                        {details.graphs.yieldProfile.map((entry: any, index: number) => (
                                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                        ))}
                                                                    </Bar>
                                                                </BarChart>
                                                            ) : (
                                                                <div />
                                                            )}
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            )}
                                        </section>

                                        {/* Long vs Short Split */}
                                        {details.graphs?.longShortSplit && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <PieIcon className="w-4 h-4 text-[#1CADA3]" /> Long vs Short Split
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <PieChart>
                                                                <Pie
                                                                    data={details.graphs.longShortSplit}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    labelLine={false}
                                                                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                                                    outerRadius={80}
                                                                    dataKey="value"
                                                                >
                                                                    {details.graphs.longShortSplit.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip content={<CustomTooltip />} />
                                                            </PieChart>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </ResponsiveContainer>
                                                </div>
                                            </section>
                                        )}

                                        {/* Portfolio Concentration */}
                                        {details.graphs?.portfolioConcentration && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <BarIcon className="w-4 h-4 text-[#2076C7]" /> Portfolio Concentration
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.portfolioConcentration} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fontWeight: 500 }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(32, 118, 199, 0.05)' }} />
                                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                                                    {details.graphs.portfolioConcentration.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Bar>
                                                            </BarChart>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </ResponsiveContainer>
                                                </div>
                                            </section>
                                        )}

                                        {/* Capital Protection Structure */}
                                        {details.graphs?.capitalProtection && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <ShieldCheck className="w-4 h-4 text-[#1CADA3]" /> Capital Protection Structure
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.capitalProtection} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(28, 173, 163, 0.05)' }} />
                                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                                                    {details.graphs.capitalProtection.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Bar>
                                                            </BarChart>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </ResponsiveContainer>
                                                </div>
                                            </section>
                                        )}

                                        {/* Recovery Strategy Mix */}
                                        {details.graphs?.recoveryStrategy && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-[#2076C7]" /> Recovery Strategy Mix
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.recoveryStrategy} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(32, 118, 199, 0.05)' }} />
                                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                                                    {details.graphs.recoveryStrategy.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Bar>
                                                            </BarChart>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </ResponsiveContainer>
                                                </div>
                                            </section>
                                        )}

                                        {/* Capital Structure */}
                                        {details.graphs?.capitalStructure && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <BarIcon className="w-4 h-4 text-[#2076C7]" /> Capital Structure
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.capitalStructure} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(32, 118, 199, 0.05)' }} />
                                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                                                    {details.graphs.capitalStructure.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Bar>
                                                            </BarChart>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </ResponsiveContainer>
                                                </div>
                                            </section>
                                        )}

                                        {/* Security Structure */}
                                        {details.graphs?.securityStructure && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <ShieldCheck className="w-4 h-4 text-[#1CADA3]" /> Security Structure Breakdown
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.securityStructure} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(28, 173, 163, 0.05)' }} />
                                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                                                    {details.graphs.securityStructure.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Bar>
                                                            </BarChart>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </ResponsiveContainer>
                                                </div>
                                            </section>
                                        )}

                                        {/* Deployment Progress */}
                                        {details.graphs?.deployment && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-[#1CADA3]" /> Capital Deployment
                                                </h4>
                                                <div className="relative pt-1">
                                                    <div className="flex mb-2 items-center justify-between">
                                                        <div>
                                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#1CADA3] bg-[#1CADA3]/20">
                                                                Deployed
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-xs font-semibold inline-block text-[#1CADA3]">
                                                                {details.graphs.deployment}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#1CADA3]/20">
                                                        <div style={{ width: `${details.graphs.deployment}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1CADA3] transition-all duration-1000 ease-out"></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 text-right">
                                                        {100 - details.graphs.deployment}% Available for Deployment
                                                    </p>
                                                </div>
                                            </section>
                                        )}

                                    </div>

                                    {/* Right Column (Sidebar) */}
                                    <div className="space-y-6">

                                        {/* Key Metrics */}
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Fund Overview</h4>
                                            <ul className="space-y-4">
                                                <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                                                    <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                                        <IndianRupee className="w-4 h-4 text-[#1CADA3]" /> Min Investment
                                                    </span>
                                                    <span className="font-bold text-gray-900">{details.minCommitment}</span>
                                                </li>
                                                <li className="flex justify-between items-center border-b border-gray-100 pb-3">
                                                    <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                                        <Clock className="w-4 h-4 text-[#1CADA3]" /> Tenure
                                                    </span>
                                                    <span className="font-bold text-gray-900">{details.tenure}</span>
                                                </li>
                                                <li className="flex justify-between items-center pb-1">
                                                    <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                                        <Target className="w-4 h-4 text-[#1CADA3]" /> Target IRR
                                                    </span>
                                                    <span className="font-bold text-green-600">{details.targetIRR}</span>
                                                </li>
                                                {details.liquidity && (
                                                    <li className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                                                        <span className="text-gray-500 font-medium flex items-center gap-2.5 text-sm">
                                                            <ShieldCheck className="w-4 h-4 text-[#1CADA3]" /> Liquidity & Lock-in
                                                        </span>
                                                        <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                                                            {details.liquidity}
                                                        </p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Fund Manager */}
                                        <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] p-6 rounded-2xl shadow-lg text-white">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                                    <Users className="w-5 h-5 text-white" />
                                                </div>
                                                <h4 className="font-bold text-lg">Fund Manager</h4>
                                            </div>
                                            <p className="text-white font-bold mb-1">{details.manager}</p>
                                            <p className="text-white/90 text-sm leading-relaxed mb-4">
                                                {details.managerDescription || "Experienced investment team with sector expertise."}
                                            </p>
                                        </div>

                                        {/* Fees */}
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Fee Structure</h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                                    <span className="text-gray-500 font-medium text-sm">Management Fee</span>
                                                    <span className="font-bold text-gray-900 text-right">{details.fees?.management || "As per PPM"}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                                    <span className="text-gray-500 font-medium text-sm">Performance Fee</span>
                                                    <span className="font-bold text-gray-900 text-right">{details.fees?.performance || "20%"}</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-1">
                                                    <span className="text-gray-500 font-medium text-sm">Hurdle Rate</span>
                                                    <span className="font-bold text-gray-900 text-right">{details.fees?.hurdle || "As per PPM"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="space-y-3">
                                            <button 
                                                onClick={() => {
                                                    onClose();
                                                    openLogin();
                                                }}
                                                className="w-full py-4 px-4 bg-[#2076C7] hover:bg-[#2076C7]/90 text-white rounded-xl font-bold shadow-lg shadow-[#2076C7]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                                            >
                                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                Apply Now
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
