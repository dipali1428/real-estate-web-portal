'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AdminService, UnlistedDashboardStats } from '../services/unlistedadminservices';
import { 
  Users, 
  Building2, 
  Repeat, 
  HandCoins,
  CheckCircle 
} from 'lucide-react';

const DashboardOverview = () => {
  const router = useRouter();
  
  const [stats, setStats] = useState<UnlistedDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setChartReady(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await AdminService.getDashboardStats();
      setStats(statsData);
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
      setStats({
        total_users: "0",
        total_companies: "0",
        total_transactions: "0",
        total_invested: "0.00"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Data for the Pie Chart - Grouping the numerical counts
  const chartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Platform Users', value: parseInt(stats.total_users), color: '#3b82f6' },
      { name: 'Listed Companies', value: parseInt(stats.total_companies), color: '#10b981' },
      { name: 'Processed Transactions', value: parseInt(stats.total_transactions), color: '#f59e0b' },
    ];
  }, [stats]);

  const formatCurrency = (value: string | undefined) => {
    const num = parseFloat(value || "0");
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 animate-fade-in">
      
      {/* --- WELCOME BANNER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Administrator.</h2>
        <p className="text-sm sm:text-base opacity-90">The unlisted marketplace is performing stable today. Here are the key metrics.</p>
      </motion.div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}
      
      {/* --- KPI STATS GRID WITH LUCIDE ICONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            icon: Users, 
            color: 'from-blue-500 to-cyan-500', 
            val: stats?.total_users || "0", 
            label: 'Total Platform Users', 
            sub: 'Active accounts' 
          },
          { 
            icon: Building2, 
            color: 'from-green-500 to-emerald-500', 
            val: stats?.total_companies || "0", 
            label: 'Listed Companies', 
            sub: 'Live inventory' 
          },
          { 
            icon: Repeat, 
            color: 'from-yellow-500 to-orange-500', 
            val: stats?.total_transactions || "0", 
            label: 'Total Transactions', 
            sub: 'Processed orders' 
          },
          { 
            icon: HandCoins, 
            color: 'from-[#fb7185] to-[#fb7185]', 
            val: formatCurrency(stats?.total_invested), 
            label: 'Total Invested', 
            sub: 'AUM Volume' 
          },
        ].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <div className={`w-12 h-12 bg-linear-to-r ${item.color} rounded-2xl flex items-center justify-center text-white shadow-sm`}>
                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-sans text-gray-800">{item.val}</div>
                <div className="text-gray-600 mt-1 text-sm font-medium">{item.label}</div>
                <div className="flex items-center text-emerald-500 text-xs mt-2 font-bold uppercase tracking-wider">
                  <CheckCircle className="w-3 h-3 mr-1" strokeWidth={2.5} />
                  {item.sub}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- PIE CHART SECTION (FIXED) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Chart Area - Using fixed width approach */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-black text-gray-800 mb-6 uppercase tracking-tight">Platform Asset Distribution</h3>
            
            {/* Fixed height container with absolute positioning */}
            <div style={{ 
              width: '100%', 
              height: '350px', 
              position: 'relative',
              backgroundColor: '#f9fafb',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}>
              {chartReady && chartData.length > 0 ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <PieChart width={500} height={350} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                        fontWeight: 'bold' 
                      }}
                    />
                  </PieChart>
                </div>
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p className="text-gray-400">Loading chart...</p>
                </div>
              )}
            </div>
          </div>
          {/* Details/Legend Area */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Market Breakdown</h4>
              {chartData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-lg font-black text-gray-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;