"use client";

import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
    Label
} from "recharts";
import { bondsData } from "../data/bondsData";
import { motion } from "framer-motion";
import { Percent, Award, TrendingUp } from "lucide-react";

export default function YieldChart() {
    // Process data: Sort by yield descending and take top 5 diverse ones + FD Benchmark
    const chartData = useMemo(() => {
        const topBonds = [...bondsData]
            .sort((a, b) => parseFloat(b.yield) - parseFloat(a.yield))
            .slice(0, 5) // Top 5
            .map(bond => ({
                name: bond.company.split(' ')[0], // Short name
                fullName: bond.company,
                yield: parseFloat(bond.yield.replace("%", "")),
                rating: bond.rating,
                isBenchmark: false
            }));

        // Add Benchmark
        topBonds.push({
            name: "Fixed Deposit",
            fullName: "Average Fixed Deposit",
            yield: 7.00,
            rating: "Low Risk",
            isBenchmark: true
        });

        return topBonds;
    }, []);

    const maxYield = Math.max(...chartData.map(d => d.yield));
    const avgYield = (chartData.reduce((acc, curr) => acc + curr.yield, 0) / chartData.length).toFixed(2);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                    <p className="text-sm font-bold text-gray-800 mb-1">{data.fullName}</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${data.isBenchmark ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                            {data.rating}
                        </span>
                    </div>
                    <p className={`text-lg font-black mt-2 ${data.isBenchmark ? 'text-orange-500' : 'text-[#2076C7]'}`}>
                        {payload[0].value}% <span className="text-xs font-normal text-gray-500">Yield</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <div className="flex-1 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2076C7] text-sm font-semibold mb-6">
                                <TrendingUp size={16} />
                                <span>High Returns, Low Risk</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] mb-6 leading-tight">
                                Maximize Your Returns with High-Yield Bonds
                            </h2>
                            <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-xl">
                                outperform traditional fixed deposits and savings accounts. Our curated high-yield bonds offer superior returns without compromising on safety tailored for your portfolio growth.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-50 rounded-lg text-[#2076C7]">
                                            <Percent size={20} />
                                        </div>
                                        <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Avg. Yield</span>
                                    </div>
                                    <p className="text-3xl font-black text-gray-800">{avgYield}%</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-teal-50 rounded-lg text-[#1CADA3]">
                                            <Award size={20} />
                                        </div>
                                        <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Top Yield</span>
                                    </div>
                                    <p className="text-3xl font-black text-gray-800">{maxYield}%</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 w-full bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                                    barSize={45}
                                >
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2076C7" />
                                            <stop offset="100%" stopColor="#1CADA3" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                        tickFormatter={(value) => `${value}%`}
                                        domain={[0, 12]}
                                    />
                                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="yield"
                                        radius={[8, 8, 8, 8]}
                                        animationDuration={1500}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.isBenchmark ? "#FB923C" : "url(#barGradient)"}
                                                className="hover:opacity-80 transition-opacity cursor-pointer"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend/Caption */}
                        <div className="absolute top-6 right-8 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"></div>
                                <span className="text-xs font-semibold text-gray-500">Corporate Bonds</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                <span className="text-xs font-semibold text-gray-500">Fixed Deposit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
