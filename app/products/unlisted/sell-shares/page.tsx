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
  FileCheck,
  Clock,
  Send,
  TrendingUp,
  Package,
  Filter,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { fetchAllShares } from '../../../services/unlistedservices';
import { useModal } from '../../../context/ModalContext';

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

// Define Premium/Volume data from API (if available)
interface CompanyStats {
  premium: number;
  volume: number;
  demand: 'High' | 'Medium' | 'Low';
}

// PROCESS STEPS DATA
const PROCESS_STEPS = [
  { icon: FileSignature, num: 1, title: 'Submit Details', desc: 'Provide share details including company name, quantity, and certificate information.' },
  { icon: Calculator, num: 2, title: 'Get Valuation', desc: 'Receive an instant valuation based on current market prices and demand.' },
  { icon: HandCoins, num: 3, title: 'Match with Buyers', desc: 'We match your shares with verified buyers from our extensive network.' },
  { icon: Clock, num: 4, title: 'Receive Payment', desc: 'Get payment within 7-10 business days after transaction completion.' }
];

// FAQ DATA
const FAQ_ITEMS = [
  { q: 'How long does the selling process take?', a: 'Typically, the selling process takes 7-10 business days from submission to payment. This includes verification, matching with buyers, and transaction settlement.' },
  { q: 'What documents are required to sell unlisted shares?', a: "You'll need your share certificate, PAN card, proof of purchase, and KYC documents. Our team will guide you through the specific documentation requirements." },
  { q: 'Can I sell partially or do I need to sell all my shares?', a: "You can sell any number of shares from your holdings. There's no minimum or maximum quantity requirement." }
];

