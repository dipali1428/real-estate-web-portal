"use client";
import { FC, useState, useMemo, useEffect } from "react";
import { DepartmentHeadService } from "../../services/departmentHeadService";

export interface Lead {
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
}

const LeadTable: FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'referral' | 'detailed'>('referral');
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await DepartmentHeadService.getDepartmentLeads();
        const leadsArray = response.leads || [];

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
            rmId: item.assigned_rm_id ? item.assigned_rm_id.toString() : "N/A",
            dsaName: item.dsa_name || "Direct",
            dsaAdvId: item.dsa_adv_id || "N/A",
            createdDate: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            createdTime: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
          };
        });
        setLeads(mappedLeads);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

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
      const matchesStatus = statusFilter === "" || lead.status === statusFilter;
      const matchesCategory = categoryFilter === "" || lead.subCategory === categoryFilter;
      return tabMatch && matchesSearch && matchesStatus && matchesCategory;
    });
  }, [leads, activeTab, searchTerm, statusFilter, categoryFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig: any = {
      new: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'New' },
      contacted: { bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'Contacted' },
      'follow-up': { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Follow-up' },
      converted: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Converted' },
      lost: { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Lost' },
      pending: { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Pending' },
    };
    const config = statusConfig[status] || statusConfig['pending'];
    return (
      <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md border border-current/10 ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (loading) return <div className="p-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6 font-sans">
      {/* TABS */}
      <div className="mb-6 border-b flex gap-6">
        {['referral', 'detailed'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as any);
              setCategoryFilter("");
            }}
            className={`pb-3 text-sm font-medium capitalize transition-all ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab} Leads
          </button>
        ))}
      </div>

      {/* SEARCH & FILTERS */}
      <div className="flex justify-between items-center mb-6 text-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">{activeTab} Leads</h2>
        <div className="flex gap-3">
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

          <select
            className="border border-gray-200 p-2 rounded-md text-sm outline-none focus:border-blue-400 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="follow-up">Follow-up</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>

          <input
            type="text"
            placeholder="Search leads..."
            className="bg-white border border-gray-300 p-2 rounded-md text-sm w-64 outline-none focus:border-blue-400 transition-colors"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-50 text-[12px] font-medium text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">ID</th>
                {activeTab === 'referral' && <th className="px-4 py-3">Ref ID</th>}
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">DSA</th>
                <th className="px-4 py-3">Assigned RM</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-4 text-gray-600 font-medium">{lead.id}</td>

                  {activeTab === 'referral' && (
                    <td className="px-4 py-4 text-gray-600">{lead.refId}</td>
                  )}

                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{lead.clientName}</div>
                    <div className="text-xs text-gray-600">{lead.email}</div>
                    <div className="text-xs text-blue-600 font-medium">{lead.contactNumber}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-gray-700">{lead.product}</div>
                    <div className="text-[11px] text-gray-500">{lead.subCategory}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-gray-700">{lead.dsaName}</div>
                    <div className="text-[11px] text-gray-500">ID: {lead.dsaAdvId}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-800">{lead.assignedTo}</div>
                    <div className="text-[11px] text-gray-500">RM ID: {lead.rmId}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-xs text-gray-500 max-w-[180px] truncate" title={lead.notes}>
                      {lead.notes}
                    </div>
                  </td>

                  <td className="px-4 py-4">{getStatusBadge(lead.status)}</td>

                  <td className="px-4 py-4 text-right">
                    <div className="text-gray-700">{lead.createdDate}</div>
                    <div className="text-[11px] text-gray-500">{lead.createdTime}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;