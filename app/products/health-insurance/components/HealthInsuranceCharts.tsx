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
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Helper for shortened labels on mobile
    const getLabels = (labels: string[]) => {
        if (isMobile) {
            return labels.map(l => l.replace(' ERGO', '').replace(' Lombard', '').replace(' General', '').replace(' Health', ''));
        }
        return labels;
    };

    // CSR Comparison Data
    const csrData = {
        labels: getLabels(['HDFC ERGO', 'Tata AIG', 'ICICI Lombard', 'Star Health', 'Niva Bupa', 'Care Health']),
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
                ticks: { font: { weight: 'bold', size: isMobile ? 8 : 9 }, color: '#64748B' }
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { weight: 'bold', size: isMobile ? 7 : 8 },
                    color: '#475569',
                    autoSkip: true,
                    maxRotation: isMobile ? 45 : 0,
                    minRotation: isMobile ? 45 : 0,
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
                pointRadius: isMobile ? 3 : 4,
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
                    font: { weight: 'bold', size: isMobile ? 8 : 9 },
                    color: '#64748B'
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    font: { weight: 'bold', size: isMobile ? 7 : 8 },
                    color: '#475569',
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    maxTicksLimit: isMobile ? 4 : 5
                }
            }
        }
    };

    return (
        <section className="py-12 md:py-24 bg-white relative overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 relative z-10">
                <div className="text-center mb-8 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 px-2 tracking-tight">
                            Market Insights & Claim Transparency
                        </h2>
                        <p className="text-sm sm:text-base md:text-xl text-gray-500 font-medium max-w-3xl mx-auto px-2 md:px-0">
                            Data-driven decisions for your family's future. We track claim performance and market trends to ensure you always have the best protection.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    {/* CSR Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-50 p-3 sm:p-5 md:p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                            <div className="p-2 sm:p-3 bg-white rounded-lg shadow-sm text-[#2076C7] shrink-0">
                                <ShieldCheck size={20} className="sm:w-7 sm:h-7" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight truncate-none">Claim Settlement Leaderboard</h3>
                                <p className="text-[9px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Efficiency Ranking 2024-25</p>
                            </div>
                        </div>
                        <div className="h-[260px] sm:h-[350px] w-full bg-white p-1 sm:p-6 rounded-lg border border-gray-100 shadow-inner overflow-hidden">
                            <Bar data={csrData} options={{ ...csrOptions, scales: { ...csrOptions.scales, x: { ...csrOptions.scales?.x, ticks: { ...csrOptions.scales?.x?.ticks, font: { ...csrOptions.scales?.x?.ticks?.font, size: isMobile ? 6 : 8 } } } } }} />
                        </div>
                        <div className="mt-4 sm:mt-8 flex items-start gap-2.5 p-3 sm:p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                            <Info size={16} className="text-[#2076C7] mt-0.5 shrink-0" />
                            <p className="text-[10px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                                <span className="font-bold text-[#2076C7]">Why CSR Matters:</span> Higher Claim Settlement Ratio indicates reliability. We partner with insurers maintaining <span className="font-bold text-gray-900">95%+ CSR.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Inflation Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-50 p-3 sm:p-5 md:p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                            <div className="p-2 sm:p-3 bg-white rounded-lg shadow-sm text-[#1CADA3] shrink-0">
                                <TrendingUp size={20} className="sm:w-7 sm:h-7" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">Medical Inflation Trend</h3>
                                <p className="text-[9px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Rising Cost of Critical Care (In INR)</p>
                            </div>
                        </div>
                        <div className="h-[260px] sm:h-[350px] w-full bg-white p-1 sm:p-6 rounded-lg border border-gray-100 shadow-inner overflow-hidden">
                            <Line data={inflationData} options={{ ...inflationOptions, scales: { ...inflationOptions.scales, x: { ...inflationOptions.scales?.x, ticks: { ...inflationOptions.scales?.x?.ticks, font: { ...inflationOptions.scales?.x?.ticks?.font, size: isMobile ? 6 : 8 } } } } }} />
                        </div>
                        <div className="mt-4 sm:mt-8 flex items-start gap-2.5 p-3 sm:p-4 bg-teal-50/50 rounded-lg border border-teal-100">
                            <Activity size={16} className="text-[#1CADA3] mt-0.5 shrink-0" />
                            <p className="text-[10px] sm:text-xs text-gray-600 font-medium leading-relaxed">
                                <span className="font-bold text-[#1CADA3]">The Urgency:</span> Healthcare costs in India are rising at <span className="font-bold text-gray-900">14% annually.</span> Early coverage secures your financial future.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 md:mt-16 text-center px-4">
                    <p className="text-[9px] sm:text-sm text-gray-400 font-medium italic leading-relaxed">
                        *Data sourced from IRDAI Annual Reports and Industry Market Trends (2015-2025).<br className="hidden sm:block" />
                        Actual premiums and settlements are subject to policy terms and conditions.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HealthInsuranceCharts;
