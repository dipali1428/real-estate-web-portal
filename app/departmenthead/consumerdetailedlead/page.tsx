"use client";
import React, { FC, useState, useMemo, useEffect, ChangeEvent } from "react";
// Switched to DepartmentHeadService
import { DepartmentHeadService } from "../../services/departmentHeadService";
import { Search, FileUp, Loader2 } from 'lucide-react';

// Interface matching the reference design structure
export interface Lead {
  id: string;
  refId: string;
  clientName: string;
  contactNumber: string;
  email: string;
  product: string;
  subCategory: string;
  createdDate: string;
  createdTime: string;
  formData?: any;
}

const ConsumerDetailedLeads: FC = () => {
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal & Document States
  const [viewingDocs, setViewingDocs] = useState<boolean>(false);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [viewingForm, setViewingForm] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [fetchingDocs, setFetchingDocs] = useState<boolean>(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [documents, setDocuments] = useState<{ uploaded: any[], pending: any[] }>({ 
    uploaded: [], 
    pending: [] 
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      // Using the new endpoint from DepartmentHeadService
      const response = await DepartmentHeadService.getCustomerDetailLeads();
      
      if (response && response.success && Array.isArray(response.leads)) {
        const mappedLeads: Lead[] = response.leads.map((item: any) => {
          const dateObj = new Date(item.created_at);
          return {
            id: item.id.toString(),
            refId: item.customer_detail_lead_id || "-",
            clientName: item.lead_name || "N/A",
            contactNumber: item.contact_number || "N/A",
            email: item.email || "N/A",
            product: item.department || "N/A",
            subCategory: item.sub_category || "-",
            formData: item.form_data || item, 
            createdDate: isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleDateString(),
            createdTime: isNaN(dateObj.getTime()) ? "" : dateObj.toLocaleTimeString(),
          };
        });
        setData(mappedLeads);
      }
    } catch (error) {
      console.error("Failed to fetch consumer leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const loadDocuments = async (leadId: string) => {
    setFetchingDocs(true);
    try {
      const response = await DepartmentHeadService.getLeadDocuments(Number(leadId));
      if (response && response.success) {
        setDocuments({ 
            uploaded: response.uploaded || response.documents || [], 
            pending: response.pending || [] 
        });
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setFetchingDocs(false);
    }
  };

  const handleViewDocuments = (leadId: string) => {
    setActiveLeadId(leadId);
    setViewingDocs(true);
    loadDocuments(leadId);
  };

  // UI remains the same, but API call is removed
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, documentKey: string) => {
    const file = e.target.files?.[0];
    if (!file || !activeLeadId) return;

    // Simulate UI feedback without calling the API
    setUploadingKey(documentKey);
    console.log(`File selected for ${documentKey}:`, file.name);
    
    setTimeout(() => {
      setUploadingKey(null);
      alert("Selection captured (Upload API disabled)");
    }, 1000);
  };

  const filteredLeads = useMemo(() => {
    return data.filter(lead => {
      const search = searchTerm.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(search) ||
        lead.refId.toLowerCase().includes(search) ||
        lead.contactNumber.includes(searchTerm)
      );
    });
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Consumer Detailed Leads</h1>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
              <span className="text-xs font-medium text-gray-500 uppercase">Show</span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="text-sm text-gray-700 focus:outline-none bg-transparent">
                <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
              </select>
            </div>
            <div className="relative">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 text-sm text-gray-700" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium flex items-center transition-colors shadow-sm">
                <FileUp className="w-4 h-4 mr-2" /> Export Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          {loading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                <Loader2 className="animate-spin mb-2" /> Loading data...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Lead ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Lead Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Sub Category</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentLeads.length > 0 ? (
                  currentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-center text-sm font-medium text-blue-600">{lead.id}</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-600">{lead.refId}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">{lead.clientName}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{lead.contactNumber}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{lead.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{lead.product}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{lead.subCategory}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col gap-1 items-center">
                          <button onClick={() => handleViewDocuments(lead.id)} className="text-[10px] w-24 bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 font-bold hover:bg-blue-600 hover:text-white uppercase transition-all">View Docs</button>
                          <button onClick={() => { setSelectedForm(lead.formData); setViewingForm(true); }} className="text-[10px] w-24 bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100 font-bold hover:bg-gray-800 hover:text-white uppercase transition-all">View Form</button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-700"><div>{lead.createdDate}</div><div className="text-gray-400">{lead.createdTime}</div></td>
                    </tr>
                  ))
                ) : (<tr><td colSpan={10} className="px-4 py-12 text-center text-gray-400 italic">No leads found.</td></tr>)}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        {!loading && filteredLeads.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 mt-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-700">Showing <span className="font-bold">{startIndex + 1}</span> to <span>{Math.min(startIndex + itemsPerPage, filteredLeads.length)}</span> of <span className="font-bold">{filteredLeads.length}</span></div>
            <nav className="inline-flex -space-x-px shadow-sm">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-2 py-2 text-gray-700 border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 font-bold">Prev</button>
              {generatePageNumbers().map((p, idx) => (<button key={idx} onClick={() => setCurrentPage(p)} className={`px-4 py-2 text-sm border ${p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-900 border-gray-300 hover:bg-gray-50 font-medium'}`}>{p}</button>))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-2 py-2 text-gray-700 border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 font-bold">Next</button>
            </nav>
          </div>
        )}

        {/* DOCUMENT MODAL */}
        {viewingDocs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800">Lead Documents</h3>
                <button onClick={() => setViewingDocs(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {fetchingDocs ? (
                  <div className="text-center py-12 text-gray-500">Fetching documents...</div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-green-600 uppercase mb-3">Uploaded ({documents.uploaded.length})</h4>
                      {documents.uploaded.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {documents.uploaded.map((doc: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-green-100 rounded-lg bg-green-50/50">
                              <span className="text-sm font-semibold text-gray-700">{doc.document_name || doc.document_label}</span>
                              <a href={doc.document_url || doc.file_url} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-bold uppercase">View</a>
                            </div>
                          ))}
                        </div>
                      ) : ( <p className="text-xs text-gray-400 italic">No uploads found.</p> )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-orange-600 uppercase mb-3">Pending ({documents.pending.length})</h4>
                      {documents.pending.map((doc: any, index: number) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 mb-2 flex justify-between items-center">
                          <span className="text-sm text-gray-600">{doc.document_label}</span>
                          <div className="flex items-center gap-2">
                              {uploadingKey === doc.document_key ? (
                                  <span className="text-[9px] text-blue-600 font-bold animate-pulse uppercase">Uploading...</span>
                              ) : (
                                  <label className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded font-bold uppercase cursor-pointer hover:bg-blue-700 transition-colors">
                                      Upload
                                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, doc.document_key)} />
                                  </label>
                              )}
                              <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold uppercase">Required</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50"><button onClick={() => setViewingDocs(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold uppercase transition-colors hover:bg-gray-300">Close</button></div>
            </div>
          </div>
        )}

        {/* FORM DATA MODAL */}
        {viewingForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800">Lead Form Data</h3>
                <button onClick={() => setViewingForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {selectedForm ? (
                  <div className="grid grid-cols-1 gap-y-4">
                    {Object.entries(selectedForm).map(([key, value]: [string, any]) => (
                      <div key={key} className="border-b border-gray-100 pb-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm text-gray-800 font-medium">{value?.toString() || "N/A"}</p>
                      </div>
                    ))}
                  </div>
                ) : (<div className="text-center py-12 text-gray-400 italic">No form data.</div>)}
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50"><button onClick={() => setViewingForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold uppercase transition-colors hover:bg-gray-300">Close</button></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerDetailedLeads;