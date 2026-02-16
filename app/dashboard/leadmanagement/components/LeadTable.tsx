"use client";
import { FC, useState, useMemo, useEffect, ChangeEvent } from "react";
import { DashboardService } from "@/app/services/dashboardService";

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-100",
  submitted: "bg-blue-50 text-blue-700 border-blue-100",
  in_progress: "bg-yellow-50 text-yellow-700 border-yellow-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
  follow_up: "bg-purple-50 text-purple-700 border-purple-100",
  pending: "bg-gray-50 text-gray-700 border-gray-100",
};


// ... (Lead interface remains exactly the same)
export interface Lead {
  id: string;
  refId: string;
  clientName: string;
  clientType: string;
  contactNumber: string;
  email: string;
  product: string;
  subCategory: string;
  notes: string;
  createdDate: string;
  createdTime: string;
  formData?: any;
  isSelfLogin?: string;
  status?: string;
  referral_lead_status?: string;
}

interface LeadTableProps {
  onEdit?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
}

const LeadTable: FC<LeadTableProps> = ({ onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'referral' | 'detailed'>('referral');
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewingDocs, setViewingDocs] = useState<boolean>(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [viewingForm, setViewingForm] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [fetchingDocs, setFetchingDocs] = useState<boolean>(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [documents, setDocuments] = useState<{ uploaded: any[], pending: any[] }>({
    uploaded: [],
    pending: []
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [counts, setCounts] = useState({ referral: 0, detailed: 0 });

  // NEW: Cache state to store data for both tabs to make switching instant
  const [cache, setCache] = useState<{ referral: Lead[], detailed: Lead[] }>({ referral: [], detailed: [] });

  // Optimized Search/Page reset (Removed setData([]) to prevent blank screen flicker)
  useEffect(() => {
    setSearchTerm("");
    setCurrentPage(1);
  }, [activeTab]);

  // Optimized Data Fetching Logic
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // If we already have cached data, don't show the global loader for a smoother experience
        if (cache[activeTab].length === 0) setLoading(true);

        // Optimization: Fetch both on the very first load to get counts and speed up the switch
        const isInitialLoad = cache.referral.length === 0 && cache.detailed.length === 0;

        let referralRes, detailedRes;

        if (isInitialLoad) {
          // Fetch both in parallel only once
          [referralRes, detailedRes] = await Promise.all([
            DashboardService.getLeads(),
            DashboardService.getMyLeads()
          ]);
        } else {
          // Otherwise just fetch the active tab in the background
          if (activeTab === 'referral') {
            referralRes = await DashboardService.getLeads();
         
          } else {
            detailedRes = await DashboardService.getMyLeads();

          }
        }

        const processData = (response: any, type: 'referral' | 'detailed') => {
          if (response && response.success && Array.isArray(response.data)) {
            return response.data.map((item: any) => {
              const dateObj = new Date(item.created_at);
              if (type === 'detailed') {
                return {
                  id: item.id.toString(),
                  refId: item.detail_lead_id || "-",
                  clientName: item.lead_name || "N/A",
                  clientType: "Detailed",
                  contactNumber: item.contact_number || "N/A",
                  email: item.email || "N/A",
                  product: item.department || "N/A",
                  subCategory: item.sub_category || "-",
                  notes: "-",
                  formData: item.form_data || null,
                  isSelfLogin: item.is_self_login ? "Yes" : "No",
                  status: item.lead_status || "N/A",
                  createdDate: isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleDateString(),
                  createdTime: isNaN(dateObj.getTime()) ? "" : dateObj.toLocaleTimeString(),
                };
              }
              const clientName = item.lead_name || item.client?.name || "N/A";
              return {
                id: item.id.toString(),
                refId: item.ref_id || "-",
                clientName: clientName,
                clientType: "Referral",
                contactNumber: item.contact_number || item.client?.mobile || "N/A",
                email: item.email || item.client?.email || "N/A",
                product: item.department || item.product_type || "General",
                subCategory: item.sub_category || "-",
                notes: item.notes || "-",
                 referral_lead_status: item.referral_lead_status || "PENDING",
                createdDate: isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleDateString(),
                createdTime: isNaN(dateObj.getTime()) ? "" : dateObj.toLocaleTimeString(),
              };
            });
          }
          return [];
        };

        const newCache = { ...cache };
        if (referralRes) {
          newCache.referral = processData(referralRes, 'referral');
          setCounts(prev => ({ ...prev, referral: newCache.referral.length }));
        }
        if (detailedRes) {
          newCache.detailed = processData(detailedRes, 'detailed');
          setCounts(prev => ({ ...prev, detailed: newCache.detailed.length }));
        }

        setCache(newCache);
        setData(newCache[activeTab]);
      } catch (error) {
        console.error(`Failed to fetch leads:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [activeTab]);

  // Keep data in sync with cache when cache updates
  useEffect(() => {
    setData(cache[activeTab]);
  }, [cache, activeTab]);

  const loadDocuments = async (leadId: string) => {
    setFetchingDocs(true);
    try {
      const response = await DashboardService.getLeadDocuments(leadId);
      if (response && response.success) {
        setDocuments({ uploaded: response.uploaded || [], pending: response.pending || [] });
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setFetchingDocs(false);
    }
  };

  const handleViewDocuments = (lead: Lead) => {
    setActiveLead(lead);
    setViewingDocs(true);
    loadDocuments(lead.id);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, doc: any) => {
    const file = e.target.files?.[0];
    if (!file || !activeLead) return;
    const refId = activeLead.refId;
    setUploadingKey(doc.document_key);
    const formData = new FormData();
    formData.append("leadDbId", refId);
    formData.append("documents", file);
    const metadata = [{ key: doc.document_key, label: doc.document_label }];
    formData.append("metadata", JSON.stringify(metadata));
    try {
      const response = await DashboardService.uploadLeadDocument(refId, formData);
      if (response.success) {
        alert("Document uploaded successfully!");
        loadDocuments(activeLead.id);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadingKey(null);
    }
  };

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

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
  const endIndex = startIndex + itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full mt-8">
      {/* Tabs Section */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-4">
          <div className="flex space-x-8">
            {['referral', 'detailed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 text-sm font-medium transition-colors border-b-2 capitalize ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab} Leads ({counts[tab as 'referral' | 'detailed']})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="text-xs text-gray-700 focus:outline-none bg-transparent font-semibold"
              >
                <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option>
              </select>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 text-xs text-gray-700"
              />
              <svg className="absolute left-3 top-2 h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-x-thin bg-white shadow-md rounded-lg border border-gray-200">
        {loading && data.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Loading data...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">ID</th>
                {activeTab === 'referral' ? (
                  <>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Ref ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Notes</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Lead Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Lead ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Lead Name</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Sub Category</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Self Login</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </>
                )}

                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLeads.length > 0 ? (
                currentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-center text-sm font-medium text-blue-600">{lead.id}</td>
                    {activeTab === 'referral' ? (
                      <>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{lead.refId}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.clientName}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{lead.contactNumber}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.product}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{lead.subCategory}</td>
                        <td className="px-4 py-4 text-sm text-gray-700 max-w-xs truncate">{lead.notes}</td>
                       <td className="px-4 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                            statusStyles[lead.referral_lead_status?.toLowerCase() || "pending"] ||
                            "bg-gray-50 text-gray-700 border-gray-100"
                          }`}
                        >
                          {lead.referral_lead_status}
                        </span>
                        </td>
                    
                       
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{lead.refId}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.clientName}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{lead.contactNumber}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{lead.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.product}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{lead.subCategory}</td>
                        <td className="px-4 py-4 text-sm text-gray-700 font-medium">{lead.isSelfLogin}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100">
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex flex-col gap-1 items-center">
                            <button onClick={() => handleViewDocuments(lead)} className="text-[10px] w-full bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 font-bold hover:bg-blue-600 hover:text-white uppercase transition-all">View Docs</button>
                            <button onClick={() => { setSelectedForm(lead.formData); setViewingForm(true); }} className="text-[10px] w-full bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100 font-bold hover:bg-gray-600 hover:text-white uppercase transition-all">View Form</button>
                          </div>
                        </td>
                      </>
                    )}
                    <td className="px-4 py-4 text-xs text-gray-700"><div>{lead.createdDate}</div><div className="text-gray-400">{lead.createdTime}</div></td>
                  </tr>
                ))
              ) : (<tr><td colSpan={10} className="px-4 py-12 text-center text-gray-400">No leads found.</td></tr>)}
            </tbody>
          </table>
        )}
      </div>

      {!loading && filteredLeads.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 mt-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-700">Showing <span className="font-bold">{startIndex + 1}</span> to <span>{Math.min(endIndex, filteredLeads.length)}</span> of <span className="font-bold">{filteredLeads.length}</span></div>
          <nav className="inline-flex -space-x-px shadow-sm">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-2 py-2 text-gray-700 border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50">Prev</button>
            {generatePageNumbers().map((p, idx) => (<button key={idx} onClick={() => typeof p === 'number' && setCurrentPage(p)} className={`px-4 py-2 text-sm border ${p === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-900 border-gray-300 hover:bg-gray-50'}`}>{p}</button>))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-2 py-2 text-gray-700 border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50">Next</button>
          </nav>
        </div>
      )}

      {/* DOCUMENT LIST MODAL */}
      {viewingDocs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Lead Documents</h3>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Lead: {activeLead?.clientName} | Ref: {activeLead?.refId}</p>
              </div>
              <button onClick={() => setViewingDocs(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {fetchingDocs ? (
                <div className="text-center py-12 text-gray-500">Fetching documents...</div>
              ) : activeLead?.isSelfLogin === "Yes" ? (
                <div className="text-center py-12">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                    <p className="text-sm font-bold text-blue-700">Self Login Application</p>
                    <p className="text-xs text-blue-600 mt-1">This application was processed via Direct Bank Login. No document uploads are required on this portal.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-green-600 uppercase mb-3">Uploaded ({documents.uploaded.length})</h4>
                    {documents.uploaded.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2">
                        {documents.uploaded.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-green-100 rounded-lg bg-green-50/50">
                            <span className="text-sm font-semibold text-gray-700">{doc.document_label}</span>
                            <button
                              onClick={() => { setPreviewUrl(doc.file_url); setPreviewTitle(doc.document_label); }}
                              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-bold uppercase hover:bg-blue-700"
                            >
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (<p className="text-xs text-gray-400 italic">No uploads found.</p>)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-600 uppercase mb-3">Pending ({documents.pending.length})</h4>
                    {documents.pending.map((doc, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">{doc.document_label}</span>
                        <div className="flex items-center gap-2">
                          {uploadingKey === doc.document_key ? (
                            <span className="text-[9px] text-blue-600 font-bold animate-pulse">UPLOADING...</span>
                          ) : (
                            <label className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded font-bold uppercase cursor-pointer hover:bg-blue-700 transition-colors">
                              Upload
                              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, doc)} />
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
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end"><button onClick={() => setViewingDocs(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold uppercase">Close</button></div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewUrl && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">{previewTitle}</h3>
              <button onClick={() => setPreviewUrl(null)} className="text-gray-500 hover:text-black font-bold text-xl">Close ✕</button>
            </div>
            <div className="flex-grow bg-gray-100 flex items-center justify-center overflow-hidden">
              {isImage(previewUrl) ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <iframe src={`${previewUrl}#toolbar=0`} className="w-full h-full border-none" title="PDF Preview" />
              )}
            </div>
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
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-sm text-gray-800 font-medium">{value?.toString() || "N/A"}</p>
                    </div>
                  ))}
                </div>
              ) : (<div className="text-center py-12 text-gray-400 italic">No form data.</div>)}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end"><button onClick={() => setViewingForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold uppercase">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;