'use client';
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ALL_COMPANIES } from '../constants';
import { Company } from '../index';
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
  User,
  Filter,
} from 'lucide-react';

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
  // STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [qtyToSell, setQtyToSell] = useState('');
  const [calcResult, setCalcResult] = useState<{ price: number; total: number; premium: number } | null>(null);
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  // Modal States
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // NOTIFICATION HANDLER
  const showNotification = useCallback((message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(ALL_COMPANIES.map(c => c.category))).sort();
  }, []);

  // FILTERING LOGIC with debounced search
  const filteredCompanies = useMemo(() => {
    let filtered = [...ALL_COMPANIES];

    // Apply search
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }, [debouncedSearch, selectedCategory, sortBy]);

  // Handle Apply Filters
  const handleApplyFilters = () => {
    setDebouncedSearch(searchTerm);
    setShowFilters(false);
  };

  const handleSelectToSell = (company: Company) => {
    setSelectedCompany(company);
    setCalcResult(null);
    showNotification(`Selected ${company.name} for selling`);
  };

  const handleCalculate = () => {
    if (!selectedCompany || !qtyToSell) {
      showNotification('Please select a company and enter quantity');
      return;
    }
    const qty = parseInt(qtyToSell);
    const pricePerShare = Math.round(selectedCompany.price * 1.05);
    setCalcResult({
      price: pricePerShare,
      total: pricePerShare * qty,
      premium: 12.5
    });
    showNotification('Estimated value calculated successfully');
    setTimeout(() => document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth' }), 100);
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

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* NOTIFICATIONS */}
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        {notifications.map(n => (
          <div key={n.id} className="px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 bg-blue-100 text-blue-800 border border-blue-200 animate-in slide-in-from-right-5">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">{n.message}</span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-4 pt-4 md:pt-8">
        <div className="flex justify-start mb-8">
          <a href="/products/unlisted" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group">
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

        {/* SEARCH & FILTERS SECTION - NEW */}
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
                <option value="" className="text-gray-900">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat} className="text-gray-900">{cat}</option>)}
              </select>
              
              {/* Sort By Filter */}
              <select 
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all text-gray-900 min-w-[180px]" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name-asc" className="text-gray-900">Name: A to Z</option>
                <option value="name-desc" className="text-gray-900">Name: Z to A</option>
                <option value="price-high" className="text-gray-900">Price: High to Low</option>
                <option value="price-low" className="text-gray-900">Price: Low to High</option>
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

        {/* COMPANIES SECTION WITH SCROLLING - UPDATED */}
        <section className="mb-12">
          <div className="relative">
            {/* Scrollable Container */}
            <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map(company => (
                    <div
                      key={company.id}
                      className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${selectedCompany?.id === company.id ? 'border-[#2076C7] bg-blue-50' : 'border-transparent hover:border-gray-200'
                        }`}
                      onClick={() => handleSelectToSell(company)}
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                            {company.logo ? <img src={company.logo} className="w-8 h-8 object-contain" alt={company.name} /> : <Building />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate">{company.name}</h3>
                            <div className="text-sm text-gray-500">{company.category}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-2xl font-bold text-green-600 mb-2">₹{company.price.toLocaleString()}</div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-500">Buyer Demand:</span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">High</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Avg. Premium</div>
                            <div className="text-sm font-bold text-[#2076C7]">8.3%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Package className="w-3 h-3" /> Volume</div>
                            <div className="text-sm font-bold text-gray-900">18,500 shares</div>
                          </div>
                        </div>

                        <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${selectedCompany?.id === company.id ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}>
                          {selectedCompany?.id === company.id ? <Check className="w-4 h-4" /> : <HandCoins className="w-4 h-4" />}
                          {selectedCompany?.id === company.id ? 'Selected' : 'Select to Sell'}
                        </button>
                      </div>
                    </div>
                  ))
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
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Building className="w-4 h-4 text-[#2076C7]" /> Company Name</label>
                <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg font-bold text-gray-900">{selectedCompany?.name || "Select from above"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><ChartLine className="w-4 h-4 text-[#2076C7]" /> Number of Shares</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#2076C7] text-black font-bold"
                  value={qtyToSell}
                  onChange={(e) => setQtyToSell(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <button type="button" onClick={handleCalculate} className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3">
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
                  <div className="text-2xl font-bold mb-2 text-gray-900">₹{calcResult.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Estimated Price per Share</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold mb-2 text-gray-900">₹{calcResult.total.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Total Value</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold mb-2 text-[#2076C7]">{calcResult.premium}%</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Estimated Premium</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold mb-2 text-gray-900">7-10 days</div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Processing Time</div>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => setShowEnquiryModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-lg shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 mx-auto hover:scale-105 duration-200"
                >
                  <Send className="w-5 h-5" />
                  Submit Enquiry Form
                </button>
              </div>
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"><HelpCircle className="w-6 h-6 text-[#2076C7]" /> Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                <div className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all" onClick={() => toggleFaq(idx)}>
                  <h3 className="font-bold text-gray-900">{item.q}</h3>
                  {activeFaqs.includes(idx) ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
                {activeFaqs.includes(idx) && <div className="p-4 bg-white text-gray-600">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ENQUIRY MODAL */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Sell Enquiry</h3>
                <p className="text-xs text-white/80">{selectedCompany?.name} • {qtyToSell} Shares</p>
              </div>
              <button onClick={() => setShowEnquiryModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              setIsSubmitting(true); 
              setTimeout(() => { 
                setIsSubmitting(false); 
                setShowEnquiryModal(false); 
                setShowSuccess(true); 
                setCalcResult(null); 
                setSelectedCompany(null); 
                setQtyToSell(''); 
              }, 1500); 
            }} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    required 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#2076C7] text-sm text-black" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Email</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#2076C7] text-sm text-black" 
                    placeholder="john@email.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Phone</label>
                  <input 
                    required 
                    type="tel" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#2076C7] text-sm text-black" 
                    placeholder="+91..." 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Message (Optional)</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#2076C7] text-sm h-24 resize-none text-black" 
                  placeholder="Is your share in Demat or Physical form?"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-black text-lg hover:opacity-90 transition-all"
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[7000] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-3xl max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Enquiry Sent!</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Our relationship manager will contact you within 24 hours with the best available buyback price.</p>
            <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-black hover:opacity-90 transition-all">Back to Dashboard</button>
          </div>
        </div>
      )}

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