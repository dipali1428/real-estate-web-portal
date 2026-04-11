"use client";

import React, { useState } from 'react';
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
import { Activity, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketPulse } from '../../hooks/useRealTimeData';

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

export default function Live_Market_Comparison() {
    const [timeFrame, setTimeFrame] = useState('1D');
    const { pulseData, loading, refetch } = useMarketPulse(timeFrame);

    const timeFrames = [
        { label: '1D', value: '1D' },
        { label: '1W', value: '1W' },
        { label: '1M', value: '1M' },
        { label: '1Y', value: '1Y' }
    ];

    const latestNifty = pulseData[pulseData.length - 1]?.nifty;
    const previousNifty = pulseData[pulseData.length - 2]?.nifty;
    const niftyTrend = latestNifty && previousNifty ? latestNifty > previousNifty : null;

    const chartData = {
        labels: pulseData.map((d: any) => d.name),
        datasets: [
            {
                label: 'Nifty 50',
                data: pulseData.map((d: any) => d.nifty),
                borderColor: '#2076C7',
                backgroundColor: 'rgba(32, 118, 199, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
            },
            {
                label: 'Sensex',
                data: pulseData.map((d: any) => d.sensex),
                borderColor: '#1CADA3',
                backgroundColor: 'rgba(28, 173, 163, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
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
                    maxTicksLimit: 6,
                    color: '#64748b',
                    font: { size: 10 }
                }
            },
            y: {
                display: false,
                grid: { display: false }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1CADA3]/10 rounded-lg">
                        <Activity className="text-[#1CADA3]" size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-gray-900">Live Market Pulse</h3>
                            {niftyTrend !== null && (
                                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${niftyTrend ? 'bg-[#1CADA3]/10 text-[#1CADA3]' : 'bg-red-100 text-red-700'}`}>
                                    {niftyTrend ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {niftyTrend ? 'Up' : 'Down'}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">Nifty 50 vs Sensex Performance</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {timeFrames.map((tf) => (
                            <button
                                key={tf.value}
                                onClick={() => setTimeFrame(tf.value)}
                                className={`px-3 py-1 text-xs rounded-md transition-all ${timeFrame === tf.value
                                    ? 'bg-white shadow-md text-[#2076C7] font-bold'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={refetch}
                        disabled={loading}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin text-gray-400' : 'text-gray-600'} />
                    </button>
                </div>
            </div>

            <div className="h-64">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