const SellShares: React.FC = () => {
  const router = useRouter();
  const { openLogin } = useModal(); // Get openLogin from modal context
  
  // STATE MANAGEMENT
  const [companies, setCompanies] = useState<ApiCompany[]>([]);
  const [companyStats, setCompanyStats] = useState<Map<number, CompanyStats>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<ApiCompany | null>(null);
  const [qtyToSell, setQtyToSell] = useState('');
  const [calcResult, setCalcResult] = useState<{ price: number; total: number; premium: number } | null>(null);
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string; type?: 'success' | 'error' }[]>([]);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  // Modal States
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch companies on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use fetchAllShares from unlistedServices
      const response = await fetchAllShares();
      console.log('Companies API Response:', response);
      
      // Handle different response formats with proper typing
      let companiesData: ApiCompany[] = [];
      if (Array.isArray(response)) {
        companiesData = response;
      } else if (response && typeof response === 'object' && 'data' in response && Array.isArray(response.data)) {
        companiesData = response.data as ApiCompany[];
      } else if (response && typeof response === 'object' && 'shares' in response && Array.isArray(response.shares)) {
        companiesData = response.shares as ApiCompany[];
      }
      
      // Filter only active companies
      const activeCompanies = companiesData.filter((c: ApiCompany) => c.is_active !== false);
      setCompanies(activeCompanies);
      
      // Fetch additional stats for each company (if you have an endpoint for this)
      await fetchCompanyStats(activeCompanies);
      
    } catch (err: any) {
      console.error('Error fetching companies:', err);
      setError(err.response?.data?.message || 'Failed to load companies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch additional company stats (premium, volume, demand) - replace with your actual API endpoint
  const fetchCompanyStats = async (companies: ApiCompany[]) => {
    try {
      // Try to fetch stats from a backend endpoint if available
      // This is a placeholder - replace with your actual API call
      const statsMap = new Map<number, CompanyStats>();
      
      // You can fetch stats in batch if your API supports it
      // const statsResponse = await api.get('/api/unlisted/company-stats');
      
      // For now, generate realistic stats based on price and other factors
      companies.forEach(company => {
        const price = Number(company.price);
        // Generate premium based on price (higher price = lower premium usually)
        const premium = Math.round((Math.random() * 8 + 2) * 10) / 10; // 2-10%
        
        // Generate volume based on price (random for demo)
        const volume = Math.round(Math.random() * 50000 + 5000);
        
        // Determine demand based on premium and volume
        let demand: 'High' | 'Medium' | 'Low' = 'Medium';
        if (premium > 7) demand = 'High';
        else if (premium < 4) demand = 'Low';
        
        statsMap.set(company.id, { premium, volume, demand });
      });
      
      setCompanyStats(statsMap);
    } catch (err) {
      console.error('Error fetching company stats:', err);
    }
  };

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // NOTIFICATION HANDLER
  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  }, []);

  // Get unique categories from actual data
  const categories = useMemo(() => {
    const cats = companies
      .map(c => c.depository_applicable || 'Other')
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
    return cats;
  }, [companies]);

  // FILTERING LOGIC with debounced search
  const filteredCompanies = useMemo(() => {
    let filtered = [...companies];

    // Apply search
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(c =>
        c.shares_name.toLowerCase().includes(term) ||
        (c.clean_name?.toLowerCase() || '').includes(term) ||
        (c.depository_applicable?.toLowerCase() || '').includes(term)
      );
    }

    // Apply category filter (using depository_applicable as category)
    if (selectedCategory) {
      filtered = filtered.filter(c => c.depository_applicable === selectedCategory);
    }

    // Apply sorting
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

  // Handle Apply Filters
  const handleApplyFilters = () => {
    setDebouncedSearch(searchTerm);
    setShowFilters(false);
  };

  const handleSelectToSell = (company: ApiCompany) => {
    setSelectedCompany(company);
    setCalcResult(null);
    showNotification(`Selected ${company.shares_name} for selling`, 'success');
  };

  const handleCalculate = () => {
    if (!selectedCompany || !qtyToSell) {
      showNotification('Please select a company and enter quantity', 'error');
      return;
    }
    const qty = parseInt(qtyToSell);
    const currentPrice = Number(selectedCompany.price);
    
    // Get premium from stats or calculate based on demand
    const stats = companyStats.get(selectedCompany.id);
    const premiumRate = stats?.premium || 5.0;
    
    // Calculate with dynamic premium
    const pricePerShare = Math.round(currentPrice * (1 + premiumRate / 100));
    setCalcResult({
      price: pricePerShare,
      total: pricePerShare * qty,
      premium: premiumRate
    });
    showNotification('Estimated value calculated successfully', 'success');
    setTimeout(() => document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Handle Sell Now button click - Open login modal
  const handleSellNow = () => {
    if (calcResult && selectedCompany && qtyToSell) {
      // Store sell details in session storage for after login
      sessionStorage.setItem('pendingSellDetails', JSON.stringify({
        company: {
          id: selectedCompany.id,
          name: selectedCompany.shares_name,
          price: Number(selectedCompany.price),
          lotSize: selectedCompany.min_lot_size,
          logo_url: selectedCompany.logo_url,
          depository: selectedCompany.depository_applicable
        },
        quantity: parseInt(qtyToSell),
        estimatedValue: calcResult,
        timestamp: new Date().toISOString()
      }));
      
      // Open login modal
      openLogin();
    } else {
      showNotification('Please calculate the estimated value first', 'error');
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSelectedCategory('');
    setSortBy('name-asc');
  };

  // Get demand color class
  const getDemandColor = (demand: 'High' | 'Medium' | 'Low') => {
    switch(demand) {
      case 'High': return 'bg-green-100 text-green-600';
      case 'Medium': return 'bg-yellow-100 text-yellow-600';
      case 'Low': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* NOTIFICATIONS */}
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5 ${
              n.type === 'error' 
                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
          >
            {n.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-blue-600" />
            )}
            <span className="text-sm font-medium">{n.message}</span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-4 pt-4 md:pt-8">
        <div className="flex justify-start mb-8">
          <a href="/products/unlisted" 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </a>
        </div>

        <header className="mb-12 text-center">
          {/* Icon Section */}
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <HandCoins className="w-8 h-8" />
            </div>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Sell Unlisted Shares
          </h1>

          {/* Gradient Divider Line */}
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

          {/* Subtitle / Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get competitive pricing and fast settlement for your unlisted shareholdings from our network of verified buyers
          </p>
        </header>

        {/* PROCESS STEPS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-[#2076C7]" />
            Selling Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#2076C7]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-full flex items-center justify-center text-sm font-bold">{step.num}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-[#2076C7] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading available shares...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center mb-8">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <p className="text-rose-600 mb-4">{error}</p>
            <button 
              onClick={fetchCompanies}
              className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* SEARCH & FILTERS SECTION */}
        {!loading && !error && companies.length > 0 && (
          <>
            <section className="mb-8">
              {/* Search Bar - Prominently at the top */}
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

              {/* Filter Row - Below Search */}
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 flex-1">
                  {/* Category Filter */}
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
                  
                  {/* Sort By Filter */}
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

                  {/* Results Count Badge */}
                  <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                    <span className="text-sm text-[#2076C7] font-semibold">
                      {filteredCompanies.length} companies
                    </span>
                  </div>
                </div>

                {/* Apply Filters Button */}
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

            {/* COMPANIES SECTION WITH SCROLLING */}
            <section className="mb-12">
              <div className="relative">
                {/* Scrollable Container */}
                <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map(company => {
                        const stats = companyStats.get(company.id);
                        return (
                          <div
                            key={company.id}
                            className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                              selectedCompany?.id === company.id ? 'border-[#2076C7] bg-blue-50' : 'border-transparent hover:border-gray-200'
                            }`}
                            onClick={() => handleSelectToSell(company)}
                          >
                            <div className="p-6">
                              <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm">
                                  {company.logo_url ? (
                                    <img src={company.logo_url} className="w-8 h-8 object-contain" alt={company.shares_name} />
                                  ) : (
                                    <Building className="w-6 h-6" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 truncate">{company.shares_name}</h3>
                                  <div className="text-sm text-gray-500">{company.clean_name || company.depository_applicable || 'Unlisted Share'}</div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-2xl font-bold text-green-600 mb-2">
                                  ₹{Number(company.price).toLocaleString()}
                                </div>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm text-gray-500">Min. Lot:</span>
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600">
                                    {company.min_lot_size} shares
                                  </span>
                                </div>
                                {stats && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Demand:</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDemandColor(stats.demand)}`}>
                                      {stats.demand}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Est. Premium
                                  </div>
                                  <div className="text-sm font-bold text-[#2076C7]">
                                    {stats?.premium ? `${stats.premium}%` : '—'}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <Package className="w-3 h-3" /> Volume (30d)
                                  </div>
                                  <div className="text-sm font-bold text-gray-900 truncate">
                                    {stats?.volume ? stats.volume.toLocaleString() : '—'}
                                  </div>
                                </div>
                              </div>

                              <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                                selectedCompany?.id === company.id 
                                  ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}>
                                {selectedCompany?.id === company.id ? <Check className="w-4 h-4" /> : <HandCoins className="w-4 h-4" />}
                                {selectedCompany?.id === company.id ? 'Selected' : 'Select to Sell'}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      /* Empty State */
                      <div className="col-span-full text-center py-20">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 max-w-lg mx-auto shadow-xl border border-gray-100">
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Companies Found</h3>
                          <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or filters</p>
                          <button 
                            onClick={clearFilters}
                            className="px-8 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Scroll indicator */}
                {filteredCompanies.length > 12 && (
                  <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none flex justify-center items-end pb-2">
                    <span className="text-xs text-gray-400 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                      Scroll for more ▼
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* SELL FORM / CALCULATOR */}
            <section className="mb-12">
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <ChartLine className="w-4 h-4 text-[#2076C7]" /> Number of Shares
                    </label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#2076C7] text-black font-bold"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold mb-2 text-gray-900">
                        ₹{calcResult.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Est. Price per Share</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold mb-2 text-gray-900">
                        ₹{calcResult.total.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Total Value</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold mb-2 text-[#2076C7]">
                        {calcResult.premium}%
                      </div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Estimated Premium</div>
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
                <HelpCircle className="w-6 h-6 text-[#2076C7]" /> Frequently Asked Questions
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

        {/* NO COMPANIES STATE */}
        {!loading && !error && companies.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Companies Available</h3>
            <p className="text-gray-600 mb-8 text-lg">There are no shares available for selling at the moment.</p>
            <button 
              onClick={fetchCompanies}
              className="px-8 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
            >
              Refresh
            </button>
          </div>
        )}
      </main>

      {/* Custom scrollbar styling */}
      <style jsx>{`
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