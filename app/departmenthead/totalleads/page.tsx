"use client";
import { FC, useState, useMemo, useEffect } from "react";
import { DepartmentHeadService } from "../../services/departmentHeadService";
import { X, Eye, FileText, Download, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

// --- Interfaces ---
export interface RM {
  sub_category: any;
  id: string;
  name: string;
  department: string;
}

export interface Lead {
  rawData?: any;
  detailLeadId: string;
  assignedRMSubcategory: string;
  assignedRMDepartment: string;
  dsaMobile: string;
  id: string;
  refId: string;
  clientName: string;
  clientType: 'Referral' | 'Detailed';
  contactNumber: string;
  email: string;
  product: string;
  department: string;
  subCategory: string;
  notes: string;
  status: string;
  assignedTo: string;
  rmId: string;
  dsaName: string;
  dsaAdvId: string;
  createdDate: string;
  createdTime: string;
  documents: any[];
  selfLogin?: boolean;
  acceptanceStatus?: 'yes' | 'no' | 'pending';
  firstRM?: string;
  firstRMId?: string;
  currentRM?: string;
  previousRM?: string;
  previousRMId?: string;
  totalMandatoryDocs?: number;
  uploadedMandatoryDocs?: number;
  dob?: string;
  employmentType?: string;
  hasOtherLoan?: boolean;
  loanAmount?: string;
  loanType?: string;
  location?: string;
  otherIncome?: string;
  otherIncomeAmount?: string;
  otherLoanAmount?: string;
  uploadedDocuments?: any[]; // Added for document viewing
  pendingDocuments?: any[];
}

// --- Independent Column Components: HEADERS ---

const DetailedHeader = () => (
  <tr>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">ID</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Lead ID</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">DSA Details</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Client Details</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Department</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Notes</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Status</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Self-Login</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Acceptance Status</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Assigned RM</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Current RM</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Docs</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Action</th>
  </tr>
);

const ReferralHeader = () => (
  <tr>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">ID</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Ref ID</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Client Details</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Department</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">DSA Partner</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Notes</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Status</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Assigned RM</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Created</th>
  </tr>
);

// --- Independent Column Components: ROWS ---

const DetailedRow = ({ lead, onAssign, onView, onViewDocs }: {
  lead: Lead;
  onAssign: (l: Lead) => void;
  onView: (l: Lead) => void;
  onViewDocs: (l: Lead) => void;
}) => (
  <tr className="hover:bg-gray-50/50 group text-sm">
    <td className="px-6 py-4 text-gray-700 font-medium">{lead.id}</td>
    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{lead.detailLeadId}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-800">{lead.dsaName}</div>
      <div className="text-[11px] text-gray-500">{lead.dsaMobile}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900">{lead.clientName}</div>
      <div className="text-xs text-blue-600 font-semibold">
        {lead.contactNumber === "NA" ? "Mobile: Not Provided" : lead.contactNumber}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-gray-900 font-medium">{lead.product}</div>
      <div className="text-[11px] text-gray-500">{lead.department}</div>
    </td>
    <td className="px-6 py-4"><div className="text-xs text-gray-500 max-w-[120px] truncate" title={lead.notes}>{lead.notes}</div></td>
    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold uppercase">{lead.status}</span></td>
    <td className="px-6 py-4 text-gray-600">{lead.selfLogin ? "Yes" : "No"}</td>
    <td className="px-6 py-4 capitalize text-gray-600">{lead.acceptanceStatus}</td>
    <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
      <div className="flex flex-col">
        <span className="text-gray-900">{lead.firstRM}</span>
        <span className="text-[10px] text-gray-400">ID: {lead.firstRMId}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{lead.assignedTo}</span>
          <button onClick={() => onAssign(lead)} className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded">Reassign</button>
        </div>
        <span className="text-[10px] text-gray-400">ID: {lead.rmId}</span>
      </div>
    </td>
    {/* FIXED DOCS COLUMN: Made it clickable */}
    <td className="px-6 py-4">
      <button
        onClick={() => onViewDocs(lead)}
        className="flex items-center gap-1 text-blue-600 font-bold hover:underline bg-blue-50 px-2 py-1 rounded"
      >
        {lead.uploadedMandatoryDocs}/{lead.totalMandatoryDocs}
        <Eye size={14} />
      </button>
    </td>
    <td className="px-6 py-4">
      <button 
        onClick={() => onView(lead)}
        className="text-blue-600 font-medium hover:underline"
      >
        View
      </button>
    </td>
  </tr>
);

const ReferralRow = ({ lead, onAssign }: { lead: Lead; onAssign: (l: Lead) => void }) => (
  <tr className="hover:bg-gray-50/50 group text-sm">
    <td className="px-6 py-4 text-gray-700 font-medium">{lead.id}</td>
    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{lead.refId}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900">{lead.clientName}</div>
      <div className="text-xs text-blue-600 font-semibold">
        {lead.contactNumber === "NA" ? "Mobile: Not Provided" : lead.contactNumber}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-gray-900 font-medium">{lead.product}</div>
      <div className="text-[12px] text-gray-700">{lead.subCategory}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-gray-900 font-medium">{lead.dsaName}</div>
      <div className="text-[11px] text-gray-500">{lead.dsaAdvId}</div>
    </td>
    <td className="px-6 py-4"><div className="text-xs text-gray-600 max-w-[200px] truncate">{lead.notes}</div></td>
    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold uppercase">{lead.status}</span></td>
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{lead.assignedTo}</span>
          <button onClick={() => onAssign(lead)} className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded">Reassign</button>
        </div>
        <span className="text-[10px] text-gray-400">ID: {lead.rmId}</span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-gray-700 font-medium">{lead.createdDate}</div>
      <div className="text-[11px] text-gray-500">{lead.createdTime}</div>
    </td>
  </tr>
);

// --- Main LeadTable Component ---

const LeadTable: FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rms, setRms] = useState<RM[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'referral' | 'detailed'>('referral');
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [serverTotalCount, setServerTotalCount] = useState(0);
  
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [viewingDocs, setViewingDocs] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [docList, setDocList] = useState<{ uploaded: any[], pending: any[] }>({ uploaded: [], pending: [] });

  const [eligibleRms, setEligibleRms] = useState<any[]>([]);
  const [selectedRmId, setSelectedRmId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchingRms, setFetchingRms] = useState(false);

  const mapDetailedLead = (item: any): Lead => {
    const dateObj = item.created_at ? new Date(item.created_at) : new Date();
    return {
      rawData: item,
      id: item.id.toString(),
      detailLeadId: item.detail_lead_id || "-",
      refId: "-", 
      clientName: item.lead_name || "Unknown",
      clientType: 'Detailed',
      contactNumber: item.contact_number || "NA",
      email: item.email || "N/A",
      product: item.product_type || "N/A",
      department: item.department || "N/A",
      subCategory: item.form_data?.loanType || "N/A",
      notes: item.notes || "No notes available",
      status: (item.lead_status || 'new').toLowerCase(),
      selfLogin: item.is_self_login,
      acceptanceStatus: item.rm_acceptance_status?.toLowerCase(),
      firstRM: item.rm_history?.first_rm?.name || "N/A",
      firstRMId: (item.rm_history?.first_rm?.id || "N/A").toString(),
      currentRM: item.rm_history?.current_rm?.name || "N/A",
      previousRM: item.rm_history?.previous_rm?.name || "N/A",
      previousRMId: (item.rm_history?.previous_rm?.id || "N/A").toString(),
      rmId: (item.rm_history?.current_rm?.id || "N/A").toString(),
      assignedTo: item.rm_history?.current_rm?.name || "Unassigned",
      assignedRMDepartment: "N/A",
      assignedRMSubcategory: "N/A",
      dsaName: item.dsa_name || "Direct",
      dsaAdvId: item.dsa_adv_id || "N/A",
      dsaMobile: item.dsa_mobile || "N/A",
      createdDate: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      totalMandatoryDocs: parseInt(item.total_mandatory_docs) || 0,
      uploadedMandatoryDocs: parseInt(item.uploaded_mandatory_docs) || 0,
      documents: [],
      dob: item.form_data?.dob || "N/A",
      employmentType: item.form_data?.employmentType || "N/A",
      hasOtherLoan: item.form_data?.hasOtherLoan || false,
      loanAmount: item.form_data?.loanAmount || "N/A",
      loanType: item.form_data?.loanType || "N/A",
      location: item.form_data?.location || "N/A",
      otherIncome: item.form_data?.otherIncome || "N/A",
      otherIncomeAmount: item.form_data?.otherIncomeAmount || "N/A",
      otherLoanAmount: item.form_data?.otherLoanAmount || "N/A",
      uploadedDocuments: item.uploaded_documents || [],
      pendingDocuments: item.pending_documents || [],
    };
  };

  const handleViewDocs = (lead: Lead) => {
    setSelectedLead(lead);
    setDocList({
      uploaded: lead.uploadedDocuments || [],
      pending: lead.pendingDocuments || []
    });
    setViewingDocs(true);
  };

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  const mapReferralLead = (item: any): Lead => {
    const dateObj = item.created_at ? new Date(item.created_at) : new Date();
    return {
      id: item.id.toString(),
      refId: item.ref_id || "-",
      detailLeadId: "-",
      clientName: item.lead_name || "Unknown",
      clientType: 'Referral',
      contactNumber: item.contact_number || "NA",
      email: item.email || "N/A",
      product: item.department || "N/A",
      department: item.department || "N/A",
      subCategory: item.sub_category || "N/A",
      notes: item.notes || "No notes available",
      status: (item.lead_status || 'new').toLowerCase(),
      assignedTo: item.assigned_rm_name || "Unassigned",
      rmId: (item.assigned_rm_id || "N/A").toString(),
      assignedRMDepartment: item.assigned_rm_department || "N/A",
      assignedRMSubcategory: "N/A",
      dsaName: item.dsa_name || "Direct",
      dsaAdvId: item.dsa_adv_id || "N/A",
      dsaMobile: item.dsa_mobile || "N/A",
      createdDate: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      documents: []
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let leadsResponse;
      let mappedData: Lead[] = [];
      if (activeTab === 'detailed') {
        leadsResponse = await DepartmentHeadService.getDetailedLeadsPaged(currentPage, pageSize);
        setServerTotalCount(leadsResponse.pagination?.totalRecords || leadsResponse.count || 0);
        mappedData = (leadsResponse.leads || []).map(mapDetailedLead);
      } else {
        leadsResponse = await DepartmentHeadService.getDepartmentReferralLeads();
        mappedData = (leadsResponse.leads || []).map(mapReferralLead);
      }
      const rmsResponse = await DepartmentHeadService.getRelationshipManagers?.() || { rms: [] };
      setLeads(mappedData);
      setRms(rmsResponse.rms || []);
    } catch (error) {
      toast.error("Failed to fetch leads:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab, currentPage, pageSize]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, categoryFilter, activeTab]);

  const categoryOptions = useMemo(() => {
    const categories = leads.map(lead => lead.subCategory);
    return Array.from(new Set(categories)).filter(c => c !== "N/A").sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || lead.dsaName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "" || lead.subCategory === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [leads, searchTerm, categoryFilter]);

  const totalLeadsCount = activeTab === 'detailed' ? serverTotalCount : filteredLeads.length;
  const totalPages = Math.ceil(totalLeadsCount / pageSize);

  const paginatedLeads = useMemo(() => {
    if (activeTab === 'detailed') return filteredLeads;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, activeTab, currentPage, pageSize]);

  const handleAssignClick = async (lead: Lead) => {
    setSelectedLead(lead);
    setSelectedRmId(""); // Reset selection
    setFetchingRms(true);
    setIsAssignModalOpen(true);

    try {
      // Fetch only RMs eligible for this specific lead
      const response = await DepartmentHeadService.getEligibleRMs(lead.id);
      setEligibleRms(response.rms || []);
    } catch (error) {
      toast.error("Failed to fetch eligible RMs");
    } finally {
      setFetchingRms(false);
    }
  };

  const handleConfirmReassign = async () => {
    if (!selectedLead || !selectedRmId) return;

    setIsSubmitting(true);
    try {
      await DepartmentHeadService.reassignLead(selectedLead.id, selectedRmId);
      setIsAssignModalOpen(false);
      fetchData(); // Refresh the table to show the new RM
    } catch (error) {
      toast.error("Reassignment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  if (loading) return <div className="p-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6 font-sans text-gray-300 relative">
      <div className="mb-6 mt-4 border-b flex gap-6">
        {['referral', 'detailed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-700'}`}>
            {tab} Leads
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">{activeTab} Leads</h2>
        <div className="flex gap-3">
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="border rounded px-2 py-2 text-sm text-gray-600 bg-white">
            {[5, 10, 20, 50].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border p-2 rounded-md text-sm text-gray-600 bg-white min-w-[140px]">
            <option value="">All Categories</option>
            {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="text" placeholder="Search..." className="border text-gray-700 p-2 rounded-md text-sm w-64" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto scrollbar-x-thin min-h-auto">
          <table className="min-w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 z-10 bg-gray-50 text-[12px] font-bold text-gray-700">
              {activeTab === 'detailed' ? <DetailedHeader /> : <ReferralHeader />}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  activeTab === 'detailed' 
                    ? <DetailedRow
                      key={lead.id}
                      lead={lead}
                      onAssign={handleAssignClick}
                      onView={handleViewClick}
                      onViewDocs={handleViewDocs} // FIXED: Passing the actual function instead of the error function
                    />
                    : <ReferralRow
                      key={lead.id}
                      lead={lead}
                      onAssign={handleAssignClick}
                    />
                ))
              ) : (
                <tr><td colSpan={14} className="px-4 py-20 text-center text-gray-500 font-medium">No leads found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-[13px] text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalLeadsCount)} of {totalLeadsCount} entries
          </p>
          <div className="flex gap-1">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 border rounded text-xs disabled:opacity-30">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 text-xs border rounded ${currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600'}`}>{page}</button>
            ))}
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 border rounded text-xs disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>

      {/* 1. DOCUMENT LIST MODAL */}
      {viewingDocs && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Lead Documents</h3>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Client: {selectedLead?.clientName}</p>
              </div>
              <button onClick={() => setViewingDocs(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Uploaded Section */}
                <div>
                  <h4 className="text-xs font-bold text-green-600 uppercase mb-3 flex items-center gap-2">
                    Uploaded ({docList.uploaded.length})
                  </h4>
                  {docList.uploaded.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {docList.uploaded.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-green-100 rounded-lg bg-green-50/50">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-green-600" />
                            <span className="text-sm font-semibold text-gray-700">{doc.document_label}</span>
                          </div>
                          <button
                            onClick={() => { setPreviewUrl(doc.file_url); setPreviewTitle(doc.document_label); }}
                            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded font-bold uppercase hover:bg-blue-700 flex items-center gap-1"
                          >
                            <Eye size={12} /> View
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (<p className="text-xs text-gray-400 italic">No uploaded documents found.</p>)}
                </div>

                {/* Pending Section */}
                {docList.pending.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-orange-600 uppercase mb-3">Pending ({docList.pending.length})</h4>
                    {docList.pending.map((doc, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">{doc.document_label}</span>
                        <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold uppercase">Required</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button onClick={() => setViewingDocs(false)} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold uppercase hover:bg-gray-300 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FILE PREVIEW MODAL */}
      {previewUrl && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">{previewTitle}</h3>
              <div className="flex items-center gap-4">
                <a href={previewUrl} download target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-bold">
                  <Download size={18} /> Download
                </a>
                <button onClick={() => setPreviewUrl(null)} className="text-gray-500 hover:text-black transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-grow bg-gray-100 flex items-center justify-center overflow-hidden p-4">
              {isImage(previewUrl) ? (
                <Image src={previewUrl} alt="Preview" width={800} height={600} className="max-w-full max-h-full object-contain shadow-lg" />
              ) : (
                <iframe src={`${previewUrl}#toolbar=0`} className="w-full h-full border-none rounded-lg shadow-inner" title="PDF Preview" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* REASSIGN RM MODAL */}
      {isAssignModalOpen && selectedLead && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Reassign Relationship Manager</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Current Assignment</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mt-1">
                  <p className="text-sm font-semibold text-gray-700">{selectedLead.assignedTo}</p>
                  <p className="text-[11px] text-gray-500">Current RM ID: {selectedLead.rmId}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tet-gray-700">Select New RM</label>
                {fetchingRms ? (
                  <div className="flex items-center gap-2 mt-2 text-blue-600 text-sm">
                    <Loader2 className="animate-spin" size={16} /> Loading eligible RMs...
                  </div>
                ) : (
                  <select
                    value={selectedRmId}
                    onChange={(e) => setSelectedRmId(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- Choose RM --</option>
                    {eligibleRms.map((rm) => (
                      <option key={rm.id} value={rm.id}>
                        {rm.name} (ID: {rm.id})
                      </option>
                    ))}
                  </select>
                )}
                {eligibleRms.length === 0 && !fetchingRms && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> No other eligible RMs found for this department.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isSubmitting}
                  onClick={() => setIsAssignModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
                >
                  CANCEL
                </button>
                <button
                  disabled={isSubmitting || !selectedRmId}
                  onClick={handleConfirmReassign}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "CONFIRM"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* 1. Header */}
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <div>
              <h3 className="font-bold text-gray-800 text-lg">Application Details</h3>
                <p className="text-xs text-blue-600 font-bold">Detailed Lead ID: {selectedLead.detailLeadId}</p>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto custom-scrollbar">

              {/* 2. DEADLINE BREACH WARNING (Conditional) */}
              {selectedLead.rawData?.is_deadline_breached && (
                <div className="bg-red-50 border-b border-red-100 p-4 flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-red-800 font-bold text-sm">RM DEADLINE BREACHED</h4>
                    <p className="text-red-600 text-xs font-medium">RM haven&apos;t accepted this lead before the deadline.</p>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* 3. Section: Client & Product Details */}
                <div className="mb-8">
                  <h4 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    Client & Product <span className="h-[1px] flex-1 bg-blue-100"></span>
                  </h4>
                  <div className="grid grid-cols-3 gap-6">
              <DetailItem label="Client Name" value={selectedLead.clientName} />
                    <DetailItem label="Contact Number" value={selectedLead.contactNumber} />
                    <DetailItem label="Client Email" value={selectedLead.email} />
                    <DetailItem label="Department" value={selectedLead.department} />
                    <DetailItem label="Product Type" value={selectedLead.product} />
                    <DetailItem label="Lead Status" value={<span className="text-blue-700 font-bold uppercase">{selectedLead.rawData?.lead_status}</span>} />
                  </div>
                </div>
                {/* 6. Section: Dynamic Form Data */}
                <div className="mb-8">
                  <h4 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    Application Detailed Data <span className="h-[1px] flex-1 bg-blue-100"></span>
                  </h4>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                    {selectedLead.rawData?.form_data && Object.entries(selectedLead.rawData.form_data).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{key.replace(/_/g, ' ')}</span>
                        <span className="text-sm font-semibold text-gray-700">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Section: DSA Details */}
                <div className="mb-8">
                  <h4 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    DSA Partner <span className="h-[1px] flex-1 bg-blue-100"></span>
                  </h4>
                  <div className="grid grid-cols-3 gap-6">
                    <DetailItem label="DSA Name" value={selectedLead.rawData?.dsa_name} />
                    <DetailItem label="DSA Advisor ID" value={selectedLead.rawData?.dsa_adv_id} />
                    <DetailItem label="DSA Mobile" value={selectedLead.rawData?.dsa_mobile} />
                  </div>
                </div>

                {/* 5. Section: Assignment History */}
                <div className="mb-8">
                  <h4 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    Assignment Info <span className="h-[1px] flex-1 bg-blue-100"></span>
                  </h4>
                  <div className="grid grid-cols-3 gap-6">
                    <DetailItem label="Current RM" value={
                      <span className="bg-green-100 text-green-800 px-0.5 py-0.5 rounded border border-green-200 font-medium">
                        {selectedLead.rawData?.rm_history?.current_rm?.name}
                      </span>
                    }
                    />
                    <DetailItem label="Acceptance Status" value={selectedLead.rawData?.rm_acceptance_status} />
                    <DetailItem label="Assigned At" value={new Date(selectedLead.rawData?.rm_history?.assigned_at).toLocaleString()} />
                    <DetailItem
                      label="Deadline Date"
                      value={
                        <span className="text-red-600 bg-red-50 px-0.5 py-0.5 rounded border border-red-100 font-bold">
                          {new Date(selectedLead.rawData?.rm_action_deadline).toLocaleString()}
                        </span>
                      }
                    />
                    <DetailItem label="Assigned RM" value={
                      <span className="bg-yellow-100 text-yellow-800 px-0.5 py-0.5 rounded border border-yellow-200 font-medium">
                        {selectedLead.rawData?.rm_history?.first_rm?.name}
                      </span>
                    } />
                    <DetailItem label="Previous RM" value={
                      <span className="bg-orange-100 text-orange-800 px-0.5 py-0.5 rounded border border-orange-200 font-medium">
                        {selectedLead.rawData?.rm_history?.previous_rm?.name || "None"}
                      </span>
                    } />
                  </div>
                </div>



                {/* 7. Section: System Metadata (Created At & Self Login restored here) */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Created On:</span>
                    <span className="text-xs text-gray-600 font-medium">
                      {new Date(selectedLead.rawData?.created_at).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Self Login:</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedLead.rawData?.is_self_login ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {selectedLead.rawData?.is_self_login ? "YES" : "NO"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <button onClick={() => setIsViewModalOpen(false)} className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string, value: any }) => (
  <div>
    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-semibold text-gray-900 mt-0.5">{value || "N/A"}</p>
  </div>
);

export default LeadTable;