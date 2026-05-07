'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Download, Clock, CheckCircle2, Inbox, X,
  User, ShieldCheck, Calculator, Send
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// --- Types ---
type BillStatus = 'Paid' | 'Pending' | 'Overdue';
type MainCategory = 'Loans' | 'Insurance' | 'Mutual Funds' | 'Investment' | 'Real Estate' | 'Unlisted';

interface BillLedgerEntry {
  id: string;
  leadId: string;
  clientName: string;
  payoutId: string;
  payoutDate: string;
  dsaInfo: { name: string; mobile: string; advCode: string; };
  panNo: string;
  category: MainCategory;
  bank: string;
  refNo: string; 
  disbAmt: number;
  disbMonth: string;
  payoutMode: string;
  utrRefNo: string;
  grossPayout: number;
  broker: string;
  billNo: string;
  billDate: string;
  receivedGross: number;
  receivedNet: number;
  status: BillStatus;
}
const CATEGORIES: MainCategory[] = ['Loans', 'Insurance', 'Mutual Funds', 'Investment', 'Real Estate', 'Unlisted'];

const INITIAL_DATA: BillLedgerEntry[] = [
  {
    id: '1', leadId: 'LD-9921', clientName: 'Amit Shah', payoutId: 'P-101', payoutDate: '2024-03-20',
    dsaInfo: { name: 'FinCorp', mobile: '9876543210', advCode: 'ADV-01' },
    panNo: 'ABCDE1234F', category: 'Loans', bank: 'SBI', refNo: 'LN-882299',
    disbAmt: 5000000, disbMonth: 'March', payoutMode: 'NEFT', utrRefNo: 'UTR-TEMP-01',
    grossPayout: 25000, broker: 'Direct', billNo: 'B-001', billDate: '2024-03-22',
    receivedGross: 0, receivedNet: 0, status: 'Pending',
  },
  {
    id: '2', leadId: 'LD-4412', clientName: 'Sneha Gupta', payoutId: 'P-102', payoutDate: '2024-03-15',
    dsaInfo: { name: 'SecureLife', mobile: '9112233445', advCode: 'ADV-09' },
    panNo: 'PQRTS9988G', category: 'Insurance', bank: 'LIC India', refNo: 'POL-776655',
    disbAmt: 50000, disbMonth: 'March', payoutMode: 'IMPS', utrRefNo: 'UTR-TEMP-02',
    grossPayout: 12000, broker: 'PolicyBazaar', billNo: 'B-002', billDate: '2024-03-05',
    receivedGross: 12000, receivedNet: 11760, status: 'Paid',
  },
];

