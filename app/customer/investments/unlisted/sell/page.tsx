'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, HandCoins, CheckCircle, ChevronDown, Check, TrendingUp, Send, Info, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import customerService from '../../../../services/customerService';
import { useModal } from '../../../../context/ModalContext';
import { toast } from 'react-hot-toast';

// --- TYPES ---
interface Company {
  id: number;
  shares_name: string;
  price: string | number;
  min_lot_size: number;
  depository_applicable: string;
  logo_url?: string;
}

const FAQ_ITEMS = [
  { q: 'How long does the selling process take?', a: 'Typically, the selling process takes 7-10 business days from submission to payment.' },
  { q: 'What documents are required?', a: "You'll need your share certificate/DIS, PAN card, and KYC documents." },
  { q: 'Is there a minimum quantity?', a: "While there is no hard minimum, selling in lot sizes similar to the market standard ensures faster matching with buyers." }
];

export default function SellSharesComponent() {
  const { openLogin } = useModal();
  
  // Data States
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Selection States
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [qtyToSell, setQtyToSell] = useState('');
  const [calcResult, setCalcResult] = useState<{ price: number; total: number } | null>(null);

  // 1. Fetch Companies
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await customerService.getAllCompanies();
        const data = response?.data || response || [];
        setCompanies(data);
      } catch (err) {
        toast.error('Failed to load market data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Logic: Sell Price (3% lower than current market price)
  const getSellPrice = (price: string | number) => {
    const p = typeof price === 'string' ? parseFloat(price) : price;
    return Math.round(p * 0.97); 
  };

  // 3. Filtering
  const filteredCompanies = useMemo(() => {
    return companies.filter(c => 
      c.shares_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companies, searchTerm]);

  // 4. Handlers
  const handleSelect = (company: Company) => {
    if (selectedCompany?.id === company.id) {
      setSelectedCompany(null);
      setCalcResult(null);
    } else {
      setSelectedCompany(company);
      setQtyToSell('');
      setCalcResult(null);
      setTimeout(() => {
        document.getElementById('sell-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleCalculate = () => {
    if (!selectedCompany || !qtyToSell || parseInt(qtyToSell) <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    const price = getSellPrice(selectedCompany.price);
    setCalcResult({
      price: price,
      total: price * parseInt(qtyToSell)
    });
  };

  // 5. Handle Sell Shares
  const handleSellShares = useCallback(() => {
    if (!selectedCompany || !calcResult) {
      toast.error('Please calculate the value before proceeding');
      return;
    }
    
    toast.success(
      `Sell order placed successfully for ${selectedCompany.shares_name}! Our team will contact you shortly via email for the transaction process.`,
    );
    
    // Reset the form after successful submission
    setSelectedCompany(null);
    setQtyToSell('');
    setCalcResult(null);
    
    // Optional: Scroll back to top of the companies list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCompany, calcResult]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#2076C7]" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* SEARCH BAR */}
      <div className="relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for shares you want to sell..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* COMPANIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {filteredCompanies.slice(0, visibleCount).map((company) => {
          const isSelected = selectedCompany?.id === company.id;
          const sellPrice = getSellPrice(company.price);

          return (
            <div 
              key={company.id} 
              onClick={() => handleSelect(company)}
              className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full group relative cursor-pointer ${
                isSelected ? 'border-[#2076C7] ring-2 ring-[#2076C7]/10' : 'border-gray-100 hover:border-[#2076C7]'
              }`}
            >
              <div className="w-full h-32 bg-gray-50 rounded-t-2xl flex items-center justify-center border-b border-gray-100 overflow-hidden relative">
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 bg-[#2076C7] text-white rounded-full p-1 shadow-md">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                {company.logo_url ? (
                  <Image src={company.logo_url} width={200} height={150} className="w-full h-full object-contain p-3 transition-all duration-700 group-hover:scale-110" alt={company.shares_name} />
                ) : (
                  <span className="text-3xl font-bold text-[#2076C7]">{company.shares_name.charAt(0)}</span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#2076C7] transition-colors duration-300 text-center">
                  {company.shares_name}
                </h4>
                <div className="mb-4 text-center">
                  <span className="text-2xl font-bold text-[#2076C7]">₹{sellPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Estimated Sell Price</div>
                </div>
                <div className="text-xs text-gray-500 text-center mb-4 uppercase font-semibold">Unlisted Share</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
                  <div className="text-center">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Lot Size</div>
                    <div className="text-sm font-bold text-gray-900">{company.min_lot_size}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Depository</div>
                    <div className="text-sm font-bold text-gray-900">{company.depository_applicable?.split(' ')[0] || 'NSDL'}</div>
                  </div>
                </div>
                <div className="mt-auto">
                  <button className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${isSelected ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' : 'border-2 border-[#2076C7]/20 text-[#2076C7] hover:bg-blue-50'}`}>
                    {isSelected ? <CheckCircle size={18} /> : <HandCoins size={18} />} 
                    {isSelected ? 'Selected' : 'Select to Sell'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEW MORE BUTTON */}
      {visibleCount < filteredCompanies.length && (
        <div className="flex justify-center pb-8">
          <button onClick={() => setVisibleCount(v => v + 5)} className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-sm">
            View More Companies <ChevronDown size={20} />
          </button>
        </div>
      )}

      {/* COMPACT CALCULATOR SECTION */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div 
            id="sell-calculator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Header: Reduced padding and font size */}
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-6 py-4 text-white">
              <h3 className="text-base font-bold flex items-center gap-2">
                <HandCoins size={18} /> {selectedCompany.shares_name} Selling Valuation
              </h3>
            </div>
            
            {/* Body: Reduced padding and grid gap */}
            <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Quantity to Sell</label>
                  <div className="relative">
                    <input 
                      type="number"
                      placeholder="e.g. 100"
                      value={qtyToSell}
                      onChange={(e) => setQtyToSell(e.target.value)}
                      className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#2076C7] outline-none text-lg font-bold text-gray-900 transition-all"
                    />
                  </div>
                  {/* Info alert: Reduced padding and text size */}
                  <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 rounded-lg border border-amber-100">
                    <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-800 font-medium leading-tight">Ensure shares are available in your demat account for a smooth transfer.</p>
                  </div>
                </div>
                
                {/* Button: Reduced padding and font size */}
                <button 
                  onClick={handleCalculate}
                  className="w-full py-3 bg-[#2076C7] text-white rounded-xl font-bold text-sm hover:bg-[#1CADA3] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Calculate Estimated Value
                </button>
              </div>

              {/* Result Area: Reduced overall padding */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <TrendingUp size={80} />
                </div>
                {calcResult ? (
                  <div className="space-y-4 relative z-10 text-center lg:text-left">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Total Payout</div>
                      <div className="text-3xl font-black text-[#2076C7] tracking-tight">₹{calcResult.total.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                            <div className="text-[9px] text-gray-400 font-bold uppercase">Price / Share</div>
                            <div className="text-base font-bold text-gray-900">₹{calcResult.price.toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                            <div className="text-[9px] text-gray-400 font-bold uppercase">Settlement</div>
                            <div className="text-base font-bold text-gray-700">T+7 Days</div>
                        </div>
                    </div>
                    <button 
                      onClick={handleSellShares}
                      className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Send size={16} /> SELL SHARES NOW
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-8">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border border-gray-100">
                        <HandCoins size={24} className="text-gray-300" />
                    </div>
                    <p className="text-xs font-bold leading-tight">Enter quantity to generate your <br/> customized selling quote</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}