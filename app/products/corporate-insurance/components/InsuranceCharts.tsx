import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { RISK_DATA, TREND_DATA } from "./data";

interface InsuranceChartsProps {
  isMobile: boolean;
}

export const InsuranceCharts: React.FC<InsuranceChartsProps> = ({
  isMobile,
}) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative"
    >
      <div
        className="relative bg-white rounded-3xl p-8 md:p-12 border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl group"
        style={{
          boxShadow:
            "0 4px 20px rgba(32,118,199,0.05), 0 10px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Background Accent */}
        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1CADA3]/5 to-transparent rounded-bl-full pointer-events-none" /> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Why Corporate Insurance Matters
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal">
            Data-driven insights on why comprehensive coverage is crucial for
            business continuity in India.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* CHART 1: RISK DISTRIBUTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-[#1CADA3]/10 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-[#1CADA3]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                Top Business Risks in India
              </h3>
            </div>
            <div className="h-[240px] sm:h-[300px] w-full flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={RISK_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 45 : 70}
                    outerRadius={isMobile ? 75 : 110}
                    paddingAngle={4}
                    dataKey="value"
                    label={!isMobile}
                  >
                    {RISK_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />

                  {isMobile && (
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "10px",
                        lineHeight: "20px",
                      }}
                    />
                  )}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-slate-500 mt-6 pt-4 border-t border-slate-50">
              *Distribution of common claims faced by Indian enterprises. Cyber
              attacks now #1 risk.
            </p>
          </motion.div>

          {/* CHART 2: COST SAVINGS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-[#2076C7]/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#2076C7]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                Financial Impact (Liability Costs)
              </h3>
            </div>
            <div className="h-[300px] w-full flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={TREND_DATA}
                  margin={{
                    top: 10,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 0 : 10,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="colorUninsured"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#1CADA3" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1CADA3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorInsured"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#2076C7" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2076C7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    fontSize={isMobile ? 10 : 12}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    fontSize={isMobile ? 10 : 12}
                    tickLine={false}
                    axisLine={false}
                    width={isMobile ? 30 : 50}
                    tickFormatter={(value) => `₹${value}k`}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      border: "none",
                      fontSize: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="CostWithoutInsurance"
                    stroke="#1CADA3"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUninsured)"
                    name="Cost Without Insurance"
                  />
                  <Area
                    type="monotone"
                    dataKey="CostWithInsurance"
                    stroke="#2076C7"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorInsured)"
                    name="Cost With Insurance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-sm text-slate-500 mt-6 pt-4 border-t border-slate-50">
              *Projected accumulative costs of liability claims over 5 years
              (Indian market data).
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
