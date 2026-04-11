"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Banknote, ShieldCheck, TrendingUp, PieChart, Home, Layers,
  ChevronRight, ArrowLeft,
  LucideIcon, Loader2
} from 'lucide-react';
import { AdminService } from '../../services/adminService';

// --- Types ---
interface Lead {
  id: number | string;
  lead_name?: string;
  name?: string; 
  email: string | null;
  contact_number?: string | null;
  phone?: string | null;
  created_at: string;
  department: string;
  sub_category: string;
  lead_status?: string;
  status?: string;
  sourceType: 'detailed' | 'referral'; // Added to differentiate
}

interface DeptConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  subcategories: { id: string; name: string }[];
}

const DEPARTMENTS: DeptConfig[] = [
  {
    id: 'Loan',
    label: 'Loan',
    icon: Banknote,
    subcategories: [
      { id: 'Home Loan', name: 'Home Loan' },
      { id: 'Business Loan', name: 'Business Loan' },
      { id: 'Personal Loan', name: 'Personal Loan' },
      { id: 'Mortgage Loan', name: 'Mortgage Loan' },
      { id: 'SME Loan', name: 'SME Loan' },
      { id: 'Education Loan', name: 'Education Loan' },
      { id: 'NRP Loan', name: 'NRP Loan' },
      { id: 'Vehicle Loan', name: 'Vehicle Loan' },
      { id: 'Loan Against Securities', name: 'Loan Against Securities' },
    ]
  },
  {
    id: 'Insurance',
    label: 'Insurance',
    icon: ShieldCheck,
    subcategories: [
      { id: 'Life Insurance', name: 'Life Insurance' },
      { id: 'Health Insurance', name: 'Health Insurance' },
      { id: 'Motor Insurance', name: 'Motor Insurance' },
      { id: 'Travel Insurance', name: 'Travel Insurance' },
      { id: 'Fire Insurance', name: 'Fire Insurance' },
      { id: 'Cattle Insurance', name: 'Cattle Insurance' },
      { id: 'Marine Insurance', name: 'Marine Insurance' },
      { id: 'Corporate Insurance', name: 'Corporate Insurance' },
      { id: 'Loan Protector', name: 'Loan Protector' },
    ]
  },
  { id: 'Mutual Funds', label: 'Mutual Funds', icon: TrendingUp, subcategories: [{ id: 'Mutual Funds', name: 'Mutual Fund' }] },
  { 
    id: 'Investment', label: 'Investments', icon: PieChart, 
    subcategories: [
      { id: 'Wealth Management', name: 'Wealth Management' },
      { id: 'PMS', name: 'PMS' },
      { id: 'AIF', name: 'AIF' },
      { id: 'Fixed Deposits', name: 'Fixed Deposits' },
      { id: 'Bonds', name: 'Bonds' },
    ]
  },
  { id: 'Real Estate', label: 'Real Estate', icon: Home, subcategories: [{ id: 'Real Estate', name: 'Real Estate' }] },
  { id: 'Unlisted', label: 'Unlisted', icon: Layers, subcategories: [{ id: 'Unlisted', name: 'Unlisted' }] },
];

