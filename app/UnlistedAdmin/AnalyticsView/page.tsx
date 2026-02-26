'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UnlistedAnalyticsService } from '../../services/unlistedAnalyticsService';
import { 
  Building2, IndianRupee, TrendingUp, Activity, CheckCircle2, AlertCircle, 
  Clock, Loader2, BarChart3, LineChart, PieChart, ArrowUpRight, ArrowDownRight, 
  Download, Filter, Search, AlertTriangle, Shield, Bell, Eye, Database, FileText,
  LayoutDashboard, Layers, Flame, X, Calendar, Hash, User, Briefcase, Package,
  ShoppingCart, HandCoins, Inbox
} from 'lucide-react';

// Types
interface HighInvestmentAlert {
  share_id: number;
  company_name: string;
  price: string;
  min_lot_size: number;
  min_investment: string;
}

interface Transaction {
  txn_id: number;
  user_name: string;
  asset_name: string;
  transaction_type: 'BUY' | 'SELL';
  quantity: number;
  price: string;
  total_amount: string;
  status: string;
  timestamp: string;
}

interface FilterItem {
  [key: string]: any;
}

const AnalyticsView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [summary, setSummary] = useState<any>(null);
  const [priceTrends, setPriceTrends] = useState<any[]>([]);
  const [highInvestmentAlerts, setHighInvestmentAlerts] = useState<HighInvestmentAlert[]>([]);
  const [volumeTrends, setVolumeTrends] = useState<{date: string, buy: number, sell: number}[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // New state for transactions
  
  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [shareFilters, setShareFilters] = useState<any[]>([]);
  const [transactionFilters, setTransactionFilters] = useState<any[]>([]);

  // Filter input states
  const [shareFilterParams, setShareFilterParams] = useState({
    company_name: '',
    min_price: '',
    max_price: ''
  });
  
  const [transactionFilterParams, setTransactionFilterParams] = useState({
    company_name: '',
    transaction_type: '',
    status: ''
  });

  // Price distribution
  const [priceDistribution, setPriceDistribution] = useState<{name: string, value: number, color: string}[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        sData, 
        pData, 
        vData,
        highInvData,
        txnData, // New: fetch transactions
        shareFilterData,
        transactionFilterData
      ] = await Promise.allSettled([
        UnlistedAnalyticsService.getSharesSummary(),
        UnlistedAnalyticsService.getSharePriceTrends(period),
        UnlistedAnalyticsService.getBuySellTrends(period),
        UnlistedAnalyticsService.getHighInvestmentAlerts(),
        UnlistedAnalyticsService.filterTransactions({}), // Fetch all transactions
        UnlistedAnalyticsService.filterShares(),
        UnlistedAnalyticsService.filterTransactions()
      ]);

      // Handle Shares Summary
      if (sData.status === 'fulfilled') setSummary(sData.value);
      
      // Handle Price Trends and Distribution
      if (pData.status === 'fulfilled') {
        const trends = Array.isArray(pData.value) ? pData.value : [];
        setPriceTrends(trends);
        
        if (trends.length > 0) {
          const prices = trends.map(t => Number(t.avg_price) || 0);
          const total = prices.reduce((a, b) => a + b, 0);
          
          const ranges = [
            { min: 0, max: 1000, name: 'Under ₹1K', color: '#3b82f6' },
            { min: 1000, max: 5000, name: '₹1K - ₹5K', color: '#10b981' },
            { min: 5000, max: 10000, name: '₹5K - ₹10K', color: '#f59e0b' },
            { min: 10000, max: 50000, name: '₹10K - ₹50K', color: '#ef4444' },
            { min: 50000, max: Infinity, name: 'Above ₹50K', color: '#8b5cf6' },
          ];

          const distribution = ranges.map(range => {
            const value = prices
              .filter(p => p >= range.min && p < range.max)
              .reduce((a, b) => a + b, 0);
            return {
              ...range,
              value: total > 0 ? (value / total) * 100 : 0
            };
          }).filter(item => item.value > 0);

          setPriceDistribution(distribution);
        }
      }
      
      // Handle High Investment Alerts
      if (highInvData.status === 'fulfilled') {
        if (highInvData.value && 
            typeof highInvData.value === 'object' && 
            'data' in highInvData.value && 
            Array.isArray(highInvData.value.data)) {
          setHighInvestmentAlerts(highInvData.value.data);
        } else if (Array.isArray(highInvData.value)) {
          setHighInvestmentAlerts(highInvData.value);
        } else {
          setHighInvestmentAlerts([]);
        }
      } else {
        setHighInvestmentAlerts([]);
      }

      // NEW: Handle Transactions
      if (txnData.status === 'fulfilled') {
        console.log('Transactions Response:', txnData.value);
        if (Array.isArray(txnData.value)) {
          setTransactions(txnData.value);
        } else if (txnData.value && 
                   typeof txnData.value === 'object' && 
                   'data' in txnData.value && 
                   Array.isArray(txnData.value.data)) {
          setTransactions(txnData.value.data);
        } else {
          setTransactions([]);
        }
      } else {
        console.error('Failed to fetch transactions:', txnData.reason);
        setTransactions([]);
      }

      // Handle Buy/Sell Trends
      if (vData.status === 'fulfilled' && vData.value && typeof vData.value === 'object') {
        const transformed = Object.entries(vData.value).map(([date, val]: [string, any]) => ({
          date,
          buy: val.BUY || 0,
          sell: val.SELL || 0
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setVolumeTrends(transformed);
      }

      // Handle Filter Data
      if (shareFilterData.status === 'fulfilled') {
        setShareFilters(Array.isArray(shareFilterData.value) ? shareFilterData.value : []);
      }
      
      if (transactionFilterData.status === 'fulfilled') {
        setTransactionFilters(Array.isArray(transactionFilterData.value) ? transactionFilterData.value : []);
      }

    } catch (error) {
      console.error("Analytics fetch error:", error);
      setShareFilters([]);
      setTransactionFilters([]);
      setHighInvestmentAlerts([]);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const applyShareFilters = async () => {
    try {
      const params: any = {};
      if (shareFilterParams.company_name) params.company_name = shareFilterParams.company_name;
      if (shareFilterParams.min_price) params.min_price = shareFilterParams.min_price;
      if (shareFilterParams.max_price) params.max_price = shareFilterParams.max_price;
      
      const data = await UnlistedAnalyticsService.filterShares(params);
      setShareFilters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error applying share filters:", error);
      setShareFilters([]);
    }
  };

  const applyTransactionFilters = async () => {
    try {
      const params: any = {};
      if (transactionFilterParams.company_name) params.company_name = transactionFilterParams.company_name;
      if (transactionFilterParams.transaction_type) params.transaction_type = transactionFilterParams.transaction_type;
      if (transactionFilterParams.status) params.status = transactionFilterParams.status;
      
      const data = await UnlistedAnalyticsService.filterTransactions(params);
      setTransactionFilters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error applying transaction filters:", error);
      setTransactionFilters([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  const formatCurrency = (value: number | string | null | undefined) => {
    if (!value) return '₹0';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'rejected': 
      case 'failed': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getVolumeChartPoints = (type: 'buy' | 'sell') => {
    if (!Array.isArray(volumeTrends) || volumeTrends.length === 0) return '';
    const dataPoints = volumeTrends.slice(-12);
    if (dataPoints.length === 1) return '50,50';
    const points = dataPoints.map((item, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      const val = type === 'buy' ? Number(item.buy) || 0 : Number(item.sell) || 0;
      const maxVolume = Math.max(...volumeTrends.map(v => Math.max(Number(v.buy), Number(v.sell))), 1);
      const y = 100 - ((val / maxVolume) * 80);
      return `${x},${Math.max(0, Math.min(100, y))}`;
    }).join(' ');
    return points;
  };

  const generatePieSlices = () => {
    if (!Array.isArray(priceDistribution) || priceDistribution.length === 0) return null;
    let cumulativeAngle = 0;
    const centerX = 150; const centerY = 150; const radius = 120;
    return priceDistribution.map((slice, index) => {
      const angle = (slice.value / 100) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      cumulativeAngle += angle;
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      const largeArcFlag = angle > 180 ? 1 : 0;
      const path = [`M ${centerX} ${centerY}`, `L ${x1} ${y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, 'Z'].join(' ');
      return (
        <g key={index} className="group cursor-pointer">
          <path d={path} fill={slice.color} stroke="white" strokeWidth="2" className="transition-all duration-300 group-hover:opacity-80" />
        </g>
      );
    });
  };

  // Calculate transaction stats
  const pendingTransactions = transactions.filter(t => t.status === 'PENDING').length;
  const approvedTransactions = transactions.filter(t => t.status === 'APPROVED').length;
  const totalVolume = transactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalValue = transactions.reduce((sum, t) => sum + parseFloat(t.total_amount), 0);

  if (loading && !summary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 text-[#2076C7] animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Analytics View...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Analytics View
            </h3>
            <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
              <Activity className="w-4 h-4" />
              Real-time unlisted market insights
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-xs font-bold uppercase"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button 
              onClick={() => UnlistedAnalyticsService.exportSharesCSV()}
              className="flex-1 md:flex-none px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-xs font-bold uppercase hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation - Added Transactions tab */}
      <div className="flex border-b border-gray-100 gap-8 px-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'transactions', label: 'Transactions', icon: FileText },
          { id: 'alerts', label: 'Alerts', icon: Bell },
          { id: 'filters', label: 'Filters', icon: Filter }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2076C7] rounded-t-full" />}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Listings', val: summary?.totalCompanies || 0, icon: Building2, color: 'from-blue-500 to-cyan-500' },
              { label: 'Market Valuation', val: formatCurrency(summary?.totalMinInvestment || 0), icon: IndianRupee, color: 'from-green-500 to-emerald-500' },
              { label: 'Platform Volume', val: (summary?.totalShares || 0).toLocaleString(), icon: Database, color: 'from-orange-500 to-yellow-500' },
              { label: 'Transactions', val: transactions.length, icon: FileText, color: 'from-rose-500 to-pink-500' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }} 
                  key={idx} 
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white shadow-sm mb-4`}>
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                  <h2 className="text-2xl font-black text-gray-900 mt-1">{item.val}</h2>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price Distribution */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-2 mb-8">
                <PieChart className="w-5 h-5" />
                Price Distribution
              </h4>
              
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 300 300" className="w-full h-full transform -rotate-90">
                    {generatePieSlices()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 bg-white rounded-full shadow-inner flex flex-col items-center justify-center">
                      <span className="text-[10px] text-gray-400 font-black uppercase">Market</span>
                      <span className="text-xl font-black text-[#2076C7]">
                        {Array.isArray(priceDistribution) && priceDistribution.length > 0 ? 'ACTIVE' : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Market Breakdown
                  </h5>
                  {Array.isArray(priceDistribution) && priceDistribution.map((item, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-bold text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-black text-gray-900">{item.value.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500" 
                          style={{ width: `${item.value}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Stats Card */}
            <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 shadow-lg text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Market Cap</p>
                  <h2 className="text-2xl font-black">{formatCurrency(summary?.totalMinInvestment || 0)}</h2>
                </div>
              </div>
              
              <div className="space-y-5">
                {[
                  { label: 'Highest Price', val: formatCurrency(summary?.highestSharePrice || 0), icon: ArrowUpRight },
                  { label: 'Lowest Price', val: formatCurrency(summary?.lowestSharePrice || 0), icon: ArrowDownRight },
                  { label: 'Total Volume', val: (summary?.totalShares || 0).toLocaleString(), icon: Database },
                  { label: 'Transactions', val: transactions.length, icon: FileText }
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <span className="text-sm font-medium opacity-80 flex items-center gap-1">
                        <Icon className="w-4 h-4" />
                        {row.label}
                      </span>
                      <span className="font-black text-lg">{row.val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Volume Trend */}
          {Array.isArray(volumeTrends) && volumeTrends.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8 flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Trading Volume Trend
              </h4>
              <div className="relative h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="buyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="sellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={`0,100 ${getVolumeChartPoints('buy')} 100,100`} fill="url(#buyGradient)" />
                  <polyline points={getVolumeChartPoints('buy')} fill="none" stroke="#10b981" strokeWidth="1" strokeLinecap="round" />
                  <polyline points={getVolumeChartPoints('sell')} fill="none" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" strokeDasharray="2,2" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] font-black text-gray-400 mt-4">
                  {volumeTrends.slice(-12).map((item, index) => (
                    <span key={index}>{formatShortDate(item.date)}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-8 mt-10 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Buy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-rose-500 rounded-full" />
                  <span className="text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3 text-rose-500" /> Sell
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Transactions Tab - NEW */}
      {activeTab === 'transactions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Transaction Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Transactions', val: transactions.length, icon: FileText, color: 'from-blue-500 to-cyan-500' },
              { label: 'Pending', val: pendingTransactions, icon: Clock, color: 'from-amber-500 to-yellow-500' },
              { label: 'Approved', val: approvedTransactions, icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
              { label: 'Total Volume', val: totalVolume.toLocaleString(), icon: Package, color: 'from-rose-500 to-pink-500' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }} 
                  key={idx} 
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white shadow-sm mb-4`}>
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                  <h2 className="text-2xl font-black text-gray-900 mt-1">{item.val}</h2>
                </motion.div>
              );
            })}
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Recent Transactions
              </h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">Quantity</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">Total</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.length > 0 ? (
                    transactions.map((tx) => (
                      <tr key={tx.txn_id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                            <Hash className="w-3 h-3 text-gray-300" /> #{tx.txn_id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7] font-bold text-xs">
                              {tx.user_name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="font-medium text-gray-800">{tx.user_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-gray-300" />
                            <span className="text-sm text-gray-700">{tx.asset_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${
                            tx.transaction_type === 'BUY' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {tx.transaction_type === 'BUY' ? (
                              <><ShoppingCart className="w-3 h-3" /> BUY</>
                            ) : (
                              <><HandCoins className="w-3 h-3" /> SELL</>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">{tx.quantity.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatCurrency(tx.price)}</td>
                        <td className="px-6 py-4 text-right font-black text-[#2076C7]">{formatCurrency(tx.total_amount)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                            tx.status === 'APPROVED' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : tx.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}>
                            {tx.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                            {tx.status === 'PENDING' && <Clock className="w-3 h-3" />}
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(tx.timestamp)}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Inbox className="w-16 h-16 mb-4 opacity-20" />
                          <p className="text-lg font-bold text-gray-600 mb-2">No transactions found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  High Value Risks
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-4xl font-black text-rose-500">
                    {Array.isArray(highInvestmentAlerts) ? highInvestmentAlerts.length : 0}
                  </p>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Flagged</span>
                </div>
              </div>
            </div>
          </div>

          {Array.isArray(highInvestmentAlerts) && highInvestmentAlerts.length > 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                High Investment Alerts ({highInvestmentAlerts.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <tr>
                      <th className="px-4 py-4">Company</th>
                      <th className="px-4 py-4">Price</th>
                      <th className="px-4 py-4">Min Lot Size</th>
                      <th className="px-4 py-4">Min Investment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {highInvestmentAlerts.map((alert) => (
                      <tr key={alert.share_id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-4 font-bold text-gray-800">{alert.company_name}</td>
                        <td className="px-4 py-4 text-sm font-medium">{formatCurrency(alert.price)}</td>
                        <td className="px-4 py-4 text-sm font-medium">{alert.min_lot_size?.toLocaleString() || 'N/A'}</td>
                        <td className="px-4 py-4 font-black text-rose-500">{formatCurrency(alert.min_investment)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No high investment alerts found</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Filters Tab */}
// Add filter input UI in the Filters tab
{activeTab === 'filters' && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    
    {/* Share Filters Section with Actual Inputs */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Database className="w-4 h-4" />
        Filter Shares
      </h4>
      
      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Company Name"
          value={shareFilterParams.company_name}
          onChange={(e) => setShareFilterParams({...shareFilterParams, company_name: e.target.value})}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={shareFilterParams.min_price}
          onChange={(e) => setShareFilterParams({...shareFilterParams, min_price: e.target.value})}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={shareFilterParams.max_price}
          onChange={(e) => setShareFilterParams({...shareFilterParams, max_price: e.target.value})}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        />
        <button
          onClick={applyShareFilters}
          className="px-4 py-2 bg-[#2076C7] text-white rounded-xl text-xs font-black uppercase"
        >
          Apply Filters
        </button>
      </div>
      
      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* table headers and rows */}
        </table>
      </div>
    </div>

    {/* Similar Transaction Filters Section */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Filter Transactions
      </h4>
      
      {/* Transaction filter inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Company Name"
          value={transactionFilterParams.company_name}
          onChange={(e) => setTransactionFilterParams({...transactionFilterParams, company_name: e.target.value})}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        />
        <select
          value={transactionFilterParams.transaction_type}
          onChange={(e) => setTransactionFilterParams({...transactionFilterParams, transaction_type: e.target.value})}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        >
          <option value="">All Types</option>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        <select
          value={transactionFilterParams.status}
          onChange={(e) => setTransactionFilterParams({...transactionFilterParams, status: e.target.value})}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={applyTransactionFilters}
          className="px-4 py-2 bg-[#2076C7] text-white rounded-xl text-xs font-black uppercase"
        >
          Apply Filters
        </button>
      </div>
      
      {/* Results Table */}
      <div className="overflow-x-auto">
        {/* transaction table */}
      </div>
    </div>
  </motion.div>
)}
    </div>
  );
};

export default AnalyticsView;