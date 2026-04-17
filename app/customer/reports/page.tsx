'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Wallet, PieChart as PieChartIcon, Building, ArrowUpRight, FolderOpen, Banknote,
  BarChart3, Inbox, FileText, Package, Activity,
  CheckCircle, Clock, IndianRupee, Table
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import customerService from "../../services/customerService";

// ==================== TYPES ====================

interface OverallStats {
  total_invested: number;
  total_products: number;
  active_products: number;
}

interface UnlistedSharesStats {
  total_holdings: string;
  total_value: string;
  total_transactions: string;
  pending_transactions: string;
  total_companies: string;
  holdings: any[];
}

interface MutualFundsStats {
  total_schemes: number;
  total_units: number;
  total_value: number;
  investments: any[];
}

interface BondsStats {
  total_bonds: number;
  total_value: number;
  investments: any[];
}

interface FDStats {
  total_fd: number;
  total_value: number;
  investments: any[];
}

interface IPOStats {
  total_ipo: number;
  total_value: number;
  investments: any[];
}

interface OverviewData {
  overall: OverallStats;
  unlisted_shares: UnlistedSharesStats;
  mutual_funds: MutualFundsStats;
  bonds: BondsStats;
  fd: FDStats;
  ipo: IPOStats;
}

interface ProductSummary {
  product_type: string;
  total_orders: string;
  total_amount: string;
}

interface ReportData {
  overview: OverviewData | null;
  productSummary: ProductSummary[];
  recentInvestments: any[];
  portfolioDistribution: any[];
}

// ==================== HELPER FUNCTIONS ====================

const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!num && num !== 0) return '₹0';
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatLargeNumber = (num: number | string): string => {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  if (!number && number !== 0) return '₹0';
  if (number >= 10000000) return `₹${(number / 10000000).toFixed(2)} Cr`;
  if (number >= 100000) return `₹${(number / 100000).toFixed(2)} L`;
  if (number >= 1000) return `₹${(number / 1000).toFixed(2)} K`;
  return `₹${number.toFixed(2)}`;
};

// ==================== STAT CARD COMPONENT ====================

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  trend?: number;
}

