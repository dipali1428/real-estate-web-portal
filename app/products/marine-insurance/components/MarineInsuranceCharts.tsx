'use client';

import React from 'react';
import { BarChart2, Activity } from 'lucide-react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell,
    AreaChart, Area
} from 'recharts';

const radarData = [
    { subject: 'Transit Risk', cargo: 95, transit: 90, hull: 10, fullMark: 100 },
    { subject: 'Vessel Damage', cargo: 5, transit: 5, hull: 95, fullMark: 100 },
    { subject: 'Legal Liability', cargo: 20, transit: 10, hull: 90, fullMark: 100 },
    { subject: 'Port Risk', cargo: 80, transit: 15, hull: 85, fullMark: 100 },
    { subject: 'Theft / Pilferage', cargo: 90, transit: 85, hull: 5, fullMark: 100 },
    { subject: 'Natural Disasters', cargo: 85, transit: 80, hull: 90, fullMark: 100 },
];

const benchmarkData = [
    { name: 'Cargo Cover', features: 6, color: '#2076C7' },
    { name: 'Transit Cover', features: 4, color: '#1CADA3' },
    { name: 'Hull Insurance', features: 4, color: '#2076C7' },
];

const MarineInsuranceCharts = () => {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4 tracking-tight">
                        Visual Performance Analytics
                    </h2>
                    <p className="text-xl text-gray-500 font-bold max-w-2xl mx-auto">
                        In-depth visual breakdown to help you choose the right level of protection
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Coverage Distribution */}
                    <div className="bg-neutral-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#2076C7]">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Risk Coverage Distribution</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Protection Strength by Category</p>
                            </div>
                        </div>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={radarData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                    <defs>
                                        <linearGradient id="colorCargo" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2076C7" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2076C7" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorTransit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1CADA3" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1CADA3" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorHull" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2076C7" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2076C7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="subject"
                                        tick={{ fontSize: 9, fontWeight: 700, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                        angle={-45}
                                        textAnchor="end"
                                        interval={0}
                                    />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 700 }} />
                                    <Legend verticalAlign="top" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: '20px' }} />
                                    <Area type="monotone" dataKey="cargo" name="Cargo" stackId="1" stroke="#2076C7" fillOpacity={1} fill="url(#colorCargo)" />
                                    <Area type="monotone" dataKey="transit" name="Transit" stackId="1" stroke="#1CADA3" fillOpacity={1} fill="url(#colorTransit)" />
                                    <Area type="monotone" dataKey="hull" name="Hull" stackId="1" stroke="#2076C7" fillOpacity={1} fill="url(#colorHull)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Feature Benchmark */}
                    <div className="bg-neutral-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#1CADA3]">
                                <BarChart2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Core Feature Benchmark</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Comparing comprehensiveness of plans</p>
                            </div>
                        </div>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 700 }} />
                                    <Bar dataKey="features" radius={[10, 10, 10, 10]} barSize={40}>
                                        {benchmarkData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarineInsuranceCharts;
