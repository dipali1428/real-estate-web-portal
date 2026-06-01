"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, Download, RefreshCw, X,
  Briefcase, CreditCard, Landmark, 
  UserCheck, Save, ClipboardList, Wallet, CheckCircle2, AlertCircle
} from 'lucide-react';
import { AccountService } from '@/app/services/accountsService';

export interface Lead {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  final_lead_confirm_status: boolean;
  source?: string;
  loan_amount?: string | number;
  created_at?: string;
  detail_lead_id?: string;
  product_type?: string;
  lead_name?: string;
  contact_number?: string;
  dsa_name?: string;
  dsa_mobile?: string;
  dsa_id?: string;
  dsa_adv_id?: string;
  dsa_email?: string;
  assigned_rm_id?: string;
  assigned_rm_name?: string;
  assigned_rm_email?: string;
  assigned_rm_mobile?: string;
  detail_lead_payout_percent?: number | string;
  form_data?: Record<string, any>;
  sub_category?: string;
  department?: string;
  lead_status?: string;
  rm_acceptance_status?: string;
  disbursement_amount?: number | string;
  gross_payout_amount?: number | string;
  gst_amount?: number | string;
  tds_amount?: number | string;
  net_payout_amount?: number | string;
  payout_date?: string;
  payout_id?: string;
  payment_mode?: string;
  transaction_reference_no?: string;
  invoice_number?: string;
  invoice_date?: string;
  policy_number?: string;
  agreement_charges?: number | string;
  branch_payout?: number | string;
}

