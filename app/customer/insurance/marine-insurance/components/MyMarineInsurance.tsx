'use client';

import React, { useState, useEffect } from 'react';
import {
  Download, CheckCircle, XCircle, Clock,
  Filter, IndianRupee,
  FileText, Activity, X, Search, SlidersHorizontal, Calendar,
  Ship, Anchor, Box
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// ==================== MOCK DATA ====================

interface MarineApplication {
  id: number;
  provider_name: string;
  policy_type: string;
  sum_insured: string;
  premium: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'FAILED' | 'CANCELLED';
  createdat: string;
}

const mockApplications: MarineApplication[] = [];

// ==================== MAIN COMPONENT ====================

export default function MyMarineInsurance({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: "explore" | "applications") => void }) {
  const [applications, setApplications] = useState<MarineApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<MarineApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [providerSearch, setProviderSearch] = useState<string>('');



  useEffect(() => {
    applyClientSideFilters();
  }, [statusFilter, providerSearch, applications]);

  const applyClientSideFilters = () => {
    let filtered = [...applications];

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (providerSearch) {
      filtered = filtered.filter(app =>
        app.provider_name.toLowerCase().includes(providerSearch.toLowerCase())
      );
    }

    filtered.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    setFilteredApplications(filtered);
  };

  const clearFilters = () => {
    setStatusFilter('ALL');
    setProviderSearch('');
    setShowFilters(false);
  };

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
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
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${bg} ${text} border border-${bg.split('-')[1]}-200`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const getPolicyIcon = (type: string) => {
    if (type.includes('Cargo')) return <Ship className="w-4 h-4 text-gray-400" />;
    if (type.includes('Hull')) return <Anchor className="w-4 h-4 text-gray-400" />;
    if (type.includes('Transit')) return <Box className="w-4 h-4 text-gray-400" />;
    return <FileText className="w-4 h-4 text-gray-400" />;
  };

  const approvedCount = applications.filter(app => app.status === 'APPROVED').length;
  const pendingCount = applications.filter(app => app.status === 'PENDING').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">

      {/* --- NEW MODERN HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  My Marine Policies
                </h2>
                <span className="px-2.5 py-1 bg-blue-100 text-[#2076C7] text-[10px] font-bold rounded-full border border-blue-200 whitespace-nowrap">
                  {filteredApplications.length} of {applications.length}
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="text-[#2076C7] flex items-center justify-center w-5 h-5 rounded-full bg-blue-50/50">
                  <Clock size={14} />
                </span>
                Track and manage your active marine coverage
              </p>
            </div>
          </div>

          <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
              <button
                onClick={() => setActiveTab('explore')}
                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'explore' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {activeTab === 'explore' && (
                  <motion.div
                    layoutId="activeTabExplore"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Anchor size={14} />
                <span>Offers</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'applications' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {activeTab === 'applications' && (
                  <motion.div
                    layoutId="activeTabExplore"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <FileText size={14} />
                <span>Policies</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Row */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-0 z-40 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search - Left Side */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search provider..."
              value={providerSearch}
              onChange={(e) => setProviderSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#2076C7]/10 transition-all font-medium text-gray-700 text-sm placeholder:text-gray-400 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm">
              <Download size={18} />
              Export
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 ${
                showFilters
                  ? 'bg-[#2076C7] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters
              {(statusFilter !== 'ALL') && (
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${showFilters ? 'bg-white text-[#2076C7]' : 'bg-[#2076C7] text-white'}`}>
                  1
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#2076C7]" />
                Filter Policies
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <X size={16} />
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="APPROVED">Approved</option>
                  <option value="PENDING">Pending</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <Anchor className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Policies</p>
          <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
          <p className="text-xs text-gray-400 mt-2">
            {approvedCount} active covers • {pendingCount} in verification
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Active Coverage</p>
          <p className="text-2xl font-bold text-emerald-600">{approvedCount > 0 ? applications.find(a => a.status === 'APPROVED')?.sum_insured : 'None'}</p>
          <p className="text-xs text-gray-400 mt-2">Maximum risk protection</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hidden md:block">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Awaiting Docs</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-gray-400 mt-2">Surveyor review pending</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-[#2076C7]">{filteredApplications.length}</span> applications
        </p>
      </div>      {/* Applications List - Mobile Card View / Desktop Table View */}
      <div className="space-y-4">
        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Policy Start</th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Provider</th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Policy Type</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Insured Value</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Premium</th>
                  <th className="py-4 px-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <React.Fragment key={app.id}>
                      <tr
                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                        onClick={() => toggleRow(app.id)}
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{formatDate(app.createdat)}</div>
                              <div className="text-xs text-gray-500">{formatTime(app.createdat)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="font-medium text-gray-900 uppercase tracking-tighter">{app.provider_name}</div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#2076C7] border border-blue-200 rounded-full text-[10px] font-bold uppercase transition-all group-hover:bg-white">
                            {getPolicyIcon(app.policy_type)}
                            {app.policy_type}
                          </span>
                          <div className="text-[10px] text-gray-400 mt-1 uppercase">Policy ID: {app.id}</div>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-bold text-gray-900">{app.sum_insured}</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-medium text-gray-900">{app.premium}</span>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <StatusBadge status={app.status} />
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      <AnimatePresence>
                        {expandedRow === app.id && (
                          <tr>
                            <td colSpan={6} className="p-0">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 overflow-hidden"
                              >
                                <div className="p-6">
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <FileText size={14} className="text-[#2076C7]" />
                                        Coverage Details
                                      </div>
                                      <div className="font-medium text-gray-900">ID: {app.id}</div>
                                      <div className="text-[10px] text-gray-400 mt-1 uppercase">{app.policy_type} - All Risks Cover</div>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <Ship size={14} className="text-[#2076C7]" />
                                        Transit Provider
                                      </div>
                                      <div className="font-medium text-gray-900">{app.provider_name}</div>
                                      <div className="text-[10px] text-gray-400 mt-1">Multi-modal global transit</div>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <IndianRupee size={14} className="text-[#2076C7]" />
                                        Insured Value
                                      </div>
                                      <div className="font-bold text-gray-900 text-lg tracking-tighter">{app.sum_insured}</div>
                                      <div className="text-[10px] text-gray-400 mt-1">Invoice value + shipping</div>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <Clock size={14} className="text-[#2076C7]" />
                                        Current Status
                                      </div>
                                      <div className="font-medium text-gray-900 capitalize">{app.status.toLowerCase()}</div>
                                      <div className="text-[10px] text-gray-400 mt-1 font-bold">
                                        {app.status === 'APPROVED' ? 'Your vessel is covered' :
                                          app.status === 'PENDING' ? 'Under maritime survey' :
                                            'Policy rejected'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FileText className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-1">No policies found</p>
                        <button
                          onClick={clearFilters}
                          className="px-4 py-2 mt-4 bg-[#2076C7] text-white text-sm rounded-lg hover:bg-[#1CADA3] transition-colors"
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

        {/* Mobile / Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleRow(app.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
                        <Calendar size={12} className="text-[#2076C7]" />
                        {formatDate(app.createdat)}
                      </div>
                      <div className="text-lg font-bold text-gray-900 uppercase tracking-tighter">{app.provider_name}</div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Insured Value</div>
                      <div className="text-xl font-black text-[#2076C7]">{app.sum_insured}</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#2076C7] border border-blue-200 rounded-full text-[10px] font-bold uppercase mb-1">
                        {getPolicyIcon(app.policy_type)}
                        {app.policy_type}
                      </span>
                      <div className="text-xs font-medium text-gray-500">
                        {app.premium}
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRow === app.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-gray-50 border-t border-gray-100"
                    >
                      <div className="px-4 pb-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><FileText size={10} /> App ID</div>
                            <div className="text-xs font-mono font-bold text-gray-800">#{app.id}</div>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={10} /> Applied</div>
                            <div className="text-xs font-bold text-gray-800">{formatTime(app.createdat)}</div>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm col-span-2">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Ship size={10} /> Status Context</div>
                            <div className="text-xs font-bold text-gray-800">
                              {app.status === 'APPROVED' ? 'Your vessel is covered' :
                                app.status === 'PENDING' ? 'Under maritime survey' :
                                  'Policy rejected'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 py-12 text-center text-gray-500 px-4">
              <FileText className="w-12 h-12 text-gray-300 mb-4 mx-auto" />
              <p className="text-lg font-medium text-gray-700">No applications found</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your filters.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 mt-4 bg-[#2076C7] text-white text-sm rounded-lg hover:bg-[#1CADA3] transition-colors inline-block"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
