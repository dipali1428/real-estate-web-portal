'use client';
import React, { useState, useMemo, useEffect, useCallback, FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Search, HandCoins, FileSignature,
  ChartLine, CheckCircle, ChevronDown, ChevronUp,
  Check, X, HelpCircle, Send, Filter, AlertCircle, Info
} from 'lucide-react';
import { fetchAllShares } from '../../../services/unlistedservices';
import { useModal } from '../../../context/ModalContext';
import Image from 'next/image';

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
  
  // --- RESPONSIVE VISIBILITY LOGIC (20 Desktop, 4 Mobile) ---
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const handleInitialCount = () => {
        if (window.innerWidth < 768) {
            setVisibleCount(4); // Mobile: 4 cards total
        } else {
            setVisibleCount(20); // Desktop: 5 horizontal x 4 vertical
        }
    };
    handleInitialCount();
    window.addEventListener('resize', handleInitialCount);
    return () => window.removeEventListener('resize', handleInitialCount);
  }, []);

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
    if (window.innerWidth < 768) setVisibleCount(4);
    else setVisibleCount(20);
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
      setTimeout(() => {
        const element = document.getElementById('detailsSection');
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
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
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        {toasts.map(toast => (
          <div key={toast.id} onClick={() => removeToast(toast.id)} className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${getToastBg(toast.type)} animate-in slide-in-from-right-5 cursor-pointer`}>
            {getToastIcon(toast.type)}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-4 pt-4 md:pt-8 min-h-screen">
        {/* BACK BUTTON */}
        <div className="sticky top-[72px] z-40 mb-8 bg-gradient-to-br from-gray-50 to-white pt-2 pb-2">
          <a href="/products/unlisted" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-sm hover:bg-white transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </a>
        </div>

        {/* HEADER */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <HandCoins className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Sell Unlisted Shares</h1>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">Get competitive pricing and fast settlement for your unlisted shareholdings.</p>
        </header>

        {/* SEARCH & FILTERS */}
        <section className="mb-8">
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search companies to sell..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#2076C7] outline-none shadow-sm hover:shadow-md text-gray-900" 
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 flex-1">
              <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] text-gray-900 text-sm" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] text-gray-900 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name-asc">Name: A to Z</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                <span className="text-sm text-[#2076C7] font-semibold">{filteredCompanies.length} companies</span>
              </div>
            </div>
            <button onClick={handleApplyFilters} className="px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 flex items-center gap-2 shadow-md">
              <Filter className="w-4 h-4" /> Apply Filters
            </button>
          </div>
        </section>

        {/* --- GRID LAYOUT: 5 COLUMNS ON DESKTOP --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {filteredCompanies.slice(0, visibleCount).map(company => {
            const isSelected = selectedCompany?.id === company.id;
            const sellPrice = getSellPrice(Number(company.price));
            return (
              <div
                key={company.id}
                onClick={() => handleSelectToSell(company)}
                className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full group cursor-pointer ${
                  isSelected ? 'border-[#2076C7] ring-2 ring-[#2076C7]/10' : 'border-gray-100 hover:border-[#2076C7]'
                }`}
              >
                {/* RECTANGULAR IMAGE CONTAINER */}
                <div className="w-full h-32 bg-gray-50 rounded-t-2xl flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    {company.logo_url ? (
                        <Image
                            src={company.logo_url} 
                            width={200}
                            height={150}
                            className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-110" 
                            alt={company.shares_name} 
                        />
                    ) : (
                        <span className="text-3xl font-bold text-[#2076C7]">{company.shares_name.charAt(0)}</span>
                    )}
                </div>

                {/* Company Details */}
                <div className="p-5 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#2076C7] transition-colors">
                        {company.shares_name}
                    </h4>
                    
                    {/* Price Display */}
                    <div className="mb-4 text-center">
                        <span className="text-2xl font-bold text-[#2076C7]">
                            ₹{sellPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 text-center mb-4 uppercase font-bold tracking-tighter">
                        {company.depository_applicable || 'Unlisted Share'}
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Lot Size</div>
                            <div className="text-sm font-bold text-gray-900">{company.min_lot_size}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Depository</div>
                            <div className="text-sm font-bold text-gray-900">{company.depository_applicable?.split(' ')[0] || 'NSDL'}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Min. Value</div>
                            <div className="text-sm font-bold text-gray-900">₹{(sellPrice * company.min_lot_size).toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400 uppercase font-bold">Demand</div>
                            <div className="text-sm font-bold text-gray-900">{getAvailableVolume(company.id)}</div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                        <button className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            isSelected ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' : 'border-2 border-[#2076C7] text-[#2076C7] hover:bg-blue-50'
                        }`}>
                            {isSelected ? <Check size={16} /> : <HandCoins size={16} />} 
                            {isSelected ? 'Selected' : 'Select to Sell'}
                        </button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SHOW MORE BUTTON LOGIC (4 for Mobile, 20 for Desktop) */}
        {visibleCount < filteredCompanies.length && (
          <div className="flex justify-center pb-12">
            <button 
                onClick={() => setVisibleCount(prev => prev + (window.innerWidth < 768 ? 4 : 20))} 
                className="flex items-center gap-2 px-10 py-4 bg-white border-2 border-gray-200 rounded-2xl font-black text-gray-700 hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-md"
            >
                View More Companies <ChevronDown size={20} />
            </button>
          </div>
        )}

        {/* SELL CALCULATOR SECTION */}
        <section id="detailsSection" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 px-1">
            <FileSignature className="w-6 h-6 text-[#2076C7]" /> Sell Details
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">Company</label>
                <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900">
                  {selectedCompany?.shares_name || "Select a company from the grid above"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">Quantity</label>
                <input 
                  type="number" 
                  placeholder="Enter quantity" 
                  value={qtyToSell} 
                  onChange={(e) => setQtyToSell(e.target.value)} 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-[#2076C7] outline-none font-bold" 
                />
              </div>
              <button 
                onClick={handleCalculate} 
                className="md:col-span-2 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold shadow-md hover:opacity-95 transition-all"
              >
                Calculate Estimated Value
              </button>
            </div>
          </div>
        </section>

        {/* RESULTS SECTION */}
        {calcResult && (
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 px-1">
              <ChartLine className="w-6 h-6 text-[#1CADA3]" /> Estimated Value
            </h2>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-gray-50 rounded-xl border text-center">
                  <div className="text-2xl font-black text-gray-700">₹{calcResult.price.toLocaleString()}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase mt-1">Sell Price / Share</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border text-center">
                  <div className="text-3xl font-black text-[#2076C7]">₹{calcResult.total.toLocaleString()}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase mt-1">Total Value</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border text-center">
                  <div className="text-2xl font-black text-gray-700">7-10 Days</div>
                  <div className="text-xs font-bold text-gray-400 uppercase mt-1">Settlement Time</div>
                </div>
              </div>
              <button 
                onClick={handleSellNow} 
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 mx-auto transition-all"
              >
                <Send size={18} /> Sell Now
              </button>
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 px-1">
            <HelpCircle className="w-6 h-6 text-[#2076C7]" /> Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                <div className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all" onClick={() => setActiveFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])}>
                  <h3 className="font-bold text-gray-900">{item.q}</h3>
                  {activeFaqs.includes(idx) ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
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