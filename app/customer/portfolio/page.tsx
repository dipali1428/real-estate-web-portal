'use client';

import React, { useState, useEffect } from 'react';
import { 
  PieChart, Download, ChevronDown, ChevronUp, Package, 
  IndianRupee, Building, Clock, Loader2, RefreshCw,
  AlertCircle, Briefcase, ArrowUpRight, TrendingUp,
  Layers, BarChart3, Zap, Globe, Shield, Lock,
  Calendar, DollarSign, Percent, Target, Award
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import customerService from '../../services/customerService';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== TYPES ====================

interface PortfolioItem {
  share_id: number;
  company_name: string;
  total_quantity: string;
  price: string;
  invested_value: string;
}

interface PortfolioSummary {
  totalInvested: number;
  totalValue: number;
  totalGain: number;
  absoluteReturn: number;
  xirr: number;
  todayChange: number;
}

interface AssetAllocation {
  assetClass: string;
  amount: number;
  percentage: number;
  color: string;
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

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatLargeNumber = (num: number) => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(2)} K`;
  return `₹${num.toFixed(2)}`;
};

const getCompanyInitials = (name: string) => {
  return name.split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

// ==================== MAIN COMPONENT ====================

export default function PortfolioPage() {
  const router = useRouter();
  const [holdings, setHoldings] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('value-desc');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeTab, setActiveTab] = useState('holdings');
  const [selectedPeriod, setSelectedPeriod] = useState('1y');

  // ========== FETCH PORTFOLIO DATA ==========
  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getTokenFromCookie();
        
        if (!token) {
          router.push('/');
          return;
        }

        localStorage.setItem('token', token);
        
        const response = await customerService.getPortfolio();
        
        if (response.success) {
          setHoldings(response.data);
          setLastUpdated(new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
        } else {
          setError('Failed to load portfolio data');
        }
      } catch (err: any) {
        console.error('Portfolio fetch error:', err);
        
        if (err.response?.status === 401) {
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(err.response?.data?.message || 'Failed to load portfolio');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
    
    const interval = setInterval(fetchPortfolio, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ========== TOGGLE ROW EXPAND ==========
  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // ========== SORT HOLDINGS ==========
  const sortedHoldings = [...holdings].sort((a, b) => {
    const aValue = parseFloat(a.invested_value);
    const bValue = parseFloat(b.invested_value);
    const aName = a.company_name;
    const bName = b.company_name;
    
    switch (sortBy) {
      case 'value-desc': return bValue - aValue;
      case 'value-asc': return aValue - bValue;
      case 'name-asc': return aName.localeCompare(bName);
      case 'name-desc': return bName.localeCompare(aName);
      default: return 0;
    }
  });

  // ========== CALCULATE PORTFOLIO SUMMARY ==========
  const summary: PortfolioSummary = {
    totalInvested: holdings.reduce((sum, h) => sum + parseFloat(h.invested_value), 0),
    totalValue: holdings.reduce((sum, h) => sum + (parseFloat(h.price) * parseFloat(h.total_quantity)), 0),
    totalGain: holdings.reduce((sum, h) => {
      const current = parseFloat(h.price) * parseFloat(h.total_quantity);
      const invested = parseFloat(h.invested_value);
      return sum + (current - invested);
    }, 0),
    absoluteReturn: 0,
    xirr: 14.2,
    todayChange: 2.4
  };
  
  summary.absoluteReturn = summary.totalInvested > 0 
    ? ((summary.totalValue - summary.totalInvested) / summary.totalInvested) * 100 
    : 0;

  // ========== ASSET ALLOCATION ==========
  const assetAllocation: AssetAllocation[] = holdings.map((h, index) => {
    const amount = parseFloat(h.invested_value);
    const colors = ['#2076C7', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#14B8A6', '#6B7280'];
    return {
      assetClass: h.company_name,
      amount,
      percentage: summary.totalInvested > 0 ? (amount / summary.totalInvested) * 100 : 0,
      color: colors[index % colors.length]
    };
  }).sort((a, b) => b.amount - a.amount);

  // ========== LIQUIDITY ANALYSIS ==========
  const liquidityAnalysis = {
    liquid: summary.totalValue * 0.7, // 70% assumed liquid for unlisted
    shortTerm: summary.totalValue * 0.2,
    longLockIn: summary.totalValue * 0.1,
    illiquid: 0
  };

  // ========== EXPORT PORTFOLIO ==========
  const exportPortfolio = () => {
    const csvContent = [
      ['Company', 'Quantity', 'Price per Share', 'Total Invested', 'Current Value', 'Gain/Loss'].join(','),
      ...sortedHoldings.map(h => {
        const current = parseFloat(h.price) * parseFloat(h.total_quantity);
        const invested = parseFloat(h.invested_value);
        const gain = current - invested;
        return [
          `"${h.company_name}"`,
          parseFloat(h.total_quantity).toLocaleString(),
          formatCurrency(parseFloat(h.price)),
          formatCurrency(invested),
          formatCurrency(current),
          formatCurrency(gain)
        ].join(',');
      })
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unlisted-portfolio-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 mt-6 font-medium">Loading your unlisted portfolio...</p>
          <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-[600px] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-red-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Portfolio</h3>
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

  // ========== EMPTY STATE ==========
  if (!loading && holdings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-12 h-12 text-[#2076C7]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Unlisted Holdings Yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start building your portfolio by purchasing unlisted shares from our curated list of 150+ pre-IPO companies.
          </p>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-[#2076C7]" />
              Unlisted Portfolio
            </h1>
            <span className="px-3 py-1 bg-[#2076C7]/10 text-[#2076C7] text-xs font-bold rounded-full border border-[#2076C7]/20">
              {holdings.length} {holdings.length === 1 ? 'Holding' : 'Holdings'}
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
              High Risk
            </span>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            Last updated: {lastUpdated || 'Just now'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {['1m', '3m', '6m', '1y', '3y'].map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedPeriod === period
                    ? 'bg-white text-[#2076C7] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {period.toUpperCase()}
              </button>
            ))}
          </div>
          
          <select 
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="value-desc">Investment: High to Low</option>
            <option value="value-asc">Investment: Low to High</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
          
          <button 
            onClick={exportPortfolio}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 flex items-center gap-2 hover:bg-gray-50 transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'summary', name: 'Summary', icon: <Layers size={16} /> },
          { id: 'holdings', name: 'Holdings', icon: <Briefcase size={16} /> },
          { id: 'allocation', name: 'Allocation', icon: <PieChart size={16} /> },
          { id: 'performance', name: 'Performance', icon: <TrendingUp size={16} /> },
          { id: 'income', name: 'Income', icon: <IndianRupee size={16} /> },
          { id: 'tax', name: 'Tax', icon: <Percent size={16} /> },
          { id: 'alerts', name: 'Alerts', icon: <Zap size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#2076C7] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* ========== SUMMARY TAB ========== */}
      <AnimatePresence mode="wait">
        {activeTab === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Portfolio Summary Card */}
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-90 mb-1 flex items-center gap-1">
                    <IndianRupee size={14} />
                    Total Invested
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">
                    {formatLargeNumber(summary.totalInvested)}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1 flex items-center gap-1">
                    <TrendingUp size={14} />
                    Current Value
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">
                    {formatLargeNumber(summary.totalValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1 flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    Total Gain/Loss
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${summary.totalGain >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {summary.totalGain >= 0 ? '+' : '-'}{formatLargeNumber(Math.abs(summary.totalGain))}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
                <div>
                  <p className="text-xs opacity-80">Absolute Return</p>
                  <p className={`text-lg font-bold ${summary.absoluteReturn >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {summary.absoluteReturn >= 0 ? '+' : ''}{summary.absoluteReturn.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-80">XIRR (Annualized)</p>
                  <p className="text-lg font-bold text-green-300">{summary.xirr.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Today's Change</p>
                  <p className="text-lg font-bold text-green-300">+{summary.todayChange}%</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Total Companies</p>
                  <p className="text-lg font-bold">{holdings.length}</p>
                </div>
              </div>
            </div>

            {/* Risk & Liquidity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-[#2076C7]" />
                  Risk Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="font-bold text-orange-600">Very High</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-orange-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Diversification Score</span>
                      <span className="font-bold text-yellow-600">Medium</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 mt-4">
                    <div className="flex gap-2">
                      <AlertCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-orange-700">
                        Unlisted shares are high-risk, illiquid investments. Suitable only for long-term horizon (5+ years).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Lock size={16} className="text-[#2076C7]" />
                  Liquidity Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Liquid (0-7 days)</span>
                      <span className="font-bold text-gray-800">{formatLargeNumber(liquidityAnalysis.liquid)}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Short Term (1 year)</span>
                      <span className="font-bold text-gray-800">{formatLargeNumber(liquidityAnalysis.shortTerm)}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Long Lock-in</span>
                      <span className="font-bold text-gray-800">{formatLargeNumber(liquidityAnalysis.longLockIn)}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== ALLOCATION TAB ========== */}
        {activeTab === 'allocation' && (
          <motion.div
            key="allocation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 lg:col-span-1">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                Asset Allocation
              </h3>
              
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gray-100"></div>
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(${assetAllocation
                      .filter(item => item.percentage > 0.1)
                      .map(item => `${item.color} ${item.percentage * 3.6}deg`)
                      .join(', ')})`
                  }}
                ></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Total</div>
                    <div className="text-lg font-bold text-gray-800">{formatLargeNumber(summary.totalInvested)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {assetAllocation.map((item, index) => (
                  <div key={item.assetClass} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 truncate" title={item.assetClass}>
                        {item.assetClass}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-gray-800 font-bold">{item.percentage.toFixed(1)}%</span>
                      <span className="text-gray-400">{formatLargeNumber(item.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equity vs Debt Split */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                  Equity vs Debt Split
                </h3>
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-[#2076C7]">100%</span>
                    </div>
                    <p className="font-medium text-gray-800">Equity</p>
                    <p className="text-xs text-gray-500">Unlisted Shares</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-gray-400">0%</span>
                    </div>
                    <p className="font-medium text-gray-400">Debt</p>
                    <p className="text-xs text-gray-400">No Debt Holdings</p>
                  </div>
                </div>
              </div>

              {/* Top Holdings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                  Top Holdings
                </h3>
                <div className="space-y-3">
                  {sortedHoldings.slice(0, 5).map((holding, idx) => (
                    <div key={holding.share_id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
                        <div>
                          <p className="font-medium text-gray-800">{holding.company_name}</p>
                          <p className="text-xs text-gray-500">{parseFloat(holding.total_quantity).toLocaleString()} shares</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{formatLargeNumber(parseFloat(holding.invested_value))}</p>
                        <p className="text-xs text-gray-500">
                          {((parseFloat(holding.invested_value) / summary.totalInvested) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== PERFORMANCE TAB ========== */}
        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Performance Metrics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-xs text-gray-500 mb-1">CAGR (Annualized)</p>
                <p className="text-2xl font-bold text-green-600">+18.5%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">XIRR</p>
                <p className="text-2xl font-bold text-green-600">{summary.xirr.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Absolute Return</p>
                <p className={`text-2xl font-bold ${summary.absoluteReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summary.absoluteReturn >= 0 ? '+' : ''}{summary.absoluteReturn.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">vs Nifty 500</p>
                <p className="text-2xl font-bold text-green-600">+2.3%</p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-dashed border-blue-200">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-[#2076C7] mx-auto mb-2 opacity-50" />
                <p className="text-sm text-gray-500">Performance Chart: Invested vs Current Value</p>
                <p className="text-xs text-gray-400 mt-1">1Y, 3Y, 5Y view available</p>
              </div>
            </div>

            {/* Rolling Returns */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">1Y Return</p>
                <p className="text-lg font-bold text-green-600">+22.4%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">3Y Return</p>
                <p className="text-lg font-bold text-green-600">+45.8%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">5Y Return</p>
                <p className="text-lg font-bold text-green-600">+98.2%</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== INCOME TAB ========== */}
        {activeTab === 'income' && (
          <motion.div
            key="income"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Income Summary (FY 2024-25)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <p className="text-xs text-gray-600 mb-2">Dividend Income</p>
                <p className="text-2xl font-bold text-[#2076C7]">₹ 45,000</p>
                <p className="text-xs text-gray-500 mt-2">From 3 companies</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <p className="text-xs text-gray-600 mb-2">Interest Income</p>
                <p className="text-2xl font-bold text-green-600">₹ 0</p>
                <p className="text-xs text-gray-500 mt-2">No debt holdings</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <p className="text-xs text-gray-600 mb-2">Capital Gains (Realized)</p>
                <p className="text-2xl font-bold text-purple-600">₹ 1,25,000</p>
                <p className="text-xs text-gray-500 mt-2">From partial exits</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Projected Annual Income</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-800">₹ 1.7L</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== TAX TAB ========== */}
        {activeTab === 'tax' && (
          <motion.div
            key="tax"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Tax Summary (FY 2024-25)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-3">Short-Term Capital Gains</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Realized Gains</span>
                    <span className="font-medium text-gray-800">₹ 85,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Tax Rate</span>
                    <span className="font-medium text-gray-800">15%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Estimated Tax</span>
                    <span className="font-bold text-[#2076C7]">₹ 12,750</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-3">Long-Term Capital Gains</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Realized Gains</span>
                    <span className="font-medium text-gray-800">₹ 40,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Tax Rate</span>
                    <span className="font-medium text-gray-800">10% (over ₹1L)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Estimated Tax</span>
                    <span className="font-bold text-[#2076C7]">₹ 4,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e] transition-colors">
                Download Tax Report
              </button>
            </div>
          </motion.div>
        )}

        {/* ========== ALERTS TAB ========== */}
        {activeTab === 'alerts' && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Portfolio Alerts
            </h3>
            
            <div className="space-y-3">
              <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-500">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Exit Window Opening Soon</p>
                    <p className="text-xs text-yellow-600 mt-1">Ola Electric exit window opens in 15 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                <div className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Over Concentration Alert</p>
                    <p className="text-xs text-orange-600 mt-1">35% of portfolio in single company - consider diversifying</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Lock-in Period Ending</p>
                    <p className="text-xs text-blue-600 mt-1">LIC Housing Finance lock-in ends in 45 days</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== HOLDINGS TABLE (Always Visible) ========== */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Briefcase size={20} className="text-[#2076C7]" />
          Your Holdings
        </h3>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Company</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Quantity</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Price per Share</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Total Invested</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Current Value</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Gain/Loss</th>
                  <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedHoldings.map((holding) => {
                  const quantity = parseFloat(holding.total_quantity);
                  const price = parseFloat(holding.price);
                  const invested = parseFloat(holding.invested_value);
                  const currentValue = price * quantity;
                  const gain = currentValue - invested;
                  const gainPercent = (gain / invested) * 100;
                  const isExpanded = expandedRows.includes(holding.share_id);
                  
                  return (
                    <React.Fragment key={holding.share_id}>
                      <tr className="hover:bg-gray-50 transition-colors group">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => toggleRow(holding.share_id)}
                              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all group-hover:scale-110"
                            >
                              {isExpanded ? 
                                <ChevronUp className="w-4 h-4" /> : 
                                <ChevronDown className="w-4 h-4" />
                              }
                            </button>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-bold">
                              {getCompanyInitials(holding.company_name)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{holding.company_name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Building size={12} />
                                ID: {holding.share_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-medium text-gray-900">{quantity.toLocaleString()}</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-medium text-[#2076C7]">{formatCurrency(price)}</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-medium text-gray-900">{formatCurrency(invested)}</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-medium text-gray-900">{formatCurrency(currentValue)}</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className={`font-bold ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gain >= 0 ? '+' : '-'}{formatCurrency(Math.abs(gain))}
                          </span>
                          <span className={`text-xs ml-1 ${gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ({gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(1)}%)
                          </span>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <Link
                            href={`/products/unlisted/${holding.share_id}`}
                            className="text-[#2076C7] hover:text-[#1a5e9e] text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                      
                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                          <td colSpan={7} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <Package size={14} className="text-[#2076C7]" />
                                  Lock-in Period
                                </div>
                                <div className="font-medium text-gray-900">2 years remaining</div>
                                <div className="text-[10px] text-gray-400 mt-1">Ends: Dec 2026</div>
                              </div>
                              
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <Target size={14} className="text-[#2076C7]" />
                                  Exit Window
                                </div>
                                <div className="font-medium text-gray-900">Q3 2024</div>
                                <div className="text-[10px] text-gray-400 mt-1">Expected IPO</div>
                              </div>
                              
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <Award size={14} className="text-[#2076C7]" />
                                  Last Funding
                                </div>
                                <div className="font-medium text-gray-900">₹ 2,50,000/share</div>
                                <div className="text-[10px] text-gray-400 mt-1">Series F</div>
                              </div>
                              
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <BarChart3 size={14} className="text-[#2076C7]" />
                                  Sector
                                </div>
                                <div className="font-medium text-gray-900">Fintech</div>
                                <div className="text-[10px] text-gray-400 mt-1">High Growth</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-4 pt-4 border-t border-blue-200/50">
                              <Link
                                href={`/products/unlisted/sell?company=${holding.share_id}`}
                                className="px-5 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-md shadow-[#2076C7]/20 flex items-center gap-2"
                              >
                                Request Exit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Portfolio Note */}
      <div className="mt-6 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw size={14} className="animate-spin-slow" />
          <span>Auto-updates every 60 seconds</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Last updated: {lastUpdated || 'Just now'}</span>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}