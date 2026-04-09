'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import { ChevronRight, Lightbulb } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const sliderStyle = `
  input[type=range].nps-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1CADA3;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px #1CADA3;
  }
  input[type=range].nps-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1CADA3;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px #1CADA3;
  }
  input[type=range].nps-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    border-radius: 9999px;
    outline: none;
    cursor: pointer;
  }
`;

const getSliderBg = (value: number, min: number, max: number) => {
    const pct = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`;
};

// Reusable slider + input field moved outside to prevent recreation on each render
const SliderField = ({
    label, value, min, max, step, onChange, unit,
}: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; unit: string; color: string;
}) => (
    <div className="mb-4">
        <label className="block text-[#2076C7] font-semibold mb-1 text-sm">{label}</label>
        <div className="slider-container mb-2">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer nps-slider accent-teal-600"
                style={{ background: getSliderBg(value, min, max) }}
            />
            <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 mt-1 shadow-none">
                <span>{unit === '₹' ? `₹${min.toLocaleString('en-IN')}` : unit === '%' ? `${min}%` : `${min} Yrs`}</span>
                <span>{unit === '₹' ? (max >= 100000 ? `₹${(max / 100000).toFixed(0)}L` : `₹${max}`) : unit === '%' ? `${max}%` : `${max} Yrs`}</span>
            </div>
        </div>
        <div className="relative">
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!isNaN(v)) onChange(v);
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white focus:ring-0 transition-colors pr-10 text-gray-800 placeholder:text-gray-500 text-xs sm:text-sm"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-xs">{unit}</span>
        </div>
    </div>
);

export default function NPSCalculator() {
    const [age, setAge] = useState(25);
    const [retirementAge, setRetirementAge] = useState(60);
    const [contribution, setContribution] = useState(5000);
    const [returnRate, setReturnRate] = useState(10);
    const [annuityPercentage, setAnnuityPercentage] = useState(40);

    const chartRef = useRef<ChartJS<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const formatCurrency = (value: number): string => {
        return '₹' + value.toLocaleString('en-IN');
    };

    const results = useMemo(() => {
        const years = Math.max(0, retirementAge - age);
        const months = years * 12;
        const monthlyRate = returnRate / 12 / 100;

        let corpus = 0;
        if (monthlyRate > 0) {
            corpus = contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        } else {
            corpus = contribution * months;
        }

        const invested = contribution * months;
        const wealth = Math.max(0, corpus - invested);
        const annuityAmt = corpus * (annuityPercentage / 100);
        const lump = corpus - annuityAmt;
        const pension = (annuityAmt * 0.06) / 12;

        return {
            totalInvested: Math.round(invested),
            totalCorpus: Math.round(corpus),
            wealthGained: Math.round(wealth),
            monthlyPension: Math.round(pension),
            lumpSum: Math.round(lump),
        };
    }, [age, retirementAge, contribution, returnRate, annuityPercentage]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        chartRef.current = new ChartJS(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Invested Amount', 'Wealth Gained'],
                datasets: [{
                    data: [results.totalInvested, results.wealthGained],
                    backgroundColor: ['#e5e7eb', '#1CADA3'],
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '78%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => context.label + ': ' + formatCurrency(context.parsed)
                        }
                    }
                },
                animation: {
                    duration: 500 // Smooth entry but not too long
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []); // Initialize only once

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data.datasets[0].data = [results.totalInvested, results.wealthGained];
            chartRef.current.update('none'); // Update without animation for immediate feedback
        }
    }, [results.totalInvested, results.wealthGained]);

    return (
        <section id="calculator" className="relative py-12 md:py-16 bg-white overflow-hidden font-sans">
            <style dangerouslySetInnerHTML={{ __html: sliderStyle }} />
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-6 px-4 sm:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">NPS Retirement Calculator</h2>
                        <p className="text-blue-50 text-sm sm:text-base opacity-90">Visualize your financial future. Estimate retirement corpus and monthly pension.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        {/* Left: Inputs */}
                        <div className="flex-1 p-8 lg:p-10 lg:border-r border-gray-100 space-y-6">
                            <SliderField
                                label="Current Age (Yrs)"
                                value={age} min={18} max={60} step={1}
                                onChange={setAge}
                                unit="Yrs"
                                color="#2076C7"
                            />
                            <SliderField
                                label="Monthly Contribution (₹)"
                                value={contribution} min={500} max={150000} step={500}
                                onChange={setContribution}
                                unit="₹"
                                color="#2076C7"
                            />
                            <SliderField
                                label="Expected Annual Return (%)"
                                value={returnRate} min={5} max={15} step={0.5}
                                onChange={setReturnRate}
                                unit="%"
                                color="#2076C7"
                            />
                            <SliderField
                                label="Annuity Reinvestment (%)"
                                value={annuityPercentage} min={40} max={100} step={5}
                                onChange={setAnnuityPercentage}
                                unit="%"
                                color="#2076C7"
                            />
                        </div>

                        {/* Right: Chart + Summary */}
                        <div className="flex-1 p-8 lg:p-10 bg-gray-50/40 flex flex-col items-center justify-center">
                            {/* Donut chart */}
                            <div className="relative w-52 h-52 mb-4">
                                <canvas ref={canvasRef} className="w-full h-full" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center leading-tight">Monthly<br />Pension</p>
                                    <p className="text-2xl font-black text-[#1CADA3] mt-1">{formatCurrency(results.monthlyPension)}</p>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-gray-200 inline-block"></span>
                                    <span className="text-xs text-gray-600 font-semibold">Invested Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#1CADA3] inline-block"></span>
                                    <span className="text-xs text-gray-600 font-semibold">Wealth Gained</span>
                                </div>
                            </div>

                            {/* Summary rows */}
                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-500 font-semibold">Total Investment</span>
                                    <span className="text-sm font-black text-gray-800">{formatCurrency(results.totalInvested)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-500 font-semibold">Est. Wealth Gained</span>
                                    <span className="text-sm font-black text-[#1CADA3]">{formatCurrency(results.wealthGained)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-500 font-semibold">Lump Sum (60%)</span>
                                    <span className="text-sm font-black text-[#2076C7]">{formatCurrency(results.lumpSum)}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 rounded-xl px-3">
                                    <span className="text-sm text-gray-700 font-bold">Total Corpus</span>
                                    <span className="text-lg font-black text-[#1CADA3]">{formatCurrency(results.totalCorpus)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Insights */}
                    <div className="border-t border-gray-100 p-8 lg:p-10 bg-gray-50/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                                <Lightbulb size={22} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Key Retirement Insights</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                `By investing ${formatCurrency(contribution)} monthly for ${retirementAge - age} years, you accumulate a corpus of ${formatCurrency(results.totalCorpus)}.`,
                                `With ${annuityPercentage}% annuity, you secure a monthly pension of ${formatCurrency(results.monthlyPension)} for life post-retirement.`,
                                `NPS offers an additional tax deduction of ₹50,000 under 80CCD(1B), saving significant taxes every year.`,
                                `Starting just 5 years earlier could result in a substantially larger retirement corpus due to compounding.`,
                            ].map((insight, i) => (
                                <div key={i} className="flex gap-3">
                                    <ChevronRight size={18} className="mt-0.5 text-[#1CADA3] shrink-0" />
                                    <p className="text-gray-600 font-medium text-sm leading-relaxed">{insight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}