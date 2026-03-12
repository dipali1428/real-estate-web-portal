'use client';

import { useState, useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { motion} from 'framer-motion';
import { TrendingUp, ArrowUpRight, } from 'lucide-react';

const NCDYieldChart = () => {
    const [principal, setPrincipal] = useState(100000);
    const tenureYears = 5;

    // Data points for growth over time
    const growthData = useMemo(() => {
        const rates = {
            ncd: 0.11,     // 11% average for top NCDs
            fd: 0.07,      // 7% bank FD
            savings: 0.035 // 3.5% Savings account
        };

        const data = [];
        for (let year = 0; year <= tenureYears; year++) {
            data.push({
                year: `Year ${year}`,
                ncd: Math.round(principal * Math.pow(1 + rates.ncd, year)),
                fd: Math.round(principal * Math.pow(1 + rates.fd, year)),
                savings: Math.round(principal * Math.pow(1 + rates.savings, year)),
            });
        }
        return data;
    }, [principal]);

    const finalNcd = growthData[5].ncd;
    const finalFd = growthData[5].fd;
    const diff = finalNcd - finalFd;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-blue-50 animate-in fade-in zoom-in duration-300">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{label}</p>
                    <div className="space-y-3">
                        {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-sm font-bold text-slate-600">{entry.name.toUpperCase()}</span>
                                </div>
                                <span className="text-base font-black text-slate-900">
                                    ₹{entry.value.toLocaleString('en-IN')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="py-12 md:py-16 bg-white relative overflow-hidden font-sans" id="yield-comparison">
            {/* Premium Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-br from-[#2076C7]/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-linear-to-tr from-[#1CADA3]/5 to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2076C7]/5 border border-[#2076C7]/10 text-[#2076C7] text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <TrendingUp size={14} className="animate-pulse" />
                        Wealth Projection 2024-2029
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Compare Your Wealth Growth
                    </h2>

                    <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed">
                        Don't just save, grow. See how your investment compounds significantly better with secured NCDs compared to traditional banking.
                    </p>
                </div>

                <div className="flex flex-col xl:flex-row gap-10 items-stretch">
                    
                    {/* Interactive Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full xl:w-[380px] space-y-6"
                    >
                        <div className="bg-[#F8FBFE] p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-blue-50 shadow-sm relative overflow-hidden group">

                            
                            <h4 className="text-[10px] md:text-sm font-black text-[#2076C7] uppercase tracking-widest mb-6 flex items-center gap-2">
                                Invested Amount
                            </h4>
                            
                            <div className="relative mb-8">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-black text-slate-400">₹</span>
                                <input 
                                    suppressHydrationWarning={true}
                                    type="text" 
                                    readOnly
                                    value={principal.toLocaleString('en-IN')}
                                    className="w-full bg-transparent border-none text-3xl md:text-4xl font-black text-slate-800 focus:outline-none pl-6 md:pl-8"
                                />
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {[100000, 500000, 1000000].map((val) => (
                                    <button
                                        suppressHydrationWarning={true}
                                        key={val}
                                        onClick={() => setPrincipal(val)}
                                        className={`w-full py-3.5 md:py-4 px-6 rounded-xl md:rounded-2xl font-bold text-sm transition-all flex justify-between items-center ${
                                            principal === val 
                                            ? 'bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-xl shadow-blue-500/20' 
                                            : 'bg-white text-slate-600 hover:bg-white hover:shadow-md border border-slate-100'
                                        }`}
                                    >
                                        <span>₹{val.toLocaleString('en-IN')}</span>
                                        {principal === val ? <div className="w-2 h-2 rounded-full bg-white animate-ping" /> : null}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-[#2076C7] to-[#1CADA3] p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">The NCD Advantage</h4>
                            <p className="text-2xl md:text-3xl font-black mb-2">₹{diff.toLocaleString('en-IN')}</p>
                            <p className="text-xs md:text-sm font-bold opacity-90 leading-relaxed">
                                Extra gains in 5 years compared to a standard Bank FD.
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Chart Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 bg-white p-5 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] 
                                   shadow-[0_20px_50px_rgba(0,0,0,0.05)]
                                   hover:shadow-[0_40px_80px_rgba(32,118,199,0.12)]
                                   border border-slate-100 relative overflow-hidden flex flex-col 
                                   min-h-[500px] md:min-h-[600px]
                                   transition-all duration-700 hover:-translate-y-2"
                    >
                        {/* Light Mode Chart Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12 relative z-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-[#0B1C2E] mb-2 font-sans">Growth Trajectory</h3>
                                <p className="text-slate-400 font-medium text-xs md:text-sm">Compound Growth comparison over 5 years</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 md:gap-4">
                                <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-full border border-slate-100">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1CADA3]" />
                                    <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">NCD (11%)</span>
                                </div>
                                <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-full border border-slate-100">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#2076C7]" />
                                    <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">FD (7%)</span>
                                </div>
                                <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-full border border-slate-100">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-300" />
                                    <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Savings (3.5%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative z-10 w-full h-[320px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorNcd" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1CADA3" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#1CADA3" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorFd" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2076C7" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#2076C7" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis 
                                        dataKey="year" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
                                        dy={10}
                                        interval={0}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94A3B8', fontSize: 9, fontWeight: 700 }}
                                        tickFormatter={(val) => `${val/1000}k`}
                                        dx={-5}
                                        width={40}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    
                                    <Area 
                                        type="monotone" 
                                        dataKey="savings" 
                                        name="Savings"
                                        stroke="#94A3B8" 
                                        strokeWidth={2}
                                        fill="transparent" 
                                        strokeDasharray="5 5"
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="fd" 
                                        name="FD"
                                        stroke="#2076C7" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorFd)" 
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="ncd" 
                                        name="NCD"
                                        stroke="#1CADA3" 
                                        strokeWidth={4}
                                        fillOpacity={1} 
                                        fill="url(#colorNcd)" 
                                        animationDuration={2500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bottom Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 pt-6 md:pt-10 border-t border-slate-100 relative z-10">
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">NCD Maturity</p>
                                <p className="text-lg md:text-2xl font-black text-[#1CADA3]">₹{finalNcd.toLocaleString('en-IN')}</p>
                            </div>
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">FD Maturity</p>
                                <p className="text-lg md:text-2xl font-black text-slate-800">₹{finalFd.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Percentage Gain</p>
                                <div className="flex items-center gap-2">
                                    <ArrowUpRight className="text-[#1CADA3]" size={20} />
                                    <p className="text-xl md:text-2xl font-black text-[#1CADA3]">68.5% <span className="text-xs font-medium text-slate-400">Net Growth</span></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NCDYieldChart;
