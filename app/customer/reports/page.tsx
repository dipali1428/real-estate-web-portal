'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Report Categories Data
const reportCategories = [
    {
        id: 'summary',
        name: 'Portfolio Summary',
        icon: '📊',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'Complete 360° view of your investments'
    },
    {
        id: 'mutual-funds',
        name: 'Mutual Funds',
        icon: '📈',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'SIP, Lump Sum, XIRR, Capital Gains'
    },
    {
        id: 'pms',
        name: 'PMS',
        icon: '🏦',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'Portfolio Management Services'
    },
    {
        id: 'aif',
        name: 'AIF',
        icon: '🏛️',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'Alternative Investment Funds'
    },
    {
        id: 'nps',
        name: 'NPS',
        icon: '👴',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'National Pension System'
    },
    {
        id: 'real-estate',
        name: 'Real Estate',
        icon: '🏠',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'Property & Rental Income'
    },
    {
        id: 'unlisted',
        name: 'Unlisted Shares',
        icon: '📄',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'Pre-IPO & Private Equity'
    },
    {
        id: 'goals',
        name: 'Goal Tracker',
        icon: '🎯',
        color: 'from-[#2076C7] to-[#1CADA3]',
        description: 'Goal-based planning'
    }
];

export default function Reports() {
    const [selectedReport, setSelectedReport] = useState('summary');
    const [dateRange, setDateRange] = useState('1y');
    const [showExportMenu, setShowExportMenu] = useState(false);

    // All values set to ZERO for demo/POC
    const portfolioSummary = {
        totalInvested: 0,
        currentValue: 0,
        totalProfit: 0,
        xirr: 0,
        absoluteReturn: 0,
        riskScore: 0,
        assetAllocation: [
            { class: 'Mutual Funds', amount: 0, percentage: 0 },
            { class: 'PMS', amount: 0, percentage: 0 },
            { class: 'AIF', amount: 0, percentage: 0 },
            { class: 'Bonds/NCD', amount: 0, percentage: 0 },
            { class: 'FD', amount: 0, percentage: 0 },
            { class: 'NPS', amount: 0, percentage: 0 },
            { class: 'Real Estate', amount: 0, percentage: 0 },
            { class: 'Unlisted', amount: 0, percentage: 0 }
        ]
    };

    // Format currency with zero handling
    const formatCurrency = (value: number) => {
        if (value === 0) return '₹0';
        return `₹${(value / 100000).toFixed(2)}L`;
    };

    // Format percentage with zero handling
    const formatPercentage = (value: number) => {
        if (value === 0) return '0%';
        return `${value}%`;
    };

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">
                            📊 Financial Reports
                        </h2>
                        <p className="text-sm sm:text-base opacity-90">
                            Complete 360° view of your investment portfolio
                        </p>
                    </div>
                </div>
                
                {/* Date Range Filter */}
                <div className="flex items-center space-x-2 mt-4">
                    {['1m', '3m', '6m', '1y', '3y', '5y', 'all'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                dateRange === range
                                    ? 'bg-white text-[#2076C7]'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                        >
                            {range === 'all' ? 'Max' : range.toUpperCase()}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Report Categories Navigation */}
            <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 pb-2">
                    {reportCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedReport(category.id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                selectedReport === category.id
                                    ? `bg-linear-to-r ${category.color} text-white shadow-md`
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                            }`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Report Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedReport}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Portfolio Summary Report */}
                    {selectedReport === 'summary' && (
                        <div className="space-y-6">
                            {/* KPI Cards - All Zeros */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Total Invested</div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {formatCurrency(portfolioSummary.totalInvested)}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">As of today</div>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Current Value</div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {formatCurrency(portfolioSummary.currentValue)}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">No change</div>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">XIRR</div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        {formatPercentage(portfolioSummary.xirr)}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Annualized return</div>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Risk Score</div>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-2xl font-bold text-gray-800">
                                            {portfolioSummary.riskScore}
                                        </div>
                                        <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                            Not rated
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
                                        <div 
                                            className="h-1.5 bg-gray-300 rounded-full"
                                            style={{ width: '0%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Asset Allocation Table - All Zeros */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    📊 Asset Allocation
                                </h3>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">Asset Class</th>
                                                <th className="text-right py-3 text-sm font-medium text-gray-500">Amount (₹)</th>
                                                <th className="text-right py-3 text-sm font-medium text-gray-500">Allocation %</th>
                                                <th className="w-32"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {portfolioSummary.assetAllocation.map((asset, index) => (
                                                <tr key={asset.class} className="border-b border-gray-50">
                                                    <td className="py-3 text-sm text-gray-800">{asset.class}</td>
                                                    <td className="py-3 text-sm text-gray-800 text-right">
                                                        {formatCurrency(asset.amount)}
                                                    </td>
                                                    <td className="py-3 text-sm text-gray-800 text-right">
                                                        {formatPercentage(asset.percentage)}
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="w-full h-2 bg-gray-100 rounded-full">
                                                            <div 
                                                                className="h-2 rounded-full bg-gray-300"
                                                                style={{ width: '0%' }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Empty State Chart */}
                                <div className="mt-6 h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-3xl text-gray-400">📊</span>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-2">No allocation data yet</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other report types - All with consistent empty states */}
                    {selectedReport !== 'summary' && (
                        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl text-gray-400">
                                    {reportCategories.find(c => c.id === selectedReport)?.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {reportCategories.find(c => c.id === selectedReport)?.name}
                            </h3>
                            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                                {reportCategories.find(c => c.id === selectedReport)?.description}
                            </p>
                            
                            {/* Empty State Metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xs text-gray-400 mb-1">Total Value</div>
                                    <div className="text-lg font-semibold text-gray-300">₹0</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xs text-gray-400 mb-1">Returns</div>
                                    <div className="text-lg font-semibold text-gray-300">0%</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xs text-gray-400 mb-1">Investments</div>
                                    <div className="text-lg font-semibold text-gray-300">0</div>
                                </div>
                            </div>
                            
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">
                                Generate {reportCategories.find(c => c.id === selectedReport)?.name}
                            </button>
                            
                            <p className="text-xs text-gray-400 mt-4">
                                No data available. Click above to generate your first report.
                            </p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}