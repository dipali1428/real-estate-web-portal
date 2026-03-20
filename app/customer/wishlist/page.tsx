'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import customerService from '../../services/customerService';

// Types for wishlist items from API
interface ApiWishlistItem {
    id: number;
    user_id: number;
    product_type: string;
    product_id: number;
    product_name: string;
    created_at: string;
}

// Extended types for UI metrics
interface MutualFundMetrics {
    returns: { '1Y': number; '3Y': number; '5Y': number };
    risk: string;
    expenseRatio?: number;
    minSIP?: number;
    nav?: number;
}

interface PMSMetrics {
    returns: { '1Y': number; '3Y': number; '5Y': number };
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

interface WishlistItem extends ApiWishlistItem {
    keyMetrics: ProductMetrics;
    fitScore?: number;
    portfolioFit?: string;
    alert?: string;
    logo?: string;
}

// Type guards - using property existence checks
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

// Map API product types to category IDs
const productTypeToCategoryId: Record<string, string> = {
    'unlisted_share': 'unlisted',
    'mutual_fund': 'mutual-funds',
    'pms': 'pms',
    'aif': 'aif',
    'fixed_income': 'fixed-income',
    'nps': 'nps',
    'real_estate': 'real-estate',
};

// Wishlist Categories
const wishlistCategories = [
    { id: 'all', name: 'All Items', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'unlisted', name: 'Unlisted Shares', icon: '📄', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'mutual-funds', name: 'Mutual Funds', icon: '📈', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'pms', name: 'PMS', icon: '🏦', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'aif', name: 'AIF', icon: '🏛️', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'fixed-income', name: 'Fixed Income', icon: '💰', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'nps', name: 'NPS', icon: '👴', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', count: 0, color: 'from-[#2076C7] to-[#1CADA3]' }, 
];

// Helper function to generate mock metrics based on product type
const generateMockMetrics = (productType: string): ProductMetrics => {
    switch (productType) {
        case 'unlisted_share':
            return {
                sector: 'Technology',
                lastFundingRound: 'Series C',
                lockIn: '1 Year',
                expectedExit: '3-5 Years',
                minLot: 100,
                currentPrice: 1250,
                risk: 'High'
            };
        case 'mutual_fund':
            return {
                returns: { '1Y': 15.5, '3Y': 42.8, '5Y': 78.3 },
                risk: 'Moderate',
                expenseRatio: 1.2,
                minSIP: 500,
                nav: 125.45
            };
        case 'pms':
            return {
                returns: { '1Y': 18.2, '3Y': 52.5, '5Y': 95.6 },
                benchmark: 'Nifty 50 TRI',
                minInvestment: 5000000,
                lockIn: '3 Years',
                risk: 'Moderate'
            };
        case 'aif':
            return {
                category: 'Category III',
                minInvestment: 10000000,
                targetIRR: 18,
                lockIn: '3 Years',
                tenure: '5 Years',
                sector: 'Multi-Strategy',
                risk: 'Very High'
            };
        case 'fixed_income':
            return {
                interestRate: 8.5,
                ytm: 8.2,
                creditRating: 'AA+',
                tenure: '3 Years',
                maturityAmount: 125000,
                minInvestment: 100000,
                prematureWithdrawal: 'Not Allowed',
                tds: '10%',
                risk: 'Low'
            };
        case 'nps':
            return {
                equityAllocation: 50,
                expectedPension: 25000,
                taxBenefit: '80C, 80CCD(1B)',
                estimatedCorpus: 5000000,
                risk: 'Moderate'
            };
        case 'real_estate':
            return {
                price: 7500000,
                location: 'Whitefield, Bangalore',
                expectedAppreciation: 12,
                rentalYield: 3.5,
                possessionDate: 'Dec 2025',
                developer: 'Prestige Group',
                emi: 45000,
                risk: 'Moderate'
            };
        default:
            return {
                risk: 'Moderate'
            } as MutualFundMetrics;
    }
};

// Helper function to get logo from product name
const getLogo = (name: string): string => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

// Format date
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export default function Wishlist() {
    const router = useRouter();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showCompare, setShowCompare] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState(wishlistCategories);

    // Fetch wishlist from API
    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const response = await customerService.getMyWishlist();
            
            if (response.success && response.data) {
                const items = Array.isArray(response.data) ? response.data : [response.data];
                
                // Transform API data to match UI format
                const transformedItems: WishlistItem[] = items.map(item => ({
                    ...item,
                    keyMetrics: generateMockMetrics(item.product_type),
                    logo: getLogo(item.product_name),
                    fitScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
                }));

                setWishlistItems(transformedItems);

                // Update category counts
                const updatedCategories = wishlistCategories.map(cat => {
                    if (cat.id === 'all') {
                        return { ...cat, count: transformedItems.length };
                    }
                    
                    // Map category id to product type
                    const productType = Object.keys(productTypeToCategoryId).find(
                        key => productTypeToCategoryId[key] === cat.id
                    );
                    
                    const count = productType 
                        ? transformedItems.filter(item => item.product_type === productType).length
                        : 0;
                    
                    return { ...cat, count };
                });

                setCategories(updatedCategories);
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    // Remove from wishlist
    const handleRemoveFromWishlist = async (itemId: number) => {
        try {
            const response = await customerService.removeFromWishlist(itemId);
            
            if (response.success) {
                // Remove item from state
                const updatedItems = wishlistItems.filter(item => item.id !== itemId);
                setWishlistItems(updatedItems);

                // Update category counts
                const updatedCategories = categories.map(cat => {
                    if (cat.id === 'all') {
                        return { ...cat, count: updatedItems.length };
                    }
                    
                    const productType = Object.keys(productTypeToCategoryId).find(
                        key => productTypeToCategoryId[key] === cat.id
                    );
                    
                    const count = productType 
                        ? updatedItems.filter(item => item.product_type === productType).length
                        : 0;
                    
                    return { ...cat, count };
                });

                setCategories(updatedCategories);
                
                // Remove from selected items if present
                setSelectedItems(prev => prev.filter(id => id !== itemId));
            }
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    // Filter items based on category and search
    const filteredItems = wishlistItems.filter(item => {
        const categoryId = productTypeToCategoryId[item.product_type] || '';
        const matchesCategory = selectedCategory === 'all' || categoryId === selectedCategory;
        const matchesSearch = item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
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

    if (loading) {
        return (
            <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

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
                    {categories.map((category) => (
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
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredItems.map((item, index) => {
                            const riskLevel = getRiskLevel(item);
                            const riskColor = getRiskColor(riskLevel);
                            const categoryId = productTypeToCategoryId[item.product_type] || '';
                            const metrics = item.keyMetrics;
                            
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
                                                    categories.find(c => c.id === categoryId)?.color || 'from-gray-500 to-gray-600'
                                                } flex items-center justify-center text-white font-bold text-sm`}>
                                                    {item.logo}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                            {categories.find(c => c.id === categoryId)?.name || item.product_type}
                                                        </span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${riskColor}`}>
                                                            {riskLevel}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Added: {formatDate(item.created_at)}
                                                    </p>
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
                                        {isMutualFund(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-2 text-center">
                                                    {['1Y', '3Y', '5Y'].map(period => (
                                                        <div key={period} className="bg-gray-50 rounded-lg p-2">
                                                            <div className="text-xs text-gray-500">{period} Return</div>
                                                            <div className="text-sm font-semibold text-gray-600">
                                                                {metrics.returns[period as keyof typeof metrics.returns]}%
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">NAV: <span className="text-gray-600 font-medium">{formatCurrency(metrics.nav)}</span></span>
                                                    <span className="text-gray-500">Expense: <span className="text-gray-600 font-medium">{metrics.expenseRatio || '--'}%</span></span>
                                                </div>
                                            </div>
                                        )}

                                        {/* PMS */}
                                        {isPMS(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-purple-600">Min Investment</div>
                                                        <div className="text-sm font-semibold text-purple-700">{formatCurrency(metrics.minInvestment)}</div>
                                                    </div>
                                                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-purple-600">Lock-in</div>
                                                        <div className="text-sm font-semibold text-purple-700">{metrics.lockIn || '--'}</div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['1Y', '3Y', '5Y'].map(period => (
                                                        <div key={period} className="bg-gray-50 rounded-lg p-2">
                                                            <div className="text-xs text-gray-500">{period}</div>
                                                            <div className="text-sm font-semibold text-gray-600">
                                                                {metrics.returns[period as keyof typeof metrics.returns]}%
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="text-xs text-gray-500">Benchmark: {metrics.benchmark || '--'}</div>
                                            </div>
                                        )}

                                        {/* AIF */}
                                        {isAIF(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-yellow-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-yellow-600">Target IRR</div>
                                                        <div className="text-sm font-semibold text-yellow-700">{metrics.targetIRR || '--'}%</div>
                                                    </div>
                                                    <div className="bg-yellow-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-yellow-600">Lock-in</div>
                                                        <div className="text-sm font-semibold text-yellow-700">{metrics.lockIn || '--'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    <span className="font-medium">Category:</span> {metrics.category || '--'} • {metrics.sector || '--'}
                                                </div>
                                            </div>
                                        )}

                                        {/* Fixed Income */}
                                        {isFixedIncome(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                                        <div className="text-xs text-blue-600">Interest Rate</div>
                                                        <div className="text-lg font-bold text-blue-700">{metrics.interestRate || '--'}%</div>
                                                    </div>
                                                    <div className="bg-green-50 rounded-lg p-3 text-center">
                                                        <div className="text-xs text-green-600">YTM</div>
                                                        <div className="text-lg font-bold text-green-700">{metrics.ytm || '--'}%</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Credit Rating:</span> {metrics.creditRating || '--'}
                                                </div>
                                            </div>
                                        )}

                                        {/* NPS */}
                                        {isNPS(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-red-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-red-600">Equity</div>
                                                        <div className="text-sm font-semibold text-red-700">{metrics.equityAllocation || '--'}%</div>
                                                    </div>
                                                    <div className="bg-red-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-red-600">Est. Pension</div>
                                                        <div className="text-sm font-semibold text-red-700">{formatCurrency(metrics.expectedPension)}/mo</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-600">{metrics.taxBenefit || '--'}</div>
                                            </div>
                                        )}

                                        {/* Real Estate */}
                                        {isRealEstate(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-teal-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-teal-600">Price</div>
                                                        <div className="text-sm font-semibold text-teal-700">{formatCurrency(metrics.price)}</div>
                                                    </div>
                                                    <div className="bg-teal-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-teal-600">Yield</div>
                                                        <div className="text-sm font-semibold text-teal-700">{metrics.rentalYield || '--'}%</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    <span className="font-medium">Location:</span> {metrics.location || '--'}
                                                </div>
                                            </div>
                                        )}

                                        {/* Unlisted Shares */}
                                        {isUnlisted(metrics) && (
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-purple-600">Current Price</div>
                                                        <div className="text-sm font-semibold text-purple-700">{formatCurrency(metrics.currentPrice)}</div>
                                                    </div>
                                                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                                                        <div className="text-xs text-purple-600">Min Lot</div>
                                                        <div className="text-sm font-semibold text-purple-700">{metrics.minLot || '--'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    <span className="font-medium">Sector:</span> {metrics.sector || '--'} • {metrics.lastFundingRound || '--'}
                                                </div>
                                            </div>
                                        )}

                                        {/* Portfolio Fit Score */}
                                        {item.fitScore && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs text-gray-500">Portfolio Fit Score</span>
                                                    <span className="text-xs font-medium text-gray-600">{item.fitScore}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                                                    <div 
                                                        className="h-1.5 rounded-full bg-[#2076C7]" 
                                                        style={{ width: `${item.fitScore}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                onClick={() => router.push(`/customer/products/${item.product_type}/${item.product_id}`)}
                                                className="flex-1 bg-[#2076C7] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#1a5e9e] transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                💬
                                            </button>
                                            <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                📱
                                            </button>
                                            <button 
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : (
                /* Empty State */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {searchQuery || selectedCategory !== 'all' 
                            ? 'No matching items found'
                            : 'Your wishlist is empty'
                        }
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        {searchQuery || selectedCategory !== 'all'
                            ? 'Try adjusting your search or filter'
                            : 'Start adding investment products to track them here'
                        }
                    </p>
                    <button 
                        onClick={() => router.push('/customer/companies')}
                        className="px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e] transition-colors"
                    >
                        Browse Products
                    </button>
                </motion.div>
            )}
        </div>
    );
}