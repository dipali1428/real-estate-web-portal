"use client";

import React, { useState, useMemo } from 'react';
import { 
  Banknote, ShieldCheck, TrendingUp, PieChart, Home, Layers,
  ChevronRight, ArrowLeft, Search, Filter, User, Mail, Phone, Calendar,
  LucideIcon
} from 'lucide-react';

// --- Types ---
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: 'New' | 'Contacted';
}

interface SubCategory {
  id: string;
  name: string;
  count: number;
}

interface DeptConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  subcategories: SubCategory[];
}

// --- Data Configuration ---
const DEPARTMENTS: DeptConfig[] = [
  {
    id: 'loan',
    label: 'Loan',
    icon: Banknote,
    subcategories: [
      { id: 'hl', name: 'Home Loan', count: 12 },
      { id: 'bl', name: 'Business Loan', count: 8 },
      { id: 'pl', name: 'Personal Loan', count: 15 },
      { id: 'ml', name: 'Mortgage Loan', count: 4 },
      { id: 'sme', name: 'SME Loan', count: 9 },
      { id: 'el', name: 'Education Loan', count: 6 },
      { id: 'nrp', name: 'NRP Loan', count: 3 },
      { id: 'las', name: 'Loan Against Securities', count: 7 },
    ]
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: ShieldCheck,
    subcategories: [
      { id: 'li', name: 'Life Insurance', count: 22 },
      { id: 'hi', name: 'Health Insurance', count: 31 },
      { id: 'mi', name: 'Motor Insurance', count: 18 },
      { id: 'ti', name: 'Travel Insurance', count: 5 },
      { id: 'fi', name: 'Fire Insurance', count: 2 },
      { id: 'ci', name: 'Cattle Insurance', count: 1 },
      { id: 'mari', name: 'Marine Insurance', count: 2 },
      { id: 'corp', name: 'Corporate Insurance', count: 11 },
    ]
  },
  { id: 'mf', label: 'Mutual Funds', icon: TrendingUp, subcategories: [{ id: 'mf1', name: 'Mutual Fund', count: 84 }] },
  { 
    id: 'inv', label: 'Investments', icon: PieChart, 
    subcategories: [
      { id: 'wm', name: 'Wealth Management', count: 14 },
      { id: 'pms', name: 'PMS/AIF', count: 6 },
      { id: 'fd', name: 'Fixed Deposits', count: 28 },
      { id: 'bd', name: 'Bonds', count: 12 },
    ]
  },
  { id: 're', label: 'Real Estate', icon: Home, subcategories: [{ id: 're1', name: 'Real Estate', count: 45 }] },
  { id: 'un', label: 'Unlisted', icon: Layers, subcategories: [{ id: 'un1', name: 'Unlisted', count: 19 }] },
];

export default function LeadsDashboard() {
  const [activeDeptId, setActiveDeptId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  // --- Derived State ---
  const activeDept = useMemo(() => DEPARTMENTS.find(d => d.id === activeDeptId), [activeDeptId]);
  const activeSub = useMemo(() => activeDept?.subcategories.find(s => s.id === activeSubId), [activeDept, activeSubId]);

  // Transform departments into the requested Stat Card structure
  const statCards = DEPARTMENTS.map(dept => {
    const totalLeads = dept.subcategories.reduce((acc, curr) => acc + curr.count, 0);
    return {
      id: dept.id,
      label: dept.label,
      value: totalLeads,
      icon: dept.icon,
      // Minimalist Monochrome Theme
      color: 'bg-[#2076C7]', 
      textColor: 'text-[#2076C7]',
      bgColor: 'bg-white'
    };
  });

  // Mock Table Data
  const leads: Lead[] = [
    { id: '1', name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", date: "2023-12-20", status: "New" },
    { id: '2', name: "Anita Desai", email: "anita@example.com", phone: "+91 98221 11002", date: "2023-12-19", status: "Contacted" },
    { id: '3', name: "Vikram Singh", email: "vikram@example.com", phone: "+91 99002 22334", date: "2023-12-18", status: "New" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          {activeDeptId ? (
            <button 
              onClick={() => { setActiveSubId(null); setActiveDeptId(null); }}
              className="flex items-center gap-2 text-[#1CADA3] hover:text-slate-900 transition-colors mb-4 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          ) : null}
          <h1 className="text-3xl font-bold tracking-tight"> Total Leads </h1>
          <p className="text-slate-500 mt-1">Manage and track all leads across departments.</p>
        </div>

            {/* SECTION 1: DEPARTMENT CARDS */}
            {!activeDeptId && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {statCards.map((card) => (
                <div
                    key={card.id}
                    onClick={() => setActiveDeptId(card.id)}
                    className={`group cursor-pointer border border-slate-200 rounded-xl p-5 md:p-6 transition-all duration-200 
                    hover:shadow-md hover:border-slate-300 hover:scale-[1.02] active:scale-[0.99]
                    ${card.bgColor}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveDeptId(card.id)}
                    aria-label={`View ${card.label} department details`}
                >
                    <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-lg ${card.color} text-white shadow-sm`}>
                        <card.icon size={20} />
                    </div>
                    <ChevronRight 
                        size={18} 
                        className="text-slate-300 group-hover:text-slate-700 transition-colors duration-200"
                    />
                    </div>
                    
                    <div className="mt-4 md:mt-5">
                    <p className={`text-xs md:text-sm font-medium uppercase tracking-wider ${card.textColor} mb-1`}>
                        {card.label}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-slate-900">
                        {card.value}
                    </p>
                    </div>
                    
                    {/* Subtle hover indicator */}
                    <div className="h-0.5 w-0 group-hover:w-full bg-slate-300 transition-all duration-300 mt-4"></div>
                </div>
                ))}
            </div>
            )}
        
          {/* /* SECTION 2 & 3: SUBCATEGORIES & TABLE */ }
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Subcategory Grid */}
            <div className="flex flex-wrap gap-3">
              {activeDept?.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubId(sub.id)}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    activeSubId === sub.id
                    ? 'border-[#2076C7] bg-[#2076C7] text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {sub.name} <span className={`ml-2 opacity-60`}>({sub.count})</span>
                </button>
              ))}
            </div>

            {/* Table Area */}
            {activeSubId ? (
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-sm px-2">
                    {activeSub?.name} Leads
                  </h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input 
                        type="text" 
                        placeholder="Search leads..." 
                        className="pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none w-48"
                      />
                    </div>
                    <button className="flex items-center gap-2 text-xs border border-slate-200 px-3 py-1.5 rounded-md bg-white font-medium">
                      <Filter size={14} /> Filter
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 bg-white">
                        <th className="px-6 py-4 font-semibold">Client Details</th>
                        <th className="px-6 py-4 font-semibold">Contact Info</th>
                        <th className="px-6 py-4 font-semibold">Reg. Date</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                {lead.name.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-slate-900">{lead.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Mail size={12} /> {lead.email}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Phone size={12} /> {lead.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                              <Calendar size={12} /> {lead.date}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                              lead.status === 'New' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed border-slate-100 rounded-xl flex flex-center items-center justify-center">
                <p className="text-slate-300 font-medium">Please select a subcategory to view lead details</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}