const StatCard = ({ title, value, icon, color, subtitle, trend }: StatCardProps) => (
  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white`}>
        {icon}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-[10px] sm:text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? <ArrowUpRight size={10} /> : <ArrowUpRight size={10} className="rotate-180" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 break-words">{value}</div>
    <div className="text-xs sm:text-sm text-gray-500">{title}</div>
    {subtitle && <div className="text-[10px] sm:text-xs text-gray-400 mt-1">{subtitle}</div>}
  </div>
);

// ==================== MAIN COMPONENT ====================

export default function ReportsPage() {
  const router = useRouter();
  const [reportData, setReportData] = useState<ReportData>({
    overview: null,
    productSummary: [],
    recentInvestments: [],
    portfolioDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [chartReady, setChartReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'distribution'>('overview');

  // Chart hydration fix
  useEffect(() => {
    const timer = setTimeout(() => setChartReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Fetch all report data
  const fetchReportData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) {
        router.push("/");
        return;
      }
      
      // Fetch all reports in parallel
      const [overviewRes, productSummaryRes, recentInvestmentsRes, portfolioDistributionRes] = await Promise.all([
        customerService.getReportOverview(),
        customerService.getProductSummary(),
        customerService.getRecentInvestments(),
        customerService.getPortfolioDistribution()
      ]);
      
      setReportData({
        overview: overviewRes.success ? overviewRes.data : null,
        productSummary: productSummaryRes.success ? productSummaryRes.data : [],
        recentInvestments: recentInvestmentsRes.success ? recentInvestmentsRes.data : [],
        portfolioDistribution: portfolioDistributionRes.success ? portfolioDistributionRes.data : []
      });
    } catch (error) {
      toast.error("Failed to load reports");
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchReportData();
      setLoading(false);
    };
    loadData();
  }, [router]);

  // Prepare product summary data for bar chart
  const productSummaryData = useMemo(() => {
    if (reportData.productSummary && reportData.productSummary.length > 0) {
      return reportData.productSummary.map(item => ({
        name: item.product_type,
        orders: parseInt(item.total_orders) || 0,
        amount: parseFloat(item.total_amount) || 0
      }));
    }
    return [];
  }, [reportData.productSummary]);

  const overview = reportData.overview;

  // Custom label renderer for pie chart
  const renderPieLabel = (entry: any) => {
    const { name, percent } = entry;
    if (!name || percent === undefined || percent === 0) return null;
    const displayName = typeof window !== 'undefined' && window.innerWidth < 640 && name.length > 10 
      ? name.substring(0, 8) + '...' 
      : name;
    return `${displayName} (${(percent * 100).toFixed(1)}%)`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 p-3 sm:p-4 md:p-6 bg-[#F8FAFC] min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center px-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-600 mt-4 sm:mt-6 font-medium text-sm sm:text-base">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-3 sm:p-4 md:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <section className="animate-fade-in">
        {/* WELCOME HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-white"
        >
          <div className="flex justify-between items-start flex-wrap gap-3 sm:gap-4">
            <div>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                Investment Reports
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/80">
                Comprehensive analysis of your investment portfolio
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation - Stacked on mobile, horizontal on desktop */}
        <div className="w-full mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-1">
            <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl sm:rounded-full flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-1 relative shadow-inner border border-slate-200/50">
              <button
                onClick={() => setActiveTab('overview')}
                className={`relative px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center gap-2 w-full sm:w-auto ${
                  activeTab === 'overview'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {activeTab === 'overview' && (
                  <motion.div
                    layoutId="activeTabPortfolio"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg sm:rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Activity size={14} className="sm:w-3.5 sm:h-3.5" />
                <span>Overview</span>
              </button>
              
              <button
                onClick={() => setActiveTab('products')}
                className={`relative px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center gap-2 w-full sm:w-auto ${
                  activeTab === 'products'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {activeTab === 'products' && (
                  <motion.div
                    layoutId="activeTabPortfolio"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg sm:rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Package size={14} className="sm:w-3.5 sm:h-3.5" />
                <span>Product Summary</span>
              </button>
              
              <button
                onClick={() => setActiveTab('distribution')}
                className={`relative px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center justify-center gap-2 w-full sm:w-auto ${
                  activeTab === 'distribution'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {activeTab === 'distribution' && (
                  <motion.div
                    layoutId="activeTabPortfolio"
                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg sm:rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <PieChartIcon size={14} className="sm:w-3.5 sm:h-3.5" />
                <span>Distribution</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && overview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Overall Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <StatCard 
                icon={<Wallet className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
                color="from-blue-500 to-blue-600"
                value={formatLargeNumber(overview.overall.total_invested)}
                title="Total Invested"
                subtitle="Overall portfolio value"
              />
              <StatCard 
                icon={<Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
                color="from-green-500 to-green-600"
                value={overview.overall.total_products.toString()}
                title="Total Products"
                subtitle="Across all categories"
              />
              <StatCard 
                icon={<Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
                color="from-purple-500 to-purple-600"
                value={overview.overall.active_products.toString()}
                title="Active Products"
                subtitle="Currently invested"
              />
            </div>

            {/* Investment Categories */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
                Investment Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    <span className="text-[10px] sm:text-xs font-medium text-blue-600">Unlisted Shares</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 break-words">{formatLargeNumber(overview.unlisted_shares.total_value)}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{overview.unlisted_shares.total_companies} Companies</div>
                  <div className="text-[9px] sm:text-xs text-gray-400">{overview.unlisted_shares.total_holdings} Holdings</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-100">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <PieChartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    <span className="text-[10px] sm:text-xs font-medium text-purple-600">Mutual Funds</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 break-words">{formatLargeNumber(overview.mutual_funds.total_value)}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{overview.mutual_funds.total_schemes} Schemes</div>
                  <div className="text-[9px] sm:text-xs text-gray-400">{overview.mutual_funds.total_units} Units</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-100">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Banknote className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                    <span className="text-[10px] sm:text-xs font-medium text-orange-600">Bonds</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 break-words">{formatLargeNumber(overview.bonds.total_value)}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{overview.bonds.total_bonds} Bonds</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-100">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                    <span className="text-[10px] sm:text-xs font-medium text-emerald-600">Fixed Deposits</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 break-words">{formatLargeNumber(overview.fd.total_value)}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{overview.fd.total_fd} Deposits</div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-rose-100">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-rose-600" />
                    <span className="text-[10px] sm:text-xs font-medium text-rose-600">IPO Applications</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 break-words">{formatLargeNumber(overview.ipo.total_value)}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{overview.ipo.total_ipo} Applications</div>
                </div>
              </div>
            </div>

            {/* Unlisted Shares Details */}
            {overview.unlisted_shares.total_holdings !== "0" && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
                  Unlisted Shares Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <p className="text-[10px] sm:text-xs text-gray-500">Total Holdings</p>
                    <p className="text-sm sm:text-base md:text-xl font-bold text-gray-800 break-words">{overview.unlisted_shares.total_holdings}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <p className="text-[10px] sm:text-xs text-gray-500">Total Value</p>
                    <p className="text-sm sm:text-base md:text-xl font-bold text-gray-800 break-words">{formatLargeNumber(overview.unlisted_shares.total_value)}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <p className="text-[10px] sm:text-xs text-gray-500">Total Transactions</p>
                    <p className="text-sm sm:text-base md:text-xl font-bold text-gray-800 break-words">{overview.unlisted_shares.total_transactions}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                    <p className="text-[10px] sm:text-xs text-gray-500">Pending Transactions</p>
                    <p className="text-sm sm:text-base md:text-xl font-bold text-yellow-600 break-words">{overview.unlisted_shares.pending_transactions}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Product Summary Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Product Summary Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Table className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
                Product Summary
              </h3>
              
              {reportData.productSummary.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[280px] sm:min-w-[300px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-left text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Product Type</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Total Orders</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reportData.productSummary.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium text-gray-800 text-xs sm:text-sm break-words">{item.product_type}</td>
                          <td className="py-2 sm:py-3 px-3 sm:px-4 text-right text-gray-600 text-xs sm:text-sm">{item.total_orders}</td>
                          <td className="py-2 sm:py-3 px-3 sm:px-4 text-right font-semibold text-gray-800 text-xs sm:text-sm break-words">{formatCurrency(item.total_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <Inbox className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-400 text-sm sm:text-base">No product summary data available</p>
                </div>
              )}
            </div>

            {/* Bar Chart Visualization */}
            {productSummaryData.length > 0 && chartReady && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
                  Investment by Product Type
                </h3>
                <div className="h-64 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productSummaryData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 10 }} 
                        angle={-15} 
                        textAnchor="end" 
                        height={60} 
                      />
                      <YAxis tickFormatter={(value) => formatLargeNumber(value)} tick={{ fontSize: 10 }} />
                      <Tooltip 
                        formatter={(value: number | undefined) => {
                          if (value === undefined) return '₹0';
                          return formatCurrency(value);
                        }}
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="amount" name="Total Amount" fill="#2076C7" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Distribution Tab */}
        {activeTab === 'distribution' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Portfolio Distribution */}
            {reportData.portfolioDistribution && reportData.portfolioDistribution.length > 0 ? (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
                  Portfolio Distribution
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">
                  Visual representation of your investment allocation across different asset classes
                </p>

                <div className="h-64 sm:h-80 w-full">
                  {chartReady && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportData.portfolioDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={renderPieLabel}
                          labelLine={true}
                        >
                          {reportData.portfolioDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                              stroke="white" 
                              strokeWidth={2} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number | undefined) => {
                            if (value === undefined) return '₹0';
                            return formatCurrency(value);
                          }}
                          contentStyle={{ 
                            borderRadius: '12px', 
                            border: 'none', 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            fontSize: '12px',
                            padding: '8px 12px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Legend */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                  <h4 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Asset Classes</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                    {reportData.portfolioDistribution.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ backgroundColor: item.color || `#${Math.floor(Math.random()*16777215).toString(16)}` }}></div>
                        <span className="text-[10px] sm:text-xs text-gray-600 truncate flex-1">{item.name}</span>
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-800 shrink-0">
                          {formatLargeNumber(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-gray-100">
                <Inbox className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">No Distribution Data Available</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto px-4">
                  Start investing to see your portfolio distribution across different asset classes.
                </p>
              </div>
            )}

            {/* Recent Investments */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#2076C7]" />
                Recent Investments
              </h3>
              
              {reportData.recentInvestments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-left text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Date</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-left text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Product</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-right text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Amount</th>
                        <th className="py-2 sm:py-3 px-3 sm:px-4 text-center text-[10px] sm:text-xs font-bold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reportData.recentInvestments.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-sm text-gray-600 whitespace-nowrap">{item.date || 'N/A'}</td>
                          <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium text-gray-800 text-[10px] sm:text-sm break-words">{item.product_name || item.name || 'Investment'}</td>
                          <td className="py-2 sm:py-3 px-3 sm:px-4 text-right font-semibold text-gray-800 text-[10px] sm:text-sm whitespace-nowrap">{formatCurrency(item.amount || 0)}</td>
                          <td className="py-2 sm:py-3 px-3 sm:px-4 text-center">
                            <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-medium whitespace-nowrap ${
                              item.status === 'completed' ? 'bg-green-100 text-green-700' :
                              item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status === 'completed' && <CheckCircle size={8} />}
                              {item.status === 'pending' && <Clock size={8} />}
                              {item.status || 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <Inbox className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-400 text-sm sm:text-base">No recent investments found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </section>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}