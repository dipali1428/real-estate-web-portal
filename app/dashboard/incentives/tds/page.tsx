import React from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  ArrowRight,
  Info,
  Calendar,    // Added for stats
  Building2,   // Added for stats
  Clock        // Added for stats
} from 'lucide-react';

const TDSPortal = () => {
  const quarterlyData = [
    {
      quarter: "Quarter 1",
      period: "Apr - Jun 2025",
      status: "AVAILABLE",
      generatedOn: "July 15, 2025",
      fileSize: "1.2 MB",
      verified: true,
      processing: false,
    },
    {
      quarter: "Quarter 2",
      period: "Jul - Sep 2025",
      status: "AVAILABLE",
      generatedOn: "Oct 18, 2025",
      fileSize: "1.4 MB",
      verified: true,
      processing: false,
    },
    {
      quarter: "Quarter 3",
      period: "Oct - Dec 2025",
      status: "PROCESSING",
      generatedOn: "Expected Jan 20, 2026",
      fileSize: "--",
      verified: false,
      processing: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 font-sans text-gray-900 selection:bg-[#1CADA3]/20">
      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-3xl"> 
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">Tax Deducted at Source (TDS)</h1>
            <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">
              Access and download your TDS certificates for the current financial year.
              Ensure your records are up to date for tax compliance.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-400 text-xs font-semibold italic">
            <Info className="w-4 h-4 text-[#2076C7]" />
            <span>Certificates are usually available 15 days after quarter end.</span>
          </div>
        </div>

        {/* --- ADDED STATS CARDS START --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Financial Year Card */}
          <div className="bg-white p-7 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="bg-[#1CADA3]/10 p-3.5 rounded-2xl">
              <Calendar className="w-6 h-6 text-[#1CADA3]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Financial Year</p>
              <p className="text-xl font-bold text-slate-700">2025-26</p>
            </div>
          </div>

          {/* Total Deductions Card */}
          <div className="bg-white p-7 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="bg-[#1CADA3]/10 p-3.5 rounded-2xl">
              <Building2 className="w-6 h-6 text-[#1CADA3]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Total Deductions</p>
              <p className="text-xl font-bold text-slate-700">₹4,52,000</p>
            </div>
          </div>

          {/* Last Updated Card */}
          <div className="bg-white p-7 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="bg-[#1CADA3]/10 p-3.5 rounded-2xl">
              <Clock className="w-6 h-6 text-[#1CADA3]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Last Updated</p>
              <p className="text-xl font-bold text-slate-700">2 hours ago</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-700 mb-8">Quarterly Certificates</h2>
        {/* --- ADDED STATS CARDS END --- */}

        {/* Quarterly Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {quarterlyData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col transition-transform hover:scale-[1.02] duration-300"
            >
              {/* Card Header: Icon & Status */}
              <div className="flex justify-between items-start mb-10">
                <div className={`${item.processing ? 'bg-orange-50' : 'bg-[#1CADA3]/10'} p-4 rounded-2xl`}>
                  <FileText className={`w-8 h-8 ${item.processing ? 'text-orange-400' : 'text-[#1CADA3]'}`} />
                </div>
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full tracking-[0.1em] ${item.processing
                    ? 'bg-orange-100/50 text-orange-600'
                    : 'bg-[#1CADA3]/10 text-[#1CADA3]'
                  }`}>
                  {item.status}
                </span>
              </div>

              {/* Title Area */}
              <div className="mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{item.quarter}</h3>
                <p className="text-gray-400 font-bold text-sm tracking-wide">{item.period}</p>
              </div>

              {/* Data Table */}
              <div className="space-y-5 mb-12 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Generated on</span>
                  <span className="text-gray-900 font-bold">{item.generatedOn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">File size</span>
                  <span className="text-gray-900 font-bold">{item.fileSize}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                <button
                  disabled={item.processing}
                  className={`w-full flex items-center justify-center gap-3 py-3 rounded-md font-bold text-sm transition-all duration-300 shadow-lg ${item.processing
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-t from-[#2076C7] to-[#1CADA3] text-white hover:opacity-90 transform hover:scale-105'
                    }`}
                >
                  <Download className="w-5 h-5" />
                  Download Form 16A
                </button>

                {/* Verification Footer */}
                {item.verified && (
                  <div className="flex items-center justify-center gap-2 mt-6 text-[10px] font-black text-[#1CADA3] tracking-[0.15em] uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified by IT Department</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Assistance & Important Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-16 border-t border-gray-100">

          {/* Need Assistance Text */}
          <div className="max-w-md px-2">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Need Assistance?</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
              If you find any discrepancies in your TDS certificates or have trouble downloading, please contact our finance department or reach out to the helpdesk.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#2076C7] group">
              Contact Support
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Important Note Box */}
          <div className="bg-gradient-to-t from-[#2076C7] to-[#1CADA3] text-white p-12 rounded-[3rem] shadow-2xl shadow-[#2076C7]/20">
            <h4 className="text-xl font-bold mb-4 text-white">Important Note</h4>
            <p className="text-blue-100 text-sm leading-relaxed max-w-sm font-medium">
              TDS certificates are generated based on the quarterly returns filed. Please ensure your PAN is correctly mapped to avoid any credit issues.
            </p>
          </div>
        </div>

        {/* Legal Footer */}
        {/* <footer className="mt-24 pb-12 text-center">
          <p className="text-[10px] font-bold text-gray-300 tracking-[0.25em] uppercase">
            © 2026 TDS PORTAL • SECURE TAX MANAGEMENT SYSTEM
          </p>
        </footer> */}

      </main>
    </div>
  );
};

export default TDSPortal;