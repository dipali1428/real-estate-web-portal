'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, Download, CheckCircle, XCircle, Clock, 
  ArrowUpRight, Filter, IndianRupee, RefreshCw, AlertCircle,
  FileText, Activity, X, Search, SlidersHorizontal, Calendar,
  Shield 
} from 'lucide-react';


// ==================== MOCK DATA ====================

interface InsuranceApplication {
  id: number;
  provider_name: string;
  plan_type: string;
  sum_insured: string;
  premium: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'FAILED' | 'CANCELLED';
  createdat: string;
}

const mockApplications: InsuranceApplication[] = [
  {
    id: 10245,
    provider_name: 'HDFC ERGO',
    plan_type: 'Optima Secure',
    sum_insured: '₹10 Lakh',
    premium: '₹1,200/mo',
    status: 'APPROVED',
    createdat: '2024-03-15T10:30:00Z'
  },
  {
    id: 10312,
    provider_name: 'Niva Bupa',
    plan_type: 'ReAssure',
    sum_insured: '₹5 Lakh',
    premium: '₹850/mo',
    status: 'PENDING',
    createdat: '2024-03-28T14:45:00Z'
  },
  {
    id: 10189,
    provider_name: 'Care Health',
    plan_type: 'Care Supreme',
    sum_insured: '₹25 Lakh',
    premium: '₹2,100/mo',
    status: 'REJECTED',
    createdat: '2024-02-10T09:15:00Z'
  }
];

// ==================== MAIN COMPONENT ====================

export default function MyHealthInsurance() {
  const [applications, setApplications] = useState<InsuranceApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<InsuranceApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [providerSearch, setProviderSearch] = useState<string>('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  }, []);

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

  const approvedCount = applications.filter(app => app.status === 'APPROVED').length;
  const pendingCount = applications.filter(app => app.status === 'PENDING').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#2076C7]" />
              My Applications
            </h1>
            <span className="px-3 py-1 bg-blue-50 text-[#2076C7] text-xs font-bold rounded-full border border-blue-200">
              {filteredApplications.length} of {applications.length}
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
          </button>
          
          <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium flex items-center gap-2 transition-all">
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
                  Provider Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search provider..."
                    value={providerSearch}
                    onChange={(e) => setProviderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                  />
                </div>
              </div>
            </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
          <p className="text-xs text-gray-400 mt-2">
            {approvedCount} active policies • {pendingCount} in review
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Active Coverage</p>
          <p className="text-2xl font-bold text-emerald-600">{approvedCount > 0 ? applications.find(a => a.status === 'APPROVED')?.sum_insured : 'None'}</p>
          <p className="text-xs text-gray-400 mt-2">Across approved plans</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-sm font-medium text-gray-500 mb-1">Awaiting Decision</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-gray-400 mt-2">Verification in progress</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Applied Date</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Provider</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Plan details</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Sum Insured</th>
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
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#2076C7] border border-blue-200 rounded-full text-[10px] font-bold uppercase">
                          {app.plan_type}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">ID: #{app.id}</div>
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
                    {expandedRow === app.id && (
                      <tr className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                        <td colSpan={6} className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <FileText size={14} className="text-[#2076C7]" />
                                Application Details
                              </div>
                              <div className="font-medium text-gray-900">#{app.id} - {app.plan_type}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Submitted on {formatDate(app.createdat)}</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Building2 size={14} className="text-[#2076C7]" />
                                Insurance Provider
                              </div>
                              <div className="font-medium text-gray-900">{app.provider_name}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Health Insurance Partner</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <IndianRupee size={14} className="text-[#2076C7]" />
                                Coverage & Premium
                              </div>
                              <div className="font-bold text-gray-900">{app.sum_insured} @ {app.premium}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Monthly recurring premium</div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <Clock size={14} className="text-[#2076C7]" />
                                Current Status
                              </div>
                              <div className="font-medium text-gray-900 capitalize">{app.status.toLowerCase()}</div>
                              <div className="text-[10px] text-gray-400 mt-1 text-bold">
                                {app.status === 'APPROVED' ? 'Your policy is active' : 
                                 app.status === 'PENDING' ? 'Under medical review' : 
                                 'Application rejected'}
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
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <FileText className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-1">No applications found</p>
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
