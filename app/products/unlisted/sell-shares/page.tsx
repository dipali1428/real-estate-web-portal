'use client';
import React, { useState, useMemo, useEffect, useCallback, FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Search, HandCoins, Building, FileSignature,
  Calculator, ChartLine, CheckCircle, ChevronDown, ChevronUp,
  Check, X, HelpCircle, Clock, Send, Package, Filter,
  AlertCircle, IndianRupee, Info
} from 'lucide-react';
import { fetchAllShares } from '../../../services/unlistedservices';
import { useModal } from '../../../context/ModalContext';

// --- INTERFACES ---
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ApiCompany {
  id: number;
  shares_name: string;
  clean_name?: string;
  price: string | number;
  min_lot_size: number;
  depository_applicable: string;
  logo_url?: string;
  is_active: boolean;
  status: string;
  updated_at?: string;
}

// --- FAQ DATA ---
const FAQ_ITEMS = [
  { q: 'How long does the selling process take?', a: 'Typically, the selling process takes 7-10 business days from submission to payment. This includes verification, matching with buyers, and transaction settlement.' },
  { q: 'What documents are required to sell unlisted shares?', a: "You'll need your share certificate, PAN card, proof of purchase, and KYC documents. Our team will guide you through the specific documentation requirements." },
  { q: 'Can I sell partially or do I need to sell all my shares?', a: "You can sell any number of shares from your holdings. There's no minimum or maximum quantity requirement." }
];

