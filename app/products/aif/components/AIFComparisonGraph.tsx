'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
    { name: "360 ONE Defense", score: 92, cat: "II", color: "#2076C7" },
    { name: "Axis New Opp", score: 88, cat: "II", color: "#2076C7" },
    { name: "Abakkus 428", score: 94, cat: "II", color: "#2076C7" },
    { name: "India Discovery II", score: 91, cat: "I", color: "#1CADA3" },
    { name: "Equirus InnovateX", score: 89, cat: "I", color: "#1CADA3" },
    { name: "Getfive Opp Fund", score: 87, cat: "I", color: "#1CADA3" },
    { name: "Edelweiss Alpha", score: 86, cat: "III", color: "#8b5cf6" },
    { name: "Kotak Long-Short", score: 85, cat: "III", color: "#8b5cf6" },
    { name: "ICICI Pru L/S", score: 84, cat: "III", color: "#8b5cf6" },
    { name: "IIFL Long-Short", score: 85, cat: "III", color: "#8b5cf6" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 shadow-2xl border border-white/50 rounded-2xl max-w-[280px]">
                <p className="font-extrabold text-gray-900 mb-1 text-sm whitespace-normal">{label}</p>
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase tracking-wider">
                        {payload[0].payload.cat}
                    </span>
                </div>
                <div className="h-px bg-gray-100 w-full mb-3" />
                <div className="flex items-center justify-between gap-8">
                    <span className="text-xs font-medium text-gray-500">Alpha Score</span>
                    <span className="font-black text-gray-900" style={{ color: payload[0].payload.color }}>
                        {payload[0].value}%
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const AIFComparisonGraph = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.005 }}
            viewport={{ once: true }}
            className="w-full bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 shadow-2xl mb-16 relative overflow-hidden group transition-shadow hover:shadow-primary/5"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 sm:opacity-100 group-hover:bg-primary/10 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/5 rounded-full -ml-24 -mb-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <motion.div
                        animate={{
                            y: [0, -5, 0],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/10 to-teal-400/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary shadow-inner border border-white group-hover:shadow-lg group-hover:scale-110 transition-all duration-500"
                    >
                        <BarChart3 size={isMobile ? 24 : 28} />
                    </motion.div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors duration-300">AIF Funds Comparison</h3>
                        <p className="text-gray-400 sm:text-gray-500 text-xs sm:text-sm font-medium">Compare top-performing Alternative Investment Funds.</p>
                    </div>
                </div>
            </div>

            <div className={`${isMobile ? 'h-[500px]' : 'h-[600px]'} w-full relative z-10`}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: isMobile ? 40 : 20,
                            right: isMobile ? 50 : 80,
                            left: isMobile ? 10 : 160,
                            bottom: 20
                        }}
                        barSize={isMobile ? 24 : 32}
                    >
                        <defs>
                            <linearGradient id="colorCatI" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="5%" stopColor="#1CADA3" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#1CADA3" stopOpacity={0.4} />
                            </linearGradient>
                            <linearGradient id="colorCatII" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="5%" stopColor="#2076C7" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#2076C7" stopOpacity={0.4} />
                            </linearGradient>
                            <linearGradient id="colorCatIII" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" strokeWidth={1} />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            hide
                            domain={[0, 100]}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            hide={isMobile}
                            tick={{
                                fill: '#64748b',
                                fontSize: 11,
                                fontWeight: 700
                            }}
                            width={150}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 10 }} />
                        <Bar
                            dataKey="score"
                            radius={[0, 10, 10, 0]}
                            animationDuration={2000}
                            className="transition-all duration-300"
                        >
                            {data.map((entry, index) => {
                                let fill = "url(#colorCatII)";
                                if (entry.cat === "I") fill = "url(#colorCatI)";
                                if (entry.cat === "III") fill = "url(#colorCatIII)";
                                return <Cell key={`cell-${index}`} fill={fill} />;
                            })}
                            {isMobile && (
                                <LabelList
                                    dataKey="name"
                                    position="top"
                                    offset={8}
                                    style={{
                                        fill: '#475569',
                                        fontSize: 10,
                                        fontWeight: 800,
                                        fontFamily: 'sans-serif'
                                    }}
                                />
                            )}
                            <LabelList
                                dataKey="score"
                                position="right"
                                formatter={(value: any) => value ? `${value}%` : ''}
                                style={{
                                    fill: '#1e293b',
                                    fontSize: isMobile ? 10 : 12,
                                    fontWeight: 900,
                                    fontFamily: 'sans-serif'
                                }}
                                offset={isMobile ? 8 : 12}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 border-t border-slate-50 pt-8 sm:pt-10">
                {[
                    { label: "Cat I (VC/SME)", color: "#1CADA3" },
                    { label: "Cat II (Growth/PE)", color: "#2076C7" },
                    { label: "Cat III (L/S)", color: "#8b5cf6" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition-colors group">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg transition-transform group-hover:scale-125" style={{ background: item.color }} />
                        <span className="text-[9px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider sm:tracking-[0.15em] shrink-0">{item.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default AIFComparisonGraph;
