'use client';

import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Wallet,
  Sparkles,
  Landmark,
  CalendarCheck,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import customerService from '../../../../services/customerService';
import SimpleFDCalculator from '../../../../products/FD/components/SimpleFDCalculator';

// ==================== TYPES ====================

interface FDDashboardData {
  total_invested: string;
  active_fds: string;
  maturing_soon: string;
}

// ==================== HELPER FUNCTIONS ====================

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(row => row.startsWith('authToken='));
  return authCookie ? authCookie.split('=')[1] : null;
};

const removeTokenCookie = (): void => {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
};

// ==================== MAIN DASHBOARD COMPONENT ====================

const FDDashboard: React.FC = () => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<FDDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [userName, setUserName] = useState<string>('Investor');
  const [greeting, setGreeting] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  // ========== CHECK AUTH AND FETCH DATA ==========
  useEffect(() => {
    // Check wishlist items for cart
    const saved = localStorage.getItem('wishlistItems');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        const ids = new Set<number>(
          items.filter((i: any) => i.category === 'fixed-income').map((i: any) => i.id)
        );
        setBookmarkedIds(ids);
      } catch (e) {
        console.error('Error loading wishlist in dashboard', e);
      }
    }
    const token = getTokenFromCookie();

    if (!token) {
      router.push('/');
      return;
    }

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        localStorage.setItem('token', token);

        // Try to fetch FD-specific dashboard data
        // Falls back to default values if FD API isn't available yet
        let fdData: FDDashboardData = {
          total_invested: '0',
          active_fds: '0',
          maturing_soon: '0',
        };

        try {
          const dashboardResponse = await customerService.getDashboard();
          if (dashboardResponse?.success) {
            fdData = {
              total_invested: dashboardResponse.data?.total_invested || '0',
              active_fds: dashboardResponse.data?.active_fds || '0',
              maturing_soon: dashboardResponse.data?.maturing_soon || '0',
            };
          }
        } catch {
          // FD API may not be available yet — use defaults silently
        }

        setDashboard(fdData);

        // Fetch profile data
        try {
          const profileResponse = await customerService.getProfile();
          if (profileResponse?.success) {
            const fullName = profileResponse.data?.name || 'Investor';
            setUserName(fullName.split(' ')[0] || 'Investor');
          }
        } catch (profileErr) {
          console.error('Profile fetch error:', profileErr);
        }

      } catch (err: unknown) {
        console.error('FD Dashboard error:', err);
        const errObj = err as { response?: { status?: number, data?: { message?: string } }, message?: string };

        if (errObj.response?.status === 401 || errObj.message?.includes('401')) {
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(errObj.response?.data?.message || errObj.message || 'Unable to connect to server');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();

    const interval = setInterval(loadDashboardData, 60000);
    return () => clearInterval(interval);
  }, [router]);

  // ========== HANDLE LOGOUT ==========
  const handleLogout = async () => {
    try {
      await customerService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    removeTokenCookie();
    localStorage.removeItem('token');
    router.push('/');
  };

  // ========== FORMATTERS ==========
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '₹0.00';
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ========== LOADING STATE ==========
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center w-full max-w-sm mx-auto">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-4 sm:mt-6 animate-pulse text-sm sm:text-base">Loading your FD dashboard...</p>
          <p className="text-xs text-gray-400 mt-2">Fetching your fixed deposit data</p>
        </div>
      </div>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 text-center border border-red-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Unable to Load Dashboard</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <RefreshCw size={18} />
              Retry Connection
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2">
              <Sparkles size={14} className="text-[#2076C7] flex-shrink-0" />
              <span className="truncate">Here&apos;s your Fixed Deposit overview</span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

          {/* Total FD Investment Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-blue-50 rounded-bl-full -mr-5 -mt-5 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm p-1.5 rounded-lg"
              >
                {balanceVisible ? <Eye size={16} className="sm:w-[18px] sm:h-[18px]" /> : <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" />}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
              <Wallet size={12} className="sm:w-[14px] sm:h-[14px] text-gray-400" />
              Total FD Investment
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2 break-words">
              {balanceVisible && dashboard ? formatCurrency(dashboard.total_invested) : '••••••'}
            </p>
          </div>

          {/* Active FDs Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3 sm:mb-4">
              <Landmark className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Active Fixed Deposits</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2 break-words">
              {dashboard ? parseInt(dashboard.active_fds).toLocaleString() : '0'}
            </p>
            <p className="text-xs text-gray-500">Currently active FDs</p>
          </div>

          {/* Maturing Soon Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3 sm:mb-4">
              <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Maturing Soon</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2 break-words">
              {dashboard ? parseInt(dashboard.maturing_soon).toLocaleString() : '0'}
            </p>
            <p className="text-xs text-gray-500">FDs maturing within 30 days</p>
          </div>
        </div>

        {/* FD Calculator Section */}
        <div className="mb-6 sm:mb-8">
          <SimpleFDCalculator />
        </div>
      </main>

      {/* Floating Cart Button */}
      {bookmarkedIds.size > 0 && (
        <button
          onClick={() => router.push('/customer/wishlist')}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#2076C7] rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a5e9e] hover:scale-105 transition-all duration-300"
          aria-label="View Saved Funds"
        >
          <ShoppingCart className="text-white w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {bookmarkedIds.size}
          </span>
        </button>
      )}

      {/* Custom animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:flex {
            display: flex;
          }
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:items-center {
            align-items: center;
          }
          .xs\\:ml-0 {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FDDashboard;