const SellShares: FC = () => {
  const router = useRouter();
  const { openLogin } = useModal();

  // --- DATA STATES ---
  const [companies, setCompanies] = useState<ApiCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- FILTER & SEARCH STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [visibleCount, setVisibleCount] = useState(12);

  // --- SELL FORM STATES ---
  const [selectedCompany, setSelectedCompany] = useState<ApiCompany | null>(null);
  const [qtyToSell, setQtyToSell] = useState('');
  const [calcResult, setCalcResult] = useState<{ price: number; total: number } | null>(null);

  // --- UI STATES ---
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);

  // ✅ SELL PRICE LOGIC (Fixed 3% discount from API price)
  const getSellPrice = useCallback((price: number) => {
    const discount = 3;
    return Math.round(price - (price * discount / 100));
  }, []);

  // TOAST HANDLER
  const showToast = useCallback((message: string, type: Toast['type'] = 'info', duration: number = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // FETCH DATA
  useEffect(() => {
    const loadCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllShares();
        let companiesData: ApiCompany[] = [];
        if (Array.isArray(response)) {
          companiesData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          companiesData = response.data;
        }
        setCompanies(companiesData.filter(c => c.is_active !== false));
      } catch {
        setError("Failed to load market data.");
        showToast("Failed to load market data.", 'error');
      } finally {
        setIsLoading(false);
      }
    };
    loadCompanies();
  }, [showToast]);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // RESET PAGINATION ON FILTER
  useEffect(() => {
    setVisibleCount(12);
  }, [debouncedSearch, selectedCategory, sortBy]);

  // FILTERING LOGIC
  const filteredCompanies = useMemo(() => {
    let result = [...companies];
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(c => 
        c.shares_name.toLowerCase().includes(term) || 
        (c.depository_applicable?.toLowerCase() || '').includes(term)
      );
    }
    if (selectedCategory) {
      result = result.filter(c => c.depository_applicable === selectedCategory);
    }
    switch (sortBy) {
      case 'name-asc': result.sort((a, b) => a.shares_name.localeCompare(b.shares_name)); break;
      case 'name-desc': result.sort((a, b) => b.shares_name.localeCompare(a.shares_name)); break;
      case 'price-high': result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case 'price-low': result.sort((a, b) => Number(a.price) - Number(b.price)); break;
    }
    return result;
  }, [companies, debouncedSearch, selectedCategory, sortBy]);

  const categories = useMemo(() => 
    Array.from(new Set(companies.map(c => c.depository_applicable || 'Other'))).sort()
  , [companies]);

  // HANDLERS
  const handleApplyFilters = () => setDebouncedSearch(searchTerm);

  const handleSelectToSell = (company: ApiCompany) => {
    if (selectedCompany?.id === company.id) {
      setSelectedCompany(null);
      setQtyToSell('');
      setCalcResult(null);
      showToast(`Deselected ${company.shares_name}`, 'info');
    } else {
      setSelectedCompany(company);
      setQtyToSell('');
      setCalcResult(null);
      showToast(`Selected ${company.shares_name} for selling`, 'success');
    }
  };

  const handleCalculate = () => {
    if (!selectedCompany || !qtyToSell) {
      showToast('Please select a company and enter quantity', 'error');
      return;
    }
    const reducedPrice = getSellPrice(Number(selectedCompany.price));
    setCalcResult({ price: reducedPrice, total: reducedPrice * parseInt(qtyToSell) });
    showToast(`Price calculated: ₹${reducedPrice.toLocaleString()} per share`, 'success');
    setTimeout(() => {
        const element = document.getElementById('resultsSection');
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSellNow = () => {
    if (calcResult && selectedCompany) {
      sessionStorage.setItem('pendingSellDetails', JSON.stringify({
        company: selectedCompany,
        quantity: parseInt(qtyToSell),
        estimatedValue: calcResult,
        timestamp: new Date().toISOString()
      }));
      openLogin();
      showToast('Please login to proceed with selling', 'info', 3000);
    } else {
      showToast('Please calculate the estimated value first', 'error');
    }
  };

  const getAvailableVolume = (id: number) => {
    const seed = id * 12345;
    return `${(Math.abs(Math.sin(seed) * 100) + 20).toFixed(1)}K`;
  };

  // TOAST UI HELPERS
  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error': return <X className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };
  const getToastBg = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-green-200 text-green-800';
      case 'error': return 'bg-red-100 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading market data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* TOAST CONTAINER */}
      <div className="fixed top-16 md:top-20 right-4 md:right-5 z-[5000] flex flex-col gap-3 w-[calc(100%-32px)] md:w-auto">
        {toasts.map(toast => (
          <div key={toast.id} onClick={() => removeToast(toast.id)} className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${getToastBg(toast.type)} animate-in slide-in-from-right-5 cursor-pointer`}>
            {getToastIcon(toast.type)}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-4 md:py-8 min-h-screen">
        {/* BACK BUTTON */}
        <div className="sticky top-[72px] z-40 mb-6 md:mb-8 bg-gradient-to-br from-gray-50 to-white pt-2 pb-2">
          <a href="/products/unlisted" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-sm hover:bg-white transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </a>
        </div>

        {/* HEADER */}
        <header className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 md:p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-4 md:mb-6">
            <div className="p-3 md:p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <HandCoins className="w-6 h-6 md:w-8 md:h-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm px-2">
            Sell Unlisted Shares
          </h1>
          <div className="w-16 md:w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4 md:mb-6"></div>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
            Get competitive pricing and fast settlement for your unlisted shareholdings.
          </p>
        </header>

        {/* SEARCH & FILTERS */}
        <section className="mb-6 md:mb-8">
          <div className="mb-4 md:mb-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search companies to sell..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                className="block w-full pl-12 pr-4 py-3 md:py-4 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500" 
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
              <select className="w-full md:w-auto px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] transition-all text-gray-900 text-sm" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select className="w-full md:w-auto px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] transition-all text-gray-900 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
              <div className="flex items-center justify-center md:justify-start px-4 py-2 bg-blue-50 rounded-lg">
                <span className="text-xs md:text-sm text-[#2076C7] font-semibold whitespace-nowrap">{filteredCompanies.length} companies</span>
              </div>
            </div>
            <button onClick={handleApplyFilters} className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md whitespace-nowrap">
              <Filter className="w-4 h-4" /> Apply Filters
            </button>
          </div>
        </section>

        {/* COMPANIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          {filteredCompanies.slice(0, visibleCount).map(company => {
            const isSelected = selectedCompany?.id === company.id;
            const sellPrice = getSellPrice(Number(company.price));
            return (
              <div
                key={company.id}
                onClick={() => handleSelectToSell(company)}
                className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl p-5 md:p-6 flex flex-col items-center text-center h-full cursor-pointer group ${
                  isSelected ? 'border-[#2076C7] bg-blue-50/30 ring-2 ring-[#2076C7]/10' : 'border-gray-100 hover:border-[#2076C7]'
                }`}
              >
                <div className="w-full h-28 md:h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100 shadow-sm overflow-hidden transition-transform group-hover:scale-[1.02]">
                  {company.logo_url ? <img src={company.logo_url} className="w-full h-full object-contain p-3" alt="" /> : <span className="text-3xl font-bold text-[#2076C7]">{company.shares_name.charAt(0)}</span>}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 line-clamp-1">{company.shares_name}</h3>
                <div className="mb-2"><span className="text-xl md:text-2xl font-bold text-[#2076C7]">₹{sellPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
                <div className="text-xs md:text-sm text-gray-500 mb-4">{company.depository_applicable || 'Unlisted Share'}</div>
                
                <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-3 w-full mb-6">
                  <div className="text-center"><div className="text-[10px] md:text-xs text-gray-500 mb-0.5">Lot Size</div><div className="text-xs md:text-sm font-bold text-gray-900">{company.min_lot_size}</div></div>
                  <div className="text-center"><div className="text-[10px] md:text-xs text-gray-500 mb-0.5">Depository</div><div className="text-xs md:text-sm font-bold text-gray-900">{company.depository_applicable?.split(' ')[0] || 'NSDL'}</div></div>
                  <div className="text-center"><div className="text-[10px] md:text-xs text-gray-500 mb-0.5">Min. Value</div><div className="text-xs md:text-sm font-bold text-gray-900">₹{(sellPrice * company.min_lot_size).toLocaleString('en-IN')}</div></div>
                  <div className="text-center"><div className="text-[10px] md:text-xs text-gray-500 mb-0.5">Demand</div><div className="text-xs md:text-sm font-bold text-gray-900">{getAvailableVolume(company.id)}</div></div>
                </div>

                <div className="w-full mt-auto">
                   <button className={`w-full py-3 md:py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isSelected ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' : 'border-2 border-[#2076C7] text-[#2076C7] hover:bg-blue-50'
                  }`}>
                    {isSelected ? <Check size={16} /> : <HandCoins size={16} />} {isSelected ? 'Selected' : 'Select to Sell'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* VIEW MORE BUTTON */}
        {visibleCount < filteredCompanies.length && (
          <div className="flex justify-center pb-8 md:pb-12">
            <button onClick={() => setVisibleCount(prev => prev + 12)} className="flex items-center gap-2 px-6 md:px-8 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-sm hover:shadow-md active:scale-95">
              View More Companies <ChevronDown size={20} />
            </button>
          </div>
        )}

        {/* SELL CALCULATOR SECTION */}
        <section className="mb-8 md:mb-12 mt-4 md:mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3 px-1">
            <FileSignature className="w-5 h-5 md:w-6 md:h-6 text-[#2076C7]" /> Sell Share Details
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#2076C7]" /> Company Name
                </label>
                <div className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-900 text-sm md:text-base">
                  {selectedCompany?.shares_name || "Select a company from the grid above"}
                </div>
                {selectedCompany && (
                   <p className="text-[10px] md:text-xs text-gray-500 mt-2">
                     Market Price: <span className="text-red-500 line-through">₹{Number(selectedCompany.price).toLocaleString()}</span>
                     <span className="mx-2">|</span>
                     Your Sell Price: <span className="text-emerald-600 font-bold">₹{getSellPrice(Number(selectedCompany.price)).toLocaleString()}</span>
                   </p>
                )}
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#2076C7]" /> Quantity
                </label>
                <input 
                  type="number" 
                  placeholder="Enter quantity" 
                  value={qtyToSell} 
                  onChange={(e) => setQtyToSell(e.target.value)} 
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:border-[#2076C7] outline-none font-bold text-gray-700 text-sm md:text-base" 
                />
              </div>
              <button 
                onClick={handleCalculate} 
                className="md:col-span-2 py-3 md:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-md hover:opacity-95 transition-all active:scale-[0.98]"
              >
                <Calculator size={18} /> Calculate Estimated Value
              </button>
            </div>
          </div>
        </section>

        {/* RESULTS SECTION */}
        {calcResult && (
          <section id="resultsSection" className="mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3 px-1">
              <ChartLine className="w-5 h-5 md:w-6 md:h-6 text-[#1CADA3]" /> Estimated Value
            </h2>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="p-4 md:p-6 bg-gray-50 rounded-xl border text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-700">₹{calcResult.price.toLocaleString()}</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase mt-1">Sell Price / Share</div>
                </div>
                <div className="p-4 md:p-6 bg-gray-50 rounded-xl border text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-700">₹{calcResult.total.toLocaleString()}</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase mt-1">Total Value</div>
                </div>
                <div className="p-4 md:p-6 bg-gray-50 rounded-xl border text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-700">7-10 Days</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase mt-1">Settlement Time</div>
                </div>
              </div>
              <button 
                onClick={handleSellNow} 
                className="w-full sm:w-auto px-10 md:px-12 py-3 md:py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-base md:text-lg shadow-xl flex items-center justify-center gap-3 mx-auto transition-all active:scale-95"
              >
                <Send size={18} /> Sell Now
              </button>
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        <section className="mb-12 mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3 px-1">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-[#2076C7]" /> Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-8 space-y-3 md:space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                <div className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all" onClick={() => setActiveFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])}>
                  <h3 className="font-bold text-sm md:text-base text-gray-900 pr-4">{item.q}</h3>
                  {activeFaqs.includes(idx) ? <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                </div>
                {activeFaqs.includes(idx) && (
                  <div className="p-4 bg-white text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        @keyframes slideInFromRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .slide-in-from-right-5 { animation: slideInFromRight 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default SellShares;