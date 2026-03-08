'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Report Categories Data
const reportCategories = [
    {
        id: 'summary',
        name: 'Portfolio Summary',
        icon: '📊',
        color: 'from-blue-500 to-cyan-500',
        description: 'Complete 360° view of your investments'
    },
    {
        id: 'mutual-funds',
        name: 'Mutual Funds',
        icon: '📈',
        color: 'from-green-500 to-emerald-500',
        description: 'SIP, Lump Sum, XIRR, Capital Gains'
    },
    {
        id: 'pms',
        name: 'PMS',
        icon: '🏦',
        color: 'from-purple-500 to-pink-500',
        description: 'Portfolio Management Services'
    },
    {
        id: 'aif',
        name: 'AIF',
        icon: '🏛️',
        color: 'from-yellow-500 to-orange-500',
        description: 'Alternative Investment Funds'
    },
    {
        id: 'fixed-income',
        name: 'Fixed Income',
        icon: '💰',
        color: 'from-indigo-500 to-purple-500',
        description: 'FD, Bonds, NCD'
    },
    {
        id: 'nps',
        name: 'NPS',
        icon: '👴',
        color: 'from-red-500 to-pink-500',
        description: 'National Pension System'
    },
    {
        id: 'real-estate',
        name: 'Real Estate',
        icon: '🏠',
        color: 'from-teal-500 to-green-500',
        description: 'Property & Rental Income'
    },
    {
        id: 'unlisted',
        name: 'Unlisted Shares',
        icon: '📄',
        color: 'from-gray-700 to-gray-900',
        description: 'Pre-IPO & Private Equity'
    },
    {
        id: 'tax',
        name: 'Tax Report',
        icon: '📑',
        color: 'from-orange-500 to-red-500',
        description: 'Capital Gains, TDS, Tax Liability'
    },
    {
        id: 'net-worth',
        name: 'Net Worth',
        icon: '💎',
        color: 'from-cyan-500 to-blue-500',
        description: 'Assets - Liabilities'
    },
    {
        id: 'goals',
        name: 'Goal Tracker',
        icon: '🎯',
        color: 'from-pink-500 to-rose-500',
        description: 'Goal-based planning'
    }
];

export default function Reports() {
    const [selectedReport, setSelectedReport] = useState('summary');
    const [dateRange, setDateRange] = useState('1y');
    const [showExportMenu, setShowExportMenu] = useState(false);

    // Sample data - Replace with actual API data
    const portfolioSummary = {
        totalInvested: 2500000,
        currentValue: 3250000,
        totalProfit: 750000,
        xirr: 14.5,
        absoluteReturn: 30,
        riskScore: 68,
        assetAllocation: [
            { class: 'Mutual Funds', amount: 1200000, percentage: 36.9 },
            { class: 'PMS', amount: 500000, percentage: 15.4 },
            { class: 'AIF', amount: 300000, percentage: 9.2 },
            { class: 'Bonds/NCD', amount: 250000, percentage: 7.7 },
            { class: 'FD', amount: 400000, percentage: 12.3 },
            { class: 'NPS', amount: 150000, percentage: 4.6 },
            { class: 'Real Estate', amount: 350000, percentage: 10.8 },
            { class: 'Unlisted', amount: 100000, percentage: 3.1 }
        ]
    };

    return (
        <div className="flex-1 p-4 sm:p-6">
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
                    
                    {/* Export Options */}
                    <div className="relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Export</span>
                        </button>
                        
                        <AnimatePresence>
                            {showExportMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10"
                                >
                                    <div className="py-2">
                                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                            <span>📄</span>
                                            <span>PDF Report</span>
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                            <span>📊</span>
                                            <span>Excel Export</span>
                                        </button>
                                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                            <span>📧</span>
                                            <span>Email Report</span>
                                        </button>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                            <span>💬</span>
                                            <span>WhatsApp Summary</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                    {/* Portfolio Summary Report (Default) */}
                    {selectedReport === 'summary' && (
                        <div className="space-y-6">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Total Invested</div>
                                    <div className="text-2xl font-bold text-gray-800">
                                        ₹{(portfolioSummary.totalInvested / 100000).toFixed(2)}L
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">As of today</div>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Current Value</div>
                                    <div className="text-2xl font-bold text-green-600">
                                        ₹{(portfolioSummary.currentValue / 100000).toFixed(2)}L
                                    </div>
                                    <div className="text-xs text-green-500 mt-1">↑ +₹{((portfolioSummary.currentValue - portfolioSummary.totalInvested)/100000).toFixed(2)}L</div>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">XIRR</div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {portfolioSummary.xirr}%
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Annualized return</div>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Risk Score</div>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {portfolioSummary.riskScore}
                                        </div>
                                        <div className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                                            Moderate
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
                                        <div 
                                            className="h-1.5 bg-orange-500 rounded-full"
                                            style={{ width: `${portfolioSummary.riskScore}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Asset Allocation Table */}
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
                                                        ₹{(asset.amount / 100000).toFixed(2)}L
                                                    </td>
                                                    <td className="py-3 text-sm text-gray-800 text-right">
                                                        {asset.percentage}%
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="w-full h-2 bg-gray-100 rounded-full">
                                                            <div 
                                                                className={`h-2 rounded-full bg-linear-to-r ${
                                                                    index % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-green-500 to-emerald-500'
                                                                }`}
                                                                style={{ width: `${asset.percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Asset Allocation Pie Chart Placeholder */}
                                <div className="mt-6 h-48 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-r from-blue-500 to-cyan-500 opacity-50"></div>
                                        <p className="text-sm text-gray-400 mt-2">Asset Allocation Chart</p>
                                    </div>
                                </div>
                            </div>

                            {/* Alerts Section */}
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-semibold text-amber-800">Alerts</h4>
                                        <div className="mt-2 space-y-2">
                                            <div className="text-xs text-amber-700 flex items-center space-x-2">
                                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                                <span>Equity allocation is 52% (above recommended 50%)</span>
                                            </div>
                                            <div className="text-xs text-amber-700 flex items-center space-x-2">
                                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                                <span>FD of ₹2.5L maturing in 15 days</span>
                                            </div>
                                            <div className="text-xs text-amber-700 flex items-center space-x-2">
                                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                                <span>Retirement goal is underfunded by ₹5L</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other report types */}
                    {selectedReport !== 'summary' && (
                        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">
                                    {reportCategories.find(c => c.id === selectedReport)?.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {reportCategories.find(c => c.id === selectedReport)?.name} Report
                            </h3>
                            <p className="text-sm text-gray-400 max-w-md mx-auto">
                                {reportCategories.find(c => c.id === selectedReport)?.description}
                            </p>
                            <button className="mt-4 px-6 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                                Generate Report
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}