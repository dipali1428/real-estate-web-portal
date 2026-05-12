"use client";

import React, { useState, ChangeEvent } from "react";
import { Search, User, Briefcase, Phone, BadgeCheck, Eye, X, ShieldCheck, FileText } from "lucide-react";

// Mock Data updated with all required fields
const INITIAL_LEADS = [
  {
    id: "NL/2025-26/0005",
    dsaName: "Mohata Associates",
    dsaCode: "ADV_2697",
    clientName: "Demo Client Name NRPF",
    clientPhone: "9730366112",
    rmName: "N/A",
    rmEmail: "N/A",
    rmContact: "N/A",
    status: "Completed",
    kycStatus: "Completed",
    agreementStatus: "Signed",
    date: "2023-10-24",
    // Lead Detail View Fields
    dob: "1993-03-27",
    refId: "N/A",
    bankName: "N/A",
    location: "Pune",
    useOfFund: "Demo Use",
    fileNumber: "N/A",
    loanAmount: "₹20,000",
    otherIncome: "Pensioner",
    loanCategory: "Fresh",
    employmentType: "Other",
    otherIncomeAmount: "₹10,000",
    // KYC Detail Fields (matching DSA Details image)
    dsaDetails: {
      email: "aaryan.infinity12@gmail.com",
      isEmailVerified: true,
      phone: "9730366112",
      isPhoneVerified: true,
      pan: "ACEFM2338P",
      isPanVerified: true,
      aadhaar: "N/A",
      isAadhaarVerified: false,
      bankName: "AXIS BANK",
      isBankVerified: true,
      accountNumber: "925020004219284",
      ifscCode: "UTIB0002632",
      gstNumber: "N/A",
      isGstVerified: false,
      panAadhaarLinked: "No"
    }
  }
];

type Lead = typeof INITIAL_LEADS[0];

