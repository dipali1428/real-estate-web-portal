'use client';

import { useState, useEffect } from 'react';
import { AdminService } from '../../services/unlistedadminservices';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  RotateCw, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Mail,
  Phone,
  Calendar,
  Eye,
  Check,
  X,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Inbox,
  Archive,
  Star,
  Trash2,
  MessageCircle,
  Send,
  MoreVertical,
  RefreshCw,
  Tag,
  ShoppingCart,
  HandCoins,
  Building2,
  Package,
  TrendingUp,
  Users,
  BarChart3
} from "lucide-react";

// Define the Enquiry type locally to match your API response
interface LocalEnquiry {
  id: number;
  company_id: number;
  enquiry_type: 'buy' | 'sell';
  full_name: string;
  email: string;
  phone: string;
  quantity: number;
  created_at: string;
  status?: 'PENDING' | 'RESOLVED' | 'ARCHIVED';
  updatedAt?: string;
}

type EnquiryStatus = 'ALL' | 'PENDING' | 'RESOLVED' | 'ARCHIVED';
type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

// --- ENQUIRY DETAIL MODAL ---
interface EnquiryDetailModalProps {
  enquiry: LocalEnquiry | null;
  onClose: () => void;
  onResolve?: (id: number) => void;
  onArchive?: (id: number) => void;
}

