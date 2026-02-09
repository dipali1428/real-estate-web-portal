'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    ArrowLeft,
    Search,
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Activity,
    Clock,
    Users,
    IndianRupee,
    ChevronRight
} from 'lucide-react';
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
    ChartConfiguration
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler, Tooltip, Legend);

interface LiveCompany {
    id: number;
    name: string;
    symbol: string;
    price: number;
    category: string;
    logoText: string;
    todayChange: number;
    weekChange: number;
    volume: number;
}

// Static initial data - no live updates
const INITIAL_COMPANIES_DATA: LiveCompany[] = [
    { id: 1, name: "Boat (Imagine Marketing)", symbol: "BOAT", price: 1195, category: "Consumer Electronics", logoText: "B", todayChange: 1.5, weekChange: 3.2, volume: 12500 },
    { id: 2, name: "OYO (Oravel Stays)", symbol: "OYO", price: 27.5, category: "Hospitality", logoText: "O", todayChange: -0.8, weekChange: -2.1, volume: 8500 },
    { id: 3, name: "PharmEasy", symbol: "PHARM", price: 6.95, category: "Healthcare", logoText: "P", todayChange: 2.1, weekChange: 5.3, volume: 18500 },
    { id: 4, name: "HDFC Securities", symbol: "HDFC-S", price: 9250, category: "Financial Services", logoText: "H", todayChange: 0.5, weekChange: 1.8, volume: 3200 },
    { id: 5, name: "NSE India", symbol: "NSE", price: 1925, category: "Financial Services", logoText: "N", todayChange: -1.2, weekChange: 0.5, volume: 5400 },
    { id: 6, name: "Hero Fincorp", symbol: "HERO-F", price: 1250, category: "Financial Services", logoText: "H", todayChange: 3.2, weekChange: 7.5, volume: 6200 },
    { id: 7, name: "InCred Holdings", symbol: "INCR", price: 165, category: "Financial Services", logoText: "I", todayChange: -2.5, weekChange: -1.8, volume: 9500 },
    { id: 8, name: "SBI Mutual Fund", symbol: "SBI-MF", price: 2695, category: "Financial Services", logoText: "S", todayChange: 1.8, weekChange: 4.2, volume: 4100 },
    { id: 9, name: "Bira", symbol: "BIRA", price: 188, category: "Beverages", logoText: "B", todayChange: 0.3, weekChange: -0.5, volume: 7800 },
    { id: 10, name: "ASK Investment Managers", symbol: "ASK", price: 1125, category: "Financial Services", logoText: "A", todayChange: -1.8, weekChange: 2.1, volume: 3600 },
    { id: 11, name: "CSK", symbol: "CSK", price: 210, category: "Sports", logoText: "C", todayChange: 4.5, weekChange: 12.3, volume: 15200 },
    { id: 12, name: "APL Metals", symbol: "APL", price: 9.2, category: "Metals", logoText: "A", todayChange: -3.2, weekChange: -5.8, volume: 21800 }
];

