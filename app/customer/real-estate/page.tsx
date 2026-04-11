'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, LayoutGrid, BarChart3 } from 'lucide-react';
import CustomerPropertiesSection from './components/PropertiesSection';
import InvestmentGrowth from './components/InvestmentGrowth';
import RealEstatePropertyDetailsModal from '@/app/products/RealEstate/components/PropertyDetailsModal';
import Login from '@/app/auth/login/page';

export default function RealEstateDashboard() {
    const [activeTab, setActiveTab] = useState<'properties' | 'growth'>('properties');
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handlePropertySelect = (id: string) => {
        setSelectedPropertyId(id);
    };

    return (
        <div className="flex-1 p-6 sm:p-10 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* 1. HEADER SECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-slate-200 pb-8"
                >
                    <div>
                        <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-[0.2em] uppercase text-[10px] mb-3">
                            <Building2 size={14} />
                            Fractional Real Estate
                        </span>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tighter leading-none mb-2">
                            {activeTab === 'properties' ? 'Marketplace' : 'Portfolio Insights'}
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            {activeTab === 'properties' 
                                ? 'Explore premium commercial and residential fractional opportunities.' 
                                : 'Track the performance and projected growth of your real estate assets.'}
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="p-1.5 bg-slate-200/50 backdrop-blur-sm rounded-2xl flex items-center gap-1 relative shadow-inner border border-slate-200/50 self-start md:self-center">
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`relative px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center gap-2 ${activeTab === 'properties' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {activeTab === 'properties' && (
                                <motion.div
                                    layoutId="activeTabRealEstate"
                                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl -z-10 shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <LayoutGrid size={14} />
                            Properties
                        </button>
                        <button
                            onClick={() => setActiveTab('growth')}
                            className={`relative px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center gap-2 ${activeTab === 'growth' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {activeTab === 'growth' && (
                                <motion.div
                                    layoutId="activeTabRealEstate"
                                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl -z-10 shadow-lg"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <BarChart3 size={14} />
                            Growth
                        </button>
                    </div>
                </motion.div>

                {/* 2. CONTENT AREA */}
                <AnimatePresence mode="wait">
                    {activeTab === 'properties' ? (
                        <motion.div
                            key="properties-tab"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Suspense fallback={<div className="py-20 text-center text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Synchronizing Market Data...</div>}>
                                <CustomerPropertiesSection 
                                    onPropertySelect={handlePropertySelect} 
                                />
                            </Suspense>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="growth-tab"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <InvestmentGrowth />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modals */}
                {selectedPropertyId && (
                    <RealEstatePropertyDetailsModal
                        propertyId={selectedPropertyId}
                        onClose={() => setSelectedPropertyId(null)}
                        onInvestNow={() => {}}
                    />
                )}

                <Login 
                    isOpen={isLoginOpen} 
                    onClose={() => setIsLoginOpen(false)} 
                />
            </div>
        </div>
    );
}
