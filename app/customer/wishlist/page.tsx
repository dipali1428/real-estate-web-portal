'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for wishlist items
interface MutualFundMetrics {
    returns?: { '1Y': number; '3Y': number; '5Y': number };
    risk: string;
    expenseRatio?: number;
    minSIP?: number;
    nav?: number;
}

interface PMSMetrics {
    returns?: { '1Y': number; '3Y': number; '5Y': number };
    benchmark?: string;
    minInvestment?: number;
    lockIn?: string;
    risk: string;
}

interface AIFMetrics {
    category?: string;
    minInvestment?: number;
    targetIRR?: number;
    lockIn?: string;
    tenure?: string;
    sector?: string;
    risk: string;
}

interface FixedIncomeMetrics {
    interestRate?: number;
    ytm?: number;
    creditRating?: string;
    tenure?: string;
    maturityAmount?: number;
    minInvestment?: number;
    prematureWithdrawal?: string;
    tds?: string;
    couponRate?: number;
    maturityDate?: string;
    interestPayment?: string;
    risk: string;
}

interface NPSMetrics {
    equityAllocation?: number;
    expectedPension?: number;
    taxBenefit?: string;
    estimatedCorpus?: number;
    risk: string;
}

interface RealEstateMetrics {
    price?: number;
    location?: string;
    expectedAppreciation?: number;
    rentalYield?: number;
    possessionDate?: string;
    developer?: string;
    emi?: number;
    risk: string;
}

interface UnlistedMetrics {
    sector?: string;
    lastFundingRound?: string;
    lockIn?: string;
    expectedExit?: string;
    minLot?: number;
    currentPrice?: number;
    risk: string;
}

type ProductMetrics = 
    | MutualFundMetrics 
    | PMSMetrics 
    | AIFMetrics 
    | FixedIncomeMetrics 
    | NPSMetrics 
    | RealEstateMetrics 
    | UnlistedMetrics;

interface WishlistItem {
    id: number;
    category: string;
    name: string;
    logo: string;
    keyMetrics: ProductMetrics;
    addedDate: string;
    fitScore?: number;
    portfolioFit?: string;
    alert?: string;
}

// Type guards
const isMutualFund = (metrics: ProductMetrics): metrics is MutualFundMetrics => {
    return (metrics as MutualFundMetrics).returns !== undefined;
};

const isPMS = (metrics: ProductMetrics): metrics is PMSMetrics => {
    return (metrics as PMSMetrics).benchmark !== undefined;
};

const isAIF = (metrics: ProductMetrics): metrics is AIFMetrics => {
    return (metrics as AIFMetrics).targetIRR !== undefined;
};

const isFixedIncome = (metrics: ProductMetrics): metrics is FixedIncomeMetrics => {
    return (metrics as FixedIncomeMetrics).interestRate !== undefined || 
           (metrics as FixedIncomeMetrics).ytm !== undefined;
};

const isNPS = (metrics: ProductMetrics): metrics is NPSMetrics => {
    return (metrics as NPSMetrics).equityAllocation !== undefined;
};

const isRealEstate = (metrics: ProductMetrics): metrics is RealEstateMetrics => {
    return (metrics as RealEstateMetrics).price !== undefined;
};

const isUnlisted = (metrics: ProductMetrics): metrics is UnlistedMetrics => {
    return (metrics as UnlistedMetrics).lastFundingRound !== undefined;
};

