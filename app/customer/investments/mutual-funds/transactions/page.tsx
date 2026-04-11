"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ArrowUpRight, ArrowDownRight, Search, 
  Download, History, Clock, 
  CheckCircle2, XCircle, AlertCircle, SlidersHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Transaction {
  id: string;
  fund_name: string;
  type: "BUY" | "SELL";
  status: "COMPLETED" | "PENDING" | "FAILED";
  amount: number;
  nav: number;
  folio_number: string;
  date: string;
  units: number;
}

export default function TransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  // Mock Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchesSearch = txn.fund_name.toLowerCase().includes(searchQuery.toLowerCase()) || txn.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || txn.status === statusFilter;
      const matchesType = typeFilter === "ALL" || txn.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [transactions, searchQuery, statusFilter, typeFilter]);

  const getStatusStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100";
      case "FAILED": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-400";
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED": return <CheckCircle2 size={12} />;
      case "PENDING": return <Clock size={12} className="animate-pulse" />;
      case "FAILED": return <XCircle size={12} />;
      default: return null;
    }
  };

  return (
   <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2076C7] flex items-center justify-center shadow-inner">
                <History className="w-6 h-6" />
             </div>
             <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Transaction History</h1>
                <p className="text-sm text-slate-500 font-bold tracking-tight">Statement of all your mutual fund activities</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-all border shadow-sm ${
              showFilters 
                ? 'bg-[#2076C7] text-white border-[#2076C7]' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Search Fund or ID</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      type="text" 
                      placeholder="e.g. HDFC Top 100..." 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-[#2076C7] transition-all outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Transaction Status</label>
                  <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {["ALL", "COMPLETED", "PENDING", "FAILED"].map(status => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                          statusFilter === status ? "bg-white text-[#2076C7] shadow-sm scale-105" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Order Type</label>
                  <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {["ALL", "BUY", "SELL"].map(type => (
                      <button
                        key={type}
                        onClick={() => setTypeFilter(type)}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                          typeFilter === type ? "bg-white text-[#2076C7] shadow-sm scale-105" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-50">
              <tr>
                <th className="px-8 py-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Transaction Details</th>
                <th className="px-6 py-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Folio No.</th>
                <th className="px-6 py-6 text-right text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">NAV & Units</th>
                <th className="px-8 py-6 text-right text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading history...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                   <td colSpan={5} className="py-32 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-5 opacity-40">
                         <AlertCircle size={48} />
                         <p className="text-sm font-black uppercase tracking-widest">No transactions found</p>
                         <button onClick={() => {setSearchQuery(""); setStatusFilter("ALL"); setTypeFilter("ALL");}} className="text-xs font-black text-[#2076C7] underline underline-offset-4">Reset Filters</button>
                      </div>
                   </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-sm ${
                          txn.type === "BUY" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}>
                          {txn.type === "BUY" ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm leading-tight mb-1">{txn.fund_name}</p>
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{txn.id}</span>
                             <span className="text-slate-100">•</span>
                             <span className="text-[10px] font-bold text-slate-400">{new Date(txn.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-7">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(txn.status)}`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                      </span>
                    </td>

                    <td className="px-6 py-7">
                       <p className="text-xs font-black text-slate-600 font-mono tracking-widest">{txn.folio_number}</p>
                    </td>

                    <td className="px-6 py-7 text-right">
                       <div className="flex flex-col gap-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NAV: ₹{txn.nav.toFixed(2)}</p>
                          <p className="text-xs font-black text-slate-700">{txn.units} Units</p>
                       </div>
                    </td>

                    <td className="px-8 py-7 text-right">
                       <p className="text-lg font-black text-[#2076C7] tracking-tight">₹{txn.amount.toLocaleString('en-IN')}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mt-1">Lumpsum Pay</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
