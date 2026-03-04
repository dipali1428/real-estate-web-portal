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

// Union type for all possible metrics
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

// Wishlist Categories
const wishlistCategories = [
    { id: 'all', name: 'All Items', icon: '❤️', count: 12, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: '📈', count: 5, color: 'from-blue-500 to-cyan-500' },
    { id: 'pms', name: 'PMS', icon: '🏦', count: 2, color: 'from-purple-500 to-pink-500' },
    { id: 'aif', name: 'AIF', icon: '🏛️', count: 1, color: 'from-yellow-500 to-orange-500' },
    { id: 'fixed-income', name: 'Fixed Income', icon: '💰', count: 3, color: 'from-indigo-500 to-purple-500' },
    { id: 'nps', name: 'NPS', icon: '👴', count: 1, color: 'from-red-500 to-pink-500' },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', count: 2, color: 'from-teal-500 to-green-500' },
    { id: 'unlisted', name: 'Unlisted Shares', icon: '📄', count: 1, color: 'from-gray-700 to-gray-900' },
];

// Sample Wishlist Data
const wishlistItems: WishlistItem[] = [
    // Mutual Funds
    {
        id: 1,
        category: 'mutual-funds',
        name: 'HDFC Balanced Advantage Fund',
        logo: 'HDFC',
        keyMetrics: {
            returns: { '1Y': 18.5, '3Y': 15.2, '5Y': 14.8 },
            risk: 'Moderate',
            expenseRatio: 1.2,
            minSIP: 500,
            nav: 325.45
        },
        addedDate: '2024-01-15',
        fitScore: 92,
        portfolioFit: 'Excellent match for your balanced portfolio',
        alert: 'NAV dropped 3% this week'
    },
    {
        id: 2,
        category: 'mutual-funds',
        name: 'SBI Small Cap Fund',
        logo: 'SBI',
        keyMetrics: {
            returns: { '1Y': 32.5, '3Y': 24.8, '5Y': 19.2 },
            risk: 'High',
            expenseRatio: 1.45,
            minSIP: 1000,
            nav: 187.90
        },
        addedDate: '2024-01-20',
        fitScore: 78,
        portfolioFit: 'Increases your small cap allocation',
        alert: 'Outperforming benchmark by 5%'
    },
    // PMS
    {
        id: 3,
        category: 'pms',
        name: 'ASK Midcap Momentum PMS',
        logo: 'ASK',
        keyMetrics: {
            returns: { '1Y': 28.5, '3Y': 22.3, '5Y': 18.5 },
            benchmark: 'Nifty Midcap 150',
            minInvestment: 5000000,
            lockIn: '3 years',
            risk: 'High'
        },
        addedDate: '2024-01-10',
        fitScore: 85,
        portfolioFit: 'Strong momentum strategy',
        alert: 'Entry fee waived this month'
    },
    // AIF
    {
        id: 8,
        category: 'aif',
        name: 'Motilal Oswal AIF Series 3',
        logo: 'MO',
        keyMetrics: {
            category: 'Category II',
            minInvestment: 10000000,
            targetIRR: 18,
            lockIn: '5 years',
            tenure: '7 years',
            sector: 'Mid-cap',
            risk: 'Very High'
        },
        addedDate: '2024-01-22',
        fitScore: 75,
        portfolioFit: 'Adds diversification to your portfolio',
        alert: 'Capital call expected next month'
    },
    // Fixed Income
    {
        id: 4,
        category: 'fixed-income',
        name: 'HDFC Bank FD',
        logo: 'HDFC Bank',
        keyMetrics: {
            interestRate: 7.25,
            tenure: '12-60 months',
            maturityAmount: 120625,
            minInvestment: 10000,
            prematureWithdrawal: '0.5% penalty',
            tds: '10% if PAN available',
            risk: 'Low'
        },
        addedDate: '2024-01-05',
        fitScore: 95,
        portfolioFit: 'Adds stability to your portfolio',
        alert: 'Maturity in 15 days - Consider renewal'
    },
    {
        id: 5,
        category: 'fixed-income',
        name: 'REC Bonds - Series 12',
        logo: 'REC',
        keyMetrics: {
            couponRate: 8.10,
            ytm: 8.15,
            creditRating: 'AAA',
            maturityDate: '2030-03-15',
            interestPayment: 'Annual',
            minInvestment: 10000,
            risk: 'Low'
        },
        addedDate: '2024-01-18',
        fitScore: 88,
        portfolioFit: 'High credit quality bond',
        alert: 'Rating upgraded to AAA'
    },
    // NPS
    {
        id: 9,
        category: 'nps',
        name: 'HDFC Pension Fund - Tier I',
        logo: 'HDFC Pension',
        keyMetrics: {
            equityAllocation: 50,
            expectedPension: 45000,
            taxBenefit: '80C & 80CCD(1B)',
            estimatedCorpus: 12000000,
            risk: 'Moderate'
        },
        addedDate: '2024-01-25',
        fitScore: 82,
        portfolioFit: 'Good for retirement planning',
        alert: 'Contribution due in 10 days'
    },
    // Real Estate
    {
        id: 6,
        category: 'real-estate',
        name: 'Lodha Luxury - Palava',
        logo: 'Lodha',
        keyMetrics: {
            price: 12500000,
            location: 'Palava, Mumbai',
            expectedAppreciation: 12,
            rentalYield: 3.5,
            possessionDate: '2025-12-31',
            developer: 'Lodha Group',
            emi: 85000,
            risk: 'Moderate'
        },
        addedDate: '2024-01-12',
        fitScore: 82,
        portfolioFit: 'Good appreciation potential',
        alert: 'Pre-launch prices end this month'
    },
    // Unlisted Shares
    {
        id: 7,
        category: 'unlisted',
        name: 'Ola Electric',
        logo: 'Ola',
        keyMetrics: {
            sector: 'EV',
            lastFundingRound: '₹2,50,000/share',
            lockIn: '1 year post IPO',
            expectedExit: '12-18 months',
            minLot: 10,
            currentPrice: 250000,
            risk: 'Very High'
        },
        addedDate: '2024-01-08',
        fitScore: 70,
        portfolioFit: 'High risk - High reward',
        alert: 'IPO expected in Q3 2024'
    },
];

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
        return item.keyMetrics?.risk || 'Moderate';
    };

    // Helper to get risk color
    const getRiskColor = (risk: string) => {
        if (risk === 'High' || risk === 'Very High') return 'bg-orange-100 text-orange-600';
        if (risk === 'Moderate') return 'bg-yellow-100 text-yellow-600';
        return 'bg-green-100 text-green-600';
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
                            ❤️ My Wishlist
                        </h2>
                        <p className="text-sm sm:text-base opacity-90">
                            Save, track, and compare investments for later
                        </p>
                    </div>
                    
                    {/* Compare Button */}
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
                                            } flex items-center justify-center text-white font-bold text-sm`}>
                                                {item.logo}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                        {item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${riskColor}`}>
                                                        {riskLevel} Risk
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

                                {/* Item Details - Dynamic based on category */}
                                <div className="p-4">
                                    {/* Mutual Funds */}
                                    {isMutualFund(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                {['1Y', '3Y', '5Y'].map(period => {
                                                    const metrics = item.keyMetrics as MutualFundMetrics;
                                                    return (
                                                        <div key={period} className="bg-gray-50 rounded-lg p-2">
                                                            <div className="text-xs text-gray-500">{period} Return</div>
                                                            <div className="text-sm font-semibold text-green-600">
                                                                {metrics.returns?.[period as keyof typeof metrics.returns] || 0}%
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {item.keyMetrics.nav && item.keyMetrics.expenseRatio && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">NAV: <span className="text-gray-800 font-medium">₹{item.keyMetrics.nav}</span></span>
                                                    <span className="text-gray-500">Expense: <span className="text-gray-800 font-medium">{item.keyMetrics.expenseRatio}%</span></span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* PMS */}
                                    {isPMS(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-purple-600">Min Investment</div>
                                                    <div className="text-sm font-semibold text-purple-700">₹{(item.keyMetrics.minInvestment! / 100000).toFixed(0)}L</div>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-purple-600">Lock-in</div>
                                                    <div className="text-sm font-semibold text-purple-700">{item.keyMetrics.lockIn}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['1Y', '3Y', '5Y'].map(period => {
                                                    const metrics = item.keyMetrics as PMSMetrics;
                                                    return (
                                                        <div key={period} className="bg-gray-50 rounded-lg p-2">
                                                            <div className="text-xs text-gray-500">{period}</div>
                                                            <div className="text-sm font-semibold text-green-600">
                                                                {metrics.returns?.[period as keyof typeof metrics.returns] || 0}%
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {item.keyMetrics.benchmark && (
                                                <div className="text-xs text-gray-500">Benchmark: {item.keyMetrics.benchmark}</div>
                                            )}
                                        </div>
                                    )}

                                    {/* AIF */}
                                    {isAIF(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-yellow-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-yellow-600">Target IRR</div>
                                                    <div className="text-sm font-semibold text-yellow-700">{item.keyMetrics.targetIRR}%</div>
                                                </div>
                                                <div className="bg-yellow-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-yellow-600">Lock-in</div>
                                                    <div className="text-sm font-semibold text-yellow-700">{item.keyMetrics.lockIn}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                <span className="font-medium">Category:</span> {item.keyMetrics.category} • {item.keyMetrics.sector}
                                            </div>
                                        </div>
                                    )}

                                    {/* Fixed Income */}
                                    {isFixedIncome(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                {item.keyMetrics.interestRate && (
                                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                                        <div className="text-xs text-blue-600">Interest Rate</div>
                                                        <div className="text-lg font-bold text-blue-700">{item.keyMetrics.interestRate}%</div>
                                                    </div>
                                                )}
                                                {item.keyMetrics.ytm && (
                                                    <div className="bg-green-50 rounded-lg p-3 text-center">
                                                        <div className="text-xs text-green-600">YTM</div>
                                                        <div className="text-lg font-bold text-green-700">{item.keyMetrics.ytm}%</div>
                                                    </div>
                                                )}
                                            </div>
                                            {item.keyMetrics.creditRating && (
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Credit Rating:</span> {item.keyMetrics.creditRating}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* NPS */}
                                    {isNPS(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-red-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-red-600">Equity</div>
                                                    <div className="text-sm font-semibold text-red-700">{item.keyMetrics.equityAllocation}%</div>
                                                </div>
                                                <div className="bg-red-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-red-600">Est. Pension</div>
                                                    <div className="text-sm font-semibold text-red-700">₹{((item.keyMetrics.expectedPension || 0)/1000).toFixed(0)}K</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {item.keyMetrics.taxBenefit}
                                            </div>
                                        </div>
                                    )}

                                    {/* Real Estate */}
                                    {isRealEstate(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-teal-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-teal-600">Price</div>
                                                    <div className="text-sm font-semibold text-teal-700">₹{(item.keyMetrics.price! / 10000000).toFixed(2)}Cr</div>
                                                </div>
                                                <div className="bg-teal-50 rounded-lg p-2 text-center">
                                                    <div className="text-xs text-teal-600">Yield</div>
                                                    <div className="text-sm font-semibold text-teal-700">{item.keyMetrics.rentalYield}%</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                <span className="font-medium">Location:</span> {item.keyMetrics.location}
                                            </div>
                                            {item.keyMetrics.possessionDate && (
                                                <div className="text-xs text-gray-600">
                                                    <span className="font-medium">Possession:</span> {item.keyMetrics.possessionDate}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Unlisted Shares */}
                                    {isUnlisted(item.keyMetrics) && (
                                        <div className="space-y-3">
                                            <div className="bg-purple-50 rounded-lg p-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-purple-600">Last Funding</span>
                                                    <span className="text-sm font-semibold text-purple-700">{item.keyMetrics.lastFundingRound}</span>
                                                </div>
                                                {item.keyMetrics.expectedExit && (
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-xs text-purple-600">Expected Exit</span>
                                                        <span className="text-sm font-semibold text-purple-700">{item.keyMetrics.expectedExit}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center">
                                                <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                                                </svg>
                                                {item.keyMetrics.minLot && `Min Lot: ${item.keyMetrics.minLot} shares`} 
                                                {item.keyMetrics.lockIn && ` | Lock-in: ${item.keyMetrics.lockIn}`}
                                            </div>
                                        </div>
                                    )}

                                    {/* Portfolio Fit Score */}
                                    {item.fitScore !== undefined && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Portfolio Fit Score</span>
                                                <span className="text-xs font-medium text-gray-700">{item.fitScore}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                                <div 
                                                    className={`h-1.5 rounded-full ${
                                                        item.fitScore >= 80 ? 'bg-green-500' :
                                                        item.fitScore >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                                                    }`}
                                                    style={{ width: `${item.fitScore}%` }}
                                                ></div>
                                            </div>
                                            {item.portfolioFit && (
                                                <p className="text-xs text-gray-500 mt-1">{item.portfolioFit}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Alert Banner */}
                                    {item.alert && (
                                        <div className="mt-3 bg-amber-50 rounded-lg p-2 flex items-start space-x-2">
                                            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            <p className="text-xs text-amber-700">{item.alert}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <button className="flex-1 bg-[#2076C7] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#1a5e9e] transition-colors">
                                            Invest Now
                                        </button>
                                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" title="Discuss with RM">
                                            💬
                                        </button>
                                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors" title="Share">
                                            📱
                                        </button>
                                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors" title="Remove">
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
            {filteredItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-4xl">❤️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                    <p className="text-sm text-gray-400 mb-4">Start adding investment products to track them here</p>
                    <button className="px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e] transition-colors">
                        Browse Products
                    </button>
                </motion.div>
            )}

            {/* AI Recommendation Banner */}
            <div className="mt-6 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 rounded-2xl p-4 border border-[#2076C7]/20">
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#2076C7] rounded-lg flex items-center justify-center text-white">
                        <span className="text-lg">🤖</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-[#2076C7]">AI Recommendation</h4>
                        <p className="text-xs text-gray-600 mt-1">
                            Based on your portfolio, you might also like: 
                            <span className="font-medium"> "ICICI Prudential Bluechip Fund"</span> and 
                            <span className="font-medium"> "SBI Magnum Midcap Fund"</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}