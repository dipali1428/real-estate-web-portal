'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Landmark,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Database,
  Star,
  Bookmark,
  CheckCircle,
  ShoppingCart,
  ChevronRight,
  X,
  Percent
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { bankData } from '../../../../products/FD/data/mockData';
import type { Bank } from '../../../../products/FD/data/mockData';

// ==================== TYPES ====================

interface FlattenedBank {
  id: number;
  name: string;
  logo: string;
  category: string;
  shortRate: string;
  shortSenior: string;
  mediumRate: string;
  mediumSenior: string;
  longRate: string;
  longSenior: string;
  megaRate: string;
  megaSenior: string;
  specialRate: string;
  bestRate: string;
  bestSeniorRate: string;
}

// ==================== HELPER FUNCTIONS ====================

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(row => row.startsWith('authToken='));
  return authCookie ? authCookie.split('=')[1] : null;
};

const getCompanyInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const getCategoryBadge = (category: string): { bg: string; text: string; short: string } => {
  switch (category) {
    case 'Public Sector Banks':
      return { bg: 'bg-blue-50', text: 'text-blue-700', short: 'PSB' };
    case 'Private Sector Banks':
      return { bg: 'bg-purple-50', text: 'text-purple-700', short: 'Private' };
    case 'Small Finance Banks':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', short: 'SFB' };
    case 'NBFCs':
      return { bg: 'bg-amber-50', text: 'text-amber-700', short: 'NBFC' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', short: category };
  }
};

const parseRate = (rateStr: string): number => {
  return parseFloat(rateStr.replace('%', '')) || 0;
};

const getBestRate = (bank: Bank): string => {
  const rates = [
    parseRate(bank.tenures.short.rate),
    parseRate(bank.tenures.medium.rate),
    parseRate(bank.tenures.long.rate),
    parseRate(bank.tenures.mega.rate),
  ];
  return Math.max(...rates).toFixed(2) + '%';
};

const getBestSeniorRate = (bank: Bank): string => {
  const rates = [
    parseRate(bank.tenures.short.senior),
    parseRate(bank.tenures.medium.senior),
    parseRate(bank.tenures.long.senior),
    parseRate(bank.tenures.mega.senior),
  ];
  return Math.max(...rates).toFixed(2) + '%';
};

// Flatten bankData from mockData.ts into a flat array
const flattenBankData = (): FlattenedBank[] => {
  let id = 1;
  const result: FlattenedBank[] = [];

  for (const categoryGroup of bankData) {
    for (const bank of categoryGroup.banks) {
      result.push({
        id: id++,
        name: bank.name,
        logo: bank.logo,
        category: categoryGroup.category,
        shortRate: bank.tenures.short.rate,
        shortSenior: bank.tenures.short.senior,
        mediumRate: bank.tenures.medium.rate,
        mediumSenior: bank.tenures.medium.senior,
        longRate: bank.tenures.long.rate,
        longSenior: bank.tenures.long.senior,
        megaRate: bank.tenures.mega.rate,
        megaSenior: bank.tenures.mega.senior,
        specialRate: bank.specialRate || '',
        bestRate: getBestRate(bank),
        bestSeniorRate: getBestSeniorRate(bank),
      });
    }
  }

  return result;
};

// ==================== FILTER OPTIONS ====================

const RATE_RANGES = [
  { label: 'All Rates', value: 'ALL' },
  { label: 'Above 8%', value: '8-100' },
  { label: '7% - 8%', value: '7-8' },
  { label: '6% - 7%', value: '6-7' },
  { label: 'Below 6%', value: '0-6' },
] as const;

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'Public Sector Banks', value: 'Public Sector Banks' },
  { label: 'Private Sector Banks', value: 'Private Sector Banks' },
  { label: 'Small Finance Banks', value: 'Small Finance Banks' },
  { label: 'NBFCs', value: 'NBFCs' },
] as const;

