import React, { useState } from 'react';
import {
  Briefcase,
  PiggyBank,
  IndianRupee,
  Users,
  CheckCircle2,
  ArrowRight,
  FileText,
  Target,
  TrendingUp,
  BarChart3,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

const NPSInvestments: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'tier1' | 'tier2'>('tier1');

  const tier1Data = {
    totalValue: '4,28,540',
    totalInvested: '2,88,000',
    returns: '1,40,540',
    xirr: '12.8',
    scheme: 'HDFC Pension Management Fund - Tier I',
    assetClass: 'Active Choice (E:50%, C:30%, G:20%)',
    lastContribution: '28 Mar 2026',
  };

  return (
    <div className="space-y-6">
      {/* Tier Switcher */}
      <div className="flex justify-center">
        <div className="flex w-full sm:w-auto bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setActiveTier('tier1')}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-2 rounded-lg text-xs font-black transition-all ${
              activeTier === 'tier1'
                ? 'bg-[#2076C7] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Tier I (Retirement)
          </button>
          <button
            onClick={() => setActiveTier('tier2')}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-2 rounded-lg text-xs font-black transition-all ${
              activeTier === 'tier2'
                ? 'bg-[#2076C7] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Tier II (Savings)
          </button>
        </div>
      </div>

      {activeTier === 'tier1' ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Main Portfolio Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            
            <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Current Valuation</p>
                <h3 className="text-4xl font-black text-gray-900">₹{tier1Data.totalValue}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-[#1CADA3] bg-[#1CADA3]/10 px-2 py-1 rounded-full">
                    <TrendingUp size={12} /> +{tier1Data.xirr}% XIRR
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">Updated 2 hours ago</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 flex-1 max-w-md">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Invested</p>
                  <p className="text-lg font-black text-gray-900">₹{tier1Data.totalInvested}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Returns</p>
                  <p className="text-lg font-black text-[#1CADA3]">₹{tier1Data.returns}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scheme Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#2076C7]" /> Scheme Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2076C7]">
                      <Users size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Fund Manager</p>
                      <p className="text-sm font-bold text-gray-900">{tier1Data.scheme}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-[#1CADA3]/10 flex items-center justify-center text-[#1CADA3]">
                      <BarChart3 size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Asset Allocation</p>
                      <p className="text-sm font-bold text-gray-900">{tier1Data.assetClass}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2076C7]">
                      <Calendar size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Last Contribution</p>
                      <p className="text-sm font-bold text-gray-900">{tier1Data.lastContribution}</p>
                   </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-xl border border-gray-200 transition-all">
                Change Investment Choice
              </button>
            </div>

            {/* Quick Actions / Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                <Target size={18} className="text-[#2076C7]" /> Contribution Status
              </h2>
              <div className="p-4 bg-[#1CADA3]/10 border border-[#1CADA3]/20 rounded-2xl">
                 <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-[#1CADA3]">Next Contribution</p>
                    <span className="text-[10px] font-black text-[#1CADA3] uppercase">5 Days Left</span>
                 </div>
                 <p className="text-xl font-black text-gray-900">₹5,000</p>
                 <p className="text-[10px] text-[#1CADA3] mt-1">SIP scheduled for 05 April 2026</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                 <button className="py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10">Make Payment</button>
                 <button className="py-3 bg-white text-gray-700 border border-gray-200 text-xs font-bold rounded-xl hover:bg-gray-50">Download Slip</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Tier II Empty State */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-[#2076C7]" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Tier II Account Not Active</h3>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Tier II is a voluntary investment account with no lock-in period. You can withdraw your money anytime, making it a highly liquid retirement tool.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
               <div className="p-4 bg-blue-50 rounded-2xl text-left border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#2076C7] mb-2 shadow-sm"><IndianRupee size={16} /></div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Liquidity</p>
                  <p className="text-xs font-bold text-gray-700">No lock-in. Withdraw anytime.</p>
               </div>
               <div className="p-4 bg-[#1CADA3]/10 rounded-2xl text-left border border-[#1CADA3]/20">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1CADA3] mb-2 shadow-sm"><TrendingUp size={16} /></div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Returns</p>
                  <p className="text-xs font-bold text-gray-700">Equity exposure up to 75%.</p>
               </div>
               <div className="p-4 bg-blue-50 rounded-2xl text-left border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#2076C7] mb-2 shadow-sm"><ShieldCheck size={16} /></div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Fees</p>
                  <p className="text-xs font-bold text-gray-700">Lowest management fees in India.</p>
               </div>
            </div>

            <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-sm rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-blue-500/20 active:scale-95 mx-auto">
              <PiggyBank size={20} />
              Activate Tier II Account
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSInvestments;