export default function BillPaymentLedger() {
  const [data, setData] = useState<BillLedgerEntry[]>(INITIAL_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New States for Forwarding functionality
  const [isForwardModalOpen, setIsForwardModalOpen] = useState(false);
  const [entryToForward, setEntryToForward] = useState<BillLedgerEntry | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

   // --- Logic: Filtering ---
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.panNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCat;
    });
  }, [searchTerm, statusFilter, categoryFilter, data]);

  // --- Logic: Real-time Stats ---
  const stats = useMemo(() => {
    const totalGross = filteredData.reduce((sum, r) => sum + r.grossPayout, 0);
    return {
      total: totalGross,
      tds: totalGross * 0.02,
      pendingCount: filteredData.filter(b => b.status !== 'Paid').length
    };
  }, [filteredData]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const gross = Number(formData.get('grossPayout'));

    const newEntry: BillLedgerEntry = {
      id: Math.random().toString(36).substr(2, 9),
      leadId: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: formData.get('clientName') as string,
      payoutId: `PAY-${Math.floor(100 + Math.random() * 900)}`,
      payoutDate: new Date().toISOString().split('T')[0],
      dsaInfo: { name: 'Admin', mobile: '9999999999', advCode: 'INT-01' },
      panNo: formData.get('panNo') as string,
      category: formData.get('category') as MainCategory,
      bank: formData.get('bank') as string,
      refNo: formData.get('refNo') as string,
      disbAmt: Number(formData.get('disbAmt')),
      disbMonth: new Date().toLocaleString('default', { month: 'long' }),
      payoutMode: 'NEFT',
      utrRefNo: 'PENDING',
      grossPayout: gross,
      broker: 'Direct',
      billNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      billDate: new Date().toISOString().split('T')[0],
      receivedGross: 0,
      receivedNet: 0,
      status: 'Pending',
    };

    setData([newEntry, ...data]);
    setIsAddModalOpen(false);
  };

  const handlePayNow = (id: string) => {
    setData(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: 'Paid', 
          receivedGross: item.grossPayout, 
          receivedNet: item.grossPayout * 0.98,
          utrRefNo: `UTR-${Math.floor(Math.random() * 100000000)}` 
        };
      }
      return item;
    }));
  };

  const handleExport = () => {
    const headers = ["Lead ID", "Client", "Category", "Gross", "TDS(2%)", "Net", "Status", "UTR"];
    const csvData = filteredData.map(r => 
      `${r.leadId},${r.clientName},${r.category},${r.grossPayout},${(r.grossPayout * 0.02).toFixed(2)},${(r.grossPayout * 0.98).toFixed(2)},${r.status},${r.utrRefNo}`
    );
    const blob = new Blob([[headers.join(','), ...csvData].join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Expense_Ledger_${categoryFilter}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Bill Payment</h1>
            <p className="text-slate-500 text-sm mt-1">Manage cross-category business expenses and TDS compliance.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1CADA3] text-white rounded-xl text-sm font-bold hover:bg-[#1CADA3] shadow-lg active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" /> Add New Bill
            </button>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Ledger Total" amount={stats.total} Icon={Calculator} color="blue" />
          <StatCard title="Withheld TDS" amount={stats.tds} Icon={ShieldCheck} color="red" />
          <StatCard title="Bills Due" amount={stats.pendingCount.toString()} Icon={Clock} color="amber" />
          <StatCard title="Net Payout" amount={stats.total - stats.tds} Icon={CheckCircle2} color="emerald" />
        </div>

        {/* Functional Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Loans', 'Insurance', 'Mutual Funds', 'Investment', 'Real Estate', 'Unlisted'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap shadow-sm ${
                categoryFilter === cat 
                ? 'bg-[#1CADA3] text-white border-[#1CADA3] scale-105' 
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Ledger Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between bg-slate-50/50">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search Vendor, PAN, Bill No..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-gray-600 rounded-xl text-sm outline-none focus:ring-4 focus:ring-[#1CADA3]/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="overflow-x-auto scrollbar-x-thin">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  <th className="px-4 py-4">Lead Info</th>
                  <th className="px-4 py-4">Payout ID/Date</th>
                  <th className="px-4 py-4">DSA Detail</th>
                  <th className="px-4 py-4">PAN NO</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Bank/Inst</th>
                  <th className="px-4 py-4 text-[#1CADA3]">Policy / Loan No</th>
                  <th className="px-4 py-4">Disb Amt</th>
                  <th className="px-4 py-4">Month</th>
                  <th className="px-4 py-4 text-slate-900">Gross</th>
                  <th className="px-4 py-4 text-red-600">TDS (2%)</th>
                  <th className="px-4 py-4 text-emerald-700">Net Payout</th>
                  <th className="px-4 py-4">Bill No/Date</th>
                  <th className="px-4 py-4">Status</th>
                  {/* NEW COLUMN */}
                  <th className="px-4 py-4 text-slate-500">Forward to AM</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => {
                    const tdsAmt = row.grossPayout * 0.02;
                    const netPayout = row.grossPayout * 0.98;

                    return (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group whitespace-nowrap">
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-700">{row.clientName}</div>
                          <div className="text-[11px] font-semibold text-[#1CADA3] uppercase">{row.leadId}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-500">{row.payoutId}</td>
                        <td className="px-4 py-4 text-slate-500 text-xs">{row.dsaInfo.name}</td>
                        <td className="px-4 py-4 font-mono text-xs font-bold text-slate-600">{row.panNo}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                            {row.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-500 font-medium">{row.bank}</td>
                        <td className="px-4 py-4 font-bold text-slate-700">{row.refNo}</td>
                        <td className="px-4 py-4 text-slate-400">₹{row.disbAmt.toLocaleString()}</td>
                        <td className="px-4 py-4 text-slate-400">{row.disbMonth}</td>
                        <td className="px-4 py-4 font-semibold text-slate-600">₹{row.grossPayout.toLocaleString()}</td>
                        <td className="px-4 py-4 text-red-600 font-bold">-₹{tdsAmt.toFixed(2)}</td>
                        <td className="px-4 py-4 font-black text-emerald-700">₹{netPayout.toFixed(2)}</td>
                        <td className="px-4 py-4 text-xs font-bold text-slate-700">{row.billNo}</td>
                        <td className="px-4 py-4"><BillStatusBadge status={row.status} /></td>
                        
                        {/* NEW FORWARD BUTTON CELL */}
                        <td className="px-4 py-4">
                           <button 
                            onClick={() => { setEntryToForward(row); setIsForwardModalOpen(true); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
                           >
                            <Send className="w-3 h-3" /> Forward
                           </button>
                        </td>

                        <td className="px-4 py-4 text-right">
                          <button 
                            onClick={() => row.status !== 'Paid' && handlePayNow(row.id)}
                            disabled={row.status === 'Paid'}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                              row.status === 'Paid' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                              : 'bg-[#1CADA3] text-white hover:bg-[#15968d] active:scale-95'
                            }`}
                          >
                            {row.status === 'Paid' ? 'Paid' : 'Pay Now'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={18} className="py-24 text-center">
                      <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-500 font-semibold">No entries found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- MODAL: Forward to AM (NEW) --- */}
      {isForwardModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#1e293b]/5">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Send className="w-5 h-5 text-[#1CADA3]" /> Forward Record
              </h2>
              <button onClick={() => setIsForwardModalOpen(false)} className="p-2 hover:bg-slate-200 text-gray-600 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#1CADA3]/10 text-[#1CADA3] rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Confirm Forwarding</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    You are forwarding the ledger entry for <span className="font-bold text-slate-800">{entryToForward?.clientName}</span> to the Account Manager for verification.
                </p>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsForwardModalOpen(false)}
                        className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            toast.success(`Entry ${entryToForward?.leadId} forwarded to AM!`);
                            setIsForwardModalOpen(false);
                        }}
                        className="flex-1 py-3 bg-[#1CADA3] text-white rounded-xl font-bold hover:bg-[#15968d] transition-all"
                    >
                        Confirm Forward
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Add New Expense (Existing) --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Add New Bill</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-200 text-gray-600 rounded-full transition-all"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Vendor / Client Name</label>
                  <input required name="clientName" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">PAN Number</label>
                  <input required name="panNo" maxLength={10} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none uppercase font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Category</label>
                  <select name="category" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Bank / Institution</label>
                  <input required name="bank" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Policy / Loan No</label>
                  <input required name="refNo" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Disbursement Amt</label>
                  <input required name="disbAmt" type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Gross Payout Amount</label>
                  <input required name="grossPayout" type="number" className="w-full px-4 py-2.5 bg-white border-2 border-[#1CADA3] text-gray-600 rounded-xl focus:border-[#1CADA3] outline-none font-bold" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-[#1CADA3] text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-[#15968d] transition-all mt-4">
                Confirm & Add Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---
function StatCard({ title, amount, Icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-[#1CADA3]/30 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2.5 rounded-xl ${colors[color]} border transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      </div>
      <div className="text-2xl font-black text-slate-800 tracking-tight">
        {typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount}
      </div>
    </div>
  );
}

function BillStatusBadge({ status }: { status: BillStatus }) {
  const styles = {
    Paid: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Overdue: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}