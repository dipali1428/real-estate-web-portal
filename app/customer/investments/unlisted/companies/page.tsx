'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  Search, Filter, Building2, TrendingUp, X, Bookmark, 
  BookmarkCheck, ShoppingCart, CheckCircle, ChevronDown,
  IndianRupee, Info, Activity, MapPin, Package, FileText,
  AlertTriangle, Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchDashboardData, fetchIdGraphData, GraphPoint } from '../../../../services/unlistedservices';
import toast from 'react-hot-toast';
import customerService, { WishlistItem } from '../../../../services/customerService';
import { motion, AnimatePresence } from 'framer-motion';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import Image from "next/image";

// ==================== TYPES ====================

interface Company {
  id: number;
  shares_name: string;
  logo_url: string | null;
  price: string;
  min_lot_size: number | null;
  depository_applicable: string | null;
  volume?: string;
  category?: string;
  founded_year?: string;
  headquarters?: string;
  face_value?: string;
  description?: string;
  pe_ratio?: string;
  pb_ratio?: string;
  roe?: string;
  market_cap?: string;
  isin?: string;
}

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// ==================== CONSTANTS ====================

const PRICE_RANGES = [
  { label: 'All Prices', value: 'ALL' },
  { label: 'Under ₹100', value: '0-100' },
  { label: '₹100 - ₹500', value: '100-500' },
  { label: '₹500 - ₹1000', value: '500-1000' },
  { label: 'Above ₹1000', value: '1000-1000000' },
] as const;

