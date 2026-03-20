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
  const [userProfile, setUserProfile] = useState<any>(null); // State for Profile Info

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
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // 1. Fetch Profile Data
        try {
          const profileRes = await DashboardService.getProfile();
          setUserProfile({
            name: profileRes?.user?.name || 'Authorized Partner',
            address: profileRes?.kycDetails?.aadhaar_kyc_data?.full_address || profileRes?.user?.city || '',
            pan: profileRes?.user?.pan || '',
            gst: profileRes?.kycDetails?.gst_number || profileRes?.user?.gst_number || ''
          });
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }

        // 2. Fetch Payouts Data
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

    loadData();
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
   UPDATED INVOICE DOWNLOAD FUNCTION
   =============================== */
const downloadInvoice = (payoutId: string) => {
  const groupedRecords = payoutData.filter(item => item.payoutId === payoutId);
  if (groupedRecords.length === 0) return;

  // VARIABLE FOR THE STAMP IMAGE URL
  const stampUrl = "https://infinity-client-documents.s3.ap-south-1.amazonaws.com/Infinity-Arthvishva-Stamp.png";

  const baseRecord = groupedRecords[0];

  const parseAmount = (val: any) => parseFloat(val?.toString().replace(/,/g, '') || '0');
  const totalGross = groupedRecords.reduce((acc, item) => acc + parseAmount(item.grossAmount), 0);
  const totalGst = groupedRecords.reduce((acc, item) => acc + parseAmount(item.gstAmount), 0);
  const totalTds = groupedRecords.reduce((acc, item) => acc + parseAmount(item.tdsAmount), 0);
  const totalNet = groupedRecords.reduce((acc, item) => acc + parseAmount(item.netPayout), 0);

  const rowsHtml = groupedRecords.map((data, index) => `
    <tr>
      <td>${index + 1}</td>
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
  `).join('');

  const invoiceHtml = `
<html>
<head>
<title>Tax Invoice</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');

body{font-family: Arial, Helvetica, sans-serif; padding:20px; color:#333; background-color:#f5f5f5;}
.invoice-container{
  width:900px; margin:auto; border: 1px solid #ddd; padding: 40px; background: #fff;
  box-sizing: border-box; min-height: 1100px; position: relative; display: flex; flex-direction: column;
}
.header-top {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
}

.company-logo {
  height: 60px; 
  width: auto;
  object-fit: contain;
}

.header h1{margin:0; font-size:22px; text-transform: uppercase; color: #1e3a8a; letter-spacing: 1px;}
.top-table{width:100%; font-size:12px; line-height:1.6; margin-bottom: 20px;}
.meta{margin-bottom:20px; font-size:12px; border-bottom: 1px solid #eee; padding-bottom: 10px;}
.main-table{width:100%; border-collapse:collapse; margin-top:10px; font-size:11px;}
.main-table th{background:#f8fafc; border:1px solid #e2e8f0; padding:10px; text-align:left; color: #64748b;}
.main-table td{border:1px solid #e2e8f0; padding:10px;}

/* CLEAN SUMMARY TABLE STYLE */
.bottom-table{width:100%; margin-top:30px;}
.summary-table {
  width: 320px; 
  border-collapse: collapse; 
  font-size: 13px;
  border: 1px solid #e2e8f0;
}
.summary-table td {
  padding: 10px 15px;
  border-bottom: 1px solid #f1f5f9;
}
.summary-table .total-row {
  background-color: #f8fafc;
  font-weight: bold;
  font-size: 15px;
  color: #1e3a8a;
  border-top: 2px solid #1e3a8a;
}
.tds-color { color: #ef4444; }

.footer-section {
  margin-top: auto; padding-top: 40px; border-top: 1px solid #eee;
}

.auth-container {
  display: flex; justify-content: flex-end; position: relative; height: 150px;
}

.signature-box {
  text-align: center; width: 250px; z-index: 2;
}

.signature-name {
  font-family: 'Dancing Script', cursive; font-size: 26px; color: #1e3a8a; margin-bottom: 5px;
}

/* LARGE OVERLAPPING STAMP */
.stamp-image {
  position: absolute;
  right: 120px; 
  bottom: 10px;
  width: 180px; 
  height: auto;
  opacity: 0.85; 
  transform: rotate(-12deg); 
  z-index: 1; 
  mix-blend-mode: multiply; 
  pointer-events: none;
}

.footer-note {
  text-align: center; margin-top: 30px; font-size: 11px; color: #94a3b8;
}

@media print {
  body { background: none; padding: 0; }
  .invoice-container { border: none; margin: 0; width: 100%; }
}
</style>
</head>
<body>
<div class="invoice-container">
<div class="header-top">
    <div class="logo-container">
      <img src="/logo.png" alt="Company Logo" class="company-logo" />
    </div>
    <div class="header"><h1>Tax Invoice</h1></div>
</div>

<table class="top-table">
<tr>
<td width="50%" style="vertical-align: top;">
<span style="color: #64748b; font-weight: bold;">FROM:</span><br/>
<strong style="font-size: 14px;">${userProfile?.name || 'Authorized Partner'}</strong><br/>
${userProfile?.address || ''}<br/>
${userProfile?.pan ? `PAN: ${userProfile.pan}` : ''}<br/>
${userProfile?.gst ? `GSTIN: ${userProfile.gst}` : ''}
</td>
<td width="50%" style="vertical-align: top; text-align: right;">
<span style="color: #64748b; font-weight: bold;">BILL TO:</span><br/>
<strong style="font-size: 14px;">Infinity Arthvishva Advisory Private Limited</strong><br/>
12th Floor, 1201, 7 Business Square, Shivaji Nagar, Pune, 411005<br/>
GSTIN: 27AAICI0723K1ZJ | PAN: AAICI0723K
</td>
</tr>
</table>

<div class="meta">
  <div style="display: flex; justify-content: space-between;">
    <span><b>Invoice:</b> ${baseRecord.invoiceNumber}</span>
    <span><b>Date:</b> ${baseRecord.invoiceDate}</span>
    <span><b>Payout ID:</b> ${baseRecord.payoutId}</span>
  </div>
</div>

<table class="main-table">
<thead>
<tr>
<th>#</th><th>Lead ID</th><th>Client Name</th><th>Product</th><th>Ref No</th><th>Mode</th><th>Amount</th><th>Gross</th><th>TDS</th><th>GST</th><th>Net</th>
</tr>
</thead>
<tbody>${rowsHtml}</tbody>
</table>

<!-- CLEAN SUMMARY TABLE ON LEFT -->
<div class="bottom-table">
  <table class="summary-table">
    <tr>
      <td>Subtotal</td>
      <td align="right">₹ ${totalGross.toLocaleString('en-IN')}</td>
    </tr>
    <tr>
      <td>GST</td>
      <td align="right">₹ ${totalGst.toLocaleString('en-IN')}</td>
    </tr>
    <tr>
      <td>TDS (deducted)</td>
      <td align="right" class="tds-color">- ₹ ${totalTds.toLocaleString('en-IN')}</td>
    </tr>
    <tr class="total-row">
      <td>TOTAL PAYABLE</td>
      <td align="right">₹ ${totalNet.toLocaleString('en-IN')}</td>
    </tr>
  </table>
</div>

<div class="footer-section">
  <div class="auth-container">
    <!-- USING THE stampUrl VARIABLE HERE -->
    <img src="${stampUrl}" alt="Stamp" class="stamp-image" />
    
    <div class="signature-box">
      <div class="signature-name">Rajesh Parkhi</div>
      <div style="border-top: 1px solid #333; padding-top: 5px;">
        <small><b>Authorized Signatory</b></small><br/>
        <small>Infinity Arthvishva Advisory Pvt Ltd</small>
      </div>
    </div>
  </div>
  <div class="footer-note">This is a computer-generated document and is valid without a physical signature.</div>
</div>

</div>
<script>window.onload = function(){ window.print(); window.onafterprint = function(){ window.close(); } }</script>
</body>
</html>
`;

  const win = window.open("", "", "width=1000,height=800");
  win?.document.write(invoiceHtml);
  win?.document.close();
}
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Invoice Download</h1>
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
                          onClick={() => downloadInvoice(row.payoutId)}
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