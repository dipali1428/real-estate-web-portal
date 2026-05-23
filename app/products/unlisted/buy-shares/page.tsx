'use client';
import React, { useState, useMemo, useEffect, useCallback, useRef, FC } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
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
import Image from 'next/image';

// --- INTERFACES ---
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

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

// --- CONSTANTS (Preserved exactly from your original) ---
const PROCESS_STEPS = [
  { icon: FileSignature, num: 1, title: 'Select Company', desc: 'Browse and select from our verified unlisted companies with live pricing.' },
  { icon: Calculator, num: 2, title: 'Calculate Investment', desc: 'Determine your investment amount based on current market price and lot size.' },
  { icon: HandCoins, num: 3, title: 'Submit Enquiry', desc: 'Our team verifies your details and matches you with verified sellers.' },
  { icon: Clock, num: 4, title: 'Complete Transaction', desc: 'Get shares transferred to your Demat account within 7-10 business days.' }
];

const FAQ_ITEMS = [
  { q: 'How long does the buying process take?', a: 'Typically, the buying process takes 7-10 business days from enquiry to shares credited to your Demat account. This includes verification, matching with sellers, and transaction settlement.' },
  { q: 'What documents are required to buy unlisted shares?', a: "You'll need your PAN card, Demat account details, and KYC documents. Our team will guide you through the specific documentation requirements." },
  { q: 'Can I buy shares in odd lots?', a: "Yes, you can buy any number of shares. The minimum quantity is the company's lot size, but you can purchase in multiples of the lot size." }
];

// --- STATIC LOGIC HELPERS ---
const getCompanyCategory = (name: string): string => {
  const lowName = name.toLowerCase();
  if (lowName.includes('tech') || lowName.includes('software')) return 'Technology';
  if (lowName.includes('fin') || lowName.includes('bank') || lowName.includes('microfinance')) return 'Fintech';
  if (lowName.includes('health') || lowName.includes('pharma') || lowName.includes('clinical')) return 'Healthcare';
  if (lowName.includes('auto') || lowName.includes('motor')) return 'Automotive';
  if (lowName.includes('energy') || lowName.includes('power') || lowName.includes('renewable')) return 'Energy';
  if (lowName.includes('chem')) return 'Chemicals';
  if (lowName.includes('food') || lowName.includes('tea') || lowName.includes('beverage')) return 'FMCG';
  if (lowName.includes('cement')) return 'Construction';
  if (lowName.includes('hospital')) return 'Healthcare';
  if (lowName.includes('exchange')) return 'Financial Services';
  return 'Unlisted Shares';
};

const mapShareData = (item: any): ExtendedCompany => {
  const category = getCompanyCategory(item.shares_name || '');
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
};

