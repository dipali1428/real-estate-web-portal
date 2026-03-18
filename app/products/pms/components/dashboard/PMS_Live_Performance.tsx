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
                borderColor: '#2076C7',
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
                    <div className="p-2 bg-[#2076C7]/10 rounded-lg">
                        <TrendingUp className="text-[#2076C7]" size={24} />
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
                                    ? 'bg-white shadow text-[#2076C7] font-semibold'
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
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${benchmarkData && !error ? 'bg-[#1CADA3]/10 text-[#1CADA3]' : 'bg-[#2076C7]/10 text-[#2076C7]'}`}>
                    <div className={`w-2 h-2 rounded-full ${benchmarkData && !error ? 'bg-[#1CADA3] animate-pulse' : 'bg-[#2076C7]'}`}></div>
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
                        <div className="bg-[#2076C7]/5 p-4 rounded-lg border border-[#2076C7]/10">
                            <div className="text-xs text-[#2076C7] font-bold uppercase mb-1">Portfolio Return</div>
                            <div className="text-2xl font-black text-[#2076C7]">{stats.ytdReturn || '--'}</div>
                        </div>
                        <div className="bg-[#1CADA3]/5 p-4 rounded-lg border border-[#1CADA3]/10">
                            <div className="text-xs text-[#1CADA3] font-bold uppercase mb-1">Index Change</div>
                            <div className="text-2xl font-black text-[#1CADA3]">
                                {benchmarkData ? `${benchmarkData.changePercent.toFixed(2)}%` : '--'}
                            </div>
                        </div>
                        <div className="bg-[#2076C7]/5 p-4 rounded-lg border border-[#2076C7]/10">
                            <div className="text-xs text-[#2076C7] font-bold uppercase mb-1">Alpha Premium</div>
                            <div className="text-2xl font-black text-[#2076C7]">{stats.alpha || '--'}</div>
                        </div>
                        <div className="bg-[#1CADA3]/5 p-4 rounded-lg border border-[#1CADA3]/10">
                            <div className="text-xs text-[#1CADA3] font-bold uppercase mb-1">Sharpe Ratio</div>
                            <div className="text-2xl font-black text-[#1CADA3]">{stats.sharpeRatio || '--'}</div>
                        </div>
                        <div className="bg-[#2076C7]/5 p-4 rounded-lg border border-[#2076C7]/10">
                            <div className="text-xs text-[#2076C7] font-bold uppercase mb-1">Beta</div>
                            <div className="text-2xl font-black text-[#2076C7]">{stats.beta || '--'}</div>
                        </div>
                        <div className="bg-[#1CADA3]/5 p-4 rounded-lg border border-[#1CADA3]/10">
                            <div className="text-xs text-[#1CADA3] font-bold uppercase mb-1">Volatility</div>
                            <div className="text-2xl font-black text-[#1CADA3]">{stats.volatility || '--'}</div>
                        </div>
                    </div>

                    {sectorData.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <TrendingUp size={16} className="text-[#2076C7]" /> NSE Sectoral Trends (Live)
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {sectorData.slice(0, 5).map((sector: any, i: number) => (
                                    <div key={i} className="bg-neutral-50 px-4 py-3 rounded-xl border border-gray-100">
                                        <div className="text-[10px] font-bold text-slate-700 uppercase truncate">{sector.name}</div>
                                        <div className={`text-sm font-black ${sector.changePercent >= 0 ? 'text-[#1CADA3]' : 'text-red-600'}`}>
                                            {sector.changePercent >= 0 ? '+' : ''}{sector.changePercent.toFixed(2)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="mt-8 p-4 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-start gap-3">
                    <Info className="text-primary mt-0.5" size={18} />
                    <div className="text-[11px] leading-relaxed text-gray-600">
                        <span className="font-bold text-[#2076C7]">DATA PROVENANCE:</span> Real-time benchmark data streamed from NSE India API via internal proxy.
                        Portfolio metrics calculated using Time-Weighted Rate of Return (TWRR) methodology.
                        Live sync interval: 2 minutes for portfolio, 5 minutes for market benchmarks.
                    </div>
                </div>
            </div>
        </div>
    );
}
