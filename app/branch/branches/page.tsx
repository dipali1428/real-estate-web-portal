'use client';

import React, { useState, useEffect } from 'react';
import {  Mail, Calendar,
  FileText, ClipboardList, Loader2,
  Phone, ArrowLeft, ChevronRight, UserCheck, Briefcase,
} from 'lucide-react';
import { BranchService } from '../../services/branchService';
import { toast } from 'react-hot-toast';

export default function BranchDsaManagement() {
  const [view, setView] = useState<'dsa-list' | 'dsa-detail'>('dsa-list');
  const [dsas, setDsas] = useState<any[]>([]);
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [selectedDsa, setSelectedDsa] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dsaRes, leadRes] = await Promise.all([
        BranchService.getBranchDSAs(),
        BranchService.getBranchLeads()
      ]);
      setDsas(dsaRes.data || []);
      setAllLeads(leadRes.data || []);
    } catch (error) {
      toast.error("Error fetching branch data:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Filter leads specifically for the selected DSA
  const filteredLeads = allLeads.filter(lead => lead.dsa_id === selectedDsa?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#2076C7] mx-auto mb-4" />
          <p className="text-slate-500 font-bold text-lg">Loading Branch Network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-10">
      <div className="w-full mx-auto">
        
        {/* VIEW 1: DSA LIST */}
        {view === 'dsa-list' && (
          <>
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Branch Agents</h1>
                <p className="text-slate-500 mt-2 text-lg">Manage and monitor performance across your agent network</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Agents</p>
                  <p className="text-2xl font-black text-[#2076C7]">{dsas.length}</p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Pipeline</p>
                  <p className="text-2xl font-black text-[#1CADA3]">{allLeads.length}</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dsas.map((dsa) => {
                const leadCount = allLeads.filter(l => l.dsa_id === dsa.id).length;
                return (
                  <div key={dsa.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all group cursor-pointer" onClick={() => { setSelectedDsa(dsa); setView('dsa-detail'); }}>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-slate-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center text-[#2076C7] text-2xl font-bold transition-colors">
                          {dsa.name.charAt(0)}
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase border border-emerald-100">
                          Active
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#2076C7] transition-colors">{dsa.name}</h3>
                      <p className="text-sm text-slate-400 mb-6 flex items-center gap-1.5">
                        <Briefcase size={14} /> ID: {dsa.id}
                      </p>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-center text-sm text-slate-600 gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Mail size={14}/></div>
                          <span className="truncate">{dsa.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600 gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Phone size={14}/></div>
                          <span>{dsa.mobile}</span>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400">Customer Leads</p>
                          <p className="text-2xl font-black text-slate-800">{leadCount}</p>
                        </div>
                        <div className="bg-[#2076C7] text-white p-3 rounded-xl shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* VIEW 2: FULL WIDTH DSA LEADS */}
        {view === 'dsa-detail' && selectedDsa && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setView('dsa-list')}
                className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#2076C7] transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
              >
                <ArrowLeft size={20} /> Back to Agent List
              </button>
            </div>

            {/* Horizontal Agent Profile Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center gap-8">
                <div className="w-20 h-20 bg-gradient-to-tr from-[#2076C7] to-blue-400 rounded-3xl flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-blue-100">
                  {selectedDsa.name.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <h3 className="text-2xl font-black text-slate-800">{selectedDsa.name}</h3>
                  <p className="text-[#1CADA3] font-bold text-sm tracking-widest uppercase">Agent ID: {selectedDsa.id}</p>
                </div>

                <div className="hidden xl:flex items-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-2xl text-[#2076C7]"><Mail size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                      <p className="text-sm font-bold text-slate-700">{selectedDsa.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-[#1CADA3]"><Phone size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</p>
                      <p className="text-sm font-bold text-slate-700">{selectedDsa.mobile}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-500"><UserCheck size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                      <p className="text-sm font-bold text-slate-700">Verified Partner</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Full Width Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <ClipboardList className="text-[#2076C7]" size={28} /> Customer Pipeline
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Showing all leads acquired by this agent</p>
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-slate-400 text-sm font-medium mr-2">Lead Volume:</span>
                   <span className="px-5 py-2 bg-[#2076C7] text-white text-sm font-black rounded-2xl shadow-lg shadow-blue-100">
                    {filteredLeads.length} Total Leads
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredLeads.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase font-black tracking-widest border-b border-slate-100">
                        <th className="px-8 py-5">Customer Details</th>
                        <th className="px-8 py-5">Product Type</th>
                        <th className="px-8 py-5">Application ID</th>
                        <th className="px-8 py-5">Loan Amount</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                {lead.lead_name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-base">{lead.lead_name}</p>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Calendar size={12} /> Received: {new Date(lead.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                              {lead.product_type}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-xs font-mono font-medium text-slate-500">{lead.detail_lead_id}</p>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-1 font-black text-slate-900 text-lg">
                              <span className="text-[#2076C7]">₹</span>
                              {Number(lead.form_data?.loanAmount || 0).toLocaleString('en-IN')}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              lead.status === 'INCOMING_LEAD' 
                                ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            }`}>
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-slate-300 group-hover:text-[#2076C7] transition-colors p-2">
                              <ChevronRight size={24} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-32 text-center bg-slate-50/30">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <FileText className="text-slate-200" size={40} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800">No leads for this agent</h4>
                    <p className="text-slate-400 max-w-xs mx-auto mt-2">When this agent submits customer applications, they will appear here in real-time.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}