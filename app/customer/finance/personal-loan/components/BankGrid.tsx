"use client";

import React, { useState, useEffect } from 'react';
import { Landmark, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

interface BankGridProps {
  onPlansClick: (bankName: string) => void;
}

export default function BankGrid({ onPlansClick }: BankGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialLimit, setInitialLimit] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setInitialLimit(4);
      } else {
        setInitialLimit(12);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const partnerBanks = [
    { name: 'ADITYA BIRLA FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'AXIS BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'AXIS FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'BAJAJ FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'BANDHAN BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'CHOLAMANDALAM', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'CREDIT SAISON', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'HSBC BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'ICICI BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'HDFC BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'INDUSIND BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'IDFC FIRST BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'KOTAK MAHINDRA', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'FIBE (EARLYSALARY)', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'FINNABLE CREDIT', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'INCRED FINANCIAL', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'L&T FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'MUTHOOT FINANCE', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'POONAWALLA FINCORP', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'PIRAMAL CAPITAL', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'PREFR (CREDIT VIDYA)', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'SMFG INDIA CREDIT', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'TATA CAPITAL', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'THE SOUTH INDIAN BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'UTKARSH SMALL FINANCE BANK', color: 'bg-teal-50 text-[#1CADA3]' },
    { name: 'YES BANK', color: 'bg-teal-50 text-[#1CADA3]' }
  ];

  const displayBanks = isExpanded ? partnerBanks : partnerBanks.slice(0, initialLimit);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {displayBanks.map((bank, idx) => (
          <div
            key={idx}
            className="group bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center justify-between hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${bank.color} flex items-center justify-center shrink-0 shadow-sm`}
              >
                <Landmark size={18} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-slate-700 text-[10px] md:text-xs uppercase tracking-tight">
                {bank.name}
              </span>
            </div>
            {/* The Plans Button */}
            <button
              onClick={() => onPlansClick(bank.name)}
              className="bg-white border border-blue-100 text-[#2076C7] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#2076C7] hover:text-white transition-colors flex items-center gap-1 shadow-sm shrink-0"
            >
              Plans <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-slate-50 text-slate-500 border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-[10px] flex items-center gap-2 hover:bg-slate-100 hover:text-slate-700 transition-colors uppercase tracking-widest"
        >
          {isExpanded ? 'View Less' : `View All ${partnerBanks.length} Partners`}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
}
