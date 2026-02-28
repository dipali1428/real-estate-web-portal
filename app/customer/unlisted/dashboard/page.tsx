'use client';

import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  TrendingUp,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Wallet,
  BarChart3,
  Building,
  ChevronRight,
  Sparkles,
  Target,
  Users,
  LineChart,
  Flame,
  Award,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import customerService from '../../../services/customerService';

// ==================== TYPES ====================

interface DashboardData {
  total_invested: string;
  total_transactions: string;
  pending_transactions: string;
}

interface ProfileData {
  name?: string;
  email?: string;
  mobile?: string;
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

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [userName, setUserName] = useState<string>('Investor');
  const [greeting, setGreeting] = useState<string>('');

  // ========== CHECK AUTH AND FETCH DATA ==========
  useEffect(() => {
    // Check if user is logged in by looking for authToken cookie
    const token = getTokenFromCookie();
    
    // If no token, redirect to home page which will open login modal
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
        // Store token in localStorage for the API service
        localStorage.setItem('token', token);
        
        // Fetch dashboard data using customerService
        const dashboardResponse = await customerService.getDashboard();
        
        if (dashboardResponse?.success) {
          setDashboard(dashboardResponse.data);
          setLastUpdated(new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }));
        } else {
          setError('Failed to load dashboard data');
        }

        // Fetch profile data using customerService
        try {
          const profileResponse = await customerService.getProfile();
          if (profileResponse?.success) {
            const fullName = profileResponse.data?.name || 'Investor';
            setUserName(fullName.split(' ')[0] || 'Investor');
          }
        } catch (profileErr) {
          console.error('Profile fetch error:', profileErr);
          // Don't block dashboard if profile fails
        }

      } catch (err: any) {
        console.error('Dashboard error:', err);
        
        // Check for 401 Unauthorized
        if (err.response?.status === 401 || err.message?.includes('401')) {
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(err.response?.data?.message || err.message || 'Unable to connect to server');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
    
    // Auto refresh every 60 seconds
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
    // Clear everything and redirect
    removeTokenCookie();
    localStorage.removeItem('token');
    router.push('/');
  };

  // ========== FORMATTERS ==========
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ========== LOADING STATE ==========
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-6 animate-pulse">Loading your dashboard...</p>
          <p className="text-xs text-gray-400 mt-2">Fetching your investment data</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Dashboard</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              Retry Connection
            </button>
            <button 
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
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
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-[#2076C7] bg-blue-50 px-3 py-1 rounded-full">
                {greeting}!
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              Welcome back, {userName}!
              <span className="text-base font-normal text-gray-500 ml-2 hidden sm:inline">
                Ready to grow your wealth?
              </span>
            </h2>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Sparkles size={16} className="text-[#2076C7]" />
              Here's your complete investment overview and portfolio performance
            </p>
          </div>
          
          {/* Quick Stats Pills */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
              <Target size={14} className="text-[#2076C7]" />
              <span className="text-xs font-medium text-gray-700">Target: ₹10L</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
              <Award size={14} className="text-amber-500" />
              <span className="text-xs font-medium text-gray-700">Silver Tier</span>
            </div>
          </div>
        </div>

        {/* Stats Grid - From your API */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Total Invested Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-5 -mt-5 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <IndianRupee className="w-7 h-7 text-white" />
              </div>
              <button 
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm p-1.5 rounded-lg"
              >
                {balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
              <Wallet size={14} className="text-gray-400" />
              Total Invested
            </p>
            <p className="text-3xl font-black text-gray-900 mb-2">
              {balanceVisible && dashboard ? formatCurrency(dashboard.total_invested) : '••••••'}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit">
              <TrendingUp size={14} />
              <span className="font-semibold">+12.4% this month</span>
            </div>
          </div>

          {/* Total Transactions Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Transactions</p>
            <p className="text-3xl font-black text-gray-900 mb-2">
              {dashboard ? parseInt(dashboard.total_transactions).toLocaleString() : '0'}
            </p>
            <p className="text-xs text-gray-500">Lifetime transactions</p>
          </div>

          {/* Pending Transactions Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4">
              <RefreshCw className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Transactions</p>
            <p className="text-3xl font-black text-gray-900 mb-2">
              {dashboard ? parseInt(dashboard.pending_transactions).toLocaleString() : '0'}
            </p>
            <p className="text-xs text-gray-500">Awaiting confirmation</p>
          </div>
        </div>

        {/* Market Insights & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Market Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <LineChart size={20} className="text-[#2076C7]" />
                Market Overview
              </h3>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={12} />
                +5.39% YTD
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Unlisted Index</p>
                <p className="text-xl font-bold text-gray-900">₹2,010.17</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">+5.2% this month</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Total Volume</p>
                <p className="text-xl font-bold text-gray-900">₹2.8K Cr</p>
                <p className="text-xs text-gray-500 font-medium mt-1">24h volume</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Flame size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Trending</p>
                    <p className="text-sm font-bold text-gray-900">Zepto, OYO, PharmEasy</p>
                  </div>
                </div>
                <Link href="/customer/unlisted/companies" className="text-xs text-[#2076C7] font-semibold hover:underline">
                  View all
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-[#2076C7]" />
              Quick Stats
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Active Investments</span>
                </div>
                <span className="font-bold text-gray-900">3</span>
              </div>
              
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Leaf size={16} className="text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700">Diversification</span>
                </div>
                <span className="font-bold text-gray-900">4 sectors</span>
              </div>
              
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Users size={16} className="text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700">Referrals</span>
                </div>
                <span className="font-bold text-gray-900">2</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link 
                href="/customer/unlisted/portfolio"
                className="flex items-center justify-between text-[#2076C7] hover:text-[#1CADA3] font-semibold text-sm group"
              >
                View detailed portfolio
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Last Updated Info */}
        <div className="text-center text-xs text-gray-400">
          <span>Last updated: {lastUpdated || 'Just now'}</span>
        </div>
      </main>
      
      {/* Add custom animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;