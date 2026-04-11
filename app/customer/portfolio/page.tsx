'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Wallet, Briefcase, PieChart as PieChartIcon, AlertCircle, Building,
  ArrowUpRight, FolderOpen, Banknote, Shield
} from 'lucide-react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import customerService from "../../services/customerService";

// ==================== TYPES ====================

interface PortfolioHolding {
  share_id: number;
  company_name: string;
  total_quantity: string;
  price: string;
  invested_value: string;
}

interface UnlistedShares {
  totalInvestment: number;
  currentValue: number;
  returns: number;
  holdings: PortfolioHolding[];
}

interface PortfolioData {
  success: boolean;
  message: string;
  data: {
    summary: {
      totalInvestment: number;
      currentValue: number;
      totalReturns: number;
    };
    portfolio: {
      unlisted_shares: UnlistedShares;
      mutual_funds: any;
      loans: any;
      insurance: any;
    };
  };
}

// ==================== HELPER FUNCTIONS ====================

const formatCurrency = (amount: number): string => {
  if (!amount && amount !== 0) return '₹0';
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatLargeNumber = (num: number): string => {
  if (!num && num !== 0) return '₹0';
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(2)} K`;
  return `₹${num.toFixed(2)}`;
};

// ==================== KPI CARD COMPONENT ====================

const KpiCard = ({ icon, color, value, label }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105 cursor-pointer">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-white`}>
        {icon}
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-gray-500 text-sm">{label}</div>
  </div>
);

// ==================== PORTFOLIO CATEGORY CARD ====================

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  data: any;
  isUnlisted?: boolean;
  unlistedData?: UnlistedShares;
}

const CategoryCard = ({ title, icon, color, data, isUnlisted, unlistedData }: CategoryCardProps) => {
  const hasData = data !== null;
  const holdings = unlistedData?.holdings || [];
  const hasHoldings = holdings.length > 0;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      </div>
      
      {hasData ? (
        <>
          {isUnlisted && (
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Investment</span>
                <span className="font-semibold text-gray-800">{formatCurrency(unlistedData?.totalInvestment || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Current Value</span>
                <span className="font-semibold text-gray-800">{formatCurrency(unlistedData?.currentValue || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Returns</span>
                <span className={`font-semibold ${(unlistedData?.returns || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(unlistedData?.returns || 0) >= 0 ? '+' : ''}{formatCurrency(unlistedData?.returns || 0)}
                </span>
              </div>
            </div>
          )}
          
          {hasHoldings && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Holdings: {holdings.length}</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {holdings.slice(0, 3).map((holding) => (
                  <div key={holding.share_id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{holding.company_name}</span>
                    <span className="text-gray-800 font-medium">{formatCurrency(parseFloat(holding.invested_value))}</span>
                  </div>
                ))}
                {holdings.length > 3 && (
                  <p className="text-xs text-blue-500 mt-1">+{holdings.length - 3} more</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">No data available</p>
        </div>
      )}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function PortfolioPage() {
  const router = useRouter();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  // Fetch portfolio data
  const fetchPortfolioData = async () => {
    try {
      const token = document.cookie.match(/authToken=([^;]+)/)?.[1];
      if (!token) {
        router.push("/");
        return;
      }
      
      const response = await customerService.getPortfolio();
      
      if (response.success && response.data) {
        setPortfolioData(response);
        setLastUpdated(new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }));
      } else {
        toast.error("Failed to load portfolio data");
      }
    } catch (error) {
      toast.error("Failed to load portfolio");
    }
  };

  // Refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPortfolioData();
    setTimeout(() => setRefreshing(false), 1000);
    toast.success("Portfolio refreshed");
  };

  // Export as JSON
  const exportJSON = () => {
    const jsonString = JSON.stringify(portfolioData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success("Portfolio exported successfully");
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchPortfolioData();
      setLoading(false);
    };
    loadData();
  }, [router]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchPortfolioData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get data from response
  const summary = portfolioData?.data?.summary || {
    totalInvestment: 0,
    currentValue: 0,
    totalReturns: 0
  };
  
  const unlistedShares = portfolioData?.data?.portfolio?.unlisted_shares || {
    totalInvestment: 0,
    currentValue: 0,
    returns: 0,
    holdings: []
  };
  
  const mutualFunds = portfolioData?.data?.portfolio?.mutual_funds;
  const loans = portfolioData?.data?.portfolio?.loans;
  const insurance = portfolioData?.data?.portfolio?.insurance;
  
  const holdings = unlistedShares.holdings || [];
  const holdingsCount = holdings.length;
  const absoluteReturn = summary.totalInvestment > 0 
    ? ((summary.currentValue - summary.totalInvestment) / summary.totalInvestment) * 100 
    : 0;

  // Check if portfolio is completely empty
  const isPortfolioEmpty = summary.totalInvestment === 0 && 
                          summary.currentValue === 0 && 
                          summary.totalReturns === 0 && 
                          holdingsCount === 0;

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
            <p className="text-gray-600 mt-6 font-medium">Loading your portfolio...</p>
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
                <Briefcase className="w-6 h-6" />
                My Portfolio
              </h2>
              <p className="text-sm sm:text-base text-white/80">
                Track and manage your investment portfolio
              </p>
            </div>
            <div className="flex gap-2">          
            </div>
          </div>
        </motion.div>

        {/* Cards View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 1️⃣ Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KpiCard 
              icon={<Wallet className="w-6 h-6" />}
              color="from-[#2076C7] to-[#1CADA3]"
              value={formatLargeNumber(summary.totalInvestment)}
              label="Total Investment"
            />
            <KpiCard 
              icon={<TrendingUp className="w-6 h-6" />}
              color="from-[#2076C7] to-[#1CADA3]"
              value={formatLargeNumber(summary.currentValue)}
              label="Current Value"
            />
            <KpiCard 
              icon={<ArrowUpRight className="w-6 h-6" />}
              color="from-[#2076C7] to-[#1CADA3]"
              value={formatLargeNumber(Math.abs(summary.totalReturns))}
              label={`Total Returns (${absoluteReturn >= 0 ? '+' : ''}${absoluteReturn.toFixed(2)}%)`}
            />
          </div>



          {/* 2️⃣ Portfolio Category Cards */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#2076C7]" />
              Portfolio Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Unlisted Shares Card */}
              <CategoryCard 
                title="Unlisted Shares"
                icon={<Building className="w-5 h-5" />}
                color="from-[#2076C7] to-[#1CADA3]"
                data={unlistedShares}
                isUnlisted={true}
                unlistedData={unlistedShares}
              />

              {/* Mutual Funds Card */}
              <CategoryCard 
                title="Mutual Funds"
                icon={<PieChartIcon className="w-5 h-5" />}
                color="from-[#2076C7] to-[#1CADA3]"
                data={mutualFunds}
              />

              {/* Loans Card */}
              <CategoryCard 
                title="Loans"
                icon={<Banknote className="w-5 h-5" />}
                color="from-[#2076C7] to-[#1CADA3]"
                data={loans}
              />

              {/* Insurance Card */}
              <CategoryCard 
                title="Insurance"
                icon={<Shield className="w-5 h-5" />}
                color="from-[#2076C7] to-[#1CADA3]"
                data={insurance}
              />
            </div>
          </div>

       </motion.div>
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
      `}</style>
    </div>
  );
}