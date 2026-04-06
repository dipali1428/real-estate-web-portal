'use client';

import React, { useState } from 'react';
import { Building2, History, LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-6 py-3 text-sm font-medium transition-all relative ${
                  activeTab === 'companies'
                    ? 'text-[#2076C7]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 size={18} />
                  Companies
                </div>
                {activeTab === 'companies' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-3 text-sm font-medium transition-all relative ${
                  activeTab === 'transactions'
                    ? 'text-[#2076C7]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <History size={18} />
                  Transactions
                </div>
                {activeTab === 'transactions' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
                )}
              </button>
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

      {/* Custom Styles for Animation */}
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
      `}</style>
    </div>
  );
}