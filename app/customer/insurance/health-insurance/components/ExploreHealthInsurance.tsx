'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, ArrowRight, ShieldPlus, Info, FileText } from 'lucide-react';
import HealthInsurancePlanCard from './HealthInsurancePlanCard';
import { healthInsurancePlans } from '../healthInsuranceConstants';
import { motion } from 'framer-motion';
import customerService from '../../../../services/customerService';
import toast from 'react-hot-toast';

export default function ExploreHealthInsurance({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: "explore" | "applications") => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAllPlans, setShowAllPlans] = useState(false);
    const [wishlistMap, setWishlistMap] = useState<Map<string, number>>(new Map());
    const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(new Set());
    const [userId, setUserId] = useState<number | null>(null);

    const categories = useMemo(() => {
        return ['All', ...Array.from(new Set(healthInsurancePlans.map(plan => plan.bestFor))).slice(0, 3)];
    }, []);

    const filteredPlans = useMemo(() => {
        return healthInsurancePlans.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || plan.bestFor === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const fetchWishlist = useCallback(async () => {
        try {
            const response = await customerService.getMyWishlist();
            if (response.success && response.data) {
                const items = Array.isArray(response.data) ? response.data : [response.data];
                const map = new Map<string, number>();
                items.forEach((item: any) => {
                    if (item.product_type === 'health_insurance') {
                        map.set(item.product_name, item.id);
                    }
                });
                setWishlistMap(map);
            }
        } catch (error) {
            toast.error('Failed to load wishlist:');
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await customerService.getProfile();
                if (response && response.user) {
                    setUserId(response.user.id);
                }
            } catch (error) {
                toast.error('Failed to fetch user profile:');
            }
        };
        fetchUser();
        fetchWishlist();
    }, [fetchWishlist]);

    const toggleWishlist = async (plan: any) => {
        const planName = plan.name;
        const wishlistId = wishlistMap.get(planName);

        if (wishlistLoading.has(planName)) return;
        setWishlistLoading(prev => new Set(prev).add(planName));

        try {
            if (wishlistId) {
                const response = await customerService.removeFromWishlist(wishlistId);
                if (response.success) {
                    setWishlistMap(prev => {
                        const updated = new Map(prev);
                        updated.delete(planName);
                        return updated;
                    });
                    toast.success(`${planName} removed from wishlist`);
                }
            } else {
                const response = await customerService.addToWishlist({
                    product_type: 'health_insurance',
                    product_id: 0, // Health insurance doesn't have a numeric ID in constants
                    product_name: planName,
                });
                if (response.success && response.data) {
                    const newItem = Array.isArray(response.data) ? response.data[0] : response.data;
                    setWishlistMap(prev => {
                        const updated = new Map(prev);
                        updated.set(planName, newItem.id);
                        return updated;
                    });
                    toast.success(`${planName} saved to wishlist`);
                }
            }
        } catch (error: any) {
           
            toast.error(error.response?.data?.message || 'Failed to update wishlist');
        } finally {
            setWishlistLoading(prev => {
                const updated = new Set(prev);
                updated.delete(planName);
                return updated;
            });
        }
    };

    const visiblePlans = useMemo(() => {
        return showAllPlans ? filteredPlans : filteredPlans.slice(0, 5);
    }, [filteredPlans, showAllPlans]);

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            {/* --- NEW MODERN HEADER --- */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white rounded-2xl p-6 mb-2 shadow-sm border border-slate-100/60"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                            <ShieldPlus size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    Health Insurance
                                </h2>
                                <span className="px-2.5 py-1 bg-blue-100 text-[#2076C7] text-[10px] font-bold rounded-full border border-blue-200 whitespace-nowrap">
                                    {healthInsurancePlans.length} Partners
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                                <span className="text-[#2076C7] flex items-center justify-center w-5 h-5 rounded-full bg-blue-50/50">
                                    <Info size={14} />
                                </span>
                                Comprehensive health and medical protection
                            </p>
                        </div>
                    </div>

                    <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
                        <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                            <button
                                onClick={() => setActiveTab('explore')}
                                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'explore' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {activeTab === 'explore' && (
                                    <motion.div
                                        layoutId="activeTabExploreHealth"
                                        className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <ShieldPlus size={14} />
                                <span>Offers</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('applications')}
                                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'applications' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {activeTab === 'applications' && (
                                    <motion.div
                                        layoutId="activeTabExploreHealth"
                                        className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <FileText size={14} />
                                <span>Policies</span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Category Filter - Left Side */}
                <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-xl font-bold text-[11px] tracking-wide transition-all cursor-pointer whitespace-nowrap border ${selectedCategory === cat
                                ? 'text-white border-transparent shadow-lg shadow-[#2076C7]/20'
                                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                }`}
                            style={selectedCategory === cat ? { background: 'linear-gradient(to right, #2076C7, #1CADA3)' } : {}}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search - Right Side */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search insurers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2076C7]/10 transition-all font-medium text-gray-700 text-sm placeholder:text-gray-400 shadow-sm"
                    />
                </div>
            </div>

            {/* Results Count & Clear Filters */}
            <div className="mb-4 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                <span>{filteredPlans.length} PLANS FOUND</span>
                {(searchQuery || selectedCategory !== 'All') && (
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="text-[#2076C7] hover:text-[#1CADA3] transition-colors cursor-pointer flex items-center gap-1"
                    >
                        <span>Clear Filters</span>
                        <div className="w-4 h-4 rounded-md bg-gray-100 flex items-center justify-center text-[8px] text-gray-500">✕</div>
                    </button>
                )}
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {visiblePlans.map((plan, idx) => (
                    <HealthInsurancePlanCard 
                        key={idx} 
                        {...plan} 
                         
                        isWishlisted={wishlistMap.has(plan.name)}
                        onWishlistToggle={() => toggleWishlist(plan)}
                        wishlistLoading={wishlistLoading.has(plan.name)}
                    />
                ))}
            </div>

            {/* View More / View Less */}
            {filteredPlans.length > 5 && (
                <div className="flex justify-center mt-12 pb-8">
                    <button
                        onClick={() => setShowAllPlans(prev => !prev)}
                        className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg hover:shadow-[#2076C7]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
                    >
                        {showAllPlans
                            ? "View Fewer Plans"
                            : `View All Plans (${filteredPlans.length - 5} more)`}
                        <ArrowRight
                            size={16}
                            className={`transition-transform duration-300 group-hover:translate-x-1 ${showAllPlans ? "rotate-[270deg]" : "rotate-90"}`}
                        />
                    </button>
                </div>
            )}
            
            {filteredPlans.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-gray-500 font-medium">No plans found matching your search criteria.</p>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
