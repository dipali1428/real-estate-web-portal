"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Chart, LineController, LineElement, PointElement, LinearScale,
  Title, CategoryScale, Filler, Tooltip, Legend, ChartConfiguration
} from 'chart.js';
import {
  Building, TrendingUp, ChartBar, Download, ShoppingCart,
  IndianRupee, Info, AlertTriangle, File,
  ArrowUp, FileText, ArrowLeft
} from 'lucide-react';

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler, Tooltip, Legend);

// --- Constants & Types ---
const TABS = ['overview', 'financials', 'shareholding', 'risks', 'documents'] as const;

interface Metric { label: string; value: string; }
const METRICS: Metric[] = [
  { label: 'Valuation', value: '₹7,500 Cr' },
  { label: 'Annual Revenue (FY23)', value: '₹2,850 Cr' },
  { label: 'Net Profit (FY23)', value: '₹325 Cr' },
  { label: 'Profit Margin', value: '11.4%' }
];

const FINANCIAL_ROWS = [
  ['Revenue (₹ Cr)', '1,250', '2,050', '2,850', '+39%'],
  ['Net Profit (₹ Cr)', '85', '215', '325', '+51%'],
  ['EBITDA Margin', '10.2%', '12.5%', '14.8%', '+2.3%'],
  ['ROCE', '22%', '28%', '35%', '+7%'],
  ['Debt/Equity', '0.45', '0.32', '0.18', '-0.14']
];

const SHAREHOLDING_DATA = [
  {
    title: 'Promoter Holding',
    items: [['Aman Gupta', '25.5%'], ['Sameer Mehta', '24.8%'], ['Other Promoters', '4.7%']],
    total: ['Total Promoter', '55.0%'],
    color: 'border-[#2076C7]'
  },
  {
    title: 'Institutional Investors',
    items: [['Warburg Pincus', '15.2%'], ['ChrysCapital', '8.5%'], ['Malabar Investments', '5.3%'], ['Other Institutions', '6.0%']],
    total: ['Total Institutional', '35.0%'],
    color: 'border-green-500'
  },
  {
    title: 'Other Shareholders',
    items: [['Employee ESOPs', '6.5%'], ['Retail Investors', '3.5%']],
    total: ['Total Public', '10.0%'],
    color: 'border-gray-400'
  }
];

const RISKS = [
  ['Competition Risk', 'Intense competition from global brands (Apple, Samsung) and Indian brands (Noise, Boult)'],
  ['Supply Chain Risk', 'Dependence on Chinese manufacturing; geopolitical tensions could impact supply'],
  ['Market Saturation', 'Audio wearables market showing signs of saturation in urban markets'],
  ['Regulatory Risk', 'Changing import duties and electronics regulations could impact costs'],
  ['Execution Risk', 'Successful execution of international expansion strategy is critical'],
  ['IPO Timing Risk', 'Expected IPO in 2024-25; market conditions could affect listing valuation']
];

const DOCUMENTS = [
  { name: 'Company Profile 2023', size: 'PDF • 4.2 MB', type: 'file' },
  { name: 'Financial Model', size: 'Excel • 3.8 MB', type: 'chart' },
  { name: 'Investor Presentation', size: 'PPT • 5.1 MB', type: 'trending' },
  { name: 'Research Report', size: 'PDF • 6.5 MB', type: 'text' }
];

const CompanyDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('overview');
  const [chartPeriod, setChartPeriod] = useState('1m');
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // --- Handlers ---
  const handleAction = (type: 'buy' | 'sell' | 'report' | 'doc', docName?: string) => {
    // if (type === 'buy') router.push(`/unlisted/buy-shares?company=${id}`);
    // else if (type === 'sell') router.push(`/unlisted/sell-shares?company=${id}`);
    // else if (type === 'report') alert(`Downloading comprehensive report for ${id || 'Boat'}...`);
    // else if (type === 'doc') alert(`Downloading: ${docName}`);
  };

  // --- Chart Logic ---
  useEffect(() => {
    if (!chartRef.current || activeTab !== 'overview') return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) chartInstance.current.destroy();

    const config = getChartConfig(chartPeriod);
    chartInstance.current = new Chart(ctx, config);

    return () => chartInstance.current?.destroy();
  }, [chartPeriod, activeTab]);

  // --- Sub-renderers ---
  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2076C7]" /> Price Performance
          </h2>
          <div className="flex flex-wrap gap-2">
            {['1m', '3m', '6m', '1y', 'all'].map(p => (
              <button
                key={p}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${chartPeriod === p ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setChartPeriod(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 md:h-80 text-gray-900"><canvas ref={chartRef}></canvas></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">{m.value}</div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#2076C7]" /> About the Company
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Boat (Imagine Marketing) is India's leading consumer electronics brand, specializing in audio products and wearables.
          Founded in 2016, the company holds a dominant market share in the true wireless earphones segment in India.
        </p>
      </div>
    </div>
  );

  const renderFinancials = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ChartBar className="w-5 h-5 text-[#2076C7]" /> Financial Performance</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
              <th className="py-3 px-4">Metric</th><th className="py-3 px-4">FY 2021</th><th className="py-3 px-4">FY 2022</th><th className="py-3 px-4">FY 2023</th><th className="py-3 px-4">Growth</th>
            </tr>
          </thead>
          <tbody>
            {FINANCIAL_ROWS.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{row[0]}</td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900">{row[1]}</td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900">{row[2]}</td>
                <td className="py-3 px-4 text-sm font-semibold text-[#2076C7]">{row[3]}</td>
                <td className={`py-3 px-4 text-sm font-semibold ${row[4].startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white pb-20 text-gray-900">
      
      <main className="container mx-auto px-4 py-8">
        {/* BACK BUTTON - Updated to match SellShares */}
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

        {/* Hero Header */}
        <header className="mb-12 text-center">
          {/* Icon Section */}
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <Building className="w-8 h-8" />
            </div>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Company Details
          </h1>

          {/* Gradient Divider Line */}
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

          {/* Subtitle / Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive insights and financial data
          </p>
        </header>

        {/* Brand Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl flex items-center justify-center text-white text-3xl font-bold">B</div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">Boat (Imagine Marketing) {id && <span className="text-sm text-gray-400">({id})</span>}</h1>
            <div className="text-gray-600">Consumer Electronics • 800+ Employees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">₹1,195</div>
            <div className="text-green-600 font-semibold flex items-center gap-1"><ArrowUp className="w-4 h-4" /> +1.25% Today</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === tab ? 'text-[#2076C7] border-[#2076C7]' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'financials' && renderFinancials()}
        {activeTab === 'shareholding' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {SHAREHOLDING_DATA.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{p.title}</h3>
                <div className="space-y-3">
                  {p.items.map(([name, val], idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                      <span className="text-gray-600">{name}</span><span className="font-semibold text-gray-900">{val}</span>
                    </div>
                  ))}
                  <div className={`pt-4 mt-4 border-t-2 ${p.color} flex justify-between font-bold text-sm text-gray-900`}>
                    <span>{p.total[0]}</span><span>{p.total[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'risks' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 animate-fade-in">
            <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Investment Risks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RISKS.map(([title, desc], i) => (
                <div key={i} className="p-4 rounded-xl border border-red-100 bg-red-50/50">
                  <h3 className="text-red-700 font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-gray-600 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-[#2076C7]" /> Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DOCUMENTS.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#2076C7] transition-all">
                  <div className="w-10 h-10 bg-[#2076C7] text-white rounded flex items-center justify-center">
                    {doc.type === 'file' ? <File size={18} /> : doc.type === 'chart' ? <ChartBar size={18} /> : <TrendingUp size={18} />}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="text-sm font-bold truncate text-gray-900">{doc.name}</div>
                    <div className="text-xs text-gray-400">{doc.size}</div>
                  </div>
                  <button onClick={() => handleAction('doc', doc.name)} className="text-[#2076C7]"><Download size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Actions */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <ActionButton onClick={() => handleAction('buy')} icon={<ShoppingCart size={20} />} label="Buy Now" color="from-[#2076C7] to-[#1CADA3]" />
          <ActionButton onClick={() => handleAction('sell')} icon={<IndianRupee size={20} />} label="Sell Now" color="from-green-600 to-green-500" />
          <ActionButton onClick={() => handleAction('report')} icon={<Download size={20} />} label="Download Report" color="from-[#2076C7] to-[#1CADA3]" />
        </div>
      </main>

      <style jsx>{`
        .animate-fade-in { animation: fade-in 0.3s ease; } 
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
};

// --- Helper Components & Functions ---

const ActionButton = ({ onClick, icon, label, color }: any) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 bg-gradient-to-r ${color} text-white font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-all flex items-center gap-2 shadow-lg`}>
    {icon} {label}
  </button>
);

function getChartConfig(period: string): ChartConfiguration {
  let days = period === '1m' ? 30 : period === '3m' ? 90 : period === '6m' ? 180 : period === '1y' ? 365 : 730;
  let multiplier = period === '1m' ? 1 : period === '3m' ? 1.5 : period === '6m' ? 2 : period === '1y' ? 3 : 5;

  const labels: string[] = [];
  const data: number[] = [];
  let price = 1150;

  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { month: 'short', day: days > 100 ? undefined : 'numeric', year: days > 365 ? '2-digit' : undefined }));
    price = Math.max(1100, Math.min(1300, price + (Math.random() - 0.48) * multiplier));
    data.push(price);
  }

  return {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Price',
        data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { color: '#374151', callback: (v) => '₹' + v } },
        x: { ticks: { color: '#374151', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 } }
      }
    }
  };
}

export default CompanyDetails;