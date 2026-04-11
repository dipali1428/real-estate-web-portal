'use client';
import { useState, useMemo, useEffect } from 'react';
import { 
  IndianRupee, Search, Filter, Download, 
  Wallet, Clock, Calculator, ChevronRight, TrendingUp,
  Building2, ShieldCheck, PieChart, Briefcase, Landmark,
  Inbox, Users, Coins
} from 'lucide-react';
import { DashboardService } from '@/app/services/dashboardService';

// --- Types ---
type TabType = 'payout-history' | 'commission-structure' | 'earnings-calculator';
type SubTabType = 'detail' | 'referral';
type CategoryType = 'loans' | 'insurance' | 'mutual-funds' | 'investments' | 'real-estate';

interface PayoutRecord {
  Id: string;
  payoutId: string;
  date: string;
  clientName: string;
  leadId: string;
  product: string;
  category: string;
  paymentMode: string;
  refNumber: string;
  gstAmount?: string;
  invoiceDate?: string;
  invoiceNumber?: string;
  netPayout: string;
  tdsAmount: string;
  amount: string;
  grossAmount: string;
  status: 'Completed' | 'Pending';
  loanNumber?: string;
  policyNumber?: string;
  payout_date?: string;
  lead_name?: string;
  lead_status?: string;
  tds_amount?: string;
}

export default function IncentivesPayouts() {
  const [activeTab, setActiveTab] = useState<TabType>('payout-history');
  const [historySubTab, setHistorySubTab] = useState<SubTabType>('detail');
  const [leadCategory, setLeadCategory] = useState<CategoryType>('loans');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // --- State for API Data ---
  const [payoutData, setPayoutData] = useState<PayoutRecord[]>([]);
  const [referralPayoutData, setReferralPayoutData] = useState<PayoutRecord[]>([]);

  const formatValue = (val: any) => {
    if (!val) return "";
    return val.toString().replace(/"/g, "").trim();
  };

  // --- CSV Export Functionality ---
  const handleExport = () => {
    const dataToExport = historySubTab === 'detail' ? payoutData : referralPayoutData;
    
    if (dataToExport.length === 0) return;

    // Define CSV Headers
    const headers = [
      "ID", "Payout ID", "Date", "Client Name", "Lead ID", "Product", 
      "Category", "Ref Number", "Payment Mode", "Status", "Amount", 
      "Gross Amount", "TDS", "GST", "Net Payout", "Invoice Number"
    ];

    // Convert data to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...dataToExport.map(row => [
        row.Id,
        row.payoutId,
        row.date,
        `"${row.clientName}"`, // Quote strings to handle commas
        row.leadId,
        `"${row.product}"`,
        row.category,
        row.refNumber,
        row.paymentMode,
        row.status,
        row.amount,
        row.grossAmount,
        row.tdsAmount.replace(/,/g, ''), // Remove commas for clean numbers
        row.gstAmount,
        row.netPayout.replace(/,/g, ''),
        row.invoiceNumber
      ].join(','))
    ];

    // Create Blob and Trigger Download
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${historySubTab}_payout_report_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Fetch API Data ---
  useEffect(() => {
    const loadPayouts = async () => {
      try {
        setIsLoading(true);
        const response = await DashboardService.getCompletedDetailLeads();
        const refResponse: any = []; 

        const mapData = (raw: any) => {
          const rawList = Array.isArray(raw) ? raw : (raw?.leads || raw?.data || []);
          return rawList.map((item: any) => ({
            Id: item.id || 'N/A',
            payoutId: item.payout_id || `PAY-${item._id?.slice(-5).toUpperCase() || Math.random().toString(36).substr(2, 5)}`,
            date: item.payout_date ? new Date(item.payout_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
            clientName: item.lead_name || 'N/A',
            leadId: item.detail_lead_id || 'N/A',
            product: item.product_type || item.sub_category || 'N/A',
            category: item.department?.toLowerCase() || 'N/A',
            paymentMode: item.payment_mode || 'N/A',
            refNumber: item.payout_details?.transaction_id || 'N/A',
            gstAmount: item.gst_amount || '0',
            invoiceDate: item.invoice_date || 'N/A',
            invoiceNumber: item.invoice_number || 'N/A',
            netPayout: item.net_payout_amount?.toLocaleString() || '0',
            status: item.lead_status || 'Pending',
            loanNumber: item.policy_number || 'N/A',
            policyNumber: item.form_data?.policy_number || 'N/A',
            tdsAmount: item.tds_amount?.toLocaleString() || '0',
            amount: item.disbursement_amount || '0',
            grossAmount: item.gross_payout_amount || '0',
          }));
        };

        setPayoutData(mapData(response));
        setReferralPayoutData(mapData(refResponse));
      } catch (error) {
        console.error("Failed to fetch payouts", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPayouts();
  }, []);

  const stats = useMemo(() => {
    const detailSum = payoutData.reduce((acc, curr) => acc + (parseFloat(curr.netPayout.replace(/,/g, '')) || 0), 0);
    const referralSum = referralPayoutData.reduce((acc, curr) => acc + (parseFloat(curr.netPayout.replace(/,/g, '')) || 0), 0);
    return {
      totalEarnings: (detailSum + referralSum).toLocaleString(),
      detailEarnings: detailSum.toLocaleString(),
      referralEarnings: referralSum.toLocaleString(),
      detailCount: payoutData.length,
      referralCount: referralPayoutData.length
    };
  }, [payoutData, referralPayoutData]);

  const currentTableData = historySubTab === 'detail' ? payoutData : referralPayoutData;

  const productMapping: Record<CategoryType, string[]> = {
    'loans': ['Home Loan', 'Personal Loan', 'Vehicle Loan', 'SME Loan', 'Mortgage Loan', 'Business Loan', 'Loan Against Securities', 'Education Loan'],
    'insurance': ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance', 'Fire Insurance', 'Cattle Insurance', 'Marine Insurance', 'Corporate Insurance', 'Loan Protector'],
    'mutual-funds': ['Mutual Fund'],
    'investments': ['PMS', 'AIF', 'Fixed Deposit', 'Bonds'],
    'real-estate': ['Fractional']
  };

  const commissionStructure = {
    'loans': [{ name: 'Personal Loan', rate: '1.5% - 2.5%' }, { name: 'Home Loan', rate: '0.4% - 0.88%' }, { name: 'Business Loan', rate: '1.0% - 2.0%' }, { name: 'Commercial / Mortgage', rate: '1.04% - 1.44%' }, { name: 'SME Loan', rate: '1.2% - 2.0%' }, { name: 'Education Loan', rate: '0.40% - 0.96%' }, { name: 'Vehicle Loan', rate: '0.75% - 1.5%' }, { name: 'NRP Loan', rate: '0.75% - 1.5%' }, { name: 'Loan Against Securities', rate: '0.5% - 1.2%' }],
    'insurance': [{ name: 'Life Insurance', rate: '2% - 56%' }, { name: 'Health Insurance', rate: '3% - 32%' }, { name: 'Motor Insurance', rate: '0.5% - 50%' }, { name: 'Travel Insurance', rate: '22% - 40%' }, { name: 'Fire Insurance', rate: '6% - 28%' }, { name: 'Cattle Insurance', rate: '12%' }, { name: 'Marine Insurance', rate: '8% - 22%' }, { name: 'Corporate Insurance', rate: '5%' }, { name: 'Loan Protector', rate: '23% - 35%' }],
    'mutual-funds': [{ name: 'Equity Funds', rate: '0.5% - 0.8%' }, { name: 'Debt Funds', rate: '0.1% - 0.4%' }, { name: 'Hybrid Funds', rate: '0.3% - 0.8%' }],
    'investments': [{ name: 'NCD Bonds', rate: '0.40% - 1.40%' }, { name: 'FD', rate: '0.10% - 1.52%' }, { name: 'Bonds', rate: '0.12% - 0.30%' }],
    'real-estate': [{ name: 'Fractional', rate: '0.5% - 1.5%' }]
  };

  const calculation = useMemo(() => {
    const receivableAmount = parseFloat(amount) || 0;
    const productInfo = commissionStructure[leadCategory].find(p => p.name === selectedProduct);
    const rates = (productInfo?.rate.match(/\d+(\.\d+)?/g) || [0]).map(Number);
    const avgRatePercent = rates.reduce((a, b) => a + b, 0) / rates.length;
    const grossAmount = receivableAmount * (avgRatePercent / 100);
    const tdsAmount = grossAmount * 0.02;
    return {
      gross: grossAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      tds: tdsAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      net: (grossAmount - tdsAmount).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      percent: avgRatePercent.toFixed(2) + "%"
    };
  }, [amount, leadCategory, selectedProduct]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 p-2 rounded-lg"><Wallet className="w-5 h-5 text-green-500" /></div>
              <span className="font-medium text-slate-600 text-xs">Total Earnings</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">₹ {stats.totalEarnings}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg"><Coins className="w-5 h-5 text-blue-500" /></div>
              <span className="font-medium text-slate-600 text-xs">Detail Lead Earnings</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">₹ {stats.detailEarnings}</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Leads: {stats.detailCount}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-50 p-2 rounded-lg"><Users className="w-5 h-5 text-purple-500" /></div>
              <span className="font-medium text-slate-600 text-xs">Referral Lead Earnings</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">₹ {stats.referralEarnings}</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Leads: {stats.referralCount}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2 rounded-lg"><Clock className="w-5 h-5 text-orange-500" /></div>
              <span className="font-medium text-slate-600 text-xs">Pending Payouts</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">₹ 0</div>
          </div>
        </div>

        {activeTab === 'payout-history' && (
          <div className="space-y-4 mt-8">
            <div className="flex gap-4 border-b border-slate-200">
              <button onClick={() => setHistorySubTab('detail')} className={`pb-3 text-sm font-bold transition-all px-2 ${historySubTab === 'detail' ? 'text-[#1CADA3] border-b-2 border-[#1CADA3]' : 'text-slate-400 hover:text-slate-600'}`}>Detail Lead Table</button>
              <button onClick={() => setHistorySubTab('referral')} className={`pb-3 text-sm font-bold transition-all px-2 ${historySubTab === 'referral' ? 'text-[#1CADA3] border-b-2 border-[#1CADA3]' : 'text-slate-400 hover:text-slate-600'}`}>Referral Lead Table</button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" placeholder={`Search ${historySubTab === 'detail' ? 'Detail' : 'Referral'} Leads...`} className="w-full pl-12 pr-4 py-3 bg-white text-slate-500 border border-slate-200 rounded-lg outline-none text-sm" />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-5 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all"><Filter className="w-4 h-4" /> Filter</button>
                  <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2 border border-[#10b981] rounded-lg text-sm font-bold text-[#10b981] bg-white hover:bg-emerald-50 transition-all">
                    <Download className="w-4 h-4" /> Export Report
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto min-h-[300px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1CADA3]"></div></div>
                ) : currentTableData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-slate-400"><Inbox className="w-12 h-12 mb-2 opacity-20" /><p>No {historySubTab} history found</p></div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-y border-slate-100 uppercase text-[11px] font-bold text-slate-500 tracking-wider">
                        <th className="px-6 py-4">ID</th><th className="px-6 py-4">Payout ID / Date</th><th className="px-6 py-4">Client Details</th><th className="px-6 py-4">Product</th><th className="px-6 py-4">reference No</th><th className="px-6 py-4 text-center">Payment Mode</th><th className="px-6 py-4 text-center">Status</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Gross Amount</th><th className="px-6 py-4 text-center">TDS</th><th className="px-6 py-4">GST</th><th className="px-6 py-4">Net Payout</th><th className="px-6 py-4">Invoice Number</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {currentTableData.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-5"><div className="font-medium text-slate-700">{row.Id}</div></td>
                          <td className="px-6 py-5"><div className="font-bold text-slate-700">{row.payoutId}</div><div className="text-xs text-slate-400 mt-1">{row.date}</div></td>
                          <td className="px-6 py-5"><div className="font-bold text-slate-700">{row.clientName}</div><div className="text-xs text-slate-400 mt-1">{row.leadId}</div></td>
                          <td className="px-6 py-5"><div className="font-medium text-slate-700">{row.product}</div><div className="text-xs text-slate-400 text-capitalize">{row.category}</div></td>
                          <td className="px-6 py-5"><div className="font-medium text-slate-700">{formatValue(row.loanNumber)}</div></td>
                          <td className="px-6 py-5 text-center"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{row.paymentMode}</span></td>
                          <td className="px-6 py-5 text-center"><span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${row.status === 'Completed' ? 'bg-[#e6fcf5] text-[#0d9488] border border-[#c3fae8]' : 'bg-green-50 text-[#1CADA3] border border-green-200'}`}>{row.status}</span></td>
                          <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.amount).replace(/\.0+$/, "")}</td>
                          <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.grossAmount).replace(/\.0+$/, "")}</td>
                          <td className="px-6 py-5"><div className="font-medium text-slate-700">₹{formatValue(row.tdsAmount).replace(/\.0+$/, "")}</div></td>
                          <td className="px-6 py-5"><div className="font-medium text-slate-700">₹{row.gstAmount}</div></td>
                          <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.netPayout).replace(/\.0+$/, "")}</td>
                          <td className="px-6 py-5"><div className="font-medium text-slate-700">{row.invoiceNumber}</div><div className="text-xs text-slate-400">{row.invoiceDate}</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- Commission & Calculator sections remain exactly as provided --- */}
        {activeTab === 'commission-structure' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8 animate-in slide-in-from-bottom-4 duration-500">
            {(Object.keys(commissionStructure) as CategoryType[]).map((catKey) => {
              const Icon = catKey === 'loans' ? Landmark : catKey === 'insurance' ? ShieldCheck : catKey === 'mutual-funds' ? PieChart : catKey === 'investments' ? Briefcase : Building2;
              const colorClass = catKey === 'loans' ? 'blue' : catKey === 'insurance' ? 'purple' : catKey === 'mutual-funds' ? 'emerald' : catKey === 'investments' ? 'indigo' : 'orange';
              return (
                <div key={catKey} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit flex flex-col">
                  <div className="p-5 border-b border-slate-50 flex items-center gap-3">
                    <div className={`p-2 bg-${colorClass}-50 rounded-lg`}><Icon className={`w-5 h-5 text-${colorClass}-600`} /></div>
                    <h3 className="font-bold text-slate-800 capitalize">{catKey.replace('-', ' ')} Commission</h3>
                  </div>
                  <div className="p-6 space-y-3 flex-grow">
                    {commissionStructure[catKey].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-600 font-medium text-sm">{item.name}</span>
                        <span className="font-bold text-slate-800 text-sm">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'earnings-calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-emerald-50 rounded-xl"><Calculator className="w-6 h-6 text-emerald-600" /></div>
                <h3 className="font-bold text-slate-800 text-lg">Earnings Estimator</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-4 block tracking-wider">Lead Category</label>
                  <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    {(['loans', 'insurance', 'mutual-funds', 'investments', 'real-estate'] as CategoryType[]).map((cat) => (
                      <button key={cat} onClick={() => { setLeadCategory(cat); setSelectedProduct(''); setAmount(''); }} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${leadCategory === cat ? 'bg-white text-[#10b981] shadow-md border border-emerald-50' : 'text-slate-500 hover:text-slate-700'}`}>{cat.replace('-', ' ')}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Select Product</label>
                    <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.67%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat text-gray-700">
                      <option value="">-- Choose Product --</option>
                      {productMapping[leadCategory].map((prod) => <option key={prod} value={prod}>{prod}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">{leadCategory === 'insurance' ? 'Net Premium (₹)' : 'Receivable Amount (₹)'}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-all"><IndianRupee className="w-5 h-5" /></div>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1,00,000" className="w-full pl-12 pr-4 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-[#10b981] outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6 min-h-[400px]">
              {amount ? (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full animate-in zoom-in-95 duration-300">
                  <div className="bg-[#1CADA3] p-8 text-white relative">
                    <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2">Estimated Net Payout</p>
                    <div className="text-5xl font-extrabold flex items-start gap-1"><span className="text-3xl mt-1.5 font-bold">₹</span>{calculation.net}</div>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm"><TrendingUp className="w-4 h-4" />@ {calculation.percent} avg commission</div>
                  </div>
                  <div className="p-8 space-y-8 flex-grow">
                    <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                      <div><p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gross Earnings</p><p className="text-2xl font-bold text-slate-800">₹{calculation.gross}</p></div>
                      <div className="text-right"><p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">TDS (2%)</p><p className="text-xl font-bold text-[#ef4444]">-₹{calculation.tds}</p></div>
                    </div>
                    <button className="w-full bg-[#2076C7] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#1CADA3] transition-all shadow-lg">Process Deal <ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center opacity-60">
                   <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4"><Calculator className="w-8 h-8 text-slate-300" /></div>
                   <h3 className="text-lg font-bold text-slate-700 mb-2">Ready to Calculate?</h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}