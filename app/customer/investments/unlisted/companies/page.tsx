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
  X,
  Bookmark, 
  BookmarkCheck,
  ShoppingCart,
  CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import customerService, { WishlistItem } from '../../../../services/customerService';

// ==================== TYPES ====================

interface Company {
  id: number;
  shares_name: string;
  logo_url: string | null;
  price: string;
  min_lot_size: number | null;
  depository_applicable: string | null;
}

interface DepositoryBadge {
  bg: string;
  text: string;
  label: string;
}

interface CartItem {
  id: number;
  name: string;
  type: string;
  amount: number;
  image?: string | null;
  min_lot_size?: number | null;
  price?: string;
}

// ==================== CONSTANTS ====================

const PRICE_RANGES = [
  { label: 'All Prices', value: 'ALL' },
  { label: 'Under ₹100', value: '0-100' },
  { label: '₹100 - ₹500', value: '100-500' },
  { label: '₹500 - ₹1000', value: '500-1000' },
  { label: '₹1000 - ₹5000', value: '1000-5000' },
  { label: 'Above ₹5000', value: '5000-1000000' },
] as const;

const SORT_OPTIONS = [
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Lot Size: Low to High', value: 'lot-asc' },
  { label: 'Lot Size: High to Low', value: 'lot-desc' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];
type PriceRangeOption = typeof PRICE_RANGES[number]['value'];

// ==================== HELPER FUNCTIONS ====================

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(row => row.startsWith('authToken='));
  return authCookie ? authCookie.split('=')[1] : null;
};

const removeTokenCookie = (): void => {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
};

