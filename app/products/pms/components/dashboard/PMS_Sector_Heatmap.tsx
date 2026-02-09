"use client";

import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LayoutGrid } from 'lucide-react';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const data = [
    { name: 'Financial Services', value: 35, color: '#2076C7' },
    { name: 'IT', value: 20, color: '#1CADA3' },
    { name: 'Consumer Goods', value: 15, color: '#8b5cf6' },
    { name: 'Healthcare', value: 12, color: '#f59e0b' },
    { name: 'Automobile', value: 10, color: '#ef4444' },
    { name: 'Others', value: 8, color: '#6b7280' },
];

export default function PMS_Sector_Heatmap() {
    const chartData = {
        labels: data.map(d => d.name),
        datasets: [
            {
                data: data.map(d => d.value),
                backgroundColor: data.map(d => d.color),
                borderWidth: 0,
                hoverOffset: 10,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: { size: 10 }
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                cornerRadius: 12,
            }
        },
        cutout: '60%'
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <LayoutGrid className="text-purple-600" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Sectoral Allocation</h3>
                    <p className="text-sm text-gray-600">Distribution across key industries</p>
                </div>
            </div>

            <div className="h-64">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}
