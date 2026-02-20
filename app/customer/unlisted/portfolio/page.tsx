'use client';

import React, { useState, useEffect } from 'react';
import { 
  PieChart, Download, 
  ChevronDown, ChevronUp, Package, IndianRupee,
  Building, Clock, Loader2, RefreshCw,
  AlertCircle, Briefcase, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import customerService from '../../../services/customerService';

// ==================== TYPES ====================

interface PortfolioItem {
  share_id: number;
  company_name: string;
  total_quantity: string;
  price: string;
  invested_value: string;
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

// ==================== MAIN COMPONENT ====================

export default function PortfolioPage() {
  const router = useRouter();
  const [holdings, setHoldings] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('value-desc');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

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
        
        // Fetch portfolio from your actual API
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
    
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchPortfolio, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ========== TOGGLE ROW EXPAND ==========
  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // ========== EXPORT PORTFOLIO ==========
  const exportPortfolio = () => {
    const csvContent = [
      ['Company', 'Quantity', 'Price per Share', 'Total Invested'].join(','),
      ...sortedHoldings.map(h => [
        `"${h.company_name}"`,
        parseFloat(h.total_quantity).toLocaleString(),
        formatCurrency(parseFloat(h.price)),
        formatCurrency(parseFloat(h.invested_value))
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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

  // ========== CALCULATE TOTALS ==========
  const totalInvested = holdings.reduce((sum, h) => sum + parseFloat(h.invested_value), 0);

  // ========== FORMATTERS ==========
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(2)} K`;
    return `₹${num.toFixed(2)}`;
  };

  // ========== GET COMPANY INITIALS ==========
  const getCompanyInitials = (name: string) => {
    return name.split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
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
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Holdings Yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start building your portfolio by purchasing unlisted shares from our curated list of 150+ pre-IPO companies.
          </p>
          <Link 
            href="/products/unlisted/buy-shares"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#2076C7]/20"
          >
            Browse Companies
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-[#2076C7]" />
              My Portfolio
            </h1>
            <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-xs font-bold rounded-full border border-blue-200">
              {holdings.length} {holdings.length === 1 ? 'Holding' : 'Holdings'}
            </span>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            Last updated: {lastUpdated || 'Just now'}
          </p>
        </div>
          <div className="flex items-center gap-3">
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
              <Download className="w-4 h-4 text-gray-800" />
              Export CSV
            </button>
          </div>
      </div>

      {/* Portfolio Summary Card - Simplified */}
      <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1 flex items-center gap-1">
              <IndianRupee size={14} />
              Total Investment Value
            </p>
            <p className="text-3xl md:text-4xl font-bold mb-2">
              {formatLargeNumber(totalInvested)}
            </p>
            <p className="text-xs opacity-80">
              Across {holdings.length} companies • {holdings.reduce((sum, h) => sum + parseFloat(h.total_quantity), 0).toLocaleString()} total shares
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-xs opacity-90 mb-1">Average Investment</p>
              <p className="text-xl font-bold">
                {formatCurrency(totalInvested / holdings.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table - Only API Fields */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Company</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Price per Share</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Total Invested</th>
                <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedHoldings.map((holding) => {
                const quantity = parseFloat(holding.total_quantity);
                const price = parseFloat(holding.price);
                const invested = parseFloat(holding.invested_value);
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
                        <span className="font-bold text-gray-900">{quantity.toLocaleString()}</span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-medium text-[#2076C7]">{formatCurrency(price)}</span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-bold text-gray-900">{formatCurrency(invested)}</span>
                      </td>
                      <td className="py-5 px-6 text-center">
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row - Shows Additional Info */}
                    {isExpanded && (
                      <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                        <td colSpan={5} className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Package size={14} className="text-[#2076C7]" />
                                Share Details
                              </div>
                              <div className="font-medium text-gray-900">Share ID: {holding.share_id}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Total Quantity: {quantity.toLocaleString()}</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <IndianRupee size={14} className="text-[#2076C7]" />
                                Price Information
                              </div>
                              <div className="font-medium text-gray-900">{formatCurrency(price)} per share</div>
                              <div className="text-[10px] text-gray-400 mt-1">Current market price</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Briefcase size={14} className="text-[#2076C7]" />
                                Investment
                              </div>
                              <div className="font-medium text-gray-900">{formatCurrency(invested)}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Total invested amount</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-4 pt-4 border-t border-blue-200/50">
                            <Link
                              href={`/products/unlisted/sell-shares?company=${holding.share_id}`}
                              className="px-5 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-md shadow-[#2076C7]/20 flex items-center gap-2"
                            >
                              Sell Shares
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
      `}</style>
    </div>
  );
}