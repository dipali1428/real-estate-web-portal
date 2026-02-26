'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Activity, Info } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const HealthInsuranceCharts = () => {
    // CSR Comparison Data
    const csrData = {
        labels: ['HDFC ERGO', 'Tata AIG', 'ICICI Lombard', 'Star Health', 'Niva Bupa', 'Care Health'],
        datasets: [
            {
                label: 'Claim Settlement Ratio (%)',
                data: [98.2, 98.0, 97.4, 97.0, 96.5, 95.8],
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, '#2076C7');
                    gradient.addColorStop(0.5, '#1CADA3');
                    gradient.addColorStop(1, '#2076C7');
                    return gradient;
                },
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const csrOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1E293B',
                titleFont: { size: 12, weight: 'bold' },
                bodyFont: { size: 11 },
                padding: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `CSR: ${context.parsed.y}%`
                }
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 90,
                max: 100,
                grid: { color: '#F1F5F9' },
                ticks: { font: { weight: 'bold', size: 10 }, color: '#64748B' }
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { weight: 'bold', size: 9 },
                    color: '#475569',
                    autoSkip: true,
                    maxRotation: 45,
                    minRotation: 0,
                    padding: 4
                }
            }
        }
    };

    // Medical Inflation Data
    const inflationData = {
        labels: ['2015', '2017', '2019', '2021', '2023', '2025 (Est)'],
        datasets: [
            {
                label: 'Hospitalization Cost (Generic)',
                data: [1.2, 1.8, 2.5, 4.2, 5.8, 7.5], // Values in Lakhs
                borderColor: '#2076C7',
                backgroundColor: 'rgba(32, 118, 199, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
            }
        ],
    };

    const inflationOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1E293B',
                padding: 8,
                callbacks: {
                    label: (context) => `Avg Cost: ₹${context.parsed.y} Lakhs`
                }
            }
        },
        scales: {
            y: {
                grid: { color: '#F1F5F9' },
                ticks: {
                    callback: (value) => `₹${value}L`,
                    font: { weight: 'bold', size: 10 },
                    color: '#64748B'
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { weight: 'bold', size: 9 },
                    color: '#475569',
                    autoSkip: true,
                    maxRotation: 45,
                    minRotation: 0,
                    maxTicksLimit: 6
                }
            }
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                            Market Insights & Claim Transparency
                        </h2>
                        <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto">
                            Data-driven decisions for your family's future. We track claim performance and market trends to ensure you always have the best protection.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* CSR Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-50 p-5 sm:p-8 rounded-xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white rounded-lg shadow-sm text-[#2076C7]">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Claim Settlement Leaderboard</h3>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Efficiency Ranking 2024-25</p>
                            </div>
                        </div>
                        <div className="h-[300px] sm:h-[350px] w-full bg-white p-2 sm:p-6 rounded-lg border border-gray-100 shadow-inner">
                            <Bar data={csrData} options={csrOptions} />
                        </div>
                        <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                            <Info size={20} className="text-[#2076C7] mt-1 shrink-0" />
                            <p className="text-xs text-gray-600 font-medium leading-relaxed">
                                <span className="font-bold text-[#2076C7]">Why CSR Matters:</span> Higher Claim Settlement Ratio indicates a company's reliability in honoring claims. We only partner with insurers maintaining <span className="font-bold text-gray-900">95%+ CSR.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Inflation Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-50 p-5 sm:p-8 rounded-xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white rounded-lg shadow-sm text-[#1CADA3]">
                                <TrendingUp size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Medical Inflation Trend</h3>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Rising Cost of Critical Care (In INR)</p>
                            </div>
                        </div>
                        <div className="h-[250px] sm:h-[350px] w-full bg-white p-2 sm:p-6 rounded-lg border border-gray-100 shadow-inner">
                            <Line data={inflationData} options={inflationOptions} />
                        </div>
                        <div className="mt-8 flex items-start gap-3 p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                            <Activity size={20} className="text-[#1CADA3] mt-1 shrink-0" />
                            <p className="text-xs text-gray-600 font-medium leading-relaxed">
                                <span className="font-bold text-[#1CADA3]">The Urgency:</span> Healthcare costs in India are rising at <span className="font-bold text-gray-900">14% annually.</span> A ₹5 Lakh cover from 2015 is equivalent to ₹1.2 Lakhs today. Upgrade your sum insured accordingly.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-400 font-medium italic">
                        *Data sourced from IRDAI Annual Reports and Industry Market Trends (2015-2025).
                        Actual premiums and settlements are subject to policy terms and conditions.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HealthInsuranceCharts;
