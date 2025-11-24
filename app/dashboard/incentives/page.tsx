'use client';
import { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';
import { DashboardService } from '@/app/services/dashboardService';
import toast, { Toaster } from 'react-hot-toast';

// Types
interface Incentive {
  id: string;
  product: string;
  amount: string;
  status: 'paid' | 'processing' | 'pending';
  date: string;
  paymentMethod: 'Bank Transfer' | 'Direct Deposit' | 'Wire Transfer';
  narration: string;
  policyNumber?: string;
  clientName?: string;
}

interface IncentivesSummary {
  totalPayouts: string;
  pendingPayouts: string;
  ytdEarnings: string;
}

interface UserProfile {
  name: string;
  contactNumber: string;
  adv_id?: string;
}

// Constants
const STATUS_CONFIG = {
  paid: {
    label: 'Paid',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: '✓'
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '⟳'
  },
  pending: {
    label: 'Pending',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '⋯'
  },
} as const;

const PAYMENT_METHOD_CONFIG = {
  'Bank Transfer': { color: 'bg-purple-50 text-purple-700', icon: '🏦' },
  'Direct Deposit': { color: 'bg-indigo-50 text-indigo-700', icon: '💳' },
  'Wire Transfer': { color: 'bg-cyan-50 text-cyan-700', icon: '🔗' },
} as const;

// PDF Generation Function
const generatePDF = (invoice: Incentive) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Calculate amounts safely
  const amountNumber = parseInt(invoice.amount.replace(/,/g, '')) || 0;
  const tdsAmount = (amountNumber * 0.1).toLocaleString('en-IN');
  const netAmount = (amountNumber * 0.9).toLocaleString('en-IN');

  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${invoice.id}</title>
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          margin: 0; 
          padding: 20px; 
          color: #333;
          background: #fff;
          font-size: 14px;
        }
        .header { 
          border-bottom: 2px solid #4f46e5; 
          padding-bottom: 15px; 
          margin-bottom: 20px;
        }
        .company-name { 
          font-size: 22px; 
          font-weight: bold; 
          color: #4f46e5;
          margin-bottom: 5px;
        }
        .invoice-title { 
          font-size: 24px; 
          font-weight: bold; 
          color: #1f2937;
          margin: 15px 0;
          text-align: center;
        }
        .section { 
          margin: 15px 0; 
        }
        .grid-2 { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 20px; 
          margin-bottom: 20px;
        }
        .grid-3 { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 15px; 
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          body { padding: 40px; }
          .grid-2 { grid-template-columns: 1fr 1fr; gap: 30px; }
          .grid-3 { grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        }
        .label { 
          font-weight: 600; 
          color: #6b7280; 
          font-size: 12px;
          margin-bottom: 4px;
        }
        .value { 
          font-size: 14px; 
          color: #1f2937;
          margin-bottom: 10px;
        }
        .amount { 
          font-size: 20px; 
          font-weight: bold; 
          color: #059669;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 12px;
        }
        .table th {
          background: #f8fafc;
          padding: 8px;
          text-align: left;
          border-bottom: 2px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
        }
        .table td {
          padding: 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        .total-section {
          background: #f8fafc;
          padding: 15px;
          border-radius: 6px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        .status-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .status-paid { background: #dcfce7; color: #166534; }
        .status-processing { background: #dbeafe; color: #1e40af; }
        .status-pending { background: #fef3c7; color: #92400e; }
        @media print {
          body { padding: 15px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">Infinity Arthvishva Pvt Ltd.</div>
        <div style="color: #6b7280; font-size: 12px;">
          7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, 
          Model Colony, Shivajinagar, Pune, Maharashtra 411016<br>
          GSTIN: 27AABCU9603R1ZM
        </div>
      </div>

      <div class="invoice-title">COMMISSION INVOICE</div>

      <div class="grid-2">
        <div>
          <div class="label">BILLED TO</div>
          <div class="value">
            <strong>Infinity Arthvishva Pvt Ltd.</strong><br>
            Finance Department<br>
            info@infinityarthvishva.com<br>
            1800-532-7600
          </div>
        </div>
        <div>
          <div class="label">INVOICE DETAILS</div>
          <div class="value">
            <strong>Invoice No:</strong> ${invoice.id}<br>
            <strong>Issue Date:</strong> ${invoiceDate}<br>
            <strong>Due Date:</strong> ${dueDate}<br>
            <strong>Status:</strong> 
            <span class="status-badge status-${invoice.status}">
              ${STATUS_CONFIG[invoice.status].label}
            </span>
          </div>
        </div>
      </div>

      <div class="grid-3">
        <div>
          <div class="label">AGENT DETAILS</div>
          <div class="value">
            <strong>Rajesh Kumar</strong><br>
            DSA Partner ID: DSA-789456<br>
            rajesh.kumar@email.com<br>
            +91-9876543210
          </div>
        </div>
        <div>
          <div class="label">POLICY INFORMATION</div>
          <div class="value">
            <strong>Product:</strong> ${invoice.product}<br>
            <strong>Policy No:</strong> ${invoice.policyNumber || 'N/A'}<br>
            <strong>Client:</strong> ${invoice.clientName || 'N/A'}
          </div>
        </div>
        <div>
          <div class="label">PAYMENT METHOD</div>
          <div class="value">
            ${invoice.paymentMethod}<br>
            <strong>Narration:</strong><br>
            ${invoice.narration}
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Policy Number</th>
            <th>Commission Type</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${invoice.product}</td>
            <td>${invoice.policyNumber || 'N/A'}</td>
            <td>Sales Commission</td>
            <td style="font-weight: bold;">₹${invoice.amount}</td>
          </tr>
        </tbody>
      </table>

      <div class="total-section">
        <div style="text-align: right;">
          <div style="margin-bottom: 8px;">
            <span style="font-weight: 600; margin-right: 15px;">Subtotal:</span>
            <span>₹${invoice.amount}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span style="font-weight: 600; margin-right: 15px;">TDS (10%):</span>
            <span>₹${tdsAmount}</span>
          </div>
          <div style="font-size: 18px; font-weight: bold;">
            <span style="margin-right: 15px;">Net Amount:</span>
            <span class="amount">₹${netAmount}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>
          <strong>Terms & Conditions:</strong><br>
          1. This is a computer-generated invoice and does not require a physical signature.<br>
          2. Payment will be processed within 7-10 working days from the invoice date.<br>
          3. For any queries, please contact the finance department.
        </p>
        <p style="margin-top: 15px;">
          Insurance Partners Ltd. • Registered with IRDAI • Member of Insurance Association
        </p>
      </div>

      <div class="no-print" style="margin-top: 20px; text-align: center;">
        <button onclick="window.print()" style="
          background: #4f46e5;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          margin-right: 8px;
        ">Print Invoice</button>
        <button onclick="window.close()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
        ">Close</button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(pdfContent);
  printWindow.document.close();
};

export default function IncentivesPayouts() {
  const [activeTab, setActiveTab] = useState<'all' | 'paid' | 'processing' | 'pending'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'30days' | '90days' | 'ytd'>('30days');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [summaryData, setSummaryData] = useState<IncentivesSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile and incentives data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const profileRes = await DashboardService.getProfile();
        setUserProfile(profileRes.user);

      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err?.response?.data?.message || 'Failed to load incentives data');
        toast.error('Failed to load incentives data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sample data
  const incentiveData: Incentive[] = [
   // {
   //   id: 'INV-2023-0012',
    //  product: 'Life Insurance - New Business',
    //amount: '12,500',
    //  status: 'paid',
    //  date: '15 Oct 2023',
    //  paymentMethod: 'Bank Transfer',
    //  narration: 'New policy commission - LIC Jeevan Anand',
   //  policyNumber: 'POL-789456',
    //  clientName: 'Amit Sharma'
   // },
     
  ];

  const filteredData = activeTab === 'all'
    ? incentiveData
    : incentiveData.filter(item => item.status === activeTab);

  const totalPayouts = "3,42,500";
  const pendingPayouts = "45,800";
  const ytdEarnings = "4,12,300";

  const handleDownloadInvoice = (invoice: Incentive) => {
    generatePDF(invoice);
  };

  const handleViewInvoice = (invoice: Incentive) => {
    generatePDF(invoice);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading incentives data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">

        {/* Header */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 tracking-tight">
                Incentives & Payouts
              </h1>
              <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Track your earnings and commission payouts with complete transparency
              </p>
            </div>
            <div className="flex items-center justify-start sm:justify-end">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Total Payouts */}
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Total Payouts</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-sans text-slate-800">₹{0}</p>
                <div className="flex items-center text-emerald-600 text-xs sm:text-sm font-medium">
                  <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  +15% from last period
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 4h12M6 8h12M12 20l-6-8h3a6 6 0 016-6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Payouts */}
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">Pending Payouts</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-sans text-slate-800">₹{0}</p>
                <div className="flex items-center text-blue-600 text-xs font-medium">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Expected by 30 Nov
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* YTD Earnings */}
          <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">YTD Earnings</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-sans text-slate-800">₹{0}</p>
                <div className="flex items-center text-slate-600 text-xs font-medium">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  Current fiscal year
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-slate-600 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Incentive History Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Section Header */}
          {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {(['all', 'paid', 'processing', 'pending'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-medium rounded-md transition-all duration-200 capitalize min-w-12 sm:min-w-16 ${
                    activeTab === tab
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  {tab === 'all' ? 'All' : STATUS_CONFIG[tab].label}
                </button>
              ))}
            </div>

          {/* Desktop Table View - Hidden on mobile */}
<div className="hidden md:block">
  <div className="min-w-full max-w-30 inline-block align-middle">
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full min-w-[600px]">
        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
          <tr>
            {['Invoice ID', 'Product', 'Amount', 'Status', 'Payment', 'Narration', 'Date', 'Actions'].map((header) => (
              <th
                key={header}
                className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {filteredData.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-slate-50/80 transition-colors duration-150"
            >
              {/* Invoice ID */}
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-900 font-mono">
                  {item.id}
                </div>
                {item.policyNumber && (
                  <div className="text-xs text-slate-500 mt-1">
                    {item.policyNumber}
                  </div>
                )}
              </td>

              {/* Product */}
              <td className="px-4 sm:px-6 py-4">
                <div
                  className="text-sm text-slate-900 max-w-[150px] sm:max-w-xs truncate"
                  title={item.product}
                >
                  {item.product}
                </div>
                {item.clientName && (
                  <div className="text-xs text-slate-500 mt-1 truncate">
                    {item.clientName}
                  </div>
                )}
              </td>

              {/* Amount */}
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium font-sans text-slate-900">
                  ₹{item.amount}
                </div>
              </td>

              {/* Status */}
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${STATUS_CONFIG[item.status].color}`}
                  >
                    <span className="mr-1">
                      {STATUS_CONFIG[item.status].icon}
                    </span>
                    {STATUS_CONFIG[item.status].label}
                  </span>
                </div>
              </td>

              {/* Payment Method */}
              <td className="px-4 sm:px-6 py-4">
                <div className="text-xs text-slate-500 font-medium">Payment</div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${PAYMENT_METHOD_CONFIG[item.paymentMethod].color}`}
                  >
                    <span className="mr-1">
                      {PAYMENT_METHOD_CONFIG[item.paymentMethod].icon}
                    </span>
                    {item.paymentMethod}
                  </span>
                </div>
              </td>

              {/* Narration */}
              <td className="px-4 sm:px-6 py-4">
                <div className="text-sm text-slate-900 max-w-[120px] sm:max-w-[150px] truncate"
                     title={item.narration || 'No narration'}>
                  {item.narration || '-'}
                </div>
              </td>

              {/* Date */}
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-500">
                  {item.date}
                </div>
              </td>

              {/* Actions */}
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewInvoice(item)}
                    className="text-slate-600 hover:text-slate-800 transition-colors duration-200 p-1 rounded hover:bg-slate-100"
                    title="View Invoice"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(item)}
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                    title="Download PDF"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
          {/* Mobile Card View - Visible only on mobile */}
          <div className="md:hidden space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 font-mono">
                      {item.id}
                    </div>
                    {item.policyNumber && (
                      <div className="text-xs text-slate-500 mt-1">
                        {item.policyNumber}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      onClick={() => handleViewInvoice(item)}
                      className="text-slate-600 hover:text-slate-800 transition-colors duration-200 p-1 rounded hover:bg-slate-100"
                      title="View Invoice"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDownloadInvoice(item)}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                      title="Download PDF"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product & Client */}
                <div className="mb-3">
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {item.product}
                  </div>
                  {item.clientName && (
                    <div className="text-xs text-slate-500 mt-1 truncate">
                      {item.clientName}
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {/* Amount */}
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Amount</div>
                    <div className="text-sm font-medium text-slate-900">₹{item.amount}</div>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Status</div>
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${STATUS_CONFIG[item.status].color}`}
                      >
                        <span className="mr-1">
                          {STATUS_CONFIG[item.status].icon}
                        </span>
                        {STATUS_CONFIG[item.status].label}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Payment</div>
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${PAYMENT_METHOD_CONFIG[item.paymentMethod].color}`}
                      >
                        <span className="mr-1">
                          {PAYMENT_METHOD_CONFIG[item.paymentMethod].icon}
                        </span>
                        {item.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Date</div>
                    <div className="text-sm text-slate-900">{item.date}</div>
                  </div>
                </div>

                {/* Narration if exists */}
                {item.narration && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">Narration</div>
                    <div className="text-xs text-slate-600 truncate" title={item.narration}>
                      {item.narration}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
         

          {/* Table Footer */}
          <div className="px-3 sm:px-4 md:px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
              <div className="flex items-center space-x-2 mb-3 sm:mb-0">
                <span className="text-xs">Showing</span>
                <span className="font-semibold text-slate-900 text-xs">{filteredData.length}</span>
                <span className="text-xs">of</span>
                <span className="font-semibold text-slate-900 text-xs">{incentiveData.length}</span>
                <span className="text-xs">transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 border border-blue-200">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900 mb-2">Payout Schedule</h3>
                <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                  Commission payouts are processed twice monthly on the 15th and last day. Please ensure your banking information is current to avoid delays.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-300">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 mb-2">Invoice Generation</h3>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Download professional PDF invoices for all your commission transactions. Includes detailed breakdown with TDS calculations and payment terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}