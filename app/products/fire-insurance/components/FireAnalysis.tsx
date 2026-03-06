"use client";

import React from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { ShieldAlert, TrendingUp, Activity, Zap } from 'lucide-react';

const FATALITY_DATA = [
    { name: 'Residential', value: 54.2, color: '#2076C7' },
    { name: 'Commercial', value: 3.5, color: '#1CADA3' },
    { name: 'Factories', value: 2.6, color: '#4F46E5' },
    { name: 'Vehicles', value: 2.1, color: '#0EA5E9' },
    { name: 'Others', value: 37.6, color: '#94A3B8' },
];

const CAUSE_DATA = [
    { name: 'Short Circuit', value: 45, full: 100 },
    { name: 'Negligence', value: 22, full: 100 },
    { name: 'Gas Leak', value: 15, full: 100 },
    { name: 'Environmental', value: 10, full: 100 },
    { name: 'Others', value: 8, full: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 border border-gray-100 shadow-2xl rounded-2xl font-sans">
                <p className="font-black text-gray-900 mb-1">{payload[0].name}</p>
                <p className="text-[#2076C7] font-bold">{`${payload[0].value}% of Incidents`}</p>
            </div>
        );
    }
    return null;
};

export default function FireAnalysis() {
    return (
       <section className="py-16 md:py-24 bg-white font-sans flex justify-center overflow-hidden">
  <div className="w-full max-w-7xl px-6">

    {/* Heading */}
    <div className="text-center mb-16 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1CADA3] text-white text-xs font-bold mb-6 uppercase tracking-wider shadow-sm shadow-[#1CADA3]/20">
        <ShieldAlert size={16} /> Data-Driven Risk Analysis
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
        Understanding Fire Risks <br className="hidden md:block" /> in Modern India
      </h2>

      <p className="text-gray-600 font-medium max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
        Market data (NCRB 2023) highlights that over 50% of fire fatalities occur in residential buildings, with electrical short circuits being the leading cause.
      </p>
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 place-items-center">

      {/* Pie Chart Card */}
      <div className="w-full max-w-xl bg-gray-50/60 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#2076C7] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Activity size={22} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#2076C7] uppercase tracking-tight">
              Fatality by Location
            </h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              NCRB 2023 Dataset
            </p>
          </div>
        </div>

        <div className="h-[260px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={FATALITY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {FATALITY_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span className="text-gray-600 font-bold text-xs uppercase">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Card */}
      <div className="w-full max-w-xl bg-gray-50/60 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#1CADA3] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap size={22} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Primary Causes
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              India Market Trends
            </p>
          </div>
        </div>

        <div className="h-[260px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={CAUSE_DATA}
              margin={{ left: 10, right: 20 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 700 }}
                width={100}
              />
              <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#1CADA3"
                radius={[0, 10, 10, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>

    {/* Final Callout */}
    <div className="mt-12 flex justify-center">
      <div className="w-full max-w-4xl p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 border border-blue-50 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-md flex items-center justify-center text-[#2076C7] shrink-0">
          <TrendingUp size={26} />
        </div>

        <div>
          <p className="text-[#2076C7] font-bold text-lg mb-1">
            70% of businesses fail to reopen after a major fire without insurance.
          </p>
          <p className="text-gray-600 font-medium text-sm italic">
            Don't let your hard-earned progress turn into ashes. Secure your legacy today.
          </p>
        </div>

      </div>
    </div>

  </div>
</section>
    );
}
