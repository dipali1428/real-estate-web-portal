'use client';

import React, { useState, useEffect } from 'react';
import { Building2, History, LayoutGrid, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CompaniesComponent from './companies/page';
import TransactionsComponent from './transactions/page';
import customerService from '../../services/customerService';

export default function UnlistedSharesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'companies' | 'transactions'>('companies');
  const [customer, setCustomer] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);

  const capitalizeFullName = (name: string): string => {
    if (!name || name.trim() === '') return 'Investor';
    return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await customerService.getProfile();
        const userData = profileRes.user || profileRes;
        if (userData) {
          setCustomer({ name: capitalizeFullName(userData.name || '') });
        }
        const companiesRes = await customerService.getAllCompanies();
        const companiesData = companiesRes?.data || companiesRes || [];
        setTotalCompanies(companiesData.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const headerData = {
    companies: {
      title: "Unlisted Companies",
      subtitle: "Browse and invest in pre-IPO opportunities."
    },
    transactions: {
      title: "Transaction History",
      subtitle: "Track and manage your unlisted share orders and status."
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans max-w-full mx-auto">
        
        {/* 1. STANDARDIZED HEADER SECTION (Using Real Estate CSS) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Icon with Gradient Background */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                {activeTab === 'companies' ? <Building2 size={24} /> : <History size={24} />}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    {headerData[activeTab].title}
                  </h2>
                  {activeTab === 'companies' && totalCompanies > 0 && (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                      {totalCompanies} Companies
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Info size={14} className="text-[#2076C7]" />
                  {headerData[activeTab].subtitle}
                </p>
              </div>
            </div>
            
            {/* Standardized Tab Navigation inside the header */}
            <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
              <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                <button
                  onClick={() => setActiveTab('companies')}
                  className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'companies' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {activeTab === 'companies' && (
                    <motion.div
                      layoutId="activeTabUnlistedHeader"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <LayoutGrid size={14} />
                  Companies
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'transactions' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {activeTab === 'transactions' && (
                    <motion.div
                      layoutId="activeTabUnlistedHeader"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <History size={14} />
                  Transaction
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. CONTENT AREA */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'companies' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'companies' ? 10 : -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'companies' ? (
                <CompaniesComponent />
              ) : (
                <TransactionsComponent />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}