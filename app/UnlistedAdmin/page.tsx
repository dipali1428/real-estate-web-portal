'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { AdminService, UnlistedDashboardStats } from '../services/unlistedadminservices';
import { 
  Users, 
  Building2, 
  Repeat, 
  HandCoins,
  CheckCircle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const DashboardOverview = () => {
  const [stats, setStats] = useState<UnlistedDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
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
      toast.error('Dashboard fetch error');
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

  const chartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Platform Users', value: parseInt(stats.total_users) || 0, color: '#3b82f6' },
      { name: 'Listed Companies', value: parseInt(stats.total_companies) || 0, color: '#10b981' },
      { name: 'Processed Transactions', value: parseInt(stats.total_transactions) || 0, color: '#f59e0b' },
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
    <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen space-y-6 animate-fade-in overflow-x-hidden">
      
      {/* --- WELCOME BANNER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-5 sm:p-8 text-white shadow-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Administrator!</h2>
        <p className="text-sm sm:text-base opacity-90">The unlisted marketplace is performing stable today.</p>
      </motion.div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}
      
      {/* --- KPI STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { icon: Users, color: 'from-blue-500 to-cyan-500', val: stats?.total_users || "0", label: 'Total Platform Users', sub: 'Active accounts' },
          { icon: Building2, color: 'from-green-500 to-emerald-500', val: stats?.total_companies || "0", label: 'Listed Companies', sub: 'Live inventory' },
          { icon: Repeat, color: 'from-yellow-500 to-orange-500', val: stats?.total_transactions || "0", label: 'Total Transactions', sub: 'Processed orders' },
          { icon: HandCoins, color: 'from-[#fb7185] to-[#fb7185]', val: formatCurrency(stats?.total_invested), label: 'Total Invested', sub: 'AUM Volume' },
        ].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md h-full"
            >
              <div className={`w-12 h-12 bg-linear-to-r ${item.color} rounded-2xl flex items-center justify-center text-white shadow-sm mb-4`}>
                <IconComponent className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800 break-all">{item.val}</div>
                <div className="text-gray-500 mt-1 text-xs sm:text-sm font-medium">{item.label}</div>
                <div className="flex items-center text-emerald-500 text-[10px] sm:text-xs mt-2 font-bold uppercase tracking-wider">
                  <CheckCircle className="w-3 h-3 mr-1" strokeWidth={2.5} />
                  {item.sub}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- PIE CHART SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          
          {/* Chart Area */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-base sm:text-lg font-black text-gray-800 mb-6 uppercase tracking-tight text-center lg:text-left">
              Platform Asset Distribution
            </h3>
            
            <div className="w-full h-[280px] sm:h-[350px] relative">
              {chartReady && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
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
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400 animate-pulse text-sm">Loading visual analysis...</p>
                </div>
              )}
            </div>
          </div>

          {/* Details/Legend Area */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h4 className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center lg:text-left">
              Market Breakdown
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs sm:text-sm font-bold text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.value.toLocaleString()}
                  </span>
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