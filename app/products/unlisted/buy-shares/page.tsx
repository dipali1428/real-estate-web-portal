'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { ALL_COMPANIES } from '../constants';
import { Company } from '../index';
import {
  ArrowLeft, Search, Filter, List, CheckCircle, Package,
  Database, TrendingUp, X, Mail, Phone, User,
  MessageSquare, ShoppingCart, DollarSign, ChevronLeft, ChevronRight
} from 'lucide-react';

const BuyShares: React.FC = () => {
  // STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // MODAL STATES
  const [detailCompany, setDetailCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'news'>('overview');
  const [enquiryCompany, setEnquiryCompany] = useState<Company | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: '5000',
    message: ''
  });

  // PREVENT SCROLL ON MODAL OPEN
  useEffect(() => {
    if (detailCompany || enquiryCompany || showSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [detailCompany, enquiryCompany, showSuccess]);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // FILTERING LOGIC
  const filteredCompanies = useMemo(() => {
    let result = [...ALL_COMPANIES];

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter(c => c.category === selectedCategory);
    }

    switch (sortBy) {
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
    }

    return result;
  }, [debouncedSearch, selectedCategory, sortBy]);

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedItems = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageRange = () => {
    const range = [];
    const maxVisible = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  // HANDLERS
  const handleOpenEnquiry = (company: Company) => {
    setEnquiryCompany(company);
    setFormData(prev => ({ ...prev, quantity: '5000' }));
  };

  const categories = Array.from(new Set(ALL_COMPANIES.map(c => c.category))).sort();

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <main className="container mx-auto px-4 py-8">

        {/* TOP BACK BUTTON */}
        <div className="flex justify-start mb-8">
          <a
            href="/products/unlisted"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </a>
        </div>

        {/* PAGE HEADER */}
        <header className="mb-12 text-center">
          {/* Icon Section */}
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <ShoppingCart className="w-8 h-8" />
            </div>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Buy Unlisted Shares
          </h1>

          {/* Gradient Divider Line */}
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

          {/* Subtitle / Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Browse and purchase unlisted shares from 150+ companies with transparent pricing and secure transactions
          </p>
        </header>

        {/* SEARCH & FILTERS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/20"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#2076C7]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#2076C7]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name-asc">Name: A to Z</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setCurrentPage(1)}
                className="px-8 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Filter className="w-5 h-5" /> Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* COMPANIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedItems.map(company => (
            <div
              key={company.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center">
                  {company.logo ? (
                    <img src={company.logo} className="w-12 h-12 object-contain" alt={company.name} />
                  ) : (
                    <span className="text-2xl font-bold text-[#2076C7]">{company.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{company.name}</h3>
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                    {company.category}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-2xl font-bold text-green-600 mb-2">₹{company.price.toLocaleString('en-IN')}</div>
                <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                  +1.25% Today
                </span>
              </div>

              {/* REQUESTED CARD STATS */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                    <Package className="w-3 h-3" /> Lot Size
                  </div>
                  <div className="text-sm font-bold text-gray-900">5,000 shares</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Min. Invest
                  </div>
                  <div className="text-sm font-bold text-gray-900">₹2,60,000</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                    <Database className="w-3 h-3" /> Depository
                  </div>
                  <div className="text-sm font-bold text-gray-900">NSDL & CDSL</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Available
                  </div>
                  <div className="text-sm font-bold text-gray-900">120,000</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenEnquiry(company)}
                  className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Enquire Now
                </button>
                <button
                  onClick={() => setDetailCompany(company)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION - LIGHT THEME 1, 2, 3 + NEXT */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center space-y-4 pt-8 mb-12">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              {getPageRange().map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all border ${currentPage === page
                    ? 'bg-[#2476c4] text-white shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 h-10 flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-300 text-black font-bold text-sm hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ENQUIRY MODAL */}
      {enquiryCompany && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl my-8">
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-5 text-white rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Enquire for Shares</h2>
                <p className="text-xs opacity-90 mt-1">{enquiryCompany.name}</p>
              </div>
              <button onClick={() => setEnquiryCompany(null)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form
              className="p-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setTimeout(() => { setIsSubmitting(false); setEnquiryCompany(null); setShowSuccess(true); }, 1500);
              }}
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input required type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-black outline-none" placeholder="John Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                  <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-black outline-none" placeholder="john@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-black outline-none" placeholder="+91..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Quantity *</label>
                <input type="number" defaultValue={5000} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-black outline-none" />
              </div>
              <button disabled={isSubmitting} className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-lg hover:opacity-90">
                {isSubmitting ? 'Submitting...' : 'Confirm Interest'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[4000] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-10 text-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h2>
            <p className="text-gray-600 mb-8 text-sm">Our relationship manager will contact you with the latest quotes and procedure.</p>
            <button onClick={() => setShowSuccess(false)} className="w-full py-3 bg-black text-white rounded-lg font-bold">Back to Marketplace</button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailCompany && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl my-8">
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold truncate">{detailCompany.name}</h2>
              <button onClick={() => setDetailCompany(null)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full"><X size={24} /></button>
            </div>
            <div className="p-8">
              <div className="flex items-start gap-8 mb-8">
                <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center">
                  {detailCompany.logo ? <img src={detailCompany.logo} className="w-12 h-12 object-contain" /> : <span className="text-3xl font-bold text-[#2076C7]">{detailCompany.name.charAt(0)}</span>}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">{detailCompany.category}</div>
                  <div className="text-4xl font-bold text-green-600 mb-3">₹{detailCompany.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-6 border-b mb-8">
                {['overview', 'financials', 'news'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab as any)} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}>{tab}</button>
                ))}
              </div>
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2"><span>Min. Lot Size</span><span className="font-bold">5,000 shares</span></div>
                    <div className="flex justify-between border-b pb-2"><span>Depository</span><span className="font-bold">NSDL & CDSL</span></div>
                    <div className="flex justify-between border-b pb-2"><span>Min. Invest</span><span className="font-bold text-[#2076C7]">₹2,60,000</span></div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600 leading-relaxed">
                    High-growth opportunity in the unlisted sector. Full research data and institutional quotes available upon enquiry.
                  </div>
                </div>
              )}
              {activeTab !== 'overview' && <div className="py-20 text-center text-gray-400 italic font-medium">Detailed {activeTab} data protected. Enquire to receive info pack.</div>}
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setDetailCompany(null)} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-bold">Close</button>
              <button onClick={() => handleOpenEnquiry(detailCompany)} className="px-8 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold">Enquire Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyShares;