'use client';
import { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, Download, Wallet, Clock, FileText, Inbox
} from 'lucide-react';
import { DashboardService } from '@/app/services/dashboardService';

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

export default function PayoutHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [payoutData, setPayoutData] = useState<PayoutRecord[]>([]);

  // Format helper used by both Table and Invoice
  const formatValue = (val: any, stripDecimals = false) => {
    if (!val) return "";
    let str = val.toString().replace(/^"|"$/g, "").replace(/"/g, "").trim();
    if (stripDecimals) {
      return str.split('.')[0];
    }
    return str;
  };

  useEffect(() => {
    const loadPayouts = async () => {
      try {
        setIsLoading(true);
        const response = await DashboardService.getCompletedDetailLeads();
        console.log("Raw API Response for Payouts:", response);
        
        const rawList = Array.isArray(response) 
          ? response 
          : (response?.leads || response?.data || []);

        if (!Array.isArray(rawList)) {
          throw new Error("Invalid data format received");
        }

        const mappedData: PayoutRecord[] = rawList.map((item: any) => ({
          Id: item.id || 'N/A',
          payoutId: item.payout_id || `PAY-${item._id?.slice(-5).toUpperCase() || Math.random().toString(36).substr(2, 5)}`,
          date: item.payout_date? new Date(item.payout_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
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

        setPayoutData(mappedData);
      } catch (error) {
        console.error("Failed to fetch payouts", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPayouts();
  }, []);

  const stats = useMemo(() => {
    const total = payoutData.reduce((acc, curr) => {
      const val = parseFloat(curr.netPayout.replace(/,/g, '')) || 0;
      return acc + val;
    }, 0);
    return {
      totalEarnings: total.toLocaleString(),
      processedCount: payoutData.length
    };
  }, [payoutData]);

/* ===============================
   INVOICE DOWNLOAD FUNCTION
   =============================== */
const downloadInvoice = (data: PayoutRecord) => {

const invoiceHtml = `
<html>
<head>
<title>Tax Invoice</title>
<style>
body{font-family: Arial, Helvetica, sans-serif;padding:40px;color:#333;}
.invoice-container{width:900px;margin:auto;}
.header{text-align:center;margin-bottom:20px;}
.header h1{margin:0;font-size:26px;}
.top-table{width:100%;font-size:13px;line-height:20px;}
.meta{margin-top:15px;font-size:13px;}
.main-table{width:100%;border-collapse:collapse;margin-top:20px;font-size:12px;}
.main-table th{background:#f2f2f2;border:1px solid #ccc;padding:8px;text-align:left;}
.main-table td{border:1px solid #ccc;padding:8px;}
.bottom-table{width:100%;margin-top:40px;font-size:13px;}
.bottom-table td{vertical-align:top;}
.summary-table{width:100%;}
.summary-table td{padding:4px 0;}
.total{font-weight:bold;border-top:2px solid #000;padding-top:6px;font-size:14px;}
.footer{margin-top:60px;display:flex;justify-content:space-between;font-size:13px;}
.signature{text-align:right;margin-top:50px;}
</style>
</head>
<body>
<div class="invoice-container">
<div class="header"><h1>Tax Invoice</h1></div>
<table class="top-table">
<tr>
<td width="50%">
<b>From</b><br/>
Infinity Arthvishva Advisory Private Limited<br/>
12th Floor,1201,7 Business Square,Plot No 487,CTS 1108/7,<br/>
Ganeshkhind Road,Pune Central,Shivaji Nagar,<br/>
Pune,Maharashtra,411005<br/>
GSTIN : 27AAICI0723K1ZJ PAN: AAICI0723K
</td>
<td width="50%">
<b>To</b><br/>
${data.clientName}<br/>
Lead ID : ${data.leadId}<br/>
Product : ${data.product}<br/>
Payout ID: ${data.payoutId}
</td>
</tr>
</table>

<div class="meta">
<b>Invoice Number:</b> ${data.invoiceNumber} <br/>
<b>Invoice Date:</b> ${data.invoiceDate}
</div>

<table class="main-table">
<thead>
<tr>
<th>#</th>
<th>Lead ID</th>
<th>Client Name</th>
<th>Product</th>
<th>Reference No</th>
<th>Payment Mode</th>
<th>Amount</th>
<th>Gross</th>
<th>TDS</th>
<th>GST</th>
<th>Net</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>${data.leadId}</td>
<td>${data.clientName}</td>
<td>${data.product}</td>
<td>${formatValue(data.loanNumber)}</td>
<td>${data.paymentMode}</td>
<td>₹ ${formatValue(data.amount, true)}</td>
<td>₹ ${formatValue(data.grossAmount, true)}</td>
<td>₹ ${formatValue(data.tdsAmount, true)}</td>
<td>₹ ${formatValue(data.gstAmount)}</td>
<td>₹ ${formatValue(data.netPayout, true)}</td>
</tr>
</tbody>
</table>

<table class="bottom-table">
<tr>
<td width="50%">
<b>Payment Information</b><br/><br/>
Beneficiary Name : Infinity Arthvishva Advisory Pvt Ltd<br/>
Bank Name : IndusInd Bank Ltd<br/>
Account Number : 251-026-041988<br/>
IFSC Code : INDB0000380
</td>
<td width="50%">
<table class="summary-table">
<tr><td>Taxable Amount</td><td align="right">₹ ${formatValue(data.grossAmount, true)}</td></tr>
<tr><td>GST</td><td align="right">₹ ${formatValue(data.gstAmount)}</td></tr>
<tr><td>TDS</td><td align="right">- ₹ ${formatValue(data.tdsAmount, true)}</td></tr>
<tr class="total"><td>Payable Amount</td><td align="right">₹ ${formatValue(data.netPayout, true)}</td></tr>
</table>
</td>
</tr>
</table>

<div class="footer">
<div><b>Note</b><br/>This is a system generated invoice.</div>
<div class="signature">Authorized Signatory<br/><br/>Infinity Arthvishva Advisory Pvt Ltd</div>
</div>
</div>
<script>window.onload = function(){ window.print(); }</script>
</body>
</html>
`;

const win = window.open("", "", "width=1000,height=800");
win?.document.write(invoiceHtml);
win?.document.close();
};


  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Invoice download</h1>
          <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Track your payment status and download your invoices specifically.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 p-2 rounded-lg"><Wallet className="w-5 h-5 text-green-500" /></div>
              <span className="font-medium text-slate-600 text-sm">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">₹ {stats.totalEarnings}</div>
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
              <span className="font-medium text-slate-600 text-sm">Processed Deals</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{stats.processedCount}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8">
          <div className="overflow-x-auto min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1CADA3]"></div>
              </div>
            ) : payoutData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Inbox className="w-12 h-12 mb-2 opacity-20" />
                <p>No payout history found</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-100 uppercase text-[11px] font-bold text-slate-500 tracking-wider">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Payout ID / Date</th>
                    <th className="px-6 py-4">Client Details</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">reference No</th>
                    <th className="px-6 py-4 text-center">Payment Mode</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Gross Amount</th>
                    <th className="px-6 py-4 text-center">TDS</th>
                    <th className="px-6 py-4">GST</th>
                    <th className="px-6 py-4">Net Payout</th>
                    <th className="px-6 py-4">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {payoutData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5 text-gray-500">{row.Id}</td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-700">{row.payoutId}</div>
                        <div className="text-xs text-slate-400 mt-1">{row.date}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-700">{row.clientName}</div>
                        <div className="text-xs text-slate-400 mt-1">{row.leadId}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-medium text-slate-700">{row.product}</div>
                        <div className="text-xs text-slate-400">{row.category}</div>
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {formatValue(row.loanNumber)}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                          {row.paymentMode}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#e6fcf5] text-[#0d9488] border border-[#c3fae8]">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.amount, true)}</td>
                      <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.grossAmount, true)}</td>
                      <td className="px-6 py-5 text-gray-600">₹{formatValue(row.tdsAmount, true)}</td>
                      <td className="px-6 py-5 text-gray-600">₹{formatValue(row.gstAmount)}</td>
                      <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.netPayout, true)}</td>
                      <td className="px-6 py-5">
                        <div className="text-xs text-slate-400">{row.invoiceNumber}</div>
                        <div className="text-xs text-slate-400">{row.invoiceDate}</div>
                        <button
                          onClick={() => downloadInvoice(row)}
                          className="mt-2 text-xs px-3 py-1 bg-[#10b981] text-white rounded"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}