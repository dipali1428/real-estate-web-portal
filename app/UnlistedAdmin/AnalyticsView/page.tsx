'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnlistedAnalyticsService } from '../../services/unlistedAnalyticsService';
import { Building2, IndianRupee, TrendingUp, Activity, CheckCircle2, AlertCircle, Clock, Loader2, BarChart3, LineChart, PieChart,  Check,
  ArrowUpRight, ArrowDownRight, Download, Filter, Search, AlertTriangle, Shield, Bell, Eye, Database, FileText,LayoutDashboard, Layers, Flame
} from 'lucide-react';

// Local interfaces for state management - Kept exactly as provided
interface RecentTransaction {
  txn_id: number;
  company_name: string | null;
  user_name: string | null;
  transaction_type: 'BUY' | 'SELL';
  quantity: number;
  price: string | null;
  total_amount: string | null;
  status: string;
  timestamp?: string;
  createdat?: string;
}

interface HighInvestmentAlert {
  share_id: number;
  company_name: string;
  price: string;
  quantity: number;
  min_investment: string;
}

const AnalyticsView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);
  
  // Data States - Kept exactly as provided
  const [summary, setSummary] = useState<any>(null);
  const [priceTrends, setPriceTrends] = useState<any[]>([]);
  const [recentTxns, setRecentTxns] = useState<RecentTransaction[]>([]);
  const [alerts, setAlerts] = useState<any>(null);
  const [highInvestmentAlerts, setHighInvestmentAlerts] = useState<HighInvestmentAlert[]>([]);
  
  // Volume Trend State
  const [volumeTrends, setVolumeTrends] = useState<{date: string, buy: number, sell: number}[]>([]);
  const [selectedMetric, setSelectedMetric] = useState('price');

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [shareFilters, setShareFilters] = useState<any[]>([]);
  const [transactionFilters, setTransactionFilters] = useState<any[]>([]);

  // Price distribution for pie chart
  const [priceDistribution, setPriceDistribution] = useState<{name: string, value: number, color: string}[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        sData, 
        pData, 
        rData, 
        aData,
        vData,
        highInvData
      ] = await Promise.allSettled([
        UnlistedAnalyticsService.getSharesSummary(),
        UnlistedAnalyticsService.getSharePriceTrends(period),
        UnlistedAnalyticsService.getRecentTransactions(10),
        UnlistedAnalyticsService.getAlerts(),
        UnlistedAnalyticsService.getBuySellTrends(period),
        UnlistedAnalyticsService.getHighInvestmentAlerts()
      ]);

      if (sData.status === 'fulfilled') setSummary(sData.value);
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
      
      if (aData.status === 'fulfilled') setAlerts(aData.value);
      if (highInvData.status === 'fulfilled') setHighInvestmentAlerts(Array.isArray(highInvData.value) ? highInvData.value : []);

      if (rData.status === 'fulfilled') {
        const transactions = rData.value?.data || rData.value || [];
        setRecentTxns(Array.isArray(transactions) ? transactions : []);
      }

      if (vData.status === 'fulfilled' && vData.value && typeof vData.value === 'object') {
        const transformed = Object.entries(vData.value).map(([date, val]: [string, any]) => ({
          date,
          buy: val.BUY || 0,
          sell: val.SELL || 0
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setVolumeTrends(transformed);
      }

      Promise.allSettled([
        UnlistedAnalyticsService.filterShares(),
        UnlistedAnalyticsService.filterTransactions()
      ]).then(([shareFilter, transactionFilter]) => {
        if (shareFilter.status === 'fulfilled') setShareFilters(shareFilter.value || []);
        if (transactionFilter.status === 'fulfilled') setTransactionFilters(transactionFilter.value || []);
      });

    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
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
    if (volumeTrends.length === 0) return '';
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
    if (priceDistribution.length === 0) return null;
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

  if (loading && !summary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 text-[#2076C7] animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Analytics Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* --- HEADER BANNER --- */}
      <div className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Analytics Intelligence
            </h3>
            <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
              <Activity className="w-4 h-4" />
              Real-time unlisted market insights and ledger performance
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
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

      {/* --- TABS NAVIGATION --- */}
      <div className="flex border-b border-gray-100 gap-8 px-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'transactions', label: 'Transactions', icon: FileText },
          { id: 'alerts', label: 'Alerts', icon: Bell },
          { id: 'filters', label: 'Quick Filters', icon: Filter }
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
              {activeTab === tab.id && ( <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2076C7] rounded-t-full" /> )}
            </button>
          );
        })}
      </div>

      {/* --- TAB CONTENT: OVERVIEW --- */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Listings', val: summary?.totalCompanies || 0, icon: Building2, color: 'from-blue-500 to-cyan-500', sub: 'Active Companies' },
              { label: 'Market Valuation', val: formatCurrency(summary?.totalMinInvestment || 0), icon: IndianRupee, color: 'from-green-500 to-emerald-500', sub: 'Total Portfolio' },
              { label: 'Platform Volume', val: (summary?.totalShares || 0).toLocaleString(), icon: Database, color: 'from-orange-500 to-yellow-500', sub: 'Total Shares' },
              { label: 'System Status', val: 'LIVE', icon: Activity, color: 'from-rose-500 to-pink-500', sub: 'Healthy' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 bg-linear-to-r ${item.color} rounded-2xl flex items-center justify-center text-white shadow-sm mb-4`}>
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                  <h2 className="text-2xl font-black text-gray-900 mt-1">{item.val}</h2>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={3} /> {item.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Main Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Price Distribution
                </h4>
                <div className="flex gap-2 bg-gray-50 p-1 rounded-xl">
                  <button onClick={() => setSelectedMetric('price')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${selectedMetric === 'price' ? 'bg-white text-[#2076C7] shadow-sm' : 'text-gray-400'}`}>
                    <BarChart3 className="w-3 h-3" /> Stats
                  </button>
                  <button onClick={() => setSelectedMetric('volume')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${selectedMetric === 'volume' ? 'bg-white text-[#2076C7] shadow-sm' : 'text-gray-400'}`}>
                    <Activity className="w-3 h-3" /> Volume
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 300 300" className="w-full h-full transform -rotate-90">{generatePieSlices()}</svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 bg-white rounded-full shadow-inner flex flex-col items-center justify-center">
                      <span className="text-[10px] text-gray-400 font-black uppercase">Market</span>
                      <span className="text-xl font-black text-[#2076C7]">{priceDistribution.length > 0 ? 'ACTIVE' : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Market Breakdown
                  </h5>
                  {priceDistribution.map((item, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm font-bold text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-black text-gray-900">{item.value.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-500" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Stats Card */}
            <div className="bg-linear-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 shadow-lg text-white">
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
                  { label: '24h Change', val: '+2.4%', icon: TrendingUp, color: 'text-emerald-300' },
                  { label: 'Highest Price', val: formatCurrency(summary?.highestSharePrice || 0), icon: ArrowUpRight },
                  { label: 'Lowest Price', val: formatCurrency(summary?.lowestSharePrice || 0), icon: ArrowDownRight },
                  { label: 'Total Volume', val: (summary?.totalShares || 0).toLocaleString(), icon: Database }
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <span className="text-sm font-medium opacity-80 flex items-center gap-1">
                        <Icon className={`w-4 h-4 ${row.color || ''}`} />
                        {row.label}
                      </span>
                      <span className={`font-black text-lg ${row.color || ''}`}>{row.val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Volume Trend Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-8 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Trading Volume Trend
            </h4>
            <div className="relative h-64 w-full">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="buyGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#10b981" stopOpacity="0.2" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient>
                  <linearGradient id="sellGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></linearGradient>
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
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Buy Orders
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                <span className="text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                  <ArrowDownRight className="w-3 h-3 text-rose-500" /> Sell Orders
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- TAB CONTENT: TRANSACTIONS --- */}
      {activeTab === 'transactions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Transaction Ledger
              </h4>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Audit Trail • Real-time
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setShowFilters(!showFilters)} className="flex-1 px-4 py-2 text-xs font-black text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border border-gray-100 uppercase tracking-widest">
                <Filter className="w-3 h-3" /> Filter
              </button>
              <button onClick={() => UnlistedAnalyticsService.exportTransactionsCSV()} className="flex-1 px-4 py-2 text-xs font-black text-[#2076C7] bg-[#2076C7]/5 rounded-xl hover:bg-[#2076C7]/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-b border-gray-50 bg-gray-50/50 overflow-hidden">
                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search Company..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20" />
                  </div>
                  <select className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20">
                    <option value="">All Types</option>
                    <option value="BUY">Buy</option>
                    <option value="SELL">Sell</option>
                  </select>
                  <select className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20">
                    <option value="">All Status</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PENDING">Pending</option>
                  </select>
                  <button className="px-4 py-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Check className="w-3 h-3" /> Apply
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <tr>
                  <th className="px-6 py-5">Txn Detail</th>
                  <th className="px-6 py-5">Entity</th>
                  <th className="px-6 py-5">Client</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5">Qty</th>
                  <th className="px-6 py-5">Total Amount</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTxns.length > 0 ? recentTxns.map((txn) => (
                  <tr key={txn.txn_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5">
                      <p className="text-xs font-black text-gray-800">#{txn.txn_id}</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(txn.timestamp || txn.createdat)}
                      </p>
                    </td>
                    <td className="px-6 py-5 font-bold text-gray-800 text-sm">{txn.company_name || 'N/A'}</td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-600">{txn.user_name || 'Unknown'}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded text-[10px] font-black flex items-center gap-1 w-fit ${
                        txn.transaction_type === 'BUY' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {txn.transaction_type === 'BUY' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {txn.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-sm">{txn.quantity.toLocaleString()}</td>
                    <td className="px-6 py-5 font-black text-gray-900">{formatCurrency(txn.total_amount)}</td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border flex items-center gap-1 w-fit ${getStatusColor(txn.status)}`}>
                        {txn.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {txn.status === 'pending' && <Clock className="w-3 h-3" />}
                        {txn.status === 'rejected' && <AlertCircle className="w-3 h-3" />}
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-gray-400 font-black uppercase text-xs tracking-widest">
                      <Database className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No transactions discovered
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* --- TAB CONTENT: ALERTS --- */}
      {activeTab === 'alerts' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Pending Approval
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-4xl font-black text-amber-500">{alerts?.pendingTransactions || 0}</p>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Queue</span>
                </div>
                <button 
                  onClick={() => setActiveTab('transactions')} 
                  className="mt-4 px-5 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <Eye className="w-3 h-3" /> View Queue
                </button>
              </div>
            </div>

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
                  <p className="text-4xl font-black text-rose-500">{alerts?.highInvestmentAlerts || 0}</p>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Flagged</span>
                </div>
                <button className="mt-4 px-5 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-3 h-3" /> Audit Risks
                </button>
              </div>
            </div>
          </div>

          {highInvestmentAlerts.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden">
              <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                High Volume Flag Details
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <tr>
                      <th className="px-4 py-4">Company</th>
                      <th className="px-4 py-4">Price</th>
                      <th className="px-4 py-4">Qty</th>
                      <th className="px-4 py-4">Min Investment</th>
                      <th className="px-4 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {highInvestmentAlerts.map((alert) => (
                      <tr key={alert.share_id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-4 font-bold text-gray-800">{alert.company_name}</td>
                        <td className="px-4 py-4 text-sm font-medium">{formatCurrency(alert.price)}</td>
                        <td className="px-4 py-4 text-sm font-medium">{alert.quantity.toLocaleString()}</td>
                        <td className="px-4 py-4 font-black text-rose-500">{formatCurrency(alert.min_investment)}</td>
                        <td className="px-4 py-4">
                          <button className="text-[10px] font-black uppercase tracking-widest text-[#2076C7] bg-[#2076C7]/5 px-4 py-2 rounded-xl flex items-center gap-1">
                            <Eye className="w-3 h-3" /> Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* --- TAB CONTENT: QUICK FILTERS --- */}
      {activeTab === 'filters' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'Share Inventory Preview', data: shareFilters, cols: ['Company', 'Price', 'Qty', 'Min Inv'], icon: Database },
            { title: 'Ledger Entry Preview', data: transactionFilters, cols: ['TXN ID', 'Type', 'Qty', 'Status'], icon: FileText }
          ].map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <div className={`w-8 h-8 ${idx === 0 ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {section.title}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <tr>
                        {section.cols.map((col, i) => (
                          <th key={i} className="px-3 py-3">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {section.data.slice(0, 5).map((item: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-3 py-3 font-bold text-gray-800 text-sm">{item.company_name || `#${item.txn_id}`}</td>
                          <td className="px-3 py-3 text-sm font-medium">
                            {item.price ? (
                              formatCurrency(item.price)
                            ) : (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black flex items-center gap-1 w-fit ${
                                item.transaction_type === 'BUY' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                              }`}>
                                {item.transaction_type === 'BUY' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {item.transaction_type}
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-sm font-medium">{item.quantity}</td>
                          <td className="px-3 py-3 text-sm font-black text-[#2076C7]">
                            {item.min_investment ? (
                              formatCurrency(item.min_investment)
                            ) : (
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${getStatusColor(item.status)}`}>
                                {item.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                                {item.status === 'pending' && <Clock className="w-3 h-3" />}
                                {item.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default AnalyticsView;