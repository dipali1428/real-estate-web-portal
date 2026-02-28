'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  IndianRupee,
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Printer,
  FileText,
  Home,
  Bell,
  Settings,
  LogOut,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import customerService from '../../../services/customerService';

// ==================== TYPES ====================

interface Order {
  id: number;
  company_name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: string;
  total_value: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  createdat: string;
  order_id?: string;
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

export default function OrdersPage() {
  const router = useRouter();
  
  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  // Filter States
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  
  // UI State
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // ========== FETCH ORDERS ==========
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     setLoading(true);
  //     setError(null);
      
  //     try {
  //       const token = getTokenFromCookie();
        
  //       if (!token) {
  //         router.push('/');
  //         return;
  //       }

  //       localStorage.setItem('token', token);
        
  //       // Fetch orders from API
  //       const response = await customerService.getOrders();
        
  //       if (response.success) {
  //         setOrders(response.data);
  //         setFilteredOrders(response.data);
  //         setLastUpdated(new Date().toLocaleTimeString('en-IN', {
  //           hour: '2-digit',
  //           minute: '2-digit',
  //           second: '2-digit'
  //         }));
  //         showNotification('Orders loaded successfully', 'success');
  //       } else {
  //         setError('Failed to load orders');
  //       }
  //     } catch (err: any) {
  //       console.error('Orders fetch error:', err);
        
  //       if (err.response?.status === 401) {
  //         showNotification('Session expired. Please login again.', 'error');
  //         removeTokenCookie();
  //         localStorage.removeItem('token');
  //         router.push('/');
  //       } else {
  //         setError(err.response?.data?.message || 'Failed to load orders');
  //         showNotification('Failed to load orders', 'error');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
    
  //   // Auto refresh every 60 seconds
  //   const interval = setInterval(fetchOrders, 60000);
  //   return () => clearInterval(interval);
  // }, [router]);

  // ========== APPLY FILTERS ==========
  useEffect(() => {
    let filtered = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(order => order.type === typeFilter);
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
      );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdat).getTime() - new Date(a.createdat).getTime());
    
