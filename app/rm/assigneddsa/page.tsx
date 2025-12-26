"use client";

import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Mail, 
  MapPin, 
  IndianRupee, 
  FileText, 
  Info,
  ExternalLink,
  FileUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Lead {
  id: string;
  name: string;
  mobile: string;
  email: string;
  location: string;
  product: string;
  category: string;
  amount: string;
  date: string;
  additional: string;
  documents: string[];
  status: 'Pending' | 'In Review' | 'Approved' | 'Disbursed' | 'Action Required';
}

// --- Mock Data ---
const MOCK_LEADS: Lead[] = [
  { 
    id: "LD-2025-346", name: "Rytu Sharma", mobile: "9876543210", email: "rytu@example.com", 
    location: "Mumbai, Maharashtra", product: "Business Loan", category: "Loans", 
    amount: "5,00,000", date: "2025-12-24", status: "Pending",
    additional: "Urgent business expansion requirement for a new retail outlet.",
    documents: ["Aadhar_Card.pdf", "GST_Certificate.pdf", "Bank_Statement_6M.pdf"]
  },
  { 
    id: "LD-2025-711", name: "Adtgry Verma", mobile: "9741194235", email: "adtgry@finmail.com",
    location: "Bangalore, Karnataka", product: "Home Loans", category: "Loans", 
    amount: "45,00,000", date: "2025-12-24", status: "In Review",
    additional: "Looking for competitive interest rates for a 2BHK flat.",
    documents: ["Pan_Card.jpg", "Salary_Slips.zip"]
  },
  { 
    id: "LD-2025-800", name: "Amit Shah", mobile: "9988776655", email: "amit.shah@rel.in",
    location: "Ahmedabad, Gujarat", product: "Mutual Fund", category: "Investment", 
    amount: "50,000", date: "2025-12-20", status: "Approved",
    additional: "Monthly SIP of 50k starting next month.",
    documents: ["KYC_Verified.png"]
  }
];

export default function LeadDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredLeads = MOCK_LEADS.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.mobile.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. HEADER SECTION */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and process your incoming leads</p>
        </div>

        {/* 2. TABLE CONTROL BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by client name, ID or mobile..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 font-medium">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 text-gray-600 rounded-md px-2 py-1 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <button className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm">
              <FileUp className="w-4 h-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>

        {/* 3. MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lead ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client Details</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product / Category</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">{lead.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{lead.name}</span>
                        <span className="text-xs text-gray-500">{lead.mobile}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">{lead.product}</span>
                        <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">{lead.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹ {lead.amount.replace('₹', '').trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${
                        lead.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                        lead.status === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        lead.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-bold underline underline-offset-4 decoration-2"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. PAGINATION FOOTER */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white">Previous</button>
              <button className="ml-3 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white">Next</button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">{filteredLeads.length}</span> of <span className="font-semibold text-gray-900">{filteredLeads.length}</span> leads
                </p>
              </div>
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="px-2 py-2 rounded-l-md border border-gray-300 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="z-10 bg-blue-50 border-blue-500 text-blue-600 px-4 py-2 border text-sm font-bold">
                  1
                </button>
                <button className="px-2 py-2 rounded-r-md border border-gray-300 bg-white text-gray-400 hover:bg-gray-50 transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* 5. POP-UP MODAL (CENTERED) */}
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${selectedLead ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setSelectedLead(null)} 
          />
          
          {/* Modal Card */}
          <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 transform ${selectedLead ? 'scale-100' : 'scale-95'}`}>
            {selectedLead && (
              <>
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-0.5">{selectedLead.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedLead(null)} 
                    className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-900 transition-all shadow-sm border border-transparent hover:border-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Client Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-blue-600 text-lg font-bold shadow-sm">
                          {selectedLead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{selectedLead.name}</p>
                          <p className="text-sm text-gray-500 font-medium">{selectedLead.mobile}</p>
                        </div>
                      </div>
                      <div className="space-y-3 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-gray-600">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-sm font-medium">{selectedLead.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="text-sm font-medium">{selectedLead.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Section */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Financial Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                        <p className="text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-wider">Loan Amount</p>
                        <p className="text-2xl font-black text-gray-900 flex items-center gap-1">
                          <IndianRupee size={20} /> {selectedLead.amount.replace('₹', '').trim()}
                        </p>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Product</p>
                        <p className="text-base font-bold text-gray-900">{selectedLead.product}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase">{selectedLead.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Remarks Section */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Additional Remarks</h4>
                    <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex gap-3">
                      <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 leading-relaxed italic">
                        "{selectedLead.additional}"
                      </p>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Documents</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedLead.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 transition-all cursor-pointer group shadow-sm">
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-gray-400 group-hover:text-blue-500" />
                            <span className="text-[13px] font-medium text-gray-700 truncate max-w-[150px]">{doc}</span>
                          </div>
                          <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 bg-white">
                   <div className="flex gap-4">
                     <button 
                       onClick={() => setSelectedLead(null)}
                       className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                     >
                       Close
                     </button>
                     <button className="flex-[2] bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                        Process Lead
                     </button>
                   </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}