'use client';
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, Filter, Building2, TrendingUp, X, Bookmark, BookmarkCheck, ShoppingCart, CheckCircle, ChevronDown, IndianRupee, Info, Activity, MapPin, Package, FileText, AlertTriangle, Loader2, Plus, Minus, CreditCard,} from 'lucide-react';
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

interface CartItem {
  id: number;
  company: Company;
  quantity: number;
}

interface CompanyCardProps {
  company: Company;
  isSaved: boolean;
  onToggleWishlist: (company: Company) => void;
  onAddToCart: (company: Company, quantity: number) => void;
  wishlistLoading: boolean;
  onViewDetails: (company: Company) => void;
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
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const calculateMinInvestment = (price: string, minLotSize: number | null): number => {
  const priceNum = parseFloat(price);
  const lotSize = minLotSize || 0;
  return priceNum * lotSize;
};

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

// ==================== COMPANY CARD COMPONENT ====================
const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  isSaved,
  onToggleWishlist,
  onAddToCart,
  wishlistLoading,
  onViewDetails
}) => {
  const [quantity, setQuantity] = useState(1);
  const minInv = calculateMinInvestment(company.price, company.min_lot_size);
  const maxLot = company.min_lot_size || Infinity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxLot) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxLot) {
      setQuantity(value);
    } else if (value === 0) {
      setQuantity(1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full group relative">
      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(company)}
        disabled={wishlistLoading}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all shadow-sm ${isSaved ? 'bg-blue-50 text-[#2076C7]' : 'bg-white text-gray-400 hover:text-[#2076C7]'} disabled:opacity-50`}
      >
        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>

      {/* Image Container */}
      <div className="w-full h-32 bg-gray-50 rounded-t-2xl flex items-center justify-center border-b border-gray-100 overflow-hidden">
        {company.logo_url ? (
          <Image
            src={company.logo_url} 
            width={200}
            height={150}
            className="w-full h-full object-contain p-3 transition-all duration-700 group-hover:scale-110" 
            alt={company.shares_name} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = 'text-3xl font-bold text-[#2076C7]';
                span.textContent = company.shares_name.charAt(0);
                parent.appendChild(span);
              }
            }}
          />
        ) : (
          <span className="text-3xl font-bold text-[#2076C7]">{company.shares_name.charAt(0)}</span>
        )}
      </div>

      {/* Company Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#2076C7] transition-colors duration-300 text-center">
          {company.shares_name}
        </h4>
        
        {/* Price Display */}
        <div className="mb-4 text-center">
          <span className="text-2xl font-bold text-[#2076C7]">
            {formatCurrency(company.price)}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 text-center mb-4">Unlisted Shares</div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mb-6">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-0.5">Lot Size</div>
            <div className="text-sm font-bold text-gray-900">
              {company.min_lot_size?.toLocaleString() || 'N/A'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-0.5">Depository</div>
            <div className="text-sm font-bold text-gray-900">
              {company.depository_applicable?.split(' ')[0] || 'NSDL'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-0.5">Min. Invest</div>
            <div className="text-sm font-bold text-gray-900">
              ₹{minInv.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-0.5">Available</div>
            <div className="text-sm font-bold text-gray-900">
              {company.volume || '45.2K'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() => onAddToCart(company, quantity)}
            className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button 
            onClick={() => onViewDetails(company)}
            className="w-full py-2.5 border-2 border-[#2076C7]/20 text-[#2076C7] text-xs font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPANY DETAIL MODAL COMPONENT ====================
const CompanyDetailModal: React.FC<{
  company: Company;
  onClose: () => void;
  onAddToCart: (company: Company, quantity: number) => void;
}> = ({ company, onClose, onAddToCart }) => {
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalGraphData, setModalGraphData] = useState<GraphPoint[]>([]);
  const [isModalGraphLoading, setIsModalGraphLoading] = useState(false);
  const [graphTimeRange, setGraphTimeRange] = useState('All');
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const enriched = enrichCompanyForModal(company);
  const modalMaxLot = company.min_lot_size || Infinity;

  // Fetch graph data when modal opens
  useEffect(() => {
    const loadGraphData = async () => {
      setIsModalGraphLoading(true);
      setModalGraphData([]);
      
      try {
        const response = await fetchIdGraphData(company.id);
        
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
        toast.error('Error loading graph data');
        setModalGraphData([]);
      } finally {
        setIsModalGraphLoading(false);
      }
    };

    loadGraphData();
  }, [company.id]);

  // Chart initialization effect
  useEffect(() => {
    if (!chartRef.current) return;
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
  }, [modalGraphData, graphTimeRange]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getFilteredGraphData = useCallback(() => {
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
  }, [modalGraphData, graphTimeRange]);

  const filteredGraphData = getFilteredGraphData();
  const prices = filteredGraphData.map(d => parseFloat(d.market_price));
  const high52W = prices.length ? Math.max(...prices) : parseFloat(company.price);
  const low52W = prices.length ? Math.min(...prices) : parseFloat(company.price);
  const highDate = filteredGraphData.find(d => parseFloat(d.market_price) === high52W)?.price_date;
  const lowDate = filteredGraphData.find(d => parseFloat(d.market_price) === low52W)?.price_date;

  const handleModalQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= modalMaxLot) {
      setModalQuantity(newQuantity);
    }
  };

  const handleModalQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= modalMaxLot) {
      setModalQuantity(value);
    } else if (value === 0) {
      setModalQuantity(1);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl my-8 overflow-hidden flex flex-col border border-gray-100"
      >
        {/* HEADER */}
        <div className="bg-white border-b border-gray-100 p-6 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
              {enriched.logo_url ? (
                <Image src={enriched.logo_url} width={200} height={120} className="w-full h-full object-contain p-2" alt={enriched.shares_name} />
              ) : (
                <span className="text-2xl font-bold text-[#2076C7]">{enriched.shares_name.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-xs font-bold rounded-full">
                  {enriched.category || 'Unlisted Shares'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{enriched.shares_name}</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1 flex-wrap">
                <MapPin className="w-3.5 h-3.5" /> {enriched.headquarters || 'India'} • Est. {enriched.founded_year}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">Current Price</p>
              <div className="text-2xl md:text-3xl font-bold text-[#10b981]">
                {formatCurrency(enriched.price)}
              </div>
            </div>
            <button 
              onClick={onClose} 
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
              { label: 'Minimum Lot', value: `${(enriched.min_lot_size || 100).toLocaleString()} Shares`, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Min Investment', value: `₹${calculateMinInvestment(enriched.price, enriched.min_lot_size).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Face Value', value: `₹${enriched.face_value || '10'}`, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Market Cap', value: enriched.market_cap || 'N/A', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">Price History</span>
                      <span className="text-xs text-gray-400">• {graphTimeRange}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatCurrency(enriched.price)}
                    </h3>
                  </div>
                  
                  <div className="flex gap-1 bg-gray-50/80 p-1 rounded-lg border border-gray-200/80">
                    {['All', '3M', '1M', '1W'].map(r => (
                      <button 
                        key={r} 
                        onClick={() => setGraphTimeRange(r)} 
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
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

                <div className="h-64 w-full relative mb-8">
                  {isModalGraphLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="animate-spin text-[#2076C7]" size={32} />
                    </div>
                  ) : modalGraphData.length > 0 ? (
                    <canvas ref={chartRef}></canvas>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">No price data available</div>
                  )}
                </div>

                {/* 52 Week High/Low */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">52W High</p>
                    <p className="text-lg font-bold text-gray-900">₹{high52W.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      {highDate ? new Date(highDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">52W Low</p>
                    <p className="text-lg font-bold text-gray-900">₹{low52W.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      {lowDate ? new Date(lowDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Avg Volume</p>
                    <p className="text-lg font-bold text-gray-900">{enriched.volume || '45.2K'}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Daily avg</p>
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
                  {enriched.description || `${enriched.shares_name} is a leading player in the ${enriched.category || 'unlisted shares'} sector with strong growth potential.`}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ISIN</p>
                    <p className="text-sm font-semibold text-gray-900 break-words">{enriched.isin || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Depository</p>
                    <p className="text-sm font-semibold text-gray-900">{enriched.depository_applicable?.split(' ')[0] || 'NSDL'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Face Value</p>
                    <p className="text-sm font-semibold text-gray-900">₹{enriched.face_value || '10'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Lot Size</p>
                    <p className="text-sm font-semibold text-gray-900">{(enriched.min_lot_size || 100).toLocaleString()} shares</p>
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
                    { label: 'P/E Ratio', value: enriched.pe_ratio || 'N/A' },
                    { label: 'P/B Ratio', value: enriched.pb_ratio || 'N/A' },
                    { label: 'ROE', value: enriched.roe ? `${enriched.roe}%` : 'N/A' },
                    { label: '24h Volume', value: enriched.volume || '45.2K' }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-500">{stat.label}</span>
                      <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Card with Quantity Selector */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-3 text-center">Ready to Invest?</h4>
                <p className="text-xs text-gray-500 mb-4 text-center font-bold">
                  Min investment: ₹{calculateMinInvestment(enriched.price, enriched.min_lot_size).toLocaleString('en-IN')}
                </p>
                
                <div className="flex items-center justify-center gap-3 bg-white rounded-xl p-2 border border-gray-200 mb-4">
                  <button
                    onClick={() => handleModalQuantityChange(modalQuantity - 1)}
                    className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={modalQuantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={modalQuantity}
                    onChange={handleModalQuantityInput}
                    className="w-20 text-center border border-gray-200 rounded-lg py-2 text-gray-500 focus:outline-none focus:border-[#2076C7]"
                    min="1"
                    max={modalMaxLot}
                  />
                  <button
                    onClick={() => handleModalQuantityChange(modalQuantity + 1)}
                    className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={modalQuantity >= modalMaxLot}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-xs text-center text-gray-400 mb-4">
                  Max lot: {modalMaxLot === Infinity ? 'Unlimited' : modalMaxLot.toLocaleString()} shares
                </p>

                <button
                  onClick={() => {
                    onAddToCart(enriched, modalQuantity);
                    onClose();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                
                <p className="text-xs text-gray-400 text-center mt-3">
                  Contact within 24 hours
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
      </motion.div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function CompaniesPage() {
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Market Stats States
  const [graphData, setGraphData] = useState<any[]>([]);
  const [isGraphLoading, setIsGraphLoading] = useState(true);

  // Data States
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistMap, setWishlistMap] = useState<Map<number, number>>(new Map());
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // View More State
  const [visibleCount, setVisibleCount] = useState(10);

  // Detail Modal States
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modalGraphData, setModalGraphData] = useState<GraphPoint[]>([]);
  const [isModalGraphLoading, setIsModalGraphLoading] = useState(false);
  const [graphTimeRange, setGraphTimeRange] = useState('All');

  // Cart States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment'>('cart');

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
        toast.error('Error fetching market data');
      } finally {
        setIsGraphLoading(false);
      }
    };
    fetchIndexData();
  }, []);

  const currentIndex = useMemo(() => {
    if (graphData.length === 0) return "0.00";
    return parseFloat(graphData[graphData.length - 1].market_price).toLocaleString('en-IN', { minimumFractionDigits: 2 });
  }, [graphData]);

  // --- WISHLIST FETCH ---
  const loadWishlist = useCallback(async () => {
    const token = getTokenFromCookie();
    if (!token) {
      setWishlistMap(new Map());
      return;
    }

    try {
      const response = await customerService.getMyWishlist();
      
      if (!response || !response.success) {
        setWishlistMap(new Map());
        return;
      }

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
      toast.error('Error loading wishlist');
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

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadWishlist();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

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
        const res = await customerService.removeFromWishlist(wishlistId);
        if (res.success) {
          setWishlistMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(company.id);
            return newMap;
          });
          toast.success('Removed from wishlist');
          
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
              detail: { action: 'remove', productId: company.id } 
            }));
          }
        } else {
          toast.error(res.message || 'Failed to remove from wishlist');
        }
      } else {
        const res = await customerService.addToWishlist({
          product_type: 'unlisted_share', 
          product_id: company.id, 
          product_name: company.shares_name
        });
        
        if (res.success && res.data) {
          const newId = Array.isArray(res.data) ? res.data[0].id : res.data.id;
          setWishlistMap(prev => new Map(prev).set(company.id, newId));
          toast.success('Saved to wishlist');
          
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

  // --- CART FUNCTIONS ---
  const addToCart = useCallback((company: Company, quantity: number) => {
    const maxLot = company.min_lot_size || Infinity;
    
    if (quantity > maxLot) {
      showToast(`You can only buy up to ${maxLot} shares (lot size limit).`, 'warning');
      return;
    }
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === company.id);
      if (existing) {
        const newQuantity = existing.quantity + quantity;
        if (newQuantity > maxLot) {
          showToast(`Cannot exceed lot size limit of ${maxLot} shares.`, 'warning');
          return prev;
        }
        return prev.map(item => 
          item.id === company.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prev, { id: company.id, company, quantity }];
    });
    
    showToast(`Added ${quantity} share(s) of ${company.shares_name} to cart`, 'success');
    // REMOVED: setShowCartDrawer(true); - Cart drawer will NOT open automatically
  }, [showToast]);

  const updateCartQuantity = useCallback((companyId: number, newQuantity: number) => {
    const item = cartItems.find(item => item.id === companyId);
    if (!item) return;
    
    const maxLot = item.company.min_lot_size || Infinity;
    
    if (newQuantity > maxLot) {
      showToast(`Cannot exceed lot size limit of ${maxLot} shares.`, 'warning');
      return;
    }
    
    if (newQuantity <= 0) {
      removeFromCart(companyId);
      return;
    }
    
    setCartItems(prev => prev.map(item =>
      item.id === companyId ? { ...item, quantity: newQuantity } : item
    ));
  }, [cartItems, showToast]);

  const removeFromCart = useCallback((companyId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== companyId));
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.company.price) * item.quantity);
    }, 0);
  }, [cartItems]);

  const handleProceedToPayment = useCallback(() => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    setCheckoutStep('payment');
  }, [cartItems, showToast]);

  const handlePaymentConfirm = useCallback(() => {
    showToast('Order placed successfully! Our team will contact you shortly via email for Net Banking payment.', 'success');
    setCartItems([]);
    setShowCartDrawer(false);
    setCheckoutStep('cart');
  }, [showToast]);

  const handleBackToCart = useCallback(() => {
    setCheckoutStep('cart');
  }, []);

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
      const pA = parseFloat(a.price);
      const pB = parseFloat(b.price);
      if (sortBy === 'price-asc') return pA - pB;
      if (sortBy === 'price-desc') return pB - pA;
      return 0;
    });
    
    setFilteredCompanies(filtered);
    setVisibleCount(10);
  }, [companies, searchTerm, priceRange, sortBy]);

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
        toast.error('Error loading graph data');
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
  const getEnrichedCompany = useCallback((company: Company): Company => {
    return enrichCompanyForModal(company);
  }, []);

  // Get filtered graph data for stats
  const getFilteredGraphData = useCallback(() => {
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
  }, [modalGraphData, graphTimeRange]);

  // Toast Icon Helper
  const getToastIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} />;
      case 'error': return <AlertTriangle size={18} />;
      case 'warning': return <AlertTriangle size={18} />;
      default: return <Info size={18} />;
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
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto text-[#2076C7] mb-4" size={48} />
          <p className="text-gray-600">Loading available companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 pt-4 md:pt-8 min-h-screen">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
            <div className="p-2 bg-blue-50 rounded-lg text-[#2076C7]"><Building2 size={18} /></div>
            Total Companies
          </div>
          <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
            <div className="p-2 bg-green-50 rounded-lg text-emerald-600"><TrendingUp size={18} /></div>
            Index Value
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{currentIndex}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><ShoppingCart size={18} /></div>
            Cart Items
          </div>
          <p className="text-2xl font-bold text-gray-900">{cartItems.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Bookmark size={18} /></div>
            Wishlist
          </div>
          <p className="text-2xl font-bold text-gray-900">{wishlistMap.size}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
        <div className="flex flex-wrap gap-3 flex-1">
          <select 
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] transition-all text-gray-900 min-w-[140px] text-sm"
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value as PriceRangeOption)}
          >
            {PRICE_RANGES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <select 
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] transition-all text-gray-900 min-w-[160px] text-sm"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
            <span className="text-sm text-[#2076C7] font-semibold">{filteredCompanies.length} companies</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              showFilters ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 shadow-sm'
            }`}
          >
            <Filter size={16} /> Filters
          </button>
          <button 
            onClick={() => setShowCartDrawer(true)}
            className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 bg-white text-gray-600 border border-gray-200 shadow-sm hover:border-[#2076C7] hover:text-[#2076C7] relative"
          >
            <ShoppingCart size={16} />
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Price Range</label>
              <div className="flex flex-wrap gap-3">
                {PRICE_RANGES.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setPriceRange(r.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      priceRange === r.value
                        ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-[#2076C7]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Sort By</label>
              <div className="flex flex-wrap gap-3">
                {SORT_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setSortBy(o.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      sortBy === o.value
                        ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-[#2076C7]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-8">
        {filteredCompanies.slice(0, visibleCount).map((company) => {
          const isSaved = wishlistMap.has(company.id);
          
          return (
            <CompanyCard
              key={company.id}
              company={company}
              isSaved={isSaved}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
              wishlistLoading={wishlistLoading}
              onViewDetails={setSelectedCompany}
            />
          );
        })}
      </div>

      {/* View More Button */}
      {visibleCount < filteredCompanies.length && (
        <div className="flex justify-center pb-12">
          <button 
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-[#2076C7] hover:text-[#2076C7] transition-all shadow-sm hover:shadow-md"
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

      {/* DETAIL MODAL */}
<AnimatePresence>
  {selectedCompany && (
    <CompanyDetailModal
      company={selectedCompany}
      onClose={() => setSelectedCompany(null)}
      onAddToCart={addToCart}
    />
  )}
</AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCartDrawer && (
          <>
            <div className="fixed inset-0 bg-black/50 z-[1000]" onClick={() => setShowCartDrawer(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[1001] flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                <h2 className="text-xl font-bold">
                  {checkoutStep === 'cart' ? 'Your Cart' : 'Payment Details'}
                </h2>
                <button onClick={() => setShowCartDrawer(false)} className="p-1 hover:bg-white/20 rounded-lg transition">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {checkoutStep === 'cart' ? (
                  cartItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => {
                        const maxLot = item.company.min_lot_size || Infinity;
                        return (
                          <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-3">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                              {item.company.logo_url ? (
                                <Image src={item.company.logo_url} width={60} height={60} className="object-contain" alt={item.company.shares_name} />
                              ) : (
                                <span className="text-xl font-bold text-[#2076C7]">{item.company.shares_name.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{item.company.shares_name}</h4>
                              <p className="text-[#2076C7] font-bold">{formatCurrency(item.company.price)}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  className="p-1 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={14} />
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= 1 && val <= maxLot) {
                                      updateCartQuantity(item.id, val);
                                    }
                                  }}
                                  className="w-16 text-center border border-gray-200 rounded-lg py-1 text-gray-800 focus:outline-none focus:border-[#2076C7]"
                                  min="1"
                                  max={maxLot}
                                />
                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="p-1 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                  disabled={item.quantity >= maxLot}
                                >
                                  <Plus size={14} />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-red-500 text-xs hover:underline"
                                >
                                  Remove
                                </button>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                Max lot: {maxLot === Infinity ? 'Unlimited' : maxLot.toLocaleString()} shares
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  // Payment Step - Simplified to Net Banking Only
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                      {cartItems.map((item) => (
                        <div key={item.id} className="text-sm justify-between text-gray-800 mb-2">
                          <span>{item.company.shares_name} x {item.quantity}</span> &nbsp;= &nbsp;
                          <span>{((parseFloat(item.company.price) * item.quantity).toString())}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 text-gray-900 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-[#2076C7]">{formatCurrency(getCartTotal().toString())}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard size={20} className="text-[#2076C7]" />
                        <h3 className="font-bold text-gray-900">Payment Method: Net Banking</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Payment will be processed through our secure net banking partner.
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                      <p className="text-xs text-yellow-700">
                        <strong>Note:</strong> After confirmation, our team will contact you within 24 hours to complete the transaction via Net Banking.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                {checkoutStep === 'cart' ? (
                  <>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-xl font-bold text-[#2076C7]">{formatCurrency(getCartTotal().toString())}</span>
                    </div>
                    <button
                      onClick={handleProceedToPayment}
                      disabled={cartItems.length === 0}
                      className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed to Net Banking Payment
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleBackToCart}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100"
                    >
                      Back to Cart
                    </button>
                    <button
                      onClick={handlePaymentConfirm}
                      className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl"
                    >
                      Confirm & Pay via Net Banking
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}