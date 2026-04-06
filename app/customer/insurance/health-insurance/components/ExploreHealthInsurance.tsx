'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, IndianRupee, ArrowRight } from 'lucide-react';
import HealthInsurancePlanCard from './HealthInsurancePlanCard';
import { healthInsurancePlans } from '../healthInsuranceConstants';

export default function ExploreHealthInsurance() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAllPlans, setShowAllPlans] = useState(false);

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

    const visiblePlans = useMemo(() => {
        return showAllPlans ? filteredPlans : filteredPlans.slice(0, 5);
    }, [filteredPlans, showAllPlans]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Filter Section */}
            <div className="mb-10">
                <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-2 items-center w-full">
                    {/* Search */}
                    <div className="relative w-full md:w-72 shrink-0">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2076C7]" size={18} />
                        <input
                            type="text"
                            placeholder="Search insurers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-gray-50 border-none rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#2076C7]/10 transition-all font-medium text-gray-700 text-sm placeholder:text-gray-400"
                        />
                    </div>

                    <div className="h-8 w-px bg-gray-200 hidden md:block mx-2"></div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5 w-full">
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
                </div>

                {/* Results Count */}
                <div className="mt-4 px-2 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {visiblePlans.map((plan, idx) => (
                    <HealthInsurancePlanCard 
                        key={idx} 
                        {...plan} 
                        onApply={(name) => console.log(`Applying for ${name}`)} 
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
