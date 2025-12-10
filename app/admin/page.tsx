'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AdminService } from '../services/adminService';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Define DSA interface for mapping
interface DSA {
  password: string;
  id: string;
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  head: string;
  category: string;
  date_joined: string;
  updated_at: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface UserProfile {
  id: number;
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  head: string;
  category: string;
}

interface StatsData {
  total: number;
  active: number;
  pending: number;
  inactive: number;
}

interface Enquiry {
  id: number;
  status: 'Pending' | 'Closed';
  [key: string]: any;
}

interface EnquiryStats {
  total: number;
  pending: number;
  closed: number;
}

// Function to map API data to DSA format (same as in DSA Management page)
const mapApiDataToDSA = (apiData: any[]): DSA[] => {
  return apiData.map(item => ({
    id: item.id?.toString() || '',
    adv_id: item.adv_id || '',
    name: item.name || '',
    email: item.email || '',
    mobile: item.mobile || '',
    pan: item.pan || '',
    city: item.city || '',
    head: item.head || '',
    category: item.category || '',
    date_joined: item.date_joined || '',
    updated_at: item.updated_at || '',
    role: item.role || '',
    status: item.status || 'Active',
    password: item.password || ''
  }));
};

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0
  });
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [enquiryStats, setEnquiryStats] = useState<EnquiryStats>({
    total: 0,
    pending: 0,
    closed: 0
  });
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const hasFetched = useRef(false);

  // ✅ Fetch all dashboard data from APIs
  const fetchDashboardData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) return router.push("/");
      
      // Fetch user profile
      const profileData = await AdminService.getAdminProfile();
      setUser(profileData.user);

      // ✅ Fetch DSA list and calculate statistics
      try {
        const dsaListResponse = await AdminService.dsaList();
        
        const apiData = 
          (Array.isArray(dsaListResponse) && dsaListResponse) ||
          dsaListResponse.data ||
          dsaListResponse.dsas ||
          dsaListResponse.result ||
          dsaListResponse.items ||
          dsaListResponse.dsalist ||
          [];
        
        if (Array.isArray(apiData)) {
          const mappedDSAs = mapApiDataToDSA(apiData);
          
          // Calculate statistics
          setStats({
            total: mappedDSAs.length,
            active: mappedDSAs.filter(d => d.status === 'Active').length,
            pending: mappedDSAs.filter(d => d.status === 'Pending').length,
            inactive: mappedDSAs.filter(d => d.status === 'Inactive').length
          });
        } else {
          // Fallback if API doesn't return array
          setStats({
            total: 0,
            active: 0,
            pending: 0,
            inactive: 0
          });
        }
      } catch (dsaError) {
        console.error("Error fetching DSA stats:", dsaError);
        // Fallback values
        setStats({
          total: 0,
          active: 0,
          pending: 0,
          inactive: 0
        });
      }

      // Fetch enquiry statistics
      const enquiriesData = await AdminService.contactusData();
      if (enquiriesData.success && enquiriesData.contactus) {
        const allEnquiries = enquiriesData.contactus;
        setEnquiries(allEnquiries);
        setTotalCount(enquiriesData.count || allEnquiries.length);
        
        // Calculate enquiry statistics
        const pendingCount = allEnquiries.filter((e: { status: string; }) => e.status === 'Pending').length;
        const closedCount = allEnquiries.filter((e: { status: string; }) => e.status === 'Closed').length;
        
        setEnquiryStats({
          total: enquiriesData.count || allEnquiries.length,
          pending: pendingCount,
          closed: closedCount
        });
      }

    } catch (error: any) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to fetch dashboard data.");
      
      if (error?.response?.status === 401) {
        toast.error("Login session expired! Please login again.", {
          duration: 2000,
        });

        document.cookie = `authToken=; path=/; expires=${new Date(0).toUTCString()}`;

        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    }
  };

  // Initial fetch
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const initDashboard = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };
    initDashboard();
  }, []);

  // Refresh dashboard function
  const refreshDashboard = async () => {
    setRefreshing(true);
    try {
      await fetchDashboardData();
      toast.success("Dashboard refreshed successfully");
    } catch (error) {
      console.error("Refresh error:", error);
      toast.error("Failed to refresh data");
    } finally {
      setRefreshing(false);
    }
  };

  // token check 
  useEffect(() => {
    const cookie = document.cookie.includes("authToken=");
    if (!cookie) router.push("/");
  }, []);

  // Redirect to enquiry page
  const navigateToEnquiries = () => {
    router.push("/admin/enquiry");
  };

  // Redirect to DSA management
  const navigateToDSA = () => {
    router.push("/admin/dsa");
  };

  if (loading || !user)
    return (
      <div className="flex justify-center items-center h-[60vh] text-[#1CADA3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1CADA3] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );

  return (
    <div className="flex-1 p-4 sm:p-6">
      {/* Dashboard Header */}
      <section className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          </div>
          <button
            onClick={refreshDashboard}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {refreshing ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Welcome back, {user?.name || "Partner"}.
          </h2>
          <p className="text-sm sm:text-base mb-4">Here&apos;s a snapshot of your business performance.</p>
          
        </motion.div>

        {/* DSA Statistics Cards */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">DSA Overview</h3>
           
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Total DSAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total DSAs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">All registered DSAs</span>
              </div>
            </motion.div>

            {/* Active DSAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active DSAs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Currently active</span>
              </div>
            </motion.div>

            {/* Pending DSAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending DSAs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Awaiting approval</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enquiries Statistics Cards */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Enquiries Overview</h3>
            
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Total Enquiries */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Enquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{enquiryStats.total}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">All time enquiries</span>
              </div>
            </motion.div>

            {/* Pending Enquiries */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{enquiryStats.pending}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Awaiting response</span>
              </div>
            </motion.div>

            {/* Closed Enquiries */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Closed</p>
                  <p className="text-2xl font-bold text-gray-900">{enquiryStats.closed}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Marked as closed</span>
              </div>
            </motion.div>

            {/* Response Rate */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enquiryStats.total > 0 
                      ? `${Math.round((enquiryStats.closed / enquiryStats.total) * 100)}%`
                      : '0%'
                    }
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Closed vs Total</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}