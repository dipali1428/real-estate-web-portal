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
    Cell
} from "recharts";
import { bondsData } from "../data/bondsData";
import { motion } from "framer-motion";
import { Percent, Award } from "lucide-react";

/* ✅ MOVE OUTSIDE */
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <p className="text-sm font-bold text-gray-800 mb-1">
                    {data.fullName}
                </p>

                <div className="flex items-center gap-2">
                    <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            data.isBenchmark
                                ? "bg-orange-50 text-orange-600"
                                : "bg-blue-50 text-blue-600"
                        }`}
                    >
                        {data.rating}
                    </span>
                </div>

                <p
                    className={`text-lg font-black mt-2 ${
                        data.isBenchmark
                            ? "text-orange-500"
                            : "text-[#2076C7]"
                    }`}
                >
                    {payload[0].value}%{" "}
                    <span className="text-xs font-normal text-gray-500">
                        Yield
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default function YieldChart() {
    const chartData = useMemo(() => {
        const topBonds = [...bondsData]
            .sort((a, b) => parseFloat(b.yield) - parseFloat(a.yield))
            .slice(0, 5)
            .map((bond) => ({
                name: bond.company.split(" ")[0],
                fullName: bond.company,
                yield: parseFloat(bond.yield.replace("%", "")),
                rating: bond.rating,
                isBenchmark: false,
            }));

        topBonds.push({
            name: "Fixed Deposit",
            fullName: "Average Fixed Deposit",
            yield: 7.0,
            rating: "Low Risk",
            isBenchmark: true,
        });

        return topBonds;
    }, []);

    const maxYield = Math.max(...chartData.map((d) => d.yield));
    const avgYield = (
        chartData.reduce((acc, curr) => acc + curr.yield, 0) /
        chartData.length
    ).toFixed(2);

    return (
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-extrabold mb-6">
                                Maximize Your Returns
                            </h2>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl">
                                    <Percent size={20} />
                                    <p>{avgYield}%</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl">
                                    <Award size={20} />
                                    <p>{maxYield}%</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CHART */}
                    <div className="flex-1 w-full bg-white p-6 rounded-3xl">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        tickFormatter={(v) => `${v}%`}
                                        domain={[0, 12]}
                                    />

                                    {/* ✅ FIXED */}
                                    <Tooltip
                                        cursor={{ fill: "transparent" }}
                                        content={<CustomTooltip />}
                                    />

                                    <Bar dataKey="yield">
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={
                                                    entry.isBenchmark
                                                        ? "#FB923C"
                                                        : "#2076C7"
                                                }
                                            />
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
}