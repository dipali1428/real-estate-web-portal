'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  HandCoins,
  Building,
  FileSignature,
  Calculator,
  ChartLine,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  HelpCircle,
  Clock,
  Send,
  Package,
  Filter,
  AlertCircle,
  IndianRupee,
  MapPin,
  Info
} from 'lucide-react';
import { fetchAllShares } from '../../../services/unlistedservices';
import { useModal } from '../../../context/ModalContext';
import { toast } from 'react-hot-toast';

// Toast Component Interface
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Define the Company type based on your API response
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

// FAQ DATA
const FAQ_ITEMS = [
  { q: 'How long does the selling process take?', a: 'Typically, the selling process takes 7-10 business days from submission to payment. This includes verification, matching with buyers, and transaction settlement.' },
  { q: 'What documents are required to sell unlisted shares?', a: "You'll need your share certificate, PAN card, proof of purchase, and KYC documents. Our team will guide you through the specific documentation requirements." },
  { q: 'Can I sell partially or do I need to sell all my shares?', a: "You can sell any number of shares from your holdings. There's no minimum or maximum quantity requirement." }
];

const SellShares: React.FC = () => {
  const router = useRouter();
  const { openLogin } = useModal();

  // --- DATA STATES ---
  const [companies, setCompanies] = useState<ApiCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- FILTER & SEARCH STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  // --- SELL FORM STATES ---
  const [selectedCompany, setSelectedCompany] = useState<ApiCompany | null>(null);
  const [qtyToSell, setQtyToSell] = useState('');
  const [calcResult, setCalcResult] = useState<{ price: number; total: number } | null>(null);

  // --- FAQ STATE ---
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);

  // --- TOAST STATE ---
  const [toasts, setToasts] = useState<Toast[]>([]);

  // --- MODAL STATES ---
  const [detailCompany, setDetailCompany] = useState<ApiCompany | null>(null);

  // ✅ PRICE REDUCTION FUNCTION - Fixed 3% discount
  const getSellPrice = useCallback((price: number) => {
    const discount = 3; // Fixed 3% discount
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

  // Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllShares();

      let companiesData: ApiCompany[] = [];
      if (Array.isArray(response)) {
        companiesData = response;
      } else if (response && typeof response === 'object' && 'data' in response && Array.isArray(response.data)) {
        companiesData = response.data as ApiCompany[];
      } else if (response && typeof response === 'object' && 'shares' in response && Array.isArray(response.shares)) {
        companiesData = response.shares as ApiCompany[];
      }

      const activeCompanies = companiesData.filter((c: ApiCompany) => c.is_active !== false);
      setCompanies(activeCompanies);
    } catch (err: any) {
      toast.error('Error fetching companies:');
      setError(err.response?.data?.message || 'Failed to load companies. Please try again.');
      showToast('Failed to load market data. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // PREVENT SCROLL ON MODAL OPEN
  useEffect(() => {
    document.body.style.overflow = detailCompany ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [detailCompany]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = companies
      .map(c => c.depository_applicable || 'Other')
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
    return cats;
  }, [companies]);

  // FILTERING LOGIC
  const filteredCompanies = useMemo(() => {
    let filtered = [...companies];

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(c =>
        c.shares_name.toLowerCase().includes(term) ||
        (c.clean_name?.toLowerCase() || '').includes(term) ||
        (c.depository_applicable?.toLowerCase() || '').includes(term)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(c => c.depository_applicable === selectedCategory);
    }

    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.shares_name.localeCompare(b.shares_name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.shares_name.localeCompare(a.shares_name));
        break;
      case 'price-high':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'price-low':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
    }

    return filtered;
  }, [companies, debouncedSearch, selectedCategory, sortBy]);

  const handleApplyFilters = () => {
    setDebouncedSearch(searchTerm);
  };

  // ✅ UPDATED: Toggle selection - select if not selected, unselect if already selected
  const handleSelectToSell = (company: ApiCompany) => {
    if (selectedCompany?.id === company.id) {
      // If same company is clicked, unselect it
      setSelectedCompany(null);
      setQtyToSell('');
      setCalcResult(null);
      showToast(`Deselected ${company.shares_name}`, 'info');
    } else {
      // If different company is clicked, select it
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
    
    const qty = parseInt(qtyToSell);
    
    // ✅ Get reduced sell price from API price (fixed 3% reduction)
    const reducedPrice = getSellPrice(Number(selectedCompany.price));
    
    const pricePerShare = reducedPrice;
    const totalValue = pricePerShare * qty;
    
    setCalcResult({
      price: pricePerShare,
      total: totalValue
    });
    
    showToast(`Price calculated: ₹${reducedPrice.toLocaleString()} per share`, 'success');
    setTimeout(() => document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSellNow = () => {
    if (calcResult && selectedCompany && qtyToSell) {
      const reducedPrice = getSellPrice(Number(selectedCompany.price));
      
      sessionStorage.setItem('pendingSellDetails', JSON.stringify({
        company: {
          id: selectedCompany.id,
          name: selectedCompany.shares_name,
          originalPrice: Number(selectedCompany.price),
          sellPrice: reducedPrice,
          lotSize: selectedCompany.min_lot_size,
          logo_url: selectedCompany.logo_url,
          depository: selectedCompany.depository_applicable
        },
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

  const toggleFaq = (idx: number) => {
    setActiveFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSelectedCategory('');
    setSortBy('name-asc');
  };

  const calculateMinInvestment = (price: number, lotSize: number): string => {
    const investment = price * lotSize;
    return `₹${investment.toLocaleString('en-IN')}`;
  };

  // Generate random volume for "Available" field (similar to BuyShares)
  const getAvailableVolume = useCallback((companyId: number): string => {
    // Generate consistent but random-looking volume based on company ID
    const seed = companyId * 12345;
    const randomNum = Math.abs(Math.sin(seed) * 100);
    if (randomNum > 80) return `${(Math.random() * 50 + 20).toFixed(1)}K`;
    if (randomNum > 50) return `${(Math.random() * 100 + 50).toFixed(1)}K`;
    return `${(Math.random() * 200 + 100).toFixed(1)}K`;
  }, []);

  // Toast Icon Helper
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

  // LOADING STATE UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading available companies...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 text-red-500 p-8 rounded-2xl border border-red-100 mb-6">
            <X className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Failed to Load</h3>
            <p className="text-sm opacity-90 mb-2">{error}</p>
            <p className="text-xs text-gray-500">Please check your connection and try again</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* TOAST CONTAINER */}
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${getToastBg(toast.type)} animate-in slide-in-from-right-5 max-w-sm cursor-pointer`}
            onClick={() => removeToast(toast.id)}
          >
            {getToastIcon(toast.type)}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-4 pt-4 md:pt-8 min-h-screen">
        {/* BACK BUTTON */}
        <div className="sticky top-[72px] z-40 mb-8 bg-gradient-to-br from-gray-50 to-white pt-2 pb-2">
          <div className="container mx-auto px-4">
            <a 
              href="/products/unlisted" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back</span>
            </a>
          </div>
        </div>

        {/* HEADER */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <HandCoins className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Sell Unlisted Shares
          </h1>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get competitive pricing and fast settlement for your unlisted shareholdings from our network of verified buyers
          </p>
        </header>

        {/* SEARCH & FILTERS SECTION */}
        {companies.length > 0 && (
          <>
            <section className="mb-8">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search companies by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                    className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Search by company name or category. Press Enter or click Apply Filters.
                </p>
              </div>

              {/* Filter Row */}
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 flex-1">
                  <select 
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-gray-900 min-w-[180px]" 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-gray-900 min-w-[180px]" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                  </select>

                  <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                    <span className="text-sm text-[#2076C7] font-semibold">
                      {filteredCompanies.length} companies
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleApplyFilters} 
                  className="px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-md whitespace-nowrap"
                >
                  <Filter className="w-4 h-4" /> Apply Filters
                </button>
              </div>
            </section>

            {/* RESULTS INFO */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full">
                Showing <span className="font-bold text-[#2076C7]">{filteredCompanies.length}</span> companies
              </p>
              {(searchTerm || selectedCategory || sortBy !== 'name-asc') && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 bg-white px-4 py-2 rounded-full border border-gray-200"
                >
                  <X size={14} />
                  Clear filters
                </button>
              )}
            </div>

            {/* COMPANIES GRID */}
            <div className="relative">
              <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map(company => {
                      const isSelected = selectedCompany?.id === company.id;
                      // ✅ Calculate reduced sell price from API price (fixed 3% discount)
                      const sellPrice = getSellPrice(Number(company.price));
                      const originalPrice = Number(company.price);
                      const discountPercent = 3;
                      
                      return (
                        <div
                          key={company.id}
                          className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col items-center text-center h-full cursor-pointer ${
                            isSelected ? 'border-[#2076C7] bg-blue-50/30' : 'border-gray-100 hover:border-[#2076C7]'
                          }`}
                          onClick={() => handleSelectToSell(company)}
                        >
                          {/* RECTANGULAR IMAGE CONTAINER */}
                          <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100 shadow-sm overflow-hidden">
                            {company.logo_url ? (
                              <img 
                                src={company.logo_url} 
                                className="w-full h-full object-contain p-3" 
                                alt={company.shares_name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  const parent = (e.target as HTMLImageElement).parentElement;
                                  if (parent) {
                                    const span = document.createElement('span');
                                    span.className = 'text-2xl font-bold text-[#2076C7]';
                                    span.textContent = company.shares_name.charAt(0);
                                    parent.appendChild(span);
                                  }
                                }}
                              />
                            ) : (
                              <span className="text-3xl font-bold text-[#2076C7]">{company.shares_name.charAt(0)}</span>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-1">{company.shares_name}</h3>
                          
                          {/* ✅ SELL PRICE DISPLAY - Reduced from API price */}
                          <div className="mb-2">
                            <span className="text-2xl font-bold text-[#2076C7]">
                              ₹{sellPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-4">{company.depository_applicable || 'Unlisted Share'}</div>

                          {/* ✅ SAME 4 FIELDS AS BUY SHARES: Lot Size, Depository, Min. Invest, Available */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-0.5">Lot Size</div>
                              <div className="text-sm font-bold text-gray-900">
                                {company.min_lot_size.toLocaleString()} shares
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-0.5">Depository</div>
                              <div className="text-sm font-bold text-gray-900">
                                {company.depository_applicable?.split(' ')[0] || 'NSDL'}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-0.5">Min. Invest</div>
                              <div className="text-sm font-bold text-gray-900">
                                {calculateMinInvestment(sellPrice, company.min_lot_size)}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-0.5">Available</div>
                              <div className="text-sm font-bold text-gray-900">
                                {getAvailableVolume(company.id)}
                              </div>
                            </div>
                          </div>

                          {/* ✅ BUTTON AT BOTTOM CENTER - with toggle selection text */}
                          <div className="w-full mt-auto">
                            <button className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                              isSelected 
                                ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' 
                                : 'border-2 border-[#2076C7] text-[#2076C7] hover:bg-blue-50'
                            }`}>
                              {isSelected ? <Check className="w-4 h-4" /> : <HandCoins className="w-4 h-4" />}
                              {isSelected ? 'Selected' : 'Select to Sell'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /* EMPTY STATE */
                    <div className="col-span-full text-center py-20">
                      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 max-w-lg mx-auto shadow-xl border border-gray-100">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Companies Found</h3>
                        <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or filters</p>
                        <button 
                          onClick={clearFilters}
                          className="px-8 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SELL FORM / CALCULATOR */}
            <section className="mb-12 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileSignature className="w-6 h-6 text-[#2076C7]" />
                Sell Share Details
              </h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#2076C7]" /> Company Name
                    </label>
                    <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg font-bold text-gray-900">
                      {selectedCompany?.shares_name || "Select from above"}
                    </div>
                    {selectedCompany && (
                      <p className="text-xs text-gray-500 mt-1">
                        Sell price: ₹{getSellPrice(Number(selectedCompany.price)).toLocaleString()} per share
                        <span className="text-red-500 ml-1">
                          (Original: ₹{Number(selectedCompany.price).toLocaleString()})
                        </span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#2076C7]" /> Number of Shares
                    </label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 text-gray-900 font-bold"
                      value={qtyToSell}
                      onChange={(e) => setQtyToSell(e.target.value)}
                      min={selectedCompany?.min_lot_size || 1}
                      step={selectedCompany?.min_lot_size || 1}
                    />
                    {selectedCompany && (
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum lot size: {selectedCompany.min_lot_size} shares
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <button 
                      type="button" 
                      onClick={handleCalculate} 
                      className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3"
                    >
                      <Calculator className="w-5 h-5" /> Calculate Estimated Value
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* RESULTS SECTION */}
            {calcResult && (
              <section id="resultsSection" className="mb-12 animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <ChartLine className="w-6 h-6 text-green-600" />
                  Estimated Value
                </h2>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold mb-2 text-gray-900">
                        ₹{calcResult.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Sell Price per Share</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold mb-2 text-gray-900">
                        ₹{calcResult.total.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Total Value</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold mb-2 text-gray-900">7-10 days</div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Processing Time</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleSellNow}
                      className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-lg shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 mx-auto hover:scale-105 duration-200"
                    >
                      <Send className="w-5 h-5" />
                      Sell Now
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* FAQ SECTION */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#2076C7]" /> 
                Frequently Asked Questions
              </h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-4">
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                    <div 
                      className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all" 
                      onClick={() => toggleFaq(idx)}
                    >
                      <h3 className="font-bold text-gray-900">{item.q}</h3>
                      {activeFaqs.includes(idx) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    {activeFaqs.includes(idx) && (
                      <div className="p-4 bg-white text-gray-600">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* DETAIL MODAL */}
      {detailCompany && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl my-8 animate-fadeIn overflow-hidden flex flex-col border border-gray-100">
            
            {/* HEADER */}
            <div className="bg-white border-b border-gray-100 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                  {detailCompany.logo_url ? (
                    <img src={detailCompany.logo_url} className="w-full h-full object-contain p-2" alt={detailCompany.shares_name} />
                  ) : (
                    <span className="text-2xl font-bold text-[#2076C7]">{detailCompany.shares_name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-xs font-bold rounded-full">
                      {detailCompany.depository_applicable || 'Unlisted Share'}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{detailCompany.shares_name}</h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {detailCompany.clean_name || 'India'} • ISIN: INE{detailCompany.id}XXXXX
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">Sell Price</p>
                  <div className="text-2xl md:text-3xl font-bold text-[#10b981]">
                    ₹{getSellPrice(Number(detailCompany.price)).toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-gray-400 line-through mt-1">
                    MRP: ₹{Number(detailCompany.price).toLocaleString('en-IN')}
                  </p>
                </div>
                <button 
                  onClick={() => setDetailCompany(null)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8 bg-gray-50/30 overflow-y-auto max-h-[calc(90vh-120px)]">
              
              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Minimum Lot', value: `${detailCompany.min_lot_size.toLocaleString()} Shares`, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Min Investment', value: calculateMinInvestment(getSellPrice(Number(detailCompany.price)), detailCompany.min_lot_size), icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Processing Time', value: '7-10 days', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Status', value: detailCompany.status || 'Active', icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                      <item.icon size={20} />
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT: Description & Details */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Description Card */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="text-[#1CADA3]" size={20} />
                      About the Company
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {detailCompany.shares_name} is a leading player in the unlisted shares market with strong growth potential and a proven track record of innovation. The company has shown consistent performance and is poised for significant expansion in the coming years.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ISIN</p>
                        <p className="text-sm font-semibold text-gray-900">INE{detailCompany.id}XXXXX</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Depository</p>
                        <p className="text-sm font-semibold text-gray-900">{detailCompany.depository_applicable || 'NSDL & CDSL'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lot Size</p>
                        <p className="text-sm font-semibold text-gray-900">{detailCompany.min_lot_size.toLocaleString()} shares</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-sm font-semibold text-green-600">{detailCompany.status || 'Active'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* RIGHT: Sidebar */}
                <div className="space-y-6">
                  
                  {/* Action Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Ready to Sell?</h4>
                    <p className="text-xs text-gray-500 mb-6">
                      Minimum value: {calculateMinInvestment(getSellPrice(Number(detailCompany.price)), detailCompany.min_lot_size)}
                    </p>
                    
                    <button
                      onClick={() => {
                        setDetailCompany(null);
                        handleSelectToSell(detailCompany);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <HandCoins size={18} />
                      Select to Sell
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center mt-4">
                      Our team will contact you within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .slide-in-from-right-5 {
          animation: slideInFromRight 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2076C7;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1a5e9e;
        }
      `}</style>
    </div>
  );
};

export default SellShares;