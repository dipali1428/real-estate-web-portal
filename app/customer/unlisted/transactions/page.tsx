'use client';

import React, { useState, useEffect } from 'react';
import { 
  History, Download, CheckCircle, XCircle, Clock, 
  ArrowUpRight, ArrowDownRight, Filter, ChevronDown,
  Calendar, IndianRupee, Loader2, RefreshCw, AlertCircle,
  FileText, Printer, TrendingUp, TrendingDown, X,
  Search, SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import customerService from '../../../services/customerService';

// ==================== TYPES ====================

interface Transaction {
  id: number;
  company_name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: string;
  total_value: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'FAILED' | 'CANCELLED';
  createdat: string;
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

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [companySearch, setCompanySearch] = useState<string>('');
  const [applyingFilter, setApplyingFilter] = useState(false);

  // ========== FETCH ALL TRANSACTIONS (INITIAL LOAD) ==========
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getTokenFromCookie();
        
        if (!token) {
          router.push('/');
          return;
        }

        localStorage.setItem('token', token);
        
        // Fetch all transactions from your API
        const response = await customerService.getTransactions();
        
        if (response.success) {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
          setLastUpdated(new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
        } else {
          setError('Failed to load transactions');
        }
      } catch (err: any) {
        console.error('Transactions fetch error:', err);
        
        if (err.response?.status === 401) {
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(err.response?.data?.message || 'Failed to load transactions');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchTransactions, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ========== APPLY FILTERS USING FILTER API ==========
  const applyFilters = async () => {
    setApplyingFilter(true);
    
    try {
      // Build filter params
      const params: any = {};
      
      if (statusFilter !== 'ALL') params.status = statusFilter;
      if (typeFilter !== 'ALL') params.type = typeFilter;
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;
      if (companySearch) params.company = companySearch;
      
      // If no filters are applied, fetch all transactions
      if (Object.keys(params).length === 0) {
        setFilteredTransactions(transactions);
        setApplyingFilter(false);
        return;
      }
      
      // Call filter API
      const response = await customerService.filterTransactions(params);
      
      if (response.success) {
        setFilteredTransactions(response.data);
        setLastUpdated(new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }));
      }
    } catch (err: any) {
      console.error('Filter error:', err);
      // Fallback to client-side filtering if API fails
      applyClientSideFilters();
    } finally {
      setApplyingFilter(false);
    }
  };

  // ========== CLIENT-SIDE FILTER FALLBACK ==========
  const applyClientSideFilters = () => {
    let filtered = [...transactions];
    
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }
    
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }
    
    if (companySearch) {
      filtered = filtered.filter(tx => 
        tx.company_name.toLowerCase().includes(companySearch.toLowerCase())
      );
    }
    
    if (dateFrom) {
      filtered = filtered.filter(tx => 
        new Date(tx.createdat) >= new Date(dateFrom)
      );
    }
    
    if (dateTo) {
      filtered = filtered.filter(tx => 
        new Date(tx.createdat) <= new Date(dateTo)
      );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    
    setFilteredTransactions(filtered);
  };

  // ========== CLEAR ALL FILTERS ==========
  const clearFilters = () => {
    setStatusFilter('ALL');
    setTypeFilter('ALL');
    setDateFrom('');
    setDateTo('');
    setCompanySearch('');
    setFilteredTransactions(transactions);
  };

  // ========== EXPORT TRANSACTIONS ==========
  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Type', 'Company', 'Quantity', 'Price (₹)', 'Total (₹)', 'Status', 'Transaction ID'].join(','),
      ...filteredTransactions.map(tx => [
        new Date(tx.createdat).toLocaleDateString('en-IN'),
        tx.type,
        `"${tx.company_name}"`,
        tx.quantity,
        parseFloat(tx.price).toFixed(2),
        parseFloat(tx.total_value).toFixed(2),
        tx.status,
        tx.id
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // ========== TOGGLE ROW EXPAND ==========
  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // ========== FORMATTERS ==========
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // ========== STATUS BADGE ==========
  const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { bg: string; text: string; icon: any; label: string }> = {
      APPROVED: { 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700', 
        icon: CheckCircle, 
        label: 'Approved' 
      },
      PENDING: { 
        bg: 'bg-amber-50', 
        text: 'text-amber-700', 
        icon: Clock, 
        label: 'Pending' 
      },
      REJECTED: { 
        bg: 'bg-rose-50', 
        text: 'text-rose-700', 
        icon: XCircle, 
        label: 'Rejected' 
      },
      FAILED: { 
        bg: 'bg-red-50', 
        text: 'text-red-700', 
        icon: XCircle, 
        label: 'Failed' 
      },
      CANCELLED: { 
        bg: 'bg-gray-50', 
        text: 'text-gray-700', 
        icon: XCircle, 
        label: 'Cancelled' 
      }
    };

    const { bg, text, icon: Icon, label } = config[status] || config.PENDING;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${bg} ${text} border border-${bg.split('-')[1]}-200`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  // ========== TYPE BADGE ==========
  const TypeBadge = ({ type }: { type: string }) => {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
        type === 'BUY' 
          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
          : 'bg-rose-50 text-rose-700 border border-rose-200'
      }`}>
        {type === 'BUY' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {type}
      </span>
    );
  };

  // ========== CALCULATE STATS ==========
  const totalBuyValue = transactions
    .filter(tx => tx.type === 'BUY' && tx.status === 'APPROVED')
    .reduce((sum, tx) => sum + parseFloat(tx.total_value), 0);
    
  const totalSellValue = transactions
    .filter(tx => tx.type === 'SELL' && tx.status === 'APPROVED')
    .reduce((sum, tx) => sum + parseFloat(tx.total_value), 0);
    
  const pendingCount = transactions.filter(tx => tx.status === 'PENDING').length;
  const approvedCount = transactions.filter(tx => tx.status === 'APPROVED').length;

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
          <p className="text-gray-600 mt-4 font-medium">Loading your transactions...</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Transactions</h3>
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

  // ========== MAIN RENDER ==========
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <History className="w-8 h-8 text-[#2076C7]" />
              Transaction History
            </h1>
            <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-xs font-bold rounded-full border border-blue-200">
              {filteredTransactions.length} of {transactions.length}
            </span>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            Last updated: {lastUpdated || 'Just now'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 border rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              showFilters 
                ? 'bg-[#2076C7] text-white border-[#2076C7]' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(statusFilter !== 'ALL' || typeFilter !== 'ALL' || dateFrom || dateTo || companySearch) && (
              <span className="w-5 h-5 bg-white text-[#2076C7] rounded-full text-xs flex items-center justify-center font-bold">
                {[
                  statusFilter !== 'ALL' ? 1 : 0,
                  typeFilter !== 'ALL' ? 1 : 0,
                  dateFrom ? 1 : 0,
                  dateTo ? 1 : 0,
                  companySearch ? 1 : 0
                ].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>
          
          <button 
            onClick={exportTransactions}
            className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#2076C7]" />
              Filter Transactions
            </h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={16} />
              Clear all
            </button>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL" className="text-gray-900">All Status</option>
                  <option value="APPROVED" className="text-gray-900">Approved</option>
                  <option value="PENDING" className="text-gray-900">Pending</option>
                  <option value="REJECTED" className="text-gray-900">Rejected</option>
                  <option value="FAILED" className="text-gray-900">Failed</option>
                  <option value="CANCELLED" className="text-gray-900">Cancelled</option>
                </select>
              </div>
              
              {/* Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Transaction Type
                </label>
                <select 
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="ALL" className="text-gray-900">All Types</option>
                  <option value="BUY" className="text-gray-900">Buy</option>
                  <option value="SELL" className="text-gray-900">Sell</option>
                </select>
              </div>
              
              {/* Company Search */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search company..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  />
                </div>
              </div>
              
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    From
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    To
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  />
                </div>
              </div>
            </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Clear
            </button>
            <button
              onClick={applyFilters}
              disabled={applyingFilter}
              className="px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {applyingFilter ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Total Transactions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <History className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          <p className="text-xs text-gray-400 mt-2">
            {approvedCount} approved • {pendingCount} pending
          </p>
        </div>
        
        {/* Total Buy Value */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
            <ArrowDownRight className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Buy Value</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalBuyValue)}</p>
          <p className="text-xs text-gray-400 mt-2">Completed purchases</p>
        </div>
        
        {/* Total Sell Value */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
            <ArrowUpRight className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Sell Value</p>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalSellValue)}</p>
          <p className="text-xs text-gray-400 mt-2">Completed sales</p>
        </div>
        
        {/* Net Investment */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
            <IndianRupee className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Net Investment</p>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalBuyValue - totalSellValue)}</p>
          <p className="text-xs text-gray-400 mt-2">Buy - Sell</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-[#2076C7]">{filteredTransactions.length}</span> transactions
          {filteredTransactions.length !== transactions.length && (
            <> of <span className="font-bold text-gray-900">{transactions.length}</span> total</>
          )}
        </p>
        {(statusFilter !== 'ALL' || typeFilter !== 'ALL' || dateFrom || dateTo || companySearch) && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#2076C7] hover:text-[#1CADA3] font-semibold flex items-center gap-1"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Company</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <React.Fragment key={tx.id}>
                    <tr 
                      className="hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => toggleRow(tx.id)}
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatDate(tx.createdat)}</div>
                            <div className="text-xs text-gray-500">{formatTime(tx.createdat)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <TypeBadge type={tx.type} />
                      </td>
                      <td className="py-5 px-6">
                        <div className="font-medium text-gray-900">{tx.company_name}</div>
                        <div className="text-xs text-gray-500">ID: {tx.id}</div>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-bold text-gray-900">{tx.quantity.toLocaleString()}</span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-medium text-gray-900">{formatCurrency(tx.price)}</span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <span className="font-bold text-[#2076C7]">{formatCurrency(tx.total_value)}</span>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <StatusBadge status={tx.status} />
                      </td>
                    </tr>
                    
                    {/* Expanded Row - Transaction Details */}
                    {expandedRow === tx.id && (
                      <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                        <td colSpan={8} className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <FileText size={14} className="text-[#2076C7]" />
                                Transaction ID
                              </div>
                              <div className="font-mono font-medium text-gray-900">#{tx.id}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Reference ID</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <IndianRupee size={14} className="text-[#2076C7]" />
                                Price Details
                              </div>
                              <div className="font-medium text-gray-900">{formatCurrency(tx.price)} per share</div>
                              <div className="text-[10px] text-gray-400 mt-1">Market price at time of transaction</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <History size={14} className="text-[#2076C7]" />
                                Total Value
                              </div>
                              <div className="font-bold text-[#2076C7]">{formatCurrency(tx.total_value)}</div>
                              <div className="text-[10px] text-gray-400 mt-1">{tx.quantity.toLocaleString()} shares × {formatCurrency(tx.price)}</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Clock size={14} className="text-[#2076C7]" />
                                Status
                              </div>
                              <div className="font-medium text-gray-900 capitalize">{tx.status.toLowerCase()}</div>
                              <div className="text-[10px] text-gray-400 mt-1">
                                {tx.status === 'APPROVED' ? 'Completed successfully' : 
                                 tx.status === 'PENDING' ? 'Awaiting confirmation' : 
                                 'Transaction failed'}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <History className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-1">No transactions found</p>
                      <p className="text-sm text-gray-500 mb-4">Try adjusting your filters</p>
                      <button 
                        onClick={clearFilters}
                        className="px-4 py-2 bg-[#2076C7] text-white text-sm rounded-lg hover:bg-[#1CADA3] transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}