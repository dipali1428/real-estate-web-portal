'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, CheckCircle2, Banknote, 
  Building2, Inbox, Calculator,Upload
} from 'lucide-react';

// --- Types ---
type ReceivableStatus = 'Pending' | 'Approved' | 'Overdue' | 'Disputed';
type Department = 'Insurance' | 'Loans';

interface Receivable {
  id: string;
  leadId: string;
  clientName: string;
  payoutId: string;
  payoutDate: string;
  dsaInfo: {
    name: string;
    mobile: string;
    advCode: string;
  };
  panNo: string;
  productCategory: string;
  department: Department;
  bank: string;
  refNo: string; // Policy No if Insurance, Loan No if Loans
  disbAmt: number;
  netPremiumAmt?: number;
  disbMonth: string;
  payoutMode: string;
  utrRefNo: string;
  grossPayout: number;
  broker: string;
  billNo: string;
  billDate: string;
  receivedGross: number;
  receivedNet: number;
  status: ReceivableStatus;
}

const MOCK_RECEIVABLES: Receivable[] = [
  {
    id: '1',
    leadId: 'LD-8821',
    clientName: 'Rahul Sharma',
    payoutId: 'PAY-9901',
    payoutDate: '2024-03-20',
    dsaInfo: { name: 'Alpha Solutions', mobile: '9876543210', advCode: 'ADV-55' },
    panNo: 'ABCDE1234F',
    productCategory: 'Life Insurance',
    department: 'Insurance',
    bank: 'HDFC Life',
    refNo: 'POL-11223344',
    disbAmt: 50000,
    netPremiumAmt: 48000,
    disbMonth: 'March',
    payoutMode: 'NEFT',
    utrRefNo: 'UTR88776655',
    grossPayout: 10000,
    broker: 'PolicyBazaar',
    billNo: 'BILL-001',
    billDate: '2024-03-22',
    receivedGross: 10000,
    receivedNet: 9800,
    status: 'Approved',
  },
  {
    id: '2',
    leadId: 'LD-4452',
    clientName: 'Priya Enterprises',
    payoutId: 'PAY-9902',
    payoutDate: '2024-03-21',
    dsaInfo: { name: 'Global Finserv', mobile: '9000011122', advCode: 'ADV-12' },
    panNo: 'PQRTS9988G',
    productCategory: 'Business Loan',
    department: 'Loans',
    bank: 'Bajaj Finserv',
    refNo: 'LN-99887766',
    disbAmt: 2500000,
    disbMonth: 'February',
    payoutMode: 'IMPS',
    utrRefNo: 'REF223344',
    grossPayout: 37500,
    broker: 'Direct',
    billNo: 'BILL-442',
    billDate: '2024-03-10',
    receivedGross: 0,
    receivedNet: 0,
    status: 'Overdue',
  },
];

