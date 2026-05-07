"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Activity, 
  FileText, 
  Clock, 
  Search,
  PieChart as PieChartIcon,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip
} from "recharts";


export default function MyApplicationsPage() {
  const router = useRouter();

  // Mock data for impressive but zero-state charts
  const portfolioData = [
    { name: "Term Protection", value: 0, color: "#2076C7" },
    { name: "Child Future", value: 0, color: "#1CADA3" },
    { name: "Savings & Wealth", value: 0, color: "#FBBF24" },
    { name: "Retirement", value: 0, color: "#818CF8" },
    { name: "Combo Plans", value: 0, color: "#F472B6" },
    { name: "Health & Vitality", value: 0, color: "#34D399" },
  ];

  const premiumData = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: 0 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: 0 },
  ];

  return (
    <>
      {/* ─── Primary Analytics Section (CEO WOW) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
         
         {/* Coverage Analysis Pie */}
         <div className="lg:col-span-1 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-bl-full -z-10" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
               <PieChartIcon size={16} className="text-[#2076C7]" /> Coverage Matrix
            </h3>
            
            <div className="h-48 w-full relative mb-6">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData.every(d => d.value === 0) ? [{name: "Empty", value: 100, color: "#F1F5F9"}] : portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || "#F1F5F9"} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-slate-900 leading-none">0%</span>
                  <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase mt-1">Utilization</span>
               </div>
            </div>

            <div className="space-y-3">
               {portfolioData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{item.name}</span>
                     </div>
                     <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">₹0.00</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Premium Calendar Visualizer */}
         <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/30 rounded-bl-full -z-10" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-2">
               <TrendingUp size={16} className="text-[#1CADA3]" /> Premium Flow Analysis
            </h3>
            
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={premiumData}>
                    <XAxis 
                       dataKey="month" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }} 
                    />
                    <YAxis hide />
                    <Tooltip 
                       contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                       cursor={{ fill: '#F8FAFC', radius: 12 }}
                    />
                    <Bar 
                       dataKey="amount" 
                       fill="url(#colorPremium)" 
                       radius={[8, 8, 8, 8]}
                       maxBarSize={40}
                    />
                    <defs>
                      <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2076C7" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#1CADA3" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex items-center justify-between p-5 bg-slate-50/80 rounded-[2rem] border border-slate-100">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                     <AlertCircle className="text-yellow-500" size={18} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Upcoming Due</p>
                     <p className="text-xs font-black text-slate-900">None Scheduled</p>
                  </div>
               </div>
               <button className="text-[10px] font-black text-[#2076C7] uppercase tracking-widest hover:underline">Download Calendar</button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Active Application Timeline Tracker */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 flex flex-col h-full relative overflow-hidden group shadow-sm">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-0" />
           
           <div className="flex items-center justify-between mb-12 relative z-10">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <Activity size={20} className="text-[#1CADA3]" /> Live Application Phase
            </h3>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
               <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">N/A</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center mb-8 relative z-10">
            {/* Steps Container */}
            <div className="flex items-start justify-between w-full px-2 relative">
               <div className="absolute top-[32px] left-8 right-8 h-[2px] bg-slate-100 -z-10" />
              {[
                { step: "Submit", desc: "Digital App" },
                { step: "Medical", desc: "Vitals Check" },
                { step: "Admin", desc: "Verification" },
                { step: "Issued", desc: "Final Policy" }
              ].map((item, i) => (
                <div key={item.step} className="flex flex-col items-center w-20">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-sm font-black shadow-sm transition-all bg-slate-50 border border-slate-100 group-hover:scale-110 duration-500 text-slate-300">
                     <Clock size={20} strokeWidth={2.5} />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{item.step}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50/80 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-center text-center relative z-10">
             <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em]">No active tracking data available</p>
          </div>
        </div>

        {/* Global Policy Vault (Zero State) */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10 flex flex-col h-full relative overflow-hidden group">
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/40 rounded-tr-full -z-10" />
           <div className="flex items-center justify-between mb-12">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <FileText size={20} className="text-[#2076C7]" /> Document Intelligence
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100 relative group-hover:rotate-6 transition-transform">
                 <Search className="text-slate-300" size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-2 font-sans tracking-tight">Empty Repository</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest max-w-[280px]">Global policy documents & tax statements vault</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
             <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-center">
                <span className="block text-xl font-black text-slate-300">0</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Policies</span>
             </div>
             <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-center">
                <span className="block text-xl font-black text-slate-300">0</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">E-KYC</span>
             </div>
          </div>
        </div>

      </div>

    </>
  );
}