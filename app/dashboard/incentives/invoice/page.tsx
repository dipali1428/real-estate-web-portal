'use client';
import { useState, useMemo, useEffect } from 'react';
import {
  Search, Filter, Download, Wallet, Clock, FileText, Inbox, Eye, X
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
  transaction_reference_no?: string;
}

export default function PayoutHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [payoutData, setPayoutData] = useState<PayoutRecord[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayoutId, setSelectedPayoutId] = useState<string | null>(null);

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

        const response = await DashboardService.getCompletedDetailLeads();
        console.log("Raw API Response:", response);
        const rawList = Array.isArray(response) ? response : (response?.leads || response?.data || []);

        const mappedData: PayoutRecord[] = rawList.map((item: any) => ({
          Id: item.id || 'N/A',
          payoutId: item.payout_id || `PAY-${item._id?.slice(-5).toUpperCase() || Math.random().toString(36).substr(2, 5)}`,
          date: item.payout_date ? new Date(item.payout_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
          clientName: item.lead_name || 'N/A',
          leadId: item.detail_lead_id || 'N/A',
          product: item.product_type || item.sub_category || 'N/A',
          category: item.department?.toLowerCase() || 'N/A',
          paymentMode: item.payment_mode || 'N/A',
          refNumber: item.transaction_reference_no || 'N/A',
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
    return { totalEarnings: total.toLocaleString(), processedCount: payoutData.length };
  }, [payoutData]);

  const getInvoiceHtml = (payoutId: string) => {
    const groupedRecords = payoutData.filter(item => item.payoutId === payoutId);
    if (groupedRecords.length === 0) return "";

    const baseRecord = groupedRecords[0];
    const fullAddress = [userProfile?.address, userProfile?.city, userProfile?.state, userProfile?.pincode].filter(Boolean).join(", ");
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
         <td>${formatValue(data.refNumber)}</td>
        <td>${data.paymentMode}</td>
        <td>₹ ${formatValue(data.amount, true)}</td>
        <td>₹ ${formatValue(data.grossAmount, true)}</td>
        <td>₹ ${formatValue(data.tdsAmount, true)}</td>
        <td>₹ ${formatValue(data.gstAmount)}</td>
        <td>₹ ${formatValue(data.netPayout, true)}</td>
      </tr>
    `).join('');

    return `
      <html>
      <head>
      <title>Invoice_${baseRecord.invoiceNumber}</title>
      <style>
        body{
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 40px 20px; 
            color:#333; 
            background: #f1f5f9; 
            margin: 0;
        }
        .invoice-container{ 
            max-width: 850px; 
            margin: 0 auto; 
            background: #fff; 
            padding: 40px; 
            border-radius: 8px; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            min-height: 1000px;
            display: flex;
            flex-direction: column;
        }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1{ margin:0; font-size:24px; color: #1e3a8a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #1e3a8a; display: inline-block; padding-bottom: 5px; }
        .meta-header { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;}
        .top-table{width:100%; font-size:13px; margin-bottom: 30px; border-spacing: 0;}
        .main-table{width:100%; border-collapse:collapse; font-size:11px; margin-bottom: 20px;}
        .main-table th{background:#f8fafc; border:1px solid #e2e8f0; padding:12px 8px; text-align:left; color: #475569;}
        .main-table td{border:1px solid #e2e8f0; padding:10px 8px;}
        .summary-table { width: 300px; margin-left: auto; border-collapse: collapse; font-size: 13px; margin-top: 20px; }
        .summary-table td { padding: 10px; border-bottom: 1px solid #f1f5f9; }
        .total-row { font-weight: bold; color: #1e3a8a; background: #f8fafc; font-size: 15px; }
        .footer-note { 
            margin-top: auto; 
            padding-top: 30px; 
            border-top: 1px dashed #cbd5e1; 
            font-size: 11px; 
            color: #94a3b8; 
            line-height: 1.5;
        }
        @media print {
            body { background: none; padding: 0; }
            .invoice-container { box-shadow: none; border: none; max-width: 100%; }
        }
      </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header"><h1>Tax Invoice</h1></div>
          <div class="meta-header">
              <span><b>Invoice No:</b> ${baseRecord.invoiceNumber}</span>
              <span><b>Date:</b> ${baseRecord.invoiceDate ? new Date(baseRecord.invoiceDate).toLocaleDateString('en-IN') : ''}</span>
          </div>
          <table class="top-table">
    <tr>
        <!-- FROM (Left Side) -->
        <td width="50%" valign="top">
            <div style="margin-bottom: 8px;">
                <b style="color:#64748b; text-transform: uppercase; font-size: 11px;">From</b>
            </div>
            <strong>${userProfile?.name}</strong><br/>
            <div style="max-width: 250px;">${fullAddress || 'N/A'}</div>
            ${userProfile?.pan ? `<b>PAN:</b> ${userProfile.pan}` : ''}
        </td>

        <!-- TO (Right Side) -->
        <td width="50%" valign="top" align="right">
            <div style="margin-bottom: 8px;">
                <b style="color:#64748b; text-transform: uppercase; font-size: 11px;">To</b>
            </div>
            <strong>Infinity Arthvishva Advisory Pvt Ltd</strong><br/>
            Shivaji Nagar, Pune, 411005<br/>
            <b>GSTIN:</b> 27AAICI0723K1ZJ
        </td>
    </tr>
</table>
          <table class="main-table">
              <thead><tr><th>#</th><th>Lead ID</th><th>Client</th><th>Product</th><th>Reference No</th><th>UTR No</th><th>Mode</th><th>Amount</th><th>Gross</th><th>TDS</th><th>GST</th><th>Net</th></tr></thead>
              <tbody>${rowsHtml}</tbody>
          </table>
          <table class="summary-table">
              <tr><td>Subtotal</td><td align="right">₹ ${totalGross.toLocaleString('en-IN')}</td></tr>
              <tr><td>GST</td><td align="right">₹ ${totalGst.toLocaleString('en-IN')}</td></tr>
              <tr class="total-row"><td>TOTAL</td><td align="right">₹ ${totalGross.toLocaleString('en-IN')}</td></tr>
          </table>

          <div class="text-align-center footer-note">
            <strong>Note:</strong><br/>
            This is a computer-generated document and does not require a physical signature.<br/> 
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const downloadInvoice = (payoutId: string) => {
    const htmlContent = getInvoiceHtml(payoutId);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${payoutId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openViewModal = (payoutId: string) => {
    setSelectedPayoutId(payoutId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Invoice Download</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">Track your payment status and download your invoices specifically.</p>
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
                    <th className="px-6 py-4 text-center">Mode</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Gross</th>
                    <th className="px-6 py-4">Net Payout</th>
                    <th className="px-6 py-4">Invoice No</th>
                    <th className="px-6 py-4">Actions</th>
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
                        <div className="text-xs text-slate-400 mt-1">{row.product}</div>
                      </td>

                     

                      <td className="px-6 py-5 text-center">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{row.paymentMode}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#e6fcf5] text-[#0d9488] border border-[#c3fae8]">{row.status}</span>
                      </td>
                      <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.grossAmount, true)}</td>
                      <td className="px-6 py-5 font-bold text-gray-600">₹{formatValue(row.netPayout, true)}</td>
                      <td className="px-6 py-5 text-slate-500 font-medium">{row.invoiceNumber}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openViewModal(row.payoutId)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadInvoice(row.payoutId)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2076C7] text-white text-xs font-bold rounded-lg transition-colors hover:bg-[#1a5fa1]"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* VIEW MODAL - Refined to look like a floating document */}
        {isModalOpen && selectedPayoutId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-5xl h-[95vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg"><FileText className="w-5 h-5 text-blue-500" /></div>
                  <div>
                    <h3 className="font-bold text-slate-700 leading-none">Invoice Preview</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Payout ID: {selectedPayoutId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadInvoice(selectedPayoutId)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1CADA3] hover:bg-[#1CADA3] text-white rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm shadow-emerald-200"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <div className="w-px h-6 bg-slate-200 mx-1"></div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-slate-100/50 p-4 md:p-10 flex justify-center">
                {/* The iframe represents the "paper" */}
                <div className="w-full max-w-[850px] bg-white shadow-2xl border border-slate-200 rounded-sm">
                  <iframe
                    title="Invoice Preview"
                    srcDoc={getInvoiceHtml(selectedPayoutId)}
                    className="w-full h-full min-h-[1100px] border-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}