export default function TDSManagementLedger() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');

  const handleTDSUpload = (id: string) => {
  // Trigger the hidden file input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.jpg,.jpeg,.png';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      alert(`Uploading TDS Certificate for ID: ${id}\nFile: ${file.name}`);
      // Here you would typically send the file to your backend
    }
  };
  input.click();
};
  const filteredData = useMemo(() => {
    return MOCK_RECEIVABLES.filter(item => {
      const matchesSearch = 
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.leadId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.panNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesDept = deptFilter === 'All' || item.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [searchTerm, statusFilter, deptFilter]);

  // Dynamic Stats for TDS
  const stats = useMemo(() => {
    const totalGross = MOCK_RECEIVABLES.reduce((sum, r) => sum + r.grossPayout, 0);
    const totalTDS = totalGross * 0.02;
    const totalNet = totalGross - totalTDS;

    return {
      gross: totalGross,
      tds: totalTDS,
      net: totalNet,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">TDS Management </h1>
            <p className="text-slate-500 text-sm mt-1">Comprehensive view of payouts including 2% TDS deductions and billing details.</p>
          </div>
          {/* <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 shadow-sm">
              <Download className="w-4 h-4" /> Export TDS Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-white rounded-xl text-sm font-semibold hover:bg-slate-800 shadow-md">
              <ShieldCheck className="w-4 h-4" /> Verify PAN/TAN
            </button>
          </div> */}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Accumulated Gross" amount={stats.gross} Icon={Banknote} color="blue" />
          <StatCard title="Total TDS (2%)" amount={stats.tds} Icon={Calculator} color="red" />
          <StatCard title="Total Net Receivable" amount={stats.net} Icon={CheckCircle2} color="emerald" />
        </div>

        {/* Filters & Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between bg-slate-50/50">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search Client, PAN, Lead or Bank..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-gray-600 rounded-xl text-sm outline-none focus:ring-4 focus:ring-[#1CADA3]/10 focus:border-[#1CADA3] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none"
              >
                <option value="All">All Departments</option>
                <option value="Insurance">Insurance</option>
                <option value="Loans">Loans</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-x-thin">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  <th className="px-4 py-4">Lead Info</th>
                  <th className="px-4 py-4">Payout ID/Date</th>
                  <th className="px-4 py-4">DSA Info</th>
                  <th className="px-4 py-4">PAN No</th>
                  <th className="px-4 py-4">Category/Dept</th>
                  <th className="px-4 py-4">Bank</th>
                  <th className="px-4 py-4 text-[#1CADA3]">
                    {deptFilter === 'Insurance' ? 'Policy No' : deptFilter === 'Loans' ? 'Loan No' : 'Policy / Loan No'}
                  </th>
                  <th className="px-4 py-4">Disb Amt</th>
                  <th className="px-4 py-4">Net Premium</th>
                  <th className="px-4 py-4">Disb Month</th>
                  <th className="px-4 py-4">Mode / UTR</th>
                  <th className="px-4 py-4 text-slate-900">Gross Payout</th>
                  <th className="px-4 py-4 text-red-600 font-extrabold">TDS (2%)</th>
                  <th className="px-4 py-4 text-emerald-700 font-extrabold">Net Payout</th>
                  <th className="px-4 py-4">Broker</th>
                  <th className="px-4 py-4">Bill No/Date</th>
                  <th className="px-4 py-4">Received Gross/Net</th>
                  <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Upload TDS Certificate</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => {
                    const tdsAmount = row.grossPayout * 0.02;
                    const calculatedNet = row.grossPayout - tdsAmount;

                    return (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group whitespace-nowrap">
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-700">{row.clientName}</div>
                          <div className="text-[11px] font-semibold text-slate-400 uppercase">{row.leadId}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-slate-600">{row.payoutId}</div>
                          <div className="text-[11px] text-slate-400">{row.payoutDate}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-700 flex items-center gap-1">
                            {row.dsaInfo.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{row.dsaInfo.mobile} | {row.dsaInfo.advCode}</div>
                        </td>
                        <td className="px-4 py-4 font-mono text-xs font-bold text-slate-600">{row.panNo}</td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-slate-700">{row.productCategory}</div>
                          <div className={`text-[10px] font-bold uppercase ${row.department === 'Insurance' ? 'text-purple-500' : 'text-blue-500'}`}>
                            {row.department}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span className="font-medium text-slate-600">{row.bank}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-bold text-slate-700">{row.refNo}</td>
                        <td className="px-4 py-4 font-bold text-slate-800">₹{row.disbAmt.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-4 text-slate-600">
                          {row.netPremiumAmt ? `₹${row.netPremiumAmt.toLocaleString('en-IN')}` : '-'}
                        </td>
                        <td className="px-4 py-4 text-slate-500">{row.disbMonth}</td>
                        <td className="px-4 py-4">
                          <div className="text-xs font-bold text-slate-700">{row.payoutMode}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{row.utrRefNo}</div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-slate-600">₹{row.grossPayout.toLocaleString('en-IN')}</td>
                        
                        {/* TDS COLUMN */}
                        <td className="px-4 py-4 text-red-600 font-bold">
                          -₹{tdsAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        {/* CALCULATED NET PAYOUT COLUMN */}
                        <td className="px-4 py-4 font-black text-emerald-700">
                          ₹{calculatedNet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        <td className="px-4 py-4"><span className="text-xs bg-slate-100 text-gray-600 px-2 py-1 rounded">{row.broker}</span></td>
                        <td className="px-4 py-4">
                          <div className="text-xs font-bold text-slate-700">{row.billNo}</div>
                          <div className="text-[10px] text-slate-400">{row.billDate}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs font-bold text-emerald-600">G: ₹{row.receivedGross.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] font-bold text-emerald-700">N: ₹{row.receivedNet.toLocaleString('en-IN')}</div>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={row.status} />
                        </td>
                         {/* NEW UPLOAD TDS COLUMN */}
                        <td className="px-4 py-4">
                          <button 
                            onClick={() => handleTDSUpload(row.id)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 hover:border-[#1CADA3] hover:text-[#1CADA3] transition-all shadow-sm active:scale-95"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            Upload TDS Certificate
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={19} className="py-24 text-center">
                      <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-500 font-semibold">No records found matching filters</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, amount, Icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2.5 rounded-xl ${colors[color]} border transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-black text-slate-800 tracking-tight">
        ₹{amount.toLocaleString('en-IN')}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ReceivableStatus }) {
  const styles = {
    Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Overdue: 'bg-red-50 text-red-600 border-red-100',
    Disputed: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}