const formatCurrency = (amount: string): string => {
  const num = parseFloat(amount);
  return `₹${num.toLocaleString('en-IN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

const formatMinLotSize = (minLotSize: number | null): string => {
  if (minLotSize === null || minLotSize === undefined) return 'N/A';
  return minLotSize.toLocaleString();
};

const getCompanyInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const getDepositoryBadge = (depository: string | null): DepositoryBadge => {
  if (!depository) {
    return { bg: 'bg-gray-50', text: 'text-gray-700', label: 'Not Specified' };
  }
  
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

const calculateMinInvestment = (price: string, minLotSize: number | null): number => {
  const priceNum = parseFloat(price);
  const lotSize = minLotSize || 0;
  return priceNum * lotSize;
};

// ==================== CART STORAGE FUNCTIONS ====================

const CART_STORAGE_KEY = 'unlisted_shares_cart';

const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

// ==================== MAIN COMPONENT ====================

export default function CompaniesPage() {
  const router = useRouter();
  
  // Company State
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  
  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRangeOption>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  
  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<Map<number, number>>(new Map());
  const [processingWishlist, setProcessingWishlist] = useState<Set<number>>(new Set());
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [processingCart, setProcessingCart] = useState<Set<number>>(new Set());

  // ========== CART FUNCTIONS ==========
  
  // Load cart from localStorage on mount
  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const isInCart = (companyId: number): boolean => {
    return cartItems.some(item => item.id === companyId);
  };

  const addToCart = (company: Company) => {
    setProcessingCart(prev => new Set(prev).add(company.id));
    
    const minInvestment = calculateMinInvestment(company.price, company.min_lot_size);
    
    const newCartItem: CartItem = {
      id: company.id,
      name: company.shares_name,
      type: 'unlisted_share',
      amount: minInvestment,
      image: company.logo_url,
      min_lot_size: company.min_lot_size,
      price: company.price
    };
    
    setCartItems(prev => {
      // Check if already exists
      if (prev.some(item => item.id === company.id)) {
        return prev;
      }
      return [...prev, newCartItem];
    });
    
    toast.success(`${company.shares_name} added to cart`);
    
    setProcessingCart(prev => {
      const newSet = new Set(prev);
      newSet.delete(company.id);
      return newSet;
    });
  };

  const removeFromCart = (companyId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== companyId));
    const company = companies.find(c => c.id === companyId);
    if (company) {
      toast.success(`${company.shares_name} removed from cart`);
    }
  };

  // ========== FETCH WISHLIST ==========
  const fetchWishlist = async () => {
    try {
      const response = await customerService.getMyWishlist();
      if (response.success && response.data && Array.isArray(response.data)) {
        const wishlistMap = new Map();
        response.data.forEach((item: WishlistItem) => {
          if (item.product_type === 'unlisted_share') {
            wishlistMap.set(item.product_id, item.id);
          }
        });
        setWishlistItems(wishlistMap);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  // ========== FETCH COMPANIES ==========
  const fetchCompanies = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    
    try {
      const token = getTokenFromCookie();
      if (!token) {
        router.push('/');
        return;
      }

      localStorage.setItem('token', token);
      
      const response = await customerService.getAllCompanies();
      
      let companiesData: Company[] = [];
      if (response?.data && Array.isArray(response.data)) {
        companiesData = response.data;
      } else if (Array.isArray(response)) {
        companiesData = response;
      } else if (response?.success && response?.data) {
        companiesData = response.data;
      } else {
        throw new Error('Invalid data format received from server');
      }
      
      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      
      await fetchWishlist();
      
    } catch (err: any) {
      if (err.response?.status === 401) {
        removeTokenCookie();
        localStorage.removeItem('token');
        router.push('/');
        return;
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please check server configuration.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Server is taking too long to respond.');
      } else if (err.message?.includes('Network Error')) {
        setError('Network error. Please check your internet connection.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to load companies. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ========== WISHLIST HANDLERS ==========
  const handleAddToWishlist = async (company: Company) => {
    setProcessingWishlist(prev => new Set(prev).add(company.id));
    
    try {
      const response = await customerService.addToWishlist({
        product_type: 'unlisted_share',
        product_id: company.id,
        product_name: company.shares_name
      });
      
      if (response.success && response.data) {
        const wishlistItem = response.data as WishlistItem;
        setWishlistItems(prev => new Map(prev).set(company.id, wishlistItem.id));
        toast.success(`${company.shares_name} saved to wishlist`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save company');
    } finally {
      setProcessingWishlist(prev => {
        const newSet = new Set(prev);
        newSet.delete(company.id);
        return newSet;
      });
    }
  };

  const handleRemoveFromWishlist = async (company: Company) => {
    const wishlistId = wishlistItems.get(company.id);
    if (!wishlistId) return;
    
    setProcessingWishlist(prev => new Set(prev).add(company.id));
    
    try {
      const response = await customerService.removeFromWishlist(wishlistId);
      
      if (response.success) {
        setWishlistItems(prev => {
          const newMap = new Map(prev);
          newMap.delete(company.id);
          return newMap;
        });
        toast.success(`${company.shares_name} removed from wishlist`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
    } finally {
      setProcessingWishlist(prev => {
        const newSet = new Set(prev);
        newSet.delete(company.id);
        return newSet;
      });
    }
  };

  // ========== CART HANDLER ==========
  const handleCartAction = (company: Company) => {
    if (isInCart(company.id)) {
      removeFromCart(company.id);
    } else {
      addToCart(company);
    }
  };

  // ========== FILTERS AND SEARCH ==========
  useEffect(() => {
    if (!companies.length) {
      setFilteredCompanies([]);
      return;
    }
    
    let filtered = [...companies];
    
    if (searchTerm.trim()) {
      filtered = filtered.filter(company =>
        company.shares_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (priceRange !== 'ALL') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(company => {
        const price = parseFloat(company.price);
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }
    
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      const lotA = a.min_lot_size || 0;
      const lotB = b.min_lot_size || 0;
      
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
          return lotA - lotB;
        case 'lot-desc':
          return lotB - lotA;
        default:
          return 0;
      }
    });
    
    setFilteredCompanies(filtered);
  }, [companies, searchTerm, priceRange, sortBy]);

  // ========== INITIAL FETCH ==========
  useEffect(() => {
    fetchCompanies();
    
    const interval = setInterval(() => {
      fetchCompanies(false);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [router, retryCount]);

  // ========== HANDLERS ==========
  const handleImageError = (companyId: number): void => {
    setImageErrors(prev => new Set(prev).add(companyId));
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setPriceRange('ALL');
    setSortBy('name-asc');
    toast.success('Filters cleared');
  };

  const handleRetry = (): void => {
    setRetryCount(prev => prev + 1);
    fetchCompanies();
    toast.loading('Retrying...');
  };

  // ========== RENDER FUNCTIONS ==========
  const renderCompanyLogo = (company: Company) => {
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
    
    return (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-bold text-sm flex-shrink-0">
        {getCompanyInitials(company.shares_name)}
      </div>
    );
  };

  // ========== COMPUTED VALUES ==========
  const totalCompanies = companies.length;
  const avgPrice = companies.length > 0
    ? companies.reduce((sum, c) => sum + parseFloat(c.price), 0) / companies.length
    : 0;
  const minPrice = companies.length > 0
    ? Math.min(...companies.map(c => parseFloat(c.price)))
    : 0;
  const maxPrice = companies.length > 0
    ? Math.max(...companies.map(c => parseFloat(c.price)))
    : 0;
  const activeFilterCount = [
    searchTerm ? 1 : 0,
    priceRange !== 'ALL' ? 1 : 0,
    sortBy !== 'name-asc' ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  const wishlistCount = wishlistItems.size;
  const cartCount = cartItems.length;

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
          <p className="text-gray-600 font-medium mt-6 animate-pulse">
            Loading available companies...
          </p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Unable to Load Companies
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={handleRetry}
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
                  <h1 className="text-xl font-black text-gray-900">
                    Unlisted Companies
                  </h1>
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
              {/* Wishlist Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
                <Bookmark size={16} className={wishlistCount > 0 ? 'fill-[#2076C7] text-[#2076C7]' : ''} />
                <span>Saved</span>
                {wishlistCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-[#2076C7] text-white text-xs rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>

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
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-white text-[#2076C7] rounded-full text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <p className="text-2xl font-bold text-gray-900">
              {avgPrice > 0 ? formatCurrency(avgPrice.toFixed(2)) : 'N/A'}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp size={16} className="text-amber-600" />
              Price Range
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {minPrice > 0 ? formatCurrency(minPrice.toFixed(2)) : 'N/A'} - {maxPrice > 0 ? formatCurrency(maxPrice.toFixed(2)) : 'N/A'}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <ShoppingCart size={16} className="text-blue-500" />
              Cart Items
            </div>
            <p className="text-2xl font-bold text-gray-900">{cartCount}</p>
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Price Range
                </label>
                <select 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as PriceRangeOption)}
                >
                  {PRICE_RANGES.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              
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
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
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
          {/* Table Header - Hidden on mobile */}
          <div className="hidden md:block bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <div className="col-span-4">Company</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Min. Lot</div>
              <div className="col-span-2 text-right">Min Investment</div>
              <div className="col-span-1 text-center">Depository</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
          </div>

          {/* Company Rows */}
          <div className="divide-y divide-gray-200">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => {
                const minInvestment = calculateMinInvestment(company.price, company.min_lot_size);
                const depository = getDepositoryBadge(company.depository_applicable);
                const isSaved = wishlistItems.has(company.id);
                const isProcessing = processingWishlist.has(company.id);
                const inCart = isInCart(company.id);
                const isAddingToCart = processingCart.has(company.id);
                
                return (
                  <div key={company.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors group">
                    {/* Desktop View */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      {/* Company Column */}
                      <div className="col-span-4">
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
                        <span className="font-bold text-[#2076C7]">
                          {formatCurrency(company.price)}
                        </span>
                      </div>
                      
                      {/* Min Lot */}
                      <div className="col-span-2 text-right">
                        <span className="font-medium text-gray-900">
                          {formatMinLotSize(company.min_lot_size)}
                        </span>
                      </div>
                      
                      {/* Min Investment */}
                      <div className="col-span-2 text-right">
                        <span className="font-medium text-gray-900">
                          {minInvestment > 0 ? formatCurrency(minInvestment.toFixed(2)) : 'N/A'}
                        </span>
                      </div>
                      
                      {/* Depository */}
                      <div className="col-span-1 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium ${depository.bg} ${depository.text}`}>
                          <Shield size={10} />
                          {depository.label === 'NSDL & CDSL' ? 'Both' : depository.label}
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => isSaved ? handleRemoveFromWishlist(company) : handleAddToWishlist(company)}
                            disabled={isProcessing}
                            className={`p-2 rounded-lg transition-all ${
                              isSaved
                                ? 'bg-[#2076C7] text-white hover:bg-[#1a5fa0]'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-600 group-hover:bg-gray-200'
                            }`}
                            title={isSaved ? 'Remove from saved' : 'Save company'}
                          >
                            {isProcessing ? (
                              <RefreshCw size={18} className="animate-spin" />
                            ) : isSaved ? (
                              <BookmarkCheck size={18} className="fill-white" />
                            ) : (
                              <Bookmark size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => handleCartAction(company)}
                            disabled={isAddingToCart}
                            className={`p-2 rounded-lg transition-all ${
                              inCart
                                ? 'bg-[#2076C7] text-white cursor-default'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-600'
                            }`}
                            title={inCart ? 'Remove from cart' : 'Add to cart'}
                          >
                            {isAddingToCart ? (
                              <RefreshCw size={18} className="animate-spin" />
                            ) : inCart ? (
                              <CheckCircle size={18} />
                            ) : (
                              <ShoppingCart size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden">
                      <div className="flex items-start gap-3">
                        {renderCompanyLogo(company)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm">
                                {company.shares_name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">ID: {company.id}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button
                                onClick={() => isSaved ? handleRemoveFromWishlist(company) : handleAddToWishlist(company)}
                                disabled={isProcessing}
                                className={`p-2 rounded-lg transition-all ${
                                  isSaved
                                    ? 'bg-[#2076C7] text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {isProcessing ? (
                                  <RefreshCw size={16} className="animate-spin" />
                                ) : isSaved ? (
                                  <BookmarkCheck size={16} className="fill-white" />
                                ) : (
                                  <Bookmark size={16} />
                                )}
                              </button>
                              <button
                                onClick={() => handleCartAction(company)}
                                disabled={isAddingToCart}
                                className={`p-2 rounded-lg transition-all ${
                                  inCart
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {isAddingToCart ? (
                                  <RefreshCw size={16} className="animate-spin" />
                                ) : inCart ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  <ShoppingCart size={16} />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500">Price</p>
                              <p className="text-base font-bold text-[#2076C7] mt-0.5">
                                {formatCurrency(company.price)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Min. Lot</p>
                              <p className="text-sm font-medium text-gray-900 mt-0.5">
                                {formatMinLotSize(company.min_lot_size)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Min. Investment</p>
                              <p className="text-sm font-medium text-gray-900 mt-0.5">
                                {minInvestment > 0 ? formatCurrency(minInvestment.toFixed(2)) : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Depository</p>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium mt-1 ${depository.bg} ${depository.text}`}>
                                <Shield size={10} />
                                {depository.label === 'NSDL & CDSL' ? 'Both' : depository.label}
                              </span>
                            </div>
                          </div>
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
                {companies.length === 0 ? (
                  <button onClick={handleRetry} className="text-[#2076C7] text-sm font-semibold hover:underline flex items-center gap-1 mx-auto">
                    <RefreshCw size={14} />
                    Refresh data
                  </button>
                ) : (
                  <button onClick={clearFilters} className="text-[#2076C7] text-sm font-semibold hover:underline">
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .grid-cols-1.sm\:grid-cols-2 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}