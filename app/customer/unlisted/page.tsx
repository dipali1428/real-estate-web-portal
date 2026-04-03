'use client';

import React, { useState } from 'react';
import { Building2, History, LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CompaniesComponent from './companies/page';
import TransactionsComponent from './transactions/page';

export default function UnlistedSharesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'companies' | 'transactions'>('companies');

  // Check authentication on mount
  React.useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header with Tabs */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Tab Navigation - Updated with pill button design */}
            <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
              <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                <button
                  onClick={() => setActiveTab('companies')}
                  className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'companies' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {activeTab === 'companies' && (
                    <motion.div
                      layoutId="activeTabUnlistedShares"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Building2 size={14} />
                  Companies
                </button>

                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'transactions' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {activeTab === 'transactions' && (
                    <motion.div
                      layoutId="activeTabUnlistedShares"
                      className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <History size={14} />
                  Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area - Full width for companies, constrained for transactions */}
      <div className={activeTab === 'companies' ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {activeTab === 'companies' ? (
          <CompaniesComponent />
        ) : (
          <div className="py-8">
            <TransactionsComponent />
          </div>
        )}
      </div>

      {/* Custom Styles for Animation and Hide Scrollbar */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}