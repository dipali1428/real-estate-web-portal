"use client";
import { FC, useState, useMemo, useEffect, ChangeEvent } from "react";
import { DashboardService } from "@/app/services/dashboardService";
import { Check, Clock, FileText, X } from "lucide-react";

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-100",
  submitted: "bg-blue-50 text-blue-700 border-blue-100",
  in_progress: "bg-yellow-50 text-yellow-700 border-yellow-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
  follow_up: "bg-purple-50 text-purple-700 border-purple-100",
  pending: "bg-gray-50 text-gray-700 border-gray-100",
};

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
  disbursmentAmount: string;
  formData?: any;
  isSelfLogin?: string;
  status?: string;
  referral_lead_status?: string;
  disbursement_amount?: string;
  rejectionNote?: string;
}

interface LeadTableProps {
  onEdit?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
}

const LeadTable: FC<LeadTableProps> = ({ onEdit, onDelete }) => {
  // Added 'all' to the activeTab type
  const [activeTab, setActiveTab] = useState<'all' | 'referral' | 'detailed'>('all');
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [viewingDetails, setViewingDetails] = useState<boolean>(false);
  const [fetchingDocs, setFetchingDocs] = useState<boolean>(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [documents, setDocuments] = useState<{ uploaded: any[], pending: any[] }>({
    uploaded: [],
    pending: []
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("");
  // Added 'all' to counts and cache
  const [counts, setCounts] = useState({ all: 0, referral: 0, detailed: 0 });
  const [cache, setCache] = useState<{ all: Lead[], referral: Lead[], detailed: Lead[] }>({
    all: [],
    referral: [],
    detailed: []
  });

  const formatValue = (val: any) => {
    if (!val) return "";
    return val.toString().replace(/"/g, "").trim();
  };

  useEffect(() => {
    setSearchTerm("");
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        if (cache[activeTab].length === 0) setLoading(true);

        // Always fetch both if it's the initial load or if 'all' is selected and cache is empty
        const isInitialLoad = cache.referral.length === 0 && cache.detailed.length === 0;
        let referralRes, detailedRes;

        if (isInitialLoad || activeTab === 'all') {
          [referralRes, detailedRes] = await Promise.all([
            DashboardService.getLeads(),
            DashboardService.getMyLeads()
          ]);

        } else {
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
                  disbursement_amount: item.disbursement_amount || "N/A",
                  isSelfLogin: item.is_self_login ? "Yes" : "No",
                  status: item.lead_status || "PENDING",
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
                rejectionNote: item.rejection_note || "-",
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

        // Merge both for 'all' leads and sort by date (newest first)
        newCache.all = [...newCache.referral, ...newCache.detailed].sort((a, b) => {
          return new Date(b.createdDate + ' ' + b.createdTime).getTime() - new Date(a.createdDate + ' ' + a.createdTime).getTime();
        });
        setCounts(prev => ({ ...prev, all: newCache.all.length }));

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

  const handleOpenDetails = (lead: Lead) => {
    setActiveLead(lead);
    setViewingDetails(true);
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

  const isLeadCompleted =
    activeLead?.status?.toLowerCase() === 'completed' ||
    activeLead?.referral_lead_status?.toLowerCase() === 'completed';

  const areAllDocsUploaded = documents.uploaded.length > 0 && documents.pending.length === 0;

  return (
    <div className="w-full mt-8">
      {/* Tabs and Search Section */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-4">
          <div className="flex space-x-8">
            {/* Added 'all' to the tabs array */}
            {['all', 'referral', 'detailed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 text-sm font-medium transition-colors border-b-2 capitalize ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab} Leads ({counts[tab as 'all' | 'referral' | 'detailed']})
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
        {!loading || data.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">ID</th>
                {/* Changed condition to handle 'all' tab using referral layout for uniformity */}
                {activeTab !== 'detailed' ? (
                  <>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Ref ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Rejection Note</th>
                    {activeTab === 'all' && <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Amount</th>}
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    {activeTab === 'all' && <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>}
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Lead ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Lead Name</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Dept</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Sub Category</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Amount</th>

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
                    {activeTab !== 'detailed' ? (
                      <>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{lead.refId}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.clientName}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{lead.contactNumber}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.product}</td>

                        <td className="px-4 py-4 text-sm text-gray-700">{lead.subCategory}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 min-w-[100px] whitespace-pre">{lead.rejectionNote || '--'}</td>
                        {/* <td className="px-4 py-4 text-sm text-gray-900">{formatValue(lead.disbursement_amount).replace(/\.0+$/, "")}</td> */}
                        {activeTab === 'all' && (
                          <td className="px-4 py-4 text-sm text-gray-900">{formatValue(lead.disbursement_amount).replace(/\.0+$/, "")}</td>
                        )}
                        <td className="px-4 py-4 text-sm text-gray-700">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${lead.clientType === 'Detailed' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                            {lead.clientType}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${statusStyles[(lead.status || lead.referral_lead_status)?.toLowerCase() || "pending"] || "bg-gray-50 text-gray-700 border-gray-100"}`}>
                            {lead.status || lead.referral_lead_status}
                          </span>
                        </td>
                        {activeTab === 'all' && (
                          <td className="px-4 py-4 text-center">
                            {lead.clientType === 'Detailed' ? (
                              <button onClick={() => handleOpenDetails(lead)} className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded border border-blue-100 font-bold hover:bg-blue-600 hover:text-white uppercase transition-all">
                                Details
                              </button>
                            ) : <span className="text-gray-300 text-[10px]">-</span>}
                          </td>
                        )}
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{lead.refId}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.clientName}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{lead.product}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{lead.subCategory}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{formatValue(lead.disbursement_amount).replace(/\.0+$/, "")}</td>
                        <td className="px-4 py-4 text-sm text-gray-700 font-medium">{lead.isSelfLogin}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-[#1CADA3] border border-[#1CADA3]">
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => handleOpenDetails(lead)} className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded border border-blue-100 font-bold hover:bg-blue-600 hover:text-white uppercase transition-all">
                            View Details
                          </button>
                        </td>
                      </>
                    )}
                    <td className="px-4 py-4 text-xs text-gray-700"><div>{lead.createdDate}</div><div className="text-gray-400">{lead.createdTime}</div></td>
                  </tr>
                ))
              ) : (<tr><td colSpan={10} className="px-4 py-12 text-center text-gray-400">No leads found.</td></tr>)}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500">Loading data...</div>
        )}
      </div>

      {/* DETAIL MODAL (Kept Exactly Same) */}
      {viewingDetails && activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#1e5d5a]">Lead Application Details</h3>
              <button onClick={() => setViewingDetails(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>

            <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
              <div className="flex-[1.5] p-8 border-r border-gray-100">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{activeLead.clientName}</h4>
                    <p className="text-blue-600 font-medium uppercase text-xs tracking-wider">{activeLead.product} • {activeLead.subCategory}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusStyles[activeLead.status?.toLowerCase() || activeLead.referral_lead_status?.toLowerCase() || "pending"]}`}>
                    {activeLead.status || activeLead.referral_lead_status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
                  <div><p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Lead ID</p><p className="text-sm font-semibold text-gray-700">{activeLead.refId}</p></div>
                  <div><p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Applied Date</p><p className="text-sm font-semibold text-gray-700">{activeLead.createdDate}</p></div>

                  {activeLead.formData && Object.entries(activeLead.formData).map(([key, value]) => {
                    if (typeof value === 'object' || value === null) return null;
                    return (
                      <div key={key}>
                        <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                          {key.toLowerCase().includes('amount') ? `₹ ${formatValue(value).replace(/\.0+$/, "")}` : String(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#1e5d5a] mb-4">
                    <FileText size={18} />
                    <h5 className="font-bold uppercase text-xs tracking-widest">Documents Status</h5>
                  </div>
                  <div className="space-y-2">
                    {documents.uploaded.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-green-50/20">
                        <span className="text-sm font-medium text-gray-600">{doc.document_label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase border border-green-200">
                            {doc.status || "Uploaded"}
                          </span>
                          <button
                            onClick={() => { setPreviewUrl(doc.file_url); setPreviewTitle(doc.document_label); }}
                            className="text-blue-600 text-xs font-bold hover:underline"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                    {!isLeadCompleted && documents.pending.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
                        <span className="text-sm font-medium text-gray-500">{doc.document_label}</span>
                        {uploadingKey === doc.document_key ? (
                          <span className="text-[10px] text-blue-600 font-bold animate-pulse">Uploading...</span>
                        ) : (
                          <label className="cursor-pointer text-blue-600 text-[10px] font-bold uppercase hover:text-blue-800">Upload <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, doc)} /></label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-gray-50/50 p-8">
                <h5 className="font-bold text-gray-800 mb-8 uppercase text-xs tracking-widest">Application Progress</h5>
                <div className="relative">
                  {[
                    { label: "Application Submitted", date: activeLead.createdDate, completed: true },
                    {
                      label: "Document Verification",
                      date: (isLeadCompleted || areAllDocsUploaded) ? "Verified" : "Pending Verification",
                      completed: isLeadCompleted || areAllDocsUploaded
                    },
                    {
                      label: "RM Review",
                      date: isLeadCompleted ? "Completed" : "In Progress",
                      completed: isLeadCompleted,
                      active: !isLeadCompleted && areAllDocsUploaded
                    },
                    {
                      label: "Sanction / Approval",
                      date: isLeadCompleted ? "Sanctioned" : "-",
                      completed: isLeadCompleted
                    },
                    {
                      label: "Disbursement",
                      date: isLeadCompleted ? "Disbursed" : "-",
                      completed: isLeadCompleted
                    },
                  ].map((step, idx, arr) => (
                    <div key={idx} className="flex gap-4 mb-8 last:mb-0 relative">
                      {idx !== arr.length - 1 && (
                        <div className={`absolute left-[11px] top-6 w-[2px] h-10 ${step.completed ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                      )}
                      <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${step.completed ? 'bg-emerald-500 text-white shadow-sm' :
                        step.active ? 'bg-blue-600 text-white shadow-lg animate-pulse' : 'bg-gray-200 text-white'
                        }`}>
                        {step.completed ? <Check size={12} strokeWidth={4} /> : <Clock size={12} />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold tracking-tight ${step.completed || step.active ? 'text-gray-800' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                        <p className={`text-[10px] font-medium ${!step.completed && idx === 1 ? 'text-orange-500' : 'text-gray-500'}`}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-8 py-4 border-t border-gray-100 flex justify-end bg-white">
              <button onClick={() => setViewingDetails(false)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase hover:bg-gray-200 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL (Kept Exactly Same) */}
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
    </div>
  );
};

export default LeadTable;