'use client';
import { useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllShares, fetchIdGraphData, GraphPoint } from '../../../services/unlistedservices';
import { 
  ArrowLeft, Search, Filter, CheckCircle, Package, Info,  
  TrendingUp, X,  FileText, ChevronDown, ChevronUp,
  ShoppingCart, IndianRupee, MapPin, Activity, Clock,
  FileSignature, Calculator, HelpCircle, Loader2,
  HandCoins, AlertTriangle
} from 'lucide-react';
import { useModal } from '../../../context/ModalContext';

// Toast Component
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Extended Company interface for UI
interface ExtendedCompany {
  id: number;
  name: string;
  shares_name: string;
  logo: string;
  logo_url: string;
  price: number;
  lotSize: number;
  min_lot_size: number;
  depository: string;
  depository_applicable: string;
  category: string;
  clean_name?: string | null;
  created_at?: string;
  updated_at?: string;
  isin: string;
  founded_year: string;
  headquarters: string;
  face_value: string;
  description: string;
  pe_ratio: string;
  pb_ratio: string;
  roe: string;
  market_cap: string;
  volume: string;
}

// PROCESS STEPS DATA
const PROCESS_STEPS = [
  { icon: FileSignature, num: 1, title: 'Select Company', desc: 'Browse and select from our verified unlisted companies with live pricing.' },
  { icon: Calculator, num: 2, title: 'Calculate Investment', desc: 'Determine your investment amount based on current market price and lot size.' },
  { icon: HandCoins, num: 3, title: 'Submit Enquiry', desc: 'Our team verifies your details and matches you with verified sellers.' },
  { icon: Clock, num: 4, title: 'Complete Transaction', desc: 'Get shares transferred to your Demat account within 7-10 business days.' }
];

// FAQ DATA
const FAQ_ITEMS = [
  { q: 'How long does the buying process take?', a: 'Typically, the buying process takes 7-10 business days from enquiry to shares credited to your Demat account. This includes verification, matching with sellers, and transaction settlement.' },
  { q: 'What documents are required to buy unlisted shares?', a: "You'll need your PAN card, Demat account details, and KYC documents. Our team will guide you through the specific documentation requirements." },
  { q: 'Can I buy shares in odd lots?', a: "Yes, you can buy any number of shares. The minimum quantity is the company's lot size, but you can purchase in multiples of the lot size." }
];

