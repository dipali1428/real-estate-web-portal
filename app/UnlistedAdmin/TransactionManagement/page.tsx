'use client';

import { useState, useEffect } from 'react';
import { AdminService } from '../../services/unlistedadminservices';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftRight, 
  RotateCw, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Briefcase,
  Layers,
  IndianRupee,
  AlertCircle,
  X,
  Plus,
  Filter,
  Calendar,
  Hash,
  ShieldCheck,
  History,
  Download,
  Loader2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Inbox,
  TrendingUp,
  ShoppingCart,
  HandCoins,
  Package,
  Building2
} from "lucide-react";

// Define the interface based on your API response
interface Transaction {
  txn_id: number;
  user_name: string;
  asset_name: string;
  transaction_type: 'BUY' | 'SELL';
  quantity: number;
  price: string;
  total_amount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: string;
}

type TabType = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';

// --- STATS CARD COMPONENT ---
interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  subText?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, color, subText }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
  >
    <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-white shadow-sm mb-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <h2 className="text-2xl font-black text-gray-900 mt-1">{value.toLocaleString()}</h2>
    {subText && (
      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" strokeWidth={3} /> 
        {subText}
      </p>
    )}
  </motion.div>
);

// --- ADD TRANSACTION MODAL COMPONENT ---
interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    asset_id: '',
    transaction_type: 'BUY',
    quantity: '',
    price: '',
    total_amount: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'quantity' || name === 'price') {
        const qty = parseFloat(updated.quantity) || 0;
        const price = parseFloat(updated.price) || 0;
        updated.total_amount = (qty * price).toFixed(2);
      }
      return updated;
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  try {
    const payload = {
      user_id: Number(formData.user_id),
      asset: String(formData.asset_id),
      transaction_type: formData.transaction_type,
      quantity: Number(formData.quantity),
      price: formData.price,
      total_amount: formData.total_amount
    };
    
    await AdminService.addTransaction(payload);
    onSuccess();
    onClose();
  } catch (error: any) {
    console.error('Failed to add transaction:', error);
    const msg = error.response?.data?.message || error.response?.data?.error || 'Failed to add transaction';
    alert(`Error: ${msg}`);
  } finally {
    setSubmitting(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }} 
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg tracking-tight">Post New Transaction</h3>
            <button 
              onClick={onClose} 
              className="hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">User ID</label>
                <input
                  type="number"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-gray-700 text-sm font-medium bg-gray-50/50"
                  placeholder="ID"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">Asset ID</label>
                <input
                  type="number"
                  name="asset_id"
                  value={formData.asset_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-gray-700 text-sm font-medium bg-gray-50/50"
                  placeholder="ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">Trade Direction</label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-gray-700 text-sm font-bold bg-white"
                required
              >
                <option value="BUY">BUY ORDER</option>
                <option value="SELL">SELL ORDER</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-gray-700 text-sm font-bold"
                  placeholder="Qty"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-700 mb-1 block">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-gray-700 text-sm font-bold text-[#2076C7]"
                  placeholder="Price"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100">
               <label className="text-[10px] font-black uppercase text-[#2076C7] mb-1 block">Estimated Settlement</label>
               <div className="text-xl font-black text-gray-900">
                  ₹{Number(formData.total_amount || 0).toLocaleString()}
               </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-xl shadow-lg shadow-blue-100 transition-all uppercase text-xs tracking-widest disabled:opacity-50 mt-4"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </span>
              ) : 'Record Transaction'}
            </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- MAIN MANAGEMENT COMPONENT ---
const TransactionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [confirmModal, setConfirmModal] = useState<{show: boolean, type: 'APPROVE' | 'REJECT' | null, txnId: number | null}>({
    show: false, type: null, txnId: null
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Direct API call to get transactions
      const response = await api.get('/api/unlisted/admin/transactions');
      console.log('API Response:', response.data); // Debug log
      
      // Handle the response - it's already an array
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportTransactions = async () => {
    setExporting(true);
    try {
      const endpoint = "/api/unlisted/admin/analytics/transactions/export";
      
      const response = await api.get(endpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = `transactions_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error("Export failed", err);
      alert("Failed to export transactions: " + (err.response?.data?.message || "Check your permissions."));
    } finally {
      setExporting(false);
    }
  };

  const handleStatusAction = async () => {
    const { type, txnId } = confirmModal;
    if (!txnId) return;
    try {
      if (type === 'APPROVE') await AdminService.approveTransaction(txnId);
      else await AdminService.rejectTransaction(txnId);
      setConfirmModal({ show: false, type: null, txnId: null });
      fetchTransactions(); // Refresh after action
    } catch (error) {
      alert("Action failed.");
    }
  };

  const getFilteredTransactions = (): Transaction[] => {
    // First filter by status tab
    let filtered = transactions;
    if (activeTab !== 'ALL') {
      filtered = transactions.filter(tx => tx.status === activeTab);
    }

    // Then apply search filter
    return filtered.filter(tx => 
      tx.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.asset_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.txn_id?.toString().includes(searchTerm)
    );
  };

  const getStatusCount = (status: string): number => {
    if (status === 'ALL') return transactions.length;
    return transactions.filter(tx => tx.status === status).length;
  };

  const tabs = [
    { id: 'ALL' as TabType, label: 'All Activity', icon: History, count: transactions.length },
    { id: 'PENDING' as TabType, label: 'Pending', icon: Clock, count: getStatusCount('PENDING') },
    { id: 'APPROVED' as TabType, label: 'Approved', icon: CheckCircle, count: getStatusCount('APPROVED') },
    { id: 'REJECTED' as TabType, label: 'Rejected', icon: XCircle, count: getStatusCount('REJECTED') }
  ];

  const filteredTransactions = getFilteredTransactions();
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const totalVolume = transactions.reduce((sum, tx) => sum + (tx.quantity || 0), 0);
  const totalValue = transactions.reduce((sum, tx) => sum + (parseFloat(tx.total_amount?.toString() || '0')), 0);

  // Loading State
  if (loading && transactions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 animate-fade-in pb-10">
      
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6" /> Transaction Ledger
          </h2>
          <p className="text-sm opacity-90">Monitor, approve, or reject unlisted trade requests.</p>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#2076C7] rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-all"
            >
              <Plus className="w-4 h-4" /> New Trade
            </button>
            
            <button 
              onClick={handleExportTransactions}
              disabled={exporting}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm shadow-lg transition-all border border-white/20 disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {exporting ? 'Exporting...' : 'Export'}
            </button>
            
            <button 
              onClick={fetchTransactions} 
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
              disabled={loading}
            >
              <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </motion.div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          icon={Inbox}
          label="Total Transactions"
          value={transactions.length}
          color="from-blue-500 to-cyan-500"
          subText="All Time"
        />
        <StatsCard 
          icon={ShoppingCart}
          label="Buy Orders"
          value={transactions.filter(tx => tx.transaction_type === 'BUY').length}
          color="from-green-500 to-emerald-500"
          subText="Purchase Volume"
        />
        <StatsCard 
          icon={HandCoins}
          label="Sell Orders"
          value={transactions.filter(tx => tx.transaction_type === 'SELL').length}
          color="from-orange-500 to-yellow-500"
          subText="Sale Volume"
        />
        <StatsCard 
          icon={Package}
          label="Total Shares"
          value={totalVolume}
          color="from-rose-500 to-pink-500"
          subText={`₹${(totalValue/100000).toFixed(1)}L Value`}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* --- TABS --- */}
        <div className="flex border-b border-gray-100 bg-white overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
                <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'
                }`}
                >
                {tab.label} <span className="ml-1 opacity-50">({tab.count})</span>
                {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2076C7] rounded-t-full" />
                )}
                </button>
            ))}
        </div>
        
        {/* --- SEARCH BAR --- */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-wrap gap-4 items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">
            Showing: {filteredTransactions.length} of {transactions.length} Entries
          </span>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by user, asset or ID..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all shadow-sm bg-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Trade Detail</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Asset & Direction</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-center">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!loading && paginatedTransactions.map((tx) => (
                  <tr key={tx.txn_id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-gray-700 text-sm">
                        <Hash className="w-3 h-3 text-gray-300" /> #{tx.txn_id}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {tx.timestamp ? new Date(tx.timestamp).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-bold text-sm">
                          {tx.user_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{tx.user_name || 'Unknown'}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-700 text-sm flex items-center gap-1.5 max-w-xs truncate" title={tx.asset_name}>
                        <Building2 className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" /> 
                        <span className="truncate">{tx.asset_name || 'N/A'}</span>
                      </div>
                      <span className={`mt-1.5 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-black uppercase border ${
                        tx.transaction_type === 'BUY' 
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-100 text-amber-700 border-amber-200'
                      }`}>
                        {tx.transaction_type === 'BUY' ? (
                          <><ShoppingCart className="w-3 h-3" /> BUY</>
                        ) : (
                          <><HandCoins className="w-3 h-3" /> SELL</>
                        )}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-sm text-gray-800">
                        <Layers className="w-3.5 h-3.5 text-gray-400 inline mr-1" /> 
                        {tx.quantity?.toLocaleString() || '0'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="font-black text-[#2076C7] text-sm">
                        <IndianRupee className="w-3 h-3 inline mr-0.5" /> 
                        {tx.total_amount ? parseFloat(tx.total_amount).toLocaleString('en-IN') : '0'}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium italic mt-0.5">
                        @ ₹{tx.price ? parseFloat(tx.price).toLocaleString('en-IN') : '0'}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                        tx.status === 'APPROVED' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : tx.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {tx.status === 'APPROVED' && <CheckCircle className="w-3 h-3" />}
                        {tx.status === 'PENDING' && <Clock className="w-3 h-3" />}
                        {tx.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      {tx.status === 'PENDING' ? (
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => setConfirmModal({ show: true, type: 'APPROVE', txnId: tx.txn_id })} 
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setConfirmModal({ show: true, type: 'REJECT', txnId: tx.txn_id })} 
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
              ))}
              {!loading && paginatedTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Inbox className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg font-bold text-gray-600 mb-2">No transactions found</p>
                      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-[#2076C7] disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={fetchTransactions} />}
        
        {/* --- CONFIRM MODAL --- */}
        {confirmModal.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className={`px-6 py-4 border-b ${confirmModal.type === 'APPROVE' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} flex justify-between items-center`}>
                <h3 className={`font-bold ${confirmModal.type === 'APPROVE' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {confirmModal.type === 'APPROVE' ? 'Confirm Approval' : 'Confirm Rejection'}
                </h3>
                <button onClick={() => setConfirmModal({ show: false, type: null, txnId: null })}>
                  <X className={`w-5 h-5 ${confirmModal.type === 'APPROVE' ? 'text-emerald-400' : 'text-rose-400'}`} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-2">
                  Are you sure you want to <strong>{confirmModal.type?.toLowerCase()}</strong>:
                </p>
                <p className="font-bold text-gray-800 mb-4">
                  Transaction #{confirmModal.txnId}
                </p>
                <p className={`text-sm ${confirmModal.type === 'APPROVE' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} p-3 rounded-lg mb-6`}>
                  This action will update the transaction status and cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmModal({ show: false, type: null, txnId: null })}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusAction}
                    className={`flex-1 py-3 px-4 text-white rounded-xl font-medium transition-colors ${
                      confirmModal.type === 'APPROVE' 
                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                        : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionManagement;