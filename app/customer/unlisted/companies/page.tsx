'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Building2,  TrendingUp, X, Bookmark, BookmarkCheck, ShoppingCart, CheckCircle} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchDashboardData } from '../../../services/unlistedservices';
import toast from 'react-hot-toast';
import customerService, { WishlistItem } from '../../../services/customerService';
import { motion } from 'framer-motion';

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
  
  const [graphData, setGraphData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [isGraphLoading, setIsGraphLoading] = useState(true);
  const [graphError, setGraphError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRangeOption>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [wishlistItems, setWishlistItems] = useState<Map<number, number>>(new Map());
  const [processingWishlist, setProcessingWishlist] = useState<Set<number>>(new Set());
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [processingCart, setProcessingCart] = useState<Set<number>>(new Set());

  const currentIndex = useMemo(() => {
    if (graphData.length === 0) return "0.00";
    return parseFloat(graphData[graphData.length - 1].market_price).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [graphData]);

  const todayChange = useMemo(() => {
    if (graphData.length < 2) return "0.00";
    const latest = parseFloat(graphData[graphData.length - 1].market_price);
    const prev = parseFloat(graphData[graphData.length - 2].market_price);
    return (((latest - prev) / prev) * 100).toFixed(2);
  }, [graphData]);

  useEffect(() => {
    const fetchIndexData = async () => {
      setIsGraphLoading(true);
      try {
        const response = await fetchDashboardData();
        if (response && response.success && response.graph) {
          setGraphData(response.graph);
          if (response.summary) setSummary(response.summary);
        }
      } catch (error: any) {} finally { setIsGraphLoading(false); }
    };
    fetchIndexData();
  }, []);

  useEffect(() => { setCartItems(getCartFromStorage()); }, []);
  useEffect(() => { saveCartToStorage(cartItems); }, [cartItems]);

  const isInCart = (companyId: number): boolean => cartItems.some(item => item.id === companyId);

  const addToCart = (company: Company) => {
    setProcessingCart(prev => new Set(prev).add(company.id));
    const minInvestment = calculateMinInvestment(company.price, company.min_lot_size);
    const newCartItem: CartItem = {
      id: company.id, name: company.shares_name, type: 'unlisted_share', amount: minInvestment,
      image: company.logo_url, min_lot_size: company.min_lot_size, price: company.price
    };
    setCartItems(prev => prev.some(item => item.id === company.id) ? prev : [...prev, newCartItem]);
    toast.success(`${company.shares_name} added to cart`);
    setProcessingCart(prev => { const newSet = new Set(prev); newSet.delete(company.id); return newSet; });
  };

  const removeFromCart = (companyId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== companyId));
    const company = companies.find(c => c.id === companyId);
    if (company) toast.success(`${company.shares_name} removed from cart`);
  };

  const fetchWishlist = async () => {
    try {
      const response = await customerService.getMyWishlist();
      if (response.success && response.data && Array.isArray(response.data)) {
        const wishlistMap = new Map();
        response.data.forEach((item: WishlistItem) => {
          if (item.product_type === 'unlisted_share') wishlistMap.set(item.product_id, item.id);
        });
        setWishlistItems(wishlistMap);
      }
    } catch (error) {}
  };

  const fetchCompanies = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const token = getTokenFromCookie();
      if (!token) { router.push('/'); return; }
      const response = await customerService.getAllCompanies();
      const companiesData = response?.data || response || [];
      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
      await fetchWishlist();
    } catch (err: any) {
      if (err.response?.status === 401) { removeTokenCookie(); router.push('/'); }
    } finally { setLoading(false); }
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
      
      if (response?.success && response?.data) {
        const data = response.data;
        const item = Array.isArray(data) ? data[0] : data;
        
        if (item && 'id' in item) {
          setWishlistItems(prev => new Map(prev).set(company.id, item.id));
          toast.success(`${company.shares_name} saved to wishlist`);
        }
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
      
      if (response?.success) {
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

  const handleCartAction = (company: Company) => {
    if (isInCart(company.id)) removeFromCart(company.id);
    else addToCart(company);
  };

  useEffect(() => {
    let filtered = [...companies];
    if (searchTerm.trim()) filtered = filtered.filter(c => c.shares_name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (priceRange !== 'ALL') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(c => {
        const p = parseFloat(c.price);
        return max ? (p >= min && p <= max) : p >= min;
      });
    }
    filtered.sort((a, b) => {
      if (sortBy === 'name-asc') return a.shares_name.localeCompare(b.shares_name);
      if (sortBy === 'name-desc') return b.shares_name.localeCompare(a.shares_name);
      const priceA = parseFloat(a.price); const priceB = parseFloat(b.price);
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      return 0;
    });
    setFilteredCompanies(filtered);
  }, [companies, searchTerm, priceRange, sortBy]);

  useEffect(() => { fetchCompanies(); }, []);

  const handleImageError = (companyId: number) => setImageErrors(prev => new Set(prev).add(companyId));
  const clearFilters = () => { setSearchTerm(''); setPriceRange('ALL'); setSortBy('name-asc'); };
  const handleRetry = () => fetchCompanies();

  const renderCompanyLogo = (company: Company) => {
    if (company.logo_url && !imageErrors.has(company.id)) {
      return (
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
          <img src={company.logo_url} alt={company.shares_name} className="w-full h-full object-contain" onError={() => handleImageError(company.id)} loading="lazy" />
        </div>
      );
    }
    return <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2076C7] font-bold text-xs">{getCompanyInitials(company.shares_name)}</div>;
  };

  const minPrice = companies.length > 0 ? Math.min(...companies.map(c => parseFloat(c.price))) : 0;
  const maxPrice = companies.length > 0 ? Math.max(...companies.map(c => parseFloat(c.price))) : 0;

  if (loading) return <div className="w-full py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full">
      
      {/* 1. Market Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-blue-50 rounded-lg text-[#2076C7]"><Building2 size={18} /></div>
             Total Companies
          </div>
          <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-green-50 rounded-lg text-emerald-600"><TrendingUp size={18} /></div>
             Index Value
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{currentIndex}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><TrendingUp size={18} /></div>
             Price Range
          </div>
          <p className="text-lg font-bold text-gray-900 truncate">
            {formatCurrency(minPrice.toString())} - {formatCurrency(maxPrice.toString())}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><ShoppingCart size={18} /></div>
             In Cart
          </div>
          <p className="text-2xl font-bold text-gray-900">{cartItems.length}</p>
        </div>
      </div>

      {/* 2. Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm outline-none focus:ring-2 focus:ring-[#2076C7]/10"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Wishlist Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
            <Bookmark size={16} className={wishlistItems.size > 0 ? 'fill-[#2076C7] text-[#2076C7]' : ''} />
            <span>Saved</span>
            {wishlistItems.size > 0 && (
              <span className="px-1.5 py-0.5 bg-[#2076C7] text-white text-xs rounded-full">
                {wishlistItems.size}
              </span>
            )}
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-1 md:flex-none flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              showFilters ? 'bg-[#2076C7] text-white border-[#2076C7]' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* 3. Filter Panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-2">Price Range</label>
              <select className="w-full p-2.5 bg-gray-50 border border-slate-200 rounded-lg text-gray-600 text-sm" value={priceRange} onChange={(e) => setPriceRange(e.target.value as PriceRangeOption)}>
                {PRICE_RANGES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-2">Sort By</label>
              <select className="w-full p-2.5 bg-gray-50 border border-slate-200 rounded-lg text-gray-600 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex items-end">
               <button onClick={clearFilters} className="text-sm text-red-500 font-medium hover:underline flex items-center gap-1"><X size={14}/> Reset Filters</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Companies List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="hidden md:block bg-slate-100 border-b border-gray-100 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest leading-none">
            <div className="col-span-4">Company</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Lot Size</div>
            <div className="col-span-2 text-right">Investment</div>
            <div className="col-span-1 text-center">Wishlist</div>
            <div className="col-span-1 text-center">Cart</div>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filteredCompanies.map((company) => {
            const minInv = calculateMinInvestment(company.price, company.min_lot_size);
            const isSaved = wishlistItems.has(company.id);
            const inCart = isInCart(company.id);

            return (
              <div key={company.id} className="px-6 py-5 hover:bg-blue-50/20 transition-all group">
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    {renderCompanyLogo(company)}
                    <span className="font-semibold text-gray-900 text-sm">{company.shares_name}</span>
                  </div>
                  <div className="col-span-2 text-right font-bold text-[#2076C7]">{formatCurrency(company.price)}</div>
                  <div className="col-span-2 text-right text-gray-600 text-sm">{formatMinLotSize(company.min_lot_size)}</div>
                  <div className="col-span-2 text-right font-bold text-gray-900">{formatCurrency(minInv.toFixed(2))}</div>
                  
                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => isSaved ? handleRemoveFromWishlist(company) : handleAddToWishlist(company)} className={`p-2 rounded-lg transition-all ${isSaved ? 'text-[#2076C7] bg-blue-50' : 'text-gray-600 hover:text-[#2076C7]'}`}>
                      {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button onClick={() => handleCartAction(company)} className={`p-2 rounded-lg transition-all ${inCart ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'}`}>
                      {inCart ? <CheckCircle size={20} /> : <ShoppingCart size={20} />}
                    </button>
                  </div>
                </div>

                <div className="md:hidden flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      {renderCompanyLogo(company)}
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{company.shares_name}</p>
                        <p className="text-xs text-[#2076C7] font-bold">{formatCurrency(company.price)}</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => isSaved ? handleRemoveFromWishlist(company) : handleAddToWishlist(company)} className={`p-2 rounded-lg ${isSaved ? 'text-[#2076C7]' : 'text-gray-600'}`}><Bookmark size={20} /></button>
                      <button onClick={() => handleCartAction(company)} className={`p-2 rounded-lg ${inCart ? 'text-green-600' : 'text-gray-600'}`}><ShoppingCart size={20} /></button>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}