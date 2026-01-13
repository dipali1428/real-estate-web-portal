"use client";

import React, { useState, useEffect } from 'react';
import { RmService } from '../../services/rmService';
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
  ChevronRight,
  Loader2,
  UserCheck,
  Clock,
  ShieldCheck,
  Calendar
} from 'lucide-react';

// --- Types ---
interface Lead {
  id: number;
  travel_insurance_id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  duration: string;
  transport: string;
  sum_assured: string;
  status: string; 
  lead_status: string;
  created_at: string;
  updated_at: string;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id: string;
  dsa_mobile: string;
  assigned_rm_id?: number;
  assigned_rm_name?: string;
  assigned_rm_department?: string;
  assigned_rm_sub_category?: string;
}

export default function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // "My Lead" as default first tab
  const [leadType, setLeadType] = useState<'my_insurance' | 'incoming' | 'outgoing'>('my_insurance');
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchLeads = async () => {
    setLoading(false);
    // setLoading(true);
    // try {
    //   let response;
    //   // if (leadType === 'my_insurance') {
    //   //   // response = await RmService.getMyTravelInsuranceDetailedLeads();
    //   // } else if (leadType === 'incoming') {
    //   //   response = await RmService.getIncomingDetailedLeads();
    //   // } else {
    //   //   response = await RmService.getOutgoingDetailedLeads();
    //   // }
      
    //   // LOG STATEMENT TO SEE DATA IN CONSOLE
    //   console.log(`DEBUG: Data for ${leadType}:`, response);

    //   if (response && response.success) {
    //     setLeads(response.leads || []);
    //   }
    // } catch (error) {
    //   console.error("Error fetching leads:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchLeads();
  }, [leadType]);

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.travel_insurance_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1800px] mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Viewing {leadType === 'my_insurance' ? 'My Leads' : leadType}
            </p>
          </div>
        </div>

        {/* TABLE CONTROL BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm">
            <FileUp className="w-4 h-4 mr-2" /> Export Excel
          </button>
        </div>

        {/* TABS SECTION */}
        <div className="flex bg-gray-200 p-1 rounded-xl w-fit overflow-x-auto mb-6">
          <button onClick={() => setLeadType('my_insurance')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${leadType === 'my_insurance' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>My Lead</button>
          <button onClick={() => setLeadType('incoming')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${leadType === 'incoming' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Incoming</button>
          <button onClick={() => setLeadType('outgoing')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${leadType === 'outgoing' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Outgoing</button>
        </div>

        {/* MAIN TABLE CONTAINER */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto scrollbar-x-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:scrollbar-thumb-gray-400">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading Data...</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Lead ID</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Client Name</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 uppercase whitespace-nowrap tracking-wider">Phone</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Email</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Location</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Transport</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Duration</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Sum Assured</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Lead Status</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">DSA Name</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">DSA ID</th>
                    {leadType === 'outgoing' && (
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Assigned rm</th>
                    )}
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Created Date</th>
                    <th className="px-4 py-4 text-right text-sm font-bold text-gray-600 uppercase whitespace-nowrap tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-600">{lead.travel_insurance_id}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{lead.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{lead.phone}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{lead.email}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{lead.location}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-bold">{lead.transport}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{lead.duration} Days</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-700">₹{parseFloat(lead.sum_assured).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${lead.lead_status === 'OPEN' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                            {lead.lead_status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{lead.dsa_name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{lead.dsa_adv_id}</td>
                        {leadType === 'outgoing' && (
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{lead.assigned_rm_name || 'N/A'}</td>
                        )}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                          <button onClick={() => setSelectedLead(lead)} className="text-blue-600 hover:text-blue-900 font-bold underline decoration-2 underline-offset-4">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={leadType === 'outgoing' ? 14 : 13} className="px-6 py-10 text-center text-gray-500 italic">No leads found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* MODAL SECTION */}
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${selectedLead ? 'visible opacity-100' : 'invisible opacity-0'}`}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 transform ${selectedLead ? 'scale-100' : 'scale-95'}`}>
            {selectedLead && (
              <>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-0.5">{selectedLead.travel_insurance_id}</p>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-blue-600 text-lg font-bold">{selectedLead.name?.charAt(0)}</div>
                      <div>
                        <p className="font-bold text-gray-900">{selectedLead.name}</p>
                        <p className="text-sm text-gray-700">{selectedLead.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2"><Mail size={14} /> {selectedLead.email}</div>
                      <div className="flex items-center gap-2"><MapPin size={14} /> {selectedLead.location}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Sum Assured</p>
                      <p className="text-lg font-medium text-gray-700">₹{parseFloat(selectedLead.sum_assured).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-700 uppercase mb-1">Transport</p>
                      <p className="font-medium text-gray-700">{selectedLead.transport}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-700 uppercase mb-1">Duration</p>
                      <p className="font-medium text-gray-700">{selectedLead.duration} Days</p>
                    </div>
                  </div>

                  {selectedLead.assigned_rm_name && (
                    <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl">
                      <h4 className="text-[11px] font-bold text-purple-600 uppercase mb-3">Assigned rm</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="text-purple-600" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{selectedLead.assigned_rm_name}</p>
                            <p className="text-[10px] text-gray-900 font-bold">{selectedLead.assigned_rm_department}</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-white px-2 py-1 rounded border text-gray-900 font-medium">ID: {selectedLead.assigned_rm_id}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-green-50/50 border border-green-100 rounded-xl text-xs text-gray-700">
                    <p><strong>Created:</strong> {new Date(selectedLead.created_at).toLocaleString()}</p>
                    <p><strong>Updated:</strong> {new Date(selectedLead.updated_at).toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white flex gap-4">
                  <button onClick={() => setSelectedLead(null)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50">Close</button>
                  <button className="flex-[2] bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg">Process Lead</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}