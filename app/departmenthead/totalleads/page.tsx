"use client";
import { FC, useState, useMemo, useEffect, Key } from "react";
import { DepartmentHeadService } from "../../services/departmentHeadService";

// Interface for RM list
export interface RM {
  sub_category: any;
  sub_Category: any;
  id: string;
  name: string;
  department: string;
  subCategory: string;
}

export interface Lead {
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
}

const LeadTable: FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rms, setRms] = useState<RM[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'referral' | 'detailed'>('referral');
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [processingAssignment, setProcessingAssignment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leadsResponse, rmsResponse] = await Promise.all([
          DepartmentHeadService.getDepartmentLeads(),
          DepartmentHeadService.getRelationshipManagers?.() || { rms: [] }
        ]);

        const leadsArray = leadsResponse.leads || [];
        const mappedLeads: Lead[] = leadsArray.map((item: any) => {
          const dateObj = item.created_at ? new Date(item.created_at) : new Date();
          return {
            id: item.id.toString(),
            refId: item.ref_id && item.ref_id.trim() !== "" ? item.ref_id : "-",
            clientName: item.lead_name || "Unknown",
            clientType: item.ref_id && item.ref_id.trim() !== "" ? 'Referral' : 'Detailed',
            contactNumber: item.contact_number || "N/A",
            email: item.email || "N/A",
            product: item.department || "N/A",
            subCategory: item.sub_category || "N/A",
            notes: item.notes || "No notes available",
            status: (item.status || 'new').toLowerCase(),
            assignedTo: item.assigned_rm_name || "Unassigned",
            assignedRMDepartment: item.assigned_rm_department || "N/A",
            assignedRMSubcategory: item.assigned_rm_sub_category || "N/A",
            rmId: item.assigned_rm_id ? item.assigned_rm_id.toString() : "N/A",
            dsaName: item.dsa_name || "Direct",
            dsaAdvId: item.dsa_adv_id || "N/A",
            dsaMobile: item.dsa_mobile || "N/A",
            createdDate: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            createdTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            documents: item.documents || []
          };
        });

        setLeads(mappedLeads);
        setRms(rmsResponse.rms || []);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Reset page to 1 when filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, activeTab, pageSize]);

  const handleAssignClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssignment = async (rm: RM) => {
    if (!selectedLead) return;
    try {
      setProcessingAssignment(true);
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? {
        ...l,
        rmId: rm.id,
        assignedTo: rm.name,
        assignedRMDepartment: rm.department,
        assignedRMSubcategory: rm.sub_category
      } : l));
      setIsAssignModalOpen(false);
      setSelectedLead(null);
    } catch (error) {
      alert("Failed to assign lead. Please try again.");
    } finally {
      setProcessingAssignment(false);
    }
  };

  const categoryOptions = useMemo(() => {
    const categories = leads
      .filter(lead => (activeTab === 'referral' ? lead.clientType === 'Referral' : lead.clientType === 'Detailed'))
      .map(lead => lead.subCategory);
    return Array.from(new Set(categories)).filter(c => c !== "N/A").sort();
  }, [leads, activeTab]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const tabMatch = activeTab === 'referral' ? lead.clientType === 'Referral' : lead.clientType === 'Detailed';
      const matchesSearch = lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || lead.dsaName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "" || lead.subCategory === categoryFilter;
      return tabMatch && matchesSearch && matchesCategory;
    });
  }, [leads, activeTab, searchTerm, categoryFilter]);

  // Logic for Pagination
  const totalPages = Math.ceil(filteredLeads.length / pageSize);
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  const filteredRMs = useMemo(() => {
    if (!selectedLead) return [];
    return rms.filter(rm => {
      const isAlreadyAssigned = rm.id.toString() === selectedLead.rmId.toString();
      if (isAlreadyAssigned) return false;
      const leadSub = selectedLead.subCategory.toLowerCase().trim();
      const rmSubs = (rm.sub_category || "").toLowerCase().split(',').map((s: string) => s.trim());
      return rmSubs.includes(leadSub);
    });
  }, [rms, selectedLead]);

  if (loading) return <div className="p-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6 font-sans relative">
      <div className="mb-6 border-b flex gap-6">
        {['referral', 'detailed'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as any);
              setCategoryFilter("");
            }}
            className={`pb-3 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab} Leads
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 text-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">{activeTab} Leads</h2>
        <div className="flex gap-3 items-center">
          {/* MAX SELECTOR MOVED HERE */}
          <div className="flex items-center gap-2 mr-2">
            <span className="text-[13px] text-gray-600 font-medium">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-white border border-gray-200 text-gray-700 text-[13px] rounded px-2 py-2 outline-none focus:border-blue-400"
            >
              {[5, 10, 20, 50].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <select
            className="border border-gray-200 p-2 rounded-md text-sm outline-none focus:border-blue-400 bg-white min-w-[140px]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search leads..."
            className="bg-white border border-gray-300 p-2 rounded-md text-sm w-64 outline-none focus:border-blue-400 transition-colors"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-50 text-[12px] font-medium text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">ID</th>
                {activeTab === 'referral' && <th className="px-4 py-3">Ref ID</th>}
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">DSA</th>
                <th className="px-4 py-3">Notes</th>
                {activeTab === 'detailed' && <th className="px-4 py-3">Documents</th>}
                <th className="px-4 py-3">Assigned RM</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 group">
                    <td className="px-4 py-4 text-gray-700 font-medium">{lead.id}</td>
                    {activeTab === 'referral' && <td className="px-4 py-4 text-gray-700">{lead.refId}</td>}
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{lead.clientName}</div>
                      <div className="text-xs text-gray-700">{lead.email}</div>
                      <div className="text-xs text-blue-600 font-medium">{lead.contactNumber}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-900">{lead.product}</div>
                      <div className="text-[12px] text-gray-700 ">{lead.subCategory}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-900">{lead.dsaName}</div>
                      <div className="text-[12px] text-gray-600">ID: {lead.dsaAdvId}</div>
                      <div className="text-[12px] text-gray-600">Mobile: {lead.dsaMobile}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-gray-700 max-w-[180px] truncate" title={lead.notes}>{lead.notes}</div>
                    </td>
                    {activeTab === 'detailed' && (
                      <td className="px-4 py-4">
                        {lead.documents && lead.documents.length > 0 ? (
                          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded border border-blue-100">
                            <span>View</span>
                            <span className="bg-blue-600 text-white text-[10px] px-1 rounded-full">{lead.documents.length}</span>
                          </button>
                        ) : (
                          <span className="text-gray-400 text-xs italic">No docs</span>
                        )}
                      </td>
                    )}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-gray-900">{lead.assignedTo}</div>
                          <button
                            onClick={() => handleAssignClick(lead)}
                            className="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 text-[10px] text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-all"
                          >
                            Reassign
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                          <span>ID: {lead.rmId}</span>
                          <span className="text-gray-300">•</span>
                          <span>{lead.assignedRMDepartment}</span>
                        </div>
                        <div className="text-xs text-gray-600 wrap-break-word whitespace-normal max-w-[250px]" title={lead.assignedRMSubcategory}>
                          {lead.assignedRMSubcategory}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-left">
                      <div className="text-gray-700">{lead.createdDate}</div>
                      <div className="text-[11px] text-gray-700">{lead.createdTime}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="bg-gray-100 p-3 rounded-full text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <p className="text-gray-500 font-medium">No leads found</p>
                      {(searchTerm || categoryFilter) && (
                        <button onClick={() => { setSearchTerm(""); setCategoryFilter(""); }} className="mt-2 text-blue-600 text-xs hover:underline">Clear filters</button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {filteredLeads.length > 0 && (
          <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <p className="text-[13px] text-gray-800">
                Showing <span className="font-semibold text-gray-700">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-semibold text-gray-700">{Math.min(currentPage * pageSize, filteredLeads.length)}</span> of <span className="font-semibold text-gray-700">{filteredLeads.length}</span> entries
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className={`p-1.5 rounded border ${currentPage === 1 ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-gray-600 border-gray-200 hover:bg-white hover:text-blue-600'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) {
                  if (page === 2 || page === totalPages - 1) return <span key={page} className="px-2 text-gray-400">...</span>;
                  return null;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-xs font-medium rounded border transition-colors ${currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className={`p-1.5 rounded border ${currentPage === totalPages ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-gray-600 border-gray-200 hover:bg-white hover:text-blue-600'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal remains the same */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-base font-bold text-gray-900">Assign Relationship Manager</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-gray-500">Choose an RM for {selectedLead?.clientName}</p>
                <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded border border-blue-100 uppercase">
                  {selectedLead?.subCategory}
                </span>
              </div>
            </div>
            <div className="p-4 max-h-[350px] overflow-y-auto">
              <div className="grid gap-2">
                {filteredRMs.length > 0 ? filteredRMs.map((rm) => (
                  <button
                    key={rm.id}
                    disabled={processingAssignment}
                    onClick={() => handleConfirmAssignment(rm)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group flex flex-col"
                  >
                    <span className="font-semibold text-gray-800 group-hover:text-blue-700">{rm.name}</span>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1 uppercase">
                      <span>ID: {rm.id}</span>
                      <span>•</span>
                      <span>{rm.department}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(rm.sub_category || "").split(',').filter((s: string) => s.trim() !== "").map((sub: string, idx: Key | null | undefined) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-white border border-gray-200 text-gray-600 text-[10px] rounded font-medium group-hover:border-blue-200 group-hover:text-blue-600"
                        >
                          {sub.trim()}
                        </span>
                      ))}
                    </div>
                  </button>
                )) : (
                  <div className="text-center py-10 flex flex-col items-center gap-2">
                    <p className="text-gray-400 text-sm">No other RMs available for "{selectedLead?.subCategory}"</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                disabled={processingAssignment}
                onClick={() => { setIsAssignModalOpen(false); setSelectedLead(null); }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;