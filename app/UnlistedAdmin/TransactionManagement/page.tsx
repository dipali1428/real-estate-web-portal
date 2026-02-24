'use client';

import { useState, useEffect } from 'react';
import { AdminService, UnlistedTransaction } from '../../services/unlistedadminservices';
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
  FileText
} from "lucide-react";

type TabType = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';

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
      asset: String(formData.asset_id), // Convert to string
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 tracking-tight">Post New Transaction</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">User ID</label>
                <input
                  type="number"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm font-medium bg-gray-50/50"
                  placeholder="ID"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Asset ID</label>
                <input
                  type="number"
                  name="asset_id"
                  value={formData.asset_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm font-medium bg-gray-50/50"
                  placeholder="ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Trade Direction</label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm font-bold bg-white"
                required
              >
                <option value="BUY">BUY ORDER</option>
                <option value="SELL">SELL ORDER</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm font-bold"
                  placeholder="Qty"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm font-bold text-[#2076C7]"
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
              {submitting ? 'Processing...' : 'Record Transaction'}
            </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- MAIN MANAGEMENT COMPONENT ---
const TransactionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  const [transactions, setTransactions] = useState<UnlistedTransaction[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<UnlistedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [confirmModal, setConfirmModal] = useState<{show: boolean, type: 'APPROVE' | 'REJECT' | null, txnId: number | null}>({
    show: false, type: null, txnId: null
  });

  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [allTxnsResponse, pendingTxnsResponse] = await Promise.all([
        AdminService.getTransactions(100),
        AdminService.getPendingTransactions()
      ]);
      
      const allTxns = Array.isArray(allTxnsResponse) ? allTxnsResponse : (allTxnsResponse as any)?.transactions || [];
      const pendingTxns = Array.isArray(pendingTxnsResponse) ? pendingTxnsResponse : (pendingTxnsResponse as any)?.transactions || [];
      
      setTransactions(allTxns);
      setPendingTransactions(pendingTxns);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setPendingTransactions([]);
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
      refreshAll();
    } catch (error) {
      alert("Action failed.");
    }
  };

  const getDisplayTransactions = (): UnlistedTransaction[] => {
    let filtered = activeTab === 'PENDING' ? pendingTransactions : 
                   activeTab === 'ALL' ? transactions : 
                   transactions.filter(tx => tx.status === activeTab);

    return filtered.filter(tx => 
      tx.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.asset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.txn_id?.toString().includes(searchTerm)
    );
  };

  const getStatusCount = (status: string): number => {
    if (status === 'PENDING') return pendingTransactions.length;
    return transactions.filter(tx => tx.status === status).length;
  };

  const tabs = [
    { id: 'ALL' as TabType, label: 'All Activity', icon: History, count: transactions.length },
    { id: 'PENDING' as TabType, label: 'Pending', icon: Clock, count: getStatusCount('PENDING') },
    { id: 'APPROVED' as TabType, label: 'Approved', icon: CheckCircle, count: getStatusCount('APPROVED') },
    { id: 'REJECTED' as TabType, label: 'Rejected', icon: XCircle, count: getStatusCount('REJECTED') }
  ];

  const displayTransactions = getDisplayTransactions();

  return (
    <div className="flex-1 space-y-6 animate-fade-in pb-10">
      
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
              onClick={refreshAll} 
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
              disabled={loading}
            >
              <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </motion.div>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Logs', val: transactions.length },
            { label: 'Pending', val: getStatusCount('PENDING') },
            { label: 'Approved', val: getStatusCount('APPROVED') },
            { label: 'Rejected', val: getStatusCount('REJECTED') }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-xs font-black uppercase text-gray-400 tracking-widest">{stat.label}</div>
                <div className="text-2xl font-black text-gray-900 mt-1">{stat.val}</div>
            </div>
          ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* --- TABS --- */}
        <div className="flex border-b border-gray-100 bg-white overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        
        <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-wrap gap-4 items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Showing: {displayTransactions.length} Entries</span>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter ID, User or Asset..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#1CADA3] outline-none text-sm text-gray-900 font-medium transition-all shadow-sm bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Trade Detail</th>
                <th className="px-6 py-4">Participant</th>
                <th className="px-6 py-4">Asset & Direction</th>
                <th className="px-6 py-4 text-center">Volume</th>
                <th className="px-6 py-4 text-center">Settlement</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!loading && displayTransactions.map((tx) => (
                  <tr key={tx.txn_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-gray-400 text-xs">#{tx.txn_id}</div>
                      <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7] border border-blue-100 font-bold text-xs">{tx.user?.charAt(0) || 'U'}</div>
                        <div><div className="font-bold text-gray-800 text-sm leading-none">{tx.user}</div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-700 text-sm flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-300" /> {tx.asset}</div>
                      <span className={`mt-1.5 inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase border ${tx.transaction_type?.toUpperCase() === 'BUY' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>{tx.transaction_type}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-sm text-gray-800"><Layers className="w-3.5 h-3.5 text-gray-300 inline mr-1" /> {tx.quantity?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-black text-[#2076C7] text-sm flex items-center justify-center gap-0.5"><IndianRupee className="w-3 h-3" /> {tx.total_amount ? parseFloat(tx.total_amount.toString()).toLocaleString() : '0'}</div>
                      <div className="text-[10px] text-gray-400 font-medium italic mt-0.5">@ ₹{tx.price ? parseFloat(tx.price.toString()).toLocaleString() : '0'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {tx.status === 'PENDING' ? (
                          <>
                            <button onClick={() => setConfirmModal({ show: true, type: 'APPROVE', txnId: tx.txn_id })} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><CheckCircle className="w-5 h-5" /></button>
                            <button onClick={() => setConfirmModal({ show: true, type: 'REJECT', txnId: tx.txn_id })} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><XCircle className="w-5 h-5" /></button>
                          </>
                        ) : (
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${tx.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>{tx.status}</div>
                        )}
                      </div>
                    </td>
                  </tr>
              ))}
              {!loading && displayTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No transactions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && <AddTransactionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={refreshAll} />}
        {confirmModal.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-center shadow-2xl">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${confirmModal.type === 'APPROVE' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>{confirmModal.type === 'APPROVE' ? <CheckCircle size={40} /> : <AlertCircle className="w-10 h-10" />}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{confirmModal.type === 'APPROVE' ? 'Confirm Trade' : 'Halt Trade'}</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Are you sure you want to <strong>{confirmModal.type?.toLowerCase()}</strong> transaction #{confirmModal.txnId}?</p>
              <div className="space-y-3">
                <button onClick={handleStatusAction} className={`w-full py-4 text-white font-black rounded-2xl uppercase text-xs tracking-widest ${confirmModal.type === 'APPROVE' ? 'bg-emerald-600 shadow-emerald-100' : 'bg-rose-600 shadow-rose-100'} shadow-lg`}>
                  Confirm
                </button>
                <button onClick={() => setConfirmModal({ show: false, type: null, txnId: null })} className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl uppercase text-xs tracking-widest">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionManagement;