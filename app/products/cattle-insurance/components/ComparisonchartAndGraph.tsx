'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconX, IconInfoCircle, IconTerminal2, IconChartLine, IconTrendingUp } from '@tabler/icons-react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';

// ─── Comparison Table Data ───────────────────────────────────────────────────

const comparisonData = [
    { animal: 'Cow', maxCover: '₹50,000', premium: '₹400 - ₹1,200', accident: true, disease: true, waiting: '15 Days', bestFor: 'Dairy Farmers' },
    { animal: 'Buffalo', maxCover: '₹60,000', premium: '₹465 - ₹1,500', accident: true, disease: true, waiting: '15 Days', bestFor: 'High Yield Dairy' },
    { animal: 'Bullock', maxCover: '₹60,000', premium: '₹300 - ₹500', accident: true, disease: true, waiting: '15 Days', bestFor: 'Ploughing/Draft' },
    { animal: 'Goat/Sheep', maxCover: '₹10,000', premium: '₹25 - ₹100', accident: true, disease: true, waiting: '30 Days', bestFor: 'Small Herds' },
    { animal: 'Pig', maxCover: '₹10,000', premium: '₹50 - ₹200', accident: true, disease: true, waiting: '15 Days', bestFor: 'Commercial Farming' },
    { animal: 'Horse/Mule', maxCover: '₹50,000', premium: '₹300 - ₹1,000', accident: true, disease: true, waiting: '15 Days', bestFor: 'Transportation' },
];

// ─── Graph Data ───────────────────────────────────────────────────────────────

const graphData = [
    { name: 'Cow', coverage: 50000, premium: 800, color: '#2076C7' },
    { name: 'Buffalo', coverage: 60000, premium: 950, color: '#1CADA3' },
    { name: 'Bullock', coverage: 60000, premium: 400, color: '#4F46E5' },
    { name: 'Goat/Sheep', coverage: 10000, premium: 60, color: '#e03d8eff' },
    { name: 'Pig', coverage: 10000, premium: 125, color: '#F59E0B' },
    { name: 'Horse/Mule', coverage: 50000, premium: 650, color: '#6366F1' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 min-w-[180px]">
                <p className="text-slate-800 font-black text-sm mb-3 border-b border-slate-50 pb-2">{label}</p>
                <div className="space-y-2">
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Max Coverage</span>
                        <span className="text-blue-600 font-black text-sm">₹{payload[0]?.value?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Premium</span>
                        <span className="text-teal-500 font-black text-sm">₹{payload[1]?.value?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const formatCoverage = (value: number) => {
    if (value >= 1000) return `${value / 1000}k`;
    return `${value}`;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComparisonchartAndGraph() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            {/* ── Comparison Table Section ─────────────────────────────── */}
            <section className="py-12 bg-[#fafcfe] relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block underline decoration-teal-400 decoration-4 underline-offset-8">Side-by-Side</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Plan Comparison Table
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed">
                            Easily compare the coverage limits and benefits across different livestock categories to find the perfect plan.
                        </p>
                    </motion.div>

                    <div className="relative overflow-x-auto rounded-[2rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] bg-white/50 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-50/50">
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50">Animal Category</th>
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50 text-center">Max Cover</th>
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50 text-center">Premium (Est.)</th>
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50 text-center">Accident</th>
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50 text-center">Disease</th>
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50 text-center">Wait Period</th>
                                    <th className="p-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100/50">Recommended For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <motion.tr
                                        key={row.animal}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className={`group transition-colors hover:bg-blue-50/30 ${i !== comparisonData.length - 1 ? 'border-b border-slate-50' : ''}`}
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-linear-to-b from-[#2076C7] to-[#1CADA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="font-black text-slate-800 text-base tracking-tight">{row.animal}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-black border border-blue-100 shadow-sm">
                                                {row.maxCover}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-slate-700 font-black text-sm">{row.premium}</span>
                                            <span className="text-[10px] text-slate-400 block font-bold">/year</span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                {row.accident ? (
                                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100 text-teal-600">
                                                        <IconCheck size={18} strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-100 text-red-600">
                                                        <IconX size={18} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                {row.disease ? (
                                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100 text-teal-600">
                                                        <IconCheck size={18} strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-100 text-red-600">
                                                        <IconX size={18} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-[11px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                                {row.waiting}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs italic">
                                                <IconTerminal2 size={14} className="text-secondary-teal" />
                                                {row.bestFor}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                            <IconInfoCircle size={16} className="text-blue-500" />
                            <span>* Premium rates are indicative and subject to animal age &amp; health</span>
                        </div>
                        <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
                            <IconCheck size={16} className="text-teal-500" />
                            <span>Direct Bank Settlement Enabled</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Graph Section ─────────────────────────────────────────── */}
            <section className="py-12 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                <IconChartLine size={14} />
                                Value Visualization
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm leading-tight">
                                Coverage vs. Premium Insights
                            </h2>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                See how our plans maximize your protection while keeping costs predictable. Buffalo and Cattle plans offer the highest coverage limits with competitive government-subsidized rates.
                            </p>
                            <div className="pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                        <IconTrendingUp size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-800">High Coverage Ratio</div>
                                        <div className="text-xs text-slate-400 font-bold">Industry leading sum insured limits.</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-2 bg-white rounded-[2.5rem] p-4 md:p-8 shadow-[0_32px_64px_-16px_rgba(32,118,199,0.08)] border border-slate-50 overflow-hidden"
                            style={{ height: isMobile ? '320px' : '400px' }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={graphData}
                                    margin={{
                                        top: 20,
                                        right: isMobile ? 30 : 20,
                                        bottom: isMobile ? 10 : 20,
                                        left: isMobile ? -10 : 10,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: isMobile ? 8 : 10, fontWeight: 700 }}
                                        dy={10}
                                        interval={0}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: isMobile ? 8 : 10, fontWeight: 700 }}
                                        tickFormatter={formatCoverage}
                                        width={isMobile ? 38 : 50}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: isMobile ? 8 : 10, fontWeight: 700 }}
                                        width={isMobile ? 32 : 40}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                                    <Legend
                                        verticalAlign="top"
                                        align="right"
                                        wrapperStyle={{
                                            paddingBottom: isMobile ? '16px' : '30px',
                                            fontSize: isMobile ? '8px' : '10px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                        }}
                                    />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="coverage"
                                        name="Max Coverage (₹)"
                                        radius={[6, 6, 0, 0]}
                                        barSize={isMobile ? 18 : 36}
                                    >
                                        {graphData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
                                        ))}
                                    </Bar>
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="premium"
                                        name="Avg Premium (₹)"
                                        stroke="#1CADA3"
                                        strokeWidth={isMobile ? 2 : 4}
                                        dot={{ r: isMobile ? 4 : 6, fill: '#1CADA3', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: isMobile ? 6 : 8, strokeWidth: 0 }}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