const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({ enquiry, onClose, onResolve, onArchive }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'notes'>('details');
  
  if (!enquiry) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }} 
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] px-8 py-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">Enquiry Details</h3>
                <p className="text-white/80 text-sm mt-1 flex items-center gap-2">
                  <span>ID: #{enquiry.id}</span>
                  <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                  <span>{new Date(enquiry.created_at).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 px-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'details' 
                ? 'text-[#2076C7]' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Details
            {activeTab === 'details' && (
              <motion.div layoutId="enquiryTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2076C7]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'notes' 
                ? 'text-[#2076C7]' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Activity Notes
            {activeTab === 'notes' && (
              <motion.div layoutId="enquiryTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2076C7]" />
            )}
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Status Badge & Enquiry Type */}
              <div className="flex justify-between items-center">
                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold ${
                  enquiry.enquiry_type === 'buy' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {enquiry.enquiry_type === 'buy' ? (
                    <><ShoppingCart className="w-4 h-4" /> BUY ENQUIRY</>
                  ) : (
                    <><HandCoins className="w-4 h-4" /> SELL ENQUIRY</>
                  )}
                </span>
                <span className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${
                  enquiry.status === 'RESOLVED' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : enquiry.status === 'ARCHIVED'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {enquiry.status === 'RESOLVED' && <CheckCircle className="w-4 h-4" />}
                  {enquiry.status === 'ARCHIVED' && <Archive className="w-4 h-4" />}
                  {(!enquiry.status || enquiry.status === 'PENDING') && <Clock className="w-4 h-4" />}
                  {enquiry.status || 'PENDING'}
                </span>
              </div>

              {/* Quick Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Building2 className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Company ID</p>
                  <p className="text-lg font-bold text-gray-900">{enquiry.company_id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Package className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="text-lg font-bold text-gray-900">{enquiry.quantity.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Tag className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-lg font-bold text-gray-900 uppercase">{enquiry.enquiry_type}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="text-xs font-black uppercase text-[#2076C7] mb-4 tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" /> Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2076C7] font-bold text-xl">
                      {enquiry.full_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{enquiry.full_name}</p>
                      <p className="text-sm text-gray-500">Customer</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white rounded-xl p-4">
                      <Mail className="w-4 h-4 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 mb-1">Email Address</p>
                      <a href={`mailto:${enquiry.email}`} className="text-sm font-bold text-[#2076C7] hover:underline break-all">
                        {enquiry.email}
                      </a>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <Phone className="w-4 h-4 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                      <a href={`tel:${enquiry.phone}`} className="text-sm font-bold text-gray-900">
                        {enquiry.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Created</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(enquiry.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Last Updated</p>
                  <p className="text-sm font-bold text-gray-900">
                    {enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString() : new Date(enquiry.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Activity Notes Tab
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2076C7]/10 flex items-center justify-center text-[#2076C7] text-xs font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">System</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {enquiry.enquiry_type.toUpperCase()} enquiry created for {enquiry.quantity} shares
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">{new Date(enquiry.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              {enquiry.status === 'RESOLVED' && (
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-emerald-700">Resolved</p>
                      <p className="text-xs text-emerald-600 mt-0.5">Enquiry marked as resolved</p>
                      <p className="text-[10px] text-emerald-500 mt-2">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
              {enquiry.status === 'ARCHIVED' && (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <Archive className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-700">Archived</p>
                      <p className="text-xs text-gray-500 mt-0.5">Enquiry archived</p>
                      <p className="text-[10px] text-gray-400 mt-2">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            {(!enquiry.status || enquiry.status === 'PENDING') && onResolve && (
              <button
                onClick={() => onResolve(enquiry.id)}
                className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Resolved
              </button>
            )}
            {(!enquiry.status || enquiry.status === 'PENDING') && onArchive && (
              <button
                onClick={() => onArchive(enquiry.id)}
                className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <Archive className="w-4 h-4" />
                Archive
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3.5 border border-gray-200 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- STATS CARD COMPONENT (Updated to match UserManagement style) ---
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
    <div className={`w-12 h-12 bg-linear-to-r ${color} rounded-2xl flex items-center justify-center text-white shadow-sm mb-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <h2 className="text-2xl font-black text-gray-900 mt-1">{value.toLocaleString()}</h2>
    {subText && (
      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg> 
        {subText}
      </p>
    )}
  </motion.div>
);

// --- MAIN ENQUIRY MANAGEMENT COMPONENT ---
const EnquiryManagement: React.FC = () => {
  const [enquiries, setEnquiries] = useState<LocalEnquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<LocalEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedEnquiry, setSelectedEnquiry] = useState<LocalEnquiry | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  // Fetch enquiries on mount
  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...enquiries];

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(e => e.enquiry_type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(e => 
        statusFilter === 'PENDING' ? (!e.status || e.status === 'PENDING') : e.status === statusFilter
      );
    }

    // Apply date range filter
    const now = new Date();
    if (dateRange === 'today') {
      const today = new Date(now.setHours(0, 0, 0, 0));
      filtered = filtered.filter(e => new Date(e.created_at) >= today);
    } else if (dateRange === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = filtered.filter(e => new Date(e.created_at) >= weekAgo);
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filtered = filtered.filter(e => new Date(e.created_at) >= monthAgo);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(e => 
        e.full_name?.toLowerCase().includes(term) ||
        e.email?.toLowerCase().includes(term) ||
        e.phone?.includes(term) ||
        e.id?.toString().includes(term) ||
        e.enquiry_type?.includes(term)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'name-asc':
          return (a.full_name || '').localeCompare(b.full_name || '');
        case 'name-desc':
          return (b.full_name || '').localeCompare(a.full_name || '');
        default:
          return 0;
      }
    });

    setFilteredEnquiries(filtered);
  }, [enquiries, searchTerm, typeFilter, statusFilter, sortBy, dateRange]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getAllEnquiries();
      // Handle the response structure based on your API
      const enquiriesData = (response as any)?.data || [];
      // Map to LocalEnquiry type
      const mappedData: LocalEnquiry[] = enquiriesData.map((e: any) => ({
        id: e.id,
        company_id: e.company_id,
        enquiry_type: e.enquiry_type || 'buy',
        full_name: e.full_name || '',
        email: e.email || '',
        phone: e.phone || '',
        quantity: e.quantity || 0,
        created_at: e.created_at || new Date().toISOString(),
        status: e.status || 'PENDING'
      }));
      setEnquiries(mappedData);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveEnquiry = async (id: number) => {
    try {
      setEnquiries(prev => prev.map(e => 
        e.id === id ? { ...e, status: 'RESOLVED', updatedAt: new Date().toISOString() } : e
      ));
      setShowDetailModal(false);
    } catch (error) {
      console.error('Failed to resolve enquiry:', error);
    }
  };

  const handleArchiveEnquiry = async (id: number) => {
    try {
      setEnquiries(prev => prev.map(e => 
        e.id === id ? { ...e, status: 'ARCHIVED', updatedAt: new Date().toISOString() } : e
      ));
      setShowDetailModal(false);
    } catch (error) {
      console.error('Failed to archive enquiry:', error);
    }
  };

  const getStatusCount = (status: EnquiryStatus) => {
    if (status === 'ALL') return enquiries.length;
    if (status === 'PENDING') {
      return enquiries.filter(e => !e.status || e.status === 'PENDING').length;
    }
    return enquiries.filter(e => e.status === status).length;
  };

  const getTypeCount = (type: 'buy' | 'sell') => {
    return enquiries.filter(e => e.enquiry_type === type).length;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('ALL');
    setSortBy('newest');
    setDateRange('all');
  };

  // Calculate total shares requested
  const totalSharesRequested = enquiries.reduce((sum, e) => sum + e.quantity, 0);

  // Loading State
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 animate-fade-in pb-10">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> Enquiry Management
          </h2>
          <p className="text-sm opacity-90">Manage and respond to customer buy/sell enquiries.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchEnquiries} 
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid - Updated to match UserManagement style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          icon={Inbox}
          label="Total Enquiries"
          value={enquiries.length}
          color="from-blue-500 to-cyan-500"
          subText="Active Requests"
        />
        <StatsCard 
          icon={ShoppingCart}
          label="Buy Requests"
          value={getTypeCount('buy')}
          color="from-green-500 to-emerald-500"
          subText="Purchase Intent"
        />
        <StatsCard 
          icon={HandCoins}
          label="Sell Requests"
          value={getTypeCount('sell')}
          color="from-orange-500 to-yellow-500"
          subText="Sell Orders"
        />
        <StatsCard 
          icon={Package}
          label="Total Shares"
          value={totalSharesRequested}
          color="from-rose-500 to-pink-500"
          subText="Volume Requested"
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or ID..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  showFilters 
                    ? 'bg-[#2076C7] text-white shadow-lg shadow-blue-100' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {(typeFilter !== 'all' || statusFilter !== 'ALL' || dateRange !== 'all' || sortBy !== 'newest') && (
                  <span className="w-5 h-5 bg-white text-[#2076C7] rounded-full text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 mt-2 border-t border-gray-100">
                  {/* Type Filter */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Enquiry Type</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium outline-none focus:border-[#2076C7]"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value as 'all' | 'buy' | 'sell')}
                    >
                      <option value="all">All Types</option>
                      <option value="buy">Buy Only</option>
                      <option value="sell">Sell Only</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Status</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium outline-none focus:border-[#2076C7]"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as EnquiryStatus)}
                    >
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Date Range</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium outline-none focus:border-[#2076C7]"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value as typeof dateRange)}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Sort By</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium outline-none focus:border-[#2076C7]"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="name-asc">Name A-Z</option>
                      <option value="name-desc">Name Z-A</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Summary */}
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Showing <span className="text-[#2076C7] font-bold">{filteredEnquiries.length}</span> of {enquiries.length} enquiries
            </span>
            <span className="w-px h-4 bg-gray-200"></span>
            <span className="text-sm text-gray-500">
              Buy: {getTypeCount('buy')} | Sell: {getTypeCount('sell')}
            </span>
          </div>
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Enquiries Table - Actions always visible */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                <th className="px-6 py-5 text-left">ID & Date</th>
                <th className="px-6 py-5 text-left">Customer</th>
                <th className="px-6 py-5 text-left">Contact</th>
                <th className="px-6 py-5 text-left">Type & Quantity</th>
                <th className="px-6 py-5 text-center">Company</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry, index) => (
                  <motion.tr
                    key={enquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="font-mono font-bold text-gray-400 text-xs">#{enquiry.id}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-bold text-sm">
                          {enquiry.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{enquiry.full_name}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-600 truncate max-w-[150px]">{enquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-600">{enquiry.phone}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${
                          enquiry.enquiry_type === 'buy' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {enquiry.enquiry_type === 'buy' ? (
                            <><ShoppingCart className="w-3 h-3" /> BUY</>
                          ) : (
                            <><HandCoins className="w-3 h-3" /> SELL</>
                          )}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {enquiry.quantity.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">#{enquiry.company_id}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                        enquiry.status === 'RESOLVED' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : enquiry.status === 'ARCHIVED'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {enquiry.status === 'RESOLVED' && <CheckCircle className="w-3 h-3" />}
                        {enquiry.status === 'ARCHIVED' && <Archive className="w-3 h-3" />}
                        {(!enquiry.status || enquiry.status === 'PENDING') && <Clock className="w-3 h-3" />}
                        {enquiry.status || 'PENDING'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enquiry);
                            setShowDetailModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {(!enquiry.status || enquiry.status === 'PENDING') && (
                          <>
                            <button
                              onClick={() => handleResolveEnquiry(enquiry.id)}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Mark as Resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleArchiveEnquiry(enquiry.id)}
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Archive"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Inbox className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg font-bold text-gray-600 mb-2">No enquiries found</p>
                      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                      {(searchTerm || typeFilter !== 'all' || statusFilter !== 'ALL' || dateRange !== 'all') && (
                        <button
                          onClick={clearFilters}
                          className="mt-6 px-6 py-3 bg-[#2076C7] text-white rounded-xl font-bold text-sm hover:bg-[#1b62a5] transition-all"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Showing {filteredEnquiries.length} of {enquiries.length} entries
          </span>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center">
              <ChevronDown className="w-5 h-5 rotate-90" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#2076C7] text-white hover:bg-[#1b62a5] transition-all flex items-center justify-center font-bold">
              1
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center">
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedEnquiry && (
          <EnquiryDetailModal
            enquiry={selectedEnquiry}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedEnquiry(null);
            }}
            onResolve={handleResolveEnquiry}
            onArchive={handleArchiveEnquiry}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryManagement;