'use client';
import { useState, useMemo } from 'react';
import { 
  IndianRupee, Search, Filter, Download, Eye, 
  Wallet, Clock, FileText, Info, Calculator, 
  ArrowUpRight, ChevronRight, TrendingUp,
  Building2, ShieldCheck, PieChart, Briefcase, Landmark,
  Inbox
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// --- Types ---
type TabType = 'payout-history' | 'commission-structure' | 'earnings-calculator';
type CategoryType = 'loans' | 'insurance' | 'mutual-funds' | 'investments' | 'real-estate';

interface PayoutRecord {
  payoutId: string;
  date: string;
  clientName: string;
  leadId: string;
  product: string;
  category: string;
  paymentMode: string;
  refNumber: string;
  netPayout: string;
  status: 'Processed' | 'Pending';
}

export default function IncentivesPayouts() {
  const [activeTab, setActiveTab] = useState<TabType>('payout-history');
  const [leadCategory, setLeadCategory] = useState<CategoryType>('loans');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [amount, setAmount] = useState<string>('');

  // --- Empty Payout Data (Mock data removed) ---
  const [payoutData, setPayoutData] = useState<PayoutRecord[]>([]);

  // --- Category Mappings ---
  const productMapping: Record<CategoryType, string[]> = {
    'loans': ['Home Loan', 'Personal Loan', 'Vehicle Loan', 'SME Loan', 'Mortgage Loan', 'Business Loan', 'Loan Against Securities', 'Education Loan'],
    'insurance': ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance', 'Fire Insurance', 'Cattle Insurance', 'Marine Insurance', 'Corporate Insurance', 'Loan Protector'],
    'mutual-funds': ['Mutual Fund'],
    'investments': ['Wealth Management', 'PMS / AIF', 'Fixed Deposit', 'Bonds'],
    'real-estate': ['Real Estate']
  };

  const commissionStructure = {
    'loans': [
      { name: 'Personal Loan', rate: '1.5% - 2.5%' },
      { name: 'Home Loan', rate: '0.4% - 0.75%' },
      { name: 'Business Loan', rate: '1.0% - 2.0%' },
      { name: 'SME / Mortgage', rate: '0.5% - 1.2%' }
    ],
    'insurance': [
      { name: 'Life Insurance', rate: '25% - 40% (FYP)' },
      { name: 'Health Insurance', rate: '15% - 20%' },
      { name: 'Motor Insurance', rate: '10% - 15% (OD)' },
      { name: 'Corporate/Marine', rate: '5% - 12%' }
    ],
    'mutual-funds': [
      { name: 'Equity Funds', rate: '0.5% - 1.2%' },
      { name: 'Debt Funds', rate: '0.1% - 0.4%' },
      { name: 'Hybrid Funds', rate: '0.3% - 0.8%' }
    ],
    'investments': [
      { name: 'Wealth Management', rate: '1.0% - 2.5%' },
      { name: 'PMS / AIF', rate: '1.5% - 3.0%' },
      { name: 'Bonds / FD', rate: '0.2% - 0.6%' }
    ],
    'real-estate': [
      { name: 'Residential', rate: '1.5% - 2.0%' },
      { name: 'Commercial', rate: '2.0% - 3.0%' },
      { name: 'Plots/Land', rate: '1.0% - 1.5%' }
    ]
  };

  // --- Calculation Logic ---
  const calculation = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const gross = numAmount * 0.02; // Assuming 2.00% avg commission
    const tds = gross * 0.05;      // 5% TDS
    const net = gross - tds;
    return {
      gross: gross.toLocaleString('en-IN'),
      tds: tds.toLocaleString('en-IN'),
      net: net.toLocaleString('en-IN'),
      percent: (numAmount > 0) ? "2.00%" : "0.00%"
    };
  }, [amount]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Main Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Incentives & Payouts</h1>
            <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Track your earnings, commissions, and payment status.</p>
          </div>
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm overflow-x-auto">
            {['Payout History', 'Commission Structure', 'Earnings Calculator'].map((label) => {
              const id = label.toLowerCase().replace(' ', '-') as TabType;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 text-sm font-semibold transition-all rounded-lg whitespace-nowrap ${
                    activeTab === id ? 'bg-[#1CADA3] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 p-2 rounded-lg"><Wallet className="w-5 h-5 text-green-500" /></div>
              <span className="font-medium text-slate-600 text-sm">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">₹ 0</div>
            
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2 rounded-lg"><Clock className="w-5 h-5 text-orange-500" /></div>
              <span className="font-medium text-slate-600 text-sm">Pending Payouts</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">₹ 0</div>
            
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg"><FileText className="w-5 h-5 text-blue-500" /></div>
              <span className="font-medium text-slate-600 text-sm">Processed This Month</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">₹ 0</div>
            
          </div>
        </div>

        {/* --- Payout History Table View --- */}
        {activeTab === 'payout-history' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8 animate-in fade-in duration-500">
            {/* Dark Search Bar / Action Header */}
            <div className="p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by Lead ID, Client or Payout ID..." 
                  className="w-full pl-12 pr-4 py-3 bg-white text-slate-500  border border-slate-200 rounded-lg outline-none text-sm placeholder:text-slate-400" 
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-2 px-5 py-2 border border-[#10b981] rounded-lg text-sm font-bold text-[#10b981] bg-white hover:bg-emerald-50 transition-all">
                  <Download className="w-4 h-4" /> Export Report
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-100 uppercase text-[11px] font-bold text-slate-500 tracking-wider">
                    <th className="px-6 py-4">Payout ID / Date</th>
                    <th className="px-6 py-4">Client Details</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4 text-center">Payment Mode</th>
                    <th className="px-6 py-4">Ref Number</th>
                    <th className="px-6 py-4">Net Payout</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {payoutData.length > 0 ? (
                    payoutData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-700">{row.payoutId}</div>
                          <div className="text-xs text-slate-400 mt-1">{row.date}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-700">{row.clientName}</div>
                          <div className="inline-block mt-1 px-2 py-0.5 bg-[#e6fcf5] text-[#0d9488] rounded text-[10px] font-bold border border-[#c3fae8]">
                            {row.leadId}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-medium text-slate-700">{row.product}</div>
                          <div className="text-xs text-slate-400">{row.category}</div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                            {row.paymentMode}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-mono text-xs text-slate-500 uppercase">{row.refNumber}</td>
                        <td className="px-6 py-5 font-bold text-[#0d9488]">₹{row.netPayout}</td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${row.status === 'Processed' ? 'bg-[#e6fcf5] text-[#0d9488] border border-[#c3fae8]' : 'bg-[#fff9db] text-[#f08c00] border border-[#fff3bf]'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex justify-center gap-3">
                            <button className="text-slate-400 hover:text-slate-600 transition-all"><Eye className="w-5 h-5" /></button>
                            <button className="text-slate-400 hover:text-slate-600 transition-all"><Download className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center opacity-40">
                          <Inbox className="w-12 h-12 text-slate-300 mb-3" />
                          <p className="text-slate-500 font-medium">No payout transactions found</p>
                          <p className="text-[11px] text-slate-400">Your recent earnings will appear here once processed.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Info Footer */}
            <div className="p-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-medium text-slate-400">Showing {payoutData.length} entries</span>
              <div className="flex gap-2">
                <button disabled className="px-4 py-1.5 text-xs font-bold border border-slate-200 rounded text-slate-300 cursor-not-allowed">Previous</button>
                <button disabled className="px-4 py-1.5 text-xs font-bold border border-slate-200 rounded text-slate-300 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        )}

        {/* --- Commission Structure View --- */}
        {activeTab === 'commission-structure' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Category Cards */}
            {(Object.keys(commissionStructure) as CategoryType[]).map((catKey) => {
              const Icon = catKey === 'loans' ? Landmark : catKey === 'insurance' ? ShieldCheck : catKey === 'mutual-funds' ? PieChart : catKey === 'investments' ? Briefcase : Building2;
              const colorClass = catKey === 'loans' ? 'blue' : catKey === 'insurance' ? 'purple' : catKey === 'mutual-funds' ? 'emerald' : catKey === 'investments' ? 'indigo' : 'orange';
              
              return (
                <div key={catKey} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                  <div className="p-5 border-b border-slate-50 flex items-center gap-3">
                    <div className={`p-2 bg-${colorClass}-50 rounded-lg`}><Icon className={`w-5 h-5 text-${colorClass}-600`} /></div>
                    <h3 className="font-bold text-slate-800 capitalize">{catKey.replace('-', ' ')} Commission</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {commissionStructure[catKey].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-600 font-medium text-sm">{item.name}</span>
                        <span className="font-bold text-slate-800 text-sm">{item.rate}</span>
                      </div>
                    ))}
                    {catKey === 'loans' && (
                      <div className="mt-4 flex gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-blue-800 leading-relaxed italic">Rates may vary based on bank tie-ups. Tiered incentives apply for volumes {'>'} 1Cr.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- Earnings Calculator View --- */}
        {activeTab === 'earnings-calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 animate-in fade-in duration-500">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-emerald-50 rounded-xl"><Calculator className="w-6 h-6 text-emerald-600" /></div>
                <div><h3 className="font-bold text-slate-800 text-lg">Earnings Estimator</h3><p className="text-sm text-slate-400">Plan your next lead conversion</p></div>
              </div>
              <div className="space-y-8">
                {/* Lead Category Toggle */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-4 block tracking-wider">Lead Category</label>
                  <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {(['loans', 'insurance', 'mutual-funds', 'investments', 'real-estate'] as CategoryType[]).map((cat) => (
                      <button key={cat} onClick={() => { setLeadCategory(cat); setSelectedProduct(''); }} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${leadCategory === cat ? 'bg-white text-[#10b981] shadow-md border border-emerald-50' : 'text-slate-500 hover:text-slate-700'}`}>{cat.replace('-', ' ')}</button>
                    ))}
                  </div>
                </div>
                {/* Product Dropdown */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Select Product</label>
                  <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.67%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat text-gray-700 transition-all">
                    <option value="">-- Choose Product --</option>
                    {productMapping[leadCategory].map((prod) => <option key={prod} value={prod}>{prod}</option>)}
                  </select>
                </div>
                {/* Input Amount */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">{leadCategory === 'insurance' ? 'Annual Premium (₹)' : 'Amount (₹)'}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-all"><IndianRupee className="w-5 h-5" /></div>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 5,00,000" className="w-full pl-12 pr-4 py-4 bg-white text-slate-500 border border-slate-200 rounded-2xl font-bold text-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-[#10b981] outline-none transition-all placeholder:text-slate-500" />
                  </div>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3"><Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /><p className="text-[11px] text-blue-700 leading-relaxed italic">Calculations based on average commission rates. Payouts may vary based on financial institution and profile.</p></div>
              </div>
            </div>

            {/* --- Conditional Pop-up Result Card --- */}
            <div className="lg:col-span-5 flex flex-col gap-6 min-h-[400px]">
              {amount ? (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full animate-in zoom-in-95 duration-300">
                  <div className="bg-[#1CADA3] p-8 text-white relative">
                    <div className="relative z-10"><p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2">Estimated Net Payout</p><div className="text-5xl font-extrabold flex items-start gap-1"><span className="text-3xl mt-1.5 font-bold">₹</span>{calculation.net}</div><div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm"><TrendingUp className="w-4 h-4" />@ {calculation.percent} avg commission</div></div>
                  </div>
                  <div className="p-8 space-y-8 flex-grow">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                      <div><p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gross Earnings</p><p className="text-2xl font-bold text-slate-800">₹{calculation.gross}</p></div>
                      <div className="text-right"><p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">TDS (5%)</p><p className="text-xl font-bold text-[#ef4444]">-₹{calculation.tds}</p></div>
                    </div>
                    <div><div className="flex justify-between items-center mb-3"><p className="text-sm font-bold text-slate-700">Projected Milestone</p><span className="text-xs font-bold text-[#1CADA3]">65%</span></div><div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#1CADA3] rounded-full" style={{ width: '65%' }}></div></div><p className="text-[11px] text-slate-400 italic mt-3">This deal covers 65% of your weekly target!</p></div>
                    <button className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg">Apply for this Lead Now <ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center opacity-60">
                   <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4"><Calculator className="w-8 h-8 text-slate-300" /></div>
                   <h3 className="text-lg font-bold text-slate-700 mb-2">Ready to Calculate?</h3>
                   <p className="text-slate-400 text-sm max-w-[240px]">Enter the transaction amount on the left to see your potential earnings instantly.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}