// Wishlist Categories - All counts set to 0
const wishlistCategories = [
    { id: 'all', name: 'All Items', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: '📈', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'pms', name: 'PMS', icon: '🏦', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'aif', name: 'AIF', icon: '🏛️', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'fixed-income', name: 'Fixed Income', icon: '💰', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'nps', name: 'NPS', icon: '👴', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'unlisted', name: 'Unlisted Shares', icon: '📄', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
];

// EMPTY WISHLIST - No dummy data
const wishlistItems: WishlistItem[] = [];

export default function Wishlist() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showCompare, setShowCompare] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter items based on category and search
    const filteredItems = wishlistItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Toggle item selection for comparison
    const toggleItemSelection = (itemId: number) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                if (prev.length < 4) {
                    return [...prev, itemId];
                }
                return prev;
            }
        });
    };

    // Helper to safely get risk level
    const getRiskLevel = (item: WishlistItem): string => {
        return item.keyMetrics?.risk || '--';
    };

    // Helper to get risk color
    const getRiskColor = (risk: string) => {
        if (risk === 'High' || risk === 'Very High') return 'bg-orange-100 text-orange-600';
        if (risk === 'Moderate') return 'bg-yellow-100 text-yellow-600';
        if (risk === 'Low') return 'bg-green-100 text-green-600';
        return 'bg-gray-100 text-gray-600';
    };

    // Format currency with zero handling
    const formatCurrency = (value: number | undefined) => {
        if (value === undefined || value === 0) return '--';
        return `₹${value.toLocaleString()}`;
    };

    // Format percentage with zero handling
    const formatPercentage = (value: number | undefined) => {
        if (value === undefined || value === 0) return '--';
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
                            My Wishlist
                        </h2>
                        <p className="text-sm sm:text-base opacity-90">
                            Save, track, and compare investments for later
                        </p>
                    </div>
                    
                    {/* Compare Button - Hidden when no items selected */}
                    {selectedItems.length > 0 && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => setShowCompare(true)}
                            className="bg-white text-[#2076C7] px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-lg"
                        >
                            <span>🔍 Compare</span>
                            <span className="bg-[#2076C7] text-white px-1.5 py-0.5 rounded-full text-xs">
                                {selectedItems.length}
                            </span>
                        </motion.button>
                    )}
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search in wishlist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                    />
                    <svg className="w-4 h-4 absolute left-3 top-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </motion.div>

            {/* Category Filters */}
            <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 pb-2">
                    {wishlistCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
                                selectedCategory === category.id
                                    ? `bg-linear-to-r ${category.color || 'from-[#2076C7] to-[#1CADA3]'} text-white shadow-md`
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                            }`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                selectedCategory === category.id
                                    ? 'bg-white/30'
                                    : 'bg-gray-100 text-gray-600'
                            }`}>
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {filteredItems.map((item, index) => {
                        const riskLevel = getRiskLevel(item);
                        const riskColor = getRiskColor(riskLevel);
                        
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                            >
                                {/* Item Header */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3">
                                            {/* Logo Placeholder */}
                                            <div className={`w-10 h-10 rounded-xl bg-linear-to-r ${
                                                wishlistCategories.find(c => c.id === item.category)?.color || 'from-gray-500 to-gray-600'
                                            } flex items-center justify-center text-white font-bold text-sm opacity-50`}>
                                                {item.logo}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                        {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${riskColor}`}>
                                                        {riskLevel}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Compare Checkbox */}
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => toggleItemSelection(item.id)}
                                                className="w-4 h-4 text-[#2076C7] rounded border-gray-300 focus:ring-[#2076C7]"
                                            />
                                            <span className="text-xs text-gray-400">Compare</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Item Details */}
                                <div className="p-4">
                                    {/* Mutual Funds */}
                                    {isMutualFund(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                {['1Y', '3Y', '5Y'].map(period => (
                                                    <div key={period} className="bg-gray-50 rounded-lg p-2">
                                                        <div className="text-xs text-gray-500">{period} Return</div>
                                                        <div className="text-sm font-semibold text-gray-600">--</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">NAV: <span className="text-gray-600 font-medium">--</span></span>
                                                <span className="text-gray-500">Expense: <span className="text-gray-600 font-medium">--</span></span>
                                            </div>
                                        </div>
                                    )}

                                    {/* PMS */}
                                    {isPMS(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-purple-600">Min Investment</div>
                                                    <div className="text-sm font-semibold text-purple-700">--</div>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-purple-600">Lock-in</div>
                                                    <div className="text-sm font-semibold text-purple-700">--</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['1Y', '3Y', '5Y'].map(period => (
                                                    <div key={period} className="bg-gray-50 rounded-lg p-2">
                                                        <div className="text-xs text-gray-500">{period}</div>
                                                        <div className="text-sm font-semibold text-gray-600">--</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-xs text-gray-500">Benchmark: --</div>
                                        </div>
                                    )}

                                    {/* AIF */}
                                    {isAIF(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-yellow-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-yellow-600">Target IRR</div>
                                                    <div className="text-sm font-semibold text-yellow-700">--</div>
                                                </div>
                                                <div className="bg-yellow-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-yellow-600">Lock-in</div>
                                                    <div className="text-sm font-semibold text-yellow-700">--</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                <span className="font-medium">Category:</span> -- • --
                                            </div>
                                        </div>
                                    )}

                                    {/* Fixed Income */}
                                    {isFixedIncome(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-blue-50 rounded-lg p-3 text-center">
                                                    <div className="text-xs text-blue-600">Interest Rate</div>
                                                    <div className="text-lg font-bold text-blue-700">--</div>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3 text-center">
                                                    <div className="text-xs text-green-600">YTM</div>
                                                    <div className="text-lg font-bold text-green-700">--</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Credit Rating:</span> --
                                            </div>
                                        </div>
                                    )}

                                    {/* NPS */}
                                    {isNPS(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-red-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-red-600">Equity</div>
                                                    <div className="text-sm font-semibold text-red-700">--</div>
                                                </div>
                                                <div className="bg-red-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-red-600">Est. Pension</div>
                                                    <div className="text-sm font-semibold text-red-700">--</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600">--</div>
                                        </div>
                                    )}

                                    {/* Real Estate */}
                                    {isRealEstate(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-teal-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-teal-600">Price</div>
                                                    <div className="text-sm font-semibold text-teal-700">--</div>
                                                </div>
                                                <div className="bg-teal-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-teal-600">Yield</div>
                                                    <div className="text-sm font-semibold text-teal-700">--</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                <span className="font-medium">Location:</span> --
                                            </div>
                                        </div>
                                    )}

                                    {/* Unlisted Shares */}
                                    {isUnlisted(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="bg-purple-50 rounded-lg p-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-purple-600">Last Funding</span>
                                                    <span className="text-sm font-semibold text-purple-700">--</span>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center">
                                                <svg className="w-4 h-4 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                                                </svg>
                                                Min Lot: --
                                            </div>
                                        </div>
                                    )}

                                    {/* Portfolio Fit Score - Zero */}
                                    {item.fitScore !== undefined && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Portfolio Fit Score</span>
                                                <span className="text-xs font-medium text-gray-600">--</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                                <div className="h-1.5 rounded-full bg-gray-300" style={{ width: '0%' }}></div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons - Disabled */}
                                <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <button className="flex-1 bg-gray-300 text-gray-500 py-2 rounded-xl text-sm font-medium cursor-not-allowed opacity-50">
                                            Invest Now
                                        </button>
                                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed opacity-50" disabled>
                                            💬
                                        </button>
                                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed opacity-50" disabled>
                                            📱
                                        </button>
                                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed opacity-50" disabled>
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                <p className="text-sm text-gray-400 mb-4">Start adding investment products to track them here</p>
                <button className="px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e] transition-colors">
                    Browse Products
                </button>
            </motion.div>
        </div>
    );
}