    setFilteredOrders(filtered);
  }, [orders, statusFilter, typeFilter, searchTerm]);

  // ========== SHOW NOTIFICATION ==========
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  // ========== CLEAR FILTERS ==========
  const clearFilters = () => {
    setStatusFilter('ALL');
    setTypeFilter('ALL');
    setSearchTerm('');
  };

  // ========== EXPORT ORDERS ==========
  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Date', 'Type', 'Company', 'Quantity', 'Price', 'Total', 'Status'].join(','),
      ...filteredOrders.map(order => [
        order.id,
        new Date(order.createdat).toLocaleDateString('en-IN'),
        order.type,
        `"${order.company_name}"`,
        order.quantity,
        parseFloat(order.price).toFixed(2),
        parseFloat(order.total_value).toFixed(2),
        order.status
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification('Orders exported successfully', 'success');
  };

  // ========== TOGGLE ORDER EXPAND ==========
  const toggleOrder = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // ========== GO BACK TO DASHBOARD ==========
  const goToDashboard = () => {
    router.push('/customer/unlisted');
  };

  // ========== HANDLE LOGOUT ==========
  const handleLogout = async () => {
    try {
      await customerService.logout();
      removeTokenCookie();
      localStorage.removeItem('token');
      showNotification('Logged out successfully', 'success');
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
      showNotification('Failed to logout', 'error');
    }
  };

  // ========== FORMATTERS ==========
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
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

  const formatDateTime = (dateString: string) => {
    return `${formatDate(dateString)} • ${formatTime(dateString)}`;
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
      COMPLETED: { 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700', 
        icon: CheckCircle, 
        label: 'Completed' 
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
      CANCELLED: { 
        bg: 'bg-gray-50', 
        text: 'text-gray-700', 
        icon: XCircle, 
        label: 'Cancelled' 
      }
    };

    const { bg, text, icon: Icon, label } = config[status] || config.PENDING;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${bg} ${text}`}>
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
          ? 'bg-blue-50 text-blue-700' 
          : 'bg-rose-50 text-rose-700'
      }`}>
        {type === 'BUY' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {type}
      </span>
    );
  };

  // ========== CALCULATE STATS ==========
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const approvedOrders = orders.filter(o => o.status === 'APPROVED' || o.status === 'COMPLETED').length;
  const totalBuyValue = orders
    .filter(o => o.type === 'BUY' && (o.status === 'APPROVED' || o.status === 'COMPLETED'))
    .reduce((sum, o) => sum + parseFloat(o.total_value), 0);
  const totalSellValue = orders
    .filter(o => o.type === 'SELL' && (o.status === 'APPROVED' || o.status === 'COMPLETED'))
    .reduce((sum, o) => sum + parseFloat(o.total_value), 0);

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">Loading your orders...</p>
          <p className="text-xs text-gray-400 mt-2">Please wait while we fetch your order history</p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-red-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Orders</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Retry
            </button>
            <button 
              onClick={goToDashboard}
              className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      
      {/* Notifications */}
      <div className="fixed top-20 right-5 z-[100] flex flex-col gap-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideInRight ${
              n.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
              n.type === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            {n.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
            {n.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600" />}
            {n.type === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
            <span className="text-sm font-medium">{n.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={goToDashboard}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all group"
                title="Back to Dashboard"
              >
                <Home size={20} className="text-gray-600 group-hover:text-[#2076C7]" />
              </button>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                <ShoppingBag size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
                  <span className="px-2 py-0.5 bg-blue-50 text-[#2076C7] text-[10px] font-bold rounded-full border border-blue-200">
                    {totalOrders} Total
                  </span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} className="text-gray-400" />
                  Last updated: {lastUpdated || 'Just now'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                    onClick={exportOrders}
                    className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
                    >
                    <Download className="w-4 h-4" />
                        Export CSV
                </button>
              <button
                onClick={handleLogout}
                className="p-2.5 hover:bg-red-50 rounded-xl transition-all text-gray-600 hover:text-red-600 border border-transparent hover:border-red-200"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <ShoppingBag size={16} className="text-[#2076C7]" />
              Total Orders
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Clock size={16} className="text-amber-600" />
              Pending
            </div>
            <p className="text-2xl font-bold text-amber-600">{pendingOrders}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <CheckCircle size={16} className="text-emerald-600" />
              Completed
            </div>
            <p className="text-2xl font-bold text-emerald-600">{approvedOrders}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <IndianRupee size={16} className="text-purple-600" />
              Total Value
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency((totalBuyValue + totalSellValue).toFixed(2))}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
            >
              <option value="ALL">All Types</option>
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
            
            {/* Clear Filters */}
            {(statusFilter !== 'ALL' || typeFilter !== 'ALL' || searchTerm) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-[#2076C7]">{filteredOrders.length}</span> orders
            {filteredOrders.length !== orders.length && (
              <> of <span className="font-bold text-gray-900">{orders.length}</span> total</>
            )}
          </p>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  {/* Main Order Row */}
                  <div
                    className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left Section - Order Info */}
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          order.type === 'BUY' ? 'bg-blue-50' : 'bg-rose-50'
                        }`}>
                          {order.type === 'BUY' ? (
                            <TrendingUp size={20} className="text-blue-600" />
                          ) : (
                            <TrendingDown size={20} className="text-rose-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{order.company_name}</h3>
                            <span className="text-xs text-gray-500">#{order.id}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-600">{formatDateTime(order.createdat)}</span>
                            <span className="text-gray-300">•</span>
                            <span className="font-medium text-gray-900">
                              {order.quantity} shares
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section - Status & Expand */}
                      <div className="flex items-center gap-4 ml-14 md:ml-0">
                        <div className="text-right">
                          <TypeBadge type={order.type} />
                          <div className="mt-1">
                            <StatusBadge status={order.status} />
                          </div>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-[#2076C7] transition-colors">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/50 p-5">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Quantity</p>
                          <p className="text-lg font-bold text-gray-900">{order.quantity.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Price per Share</p>
                          <p className="text-lg font-bold text-[#2076C7]">{formatCurrency(order.price)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Total Value</p>
                          <p className="text-lg font-bold text-emerald-600">{formatCurrency(order.total_value)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Order ID</p>
                          <p className="text-sm font-mono font-medium text-gray-900">#{order.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                          <FileText size={16} />
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                          <Eye size={16} />
                          Track Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Orders Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {orders.length === 0 
                ? "You haven't placed any orders yet. Start investing to see your orders here."
                : "No orders match your current filters. Try adjusting your search criteria."}
            </p>
            {orders.length === 0 ? (
              <button
                onClick={() => router.push('/products/unlisted/buy-shares')}
                className="px-6 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Browse Companies
              </button>
            ) : (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <RefreshCw size={12} className="animate-spin-slow" />
            <span>Auto-updates every 60 seconds</span>
          </div>
        </div>
      </main>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}