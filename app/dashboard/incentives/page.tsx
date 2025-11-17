'use client';

import { useState } from 'react';

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
  // Create a new window for PDF generation
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

  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${invoice.id}</title>
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          margin: 0; 
          padding: 40px; 
          color: #333;
          background: #fff;
        }
        .header { 
          border-bottom: 3px solid #4f46e5; 
          padding-bottom: 20px; 
          margin-bottom: 30px;
        }
        .company-name { 
          font-size: 28px; 
          font-weight: bold; 
          color: #4f46e5;
          margin-bottom: 5px;
        }
        .invoice-title { 
          font-size: 32px; 
          font-weight: bold; 
          color: #1f2937;
          margin: 20px 0;
          text-align: center;
        }
        .section { 
          margin: 25px 0; 
        }
        .grid-2 { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 40px; 
          margin-bottom: 30px;
        }
        .grid-3 { 
          display: grid; 
          grid-template-columns: 1fr 1fr 1fr; 
          gap: 30px; 
          margin-bottom: 30px;
        }
        .label { 
          font-weight: 600; 
          color: #6b7280; 
          font-size: 14px;
          margin-bottom: 5px;
        }
        .value { 
          font-size: 16px; 
          color: #1f2937;
          margin-bottom: 15px;
        }
        .amount { 
          font-size: 24px; 
          font-weight: bold; 
          color: #059669;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        .table th {
          background: #f8fafc;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
        }
        .table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .total-section {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-paid { background: #dcfce7; color: #166534; }
        .status-processing { background: #dbeafe; color: #1e40af; }
        .status-pending { background: #fef3c7; color: #92400e; }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">Infinity Arthvishva Pvt Ltd.</div>
        <div style="color: #6b7280; font-size: 14px;">
          7 Business Square by Naiknavare, Ganeshkhind Rd, NearDatta Mandir, 
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
          <div style="margin-bottom: 10px;">
            <span style="font-weight: 600; margin-right: 20px;">Subtotal:</span>
            <span>₹${invoice.amount}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <span style="font-weight: 600; margin-right: 20px;">TDS (10%):</span>
            <span>₹${(parseInt(invoice.amount.replace(/,/g, '')) * 0.1).toLocaleString('en-IN')}</span>
          </div>
          <div style="font-size: 20px; font-weight: bold;">
            <span style="margin-right: 20px;">Net Amount:</span>
            <span class="amount">₹${(parseInt(invoice.amount.replace(/,/g, '')) * 0.9).toLocaleString('en-IN')}</span>
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
        <p style="margin-top: 20px;">
          Insurance Partners Ltd. • Registered with IRDAI • Member of Insurance Association
        </p>
      </div>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="
          background: #4f46e5;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
        ">Print Invoice</button>
        <button onclick="window.close()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 6px;
          font-size: 16px;
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

  // Sample data
  const incentiveData: Incentive[] = [
    {
      id: 'INV-2023-0012',
      product: 'Life Insurance - New Business',
      amount: '12,500',
      status: 'paid',
      date: '15 Oct 2023',
      paymentMethod: 'Bank Transfer',
      narration: 'New policy commission - LIC Jeevan Anand',
      policyNumber: 'POL-789456',
      clientName: 'Amit Sharma'
    },
    {
      id: 'INV-2023-0011',
      product: 'Health Insurance - Renewal',
      amount: '8,750',
      status: 'paid',
      date: '30 Sep 2023',
      paymentMethod: 'Direct Deposit',
      narration: 'Renewal commission - Star Health Insurance',
      policyNumber: 'POL-789457',
      clientName: 'Priya Patel'
    },
    {
      id: 'INV-2023-0010',
      product: 'Motor Insurance - New Business',
      amount: '6,200',
      status: 'processing',
      date: '15 Sep 2023',
      paymentMethod: 'Bank Transfer',
      narration: 'New car insurance - HDFC Ergo',
      policyNumber: 'POL-789458',
      clientName: 'Rahul Verma'
    },
    {
      id: 'INV-2023-0009',
      product: 'Home Insurance - New Business',
      amount: '15,300',
      status: 'pending',
      date: '05 Sep 2023',
      paymentMethod: 'Wire Transfer',
      narration: 'Home insurance commission - ICICI Lombard',
      policyNumber: 'POL-789459',
      clientName: 'Sunita Reddy'
    },
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Incentives & Payouts
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Track your earnings and commission payouts with complete transparency
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Payouts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Payouts</p>
                <p className="text-3xl font-bold text-slate-900">₹{totalPayouts}</p>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  +15% from last period
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Payouts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Pending Payouts</p>
                <p className="text-3xl font-bold text-slate-900">₹{pendingPayouts}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Expected by 30 Nov
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* YTD Earnings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">YTD Earnings</p>
                <p className="text-3xl font-bold text-slate-900">₹{ytdEarnings}</p>
                <div className="flex items-center text-slate-600 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  Current fiscal year
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Incentive History Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Section Header */}
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Transaction History</h2>
                <p className="text-slate-600 text-sm mt-1">Detailed breakdown of all your incentives and commissions</p>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex bg-slate-100 rounded-lg p-1">
                {(['all', 'paid', 'processing', 'pending'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 capitalize min-w-20 ${
                      activeTab === tab
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'all' ? 'All' : STATUS_CONFIG[tab].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Invoice ID', 'Product', 'Amount', 'Status', 'Payment Method', 'Narration', 'Date', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredData.map((item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-slate-50/80 transition-colors duration-150"
                  >
                    {/* Invoice ID */}
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 max-w-xs">
                        {item.product}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-900">
                        ₹{item.amount}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${STATUS_CONFIG[item.status].color}`}>
                          <span className="mr-1.5">{STATUS_CONFIG[item.status].icon}</span>
                          {STATUS_CONFIG[item.status].label}
                        </span>
                      </div>
                    </td>

                    {/* Payment Method */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${PAYMENT_METHOD_CONFIG[item.paymentMethod].color}`}>
                        <span className="mr-1.5">{PAYMENT_METHOD_CONFIG[item.paymentMethod].icon}</span>
                        {item.paymentMethod}
                      </span>
                    </td>

                    {/* Narration */}
                    <td className="px-6 py-4">
                      <div 
                        className="text-sm text-slate-600 max-w-xs"
                        title={item.narration}
                      >
                        {item.narration}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-500">
                        {item.date}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleViewInvoice(item)}
                          className="text-slate-600 hover:text-slate-800 transition-colors duration-200 p-1 rounded tooltip"
                          title="View Invoice"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(item)}
                          className="text-blue-600 hover:text-blue-700 transition-colors duration-200 p-1 rounded tooltip"
                          title="Download PDF"
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

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <span>Showing</span>
                <span className="font-semibold text-slate-900">{filteredData.length}</span>
                <span>of</span>
                <span className="font-semibold text-slate-900">{incentiveData.length}</span>
                <span>transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Payout Schedule</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Commission payouts are processed twice monthly on the 15th and last day. Please ensure your banking information is current to avoid delays.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-6 border border-slate-300">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Invoice Generation</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
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