const LiveTrends: React.FC = () => {
    // Static companies data - no auto-updates
    const [companies, setCompanies] = useState<LiveCompany[]>(INITIAL_COMPANIES_DATA);

    // Only top gainers/losers will update slowly
    const [updateCounter, setUpdateCounter] = useState(0);
    const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [activeView, setActiveView] = useState<'market' | 'companies' | 'stats'>('market');
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    // Dynamic Lists - only these update slowly
    const topGainers = useMemo(() => {
        // Add some randomness to changes for top gainers
        const modifiedCompanies = [...companies].map(company => ({
            ...company,
            todayChange: company.todayChange + (Math.random() - 0.5) * 0.5 // Small random adjustment
        }));
        return modifiedCompanies.sort((a, b) => b.todayChange - a.todayChange).slice(0, 5);
    }, [companies, updateCounter]);

    const topLosers = useMemo(() => {
        // Add some randomness to changes for top losers
        const modifiedCompanies = [...companies].map(company => ({
            ...company,
            todayChange: company.todayChange + (Math.random() - 0.5) * 0.5 // Small random adjustment
        }));
        return modifiedCompanies.sort((a, b) => a.todayChange - b.todayChange).slice(0, 5);
    }, [companies, updateCounter]);

    // Slow updates for top gainers/losers only (every 10 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            setUpdateCounter(prev => prev + 1);
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, []);

    // Chart Logic - Static data
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        if (chartInstance.current) chartInstance.current.destroy();

        const dailyData = {
            labels: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
            data: [4820, 4815, 4830, 4825, 4840, 4835, 4850, 4840, 4860, 4850, 4870, 4860, 4880, 4870, 4885],
            color: '#2076C7',
            bgColor: 'rgba(32, 118, 199, 0.1)'
        };

        const weeklyData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            data: [4750, 4775, 4805, 4830, 4855, 4880],
            color: '#1CADA3',
            bgColor: 'rgba(28, 173, 163, 0.1)'
        };

        const monthlyData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [4600, 4720, 4810, 4880],
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)'
        };

        const current = period === 'daily' ? dailyData : period === 'weekly' ? weeklyData : monthlyData;
        const config: ChartConfiguration = {
            type: 'line',
            data: {
                labels: current.labels,
                datasets: [{
                    label: 'Unlisted Market Index',
                    data: current.data,
                    borderColor: current.color,
                    backgroundColor: current.bgColor,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: current.color
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#6b7280',
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#f8fafc',
                        bodyColor: '#cbd5e1',
                        borderColor: '#475569',
                        borderWidth: 1,
                        padding: 12,
                        titleFont: { size: 14 },
                        bodyFont: { size: 13 }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)',
                        },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 12 }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)',
                        },
                        ticks: {
                            color: '#6b7280',
                            font: { size: 12 },
                            callback: (val) => '₹' + val
                        }
                    }
                }
            }
        };

        chartInstance.current = new Chart(ctx, config);

        return () => chartInstance.current?.destroy();
    }, [period]);

    // Format time for "Last updated" display
    const lastUpdatedTime = useMemo(() => {
        const now = new Date();
        return now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }, [updateCounter]);

    return (
        <>
            <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
                <main className="container mx-auto px-4 py-4 pt-4 md:pt-8">
                    <div className="flex justify-start mb-8">
                        <a
                            href="/products/unlisted"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Back</span>
                        </a>
                    </div>
                    {/* Header Section*/}
                    <header className="mb-12 text-center">
                        {/* Icon Section */}
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
                            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
                                <Activity className="w-8 h-8" />
                            </div>
                        </div>

                        {/* Main Heading with Gradient Text */}
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Live Market Trends
                        </h1>

                        {/* Gradient Divider Line */}
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

                        {/* Subtitle / Description */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Real-time market data, price trends, and investment insights for unlisted shares
                        </p>
                    </header>

                    {/* Categories*/}
                    <section className="mb-12">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { id: 'market', label: 'Market Overview', icon: <BarChart3 className="w-4 h-4" /> },
                                { id: 'companies', label: 'Top Companies', icon: <TrendingUp className="w-4 h-4" /> },
                                { id: 'stats', label: 'Statistics', icon: <PieChart className="w-4 h-4" /> }
                            ].map(cat => (
                                <button
                                    key={cat.id}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${activeView === cat.id
                                            ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white border-transparent'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#2076C7] hover:text-[#2076C7]'
                                        }`}
                                    onClick={() => setActiveView(cat.id as any)}
                                >
                                    {cat.icon}
                                    <span className="text-sm font-medium">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Chart Section */}
                    <section className="mb-12">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 md:mb-0 flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-[#2076C7]" />
                                    Unlisted Market Index Performance
                                </h3>
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button
                                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${period === 'daily'
                                                ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        onClick={() => setPeriod('daily')}
                                    >
                                        Daily
                                    </button>
                                    <button
                                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${period === 'weekly'
                                                ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        onClick={() => setPeriod('weekly')}
                                    >
                                        Weekly
                                    </button>
                                    <button
                                        className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${period === 'monthly'
                                                ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        onClick={() => setPeriod('monthly')}
                                    >
                                        Monthly
                                    </button>
                                </div>
                            </div>

                            <div className="h-80">
                                <canvas ref={chartRef}></canvas>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-[#2F3D88]">₹4,850.12</div>
                                    <div className="text-sm text-gray-500 mt-1">Current Index</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-green-600">+1.25%</div>
                                    <div className="text-sm text-gray-500 mt-1">Today's Change</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-[#2076C7]">153</div>
                                    <div className="text-sm text-gray-500 mt-1">Active Listings</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-green-600">₹2,850 Cr</div>
                                    <div className="text-sm text-gray-500 mt-1">Total Volume</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Companies Grid - 2 columns layout */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <Users className="w-6 h-6 text-[#2076C7]" />
                                Top Companies
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>Last updated: {lastUpdatedTime}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Top Gainers */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">Top Gainers Today</h4>
                                </div>

                                <div className="space-y-3">
                                    {topGainers.map((company, index) => (
                                        <div key={company.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-[#2076C7]/20 to-[#1CADA3]/20 flex items-center justify-center text-[#2076C7] font-bold">
                                                    {company.logoText}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{company.symbol}</div>
                                                    <div className="text-xs text-gray-500">{company.name.split('(')[0].trim()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">
                                                    ₹{company.price.toLocaleString('en-IN', { maximumFractionDigits: company.price < 10 ? 2 : 0 })}
                                                </div>
                                                <div className="text-green-500 font-bold text-sm">
                                                    +{company.todayChange.toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Losers */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 rounded-lg bg-red-100">
                                        <TrendingDown className="w-5 h-5 text-red-600" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">Top Losers Today</h4>
                                </div>

                                <div className="space-y-3">
                                    {topLosers.map((company, index) => (
                                        <div key={company.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-red-100 to-red-50 flex items-center justify-center text-red-600 font-bold">
                                                    {company.logoText}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{company.symbol}</div>
                                                    <div className="text-xs text-gray-500">{company.name.split('(')[0].trim()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">
                                                    ₹{company.price.toLocaleString('en-IN', { maximumFractionDigits: company.price < 10 ? 2 : 0 })}
                                                </div>
                                                <div className="text-red-500 font-bold text-sm">
                                                    {company.todayChange.toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* All Companies Table - Static data */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-[#2076C7]" />
                            Company Prices (Static Data)
                        </h2>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Company</th>
                                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Today</th>
                                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Week</th>
                                            <th className="py-4 px-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {companies.map(company => (
                                            <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-md bg-linear-to-r from-[#2076C7]/20 to-[#1CADA3]/20 flex items-center justify-center text-[#2076C7] font-bold">
                                                            {company.logoText}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{company.name}</div>
                                                            <div className="text-xs text-gray-500">{company.category}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        ₹{company.price.toLocaleString('en-IN', { maximumFractionDigits: company.price < 10 ? 2 : 0 })}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${company.todayChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {company.todayChange >= 0 ? '+' : ''}{company.todayChange.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${company.weekChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {company.weekChange >= 0 ? '+' : ''}{company.weekChange.toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-600">
                                                        {Math.floor(company.volume).toLocaleString('en-IN')} shares
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Market Statistics - Static */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <PieChart className="w-6 h-6 text-[#2076C7]" />
                            Market Statistics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                                <IndianRupee className="w-10 h-10 text-green-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-gray-900 mb-2">₹2,850 Cr</div>
                                <div className="text-sm text-gray-500">Total Volume Traded</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                                <Users className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-gray-900 mb-2">8,450+</div>
                                <div className="text-sm text-gray-500">Active Investors</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                                <BarChart3 className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-gray-900 mb-2">153</div>
                                <div className="text-sm text-gray-500">Active Listings</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                                <TrendingUp className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-gray-900 mb-2">₹12,58,000 Cr</div>
                                <div className="text-sm text-gray-500">Market Capitalization</div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default LiveTrends;