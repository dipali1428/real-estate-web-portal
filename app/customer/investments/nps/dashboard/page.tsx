import React, { useState } from 'react';
import {
  PiggyBank,
  Shield,
  Users,
  CheckCircle2,
  Clock,
  Percent,
  BarChart3,
  ArrowRight,
  FileText,
  Target,
  BadgeCheck,
  TrendingUp,
  Receipt,
  ArrowUpRight,
  ArrowDownCircle,
} from 'lucide-react';
import PRANCard from '../components/PRANCard';
import PortfolioAllocation from '../components/PortfolioAllocation';

const NPSDashboard: React.FC = () => {

  const features = [
    { icon: Shield, title: 'Government Backed', desc: 'Regulated by PFRDA with sovereign guarantee on Govt. Bond fund', color: 'text-[#2076C7]', bg: 'bg-blue-50' },
    { icon: Percent, title: 'Tax Benefits', desc: 'Save up to ₹2 lakh p.a. under Sec 80C + additional ₹50,000 under 80CCD(1B)', color: 'text-[#1CADA3]', bg: 'bg-[#1CADA3]/5' },
    { icon: TrendingUp, title: 'Market-Linked Returns', desc: 'Equity fund historically delivered 14-18% annualised returns over 5 years', color: 'text-[#2076C7]', bg: 'bg-blue-50' },
    { icon: Users, title: 'Flexible Fund Choice', desc: 'Choose from 8 Pension Fund Managers & 4 asset classes', color: 'text-[#1CADA3]', bg: 'bg-[#1CADA3]/5' },
  ];

  const timeline = [
    { phase: 'Accumulation Phase', age: '18-60 yrs', desc: 'Regular contributions grow with market-linked returns', icon: PiggyBank, color: 'from-[#2076C7] to-[#1CADA3]' },
    { phase: 'Partial Withdrawal', age: 'After 3 yrs', desc: 'Up to 25% withdrawal allowed for specific needs', icon: Target, color: 'from-[#2076C7] to-blue-400' },
    { phase: 'Maturity at 60', age: 'At age 60', desc: 'Withdraw 60% lump sum (tax-free) + annuity for pension', icon: CheckCircle2, color: 'from-[#1CADA3] to-teal-400' },
  ];

  const transactions = [
    { id: 1, type: 'Contribution', date: '28 Mar 2026', amount: '5,000', status: 'Success' },
    { id: 2, type: 'SIP Installment', date: '05 Mar 2026', amount: '5,000', status: 'Success' },
    { id: 3, type: 'Contribution', date: '15 Feb 2026', amount: '10,000', status: 'Success' },
  ];
  return (
    <div className="space-y-6">
      {/* Top Row: PRAN Card & Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PRANCard
          pran="110123456789"
          name="JOHN DOE"
          status="Active"
          manager="HDFC Pension Mgmt"
        />
        <PortfolioAllocation />
      </div>

      {/* Lower Row: Transactions & Tax Saver */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Receipt size={18} className="text-[#2076C7]" />
              Recent Transactions
            </h2>
            <button className="text-xs font-bold text-[#2076C7] hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7]">
                    <ArrowDownCircle size={18} />
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
            <BadgeCheck size={18} className="text-[#1CADA3]" />
            Tax Benefit Tracker
          </h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-gray-700">Sec 80C Limit (₹1.5L)</p>
                <p className="text-[10px] font-black text-gray-400">75% Utilized</p>
              </div>
              <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-gradient-to-r from-teal-400 to-[#1CADA3]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-bold text-gray-700">Sec 80CCD(1B) (₹50k)</p>
                <p className="text-[10px] font-black text-[#2076C7]">100% Utilized</p>
              </div>
              <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600" />
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2076C7] shadow-sm">
                <ArrowUpRight size={16} />
              </div>
              <p className="text-[10px] text-[#2076C7] font-medium leading-tight">
                You've maxed out your additional ₹50k tax benefit for this year!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
          <Shield size={16} className="text-[#2076C7]" /> Why Choose NPS?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className={`rounded-xl p-4 ${f.bg} flex items-start gap-3`}>
                <div className="flex-shrink-0 mt-0.5"><Icon size={18} className={f.color} /></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NPS Journey Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-[#2076C7]" /> Your NPS Journey
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {timeline.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <div className="flex flex-row sm:flex-col items-center sm:items-center gap-4 sm:gap-2 sm:text-center flex-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{step.phase}</p>
                    <p className="text-[10px] text-[#2076C7] font-semibold mb-0.5">{step.age}</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed max-w-[140px]">{step.desc}</p>
                  </div>
                </div>
                {i < timeline.length - 1 && (
                  <ArrowRight size={20} className="text-gray-300 hidden sm:block flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong className="text-gray-900">Disclaimer:</strong> NPS returns are subject to market risk. Past performance is not indicative of future results. Tax benefits are subject to prevailing income tax laws.
        </p>
      </div>
    </div>
  );
};
export default NPSDashboard;