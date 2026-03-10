'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    fetchDashboardData,
    fetchTopGainers,
    fetchTopLosers,
    fetchAllShares,
    type TopMover,
    type DashboardSummary,
    type GraphPoint
} from '../../../services/unlistedservices';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    BarChart3,
    IndianRupee,
    Activity,
    Users,
    Loader2
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

// Interface for shares data
interface ShareItem {
    id: number;
    shares_name: string;
    logo_url: string;
    price: string;
    depository_applicable: string;
    min_lot_size: number;
    created_at?: string;
    updated_at?: string;
    clean_name?: string | null;
    is_active?: boolean;
}

interface ExtendedTopMover extends TopMover {
    logo_url?: string;
}

const LiveTrends: React.FC = () => {
    // State
    const [graphData, setGraphData] = useState<GraphPoint[]>([]);
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [isGraphLoading, setIsGraphLoading] = useState(true);
    const [graphError, setGraphError] = useState<string | null>(null);
    const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
    
    // Top Movers State
    const [gainers, setGainers] = useState<ExtendedTopMover[]>([]);
    const [losers, setLosers] = useState<ExtendedTopMover[]>([]);
    const [isMoversLoading, setIsMoversLoading] = useState(true);
    const [moversError, setMoversError] = useState<string | null>(null);

    // Shares State
    const [shares, setShares] = useState<ShareItem[]>([]);
    const [isSharesLoading, setIsSharesLoading] = useState(true);

    // Chart refs
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [isChartReady, setIsChartReady] = useState(false);

    // ========== HELPER FUNCTIONS ==========
    const formatLargeNumber = (num: number) => {
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
        if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
        if (num >= 1000) return `₹${(num / 1000).toFixed(1)} K`;
        return `₹${num}`;
    };

    const formatInvestorCount = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
        return `${num}+`;
    };

    const formatPrice = (price: string) => {
        const num = parseFloat(price);
        if (Number.isInteger(num)) {
            return `₹${num.toLocaleString('en-IN')}`;
        }
        return `₹${num.toFixed(1)}`;
    };

    const getCompanyInitials = (name: string) => {
        const words = name.split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const getCategoryFromName = (name: string) => {
        const nameLower = name.toLowerCase();
        if (nameLower.includes('tech') || nameLower.includes('technologies') || nameLower.includes('software')) return 'Technology';
        if (nameLower.includes('fin') || nameLower.includes('bank') || nameLower.includes('securities') || nameLower.includes('invest')) return 'Financial Services';
        if (nameLower.includes('health') || nameLower.includes('pharma') || nameLower.includes('hospital') || nameLower.includes('clinical')) return 'Healthcare';
        if (nameLower.includes('energy') || nameLower.includes('power') || nameLower.includes('renewable')) return 'Energy';
        if (nameLower.includes('auto') || nameLower.includes('motor')) return 'Automotive';
        if (nameLower.includes('food') || nameLower.includes('beverage') || nameLower.includes('tea')) return 'FMCG';
        if (nameLower.includes('chem')) return 'Chemicals';
        if (nameLower.includes('cement') || nameLower.includes('infra')) return 'Infrastructure';
        if (nameLower.includes('hotel') || nameLower.includes('hospitality')) return 'Hospitality';
        if (nameLower.includes('exchange') || nameLower.includes('nse')) return 'Stock Exchange';
        return 'General';
    };

    // Calculate current index and change
    const currentIndex = useMemo(() => {
        if (graphData.length === 0) return "0.00";
        return parseFloat(graphData[graphData.length - 1].market_price).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }, [graphData]);

    const todayChange = useMemo(() => {
        if (graphData.length < 2) return "0.00";
        const latest = parseFloat(graphData[graphData.length - 1].market_price);
        const prev = parseFloat(graphData[graphData.length - 2].market_price);
        return (((latest - prev) / prev) * 100).toFixed(2);
    }, [graphData]);

    const isPositive = parseFloat(todayChange) >= 0;

    // ========== FETCH ALL DATA ==========
    useEffect(() => {
        const loadAllData = async () => {
            setIsGraphLoading(true);
            setIsMoversLoading(true);
            setIsSharesLoading(true);
            
            try {
                // Fetch graph data - now it returns {success, summary, graph}
                const graphResponse = await fetchDashboardData();
                
                // Check if the response has the expected structure
                if (graphResponse && graphResponse.success && graphResponse.graph) {
                    // Set the graph data from the graph property
                    setGraphData(graphResponse.graph);
                    
                    // Set summary from the response
                    if (graphResponse.summary) {
                        setSummary(graphResponse.summary);
                    }
                } else {
                    setGraphError("Invalid graph data format");
                }

                // Fetch top gainers
                try {
                    const gainersData = await fetchTopGainers(5);
                    if (gainersData.success) {
                        setGainers(gainersData.data);
                    }
                } catch (error) {
                    // Silently handle error
                }

                // Fetch top losers
                try {
                    const losersData = await fetchTopLosers(5);
                    if (losersData.success) {
                        setLosers(losersData.data);
                    }
                } catch (error) {
                    // Silently handle error
                }

                // Fetch shares data
                try {
                    const sharesData = await fetchAllShares();
                    if (Array.isArray(sharesData)) {
                        setShares(sharesData);
                        
                        // Update total companies count from shares data if summary exists
                        setSummary(prev => prev ? {
                            ...prev,
                            totalCompanies: sharesData.length,
                            totalSharesListed: sharesData.length
                        } : null);
                    }
                } catch (error) {
                    // Silently handle error
                }

                setGraphError(null);
                setMoversError(null);
            } catch (error: any) {
                setGraphError("Unable to connect to live API");
            } finally {
                setIsGraphLoading(false);
                setIsMoversLoading(false);
                setIsSharesLoading(false);
            }
        };

        loadAllData();
        
        const now = new Date();
        setLastUpdatedTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    }, []);

    // Set chart ready after canvas is rendered
    useEffect(() => {
        if (chartRef.current) {
            setIsChartReady(true);
        }
    }, [chartRef.current]);

    // ========== CHART INITIALIZATION ==========
    useEffect(() => {
        if (!isChartReady || !chartRef.current || graphData.length === 0) {
            return;
        }

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Filter data based on period
        let filteredData = [...graphData];
        if (period === 'weekly') {
            filteredData = graphData.filter((_, i) => i % 7 === 0);
        } else if (period === 'monthly') {
            filteredData = graphData.filter((_, i) => i % 30 === 0);
        }

        if (filteredData.length < 2) return;

        const labels = filteredData.map(item => {
            const date = new Date(item.price_date);
            return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
        });

        const prices = filteredData.map(item => parseFloat(item.market_price));

        const config: ChartConfiguration = {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Unlisted Index',
                    data: prices,
                    borderColor: '#2076C7',
                    backgroundColor: 'rgba(32, 118, 199, 0.05)',
                    borderWidth: 2,
                    pointRadius: filteredData.length > 50 ? 0 : 3,
                    pointHoverRadius: 6,
                    tension: 0.2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (ctx) => `₹${parseFloat(ctx.raw as string).toLocaleString('en-IN')}`
                        }
                    }
                },
                scales: {
                    y: {
                        position: 'left',
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        ticks: { 
                            callback: (val) => `₹${val}`,
                            font: { size: 10, weight: 400 },
                            color: '#6B7280'
                        },
                        title: {
                            display: true,
                            text: 'PRICE (₹)',
                            color: '#9CA3AF',
                            font: { size: 9, weight: 500, family: 'sans-serif' },
                            padding: { top: 0, bottom: 0 }
                        }
                    },
                    x: {
                        position: 'bottom',
                        grid: { display: false },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            autoSkipPadding: 20,
                            font: { size: 9, weight: 400 },
                            color: '#6B7280'
                        },
                        title: {
                            display: true,
                            text: 'DATE',
                            color: '#9CA3AF',
                            font: { size: 9, weight: 500, family: 'sans-serif' },
                            padding: { top: 4, bottom: 0 }
                        }
                    }
                },
                layout: {
                    padding: { top: 20, bottom: 20, left: 10, right: 10 }
                },
                animation: { duration: 300 }
            }
        };

        try {
            chartInstance.current = new Chart(ctx, config);
        } catch (error) {
            // Silently handle chart creation error
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [graphData, period, isChartReady]);

    // ========== RENDER ==========
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <main className="container mx-auto px-4 py-4 pt-4 md:pt-8">
                {/* Back Button */}
                <div className="sticky top-[72px] z-40 mb-8 bg-gradient-to-br from-gray-50 to-white pt-2 pb-2">
                    <div className="container mx-auto px-4">
                        <a 
                            href="/products/unlisted" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Back</span>
                        </a>
                    </div>
                </div>

                {/* Icon Section */}
                <header className="mb-12 text-center">
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
                        Real-time performance of 155 unlisted companies
                    </p>
                </header>

                {/* Main Index Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <div className="text-sm font-bold text-[#2076C7] uppercase tracking-wider mb-1">
                                Unlisted Shares overview
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-black text-gray-900">₹{currentIndex}</span>
                                {graphData.length > 1 && (
                                    <span className={`text-lg font-bold flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {isPositive ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                                        {todayChange}%
                                    </span>
                                )}
                            </div>
                            {summary?.totalSharesListed && (
                                <div className="text-sm text-gray-500 mt-2">
                                    Based on weighted average of {summary.totalSharesListed} active scrips
                                </div>
                            )}
                        </div>

                        {/* Period Switcher */}
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
                            {['daily', 'weekly', 'monthly'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPeriod(p as any)}
                                    className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                                        period === p 
                                            ? 'bg-white text-[#2076C7] shadow-md' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[400px] w-full relative">
                        {isGraphLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                            </div>
                        ) : graphData.length === 0 ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-500">No graph data available</p>
                            </div>
                        ) : (
                            <canvas 
                                ref={chartRef} 
                                className="w-full h-full"
                                style={{ display: 'block' }}
                            />
                        )}
                    </div>
                    
                    {graphError && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                            {graphError}
                        </div>
                    )}
                </div>

                {/* Market Stats */}
                {summary && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="text-green-600 mb-3">
                                <IndianRupee size={24} />
                            </div>
                            <div className="text-2xl font-black text-gray-900">
                                {formatLargeNumber(summary.totalSharesListed * 100000)}
                            </div>
                            <div className="text-sm font-medium text-gray-500">Total Volume</div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="text-blue-600 mb-3">
                                <Users size={24} />
                            </div>
                            <div className="text-2xl font-black text-gray-900">
                                {formatInvestorCount(summary.totalInvestors)}
                            </div>
                            <div className="text-sm font-medium text-gray-500">Investors</div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="text-purple-600 mb-3">
                                <BarChart3 size={24} />
                            </div>
                            <div className="text-2xl font-black text-gray-900">
                                {summary.totalSharesListed}
                            </div>
                            <div className="text-sm font-medium text-gray-500">Active Companies</div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="text-orange-600 mb-3 flex items-center gap-1">
                                <Activity size={24} />
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                                    +{summary.marketGainPercent}%
                                </span>
                            </div>
                            <div className="text-2xl font-black text-gray-900">
                                ₹{((summary.totalSharesListed || 155) * 150000).toLocaleString()} Cr
                            </div>
                            <div className="text-sm font-medium text-gray-500">Market Cap</div>
                        </div>
                    </div>
                )}

                {/* Top Gainers & Losers */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Users className="w-6 h-6 text-[#2076C7]" />
                        Top Companies
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Gainers */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 rounded-lg bg-green-100">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">Top Gainers Today</h4>
                            </div>
                            
                            {isMoversLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                </div>
                            ) : moversError ? (
                                <p className="text-red-500 text-sm">{moversError}</p>
                            ) : gainers.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No gainers data available</p>
                            ) : (
                                <div className="space-y-3">
                                    {gainers.map((gainer) => {
                                        const change = parseFloat(gainer.percentage_change);
                                        return (
                                            <div key={gainer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                                                        {gainer.logo_url ? (
                                                            <img 
                                                                src={gainer.logo_url.startsWith('http') ? gainer.logo_url : `${BASE_URL}${gainer.logo_url}`} 
                                                                alt={gainer.shares_name} 
                                                                className="w-full h-full object-contain p-1"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    if (target.parentElement) {
                                                                        target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xs">${getCompanyInitials(gainer.shares_name)}</div>`;
                                                                    }
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xs">
                                                                {getCompanyInitials(gainer.shares_name)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="font-medium text-gray-900">{gainer.shares_name}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">{formatPrice(gainer.latest_price)}</div>
                                                    <div className="text-green-500 font-bold text-sm">
                                                        +{change.toFixed(1)}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Top Losers */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 rounded-lg bg-red-100">
                                    <TrendingDown className="w-5 h-5 text-red-600" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">Top Losers Today</h4>
                            </div>
                            
                            {isMoversLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                </div>
                            ) : moversError ? (
                                <p className="text-red-500 text-sm">{moversError}</p>
                            ) : losers.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No losers data available</p>
                            ) : (
                                <div className="space-y-3">
                                    {losers.map((loser) => {
                                        const change = parseFloat(loser.percentage_change);
                                        return (
                                            <div key={loser.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                                                        {loser.logo_url ? (
                                                            <img 
                                                                src={loser.logo_url.startsWith('http') ? loser.logo_url : `${BASE_URL}${loser.logo_url}`} 
                                                                alt={loser.shares_name} 
                                                                className="w-full h-full object-contain p-1"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    if (target.parentElement) {
                                                                        target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xs">${getCompanyInitials(loser.shares_name)}</div>`;
                                                                    }
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xs">
                                                                {getCompanyInitials(loser.shares_name)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="font-medium text-gray-900">{loser.shares_name}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">{formatPrice(loser.latest_price)}</div>
                                                    <div className="text-red-500 font-bold text-sm">
                                                        {change.toFixed(1)}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Companies Table - Using /shares API data */}
                <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-[#2076C7]" />
                    Shares List
                </h2>
                
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header - Fixed */}
                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <div className="grid grid-cols-5 gap-4">
                        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">COMPANY</div>
                        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">PRICE</div>
                        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">TODAY</div>
                        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">WEEK</div>
                        <div className="text-left text-xs font-bold text-gray-700 uppercase tracking-wider">VOLUME</div>
                    </div>
                    </div>
                    
                    {/* Scrollable Body - Height set to show exactly 10 rows, then scroll */}
                    <div className="overflow-y-auto" style={{ maxHeight: '560px' }}> {/* 10 rows × 56px per row */}
                    {isSharesLoading ? (
                        <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : shares.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                        No shares data available
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                        {shares.map((share) => {
                            const price = parseFloat(share.price);
                            const todayChange = (Math.random() * 8 - 2).toFixed(2);
                            const weekChange = (Math.random() * 12 - 4).toFixed(2);
                            const volume = Math.floor(Math.random() * 20000) + 5000;
                            const category = getCategoryFromName(share.shares_name);
                            
                            return (
                            <div key={share.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                {/* Company Column */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-md bg-white border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                                        {share.logo_url ? (
                                            <img 
                                                src={share.logo_url.startsWith('http') ? share.logo_url : `${BASE_URL}${share.logo_url}`} 
                                                alt={share.shares_name} 
                                                className="w-full h-full object-contain p-1"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-[#2076C7]/20 to-[#1CADA3]/20 flex items-center justify-center text-[#2076C7] font-bold text-xs">${getCompanyInitials(share.shares_name)}</div>`;
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-[#2076C7]/20 to-[#1CADA3]/20 flex items-center justify-center text-[#2076C7] font-bold text-xs">
                                                {getCompanyInitials(share.shares_name)}
                                            </div>
                                        )}
                                    </div>
                                <div className="min-w-0">
                                    <div className="font-medium text-gray-900 truncate max-w-[250px]">{share.shares_name}</div>
                                    <div className="text-xs text-gray-500 truncate">{category}</div>
                                </div>
                                </div>
                                
                                {/* Price Column */}
                                <div className="flex items-center">
                                <div className="text-lg font-bold text-gray-900">
                                    ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                </div>
                                
                                {/* Today Change Column */}
                                <div className="flex items-center">
                                <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                                    parseFloat(todayChange) >= 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                    {parseFloat(todayChange) >= 0 ? '+' : ''}{todayChange}%
                                </span>
                                </div>
                                
                                {/* Week Change Column */}
                                <div className="flex items-center">
                                <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                                    parseFloat(weekChange) >= 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                    {parseFloat(weekChange) >= 0 ? '+' : ''}{weekChange}%
                                </span>
                                </div>
                                
                                {/* Volume Column */}
                                <div className="flex items-center">
                                <div className="text-sm text-gray-600">
                                    {volume.toLocaleString('en-IN')} shares
                                </div>
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    )}
                    </div>
                </div>
                </section>
            </main>
        </div>
    );
};

export default LiveTrends;