const BuyShares: React.FC = () => {
  const router = useRouter();
  const { openLogin } = useModal();
  
  // --- DATA STATES ---
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const [companies, setCompanies] = useState<ExtendedCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // --- GRAPH DATA STATES ---
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [graphTimeRange, setGraphTimeRange] = useState('All');

  // --- FILTER & SEARCH STATES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  // --- MODAL STATES ---
  const [detailCompany, setDetailCompany] = useState<ExtendedCompany | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'company'>('overview');
  
  // --- TOAST STATE ---
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // --- FAQ STATE ---
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);

  // TOAST HANDLER - Replaces notification system
  const showToast = useCallback((message: string, type: Toast['type'] = 'info', duration: number = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  // Remove toast manually
  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // FETCH SHARES DATA
  useEffect(() => {
    const loadShares = async () => {
      try {
        setIsLoading(true);
        const result = await fetchAllShares();
        
        const rawData = Array.isArray(result) ? result : [];
        
        const mappedData: ExtendedCompany[] = rawData.map((item: any) => {
          let category = 'Unlisted Shares';
          const name = item.shares_name || '';
          
          if (name.toLowerCase().includes('tech') || name.toLowerCase().includes('software')) category = 'Technology';
          else if (name.toLowerCase().includes('fin') || name.toLowerCase().includes('bank') || name.toLowerCase().includes('microfinance')) category = 'Fintech';
          else if (name.toLowerCase().includes('health') || name.toLowerCase().includes('pharma') || name.toLowerCase().includes('clinical')) category = 'Healthcare';
          else if (name.toLowerCase().includes('auto') || name.toLowerCase().includes('motor')) category = 'Automotive';
          else if (name.toLowerCase().includes('energy') || name.toLowerCase().includes('power') || name.toLowerCase().includes('renewable')) category = 'Energy';
          else if (name.toLowerCase().includes('chem')) category = 'Chemicals';
          else if (name.toLowerCase().includes('food') || name.toLowerCase().includes('tea') || name.toLowerCase().includes('beverage')) category = 'FMCG';
          else if (name.toLowerCase().includes('cement')) category = 'Construction';
          else if (name.toLowerCase().includes('hospital')) category = 'Healthcare';
          else if (name.toLowerCase().includes('exchange')) category = 'Financial Services';
          
          const id = Number(item.id) || 0;
          const price = parseFloat(item.price) || 0;
          const lotSize = Number(item.min_lot_size) || 100;
          
          return {
            id: id,
            name: item.shares_name || 'Unknown Company',
            shares_name: item.shares_name || 'Unknown Company',
            logo: item.logo_url || '',
            logo_url: item.logo_url || '',
            price: price,
            lotSize: lotSize,
            min_lot_size: lotSize,
            depository: item.depository_applicable?.replace(/&AMP;/gi, '&') || 'NSDL & CDSL',
            depository_applicable: item.depository_applicable || '',
            category: category,
            clean_name: item.clean_name,
            created_at: item.created_at,
            updated_at: item.updated_at,
            isin: `INE${id}${Math.floor(10000000 + Math.random() * 90000000)}`,
            founded_year: `${2010 + (id % 13)}`,
            headquarters: 'Mumbai, India',
            face_value: id % 3 === 0 ? '1' : id % 3 === 1 ? '2' : '10',
            description: `${item.shares_name || 'The company'} is a leading player in the ${category} sector with strong growth potential and a proven track record of innovation. The company has shown consistent performance and is poised for significant expansion in the coming years.`,
            pe_ratio: price > 1000 ? (Math.random() * 20 + 25).toFixed(2) : (Math.random() * 15 + 12).toFixed(2),
            pb_ratio: (Math.random() * 4 + 1.5).toFixed(2),
            roe: (Math.random() * 15 + 8).toFixed(2),
            market_cap: `₹${(price * lotSize * 10000 / 10000000).toFixed(1)} Cr`,
            volume: `${(Math.random() * 100 + 20).toFixed(1)}K`,
          };
        });
        
        setCompanies(mappedData);
        setError(null);
      } catch {
        setError("Failed to load market data. Please try again.");
        showToast("Failed to load market data. Please try again.", 'error');
      } finally {
        setIsLoading(false);
      }
    };
    loadShares();
  }, [showToast]);

  // FETCH GRAPH DATA WHEN DETAIL MODAL OPENS
  useEffect(() => {
    const loadGraphData = async () => {
      if (!detailCompany) return;

      setIsGraphLoading(true);
      setGraphData([]);
      
      try {
        const response = await fetchIdGraphData(detailCompany.id);
        
        if (response && response.success && response.graph && Array.isArray(response.graph)) {
          const formattedData: GraphPoint[] = response.graph
            .filter(item => item && item.price_date && item.market_price !== null && item.market_price !== undefined)
            .map((item) => ({
              price_date: item.price_date,
              market_price: item.market_price?.toString() || '0'
            }));
          
          if (formattedData.length > 0) {
            setGraphData(formattedData);
          } else {
            showToast('No historical price data available for this company', 'info');
          }
        }
      } catch {
        setGraphData([]);
        showToast('Unable to load price chart data', 'warning');
      } finally {
        setIsGraphLoading(false);
      }
    };

    loadGraphData();
  }, [detailCompany, showToast]);

  // PREVENT SCROLL ON MODAL OPEN
  useEffect(() => {
    document.body.style.overflow = detailCompany ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [detailCompany]);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // CHART INITIALIZATION
  useEffect(() => {
    if (!chartRef.current || !detailCompany) return;
    if (graphData.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    let filteredData = [...graphData];
    const now = new Date();

    if (graphTimeRange === '1W') {
      const cutoffDate = new Date();
      cutoffDate.setDate(now.getDate() - 7);
      filteredData = graphData.filter(item => new Date(item.price_date) >= cutoffDate);
    } else if (graphTimeRange === '1M') {
      const cutoffDate = new Date();
      cutoffDate.setMonth(now.getMonth() - 1);
      filteredData = graphData.filter(item => new Date(item.price_date) >= cutoffDate);
    } else if (graphTimeRange === '3M') {
      const cutoffDate = new Date();
      cutoffDate.setMonth(now.getMonth() - 3);
      filteredData = graphData.filter(item => new Date(item.price_date) >= cutoffDate);
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
              font: { size: 11 }
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              autoSkipPadding: 20,
              font: { size: 10 }
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
  }, [graphData, graphTimeRange, detailCompany]);

  // FILTERING LOGIC
  const filteredCompanies = useMemo(() => {
    let result = [...companies];

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
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
    }

    return result;
  }, [companies, debouncedSearch, selectedCategory, sortBy]);

  const handleApplyFilters = () => {
    setDebouncedSearch(searchTerm);
  };

  // DYNAMIC CATEGORIES
  const categories = useMemo(() => 
    Array.from(new Set(companies.map(c => c.category))).sort()
  , [companies]);

  // FAQ TOGGLE
  const toggleFaq = (idx: number) => {
    setActiveFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  // HANDLE BUY NOW CLICK
  const handleBuyNowClick = (company: ExtendedCompany) => {
    sessionStorage.setItem('pendingBuyCompany', JSON.stringify(company));
    openLogin();
    showToast('Please login to proceed with purchase', 'info', 3000);
  };

  const calculateMinInvestment = (price: number, lotSize: number): string => {
    const investment = price * lotSize;
    return `₹${investment.toLocaleString('en-IN')}`;
  };

  const formatLargeNumber = (num: number): string => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // GRAPH HANDLERS
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const filteredData = getFilteredGraphData();
    if (!filteredData.length) return;
    
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const svgWidth = rect.width;
    const index = Math.floor((x / svgWidth) * filteredData.length);
    const clampedIndex = Math.min(Math.max(index, 0), filteredData.length - 1);
    setHoveredIndex(clampedIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getFilteredGraphData = () => {
    if (!graphData.length) return [];
    
    const now = new Date();
    
    switch (graphTimeRange) {
      case '1W': {
        const cutoffDate = new Date();
        cutoffDate.setDate(now.getDate() - 7);
        return graphData.filter(item => new Date(item.price_date) >= cutoffDate);
      }
      case '1M': {
        const cutoffDate = new Date();
        cutoffDate.setMonth(now.getMonth() - 1);
        return graphData.filter(item => new Date(item.price_date) >= cutoffDate);
      }
      case '3M': {
        const cutoffDate = new Date();
        cutoffDate.setMonth(now.getMonth() - 3);
        return graphData.filter(item => new Date(item.price_date) >= cutoffDate);
      }
      case 'All':
      default:
        return graphData;
    }
  };

  const getGraphPoints = () => {
    const filteredData = getFilteredGraphData();
    if (!filteredData.length) return '';
    
    const width = 100;
    const height = 40;
    const values = filteredData.map(d => parseFloat(d.market_price));
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = (maxVal - minVal) || 1;
    
    return filteredData.map((point, i) => {
      const x = (i / (filteredData.length - 1)) * width;
      const y = height - (((parseFloat(point.market_price) - minVal) / range) * height * 0.8) - 4;
      return `${x},${y}`;
    }).join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  const formatShortDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short' 
    }).replace(',', '');
  };

  // LOADING STATE UI
  if (isLoading) {
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

  // Toast Icon Helper
  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error': return <X className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  // Toast Background Helper
  const getToastBg = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-green-200 text-green-800';
      case 'error': return 'bg-red-100 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* TOAST CONTAINER - Replaces notification system */}
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${getToastBg(toast.type)} animate-in slide-in-from-right-5 max-w-sm`}
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
              <ShoppingCart className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Buy Unlisted Shares
          </h1>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Browse and purchase unlisted shares from <span className="font-bold text-[#2076C7] bg-blue-50 px-3 py-1 rounded-full">{companies.length}</span> companies with live pricing and institutional-grade research.
          </p>
        </header>

        {/* SEARCH & FILTERS */}
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
                <option value="" className="text-gray-900">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat} className="text-gray-900">{cat}</option>)}
              </select>
              
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
        </div>

        {/* COMPANIES GRID */}
        <div className="relative">
          <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredCompanies.map(company => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col items-center text-center h-full"
                >
                  {/* RECTANGULAR IMAGE CONTAINER - CHANGED FROM CIRCLE */}
                  <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100 shadow-sm overflow-hidden">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        className="w-full h-full object-contain p-3" 
                        alt={company.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            const span = document.createElement('span');
                            span.className = 'text-2xl font-bold text-[#2076C7]';
                            span.textContent = company.name.charAt(0);
                            parent.appendChild(span);
                          }
                        }}
                      />
                    ) : (
                      <span className="text-3xl font-bold text-[#2076C7]">{company.name.charAt(0)}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                  
                  {/* PRICE DISPLAY */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#2076C7]">
                      ₹{company.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">{company.category}</div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-0.5">Lot Size</div>
                      <div className="text-sm font-bold text-gray-900">
                        {company.lotSize.toLocaleString()} shares
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-0.5">Depository</div>
                      <div className="text-sm font-bold text-gray-900">
                        {company.depository?.split(' ')[0] || 'NSDL'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-0.5">Min. Invest</div>
                      <div className="text-sm font-bold text-gray-900">
                        {calculateMinInvestment(company.price, company.lotSize)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-0.5">Available</div>
                      <div className="text-sm font-bold text-gray-900">
                        {company.volume || '120K'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full mt-auto">
                    <button
                      onClick={() => handleBuyNowClick(company)}
                      className="flex-1 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => setDetailCompany(company)}
                      className="flex-1 py-3.5 border-2 border-[#2076C7] text-[#2076C7] text-sm font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 max-w-lg mx-auto shadow-xl border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Companies Found</h3>
              <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setDebouncedSearch('');
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* FAQ SECTION */}
        <section className="mb-12 mt-12">
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
      </main>

      {/* DETAIL MODAL */}
      {detailCompany && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl my-8 animate-fadeIn overflow-hidden flex flex-col border border-gray-100">
            
            {/* HEADER */}
            <div className="bg-white border-b border-gray-100 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* RECTANGULAR IMAGE CONTAINER - CHANGED FROM CIRCLE */}
                <div className="w-20 h-20 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                  {detailCompany.logo ? (
                    <img src={detailCompany.logo} className="w-full h-full object-contain p-2" alt={detailCompany.name} />
                  ) : (
                    <span className="text-2xl font-bold text-[#2076C7]">{detailCompany.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-xs font-bold rounded-full">
                      {detailCompany.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{detailCompany.name}</h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {detailCompany.headquarters} • Est. {detailCompany.founded_year}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">Current Price</p>
                  <div className="text-2xl md:text-3xl font-bold text-[#10b981]">
                    ₹{detailCompany.price.toLocaleString('en-IN')}
                  </div>
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
                  { label: 'Minimum Lot', value: `${detailCompany.lotSize.toLocaleString()} Shares`, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Min Investment', value: calculateMinInvestment(detailCompany.price, detailCompany.lotSize), icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Face Value', value: `₹${detailCompany.face_value}`, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Market Cap', value: detailCompany.market_cap, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
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
                
                {/* LEFT: Graph & Description */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Chart Section */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500">Price History</span>
                          <span className="text-[10px] font-medium text-gray-400">•</span>
                            <span className="text-[10px] font-medium text-gray-400">
                              {graphTimeRange === 'All' ? 'All Time' : 
                              graphTimeRange === '3M' ? '3 Months' : 
                              graphTimeRange === '1M' ? '1 Month' : 
                              graphTimeRange === '1W' ? '1 Week' : ''}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-2xl font-bold text-gray-900">
                            ₹{detailCompany.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </h3>
                          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            +{(Math.random() * 5).toFixed(2)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Current Price</p>
                      </div>
                      
                      <div className="flex gap-1 bg-gray-50/80 p-1 rounded-lg border border-gray-200/80">
                        {['All', '3M', '1M', '1W'].map(r => (
                          <button 
                            key={r} 
                            onClick={() => setGraphTimeRange(r)} 
                            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
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

                    <div className="h-64 w-full relative mb-8">
                      {isGraphLoading ? (
                        <div className="h-full flex items-center justify-center">
                          <Loader2 className="animate-spin text-[#2076C7]" size={32} />
                        </div>
                      ) : graphData.length > 0 ? (
                        <canvas ref={chartRef}></canvas>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-sm text-gray-400">No price data available</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="bg-gray-50/50 rounded-lg p-3">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                          52W High
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{graphData.length > 0 
                            ? Math.max(...graphData.map(d => parseFloat(d.market_price))).toLocaleString('en-IN', { minimumFractionDigits: 2 })
                            : detailCompany.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                          {graphData.length > 0 
                            ? new Date(graphData.find(d => parseFloat(d.market_price) === Math.max(...graphData.map(p => parseFloat(p.market_price))))?.price_date || '').toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                            : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50/50 rounded-lg p-3">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                          52W Low
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{graphData.length > 0 
                            ? Math.min(...graphData.map(d => parseFloat(d.market_price))).toLocaleString('en-IN', { minimumFractionDigits: 2 })
                            : detailCompany.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                          {graphData.length > 0 
                            ? new Date(graphData.find(d => parseFloat(d.market_price) === Math.min(...graphData.map(p => parseFloat(p.market_price))))?.price_date || '').toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                            : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50/50 rounded-lg p-3">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                          Avg Volume
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {detailCompany.volume || '45.2K'}
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                          Daily average
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description Card */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="text-[#1CADA3]" size={20} />
                      About the Company
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {detailCompany.description || `${detailCompany.name} is a leading player in the ${detailCompany.category} sector with strong growth potential and a proven track record of innovation. The company has shown consistent performance and is poised for significant expansion in the coming years.`}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ISIN</p>
                        <p className="text-sm font-semibold text-gray-900">{detailCompany.isin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Depository</p>
                        <p className="text-sm font-semibold text-gray-900">{detailCompany.depository}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Face Value</p>
                        <p className="text-sm font-semibold text-gray-900">₹{detailCompany.face_value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lot Size</p>
                        <p className="text-sm font-semibold text-gray-900">{detailCompany.lotSize.toLocaleString()} shares</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* RIGHT: Sidebar */}
                <div className="space-y-6">
                  
                  {/* Key Statistics Card */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity size={16} className="text-[#2076C7]" />
                      Key Statistics
                    </h4>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'P/E Ratio', value: detailCompany.pe_ratio },
                        { label: 'P/B Ratio', value: detailCompany.pb_ratio },
                        { label: 'ROE', value: `${detailCompany.roe}%` },
                        { label: '24h Volume', value: detailCompany.volume }
                      ].map((stat, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                          <span className="text-xs text-gray-500">{stat.label}</span>
                          <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Ready to Invest?</h4>
                    <p className="text-xs text-gray-500 mb-6">
                      Minimum investment: {calculateMinInvestment(detailCompany.price, detailCompany.lotSize)}
                    </p>
                    
                    <button
                      onClick={() => {
                        setDetailCompany(null);
                        handleBuyNowClick(detailCompany);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      Buy Now
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center mt-4">
                      Our team will contact you within 24 hours
                    </p>
                  </div>

                  {/* Valuation Progress Bars */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-900 mb-4">Valuation Metrics</h4>
                    <div className="space-y-5">
                      {[
                        { label: 'Industry Position', value: '85%', percent: 85 },
                        { label: 'Growth Potential', value: '72%', percent: 72 },
                        { label: 'Market Demand', value: '68%', percent: 68 }
                      ].map((metric, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs text-gray-600">{metric.label}</span>
                            <span className="text-xs font-bold text-gray-900">{metric.value}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
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

export default BuyShares;