const SORT_OPTIONS = [
  { label: 'Best Rate: High to Low', value: 'rate-desc' },
  { label: 'Best Rate: Low to High', value: 'rate-asc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];
type RateRangeOption = typeof RATE_RANGES[number]['value'];
type CategoryOption = typeof CATEGORY_OPTIONS[number]['value'];

// ==================== MAIN COMPONENT ====================

export default function FDCompaniesPage() {
  const router = useRouter();

  // State
  const [companies, setCompanies] = useState<FlattenedBank[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<FlattenedBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rateRange, setRateRange] = useState<RateRangeOption>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<CategoryOption>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('rate-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ========== LOAD BOOKMARKS ==========
  useEffect(() => {
    const saved = localStorage.getItem('wishlistItems');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        const ids = new Set<number>(
          items.filter((i: any) => i.category === 'fixed-income').map((i: any) => i.id)
        );
        setBookmarkedIds(ids);
      } catch (e) {
        console.error('Error loading wishlist', e);
      }
    }
  }, []);

  const toggleBookmark = (company: FlattenedBank) => {
    const saved = localStorage.getItem('wishlistItems');
    let items: any[] = [];
    if (saved) {
      try { items = JSON.parse(saved); } catch (e) {}
    }

    const isBookmarked = bookmarkedIds.has(company.id);
    if (isBookmarked) {
      items = items.filter((i: any) => !(i.id === company.id && i.category === 'fixed-income'));
      setBookmarkedIds(prev => {
        const next = new Set(prev);
        next.delete(company.id);
        return next;
      });
    } else {
      const newItem = {
        id: company.id,
        category: 'fixed-income',
        name: company.name,
        logo: company.logo, // Wishlist component will handle image error rendering
        keyMetrics: {
          interestRate: parseRate(company.bestRate),
          tenure: 'Multiple Options',
          risk: 'Low',
          creditRating: company.category
        },
        addedDate: new Date().toISOString()
      };
      items.push(newItem);
      setBookmarkedIds(prev => new Set(prev).add(company.id));
      
      // Show toast
      setToastMessage('Added to saved funds');
      setTimeout(() => setToastMessage(null), 3000);
    }
    localStorage.setItem('wishlistItems', JSON.stringify(items));
  };

  // ========== LOAD COMPANIES ==========
  useEffect(() => {
    const token = getTokenFromCookie();

    if (!token) {
      router.push('/');
      return;
    }

    localStorage.setItem('token', token);

    // Load all FD companies from mockData
    const allCompanies = flattenBankData();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompanies(allCompanies);
    setFilteredCompanies(allCompanies);
    setLoading(false);
  }, [router]);

  // ========== APPLY FILTERS AND SEARCH ==========
  useEffect(() => {
    if (!companies.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredCompanies([]);
      return;
    }

    let filtered = [...companies];

    // Apply search
    if (searchTerm.trim()) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply rate range filter (based on best general rate)
    if (rateRange !== 'ALL') {
      const [min, max] = rateRange.split('-').map(Number);
      filtered = filtered.filter(company => {
        const rate = parseRate(company.bestRate);
        return rate >= min && rate <= max;
      });
    }

    // Apply category filter
    if (categoryFilter !== 'ALL') {
      filtered = filtered.filter(company => company.category === categoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const rateA = parseRate(a.bestRate);
      const rateB = parseRate(b.bestRate);

      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'rate-asc': return rateA - rateB;
        case 'rate-desc': return rateB - rateA;
        default: return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, rateRange, categoryFilter, sortBy]);

  // ========== HANDLE IMAGE ERRORS ==========
  const handleImageError = (companyId: number): void => {
    setImageErrors(prev => new Set(prev).add(companyId));
  };

  // ========== RENDER COMPANY LOGO ==========
  const renderCompanyLogo = (company: FlattenedBank) => {
    if (company.logo && !imageErrors.has(company.id)) {
      return (
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-contain"
            onError={() => handleImageError(company.id)}
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-bold text-sm flex-shrink-0">
        {getCompanyInitials(company.name)}
      </div>
    );
  };

  // ========== CLEAR FILTERS ==========
  const clearFilters = (e?: React.MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSearchTerm('');
    setRateRange('ALL');
    setCategoryFilter('ALL');
    setSortBy('rate-desc');
  };

  // ========== CALCULATE STATS ==========
  const totalCompanies = companies.length;

  const avgRate = companies.length > 0
    ? companies.reduce((sum, c) => sum + parseRate(c.bestRate), 0) / companies.length
    : 0;

  const maxRate = companies.length > 0
    ? Math.max(...companies.map(c => parseRate(c.bestRate)))
    : 0;

  const maxSeniorRate = companies.length > 0
    ? Math.max(...companies.map(c => parseRate(c.bestSeniorRate)))
    : 0;

  const activeFilterCount = [
    searchTerm ? 1 : 0,
    rateRange !== 'ALL' ? 1 : 0,
    categoryFilter !== 'ALL' ? 1 : 0,
    sortBy !== 'rate-desc' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">
            Loading FD companies...
          </p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 text-center border border-red-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Unable to Load Companies
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
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
    <div className="w-full">
      <main className="w-full">

        {/* Controls Row: Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
             <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                Explore FD Plans
                <span className="px-2 py-0.5 bg-blue-50 text-[#2076C7] text-[10px] font-black rounded-lg border border-blue-100 uppercase tracking-wider">
                  {totalCompanies} Available
                </span>
             </h3>
             <p className="text-xs text-gray-500 font-medium mt-0.5">Compare daily updated rates from across 33+ institutions</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:shadow-[0_0_0_4px_rgba(32,118,199,0.05)] transition-all"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all border ${showFilters
                    ? 'bg-[#2076C7] text-white border-[#2076C7] shadow-lg shadow-blue-500/20'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
              >
                <Filter size={18} />
                <span className="hidden xs:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${showFilters ? 'bg-white text-[#2076C7]' : 'bg-[#2076C7] text-white'}`}>
                    {activeFilterCount}
                  </span>
                )}
              </button>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Landmark size={16} className="text-[#2076C7]" />
              Total Companies
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalCompanies}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Percent size={16} className="text-emerald-600" />
              Avg. Best Rate
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {avgRate > 0 ? `${avgRate.toFixed(2)}%` : 'N/A'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp size={16} className="text-amber-600" />
              Highest General Rate
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {maxRate > 0 ? `${maxRate.toFixed(2)}%` : 'N/A'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Star size={16} className="text-purple-600" />
              Highest Senior Rate
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {maxSeniorRate > 0 ? `${maxSeniorRate.toFixed(2)}%` : 'N/A'}
            </p>
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
                type="button"
                onClick={(e) => clearFilters(e)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 group transition-colors"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform" />
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Interest Rate Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Best Rate
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={rateRange}
                  onChange={(e) => setRateRange(e.target.value as RateRangeOption)}
                >
                  {RATE_RANGES.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as CategoryOption)}
                >
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
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

        {/* Companies List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <div className="col-span-3">Company</div>
              <div className="col-span-1 text-center">Category</div>
              <div className="col-span-1 text-center">Short Term</div>
              <div className="col-span-1 text-center">Medium Term</div>
              <div className="col-span-1 text-center">Long Term</div>
              <div className="col-span-1 text-center">5Y+</div>
              <div className="col-span-1 text-right">Best Rate</div>
              <div className="col-span-3 text-center">Special Offer</div>
            </div>
          </div>

          {/* Company Rows */}
          <div className="divide-y divide-gray-200">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => {
                const catBadge = getCategoryBadge(company.category);

                return (
                  <div
                    key={company.id}
                    className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Desktop View */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      {/* Company */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          {renderCompanyLogo(company)}
                          <div>
                            <div className="font-semibold text-gray-900 text-sm leading-tight">
                              {company.name}
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="col-span-1 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium ${catBadge.bg} ${catBadge.text}`}>
                          {catBadge.short}
                        </span>
                      </div>

                      {/* Short Term Rate */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-semibold text-gray-800">{company.shortRate}</div>
                        <div className="text-[10px] text-emerald-600">{company.shortSenior}</div>
                      </div>

                      {/* Medium Term Rate */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-semibold text-gray-800">{company.mediumRate}</div>
                        <div className="text-[10px] text-emerald-600">{company.mediumSenior}</div>
                      </div>

                      {/* Long Term Rate */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-semibold text-gray-800">{company.longRate}</div>
                        <div className="text-[10px] text-emerald-600">{company.longSenior}</div>
                      </div>

                      {/* 5Y+ Rate */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-semibold text-gray-800">{company.megaRate}</div>
                        <div className="text-[10px] text-emerald-600">{company.megaSenior}</div>
                      </div>

                      {/* Best Rate */}
                      <div className="col-span-1 text-right">
                        <span className="font-bold text-[#2076C7] text-base">
                          {company.bestRate}
                        </span>
                      </div>

                      {/* Special Offer & Action */}
                      <div className="col-span-3 flex items-center justify-end gap-3 pr-2">
                        <div className="flex-1 text-center">
                          {company.specialRate ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-100">
                              <Star size={10} className="fill-amber-400 text-amber-400" />
                              {company.specialRate}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(company); }}
                          className={`p-2 rounded-full transition-all flex-shrink-0 ${bookmarkedIds.has(company.id) ? 'bg-blue-50 text-[#2076C7]' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                          title="Add to Wishlist"
                        >
                          <Bookmark size={18} className={bookmarkedIds.has(company.id) ? "fill-current" : ""} />
                        </button>
                      </div>
                    </div>

                    {/* Mobile / Tablet View */}
                    <div className="lg:hidden">
                      <div className="flex items-start gap-3 mb-3">
                        {renderCompanyLogo(company)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 text-sm truncate">
                              {company.name}
                            </span>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium ${catBadge.bg} ${catBadge.text}`}>
                              {catBadge.short}
                            </span>
                          </div>
                          {company.specialRate && (
                            <div className="flex items-center gap-1 text-xs text-amber-700">
                              <Star size={10} className="fill-amber-400 text-amber-400" />
                              <span className="truncate">{company.specialRate}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(company); }}
                          className={`p-2 -mt-1 -mr-1 rounded-full transition-all flex-shrink-0 ${bookmarkedIds.has(company.id) ? 'bg-blue-50 text-[#2076C7]' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                        >
                          <Bookmark size={20} className={bookmarkedIds.has(company.id) ? "fill-current" : ""} />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2 bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase font-medium">Short</p>
                          <p className="text-xs font-bold text-gray-800">{company.shortRate}</p>
                          <p className="text-[9px] text-emerald-600">{company.shortSenior}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase font-medium">Medium</p>
                          <p className="text-xs font-bold text-gray-800">{company.mediumRate}</p>
                          <p className="text-[9px] text-emerald-600">{company.mediumSenior}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase font-medium">Long</p>
                          <p className="text-xs font-bold text-gray-800">{company.longRate}</p>
                          <p className="text-[9px] text-emerald-600">{company.longSenior}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase font-medium">Best</p>
                          <p className="text-xs font-bold text-[#2076C7]">{company.bestRate}</p>
                          <p className="text-[9px] text-emerald-600">{company.bestSeniorRate}</p>
                        </div>
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
                  type="button"
                  onClick={(e) => clearFilters(e)}
                  className="text-[#2076C7] text-sm font-black hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className="bg-white border border-gray-100 text-gray-700 px-4 py-3 rounded-full shadow-sm flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={14} className="text-white" />
            </div>
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}



      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
