"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, TrendingUp, Briefcase, FileText, Phone, Download, PieChart as PieIcon, BarChart as BarIcon, Target, Users, Clock, IndianRupee } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AIFDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    fund: any; // Using any for flexibility with the strategy object structure
}

const COLORS = ['#2076C7', '#1CADA3', '#4F46E5', '#F59E0B'];

export default function AIFDetailModal({ isOpen, onClose, fund }: AIFDetailModalProps) {
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-8 text-white shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-3 bg-white/10 rounded-xl backdrop-blur-md">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {details.category || "Category II AIF"}
                                            </span>
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {details.structure || "Closed-Ended"}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl font-bold mb-2">{fund.name}</h2>
                                        <p className="text-white/80 text-lg">Managed by {details.manager || fund.manager}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 p-8 bg-gray-50/50">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                    {/* Left Column (Main Info) */}
                                    <div className="lg:col-span-2 space-y-8">

                                        {/* Investment Strategy */}
                                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                                                <Target className="w-5 h-5 text-primary" />
                                                Investment Strategy
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                {details.strategyDescription}
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {details.coreFocusAreas?.map((area: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                                        <span className="text-gray-700 font-medium">{area}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Charts Section */}
                                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Sector Allocation */}
                                            {details.graphs?.sectorAllocation && (
                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                                                    <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                        <PieIcon className="w-4 h-4 text-teal-600" /> {details.graphs.sectorAllocationTitle || "Sector Allocation"}
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
                                                                    <Tooltip />
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
                                                        <BarIcon className="w-4 h-4 text-blue-600" /> {details.graphs.stageAllocationTitle || "Stage Allocation"}
                                                    </h4>
                                                    <div className="h-64 w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            {mounted ? (
                                                                <BarChart data={details.graphs.stageAllocation}>
                                                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                                                    <YAxis hide />
                                                                    <Tooltip cursor={{ fill: 'transparent' }} />
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
                                        </section>

                                        {/* Long vs Short Split */}
                                        {details.graphs?.longShortSplit && (
                                            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                    <PieIcon className="w-4 h-4 text-purple-600" /> Long vs Short Split
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
                                                                    fill="#8884d8"
                                                                    dataKey="value"
                                                                >
                                                                    {details.graphs.longShortSplit.map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip />
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
                                                    <BarIcon className="w-4 h-4 text-purple-600" /> Portfolio Concentration
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.portfolioConcentration} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fontWeight: 500 }} />
                                                                <Tooltip cursor={{ fill: 'transparent' }} />
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
                                                    <ShieldCheck className="w-4 h-4 text-green-600" /> Capital Protection Structure
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.capitalProtection} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip cursor={{ fill: 'transparent' }} />
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
                                                    <TrendingUp className="w-4 h-4 text-blue-600" /> Recovery Strategy Mix
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.recoveryStrategy} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip cursor={{ fill: 'transparent' }} />
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
                                                    <BarIcon className="w-4 h-4 text-indigo-600" /> Capital Structure
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.capitalStructure} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip cursor={{ fill: 'transparent' }} />
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
                                                    <ShieldCheck className="w-4 h-4 text-green-600" /> Security Structure Breakdown
                                                </h4>
                                                <div className="h-64 w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        {mounted ? (
                                                            <BarChart data={details.graphs.securityStructure} layout="vertical">
                                                                <XAxis type="number" hide />
                                                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11, fontWeight: 500 }} />
                                                                <Tooltip cursor={{ fill: 'transparent' }} />
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
                                                    <TrendingUp className="w-4 h-4 text-green-600" /> Capital Deployment
                                                </h4>
                                                <div className="relative pt-1">
                                                    <div className="flex mb-2 items-center justify-between">
                                                        <div>
                                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                                                Deployed
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-xs font-semibold inline-block text-green-600">
                                                                {details.graphs.deployment}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                                                        <div style={{ width: `${details.graphs.deployment}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-1000 ease-out"></div>
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
                                                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                                                    <span className="text-gray-600 flex items-center gap-2"><IndianRupee className="w-4 h-4 text-gray-400" /> Min Investment</span>
                                                    <span className="font-bold text-gray-800">{details.minCommitment}</span>
                                                </li>
                                                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                                                    <span className="text-gray-600 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> Tenure</span>
                                                    <span className="font-bold text-gray-800">{details.tenure}</span>
                                                </li>
                                                <li className="flex justify-between items-center border-b border-gray-50 pb-2">
                                                    <span className="text-gray-600 flex items-center gap-2"><Target className="w-4 h-4 text-gray-400" /> Target IRR</span>
                                                    <span className="font-bold text-green-600">{details.targetIRR}</span>
                                                </li>
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
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Management Fee</span>
                                                    <span className="font-medium text-gray-900">{details.fees?.management || "As per PPM"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Performance Fee</span>
                                                    <span className="font-medium text-gray-900">{details.fees?.performance || "20%"}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Hurdle Rate</span>
                                                    <span className="font-medium text-gray-900">{details.fees?.hurdle || "As per PPM"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="space-y-3">
                                            <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                Request PPM
                                            </button>
                                            <button className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                                <Phone className="w-5 h-5 text-gray-500" />
                                                Schedule Call
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
