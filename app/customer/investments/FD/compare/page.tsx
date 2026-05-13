'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, CheckCircle2, X, Landmark, Database, Star, CheckCircle } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { DashboardService } from '@/app/services/dashboardService';
import { FDAdminService } from '@/app/services/fdAdminServices';
import { toast } from 'react-hot-toast';

type Bank = {
  company_name: string;
  category: string;
  one_year_rate: number;
  two_year_rate: number;
  three_year_rate: number;
  five_year_rate: number;
  best_rate: number;
  senior_citizen_rate: number;
  special_offer?: string;
};

// ==================== HELPER FUNCTIONS ====================
const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(row => row.startsWith('authToken='));
  return authCookie ? authCookie.split('=')[1] : null;
};

// ==================== MAIN COMPONENT ====================

export default function CompareFDPage() {
  const router = useRouter();
  const [banks, setBanks] = useState<Bank[]>([]);
  type TenureType = "short" | "medium" | "long" | "mega";

  const [activeTenure, setActiveTenure] =
    useState<TenureType>("medium");

  const getRate = (bank: Bank): number => {
    switch (activeTenure) {
      case 'short': return bank.one_year_rate || 0;
      case 'medium': return bank.two_year_rate || 0;
      case 'long': return bank.three_year_rate || 0;
      case 'mega': return bank.five_year_rate || 0;
      default: return bank.two_year_rate || 0;
    }
  };

  const [selectedBanks, setSelectedBanks] = useState<(Bank | null)[]>([null, null, null]);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [isAuthed, setIsAuthed] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState<string>("");

  // Auth check
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      router.push('/');
      return;
    }
    localStorage.setItem('token', token);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthed(true);
  }, [router]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const res = await FDAdminService.getFDPlansForCompare();
        setBanks(res.data || []);
      } catch (error) {
        toast.error("Unable to load banking partners. Please refresh.");
      }
    };

    loadBanks();
  }, []);

  const allBanks = banks;

  const handleSelectBank = (index: number, bank: Bank | null) => {
    setSelectedBanks(prev => {
      const newBanks = [...prev];
      newBanks[index] = bank;
      return newBanks;
    });
    setOpenDropdownIndex(null);
    if (bank) {
      toast.success(`${bank.company_name} added to comparison`);
    } else {
      toast.success("Slot cleared");
    }
  };

  const handleApply = (bankName: string) => {
    // Action disabled as per user request
  };

  const selectedBanksCount = selectedBanks.filter(b => b !== null).length;

  // Calculate Maturity Details for comparison
  const calculateFD = (bank: Bank) => {
    const rate = getRate(bank);

    let years = 1;
    if (activeTenure === "short") years = 0.5;
    if (activeTenure === "medium") years = 2;
    if (activeTenure === "long") years = 4;
    if (activeTenure === "mega") years = 6;

    const principal = investmentAmount;
    const maturityAmount = principal * Math.pow(1 + rate / 100 / 4, 4 * years);
    const interestEarned = maturityAmount - principal;

    return {
      maturity: `₹${Math.round(maturityAmount).toLocaleString("en-IN")}`,
      earned: `₹${Math.round(interestEarned).toLocaleString("en-IN")}`
    };
  };

  const tenureBuckets: { id: TenureType; label: string }[] = [
    { id: 'short', label: '< 1 Year' },
    { id: 'medium', label: '1 - 3 Years' },
    { id: 'long', label: '3 - 5 Years' },
    { id: 'mega', label: '5+ Years' },
  ];

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      <div className="w-full bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col relative">
        {/* Filter Bar */}
        <div className="px-4 md:px-10 py-6 bg-white flex flex-col items-center gap-6 border-b border-gray-50">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm md:text-base text-gray-600 font-medium">
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Investment:</span>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 font-bold text-gray-800 focus-within:ring-2 focus-within:ring-[#2076C7]/20 transition-all">
                <span className="text-[#2076C7]">₹</span>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) setInvestmentAmount(Math.min(Math.max(val, 0), 100000000));
                  }}
                  className="bg-transparent border-none outline-none w-28 ml-1 text-[#2076C7]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-400">Tenure:</span>
              <div className="relative">
                <select
                  value={activeTenure}
                  onChange={(e) => setActiveTenure(e.target.value as TenureType)}
                  className="appearance-none bg-gray-50 border border-gray-100 rounded-lg pl-3 pr-10 py-1.5 font-bold text-[#1CADA3] outline-none cursor-pointer focus:ring-2 focus:ring-[#1CADA3]/20 transition-all"
                >
                  {tenureBuckets.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1CADA3] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="hidden lg:flex items-center justify-center text-gray-300">
              <div className="h-px w-8 bg-gray-100"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3">Compare Plans</span>
              <div className="h-px w-8 bg-gray-100"></div>
            </div>
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative" ref={idx === openDropdownIndex ? dropdownRef : null}>
                <button
                  onClick={() => setOpenDropdownIndex(openDropdownIndex === idx ? null : idx)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all shadow-sm border ${selectedBanks[idx] ? 'bg-white border-[#2076C7] text-[#2076C7] font-bold' : 'bg-gray-50 border-gray-200 text-gray-400 font-medium hover:border-gray-300'}`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Landmark size={14} className="shrink-0" />
                    <span className="truncate text-sm">{selectedBanks[idx]?.company_name || `Select Bank ${idx + 1}`}</span>
                  </div>
                  <ChevronDown size={14} className={`shrink-0 transition-transform ${openDropdownIndex === idx ? 'rotate-180' : ''}`} />
                </button>

                {openDropdownIndex === idx && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto py-2">
                    <button
                      onClick={() => handleSelectBank(idx, null)}
                      className="w-full px-4 py-3 flex items-center gap-2 hover:bg-red-50 text-red-500 transition-colors border-b border-gray-50 mb-1"
                    >
                      <X size={14} />
                      <span className="font-bold text-xs uppercase tracking-wider">Clear Slot</span>
                    </button>
                    {allBanks.map((bank, i) => {
                      const isSelectedSomewhere = selectedBanks.some(b => b?.company_name === bank.company_name);
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectBank(idx, bank)}
                          disabled={isSelectedSomewhere && selectedBanks[idx]?.company_name !== bank.company_name}
                          className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left ${selectedBanks[idx]?.company_name === bank.company_name ? 'bg-blue-50/50 text-[#2076C7]' : isSelectedSomewhere ? 'opacity-50 cursor-not-allowed' : 'text-gray-700'}`}
                        >
                          <span className="font-bold text-xs">{bank.company_name}</span>
                          {selectedBanks[idx]?.company_name === bank.company_name && <CheckCircle2 size={14} className="text-[#2076C7]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4 md:px-10 py-6 overflow-x-auto text-gray-800">
          {selectedBanksCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-20">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2076C7] mb-6">
                <Database size={32} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">No Banks Selected</h2>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Select banks from the dropdowns above to compare FD rates side by side.</p>
            </div>
          ) : (
            <div className="min-w-[800px] w-full">
              <table className="w-full border-separate border-spacing-0 table-fixed">
                <thead>
                  <tr>
                    <th className="p-4 text-left text-gray-400 font-bold uppercase text-[10px] tracking-widest w-1/4 border-b border-gray-100">Institution</th>
                    {selectedBanks.map((bank, i) => (
                      <th
                        key={i}
                        className={`p-4 text-center border-b border-gray-100 relative group w-1/4 ${i !== selectedBanks.length - 1 ? 'border-r' : ''}`}
                      >
                        {bank ? (
                          <>
                            <button
                              onClick={() => handleSelectBank(i, null)}
                              className="absolute -top-1 -right-1 p-1 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                            >
                              <X size={10} />
                            </button>
                            <h4 className="text-base font-extrabold text-[#1CADA3] tracking-tight">{bank.company_name}</h4>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-1 opacity-20">
                            <Landmark size={16} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Empty</span>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* Interest Rate */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">Interest Rate</td>
                    {selectedBanks.map((bank, i) => (
                      <td key={i} className={`p-4 text-center font-extrabold text-lg text-slate-700 ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                        {bank ? getRate(bank) + "%" : "-"}
                      </td>
                    ))}
                  </tr>
                  {/* Special Bonus */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">Special Bonus</td>
                    {selectedBanks.map((bank, i) => (
                      <td key={i} className={`p-4 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                        {bank?.special_offer ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100 shadow-sm">
                            <Star size={10} className="fill-amber-400 text-amber-400" />
                            {bank.special_offer}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  {/* Maturity Amount */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">Maturity*</td>
                    {selectedBanks.map((bank, i) => {
                      const calc = bank ? calculateFD(bank) : { maturity: '-', earned: '-' };
                      return (
                        <td key={i} className={`p-4 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                          <span className={`inline-block font-extrabold px-5 py-2 rounded-xl text-sm shadow-sm ${bank ? 'bg-[#E6F7F6] text-[#1CADA3]' : 'bg-gray-50 text-gray-200 shadow-none'}`}>
                            {calc.maturity}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Gain */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">Gain*</td>
                    {selectedBanks.map((bank, i) => {
                      const calc = bank ? calculateFD(bank) : { maturity: '-', earned: '-' };
                      return (
                        <td key={i} className={`p-4 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                          <span className={`inline-block font-extrabold px-5 py-2 rounded-xl text-sm shadow-sm ${bank ? 'bg-[#E6F7F6] text-[#1CADA3]' : 'bg-gray-50 text-gray-200 shadow-none'}`}>
                            {calc.earned}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Sr. Citizen */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">Sr. Citizen</td>
                    {selectedBanks.map((bank, i) => (
                      <td key={i} className={`p-4 text-center font-extrabold text-lg text-slate-700 ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                        {bank ? bank.senior_citizen_rate + "%" : "-"}
                      </td>
                    ))}
                  </tr>
                  {/* Payout Frequency */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">Payout</td>
                    {selectedBanks.map((bank, i) => {
                      const isNBFC = bank?.category === "NBFC" || bank?.category === "NBFCs";
                      return (
                        <td key={i} className={`p-4 text-center font-bold text-xs text-slate-500 ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                          {bank ? (isNBFC ? 'Monthly' : 'Quarterly') : '-'}
                        </td>
                      );
                    })}
                  </tr>
                  {/* A/c Required */}
                  <tr>
                    <td className="p-4 text-[10px] text-gray-400 font-bold border-r border-gray-50 uppercase tracking-widest">A/c Required</td>
                    {selectedBanks.map((bank, i) => {
                      const isNBFC = bank?.category === "NBFC" || bank?.category === "NBFCs";
                      return (
                        <td key={i} className={`p-4 text-center font-bold text-sm text-slate-500 ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                          {bank ? (isNBFC ? 'No' : 'Savings') : '-'}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Apply Buttons */}
                  <tr>
                    <td className="p-4 border-r border-gray-50"></td>
                    {selectedBanks.map((bank, i) => (
                      <td key={i} className={`p-4 text-center ${i !== selectedBanks.length - 1 ? 'border-r border-gray-50' : ''}`}>
                        {bank && (
                          <div className="flex justify-center">
                            <button
                              className="w-[140px] py-3 rounded-xl text-white text-xs font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-default"
                              style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                            >
                              Apply Now
                            </button>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-dashed border-slate-100">
                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                  * Maturity amounts are indicative and calculated based on quarterly compounding for the selected tenure. Interest rates and calculations are for representative purposes. Actual returns may vary based on bank-specific compounding policies and tax implications.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease; }
      `}</style>
    </div>
  );
}