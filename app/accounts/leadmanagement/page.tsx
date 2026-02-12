'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, UserPlus, 
  CheckCircle2, Clock, XCircle, TrendingUp,
  MoreVertical, Calendar, Phone, Mail,
  LucideIcon, Inbox, Eye, X, Trash2, Building2,
  FileText, CheckCircle
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// --- Types ---
type LeadStatus = 'In Progress' | 'Disbursed' | 'Rejected' | 'Document Pending';

interface Lead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  product: string;
  institution: string;
  amount: number;
  status: LeadStatus;
  createdAt: string;
  expectedPayout: number;
}

const INITIAL_LEADS: Lead[] = [
  { id: 'LD-2023-001', customerName: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@example.com', product: 'Home Loans', institution: 'HDFC Bank', amount: 4500000, status: 'In Progress', createdAt: '2023-10-15', expectedPayout: 22500 },
  { id: 'LD-1001', customerName: 'Vikram Malhotra', phone: '9876543210', email: 'vikram.m@example.com', product: 'Business Loan', institution: 'ICICI Bank', amount: 1500000, status: 'In Progress', createdAt: '2024-03-01', expectedPayout: 22500 },
  { id: 'LD-1002', customerName: 'Anjali Sharma', phone: '9988776655', email: 'anjali.s@example.com', product: 'Home Loan', institution: 'HDFC Bank', amount: 4500000, status: 'Disbursed', createdAt: '2024-02-15', expectedPayout: 36000 },
  { id: 'LD-1003', customerName: 'Sunit Shah', phone: '9123456789', email: 'rajesh.k@example.com', product: 'Personal Loan', institution: 'Bajaj Finserv', amount: 300000, status: 'Document Pending', createdAt: '2024-03-05', expectedPayout: 6000 },
];

export default function LeadManagement() {
  // --- States ---
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // --- Logic: Derived Stats ---
  const stats = useMemo(() => {
    const total = leads.length;
    const inProgress = leads.filter(l => l.status === 'In Progress').length;
    const disbursed = leads.filter(l => l.status === 'Disbursed').length;
    const conversion = total > 0 ? Math.round((disbursed / total) * 100) : 0;

    return { total, inProgress, disbursed, conversion };
  }, [leads]);

  // --- Logic: Filtering ---
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.institution.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, leads]);

  // --- Actions ---
  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newLead: Lead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      product: formData.get('product') as string,
      institution: formData.get('bank') as string,
      amount: Number(formData.get('amount')),
      status: 'In Progress',
      createdAt: new Date().toISOString().split('T')[0],
      expectedPayout: Number(formData.get('amount')) * 0.01, 
    };

    setLeads([newLead, ...leads]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Lead Management</h1>
            <p className="text-slate-500 text-sm mt-1">Convert inquiries into disbursements efficiently.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#1CADA3] text-white rounded-xl text-sm font-bold hover:bg-[#16968d] transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add New Lead
          </button>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <LeadStatCard title="Total Leads" amount={stats.total.toString()} Icon={UserPlus} color="indigo" />
          <LeadStatCard title="In Progress" amount={stats.inProgress.toString()} Icon={Clock} color="amber" />
          <LeadStatCard title="Disbursed" amount={stats.disbursed.toString()} Icon={CheckCircle2} color="emerald" />
          <LeadStatCard title="Conversion" amount={`${stats.conversion}%`} Icon={TrendingUp} color="blue" />
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 bg-slate-50/50">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search name, ID, or bank..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-xl">
                <Filter className="w-4 h-4 text-slate-400" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-gray-600 outline-none cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Disbursed">Disbursed</option>
                  <option value="Document Pending">Document Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 uppercase text-[10px] font-bold text-slate-400 tracking-widest">
                  <th className="px-6 py-4">Lead ID</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Product & Bank</th>
                  <th className="px-6 py-4">Loan Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-6 py-4 font-medium text-slate-500">{lead.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{lead.customerName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-700">{lead.product}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{lead.institution}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-600">
                        ₹{lead.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <LeadStatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 text-slate-400 hover:text-[#1CADA3] hover:bg-emerald-50 rounded-lg transition-all font-semibold text-xs flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Inbox className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-500 font-medium">No leads found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- MODAL: Add New Lead (Keep existing) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">New Lead Entry</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Customer Name</label>
                  <input required name="name" type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1CADA3]" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1CADA3]" placeholder="+91 ..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email</label>
                  <input required name="email" type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1CADA3]" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Product Type</label>
                  <select name="product" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                    <option>Home Loan</option>
                    <option>Business Loan</option>
                    <option>Personal Loan</option>
                    <option>LAP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Loan Amount</label>
                  <input required name="amount" type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1CADA3]" placeholder="₹" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#1CADA3] text-white rounded-xl font-bold shadow-lg hover:bg-[#15968d] transition-all mt-4">
                Create Lead
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- UPDATED MODAL: Lead Application Details (Matching Image) --- */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-lg font-bold text-[#0D8A72]">Lead Application Details</h2>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Details & Documents */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Applicant Header Card */}
                <div className="border border-slate-100 rounded-xl p-5 flex justify-between items-start bg-white shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedLead.customerName}</h3>
                    <p className="text-sm text-slate-500 font-medium">{selectedLead.product}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase">
                    In Review
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Lead ID</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedLead.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Applied Date</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedLead.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Amount</p>
                    <p className="text-sm font-bold text-slate-800">₹ {selectedLead.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Mobile</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedLead.phone}</p>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-4">
                    <FileText className="w-5 h-5 text-[#0D8A72]" />
                    Documents
                  </div>
                  
                  {['Aadhar Card.pdf', 'PAN Card.jpg'].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-white">
                      <span className="text-sm text-slate-600 font-medium">{doc}</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Status Timeline */}
              <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-6">Application Status</h4>
                
                <div className="relative space-y-8">
                  {/* Vertical Line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

                  {/* Status Steps */}
                  <div className="relative flex items-start gap-4">
                    <div className="z-10 w-6 h-6 rounded-full bg-[#1CADA3] flex items-center justify-center border-4 border-white shadow-sm text-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none">Application Submitted</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">2023-10-15</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="z-10 w-6 h-6 rounded-full bg-[#1CADA3] flex items-center justify-center border-4 border-white shadow-sm text-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none">Document Verification</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">2023-10-21</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="z-10 w-6 h-6 rounded-full bg-[#1CADA3] flex items-center justify-center border-4 border-white shadow-sm text-white">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none">RM Review</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium italic underline">In Progress</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="z-10 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-sm">
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 leading-none">Sanction / Approval</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="z-10 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-sm">
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400 leading-none">Disbursement</p>
                    </div>
                  </div>

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
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-[#1CADA3]/40 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${styles[color]} border transition-all group-hover:scale-110`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      </div>
      <div className="text-2xl font-black text-slate-800 tracking-tight">{amount}</div>
    </div>
  );
}

function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const styles = {
    'Disbursed': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'In Progress': 'bg-blue-50 text-blue-600 border-blue-100',
    'Document Pending': 'bg-amber-50 text-amber-600 border-amber-100',
    'Rejected': 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
}