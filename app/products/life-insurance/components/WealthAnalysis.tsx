"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';
import {
  TrendingUp, AlertCircle
} from "lucide-react";

const premiumData = [
  { age: 25, premium: 12500, label: "25 Yrs" },
  { age: 30, premium: 15800, label: "30 Yrs" },
  { age: 35, premium: 22400, label: "35 Yrs" },
  { age: 40, premium: 34500, label: "40 Yrs" },
  { age: 45, premium: 52000, label: "45 Yrs" },
  { age: 50, premium: 85000, label: "50 Yrs" },
];

const wealthData = [
  { year: 0, lifeInsurance: 0, traditional: 0 },
  { year: 5, lifeInsurance: 800000, traditional: 650000 },
  { year: 10, lifeInsurance: 2200000, traditional: 1400000 },
  { year: 15, lifeInsurance: 4500000, traditional: 2500000 },
  { year: 20, lifeInsurance: 8200000, traditional: 4200000 },
  { year: 25, lifeInsurance: 14500000, traditional: 6800000 },
];

const WealthAnalysis = () => {
  const [activeTab, setActiveTab] = useState('cost'); // 'cost' or 'wealth'
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <section
      className="py-16 md:py-24 bg-neutral-100 relative overflow-hidden text-gray-700 font-sans"
      id="analysis"
    >
      <div className="container-custom px-6 md:px-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left mx-auto lg:mx-0">

            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#1CADA3] font-black uppercase text-xs md:text-sm tracking-[0.4em] mb-4 block"
              >
                DATA-DRIVEN AUDIT
              </motion.span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6">
                Visualizing the Impact of Delay
              </h2>

              <p className="font-sans text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Don&apos;t just take our word for it. Analyze the numbers and see how time
                affects your premium costs and long-term wealth growth.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex p-1.5 bg-white rounded-full border border-gray-100 max-w-sm mx-auto lg:mx-0 shadow-sm">
              <button
                onClick={() => setActiveTab("cost")}
                className={`flex-1 py-3 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === "cost"
                  ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                Cost of Delay
              </button>
              <button
                onClick={() => setActiveTab("wealth")}
                className={`flex-1 py-3 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === "wealth"
                  ? "bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                Wealth Growth
              </button>
            </div>

            {/* Info Card */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                {activeTab === "cost" ? (
                  <motion.div
                    key="cost-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 bg-[#2076C7]/5 rounded-3xl border border-[#2076C7]/10 flex gap-5 text-left"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#2076C7] shrink-0">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2076C7] uppercase tracking-widest mb-1">
                        Audit Insight
                      </h4>
                      <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">
                        Starting at 25 vs 35 can save you up to{" "}
                        <span className="font-sans text-[#2076C7] font-bold">
                          ₹4.2 Lakhs
                        </span>
                        .
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wealth-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 bg-[#1CADA3]/5 rounded-3xl border border-[#1CADA3]/10 flex gap-5 text-left"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#1CADA3] shrink-0">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#2076C7] uppercase tracking-widest mb-1">
                        Multiplier Effect
                      </h4>
                      <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">
                        Tax-free compounding beats traditional FDs by over{" "}
                        <span className="font-sans text-[#1CADA3] font-black">2.1x</span>.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT CHART */}
          <div className="w-full lg:w-7/12">
            <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl relative">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === "cost" ? (
                  <AreaChart data={premiumData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      label={{ value: 'Entry Age', position: 'insideBottom', offset: -10, fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#cbd5e1' }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                      label={{ value: 'Annual Premium', angle: -90, position: 'insideLeft', fontSize: 10, fontWeight: 900, fill: '#64748b', offset: 0 }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      formatter={(value: any) => [`₹${value.toLocaleString()}`, "Premium"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="premium"
                      stroke="#2076C7"
                      strokeWidth={3}
                      fillOpacity={0.2}
                      fill="#2076C7"
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={wealthData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      label={{ value: 'Years of Investment', position: 'insideBottom', offset: -10, fontSize: 10, fontWeight: 900, fill: '#64748b' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#cbd5e1' }}
                      tickFormatter={(value) => value >= 10000000 ? `${(value / 10000000).toFixed(1)}Cr` : `${(value / 100000).toFixed(0)}L`}
                      label={{ value: 'Corpus Value', angle: -90, position: 'insideLeft', fontSize: 10, fontWeight: 900, fill: '#64748b', offset: -10 }}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      formatter={(value: any) => [`₹${value.toLocaleString()}`, "Value"]}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                    />
                    <Line
                      name="Life Insurance (ULIP/Savings)"
                      type="monotone"
                      dataKey="lifeInsurance"
                      stroke="#1CADA3"
                      strokeWidth={4}
                      dot={false}
                    />
                    <Line
                      name="Traditional FD/Savings"
                      type="monotone"
                      dataKey="traditional"
                      stroke="#CBD5E1"
                      strokeWidth={3}
                      strokeDasharray="6 6"
                      dot={false}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WealthAnalysis;
