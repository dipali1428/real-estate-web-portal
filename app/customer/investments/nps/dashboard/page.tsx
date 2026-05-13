"use client";

import React from 'react';
import {
  PiggyBank,
  BadgeCheck,
  TrendingUp,
  Receipt,
  ArrowUpRight,
  ArrowDownCircle,
  UserPlus,
  CalendarDays,
} from 'lucide-react';
import PRANCard from './components/PRANCard';
import PortfolioAllocation from './components/PortfolioAllocation';


const NPSDashboard: React.FC = () => {

  const transactions = [
    { id: 1, type: 'Contribution', date: '28 Mar 2026', amount: '5,000', status: 'Success' },
    { id: 2, type: 'SIP Installment', date: '05 Mar 2026', amount: '5,000', status: 'Success' },
    { id: 3, type: 'Contribution', date: '15 Feb 2026', amount: '10,000', status: 'Success' },
  ];

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap justify-center md:justify-end gap-3 px-2">
        <button
          className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:from-[#1a5ca1] hover:to-[#18968d] text-white rounded-full text-[10px] font-black shadow-md shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-widest"
        >
          <UserPlus size={14} />
          Create NPS Account
        </button>

        <button
          onClick={() => (window as any).dispatchEvent(new CustomEvent('openScheduleModal'))}
          className="flex items-center justify-center gap-2 px-5 py-2 bg-white hover:bg-gray-50 border border-slate-200 rounded-full text-[10px] font-black text-slate-700 shadow-sm transition-all active:scale-95 uppercase tracking-widest"
        >
          <CalendarDays size={14} className="text-[#2076C7]" />
          Schedule Meeting
        </button>
      </div>

      {/* Top Row: PRAN Card & Allocation */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PRANCard
          pran="110123456789"
          name="JOHN DOE"
          status="Active"
          manager="HDFC Pension Mgmt"
        />
        <PortfolioAllocation />
      </div>

      {/* Lower Row: Transactions & Tax Saver */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Receipt size={18} className="text-[#2076C7]" />
              Recent Transactions
            </h2>
            <button className="text-xs font-bold text-[#2076C7] hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7]">
                    <ArrowDownCircle size={16} />
                  </div>
                  <div>

                    
                    <p className="text-sm font-bold text-gray-900">{t.type}</p>
                    <p className="text-[10px] text-gray-500">{t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">₹{t.amount}</p>
                  <p className="text-[10px] text-[#1CADA3] font-bold">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Benefit Tracker — Compact */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
            <BadgeCheck size={18} className="text-[#1CADA3]" />
            Tax Benefit Tracker
          </h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <p className="text-xs font-bold text-gray-700">Sec 80C Limit (₹1.5L)</p>
                <p className="text-[10px] font-black text-gray-400">75% Utilized</p>
              </div>
              <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-gradient-to-r from-teal-400 to-[#1CADA3]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <p className="text-xs font-bold text-gray-700">Sec 80CCD(1B) (₹50k)</p>
                <p className="text-[10px] font-black text-[#2076C7]">100% Utilized</p>
              </div>
              <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong className="text-gray-900">Disclaimer:</strong> NPS returns are subject to market risk. Past performance is not indicative of future results. Tax benefits are subject to prevailing income tax laws.
        </p>
      </div>
    </div>
  );
};
export default NPSDashboard;