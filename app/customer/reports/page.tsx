'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Wallet, PieChart as PieChartIcon, Building, ArrowUpRight, Clock, FolderOpen, Banknote,
  BarChart3, Inbox, FileText, Package, Activity,
  CheckCircle, Clock as ClockIcon, IndianRupee, Table
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import customerService from "../../services/customerService";
import Link from 'next/link';

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
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-white`}>
        {icon}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowUpRight size={12} className="rotate-180" />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-gray-500 text-sm">{title}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
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
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
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
      
      setLastUpdated(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    } catch (error) {
      toast.error("Failed to load reports");
    }
  };

  // Export as JSON
  const exportJSON = () => {
    const jsonString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success("Reports exported successfully");
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

  // Prepare product summary data for bar chart - ONLY API DATA, NO DUMMY
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
  const isPortfolioEmpty = overview?.overall.total_invested === 0;

  // Custom label renderer for pie chart
  const renderPieLabel = (entry: any) => {
    const { name, percent } = entry;
    if (!name || percent === undefined || percent === 0) return null;
    return `${name} (${(percent * 100).toFixed(1)}%)`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-600 mt-6 font-medium">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <section className="animate-fade-in">
        {/* --- WELCOME HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
        >
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Investment Reports
              </h2>
              <p className="text-sm sm:text-base text-white/80">
                Comprehensive analysis of your investment portfolio
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'overview', name: 'Overview', icon: <Activity size={16} /> },
            { id: 'products', name: 'Product Summary', icon: <Package size={16} /> },
            { id: 'distribution', name: 'Distribution', icon: <PieChartIcon size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#2076C7] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && overview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                icon={<Wallet className="w-6 h-6" />}
                color="from-blue-500 to-blue-600"
                value={formatLargeNumber(overview.overall.total_invested)}
                title="Total Invested"
                subtitle="Overall portfolio value"
              />
              <StatCard 
                icon={<Package className="w-6 h-6" />}
                color="from-green-500 to-green-600"
                value={overview.overall.total_products.toString()}
                title="Total Products"
                subtitle="Across all categories"
              />
              <StatCard 
                icon={<Activity className="w-6 h-6" />}
                color="from-purple-500 to-purple-600"
                value={overview.overall.active_products.toString()}
                title="Active Products"
                subtitle="Currently invested"
              />
            </div>

            {/* Investment Categories - ONLY API DATA */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#2076C7]" />
                Investment Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Unlisted Shares */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">Unlisted Shares</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatLargeNumber(overview.unlisted_shares.total_value)}</div>
                  <div className="text-xs text-gray-500 mt-1">{overview.unlisted_shares.total_companies} Companies</div>
                  <div className="text-xs text-gray-400">{overview.unlisted_shares.total_holdings} Holdings</div>
                </div>

                {/* Mutual Funds */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChartIcon className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">Mutual Funds</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatLargeNumber(overview.mutual_funds.total_value)}</div>
                  <div className="text-xs text-gray-500 mt-1">{overview.mutual_funds.total_schemes} Schemes</div>
                  <div className="text-xs text-gray-400">{overview.mutual_funds.total_units} Units</div>
                </div>

                {/* Bonds */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-medium text-orange-600">Bonds</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatLargeNumber(overview.bonds.total_value)}</div>
                  <div className="text-xs text-gray-500 mt-1">{overview.bonds.total_bonds} Bonds</div>
                </div>

                {/* Fixed Deposits */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600">Fixed Deposits</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatLargeNumber(overview.fd.total_value)}</div>
                  <div className="text-xs text-gray-500 mt-1">{overview.fd.total_fd} Deposits</div>
                </div>

                {/* IPO */}
                <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-4 border border-rose-100">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-rose-600" />
                    <span className="text-xs font-medium text-rose-600">IPO Applications</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatLargeNumber(overview.ipo.total_value)}</div>
                  <div className="text-xs text-gray-500 mt-1">{overview.ipo.total_ipo} Applications</div>
                </div>
              </div>
            </div>

            {/* Unlisted Shares Details - Only show if there are holdings */}
            {overview.unlisted_shares.total_holdings !== "0" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#2076C7]" />
                  Unlisted Shares Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Total Holdings</p>
                    <p className="text-xl font-bold text-gray-800">{overview.unlisted_shares.total_holdings}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Total Value</p>
                    <p className="text-xl font-bold text-gray-800">{formatLargeNumber(overview.unlisted_shares.total_value)}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Total Transactions</p>
                    <p className="text-xl font-bold text-gray-800">{overview.unlisted_shares.total_transactions}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Pending Transactions</p>
                    <p className="text-xl font-bold text-yellow-600">{overview.unlisted_shares.pending_transactions}</p>
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
            className="space-y-6"
          >
            {/* Product Summary Table - ONLY API DATA */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Table className="w-5 h-5 text-[#2076C7]" />
                Product Summary
              </h3>
              
              {reportData.productSummary.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase">Product Type</th>
                        <th className="py-3 px-4 text-right text-xs font-bold text-gray-600 uppercase">Total Orders</th>
                        <th className="py-3 px-4 text-right text-xs font-bold text-gray-600 uppercase">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reportData.productSummary.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-800">{item.product_type}</td>
                          <td className="py-3 px-4 text-right text-gray-600">{item.total_orders}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-800">{formatCurrency(item.total_amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">No product summary data available</p>
                </div>
              )}
            </div>

            {/* Bar Chart Visualization - ONLY API DATA */}
            {productSummaryData.length > 0 && chartReady && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#2076C7]" />
                        Investment by Product Type
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productSummaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tickFormatter={(value) => formatLargeNumber(value)} />
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
                                <Legend />
                                <Bar dataKey="amount" name="Total Amount" fill="#2076C7" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
          </motion.div>
        )}

        {/* Distribution Tab - ONLY API DATA, NO DUMMY */}
        {activeTab === 'distribution' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Portfolio Distribution - Only show if API has data */}
            {reportData.portfolioDistribution && reportData.portfolioDistribution.length > 0 ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-[#2076C7]" />
                        Portfolio Distribution
                    </h3>
                    <p className="text-xs text-gray-500 mb-6">
                        Visual representation of your investment allocation across different asset classes
                    </p>

                    <div className="h-80 w-full">
                        {chartReady && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={reportData.portfolioDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={renderPieLabel}
                                        labelLine={true}
                                    >
                                        {reportData.portfolioDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} stroke="white" strokeWidth={2} />
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
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Asset Classes</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {reportData.portfolioDistribution.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color || `#${Math.floor(Math.random()*16777215).toString(16)}` }}></div>
                                    <span className="text-xs text-gray-600 truncate">{item.name}</span>
                                    <span className="text-xs font-semibold text-gray-800 ml-auto">
                                        {formatLargeNumber(item.value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Distribution Data Available</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start investing to see your portfolio distribution across different asset classes.
                </p>
                <Link
                  href="/products/unlisted"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                >
                  <TrendingUp size={18} />
                  Start Investing
                </Link>
              </div>
            )}

            {/* Recent Investments - ONLY API DATA */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-[#2076C7]" />
                Recent Investments
              </h3>
              
              {reportData.recentInvestments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                        <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase">Product</th>
                        <th className="py-3 px-4 text-right text-xs font-bold text-gray-600 uppercase">Amount</th>
                        <th className="py-3 px-4 text-center text-xs font-bold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reportData.recentInvestments.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-600">{item.date || 'N/A'}</td>
                          <td className="py-3 px-4 font-medium text-gray-800">{item.product_name || item.name || 'Investment'}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-800">{formatCurrency(item.amount || 0)}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'completed' ? 'bg-green-100 text-green-700' :
                              item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status === 'completed' && <CheckCircle size={10} />}
                              {item.status === 'pending' && <ClockIcon size={10} />}
                              {item.status || 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">No recent investments found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}