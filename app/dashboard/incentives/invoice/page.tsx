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
        body{font-family: Arial, sans-serif; padding:20px; color:#333; background: #fff;}
        .invoice-container{ width:100%; box-sizing: border-box; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1{ margin:0; font-size:22px; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; display: inline-block; }
        .meta-header { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 10px;}
        .top-table{width:100%; font-size:12px; margin-bottom: 20px;}
        .main-table{width:100%; border-collapse:collapse; font-size:10px;}
        .main-table th{background:#f8fafc; border:1px solid #e2e8f0; padding:8px; text-align:left;}
        .main-table td{border:1px solid #e2e8f0; padding:8px;}
        .summary-table { width: 280px; margin-left: auto; border-collapse: collapse; font-size: 12px; margin-top: 20px; }
        .summary-table td { padding: 8px; border-bottom: 1px solid #f1f5f9; }
        .total-row { font-weight: bold; color: #1e3a8a; background: #f8fafc; }
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
                  <td width="50%" valign="top">
                      <b style="color:#64748b">FROM:</b><br/>
                      <strong>Infinity Arthvishva Advisory Pvt Ltd</strong><br/>
                      Shivaji Nagar, Pune, 411005<br/>
                      GSTIN: 27AAICI0723K1ZJ
                  </td>
                  <td width="50%" valign="top" align="right">
                      <b style="color:#64748b">BILL TO:</b><br/>
                      <strong>${userProfile?.name}</strong><br/>
                      ${fullAddress || 'N/A'}<br/>
                      ${userProfile?.pan ? `PAN: ${userProfile.pan}` : ''}
                  </td>
              </tr>
          </table>
          <table class="main-table">
              <thead><tr><th>#</th><th>Lead ID</th><th>Client</th><th>Product</th><th>Ref</th><th>Mode</th><th>Amount</th><th>Gross</th><th>TDS</th><th>GST</th><th>Net</th></tr></thead>
              <tbody>${rowsHtml}</tbody>
          </table>
          <table class="summary-table">
              <tr><td>Subtotal</td><td align="right">₹ ${totalGross.toLocaleString('en-IN')}</td></tr>
              <tr><td>GST</td><td align="right">₹ ${totalGst.toLocaleString('en-IN')}</td></tr>
              <tr><td>TDS</td><td align="right">- ₹ ${totalTds.toLocaleString('en-IN')}</td></tr>
              <tr class="total-row"><td>TOTAL</td><td align="right">₹ ${totalNet.toLocaleString('en-IN')}</td></tr>
          </table>
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

        {/* VIEW MODAL */}
        {isModalOpen && selectedPayoutId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Invoice Preview
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadInvoice(selectedPayoutId)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-slate-50 p-4 md:p-8">
                <div className="bg-white shadow-sm border border-slate-200 mx-auto max-w-[800px] min-h-[600px] rounded-lg overflow-hidden">
                  <iframe
                    title="Invoice Preview"
                    srcDoc={getInvoiceHtml(selectedPayoutId)}
                    className="w-full h-[700px] border-none"
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