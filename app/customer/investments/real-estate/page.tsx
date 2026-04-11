'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, LayoutGrid, BarChart3, Info } from 'lucide-react';
import CustomerPropertiesSection from './components/PropertiesSection';
import InvestmentGrowth from './components/InvestmentGrowth';
import RealEstatePropertyDetailsModal from '@/app/products/RealEstate/components/PropertyDetailsModal';
import Login from '@/app/auth/login/page';
import { useModal } from '@/app/context/ModalContext';

export default function RealEstateDashboard() {
    const { openApplyNow } = useModal();
    const [activeTab, setActiveTab] = useState<'properties' | 'growth'>('properties');
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handlePropertySelect = (id: string) => {
        setSelectedPropertyId(id);
    };

    return (
          <div className="flex-1 p-4 sm:p-6">
                <div className="flex-1 p-4 sm:p-6">
                
                {/* 1. HEADER SECTION (Standardized) */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                                        {activeTab === 'properties' ? 'Real Estate' : 'Portfolio Insights'}
                                    </h2>
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <Info size={14} className="text-[#2076C7]" />
                                    {activeTab === 'properties' 
                                        ? 'Explore premium fractional real estate opportunities' 
                                        : 'Track the performance of your property portfolio'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
                            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                                <button
                                    onClick={() => setActiveTab('properties')}
                                    className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'properties' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {activeTab === 'properties' && (
                                        <motion.div
                                            layoutId="activeTabRealEstate"
                                            className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <LayoutGrid size={14} />
                                    Properties
                                </button>
                                <button
                                    onClick={() => setActiveTab('growth')}
                                    className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'growth' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    {activeTab === 'growth' && (
                                        <motion.div
                                            layoutId="activeTabRealEstate"
                                            className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <BarChart3 size={14} />
                                    Growth
                                </button>
                            </div>
                        </div>
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
                        onInvestNow={(propertyTitle) => {
                            setSelectedPropertyId(null);
                            openApplyNow(propertyTitle, true);
                        }}
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
