'use client';

import React, { useState, useEffect } from 'react';
import { 
  History, Download, CheckCircle, XCircle, Clock, 
  ArrowUpRight, ArrowDownRight, IndianRupee,TrendingUp, TrendingDown, X,
  Search, SlidersHorizontal
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import customerService from '../../../../services/customerService';
import { motion } from 'framer-motion';

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

        // localStorage.setItem('token', token);
        const response = await customerService.getTransactions();
        
        if (response.success) {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
          setLastUpdated(new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          }));
        } else {
          setError('Failed to load transactions');
          toast.error('Failed to load transactions');
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(err.response?.data?.message || 'Failed to load transactions');
          toast.error('Failed to load transactions');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ========== APPLY FILTERS USING FILTER API ==========
  const applyFilters = async () => {
    setApplyingFilter(true);
    try {
      const params: any = {};
      if (statusFilter !== 'ALL') params.status = statusFilter;
      if (typeFilter !== 'ALL') params.type = typeFilter;
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;
      if (companySearch) params.company = companySearch;
      
      if (Object.keys(params).length === 0) {
        setFilteredTransactions(transactions);
        setApplyingFilter(false);
        return;
      }
      
      const response = await customerService.filterTransactions(params);
      if (response.success) {
        setFilteredTransactions(response.data);
        toast.success(`Found ${response.data.length} transactions`);
      }
    } catch (err: any) {
      applyClientSideFilters();
    } finally {
      setApplyingFilter(false);
    }
  };

  const applyClientSideFilters = () => {
    let filtered = [...transactions];
    if (statusFilter !== 'ALL') filtered = filtered.filter(tx => tx.status === statusFilter);
    if (typeFilter !== 'ALL') filtered = filtered.filter(tx => tx.type === typeFilter);
    if (companySearch) filtered = filtered.filter(tx => tx.company_name.toLowerCase().includes(companySearch.toLowerCase()));
    if (dateFrom) filtered = filtered.filter(tx => new Date(tx.createdat) >= new Date(dateFrom));
    if (dateTo) filtered = filtered.filter(tx => new Date(tx.createdat) <= new Date(dateTo));
    filtered.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    setFilteredTransactions(filtered);
  };

  const clearFilters = () => {
    setStatusFilter('ALL'); setTypeFilter('ALL'); setDateFrom(''); setDateTo(''); setCompanySearch('');
    setFilteredTransactions(transactions);
    toast.success('Filters cleared');
  };

  const exportTransactions = () => {
    if (filteredTransactions.length === 0) { toast.error('No transactions to export'); return; }
    const csvContent = [['Date', 'Type', 'Company', 'Quantity', 'Price (₹)', 'Total (₹)', 'Status'].join(','),
      ...filteredTransactions.map(tx => [new Date(tx.createdat).toLocaleDateString('en-IN'), tx.type, `"${tx.company_name}"`, tx.quantity, parseFloat(tx.price).toFixed(2), parseFloat(tx.total_value).toFixed(2), tx.status].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `transactions.csv`; a.click();
  };

  const toggleRow = (id: number) => setExpandedRow(expandedRow === id ? null : id);
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { bg: string; text: string; icon: any; label: string }> = {
      APPROVED: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle, label: 'Approved' },
      PENDING: { bg: 'bg-amber-50', text: 'text-amber-700', icon: Clock, label: 'Pending' },
      REJECTED: { bg: 'bg-rose-50', text: 'text-rose-700', icon: XCircle, label: 'Rejected' },
      FAILED: { bg: 'bg-red-50', text: 'text-red-700', icon: XCircle, label: 'Failed' },
      CANCELLED: { bg: 'bg-gray-50', text: 'text-gray-700', icon: XCircle, label: 'Cancelled' }
    };
    const { bg, text, icon: Icon, label } = config[status] || config.PENDING;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${bg} ${text} border border-current/10`}>
        <Icon className="w-3 h-3" /> {label}
      </span>
    );
  };

  const TypeBadge = ({ type }: { type: string }) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${type === 'BUY' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'}`}>
      {type === 'BUY' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {type}
    </span>
  );

  const totalBuyValue = transactions.filter(tx => tx.type === 'BUY' && tx.status === 'APPROVED').reduce((sum, tx) => sum + parseFloat(tx.total_value), 0);
  const totalSellValue = transactions.filter(tx => tx.type === 'SELL' && tx.status === 'APPROVED').reduce((sum, tx) => sum + parseFloat(tx.total_value), 0);

  if (loading) return <div className="w-full py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full">
      
      {/* 1. Market/Summary Cards (KPI Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><History size={18} /></div>
             Total Transactions
          </div>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ArrowDownRight size={18} /></div>
             Total Buy Value
          </div>
          <p className="text-2xl font-bold text-gray-900 truncate">{formatCurrency(totalBuyValue)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><ArrowUpRight size={18} /></div>
             Total Sell Value
          </div>
          <p className="text-2xl font-bold text-gray-900 truncate">{formatCurrency(totalSellValue)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
             <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><IndianRupee size={18} /></div>
             Net Investment
          </div>
          <p className="text-2xl font-bold text-gray-900 truncate">{formatCurrency(totalBuyValue - totalSellValue)}</p>
        </div>
      </div>

      {/* 2. Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search company..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm outline-none focus:ring-2 focus:ring-[#2076C7]/10"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={exportTransactions}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
          >
            <Download size={16} />
            Export
          </button>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-1 md:flex-none flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              showFilters ? 'bg-[#2076C7] text-white border-[#2076C7]' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* 3. Filter Panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-2">Status</label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="ALL">All Status</option>
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-2">Type</label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="ALL">All Types</option>
                <option value="BUY">Buy</option>
                <option value="SELL">Sell</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-2">From</label>
              <input type="date" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="flex items-end gap-2">
               <button onClick={applyFilters} className="flex-1 bg-[#2076C7] text-white py-2.5 rounded-lg text-sm font-bold">{applyingFilter ? '...' : 'Apply'}</button>
               <button onClick={clearFilters} className="p-2.5 text-gray-400 hover:text-red-500"><X size={20}/></button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="hidden md:block bg-slate-100 border-b border-gray-100 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-[11px] font-bold text-gray-600 uppercase tracking-widest leading-none">
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-3">Company</div>
            <div className="col-span-1 text-right">Qty</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Total Value</div>
            <div className="col-span-1 text-center">Status</div>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <React.Fragment key={tx.id}>
                <div 
                  className="px-6 py-5 hover:bg-blue-50/20 transition-all group cursor-pointer"
                  onClick={() => toggleRow(tx.id)}
                >
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-gray-900">{formatDate(tx.createdat)}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{formatTime(tx.createdat)}</p>
                    </div>
                    <div className="col-span-1"><TypeBadge type={tx.type} /></div>
                    <div className="col-span-3 text-sm font-bold text-gray-800">{tx.company_name}</div>
                    <div className="col-span-1 text-right text-sm font-medium">{tx.quantity}</div>
                    <div className="col-span-2 text-right text-sm font-medium">{formatCurrency(tx.price)}</div>
                    <div className="col-span-2 text-right font-bold text-[#2076C7]">{formatCurrency(tx.total_value)}</div>
                    <div className="col-span-1 flex justify-center"><StatusBadge status={tx.status} /></div>
                  </div>

                  {/* Mobile Row */}
                  <div className="md:hidden flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{tx.company_name}</p>
                      <p className="text-xs text-gray-400">{formatDate(tx.createdat)} • {tx.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2076C7]">{formatCurrency(tx.total_value)}</p>
                      <StatusBadge status={tx.status} />
                    </div>
                  </div>
                </div>
                
                {/* Expanded row (logic kept as it was) */}
                {expandedRow === tx.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 p-6 border-b border-slate-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div><p className="text-[10px] text-gray-400 uppercase font-bold">Transaction ID</p><p className="text-sm font-mono font-bold">#{tx.id}</p></div>
                      <div><p className="text-[10px] text-gray-400 uppercase font-bold">Price Per Share</p><p className="text-sm font-bold">{formatCurrency(tx.price)}</p></div>
                      <div><p className="text-[10px] text-gray-400 uppercase font-bold">Execution Date</p><p className="text-sm font-bold">{formatDate(tx.createdat)}</p></div>
                      <div><p className="text-[10px] text-gray-400 uppercase font-bold">Reference</p><p className="text-sm font-bold text-emerald-600">Verified</p></div>
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="py-20 text-center text-gray-400">
              <History size={40} className="mx-auto mb-4 opacity-20" />
              <p>No transactions found.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}