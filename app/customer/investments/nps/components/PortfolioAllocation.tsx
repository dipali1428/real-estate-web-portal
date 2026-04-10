'use client';

import React from 'react';
import { PieChart, TrendingUp, Shield, Landmark, Briefcase } from 'lucide-react';

interface Allocation {
  label: string;
  value: number;
  color: string;
  icon: any;
  desc: string;
}

const allocations: Allocation[] = [
  { label: 'Equity (E)', value: 50, color: 'bg-[#2076C7]', icon: TrendingUp, desc: 'High risk, high return market-linked equity' },
  { label: 'Corporate Bonds (C)', value: 30, color: 'bg-[#1CADA3]', icon: Briefcase, desc: 'Medium risk debt from top companies' },
  { label: 'Govt Bonds (G)', value: 20, color: 'bg-blue-300', icon: Shield, desc: 'Safe government securities with stable returns' },
];

const PortfolioAllocation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
          <PieChart size={18} className="text-[#2076C7]" />
          Asset Allocation
        </h2>
        <span className="text-[10px] font-bold text-[#1CADA3] px-2 py-0.5 bg-[#1CADA3]/10 rounded-full">Active Choice</span>
      </div>

      {/* Visual Ring (Simplified representation using multiple border rings or a CSS bar) */}
      <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden flex mb-8">
        {allocations.map((a, i) => (
          <div key={i} style={{ width: `${a.value}%` }} className={`${a.color} h-full transition-all duration-700`} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allocations.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-start gap-3 group">
              <div className={`w-10 h-10 rounded-xl ${a.color}/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm border border-blue-100`}>
                <Icon size={18} className={a.color.startsWith('bg-[') ? 'text-' + a.color.slice(3) : a.color.replace('bg-', 'text-')} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-gray-900">{a.label}</p>
                  <p className="text-sm font-black text-gray-900">{a.value}%</p>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{a.desc}</p>
                <div className="mt-2 w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                   <div style={{ width: `${a.value}%` }} className={`h-full ${a.color} opacity-30`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-xl">
        <p className="text-[10px] text-blue-700 leading-relaxed flex items-start gap-2">
          <Landmark size={12} className="flex-shrink-0 mt-0.5" />
          Based on your current portfolio, your exposure to Equity is within the recommended limit for your age group.
        </p>
      </div>
    </div>
  );
};

export default PortfolioAllocation;
