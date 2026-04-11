'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2, Download, CheckCircle, XCircle, Clock,
  Filter, IndianRupee,
  FileText, Home, X, Search, SlidersHorizontal, Calendar
} from 'lucide-react';

interface MortgageApplication {
  id: number;
  bank_name: string;
  type: string;
  tenure: number;
  interest: string;
  total_amount: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'FAILED' | 'CANCELLED';
  createdat: string;
}

export default function MyMortgageLoans({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: "explore" | "applications") => void }) {
  const [applications, setApplications] = useState<MortgageApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<MortgageApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [bankSearch, setBankSearch] = useState<string>('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  }, []);

  useEffect(() => {
    applyClientSideFilters();
  }, [statusFilter, bankSearch, applications]);

  const applyClientSideFilters = () => {
    let filtered = [...applications];

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (bankSearch) {
      filtered = filtered.filter(app =>
        app.bank_name.toLowerCase().includes(bankSearch.toLowerCase())
      );
    }

    filtered.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    setFilteredApplications(filtered);
  };

  const clearFilters = () => {
    setStatusFilter('ALL');
    setBankSearch('');
    setShowFilters(false);
  };

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${bg} ${text}`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  const pendingAmount = applications
    .filter(app => app.status === 'PENDING')
    .reduce((sum, app) => sum + parseFloat(app.total_amount), 0);

  const approvedAmount = applications
    .filter(app => app.status === 'APPROVED')
    .reduce((sum, app) => sum + parseFloat(app.total_amount), 0);

  const pendingCount = applications.filter(app => app.status === 'PENDING').length;
  const approvedCount = applications.filter(app => app.status === 'APPROVED').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* --- NEW MODERN HEADER --- */}
      <div className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60 mt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                      <FileText size={24} />
                  </div>
                  <div>
                      <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                              My Applications
                          </h2>
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                              {filteredApplications.length} Applications
                          </span>
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                          <Clock size={14} className="text-gray-400" />
                          Last updated: {lastUpdated || 'Just now'}
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
                              <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" />
                          )}
                          <Home size={14} />
                          <span>Offers</span>
                      </button>
                      <button
                          onClick={() => setActiveTab('applications')}
                          className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'applications' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                          {activeTab === 'applications' && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" />
                          )}
                          <FileText size={14} />
                          <span>Applications</span>
                      </button>
                  </div>
              </div>
          </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-end gap-3 mb-6">
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
            {(statusFilter !== 'ALL' || bankSearch) && (
              <span className="w-5 h-5 bg-white text-[#2076C7] rounded-full text-xs flex items-center justify-center font-bold">
                {[statusFilter !== 'ALL' ? 1 : 0, bankSearch ? 1 : 0].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>
          
          <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#2076C7]" />
              Filter Applications
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

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Bank Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search bank..."
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{applications.length}</p>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
            {approvedCount} app • {pendingCount} pend
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Approved</p>
            <p className="text-lg sm:text-2xl font-bold text-emerald-600 truncate">{formatCurrency(approvedAmount)}</p>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-2">Sanctioned</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Pending</p>
            <p className="text-lg sm:text-2xl font-bold text-amber-600 truncate">{formatCurrency(pendingAmount)}</p>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-2">Decision</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Avg. Tenure</p>
            <p className="text-lg sm:text-2xl font-bold text-purple-600">
              {applications.length ? Math.round(applications.reduce((acc, a) => acc + a.tenure, 0) / applications.length) : 0} Y
            </p>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-2">All apps</p>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-[#2076C7]">{filteredApplications.length}</span> applications
        </p>
      </div>

      {/* Applications List - Mobile Card View / Desktop Table View */}
      <div className="space-y-4">
        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Bank Name</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Tenure</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Rate</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Loan Amount</th>
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
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#2076C7] border border-blue-200 rounded-full text-[10px] font-bold uppercase">
                            {app.type}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="font-medium text-gray-900">{app.bank_name}</div>
                          <div className="text-xs text-gray-500">ID: {app.id}</div>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-bold text-gray-900">{app.tenure} Years</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-medium text-gray-900">{app.interest}%</span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <span className="font-bold text-[#2076C7]">{formatCurrency(app.total_amount)}</span>
                        </td>
                        <td className="py-5 px-6 text-center">
                          <StatusBadge status={app.status} />
                        </td>
                      </tr>

                      {expandedRow === app.id && (
                        <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                          <td colSpan={7} className="p-6">
                            <div className="grid grid-cols-4 gap-6">
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <FileText size={14} className="text-[#2076C7]" />
                                  Application ID
                                </div>
                                <div className="font-mono font-medium text-gray-900">#{app.id}</div>
                              </div>
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <Building2 size={14} className="text-[#2076C7]" />
                                  Loan Terms
                                </div>
                                <div className="font-medium text-gray-900">{app.interest}% for {app.tenure} Years</div>
                              </div>
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <IndianRupee size={14} className="text-[#2076C7]" />
                                  Loan Amount
                                </div>
                                <div className="font-bold text-[#2076C7]">{formatCurrency(app.total_amount)}</div>
                              </div>
                              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                  <Clock size={14} className="text-[#2076C7]" />
                                  Status
                                </div>
                                <div className="font-medium text-gray-900 capitalize">{app.status.toLowerCase()}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <FileText className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-1">No applications found</p>
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
                      <div className="text-lg font-bold text-gray-900">{app.bank_name}</div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loan Amount</div>
                      <div className="text-xl font-black text-[#2076C7]">{formatCurrency(app.total_amount)}</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#2076C7] border border-blue-200 rounded-full text-[10px] font-bold uppercase mb-1">
                        {app.type}
                      </span>
                      <div className="text-xs font-medium text-gray-500">
                        {app.interest}% • {app.tenure} Y
                      </div>
                    </div>
                  </div>
                </div>

                {expandedRow === app.id && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-50 bg-gray-50/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">App ID</div>
                        <div className="text-xs font-mono font-bold text-gray-800">#{app.id}</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time Applied</div>
                        <div className="text-xs font-bold text-gray-800">{formatTime(app.createdat)}</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Interest Rate</div>
                        <div className="text-xs font-bold text-gray-800">{app.interest}% p.a.</div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status Code</div>
                        <div className="text-xs font-bold text-gray-800">{app.status}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 py-12 text-center text-gray-500 px-4">
              <FileText className="w-12 h-12 text-gray-300 mb-4 mx-auto" />
              <p className="text-lg font-medium text-gray-700">No applications found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters.</p>
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