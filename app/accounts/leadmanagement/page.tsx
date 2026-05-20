'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, UserPlus, 
  CheckCircle2, Clock, TrendingUp, Inbox, X,
  FileText, Landmark, Wallet, CreditCard
} from 'lucide-react';

// --- Types ---
type LeadType = 'Detailed' | 'Referral';
type LeadStatus = 'In Progress' | 'Disbursed' | 'Rejected' | 'Document Pending';

interface Lead {
  id: string;
  customerName: string;
  dsaName: string; // New field
  phone: string;
  email: string;
  product: string; // e.g. "Loan"
  category: string; // e.g. "Home Loan"
  institution: string;
  amount: number;
  status: LeadStatus;
  type: LeadType; // Detailed or Referral
  createdAt: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  isPaid: boolean;
}

const INITIAL_LEADS: Lead[] = [
  { 
    id: 'LD-2023-001', 
    customerName: 'Rajesh Kumar', 
    dsaName: 'Elite Finserve',
    phone: '9876543210', 
    email: 'rajesh@example.com', 
    product: 'Loan', 
    category: 'Home Loan',
    institution: 'HDFC Bank', 
    amount: 4500000, 
    status: 'Disbursed', 
    type: 'Detailed',
    createdAt: '2023-10-15',
    bankName: 'HDFC Bank',
    accountNo: 'XXXXXX4521',
    ifsc: 'HDFC0001234',
    isPaid: false
  },
  { 
    id: 'LD-1001', 
    customerName: 'Vikram Malhotra', 
    dsaName: 'Alpha Referrals',
    phone: '9876543210', 
    email: 'vikram.m@example.com', 
    product: 'Loan', 
    category: 'Business Loan',
    institution: 'ICICI Bank', 
    amount: 1500000, 
    status: 'Disbursed', 
    type: 'Referral',
    createdAt: '2024-03-01',
    bankName: 'ICICI Bank',
    accountNo: 'XXXXXX9982',
    ifsc: 'ICIC0000551',
    isPaid: true
  },
];

export default function LeadManagement() {
  // --- States ---
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<LeadType>('Detailed');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // --- Logic: Calculations ---
  const calculatePayout = (amount: number, type: LeadType) => {
    const rate = type === 'Detailed' ? 0.008 : 0.005; // 0.80% or 0.50%
    return amount * rate;
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.dsaName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = lead.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, leads]);

  const stats = useMemo(() => {
    const currentLeads = leads.filter(l => l.type === activeTab);
    const totalDisbursed = currentLeads.filter(l => l.status === 'Disbursed').reduce((acc, curr) => acc + curr.amount, 0);
    const totalPayout = currentLeads.filter(l => l.status === 'Disbursed').reduce((acc, curr) => acc + calculatePayout(curr.amount, curr.type), 0);
    
    return { totalDisbursed, totalPayout, count: currentLeads.length };
  }, [leads, activeTab]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Lead Management</h1>
            <p className="text-slate-500 text-sm mt-1">Manage payouts and disbursements for your partners.</p>
          </div>
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex gap-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('Detailed')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Detailed' ? 'bg-[#1CADA3] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Detailed Leads (0.80%)
            </button>
            <button 
              onClick={() => setActiveTab('Referral')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Referral' ? 'bg-[#1CADA3] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Referral Leads (0.50%)
            </button>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <LeadStatCard title="Total Volume" amount={`₹${stats.totalDisbursed.toLocaleString('en-IN')}`} Icon={TrendingUp} color="indigo" />
          <LeadStatCard title="Total Payout" amount={`₹${stats.totalPayout.toLocaleString('en-IN')}`} Icon={Wallet} color="emerald" />
          <LeadStatCard title="Total Leads" amount={stats.count.toString()} Icon={UserPlus} color="blue" />
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 bg-slate-50/50">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search Customer, ID, or DSA Name..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400 tracking-widest">
                  <th className="px-6 py-4">Lead ID</th>
                  <th className="px-6 py-4">DSA Name</th>
                  <th className="px-6 py-4">Product + Category</th>
                  <th className="px-6 py-4 text-right">Disbursement Amt</th>
                  <th className="px-6 py-4 text-right">Payout ({activeTab === 'Detailed' ? '0.8%' : '0.5%'})</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-slate-500">{lead.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{lead.dsaName}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Cust: {lead.customerName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{lead.product}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{lead.category}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-600 text-right">
                        ₹{lead.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#1CADA3] text-right">
                        ₹{calculatePayout(lead.amount, lead.type).toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider bg-emerald-50 text-emerald-600 border-emerald-100">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 text-[#1CADA3] hover:bg-emerald-50 rounded-lg transition-all font-bold text-xs border border-emerald-100"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Inbox className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-500 font-medium">No leads found in this category</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- LEAD DETAIL MODAL --- */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Lead Disbursement Info</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Ref: {selectedLead.id}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Lead Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">DSA Partner</label>
                    <p className="text-sm font-bold text-slate-800">{selectedLead.dsaName}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Customer</label>
                    <p className="text-sm font-bold text-slate-800">{selectedLead.customerName}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Disbursement Amount</label>
                    <p className="text-lg font-black text-[#1CADA3]">₹ {selectedLead.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Payout Earned ({selectedLead.type})</label>
                    <p className="text-lg font-black text-blue-600">₹ {calculatePayout(selectedLead.amount, selectedLead.type).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Landmark className="w-5 h-5 text-[#1CADA3]" />
                    Partner Bank Details
                  </div>
                  <div className="grid grid-cols-3 gap-4 border border-slate-100 rounded-2xl p-4 bg-white shadow-sm">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Bank Name</p>
                      <p className="text-sm font-bold text-slate-700">{selectedLead.bankName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Account No</p>
                      <p className="text-sm font-bold text-slate-700">{selectedLead.accountNo}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">IFSC Code</p>
                      <p className="text-sm font-bold text-slate-700">{selectedLead.ifsc}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <FileText className="w-5 h-5 text-[#1CADA3]" />
                    Verified Documents
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Kyc_Verification.pdf', 'Income_Proof.pdf', 'Disbursement_Letter.pdf'].map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-xs font-bold">
                        <CheckCircle2 className="w-3 h-3" /> {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Status & Action */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-6">Payment Status</h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${selectedLead.isPaid ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                        {selectedLead.isPaid ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">{selectedLead.isPaid ? 'Paid' : 'Payment Pending'}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{selectedLead.isPaid ? 'Credited to partner bank' : 'Waiting for approval'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                   <button 
                    disabled={selectedLead.isPaid}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all shadow-lg ${selectedLead.isPaid ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-[#1CADA3] text-white hover:bg-[#16968d] active:scale-95 shadow-emerald-500/20'}`}
                   >
                    <CreditCard className="w-5 h-5" />
                    {selectedLead.isPaid ? 'PAYMENT COMPLETED' : 'RELEASE PAYOUT'}
                   </button>
                   {!selectedLead.isPaid && <p className="text-[10px] text-center text-slate-400 font-medium italic">Funds will be transferred to {selectedLead.accountNo}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---

function LeadStatCard({ title, amount, Icon, color }: any) {
  const styles: any = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-[#1CADA3]/40 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2.5 rounded-xl ${styles[color]} border transition-all group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      </div>
      <div className="text-2xl font-black text-slate-800 tracking-tight">{amount}</div>
    </div>
  );
}