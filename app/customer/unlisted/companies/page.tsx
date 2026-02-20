'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Building2,
  IndianRupee,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Database,
  Clock,
  Shield,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import customerService from '../../../services/customerService';

// ==================== TYPES ====================

interface Company {
  id: number;
  shares_name: string;
  logo_url: string;
  price: string;
  min_lot_size: number;
  depository_applicable: string;
}

// ==================== HELPER FUNCTIONS ====================

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(row => row.startsWith('authToken='));
  return authCookie ? authCookie.split('=')[1] : null;
};

const removeTokenCookie = () => {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
};

// ==================== MAIN COMPONENT ====================

export default function UserDashboard() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  // ===== NEW STATE =====
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // ========== FETCH COMPANIES ==========
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getTokenFromCookie();
        
        if (!token) {
          router.push('/');
          return;
        }

        localStorage.setItem('token', token);
        
        // Fetch all companies from your API
        const response = await customerService.getAllCompanies();
        
        if (response.success) {
          setCompanies(response.data);
          setFilteredCompanies(response.data);
          setLastUpdated(new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
        } else {
          setError('Failed to load companies');
        }
      } catch (err: any) {
        console.error('Companies fetch error:', err);
        
        if (err.response?.status === 401) {
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(err.response?.data?.message || 'Failed to load companies');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
    
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchCompanies, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ========== APPLY FILTERS AND SEARCH ==========
  useEffect(() => {
    let filtered = [...companies];
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.shares_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range filter
    if (priceRange !== 'ALL') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(company => {
        const price = parseFloat(company.price);
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      
      switch (sortBy) {
        case 'name-asc':
          return a.shares_name.localeCompare(b.shares_name);
        case 'name-desc':
          return b.shares_name.localeCompare(a.shares_name);
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'lot-asc':
          return a.min_lot_size - b.min_lot_size;
        case 'lot-desc':
          return b.min_lot_size - a.min_lot_size;
        default:
          return 0;
      }
    });
    
    setFilteredCompanies(filtered);
  }, [companies, searchTerm, priceRange, sortBy]);

  // ===== NEW FUNCTION: Handle image errors =====
  const handleImageError = (companyId: number) => {
    setImageErrors(prev => new Set(prev).add(companyId));
  };

  // ========== CLEAR FILTERS ==========
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange('ALL');
    setSortBy('name-asc');
  };

  // ========== FORMATTERS ==========
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ========== GET COMPANY INITIALS ==========
  const getCompanyInitials = (name: string) => {
    return name.split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // ===== NEW FUNCTION: Render logo with fallback =====
  const renderCompanyLogo = (company: Company) => {
    // Show image if logo_url exists and no error
    if (company.logo_url && !imageErrors.has(company.id)) {
      return (
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
          <img
            src={company.logo_url}
            alt={company.shares_name}
            className="w-full h-full object-contain"
            onError={() => handleImageError(company.id)}
            loading="lazy"
          />
        </div>
      );
    }
    
    // Fallback to initials
    return (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-bold text-sm flex-shrink-0">
        {getCompanyInitials(company.shares_name)}
      </div>
    );
  };

  // ========== GET DEPOSITORY BADGE ==========
  const getDepositoryBadge = (depository: string) => {
    // Clean up the depository string (remove &amp; and extra spaces)
    const cleanDepository = depository.replace(/&amp;/g, '&').trim();
    
    if (cleanDepository.includes('NSDL') && cleanDepository.includes('CDSL')) {
      return { bg: 'bg-purple-50', text: 'text-purple-700', label: 'NSDL & CDSL' };
    } else if (cleanDepository.includes('NSDL')) {
      return { bg: 'bg-blue-50', text: 'text-blue-700', label: 'NSDL' };
    } else if (cleanDepository.includes('CDSL')) {
      return { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'CDSL' };
    } else {
      return { bg: 'bg-gray-50', text: 'text-gray-700', label: cleanDepository };
    }
  };

  // ========== CALCULATE STATS ==========
  const totalCompanies = companies.length;
  const avgPrice = companies.reduce((sum, c) => sum + parseFloat(c.price), 0) / companies.length;
  const minPrice = Math.min(...companies.map(c => parseFloat(c.price)));
  const maxPrice = Math.max(...companies.map(c => parseFloat(c.price)));

  // ========== PRICE RANGES ==========
  const priceRanges = [
    { label: 'All Prices', value: 'ALL' },
    { label: 'Under ₹100', value: '0-100' },
    { label: '₹100 - ₹500', value: '100-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹5000', value: '1000-5000' },
    { label: 'Above ₹5000', value: '5000-1000000' },
  ];

  // ========== SORT OPTIONS ==========
  const sortOptions = [
    { label: 'Name: A to Z', value: 'name-asc' },
    { label: 'Name: Z to A', value: 'name-desc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Lot Size: Low to High', value: 'lot-asc' },
    { label: 'Lot Size: High to Low', value: 'lot-desc' },
  ];

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">Loading available companies...</p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-red-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Companies</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                U
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-gray-900">Unlisted Companies</h1>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                    {totalCompanies} Companies
                  </span>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Database size={12} className="text-[#2076C7]" />
                  Browse and invest in pre-IPO opportunities
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                />
              </div>
              
              {/* Filter Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                  showFilters 
                    ? 'bg-[#2076C7] text-white border-[#2076C7]' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter size={18} />
                Filters
                {(searchTerm || priceRange !== 'ALL' || sortBy !== 'name-asc') && (
                  <span className="w-5 h-5 bg-white text-[#2076C7] rounded-full text-xs flex items-center justify-center font-bold">
                    {[
                      searchTerm ? 1 : 0,
                      priceRange !== 'ALL' ? 1 : 0,
                      sortBy !== 'name-asc' ? 1 : 0
                    ].reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Building2 size={16} className="text-[#2076C7]" />
              Total Companies
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalCompanies}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <IndianRupee size={16} className="text-emerald-600" />
              Avg. Price
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgPrice.toFixed(2))}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp size={16} className="text-amber-600" />
              Price Range
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(minPrice.toFixed(2))} - {formatCurrency(maxPrice.toFixed(2))}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Clock size={16} className="text-purple-600" />
              Last Updated
            </div>
            <p className="text-lg font-bold text-gray-900">{lastUpdated?.split(' ')[0] || 'Now'}</p>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#2076C7]" />
                Filter Companies
              </h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <X size={16} />
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Price Range Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Price Range
                </label>
                <select 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={{ color: 'black' }}
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value} className="text-gray-900 bg-white" style={{ color: 'black', background: 'white' }}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Sort By
                </label>
                <select 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ color: 'black' }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} className="text-gray-900 bg-white" style={{ color: 'black', background: 'white' }}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Results Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Showing</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredCompanies.length}</p>
                  <p className="text-xs text-gray-500">of {totalCompanies} companies</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Database className="w-6 h-6 text-[#2076C7]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companies List - Single Column */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <div className="col-span-5">Company</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Min. Lot</div>
              <div className="col-span-2 text-right">Min Investment</div>
              <div className="col-span-1 text-center">Depository</div>
            </div>
          </div>

          {/* Company Rows */}
          <div className="divide-y divide-gray-200">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => {
                const price = parseFloat(company.price);
                const minInvestment = price * company.min_lot_size;
                const depository = getDepositoryBadge(company.depository_applicable);
                
                return (
                  <div key={company.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Company Column with Logo or Initials - CHANGED */}
                      <div className="col-span-5">
                        <div className="flex items-center gap-3">
                          {renderCompanyLogo(company)}
                          <div>
                            <div className="font-semibold text-gray-900 text-sm leading-tight">
                              {company.shares_name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Database size={10} />
                              ID: {company.id}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-right">
                        <span className="font-bold text-[#2076C7]">{formatCurrency(company.price)}</span>
                      </div>
                      
                      {/* Min Lot */}
                      <div className="col-span-2 text-right">
                        <span className="font-medium text-gray-900">{company.min_lot_size.toLocaleString()}</span>
                      </div>
                      
                      {/* Min Investment */}
                      <div className="col-span-2 text-right">
                        <span className="font-medium text-gray-900">{formatCurrency(minInvestment.toFixed(2))}</span>
                      </div>
                      
                      {/* Depository */}
                      <div className="col-span-1 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium ${depository.bg} ${depository.text}`}>
                          <Shield size={10} />
                          {depository.label === 'NSDL & CDSL' ? 'Both' : depository.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="px-6 py-12 text-center">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No companies found</p>
                <button
                  onClick={clearFilters}
                  className="text-[#2076C7] text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <RefreshCw size={12} className="animate-spin-slow" />
            <span>Auto-updates every 60 seconds</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <Clock size={12} />
            <span>Last updated: {lastUpdated || 'Just now'}</span>
          </div>
        </div>
      </main>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}