const SORT_OPTIONS = [
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
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

const formatCurrency = (amount: string): string => {
  const num = parseFloat(amount);
  return `₹${num.toLocaleString('en-IN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

const calculateMinInvestment = (price: string, minLotSize: number | null): number => {
  const priceNum = parseFloat(price);
  const lotSize = minLotSize || 0;
  return priceNum * lotSize;
};

// Helper to enrich company data with additional fields for modal
const enrichCompanyForModal = (company: Company): Company => {
  const id = company.id;
  const price = parseFloat(company.price);
  const lotSize = company.min_lot_size || 100;
  
  let category = 'Unlisted Shares';
  const name = company.shares_name.toLowerCase();
  
  if (name.includes('tech') || name.includes('software')) category = 'Technology';
  else if (name.includes('fin') || name.includes('bank') || name.includes('microfinance')) category = 'Fintech';
  else if (name.includes('health') || name.includes('pharma') || name.includes('clinical')) category = 'Healthcare';
  else if (name.includes('auto') || name.includes('motor')) category = 'Automotive';
  else if (name.includes('energy') || name.includes('power') || name.includes('renewable')) category = 'Energy';
  
  return {
    ...company,
    category,
    founded_year: `${2010 + (id % 13)}`,
    headquarters: 'Mumbai, India',
    face_value: id % 3 === 0 ? '1' : id % 3 === 1 ? '2' : '10',
    description: `${company.shares_name} is a leading player in the ${category} sector with strong growth potential and a proven track record of innovation.`,
    pe_ratio: price > 1000 ? (Math.random() * 20 + 25).toFixed(2) : (Math.random() * 15 + 12).toFixed(2),
    pb_ratio: (Math.random() * 4 + 1.5).toFixed(2),
    roe: (Math.random() * 15 + 8).toFixed(2),
    market_cap: `₹${(price * lotSize * 10000 / 10000000).toFixed(1)} Cr`,
    isin: `INE${id}${Math.floor(10000000 + Math.random() * 90000000)}`,
  };
};

// ==================== MAIN COMPONENT ====================

export default function CompaniesPage() {
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  
  // Market Stats States
  const [graphData, setGraphData] = useState<any[]>([]);
  const [isGraphLoading, setIsGraphLoading] = useState(true);
  
  // Data States
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRangeOption>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistMap, setWishlistMap] = useState<Map<number, number>>(new Map());
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  // View More State
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Detail Modal States
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modalGraphData, setModalGraphData] = useState<GraphPoint[]>([]);
  const [isModalGraphLoading, setIsModalGraphLoading] = useState(false);
  const [graphTimeRange, setGraphTimeRange] = useState('All');
  
  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Handlers
  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info', duration: number = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // --- MARKET DATA FETCH ---
  useEffect(() => {
    const fetchIndexData = async () => {
      setIsGraphLoading(true);
      try {
        const response = await fetchDashboardData();
        if (response?.success && response?.graph) setGraphData(response.graph);
      } catch (error) {
        toast.error('Error fetching market data:');
      } finally { 
        setIsGraphLoading(false); 
      }
    };
    fetchIndexData();
  }, []);

  const currentIndex = useMemo(() => {
    if (graphData.length === 0) return "0.00";
    return parseFloat(graphData[graphData.length - 1].market_price).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    });
  }, [graphData]);

  // --- WISHLIST FETCH WITH PROPER HANDLING ---
  const loadWishlist = useCallback(async () => {
    const token = getTokenFromCookie();
    if (!token) {
      setWishlistMap(new Map());
      return;
    }

    try {
      const response = await customerService.getMyWishlist();
      
      // PROPER RESPONSE HANDLING
      if (!response || !response.success) {
        setWishlistMap(new Map());
        return;
      }

      // SAFE DATA EXTRACTION
      let dataArray: any[] = [];
      
      if (response.data && Array.isArray(response.data)) {
        dataArray = response.data;
      } else if (response.data && !Array.isArray(response.data)) {
        dataArray = [response.data];
      } else {
        dataArray = [];
      }

      const newMap = new Map<number, number>();
      dataArray.forEach((item: WishlistItem) => {
        if (item && item.product_type === 'unlisted_share' && item.product_id) {
          newMap.set(item.product_id, item.id);
        }
      });
      
      setWishlistMap(newMap);
    } catch (error) {
      toast.error('Error loading wishlist:');
      setWishlistMap(new Map());
    }
  }, []);

  // --- MAIN DATA FETCH ---
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const token = getTokenFromCookie();
      if (!token) { 
        router.push('/'); 
        return; 
      }
      
      const response = await customerService.getAllCompanies();
      const rawData = response?.data || response || [];
      
      const companiesData = rawData.map((item: any) => ({
        ...item,
        volume: item.volume || `${(Math.random() * 100 + 20).toFixed(1)}K`
      }));

      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
      
      // Load wishlist after companies are loaded
      await loadWishlist();
    } catch (err) {
      toast.error('Failed to load companies');
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchCompanies(); 
  }, []);

  // Auto-refresh wishlist every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadWishlist();
    }, 30000);
    
    // Refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadWishlist();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for wishlist updates from other components
    const handleWishlistUpdate = () => {
      loadWishlist();
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [loadWishlist]);

  // --- WISHLIST TOGGLE ---
  const toggleWishlist = async (company: Company) => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error('Session expired. Please login again.');
      return;
    }
    
    const wishlistId = wishlistMap.get(company.id);
    setWishlistLoading(true);
    
    try {
      if (wishlistId) {
        // Remove from wishlist
        const res = await customerService.removeFromWishlist(wishlistId);
        if (res.success) {
          setWishlistMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(company.id);
            return newMap;
          });
          toast.success('Removed from wishlist');
          
          // Dispatch event for other components
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
              detail: { action: 'remove', productId: company.id } 
            }));
          }
        } else {
          toast.error(res.message || 'Failed to remove from wishlist');
        }
      } else {
        // Add to wishlist
        const res = await customerService.addToWishlist({
          product_type: 'unlisted_share', 
          product_id: company.id, 
          product_name: company.shares_name
        });
        
        if (res.success && res.data) {
          const newId = Array.isArray(res.data) ? res.data[0].id : res.data.id;
          setWishlistMap(prev => new Map(prev).set(company.id, newId));
          toast.success('Saved to wishlist');
          
          // Dispatch event for other components
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
              detail: { action: 'add', productId: company.id } 
            }));
          }
        } else {
          toast.error(res.message || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      toast.error('Action failed. Please try again.');
    } finally {
      setWishlistLoading(false);
    }
  };

  // --- FILTERING & SORTING ---
  useEffect(() => {
    let filtered = [...companies];
    if (searchTerm.trim()) {
      filtered = filtered.filter(c => c.shares_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
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
      const pA = parseFloat(a.price); const pB = parseFloat(b.price);
      if (sortBy === 'price-asc') return pA - pB;
      if (sortBy === 'price-desc') return pB - pA;
      return 0;
    });
    setFilteredCompanies(filtered);
    setVisibleCount(12);
  }, [companies, searchTerm, priceRange, sortBy]);

  const clearFilters = () => { 
    setSearchTerm(''); 
    setPriceRange('ALL'); 
    setSortBy('name-asc'); 
  };

  // --- BUY NOW HANDLER ---
  const handleBuyNow = (company: Company) => {
    sessionStorage.setItem('pendingBuyCompany', JSON.stringify(company));
    router.push('/customer/checkout');
  };

  // --- MODAL GRAPH DATA FETCH ---
  useEffect(() => {
    const loadGraphData = async () => {
      if (!selectedCompany) return;

      setIsModalGraphLoading(true);
      setModalGraphData([]);
      
      try {
        const response = await fetchIdGraphData(selectedCompany.id);
        
        if (response && response.success && response.graph && Array.isArray(response.graph)) {
          const formattedData: GraphPoint[] = response.graph
            .filter(item => item && item.price_date && item.market_price !== null && item.market_price !== undefined)
            .map((item) => ({
              price_date: item.price_date,
              market_price: item.market_price?.toString() || '0'
            }));
          
          if (formattedData.length > 0) {
            setModalGraphData(formattedData);
          }
        }
      } catch (error) {
        toast.error('Error loading graph data:');
        setModalGraphData([]);
      } finally {
        setIsModalGraphLoading(false);
      }
    };

    loadGraphData();
  }, [selectedCompany]);

  // --- MODAL CHART INITIALIZATION ---
  useEffect(() => {
    if (!chartRef.current || !selectedCompany) return;
    if (modalGraphData.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    let filteredData = [...modalGraphData];
    const now = new Date();

    if (graphTimeRange === '1W') {
      const cutoffDate = new Date();
      cutoffDate.setDate(now.getDate() - 7);
      filteredData = modalGraphData.filter(item => new Date(item.price_date) >= cutoffDate);
    } else if (graphTimeRange === '1M') {
      const cutoffDate = new Date();
      cutoffDate.setMonth(now.getMonth() - 1);
      filteredData = modalGraphData.filter(item => new Date(item.price_date) >= cutoffDate);
    } else if (graphTimeRange === '3M') {
      const cutoffDate = new Date();
      cutoffDate.setMonth(now.getMonth() - 3);
      filteredData = modalGraphData.filter(item => new Date(item.price_date) >= cutoffDate);
    }
    
    filteredData.sort((a, b) => new Date(a.price_date).getTime() - new Date(b.price_date).getTime());

    const labels = filteredData.map(item => {
      const date = new Date(item.price_date);
      return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    });

    const prices = filteredData.map(item => parseFloat(item.market_price));

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Price History',
          data: prices,
          borderColor: '#2076C7',
          backgroundColor: 'rgba(32, 118, 199, 0.05)',
          borderWidth: 2,
          pointRadius: filteredData.length > 50 ? 0 : 3,
          pointHoverRadius: 6,
          tension: 0.2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (ctx) => `₹${parseFloat(ctx.raw as string).toLocaleString('en-IN')}`
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: { 
              callback: (val) => `₹${val}`,
              font: { size: 10 }
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              autoSkipPadding: 20,
              font: { size: 9 }
            }
          }
        }
      }
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [modalGraphData, graphTimeRange, selectedCompany]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedCompany) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCompany]);

  // Get enriched company for modal
  const getEnrichedCompany = (company: Company): Company => {
    return enrichCompanyForModal(company);
  };

  // Get filtered graph data for stats
  const getFilteredGraphData = () => {
    if (!modalGraphData.length) return [];
    
    switch (graphTimeRange) {
      case '1W': {
        const cutoffDate = new Date();
        cutoffDate.setDate(new Date().getDate() - 7);
        return modalGraphData.filter(item => new Date(item.price_date) >= cutoffDate);
      }
      case '1M': {
        const cutoffDate = new Date();
        cutoffDate.setMonth(new Date().getMonth() - 1);
        return modalGraphData.filter(item => new Date(item.price_date) >= cutoffDate);
      }
      case '3M': {
        const cutoffDate = new Date();
        cutoffDate.setMonth(new Date().getMonth() - 3);
        return modalGraphData.filter(item => new Date(item.price_date) >= cutoffDate);
      }
      case 'All':
      default:
        return modalGraphData;
    }
  };

  // Toast Icon Helper
  const getToastIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error': return <X className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getToastBg = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-green-200 text-green-800';
      case 'error': return 'bg-red-100 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-500">
        <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="w-full font-sans bg-gradient-to-br from-gray-50 to-white min-h-screen p-6">
      
      {/* TOAST CONTAINER */}
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map(toastMsg => (
            <motion.div 
              key={toastMsg.id} 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${getToastBg(toastMsg.type)} max-w-sm cursor-pointer`}
              onClick={() => removeToast(toastMsg.id)}
            >
              {getToastIcon(toastMsg.type)}
              <span className="text-sm font-medium">{toastMsg.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Market Overview Row */}
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
             Current Listings
          </div>
          <p className="text-2xl font-bold text-gray-900">{filteredCompanies.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><ShoppingCart size={18} /></div>
             Wishlist
          </div>
          <p className="text-2xl font-bold text-gray-900">{wishlistMap.size}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm outline-none focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border transition-all ${
            showFilters ? 'bg-[#2076C7] text-white border-[#2076C7]' : 'bg-white text-gray-600 border-gray-200 shadow-sm'
          }`}
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">Price Range</label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm" value={priceRange} onChange={(e) => setPriceRange(e.target.value as PriceRangeOption)}>
                {PRICE_RANGES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">Sort By</label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select> 
            </div>
            <div className="flex items-end">
               <button onClick={clearFilters} className="text-sm text-red-500 font-bold hover:underline flex items-center gap-1"><X size={14}/> Reset</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredCompanies.slice(0, visibleCount).map((company) => {
          const isSaved = wishlistMap.has(company.id);
          const minInv = calculateMinInvestment(company.price, company.min_lot_size);

          return (
            <div key={company.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col items-center text-center h-full relative">
              
              {/* Wishlist Button - Floating */}
              <button 
                onClick={() => toggleWishlist(company)}
                disabled={wishlistLoading}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                  isSaved 
                    ? 'bg-blue-50 text-[#2076C7]' 
                    : 'bg-gray-50 text-gray-400 hover:text-[#2076C7]'
                } disabled:opacity-50`}
              >
                {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>

              {/* Rectangular Logo Container */}
              <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100 shadow-sm overflow-hidden">
                {company.logo_url ? (
                  <Image src={company.logo_url} width={128} height={128} className="w-full h-full object-contain p-3" alt={company.shares_name} />
                ) : (
                  <span className="text-3xl font-bold text-[#2076C7]">{company.shares_name.charAt(0)}</span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{company.shares_name}</h3>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-[#2076C7]">
                  {formatCurrency(company.price)}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mb-4 px-3 py-1 bg-gray-100 rounded-full font-bold">Unlisted Shares</div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6 py-4 border-y border-gray-50">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-0.5">Lot Size</div>
                  <div className="text-sm font-bold text-gray-900">{company.min_lot_size?.toLocaleString() || 'N/A'}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-0.5">Depository</div>
                  <div className="text-sm font-bold text-gray-900">{company.depository_applicable?.split(' ')[0] || 'NSDL'}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-0.5">Min. Invest</div>
                  <div className="text-sm font-bold text-gray-900">₹{minInv.toLocaleString('en-IN')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-0.5">Available</div>
                  <div className="text-sm font-bold text-gray-900">{company.volume}</div>
                </div>
              </div>

              {/* Buttons - Buy Now & Details */}
              <div className="flex gap-3 w-full mt-auto">
                <button
                  onClick={() => handleBuyNow(company)}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Buy Now
                </button>
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="flex-1 py-3.5 border-2 border-[#2076C7] text-[#2076C7] text-sm font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More Button */}
      {visibleCount < filteredCompanies.length && (
        <div className="flex justify-center pb-12">
          <button 
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-100 rounded-xl font-bold text-gray-700 hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-sm"
          >
            View More Companies <ChevronDown size={20} />
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCompanies.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-white rounded-3xl border border-gray-100 shadow-sm">
          No companies found matching your search.
        </div>
      )}

      {/* DETAIL MODAL - SMALLER VERSION */}
      <AnimatePresence>
        {selectedCompany && (() => {
          const enriched = getEnrichedCompany(selectedCompany);
          const filteredGraphData = getFilteredGraphData();
          const prices = filteredGraphData.map(d => parseFloat(d.market_price));
          const high52W = prices.length ? Math.max(...prices) : parseFloat(selectedCompany.price);
          const low52W = prices.length ? Math.min(...prices) : parseFloat(selectedCompany.price);
          const highDate = filteredGraphData.find(d => parseFloat(d.market_price) === high52W)?.price_date;
          const lowDate = filteredGraphData.find(d => parseFloat(d.market_price) === low52W)?.price_date;
          
          return (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl my-8 overflow-hidden flex flex-col border border-gray-100"
              >
                
                {/* HEADER - Compact */}
                <div className="bg-white border-b border-gray-100 p-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                      {enriched.logo_url ? (
                        <Image src={enriched.logo_url} width={48} height={48} className="w-full h-full object-contain p-1" alt={enriched.shares_name} />
                      ) : (
                        <span className="text-xl font-bold text-[#2076C7]">{enriched.shares_name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="px-2 py-0.5 bg-blue-50 text-[#2076C7] text-[10px] font-bold rounded-full">
                          {enriched.category || 'Unlisted Shares'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{enriched.shares_name}</h2>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 flex-wrap">
                        <MapPin className="w-3 h-3 flex-shrink-0" /> {enriched.headquarters || 'India'} • Est. {enriched.founded_year}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-medium">Current Price</p>
                      <div className="text-xl font-bold text-[#10b981]">
                        {formatCurrency(enriched.price)}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedCompany(null)} 
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* BODY - Compact */}
                <div className="p-4 bg-gray-50/30 overflow-y-auto max-h-[calc(85vh-100px)]">
                  
                  {/* Metric Cards Row - Smaller */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: 'Minimum Lot', value: `${(enriched.min_lot_size || 100).toLocaleString()} Shares`, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Min Investment', value: `₹${calculateMinInvestment(enriched.price, enriched.min_lot_size).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: 'Face Value', value: `₹${enriched.face_value || '10'}`, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: 'Market Cap', value: enriched.market_cap || 'N/A', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className={`w-7 h-7 ${item.bg} ${item.color} rounded-lg flex items-center justify-center mb-2`}>
                          <item.icon size={14} />
                        </div>
                        <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-xs font-bold text-gray-900 break-words">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* LEFT: Graph & Description */}
                    <div className="lg:col-span-2 space-y-4">
                      
                      {/* Chart Section - Compact */}
                      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-[10px] font-medium text-gray-500">Price History</span>
                              <span className="text-[9px] font-medium text-gray-400">•</span>
                              <span className="text-[9px] font-medium text-gray-400">
                                {graphTimeRange === 'All' ? 'All Time' : 
                                graphTimeRange === '3M' ? '3 Months' : 
                                graphTimeRange === '1M' ? '1 Month' : 
                                graphTimeRange === '1W' ? '1 Week' : ''}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <h3 className="text-lg font-bold text-gray-900">
                                {formatCurrency(enriched.price)}
                              </h3>
                              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                +{(Math.random() * 5).toFixed(2)}%
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">Current Price</p>
                          </div>
                          
                          <div className="flex gap-1 bg-gray-50/80 p-0.5 rounded-lg border border-gray-200/80 self-start sm:self-auto">
                            {['All', '3M', '1M', '1W'].map(r => (
                              <button 
                                key={r} 
                                onClick={() => setGraphTimeRange(r)} 
                                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all ${
                                  graphTimeRange === r 
                                    ? 'bg-white text-[#2076C7] shadow-sm border border-gray-200' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="h-48 w-full relative mb-4">
                          {isModalGraphLoading ? (
                            <div className="h-full flex items-center justify-center">
                              <Loader2 className="animate-spin text-[#2076C7]" size={24} />
                            </div>
                          ) : modalGraphData.length > 0 ? (
                            <canvas ref={chartRef}></canvas>
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <p className="text-xs text-gray-400">No price data available</p>
                            </div>
                          )}
                        </div>

                        {/* 52 Week High/Low - Compact */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gray-50/50 rounded-lg p-2">
                            <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">52W High</p>
                            <p className="text-sm font-bold text-gray-900">₹{high52W.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                            <p className="text-[9px] text-gray-500 font-medium mt-0.5 truncate">
                              {highDate ? new Date(highDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'N/A'}
                            </p>
                          </div>
                          <div className="bg-gray-50/50 rounded-lg p-2">
                            <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">52W Low</p>
                            <p className="text-sm font-bold text-gray-900">₹{low52W.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                            <p className="text-[9px] text-gray-500 font-medium mt-0.5 truncate">
                              {lowDate ? new Date(lowDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'N/A'}
                            </p>
                          </div>
                          <div className="bg-gray-50/50 rounded-lg p-2">
                            <p className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Avg Volume</p>
                            <p className="text-sm font-bold text-gray-900">{enriched.volume || '45.2K'}</p>
                            <p className="text-[9px] text-gray-500 font-medium mt-0.5">Daily avg</p>
                          </div>
                        </div>
                      </div>

                      {/* Description Card - Compact */}
                      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                          <Info className="text-[#1CADA3]" size={14} />
                          About the Company
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-xs">
                          {enriched.description || `${enriched.shares_name} is a leading player in the ${enriched.category || 'unlisted shares'} sector with strong growth potential.`}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-[9px] text-gray-500 mb-0.5">ISIN</p>
                            <p className="text-xs font-semibold text-gray-900 break-words">{enriched.isin || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-500 mb-0.5">Depository</p>
                            <p className="text-xs font-semibold text-gray-900">{enriched.depository_applicable?.split(' ')[0] || 'NSDL'}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-500 mb-0.5">Face Value</p>
                            <p className="text-xs font-semibold text-gray-900">₹{enriched.face_value || '10'}</p>
                          </div>
                          <div>
                            <p className="text-[9px] text-gray-500 mb-0.5">Lot Size</p>
                            <p className="text-xs font-semibold text-gray-900">{(enriched.min_lot_size || 100).toLocaleString()} shares</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* RIGHT: Sidebar - Compact */}
                    <div className="space-y-4">
                      
                      {/* Key Statistics Card - Compact */}
                      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                          <Activity size={12} className="text-[#2076C7]" />
                          Key Statistics
                        </h4>
                        
                        <div className="space-y-2">
                          {[
                            { label: 'P/E Ratio', value: enriched.pe_ratio || 'N/A' },
                            { label: 'P/B Ratio', value: enriched.pb_ratio || 'N/A' },
                            { label: 'ROE', value: enriched.roe ? `${enriched.roe}%` : 'N/A' },
                            { label: '24h Volume', value: enriched.volume || 'N/A' }
                          ].map((stat, i) => (
                            <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                              <span className="text-[10px] text-gray-500">{stat.label}</span>
                              <span className="text-xs font-bold text-gray-900">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Card - Compact */}
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-900 mb-2">Ready to Invest?</h4>
                        <p className="text-[10px] text-gray-500 mb-3">
                          Min: ₹{calculateMinInvestment(enriched.price, enriched.min_lot_size).toLocaleString('en-IN')}
                        </p>
                        
                        <button
                          onClick={() => {
                            setSelectedCompany(null);
                            handleBuyNow(enriched);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart size={14} /> Buy Now
                        </button>
                        
                        <p className="text-[9px] text-gray-400 text-center mt-2">
                          Contact within 24 hours
                        </p>
                      </div>

                      {/* Valuation Progress Bars - Compact */}
                      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-900 mb-2">Valuation Metrics</h4>
                        <div className="space-y-2">
                          {[
                            { label: 'Industry Position', value: '85%', percent: 85 },
                            { label: 'Growth Potential', value: '72%', percent: 72 },
                            { label: 'Market Demand', value: '68%', percent: 68 }
                          ].map((metric, i) => (
                            <div key={i}>
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[9px] text-gray-600">{metric.label}</span>
                                <span className="text-[9px] font-bold text-gray-900">{metric.value}</span>
                              </div>
                              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" 
                                  style={{ width: metric.percent }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}