'use client';

import React, { useState, useEffect } from 'react';
import { History, Info, HandCoins, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CompaniesComponent from './companies/page';
import TransactionsComponent from './transactions/page';
import SellSharesComponent from './sell/page'; // New Component
import customerService from '../../../services/customerService';
import { toast } from 'react-hot-toast';

export default function UnlistedSharesPage() {
  const router = useRouter();
  // State handles 'buy' (formerly companies), 'sell', and 'transactions'
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'transactions'>('buy');
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
        toast.error('Failed to fetch profile or companies.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headerData = {
    buy: {
      title: "Buy Unlisted Shares",
      subtitle: "Browse and invest in pre-IPO opportunities.",
      icon: <ShoppingCart size={24} />
    },
    sell: {
      title: "Sell Unlisted Shares",
      subtitle: "Get competitive pricing and fast settlement for your holdings.",
      icon: <HandCoins size={24} />
    },
    transactions: {
      title: "Transaction History",
      subtitle: "Track and manage your unlisted share orders.",
      icon: <History size={24} />
    }
  };

  return (
    <div className="flex-1 p-3 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="flex-1 bg-[#F8FAFC] min-h-screen font-sans max-w-full mx-auto">
        
        {/* 1. STANDARDIZED HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-2xl p-5 sm:p-6 mb-6 shadow-sm border border-slate-100/60"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* TITLE & SUBTITLE SECTION */}
            <div className="order-1 md:order-none flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                {headerData[activeTab].icon}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-slate-800">
                    {headerData[activeTab].title}
                  </h2>
                  {activeTab === 'buy' && totalCompanies > 0 && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] sm:text-[10px] font-black rounded-full border border-emerald-200 whitespace-nowrap">
                      {totalCompanies}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-sm text-slate-500 flex items-center gap-2">
                  <Info size={14} className="text-[#2076C7] shrink-0" />
                  {headerData[activeTab].subtitle}
                </p>
              </div>
            </div>
            
            {/* TAB BUTTONS SECTION - KEPT ORIGINAL ROUNDED CSS */}
            <div className="order-2 md:order-none w-full md:w-auto">
              <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-1 relative shadow-inner border border-slate-200/50">
                
                {/* BUY BUTTON */}
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`relative px-5 py-2.5 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center justify-center md:justify-start gap-2 shrink-0 ${activeTab === 'buy' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {activeTab === 'buy' && (
                    <motion.div
                      layoutId="activeTabUnlistedHeader"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg md:rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <ShoppingCart size={14} />
                  Buy Shares
                </button>

                {/* SELL BUTTON */}
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`relative px-5 py-2.5 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center justify-center md:justify-start gap-2 shrink-0 ${activeTab === 'sell' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {activeTab === 'sell' && (
                    <motion.div
                      layoutId="activeTabUnlistedHeader"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg md:rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <HandCoins size={14} />
                  Sell Shares
                </button>

                {/* TRANSACTIONS BUTTON */}
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`relative px-5 py-2.5 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center justify-center md:justify-start gap-2 shrink-0 ${activeTab === 'transactions' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {activeTab === 'transactions' && (
                    <motion.div
                      layoutId="activeTabUnlistedHeader"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg md:rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <History size={14} />
                  Transactions
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'buy' ? (
                <CompaniesComponent />
              ) : activeTab === 'sell' ? (
                <SellSharesComponent />
              ) : (
                <TransactionsComponent />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}