const allowedFields = [
  "disbursement_amount", "gross_payout_amount", "gst_amount", "tds_amount",
  "net_payout_amount", "payout_date", "payout_id", "payment_mode",
  "transaction_reference_no", "invoice_number", "invoice_date",
  "policy_number", "agreement_charges", "detail_lead_payout_percent", "branch_payout"
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AccountService.getAllFinalDetailLeads();
      setLeads(Array.isArray(response.detail_leads) ? response.detail_leads : []);
    } catch (error: any) {
      // Replaced console.error with toast
      showToast(error.response?.data?.message || "Failed to fetch leads", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingLead) return;
    setIsSaving(true);
    try {
      const numberFields = ["disbursement_amount", "gross_payout_amount", "gst_amount", "tds_amount", "net_payout_amount", "agreement_charges", "branch_payout", "detail_lead_payout_percent"];
      const payload: any = {};
      allowedFields.forEach((field) => {
        const value = (viewingLead as any)[field];
        if (numberFields.includes(field)) {
          const num = parseFloat(value);
          payload[field] = isNaN(num) ? 0 : num;
        } else {
          payload[field] = (value === "" || value === undefined) ? null : value;
        }
      });
      await AccountService.updateLeadconfirmStatus(Number(viewingLead.id), payload);
      showToast("Updated successfully!", "success");
      setViewingLead(null);
      await fetchData();
    } catch (error: any) {
      // Replaced console.error logic with standardized toast
      showToast(error.response?.data?.message || "Update Failed", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredLeads = leads.filter(l =>
    l.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.detail_lead_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatKey = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await AccountService.exportLeads();
      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `leads-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast("Export started", "success");
    } catch (error: any) {
      // Replaced console.error with toast
      showToast(error.response?.data?.message || "Export failed", "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-10">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top md:slide-in-from-right duration-300 ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="font-bold text-sm">{toast.message}</p>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-indigo-600 rounded-xl"><Briefcase className="text-white" size={24} /></div>
              Final Detail Leads
            </h1>
            <p className="text-slate-500 font-medium text-xs md:text-sm ml-1">Verified Loan Disbursement Records</p>
          </div>
          <button onClick={handleExport} disabled={isExporting} className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-lg active:scale-95 disabled:bg-slate-400">
            {isExporting ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
            <span className="text-sm">Export to Excel</span>
          </button>
        </div>

        {/* Search & Refresh Bar */}
        <div className="bg-white p-2 md:p-3 rounded-2xl shadow-sm border border-slate-200 mb-6 flex items-center gap-2 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search leads..." className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-slate-50 border-none rounded-xl text-sm outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={fetchData} className="p-2.5 md:p-3 bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all flex-shrink-0">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Table/List Container */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="md:hidden divide-y divide-slate-100">
            {loading ? (
              <div className="p-10 text-center text-slate-400 font-bold text-sm">Fetching records...</div>
            ) : filteredLeads.map((lead) => (
              <div key={lead.id} className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-black text-indigo-600 text-sm">{lead.detail_lead_id}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase">{lead.product_type}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">Completed</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{lead.lead_name}</div>
                  <div className="text-xs text-slate-500">{lead.email}</div>
                </div>
                <button onClick={() => setViewingLead(lead)} className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs">View & Update</button>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Lead ID / Product</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">Customer Info</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                  <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (<tr><td colSpan={4} className="py-20 text-center text-slate-400 font-bold">Fetching records...</td></tr>) : filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-5"><div className="font-bold text-indigo-600">{lead.detail_lead_id}</div><div className="text-xs font-black text-slate-400 uppercase mt-1">{lead.product_type}</div></td>
                    <td className="px-6 py-5"><div className="font-bold text-slate-900">{lead.lead_name}</div><div className="text-sm text-slate-500 font-medium">{lead.email}</div></td>
                    <td className="px-6 py-5 text-center"><span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">Completed</span></td>
                    <td className="px-6 py-5 text-right"><button onClick={() => setViewingLead(lead)} className="px-6 py-2 bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-all font-bold text-xs shadow-sm">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      {viewingLead && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4">
          <div className="absolute inset-0 backdrop-blur-md bg-black/30" onClick={() => setViewingLead(null)} />
          <div className="relative w-full max-w-6xl bg-[#fcfdfe] rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[92vh] md:max-h-[95vh] animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
            
            <div className="px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 truncate">{viewingLead.lead_name}</h2>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1 truncate">ID: {viewingLead.detail_lead_id}</p>
              </div>
              <button onClick={() => setViewingLead(null)} className="p-2 ml-2 hover:bg-slate-50 text-slate-400 rounded-full transition-all flex-shrink-0"><X size={24} /></button>
            </div>

            <form onSubmit={handleUpdateLead} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard title="DSA Partner" icon={<Landmark size={14} />} items={[{ label: "DSA ID", value: viewingLead.dsa_id }, { label: "DSA ADV", value: viewingLead.dsa_adv_id }, { label: "DSA Name", value: viewingLead.dsa_name }, { label: "DSA Email", value: viewingLead.dsa_email }, { label: "DSA Mobile", value: viewingLead.dsa_mobile }]} />
                <InfoCard title="Assigned RM" icon={<UserCheck size={14} />} items={[{ label: "RM ID", value: viewingLead.assigned_rm_id }, { label: "RM Name", value: viewingLead.assigned_rm_name }, { label: "RM Email", value: viewingLead.assigned_rm_email }, { label: "RM Mobile", value: viewingLead.assigned_rm_mobile }]} />
                <InfoCard title="Lead Summary" icon={<ClipboardList size={14} />} items={[{ label: "Product", value: viewingLead.product_type }, { label: "Status", value: viewingLead.lead_status }, { label: "Name", value: viewingLead.lead_name }, { label: "Contact", value: viewingLead.contact_number }, { label: "Email", value: viewingLead.email }, { label: "Created", value: viewingLead.created_at ? new Date(viewingLead.created_at).toLocaleDateString() : 'N/A' }]} />
              </div>

              {viewingLead.form_data && (
                <div className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><CreditCard size={16} /> Form Data</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries(viewingLead.form_data).map(([key, val]: any) => (
                      <div key={key} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-0.5 truncate">{formatKey(key)}</p>
                        <p className="font-bold text-slate-700 text-[11px] truncate">{val || '---'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl border-2 border-indigo-50 shadow-sm">
                <h3 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-3 mb-6"><Wallet className="text-indigo-600" size={20} /> Financial Updation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {allowedFields.map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{formatKey(field)}</label>
                      <input 
                        type={field.includes('date') ? "date" : (field.includes('amount') || field.includes('percent') || field.includes('charges') || field.includes('payout')) ? "number" : "text"} 
                        step="any" 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-sm text-slate-700" 
                        value={(viewingLead as any)[field] || ''} 
                        onChange={(e) => setViewingLead({ ...viewingLead, [field]: e.target.value })} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row justify-end gap-3 sticky bottom-0 bg-white/90 backdrop-blur-md py-4 border-t border-slate-100 mt-auto">
                <button type="button" onClick={() => setViewingLead(null)} className="w-full md:w-auto px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">Close</button>
                <button type="submit" disabled={isSaving} className="w-full md:w-auto px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-400">
                  {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                  {isSaving ? "Updating..." : "Update Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ title, icon, items }: { title: string, icon: any, items: { label: string, value: any }[] }) {
  return (
    <div className="bg-white p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-slate-50 rounded-lg text-slate-500">{icon}</div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="border-b border-slate-50 pb-1.5 last:border-0 last:pb-0">
            <p className="text-[9px] text-slate-400 font-bold uppercase truncate">{item.label}</p>
            <p className="font-bold text-slate-700 text-xs truncate">{item.value || '---'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}