export default function LeadsDashboard() {
  const [activeDeptId, setActiveDeptId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [resDetail, resReferral] = await Promise.all([
          AdminService.getAllDetailLeads({ limit: 1000 }),
          AdminService.getAllReferralLeads()
        ]);

        // Tag sources to differentiate
        const dLeads = (resDetail.detail_leads || []).map((l: any) => ({ ...l, sourceType: 'detailed' }));
        console.log("Detailed Leads Sample:", dLeads);
        const rLeads = (resReferral.referral_leads || resReferral.data || []).map((l: any) => ({ ...l, sourceType: 'referral' }));

        setAllLeads([...dLeads, ...rLeads]);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const getNormalizedDept = (deptName: string) => {
    const d = deptName?.trim();
    if (d === 'Loans') return 'Loan';
    if (d === 'Investments') return 'Investment';
    if (d === 'Mutual Fund') return 'Mutual Funds';
    return d;
  };

  // --- Dynamic Breakdown Counts ---
  const counts = useMemo(() => {
    const dept = {} as Record<string, { total: number, detailed: number, referral: number }>;
    const sub = {} as Record<string, { total: number, detailed: number, referral: number }>;

    allLeads.forEach(lead => {
      const d = getNormalizedDept(lead.department);
      const s = lead.sub_category;

      if (!dept[d]) dept[d] = { total: 0, detailed: 0, referral: 0 };
      if (!sub[s]) sub[s] = { total: 0, detailed: 0, referral: 0 };

      dept[d].total++;
      sub[s].total++;

      if (lead.sourceType === 'detailed') {
        dept[d].detailed++;
        sub[s].detailed++;
      } else {
        dept[d].referral++;
        sub[s].referral++;
      }
    });

    return { dept, sub };
  }, [allLeads]);

  const filteredTableLeads = useMemo(() => {
    return allLeads.filter(lead => 
      getNormalizedDept(lead.department) === activeDeptId && 
      lead.sub_category === activeSubId
    );
  }, [allLeads, activeDeptId, activeSubId]);

  const activeDept = useMemo(() => DEPARTMENTS.find(d => d.id === activeDeptId), [activeDeptId]);

  if (loading) return <div className="h-screen w-full flex items-center justify-center"><Loader2 className="animate-spin text-[#2076C7]" size={40} /></div>;

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          {activeDeptId && (
            <button onClick={() => { setActiveSubId(null); setActiveDeptId(null); }} className="flex items-center gap-2 text-[#1CADA3] hover:text-slate-900 transition-colors mb-4 text-sm font-medium">
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          )}
          <h1 className="text-3xl font-bold tracking-tight">Total Leads ({allLeads.length})</h1>
          <p className="text-slate-500 mt-1">Differentiated view: Detailed Leads vs Referral Leads.</p>
        </div>

        {/* DEPARTMENT CARDS */}
        {!activeDeptId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => {
              const dData = counts.dept[dept.id] || { total: 0, detailed: 0, referral: 0 };
              return (
                <div key={dept.id} onClick={() => setActiveDeptId(dept.id)} className="group cursor-pointer border border-slate-200 rounded-xl p-6 transition-all hover:shadow-md bg-white">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-lg bg-[#2076C7] text-white"><dept.icon size={20} /></div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-700" />
                  </div>
                  <div className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#2076C7] mb-1">{dept.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{dData.total}</p>
                    <div className="mt-2 flex gap-3 text-[10px] font-bold uppercase tracking-tight">
                        <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Detailed: {dData.detailed}</span>
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Referral: {dData.referral}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {activeDeptId && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Subcategory Grid */}
            <div className="flex flex-wrap gap-3">
              {activeDept?.subcategories.map((sub) => {
                const sData = counts.sub[sub.id] || { total: 0, detailed: 0, referral: 0 };
                return (
                  <button key={sub.id} onClick={() => setActiveSubId(sub.id)} className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${activeSubId === sub.id ? 'border-[#2076C7] bg-[#2076C7] text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'}`}>
                    {sub.name} <span className="ml-2 opacity-60">({sData.total})</span>
                  </button>
                );
              })}
            </div>

            {/* Table Area */}
            {activeSubId ? (
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm px-2">{activeSubId} Leads</h3>
                    <div className="flex gap-2 px-2 mt-1">
                        <span className="text-[10px] text-blue-600 font-semibold">Detailed: {counts.sub[activeSubId]?.detailed || 0}</span>
                        <span className="text-[10px] text-slate-300">|</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">Referral: {counts.sub[activeSubId]?.referral || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 bg-white">
                        <th className="px-6 py-4 font-semibold">Client Details</th>
                        <th className="px-6 py-4 font-semibold">Source</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredTableLeads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-sm">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-900">{lead.lead_name || lead.name}</div>
                            <div className="text-xs text-slate-500">{lead.email || lead.contact_number || lead.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${lead.sourceType === 'detailed' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {lead.sourceType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                                {lead.lead_status || lead.status || 'NEW'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-slate-300">Select a subcategory to view combined results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}