const BuyShares: FC = () => {
  const router = useRouter();
  const { openLogin } = useModal();
  
  // --- REFS ---
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  // --- STATES ---
  const [companies, setCompanies] = useState<ExtendedCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [graphTimeRange, setGraphTimeRange] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // --- VISIBILITY LOGIC (5x4 Desktop, 4 Mobile) ---
  const [visibleCount, setVisibleCount] = useState(20); 
  const [detailCompany, setDetailCompany] = useState<ExtendedCompany | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);

  useEffect(() => {
    const handleInitialCount = () => {
        if (window.innerWidth < 768) {
            setVisibleCount(4); // Mobile: Show only 4 initially
        } else {
            setVisibleCount(20); // Desktop: 5 horizontal x 4 vertical
        }
    };
    handleInitialCount();
    window.addEventListener('resize', handleInitialCount);
    return () => window.removeEventListener('resize', handleInitialCount);
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

  // FETCH SHARES DATA
  useEffect(() => {
    const loadShares = async () => {
      try {
        setIsLoading(true);
        const result = await fetchAllShares();
        const rawData = Array.isArray(result) ? result : [];
        const mappedData = rawData.map(mapShareData);
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

  // FETCH GRAPH DATA
  useEffect(() => {
    if (!detailCompany) return;
    const loadGraphData = async () => {
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

  // UI EFFECTS
  useEffect(() => {
    document.body.style.overflow = detailCompany ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [detailCompany]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset visibility count when filters change
  useEffect(() => {
    if (window.innerWidth < 768) setVisibleCount(4);
    else setVisibleCount(20);
  }, [debouncedSearch, selectedCategory, sortBy]);

  // CHART INITIALIZATION
  useEffect(() => {
    if (!chartRef.current || !detailCompany || graphData.length === 0) return;

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
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [graphData, graphTimeRange, detailCompany]);

  // FILTERING LOGIC
  const filteredCompanies = useMemo(() => {
    let result = [...companies];
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(term) || c.category.toLowerCase().includes(term));
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

  const categories = useMemo(() => Array.from(new Set(companies.map(c => c.category))).sort(), [companies]);

  // HANDLERS
  const handleApplyFilters = useCallback(() => setDebouncedSearch(searchTerm), [searchTerm]);
  
  const toggleFaq = useCallback((idx: number) => {
    setActiveFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  }, []);

  const handleBuyNowClick = useCallback((company: ExtendedCompany) => {
    sessionStorage.setItem('pendingBuyCompany', JSON.stringify(company));
    openLogin();
    showToast('Please login to proceed with purchase', 'info', 3000);
  }, [openLogin, showToast]);

  const calculateMinInvestment = (price: number, lotSize: number) => `₹${(price * lotSize).toLocaleString('en-IN')}`;

  // RENDERING HELPERS
  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error': return <X className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
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

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading available companies...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="text-center max-w-md">
        <div className="bg-red-50 text-red-500 p-8 rounded-2xl border border-red-100 mb-6">
          <X className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">Failed to Load</h3>
          <p className="text-sm opacity-90 mb-2">{error}</p>
        </div>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* TOAST CONTAINER */}
      <div className="fixed top-20 right-5 z-[5000] flex flex-col gap-3">
        {toasts.map(toast => (
          <div key={toast.id} className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${getToastBg(toast.type)} animate-in slide-in-from-right-5 max-w-sm cursor-pointer`} onClick={() => removeToast(toast.id)}>
            {getToastIcon(toast.type)}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-4 pt-4 md:pt-8 min-h-screen">
        <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
            
            {/* Mobile: icon only */}
            <button
              onClick={() => window.location.href = "/products/unlisted"}
              aria-label="Back to Unlisted"
              className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
            >
              <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
                <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
              </div>
            </button>

            {/* Desktop: full text button */}
            <button
              onClick={() => window.location.href = "/products/unlisted"}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Back
            </button>

          </div>


        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <ShoppingCart className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Buy Unlisted Shares</h1>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">Browse and purchase unlisted shares from <span className="font-bold text-[#2076C7] bg-blue-50 px-3 py-1 rounded-full">{companies.length}</span> companies with live pricing and institutional-grade research.</p>
        </header>

        <section className="mb-8">
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
              <input type="text" placeholder="Search companies by name or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()} className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500" />
              {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 flex-1">
              <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] transition-all text-gray-900 min-w-[180px]" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] transition-all text-gray-900 min-w-[180px]" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
              <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg"><span className="text-sm text-[#2076C7] font-semibold">{filteredCompanies.length} companies</span></div>
            </div>
            <button onClick={handleApplyFilters} className="px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-md whitespace-nowrap"><Filter className="w-4 h-4" /> Apply Filters</button>
          </div>
        </section>

        {/* --- GRID: 5 COLUMNS HORIZONTALLY ON DESKTOP --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-8">
          {filteredCompanies.slice(0, visibleCount).map(company => (
            <div 
                key={company.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full group"
            >
                {/* RECTANGULAR IMAGE CONTAINER */}
                <div className="w-full h-32 bg-gray-50 rounded-t-2xl flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    {company.logo ? (
                        <Image
                            src={company.logo} 
                            width={200}
                            height={150}
                            className="w-full h-full object-contain p-3 transition-all duration-700 group-hover:scale-110" 
                            alt={company.name} 
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent) {
                                    const span = document.createElement('span');
                                    span.className = 'text-3xl font-bold text-[#2076C7]';
                                    span.textContent = company.name.charAt(0);
                                    parent.appendChild(span);
                                }
                            }}
                        />
                    ) : (
                        <span className="text-3xl font-bold text-[#2076C7]">{company.name.charAt(0)}</span>
                    )}
                </div>

                {/* Company Details */}
                <div className="p-5 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#2076C7] transition-colors duration-300">
                        {company.name}
                    </h4>
                    
                    {/* Price Display */}
                    <div className="mb-4 text-center">
                        <span className="text-2xl font-bold text-[#2076C7]">
                            ₹{company.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 text-center mb-4">{company.category}</div>

                    {/* Info Grid */}
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

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-auto">
                        <button
                            onClick={() => handleBuyNowClick(company)}
                            className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            Buy Now
                        </button>
                        <button 
                            onClick={() => setDetailCompany(company)}
                            className="w-full py-2.5 border-2 border-[#2076C7]/20 text-[#2076C7] text-xs font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                        >
                            Details
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>

        {/* SHOW MORE BUTTON LOGIC (4 for Mobile, 20 for Desktop) */}
        {visibleCount < filteredCompanies.length && (
          <div className="flex justify-center pb-12">
            <button 
                onClick={() => setVisibleCount(prev => prev + (window.innerWidth < 768 ? 4 : 20))} 
                className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-sm hover:shadow-md"
            >
                View More Companies <ChevronDown size={20} />
            </button>
          </div>
        )}

        <section className="mb-12 mt-12">
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

      {/* RESPONSIVE DETAIL MODAL - FULLY ADAPTED FOR MOBILE */}
      {detailCompany && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl my-8 animate-fadeIn overflow-hidden flex flex-col border border-gray-100 max-h-[95vh] md:max-h-[90vh]">
            {/* Modal Header - Responsive stacking on mobile */}
            <div className="bg-white border-b border-gray-100 p-4 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                  {detailCompany.logo ? (
                    <Image src={detailCompany.logo} width={200} height={120} className="w-full h-full object-contain p-1 md:p-2" alt={detailCompany.name} />
                  ) : (
                    <span className="text-xl md:text-2xl font-bold text-[#2076C7]">{detailCompany.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-blue-50 text-[#2076C7] text-[10px] md:text-xs font-bold rounded-full">
                      {detailCompany.category}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 line-clamp-2">{detailCompany.name}</h2>
                  <p className="text-xs text-gray-500 mt-0.5 md:mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" /> {detailCompany.headquarters} • Est. {detailCompany.founded_year}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="text-right">
                  <p className="text-[10px] md:text-xs text-gray-500 font-medium">Current Price</p>
                  <div className="text-lg md:text-2xl lg:text-3xl font-bold text-[#10b981]">₹{detailCompany.price.toLocaleString('en-IN')}</div>
                </div>
                <button 
                  onClick={() => setDetailCompany(null)} 
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-600"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content - Adjusted padding for mobile */}
            <div className="p-4 md:p-6 lg:p-8 bg-gray-50/30 overflow-y-auto">
              {/* Stats Grid - Responsive: 2x2 on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  { label: 'Minimum Lot', value: `${detailCompany.lotSize.toLocaleString()} Shares`, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Min Investment', value: calculateMinInvestment(detailCompany.price, detailCompany.lotSize), icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Face Value', value: `₹${detailCompany.face_value}`, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Market Cap', value: detailCompany.market_cap, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-3 md:p-4 lg:p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className={`w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 ${item.bg} ${item.color} rounded-lg flex items-center justify-center mb-2 md:mb-3`}>
                      <item.icon size={16} className="md:w-5 md:h-5 lg:w-5 lg:h-5" />
                    </div>
                    <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5 md:mb-1">{item.label}</p>
                    <p className="text-sm md:text-base lg:text-lg font-bold text-gray-900 break-words">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Main Content - Responsive stacking */}
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                {/* Left Column - Chart & About */}
                <div className="lg:w-2/3 space-y-4 md:space-y-6">
                  {/* Chart Section - Fully responsive */}
                  <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                          <span className="text-xs md:text-sm font-medium text-gray-500">Price History</span>
                          <span className="text-[9px] md:text-[10px] text-gray-400">• {graphTimeRange}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">₹{detailCompany.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
                      </div>
                      <div className="flex gap-1 bg-gray-50/80 p-1 rounded-lg border border-gray-200/80 self-start sm:self-auto">
                        {['All', '3M', '1M', '1W'].map(r => (
                          <button
                            key={r}
                            onClick={() => setGraphTimeRange(r)}
                            className={`px-2.5 md:px-3.5 py-1 md:py-1.5 text-xs font-medium rounded-md transition-all ${
                              graphTimeRange === r 
                                ? 'bg-white text-[#2076C7] shadow-sm border border-gray-200' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-48 sm:h-56 md:h-64 w-full relative">
                      {isGraphLoading ? (
                        <div className="h-full flex items-center justify-center">
                          <Loader2 className="animate-spin text-[#2076C7]" size={28} />
                        </div>
                      ) : graphData.length > 0 ? (
                        <canvas ref={chartRef} className="w-full h-full"></canvas>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">No price data available</div>
                      )}
                    </div>
                  </div>

                  {/* About Company - Responsive text sizing */}
                  <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
                      <Info className="text-[#1CADA3]" size={18} /> About the Company
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      {detailCompany.description || `${detailCompany.name} is a leading player in the ${detailCompany.category} sector with strong growth potential and a proven track record of innovation. The company has shown consistent performance and is poised for significant expansion in the coming years.`}
                    </p>
                    
                    {/* Company Details Grid - Responsive */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">ISIN</p>
                        <p className="text-xs md:text-sm font-semibold text-gray-900 break-words">{detailCompany.isin}</p>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">Depository</p>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">{detailCompany.depository}</p>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">Face Value</p>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">₹{detailCompany.face_value}</p>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">Lot Size</p>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">{detailCompany.lotSize.toLocaleString()} shares</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Stats & CTA */}
                <div className="lg:w-1/3 space-y-4 md:space-y-6">
                  {/* Key Statistics */}
                  <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100 shadow-sm">
                    <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                      <Activity size={16} className="text-[#2076C7]" /> Key Statistics
                    </h4>
                    <div className="space-y-3 md:space-y-4">
                      {[
                        { label: 'P/E Ratio', value: detailCompany.pe_ratio },
                        { label: 'P/B Ratio', value: detailCompany.pb_ratio },
                        { label: 'ROE', value: `${detailCompany.roe}%` }
                      ].map((stat, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                          <span className="text-xs md:text-sm text-gray-500">{stat.label}</span>
                          <span className="text-sm md:text-base font-bold text-gray-900">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Investment CTA - Sticky on desktop, not on mobile */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 md:p-5 lg:p-6 border border-gray-200 shadow-sm lg:sticky lg:top-4">
                    <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 text-center">Ready to Invest?</h4>
                    <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 text-center font-bold">
                      Min investment: {calculateMinInvestment(detailCompany.price, detailCompany.lotSize)}
                    </p>
                    <button 
                      onClick={() => { setDetailCompany(null); handleBuyNowClick(detailCompany); }} 
                      className="w-full py-2.5 md:py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm md:text-base font-bold rounded-lg hover:opacity-90 transition-all"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Valuation Metrics - Responsive */}
                  <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100 shadow-sm">
                    <h4 className="text-sm md:text-base font-bold text-gray-900 mb-3 md:mb-4">Valuation Metrics</h4>
                    <div className="space-y-4 md:space-y-5">
                      {[
                        { label: 'Industry Position', value: '85%', percent: 85 },
                        { label: 'Growth Potential', value: '72%', percent: 72 },
                        { label: 'Market Demand', value: '68%', percent: 68 }
                      ].map((metric, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs md:text-sm text-gray-600">{metric.label}</span>
                            <span className="text-xs md:text-sm font-bold text-gray-900">{metric.value}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" 
                              style={{ width: `${metric.percent}%` }}
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

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        @keyframes slideInFromRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .slide-in-from-right-5 { animation: slideInFromRight 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default BuyShares;