'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  // Chart data
  const data = {
    labels: [
      'Life Insurance',
      'Health Insurance', 
      'Motor Insurance',
      'Home Insurance',
      'Travel Insurance'
    ],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#4f46e5', // Indigo
          '#06b6d4', // Cyan
          '#10b981', // Emerald
          '#f59e0b', // Amber
          '#ef4444', // Red
        ],
        borderColor: [
          '#4f46e5',
          '#06b6d4', 
          '#10b981',
          '#f59e0b',
          '#ef4444',
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      },
    },
    cutout: '60%',
  };

  return (
    <div className="h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
}