export default function DSALeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null); // For Lead Detail View
  const [selectedKyc, setSelectedKyc] = useState<Lead | null>(null);   // For DSA Detail View

  const filteredLeads = INITIAL_LEADS.filter(
    (lead) =>
      lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.dsaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DSA Completed Leads</h1>
            <p className="text-gray-500 text-sm">Monitor and manage all client leads submitted by agents.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Lead ID, DSA or Client..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-600 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lead ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">DSA Details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Client Details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">RM Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">KYC Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">KYC Details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Agreement</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-blue-600">{lead.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{lead.dsaName}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{lead.dsaCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{lead.clientName}</p>
                          <div className="flex items-center text-[10px] text-gray-400 font-bold gap-1"> {lead.clientPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-600">{lead.rmName}</td>
                    <td className="px-6 py-4 text-center">
                       <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold border border-emerald-100 uppercase tracking-tighter">
                         {lead.kycStatus}
                       </span>
                    </td>
                    {/* KYC DETAILS VIEW BUTTON */}
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedKyc(lead)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase transition-all"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px] font-bold border border-blue-100 uppercase">
                        {lead.agreementStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 gap-1 tracking-tighter">
                         {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => setSelectedLead(lead)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase transition-all"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer/Pagination Placeholder preserved from original code */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <p className="text-xs text-gray-500 font-medium">Showing {filteredLeads.length} leads</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border rounded text-gray-600 bg-white disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 text-xs border rounded text-gray-600 bg-white disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT MODAL: Lead Detail View (Matches image 1) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-5 border-b border-gray-100 relative">
              <h2 className="text-lg font-bold text-gray-800">Lead Detail View</h2>
              <div className="flex gap-4 mt-2">
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100 uppercase tracking-tighter">ID: {selectedLead.id}</span>
                <span className="text-[11px] font-bold text-gray-500 uppercase">Name: <span className="text-gray-700">{selectedLead.clientName}</span></span>
              </div>
              <button onClick={() => setSelectedLead(null)} className="absolute top-5 right-6 text-gray-400 hover:text-gray-900"><X size={20} /></button>
            </div>
            <div className="px-8 py-6 grid grid-cols-2 gap-x-12 gap-y-6 max-h-[65vh] overflow-y-auto">
              <DetailItem label="DOB" value={selectedLead.dob} />
              <DetailItem label="REF ID" value={selectedLead.refId} />
              <DetailItem label="RM NAME" value={selectedLead.rmName} />
              <DetailItem label="RM EMAIL" value={selectedLead.rmEmail} />
              <DetailItem label="BANK NAME" value={selectedLead.bankName} />
              <DetailItem label="LOCATION" value={selectedLead.location} />
              <DetailItem label="RM CONTACT" value={selectedLead.rmContact} />
              <DetailItem label="USE OF FUND" value={selectedLead.useOfFund} />
              <DetailItem label="FILE NUMBER" value={selectedLead.fileNumber} />
              <DetailItem label="LOAN AMOUNT" value={selectedLead.loanAmount} />
              <DetailItem label="OTHER INCOME" value={selectedLead.otherIncome} />
              <DetailItem label="LOAN CATEGORY" value={selectedLead.loanCategory} />
              <DetailItem label="EMPLOYMENT TYPE" value={selectedLead.employmentType} />
              <DetailItem label="OTHER INCOME AMOUNT" value={selectedLead.otherIncomeAmount} />
            </div>
            <div className="px-8 py-4 border-t border-gray-100 bg-gray-50">
              <button onClick={() => setSelectedLead(null)} className="px-6 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-white shadow-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* LARGE MODAL: DSA Details (Matches image 2) */}
      {selectedKyc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl animate-in fade-in zoom-in duration-200">
            <div className="px-10 py-8 relative">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">DSA Details</h2>
              <button onClick={() => setSelectedKyc(null)} className="absolute top-8 right-10 text-gray-400 hover:text-gray-900"><X size={24} /></button>
            </div>
            <div className="px-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              <DsaInfoItem label="NAME" value={selectedKyc.dsaName} />
              <DsaInfoItem label="DSA ID" value={selectedKyc.dsaCode} />
              <DsaInfoItem label="EMAIL" value={selectedKyc.dsaDetails.email} isVerified={selectedKyc.dsaDetails.isEmailVerified} />
              <DsaInfoItem label="PHONE" value={selectedKyc.dsaDetails.phone} isVerified={selectedKyc.dsaDetails.isPhoneVerified} />
              <DsaInfoItem label="PAN" value={selectedKyc.dsaDetails.pan} isVerified={selectedKyc.dsaDetails.isPanVerified} />
              <DsaInfoItem label="AADHAAR NUMBER" value={selectedKyc.dsaDetails.aadhaar} isVerified={selectedKyc.dsaDetails.isAadhaarVerified} />
              <DsaInfoItem label="BANK NAME" value={selectedKyc.dsaDetails.bankName} isVerified={selectedKyc.dsaDetails.isBankVerified} />
              <DsaInfoItem label="ACCOUNT NUMBER" value={selectedKyc.dsaDetails.accountNumber} />
              <DsaInfoItem label="IFSC CODE" value={selectedKyc.dsaDetails.ifscCode} />
              <DsaInfoItem label="GST NUMBER" value={selectedKyc.dsaDetails.gstNumber} isVerified={selectedKyc.dsaDetails.isGstVerified} />
              <DsaInfoItem label="PAN-AADHAAR LINKED" value={selectedKyc.dsaDetails.panAadhaarLinked} />
              <DsaInfoItem label="KYC STATUS" value={selectedKyc.kycStatus} />
            </div>
            <div className="px-10 py-6 border-t flex justify-end">
              <button onClick={() => setSelectedKyc(null)} className="bg-[#2563eb] text-white px-10 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers for clean code
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-[13px] font-bold text-gray-800 leading-tight">{value || "N/A"}</span>
    </div>
  );
}

function DsaInfoItem({ label, value, isVerified }: { label: string; value: string; isVerified?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-900">{value}</span>
        {isVerified !== undefined && (
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter ${isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {isVerified ? "VERIFIED" : "NOT VERIFIED"}
          </span>
        )}
      </div>
    </div>
  );
}