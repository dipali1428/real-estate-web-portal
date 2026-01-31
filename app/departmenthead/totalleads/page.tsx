"use client";
import { FC, useState, useMemo, useEffect } from "react";
import { DepartmentHeadService } from "../../services/departmentHeadService";
import { X } from "lucide-react"; // Assuming lucide-react is available based on previous context

// --- Interfaces ---
export interface RM {
  sub_category: any;
  id: string;
  name: string;
  department: string;
}

export interface Lead {
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
  currentRM?: string;
  previousRM?: string;
  totalMandatoryDocs?: number;
  uploadedMandatoryDocs?: number;
  // Specific Form Details
  dob?: string;
  employmentType?: string;
  hasOtherLoan?: boolean;
  loanAmount?: string;
  loanType?: string;
  location?: string;
  otherIncome?: string;
  otherIncomeAmount?: string;
  otherLoanAmount?: string;
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
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Acceptance</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Assigned RM</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Current RM</th>
    <th className="px-6 py-4 bg-gray-50 border-b border-gray-200 whitespace-nowrap">Previous RM</th>
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

const DetailedRow = ({ lead, onAssign, onView }: { lead: Lead; onAssign: (l: Lead) => void; onView: (l: Lead) => void }) => (
  <tr className="hover:bg-gray-50/50 group text-sm">
    <td className="px-6 py-4 text-gray-700 font-medium">{lead.id}</td>
    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{lead.detailLeadId}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-800">{lead.dsaName}</div>
      <div className="text-[11px] text-gray-500">{lead.dsaMobile}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="font-medium text-gray-900">{lead.clientName}</div>
      <div className="text-xs text-blue-600 font-semibold">{lead.contactNumber}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-gray-900 font-medium">{lead.product}</div>
      <div className="text-[11px] text-gray-500">{lead.subCategory}</div>
    </td>
    <td className="px-6 py-4"><div className="text-xs text-gray-500 max-w-[120px] truncate" title={lead.notes}>{lead.notes}</div></td>
    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold uppercase">{lead.status}</span></td>
    <td className="px-6 py-4 text-gray-600">{lead.selfLogin ? "Yes" : "No"}</td>
    <td className="px-6 py-4 capitalize text-gray-600">{lead.acceptanceStatus}</td>
    <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">{lead.firstRM}</td>
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{lead.assignedTo}</span>
          <button onClick={() => onAssign(lead)} className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded">Reassign</button>
        </div>
        <span className="text-[10px] text-gray-400">ID: {lead.rmId}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{lead.previousRM}</td>
    <td className="px-6 py-4 text-gray-600 font-medium">{lead.uploadedMandatoryDocs}/{lead.totalMandatoryDocs}</td>
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
      <div className="text-xs text-blue-600 font-semibold">{lead.contactNumber}</div>
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
  const [pageSize, setPageSize] = useState(5);
  const [serverTotalCount, setServerTotalCount] = useState(0);
  
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const mapDetailedLead = (item: any): Lead => {
    const dateObj = item.created_at ? new Date(item.created_at) : new Date();
    return {
      id: item.id.toString(),
      detailLeadId: item.detail_lead_id || "-",
      refId: "-", 
      clientName: item.lead_name || "Unknown",
      clientType: 'Detailed',
      contactNumber: item.contact_number || "N/A",
      email: item.email || "N/A",
      product: item.product_type || "N/A",
      subCategory: item.form_data?.loanType || "N/A",
      notes: item.notes || "No notes available",
      status: (item.lead_status || 'new').toLowerCase(),
      selfLogin: item.is_self_login,
      acceptanceStatus: item.rm_acceptance_status?.toLowerCase(),
      firstRM: item.rm_history?.first_rm?.name || "N/A",
      currentRM: item.rm_history?.current_rm?.name || "N/A",
      previousRM: item.rm_history?.previous_rm?.name || "N/A",
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
      // MAPPING POPUP DETAILS
      dob: item.form_data?.dob || "N/A",
      employmentType: item.form_data?.employmentType || "N/A",
      hasOtherLoan: item.form_data?.hasOtherLoan || false,
      loanAmount: item.form_data?.loanAmount || "N/A",
      loanType: item.form_data?.loanType || "N/A",
      location: item.form_data?.location || "N/A",
      otherIncome: item.form_data?.otherIncome || "N/A",
      otherIncomeAmount: item.form_data?.otherIncomeAmount || "N/A",
      otherLoanAmount: item.form_data?.otherLoanAmount || "N/A",
    };
  };

  const mapReferralLead = (item: any): Lead => {
    const dateObj = item.created_at ? new Date(item.created_at) : new Date();
    return {
      id: item.id.toString(),
      refId: item.ref_id || "-",
      detailLeadId: "-",
      clientName: item.lead_name || "Unknown",
      clientType: 'Referral',
      contactNumber: item.contact_number || "N/A",
      email: item.email || "N/A",
      product: item.department || "N/A",
      subCategory: item.sub_category || "N/A",
      notes: item.notes || "No notes available",
      status: (item.status || 'new').toLowerCase(),
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
        console.log("Detailed Leads Response:", leadsResponse);
        setServerTotalCount(leadsResponse.pagination?.totalRecords || leadsResponse.count || 0);
        mappedData = (leadsResponse.leads || []).map(mapDetailedLead);
      } else {
        leadsResponse = await DepartmentHeadService.getDepartmentLeads();
        mappedData = (leadsResponse.leads || []).map(mapReferralLead);
      }
      const rmsResponse = await DepartmentHeadService.getRelationshipManagers?.() || { rms: [] };
      setLeads(mappedData);
      setRms(rmsResponse.rms || []);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
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

  const handleAssignClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsAssignModalOpen(true);
  };

  const handleViewClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  if (loading) return <div className="p-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6 font-sans text-gray-700 relative">
      <div className="mb-6 mt-4 border-b flex gap-6">
        {['referral', 'detailed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
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
        <div className="overflow-x-auto scrollbar-x-thin max-h-[450px]">
          <table className="min-w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 z-10 bg-gray-50 text-[12px] font-bold text-gray-700">
              {activeTab === 'detailed' ? <DetailedHeader /> : <ReferralHeader />}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  activeTab === 'detailed' 
                    ? <DetailedRow key={lead.id} lead={lead} onAssign={handleAssignClick} onView={handleViewClick} />
                    : <ReferralRow key={lead.id} lead={lead} onAssign={handleAssignClick} />
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

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">Application Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
              <DetailItem label="Client Name" value={selectedLead.clientName} />
              <DetailItem label="Lead ID" value={selectedLead.detailLeadId} />
              <DetailItem label="DOB" value={selectedLead.dob} />
              <DetailItem label="Employment" value={selectedLead.employmentType} />
              <DetailItem label="Loan Type" value={selectedLead.loanType} />
              <DetailItem label="Loan Amount" value={`₹${Number(selectedLead.loanAmount).toLocaleString()}`} />
              <DetailItem label="Location" value={selectedLead.location} />
              <DetailItem label="Other Loan" value={selectedLead.hasOtherLoan ? 'Yes' : 'No'} />
              {selectedLead.hasOtherLoan && <DetailItem label="Other Loan Amt" value={`₹${Number(selectedLead.otherLoanAmount).toLocaleString()}`} />}
              <DetailItem label="Other Income" value={selectedLead.otherIncome} />
              <DetailItem label="Other Inc Amt" value={`₹${Number(selectedLead.otherIncomeAmount).toLocaleString()}`} />
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <button onClick={() => setIsViewModalOpen(false)} className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
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
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-sm font-semibold text-gray-700 mt-0.5">{value || "N/A"}</p>
  </div>
);

export default LeadTable;