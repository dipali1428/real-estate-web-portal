"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, RefreshCw, Download, Info, AlertCircle } from 'lucide-react';
import { usePMSLivePerformance } from '../../hooks/useRealTimeData';
import FinancialDataService from '../../services/FinancialDataService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function PMS_Live_Performance() {
    const [timeFrame, setTimeFrame] = useState('1Y');
    const [benchmarkData, setBenchmarkData] = useState<any>(null);
    const [sectorData, setSectorData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { performanceData, stats, loading, refetch } = usePMSLivePerformance('pms_real_001', timeFrame);

    const fetchRealBenchmarks = useCallback(async () => {
        try {
            setError(null);
            const data = await FinancialDataService.getNifty50LiveData();
            setBenchmarkData(data);

            const sectors = await FinancialDataService.getSectorPerformance();
            setSectorData(sectors);
        } catch (err) {
            console.error('Error fetching real benchmarks:', err);
            setError('Real-time market feed currently unavailable. Displaying historical benchmarks.');
        }
    }, []);

    useEffect(() => {
        fetchRealBenchmarks();
        const interval = setInterval(fetchRealBenchmarks, 300000); // Every 5 mins
        return () => clearInterval(interval);
    }, [fetchRealBenchmarks]);

    const timeFrames = [
        { label: '1D', value: '1D' },
        { label: '1W', value: '1W' },
        { label: '1M', value: '1M' },
        { label: '3M', value: '3M' },
        { label: '6M', value: '6M' },
        { label: '1Y', value: '1Y' }
    ];

    const chartData = {
        labels: performanceData.map((d: any) => d.date),
        datasets: [
            {
                label: `Benchmark (${benchmarkData?.name || 'Nifty 50'})`,
                data: performanceData.map((d: any) => d.benchmark),
                borderColor: '#1CADA3',
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
            },
            {
                label: 'Industry Avg',
                data: performanceData.map((d: any) => d.topQuartile),
                borderColor: '#d97706',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { usePointStyle: true, boxWidth: 6, font: { size: 10 } }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                cornerRadius: 12,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color: '#64748b',
                    font: { size: 10 }
                }
            },
            y: {
                grid: { color: '#f0f0f0' },
                ticks: {
                    color: '#64748b',
                    font: { size: 10 },
                    callback: (value: any) => `${value}%`
                }
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">PMS Live Performance</h3>
                        <p className="text-sm text-gray-600">Syncing with NSE India & Internal Portfolio Engine</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {timeFrames.map((tf) => (
                            <button
                                key={tf.value}
                                onClick={() => setTimeFrame(tf.value)}
                                className={`px-3 py-1.5 text-sm rounded-md transition-all ${timeFrame === tf.value
                                    ? 'bg-white shadow text-blue-600 font-semibold'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => { refetch(); fetchRealBenchmarks(); }}
                        disabled={loading}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin text-gray-400' : 'text-gray-600'} />
                    </button>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${benchmarkData && !error ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    <div className={`w-2 h-2 rounded-full ${benchmarkData && !error ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                    {benchmarkData && !error ? 'Live NSE/BSE Feed' : 'Historical/Simulated Mode'}
                </div>
                {error && (
                    <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                        <AlertCircle size={12} />
                        {error}
                    </div>
                )}
            </div>

            {loading && performanceData.length === 0 ? (
                <div className="h-80 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-600">Gathering real-time insights...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="h-80">
                        <Line data={chartData} options={options} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-xs text-blue-700 font-bold uppercase mb-1">Portfolio Return</div>
                            <div className="text-2xl font-black text-blue-900">{stats.ytdReturn || '--'}</div>
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                            <div className="text-xs text-teal-700 font-bold uppercase mb-1">Index Change</div>
                            <div className="text-2xl font-black text-teal-900">
                                {benchmarkData ? `${benchmarkData.changePercent.toFixed(2)}%` : '--'}
                            </div>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <div className="text-xs text-amber-700 font-bold uppercase mb-1">Alpha Premium</div>
                            <div className="text-2xl font-black text-amber-900">{stats.alpha || '--'}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="text-xs text-purple-700 font-bold uppercase mb-1">Sharpe Ratio</div>
                            <div className="text-2xl font-black text-purple-900">{stats.sharpeRatio || '--'}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <div className="text-xs text-green-700 font-bold uppercase mb-1">Beta</div>
                            <div className="text-2xl font-black text-green-900">{stats.beta || '--'}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-xs text-gray-700 font-bold uppercase mb-1">Volatility</div>
                            <div className="text-2xl font-black text-gray-900">{stats.volatility || '--'}</div>
                        </div>
                    </div>

                    {sectorData.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <TrendingUp size={16} className="text-primary" /> NSE Sectoral Trends (Live)
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {sectorData.slice(0, 5).map((sector: any, i: number) => (
                                    <div key={i} className="bg-neutral-50 px-4 py-3 rounded-xl border border-gray-100">
                                        <div className="text-[10px] font-bold text-slate-700 uppercase truncate">{sector.name}</div>
                                        <div className={`text-sm font-black ${sector.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {sector.changePercent >= 0 ? '+' : ''}{sector.changePercent.toFixed(2)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="mt-8 p-4 bg-slate-900 rounded-xl text-white">
                <div className="flex items-start gap-3">
                    <Info className="text-primary mt-0.5" size={18} />
                    <div className="text-[11px] leading-relaxed opacity-90">
                        <span className="font-bold text-primary">DATA PROVENANCE:</span> Real-time benchmark data streamed from NSE India API via internal proxy.
                        Portfolio metrics calculated using Time-Weighted Rate of Return (TWRR) methodology.
                        Live sync interval: 2 minutes for portfolio, 5 minutes for market benchmarks.
                    </div>
                </div>
            </div>
        </div>
    );
}
