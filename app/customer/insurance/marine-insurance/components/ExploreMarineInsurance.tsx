'use client';

import React, { useState, useMemo } from 'react';
import { Search, Anchor, Info, X, FileText, Landmark } from 'lucide-react';
import MarineInsurancePlanCard from './MarineInsurancePlanCard';
import { marinePlansData } from '../marineInsuranceConstants';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExploreMarineInsurance({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: "explore" | "applications") => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Cargo', 'Hull', 'Transit'];

    const filteredPlans = useMemo(() => {
        return marinePlansData.filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 plan.carrier.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

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
                            <Anchor size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                                    Marine Insurance
                                </h2>
                                <span className="px-2.5 py-1 bg-blue-100 text-[#2076C7] text-[10px] font-bold rounded-full border border-blue-200 whitespace-nowrap">
                                    {marinePlansData.length} Partners
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                                <span className="text-[#2076C7] flex items-center justify-center w-5 h-5 rounded-full bg-blue-50/50">
                                    <Info size={14} />
                                </span>
                                Comprehensive transit and cargo protection
                            </p>
                        </div>
                    </div>

                    <div className="flex bg-gray-200/50 p-1.5 rounded-xl w-full sm:w-fit self-center sm:self-end md:self-center flex-wrap justify-center sm:justify-start">
                        <button
                            onClick={() => setActiveTab("explore")}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                activeTab === "explore"
                                    ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-200"
                                    : "text-gray-500 hover:bg-gray-200"
                            }`}
                        >
                            Explore Offers
                        </button>
                        <button
                            onClick={() => setActiveTab("applications")}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                activeTab === "applications"
                                    ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-teal-200"
                                    : "text-gray-500 hover:bg-gray-200"
                            }`}
                        >
                            My Policies
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Filter Sticky Bar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-0 z-40 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search marine plans..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2076C7]/50 shadow-sm transition-all text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                    <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-200"
                                        : "text-gray-500 hover:bg-gray-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="px-2 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlans.map((plan, idx) => (
                    <MarineInsurancePlanCard 
                        key={idx} 
                        {...plan} 
                        onApply={(name) => console.log(`Applying for ${name}`)} 
                    />
                ))}
            </div>
            
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
